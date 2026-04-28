export type TaxonomyItem = {
  id: string;
  label: string;
  href?: string;
  description?: string;
};

export type ObjectClassification = {
  systems?: string[];
  disciplines?: string[];
  objectFamilies?: string[];
  publications?: string[];
  confidence?: "afgeleid" | "bevestigd";
};

const systems: TaxonomyItem[] = [
  {
    id: "waterketen",
    label: "Waterketen",
    href: "/datastandaard/objectenhandboek/afvalwaterketen"
  },
  {
    id: "watersysteem",
    label: "Watersysteem",
    href: "/datastandaard/objectenhandboek/watersysteem"
  },
  {
    id: "waterkeringen",
    label: "Waterkeringen",
    href: "/datastandaard/objectenhandboek/waterkeringensysteem"
  }
];

const disciplines: TaxonomyItem[] = [
  {
    id: "terreinbeheer-openbare-ruimte",
    label: "Terreinbeheer en openbare ruimte",
    href: "/datastandaard/objectenhandboek/discipline/terreinbeheer-openbare-ruimte"
  },
  {
    id: "ecologie-en-groen",
    label: "Ecologie en groen",
    href: "/datastandaard/objectenhandboek/discipline/ecologie-en-groen"
  },
  {
    id: "civiele-techniek",
    label: "Civiele techniek",
    href: "/datastandaard/objectenhandboek/discipline/civiele-techniek"
  },
  {
    id: "bouwkunde",
    label: "Bouwkunde",
    href: "/datastandaard/objectenhandboek/discipline/bouwkunde"
  },
  {
    id: "werktuigbouwkunde",
    label: "Werktuigbouwkunde",
    href: "/datastandaard/objectenhandboek/discipline/werktuigbouwkunde"
  },
  {
    id: "electrotechniek",
    label: "Electrotechniek",
    href: "/datastandaard/objectenhandboek/discipline/electrotechniek"
  },
  {
    id: "procesautomatisering",
    label: "Procesautomatisering",
    href: "/datastandaard/objectenhandboek/discipline/procesautomatisering"
  },
  {
    id: "informatie-en-data",
    label: "Informatie en data",
    href: "/datastandaard/objectenhandboek/discipline/informatie-en-data"
  }
];

const objectFamilies: TaxonomyItem[] = [
  {
    id: "stroomgebieden",
    label: "Stroomgebieden",
    href: "/datastandaard/objectenhandboek/watersysteem/stroomgebied"
  },
  {
    id: "watergangen",
    label: "Watergangen",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangen"
  },
  {
    id: "profielonderdelen",
    label: "Profielonderdelen",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie"
  },
  {
    id: "regenwaterbuffers",
    label: "Regenwaterbuffers",
    href: "/datastandaard/objectenhandboek/watersysteem/regenwaterbuffer"
  },
  {
    id: "kunstwerken",
    label: "Kunstwerken",
    href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken"
  }
];

const publications: TaxonomyItem[] = [
  {
    id: "objectenhandboek-watersysteem",
    label: "Objectenhandboek Watersysteem",
    description: "Printbare bundel voor objecttypen binnen het watersysteem."
  },
  {
    id: "objectenhandboek-waterketen",
    label: "Objectenhandboek Waterketen",
    description: "Printbare bundel voor objecttypen binnen de waterketen."
  },
  {
    id: "objectenhandboek-waterkeringen",
    label: "Objectenhandboek Waterkeringen",
    description: "Printbare bundel voor objecttypen binnen waterkeringen."
  },
  {
    id: "objectenhandboek-civiele-techniek",
    label: "Objectenhandboek Civiele techniek",
    description: "Printbare bundel voor objecttypen die relevant zijn voor civiele techniek."
  },
  {
    id: "objectenhandboek-terreinbeheer-openbare-ruimte",
    label: "Objectenhandboek Terreinbeheer en openbare ruimte",
    description: "Printbare bundel voor terrein, bereikbaarheid en beheer van de buitenruimte."
  },
  {
    id: "objectenhandboek-ecologie-en-groen",
    label: "Objectenhandboek Ecologie en groen",
    description: "Printbare bundel voor ecologie, groen en natuurlijke inrichting."
  },
  {
    id: "objectenhandboek-werktuigbouwkunde",
    label: "Objectenhandboek Werktuigbouwkunde",
    description: "Printbare bundel voor mechanische objecten en installaties."
  },
  {
    id: "objectenhandboek-electrotechniek",
    label: "Objectenhandboek Electrotechniek",
    description: "Printbare bundel voor elektrische objecten en voorzieningen."
  },
  {
    id: "objectenhandboek-procesautomatisering",
    label: "Objectenhandboek Procesautomatisering",
    description: "Printbare bundel voor meten, regelen, sturen en automatisering."
  },
  {
    id: "objectenhandboek-informatie-en-data",
    label: "Objectenhandboek Informatie en data",
    description: "Printbare bundel voor datamodellering, geometrie, metadata en gegevensuitwisseling."
  }
];

const taxonomyGroups = {
  systems,
  disciplines,
  objectFamilies,
  publications
};

function resolveItems(ids: string[] = [], items: TaxonomyItem[]) {
  return ids.map((id) => items.find((item) => item.id === id) || { id, label: id });
}

export function resolveObjectClassification(classification: ObjectClassification = {}) {
  return {
    systems: resolveItems(classification.systems, taxonomyGroups.systems),
    disciplines: resolveItems(classification.disciplines, taxonomyGroups.disciplines),
    objectFamilies: resolveItems(classification.objectFamilies, taxonomyGroups.objectFamilies),
    publications: resolveItems(classification.publications, taxonomyGroups.publications),
    confidence: classification.confidence || "afgeleid"
  };
}

export const objectenhandboekTaxonomy = taxonomyGroups;
