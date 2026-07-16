"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";
import type { ColorOption } from "@/types/vehicle";

interface InteriorPanoProps {
  id: string;
  colors: ColorOption[];
}

/**
 * Renders the interior tour with three.js instead of the target's krpano embed.
 *
 * The mirrored tour stores each scene as a multires cube:
 *   panos/<scene>.tiles/<face>/l<level>/<row>/l<level>_<face>_<row>_<col>.jpg
 * with multires="512,640,1152,2304,4736" — tile size 512, four levels.
 *
 * Level 2 (1152px faces, 3x3 tiles) is the useful trade here: 54 requests for a
 * whole scene, and sharp at the tour's own 70-140 degree fov, where level 3
 * would cost 150 requests for detail the camera never resolves. Tiles are
 * stitched onto a canvas per face and handed to a CubeTexture.
 */
const LEVEL = 2;
const FACE_SIZE = 1152;
const TILE = 512;
const TILES_PER_AXIS = Math.ceil(FACE_SIZE / TILE);
/** Tiles fetched at once, kept under the browser's per-host connection budget. */
const TILE_BATCH = 4;

/**
 * krpano names faces l/f/r/b/u/d; three's CubeTexture wants +X,-X,+Y,-Y,+Z,-Z.
 */
const FACE_ORDER = ["r", "l", "u", "d", "f", "b"] as const;

/** The tour XML's own initial view: fov 120. */
const FOV = 120;

function tileSrc(scene: string, face: string, row: number, col: number): string {
  const r = String(row).padStart(2, "0");
  const c = String(col).padStart(2, "0");
  return `/vtour/panos/${scene}.tiles/${face}/l${LEVEL}/${r}/l${LEVEL}_${face}_${r}_${c}.jpg`;
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function buildFace(scene: string, face: string): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = FACE_SIZE;
  canvas.height = FACE_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const coords: { row: number; col: number }[] = [];
  for (let row = 1; row <= TILES_PER_AXIS; row++) {
    for (let col = 1; col <= TILES_PER_AXIS; col++) coords.push({ row, col });
  }

  // Batched rather than all at once. Firing all 54 tiles of a scene in parallel
  // exceeds the browser's per-host connection budget while the spin sequence is
  // still fetching, and the tail requests never settle — leaving Promise.all
  // pending forever and the viewer stuck on "Loading interior".
  for (let i = 0; i < coords.length; i += TILE_BATCH) {
    const batch = coords.slice(i, i + TILE_BATCH);
    const images = await Promise.all(
      batch.map(({ row, col }) => loadImage(tileSrc(scene, face, row, col))),
    );
    images.forEach((img, n) => {
      if (!img) return;
      const { row, col } = batch[n];
      ctx.drawImage(img, (col - 1) * TILE, (row - 1) * TILE);
    });
  }

  return canvas;
}

export function InteriorPano({ colors }: InteriorPanoProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const [value, setValue] = useState(() => colors[0]?.value ?? "");
  /**
   * The scene whose cube texture is currently mounted. `loading` is derived from
   * it rather than toggled inside the build effect, so there is no synchronous
   * setState to kick off a cascade — the overlay shows whenever the requested
   * `value` has not yet finished building.
   */
  const [loadedValue, setLoadedValue] = useState<string | null>(null);
  const loading = loadedValue !== value;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    let lon = 0;
    let lat = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    /**
     * Sized from window resize, deliberately not a ResizeObserver.
     *
     * GSAP pins this section, which reparents it into a pin-spacer and mutates
     * its size as the pin engages. An observer on the mount reacts by calling
     * renderer.setSize(), which relayouts, which re-fires the observer — a
     * feedback loop that locks the main thread. The loop only exists while
     * pinned, which is why this is fine standalone and fatal in the page. The
     * mount is `absolute inset-0`, so window resize is the only thing that
     * genuinely changes its size.
     */
    let lastW = 0;
    let lastH = 0;
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (w === 0 || h === 0) return;
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const el = renderer.domElement;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      lon -= (e.clientX - lastX) * 0.12;
      lat += (e.clientY - lastY) * 0.12;
      lat = Math.max(-85, Math.min(85, lat));
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => {
      dragging = false;
    };

    // Deliberately no wheel-to-zoom. The section is pinned for 2.5 viewports,
    // so swallowing wheel events here would trap the reader inside it with no
    // way to scroll on. Look around by dragging; fov stays at the tour's own.
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    let raf = 0;
    const target = new THREE.Vector3();
    const tick = () => {
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lon);
      target.setFromSphericalCoords(1, phi, theta);
      camera.lookAt(target);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      if (scene.background instanceof THREE.Texture) scene.background.dispose();
      scene.background = null;
      renderer.dispose();
      el.remove();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!value) return;
    let cancelled = false;

    void (async () => {
      // Faces are built one at a time, not Promise.all'd: six faces in parallel
      // would multiply the per-face tile batch back up to 24 concurrent requests.
      const faces: HTMLCanvasElement[] = [];
      for (const face of FACE_ORDER) {
        if (cancelled) return;
        faces.push(await buildFace(value, face));
      }

      const scene = sceneRef.current;
      if (cancelled || !scene) return;

      const texture = new THREE.CubeTexture(faces);
      texture.colorSpace = THREE.SRGBColorSpace;
      // Faces are 1152px — not a power of two. With mipmaps on, three rescales
      // all six to the next POT before upload, which stalls the main thread
      // hard. The camera never minifies this texture, so mipmaps buy nothing.
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;

      const previous = scene.background;
      scene.background = texture;
      if (previous instanceof THREE.Texture) previous.dispose();
      setLoadedValue(value);
    })();

    return () => {
      cancelled = true;
    };
  }, [value]);

  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black/20">
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {loading && (
        <div className="absolute inset-0 grid place-items-center text-sm text-black/60">
          Loading interior…
        </div>
      )}

      <div className="absolute bottom-16 md:bottom-[0.6rem] left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
        {colors.map((c) => (
          <button
            key={c.value}
            type="button"
            aria-label={c.label}
            aria-pressed={c.value === value}
            onClick={() => setValue(c.value)}
            style={{ background: c.color }}
            className={cn(
              "size-8 rounded-full border transition-all duration-300 cursor-pointer",
              c.value === value
                ? "border-white scale-110"
                : "border-white/40 opacity-60 hover:opacity-100",
            )}
          />
        ))}
      </div>
    </div>
  );
}
