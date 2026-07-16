import type { Metadata } from "next";

import { PageShell } from "@/components/PageShell";
import { RegisterForm } from "@/components/RegisterForm";

export const metadata: Metadata = { title: "Register your interest | JSW Motors India" };

export default function RegisterPage() {
  return (
    <PageShell
      title="Register your interest"
      intro="Tell us who you are and which model you're interested in, and we'll keep you posted as the India launch nears. No payments — this is an interest registry only."
    >
      <RegisterForm />
    </PageShell>
  );
}
