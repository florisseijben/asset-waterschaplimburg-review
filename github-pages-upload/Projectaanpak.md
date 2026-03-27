# Projectaanpak asset.waterschaplimburg.nl

## 1. Plan van aanpak

De veiligste start is een buildless front-end op basis van statische HTML, CSS en JavaScript, aangevuld met optionele JSON-voorbeelddata waar dat lokaal werkt. Daarmee blijft het project:

- uitvoerbaar op een streng beheerde bedrijfslaptop;
- direct te openen in Visual Studio en in de browser;
- migreerbaar naar een rijkere stack zoals .NET, React of een CMS;
- logisch op te delen in platformlaag, productlaag en paginalaag.

Aanbevolen werkvolgorde:

1. Start met een statisch platformframe: header, footer, hoofdnav, breadcrumbs, layout en componentbibliotheek.
2. Bouw daarna de landingspagina en 1 productlijn volledig klikbaar uit.
3. Werk de overige productlijnen eerst als skeletons uit, zodat de informatiestructuur staat.
4. Voeg voorbeelddata toe via JSON waar mogelijk, met een HTML-fallback voor lokale blokkades.
5. Houd alle structuur al zo opgeruimd dat een latere migratie naar Razor, React of CMS-templating vooral een omzetting van rendering wordt, niet van informatiearchitectuur.

## 2. Fase 1: technische nulmeting

### Waarschijnlijk wel mogelijk in jouw omgeving

- Statische HTML-bestanden openen in een browser.
- CSS en JavaScript zonder buildstap gebruiken.
- Een gewone map- of solutionstructuur in Visual Studio beheren.
- Relatieve links tussen pagina's gebruiken.
- Afbeeldingen, iconen, lokale JSON-bestanden en statische documentpagina's opnemen.
- Eenvoudige client-side interactie gebruiken zoals tabs, accordions, filterpanelen en kaartnavigatie.

### Waarschijnlijk beperkt of onzeker

- `fetch()` op lokale `file://`-paden kan door browserbeveiliging geblokkeerd worden.
- ES modules kunnen lokaal ook afhankelijk zijn van browser- en policy-instellingen.
- npm, Vite, Webpack, Node.js en package managers zijn niet beschikbaar.
- Extra lokale webservers zijn waarschijnlijk niet installeerbaar.
- .NET / Razor is alleen haalbaar als de juiste SDK en workloads al op de laptop aanwezig zijn.
- Generators, SSG's en testtooling zijn waarschijnlijk niet bruikbaar zonder extra rechten.

### Beoordeling van de routes

#### Route A: pure statische HTML/CSS/JS

Beoordeling: veiligste aanpak.

Waarom:

- geen installaties nodig;
- maximaal voorspelbaar op een beheerde laptop;
- eenvoudig lokaal te openen en te reviewen;
- goed geschikt voor een klikbaar proof-of-concept.

Nadelen:

- meer handmatig onderhoud zonder templating;
- herhaling van header/footer mogelijk als we daar niet slim mee omgaan;
- minder prettig voor grote datasets.

#### Route B: statische HTML met JSON-data

Beoordeling: meest toekomstvast binnen buildless werken, maar alleen als fallback goed geregeld is.

Waarom:

- contentstructuur en data worden alvast scheidbaar;
- later makkelijker migreerbaar naar API, CMS of server-rendering;
- goed voor woordenboek, objectlijsten, metadata en detailkaarten.

Nadelen:

- lokale `fetch()` kan stuklopen;
- dus niet als enige renderstrategie gebruiken;
- HTML-fallback of inline data is noodzakelijk.

#### Route C: .NET / Razor zonder extra installaties

Beoordeling: alleen realistisch als Visual Studio en .NET SDK nu al volledig aanwezig zijn.

Waarom mogelijk interessant:

- server-side partials en layouts lossen duplicatie netjes op;
- routing en shared rendering worden sterker;
- migratiepad naar volwaardige applicatie is korter.

Waarom nu niet als hoofdkeuze:

