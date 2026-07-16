/**
 * Content model for a vehicle page.
 *
 * Mirrors the shape the target site feeds its renderer: an ordered array of
 * `{ id, data }` sections where `id` selects the component. `introduction1`
 * appears twice (Off-road Performance, Daily Trip), which is why the section
 * id and the component are decoupled.
 */

export interface SpecStat {
  /** Large display value, e.g. "1.5/2.0T" or 2800. */
  value: string | number;
  /** Caption under the value, e.g. "Engine". */
  label: string;
}

export interface ColorOption {
  /** CSS colour or gradient painted on the swatch. */
  color: string;
  label: string;
  /** Directory segment for the frame sequence / krpano scene. */
  value: string;
}

export interface CaptionedImage {
  title: string;
  image: string;
}

export interface VideoItem {
  /** Poster frame. */
  image: string;
  video: string;
  title: string;
}

export interface FirstScreenData {
  id: string;
  name: string;
  data: SpecStat[];
}

export interface ThreeDHallData {
  id: string;
  /** Number of frames in the exterior spin sequence. */
  num: number;
  /** Frame index shown when the intro spin settles. */
  endFrame: number;
  interiorList: ColorOption[];
  exteriorList: ColorOption[];
}

export interface TitledGalleryData {
  title: string;
  data: CaptionedImage[];
}

export interface CarSwiperData {
  title: string;
  data: (CaptionedImage & { id: string })[];
}

export type VehicleSection =
  | { id: "firstScreen"; data: FirstScreenData }
  | { id: "3dHall"; data: ThreeDHallData }
  | { id: "carSwiper"; data: CarSwiperData }
  | { id: "introduction1"; data: TitledGalleryData }
  | { id: "introduction"; data: TitledGalleryData }
  | { id: "videoSwiper"; data: VideoItem[] }
  | { id: "introduction2"; data: { image: string }[] };

/**
 * A single line in the spec sheet: a row label and one value per trim column,
 * in the same order as `VehicleSpecification.header`'s trim columns. A value may
 * carry `\n`-separated option lists and the ● (standard) / ○ (optional) / -
 * (not included) markers the target uses verbatim.
 */
export interface VehicleSpecRow {
  label: string;
  values: string[];
}

/** A collapsible category of spec rows, e.g. "Basic parameter", "Engine". */
export interface VehicleSpecSection {
  title: string;
  rows: VehicleSpecRow[];
}

export interface VehicleSpecification {
  /** Model code, e.g. "T2". */
  model: string;
  /** `[rowHeaderLabel, ...trim column labels]` — the sticky table header. */
  header: string[];
  sections: VehicleSpecSection[];
}
