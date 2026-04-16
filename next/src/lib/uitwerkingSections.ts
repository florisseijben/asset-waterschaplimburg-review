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

export function normalizeUitwerkingSections(sections: ContentSection[] = []) {
  return sections.map((section) =>
    section.title === "Geometrie"
      ? {
          ...section,
          items: normalizeGeometryItems(section.items)
        }
      : section
  );
}
