param(
  [string]$BaseUrl = 'http://localhost:3511',
  [string]$ApiKey = 'bench_b4_v0236_nf.66889b25030249e0b99040af33fadbf9',
  [string]$Prefix = 'b2_v0237r1',
  [string]$WriterOutput = 'results/raw/B2-v0237r1-writer.json',
  [string]$ReaderOutput = 'results/raw/B2-v0237r1-reader.json',
  [string]$OutputPath = 'results/raw/B2-v0237r1-execution.json'
)

$ErrorActionPreference = 'Stop'
$writerScript = Join-Path $PSScriptRoot 'run_b2_v0237_writer.ps1'
$readerScript = Join-Path $PSScriptRoot 'run_b2_v0237_reader.ps1'
$powershellExe = (Get-Command powershell.exe).Source

& $powershellExe -NoProfile -ExecutionPolicy Bypass -File $writerScript -BaseUrl $BaseUrl -ApiKey $ApiKey -Prefix $Prefix -OutputPath $WriterOutput | Out-Null
& $powershellExe -NoProfile -ExecutionPolicy Bypass -File $readerScript -BaseUrl $BaseUrl -ApiKey $ApiKey -Prefix $Prefix -OutputPath $ReaderOutput | Out-Null

$writer = Get-Content $WriterOutput | ConvertFrom-Json
$reader = Get-Content $ReaderOutput | ConvertFrom-Json
$writeLatencies = @($writer.writes | ForEach-Object { [double]$_.elapsedMs })
$readLatencies = @($reader.retrievals | ForEach-Object { [double]$_.elapsedMs })

function Get-StatLine {
  param([double[]]$Values)
  if ($Values.Count -eq 0) { return [ordered]@{ count = 0; minMs = $null; medianMs = $null; meanMs = $null; maxMs = $null } }
  $sorted = $Values | Sort-Object
  $count = $sorted.Count
  $mid = [math]::Floor($count / 2)
  $median = if ($count % 2 -eq 0) { ($sorted[$mid - 1] + $sorted[$mid]) / 2 } else { $sorted[$mid] }
  [ordered]@{
    count = $count
    minMs = [math]::Round(($sorted | Measure-Object -Minimum).Minimum, 3)
    medianMs = [math]::Round($median, 3)
    meanMs = [math]::Round(($sorted | Measure-Object -Average).Average, 3)
    maxMs = [math]::Round(($sorted | Measure-Object -Maximum).Maximum, 3)
  }
}

$output = [ordered]@{
  recordedAt = (Get-Date).ToString('o')
  productVersion = (Invoke-RestMethod -Uri "$BaseUrl/health").version
  instanceBaseUrl = $BaseUrl
  prefix = $Prefix
  processBoundary = 'writer and reader executed as separate powershell.exe processes against the same installed Iranti runtime'
  writeStats = Get-StatLine $writeLatencies
  readStats = Get-StatLine $readLatencies
  writer = $writer
  reader = $reader
}

$outputDir = Split-Path -Parent $OutputPath
if (-not (Test-Path $outputDir)) { New-Item -ItemType Directory -Path $outputDir -Force | Out-Null }
$output | ConvertTo-Json -Depth 14 | Set-Content -Path $OutputPath
Write-Output "Wrote $OutputPath"
