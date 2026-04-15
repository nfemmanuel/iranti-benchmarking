param(
  [string]$RuntimeRoot = 'C:\Users\NF\.iranti-runtime',
  [string]$Instance = 'bench_b13_xver_v0238',
  [int]$Port = 3512,
  [string]$DbHost = 'localhost',
  [int]$DbPort = 55436,
  [string]$DbUser = 'postgres',
  [string]$DbPassword = '053435',
  [string]$Database = 'iranti_bench_b13_xver_v0238_db',
  [string]$ApiKey = 'bench_b13_xver_v0238_nf.4b4c0f9d8c0b4f30a3a9c6370ab3a1de',
  [string]$OutputJson = 'results/raw/B13-cross-version-v0238-execution.json',
  [string]$OutputMarkdown = 'results/raw/B13-cross-version-v0238-trial.md'
)

$ErrorActionPreference = 'Stop'
if ($PSVersionTable.PSVersion.Major -ge 7) {
  $PSNativeCommandUseErrorActionPreference = $false
}

$versions = @('0.2.35', '0.2.36', '0.2.37', '0.2.38')
$npx = (Get-Command npx.cmd).Source
$instanceDir = Join-Path $RuntimeRoot "instances\$Instance"
$baseUrl = "http://localhost:$Port"
$dbUrl = "postgresql://${DbUser}:${DbPassword}@${DbHost}:${DbPort}/${Database}"
$headers = @{
  'X-Iranti-Key' = $ApiKey
  'Content-Type' = 'application/json'
}

function Ensure-Dir {
  param([string]$Path)
  $dir = Split-Path -Parent $Path
  if ($dir -and -not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }
}

function Invoke-VersionedCli {
  param(
    [string]$Version,
    [string[]]$Args,
    [switch]$Json
  )

  $allArgs = @('-y', '-p', "iranti@$Version", 'iranti') + $Args
  $output = & $npx @allArgs 2>&1
  if ($LASTEXITCODE -ne 0) {
    $joinedOutput = ($output -join "`n").Trim()
    throw "iranti@$Version failed: $joinedOutput"
  }
  $text = ($output -join "`n").Trim()
  if ($Json) {
    $jsonStart = $text.IndexOf('{')
    if ($jsonStart -lt 0) {
      throw "iranti@$Version returned non-JSON output: $text"
    }
    $jsonText = $text.Substring($jsonStart)
    return $jsonText | ConvertFrom-Json
  }
  return $text
}

function Invoke-IrantiJson {
  param(
    [string]$Method,
    [string]$Url,
    $Body = $null
  )

  if ($null -eq $Body) {
    return Invoke-RestMethod -Method $Method -Uri $Url -Headers $headers
  }

  $json = $Body | ConvertTo-Json -Depth 12
  return Invoke-RestMethod -Method $Method -Uri $Url -Headers $headers -Body $json
}

function Wait-ForHealth {
  param(
    [string]$Url,
    [int]$TimeoutSeconds = 90,
    [int]$PollMs = 500
  )

  $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
  while ($stopwatch.Elapsed.TotalSeconds -lt $TimeoutSeconds) {
    try {
      $health = Invoke-RestMethod -Uri $Url
      if ($health.status -eq 'ok') {
        $stopwatch.Stop()
        return [ordered]@{
          ok = $true
          elapsedMs = [math]::Round($stopwatch.Elapsed.TotalMilliseconds, 3)
          health = $health
        }
      }
    } catch {
      Start-Sleep -Milliseconds $PollMs
      continue
    }
    Start-Sleep -Milliseconds $PollMs
  }

  $stopwatch.Stop()
  return [ordered]@{
    ok = $false
    elapsedMs = [math]::Round($stopwatch.Elapsed.TotalMilliseconds, 3)
    health = $null
  }
}

