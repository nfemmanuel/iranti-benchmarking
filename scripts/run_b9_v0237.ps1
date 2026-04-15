param(
  [string]$Instance = 'bench_b4_v0236',
  [string]$BaseUrl = 'http://localhost:3511',
  [string]$ApiKey = 'bench_b4_v0236_nf.66889b25030249e0b99040af33fadbf9',
  [string]$OutputPath = 'results/raw/B9-v0237-execution.json'
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
  param(
    [scriptblock]$Action
  )
  $sw = [System.Diagnostics.Stopwatch]::StartNew()
  $result = & $Action
  $sw.Stop()
  return [ordered]@{ elapsedMs = [math]::Round($sw.Elapsed.TotalMilliseconds, 3); result = $result }
}

$prefix = 'b9_v0237'
$entities = [ordered]@{
  ada = "researcher/${prefix}_ada_osei"
  ben = "researcher/${prefix}_ben_marchetti"
  chen = "researcher/${prefix}_chen_park"
  diana = "researcher/${prefix}_diana_sato"
}

$edges = @(
  @{ from = $entities.ada; type = 'CO_AUTHORED_WITH'; to = $entities.ben; properties = @{ paper = 'Federated Graph Learning'; venue = 'ACL 2025' } },
  @{ from = $entities.ada; type = 'COLLABORATES_WITH'; to = $entities.chen; properties = @{ project = 'NeuroSym Initiative' } },
  @{ from = $entities.ben; type = 'CITES_WORK_OF'; to = $entities.diana; properties = @{ citation_count = 7 } },
  @{ from = $entities.diana; type = 'FORMERLY_COLLEAGUES_WITH'; to = $entities.ada; properties = @{ overlap = 'Google Brain 2020-2022' } }
)

$writeResults = @()
foreach ($edge in $edges) {
  $measured = Measure-Call {
    Invoke-IrantiJson -Method Post -Url "$BaseUrl/kb/relate" -Body @{
      fromEntity = $edge.from
      relationshipType = $edge.type
      toEntity = $edge.to
      createdBy = 'benchmark_program_main'
      properties = $edge.properties
    }
  }

  $writeResults += [ordered]@{
    from = $edge.from
    relationshipType = $edge.type
    to = $edge.to
    elapsedMs = $measured.elapsedMs
    success = [bool]$measured.result.success
    raw = $measured.result
  }
}

$relatedAdaMeasured = Measure-Call {
  Invoke-IrantiJson -Method Get -Url "$BaseUrl/kb/related/researcher/${prefix}_ada_osei"
}
$relatedAda = @($relatedAdaMeasured.result)

$deepMeasured = Measure-Call {
  Invoke-IrantiJson -Method Get -Url "$BaseUrl/kb/related/researcher/${prefix}_ada_osei/deep?depth=2"
}
$deep = @($deepMeasured.result)

$searchLexMeasured = Measure-Call {
  Invoke-IrantiJson -Method Get -Url "$BaseUrl/kb/search?query=$([uri]::EscapeDataString("${prefix} CO_AUTHORED_WITH relationships"))&limit=10"
}
$searchLex = @($searchLexMeasured.result.results)

$searchNaturalMeasured = Measure-Call {
  Invoke-IrantiJson -Method Get -Url "$BaseUrl/kb/search?query=$([uri]::EscapeDataString('Ada Osei Ben Marchetti collaboration graph'))&limit=10"
}
$searchNatural = @($searchNaturalMeasured.result.results)

function Has-Edge {
  param(
    [array]$Collection,
    [string]$EntityId,
    [string]$RelationshipType,
    [string]$Direction
  )

  return [bool]($Collection | Where-Object {
    $_.entityId -eq $EntityId -and $_.relationshipType -eq $RelationshipType -and $_.direction -eq $Direction
  } | Select-Object -First 1)
}

$oneHopChecks = [ordered]@{
  benOutbound = Has-Edge -Collection $relatedAda -EntityId "${prefix}_ben_marchetti" -RelationshipType 'CO_AUTHORED_WITH' -Direction 'outbound'
  chenOutbound = Has-Edge -Collection $relatedAda -EntityId "${prefix}_chen_park" -RelationshipType 'COLLABORATES_WITH' -Direction 'outbound'
  dianaInbound = Has-Edge -Collection $relatedAda -EntityId "${prefix}_diana_sato" -RelationshipType 'FORMERLY_COLLEAGUES_WITH' -Direction 'inbound'
}

$deepChecks = [ordered]@{
  benVisible = [bool]($deep | Where-Object { $_.entityId -eq "${prefix}_ben_marchetti" } | Select-Object -First 1)
  chenVisible = [bool]($deep | Where-Object { $_.entityId -eq "${prefix}_chen_park" } | Select-Object -First 1)
  dianaVisible = [bool]($deep | Where-Object { $_.entityId -eq "${prefix}_diana_sato" } | Select-Object -First 1)
  secondHopCitation = Has-Edge -Collection $deep -EntityId "${prefix}_diana_sato" -RelationshipType 'CITES_WORK_OF' -Direction 'outbound'
}

$searchChecks = [ordered]@{
  lexicalReturnedAny = ($searchLex.Count -gt 0)
  naturalReturnedAny = ($searchNatural.Count -gt 0)
  lexicalContainsRelationshipEdge = [bool]($searchLex | Where-Object { $_.relationshipType } | Select-Object -First 1)
  naturalContainsRelationshipEdge = [bool]($searchNatural | Where-Object { $_.relationshipType } | Select-Object -First 1)
}

$output = [ordered]@{
  recordedAt = (Get-Date).ToString('o')
  instance = $Instance
  baseUrl = $BaseUrl
  productVersion = (Invoke-RestMethod -Uri "$BaseUrl/health").version
  writes = $writeResults
  oneHop = [ordered]@{
    elapsedMs = $relatedAdaMeasured.elapsedMs
    count = $relatedAda.Count
    checks = $oneHopChecks
    results = $relatedAda
  }
  deepTraversal = [ordered]@{
    depth = 2
    elapsedMs = $deepMeasured.elapsedMs
    count = $deep.Count
    checks = $deepChecks
    results = $deep
  }
  searchStatus = [ordered]@{
    lexicalElapsedMs = $searchLexMeasured.elapsedMs
    naturalElapsedMs = $searchNaturalMeasured.elapsedMs
    checks = $searchChecks
    lexicalResults = $searchLex
    naturalResults = $searchNatural
  }
}

$outputDir = Split-Path -Parent $OutputPath
if (-not (Test-Path $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

$output | ConvertTo-Json -Depth 12 | Set-Content -Path $OutputPath
Write-Output "Wrote $OutputPath"
