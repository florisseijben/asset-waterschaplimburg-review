---
title: Stuw
slug: /datastandaard/objectenhandboek/watersysteem/kunstwerken/stuw
part: datastandaard
product: objectenhandboek
ownerTeam: datastandaard
status: eerste-template
lastReviewed: 2026-04-24
summary: Op deze pagina vind je de definitie en afbakening van Stuw, de positie van dit kunstwerktype binnen Kunstwerk, de geometrische uitgangspunten en de relaties met peilbeheer en watergangsecties.
heroTitle: Stuw
hierarchy:
  - Watersysteem
  - Stroomgebied
  - Kunstwerk
  - Stuw
classification:
  systems:
    - watersysteem
  disciplines:
    - civiele-techniek
    - werktuigbouwkunde
    - procesautomatisering
    - informatie-en-data
  objectFamilies:
    - kunstwerken
  publications:
    - objectenhandboek-watersysteem
    - objectenhandboek-civiele-techniek
    - objectenhandboek-werktuigbouwkunde
    - objectenhandboek-procesautomatisering
    - objectenhandboek-informatie-en-data
  confidence: afgeleid
definition: vaste of beweegbare constructie in het water die dient om de waterhoogte bovenstrooms en/of benedenstrooms van de constructie te regelen
definitionSource: "Aquo, begrip stuw: https://www.aquo.nl/index.php/Id-49b5705e-3b12-622c-0a87-b4e11b1fbd98"
terms:
  - title: Kunstwerk
    text: Bovenliggend objecttype voor beheerobjecten die water sturen, keren, doorlaten of verplaatsen.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken
  - title: Peilbeheer
    text: Beheerfunctie waarbij een stuw vaak een centrale rol speelt.
    href: /datastandaard/woordenboek
  - title: Watergangsectie
    text: Deel van de watergang waarop een stuw lokaal invloed heeft.
    href: /datastandaard/objectenhandboek/watersysteem/watergangsectie
metadata:
  - label: Systeem
    value: Watersysteem
  - label: Subsysteem
    value: Stroomgebied
  - label: Objectfamilie
    value: Kunstwerk
  - label: Objecttype
    value: Stuw
  - label: Bronsysteem
    value: semantische beheeromgeving
  - label: URI
    value: https://data.waterschaplimburg.nl/id/objecttype/stuw
contentSections:
  - title: Overzicht / Samenhang
    summary: In het watersysteem kennen we bij stuwen diverse functies. In de meeste gevallen worden stuwen gebruikt om waterpeilen in een watergang te verhogen (regelen), stroomsnelheden te remmen of water vast te houden (conserveren). Stuwconstructies kunnen ook gebruikt worden om water te verdelen over meerdere watergangen. Constructief zit er diversiteit in stuwen (typen en soorten).
    image:
      src: /images/objectenhandboek/Stuw/Stuw met Klep.png
      alt: Overzichtsfoto van een stuw met klep in een watergang.
    caption: Afbeelding 1. Overzicht van een stuw met klep.
    items:
      - title: Waterkerende constructie
        text: Stuwconstructie waarbij het keren of regelen van water centraal staat.
      - title: Stuw met een gronddam
        text: Stuw waarbij een gronddam onderdeel is van de constructieve opbouw.
      - title: Stuw met een stuwhoofd
        text: Stuw waarbij het stuwhoofd de constructieve en regelende functie ondersteunt.
      - title: Regelmiddel
        text: Onderdeel waarmee de werking of doorlaat van de stuw wordt geregeld.
      - title: Klep
        text: Regelmiddel waarmee de waterstand of doorstroming kan worden ingesteld.
      - title: Schuif
        text: Regelmiddel dat verticaal of horizontaal kan worden bewogen om de doorlaat te regelen.
      - title: Schotbalk
        text: Uitneembaar of stapelbaar regelmiddel waarmee de waterhoogte stapsgewijs kan worden ingesteld.
      - title: Balgstuw
        text: Beweegbare stuw waarbij een balgconstructie de kerende of regelende functie verzorgt.
      - title: Regelbaarheid
        text: Indeling naar de mate waarin en de manier waarop de stuw kan worden bediend of aangestuurd.
      - title: Vast stuw (niet regelbaar)
        text: Stuw met een vaste kerende hoogte zonder bedienbaar regelmiddel.
      - title: Handmatig regelbaar
        text: Stuw die lokaal met handbediening wordt ingesteld.
      - title: Mechanisch-automatisch regelbaar
        text: Stuw waarbij mechanische voorzieningen de regeling automatisch ondersteunen.
      - title: Elektisch-automatisch regelbaar (op afstand)
        text: Stuw die elektrisch en op afstand kan worden aangestuurd.
      - title: Solar en telemetrie
        text: Stuw met autonome energievoorziening en telemetrie voor monitoring of aansturing.
      - title: Vast netaansluiting en telemetrie
        text: Stuw met vaste netaansluiting en telemetrie voor monitoring of aansturing.
  - title: Afbakening
    summary: De afbakening volgt de constructie die het water keert of doorlaat, inclusief relevante regelbare onderdelen.
  - title: Geometrie
    summary: Een stuw wordt meestal als puntobject vastgelegd op de locatie waar de watergang wordt geregeld.
    items:
      - title: Dwarsprofiel
        text: De dwarsdoorsnede toont de constructieve opbouw van de stuw in het profiel van de watergang.
        image:
          src: /images/objectenhandboek/Stuw/Dwarsprofiel stuw.png
          alt: Dwarsprofiel van een stuw met decompositie van bouwdelen.
        caption: Afbeelding 2. Dwarsprofiel van een stuw.
      - title: Bovenaanzicht
        text: Het bovenaanzicht toont de ligging en onderdelen van de stuw vanuit de bovenkant.
        image:
          src: /images/objectenhandboek/Stuw/Bovenaanzicht stuw.png
          alt: Bovenaanzicht van een stuw met decompositie van bouwdelen.
        caption: Afbeelding 3. Bovenaanzicht van een stuw.
      - title: Grootschalig
        text: Leg constructiepositie, doorlaat en aansluitingen op watergang en oevers nauwkeurig vast.
      - title: Midschalig
        text: Toon de stuw als peilregelend punt in de watergang.
      - title: Kleinschalig
        text: Toon vooral stuwen met betekenis voor hoofdpeilen of systeemwerking.
productRelations:
  - title: Woordenboek
    text: Begrippen en definities voor stuwen en gerelateerde kunstwerken.
    href: /datastandaard/woordenboek
  - title: Object Type Library
    text: Modellering van eigenschappen, relaties en gedrag van stuwen.
    href: /datastandaard/otl
  - title: Referentiedataset
    text: Voorbeelddata en toetsbare referentiegegevens voor stuwen.
    href: /datastandaard/referentiedataset
  - title: Werkinstructies
    text: Werkafspraken voor het vastleggen en beheren van stuwen.
    href: /datastandaard/werkinstructies
nextSteps:
  - title: Kunstwerk
    text: Terug naar de objectfamilie Kunstwerk.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken
    direction: back
---

Deze detailpagina werkt `Stuw` uit als kunstwerktype binnen het Objectenhandboek.
