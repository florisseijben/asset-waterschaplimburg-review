import React, { useMemo, useState } from 'react';

const Icons = {
  search: '⌕',
  chevronRight: '›',
  chevronDown: '⌄',
  database: '◫',
  branch: '⑂',
  file: '▤',
  link: '⛓',
  layers: '◰',
  home: '⌂',
  panel: '☰',
  network: '◎',
  shape: '⬡',
};

const ontology = {
  site: {
    title: 'asset.waterschaplimburg.nl',
    section: 'Datastandaard',
    product: 'OTL',
    route: '/datastandaard/otl',
  },
  nodes: [
    {
      id: 'Watergang',
      label: 'Watergang',
      type: 'Class',
      package: 'Waterstaatsobject',
      description: 'Fysiek waterstaatsobject als geheel.',
      definition:
        'Waterstaatsobject dat secties, intersecties, profielen en gerelateerde fysieke onderdelen structureert.',
      standard: 'WL / IMBOR 2025',
      status: 'Definitief',
      parent: null,
      properties: [
        { name: 'globalID', datatype: 'GUID', cardinality: '1..1', description: 'Systeemgegenereerde unieke identificatie.' },
        { name: 'trajectCode', datatype: 'string', cardinality: '0..1', description: 'Logisch opgebouwde betekenisvolle trajectcode.' },
        { name: 'geometrie', datatype: 'Polygon', cardinality: '1..1', description: 'Vlakgeometrie van de watergang als geheel.' },
        { name: 'objectType', datatype: 'string', cardinality: '0..1', description: 'Aanduiding van de hoofdklasse van het object.' },
      ],
      relations: [
        { name: 'heeftSectie', target: 'Watergangsectie', cardinality: '0..*', direction: 'uitgaand' },
        { name: 'heeftIntersectie', target: 'Intersectie', cardinality: '0..*', direction: 'uitgaand' },
        { name: 'heeftProfiel', target: 'Profiel', cardinality: '1..*', direction: 'uitgaand' },
      ],
      documents: [
        { title: 'Objectdefinitie Watergang', type: 'Specificatie' },
        { title: 'Dwarsprofielrichtlijn Watergang', type: 'Werkinstructie' },
      ],
      mappings: [
        { system: 'IMBOR 2025', value: 'Watergang' },
        { system: 'ArcGIS', value: 'Feature class: Watergang' },
      ],
    },
    {
      id: 'Beek',
      label: 'Beek',
      type: 'Class',
      package: 'Waterstaatsobject',
      description: 'Min of meer natuurlijke stroom ondiep water.',
      definition:
        'Min of meer natuurlijke stroom ondiep water die vanuit een oorsprong, vaak een bron, stroomafwaarts vloeit.',
      standard: 'IMBOR 2025',
      status: 'Definitief',
      parent: 'Watergang',
      properties: [],
      relations: [{ name: 'subtypeVan', target: 'Watergang', cardinality: '1..1', direction: 'uitgaand' }],
      documents: [{ title: 'Objectdefinitie Beek', type: 'Specificatie' }],
      mappings: [{ system: 'IMBOR 2025', value: 'Beek' }],
    },
    {
      id: 'Watergangsectie',
      label: 'Watergangsectie',
      type: 'Class',
      package: 'Waterstaatsobject',
      description: 'Lineair deel van een watergang.',
      definition:
        'Aaneengesloten deel van een watergang waarop onderdelen, bekledingsconstructies en profielen worden geprojecteerd.',
      standard: 'WL',
      status: 'Voorstel',
      parent: 'Watergang',
      properties: [
        { name: 'naam', datatype: 'string', cardinality: '0..1', description: 'Mensleesbare naam van de sectie.' },
        { name: 'geometrie', datatype: 'Polygon', cardinality: '1..1', description: 'Vlakgeometrie van de watergangsectie.' },
      ],
      relations: [
        { name: 'sectieVan', target: 'Watergang', cardinality: '1..1', direction: 'uitgaand' },
        { name: 'heeftOnderdeel', target: 'Watergangonderdeel', cardinality: '1..*', direction: 'uitgaand' },
        { name: 'heeftProfiel', target: 'Profiel', cardinality: '0..*', direction: 'uitgaand' },
      ],
      documents: [{ title: 'Sectie-opbouw watergang', type: 'Specificatie' }],
      mappings: [{ system: 'OTL', value: 'Watergangsectie' }],
    },
    {
      id: 'Intersectie',
      label: 'Intersectie',
      type: 'Class',
      package: 'Waterstaatsobject',
      description: 'Knoop- of kruisingselement in de watergangstructuur.',
      definition:
        'Specifiek punt of zone binnen de watergangstructuur waar verbinding, kruising of overgang optreedt.',
      standard: 'WL',
      status: 'Voorstel',
      parent: 'Watergang',
      properties: [
        { name: 'geometrie', datatype: 'Polygon', cardinality: '1..1', description: 'Vlakgeometrie van de intersectie.' },
      ],
      relations: [{ name: 'intersectieVan', target: 'Watergang', cardinality: '1..1', direction: 'uitgaand' }],
      documents: [],
      mappings: [{ system: 'OTL', value: 'Intersectie' }],
    },
    {
      id: 'Watergangonderdeel',
      label: 'Watergangonderdeel',
      type: 'Abstract class',
      package: 'Watergangopbouw',
      description: 'Fysiek onderdeel van een watergangsectie.',
      definition: 'Abstracte klasse voor bodem en talud binnen de fysieke opbouw van een watergangsectie.',
      standard: 'WL',
      status: 'Voorstel',
      parent: null,
      properties: [],
      relations: [
        { name: 'onderdeelVanSectie', target: 'Watergangsectie', cardinality: '1..1', direction: 'uitgaand' },
        { name: 'heeftBekledingsconstructie', target: 'Bekledingsconstructie', cardinality: '1..1', direction: 'uitgaand' },
      ],
      documents: [{ title: 'Opbouw fysieke onderdelen', type: 'Modelregel' }],
      mappings: [{ system: 'OTL', value: 'Watergangonderdeel' }],
    },
    {
      id: 'Bodem',
      label: 'Bodem',
      type: 'Class',
      package: 'Watergangopbouw',
      description: 'Onderste fysiek onderdeel van een watergangsectie.',
      definition: 'Fysiek deel van de watergang waar de bodembreedte in een profiel op wordt bepaald.',
      standard: 'WL',
      status: 'Voorstel',
      parent: 'Watergangonderdeel',
      properties: [
        { name: 'geometrie', datatype: 'Polygon', cardinality: '1..1', description: 'Vlakgeometrie van de bodem.' },
      ],
      relations: [
        { name: 'onderdeelVanSectie', target: 'Watergangsectie', cardinality: '1..1', direction: 'uitgaand' },
        { name: 'heeftBekledingsconstructie', target: 'Bekledingsconstructie', cardinality: '1..1', direction: 'uitgaand' },
        { name: 'wordtGerepresenteerdInProfielDoor', target: 'ProfielBodem', cardinality: '0..*', direction: 'inkomend' },
      ],
      documents: [{ title: 'Definitie bodem in watergang', type: 'Specificatie' }],
      mappings: [{ system: 'OTL', value: 'Bodem' }],
    },
    {
      id: 'Talud',
      label: 'Talud',
      type: 'Class',
      package: 'Watergangopbouw',
      description: 'Hellend fysiek onderdeel van een watergangsectie.',
      definition: 'Fysiek hellend onderdeel tussen bodem en maaiveld/insteek.',
      standard: 'WL',
      status: 'Voorstel',
      parent: 'Watergangonderdeel',
      properties: [
        { name: 'geometrie', datatype: 'Polygon', cardinality: '1..1', description: 'Vlakgeometrie van het talud.' },
      ],
      relations: [
        { name: 'onderdeelVanSectie', target: 'Watergangsectie', cardinality: '1..1', direction: 'uitgaand' },
        { name: 'heeftBekledingsconstructie', target: 'Bekledingsconstructie', cardinality: '1..1', direction: 'uitgaand' },
        { name: 'wordtGerepresenteerdInProfielDoor', target: 'ProfielTalud', cardinality: '0..*', direction: 'inkomend' },
      ],
      documents: [{ title: 'Definitie talud in watergang', type: 'Specificatie' }],
      mappings: [{ system: 'OTL', value: 'Talud' }],
    },
    {
      id: 'Bekledingsconstructie',
      label: 'Bekledingsconstructie',
      type: 'Class',
      package: 'Bekleding',
      description: 'Constructieve opbouw gekoppeld aan een watergangonderdeel.',
      definition: 'Constructieve lagenopbouw van een onderdeel, inclusief toplaag.',
      standard: 'WL',
      status: 'Voorstel',
      parent: null,
      properties: [],
      relations: [
        { name: 'bekledingVan', target: 'Watergangonderdeel', cardinality: '1..1', direction: 'uitgaand' },
        { name: 'heeftLaag', target: 'Bekledingslaag', cardinality: '1..*', direction: 'uitgaand' },
        { name: 'heeftToplaag', target: 'Toplaag', cardinality: '1..1', direction: 'uitgaand' },
      ],
      documents: [{ title: 'Constructieve laagopbouw', type: 'Specificatie' }],
      mappings: [{ system: 'OTL', value: 'Bekledingsconstructie' }],
    },
    {
      id: 'Bekledingslaag',
      label: 'Bekledingslaag',
      type: 'Class',
      package: 'Bekleding',
      description: 'Laag binnen een bekledingsconstructie.',
      definition: 'Algemene laag in de constructieve opbouw van een bekledingsconstructie.',
      standard: 'WL',
      status: 'Voorstel',
      parent: null,
      properties: [{ name: 'volgorde', datatype: 'integer', cardinality: '0..1', description: 'Volgorde van de laag in de opbouw.' }],
      relations: [{ name: 'laagVan', target: 'Bekledingsconstructie', cardinality: '1..1', direction: 'uitgaand' }],
      documents: [],
      mappings: [{ system: 'OTL', value: 'Bekledingslaag' }],
    },
    {
      id: 'Toplaag',
      label: 'Toplaag',
      type: 'Class',
      package: 'Bekleding',
      description: 'Bovenste fysieke laag van een bekledingsconstructie.',
      definition:
        'Zichtbare bovenste fysieke laag waaraan een verschijningsvorm is gekoppeld en die geografisch wordt gerepresenteerd door een Terreindeel.',
      standard: 'WL',
      status: 'Voorstel',
      parent: 'Bekledingslaag',
      properties: [
        {
          name: 'verschijningsvorm',
          datatype: 'referentie naar typologie',
          cardinality: '1..1',
          description: 'Typologie van het zichtbare voorkomen van de toplaag.',
        },
      ],
      relations: [
        { name: 'toplaagVan', target: 'Bekledingsconstructie', cardinality: '1..1', direction: 'uitgaand' },
        { name: 'wordtGerepresenteerdDoor', target: 'Terreindeel', cardinality: '0..*', direction: 'inkomend' },
      ],
      documents: [{ title: 'Regel zichtbare toplaag', type: 'Modelregel' }],
      mappings: [{ system: 'OTL', value: 'Toplaag' }],
    },
    {
      id: 'Terreindeel',
      label: 'Terreindeel',
      type: 'Class',
      package: 'Geo-representatie',
      description: 'Geografisch vlakobject dat de toplaag representeert.',
      definition:
        'Geografisch object vanuit grootschalige topografie; het is de representatie van een toplaag in het kaartbeeld en beschrijft wat aan de oppervlakte zichtbaar is.',
      standard: 'NEN3610 / WL',
      status: 'Voorstel',
      parent: null,
      properties: [
        { name: 'geometrie', datatype: 'Polygon', cardinality: '1..1', description: 'Topografische vlakgeometrie.' },
        {
          name: 'verschijningsvorm',
          datatype: 'referentie naar typologie',
          cardinality: '1..1',
          description: 'Typologie van het zichtbare voorkomen in de geo-representatie.',
        },
        { name: 'geldigVanaf', datatype: 'date', cardinality: '0..1', description: 'Startdatum van de representatie.' },
        { name: 'geldigTot', datatype: 'date', cardinality: '0..1', description: 'Einddatum van de representatie.' },
      ],
      relations: [
        { name: 'representeertToplaag', target: 'Toplaag', cardinality: '1..1', direction: 'uitgaand' },
        { name: 'heeftVerschijningsvormklasse', target: 'Verschijningsvorm', cardinality: '1..1', direction: 'uitgaand' },
      ],
      documents: [{ title: 'Geo-object terreindeel', type: 'Specificatie' }],
      mappings: [
        { system: 'NEN3610', value: 'GeografischObject / vlak' },
        { system: 'ArcGIS', value: 'Polygon feature class: Terreindeel' },
      ],
    },
    {
      id: 'Profiel',
      label: 'Profiel',
      type: 'Class',
      package: 'Profielen',
      description: 'Informatieobject dat de dwarsdoorsnede van een watergang of watergangsectie beschrijft.',
      definition:
        'Informatieve doorsnede met onderdelen zoals begin profiel, terrein, insteek, talud, teen, bodem en einde profiel.',
      standard: 'WL',
      status: 'Voorstel',
      parent: null,
      properties: [
        { name: 'bodembreedte', datatype: 'decimal', cardinality: '0..1', description: 'Breedte van de bodem in de beschreven dwarsdoorsnede.' },
        { name: 'breedteklasseWatergang', datatype: 'codelijst', cardinality: '0..1', description: 'Klasse-indeling op basis van de breedte in het profiel.' },
      ],
      relations: [
        { name: 'beschrijftWatergang', target: 'Watergang', cardinality: '0..1', direction: 'uitgaand' },
        { name: 'beschrijftWatergangsectie', target: 'Watergangsectie', cardinality: '0..1', direction: 'uitgaand' },
        { name: 'heeftProfielonderdeel', target: 'Profielonderdeel', cardinality: '1..*', direction: 'uitgaand' },
        { name: 'heeftBreedteklasseWaardeUit', target: 'BreedteklasseWatergangCodelijst', cardinality: '0..1', direction: 'uitgaand' },
      ],
      documents: [{ title: 'Profieldefinitie en doorsnede', type: 'Specificatie' }],
      mappings: [{ system: 'OTL', value: 'Profiel' }],
    },
    {
      id: 'Profielonderdeel',
      label: 'Profielonderdeel',
      type: 'Abstract class',
      package: 'Profielen',
      description: 'Onderdeel van een profielbeschrijving.',
      definition: 'Abstracte klasse voor objecten die in de dwarsdoorsnede worden onderscheiden.',
      standard: 'WL',
      status: 'Voorstel',
      parent: null,
      properties: [],
      relations: [
        { name: 'onderdeelVanProfiel', target: 'Profiel', cardinality: '1..1', direction: 'inkomend' },
        { name: 'ligtInDwarsdoorsnedeOp', target: 'Watergangonderdeel', cardinality: '0..1', direction: 'uitgaand' },
      ],
      documents: [],
      mappings: [{ system: 'OTL', value: 'Profielonderdeel' }],
    },
    {
      id: 'Teen',
      label: 'Teen',
      type: 'Class',
      package: 'Profielen',
      description: 'Lijnvormig profielonderdeel op de onderzijde van het talud.',
      definition: 'De teen vormt de grens tussen de onderzijde van het talud en het horizontale vlak, bijvoorbeeld de bodem.',
      standard: 'WL',
      status: 'Voorstel',
      parent: 'Profielonderdeel',
      properties: [
        { name: 'geometrie', datatype: 'LineString', cardinality: '1..1', description: 'Lijngeometrie van de teen in het profiel.' },
      ],
      relations: [
        { name: 'onderdeelVanProfiel', target: 'Profiel', cardinality: '1..1', direction: 'inkomend' },
        { name: 'grenstAan', target: 'ProfielTalud', cardinality: '1..*', direction: 'uitgaand' },
        { name: 'grenstAan', target: 'ProfielBodem', cardinality: '0..1', direction: 'uitgaand' },
      ],
      documents: [],
      mappings: [{ system: 'OTL', value: 'Teen' }],
    },
    {
      id: 'Insteek',
      label: 'Insteek',
      type: 'Class',
      package: 'Profielen',
      description: 'Lijnvormig profielonderdeel op de bovenzijde van het talud.',
      definition:
        'De insteek vormt de grens tussen de bovenzijde van het talud en het horizontale vlak, bijvoorbeeld berm, kruin of terrein.',
      standard: 'WL',
      status: 'Voorstel',
      parent: 'Profielonderdeel',
      properties: [
        { name: 'geometrie', datatype: 'LineString', cardinality: '1..1', description: 'Lijngeometrie van de insteek in het profiel.' },
      ],
      relations: [
        { name: 'onderdeelVanProfiel', target: 'Profiel', cardinality: '1..1', direction: 'inkomend' },
        { name: 'grenstAan', target: 'ProfielTalud', cardinality: '1..*', direction: 'uitgaand' },
      ],
      documents: [],
      mappings: [{ system: 'OTL', value: 'Insteek' }],
    },
    {
      id: 'ProfielBodem',
      label: 'ProfielBodem',
      type: 'Class',
      package: 'Profielen',
      description: 'Bodem zoals weergegeven in een profiel.',
      definition: 'Profielonderdeel dat de bodem in de dwarsdoorsnede representeert.',
      standard: 'WL',
      status: 'Voorstel',
      parent: 'Profielonderdeel',
      properties: [],
      relations: [{ name: 'ligtInDwarsdoorsnedeOp', target: 'Bodem', cardinality: '0..1', direction: 'uitgaand' }],
      documents: [],
      mappings: [{ system: 'OTL', value: 'ProfielBodem' }],
    },
    {
      id: 'ProfielTalud',
      label: 'ProfielTalud',
      type: 'Class',
      package: 'Profielen',
      description: 'Talud zoals weergegeven in een profiel.',
      definition: 'Profielonderdeel dat een fysiek talud in de dwarsdoorsnede representeert.',
      standard: 'WL',
      status: 'Voorstel',
      parent: 'Profielonderdeel',
      properties: [],
      relations: [{ name: 'ligtInDwarsdoorsnedeOp', target: 'Talud', cardinality: '0..1', direction: 'uitgaand' }],
      documents: [],
      mappings: [{ system: 'OTL', value: 'ProfielTalud' }],
    },
    {
      id: 'BreedteklasseWatergangCodelijst',
      label: 'Codelijst Breedteklasse Watergang',
      type: 'Codelijst',
      package: 'Profielen',
      description: 'Waardenlijst voor breedteklasse van een profiel.',
      definition: 'Codelijst met toegestane waarden voor breedteklasseWatergang als classificerende eigenschap van Profiel.',
      standard: 'IMBOR 2025',
      status: 'Definitief',
      parent: null,
      properties: [],
      relations: [{ name: 'waardeVoor', target: 'Profiel', cardinality: '0..*', direction: 'inkomend' }],
      documents: [],
      mappings: [{ system: 'IMBOR 2025', value: 'Breedteklasse Watergang codelijst' }],
    },
    {
      id: 'Boom',
      label: 'Boom',
      type: 'Class',
      package: 'Vegetatieobject',
      description: 'Individueel houtachtig object met stam.',
      definition: 'Houtachtig gewas met wortelgestel en een enkele, stevige, houtige stam die zich boven de grond vertakt.',
      standard: 'IMBOR 2025',
      status: 'Definitief',
      parent: null,
      properties: [
        { name: 'globalID', datatype: 'GUID', cardinality: '1..1', description: 'Systeemgegenereerde unieke identificatie.' },
        { name: 'objectType', datatype: 'string', cardinality: '0..1', description: 'Aanduiding van de hoofdklasse van het object.' },
      ],
      relations: [],
      documents: [{ title: 'Objectdefinitie Boom', type: 'Specificatie' }],
      mappings: [{ system: 'IMBOR 2025', value: 'Boom' }],
    },
    {
      id: 'Verschijningsvorm',
      label: 'Verschijningsvorm',
      type: 'Abstract class',
      package: 'Typologie',
      description: 'Typering van het zichtbare voorkomen van een toplaag.',
      definition: 'Typologielaag voor zichtbaar voorkomen, onder meer gebruikt voor OTL, geo-representatie en beheerinformatie.',
      standard: 'IMBOR 2025 / WL',
      status: 'Definitief',
      parent: null,
      properties: [],
      relations: [{ name: 'toegepastOpRepresentatie', target: 'Terreindeel', cardinality: '0..*', direction: 'inkomend' }],
      documents: [{ title: 'Typologieregels verschijningsvorm', type: 'Specificatie' }],
      mappings: [{ system: 'OTL', value: 'Verschijningsvorm' }],
    },
    {
      id: 'GrasEnKruidachtigen',
      label: 'Gras- en kruidachtigen',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen met grasvegetatie of laagblijvende kruidachtige vegetatie.',
      definition: 'Terrein met grasvegetatie of aaneengesloten kruidachtige vegetatie, niet primair voor grasproductie.',
      standard: 'IMBOR 2025',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'IMBOR 2025', value: 'Gras- en kruidachtigen' }],
    },
    {
      id: 'Bos',
      label: 'Bos',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van gesloten boomvegetatie.',
      definition: 'Begroeiing die uit voldoende bomen bestaat om een min of meer gesloten geheel te vormen.',
      standard: 'WL',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'WL', value: 'Bos' }],
    },
    {
      id: 'Bosplantsoen',
      label: 'Bosplantsoen',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van bosachtige beplanting met ondergroei.',
      definition: 'Bosplantsoen wordt gekenmerkt door veelal boomsoorten met enkele struwelen in de ondergroei.',
      standard: 'WL',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'WL', value: 'Bosplantsoen' }],
    },
    {
      id: 'Struweel',
      label: 'Struweel',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van struikgedomineerde vegetatie.',
      definition: 'Vegetatie gekenmerkt door veelal struweelsoorten met enkele aanwezige bomen die boven het struweel uitgroeien.',
      standard: 'WL',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'WL', value: 'Struweel' }],
    },
    {
      id: 'Struweelhaag',
      label: 'Struweelhaag',
      type: 'Class',
      package: 'Typologie',
      description: 'Lijnvormige, smalle, lage haag van inheemse struiken.',
      definition: 'Lijnvormige, smalle, lage haag van inheemse, vaak doornachtige struiken, met behoud van lijnvormig karakter.',
      standard: 'WL',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'WL', value: 'Struweelhaag' }],
    },
    {
      id: 'Moeras',
      label: 'Moeras',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van natte moerasvegetatie.',
      definition: 'Overgangsgebied tussen water en land, vaak drassig en gekenmerkt door altijd vochtige en/of natte omstandigheden.',
      standard: 'WL',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'WL', value: 'Moeras' }],
    },
    {
      id: 'Houtsingel',
      label: 'Houtsingel',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van een houtige afscheidingsstrook.',
      definition: 'Brede strook met bomen en struiken als afscheiding tussen percelen of langs beken en waterlopen.',
      standard: 'IMBOR 2025',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'IMBOR 2025', value: 'Houtsingel' }],
    },
    {
      id: 'Rietvegetatie',
      label: 'Rietvegetatie',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van rietdominante vegetatie.',
      definition: 'Vegetatie met riet als hoofdsoort, op natte of droge ondergrond.',
      standard: 'IMBOR 2025',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'IMBOR 2025', value: 'Rietvegetatie' }],
    },
    {
      id: 'Zoomvegetatie',
      label: 'Zoomvegetatie',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van overgangsvegetatie tussen bos en grasland.',
      definition: 'Overgang tussen bos en grasland die bestaat uit een ruigere gras-/kruidenvegetatie.',
      standard: 'WL',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'WL', value: 'Zoomvegetatie' }],
    },
    {
      id: 'RuigeGlanshaverhooilanden',
      label: 'Ruige glanshaverhooilanden',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van ruige glanshaverhooilandvegetatie.',
      definition: 'Hooilanden op vochtige tot periodiek overstroomde gronden met hoog opgroeiende ruige grasvegetatie.',
      standard: 'WL',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'WL', value: 'Ruige glanshaverhooilanden' }],
    },
    {
      id: 'GlanshaverhooilandenOpSchraleBodem',
      label: 'Glanshaverhooilanden op schrale bodem',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van glanshaverhooiland op schrale bodem.',
      definition: 'Hooilanden met hoog opgroeiende bloem-/kruidenrijke vegetatie en hoge abundantie van glanshaver.',
      standard: 'WL',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'WL', value: 'Glanshaverhooilanden op schrale bodem' }],
    },
    {
      id: 'BloemrijkNatteRuigte',
      label: 'Bloemrijk natte ruigte',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van bloemrijke natte ruigte.',
      definition: 'Perceel in een natte omgeving bestaande uit kruidachtige planten die groter worden dan een meter en rijk zijn aan bloemen.',
      standard: 'IMBOR 2025',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'IMBOR 2025', value: 'Bloemrijk natte ruigte' }],
    },
    {
      id: 'Ruigte',
      label: 'Ruigte',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van ruigte.',
      definition: 'Hoog opgaande, meerjarige, algemeen voorkomende kruidachtige vegetatie en grassoorten.',
      standard: 'IMBOR 2025',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'IMBOR 2025', value: 'Ruigte' }],
    },
    {
      id: 'GazonExtensief',
      label: 'Gazon extensief',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van extensief beheerd gazon.',
      definition: 'Grasterrein met relatief uniform grasmengsel dat extensief wordt bewerkt, circa 4–6 keer maaien per jaar.',
      standard: 'WL',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'WL', value: 'Gazon extensief' }],
    },
    {
      id: 'DotterbloemhooilandDrogeVorm',
      label: 'Dotterbloemhooiland (droge vorm)',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van droog dotterbloemhooiland.',
      definition: 'Niet-drassig grasland met veel bloemen en invloed van grondwater, dat winters kan overstromen maar overwegend droog is.',
      standard: 'IMBOR 2025',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'IMBOR 2025', value: 'Dotterbloemhooiland (droge vorm)' }],
    },
    {
      id: 'DotterbloemhooilandNatteVorm',
      label: 'Dotterbloemhooiland (Natte vorm)',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van nat dotterbloemhooiland.',
      definition: 'Drassig grasland met veel bloemen, onder invloed van grondwater en winteroverstroming.',
      standard: 'IMBOR 2025',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'IMBOR 2025', value: 'Dotterbloemhooiland (Natte vorm)' }],
    },
    {
      id: 'HeischraalGrasland',
      label: 'Heischraal grasland',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van heischraal grasland.',
      definition: 'Grasland op droge, zure, laagproductieve en meestal zandachtige gronden, zonder dwergstruiken maar met lage grassen en kruiden.',
      standard: 'WL',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'WL', value: 'Heischraal grasland' }],
    },
    {
      id: 'Schraalgrasland',
      label: 'Schraalgrasland',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van schraalgrasland.',
      definition: 'Droog, laagproductief en veelal zandig grasland onder basenrijke omstandigheden, met soortenrijke korte vegetatie.',
      standard: 'WL',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'WL', value: 'Schraalgrasland' }],
    },
    {
      id: 'Pimpernelhooiland',
      label: 'Pimpernelhooiland',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van pimpernelhooiland.',
      definition: 'Graslandtype gekenmerkt door specifieke flora en insecten, waaronder grote pimpernel.',
      standard: 'IMBOR 2025',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'IMBOR 2025', value: 'Pimpernelhooiland' }],
    },
    {
      id: 'Orchideeengrasland',
      label: 'Orchideeëngrasland',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van orchideeëngrasland.',
      definition: 'Grasland op meestal vochtige, schrale en laagproductieve gronden, gekenmerkt door hoge dichtheden orchideeën.',
      standard: 'WL',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'WL', value: 'Orchideeëngrasland' }],
    },
    {
      id: 'LosseHaag',
      label: 'Losse haag',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van een losse haag.',
      definition: 'Eén of twee rijen heesters die samen een lijnvormig element vormen en niet worden geknipt.',
      standard: 'IMBOR 2025',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'IMBOR 2025', value: 'Losse haag' }],
    },
    {
      id: 'Doorstroommoeras',
      label: 'Doorstroommoeras',
      type: 'Class',
      package: 'Typologie',
      description: 'Zichtbaar voorkomen van doorstroommoeras.',
      definition: 'Moeras dat ontstaat doordat één of meer diffuse waterstromen door een lager gelegen zone stromen.',
      standard: 'WL',
      status: 'Definitief',
      parent: 'Verschijningsvorm',
      properties: [],
      relations: [],
      documents: [],
      mappings: [{ system: 'WL', value: 'Doorstroommoeras' }],
    },
  ],
};

