"use client";

import { useMemo, useState } from "react";

const conditionNotes = {
  clean: "A stable draft is usually ready for a final proofreading sequence.",
  mixed: "Mixed language quality may need extra author-review time after tracked changes.",
  heavy: "Heavy sentence issues may mean editing is needed before final proofreading.",
};

export function DissertationPlanningEstimator() {
  const [wordCount, setWordCount] = useState("15000");
  const [condition, setCondition] = useState<keyof typeof conditionNotes>("mixed");
  const [references, setReferences] = useState(true);
  const [visuals, setVisuals] = useState(true);
  const [formatting, setFormatting] = useState(true);

  const guidance = useMemo(() => {
    const words = Number(wordCount) || 0;
    const items = [
      words > 50000
        ? "Request a custom review before payment because this is above the automatic pricing range."
        : "Use the pricing calculator for an initial estimate, then upload the stable file for verification.",
      words > 30000
        ? "Plan a staged review rather than a rushed single pass."
        : "Keep time for proofreading, author review, and final file export.",
      conditionNotes[condition],
    ];

    if (references) items.push("Reserve a separate pass for citation-reference matching and reference-list presentation.");
    if (visuals) items.push("Reserve a separate pass for tables, figures, captions, callouts, and list entries.");
    if (formatting) items.push("Attach university formatting rules and inspect the final PDF after Word fields are refreshed.");

    return items;
  }, [condition, formatting, references, visuals, wordCount]);

  return (
    <section className="mt-10 rounded-2xl border border-hairline bg-surface-soft p-6 sm:p-7">
      <h2 className="font-display text-3xl leading-tight text-ink">Dissertation proofreading planning estimator</h2>
      <p className="mt-3 text-sm leading-7 text-body">
        This tool gives planning considerations only. It does not publish guaranteed turnaround times because real scheduling depends on availability, scope, document condition, and business approval.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-ink">
          Word count
          <input
            value={wordCount}
            onChange={(event) => setWordCount(event.target.value)}
            inputMode="numeric"
            className="min-h-12 rounded-xl border border-hairline bg-canvas px-4 text-base font-normal text-ink outline-none transition focus:border-primary"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink">
          Draft condition
          <select
            value={condition}
            onChange={(event) => setCondition(event.target.value as keyof typeof conditionNotes)}
            className="min-h-12 rounded-xl border border-hairline bg-canvas px-4 text-base font-normal text-ink outline-none transition focus:border-primary"
          >
            <option value="clean">Stable final draft</option>
            <option value="mixed">Mixed language quality</option>
            <option value="heavy">Heavy sentence-level issues</option>
          </select>
        </label>
      </div>
      <div className="mt-5 grid gap-3 text-sm text-body sm:grid-cols-3">
        <label className="flex items-start gap-3 rounded-xl border border-hairline bg-canvas p-4">
          <input type="checkbox" checked={references} onChange={(event) => setReferences(event.target.checked)} className="mt-1" />
          References need checking
        </label>
        <label className="flex items-start gap-3 rounded-xl border border-hairline bg-canvas p-4">
          <input type="checkbox" checked={visuals} onChange={(event) => setVisuals(event.target.checked)} className="mt-1" />
          Tables or figures included
        </label>
        <label className="flex items-start gap-3 rounded-xl border border-hairline bg-canvas p-4">
          <input type="checkbox" checked={formatting} onChange={(event) => setFormatting(event.target.checked)} className="mt-1" />
          Formatting rules supplied
        </label>
      </div>
      <ul className="mt-6 grid gap-3 text-sm leading-7 text-body">
        {guidance.map((item) => (
          <li key={item} className="border-l border-primary/30 pl-4">{item}</li>
        ))}
      </ul>
    </section>
  );
}
