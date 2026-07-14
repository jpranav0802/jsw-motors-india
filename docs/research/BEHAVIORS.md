# JETOUR T2 — Behaviours

What the page *does*, as opposed to how it looks. Measured against the live
site; where something could not be measured it says so explicitly rather than
guessing.

## A caveat on method

The target page **reliably freezes Chrome's renderer** whenever a slide change
is driven from script (`swiper.slideTo(...)` via CDP). It froze four separate
tabs; each needed a fresh tab to recover. Real, human-style scroll gestures do
not freeze it — only scripted slide jumps do. The likely culprit is the 3dHall
slide decoding 36 large PNGs at once.

Two consequences, both of which shaped this clone:

1. **No per-slide screenshots exist** in `docs/design-references/`. Slides 1–3
   were observed live before the freezes; slides 4–7 were reconstructed from
   the SSR markup and the recovered runtime config instead.
2. **Our `ExteriorSpin` must not repeat the target's mistake.** Do not mount 36
   `<img>` elements. Swap one element's `src`, or preload via `Image()`/
   `decode()` and toggle opacity.

## Page-level

### The scroller
Not a normal scrolling document. `<html>` is `overflow: clip` and the document
is only ~1353px tall regardless of content. All eight sections live in a
`position: sticky` full-viewport vertical Swiper.

- `direction: vertical`, `slidesPerView: 1`, `speed: 1000`, `effect: slide`
- `allowTouchMove: false`
- `mousewheel.enabled: **false**` — Swiper's own mousewheel module is off

**Advance mechanism: a custom wheel handler**, not Swiper's mousewheel and not
document scroll. Evidence: scrolling the document to its maximum (~486px)
leaves `activeIndex` at 0. Synthetic wheel events dispatched through CDP also
fail to advance it — the handler appears to require a trusted event — so the
exact threshold and debounce **could not be measured**. When implementing,
start from: one wheel gesture = one slide, debounced for the 1000ms transition,
and tune by eye against the live site.

### Intro
On first load the hero holds a brief animation before settling; the header is
absent during it. The stats row fades in slightly after the wordmark/title.

## Header

Starts **hidden**, revealed on scroll.

| | Before | After |
| --- | --- | --- |
| `opacity` | `0` | `1` |
| `transform` | `translateY(-56.1685px)` | `translateY(0)` |

- Root: `fixed top-0 left-0 right-0 z-50 transition-background duration-300 text-white`
- **Hover inverts the whole bar**: `md:hover:bg-white md:hover:text-black` — white
  background, black text, over 300ms.
- Bar height: `h-20 md:h-[0.75rem]` → 80px on the mobile canvas, **75px** at 1920.
  (`0.75rem` is 75 design px here, not 12px — the canvas model in
  `PAGE_TOPOLOGY.md` explains why.)
- Mega-menu on Vehicles / About JETOUR / Explore, with model thumbnails.

## Reveal animations

The target uses **animate.css** driven by a custom Vue directive, not
IntersectionObserver-on-scroll. Observed classes:

- `animate__animated animate__fadeInUp` — headings and stat groups
- `animate__fadeInRight` — used on mobile where desktop uses `fadeInUp`
  (from the bundle: `animation: $device.isMobile ? "animate__fadeInRight" : "animate__fadeInUp"`)
- `once: false` — **animations re-run every time a slide is re-entered**, they
  are not one-shot.

Elements animate on **slide activation**, not viewport intersection — because
every slide is always technically in the viewport inside the sticky swiper.

## Per-slide interaction models

| # | Section | Model | Notes |
| --- | --- | --- | --- |
| 0 | FirstScreen | static | Reveal animations only |
| 1 | 3dHall | **drag** + click | Drag spins the car; tabs and colour swatches are clicks |
| 2 | CarSwiper | click/drag | Nested horizontal Swiper, 3 slides |
| 3 | Introduction1 | static + hover | 2×2 grid; image `hover:scale-110` |
| 4 | Introduction | **click** | Caption selects one of 4 crossfading full-bleed images |
| 5 | Introduction1 | static + hover | Same component as slide 3 |
| 6 | VideoSwiper | click | Thumbnail selects the playing clip |
| 7 | Introduction2 | static + hover | Asymmetric grid; image `hover:scale-110` |

### 3dHall (slide 1)
- Tabs: **Exterior** (default) / **Interior** / **Specification**.
- Specification is **a link, not a panel** — navigates to `/T2/specification`.
- Exterior: 36-frame drag-to-spin (`threesixty.min.js`), frames
  `/exterior/T2/{colour}/00..35.png`, six colours. `endFrame: 23` is the frame
  it settles on.
- Interior: krpano tour, two scenes. Colour switch calls
  `loadscene(scene_T2_brown, null, MERGE, BLEND(0.5))`.

### Introduction (slide 4)
Crossfade, not a grid. `transition-opacity duration-2000` — a **2 second** fade
between `opacity-100` and `opacity-0` on stacked `<picture>` elements.

### Image hover idiom (slides 3, 5, 7)
`overflow-hidden` wrapper + inner `hover:scale-110 transition-all duration-1500`.
A slow 1.5s zoom.

## Responsive

There is essentially **one breakpoint: `md` (768px)**, and it does not mean what
it usually means. It switches design canvas — 750px-wide mobile artboard below,
1920px-wide desktop artboard above — rather than re-laying-out. Between those
two canvases the layout scales continuously with the viewport.

Real layout changes at `md`:
- Header nav collapses (`hidden md:flex`)
- Introduction2 grid: `grid-cols-1 grid-rows-4` → `md:grid-cols-2 md:grid-rows-2`
- `<picture>` sources swap to `_m` crops below 768px (only `p1_*`, `p3_*` and the
  hero have mobile crops; `p2_*`, `p4_*`, `p5_*` do not)
- Reveal animation direction changes (`fadeInRight` vs `fadeInUp`)

## Not reproduced

- **Cookie/consent banner** — the target loads one from a separate TMS system
  (`/data/tms/website/html/...`). Out of scope for a visual clone.
- Google Tag Manager / analytics (two GA properties).
