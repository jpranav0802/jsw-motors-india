// Downloads all assets for the JETOUR T2 clone from jetourglobal.com
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";

const ORIGIN = "https://jetourglobal.com";
const ROOT = new URL("..", import.meta.url).pathname;

/** @type {Array<{url: string, dest: string}>} */
const assets = [];
const add = (url, dest) => assets.push({ url, dest });

// --- Fonts (self-hosted TTF, referenced from Nuxt build) ---
const fonts = {
  "HarmonyOS_Sans_Regular.4GE96iRn.ttf": "HarmonyOS_Sans_Regular.ttf",
  "HarmonyOS_Sans_Medium.g2KiBxrz.ttf": "HarmonyOS_Sans_Medium.ttf",
  "HarmonyOS_Sans_Semibold.U_FjLS17.ttf": "HarmonyOS_Sans_Semibold.ttf",
  "HarmonyOS_Sans_Bold.Bnfj93cu.ttf": "HarmonyOS_Sans_Bold.ttf",
  "Goldman-Regular.DSV2AaLK.ttf": "Goldman-Regular.ttf",
};
for (const [remote, local] of Object.entries(fonts)) {
  add(`${ORIGIN}/_nuxt/${remote}`, `public/fonts/${local}`);
}

// --- Header vehicle thumbnails ---
for (const f of ["g700.png", "T1.png", "T1iDM.png", "T2.png", "T2iDM.png", "g700whislingarrow.png"]) {
  add(`${ORIGIN}/new-static/images/header/vehicles/${f}`, `public/images/header/vehicles/${f}`);
}

// --- Hero + 3D hall backdrops ---
add(`${ORIGIN}/new-static/images/vehicles/image/T2.png`, "public/images/vehicles/image/T2.png");
for (const f of ["bg-exterior.png", "soild.png"]) {
  add(`${ORIGIN}/new-static/images/vehicles/3d-hall/${f}`, `public/images/vehicles/3d-hall/${f}`);
}

// --- 360° exterior spin sequences: 6 colours × 36 frames ---
export const EXTERIOR_COLORS = [
  "night_black",
  "sand",
  "sun_orange",
  "lime_green",
  "misty_cyan",
  "silver_snow",
];
for (const color of EXTERIOR_COLORS) {
  for (let i = 0; i < 36; i++) {
    const f = String(i).padStart(2, "0") + ".png";
    add(`${ORIGIN}/new-static/exterior/T2/${color}/${f}`, `public/exterior/T2/${color}/${f}`);
  }
}

// --- Slide 6 video gallery: 11 clips + their poster frames ---
for (let i = 0; i <= 10; i++) {
  const stem = "v" + String(i).padStart(3, "0");
  add(`${ORIGIN}/new-static/images/vehicles/cars/T2/video/${stem}.mp4`, `public/images/vehicles/cars/T2/video/${stem}.mp4`);
  add(`${ORIGIN}/new-static/images/vehicles/cars/T2/video/${stem}.png`, `public/images/vehicles/cars/T2/video/${stem}.png`);
}

// --- Section content imagery (18 total; p1 and p5 only have 3 frames) ---
// Each also *may* have an `_m` mobile crop, which the <picture> elements serve
// below 768px. Not every desktop image has one, so 404s here are expected and
// reported rather than treated as failures.
const sectionImageCounts = { p1: 3, p2: 4, p3: 4, p4: 4, p5: 3 };
const optional = new Set();
for (const [p, count] of Object.entries(sectionImageCounts)) {
  for (let n = 1; n <= count; n++) {
    add(`${ORIGIN}/new-static/images/vehicles/cars/T2/${p}_${n}.png`, `public/images/vehicles/cars/T2/${p}_${n}.png`);
    const mobile = `${p}_${n}_m.png`;
    add(`${ORIGIN}/new-static/images/vehicles/cars/T2/${mobile}`, `public/images/vehicles/cars/T2/${mobile}`);
    optional.add(`public/images/vehicles/cars/T2/${mobile}`);
  }
}

// Hero mobile crop
add(`${ORIGIN}/new-static/images/vehicles/image/T2_m.png`, "public/images/vehicles/image/T2_m.png");

// --- Social icons ---
for (const f of ["in.svg", "facebook.svg", "titok.svg", "x.svg", "youtube.svg"]) {
  add(`${ORIGIN}/new-static/images/home/socials/${f}`, `public/images/home/socials/${f}`);
}

// --- Favicon ---
add(`${ORIGIN}/favicon.ico`, "public/seo/favicon.ico");

const exists = async (p) => access(p).then(() => true).catch(() => false);

async function download({ url, dest }) {
  const full = join(ROOT, dest);
  if (await exists(full)) return { url, dest, status: "skip" };
  const res = await fetch(url);
  if (!res.ok) return { url, dest, status: `HTTP ${res.status}` };
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(full), { recursive: true });
  await writeFile(full, buf);
  return { url, dest, status: "ok", bytes: buf.length };
}

const results = [];
const BATCH = 4;
for (let i = 0; i < assets.length; i += BATCH) {
  const batch = assets.slice(i, i + BATCH);
  const settled = await Promise.all(
    batch.map((a) => download(a).catch((e) => ({ ...a, status: `ERR ${e.message}` })))
  );
  results.push(...settled);
  process.stdout.write(`\r${Math.min(i + BATCH, assets.length)}/${assets.length}`);
}
process.stdout.write("\n");

const ok = results.filter((r) => r.status === "ok");
const skipped = results.filter((r) => r.status === "skip");
const missing = results.filter((r) => r.status !== "ok" && r.status !== "skip");
const absent = missing.filter((r) => optional.has(r.dest));
const failed = missing.filter((r) => !optional.has(r.dest));

console.log(`Downloaded ${ok.length}, already present ${skipped.length}, failed ${failed.length}`);
if (absent.length) {
  console.log(`No mobile crop published for ${absent.length}: ${absent.map((a) => a.dest.split("/").pop()).join(", ")}`);
}
for (const f of failed) console.log(`  FAIL ${f.status}  ${f.url}`);
if (failed.length) process.exitCode = 1;
