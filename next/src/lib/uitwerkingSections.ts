import { getObjectTypeHref } from "./objectTypeRoutes";

type SectionLinkItem = {
  title: string;
  text: string;
  href?: string;
  iconTitle?: string;
  image?: SectionImage;
  caption?: string;
  blocks?: SectionBlock[];
};

type SectionImage = {
  src: string;
  alt?: string;
};

type SectionBlock = {
  text?: string;
  image?: SectionImage;
  caption?: string;
};

type ContentSection = {
  title: string;
  summary: string;
  href?: string;
  iconTitle?: string;
  items?: SectionLinkItem[];
  itemLayout?: "cards" | "sections";
  image?: SectionImage;
  caption?: string;
  blocks?: SectionBlock[];
};

const SCALE_LEVEL_TITLES = ["Grootschalig", "Midschalig", "Kleinschalig"] as const;
const SPATIAL_SUBSECTION_TITLES = ["Overzicht", "Dwarsprofiel", "Bovenaanzicht"] as const;
const OVERVIEW_TITLE = "Overzicht / Samenhang";
const SPATIAL_DESCRIPTION_TITLE = "Ruimtelijke beschrijving";
const PARTS_TITLE = "Onderdelen";
const ARCHETYPES_TITLE = "Archetypen";
const OVERVIEW_KEYS = new Set(["overzicht", "samenhang", "overzicht-samenhang"]);
const SPATIAL_DESCRIPTION_KEYS = new Set(["afbakening", "geometrie", "ruimtelijke-beschrijving"]);
const PARTS_KEYS = new Set(["onderdelen", "typen", "decompositie"]);

function normalizeKey(value: string) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeGeometryItems(items: SectionLinkItem[] = []) {
  return items.filter((item) => !SCALE_LEVEL_TITLES.includes(item.title as any));
}

type NormalizedUitwerkingOptions = {
  subtypes?: SectionLinkItem[];
  compositionTypes?: SectionLinkItem[];
  subtypeIconTitle?: string;
  includeTypen?: boolean;
  includeGeometry?: boolean;
  includeOnderdelenWithCompositionTypes?: boolean;
  excludeTitles?: string[];
  includeDecomposition?: boolean;
  requireStandardSections?: boolean;
};

function withoutMedia(item: SectionLinkItem): SectionLinkItem {
  return {
    title: item.title,
    text: item.text,
    href: item.href,
    iconTitle: item.iconTitle
  };
}

