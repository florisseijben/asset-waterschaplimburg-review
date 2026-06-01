type RaakvlakItem = {
  title: string;
  text: string;
  href: string;
  iconTitle?: string;
};

type RaakvlakSection = {
  title: string;
  summary: string;
  items: RaakvlakItem[];
};

type ContentSection = {
  title: string;
  [key: string]: any;
};

const TERRAIN_BASE = "/datastandaard/objectenhandboek/discipline/terreinbeheer-openbare-ruimte";
const VEGETATIE_BASE = `${TERRAIN_BASE}/vegetatie`;
const CONSTRUCTIE_BASE = `${TERRAIN_BASE}/constructie`;

const terrainObject = (
  title: string,
  text: string,
  href: string,
  iconTitle: "Vegetatie" | "Constructie" = "Vegetatie"
): RaakvlakItem => ({
  title,
  text,
  href,
  iconTitle
});

const vegetationGroup = (text: string) => terrainObject("Vegetatie", text, VEGETATIE_BASE, "Vegetatie");
const constructieGroup = (text: string) => terrainObject("Constructie", text, CONSTRUCTIE_BASE, "Constructie");

function normalizeKey(value: string) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " en ")
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const raakvlakSectionsByObjectKey = new Map<string, RaakvlakSection>([
  [
    normalizeKey("talud"),
    {
      title: "Raakvlakken",
      summary:
        "Talud raakt objecten uit Terreinbeheer en openbare ruimte wanneer beplanting, terreindelen of beheerzones op of direct langs het schuine profieldeel liggen.",
      items: [
        vegetationGroup(
          "Objectgroep voor beplanting die op of langs taluds invloed heeft op beheer, erosie, zicht en ecologische inrichting."
        ),
        constructieGroup(
          "Objectgroep voor constructies die een talud kunnen begrenzen, beschermen of toegankelijk maken."
        )
      ]
    }
  ],
  [
    normalizeKey("bodem"),
    {
      title: "Raakvlakken",
      summary:
        "Bodem raakt terrein- en vegetatieobjecten wanneer begroeiing, open grond of natte vegetatie de ondergrond en het beheer van het profiel mede bepalen.",
      items: [
        vegetationGroup(
          "Objectgroep voor begroeiing die samenhangt met de bodemzone en overgangszones van een watergangsectie."
        ),
        constructieGroup(
          "Objectgroep voor constructies die de bodemzone kunnen kruisen, beschermen of lokaal beinvloeden."
        )
      ]
    }
  ],
  [
    normalizeKey("berm"),
    {
      title: "Raakvlakken",
      summary:
        "Berm raakt objecten uit Terreinbeheer en openbare ruimte doordat bermen vaak als beheerbare terreindelen met vegetatie, bomen of lijnvormige beplanting worden vastgelegd.",
      items: [
        vegetationGroup(
          "Objectgroep voor beplanting die binnen of langs een berm kan voorkomen en het beheerbeeld mede bepaalt."
        ),
        constructieGroup(
          "Objectgroep voor constructies die in of langs een berm kunnen staan, zoals afscherming of toegang."
        )
      ]
    }
  ]
]);

function cloneSection(section: RaakvlakSection): RaakvlakSection {
  return {
    ...section,
    items: section.items.map((item) => ({ ...item }))
  };
}

export function getRaakvlakSectionForObjectTitle(title: string): RaakvlakSection | undefined {
  const section = raakvlakSectionsByObjectKey.get(normalizeKey(title));

  return section ? cloneSection(section) : undefined;
}

export function appendRaakvlakSection(sections: ContentSection[] = [], title: string): any[] {
  const raakvlakSection = getRaakvlakSectionForObjectTitle(title);

  if (!raakvlakSection || sections.some((section) => normalizeKey(section.title) === "raakvlakken")) {
    return sections;
  }

  return [...sections, raakvlakSection];
}
