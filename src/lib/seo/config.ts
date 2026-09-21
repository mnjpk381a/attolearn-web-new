// Set these on the public website only. The learning portal remains noindex.
export function publicOrigin(
  value = process.env.NEXT_PUBLIC_SITE_URL ?? "https://attolearn.com",
): string | null {
  if (!value) return null;
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be the canonical HTTPS website origin, without a path, query or credentials.",
    );
  }
  if (["portal.attolearn.com", "al.attolearn.com"].includes(url.hostname)) {
    throw new Error(
      "Use the public marketing origin, not the learning portal origin.",
    );
  }
  return url.origin;
}

export const siteOrigin = publicOrigin();
export const indexingEnabled =
  Boolean(siteOrigin) &&
  process.env.NODE_ENV === "production" &&
  process.env.SEO_INDEXING_ENABLED !== "false";
export const privateRobots = {
  index: false,
  follow: false,
  nosnippet: true,
} as const;

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
