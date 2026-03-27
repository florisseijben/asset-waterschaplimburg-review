$ErrorActionPreference = 'Stop'

$repo = Split-Path -Parent $PSScriptRoot

$productConfig = @{
  woordenboek = @{
    title = 'Woordenboek'
    intro = 'Binnen deze systeemlijn ordenen we begrippen per objectfamilie, zodat definities schaalbaar en herbruikbaar blijven.'
    sectionLabel = 'begrippen'
    detailLinks = @{
      'watersysteem|watergangen' = './begrip-detail.html'
    }
  }
  objectenhandboek = @{
    title = 'Objectenhandboek'
    intro = 'Binnen deze systeemlijn ordenen we objecttypen per objectfamilie, zodat de structuur schaalbaar en herbruikbaar blijft.'
    sectionLabel = 'objecttypen'
    detailLinks = @{
      'watersysteem|watergangen' = './object-detail.html'
    }
  }
  otl = @{
    title = 'OTL'
    intro = 'Binnen deze systeemlijn ordenen we klassen, relaties en codelijsten per objectfamilie.'
    sectionLabel = 'OTL-klassen'
    detailLinks = @{
      'watersysteem|watergangen' = './index.html'
    }
  }
  referentiedataset = @{
    title = 'Referentiedataset'
    intro = 'Binnen deze systeemlijn ordenen we voorbeelddata en referentiesets per objectfamilie.'
    sectionLabel = 'referentiesets'
    detailLinks = @{
      'watersysteem|watergangen' = './index.html'
    }
  }
}

$systems = @(
  @{
    slug = 'watersysteem'
    label = 'Watersysteem'
    icon = 'system-watersysteem.svg'
    categories = @(
      @{ slug = 'watergangen'; label = 'Watergangen'; icon = 'category-watergangen.svg'; desc = 'Objecten, begrippen, modellen en referenties rond watergangen.' }
      @{ slug = 'watervlakten'; label = 'Watervlakten'; icon = 'category-watervlakten.svg'; desc = 'Objecten, begrippen, modellen en referenties rond watervlakten.' }
      @{ slug = 'waterbuffers'; label = 'Waterbuffers'; icon = 'category-waterbuffers.svg'; desc = 'Objecten, begrippen, modellen en referenties rond waterbuffers.' }
      @{ slug = 'terreinen'; label = 'Terreinen'; icon = 'category-terreinen.svg'; desc = 'Objecten, begrippen, modellen en referenties rond terreinen.' }
      @{ slug = 'kunstwerken'; label = 'Kunstwerken'; icon = 'category-kunstwerken.svg'; desc = 'Objecten, begrippen, modellen en referenties rond kunstwerken.' }
      @{ slug = 'terreininrichting'; label = 'Terreininrichting'; icon = 'category-terreininrichting.svg'; desc = 'Objecten, begrippen, modellen en referenties rond terreininrichting.' }
      @{ slug = 'vegetatieobjecten'; label = 'Vegetatieobjecten'; icon = 'category-vegetatieobjecten.svg'; desc = 'Objecten, begrippen, modellen en referenties rond vegetatieobjecten.' }
    )
  }
  @{
    slug = 'waterkeringensysteem'
    label = 'Waterkeringensysteem'
    icon = 'system-waterkeringensysteem.svg'
    categories = @(
      @{ slug = 'waterkeringen'; label = 'Waterkeringen'; icon = 'category-waterkeringen.svg'; desc = 'Objecten, begrippen, modellen en referenties rond waterkeringen.' }
      @{ slug = 'constructies'; label = 'Constructies'; icon = 'category-constructies.svg'; desc = 'Objecten, begrippen, modellen en referenties rond constructies.' }
      @{ slug = 'kunstwerken'; label = 'Kunstwerken'; icon = 'category-kunstwerken.svg'; desc = 'Objecten, begrippen, modellen en referenties rond kunstwerken.' }
      @{ slug = 'terreinen'; label = 'Terreinen'; icon = 'category-terreinen.svg'; desc = 'Objecten, begrippen, modellen en referenties rond terreinen.' }
      @{ slug = 'terreininrichting'; label = 'Terreininrichting'; icon = 'category-terreininrichting.svg'; desc = 'Objecten, begrippen, modellen en referenties rond terreininrichting.' }
      @{ slug = 'groenobjecten'; label = 'Groenobjecten'; icon = 'category-groenobjecten.svg'; desc = 'Objecten, begrippen, modellen en referenties rond groenobjecten.' }
    )
  }
  @{
    slug = 'afvalwaterketen'
    label = 'Afvalwaterketen'
    icon = 'system-afvalwaterketen.svg'
    categories = @(
      @{ slug = 'rwzis'; label = "RWZI's"; icon = 'category-rwzis.svg'; desc = "Objecten, begrippen, modellen en referenties rond RWZI's." }
      @{ slug = 'rioolgemalen'; label = 'Rioolgemalen'; icon = 'category-rioolgemalen.svg'; desc = 'Objecten, begrippen, modellen en referenties rond rioolgemalen.' }
      @{ slug = 'transportleidingen'; label = 'Transportleidingen'; icon = 'category-transportleidingen.svg'; desc = 'Objecten, begrippen, modellen en referenties rond transportleidingen.' }
      @{ slug = 'terreinen'; label = 'Terreinen'; icon = 'category-terreinen.svg'; desc = 'Objecten, begrippen, modellen en referenties rond terreinen.' }
      @{ slug = 'terreininrichting'; label = 'Terreininrichting'; icon = 'category-terreininrichting.svg'; desc = 'Objecten, begrippen, modellen en referenties rond terreininrichting.' }
      @{ slug = 'vegetatieobjecten'; label = 'Vegetatieobjecten'; icon = 'category-vegetatieobjecten.svg'; desc = 'Objecten, begrippen, modellen en referenties rond vegetatieobjecten.' }
    )
  }
)

