function Get-DisplayTitle {
  param(
    [string]$Content
  )

  $match = [regex]::Match($Content, '<title>(.*?)</title>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  if (-not $match.Success) {
    return ""
  }

  $title = $match.Groups[1].Value.Trim()
  if ($title -like '*|*') {
    return ($title -split '\|')[0].Trim()
  }

  return $title
}

function Get-SystemValue {
  param(
    [string]$BaseName
  )

  if ($BaseName -eq 'watersysteem' -or $BaseName.StartsWith('watersysteem-')) { return 'Watersysteem' }
  if ($BaseName -eq 'afvalwaterketen' -or $BaseName.StartsWith('afvalwaterketen-')) { return 'Afvalwaterketen' }
  if ($BaseName -eq 'waterkeringensysteem' -or $BaseName.StartsWith('waterkeringensysteem-')) { return 'Waterkeringensysteem' }
  return ''
}

function Get-DisciplineValue {
  param(
    [string]$BaseName
  )

  $map = @{
    'discipline-ruimtelijke-ordening' = 'Ruimtelijke ordening'
    'discipline-groen' = 'Groen'
    'discipline-bouwkunde' = 'Bouwkunde'
    'discipline-civiele-techniek' = 'Civiele techniek'
    'discipline-werktuigbouwkunde' = 'Werktuigbouwkunde'
    'discipline-electrotechniek' = 'Electrotechniek'
    'discipline-procesautomatisering' = 'Procesautomatisering'
  }

  if ($map.ContainsKey($BaseName)) {
    return $map[$BaseName]
  }

  return ''
}

function Get-OpgaveValue {
  param(
    [string]$Content
  )

  $opgaven = @()

  if ($Content -match '(?i)ecolog') {
    $opgaven += 'Ecologie'
  }

  if ($Content -match '(?i)duurzaam') {
    $opgaven += 'Duurzaamheid'
  }

  if ($Content -match '(?i)zorgplicht') {
    $opgaven += 'Zorgplicht'
  }

  return (($opgaven | Select-Object -Unique) -join ',')
}

