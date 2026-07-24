import type { MetadataRoute } from "next";

import { specModels } from "@/data/specifications";
import { siteUrl } from "@/lib/site";

/**
 * Generates `/sitemap.xml` for search engines (submit this URL in Google
 * Search Console → Sitemaps). Route paths are kept in sync with the App Router
 * segments under `src/app`; vehicle spec pages are derived from `specModels`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/register", changeFrequency: "monthly", priority: 0.9 },
    { path: "/jaecoo-j5", changeFrequency: "monthly", priority: 0.8 },
    { path: "/v23", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/faqs", changeFrequency: "monthly", priority: 0.6 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
  ];

  const specRoutes = specModels.map((vehicle) => ({
    path: `/${vehicle}/specification`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...specRoutes].map(
    ({ path, changeFrequency, priority }) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );
}
