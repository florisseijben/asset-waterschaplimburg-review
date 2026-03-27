(function () {
  var viewer = document.querySelector("[data-otl-viewer]");

  if (!viewer) {
    return;
  }

  var nodes = [
    {
      id: "Watergang",
      label: "Watergang",
      type: "Klasse",
      package: "Waterstaatsobject",
      description: "Fysiek waterstaatsobject dat de hoofdstructuur van een waterloop vastlegt.",
      definition: "Waterstaatsobject dat secties, intersecties, profielen en gerelateerde fysieke onderdelen structureert.",
      standard: "WL / IMBOR 2025",
      status: "Definitief",
      parent: null,
      properties: [
        { name: "globalID", datatype: "GUID", cardinality: "1..1", description: "Systeemgegenereerde unieke identificatie." },
        { name: "trajectCode", datatype: "string", cardinality: "0..1", description: "Betekenisvolle code voor het watergangtraject." },
        { name: "geometrie", datatype: "Polygon", cardinality: "1..1", description: "Vlakgeometrie van de watergang als geheel." }
      ],
      relations: [
        { name: "heeftSectie", target: "Watergangsectie", cardinality: "0..*", direction: "uitgaand" },
        { name: "heeftIntersectie", target: "Intersectie", cardinality: "0..*", direction: "uitgaand" },
        { name: "heeftProfiel", target: "Profiel", cardinality: "1..*", direction: "uitgaand" }
      ],
      documents: [
        { title: "Objectdefinitie Watergang", type: "Specificatie" }
      ],
      mappings: [
        { system: "IMBOR 2025", value: "Watergang" },
        { system: "ArcGIS", value: "Feature class: Watergang" }
      ]
    },
    {
      id: "Watergangsectie",
      label: "Watergangsectie",
      type: "Klasse",
      package: "Waterstaatsobject",
      description: "Aaneengesloten lineair deel van een watergang.",
      definition: "Aaneengesloten deel van een watergang waarop onderdelen, bekledingsconstructies en profielen worden geprojecteerd.",
      standard: "WL",
      status: "Voorstel",
      parent: "Watergang",
      properties: [
        { name: "naam", datatype: "string", cardinality: "0..1", description: "Mensleesbare naam van de sectie." },
        { name: "geometrie", datatype: "Polygon", cardinality: "1..1", description: "Vlakgeometrie van de watergangsectie." }
      ],
      relations: [
        { name: "sectieVan", target: "Watergang", cardinality: "1..1", direction: "uitgaand" },
        { name: "heeftOnderdeel", target: "Watergangonderdeel", cardinality: "1..*", direction: "uitgaand" },
        { name: "heeftProfiel", target: "Profiel", cardinality: "0..*", direction: "uitgaand" }
      ],
      documents: [
        { title: "Sectie-opbouw watergang", type: "Specificatie" }
      ],
      mappings: [
        { system: "OTL", value: "Watergangsectie" }
      ]
    },
    {
      id: "Intersectie",
      label: "Intersectie",
      type: "Klasse",
      package: "Waterstaatsobject",
      description: "Kruising of knoop in de watergangstructuur.",
      definition: "Specifiek punt of zone binnen de watergangstructuur waar verbinding, kruising of overgang optreedt.",
      standard: "WL",
      status: "Voorstel",
      parent: "Watergang",
      properties: [
        { name: "geometrie", datatype: "Polygon", cardinality: "1..1", description: "Vlakgeometrie van de intersectie." }
      ],
      relations: [
        { name: "intersectieVan", target: "Watergang", cardinality: "1..1", direction: "uitgaand" }
      ],
      documents: [],
      mappings: [
        { system: "OTL", value: "Intersectie" }
      ]
    },
    {
      id: "Watergangonderdeel",
      label: "Watergangonderdeel",
      type: "Abstracte klasse",
      package: "Watergangopbouw",
      description: "Abstracte klasse voor fysieke onderdelen binnen een watergangsectie.",
      definition: "Abstracte klasse voor bodem en talud binnen de fysieke opbouw van een watergangsectie.",
      standard: "WL",
      status: "Voorstel",
      parent: null,
      properties: [],
      relations: [
        { name: "onderdeelVanSectie", target: "Watergangsectie", cardinality: "1..1", direction: "uitgaand" },
        { name: "heeftBekledingsconstructie", target: "Bekledingsconstructie", cardinality: "1..1", direction: "uitgaand" }
      ],
      documents: [
        { title: "Opbouw fysieke onderdelen", type: "Modelregel" }
      ],
      mappings: [
        { system: "OTL", value: "Watergangonderdeel" }
      ]
    },
    {
      id: "Bodem",
      label: "Bodem",
      type: "Klasse",
      package: "Watergangopbouw",
      description: "Onderste fysiek onderdeel van een watergangsectie.",
      definition: "Fysiek deel van de watergang waar de bodembreedte in een profiel op wordt bepaald.",
      standard: "WL",
      status: "Voorstel",
      parent: "Watergangonderdeel",
      properties: [
        { name: "geometrie", datatype: "Polygon", cardinality: "1..1", description: "Vlakgeometrie van de bodem." }
      ],
      relations: [
        { name: "onderdeelVanSectie", target: "Watergangsectie", cardinality: "1..1", direction: "uitgaand" },
        { name: "heeftBekledingsconstructie", target: "Bekledingsconstructie", cardinality: "1..1", direction: "uitgaand" },
        { name: "wordtGerepresenteerdInProfielDoor", target: "ProfielBodem", cardinality: "0..*", direction: "inkomend" }
      ],
      documents: [
        { title: "Definitie bodem in watergang", type: "Specificatie" }
      ],
      mappings: [
        { system: "OTL", value: "Bodem" }
      ]
    },
    {
      id: "Talud",
      label: "Talud",
      type: "Klasse",
      package: "Watergangopbouw",
      description: "Hellend fysiek onderdeel tussen bodem en maaiveld of insteek.",
      definition: "Fysiek hellend onderdeel tussen bodem en maaiveld of insteek.",
      standard: "WL",
      status: "Voorstel",
      parent: "Watergangonderdeel",
      properties: [
        { name: "geometrie", datatype: "Polygon", cardinality: "1..1", description: "Vlakgeometrie van het talud." }
      ],
      relations: [
        { name: "onderdeelVanSectie", target: "Watergangsectie", cardinality: "1..1", direction: "uitgaand" },
        { name: "heeftBekledingsconstructie", target: "Bekledingsconstructie", cardinality: "1..1", direction: "uitgaand" },
        { name: "wordtGerepresenteerdInProfielDoor", target: "ProfielTalud", cardinality: "0..*", direction: "inkomend" }
      ],
      documents: [
        { title: "Definitie talud in watergang", type: "Specificatie" }
      ],
      mappings: [
        { system: "OTL", value: "Talud" }
      ]
    },
    {
      id: "Bekledingsconstructie",
      label: "Bekledingsconstructie",
      type: "Klasse",
      package: "Bekleding",
      description: "Constructieve lagenopbouw gekoppeld aan een watergangonderdeel.",
      definition: "Constructieve lagenopbouw van een onderdeel, inclusief toplaag.",
      standard: "WL",
      status: "Voorstel",
      parent: null,
      properties: [],
      relations: [
        { name: "bekledingVan", target: "Watergangonderdeel", cardinality: "1..1", direction: "uitgaand" },
        { name: "heeftLaag", target: "Bekledingslaag", cardinality: "1..*", direction: "uitgaand" },
        { name: "heeftToplaag", target: "Toplaag", cardinality: "1..1", direction: "uitgaand" }
      ],
      documents: [
        { title: "Constructieve laagopbouw", type: "Specificatie" }
      ],
      mappings: [
        { system: "OTL", value: "Bekledingsconstructie" }
      ]
    },
    {
      id: "Bekledingslaag",
      label: "Bekledingslaag",
      type: "Klasse",
      package: "Bekleding",
      description: "Algemene laag binnen een bekledingsconstructie.",
      definition: "Algemene laag in de constructieve opbouw van een bekledingsconstructie.",
      standard: "WL",
      status: "Voorstel",
      parent: null,
      properties: [
        { name: "volgorde", datatype: "integer", cardinality: "0..1", description: "Volgorde van de laag in de opbouw." }
      ],
      relations: [
        { name: "laagVan", target: "Bekledingsconstructie", cardinality: "1..1", direction: "uitgaand" }
      ],
      documents: [],
      mappings: [
        { system: "OTL", value: "Bekledingslaag" }
      ]
    },
    {
      id: "Toplaag",
      label: "Toplaag",
      type: "Klasse",
      package: "Bekleding",
      description: "Zichtbare bovenste laag van een bekledingsconstructie.",
      definition: "Zichtbare bovenste fysieke laag waaraan een verschijningsvorm is gekoppeld en die geografisch wordt gerepresenteerd door een Terreindeel.",
      standard: "WL",
      status: "Voorstel",
      parent: "Bekledingslaag",
      properties: [
        { name: "verschijningsvorm", datatype: "referentie", cardinality: "1..1", description: "Typologie van het zichtbare voorkomen van de toplaag." }
      ],
      relations: [
        { name: "toplaagVan", target: "Bekledingsconstructie", cardinality: "1..1", direction: "uitgaand" },
        { name: "wordtGerepresenteerdDoor", target: "Terreindeel", cardinality: "0..*", direction: "inkomend" }
      ],
      documents: [
        { title: "Regel zichtbare toplaag", type: "Modelregel" }
      ],
      mappings: [
        { system: "OTL", value: "Toplaag" }
      ]
    },
    {
      id: "Terreindeel",
      label: "Terreindeel",
      type: "Klasse",
      package: "Geo-representatie",
      description: "Geografisch vlakobject dat de toplaag representeert in het kaartbeeld.",
      definition: "Geografisch object dat de representatie van een toplaag in het kaartbeeld vormt en beschrijft wat aan de oppervlakte zichtbaar is.",
      standard: "NEN3610 / WL",
      status: "Voorstel",
      parent: null,
      properties: [
        { name: "geometrie", datatype: "Polygon", cardinality: "1..1", description: "Topografische vlakgeometrie." },
        { name: "verschijningsvorm", datatype: "referentie", cardinality: "1..1", description: "Typologie van het zichtbare voorkomen in de geo-representatie." }
      ],
      relations: [
        { name: "representeertToplaag", target: "Toplaag", cardinality: "1..1", direction: "uitgaand" }
      ],
      documents: [
        { title: "Geo-object Terreindeel", type: "Specificatie" }
      ],
      mappings: [
        { system: "NEN3610", value: "GeografischObject / vlak" }
      ]
    },
    {
      id: "Profiel",
      label: "Profiel",
      type: "Klasse",
      package: "Profielen",
      description: "Informatieobject dat de dwarsdoorsnede van een watergang of sectie beschrijft.",
      definition: "Informatieve doorsnede met onderdelen zoals insteek, talud, teen, bodem en einde profiel.",
      standard: "WL",
      status: "Voorstel",
      parent: null,
      properties: [
        { name: "bodembreedte", datatype: "decimal", cardinality: "0..1", description: "Breedte van de bodem in de beschreven dwarsdoorsnede." },
        { name: "breedteklasseWatergang", datatype: "codelijst", cardinality: "0..1", description: "Klasse-indeling op basis van de breedte in het profiel." }
      ],
      relations: [
        { name: "beschrijftWatergang", target: "Watergang", cardinality: "0..1", direction: "uitgaand" },
        { name: "beschrijftWatergangsectie", target: "Watergangsectie", cardinality: "0..1", direction: "uitgaand" },
        { name: "heeftProfielonderdeel", target: "Profielonderdeel", cardinality: "1..*", direction: "uitgaand" }
      ],
      documents: [
        { title: "Profieldefinitie en doorsnede", type: "Specificatie" }
      ],
      mappings: [
        { system: "OTL", value: "Profiel" }
      ]
    },
    {
      id: "Profielonderdeel",
      label: "Profielonderdeel",
      type: "Abstracte klasse",
      package: "Profielen",
      description: "Abstracte klasse voor objecten die in de dwarsdoorsnede worden onderscheiden.",
      definition: "Abstracte klasse voor objecten die in de dwarsdoorsnede worden onderscheiden.",
      standard: "WL",
      status: "Voorstel",
      parent: null,
      properties: [],
      relations: [
        { name: "onderdeelVanProfiel", target: "Profiel", cardinality: "1..1", direction: "inkomend" },
        { name: "ligtInDwarsdoorsnedeOp", target: "Watergangonderdeel", cardinality: "0..1", direction: "uitgaand" }
      ],
      documents: [],
      mappings: [
        { system: "OTL", value: "Profielonderdeel" }
      ]
    },
    {
      id: "ProfielBodem",
      label: "ProfielBodem",
      type: "Klasse",
      package: "Profielen",
      description: "Profielonderdeel dat de bodem in de dwarsdoorsnede representeert.",
      definition: "Profielonderdeel dat de bodem in de dwarsdoorsnede representeert.",
      standard: "WL",
      status: "Voorstel",
      parent: "Profielonderdeel",
      properties: [],
      relations: [
        { name: "ligtInDwarsdoorsnedeOp", target: "Bodem", cardinality: "0..1", direction: "uitgaand" }
      ],
      documents: [],
      mappings: [
        { system: "OTL", value: "ProfielBodem" }
      ]
    },
    {
      id: "ProfielTalud",
      label: "ProfielTalud",
      type: "Klasse",
      package: "Profielen",
      description: "Profielonderdeel dat een fysiek talud in de dwarsdoorsnede representeert.",
      definition: "Profielonderdeel dat een fysiek talud in de dwarsdoorsnede representeert.",
      standard: "WL",
      status: "Voorstel",
      parent: "Profielonderdeel",
      properties: [],
      relations: [
        { name: "ligtInDwarsdoorsnedeOp", target: "Talud", cardinality: "0..1", direction: "uitgaand" }
      ],
      documents: [],
      mappings: [
        { system: "OTL", value: "ProfielTalud" }
      ]
    },
    {
      id: "Verschijningsvorm",
      label: "Verschijningsvorm",
      type: "Abstracte klasse",
      package: "Typologie",
      description: "Typologielaag voor het zichtbare voorkomen van een toplaag.",
      definition: "Typologielaag voor zichtbaar voorkomen, onder meer gebruikt voor OTL, geo-representatie en beheerinformatie.",
      standard: "IMBOR 2025 / WL",
      status: "Definitief",
      parent: null,
      properties: [],
      relations: [
        { name: "toegepastOpRepresentatie", target: "Terreindeel", cardinality: "0..*", direction: "inkomend" }
      ],
      documents: [
        { title: "Typologieregels verschijningsvorm", type: "Specificatie" }
      ],
      mappings: [
        { system: "OTL", value: "Verschijningsvorm" }
      ]
    },
    {
      id: "BloemrijkNatteRuigte",
      label: "Bloemrijk natte ruigte",
      type: "Klasse",
      package: "Typologie",
      description: "Verschijningsvorm voor bloemrijke natte ruigtevegetatie.",
      definition: "Typologische klasse voor natte ruigte met bloemrijke vegetatie.",
      standard: "WL",
      status: "Voorstel",
      parent: "Verschijningsvorm",
      properties: [],
      relations: [],
      documents: [],
      mappings: [
        { system: "OTL", value: "Bloemrijk natte ruigte" }
      ]
    },
    {
      id: "Bos",
      label: "Bos",
      type: "Klasse",
      package: "Typologie",
      description: "Verschijningsvorm voor gesloten boomvegetatie.",
      definition: "Typologische klasse voor een min of meer gesloten geheel van bomen.",
      standard: "WL / IMBOR 2025",
      status: "Definitief",
      parent: "Verschijningsvorm",
      properties: [],
      relations: [],
      documents: [],
      mappings: [
        { system: "OTL", value: "Bos" }
      ]
    },
    {
      id: "Bosplantsoen",
      label: "Bosplantsoen",
      type: "Klasse",
      package: "Typologie",
      description: "Verschijningsvorm voor aangeplant bosplantsoen.",
      definition: "Typologische klasse voor plantsoenmatig aangeplante houtige beplanting.",
      standard: "WL",
      status: "Voorstel",
      parent: "Verschijningsvorm",
      properties: [],
      relations: [],
      documents: [],
      mappings: [
        { system: "OTL", value: "Bosplantsoen" }
      ]
    },
    {
      id: "Doorstroommoeras",
      label: "Doorstroommoeras",
      type: "Klasse",
      package: "Typologie",
      description: "Verschijningsvorm voor een doorstroomd moeras.",
      definition: "Typologische klasse voor moerasvegetatie met doorstromend water.",
      standard: "WL",
      status: "Voorstel",
      parent: "Verschijningsvorm",
      properties: [],
      relations: [],
      documents: [],
      mappings: [
        { system: "OTL", value: "Doorstroommoeras" }
      ]
    },
    {
      id: "DotterbloemhooilandDroog",
      label: "Dotterbloemhooiland droog",
      type: "Klasse",
      package: "Typologie",
      description: "Verschijningsvorm voor het droge subtype van dotterbloemhooiland.",
      definition: "Typologische klasse voor relatief droog dotterbloemhooiland.",
      standard: "WL",
      status: "Voorstel",
      parent: "Verschijningsvorm",
      properties: [],
      relations: [],
      documents: [],
      mappings: [
        { system: "OTL", value: "Dotterbloemhooiland droog" }
      ]
    },
    {
      id: "DotterbloemhooilandNat",
      label: "Dotterbloemhooiland nat",
      type: "Klasse",
      package: "Typologie",
      description: "Verschijningsvorm voor het natte subtype van dotterbloemhooiland.",
      definition: "Typologische klasse voor nat dotterbloemhooiland.",
      standard: "WL",
      status: "Voorstel",
      parent: "Verschijningsvorm",
      properties: [],
      relations: [],
      documents: [],
      mappings: [
        { system: "OTL", value: "Dotterbloemhooiland nat" }
      ]
    },
    {
      id: "GazonExtensief",
      label: "Gazon extensief",
      type: "Klasse",
      package: "Typologie",
      description: "Verschijningsvorm voor extensief beheerd gazon.",
      definition: "Typologische klasse voor extensief beheerd grasoppervlak.",
      standard: "WL",
      status: "Voorstel",
      parent: "Verschijningsvorm",
      properties: [],
      relations: [],
      documents: [],
      mappings: [
        { system: "OTL", value: "Gazon extensief" }
      ]
    },
    {
      id: "Glanshaverhooilanden",
      label: "Glanshaverhooilanden",
      type: "Klasse",
      package: "Typologie",
      description: "Verschijningsvorm voor glanshaverhooilanden.",
      definition: "Typologische klasse voor graslanden gedomineerd door glanshavervegetatie.",
      standard: "WL",
      status: "Voorstel",
      parent: "Verschijningsvorm",
      properties: [],
      relations: [],
      documents: [],
      mappings: [
        { system: "OTL", value: "Glanshaverhooilanden" }
      ]
    },
    {
      id: "GrasEnKruidachtigen",
      label: "Gras en kruidachtigen",
      type: "Klasse",
      package: "Typologie",
      description: "Verschijningsvorm voor gras- en kruidachtige vegetatie.",
      definition: "Typologische klasse voor oppervlakken met gras en kruidachtige vegetatie.",
      standard: "WL / IMBOR 2025",
      status: "Definitief",
      parent: "Verschijningsvorm",
      properties: [],
      relations: [],
      documents: [],
      mappings: [
        { system: "OTL", value: "Gras en kruidachtigen" }
      ]
    },
    {
      id: "HeischraalGrasland",
      label: "Heischraal grasland",
      type: "Klasse",
      package: "Typologie",
      description: "Verschijningsvorm voor heischraal grasland.",
      definition: "Typologische klasse voor schraal grasland met heide-invloed.",
      standard: "WL",
      status: "Voorstel",
      parent: "Verschijningsvorm",
      properties: [],
      relations: [],
      documents: [],
      mappings: [
        { system: "OTL", value: "Heischraal grasland" }
      ]
    },
    {
      id: "Houtsingel",
      label: "Houtsingel",
      type: "Klasse",
      package: "Typologie",
      description: "Verschijningsvorm voor lijnvormige houtige beplanting.",
      definition: "Typologische klasse voor een lijnvormige strook met houtige beplanting.",
      standard: "WL",
      status: "Voorstel",
      parent: "Verschijningsvorm",
      properties: [],
      relations: [],
      documents: [],
      mappings: [
        { system: "OTL", value: "Houtsingel" }
      ]
    },
    {
      id: "LosseHaag",
      label: "Losse haag",
      type: "Klasse",
      package: "Typologie",
      description: "Verschijningsvorm voor een losse haagstructuur.",
      definition: "Typologische klasse voor een niet-gesloten haag van struiken of kleine bomen.",
      standard: "WL",
      status: "Voorstel",
      parent: "Verschijningsvorm",
      properties: [],
      relations: [],
      documents: [],
      mappings: [
        { system: "OTL", value: "Losse haag" }
      ]
    },
    {
      id: "Moeras",
      label: "Moeras",
      type: "Klasse",
      package: "Typologie",
      description: "Verschijningsvorm voor moerasvegetatie.",
      definition: "Typologische klasse voor natte, moerasachtige vegetatie.",
      standard: "WL",
      status: "Voorstel",
      parent: "Verschijningsvorm",
      properties: [],
      relations: [],
      documents: [],
      mappings: [
        { system: "OTL", value: "Moeras" }
      ]
    },
    {
      id: "BreedteklasseWatergangCodelijst",
      label: "Codelijst Breedteklasse Watergang",
      type: "Codelijst",
      package: "Profielen",
      description: "Waardenlijst voor breedteklasse van een profiel.",
      definition: "Codelijst met toegestane waarden voor breedteklasseWatergang als classificerende eigenschap van Profiel.",
      standard: "IMBOR 2025",
      status: "Definitief",
      parent: null,
      properties: [],
      relations: [
        { name: "waardeVoor", target: "Profiel", cardinality: "0..*", direction: "inkomend" }
      ],
      documents: [],
      mappings: [
        { system: "IMBOR 2025", value: "Breedteklasse Watergang codelijst" }
      ]
    }
  ];

  var nodesById = {};
  var searchInput = viewer.querySelector("[data-otl-search]");
  var tree = viewer.querySelector("[data-otl-tree]");
  var trail = viewer.querySelector("[data-otl-trail]");
  var graphContainer = document.querySelector("[data-otl-graph]");
  var graphStatus = document.querySelector("[data-otl-graph-status]");
  var graphSelected = document.querySelector("[data-otl-graph-selected]");
  var graphScope = document.querySelector("[data-otl-graph-scope]");
  var reactodiaOverlay = document.querySelector("[data-otl-reactodia-overlay]");
  var reactodiaStage = document.querySelector("[data-otl-reactodia-stage]");
  var reactodiaStatus = document.querySelector("[data-otl-reactodia-status]");
  var reactodiaOpenButton = document.querySelector("[data-otl-reactodia-open]");
  var reactodiaCloseButton = document.querySelector("[data-otl-reactodia-close]");
  var statNodes = document.querySelector("[data-otl-stat='nodes']");
  var statPackages = document.querySelector("[data-otl-stat='packages']");
  var selectedId = "Toplaag";
  var logicalTree = [
    {
      id: "block-watergang",
      label: "1. Watergang",
      roots: ["Watergang"]
    },
    {
      id: "block-watergangonderdeel",
      label: "2. Watergangonderdeel",
      roots: ["Watergangonderdeel"]
    },
    {
      id: "block-bekleding",
      label: "3. Bekledingsconstructie",
      roots: ["Bekledingsconstructie"]
    },
    {
      id: "block-profiel",
      label: "4. Profiel",
      roots: ["Profiel"]
    },
    {
      id: "block-verschijningsvorm",
      label: "5. Verschijningsvorm",
      roots: ["Verschijningsvorm"]
    },
    {
      id: "block-codelijsten",
      label: "6. Codelijsten",
      roots: ["BreedteklasseWatergangCodelijst"]
    }
  ];
  var logicalChildren = {
    Watergang: ["Watergangsectie", "Intersectie"],
    Watergangonderdeel: ["Bodem", "Talud"],
    Bekledingsconstructie: ["Bekledingslaag", "Toplaag", "Terreindeel"],
    Profiel: ["Profielonderdeel"],
    Profielonderdeel: ["ProfielBodem", "ProfielTalud"],
    Verschijningsvorm: [
      "BloemrijkNatteRuigte",
      "Bos",
      "Bosplantsoen",
      "Doorstroommoeras",
      "DotterbloemhooilandDroog",
      "DotterbloemhooilandNat",
      "GazonExtensief",
      "Glanshaverhooilanden",
      "GrasEnKruidachtigen",
      "HeischraalGrasland",
      "Houtsingel",
      "LosseHaag",
      "Moeras"
    ]
  };
  var displayNumbers = {
    Watergang: "1.",
    Watergangsectie: "1.1.",
    Intersectie: "1.2.",
    Watergangonderdeel: "2.",
    Bodem: "1.3.1.",
    Talud: "1.3.2.",
    Bekledingsconstructie: "3.",
    Bekledingslaag: "3.1.",
    Toplaag: "3.2.",
    Terreindeel: "3.3.",
    Profiel: "4.",
    Profielonderdeel: "4.1.",
    ProfielBodem: "4.1.1.",
    ProfielTalud: "4.1.2.",
    Verschijningsvorm: "5.",
    BloemrijkNatteRuigte: "5.1.",
    Bos: "5.2.",
    Bosplantsoen: "5.3.",
    Doorstroommoeras: "5.4.",
    DotterbloemhooilandDroog: "5.5.",
    DotterbloemhooilandNat: "5.6.",
    GazonExtensief: "5.7.",
    Glanshaverhooilanden: "5.8.",
    GrasEnKruidachtigen: "5.9.",
    HeischraalGrasland: "5.10.",
    Houtsingel: "5.11.",
    LosseHaag: "5.12.",
    Moeras: "5.13.",
    BreedteklasseWatergangCodelijst: "6.1."
  };
  var graphSemantics = {
    Watergang: {
      parentLabel: null,
      childLabels: {
        Watergangsectie: "heeft sectie",
        Intersectie: "heeft intersectie"
      },
      contextRelations: []
    },
    Watergangsectie: {
      parentLabel: "onderdeel van",
      childLabels: {
        Watergangonderdeel: "bestaat uit"
      },
      contextRelations: [
        { target: "Intersectie", label: "kruist in" }
      ]
    },
    Intersectie: {
      parentLabel: "onderdeel van",
      childLabels: {},
      contextRelations: [
        { target: "Watergangsectie", label: "kruising van" }
      ]
    },
    Watergangonderdeel: {
      parentLabel: "onderdeel van",
      childLabels: {
        Bodem: "type onderdeel",
        Talud: "type onderdeel"
      },
      contextRelations: [
        { target: "Bekledingsconstructie", label: "heeft bekledingsconstructie" }
      ]
    },
    Bodem: {
      parentLabel: "onderdeel van",
      childLabels: {},
      contextRelations: [
        { target: "Bekledingsconstructie", label: "heeft bekledingsconstructie" }
      ]
    },
    Talud: {
      parentLabel: "onderdeel van",
      childLabels: {},
      contextRelations: [
        { target: "Bekledingsconstructie", label: "heeft bekledingsconstructie" }
      ]
    },
    Bekledingsconstructie: {
      parentLabel: "onderdeel van",
      childLabels: {
        Bekledingslaag: "heeft laag",
        Toplaag: "heeft toplaag"
      },
      contextRelations: []
    },
    Toplaag: {
      parentLabel: "onderdeel van",
      childLabels: {},
      contextRelations: [
        { target: "Terreindeel", label: "wordt gerepresenteerd door" },
        { target: "Verschijningsvorm", label: "heeft verschijningsvorm" }
      ]
    },
    Verschijningsvorm: {
      parentLabel: null,
      childLabels: {
        BloemrijkNatteRuigte: "type verschijningsvorm",
        Bos: "type verschijningsvorm",
        Bosplantsoen: "type verschijningsvorm",
        Doorstroommoeras: "type verschijningsvorm",
        DotterbloemhooilandDroog: "type verschijningsvorm",
        DotterbloemhooilandNat: "type verschijningsvorm",
        GazonExtensief: "type verschijningsvorm",
        Glanshaverhooilanden: "type verschijningsvorm",
        GrasEnKruidachtigen: "type verschijningsvorm",
        HeischraalGrasland: "type verschijningsvorm",
        Houtsingel: "type verschijningsvorm",
        LosseHaag: "type verschijningsvorm",
        Moeras: "type verschijningsvorm"
      },
      contextRelations: []
    },
    Profiel: {
      parentLabel: null,
      childLabels: {
        Profielonderdeel: "heeft profielonderdeel"
      },
      contextRelations: [
        { target: "Watergang", label: "beschrijft" },
        { target: "Watergangsectie", label: "beschrijft" },
        { target: "BreedteklasseWatergangCodelijst", label: "gebruikt codelijst" }
      ]
    }
  };

  nodes.forEach(function (node) {
    nodesById[node.id] = node;
  });

  function packageGroups(list) {
    var grouped = {};

    list.forEach(function (node) {
      if (!grouped[node.package]) {
        grouped[node.package] = [];
      }

      grouped[node.package].push(node);
    });

    return Object.keys(grouped).sort().map(function (pkg) {
      grouped[pkg].sort(function (a, b) {
        return a.label.localeCompare(b.label);
      });

      return {
        name: pkg,
        items: grouped[pkg]
      };
    });
  }

  function childrenOf(nodeId, list) {
    var configured = logicalChildren[nodeId] || [];

    return configured.map(function (childId) {
      return nodesById[childId];
    }).filter(function (node) {
      return node && list.map(function (item) { return item.id; }).indexOf(node.id) !== -1;
    });
  }

  function lineage(node) {
    var result = [];
    var current = node;

    while (current) {
      result.unshift(current);
      current = current.parent ? nodesById[current.parent] : null;
    }

    return result;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatNodeLabel(node) {
    var prefix = displayNumbers[node.id];
    return prefix ? prefix + " " + node.label : node.label;
  }

  function escapeSvg(value) {
    return escapeHtml(value);
  }

  function buildSemanticGraphData(selected) {
    var lineageNodes = selected ? treeLineage(selected.id).map(function (id) { return nodesById[id]; }).filter(Boolean) : [];
    var ancestorNodes = lineageNodes.slice(0, -1);
    var childNodes = selected ? childrenOf(selected.id, nodes) : [];
    var contextNodes = [];
    var outgoingRelationNodes = [];
    var incomingRelationNodes = [];
    var propertyNodes = selected ? (selected.properties || []) : [];
    var documentNodes = selected ? (selected.documents || []) : [];
    var reservedNodeIds = {};
    var relationLabels = {};
    var semantics = selected ? (graphSemantics[selected.id] || {}) : {};

    if (selected) {
      contextNodes = (semantics.contextRelations || []).map(function (entry) {
        return {
          node: nodesById[entry.target],
          label: entry.label
        };
      }).filter(function (entry) {
        return entry.node;
      });

      reservedNodeIds[selected.id] = true;
      ancestorNodes.forEach(function (node) {
        reservedNodeIds[node.id] = true;
      });
      childNodes.forEach(function (node) {
        reservedNodeIds[node.id] = true;
      });
      contextNodes.forEach(function (entry) {
        reservedNodeIds[entry.node.id] = true;
      });

      (selected.relations || []).forEach(function (relation) {
        var targetNode = nodesById[relation.target];

        if (targetNode && !reservedNodeIds[targetNode.id] && !relationLabels["out_" + targetNode.id]) {
          relationLabels["out_" + targetNode.id] = relation.name;
          outgoingRelationNodes.push(targetNode);
        }
      });

      nodes.forEach(function (node) {
        (node.relations || []).forEach(function (relation) {
          if (relation.target === selected.id && !reservedNodeIds[node.id] && !relationLabels["in_" + node.id]) {
            relationLabels["in_" + node.id] = relation.name;
            incomingRelationNodes.push(node);
          }
        });
      });
    }

    return {
      selected: selected,
      semantics: semantics,
      ancestors: ancestorNodes,
      children: childNodes,
      contexts: contextNodes,
      outgoingRelations: outgoingRelationNodes,
      incomingRelations: incomingRelationNodes,
      properties: propertyNodes,
      documents: documentNodes,
      relationLabels: relationLabels
    };
  }

  function renderGraph(selected) {
    if (!graphContainer) {
      return;
    }

    var positions = {};
    var edges = [];
    var width = 1180;
    var graphData = buildSemanticGraphData(selected);
    var ancestorNodes = graphData.ancestors;
    var childNodes = graphData.children;
    var contextNodes = graphData.contexts;
    var outgoingRelationNodes = graphData.outgoingRelations;
    var incomingRelationNodes = graphData.incomingRelations;
    var propertyNodes = graphData.properties;
    var documentNodes = graphData.documents;
    var relationLabels = graphData.relationLabels;
    var baseHeight;
    var height;
    var centerX = 390;
    var centerY;
    var leftX = 40;
    var rightX = 740;
    var bottomX = 740;
    var semantics = graphData.semantics;

    function nodeTone(node, fallbackType) {
      var type = node ? node.type : fallbackType;

      if (type === "Abstracte klasse") {
        return { fill: "#f2fbfd", stroke: "#00a9c1" };
      }

      if (type === "Codelijst") {
        return { fill: "#eefafb", stroke: "#00a9c1" };
      }

      return { fill: "#ffffff", stroke: "#dde2d7" };
    }

    function placeNode(id, label, kind, x, y, tone) {
      positions[id] = { x: x, y: y, width: 260, height: 58 };
      return '' +
        '<g class="otl-graph-node" data-node-id="' + escapeSvg(id) + '" tabindex="0" role="button">' +
        '<rect x="' + x + '" y="' + y + '" width="260" height="58" fill="' + tone.fill + '" stroke="' + tone.stroke + '" stroke-width="2"></rect>' +
        '<text x="' + (x + 12) + '" y="' + (y + 23) + '" fill="#102321" font-size="14" font-weight="700">' + escapeSvg(label) + '</text>' +
        '<text x="' + (x + 12) + '" y="' + (y + 41) + '" fill="#66746d" font-size="11">' + escapeSvg(kind) + '</text>' +
        '</g>';
    }

    function addEdge(fromId, toId, label, tone) {
      var from = positions[fromId];
      var to = positions[toId];
      var startX;
      var endX;
      var startY;
      var endY;
      var midX;

      if (!from || !to) {
        return "";
      }

      startY = from.y + (from.height / 2);
      endY = to.y + (to.height / 2);

      if (to.x >= from.x) {
        startX = from.x + from.width;
        endX = to.x;
      } else {
        startX = from.x;
        endX = to.x + to.width;
      }

      midX = Math.round((startX + endX) / 2);

      return '' +
        '<path d="M ' + startX + ' ' + startY + ' C ' + midX + ' ' + startY + ', ' + midX + ' ' + endY + ', ' + endX + ' ' + endY + '" fill="none" stroke="' + tone + '" stroke-width="2" marker-end="url(#otl-arrow)"></path>' +
        '<text x="' + midX + '" y="' + (Math.round((startY + endY) / 2) - 6) + '" fill="' + tone + '" font-size="11" text-anchor="middle">' + escapeSvg(label) + '</text>';
    }

    if (graphSelected) {
      graphSelected.textContent = selected ? formatNodeLabel(selected) : "Geen selectie";
    }

    baseHeight = Math.max(
      ancestorNodes.length,
      contextNodes.length,
      Math.max(propertyNodes.length, documentNodes.length),
      outgoingRelationNodes.length + incomingRelationNodes.length,
      1
    );
    height = Math.max(360, 180 + baseHeight * 88);
    centerY = Math.round(height / 2) - 29;

    if (graphScope) {
      graphScope.textContent = selected
        ? ancestorNodes.length + " boomcontext, " + contextNodes.length + " contextrelaties, " + childNodes.length + " deelobjecten, " + (outgoingRelationNodes.length + incomingRelationNodes.length) + " relaties, " + propertyNodes.length + " attributen, " + documentNodes.length + " documenten"
        : "Geen graphdata";
    }

    if (!selected) {
      if (graphStatus) {
        graphStatus.hidden = false;
        graphStatus.textContent = "Geen graphdata beschikbaar.";
      } else {
        graphContainer.innerHTML = '<div class="otl-graph-status" data-otl-graph-status>Geen graphdata beschikbaar.</div>';
        graphStatus = graphContainer.querySelector("[data-otl-graph-status]");
      }
      return;
    }

    var svg = '' +
      '<svg class="otl-fallback-graph" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="Knowledge graph">' +
      '<defs><marker id="otl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#007f91"></path></marker></defs>';

    svg += placeNode(selected.id, formatNodeLabel(selected), selected.type, centerX, centerY, {
      fill: "#e4f7fa",
      stroke: "#00a9c1"
    });

    ancestorNodes.forEach(function (node, index) {
      var y = 36 + (index * 72);
      svg += placeNode(node.id, formatNodeLabel(node), node.type, leftX, y, nodeTone(node));

      if (index < ancestorNodes.length - 1) {
        edges.push(addEdge(node.id, ancestorNodes[index + 1].id, "onderdeel in boom", "#007f91"));
      } else {
        edges.push(addEdge(node.id, selected.id, semantics.parentLabel || "onderdeel in boom", "#007f91"));
      }
    });

    contextNodes.forEach(function (node, index) {
      var y = Math.max(centerY + 96, 132 + (index * 72));
      svg += placeNode(node.node.id, formatNodeLabel(node.node), node.node.type, leftX, y, nodeTone(node.node));
      edges.push(addEdge(selected.id, node.node.id, node.label, "#007f91"));
    });

    childNodes.forEach(function (node, index) {
      var y = Math.max(centerY + 96, 132 + ((contextNodes.length + index) * 72));
      svg += placeNode(node.id, formatNodeLabel(node), node.type, leftX, y, nodeTone(node));
      edges.push(addEdge(selected.id, node.id, (semantics.childLabels && semantics.childLabels[node.id]) || "heeft deelobject", "#007f91"));
    });

    outgoingRelationNodes.forEach(function (targetNode, index) {
      var relationName = relationLabels["out_" + targetNode.id];
      svg += placeNode(targetNode.id, formatNodeLabel(targetNode), targetNode.type, rightX, 36 + (index * 72), nodeTone(targetNode));
      edges.push(addEdge(selected.id, targetNode.id, relationName, "#00a9c1"));
    });

    incomingRelationNodes.forEach(function (sourceNode, index) {
      var relationName = relationLabels["in_" + sourceNode.id];
      var y = Math.max(centerY + 96, 36 + ((outgoingRelationNodes.length + index) * 72));
      svg += placeNode(sourceNode.id, formatNodeLabel(sourceNode), sourceNode.type, rightX, y, nodeTone(sourceNode));
      edges.push(addEdge(sourceNode.id, selected.id, relationName, "#00a9c1"));
    });

    propertyNodes.forEach(function (property, index) {
      var propertyId = selected.id + "_property_" + index;
      positions[propertyId] = { x: bottomX, y: height - 126 - (index * 42), width: 260, height: 34 };
      svg += '' +
        '<g class="otl-graph-property">' +
        '<rect x="' + bottomX + '" y="' + (height - 126 - (index * 42)) + '" width="260" height="34" fill="#eefafb" stroke="#00a9c1"></rect>' +
        '<text x="' + (bottomX + 10) + '" y="' + (height - 104 - (index * 42)) + '" fill="#102321" font-size="12" font-weight="700">' + escapeSvg(property.name) + '</text>' +
        '</g>';
      edges.push(addEdge(selected.id, propertyId, "attribuut", "#00a9c1"));
    });

    documentNodes.forEach(function (documentNode, index) {
      var documentId = selected.id + "_document_" + index;
      positions[documentId] = { x: bottomX, y: height - 126 - ((propertyNodes.length + index) * 42), width: 260, height: 34 };
      svg += '' +
        '<g class="otl-graph-property">' +
        '<rect x="' + bottomX + '" y="' + (height - 126 - ((propertyNodes.length + index) * 42)) + '" width="260" height="34" fill="#f2fbfd" stroke="#00a9c1"></rect>' +
        '<text x="' + (bottomX + 10) + '" y="' + (height - 104 - ((propertyNodes.length + index) * 42)) + '" fill="#102321" font-size="12" font-weight="700">' + escapeSvg(documentNode.title) + '</text>' +
        '</g>';
      edges.push(addEdge(selected.id, documentId, "document", "#007f91"));
    });

    edges.forEach(function (edge) {
      svg += edge;
    });

    svg += "</svg>";

    graphContainer.innerHTML = svg;
    Array.prototype.forEach.call(graphContainer.querySelectorAll("[data-node-id]"), function (item) {
      var nodeId = item.getAttribute("data-node-id");

      item.addEventListener("click", function () {
        if (nodesById[nodeId]) {
          selectedId = nodeId;
          render();
        }
      });

      item.addEventListener("keydown", function (event) {
        if ((event.key === "Enter" || event.key === " ") && nodesById[nodeId]) {
          event.preventDefault();
          selectedId = nodeId;
          render();
        }
      });
    });

    graphStatus = null;
  }

  function treeParentOf(nodeId) {
    var parentId = null;

    Object.keys(logicalChildren).some(function (candidate) {
      if (logicalChildren[candidate].indexOf(nodeId) !== -1) {
        parentId = candidate;
        return true;
      }

      return false;
    });

    return parentId;
  }

  function treeLineage(nodeId) {
    var path = [];
    var currentId = nodeId;

    while (currentId) {
      path.unshift(currentId);
      currentId = treeParentOf(currentId);
    }

    return path;
  }

  function visibleIdsForQuery(query) {
    var ids = new Set();
    var normalized = query.trim().toLowerCase();

    if (!normalized) {
      nodes.forEach(function (node) {
        ids.add(node.id);
      });
      return ids;
    }

    nodes.forEach(function (node) {
      var haystack = [node.label, node.id, node.package, node.description, node.standard].join(" ").toLowerCase();
      if (haystack.indexOf(normalized) !== -1) {
        ids.add(node.id);
        treeLineage(node.id).forEach(function (ancestorId) {
          ids.add(ancestorId);
        });
      }
    });

    return ids;
  }

  function renderTree(filtered, visibleIds) {
    var groups = logicalTree;

    tree.innerHTML = "";

    if (!groups.length) {
      tree.innerHTML = '<div class="empty-state"><p>Geen klassen gevonden voor deze zoekterm.</p></div>';
      return;
    }

    groups.forEach(function (group) {
      var section = document.createElement("section");
      section.className = "otl-package";

      var packageDisclosure = document.createElement("details");
      packageDisclosure.className = "otl-package-disclosure";
      packageDisclosure.open = true;

      var heading = document.createElement("summary");
      heading.className = "otl-package-summary";
      heading.textContent = group.name;
      packageDisclosure.appendChild(heading);

      var list = document.createElement("ul");
      list.className = "otl-node-list";

      var roots = group.roots.map(function (rootId) {
        return nodesById[rootId];
      }).filter(function (node) {
        return node && visibleIds.has(node.id);
      });

      roots.forEach(function (node) {
        list.appendChild(renderTreeNode(node, filtered, visibleIds));
      });

      if (!roots.length) {
        list.innerHTML = '<li><p class="otl-tree-note">Geen zichtbare knopen in deze tak voor de huidige zoekterm.</p></li>';
      }

      packageDisclosure.appendChild(list);
      section.appendChild(packageDisclosure);
      tree.appendChild(section);
    });

    if (!Array.prototype.some.call(tree.querySelectorAll(".otl-node-button"), function () { return true; })) {
      tree.innerHTML = '<div class="empty-state"><p>Geen klassen gevonden voor deze zoekterm.</p></div>';
    }
  }

  function renderTreeNode(node, filtered, visibleIds) {
    var item = document.createElement("li");
    var descendants = childrenOf(node.id, filtered).filter(function (child) {
      return visibleIds.has(child.id);
    });
    var hasChildren = descendants.length > 0;
    var container = hasChildren ? document.createElement("details") : document.createElement("div");
    var header = hasChildren ? document.createElement("summary") : document.createElement("div");
    var nestedList;
    var button = document.createElement("button");

    if (hasChildren) {
      container.className = "otl-node-disclosure";
      container.open = selectedId === node.id || treeLineage(selectedId).indexOf(node.id) !== -1;
      header.className = "otl-node-summary";
    } else {
      container.className = "otl-node-leaf";
      header.className = "otl-node-summary";
    }

    button.type = "button";
    button.className = "otl-node-button";

    if (node.id === selectedId) {
      button.setAttribute("aria-current", "true");
    }

    button.innerHTML =
          '<span class="otl-node-label">' + escapeHtml(formatNodeLabel(node)) + "</span>" +
          '<span class="otl-node-meta">' + escapeHtml(node.type) + "</span>";

    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      selectedId = node.id;
      render();
    });

    header.appendChild(button);
    container.appendChild(header);

    if (hasChildren) {
      nestedList = document.createElement("ul");
      nestedList.className = "otl-node-list otl-node-list-nested";
      descendants.forEach(function (child) {
        nestedList.appendChild(renderTreeNode(child, filtered, visibleIds));
      });
      container.appendChild(nestedList);
    }

    item.appendChild(container);
    return item;
  }

  function renderTrail(node) {
    var items = treeLineage(node.id).map(function (id) {
      return nodesById[id];
    }).filter(Boolean);
    trail.innerHTML = "";

    items.forEach(function (item) {
      var li = document.createElement("li");
      var button = document.createElement("button");
      button.type = "button";
      button.className = "otl-trail-button";
      button.textContent = item.label;
      button.addEventListener("click", function () {
        selectedId = item.id;
        render();
      });
      li.appendChild(button);
      trail.appendChild(li);
    });
  }

  function renderMetadata(node) {
    var metadata = viewer.querySelector("[data-otl-metadata]");
    var parentLabel = node.parent && nodesById[node.parent] ? nodesById[node.parent].label : "Geen";
    var values = [
      { key: "Technische naam", value: node.id },
      { key: "Package", value: node.package },
      { key: "Type", value: node.type },
      { key: "Bovenliggend", value: parentLabel },
      { key: "Attributen", value: String(node.properties.length) },
      { key: "Relaties", value: String(node.relations.length) }
    ];

    metadata.innerHTML = values.map(function (entry) {
      return "<dt>" + escapeHtml(entry.key) + "</dt><dd>" + escapeHtml(entry.value) + "</dd>";
    }).join("");
  }

  function renderProperties(node) {
    var body = viewer.querySelector("[data-otl-properties]");

    if (!node.properties.length) {
      body.innerHTML = '<tr><td colspan="4" class="otl-empty-cell">Voor deze klasse zijn in deze viewer nog geen losse eigenschappen uitgewerkt.</td></tr>';
      return;
    }

    body.innerHTML = node.properties.map(function (property) {
      return "<tr>" +
        "<td>" + escapeHtml(property.name) + "</td>" +
        "<td>" + escapeHtml(property.datatype) + "</td>" +
        "<td>" + escapeHtml(property.cardinality) + "</td>" +
        "<td>" + escapeHtml(property.description) + "</td>" +
        "</tr>";
    }).join("");
  }

  function renderRelations(node) {
    var panel = viewer.querySelector("[data-otl-relations]");

    if (!node.relations.length) {
      panel.innerHTML = '<div class="empty-state"><p>Geen expliciete relaties vastgelegd voor deze klasse in deze eerste viewer.</p></div>';
      return;
    }

    panel.innerHTML = node.relations.map(function (relation) {
      var target = nodesById[relation.target] ? nodesById[relation.target].label : relation.target;
      var arrow = relation.direction === "uitgaand" ? "&rarr;" : "&larr;";

      return '<article class="content-section-card stack">' +
        '<div class="detail-header">' +
        "<div><h3>" + escapeHtml(relation.name) + "</h3><p>" + escapeHtml(node.label) + " " + arrow + " " + escapeHtml(target) + "</p></div>" +
        '<span class="status-chip">' + escapeHtml(relation.cardinality) + "</span>" +
        "</div>" +
        "</article>";
    }).join("");
  }

  function renderCards(selector, items, formatter, emptyText) {
    var container = viewer.querySelector(selector);

    if (!items.length) {
      container.innerHTML = '<div class="empty-state"><p>' + escapeHtml(emptyText) + "</p></div>";
      return;
    }

    container.innerHTML = items.map(formatter).join("");
  }

  function render() {
    var query = searchInput.value.trim().toLowerCase();
    var visibleIds = visibleIdsForQuery(query);
    var filtered = nodes.filter(function (node) {
      return visibleIds.has(node.id);
    });
    var selected = nodesById[selectedId] || filtered[0] || nodes[0];

    if (!selected) {
      return;
    }

    if (filtered.length && filtered.map(function (item) { return item.id; }).indexOf(selected.id) === -1) {
      selectedId = filtered[0].id;
      selected = nodesById[selectedId];
    }

    renderTree(filtered, visibleIds);
    renderTrail(selected);

    viewer.querySelector("[data-otl-type]").textContent = selected.type;
    viewer.querySelector("[data-otl-package]").textContent = selected.package;
    viewer.querySelector("[data-otl-title]").textContent = selected.label;
    viewer.querySelector("[data-otl-description]").textContent = selected.description;
    viewer.querySelector("[data-otl-standard]").textContent = selected.standard;
    viewer.querySelector("[data-otl-status]").textContent = selected.status;
    viewer.querySelector("[data-otl-parent]").textContent = selected.parent && nodesById[selected.parent] ? nodesById[selected.parent].label : "Geen";
    viewer.querySelector("[data-otl-definition]").textContent = selected.definition;
    viewer.querySelector("[data-otl-design-note]").textContent =
      "Deze eerste viewer houdt de lijn uit het voorbeeld vast: fysieke objecten, profielobjecten en geo-representatie worden als afzonderlijke klassen zichtbaar gemaakt, terwijl attributen en mappings per klasse in tabs worden uitgewerkt.";

    renderMetadata(selected);
    renderProperties(selected);
    renderRelations(selected);
    renderGraph(selected);
    var semanticGraphData = buildSemanticGraphData(selected);
    window.__OTL_VIEWER_DATA__ = {
      nodes: nodes,
      selectedId: selected.id,
      semanticGraphData: semanticGraphData
    };
    window.dispatchEvent(new CustomEvent("otl:selected", {
      detail: {
        nodes: nodes,
        selectedId: selected.id,
        semanticGraphData: semanticGraphData
      }
    }));
    renderCards("[data-otl-documents]", selected.documents, function (documentItem) {
      return '<article class="product-link-card stack">' +
        '<span class="tag">' + escapeHtml(documentItem.type) + "</span>" +
        "<h3>" + escapeHtml(documentItem.title) + "</h3>" +
        "</article>";
    }, "Nog geen documenten gekoppeld voor deze klasse.");
    renderCards("[data-otl-mappings]", selected.mappings, function (mapping) {
      return '<article class="product-link-card stack">' +
        '<p class="eyebrow">' + escapeHtml(mapping.system) + "</p>" +
        "<h3>" + escapeHtml(mapping.value) + "</h3>" +
        "</article>";
    }, "Nog geen mappings gekoppeld voor deze klasse.");
  }

  searchInput.addEventListener("input", render);

  function openReactodiaOverlay() {
    if (!reactodiaOverlay) {
      return;
    }

    reactodiaOverlay.hidden = false;

    if (reactodiaStatus) {
      reactodiaStatus.hidden = false;
      reactodiaStatus.textContent = window.__OTL_REACTODIA_READY__
        ? "Reactodia wordt geladen."
        : "Reactodia is nog niet beschikbaar in deze sessie. Controleer of de pagina via een server draait.";
    }

    window.dispatchEvent(new CustomEvent("otl:reactodia-open", {
      detail: {
        nodes: nodes,
        selectedId: selectedId
      }
    }));
  }

  if (reactodiaOpenButton && reactodiaOverlay) {
    reactodiaOpenButton.addEventListener("click", function () {
      openReactodiaOverlay();
    });
  }

  document.addEventListener("click", function (event) {
    var openTrigger = event.target.closest("[data-otl-reactodia-open]");
    var closeTrigger = event.target.closest("[data-otl-reactodia-close]");

    if (openTrigger) {
      event.preventDefault();
      openReactodiaOverlay();
    }

    if (closeTrigger && reactodiaOverlay) {
      event.preventDefault();
      reactodiaOverlay.hidden = true;
    }
  });

  if (reactodiaCloseButton && reactodiaOverlay) {
    reactodiaCloseButton.addEventListener("click", function () {
      reactodiaOverlay.hidden = true;
    });
  }

  if (statNodes) {
    statNodes.textContent = String(nodes.length);
  }

  if (statPackages) {
    statPackages.textContent = String(packageGroups(nodes).length);
  }

  render();
}());
