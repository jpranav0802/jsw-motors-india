/**
 * Canonical origin for the deployed site, used to build absolute URLs for the
 * sitemap, robots.txt, and metadata. Override at build time with
 * `NEXT_PUBLIC_SITE_URL` (e.g. once a custom domain replaces the Vercel alias)
 * so search-engine URLs match the live property exactly. No trailing slash.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://jswmotorsindia.com";
