import { getObjectTypeHref } from "./objectTypeRoutes";

type Breadcrumb = {
  label: string;
  href?: string;
};

type ObjectBreadcrumbOptions = {
  includeCurrentHref?: boolean;
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
          ? entry.data.slug || getObjectTypeHref(label)
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
