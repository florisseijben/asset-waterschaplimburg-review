function Get-RootRelativePath {
  param(
    [string]$Path
  )

  $rootPath = (Get-Location).Path.TrimEnd('\')
  $fullPath = (Resolve-Path -Path $Path).Path

  if ($fullPath.StartsWith($rootPath)) {
    return $fullPath.Substring($rootPath.Length).TrimStart('\').Replace('\', '/')
  }

  return $fullPath.Replace('\', '/')
}

function Get-PageHref {
  param(
    [string]$RelativePath
  )

  if ($RelativePath.StartsWith('src/pages/')) {
    return './' + $RelativePath.Substring(10)
  }

  if ($RelativePath.StartsWith('src/products/')) {
    return '../' + $RelativePath.Substring(4)
  }

  return $RelativePath
}

function Get-MetaValue {
  param(
    [string]$Content,
    [string]$Name
  )

  $pattern = '<meta name="' + [regex]::Escape($Name) + '" content="([^"]*)">'
  $match = [regex]::Match($Content, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  if ($match.Success) {
    return $match.Groups[1].Value.Trim()
  }

  return ''
}

function Get-TitleValue {
  param(
    [string]$Content
  )

  $match = [regex]::Match($Content, '<title>(.*?)</title>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  if (-not $match.Success) {
    return ''
  }

  $title = $match.Groups[1].Value.Trim()
  if ($title -like '*|*') {
    return ($title -split '\|')[0].Trim()
  }

  return $title
}

function Get-LeadValue {
  param(
    [string]$Content
  )

  $match = [regex]::Match($Content, '<p class="lead">\s*(.*?)\s*</p>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  if (-not $match.Success) {
    return ''
  }

  return ([regex]::Replace($match.Groups[1].Value, '<.*?>', '') -replace '\s+', ' ').Trim()
}

function Get-ObjectSummaryValue {
  param(
    [string]$Content
  )

  $match = [regex]::Match($Content, '"summary"\s*:\s*"((?:[^"\\]|\\.)*)"', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  if (-not $match.Success) {
    return ''
  }

  $rawValue = $match.Groups[1].Value
  $decoded = [regex]::Unescape($rawValue)
  return ($decoded -replace '\s+', ' ').Trim()
}

function Get-H1Value {
  param(
    [string]$Content
  )

  $match = [regex]::Match($Content, '<h1>(.*?)</h1>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  if (-not $match.Success) {
    return ''
  }

  return ([regex]::Replace($match.Groups[1].Value, '<.*?>', '') -replace '\s+', ' ').Trim()
}

function Get-BreadcrumbValues {
  param(
    [string]$Content
  )

  $match = [regex]::Match($Content, '<ol class="breadcrumb"[^>]*>(.*?)</ol>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  if (-not $match.Success) {
    return @()
  }

  $items = [regex]::Matches($match.Groups[1].Value, '<li>(.*?)</li>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  $values = @()

  foreach ($item in $items) {
    $text = ([regex]::Replace($item.Groups[1].Value, '<.*?>', '') -replace '\s+', ' ').Trim()
    if ($text) {
      $values += $text
    }
  }

  return $values
}

function Split-Values {
  param(
    [string]$Value
  )

  if (-not $Value) {
    return @()
  }

  return $Value.Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ }
}

function Escape-JsonString {
  param(
    [string]$Value
  )

  return (($Value | ConvertTo-Json -Compress) -replace '^"|"$', '')
}

function To-JsArray {
  param(
    [string[]]$Values
  )

  if (-not $Values -or -not $Values.Count) {
    return '[]'
  }

  $parts = $Values | ForEach-Object {
    '"' + (Escape-JsonString -Value $_) + '"'
  }

  return '[' + ($parts -join ', ') + ']'
}

$files = Get-ChildItem -Path 'src/pages', 'src/products' -Recurse -Filter *.html | Sort-Object FullName
$items = @()

foreach ($file in $files) {
  $content = Get-Content -Path $file.FullName -Raw
  $onderdeel = Get-MetaValue -Content $content -Name 'asset:onderdeel'

  if (-not $onderdeel) {
    continue
  }

  $relativePath = Get-RootRelativePath -Path $file.FullName
  $title = Get-TitleValue -Content $content
  $h1 = Get-H1Value -Content $content
  $summary = Get-LeadValue -Content $content
  if (-not $summary) {
    $summary = Get-ObjectSummaryValue -Content $content
  }
  $breadcrumb = Get-BreadcrumbValues -Content $content
  $product = Get-MetaValue -Content $content -Name 'asset:product'
  $laag = Get-MetaValue -Content $content -Name 'asset:informatielaag'
  $persona = Split-Values (Get-MetaValue -Content $content -Name 'asset:persona')
  $systeem = Split-Values (Get-MetaValue -Content $content -Name 'asset:systeem')
  $discipline = Split-Values (Get-MetaValue -Content $content -Name 'asset:discipline')
  $opgave = Split-Values (Get-MetaValue -Content $content -Name 'asset:opgave')
  $tags = @($onderdeel, $product, $laag) + $systeem + $discipline + $opgave

  if ($h1 -and $h1 -ne $title) {
    $tags += $h1
  }

  $item = [ordered]@{
    title = if ($h1) { $h1 } else { $title }
    summary = if ($summary) { $summary } else { $title }
    href = Get-PageHref -RelativePath $relativePath
    zoekpad = (($breadcrumb | Where-Object { $_ -ne 'Home' }) -join ' > ')
    onderdeel = $onderdeel
    product = $product
    informatielaag = $laag
    persona = $persona
    systeem = $systeem
    discipline = $discipline
    opgave = $opgave
    tags = ($tags | Select-Object -Unique)
  }

  $items += $item
}

$lines = @('window.__SEARCH_INDEX__ = [')

for ($i = 0; $i -lt $items.Count; $i += 1) {
  $item = $items[$i]
  $suffix = if ($i -lt $items.Count - 1) { ',' } else { '' }
  $lines += '  {'
  $lines += ('    title: "' + (Escape-JsonString -Value $item.title) + '",')
  $lines += ('    summary: "' + (Escape-JsonString -Value $item.summary) + '",')
  $lines += ('    href: "' + (Escape-JsonString -Value $item.href) + '",')
  $lines += ('    zoekpad: "' + (Escape-JsonString -Value $item.zoekpad) + '",')
  $lines += ('    onderdeel: "' + (Escape-JsonString -Value $item.onderdeel) + '",')
  $lines += ('    product: "' + (Escape-JsonString -Value $item.product) + '",')
  $lines += ('    informatielaag: "' + (Escape-JsonString -Value $item.informatielaag) + '",')
  $lines += ('    persona: ' + (To-JsArray -Values $item.persona) + ',')
  $lines += ('    systeem: ' + (To-JsArray -Values $item.systeem) + ',')
  $lines += ('    discipline: ' + (To-JsArray -Values $item.discipline) + ',')
  $lines += ('    opgave: ' + (To-JsArray -Values $item.opgave) + ',')
  $lines += ('    tags: ' + (To-JsArray -Values $item.tags))
  $lines += ('  }' + $suffix)
}

$lines += '];'

Set-Content -Path 'src/platform/assets/js/search-index.js' -Value ($lines -join "`r`n") -Encoding utf8
Write-Output ("Generated search index with {0} items." -f $items.Count)
