---
title: Kunstwerk
slug: /datastandaard/objectenhandboek/watersysteem/kunstwerken
part: datastandaard
product: objectenhandboek
ownerTeam: datastandaard
status: eerste-template
lastReviewed: 2026-04-23
summary: Op deze pagina vind je de definitie en afbakening van Kunstwerk, de positie onder Stroomgebied, de ondersteunende relatie met Watergang en Regenwaterbuffer, de relatie met Watergangsectie en Intersectie, de kunstwerktypen en de geometrische uitgangspunten.
heroTitle: Kunstwerk
hierarchy:
  - Watersysteem
  - Stroomgebied
  - Kunstwerk
classification:
  systems:
    - watersysteem
  disciplines:
    - civiele-techniek
    - werktuigbouwkunde
    - electrotechniek
    - procesautomatisering
    - informatie-en-data
  objectFamilies:
    - kunstwerken
  publications:
    - objectenhandboek-watersysteem
    - objectenhandboek-civiele-techniek
    - objectenhandboek-werktuigbouwkunde
    - objectenhandboek-electrotechniek
    - objectenhandboek-procesautomatisering
    - objectenhandboek-informatie-en-data
  confidence: afgeleid
definition: Een kunstwerk is een beheerobject in het watersysteem dat water stuurt, tegenhoudt, verdeelt of verplaatst, zoals een stuw of een gemaal.
definitionSource: "Werkdefinitie voor deze reviewlijn, gebaseerd op het gebruik van kunstwerken binnen de watersysteemstructuur van het waterschap."
terms:
  - title: Kunstwerk
    text: Verzamelbegrip voor beheerobjecten die de werking van het watersysteem ondersteunen of sturen.
    href: /datastandaard/woordenboek
  - title: Stuw
    text: Beheerobject dat het waterpeil regelt door water tegen te houden of door te laten.
    href: /datastandaard/woordenboek
  - title: Gemaal
    text: Beheerobject dat water actief verplaatst met pompen.
    href: /datastandaard/woordenboek
  - title: Watergangsectie
    text: Deel van de watergang waarop een kunstwerk lokaal invloed kan hebben.
    href: /datastandaard/woordenboek
  - title: Intersectie
    text: Kruising of overgang in de waterstructuur waar een kunstwerk onderdeel van kan zijn.
    href: /datastandaard/woordenboek
contextNote: Binnen deze objectfamilie brengen we kunstwerken samen die de watergangstructuur en regenwaterbuffers ondersteunen. Regulerende kunstwerken, zoals stuwen en bodemvallen, raken aan of vullen watergangsecties in. Kruisende kunstwerken, zoals bruggen, aquaducten, duikers en voorden, geven vooral invulling aan intersecties.
subtypes:
  - title: Aquaduct
    text: Kruisend kunstwerktype waarbij een watergang over een andere infrastructuur of watergang heen wordt geleid.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/aquaduct
  - title: Bodemval
    text: Regulerend kunstwerktype dat hoogteverschil in de bodem opvangt en stroomsnelheid of erosie helpt beheersen.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/bodemval
  - title: Brug
    text: Kruisend kunstwerktype dat een netwerk over een watergang of ander nat profiel voert.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/brug
  - title: Coupure
    text: Kruisend of afsluitbaar kunstwerktype op een overgang tussen waterstructuur en waterkering.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/coupure
  - title: Dam
    text: Regulerend kunstwerktype dat water tegenhoudt, scheidt of het peil in een watergang beinvloedt.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/dam
  - title: Duiker
    text: Kruisend kunstwerktype dat water onder een weg, dam of ander obstakel door leidt.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/duiker
  - title: Gemaal
    text: Regulerend kunstwerktype dat peil of debiet actief beinvloedt door water met pompen te verplaatsen.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/gemaal
  - title: Hevel
    text: Kunstwerk dat water via een leiding of constructie over een hoger gelegen punt voert.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/hevel
  - title: Sifon
    text: Kruisend kunstwerktype dat water onder een obstakel of kruising door leidt in een gesloten constructie.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/sifon
  - title: Stuw
    text: Regulerend kunstwerktype dat het waterpeil regelt door water tegen te houden of gecontroleerd door te laten.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/stuw
  - title: Voorde
    text: Kruisend kunstwerktype waar verkeer of vee een watergang via een ondiepe oversteekplaats kan passeren.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/voorde
  - title: Vuilvang
    text: Kunstwerk dat drijfvuil en grof materiaal opvangt voordat het andere objecten bereikt.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/vuilvang
  - title: Vispassage
    text: Kunstwerk dat vismigratie mogelijk maakt langs of door een waterregulerend object.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/vispassage
  - title: Overkluizing
    text: Overdekte constructie waarbij een watergang geheel of gedeeltelijk wordt afgedekt.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/overkluizing
