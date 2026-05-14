---
title: Stroomgebied
slug: /datastandaard/objectenhandboek/watersysteem/stroomgebied
part: datastandaard
product: objectenhandboek
ownerTeam: datastandaard
status: eerste-template
lastReviewed: 2026-05-14
summary: Op deze pagina vind je de definitie en afbakening van Stroomgebied, de begripsmatige gebiedstypen, de samenhang met Watergang, Regenwaterbuffer en Kunstwerk, de geometrische uitgangspunten en de productrelaties.
heroTitle: Stroomgebied
hierarchy:
  - Watersysteem
  - Stroomgebied
classification:
  systems:
    - watersysteem
  disciplines:
    - civiele-techniek
    - ecologie-en-groen
    - informatie-en-data
  objectFamilies:
    - stroomgebieden
  publications:
    - objectenhandboek-watersysteem
    - objectenhandboek-civiele-techniek
    - objectenhandboek-ecologie-en-groen
    - objectenhandboek-informatie-en-data
  confidence: afgeleid
definition: een afwateringsgebied waarbinnen water afstroomt naar oppervlaktewater en uiteindelijk via één riviermond, estuarium of delta, in zee stroomt
definitionSource: "IMWA-WS, objecttype Stroomgebied."
terms:
  - title: Afwateringseenheid
    text: >-
      IMWA-WS-definitie: een afwateringsgebied dat geschematiseerd is als (kleinste) eenheid in een hydrologisch model.
    href: https://aquo-standaard.github.io/IMWA-WS/#global_class_Watersysteem_Afwateringseenheid
  - title: Afwateringsgebied
    text: >-
      IMWA-WS-definitie: een gebied waarbinnen het water wordt afgevoerd naar het oppervlaktewater en dat wordt begrensd door een waterscheiding.
    href: https://aquo-standaard.github.io/IMWA-WS/#global_class_Watersysteem_Afwateringsgebied
  - title: AfvoerAanvoergebied
    text: >-
      DAMO-definitie: Een gebied begrensd door (stroom)scheidingen, waaruit beschouwd vanuit het afvoerpunt het water van dat gebied afstroomt of via bemaling getransporteerd wordt naar het desbetreffende afvoerpunt.
    href: https://damo.hetwaterschapshuis.nl/DAMO%202.4.1/Objectenhandboek%20DAMO%202.4/html/AfvoerAanvoergebied.html
  - title: AfvoergebiedAanvoergebied
    text: >-
      DAMO-definitie: Een gebied begrensd door (stroom)scheidingen, waaruit beschouwd vanuit het afvoerpunt het water van dat gebied afstroomt of via bemaling getransporteerd wordt naar het desbetreffende afvoerpunt. Het afvoerpunt is vaak een zee of meer en de afvoer wordt vaak gerealiseerd door een waterloop. Dit kan een afvoergebied zijn (verzameling van peilgebieden) die via een gemeenschappelijk punt hun water lozen/ontvangen op een hoofdsysteem. Dit kan ook een KRW deelstroomgebied zijn.
    href: https://damo.hetwaterschapshuis.nl/DAMO%202.4.1/Objectenhandboek%20DAMO%202.4/html/AfvoergebiedAanvoergebied.html
contextNote: Stroomgebied is als begrip direct gekoppeld aan IMWA-WS. De aanliggende gebiedsbegrippen uit IMWA-WS en DAMO staan onder gerelateerde termen, zodat de objectpagina zelf niet meerdere brondefinities door elkaar gebruikt.
definitionTypes:
  - title: 1e gebiedsorde
    text: Afvoergebied dat ontstaat door alle afvoergebieden van de 2e gebiedsorde die op hetzelfde RWS-hoofdwater lozen samen te voegen, bijvoorbeeld richting de Maas.
    href: /datastandaard/woordenboek
  - title: 2e gebiedsorde
    text: Afvoergebied dat in een normale afvoersituatie via een afvoerpunt direct op een RWS-hoofdwater loost, bijvoorbeeld via een waterloop die uitkomt in de Maas.
    href: /datastandaard/woordenboek
metadata:
  - label: Systeem
    value: Watersysteem
  - label: Subsysteem
    value: Stroomgebied
  - label: Informatielaag
    value: Subsysteemlanding
  - label: Bronsysteem
    value: semantische beheeromgeving
  - label: URI
    value: https://data.waterschaplimburg.nl/id/objecttype/stroomgebied
