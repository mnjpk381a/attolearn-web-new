import type { MetadataRoute } from "next";
import { indexingEnabled, siteOrigin } from "@/lib/seo/config";
import { searchPages } from "@/lib/seo/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin;
  if (!indexingEnabled || !origin) return [];
  // Add approved pages to the registry; never include auth, dashboards or previews.
  return searchPages
    .filter((page) => page.published)
    .map((page) => ({
      url: new URL(page.path, origin).href,
      changeFrequency: page.path === "/" ? "weekly" : "monthly",
      priority: page.path === "/" ? 1 : page.path === "/pricing" ? 0.9 : 0.8,
    }));
}
