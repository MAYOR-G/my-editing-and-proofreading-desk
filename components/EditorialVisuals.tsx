type VisualTone = "light" | "dark";

const lineWidths = ["w-11/12", "w-8/12", "w-10/12", "w-7/12", "w-9/12"];
const shortLines = ["w-8/12", "w-10/12", "w-6/12", "w-9/12"];

function TextLines({ tone = "light", count = 5 }: { tone?: VisualTone; count?: number }) {
  const lineTone = tone === "dark" ? "bg-ivory/30" : "bg-ink/[0.13]";

  return (
    <div className="grid gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={`block h-px ${lineWidths[index % lineWidths.length]} ${lineTone}`}
        />
      ))}
    </div>
  );
}

import Image from "next/image";

export function ManuscriptSculpture({ tone = "light" }: { tone?: VisualTone }) {
  const surface = tone === "dark" ? "border-ivory/14 bg-ivory/[0.075]" : "border-ink/10 bg-paper/78";

  return (
    <div className={`relative min-h-[28rem] overflow-hidden border ${surface} p-3 shadow-[0_30px_100px_rgba(17,17,15,0.08)]`}>
      <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" aria-hidden="true" />
      <div className="relative h-full min-h-[26.5rem] w-full overflow-hidden border border-ink/10">
        <Image
          src="/assets/premium_desk.png"
          alt="Premium Editorial Desk"
          fill
          className="object-cover transition-transform duration-[15s] ease-linear hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(17,17,15,0.6)_100%)]" aria-hidden="true" />
        <div className="absolute bottom-6 left-6 grid gap-2">
          <span className="border border-gold/35 bg-ink/70 px-4 py-2 text-xs uppercase tracking-[0.24em] text-gold backdrop-blur-md">
            Executive Desk
          </span>
        </div>
      </div>
    </div>
  );
}

export function HeroEditorialVisual({ label = "Editorial desk" }: { label?: string }) {
  return (
    <div className="relative min-h-[23rem] overflow-hidden border border-ink/10 bg-paper/78 p-6 shadow-[0_30px_100px_rgba(17,17,15,0.055)] sm:min-h-[26rem]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(176,138,60,0.16),transparent_32%),linear-gradient(135deg,rgba(255,253,247,0.9),rgba(238,230,218,0.72))]" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(17,17,15,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,15,0.12)_1px,transparent_1px)] [background-size:38px_38px]" aria-hidden="true" />
      <div className="absolute inset-x-7 top-7 flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-ink/10" />
        <span className="text-xs uppercase tracking-[0.26em] text-gold-deep">{label}</span>
      </div>

      <div className="relative mx-auto mt-14 h-[18rem] max-w-[30rem] [perspective:1200px] sm:mt-16 sm:h-[20rem]">
        <div className="absolute left-1/2 top-[52%] h-40 w-72 -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] border border-gold/25 bg-gold/[0.055] shadow-[0_24px_80px_rgba(176,138,60,0.10)]" aria-hidden="true" />
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="absolute left-1/2 top-1/2 w-[68%] border border-ink/10 bg-ivory p-5 shadow-[0_20px_80px_rgba(17,17,15,0.075)] editorial-float"
            style={{
              transform: `translate(-50%, -50%) rotateX(57deg) rotateZ(${-13 + item * 8}deg) translate3d(${(item - 1) * 28}px, ${item * 18}px, ${item * 26}px)`,
              animationDelay: `${item * 0.32}s`
            }}
          >
            <div className="mb-5 flex items-center justify-between border-b border-ink/10 pb-4">
              <span className="h-px w-14 bg-gold/50" />
              <span className="text-[0.62rem] uppercase tracking-[0.24em] text-charcoal/42">{item === 0 ? "Draft" : item === 1 ? "Proof" : "Final"}</span>
            </div>
            <TextLines count={5} />
            <div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-5">
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 10 }).map((_, index) => (
                  <span key={index} className={`${index % 4 === 0 ? "bg-gold/42" : "bg-ink/10"} h-px`} />
                ))}
              </div>
              <span className="font-display text-3xl leading-none text-gold-deep/55">{item + 1}</span>
            </div>
          </div>
        ))}

        <svg viewBox="0 0 360 190" className="pointer-events-none absolute inset-x-0 bottom-2 mx-auto h-48 w-full max-w-[27rem] text-gold-deep" aria-hidden="true">
          <path
            d="M22 140 C 70 98, 97 153, 139 116 S 205 72, 251 104 S 302 136, 338 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="editorial-ink-draw"
          />
          <path d="M262 53 338 64 290 124" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.42" />
        </svg>

        <div className="absolute left-3 top-20 grid gap-3 text-xs uppercase tracking-[0.22em] text-charcoal/42 sm:left-6" aria-hidden="true">
          {["clarity", "tone", "structure"].map((item, index) => (
            <span key={item} className="flex items-center gap-3 editorial-drift" style={{ animationDelay: `${index * 0.32}s` }}>
              <span className="h-2 w-2 bg-gold" />
              {item}
            </span>
          ))}
        </div>

        <div className="absolute right-5 top-16 grid h-16 w-16 place-items-center border border-ink/10 bg-ivory/70 shadow-[0_14px_50px_rgba(17,17,15,0.055)]" aria-hidden="true">
          <svg viewBox="0 0 48 48" className="h-8 w-8 text-gold-deep">
            <path d="M13 27.5 20.5 35 36 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-7 left-7 right-7 grid grid-cols-[1fr_auto] items-end gap-5" aria-hidden="true">
        <div className="grid gap-2">
          {shortLines.map((line, index) => (
            <span key={index} className={`h-px ${line} bg-ink/10 editorial-line-shift`} style={{ animationDelay: `${index * 0.18}s` }} />
          ))}
        </div>
        <span className="grid h-14 w-14 place-items-center border border-gold/35 bg-ivory font-display text-xl text-ink">Edit</span>
      </div>
    </div>
  );
}

