import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  FileLock2,
  GraduationCap,
  Layers3,
  PenLine,
  SearchCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/site";

const fields = [
  "Academic writing",
  "Research papers",
  "Business documents",
  "Technical documents",
  "Medical and health sciences",
  "Law",
  "Education",
  "Engineering",
  "Social sciences",
  "CV / resume",
  "Formatting and referencing",
];

const improvements = [
  "Clarity",
  "Grammar",
  "Flow",
  "Tone",
  "Structure",
  "Argument strength",
  "Formatting",
  "Referencing",
  "Reader confidence",
];

const expertiseAreas = [
  {
    title: "Academic editing",
    body: "Essays, theses, dissertations, research papers, and journal manuscripts are reviewed for scholarly clarity, structure, terminology, and consistency.",
  },
  {
    title: "Business editing",
    body: "Reports, proposals, profiles, and client documents are refined for clear decisions, professional tone, and reader-focused organization.",
  },
  {
    title: "Manuscript editing",
    body: "Long-form work is checked for section flow, consistency, pacing, headings, references, and a coherent reading experience.",
  },
  {
    title: "Language editing",
    body: "Translated or multilingual drafts are improved for natural English, consistent terminology, appropriate tone, and accurate meaning.",
  },
];

const finalChecks = [
  "The requested service and client instructions have been followed",
  "Grammar, punctuation, spelling, and terminology are consistent",
  "Headings, lists, tables, captions, and references follow one clear pattern",
  "Comments are useful, specific, and limited to decisions the writer needs to make",
  "Tracked and clean files are complete, readable, and ready for secure delivery",
  "No unsupported claims, sources, findings, or personal details have been added",
];

const process = [
  ["01", "Submit document", "Upload your file and share the audience, purpose, deadline, and any editorial priorities."],
  ["02", "We assess the needs", "The document is reviewed for service fit, word count, timeline, and subject requirements."],
  ["03", "We match the editor", "Projects are assigned to editors whose background aligns with the field and document type."],
  ["04", "Editor reviews and refines", "The editor improves clarity, precision, structure, tone, consistency, and presentation."],
  ["05", "You receive polished work", "Completed files are returned with clean delivery and track changes where appropriate."],
];

const trustItems = [
  { title: "Human-led editing", body: "Every high-stakes document benefits from judgment that can read for meaning, audience, and intent.", icon: PenLine },
  { title: "Confidential review", body: "Documents are handled privately and used only to provide the requested editorial service.", icon: FileLock2 },
  { title: "Subject-aware feedback", body: "Editors consider discipline, terminology, reader expectations, and submission context.", icon: SearchCheck },
  { title: "On-time delivery", body: "Projects are reviewed within the selected timeline, with clear status updates in the dashboard.", icon: ShieldCheck },
];