function Get-Metadata {
  param(
    [string]$Path,
    [string]$Content
  )

  $rootPath = (Get-Location).Path.TrimEnd('\')
  $fullPath = (Resolve-Path -Path $Path).Path
  if ($fullPath.StartsWith($rootPath)) {
    $relativePath = $fullPath.Substring($rootPath.Length).TrimStart('\').Replace('\', '/')
  } else {
    $relativePath = $fullPath.Replace('\', '/')
  }
  $baseName = [IO.Path]::GetFileNameWithoutExtension($Path)
  $displayTitle = Get-DisplayTitle -Content $Content
  $system = Get-SystemValue -BaseName $baseName
  $discipline = Get-DisciplineValue -BaseName $baseName
  $opgave = Get-OpgaveValue -Content $Content

  $meta = [ordered]@{
    onderdeel = ''
    product = $displayTitle
    informatielaag = ''
    persona = ''
    systeem = $system
    discipline = $discipline
    opgave = $opgave
  }

  switch -Regex ($relativePath) {
    '^src/pages/' {
      $meta.onderdeel = 'Over deze website'
      $meta.informatielaag = 'Sturing'
      $meta.persona = 'Beslisser,Assetmanager,Data professional'
      break
    }
    '^src/products/datastandaard/woordenboek/pages/' {
      $meta.onderdeel = 'Datastandaard'
      $meta.product = 'Woordenboek'
      $meta.informatielaag = 'Begrip'
      $meta.persona = 'Domeinspecialist,Data professional'
      break
    }
    '^src/products/datastandaard/objectenhandboek/pages/' {
      $meta.onderdeel = 'Datastandaard'
      $meta.product = 'Objectenhandboek'
      $meta.informatielaag = 'Objecttype'
      $meta.persona = 'Domeinspecialist,Data professional,Beheerder'
      break
    }
    '^src/products/datastandaard/otl/pages/' {
      $meta.onderdeel = 'Datastandaard'
      $meta.product = 'OTL'
      $meta.informatielaag = 'Formeel model'
      $meta.persona = 'Data professional'
      break
    }
    '^src/products/datastandaard/referentiedataset/pages/' {
      $meta.onderdeel = 'Datastandaard'
      $meta.product = 'Referentiedataset'
      $meta.informatielaag = 'Voorbeelddata'
      $meta.persona = 'Data professional,Domeinspecialist'
      break
    }
    '^src/products/datastandaard/werkinstructies/pages/' {
      $meta.onderdeel = 'Datastandaard'
      $meta.product = 'Werkinstructies'
      $meta.informatielaag = 'Toepassing'
      $meta.persona = 'Beheerder,Domeinspecialist'
      break
    }
    '^src/products/datastandaard/pages/' {
      $meta.onderdeel = 'Datastandaard'
      $meta.product = if ($baseName -eq 'index') { 'Landing' } else { $displayTitle }
      $meta.informatielaag = 'Navigatie'
      $meta.persona = 'Domeinspecialist,Data professional,Beheerder'
      break
    }
    '^src/products/assetregister/pages/' {
      $meta.onderdeel = 'Assetregister'
      $meta.informatielaag = 'Registratie'
      $meta.persona = 'Data professional,Beheerder,Domeinspecialist'
      break
    }
    '^src/products/assetmanagement/pages/' {
      $meta.onderdeel = 'Assetmanagement'
      $meta.informatielaag = 'Sturing'
      $meta.persona = 'Assetmanager,Beslisser'
      break
    }
    default {
      return $null
    }
  }

  if ($baseName -eq 'index' -and $relativePath -notmatch '^src/pages/') {
    $meta.product = 'Landing'
  }

  if ($baseName -eq 'zoeken') {
    $meta.product = 'Zoeken'
    $meta.persona = 'Beslisser,Domeinspecialist,Data professional,Beheerder'
  }

  if ($baseName -eq 'zoekstrategie-en-personas') {
    $meta.product = "Zoekstrategie"
    $meta.persona = 'Beslisser,Domeinspecialist,Data professional,Beheerder'
  }

  return $meta
}

function Update-FileMetadata {
  param(
    [string]$Path
  )

  $content = Get-Content -Path $Path -Raw
  $meta = Get-Metadata -Path $Path -Content $content

  if ($null -eq $meta) {
    return $false
  }

  $content = [regex]::Replace(
    $content,
    '\s*<meta name="asset:[^"]+" content="[^"]*">\r?\n?',
    '',
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
  )

  $metaLines = @(
    ('  <meta name="asset:onderdeel" content="{0}">' -f $meta.onderdeel),
    ('  <meta name="asset:product" content="{0}">' -f $meta.product),
    ('  <meta name="asset:informatielaag" content="{0}">' -f $meta.informatielaag),
    ('  <meta name="asset:persona" content="{0}">' -f $meta.persona)
  )

  if ($meta.systeem) {
    $metaLines += ('  <meta name="asset:systeem" content="{0}">' -f $meta.systeem)
  }

  if ($meta.discipline) {
    $metaLines += ('  <meta name="asset:discipline" content="{0}">' -f $meta.discipline)
  }

  if ($meta.opgave) {
    $metaLines += ('  <meta name="asset:opgave" content="{0}">' -f $meta.opgave)
  }

  $metaBlock = ($metaLines -join "`r`n")

  $updated = [regex]::Replace(
    $content,
    '(<title>.*?</title>)',
    "`$1`r`n$metaBlock`r`n",
    [System.Text.RegularExpressions.RegexOptions]::Singleline
  )

  if ($updated -ne $content) {
    Set-Content -Path $Path -Value $updated -Encoding utf8
    return $true
  }

  return $false
}

$files = Get-ChildItem -Path 'src/pages', 'src/products' -Recurse -Filter *.html
$updatedFiles = @()

foreach ($file in $files) {
  if (Update-FileMetadata -Path $file.FullName) {
    $updatedFiles += $file.FullName
  }
}

Write-Output ("Updated metadata in {0} files." -f $updatedFiles.Count)
