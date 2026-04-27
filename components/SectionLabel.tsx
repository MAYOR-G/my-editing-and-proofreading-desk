type SectionLabelProps = {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

export function SectionLabel({ eyebrow, title, body, align = "left", tone = "dark" }: SectionLabelProps) {
  const light = tone === "light";

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`text-xs uppercase tracking-[0.32em] ${light ? "text-gold" : "text-gold-deep"}`}>{eyebrow}</p>
      <h2 className={`mt-5 font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.98] ${light ? "text-ivory" : "text-ink"}`}>{title}</h2>
      {body ? <p className={`mt-6 max-w-2xl text-lg leading-8 ${light ? "text-ivory/66" : "text-charcoal/70"}`}>{body}</p> : null}
    </div>
  );
}
