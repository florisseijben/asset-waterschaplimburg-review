---
title: Intersectie
slug: /datastandaard/objectenhandboek/watersysteem/intersectie
part: datastandaard
product: objectenhandboek
ownerTeam: datastandaard
status: eerste-template
lastReviewed: 2026-04-11
summary: Intersectie is een aparte objectpagina voor kruisingen in een watergang. Het object staat op hetzelfde niveau als Watergangsectie.
heroTitle: Intersectie
hierarchy:
  - Watersysteem
  - Stroomgebied
  - Watergang
  - Intersectie
definition: Een intersectie is een kruising binnen de watergangstructuur en ligt als object op hetzelfde niveau als een watergangsectie.
definitionSource: "Definitiebron: semantische beheeromgeving conceptdefinitie voor Intersectie."
terms:
  - title: Intersectie
    text: Kernbegrip voor kruisingen binnen de watergangstructuur.
    href: /datastandaard/woordenboek
  - title: Kruising
    text: Verwante term voor het snijpunt of de overgang tussen structuren.
    href: /datastandaard/woordenboek
  - title: Kruispunt
    text: Benadrukt de plek waar twee lijnen of trajecten samenkomen.
    href: /datastandaard/woordenboek
  - title: Snijpunt
    text: Ruimtelijke aanduiding van het punt waar structuren elkaar raken of kruisen.
    href: /datastandaard/woordenboek
contextNote: Binnen deze templatefamilie is de intersectie expliciet bedoeld voor kruisingen. Het object ligt op hetzelfde niveau als een watergangsectie, maar beschrijft een ander type onderdeel van de watergang.
subtypes:
  - title: Watergang - Watergang
    text: Kruising of aansluiting tussen twee watergangen.
    href: /in-migratie/objectenhandboek/watersysteem/intersectie/watergang-watergang
  - title: Watergang - Weg
    text: Kruising tussen de watergangstructuur en een wegverbinding.
    href: /in-migratie/objectenhandboek/watersysteem/intersectie/watergang-weg
  - title: Watergang - Waterkering
    text: Kruising tussen watergang en waterkering als specifieke systeemovergang.
    href: /in-migratie/objectenhandboek/watersysteem/intersectie/watergang-waterkering
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
  - title: Onderdelen
    summary: Binnen de huidige hiërarchie zijn voor Intersectie nog geen directe onderliggende objecten uitgewerkt. Aangrenzende onderdelen zoals talud, bodem, berm en werkpad blijven wel inhoudelijk relevant, maar worden niet als directe kinderen van Intersectie getoond.
  - title: Geometrie
    summary: De geometrie van de intersectie wordt zichtbaar in bovenaanzicht, doorsnede en ruimtelijke positie ten opzichte van de watergang.
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
