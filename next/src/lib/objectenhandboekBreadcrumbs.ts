import { getObjectTypeHref } from "./objectTypeRoutes";

type Breadcrumb = {
  label: string;
  href?: string;
};

type ObjectBreadcrumbOptions = {
  includeCurrentHref?: boolean;
  currentPath?: string;
  routeTrail?: Breadcrumb[];
};

type ObjectRouteBreadcrumbInput = {
  title: string;
  parentTitle?: string;
  parentHref?: string;
};

const baseBreadcrumbs: Breadcrumb[] = [
  { label: "Home", href: "/" },
  { label: "Datastandaard", href: "/datastandaard" },
  { label: "Objectenhandboek", href: "/datastandaard/objectenhandboek" }
];

const normalizeKey = (value: string) =>
  String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const getObjectTitle = (entry: any) => entry.data.heroTitle || entry.data.title;

function validHref(value?: string) {
  const href = String(value || "").trim();

  if (!href || href === "undefined" || href === "null") {
    return undefined;
  }

  return href;
}

const normalizeHrefKey = (value?: string) => {
  let path = String(value || "").split(/[?#]/)[0] || "/";
  const base = String(import.meta.env.BASE_URL || "/").replace(/\/+$/g, "");

  if (base && base !== "/" && (path === base || path.startsWith(`${base}/`))) {
    path = path.slice(base.length) || "/";
  }

  return path.replace(/\/+$/g, "") || "/";
};

function createTrailBreadcrumbs(
  entry: any,
  trail: Breadcrumb[],
  options: ObjectBreadcrumbOptions = {}
): Breadcrumb[] {
  return [
    ...baseBreadcrumbs,
    ...trail.map((item, index) => {
      const isCurrent = index === trail.length - 1;
      const fallbackHref = isCurrent
        ? validHref(entry.data.slug) || getObjectTypeHref(item.label)
        : getObjectTypeHref(item.label);
      const href = isCurrent && !options.includeCurrentHref
        ? undefined
        : validHref(item.href) || fallbackHref;

      return href ? { label: item.label, href } : { label: item.label };
    })
  ];
}

function getObjectRouteTrail(entry: any, currentPath?: string): Breadcrumb[] | undefined {
  const path = normalizeHrefKey(currentPath);
  const currentLabel = getObjectTitle(entry);
  const disciplineBase = "/datastandaard/objectenhandboek/discipline/werktuigbouwkunde";
  const constructiesBase = `${disciplineBase}/werktuigbouwkundige-constructies`;
  const regelconstructieBase = `${constructiesBase}/regelconstructie`;

  if (path === constructiesBase || path.startsWith(`${constructiesBase}/`)) {
    const trail: Breadcrumb[] = [
      { label: "Werktuigbouwkunde", href: disciplineBase },
      { label: "Werktuigbouwkundige constructie", href: constructiesBase }
    ];

    if (path === constructiesBase) {
      return trail;
    }

    trail.push({ label: "Regelconstructie", href: regelconstructieBase });

    if (path === regelconstructieBase) {
      return trail;
    }

    return [...trail, { label: currentLabel }];
  }

  return undefined;
}

const knownAncestorLabelsByParent = new Map<string, string[]>([
  ["stroomgebied", ["Watersysteem"]],
  ["watergang", ["Watersysteem", "Stroomgebied"]],
  ["watergangsectie", ["Watersysteem", "Stroomgebied", "Watergang"]],
  ["intersectie", ["Watersysteem", "Stroomgebied", "Watergang"]],
  ["regenwaterbuffer", ["Watersysteem", "Stroomgebied"]],
  ["regenwaterbuffercompartiment", ["Watersysteem", "Stroomgebied", "Regenwaterbuffer"]],
  ["kunstwerk", ["Watersysteem", "Stroomgebied"]],
  ["talud", ["Watersysteem", "Stroomgebied", "Watergang", "Watergangsectie"]],
  ["bekledingsconstructie", ["Watersysteem", "Stroomgebied", "Watergang", "Watergangsectie", "Talud"]]
]);

export function createObjectBreadcrumbs(entry: any, options: ObjectBreadcrumbOptions = {}): Breadcrumb[] {
  const routeTrail = options.routeTrail || getObjectRouteTrail(entry, options.currentPath);

  if (routeTrail) {
    return createTrailBreadcrumbs(entry, routeTrail, options);
  }

  const currentLabel = getObjectTitle(entry);
  const currentKey = normalizeKey(currentLabel);
  const hierarchy = Array.isArray(entry.data.hierarchy)
    ? entry.data.hierarchy.map(String).filter(Boolean)
    : [];
  const labels = hierarchy.some((label) => normalizeKey(label) === currentKey)
    ? hierarchy
    : [...hierarchy, currentLabel];

  return [
    ...baseBreadcrumbs,
    ...labels.map((label, index) => {
      const isCurrent = normalizeKey(label) === currentKey && index === labels.length - 1;
      const href = isCurrent
        ? options.includeCurrentHref
          ? validHref(entry.data.slug) || getObjectTypeHref(label)
          : undefined
        : getObjectTypeHref(label);

      return href ? { label, href } : { label };
    })
  ];
}

export function createObjectRouteBreadcrumbs(page: ObjectRouteBreadcrumbInput): Breadcrumb[] {
  const parentLabels = page.parentTitle
    ? [
        ...(knownAncestorLabelsByParent.get(normalizeKey(page.parentTitle)) || []),
        page.parentTitle
      ]
    : [];

  const parentCrumbs = parentLabels.map((label, index) => {
    const isDirectParent = index === parentLabels.length - 1;
    const href = isDirectParent && page.parentHref
      ? page.parentHref
      : getObjectTypeHref(label);

    return href ? { label, href } : { label };
  });

  return [
    ...baseBreadcrumbs,
    ...parentCrumbs,
    { label: page.title }
  ];
}
