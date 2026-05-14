---
title: Watergangsectie
slug: /datastandaard/objectenhandboek/watersysteem/watergangsectie
part: datastandaard
product: objectenhandboek
ownerTeam: datastandaard
status: eerste-template
lastReviewed: 2026-05-14
summary: Op deze pagina vind je de definitie en afbakening van Watergangsectie, de typen naar compositie, de samenhang met Watergang en Intersectie, de geometrische uitgangspunten en de productrelaties.
heroTitle: Watergangsectie
hierarchy:
  - Watersysteem
  - Stroomgebied
  - Watergang
  - Watergangsectie
classification:
  systems:
    - watersysteem
  disciplines:
    - civiele-techniek
    - terreinbeheer-openbare-ruimte
    - informatie-en-data
  objectFamilies:
    - watergangen
    - profielonderdelen
  publications:
    - objectenhandboek-watersysteem
    - objectenhandboek-civiele-techniek
    - objectenhandboek-terreinbeheer-openbare-ruimte
    - objectenhandboek-informatie-en-data
  confidence: afgeleid
definition: "Een watergangsectie is de lokale objecthandboektoepassing van een OppervlaktewaterSegment: een afgebakend deeltraject van een watergang waarmee ligging, profiel, kenmerken en onderhoud als samenhangend segment worden beschreven."
definitionSource: "Aquo/IMWA-WS, objecttype OppervlaktewaterSegment. Lokale objectnaam in dit handboek: Watergangsectie."
synonyms:
  - title: OppervlaktewaterSegment
    text: Bronconcept in Aquo/IMWA-WS voor de hydrologische segmentering van oppervlaktewater.
    href: /datastandaard/woordenboek
  - title: Deeltraject
    text: Praktijkterm voor een ruimtelijk afgebakend segment binnen een watergang.
    href: /datastandaard/woordenboek
terms:
  - title: Watergang
    text: Bovenliggend object binnen deze objectlijn; een watergang is opgebouwd uit secties en intersecties.
    href: /datastandaard/woordenboek
  - title: Oppervlaktewaterlichaam
    text: Aquo/IMWA-WS objecttype dat door oppervlaktewatersegmenten wordt geschematiseerd.
    href: /datastandaard/woordenboek
  - title: OppervlaktewaterKnooppunt
    text: Aquo/IMWA-WS objecttype voor begin- en eindpunten van segmenten binnen het hydrologisch netwerk.
    href: /datastandaard/woordenboek
  - title: Profieldeel
    text: Uitsnede van de fysieke opbouw van de watergang.
    href: /datastandaard/woordenboek
  - title: Intersectie
    text: Parallel objectniveau naast Watergangsectie voor kruisingen en knooppunten in de watergangstructuur.
    href: /datastandaard/woordenboek
contextNote: De watergangsectie maakt het mogelijk om een watergang in opeenvolgende delen te beschrijven. De begripsmatige koppeling ligt bij Aquo/IMWA-WS OppervlaktewaterSegment; de lokale uitwerking voegt profiel, onderhoud en compositietypen toe voor het objectenhandboek.
compositionTypes:
  - title: Watergang met standaardprofiel
    text: Sectie waarin bodem, taluds, profielgrenzen en standaardvoorzieningen zoals onderhoudspad of beschoeiing in samenhang worden beschreven.
    href: /datastandaard/objectenhandboek/watersysteem/watergangsectie/met-standaardprofiel
    image:
      src: /images/objectenhandboek/watersysteem/watergangsectie_watergang met taluds/watergang met taluds profiellijnen.png
      alt: Doorsnede van Watergang met standaardprofiel met profiellijnen.
    caption: Doorsnede. Watergang met standaardprofiel.
  - title: Watergang met wandconstructie
    text: Sectie met een verticale of semi-verticale wandoplossing.
    href: /datastandaard/objectenhandboek/watersysteem/watergangsectie/met-wandconstructie
    image:
      src: /images/objectenhandboek/watersysteem/watergangsectie_watergang met wandconstructie/Watergang met wandconstructie profiellijn.png
      alt: Doorsnede van Watergang met wandconstructie met profiellijn.
    caption: Doorsnede. Watergang met wandconstructie.
  - title: Watergang met accoladeprofiel
    text: Sectie met een profielvorm die accent legt op doorstroom en onderhoud.
    href: /datastandaard/objectenhandboek/watersysteem/watergangsectie/met-accoladeprofiel
    image:
      src: /images/objectenhandboek/watersysteem/watergangsectie_watergang met accoladeprofiel/Watergang met accoladeprofiel profiellijn.png
      alt: Doorsnede van Watergang met accoladeprofiel met profiellijn.
    caption: Doorsnede. Watergang met accoladeprofiel.
  - title: Vrij meanderende watergang
    text: Sectie met een natuurlijker verloop en minder strak profiel.
    href: /datastandaard/objectenhandboek/watersysteem/watergangsectie/vrij-meanderend
    image:
      src: /images/objectenhandboek/watersysteem/watergangsectie_vrij meanderende watergang/Vrij meanderende watergang.png
      alt: Doorsnede van Vrij meanderende watergang.
    caption: Doorsnede. Vrij meanderende watergang.
  - title: Watergang met dijk
    text: Sectie waarin een dijk of waterkerend profiel onderdeel is van de opbouw langs de watergang.
    href: /datastandaard/objectenhandboek/watersysteem/watergangsectie/met-dijk
    image:
      src: /images/objectenhandboek/watersysteem/watergangsectie_watergang met dijk/Watergang met dijk profiellijn.png
      alt: Doorsnede van Watergang met dijk met profiellijn.
    caption: Doorsnede. Watergang met dijk.
  - title: Lijnvormig element
    text: Sectie waarin een lijnvormig element de ligging, begrenzing of profielopbouw van de watergang mede bepaalt.
    href: /datastandaard/objectenhandboek/watersysteem/watergangsectie/lijnvormig-element
    image:
      src: /images/objectenhandboek/watersysteem/watergangsectie_lijnvormig element/Lijnvormig element profiellijn.png
      alt: Doorsnede van Lijnvormig element met profiellijn.
    caption: Doorsnede. Lijnvormig element.
  - title: Weg - watergang
    text: Sectie waarin een wegprofiel en watergangprofiel in samenhang worden beschreven.
    href: /datastandaard/objectenhandboek/watersysteem/watergangsectie/weg-watergang
    image:
      src: /images/objectenhandboek/watersysteem/watergangsectie_weg-watergang/Weg-watergang profiellijn.png
      alt: Doorsnede van Weg - watergang met profiellijn.
    caption: Doorsnede. Weg - watergang.
  - title: Bronloop
    text: Sectie aan het begin van een watergang waar de watergang als bron- of bovenloop functioneert.
    href: /datastandaard/objectenhandboek/watersysteem/watergangsectie/bronloop
    image:
      src: /images/objectenhandboek/watersysteem/watergangsectie_bronloop/Bronloop profiellijn.png
      alt: Doorsnede van Bronloop met profiellijn.
    caption: Doorsnede. Bronloop.
  - title: Holle weg
    text: Sectie waarin een verdiept wegprofiel samenhangt met afvoer of ligging van de watergang.
    href: /datastandaard/objectenhandboek/watersysteem/watergangsectie/holle-weg
    image:
      src: /images/objectenhandboek/watersysteem/watergangsectie_holle weg/Holleweg profiellijn.png
      alt: Doorsnede van Holle weg met profiellijn.
    caption: Doorsnede. Holle weg.
