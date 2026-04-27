import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { AiRefinementVisual, ManuscriptSculpture, ServiceSystemVisual } from "@/components/EditorialVisuals";
import { SectionLabel } from "@/components/SectionLabel";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { editorStandards, faqs, processSteps, servicePages } from "@/lib/content";

/* ── Lazy-load heavy client components to cut initial JS by ~60% ── */
const IntroGate = dynamic(() => import("@/components/IntroGate").then(m => ({ default: m.IntroGate })), { ssr: false });
const ScrollSequence = dynamic(() => import("@/components/ScrollSequence").then(m => ({ default: m.ScrollSequence })), { ssr: false });
const AnimatedAccordion = dynamic(() => import("@/components/AnimatedAccordion").then(m => ({ default: m.AnimatedAccordion })));
const Reveal = dynamic(() => import("@/components/Reveal").then(m => ({ default: m.Reveal })));

const trustNotes = [
  {
    title: "Confidential by design",
    body: "Documents are treated as private work from the first upload to the completed delivery."
  },
  {
    title: "Editorial judgment first",
    body: "Each service is framed around clarity, structure, tone, and audience, not mechanical corrections alone."
  },
  {
    title: "A composed workflow",
    body: "Clients can move from upload to price, payment, tracking, and delivery without scattered email threads."
  },
  {
    title: "Serious work, calmly handled",
    body: "Academic, business, author, and personal documents all receive a polished, disciplined process."
  }
];

const testimonials = [
  {
    quote: "The process felt organized from the start. I uploaded my document, understood the next step, and received work that still sounded like me.",
    name: "Graduate researcher"
  },
  {
    quote: "The edits made our business profile sharper without making it sound overworked. It felt professional, calm, and precise.",
    name: "Business client"
  },
  {
    quote: "What stood out was the attention to flow. The final manuscript read cleaner, but the voice stayed intact.",
    name: "Independent author"
  }
];

