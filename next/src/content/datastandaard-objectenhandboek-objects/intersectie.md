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
definition: Een intersectie is de lokale objectnaam voor een kruising of knooppunt in de watergangstructuur: een OppervlaktewaterKruising wanneer een watergang een ander netwerk kruist, of een OppervlaktewaterKnooppunt bij een watergang-watergangkruising.
definitionSource: "Aquo/IMWA-WS, objecttypen OppervlaktewaterKruising en OppervlaktewaterKnooppunt. Lokale objectnaam in dit handboek: Intersectie."
synonyms:
  - title: OppervlaktewaterKruising
    text: Bronconcept in Aquo/IMWA-WS voor kruisingen tussen oppervlaktewater en andere netwerken.
    href: /datastandaard/woordenboek
  - title: OppervlaktewaterKnooppunt
    text: Bronconcept in Aquo/IMWA-WS voor knooppunten in het oppervlaktewaternetwerk, zoals watergang-watergangkruisingen.
    href: /datastandaard/woordenboek
  - title: Kruising
    text: Praktijkterm voor de plek waar trajecten of netwerken elkaar kruisen.
    href: /datastandaard/woordenboek
terms:
  - title: Watergang
    text: Bovenliggend object binnen deze objectlijn; intersecties liggen tussen of op aansluitingen van watergangdelen.
    href: /datastandaard/woordenboek
  - title: Watergangsectie
    text: Parallel objectniveau voor het trajectdeel tussen intersecties.
    href: /datastandaard/woordenboek
  - title: OppervlaktewaterSegment
    text: Aquo/IMWA-WS objecttype waarvan begin- en eindpunten aan oppervlaktewaterknooppunten kunnen liggen.
    href: /datastandaard/woordenboek
  - title: Ander netwerk
    text: Verzamelterm voor wegen, waterkeringen of andere netwerken die een watergang kunnen kruisen.
    href: /datastandaard/woordenboek
contextNote: Binnen deze templatefamilie blijft Intersectie de objecthandboeknaam. De begripsmatige uitwerking maakt onderscheid tussen een Aquo/IMWA-WS oppervlaktewaterknooppunt voor watergang-watergangkruisingen en een oppervlaktewaterkruising voor kruisingen met andere netwerken.
compositionTypes:
  - title: Watergang - Watergang
    text: Kruising of aansluiting tussen twee watergangen.
    href: /datastandaard/objectenhandboek/watersysteem/intersectie/watergang-watergang
  - title: Watergang - Weg
    text: Kruising tussen de watergangstructuur en een wegverbinding.
    href: /datastandaard/objectenhandboek/watersysteem/intersectie/watergang-weg
  - title: Watergang - Waterkering
    text: Kruising tussen watergang en waterkering als specifieke systeemovergang.
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
