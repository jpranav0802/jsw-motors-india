import { Bullets, Callout, DataTable, Paragraphs, SectionHeading } from "@/components/editorial/Prose";
import type { Article } from "@/types/article";

/** Renders an article's blocks in order. One component so every guide reads identically. */
export function ArticleBody({ article }: { article: Article }) {
  return (
    <div className="space-y-[0.6rem] md:space-y-[0.4rem]">
      {article.blocks.map((block, index) => (
        <section key={index} className="space-y-[0.28rem] md:space-y-[0.2rem]">
          {block.heading && <SectionHeading>{block.heading}</SectionHeading>}
          {block.paragraphs && <Paragraphs items={block.paragraphs} />}
          {block.bullets && <Bullets items={block.bullets} />}
          {block.table && <DataTable table={block.table} />}
          {block.callout && <Callout>{block.callout}</Callout>}
        </section>
      ))}
    </div>
  );
}
