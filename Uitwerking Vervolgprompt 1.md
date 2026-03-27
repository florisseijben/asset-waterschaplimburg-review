# Uitwerking Vervolgprompt 1

## 1. Definitief technisch advies

De best passende technische aanpak op jouw bedrijfslaptop is:

- buildless statische HTML, CSS en JavaScript;
- route B als werkmodel;
- met inline JSON, inline GeoJSON en inline JSON-LD als veilige eerste implementatie;
- met een structuur die later kan doorgroeien naar losse databestanden, server-rendering of een rijkere front-end stack.

### Definitieve keuze

Ik adviseer:

- geen afhankelijkheid van Node.js, npm, Python of build tooling;
- geen afhankelijkheid van `fetch()` als kernmechanisme;
- geen afhankelijkheid van .NET / Razor als startvoorwaarde;
- wel een duidelijke scheiding tussen platform, product, pagina, component en data.

### Waarom dit de beste keuze is

Deze aanpak past het best omdat hij:

- direct uitvoerbaar is in Visual Studio zonder extra installaties;
- werkt op een streng beheerde laptop;
- lokaal testbaar blijft door simpelweg HTML-bestanden te openen;
- later migratievriendelijk blijft naar .NET, React of CMS;
- ruimte biedt voor datagedreven groei zonder dat runtime data-loading nu al een harde eis is.

### Technisch werkmodel

De aanbevolen werkvolgorde is:

1. HTML is leidend.
2. CSS vormt het gedeelde platformdesign.
3. JavaScript voegt alleen enhancement toe.
4. JSON, GeoJSON en JSON-LD worden eerst inline gebruikt.
5. De datastructuur wordt al zo opgezet dat die later kan verhuizen naar losse bestanden of een serverbron.

### Praktische conclusie

Voor fase 1 en 2 is de definitieve route:

- platform-first;
- HTML-first;
- data-ready;
- buildless;
- Visual Studio-vriendelijk;
- later opschaalbaar.

## 2. Concrete projectstructuur

Hieronder staat de aanbevolen structuur voor `asset.waterschaplimburg.nl`.

```text
/asset.waterschaplimburg.nl
  /docs
    Masterprompt.md
    Projectaanpak.md
    Vervolgprompt 1.md
    Uitwerking Vervolgprompt 1.md
    sitemap.md
    werkafspraken.md

  /src
    /platform
      /assets
        /css
          tokens.css
          base.css
          layout.css
          components.css
          utilities.css
        /js
          app.js
          nav.js
          breadcrumbs.js
          tabs.js
          cards.js
          tree.js
          tables.js
          data-inline.js
        /img
        /icons
      /components
        header.html
        footer.html
        breadcrumb.html
        primary-nav.html
        card.html
        page-hero.html
        meta-list.html
        table.html
        tabs.html
        tree.html
      /data
        navigation.inline.json
        labels.inline.json
        metadata.inline.json

    /products
      /landing
        /pages
          index.html
        /data
          landing.inline.json

      /assetregister
        /pages
          index.html
          overzicht.html
          asset-detail.html
        /components
          asset-card.html
          asset-summary.html
        /data
          assets.inline.json
          assets.inline.geojson

      /assetmanagement
        /pages
          index.html
          processen.html
          rollen.html
        /components
          process-card.html
          role-card.html
        /data
          processen.inline.json

      /datastandaard
        /pages
          index.html

        /woordenboek
          /pages
            index.html
            begrip-detail.html
          /components
            term-card.html
            definitieblok.html
          /data
            begrippen.inline.json

        /objectenhandboek
          /pages
            index.html
            object-detail.html
          /components
            object-card.html
            eigenschappen-tabel.html
          /data
            objecten.inline.json
            objecten.inline.geojson

        /otl
          /pages
            index.html
            klasse-detail.html
          /components
            object-tree.html
          /data
            klassen.inline.json

        /referentiedataset
          /pages
            index.html
            dataset-detail.html
          /components
            dataset-card.html
          /data
            datasets.inline.json
            datasets.inline.geojson

        /werkinstructies
          /pages
            index.html
            instructie-detail.html
          /components
            document-card.html
          /data
            instructies.inline.json

      /overige-productstructuren
        /pages
          index.html
        /data
          overige.inline.json

    /pages
      index.html

  /static
    /downloads
    /documents

  /tests
    /route-b
      index.html
      /assets
      /data

  index.html
```

## 3. Uitleg per hoofdmap

### `/docs`

Doel:

- projectdocumentatie;
- uitgangspunten;
- prompts;
- afspraken;
- informatiestructuur.

Direct bruikbaar in Visual Studio:

- ja, volledig;
- gewone Markdown-bestanden zonder tooling.

