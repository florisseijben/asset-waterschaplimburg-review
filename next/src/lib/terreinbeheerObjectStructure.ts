import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type TerreinbeheerObjectImage = {
  src: string;
  alt: string;
  caption: string;
};

export type TerreinbeheerObjectNode = {
  id: string;
  title: string;
  slug: string;
  relativeSlug: string;
  href: string;
  kind: "family" | "group" | "object";
  familyId: string;
  familyTitle: string;
  parentTitle?: string;
  parentHref?: string;
  summary: string;
  children: TerreinbeheerObjectNode[];
  images: TerreinbeheerObjectImage[];
  previewImage?: TerreinbeheerObjectImage;
  trail: {
    title: string;
    href: string;
  }[];
};

type FamilyConfig = {
  folder: string;
  id: string;
  title: string;
  summary: string;
  excludeFolders?: string[];
};

type BuildFolderContext = {
  absolutePath: string;
  publicPath: string;
  title: string;
  slugParts: string[];
  familyId: string;
  familyTitle: string;
  kind: "family" | "group";
  parentTitle?: string;
  parentHref?: string;
  parentTrail: TerreinbeheerObjectNode["trail"];
  familySummary?: string;
  excludeFolderKeys: Set<string>;
};

const OBJECTENHANDBOEK_IMAGE_ROOT = fileURLToPath(
  new URL("../../public/images/objectenhandboek", import.meta.url)
);
const DISCIPLINE_BASE = "/datastandaard/objectenhandboek/discipline/terreinbeheer-openbare-ruimte";
const IMAGE_EXTENSIONS = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const collator = new Intl.Collator("nl", { numeric: true, sensitivity: "base" });

const familyConfigs: FamilyConfig[] = [
  {
    folder: "Constructie",
    id: "constructie",
    title: "Constructie",
    summary:
      "Constructie bevat de terreinobjecten voor afbakening en toegang, zoals hekken en poorten. Civieltechnische kunstwerken zijn hier bewust uitgezonderd.",
    excludeFolders: ["Civieltechnisch kunstwerk"]
  },
  {
    folder: "Terreindeel",
    id: "terreindeel",
    title: "Terreindeel",
    summary:
      "Terreindeel ordent de objecttypen waarmee begroeide en onbegroeide delen van een terrein worden vastgelegd."
  },
  {
    folder: "Vegetatie",
    id: "vegetatie",
    title: "Vegetatie",
    summary:
      "Vegetatie bevat de objecttypen voor bomen, gras, hagen, kruidachtige vegetatie, riet en struiken binnen de openbare ruimte."
  }
];

function normalizeKey(value: string) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " en ")
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanImageStem(value: string) {
  return value.replace(/_\d+$/g, "").trim();
}

function displayTitle(value: string) {
  const normalized = String(value || "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) {
    return "Objecttype";
  }

  return normalized
    .split(" ")
    .map((part) => {
      if (!part || /[A-Z]/.test(part.slice(1))) {
        return part;
      }

      return `${part.charAt(0).toUpperCase()}${part.slice(1)}`;
    })
    .join(" ");
}

function toPublicImageSrc(publicPath: string, fileName: string) {
  return `/${path.posix.join(publicPath, fileName).replace(/\\/g, "/")}`;
}