function Start-VersionedInstance {
  param([string]$Version)

  $outLog = Join-Path (Split-Path -Parent $OutputJson) "${Instance}_run_v$($Version.Replace('.','')).out.log"
  $errLog = Join-Path (Split-Path -Parent $OutputJson) "${Instance}_run_v$($Version.Replace('.','')).err.log"
  foreach ($path in @($outLog, $errLog)) {
    if (Test-Path $path) { Remove-Item $path -Force }
  }

  $command = "& '$npx' -y -p iranti@$Version iranti --root '$RuntimeRoot' run --instance '$Instance'"
  $proc = Start-Process -FilePath 'powershell.exe' `
    -ArgumentList @('-NoProfile', '-Command', $command) `
    -RedirectStandardOutput $outLog `
    -RedirectStandardError $errLog `
    -PassThru

  $health = Wait-ForHealth -Url "$baseUrl/health"
  if (-not $health.ok) {
    $stderr = if (Test-Path $errLog) { Get-Content $errLog -Raw } else { '' }
    $stdout = if (Test-Path $outLog) { Get-Content $outLog -Raw } else { '' }
    throw "Version $Version failed to reach health at $baseUrl. STDOUT:`n$stdout`nSTDERR:`n$stderr"
  }

  $status = Invoke-VersionedCli -Version $Version -Args @('--root', $RuntimeRoot, 'status', '--json') -Json
  $instanceStatus = $status.instances | Where-Object { $_.name -eq $Instance }
  if (-not $instanceStatus) {
    throw "Version $Version started but instance $Instance was not present in status output."
  }

  return [ordered]@{
    wrapperPid = $proc.Id
    health = $health
    status = $instanceStatus
    outLog = $outLog
    errLog = $errLog
  }
}

function Stop-RunningInstance {
  param([string]$Version)

  $status = Invoke-VersionedCli -Version $Version -Args @('--root', $RuntimeRoot, 'status', '--json') -Json
  $instanceStatus = $status.instances | Where-Object { $_.name -eq $Instance }
  if (-not $instanceStatus) {
    return [ordered]@{ attempted = $false; reason = 'instance not present in status output' }
  }

  if (-not $instanceStatus.runtime.running) {
    return [ordered]@{
      attempted = $false
      reason = 'runtime already not running'
      classification = $instanceStatus.runtime.classification
    }
  }

  $runtimePid = [int]$instanceStatus.runtime.state.pid
  $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
  $taskkillOutput = & taskkill /PID $runtimePid /T /F 2>&1
  $taskkillCode = $LASTEXITCODE

  $down = $false
  while ($stopwatch.Elapsed.TotalSeconds -lt 45) {
    try {
      Invoke-RestMethod -Uri "$baseUrl/health" | Out-Null
      Start-Sleep -Milliseconds 400
    } catch {
      $down = $true
      break
    }
  }

  $stopwatch.Stop()
  return [ordered]@{
    attempted = $true
    runtimePid = $runtimePid
    taskkillExitCode = $taskkillCode
    taskkillOutput = ($taskkillOutput -join "`n").Trim()
    healthDownConfirmed = $down
    elapsedMs = [math]::Round($stopwatch.Elapsed.TotalMilliseconds, 3)
  }
}

function Stop-StaleRuntimeIfPresent {
  param([string]$InstanceDirectory)

  $runtimeFile = Join-Path $InstanceDirectory 'runtime.json'
  if (-not (Test-Path $runtimeFile)) {
    return
  }

  try {
    $runtime = Get-Content $runtimeFile -Raw | ConvertFrom-Json
    if ($runtime.pid) {
      & taskkill /PID ([int]$runtime.pid) /T /F 2>&1 | Out-Null
    }
  } catch {
    # Best-effort cleanup only.
  }
}

Ensure-Dir -Path $OutputJson
Ensure-Dir -Path $OutputMarkdown

$env:PGPASSWORD = $DbPassword
Stop-StaleRuntimeIfPresent -InstanceDirectory $instanceDir
& psql -h $DbHost -p $DbPort -U $DbUser -d postgres -tAc "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '${Database}' AND pid <> pg_backend_pid();" | Out-Null
& psql -h $DbHost -p $DbPort -U $DbUser -d postgres -tAc "DROP DATABASE IF EXISTS ${Database};" | Out-Null
& psql -h $DbHost -p $DbPort -U $DbUser -d postgres -tAc "CREATE DATABASE ${Database};" | Out-Null

