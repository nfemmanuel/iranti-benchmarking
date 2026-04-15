param(
  [string]$BaseUrl = 'http://localhost:3511',
  [string]$ApiKey = 'bench_b4_v0236_nf.66889b25030249e0b99040af33fadbf9',
  [string]$Entity = 'project/b8_coordination_v0237',
  [string]$OutputPath = 'results/raw/B8-v0237-alpha.json'
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

$parts = $Entity.Split('/', 2)
$preflight = Measure-Call { Invoke-IrantiJson -Method Get -Url "$BaseUrl/kb/query/$($parts[0])/$($parts[1])/decision_1_architecture" }
if ($preflight.result.found -eq $true) {
  throw "B8 v0237 precondition failed: $Entity already has decision_1_architecture; benchmark instance is contaminated."
}

$facts = @(
  @{ key = 'decision_1_architecture'; value = 'event-sourced CQRS with Kafka as primary broker'; summary = 'Architecture decision: event-sourced CQRS with Kafka as primary broker' },
  @{ key = 'decision_2_retention'; value = '7-day hot retention on Kafka; cold archival to S3 via Kafka Connect'; summary = 'Retention decision: 7-day hot retention on Kafka; cold archival to S3 via Kafka Connect' },
  @{ key = 'decision_3_serialization'; value = 'Apache Avro with Schema Registry; backward-compatible schema evolution only'; summary = 'Serialization decision: Apache Avro with Schema Registry; backward-compatible schema evolution only' },
  @{ key = 'decision_4_consumer_groups'; value = 'max 3 consumer groups per topic; group isolation via Kafka ACLs per service'; summary = 'Consumer groups decision: max 3 consumer groups per topic; group isolation via Kafka ACLs per service' },
  @{ key = 'decision_5_dlq'; value = 'dead letter queue per topic; 3 retries at 30s intervals then manual review'; summary = 'DLQ decision: dead letter queue per topic; 3 retries at 30s intervals then manual review' },
  @{ key = 'decision_6_monitoring'; value = 'Prometheus via JMX exporter; consumer lag >10000 triggers PagerDuty'; summary = 'Monitoring decision: Prometheus via JMX exporter; consumer lag >10000 triggers PagerDuty' }
)

$writes = @()
foreach ($fact in $facts) {
  $measured = Measure-Call {
    Invoke-IrantiJson -Method Post -Url "$BaseUrl/kb/write" -Body @{
      entity = $Entity
      key = $fact.key
      value = $fact.value
      summary = $fact.summary
      confidence = 90
      source = 'b8_alpha_session_v0237'
      agent = 'b8_agent_alpha_v0237'
    }
  }

  $writes += [ordered]@{
    key = $fact.key
    expectedValue = $fact.value
    elapsedMs = $measured.elapsedMs
    action = $measured.result.action
    reason = $measured.result.reason
    resolvedEntity = $measured.result.resolvedEntity
    raw = $measured.result
  }
}

$output = [ordered]@{
  recordedAt = (Get-Date).ToString('o')
  role = 'alpha'
  entity = $Entity
  source = 'b8_alpha_session_v0237'
  agent = 'b8_agent_alpha_v0237'
  productVersion = (Invoke-RestMethod -Uri "$BaseUrl/health").version
  preflight = [ordered]@{
    elapsedMs = $preflight.elapsedMs
    found = $preflight.result.found
    raw = $preflight.result
  }
  writes = $writes
}

$outputDir = Split-Path -Parent $OutputPath
if (-not (Test-Path $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

$output | ConvertTo-Json -Depth 12 | Set-Content -Path $OutputPath
Write-Output "Wrote $OutputPath"
