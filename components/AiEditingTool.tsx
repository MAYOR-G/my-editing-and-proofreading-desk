"use client";

import Link from "next/link";
import { ClipboardPenLine, FileUp, ShieldCheck, Sparkles, UploadCloud } from "lucide-react";
import { FormEvent, useMemo, useRef, useState } from "react";
import {
  AI_ALLOWED_EXTENSIONS,
  AI_FILE_SIZE_LIMIT,
  AI_WORD_LIMIT,
  countWords,
  isAllowedAiFile,
} from "@/lib/ai-editing";

type InputMode = "paste" | "upload";
type Status = "idle" | "processing" | "ready" | "error" | "rate-limited";
type InputOption = [InputMode, string, string, typeof ClipboardPenLine];

type AiResult = {
  originalText: string;
  editedText: string;
  highlights: string[];
  suggestions?: string[];
  meta?: {
    remainingToday?: number;
    wordCount?: number;
  };
};
type DiffSegment = { type: "same" | "delete" | "insert"; text: string };

const trustStrip = ["1,000-word cost cap", "Server validation", "Human review available", "No replacement for editors", "Professional AI review"];
const inputOptions: InputOption[] = [
  ["paste", "Paste Text", "Best for passages, abstracts, letters, and short sections.", ClipboardPenLine],
  ["upload", "Upload Document", "Use .txt or .docx for the AI trial; legacy .doc goes through full review.", FileUp]
];

function statusMessage(status: Status) {
  if (status === "processing") return "Preparing a careful first-pass edit...";
  if (status === "rate-limited") return "The trial limit is protecting service quality and cost.";
  if (status === "error") return "The request needs attention before it can continue.";
  if (status === "ready") return "AI first-pass result ready for review.";
  return "Ready for a short, focused passage.";
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Invalid file result."));
        return;
      }
      resolve(result.split(",")[1] || "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function tokenizeForDiff(value: string) {
  return value.match(/\S+\s*/g) ?? [];
}

function diffWords(original: string, edited: string): DiffSegment[] {
  const a = tokenizeForDiff(original);
  const b = tokenizeForDiff(edited);
  const dp = Array.from({ length: a.length + 1 }, () => Array<number>(b.length + 1).fill(0));

  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      dp[i][j] = a[i].trim() === b[j].trim() ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const segments: DiffSegment[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i].trim() === b[j].trim()) {
      segments.push({ type: "same", text: b[j] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      segments.push({ type: "delete", text: a[i] });
      i++;
    } else {
      segments.push({ type: "insert", text: b[j] });
      j++;
    }
  }
  while (i < a.length) segments.push({ type: "delete", text: a[i++] });
  while (j < b.length) segments.push({ type: "insert", text: b[j++] });

  return segments.reduce<DiffSegment[]>((merged, segment) => {
    const last = merged[merged.length - 1];
    if (last?.type === segment.type) last.text += segment.text;
    else merged.push({ ...segment });
    return merged;
  }, []);
}