const NAV = [
  { label: 'Datastandaard', active: true },
  { label: 'Assetregister', active: false },
  { label: 'Assetmanagement', active: false },
  { label: 'Over deze website', active: false },
];

const tabs = [
  { id: 'algemeen', label: 'Algemeen', icon: Icons.shape },
  { id: 'eigenschappen', label: 'Eigenschappen', icon: Icons.database },
  { id: 'relaties', label: 'Relaties', icon: Icons.branch },
  { id: 'documenten', label: 'Documenten', icon: Icons.file },
  { id: 'mapping', label: 'Mapping', icon: Icons.link },
];

const packageOrder = [
  'Waterstaatsobject',
  'Watergangopbouw',
  'Bekleding',
  'Geo-representatie',
  'Profielen',
  'Vegetatieobject',
  'Typologie',
];

const badgeStyles = {
  Class: 'bg-zinc-100 text-zinc-800',
  'Abstract class': 'bg-amber-100 text-amber-900',
  Relatieklasse: 'bg-emerald-100 text-emerald-900',
  Codelijst: 'bg-sky-100 text-sky-900',
};

const packageColors = {
  Waterstaatsobject: 'bg-sky-50 border-sky-200',
  Watergangopbouw: 'bg-blue-50 border-blue-200',
  Bekleding: 'bg-emerald-50 border-emerald-200',
  'Geo-representatie': 'bg-green-50 border-green-200',
  Profielen: 'bg-violet-50 border-violet-200',
  Vegetatieobject: 'bg-teal-50 border-teal-200',
  Typologie: 'bg-amber-50 border-amber-200',
};