- afhankelijk van reeds geïnstalleerde workloads;
- verhoogt technische onzekerheid op jouw laptop;
- niet passend als we uitgaan van "niets extra's installeren".

#### Route D: andere ingebouwde Visual Studio-opties

Beoordeling: bruikbaar als ondersteunend, niet als primaire architectuur.

Voorbeelden:

- lege solution voor structuur en beheer;
- static files projectmap;
- eventueel IIS Express of ingebouwde preview, als die al aanwezig is.

### Advies

- Veiligste aanpak: pure statische HTML/CSS/JS.
- Meest toekomstvaste aanpak: statische HTML/CSS/JS met optionele JSON-datalaag en HTML-fallback.
- Niet als startpunt kiezen: .NET / Razor, tenzij we expliciet constateren dat dit al volledig werkt in jouw Visual Studio-installatie.

### Waarschijnlijke beperkingen op een bedrijfslaptop

- browser policies kunnen lokale scripts of JSON-ophaalacties beperken;
- geen package management of CLI-automatisering;
- mogelijk geen lokale adminrechten voor extensies;
- mogelijk beperkingen op lettertypes, externe CDN's en third-party scripts;
- mogelijk geen vrij gebruik van localhost-poorten als daar al beleid op zit.

### Lokaal testen zonder extra tooling

Aanbevolen volgorde:

1. Test door `index.html` direct in de browser te openen.
2. Gebruik alleen relatieve paden.
3. Bouw de eerste versie zo dat kernnavigatie, layout en content ook werken zonder `fetch()`.
4. Gebruik JavaScript alleen als progressive enhancement.
5. Als Visual Studio of IIS Express al lokaal werkt zonder extra installatie, gebruik dat als bonus, niet als vereiste.

## 3. Fase 2: aanbevolen platformarchitectuur

### Architectuurprincipe

Het platform bestaat uit drie lagen:

- platformlaag: gedeelde layout, navigatie, componenten, design tokens, hulpfuncties;
- productlaag: structuur, navigatie en data per hoofdonderdeel;
- paginalaag: concrete HTML-pagina's met inhoud en configuratie.

### Voorgestelde mappenstructuur

```text
/asset.waterschaplimburg.nl
  /docs
    projectaanpak.md
    sitemap.md
    contentmodel.md
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
          tree.js
          table.js
          data-loader.js
        /img
        /icons
      /includes
        header.html
        footer.html
        nav-primary.html
      /data
        navigation.json
        breadcrumbs.json
    /products
      /landing
        /pages
          index.html
      /assetregister
        /pages
          index.html
          detail.html
          zoeken.html
        /data
          assets.json
      /assetmanagement
        /pages
          index.html
          processen.html
          rollen.html
      /datastandaard
        /pages
          index.html
        /woordenboek
          /pages
            index.html
            begrip-detail.html
          /data
            begrippen.json
        /objectenhandboek
          /pages
            index.html
            object-detail.html
          /data
            objecten.json
        /otl
          /pages
            index.html
            klasse-detail.html
        /referentiedataset
          /pages
            index.html
        /werkinstructies
          /pages
            index.html
      /overige-productstructuren
        /pages
          index.html
    /pages
      index.html
  /static
    /docs
    /downloads
  index.html
```

### Naamgeving

- gebruik kleine letters en koppeltekens voor bestands- en mapnamen;
- gebruik betekenisvolle Engelstalige technische namen, maar Nederlandstalige content waar gewenst;
- gebruik `index.html` voor landing binnen een map;
- gebruik `*-detail.html` voor detailtemplates;
- gebruik aparte `data`-mappen per productdomein.

### Routingstructuur

Aanbevolen klikstructuur:

- `/index.html`
- `/src/products/landing/pages/index.html`
- `/src/products/assetregister/pages/index.html`
- `/src/products/assetmanagement/pages/index.html`
- `/src/products/datastandaard/pages/index.html`
- `/src/products/datastandaard/woordenboek/pages/index.html`
- `/src/products/datastandaard/objectenhandboek/pages/index.html`
- `/src/products/datastandaard/otl/pages/index.html`
- `/src/products/datastandaard/referentiedataset/pages/index.html`
- `/src/products/datastandaard/werkinstructies/pages/index.html`

