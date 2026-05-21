export type ObjectTypeRoute = {
  title: string;
  href: string;
  parentTitle?: string;
  parentHref?: string;
  summary?: string;
  definition?: string;
  definitionSource?: string;
  relatedTerms?: {
    title: string;
    text?: string;
    href?: string;
  }[];
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
  { title: "Afvalwaterketen", href: "/datastandaard/objectenhandboek/afvalwaterketen" },
  { title: "Waterketen", href: "/datastandaard/objectenhandboek/afvalwaterketen" },
  { title: "Watersysteem", href: "/datastandaard/objectenhandboek/watersysteem" },
  { title: "Waterkeringensysteem", href: "/datastandaard/objectenhandboek/waterkeringensysteem" },
  { title: "Stroomgebied", href: "/datastandaard/objectenhandboek/watersysteem/stroomgebied" },
  { title: "Watergang", href: "/datastandaard/objectenhandboek/watersysteem/watergangen" },
  { title: "Watergangen", href: "/datastandaard/objectenhandboek/watersysteem/watergangen" },
  { title: "Watergangsectie", href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie" },
  {
    title: "Watergang met standaardprofiel",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/met-standaardprofiel"
  },
  {
    title: "Watergang met taluds",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/met-standaardprofiel"
  },
  {
    title: "Watergang met onderhoudspad",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/met-standaardprofiel"
  },
  {
    title: "Watergang met beschoeiing",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/met-standaardprofiel"
  },
  { title: "Watergang met wandconstructie", href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/met-wandconstructie" },
  { title: "Watergang met accoladeprofiel", href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/met-accoladeprofiel" },
  { title: "Vrij meanderende watergang", href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/vrij-meanderend" },
  { title: "Watergang met dijk", href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/met-dijk" },
  { title: "Lijnvormig element", href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/lijnvormig-element" },
  { title: "Weg - watergang", href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/weg-watergang" },
  { title: "Bronloop", href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/bronloop" },
  { title: "Holle weg", href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/holle-weg" },
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
  { title: "Stuwhoofd", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/stuw/stuwhoofd" },
  { title: "Regelconstructie", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/stuw/regelconstructie" },
  { title: "Aandrijving en bewegingswerk", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/stuw/aandrijving-en-bewegingswerk" },
  { title: "Bedienings- en besturingsinstallatie", href: "/datastandaard/objectenhandboek/watersysteem/kunstwerken/stuw/bedienings-en-besturingsinstallatie" },
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
    title: "Watergang - Watergang",
    href: "/datastandaard/objectenhandboek/watersysteem/intersectie/watergang-watergang",
    parentTitle: "Intersectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/intersectie",
    summary: "Lokale uitwerking van een intersectie waar twee watergangen elkaar raken of op elkaar aansluiten.",
    definition: "Een Watergang - Watergang-intersectie is een lokale uitwerking van Intersectie voor de kruising of aansluiting tussen twee watergangen.",
    definitionSource: "Lokale definitie binnen het Objectenhandboek Waterschap Limburg.",
    relatedTerms: [
      {
        title: "Oppervlaktewaterknooppunt",
        text: "IMWA-WS-definitie: een punt binnen een hydrologisch netwerk.",
        href: "https://aquo-standaard.github.io/IMWA-WS/#global_class_Watersysteem_OppervlaktewaterKnooppunt"
      }
    ]
  },
  {
    title: "Watergang - Weg",
    href: "/datastandaard/objectenhandboek/watersysteem/intersectie/watergang-weg",
    parentTitle: "Intersectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/intersectie",
    summary: "Lokale uitwerking van een intersectie waar een watergang een wegverbinding kruist.",
    definition: "Een Watergang - Weg-intersectie is een lokale uitwerking van Intersectie voor de kruising tussen een watergang en een wegverbinding.",
    definitionSource: "Lokale definitie binnen het Objectenhandboek Waterschap Limburg.",
    relatedTerms: [
      {
        title: "Oppervlaktewaterkruising",
        text: "IMWA-WS-definitie: een element in een hydrologisch netwerk dat wordt gebruikt om een kruising aan te geven van oppervlaktewater segmenten die geen interactie met elkaar hebben, doordat deze segmenten in het verticale vlak gescheiden zijn.",
        href: "https://aquo-standaard.github.io/IMWA-WS/#global_class_Watersysteem_OppervlaktewaterKruising"
      }
    ]
  },
  {
    title: "Watergang - Waterkering",
    href: "/datastandaard/objectenhandboek/watersysteem/intersectie/watergang-waterkering",
    parentTitle: "Intersectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/intersectie",
    summary: "Lokale uitwerking van een intersectie waar een watergang een waterkering kruist.",
    definition: "Een Watergang - Waterkering-intersectie is een lokale uitwerking van Intersectie voor de kruising tussen een watergang en een waterkering.",
    definitionSource: "Lokale definitie binnen het Objectenhandboek Waterschap Limburg.",
    relatedTerms: [
      {
        title: "Oppervlaktewaterkruising",
        text: "IMWA-WS-definitie: een element in een hydrologisch netwerk dat wordt gebruikt om een kruising aan te geven van oppervlaktewater segmenten die geen interactie met elkaar hebben, doordat deze segmenten in het verticale vlak gescheiden zijn.",
        href: "https://aquo-standaard.github.io/IMWA-WS/#global_class_Watersysteem_OppervlaktewaterKruising"
      }
    ]
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
    title: "Onderhoudspad",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/onderhoudspad",
    parentTitle: "Watergangsectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie"
  },
  {
    title: "Beschoeiing",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/beschoeiing",
    parentTitle: "Watergangsectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie"
  },
  {
    title: "Profielgrens",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/profielgrens",
    parentTitle: "Watergangsectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie"
  },
  {
    title: "Waterprofiel",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/waterprofiel",
    parentTitle: "Watergangsectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie"
  },
  {
    title: "Bovenloopprofiel",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/bovenloopprofiel",
    parentTitle: "Bronloop",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/bronloop"
  },
  {
    title: "Verdiept profiel",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/verdiept-profiel",
    parentTitle: "Holle weg",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/holle-weg"
  },
  {
    title: "Randzone",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/randzone",
    parentTitle: "Watergangsectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie"
  },
  {
    title: "Dijkprofiel",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/dijkprofiel",
    parentTitle: "Watergang met dijk",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/met-dijk"
  },
  {
    title: "Profielzone",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/profielzone",
    parentTitle: "Watergang met accoladeprofiel",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/met-accoladeprofiel"
  },
  {
    title: "Wandconstructie",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/wandconstructie",
    parentTitle: "Watergang met wandconstructie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/met-wandconstructie"
  },
  {
    title: "Meanderzone",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/meanderzone",
    parentTitle: "Vrij meanderende watergang",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/vrij-meanderend"
  },
  {
    title: "Oever",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/oever",
    parentTitle: "Watergangsectie",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie"
  },
  {
    title: "Wegprofiel",
    href: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/wegprofiel",
    parentTitle: "Weg - watergang",
    parentHref: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/weg-watergang"
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