function iconBubble(symbol) {
  return <span className="inline-flex h-4 w-4 items-center justify-center text-[12px]">{symbol}</span>;
}

function groupByPackage(nodes) {
  const groups = new Map();
  for (const pkg of packageOrder) groups.set(pkg, []);
  nodes.forEach((node) => {
    if (!groups.has(node.package)) groups.set(node.package, []);
    groups.get(node.package).push(node);
  });
  return Array.from(groups.entries()).filter(([, items]) => items.length > 0);
}

function buildTreeItems(nodes) {
  const byId = Object.fromEntries(nodes.map((node) => [node.id, { ...node, children: [] }]));
  const roots = [];

  Object.values(byId).forEach((node) => {
    if (node.parent && byId[node.parent]) {
      byId[node.parent].children.push(node);
    } else {
      roots.push(node);
    }
  });

  const sortRecursive = (items) => {
    items.sort((a, b) => a.label.localeCompare(b.label, 'nl'));
    items.forEach((item) => sortRecursive(item.children));
  };

  sortRecursive(roots);
  return roots;
}

function countDescendants(node) {
  return node.children.reduce((total, child) => total + 1 + countDescendants(child), 0);
}

function runChecks(nodes) {
  const ids = new Set(nodes.map((n) => n.id));
  const tests = [
    {
      name: 'Alle node-ids zijn uniek',
      pass: ids.size === nodes.length,
      detail: `${ids.size}/${nodes.length} unieke ids`,
    },
    {
      name: 'Alle parent-verwijzingen bestaan',
      pass: nodes.every((n) => !n.parent || ids.has(n.parent)),
      detail: `${nodes.filter((n) => !n.parent || ids.has(n.parent)).length}/${nodes.length} geldig`,
    },
    {
      name: 'Alle relatiedoelen bestaan',
      pass: nodes.every((n) => n.relations.every((r) => ids.has(r.target))),
      detail: `${nodes.filter((n) => n.relations.every((r) => ids.has(r.target))).length}/${nodes.length} nodes met geldige relaties`,
    },
    {
      name: 'Profiel bevat Teen en Insteek',
      pass: ids.has('Teen') && ids.has('Insteek'),
      detail: ids.has('Teen') && ids.has('Insteek') ? 'Aanwezig' : 'Ontbreekt',
    },
    {
      name: 'Teen en Insteek hebben lijngeometrie',
      pass: nodes
        .filter((n) => n.id === 'Teen' || n.id === 'Insteek')
        .every((n) => n.properties.some((p) => p.name === 'geometrie' && p.datatype === 'LineString')),
      detail: 'Controle op geometrie-attribuut uitgevoerd',
    },
    {
      name: 'Terreindeel representeert Toplaag',
      pass: nodes
        .find((n) => n.id === 'Terreindeel')
        ?.relations.some((r) => r.target === 'Toplaag') ?? false,
      detail: 'Representatierelatie gecontroleerd',
    },
  ];
  return tests;
}

