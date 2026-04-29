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
      <h2 className={`mt-5 font-display text-[clamp(2.15rem,4vw,4.05rem)] leading-[1.03] ${light ? "text-ivory" : "text-ink"}`}>{title}</h2>
      {body ? <p className={`mt-5 max-w-2xl text-base leading-7 ${light ? "text-ivory/66" : "text-charcoal/70"}`}>{body}</p> : null}
    </div>
  );
}