Voor een latere migratie kun je dit conceptueel al lezen als:

- `/assetregister`
- `/assetmanagement`
- `/datastandaard`
- `/datastandaard/woordenboek`
- etc.

### Componentstructuur

Platformcomponenten:

- site-header
- site-footer
- primary-nav
- breadcrumb
- page-hero
- content-grid
- card
- stat-card
- tabset
- tree-nav
- data-table
- meta-list
- document-panel
- alert
- tag

Productspecifieke componenten:

- objectkaart
- begrippenlijst
- dataset-overzicht
- proceskaart
- eigenschappentabel

### Plek voor statische voorbeelddata

Voorstel:

- globale navigatie in `/src/platform/data`;
- productdata in de betreffende productmap;
- kleine fallback datasets eventueel inline in de HTML via `<script type="application/json">`.

### Groeipad naar rijkere stack

De voorgestelde structuur is later omzetbaar naar:

- .NET / Razor: `platform/includes` wordt `Layouts` en `Partials`;
- React: `platform/assets/js` wordt componentlogica en `products` worden routes/features;
- CMS: productmappen worden templates/contenttypes en JSON wordt brondata.

## 4. Fase 3: buildless front-end model

### CSS-opbouw

Aanbevolen volgorde:

1. `tokens.css`
2. `base.css`
3. `layout.css`
4. `components.css`
5. `utilities.css`

Doel per bestand:

- `tokens.css`: kleuren, spacing, radius, schaduw, typografie, breakpoints;
- `base.css`: reset, body, headings, links, lijsten, formulieren;
- `layout.css`: shell, containers, grids, sidebar, contentkolommen;
- `components.css`: kaarten, tabs, tabellen, breadcrumbs, navigatie, tree, badges;
- `utilities.css`: kleine hulpclasses zoals `u-hidden`, `u-stack`, `u-cluster`.

### Design tokens

Gebruik CSS custom properties:

```css
:root {
  --color-ink: #123046;
  --color-brand: #007a83;
  --color-brand-dark: #005f66;
  --color-sand: #f3f1eb;
  --color-line: #d7dee3;
  --color-surface: #ffffff;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --radius-m: 0.5rem;
  --shadow-s: 0 2px 8px rgba(0, 0, 0, 0.08);
  --container-xl: 80rem;
}
```

### Layout-bestanden

Zonder build tooling zijn er twee bruikbare modellen:

- Model A: volledige pagina's met herhaalde shell in HTML;
- Model B: shell in HTML-includes laden via JavaScript.

Aanbevolen start:

- begin met Model A voor gegarandeerde werking;
- ontwerp de markup wel alsof header/footer later partials worden;
- gebruik consistente placeholder-commentaren zodat migratie eenvoudig blijft.

### Navigatie

Primaire navigatie:

- Assetregister
- Assetmanagement
- Datastandaard

Secundaire navigatie binnen Datastandaard:

- Woordenboek
- Objectenhandboek
- OTL
- Referentiedataset
- Werkinstructies

### Breadcrumbs

Eerste versie:

- hardcoded per pagina;
- eventueel verrijkt vanuit `data-breadcrumb` attributen.

Latere versie:

- centraal opgebouwd vanuit padconfiguratie of JSON.

### Kaarten

Gebruik kaarten voor:

- productoverzichten;
- objectsamenvattingen;
- documenten en datasets;
- gerelateerde onderdelen.

### Tabbladen

Buildless tabs kunnen eenvoudig met:

- knoppen met `aria-selected`;
- panelen met `hidden`;
- kleine JS-helper in `tabs.js`.

Belangrijk:

- content moet ook lineair leesbaar blijven als JS uitvalt.

### Objectboom

Voor OTL en objectenhandboek:

- begin met een uitklapbare lijststructuur in HTML;
- voeg later filteren en highlighten toe;
- vermijd complexe tree widgets in de eerste oplevering.

### Detailpagina's

Standaardopbouw:

