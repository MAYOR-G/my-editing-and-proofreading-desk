import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPageShell } from "@/components/PublicPageShell";
import { servicePages } from "@/lib/content";

type ServiceDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = servicePages.find((item) => item.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <PublicPageShell eyebrow={service.eyebrow} title={service.name} description={service.description}>
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="border-l border-gold/45 pl-7">
            <p className="text-xs uppercase tracking-[0.28em] text-gold-deep">Best for</p>
            <div className="mt-6 grid gap-3">
              {service.audiences.map((audience) => (
                <span key={audience} className="border-b border-ink/10 pb-3 text-lg text-ink">{audience}</span>
              ))}
            </div>
          </aside>
          <div>
            <p className="max-w-3xl font-display text-4xl leading-tight text-ink">{service.detail}</p>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {service.deliverables.map((deliverable) => (
                <article key={deliverable} className="min-h-36 border border-ink/10 bg-paper p-6">
                  <span className="text-xs uppercase tracking-[0.24em] text-gold-deep">Included</span>
                  <h2 className="mt-5 text-xl leading-snug text-ink">{deliverable}</h2>
                </article>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="inline-flex min-h-12 items-center justify-center bg-ink px-7 text-sm text-ivory transition duration-200 ease-premium-out hover:bg-gold-deep active:scale-[0.98]">
                Start this service
              </Link>
              <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center border border-ink/15 px-7 text-sm text-ink transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98]">
                Review pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
