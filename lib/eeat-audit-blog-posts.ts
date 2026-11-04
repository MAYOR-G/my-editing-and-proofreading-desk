import type { BlogPost } from "@/lib/blog";

const institutionalAuthor = "My Editing and Proofreading Desk Editorial Board";

export const eeatAuditBlogPosts: BlogPost[] = [
  {
    title: 'Why Grammarly and LLMs Trigger "Synthetic Voice" Desk Rejections in Peer-Reviewed Journals (And How Human Editing Fixes It)',
    slug: "why-ai-grammar-tools-trigger-journal-desk-rejections",
    excerpt:
      "Associate editors at Q1/Q2 journals increasingly reject manuscripts not for bad grammar, but for automated homogenizing that strips epistemic hedging and flattens disciplinary syntax. Here is how human academic editing restores authentic scholarly voice.",
    category: "Journal Publishing & ESL Research",
    author: institutionalAuthor,
    reviewer: "STEM & Clinical Medicine Desk — My Editing and Proofreading Desk",
    editorialDesk: "STEM & Clinical Medicine Review Desk",
    styleStandards: ["APA 7th Ed.", "COPE AI Authorship Guidelines", "ICMJE Recommendations", "AMA 11th Ed."],
    datePublished: "2026-11-04",
    dateUpdated: "2026-11-04",
    readingTime: "11 min read",
    metaTitle: 'Why AI Grammar Tools Trigger "Synthetic Voice" Desk Rejections',
    metaDescription:
      "Learn why Grammarly and LLM rewrites trigger synthetic-voice desk rejections in peer-reviewed journals by flattening epistemic hedging, and how human editing fixes it.",
    heroImage: "/images/blog/esl-academic-proofreading-guide.webp",
    heroImageAlt: "Peer-reviewed journal manuscript showing human tracked changes restoring scholarly hedging over automated AI phrasing",
    tableOfContents: [
      { id: "the-synthetic-voice-epidemic", label: "What journal editors mean by 'synthetic voice'" },
      { id: "how-automated-smoothing-breaks-hedging", label: "How algorithmic smoothing destroys epistemic hedging" },
      { id: "esl-tracked-changes-breakdown", label: "Before & After: ESL sentence mechanics vs. LLM flattening" },
      { id: "journal-screening-matrix", label: "Data Table: Automated smoothing vs. human manuscript editing" },
      { id: "publication-ethics-and-disclosure", label: "Aligning with COPE, ICMJE, and APA 7th rules" },
      { id: "pre-submission-remediation-protocol", label: "How to de-homogenize a draft before journal submission" },
    ],
    body: [
      {
        id: "the-synthetic-voice-epidemic",
        heading: "What journal editors actually mean when they flag 'synthetic voice'",
        paragraphs: [
          [
            "Between 2024 and 2026, managing editors across Elsevier, Springer Nature, IEEE, and Wiley journals began reporting a new pattern in triage desk rejections. Manuscripts submitted by international and ESL research teams were arriving with zero typographical errors—yet were being declined within 72 hours before external peer review. The triage notes rarely accused authors of fabricating data. Instead, editors cited 'mechanized prose,' 'overstated causal claims,' and 'synthetic rhetorical uniformity.'",
          ],
          [
            "When researchers run complex empirical drafts through aggressive grammar plugins or general-purpose large language models (LLMs) with prompts like 'make this sound more fluent and academic,' the algorithm optimizes for high-probability token sequences. In everyday corporate writing, high-probability phrasing reads smoothly. In peer-reviewed scholarship, however, statistical token smoothing erases the precise methodological caveats that tell a reviewer where your empirical data ends and your theoretical inference begins.",
          ],
          [
            "Our ",
            { text: "manuscript editing desk", href: "/manuscript-editing" },
            " regularly audits papers after a first desk rejection. In over 70% of those rescues, the core experimental design is sound, but automated grammar rewrite suggestions have quietly mutated cautious correlations into sweeping causal declarations or replaced discipline-specific nomenclature with generic synonyms.",
          ],
        ],
        callout: {
          title: "The hidden cost of 'one-click fluency'",
          text: [
            "Automated rephrasers treat cautious academic qualifiers ('suggests a potential association under bounded conditions') as 'wordy' or 'weak' writing—stripping out the exact epistemic humility that peer reviewers require to approve a Discussion section.",
          ],
        },
      },
      {
        id: "how-automated-smoothing-breaks-hedging",
        heading: "How algorithmic smoothing destroys epistemic hedging and technical precision",
        paragraphs: [
          [
            "In scholarly publishing, grammar is inseparable from epistemology. According to the ",
            { text: "APA 7th Edition Publication Manual guidelines on scholarly tone", href: "https://apastyle.apa.org/style-grammar-guidelines/research-publication", external: true },
            ", authors must calibrate verb strength to match the evidentiary weight of their study design. Cross-sectional surveys cannot 'demonstrate causality'; small-sample pilot trials cannot 'prove clinical efficacy'; and regression models with unobserved confounders cannot 'establish definitive pathways.'",
          ],
          [
            "Commercial grammar tools are trained predominantly on commercial web copy and journalistic prose, where direct, assertive verbs are rewarded. When an ESL researcher writes a grammatically tangled sentence that nonetheless contains an important methodological hedge, an automated rewrite tool typically fixes the syntax by deleting the hedge and inserting transition clichés ('Furthermore, it is crucial to note that this pivotal finding underscores...').",
          ],
        ],
        trackedChanges: {
          context: "Cardiovascular Pharmacology Manuscript (Discussion Section — ESL Author Draft)",
          rawDraft:
            "Moreover, this pivotal result undeniably proves that the novel inhibitor completely stops endothelial inflammation in diabetic patients, paving the way for a paradigm shift.",
          humanRevision:
            "These findings indicate that the novel inhibitor significantly attenuates endothelial inflammation markers in our cohort (p = .018), suggesting a viable therapeutic target for larger Phase II trials.",
          marginComment:
            "COMMENT [STEM Desk]: Removed LLM-inserted hyperbole ('pivotal', 'undeniably proves', 'paradigm shift'). Restored cohort boundary and exact p-value reference so peer reviewers do not flag the claim as overgeneralized.",
          styleStandard: "ICMJE & AMA 11th Ed. Empirical Claim Calibration",
        },
      },
      {
        id: "esl-tracked-changes-breakdown",
        heading: "Why ESL researchers are disproportionately penalized by automated rewriters",
        paragraphs: [
          [
            "Multilingual scholars often draft in English using syntactic structures transferred from Mandarin, Arabic, Spanish, German, or French—such as delayed main verbs, nominalized prepositional chains, or missing definite articles. When a human specialist performs ",
            { text: "thesis editing", href: "/thesis-editing" },
            " or journal preparation, the editor untangles the L1 syntax while strictly preserving the author's original analytical cadence.",
          ],
          [
            "By contrast, when an author accepts 150 consecutive 'fluency' rewrites from an AI assistant, every paragraph adopts the same rhythmic cadence: a 22-word topic sentence, a participial phrase tail ('...highlighting the intricate interplay between X and Y'), and symmetrical triadic lists. Journal editors who read 300 submissions a year recognize this synthetic fingerprint within two paragraphs.",
          ],
        ],
        trackedChanges: {
          context: "Applied Econometrics Working Paper (Methodology Section)",
          rawDraft:
            "By leveraging a multifaceted panel dataset, we delve into the intricate tapestry of fiscal decentralization to illuminate its profound impact on regional innovation.",
          humanRevision:
            "Using a balanced municipal panel dataset (2014–2024, N = 1,420), we estimate a two-way fixed-effects model to isolate the effect of fiscal decentralization on regional patent intensity.",
          marginComment:
            "COMMENT [Economics Review Desk]: Replaced synthetic AI metaphors ('delve into', 'intricate tapestry', 'illuminate') with concrete econometric specification details.",
          styleStandard: "APA 7th / AEA Econometric Reporting Standard",
        },
      },
      {
        id: "journal-screening-matrix",
        heading: "Comparison: Automated grammar tools vs. LLM rewrites vs. Human Subject-Matter Desk",
        paragraphs: [
          [
            "Before you run your final manuscript through an automated rewriter—or before you decide which level of review to select in our ",
            { text: "pricing calculator", href: "/pricing" },
            "—compare how each workflow handles the six dimensions that journal peer reviewers scrutinize most heavily:",
          ],
        ],
        table: {
          headers: [
            "Editorial Dimension",
            "Rule/Plugin Checkers (e.g., Grammarly)",
            "Generative LLM Rewrite Prompts",
            "Human Subject-Matter Editorial Desk",
          ],
          rows: [
            [
              "Epistemic Hedging & Claim Calibration",
              "Frequently flags necessary hedges ('may', 'appears to') as 'weak delivery'",
              "Replaces cautious empirical verbs with promotional hyperbole ('underscores', 'pivotal')",
              "Calibrates verb strength to match sample size, p-values, and study limitations",
            ],
            [
              "Disciplinary Nomenclature",
              "Suggests generic synonyms that break standardized technical terms of art",
              "Occasionally substitutes plausible-sounding but domain-incorrect terminology",
              "Locks domain-specific terminology across Abstract, Methods, Results, and Tables",
            ],
            [
              "Sentence Rhythm & Authorial Voice",
              "Neutralizes local syntax errors but encourages uniform business-style brevity",
              "Produces unmistakable synthetic cadence ('delve', 'tapestry', participial tails)",
              "Preserves the scholar's authentic voice while correcting L1 transfer errors",
            ],
            [
              "Citation-to-Claim Alignment",
              "Zero awareness of whether a cited source supports the surrounding sentence",
              "Risk of altering sentence meaning so the original citation no longer fits",
              "Flags citation drift and leaves margin queries when a claim outruns its citation",
            ],
            [
              "Audit Trail for Co-Authors & Supervisors",
              "Accepts changes inline with no permanent pedagogical margin rationale",
              "Overwrites whole paragraphs with zero sentence-level provenance",
              "Delivers timestamped MS Word Track Changes + explanatory margin comments",
            ],
            [
              "Confidentiality & Unpublished Data Risk",
              "Cloud processing varies by enterprise tier and browser extension permissions",
              "Public consumer tiers may retain unpublished text or expose proprietary data",
              "100% private portal handling; zero LLM training on client manuscripts",
            ],
          ],
        },
      },
      {
        id: "publication-ethics-and-disclosure",
        heading: "What COPE and ICMJE actually permit (and forbid) in manuscript preparation",
        paragraphs: [
          [
            "Both the ",
            { text: "Committee on Publication Ethics (COPE) position statement on AI tools", href: "https://publicationethics.org/cope-position-statements/ai-author", external: true },
            " and the ",
            { text: "International Committee of Medical Journal Editors (ICMJE) recommendations", href: "https://www.icmje.org/recommendations/browse/roles-and-responsibilities/defining-the-role-of-authors-and-contributors.html", external: true },
            " draw a sharp line between basic language mechanics and generative rewriting. Authors remain 100% accountable for the originality, accuracy, and integrity of every word in their submission—and undisclosed generative rewriting of scholarly prose can trigger ethics inquiries.",
          ],
          [
            "Human copyediting and ",
            { text: "dissertation proofreading", href: "/dissertation-proofreading" },
            ", by contrast, are universally recognized across university regulations and journal instructions as legitimate editorial quality control—precisely because a human editor works non-destructively inside your draft using MS Word Track Changes, leaving every substantive decision in the author's hands.",
          ],
        ],
      },
      {
        id: "pre-submission-remediation-protocol",
        heading: "4-Step protocol to remove synthetic phrasing before you submit",
        paragraphs: [
          [
            "If you have already used an automated assistant on early drafts of your paper or thesis, run this four-step remediation audit before uploading to a journal portal—or ",
            { text: "submit your manuscript", href: "/submit" },
            " to our human editorial desk for a full de-homogenization pass:",
          ],
        ],
        checklist: {
          title: "Pre-Submission De-Homogenization Checklist",
          items: [
            [
              "Search and purge synthetic lexical markers: Run Ctrl+F / Cmd+F for 'delve', 'tapestry', 'testament', 'underscores', 'pivotal', 'multifaceted', 'realm', and 'crucial', replacing each with concrete methodological nouns and verbs.",
            ],
            [
              "Audit every Discussion verb against your Results tables: Verify that every causal verb ('demonstrates', 'drives', 'eliminates') is backed by a causal design; otherwise restore cautious scholarly hedging ('is associated with', 'correlates with').",
            ],
            [
              "Break up participial tail clauses: Inspect sentences ending in ', highlighting the importance of...' or ', thereby fostering...' and rewrite them as direct, evidence-backed statements.",
            ],
            [
              "Request a human Tracked-Changes pass: Have a specialist human editor review your clean or earlier pre-AI draft to restore natural variation in sentence length and verify citation-to-claim alignment.",
            ],
          ],
        },
      },
    ],
    faq: [
      {
        question: "Can a journal desk-reject my paper just because I used Grammarly Pro?",
        answer:
          "Yes, if you accept aggressive 'fluency' or 'clarity' full-sentence rewrites that strip out methodological hedging, introduce repetitive transition formulas, or alter technical terminology. Basic spellchecking is harmless, but automated sentence rewriting frequently creates the synthetic cadence that editors flag.",
      },
      {
        question: "How does human manuscript editing differ from automated paraphrasing?",
        answer:
          "A human editor reads your Methods and Results tables first to understand your study boundaries, preserves your disciplinary terms of art, and uses Microsoft Word Track Changes and margin comments to explain why a sentence was tightened—never overwriting your voice with generic templates.",
      },
    ],
    internalLinks: [
      {
        href: "/manuscript-editing",
        label: "Manuscript Editing Services",
        description: "Human line editing and peer-review readiness for Q1/Q2 journal submissions.",
      },
      {
        href: "/thesis-editing",
        label: "Thesis Editing Services",
        description: "Chapter-level structural and stylistic editing with MS Word Track Changes.",
      },
      {
        href: "/pricing",
        label: "Instant Price Calculator",
        description: "Calculate your exact per-word rate by document length and turnaround speed.",
      },
      {
        href: "/submit",
        label: "Submit Your Document",
        description: "Upload your manuscript securely or request a Free 300-Word Human Sample Edit.",
      },
    ],
  },
  {
    title: "Citation Drift & Cross-Chapter Disconnection: How an 80,000-Word PhD Thesis Almost Failed Before Deposit",
    slug: "citation-drift-phd-thesis-structural-audit",
    excerpt:
      "Over three years of doctoral research, research questions evolve, variables are renamed, and bibliography entries quietly desynchronize across chapters. Walk through an anonymized 80,000-word PhD thesis rescue and our 4-pass human triage framework.",
    category: "Doctoral Dissertations & Theses",
    author: institutionalAuthor,
    reviewer: "Social Sciences, Education & Humanities Desk — My Editing and Proofreading Desk",
    editorialDesk: "Social Sciences, Education & Humanities Desk",
    styleStandards: ["APA 7th Ed.", "Chicago Manual of Style 17th Ed.", "UK / Commonwealth Viva Standards"],
    datePublished: "2026-11-04",
    dateUpdated: "2026-11-04",
    readingTime: "12 min read",
    metaTitle: "Citation Drift in PhD Theses: 80,000-Word Structural Audit",
    metaDescription:
      "Case-study walkthrough of how cross-chapter methodology drift and missing bibliography entries nearly derailed an 80,000-word PhD thesis—and our 4-pass human audit.",
    heroImage: "/images/blog/dissertation-proofreading-checklist-hero.png",
    heroImageAlt: "80,000-word PhD dissertation undergoing cross-chapter citation reconciliation and structural human editing",
    tableOfContents: [
      { id: "anatomy-of-multi-year-drift", label: "Why 80,000-word theses suffer from multi-year drift" },
      { id: "three-structural-fault-lines", label: "Case Study: The 3 fault lines uncovered 10 days before deposit" },
      { id: "tracked-changes-rescue-example", label: "Tracked-Changes Walkthrough: Reconciling Chapter 1 vs. Chapter 6" },
      { id: "audit-defect-breakdown-table", label: "Data Table: Defects found across 80,000 words" },
      { id: "four-pass-human-triage-framework", label: "Our 4-Pass Human Triage Framework for doctoral manuscripts" },
    ],
    body: [
      {
        id: "anatomy-of-multi-year-drift",
        heading: "Why 80,000-word doctoral manuscripts suffer from 'multi-year drift'",
        paragraphs: [
          [
            "A doctoral dissertation is rarely written in a single linear sprint. Chapter 2 (Literature Review) is often drafted in Year 1 for confirmation of status or qualifying exams; Chapter 3 (Methodology) is rewritten in Year 2 after ethics board feedback; and Chapters 4–6 (Findings and Discussion) are assembled in Year 3 under intense submission deadlines.",
          ],
          [
            "Because each chapter is revised in isolation—often across separate Word files (`Chapter2_v4_supervisor_edits.docx`, `Chapter5_final_FINAL.docx`) before being merged into a master document—three dangerous structural defects accumulate silently: **research-question drift**, **terminology bifurcation**, and **citation drift**.",
          ],
          [
            "Neither spellcheckers nor chapter-by-chapter AI prompts can detect these defects, because each individual paragraph looks grammatically valid in isolation. Only a whole-document human ",
            { text: "dissertation proofreading", href: "/dissertation-proofreading" },
            " and ",
            { text: "thesis editing", href: "/thesis-editing" },
            " pass holds Chapter 1's promises in working memory while reading Chapter 6's conclusions.",
          ],
        ],
      },
      {
        id: "three-structural-fault-lines",
        heading: "Case Study: What our desk uncovered in an 80,000-word thesis 10 days before deposit",
        paragraphs: [
          [
            "In a representative anonymized case from our Social Sciences & Education Desk, a doctoral candidate submitted an 81,400-word mixed-methods thesis ten days prior to university repository deposit. The candidate had already run a grammar checker on every chapter and believed the manuscript needed only a light surface proofread.",
          ],
          [
            "During Pass 1 of our whole-document review, our senior editor mapped the thesis architecture against the ",
            { text: "APA 7th Edition Reference & In-Text Citation Standards", href: "https://apastyle.apa.org/style-grammar-guidelines/references", external: true },
            " and the ",
            { text: "Chicago Manual of Style (17th Ed.) manuscript preparation rules", href: "https://www.chicagomanualofstyle.org/book/ed17/part1/ch02/toc.html", external: true },
            ". We identified three critical fault lines that would have triggered major viva amendments:",
          ],
        ],
        bullets: [
          [
            "Research Question Drift (RQ2 Mismatch): Chapter 1 posed three research questions (RQ1–RQ3) using an 'institutional resilience' framework. In Year 3, the candidate had reframed Chapter 5 around 'adaptive governance capacity'—meaning RQ2 as stated on page 19 was never explicitly answered in Chapter 6.",
          ],
          [
            "Sample-Size Discrepancy Across Chapters: Chapter 3 (Methodology, p. 88) reported N = 42 semi-structured interview participants after three dropouts. However, the Abstract (written earlier) and Table 4.1 (p. 114) still cited N = 45.",
          ],
          [
            "47 Orphaned & Mutated Citations: Merging six separate chapter files had broken Zotero/EndNote field codes, leaving 31 in-text citations missing from the master Reference List, 16 reference entries never cited in the text, and 9 author-date year mismatches (e.g., ' Bourdieu, 1984' in Chapter 2 vs. 'Bourdieu, 1986' for the same quote in Chapter 5).",
          ],
        ],
      },
      {
        id: "tracked-changes-rescue-example",
        heading: "Tracked-Changes Walkthrough: Reconciling cross-chapter disconnection",
        paragraphs: [
          [
            "When a human editor detects a cross-chapter contradiction, we never silently invent data or guess which number is correct. Instead, we harmonize the prose where the author's intent is unmistakable and insert a precise, actionable MS Word margin comment flagging the exact page numbers that require author confirmation:",
          ],
        ],
        trackedChanges: {
          context: "Chapter 6 Conclusion (p. 214) Cross-Checked Against Chapter 1 (p. 19) & Chapter 3 (p. 88)",
          rawDraft:
            "In answering RQ2, the interviews with 45 municipal leaders demonstrate that institutional resilience was fully achieved across all case sites.",
          humanRevision:
            "In addressing RQ2, the semi-structured interviews with 42 municipal leaders (see Section 3.4) indicate that adaptive governance capacity varied significantly across the three regional case sites.",
          marginComment:
            "COMMENT [Social Sciences Desk]: (1) Updated N = 45 to N = 42 to match your final attrition table in Section 3.4 (p. 88)—please confirm. (2) Harmonized 'institutional resilience' with 'adaptive governance capacity' used in Chapter 5; we also flagged RQ2 on p. 19 so both chapters use identical construct naming.",
          styleStandard: "APA 7th Ed. Internal Consistency & Cross-Chapter Alignment",
        },
      },
      {
        id: "audit-defect-breakdown-table",
        heading: "Audit Data: Defect distribution across the 81,400-word doctoral manuscript",
        paragraphs: [
          [
            "Below is the exact breakdown of editorial interventions logged across the 81,400-word manuscript. Notice how surface typos accounted for less than a third of the issues that mattered for examination readiness:",
          ],
        ],
        table: {
          headers: [
            "Audit Category",
            "Defects Logged",
            "Caught by Grammar Checker?",
            "Impact on Viva / Examiner Report",
          ],
          rows: [
            [
              "In-Text vs. Reference List Mismatches (Citation Drift)",
              "47 instances",
              "No (0% caught)",
              "High — examiners routinely spot-check bibliography integrity first",
            ],
            [
              "Cross-Chapter Terminology & RQ Phrasing Drift",
              "19 instances",
              "No (0% caught)",
              "Critical — creates impression of fragmented argument across chapters",
            ],
            [
              "Sample Size / Table / In-Text Number Discrepancies",
              "8 instances",
              "No (0% caught)",
              "Critical — raises immediate methodological rigor questions in viva",
            ],
            [
              "Heading Hierarchy, TOC & Caption Numbering Breaks",
              "34 instances",
              "No (0% caught)",
              "Moderate to High — can trigger institutional repository deposit rejection",
            ],
            [
              "Dense Syntax, Passive Overuse & Hedging Calibration",
              "412 sentences",
              "Partially (often flattened)",
              "High — determines whether examiners read the thesis effortlessly",
            ],
            [
              "Surface Typos, Punctuation & UK/US Spelling Slips",
              "285 corrections",
              "Yes (~85% caught)",
              "Low to Moderate — distracting, but rarely fatal on its own",
            ],
          ],
        },
      },
      {
        id: "four-pass-human-triage-framework",
        heading: "Our 4-Pass Human Triage Framework for theses and dissertations",
        paragraphs: [
          [
            "Whether your manuscript is a 15,000-word Master's dissertation (eligible for instant estimation in our ",
            { text: "pricing calculator", href: "/pricing" },
            ") or an 80,000-word PhD thesis requiring a custom timeline via ",
            { text: "document submission", href: "/submit" },
            ", our editors execute four sequential passes:",
          ],
        ],
        checklist: {
          title: "The 4-Pass Doctoral Review Protocol",
          items: [
            [
              "Pass 1 — Macro Architecture & Construct Registry: We build a style sheet logging your exact RQs, variable names, sample sizes (N), abbreviations, and UK/US dialect rules from Chapter 1 through the Conclusion.",
            ],
            [
              "Pass 2 — Line-by-Line Substantive Editing & Hedging: We refine sentence mechanics, paragraph transitions, and scholarly tone using MS Word Track Changes while protecting verbatim participant quotes.",
            ],
            [
              "Pass 3 — Citation & Reference Reconciliation: Every in-text citation (Author, Year, p. X) is cross-checked against the master bibliography for spelling, publication year, DOI formatting, and missing/uncited entries.",
            ],
            [
              "Pass 4 — Repository Formatting & Field Lock: We verify heading styles, automated Table of Contents, List of Tables/Figures, pagination, and margin compliance before delivering both Tracked and Clean files.",
            ],
          ],
        },
      },
    ],
    faq: [
      {
        question: "How do I get a quote for a PhD thesis over 50,000 words?",
        answer:
          "Documents up to 50,000 words are estimated automatically in our pricing calculator. For doctoral theses above 50,000 words, contact our desk or submit your word count and deadline so we can assign a dedicated senior editor and confirm a realistic multi-chapter schedule.",
      },
      {
        question: "Will the editor change my verbatim interview transcripts or block quotes?",
        answer:
          "Never. Under our qualitative verification protocol, verbatim participant transcripts and direct literary/legal quotations are locked against editing so your empirical data remains 100% authentic.",
      },
    ],
    internalLinks: [
      {
        href: "/thesis-editing",
        label: "Thesis Editing Services",
        description: "Deep chapter-by-chapter editing and cross-chapter alignment for Master's and PhD theses.",
      },
      {
        href: "/dissertation-proofreading",
        label: "Dissertation Proofreading",
        description: "Whole-document final quality control, reference reconciliation, and deposit formatting.",
      },
      {
        href: "/pricing",
        label: "Pricing Calculator",
        description: "Check transparent per-word rates and turnaround timelines for your manuscript.",
      },
      {
        href: "/submit",
        label: "Start Secure Upload",
        description: "Submit your thesis chapters or request a Free 300-Word Human Sample Edit.",
      },
    ],
  },
  {
    title: "We Tested AI vs. a Human Editor on a 3,500-Word Research Draft: What Each Caught and Missed",
    slug: "ai-vs-human-editing-3500-word-experiment",
    excerpt:
      "Using a standard 3,500-word academic research draft ($80.50 on our 14-day turnaround curve), we planted 45 real-world errors across surface grammar, argument logic, statistical hedging, and APA 7th citations. Here is the exact scorecard.",
    category: "Editorial Benchmarks & Pricing",
    author: institutionalAuthor,
    reviewer: "Senior Academic Editorial Board — My Editing and Proofreading Desk",
    editorialDesk: "STEM & Social Sciences Joint Benchmark Desk",
    styleStandards: ["APA 7th Ed.", "Chicago 17th Ed.", "CONSORT / Empirical Reporting"],
    datePublished: "2026-11-04",
    dateUpdated: "2026-11-04",
    readingTime: "10 min read",
    metaTitle: "AI vs. Human Editor on a 3,500-Word Research Draft ($80.50 Test)",
    metaDescription:
      "We tested an LLM grammar tool vs. a senior human editor on a 3,500-word research paper ($80.50 baseline). See the full scorecard across grammar, hedging, and citations.",
    heroImage: "/images/blog/editing-vs-proofreading-hero-v2.png",
    heroImageAlt: "Scorecard comparing AI editing tool versus human academic editor on a 3,500-word research paper",
    tableOfContents: [
      { id: "benchmark-design-3500-words", label: "Why we chose a 3,500-word ($80.50) benchmark draft" },
      { id: "the-45-planted-defects", label: "The 45 defects planted in the test manuscript" },
      { id: "head-to-head-scorecard-table", label: "Scorecard Table: AI vs. Human Editor across 6 categories" },
      { id: "where-ai-introduced-new-errors", label: "Tracked-Changes Comparison: Where AI introduced a false citation claim" },
      { id: "cost-and-roi-breakdown", label: "Cost vs. Risk: Breaking down the $80.50 human edit" },
    ],
    body: [
      {
        id: "benchmark-design-3500-words",
        heading: "Why we benchmarked a 3,500-word empirical draft ($80.50 baseline)",
        paragraphs: [
          [
            "Three thousand five hundred words is the exact length of a standard short empirical journal communication, a conference proceedings paper, or a core dissertation methodology chapter. On our ",
            { text: "pricing calculator", href: "/pricing" },
            ", 3,500 words at a flexible 14-day turnaround scales from our $0.030/word base rate to an effective rate of **$0.023 per word**—an editorial subtotal of **$80.50** ($84.53 including the 5% checkout processing fee).",
          ],
          [
            "Researchers frequently ask a fair question: *Why pay $80.50 for a human editor when an AI tool can rewrite 3,500 words in 90 seconds?* To answer with empirical evidence rather than marketing claims, our editorial board took a 3,500-word health-policy and econometrics draft and seeded it with 45 real-world defects drawn from actual peer-review rejection reports.",
          ],
        ],
      },
      {
        id: "the-45-planted-defects",
        heading: "How the controlled benchmark was structured",
        paragraphs: [
          [
            "We divided the 45 seeded defects across six categories weighted by how severely they impact journal peer review and thesis examination under ",
            { text: "APA 7th Edition style rules", href: "https://apastyle.apa.org/", external: true },
            " and ",
            { text: "COPE ethical editing guidelines", href: "https://publicationethics.org/", external: true },
            ":",
          ],
        ],
        bullets: [
          ["12 Surface Grammar & Punctuation Errors: Subject-verb agreement across long relative clauses, dangling modifiers, and missing serial commas."],
          ["8 ESL Syntax & Preposition Collocation Transfers: Non-idiomatic academic verb-preposition pairings and nominalization stacks."],
          ["7 Epistemic Hedging & Overclaiming Errors: Causal verbs ('proves', 'eliminates') applied to observational cross-sectional correlations."],
          ["6 In-Text vs. Table Numerical Contradictions: Text reporting a 14.2% reduction while Table 2 showed 12.4%, plus p-value sign slips."],
          ["7 APA 7th Citation & Reference Drift Errors: Missing reference entries, 'et al.' misuse, and year mismatches between text and bibliography."],
          ["5 Argument Logic & Transition Gaps: Paragraphs whose concluding sentence contradicted the opening hypothesis."],
        ],
      },
      {
        id: "head-to-head-scorecard-table",
        heading: "Full Scorecard: Automated AI Pass vs. Senior Human Editor (3,500 Words)",
        paragraphs: [
          [
            "We ran identical copies of the 3,500-word manuscript through (A) a leading commercial AI academic rewriter and (B) a senior editor on our Subject-Matter Desk. Here are the measured results:",
          ],
        ],
        table: {
          headers: [
            "Defect Category (45 Total)",
            "Seeded Count",
            "AI Tool Caught",
            "Human Editor Caught",
            "Critical Side Effects Observed",
          ],
          rows: [
            [
              "1. Surface Grammar & Typos",
              "12",
              "12 / 12 (100%)",
              "12 / 12 (100%)",
              "Tie — both eliminated mechanical typos effectively",
            ],
            [
              "2. ESL Syntax & Collocations",
              "8",
              "7 / 8 (87.5%)",
              "8 / 8 (100%)",
              "AI replaced 3 domain terms with generic corporate synonyms",
            ],
            [
              "3. Hedging & Overclaiming",
              "7",
              "1 / 7 (14.3%)",
              "7 / 7 (100%)",
              "AI actually intensified 2 overclaims ('undeniably demonstrates')",
            ],
            [
              "4. Table vs. Text Number Checks",
              "6",
              "0 / 6 (0%)",
              "6 / 6 (100%)",
              "AI ignored Table 2 entirely and smoothed prose around wrong numbers",
            ],
            [
              "5. APA 7th Citation Consistency",
              "7",
              "2 / 7 (28.6%)",
              "7 / 7 (100%)",
              "AI fixed punctuation in citations but missed 5 missing/mismatched refs",
            ],
            [
              "6. Argument Logic & Transitions",
              "5",
              "1 / 5 (20.0%)",
              "5 / 5 (100%)",
              "Human editor left 5 specific margin queries resolving the logic gap",
            ],
            [
              "TOTAL DEFECTS RESOLVED",
              "45",
              "23 / 45 (51.1%)",
              "45 / 45 (100%)",
              "AI introduced 4 new terminology/claim distortions; Human introduced 0",
            ],
          ],
        },
      },
      {
        id: "where-ai-introduced-new-errors",
        heading: "Look closer: Where the AI rewrite introduced a dangerous distortion",
        paragraphs: [
          [
            "The most revealing moment in the experiment occurred in Section 3.2 of the test draft. The original sentence contained an awkward ESL clause alongside a subtle discrepancy with Table 2. The AI tool smoothed the grammar but cemented the wrong statistic and attached the citation to a claim the cited author never made. Our human editor caught both:",
          ],
        ],
        trackedChanges: {
          context: "Section 3.2 Empirical Results (3,500-Word Test Draft)",
          rawDraft:
            "As shown in Table 2, the subsidy policy reduced clinic wait times by 14.2% (p < 0.05), which is proving Smith et al. (2021) theory that rural clinics are always efficient.",
          humanRevision:
            "As shown in Table 2, the subsidy policy was associated with a 12.4% reduction in median clinic wait times (p = .034), extending Smith et al.'s (2021) findings on rural capacity constraints.",
          marginComment:
            "COMMENT [Benchmark Editor]: (1) Corrected 14.2% to 12.4% and p < 0.05 to exact p = .034 to match Table 2 Row 4. (2) Replaced causal 'proving' with 'was associated with' (cross-sectional data). (3) Note that in your Literature Review (p. 4), Smith et al. (2021) argued rural clinics face capacity constraints, not that they are 'always efficient'—adjusted to align.",
          styleStandard: "APA 7th Ed. Statistical & Citation Fidelity",
        },
      },
      {
        id: "cost-and-roi-breakdown",
        heading: "When to use our Free AI Tool—and when the $80.50 human edit pays for itself",
        paragraphs: [
          [
            "Does this mean researchers should never use AI tools? Not at all. In fact, we built our ",
            { text: "Free 1,000-Word AI Editing Tool", href: "/ai-editing-tool" },
            " specifically so authors can run a fast, zero-cost first pass on early rough notes to catch basic typos before their draft is ready for human eyes.",
          ],
          [
            "However, once a manuscript is headed to a journal editor, grant committee, or thesis examiner, the 48.9% of structural, numerical, hedging, and citation defects that automated tools miss are the exact defects that trigger desk rejections. At **$80.50 for 3,500 words** (14-day turnaround) via our ",
            { text: "thesis editing", href: "/thesis-editing" },
            " or ",
            { text: "dissertation proofreading", href: "/dissertation-proofreading" },
            " desk, human review costs less than a single journal submission fee—and you can test our quality first with a complimentary 300-word human sample edit.",
          ],
        ],
        callout: {
          title: "Want to run your own side-by-side test on your draft?",
          text: [
            "Send us the toughest 300-word passage from your current chapter via our ",
            { text: "Free 300-Word Human Sample Edit form", href: "/contact?type=sample-edit" },
            ". Compare our editor's MS Word Track Changes and margin comments against any automated tool before you spend a cent.",
          ],
        },
      },
    ],
    faq: [
      {
        question: "How is the $80.50 price for 3,500 words calculated?",
        answer:
          "Our standard published base rate is $0.030 per word. When you select a flexible 14-day turnaround for a 3,500-word document in our pricing calculator, our turnaround curve scales the effective rate to $0.023 per word (3,500 × $0.023 = $80.50 subtotal, or $84.53 with the 5% payment processing fee).",
      },
      {
        question: "Do Proofreading and Editing cost the same for a 3,500-word draft?",
        answer:
          "Yes. Under our Unified Academic Rate policy, both Proofreading and Substantive Editing use the same per-word turnaround curve so researchers never downgrade to surface proofreading when their paper genuinely needs deep editing.",
      },
    ],
    internalLinks: [
      {
        href: "/pricing",
        label: "Live Pricing Calculator",
        description: "Verify the 3,500-word ($80.50) estimate or calculate your exact manuscript word count.",
      },
      {
        href: "/thesis-editing",
        label: "Thesis Editing Services",
        description: "Substantive human editing for logic, hedging, tone, and cross-chapter consistency.",
      },
      {
        href: "/dissertation-proofreading",
        label: "Dissertation Proofreading",
        description: "Final human verification of grammar, tables, figures, and bibliography accuracy.",
      },
      {
        href: "/submit",
        label: "Upload Your Draft",
        description: "Start your secure upload or request a Free 300-Word Human Sample Edit.",
      },
    ],
  },
  {
    title: "The 60-Minute Pre-Submission Thesis Audit: 4 Checks to Run Before Hiring an Editor",
    slug: "60-minute-pre-submission-thesis-audit-checklist",
    excerpt:
      "A tactical 60-minute pre-flight playbook for Master's and PhD candidates: how to reconcile in-text citations, purge overclaiming verbs, lock Microsoft Word heading and caption styles, and write a 5-line editorial brief that maximizes your human editor's impact.",
    category: "Thesis & Dissertation Preparation",
    author: institutionalAuthor,
    reviewer: "Senior Academic Editorial Board — My Editing and Proofreading Desk",
    editorialDesk: "Social Sciences, Education & STEM Thesis Desk",
    styleStandards: ["APA 7th Ed.", "Chicago 17th Ed.", "MS Word Styles & Repository Rules"],
    datePublished: "2026-11-04",
    dateUpdated: "2026-11-04",
    readingTime: "9 min read",
    metaTitle: "The 60-Minute Pre-Submission Thesis Audit: 4 Essential Checks",
    metaDescription:
      "Run this tactical 60-minute pre-submission thesis audit before hiring an editor: citation cross-checking, verb calibration, Word style locking, and editorial briefs.",
    heroImage: "/images/blog/thesis-proofreading-checklist-hero-v2.png",
    heroImageAlt: "Doctoral researcher running a 60-minute pre-submission thesis audit in Microsoft Word before professional editing",
    tableOfContents: [
      { id: "why-60-minutes-matters", label: "Why 60 minutes of prep doubles the value of human editing" },
      { id: "minutes-0-to-20-citation-reconciliation", label: "Minutes 0–20: The split-screen citation & reference check" },
      { id: "minutes-20-to-35-overclaiming-verb-purge", label: "Minutes 20–35: Purging overclaiming verbs (with Tracked-Changes example)" },
      { id: "minutes-35-to-50-word-styles-lock", label: "Minutes 35–50: Locking MS Word headings, captions, and section breaks" },
      { id: "minutes-50-to-60-editorial-brief", label: "Minutes 50–60: Writing a 5-line editorial brief (with time-allocation table)" },
    ],
    body: [
      {
        id: "why-60-minutes-matters",
        heading: "Why 60 minutes of preparation doubles the value of professional editing",
        paragraphs: [
          [
            "When you commission professional ",
            { text: "thesis editing", href: "/thesis-editing" },
            " or ",
            { text: "dissertation proofreading", href: "/dissertation-proofreading" },
            ", you want your editor's cognitive energy focused on high-value scholarly improvements: refining dense arguments, smoothing chapter transitions, calibrating academic tone, and catching subtle consistency slips.",
          ],
          [
            "If your uploaded Microsoft Word file has broken reference manager fields, manual space-bar indents, or unflagged placeholder notes (`[INSERT CITATION HERE]`), your editor has to spend hours untangling mechanical clutter before addressing your prose. Running this structured 60-minute pre-submission audit before you ",
            { text: "submit your document", href: "/submit" },
            " ensures a faster, cleaner, and far more impactful editorial pass.",
          ],
        ],
      },
      {
        id: "minutes-0-to-20-citation-reconciliation",
        heading: "Check 1 (Minutes 0–20): The split-screen in-text citation cross-check",
        paragraphs: [
          [
            "Open your thesis in two side-by-side windows in Microsoft Word (`View > New Window > View Side by Side`). Scroll the left window to Chapter 1 and lock the right window on your Reference List or Bibliography. As outlined in the ",
            { text: "APA 7th Edition Reference List Checklist", href: "https://apastyle.apa.org/instructional-aids/reference-examples.pdf", external: true },
            " and the ",
            { text: "Chicago Manual of Style author-date guidelines", href: "https://www.chicagomanualofstyle.org/tools_citationguide/citation-guide-2.html", external: true },
            ", verify three non-negotiable details before uploading:",
          ],
        ],
        checklist: {
          title: "20-Minute Citation & Reference Triage",
          items: [
            [
              "Resolve all '[citation needed]' or '0000' placeholders: Search for brackets ('['), question marks ('??'), and 'Error! Reference source not found' across the entire file.",
            ],
            [
              "Unlink or export a clean copy of Zotero/EndNote/Mendeley fields: Save a backup with active fields, then save a copy with flattened text fields if you want your editor's Track Changes inside citations to stick permanently without field-refresh overwrites.",
            ],
            [
              "Supply missing DOIs and page ranges for direct quotes: A human proofreader can format DOIs and flag missing page numbers on direct quotes, but only the author has access to the source PDFs to supply a missing page number.",
            ],
          ],
        },
      },
      {
        id: "minutes-20-to-35-overclaiming-verb-purge",
        heading: "Check 2 (Minutes 20–35): Replace overclaiming verbs in your Results and Discussion",
        paragraphs: [
          [
            "Thesis examiners in the UK, US, Canada, and Australia routinely circle absolute verbs in Chapter 4 (Results) and Chapter 5 (Discussion). Spend 15 minutes running `Ctrl+F` for five high-risk words: **prove / proves / proved**, **undeniably**, **obviously**, **always**, and **cures / solves**. Where your evidence is correlational or qualitative, pre-adjust or flag the claim so your editor can polish the academic register accurately:",
          ],
        ],
        trackedChanges: {
          context: "Master's Thesis Chapter 5 Discussion — Author Pre-Audit + Editor Polish",
          rawDraft:
            "These regression results obviously prove that remote work policies always increase employee retention across the technology sector.",
          humanRevision:
            "Within our sampled software firms (N = 218), flexible remote-work arrangements were positively associated with 12-month employee retention (β = 0.31, p = .004), suggesting a meaningful retention benefit in knowledge-intensive roles.",
          marginComment:
            "COMMENT [Thesis Editing Desk]: Replaced 'obviously prove' and 'always increase' with bounded empirical reporting tied directly to your Model 3 beta coefficient.",
          styleStandard: "APA 7th Ed. Reporting Standards for Quantitative Research",
        },
      },
      {
        id: "minutes-35-to-50-word-styles-lock",
        heading: "Check 3 (Minutes 35–50): Lock Microsoft Word heading and caption styles",
        paragraphs: [
          [
            "Graduate school deposit rejections frequently stem from manually bolded headings that fail to populate the automated PDF bookmarks or Table of Contents. Spend 15 minutes opening the MS Word Navigation Pane (`View > Show > Navigation Pane`):",
          ],
        ],
        bullets: [
          ["Verify Heading Hierarchy: Every chapter title should use `Heading 1`, main sections `Heading 2`, and subsections `Heading 3`—never manual 16pt bold body text."],
          ["Check Table & Figure Sequence: Confirm that tables and figures follow a single numbering convention (either continuous `Table 1, Table 2` or chapter-indexed `Table 3.1, Table 3.2`) and that every table is explicitly called out in the body text."],
          ["Mark Verbatim Excerpts Clearly: Apply a consistent Block Quote style or quotation marks to interview transcripts so your editor knows which text is locked against grammatical alteration."],
        ],
      },
      {
        id: "minutes-50-to-60-editorial-brief",
        heading: "Check 4 (Minutes 50–60): Write a 5-line editorial brief before uploading",
        paragraphs: [
          [
            "When you calculate your rate on our ",
            { text: "pricing page", href: "/pricing" },
            " and proceed to upload, the 5-line note you include in the instructions box guides our Subject-Matter Desk from page one. Use the 60-minute schedule and brief template below:",
          ],
        ],
        table: {
          headers: [
            "Audit Block",
            "Time Allocation",
            "What You Fix Yourself",
            "What You Hand Off to Your Human Editor",
          ],
          rows: [
            [
              "Block 1: Citations & Fields",
              "Minutes 0–20",
              "Fill '[add ref]' gaps; supply missing quote page numbers",
              "Full APA/CMOS/OSCOLA syntax check & text-to-bibliography matching",
            ],
            [
              "Block 2: Claim Boundaries",
              "Minutes 20–35",
              "Flag sections where supervisor asked for stronger caution",
              "Sentence-level hedging calibration, scholarly tone & flow",
            ],
            [
              "Block 3: Word Structure",
              "Minutes 35–50",
              "Ensure all chapters are in one file (or clearly numbered)",
              "Heading consistency, automated TOC, caption & layout polish",
            ],
            [
              "Block 4: Editorial Brief",
              "Minutes 50–60",
              "State English dialect (UK/US/CA/AU), style guide & supervisor notes",
              "Tailored human Tracked Changes + targeted margin comments",
            ],
          ],
        },
        callout: {
          title: "Copy-and-paste 5-line Editorial Brief Template",
          text: [
            "1. Degree & Discipline (e.g., PhD in Public Health) | 2. Target English Dialect (e.g., UK English -ize/-ise) | 3. Style Manual (e.g., APA 7th / Harvard / OSCOLA) | 4. Locked Elements (e.g., Do not edit italic participant quotes in Chapter 4) | 5. Priority Focus (e.g., Tighten Literature Review transitions and check Discussion hedging).",
          ],
        },
      },
    ],
    faq: [
      {
        question: "Should I upload my thesis as one combined Word file or separate chapter files?",
        answer:
          "Whenever possible, upload a single combined Microsoft Word (.docx) file so your editor can reconcile cross-chapter terminology, abbreviations, heading styles, and the master reference list in one unified pass.",
      },
      {
        question: "Can I test your thesis editing on a short section before uploading my full dissertation?",
        answer:
          "Yes. You can request a Free 300-Word Human Sample Edit on any passage from your thesis to see our editor's Track Changes and margin comments before committing to a full upload.",
      },
    ],
    internalLinks: [
      {
        href: "/thesis-editing",
        label: "Thesis Editing Services",
        description: "Substantive chapter editing for clarity, structure, academic tone, and supervisor alignment.",
      },
      {
        href: "/dissertation-proofreading",
        label: "Dissertation Proofreading",
        description: "Final deposit-ready proofreading for long-form doctoral and Master's manuscripts.",
      },
      {
        href: "/pricing",
        label: "Pricing & Turnaround Calculator",
        description: "Get an instant word-count estimate from 12 hours to 28 days.",
      },
      {
        href: "/submit",
        label: "Submit Your Thesis",
        description: "Continue to secure portal upload or request a Free 300-Word Human Sample Edit.",
      },
    ],
  },
  {
    title: "Turnitin AI Detectors & University Ethics: How Timestamped Human Track Changes Protect Your Authorship",
    slug: "turnitin-ai-detection-human-track-changes-authorship",
    excerpt:
      "University academic integrity panels increasingly audit students whose drafts trigger Turnitin AI writing indicators after using LLM rephrasers. Learn why generative paraphrasing triggers authorship reviews—and how a human editor's timestamped MS Word Track Changes file proves authentic student authorship.",
    category: "Academic Integrity & Ethics",
    author: institutionalAuthor,
    reviewer: "Law, Policy & Academic Ethics Desk — My Editing and Proofreading Desk",
    editorialDesk: "Law, Policy & Academic Integrity Desk",
    styleStandards: ["University Proofreading Policies (UK/US/CA/AU)", "COPE Authorship Ethics", "APA 7th / OSCOLA"],
    datePublished: "2026-11-04",
    dateUpdated: "2026-11-04",
    readingTime: "11 min read",
    metaTitle: "Turnitin AI Detection & University Ethics: Human Track Changes",
    metaDescription:
      "Understand why LLM paragraph rewrites trigger Turnitin AI flags in theses and how timestamped human MS Word Track Changes protect your authentic student authorship.",
    heroImage: "/images/blog/research-paper-editing-checklist-before-submission.webp",
    heroImageAlt: "Microsoft Word document showing timestamped human Track Changes and margin queries that document authentic student authorship",
    tableOfContents: [
      { id: "how-university-ai-detectors-score-prose", label: "Why LLM paraphrasing triggers Turnitin perplexity & burstiness flags" },
      { id: "the-ethics-difference-rewriting-vs-editing", label: "University ethics rules: Generative rewriting vs. human copyediting" },
      { id: "track-changes-audit-trail-example", label: "Tracked-Changes Proof: How human margin queries preserve student agency" },
      { id: "authorship-protection-comparison-table", label: "Comparison Table: LLM Paraphrasers vs. Human Tracked-Changes Editing" },
      { id: "five-part-authorship-dossier", label: "How to maintain an unassailable authorship audit trail for your viva" },
    ],
    body: [
      {
        id: "how-university-ai-detectors-score-prose",
        heading: "Why 'innocent' LLM grammar rewrites trigger Turnitin AI writing indicators",
        paragraphs: [
          [
            "Across UK Russell Group universities, US R1 graduate schools, Canadian U15 institutions, and Australian Group of Eight faculties, a painful scenario has become commonplace: a graduate student writes an original 15,000-word thesis draft, pastes each paragraph into ChatGPT, Claude, or an AI paraphrasing tool with the prompt *'fix my grammar and make it flow better,'* and pastes the output into a clean Word document.",
          ],
          [
            "When the student uploads that file to the university submission portal, Turnitin's AI writing indicator—or an institutional linguistic audit—flags 60% to 90% of the thesis as synthetically generated. Even when the student possesses early notes proving they conducted the research, the clean pasted text exhibits near-zero **burstiness** (variation in sentence length and clause complexity) and artificially low **perplexity** (predictable next-word token probabilities).",
          ],
          [
            "Worse still, because the student pasted whole replacement paragraphs over their draft, the document's version history shows sudden block insertions rather than organic sentence-by-sentence revision. That is why graduate researchers turn to confidential human ",
            { text: "thesis editing", href: "/thesis-editing" },
            " and ",
            { text: "dissertation proofreading", href: "/dissertation-proofreading" },
            " rather than generative rewriters.",
          ],
        ],
      },
      {
        id: "the-ethics-difference-rewriting-vs-editing",
        heading: "Where university third-party proofreading policies draw the ethical line",
        paragraphs: [
          [
            "Most university senate regulations—alongside international standards from the ",
            { text: "Committee on Publication Ethics (COPE)", href: "https://publicationethics.org/guidance", external: true },
            " and the ",
            { text: "APA 7th Edition ethical compliance standards", href: "https://apastyle.apa.org/style-grammar-guidelines/research-publication/ethical-compliance", external: true },
            "—explicitly permit third-party human proofreading and copyediting provided three strict boundaries are respected:",
          ],
        ],
        bullets: [
          [
            "No Content Generation or Structural Rewriting: The editor corrects grammar, punctuation, syntax, academic register, and formatting consistency without writing new paragraphs or altering the student's academic argument.",
          ],
          [
            "Full Visibility via Tracked Changes: All editorial interventions are delivered in a marked-up file (`All Markup` in Microsoft Word) so the student—and, if requested, the supervisor—can inspect, accept, or reject every individual change.",
          ],
          [
            "Authorial Agency on Substantive Ambiguities: Whenever a sentence is logically ambiguous or missing evidence, the human editor does not guess or fabricate a fix; instead, the editor leaves a margin comment asking the student to clarify in their own words.",
          ],
        ],
      },
      {
        id: "track-changes-audit-trail-example",
        heading: "How a human editor's Track Changes + margin query preserves your authorship",
        paragraphs: [
          [
            "Compare what happens to an ambiguous thesis sentence under an LLM rewrite versus our human editorial protocol. An LLM silently rewrites the entire sentence and invents a bridging claim. Our human editor corrects only the grammatical mechanics in Track Changes and places the intellectual decision squarely back in your hands via a margin comment:",
          ],
        ],
        trackedChanges: {
          context: "PhD Law & Public Policy Chapter 4 (Regulatory Compliance Analysis)",
          rawDraft:
            "Because the statutory mechanism in Section 14 was poorly drafted by parliament, the regulators failed to enforce the environmental baseline between 2019 and 2023.",
          humanRevision:
            "Because the statutory mechanism in Section 14 contained ambiguous enforcement thresholds, regulatory agencies initiated fewer baseline compliance actions between 2019 and 2023.",
          marginComment:
            "COMMENT [Law & Policy Desk]: Refined 'poorly drafted' to 'contained ambiguous enforcement thresholds' to match the doctrinal analysis in Section 4.1. AUTHOR ACTION REQUIRED: Please confirm whether your empirical data shows zero enforcement actions ('failed to enforce') or a statistically reduced rate ('initiated fewer... actions'), and add the pinpoint statutory citation for Section 14.",
          styleStandard: "OSCOLA 4th Ed. & University Ethical Proofreading Policy",
        },
      },
      {
        id: "authorship-protection-comparison-table",
        heading: "Forensic Comparison: Generative AI Paraphrasing vs. Human MS Word Track Changes",
        paragraphs: [
          [
            "If an academic integrity officer or viva examiner ever asks how your manuscript was prepared, the difference between an unrecorded LLM paste-over and a professional human edit is night and day:",
          ],
        ],
        table: {
          headers: [
            "Verification Factor",
            "LLM Paraphraser / ChatGPT Rewrite",
            "Human Editor with MS Word Track Changes",
          ],
          rows: [
            [
              "Linguistic Burstiness & Perplexity",
              "Flattens sentence variance into uniform, high-probability AI token patterns",
              "Retains the author's natural clause architecture and disciplinary voice",
            ],
            [
              "Document Version Provenance",
              "Block copy-pasting erases granular edit history and triggers paste-event flags",
              "Every insertion, deletion, and punctuation change is timestamped in `.docx` XML",
            ],
            [
              "Handling of Unclear Arguments",
              "Hallucinates plausible-sounding filler transitions to mask logical gaps",
              "Leaves a transparent margin comment (`COMMENT`) for the student to resolve",
            ],
            [
              "Compliance with Senate Proofreading Rules",
              "Frequently violates rules against unattributed generative text replacement",
              "Fully compliant with standard university third-party proofreading guidelines",
            ],
            [
              "Audit Readiness if Queried by Committee",
              "No verifiable line-by-line record of what changed or why",
              "Student retains (1) Original Draft, (2) Editor Tracked File, and (3) Final Accepted File",
            ],
          ],
        },
      },
      {
        id: "five-part-authorship-dossier",
        heading: "How to maintain an unassailable 4-file authorship archive before submission",
        paragraphs: [
          [
            "Whenever you use our ",
            { text: "pricing calculator", href: "/pricing" },
            " and ",
            { text: "submit your document", href: "/submit" },
            " for human review, we recommend keeping a private 4-file folder on your local drive until your degree is officially conferred:",
          ],
        ],
        checklist: {
          title: "The 4-File Academic Authorship Protection Archive",
          items: [
            [
              "File 1 — Your Pre-Edit Working Drafts: Keep dated snapshots (`Thesis_Draft_PreEdit_2026-11-01.docx`) along with your raw data tables and reference manager library.",
            ],
            [
              "File 2 — Your University's Proofreading Policy PDF: Download your department's third-party proofreading guidelines and share them in our upload notes so your editor follows every institutional rule.",
            ],
            [
              "File 3 — The Human Editor's Timestamped Tracked-Changes File: Archive the `.docx` file we return showing every redline edit and margin comment.",
            ],
            [
              "File 4 — Your Post-Review Accepted Master File: Review each tracked change and resolve every margin comment in your own words before exporting your final submission PDF.",
            ],
          ],
        },
      },
    ],
    faq: [
      {
        question: "Will human proofreading or editing trigger Turnitin's AI detector?",
        answer:
          "No. Human editors preserve your natural sentence length variation (burstiness) and vocabulary choices while fixing grammatical and structural errors. Furthermore, because we deliver a timestamped MS Word Track Changes file alongside your clean copy, you always have complete forensic proof of every revision made to your original draft.",
      },
      {
        question: "Can I share my university's specific proofreading policy with my editor?",
        answer:
          "Yes—and we strongly encourage it. When uploading your file on `/submit` or requesting a sample edit on `/contact`, attach or paste your university's third-party proofreading rules so our desk scopes the intervention strictly within your institution's regulations.",
      },
    ],
    internalLinks: [
      {
        href: "/dissertation-proofreading",
        label: "Dissertation Proofreading",
        description: "Ethics-compliant human proofreading with full MS Word Track Changes.",
      },
      {
        href: "/thesis-editing",
        label: "Thesis Editing Services",
        description: "Chapter-level human editing and margin feedback that respects student authorship.",
      },
      {
        href: "/pricing",
        label: "Calculate Editing Cost",
        description: "See transparent per-word pricing and turnaround options for your thesis.",
      },
      {
        href: "/submit",
        label: "Submit Your Document",
        description: "Upload your draft securely or request a Free 300-Word Human Sample Edit.",
      },
    ],
  },
];

