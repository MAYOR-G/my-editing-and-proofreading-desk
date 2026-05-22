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
    title: "Subject-aware editing",
    body: "Editors consider the field, audience, document type, and expected standard before making changes."
  },
  {
    title: "Clear feedback",
    body: "Changes and comments are written plainly so you understand what was improved and where your decision may be needed."
  },
  {
    title: "Confidential review",
    body: "Uploaded documents are handled privately and used only to provide the editing, proofreading, or support service requested."
  },
  {
    title: "Human judgment",
    body: "Editors improve clarity and correctness while protecting the writer's intent, tone, and authorship."
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
    question: "How do I upload my document?",
    answer: "Start from the secure upload flow in your dashboard. Choose your service, upload the file, review the detected word count and estimate, then continue to checkout."
  },
  {
    question: "How is my word count calculated?",
    answer: "When you upload your document, the system calculates the word count from the file. This detected word count is used for pricing and cannot be manually changed."
  },
  {
    question: "Can I change the word count after upload?",
    answer: "No. The uploaded file controls the word count so pricing stays consistent and fair. If the count looks wrong, contact support before you pay."
  },
  {
    question: "What happens after I upload?",
    answer: "You will see the detected word count, selected service, turnaround, and estimated price. If everything looks correct, you can continue to secure checkout."
  },
  {
    question: "How is pricing calculated?",
    answer: "Pricing is based on the service you choose, the detected word count, and the selected turnaround. Processing fees are shown only at the final payment step."
  },
  {
    question: "Why do documents above 50,000 words require custom review?",
    answer: "Large documents often need a more careful timeline and review plan. Contact support so we can confirm the best approach before you proceed."
  },
  {
    question: "Is my document confidential?",
    answer: "Yes. Uploaded documents are handled privately and used only to provide the editing or proofreading service you requested."
  },
  {
    question: "Do you use AI instead of human editors?",
    answer: "No. The free AI tool is for quick suggestions. Human editing is still recommended for important academic, business, or professional documents."
  },
  {
    question: "What file types do you accept?",
    answer: "The upload flow accepts .doc, .docx, and .txt files so the system can read the document and calculate the word count reliably."
  },
  {
    question: "How do I contact support?",
    answer: "Use the Contact page or email support@business.editandproofread.com. Include your document type, expected word count, and deadline if you have one."
  }
];

export const userProjects = [
  {
    id: "MEP-1048",
    title: "Research proposal revision",
    service: "Editing",
    status: "Pending",
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
