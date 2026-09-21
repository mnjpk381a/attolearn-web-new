import type { MetadataRoute } from "next";
import { indexingEnabled, siteOrigin } from "@/lib/seo/config";

export default function robots(): MetadataRoute.Robots {
  // Allow fetches of private-route noindex directives. robots.txt is not auth.
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(indexingEnabled && siteOrigin
      ? { sitemap: `${siteOrigin}/sitemap.xml` }
      : {}),
  };
}