1. breadcrumbs
2. paginatitel en samenvatting
3. metadata blok
4. hoofdinhoud
5. gerelateerde objecten/documenten
6. download of referentieblok

### Tabellen

Voor tabellen:

- gebruik gewone HTML-tabellen;
- voeg sorteren of filteren alleen toe als enhancement;
- ontwerp mobiel gedrag via horizontaal scrollbare containers.

### Documentweergave

Voor werkinstructies en standaarddocumenten:

- start met documentoverzichtspagina's;
- toon metadata, samenvatting en verwijzingen;
- link naar PDF of HTML-samenvattingen;
- vermijd embedded viewers als vereiste.

### Fallback als JSON of fetch lokaal niet werkt

Voorkeursvolgorde:

1. volledige HTML-inhoud werkt zelfstandig;
2. JSON wordt alleen gebruikt om onderdelen te verrijken;
3. inline JSON in HTML voor kleine datasets;
4. geen kritische pagina afhankelijk maken van runtime data-loading.

## 5. Fase 4: stappenplan voor realisatie

### Stap 1

Doel: technische basis leggen.

Voorstel:

- projectmap structureren;
- basis `index.html` toevoegen;
- platform-CSS en platform-JS aanmaken;
- eerste gedeelde shell definiëren.

Jouw expliciete keuze:

- wel of geen Visual Studio solutionbestand opnemen.

Verwachte output:

- openbare mapstructuur;
- klikbare startpagina;
- centrale stylesheets en scripts.

### Stap 2

Doel: informatiearchitectuur zichtbaar maken.

Voorstel:

- hoofdnavigatie;
- breadcrumbs;
- landingspagina met drie hoofdgroepen;
- skeletonpagina's voor alle productlijnen.

Jouw expliciete keuze:

- definitieve benamingen van de hoofdgroepen in navigatie en paginatitels.

Verwachte output:

- volledig klikbare sitemap op hoofdniveau.

### Stap 3

Doel: design system in praktische vorm brengen.

Voorstel:

- kaartcomponenten;
- gridlayout;
- tabs;
- tabelstijl;
- detailpagina-template.

Jouw expliciete keuze:

- visuele richting: zakelijk neutraal of meer bestuurlijk/public-service.

Verwachte output:

- herbruikbare componentset voor verdere invulling.

### Stap 4

Doel: eerste productlijn inhoudelijk uitwerken.

Voorstel:

- kies 1 productlijn voor diepere uitwerking;
- voeg voorbeeldcontent en detailstructuren toe;
- maak navigatie binnen die productlijn af.

Jouw expliciete keuze:

- welke productlijn eerst inhoudelijk leidend wordt.

Verwachte output:

- 1 representatieve end-to-end productflow.

### Stap 5

Doel: datagedreven uitbreidbaarheid voorbereiden.

Voorstel:

- voorbeeld-JSON toevoegen voor begrippen, objecten of assets;
- data-loader met fallback bouwen;
- HTML en data naast elkaar structureren.

Jouw expliciete keuze:

- of JSON al in de eerste klikdemo nodig is, of pas in iteratie 2.

Verwachte output:

- toekomstvaster contentmodel zonder runtime-afhankelijkheid.

### Stap 6

Doel: afronden van proof-of-concept.

Voorstel:

- alle productlijnen minimaal klikbaar;
- consistente breadcrumbs, cards en layouts;
- documentatiebestand met werkafspraken toevoegen.

Jouw expliciete keuze:

- welke onderdelen alleen skeleton blijven in versie 1.

Verwachte output:

- beheerbaar proof-of-concept dat intern toonbaar is.

## 6. Fase 5: eerste technische oplevering

### Minimale werkende projectstructuur

De eerste oplevering moet minimaal bevatten:

- een root `index.html`;
- centrale CSS-bestanden;
- centrale JS-bestanden;
- een landingspagina;
- drie hoofdroutes;
- skeletons voor alle subonderdelen van Datastandaard;
- 1 uitgewerkte productlijn.

### Pagina's die als eerste aangemaakt moeten worden

