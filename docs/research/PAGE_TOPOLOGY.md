# JETOUR T2 — Page Topology

Target: <https://jetourglobal.com/T2/>

## Stack (as observed)

| Concern | Target uses | Our equivalent |
| --- | --- | --- |
| Framework | Nuxt 3 (Vue 3, SSR) | Next.js 16 App Router (React 19) |
| Styling | Tailwind CSS v4 | Tailwind CSS v4 (same theme values) |
| Full-page scroller | Swiper Element (`<swiper-container>`), vertical | Swiper 14 (`swiper/react`) |
| Reveal animations | animate.css (`animate__fadeInUp`, …) via a custom `v-animate` directive | `tw-animate-css` + IntersectionObserver |
| 360° exterior | `threesixty.min.js` over a 36-frame PNG sequence | Custom drag-to-spin over the same frames |
| 360° interior | krpano tour (`/vtour/T2.xml`, tiled cubemaps) | See "Known gaps" |
| Viewport scaling | `new-static/js/rem.js` (lib-flexible) | Inline script in `layout.tsx` |
| Copy | i18n JSON (`/_i18n/6AL6f1RP/en/messages.json`) | `src/data/t2.ts` |

## The scaling model (most important thing in this document)

`rem.js` sets `html { font-size: clientWidth / 1920 * 100 }` on desktop and
`clientWidth / 750 * 100` below 768px. The Tailwind theme is then authored so
every value is *design px ÷ 100*, expressed in rem:

- `--spacing: 0.04rem` → 1 spacing unit = **4 design px** (stock Tailwind)
- `--text-base: 0.16rem` → **16 design px** (stock Tailwind)

So at a **1920px viewport, 1rem = 100px and every utility resolves to its
normal Tailwind pixel value**. At any other width the whole page scales
proportionally rather than reflowing. This is why the site has almost no
breakpoints: `md:` is used to switch between the 750px mobile canvas and the
1920px desktop canvas, not to re-lay-out.

**Consequence:** the target's Tailwind class names port to this codebase 1:1.
Copy them verbatim. Arbitrary values are design px ÷ 100 (`text-[0.6rem]` = 60px
at 1920). Vertical rhythm sometimes uses `vh` directly (`md:pt-[15.56vh]`) —
keep those as-is.

Type scale deviates from stock Tailwind at four steps only: `2xl` = 26px,
`3xl` = 32px, `4xl` = 40px, `8xl` = 80px. All others are stock.

## Page structure

The page is **not** a normal scrolling document. `<html>` is `overflow: clip`
and the document is only ~1353px tall. Everything lives inside a full-viewport
vertical Swiper pinned with `position: sticky`:

```
#__nuxt > div.h-full.relative
├── header.fixed.top-0.z-50          ← overlays everything; hidden until scroll/hover
├── div.w-full.min-h-svh
│   └── div.sticky.top-0.home-swiper.h-svh
│       └── swiper-container (vertical, speed 1000, allowTouchMove false)
│           └── 8 × swiper-slide, each h-svh
└── footer
```

Swiper params: `direction: vertical`, `slidesPerView: 1`, `speed: 1000`,
`effect: slide`, `allowTouchMove: false`, `mousewheel.enabled: false` — advancing
is driven by a **custom wheel handler**, not Swiper's own mousewheel module.

## The 8 slides

The page is data-driven. The source config (recovered from chunk `CGSxGPax.js`)
is an array of `{ id, data }` that maps one-to-one onto the slides. `id` selects
the renderer component, so **`introduction1` is used twice** (slides 3 and 5) —
one component, two data sets.

| # | Config `id` | Component | Title | Assets |
| --- | --- | --- | --- | --- |
| 0 | `firstScreen` | `FirstScreen` | Rugged Adventure SUV | `image/T2.png` (+ `_m`) |
| 1 | `3dHall` | `ThreeDHall` | Exterior / Interior / Specification | 6 colours × 36 frames |
| 2 | `carSwiper` | `CarSwiper` | Attractive Styling | `p1_1..p1_3` (+ `_m`) |
| 3 | `introduction1` | `Introduction1` | Off-road Performance | `p2_1..p2_4` |
| 4 | `introduction` | `Introduction` | Enjoyable Experience | `p3_1..p3_4` (+ `_m`) |
| 5 | `introduction1` | `Introduction1` | Daily Trip | `p4_1..p4_4` |
| 6 | `videoSwiper` | `VideoSwiper` | JETOUR T2, Advanture Now | `video/v000..v010` .mp4 + .png |
| 7 | `introduction2` | `Introduction2` | (untitled image grid) | `p5_1..p5_3` |

Component names mirror the target's own (`UiVehiclesFirstScreen`,
`UiVehicles3dHall`, …) so the mapping stays traceable.

Slides 3 and 5 render a **2×2 image grid with captions**. Slide 4 is a
**full-bleed crossfade** between four images. These look similar in a
screenshot but are different components — don't merge them.

## Global chrome

- **Header** — `fixed`, `z-50`. Starts hidden (`opacity: 0`, `translateY(-56px)`).
  Contains a large mega-menu (Vehicles / About JETOUR / Explore / Contact Us),
  a language selector and two icon buttons. ~80KB of SSR markup.
- **Footer** — below the sticky swiper; social icons from `images/home/socials/`.

## Asset quirks worth knowing

- **Every `.png` in this mirror is actually a WebP.** The target serves
  WebP bytes under a `.png` extension; browsers sniff content so it renders
  fine, and the mirror preserves the filenames verbatim so paths match the
  target. Don't "fix" the extensions, and don't trust a PNG header parser on
  them — use `file`/`sips` if you need dimensions.
- Native sizes pin down several layouts: `p2_*` and `p4_*` are **904×339**
  (which forces the Introduction1 grid to `2·padding + gap = 112` at 1920),
  `p1_*`/`p3_*` and the hero are **1920×1080**, and `p5_1` is **960×1080** —
  exactly the full-height left column that `row-span-2` produces in
  Introduction2.
- Mobile `_m` crops exist only for `p1_1..p1_3`, `p3_1..p3_4` and the hero
  (`T2_m.png`). `p2_*`, `p4_*` and `p5_*` have none — verified by probing the
  origin, not assumed.

## Known gaps

- **Interior tab** — the target embeds a krpano tour (`vtour/tour.js`,
  `vtour/T2.xml`, tiled cubemaps under `vtour/panos/*.tiles/`) with two scenes
  (`T2_black_red`, `T2_brown`). krpano is licensed commercial software and the
  tile pyramids are large. See the Interior spec for what was built instead.
- The `silver_snow` exterior colour is present in the config but the target's
  own swatch list renders six; verify against the live site before trusting.
