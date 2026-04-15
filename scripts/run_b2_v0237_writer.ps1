param(
  [string]$BaseUrl = 'http://localhost:3511',
  [string]$ApiKey = 'bench_b4_v0236_nf.66889b25030249e0b99040af33fadbf9',
  [string]$Prefix = 'b2_v0237r1',
  [string]$OutputPath = 'results/raw/B2-v0237r1-writer.json'
)

$ErrorActionPreference = 'Stop'
$headers = @{ 'X-Iranti-Key' = $ApiKey; 'Content-Type' = 'application/json' }

function Invoke-IrantiJson {
  param([string]$Method,[string]$Url,$Body = $null)
  if ($null -eq $Body) { return Invoke-RestMethod -Method $Method -Uri $Url -Headers $headers }
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

function New-EntityId {
  param([string]$BaseId)
  return "${Prefix}_$BaseId"
}

$dataset = @(
  @{ entityType='researcher'; entityId='priya_nair'; key='affiliation'; value='University of Toronto' },
  @{ entityType='researcher'; entityId='priya_nair'; key='publication_count'; value=34 },
  @{ entityType='researcher'; entityId='priya_nair'; key='previous_employer'; value='IBM Research (2016-2020)' },
  @{ entityType='researcher'; entityId='priya_nair'; key='research_focus'; value='federated learning (primary)' },
  @{ entityType='researcher'; entityId='james_osei'; key='affiliation'; value='Oxford Machine Learning Research Group' },
  @{ entityType='researcher'; entityId='james_osei'; key='publication_count'; value=19 },
  @{ entityType='researcher'; entityId='james_osei'; key='previous_employer'; value='Meta AI (2021-2023)' },
  @{ entityType='researcher'; entityId='james_osei'; key='research_focus'; value='graph neural networks (primary)' },
  @{ entityType='researcher'; entityId='yuki_tanaka'; key='affiliation'; value='KAIST AI Institute' },
  @{ entityType='researcher'; entityId='yuki_tanaka'; key='publication_count'; value=28 },
  @{ entityType='researcher'; entityId='yuki_tanaka'; key='previous_employer'; value='Samsung Research (2017-2021)' },
  @{ entityType='researcher'; entityId='yuki_tanaka'; key='research_focus'; value='vision-language models (primary)' },
  @{ entityType='researcher'; entityId='fatima_al_rashid'; key='affiliation'; value='KAUST' },
  @{ entityType='researcher'; entityId='fatima_al_rashid'; key='publication_count'; value=41 },
  @{ entityType='researcher'; entityId='fatima_al_rashid'; key='previous_employer'; value='Microsoft Research (2015-2019)' },
  @{ entityType='researcher'; entityId='fatima_al_rashid'; key='research_focus'; value='causal inference (primary)' },
  @{ entityType='researcher'; entityId='marco_deluca'; key='affiliation'; value='ETH Zurich AI Center' },
  @{ entityType='researcher'; entityId='marco_deluca'; key='publication_count'; value=56 },
  @{ entityType='researcher'; entityId='marco_deluca'; key='previous_employer'; value='NVIDIA Research (2018-2022)' },
  @{ entityType='researcher'; entityId='marco_deluca'; key='research_focus'; value='hardware-efficient neural networks (primary)' }
)

$first = $dataset[0]
$targetEntityId = New-EntityId $first.entityId
$preflight = Measure-Call { Invoke-IrantiJson -Method Get -Url "$BaseUrl/kb/query/$($first.entityType)/$targetEntityId/$($first.key)" }
if ($preflight.result.found -eq $true) {
  throw "B2 v0237 precondition failed: ${Prefix} dataset already exists in benchmark runtime."
}

$writes = @()
foreach ($fact in $dataset) {
  $entityId = New-EntityId $fact.entityId
  $entity = "$($fact.entityType)/$entityId"
  $summary = "B2 benchmark fact for $entity :: $($fact.key)"
  $measured = Measure-Call {
    Invoke-IrantiJson -Method Post -Url "$BaseUrl/kb/write" -Body @{
      entity = $entity
      key = $fact.key
      value = $fact.value
      summary = $summary
      confidence = 95
      source = 'b2_benchmark_ingest_v0237'
      agent = 'b2_writer_v0237'
    }
  }
  $writes += [ordered]@{
    entity = $entity
    key = $fact.key
    expected = $fact.value
    elapsedMs = $measured.elapsedMs
    action = $measured.result.action
    source = 'b2_benchmark_ingest_v0237'
    raw = $measured.result
  }
}

$output = [ordered]@{
  recordedAt = (Get-Date).ToString('o')
  role = 'writer'
  processId = $PID
  productVersion = (Invoke-RestMethod -Uri "$BaseUrl/health").version
  baseUrl = $BaseUrl
  prefix = $Prefix
  source = 'b2_benchmark_ingest_v0237'
  agent = 'b2_writer_v0237'
  preflight = [ordered]@{
    elapsedMs = $preflight.elapsedMs
    found = $preflight.result.found
    raw = $preflight.result
  }
  writes = $writes
}

$outputDir = Split-Path -Parent $OutputPath
if (-not (Test-Path $outputDir)) { New-Item -ItemType Directory -Path $outputDir -Force | Out-Null }
$output | ConvertTo-Json -Depth 12 | Set-Content -Path $OutputPath
Write-Output "Wrote $OutputPath"
