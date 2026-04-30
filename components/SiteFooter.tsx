import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { servicePages } from "@/lib/content";

const platformLinks = [
  { href: "/about", label: "About us" },
  { href: "/editors", label: "Editor standards" },
  { href: "/pricing", label: "Pricing calculator" },
  { href: "/ai-editing-tool", label: "AI Editing Tool" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

const trustBadges = ["Private uploads", "Secure payments", "Human review", "Dashboard delivery", "AI-assisted entry"];

export function SiteFooter() {
  return (
    <footer className="border-t border-ivory/10 bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:py-20 relative">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        
        <aside className="grid content-start gap-8 relative z-10">
          <div>
            <BrandMark tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-7 text-ivory/60">
              Premium editorial support for academic, business, author, and personal documents that need calm precision.
            </p>
          </div>

          <div className="border-y border-ivory/10 py-6">
            <p className="text-xs uppercase tracking-[0.28em] text-gold font-semibold">Editorial inquiries</p>
            <a href="mailto:hello@business.editandproofread.com" className="mt-3 block break-words font-display text-2xl leading-tight text-ivory transition hover:text-gold">
              hello@business.editandproofread.com
            </a>
            <p className="mt-4 text-sm leading-6 text-ivory/50">Include document type, expected word count, and deadline.</p>
          </div>

          <Link href="/login" className="inline-flex min-h-12 w-fit items-center justify-center bg-gold rounded-full px-7 text-sm font-bold text-ink transition duration-200 ease-premium-out hover:bg-ivory active:scale-[0.98] shadow-[0_0_15px_rgba(176,138,60,0.3)]">
            Start a project
          </Link>
        </aside>

        <div className="border border-ivory/10 rounded-3xl bg-charcoal/50 backdrop-blur-sm p-5 sm:p-10 relative z-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h2 className="text-sm font-semibold text-ivory mb-2">Services</h2>
              <div className="mt-4 grid gap-3 text-sm text-ivory/60">
                {servicePages.slice(0, 6).map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`} className="transition hover:text-gold">
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-ivory mb-2">Platform</h2>
              <div className="mt-4 grid gap-3 text-sm text-ivory/60">
                {platformLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="transition hover:text-gold">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-ivory mb-2">Trust signals</h2>
              <div className="mt-4 grid gap-2">
                {trustBadges.map((badge) => (
                  <span key={badge} className="border border-ivory/10 rounded-lg bg-charcoal px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-ivory/50">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 border-t border-ivory/10 pt-7 text-xs text-ivory/50 sm:grid-cols-[1fr_auto] sm:items-center">
            <p>Secure, enterprise-grade editorial infrastructure for mission-critical business documents.</p>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {["Privacy first", "Confidential", "SSL ready"].map((item) => (
                <span key={item} className="border border-ivory/10 rounded bg-charcoal px-3 py-2 font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/5 px-5 py-6 text-center text-xs text-ivory/30 tracking-wider">
        My Editing and Proofreading Desk. The standard for business communications.
      </div>
    </footer>
  );
}
