import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { servicePages } from "@/lib/content";

const audienceGroups = [
  {
    title: "Academics",
    links: ["Scientific Editing", "Academic Proofreading", "Dissertation Editing", "Journal Strategy", "Structural Editing"]
  },
  {
    title: "Authors",
    links: ["Book Editing", "Book Proofreading", "Query Package Review", "Manuscript Formatting"]
  },
  {
    title: "Businesses",
    links: ["Business Editing", "Business Proofreading", "Website Editing", "Report Polish"]
  },
  {
    title: "Students",
    links: ["Essay Editing", "Essay Proofreading", "Admission Essay Review", "Statement Support"]
  }
];

const platformLinks = [
  { href: "/about", label: "About us" },
  { href: "/editors", label: "Editor standards" },
  { href: "/pricing", label: "Pricing calculator" },
  { href: "/ai-editing-tool", label: "AI Editing Tool" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

const trustBadges = ["Private uploads", "Secure payments", "Human review", "Dashboard delivery", "AI-assisted entry"];
const credibility = ["Academic manuscripts", "Business reports", "Author drafts", "Translations", "Formatting", "Writing support"];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink bg-ink text-ivory">
      <div className="overflow-hidden border-b border-ivory/10 bg-ink py-5">
        <div className="flex w-max animate-[marquee_34s_linear_infinite] gap-3 px-4 text-xs uppercase tracking-[0.28em] text-ivory/40 motion-reduce:animate-none">
          {[...credibility, ...credibility].map((item, index) => (
            <span key={`${item}-${index}`} className="border-y border-ivory/10 bg-ivory/5 px-6 py-4">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-none gap-10 px-6 py-16 sm:px-12 lg:grid-cols-[0.72fr_1.45fr] lg:px-20 xl:px-28 lg:py-20">
        <aside className="grid content-start gap-8">
          <div>
            <BrandMark />
            <p className="mt-6 max-w-sm text-sm leading-7 text-ivory/60">
              Precision editorial and strategic communication support for corporate teams, executives, and high-growth businesses.
            </p>
          </div>

          <div className="border-y border-ivory/10 py-6">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Corporate Inquiries</p>
            <a href="mailto:business@editandproofread.com" className="mt-3 block break-words font-display text-2xl leading-tight text-ivory transition hover:text-gold-deep">
              business@editandproofread.com
            </a>
            <p className="mt-4 text-sm leading-6 text-ivory/50">Include organization name, document type, expected word count, and operational deadline.</p>
          </div>

          <form className="grid gap-3">
            <div>
              <h2 className="font-display text-3xl leading-tight text-ivory">Stay ahead of the narrative.</h2>
              <p className="mt-3 text-sm leading-6 text-ivory/50">Receive insights on corporate communication, editorial strategy, and document excellence.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] lg:grid-cols-1 xl:grid-cols-[1fr_auto]">
              <label className="sr-only" htmlFor="footer-email">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                className="min-h-12 border border-ivory/10 bg-ivory/5 px-4 text-sm text-ivory outline-none transition duration-200 ease-premium-out placeholder:text-ivory/30 focus:border-gold"
              />
              <button type="button" className="min-h-12 bg-gold px-6 text-sm text-ink transition duration-200 ease-premium-out hover:bg-ivory active:scale-[0.98]">
                Sign up
              </button>
            </div>
          </form>
        </aside>

        <div className="rounded-none border border-ivory/10 bg-ivory/[0.03] p-5 shadow-[0_26px_90px_rgba(0,0,0,0.2)] sm:p-7">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {audienceGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold text-ivory">{group.title}</h2>
                <div className="mt-4 grid gap-3 text-sm text-ivory/50">
                  {group.links.map((item) => (
                    <Link key={item} href="/services" className="transition hover:text-gold">
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-8 border-t border-ivory/10 pt-8 md:grid-cols-3">
            <div>
              <h2 className="text-sm font-semibold text-ivory">Services</h2>
              <div className="mt-4 grid gap-3 text-sm text-ivory/50">
                {servicePages.slice(0, 4).map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`} className="transition hover:text-gold">
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-ivory">Platform</h2>
              <div className="mt-4 grid gap-3 text-sm text-ivory/50">
                {platformLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="transition hover:text-gold">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-ivory">Trust signals</h2>
              <div className="mt-4 grid gap-2">
                {trustBadges.map((badge) => (
                  <span key={badge} className="border border-ivory/10 bg-ivory/5 px-3 py-2 text-xs uppercase tracking-[0.18em] text-ivory/40">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 border-t border-ivory/10 pt-7 text-xs text-ivory/40 sm:grid-cols-[1fr_auto] sm:items-center">
            <p>Secure, enterprise-grade editorial infrastructure for mission-critical business documents.</p>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {["Privacy first", "Confidential", "SSL ready"].map((item) => (
                <span key={item} className="border border-ivory/10 bg-ivory/5 px-3 py-2">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10 px-5 py-6 text-center text-xs text-ivory/30">
        My Editing and Proofreading Desk. The standard for business communications.
      </div>
    </footer>
  );
}