function createTypenSection(compositionTypes: SectionLinkItem[] = [], subtypeIconTitle?: string): ContentSection {
  return {
    title: "Typen",
    summary: compositionTypes.length
      ? "Deze pagina onderscheidt de typen naar compositie binnen deze lijn."
      : "Typen en varianten voor deze pagina worden later uitgewerkt.",
    items: compositionTypes.length
      ? compositionTypes.map((compositionType) => ({
          ...withoutMedia(compositionType),
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
  if (sections.some((section) => normalizeKey(section.title) === "typen")) {
    return sections;
  }

  const onderdelenIndex = sections.findIndex((section) => normalizeKey(section.title) === "onderdelen");
  if (onderdelenIndex >= 0) {
    return [
      ...sections.slice(0, onderdelenIndex),
      typenSection,
      ...sections.slice(onderdelenIndex)
    ];
  }

  const geometrieIndex = sections.findIndex((section) => normalizeKey(section.title) === "geometrie");
  if (geometrieIndex >= 0) {
    return [
      ...sections.slice(0, geometrieIndex),
      typenSection,
      ...sections.slice(geometrieIndex)
    ];
  }

  return [...sections, typenSection];
}

function compactSummary(parts: Array<string | undefined>) {
  return parts.map((part) => String(part || "").trim()).filter(Boolean).join(" ");
}

function uniqueBlocks(blocks: SectionBlock[] = []) {
  const seen = new Set<string>();

  return blocks.filter((block) => {
    if (!block.text && !block.image?.src) {
      return false;
    }

    const key = block.image?.src
      ? `image:${block.image.src}`
      : `text:${normalizeKey(block.text || "")}:${block.caption || ""}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function mediaBlock(image?: SectionImage, caption?: string): SectionBlock | undefined {
  if (!image?.src) {
    return undefined;
  }

  return { image, caption };
}

function mergeItemContent(current: SectionLinkItem, incoming: SectionLinkItem): SectionLinkItem {
  const blocks = uniqueBlocks([
    ...(current.blocks || []),
    ...(current.image?.src && incoming.image?.src && current.image.src !== incoming.image.src
      ? [{ image: incoming.image, caption: incoming.caption }]
      : []),
    ...(incoming.blocks || [])
  ]);
  const merged: SectionLinkItem = {
    title: current.title || incoming.title,
    text: compactSummary([current.text, incoming.text]),
    href: current.href || incoming.href,
    iconTitle: current.iconTitle || incoming.iconTitle,
    image: current.image || incoming.image,
    caption: current.caption || incoming.caption
  };

  if (blocks.length) {
    merged.blocks = blocks;
  }

  return merged;
}

function createSpatialPlaceholder(title: string): SectionLinkItem {
  const text =
    title === "Overzicht"
      ? "De ruimtelijke afbakening en geometrie worden op dit objectniveau samengebracht."
      : "Niet apart uitgewerkt voor dit objecttype.";

  return { title, text };
}

function itemToBlocks(item: SectionLinkItem): SectionBlock[] {
  return uniqueBlocks([
    item.text ? { text: `${item.title}: ${item.text}` } : undefined,
    mediaBlock(item.image, item.caption),
    ...(item.blocks || [])
  ].filter(Boolean) as SectionBlock[]);
}

function withPromotedMedia(item: SectionLinkItem, prependedBlocks: SectionBlock[] = []): SectionLinkItem {
  const blocks = uniqueBlocks([...prependedBlocks, ...(item.blocks || [])]);
  const nextItem: SectionLinkItem = { ...item };
  const primaryBlockIndex =
    nextItem.image?.src ? -1 : blocks.findIndex((block) => block.image?.src && !block.text);

  if (primaryBlockIndex >= 0) {
    const [primaryBlock] = blocks.splice(primaryBlockIndex, 1);
    nextItem.image = primaryBlock.image;
    nextItem.caption = primaryBlock.caption;
  }

  if (blocks.length) {
    nextItem.blocks = blocks;
  } else {
    delete nextItem.blocks;
  }

  return nextItem;
}

function normalizeSection(section: ContentSection): ContentSection {
  if (normalizeKey(section.title) !== "geometrie") {
    return section;
  }

  return {
    ...section,
    items: normalizeGeometryItems(section.items)
  };
}

function mergeSectionGroup(title: string, sections: ContentSection[], fallbackSummary: string): ContentSection {
  const normalizedSections = sections.map(normalizeSection);
  const primaryMediaSection = normalizedSections.find((section) => section.image?.src);
  const primaryImageSrc = primaryMediaSection?.image?.src;
  const blocks = normalizedSections.flatMap((section) => [
    ...(section.image?.src && section.image.src !== primaryImageSrc
      ? [{ image: section.image, caption: section.caption }]
      : []),
    ...(section.blocks || [])
  ]);
  const items = normalizedSections.flatMap((section) => section.items || []);
  const mergedSection: ContentSection = {
    title,
    summary: compactSummary(normalizedSections.map((section) => section.summary)) || fallbackSummary
  };

  if (primaryMediaSection?.image) {
    mergedSection.image = primaryMediaSection.image;
    mergedSection.caption = primaryMediaSection.caption;
  }

  if (blocks.length) {
    mergedSection.blocks = blocks;
  }

  if (items.length) {
    mergedSection.items = items;
  }

  return mergedSection;
}

function createSpatialDescriptionSection(sections: ContentSection[], fallbackSummary: string): ContentSection {
  const baseSection = mergeSectionGroup(SPATIAL_DESCRIPTION_TITLE, sections, fallbackSummary);
  const baseBlocks = uniqueBlocks([
    mediaBlock(baseSection.image, baseSection.caption),
    ...(baseSection.blocks || [])
  ].filter(Boolean) as SectionBlock[]);
  const standardItemKeys = new Set(SPATIAL_SUBSECTION_TITLES.map((title) => normalizeKey(title)));
  const itemsByKey = new Map<string, SectionLinkItem>();
  const extraBlocks: SectionBlock[] = [];

  (baseSection.items || []).forEach((item) => {
    const itemKey = normalizeKey(item.title);

    if (!standardItemKeys.has(itemKey)) {
      extraBlocks.push(...itemToBlocks(item));
      return;
    }

    const current = itemsByKey.get(itemKey);
    itemsByKey.set(itemKey, current ? mergeItemContent(current, item) : item);
  });

  const items = SPATIAL_SUBSECTION_TITLES.map((title) => {
    const item = itemsByKey.get(normalizeKey(title)) || createSpatialPlaceholder(title);

    if (title !== "Overzicht") {
      return withPromotedMedia(item);
    }

    return withPromotedMedia(item, uniqueBlocks([...baseBlocks, ...extraBlocks]));
  });

  return {
    title: SPATIAL_DESCRIPTION_TITLE,
    summary: baseSection.summary,
    items,
    itemLayout: "sections"
  };
}

function uniqueItems(items: SectionLinkItem[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = `${normalizeKey(item.title)}:${item.href || ""}`;

    if (!normalizeKey(item.title) || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function createGeneratedPartItems(compositionTypes: SectionLinkItem[] = [], subtypeIconTitle?: string) {
  return compositionTypes.map((compositionType) => ({
    ...withoutMedia(compositionType),
    href: getObjectTypeHref(compositionType.title, compositionType.href),
    iconTitle: compositionType.iconTitle || subtypeIconTitle
  }));
}

function createPartsSection(
  sections: ContentSection[],
  compositionTypes: SectionLinkItem[] = [],
  options: NormalizedUitwerkingOptions = {}
) {
  const hasConcretePartsSection = sections.some((section) => normalizeKey(section.title) !== "typen");
  const usesArchetypes = compositionTypes.length > 0 && !hasConcretePartsSection;
  const baseSection = mergeSectionGroup(
    usesArchetypes ? ARCHETYPES_TITLE : PARTS_TITLE,
    sections,
    usesArchetypes
      ? "Deze pagina onderscheidt de archetypen binnen deze objectlijn."
      : "Voor dit objecttype zijn nog geen onderliggende onderdelen uitgewerkt."
  );
  const generatedItems =
    options.includeTypen === false
      ? []
      : createGeneratedPartItems(compositionTypes, options.subtypeIconTitle);
  const items = uniqueItems([...(baseSection.items || []), ...generatedItems]);

  return {
    ...baseSection,
    ...(items.length ? { items } : { items: undefined })
  };
}

function normalizeSectionLinks(section: ContentSection) {
  return {
    ...section,
    href: getObjectTypeHref(section.title, section.href),
    items: section.items?.map((item) => ({
      ...item,
      href: getObjectTypeHref(item.title, item.href)
    }))
  };
}

function standardizeObjectSections(
  sections: ContentSection[] = [],
  options: NormalizedUitwerkingOptions = {}
) {
  const compositionTypes = options.compositionTypes || options.subtypes || [];
  const required = options.requireStandardSections !== false;
  const normalizedSections = sections.map(normalizeSection);
  const groupedKeys = new Set([
    ...OVERVIEW_KEYS,
    ...SPATIAL_DESCRIPTION_KEYS,
    ...PARTS_KEYS
  ]);
  const overviewSections = normalizedSections.filter((section) => OVERVIEW_KEYS.has(normalizeKey(section.title)));
  const spatialDescriptionSections = normalizedSections.filter((section) =>
    SPATIAL_DESCRIPTION_KEYS.has(normalizeKey(section.title))
  );
  const partsSections = normalizedSections.filter((section) => PARTS_KEYS.has(normalizeKey(section.title)));
  const standardSections = [
    ...(required || overviewSections.length
      ? [
          mergeSectionGroup(
            OVERVIEW_TITLE,
            overviewSections,
            "Het overzicht en de samenhang voor dit objecttype worden nog uitgewerkt."
          )
        ]
      : []),
    ...(required || spatialDescriptionSections.length
      ? [
          createSpatialDescriptionSection(
            spatialDescriptionSections,
            "De ruimtelijke beschrijving voor dit objecttype wordt nog uitgewerkt."
          )
        ]
      : []),
    ...(required || partsSections.length || compositionTypes.length
      ? [createPartsSection(partsSections, compositionTypes, options)]
      : [])
  ];
  const extraSections = normalizedSections.filter((section) => !groupedKeys.has(normalizeKey(section.title)));

  return [...standardSections, ...extraSections];
}

export function normalizeUitwerkingSections(
  sections: ContentSection[] = [],
  options: NormalizedUitwerkingOptions = {}
) {
  const compositionTypes = options.compositionTypes || options.subtypes || [];
  const excludedTitles = new Set((options.excludeTitles || []).map(normalizeKey));
  const visibleSections = sections.filter((section) => {
    const sectionKey = normalizeKey(section.title);

    if (excludedTitles.has(sectionKey)) {
      return false;
    }

    if (options.includeGeometry === false && sectionKey === "geometrie") {
      return false;
    }

    if (
      options.includeOnderdelenWithCompositionTypes !== true &&
      compositionTypes.length > 0 &&
      sectionKey === "onderdelen"
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
      normalizeKey(section.title) === "geometrie"
        ? {
            ...section,
            items: normalizeGeometryItems(section.items)
          }
        : section;

    return {
      ...normalizedSection,
      href: getObjectTypeHref(normalizedSection.title, normalizedSection.href),
      items: normalizedSection.items?.map((item) => ({
        ...(normalizeKey(normalizedSection.title) === "typen" ? withoutMedia(item) : item),
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

export function normalizeObjectUitwerkingSections(
  sections: ContentSection[] = [],
  options: NormalizedUitwerkingOptions = {}
) {
  const excludedTitles = new Set([
    ...(options.excludeTitles || []).map(normalizeKey),
    ...(options.includeDecomposition ? [] : ["decompositie"])
  ]);
  const visibleSections = sections.filter((section) => !excludedTitles.has(normalizeKey(section.title)));

  return standardizeObjectSections(visibleSections, options).map(normalizeSectionLinks);
}