contentSections:
  - title: Overzicht / Samenhang
    summary: Het stroomgebied verbindt het watersysteem met de onderliggende objectfamilies en ordent de hydrologische samenhang van afvoer- en aanvoergebieden.
    items:
      - title: Overzicht
        text: Visualisatie van Nederland ingedeeld in de vier landgrensoverschrijdende stroomgebieden Maas, Schelde, Eems en Rijn.
        image:
          src: "https://damo.hetwaterschapshuis.nl/DAMO%202.6/Objectenhandboek%20DAMO%202.6/html/lib/NewItem33.png"
          alt: "Kaart van Nederland ingedeeld in stroomgebieden."
        caption: "Afbeelding 2.1 Nederland ingedeeld in stroomgebieden (Rijkswaterstaat: Nationaal Waterplan 2016-2021)"
        href: "https://damo.hetwaterschapshuis.nl/DAMO%202.6/Objectenhandboek%20DAMO%202.6/html/BijlageAfvoeraanvoergebiedmethod.html#_Toc82702205"
      - title: Samenhang
        text: Schematische weergave van afvoergebieden van de 2e gebiedsorde in een vrij verval situatie, als eerste verdere detaillering binnen een stroomgebied.
        image:
          src: "https://damo.hetwaterschapshuis.nl/DAMO%202.6/Objectenhandboek%20DAMO%202.6/html/lib/NewItem32.png"
          alt: "Schematische weergave van afvoergebieden van de 2e gebiedsorde."
        caption: "Afbeelding 3.1 Afvoergebieden van de 2e gebiedsorde"
        href: "https://damo.hetwaterschapshuis.nl/DAMO%202.6/Objectenhandboek%20DAMO%202.6/html/BijlageAfvoeraanvoergebiedmethod.html#_Toc82702214"
  - title: Afbakening
    summary: De afbakening van het stroomgebied volgt de hydrologische grens waarbinnen oppervlakkig afstromend water uiteindelijk via hetzelfde hoofdafvoersysteem wordt afgevoerd.
  - title: Onderdelen
    summary: Binnen dit stroomgebied worden op het eerstvolgende hiërarchische niveau de objectfamilies Watergang, Regenwaterbuffer en Kunstwerk inhoudelijk uitgewerkt.
    items:
      - title: Watergang
        text: Eerste uitgewerkte objectfamilie binnen het stroomgebied.
        href: /datastandaard/objectenhandboek/watersysteem/watergangen
      - title: Regenwaterbuffer
        text: Objectfamilie voor tijdelijke opvang en gereguleerde afvoer van neerslagpieken binnen het stroomgebied.
        href: /datastandaard/objectenhandboek/watersysteem/regenwaterbuffer
      - title: Kunstwerk
        text: Objectfamilie voor kunstwerken binnen de waterstructuur van het stroomgebied, met verdere opbouw naar elementen en bouwdelen.
        href: /datastandaard/objectenhandboek/watersysteem/kunstwerken
  - title: Geometrie
    summary: De geometrie van het stroomgebied is gebiedsgericht en sluit aan op de DAMO-methodiek voor afvoer- en aanvoergebieden.
    items:
      - title: Grootschalig
        text: "Bij grootschalige kaarten, ongeveer schaal 1:1.000 tot 1:10.000, wordt Stroomgebied niet als apart object getoond. Op dit detailniveau ligt de nadruk op lokale objecten en deelstructuren; er wordt daarom geen afzonderlijke geometrie voor Stroomgebied weergegeven."
      - title: Midschalig
        text: "Bij midschalige kaarten, ongeveer schaal 1:25.000 tot 1:100.000, wordt Stroomgebied getoond als vlakgeometrie. In dit schaalbereik is het object bruikbaar om de samenhang tussen afvoergebieden, objectfamilies en hydrologische deelstructuren zichtbaar te maken."
      - title: Kleinschalig
        text: "Bij kleinschalige kaarten, ongeveer schaal 1:500.000 en kleiner, wordt Stroomgebied getoond als sterk gegeneraliseerde vlakgeometrie. Op dit overzichtsniveau maakt het object de grote hydrologische indeling van Nederland en de regionale context van het watersysteem zichtbaar."
        href: https://damo.hetwaterschapshuis.nl/DAMO%202.6/Objectenhandboek%20DAMO%202.6/html/BijlageAfvoeraanvoergebiedmethod.html
productRelations:
  - title: Woordenboek
    text: Begrippen en definities voor systeem- en subsysteemlagen.
    href: /datastandaard/woordenboek
  - title: Objectenhandboek
    text: Uitwerking van objectfamilies binnen het stroomgebied.
    href: /datastandaard/objectenhandboek/watersysteem
  - title: Object Type Library
    text: Dit product definieert de eigenschappen, relaties en het gedrag van een bepaald type object in een gestandaardiseerde vorm.
    href: /datastandaard/otl
nextSteps:
  - title: Watersysteem
    text: Terug naar de systeempagina van Watersysteem.
    href: /datastandaard/objectenhandboek/watersysteem
    direction: back
  - title: Watergangen
    text: Eerste uitgewerkte objectfamilie binnen dit subsysteem.
    href: /datastandaard/objectenhandboek/watersysteem/watergangen
  - title: Regenwaterbuffer
    text: Objectfamilie voor regenwaterberging met onderliggende compartimenten.
    href: /datastandaard/objectenhandboek/watersysteem/regenwaterbuffer
  - title: Kunstwerk
    text: Objectfamilie die de werking van watergangen, secties en intersecties ondersteunt en intern is opgebouwd uit elementen en bouwdelen.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken
---

Deze pagina vormt de eerste landing voor het subsysteem `Stroomgebied` binnen het Objectenhandboek.

Doel:

- de subsysteemlaag binnen `Watersysteem` expliciet zichtbaar maken;
- de relatie leggen tussen subsysteem en objectfamilies;
- en een logisch tussenstation bieden tussen systeemlanding en objectpagina's.