### `/src`

Doel:

- alle bronbestanden voor het klikbare platform;
- scheiding tussen platform, producten en pagina's.

Direct bruikbaar in Visual Studio:

- ja;
- gewone HTML, CSS, JS en JSON-bestanden.

### `/src/platform`

Type:

- platformlaag.

Doel:

- alles wat gedeeld is over het hele platform.

Bestaat uit:

- styles;
- scripts;
- componentmarkup;
- gedeelde labels en metadata.

Direct bruikbaar in Visual Studio:

- ja.

### `/src/products`

Type:

- productlaag.

Doel:

- inhoudelijke scheiding per hoofdgroep en subgroep.

Direct bruikbaar in Visual Studio:

- ja.

### `/src/pages`

Type:

- paginalaag op platformniveau.

Doel:

- platformingang en eventuele algemene pagina's die niet aan één product hangen.

Direct bruikbaar in Visual Studio:

- ja.

### `/static`

Doel:

- downloads;
- documenten;
- vaste assets die geen broncode zijn.

Direct bruikbaar in Visual Studio:

- ja.

### `/tests`

Doel:

- technische proefopstellingen en validaties;
- losse experimenten zonder vervuiling van het hoofdplatform.

Direct bruikbaar in Visual Studio:

- ja.

## 4. Uitleg per laag

### Platform

Platform bevat:

- gedeelde layout;
- design tokens;
- globale navigatie;
- breadcrumbs;
- generieke kaarten;
- tabcomponenten;
- tabellen;
- generieke scripts;
- visuele basis.

Belangrijkste map:

- `/src/platform`

### Product

Product bevat:

- de inhoudelijke structuur per domein;
- productspecifieke pagina's;
- productspecifieke componenten;
- bijbehorende voorbeelddata.

Belangrijkste map:

- `/src/products`

### Pagina

Pagina bevat:

- concrete HTML-bestanden;
- route-eindpunten;
- inhoud per scherm of detailweergave.

Belangrijkste mappen:

- `/src/pages`
- `/src/products/*/pages`

### Component

Component bevat:

- herbruikbare HTML-fragmenten en markup-afspraken;
- templates voor kaarten, tabellen, metadata en navigatie;
- in de huidige buildless fase vooral als bron- en referentiemap, niet als runtime include-mechanisme.

Belangrijkste mappen:

- `/src/platform/components`
- `/src/products/*/components`

### Data

Data bevat:

- inline-modelbestanden;
- bronstructuren voor inhoud;
- objectdata, begrippen, datasets, locaties en metadata.

Belangrijkste mappen:

- `/src/platform/data`
- `/src/products/*/data`

## 5. Uitleg per belangrijk bestand

### Platformbestanden

`/src/platform/assets/css/tokens.css`

Doel:

- centrale design tokens zoals kleur, spacing, typografie en radius.

`/src/platform/assets/css/base.css`

Doel:

- reset en basiselementen zoals body, headings, links en lijsten.

`/src/platform/assets/css/layout.css`

Doel:

- shell, grids, containers, kolommen en hoofdstructuur.

`/src/platform/assets/css/components.css`

Doel:

- visuele definities voor kaarten, tabs, breadcrumbs, tabellen en andere componenten.

`/src/platform/assets/css/utilities.css`

Doel:

- kleine hulpclasses.

`/src/platform/assets/js/app.js`

Doel:

- centrale opstartlogica voor progressive enhancement.

`/src/platform/assets/js/nav.js`

Doel:

- gedrag van hoofd- en sectienavigatie.

`/src/platform/assets/js/breadcrumbs.js`

Doel:

- opbouw of verrijking van breadcrumbs.

`/src/platform/assets/js/tabs.js`

Doel:

- eenvoudige buildless tabs.

`/src/platform/assets/js/tree.js`

Doel:

- uitklapbaar gedrag voor objectstructuren.

`/src/platform/assets/js/tables.js`

Doel:

- optioneel sorteer- of filtergedrag voor tabellen.

`/src/platform/assets/js/data-inline.js`

Doel:

- uitlezen en normaliseren van inline JSON of GeoJSON uit de pagina.

### Componentbestanden

`/src/platform/components/header.html`

Doel:

- referentie-opmaak voor de globale header.

`/src/platform/components/footer.html`

Doel:

- referentie-opmaak voor de globale footer.

`/src/platform/components/primary-nav.html`

Doel:

- markupstandaard voor primaire navigatie.

`/src/platform/components/card.html`

Doel:

- standaardkaart voor overzichten en samenvattingen.

`/src/platform/components/table.html`

Doel:

- standaard voor tabellen.

### Paginabestanden

`/index.html`

Doel:

- snel startpunt vanuit de root;
- doorverwijzing of ingang naar de echte platformlanding.

`/src/pages/index.html`

Doel:

- centrale platform-home.

`/src/products/landing/pages/index.html`

Doel:

- inhoudelijke landingspagina van het platform.

`/src/products/assetregister/pages/index.html`

Doel:

- ingang van het domein Assetregister.

`/src/products/datastandaard/pages/index.html`

Doel:

- ingang van het domein Datastandaard.

### Databestanden

`/src/platform/data/navigation.inline.json`

Doel:

- bronstructuur voor hoofd- en sectienavigatie.

`/src/products/assetregister/data/assets.inline.json`

Doel:

- voorbeelddata voor assetoverzichten en details.

`/src/products/assetregister/data/assets.inline.geojson`

Doel:

- locatiegerelateerde voorbeelddata voor assets.

`/src/products/datastandaard/woordenboek/data/begrippen.inline.json`

Doel:

- begrippen, definities en classificaties.

`/src/products/datastandaard/objectenhandboek/data/objecten.inline.geojson`

Doel:

- objectlocaties of gebiedsreferenties waar relevant.

## 6. Wat direct bruikbaar is in Visual Studio zonder aanvullende tooling

Deze onderdelen zijn direct bruikbaar:

- alle `.md` documenten;
- alle `.html` pagina's;
- alle `.css` bestanden;
- alle `.js` bestanden zonder buildstap;
- alle `.json`, `.geojson` en inline JSON-LD structuren als bron- of testdata;
- de volledige mappenstructuur;
- relatieve links tussen pagina's;
- handmatige validatie door HTML direct in een browser te openen.

Deze onderdelen zijn niet veilig als basisaanname:

- runtime `fetch()` vanaf `file://`;
- service worker voor PWA-functionaliteit;
- npm packages;
- build pipelines;
- automatische bundling;
- externe CLI-afhankelijkheden.

## 7. Werkafspraken voor deze fase

Om stabiel te blijven in jouw omgeving adviseer ik nu deze werkafspraken:

- HTML is altijd de primaire bron voor wat zichtbaar moet zijn;
- JavaScript mag een pagina verbeteren, maar niet essentieel maken;
- alle kernnavigatie moet zonder data-ophaalactie werken;
- voorbeelddata wordt eerst inline of als referentiebestand vastgelegd;
- componentbestanden zijn in fase 1 vooral documentatie- en hergebruikspatronen;
- pagina's bevatten voorlopig nog hun eigen complete shell.

## 8. Keuzes die jij nu moet maken

Voordat we naar de eerste codebestanden gaan, moet jij expliciet deze keuzes maken:

1. Willen we alleen een mapstructuur of ook meteen een Visual Studio solutionbestand?

Aanbeveling:

- begin met alleen mapstructuur;
- voeg pas later een solution toe als Visual Studio daar in jouw werkwijze echt voordeel geeft.

2. Welke productlijn werken we als eerste inhoudelijk uit?

Opties:

- `Datastandaard`
- `Assetregister`

Aanbeveling:

- kies `Datastandaard` als informatiearchitectuur en documentstructuur eerst leidend zijn;
- kies `Assetregister` als objectdetails en kaartlogica eerst leidend zijn.

3. Willen we in iteratie 1 al inline data tonen?

Opties:

- ja, direct inline JSON en inline GeoJSON meenemen;
- nee, eerst volledig statische skeletonpagina's.

Aanbeveling:

- ja, neem direct beperkte inline data mee, omdat dat route B meteen valideert zonder afhankelijkheid van `fetch()`.

4. Willen we productcomponenten direct als losse referentiebestanden opnemen?

Aanbeveling:

- ja, als ontwerp- en werkafspraak;
- nee, alleen als je het project in fase 1 extreem klein wilt houden.

Mijn voorkeur:

- wel doen, omdat dit de latere migratie naar partials of componentisering eenvoudiger maakt.

## 9. Concreet besluitvoorstel

Mijn voorstel om zonder vertraging door te gaan is:

1. We houden vast aan route B in buildless vorm.
2. We bouwen HTML-first met inline JSON, inline GeoJSON en inline JSON-LD.
3. We gebruiken de hierboven beschreven mapstructuur.
4. We kiezen `Datastandaard` als eerste inhoudelijke productlijn.
5. We nemen geen verplichte Visual Studio solution op in de eerste technische oplevering.

Als jij deze richting volgt, kunnen we hierna direct de eerste echte codebestanden aanmaken:

- root `index.html`
- platform CSS-basis
- platform JS-basis
- landingspagina
- skeletons voor de hoofdgroepen
- eerste inhoudelijke pagina's binnen Datastandaard
