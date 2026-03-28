# Concreet bouwschema Datastandaard

## Doel

Dit bouwschema werkt het gekozen advies concreet uit:

- we beginnen met `Woordenboek`;
- we ontwerpen `Woordenboek` als eerste semantische productlijn;
- we laten `Objectenhandboek`, `OTL`, `Referentiedataset` en `Werkinstructies` daarop aansluiten;
- we houden de oplossing buildless, HTML-first en Visual Studio-vriendelijk;
- we bereiden `Woordenboek` expliciet voor op linked data uit de semantische beheeromgeving met `RDF`, `OWL` en `SHACL`.

## Uitgangspunt voor de bronaanpak

Voor `Woordenboek` gebruiken we bewust een hybride model:

- fase 1: pagina's werken volledig met inline of lokale mockdata;
- fase 2: dezelfde pagina's kunnen semantische data uit de semantische beheeromgeving inlezen;
- fase 3: de bron uit de semantische beheeromgeving vervangt of verrijkt de mockdata.

Dat betekent:

- HTML-structuur is nu leidend;
- semantische velden worden nu al zichtbaar gemaakt;
- datasleutels en componenten worden zo benoemd dat ze straks passen op concepten, URI's, labels, relaties en shapes.

## Doelstructuur per product binnen Datastandaard

```text
src/products/datastandaard/
  pages/
    index.html

  woordenboek/
    pages/
      index.html
      begrip-detail.html
      relaties.html
    components/
      term-card.html
      definitieblok.html
      begrip-relaties.html
      linked-data-panel.html
    data/
      begrippen.inline.json
      begrippen.edg-mapping.json
      begrip-detail.mock.json

  objectenhandboek/
    pages/
      index.html
      object-detail.html
    components/
      object-card.html
      eigenschappen-tabel.html
      gekoppelde-begrippen.html
    data/
      objecttypen.inline.json
      objecttypen.inline.geojson
      object-detail.mock.json

  otl/
    pages/
      index.html
      klasse-detail.html
    components/
      klasse-meta.html
      object-tree.html
      relatie-lijst.html
    data/
      klassen.inline.json
      klassenrelaties.mock.json

  referentiedataset/
    pages/
      index.html
      dataset-detail.html
    components/
      dataset-card.html
      dataset-meta.html
      downloadblok.html
    data/
      datasets.inline.json
      dataset-detail.mock.json

  werkinstructies/
    pages/
      index.html
      instructie-detail.html
    components/
      document-card.html
      instructie-meta.html
      gerelateerde-standaarden.html
    data/
      instructies.inline.json
      instructie-detail.mock.json
```

## Platformuitbreiding die eerst nodig is

Deze bestanden worden platformbreed herbruikbaar en moeten voor alle productlijnen beschikbaar zijn.

### Bestaande platformbestanden uitbreiden

`src/platform/assets/css/components.css`

Doel:

- stijlen voor metadata-blokken;
- linked-data panel;
- relatieblokken;
- bronverwijzingen;
- detailheaders;
- tabelvarianten;
- document- en datasetkaarten.

`src/platform/assets/js/app.js`

Doel:

- centrale opstartlogica behouden;
- hook voor generieke enhancement;
- veilige detectie van inline data op pagina's.

`src/platform/assets/js/tabs.js`

Doel:

- tabs blijven herbruikbaar;
- linked-data panel kan dezelfde tablogica gebruiken voor `Samenvatting`, `RDF`, `OWL`, `SHACL`.

### Nieuwe platformbestanden

`src/platform/assets/js/data-inline.js`

Doel:

- inline JSON uit `<script type="application/json">` ophalen;
- data op id of naam kunnen selecteren;
- foutveilig blijven als data ontbreekt.

`src/platform/assets/js/linked-data-panel.js`

Doel:

- semantische secties vullen;
- tabs en states voor `RDF`, `OWL`, `SHACL`;
- eerst mockdata ondersteunen;
- later vervangbaar maken door bronresponses.

`src/platform/assets/js/term-detail.js`

Doel:

- detailrendering voor begrippen;
- data mappen naar definitie, labels, URI, relaties, shapes.

`src/platform/assets/css/utilities.css`

Uitbreiding:

- utility classes voor semantische badges, codeblokken, URI-weergave en statuslabels.

### Nieuwe platformcomponentreferenties

