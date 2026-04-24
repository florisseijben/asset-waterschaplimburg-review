type SectionLinkItem = {
  title: string;
  text: string;
  href?: string;
};

type SectionImage = {
  src: string;
  alt?: string;
};

type ContentSection = {
  title: string;
  summary: string;
  href?: string;
  items?: SectionLinkItem[];
  image?: SectionImage;
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
  includeTypen?: boolean;
};

function createTypenSection(subtypes: SectionLinkItem[] = []): ContentSection {
  return {
    title: "Typen",
    summary: subtypes.length
      ? "Deze pagina onderscheidt de belangrijkste typen en varianten binnen deze lijn."
      : "Typen en varianten voor deze pagina worden later uitgewerkt.",
    items: subtypes.length
      ? subtypes
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
  const withTypen =
    options.includeTypen === false
      ? sections
      : insertTypenSection(sections, createTypenSection(options.subtypes || []));

  return withTypen.map((section) =>
    section.title === "Geometrie"
      ? {
          ...section,
          items: normalizeGeometryItems(section.items)
        }
      : section
  );
}
