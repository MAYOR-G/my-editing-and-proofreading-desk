export type SeoServicePage = {
  slug: string;
  name: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  dateUpdated: string;
  h1: string;
  intro: string;
  audience: string[];
  checks: string[];
  benefits: string[];
  documentExamples: string[];
  process: string[];
  pricingCta: string;
  related: string[];
  faq: Array<{ question: string; answer: string }>;
};

export const seoServicePages: SeoServicePage[] = [
  {
    slug: "proofreading-services",
    name: "Professional Proofreading Services",
    eyebrow: "Final draft review",
    metaTitle: "Professional Proofreading Services | Edit and Proofread",
    metaDescription: "Human proofreading for essays, dissertations, manuscripts, business documents, CVs, and professional writing. Secure upload and clear pricing.",
    dateUpdated: "2026-08-04",
    h1: "Professional Proofreading Services for Academic, Business, and Author Documents",
    intro: "Get a careful final review before you submit, publish, or share your document. Our professional proofreading services correct grammar, punctuation, spelling, consistency, and presentation issues while preserving your meaning and voice.",
    audience: ["Students preparing essays, theses, and dissertations", "Researchers submitting journal manuscripts", "Authors polishing books and long-form drafts", "Professionals sending reports, CVs, proposals, and business documents"],
    checks: ["Grammar, punctuation, spelling, and typographical errors", "Capitalization, hyphenation, abbreviations, dates, numbers, and terminology", "Headings, lists, captions, tables, references, and document-wide consistency", "Minor wording issues that interrupt clarity in an otherwise complete draft"],
    benefits: ["A cleaner document that feels credible and ready to share", "Human judgment for context-sensitive corrections", "Confidential handling through the secure upload and dashboard flow", "Clear next steps if the document needs deeper editing instead of proofreading"],
    documentExamples: ["Final essays and research papers", "Completed dissertations and theses", "Business reports, proposals, and presentations", "Book manuscripts, CVs, resumes, and cover letters"],
    process: ["Upload your file securely and choose proofreading.", "Confirm word count, turnaround, notes, and pricing before payment.", "A human proofreader reviews the final draft systematically.", "Receive the polished file through your dashboard with corrections and notes where needed."],
    pricingCta: "Proofreading price depends on word count and turnaround. Use the pricing calculator for an estimate or upload the final draft to start.",
    related: ["academic-proofreading", "business-proofreading", "cv-resume-editing"],
    faq: [
      { question: "What does a professional proofreading service include?", answer: "Proofreading corrects grammar, punctuation, spelling, typos, and consistency problems in a complete draft. It can also catch light wording and formatting issues, but it does not usually restructure paragraphs or rewrite large sections." },
      { question: "When should I choose proofreading instead of editing?", answer: "Choose proofreading when your content, structure, and argument are already final. Choose editing if the document still needs clearer organization, stronger flow, improved tone, or substantial sentence-level rewriting." },
      { question: "Can you proofread academic and business documents?", answer: "Yes. We proofread academic papers, dissertations, manuscripts, reports, proposals, presentations, CVs, resumes, and other professional documents." },
    ],
  },
  {
    slug: "editing-services",
    name: "Professional Editing Services",
    eyebrow: "Clarity and structure",
    metaTitle: "Professional Editing Services | Edit and Proofread",
    metaDescription: "Human editing for academic papers, business documents, books, manuscripts, and professional writing. Improve clarity, structure, tone, and flow.",
    dateUpdated: "2026-08-04",
    h1: "Professional Editing Services for Academic, Business, and Manuscript Writing",
    intro: "Professional editing improves how your document communicates. We refine clarity, structure, tone, sentence flow, and readability so your writing is easier to follow while still sounding like you.",
    audience: ["Students and researchers with complex academic drafts", "Authors preparing manuscripts or book chapters", "Businesses improving reports, proposals, and client-facing documents", "Professionals who need clearer applications, statements, or portfolios"],
    checks: ["Argument flow, paragraph order, transitions, and section logic", "Sentence clarity, concision, tone, grammar, and word choice", "Audience fit, consistency, headings, terminology, and document presentation", "Comments where the author must clarify facts, evidence, or intent"],
    benefits: ["A stronger document before final proofreading", "Improved readability without automated rewriting", "Editorial comments that explain important changes", "Support for academic integrity and author ownership"],
    documentExamples: ["Academic drafts that need clearer structure", "Reports and proposals that feel wordy or uneven", "Manuscripts with inconsistent pacing or voice", "Applications, statements, and professional documents"],
    process: ["Choose editing and upload your draft with notes about audience and deadline.", "Review the estimate based on word count, service depth, and turnaround.", "A human editor improves structure, clarity, tone, and language.", "Download the edited file and review comments through your dashboard."],
    pricingCta: "Your estimate depends on the selected service, word count, and turnaround. Check the live calculator or upload your document for the clearest scope.",
    related: ["manuscript-editing", "thesis-editing", "translation-review"],
    faq: [
      { question: "What is included in professional editing?", answer: "Editing can improve structure, paragraph flow, clarity, tone, word choice, grammar, and readability. The exact scope depends on the document type and condition." },
      { question: "Will the editor rewrite my work?", answer: "The editor improves the writing you provide and may revise unclear sentences, but they do not invent evidence, sources, achievements, or assessed content for you." },
      { question: "Do I need proofreading after editing?", answer: "Important documents often benefit from proofreading after edits are accepted because new changes can introduce small errors or formatting inconsistencies." },
    ],
  },
  {
    slug: "academic-proofreading",
    name: "Academic Proofreading Services",
    eyebrow: "Students and researchers",
    metaTitle: "Academic Proofreading Services | Edit and Proofread",
    metaDescription: "Academic proofreading for essays, theses, dissertations, research papers, and journal manuscripts. Improve grammar, clarity, formatting, and presentation.",
    dateUpdated: "2026-08-04",
    h1: "Academic Proofreading Services for Students and Researchers",
    intro: "Academic proofreading gives your final draft a careful human review before submission. We check grammar, clarity, consistency, references, formatting, and academic presentation while protecting your authorship.",
    audience: [
      "Undergraduate, Master's, and PhD students across the UK, US, Canada, UAE, Nigeria, and worldwide",
      "Researchers submitting papers to international SCI/Scopus indexed journals",
      "International ESL students and scholars needing natural academic English review",
      "Academic departments and research institutes needing consistent language styling"
    ],
    checks: [
      "Grammar, punctuation, spelling, tense, and academic sentence boundaries",
      "British English (UK), American English (US), Canadian, or Australian style conventions",
      "Academic tone, cautious claims, terminology, headings, and discipline-specific conventions",
      "Citation and reference consistency across APA, Harvard UK, Chicago, IEEE, Vancouver, MLA, and OSCOLA",
      "Tables, figures, captions, appendices, lists, and formatting details"
    ],
    benefits: [
      "A polished academic document ready for UK, US, Canadian, or global university submission",
      "Confidential review of sensitive research material and data",
      "Academic integrity-friendly human editing that respects your authorship",
      "Clear editorial comments when a citation, discipline term, or claim requires clarification"
    ],
    documentExamples: [
      "Essays, research papers, and term assignments",
      "PhD theses, Master's dissertations, and research proposals",
      "Journal manuscripts (Nature, Elsevier, Springer, IEEE, Wiley)",
      "Abstracts, literature reviews, and conference papers"
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
      { question: "Do you support British English (UK) and Harvard referencing?", answer: "Yes. Our UK and international desks support British English spelling and grammar conventions, Oxford style, and UK referencing standards including Harvard, OSCOLA (Law), and MHRA." },
      { question: "Is academic proofreading allowed by universities?", answer: "Academic proofreading is widely accepted when it focuses strictly on language, grammar, clarity, and presentation without creating research, data, or assessed arguments. Always ensure compliance with your specific institution's guidelines." },
      { question: "Do you check reference citations?", answer: "We verify citation consistency, punctuation, and matching between in-text citations and reference lists within your supplied document." },
    ],
  },
  {
    slug: "dissertation-proofreading",
    name: "Dissertation Proofreading Service",
    eyebrow: "Graduate submission",
    metaTitle: "Dissertation Proofreading Service | UK, US & Global | Edit and Proofread",
    metaDescription: "Professional dissertation proofreading for UK, US, Canadian, and global PhD/Master's students. Check grammar, Harvard/APA references, formatting, and tables.",
    dateUpdated: "2026-08-10",
    h1: "Dissertation Proofreading Service for Graduate Students Worldwide",
    intro: "Before final submission, your dissertation needs more than a basic spell-check. Our dissertation proofreading service reviews grammar, clarity, academic tone, references, formatting, tables, figures, and final presentation with expert human attention across British, American, Canadian, and international styles.",
    audience: [
      "Master's and doctoral students in the UK (Edinburgh, London, Russell Group universities)",
      "PhD candidates in the US, Canada, UAE, Europe, and Nigeria preparing final submission",
      "International graduate students with long research documents and strict formatting guidelines",
      "Scholars preparing thesis-derived publications"
    ],
    checks: [
      "Grammar, punctuation, spelling, tense, articles, and sentence clarity",
      "Chapter headings, terminology, abbreviations, tables, figures, and appendices",
      "Citation and reference presentation consistency (APA, Harvard, Chicago, OSCOLA, IEEE)",
      "Margins, spacing, pagination, front matter, captions, and final file readiness"
    ],
    benefits: [
      "A cleaner final document for supervisor, committee, or graduate school examiners",
      "Long-document consistency across all chapters, methodologies, and discussions",
      "Human review that respects academic integrity and your research ownership",
      "Secure upload, transparent word-count pricing, and dashboard delivery"
    ],
    documentExamples: ["Master's dissertations", "PhD dissertations and doctoral theses", "Abstracts, acknowledgements, and front matter", "Reference lists, tables, figures, and appendices"],
    process: ["Upload your dissertation and include university guidelines if available.", "Choose turnaround and review the word-count based estimate.", "A proofreader checks the document in staged passes.", "Review the delivered file and any comments before final submission."],
    pricingCta: "Long dissertations may need a realistic schedule. Check pricing first, or upload the file so the scope and turnaround can be confirmed.",
    related: ["academic-proofreading", "thesis-editing", "document-formatting"],
    faq: [
      { question: "How long does dissertation proofreading take?", answer: "Turnaround depends on word count, language quality, formatting complexity, and deadline. Long dissertations should allow time for the proofread and for you to review corrections before submission." },
      { question: "Can you format my dissertation too?", answer: "We can support formatting checks and document presentation. If you need detailed institutional formatting, include the guidelines when you upload or contact us before payment." },
      { question: "Will proofreading change my research?", answer: "No. Proofreading improves language, consistency, and presentation. It does not invent data, rewrite findings, or make academic decisions that belong to you." },
    ],
  },
  {
    slug: "thesis-editing",
    name: "Thesis Editing Services",
    eyebrow: "Master's and PhD drafts",
    metaTitle: "Thesis Editing Services | Master's & PhD | Edit and Proofread",
    metaDescription: "Thesis editing for clarity, grammar, structure, academic tone, formatting, and references. Human editors help polish your thesis before submission.",
    dateUpdated: "2026-08-10",
    h1: "Thesis Editing Services for Master's and PhD Students",
    intro: "Thesis editing helps turn a difficult academic draft into a clearer, more coherent submission. We improve structure, scholarly tone, paragraph flow, sentence clarity, grammar, and consistency while preserving your argument and authorship.",
    audience: ["Master's students revising a thesis", "PhD candidates improving chapter drafts", "Students responding to supervisor feedback", "Researchers preparing a thesis-based article or manuscript"],
    checks: ["Chapter structure, paragraph flow, transitions, and argument clarity", "Scholarly tone, cautious claims, terminology, and sentence construction", "Grammar, punctuation, citations, references, headings, and formatting consistency", "Comments where evidence, claims, or institutional rules need author attention"],
    benefits: ["A clearer thesis before final proofreading", "Human editorial feedback that protects academic integrity", "Improved readability for supervisors, committees, and examiners", "Support for grammar, structure, tone, formatting, and references in one workflow"],
    documentExamples: ["Master's thesis chapters", "PhD thesis drafts", "Literature reviews, methods, results, and discussion chapters", "Supervisor-revised drafts before final proofreading"],
    process: ["Upload the thesis draft and include supervisor notes or requirements.", "Review the pricing estimate based on word count and turnaround.", "An editor works through structure, clarity, tone, grammar, and consistency.", "Receive the edited file securely and review comments before final revisions."],
    pricingCta: "Use the pricing calculator for a thesis editing estimate, or contact us for very long or complex projects.",
    related: ["academic-proofreading", "dissertation-proofreading", "document-formatting"],
    faq: [
      { question: "What does thesis editing include?", answer: "Thesis editing can include structure, flow, academic tone, sentence clarity, grammar, terminology, headings, reference consistency, and formatting presentation." },
      { question: "Can you edit a PhD thesis?", answer: "Yes. Scope and turnaround depend on length, subject complexity, language condition, and whether you need editing, proofreading, formatting, or a staged review." },
      { question: "Will you write sections for me?", answer: "No. We refine your draft and leave comments where you need to make decisions, but we do not write assessed content or invent research." },
    ],
  },
  {
    slug: "manuscript-editing",
    name: "Manuscript Editing Services",
    eyebrow: "Authors and researchers",
    metaTitle: "Manuscript Editing Services | SCI Journal & Book Editing",
    metaDescription: "Human manuscript editing for books, research papers, and SCI/Scopus journal submissions. Refine flow, clarity, terminology, and publication readiness.",
    dateUpdated: "2026-08-04",
    h1: "Manuscript Editing Services for Authors, Researchers, and Global Scholars",
    intro: "Manuscript editing strengthens long-form writing so readers and journal peer reviewers can evaluate your ideas and research without language distractions. We refine clarity, flow, terminology, grammar, consistency, and presentation for books, SCI/Scopus journal papers, and technical manuscripts.",
    audience: [
      "Researchers in China, Asia, Europe, the Middle East, and North America submitting to high-impact international journals",
      "Authors preparing fiction or nonfiction book manuscripts for publishing",
      "Graduate scholars adapting doctoral dissertations into journal articles",
      "Corporate and scientific research organizations preparing white papers"
    ],
    checks: ["Chapter or section flow, pacing, transitions, and readability", "Sentence clarity, grammar, punctuation, terminology, and style consistency", "Headings, captions, references, tables, and document presentation", "Author voice, audience fit, and comments on unclear passages"],
    benefits: ["A more coherent manuscript before submission or publication", "Human editing that preserves voice while improving clarity", "Consistent treatment across long documents", "Related formatting support when presentation matters"],
    documentExamples: ["Book chapters and full manuscripts", "Journal articles and conference papers", "Long reports and white papers", "Research manuscripts prepared for submission"],
    process: ["Upload your manuscript and share audience, genre, journal, or submission notes.", "Confirm the estimate and turnaround before payment.", "An editor reviews the manuscript in layers for flow, clarity, and correctness.", "Receive the edited manuscript securely with corrections and comments."],
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
    metaTitle: "Business Proofreading Services | Dubai, London, Toronto & Global",
    metaDescription: "Professional business proofreading for reports, proposals, presentations, executive summaries, and corporate communications across global business hubs.",
    dateUpdated: "2026-08-04",
    h1: "Business Proofreading Services for Global Enterprises and Professionals",
    intro: "Business proofreading ensures your corporate communications, pitch decks, proposals, and annual reports are polished before clients, investors, stakeholders, or boards read them. We eliminate language inconsistencies and presentation errors that can weaken corporate credibility.",
    audience: [
      "Companies and founders in Dubai (UAE), London (UK), Toronto (Canada), the US, and Nigeria",
      "Consulting firms, agencies, and financial analysts preparing client proposals and decks",
      "Corporate teams publishing annual reports, ESG disclosures, and marketing white papers",
      "International business leaders communicating in global English"
    ],
    checks: ["Grammar, punctuation, spelling, capitalization, and typos", "Names, dates, headings, numbering, terminology, and style consistency", "Presentation details in reports, slides, proposals, website copy, and emails", "Light wording issues that reduce professionalism or clarity"],
    benefits: ["Client-ready documents with fewer distracting errors", "Clearer business communication without changing your offer or claims", "Confidential handling of sensitive company files", "Fast path from upload to secure delivery"],
    documentExamples: ["Business reports and executive summaries", "Proposals, pitch documents, and company profiles", "Website copy, emails, and internal communications", "Presentations, case studies, and policy documents"],
    process: ["Upload your business document and add audience or brand notes.", "Confirm word count, turnaround, and price before payment.", "A proofreader checks language, consistency, and final presentation.", "Download the polished document through your dashboard."],
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
    metaTitle: "CV and Resume Editing Services | Edit and Proofread",
    metaDescription: "Improve your CV, resume, cover letter, and LinkedIn profile with human editing for clarity, grammar, structure, and recruiter readability.",
    dateUpdated: "2026-08-04",
    h1: "CV and Resume Editing Services for Job Applications",
    intro: "Your CV, resume, cover letter, or LinkedIn profile should be clear, professional, and easy for recruiters to scan. We edit application documents for grammar, structure, readability, tone, and confident presentation.",
    audience: ["Job seekers updating CVs and resumes", "Students and graduates preparing applications", "Professionals changing roles or industries", "Applicants refining cover letters and LinkedIn summaries"],
    checks: ["Grammar, punctuation, spelling, and wording consistency", "Structure, section order, readability, and recruiter scanability", "Professional tone, concise achievement language, and repetition", "Cover letter flow, LinkedIn summary clarity, and application fit"],
    benefits: ["A clearer, more professional application package", "Human editing that improves presentation without inventing experience", "Reduced grammar and formatting distractions", "A stronger first impression before submission"],
    documentExamples: ["CVs and resumes", "Cover letters and personal statements", "LinkedIn profile summaries", "Academic CVs and fellowship applications"],
    process: ["Upload the CV, resume, cover letter, or profile text.", "Share the role, industry, or audience if available.", "An editor improves clarity, structure, tone, and correctness.", "Review the edited document and apply final personal updates."],
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
    metaTitle: "Document Formatting Services for Academic & Professional Files",
    metaDescription: "Professional document formatting for theses, dissertations, reports, manuscripts, Word styles, headings, tables, figures, references, and final PDFs.",
    dateUpdated: "2026-08-10",
    h1: "Document Formatting Services for Academic, Business, and Manuscript Files",
    intro: "Document formatting makes your final file easier to read, navigate, and submit. We help align headings, spacing, references, tables, captions, page numbers, and presentation details for academic, business, and manuscript documents.",
    audience: ["Students formatting theses and dissertations", "Authors preparing manuscripts", "Professionals finalizing reports or proposals", "Researchers aligning journal or institutional submission files"],
    checks: ["Headings, spacing, margins, page numbers, lists, and section breaks", "Tables, figures, captions, cross-references, and appendices", "Reference list presentation and document-wide consistency", "Final Word or PDF readiness according to supplied guidelines"],
    benefits: ["A cleaner, more consistent document presentation", "Reduced risk of formatting distractions before submission", "Support for long documents with many sections and references", "A practical companion to proofreading or editing"],
    documentExamples: ["Theses and dissertations with university rules", "Manuscripts with submission guidelines", "Reports with tables, figures, and appendices", "Reference-heavy academic and business documents"],
    process: ["Upload the file and include formatting guidelines or examples.", "Confirm scope, word count, complexity, and turnaround.", "The document is formatted for consistency and submission requirements.", "Review the delivered file before uploading or sharing it."],
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
    metaTitle: "Translation Review & English Editing for International Authors",
    metaDescription: "Human review and polishing for translated documents, Chinese/international research papers, ESL manuscripts, and global business files to ensure natural English.",
    dateUpdated: "2026-08-04",
    h1: "Translation Review and English Editing for Global Authors & Scholars",
    intro: "Translation review refines translated text and non-native English writing so your final document reads naturally, accurately, and persuasively. We polish grammar, academic tone, technical terminology, sentence flow, and presentation for researchers in China, the Middle East, Europe, Africa, and around the world.",
    audience: [
      "Chinese and East Asian researchers submitting to SCI, SSCI, IEEE, and Scopus journals",
      "Middle Eastern, European, and African academics writing in English",
      "Global enterprises translating corporate reports, product guides, and proposals into English",
      "Authors and translators seeking human validation of English phrasing and nuances"
    ],
    checks: [
      "Natural phrasing, idiom correctness, grammar, sentence flow, and readability",
      "Technical terminology, discipline-specific vocabulary, and document-wide consistency",
      "Tone and register for academic peer-review, business executives, or publishing houses",
      "Clarification of ambiguous passages or direct translation artifacts"
    ],
    benefits: [
      "Publication-grade English without automated robotic phrasing",
      "Human editors who understand ESL writing challenges and journal standards",
      "Preservation of your original research intent and technical accuracy",
      "Secure, confidential handling for intellectual property and research data"
    ],
    documentExamples: [
      "Translated academic papers, SCI manuscripts, and abstracts",
      "Chinese, Arabic, French, and Spanish drafts translated to English",
      "Business proposals, white papers, and corporate websites",
      "Conference submissions and international grant applications"
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
