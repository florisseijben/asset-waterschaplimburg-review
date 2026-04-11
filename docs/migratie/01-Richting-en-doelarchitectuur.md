# Richting en doelarchitectuur

## Doel

Het platform moet doorgroeien van een statische PoC naar een beheersbare publicatieomgeving die:

- meerdere onderdelen tegelijk ondersteunt;
- meerdere producten per onderdeel ondersteunt;
- parallel werk door meerdere deelproduct owners aankan;
- inhoud, platform en interactieve features beter scheidt;
- en publicatie reproduceerbaar maakt.

## Hoofdrichting

De aanbevolen richting is:

**Astro + content collections + React islands + gespecialiseerde Reactodia-inzet**

## Waarom deze richting past

Deze richting past goed omdat:

- de site grotendeels statisch en snel publiceerbaar blijft;
- componenten en layouts centraal beheerd kunnen worden;
- content per onderdeel en product in aparte collecties beheerd kan worden;
- interactieve delen gericht opgebouwd kunnen worden zonder de hele site als app te maken;
- en eigenaarschap per domein technisch beter af te bakenen is.

## Technologiekeuzes

### Astro

Gebruik Astro als:

- renderlaag;
- routelaag;
- template- en layoutlaag;
- publicatiebasis voor de nieuwe omgeving.

Astro is hier geschikt omdat het goed werkt voor contentrijke sites met beperkte, gerichte interactiviteit.

### React

Gebruik React alleen voor islands zoals:

- zoeken;
- filteren;
- detailvergelijking;
- interactieve tabellen;
- samengestelde detailweergaven.

Niet gebruiken voor:

- de volledige routing;
- alle contentrendering;
- een volledige SPA-architectuur.

### Reactodia

Gebruik Reactodia alleen voor:

- OTL-verkenning;
- semantische relaties;
- graph- en decompositievisualisatie.

Niet gebruiken als generieke content- of navigatielaag.

### Bootstrap

Niet gebruiken als basisframework voor de site.

Waarom niet:

- het lost contentmodellering en eigenaarschap niet op;
- het drukt de site sneller richting generieke patronen;
- en je hebt al een eigen designlaag die beter aansluit op de domeinstructuur.

## Doelstructuur van de nieuwe omgeving

De nieuwe omgeving krijgt idealiter deze hoofdstructuur:

```text
/next
  /src
    /content
      /platform
      /datastandaard
      /assetregister
      /assetmanagement
    /data
    /components
    /layouts
    /features
    /pages
    /styles
```

## Ontwerpprincipes

### Principe 1: content eerst

Inhoud wordt gestructureerd vastgelegd als content en data, niet als losse handgemaakte HTML-pagina's.

### Principe 2: domeingrenzen zijn zichtbaar

Per onderdeel en product moet duidelijk zijn:

- wie eigenaar is;
- waar content staat;
- welke componenten gedeeld zijn;
- welke features productspecifiek zijn.

### Principe 3: publicatie-output is gegenereerd

De nieuwe publicatieomgeving genereert output. We onderhouden niet handmatig een bronboom en een publicatieboom naast elkaar.

### Principe 4: de huidige PoC blijft referentie

De PoC blijft de stabiele referentie tot de nieuwe omgeving expliciet per slice is goedgekeurd.

## Voorlopige inhoudsindeling

```text
/next/src/content
  /platform
  /datastandaard
    /landing
    /woordenboek
    /objectenhandboek
    /otl
    /referentiedataset
    /werkinstructies
  /assetregister
    /landing
    /systemen
    /disciplines
    /assets
  /assetmanagement
    /landing
    /strategie
    /programmering
    /uitvoering
    /monitoring
```

## Eigenaarschap in de doelarchitectuur

De doelarchitectuur moet expliciet ruimte maken voor:

- platform owner;
- product owner per hoofdonderdeel;
- deelproduct owner per productlijn;
- redactie of inhoudelijk beheer.

Daarom moeten content, componenten en features per map logisch afgebakend zijn.
