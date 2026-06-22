export type ServicePageContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  whoItIsFor: string;
  improvements: string[];
  notIncluded: string[];
  chooseWhen: string[];
  pricingGuidance: string;
  faqs: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
};

export const servicePageContent: Record<string, ServicePageContent> = {
  "academic-editing": {
    metaTitle: "Academic Editing Services for Essays, Theses & Research",
    metaDescription: "Academic editing for essays, theses, dissertations, research papers, and journal manuscripts. Improve clarity, structure, scholarly tone, and consistency.",
    h1: "Academic Editing Services for Essays, Theses, and Research",
    whoItIsFor: "This service is for students, researchers, doctoral candidates, and academic teams preparing work for assessment, supervision, peer review, or publication.",
    improvements: [
      "Argument flow and paragraph structure",
      "Scholarly tone without flattening your voice",
      "Grammar, syntax, punctuation, and word choice",
      "Terminology, headings, citations, and reference consistency",
    ],
    notIncluded: [
      "Writing assessed work on the author's behalf",
      "Inventing findings, sources, citations, or data",
      "Guaranteeing grades, acceptance, or publication",
    ],
    chooseWhen: [
      "Your thesis or dissertation needs more than a final proofread",
      "A supervisor or reviewer has flagged clarity or structure",
      "A research paper needs a consistent academic voice before submission",
    ],
    pricingGuidance: "Pricing depends on word count, turnaround, and the depth of editing required. Use the calculator for an estimate; very long or technically complex documents may need a custom review.",
    faqs: [
      { question: "Can you edit a thesis or dissertation?", answer: "Yes. We can improve structure, clarity, scholarly tone, grammar, and consistency while preserving your ideas and authorship." },
      { question: "Do you check references?", answer: "We can check citation and reference consistency within the supplied document. Source verification or a full reference audit may require separate scope confirmation." },
      { question: "Will the editor rewrite my research?", answer: "No. The editor refines the writing and flags decisions for you; they do not invent arguments, evidence, results, or citations." },
    ],
    relatedSlugs: ["express-service", "manuscript-formatting", "writing-support"],
  },
  "express-service": {
    metaTitle: "Professional Proofreading Services for Final Drafts",
    metaDescription: "Professional proofreading services for final drafts. Correct grammar, spelling, punctuation, consistency, and distracting errors before submission.",
    h1: "Professional Proofreading Services for Final Drafts",
    whoItIsFor: "This service is for writers with a complete, well-structured draft that needs a careful final check before submission, publication, presentation, or delivery.",
    improvements: [
      "Grammar, spelling, punctuation, and typographical errors",
      "Capitalization, numbering, abbreviations, and style consistency",
      "Minor wording issues that interrupt readability",
      "Final presentation checks across headings and document elements",
    ],
    notIncluded: [
      "Major restructuring or developmental editing",
      "Substantial rewriting of weak or incomplete sections",
      "Research, fact-checking, or source creation",
    ],
    chooseWhen: [
      "The argument and structure are already settled",
      "You need a final draft proofread before a deadline",
      "You want errors and inconsistencies removed without a heavy edit",
    ],
    pricingGuidance: "Proofreading is best priced after the final draft is ready. Enter the current word count and preferred turnaround in the pricing calculator for an estimate.",
    faqs: [
      { question: "What is the difference between proofreading and editing?", answer: "Proofreading corrects final-stage errors and inconsistencies. Editing also addresses clarity, flow, tone, and structure." },
      { question: "Can you proofread a document with Track Changes?", answer: "Yes. Where appropriate, corrections can be returned with Track Changes so you can review the editorial trail." },
      { question: "Should I choose proofreading for an early draft?", answer: "Usually not. If sections still need restructuring or significant rewriting, choose the relevant editing service first." },
    ],
    relatedSlugs: ["academic-editing", "non-academic-editing", "manuscript-formatting"],
  },
  "non-academic-editing": {
    metaTitle: "Business Editing Services for Reports & Proposals",
    metaDescription: "Business editing services for reports, proposals, profiles, presentations, and client documents that need clear structure, credible tone, and concise language.",
    h1: "Business Editing Services for Reports and Proposals",
    whoItIsFor: "This service is for founders, consultants, teams, and professionals preparing reports, proposals, company profiles, presentations, and client-facing documents.",
    improvements: [
      "Message hierarchy and reader-focused structure",
      "Professional tone and concise language",
      "Consistency across headings, terminology, and calls to action",
      "Grammar and sentence-level credibility",
    ],
    notIncluded: [
      "Legal, financial, or regulatory approval",
      "Market research or unsupported business claims",
      "Brand strategy, graphic design, or slide production unless separately agreed",
    ],
    chooseWhen: [
      "A proposal feels wordy or difficult to scan",
      "A report needs a clearer executive narrative",
      "A client-facing document must sound consistent and credible",
    ],
    pricingGuidance: "Use the pricing calculator for standard reports and proposals. Contact us first for multi-document projects, complex slide decks, or documents with extensive tables.",
    faqs: [
      { question: "Can you edit a business proposal?", answer: "Yes. We can improve its structure, clarity, tone, consistency, and readability while keeping your commercial message intact." },
      { question: "Do you guarantee that a proposal will win?", answer: "No. Editing can strengthen communication and presentation, but decisions depend on the offer, evidence, requirements, and evaluator." },
      { question: "Can you follow our house style?", answer: "Yes. Supply your style guide, approved terminology, and audience notes when you submit the document." },
    ],
    relatedSlugs: ["express-service", "writing-support", "translation"],
  },
  "manuscript-formatting": {
    metaTitle: "Manuscript Editing Services for Authors & Researchers",
    metaDescription: "Manuscript editing and thesis formatting support for authors and researchers. Improve long-form structure, consistency, readability, and presentation.",
    h1: "Manuscript Editing Services for Authors and Researchers",
    whoItIsFor: "This service supports authors, researchers, graduate students, and independent writers working on books, theses, long reports, and other substantial manuscripts.",
    improvements: [
      "Long-form organization, pacing, and section flow",
      "Sentence clarity, consistency, and readability",
      "Heading hierarchy, tables, captions, and cross-references",
      "Formatting presentation for the requested submission context",
    ],
    notIncluded: [
      "Ghostwriting or inventing missing chapters",
      "Book design, cover design, typesetting, or print production unless scoped separately",
      "A guarantee of agent, publisher, or journal acceptance",
    ],
    chooseWhen: [
      "A long manuscript feels uneven across chapters or sections",
      "A thesis needs editing plus consistent presentation",
      "You need one editorial standard applied across a large document",
    ],
    pricingGuidance: "Long manuscripts often need a tailored schedule. Use the calculator for an initial estimate, then contact us if the document exceeds the standard word-count range or has complex formatting.",
    faqs: [
      { question: "Do you edit books and long manuscripts?", answer: "Yes. Scope and turnaround are confirmed from the manuscript length, genre, condition, and requested level of review." },
      { question: "Can you format a thesis?", answer: "We can support heading, reference, table, caption, and presentation consistency based on the supplied institutional requirements." },
      { question: "Will you preserve my writing style?", answer: "Yes. The aim is to improve clarity and consistency without replacing the author's voice." },
    ],
    relatedSlugs: ["academic-editing", "express-service", "writing-support"],
  },
  translation: {
    metaTitle: "Translation Review and Language Editing Services",
    metaDescription: "Translation review and language editing for translated academic, business, and professional documents. Improve natural phrasing, tone, and terminology.",
    h1: "Translation Review and Language Editing Services",
    whoItIsFor: "This service is for people and organizations with an existing translated draft that needs natural English, consistent terminology, and an audience-appropriate tone.",
    improvements: [
      "Natural phrasing and sentence structure",
      "Terminology and naming consistency",
      "Tone, register, and audience fit",
      "Grammar, punctuation, and readability in the target text",
    ],
    notIncluded: [
      "Certified or sworn translation",
      "Translation from an unavailable source-language specialist",
      "Legal validation of translated terms or documents",
    ],
    chooseWhen: [
      "The translation is accurate but reads stiffly",
      "Terminology changes from section to section",
      "A translated document needs polished English before publication or delivery",
    ],
    pricingGuidance: "Pricing depends on word count, language quality, subject complexity, and whether the source text is supplied for comparison. Contact us if source-language checking is essential.",
    faqs: [
      { question: "Is this a certified translation service?", answer: "No. This page covers editorial review of an existing translation, not certified or sworn translation." },
      { question: "Should I send the source document too?", answer: "Yes, when available. It can help clarify intended meaning, terminology, names, and ambiguous passages." },
      { question: "Can you make translated English sound natural?", answer: "Yes. Language editing focuses on natural phrasing, consistency, tone, and readability while respecting the original purpose." },
    ],
    relatedSlugs: ["non-academic-editing", "academic-editing", "express-service"],
  },
  "writing-support": {
    metaTitle: "Writing Support for Applications, Reports & Proposals",
    metaDescription: "Writing support for applications, statements, reports, and proposals. Strengthen direction, structure, clarity, and revision plans while preserving authorship.",
    h1: "Writing Support for Applications, Reports, and Proposals",
    whoItIsFor: "This service is for applicants, professionals, students, and teams who have ideas or a partial draft but need clearer organization and practical revision guidance.",
    improvements: [
      "Purpose, audience, and central message",
      "Outline, section order, and information gaps",
      "Application and statement focus",
      "Actionable comments for the next revision",
    ],
    notIncluded: [
      "Writing assessed, application, or professional material on your behalf",
      "Inventing experience, achievements, evidence, or references",
      "Guaranteeing admission, funding, approval, or selection",
    ],
    chooseWhen: [
      "You have material but are unsure how to organize it",
      "An application or statement lacks a clear focus",
      "A proposal needs structural guidance before line editing",
    ],
    pricingGuidance: "Writing support is scoped from the draft stage and the kind of guidance required. Share the brief, current draft, deadline, and any word limit so the project can be reviewed accurately.",
    faqs: [
      { question: "Will you write my application for me?", answer: "No. We help you shape and improve your own material while protecting your authorship and the truth of your experience." },
      { question: "Can you help with a personal statement?", answer: "Yes. We can improve focus, structure, clarity, and tone using the information you provide." },
      { question: "What should I submit for writing support?", answer: "Send the brief or prompt, your current notes or draft, the audience, deadline, and any required word limit." },
    ],
    relatedSlugs: ["non-academic-editing", "academic-editing", "express-service"],
  },
};
