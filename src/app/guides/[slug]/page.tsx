/* eslint-disable @next/next/no-img-element -- hero art is served straight from
   /public; next/image's loader fights the rem-scaled design canvas. */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AffiliationNotice } from "@/components/editorial/AffiliationNotice";
import { ArticleBody } from "@/components/editorial/ArticleBody";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { AuthorCard } from "@/components/editorial/AuthorCard";
import { articles, articleSlugs, formatArticleDate, getArticle } from "@/data/articles";
import { editor } from "@/lib/editorial";
import { siteUrl } from "@/lib/site";

interface GuidePageProps {
  // Next 16: dynamic params arrive as a promise and must be awaited.
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Guide not found" };

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/guides/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `${siteUrl}/guides/${article.slug}`,
      publishedTime: article.published,
      modifiedTime: article.updated ?? article.published,
      authors: [editor.name],
      images: [`${siteUrl}${article.image}`],
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 3);

  // Article schema so search engines attribute the piece to a named author.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `${siteUrl}${article.image}`,
    datePublished: article.published,
    dateModified: article.updated ?? article.published,
    author: { "@type": "Person", name: editor.name },
    publisher: { "@type": "Organization", name: "JSW Motors India (independent portal)" },
    mainEntityOfPage: `${siteUrl}/guides/${article.slug}`,
  };

  return (
    <main className="min-h-svh bg-white text-black pt-[2rem] md:pt-[1.4rem] pb-[0.8rem] px-[0.45rem] md:px-[0.7rem]">
      <script
        type="application/ld+json"
        // Static, author-controlled object — no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-[10.8rem]">
        <nav aria-label="Breadcrumb" className="text-[0.24rem] md:text-sm text-black/45">
          <Link href="/guides" className="underline underline-offset-2 hover:text-black">
            EV guides
          </Link>
          <span aria-hidden> / </span>
          <span>{article.category}</span>
        </nav>

        <article className="mt-[0.3rem] md:mt-[0.2rem]">
          <header className="max-w-[8.4rem]">
            <h1 className="font-display text-[0.62rem] md:text-[0.44rem] leading-[1.1] font-medium">
              {article.title}
            </h1>

            <p className="mt-[0.3rem] md:mt-[0.2rem] text-[0.32rem] md:text-[0.19rem] leading-relaxed text-black/60">
              {article.standfirst}
            </p>

            <div className="mt-[0.3rem] md:mt-[0.2rem] flex flex-wrap items-center gap-x-[0.24rem] gap-y-[0.1rem] font-mono uppercase tracking-[0.14em] text-[0.18rem] md:text-[0.11rem] text-black/45">
              <span>By {editor.name}</span>
              <span aria-hidden>·</span>
              <time dateTime={article.published}>{formatArticleDate(article.published)}</time>
              {article.updated && (
                <>
                  <span aria-hidden>·</span>
                  <span>Updated {formatArticleDate(article.updated)}</span>
                </>
              )}
              <span aria-hidden>·</span>
              <span>{article.readingMinutes} min read</span>
            </div>
          </header>

          <div className="mt-[0.5rem] md:mt-[0.34rem] aspect-[16/7] overflow-hidden bg-neutral-100">
            <img
              src={article.image}
              alt={article.imageAlt}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-[0.7rem] md:mt-[0.5rem] max-w-[8.4rem]">
            <ArticleBody article={article} />
          </div>
        </article>

        <div className="mt-[0.8rem] md:mt-[0.5rem] max-w-[8.4rem] space-y-[0.4rem] md:space-y-[0.28rem]">
          <AuthorCard />
          <AffiliationNotice />
        </div>

        {related.length > 0 && (
          <section className="mt-[1rem] md:mt-[0.7rem] border-t border-black/10 pt-[0.6rem] md:pt-[0.4rem]">
            <h2 className="font-display text-[0.48rem] md:text-[0.3rem] leading-none font-medium">
              More guides
            </h2>
            <div className="mt-[0.5rem] md:mt-[0.34rem] grid gap-[0.6rem] md:gap-[0.34rem] sm:grid-cols-2 md:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