function Set-Utf8File {
  param(
    [string]$Path,
    [string]$Content
  )
  $dir = Split-Path -Parent $Path
  if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir | Out-Null
  }
  Set-Content -Path $Path -Value $Content -Encoding UTF8
}

function Get-IndexHtml {
  param(
    [string]$ProductSlug,
    [hashtable]$Product,
    [hashtable]$System
  )

  $cards = ($System.categories | ForEach-Object {
    $detailFile = "$($System.slug)-$($_.slug).html"
@"
        <a class="category-card" href="./$detailFile">
          <div class="category-card-header">
            <img class="category-card-icon" src="../../../../platform/assets/icons/$($_.icon)" alt="">
            <h3>$($_.label)</h3>
            <p>$($_.desc)</p>
          </div>
        </a>
"@
  }) -join "`n"

@"
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>$($Product.title) | $($System.label) | Datastandaard</title>
  <link rel="stylesheet" href="../../../../platform/assets/css/tokens.css">
  <link rel="stylesheet" href="../../../../platform/assets/css/base.css">
  <link rel="stylesheet" href="../../../../platform/assets/css/layout.css">
  <link rel="stylesheet" href="../../../../platform/assets/css/components.css">
  <link rel="stylesheet" href="../../../../platform/assets/css/utilities.css">
</head>
<body>
  <main class="shell">
    <header class="site-header stack">
      <div class="site-header-bar">
        <strong>asset.waterschaplimburg.nl</strong>
        <nav aria-label="Hoofdnavigatie">
          <ul class="primary-nav">
            <li><a href="../../../../pages/index.html">Home</a></li>
            <li><a href="../../../assetregister/pages/index.html">Assetregister</a></li>
            <li><a href="../../../assetmanagement/pages/index.html">Assetmanagement</a></li>
            <li><a href="../../pages/index.html">Datastandaard</a></li>
          </ul>
        </nav>
      </div>
      <ol class="breadcrumb" aria-label="Breadcrumb">
        <li><a href="../../../../pages/index.html">Home</a></li>
        <li><a href="../../pages/index.html">Datastandaard</a></li>
        <li><a href="../../pages/$($System.slug).html">$($System.label)</a></li>
        <li><span>$($Product.title)</span></li>
      </ol>
    </header>

    <section class="hero stack">
      <p class="eyebrow">$($Product.title)</p>
      <h1>$($Product.title) voor $($System.label)</h1>
      <p class="lead">$($Product.intro)</p>
    </section>

    <section class="panel stack">
      <p class="eyebrow">Indeling</p>
      <h2>Objectfamilies binnen $($System.label)</h2>
      <div class="category-grid">
$cards
      </div>
    </section>
  </main>
</body>
</html>
"@
}

