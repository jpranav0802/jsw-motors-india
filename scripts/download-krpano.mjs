// Mirrors the krpano interior tour used by the T2 3dHall "Interior" tab.
//
// NOTE ON LICENSING: krpano's tour.js is commercial software. It is mirrored
// here only to reproduce the target site locally. Do not redistribute this
// directory without a krpano licence.
//
// The tour (vtour/T2.xml) declares two cube scenes with a multires pyramid:
//   multires="512,640,1152,2304,4736"  → tilesize 512, four levels
// Tiles are addressed as panos/<scene>.tiles/<face>/l<level>/<row>/l<level>_<face>_<row>_<col>.jpg
// with 1-based, zero-padded row/col.
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";

const ORIGIN = "https://jetourglobal.com/new-static/vtour";
const ROOT = new URL("..", import.meta.url).pathname;
const DEST = "public/vtour";

const SCENES = ["T2_black_red", "T2_brown"];
const FACES = ["l", "f", "r", "b", "u", "d"];
const TILE_SIZE = 512;
const LEVEL_SIZES = [640, 1152, 2304, 4736];

const assets = [];
const add = (path) => assets.push(path);

add("tour.js");
add("T2.xml");

for (const scene of SCENES) {
  const base = `panos/${scene}.tiles`;
  add(`${base}/preview.jpg`);
  add(`${base}/thumb.jpg`);
  for (const [i, size] of LEVEL_SIZES.entries()) {
    const level = i + 1;
    const n = Math.ceil(size / TILE_SIZE);
    for (const face of FACES) {
      for (let row = 1; row <= n; row++) {
        for (let col = 1; col <= n; col++) {
          const r = String(row).padStart(2, "0");
          const c = String(col).padStart(2, "0");
          add(`${base}/${face}/l${level}/${r}/l${level}_${face}_${r}_${c}.jpg`);
        }
      }
    }
  }
}

const exists = (p) => access(p).then(() => true).catch(() => false);

async function download(path) {
  const full = join(ROOT, DEST, path);
  if (await exists(full)) return "skip";
  const res = await fetch(`${ORIGIN}/${path}`);
  if (!res.ok) return `HTTP ${res.status}`;
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(full), { recursive: true });
  await writeFile(full, buf);
  return "ok";
}

console.log(`Mirroring ${assets.length} krpano files…`);
const failed = [];
let done = 0;
const BATCH = 8;
for (let i = 0; i < assets.length; i += BATCH) {
  const batch = assets.slice(i, i + BATCH);
  const results = await Promise.all(
    batch.map(async (p) => {
      try {
        return { p, status: await download(p) };
      } catch (e) {
        return { p, status: `ERR ${e.message}` };
      }
    })
  );
  for (const r of results) if (r.status !== "ok" && r.status !== "skip") failed.push(r);
  done += batch.length;
  if (done % 200 < BATCH) process.stdout.write(`\r${done}/${assets.length}`);
}
process.stdout.write(`\r${done}/${assets.length}\n`);
console.log(`Failed: ${failed.length}`);
for (const f of failed.slice(0, 15)) console.log(`  ${f.status}  ${f.p}`);
if (failed.length) process.exitCode = 1;
