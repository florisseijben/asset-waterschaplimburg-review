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
    summary: We onderscheiden verschillende soorten stuwen op basis van het type stuwhoofd (waterkerende constructie of een grondlichaam), het type regelmiddel (klepconstructie, schuifconstructie, schotbalkconstructie en balgconstructie), het type aandrijving en bewegingswerk en de regelbaarheid (niet regelbaar, handmatig regelbaar, mechanisch automatisch regelbaar, elektrisch automatisch regelbaar).
  - title: Type stuwhoofd
    summary: Het type stuwhoofd beschrijft de constructieve hoofdvorm waarmee de stuw water keert of ondersteunt.
    items:
      - title: Waterkerende constructie
        text: Stuw waarbij de waterkerende constructie de hoofdvorm van het stuwhoofd bepaalt.
        image:
          src: /images/objectenhandboek/Stuw/stuw met waterkerende constructie.jpg
          alt: Stuw met waterkerende constructie.
        caption: Stuw met waterkerende constructie.
      - title: Grondlichaam
        text: Stuw waarbij een grondlichaam of gronddam onderdeel is van de constructieve opbouw.
        image:
          src: /images/objectenhandboek/Stuw/stuw met gronddam.jpg
          alt: Stuw met gronddam.
        caption: Stuw met gronddam.
  - title: Type regelmiddel
    summary: Het type regelmiddel beschrijft het onderdeel waarmee de waterstand of doorlaat van de stuw wordt ingesteld.
    items:
      - title: Klepconstructie
        text: Regelmiddel waarbij een klepconstructie de doorlaat of waterstand instelt.
        image:
          src: /images/objectenhandboek/Stuw/stuw met klepconstructie.jpg
          alt: Stuw met klepconstructie.
        caption: Stuw met klepconstructie.
      - title: Schuifconstructie
        text: Regelmiddel waarbij een schuifconstructie de doorlaat of waterstand instelt.
        image:
          src: /images/objectenhandboek/Stuw/stuw met schuifconstructie.jpg
          alt: Stuw met schuifconstructie.
        caption: Stuw met schuifconstructie.
      - title: Schotbalkconstructie
        text: Regelmiddel waarbij schotbalken de waterhoogte stapsgewijs instellen.
        image:
          src: /images/objectenhandboek/Stuw/stuw met schotbalkconstructie.jpg
          alt: Stuw met schotbalkconstructie.
        caption: Stuw met schotbalkconstructie.
      - title: Balgconstructie
        text: Regelmiddel waarbij een balgconstructie de kerende of regelende functie verzorgt.
        image:
          src: /images/objectenhandboek/Stuw/stuw met balgconstructie.jpg
          alt: Stuw met balgconstructie.
        caption: Stuw met balgconstructie.
  - title: Type aandrijving en bewegingswerk
    summary: Het type aandrijving en bewegingswerk beschrijft hoe het regelmiddel fysiek wordt bewogen en bediend. De concrete inrichting hangt samen met de gekozen regelbaarheid.
  - title: Regelbaarheid
    summary: De regelbaarheid beschrijft of en hoe de stuw kan worden ingesteld, van vaste constructie tot automatische bediening.
    items:
      - title: Niet regelbaar
        text: Stuw met een vaste kerende hoogte zonder bedienbaar regelmiddel.
        image:
          src: /images/objectenhandboek/Stuw/stuw niet regelbaar.jpg
          alt: Niet regelbare stuw.
        caption: Niet regelbare stuw.
      - title: Handmatig regelbaar
        text: Stuw die lokaal met handbediening wordt ingesteld.
        image:
          src: /images/objectenhandboek/Stuw/stuw handmatig regelbaar.jpg
          alt: Handmatig regelbare stuw.
        caption: Handmatig regelbare stuw.
      - title: Mechanisch automatisch regelbaar
        text: Stuw waarbij mechanische voorzieningen de regeling automatisch ondersteunen.
        image:
          src: /images/objectenhandboek/Stuw/stuw mechanisch automatisch regelbaar.jpg
          alt: Mechanisch automatisch regelbare stuw.
        caption: Mechanisch automatisch regelbare stuw.
      - title: Elektrisch automatisch regelbaar
        text: Stuw die elektrisch en automatisch kan worden aangestuurd.
        image:
          src: /images/objectenhandboek/Stuw/stuw electrisch-automatisch regelbaar.jpg
          alt: Elektrisch automatisch regelbare stuw.
        caption: Elektrisch automatisch regelbare stuw.
  - title: Afbakening
    summary: De afbakening volgt de constructie die het water keert of doorlaat, inclusief relevante regelbare onderdelen.
  - title: Dwarsprofiel
    summary: De dwarsdoorsnede toont de constructieve opbouw van de stuw in het profiel van de watergang.
    image:
      src: /images/objectenhandboek/Stuw/Dwarsprofiel stuw.png
      alt: Dwarsprofiel van een stuw met decompositie van bouwdelen.
    caption: Afbeelding 1. Dwarsprofiel van een stuw.
  - title: Bovenaanzicht
    summary: Het bovenaanzicht toont de ligging en onderdelen van de stuw vanuit de bovenkant.
    image:
      src: /images/objectenhandboek/Stuw/Bovenaanzicht stuw.png
      alt: Bovenaanzicht van een stuw met decompositie van bouwdelen.
    caption: Afbeelding 2. Bovenaanzicht van een stuw.
  - title: Geometrie
    summary: Een stuw wordt meestal als puntobject vastgelegd op de locatie waar de watergang wordt geregeld.
    items:
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
