export type ObjectTypeRoute = {
  title: string;
  href: string;
  parentTitle?: string;
  parentHref?: string;
  summary?: string;
};

export function normalizeObjectTypeKey(value: string) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " en ")
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const existingObjectTypeRoutes: ObjectTypeRoute[] = [
  { title: "Watersysteem", href: "/datastandaard/objectenhandboek/watersysteem" },
  { title: "Stroomgebied", href: "/datastandaard/objectenhandboek/watersysteem/stroomgebied" },
  { title: "Watergang", href: "/datastandaard/objectenhandboek/watersysteem/watergangen" },
  { title: "Watergangen", href: "/datastandaard/objectenhandboek/watersysteem/watergangen" },
  { title: "Watergangsectie", href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie" },
  { title: "Intersectie", href: "/datastandaard/objectenhandboek/watersysteem/intersectie" },
  { title: "Regenwaterbuffer", href: "/datastandaard/objectenhandboek/watersysteem/regenwaterbuffer" },
  {
    title: "Regenwaterbuffercompartiment",
    href: "/datastandaard/objectenhandboek/watersysteem/regenwaterbuffer/regenwaterbuffercompartiment"
  },
  { title: "Kunstwerk", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken" },
  { title: "Talud", href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/talud" },
  {
    title: "Bekledingsconstructie",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/talud/bekledingsconstructie"
  },
  { title: "Aquaduct", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/aquaduct" },
  { title: "Bodemval", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/bodemval" },
  { title: "Brug", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/brug" },
  { title: "Coupure", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/coupure" },
  { title: "Dam", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/dam" },
  { title: "Duiker", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/duiker" },
  { title: "Gemaal", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/gemaal" },
  { title: "Hevel", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/hevel" },
  { title: "Sifon", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/sifon" },
  { title: "Stuw", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/stuw" },
  { title: "Voorde", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/voorde" },
  { title: "Vuilvang", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/vuilvang" },
  { title: "Vispassage", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/vispassage" },
  { title: "Overkluizing", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/overkluizing" }
];

export const objectTypePlaceholderRoutes: ObjectTypeRoute[] = [
  {
    title: "Regionale wateren",
    href: "/datastandaard/objectenhandboek/watersysteem/regionale-wateren",
    parentTitle: "Watersysteem",
    parentHref: "/datastandaard/objectenhandboek/watersysteem"
  },
  {
    title: "Rijkswateren",
    href: "/datastandaard/objectenhandboek/watersysteem/rijkswateren",
    parentTitle: "Watersysteem",
    parentHref: "/datastandaard/objectenhandboek/watersysteem"
  },
  {
    title: "Watergang met taluds",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/met-taluds",
    parentTitle: "Watergangsectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie"
  },
  {
    title: "Watergang met onderhoudspad",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/met-onderhoudspad",
    parentTitle: "Watergangsectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie"
  },
  {
    title: "Watergang met beschoeiing",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/met-beschoeiing",
    parentTitle: "Watergangsectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie"
  },
  {
    title: "Watergang met wandconstructie",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/met-wandconstructie",
    parentTitle: "Watergangsectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie"
  },
  {
    title: "Watergang met accoladeprofiel",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/met-accoladeprofiel",
    parentTitle: "Watergangsectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie"
  },
  {
    title: "Vrij meanderende watergang",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/vrij-meanderend",
    parentTitle: "Watergangsectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie"
  },
  {
    title: "Watergang - Watergang",
    href: "/datastandaard/objectenhandboek/watersysteem/intersectie/watergang-watergang",
    parentTitle: "Intersectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/intersectie"
  },
  {
    title: "Watergang - Weg",
    href: "/datastandaard/objectenhandboek/watersysteem/intersectie/watergang-weg",
    parentTitle: "Intersectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/intersectie"
  },
  {
    title: "Watergang - Waterkering",
    href: "/datastandaard/objectenhandboek/watersysteem/intersectie/watergang-waterkering",
    parentTitle: "Intersectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/intersectie"
  },
  {
    title: "Toplaag",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/talud/bekledingsconstructie/toplaag",
    parentTitle: "Bekledingsconstructie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/talud/bekledingsconstructie"
  },
  {
    title: "Bodem",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/bodem",
    parentTitle: "Watergangsectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie"
  },
  {
    title: "Berm",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/berm",
    parentTitle: "Watergangsectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie"
  },
  {
    title: "Werkpad",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/werkpad",
    parentTitle: "Watergangsectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie"
  },
  {
    title: "Element",
    href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/element",
    parentTitle: "Kunstwerk",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/kunstwerken"
  },
  {
    title: "Bouwdeel",
    href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/bouwdeel",
    parentTitle: "Kunstwerk",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/kunstwerken"
  },
  {
    title: "RWZI's",
    href: "/datastandaard/objectenhandboek/afvalwaterketen/rwzis",
    parentTitle: "Hoofdstuk Waterketen",
    parentHref: "/datastandaard/objectenhandboek/afvalwaterketen"
  },
  {
    title: "Rioolgemalen",
    href: "/datastandaard/objectenhandboek/afvalwaterketen/rioolgemalen",
    parentTitle: "Hoofdstuk Waterketen",
    parentHref: "/datastandaard/objectenhandboek/afvalwaterketen"
  },
  {
    title: "Transportleidingen",
    href: "/datastandaard/objectenhandboek/afvalwaterketen/transportleidingen",
    parentTitle: "Hoofdstuk Waterketen",
    parentHref: "/datastandaard/objectenhandboek/afvalwaterketen"
  },
  {
    title: "Terreinen",
    href: "/datastandaard/objectenhandboek/afvalwaterketen/terreinen",
    parentTitle: "Hoofdstuk Waterketen",
    parentHref: "/datastandaard/objectenhandboek/afvalwaterketen"
  },
  {
    title: "Terreininrichting",
    href: "/datastandaard/objectenhandboek/afvalwaterketen/terreininrichting",
    parentTitle: "Hoofdstuk Waterketen",
    parentHref: "/datastandaard/objectenhandboek/afvalwaterketen"
  },
  {
    title: "Vegetatieobjecten",
    href: "/datastandaard/objectenhandboek/afvalwaterketen/vegetatieobjecten",
    parentTitle: "Hoofdstuk Waterketen",
    parentHref: "/datastandaard/objectenhandboek/afvalwaterketen"
  },
  {
    title: "Waterkeringen",
    href: "/datastandaard/objectenhandboek/waterkeringensysteem/waterkeringen",
    parentTitle: "Hoofdstuk Waterkeringen",
    parentHref: "/datastandaard/objectenhandboek/waterkeringensysteem"
  },
  {
    title: "Constructies",
    href: "/datastandaard/objectenhandboek/waterkeringensysteem/constructies",
    parentTitle: "Hoofdstuk Waterkeringen",
    parentHref: "/datastandaard/objectenhandboek/waterkeringensysteem"
  },
  {
    title: "Kunstwerken",
    href: "/datastandaard/objectenhandboek/waterkeringensysteem/kunstwerken",
    parentTitle: "Hoofdstuk Waterkeringen",
    parentHref: "/datastandaard/objectenhandboek/waterkeringensysteem"
  },
  {
    title: "Terreinen",
    href: "/datastandaard/objectenhandboek/waterkeringensysteem/terreinen",
    parentTitle: "Hoofdstuk Waterkeringen",
    parentHref: "/datastandaard/objectenhandboek/waterkeringensysteem"
  },
  {
    title: "Terreininrichting",
    href: "/datastandaard/objectenhandboek/waterkeringensysteem/terreininrichting",
    parentTitle: "Hoofdstuk Waterkeringen",
    parentHref: "/datastandaard/objectenhandboek/waterkeringensysteem"
  },
  {
    title: "Groenobjecten",
    href: "/datastandaard/objectenhandboek/waterkeringensysteem/groenobjecten",
    parentTitle: "Hoofdstuk Waterkeringen",
    parentHref: "/datastandaard/objectenhandboek/waterkeringensysteem"
  }
];

const objectTypeRoutes = [...existingObjectTypeRoutes, ...objectTypePlaceholderRoutes];

const objectTypeRouteGroups = objectTypeRoutes.reduce((groups, route) => {
  const key = normalizeObjectTypeKey(route.title);
  const routes = groups.get(key) || [];
  routes.push(route);
  groups.set(key, routes);
  return groups;
}, new Map<string, ObjectTypeRoute[]>());

const objectTypeRouteMap = new Map(
  [...objectTypeRouteGroups.entries()]
    .filter(([, routes]) => routes.length === 1)
    .map(([key, routes]) => [key, routes[0]])
);

export function getObjectTypeRoute(title: string) {
  return objectTypeRouteMap.get(normalizeObjectTypeKey(title))?.href;
}

export function getObjectTypeHref(title: string, fallback?: string) {
  return getObjectTypeRoute(title) || fallback;
}

export function getObjectTypeRouteRecord() {
  return Object.fromEntries([...objectTypeRouteMap.entries()].map(([key, route]) => [key, route.href]));
}
