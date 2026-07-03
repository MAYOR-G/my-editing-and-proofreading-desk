import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPageShell } from "@/components/PublicPageShell";
import { getSeoServicePage, seoServicePages } from "@/lib/seo-service-pages";
import { buildPageMetadata, faqPageJsonLd, jsonLdScript, serviceJsonLd } from "@/lib/site";

type SeoServiceRouteProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return seoServicePages.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: SeoServiceRouteProps): Metadata {
  const page = getSeoServicePage(params.slug);

  if (!page) {
    return buildPageMetadata({
      title: "Professional Editing and Proofreading Services | Edit and Proofread",
      description: "Explore human editing, proofreading, formatting, and document review services for academic, business, author, and professional writing.",
      path: "/services",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/${page.slug}`,
  });
}

export default function SeoServicePage({ params }: SeoServiceRouteProps) {
  const page = getSeoServicePage(params.slug);

  if (!page) {
    notFound();
  }

  const relatedPages = page.related
    .map((slug) => getSeoServicePage(slug))
    .filter((related): related is NonNullable<typeof related> => Boolean(related));

  return (
    <PublicPageShell
      eyebrow={page.eyebrow}
      title={page.h1}
      description={page.intro}
      seoPath={`/${page.slug}`}
      breadcrumbItems={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: page.name, path: `/${page.slug}` },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(serviceJsonLd({
          name: page.name,
          description: page.metaDescription,
          slug: page.slug,
          path: `/${page.slug}`,
          serviceType: page.name,
        }))}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqPageJsonLd(page.faq))} />

      <section className="bg-canvas px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
          <aside className="rounded-2xl border border-hairline bg-surface-soft p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Start here</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-ink">Upload securely or check pricing before you commit.</h2>
            <p className="mt-4 text-sm leading-7 text-body">{page.pricingCta}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <Link href="/submit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-active">
                Upload Your Document
              </Link>
              <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary/25 bg-canvas px-6 text-sm font-semibold text-primary transition hover:border-primary">
                Check Pricing
              </Link>
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-hairline px-6 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary sm:col-span-2 lg:col-span-1">
                Get a Free Quote
              </Link>
            </div>
          </aside>

          <div className="grid gap-8">
            <div>
              <h2 className="font-display text-4xl leading-tight text-ink">Who this service is for</h2>
              <ul className="mt-6 grid gap-3 text-base leading-7 text-body sm:grid-cols-2">
                {page.audience.map((item) => (
                  <li key={item} className="border-l border-primary/30 bg-surface-soft px-5 py-4">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-4xl leading-tight text-ink">What we check</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {page.checks.map((item) => (
                  <article key={item} className="rounded-2xl border border-hairline bg-surface-soft p-5">
                    <h3 className="text-base font-semibold leading-7 text-ink">{item}</h3>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-surface-soft px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Why it helps</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink">Clearer, more trustworthy writing before it matters.</h2>
          </div>
          <ul className="grid gap-3 text-base leading-7 text-body">
            {page.benefits.map((item) => (
              <li key={item} className="rounded-xl border border-hairline bg-canvas px-5 py-4">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-canvas px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Document examples</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink">Common files we review for this service.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {page.documentExamples.map((item) => (
              <article key={item} className="rounded-2xl border border-hairline bg-surface-soft p-5">
                <h3 className="text-base font-semibold leading-7 text-ink">{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Process</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-ink">From secure upload to final delivery.</h2>
            </div>
            <ol className="grid gap-4 md:grid-cols-2">
              {page.process.map((step, index) => (
                <li key={step} className="rounded-2xl border border-hairline bg-surface-soft p-6">
                  <span className="font-display text-4xl text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-4 text-sm leading-7 text-body">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-12 rounded-2xl border border-primary/15 bg-primary/[0.045] p-7 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h2 className="font-display text-3xl text-ink">Ready to start?</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-body">Upload securely, check pricing, or contact the desk if your document has unusual requirements.</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:mt-0 sm:flex-row">
              <Link href="/submit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-active">
                Start Your Edit
              </Link>
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary/25 bg-canvas px-6 text-sm font-semibold text-primary transition hover:border-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-soft px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-4xl leading-tight text-ink">{page.name} FAQs</h2>
          <div className="mt-8 grid gap-4">
            {page.faq.map((item) => (
              <article key={item.question} className="rounded-2xl border border-hairline bg-canvas p-6">
                <h3 className="font-display text-2xl leading-tight text-ink">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-body">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {relatedPages.length > 0 ? (
        <section className="bg-canvas px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-3xl text-ink">Related services</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedPages.map((related) => (
                <Link key={related.slug} href={`/${related.slug}`} className="rounded-2xl border border-hairline bg-surface-soft p-5 transition hover:border-primary/35 hover:bg-canvas">
                  <span className="font-display text-2xl text-ink">{related.name}</span>
                  <span className="mt-2 block text-sm leading-6 text-body">{related.metaDescription}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </PublicPageShell>
  );
}
