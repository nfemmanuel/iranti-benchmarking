param(
  [string]$Instance = 'bench_b4_v0236',
  [string]$RuntimeRoot = 'C:\Users\NF\.iranti-runtime',
  [string]$BaseUrl = 'http://localhost:3511',
  [string]$ApiKey = 'bench_b4_v0236_nf.66889b25030249e0b99040af33fadbf9',
  [string]$OutputPath = 'results/raw/B1-B13-v0237-execution.json'
)

$ErrorActionPreference = 'Stop'

$cli = 'C:\Users\NF\AppData\Roaming\npm\iranti.cmd'
$headers = @{
  'X-Iranti-Key' = $ApiKey
  'Content-Type' = 'application/json'
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

  $json = $Body | ConvertTo-Json -Depth 10
  return Invoke-RestMethod -Method $Method -Uri $Url -Headers $headers -Body $json
}

function Wait-ForHealth {
  param(
    [int]$TimeoutSeconds = 60,
    [int]$PollMs = 500
  )

  $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
  while ($stopwatch.Elapsed.TotalSeconds -lt $TimeoutSeconds) {
    try {
      $health = Invoke-RestMethod -Uri "$BaseUrl/health"
      if ($health.status -eq 'ok') {
        $stopwatch.Stop()
        return @{
          ok = $true
          elapsedMs = [Math]::Round($stopwatch.Elapsed.TotalMilliseconds, 3)
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
  return @{
    ok = $false
    elapsedMs = [Math]::Round($stopwatch.Elapsed.TotalMilliseconds, 3)
    health = $null
  }
}

$result = [ordered]@{
  recordedAt = (Get-Date).ToString('o')
  version = (& $cli --version).Trim()
  instance = $Instance
  runtimeRoot = $RuntimeRoot
  baseUrl = $BaseUrl
  b1 = [ordered]@{}
  b13 = [ordered]@{}
}

# B1 exact-retrieval arm refresh on current installed version.
$b1Facts = @(
  @{ entity = 'researcher/b1_n0237_alice_chen'; key = 'affiliation'; value = 'MIT Computer Science'; summary = 'Alice Chen is affiliated with MIT Computer Science' },
  @{ entity = 'researcher/b1_n0237_alice_chen'; key = 'publication_count'; value = 47; summary = 'Alice Chen has published 47 papers' },
  @{ entity = 'researcher/b1_n0237_alice_chen'; key = 'previous_employer'; value = 'OpenAI'; summary = 'Alice Chen previously worked at OpenAI' },
  @{ entity = 'researcher/b1_n0237_alice_chen'; key = 'employer_years'; value = '2018-2021'; summary = 'Alice Chen worked at OpenAI from 2018 to 2021' },
  @{ entity = 'researcher/b1_n0237_alice_chen'; key = 'research_focus'; value = 'natural language processing'; summary = 'Alice Chen primary research focus is natural language processing' },
  @{ entity = 'researcher/b1_n0237_bob_okafor'; key = 'affiliation'; value = 'Stanford AI Lab'; summary = 'Bob Okafor is affiliated with Stanford AI Lab' },
  @{ entity = 'researcher/b1_n0237_bob_okafor'; key = 'publication_count'; value = 23; summary = 'Bob Okafor has published 23 papers' },
  @{ entity = 'researcher/b1_n0237_bob_okafor'; key = 'previous_employer'; value = 'DeepMind'; summary = 'Bob Okafor previously worked at DeepMind' },
  @{ entity = 'researcher/b1_n0237_bob_okafor'; key = 'employer_years'; value = '2020-2023'; summary = 'Bob Okafor worked at DeepMind from 2020 to 2023' },
  @{ entity = 'researcher/b1_n0237_bob_okafor'; key = 'research_focus'; value = 'computer vision'; summary = 'Bob Okafor primary research focus is computer vision' }
)

$b1Writes = @()
$b1Queries = @()
$b1Correct = 0

foreach ($fact in $b1Facts) {
  $writeBody = @{
    entity = $fact.entity
    key = $fact.key
    value = $fact.value
    summary = $fact.summary
    confidence = 100
    source = 'B1_v0237_trial'
    agent = 'benchmark_program_main'
  }
  $writeResult = Invoke-IrantiJson -Method Post -Url "$BaseUrl/kb/write" -Body $writeBody
  $b1Writes += [ordered]@{
    entity = $fact.entity
    key = $fact.key
    action = $writeResult.action
    reason = $writeResult.reason
  }
}

foreach ($fact in $b1Facts) {
  $entityParts = $fact.entity.Split('/', 2)
  $queryResult = Invoke-IrantiJson -Method Get -Url "$BaseUrl/kb/query/$($entityParts[0])/$($entityParts[1])/$($fact.key)"
  $isCorrect = ($queryResult.found -eq $true) -and ($queryResult.value -eq $fact.value)
  if ($isCorrect) {
    $b1Correct += 1
  }

  $b1Queries += [ordered]@{
    entity = $fact.entity
    key = $fact.key
    expected = $fact.value
    actual = $queryResult.value
    found = $queryResult.found
    correct = $isCorrect
    raw = $queryResult
  }
}

$result.b1 = [ordered]@{
  scope = 'current-version exact retrieval arm refresh only'
  baselineRerunPerformed = $false
  baselineReason = 'baseline long-context arm was not rerun in this pass; only the installed-product Iranti arm was refreshed on the current version'
  writes = $b1Writes
  queries = $b1Queries
  score = "$b1Correct/$($b1Facts.Count)"
}

# B13 bounded current-version durability/restart/API-surface check.
$b13Facts = @(
  @{ entity = 'v0237_b13_post_restart/test_a'; key = 'written_on'; value = '0.2.37' },
  @{ entity = 'v0237_b13_post_restart/test_b'; key = 'written_on'; value = '0.2.37' },
  @{ entity = 'v0237_b13_post_restart/test_c'; key = 'written_on'; value = '0.2.37' }
)

$b13Writes = @()
$b13PreRestartReads = @()
$b13PostRestartReads = @()

foreach ($fact in $b13Facts) {
  $writeBody = @{
    entity = $fact.entity
    key = $fact.key
    value = $fact.value
    summary = "B13 restart durability marker $($fact.entity)"
    confidence = 90
    source = 'B13_v0237_trial'
    agent = 'benchmark_program_main'
  }
  $writeResult = Invoke-IrantiJson -Method Post -Url "$BaseUrl/kb/write" -Body $writeBody
  $b13Writes += [ordered]@{
    entity = $fact.entity
    key = $fact.key
    action = $writeResult.action
    reason = $writeResult.reason
  }
}

foreach ($fact in $b13Facts) {
  $entityParts = $fact.entity.Split('/', 2)
  $queryResult = Invoke-IrantiJson -Method Get -Url "$BaseUrl/kb/query/$($entityParts[0])/$($entityParts[1])/$($fact.key)"
  $b13PreRestartReads += [ordered]@{
    entity = $fact.entity
    key = $fact.key
    expected = $fact.value
    actual = $queryResult.value
    found = $queryResult.found
    correct = (($queryResult.found -eq $true) -and ($queryResult.value -eq $fact.value))
  }
}

$handshake = Invoke-IrantiJson -Method Post -Url "$BaseUrl/memory/handshake" -Body @{
  agentId = 'benchmark_program_main'
  task = 'B13 current-version restart durability check on v0.2.37'
  recentMessages = @()
}

$restartStopwatch = [System.Diagnostics.Stopwatch]::StartNew()
& $cli instance restart $Instance --root $RuntimeRoot | Out-Null
$restartStopwatch.Stop()

$postRestartHealth = Wait-ForHealth
$statusAfterRestart = & $cli status --root $RuntimeRoot --json | ConvertFrom-Json

foreach ($fact in $b13Facts) {
  $entityParts = $fact.entity.Split('/', 2)
  $queryResult = Invoke-IrantiJson -Method Get -Url "$BaseUrl/kb/query/$($entityParts[0])/$($entityParts[1])/$($fact.key)"
  $b13PostRestartReads += [ordered]@{
    entity = $fact.entity
    key = $fact.key
    expected = $fact.value
    actual = $queryResult.value
    found = $queryResult.found
    correct = (($queryResult.found -eq $true) -and ($queryResult.value -eq $fact.value))
  }
}

$result.b13 = [ordered]@{
  scope = 'current-version bounded durability only; restart continuity + handshake API surface, not cross-version upgrade durability'
  crossVersionDurabilityClaim = 'not measured in this run'
  writes = $b13Writes
  preRestartReads = $b13PreRestartReads
  handshake = $handshake
  restart = @{
    command = "iranti instance restart $Instance --root $RuntimeRoot"
    commandElapsedMs = [Math]::Round($restartStopwatch.Elapsed.TotalMilliseconds, 3)
    healthConvergence = $postRestartHealth
    statusAfterRestart = $statusAfterRestart
  }
  postRestartReads = $b13PostRestartReads
}

$outputDir = Split-Path -Parent $OutputPath
if (-not (Test-Path $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

$result | ConvertTo-Json -Depth 12 | Set-Content -Path $OutputPath
Write-Output "Wrote $OutputPath"
