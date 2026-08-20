import { formatNewsDate, type NewsItem } from "@/lib/news";

/**
 * Aggregated headline list. Every row links out to the publisher — these are
 * other people's stories, so the source name and the outbound arrow are part
 * of the row rather than decoration.
 */
export function NewsList({ items }: { items: NewsItem[] }) {
  if (items.length === 0) {
    return (
      <p className="max-w-[8.4rem] border border-black/15 bg-neutral-50 p-[0.36rem] md:p-[0.24rem] text-[0.26rem] md:text-[0.15rem] leading-relaxed text-black/60">
        No headlines came back from our sources this cycle. The feed refreshes on its own — check
        back shortly, or read our own guides below in the meantime.
      </p>
    );
  }

  return (
    <ul className="max-w-[10.8rem] border-t border-black/10">
      {items.map((item) => (
        <li key={item.link} className="border-b border-black/10">
          <a
            href={item.link}
            target="_blank"
            // Outbound links to third-party publishers: no referrer leakage, no
            // link equity passed, no window.opener handle.
            rel="noopener noreferrer nofollow"
            className="group flex gap-[0.24rem] md:gap-[0.2rem] py-[0.34rem] md:py-[0.24rem]"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-[0.2rem] gap-y-[0.06rem] font-mono uppercase tracking-[0.14em] text-[0.18rem] md:text-[0.11rem] text-black/45">
                <span className={item.relevance === 2 ? "text-[#6b9b37]" : undefined}>
                  {item.source}
                </span>
                {item.published && (
                  <>
                    <span aria-hidden>·</span>
                    <time dateTime={item.published}>{formatNewsDate(item.published)}</time>
                  </>
                )}
                {item.relevance === 2 && (
                  <>
                    <span aria-hidden>·</span>
                    <span className="text-[#6b9b37]">Tracked brand</span>
                  </>
                )}
              </div>

              <h3 className="mt-[0.1rem] md:mt-[0.06rem] text-[0.3rem] md:text-[0.18rem] font-medium leading-snug transition-colors duration-300 group-hover:text-black/60">
                {item.title}
              </h3>

              {item.snippet && (
                <p className="mt-[0.1rem] md:mt-[0.06rem] text-[0.24rem] md:text-[0.14rem] leading-relaxed text-black/55">
                  {item.snippet}
                </p>
              )}
            </div>

            <ArrowIcon className="mt-[0.14rem] md:mt-[0.08rem] size-[0.3rem] md:size-[0.18rem] shrink-0 text-black/30 transition-transform duration-300 group-hover:translate-x-[0.04rem] group-hover:-translate-y-[0.04rem]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
