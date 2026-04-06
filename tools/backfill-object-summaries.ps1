$ErrorActionPreference = 'Stop'

$files = Get-ChildItem -Path 'src/products/datastandaard/objectenhandboek/pages' -Filter '*.html'
$updated = @()

foreach ($file in $files) {
  $content = Get-Content -Path $file.FullName -Raw

  if ($content -notmatch 'id="object-summary"') {
    continue
  }

  $summaryMatch = [regex]::Match(
    $content,
    '"summary"\s*:\s*"((?:[^"\\]|\\.)*)"',
    [System.Text.RegularExpressions.RegexOptions]::Singleline
  )

  if (-not $summaryMatch.Success) {
    continue
  }

  $summary = [regex]::Unescape($summaryMatch.Groups[1].Value) -replace '\s+', ' '
  $replacement = '<p class="lead" id="object-summary">' + $summary.Trim() + '</p>'
  $newContent = [regex]::Replace(
    $content,
    '<p class="lead" id="object-summary">.*?</p>',
    [System.Text.RegularExpressions.MatchEvaluator]{ param($match) $replacement },
    [System.Text.RegularExpressions.RegexOptions]::Singleline
  )

  if ($newContent -ne $content) {
    Set-Content -Path $file.FullName -Value $newContent -Encoding utf8
    $updated += $file.Name
  }
}

Write-Output ("Updated object summaries in {0} files." -f $updated.Count)
$updated | Sort-Object
