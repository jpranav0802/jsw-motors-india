"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import type { VehicleSpecification } from "@/types/vehicle";

interface SpecificationTableProps {
  spec: VehicleSpecification;
}

/**
 * Column template shared by the sticky header and every data row: a label
 * column that sticks to the left edge, then one equal column per trim. The rem
 * unit scales with the viewport (see the layout's rem script), so the same
 * template narrows proportionally on mobile, where the wrapper scrolls
 * horizontally rather than reflowing.
 */
const COLS = "grid-cols-[3.6rem_repeat(3,minmax(2.6rem,1fr))] md:grid-cols-[5.6rem_repeat(3,minmax(0,1fr))]";

export function SpecificationTable({ spec }: SpecificationTableProps) {
  // Every category starts expanded, matching the target's default "−" toggles.
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(() => new Set());

  const toggle = (title: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });

  const [rowHeader, ...trims] = spec.header;

  return (
    <div className="overflow-x-auto md:overflow-x-visible pt-3.5">
      <div className="min-w-[16rem] md:min-w-0">
        {/* Column header. Teal, and sticky so it trails just under the fixed
            site bar (75px) as the sheet scrolls; the first cell also sticks to
            the left so the trim it labels stays anchored on mobile. */}
        <div
          className={cn(
            "sticky top-20 md:top-[0.75rem] z-12 grid bg-[#39aeb2] text-white font-bold",
            COLS,
          )}
        >
          <div className="sticky start-0 z-11 bg-[#39aeb2] flex items-center justify-center py-4 md:py-3">
            {rowHeader}
          </div>
          {trims.map((trim) => (
            <div key={trim} className="flex items-center justify-center text-center py-4 md:py-3">
              {trim}
            </div>
          ))}
        </div>

        {spec.sections.map((section) => {
          const isCollapsed = collapsed.has(section.title);

          return (
            <div key={section.title}>
              {/* Category bar — click anywhere on it to collapse its rows. */}
              <button
                type="button"
                onClick={() => toggle(section.title)}
                aria-expanded={!isCollapsed}
                className="grid grid-cols-[3.6rem_1fr] md:grid-cols-[5.6rem_1fr] w-full cursor-pointer border-b border-white bg-[#d9d9d9] text-left"
              >
                <span className="sticky start-0 z-11 bg-[#d9d9d9] flex items-center justify-center font-bold py-4 md:py-3">
                  {section.title}
                </span>
                <span
                  aria-hidden
                  className="flex items-center justify-end px-10 select-none text-3xl leading-none"
                >
                  {isCollapsed ? "+" : "−"}
                </span>
              </button>

              {!isCollapsed &&
                section.rows.map((row, rowIndex) => (
                  <div key={`${section.title}-${rowIndex}`} className={cn("grid border-b border-[#d9d9d9]", COLS)}>
                    <div className="sticky start-0 z-11 bg-white flex items-center py-3 ps-3 md:ps-10 whitespace-pre-line border-e border-[#d9d9d9]">
                      {row.label}
                    </div>
                    {row.values.map((value, valueIndex) => (
                      <div
                        key={valueIndex}
                        className="flex items-center justify-center text-center py-3 whitespace-pre-line border-e border-[#d9d9d9] last:border-e-0"
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
