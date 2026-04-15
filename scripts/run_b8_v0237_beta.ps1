param(
  [string]$BaseUrl = 'http://localhost:3511',
  [string]$ApiKey = 'bench_b4_v0236_nf.66889b25030249e0b99040af33fadbf9',
  [string]$Entity = 'project/b8_coordination_v0237',
  [string]$OutputPath = 'results/raw/B8-v0237-beta.json'
)

$ErrorActionPreference = 'Stop'

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

function Measure-Call {
  param([scriptblock]$Action)
  $sw = [System.Diagnostics.Stopwatch]::StartNew()
  $result = & $Action
  $sw.Stop()
  [ordered]@{ elapsedMs = [math]::Round($sw.Elapsed.TotalMilliseconds, 3); result = $result }
}

function Query-Fact {
  param([string]$Entity,[string]$Key)
  $parts = $Entity.Split('/', 2)
  Invoke-IrantiJson -Method Get -Url "$BaseUrl/kb/query/$($parts[0])/$($parts[1])/$Key"
}

function Search-Facts {
  param([string]$Query,[int]$Limit = 5)
  Invoke-IrantiJson -Method Get -Url "$BaseUrl/kb/search?query=$([uri]::EscapeDataString($Query))&limit=$Limit"
}

$discoveryCases = @(
  @{ id = 'a'; query = 'HorizonStream architecture decisions' },
  @{ id = 'b'; query = 'Kafka event-sourced CQRS' },
  @{ id = 'c'; query = 'b8_coordination architectural decision' },
  @{ id = 'd'; query = 'dead letter queue Kafka retries' }
)

$retrievalFacts = @(
  @{ key = 'decision_1_architecture'; expected = 'event-sourced CQRS with Kafka as primary broker' },
  @{ key = 'decision_2_retention'; expected = '7-day hot retention on Kafka; cold archival to S3 via Kafka Connect' },
  @{ key = 'decision_3_serialization'; expected = 'Apache Avro with Schema Registry; backward-compatible schema evolution only' },
  @{ key = 'decision_4_consumer_groups'; expected = 'max 3 consumer groups per topic; group isolation via Kafka ACLs per service' },
  @{ key = 'decision_5_dlq'; expected = 'dead letter queue per topic; 3 retries at 30s intervals then manual review' },
  @{ key = 'decision_6_monitoring'; expected = 'Prometheus via JMX exporter; consumer lag >10000 triggers PagerDuty' }
)

$discoveryResults = @()
$discoveryTargetHits = 0
$discoveryLexicalHits = 0
foreach ($case in $discoveryCases) {
  $measured = Measure-Call { Search-Facts -Query $case.query -Limit 5 }
  $results = @($measured.result.results)
  $target = $results | Where-Object { $_.entity -eq $Entity } | Select-Object -First 1
  if ($target) { $discoveryTargetHits += 1 }
  if ($target -and $target.lexicalScore -gt 0) { $discoveryLexicalHits += 1 }
  $discoveryResults += [ordered]@{
    id = $case.id
    query = $case.query
    elapsedMs = $measured.elapsedMs
    targetFound = [bool]$target
    targetIndex = if ($target) { [array]::IndexOf($results, $target) } else { -1 }
    targetLexicalScore = if ($target) { $target.lexicalScore } else { $null }
    targetVectorScore = if ($target) { $target.vectorScore } else { $null }
    results = $results
  }
}

$retrievalResults = @()
$retrievalCorrect = 0
foreach ($fact in $retrievalFacts) {
  $measured = Measure-Call { Query-Fact -Entity $Entity -Key $fact.key }
  $found = $measured.result.found -eq $true
  $sourceOk = $measured.result.source -eq 'b8_alpha_session_v0237'
  $valueOk = $measured.result.value -eq $fact.expected
  $correct = $found -and $sourceOk -and $valueOk
  if ($correct) { $retrievalCorrect += 1 }
  $retrievalResults += [ordered]@{
    key = $fact.key
    elapsedMs = $measured.elapsedMs
    found = $found
    expected = $fact.expected
    actual = $measured.result.value
    source = $measured.result.source
    sourceOk = $sourceOk
    correct = $correct
    raw = $measured.result
  }
}

$whoKnows = $null
$whoKnowsError = $null
$parts = $Entity.Split('/',2)
try {
  $measuredWhoKnows = Measure-Call { Invoke-IrantiJson -Method Get -Url "$BaseUrl/memory/whoknows/$($parts[0])/$($parts[1])" }
  $whoKnows = [ordered]@{
    elapsedMs = $measuredWhoKnows.elapsedMs
    raw = $measuredWhoKnows.result
  }
} catch {
  $whoKnowsError = $_.Exception.Message
}

$discoveryClassification =
  if ($discoveryTargetHits -eq 0) {
    'failed'
  } elseif ($discoveryLexicalHits -eq $discoveryTargetHits -and $discoveryTargetHits -eq $discoveryCases.Count) {
    'strong'
  } elseif ($discoveryLexicalHits -ge 1) {
    'vector-led'
  } else {
    'over-broad'
  }
$output = [ordered]@{
  recordedAt = (Get-Date).ToString('o')
  role = 'beta'
  entity = $Entity
  productVersion = (Invoke-RestMethod -Uri "$BaseUrl/health").version
  discovery = [ordered]@{
    targetHitCount = $discoveryTargetHits
    lexicalHitCount = $discoveryLexicalHits
    totalQueries = $discoveryCases.Count
    classification = $discoveryClassification
    results = $discoveryResults
  }
  retrieval = [ordered]@{
    score = "$retrievalCorrect/$($retrievalFacts.Count)"
    results = $retrievalResults
  }
  attribution = [ordered]@{
    sourceFieldConfirmedAll = ($retrievalCorrect -eq $retrievalFacts.Count)
    whoKnows = $whoKnows
    whoKnowsError = $whoKnowsError
  }
}

$outputDir = Split-Path -Parent $OutputPath
if (-not (Test-Path $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

$output | ConvertTo-Json -Depth 12 | Set-Content -Path $OutputPath
Write-Output "Wrote $OutputPath"