export function AiEditingTool() {
  const [inputMode, setInputMode] = useState<InputMode>("paste");
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<AiResult | null>(null);
  const [viewMode, setViewMode] = useState<"edited" | "final">("edited");
  const resultRef = useRef<HTMLDivElement | null>(null);

  const wordCount = useMemo(() => countWords(text), [text]);
  const overLimit = wordCount > AI_WORD_LIMIT;
  const empty = wordCount === 0;
  const remainingWords = Math.max(0, AI_WORD_LIMIT - wordCount);
  const canSubmit = !empty && !overLimit && status !== "processing";
  const diffSegments = useMemo(() => result ? diffWords(result.originalText || text, result.editedText) : [], [result, text]);

  async function handleUpload(file: File | undefined) {
    setFileError("");
    setResult(null);
    setFileName("");

    if (!file) return;

    if (!isAllowedAiFile(file.name)) {
      setFileError(`Unsupported file. Use ${AI_ALLOWED_EXTENSIONS.join(", ")} or paste text directly.`);
      setText("");
      return;
    }

    if (file.size > AI_FILE_SIZE_LIMIT) {
      setFileError(`This AI trial accepts files up to ${Math.round(AI_FILE_SIZE_LIMIT / 1024)}KB. Submit larger files for full professional review.`);
      setText("");
      return;
    }

    setFileName(file.name);

    setStatus("processing");
    setMessage("Extracting readable text and checking the 1,000-word cap.");

    try {
      const base64 = await fileToBase64(file);
      const response = await fetch("/api/ai-edit/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, base64 })
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setFileError(typeof data.error === "string" ? data.error : "The file could not be read.");
        if (typeof data.text === "string") {
          setText(data.text);
        } else {
          setText("");
        }
        return;
      }

      setText(data.text);
      setStatus("idle");
      setMessage("File loaded. Review the extracted text, then request an AI edit.");
    } catch {
      setStatus("error");
      setFileError("The file could not be read. Paste the passage or submit the full document for professional review.");
      return;
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);
    setMessage("");

    if (empty) {
      setStatus("error");
      setMessage("Add text or upload a .txt file before requesting an AI edit.");
      return;
    }

    if (overLimit) {
      setStatus("error");
      setMessage(`Reduce the passage to ${AI_WORD_LIMIT.toLocaleString()} words or less. You are currently at ${wordCount.toLocaleString()} words.`);
      return;
    }

    setStatus("processing");
    setMessage("Running a short, cost-controlled editorial pass.");

    try {
      const response = await fetch("/api/ai-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, source: inputMode, signedIn: false })
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(response.status === 429 ? "rate-limited" : "error");
        setMessage(typeof data.error === "string" ? data.error : "AI editing is temporarily unavailable. Please try again shortly or submit your document for human review.");
        return;
      }

      setResult(data);
      setViewMode("edited");
      setStatus("ready");
      setMessage("AI edit complete. Review the tracked changes, then open the clean final version.");
      window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    } catch {
      setStatus("error");
      setMessage("AI editing is temporarily unavailable. Please try again shortly or submit your document for human review.");
    }
  }

  async function copyResult() {
    if (!result?.editedText) return;
    await navigator.clipboard.writeText(result.editedText);
    setMessage("Edited text copied.");
  }

  function downloadResult() {
    if (!result?.editedText) return;
    const blob = new Blob([result.editedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mep-ai-edited-text.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-14">
      <section id="try-tool" className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr]">
        <aside className="rounded-[1.35rem] border border-hairline bg-[#fffdf7] p-7 text-ink shadow-[0_28px_90px_rgba(17,17,15,0.06)] sm:p-9 lg:sticky lg:top-28 lg:self-start">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <p className="mt-5 text-xs uppercase tracking-[0.28em] text-primary">AI-assisted first pass</p>
          <h2 className="mt-4 font-display text-[clamp(2.35rem,4vw,4.7rem)] leading-[0.95]">Quick suggestions, clearly bounded.</h2>
          <p className="mt-6 text-base leading-8 text-body">
            Paste text or upload a short document for fast suggestions on grammar, clarity, tone, and flow. This tool is useful for early cleanup, but it does not replace expert human editing for academic, legal, business, or high-stakes documents.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-body">
            {[
              ["Limit", `${AI_WORD_LIMIT.toLocaleString()} words maximum`],
              ["Anonymous use", "Limited daily tries"],
              ["Cost control", "Short prompts and capped output"],
              ["Review style", "AI-assisted editing"]
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-5 border-t border-hairline pt-3">
                <span>{label}</span>
                <span className="text-right text-ink">{value}</span>
              </div>
            ))}
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="overflow-hidden rounded-[1.35rem] border border-hairline bg-[#fffdf7] shadow-[0_24px_90px_rgba(17,17,15,0.08)]">
          <div className="border-b border-ink/10 bg-white/60 p-5 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-primary">Try Free AI Editor</p>
                <h3 className="mt-3 font-display text-4xl leading-none text-ink">Start with your text.</h3>
              </div>
              <p className="max-w-sm text-sm leading-6 text-charcoal/60">Use the tabs to paste directly or extract text from a short document.</p>
            </div>
            <div className="mt-6 grid gap-2 rounded-full border border-ink/10 bg-paper/70 p-1.5 sm:grid-cols-2">
              {inputOptions.map(([id, label, body, Icon]) => {
                const active = inputMode === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setInputMode(id as InputMode);
                      setResult(null);
                      setMessage("");
                    }}
                    className={`min-h-16 rounded-full px-5 text-left transition duration-200 ease-premium-out active:scale-[0.99] ${
                      active ? "bg-primary text-white shadow-[0_12px_30px_rgba(23,74,124,0.18)]" : "text-charcoal/66 hover:bg-white hover:text-ink"
                    }`}
                    aria-pressed={active}
                  >
                    <span className="flex items-center gap-2 text-sm font-bold">
                      <Icon className="h-4 w-4" />
                      {label}
                    </span>
                    <span className={`mt-1 hidden text-xs leading-5 sm:block ${active ? "text-white/75" : "text-charcoal/54"}`}>{body}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-0 xl:grid-cols-[1fr_18rem]">
            <section className="p-5 sm:p-7">
              {inputMode === "upload" ? (
                <div className="mb-5">
                  <label className="group block rounded-2xl border border-dashed border-primary/30 bg-primary/[0.035] p-6 text-center transition duration-200 ease-premium-out hover:border-primary hover:bg-primary/[0.06]">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-sm transition group-hover:scale-105">
                      <UploadCloud className="h-6 w-6" />
                    </span>
                    <span className="mt-4 block font-display text-3xl leading-tight text-ink">Upload a short document</span>
                    <span className="mx-auto mt-3 block max-w-xl text-sm leading-6 text-charcoal/60">
                      Allowed: .txt, .docx for extraction. Legacy .doc is routed to full review. Trial size cap: {Math.round(AI_FILE_SIZE_LIMIT / 1024)}KB.
                    </span>
                    <input
                      type="file"
                      accept={AI_ALLOWED_EXTENSIONS.join(",")}
                      onChange={(event) => handleUpload(event.target.files?.[0])}
                      className="sr-only"
                    />
                    <span className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition group-hover:bg-primary">Choose file</span>
                  </label>
                  {fileName ? <p className="mt-3 text-sm text-charcoal/62">Selected: <span className="text-ink">{fileName}</span></p> : null}
                  {fileError ? <p className="mt-3 rounded-lg border border-gold/35 bg-gold/10 p-3 text-sm leading-6 text-ink">{fileError}</p> : null}
                </div>
              ) : null}

              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <label htmlFor="ai-input" className="text-xs uppercase tracking-[0.28em] text-gold-deep">
                  Your text
                </label>
                <span className="text-xs text-charcoal/48">Paste up to {AI_WORD_LIMIT.toLocaleString()} words for a focused first pass.</span>
              </div>
              <textarea
                id="ai-input"
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                  setResult(null);
                  setStatus("idle");
                  setMessage("");
                }}
                placeholder="Paste up to 1,000 words for a fast AI-assisted editorial pass..."
                className="mt-4 min-h-[24rem] w-full resize-y rounded-2xl border border-ink/10 bg-white p-5 text-base leading-8 text-ink shadow-inner placeholder:text-charcoal/38 transition duration-200 ease-premium-out focus:border-primary focus:bg-ivory"
              />
            </section>

            <aside className="border-t border-ink/10 bg-paper/75 p-5 sm:p-7 xl:border-l xl:border-t-0">
              <p className="text-xs uppercase tracking-[0.28em] text-primary">Validation</p>
              <div className="mt-5 border-y border-ink/10 py-5">
                <p className={`font-display text-5xl leading-none tabular-nums ${overLimit ? "text-primary" : "text-ink"}`}>{wordCount}</p>
                <p className="mt-2 text-sm text-charcoal/58">of {AI_WORD_LIMIT.toLocaleString()} words</p>
                <div className="mt-5 h-1 bg-ink/10">
                  <div
                    className={`h-full transition-all duration-300 ease-premium-out ${overLimit ? "bg-primary-active" : "bg-primary"}`}
                    style={{ width: `${Math.min(100, (wordCount / AI_WORD_LIMIT) * 100)}%` }}
                  />
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-charcoal/62">
                {overLimit ? `Remove ${(wordCount - AI_WORD_LIMIT).toLocaleString()} words to continue.` : `${remainingWords.toLocaleString()} words remaining.`}
              </p>
              <p className="mt-4 text-sm leading-6 text-charcoal/58">{statusMessage(status)}</p>
              {message ? <p className="mt-4 rounded-lg border border-primary/20 bg-ivory p-3 text-sm leading-6 text-charcoal/70" aria-live="polite">{message}</p> : null}
              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-6 inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(23,74,124,0.18)] transition duration-200 ease-premium-out hover:bg-primary-active active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-ink/30 disabled:text-white/70 disabled:shadow-none"
              >
                {status === "processing" ? "Reviewing..." : "Review My Text"}
              </button>
              <p className="mt-4 flex gap-2 text-xs leading-5 text-charcoal/50">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Abuse protection, file-size caps, and server-side word validation keep the free tool stable and responsible.
              </p>
            </aside>
          </div>
        </form>
      </section>

      {result ? (
        <section ref={resultRef} className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border border-hairline bg-paper p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-primary">Key improvements</p>
            <h2 className="mt-4 font-display text-5xl leading-none text-ink">Editorial notes.</h2>
            <div className="mt-8 grid gap-3">
              {result.highlights.map((highlight) => (
                <p key={highlight} className="border-t border-ink/10 pt-3 text-sm leading-6 text-charcoal/66">{highlight}</p>
              ))}
            </div>
            {result.suggestions?.length ? (
              <div className="mt-8 rounded-xl border border-primary/15 bg-primary/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-primary">Suggestions</p>
                <div className="mt-3 grid gap-2">
                  {result.suggestions.map((suggestion) => (
                    <p key={suggestion} className="text-sm leading-6 text-charcoal/66">{suggestion}</p>
                  ))}
                </div>
              </div>
            ) : null}
            <p className="mt-8 text-xs uppercase tracking-[0.22em] text-charcoal/42">
              Suggested refinement · Professional AI review
            </p>
          </div>

          <article className="rounded-2xl border border-hairline bg-ivory p-6 shadow-[0_24px_90px_rgba(17,17,15,0.06)] sm:p-8">
            <div className="flex flex-col gap-4 border-b border-ink/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-primary">
                  <button type="button" onClick={() => setViewMode("edited")} className={`mr-4 transition ${viewMode === "edited" ? "text-primary" : "text-charcoal/40 hover:text-primary"}`}>Edited View</button>
                  <button type="button" onClick={() => setViewMode("final")} className={`transition ${viewMode === "final" ? "text-primary" : "text-charcoal/40 hover:text-primary"}`}>Final View</button>
                </p>
                <h3 className="mt-2 font-display text-3xl leading-tight text-ink">{viewMode === "edited" ? "Tracked AI edit" : "Clean final version"}</h3>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={copyResult} className="min-h-11 border border-ink/10 px-4 text-sm text-ink transition duration-200 ease-premium-out hover:border-primary hover:text-primary active:scale-[0.98] rounded-full">
                  Copy
                </button>
                <button type="button" onClick={downloadResult} className="min-h-11 border border-ink/10 px-4 text-sm text-ink transition duration-200 ease-premium-out hover:border-primary hover:text-primary active:scale-[0.98] rounded-full">
                  Download
                </button>
              </div>
            </div>
            {viewMode === "edited" ? (
              <div className="mt-6 whitespace-pre-wrap text-base leading-8 text-charcoal/78">
                {diffSegments.map((segment, index) => {
                  if (segment.type === "delete") return <del key={index} className="rounded bg-red-50 px-0.5 text-red-700 decoration-red-700">{segment.text}</del>;
                  if (segment.type === "insert") return <ins key={index} className="rounded bg-primary/10 px-0.5 text-primary no-underline">{segment.text}</ins>;
                  return <span key={index}>{segment.text}</span>;
                })}
              </div>
            ) : (
              <div className="mt-6 whitespace-pre-wrap text-base leading-8 text-charcoal/78">{result.editedText}</div>
            )}
          </article>
        </section>
      ) : null}

      <section className="rounded-2xl border border-hairline bg-surface-soft p-8 text-ink shadow-[0_30px_100px_rgba(17,17,15,0.06)] sm:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Upgrade to human review</p>
            <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.7rem,5vw,5.8rem)] leading-[0.93]">
              When the document matters, bring in the editor.
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-body">
              AI is useful for a fast first pass. Professional editors provide deeper judgment, voice preservation, formatting awareness, academic/business context, and final delivery confidence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="inline-flex min-h-12 items-center justify-center bg-primary px-7 text-sm text-white transition duration-200 ease-premium-out hover:bg-primary-active active:scale-[0.98] rounded-full">
                Submit for full review
              </Link>
              <Link href="/services" className="inline-flex min-h-12 items-center justify-center border border-hairline px-7 text-sm text-ink transition duration-200 ease-premium-out hover:border-primary hover:text-primary active:scale-[0.98] rounded-full">
                Compare services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-ink/10 bg-ivory py-7">
        <div className="flex w-max animate-[marquee_34s_linear_infinite] gap-4 px-4 text-xs uppercase tracking-[0.28em] text-charcoal/42 motion-reduce:animate-none">
          {[...trustStrip, ...trustStrip].map((item, index) => (
            <span key={`${item}-${index}`} className="border-y border-ink/10 px-6 py-4">{item}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
