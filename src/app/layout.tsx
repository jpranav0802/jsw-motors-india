import type { Metadata } from "next";
import localFont from "next/font/local";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SmoothScroll } from "@/components/SmoothScroll";

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
  title: "JSW T2 — Rugged Adventure SUV | JSW Auto",
  description:
    "The JSW T2 is a rugged adventure SUV with a 1.5/2.0T engine, 2800mm wheelbase and intelligent XWD four-wheel drive.",
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: REM_SCALE_SCRIPT }} />
      </head>
      <body className="min-h-full">
        <SmoothScroll>
          <SiteHeader />
          {children}
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
