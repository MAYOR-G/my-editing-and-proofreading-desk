export const servicePages = [
  {
    slug: "academic-editing",
    name: "Academic Editing",
    eyebrow: "For students and researchers",
    description: "Specialist editing for essays, theses, dissertations, journal articles, research proposals, and academic manuscripts.",
    detail: "We refine argument clarity, scholarly tone, structure, grammar, citation consistency, and reader flow while preserving the author’s voice and disciplinary intent.",
    audiences: ["Students", "Researchers", "Doctoral candidates", "Academic departments"],
    deliverables: ["Language and grammar refinement", "Structure and argument clarity", "Citation and reference consistency", "Submission-ready editorial polish"]
  },
  {
    slug: "non-academic-editing",
    name: "Non-Academic Editing",
    eyebrow: "For professional documents",
    description: "Editorial care for business, personal, organizational, and professional writing that needs to sound confident and precise.",
    detail: "We improve clarity, tone, structure, grammar, and presentation for documents where credibility and reader trust matter.",
    audiences: ["Business professionals", "Founders", "Consultants", "General clients"],
    deliverables: ["Tone and clarity editing", "Sentence-level polish", "Professional document flow", "Reader-focused refinement"]
  },
  {
    slug: "express-service",
    name: "Express Service",
    eyebrow: "For urgent deadlines",
    description: "A focused fast-turnaround route for clients who need high-quality proofreading or editing on a compressed timeline.",
    detail: "Express work prioritizes clarity, correctness, consistency, and delivery discipline for time-sensitive submissions.",
    audiences: ["Deadline-driven students", "Busy professionals", "Conference presenters", "Applicants"],
    deliverables: ["Priority editorial review", "Focused corrections", "Clear delivery timeline", "Urgency-aware communication"]
  },
  {
    slug: "manuscript-formatting",
    name: "Manuscript Formatting",
    eyebrow: "For authors and researchers",
    description: "Clean formatting for manuscripts, reports, theses, references, and long-form documents that need disciplined presentation.",
    detail: "We bring order to headings, spacing, page structure, references, tables, captions, and submission requirements.",
    audiences: ["Authors", "Researchers", "Graduate students", "Independent writers"],
    deliverables: ["Document layout cleanup", "Heading hierarchy", "Reference presentation", "Submission-format review"]
  },
  {
    slug: "translation",
    name: "Translation",
    eyebrow: "For meaning across languages",
    description: "Translation support with editorial attention to meaning, tone, readability, and audience expectations.",
    detail: "The goal is not only to translate words, but to produce text that reads naturally and communicates the original purpose clearly.",
    audiences: ["Researchers", "Organizations", "Professionals", "General clients"],
    deliverables: ["Meaning-sensitive translation", "Tone and readability review", "Terminology consistency", "Final language polish"]
  },
  {
    slug: "writing-support",
    name: "Writing Support",
    eyebrow: "For shaping the draft",
    description: "Guided editorial support for clients who need help developing, reframing, or strengthening a document before final editing.",
    detail: "Useful for proposals, statements, reports, applications, and projects that need stronger direction before the final polish.",
    audiences: ["Applicants", "Professionals", "Writers", "Students"],
    deliverables: ["Document direction review", "Outline and structure support", "Message clarity", "Revision recommendations"]
  }
];

export const services = servicePages.map(({ name, description, detail, slug }) => ({ name, description, detail, slug }));

export const homepageAudiences = [
  {
    label: "Academics",
    title: "Scientific editing and publication support.",
    body: "Research articles, proposals, dissertations, and manuscripts refined for clarity, precision, and scholarly confidence."
  },
  {
    label: "Authors",
    title: "Editing for fiction and non-fiction authors.",
    body: "Narrative flow, sentence rhythm, consistency, and readability improved without flattening the author’s voice."
  },
  {
    label: "Businesses",
    title: "Professional editing for business documents.",
    body: "Reports, profiles, proposals, and client-facing documents polished for credibility and executive clarity."
  },
  {
    label: "Students",
    title: "Academic editing for essays, theses, and dissertations.",
    body: "Calm, careful support for high-stakes submissions where structure, grammar, and argument must hold together."
  }
];

export const editorStandards = [
  {
    title: "Discipline-aware review",
    body: "Documents are handled with attention to audience, field, purpose, and the standard expected from that type of work."
  },
  {
    title: "Voice preservation",
    body: "Editing should make the writing clearer and stronger while keeping the client’s authorship intact."
  },
  {
    title: "Layered quality control",
    body: "The review process separates language, structure, formatting, and delivery checks so important details do not blur together."
  }
];

export const processSteps = [
  {
    label: "01",
    title: "Upload Document",
    body: "Submit your document securely. Add your target audience, tone preferences, and any specific editorial notes."
  },
  {
    label: "02",
    title: "Profiling & Editing",
    body: "We profile the text using AI pre-flight tools, then our subject-matter experts refine the flow, grammar, and structure."
  },
  {
    label: "03",
    title: "Quality Checks",
    body: "A rigorous, multi-layered quality assurance pass ensures consistency, academic rigor, and error-free presentation."
  },
  {
    label: "04",
    title: "Secure Delivery",
    body: "Your polished, submission-ready file is delivered securely to your dashboard, ahead of your deadline."
  }
];

export const faqs = [
  {
    question: "Which file types are accepted?",
    answer: "Version 1 supports .doc, .docx, and .txt files so word count and pricing can be calculated reliably."
  },
  {
    question: "How is pricing calculated?",
    answer: "Pricing is based on service type, total word count, and the selected turnaround option."
  },
  {
    question: "Can I track my order?",
    answer: "Yes. Every paid project appears in the user dashboard with status, payment details, files, and notes."
  },
  {
    question: "Are files private?",
    answer: "Original and completed files are stored privately, with access limited to the client and authorized internal team."
  }
];

export const userProjects = [
  {
    id: "MEP-1048",
    title: "Research proposal revision",
    service: "Editing",
    status: "In Progress",
    due: "7 days",
    words: "8,420",
    paid: "$168.40"
  },
  {
    id: "MEP-1032",
    title: "Business profile polish",
    service: "Proofreading",
    status: "Ready",
    due: "14 days",
    words: "3,180",
    paid: "$47.70"
  },
  {
    id: "MEP-1009",
    title: "Personal statement review",
    service: "Writing support",
    status: "Completed",
    due: "4 weeks",
    words: "1,250",
    paid: "$62.50"
  }
];

export const adminOrders = [
  {
    id: "MEP-1052",
    client: "Amina R.",
    service: "Formatting",
    status: "Paid",
    payment: "Captured",
    words: "12,400",
    value: "$148.80"
  },
  {
    id: "MEP-1048",
    client: "Daniel O.",
    service: "Editing",
    status: "In Review",
    payment: "Captured",
    words: "8,420",
    value: "$168.40"
  },
  {
    id: "MEP-1041",
    client: "Grace M.",
    service: "Translation",
    status: "Assigned",
    payment: "Captured",
    words: "4,960",
    value: "$223.20"
  },
  {
    id: "MEP-1038",
    client: "Northline Studio",
    service: "Proofreading",
    status: "Delivered",
    payment: "Captured",
    words: "2,700",
    value: "$40.50"
  }
];