metadata:
  - label: Systeem
    value: Watersysteem
  - label: Subsysteem
    value: Stroomgebied
  - label: Objecttype
    value: Watergangsectie
  - label: Bronsysteem
    value: semantische beheeromgeving
  - label: URI
    value: https://data.waterschaplimburg.nl/id/objecttype/watergangsectie
contentSections:
  - title: Overzicht / Samenhang
    summary: De watergangsectie is het afgebakende deelobject binnen de watergang en vormt samen met intersecties de opbouw van het hoofdobject.
    image:
      src: /images/objectenhandboek/watersysteem/watergangen/watergang sectie.jpg
      alt: Schematische weergave van een watergangsectie binnen een watergang.
    caption: Afbeelding 1. Watergangsectie binnen de watergang.
  - title: Afbakening
    summary: De afbakening van de watergangsectie volgt een deeltraject binnen de watergang met eigen kenmerken, onderhoud en profiel.
  - title: Geometrie
    summary: De geometrie van de watergangsectie komt terug in bovenaanzicht, dwarsprofiel en ruimtelijke begrenzing langs de as van de watergang.
    image:
      src: /images/objectenhandboek/watersysteem/watergangen/geometrie.png
      alt: Geometrische weergave van de watergangsectie met ligging en ruimtelijke begrenzing.
    caption: Afbeelding 2. Geometrie van de watergangsectie.
    items:
      - title: Grootschalig
        text: "Bij grootschalige kaarten, ongeveer schaal 1:1.000 tot 1:10.000, wordt Watergangsectie getoond als lijngeometrie van een afgebakend deeltraject en in detail gekoppeld aan doorsneden, taluds, bodem en andere profielonderdelen."
      - title: Midschalig
        text: "Bij midschalige kaarten, ongeveer schaal 1:25.000 tot 1:100.000, wordt Watergangsectie nog steeds als lijngeometrie getoond, maar dan als gegeneraliseerd deeltraject binnen de watergang. De sectie blijft op dit schaalniveau bruikbaar voor kenmerken, onderhoud en ligging binnen het traject."
      - title: Kleinschalig
        text: "Bij kleinschalige kaarten, ongeveer schaal 1:500.000 en kleiner, wordt Watergangsectie niet als apart object getoond. Op dit schaalniveau is het detailverschil tussen afzonderlijke secties te klein en wordt alleen de meer algemene watergangstructuur weergegeven."
productRelations:
  - title: Woordenboek
    text: Begrippen en definities voor Watergangsectie.
    href: /datastandaard/woordenboek
  - title: Object Type Library
    text: Dit product definieert de eigenschappen, relaties en het gedrag van een bepaald type object in een gestandaardiseerde vorm.
    href: /datastandaard/otl
  - title: Referentiedataset
    text: Referentiesets en voorbeelddata binnen de objectfamilie Watergangen.
    href: /datastandaard/referentiedataset
  - title: Werkinstructies
    text: Werkinstructies voor het toepassen en vastleggen van objectinformatie.
    href: /datastandaard/werkinstructies
nextSteps:
  - title: Watergang met standaardprofiel
    text: Door naar het standaardprofiel waarin taluds, onderhoudspad en beschoeiing in samenhang zijn uitgewerkt.
    href: /datastandaard/objectenhandboek/watersysteem/watergangsectie/met-standaardprofiel
  - title: Watergangen
    text: Terug naar het hoofdobject binnen deze objectlijn.
    href: /datastandaard/objectenhandboek/watersysteem/watergangen
  - title: Intersectie
    text: Door naar de kruisingen en snijpunten binnen de watergangstructuur.
    href: /datastandaard/objectenhandboek/watersysteem/intersectie
---

Deze detailpagina is de eerste inhoudelijke uitwerking van een onderliggend object onder `Watergang`.

Doel:

- de watergang opdelen in beschrijfbare secties;
- de stap naar onderliggende objecten zoals talud en bodem voorbereiden;
- en de lijn leggen naar modellering, referentiedata en werkinstructies.
