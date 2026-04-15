param(
  [string]$RuntimeRoot = 'C:\Users\NF\.iranti-runtime',
  [string]$Instance = 'bench_b1_full_v0238',
  [int]$Port = 3513,
  [string]$DbHost = 'localhost',
  [int]$DbPort = 55436,
  [string]$DbUser = 'postgres',
  [string]$DbPassword = '053435',
  [string]$Database = 'iranti_bench_b1_full_v0238_db',
  [string]$ApiKey = 'bench_b1_full_v0238_nf.0e8548f49a1040d097c2dd929d98cb8b',
  [string]$DatasetPath = 'benchmarks/B1-entity-retrieval/dataset-2000-blind.md',
  [string]$AnthropicModel = 'claude-sonnet-4-5-20250929',
  [string]$OutputJson = 'results/raw/B1-full-v0238-execution.json',
  [string]$OutputMarkdown = 'results/raw/B1-full-v0238-trial.md'
)

$ErrorActionPreference = 'Stop'

$cli = 'C:\Users\NF\AppData\Roaming\npm\iranti.cmd'
$instanceDir = Join-Path $RuntimeRoot "instances\$Instance"
$baseUrl = "http://localhost:$Port"
$dbUrl = "postgresql://${DbUser}:${DbPassword}@${DbHost}:${DbPort}/${Database}"
$datasetFullPath = Join-Path (Get-Location) $DatasetPath
$headers = @{
  'X-Iranti-Key' = $ApiKey
  'Content-Type' = 'application/json'
}

$questions = @(
  @{ id = 'Q1'; entity = 'alice_chen'; key = 'affiliation'; prompt = 'What is researcher/alice_chen''s affiliation? Return only the affiliation.'; expected = 'MIT Computer Science' },
  @{ id = 'Q2'; entity = 'alice_chen'; key = 'publication_count'; prompt = 'What is researcher/alice_chen''s publication count? Return only the number.'; expected = '47' },
  @{ id = 'Q3'; entity = 'alice_chen'; key = 'previous_employer'; prompt = 'What is researcher/alice_chen''s previous employer name only? Return only the employer name.'; expected = 'OpenAI' },
  @{ id = 'Q4'; entity = 'alice_chen'; key = 'previous_employer_years'; prompt = 'What are researcher/alice_chen''s previous employer years? Return only the year range.'; expected = '2018-2021' },
  @{ id = 'Q5'; entity = 'alice_chen'; key = 'research_focus_primary'; prompt = 'What is researcher/alice_chen''s primary research focus? Return only the primary focus.'; expected = 'natural language processing' },
  @{ id = 'Q6'; entity = 'bob_okafor'; key = 'affiliation'; prompt = 'What is researcher/bob_okafor''s affiliation? Return only the affiliation.'; expected = 'Stanford AI Lab' },
  @{ id = 'Q7'; entity = 'bob_okafor'; key = 'publication_count'; prompt = 'What is researcher/bob_okafor''s publication count? Return only the number.'; expected = '23' },
  @{ id = 'Q8'; entity = 'bob_okafor'; key = 'previous_employer'; prompt = 'What is researcher/bob_okafor''s previous employer name only? Return only the employer name.'; expected = 'DeepMind' },
  @{ id = 'Q9'; entity = 'bob_okafor'; key = 'previous_employer_years'; prompt = 'What are researcher/bob_okafor''s previous employer years? Return only the year range.'; expected = '2020-2023' },
  @{ id = 'Q10'; entity = 'bob_okafor'; key = 'research_focus_primary'; prompt = 'What is researcher/bob_okafor''s primary research focus? Return only the primary focus.'; expected = 'computer vision' }
)