function TreeNode({ node, level, selectedId, setSelectedId, expanded, toggleExpanded }) {
  const isSelected = selectedId === node.id;
  const hasChildren = node.children.length > 0;
  const isOpen = expanded[node.id] ?? true;

  return (
    <div>
      <div
        className={`flex items-center gap-2 rounded-xl px-2 py-1.5 transition ${
          isSelected ? 'bg-zinc-900 text-white' : 'text-zinc-800 hover:bg-white/70'
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        <button
          type="button"
          onClick={() => hasChildren && toggleExpanded(node.id)}
          className={`flex h-6 w-6 items-center justify-center rounded-md ${
            hasChildren ? 'hover:bg-black/5' : 'cursor-default opacity-30'
          }`}
          aria-label={hasChildren ? (isOpen ? 'Klap in' : 'Klap uit') : 'Geen kinderen'}
        >
          {hasChildren ? (isOpen ? iconBubble(Icons.chevronDown) : iconBubble(Icons.chevronRight)) : iconBubble(Icons.chevronRight)}
        </button>
        <button type="button" onClick={() => setSelectedId(node.id)} className="min-w-0 flex-1 text-left">
          <div className="truncate text-sm font-medium">{node.label}</div>
          <div className={`truncate text-xs ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
            {node.type}
            {hasChildren ? ` · ${node.children.length} onderliggend` : ''}
          </div>
        </button>
      </div>
      {hasChildren && isOpen && (
        <div className="mt-0.5 space-y-0.5">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              expanded={expanded}
              toggleExpanded={toggleExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PackageTree({ pkg, items, selectedId, setSelectedId }) {
  const treeRoots = useMemo(() => buildTreeItems(items), [items]);
  const [expanded, setExpanded] = useState(() => {
    const state = {};
    const visit = (node) => {
      if (node.children.length > 0) state[node.id] = true;
      node.children.forEach(visit);
    };
    treeRoots.forEach(visit);
    return state;
  });

  const toggleExpanded = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalChildren = treeRoots.reduce((sum, item) => sum + countDescendants(item), 0);

  return (
    <section className={`rounded-2xl border p-3 ${packageColors[pkg] || 'border-zinc-200 bg-zinc-50'}`}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">{pkg}</div>
        <div className="text-[11px] text-zinc-500">
          {treeRoots.length} topniveau · {totalChildren} onderliggend
        </div>
      </div>
      <div className="space-y-1">
        {treeRoots.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            level={0}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            expanded={expanded}
            toggleExpanded={toggleExpanded}
          />
        ))}
      </div>
    </section>
  );
}

function lineage(nodesById, current) {
  const chain = [];
  let pointer = current;
  while (pointer) {
    chain.unshift(pointer);
    pointer = pointer.parent ? nodesById[pointer.parent] : null;
  }
  return chain;
}

function RelationMiniGraph({ node, nodesById }) {
  const outgoing = node.relations.slice(0, 5);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-900">
        {iconBubble(Icons.network)} Relatieweergave
      </div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 560 220" className="h-56 min-w-[540px] w-full rounded-xl bg-zinc-50">
          <defs>
            <marker id="arrow-node" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#71717a" />
            </marker>
          </defs>
          <rect x="24" y="78" width="160" height="64" rx="18" fill="#18181b" />
          <text x="104" y="108" textAnchor="middle" fontSize="12" fill="#d4d4d8">
            {node.type}
          </text>
          <text x="104" y="126" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">
            {node.label}
          </text>
          {outgoing.map((rel, index) => {
            const y = 28 + index * 38;
            return (
              <g key={`${rel.name}-${rel.target}`}>
                <path
                  d={`M 184 110 C 260 110, 260 ${y + 12}, 332 ${y + 12}`}
                  fill="none"
                  stroke="#71717a"
                  strokeWidth="2"
                  markerEnd="url(#arrow-node)"
                />
                <rect x="208" y={y} width="110" height="24" rx="12" fill="white" stroke="#d4d4d8" />
                <text x="263" y={y + 16} textAnchor="middle" fontSize="11" fill="#3f3f46">
                  {rel.name}
                </text>
                <rect x="336" y={y - 10} width="188" height="46" rx="14" fill="#ffffff" stroke="#d4d4d8" />
                <text x="350" y={y + 8} fontSize="11" fill="#71717a">
                  {rel.cardinality}
                </text>
                <text x="350" y={y + 24} fontSize="14" fontWeight="700" fill="#18181b">
                  {nodesById[rel.target]?.label || rel.target}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function SelfTestPanel({ tests }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="mb-3 text-sm font-semibold text-zinc-900">Zelftest</div>
      <div className="space-y-2 text-sm">
        {tests.map((test) => (
          <div key={test.name} className="rounded-xl bg-zinc-50 px-3 py-2">
            <div className="font-medium text-zinc-900">
              {test.pass ? '✓' : '✕'} {test.name}
            </div>
            <div className="text-zinc-600">{test.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OTLPrototype() {
  const nodes = ontology.nodes;
  const nodesById = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);
  const tests = useMemo(() => runChecks(nodes), [nodes]);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('Toplaag');
  const [activeTab, setActiveTab] = useState('algemeen');
  const selected = nodesById[selectedId] || nodes[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return nodes;
    return nodes.filter((node) =>
      [node.label, node.id, node.package, node.description, node.standard]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(q))
    );
  }, [nodes, query]);

  const grouped = useMemo(() => groupByPackage(filtered), [filtered]);
  const trail = lineage(nodesById, selected);

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-white">
              {iconBubble(Icons.layers)}
            </div>
            <div>
              <div className="text-sm font-medium text-zinc-500">{ontology.site.title}</div>
              <div className="text-xl font-semibold">{ontology.site.product}</div>
            </div>
          </div>
          <nav className="hidden items-center gap-2 md:flex">
            {NAV.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`rounded-xl px-4 py-2 text-sm font-medium ${
                  item.active ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-6 py-5">
        <div className="mb-5 flex items-center gap-2 text-sm text-zinc-500">
          {iconBubble(Icons.home)}
          <span>{ontology.site.title}</span>
          {iconBubble(Icons.chevronRight)}
          <span>Datastandaard</span>
          {iconBubble(Icons.chevronRight)}
          <span className="font-medium text-zinc-900">OTL</span>
        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">Prototype OTL</div>
            <h1 className="text-3xl font-bold tracking-tight">Werkende OTL-viewer voor watergang, profiel en geo-perspectief</h1>
            <p className="mt-3 text-base leading-7 text-zinc-600">
              Deze viewer volgt de lijn uit de projectarchitectuur: één centrale website, binnen <strong>Datastandaard</strong>,
              met een OTL-opbouw volgens de tabs <strong>Algemeen</strong>, <strong>Eigenschappen</strong>,{' '}
              <strong>Relaties</strong>, <strong>Documenten</strong> en <strong>Mapping</strong>.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-zinc-50 px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-zinc-500">Objecten</div>
              <div className="mt-1 text-2xl font-bold">{nodes.length}</div>
            </div>
            <div className="rounded-2xl bg-zinc-50 px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-zinc-500">Pakketten</div>
              <div className="mt-1 text-2xl font-bold">{grouped.length}</div>
            </div>
            <div className="rounded-2xl bg-zinc-50 px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-zinc-500">Route</div>
              <div className="mt-1 text-sm font-semibold">{ontology.site.route}</div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
            <div className="border-b border-zinc-200 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-900">
                {iconBubble(Icons.panel)} Entiteiten en objecttypen
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">{Icons.search}</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Zoek entiteit, objecttype of standaard"
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-zinc-400"
                />
              </div>
            </div>
            <div className="max-h-[900px] overflow-auto p-4">
              <div className="space-y-4">
                {grouped.map(([pkg, items]) => (
                  <PackageTree
                    key={pkg}
                    pkg={pkg}
                    items={items}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                  />
                ))}
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                    {trail.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <button type="button" onClick={() => setSelectedId(item.id)} className="hover:text-zinc-900">
                          {item.label}
                        </button>
                        {index < trail.length - 1 && <span>{Icons.chevronRight}</span>}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-3xl font-bold tracking-tight">{selected.label}</h2>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[selected.type] || 'bg-zinc-100 text-zinc-800'}`}>
                      {selected.type}
                    </span>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">{selected.package}</span>
                  </div>
                  <p className="mt-3 max-w-4xl text-base leading-7 text-zinc-600">{selected.description}</p>
                </div>
                <div className="grid min-w-[260px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-2xl bg-zinc-50 p-4">
                    <div className="text-xs uppercase tracking-wide text-zinc-500">Standaard</div>
                    <div className="mt-1 text-sm font-semibold">{selected.standard}</div>
                  </div>
                  <div className="rounded-2xl bg-zinc-50 p-4">
                    <div className="text-xs uppercase tracking-wide text-zinc-500">Status</div>
                    <div className="mt-1 text-sm font-semibold">{selected.status}</div>
                  </div>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2 border-b border-zinc-200 pb-4">
                {tabs.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${
                        active ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {activeTab === 'algemeen' && (
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                      <div className="mb-2 text-sm font-semibold text-zinc-900">Definitie</div>
                      <p className="text-sm leading-7 text-zinc-700">{selected.definition}</p>
                    </div>
                    <RelationMiniGraph node={selected} nodesById={nodesById} />
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                      <div className="mb-3 text-sm font-semibold text-zinc-900">Kernmetadata</div>
                      <dl className="space-y-3 text-sm">
                        <div className="flex justify-between gap-4">
                          <dt className="text-zinc-500">Technische naam</dt>
                          <dd className="font-medium">{selected.id}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-zinc-500">Package</dt>
                          <dd className="font-medium">{selected.package}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-zinc-500">Type</dt>
                          <dd className="font-medium">{selected.type}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-zinc-500">Bovenliggend</dt>
                          <dd className="font-medium">{selected.parent ? nodesById[selected.parent]?.label : '—'}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-zinc-500">Eigenschappen als attribuut</dt>
                          <dd className="font-medium">{selected.properties.length}</dd>
                        </div>
                      </dl>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                      <div className="mb-3 text-sm font-semibold text-zinc-900">Ontwerpregel</div>
                      <p className="text-sm leading-7 text-zinc-700">
                        In deze opgeschoonde OTL is de scheiding expliciet tussen <strong>fysieke werkelijkheid</strong>,{' '}
                        <strong>geografische representatie</strong> en <strong>informatieobjecten</strong>. Alleen echte
                        objectklassen, typologieklassen en codelijsten staan in de boom. Eigenschappen zoals <strong>globalID</strong>,{' '}
                        <strong>trajectCode</strong>, <strong>objectType</strong>, <strong>bodembreedte</strong>,{' '}
                        <strong>breedteklasseWatergang</strong> en <strong>geometrie</strong> zijn als attribuut onder de
                        betreffende klasse opgenomen. Terreindeel geldt hierbij zelf als de geo-representatie van een Toplaag.
                      </p>
                    </div>
                    <SelfTestPanel tests={tests} />
                  </div>
                </div>
              )}

              {activeTab === 'eigenschappen' && (
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                  <table className="min-w-full divide-y divide-zinc-200 text-sm">
                    <thead className="bg-zinc-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-zinc-700">Naam</th>
                        <th className="px-4 py-3 text-left font-semibold text-zinc-700">Datatype</th>
                        <th className="px-4 py-3 text-left font-semibold text-zinc-700">Cardinaliteit</th>
                        <th className="px-4 py-3 text-left font-semibold text-zinc-700">Toelichting</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      {selected.properties.length > 0 ? (
                        selected.properties.map((prop) => (
                          <tr key={prop.name}>
                            <td className="px-4 py-3 font-medium">{prop.name}</td>
                            <td className="px-4 py-3 text-zinc-600">{prop.datatype}</td>
                            <td className="px-4 py-3 text-zinc-600">{prop.cardinality}</td>
                            <td className="px-4 py-3 text-zinc-600">{prop.description}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-4 py-10 text-center text-zinc-500">
                            Voor dit object zijn in deze prototypeversie nog geen losse eigenschappen uitgewerkt.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'relaties' && (
                <div className="grid gap-4">
                  {selected.relations.length > 0 ? (
                    selected.relations.map((rel) => (
                      <div key={`${rel.name}-${rel.target}`} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="text-base font-semibold text-zinc-900">{rel.name}</div>
                            <div className="mt-1 text-sm text-zinc-600">
                              {selected.label} {rel.direction === 'uitgaand' ? '→' : '←'} {nodesById[rel.target]?.label || rel.target}
                            </div>
                          </div>
                          <div className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                            {rel.cardinality}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-10 text-center text-zinc-500">
                      Geen expliciete relaties vastgelegd voor deze klasse in het prototype.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'documenten' && (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {selected.documents.length > 0 ? (
                    selected.documents.map((doc) => (
                      <div key={doc.title} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                        <div className="mb-2 inline-flex rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                          {doc.type}
                        </div>
                        <div className="text-sm font-semibold text-zinc-900">{doc.title}</div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full rounded-2xl border border-zinc-200 bg-zinc-50 p-10 text-center text-zinc-500">
                      Nog geen documenten gekoppeld in deze prototypeversie.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'mapping' && (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {selected.mappings.length > 0 ? (
                    selected.mappings.map((mapping) => (
                      <div key={`${mapping.system}-${mapping.value}`} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                        <div className="text-xs uppercase tracking-wide text-zinc-500">{mapping.system}</div>
                        <div className="mt-2 text-sm font-semibold text-zinc-900">{mapping.value}</div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full rounded-2xl border border-zinc-200 bg-zinc-50 p-10 text-center text-zinc-500">
                      Nog geen mappings gekoppeld in deze prototypeversie.
                    </div>
                  )}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
