import type { Metadata } from "next";

import { ArticleCard } from "@/components/editorial/ArticleCard";
import { PageShell } from "@/components/PageShell";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "EV Guides & Analysis",
  description:
    "Long-form guides on electric and hybrid vehicles in India — platform architecture, cost per kilometre, charging infrastructure, battery care, state incentives and model comparisons.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <PageShell
      title="EV guides & analysis"
      intro="Long-form pieces on the things that actually decide an electric or hybrid purchase in India — powertrain architecture, running cost, charging access, battery care and policy. Every assumption is stated so you can substitute your own."
    >
      <div className="grid gap-[0.7rem] md:gap-[0.4rem] sm:grid-cols-2 md:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </PageShell>
  );
}