`src/platform/components/meta-list.html`

Doel:

- standaard markup voor label/waarde metadata.

`src/platform/components/linked-data-panel.html`

Doel:

- referentie-opmaak voor tabpaneel met semantische data.

`src/platform/components/source-list.html`

Doel:

- uniforme lijst voor bronnen, URI's en herkomst.

`src/platform/components/related-items.html`

Doel:

- herbruikbare lijst van gerelateerde begrippen, objecten, klassen of documenten.

## Bouwvolgorde

We bouwen in zes iteraties.

### Iteratie 1: Woordenboek als basistemplate

Doel:

- eerste complete templatefamilie neerzetten;
- eerste linked-data plaatsing zichtbaar maken;
- detailtemplate definiÃ«ren waar andere producten op kunnen meeliften.

Bestanden aanmaken of uitbreiden:

- `src/products/datastandaard/woordenboek/pages/index.html`
- `src/products/datastandaard/woordenboek/pages/begrip-detail.html`
- `src/products/datastandaard/woordenboek/components/term-card.html`
- `src/products/datastandaard/woordenboek/components/definitieblok.html`
- `src/products/datastandaard/woordenboek/components/linked-data-panel.html`
- `src/products/datastandaard/woordenboek/data/begrippen.inline.json`
- `src/products/datastandaard/woordenboek/data/begrip-detail.mock.json`
- `src/products/datastandaard/woordenboek/data/begrippen.edg-mapping.json`

Functioneel resultaat:

- overzicht van begrippen;
- detailpagina voor een begrip;
- zichtbaar onderscheid tussen functionele content en semantische content;
- mockvelden voor `prefLabel`, `altLabel`, `definition`, `uri`, `broader`, `narrower`, `related`, `owlClass`, `shaclShape`.

### Iteratie 2: platformcomponenten voor detailpagina's

Doel:

- generieke componenten uit Woordenboek los trekken naar platformniveau.

Bestanden aanmaken of uitbreiden:

- `src/platform/components/meta-list.html`
- `src/platform/components/linked-data-panel.html`
- `src/platform/components/source-list.html`
- `src/platform/components/related-items.html`
- `src/platform/assets/js/data-inline.js`
- `src/platform/assets/js/linked-data-panel.js`
- `src/platform/assets/js/term-detail.js`
- `src/platform/assets/css/components.css`
- `src/platform/assets/css/utilities.css`

Functioneel resultaat:

- Ã©Ã©n generiek patroon voor metadata;
- Ã©Ã©n generiek patroon voor bron- en herkomstinformatie;
- tabs voor semantische weergave;
- voorbereid op hergebruik in andere datastandaardproducten.

### Iteratie 3: Objectenhandboek als tweede templatefamilie

Doel:

- complexere detailstructuur toevoegen;
- eigenschappen, relaties en locatie voorbereiden.

Bestanden aanmaken of uitbreiden:

- `src/products/datastandaard/objectenhandboek/pages/index.html`
- `src/products/datastandaard/objectenhandboek/pages/object-detail.html`
- `src/products/datastandaard/objectenhandboek/components/object-card.html`
- `src/products/datastandaard/objectenhandboek/components/eigenschappen-tabel.html`
- `src/products/datastandaard/objectenhandboek/components/gekoppelde-begrippen.html`
- `src/products/datastandaard/objectenhandboek/data/objecttypen.inline.json`
- `src/products/datastandaard/objectenhandboek/data/objecttypen.inline.geojson`
- `src/products/datastandaard/objectenhandboek/data/object-detail.mock.json`

Functioneel resultaat:

- objectoverzicht;
- detailpagina met metadata, eigenschappen en gekoppelde begrippen;
- eerste hergebruik van `meta-list`, `related-items` en `linked-data-panel`.

### Iteratie 4: OTL met boomstructuur en relaties

Doel:

- hiÃ«rarchie, relaties en klassen zichtbaar maken.

Bestanden aanmaken of uitbreiden:

- `src/products/datastandaard/otl/pages/index.html`
- `src/products/datastandaard/otl/pages/klasse-detail.html`
- `src/products/datastandaard/otl/components/object-tree.html`
- `src/products/datastandaard/otl/components/klasse-meta.html`
- `src/products/datastandaard/otl/components/relatie-lijst.html`
- `src/products/datastandaard/otl/data/klassen.inline.json`
- `src/products/datastandaard/otl/data/klassenrelaties.mock.json`
- `src/platform/assets/js/tree.js`

