import type { VehicleSpecification } from "@/types/vehicle";

import t2 from "./T2.json";

/**
 * Spec sheets keyed by model code. Each JSON is the trim-comparison table the
 * target serves from `new-static/json/specifications/<model>_en.json`,
 * normalised to `{ model, header, sections }`. Only the T2 is mirrored so far.
 */
const specifications: Record<string, VehicleSpecification> = {
  T2: t2 as VehicleSpecification,
};

export function getSpecification(model: string): VehicleSpecification | null {
  return specifications[model] ?? null;
}

/** Model codes that have a spec sheet — drives the route's static params. */
export const specModels = Object.keys(specifications);
