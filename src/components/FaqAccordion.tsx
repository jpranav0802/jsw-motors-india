"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="size-8 md:size-[0.28rem] shrink-0 text-black/60"
    >
      {/* Vertical stroke rotates away on open, leaving the horizontal — a + that
          becomes a −, matching the target's accordion toggle. */}
      <path
        d="M16 4V28"
        stroke="currentColor"
        strokeWidth="1.6"
        className={cn(
          "origin-center transition-transform duration-300",
          open ? "rotate-90 opacity-0" : "opacity-100",
        )}
      />
      <path d="M4 16H28" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q),
    );
  }, [items, query]);

  return (
    <div className="max-w-[8.4rem]">
      <input
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(null);
        }}
        placeholder="Quickly find questions and answers"
        aria-label="Search questions"
        className="w-full h-16 md:h-[0.56rem] px-5 md:px-[0.16rem] bg-transparent border border-black/20 text-base outline-none transition-colors duration-300 focus:border-black"
      />

      <dl className="mt-10 md:mt-[0.32rem]">
        {filtered.map((item) => {
          // Index into the original list so toggling stays stable across filtering.
          const index = items.indexOf(item);
          const isOpen = open === index;

          return (
            <div key={item.q} className="border-t border-black/10 last:border-b">
              <dt>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-8 md:py-[0.26rem] text-left cursor-pointer group"
                >
                  <span className="text-lg md:text-[0.2rem] font-medium transition-colors duration-300 group-hover:text-black/60">
                    {item.q}
                  </span>
                  <PlusIcon open={isOpen} />
                </button>
              </dt>
              <dd
                className={cn(
                  "grid transition-all duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="pb-8 md:pb-[0.26rem] pr-14 text-base text-black/60 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </dd>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="py-10 text-base text-black/50">
            No questions match “{query}”. Try a different word.
          </p>
        )}
      </dl>
    </div>
  );
}
