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
const TERREINDEEL_BASE = `${TERRAIN_BASE}/terreindeel`;

const terrainObject = (
  title: string,
  text: string,
  href: string,
  iconTitle: "Vegetatie" | "Terreindeel" = "Vegetatie"
): RaakvlakItem => ({
  title,
  text,
  href,
  iconTitle
});

const vegetationObject = (title: string, slug: string, text: string) =>
  terrainObject(title, text, `${VEGETATIE_BASE}/${slug}`, "Vegetatie");

const terreindeelObject = (title: string, slug: string, text: string) =>
  terrainObject(title, text, `${TERREINDEEL_BASE}/${slug}`, "Terreindeel");

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
        terrainObject(
          "Vegetatie",
          "Objectfamilie voor beplanting die op of langs taluds invloed heeft op beheer, erosie, zicht en ecologische inrichting.",
          VEGETATIE_BASE
        ),
        vegetationObject(
          "Gras",
          "gras",
          "Grasvegetatie kan het taludbeeld, de erosiebescherming en het maaibeheer van een talud bepalen."
        ),
        vegetationObject(
          "Haag",
          "haag",
          "Hagen kunnen als lijnvormige beplanting langs of bovenaan een talud voorkomen."
        ),
        vegetationObject(
          "Riet",
          "riet",
          "Rietvegetatie raakt natte oever- en taludzones waar waterprofiel en vegetatiebeheer samenkomen."
        ),
        vegetationObject(
          "Struik",
          "struik",
          "Struiken kunnen het taludbeheer, de zichtlijnen en de ruimtelijke overgang naar het maaiveld beinvloeden."
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
        terrainObject(
          "Vegetatie",
          "Objectfamilie voor begroeiing die samenhangt met de bodemzone van een watergangsectie.",
          VEGETATIE_BASE
        ),
        terreindeelObject(
          "Begroeid terreindeel",
          "begroeid-terreindeel",
          "Begroeide terreindelen raken de bodem waar aaneengesloten vegetatie de ondergrond en het onderhoudsbeeld bepaalt."
        ),
        terreindeelObject(
          "Onbegroeid terreindeel",
          "onbegroeid-terreindeel",
          "Onbegroeide terreindelen raken de bodem waar de ondergrond zichtbaar of niet aaneengesloten begroeid is."
        ),
        vegetationObject(
          "Riet",
          "riet",
          "Rietvegetatie heeft een raakvlak met natte bodems en overgangszones in het watergangprofiel."
        ),
        vegetationObject(
          "Kruidachtige",
          "kruidachtige",
          "Kruidachtige vegetatie kan de bedekking en het beheer van bodem- en overgangszones mede bepalen."
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
        terrainObject(
          "Vegetatie",
          "Objectfamilie voor beplanting die binnen of langs een berm kan voorkomen.",
          VEGETATIE_BASE
        ),
        terreindeelObject(
          "Begroeid terreindeel",
          "begroeid-terreindeel",
          "Begroeide terreindelen sluiten aan op bermen waar aaneengesloten vegetatie het beheerbeeld bepaalt."
        ),
        vegetationObject(
          "Gras",
          "gras",
          "Grasvegetatie is een veelvoorkomend raakvlak voor bermen en het bijbehorende maaibeheer."
        ),
        vegetationObject(
          "Haag",
          "haag",
          "Hagen kunnen als lijnvormige beplanting binnen of langs een berm worden beheerd."
        ),
        vegetationObject(
          "Struik",
          "struik",
          "Struiken kunnen onderdeel zijn van de inrichting en het onderhoud van een bermzone."
        ),
        vegetationObject(
          "Boom",
          "boom",
          "Bomen kunnen als solitaire of lijnvormige beplanting in of langs een berm staan."
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
