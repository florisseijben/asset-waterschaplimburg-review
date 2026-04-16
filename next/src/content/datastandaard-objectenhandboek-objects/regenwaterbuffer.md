---
title: Regenwaterbuffer
slug: /datastandaard/objectenhandboek/watersysteem/regenwaterbuffer
part: datastandaard
product: objectenhandboek
ownerTeam: datastandaard
status: eerste-template
lastReviewed: 2026-04-16
summary: Regenwaterbuffer is een eigen objectpagina binnen het watersysteem en ligt in deze lijn op hetzelfde niveau als Watergang.
heroTitle: Regenwaterbuffer
hierarchy:
  - Watersysteem
  - Stroomgebied
  - Regenwaterbuffer
definition: Een regenwaterbuffer is een opvangbassin dat bij hevige regen het teveel aan water tijdelijk opvangt en geleidelijk weer loost.
definitionSource: "Definitiebron: DAMO 2.4.1 Objectenhandboek, object Regenwaterbuffer. Aanvullende bronvermelding in DAMO verwijst naar AQUO voor de begrippen buffer en regenwater."
terms:
  - title: Regenwaterbuffer
    text: Kernbegrip voor een voorziening die tijdelijk regenwater bergt en gereguleerd afvoert.
    href: /datastandaard/woordenboek
  - title: Buffer
    text: AQUO-verwant begrip voor een tussenvoorziening die veranderingen of pieken opvangt.
    href: /datastandaard/woordenboek
  - title: Regenwater
    text: Neerslagwater dat tijdelijk moet worden opgevangen, vastgehouden of vertraagd afgevoerd.
    href: /datastandaard/woordenboek
  - title: Berging
    text: Functioneel begrip voor het tijdelijk opslaan van water in het watersysteem.
    href: /datastandaard/woordenboek
contextNote: Binnen deze objectlijn wordt de regenwaterbuffer gelezen als zelfstandig hoofdobject voor tijdelijke opvang en gereguleerde lozing van neerslagpieken. In DAMO is de relatie naar compartimenten expliciet gemaakt, waardoor decompositie naar onderliggende delen logisch aansluit op de bestaande opzet van het objectenhandboek.
subtypes:
  - title: Type regenwaterbuffer
    text: DAMO-attribuut voor het type of de verschijningsvorm van de regenwaterbuffer.
    href: /datastandaard/woordenboek
metadata:
  - label: Systeem
    value: Watersysteem
  - label: Subsysteem
    value: Stroomgebied
  - label: Objecttype
    value: Regenwaterbuffer
  - label: Bronsysteem
    value: DAMO 2.4.1
  - label: URI
    value: https://data.waterschaplimburg.nl/id/objecttype/regenwaterbuffer
contentSections:
  - title: Overzicht / Samenhang
    summary: De regenwaterbuffer is het hoofdobject voor tijdelijke opvang van neerslagpieken en vormt de drager voor onderliggende compartimenten.
  - title: Afbakening
    summary: De afbakening volgt het bassin of de voorziening die water ontvangt, tijdelijk bergt en vervolgens geleidelijk afvoert.
  - title: Onderdelen
    summary: Een regenwaterbuffer bestaat uit een of meerdere compartimenten die samen de buffering, scheiding en beheersbare opbouw van de voorziening ondersteunen.
    items:
      - title: Regenwaterbuffercompartiment
        text: Deel van een regenwaterbuffer dat als afzonderlijk compartiment in de decompositie wordt onderscheiden.
        href: /datastandaard/objectenhandboek/watersysteem/regenwaterbuffer/regenwaterbuffercompartiment
  - title: Geometrie
    summary: In DAMO wordt de regenwaterbuffer als punt vastgelegd, als representatie van de feitelijke voorziening binnen het watersysteem.
productRelations:
  - title: Woordenboek
    text: Begrippen en definities voor de bufferlijn binnen het watersysteem.
    href: /datastandaard/woordenboek
  - title: Object Type Library
    text: Dit product definieert de eigenschappen, relaties en het gedrag van een bepaald type object in een gestandaardiseerde vorm.
    href: /datastandaard/otl
  - title: Referentiedataset
    text: Voorbeelddata en toetsbare referentiegegevens voor buffers en compartimentering.
    href: /datastandaard/referentiedataset
  - title: Werkinstructies
    text: Documenten en werkafspraken voor het vastleggen en beheren van bufferobjecten.
    href: /datastandaard/werkinstructies
nextSteps:
  - title: Watersysteem
    text: Terug naar de systeempagina van Watersysteem als kapstok voor deze objectlijn.
    href: /datastandaard/objectenhandboek/watersysteem
    direction: back
  - title: Regenwaterbuffercompartiment
    text: Onderliggende objectroute voor de opbouw van de regenwaterbuffer.
    href: /datastandaard/objectenhandboek/watersysteem/regenwaterbuffer/regenwaterbuffercompartiment
  - title: Watergang
    text: Parallelle objectlijn op hetzelfde hiërarchische niveau binnen het watersysteem.
    href: /datastandaard/objectenhandboek/watersysteem/watergangen
---

Deze detailpagina werkt `Regenwaterbuffer` uit als zelfstandig hoofdobject binnen het Objectenhandboek.

Doel:

- de DAMO-definitie en kernmetadata van de regenwaterbuffer samenbrengen;
- de decompositie naar compartimenten leesbaar maken;
- en de productlijn naar woordenboek, modellering en datasets laten aansluiten.
