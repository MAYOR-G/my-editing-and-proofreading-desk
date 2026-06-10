import type { Metadata } from "next";
import Link from "next/link";
import { ServiceSystemVisual } from "@/components/EditorialVisuals";
import { PublicPageShell } from "@/components/PublicPageShell";
import { servicePages } from "@/lib/content";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Editing and Proofreading Services",
  description: "Compare academic editing, business editing, proofreading, manuscript editing, translation review, and writing support services.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <PublicPageShell
      eyebrow="Editorial services"
      title="Choose the right editorial route."
      description="Each service is designed around the document, the reader, and the level of review needed before submission."
    >
      <section className="bg-canvas px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.5fr_1.5fr] lg:items-start">
          <ServiceSystemVisual />
          <div className="grid gap-5">
            {servicePages.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group grid gap-6 rounded-2xl border border-hairline bg-surface-soft p-6 transition duration-200 ease-premium-out hover:-translate-y-0.5 hover:border-primary/35 hover:bg-canvas hover:shadow-[0_18px_60px_rgba(17,17,15,0.045)] md:grid-cols-[0.14fr_0.34fr_0.44fr_0.08fr]"
              >
                <span className="font-display text-5xl leading-none text-primary">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.28em] text-primary">{service.eyebrow}</span>
                  <span className="mt-3 block font-display text-3xl leading-tight text-ink">{service.name}</span>
                </span>
                <span className="text-base leading-7 text-body">{service.description}</span>
                <span className="hidden items-center justify-end md:flex" aria-hidden="true">
                  <span className="h-px w-10 bg-hairline transition duration-200 ease-premium-out group-hover:w-16 group-hover:bg-primary" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
