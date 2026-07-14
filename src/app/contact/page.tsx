import type { Metadata } from "next";

import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = { title: "Contact Us | JSW Auto" };

const CHANNELS = [
  { label: "General enquiries", value: "hello@jswauto.example" },
  { label: "Press", value: "press@jswauto.example" },
  { label: "Owners support", value: "support@jswauto.example" },
];

export default function ContactPage() {
  return (
    <PageShell title="Contact Us" intro="We read everything. Pick whichever door fits.">
      <dl className="grid gap-8 md:gap-[0.24rem] md:grid-cols-3">
        {CHANNELS.map((c) => (
          <div key={c.label} className="border-t border-black/10 pt-6">
            <dt className="text-sm text-black/50">{c.label}</dt>
            <dd className="mt-2 text-lg">{c.value}</dd>
          </div>
        ))}
      </dl>
    </PageShell>
  );
}
