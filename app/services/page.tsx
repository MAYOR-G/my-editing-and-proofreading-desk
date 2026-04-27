import Link from "next/link";
import { ServiceSystemVisual } from "@/components/EditorialVisuals";
import { PublicPageShell } from "@/components/PublicPageShell";
import { servicePages } from "@/lib/content";

export default function ServicesPage() {
  return (
    <PublicPageShell
      eyebrow="Services"
      title="Editorial support by document need."
      description="Choose the route that best fits the work: academic, professional, urgent, manuscript, translation, or writing support."
    >
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
          <ServiceSystemVisual />
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {servicePages.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group grid gap-6 py-8 transition duration-200 ease-premium-out hover:bg-paper md:grid-cols-[0.18fr_0.34fr_0.4fr_0.08fr] md:px-5"
              >
                <span className="font-display text-5xl leading-none text-gold-deep">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.28em] text-gold-deep">{service.eyebrow}</span>
                  <span className="mt-3 block font-display text-4xl leading-tight text-ink">{service.name}</span>
                </span>
                <span className="text-base leading-7 text-charcoal/68">{service.description}</span>
                <span className="hidden items-center justify-end md:flex" aria-hidden="true">
                  <span className="h-px w-10 bg-ink/18 transition duration-200 ease-premium-out group-hover:w-16 group-hover:bg-gold" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
