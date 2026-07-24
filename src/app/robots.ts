import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

/**
 * Generates `/robots.txt`. The `Sitemap:` directive points crawlers (and
 * Google Search Console) at the generated sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
