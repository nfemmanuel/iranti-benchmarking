param(
  [string]$BaseUrl = 'http://localhost:3511',
  [string]$ApiKey = 'bench_b4_v0236_nf.66889b25030249e0b99040af33fadbf9',
  [string]$Entity = 'project/b8_coordination_v0237',
  [string]$AlphaOutput = 'results/raw/B8-v0237-alpha.json',
  [string]$BetaOutput = 'results/raw/B8-v0237-beta.json',
  [string]$OutputPath = 'results/raw/B8-v0237-execution.json'
)

$ErrorActionPreference = 'Stop'
$alphaScript = Join-Path $PSScriptRoot 'run_b8_v0237_alpha.ps1'
$betaScript = Join-Path $PSScriptRoot 'run_b8_v0237_beta.ps1'

$powershellExe = (Get-Command powershell.exe).Source
& $powershellExe -NoProfile -ExecutionPolicy Bypass -File $alphaScript -BaseUrl $BaseUrl -ApiKey $ApiKey -Entity $Entity -OutputPath $AlphaOutput | Out-Null
& $powershellExe -NoProfile -ExecutionPolicy Bypass -File $betaScript -BaseUrl $BaseUrl -ApiKey $ApiKey -Entity $Entity -OutputPath $BetaOutput | Out-Null

$alpha = Get-Content $AlphaOutput | ConvertFrom-Json
$beta = Get-Content $BetaOutput | ConvertFrom-Json

$output = [ordered]@{
  recordedAt = (Get-Date).ToString('o')
  productVersion = (Invoke-RestMethod -Uri "$BaseUrl/health").version
  instanceBaseUrl = $BaseUrl
  entity = $Entity
  processBoundary = 'alpha and beta executed as separate powershell.exe processes against the same installed Iranti runtime'
  alpha = $alpha
  beta = $beta
}

$outputDir = Split-Path -Parent $OutputPath
if (-not (Test-Path $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

$output | ConvertTo-Json -Depth 14 | Set-Content -Path $OutputPath
Write-Output "Wrote $OutputPath"
