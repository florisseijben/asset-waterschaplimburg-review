---
title: Watergangsectie
slug: /datastandaard/objectenhandboek/watersysteem/watergangsectie
part: datastandaard
product: objectenhandboek
ownerTeam: datastandaard
status: eerste-template
lastReviewed: 2026-04-11
summary: Watergangsectie is een eigen objectpagina onder Watergang en vormt de drager voor de lokale opbouw van taluds, bodem en constructieve onderdelen.
heroTitle: Watergangsectie
hierarchy:
  - Watersysteem
  - Stroomgebied
  - Watergang
  - Watergangsectie
definition: Een watergangsectie is een afgebakend deel van een watergang waarmee kenmerken, onderhoud en opbouw specifieker beschreven kunnen worden.
definitionSource: "Definitiebron: semantische beheeromgeving conceptdefinitie voor Watergangsectie."
terms:
  - title: Watergangsectie
    text: Kernbegrip voor het afgebakende deel van een watergang.
    href: /datastandaard/woordenboek
  - title: Hydro-object
    text: Verwante term voor objecten in het watersysteem.
    href: /datastandaard/woordenboek
  - title: Sectie
    text: Deel van een groter traject of object.
    href: /datastandaard/woordenboek
  - title: Profieldeel
    text: Uitsnede van de fysieke opbouw van de watergang.
    href: /datastandaard/woordenboek
  - title: Deeltraject
    text: Ruimtelijk afgebakend segment binnen een watergang.
    href: /datastandaard/woordenboek
contextNote: De watergangsectie maakt het mogelijk om een watergang in opeenvolgende delen te beschrijven en vormt de directe ingang naar de compositie van onderliggende objecten. Binnen de kernregistratie wordt de watergangsectie geografisch vastgelegd door middel van de as van de watergang.
subtypes:
  - title: Watergang met taluds
    text: Sectie waarin taluds de primaire begrenzing vormen.
    href: /in-migratie/objectenhandboek/watersysteem/watergangsectie/met-taluds
  - title: Watergang met onderhoudspad
    text: Sectie met een expliciet onderhoudspad als onderdeel van de opbouw.
    href: /in-migratie/objectenhandboek/watersysteem/watergangsectie/met-onderhoudspad
  - title: Watergang met beschoeiing
    text: Sectie waarin een beschoeiing onderdeel is van de constructieve opbouw.
    href: /in-migratie/objectenhandboek/watersysteem/watergangsectie/met-beschoeiing
  - title: Watergang met wandconstructie
    text: Sectie met een verticale of semi-verticale wandoplossing.
    href: /in-migratie/objectenhandboek/watersysteem/watergangsectie/met-wandconstructie
  - title: Watergang met accoladeprofiel
    text: Sectie met een profielvorm die accent legt op doorstroom en onderhoud.
    href: /in-migratie/objectenhandboek/watersysteem/watergangsectie/met-accoladeprofiel
  - title: Vrij meanderende watergang
    text: Sectie met een natuurlijker verloop en minder strak profiel.
    href: /in-migratie/objectenhandboek/watersysteem/watergangsectie/vrij-meanderend
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
  - title: Afbakening
    summary: De afbakening van de watergangsectie volgt een deeltraject binnen de watergang met eigen kenmerken, onderhoud en profiel.
  - title: Onderdelen
    summary: Binnen de watergangsectie worden onderdelen zoals talud, bodem, onderhoudspad en constructieve opbouw onderscheiden, waarbij Talud als eerste vervolgstap is uitgewerkt.
    items:
      - title: Talud
        text: Schuin grensvlak binnen het profiel van de watergangsectie en eerste uitgewerkte onderliggende component.
        href: /datastandaard/objectenhandboek/watersysteem/watergangsectie/talud
      - title: Bodem
        text: Onderdeel dat de onderzijde van het profiel en de afvoer- en bergingsruimte van de watergangsectie vormt.
        href: /in-migratie/objectenhandboek/watersysteem/watergangsectie/bodem
      - title: Berm
        text: Tussenliggend profielonderdeel dat kan bijdragen aan stabiliteit, onderhoud en overgang binnen de watergangsectie.
        href: /in-migratie/objectenhandboek/watersysteem/watergangsectie/berm
      - title: Werkpad
        text: Onderhouds- en beheerzone langs de watergangsectie voor bereikbaarheid en uitvoering.
        href: /in-migratie/objectenhandboek/watersysteem/watergangsectie/werkpad
  - title: Geometrie
    summary: De geometrie van de watergangsectie komt terug in bovenaanzicht, dwarsprofiel en ruimtelijke begrenzing langs de as van de watergang.
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
  - title: Talud
    text: Door naar het eerste onderliggende profielonderdeel van de watergangsectie.
    href: /datastandaard/objectenhandboek/watersysteem/watergangsectie/talud
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
