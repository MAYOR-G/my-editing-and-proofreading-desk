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

export const faqSections = [
  {
    title: "Choosing a service",
    items: [
      {
        question: "What is the difference between editing and proofreading?",
        answer: "Editing addresses clarity, structure, flow, tone, sentence construction, and correctness. Proofreading is a final-stage check for grammar, spelling, punctuation, formatting consistency, and small wording problems. Choose editing when the draft still needs meaningful improvement; choose proofreading when the content and structure are already settled."
      },
      {
        question: "What does academic editing include?",
        answer: "Academic editing can improve argument flow, paragraph structure, scholarly tone, grammar, terminology, headings, and citation consistency. The editor works with the material you provide and preserves your authorship. The service does not invent evidence, sources, findings, or arguments."
      },
      {
        question: "Can you edit a thesis or dissertation?",
        answer: "Yes. Thesis and dissertation editing can cover chapter flow, clarity, academic tone, grammar, headings, tables, captions, citations, and reference consistency. Long or technically complex documents may need a custom timeline so the review can be planned properly."
      },
      {
        question: "Can you edit a research paper before journal submission?",
        answer: "Yes. Research paper editing focuses on clear presentation of the research question, methods, results, discussion, terminology, and scholarly tone. We can improve the writing and flag unclear claims, but we cannot guarantee journal acceptance or replace subject-matter decisions that belong to the author."
      },
      {
        question: "Do you edit business reports and proposals?",
        answer: "Yes. Business editing can improve message hierarchy, executive summaries, section flow, tone, concision, and reader-facing clarity in reports, proposals, profiles, and presentations. Editing strengthens communication but does not guarantee funding, approval, or commercial success."
      },
      {
        question: "What does manuscript editing cover?",
        answer: "Manuscript editing can address long-form organization, chapter or section flow, consistency, sentence clarity, headings, references, and presentation. The exact scope depends on the manuscript type, length, condition, and whether you need line editing, proofreading, or formatting support."
      }
    ]
  },
  {
    title: "Pricing and turnaround",
    items: [
      {
        question: "How is pricing calculated?",
        answer: "Pricing is based on the service selected, the word count detected from the uploaded file, and the available turnaround. The calculator provides an estimate before upload. Processing fees, where applicable, are shown at the final payment step rather than hidden in the initial rate."
      },
      {
        question: "How long will editing take?",
        answer: "Available turnaround depends on the service and word count. Short final drafts may fit a faster schedule, while theses, dissertations, manuscripts, and technically dense documents need more time. The available options are shown in the pricing and upload flow, and unusually large projects are reviewed separately."
      },
      {
        question: "Why do documents above 50,000 words require a custom review?",
        answer: "Long documents require a realistic schedule, consistent editor assignment, and enough time for whole-document quality checks. A custom review allows the team to confirm scope, formatting complexity, milestones, and delivery timing before payment."
      },
      {
        question: "Can I request a quote before uploading?",
        answer: "Yes. Use the pricing calculator for an initial estimate or contact support with the document type, approximate word count, required service, and deadline. A final price may still depend on the uploaded file and the level of work it requires."
      }
    ]
  },
  {
    title: "Files, privacy, and delivery",
    items: [
      {
        question: "How do I upload my document?",
        answer: "Open the secure upload flow, choose the relevant service, and add the file with your audience, purpose, deadline, and editorial notes. The system displays the detected word count and estimate before checkout so you can review the project details first."
      },
      {
        question: "What file types do you accept?",
        answer: "The main upload flow accepts .doc, .docx, and .txt files so the system can read the document and calculate its word count. If your document contains complex layouts, figures, or another file type, contact support before payment to confirm the best format."
      },
      {
        question: "Is my document confidential?",
        answer: "Uploaded documents are handled privately and used only to provide the service requested. Access should be limited to the people involved in administration, payment, editing, and delivery. If your project has specific confidentiality requirements, include them before work begins."
      },
      {
        question: "How is the word count confirmed?",
        answer: "The upload system reads the file and calculates the word count used for pricing. The count cannot be manually changed in checkout. If the result appears incorrect because of tables, references, or unusual formatting, contact support before paying."
      }
    ]
  },
  {
    title: "Human review and follow-up",
    items: [
      {
        question: "Do you use AI instead of human editors?",
        answer: "No. The free AI tool provides a quick first pass for short text. Important academic, business, manuscript, and professional documents benefit from human judgment because an editor can consider context, audience, discipline, formatting, and the risk of changing the writer's meaning."
      },
      {
        question: "Will an editor rewrite my work for me?",
        answer: "Editors improve the writing you provide while protecting your voice and authorship. They may revise unclear sentences and leave comments on larger issues, but they do not invent experience, evidence, research findings, citations, or assessed content on your behalf."
      },
      {
        question: "Can I ask questions after delivery?",
        answer: "Yes. If you need clarification about an editorial change or comment, use the project support channel and refer to the relevant passage. Follow-up questions should relate to the agreed editing scope; substantial new material or a newly revised document may require a separate review."
      },
      {
        question: "Are revisions included?",
        answer: "Questions about the delivered edit can be reviewed within the agreed project scope. A complete second edit, newly added sections, or major rewriting after delivery may require a new quote. Contact support with the project reference so the request can be assessed fairly."
      },
      {
        question: "How do I contact support?",
        answer: "Use the Contact page or email support@business.editandproofread.com. Include the document type, expected word count, deadline, and project reference if one already exists so the team can respond with useful next steps."
      }
    ]
  },
  {
    title: "International standards and regional styles",
    items: [
      {
        question: "Do you support British English (UK), Canadian, and Australian styles?",
        answer: "Yes. When uploading your document, specify your required dialect—British English (UK), American English (US), Canadian English, or Australian English. Our editors will apply the proper spelling, punctuation, quotation styles, and regional academic conventions."
      },
      {
        question: "Can you help non-native English and international researchers publish in SCI/Scopus journals?",
        answer: "Yes. A substantial portion of our authors are international researchers and scholars from China, the Middle East, Europe, Africa, and Latin America. We specialize in ESL translation review, academic tone refinement, and sentence-level polishing to help overcome journal language barriers before submission to IEEE, Nature, Springer, Elsevier, and Wiley."
      },
      {
        question: "Which referencing and style manuals do you support?",
        answer: "We support all major academic and professional style guides, including APA (7th ed.), Harvard (UK & Australian formats), Chicago/Turabian (Notes & Bibliography and Author-Date), IEEE, Vancouver, MLA (9th ed.), OSCOLA (UK Law), MHRA, and custom journal guidelines."
      },
      {
        question: "How do turnaround times work across international time zones?",
        answer: "Our global editorial desks across North America, the UK, UAE, and Africa operate continuously. Once you upload and confirm your project, work commences immediately according to your chosen turnaround schedule, regardless of your local time zone."
      }
    ]
  }
];

export const faqs = faqSections.flatMap((section) => section.items);

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
