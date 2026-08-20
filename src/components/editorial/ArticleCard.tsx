/* eslint-disable @next/next/no-img-element -- card art is served straight from
   /public at a fixed aspect; next/image's loader fights the rem-scaled canvas. */
import Link from "next/link";

import { formatArticleDate } from "@/data/articles";
import type { Article } from "@/types/article";

/** Grid card for a guide — used on the home page and the /guides index. */
export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group/card h-full">
      <Link href={`/guides/${article.slug}`} className="flex h-full flex-col">
        <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
          <img
            src={article.image}
            alt={article.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-[1.04]"
          />
        </div>

        <div className="mt-[0.24rem] md:mt-[0.16rem] flex items-center gap-[0.16rem] md:gap-[0.1rem] font-mono uppercase tracking-[0.14em] text-[0.18rem] md:text-[0.11rem] text-black/45">
          <span className="text-[#6b9b37]">{article.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={article.published}>{formatArticleDate(article.published)}</time>
        </div>

        <h3 className="mt-[0.14rem] md:mt-[0.08rem] font-display text-[0.34rem] md:text-[0.2rem] leading-snug">
          {article.title}
        </h3>

        <p className="mt-[0.14rem] md:mt-[0.08rem] text-[0.26rem] md:text-[0.15rem] leading-relaxed text-black/60">
          {article.description}
        </p>

        <span className="mt-auto pt-[0.2rem] md:pt-[0.14rem] text-[0.24rem] md:text-sm text-black/40">
          {article.readingMinutes} min read
        </span>
      </Link>
    </article>
  );
}