$irantiFacts = @(
  @{ entity = 'researcher/b1_n0238_alice_chen'; key = 'affiliation'; value = 'MIT Computer Science'; summary = 'Alice Chen is affiliated with MIT Computer Science' },
  @{ entity = 'researcher/b1_n0238_alice_chen'; key = 'publication_count'; value = 47; summary = 'Alice Chen has 47 publications' },
  @{ entity = 'researcher/b1_n0238_alice_chen'; key = 'previous_employer'; value = 'OpenAI'; summary = 'Alice Chen previously worked at OpenAI' },
  @{ entity = 'researcher/b1_n0238_alice_chen'; key = 'employer_years'; value = '2018-2021'; summary = 'Alice Chen worked at OpenAI from 2018 to 2021' },
  @{ entity = 'researcher/b1_n0238_alice_chen'; key = 'research_focus'; value = 'natural language processing'; summary = 'Alice Chen primary research focus is natural language processing' },
  @{ entity = 'researcher/b1_n0238_bob_okafor'; key = 'affiliation'; value = 'Stanford AI Lab'; summary = 'Bob Okafor is affiliated with Stanford AI Lab' },
  @{ entity = 'researcher/b1_n0238_bob_okafor'; key = 'publication_count'; value = 23; summary = 'Bob Okafor has 23 publications' },
  @{ entity = 'researcher/b1_n0238_bob_okafor'; key = 'previous_employer'; value = 'DeepMind'; summary = 'Bob Okafor previously worked at DeepMind' },
  @{ entity = 'researcher/b1_n0238_bob_okafor'; key = 'employer_years'; value = '2020-2023'; summary = 'Bob Okafor worked at DeepMind from 2020 to 2023' },
  @{ entity = 'researcher/b1_n0238_bob_okafor'; key = 'research_focus'; value = 'computer vision'; summary = 'Bob Okafor primary research focus is computer vision' }
)

