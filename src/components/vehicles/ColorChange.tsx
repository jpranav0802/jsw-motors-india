"use client";

import { cn } from "@/lib/utils";
import type { ColorOption } from "@/types/vehicle";

interface ColorChangeProps {
  colors: ColorOption[];
  value: string;
  onChange: (value: string) => void;
}

export function ColorChange({ colors, value, onChange }: ColorChangeProps) {
  return (
    <div className="bg-[#D9D9D9]/30 rounded-full px-9 pt-5 pb-6 absolute bottom-40 md:bottom-[0.64rem] left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-6">
        {colors.map((option) => {
          const active = option.value === value;

          return (
            <div key={option.value} className="group relative flex items-center">
              <button
                type="button"
                aria-label={option.label}
                aria-pressed={active}
                onClick={() => onChange(option.value)}
                // The swatch fill is a CSS gradient string from the site's config,
                // which no Tailwind utility can express.
                style={{ background: option.color }}
                className={cn(
                  "relative cursor-pointer size-[0.47rem] rounded-full transition-transform duration-300 group-hover:scale-110",
                  "after:content-[''] after:absolute after:-inset-[0.03rem] after:rounded-full",
                  "after:border-[0.03rem] after:border-white after:transition-opacity after:duration-300",
                  active ? "after:opacity-100" : "after:opacity-0 group-hover:after:opacity-50",
                )}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/75 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {option.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
