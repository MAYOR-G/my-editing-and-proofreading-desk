"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { servicePages } from "@/lib/content";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/ai-editing-tool", label: "AI tool" },
  { href: "/editors", label: "Editors" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-ink/5 bg-ivory/90 shadow-sm backdrop-blur-2xl supports-[backdrop-filter]:bg-ivory/70">
      <div className="mx-auto flex h-[5rem] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-8 lg:h-[5.25rem]">
        <div className="min-w-0 flex-1 xl:flex-[0_0_auto]">
          <BrandMark tone="dark" />
        </div>
        <nav className="hidden items-center gap-1.5 border border-ink/10 bg-paper/80 px-2.5 py-1.5 text-sm text-ink/80 shadow-sm xl:flex rounded-full backdrop-blur-md" aria-label="Primary navigation">
          <div className="group relative">
            <Link
              href="/services"
              className="inline-flex min-h-10 items-center px-4 transition duration-200 ease-premium-out hover:text-gold-deep active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-deep rounded-full"
            >
              Services
            </Link>
            <div className="invisible absolute left-1/2 top-full w-[27rem] -translate-x-1/2 pt-3 opacity-0 transition duration-200 ease-premium-out group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="border border-ink/10 bg-ivory rounded-2xl p-3 shadow-xl">
                {servicePages.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="grid gap-1 border-b border-ink/5 px-4 py-3 last:border-b-0 transition duration-200 ease-premium-out hover:bg-paper hover:text-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold-deep rounded-xl"
                  >
                    <span className="text-sm font-medium text-ink">{service.name}</span>
                    <span className="text-xs leading-5 text-ink/60">{service.eyebrow}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-10 items-center px-4 transition duration-200 ease-premium-out hover:text-gold-deep active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-deep rounded-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex min-h-11 items-center gap-3 border border-ink/10 bg-paper/80 px-3 text-sm text-ink rounded-full transition duration-200 ease-premium-out hover:border-gold-deep hover:text-gold-deep active:scale-[0.98] sm:px-4 xl:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-sidebar"
          >
            <span className="grid gap-1" aria-hidden="true">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
            Menu
          </button>
          <Link
            href="/login"
            className="hidden min-h-11 items-center bg-gold rounded-full px-8 text-sm font-bold tracking-wide text-ink transition duration-200 ease-premium-out hover:bg-gold-deep hover:text-ivory active:scale-[0.98] sm:inline-flex"
          >
            Dashboard / Login
          </Link>
        </div>
      </div>

      <div className={`fixed inset-0 z-50 xl:hidden ${mobileOpen ? "" : "pointer-events-none"}`} aria-hidden={!mobileOpen}>
        <button
          type="button"
          className={`absolute inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-200 ease-premium-out ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={closeMobile}
          aria-label="Close menu overlay"
        />
        <aside
          id="mobile-sidebar"
          className={`absolute right-0 top-0 flex h-dvh w-[min(24rem,92vw)] flex-col border-l border-ink/10 bg-ivory shadow-2xl transition-transform duration-300 ease-premium-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between gap-4 border-b border-ink/5 p-5">
            <BrandMark compact tone="dark" />
            <button
              type="button"
              onClick={closeMobile}
              className="grid h-11 w-11 place-items-center border border-ink/10 rounded-full text-ink transition duration-200 ease-premium-out hover:border-gold-deep hover:text-gold-deep active:scale-[0.98]"
              aria-label="Close menu"
            >
              <span className="relative h-4 w-4" aria-hidden="true">
                <span className="absolute left-0 top-1/2 h-px w-4 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-4 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            <div className="border-b border-ink/5 pb-6">
              <p className="text-xs uppercase tracking-[0.28em] text-gold-deep font-semibold">Primary</p>
              <div className="mt-4 grid gap-2">
                <Link href="/services" onClick={closeMobile} className="border border-ink/5 rounded-xl bg-paper px-4 py-3 font-display text-2xl text-ink transition hover:border-gold-deep/30 hover:bg-paper/80">
                  Services
                </Link>
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={closeMobile} className="border border-ink/5 rounded-xl bg-paper px-4 py-3 font-display text-2xl text-ink transition hover:border-gold-deep/30 hover:bg-paper/80">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-b border-ink/5 py-6">
              <p className="text-xs uppercase tracking-[0.28em] text-gold-deep font-semibold">Services</p>
              <div className="mt-4 grid gap-3">
                {servicePages.map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`} onClick={closeMobile} className="grid gap-1 text-sm text-ink/70 transition hover:text-gold-deep">
                    <span className="font-medium text-ink">{service.name}</span>
                    <span className="text-xs leading-5 text-ink/60">{service.eyebrow}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-3 pt-6">
              <Link href="/login" onClick={closeMobile} className="inline-flex rounded-full min-h-12 items-center justify-center bg-gold px-6 text-sm font-bold tracking-wide text-ink transition hover:bg-gold-deep hover:text-ivory">
                Dashboard / Login
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}
