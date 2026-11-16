import type { BlogPost } from "@/lib/blog";

const author = "My Editing and Proofreading Desk";
const published = "2026-08-04";
const updated = "2026-11-16";

export const requestedBlogPosts: BlogPost[] = [
  {
    title: "Human vs AI Proofreading: What Each Catches and Misses",
    slug: "ai-proofreading-vs-human-proofreading",
    excerpt: "Compare AI proofreading and human proofreading for grammar, meaning, tone, consistency, confidentiality, and final document risk.",
    category: "AI and Writing Tools",
    author,
    reviewer: "Senior Academic & Professional Editorial Board — My Editing and Proofreading Desk",
    editorialDesk: "AI Ethics & Human Quality-Control Desk",
    styleStandards: ["APA 7th Ed.", "Chicago 17th Ed.", "COPE Publication Ethics"],
    datePublished: published,
    dateUpdated: updated,
    readingTime: "10 min read",
    metaTitle: "AI vs Human Proofreading: Key Differences and Limits",
    metaDescription: "Compare AI and human proofreading for accuracy, context, confidentiality, and final review. See what each can miss and when a human editor helps.",
    heroImage: "/images/blog/editing-vs-proofreading-hero-v2.png",
    heroImageAlt: "Human editor comparing proofreading marks with automated editing suggestions on a document",
    tableOfContents: [
      { id: "quick-answer", label: "Quick answer" },
      { id: "what-ai-catches", label: "What AI catches" },
      { id: "what-humans-catch", label: "What humans catch" },
      { id: "comparison", label: "Comparison table" },
      { id: "document-risk", label: "Document risk" },
      { id: "what-to-check", label: "What to check manually" },
      { id: "future-study", label: "Future study structure" },
      { id: "safe-workflow", label: "Safe workflow" },
      { id: "choose-human", label: "When to choose human review" },
    ],
    body: [
      {
        id: "quick-answer",
        heading: "AI proofreading vs human proofreading: the short answer",
        paragraphs: [
          ["AI proofreading can be useful for a quick first pass on spelling, grammar, repeated words, and obvious sentence problems. Human proofreading is stronger when meaning, tone, context, confidentiality, formatting, document-wide consistency, and final judgment matter."],
          ["The safest workflow is not AI or human in isolation. Use AI cautiously for low-risk early checks, then use ", { text: "professional proofreading services", href: "/proofreading-services" }, " for important academic, business, manuscript, application, or submission-ready documents."],
        ],
      },
      {
        id: "what-ai-catches",
        heading: "What AI proofreading tools can catch",
        paragraphs: [
          ["AI tools can identify many visible language issues quickly. They may flag spelling variants, repeated words, missing punctuation, grammar patterns, wordiness, and sentences that could be easier to read."],
          ["They are useful when you need a first pass before sharing a draft. Our ", { text: "free AI editing tool", href: "/ai-editing-tool" }, " is designed for that early review stage, not as a replacement for a human final check."],
        ],
        bullets: [
          ["Obvious spelling and punctuation issues"],
          ["Repeated words or simple grammar patterns"],
          ["Overlong sentences that may need attention"],
          ["Possible tone or clarity issues in short text"],
        ],
      },
      {
        id: "what-humans-catch",
        heading: "What human proofreaders catch that AI can miss",
        paragraphs: [
          ["A human proofreader reads the document as communication. They can ask whether a correction preserves the writer's meaning, whether a term is discipline-specific, whether a business claim has been changed accidentally, and whether a sentence is technically correct but unsuitable for the reader."],
          ["Human review is especially important for documents with confidential information, citation rules, tables, figures, formatting requirements, or high-stakes consequences. Our ", { text: "editorial policy", href: "/editorial-policy" }, " explains the boundaries of responsible human editing."],
        ],
        bullets: [
          ["Meaning changes introduced by automated suggestions"],
          ["Inconsistent terms across chapters or sections"],
          ["Tone that does not fit the audience"],
          ["Formatting, captions, references, and final-file issues"],
          ["Questions that require author confirmation rather than automatic rewriting"],
        ],
        trackedChanges: {
          context: "Public Health Manuscript (Results Narrative vs. Table 3)",
          rawDraft:
            "Moreover, this important intervention completely proves that school meal subsidies eliminate chronic absenteeism across rural districts (p < 0.05).",
          humanRevision:
            "In this multi-district sample (n = 1,240), subsidized breakfast access was associated with a 9.4% reduction in chronic absenteeism (p = .031; see Table 3), indicating a measurable attendance benefit.",
          marginComment:
            "COMMENT [Editorial Desk]: Replaced AI-suggested causal verbs ('completely proves', 'eliminate') with bounded observational phrasing matching your regression table. Confirmed p = .031 from Table 3.",
          styleStandard: "APA 7th Ed. Empirical Caution & Table Alignment",
        },
      },
      {
        id: "comparison",
        heading: "AI proofreading vs human proofreading comparison",
        paragraphs: [["Use this comparison before deciding how much review your document needs."]],
        table: {
          headers: ["Need", "AI proofreading", "Human proofreading"],
          rows: [
            ["Speed", "Fast for short text", "Depends on length, scope, and turnaround"],
            ["Context", "May miss discipline or audience nuance", "Can preserve meaning and reader expectations"],
            ["Confidentiality", "Depends on the tool and its data handling", "Handled through the service's submission workflow"],
            ["Formatting", "Limited for complex files", "Can review supplied document presentation"],
            ["Final accountability", "Suggestions need human approval", "Corrections still require author approval"],
          ],
        },
      },
      {
        id: "document-risk",
        heading: "Match the proofreading method to the document risk",
        paragraphs: [
          ["The right choice depends on what can go wrong if an error remains. A short internal note may only need a fast cleanup. A thesis chapter, proposal, CV, manuscript, or translated document can carry higher risk because small language changes may affect meaning, credibility, compliance with instructions, or reader trust."],
          ["For academic work, check your institution's rules before using any AI tool, especially if the text includes unpublished research, participant information, supervisor comments, or assessment material. For business and application documents, consider whether the tool is allowed to process client information, financial figures, personal data, or confidential strategy."],
        ],
        table: {
          headers: ["Document type", "AI may help with", "Human review is stronger for"],
          rows: [
            ["Short draft text", "Obvious grammar, spelling, and repeated words", "Tone, audience fit, and final judgment"],
            ["Thesis or dissertation", "Early low-risk language prompts", "Meaning, citations, formatting, policies, and consistency across chapters"],
            ["Business proposal", "Simple sentence cleanup", "Client names, figures, scope wording, version control, and approved terminology"],
            ["CV or resume", "Typos and wordiness", "Truthful positioning, chronology, role language, and recruiter readability"],
            ["Translated English", "Awkward phrasing prompts", "Meaning preservation, terminology, and places needing source-language confirmation"],
          ],
        },
      },
      {
        id: "what-to-check",
        heading: "What to check before accepting an AI proofreading suggestion",
        paragraphs: [
          ["Do not accept suggestions in bulk. Read each change against the original sentence, the surrounding paragraph, and the document purpose. A correction can be fluent and still be wrong for the writer's meaning, discipline, client, or submission rule."],
          ["Pay close attention to cautious academic wording, technical terms, names, dates, numbers, citations, headings, captions, and any sentence that describes responsibility, limitations, results, prices, or qualifications. Those are places where a small automated rewrite can create a larger problem."],
        ],
        numberedSteps: [
          ["Compare the suggested sentence with the original meaning."],
          ["Check whether technical terms, names, numbers, and citations stayed unchanged."],
          ["Reject any suggestion that strengthens a claim beyond the evidence."],
          ["Search the document for related terms so one accepted change does not create inconsistency."],
          ["Use a final human pass when the document is important, confidential, or submission-ready."],
        ],
      },
      {
        id: "future-study",
        heading: "Optional future AI vs human proofreading study structure",
        paragraphs: [
          ["This article is prepared for a future AI vs human proofreading study, but no results are published here because no anonymized test dataset has been supplied. Publishing numbers without real documents, a defined method, and repeatable scoring would be misleading."],
          ["A legitimate study would need anonymized sample documents, clear consent and confidentiality controls, a fixed error taxonomy, blinded review where practical, and documented scoring rules before any statistics are added."],
        ],
        table: {
          headers: ["Study element", "Required before publishing", "Status"],
          rows: [
            ["Sample documents", "Anonymized academic, business, manuscript, application, and translated text examples", "Manual data required"],
            ["Error categories", "Grammar, punctuation, meaning, terminology, references, tables, figures, formatting, and confidentiality risks", "Framework drafted"],
            ["Review process", "Defined AI tool settings and independent human review process", "Manual method required"],
            ["Scoring", "Transparent scoring rules for caught, missed, introduced, and inappropriate corrections", "Manual validation required"],
          ],
        },
      },
      {
        id: "safe-workflow",
        heading: "A safe proofreading workflow",
        paragraphs: [
          ["Start by cleaning obvious errors yourself. Use AI only on text you are allowed to submit to that tool, and review every suggestion before accepting it. Then use a human final review when the document must preserve exact meaning, confidential information, citation integrity, or institutional requirements."],
        ],
        numberedSteps: [
          ["Freeze the draft version you want reviewed."],
          ["Run a low-risk first pass for obvious language issues."],
          ["Reject suggestions that change facts, claims, tone, or terminology."],
          ["Use a human proofreader for the final document."],
          ["Review the returned file before submission."],
        ],
        checklist: {
          title: "AI-to-Human Quality-Control Checklist",
          items: [
            ["Confirm unpublished datasets, participant quotes, and NDA corporate figures never enter third-party public prompts."],
            ["Inspect every sentence revised by software for unintended swaps of technical terminology or statistical hedges."],
            ["Run a whole-document human pass in MS Word Track Changes to catch cross-section inconsistency and citation mismatches."],
          ],
        },
      },
      {
        id: "choose-human",
        heading: "When human proofreading is the better choice",
        paragraphs: [
          ["Choose human proofreading when the document is academic, professional, client-facing, application-related, confidential, or close to final submission. AI can assist the early clean-up, but final judgment belongs with a person who can read context and leave questions where the author must decide."],
          ["Ready for a final review? ", { text: "Upload your document securely", href: "/submit" }, " or compare ", { text: "pricing", href: "/pricing" }, " before you begin."],
        ],
      },
    ],
    faq: [
      { question: "Is AI proofreading enough for important documents?", answer: "Usually not. AI can help with a first pass, but important documents benefit from human review for meaning, tone, confidentiality, formatting, and document-wide consistency." },
      { question: "Can AI proofreading change my meaning?", answer: "Yes. Automated suggestions can make a sentence smoother while changing the writer's intended meaning, technical term, claim strength, or citation relationship." },
      { question: "Should I use AI before hiring a proofreader?", answer: "You can use AI cautiously for low-risk early checks, but review every suggestion and avoid uploading confidential or restricted material to tools that are not permitted." },
    ],
    internalLinks: [
      { href: "/ai-editing-tool", label: "Try the AI tool", description: "Use a quick first pass for short text before human review." },
      { href: "/proofreading-services", label: "Professional proofreading", description: "Get a human final check for important documents." },
      { href: "/academic-proofreading", label: "Academic proofreading", description: "Use human review where policy, citations, and formatting matter." },
      { href: "/editors", label: "Editor standards", description: "Review the human editorial standards behind the service." },
      { href: "/pricing", label: "Check pricing", description: "Estimate a human proofreading or editing review before upload." },
      { href: "/blog/ai-proofreading-thesis-dissertation", label: "AI and thesis rules", description: "Review thesis and dissertation risks before using AI." },
      { href: "/editorial-policy", label: "Editorial policy", description: "Review the boundaries of responsible editing and proofreading." },
    ],
  },
  {
    title: "Can You Use AI to Proofread a Thesis or Dissertation?",
    slug: "ai-proofreading-thesis-dissertation",
    excerpt: "Learn when AI proofreading may help thesis or dissertation writers, where it can create risk, and why human final review still matters.",
    category: "AI and Writing Tools",
    author,
    reviewer: "Law, Policy & Academic Ethics Desk — My Editing and Proofreading Desk",
    editorialDesk: "Graduate Ethics & Dissertation Review Desk",
    styleStandards: ["University Senate Proofreading Policies", "Turnitin Authorship Standards", "APA 7th / Chicago 17th"],
    datePublished: published,
    dateUpdated: updated,
    readingTime: "10 min read",
    metaTitle: "Can You Use AI to Proofread a Thesis? Rules & Risks Guide",
    metaDescription: "Can you use AI to proofread a thesis or dissertation? Compare university AI policies, Turnitin risks, data privacy, and safe human Track Changes review.",
    heroImage: "/images/blog/thesis-proofreading-checklist-hero-v2.png",
    heroImageAlt: "Doctoral thesis pages beside proofreading notes and cautious AI review prompts",
    tableOfContents: [
      { id: "quick-answer", label: "Quick answer" },
      { id: "appropriate-use", label: "Appropriate use" },
      { id: "risks", label: "Risks" },
      { id: "policy", label: "Institutional policies" },
      { id: "citations", label: "Sources and citations" },
      { id: "human-review", label: "Human final review" },
    ],
    body: [
      {
        id: "quick-answer",
        heading: "Can you use AI to proofread a thesis?",
        paragraphs: [
          ["You may be able to use AI to proofread a thesis or dissertation for basic language prompts, but only if your institution permits it and the tool's data handling is appropriate for your material. AI should not be used to hide authorship, bypass academic-integrity rules, invent citations, or make research decisions."],
          ["Graduate communities across r/AskAcademia, r/GradSchool, and r/PhD frequently note a critical trap: students who paste self-written dissertation chapters into general-purpose chatbots with broad prompts like 'rewrite this academically' often trigger 40–80% synthetic-text flags on institutional Turnitin checks, even when all underlying research is original. Use AI cautiously only as a diagnostic prompt on non-sensitive snippets, and rely on your own judgment, supervisor guidance, and a human final review with transparent MS Word Track Changes for the submission version."],
        ],
        callout: {
          title: "Distinguish Diagnostic Checking from Generative Rewriting",
          text: [
            "Using a checker to flag a comma splice or repeated word is fundamentally different from asking a language model to paraphrase whole thesis paragraphs. Most university integrity boards prohibit unattributed generative rewriting of assessed chapters.",
          ],
        },
      },
      {
        id: "appropriate-use",
        heading: "Appropriate support AI can provide (and where to stop)",
        paragraphs: [
          ["When permitted by your faculty or graduate school, basic language tools can act as a fast early-stage diagnostic filter before your draft goes to a human specialist. In limited, low-risk contexts, AI can help you spot repeated words, long multi-clause sentences, spelling variants, inconsistent capitalization, or places where a transition feels abrupt."],
          ["For quick browser-based sentence checks on non-confidential paragraphs up to 1,000 words, our ", { text: "free AI editing tool", href: "/ai-editing-tool" }, " uses zero-data-retention routing so you can test surface clarity before commissioning a human editor."],
        ],
        bullets: [
          ["Flagging possible subject-verb agreement, punctuation, or spelling slips in short paragraphs"],
          ["Identifying sentences above 35–40 words that could be split for examiner readability"],
          ["Prompting you to verify consistent spelling (e.g., British -ise vs. American -ize) within a single section"],
          ["Helping organize a personal proofreading checklist before you review your own chapters"],
        ],
        table: {
          headers: ["Editing Action", "AI Tool / Grammar Plugin", "Human Dissertation Proofreader"],
          rows: [
            ["Comma, typo, and hyphenation checks", "Permitted in most departments on non-sensitive drafts", "Permitted across full thesis with MS Word Track Changes"],
            ["Full-paragraph paraphrasing", "High risk — flattens academic voice and triggers Turnitin AI flags", "Prohibited under ethical proofreading; edits stay local to clarity"],
            ["Participant interview transcripts & ethics data", "Risky — public tools may violate IRB/ethics confidentiality", "Handled securely in private encrypted portal with NDA-level privacy"],
            ["Cross-chapter citations & reference list audit", "Cannot verify 150+ entries across 250 pages reliably", "Audits in-text vs. bibliography alignment and flags missing details"],
            ["Proof of authorship trail", "None if pasted over in clean document", "Timestamped MS Word Track Changes + margin queries returned"],
          ],
        },
      },
      {
        id: "risks",
        heading: "Risks to meaning, confidentiality, Turnitin scores, and academic integrity",
        paragraphs: [
          ["Theses and dissertations contain specialist terminology, unpublished empirical findings, human-participant interview transcripts, ethics committee material, and institutional intellectual property. Pasting embargoed chapters or medical data into consumer AI platforms without institutional authorization can breach ethics approvals and data-protection rules."],
          ["Even when privacy is not violated, automated rewrites routinely flatten cautious scholarly language. An AI tool often replaces careful empirical hedges ('these findings suggest a tentative association within our sample') with sweeping absolutes ('this proves definitively') or swaps domain-specific terminology for generic business synonyms. Worse still, Grammarly's generative rewrite suggestions and LLM paraphrasers reduce natural sentence-length variance (burstiness), which causes university AI indicators to flag your own original ideas."],
        ],
        trackedChanges: {
          context: "PhD Education Thesis Chapter 4 (Qualitative Participant Findings)",
          rawDraft:
            "Moreover, this pivotal thematic analysis clearly demonstrates that digital onboarding always bridges every equity gap in remote classrooms.",
          humanRevision:
            "Across the 24 faculty interviews analyzed in Chapter 4, structured digital onboarding appeared to mitigate early navigation barriers, though access inequities persisted in low-bandwidth households.",
          marginComment:
            "COMMENT [Humanities & Education Desk]: Removed automated filler ('pivotal', 'clearly demonstrates', 'always bridges every gap') and anchored the interpretation to your actual qualitative sub-theme from Section 4.3.",
          styleStandard: "University Third-Party Proofreading Ethics & APA 7th",
        },
      },
      {
        id: "policy",
        heading: "Check institutional policies and supervisor expectations before using AI",
        paragraphs: [
          ["Universities and departments publish explicit rules governing AI disclosure, data security, and third-party proofreading. Before submitting a dissertation or thesis, verify your graduate school handbook: some faculties allow grammar checkers without declaration, others mandate a formal AI-use disclosure statement in the front matter, and many strictly forbid generative paraphrasing tools."],
          ["By contrast, third-party human proofreading is broadly recognized across UK Russell Group universities, North American graduate schools, and Australian institutions when confined to grammar, syntax, clarity, punctuation, formatting, and citation consistency. Our ", { text: "editorial policy", href: "/editorial-policy" }, " enforces strict authorship preservation: editors refine the writing you supply without inventing data, writing chapters, or altering research conclusions. For a deep look at senate regulations worldwide, read our guide on ", { text: "university rules on hiring a thesis editor", href: "/blog/is-it-ethical-to-hire-a-thesis-editor-university-rules" }, "."],
        ],
      },
      {
        id: "citations",
        heading: "AI should not verify sources, DOIs, or citations for you",
        paragraphs: [
          ["Never ask a generative AI model to complete missing bibliography details, generate DOIs, format obscure archival sources from memory, or verify whether an in-text citation accurately represents a cited paper. Language models frequently fabricate plausible-looking page numbers, volume issues, and author initials—errors that thesis examiners catch during spot-checks."],
          ["Citation accuracy belongs strictly to the author. Manage references in Zotero, EndNote, or Mendeley alongside verified publisher PDFs, then use a human proofreader to cross-check spelling, publication years, hanging indents, and one-to-one alignment between your body text and reference list."],
        ],
      },
      {
        id: "human-review",
        heading: "Use a human final review with MS Word Track Changes for the submission version",
        paragraphs: [
          ["A specialist human proofreader inspects the entire dissertation as one connected argument—preserving your voice, respecting verbatim participant quotes, checking tables and captions, and inserting clear margin comments wherever a claim needs author verification. Every edit arrives in timestamped Microsoft Word Track Changes (`All Markup`), giving you an auditable revision record if your committee or integrity officer ever reviews your drafting history."],
          ["For a complete pre-submission sequence, follow ", { text: "how to proofread a dissertation", href: "/blog/how-to-proofread-a-dissertation-before-submission" }, ", compare ", { text: "thesis editing", href: "/thesis-editing" }, " vs. our ", { text: "dissertation proofreading service", href: "/dissertation-proofreading" }, ", or test our approach with a Free 300-Word Human Sample Edit."],
        ],
        checklist: {
          title: "Safe Thesis Proofreading Compliance Checklist",
          items: [
            ["Read your department's AI disclosure and third-party proofreading policy before running any automated tool."],
            ["Never paste unpublished human-subject transcripts or proprietary lab data into consumer AI chatbots."],
            ["Reject automated rewrites that introduce stock phrases ('delve', 'tapestry', 'underscores') or remove methodological hedging."],
            ["Keep your pre-edit draft, the human editor's Tracked-Changes `.docx`, and your final accepted file in one archive folder."],
          ],
        },
      },
    ],
    faq: [
      { question: "Can AI proofread a dissertation safely?", answer: "Only within the rules that apply to your institution and only with material that is safe to upload. Confidential or restricted research should not be pasted into tools that are not approved." },
      { question: "Can AI check thesis citations?", answer: "AI may flag visible inconsistencies, but authors must verify every source, citation, DOI, URL, and reference-list entry against reliable records." },
      { question: "Should I disclose AI proofreading?", answer: "Follow your institution's policy. This article does not advise hiding AI use or bypassing academic-integrity systems." },
    ],
    internalLinks: [
      { href: "/ai-editing-tool", label: "AI editing tool", description: "Use a quick first pass on short, permitted text." },
      { href: "/dissertation-proofreading", label: "Dissertation proofreading", description: "Get human review for language, consistency, formatting, and presentation." },
      { href: "/editorial-policy", label: "Editorial policy", description: "Review the boundaries of ethical editing support." },
      { href: "/blog/is-it-ethical-to-hire-a-thesis-editor-university-rules", label: "University proofreading rules", description: "Understand third-party editing rules across US, UK, Canadian, and Australian universities." },
    ],
  },
  {
    title: "How Long Does Dissertation Proofreading Take?",
    slug: "how-long-does-dissertation-proofreading-take",
    excerpt: "Understand the factors that affect dissertation proofreading time, including word count, draft quality, references, formatting, review passes, and tracked changes.",
    category: "Thesis and Dissertation",
    author,
    reviewer: "Senior Academic Editorial Board — My Editing and Proofreading Desk",
    editorialDesk: "Doctoral Scheduling & Production Desk",
    styleStandards: ["APA 7th Ed.", "Chicago 17th Ed.", "Harvard / OSCOLA / University Deposit Rules"],
    datePublished: published,
    dateUpdated: updated,
    readingTime: "10 min read",
    metaTitle: "How Long Does Dissertation Proofreading Take? (Time Guide)",
    metaDescription: "See how long dissertation proofreading takes for 10,000 to 80,000+ words: realistic 24-hour to 14-day turnaround schedules, pass order, and Track Changes.",
    heroImage: "/images/blog/dissertation-proofreading-checklist-hero.png",
    heroImageAlt: "Dissertation draft, calendar, and proofreading notes showing turnaround planning",
    tableOfContents: [
      { id: "quick-answer", label: "Quick answer" },
      { id: "time-factors", label: "Timing factors" },
      { id: "review-passes", label: "Review passes" },
      { id: "timeline-examples", label: "Timeline examples" },
      { id: "tracked-changes", label: "Tracked changes" },
      { id: "plan", label: "How to plan" },
    ],
    body: [
      {
        id: "quick-answer",
        heading: "How long dissertation proofreading takes",
        paragraphs: [
          ["Dissertation proofreading typically takes 3 to 7 days for Master's dissertations ranging from 10,000 to 25,000 words, while full doctoral dissertations of 50,000 to 80,000+ words generally require 7 to 14 days. Express 24-hour to 72-hour turnarounds are feasible for shorter drafts or individual chapters, provided the draft language is reasonably clear and formatting rules are supplied up front."],
          ["Crucially, total timeline planning must include two distinct blocks: (1) the editor's multi-pass review window, and (2) your own post-delivery buffer of 2 to 4 days to inspect Microsoft Word Track Changes, answer editor margin queries, refresh automated tables of contents, and verify the exported submission PDF."],
        ],
        callout: {
          title: "Realistic Human Reading Speed Benchmark",
          text: [
            "An experienced academic proofreader accurately processes roughly 1,800 to 3,000 words per hour for final proofreading (or 1,000 to 1,800 words per hour for ESL-heavy substantive editing), plus dedicated time for bibliography matching and layout checks.",
          ],
        },
      },
      {
        id: "time-factors",
        heading: "Factors that affect dissertation proofreading turnaround",
        paragraphs: [
          ["A 12,000-word dissertation with clean formatting is very different from a 45,000-word thesis packed with statistical tables, archival footnotes, appendices, and unresolved supervisor comments. Understanding the five main pacing variables helps you select a realistic schedule in our ", { text: "pricing calculator", href: "/pricing" }, " without risking rushed work."],
          ["Remember also that documents above 50,000 words exceed standard automated calculator thresholds and receive a custom timeline assessment so an appropriate senior specialist can review all chapters consecutively without quality loss."],
        ],
        table: {
          headers: ["Factor", "Why it affects time", "What to prepare"],
          rows: [
            ["Word count", "More words require more reading and cross-checking hours", "Confirm the final word count (including footnotes and bibliography) before booking"],
            ["Draft language condition", "Heavy ESL syntax fixes or structural polishing take 1.5×–2× longer than surface proofreading", "Send the cleanest, most stable version after supervisor feedback"],
            ["Tables, figures, and equations", "Captions, axis labels, units, and in-text callouts require independent verification", "Ensure final tables and figures are embedded in the master Word file"],
            ["Citations and bibliography", "Auditing 150–300 references for APA/Harvard/Chicago consistency adds hours of precision work", "State the exact style manual and keep Zotero/EndNote fields clean"],
            ["Institutional formatting", "Front matter pagination, Roman/Arabic breaks, and margins require layout checks", "Attach your graduate school or ProQuest formatting template"],
          ],
        },
      },
      {
        id: "review-passes",
        heading: "A thorough dissertation proofread uses more than one pass",
        paragraphs: [
          ["Asking one hurried read-through to catch grammar errors, terminology drift, broken cross-references, citation mismatches, and margin shifts almost guarantees missed mistakes. A disciplined dissertation review separates tasks into sequential passes:"],
        ],
        numberedSteps: [
          ["Pass 1 — Mechanical language and syntax review: Correcting grammar, spelling consistency (UK, US, or Canadian), punctuation, tense shifts, and awkward phrasing line by line."],
          ["Pass 2 — Terminology and construct consistency: Checking that variable names, participant labels, acronym expansions, and theoretical terms match from Abstract through Conclusion."],
          ["Pass 3 — Tables, figures, and cross-references: Verifying caption sequence, narrative callouts, units, and decimal consistency."],
          ["Pass 4 — Citation and reference reconciliation: Matching in-text author-year tags or footnotes against the terminal reference list and checking style-guide punctuation."],
          ["Pass 5 — Front matter, heading hierarchy, and final layout: Auditing Word styles, Table of Contents accuracy, page breaks, and pagination before final delivery."],
        ],
      },
      {
        id: "timeline-examples",
        heading: "Example proofreading timelines by dissertation length and condition",
        paragraphs: [
          ["The planning ranges below illustrate typical schedules rather than rigid guarantees—availability, file complexity, and whether you require substantive editing versus final proofreading all influence exact delivery dates. When your deadline is tight, submitting early chapters individually while finishing your Conclusion can keep your schedule on track."],
        ],
        table: {
          headers: ["Dissertation length & condition", "Typical editorial window", "Recommended author review buffer", "Best planning strategy"],
          rows: [
            ["5,000–10,000 words (Single chapter or short thesis)", "24 hours to 3 days", "1 day", "Ideal for chapter-by-chapter editing ahead of supervisor meetings"],
            ["12,000–20,000 words (Master's dissertation)", "3 to 7 days", "1–2 days", "Book once supervisor approves chapter order; reserve time for PDF check"],
            ["25,000–45,000 words (Extended thesis / MPhil)", "5 to 10 days", "2–3 days", "Choose a 7-day or 14-day turnaround for careful citation cross-checking"],
            ["50,000–80,000+ words (Full PhD dissertation)", "10 to 14+ days (custom quote)", "3–4 days", "Submit custom review request 3 weeks before deposit deadline"],
          ],
        },
        trackedChanges: {
          context: "PhD Dissertation Proofreading (Front Matter & Chapter 4 Consistency Check)",
          rawDraft:
            "As illustrated in Figure 4.2 below, average response latency dropped 18% (table 4.1), demonstrating the protocol works.",
          humanRevision:
            "As illustrated in Figure 4.2, mean response latency declined by 18.2% compared with baseline (see Table 4.1), supporting the efficiency of the revised protocol.",
          marginComment:
            "COMMENT [Doctoral Desk]: Standardized 'Table 4.1' capitalization, aligned percentage to '18.2%' reported in Table 4.1 Row 2 (please confirm), and clarified Figure 4.2 placement (note: Figure 4.2 currently sits at the top of the next page).",
          styleStandard: "APA 7th Ed. Figure/Table Cross-Reference Audit",
        },
      },
      {
        id: "tracked-changes",
        heading: "Leave time to review tracked changes and update Word fields",
        paragraphs: [
          ["Proofreading is not finished the moment the file returns to your dashboard. You still need focused time to review suggested corrections, resolve any editor queries where factual confirmation is required, accept or reject Track Changes, update your Table of Contents and List of Figures (`Update Entire Table`), and export the final PDF. Microsoft explains that tracked changes must be explicitly accepted or rejected to remove markup cleanly; build that final check into your deadline using ", { text: "Microsoft's Track Changes guidance", href: "https://support.microsoft.com/en-us/word/training/track-changes-in-word", external: true }, "."],
          ["Never click 'Accept All Changes' blindly without reading margin comments—some comments deliberately ask you to choose between two technical phrasings or supply a missing page number for a direct quotation."],
        ],
      },
      {
        id: "plan",
        heading: "How to plan backward from your dissertation submission deadline",
        paragraphs: [
          ["Start with your university repository or ProQuest upload cutoff and work backward by at least 7 to 14 days. Lock your content first, run a quick pre-flight check using our ", { text: "step-by-step dissertation proofreading workflow", href: "/blog/how-to-proofread-a-dissertation-before-submission" }, ", and pair it with our ", { text: "dissertation proofreading service", href: "/dissertation-proofreading" }, " or ", { text: "thesis editing service", href: "/thesis-editing" }, " so your final deposit happens calmly rather than minutes before portal lock."],
        ],
        checklist: {
          title: "Backward-Planning Dissertation Timeline Checklist",
          items: [
            ["T-14 to T-21 days (PhD) / T-7 days (Master's): Freeze content and merge chapters into one clean `.docx` file."],
            ["T-10 days: Upload draft with university style guide, dialect preference (UK/US/CA), and exact word count."],
            ["T-3 to T-2 days: Receive Tracked Changes, resolve every margin comment, and accept changes systematically."],
            ["T-1 day: Refresh Table of Contents, List of Tables, and List of Figures; export PDF/A and inspect every page visually."],
          ],
        },
      },
    ],
    faq: [
      { question: "Can a dissertation be proofread in 24 hours?", answer: "Sometimes only a limited final check is realistic in 24 hours. The answer depends on length, draft quality, formatting complexity, and availability." },
      { question: "Should I wait until formatting is complete?", answer: "Major content should be stable before proofreading. Formatting checks usually happen near the end, followed by a final PDF inspection." },
      { question: "Do long dissertations need custom review?", answer: "Yes. Very long or complex dissertations should be scoped before payment so the schedule and deliverables are realistic." },
    ],
    internalLinks: [
      { href: "/dissertation-proofreading", label: "Dissertation proofreading", description: "Review the service scope for long graduate submissions." },
      { href: "/blog/dissertation-proofreading-checklist", label: "Dissertation checklist", description: "Use a 15-point final check before submission." },
      { href: "/pricing", label: "Check pricing", description: "Estimate eligible projects by word count and turnaround." },
      { href: "/submit", label: "Submit your dissertation", description: "Upload the stable file and requirements securely." },
    ],
  },
  {
    title: "British vs American English in Academic Writing",
    slug: "british-vs-american-english-academic-writing",
    excerpt: "Compare British and American English in academic writing, including spelling, punctuation, terminology, quotation conventions, university rules, and consistency.",
    category: "Academic Editing",
    author,
    reviewer: "UK & North American Academic Desks — My Editing and Proofreading Desk",
    editorialDesk: "Cross-Dialect Academic Style Desk",
    styleStandards: ["New Hart's Rules (Oxford UK)", "APA 7th / Chicago 17th (US)", "Canadian Oxford Standard"],
    datePublished: published,
    dateUpdated: updated,
    readingTime: "9 min read",
    metaTitle: "British vs American English in Academic Writing (Full Guide)",
    metaDescription: "Compare British vs American English in academic writing: -ise/-ize spelling, quotation punctuation, date formats, academic vocabulary, and journal rules.",
    heroImage: "/images/blog/research-philosophy-thesis-guide.webp",
    heroImageAlt: "Academic draft showing British and American English spelling choices marked for consistency",
    tableOfContents: [
      { id: "quick-answer", label: "Quick answer" },
      { id: "spelling", label: "Spelling" },
      { id: "punctuation", label: "Punctuation" },
      { id: "terminology", label: "Terminology" },
      { id: "rules", label: "University or journal rules" },
      { id: "consistency", label: "Consistency checklist" },
    ],
    body: [
      {
        id: "quick-answer",
        heading: "British vs American English: choose one and stay consistent",
        paragraphs: [
          ["In academic writing, British and American English are both widely accepted, but mixing spelling conventions, punctuation rules, and regional vocabulary within the same manuscript creates distracting editorial inconsistency. Authors should follow target university or journal guidelines first, maintaining uniform spelling (-ise versus -ize, -our versus -or), quotation punctuation, collective verb agreement, and date formats across body text, tables, figure labels, footnotes, and appendices."],
          ["Mixed English varieties occur frequently when graduate students cite US papers inside a UK thesis, use a US spellchecker by default, or collaborate across international co-author teams."],
        ],
        callout: {
          title: "Never Rely on Default Word-Processor Spellcheck Alone",
          text: [
            "If your Microsoft Word language setting switches between English (UK) and English (US) across pasted paragraphs, both 'analyse' and 'analyze' can pass spellcheck silently in the exact same chapter.",
          ],
        },
      },
      {
        id: "spelling",
        heading: "Key spelling differences to audit across the entire document",
        paragraphs: [
          ["British and American orthography differ across several systematic suffix patterns. Note an important subtlety in UK academic publishing: while general UK universities and many journals favour '-ise' ('analyse', 'organise', 'realise'), Oxford University Press and some Commonwealth style manuals accept '-ize' ('organize', 'realize') paired with British '-our' and '-re' spellings—though 'analyse' and 'paralyse' always keep the 's'. Pick one verified system and apply it everywhere."],
          ["Do not stop at body paragraphs: check abstract keywords, headings, table column headers, figure legends, and appendix titles. Only direct quotations and published book/article titles in your reference list retain their original source spelling."],
        ],
        table: {
          headers: ["Category", "British English (UK)", "American English (US)", "Editorial Rule"],
          rows: [
            ["-ise / -ize verbs", "analyse, organise, recognise, emphasise", "analyze, organize, recognize, emphasize", "Oxford -ize is valid in UK style only if used uniformly (analyse remains -yse)"],
            ["-our / -or nouns", "behaviour, colour, labour, favour", "behavior, color, labor, favor", "Check derived forms too (behavioural vs. behavioral)"],
            ["-re / -er endings", "centre, metre, fibre, theatre", "center, meter, fiber, theater", "Note scientific SI unit exception: 'meter' for measuring devices vs. 'metre' for length in UK"],
            ["-ogue / -og", "dialogue, catalogue, analogue", "dialog (or dialogue), catalog, analog", "US academic prose often retains 'dialogue' while favoring 'analog'"],
            ["Double 'l' before suffixes", "travelling, cancelled, labelled, modelling", "traveling, canceled, labeled, modeling", "Common source of quiet inconsistency in longitudinal methods sections"],
            ["ae / oe ligatures", "anaemia, paediatric, foetus, diarrhoea", "anemia, pediatric, fetus, diarrhea", "Critical in clinical medicine and nursing manuscripts"],
          ],
        },
      },
      {
        id: "punctuation",
        heading: "Quotation marks, commas, periods, and date conventions",
        paragraphs: [
          ["Dialect conventions extend well beyond spelling into punctuation mechanics. In traditional British publishing (such as MHRA and Oxford style), initial quotations use single quotation marks ('like this') with double quotes nested inside, and periods or commas sit outside closing quotation marks unless part of the original quoted sentence ('logical punctuation'). In American style (APA 7, MLA 9, Chicago 17), double quotation marks (\"like this\") are standard, and periods and commas sit inside closing quotation marks."],
          ["Serial (Oxford) commas also differ: American APA and Chicago manuals strictly mandate the serial comma ('data, methods, and ethics'), whereas many British style guides omit it unless needed to prevent ambiguity. Date formatting follows '16 November 2026' (day-month-year, no comma) in British prose versus 'November 16, 2026' (month-day-year, with comma) in American prose."],
        ],
        trackedChanges: {
          context: "International Business Manuscript (Converted from Mixed US/UK to Strict British English)",
          rawDraft:
            "On November 16, 2026, the labor ministry emphasized that \"organizational behavior\" programs improved outcomes, analyzing data across 4 urban centers.",
          humanRevision:
            "On 16 November 2026, the labour ministry emphasised that 'organisational behaviour' programmes improved outcomes, analysing data across four urban centres.",
          marginComment:
            "COMMENT [UK & Commonwealth Desk]: Standardized US dates, spelling ('labour', 'emphasised', 'organisational behaviour', 'programmes', 'analysing', 'centres'), single quotation marks, and spelled-out numeral 'four' for UK university submission.",
          styleStandard: "British Academic English (New Hart's Rules)",
        },
      },
      {
        id: "terminology",
        heading: "Academic vocabulary, collective nouns, and false assumptions",
        paragraphs: [
          ["Regional terminology differences can alter how examiners or reviewers read your paper. In US universities, 'thesis' typically denotes a Master's project and 'dissertation' a PhD project; in the UK, that usage is reversed ('dissertation' for Bachelor's/Master's and 'thesis' for PhD). Similarly, UK institutions use 'mark', 'module', and 'programme' (except 'computer program'), whereas US institutions use 'grade', 'course', and 'program'."],
          ["Collective nouns also take different verb agreements: American academic English treats institutions, committees, and governments strictly as singular ('the committee has decided'), whereas British academic English allows plural verbs when referring to members acting together ('the government have argued' or 'the team are reviewing'), though singular consistency is safer in formal scientific prose."],
        ],
      },
      {
        id: "rules",
        heading: "University, journal, and regional rules always take priority",
        paragraphs: [
          ["If your UK university department instructs you to submit in APA 7th Edition, follow APA's punctuation and reference rules while keeping British spelling—unless your supervisor specifies US English throughout. Conversely, if a UK-based researcher submits to an American IEEE or APA journal, adopting American English conventions (or confirming the journal accepts consistent British English) prevents unnecessary copyediting queries."],
          ["Canadian and Australian researchers face hybrid standards: Canadian academic style generally pairs British '-our' and '-re' with American '-ize' ('colour' + 'organize'), whereas Australian style leans British ('colour' + 'organise') while maintaining 'program'. Always specify your target dialect before commissioning ", { text: "translation review", href: "/translation-review" }, " or ", { text: "academic proofreading", href: "/academic-proofreading" }, "."],
        ],
      },
      {
        id: "consistency",
        heading: "British and American English consistency checklist",
        paragraphs: [
          ["Before submitting a thesis or journal paper, run targeted Ctrl+F searches across the whole manuscript—including footnotes, figure labels, and tables—to catch leftover cross-dialect spellings. Use our ", { text: "academic proofreading service", href: "/academic-proofreading" }, " or pair this check with our ", { text: "PhD thesis proofreading checklist", href: "/blog/thesis-proofreading-checklist" }, " for complete final verification."],
        ],
        checklist: {
          title: "Dialect Lock Pre-Submission Checklist",
          items: [
            ["Set the entire Microsoft Word document proofing language uniformly to English (UK), English (US), English (Canada), or English (Australia)."],
            ["Run targeted searches for '-ize/-ise', '-our/-or', '-re/-er', 'modelling/modeling', and 'programme/program'."],
            ["Check quotation mark style (single vs. double) and punctuation placement inside vs. outside closing quotes."],
            ["Preserve original spelling strictly inside verbatim direct quotes and reference-list source titles."],
          ],
        },
      },
    ],
    faq: [
      { question: "Is British English better for academic writing?", answer: "No. British and American English can both be acceptable. The required style depends on your university, journal, publisher, discipline, and audience." },
      { question: "Can I mix British and American spelling?", answer: "Avoid mixing spelling varieties unless a quoted source or official title requires it. Consistency makes the document easier to read and review." },
      { question: "Should references be changed to match my English variety?", answer: "Do not change the spelling of source titles unless the required style explicitly allows title-case or sentence-case adjustments. Preserve source details accurately." },
    ],
    internalLinks: [
      { href: "/academic-proofreading", label: "Academic proofreading", description: "Check language consistency before academic submission." },
      { href: "/translation-review", label: "Translation review", description: "Polish translated English for natural phrasing and terminology." },
      { href: "/blog/thesis-proofreading-checklist", label: "PhD thesis checklist", description: "Use a long-document final review checklist." },
    ],
  },
  {
    title: "Common APA 7 Reference List Errors Before Submission",
    slug: "apa-7-reference-list-mistakes",
    excerpt: "Review common APA 7 reference list mistakes before submission, including missing entries, author names, dates, titles, DOIs, URLs, and hanging indents.",
    category: "Formatting and References",
    author,
    reviewer: "Social Sciences & APA Compliance Desk — My Editing and Proofreading Desk",
    editorialDesk: "APA 7th Edition Verification Desk",
    styleStandards: ["APA Publication Manual (7th Ed.)", "Crossref DOI Guidelines"],
    datePublished: published,
    dateUpdated: updated,
    readingTime: "10 min read",
    metaTitle: "APA 7 Reference List Mistakes: 10 Errors to Fix Now",
    metaDescription: "Fix the most common APA 7 reference list mistakes before submission: sentence-case article titles, 20-author et al. rules, DOIs, and hanging indents.",
    heroImage: "/images/blog/thesis-tables-figures-references-checklist.webp",
    heroImageAlt: "Reference list and citation notes being checked before academic submission",
    tableOfContents: [
      { id: "quick-answer", label: "Quick answer" },
      { id: "missing-mismatched", label: "Missing or mismatched entries" },
      { id: "elements", label: "Reference elements" },
      { id: "doi-url", label: "DOIs and URLs" },
      { id: "formatting", label: "Formatting" },
      { id: "final-check", label: "Final check" },
    ],
    body: [
      {
        id: "quick-answer",
        heading: "APA 7 reference list mistakes to check first",
        paragraphs: [
          ["The most frequent APA 7th Edition reference-list mistakes are missing or uncited entries, lingering APA 6th habits (such as writing 'Retrieved from' or including publisher cities), headline-case article titles instead of sentence case, truncated author lists before 20 authors, inconsistent DOI links, and missing 0.5-inch hanging indents."],
          ["Examiners and journal copyeditors routinely spot-check the References section first because citation discipline reflects overall research care."],
        ],
        callout: {
          title: "Top APA 6 -> APA 7 Changes Students Still Miss",
          text: [
            "APA 7 removed publisher city/state locations for books, removed 'Retrieved from' before standard URLs, switched DOIs strictly to clickable 'https://doi.org/...' URLs, and expanded the in-text 'et al.' rule to 3+ authors from the very first citation.",
          ],
        },
      },
      {
        id: "missing-mismatched",
        heading: "1. Missing, orphaned, or mismatched in-text citations and references",
        paragraphs: [
          ["In APA 7, the References list must match your body text one-to-one (the sole narrow exceptions are classical works, personal communications, and whole websites mentioned generally). Every parenthetical or narrative citation in your chapters must have a complete entry in References, and every entry in References must be cited at least once in the text."],
          ["Run a two-way reconciliation check after final revisions: authors commonly delete a paragraph during editing without removing its bibliography item, leaving 'orphan references', or merge drafts from two co-authors whose surname spellings or publication years conflict (e.g., 'McAllister, 2022' in Chapter 2 vs. 'MacAllister, 2023' in the reference list)."],
        ],
      },
      {
        id: "elements",
        heading: "2. Incorrect author counts, dates, and title capitalization",
        paragraphs: [
          ["APA's official framework organizes every entry into four core elements: author, date, title, and source. Consult the ", { text: "APA reference examples", href: "https://apastyle.apa.org/style-grammar-guidelines/references/examples", external: true }, " and ", { text: "reference element guidance", href: "https://apastyle.apa.org/style-grammar-guidelines/references/elements-list-entry", external: true }, " whenever formatting an unusual report, preprint, or dataset rather than trusting database exports blindly."],
          ["Four mechanical errors account for most deductions: (a) leaving article or book titles in Title Case rather than Sentence Case (only the first word, first word after a colon, and proper nouns should be capitalized); (b) forgetting that APA 7 lists up to 20 authors in References (use '...' before the final author only for 21+ authors); (c) writing full author first names instead of initials with spaces ('Smith, J. R.'); and (d) italicizing the article title instead of the journal title and volume number."],
        ],
        table: {
          headers: ["Element", "Common APA 7 mistake", "Correct APA 7 rule"],
          rows: [
            ["Authors (References)", "Truncating at 7 authors (old APA 6 rule) or omitting spaces between initials", "List up to 20 authors; format initials with spaces ('Patel, S. K., & Lee, H.')"],
            ["In-text citations", "Listing 3–5 authors on first mention before switching to 'et al.'", "Use 'et al.' from the very first citation for 3 or more authors"],
            ["Article / Book Title", "Using Title Case downloaded from Google Scholar or Scopus", "Use sentence case (capitalize first word, subtitle word after colon, proper nouns)"],
            ["Book Publisher", "Including 'New York, NY: Routledge' or 'SAGE Publications Inc.'", "Omit city/state locations and corporate suffixes ('Routledge')"],
            ["Journal Italics", "Italicizing article title or omitting italics on volume number", "Italicize the journal title and volume number only (e.g., *Journal Name, 14*(2))"],
          ],
        },
        trackedChanges: {
          context: "Psychology Dissertation Reference List (Fixing Legacy APA 6 + Scraper Defects)",
          rawDraft:
            "Patel, Sanjay & Lee, H.W. (2024). Cognitive Load in Remote Teams: A Meta-Analysis. Journal of Applied Psychology, 109(3), pp. 412-429. doi:10.1037/apl0001122",
          humanRevision:
            "Patel, S., & Lee, H. W. (2024). Cognitive load in remote teams: A meta-analysis. *Journal of Applied Psychology*, *109*(3), 412–429. https://doi.org/10.1037/apl0001122",
          marginComment:
            "COMMENT [APA 7th Desk]: Converted full name 'Sanjay' to initial, spaced 'H. W.', converted article title to sentence case (preserving 'A' after colon), removed 'pp.' (never used for journal articles in APA), italicized journal and volume, and updated DOI to active https://doi.org/ URL.",
          styleStandard: "APA Publication Manual (7th Edition)",
        },
      },
      {
        id: "doi-url",
        heading: "3. Broken DOIs, 'Retrieved from' prefixes, and dead URLs",
        paragraphs: [
          ["Database exports routinely output outdated formats such as `doi:10.xxxx`, `http://dx.doi.org/`, or `Retrieved from https://...`. Under APA 7th Edition rules, all DOIs must be formatted as active `https://doi.org/` links with no trailing period after the link, and 'Retrieved from' is omitted unless citing an unstable webpage that updates continuously (in which case an archival retrieval date is added)."],
          ["Review APA's official ", { text: "DOI and URL guidance", href: "https://apastyle.apa.org/style-grammar-guidelines/references/dois-urls", external: true }, " and click-test every URL before PDF conversion. Never allow an AI tool to guess or complete a missing DOI—always verify via Crossref or the publisher page."],
        ],
      },
      {
        id: "formatting",
        heading: "4. Reference-list hanging indents, alphabetization, and spacing",
        paragraphs: [
          ["Visual layout matters just as much as citation syntax. Ensure the section heading **References** is bold and centered, entries are double-spaced throughout with zero extra blank lines between entries, and every entry uses a true **0.5-inch hanging indent** created via Paragraph settings (not manual Tab keys or Enter breaks that collapse when margins shift)."],
          ["Sort entries strictly alphabetically letter-by-letter by the first author's surname (ignoring spaces and hyphens—so 'De La Cruz' precedes 'Delgado'), and order multiple works by the exact same sole author chronologically from earliest to latest, using `2024a`, `2024b` for same-year works."],
        ],
      },
      {
        id: "final-check",
        heading: "Final APA 7 reference-list check before upload",
        paragraphs: [
          ["Before submitting your thesis, research paper, or dissertation, run a two-way citation cross-check, convert automated Zotero or EndNote bibliography errors cleanly, and inspect your exported PDF. Our ", { text: "academic proofreading service", href: "/academic-proofreading" }, " and ", { text: "document formatting service", href: "/document-formatting" }, " review APA 7 reference presentation alongside language clarity, while authors retain full responsibility for source accuracy."],
        ],
        checklist: {
          title: "10-Point APA 7 Reference List Audit Checklist",
          items: [
            ["Every in-text citation matches an entry in References—and zero uncited 'orphan' entries remain."],
            ["All 3+ author works use 'et al.' from the first in-text mention, while References lists up to 20 authors."],
            ["Article, chapter, and book titles use sentence case; journal names use title case and italics."],
            ["Book publisher locations (cities/states) and 'Retrieved from' prefixes are completely removed."],
            ["Every DOI uses 'https://doi.org/...' without a trailing period, and a true 0.5-inch hanging indent is applied."],
          ],
        },
      },
    ],
    faq: [
      { question: "Can a proofreader fix APA 7 references?", answer: "A proofreader can check visible consistency, formatting, missing details, and citation-reference matching in the supplied document. Full source verification should be agreed separately." },
      { question: "Should I include sources I read but did not cite?", answer: "Follow your assignment or publication rules. In most APA reference lists, entries should correspond to cited works rather than a broad reading list." },
      { question: "Can AI generate missing APA references?", answer: "Do not rely on AI to invent missing source details. Verify each author, date, title, DOI, and URL against a reliable record." },
    ],
    internalLinks: [
      { href: "/academic-proofreading", label: "Academic proofreading", description: "Check reference presentation and academic language before submission." },
      { href: "/document-formatting", label: "Document formatting", description: "Prepare reference-heavy files for final submission." },
      { href: "/blog/thesis-tables-figures-references-checklist", label: "Reference checklist", description: "Use a broader thesis tables, figures, and references audit." },
    ],
  },
  {
    title: "CV and Resume Proofreading Checklist Before Applying",
    slug: "cv-proofreading-checklist",
    excerpt: "Use this CV proofreading checklist before applying to check contact details, dates, tense, achievement wording, layout, spelling, file naming, and PDF export.",
    category: "Careers and Applications",
    author,
    reviewer: "Executive Careers & Academic CV Desk — My Editing and Proofreading Desk",
    editorialDesk: "Careers, Fellowship & Application Review Desk",
    styleStandards: ["ATS-Safe Document Formatting", "Academic CV Conventions", "US / UK / CA Resume Standards"],
    datePublished: published,
    dateUpdated: updated,
    readingTime: "9 min read",
    metaTitle: "CV & Resume Proofreading Checklist for Job & PhD Applicants",
    metaDescription: "Run this CV and resume proofreading checklist before applying: fix tense consistency, date formatting, achievement metrics, ATS layout, and PDF exports.",
    heroImage: "/images/blog/research-paper-editing-checklist-before-submission.webp",
    heroImageAlt: "CV and resume document being reviewed for spelling, dates, layout, and final export",
    tableOfContents: [
      { id: "quick-answer", label: "Quick answer" },
      { id: "checklist", label: "Checklist" },
      { id: "tailoring", label: "Role-specific tailoring" },
      { id: "final-file", label: "Final file" },
    ],
    body: [
      {
        id: "quick-answer",
        heading: "CV proofreading checklist: what to check before applying",
        paragraphs: [
          ["Before sending an industry resume, academic CV, fellowship application, or cover letter, audit eight high-impact details: verified contact links, uniform date ranges, active verb tense consistency, truthful achievement phrasing, company and technical spelling, clean hierarchy without broken tables, professional file naming, and final PDF rendering."],
          ["Hiring managers and doctoral admissions committees spend seconds scanning the first page of a CV. Even minor mechanical slips—a misspelled employer name, mixed hyphen/en-dash date formats, or shifting between past and present tense in the same role—undermine your credibility before your qualifications are evaluated."],
        ],
        callout: {
          title: "Academic CV vs. Industry Resume Scope",
          text: [
            "Academic CVs showcase publications, grants, teaching, and service at full length, while industry resumes condense measurable outcomes into 1–2 scannable pages. Never mix both formats in one application.",
          ],
        },
      },
      {
        id: "checklist",
        heading: "Complete CV and resume proofreading checklist",
        paragraphs: [
          ["Run through each area systematically after all experience updates are complete and before uploading your file to Workday, Greenhouse, Interfolio, or university recruitment portals."],
          ["Pay particular attention to consistency across bullets: either end every full-sentence bullet with a period or omit trailing periods consistently across every job entry—never alternate randomly."],
        ],
        table: {
          headers: ["Audit Area", "What to verify", "Common Mistake to Catch"],
          rows: [
            ["Contact & Links", "Email, phone, city, LinkedIn URL, ORCID/Google Scholar links", "Broken mailto: links or outdated university emails"],
            ["Date Formatting", "Consistent Month Year–Month Year (e.g., May 2023–Aug 2026)", "Mixing '05/23 - present', 'May 2023–Current', and single hyphens"],
            ["Verb Tense", "Present tense for active current responsibilities; past tense for completed roles", "Writing 'Manage team' alongside 'Developed roadmap' in one job"],
            ["Action Verbs & Impact", "Strong active verbs leading each bullet with truthful scope", "Passive 'Responsible for...' or 'Helped with...' phrasing"],
            ["Publications & Degrees", "Exact journal titles, italicization, co-author order, degree names", "Writing 'Bachelors' instead of 'Bachelor's' or misquoting paper status"],
            ["Typography & Layout", "Margins, bullet alignment, consistent font sizes, zero orphan headings", "Section header stranded alone at the bottom of Page 1"],
            ["File Naming", "FirstName-LastName-CV-2026.pdf or Role-Specific-Resume.pdf", "Uploading 'Resume_FINAL_v4_edited(1).docx'"],
            ["PDF & ATS Export", "Selectable text, working hyperlinks, clean copy-paste order", "Multi-column text boxes garbled by Applicant Tracking Systems"],
          ],
        },
        trackedChanges: {
          context: "PhD Graduate Resume & Cover Letter Application (Biotech R&D Role)",
          rawDraft:
            "Responsible for doing assays and helping manage lab inventory from Jan 2022 - present; also led a team of 4 undergrads and improved data processing speed.",
          humanRevision:
            "• Standardized qPCR assay workflows across 180+ weekly samples and supervised four undergraduate research assistants.\n• Automated Python quality-control scripts, reducing raw dataset preprocessing time from 4 hours to 45 minutes.",
          marginComment:
            "COMMENT [Careers Desk]: Replaced passive 'Responsible for...' with active past/present-aligned bullets, separated distinct accomplishments, spelled out 'four' under 10, and preserved exact metrics supplied in your lab notes.",
          styleStandard: "Executive & STEM Resume Clarity Standard",
        },
      },
      {
        id: "tailoring",
        heading: "Tailor your CV or resume without inventing experience",
        paragraphs: [
          ["Role-specific tailoring means foregrounding the skills, tools, coursework, publications, and measurable deliverables most relevant to the target job or fellowship—not inventing roles, employers, inflated metrics, or unearned credentials. Even well-meaning AI resume builders frequently hallucinate inflated percentages or corporate buzzwords that candidates cannot defend during technical interviews."],
          ["Instead of padding bullets with vague adjectives ('dynamic', 'results-driven', 'synergistic'), mirror the exact operational nouns and technical competencies stated in the job advertisement or fellowship call. Keep a master archive CV containing every publication, grant, teaching module, and project metric you have ever completed, then duplicate and prune a clean, targeted file for each application so you never accidentally drop dates or misquote award totals under deadline pressure."],
          ["Our ", { text: "CV and resume editing service", href: "/cv-resume-editing" }, " sharpens sentence clarity, verb strength, hierarchy, and scannability strictly from the facts you supply. If you are transitioning from graduate school into private industry or applying for academic postdocs, see our dedicated guide on ", { text: "converting an academic CV into an industry resume", href: "/blog/academic-cv-vs-industry-resume-phd-masters-guide" }, "."],
        ],
      },
      {
        id: "final-file",
        heading: "Final file, cover letter, and ATS checks before applying",
        paragraphs: [
          ["Before clicking submit, export your edited `.docx` file to PDF (unless the application portal explicitly requests Word `.docx`), open the PDF on a second screen or phone, highlight and copy all text into plain Notepad/TextEdit to verify the ATS reading order stays intact, and confirm your cover letter repeats the exact job title, company spelling, and hiring manager name cleanly."],
          ["When reviewing your cover letter beside your CV, ensure employment dates, job titles, degree names, and key metrics match across both documents without discrepancy. Finally, verify that hyperlinks to your LinkedIn profile, ORCID record, Google Scholar profile, or online portfolio resolve correctly rather than pointing to broken or private pages."],
        ],
        checklist: {
          title: "Pre-Upload Application File Sign-Off",
          items: [
            ["Verify company name, target role title, and recipient greeting inside your cover letter match the posting word-for-word."],
            ["Check that every bullet period, en-dash in dates (`–`), and bold/italic formatting pattern is uniform from top to bottom."],
            ["Confirm no Word Track Changes, hidden comments, or draft file metadata remain inside the exported PDF."],
            ["Save a clean master `.docx` copy alongside the submitted PDF for interview preparation."],
          ],
        },
      },
    ],
    faq: [
      { question: "Should a CV be proofread as a PDF or Word file?", answer: "Check both when possible. Edit in the source file, then inspect the exported PDF because spacing, links, and page breaks can change." },
      { question: "Can an editor improve my CV achievements?", answer: "An editor can improve clarity and wording using the facts you provide. They should not invent achievements, metrics, employers, dates, or qualifications." },
      { question: "Is a resume proofreading checklist enough?", answer: "A checklist helps with final errors. If the document needs stronger structure, focus, or wording, CV editing may be more useful." },
    ],
    internalLinks: [
      { href: "/cv-resume-editing", label: "CV and resume editing", description: "Improve application documents without inventing experience." },
      { href: "/proofreading-services", label: "Proofreading services", description: "Get a final check for completed professional documents." },
      { href: "/blog/business-proposal-proofreading-checklist", label: "Business proposal checklist", description: "Review client-facing proposals and business writing." },
      { href: "/blog/academic-cv-vs-industry-resume-phd-masters-guide", label: "Academic CV vs industry resume", description: "Convert and proofread PhD and Master's CVs for academic or corporate applications." },
    ],
  },
  {
    title: "Business Proposal Proofreading Checklist Before Sending",
    slug: "business-proposal-proofreading-checklist",
    excerpt: "Use this business proposal proofreading checklist before sending a client-ready proposal, including names, figures, dates, scope, pricing, grammar, formatting, and final PDF checks.",
    category: "Business Writing",
    author,
    reviewer: "Corporate, Executive & Regulatory Desk — My Editing and Proofreading Desk",
    editorialDesk: "Corporate Proposals & Tender Review Desk",
    styleStandards: ["AP / Economist Business Style", "RFP Compliance Alignment", "Executive Tone Standards"],
    datePublished: published,
    dateUpdated: updated,
    readingTime: "9 min read",
    metaTitle: "Business Proposal Proofreading Checklist for Client Bids",
    metaDescription: "Use this business proposal proofreading checklist to check client names, figures, dates, scope, deliverables, pricing, grammar, formatting, and final PDF.",
    heroImage: "/images/hero/editor_business_1777475328522.png",
    heroImageAlt: "Business proposal being proofread before client delivery",
    tableOfContents: [
      { id: "quick-answer", label: "Quick answer" },
      { id: "proposal-checklist", label: "Checklist" },
      { id: "version-control", label: "Version control" },
      { id: "final-pdf", label: "Final PDF" },
    ],
    body: [
      {
        id: "quick-answer",
        heading: "Business proposal proofreading before sending",
        paragraphs: [
          ["A business proposal, RFP response, consulting tender, or investor deck should be proofread only after the commercial offer, deliverable schedule, pricing structure, and internal approvals are locked. The final editorial check exists to eliminate errors that quietly erode buyer confidence: misspelled client stakeholder names, mismatched totals between narrative text and fee tables, leftover template text from a previous bid, vague scope exclusions, grammatical slips, and broken PDF formatting."],
          ["When competing bids offer comparable technical capabilities and fees, procurement committees routinely treat clean, internally consistent documentation as a proxy for operational rigor."],
        ],
        callout: {
          title: "Never Copy-Paste a Prior Client Bid Without a Global Search",
          text: [
            "One of the most costly proposal failures occurs when a recycled case study or scope paragraph still carries a former client's company name, currency symbol, or delivery date inside the final PDF.",
          ],
        },
      },
      {
        id: "proposal-checklist",
        heading: "Business proposal proofreading checklist",
        paragraphs: [
          ["Use this structured audit table across every page—including cover slides, executive summary, technical approach, commercial fee schedule, and legal appendices—before sending a client-facing proposal."],
        ],
        table: {
          headers: ["Area", "What to verify in detail", "High-Risk Failure Prevented"],
          rows: [
            ["Client Identity", "Exact legal entity name, stakeholder titles, spelling, and pronouns", "Leftover competitor or prior client names in recycled sections"],
            ["Commercial Figures", "Line-item prices, subtotals, tax treatment (VAT/sales tax), currencies, discounts", "Executive summary quoting $48,000 while fee table totals $52,000"],
            ["Scope & Exclusions", "Included deliverables, client dependencies, out-of-scope assumptions, SLA terms", "Ambiguous 'will support' wording that triggers scope creep disputes"],
            ["Timeline & Milestones", "Phase durations, calendar dates, kickoff assumptions, sign-off gates", "Milestone dates falling on weekends or contradicting RFP deadlines"],
            ["Executive Tone", "Active voice, concrete verbs, client-benefit framing, jargon control", "Tentative hedging ('we hope to try to deliver') weakening authority"],
            ["Compliance Matrix", "Every mandatory RFP question number, word ceiling, and required annex", "Automatic procurement disqualification for missing a numbered response"],
            ["Visual Hierarchy", "Table alignment, chart legibility, header/footer pagination, brand colors", "Split pricing tables missing column headers on Page 2"],
            ["Final Package", "PDF hyperlinks, file naming, attachment alignment, email subject line", "Sending an unflattened draft with internal margin comments visible"],
          ],
        },
        trackedChanges: {
          context: "Enterprise Consulting RFP Response (Executive Summary & Scope Exclusion)",
          rawDraft:
            "Our team hopes to utilize agile workflows to maybe deliver the Phase 2 portal migration for ClientCorp by Q4, assuming they provide us timely server access and all assets.",
          humanRevision:
            "Our delivery team will execute the Phase 2 portal migration in two-week agile sprints targeting Q4 completion, contingent on ClientCorp provisioning staging server access and finalized brand assets by Week 2.",
          marginComment:
            "COMMENT [Corporate Desk]: Replaced tentative phrasing ('hopes to utilize', 'maybe deliver') with authoritative active voice and converted informal 'assuming they provide' into a clear milestone dependency. Please verify 'Week 2' matches Schedule B.",
          styleStandard: "Corporate Executive & Tender Clarity Standard",
        },
      },
      {
        id: "version-control",
        heading: "Control the final proposal version across commercial and technical authors",
        paragraphs: [
          ["Most proposal errors happen in the final four hours before submission, when finance adjusts the pricing schedule in Excel while project managers edit deliverables in Word or PowerPoint. Freeze a single master file, assign one person to merge final pricing numbers into the executive summary, and run a targeted `Ctrl+F` check for `[INSERT]`, `TBD`, `Draft`, and previous client names."],
          ["Where multiple subject-matter experts wrote different sections, a human proofreader harmonizes tone, tense ('we will deliver' vs. 'the vendor delivers'), acronym definitions, and number formatting (`$1.2M` vs. `$1,200,000`) into a unified corporate voice. Cross-check every section cross-reference ('see Appendix B', 'as detailed in Section 3.4') after final pagination changes so evaluators never land on the wrong page or table number."],
        ],
      },
      {
        id: "final-pdf",
        heading: "Check the final PDF, security metadata, and delivery package",
        paragraphs: [
          ["Export the approved document to PDF and inspect every page at 100% zoom. Confirm no tracked changes or internal negotiation comments remain in the exported file, test clickable links to case studies or terms, check table borders across page breaks, and ensure the PDF filename matches the client's procurement naming rules."],
          ["Verify document properties (`File > Info` or PDF Document Properties) so the file title and author metadata reflect your organization rather than a former template or employee name. Confirm that all compliance forms, pricing annexes, and signed declarations appear in the exact sequence mandated by the buyer's RFP checklist."],
          ["Our ", { text: "business proofreading service", href: "/business-proofreading" }, " reviews client proposals, annual reports, white papers, and executive decks on rapid turnarounds; if a draft still requires stronger persuasive structure or executive narrative tightening, start with ", { text: "editing services", href: "/editing-services" }, " before final proofreading."],
        ],
        checklist: {
          title: "15-Minute Pre-Send Corporate Proposal Gate",
          items: [
            ["Confirm every instance of the prospect's company name, project title, and currency matches across cover, header, and fee table."],
            ["Reconcile total contract price in the Executive Summary, Fee Schedule, and Payment Milestones down to the cent."],
            ["Ensure all tracked changes are accepted and all internal reviewer comments are deleted before PDF export."],
            ["Verify attachment count, file size limits, and email recipient addresses before clicking send."],
          ],
        },
      },
    ],
    faq: [
      { question: "When should I proofread a business proposal?", answer: "Proofread after the offer, scope, pricing, dates, and internal approvals are final. Earlier drafts may need editing rather than final proofreading." },
      { question: "Can proofreading improve proposal strategy?", answer: "Proofreading checks correctness and consistency. If the proposal needs stronger positioning, order, or messaging, use editing before proofreading." },
      { question: "Should proposal numbers be fact-checked?", answer: "The business remains responsible for approving figures, pricing, and claims. A proofreader can flag visible inconsistencies for confirmation." },
    ],
    internalLinks: [
      { href: "/business-proofreading", label: "Business proofreading", description: "Review client-facing proposals, reports, and business documents." },
      { href: "/editing-services", label: "Editing services", description: "Improve structure and message before final proofreading." },
      { href: "/blog/cv-proofreading-checklist", label: "CV proofreading checklist", description: "Review professional and career documents before submission." },
    ],
  },
  {
    title: "Manuscript Editing vs Copyediting vs Proofreading for Authors",
    slug: "manuscript-editing-vs-copyediting",
    excerpt: "Authors can compare manuscript editing, copyediting, and proofreading, including what each stage improves and when a book or research manuscript needs each review.",
    category: "Research and Manuscripts",
    author,
    reviewer: "Book & Journal Manuscript Desk — My Editing and Proofreading Desk",
    editorialDesk: "Long-Form Book & Journal Manuscript Desk",
    styleStandards: ["Chicago Manual of Style 17th Ed.", "APA 7th Ed.", "ICMJE / Publisher House Styles"],
    datePublished: published,
    dateUpdated: updated,
    readingTime: "10 min read",
    metaTitle: "Manuscript Editing vs Copyediting vs Proofreading Guide",
    metaDescription: "Compare manuscript editing, copyediting, and proofreading for book authors and journal researchers: scope, timing, Track Changes, and per-word pricing.",
    heroImage: "/images/blog/editing-proofreading-manuscript-submission.webp",
    heroImageAlt: "Author manuscript pages marked for editing, copyediting, and proofreading stages",
    tableOfContents: [
      { id: "quick-answer", label: "Quick answer" },
      { id: "manuscript-editing", label: "Manuscript editing" },
      { id: "copyediting", label: "Copyediting" },
      { id: "proofreading", label: "Proofreading" },
      { id: "comparison", label: "Comparison" },
      { id: "choose", label: "How authors choose" },
    ],
    body: [
      {
        id: "quick-answer",
        heading: "Manuscript editing vs copyediting vs proofreading",
        paragraphs: [
          ["For both book authors and academic researchers, manuscript editing strengthens large-scale structure, pacing, argument flow, and reader engagement; copyediting refines sentence-level clarity, grammar, tone, terminology, and style-manual consistency; and proofreading provides the final surface check on an approved or typeset draft before submission or print."],
          ["Booking the wrong editorial stage wastes both budget and time: sending a rough early draft for surface proofreading will not fix structural gaps, while asking for substantive restructuring after a book is already typeset forces expensive layout reflow."],
        ],
      },
      {
        id: "manuscript-editing",
        heading: "Manuscript editing improves structure, pacing, and argument flow",
        paragraphs: [
          ["Manuscript editing (often overlapping with developmental or substantive editing) zooms out to the chapter and whole-work level. In non-fiction books and fiction manuscripts, an editor evaluates chapter order, narrative pacing, character or thematic continuity, voice consistency, scene transitions, and places where readers lose momentum."],
          ["In peer-reviewed journal manuscripts and academic monographs, manuscript editing evaluates IMRaD section alignment, whether the Introduction states a clear scholarly gap, whether Methods and Results align logically, and whether Discussion claims match empirical scope without overclaiming."],
        ],
        bullets: [
          ["Reordering uneven chapters or flagging repetitive paragraphs across sections"],
          ["Clarifying the central thesis, narrative arc, or research contribution"],
          ["Calibrating scholarly hedging or narrative voice consistency across long drafts"],
          ["Leaving margin queries wherever missing evidence or exposition needs the author's input"],
        ],
      },
      {
        id: "copyediting",
        heading: "Copyediting refines sentences, mechanics, and style-sheet consistency",
        paragraphs: [
          ["Copyediting sits directly at the sentence and paragraph level once structural decisions are settled. A copyeditor enforces a single governing style manual—such as Chicago 17th Edition for trade non-fiction and history, APA 7th for social sciences, or AMA/IEEE for biomedical and engineering manuscripts—while building an internal style sheet to lock spelling variants, hyphenation, numbers, character names, and terminology."],
          ["Copyediting eliminates awkward syntax, wordiness, tense drift, dangling modifiers, and mismatched in-text citations without rewriting the author's intellectual voice."],
        ],
        trackedChanges: {
          context: "Trade Non-Fiction & Academic Monograph (Copyediting Pass — Chicago 17th Ed.)",
          rawDraft:
            "In chapter 3, Dr. Elena Vance argued that 8 different coastal cities saw a 14% rise in housing costs, however her earlier data in Table 2 lists nine municipalities.",
          humanRevision:
            "In Chapter 3, Dr. Elena Vance argued that eight coastal cities experienced a 14 percent rise in housing costs; however, Table 2 lists nine municipalities.",
          marginComment:
            "COMMENT [Manuscript Desk]: (1) Capitalized 'Chapter 3' per style sheet; spelled out 'eight' and 'percent' per CMOS 17 general text rules. (2) Resolved comma splice around 'however'. (3) AUTHOR QUERY: Please confirm whether Table 2 includes an extra city or if Chapter 3 text should read 'nine coastal cities'.",
          styleStandard: "Chicago Manual of Style (17th Ed.) Copyediting",
        },
      },
      {
        id: "proofreading",
        heading: "Proofreading is the final quality-control check before release",
        paragraphs: [
          ["Proofreading happens only after all structural edits and copyedits have been accepted and the manuscript is locked for submission or publication. Proofreaders hunt for surviving typographical errors, doubled words, punctuation slips, broken cross-references, mismatched Table of Contents page numbers, bad line breaks, widows and orphans in galley PDFs, and inconsistent front/back matter."],
          ["For the broader distinction between developmental revision and surface correction across shorter papers and business files, see our guide to ", { text: "editing vs proofreading", href: "/blog/editing-vs-proofreading" }, "."],
        ],
      },
      {
        id: "comparison",
        heading: "Author-focused comparison across all three editorial stages",
        paragraphs: [["Use this breakdown to match your manuscript's current condition to the right service tier and turnaround budget."]],
        table: {
          headers: ["Editorial Stage", "Best Draft Timing", "Core Focus", "Deliverables Returned"],
          rows: [
            ["Manuscript Editing (Substantive)", "Complete 1st/2nd draft still needing structural clarity", "Chapter logic, pacing, transitions, voice, argument strength, claim framing", "MS Word Track Changes + strategic margin notes on structure"],
            ["Copyediting (Line & Mechanics)", "Structure settled; prose needs fluency and style precision", "Grammar, syntax, concision, hedging, citations, style-sheet consistency", "MS Word Track Changes + style consistency notes + clean copy"],
            ["Proofreading (Final QA)", "Edited & formatted final file or typeset PDF galley", "Remaining typos, punctuation, captions, TOC sync, widows/orphans, layout slips", "Final surface corrections in Track Changes / PDF notes + clean file"],
          ],
        },
      },
      {
        id: "choose",
        heading: "How authors choose the right review (and avoid double-paying)",
        paragraphs: [
          ["Choose ", { text: "manuscript editing services", href: "/manuscript-editing" }, " when chapters still feel uneven, wordy, or structurally disconnected, or when a journal manuscript needs tighter academic clarity and reviewer readiness. Under our Unified Academic Rate policy on the ", { text: "pricing calculator", href: "/pricing" }, ", substantive line editing and final proofreading share the same transparent per-word turnaround curve ($0.022–$0.038/word), so you never feel pressured to under-select proofreading when your draft actually needs copyediting."],
          ["Once you have accepted every Tracked Change and formatted your submission file or book layout, book ", { text: "professional proofreading services", href: "/proofreading-services" }, " for one final, objective quality pass."],
        ],
        checklist: {
          title: "Manuscript Stage Selection Checklist",
          items: [
            ["Still moving sections, cutting chapters, or clarifying argument transitions? -> Choose Manuscript / Substantive Editing."],
            ["Structure locked, but sentences feel wordy, translated, or style-inconsistent? -> Choose Copyediting / Line Editing."],
            ["All edits accepted and manuscript formatted for journal portal, KDP, or print? -> Choose Final Proofreading."],
          ],
        },
      },
    ],
    faq: [
      { question: "Do authors need both editing and proofreading?", answer: "Many manuscripts benefit from both. Editing improves the manuscript, while proofreading checks the final approved version after edits are accepted." },
      { question: "Is copyediting the same as proofreading?", answer: "No. Copyediting improves language and consistency before final approval. Proofreading checks the finished file for remaining errors." },
      { question: "Can editing guarantee publication?", answer: "No. Editing can improve communication and presentation, but publication depends on many decisions outside the editor's control." },
    ],
    internalLinks: [
      { href: "/manuscript-editing", label: "Manuscript editing", description: "Review long-form manuscripts for clarity, structure, and consistency." },
      { href: "/proofreading-services", label: "Professional proofreading", description: "Get a final human check after editing is complete." },
      { href: "/blog/editing-and-proofreading-before-manuscript-submission", label: "Manuscript submission guide", description: "Prepare a manuscript before submission." },
    ],
  },
  {
    title: "How to Prepare a Document for Professional Editing",
    slug: "prepare-document-for-proofreading",
    excerpt: "Prepare a document for professional editing or proofreading by freezing the right version, providing guidelines, explaining the audience, cleaning tracked changes, and sharing deadlines.",
    category: "Editing services",
    author,
    reviewer: "Client Intake & Editorial Operations Desk — My Editing and Proofreading Desk",
    editorialDesk: "Editorial Intake & Document Preparation Desk",
    styleStandards: ["MS Word Track Changes Hygiene", "Zotero / Mendeley / EndNote Field Safety", "Style-Brief Standards"],
    datePublished: published,
    dateUpdated: updated,
    readingTime: "9 min read",
    metaTitle: "How to Prepare a Document for Proofreading or Editing",
    metaDescription: "Learn how to prepare a thesis, paper, or report for professional editing: version freeze, reference manager locks, style sheets, and Track Changes setup.",
    heroImage: "/assets/premium_desk.png",
    heroImageAlt: "Professional editing desk with documents prepared for review",
    tableOfContents: [
      { id: "quick-answer", label: "Quick answer" },
      { id: "version", label: "Correct version" },
      { id: "guidelines", label: "Guidelines" },
      { id: "audience", label: "Audience and deadline" },
      { id: "tracked-changes", label: "Tracked changes" },
      { id: "submit", label: "Submit cleanly" },
    ],
    body: [
      {
        id: "quick-answer",
        heading: "How to prepare a document for professional editing",
        paragraphs: [
          ["Preparing your manuscript cleanly before uploading ensures your human editor spends 100% of their review time sharpening your prose, logic, and citations rather than untangling broken versions or guessing which rules apply. Before submitting, freeze one master file, verify whether Zotero/Mendeley/EndNote fields should stay live or be flattened on a copy, attach your university or journal guidelines, state your target English dialect and deadline, and resolve outdated Track Changes."],
        ],
        table: {
          headers: ["Preparation Step", "Recommended Action", "Why It Improves Your Edit"],
          rows: [
            ["1. Version Freeze", "Merge co-author/supervisor drafts into one dated `.docx` master", "Prevents paying to edit text you later overwrite"],
            ["2. Reference Fields", "Keep a backup with live Zotero/EndNote fields; decide if upload copy stays live", "Prevents citation software from reverting manual editor fixes"],
            ["3. Style & Dialect Rules", "Attach Guide for Authors or state US/UK/CA/AU + APA/Chicago/Harvard", "Eliminates guesswork on spelling, serial commas, and reference rules"],
            ["4. Locked Passages", "Highlight verbatim participant quotes, statutory text, or fixed formulas", "Signals which excerpts must remain untouched"],
            ["5. Track Changes Hygiene", "Accept/reject old prior-round redlines before submitting", "Keeps your new editor's Track Changes crisp and easy to inspect"],
          ],
        },
      },
      {
        id: "version",
        heading: "Freeze the correct master version and handle reference manager fields",
        paragraphs: [
          ["Choose the single draft version you want edited and pause parallel revisions until the edited file returns. If co-authors or committee members are still adding paragraphs to a separate Google Doc, combine everything into one Microsoft Word (`.docx`) file before upload so terminology, headings, and word count are accurate."],
          ["If you use Zotero, Mendeley, or EndNote, save a master backup with active field codes intact. Remember that if an editor corrects a citation's punctuation inside an active citation field, clicking 'Refresh' later in Zotero can overwrite that fix unless the underlying library entry is updated—or unless you intentionally export a flattened plain-text copy for final proofreading."],
        ],
      },
      {
        id: "guidelines",
        heading: "Provide the exact style rules and word limits the editor should follow",
        paragraphs: [
          ["Attach university thesis handbooks, target journal Instructions for Authors, publisher house style sheets, RFP formatting rules, or maximum word limits alongside your draft. Specific constraints—such as 'Target British English (-ise), Harvard Cite Them Right, maximum 4,000 words excluding tables'—are vastly more actionable than generic instructions like 'please polish this.'"],
          ["If certain passages must not be altered (such as verbatim qualitative interview transcripts, legal statutes, questionnaire items, or copyrighted block quotes), note that clearly in your submission brief."],
        ],
      },
      {
        id: "audience",
        heading: "Explain the audience, purpose, dialect, and real deadline",
        paragraphs: [
          ["Tell your editor who will evaluate the file and what decision depends on it. An IEEE engineering paper, a qualitative sociology dissertation, an executive consulting RFP, an academic CV, and a translated corporate report call for very different register and hedging choices."],
          ["State your hard submission deadline rather than just your desired return date, and leave at least 24 to 72 hours after delivery to review Track Changes, answer margin comments, and inspect your final exported PDF."],
        ],
        trackedChanges: {
          context: "Author Submission Brief & Document Clean-Up Example",
          rawDraft:
            "Please edit my paper asap and make it sound good for publishing. Ignore the yellow highlights from my co-author.",
          humanRevision:
            "Target: Journal of Environmental Policy (British English -ise, APA 7th Ed., 6,500-word limit). Note: Yellow highlights in Section 3.2 mark resolved co-author notes—ready to edit; please keep verbatim interview quotes in italics untouched. Hard submission deadline: 28 November.",
          marginComment:
            "COMMENT [Intake Desk]: Clear scope notes like this allow our specialist editor to verify APA 7 compliance, preserve verbatim quotes, and trim 180 excess words to meet your 6,500-word limit immediately.",
          styleStandard: "Editorial Brief Best Practice",
        },
      },
      {
        id: "tracked-changes",
        heading: "Clean prior tracked changes and resolved comments carefully",
        paragraphs: [
          ["If your file still contains leftover redlines or resolved margin balloons from a supervisor or colleague, accept or reject those earlier edits and delete resolved comments before uploading. Overlapping Track Changes from multiple authors make it harder to distinguish your new editor's revisions from old suggestions. Follow ", { text: "Microsoft Track Changes support", href: "https://support.microsoft.com/en-us/word/accept-or-reject-tracked-changes-in-word", external: true }, " only after saving an untouched pre-edit backup copy."],
        ],
      },
      {
        id: "submit",
        heading: "Submit the document with the right service notes",
        paragraphs: [
          ["Use ", { text: "editing services", href: "/editing-services" }, " when sentences, flow, tone, or chapter transitions still need work. Use ", { text: "proofreading services", href: "/proofreading-services" }, " when structure is settled and you want final mechanical quality control. For translated English manuscripts, include the original source file if available and select ", { text: "translation review", href: "/translation-review" }, ". When your file is ready, check rates on ", { text: "pricing", href: "/pricing" }, " or ", { text: "upload the document securely", href: "/submit" }, "."],
        ],
        checklist: {
          title: "5-Minute Pre-Upload Preparation Checklist",
          items: [
            ["Saved a dated local backup of the pre-edit `.docx` file (and live Zotero/EndNote library if applicable)."],
            ["Accepted or rejected outdated redlines and removed resolved internal comments."],
            ["Confirmed target English dialect (US, UK, CA, or AU) and citation manual (APA 7, Chicago, MLA, Harvard, OSCOLA, IEEE)."],
            ["Flagged any verbatim quotes, figures, or sections that must remain unchanged and stated your real deadline."],
          ],
        },
      },
    ],
    faq: [
      { question: "Should I send a Word file or PDF for proofreading?", answer: "An editable file is usually best for corrections. A PDF can also be useful for final layout checks when presentation matters." },
      { question: "Should I remove comments before sending a document?", answer: "Remove comments only if they are resolved. If a comment affects editorial decisions, leave it in or summarize the issue in your notes." },
      { question: "What if I do not know whether I need editing or proofreading?", answer: "Send the document condition, deadline, audience, and goals. The desk can help identify whether editing, proofreading, formatting, or translation review is more appropriate." },
    ],
    internalLinks: [
      { href: "/blog/how-much-does-proofreading-cost", label: "Proofreading cost guide", description: "Understand rates, calculators, and turnarounds." },
      { href: "/editing-services", label: "Editing services", description: "Choose deeper clarity, tone, and structure support." },
      { href: "/proofreading-services", label: "Proofreading services", description: "Choose a final correction pass for a stable document." },
    ],
  },
  {
    title: "How to Format a Thesis or Dissertation in Microsoft Word",
    slug: "format-thesis-in-microsoft-word",
    excerpt: "Learn how to format a thesis or dissertation in Microsoft Word with styles, heading levels, section breaks, page numbering, captions, table of contents, cross-references, and final PDF checks.",
    category: "Formatting and References",
    author,
    reviewer: "Thesis Formatting & Repository Compliance Desk — My Editing and Proofreading Desk",
    editorialDesk: "Long-Document & ProQuest Formatting Desk",
    styleStandards: ["MS Word Styles & Section Breaks", "ProQuest / University ETD PDF/A Rules", "APA 7th / Chicago Layout"],
    datePublished: published,
    dateUpdated: updated,
    readingTime: "12 min read",
    metaTitle: "How to Format a Thesis in Microsoft Word (Step-by-Step)",
    metaDescription: "Format your thesis or dissertation in Microsoft Word without broken layouts: Section Breaks, Roman/Arabic page numbers, auto Table of Contents, and PDF/A.",
    heroImage: "/images/blog/thesis-tables-figures-references-checklist.webp",
    heroImageAlt: "Thesis document formatted in Microsoft Word with headings, captions, and table of contents checks",
    tableOfContents: [
      { id: "quick-answer", label: "Quick answer" },
      { id: "styles", label: "Styles and headings" },
      { id: "sections", label: "Section breaks and numbering" },
      { id: "captions", label: "Captions and cross-references" },
      { id: "contents", label: "Contents lists" },
      { id: "final-pdf", label: "Final PDF" },
    ],
    body: [
      {
        id: "quick-answer",
        heading: "How to format a thesis in Microsoft Word without breaking pagination",
        paragraphs: [
          ["Format a thesis or dissertation cleanly in Microsoft Word by configuring built-in Heading styles (`Heading 1`, `Heading 2`, `Heading 3`) instead of manual bolding, isolating front matter from Chapter 1 with `Next Page` Section Breaks, disabling `Link to Previous` before switching from Roman numerals (`i, ii, iii`) to Arabic numerals (`1, 2, 3`), generating captions and cross-references dynamically, updating entire contents tables, and verifying embedded fonts in the final PDF/A export."],
          ["Graduate students across r/GradSchool and r/PhD consistently rank broken Word pagination and unsynchronized Tables of Contents as the #1 cause of last-minute graduate school repository rejections. Following the sequence below keeps a 200-page `.docx` stable."],
        ],
        callout: {
          title: "Avoid Word's Legacy 'Master Document' Feature",
          text: [
            "Do not link separate chapter files using Word's legacy Master Document feature, which frequently corrupts heading styles and Zotero/EndNote field codes. Draft chapters separately if needed, then paste cleanly into one unified `.docx` once content is stable.",
          ],
        },
      },
      {
        id: "styles",
        heading: "Use built-in Heading Styles for every chapter and subheading",
        paragraphs: [
          ["Word's automated Table of Contents, PDF bookmarks, and Navigation Pane rely strictly on built-in Heading styles, as detailed in ", { text: "Microsoft's table of contents guidance", href: "https://support.microsoft.com/en-US/Word/training/insert-a-table-of-contents", external: true }, ". If you manually increase font size to 16pt bold without applying `Heading 1`, Word treats that chapter title as ordinary body text and omits it from your Table of Contents."],
          ["Modify `Normal`, `Heading 1`, `Heading 2`, and `Heading 3` directly via the Styles pane (`Right-click > Modify`) so font family, line spacing, keep-with-next pagination, and chapter page-break rules update globally across the entire dissertation in seconds."],
        ],
        bullets: [
          ["Set 'Keep with next' on every Heading style so a subheading never sits orphaned at the bottom of a page."],
          ["Avoid blank 'Enter' lines between paragraphs; set exact 'Space Before / Space After' values inside Paragraph settings."],
          ["Turn on the Pilcrow (`¶`) formatting marks button on the Home tab whenever auditing hidden breaks or accidental blank pages."],
        ],
      },
      {
        id: "sections",
        heading: "Plan Section Breaks and mixed Roman / Arabic page numbering",
        paragraphs: [
          ["Most universities require unnumbered Title/Declaration pages, lowercase Roman numerals (`i, ii, iii`) on Abstracts, Acknowledgements, and Table of Contents pages, and Arabic numerals starting cleanly at `1` on the first page of Chapter 1. Standard Page Breaks (`Ctrl+Enter`) cannot change numbering formats or page orientation—only **Section Breaks** can."],
          ["Insert `Layout > Breaks > Next Page` at the end of your Title page and again at the end of your Front Matter. Then double-click inside Chapter 1's footer, critically **uncheck `Link to Previous`** in the Header & Footer toolbar, set `Format Page Numbers` to `1, 2, 3`, and select `Start at: 1`. Only after unlinking sections can you safely format front matter to `i, ii, iii` or switch a wide data table page to Landscape without distorting the rest of your thesis."],
        ],
        table: {
          headers: ["Word Layout Problem", "Root Cause", "Exact Fix in Microsoft Word"],
          rows: [
            ["Chapter 1 starts on page 9 instead of page 1", "Used a Page Break instead of Next Page Section Break, or 'Continue from previous section' is active", "Insert Next Page Section Break, uncheck 'Link to Previous', set 'Start at: 1'"],
            ["Roman numerals disappear from Abstract when editing Chapter 1", "'Link to Previous' remained toggled ON in Chapter 1 footer", "Turn OFF 'Link to Previous' in BOTH headers and footers of the new section"],
            ["Accidental blank page appears before a chapter", "Trailing empty paragraphs or an Odd-Page Section Break pushed content", "Enable Pilcrow (`¶`), inspect break markers, switch Odd-Page to Next-Page break"],
            ["Landscape appendix rotates the header/footer awkwardly", "Margins and tab stops were not unlinked inside the Landscape section", "Unlink header/footer for the Landscape section and reset tab stops to 9.5 in"],
            ["Table of Contents shows wrong page numbers before export", "Text edits shifted pagination without refreshing TOC field codes", "Right-click TOC -> Update Field -> Update Entire Table before PDF save"],
          ],
        },
        trackedChanges: {
          context: "PhD Thesis Formatting Audit (Front Matter to Chapter 1 Transition)",
          rawDraft:
            "[Manual Page Break] ... Table of Contents (p. 4) | Chapter 1: Introduction (p. 5) [Manually typed TOC leaders] | Table 2.1 [Bold normal text]",
          humanRevision:
            "[Next Page Section Break · Link to Previous OFF] ... Table of Contents (p. iv) | Chapter 1: Introduction (p. 1, Heading 1) | Table 2.1 (Insert Caption -> Automated List of Tables)",
          marginComment:
            "COMMENT [Formatting Desk]: Replaced manual TOC and Page Break with unlinked Section Break (restarting Arabic numbering at 1 on Chapter 1), applied Heading 1 style, and converted table labels to live Word captions.",
          styleStandard: "University ETD & ProQuest Submission Standard",
        },
      },
      {
        id: "captions",
        heading: "Automate captions and cross-references for tables and figures",
        paragraphs: [
          ["Never type 'Table 3.2' or 'see Figure 4' manually if you might still insert or delete visual items before defense. Use `References > Insert Caption` so every table and figure receives a dynamic sequence number. Then insert in-text mentions via `References > Cross-reference` (set to 'Only label and number'). Microsoft confirms that dynamic cross-references update automatically whenever chapters shift; see ", { text: "Microsoft cross-reference guidance", href: "https://support.microsoft.com/en-us/word/create-a-cross-reference", external: true }, "."],
          ["Remember APA and university conventions: table captions normally appear **above** the table, while figure captions appear **below** the figure (unless your department template specifies otherwise)."],
        ],
      },
      {
        id: "contents",
        heading: "Generate and refresh Table of Contents, List of Tables, and List of Figures",
        paragraphs: [
          ["Once Heading styles and automated captions are in place, generate your Table of Contents (`References > Table of Contents > Custom Table of Contents`) and separate Lists of Tables and Figures (`References > Insert Table of Figures`). Match your TOC typography (e.g., Times New Roman 12pt, clean dot leaders, right-aligned numbers) by editing `TOC 1`, `TOC 2`, and `TOC 3` styles rather than overriding the text manually—manual font edits get wiped out the moment fields refresh."],
          ["Before final submission, press `Ctrl+A` (or `Cmd+A` on Mac) and update all fields (`F9`), choosing **Update Entire Table** every single time so newly edited headings and shifted page numbers sync cleanly."],
        ],
      },
      {
        id: "final-pdf",
        heading: "Export to ProQuest-ready PDF/A and inspect every page",
        paragraphs: [
          ["Export using `File > Save As > PDF` (checking `Options > ISO 19005-1 compliant (PDF/A)` and `Create bookmarks using Headings` if required by ProQuest or your university library). Open the exported PDF independently and scroll page by page to check that mathematical symbols, Greek characters, high-resolution charts, landscape margins, and clickable bookmarks survived conversion intact."],
          ["If broken section breaks, stubborn numbering jumps, or strict institutional margins are costing you days right before deposit, our ", { text: "document formatting service", href: "/document-formatting" }, " can format your `.docx` and PDF cleanly alongside our ", { text: "tables, figures, and references checklist", href: "/blog/thesis-tables-figures-references-checklist" }, "."],
        ],
        checklist: {
          title: "ProQuest & University Word-to-PDF Final Formatting Checklist",
          items: [
            ["Built-in Heading 1/2/3 styles govern every chapter and subheading (visible in the Navigation Pane)."],
            ["Front matter uses Roman numerals (`i, ii, iii`) and Chapter 1 restarts cleanly at Arabic `1` with `Link to Previous` disabled."],
            ["All tables, figures, and cross-references use live Word captions (`Update Entire Table` executed right before PDF export)."],
            ["Exported PDF/A file verified page-by-page for embedded fonts, bookmarks, margins, and zero `Error! Reference source not found` warnings."],
          ],
        },
      },
    ],
    faq: [
      { question: "Should I use manual headings in a thesis?", answer: "Use Word heading styles when possible. Manual formatting can look correct but fail to appear properly in generated contents lists." },
      { question: "When should I update the table of contents?", answer: "Update it after headings, captions, and pagination are stable, then inspect the generated entries and page numbers manually." },
      { question: "Can formatting replace proofreading?", answer: "No. Formatting addresses presentation. Proofreading checks language and consistency. Many final theses need both." },
    ],
    internalLinks: [
      { href: "/document-formatting", label: "Document formatting", description: "Prepare thesis and dissertation files for submission." },
      { href: "/blog/thesis-tables-figures-references-checklist", label: "Tables and references checklist", description: "Audit captions, cross-references, citations, and final files." },
      { href: "/blog/thesis-proofreading-checklist", label: "PhD thesis checklist", description: "Review long-document consistency before final submission." },
    ],
  },
];
