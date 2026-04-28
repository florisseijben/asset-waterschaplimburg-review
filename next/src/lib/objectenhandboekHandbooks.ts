import { objectenhandboekTaxonomy, type TaxonomyItem } from "./objectenhandboekTaxonomy";

export type HandbookScopeKind = "system" | "discipline";

export type HandbookScope = TaxonomyItem & {
  kind: HandbookScopeKind;
  landingHref: string;
  summary: string;
};

const handbookHref = (id: string) => `/datastandaard/objectenhandboek/handboeken/${id}`;

const systemScopes: HandbookScope[] = [
  {
    id: "waterketen",
    kind: "system",
    label: "Waterketen",
    href: handbookHref("waterketen"),
    landingHref: "/datastandaard/objectenhandboek/afvalwaterketen",
    summary:
      "Printbare bundel met de objecttypen binnen de waterketen, opgebouwd uit definitie, begrip en inhoudelijke uitwerking."
  },
  {
    id: "watersysteem",
    kind: "system",
    label: "Watersysteem",
    href: handbookHref("watersysteem"),
    landingHref: "/datastandaard/objectenhandboek/watersysteem",
    summary:
      "Printbare bundel met de objecttypen binnen het watersysteem, opgebouwd uit definitie, begrip en inhoudelijke uitwerking."
  },
  {
    id: "waterkeringen",
    kind: "system",
    label: "Waterkeringen",
    href: handbookHref("waterkeringen"),
    landingHref: "/datastandaard/objectenhandboek/waterkeringensysteem",
    summary:
      "Printbare bundel met de objecttypen binnen waterkeringen, opgebouwd uit definitie, begrip en inhoudelijke uitwerking."
  }
];

const disciplineScopes: HandbookScope[] = objectenhandboekTaxonomy.disciplines.map((discipline) => ({
  ...discipline,
  kind: "discipline",
  href: handbookHref(discipline.id),
  landingHref: `/datastandaard/objectenhandboek/discipline/${discipline.id}`,
  summary: `Printbare bundel met objecttypen die relevant zijn voor ${discipline.label.toLowerCase()}, opgebouwd uit definitie, begrip en inhoudelijke uitwerking.`
}));

export const handbookScopes: HandbookScope[] = [...systemScopes, ...disciplineScopes];

export const handbookScopeById = new Map(handbookScopes.map((scope) => [scope.id, scope]));

export function getHandbookScope(id: string) {
  return handbookScopeById.get(id);
}

export function getHandbookHref(id: string) {
  return getHandbookScope(id)?.href;
}

export function getDisciplineScopes() {
  return disciplineScopes;
}

export function getSystemHandbookHref(id: string) {
  return systemScopes.find((scope) => scope.id === id)?.href;
}
