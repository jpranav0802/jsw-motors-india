import type { ArticleTable } from "@/types/article";

/**
 * Typographic primitives shared by the guides, the model-page written
 * overviews and the legal routes. Sizes follow the site's dual scale: an
 * explicit rem value for the 750px mobile canvas, a stock Tailwind step for
 * the 1920px desktop canvas.
 */

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[0.42rem] md:text-[0.26rem] leading-tight font-medium">
      {children}
    </h2>
  );
}

export function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-[0.24rem] md:space-y-[0.16rem] text-[0.28rem] md:text-base leading-relaxed text-black/70">
      {items.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-[0.18rem] md:space-y-[0.12rem] text-[0.28rem] md:text-base leading-relaxed text-black/70">
      {items.map((text, index) => (
        <li key={index} className="relative pl-[0.36rem] md:pl-[0.24rem]">
          <span
            aria-hidden
            className="absolute left-0 top-[0.16rem] md:top-[0.1rem] size-[0.1rem] md:size-[0.06rem] bg-black/30"
          />
          {text}
        </li>
      ))}
    </ul>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="border-l-[0.06rem] md:border-l-[0.03rem] border-brand-lime bg-neutral-50 pl-[0.3rem] md:pl-[0.2rem] pr-[0.24rem] md:pr-[0.16rem] py-[0.24rem] md:py-[0.16rem] text-[0.26rem] md:text-[0.15rem] leading-relaxed text-black/70">
      {children}
    </aside>
  );
}

/**
 * Data / comparison table. Wrapped in its own horizontal scroller so a wide
 * table never forces the page body sideways on a phone.
 */
export function DataTable({ table }: { table: ArticleTable }) {
  return (
    <figure className="my-[0.1rem]">
      <div className="overflow-x-auto border border-black/10">
        <table className="w-full min-w-[6.4rem] md:min-w-0 border-collapse text-[0.24rem] md:text-[0.15rem]">
          <thead>
            <tr className="bg-neutral-950 text-white text-left">
              {table.head.map((cell, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-[0.24rem] md:px-[0.16rem] py-[0.2rem] md:py-[0.12rem] font-medium whitespace-nowrap"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-white even:bg-neutral-50">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={
                      "px-[0.24rem] md:px-[0.16rem] py-[0.2rem] md:py-[0.12rem] align-top border-t border-black/10 " +
                      (cellIndex === 0 ? "text-black font-medium" : "text-black/70")
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.caption && (
        <figcaption className="mt-[0.16rem] md:mt-[0.1rem] text-[0.22rem] md:text-sm text-black/45">
          {table.caption}
        </figcaption>
      )}
    </figure>
  );
}
