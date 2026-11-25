import type { BlogPost } from "@/lib/blog";

const editorialDeskAuthor = "My Editing and Proofreading Desk";
const publishedDate = "2026-11-25";

export const blog2027SeoGeoPostsPart1: BlogPost[] = [
  {
    title: "2027 University & Journal AI Disclosure Policies: What PhD Students Must Declare",
    slug: "2027-university-journal-ai-disclosure-policies",
    excerpt:
      "A comprehensive 2027 compliance guide comparing generative AI disclosure mandates across Elsevier, Springer Nature, Taylor & Francis, APA, and doctoral graduate schools—distinguishing prohibited LLM drafting from permitted human academic editing in Microsoft Word Track Changes.",
    category: "Academic Integrity & Publishing Ethics",
    author: editorialDeskAuthor,
    reviewer: "Editorial Desk — My Editing and Proofreading Desk",
    editorialDesk: "Publication Ethics & Doctoral Compliance Desk",
    styleStandards: ["COPE AI Authorship Position", "ICMJE 2026–2027 Guidelines", "APA 7th / Elsevier / Springer Nature"],
    datePublished: publishedDate,
    dateUpdated: publishedDate,
    readingTime: "16 min read",
    metaTitle: "2027 University & Journal AI Disclosure Policies Guide",
    metaDescription:
      "Compare 2027 AI disclosure policies for Elsevier, Springer Nature, Taylor & Francis, and APA. Learn what PhD students must declare vs human Track Changes.",
    heroImage: "/images/blog/editing-proofreading-manuscript-submission.webp",
    heroImageAlt: "PhD manuscript showing 2027 journal AI disclosure compliance and human Microsoft Word Track Changes",
    tableOfContents: [
      { id: "landscape-2027-ai-disclosure", label: "The 2027 shift from detection to mandatory disclosure" },
      { id: "publisher-policy-comparison", label: "Elsevier, Springer Nature, Taylor & Francis & APA rules compared" },
      { id: "prohibited-ai-vs-permitted-human-editing", label: "Prohibited generative AI drafting vs. permitted human editing" },
      { id: "university-graduate-school-mandates", label: "University graduate school thesis declarations (US, UK, Canada, Australia)" },
      { id: "tracked-changes-disclosure-examples", label: "Before/After: Deficient vs. compliant 2027 AI & editing declarations" },
      { id: "audit-trail-provenance", label: "Building a timestamped Track Changes provenance package" },
      { id: "pre-submission-compliance-checklist", label: "2027 AI disclosure & ethics pre-submission checklist" },
    ],
    body: [
      {
        id: "landscape-2027-ai-disclosure",
        heading: "The 2027 shift from probabilistic detection to binding authorship disclosure",
        paragraphs: [
          [
            "As doctoral candidates and principal investigators prepare manuscripts for the 2027 publication and deposit cycle, the enforcement mechanism across major academic publishers and university senates has fundamentally changed. Rather than relying solely on probabilistic AI-text classifiers—which suffer from well-documented false-positive biases against non-native English writers and formulaic methods sections—journals and graduate schools now enforce legally and academically binding disclosure attestations at the point of submission.",
          ],
          [
            "Under the standardized framework established by the ",
            { text: "Committee on Publication Ethics (COPE) position statement on Authorship and AI tools", href: "https://publicationethics.org/cope-position-statements/ai-author", external: true },
            ", large language models (LLMs) and generative transformers cannot be listed as authors or co-authors on any scholarly manuscript, doctoral dissertation, or clinical report. Authorship requires legal accountability for the integrity of the empirical claims, ethical approval compliance, and the capacity to approve final page proofs—responsibilities that no algorithm can bear.",
          ],
          [
            "Crucially for PhD students, failure to declare assistive generative AI use during literature synthesis, code debugging, or prose paraphrasing is now classified by editorial boards not merely as a formatting oversight, but as a breach of research transparency. Conversely, commissioning professional human copyediting or ",
            { text: "academic proofreading services", href: "/academic-proofreading" },
            " delivered via transparent Microsoft Word Track Changes remains universally permitted across international publishers and graduate schools—provided the human editor refines clarity, grammar, and style without altering the author's intellectual contribution or fabricating data.",
          ],
        ],
        callout: {
          title: "The Core 2027 Compliance Rule for Doctoral Researchers",
          text: [
            "Using an LLM to generate, rewrite, or paraphrase paragraphs generally requires an explicit Methodology or Acknowledgments disclosure statement. Hiring a human editor to review your own draft in Microsoft Word Track Changes is standard scholarly quality control and does not trigger generative AI warnings.",
          ],
        },
      },
      {
        id: "publisher-policy-comparison",
        heading: "Major publisher policies compared: Elsevier, Springer Nature, Taylor & Francis, and APA (2027 Benchmark)",
        paragraphs: [
          [
            "While major publishing houses agree that generative AI cannot hold authorship, their specific rules on where and how to declare AI assistance—and where they draw the boundary between basic spell-checking and generative rewriting—differ in ways that can trigger desk rejection if ignored. Before uploading to Editorial Manager, ScholarOne, or Research Exchange, authors must verify the exact wording required by their target imprint.",
          ],
          [
            "For example, ",
            { text: "Elsevier's Generative AI Policies for Journals", href: "https://www.elsevier.com/about/policies-and-standards/the-use-of-generative-ai-and-ai-assisted-technologies-in-writing-for-elsevier", external: true },
            " require authors who use generative AI to improve readability and language to insert a dedicated section titled 'Declaration of Generative AI and AI-assisted technologies in the writing process' directly before the References list. By contrast, ",
            { text: "Springer Nature's Editorial Policies on Artificial Intelligence", href: "https://www.nature.com/nature-portfolio/editorial-policies/ai", external: true },
            " draw a sharp distinction between generative LLMs (which must be documented in the Methods or Acknowledgments section) and standard human copyediting or basic non-generative grammar checks.",
          ],
          [
            "Similarly, the ",
            { text: "APA Style guidelines on citing and disclosing generative AI", href: "https://apastyle.apa.org/blog/how-to-cite-chatgpt", external: true },
            " and Taylor & Francis author instructions mandate full transparency regarding the prompt engineering, model version, and verification workflow whenever an AI system contributes to text transformation or analytic scaffolding. When authors instead rely on human ",
            { text: "manuscript editing services", href: "/manuscript-editing" },
            ", the prose retains natural human burstiness and disciplinary nuance while avoiding mandatory AI-generation disclaimers.",
          ],
        ],
        table: {
          headers: [
            "Publisher / Standard",
            "Can AI Be an Author?",
            "Generative AI Paraphrasing / Rewriting Rule",
            "AI Image & Figure Generation Rule",
            "Human Editing & Track Changes Rule",
          ],
          rows: [
            [
              "Elsevier (Cell Press, The Lancet, ScienceDirect)",
              "No — strictly prohibited under authorship criteria",
              "Permitted for readability only if declared in a dedicated statement before the References section specifying tool name and purpose",
              "Strictly prohibited to generate or alter scientific figures, gels, or clinical images (unless AI is the explicit subject of the research method)",
              "Fully permitted without an AI declaration; standard human language editing is encouraged for clear scientific communication",
            ],
            [
              "Springer Nature (Nature Portfolio, BMC, Palgrave)",
              "No — LLMs cannot satisfy accountability rules",
              "Must be transparently documented in the Methods or Acknowledgments section; undisclosed LLM text rewriting risks editorial retraction",
              "Prohibited for all figures, microscopy, and graphical abstracts except within dedicated computer-vision methodology experiments",
              "Explicitly permitted; human copyediting and ESL language polishing do not require an AI disclosure statement",
            ],
            [
              "Taylor & Francis (Routledge, Dove Medical Press)",
              "No — human authors bear sole legal responsibility",
              "Requires explicit declaration identifying the model, version, provider, and exact scope of assistance in the manuscript text",
              "Prohibited unless pre-approved as the direct object of academic study with full provenance documentation",
              "Permitted and recommended for multilingual scholars; may be acknowledged in standard Acknowledgments if desired",
            ],
            [
              "American Psychological Association (APA 7th / APA Journals)",
              "No — AI tools are treated as non-author software/models",
              "Must be described in the Method section (or Introduction for literature reviews) including prompt context and citation of the model creator",
              "Synthetic data or figures must be explicitly labeled as algorithmically generated with full reproducible parameters",
              "Permitted as part of standard pre-submission peer and professional editorial review",
            ],
            [
              "IEEE & ACM Proceedings (2027 Conference & Transactions)",
              "No — human contributors only",
              "Any AI-generated or AI-rewritten text, code block, or proof step must be disclosed in the Acknowledgments with section-level specificity",
              "Prohibited for experimental plots and system architecture diagrams unless evaluating generative vision models",
              "Permitted; human technical editing preserves mathematical notation and LaTeX macro integrity",
            ],
          ],
        },
      },
      {
        id: "prohibited-ai-vs-permitted-human-editing",
        heading: "Drawing the red line: prohibited generative AI drafting vs. permitted human editing",
        paragraphs: [
          [
            "Why do university academic integrity committees and journal editors-in-chief treat an LLM rewrite so differently from a human editor's revision? The distinction lies in agency, cognitive ownership, and epistemic reliability. When a researcher pastes a rough paragraph into a generative prompt ('Rewrite this discussion section to sound like a Q1 Nature paper'), the transformer samples high-probability token sequences from its training distribution. In doing so, it frequently flattens cautious empirical hedging, invents unverified causal links, and replaces the author's disciplinary voice with homogenized 'synthetic prose'—a pattern we examined in our study on ",
            { text: "why AI grammar tools trigger journal desk rejections", href: "/blog/why-ai-grammar-tools-trigger-journal-desk-rejections" },
            ".",
          ],
          [
            "In contrast, a qualified human academic editor working within ",
            { text: "thesis editing services", href: "/thesis-editing" },
            " operates under strict non-generative boundaries. The human editor reads the student's existing sentences, repairs syntactic fractures, aligns tense shifts across IMRaD sections, standardizes terminology, and inserts margin queries whenever a claim is ambiguous (`COMMENT: Does 'significant' here refer to p < .05 in Table 3, or practical clinical importance? Please clarify in your own words.`).",
          ],
          [
            "Because every single insertion, deletion, and margin question is recorded inside an editable `.docx` file using Microsoft Word Track Changes, the doctoral student remains the active decision-maker. You review each suggested edit line by line, accept what sharpens your intended meaning, and answer content queries yourself.",
          ],
        ],
        bullets: [
          [
            "Prohibited without explicit disclosure (and often barred outright in doctoral theses): Prompting an LLM to draft literature review summaries, synthesize findings across unread PDFs, generate discussion limitations, or autonomously rewrite entire chapters for tone.",
          ],
          [
            "High-risk grey zone in 2027: Using generative 'fluency' or 'academic tone' browser extensions that silently replace whole clauses without preserving a timestamped human revision history. These tools routinely trip institutional stylometric audits.",
          ],
          [
            "Universally permitted across universities and journals: Human copyediting, mechanical proofreading, citation cross-checking, and ",
            { text: "document formatting services", href: "/document-formatting" },
            " where a human specialist refines your existing draft via Track Changes without introducing new academic content.",
          ],
          [
            "Safe preliminary self-check: Using a bounded, non-retentive grammar checker—such as our ",
            { text: "free AI editing assistant", href: "/ai-editing-tool" },
            " capped at 1,000 words—to spot surface typos in early working notes, followed by comprehensive human proofreading on the complete manuscript.",
          ],
        ],
      },
      {
        id: "university-graduate-school-mandates",
        heading: "What PhD and Master's students must declare to university graduate schools in 2027",
        paragraphs: [
          [
            "Across the United States, United Kingdom, Canada, and Australia, university graduate schools have updated their electronic thesis and dissertation (ETD) deposit portals for the 2026–2027 academic year. When you upload your final PDF to ProQuest, White Rose eTheses, TSpace, or your institutional repository, you are now required to sign an updated Statement of Originality and Authorship.",
          ],
          [
            "Most Russell Group (UK), Ivy League / R1 (US), U15 (Canada), and Group of Eight (Australia) institutions divide third-party and technological assistance into three distinct compliance tiers. Understanding which tier applies to your workflow prevents last-minute deposit holds prior to your viva voce or committee defense. For a deep look at university senate rules on third-party proofreaders, consult our guide on ",
            { text: "whether it is ethical to hire a thesis editor under university rules", href: "/blog/is-it-ethical-to-hire-a-thesis-editor-university-rules" },
            ".",
          ],
        ],
        numberedSteps: [
          [
            "Tier 1 — Permitted Human Proofreading & Copyediting (Standard Practice): Under UK proofreader guidelines (such as Oxford, Cambridge, Edinburgh, and UCL policies), Australian Institute of Professional Editors (IPEd) standards, and North American graduate handbooks, candidates may employ a professional human proofreader to check grammar, punctuation, spelling, citation consistency, and layout formatting. Most universities simply ask for a brief one-line acknowledgment in the thesis front matter (e.g., 'Professional copyediting and formatting review was provided by My Editing and Proofreading Desk in accordance with university third-party proofreading guidelines').",
          ],
          [
            "Tier 2 — Conditional / Declarable Technological Assistance: If your supervisory committee authorized the use of computational or AI tools for specific research tasks—such as Whisper transcription of qualitative interviews, Python code linting, or machine translation of archival foreign-language sources followed by human ",
            { text: "translation review", href: "/translation-review" },
            "—you must include a dedicated 'Statement on Assistive Technologies' in your front matter or Methodology chapter detailing the exact scope and human verification steps.",
          ],
          [
            "Tier 3 — Prohibited Unattributed Generative Text Production: Submitting text generated or substantively paraphrased by an LLM as your own assessed doctoral prose violates academic integrity statutes. If an examination board suspects unattributed LLM rewriting, they will request your longitudinal draft history and timestamped revision files.",
          ],
        ],
      },
      {
        id: "tracked-changes-disclosure-examples",
        heading: "Before & After: Deficient vs. compliant 2027 disclosure statements",
        paragraphs: [
          [
            "When authors do need to write an AI or editorial disclosure statement for a journal submission or doctoral front-matter declaration, vague or evasive wording immediately raises red flags with associate editors. Below is a real-world comparison from our ",
            { text: "Subject-Matter Editorial Desks", href: "/editors" },
            " illustrating how to transform an ambiguous, desk-rejection-prone disclosure into an audit-proof 2027 statement.",
          ],
        ],
        trackedChanges: {
          context: "Manuscript Front Matter — Declaration of Generative AI & Editorial Assistance",
          rawDraft:
            "The authors used AI tools and editing software to help write and improve the English grammar of this paper. All content was checked by the authors.",
          humanRevision:
            "Declaration of Generative AI and Editorial Assistance: No generative artificial intelligence (AI) or large language model (LLM) tools were used to draft, paraphrase, or analyze the scientific content of this manuscript. Preliminary exploratory code syntax was checked using GitHub Copilot (v1.240), with all statistical scripts independently validated in R (v4.4.2) by the first author. Final human language copyediting and APA 7th citation consistency review were performed via Microsoft Word Track Changes by My Editing and Proofreading Desk; the authors reviewed all tracked revisions and take full responsibility for the content of the publication.",
          marginComment:
            "COMMENT [Publication Ethics Desk]: Never write 'used AI tools to help write... this paper'—journal screening bots flag 'help write' as prohibited AI authorship. Separate computational code linting from manuscript prose, and state explicitly that language polishing was performed by human editors via Track Changes.",
          styleStandard: "Elsevier / ICMJE / COPE 2027 Disclosure Standard",
        },
      },
      {
        id: "audit-trail-provenance",
        heading: "How timestamped human Track Changes protect your authorship provenance",
        paragraphs: [
          [
            "Even when a PhD candidate writes every word of an 80,000-word dissertation without touching ChatGPT, Claude, or Gemini, aggressive institutional AI detectors can still flag dense literature reviews or standardized methodology chapters. Worse, if a student runs a finished chapter through an automated grammar rewriter the night before submission, the sudden shift in syntactic perplexity strips away their natural writing fingerprint—a risk we detailed in our guide on ",
            { text: "Turnitin AI detection and how human Track Changes protect authorship", href: "/blog/turnitin-ai-detection-human-track-changes-authorship" },
            ".",
          ],
          [
            "When you submit your dissertation or journal article for human review through our ",
            { text: "dissertation proofreading service", href: "/dissertation-proofreading" },
            ", you receive a dual-file delivery package that serves as verifiable authorship provenance:",
          ],
        ],
        bullets: [
          [
            "1. The Timestamped Master Track Changes File (`_Tracked.docx`): Every single grammatical correction, punctuation adjustment, heading alignment, and margin comment carries an individual editor timestamp. If a supervisor or journal editor ever asks how your draft evolved from rough chapter to polished submission, this file proves 100% human-in-the-loop revision.",
          ],
          [
            "2. The Publication-Ready Clean File (`_Clean.docx`): Once you have inspected the tracked edits and resolved any margin queries from your editor, you have a spotless file ready for PDF export or journal portal upload.",
          ],
          [
            "3. Zero LLM Training Exposure: Unlike free consumer browser extensions that harvest uploaded academic text to train commercial language models, documents uploaded to our ",
            { text: "secure submission portal", href: "/submit" },
            " are governed by strict confidentiality under our ",
            { text: "editorial policy", href: "/editorial-policy" },
            " and are never routed into external training corpora.",
          ],
        ],
      },
      {
        id: "pre-submission-compliance-checklist",
        heading: "2027 AI disclosure & editorial compliance checklist for PhD students",
        paragraphs: [
          [
            "Before you click 'Approve Submission' in Editorial Manager or upload your doctoral thesis to your university repository, run through this 8-point compliance verification gate. You can also estimate the timeline and fee for a full human Track Changes pass using our ",
            { text: "editing and proofreading pricing calculator", href: "/pricing" },
            ".",
          ],
        ],
        checklist: {
          title: "8-Point 2027 Journal & University Disclosure Verification Gate",
          items: [
            ["Verify your target journal's exact placement rule for AI declarations (e.g., Elsevier requires a standalone section immediately before References; Springer Nature requires Methods or Acknowledgments)."],
            ["Confirm that no generative AI tool or LLM is listed in the author byline, contributor CRediT taxonomy, or reference list as an author."],
            ["If zero generative AI was used for manuscript writing, state so explicitly if the submission portal requires an affirmative 'None declared' attestation."],
            ["Remove all silent browser-extension LLM rewrites that flatten disciplinary hedging or alter technical terminology."],
            ["Check that every figure, western blot, chart, and graphical abstract was created in standard scientific software (R, Python matplotlib, GraphPad, Adobe Illustrator) with zero generative AI pixel synthesis."],
            ["Archive your chronological draft saves (`v1_draft.docx`, `v2_supervisor_comments.docx`, `v3_human_tracked_edits.docx`) in private cloud storage as permanent authorship provenance."],
            ["Include a concise, policy-compliant acknowledgment of human copyediting or proofreading if required by your university graduate school handbook."],
            ["Inspect the final exported PDF to confirm that all Track Changes markup and margin comments are resolved and hidden in the clean submission copy."],
          ],
        },
      },
    ],
    faq: [
      {
        question: "Do I have to declare human proofreading or copyediting as 'AI assistance' to a journal?",
        answer:
          "No. Human copyediting and proofreading are not AI assistance. Major publishers (Elsevier, Springer Nature, Wiley, Taylor & Francis, IEEE, APA) explicitly encourage authors—especially multilingual researchers—to use professional human editing services to ensure clear scientific communication. You do not declare human editing under generative AI disclosures.",
      },
      {
        question: "What happens if I used an AI tool to brainstorm an outline, but wrote the paper myself?",
        answer:
          "Under 2027 COPE and publisher guidelines, if an LLM was used beyond basic information retrieval (similar to a search engine) to structure methodology or process text, most journals recommend a brief note in the Acknowledgments or Declaration section stating the tool name and confirming that all text was written and verified by the human authors.",
      },
      {
        question: "Are university thesis rules stricter than journal AI disclosure rules in 2027?",
        answer:
          "Often, yes. While a journal may allow declared LLM readability polishing, many university doctoral regulations prohibit generative AI from rewriting assessed thesis chapters because the degree evaluates the candidate's independent scholarly expression. Human proofreading via Track Changes remains the approved route for thesis language support.",
      },
      {
        question: "How can I prove my paper was edited by a human and not rewritten by ChatGPT?",
        answer:
          "Keep your pre-edit draft alongside the timestamped Microsoft Word Track Changes file delivered by your human editor. The granular line-by-line edit trail and contextual margin comments provide indisputable evidence of human editorial review.",
      },
    ],
    internalLinks: [
      {
        href: "/academic-proofreading",
        label: "Academic Proofreading Services",
        description: "100% human proofreading with timestamped MS Word Track Changes for journal papers and theses.",
      },
      {
        href: "/manuscript-editing",
        label: "Manuscript Editing Services",
        description: "Publication-grade human editing aligned with Elsevier, Springer Nature, IEEE, and APA standards.",
      },
      {
        href: "/thesis-editing",
        label: "Thesis Editing Services",
        description: "Chapter-by-chapter human structural and stylistic editing that respects university ethics rules.",
      },
      {
        href: "/ai-editing-tool",
        label: "Free AI Editing Assistant",
        description: "Test a short passage (up to 1,000 words) for quick first-pass grammar insights before human review.",
      },
      {
        href: "/pricing",
        label: "Pricing Calculator",
        description: "Estimate per-word human editing and proofreading rates by word count and turnaround speed.",
      },
      {
        href: "/blog/turnitin-ai-detection-human-track-changes-authorship",
        label: "Turnitin AI Detection & Human Track Changes",
        description: "Learn how timestamped human Track Changes protect doctoral and journal authorship.",
      },
      {
        href: "/blog/is-it-ethical-to-hire-a-thesis-editor-university-rules",
        label: "University Rules on Hiring a Thesis Editor",
        description: "Review official US, UK, Canadian, and Australian university proofreading guidelines.",
      },
    ],
  },
  {
    title: "Academic Editing & Proofreading Rates in 2027: Cost Benchmarks & Calculator Guide",
    slug: "academic-editing-proofreading-rates-2027",
    excerpt:
      "Transparent 2027 academic editing and proofreading cost benchmarks per word and per 1,000 words. Compare proofreading, substantive editing, and document formatting tiers, understand turnaround multipliers, and calculate your exact project fee.",
    category: "Pricing & Editorial Planning",
    author: editorialDeskAuthor,
    reviewer: "Editorial Desk — My Editing and Proofreading Desk",
    editorialDesk: "Academic Budgeting & Project Scoping Desk",
    styleStandards: ["EFA 2026–2027 Rate Benchmarks", "CIEP Academic Pricing Standards", "Unified Academic Rate Policy"],
    datePublished: publishedDate,
    dateUpdated: publishedDate,
    readingTime: "15 min read",
    metaTitle: "Academic Editing & Proofreading Rates in 2027 | Cost Guide",
    metaDescription:
      "See 2027 academic editing and proofreading rates per word and per 1,000 words. Compare turnaround tiers, thesis costs, and our live Pricing Calculator.",
    heroImage: "/images/blog/proofreading-cost-guide-hero.png",
    heroImageAlt: "2027 academic editing and proofreading rate breakdown per word and per 1,000 words alongside price calculator",
    tableOfContents: [
      { id: "industry-rate-benchmarks-2027", label: "2027 academic editing and proofreading rate benchmarks" },
      { id: "per-word-vs-per-1000-words-table", label: "Per-word and per-1,000-word pricing tiers compared" },
      { id: "unified-academic-rate-explained", label: "Why unified academic pricing prevents under-editing" },
      { id: "turnaround-multipliers-worked-examples", label: "Turnaround multipliers & real document cost examples" },
      { id: "hidden-fees-to-avoid", label: "Hidden fees and quote traps to avoid in 2027" },
      { id: "tracked-changes-value-comparison", label: "What your rate buys: surface check vs. deep human revision" },
      { id: "how-to-use-pricing-calculator", label: "Checklist: How to budget and lock in your lowest rate" },
    ],
    body: [
      {
        id: "industry-rate-benchmarks-2027",
        heading: "How academic editing and proofreading rates are structured in 2027",
        paragraphs: [
          [
            "Whether you are budgeting research grant funds for a peer-reviewed journal submission or paying out of pocket for a 75,000-word doctoral dissertation review, understanding how professional editorial rates work in 2027 protects you from both overpriced agency markups and low-quality automated 'human-in-the-loop' mills.",
          ],
          [
            "Across the global scholarly publishing industry, reputable editorial desks price work using one of three units: **per word** (e.g., `$0.022` to `$0.051` per word), **per 1,000 words** (`$22.00` to `$51.00` per 1,000 words), or **per standard manuscript page** (defined as 250 words per page). Per-word pricing is the fairest and most verifiable benchmark for academic authors because it scales linearly with the exact length of your `.docx` file rather than penalizing you for wide margins, double spacing, or hourly editor speed variations.",
          ],
          [
            "Industry associations such as the ",
            { text: "Editorial Freelancers Association (EFA) Editorial Rates chart", href: "https://www.the-efa.org/rates/", external: true },
            " and the ",
            { text: "Chartered Institute of Editing and Proofreading (CIEP) suggested minimum rates", href: "https://www.ciep.uk/resources/suggested-minimum-rates.html", external: true },
            " report typical independent specialist rates ranging from `$0.025` to `$0.060+` per word depending on technical complexity and turnaround speed. At **My Editing and Proofreading Desk**, our institutional workflow delivers 100% human subject-desk editing starting from `$0.022` per word on flexible timelines, with a transparent `$0.030` per word standard base rate that you can test instantly in our ",
            { text: "interactive pricing calculator", href: "/pricing" },
            ".",
          ],
        ],
        callout: {
          title: "Instant 2027 Rate Reference",
          text: [
            "At our Editorial Desk, Proofreading and Substantive Academic Editing scale from $0.022/word ($22 per 1,000 words on a 28-day schedule) to $0.038/word ($38 per 1,000 words on a 12-hour express schedule), with a $0.030/word standard base rate and a $10.00 minimum order.",
          ],
        },
      },
      {
        id: "per-word-vs-per-1000-words-table",
        heading: "2027 per-word and per-1,000-word pricing tiers: Proofreading vs. Editing vs. Formatting",
        paragraphs: [
          [
            "Many researchers struggle to compare quotes because one service advertises a flat rate per 1,000 words while another quotes per page or adds steep surcharges for scientific terminology. The benchmark table below translates our 2027 rate architecture across per-word, per-1,000-word, and standard 3,500-word journal article units across every core service tier.",
          ],
          [
            "Whether you select ",
            { text: "professional proofreading services", href: "/proofreading-services" },
            ", ",
            { text: "professional editing services", href: "/editing-services" },
            ", ",
            { text: "document formatting services", href: "/document-formatting" },
            ", or ",
            { text: "translation review", href: "/translation-review" },
            ", the rate is calculated upfront before you upload your file.",
          ],
        ],
        table: {
          headers: [
            "Service Tier",
            "Standard Base Rate (Per Word)",
            "Flexible 14-Day Rate (Per Word / Per 1,000 Words)",
            "Express 24-Hour Rate (Per Word / Per 1,000 Words)",
            "3,500-Word Paper Subtotal (14-Day Pace)",
            "Primary Editorial Scope",
          ],
          rows: [
            [
              "Proofreading (Final Surface Check)",
              "$0.030 / word",
              "$0.023 / word ($23.00 / 1k words)",
              "$0.036 / word ($36.00 / 1k words)",
              "$80.50 (+ 5% fee = $84.53 total)",
              "Grammar, typos, punctuation, regional spelling (UK/US/CA/AU), and final surface consistency",
            ],
            [
              "Substantive & Academic Editing",
              "$0.030 / word",
              "$0.023 / word ($23.00 / 1k words)",
              "$0.036 / word ($36.00 / 1k words)",
              "$80.50 (+ 5% fee = $84.53 total)",
              "Sentence restructuring, paragraph flow, scholarly register, hedging calibration, and margin queries",
            ],
            [
              "Business & Corporate Proofreading",
              "$0.030 / word",
              "$0.023 / word ($23.00 / 1k words)",
              "$0.036 / word ($36.00 / 1k words)",
              "$80.50 (+ 5% fee = $84.53 total)",
              "Executive reports, client proposals, ESG disclosures, and pitch deck consistency",
            ],
            [
              "Document Formatting & Style Layout",
              "$0.040 / word",
              "$0.031 / word ($31.00 / 1k words)",
              "$0.048 / word ($48.00 / 1k words)",
              "$108.50 (+ 5% fee = $113.93 total)",
              "APA 7th, CMOS 17th, MLA, OSCOLA, IEEE, or university template margins, automated TOC, and captions",
            ],
            [
              "Translation Review & ESL Polishing",
              "$0.055 / word",
              "$0.042 / word ($42.00 / 1k words)",
              "$0.066 / word ($66.00 / 1k words)",
              "$147.00 (+ 5% fee = $154.35 total)",
              "Deep syntactic smoothing and idiomatic English refinement for translated or heavy-ESL manuscripts",
            ],
            [
              "Developmental Writing Support",
              "$450.00 fixed package",
              "$450.00 flat package",
              "Custom scheduled milestone",
              "$450.00 (+ 5% fee = $472.50 total)",
              "High-level chapter architecture, supervisor feedback action plan, and structural reframing",
            ],
          ],
        },
      },
      {
        id: "unified-academic-rate-explained",
        heading: "Why our Unified Academic Rate policy prices Proofreading and Editing on the same curve",
        paragraphs: [
          [
            "At traditional commercial editing agencies, 'Substantive Editing' is typically priced 40% to 75% higher than 'Basic Proofreading.' In practice, that price gap creates a costly trap for PhD and Master's students: to save money, a candidate orders basic proofreading on a draft that actually suffers from awkward sentence transitions, inconsistent tense shifts between Methods and Results, or uncalibrated claims.",
          ],
          [
            "When a draft needs editing but is booked for proofreading, either the proofreader leaves the awkward phrasing untouched (disappointing the author) or halts the project to demand an expensive mid-order upgrade. To eliminate that friction, **My Editing and Proofreading Desk** operates a **Unified Academic Rate policy**: Proofreading and Substantive Academic Editing share the exact same `$0.022` to `$0.038` per word turnaround curve.",
          ],
          [
            "This means you can choose the exact editorial depth your manuscript requires—whether it is a locked final draft ready for ",
            { text: "dissertation proofreading", href: "/dissertation-proofreading" },
            " or a developing chapter that needs deep ",
            { text: "thesis editing", href: "/thesis-editing" },
            "—without any financial penalty. If you are unsure which tier matches your current draft stage, read our guide on ",
            { text: "editing vs. proofreading differences", href: "/blog/editing-vs-proofreading" },
            " and our earlier breakdown of ",
            { text: "how much proofreading costs", href: "/blog/how-much-does-proofreading-cost" },
            ".",
          ],
        ],
      },
      {
        id: "turnaround-multipliers-worked-examples",
        heading: "Turnaround multipliers & real 2027 cost benchmarks by document type",
        paragraphs: [
          [
            "In academic editing, turnaround speed is the primary variable you control to reduce your cost. Because careful human line-editing cannot be rushed without assigning senior desk capacity on priority schedules, express deadlines carry a higher effective per-word multiplier, while planning ahead for a 7-day, 14-day, or 28-day turnaround rewards you with our lowest per-word rates.",
          ],
          [
            "In addition, our calculator enforces realistic human capacity caps so quality never drops on large manuscripts. For example, a 12-hour or 24-hour express turnaround is available for journal papers, abstracts, and chapters up to sensible word-count ceilings, whereas a 40,000-word Master's dissertation or 85,000-word PhD thesis automatically selects a multi-day or multi-week schedule that allows thorough cross-chapter verification.",
          ],
        ],
        table: {
          headers: [
            "Academic Document Type",
            "Typical Word Count",
            "Recommended Service",
            "Flexible 14-Day Subtotal ($0.023/w)",
            "Standard 5-Day Subtotal ($0.028/w)",
            "Priority 48-Hour Subtotal ($0.034/w)",
          ],
          rows: [
            [
              "Academic CV or Industry Resume",
              "1,000 words",
              "CV & Resume Editing",
              "$23.00 ($24.15 w/ 5% fee)",
              "$28.00 ($29.40 w/ 5% fee)",
              "$34.00 ($35.70 w/ 5% fee)",
            ],
            [
              "Conference Paper / Short Article",
              "3,500 words",
              "Academic Editing / Proofreading",
              "$80.50 ($84.53 w/ 5% fee)",
              "$98.00 ($102.90 w/ 5% fee)",
              "$119.00 ($124.95 w/ 5% fee)",
            ],
            [
              "Full Peer-Reviewed Journal Manuscript",
              "7,500 words",
              "Manuscript Editing",
              "$172.50 ($181.13 w/ 5% fee)",
              "$210.00 ($220.50 w/ 5% fee)",
              "$255.00 ($267.75 w/ 5% fee)",
            ],
            [
              "Single PhD Thesis Chapter (e.g., Discussion)",
              "10,000 words",
              "Thesis Editing",
              "$230.00 ($241.50 w/ 5% fee)",
              "$280.00 ($294.00 w/ 5% fee)",
              "$340.00 ($357.00 w/ 5% fee)",
            ],
            [
              "Complete Master's Dissertation",
              "18,000 words",
              "Dissertation Proofreading",
              "$414.00 ($434.70 w/ 5% fee)",
              "$504.00 ($529.20 w/ 5% fee)",
              "Staged 3–5 day minimum recommended",
            ],
            [
              "Full Doctoral (PhD) Dissertation",
              "45,000 words",
              "Thesis Editing or Proofreading",
              "$1,035.00 ($1,086.75 w/ 5% fee)",
              "7–14 day schedule required for quality",
              "Custom staged chapter delivery",
            ],
          ],
        },
        bullets: [
          [
            "How the 3,500-word baseline calculation works: At the 14-day turnaround tier (`$0.023` per word), a 3,500-word research paper costs `3,500 × $0.023 = $80.50` in editorial fees. At checkout, the transparent `5%` platform processing charge (`$4.03`) brings the final verified total to `$84.53`.",
          ],
          [
            "What if my document includes a massive Reference list or uneditable tables? When you upload your `.docx` file in the ",
            { text: "client submission portal", href: "/submit" },
            ", our parser detects the total word count automatically, and you can enter an optional adjusted word count if you wish to exclude locked bibliography pages from editing.",
          ],
          [
            "What if my doctoral thesis exceeds 50,000 words? Projects above `50,000` words qualify for a tailored multi-chapter schedule and custom quote via our ",
            { text: "global editorial desks", href: "/contact" },
            ".",
          ],
        ],
      },
      {
        id: "hidden-fees-to-avoid",
        heading: "5 hidden pricing traps to watch out for when comparing editing services in 2027",
        paragraphs: [
          [
            "Not all per-word quotes include the same deliverables. Before committing your dissertation or grant manuscript to an online editing provider, audit their quote structure against these five common industry surcharges:",
          ],
        ],
        numberedSteps: [
          [
            "1. 'Subject-Matter / STEM Surcharges': Many platforms advertise a low entry rate (`$0.019/word`) on their landing page, then add a 35% 'Technical/Medical/STEM Specialization Fee' at checkout once you select Engineering, Clinical Medicine, or Econometrics. Our per-word rate includes assignment to our STEM, Social Sciences, Law, or Corporate desk at zero extra markup.",
          ],
          [
            "2. 'AI-Assisted Human Review' Disguised as Full Human Editing: Some budget services run your manuscript through an LLM API first and pay a gig-worker ten minutes to skim the output. As documented in the ",
            { text: "COPE guidelines on AI in scholarly publishing", href: "https://publicationethics.org/cope-position-statements/ai-author", external: true },
            ", undisclosed automated rewriting jeopardizes authorship compliance. Always demand 100% human line-by-line Microsoft Word Track Changes.",
          ],
          [
            "3. Charging Extra for Track Changes or Margin Comments: Every professional academic edit should include both a marked-up file (`All Markup` Track Changes + margin rationale notes) and a clean file at no additional fee.",
          ],
          [
            "4. Billing Full Rates for Unchecked Reference Lists: If you only need body chapters edited and your reference manager (Zotero, EndNote, Mendeley) has already locked the bibliography, make sure you can specify your editable word count.",
          ],
          [
            "5. Ambiguous Currency and Hidden Checkout Taxes: Confirm whether a quoted rate is in USD, GBP, EUR, or AUD before uploading. Our ",
            { text: "pricing calculator", href: "/pricing" },
            " displays exact USD subtotals and states the flat 5% checkout processing fee transparently before you ever create an order.",
          ],
        ],
      },
      {
        id: "tracked-changes-value-comparison",
        heading: "What your per-word rate actually buys: Tracked-Changes intervention benchmark",
        paragraphs: [
          [
            "To see why human substantive editing at `$0.023–$0.030/word` delivers measurable return on investment compared with free grammar checkers—as proven in our ",
            { text: "3,500-word AI vs. human editing experiment", href: "/blog/ai-vs-human-editing-3500-word-experiment" },
            "—examine how a human desk editor repairs both surface mechanics and methodological precision in a single pass:",
          ],
        ],
        trackedChanges: {
          context: "Empirical Economics Manuscript — Results & Statistical Interpretation (3,500-Word Paper @ $80.50 / 14-Day Tier)",
          rawDraft:
            "Table 4 shows that the regression coefficient for CarbonTax is -0.412 (p = 0.000), which proves that carbon pricing causes a 41.2% drop in emissions across all industrial sectors.",
          humanRevision:
            "As reported in Table 4, the fixed-effects regression coefficient for CarbonTax is −0.412 (p < .001), indicating that a one-unit increase in the carbon tax index is associated with an estimated 41.2% reduction in log-transformed sector emissions within the sampled OECD panel.",
          marginComment:
            "COMMENT [STEM & Quantitative Desk]: (1) Replaced 'p = 0.000' with standard APA/econometric notation 'p < .001' and true minus sign (−). (2) Calibrated causal overclaim ('proves... causes across all sectors') to match your panel fixed-effects specification and log-dependent variable definition in Equation (2).",
          styleStandard: "APA 7th Quantitative & Econometric Reporting Standard",
        },
      },
      {
        id: "how-to-use-pricing-calculator",
        heading: "How to budget your 2027 editorial project and lock in the lowest rate",
        paragraphs: [
          [
            "Ready to calculate your exact fee? Open our ",
            { text: "live Editing & Proofreading Pricing Calculator", href: "/pricing" },
            ", sign in with one click via Google or email to save your quote in your client dashboard, or test a short excerpt first with our ",
            { text: "free AI editing tool", href: "/ai-editing-tool" },
            " or a ",
            { text: "free 300-word human sample edit", href: "/contact?type=sample-edit" },
            ".",
          ],
        ],
        checklist: {
          title: "6-Step Cost Optimization Checklist for Researchers",
          items: [
            ["Book 7 to 14 days ahead of your submission deadline to unlock the $0.023–$0.025/word flexible turnaround tiers instead of paying 24-hour rush multipliers."],
            ["Submit doctoral theses chapter-by-chapter (e.g., 8,000–12,000 words per milestone) as your supervisor approves each section, spreading cost and turnaround evenly."],
            ["Select Substantive Editing rather than surface Proofreading under our Unified Academic Rate whenever your draft needs sentence flow, hedging, or transition improvements."],
            ["Bundle Document Formatting ($0.029–$0.051/word) only when you need full template styling, automated Table of Contents/Lists of Figures, and layout compliance."],
            ["Use your exact editable word count from Microsoft Word before uploading to verify your subtotal in the Pricing Calculator."],
            ["Request a complimentary 300-word human sample edit on confidential theses above 15,000 words to evaluate editor fit before paying a single dollar."],
          ],
        },
      },
    ],
    faq: [
      {
        question: "How much does it cost to proofread or edit a 10,000-word thesis chapter in 2027?",
        answer:
          "At our 14-day flexible turnaround rate ($0.023/word), a 10,000-word thesis chapter costs $230.00 in editorial fees (or $241.50 including the 5% checkout processing fee). At our standard 7-day pace ($0.026/word), the editorial subtotal is $260.00.",
      },
      {
        question: "Why do Proofreading and Academic Editing cost the same per word on your platform?",
        answer:
          "We enforce a Unified Academic Rate policy ($0.022–$0.038/word across turnaround tiers) so students and researchers never under-select surface proofreading when their manuscript genuinely requires substantive sentence and structural editing.",
      },
      {
        question: "Is there a minimum order fee for short documents like abstracts or cover letters?",
        answer:
          "Yes. Our minimum order threshold is $10.00, which covers short 300-to-400-word journal abstracts, fellowship cover letters, or biographical statements.",
      },
      {
        question: "Can I get an official itemized invoice for university grant reimbursement?",
        answer:
          "Yes. Every verified payment in your client dashboard generates a downloadable receipt and itemized editorial invoice showing word count, service type (Academic Editing / Proofreading), and project ID for departmental or grant reimbursement.",
      },
    ],
    internalLinks: [
      {
        href: "/pricing",
        label: "Interactive Pricing Calculator",
        description: "Enter your exact word count and turnaround deadline to see live 2027 editing and proofreading costs.",
      },
      {
        href: "/proofreading-services",
        label: "Professional Proofreading Services",
        description: "Final-stage grammar, typo, punctuation, and consistency checks starting from $0.022/word.",
      },
      {
        href: "/editing-services",
        label: "Professional Editing Services",
        description: "Substantive sentence, flow, tone, and clarity editing under our Unified Academic Rate.",
      },
      {
        href: "/document-formatting",
        label: "Document Formatting Services",
        description: "Submission-ready APA, Chicago, IEEE, OSCOLA, and university thesis template formatting.",
      },
      {
        href: "/submit",
        label: "Submit Document & Lock Quote",
        description: "Upload your .docx file securely to verify word count and confirm your price before checkout.",
      },
      {
        href: "/blog/how-much-does-proofreading-cost",
        label: "How Much Does Proofreading Cost?",
        description: "Foundational guide to factors affecting proofreading estimates and turnaround scheduling.",
      },
      {
        href: "/blog/ai-vs-human-editing-3500-word-experiment",
        label: "3,500-Word ($80.50) AI vs. Human Benchmark",
        description: "See exactly what a $80.50 human edit caught on a 3,500-word research draft that AI missed.",
      },
    ],
  },
];
