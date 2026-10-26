"use client";

/* eslint-disable @next/next/no-img-element -- local /public studio shots at a fixed
   aspect; next/image's loader fights the rem-scaled canvas, as elsewhere. */
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import type { LaunchWatchEntry } from "@/data/launch-watch";
import type { ModelTag, NewsItem } from "@/lib/news";
import { cn } from "@/lib/utils";

/** A news item with its date pre-formatted on the server (avoids hydration drift). */
export type HubItem = NewsItem & { dateLabel: string };

type Filter = "all" | ModelTag;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All stories" },
  { key: "combat", label: "JSW Combat" },
  { key: "j5", label: "Jaecoo J5" },
  { key: "v23", label: "iCAR V23" },
  { key: "jsw", label: "JSW Motors" },
];

const TAG_LABEL: Record<ModelTag, string> = {
  combat: "Combat",
  j5: "Jaecoo J5",
  v23: "iCAR V23",
  jsw: "JSW Motors",
};

const PAGE_SIZE = 24;
/** Tracked-car stories pinned to the top of "All stories". */
const PINNED = 4;

interface NewsHubProps {
  items: HubItem[];
  sources: string[];
  counts: Record<Filter, number>;
  launchWatch: LaunchWatchEntry[];
  statusLine: string;
}

export function NewsHub({ items, sources, counts, launchWatch, statusLine }: NewsHubProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [source, setSource] = useState<string>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const feedRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const matching = items.filter(
      (item) =>
        (filter === "all" || item.models.includes(filter)) &&
        (source === "all" || item.source === source),
    );
    if (filter !== "all") return matching;
    // On the unfiltered view, the newest stories about the tracked cars lead,
    // then everything else by date.
    const pinned = matching.filter((item) => item.models.length > 0).slice(0, PINNED);
    return [...pinned, ...matching.filter((item) => !pinned.includes(item))];
  }, [items, filter, source]);

  const choose = (next: Filter, scroll = false) => {
    setFilter(next);
    setVisible(PAGE_SIZE);
    if (scroll) feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const shown = filtered.slice(0, visible);

  return (
    <div>
      {/* ── Launch watch ─────────────────────────────────────── */}
      <section aria-labelledby="launch-watch">
        <div className="flex flex-wrap items-end justify-between gap-[0.2rem]">
          <h2 id="launch-watch" className="font-display text-[0.5rem] md:text-[0.32rem] leading-none font-medium">
            India launch watch
          </h2>
          <p className="font-mono uppercase tracking-[0.14em] text-[0.18rem] md:text-[0.11rem] text-black/40">
            Status as reported by the Indian motoring press
          </p>
        </div>

        <ul className="mt-[0.4rem] md:mt-[0.28rem] grid gap-[0.4rem] md:gap-[0.24rem] md:grid-cols-3">
          {launchWatch.map((car) => (
            <li
              key={car.tag}
              className="group/car flex flex-col overflow-hidden border border-black/10 bg-white transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-[0.03rem] hover:border-black/30 hover:shadow-[0_0.12rem_0.4rem_rgba(0,0,0,0.08)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-b from-neutral-100 to-neutral-200">
                <img
                  src={car.image}
                  alt={car.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-contain p-[0.2rem] md:p-[0.14rem] transition-transform duration-700 group-hover/car:scale-[1.05]"
                />
                <span
                  className={cn(
                    "absolute left-[0.2rem] top-[0.2rem] md:left-[0.14rem] md:top-[0.14rem] inline-flex items-center gap-[0.08rem] md:gap-[0.06rem] rounded-full px-[0.16rem] md:px-[0.1rem] py-[0.05rem] md:py-[0.03rem] font-mono uppercase tracking-[0.12em] text-[0.18rem] md:text-[0.1rem]",
                    car.imminent ? "bg-black text-brand-lime" : "bg-white/90 text-black/70",
                  )}
                >
                  {car.imminent && (
                    <span aria-hidden="true" className="relative flex size-[0.1rem] md:size-[0.06rem]">
                      <span className="absolute inset-0 animate-ping rounded-full bg-brand-lime" />
                      <span className="relative size-full rounded-full bg-brand-lime" />
                    </span>
                  )}
                  {car.status}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-[0.3rem] md:p-[0.2rem]">
                <p className="font-display text-[0.38rem] md:text-[0.24rem] leading-none">{car.name}</p>
                <p className="mt-[0.06rem] md:mt-[0.04rem] text-[0.22rem] md:text-[0.13rem] text-black/45">
                  Global name: {car.globalName}
                </p>
                <dl className="mt-[0.2rem] md:mt-[0.14rem] grid grid-cols-[auto_1fr] gap-x-[0.16rem] md:gap-x-[0.1rem] gap-y-[0.06rem] md:gap-y-[0.04rem] text-[0.24rem] md:text-[0.14rem]">
                  <dt className="text-black/45">Timing</dt>
                  <dd>{car.timing}</dd>
                  <dt className="text-black/45">Price</dt>
                  <dd>{car.price}</dd>
                </dl>
                <p className="mt-[0.16rem] md:mt-[0.1rem] text-[0.24rem] md:text-[0.14rem] leading-relaxed text-black/60">
                  {car.summary}
                </p>
                <div className="mt-auto pt-[0.24rem] md:pt-[0.16rem] flex flex-wrap items-center gap-[0.16rem] md:gap-[0.1rem]">
                  <button
                    type="button"
                    onClick={() => choose(car.tag, true)}
                    className="inline-flex items-center h-[0.6rem] md:h-[0.36rem] px-[0.24rem] md:px-[0.16rem] rounded-full bg-black text-white text-[0.22rem] md:text-[0.13rem] font-medium transition-colors duration-300 hover:bg-brand-lime hover:text-black"
                  >
                    {counts[car.tag]} {counts[car.tag] === 1 ? "story" : "stories"}
                  </button>
                  <Link
                    href={car.href}
                    className="text-[0.22rem] md:text-[0.13rem] text-black/60 underline underline-offset-4 transition-colors hover:text-black"
                  >
                    Model page
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Live feed ────────────────────────────────────────── */}
      <section ref={feedRef} aria-labelledby="latest-news" className="mt-[0.9rem] md:mt-[0.6rem] scroll-mt-[1.6rem] md:scroll-mt-[1rem]">
        <div className="flex flex-wrap items-end justify-between gap-[0.2rem]">
          <h2 id="latest-news" className="font-display text-[0.5rem] md:text-[0.32rem] leading-none font-medium">
            Latest from the motoring press
          </h2>
          <p className="flex items-center gap-[0.08rem] font-mono uppercase tracking-[0.14em] text-[0.18rem] md:text-[0.11rem] text-black/40">
            <span aria-hidden="true" className="relative flex size-[0.1rem] md:size-[0.06rem]">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#6b9b37]" />
              <span className="relative size-full rounded-full bg-[#6b9b37]" />
            </span>
            {statusLine}
          </p>
        </div>

        {/* Car filter */}
        <div role="group" aria-label="Filter by car" className="mt-[0.36rem] md:mt-[0.24rem] flex flex-wrap gap-[0.12rem] md:gap-[0.08rem]">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              aria-pressed={filter === key}
              onClick={() => choose(key)}
              className={cn(
                "inline-flex items-center gap-[0.08rem] md:gap-[0.06rem] rounded-full border px-[0.22rem] md:px-[0.14rem] py-[0.08rem] md:py-[0.05rem] text-[0.24rem] md:text-[0.14rem] transition-colors duration-300",
                filter === key
                  ? "border-black bg-black text-white"
                  : "border-black/15 text-black/70 hover:border-black/40 hover:text-black",
              )}
            >
              {label}
              <span className={cn("tabular-nums", filter === key ? "text-brand-lime" : "text-black/35")}>
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        {/* Source filter */}
        <div role="group" aria-label="Filter by source" className="mt-[0.16rem] md:mt-[0.1rem] flex flex-wrap items-center gap-x-[0.2rem] md:gap-x-[0.14rem] gap-y-[0.06rem] text-[0.22rem] md:text-[0.13rem]">
          <span className="font-mono uppercase tracking-[0.14em] text-[0.18rem] md:text-[0.1rem] text-black/35">Source</span>
          {["all", ...sources].map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={source === name}
              onClick={() => {
                setSource(name);
                setVisible(PAGE_SIZE);
              }}
              className={cn(
                "underline-offset-4 transition-colors duration-200",
                source === name ? "text-black underline decoration-brand-lime decoration-2" : "text-black/45 hover:text-black",
              )}
            >
              {name === "all" ? "All" : name}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <p className="mt-[0.4rem] md:mt-[0.28rem] max-w-[8.4rem] border border-black/15 bg-neutral-50 p-[0.36rem] md:p-[0.24rem] text-[0.26rem] md:text-[0.15rem] leading-relaxed text-black/60">
            No stories match this filter yet. The feed refreshes on its own every few hours — try
            another car or source, or check back soon.
          </p>
        ) : (
          <ul className="mt-[0.4rem] md:mt-[0.28rem] grid gap-[0.3rem] md:gap-[0.2rem] sm:grid-cols-2 md:grid-cols-3">
            {shown.map((item, index) => (
              <NewsCard key={item.link} item={item} featured={index === 0 && item.models.length > 0} />
            ))}
          </ul>
        )}

        {filtered.length > visible && (
          <div className="mt-[0.4rem] md:mt-[0.3rem] flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((count) => count + PAGE_SIZE)}
              className="inline-flex items-center h-[0.7rem] md:h-[0.46rem] px-[0.4rem] md:px-[0.3rem] rounded-full border border-black text-[0.24rem] md:text-[0.15rem] font-medium transition-colors duration-300 hover:bg-black hover:text-white"
            >
              Show more stories ({filtered.length - visible} left)
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function NewsCard({ item, featured }: { item: HubItem; featured: boolean }) {
  return (
    <li className={cn("animate-in fade-in slide-in-from-bottom-2 duration-500", featured && "sm:col-span-2")}>
      <a
        href={item.link}
        target="_blank"
        // Third-party publishers: no referrer leakage, no link equity, no opener.
        rel="noopener noreferrer nofollow"
        className={cn(
          "group/news relative flex h-full flex-col overflow-hidden border p-[0.3rem] md:p-[0.2rem] transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-[0.03rem]",
          featured
            ? "border-black bg-black text-white hover:shadow-[0_0.12rem_0.4rem_rgba(0,0,0,0.25)]"
            : "border-black/10 bg-white hover:border-black/30 hover:shadow-[0_0.12rem_0.4rem_rgba(0,0,0,0.08)]",
        )}
      >
        <div
          className={cn(
            "flex flex-wrap items-center gap-x-[0.14rem] md:gap-x-[0.1rem] gap-y-[0.04rem] font-mono uppercase tracking-[0.14em] text-[0.18rem] md:text-[0.1rem]",
            featured ? "text-white/50" : "text-black/45",
          )}
        >
          <span className={featured ? "text-brand-lime" : "text-[#6b9b37]"}>{item.source}</span>
          {item.dateLabel && (
            <>
              <span aria-hidden>·</span>
              <time dateTime={item.published ?? undefined}>{item.dateLabel}</time>
            </>
          )}
        </div>

        <h3
          className={cn(
            "mt-[0.12rem] md:mt-[0.08rem] font-display leading-snug",
            featured ? "text-[0.4rem] md:text-[0.28rem]" : "text-[0.3rem] md:text-[0.17rem]",
          )}
        >
          {item.title}
        </h3>

        {item.snippet && (
          <p
            className={cn(
              "mt-[0.1rem] md:mt-[0.06rem] text-[0.24rem] md:text-[0.14rem] leading-relaxed",
              featured ? "text-white/65" : "text-black/55",
            )}
          >
            {item.snippet}
          </p>
        )}

        <div className="mt-auto pt-[0.2rem] md:pt-[0.14rem] flex flex-wrap items-center gap-[0.08rem] md:gap-[0.06rem]">
          {item.models.map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-full px-[0.12rem] md:px-[0.08rem] py-[0.03rem] md:py-[0.02rem] text-[0.18rem] md:text-[0.1rem] font-medium",
                featured ? "bg-brand-lime text-black" : "bg-brand-lime/40 text-black",
              )}
            >
              {TAG_LABEL[tag]}
            </span>
          ))}
          <span
            className={cn(
              "ml-auto inline-flex items-center gap-[0.04rem] text-[0.22rem] md:text-[0.12rem]",
              featured ? "text-white/70" : "text-black/50",
            )}
          >
            Read on {item.source}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-[0.24rem] md:size-[0.14rem] transition-transform duration-300 group-hover/news:translate-x-[0.03rem] group-hover/news:-translate-y-[0.03rem]">
              <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Lime rule that draws across the bottom on hover. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[0.03rem] origin-left scale-x-0 bg-brand-lime transition-transform duration-500 group-hover/news:scale-x-100"
        />
      </a>
    </li>
  );
}
