param(
  [string]$Instance = 'bench_b4_v0236',
  [string]$RuntimeRoot = 'C:\Users\NF\.iranti-runtime',
  [string]$BaseUrl = 'http://localhost:3511',
  [string]$ApiKey = 'bench_b4_v0236_nf.66889b25030249e0b99040af33fadbf9',
  [string]$OutputPath = 'results/raw/B4-v0236-execution.json',
  [string]$DbHost = $(if ($env:IRANTI_BENCH_DB_HOST) { $env:IRANTI_BENCH_DB_HOST } else { 'localhost' }),
  [int]$DbPort = $(if ($env:IRANTI_BENCH_DB_PORT) { [int]$env:IRANTI_BENCH_DB_PORT } else { 5432 }),
  [string]$DbUser = $(if ($env:IRANTI_BENCH_DB_USER) { $env:IRANTI_BENCH_DB_USER } else { 'postgres' }),
  [string]$DbPassword = $(if ($env:IRANTI_BENCH_DB_PASSWORD) { $env:IRANTI_BENCH_DB_PASSWORD } else { '053435' }),
  [string]$Database = 'iranti_bench_b4_v0236_db'
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

function Query-Fact {
  param(
    [string]$Entity,
    [string]$Key
  )

  $parts = $Entity.Split('/', 2)
  return Invoke-IrantiJson -Method Get -Url "$BaseUrl/kb/query/$($parts[0])/$($parts[1])/$Key"
}

function Search-Facts {
  param(
    [string]$Query,
    [int]$Limit = 5
  )

  return Invoke-IrantiJson -Method Get -Url "$BaseUrl/kb/search?query=$([uri]::EscapeDataString($Query))&limit=$Limit"
}

$facts = @(
  @{ entity = 'researcher/b4_v0236_alice_chen'; key = 'affiliation'; value = 'MIT Computer Science'; summary = 'Alice Chen is affiliated with MIT Computer Science' },
  @{ entity = 'researcher/b4_v0236_alice_chen'; key = 'previous_employer'; value = 'OpenAI'; summary = 'Alice Chen previously worked at OpenAI' },
  @{ entity = 'researcher/b4_v0236_bob_okafor'; key = 'affiliation'; value = 'Stanford AI Lab'; summary = 'Bob Okafor is affiliated with Stanford AI Lab' },
  @{ entity = 'researcher/b4_v0236_chen_wei_mit'; key = 'affiliation'; value = 'MIT Computer Science'; summary = 'Chen Wei is affiliated with MIT Computer Science' },
  @{ entity = 'researcher/b4_v0236_chen_wei_mit'; key = 'research_focus'; value = 'interpretable ML'; summary = "Chen Wei's research focus is interpretable ML" },
  @{ entity = 'researcher/b4_v0236_lena_gross'; key = 'affiliation'; value = 'OpenAI Research'; summary = 'Lena Gross is affiliated with OpenAI Research' },
  @{ entity = 'researcher/b4_v0236_lena_gross'; key = 'publication_count'; value = 31; summary = 'Lena Gross has published 31 papers' },
  @{ entity = 'researcher/b4_v0236_marcus_lin'; key = 'affiliation'; value = 'Stanford AI Lab'; summary = 'Marcus Lin is affiliated with Stanford AI Lab' },
  @{ entity = 'researcher/b4_v0236_marcus_lin'; key = 'previous_employer'; value = 'Apple ML Research'; summary = 'Marcus Lin previously worked at Apple ML Research' },
  @{ entity = 'researcher/b4_v0236_aisha_okonkwo'; key = 'previous_employer'; value = 'Google DeepMind'; summary = 'Aisha Okonkwo previously worked at Google DeepMind' },
  @{ entity = 'researcher/b4_v0236_aisha_okonkwo'; key = 'research_focus'; value = 'AI safety'; summary = "Aisha Okonkwo's research focus is AI safety" }
)

$oracleCases = @(
  @{ id = 'Q1'; entity = 'researcher/b4_v0236_chen_wei_mit'; key = 'research_focus'; expected = 'interpretable ML' },
  @{ id = 'Q2'; entity = 'researcher/b4_v0236_lena_gross'; key = 'publication_count'; expected = 31 },
  @{ id = 'Q3'; entity = 'researcher/b4_v0236_marcus_lin'; key = 'previous_employer'; expected = 'Apple ML Research' },
  @{ id = 'Q4'; entity = 'researcher/b4_v0236_aisha_okonkwo'; key = 'research_focus'; expected = 'AI safety' }
)

$searchCases = @(
  @{ id = 'Q1'; hopEntity = 'researcher/b4_v0236_alice_chen'; hopKey = 'affiliation'; hopValueExpected = 'MIT Computer Science'; searchQuery = 'MIT Computer Science affiliation researcher'; targetEntity = 'researcher/b4_v0236_chen_wei_mit'; targetKey = 'research_focus'; targetExpected = 'interpretable ML' },
  @{ id = 'Q2'; hopEntity = 'researcher/b4_v0236_alice_chen'; hopKey = 'previous_employer'; hopValueExpected = 'OpenAI'; searchQuery = 'OpenAI researcher publication count'; targetEntity = 'researcher/b4_v0236_lena_gross'; targetKey = 'publication_count'; targetExpected = 31 },
  @{ id = 'Q3'; hopEntity = 'researcher/b4_v0236_bob_okafor'; hopKey = 'affiliation'; hopValueExpected = 'Stanford AI Lab'; searchQuery = 'Stanford AI Lab researcher previous employer'; targetEntity = 'researcher/b4_v0236_marcus_lin'; targetKey = 'previous_employer'; targetExpected = 'Apple ML Research' },
  @{ id = 'Q4'; hopEntity = $null; hopKey = $null; hopValueExpected = 'Google DeepMind'; searchQuery = 'Google DeepMind previous employer researcher'; targetEntity = 'researcher/b4_v0236_aisha_okonkwo'; targetKey = 'research_focus'; targetExpected = 'AI safety' }
)

$coldCases = @(
  @{ id = 'C1'; searchQuery = 'researcher working at alice_chen institution MIT'; targetEntity = 'researcher/b4_v0236_chen_wei_mit' },
  @{ id = 'C2'; searchQuery = 'researcher employed at OpenAI Research lab'; targetEntity = 'researcher/b4_v0236_lena_gross' },
  @{ id = 'C3'; searchQuery = 'researcher at Stanford AI Lab'; targetEntity = 'researcher/b4_v0236_marcus_lin' },
  @{ id = 'C4'; searchQuery = 'researcher previously worked Google DeepMind AI safety'; targetEntity = 'researcher/b4_v0236_aisha_okonkwo' }
)

$writeResults = @()
foreach ($fact in $facts) {
  $writeBody = @{
    entity = $fact.entity
    key = $fact.key
    value = $fact.value
    summary = $fact.summary
    confidence = 100
    source = 'B4_v0236_trial'
    agent = 'benchmark_program_main'
  }
  $writeResult = Invoke-IrantiJson -Method Post -Url "$BaseUrl/kb/write" -Body $writeBody
  $writeResults += [ordered]@{
    entity = $fact.entity
    key = $fact.key
    action = $writeResult.action
    reason = $writeResult.reason
  }
}

$oracleResults = @()
$oracleCorrect = 0
foreach ($case in $oracleCases) {
  $queryResult = Query-Fact -Entity $case.entity -Key $case.key
  $correct = ($queryResult.found -eq $true) -and ($queryResult.value -eq $case.expected)
  if ($correct) { $oracleCorrect += 1 }
  $oracleResults += [ordered]@{
    id = $case.id
    entity = $case.entity
    key = $case.key
    expected = $case.expected
    actual = $queryResult.value
    found = $queryResult.found
    correct = $correct
    raw = $queryResult
  }
}

$searchResults = @()
$searchDiscoveries = 0
foreach ($case in $searchCases) {
  $hopValue = $null
  $hopRaw = $null
  if ($case.hopEntity) {
    $hopRaw = Query-Fact -Entity $case.hopEntity -Key $case.hopKey
    $hopValue = $hopRaw.value
  } else {
    $hopValue = $case.hopValueExpected
  }

  $searchRaw = Search-Facts -Query $case.searchQuery -Limit 5
  $results = @($searchRaw.results)
  $discovered = $results | Where-Object { $_.entity -eq $case.targetEntity } | Select-Object -First 1
  $answerRaw = $null
  $answerCorrect = $false
  if ($discovered) {
    $searchDiscoveries += 1
    $answerRaw = Query-Fact -Entity $case.targetEntity -Key $case.targetKey
    $answerCorrect = ($answerRaw.found -eq $true) -and ($answerRaw.value -eq $case.targetExpected)
  }

  $searchResults += [ordered]@{
    id = $case.id
    hopEntity = $case.hopEntity
    hopKey = $case.hopKey
    hopValue = $hopValue
    searchQuery = $case.searchQuery
    targetEntity = $case.targetEntity
    targetKey = $case.targetKey
    targetExpected = $case.targetExpected
    targetDiscovered = [bool]$discovered
    answerCorrect = $answerCorrect
    results = $results
    answer = $answerRaw
  }
}

$coldResults = @()
$coldDiscoveries = 0
foreach ($case in $coldCases) {
  $searchRaw = Search-Facts -Query $case.searchQuery -Limit 5
  $results = @($searchRaw.results)
  $discovered = $results | Where-Object { $_.entity -eq $case.targetEntity } | Select-Object -First 1
  if ($discovered) { $coldDiscoveries += 1 }
  $coldResults += [ordered]@{
    id = $case.id
    searchQuery = $case.searchQuery
    targetEntity = $case.targetEntity
    targetDiscovered = [bool]$discovered
    results = $results
  }
}

$output = [ordered]@{
  recordedAt = (Get-Date).ToString('o')
  instance = $Instance
  baseUrl = $BaseUrl
  productVersion = (Invoke-RestMethod -Uri "$BaseUrl/health").version
  writes = $writeResults
  oracle = [ordered]@{
    results = $oracleResults
    score = "$oracleCorrect/$($oracleCases.Count)"
  }
  searchBased = [ordered]@{
    results = $searchResults
    discoveryScore = "$searchDiscoveries/$($searchCases.Count)"
  }
  coldSearch = [ordered]@{
    results = $coldResults
    discoveryScore = "$coldDiscoveries/$($coldCases.Count)"
  }
}

$outputDir = Split-Path -Parent $OutputPath
if (-not (Test-Path $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

$output | ConvertTo-Json -Depth 12 | Set-Content -Path $OutputPath
Write-Output "Wrote $OutputPath"