const editorialDesks = [
  {
    title: "STEM & Clinical Medicine Desk",
    code: "DESK 01 · EMPIRICAL & BIOMEDICAL",
    disciplineFocus:
      "IMRaD manuscript structure, statistical reporting clarity (p-values, confidence intervals, effect sizes), CONSORT/PRISMA/STROBE alignment, and LaTeX/Word mathematical equation preservation.",
    styleGuides: "AMA 11th, IEEE, Vancouver, CSE, Nature/Elsevier/Springer Author Guidelines, APA 7th Quantitative",
    verificationProtocol:
      "Dual-pass technical terminology audit, cross-verification of in-text numerical values against tables/figures, and non-destructive editing around inline equations and nomenclature.",
    sampleTrackedStandard: {
      before: "Treatment group A showed a significant reduction in biomarkers (p = 0.04), proving the intervention cures the pathology.",
      after: "Treatment Group A demonstrated a statistically significant reduction in target biomarkers (p = .04), indicating that the intervention may attenuate disease progression.",
      note: "Calibrated causal overclaiming to match empirical scope and standardized statistical reporting notation.",
    },
  },
  {
    title: "Social Sciences, Education & Humanities Desk",
    code: "DESK 02 · QUALITATIVE & THEORETICAL",
    disciplineFocus:
      "Qualitative rigor, ethnographic and phenomenological voice preservation, theoretical framing, literature synthesis cohesion, and chapter-to-chapter argument transitions.",
    styleGuides: "APA 7th Edition, Chicago Manual of Style (17th Ed. Notes & Bibliography / Author-Date), MLA 9th, Harvard",
    verificationProtocol:
      "Cross-chapter thesis thread audit, participant quote integrity lock (ensuring zero alterations to verbatim transcripts), and full in-text citation to bibliography reconciliation.",
    sampleTrackedStandard: {
      before: "The interviewees all agreed that institutional barriers are the main reason why pedagogical reform fails in urban schools.",
      after: "Across semi-structured interviews, participants consistently identified institutional barriers as a primary constraint on pedagogical reform in urban school districts.",
      note: "Replaced informal generalization with methodologically precise qualitative reporting.",
    },
  },
  {
    title: "Law, Policy & Jurisprudence Desk",
    code: "DESK 03 · LEGAL & STATUTORY",
    disciplineFocus:
      "Statutory interpretation clarity, comparative constitutional analysis, treaty and case-law syntax, regulatory precision, and exhaustive footnote integrity.",
    styleGuides: "OSCOLA (4th Ed.), The Bluebook (21st Ed.), AGLC4, McGill Guide (10th Ed.), Chicago Legal",
    verificationProtocol:
      "Pinpoint citation syntax verification, supra/ibid cross-reference validation, Latin legal maxim standardization, and strict preservation of normative legal terms of art (shall vs. may).",
    sampleTrackedStandard: {
      before: "The court's ruling in Smith makes it clear that directors must always consider creditor interests whenever insolvency is possible.",
      after: "The appellate holding in Smith clarifies that fiduciary duties require directors to consider creditor interests once insolvent liquidation becomes probable.",
      note: "Sharpened doctrinal precision around the insolvency threshold and aligned verb tense with case-law convention.",
    },
  },
  {
    title: "Corporate, Executive & Regulatory Desk",
    code: "DESK 04 · INSTITUTIONAL & ENTERPRISE",
    disciplineFocus:
      "Technical whitepapers, R&D grant proposals (NIH, NSF, Horizon Europe, UKRI), multilateral policy briefs, ESG disclosures, and institutional compliance documentation.",
    styleGuides: "Associated Press (AP), Economist Style Guide, European Commission Interinstitutional Style Guide, Custom House Guides",
    verificationProtocol:
      "Executive summary alignment check, active-voice decision framing, acronym/glossary registry compilation, and strict compliance with funder page/word-count ceilings.",
    sampleTrackedStandard: {
      before: "Our consortium hopes to utilize the grant funding to potentially build a scalable framework for regional supply chain resilience.",
      after: "The consortium will deploy grant funding to establish a scalable, auditable framework that strengthens regional supply-chain resilience across three pilot corridors.",
      note: "Eliminated tentative hedging to project institutional readiness and measurable deliverable scope.",
    },
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Human Editors for Academic, Business, and Manuscript Editing",
  description: "Learn how documents are matched with human editors who consider subject, purpose, audience, tone, structure, and delivery standards.",
  path: "/editors",
});

function EditorialReviewVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      <div className="absolute -right-8 top-6 h-48 w-48 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-8 bottom-8 h-44 w-44 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[1.35rem] border border-hairline bg-surface-soft p-5 shadow-[0_28px_90px_rgba(17,17,15,0.08)] sm:p-6">
        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(23,74,124,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(23,74,124,0.15)_1px,transparent_1px)] [background-size:34px_34px]" aria-hidden="true" />
        <div className="relative rounded-[1.05rem] border border-hairline bg-canvas p-5 shadow-[0_18px_60px_rgba(17,17,15,0.06)]">
          <div className="flex items-start justify-between gap-4 border-b border-hairline pb-4">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary">Editor match</p>
              <h2 className="mt-2 font-display text-3xl leading-tight text-ink">Research methods review</h2>
            </div>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-primary">
              Subject-aligned
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_8rem]">
            <div className="grid gap-4 rounded-xl border border-hairline bg-paper/70 p-4 text-sm leading-7 text-body">
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-red-700">Before</p>
                <p className="mt-1">The study prove the model is correct and the results is useful for future research.</p>
              </div>
              <div className="border-t border-hairline pt-4">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-primary">After</p>
                <p className="mt-1 rounded-sm bg-primary/10 px-2 py-1 font-medium text-primary">
                  The study provides evidence that the model is reliable, and the results may support future research.
                </p>
              </div>
            </div>
            <div className="grid content-start gap-3">
              <div className="rounded-xl border border-primary/15 bg-canvas p-3 shadow-sm">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-primary">Editor note</p>
                <p className="mt-2 text-xs leading-5 text-body">
                  Improved subject-verb agreement, reduced overclaiming, and made the conclusion more academically precise.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 grid gap-3 sm:grid-cols-3">
          {["Audience", "Purpose", "Field"].map((item) => (
            <div key={item} className="rounded-xl border border-hairline bg-canvas/85 px-4 py-3 text-center text-[0.7rem] font-bold uppercase tracking-[0.16em] text-charcoal/62">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EditorsPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Editor Standards", path: "/editors" },
        ])}
      />
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-hairline px-5 pb-16 pt-28 sm:px-8 lg:pb-20 lg:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(23,74,124,0.08),transparent_28%),linear-gradient(180deg,rgba(247,247,247,0.72),rgba(255,255,255,0.96))]" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(10,11,13,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(10,11,13,0.12)_1px,transparent_1px)] [background-size:56px_56px]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_0.78fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-3 border-y border-primary/18 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-8 bg-primary/45" aria-hidden="true" />
              Human editorial standards
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.7rem,5.3vw,5.45rem)] leading-[0.98] text-ink">
              Editors who understand the work in front of them.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-body sm:text-lg">
              Your document is matched with editors who consider the subject, purpose, audience, and expected standard before they revise a single sentence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(23,74,124,0.22)] transition duration-200 ease-premium-out hover:-translate-y-0.5 hover:bg-primary-active">
                Submit Your Document <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary/22 bg-canvas px-6 text-sm font-semibold text-primary transition duration-200 ease-premium-out hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/5">
                View Pricing
              </Link>
            </div>
          </div>

          <EditorialReviewVisual />
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Editorial philosophy</p>
            <h2 className="mt-4 max-w-xl font-display text-[clamp(2.25rem,4vw,4.05rem)] leading-tight text-ink">
              Precision, tone, and reader confidence come first.
            </h2>
          </div>
          <div className="grid gap-5 text-base leading-8 text-body sm:text-lg">
            <p>
              Our editing process is designed for documents where precision, tone, and reader confidence matter. Editors look beyond surface corrections to consider the purpose of the document and what its intended audience needs.
            </p>
            <p>
              The result should be accurate, clear, consistent, and recognizably yours.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-surface-soft px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Areas of editorial support</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,4rem)] leading-tight text-ink">
              Different documents require different editorial judgment.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {expertiseAreas.map((area) => (
              <article key={area.title} className="rounded-2xl border border-hairline bg-canvas p-6 shadow-[0_18px_55px_rgba(17,17,15,0.04)]">
                <h3 className="font-display text-3xl leading-tight text-ink">{area.title}</h3>
                <p className="mt-3 text-sm leading-7 text-body">{area.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-soft px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 rounded-[1.35rem] border border-hairline bg-canvas p-6 shadow-[0_28px_90px_rgba(17,17,15,0.055)] sm:p-9 lg:grid-cols-[0.82fr_1.18fr] lg:p-10">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-5 font-display text-[clamp(2.1rem,3.6vw,3.55rem)] leading-tight text-ink">
                Selection standards for careful editorial work.
              </h2>
            </div>
            <div className="grid gap-5 text-base leading-8 text-body">
              <p>
                Editors are selected for language judgment, relevant subject familiarity, careful handling of author voice, and the ability to explain changes clearly.
              </p>
              <p>
                Each project is assessed by document type, field, audience, and level of support before assignment. Where a specialist match cannot be confirmed, the project should be reviewed with the client before work begins.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Language judgment", "Clear, accurate editing"],
                  ["Editorial process", "Consistent review standards"],
                  ["Subject match", "Relevant expertise"],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-xl border border-hairline bg-surface-soft p-4">
                    <p className="font-semibold text-ink">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-body">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Before delivery</p>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,3.8vw,3.75rem)] leading-tight text-ink">
              What editors check before returning a document.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-body">
              The final pass checks the document as a whole, not only the sentences that received visible edits.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {finalChecks.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl border border-hairline bg-surface-soft p-5 text-sm leading-7 text-body">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Subject matching</p>
              <h2 className="mt-4 font-display text-[clamp(2.1rem,3.8vw,3.9rem)] leading-tight text-ink">
                The right editor for the right document.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-body">
                Projects are reviewed for discipline, document type, audience, and level of editorial support before they are assigned.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {fields.map((field) => (
                <div key={field} className="group rounded-xl border border-hairline bg-surface-soft px-4 py-4 text-sm font-semibold text-ink shadow-[0_14px_42px_rgba(17,17,15,0.035)] transition duration-200 ease-premium-out hover:-translate-y-0.5 hover:border-primary/28 hover:bg-canvas">
                  <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {field}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-canvas px-5 pb-16 sm:px-8 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[1.35rem] border border-hairline bg-surface-soft p-6 shadow-[0_24px_80px_rgba(17,17,15,0.045)] sm:p-8">
            <div className="flex items-center gap-3">
              <Layers3 className="h-5 w-5 text-primary" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">What editors improve</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {improvements.map((item) => (
                <span key={item} className="rounded-full border border-hairline bg-canvas px-4 py-2 text-sm font-semibold text-charcoal/72">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-hairline bg-ink p-6 text-white shadow-[0_24px_80px_rgba(17,17,15,0.09)] sm:p-8">
            <div className="flex items-center gap-3">
              <BookOpenCheck className="h-5 w-5 text-gold" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Editorial judgment</p>
            </div>
            <p className="mt-6 text-base leading-8 text-white/78">
              Strong editing is not only grammar correction. It is the ability to recognize what the document is trying to accomplish, what the reader needs, and how each sentence can carry the work with more confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-surface-soft px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Editorial review layers</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,4rem)] leading-tight text-ink">
              Layered review from assessment to polished delivery.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            {process.map(([label, title, body]) => (
              <article key={label} className="rounded-2xl border border-hairline bg-canvas p-5 shadow-[0_18px_55px_rgba(17,17,15,0.04)]">
                <span className="font-display text-4xl leading-none text-primary">{label}</span>
                <h3 className="mt-5 font-display text-2xl leading-tight text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-body">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Trust standards</p>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,3.8vw,3.75rem)] leading-tight text-ink">
              Professional support for documents that matter.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {trustItems.map((item) => (
              <article key={item.title} className="rounded-2xl border border-hairline bg-surface-soft p-6 shadow-[0_18px_55px_rgba(17,17,15,0.04)]">
                <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-5 font-display text-3xl leading-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Institutional specialization</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,4rem)] leading-tight text-ink">
              Subject-Matter Editorial Desks &amp; Review Standards
            </h2>
            <p className="mt-4 text-base leading-8 text-body">
              Every submission is routed to one of four specialized institutional desks. Rather than relying on generalist freelancers, each desk enforces discipline-specific style conventions, methodological boundaries, and tracked-change protocols.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {editorialDesks.map((desk) => (
              <article
                key={desk.title}
                className="flex flex-col justify-between rounded-2xl border border-hairline bg-surface-soft p-6 shadow-[0_18px_55px_rgba(17,17,15,0.04)] sm:p-8"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-4">
                    <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary">
                      {desk.code}
                    </span>
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary">
                      100% Human Review
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-3xl leading-tight text-ink">
                    {desk.title}
                  </h3>

                  <dl className="mt-6 grid gap-4 text-sm leading-6">
                    <div className="rounded-xl border border-hairline bg-canvas p-4">
                      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        Discipline Focus
                      </dt>
                      <dd className="mt-1.5 text-body">{desk.disciplineFocus}</dd>
                    </div>

                    <div className="rounded-xl border border-hairline bg-canvas p-4">
                      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        Style Guides Covered
                      </dt>
                      <dd className="mt-1.5 font-medium text-ink">{desk.styleGuides}</dd>
                    </div>

                    <div className="rounded-xl border border-hairline bg-canvas p-4">
                      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        Quality Verification Protocol
                      </dt>
                      <dd className="mt-1.5 text-body">{desk.verificationProtocol}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 rounded-xl border border-primary/20 bg-canvas p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Sample Tracked-Change Standard
                  </p>
                  <div className="mt-3 grid gap-2.5 text-xs leading-6">
                    <div className="rounded-lg border border-red-200/80 bg-red-50/50 p-3 text-body">
                      <span className="font-bold uppercase tracking-wider text-red-700">Raw Draft: </span>
                      <span className="line-through decoration-red-600/60">{desk.sampleTrackedStandard.before}</span>
                    </div>
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-ink">
                      <span className="font-bold uppercase tracking-wider text-primary">Human Desk Revision: </span>
                      <span className="font-medium">{desk.sampleTrackedStandard.after}</span>
                    </div>
                    <p className="text-[11px] italic text-muted">
                      Margin rationale: {desk.sampleTrackedStandard.note}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.35rem] border border-hairline bg-primary p-7 text-white shadow-[0_30px_90px_rgba(23,74,124,0.22)] sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-white/72">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Ready for expert review
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.15rem,4vw,4.05rem)] leading-tight">
                Submit your document and we will match it with the right editorial support.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-primary transition duration-200 ease-premium-out hover:-translate-y-0.5 hover:bg-paper">
                Submit Your Document <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-6 text-sm font-semibold text-white transition duration-200 ease-premium-out hover:-translate-y-0.5 hover:bg-white/10">
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
