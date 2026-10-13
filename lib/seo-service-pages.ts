import { BASE_RATE_DISPLAY, STANDARD_EDITORIAL_RATE } from "@/lib/pricing";

export type SeoServiceCheckItem = {
  title: string;
  description: string;
};

export type SeoServiceDocumentExample = {
  title: string;
  description: string;
};

export type SeoServiceSectionHeadings = {
  startHere: string;
  whoIsFor: string;
  whatWeCheck: string;
  whyItHelps: string;
  commonFiles: string;
  process: string;
  readyToStart: string;
  faq: string;
  related: string;
};

export type SeoServicePage = {
  slug: string;
  name: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  dateUpdated: string;
  h1: string;
  intro: string;
  sectionHeadings: SeoServiceSectionHeadings;
  audience: string[];
  checks: SeoServiceCheckItem[];
  benefits: string[];
  documentExamples: SeoServiceDocumentExample[];
  process: string[];
  pricingCta: string;
  related: string[];
  faq: Array<{ question: string; answer: string }>;
  workedExample?: {
    wordCount: number;
    description: string;
  };
};

export const seoServicePages: SeoServicePage[] = [
  {
    slug: "proofreading-services",
    name: "Professional Proofreading Services",
    eyebrow: "Final draft review",
    metaTitle: "Professional Proofreading Services for Final Drafts",
    metaDescription: "Human proofreading for essays, dissertations, manuscripts and business documents. Final-draft checks for grammar, spelling, punctuation and consistency.",
    dateUpdated: "2026-08-04",
    h1: "Professional Proofreading Services for Academic, Business, and Author Documents",
    intro: "Professional proofreading provides a rigorous final check of grammar, punctuation, spelling, syntax, and consistency for completed drafts. Designed for students, researchers, business teams, and authors whose arguments are settled, this service preserves your voice while removing presentation errors. Standard rates start from " + BASE_RATE_DISPLAY + " per word, calculated by word count and turnaround speed.",
    sectionHeadings: {
      startHere: "Upload your final draft securely or calculate proofreading pricing",
      whoIsFor: "Who our professional proofreading service supports",
      whatWeCheck: "What our professional proofreaders check in your final draft",
      whyItHelps: "Why professional proofreading strengthens your final draft",
      commonFiles: "Common documents and drafts we proofread",
      process: "From secure draft upload to final proofread delivery",
      readyToStart: "Ready to start your professional proofread?",
      faq: "Professional Proofreading Services FAQs",
      related: "Related editing and formatting services",
    },
    audience: [
      "Students preparing final essays, theses, and dissertations",
      "Researchers submitting journal manuscripts for peer review",
      "Authors polishing books, essays, and long-form creative writing",
      "Professionals sending reports, CVs, proposals, and business documents"
    ],
    checks: [
      {
        title: "Grammar, punctuation, spelling, and typographical errors",
        description: "We review sentence mechanics, comma usage, apostrophes, and common spelling slips to ensure complete mechanical accuracy throughout your draft.",
      },
      {
        title: "Capitalization, hyphenation, abbreviations, dates, and terminology",
        description: "We confirm that stylistic treatments, acronym expansions, numeric formats, and technical terms remain uniform from the first page to the last.",
      },
      {
        title: "Headings, lists, captions, tables, and document-wide consistency",
        description: "We check structural hierarchy, bullet formatting, caption numbering, and cross-references so your file presents information cleanly.",
      },
      {
        title: "Minor wording issues and sentence flow interruptions",
        description: "We resolve awkward phrasing and repeated words that disrupt clarity while keeping your original meaning and authorial tone intact.",
      },
    ],
    benefits: [
      "A cleaner document that feels credible and ready to share",
      "Human judgment for context-sensitive corrections",
      "Confidential handling through the secure upload and dashboard flow",
      "Clear next steps if the document needs deeper editing instead of proofreading"
    ],
    documentExamples: [
      {
        title: "Final essays and research papers",
        description: "Undergraduate and postgraduate papers reviewed before final grading or submission, checking style compliance and presentation.",
      },
      {
        title: "Completed dissertations and theses",
        description: "Doctoral and Master's projects undergoing a comprehensive final-pass review after supervisor amendments have been incorporated.",
      },
      {
        title: "Business reports, proposals, and presentations",
        description: "Client-facing proposals, executive briefs, and slide decks checked for clear language and brand presentation before distribution.",
      },
      {
        title: "Book manuscripts, CVs, resumes, and cover letters",
        description: "Literary works and career applications refined to remove distracting typos and maintain reader engagement.",
      },
    ],
    process: [
      "Upload your file securely and choose proofreading.",
      "Confirm word count, turnaround, notes, and pricing before payment.",
      "A human proofreader reviews the final draft systematically.",
      "Receive the polished file through your dashboard with corrections and notes where needed."
    ],
    pricingCta: "Proofreading price depends on word count and turnaround. Use the pricing calculator for an estimate or upload the final draft to start.",
    related: ["academic-proofreading", "business-proofreading", "cv-resume-editing"],
    faq: [
      { question: "What does a professional proofreading service include?", answer: "Proofreading corrects grammar, punctuation, spelling, typos, and consistency problems in a complete draft. It can also catch light wording and formatting issues, but it does not restructure paragraphs or rewrite large sections." },
      { question: "When should I choose proofreading instead of editing?", answer: "Choose proofreading when your content, structure, and argument are already final. Choose editing if the document still needs clearer organization, stronger flow, improved tone, or substantial sentence-level rewriting." },
      { question: "Can you proofread academic and business documents?", answer: "Yes. We proofread academic papers, dissertations, manuscripts, reports, proposals, presentations, CVs, resumes, and other professional documents." },
      { question: "What is not included in proofreading?", answer: "Proofreading does not redesign the argument or reorganize substantial sections. It does not verify every factual claim, citation, name, number, or external source unless agreed separately. The author remains responsible for facts, arguments, and final approval." },
      { question: "How is proofreading priced?", answer: "Pricing starts from " + BASE_RATE_DISPLAY + " per word for standard delivery. The exact estimate depends on word count and turnaround time selected in our transparent pricing calculator." },
      { question: "How does the file submission and delivery process work?", answer: "You upload your draft securely through our client portal, select your desired turnaround timeline, and receive tracked changes and comments with a clean final file through your private dashboard." },
      { question: "Do you provide tracked changes with proofreading?", answer: "Yes. All corrections are provided via Microsoft Word Track Changes or comments so you can review, accept, or reject every suggested editorial amendment." },
    ],
    workedExample: {
      wordCount: 3000,
      description: "Sample calculation for a 3,000-word academic or professional draft at our standard editorial base rate.",
    },
  },
  {
    slug: "editing-services",
    name: "Professional Editing Services",
    eyebrow: "Clarity and structure",
    metaTitle: "Professional Editing Services for Papers and Documents",
    metaDescription: "Human editing for academic papers, manuscripts and business documents. Improve clarity, structure, tone and flow, with tracked changes you can review.",
    dateUpdated: "2026-08-04",
    h1: "Professional Editing Services for Academic, Business, and Manuscript Writing",
    intro: "Professional editing improves clarity, sentence flow, structural logic, tone, and concision across academic papers, manuscripts, and business communications. Built for authors, scholars, and professionals needing deeper revision than proofreading, editors provide tracked changes while keeping your core message intact. Standard editorial pricing starts from " + BASE_RATE_DISPLAY + " per word, determined by document length and requested turnaround.",
    sectionHeadings: {
      startHere: "Upload your draft securely or calculate editing rates",
      whoIsFor: "Who our professional editing service is designed for",
      whatWeCheck: "What our editors check across your document",
      whyItHelps: "Why comprehensive editing improves clarity and argument flow",
      commonFiles: "Common papers and manuscripts we edit",
      process: "From secure manuscript upload to final edited delivery",
      readyToStart: "Ready to start your document edit?",
      faq: "Professional Editing Services FAQs",
      related: "Related proofreading and manuscript services",
    },
    audience: [
      "Students and researchers with complex academic drafts needing structural refinement",
      "Authors preparing fiction or non-fiction manuscripts and book chapters",
      "Businesses improving reports, proposals, white papers, and client-facing documents",
      "Professionals who need clearer applications, personal statements, or portfolios"
    ],
    checks: [
      {
        title: "Argument flow, paragraph order, transitions, and section logic",
        description: "We assess the overarching narrative progression, ensuring ideas connect logically from paragraph to paragraph and section to section.",
      },
      {
        title: "Sentence clarity, concision, tone, grammar, and word choice",
        description: "We refine wordy or ambiguous phrasing, elevating tone and readability while ensuring precise academic or professional vocabulary.",
      },
      {
        title: "Audience fit, consistency, headings, terminology, and presentation",
        description: "We align stylistic choices with target reader expectations, standardizing specialized terms and heading hierarchies throughout.",
      },
      {
        title: "Editorial comments where the author must clarify facts or intent",
        description: "We insert margin notes highlighting gaps, ambiguous claims, or missing transitions that require author clarification.",
      },
    ],
    benefits: [
      "A stronger document before final proofreading",
      "Improved readability without automated rewriting",
      "Editorial comments that explain important changes",
      "Support for academic integrity and author ownership"
    ],
    documentExamples: [
      {
        title: "Academic drafts that need clearer structure",
        description: "Journal papers, literature reviews, and research chapters requiring tighter narrative focus and improved paragraph transitions.",
      },
      {
        title: "Reports and proposals that feel wordy or uneven",
        description: "Corporate deliverables and grant applications where concise phrasing and clear executive messaging are paramount.",
      },
      {
        title: "Manuscripts with inconsistent pacing or voice",
        description: "Book chapters and non-fiction essays that benefit from enhanced narrative balance and unified authorial tone.",
      },
      {
        title: "Applications, statements, and professional documents",
        description: "Personal statements, fellowship applications, and executive profiles edited for persuasive impact and professional clarity.",
      },
    ],
    process: [
      "Choose editing and upload your draft with notes about audience and deadline.",
      "Review the estimate based on word count, service depth, and turnaround.",
      "A human editor improves structure, clarity, tone, and language.",
      "Download the edited file and review comments through your dashboard."
    ],
    pricingCta: "Your estimate depends on the selected service, word count, and turnaround. Check the live calculator or upload your document for the clearest scope.",
    related: ["manuscript-editing", "thesis-editing", "translation-review"],
    faq: [
      { question: "What is included in professional editing?", answer: "Editing improves structure, paragraph flow, clarity, tone, word choice, grammar, and readability. Editors provide tracked changes and marginal comments highlighting areas for author clarification." },
      { question: "Will the editor rewrite my work?", answer: "The editor improves the writing you provide and may revise unclear sentences, but they do not invent evidence, sources, achievements, or assessed content for you." },
      { question: "Do I need proofreading after editing?", answer: "Important documents often benefit from proofreading after edits are accepted because new changes can introduce small errors or formatting inconsistencies." },
      { question: "What is not included in professional editing?", answer: "We do not invent facts, research data, sources, qualifications, or assessed content. Fact-checking, source verification, and writing new sections require separate written scope." },
      { question: "How much does editing cost?", answer: "Editing rates start from " + BASE_RATE_DISPLAY + " per word. The final rate is calculated from word count, service level, and turnaround speed in the pricing calculator." },
      { question: "How do I review the editor's revisions?", answer: "You receive your edited document with tracked changes and margin comments highlighting queries, transition improvements, and phrasing suggestions that you can review individually." },
      { question: "What is the difference between sentence editing and structural review?", answer: "Sentence editing focuses on clarity, tone, and flow within your wording. Structural review examines section logic, paragraph progression, and reader navigation through the document." },
    ],
    workedExample: {
      wordCount: 3000,
      description: "Sample calculation for a 3,000-word document edited at our standard editorial base rate.",
    },
  },
  {
    slug: "academic-proofreading",
    name: "Academic Proofreading Services",
    eyebrow: "Students and researchers",
    metaTitle: "Academic Proofreading Services for Students & Researchers",
    metaDescription: "Academic proofreading for essays, theses and journal manuscripts: grammar, clarity, formatting and reference consistency, checked by human editors.",
    dateUpdated: "2026-08-04",
    h1: "Academic Proofreading Services for Students and Researchers",
    intro: "Academic proofreading provides thorough linguistic and formatting review for essays, research papers, and journal submissions before committee or publisher evaluation. Designed for undergraduate, postgraduate, and international researchers, human editors check grammar, scholarly terminology, citations, and reference styles. Base academic pricing begins at " + BASE_RATE_DISPLAY + " per word, with final costs determined by word count and turnaround pace.",
    sectionHeadings: {
      startHere: "Upload your academic draft securely or check proofreading rates",
      whoIsFor: "Who academic proofreading services assist",
      whatWeCheck: "What we check in your academic papers and research drafts",
      whyItHelps: "Why academic proofreading enhances research credibility",
      commonFiles: "Common academic drafts and research papers we review",
      process: "From secure research upload to final academic proofread",
      readyToStart: "Ready to start your academic proofread?",
      faq: "Academic Proofreading Services FAQs",
      related: "Related dissertation and thesis review services",
    },
    audience: [
      "Undergraduate, Master's, and PhD students across the UK, US, Canada, UAE, Nigeria, and worldwide",
      "Researchers submitting papers to international SCI/Scopus indexed journals",
      "International ESL students and scholars needing natural academic English review",
      "Academic departments and research institutes needing consistent language styling"
    ],
    checks: [
      {
        title: "Grammar, punctuation, spelling, tense, and academic sentence boundaries",
        description: "We correct grammatical slips, improper verb tenses, dangling modifiers, and comma splices that compromise academic precision.",
      },
      {
        title: "British English (UK), American English (US), Canadian, or Australian style conventions",
        description: "We enforce consistent regional orthography, punctuation rules, and vocabulary across all sections of your research draft.",
      },
      {
        title: "Academic tone, cautious claims, terminology, headings, and discipline conventions",
        description: "We check scholarly phrasing, hedge language for scientific claims, and adherence to established disciplinary conventions.",
      },
      {
        title: "Citation and reference consistency across APA, Harvard UK, Chicago, IEEE, and others",
        description: "We cross-examine in-text citations against the bibliography, ensuring punctuation, author formats, and year order match guidelines.",
      },
      {
        title: "Tables, figures, captions, appendices, lists, and formatting details",
        description: "We verify caption formats, sequential numbering, and visual presentation across tables, figures, and supporting documentation.",
      },
    ],
    benefits: [
      "A polished academic document ready for UK, US, Canadian, or global university submission",
      "Confidential review of sensitive research material and data",
      "Academic integrity-friendly human editing that respects your authorship",
      "Clear editorial comments when a citation, discipline term, or claim requires clarification"
    ],
    documentExamples: [
      {
        title: "Essays, research papers, and term assignments",
        description: "Short and long academic assignments refined for clear thesis statements, logical paragraphs, and correct citation formatting.",
      },
      {
        title: "PhD theses, Master's dissertations, and research proposals",
        description: "Graduate capstone projects examined for strict adherence to university submission guidelines and referencing manuals.",
      },
      {
        title: "Journal manuscripts (Nature, Elsevier, Springer, IEEE, Wiley)",
        description: "Scholarly papers formatted and checked for publication readiness according to journal-specific instructions for authors.",
      },
      {
        title: "Abstracts, literature reviews, and conference papers",
        description: "Concise academic summaries polished for maximum impact and clarity ahead of symposium presentations or symposium proceedings.",
      },
    ],
    process: [
      "Upload your academic draft and specify target style (e.g., British UK or American English) and guidelines.",
      "Confirm word count, turnaround, and pricing before checkout.",
      "A subject-fluent human proofreader reviews language, referencing, and presentation.",
      "Receive your polished file securely with tracked corrections and explanatory notes."
    ],
    pricingCta: "Academic proofreading is priced by word count and turnaround. Use pricing for an estimate or upload securely to begin.",
    related: ["dissertation-proofreading", "thesis-editing", "manuscript-editing"],
    faq: [
      { question: "Can you proofread my thesis or dissertation?", answer: "Yes. We check grammar, clarity, consistency, references, formatting, headings, tables, figures, and final presentation for theses and dissertations across UK, US, Canadian, UAE, and international universities." },
      { question: "Do you support British English (UK) and Harvard referencing?", answer: "Yes. Our editorial team supports British English spelling and grammar conventions, Oxford style, and UK referencing standards including Harvard, OSCOLA (Law), and MHRA." },
      { question: "Is academic proofreading allowed by universities?", answer: "Academic proofreading is widely accepted when it focuses strictly on language, grammar, clarity, and presentation without creating research, data, or assessed arguments. Always ensure compliance with your specific institution's guidelines." },
      { question: "Do you check reference citations?", answer: "We verify citation consistency, punctuation, and matching between in-text citations and reference lists within your supplied document." },
    ],
  },
  {
    slug: "dissertation-proofreading",
    name: "Dissertation Proofreading Service",
    eyebrow: "Graduate submission",
    metaTitle: "Dissertation Proofreading Service for Final Submission",
    metaDescription: "Final-pass dissertation proofreading by human editors: grammar, citations, tables, figures and formatting checked. Secure upload, from " + BASE_RATE_DISPLAY + " per word.",
    dateUpdated: "2026-09-29",
    h1: "Dissertation Proofreading Services for Final Graduate Submission",
    intro: "Dissertation proofreading delivers comprehensive final-pass review for doctoral and Master's candidates preparing for submission or defense. Our human editors verify grammar, punctuation, reference citations, tables, figures, and institutional formatting without modifying your research findings. Standard dissertation proofreading rates start from " + BASE_RATE_DISPLAY + " per word, calculated transparently from total word count and selected turnaround timeline.",
    sectionHeadings: {
      startHere: "Upload your dissertation securely or estimate proofreading costs",
      whoIsFor: "Who our dissertation proofreading service is for",
      whatWeCheck: "What our dissertation proofreaders check before deposit",
      whyItHelps: "Why dissertation proofreading provides essential quality control",
      commonFiles: "Common dissertation chapters and files we proofread",
      process: "From secure dissertation upload to final submission-ready delivery",
      readyToStart: "Ready to start your dissertation proofread?",
      faq: "Dissertation Proofreading Service FAQs",
      related: "Related thesis and formatting services",
    },
    audience: [
      "PhD candidates requiring a final polish before committee defense",
      "Doctoral students in the UK (Russell Group) or North America",
      "International graduates needing native English proofreading",
      "Students executing a 15-point final dissertation checklist"
    ],
    checks: [
      {
        title: "Final-pass grammar, spelling, and typographical error elimination",
        description: "We conduct a thorough line-by-line review to eradicate lingering syntax errors, punctuation slips, and spelling anomalies before examiners read.",
      },
      {
        title: "In-text citation matching with the final bibliography (APA, Harvard, etc.)",
        description: "We ensure every cited author and date in your text appears accurately in your reference list, checking formatting and style adherence.",
      },
      {
        title: "Table of contents, list of figures, and front matter accuracy",
        description: "We check page number synchronization, chapter titles, acknowledgements, declarations, and abstract formatting against institutional requirements.",
      },
      {
        title: "Formatting consistency across margins, headings, and spacing",
        description: "We verify heading typography, line spacing, paragraph indents, and margin alignment to ensure clean presentation throughout the document.",
      },
    ],
    benefits: [
      "Detailed presentation review aligned with university deposit criteria",
      "Human editorial feedback to help you present your research clearly before your committee",
      "Strict adherence to academic integrity—we polish, we do not write",
      "Specialized handling of complex tables, figures, and appendices"
    ],
    documentExamples: [
      {
        title: "Master's dissertations",
        description: "Complete graduate dissertations reviewed for cohesive chapter presentation, scholarly tone, and precise citation formatting.",
      },
      {
        title: "PhD dissertations and doctoral theses",
        description: "Comprehensive doctoral dissertations evaluated across all chapters to verify complete mechanical and bibliographic consistency.",
      },
      {
        title: "Abstracts, acknowledgements, and front matter",
        description: "Preliminary dissertation pages checked for formal institutional conventions, correct pagination, and clear declarative wording.",
      },
      {
        title: "Reference lists, tables, figures, and appendices",
        description: "Back-matter sections audited for complete citation details, correct appendix labels, and orderly tabular layouts.",
      },
    ],
    process: [
      "Upload your dissertation and include university guidelines if available.",
      "Choose turnaround and review the word-count based estimate.",
      "A proofreader checks the document in staged passes.",
      "Review the delivered file and any comments before final submission."
    ],
    pricingCta: "Long dissertations may need a realistic schedule. Check pricing first, or upload the file so the scope and turnaround can be confirmed.",
    related: ["academic-proofreading", "thesis-editing", "document-formatting"],
    faq: [
      { question: "How long does dissertation proofreading take?", answer: "Turnaround depends on word count, language quality, formatting complexity, and deadline. Long dissertations should allow time for the proofread and for you to review corrections before submission." },
      { question: "Can you format my dissertation too?", answer: "We can support formatting checks and document presentation. If you need detailed institutional formatting, include the guidelines when you upload or contact us before payment." },
      { question: "Will proofreading change my research?", answer: "No. Proofreading improves language, consistency, and presentation. It does not invent data, rewrite findings, or make academic decisions that belong to you." },
      { question: "What is not included in dissertation proofreading?", answer: "Proofreading does not repair an unresolved research design or rewrite arguments. It does not replace supervisor feedback, institutional approval, or the author's responsibility for research data." },
      { question: "How is dissertation proofreading priced?", answer: "Pricing starts from " + BASE_RATE_DISPLAY + " per word for base turnaround. Turnaround adjustments apply for faster delivery, with estimates calculated before checkout in our pricing tool." },
      { question: "What academic citation and reference styles do you check?", answer: "We check citations and references against major styles including APA, Harvard, Chicago, MLA, IEEE, Vancouver, and OSCOLA." },
      { question: "How are tables, figures, and front matter reviewed?", answer: "Our proofreaders verify caption numbering, consistency with lists of tables and figures, and layout alignment according to your supplied formatting rules." },
    ],
    workedExample: {
      wordCount: 15000,
      description: "Sample calculation for a 15,000-word dissertation excerpt or complete Master's dissertation at our standard base rate.",
    },
  },
  {
    slug: "thesis-editing",
    name: "Thesis Editing Services",
    eyebrow: "Master's and PhD drafts",
    metaTitle: "Thesis Editing Services for Master's and PhD Students",
    metaDescription: "Human thesis editing for Master's and PhD chapters: clarity, flow, academic tone and citations. Tracked changes, secure upload, from " + BASE_RATE_DISPLAY + " per word.",
    dateUpdated: "2026-09-29",
    h1: "Comprehensive Thesis Editing Services for Master's and PhD Chapters",
    intro: "Thesis editing refines chapter organization, academic tone, methodology narrative, and sentence clarity for Master's and PhD candidates. Tailored for graduate scholars addressing supervisor feedback before final proofreading, editors supply tracked changes while preserving research ownership. Editorial rates begin from " + BASE_RATE_DISPLAY + " per word, with pricing calculated transparently based on total chapter length and chosen turnaround schedule.",
    sectionHeadings: {
      startHere: "Upload your thesis chapters securely or estimate editing costs",
      whoIsFor: "Who our thesis editing service is designed for",
      whatWeCheck: "What our thesis editors check across your chapters",
      whyItHelps: "Why thesis editing clarifies chapter progression and academic voice",
      commonFiles: "Common thesis files and chapters we review",
      process: "From secure thesis upload to final tracked-changes delivery",
      readyToStart: "Ready to start your thesis edit?",
      faq: "Thesis Editing Services FAQs",
      related: "Related academic proofreading and formatting services",
    },
    audience: [
      "Master's students finalizing their thesis structure and chapter connections",
      "PhD candidates submitting chapter-by-chapter drafts for supervisor review",
      "Students integrating complex supervisor feedback across literature or methodology",
      "Researchers converting a thesis chapter into a peer-reviewed journal article"
    ],
    checks: [
      {
        title: "Methodology and literature review narrative flow",
        description: "We review theoretical framing, conceptual linkages, and methodological justifications to ensure a cohesive chapter narrative.",
      },
      {
        title: "Logical transitions between complex academic arguments",
        description: "We strengthen connective sentences and signposting so readers follow your research logic smoothly across subsections.",
      },
      {
        title: "Scholarly tone consistency across independent chapters",
        description: "We standardize academic voice, eliminate colloquial expressions, and ensure objective scientific phrasing across all chapters.",
      },
      {
        title: "Grammar, punctuation, citations, and reference formatting",
        description: "We correct mechanical errors and align citations with your institution's designated style guide (APA, Harvard, Chicago, etc.).",
      },
    ],
    benefits: [
      "Deep structural improvements before final submission",
      "Context-aware human editing that respects academic boundaries",
      "Enhanced clarity for thesis defense committees and examiners",
      "Chapter-level progression support throughout your degree"
    ],
    documentExamples: [
      {
        title: "Methodology and Literature Review chapters",
        description: "Foundational chapters edited for scholarly synthesis, critical engagement with sources, and clear methodological rationale.",
      },
      {
        title: "Discussion and Results sections",
        description: "Empirical chapters refined for accurate data interpretation, cautious academic claims, and alignment with research questions.",
      },
      {
        title: "Complete Master's thesis drafts",
        description: "Full Master's dissertations edited for overarching narrative balance, unified formatting, and coherent academic prose.",
      },
      {
        title: "Post-defense revision drafts",
        description: "Theses undergoing post-viva corrections, incorporating examiner feedback into existing chapters with tracked changes.",
      },
    ],
    process: [
      "Upload specific thesis chapters or your entire draft.",
      "Select your timeline—chapter-by-chapter review recommended.",
      "Your editor refines structure, flow, tone, and grammar.",
      "Review the tracked changes and detailed editorial comments."
    ],
    pricingCta: "Use the pricing calculator for a thesis editing estimate, or contact us for very long or complex projects.",
    related: ["academic-proofreading", "dissertation-proofreading", "document-formatting"],
    faq: [
      { question: "What does thesis editing include?", answer: "Thesis editing includes chapter structure, narrative flow, academic tone, sentence clarity, grammar, terminology, headings, reference consistency, and formatting presentation." },
      { question: "Can you edit a PhD thesis?", answer: "Yes. Scope and turnaround depend on length, subject complexity, language condition, and whether you need editing, proofreading, formatting, or a staged review." },
      { question: "Will you write sections for me?", answer: "No. We refine your draft and leave comments where you need to make decisions, but we do not write assessed content or invent research findings." },
      { question: "What is excluded from thesis editing?", answer: "We do not conduct research, generate findings, or write thesis chapters for assessment. Methodological decisions, research analysis, and final approval remain the student's responsibility." },
      { question: "How are thesis editing rates calculated?", answer: "Base rates start from " + BASE_RATE_DISPLAY + " per word. Turnaround time and word count determine the exact cost. For long manuscripts, chapter-by-chapter editing is recommended." },
      { question: "How do you handle supervisor feedback and institutional guidelines?", answer: "You can supply supervisor comments and university style guides when uploading. Editors align headings, citation styles, and academic tone while respecting your institution's rules." },
      { question: "What file formats do you accept for thesis editing?", answer: "We accept Microsoft Word (.docx) files so you can review tracked changes and comments directly. PDF and other formats can be reviewed upon request." },
    ],
    workedExample: {
      wordCount: 10000,
      description: "Sample calculation for a 10,000-word thesis chapter edited at our standard editorial base rate.",
    },
  },
  {
    slug: "manuscript-editing",
    name: "Manuscript Editing Services",
    eyebrow: "Authors and researchers",
    metaTitle: "Manuscript Editing Services for Authors and Researchers",
    metaDescription: "Human manuscript editing for books, research papers and journal submissions. Refine flow, clarity and terminology before you submit.",
    dateUpdated: "2026-08-04",
    h1: "Manuscript Editing Services for Authors, Researchers, and Global Scholars",
    intro: "Manuscript editing strengthens books, journal articles, and academic papers through careful review of narrative flow, scholarly style, grammar, and discipline terminology. Designed for authors and researchers targeting international publishing houses or peer-reviewed journals, our editors provide detailed tracked revisions. Base rates begin from " + BASE_RATE_DISPLAY + " per word, determined by manuscript length and requested delivery timeline.",
    sectionHeadings: {
      startHere: "Upload your manuscript securely or review editing rates",
      whoIsFor: "Who our manuscript editing service helps",
      whatWeCheck: "What we check across your book or journal manuscript",
      whyItHelps: "Why manuscript editing elevates reader engagement and peer review",
      commonFiles: "Common manuscripts and journal submissions we review",
      process: "From secure manuscript upload to publication-ready delivery",
      readyToStart: "Ready to start your manuscript edit?",
      faq: "Manuscript Editing Services FAQs",
      related: "Related editorial and translation services",
    },
    audience: [
      "Researchers in China, Asia, Europe, the Middle East, and North America submitting to high-impact international journals",
      "Authors preparing fiction or nonfiction book manuscripts for publishing",
      "Graduate scholars adapting doctoral dissertations into journal articles",
      "Corporate and scientific research organizations preparing white papers"
    ],
    checks: [
      {
        title: "Chapter or section flow, pacing, transitions, and readability",
        description: "We refine narrative momentum, ensuring ideas, arguments, and scenes unfold with logical cadence and reader engagement.",
      },
      {
        title: "Sentence clarity, grammar, punctuation, terminology, and style consistency",
        description: "We correct language slips while maintaining consistent authorial voice, terminology usage, and mechanical standards.",
      },
      {
        title: "Headings, captions, references, tables, and document presentation",
        description: "We format structural elements and reference entries to conform with target journal or publishing house guidelines.",
      },
      {
        title: "Author voice, audience fit, and comments on unclear passages",
        description: "We preserve your unique style while offering targeted editorial commentary on ambiguous expressions or thematic gaps.",
      },
    ],
    benefits: [
      "A more coherent manuscript before submission or publication",
      "Human editing that preserves voice while improving clarity",
      "Consistent treatment across long documents",
      "Related formatting support when presentation matters"
    ],
    documentExamples: [
      {
        title: "Book chapters and full manuscripts",
        description: "Fiction and non-fiction book drafts edited for narrative coherence, character voice, chapter pacing, and stylistic polish.",
      },
      {
        title: "Journal articles and conference papers",
        description: "SCI/Scopus research papers edited for rigorous academic English, clear abstract summaries, and journal guideline compliance.",
      },
      {
        title: "Long reports and white papers",
        description: "Scientific and institutional policy papers refined for concise executive communication and visual structural clarity.",
      },
      {
        title: "Research manuscripts prepared for submission",
        description: "Peer-review submissions polished to remove language barriers that could distract editorial reviewers from research merit.",
      },
    ],
    process: [
      "Upload your manuscript and share audience, genre, journal, or submission notes.",
      "Confirm the estimate and turnaround before payment.",
      "An editor reviews the manuscript in layers for flow, clarity, and correctness.",
      "Receive the edited manuscript securely with corrections and comments."
    ],
    pricingCta: "Manuscripts vary widely by length and complexity. Use pricing for a first estimate or contact us for custom scope.",
    related: ["editing-services", "document-formatting", "translation-review"],
    faq: [
      { question: "Do you edit book manuscripts?", answer: "Yes. We can edit fiction, nonfiction, research manuscripts, and professional long-form documents. Scope depends on the manuscript type and the level of editing required." },
      { question: "Can you help international authors with SCI journal English editing?", answer: "Yes. We work extensively with authors from China, the Middle East, Africa, and non-native English countries to elevate academic English and meet publication standards for IEEE, Nature, Springer, Elsevier, and Wiley." },
      { question: "Do you guarantee publication?", answer: "No. Editing improves presentation and readability, but publication decisions depend on scientific merit, originality, journal fit, and peer review outside our control." },
    ],
  },
  {
    slug: "business-proofreading",
    name: "Business Proofreading Services",
    eyebrow: "Client-ready documents",
    metaTitle: "Business Proofreading Services for Client-Ready Documents",
    metaDescription: "Proofreading for reports, proposals, presentations and executive summaries. Client-ready documents checked by human editors.",
    dateUpdated: "2026-08-04",
    h1: "Business Proofreading Services for Global Enterprises and Professionals",
    intro: "Business proofreading provides dependable quality checks for reports, proposals, pitch decks, and executive documents before client distribution. Created for corporate teams, founders, and consultants whose strategic messaging is complete, editors correct grammar, consistency, headings, and formatting details. Standard rates start from " + BASE_RATE_DISPLAY + " per word, calculated by document word count and requested turnaround pace.",
    sectionHeadings: {
      startHere: "Upload your business document securely or check proofreading rates",
      whoIsFor: "Who our business proofreading service supports",
      whatWeCheck: "What our business proofreaders check before client delivery",
      whyItHelps: "Why business proofreading protects your corporate reputation",
      commonFiles: "Common business documents and reports we review",
      process: "From secure document upload to client-ready business delivery",
      readyToStart: "Ready to start your business proofread?",
      faq: "Business Proofreading Services FAQs",
      related: "Related proofreading and application services",
    },
    audience: [
      "Companies and founders in Dubai (UAE), London (UK), Toronto (Canada), the US, and Nigeria",
      "Consulting firms, agencies, and financial analysts preparing client proposals and decks",
      "Corporate teams publishing annual reports, ESG disclosures, and marketing white papers",
      "International business leaders communicating in global English"
    ],
    checks: [
      {
        title: "Grammar, punctuation, spelling, capitalization, and typos",
        description: "We eliminate common mechanical slips, incorrect commas, spelling errors, and improper capitalization in executive text.",
      },
      {
        title: "Names, dates, headings, numbering, terminology, and style consistency",
        description: "We cross-check company names, executive titles, fiscal years, and numbering conventions for absolute uniformity.",
      },
      {
        title: "Presentation details in reports, slides, proposals, website copy, and emails",
        description: "We examine layout alignment, header consistency, bullet-point syntax, and footnote numbering across deliverables.",
      },
      {
        title: "Light wording issues that reduce professionalism or clarity",
        description: "We polish awkward phrases and redundant corporate buzzwords while leaving your business strategy and offers untouched.",
      },
    ],
    benefits: [
      "Client-ready documents with fewer distracting errors",
      "Clearer business communication without changing your offer or claims",
      "Confidential handling of sensitive company files",
      "Fast path from upload to secure delivery"
    ],
    documentExamples: [
      {
        title: "Business reports and executive summaries",
        description: "Formal quarterly and annual reports reviewed for concise language, clear financial headings, and executive polish.",
      },
      {
        title: "Proposals, pitch documents, and company profiles",
        description: "Client-facing bid documents, RFPs, and investor decks checked to ensure persuasive, error-free corporate presentation.",
      },
      {
        title: "Website copy, emails, and internal communications",
        description: "Digital communications and executive memos proofread to uphold professional brand standards across channels.",
      },
      {
        title: "Presentations, case studies, and policy documents",
        description: "Keynote slides, client success stories, and internal operating policies checked for typography and consistency.",
      },
    ],
    process: [
      "Upload your business document and add audience or brand notes.",
      "Confirm word count, turnaround, and price before payment.",
      "A proofreader checks language, consistency, and final presentation.",
      "Download the polished document through your dashboard."
    ],
    pricingCta: "Check pricing for standard business documents or contact us for multi-document projects and presentations.",
    related: ["proofreading-services", "editing-services", "cv-resume-editing"],
    faq: [
      { question: "Can you proofread business proposals?", answer: "Yes. We can proofread proposals for grammar, consistency, terminology, headings, numbering, and presentation details before client delivery." },
      { question: "Do you rewrite marketing copy?", answer: "Proofreading focuses on final corrections. If the copy needs stronger messaging, structure, or tone, choose editing services instead." },
      { question: "Can you follow our company style guide?", answer: "Yes. Upload your style guide, approved terminology, or brand notes with the document so the proofreader can follow them." },
    ],
  },
  {
    slug: "cv-resume-editing",
    name: "CV and Resume Editing Services",
    eyebrow: "Applications and careers",
    metaTitle: "CV and Resume Editing Services for Job Applications",
    metaDescription: "Human editing for your CV, resume and cover letter: clearer wording, consistent formatting and a polished, professional finish.",
    dateUpdated: "2026-08-04",
    h1: "CV and Resume Editing Services for Job Applications",
    intro: "CV and resume editing improves the structure, language concision, formatting alignment, and readability of career application documents. Tailored for job seekers, graduates, and professionals submitting resumes or cover letters, editors refine phrasing without fabricating credentials or experience. Base pricing starts from " + BASE_RATE_DISPLAY + " per word, calculated using word count and turnaround speed in the pricing estimator.",
    sectionHeadings: {
      startHere: "Upload your application documents securely or estimate editing costs",
      whoIsFor: "Who our CV and resume editing service is designed for",
      whatWeCheck: "What we check across your CV, resume, and cover letter",
      whyItHelps: "Why professional CV editing strengthens job application impact",
      commonFiles: "Common application files and career documents we edit",
      process: "From secure application upload to polished career delivery",
      readyToStart: "Ready to start your CV and resume edit?",
      faq: "CV and Resume Editing Services FAQs",
      related: "Related professional and business editing services",
    },
    audience: [
      "Job seekers updating CVs and resumes for career progression",
      "Students and recent graduates preparing initial graduate scheme applications",
      "Experienced professionals changing roles, sectors, or global markets",
      "Applicants refining executive bios, cover letters, and LinkedIn summaries"
    ],
    checks: [
      {
        title: "Grammar, punctuation, spelling, and wording consistency",
        description: "We eliminate typos, fix tense mismatches across past and present roles, and ensure crisp, grammatical sentence structures.",
      },
      {
        title: "Structure, section order, readability, and recruiter scanability",
        description: "We optimize layout hierarchy and bullet groupings so hiring managers can identify key qualifications within seconds.",
      },
      {
        title: "Professional tone, concise achievement language, and repetition",
        description: "We replace passive descriptions with strong action verbs and remove repetitive phrasing to maximize professional impact.",
      },
      {
        title: "Cover letter flow, LinkedIn summary clarity, and application fit",
        description: "We align introductory narrative and motivation statements with target job descriptions without falsifying credentials.",
      },
    ],
    benefits: [
      "A clearer, more professional application package",
      "Human editing that improves presentation without inventing experience",
      "Reduced grammar and formatting distractions",
      "A stronger first impression before submission"
    ],
    documentExamples: [
      {
        title: "CVs and resumes",
        description: "Chronological, functional, and hybrid resumes edited for concise bullet points, clear metrics, and tidy visual layouts.",
      },
      {
        title: "Cover letters and personal statements",
        description: "Targeted job application letters and graduate statements edited for compelling opening hooks and clear career narratives.",
      },
      {
        title: "LinkedIn profile summaries",
        description: "Digital professional overviews refined for high readability, executive tone, and keyword alignment.",
      },
      {
        title: "Academic CVs and fellowship applications",
        description: "Comprehensive scholarly CVs organized according to academic conventions (publications, grants, teaching, and awards).",
      },
    ],
    process: [
      "Upload the CV, resume, cover letter, or profile text.",
      "Share the role, industry, or audience if available.",
      "An editor improves clarity, structure, tone, and correctness.",
      "Review the edited document and apply final personal updates."
    ],
    pricingCta: "Short application documents may be quick to review. Use pricing or upload securely to confirm the estimate.",
    related: ["proofreading-services", "business-proofreading", "editing-services"],
    faq: [
      { question: "Will you write my CV for me?", answer: "We edit and improve the material you provide. We do not invent experience, qualifications, achievements, employers, or results." },
      { question: "Can you edit a cover letter?", answer: "Yes. We can improve clarity, structure, tone, grammar, concision, and fit with the target role using the information you provide." },
      { question: "Do you guarantee interviews?", answer: "No. A stronger CV can improve presentation, but interview decisions depend on experience, role fit, market conditions, and employer criteria." },
    ],
  },
  {
    slug: "document-formatting",
    name: "Document Formatting Services",
    eyebrow: "Submission-ready files",
    metaTitle: "Document Formatting Services for Theses and Reports",
    metaDescription: "Submission-ready formatting for theses, dissertations, reports and manuscripts: styles, headings, tables, figures, references and final PDF.",
    dateUpdated: "2026-08-10",
    h1: "Document Formatting Services for Academic, Business, and Manuscript Files",
    intro: "Document formatting aligns margins, typography, headings, tables, figures, citations, and pagination to institutional or publisher guidelines. Suitable for researchers, students, and professionals preparing final Word or PDF submissions, this service ensures visual consistency without altering written arguments. Base formatting rates begin from " + BASE_RATE_DISPLAY + " per word, calculated from document word count and turnaround urgency.",
    sectionHeadings: {
      startHere: "Upload your submission file securely or check formatting rates",
      whoIsFor: "Who our document formatting service assists",
      whatWeCheck: "What our formatting specialists check across your layout",
      whyItHelps: "Why precise document formatting meets strict submission guidelines",
      commonFiles: "Common submission files and documents we format",
      process: "From secure file upload to final formatted delivery",
      readyToStart: "Ready to start your document formatting?",
      faq: "Document Formatting Services FAQs",
      related: "Related dissertation and academic review services",
    },
    audience: [
      "Students formatting Master's theses and doctoral dissertations to university specifications",
      "Authors preparing book manuscripts for self-publishing or traditional press submission",
      "Corporate professionals finalizing annual reports, white papers, or proposal templates",
      "Researchers aligning journal manuscripts with publisher-specific layout rules"
    ],
    checks: [
      {
        title: "Headings, spacing, margins, page numbers, lists, and section breaks",
        description: "We configure Word heading styles, margin geometry, running headers, roman numeral front matter, and arabic pagination.",
      },
      {
        title: "Tables, figures, captions, cross-references, and appendices",
        description: "We standardize caption numbering, table border styles, figure alignments, and automatic cross-reference fields.",
      },
      {
        title: "Reference list presentation and document-wide consistency",
        description: "We apply proper hanging indents, font treatments, and bibliographic layout conventions across all references.",
      },
      {
        title: "Final Word or PDF readiness according to supplied guidelines",
        description: "We generate clean, submission-ready files with verified table of contents links and bookmark trees.",
      },
    ],
    benefits: [
      "A cleaner, more consistent document presentation",
      "Reduced risk of formatting distractions before submission",
      "Support for long documents with many sections and references",
      "A practical companion to proofreading or editing"
    ],
    documentExamples: [
      {
        title: "Theses and dissertations with university rules",
        description: "Multi-chapter academic projects formatted to exact university handbook specifications for margins, front matter, and appendices.",
      },
      {
        title: "Manuscripts with submission guidelines",
        description: "Author drafts formatted in standard manuscript format or specific publisher layout templates.",
      },
      {
        title: "Reports with tables, figures, and appendices",
        description: "Corporate deliverables and institutional research papers aligned with clean typography, tables, and graphic elements.",
      },
      {
        title: "Reference-heavy academic and business documents",
        description: "Documents containing extensive bibliographies and appendices formatted for orderly scanning and professional appearance.",
      },
    ],
    process: [
      "Upload the file and include formatting guidelines or examples.",
      "Confirm scope, word count, complexity, and turnaround.",
      "The document is formatted for consistency and submission requirements.",
      "Review the delivered file before uploading or sharing it."
    ],
    pricingCta: "Formatting complexity varies. Use pricing for a guide or contact us when institutional, publisher, or brand requirements are detailed.",
    related: ["dissertation-proofreading", "manuscript-editing", "thesis-editing"],
    faq: [
      { question: "Can you format a dissertation?", answer: "Yes. We can help with headings, margins, spacing, pagination, tables, figures, captions, references, appendices, and final presentation based on supplied guidelines." },
      { question: "Do you format manuscripts for publishers?", answer: "We can support manuscript presentation and consistency. If a publisher has specific requirements, upload those guidelines with the file." },
      { question: "Is formatting the same as proofreading?", answer: "No. Formatting focuses on document presentation. Proofreading checks language and consistency. Many final documents benefit from both." },
    ],
  },
  {
    slug: "translation-review",
    name: "Translation Review and Editing Services",
    eyebrow: "Natural English review",
    metaTitle: "Translation Review and Editing for Natural English",
    metaDescription: "Human review of translated documents and ESL manuscripts so the English reads naturally, with terminology and tone checked by editors.",
    dateUpdated: "2026-08-04",
    h1: "Translation Review and English Editing for Global Authors & Scholars",
    intro: "Translation review refines translated English documents and non-native drafts for natural expression, technical precision, and grammatical accuracy. Designed for international academics, authors, and global enterprises submitting manuscripts in English, editors polish awkward phrasing while preserving intended meaning. Service pricing begins at " + BASE_RATE_DISPLAY + " per word, calculated from document length and requested review turnaround.",
    sectionHeadings: {
      startHere: "Upload your translated draft securely or check review rates",
      whoIsFor: "Who our translation review service supports",
      whatWeCheck: "What our translation editors check in your English draft",
      whyItHelps: "Why translation review ensures natural, publication-ready English",
      commonFiles: "Common translated documents and ESL drafts we review",
      process: "From secure draft upload to natural English delivery",
      readyToStart: "Ready to start your translation review?",
      faq: "Translation Review and Editing Services FAQs",
      related: "Related manuscript and editing services",
    },
    audience: [
      "Chinese and East Asian researchers submitting to SCI, SSCI, IEEE, and Scopus journals",
      "Middle Eastern, European, and African academics writing in English",
      "Global enterprises translating corporate reports, product guides, and proposals into English",
      "Authors and translators seeking human validation of English phrasing and nuances"
    ],
    checks: [
      {
        title: "Natural phrasing, idiom correctness, grammar, sentence flow, and readability",
        description: "We eliminate awkward direct translations, smoothing English syntax so your document reads naturally to native speakers.",
      },
      {
        title: "Technical terminology, discipline-specific vocabulary, and consistency",
        description: "We verify appropriate specialized vocabulary and ensure field-specific terminology remains constant throughout.",
      },
      {
        title: "Tone and register for academic peer-review, business executives, or publishing",
        description: "We adjust stylistic register to match publication standards, whether for formal journal peer review or corporate pitches.",
      },
      {
        title: "Clarification of ambiguous passages or direct translation artifacts",
        description: "We identify ambiguous passages and provide marginal comments querying the author where original meaning requires confirmation.",
      },
    ],
    benefits: [
      "Publication-grade English without automated robotic phrasing",
      "Human editors who understand ESL writing challenges and journal standards",
      "Preservation of your original research intent and technical accuracy",
      "Secure, confidential handling for intellectual property and research data"
    ],
    documentExamples: [
      {
        title: "Translated academic papers, SCI manuscripts, and abstracts",
        description: "Scientific and scholarly manuscripts translated into English, refined to meet demanding journal peer-review standards.",
      },
      {
        title: "Chinese, Arabic, French, and Spanish drafts translated to English",
        description: "Multi-language translations polished for natural English idiom, proper sentence connections, and grammatical accuracy.",
      },
      {
        title: "Business proposals, white papers, and corporate websites",
        description: "Commercial materials and marketing brochures translated for international business partners and global clients.",
      },
      {
        title: "Conference submissions and international grant applications",
        description: "International symposium submissions and funding proposals edited for persuasive, articulate English presentation.",
      },
    ],
    process: [
      "Upload your translated draft and include any original source text or glossary if available.",
      "Specify your target English style (British UK, American US, Canadian) and journal/audience guidelines.",
      "An expert human editor polishes phrasing, structure, tone, and grammar.",
      "Download your submission-ready document with clear comments where meaning needed confirmation."
    ],
    pricingCta: "Translation review depends on language quality, subject complexity, and whether source comparison is needed. Contact us for unusual requirements.",
    related: ["editing-services", "proofreading-services", "manuscript-editing"],
    faq: [
      { question: "Is this certified translation?", answer: "No. This service provides expert linguistic review and polishing for existing English translations. It is not certified or sworn legal translation." },
      { question: "Can you help Chinese scholars with SCI journal submissions?", answer: "Yes. Many of our academic clients are Chinese and international researchers preparing papers for IEEE, Elsevier, Springer, Nature, and Wiley journals. We focus on academic phrasing, sentence logic, and clarity to eliminate language-based journal rejections." },
      { question: "Can you make translated English sound completely natural?", answer: "Yes. We eliminate awkward literal translations, refine word choices, and smooth sentence flow so the text sounds like it was originally written by a native English academic or professional." },
    ],
  },
];

export function getSeoServicePage(slug: string) {
  return seoServicePages.find((page) => page.slug === slug);
}