if (Test-Path $instanceDir) {
  Remove-Item -Recurse -Force $instanceDir
}

$setupCommand = "npx -y -p iranti@0.2.35 iranti setup --defaults --bootstrap-db --root `"$RuntimeRoot`" --instance `"$Instance`" --port $Port --db-url `"$dbUrl`" --provider mock --api-key `"$ApiKey`""
$oldErrorActionPreference = $ErrorActionPreference
$ErrorActionPreference = 'Continue'
$createOutput = cmd.exe /c $setupCommand 2>&1
$createExitCode = $LASTEXITCODE
$ErrorActionPreference = $oldErrorActionPreference
if ($createExitCode -ne 0) {
  $createJoined = ($createOutput -join "`n").Trim()
  throw "instance bootstrap failed: $createJoined"
}
if (-not (Test-Path $instanceDir)) {
  throw "instance bootstrap reported success but $instanceDir does not exist."
}

$markers = New-Object System.Collections.Generic.List[object]
$runs = New-Object System.Collections.Generic.List[object]

foreach ($version in $versions) {
  $startInfo = Start-VersionedInstance -Version $version

  $stageMarkers = @(
    @{ entity = "benchmark/b13_xver_$($version.Replace('.','_'))"; key = 'runtime_version'; value = $version; summary = "B13 cross-version marker for $version" },
    @{ entity = "benchmark/b13_xver_$($version.Replace('.','_'))"; key = 'continuity_stage'; value = "stage_$($version.Replace('.','_'))"; summary = "B13 continuity stage marker for $version" },
    @{ entity = "benchmark/b13_xver_$($version.Replace('.','_'))"; key = 'continuity_assertion'; value = "facts_written_on_$version"; summary = "B13 continuity assertion for $version" }
  )

  $writes = @()
  foreach ($marker in $stageMarkers) {
    $write = Invoke-IrantiJson -Method Post -Url "$baseUrl/kb/write" -Body @{
      entity = $marker.entity
      key = $marker.key
      value = $marker.value
      summary = $marker.summary
      confidence = 95
      source = "B13_cross_version_$version"
      agent = 'benchmark_program_main'
    }
    $writes += [ordered]@{
      entity = $marker.entity
      key = $marker.key
      value = $marker.value
      action = $write.action
      reason = $write.reason
    }
    $markers.Add([pscustomobject]$marker) | Out-Null
  }

  $reads = @()
  $correctReads = 0
  foreach ($marker in $markers) {
    $entityParts = $marker.entity.Split('/', 2)
    $query = Invoke-IrantiJson -Method Get -Url "$baseUrl/kb/query/$($entityParts[0])/$($entityParts[1])/$($marker.key)"
    $isCorrect = ($query.found -eq $true) -and ([string]$query.value -eq [string]$marker.value)
    if ($isCorrect) { $correctReads += 1 }
    $reads += [ordered]@{
      entity = $marker.entity
      key = $marker.key
      expected = $marker.value
      actual = $query.value
      found = $query.found
      correct = $isCorrect
    }
  }

  $handshake = Invoke-IrantiJson -Method Post -Url "$baseUrl/memory/handshake" -Body @{
    agentId = 'benchmark_program_main'
    task = "B13 cross-version continuity stage $version"
    recentMessages = @()
  }

  $stopInfo = Stop-RunningInstance -Version $version

  $runs.Add([pscustomobject][ordered]@{
    version = $version
    start = $startInfo
    writes = $writes
    readCount = $reads.Count
    correctReadCount = $correctReads
    reads = $reads
    handshakeFields = @($handshake.PSObject.Properties.Name)
    stop = $stopInfo
  }) | Out-Null
}

$result = [ordered]@{
  recordedAt = (Get-Date).ToString('o')
  benchmark = 'B13'
  trialType = 'true cross-version continuity rerun'
  runtimeRoot = $RuntimeRoot
  instance = $Instance
  baseUrl = $baseUrl
  database = $Database
  create = $createOutput
  versions = $runs
}