function Get-DetailHtml {
  param(
    [string]$ProductSlug,
    [hashtable]$Product,
    [hashtable]$System,
    [hashtable]$Category
  )

  $key = "$($System.slug)|$($Category.slug)"
  $extraAction = ''
  if ($Product.detailLinks.ContainsKey($key)) {
    $target = $Product.detailLinks[$key]
    $label = if ($ProductSlug -eq 'woordenboek') { 'Open huidig detailvoorbeeld' } elseif ($ProductSlug -eq 'objectenhandboek') { 'Open huidig voorbeeld' } elseif ($ProductSlug -eq 'otl') { 'Open huidige viewer' } else { 'Open huidige referentiepagina' }
    $extraAction = "<div class=""detail-actions""><a class=""button button-secondary"" href=""$target"">$label</a></div>"
  }

@"
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>$($Category.label) | $($Product.title) | $($System.label)</title>
  <link rel="stylesheet" href="../../../../platform/assets/css/tokens.css">
  <link rel="stylesheet" href="../../../../platform/assets/css/base.css">
  <link rel="stylesheet" href="../../../../platform/assets/css/layout.css">
  <link rel="stylesheet" href="../../../../platform/assets/css/components.css">
  <link rel="stylesheet" href="../../../../platform/assets/css/utilities.css">
</head>
<body>
  <main class="shell">
    <header class="site-header stack">
      <div class="site-header-bar">
        <strong>asset.waterschaplimburg.nl</strong>
        <nav aria-label="Hoofdnavigatie">
          <ul class="primary-nav">
            <li><a href="../../../../pages/index.html">Home</a></li>
            <li><a href="../../../assetregister/pages/index.html">Assetregister</a></li>
            <li><a href="../../../assetmanagement/pages/index.html">Assetmanagement</a></li>
            <li><a href="../../pages/index.html">Datastandaard</a></li>
          </ul>
        </nav>
      </div>
      <ol class="breadcrumb" aria-label="Breadcrumb">
        <li><a href="../../../../pages/index.html">Home</a></li>
        <li><a href="../../pages/index.html">Datastandaard</a></li>
        <li><a href="../../pages/$($System.slug).html">$($System.label)</a></li>
        <li><a href="./$($System.slug).html">$($Product.title)</a></li>
        <li><span>$($Category.label)</span></li>
      </ol>
    </header>

    <section class="hero stack">
      <p class="eyebrow">$($Product.title)</p>
      <h1>$($Category.label)</h1>
      <p class="lead">Deze pagina is de verwijspagina voor $($Product.sectionLabel) binnen de objectfamilie $($Category.label) van $($System.label).</p>
      $extraAction
    </section>

    <section class="content-grid">
      <article class="panel stack">
        <h2>Opzet</h2>
        <p>Hier kunnen we later de eerste inhoudelijke lijn voor $($Category.label) uitwerken, zonder de systeem- en productstructuur opnieuw te hoeven aanpassen.</p>
      </article>
      <aside class="panel stack">
        <h2>Context</h2>
        <dl class="meta-list">
          <dt>Systeem</dt>
          <dd>$($System.label)</dd>
          <dt>Product</dt>
          <dd>$($Product.title)</dd>
          <dt>Objectfamilie</dt>
          <dd>$($Category.label)</dd>
        </dl>
      </aside>
    </section>
  </main>
</body>
</html>
"@
}

foreach ($productSlug in $productConfig.Keys) {
  $product = $productConfig[$productSlug]
  $pagesDir = Join-Path $repo "src/products/datastandaard/$productSlug/pages"

  foreach ($system in $systems) {
    $indexPath = Join-Path $pagesDir "$($system.slug).html"
    Set-Utf8File -Path $indexPath -Content (Get-IndexHtml -ProductSlug $productSlug -Product $product -System $system)

    foreach ($category in $system.categories) {
      $detailPath = Join-Path $pagesDir "$($system.slug)-$($category.slug).html"
      Set-Utf8File -Path $detailPath -Content (Get-DetailHtml -ProductSlug $productSlug -Product $product -System $system -Category $category)
    }
  }
}
