import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { siteName } from "@/lib/editorial";

import "./globals.css";

const harmonyOS = localFont({
  variable: "--font-harmony",
  display: "swap",
  src: [
    { path: "../../public/fonts/HarmonyOS_Sans_Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/HarmonyOS_Sans_Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/HarmonyOS_Sans_Semibold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/HarmonyOS_Sans_Bold.ttf", weight: "700", style: "normal" },
  ],
});

const goldman = localFont({
  variable: "--font-goldman",
  display: "swap",
  src: [{ path: "../../public/fonts/Goldman-Regular.ttf", weight: "400", style: "normal" }],
});

export const metadata: Metadata = {
  // `default` is the homepage title (not run through the template); every child
  // route's own title is suffixed with the site name via `template`.
  //
  // The site name must stay neutral — this is an independent portal and must
  // never title itself as any manufacturer's official site. See lib/editorial.ts.
  title: {
    default: `${siteName} — Independent EV & Hybrid Coverage for India`,
    template: `%s | ${siteName}`,
  },
  description:
    "Independent, unofficial news, specifications, range analysis and buying guides on new-energy vehicles for India — including the Jetour T2, Jaecoo J5 and iCAR V23. Not affiliated with JSW Group, JSW MG Motor India, MG, Chery, Jetour or Jaecoo.",
  icons: { icon: "/seo/favicon.ico" },
};

// Mirrors the target site's new-static/js/rem.js (lib-flexible pattern).
// The whole layout is authored against a 1920px desktop / 750px mobile design
// canvas where 1rem = 100 design px, so every dimension scales with the viewport.
const REM_SCALE_SCRIPT = `(function(){var d=document.documentElement;function s(){var w=d.clientWidth;d.style.fontSize=(w<768?w/750*100:w/1920*100)+'px'}s();addEventListener('resize',s)})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${harmonyOS.variable} ${goldman.variable} h-full antialiased`}
      // The rem script sets an inline font-size on <html> before hydration, so
      // the client tree legitimately differs from the server's here.
      suppressHydrationWarning
    >
      {/* Extensions like Grammarly inject data-gr-* attributes onto <body>
          before React hydrates; suppress the one-level attribute mismatch they
          cause so it doesn't surface as a hydration error. */}
      <body className="min-h-full" suppressHydrationWarning>
        {/* The rem scaler must run before hydration to size the whole page;
            next/script's beforeInteractive strategy injects it early without
            React's "script tag in a component" warning. */}
        <Script id="rem-scale" strategy="beforeInteractive">
          {REM_SCALE_SCRIPT}
        </Script>
        {/* Google AdSense loader. Rendered as a plain <script> so React 19
            hoists it verbatim into the server-rendered <head> on every page —
            the exact placement AdSense's site-ownership verification checks
            for. (next/script's beforeInteractive only emits a preload link.) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7447360085979369"
          crossOrigin="anonymous"
        />
        <SmoothScroll>
          <SiteHeader />
          {children}
          <SiteFooter />
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
