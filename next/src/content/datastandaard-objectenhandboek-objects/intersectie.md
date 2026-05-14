---
title: Intersectie
slug: /datastandaard/objectenhandboek/watersysteem/intersectie
part: datastandaard
product: objectenhandboek
ownerTeam: datastandaard
status: eerste-template
lastReviewed: 2026-05-14
summary: Op deze pagina vind je de definitie en afbakening van Intersectie, de typen naar compositie, de samenhang met Watergang en Watergangsectie, de geometrische uitgangspunten en de productrelaties.
heroTitle: Intersectie
hierarchy:
  - Watersysteem
  - Stroomgebied
  - Watergang
  - Intersectie
classification:
  systems:
    - watersysteem
  disciplines:
    - civiele-techniek
    - informatie-en-data
  objectFamilies:
    - watergangen
  publications:
    - objectenhandboek-watersysteem
    - objectenhandboek-civiele-techniek
    - objectenhandboek-informatie-en-data
  confidence: afgeleid
definition: Een intersectie is een kruising binnen de watergangstructuur en ligt als object op hetzelfde niveau als een watergangsectie.
definitionSource: "Lokale definitie binnen het Objectenhandboek Waterschap Limburg."
terms:
  - title: Oppervlaktewaterkruising
    text: >-
      IMWA-WS-definitie: een element in een hydrologisch netwerk dat wordt gebruikt om een kruising aan te geven van oppervlaktewater segmenten die geen interactie met elkaar hebben, doordat deze segmenten in het verticale vlak gescheiden zijn.
    href: https://aquo-standaard.github.io/IMWA-WS/#global_class_Watersysteem_OppervlaktewaterKruising
  - title: Oppervlaktewaterknooppunt
    text: >-
      IMWA-WS-definitie: een punt binnen een hydrologisch netwerk.
    href: https://aquo-standaard.github.io/IMWA-WS/#global_class_Watersysteem_OppervlaktewaterKnooppunt
contextNote: Binnen deze templatefamilie blijft Intersectie de objecthandboeknaam. De koppeling met externe standaardbegrippen staat onder gerelateerde termen; synoniemen zijn voor dit lokale objecttype niet uitgewerkt.
compositionTypes:
  - title: Watergang - Watergang
    text: Kruising of aansluiting tussen twee watergangen; gerelateerd aan het IMWA-WS-begrip Oppervlaktewaterknooppunt.
    href: /datastandaard/objectenhandboek/watersysteem/intersectie/watergang-watergang
  - title: Watergang - Weg
    text: Kruising tussen de watergangstructuur en een wegverbinding; gerelateerd aan het IMWA-WS-begrip Oppervlaktewaterkruising.
    href: /datastandaard/objectenhandboek/watersysteem/intersectie/watergang-weg
  - title: Watergang - Waterkering
    text: Kruising tussen watergang en waterkering als specifieke systeemovergang; gerelateerd aan het IMWA-WS-begrip Oppervlaktewaterkruising.
    href: /datastandaard/objectenhandboek/watersysteem/intersectie/watergang-waterkering
metadata:
  - label: Systeem
    value: Watersysteem
  - label: Subsysteem
    value: Stroomgebied
  - label: Objecttype
    value: Intersectie
  - label: Bronsysteem
    value: semantische beheeromgeving
  - label: URI
    value: https://data.waterschaplimburg.nl/id/objecttype/intersectie
contentSections:
  - title: Overzicht / Samenhang
    summary: De intersectie markeert het kruispunt binnen de watergangstructuur en ligt op hetzelfde niveau als een watergangsectie.
  - title: Afbakening
    summary: De afbakening van de intersectie volgt de zone waar waterlijnen, aansluitingen of systeemovergangen elkaar raken of kruisen.
  - title: Geometrie
    summary: De geometrie van de intersectie wordt zichtbaar in bovenaanzicht, doorsnede en ruimtelijke positie ten opzichte van de watergang.
    image:
      src: /images/objectenhandboek/watersysteem/watergangen/geometrie.png
      alt: Geometrische weergave van de intersectie en de ruimtelijke positie ten opzichte van de watergang.
    caption: Afbeelding 1. Geometrie van de intersectie.
    items:
      - title: Grootschalig
        text: "Bij grootschalige kaarten, ongeveer schaal 1:1.000 tot 1:10.000, wordt Intersectie getoond als puntgeometrie op het directe kruispunt of aansluitpunt. Op dit detailniveau zijn ook de lokale aansluiting en de ruimtelijke context van het snijpunt goed leesbaar."
      - title: Midschalig
        text: "Bij midschalige kaarten, ongeveer schaal 1:25.000 tot 1:100.000, wordt Intersectie alleen getoond als gegeneraliseerde puntgeometrie wanneer het kruispunt relevant is voor de netwerkstructuur. Het object markeert dan vooral waar trajecten, secties of overgangen elkaar raken."
      - title: Kleinschalig
        text: "Bij kleinschalige kaarten, ongeveer schaal 1:500.000 en kleiner, wordt Intersectie niet als apart object getoond. Op dit overzichtsniveau is het kruispuntdetail te klein en wordt alleen de gegeneraliseerde hoofdstructuur van het netwerk weergegeven."
productRelations:
  - title: Woordenboek
    text: Begripsdefinitie van Intersectie als startpunt van de objectpagina.
    href: /datastandaard/woordenboek
  - title: Object Type Library
    text: Dit product definieert de eigenschappen, relaties en het gedrag van een bepaald type object in een gestandaardiseerde vorm.
    href: /datastandaard/otl
  - title: Referentiedataset
    text: Voorbeelddata en referentiesets voor kruisingen en aansluitingen.
    href: /datastandaard/referentiedataset
  - title: Werkinstructies
    text: Werkinstructies voor het toepassen en vastleggen van intersectie-informatie.
    href: /datastandaard/werkinstructies
nextSteps:
  - title: Watergangen
    text: Terug naar het hoofdobject binnen deze objectlijn.
    href: /datastandaard/objectenhandboek/watersysteem/watergangen
  - title: Watergangsectie
    text: Door naar het andere objectniveau naast de intersectie.
    href: /datastandaard/objectenhandboek/watersysteem/watergangsectie
---

Deze detailpagina werkt `Intersectie` uit als zelfstandig object naast `Watergangsectie`.

Doel:

- kruisingen als eigen objectniveau beschrijfbaar maken;
- de relatie met omliggende delen van de watergang verduidelijken;
- en de productlijn naar woordenboek, modellering en datasets aansluiten.
