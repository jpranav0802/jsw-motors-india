import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { T2LogoIcon } from "@/components/icons";
import { SpecificationTable } from "@/components/vehicles/SpecificationTable";
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
  if (!spec) return { title: "Specification | JSW Auto" };

  return {
    title: `JSW ${spec.model} Specification | JSW Auto`,
    description: `Full specification and trim comparison for the JSW ${spec.model} rugged adventure SUV.`,
  };
}

export default async function SpecificationPage({ params }: SpecificationPageProps) {
  const { vehicle } = await params;
  const spec = getSpecification(vehicle);
  if (!spec) notFound();

  return (
    <main className="min-h-svh bg-white text-black text-2xl md:text-base px-12 md:px-25 pt-24 md:pt-[1rem] pb-16 md:pb-[0.8rem]">
      <div className="flex flex-col gap-3.5">
        <T2LogoIcon className="text-8xl" />
        <h1 className="text-6xl font-medium">Specification</h1>
        <p className="text-black/80">
          Note: “●”Standard configuration, “○”Optional, &quot;-&quot;: Not included in this
          configuration
        </p>
        <p className="text-black/80">
          Global website information is subject to regional variations, please confirm
          specifications with your local dealer.
        </p>
      </div>

      <SpecificationTable spec={spec} />
    </main>
  );
}
