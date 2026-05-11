export const servicePages = [
  {
    slug: "academic-editing",
    name: "Academic Editing",
    eyebrow: "For students and researchers",
    description: "For essays, theses, dissertations, journal articles, and research proposals that need scholarly clarity and precision.",
    detail: "Academic editing helps solve unclear argument flow, uneven structure, grammar issues, and inconsistent scholarly tone while preserving your voice and disciplinary intent.",
    audiences: ["Students", "Researchers", "Doctoral candidates", "Academic departments"],
    deliverables: ["Grammar, clarity, and sentence refinement", "Structure and argument flow improvements", "Citation and reference consistency checks", "Submission-ready academic polish"]
  },
  {
    slug: "non-academic-editing",
    name: "Business Editing",
    eyebrow: "For professional documents",
    description: "For proposals, reports, profiles, presentations, and client-facing documents that need to sound clear and credible.",
    detail: "Business editing solves unclear messaging, weak structure, inconsistent tone, and distracting language issues so your document is easier for stakeholders, clients, and decision-makers to trust.",
    audiences: ["Business professionals", "Founders", "Consultants", "General clients"],
    deliverables: ["Professional tone and clarity editing", "Reader-focused structure improvements", "Sentence-level polish", "Clean, client-ready document flow"]
  },
  {
    slug: "express-service",
    name: "Proofreading",
    eyebrow: "For final review and corrections",
    description: "For completed drafts that need grammar, punctuation, spelling, consistency, and readability checked before submission.",
    detail: "Proofreading solves distracting errors, inconsistent wording, and final-stage language issues so your document feels clean, accurate, and ready to share.",
    audiences: ["Deadline-driven students", "Busy professionals", "Conference presenters", "Applicants"],
    deliverables: ["Grammar, spelling, and punctuation corrections", "Consistency and readability review", "Light sentence polish", "Final clean-up before submission"]
  },
  {
    slug: "manuscript-formatting",
    name: "Manuscript Editing",
    eyebrow: "For authors and researchers",
    description: "For long-form manuscripts, reports, theses, and book projects that need stronger organization and cleaner presentation.",
    detail: "Manuscript editing helps solve uneven pacing, unclear sections, inconsistent presentation, and formatting problems that make long documents harder to read.",
    audiences: ["Authors", "Researchers", "Graduate students", "Independent writers"],
    deliverables: ["Manuscript structure and readability review", "Heading and section organization", "Reference and formatting presentation", "Submission-format cleanup"]
  },
  {
    slug: "translation",
    name: "Translation Review",
    eyebrow: "For meaning across languages",
    description: "For translated drafts that need natural phrasing, consistent terminology, clear tone, and audience-appropriate readability.",
    detail: "Translation review solves stiff phrasing, unclear meaning, inconsistent terminology, and tone issues so the final text reads naturally while respecting the original purpose.",
    audiences: ["Researchers", "Organizations", "Professionals", "General clients"],
    deliverables: ["Meaning-sensitive language review", "Tone and readability refinement", "Terminology consistency", "Final language polish"]
  },
  {
    slug: "writing-support",
    name: "Writing Support",
    eyebrow: "For shaping the draft",
    description: "For proposals, statements, reports, applications, and drafts that need clearer direction before final editing.",
    detail: "Writing support helps solve weak organization, unclear messaging, and underdeveloped sections by giving your draft a stronger structure and clearer direction.",
    audiences: ["Applicants", "Professionals", "Writers", "Students"],
    deliverables: ["Document direction review", "Outline and structure support", "Message clarity improvements", "Practical revision recommendations"]
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
    title: "Submit Your Document",
    body: "Submit your document securely. Add your target audience, tone preferences, and any specific editorial notes."
  },
  {
    label: "02",
    title: "Pricing & Review",
    body: "The platform reviews your document details and gives you a clear estimate based on service type, word count, and editing needs."
  },
  {
    label: "03",
    title: "Human Editing",
    body: "A careful editor improves clarity, grammar, structure, tone, and flow while preserving your original meaning."
  },
  {
    label: "04",
    title: "Secure Delivery",
    body: "Your polished, submission-ready file is delivered securely to your dashboard with careful improvements and helpful comments where needed."
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
