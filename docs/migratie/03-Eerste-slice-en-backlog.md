# Eerste slice en backlog

## Doel

De eerste migratieslice moet klein genoeg zijn om beheersbaar te blijven, maar groot genoeg om de nieuwe werkwijze echt te testen.

## Aanbevolen eerste slice

Ik adviseer deze eerste slice:

1. home
2. gedeelde layout
3. Datastandaard landing
4. Woordenboek landing

Waarom deze combinatie goed is:

- je test routing en layout;
- je test gedeelde componenten;
- je test productlanding en onderliggende productstructuur;
- je test contentmodellering en navigatie;
- en je raakt nog niet meteen de hele complexiteit van OTL en assetdetail.

## Wat nog niet in de eerste slice hoeft

Nog niet meenemen:

- volledige OTL-graphmigratie;
- volledige assetdetailinteractie;
- alle woordenboekdetailpagina's;
- alle objectenhandboekdetails;
- CMS-koppeling.

Dat houden we bewust uit de eerste slice om risico te beperken.

## Concrete backlog

### Backlog 1: doelstructuur opzetten

- maak een aparte map voor de nieuwe omgeving, bij voorkeur `next/`;
- leg daar een basisstructuur aan voor `content`, `components`, `layouts`, `pages`, `features` en `styles`;
- voeg een korte README toe die het verschil met de huidige PoC uitlegt.

### Backlog 2: navigatie modelleren

- vertaal de huidige hoofdnavigatie naar een centrale datastructuur;
- vertaal breadcrumbs naar een herbruikbaar model;
- definieer welke navigatie platformbreed is en welke productspecifiek is.

### Backlog 3: componentinventarisatie

Migreer eerst de gedeelde bouwblokken:

- header
- footer
- breadcrumb
- hero
- panel
- product-card
- system-choice-card
- callout

### Backlog 4: eerste contentcollections definieren

Definieer minimaal deze collections:

1. `platformPage`
2. `productLanding`
3. `contentPage`

En voeg voor elk item minimaal deze velden toe:

- `title`
- `slug`
- `part`
- `product`
- `summary`
- `ownerTeam`
- `status`
- `lastReviewed`

### Backlog 5: home migreren

- migreer de huidige home naar de nieuwe omgeving;
- zorg dat structuur en boodschap gelijkwaardig blijven;
- maak de route vergelijkbaar met de PoC.

### Backlog 6: Datastandaard landing migreren

- zet de pagina om naar de nieuwe component- en contentstructuur;
- scheid navigatie, content en kaarten;
- maak systeem- en productblokken herbruikbaar.

### Backlog 7: Woordenboek landing migreren

- maak de landingspagina contentgedreven;
- koppel metadata en productnavigatie;
- leg alvast de basis voor latere termdetail- en zoekuitbreiding.

### Backlog 8: vergelijkingscheck PoC versus nieuwe slice

Controleer per slice:

- inhoudelijke gelijkwaardigheid;
- navigatieconsistentie;
- visuele consistentie;
- linkdekking;
- en eigenaarschap van content.

## Acceptatiecriteria voor de eerste slice

De eerste slice is pas geslaagd als:

- de PoC onaangetast is gebleven;
- de nieuwe omgeving dezelfde kernroute ondersteunt;
- layout en navigatie centraal beheerd worden;
- content niet meer hard in losse HTML is vastgebakken;
- en de slice begrijpelijk overdraagbaar is aan meerdere product owners.

## Beslispunt na de eerste slice

Na de eerste slice beslissen we pas over:

- verdere productmigratie;
- keuze voor CMS of nog niet;
- volgorde van vervolgproducten;
- en het moment waarop de nieuwe omgeving een eigen preview of publicatieroute krijgt.