- home / platformlanding
- assetregister overzicht
- assetmanagement overzicht
- datastandaard overzicht
- woordenboek overzicht
- objectenhandboek overzicht
- otl overzicht
- referentiedataset overzicht
- werkinstructies overzicht

### Pagina's die eerst skeleton mogen zijn

- detailpagina's van assetregister;
- detailpagina's van processen en rollen;
- datasetdetailpagina's;
- documentdetailpagina's;
- verdiepende pagina's binnen overige productstructuren.

### Eerste inhoudelijk uit te werken productlijn

Aanbeveling: `Datastandaard`, met daarbinnen eerst `Woordenboek` of `Objectenhandboek`.

Waarom:

- deze lijn profiteert het meest van duidelijke informatiearchitectuur;
- goed geschikt voor kaarten, tabellen, detailpagina's en boomstructuren;
- vormt een sterke basis voor latere JSON- of CMS-migratie;
- laat meteen zien hoe structuur, standaarden en documentatie samenkomen.

Alternatief:

- kies `Assetregister` als de klikdemo vooral object- en detailgericht moet zijn.

## 7. Aanbevolen keuzes

Mijn concrete aanbeveling voor dit project:

- start technisch met statische HTML/CSS/JS;
- ontwerp data alvast scheidbaar, maar maak HTML leidend;
- bouw eerst het platformframe en daarna Datastandaard als voorbeeldproductlijn;
- houd alle namen, mappen en componenten al migratievriendelijk;
- gebruik Visual Studio vooral als beheeromgeving, niet als verplichte runtime.

## 8. Beslisnotitie route B: inline data versus fetch

Binnen route B zijn er twee manieren om JSON of GeoJSON te gebruiken:

- inline: data staat direct in de HTML-pagina;
- fetch: data wordt tijdens runtime opgehaald uit een los `.json`- of `.geojson`-bestand.

### Inline data

Betekenis:

- JSON, GeoJSON of JSON-LD staat in de pagina zelf, meestal in een `<script type="application/json">` of `<script type="application/ld+json">`.

Voordelen:

- werkt het veiligst op een beheerde bedrijfslaptop;
- werkt meestal ook wanneer de pagina direct via `file://` wordt geopend;
- geen afhankelijkheid van een lokale server;
- geschikt voor proof-of-concepts, fallbackdata en semantische metadata.

Nadelen:

- HTML-bestanden worden sneller groot;
- data is minder centraal herbruikbaar;
- minder geschikt voor grotere datasets;
- beheer wordt lastiger als meerdere pagina's dezelfde data delen.

### Fetch

Betekenis:

- de pagina haalt data op uit een los bestand, zoals `assets.json` of `assets.geojson`.

Voordelen:

- nette scheiding tussen data en presentatie;
- makkelijker onderhoudbaar bij groei;
- beter herbruikbaar over meerdere pagina's;
- sterkere basis voor latere migratie naar API, CMS of server-side rendering.

Nadelen:

- werkt lokaal via `file://` vaak niet door browserbeveiliging;
- vraagt foutafhandeling en laadlogica;
- is in jouw huidige omgeving minder betrouwbaar zonder servercontext.

### Advies voor dit project

Voor jouw laptop en werkomgeving is de beste route:

- HTML-first bouwen;
- inline `JSON-LD` gebruiken voor semantische metadata;
- inline `JSON` en inline `GeoJSON` gebruiken voor lokale proof-of-conceptdata;
- de datastructuur wel alvast zo ontwerpen dat die later eenvoudig verplaatst kan worden naar losse bestanden of een serverbron.

Praktische conclusie:

- veiligst nu: inline;
- netst voor later: fetch;
- beste compromis voor route B: eerst inline, later opschaalbaar naar fetch.

## 9. Keuzes die jij binnenkort expliciet moet maken

1. Willen we alleen een losse mapstructuur, of ook direct een Visual Studio solution?
2. Wordt `Datastandaard` of `Assetregister` de eerste volledig uitgewerkte productlijn?
3. Moet versie 1 al JSON-voorbeelddata tonen, of houden we iteratie 1 volledig HTML-first?
