import type { VehicleSpecification } from "@/types/vehicle";

import t2 from "./T2.json";

/**
 * Spec sheets keyed by model code. Each JSON is the trim-comparison table the
 * target serves from `new-static/json/specifications/<model>_en.json`,
 * normalised to `{ model, header, sections }`. Only the T2 is mirrored so far,
 * served under its India name: /combat/specification. The table itself is the
 * global T2 petrol trim sheet; the India-spec PHEV figures live in
 * `combatIndiaSpec` (model-editorial.ts).
 */
const specifications: Record<string, VehicleSpecification> = {
  combat: t2 as VehicleSpecification,
};

export function getSpecification(model: string): VehicleSpecification | null {
  return specifications[model] ?? null;
}

/** Model codes that have a spec sheet — drives the route's static params. */
export const specModels = Object.keys(specifications);
