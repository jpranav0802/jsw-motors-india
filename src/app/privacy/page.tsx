import type { Metadata } from "next";

import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = { title: "Privacy Policy | JSW Auto" };

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      intro="What we collect, why, and how long we keep it."
    >
      <div className="max-w-[7.2rem] space-y-6 text-base leading-relaxed text-black/70">
        <p>
          When you submit a booking we collect your name, contact details and
          the model you are interested in. We use these only to arrange the
          booking and to contact you about it.
        </p>
        <p>
          We do not sell your data. We share it only with the dealer handling
          your booking, and only what they need to reach you.
        </p>
        <p>
          You can ask us to correct or delete your data at any time by writing
          to the address on our contact page.
        </p>
      </div>
    </PageShell>
  );
}
