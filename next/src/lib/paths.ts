export function withBase(href?: string) {
  if (!href) {
    return href;
  }

  if (/^(https?:)?\/\//.test(href) || href.startsWith("#")) {
    return href;
  }

  const base = import.meta.env.BASE_URL;
  const normalized = href.startsWith("/") ? href.slice(1) : href;

  return `${base}${normalized}`;
}