const qualityMarks = ["Private uploads", "Clear pricing", "Secure checkout", "Dashboard delivery"];
const credibilityLoop = ["Academic manuscripts", "Business reports", "Dissertations", "Author drafts", "Translations", "Confidential files"];

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory">
      <IntroGate />
      <SiteHeader />
      <ScrollSequence />

      {/* ─── Corporate Editorial Section ─── */}
      <section className="relative overflow-hidden border-b border-ink/10 px-5 py-24 sm:px-8 lg:py-36">
        <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(176,138,60,0.075),transparent)]" aria-hidden="true" />
        <div className="absolute bottom-10 left-0 h-px w-1/3 bg-gradient-to-r from-gold/35 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-gold-deep">Corporate Editorial</p>
            <h2 className="mt-6 max-w-4xl font-display text-[clamp(3rem,6vw,7rem)] leading-[0.92] text-ink">
              Precision editing for businesses that demand excellence.
            </h2>
            <p className="mt-8 max-w-2xl text-xl font-light leading-9 text-charcoal/72">
              Elevate your corporate communications, technical documentation, and strategic reports with world-class editorial standards.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-6">
              <ManuscriptSculpture />
              <div className="grid gap-4 border-l border-gold/45 pl-6 sm:grid-cols-2">
                <p className="text-base font-light leading-8 text-charcoal/66">
                  Premium editorial presentation meets practical operational infrastructure: secure submission, clear pricing, and reliable turnaround for corporate teams.
                </p>
                <p className="text-base font-light leading-8 text-charcoal/62">
                  Our process focuses on clarity, structural integrity, and brand voice consistency—ensuring your final documents project absolute authority.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Core Services ─── */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:py-32">
        <div className="absolute right-0 top-20 h-px w-1/2 bg-gradient-to-l from-gold/30 to-transparent" aria-hidden="true" />
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_0.58fr] lg:items-end">
              <SectionLabel
                eyebrow="Core Services"
                title="Strategic editorial support tailored to your operations."
                body="Select the engagement model that fits your organization. Our platform handles everything from routine corporate proofing to comprehensive structural editing."
              />
              <div className="grid gap-5">
                <ServiceSystemVisual />
                <Link href="/services" className="inline-flex min-h-12 w-fit items-center justify-center border border-ink/15 px-7 text-sm text-ink transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98] lg:justify-self-end">
                  View all services
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 divide-y divide-ink/10 border-y border-ink/10">
            {servicePages.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.035}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid gap-6 py-8 transition duration-200 ease-premium-out hover:bg-paper md:grid-cols-[0.16fr_0.34fr_0.42fr_0.08fr] md:px-5"
                >
                  <span className="font-display text-5xl leading-none text-gold-deep">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.28em] text-charcoal/45">{service.eyebrow}</span>
                    <span className="mt-3 block font-display text-4xl leading-tight text-ink">{service.name}</span>
                  </span>
                  <span className="max-w-2xl text-base font-light leading-7 text-charcoal/66">{service.description}</span>
                  <span className="hidden items-center justify-end md:flex" aria-hidden="true">
                    <span className="h-px w-10 bg-ink/18 transition duration-200 ease-premium-out group-hover:w-16 group-hover:bg-gold" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Credibility Marquee ─── */}
      <section className="overflow-hidden border-b border-ink/10 bg-ivory py-8">
        <div className="flex w-max animate-[marquee_34s_linear_infinite] gap-4 px-4 text-xs uppercase tracking-[0.28em] text-charcoal/42 motion-reduce:animate-none">
          {[...credibilityLoop, ...credibilityLoop].map((item, index) => (
            <span key={`${item}-${index}`} className="border-y border-ink/10 px-6 py-4">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ─── Why Partner With Us (Dark) ─── */}
      <section className="relative overflow-hidden border-y border-ink/10 bg-ink px-5 py-24 text-ivory sm:px-8 lg:py-36">
        <Image
          src="/assets/brand.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-28"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,15,0.96)_0%,rgba(17,17,15,0.82)_42%,rgba(17,17,15,0.58)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <Reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-gold">Why partner with us</p>
              <h2 className="mt-6 max-w-3xl font-display text-[clamp(3rem,6vw,7rem)] leading-[0.92] text-ivory">
                The competitive edge is clarity.
              </h2>
              <p className="mt-8 max-w-2xl text-lg font-light leading-8 text-ivory/68">
                We provide a secure, streamlined environment for managing critical document lifecycles. Predictable quality, absolute confidentiality.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {trustNotes.map((note, index) => (
              <Reveal key={note.title} delay={index * 0.07}>
                <article className="group min-h-52 border border-ivory/12 bg-ivory/[0.075] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.16)] backdrop-blur-md transition duration-300 ease-premium-out hover:-translate-y-1 hover:border-gold/45 hover:bg-ivory/[0.105] hover:shadow-card-hover">
                  <span className="font-display text-4xl leading-none text-gold/70">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-7 font-display text-3xl leading-tight text-ivory">{note.title}</h3>
                  <p className="mt-4 text-sm font-light leading-7 text-ivory/62">{note.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Editor Standards ─── */}
      <section className="relative overflow-hidden border-y border-ink/5 bg-paper/30 px-5 py-20 sm:px-8 lg:py-32">
        <div className="absolute left-0 top-1/4 h-px w-1/4 bg-gradient-to-r from-gold/20 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 right-10 h-3/4 w-px bg-gradient-to-t from-gold/15 to-transparent" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <SectionLabel
              eyebrow="Editor standard"
              title="Quiet rigor behind every file."
              body="The standard is not louder editing. It is better judgment: what to change, what to preserve, and how to make the document feel ready."
            />
            <Link href="/editors" className="mt-8 inline-flex min-h-12 items-center border border-ink/15 px-7 text-sm text-ink transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98]">
              Meet the standard
            </Link>
            {/* Editorial decorative element */}
            <div className="mt-10 hidden lg:block" aria-hidden="true">
              <svg viewBox="0 0 120 100" className="h-24 w-32 text-gold-deep/20">
                <path d="M10 80 C 30 20, 50 20, 70 50 S 100 80, 110 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="editorial-ink-draw" />
                <circle cx="110" cy="30" r="3" fill="currentColor" opacity="0.5" className="editorial-pulse" />
              </svg>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {editorStandards.map((standard, index) => (
              <Reveal key={standard.title} delay={index * 0.05}>
                <article className="group min-h-72 border border-ink/10 bg-ivory p-7 transition duration-200 ease-premium-out hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-[0_20px_70px_rgba(17,17,15,0.06)]">
                  <span className="font-display text-5xl text-gold-deep">{index + 1}</span>
                  <h3 className="mt-8 font-display text-3xl leading-tight text-ink">{standard.title}</h3>
                  <p className="mt-5 text-sm font-light leading-6 text-charcoal/64">{standard.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI Editing Suite ─── */}
      <section className="relative overflow-hidden border-y border-ink/10 bg-ivory px-5 py-20 sm:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(176,138,60,0.035),transparent_40%)]" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden border border-ink/10 bg-ink p-8 text-ivory shadow-[0_30px_100px_rgba(17,17,15,0.16)] sm:p-10 lg:p-12">
              <div className="absolute right-0 top-0 h-40 w-40 border-b border-l border-gold/20" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 h-px w-3/4 bg-gradient-to-r from-gold/45 to-transparent" aria-hidden="true" />
              <p className="text-xs uppercase tracking-[0.32em] text-gold">AI Editing Suite</p>
              <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.8rem,6vw,6.25rem)] leading-[0.92] text-ivory">
                Rapid drafts refined by intelligent models.
              </h2>
              <p className="mt-7 max-w-2xl text-base font-light leading-8 text-ivory/68">
                Run internal drafts through our custom AI editing suite to eliminate obvious friction points, saving time before passing documents to human editorial review. This strictly focuses on structural editing, not formatting.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/ai-editing-tool" className="inline-flex min-h-12 items-center justify-center bg-gold px-7 text-sm text-ink transition duration-200 ease-premium-out hover:bg-ivory active:scale-[0.98]">
                  Open AI Editing Tool
                </Link>
                <Link href="/login" className="inline-flex min-h-12 items-center justify-center border border-ivory/16 px-7 text-sm text-ivory transition duration-200 ease-premium-out hover:border-gold hover:text-gold active:scale-[0.98]">
                  Upload for human review
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-5">
              <AiRefinementVisual compact />
              {[
                ["Strictly Editing", "Our AI models are optimized exclusively for structural and line editing, improving clarity and tone without altering your core message."],
                ["Enterprise Scale", "Process high-volume internal communications in seconds before routing to stakeholders."],
                ["Security First", "Your proprietary data is protected. AI uploads run through secure, stateless environments without retaining data for model training."]
              ].map(([title, body]) => (
                <article key={title} className="group border-t border-ink/10 py-6 transition duration-200 ease-premium-out hover:pl-2">
                  <h3 className="font-display text-3xl leading-tight text-ink transition duration-200 group-hover:text-gold-deep">{title}</h3>
                  <p className="mt-3 max-w-2xl text-base font-light leading-7 text-charcoal/64">{body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Workflow Operations ─── */}
      <section className="relative overflow-hidden border-y border-ink/10 bg-paper px-5 py-24 sm:px-8 lg:py-36">
        <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(176,138,60,0.10),transparent)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionLabel
                eyebrow="Workflow Operations"
                title="A frictionless path from upload to delivery."
                body="Our platform handles the logistics—file securely uploaded, transparent quoting, automated tracking, and centralized team delivery."
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link href="/login" className="inline-flex min-h-12 items-center justify-center bg-ink px-7 text-sm text-ivory transition duration-200 ease-premium-out hover:bg-gold-deep active:scale-[0.98]">
                  Start upload
                </Link>
                <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center border border-ink/15 px-7 text-sm text-ink transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98]">
                  Review pricing
                </Link>
              </div>
            </div>
          </Reveal>
          <div className="relative grid gap-4">
            <div className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-gold via-ink/12 to-transparent md:block" aria-hidden="true" />
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.11}>
                <article className="relative grid gap-5 border border-ink/10 bg-ivory/92 p-6 shadow-[0_20px_80px_rgba(17,17,15,0.055)] backdrop-blur-sm transition duration-300 ease-premium-out hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-card-hover md:grid-cols-[4.5rem_1fr] md:p-7">
                  <div className="relative z-10 grid h-14 w-14 place-items-center border border-gold/35 bg-paper font-display text-2xl text-gold-deep shadow-[0_12px_40px_rgba(176,138,60,0.10)]">
                    {step.label}
                  </div>
                  <div>
                    <h3 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.98] text-ink">{step.title}</h3>
                    <p className="mt-4 max-w-2xl text-base font-light leading-7 text-charcoal/65">{step.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Security & Testimonials ─── */}
      <section className="relative overflow-hidden px-5 py-24 sm:px-8 lg:py-36">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fffdf7_0%,#f8f4ec_48%,#fffdf7_100%)]" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <SectionLabel
                eyebrow="Security & Trust"
                title="Enterprise-grade confidentiality."
                body="Your intellectual property is our priority. We enforce strict data handling policies, secure payment gateways, and encrypted project delivery for all clients."
              />
              <div className="grid grid-cols-2 gap-3 text-sm text-charcoal/64 sm:grid-cols-4 lg:justify-self-end">
                {qualityMarks.map((mark) => (
                  <span key={mark} className="border-y border-ink/10 bg-ivory/70 px-3 py-4 text-center shadow-[0_12px_40px_rgba(17,17,15,0.035)] transition duration-200 hover:border-gold/30 hover:shadow-gold-glow">{mark}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-5 lg:grid-cols-[1.1fr_0.9fr_1.1fr]">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.06}>
                <figure className={`group border border-ink/10 bg-ivory p-7 shadow-[0_22px_80px_rgba(17,17,15,0.06)] transition duration-300 ease-premium-out hover:-translate-y-1 hover:shadow-card-hover ${index === 1 ? "lg:mt-14" : ""}`}>
                  {/* Quote mark */}
                  <svg viewBox="0 0 24 24" className="mb-4 h-6 w-6 text-gold/40" aria-hidden="true">
                    <path fill="currentColor" d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                  <blockquote className="font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-tight text-ink">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                  <figcaption className="mt-10 border-t border-ink/10 pt-5 text-xs uppercase tracking-[0.24em] text-gold-deep">{testimonial.name}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section className="border-y border-ink/10 bg-paper px-5 py-20 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <SectionLabel eyebrow="FAQ" title="Clear answers before the first document." />
            <Link href="/faq" className="mt-8 inline-flex min-h-12 items-center border border-ink/15 px-7 text-sm text-ink transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98]">
              Visit FAQ
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <AnimatedAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="relative overflow-hidden px-5 py-24 sm:px-8 lg:py-36">
        <div className="absolute right-0 top-0 h-[80%] w-[40%] bg-[radial-gradient(ellipse_at_top_right,rgba(176,138,60,0.04),transparent_60%)]" aria-hidden="true" />
        <div className="absolute bottom-20 left-0 h-px w-1/3 bg-gradient-to-r from-gold/25 to-transparent" aria-hidden="true" />
        <Reveal>
          <div className="relative mx-auto grid max-w-7xl gap-12 overflow-hidden border border-ink/10 bg-ivory p-8 shadow-[0_28px_100px_rgba(17,17,15,0.055)] sm:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:p-16">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-gold-deep">Initiate Engagement</p>
              <h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,6rem)] leading-[0.94] text-ink">
                Secure your corporate communications today.
              </h2>
            </div>
            <div className="self-end">
              <p className="text-lg font-light leading-8 text-charcoal/68">
                Establish an account, upload your documents to our secure platform, and receive a transparent quote within hours.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/login" className="inline-flex min-h-12 items-center justify-center bg-ink px-7 text-sm text-ivory transition duration-200 ease-premium-out hover:bg-gold-deep active:scale-[0.98]">
                  Login or start project
                </Link>
                <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center border border-ink/15 px-7 text-sm text-ink transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98]">
                  Understand pricing
                </Link>
              </div>
              {/* Responsive action flow - visible on all screens */}
              <div className="mt-10 grid grid-cols-4 gap-3" aria-hidden="true">
                {["Upload", "Price", "Pay", "Deliver"].map((item, index) => (
                  <div key={item} className="flex flex-col items-center gap-2 editorial-drift" style={{ animationDelay: `${index * 0.3}s` }}>
                    <span className="grid h-8 w-8 place-items-center border border-gold/35 bg-paper text-xs font-display text-gold-deep">{index + 1}</span>
                    <span className="text-[0.6rem] uppercase tracking-[0.2em] text-charcoal/45">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