export function ServiceSystemVisual() {
  return (
    <div className="relative min-h-[22rem] overflow-hidden border border-ink/10 bg-paper/80 p-6 shadow-[0_28px_90px_rgba(17,17,15,0.055)]">
      <div className="absolute inset-6 border border-ink/10" aria-hidden="true" />
      <div className="absolute left-10 top-10 h-[72%] w-px bg-gradient-to-b from-gold via-ink/18 to-transparent" aria-hidden="true" />
      <div className="relative ml-8 grid gap-4">
        {["Proofread", "Edit", "Format", "Translate"].map((item, index) => (
          <div key={item} className="grid grid-cols-[2.5rem_1fr] items-center gap-4">
            <span className="grid h-10 w-10 place-items-center border border-gold/35 bg-ivory font-display text-xl text-gold-deep">
              {index + 1}
            </span>
            <div className="border border-ink/10 bg-ivory/78 p-4 transition duration-200 ease-premium-out hover:-translate-y-0.5 hover:border-gold/45 hover:bg-ivory">
              <div className="flex items-center justify-between gap-4">
                <span className="font-display text-2xl leading-none text-ink">{item}</span>
                <span className="h-px w-16 bg-gold/45" />
              </div>
              <div className="mt-4 grid gap-2">
                {shortLines.map((line, lineIndex) => (
                  <span key={lineIndex} className={`h-px ${line} bg-ink/10 editorial-line-shift`} style={{ animationDelay: `${(index + lineIndex) * 0.22}s` }} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-7 right-7 flex items-end gap-2" aria-hidden="true">
        {[5, 8, 12, 7, 10].map((height, index) => (
          <span key={index} className="w-2 bg-gold/35" style={{ height: `${height * 0.55}rem` }} />
        ))}
      </div>
    </div>
  );
}

export function ActionFlowVisual() {
  return (
    <div className="relative hidden min-h-[24rem] overflow-hidden border-l border-gold/20 pl-6 xl:block" aria-hidden="true">
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gold/35 to-transparent" />
      {["Upload", "Price", "Pay", "Deliver"].map((item, index) => (
        <div key={item} className="relative mb-5 grid grid-cols-[1.75rem_1fr] items-center gap-4 editorial-drift" style={{ animationDelay: `${index * 0.3}s` }}>
          <span className="h-2.5 w-2.5 bg-gold" />
          <span className="border-y border-ink/10 py-3 text-xs uppercase tracking-[0.24em] text-charcoal/48">{item}</span>
        </div>
      ))}
      <div className="mt-8 grid gap-2">
        {Array.from({ length: 7 }).map((_, index) => (
          <span key={index} className={`${lineWidths[index % lineWidths.length]} h-px bg-ink/10`} />
        ))}
      </div>
    </div>
  );
}

export function CareVisual() {
  return (
    <div className="relative min-h-[26rem] overflow-hidden border border-ink/10 bg-paper p-7 shadow-[0_28px_90px_rgba(17,17,15,0.055)]">
      <div className="absolute left-8 right-8 top-8 flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-ink/12" />
        <span className="text-xs uppercase tracking-[0.28em] text-gold-deep">Confidential handling</span>
        <span className="h-px flex-1 bg-ink/12" />
      </div>
      <div className="relative mx-auto mt-20 max-w-[25rem]">
        <div className="relative z-10 editorial-float border border-ink/10 bg-ivory p-6 shadow-[0_24px_80px_rgba(17,17,15,0.075)]">
          <div className="flex items-center justify-between border-b border-ink/10 pb-5">
            <span className="font-display text-3xl leading-none text-ink">Ready</span>
            <span className="border border-gold/35 px-3 py-2 text-xs uppercase tracking-[0.2em] text-gold-deep">Private</span>
          </div>
          <div className="mt-7 grid gap-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <span key={index} className={`h-px ${lineWidths[index % lineWidths.length]} bg-ink/[0.11]`} />
            ))}
          </div>
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-gold/45" />
            <span className="h-10 w-10 border border-gold/35 bg-paper" />
          </div>
        </div>
        <div className="absolute -bottom-8 left-8 right-8 z-0 h-20 border border-ink/10 bg-ivory/70" aria-hidden="true" />
      </div>
    </div>
  );
}

export function AiRefinementVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden border border-ivory/12 bg-ink p-5 text-ivory shadow-[0_30px_110px_rgba(0,0,0,0.20)] backdrop-blur-sm ${compact ? "min-h-[21rem]" : "min-h-[31rem] sm:p-7"}`}>
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(176,138,60,0.10),transparent)] editorial-scan" aria-hidden="true" />
      <div className="relative grid gap-5">
        <div className="flex items-center justify-between border-b border-ivory/12 pb-4">
          <span className="text-xs uppercase tracking-[0.28em] text-gold">Raw Draft</span>
          <span className="text-xs uppercase tracking-[0.28em] text-ivory/38">AI Refined</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-ivory/10 bg-ink/20 p-5 text-sm font-light leading-relaxed text-ivory/60">
            <span className="bg-red-900/30 text-red-200 line-through">We are currently in the process of attempting to optimize</span> the system <span className="bg-red-900/30 text-red-200 line-through">so that we can</span> improve performance. <span className="bg-red-900/30 text-red-200 line-through">It is our belief that</span> these changes will <span className="bg-red-900/30 text-red-200 line-through">have a major impact on the overall</span> speed.
          </div>
          <div className="border border-gold/25 bg-ivory/[0.075] p-5 text-sm font-light leading-relaxed text-ivory">
            <span className="bg-green-900/40 text-green-300">We are optimizing</span> the system <span className="bg-green-900/40 text-green-300">to</span> improve performance. <span className="bg-green-900/40 text-green-300">We believe</span> these changes will <span className="bg-green-900/40 text-green-300">significantly accelerate</span> speed.
          </div>
        </div>
        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          {["Clarity", "Tone", "Flow"].map((item, index) => (
            <span key={item} className="border-y border-ivory/12 py-4 text-center text-xs uppercase tracking-[0.24em] text-ivory/54 editorial-pulse" style={{ animationDelay: `${index * 0.35}s` }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactVisual() {
  return (
    <div className="relative min-h-[25rem] overflow-hidden border border-ink/10 bg-paper p-7 shadow-[0_28px_90px_rgba(17,17,15,0.055)]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" aria-hidden="true" />
      <div className="absolute inset-x-7 top-7 flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-ink/20" />
        <span className="text-xs uppercase tracking-[0.26em] text-gold-deep">Secure Comm Channel</span>
      </div>
      <div className="relative mx-auto mt-16 max-w-[25rem] border border-ink/10 bg-ivory p-6 shadow-[0_24px_80px_rgba(17,17,15,0.07)] editorial-float">
        <div className="flex items-center gap-4 border-b border-ink/10 pb-4">
          <div className="h-10 w-10 border border-gold/30 bg-ink/5 flex items-center justify-center text-gold-deep">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-ink">Encrypted Connection</div>
            <div className="text-xs text-charcoal/50">End-to-end security</div>
          </div>
        </div>
        <div className="mt-6 grid gap-3">
          <div className="h-2 w-3/4 bg-ink/10" />
          <div className="h-2 w-full bg-ink/5" />
          <div className="h-2 w-5/6 bg-ink/5" />
          <div className="h-2 w-4/6 bg-ink/5" />
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-5">
          <span className="text-xs uppercase tracking-[0.24em] text-charcoal/45">Response path</span>
          <span className="h-px w-16 bg-gold/50" />
        </div>
      </div>
    </div>
  );
}

export function FaqVisual() {
  return (
    <div className="relative min-h-[25rem] overflow-hidden border border-ink/10 bg-ivory/50 p-7 shadow-[0_28px_90px_rgba(17,17,15,0.055)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(176,138,60,0.08),transparent_50%)]" aria-hidden="true" />
      <div className="relative mx-auto mt-10 grid gap-6 max-w-[28rem]">
        {[
          { q: "How long does editing take?", a: "Standard turnaround is 48 hours for up to 5,000 words.", delay: 0 },
          { q: "Is my document secure?", a: "Yes, all files are encrypted and automatically deleted after 30 days.", delay: 0.15 },
          { q: "Do you offer formatting?", a: "We support APA, MLA, Chicago, and custom academic formats.", delay: 0.3 }
        ].map((faq, index) => (
          <div key={index} className="border border-ink/10 bg-paper p-5 shadow-sm editorial-drift" style={{ animationDelay: `${faq.delay}s` }}>
            <div className="flex gap-4">
              <span className="text-gold-deep font-display text-xl leading-none">Q</span>
              <p className="text-sm text-ink">{faq.q}</p>
            </div>
            <div className="mt-3 flex gap-4 border-t border-ink/5 pt-3">
              <span className="text-charcoal/40 font-display text-xl leading-none">A</span>
              <p className="text-xs text-charcoal/60 leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PricingVisual() {
  return (
    <div className="relative min-h-[25rem] overflow-hidden border border-ink/10 bg-ink p-7 shadow-[0_28px_90px_rgba(17,17,15,0.055)] text-ivory">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(176,138,60,0.1),transparent_40%)]" aria-hidden="true" />
      
      <div className="absolute inset-x-7 top-7 flex items-center justify-between" aria-hidden="true">
        <span className="text-xs uppercase tracking-[0.26em] text-gold">Transparent Billing</span>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-gold/50">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15V9m0 0l-3 3m3-3l3 3M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
        </svg>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-[26rem] gap-4">
        <div className="border border-ivory/20 bg-ivory/5 p-6 backdrop-blur-md editorial-float">
          <div className="flex justify-between items-end border-b border-ivory/10 pb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-ivory/50">Order Summary</div>
              <div className="text-xl font-display text-ivory mt-1">Research Manuscript</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-display text-gold">$125.00</div>
            </div>
          </div>
          
          <div className="mt-5 grid gap-3 text-sm text-ivory/70">
            <div className="flex justify-between">
              <span>Word Count</span>
              <span className="text-ivory">4,250 words</span>
            </div>
            <div className="flex justify-between">
              <span>Service Type</span>
              <span className="text-ivory">Academic Editing</span>
            </div>
            <div className="flex justify-between">
              <span>Turnaround</span>
              <span className="text-ivory">48 Hours</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-ivory/10 pt-4">
            <span className="text-xs text-ivory/40">Secured payment</span>
            <div className="flex gap-2">
              <span className="h-6 w-10 rounded bg-ivory/10" />
              <span className="h-6 w-10 rounded bg-ivory/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
