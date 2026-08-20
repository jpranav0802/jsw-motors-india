export interface ProsConsProps {
  /** Optional heading rendered above the two columns. */
  title?: string;
  pros: string[];
  cons: string[];
  /** Rendered under the columns — use it to state what is still unconfirmed. */
  note?: string;
}

/** Two-column objective assessment used on the model and specification pages. */
export function ProsCons({ title, pros, cons, note }: ProsConsProps) {
  return (
    <div>
      {title && (
        <h2 className="font-display text-[0.42rem] md:text-[0.26rem] leading-tight font-medium">
          {title}
        </h2>
      )}

      <div className="mt-[0.3rem] md:mt-[0.2rem] grid gap-[0.3rem] md:gap-[0.2rem] md:grid-cols-2">
        <Column tone="pro" heading="What works in its favour" items={pros} />
        <Column tone="con" heading="What to weigh carefully" items={cons} />
      </div>

      {note && (
        <p className="mt-[0.24rem] md:mt-[0.16rem] text-[0.22rem] md:text-sm text-black/45">{note}</p>
      )}
    </div>
  );
}

function Column({
  tone,
  heading,
  items,
}: {
  tone: "pro" | "con";
  heading: string;
  items: string[];
}) {
  const accent = tone === "pro" ? "border-t-[#6b9b37]" : "border-t-neutral-900";
  return (
    <section className={`border border-black/10 border-t-[0.06rem] md:border-t-[0.04rem] ${accent} p-[0.3rem] md:p-[0.2rem]`}>
      <h3 className="font-mono uppercase tracking-[0.14em] text-[0.2rem] md:text-[0.12rem] text-black/45">
        {heading}
      </h3>
      <ul className="mt-[0.24rem] md:mt-[0.16rem] space-y-[0.18rem] md:space-y-[0.12rem] text-[0.26rem] md:text-[0.15rem] leading-relaxed text-black/70">
        {items.map((item, index) => (
          <li key={index} className="relative pl-[0.34rem] md:pl-[0.22rem]">
            <span aria-hidden className="absolute left-0 top-0 text-black/35">
              {tone === "pro" ? "+" : "−"}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
