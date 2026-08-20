import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AffiliationNotice } from "@/components/editorial/AffiliationNotice";
import { DataTable, Paragraphs, SectionHeading } from "@/components/editorial/Prose";
import { ProsCons } from "@/components/editorial/ProsCons";
import { T2LogoIcon } from "@/components/icons";
import { SpecificationTable } from "@/components/vehicles/SpecificationTable";
import { t2Editorial } from "@/data/model-editorial";
import { getSpecification, specModels } from "@/data/specifications";

interface SpecificationPageProps {
  // Next 16: dynamic params arrive as a promise and must be awaited.
  params: Promise<{ vehicle: string }>;
}

export function generateStaticParams() {
  return specModels.map((vehicle) => ({ vehicle }));
}

export async function generateMetadata({ params }: SpecificationPageProps): Promise<Metadata> {
  const { vehicle } = await params;
  const spec = getSpecification(vehicle);
  if (!spec) return { title: "Specifications" };

  return {
    title: `Jetour ${spec.model} Specifications, Trims & Features in India`,
    description: `Full specification and trim comparison for the Jetour ${spec.model} rugged adventure SUV in India — powertrain, dimensions, chassis, safety and equipment across every trim.`,
  };
}

export default async function SpecificationPage({ params }: SpecificationPageProps) {
  const { vehicle } = await params;
  const spec = getSpecification(vehicle);
  if (!spec) notFound();

  // Only the T2 has a written analysis so far; other models fall back to the
  // table alone rather than showing another car's commentary.
  const editorial = vehicle === "T2" ? t2Editorial : null;

  return (
    <main className="min-h-svh bg-white text-black text-2xl md:text-base px-12 md:px-25 pt-[1.5rem] md:pt-[1.35rem] pb-[0.8rem] md:pb-[0.8rem]">
      <div className="flex flex-col gap-3.5">
        <T2LogoIcon className="text-8xl" />
        <h1 className="text-6xl font-medium">Jetour {spec.model} Specifications</h1>
        <p className="text-black/80">
          Note: “●”Standard configuration, “○”Optional, &quot;-&quot;: Not included in this
          configuration
        </p>
        <p className="text-black/80">
          Global website information is subject to regional variations, please confirm
          specifications with your local dealer.
        </p>
      </div>

      {editorial && (
        <div className="mt-[0.8rem] md:mt-[0.6rem] max-w-[8.4rem] space-y-[0.7rem] md:space-y-[0.5rem]">
          {editorial.overview.map((block, index) => (
            <section key={index} className="space-y-[0.28rem] md:space-y-[0.2rem]">
              {block.heading && <SectionHeading>{block.heading}</SectionHeading>}
              {block.paragraphs && <Paragraphs items={block.paragraphs} />}
            </section>
          ))}

          <section className="space-y-[0.28rem] md:space-y-[0.2rem]">
            <SectionHeading>How it compares with its rivals</SectionHeading>
            <Paragraphs items={[editorial.comparisonIntro]} />
            <DataTable table={editorial.comparison} />
          </section>

          <ProsCons
            title="Pros & cons"
            pros={editorial.pros}
            cons={editorial.cons}
            note={editorial.prosConsNote}
          />

          <p className="text-[0.28rem] md:text-base text-black/60">
            Related reading:{" "}
            <Link href="/guides/t2-vs-thar-roxx-vs-jimny" className="underline underline-offset-2 hover:text-black">
              T2 vs Thar Roxx vs Jimny off-road comparison
            </Link>{" "}
            and{" "}
            <Link href="/guides/adapt-architecture-explained" className="underline underline-offset-2 hover:text-black">
              the multi-powertrain architecture explained
            </Link>
            .
          </p>
        </div>
      )}

      <SpecificationTable spec={spec} />

      <div className="mt-[0.8rem] md:mt-[0.6rem] max-w-[8.4rem]">
        <AffiliationNotice />
      </div>
    </main>
  );
}
