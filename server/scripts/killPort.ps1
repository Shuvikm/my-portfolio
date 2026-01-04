param(
  [Parameter(Mandatory=$true)]
  [int]$Port
)

Write-Host "Searching for processes listening on port $Port..."

$lines = netstat -ano | findstr ":$Port"
if (-not $lines) {
  Write-Host "No process found listening on port $Port"
  exit 0
}

# Try to parse PID from netstat lines
$pids = @()
foreach ($l in $lines) {
  $parts = $l -split '\s+' | Where-Object { $_ -ne '' }
  $pid = $parts[-1]
  if ($pid -and ($pid -as [int])) { $pids += [int]$pid }
}

$pids = $pids | Sort-Object -Unique
if ($pids.Count -eq 0) {
  Write-Host "Could not determine PID for port $Port"
  exit 1
}

foreach ($pid in $pids) {
  try {
    Write-Host "Killing PID $pid ..."
    Stop-Process -Id $pid -Force -ErrorAction Stop
    Write-Host "Killed PID $pid"
  } catch {
    Write-Warning ("Failed to kill PID {0}: {1}" -f $pid, $_.Exception.Message)
  }
}

Write-Host "Done."
