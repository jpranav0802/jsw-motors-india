import type { MetadataRoute } from "next";

import { articles } from "@/data/articles";
import { specModels } from "@/data/specifications";
import { siteUrl } from "@/lib/site";

/**
 * Generates `/sitemap.xml` for search engines (submit this URL in Google
 * Search Console → Sitemaps). Route paths are kept in sync with the App Router
 * segments under `src/app`; vehicle spec pages are derived from `specModels`
 * and the guides from the article list, so publishing an article adds it here
 * automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  interface Route {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    /** Falls back to the build time when a route has no date of its own. */
    lastModified?: Date;
  }

  const staticRoutes: Route[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/news", changeFrequency: "daily", priority: 0.9 },
    { path: "/guides", changeFrequency: "weekly", priority: 0.9 },
    { path: "/jaecoo-j5", changeFrequency: "monthly", priority: 0.8 },
    { path: "/v23", changeFrequency: "monthly", priority: 0.8 },
    { path: "/faqs", changeFrequency: "monthly", priority: 0.7 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
    { path: "/register", changeFrequency: "monthly", priority: 0.5 },
    { path: "/disclaimer", changeFrequency: "yearly", priority: 0.4 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  const specRoutes: Route[] = specModels.map((vehicle) => ({
    path: `/${vehicle}/specification`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const guideRoutes: Route[] = articles.map((article) => ({
    path: `/guides/${article.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    // Articles carry their own dates, so search engines see real freshness.
    lastModified: new Date(`${article.updated ?? article.published}T00:00:00Z`),
  }));

  return [...staticRoutes, ...specRoutes, ...guideRoutes].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: route.lastModified ?? lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
