import type { HandbookScope } from "./objectenhandboekHandbooks";
import { objectenhandboekTaxonomy } from "./objectenhandboekTaxonomy";
import { getTerreinbeheerObjectFamilies } from "./terreinbeheerObjectStructure";

export const TERRAIN_DISCIPLINE_ID = "terreinbeheer-openbare-ruimte";

type ObjectEntry = {
  data: Record<string, any>;
};

type DisciplineScope = Pick<HandbookScope, "id" | "label" | "landingHref">;

const collator = new Intl.Collator("nl", { numeric: true, sensitivity: "base" });
const mechanicalConstructionTypes = [
  "Balgconstructie",
  "Klepconstructie",
  "Schotbalkconstructie",
  "Schuifconstructie"
];
const terrainFamilyTextById = new Map([
  [
    "constructie",
    "Objecten, begrippen, modellen en referenties rond constructies voor afbakening en toegang binnen terreinbeheer en openbare ruimte."
  ],
  [
    "terreindeel",
    "Objecten, begrippen, modellen en referenties rond begroeide en onbegroeide terreindelen binnen terreinbeheer en openbare ruimte."
  ],
  [
    "vegetatie",
    "Objecten, begrippen, modellen en referenties rond bomen, gras, hagen, riet, struiken en andere vegetatieobjecten binnen terreinbeheer en openbare ruimte."
  ]
]);

function getFamilyCardTitle(family: { id?: string; label: string }) {
  return family.id === "werktuigbouwkundige-constructies"
    ? "Werktuigbouwkundige constructie"
    : family.label;
}

function createFamilyCardText(title: string, context: string) {
  return `Objecten, begrippen, modellen en referenties rond ${title.toLowerCase()} binnen ${context}.`;
}

function getFamilyCardText(family: { id?: string; label: string }, context: string) {
  return family.id === "werktuigbouwkundige-constructies"
    ? "Objecten, begrippen, modellen en referenties rond werktuigbouwkundige constructies binnen werktuigbouwkunde."
    : createFamilyCardText(getFamilyCardTitle(family), context);
}

function getFamilyTypeSummary(family: { id?: string }) {
  return family.id === "werktuigbouwkundige-constructies"
    ? `Typen naar decompositie: ${mechanicalConstructionTypes.join(", ")}.`
    : "";
}

function createObjectFamilyGroups(entries: ObjectEntry[], scope: DisciplineScope, terrainFamilyIds: Set<string>) {
  const isTerrainDiscipline = scope.id === TERRAIN_DISCIPLINE_ID;
  const objectEntries = entries
    .filter((entry) => {
      const disciplines = entry.data.classification?.disciplines || [];
      const objectFamilies = entry.data.classification?.objectFamilies || [];

      if (isTerrainDiscipline) {
        return (
          Array.isArray(disciplines) &&
          disciplines.includes(scope.id) &&
          Array.isArray(objectFamilies) &&
          objectFamilies.some((id: string) => terrainFamilyIds.has(id))
        );
      }

      return Array.isArray(disciplines) && disciplines.includes(scope.id);
    })
    .sort((left, right) => collator.compare(left.data.heroTitle || left.data.title, right.data.heroTitle || right.data.title));
  const objectFamilyById = new Map(objectenhandboekTaxonomy.objectFamilies.map((family) => [family.id, family]));

  return objectEntries.reduce((groups, entry) => {
    const familyIds = entry.data.classification?.objectFamilies || [];
    const ids = Array.isArray(familyIds) && familyIds.length ? familyIds : ["overige-objecttypen"];

    ids.forEach((id) => {
      const family = objectFamilyById.get(id) || {
        id,
        label: "Overige objecttypen"
      };
      const group = groups.get(id) || {
        family,
        entries: []
      };

      group.entries.push(entry);
      groups.set(id, group);
    });

    return groups;
  }, new Map<string, { family: { id?: string; label: string; href?: string }; entries: ObjectEntry[] }>());
}

