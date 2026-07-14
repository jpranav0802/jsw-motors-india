import type { Metadata } from "next";

import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = { title: "Cookies | JSW Auto" };

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookies"
      intro="How this site uses cookies, and what you can turn off."
    >
      <div className="max-w-[7.2rem] space-y-6 text-base leading-relaxed text-black/70">
        <p>
          Strictly necessary cookies keep the site working — they remember your
          language and your place in a booking. These cannot be switched off.
        </p>
        <p>
          Analytics cookies tell us which pages people actually use. They are
          optional, and this site sets none until you say yes.
        </p>
        <p>
          You can clear cookies at any time in your browser settings. Doing so
          will reset your preferences here.
        </p>
      </div>
    </PageShell>
  );
}
