import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPageShell } from "@/components/PublicPageShell";
import { servicePages } from "@/lib/content";
import { servicePageContent } from "@/lib/service-page-content";
import { buildPageMetadata, jsonLdScript, serviceJsonLd } from "@/lib/site";

type ServiceDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: ServiceDetailPageProps): Metadata {
  const service = servicePages.find((item) => item.slug === params.slug);
  const content = servicePageContent[params.slug];

  if (!service || !content) {
    return buildPageMetadata({
      title: "Editing Service",
      description: "Editorial services from My Editing and Proofreading Desk.",
      path: "/services",
    });
  }

  return buildPageMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = servicePages.find((item) => item.slug === params.slug);
  const content = servicePageContent[params.slug];

  if (!service || !content) {
    notFound();
  }

  return (
    <PublicPageShell
      eyebrow={service.eyebrow}
      title={content.h1}
      description={service.description}
      seoPath={`/services/${service.slug}`}
      breadcrumbItems={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.name, path: `/services/${service.slug}` },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(serviceJsonLd(service))}
      />
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="border-l border-hairline pl-7">
            <p className="text-xs uppercase tracking-[0.28em] text-primary">Best for</p>
            <div className="mt-6 grid gap-3">
              {service.audiences.map((audience) => (
                <span key={audience} className="border-b border-hairline pb-3 text-lg text-ink">{audience}</span>
              ))}
            </div>
          </aside>
          <div>
            <p className="max-w-3xl font-display text-4xl leading-tight text-ink">{service.detail}</p>
            <div className="mt-8 max-w-3xl">
              <h2 className="font-display text-3xl text-ink">Who this service is for</h2>
              <p className="mt-4 text-base leading-8 text-body">{content.whoItIsFor}</p>
            </div>
            <h2 className="mt-12 font-display text-3xl text-ink">What is included</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {service.deliverables.map((deliverable) => (
                <article key={deliverable} className="min-h-36 border border-hairline bg-surface-soft rounded-2xl p-6">
                  <span className="text-xs uppercase tracking-[0.24em] text-primary">Included</span>
                  <h3 className="mt-5 text-xl leading-snug text-ink">{deliverable}</h3>
                </article>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="inline-flex min-h-12 items-center justify-center bg-primary rounded-full px-7 text-sm font-medium text-white transition duration-200 ease-premium-out hover:bg-primary-active active:scale-[0.98]">
                Start Secure Upload
              </Link>
              <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center border border-hairline rounded-full px-7 text-sm font-medium text-ink transition duration-200 ease-premium-out hover:border-primary hover:text-primary active:scale-[0.98]">
                Review pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-surface-soft px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-hairline bg-canvas p-6 sm:p-8">
            <h2 className="font-display text-3xl text-ink">What the editor improves</h2>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-body">
              {content.improvements.map((item) => <li key={item} className="border-t border-hairline pt-3">{item}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-hairline bg-canvas p-6 sm:p-8">
            <h2 className="font-display text-3xl text-ink">What is not included</h2>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-body">
              {content.notIncluded.map((item) => <li key={item} className="border-t border-hairline pt-3">{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-display text-4xl leading-tight text-ink">When to choose this service</h2>
            <ul className="mt-6 grid gap-4 text-base leading-7 text-body">
              {content.chooseWhen.map((item) => <li key={item} className="border-l border-primary/25 pl-5">{item}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-hairline bg-surface-soft p-7 sm:p-9">
            <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Turnaround and pricing</h2>
            <p className="mt-5 text-base leading-8 text-body">{content.pricingGuidance}</p>
            <Link href="/pricing" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-white transition hover:bg-primary-active">
              Review Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-soft px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-4xl text-ink">{service.name} FAQs</h2>
          <div className="mt-8 grid gap-4">
            {content.faqs.map((item) => (
              <article key={item.question} className="rounded-2xl border border-hairline bg-canvas p-6">
                <h3 className="font-display text-2xl text-ink">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-body">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl text-ink">Related editing services</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {content.relatedSlugs.map((slug) => {
              const related = servicePages.find((item) => item.slug === slug);
              return related ? (
                <Link key={slug} href={`/services/${slug}`} className="rounded-2xl border border-hairline bg-surface-soft p-5 transition hover:border-primary/35 hover:bg-canvas">
                  <span className="font-display text-2xl text-ink">{related.name}</span>
                  <span className="mt-2 block text-sm leading-6 text-body">{related.description}</span>
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
