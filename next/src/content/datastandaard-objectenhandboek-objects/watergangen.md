---
title: Watergang
slug: /datastandaard/objectenhandboek/watersysteem/watergangen
part: datastandaard
product: objectenhandboek
ownerTeam: datastandaard
status: eerste-template
lastReviewed: 2026-05-14
summary: Op deze pagina vind je de definitie en afbakening van Watergang, de begripsmatige typen watergang, de samenhang met Watergangsectie en Intersectie, de geometrische uitgangspunten en de productrelaties.
heroTitle: Watergang
hierarchy:
  - Watersysteem
  - Stroomgebied
  - Watergang
classification:
  systems:
    - watersysteem
  disciplines:
    - civiele-techniek
    - ecologie-en-groen
    - informatie-en-data
  objectFamilies:
    - watergangen
  publications:
    - objectenhandboek-watersysteem
    - objectenhandboek-civiele-techniek
    - objectenhandboek-ecologie-en-groen
    - objectenhandboek-informatie-en-data
  confidence: afgeleid
definition: Een watergang is een voor de waterbeheersing bestemde geul met een vlakke bodem die meestal permanent water bevat.
definitionSource: "IMBOR Begrippenkader, begrip Watergang."
terms:
  - title: Waterloop
    text: >-
      Aquo-definitie: een langgerekte verlaging in het terrein van natuurlijke of kunstmatige oorsprong die permanent of periodiek stromend water bevat.
    href: https://www.aquo.nl/index.php/Id-4b9c5d33-ac0c-45ec-b137-204f58b8c85b
  - title: Oppervlaktewater
    text: >-
      IMWA-WS-definitie: het water dat zich in vloeibare vorm aan het aardoppervlak bevindt.
    href: https://aquo-standaard.github.io/IMWA-WS/#global_class_Watersysteem_Oppervlaktewater
  - title: Oppervlaktewaterlichaam
    text: >-
      IMWA-WS-definitie: een samenhangend geheel van vrij aan het aardoppervlak voorkomend water, met de daarin aanwezige stoffen, en de bijbehorende bodem en oevers, alsmede flora en fauna.
    href: https://aquo-standaard.github.io/IMWA-WS/#global_class_Watersysteem_Oppervlaktewaterlichaam
  - title: HydroObject
    text: >-
      DAMO-definitie: Samenhangend geheel van vrij aan het aardoppervlak voorkomend water, met de daarin aanwezige stoffen, alsmede de bijbehorende bodem, oevers en, voor zover uitdrukkelijk aangewezen krachtens deze wet, drogere oevergebieden, alsmede flora en fauna. (Definitie volgens de waterwet)
    href: https://damo.hetwaterschapshuis.nl/DAMO%202.4.1/Objectenhandboek%20DAMO%202.4/html/HydroObject.html
contextNote: Watergang is als begrip gekoppeld aan IMBOR. Aquo, IMWA-WS en DAMO-begrippen die hetzelfde watersysteemdomein raken staan onder gerelateerde termen; lokale onderdelen zoals Watergangsectie en Intersectie worden in de uitwerking van de objectpagina behandeld.
definitionTypes:
  - title: Beek
    text: Onderliggend begrip van Watergang in IMBOR.
    href: /datastandaard/woordenboek
  - title: Gracht
    text: Onderliggend begrip van Watergang in IMBOR.
    href: /datastandaard/woordenboek
  - title: Kanaal
    text: Onderliggend begrip van Watergang in IMBOR.
    href: /datastandaard/woordenboek
  - title: Rivier
    text: Onderliggend begrip van Watergang in IMBOR.
    href: /datastandaard/woordenboek
  - title: Sloot
    text: Onderliggend begrip van Watergang in IMBOR.
    href: /datastandaard/woordenboek
metadata:
  - label: Systeem
    value: Watersysteem
  - label: Subsysteem
    value: Stroomgebied
  - label: Objecttype
    value: Watergang
  - label: Bronsysteem
    value: semantische beheeromgeving
  - label: URI
    value: https://data.waterschaplimburg.nl/id/objecttype/watergang