export function createDisciplineChapterEntry(scope: DisciplineScope, entries: ObjectEntry[]) {
  const lowerScopeLabel = scope.label.toLowerCase();
  const isTerrainDiscipline = scope.id === TERRAIN_DISCIPLINE_ID;
  const terrainFamilies = isTerrainDiscipline ? getTerreinbeheerObjectFamilies() : [];
  const terrainFamilyIds = new Set(terrainFamilies.map((family) => family.familyId));
  const objectFamilyGroups = createObjectFamilyGroups(entries, scope, terrainFamilyIds);
  const objectFamilyCards = [...objectFamilyGroups.values()].sort((left, right) =>
    collator.compare(left.family.label, right.family.label)
  );
  const familyItems = isTerrainDiscipline
    ? terrainFamilies.map((family) => ({
        title: family.title,
        text: terrainFamilyTextById.get(family.familyId) || createFamilyCardText(family.title, lowerScopeLabel),
        href: family.href
      }))
    : objectFamilyCards.map(({ family }) => ({
        title: getFamilyCardTitle(family),
        text: [getFamilyCardText(family, lowerScopeLabel), getFamilyTypeSummary(family)]
          .filter(Boolean)
          .join(" "),
        href: family.href
      }));
  const objectFamilySummary = familyItems.length
    ? `Deze objectfamilies vormen de hoofdingangen voor de verdere uitwerking binnen ${lowerScopeLabel}.`
    : `Objectfamilies worden automatisch gevuld zodra objecttypen aan ${lowerScopeLabel} zijn gekoppeld.`;

  return {
    data: {
      title: `Objectenhandboek voor ${scope.label}`,
      slug: scope.landingHref,
      part: "datastandaard",
      product: "objectenhandboek",
      ownerTeam: "datastandaard",
      status: "concept",
      lastReviewed: "2026-06-01",
      pageType: "chapter",
      heroEyebrow: "Objectenhandboek hoofdstuk",
      heroTitle: `Hoofdstuk ${scope.label}`,
      summary: `Dit is de landingspagina voor de objecttypen binnen ${lowerScopeLabel}. Je vindt hier de hoofdstukstructuur, de belangrijkste objectfamilies en de samenhang met de producten van de datastandaard.`,
      uitwerkingTitle: `Hoofdstukindeling voor ${scope.label}`,
      nextStepsTitle: "Logische volgende objectlijnen",
      definition: `${scope.label} is een disciplinehoofdstuk binnen het Objectenhandboek voor objecttypen, objectfamilies en beheerinformatie die vanuit deze vakdiscipline worden toegepast of beheerd.`,
      definitionSource: "Werkdefinitie voor de disciplinehoofdstuklanding van het Objectenhandboek.",
      terms: [
        {
          title: scope.label,
          text: `Discipline-ingang voor objecttypen en objectfamilies binnen ${lowerScopeLabel}.`,
          href: "/datastandaard/woordenboek"
        },
        {
          title: "Objectfamilie",
          text: "Groepering van objecttypen die binnen deze discipline als hoofdingang wordt gebruikt.",
          href: "/datastandaard/objectenhandboek"
        },
        {
          title: "Objecttype",
          text: "Digitale objectpagina met definitie, samenhang en inhoudelijke uitwerking.",
          href: "/datastandaard/objectenhandboek"
        }
      ],
      contentSections: [
        {
          title: "Overzicht / Samenhang",
          summary: `${scope.label} vormt de discipline-ingang naar objectfamilies en objecttypen die naast de systeemingangen vanuit vakinhoudelijk beheer worden benaderd.`
        },
        {
          title: "Afbakening",
          summary: `Dit hoofdstuk richt zich op objecttypen die vanuit ${lowerScopeLabel} worden beheerd, ontworpen, toegepast of vastgelegd. Objecttypen die primair bij een systeemhoofdstuk horen blijven via de systeemingang vindbaar en kunnen daarnaast aan deze discipline gekoppeld zijn.`
        },
        {
          title: "Objectfamilies",
          summary: objectFamilySummary,
          items: familyItems
        }
      ],
      productRelations: [
        {
          title: "Woordenboek",
          text: `Begrippen en definities voor ${lowerScopeLabel}.`,
          href: "/datastandaard/woordenboek"
        },
        {
          title: "Objectenhandboek",
          text: `Objecttypen en hoofdstukindeling van ${lowerScopeLabel}.`,
          href: scope.landingHref
        },
        {
          title: "Object Type Library",
          text: "Eigenschappen, relaties en gedrag van objecttypen in een gestandaardiseerde vorm.",
          href: "/datastandaard/otl"
        },
        {
          title: "Referentiedataset",
          text: "Voorbeelddata en toetsbare referentiegegevens.",
          href: "/datastandaard/referentiedataset"
        },
        {
          title: "Werkinstructies",
          text: "Documenten en werkafspraken voor gebruik en beheer.",
          href: "/datastandaard/werkinstructies"
        }
      ],
      nextSteps: familyItems
    }
  };
}
