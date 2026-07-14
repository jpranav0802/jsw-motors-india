"use client"

import { useEffect, useId, useRef, useState } from "react"

import { cn } from "@/lib/utils"

interface FooterLink {
  label: string
  href: string
  current?: boolean
}

interface FooterColumn {
  title: string
  href?: string
  links: FooterLink[]
}

interface SocialLink {
  name: string
  href: string
  src: string
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Vehicles",
    links: [
      { label: "JETOUR G700", href: "/g700" },
      { label: "JETOUR T1", href: "/T1" },
      { label: "JETOUR T1 i-DM", href: "/T1iDM" },
      { label: "JETOUR T2", href: "/T2", current: true },
      { label: "JETOUR T2 i-DM", href: "/T2iDM" },
    ],
  },
  {
    title: "About JETOUR",
    links: [
      { label: "Introduction", href: "/about" },
      { label: "G Series", href: "/gSeries" },
      { label: "JMK Series", href: "/jmkSeries" },
      { label: "Technology", href: "/technology" },
      { label: "JETOUR Life", href: "/life" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "News", href: "/news" },
      { label: "Owners", href: "/owners" },
      { label: "History", href: "/history" },
      { label: "Global Network", href: "/global-network" },
    ],
  },
  {
    title: "Contact Us",
    href: "/contact",
    links: [],
  },
]

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/jetourauto/",
    src: "/images/home/socials/in.svg",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/JETOUR.Global",
    src: "/images/home/socials/facebook.svg",
  },
  {
    name: "titok",
    href: "https://www.tiktok.com/@jetour.auto",
    src: "/images/home/socials/titok.svg",
  },
  {
    name: "x",
    href: "https://twitter.com/JETOUR_Global",
    src: "/images/home/socials/x.svg",
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/@jetourauto",
    src: "/images/home/socials/youtube.svg",
  },
]

const LEGAL_LINKS: FooterLink[] = [
  { label: "FAQs", href: "/faqs" },
  { label: "Cookies", href: "/cookie" },
  { label: "Privacy Policy", href: "/agree" },
]

function AccordionIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-4xl size-[1em]"
    >
      <path
        d="M16 3C16 11.6667 16 29 16 29"
        stroke="currentColor"
        className={cn(
          "transition-transform duration-500 ease-in-out origin-center",
          isOpen && "rotate-90",
        )}
      />
      <path
        d="M3 16C11.6667 16 29 16 29 16"
        stroke="currentColor"
        className={cn(
          "transition-transform duration-300 ease-in-out origin-center",
          isOpen && "-rotate-180",
        )}
      />
    </svg>
  )
}

function FooterAccordionItem({
  column,
  isOpen,
  onToggle,
}: {
  column: FooterColumn
  isOpen: boolean
  onToggle: () => void
}) {
  const id = useId()
  const triggerId = `${id}-trigger`
  const contentId = `${id}-content`
  const contentRef = useRef<HTMLDivElement>(null)
  // Kept mounted while collapsing so the accordion-up animation can play out.
  const [isCollapsing, setIsCollapsing] = useState(false)
  const [wasOpen, setWasOpen] = useState(isOpen)
  const isPresent = isOpen || isCollapsing

  if (wasOpen !== isOpen) {
    setWasOpen(isOpen)
    setIsCollapsing(wasOpen)
  }

  useEffect(() => {
    const element = contentRef.current
    if (!element || !isPresent) return
    // CSS cannot interpolate to height:auto, so the accordion keyframes animate
    // to this custom property instead. Reka sets it from JS; we measure the same.
    const height = `${element.scrollHeight}px`
    element.style.setProperty("--reka-accordion-content-height", height)
    element.style.setProperty("--reka-collapsible-content-height", height)
  }, [isPresent])

  const triggerClassName =
    "group flex-1 flex items-center gap-1.5 focus-visible:outline-primary min-w-0 text-[0.24rem] py-0 justify-between font-normal border-b border-border"

  if (column.href) {
    return (
      <div data-state="closed" data-orientation="vertical" className="border-b border-default last:border-b-0 border-none">
        <div data-orientation="vertical" data-state="closed" className="flex">
          <a href={column.href} className={triggerClassName}>
            <span className="text-start break-words flex-1 flex font-bold">
              <span className="w-full py-6">{column.title}</span>
            </span>
            <span />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      data-orientation="vertical"
      className="border-b border-default last:border-b-0 border-none"
    >
      <div data-orientation="vertical" data-state={isOpen ? "open" : "closed"} className="flex">
        <button
          type="button"
          id={triggerId}
          aria-controls={contentId}
          aria-expanded={isOpen}
          data-state={isOpen ? "open" : "closed"}
          data-orientation="vertical"
          onClick={onToggle}
          className={triggerClassName}
        >
          <span className="text-start break-words flex-1 flex font-bold">
            <span className="py-6">{column.title}</span>
          </span>
          <AccordionIcon isOpen={isOpen} />
        </button>
      </div>
      <div
        ref={contentRef}
        role="region"
        id={contentId}
        aria-labelledby={triggerId}
        data-state={isOpen ? "open" : "closed"}
        data-orientation="vertical"
        hidden={!isPresent}
        onAnimationEnd={() => {
          if (!isOpen) setIsCollapsing(false)
        }}
        className="data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none"
      >
        <div className="text-sm pb-0">
          <div className="flex flex-col gap-1 pt-3 pb-6">
            {column.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={link.current ? "page" : undefined}
                className="w-full py-2 text-xl flex items-center"
              >
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SiteFooter() {
  const [openColumn, setOpenColumn] = useState<string | null>("Vehicles")

  return (
    <footer className="overflow-hidden bg-background text-foreground">
      <div className="container mx-auto px-12 md:px-24 py-15.5 md:pt-24">
        <div className="flex flex-col-reverse md:flex-row justify-between mb-30 md:mb-33 gap-20 md:gap-0">
          <div className="gap-32 hidden md:flex">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                {column.href ? (
                  <a href={column.href} className="font-bold hover:opacity-70 transition-all">
                    {column.title}
                  </a>
                ) : (
                  <h3 className="font-bold mb-10">{column.title}</h3>
                )}
                <div className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      aria-current={link.current ? "page" : undefined}
                      className="font-medium hover:opacity-70 transition-all"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex-col gap-2 flex md:hidden">
            {FOOTER_COLUMNS.map((column) => (
              <FooterAccordionItem
                key={column.title}
                column={column}
                isOpen={openColumn === column.title}
                onToggle={() =>
                  setOpenColumn((current) => (current === column.title ? null : column.title))
                }
              />
            ))}
          </div>

          <div className="flex md:flex-col items-center md:items-start justify-between md:justify-start gap-10">
            <h3 className="font-bold text-[0.24rem] md:text-base">Follow Us</h3>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  title={social.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="text-3xl object-cover"
                    src={social.src}
                    alt={social.name}
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t py-6 text-xl md:text-base border-black/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="font-medium opacity-50">© Copyright 2025 JETOUR Auto</p>
            </div>
            <div className="flex gap-8">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-medium opacity-50 hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