Functioneel resultaat:

- overzicht van klassen;
- detailpagina met overerving en relaties;
- herbruikbare boomweergave voor OTL en later mogelijk Objectenhandboek.

### Iteratie 5: Referentiedataset

Doel:

- dataset- en downloadgerichte pagina's toevoegen zonder nieuw basismodel te bedenken.

Bestanden aanmaken of uitbreiden:

- `src/products/datastandaard/referentiedataset/pages/index.html`
- `src/products/datastandaard/referentiedataset/pages/dataset-detail.html`
- `src/products/datastandaard/referentiedataset/components/dataset-card.html`
- `src/products/datastandaard/referentiedataset/components/dataset-meta.html`
- `src/products/datastandaard/referentiedataset/components/downloadblok.html`
- `src/products/datastandaard/referentiedataset/data/datasets.inline.json`
- `src/products/datastandaard/referentiedataset/data/dataset-detail.mock.json`

Functioneel resultaat:

- overzicht met datasets;
- detailpagina met metadata, herkomst, downloads en semantische verwijzingen.

### Iteratie 6: Werkinstructies

Doel:

- documentgerichte pagina's laten aansluiten op bestaande patronen.

Bestanden aanmaken of uitbreiden:

- `src/products/datastandaard/werkinstructies/pages/index.html`
- `src/products/datastandaard/werkinstructies/pages/instructie-detail.html`
- `src/products/datastandaard/werkinstructies/components/document-card.html`
- `src/products/datastandaard/werkinstructies/components/instructie-meta.html`
- `src/products/datastandaard/werkinstructies/components/gerelateerde-standaarden.html`
- `src/products/datastandaard/werkinstructies/data/instructies.inline.json`
- `src/products/datastandaard/werkinstructies/data/instructie-detail.mock.json`

Functioneel resultaat:

- documentoverzichten;
- detailpagina's met relatie naar begrippen, objecten en standaarden;
- maximaal hergebruik van eerdere detail- en metadata-onderdelen.

## Concreet bestandsschema voor Woordenboek

Hier beginnen we mee. Dit is de eerste echte bouwstap.

### `src/products/datastandaard/woordenboek/pages/index.html`

Doel:

- overzichtspagina van alle begrippen;
- lijst, zoekingang en filters;
- termkaarten tonen;
- doorklikken naar begripdetail.

Belangrijkste secties:

- hero met uitleg van het Woordenboek;
- filter- of alfabetnavigatie;
- lijst met termkaarten;
- uitleg over semantische bron en status.

### `src/products/datastandaard/woordenboek/pages/begrip-detail.html`

Doel:

- hoofdtemplate voor een begrip;
- scheiding tussen inhoud, relaties en linked data;
- voorbeeldpagina voor koppeling met de semantische beheeromgeving.

Belangrijkste secties:

- breadcrumb;
- titel, voorkeurslabel en samenvatting;
- metadata-blok;
- definitieblok;
- relatiesectie;
- linked-data panel met tabs;
- bronverwijzingen.

### `src/products/datastandaard/woordenboek/pages/relaties.html`

Doel:

- optionele overzichtspagina voor relaties tussen begrippen;
- nuttig zodra er voldoende linked concepts zijn;
- mag in eerste iteratie nog skeleton blijven.

### `src/products/datastandaard/woordenboek/components/term-card.html`

Doel:

- standaardkaart in overzichtslijsten;
- toont term, korte definitie, status en type.

### `src/products/datastandaard/woordenboek/components/definitieblok.html`

Doel:

- markupreferentie voor definitie, toelichting, bron en notities.

### `src/products/datastandaard/woordenboek/components/begrip-relaties.html`

Doel:

- relaties zoals `breder begrip`, `nauwer begrip`, `gerelateerd begrip`.

### `src/products/datastandaard/woordenboek/components/linked-data-panel.html`

Doel:

- productspecifieke referentie van het generieke platformcomponent;
- laat zien hoe `RDF`, `OWL` en `SHACL` in Woordenboek worden gepresenteerd.

### `src/products/datastandaard/woordenboek/data/begrippen.inline.json`

Doel:

- lijstdata voor het overzicht;
- bevat alleen velden die nodig zijn voor kaarten en navigatie.

Aanbevolen velden:

- `id`
- `slug`
- `prefLabel`
- `altLabels`
- `shortDefinition`
- `status`
- `uri`
- `conceptScheme`

### `src/products/datastandaard/woordenboek/data/begrip-detail.mock.json`

Doel:

- detailmock voor Ã©Ã©n of meer begrippen;
- voedt de detailtemplate zonder externe bron.

Aanbevolen velden:

- `id`
- `slug`
- `prefLabel`
- `altLabels`
- `definition`
- `scopeNote`
- `status`
- `uri`
- `rdfType`
- `owlClass`
- `shaclShape`
- `broader`
- `narrower`
- `related`
- `sourceSystem`
- `lastUpdated`

### `src/products/datastandaard/woordenboek/data/begrippen.edg-mapping.json`

Doel:

- vertaallaag tussen lokale paginavelden en verwachte bronvelden;
- documenteert de koppeling zonder dat runtime-integratie nu verplicht is.

Aanbevolen inhoud:

- mapping van `prefLabel` naar bronlabelveld;
- mapping van `definition` naar semantisch eigenschapspad;
- mapping van `broader`, `narrower`, `related`;
- mapping van `owlClass`;
- mapping van `shaclShape`;
- bronnotatie van graph, vocabulary of endpoint.

## Herbruikbare componentkeuzes

Deze componenten zetten we na Woordenboek generiek in `platform`.

### Direct generiek maken

- `meta-list`
- `linked-data-panel`
- `source-list`
- `related-items`
- `tabs`
- `callout`
- `data-table`

### Eerst productspecifiek houden

- `term-card`
- `definitieblok`
- `begrip-relaties`
- `object-card`
- `eigenschappen-tabel`
- `object-tree`
- `dataset-card`
- `document-card`

Reden:

- de generieke componenten gaan over presentatiepatronen;
- de productspecifieke componenten gaan over domeininhoud en terminologie.

## semantische voorbereiding binnen Woordenboek

Omdat `Woordenboek` linked data uit de semantische beheeromgeving moet kunnen ophalen, ontwerpen we het detailtemplate nu al op drie niveaus.

### Niveau 1: leesbare businesslaag

Gebruiker ziet:

- begrip;
- definitie;
- synoniemen;
- status;
- gerelateerde begrippen.

### Niveau 2: semantische laag

Gebruiker of beheerder ziet:

- URI;
- vocabulary of scheme;
- RDF-type;
- OWL-classificatie;
- SHACL-shape;
- bronverwijzingen.

### Niveau 3: technische laag

Voor latere integratie reserveren we:

- plek voor ruwe semantische payload;
- foutstatus of laadstatus;
- mappingweergave;
- bronvermelding naar semantische graph of endpoint.

## Volgorde van realisatie in het project

Als we dit schema strikt volgen, bouwen we in deze volgorde:

1. `Woordenboek` overzichtspagina.
2. `Woordenboek` begrip-detailtemplate.
3. `Woordenboek` mockdata en bronmappingbestand.
4. platformcomponenten `meta-list`, `linked-data-panel`, `source-list`, `related-items`.
5. `Objectenhandboek` detailtemplate.
6. `OTL` boom- en relatietemplate.
7. `Referentiedataset` detailtemplate.
8. `Werkinstructies` documenttemplate.

## Wat we hiermee bereiken

Na deze route hebben we:

- een stabiele templatefamilie voor Datastandaard;
- een eerste semantische productlijn die op de semantische beheeromgeving kan aansluiten;
- maximale herbruikbaarheid zonder build tooling;
- een volgorde waarin complexiteit gecontroleerd oploopt;
- een basis die later kan migreren naar server-side rendering of echte API-koppelingen.

## Concrete eerstvolgende bouwstap

De eerstvolgende praktische stap is:

- `Woordenboek` uitbreiden van alleen `index.html` naar:
  - `index.html`
  - `begrip-detail.html`
  - mockdata
  - linked-data panel
  - platformmetadata-component

Dat is de kleinste complete eenheid waarmee we tegelijk:

- een nieuwe paginatypefamilie neerzetten;
- linked-data voorbereiding zichtbaar maken;
- componenten bouwen die de rest van Datastandaard direct kan hergebruiken.


