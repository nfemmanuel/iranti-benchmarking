param(
  [string]$ControlPlaneBaseUrl = "http://localhost:3002/api/control-plane",
  [string]$RuntimeRoot = "C:\Users\NF\.iranti-runtime",
  [string]$InstanceName = "iranti_dev",
  [int]$Iterations = 5,
  [int]$PollMs = 250,
  [string]$OutputJsonPath = ""
)

$ErrorActionPreference = "Stop"

function Get-IrantiCommandPath {
  $command = Get-Command iranti.cmd -ErrorAction SilentlyContinue
  if (-not $command) {
    $command = Get-Command iranti.ps1 -ErrorAction SilentlyContinue
  }
  if (-not $command) {
    $command = Get-Command iranti -ErrorAction SilentlyContinue
  }
  if (-not $command) {
    throw "Installed iranti CLI not found in PATH."
  }
  return $command.Source
}

function Invoke-IrantiJson {
  param(
    [string[]]$CliArgs
  )

  $cli = Get-IrantiCommandPath
  $output = & $cli @CliArgs 2>&1
  if ($LASTEXITCODE -ne 0) {
    throw "iranti command failed: $cli $($CliArgs -join ' ')"
  }
  $text = ($output -join "`n")
  $jsonStart = $text.IndexOf('{')
  if ($jsonStart -lt 0) {
    $jsonStart = $text.IndexOf('[')
  }
  if ($jsonStart -lt 0) {
    throw "iranti command did not return JSON: $text"
  }
  return ($text.Substring($jsonStart) | ConvertFrom-Json)
}

function Get-InstanceStatus {
  $status = Invoke-IrantiJson @("status", "--root", $RuntimeRoot, "--json")
  $instance = $status.instances | Where-Object { $_.name -eq $InstanceName } | Select-Object -First 1
  if (-not $instance) {
    throw "Instance '$InstanceName' not found in iranti status output."
  }
  return $instance
}

function Wait-UntilStopped {
  $deadline = (Get-Date).AddSeconds(20)
  while ((Get-Date) -lt $deadline) {
    $instance = Get-InstanceStatus
    if ($instance.runtime.classification -ne "running" -or -not $instance.runtime.running) {
      return $instance
    }
    Start-Sleep -Milliseconds $PollMs
  }
  throw "Timed out waiting for instance '$InstanceName' to stop."
}

function Wait-ForConvergence {
  param(
    [int]$ExpectedPid
  )

  $deadline = (Get-Date).AddSeconds(15)
  $pollCount = 0
  while ((Get-Date) -lt $deadline) {
    $pollCount++
    $cliInstance = Get-InstanceStatus
    $cpInstances = Invoke-RestMethod "$ControlPlaneBaseUrl/instances"
    $cpInstance = $cpInstances.instances | Where-Object { $_.name -eq $InstanceName } | Select-Object -First 1
    if (
      $cliInstance.runtime.classification -eq "running" -and
      $cliInstance.runtime.running -and
      [int]$cliInstance.runtime.state.pid -eq $ExpectedPid -and
      $cpInstance -and
      $cpInstance.runtimeStatus -eq "running" -and
      [int]$cpInstance.runtime.pid -eq $ExpectedPid
    ) {
      return @{
        PollCount = $pollCount
        CliRuntime = $cliInstance.runtime
        ControlPlaneRuntime = $cpInstance.runtime
      }
    }
    Start-Sleep -Milliseconds $PollMs
  }
  throw "Timed out waiting for control-plane and iranti status to converge on PID $ExpectedPid."
}

function Stop-InstanceHard {
  $instance = Get-InstanceStatus
  if ($instance.runtime.classification -eq "running" -and $instance.runtime.running -and $instance.runtime.state.pid) {
    Stop-Process -Id ([int]$instance.runtime.state.pid) -Force
    return Wait-UntilStopped
  }
  return $instance
}

function Summarize-Doctor {
  param($DoctorResponse)

  $checks = @($DoctorResponse.checks)
  $runtimeCheck = $checks | Where-Object { $_.id -eq "runtime_availability" } | Select-Object -First 1
  return @{
    TotalChecks = $checks.Count
    PassCount = @($checks | Where-Object { $_.status -eq "pass" }).Count
    WarnCount = @($checks | Where-Object { $_.status -eq "warn" }).Count
    FailCount = @($checks | Where-Object { $_.status -eq "fail" }).Count
    RuntimeAvailabilityStatus = if ($runtimeCheck) { $runtimeCheck.status } else { $null }
    RuntimeAvailabilityMessage = if ($runtimeCheck) { $runtimeCheck.message } else { $null }
  }
}

$results = @()

for ($i = 1; $i -le $Iterations; $i++) {
  $stopped = Stop-InstanceHard

  $doctorTimer = [System.Diagnostics.Stopwatch]::StartNew()
  $doctor = Invoke-RestMethod -Method Post "$ControlPlaneBaseUrl/instances/$InstanceName/doctor"
  $doctorTimer.Stop()
  $doctorSummary = Summarize-Doctor $doctor

  $startTimer = [System.Diagnostics.Stopwatch]::StartNew()
  $startResponse = Invoke-RestMethod -Method Post "$ControlPlaneBaseUrl/instances/$InstanceName/start"
  $startTimer.Stop()

  $convergenceTimer = [System.Diagnostics.Stopwatch]::StartNew()
  $convergence = Wait-ForConvergence -ExpectedPid ([int]$startResponse.pid)
  $convergenceTimer.Stop()

  $results += [pscustomobject]@{
    Iteration = $i
    StoppedClassification = $stopped.runtime.classification
    DoctorLatencyMs = [math]::Round($doctorTimer.Elapsed.TotalMilliseconds, 3)
    DoctorTotalChecks = $doctorSummary.TotalChecks
    DoctorPassCount = $doctorSummary.PassCount
    DoctorWarnCount = $doctorSummary.WarnCount
    DoctorFailCount = $doctorSummary.FailCount
    DoctorRuntimeAvailabilityStatus = $doctorSummary.RuntimeAvailabilityStatus
    StartLatencyMs = [math]::Round($startTimer.Elapsed.TotalMilliseconds, 3)
    StartedPid = [int]$startResponse.pid
    StartStatus = $startResponse.status
    ConvergenceLatencyMs = [math]::Round($convergenceTimer.Elapsed.TotalMilliseconds, 3)
    ConvergencePollCount = $convergence.PollCount
    FinalClassification = $convergence.CliRuntime.classification
    FinalHealthDetail = $convergence.CliRuntime.health.detail
  }

  Start-Sleep -Milliseconds 500
}

if ($OutputJsonPath) {
  $dir = Split-Path -Parent $OutputJsonPath
  if ($dir -and -not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }
  $results | ConvertTo-Json -Depth 6 | Set-Content -Path $OutputJsonPath -Encoding UTF8
}

$results | ConvertTo-Json -Depth 6
