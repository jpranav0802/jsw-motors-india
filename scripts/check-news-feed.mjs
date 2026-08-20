/**
 * Health check for the news aggregator's RSS sources.
 *
 * Publishers move, rename and retire feeds without notice, and a silently
 * dead feed just means fewer stories on /news rather than an error anyone
 * sees. Run this occasionally — or from a cron — to catch that:
 *
 *   node scripts/check-news-feed.mjs
 *
 * Feed URLs are read from src/lib/news.ts so there is only one list to edit.
 */

import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/lib/news.ts", import.meta.url), "utf8");

const feeds = [...source.matchAll(/\{\s*url:\s*"([^"]+)",\s*source:\s*"([^"]+)"\s*\}/g)].map(
  ([, url, name]) => ({ url, name }),
);

if (feeds.length === 0) {
  console.error("No feeds found in src/lib/news.ts — has the FEEDS shape changed?");
  process.exit(1);
}

let dead = 0;

await Promise.all(
  feeds.map(async ({ url, name }) => {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; JSWMotorsIndiaBot/1.0; +https://jswmotorsindia.com)",
        },
        signal: AbortSignal.timeout(10000),
      });
      const body = res.ok ? await res.text() : "";
      const items = (body.match(/<item[\s>]/gi) ?? []).length;
      if (!res.ok || items === 0) {
        dead += 1;
        console.log(`DEAD  ${res.status}  items=${items}  ${name}  ${url}`);
      } else {
        console.log(`ok    ${res.status}  items=${items}  ${name}  ${url}`);
      }
    } catch (error) {
      dead += 1;
      console.log(`DEAD  ${String(error)}  ${name}  ${url}`);
    }
  }),
);

console.log(`\n${feeds.length - dead}/${feeds.length} feeds live.`);
process.exit(dead === feeds.length ? 1 : 0);
