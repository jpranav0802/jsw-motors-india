import Link from "next/link";

import { contactEmail, editor } from "@/lib/editorial";

/**
 * Named author block. Appears under every guide and on the About page so the
 * site has a real, contactable person behind its editorial — not a byline-less
 * content farm.
 */
export function AuthorCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="border border-black/15 p-[0.36rem] md:p-[0.24rem]">
      <p className="font-mono uppercase tracking-[0.16em] text-[0.18rem] md:text-[0.11rem] text-black/40">
        Written by
      </p>
      <p className="mt-[0.12rem] md:mt-[0.08rem] font-display text-[0.34rem] md:text-[0.2rem]">
        {editor.name}
      </p>
      <p className="mt-[0.06rem] md:mt-[0.04rem] text-[0.24rem] md:text-sm text-black/50">
        {editor.role} · {editor.location}
      </p>

      {!compact && (
        <p className="mt-[0.2rem] md:mt-[0.14rem] text-[0.26rem] md:text-[0.15rem] leading-relaxed text-black/70">
          {editor.bio}
        </p>
      )}

      <p className="mt-[0.2rem] md:mt-[0.14rem] text-[0.24rem] md:text-sm text-black/50">
        Writes about {editor.focus}.
      </p>

      <div className="mt-[0.24rem] md:mt-[0.16rem] flex flex-wrap items-center gap-x-[0.3rem] gap-y-[0.12rem] text-[0.24rem] md:text-sm">
        <a
          href={`mailto:${contactEmail}`}
          className="underline underline-offset-2 text-black/70 transition-colors hover:text-black"
        >
          {contactEmail}
        </a>
        <Link
          href="/contact"
          className="underline underline-offset-2 text-black/70 transition-colors hover:text-black"
        >
          Contact the editor
        </Link>
      </div>
    </div>
  );
}
