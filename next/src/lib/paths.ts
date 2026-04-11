export function withBase(href?: string) {
  if (!href) {
    return href;
  }

  if (/^(https?:)?\/\//.test(href) || href.startsWith("#")) {
    return href;
  }

  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const relativeTarget = href === "/" ? "." : (href.startsWith("/") ? href.slice(1) : href);

  return new URL(relativeTarget, `https://example.invalid${normalizedBase}`).pathname;
}
