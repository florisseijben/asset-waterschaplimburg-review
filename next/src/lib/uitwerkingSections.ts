import { getObjectTypeHref } from "./objectTypeRoutes";

type SectionLinkItem = {
  title: string;
  text: string;
  href?: string;
  iconTitle?: string;
  image?: SectionImage;
  caption?: string;
};

type SectionImage = {
  src: string;
  alt?: string;
};

type ContentSection = {
  title: string;
  summary: string;
  href?: string;
  iconTitle?: string;
  items?: SectionLinkItem[];
  image?: SectionImage;
  caption?: string;
};

const GEOMETRY_ORDER = ["Grootschalig", "Midschalig", "Kleinschalig"] as const;

function normalizeGeometryItems(items: SectionLinkItem[] = []) {
  return GEOMETRY_ORDER.map((title) => {
    const existing = items.find((item) => item.title === title);

    if (existing) {
      return existing;
    }

    return {
      title,
      text: "Nog in te vullen voor dit schaalniveau."
    };
  });
}

type NormalizedUitwerkingOptions = {
  subtypes?: SectionLinkItem[];
  compositionTypes?: SectionLinkItem[];
  subtypeIconTitle?: string;
  includeTypen?: boolean;
  includeGeometry?: boolean;
  includeOnderdelenWithCompositionTypes?: boolean;
  excludeTitles?: string[];
};

function createTypenSection(compositionTypes: SectionLinkItem[] = [], subtypeIconTitle?: string): ContentSection {
  return {
    title: "Typen",
    summary: compositionTypes.length
      ? "Deze pagina onderscheidt de typen naar compositie binnen deze lijn."
      : "Typen en varianten voor deze pagina worden later uitgewerkt.",
    items: compositionTypes.length
      ? compositionTypes.map((compositionType) => ({
          ...compositionType,
          href: getObjectTypeHref(compositionType.title, compositionType.href),
          iconTitle: compositionType.iconTitle || subtypeIconTitle
        }))
      : [
          {
            title: "Nog in uitwerking",
            text: "Typen en varianten voor deze pagina volgen in een volgende uitwerkingsslag."
          }
        ]
  };
}

function insertTypenSection(sections: ContentSection[], typenSection: ContentSection) {
  if (sections.some((section) => section.title === "Typen")) {
    return sections;
  }

  const onderdelenIndex = sections.findIndex((section) => section.title === "Onderdelen");
  if (onderdelenIndex >= 0) {
    return [
      ...sections.slice(0, onderdelenIndex),
      typenSection,
      ...sections.slice(onderdelenIndex)
    ];
  }

  const geometrieIndex = sections.findIndex((section) => section.title === "Geometrie");
  if (geometrieIndex >= 0) {
    return [
      ...sections.slice(0, geometrieIndex),
      typenSection,
      ...sections.slice(geometrieIndex)
    ];
  }

  return [...sections, typenSection];
}

export function normalizeUitwerkingSections(
  sections: ContentSection[] = [],
  options: NormalizedUitwerkingOptions = {}
) {
  const compositionTypes = options.compositionTypes || options.subtypes || [];
  const excludedTitles = new Set(options.excludeTitles || []);
  const visibleSections = sections.filter((section) => {
    if (excludedTitles.has(section.title)) {
      return false;
    }

    if (options.includeGeometry === false && section.title === "Geometrie") {
      return false;
    }

    if (
      options.includeOnderdelenWithCompositionTypes !== true &&
      compositionTypes.length > 0 &&
      section.title === "Onderdelen"
    ) {
      return false;
    }

    return true;
  });

  const withTypen =
    options.includeTypen === false || compositionTypes.length === 0
      ? visibleSections
      : insertTypenSection(visibleSections, createTypenSection(compositionTypes, options.subtypeIconTitle));

  return withTypen.map((section) => {
    const normalizedSection =
      section.title === "Geometrie"
        ? {
            ...section,
            items: normalizeGeometryItems(section.items)
          }
        : section;

    return {
      ...normalizedSection,
      href: getObjectTypeHref(normalizedSection.title, normalizedSection.href),
      items: normalizedSection.items?.map((item) => ({
        ...item,
        href: getObjectTypeHref(item.title, item.href)
      }))
    };
  });
}

export function normalizeHoofdstukUitwerkingSections(sections: ContentSection[] = []) {
  return normalizeUitwerkingSections(sections, {
    includeTypen: false,
    includeGeometry: false,
    excludeTitles: ["Decompositie", "Typen"]
  });
}

export function getGeometrySection(sections: ContentSection[] = []) {
  const geometrySection = sections.find((section) => section.title === "Geometrie");

  if (!geometrySection) {
    return undefined;
  }

  return {
    ...geometrySection,
    items: normalizeGeometryItems(geometrySection.items)
  };
}

export function normalizeObjectUitwerkingSections(
  sections: ContentSection[] = [],
  options: NormalizedUitwerkingOptions = {}
) {
  return normalizeUitwerkingSections(sections, {
    ...options,
    includeGeometry: false,
    excludeTitles: [...(options.excludeTitles || []), "Decompositie"]
  });
}
