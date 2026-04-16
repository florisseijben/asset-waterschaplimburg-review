---
title: Regenwaterbuffercompartiment
slug: /datastandaard/objectenhandboek/watersysteem/regenwaterbuffer/regenwaterbuffercompartiment
part: datastandaard
product: objectenhandboek
ownerTeam: datastandaard
status: eerste-template
lastReviewed: 2026-04-16
summary: Regenwaterbuffercompartiment is een onderliggend object van Regenwaterbuffer en vormt in deze lijn het eerste uitgewerkte decompositieniveau.
heroTitle: Regenwaterbuffercompartiment
hierarchy:
  - Watersysteem
  - Stroomgebied
  - Regenwaterbuffer
  - Regenwaterbuffercompartiment
definition: Een regenwaterbuffer compartiment is een deel van een regenwaterbuffer.
definitionSource: "Definitiebron: DAMO 2.4.1 Objectenhandboek, object RegenwaterbufferCompartiment."
terms:
  - title: Regenwaterbuffercompartiment
    text: Kernbegrip voor een onderscheiden deel binnen een regenwaterbuffer.
    href: /datastandaard/woordenboek
  - title: Compartiment
    text: Deelruimte of functioneel afgescheiden onderdeel binnen een groter object.
    href: /datastandaard/woordenboek
  - title: Regenwaterbuffer
    text: Bovenliggend object waarvan een of meerdere compartimenten onderdeel uitmaken.
    href: /datastandaard/objectenhandboek/watersysteem/regenwaterbuffer
contextNote: DAMO beschrijft expliciet dat een regenwaterbuffer uit een of meerdere compartimenten bestaat. Binnen deze objectlijn gebruiken we dat als decompositieprincipe, zodat oppervlak, volume en relaties met scheidende of regelende objecten op compartimentniveau beschreven kunnen worden.
subtypes:
  - title: Volume compartiment
    text: DAMO-attribuut voor de inhoud van een afzonderlijk compartiment.
    href: /datastandaard/woordenboek
  - title: Oppervlakte compartiment
    text: DAMO-attribuut voor de oppervlakte van een afzonderlijk compartiment.
    href: /datastandaard/woordenboek
metadata:
  - label: Systeem
    value: Watersysteem
  - label: Subsysteem
    value: Stroomgebied
  - label: Objecttype
    value: Regenwaterbuffercompartiment
  - label: Bovenliggend object
    value: Regenwaterbuffer
  - label: Bronsysteem
    value: DAMO 2.4.1
  - label: URI
    value: https://data.waterschaplimburg.nl/id/objecttype/regenwaterbuffercompartiment
contentSections:
  - title: Overzicht / Samenhang
    summary: Het compartiment is het directe deelobject binnen de regenwaterbuffer en maakt de interne opdeling van de voorziening expliciet.
  - title: Afbakening
    summary: De afbakening volgt het afzonderlijke deel van de buffer waarvoor oppervlak, volume en functionele relaties apart worden vastgelegd.
  - title: Onderdelen
    summary: DAMO benoemt geen verdere onderliggende decompositie, maar laat wel zien dat compartimenten samenhangen met objecten zoals vaste dam, verdediging, afsluitmiddel en stuw.
    items:
      - title: Vaste dam
        text: Verwant object dat compartimenten ruimtelijk of functioneel kan scheiden.
        href: /in-migratie/objectenhandboek/watersysteem/regenwaterbuffer/regenwaterbuffercompartiment/vaste-dam
      - title: Verdediging
        text: Verwant object rond het compartiment voor bescherming of begrenzing.
        href: /in-migratie/objectenhandboek/watersysteem/regenwaterbuffer/regenwaterbuffercompartiment/verdediging
      - title: Afsluitmiddel
        text: Regelend of afsluitend object dat op compartimentniveau gekoppeld kan zijn.
        href: /in-migratie/objectenhandboek/watersysteem/regenwaterbuffer/regenwaterbuffercompartiment/afsluitmiddel
      - title: Stuw
        text: Verwant regelobject voor peil- of afvoerbeheersing in relatie tot een compartiment.
        href: /in-migratie/objectenhandboek/watersysteem/regenwaterbuffer/regenwaterbuffercompartiment/stuw
  - title: Geometrie
    summary: DAMO beschrijft het compartiment als vlakrepresentatie op basis van de feitelijke contouren van het deelobject.
    items:
      - title: Kleinschalig
        text: Op kleinschalig niveau wordt het compartiment gelezen via de feitelijke contouren, scheidingen en lokale inrichting van het deelobject.
      - title: Midschalig
        text: Op midschalig niveau maakt het compartiment zichtbaar hoe de regenwaterbuffer intern is opgedeeld in functionele delen.
      - title: Grootschalig
        text: Op grootschalig niveau positioneert het compartiment zich als onderdeel van de totale bergings- en sturingsstructuur van de regenwaterbuffer.
productRelations:
  - title: Woordenboek
    text: Begrippen en definities voor compartimentering binnen de bufferlijn.
    href: /datastandaard/woordenboek
  - title: Object Type Library
    text: Dit product definieert de eigenschappen, relaties en het gedrag van een bepaald type object in een gestandaardiseerde vorm.
    href: /datastandaard/otl
  - title: Referentiedataset
    text: Referentiesets en voorbeelddata voor buffers, compartimenten en relaties daartussen.
    href: /datastandaard/referentiedataset
  - title: Werkinstructies
    text: Werkinstructies voor het toepassen en vastleggen van compartimentinformatie.
    href: /datastandaard/werkinstructies
nextSteps:
  - title: Regenwaterbuffer
    text: Terug naar het hoofdobject binnen deze objectlijn.
    href: /datastandaard/objectenhandboek/watersysteem/regenwaterbuffer
  - title: Watersysteem
    text: Terug naar de systeempagina met de bredere objectstructuur.
    href: /datastandaard/objectenhandboek/watersysteem
---

Deze detailpagina werkt `Regenwaterbuffercompartiment` uit als eerste onderliggend object onder `Regenwaterbuffer`.

Doel:

- de DAMO-definitie van het compartiment expliciet opnemen;
- de relatie met de bovenliggende buffer inzichtelijk maken;
- en de lijn leggen naar verdere uitwerking van verwante objecten en productinformatie.