metadata:
  - label: Systeem
    value: Watersysteem
  - label: Subsysteem
    value: Stroomgebied
  - label: Objecttype
    value: Kunstwerk
  - label: Bronsysteem
    value: semantische beheeromgeving
  - label: URI
    value: https://data.waterschaplimburg.nl/id/objecttype/kunstwerk
contentSections:
  - title: Overzicht / Samenhang
    summary: Stroomgebied is bovenliggend aan Watergang, Regenwaterbuffer en Kunstwerk. Kunstwerken liggen niet los in het landschap, maar ondersteunen de watergangstructuur en de werking van regenwaterbuffers.
  - title: Afbakening
    summary: De afbakening volgt het fysieke beheerobject dat op een vaste plek in het watersysteem water regelt, keert, doorlaat of verplaatst.
  - title: Onderdelen
    summary: Naast de kunstwerktypen kent Kunstwerk een interne opbouw naar Element en Bouwdeel. Deze onderdelen worden later verder uitgewerkt.
    items:
      - title: Element
        text: Eerste interne decompositiestap binnen Kunstwerk.
        href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/element
      - title: Bouwdeel
        text: Verdere uitwerking van onderdelen binnen een element.
        href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/bouwdeel
  - title: Geometrie
    summary: Kunstwerken worden in deze lijn meestal vastgelegd als puntobjecten, gekoppeld aan hun positie in de waterstructuur.
    items:
      - title: Grootschalig
        text: Bij grootschalige kaarten wordt het kunstwerk getoond als puntobject op de exacte locatie in de watergang of bij de kruising waar het beheerobject ligt.
      - title: Midschalig
        text: Bij midschalige kaarten blijft het kunstwerk als punt zichtbaar, vooral om de functionele rol in het netwerk van watergangen te duiden.
      - title: Kleinschalig
        text: Bij kleinschalige kaarten worden alleen de belangrijkste kunstwerken nog getoond, als onderdeel van de bredere systeemstructuur.
productRelations:
  - title: Woordenboek
    text: Begrippen en definities voor kunstwerken en beheerobjecten binnen het watersysteem.
    href: /datastandaard/woordenboek
  - title: Object Type Library
    text: Modellering van eigenschappen, relaties en gedrag van kunstwerken.
    href: /datastandaard/otl
  - title: Referentiedataset
    text: Voorbeelddata en toetsbare referentiegegevens voor kunstwerken.
    href: /datastandaard/referentiedataset
  - title: Werkinstructies
    text: Werkafspraken voor het vastleggen en beheren van kunstwerken.
    href: /datastandaard/werkinstructies
nextSteps:
  - title: Stroomgebied
    text: Terug naar de subsysteempagina van Stroomgebied.
    href: /datastandaard/objectenhandboek/watersysteem/stroomgebied
    direction: back
  - title: Element
    text: Eerste interne decompositiestap binnen Kunstwerk.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/element
  - title: Bouwdeel
    text: Verdere uitwerking van onderdelen binnen een element.
    href: /datastandaard/objectenhandboek/watersysteem/kunstwerken/bouwdeel
  - title: Watergangsectie
    text: Parallelle objectroute voor de lokale opbouw van de watergang.
    href: /datastandaard/objectenhandboek/watersysteem/watergangsectie
  - title: Intersectie
    text: Parallelle objectroute voor kruisingen en aansluitingen in de waterstructuur.
    href: /datastandaard/objectenhandboek/watersysteem/intersectie
---

Deze detailpagina werkt `Kunstwerk` uit als objectfamilie binnen het Objectenhandboek.

Doel:

- beheerobjecten binnen het watersysteem zichtbaar maken;
- de relatie leggen met watergangsecties en intersecties;
- en een basis leggen voor verdere uitwerking van elementen en bouwdelen.