function Ensure-Dir {
  param([string]$Path)
  $dir = Split-Path -Parent $Path
  if ($dir -and -not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }
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

function Normalize-Scalar {
  param($Value)
  return ([string]$Value).Trim().Trim('"')
}

Ensure-Dir -Path $OutputJson
Ensure-Dir -Path $OutputMarkdown

$env:PGPASSWORD = $DbPassword
& psql -h $DbHost -p $DbPort -U $DbUser -d postgres -tAc "DROP DATABASE IF EXISTS ${Database};" | Out-Null
& psql -h $DbHost -p $DbPort -U $DbUser -d postgres -tAc "CREATE DATABASE ${Database};" | Out-Null

if (Test-Path $instanceDir) {
  Remove-Item -Recurse -Force $instanceDir
}

& $cli --root $RuntimeRoot instance create $Instance --port $Port --db-url $dbUrl --api-key $ApiKey --provider mock | Out-Null

$outLog = Join-Path (Split-Path -Parent $OutputJson) "${Instance}_run_v0238.out.log"
$errLog = Join-Path (Split-Path -Parent $OutputJson) "${Instance}_run_v0238.err.log"
foreach ($path in @($outLog, $errLog)) {
  if (Test-Path $path) { Remove-Item $path -Force }
}
$runWrapper = Start-Process -FilePath $cli -ArgumentList @('--root', $RuntimeRoot, 'run', '--instance', $Instance) -RedirectStandardOutput $outLog -RedirectStandardError $errLog -PassThru
$health = Wait-ForHealth -Url "$baseUrl/health"
if (-not $health.ok) {
  throw "Installed 0.2.38 runtime for $Instance did not reach health."
}

$dataset = Get-Content $datasetFullPath -Raw
$instanceEnv = Get-Content (Join-Path $instanceDir '.env')
$anthropicKey = (($instanceEnv | Where-Object { $_ -like 'ANTHROPIC_API_KEY=*' }) -replace '^ANTHROPIC_API_KEY=', '').Trim()
if (-not $anthropicKey) {
  $devEnv = 'C:\Users\NF\.iranti-runtime\instances\iranti_dev\.env'
  if (Test-Path $devEnv) {
    $devLines = Get-Content $devEnv
    $anthropicKey = (($devLines | Where-Object { $_ -like 'ANTHROPIC_API_KEY=*' }) -replace '^ANTHROPIC_API_KEY=', '').Trim()
  }
}
if (-not $anthropicKey) {
  $anthropicKey = (($env:ANTHROPIC_API_KEY) | ForEach-Object { $_.Trim() })
}
if (-not $anthropicKey) {
  throw 'ANTHROPIC_API_KEY not found in benchmark environment.'
}

$baselinePrompt = @"
You are running a benchmark. Use only the provided haystack document.
Return strict JSON with keys Q1 through Q10. Each value must be a string.
Do not include explanations.

Questions:
Q1: What is researcher/alice_chen's affiliation?
Q2: What is researcher/alice_chen's publication count?
Q3: What is researcher/alice_chen's previous employer name only?
Q4: What are researcher/alice_chen's previous employer years?
Q5: What is researcher/alice_chen's primary research focus?
Q6: What is researcher/bob_okafor's affiliation?
Q7: What is researcher/bob_okafor's publication count?
Q8: What is researcher/bob_okafor's previous employer name only?
Q9: What are researcher/bob_okafor's previous employer years?
Q10: What is researcher/bob_okafor's primary research focus?

Haystack document:
$dataset
"@

$baselineBody = @{
  model = $AnthropicModel
  max_tokens = 300
  temperature = 0
  messages = @(
    @{
      role = 'user'
      content = $baselinePrompt
    }
  )
}

$baselineStopwatch = [System.Diagnostics.Stopwatch]::StartNew()
$baselineResponse = Invoke-RestMethod -Method Post -Uri 'https://api.anthropic.com/v1/messages' -Headers @{
  'x-api-key' = $anthropicKey
  'anthropic-version' = '2023-06-01'
  'content-type' = 'application/json'
} -Body ($baselineBody | ConvertTo-Json -Depth 10)
$baselineStopwatch.Stop()

$baselineText = ($baselineResponse.content | Where-Object { $_.type -eq 'text' } | Select-Object -ExpandProperty text) -join "`n"
$baselineAnswers = $baselineText | ConvertFrom-Json
$baselineRows = @()
$baselineCorrect = 0
foreach ($q in $questions) {
  $actual = Normalize-Scalar -Value $baselineAnswers.($q.id)
  $expected = Normalize-Scalar -Value $q.expected
  $correct = $actual -eq $expected
  if ($correct) { $baselineCorrect += 1 }
  $baselineRows += [ordered]@{
    id = $q.id
    prompt = $q.prompt
    expected = $expected
    actual = $actual
    correct = $correct
  }
}

$irantiWrites = @()
foreach ($fact in $irantiFacts) {
  $write = Invoke-IrantiJson -Method Post -Url "$baseUrl/kb/write" -Body @{
    entity = $fact.entity
    key = $fact.key
    value = $fact.value
    summary = $fact.summary
    confidence = 100
    source = 'B1_v0238_trial'
    agent = 'benchmark_program_main'
  }
  $irantiWrites += [ordered]@{
    entity = $fact.entity
    key = $fact.key
    action = $write.action
    reason = $write.reason
  }
}

$irantiRows = @()
$irantiCorrect = 0
$queryStopwatch = [System.Diagnostics.Stopwatch]::StartNew()
foreach ($q in $questions) {
  $entity = if ($q.entity -eq 'alice_chen') { 'researcher/b1_n0238_alice_chen' } else { 'researcher/b1_n0238_bob_okafor' }
  $key = switch ($q.key) {
    'previous_employer_years' { 'employer_years' }
    'research_focus_primary' { 'research_focus' }
    default { $q.key }
  }
  $entityParts = $entity.Split('/', 2)
  $query = Invoke-IrantiJson -Method Get -Url "$baseUrl/kb/query/$($entityParts[0])/$($entityParts[1])/$key"
  $actual = Normalize-Scalar -Value $query.value
  $expected = Normalize-Scalar -Value $q.expected
  $correct = ($query.found -eq $true) -and ($actual -eq $expected)
  if ($correct) { $irantiCorrect += 1 }
  $irantiRows += [ordered]@{
    id = $q.id
    entity = $entity
    key = $key
    expected = $expected
    actual = $actual
    found = $query.found
    correct = $correct
  }
}
$queryStopwatch.Stop()

$status = & $cli --root $RuntimeRoot status --json | ConvertFrom-Json
$instanceStatus = $status.instances | Where-Object { $_.name -eq $Instance }
$runtimePid = [int]$instanceStatus.runtime.state.pid
$stopResult = & taskkill /PID $runtimePid /T /F 2>&1

$result = [ordered]@{
  recordedAt = (Get-Date).ToString('o')
  benchmark = 'B1'
  trialType = 'current public comparison refresh'
  productVersion = (& $cli --version).Trim()
  anthropicModel = $AnthropicModel
  dataset = $DatasetPath
  instance = $Instance
  baseUrl = $baseUrl
  baseline = [ordered]@{
    protocol = 'single-call long-context baseline against dataset-2000-blind.md with exact-match scoring'
    elapsedMs = [math]::Round($baselineStopwatch.Elapsed.TotalMilliseconds, 3)
    rawText = $baselineText
    score = "$baselineCorrect/$($questions.Count)"
    rows = $baselineRows
  }
  iranti = [ordered]@{
    protocol = 'installed-product exact retrieval arm on clean disposable 0.2.38 instance'
    writes = $irantiWrites
    queryElapsedMs = [math]::Round($queryStopwatch.Elapsed.TotalMilliseconds, 3)
    score = "$irantiCorrect/$($questions.Count)"
    rows = $irantiRows
  }
  cleanup = [ordered]@{
    runtimePid = $runtimePid
    taskkill = ($stopResult -join "`n").Trim()
  }
}

$result | ConvertTo-Json -Depth 14 | Set-Content -Path $OutputJson

$comparison = if ($baselineCorrect -eq $irantiCorrect) { 'null accuracy differential' } elseif ($irantiCorrect -gt $baselineCorrect) { 'Iranti accuracy advantage' } else { 'baseline accuracy advantage' }
$md = @"
# B1 Current Public Comparison Refresh - v0.2.38

**Track:** B1 - Entity Fact Retrieval Under Distractor Density  
**Trial type:** Current public comparison refresh  
**Executed:** $(Get-Date -Format 'yyyy-MM-dd')  
**Iranti version:** $((& $cli --version).Trim())  
**Baseline model:** $AnthropicModel  
**Dataset:** $DatasetPath  
**Source of truth:** `$OutputJson`

---

## 1. Scope

This run refreshes both arms on current surfaces:

- long-context baseline against the blind `N=2000` haystack
- exact-retrieval Iranti arm on a clean disposable installed-product instance

This run uses exact-match scoring and does not rely on model self-judging.

---

## 2. Scores

| Arm | Score |
|---|---:|
| Baseline | $baselineCorrect/$($questions.Count) |
| Iranti | $irantiCorrect/$($questions.Count) |

Comparison classification: **$comparison**

---

## 3. Notes

- Baseline protocol: single-call long-context answer over `dataset-2000-blind.md`
- Iranti protocol: fresh writes plus exact entity/key lookup on installed `0.2.38`
- Baseline elapsed: $([math]::Round($baselineStopwatch.Elapsed.TotalMilliseconds, 3)) ms
- Iranti query elapsed for all 10 reads: $([math]::Round($queryStopwatch.Elapsed.TotalMilliseconds, 3)) ms
"@

$md | Set-Content -Path $OutputMarkdown
Write-Output "Wrote $OutputJson and $OutputMarkdown"