$result | ConvertTo-Json -Depth 14 | Set-Content -Path $OutputJson

$overallPass = ($runs | Where-Object { $_.correctReadCount -ne $_.readCount }).Count -eq 0
$tableRows = $runs | ForEach-Object {
  $rowResult = if ($_.correctReadCount -eq $_.readCount) { 'PASS' } else { 'FAIL' }
  "| $($_.version) | $($_.correctReadCount) | $($_.readCount) | $rowResult |"
}
$handshakeLines = $runs[-1].handshakeFields | ForEach-Object { "- $_" }
if ($overallPass) {
  $resultLabel = 'PASS'
  $continuityLine = '- Cross-version fact continuity held across the full 0.2.35 -> 0.2.38 chain.'
} else {
  $resultLabel = 'FAIL'
  $continuityLine = '- Cross-version fact continuity did not hold across the full chain.'
}

$mdLines = New-Object System.Collections.Generic.List[string]
foreach ($line in @(
  '# B13 True Cross-Version Continuity Rerun - v0.2.35 -> v0.2.38',
  '',
  "**Track:** B13 - Runtime Upgrade and Restart Behavior  ",
  "**Trial type:** True cross-version continuity rerun  ",
  "**Executed:** $(Get-Date -Format 'yyyy-MM-dd')  ",
  "**Instance:** $Instance ($baseUrl)  ",
  "**Database:** $Database  ",
  ('**Source of truth:** {0}' -f $OutputJson),
  '',
  '---',
  '',
  '## 1. Scope',
  '',
  'This run extends the bounded same-version restart checks with a real published-surface continuity chain:',
  '',
  '- `0.2.35`',
  '- `0.2.36`',
  '- `0.2.37`',
  '- `0.2.38`',
  '',
  'The same disposable instance and database were reused across the entire chain. Each version wrote new marker facts and then verified that all prior-version markers remained readable.',
  '',
  '---',
  '',
  '## 2. Per-Version Readback',
  '',
  '| Version | Facts readable | Facts expected | Result |',
  '|---|---:|---:|---|'
)) { $mdLines.Add($line) | Out-Null }

foreach ($line in $tableRows) { $mdLines.Add($line) | Out-Null }

foreach ($line in @(
  '',
  '---',
  '',
  '## 3. Handshake Surface',
  '',
  'Final-stage handshake fields:',
  ''
)) { $mdLines.Add($line) | Out-Null }

foreach ($line in $handshakeLines) { $mdLines.Add($line) | Out-Null }

$mdLines.Add('') | Out-Null
$mdLines.Add('---') | Out-Null
$mdLines.Add('') | Out-Null
$mdLines.Add('## 4. Result') | Out-Null
$mdLines.Add('') | Out-Null
$mdLines.Add(('Overall result: **{0}**' -f $resultLabel)) | Out-Null
$mdLines.Add('') | Out-Null
$mdLines.Add('Interpretation:') | Out-Null
$mdLines.Add($continuityLine) | Out-Null
$mdLines.Add('- The rerun used published npm CLI surfaces only.') | Out-Null
$mdLines.Add('- The rerun did not import local unpublished Iranti source.') | Out-Null
$mdLines.Add('') | Out-Null
$mdLines.Add('---') | Out-Null
$mdLines.Add('') | Out-Null
$mdLines.Add('## 5. Notes') | Out-Null
$mdLines.Add('') | Out-Null
$mdLines.Add('- Provider: mock') | Out-Null
$mdLines.Add('- API key was fixed at instance creation time') | Out-Null
$mdLines.Add(('- Each version was started via npx -p iranti@<version> iranti run --instance {0} --root {1}' -f $Instance, $RuntimeRoot)) | Out-Null
$mdLines.Add('- Each version was stopped by the runtime PID reported in iranti status --json') | Out-Null

[string]::Join([Environment]::NewLine, $mdLines) | Set-Content -Path $OutputMarkdown
Write-Output "Wrote $OutputJson and $OutputMarkdown"