contentSections:
  - title: Overzicht / Samenhang
    summary: De watergang volgt binnen een afvoergebied een traject van aanvoerpunt naar afvoerpunt. De watergang bestaat uit een ruimtelijk gebied dat wordt opgedeeld in watergangsecties en intersecties en bevat verschillende soorten civieltechnische kunstwerken.
    image:
      src: /images/objectenhandboek/watersysteem/watergangen/watergangoverzicht.jpg
      alt: Overzicht van de samenhang binnen Watergang met traject, gebied, secties en intersecties.
    caption: Afbeelding 1. Overzicht van de samenhang binnen Watergang.
    blocks:
      - text: het watergang gebied omvat het gebied van aanvoerpunt tot afvoerpunt en wordt in de langsrichting begrensd door de profielgrenzen zoals gedefinieerd bij de watergangsecties en intersecties.
        image:
          src: /images/objectenhandboek/watersysteem/watergangen/watergang gebied.jpg
          alt: Watergang gebied begrensd van aanvoerpunt tot afvoerpunt en door profielgrenzen.
        caption: Afbeelding 2. Watergang gebied van aanvoerpunt tot afvoerpunt.
  - title: Afbakening
    summary: Het ruimtelijk gebied wordt bovenstrooms ruimtelijk afgebakend door het aanvoerpunt en benedenstrooms door het afvoerpunt. In de richting parallel aan het traject van de watergang wordt het ruimtelijk gebied afgebakend door de begrenzingen zoals aangegeven bij de watergangsecties en intersecties.
  - title: Onderdelen
    summary: De watergang wordt gedecomponeerd in onderling aansluitende watergangsecties en intersecties.
    items:
      - title: Watergangsectie
        text: Afgebakend deelobject binnen de watergang met eigen profiel en onderhoudskenmerken.
        href: /datastandaard/objectenhandboek/watersysteem/watergangsectie
        image:
          src: /images/objectenhandboek/watersysteem/watergangen/watergang sectie.jpg
          alt: Schematische weergave van een watergangsectie binnen een watergang.
        caption: Afbeelding 3. Watergangsectie binnen de watergang.
      - title: Intersectie
        text: Kruising of overgang binnen de watergangstructuur op hetzelfde niveau als een watergangsectie.
        href: /datastandaard/objectenhandboek/watersysteem/intersectie
        image:
          src: /images/objectenhandboek/watersysteem/watergangen/intersectie.jpg
          alt: Schematische weergave van een intersectie binnen een watergang.
        caption: Afbeelding 4. Intersectie binnen de watergangstructuur.
  - title: Geometrie
    summary: De geometrie van de watergang wordt geaggregeerd vanuit de geometrie van de watergangsecties en intersecties en wordt uitgedrukt in een vlak dat de grenzen van de watergang weergeeft en een polyline die de aslijn van de watergang weergeeft.
    image:
      src: /images/objectenhandboek/watersysteem/watergangen/geometrie.png
      alt: Geometrische weergave van de watergang met aslijn, gebiedscontour en dwarsprofiel.
    caption: Afbeelding 5. Geometrie van de watergang.
    items:
      - title: Grootschalig
        text: "Bij grootschalige kaarten, ongeveer schaal 1:1.000 tot 1:10.000, wordt Watergang getoond als lijngeometrie en waar relevant als vlakcontour van het waterlichaam. Op dit detailniveau zijn ook lokale profielkenmerken en directe ruimtelijke begrenzingen van het object leesbaar."
      - title: Midschalig
        text: "Bij midschalige kaarten, ongeveer schaal 1:25.000 tot 1:100.000, wordt Watergang primair getoond als lijngeometrie van een samenhangend traject of deeltraject. De watergang blijft op dit schaalniveau goed bruikbaar om secties, kruisingen en ruimtelijke samenhang te positioneren."
      - title: Kleinschalig
        text: "Bij kleinschalige kaarten, ongeveer schaal 1:500.000 en kleiner, wordt Watergang alleen nog als sterk gegeneraliseerde lijngeometrie getoond. Op dit overzichtsniveau functioneert het object als onderdeel van het bredere waternetwerk binnen stroomgebied en watersysteem."
productRelations:
  - title: Woordenboek
    text: Begrippen en definities voor de waterganglijn.
    href: /datastandaard/woordenboek
  - title: Object Type Library
    text: Dit product definieert de eigenschappen, relaties en het gedrag van een bepaald type object in een gestandaardiseerde vorm.
    href: /datastandaard/otl
  - title: Referentiedataset
    text: Voorbeelddata en toetsbare referentiegegevens.
    href: /datastandaard/referentiedataset
  - title: Werkinstructies
    text: Documenten en werkafspraken voor gebruik en beheer.
    href: /datastandaard/werkinstructies
nextSteps:
  - title: Watersysteem
    text: Terug naar de systeempagina van Watersysteem als kapstok voor deze objectlijn.
    href: /datastandaard/objectenhandboek/watersysteem
    direction: back
  - title: Regenwaterbuffer
    text: Parallelle objectlijn op hetzelfde hiërarchische niveau binnen het watersysteem.
    href: /datastandaard/objectenhandboek/watersysteem/regenwaterbuffer
  - title: Watergangsectie
    text: Onderliggende objectroute voor de opbouw van de watergang.
    href: /datastandaard/objectenhandboek/watersysteem/watergangsectie
  - title: Intersectie
    text: Objectroute voor kruisingen en snijpunten in de watergangstructuur.
    href: /datastandaard/objectenhandboek/watersysteem/intersectie
---

Deze detailpagina is de eerste inhoudelijke objectuitwerking binnen het Objectenhandboek.

Doel:

- definities en metadata van de watergang samenbrengen;
- de opbouw van traject, gebied en secties leesbaar maken;
- en een basis leggen voor vervolgroutes zoals Watergangsectie, Intersectie en parallelle objectlijnen zoals Regenwaterbuffer.
