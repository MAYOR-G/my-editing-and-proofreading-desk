import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPageShell } from "@/components/PublicPageShell";
import { getSeoServicePage, seoServicePages } from "@/lib/seo-service-pages";
import { buildPageMetadata, faqPageJsonLd, jsonLdScript, serviceJsonLd, webPageJsonLd } from "@/lib/site";

type SeoServiceRouteProps = {
  params: {
    slug: string;
  };
};

const serviceEnhancements: Record<string, {
  heading: string;
  paragraphs: string[];
  boundaries: string[];
  guides: Array<{ href: string; label: string }>;
}> = {
  "editing-services": {
    heading: "Sentence editing, structural review, and final proofreading are different stages.",
    paragraphs: [
      "Sentence-level editing improves clarity, concision, tone, and flow within the wording you provide. Structural review looks more broadly at section order, paragraph logic, repetition, and the reader's route through a paper, business document, or manuscript.",
      "If the structure and wording are already settled, proofreading may be enough. We use human judgment and can return tracked changes and comments, but the author remains responsible for facts, evidence, decisions, and final approval.",
    ],
    boundaries: ["We do not invent facts, sources, results, qualifications, or assessed content.", "Source verification, fact-checking, and substantial new writing require separate written scope.", "Proofreading is a later quality-control pass and does not replace unresolved editing work."],
    guides: [{ href: "/blog/editing-vs-proofreading", label: "Compare editing and proofreading" }, { href: "/blog/how-much-does-proofreading-cost", label: "Understand pricing factors" }],
  },
  "proofreading-services": {
    heading: "Proofreading is the final check after content decisions are complete.",
    paragraphs: [
      "A proofreader checks the approved version for grammar, punctuation, spelling, consistency, and presentation. This is most useful when you are no longer moving sections or changing the argument, offer, story, or evidence.",
      "For a paper, CV, manuscript, or business document that still feels unclear or uneven, editing should come first. We will flag when a draft appears to need work outside a final proofreading scope.",
    ],
    boundaries: ["Proofreading does not redesign the argument or reorganize substantial sections.", "It does not verify every factual claim, citation, name, number, or external source unless agreed separately.", "Corrections preserve the supplied meaning; the client approves the final file."],
    guides: [{ href: "/blog/editing-vs-proofreading", label: "Choose the right review stage" }, { href: "/blog/how-much-does-proofreading-cost", label: "See how the calculator works" }],
  },
  "academic-proofreading": {
    heading: "A broad final review for essays, research papers, and academic submissions.",
    paragraphs: [
      "Academic proofreading concentrates on language and presentation across shorter papers and final research documents. It can check scholarly tone, terminology, headings, citations, references, tables, and figures within the material supplied.",
      "Thesis editing is more suitable for chapters that still need structural revision. Dissertation proofreading is a dedicated whole-document final pass for long graduate submissions with front matter, appendices, and institution-specific presentation rules.",
    ],
    boundaries: ["We do not select research methods, develop arguments, or write assessed content.", "We check citation consistency but do not assume that every cited source has been read or accurately represented.", "Institutional or journal rules provided by the author take priority over generic style conventions."],
    guides: [{ href: "/blog/research-paper-editing-checklist-before-submission", label: "Research paper submission checklist" }, { href: "/blog/editing-vs-proofreading", label: "Editing or proofreading?" }],
  },
  "thesis-editing": {
    heading: "Chapter-level revision before the thesis reaches its final proofread.",
    paragraphs: [
      "Thesis editing can work across the abstract, introduction, literature review, methods, results, discussion, and conclusion, with attention to how each chapter supports the research purpose. Supervisor comments and institutional guidance help define the appropriate scope.",
      "The service improves the student's own draft through tracked changes, comments, and human editorial judgment. It can clarify transitions and flag gaps or inconsistencies, but decisions about methods, analysis, claims, and responses to supervisors remain with the author.",
      "Choose thesis editing while sentence clarity, academic tone, chapter flow, terminology, and argument presentation still need work. Choose thesis proofreading after structure and meaning are stable and the remaining task is final quality control.",
    ],
    boundaries: ["We do not conduct research, generate findings, or write thesis chapters for assessment.", "Reference reconstruction and source-by-source verification are separate from language editing.", "After major revisions are accepted, a separate final proofread may still be useful."],
    guides: [{ href: "/blog/thesis-proofreading-checklist", label: "Thesis final-review checklist" }, { href: "/blog/thesis-tables-figures-references-checklist", label: "Check tables, figures, and references" }],
  },
  "dissertation-proofreading": {
    heading: "A whole-document final pass after supervisor and content revisions.",
    paragraphs: [
      "A dissertation proofread checks consistency across chapters as well as front matter, pagination, headings, captions, tables, figures, references, appendices, and the exported submission file. The best time to begin is after the argument and chapter order are stable.",
      "Long documents need realistic scheduling and time for the author to review tracked changes, answer comments, refresh fields, and inspect the final PDF. Projects above the calculator's automatic word-count range require scope and turnaround confirmation before work begins.",
      "The delivered review is intended to improve final submission readiness, not to replace supervisor feedback, institutional approval, or the author's responsibility for research content.",
    ],
    boundaries: ["Proofreading does not repair an unresolved research design or rewrite the dissertation argument.", "We check supplied formatting guidance but do not guarantee acceptance by an institution or examiner.", "The author must confirm factual content, data, citation accuracy, and the required submission format."],
    guides: [{ href: "/blog/dissertation-proofreading-checklist", label: "Use the 15-check dissertation list" }, { href: "/blog/how-to-proofread-a-dissertation-before-submission", label: "Follow a staged proofreading workflow" }, { href: "/blog/thesis-tables-figures-references-checklist", label: "Audit tables, figures, and references" }],
  },
  "manuscript-editing": {
    heading: "Book manuscripts and research manuscripts need different editorial decisions.",
    paragraphs: [
      "Book editing may focus on chapter flow, pacing, voice, consistency, and readability. Journal or research manuscript editing focuses more on section logic, scholarly language, terminology, cautious claims, and alignment with the target journal's author instructions.",
      "Copy editing improves wording and consistency; proofreading checks the final approved version; formatting applies the required presentation rules. Tell us the manuscript type and intended reader so the review can be scoped accurately.",
    ],
    boundaries: ["Editing cannot guarantee publication, acceptance, sales, or a particular review outcome.", "We do not fabricate citations, research results, plot material, or author credentials.", "Journal selection, peer-review responses, indexing, and typesetting are outside scope unless explicitly agreed."],
    guides: [{ href: "/blog/research-paper-editing-checklist-before-submission", label: "Research paper editing checklist" }, { href: "/blog/editing-vs-proofreading", label: "Understand editing versus proofreading" }],
  },
  "business-proofreading": {
    heading: "Client-ready communication without distracting errors.",
    paragraphs: [
      "Business proofreading is for documents whose message, facts, pricing, and approval route are already settled. The review concentrates on grammar, punctuation, consistency, terminology, headings, names, numbers, and presentation details before a client, stakeholder, investor, or team reads the file.",
      "If a proposal or report needs stronger positioning, a clearer executive narrative, or a different section order, professional editing should come first. Proofreading keeps the approved business meaning intact while removing avoidable distractions.",
    ],
    boundaries: ["We do not provide legal, financial, regulatory, or strategic approval.", "We do not invent claims, metrics, case studies, testimonials, or commercial results.", "Design, slide production, market research, and brand strategy need separate scope."],
    guides: [{ href: "/blog/editing-vs-proofreading", label: "Choose editing or proofreading" }, { href: "/blog/how-much-does-proofreading-cost", label: "Review proofreading cost factors" }],
  },
  "cv-resume-editing": {
    heading: "Clear applications that recruiters can scan quickly.",
    paragraphs: [
      "CV and resume editing improves the wording, order, consistency, and readability of the application material you provide. The goal is a clearer document that foregrounds relevant experience and reduces grammar, formatting, and repetition issues.",
      "For cover letters, LinkedIn summaries, and personal statements, we can improve flow and tone while preserving truthful authorship. You remain responsible for confirming roles, dates, qualifications, achievements, and any role-specific requirements.",
    ],
    boundaries: ["We do not invent experience, employers, qualifications, achievements, references, or metrics.", "We do not guarantee interviews, admission, funding, hiring, or selection.", "ATS testing, recruitment strategy, and job matching are outside standard editing scope."],
    guides: [{ href: "/blog/editing-vs-proofreading", label: "Understand editing depth" }, { href: "/pricing", label: "Estimate application editing" }],
  },
  "document-formatting": {
    heading: "A consistent file that follows the required guidelines.",
    paragraphs: [
      "Document formatting focuses on presentation: margins, spacing, headings, page numbers, tables, figures, captions, references, appendices, lists, and final file readiness. It is most useful when the writing is close to final but the document needs a consistent structure and submission format.",
      "Supply the university, journal, publisher, or company guidelines when available. Formatting can be paired with proofreading, but it does not replace a language review or solve unresolved content problems.",
      "Microsoft Word styles, section breaks, generated contents lists, table and figure captions, reference presentation, and final PDF consistency are common formatting checks. Regulatory-document formatting is handled only when the required rules and scope are supplied and accepted in writing.",
    ],
    boundaries: ["We do not create research content, rewrite arguments, or verify every source.", "Regulatory, legal, medical, or compliance approval is not included unless a separate qualified review is agreed.", "Complex typesetting, cover design, print production, and publisher production files require separate agreement.", "Institutional or publisher acceptance cannot be guaranteed."],
    guides: [{ href: "/blog/thesis-tables-figures-references-checklist", label: "Audit tables and references" }, { href: "/blog/how-to-proofread-a-dissertation-before-submission", label: "Plan final file checks" }],
  },
  "translation-review": {
    heading: "Natural English that preserves the intended meaning.",
    paragraphs: [
      "Translation review is for an existing English translation that needs smoother phrasing, clearer syntax, consistent terminology, and a tone suited to the target reader. When the source document is supplied, it can help clarify ambiguous wording and repeated terms.",
      "This is editorial review, not certified translation. We improve the translated English while flagging places where the author or a source-language specialist must confirm meaning.",
    ],
    boundaries: ["We do not provide certified, sworn, or notarized translation.", "We do not guarantee legal, medical, regulatory, or technical equivalence.", "Back-translation, source-language specialist review, and terminology database creation require separate scope."],
    guides: [{ href: "/blog/editing-vs-proofreading", label: "Compare review stages" }, { href: "/pricing", label: "Check translation-review pricing" }],
  },
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
  const enhancement = serviceEnhancements[page.slug];

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
        dangerouslySetInnerHTML={jsonLdScript([
          serviceJsonLd({
            name: page.name,
            description: page.metaDescription,
            slug: page.slug,
            path: `/${page.slug}`,
            serviceType: page.name,
          }),
          webPageJsonLd({
            path: `/${page.slug}`,
            name: page.h1,
            description: page.metaDescription,
            dateModified: page.dateUpdated,
          }),
        ])}
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

      {enhancement ? (
        <section className="border-y border-hairline bg-surface-soft px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Scope and service fit</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-ink">{enhancement.heading}</h2>
              <div className="mt-6 grid gap-4 text-base leading-8 text-body">
                {enhancement.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {enhancement.guides.map((guide) => (
                  <Link key={guide.href} href={guide.href} className="rounded-full border border-primary/25 bg-canvas px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary">
                    {guide.label}
                  </Link>
                ))}
              </div>
            </div>
            <aside className="rounded-2xl border border-hairline bg-canvas p-6 sm:p-8">
              <h2 className="font-display text-3xl text-ink">What is not included</h2>
              <ul className="mt-5 grid gap-4 text-sm leading-7 text-body">
                {enhancement.boundaries.map((boundary) => <li key={boundary} className="border-l border-primary/30 pl-4">{boundary}</li>)}
              </ul>
            </aside>
          </div>
        </section>
      ) : null}

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
