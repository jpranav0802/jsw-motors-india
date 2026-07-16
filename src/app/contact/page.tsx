import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Contact Us | JSW Motors India",
  description:
    "Get in touch with JSW Motors India. Send us a message and we'll reply within two working days, or reach the right team directly.",
};

const CHANNELS = [
  { label: "General enquiries", value: "hello@jswmotors.example" },
  { label: "Press", value: "press@jswmotors.example" },
  { label: "Owners support", value: "support@jswmotors.example" },
];

export default function ContactPage() {
  return (
    <PageShell
      title="Contact Us"
      intro="Thanks for paying attention to JSW. Your comments and suggestions are cordially welcomed — tell us below and we'll answer within two working days."
    >
      <div className="grid gap-16 md:gap-[0.6rem] lg:grid-cols-[1.6fr_1fr]">
        <ContactForm />

        <aside>
          <h2 className="font-display text-2xl md:text-[0.24rem]">Reach us directly</h2>
          <dl className="mt-8 md:mt-[0.24rem]">
            {CHANNELS.map((c) => (
              <div key={c.label} className="border-t border-black/10 py-6 md:py-[0.18rem]">
                <dt className="text-sm text-black/50">{c.label}</dt>
                <dd className="mt-2 text-lg md:text-[0.18rem]">
                  <a href={`mailto:${c.value}`} className="hover:text-black/60 transition-colors">
                    {c.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </PageShell>
  );
}
