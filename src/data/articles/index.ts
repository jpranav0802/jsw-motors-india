import type { Article } from "@/types/article";

import { acVsDcChargingDelhiNcr } from "./ac-vs-dc-charging-delhi-ncr";
import { adaptArchitectureExplained } from "./adapt-architecture-explained";
import { evBatteryHealthIndianSummer } from "./ev-battery-health-indian-summer";
import { evSubsidiesRoadTaxByState2026 } from "./ev-subsidies-road-tax-by-state-2026";
import { highwayChargingNetworksIndia } from "./highway-charging-networks-india";
import { jswMgLineupSegmentPositioning } from "./jsw-mg-lineup-segment-positioning";
import { phevVsEvCostPerKm } from "./phev-vs-ev-cost-per-km";
import { regenerativeBrakingCityRange } from "./regenerative-braking-city-range";
import { t2VsTharRoxxVsJimny } from "./t2-vs-thar-roxx-vs-jimny";
import { upcomingSevenSeaterElectricSuvs2026 } from "./upcoming-7-seater-electric-suvs-2026";

/**
 * Every published guide, newest first. The blog index, the home page's featured
 * grid and the sitemap all read from this one list, so adding an article is a
 * matter of writing its file and adding it here.
 */
export const articles: Article[] = [
  t2VsTharRoxxVsJimny,
  upcomingSevenSeaterElectricSuvs2026,
  adaptArchitectureExplained,
  highwayChargingNetworksIndia,
  phevVsEvCostPerKm,
  jswMgLineupSegmentPositioning,
  regenerativeBrakingCityRange,
  acVsDcChargingDelhiNcr,
  evBatteryHealthIndianSummer,
  evSubsidiesRoadTaxByState2026,
].sort((a, b) => (a.published < b.published ? 1 : -1));

export function getArticle(slug: string): Article | null {
  return articles.find((article) => article.slug === slug) ?? null;
}

/** The `n` most recent guides — used by the home page's featured grid. */
export function featuredArticles(count = 6): Article[] {
  return articles.slice(0, count);
}

export const articleSlugs = articles.map((article) => article.slug);

/** "14 August 2026" — one place so cards, article headers and JSON-LD agree. */
export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
