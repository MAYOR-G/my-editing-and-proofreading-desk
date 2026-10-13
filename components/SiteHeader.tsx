"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { BrandMark } from "@/components/BrandMark";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import { FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/contact-info";
import { seoServicePages } from "@/lib/seo-service-pages";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/submit", label: "Submit" },
  { href: "/ai-editing-tool", label: "AI tool" },
  { href: "/editors", label: "Editors" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);

  // Header shadow on scroll (R14)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock page scroll behind open mobile menu (R13)
  useEffect(() => {
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      mobileCloseRef.current?.focus();
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    mobileTriggerRef.current?.focus();
  }, []);

  const closeServices = useCallback(() => {
    setServicesOpen(false);
    servicesTriggerRef.current?.focus();
  }, []);

  // Close services dropdown on click outside
  useEffect(() => {
    if (!servicesOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(e.target as Node) &&
        servicesTriggerRef.current &&
        !servicesTriggerRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [servicesOpen]);

  // Keyboard navigation for dropdown & mobile menu (Escape, arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileOpen) {
          closeMobile();
        } else if (servicesOpen) {
          closeServices();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, servicesOpen, closeMobile, closeServices]);

  // Arrow key navigation inside services dropdown (R13)
  const handleDropdownKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!servicesOpen) return;
    const links = servicesDropdownRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
    if (!links || links.length === 0) return;

    const currentIndex = Array.from(links).indexOf(document.activeElement as HTMLAnchorElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
      links[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
      links[prevIndex]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      links[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      links[links.length - 1]?.focus();
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b bg-canvas/90 backdrop-blur-2xl transition-[box-shadow,border-color,background-color] duration-200 ease-out supports-[backdrop-filter]:bg-canvas/70 ${
        scrolled ? "border-hairline/80 shadow-[0_4px_20px_rgba(17,17,15,0.06)]" : "border-hairline shadow-none"
      }`}
    >
      <div className="mx-auto flex h-[5rem] w-full max-w-7xl items-center justify-between gap-2 px-3 min-[420px]:gap-4 min-[420px]:px-4 sm:px-8 lg:h-[5.25rem]">
        <div className="min-w-0 flex-1 overflow-hidden xl:flex-[0_0_auto]">
          <BrandMark tone="dark" />
        </div>

        <nav
          className="hidden items-center gap-1.5 rounded-full border border-hairline bg-surface-soft/80 px-2.5 py-1.5 text-sm text-body shadow-sm backdrop-blur-md xl:flex"
          aria-label="Primary navigation"
        >
          {/* Services Dropdown (Desktop) */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onKeyDown={handleDropdownKeyDown}
          >
            <div className="flex items-center">
              <Link
                href="/services"
                className="inline-flex min-h-10 items-center rounded-l-full pl-4 pr-1 font-medium text-ink transition-colors duration-200 hover:text-primary active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Services
              </Link>
              <button
                ref={servicesTriggerRef}
                type="button"
                onClick={() => setServicesOpen((prev) => !prev)}
                className="inline-flex min-h-10 items-center rounded-r-full pl-1 pr-3 text-ink transition-colors duration-200 hover:text-primary active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                aria-label="Toggle services menu"
              >
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ease-out ${servicesOpen ? "rotate-180" : "rotate-0"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Scrolling dropdown with max-height, overscroll-contain, subtle scrollbar */}
            <div
              ref={servicesDropdownRef}
              className={`absolute left-1/2 top-full w-[27rem] -translate-x-1/2 pt-2 transition-[opacity,transform,visibility] duration-200 ease-out ${
                servicesOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 translate-y-1 pointer-events-none"
              }`}
              role="menu"
              aria-orientation="vertical"
              aria-label="Services dropdown"
            >
              <div className="max-h-[calc(100dvh-5.5rem-16px)] overflow-y-auto overscroll-contain rounded-2xl border border-hairline bg-canvas p-3 shadow-xl [scrollbar-width:thin] [scrollbar-color:rgba(17,17,15,0.15)_transparent]">
                <div className="border-b border-hairline/80 px-4 pb-2.5 pt-1 text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  All Editorial Services
                </div>
                {seoServicePages.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/${service.slug}`}
                    onClick={() => setServicesOpen(false)}
                    role="menuitem"
                    className="grid gap-0.5 rounded-xl border-b border-hairline px-4 py-2.5 text-left transition-[background-color,color] duration-200 ease-out last:border-b-0 hover:bg-surface-soft hover:text-primary focus-visible:bg-surface-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
                  >
                    <span className="text-sm font-medium text-ink transition-colors duration-200">{service.name}</span>
                    <span className="text-xs leading-5 text-muted">{service.eyebrow}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-10 items-center rounded-full px-4 font-medium text-ink transition-colors duration-200 hover:text-primary active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-2">
          <button
            ref={mobileTriggerRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-full border border-primary/35 bg-canvas px-3 text-sm font-semibold text-primary shadow-sm transition-[border-color,color,transform] duration-200 hover:border-primary hover:text-primary active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary min-[420px]:gap-3 sm:px-4 xl:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-sidebar"
            aria-label="Open menu"
          >
            <span className="grid gap-1" aria-hidden="true">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
            <span className="hidden min-[390px]:inline">Menu</span>
          </button>

          <Link
            href="/submit"
            className="hidden min-h-11 items-center rounded-full bg-primary px-8 text-sm font-medium text-white shadow-sm transition-[background-color,transform] duration-200 hover:bg-primary-active active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary xl:inline-flex"
          >
            Submit Document
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Overlay and Sidebar */}
      <div
        className={`fixed inset-0 z-50 xl:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-200 ease-out ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobile}
          aria-label="Close menu overlay"
          tabIndex={mobileOpen ? 0 : -1}
        />

        <aside
          id="mobile-sidebar"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`absolute right-0 top-0 flex h-dvh w-[min(24rem,92vw)] flex-col border-l border-hairline bg-canvas shadow-2xl transition-transform duration-200 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between gap-4 border-b border-hairline p-5">
            <BrandMark compact tone="dark" />
            <button
              ref={mobileCloseRef}
              type="button"
              onClick={closeMobile}
              className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-ink transition-[border-color,color,transform] duration-200 hover:border-primary hover:text-primary active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="Close menu"
            >
              <span className="relative h-4 w-4" aria-hidden="true">
                <span className="absolute left-0 top-1/2 h-px w-4 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-4 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          {/* Scrolling mobile content with overscroll-contain & subtle scrollbar */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 [scrollbar-width:thin] [scrollbar-color:rgba(17,17,15,0.15)_transparent]">
            <div className="border-b border-hairline pb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Primary</p>
              <div className="mt-4 grid gap-2">
                <Link
                  href="/services"
                  onClick={closeMobile}
                  className="rounded-xl border border-hairline bg-surface-soft px-4 py-3 font-display text-2xl text-ink transition-[background-color,border-color] duration-200 hover:border-primary/30 hover:bg-surface-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  Services
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobile}
                    className="rounded-xl border border-hairline bg-surface-soft px-4 py-3 font-display text-2xl text-ink transition-[background-color,border-color] duration-200 hover:border-primary/30 hover:bg-surface-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-b border-hairline py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Services</p>
              <div className="mt-4 grid gap-3">
                {seoServicePages.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/${service.slug}`}
                    onClick={closeMobile}
                    className="grid gap-0.5 rounded-lg p-1.5 text-sm text-body transition-colors duration-200 hover:bg-surface-soft hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <span className="font-medium text-ink">{service.name}</span>
                    <span className="text-xs leading-5 text-muted">{service.eyebrow}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-3 pt-6">
              <Link
                href="/submit"
                onClick={closeMobile}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-white shadow-sm transition-[background-color,transform] duration-200 hover:bg-primary-active active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                Submit Document
              </Link>
            </div>

            <div className="mt-6 border-t border-hairline pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Follow our desk</p>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface-soft text-ink transition-[border-color,color,transform] duration-200 hover:border-primary hover:text-primary active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface-soft text-ink transition-[border-color,color,transform] duration-200 hover:border-primary hover:text-primary active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}
