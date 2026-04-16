---
title: Stroomgebied
slug: /datastandaard/objectenhandboek/watersysteem/stroomgebied
part: datastandaard
product: objectenhandboek
ownerTeam: datastandaard
status: eerste-template
lastReviewed: 2026-04-16
summary: Stroomgebied vormt binnen het watersysteem de subsysteemlaag waarin watergangen, regenwaterbuffers en hun onderliggende objecten logisch geordend worden.
heroTitle: Stroomgebied
hierarchy:
  - Watersysteem
  - Stroomgebied
definition: Een stroomgebied is een gebied vanwaar al het over het oppervlak lopende water via een reeks stromen, rivieren en eventueel meren door een riviermond, estuarium of delta in zee stroomt.
definitionSource: "Definitiebron: DAMO Objectenhandboek 2.6, Bijlage Afvoeraanvoergebied methodiek, paragraaf 2.1 Definities."
terms:
  - title: Stroomgebied
    text: Gebied waarvan al het oppervlakkig afstromende water uiteindelijk via eenzelfde hoofdsysteem in zee terechtkomt.
    href: /datastandaard/woordenboek
  - title: Afvoergebied
    text: Gebied begrensd door stroomscheidingen waaruit water via afstroming of bemaling naar een afvoerpunt wordt geleid.
    href: /datastandaard/woordenboek
  - title: Drainage basin
    text: INSPIRE-term voor een gebied met een gemeenschappelijk afvoerpunt voor oppervlakkige afstroming.
    href: /datastandaard/woordenboek
  - title: River basin
    text: INSPIRE-term voor het grootste afwateringsgebied en daarmee verwant aan het begrip stroomgebied.
    href: /datastandaard/woordenboek
  - title: Watersysteem
    text: Bovenliggende systeemlaag waarin meerdere stroomgebieden en afvoerstructuren samenkomen.
    href: /datastandaard/woordenboek
contextNote: In de DAMO-methodiek is stroomgebied het grootste hydrologische gebiedsniveau. Binnen Nederland gaat het daarbij om de landgrensoverschrijdende stroomgebieden van Maas, Schelde, Eems en Rijn, waarbinnen verdere afvoergebieden en objectlijnen worden geordend.
subtypes:
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
  - title: Afbakening
    summary: De afbakening van het stroomgebied volgt de hydrologische grens waarbinnen oppervlakkig afstromend water uiteindelijk via hetzelfde hoofdafvoersysteem wordt afgevoerd.
  - title: Onderdelen
    summary: Binnen dit stroomgebied worden objectfamilies zoals Watergang en Regenwaterbuffer inhoudelijk uitgewerkt.
    items:
      - title: Watergang
        text: Eerste uitgewerkte objectfamilie binnen het stroomgebied.
        href: /datastandaard/objectenhandboek/watersysteem/watergangen
      - title: Regenwaterbuffer
        text: Objectfamilie voor tijdelijke opvang en gereguleerde afvoer van neerslagpieken binnen het stroomgebied.
        href: /datastandaard/objectenhandboek/watersysteem/regenwaterbuffer
      - title: Watergangsectie
        text: Afgebakend deelobject binnen de waterganglijn met profiel- en onderhoudskenmerken.
        href: /datastandaard/objectenhandboek/watersysteem/watergangsectie
      - title: Intersectie
        text: Kruising of overgang binnen de watergangstructuur op hetzelfde taxonomische niveau als Watergangsectie.
        href: /datastandaard/objectenhandboek/watersysteem/intersectie
  - title: Geometrie
    summary: De geometrie van het stroomgebied is gebiedsgericht en sluit aan op de DAMO-methodiek voor afvoer- en aanvoergebieden.
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
---

Deze pagina vormt de eerste landing voor het subsysteem `Stroomgebied` binnen het Objectenhandboek.

Doel:

- de subsysteemlaag binnen `Watersysteem` expliciet zichtbaar maken;
- de relatie leggen tussen subsysteem en objectfamilies;
- en een logisch tussenstation bieden tussen systeemlanding en objectpagina's.