function isImageFile(fileName: string) {
  return IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

function readDirectoryEntries(absolutePath: string) {
  if (!existsSync(absolutePath)) {
    return [];
  }

  return readdirSync(absolutePath, { withFileTypes: true });
}

function createImage(src: string, title: string, index: number): TerreinbeheerObjectImage {
  return {
    src,
    alt: `${title} in de afbeeldingenstructuur van het Objectenhandboek.`,
    caption: `Beeldvoorbeeld ${index}. ${title}.`
  };
}

function findPreviewImage(node: Pick<TerreinbeheerObjectNode, "images" | "children">): TerreinbeheerObjectImage | undefined {
  return node.images[0] || node.children.find((child) => child.previewImage)?.previewImage;
}

function createObjectSummary(title: string, parentTitle: string, familyTitle: string) {
  return `${title} is als objecttype opgenomen onder ${parentTitle}, binnen de objectfamilie ${familyTitle}.`;
}

function createGroupSummary(title: string, familyTitle: string, childCount: number, imageCount: number) {
  if (childCount > 0) {
    return `${title} bevat ${childCount} onderliggende objecttype${childCount === 1 ? "" : "n"} binnen de objectfamilie ${familyTitle}.`;
  }

  if (imageCount > 0) {
    return `${title} bevat beeldvoorbeelden binnen de objectfamilie ${familyTitle}.`;
  }

  return `${title} is onderdeel van de objectfamilie ${familyTitle}; de onderliggende objecttypen volgen zodra er foto's in deze map zijn toegevoegd.`;
}

function buildImageObjectNodes(
  context: BuildFolderContext,
  parentHref: string,
  trail: TerreinbeheerObjectNode["trail"]
): TerreinbeheerObjectNode[] {
  const imageGroups = new Map<
    string,
    {
      title: string;
      files: string[];
    }
  >();

  readDirectoryEntries(context.absolutePath)
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .forEach((entry) => {
      const parsed = path.parse(entry.name);
      const title = displayTitle(cleanImageStem(parsed.name));
      const key = normalizeKey(title);
      const group = imageGroups.get(key) || { title, files: [] };

      group.files.push(entry.name);
      imageGroups.set(key, group);
    });

  return [...imageGroups.entries()]
    .sort(([, left], [, right]) => collator.compare(left.title, right.title))
    .map(([slug, group]) => {
      const slugParts = [...context.slugParts, slug];
      const relativeSlug = slugParts.join("/");
      const href = `${DISCIPLINE_BASE}/${relativeSlug}`;
      const images = group.files
        .sort((left, right) => collator.compare(left, right))
        .map((fileName, index) => createImage(toPublicImageSrc(context.publicPath, fileName), group.title, index + 1));

      return {
        id: relativeSlug,
        title: group.title,
        slug,
        relativeSlug,
        href,
        kind: "object",
        familyId: context.familyId,
        familyTitle: context.familyTitle,
        parentTitle: context.title,
        parentHref,
        summary: createObjectSummary(group.title, context.title, context.familyTitle),
        children: [],
        images,
        previewImage: images[0],
        trail: [...trail, { title: group.title, href }]
      };
    });
}

function buildFolderNode(context: BuildFolderContext): TerreinbeheerObjectNode {
  const relativeSlug = context.slugParts.join("/");
  const href = `${DISCIPLINE_BASE}/${relativeSlug}`;
  const trail = [...context.parentTrail, { title: context.title, href }];
  const folderChildren = readDirectoryEntries(context.absolutePath)
    .filter((entry) => entry.isDirectory())
    .filter((entry) => !context.excludeFolderKeys.has(normalizeKey(entry.name)))
    .sort((left, right) => collator.compare(left.name, right.name))
    .map((entry) => {
      const title = displayTitle(entry.name);
      const slug = normalizeKey(title);

      return buildFolderNode({
        absolutePath: path.join(context.absolutePath, entry.name),
        publicPath: path.posix.join(context.publicPath, entry.name),
        title,
        slugParts: [...context.slugParts, slug],
        familyId: context.familyId,
        familyTitle: context.familyTitle,
        kind: "group",
        parentTitle: context.title,
        parentHref: href,
        parentTrail: trail,
        excludeFolderKeys: context.excludeFolderKeys
      });
    });
  const objectChildren = buildImageObjectNodes(context, href, trail);
  const children = [...folderChildren, ...objectChildren];
  const images = readDirectoryEntries(context.absolutePath)
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .sort((left, right) => collator.compare(left.name, right.name))
    .map((entry, index) => createImage(toPublicImageSrc(context.publicPath, entry.name), context.title, index + 1));
  const summary =
    context.kind === "family"
      ? context.familySummary || createGroupSummary(context.title, context.familyTitle, children.length, images.length)
      : createGroupSummary(context.title, context.familyTitle, children.length, images.length);
  const node: TerreinbeheerObjectNode = {
    id: relativeSlug,
    title: context.title,
    slug: context.slugParts[context.slugParts.length - 1],
    relativeSlug,
    href,
    kind: context.kind,
    familyId: context.familyId,
    familyTitle: context.familyTitle,
    parentTitle: context.parentTitle,
    parentHref: context.parentHref,
    summary,
    children,
    images,
    trail
  };

  node.previewImage = findPreviewImage(node);
  return node;
}

function buildFamilies() {
  return familyConfigs
    .map((family) => {
      const folderPath = path.join(OBJECTENHANDBOEK_IMAGE_ROOT, family.folder);

      if (!existsSync(folderPath)) {
        return undefined;
      }

      return buildFolderNode({
        absolutePath: folderPath,
        publicPath: path.posix.join("images/objectenhandboek", family.folder),
        title: family.title,
        slugParts: [family.id],
        familyId: family.id,
        familyTitle: family.title,
        kind: "family",
        parentTrail: [],
        familySummary: family.summary,
        excludeFolderKeys: new Set((family.excludeFolders || []).map(normalizeKey))
      });
    })
    .filter(Boolean) as TerreinbeheerObjectNode[];
}

function flattenNodes(nodes: TerreinbeheerObjectNode[]): TerreinbeheerObjectNode[] {
  return nodes.flatMap((node) => [node, ...flattenNodes(node.children)]);
}

export function getTerreinbeheerObjectFamilies() {
  return buildFamilies();
}

export function getTerreinbeheerObjectNodes() {
  return flattenNodes(getTerreinbeheerObjectFamilies());
}

export function getTerreinbeheerLeafObjectNodes() {
  return getTerreinbeheerObjectNodes().filter((node) => node.kind === "object");
}

export function getTerreinbeheerNodeByRelativeSlug(relativeSlug: string) {
  const normalizedSlug = String(relativeSlug || "").replace(/^\/+|\/+$/g, "");

  return getTerreinbeheerObjectNodes().find((node) => node.relativeSlug === normalizedSlug);
}
