"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, FileText, Menu, MessageSquareText, Minus, PanelLeft, PenLine, Plus, Search, X } from "lucide-react";
import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import type { WorkExample, WorkExampleBlock, WorkExamplePage } from "@/lib/work-example-data";

type WorkPreviewModalProps = {
  example: WorkExample | null;
  onClose: () => void;
};

export function WorkPreviewModal({ example, onClose }: WorkPreviewModalProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setPageIndex(0);
    window.setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }, 0);
  }, [example?.key]);

  useEffect(() => {
    if (!example) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeButtonRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [example]);

  const pageCount = example?.pages.length ?? 0;

  const goToPage = (nextIndex: number) => {
    if (!example) return;
    const boundedIndex = Math.min(Math.max(nextIndex, 0), example.pages.length - 1);
    setPageIndex(boundedIndex);
    pageRefs.current[boundedIndex]?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const handleScroll = () => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const scrollerTop = scroller.getBoundingClientRect().top;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    pageRefs.current.forEach((page, index) => {
      if (!page) return;
      const distance = Math.abs(page.getBoundingClientRect().top - scrollerTop - 24);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setPageIndex(closestIndex);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!example) return;

    if (event.key === "Escape") {
      onClose();
      return;
    }

    if (event.key === "ArrowRight") {
      goToPage(pageIndex + 1);
      return;
    }

    if (event.key === "ArrowLeft") {
      goToPage(pageIndex - 1);
      return;
    }

    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!example) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/62 px-2 py-3 backdrop-blur-[5px] sm:px-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-preview-title"
        className="flex h-[min(96vh,1040px)] w-full max-w-[1480px] flex-col overflow-hidden rounded-[0.9rem] border border-white/35 bg-[#11161d] shadow-[0_34px_120px_rgba(10,11,13,0.42)]"
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#151a21] px-3 py-3 text-white sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="relative flex h-10 w-16 shrink-0 items-center justify-center overflow-hidden rounded bg-white">
              <Image src="/assets/logo.png" alt="" fill sizes="64px" className="object-contain" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-base font-semibold text-white sm:text-lg" id="work-preview-title">
                My Editing and Proofreading Desk
              </p>
              <p className="truncate text-xs font-medium text-white/62">
                {example.title} edited sample - scrollable PDF preview
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <span className="hidden items-center gap-2 rounded border border-white/10 bg-white/8 px-3 py-2 text-xs font-semibold text-white/78 md:inline-flex">
              <FileText className="h-4 w-4" />
              Page {pageIndex + 1} / {pageCount}
            </span>
            <button
              type="button"
              onClick={onClose}
              ref={closeButtonRef}
              aria-label="Close sample preview"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white transition-colors hover:bg-white hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-rows-1">
          {/* <PageRail example={example} pageIndex={pageIndex} onSelectPage={goToPage} /> */}

          <main className="relative min-h-0 overflow-hidden bg-[#2e3036]">
            <div className="flex h-11 items-center justify-between border-b border-white/10 bg-[#3b3b40] px-3 text-white/82">
              <div className="flex items-center gap-2">
                <PanelLeft className="h-4 w-4" />
                <Search className="h-4 w-4" />
                <button type="button" onClick={() => goToPage(pageIndex - 1)} aria-label="Previous page" className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-white/10">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => goToPage(pageIndex + 1)} aria-label="Next page" className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-white/10">
                  <ChevronRight className="h-4 w-4" />
                </button>
                <span className="inline-flex h-7 min-w-12 items-center justify-center rounded border border-white/18 bg-black/12 px-2 text-xs">
                  {pageIndex + 1}
                </span>
                <span className="text-xs text-white/70">of {pageCount}</span>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <Minus className="h-4 w-4" />
                <Plus className="h-4 w-4" />
                <span className="rounded border border-white/14 bg-black/10 px-3 py-1 text-xs">Page Width</span>
              </div>

              <div className="flex items-center gap-3">
                <PenLine className="h-4 w-4" />
                <Menu className="h-4 w-4" />
              </div>
            </div>

            <div ref={scrollRef} onScroll={handleScroll} className="h-[calc(100%-2.75rem)] overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,#34363d,#24262c)] px-2 pb-8 pt-4 sm:px-4 lg:px-5">
              <div className="mx-auto flex max-w-[1260px] flex-col gap-5">
                {example.pages.map((page, index) => (
                  <div
                    key={page.eyebrow}
                    ref={(node) => {
                      pageRefs.current[index] = node;
                    }}
                    className="scroll-mt-5"
                  >
                    <DocumentPage example={example} page={page} pageNumber={index + 1} />
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/*
function PageRail({
  example,
  pageIndex,
  onSelectPage
}: {
  example: WorkExample;
  pageIndex: number;
  onSelectPage: (pageIndex: number) => void;
}) {
  return (
    <aside className="flex gap-2 overflow-x-auto border-b border-white/10 bg-[#20252d] p-3 lg:block lg:space-y-3 lg:overflow-y-auto lg:border-b-0 lg:border-r">
      {example.pages.map((page, index) => (
        <button
          key={page.eyebrow}
          type="button"
          onClick={() => onSelectPage(index)}
          aria-label={`Open page ${index + 1}`}
          className={`group min-w-[7.75rem] rounded-lg border p-2 text-left transition lg:w-full ${
            pageIndex === index
              ? "border-primary/80 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
              : "border-white/8 bg-white/10 hover:border-white/20 hover:bg-white/16"
          }`}
        >
          <div className="mx-auto mb-2 aspect-[3/4] w-14 rounded-sm border border-ink/10 bg-white shadow-sm">
            <div className="space-y-1.5 p-2">
              <span className="block h-1.5 w-8 rounded-full" style={{ backgroundColor: example.accent }} />
              <span className="block h-1 w-full rounded-full bg-ink/16" />
              <span className="block h-1 w-4/5 rounded-full bg-ink/12" />
              <span className="block h-1 w-5/6 rounded-full bg-ink/12" />
            </div>
          </div>
          <p className="truncate text-[0.68rem] font-bold uppercase tracking-[0.12em] text-charcoal/60">
            Page {index + 1}
          </p>
          <p className={`line-clamp-2 text-xs font-semibold leading-4 ${pageIndex === index ? "text-ink" : "text-white/82"}`}>{page.heading}</p>
        </button>
      ))}
    </aside>
  );
}
*/

function DocumentPage({
  example,
  page,
  pageNumber
}: {
  example: WorkExample;
  page: WorkExamplePage;
  pageNumber: number;
}) {
  const pageTone = page.variant === "resume"
    ? "font-sans"
    : page.variant === "legal" || page.variant === "humanities" || page.variant === "references" || page.variant === "science" || page.variant === "engineering"
      ? "font-serif"
      : "font-sans";
  const isFirstPage = pageNumber === 1;
  const hasComments = page.comments.length > 0;
  const isGeologicalScreenshotSample = example.key === "geological" && Boolean(page.blocks);
  const contentBlocks: WorkExampleBlock[] = page.blocks ?? page.body.map((text) => ({ type: "paragraph", text, role: "body" }));
  if (!page.blocks && page.table) contentBlocks.push({ type: "table", headers: page.table.headers, rows: page.table.rows });

  const commentsForBlock = (blockIndex: number) =>
    page.comments.filter((comment, commentIndex) => comment.anchor === blockIndex || (!comment.anchor && blockIndex > 0 && blockIndex === commentIndex + 1));

  return (
    <article className={`mx-auto grid gap-0 shadow-[0_18px_70px_rgba(0,0,0,0.28)] ${hasComments ? "max-w-[1230px] bg-[#ece7dd] lg:grid-cols-[minmax(0,910px)_270px]" : "max-w-[900px] bg-transparent"} lg:items-stretch`}>
      <div className={`flex min-h-[965px] flex-col bg-[#fffdf7] px-7 text-[#111827] ring-1 ring-black/8 sm:px-10 ${isFirstPage ? "py-6 sm:py-7" : "py-7"}`}>
        {isFirstPage ? (
          <div className="mb-5 flex items-center justify-between border-b border-ink/10 pb-3">
            <p className="font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
              My Editing and Proofreading Desk
            </p>
            <span className="relative hidden h-12 w-20 shrink-0 overflow-hidden bg-white sm:block">
              <Image src="/assets/logo.png" alt="" fill sizes="112px" className="object-contain" />
            </span>
          </div>
        ) : null}

        {isFirstPage ? (
          <div className="mb-5 flex items-start justify-between gap-6 border-b border-ink/10 pb-4">
            <div>
              <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-charcoal/55">
                {page.eyebrow}
              </p>
              {!page.blocks ? (
                <h3 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                  {page.heading}
                </h3>
              ) : null}
              <p className="mt-2 text-sm font-medium text-charcoal/70">{example.authorLine}</p>
            </div>
            <span
              className="hidden rounded-full px-3 py-1 text-xs font-bold text-white sm:inline-flex"
              style={{ backgroundColor: example.accent }}
            >
              {example.shortTitle}
            </span>
          </div>
        ) : null}

        {isFirstPage && page.variant === "engineering" && !isGeologicalScreenshotSample ? <EngineeringRule accent={example.accent} /> : null}
        {isFirstPage && page.variant === "legal" ? <LegalMemoBar /> : null}
        {isFirstPage && page.variant === "science" ? <ScienceMetaBar accent={example.accent} /> : null}

        {!isFirstPage ? (
          <div className="mb-4 border-b border-ink/10 pb-3">
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-charcoal/52">{page.eyebrow}</p>
            <h3 className="mt-1 font-display text-xl font-semibold leading-tight text-ink">{page.heading}</h3>
          </div>
        ) : null}

        <div className={`grow space-y-2.5 ${pageTone} text-[0.88rem] leading-[1.58] text-[#111827] sm:text-[0.94rem]`}>
          {contentBlocks.map((block, index) => {
            const anchoredComments = commentsForBlock(index);
            const hasComment = anchoredComments.length > 0;

            if (block.type === "table") {
              return (
                <div
                  key={`table-${index}`}
                  className={`relative ${hasComment ? "border-r-2 pr-3" : ""}`}
                  style={hasComment ? { borderColor: page.variant === "science" ? "#f08f8f" : `${example.accent}66` } : undefined}
                >
                  {hasComment ? (
                    <span
                      className="absolute -right-8 top-3 hidden h-px w-8 lg:block"
                      style={{ backgroundColor: page.variant === "science" ? "#f08f8f" : `${example.accent}99` }}
                      aria-hidden="true"
                    />
                  ) : null}
                  <DocumentTable table={{ headers: block.headers, rows: block.rows }} />
                </div>
              );
            }

            return (
              <p
                key={`${block.text}-${index}`}
                className={`relative ${lineClassFor(page, block.text, index, block.role, isGeologicalScreenshotSample)} ${hasComment ? "border-r-2 pr-3" : ""}`}
                style={hasComment ? { borderColor: page.variant === "science" ? "#f08f8f" : `${example.accent}66` } : undefined}
              >
                {hasComment ? (
                  <span
                    className="absolute -right-8 top-3 hidden h-px w-8 lg:block"
                    style={{ backgroundColor: page.variant === "science" ? "#f08f8f" : `${example.accent}99` }}
                    aria-hidden="true"
                  />
                ) : null}
                {renderMarkedText(block.text)}
              </p>
            );
          })}
        </div>

        {page.figure ? <DocumentFigure type={page.figure} accent={example.accent} /> : null}

        {isFirstPage ? (
          <footer className="mt-6 flex items-center justify-between border-t border-ink/10 pt-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-charcoal/50">
            <span>Confidential sample preview</span>
            <span>{pageNumber}</span>
          </footer>
        ) : null}
      </div>

      {hasComments ? <aside className={`space-y-3 bg-[#eee9df] p-4 ${isFirstPage ? "lg:pt-28" : "lg:pt-14"}`}>
        {page.comments.map((comment, index) => (
          <div
            key={`${comment.label}-${index}`}
            className={`relative rounded-lg border p-3 shadow-[0_10px_22px_rgba(10,11,13,0.08)] before:absolute before:right-full before:top-7 before:hidden before:h-px before:w-8 before:bg-current lg:before:block ${
              page.variant === "science" ? "bg-[#fff0f0] text-[#9b1c1c]" : "bg-[#fffdf8]/92"
            }`}
            style={{ borderColor: page.variant === "science" ? "#ef8d8d" : `${example.accent}66`, color: page.variant === "science" ? "#9b1c1c" : example.accent }}
          >
            {page.variant === "science" ? (
              <p className="font-serif text-sm font-bold leading-5 text-[#5b1111]">Commented [{comment.label}]: <span className="font-normal text-ink">{comment.note}</span></p>
            ) : (
              <>
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-current">
                    <MessageSquareText className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-current">Commented [{comment.label}]</p>
                </div>
                <p className="text-sm leading-6 text-ink">{comment.note}</p>
              </>
            )}
          </div>
        ))}
      </aside> : null}
    </article>
  );
}

function lineClassFor(page: WorkExamplePage, paragraph: string, index: number, role?: Extract<WorkExampleBlock, { type: "paragraph" }>["role"], isGeologicalScreenshotSample = false) {
  if (role === "title") return `font-display font-bold leading-tight text-ink ${isGeologicalScreenshotSample ? "text-2xl" : "text-2xl sm:text-3xl"}`;
  if (role === "heading") return `mt-7 pb-1 font-display text-base font-bold leading-tight text-ink sm:text-lg ${isGeologicalScreenshotSample ? "" : "border-b border-ink/10"}`;
  if (role === "caption") return "mt-7 text-[0.9rem] font-normal leading-6 text-charcoal/80";
  if (role === "equation") return "font-serif text-base italic leading-6 text-ink";
  if (role === "list") return "pl-4 before:absolute before:left-0 before:top-3 before:h-1.5 before:w-1.5 before:rounded-full before:bg-ink/45";
  if (role === "sublist") return "ml-7 pl-4 text-[0.84rem] leading-5 before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-ink/40";
  if (role === "footnote") return "pl-5 -indent-5 text-[0.76rem] leading-5 text-ink/85";
  if (role === "reference") return "pl-7 -indent-7 text-[0.82rem] leading-5";
  if (page.variant === "references" && index > 0) return "pl-8 -indent-8 text-[0.92rem] leading-7";
  if (page.variant === "resume") {
    if (paragraph === paragraph.toUpperCase() && paragraph.length < 32) return "mt-6 border-b border-ink/20 pb-1 text-[0.72rem] font-bold uppercase tracking-[0.2em]";
    if (index === 0) return "text-center text-2xl font-bold uppercase tracking-[0.18em]";
    if (index === 1) return "text-center text-xs text-charcoal/70";
    return "pl-4 before:absolute before:left-0 before:top-3 before:h-1.5 before:w-1.5 before:rounded-full before:bg-ink/50";
  }
  if (page.variant === "engineering") {
    if (paragraph === paragraph.toUpperCase() && paragraph.length < 46) return "mt-4 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-charcoal/60";
    if (/^(Table|Figure) \d+/.test(paragraph)) return "mt-3 text-[0.82rem] font-semibold leading-5 text-charcoal/75";
    return "text-[0.92rem] leading-[1.62]";
  }
  if (page.variant === "legal") return "text-[0.98rem] leading-8";
  if (page.variant === "humanities") return "text-[1.03rem] leading-8";
  if (page.variant === "science") return "text-[0.98rem] leading-6";
  return "";
}

function EngineeringRule({ accent }: { accent: string }) {
  return (
    <div className="mb-6 grid gap-2 border-y border-ink/10 py-3 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-charcoal/60 sm:grid-cols-3">
      {["Design Review", "LTspice / Breadboard", "Units Checked"].map((item) => (
        <span key={item} className="border-l-2 pl-3" style={{ borderColor: accent }}>{item}</span>
      ))}
    </div>
  );
}

function ScienceMetaBar({ accent }: { accent: string }) {
  return (
    <div className="mb-6 grid gap-3 rounded border border-ink/10 bg-white/70 p-3 text-xs text-charcoal/70 sm:grid-cols-3">
      {["Method verified", "Figure callouts checked", "Terminology standardized"].map((item) => (
        <span key={item} className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
          {item}
        </span>
      ))}
    </div>
  );
}

function LegalMemoBar() {
  return (
    <div className="mb-6 grid gap-2 border-y-2 border-ink/80 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink sm:grid-cols-3">
      <span>To: Supervising Solicitor</span>
      <span>Re: Administrative Review</span>
      <span>Status: Edited Draft</span>
    </div>
  );
}

function renderMarkedText(text: string) {
  const parts = text.split(/(<del>.*?<\/del>|<ins>.*?<\/ins>|<sup>.*?<\/sup>|<sub>.*?<\/sub>|<strong>.*?<\/strong>|<em>.*?<\/em>|<i>.*?<\/i>|<mark>.*?<\/mark>|<green>.*?<\/green>|<br \/>)/g);

  return parts.map((part, index) => {
    if (part.startsWith("<del>") && part.endsWith("</del>")) {
      return (
        <del key={index} className="px-0.5 text-red-700 decoration-red-700 decoration-2">
          {renderMarkedText(part.replace("<del>", "").replace("</del>", ""))}
        </del>
      );
    }

    if (part.startsWith("<ins>") && part.endsWith("</ins>")) {
      return (
        <ins key={index} className="px-0.5 font-medium text-blue-700 no-underline">
          {renderMarkedText(part.replace("<ins>", "").replace("</ins>", ""))}
        </ins>
      );
    }

    if (part.startsWith("<sup>") && part.endsWith("</sup>")) {
      return <sup key={index}>{part.replace("<sup>", "").replace("</sup>", "")}</sup>;
    }

    if (part.startsWith("<sub>") && part.endsWith("</sub>")) {
      return <sub key={index}>{part.replace("<sub>", "").replace("</sub>", "")}</sub>;
    }

    if (part === "<br />") {
      return <br key={index} />;
    }

    if (part.startsWith("<strong>") && part.endsWith("</strong>")) {
      return <strong key={index}>{renderMarkedText(part.replace("<strong>", "").replace("</strong>", ""))}</strong>;
    }

    if (part.startsWith("<em>") && part.endsWith("</em>")) {
      return <em key={index}>{renderMarkedText(part.replace("<em>", "").replace("</em>", ""))}</em>;
    }

    if (part.startsWith("<i>") && part.endsWith("</i>")) {
      return <i key={index}>{renderMarkedText(part.replace("<i>", "").replace("</i>", ""))}</i>;
    }

    if (part.startsWith("<mark>") && part.endsWith("</mark>")) {
      return (
        <mark key={index} className="bg-amber-100 px-0.5 font-semibold text-amber-700">
          {renderMarkedText(part.replace("<mark>", "").replace("</mark>", ""))}
        </mark>
      );
    }

    if (part.startsWith("<green>") && part.endsWith("</green>")) {
      return (
        <span key={index} className="font-semibold text-green-700 underline decoration-green-700/70 underline-offset-2">
          {renderMarkedText(part.replace("<green>", "").replace("</green>", ""))}
        </span>
      );
    }

    return part;
  });
}

function DocumentTable({ table }: { table: NonNullable<WorkExamplePage["table"]> }) {
  return (
    <div className="mt-4 overflow-hidden rounded-md border border-ink/12 bg-white">
      <table className="w-full border-collapse text-left text-[0.78rem] leading-5">
        <thead className="bg-[#f4f6f8] text-[0.64rem] uppercase tracking-[0.12em] text-charcoal/65">
          <tr>
            {table.headers.map((header) => (
              <th key={header} className="border-b border-ink/10 px-3 py-2 font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={`${row.join("-")}-${rowIndex}`} className="border-b border-ink/8 last:border-b-0">
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`} className="px-3 py-2 text-charcoal">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DocumentFigure({ type, accent }: { type: NonNullable<WorkExamplePage["figure"]>; accent: string }) {
  const figure = useMemo(() => getFigure(type, accent), [type, accent]);

  return (
    <figure className="mt-8 rounded-lg border border-ink/10 bg-[#f8fafc] p-5">
      {figure}
      <figcaption className="mt-4 text-xs leading-5 text-charcoal/70">
        <span className="font-bold text-ink">Edited figure caption:</span> Labels, units, and interpretive wording have been checked for clarity.
      </figcaption>
    </figure>
  );
}

function getFigure(type: NonNullable<WorkExamplePage["figure"]>, accent: string) {
  if (type === "cell") {
    return (
      <div className="grid gap-4 sm:grid-cols-[1fr_1.2fr]">
        <div className="relative h-44 rounded-full border-2 border-emerald-700/30 bg-emerald-50">
          <span className="absolute left-1/2 top-1/2 h-16 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-200/80 ring-1 ring-emerald-800/20" />
          <span className="absolute left-12 top-10 h-5 w-8 rounded-full bg-emerald-600/45" />
          <span className="absolute bottom-11 right-14 h-4 w-7 rounded-full bg-emerald-600/35" />
        </div>
        <div className="space-y-3 text-sm text-charcoal">
          <p><span className="font-bold text-ink">A</span> Mitochondrial signal corrected for background fluorescence.</p>
          <p><span className="font-bold text-ink">B</span> Cell wall boundary added to clarify the figure reference.</p>
          <p><span className="font-bold text-ink">C</span> Caption revised to define measurement conditions.</p>
        </div>
      </div>
    );
  }

  if (type === "gel") {
    return (
      <div className="grid gap-5 sm:grid-cols-[0.78fr_1.22fr]">
        <div className="rounded bg-slate-950 p-4">
          <div className="grid h-44 grid-cols-4 gap-3">
            {[68, 42, 82, 56].map((height, index) => (
              <div key={height} className="relative rounded bg-slate-900">
                <span className="absolute left-2 right-2 top-8 h-2 rounded bg-emerald-200/80" />
                <span className="absolute left-2 right-2 rounded bg-emerald-300/60" style={{ top: `${height}%`, height: "8px" }} />
                <span className="absolute bottom-2 left-0 right-0 text-center text-[0.62rem] text-white/70">L{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3 text-sm text-charcoal">
          <p><span className="font-bold text-ink">Figure 2.</span> Representative fluorescence and expression readout.</p>
          <p>Labels were revised to define treatment lanes, reference gene, and replicate number.</p>
        </div>
      </div>
    );
  }

  if (type === "reaction") {
    return (
      <div className="rounded bg-white p-5">
        <div className="flex flex-wrap items-center justify-center gap-4 text-center font-serif text-lg text-ink">
          <span className="rounded border border-ink/10 px-4 py-3">CH3COOCH2CH3</span>
          <span>+</span>
          <span className="rounded border border-ink/10 px-4 py-3">OH-</span>
          <span className="text-2xl" style={{ color: accent }}>{"->"}</span>
          <span className="rounded border border-ink/10 px-4 py-3">CH3COO-</span>
          <span>+</span>
          <span className="rounded border border-ink/10 px-4 py-3">CH3CH2OH</span>
        </div>
        <div className="mt-5 grid gap-2 text-xs text-charcoal/70 sm:grid-cols-3">
          <span>25-45 C</span>
          <span>Pseudo-first-order conditions</span>
          <span>Phenolphthalein endpoint</span>
        </div>
      </div>
    );
  }

  if (type === "molecule") {
    return (
      <div className="flex min-h-44 items-center justify-center">
        <div className="relative h-36 w-72">
          {["left-3 top-12", "left-24 top-3", "left-40 top-24", "right-4 top-10"].map((position, index) => (
            <span
              key={position}
              className={`absolute ${position} flex h-12 w-12 items-center justify-center rounded-full border bg-white text-xs font-bold shadow-sm`}
              style={{ borderColor: accent, color: accent }}
            >
              {["C", "O", "H", "Na"][index]}
            </span>
          ))}
          <span className="absolute left-14 top-16 h-0.5 w-20 rotate-[-28deg] bg-ink/30" />
          <span className="absolute left-32 top-20 h-0.5 w-20 rotate-[34deg] bg-ink/30" />
          <span className="absolute left-48 top-20 h-0.5 w-20 rotate-[-22deg] bg-ink/30" />
        </div>
      </div>
    );
  }

  if (type === "circuit") {
    return (
      <div className="min-h-44 rounded bg-white p-5">
        <svg viewBox="0 0 520 180" className="h-44 w-full" aria-hidden="true">
          <path d="M30 90 H135 L165 55 L205 125 L245 55 L285 125 L320 90 H490" fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="30" cy="90" r="10" fill={accent} />
          <circle cx="490" cy="90" r="10" fill={accent} />
          <rect x="330" y="50" width="70" height="80" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
          <path d="M400 90 H455" stroke="#94a3b8" strokeWidth="4" />
          <text x="150" y="37" fontSize="18" fill="#334155">R1</text>
          <text x="344" y="43" fontSize="18" fill="#334155">Op-amp</text>
          <text x="430" y="78" fontSize="16" fill="#334155">Vout</text>
        </svg>
      </div>
    );
  }

  if (type === "legal") {
    return (
      <div className="rounded border border-ink/10 bg-white p-5 font-serif text-sm leading-7 text-ink">
        <p><span className="font-bold">Issue</span>: Whether the decision-maker's interference was proportionate to the statutory aim.</p>
        <p className="mt-3"><span className="font-bold">Rule</span>: The court asks whether the measure is suitable, necessary, and balanced in context.</p>
        <p className="mt-3"><span className="font-bold">Authority</span>: <em>R (Daly) v Secretary of State for the Home Department</em> [2001] UKHL 26.</p>
      </div>
    );
  }

  if (type === "code") {
    return (
      <pre className="overflow-x-auto rounded bg-[#111827] p-5 text-xs leading-6 text-slate-100">
        <code>{`function routeRequest(modelId, queueDepth) {
  const residencyScore = cache.has(modelId) ? 0.72 : 0.18;
  return residencyScore - normalize(queueDepth);
}`}</code>
      </pre>
    );
  }

  if (type === "resume") {
    return (
      <div className="grid gap-4 rounded bg-white p-4 sm:grid-cols-3">
        {["Profile", "Experience", "Education"].map((label) => (
          <div key={label} className="border-l-2 pl-3" style={{ borderColor: accent }}>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal/60">{label}</p>
            <div className="mt-3 space-y-2">
              <span className="block h-2 rounded-full bg-ink/18" />
              <span className="block h-2 w-4/5 rounded-full bg-ink/12" />
              <span className="block h-2 w-3/5 rounded-full bg-ink/12" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "clinical") {
    return (
      <div className="grid gap-3 sm:grid-cols-3">
        {["Baseline", "Intervention", "Outcome"].map((label, index) => (
          <div key={label} className="rounded border border-ink/10 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal/60">{label}</p>
            <p className="mt-4 text-3xl font-bold" style={{ color: accent }}>{[72, 84, 91][index]}%</p>
          </div>
        ))}
      </div>
    );
  }

  if (type === "reference") {
    return (
      <div className="space-y-3 rounded bg-white p-4 text-sm text-charcoal">
        <p className="border-l-2 pl-3" style={{ borderColor: accent }}>Author. Year. Title. Source. DOI.</p>
        <p className="border-l-2 pl-3" style={{ borderColor: accent }}>Author, "Title," Journal volume, no. issue (year): pages.</p>
        <p className="border-l-2 pl-3" style={{ borderColor: accent }}>Author. <em>Book Title</em>. Publisher, year.</p>
      </div>
    );
  }

  return (
    <div className="flex h-44 items-end gap-3 rounded bg-white p-5">
      {[42, 68, 54, 86, 73, 92].map((height, index) => (
        <span
          key={height + index}
          className="flex-1 rounded-t"
          style={{ height: `${height}%`, backgroundColor: index % 2 ? accent : "rgba(10,11,13,0.18)" }}
        />
      ))}
    </div>
  );
}
