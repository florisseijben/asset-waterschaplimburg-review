import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

type ImageVariant = {
  src: string;
  width: number;
};

export type ResponsiveImageSources = {
  src: string;
  srcset?: ImageVariant[];
  sizes?: string;
};

const RESPONSIVE_WIDTHS = [760, 1024] as const;
const RESPONSIVE_SIZES = "(max-width: 820px) 92vw, 1024px";
const publicDir = fileURLToPath(new URL("../../public", import.meta.url));

function toPublicFilePath(src: string) {
  return path.join(publicDir, ...src.replace(/^\/+/, "").split("/"));
}

function getJpgVariantSrc(src: string, width: number) {
  const extensionIndex = src.lastIndexOf(".");

  if (extensionIndex <= 0) {
    return undefined;
  }

  return `${src.slice(0, extensionIndex)}-${width}.jpg`;
}

export function getResponsiveImageSources(src: string): ResponsiveImageSources {
  const srcset = RESPONSIVE_WIDTHS.map((width) => {
    const variantSrc = getJpgVariantSrc(src, width);

    if (!variantSrc || !existsSync(toPublicFilePath(variantSrc))) {
      return undefined;
    }

    return { src: variantSrc, width };
  }).filter(Boolean) as ImageVariant[];

  if (!srcset.length) {
    return { src };
  }

  return {
    src: srcset[srcset.length - 1].src,
    srcset,
    sizes: RESPONSIVE_SIZES
  };
}
