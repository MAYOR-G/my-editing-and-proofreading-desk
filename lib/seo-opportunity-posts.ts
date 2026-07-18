import type { BlogPost } from "@/lib/blog";

const author = "My Editing and Proofreading Desk";

export const seoOpportunityPosts: BlogPost[] = [
  {
    title: "Research Paper Editing Checklist Before Journal Submission",
    slug: "research-paper-editing-checklist-before-submission",
    excerpt: "A section-by-section research paper editing checklist for checking journal instructions, argument flow, language, tables, figures, references, declarations, and the final submission files.",
    category: "Research paper editing",
    author,
    datePublished: "2026-07-18",
    dateUpdated: "2026-07-18",
    readingTime: "13 min read",
    metaTitle: "Research Paper Editing Checklist Before Submission",
    metaDescription: "Use this research paper editing checklist before journal submission to review every section, language, tables, figures, references, declarations, and files.",
    heroImage: "/images/blog/research-paper-editing-checklist-before-submission.webp",
    heroImageAlt: "Editor comparing two research paper pages with charts and careful correction marks before journal submission",
    tableOfContents: [
      { id: "before-editing", label: "Before you edit" },
      { id: "section-checklist", label: "Section-by-section checklist" },
      { id: "argument-language", label: "Argument and language" },
      { id: "tables-figures", label: "Tables and figures" },
      { id: "citations-references", label: "Citations and references" },
      { id: "ethics-declarations", label: "Ethics and declarations" },
      { id: "submission-files", label: "Submission files" },
      { id: "final-passes", label: "Final editing passes" },
    ],
    body: [
      {
        id: "before-editing",
        heading: "Before editing: freeze the study and collect the journal rules",
        paragraphs: [
          ["Begin after the study design, analysis, author-approved conclusions, and paper structure are stable. Editing too early creates avoidable rework because polished sentences may be deleted when the argument changes. Save a dated master copy, confirm who can approve changes, and work on a duplicate."],
          ["Download the current instructions for authors from the target journal. Build a short requirements sheet covering article type, word limits, abstract format, heading levels, reference style, figure specifications, supplementary files, anonymisation, and required declarations. The journal's own instructions take priority over a generic style guide."],
          ["If the paper still needs stronger section logic, clearer claims, or extensive sentence revision, begin with ", { text: "research manuscript editing", href: "/manuscript-editing" }, ". If content and language are settled, a final ", { text: "academic proofread", href: "/academic-proofreading" }, " may be the more appropriate stage."],
        ],
        callout: { title: "Create one source of truth", text: ["Keep the manuscript, author details, journal checklist, figures, supplementary files, and response notes in one version-controlled folder. Rename the approved file only after the final PDF check."] },
      },
      {
        id: "section-checklist",
        heading: "Research paper editing checklist by section",
        paragraphs: [
          ["Edit each section for the job it must perform. A sentence can be grammatically correct and still be in the wrong section, overstate the evidence, or repeat information already visible in a table. The checks below apply broadly, but the journal's article structure remains decisive."],
        ],
        table: {
          headers: ["Section", "Editing questions", "Common final check"],
          rows: [
            ["Title", "Does it identify the topic and study clearly without unsupported claims?", "Match the title in the manuscript, submission form, cover letter, and running head."],
            ["Abstract", "Does it accurately represent the purpose, methods, principal results, and conclusion?", "Follow the required structured or unstructured format and word limit."],
            ["Introduction", "Is the problem, relevant context, gap, and study purpose easy to follow?", "Make the final paragraph's objective consistent with the abstract and methods."],
            ["Methods", "Could an informed reader understand what was done from the supplied description?", "Use consistent names for groups, measures, software, dates, and approvals."],
            ["Results", "Are findings reported without interpretation that belongs in the discussion?", "Cross-check values, units, sample labels, tables, figures, and supplementary material."],
            ["Discussion", "Does interpretation follow from the reported evidence and acknowledge limitations?", "Avoid repeating the results section or introducing unreported findings."],
            ["Conclusion", "Does it answer the stated purpose at the right level of certainty?", "Remove new evidence and claims broader than the study supports."],
          ],
        },
      },
      {
        id: "argument-language",
        heading: "Edit the argument, paragraph flow, and research language",
        paragraphs: [
          ["Read once for logic before correcting individual sentences. Mark the function of each paragraph in a few words. Adjacent paragraphs should have distinct purposes, and the first sentence should orient the reader without merely repeating a heading. Move or combine material only when the change preserves the author's intended argument."],
          ["Then edit at sentence level. Prefer precise subjects and verbs, remove unnecessary repetition, and keep terminology stable. Check tense by function rather than applying one tense mechanically: methods describe completed actions, results report findings, and established knowledge may use the present tense where appropriate."],
        ],
        bullets: [
          ["Define abbreviations at first use in the main text and again where a table or figure must stand alone."],
          ["Use the same term for the same concept, participant group, variable, instrument, and outcome throughout."],
          ["Check that words such as causes, proves, improves, and prevents do not exceed what the design supports."],
          ["Remove vague pointers such as this, it, and these when the intended noun is unclear."],
          ["Separate author queries from direct corrections so factual decisions remain visible."],
        ],
      },
      {
        id: "tables-figures",
        heading: "Cross-check every table, figure, and in-text callout",
        paragraphs: [
          ["Tables and figures are part of the argument, not decoration. Read each item independently, then trace every in-text callout. Number items in the order first mentioned, confirm that the cited item exists, and check that the narrative does not conflict with the displayed values."],
          ["Captions and legends should explain the item without forcing the reader to search the main text for basic definitions. Verify units, decimal places, symbols, group labels, statistical notation, colour meaning, and footnotes. Remove duplicated data only when the journal discourages showing the same result in both a table and a figure."],
          ["For a deeper long-document audit, use the ", { text: "tables, figures, and references checklist", href: "/blog/thesis-tables-figures-references-checklist" }, "."],
        ],
      },
      {
        id: "citations-references",
        heading: "Match in-text citations and the reference list in both directions",
        paragraphs: [
          ["Run two checks: every in-text citation should have a reference-list entry, and every reference-list entry should be cited in the manuscript unless the journal permits a separate bibliography. Compare author names, years, letter suffixes, and group-author names exactly."],
          ["Apply the target style consistently to authors, title capitalization, journal or book details, volume, issue, pages or article numbers, DOIs, and URLs. A language edit can identify visible inconsistencies, but authors should verify that each source exists, supports the associated statement, and is represented accurately."],
        ],
        callout: { title: "Do not invent missing details", text: ["Flag uncertain references for author verification. Never guess a DOI, page range, author, publication year, ethics identifier, or source title to make an entry look complete."] },
      },
      {
        id: "ethics-declarations",
        heading: "Check ethics, funding, authorship, conflicts, and data statements",
        paragraphs: [
          ["Use the journal's required headings and wording for ethics approval, consent, funding, competing interests, author contributions, data availability, acknowledgements, and use of third-party material. Confirm each statement with the responsible author; an editor should not infer disclosures from the manuscript."],
          ["The International Committee of Medical Journal Editors maintains ", { text: "recommendations for authorship, disclosure, and reporting", href: "https://www.icmje.org/recommendations/", external: true }, ", while journals and disciplines may impose different requirements. Treat external guidance as a prompt for author verification, not as permission to manufacture missing statements."],
        ],
      },
      {
        id: "submission-files",
        heading: "Audit the complete journal submission package",
        paragraphs: [
          ["The manuscript is only one part of the submission. Compare the final title, abstract, keywords, author order, affiliations, corresponding-author details, funding information, and declarations across the manuscript and submission portal. Follow the journal's rules for anonymous review; remove identifying details only where required."],
        ],
        bullets: [
          ["Main manuscript in the required editable or PDF format"],
          ["Separate title page, if requested"],
          ["Figures at the specified dimensions, resolution, colour mode, and file type"],
          ["Supplementary data, appendices, reporting checklists, and permissions"],
          ["Cover letter and highlights or graphical abstract, only when requested"],
          ["A clean file with comments, hidden text, and tracked changes handled according to journal instructions"],
        ],
      },
      {
        id: "final-passes",
        heading: "Finish with separate editing, proofreading, and file checks",
        paragraphs: [
          ["Do not ask one hurried read-through to solve every problem. Complete a logic pass, a language pass, a consistency pass, and a final proofread. After accepting changes, update automated fields, contents lists, references, and cross-references, then export the exact file type the journal requires."],
          ["Read the exported file page by page. Check line breaks, missing symbols, cropped figures, changed fonts, blank pages, hyperlink behaviour, and the order of end matter. Finally, compare the submission portal fields with the approved manuscript and keep a copy of everything submitted."],
          ["If you want a human review before upload, ", { text: "submit the research paper securely", href: "/submit" }, " or compare ", { text: "editing and proofreading", href: "/blog/editing-vs-proofreading" }, " before choosing a service."],
        ],
        numberedSteps: [
          ["Freeze content and record the target journal's current rules."],
          ["Edit section purpose, argument flow, and claims."],
          ["Edit sentences, terminology, tone, and consistency."],
          ["Cross-check values, tables, figures, citations, and references."],
          ["Verify declarations and every submission file with the responsible author."],
          ["Proofread the approved manuscript and inspect the exported file."],
        ],
      },
    ],
    faq: [
      { question: "Should I edit or proofread a research paper before submission?", answer: "Choose editing when section logic, argument flow, claims, or sentence clarity still need work. Choose proofreading when content is approved and the remaining task is a final language, consistency, and presentation check. Some papers need both stages in sequence." },
      { question: "Can an editor guarantee journal acceptance?", answer: "No. Editing can improve clarity, consistency, and presentation, but acceptance depends on research quality, journal fit, editorial screening, peer review, ethics, and decisions outside an editor's control." },
      { question: "Who should verify references and research facts?", answer: "The authors remain responsible for source accuracy, data, factual claims, ethical disclosures, and the final submitted version. An editor can flag inconsistencies and missing information without inventing or confirming facts they cannot verify." },
    ],
    internalLinks: [
      { href: "/manuscript-editing", label: "Manuscript editing", description: "Review the scope of human editing for research and book manuscripts." },
      { href: "/academic-proofreading", label: "Academic proofreading", description: "Choose a final language and presentation check for an approved paper." },
      { href: "/pricing", label: "Check pricing", description: "Estimate a service using the live word-count and turnaround calculator." },
      { href: "/submit", label: "Submit your paper", description: "Upload securely with the journal, deadline, and document requirements." },
    ],
  },
  {
    title: "Thesis Tables, Figures, Citations, and References Checklist",
    slug: "thesis-tables-figures-references-checklist",
    excerpt: "A focused final-check workflow for thesis tables, figures, captions, in-text callouts, citations, references, automatic lists, permissions, accessibility, and the exported PDF.",
    category: "Thesis proofreading",
    author,
    datePublished: "2026-07-18",
    dateUpdated: "2026-07-18",
    readingTime: "14 min read",
    metaTitle: "Thesis Tables, Figures & References Checklist",
    metaDescription: "Check thesis tables, figures, captions, cross-references, citations, reference-list entries, permissions, accessibility, automatic lists, and the final PDF.",
    heroImage: "/images/blog/thesis-tables-figures-references-checklist.webp",
    heroImageAlt: "Researcher checking charts in an open thesis against a reference list during final quality control",
    tableOfContents: [
      { id: "set-up", label: "Set up the audit" },
      { id: "tables", label: "Table checklist" },
      { id: "figures", label: "Figure checklist" },
      { id: "cross-references", label: "Cross-references and lists" },
      { id: "citations", label: "Citation checks" },
      { id: "reference-list", label: "Reference-list checks" },
      { id: "permissions-accessibility", label: "Permissions and accessibility" },
      { id: "final-pdf", label: "Final PDF quality control" },
    ],
    body: [
      {
        id: "set-up",
        heading: "Set up a controlled thesis audit before changing labels or numbering",
        paragraphs: [
          ["Complete this audit after chapter order, major revisions, and most content decisions are stable. Save a dated master copy and a duplicate working file. Gather the university's thesis manual, department rules, required citation style, permission records, and the approved source files for every table and figure."],
          ["Decide which software feature controls captions, numbering, cross-references, the list of tables, the list of figures, and the bibliography. Automatic fields reduce manual inconsistencies, but only if they are updated and inspected. Do not convert working captions or references to plain text until the submission version is approved."],
          ["This guide is a focused companion to the broader ", { text: "thesis proofreading checklist", href: "/blog/thesis-proofreading-checklist" }, " and ", { text: "dissertation proofreading checklist", href: "/blog/dissertation-proofreading-checklist" }, "."],
        ],
      },
      {
        id: "tables",
        heading: "Thesis table checklist: content, structure, notes, and consistency",
        paragraphs: [
          ["Start with a table inventory. Confirm that every numbered table appears, each number is unique, and numbering follows the required continuous or chapter-based system. Compare the caption, in-text callout, list-of-tables entry, and the table itself."],
        ],
        bullets: [
          ["Use concise column and row labels that identify the measure, group, period, or unit."],
          ["Keep decimal places, significant figures, percentages, negative signs, and missing-value symbols consistent."],
          ["Define abbreviations, symbols, statistical notation, and exceptions in notes when they are not obvious."],
          ["Check totals, sample sizes, percentages, and units against the approved analysis or source data."],
          ["Use a consistent hierarchy for general notes, specific notes, and probability notes if the required style distinguishes them."],
          ["Avoid splitting a row across pages where possible; repeat column headings on continued pages and follow institutional rules for continued tables."],
          ["Confirm that table borders, alignment, spacing, and font size remain legible without making the item visually unrelated to the thesis."],
        ],
        callout: { title: "Data responsibility stays with the author", text: ["A proofreader can spot inconsistencies, but the researcher must confirm that every displayed value matches the approved data and analysis."] },
      },
      {
        id: "figures",
        heading: "Thesis figure checklist: resolution, labels, legends, and source files",
        paragraphs: [
          ["Review plots, diagrams, maps, photographs, screenshots, and reproduced material at the size used in the final document. A figure that looks clear in its source application may become unreadable after export or scaling."],
          ["Check axis titles, tick labels, units, panel labels, legends, symbols, line styles, and colour meaning. Use the same terms and group labels as the main text and tables. Captions should identify what the reader is seeing and explain abbreviations or conditions needed to interpret it."],
        ],
        table: {
          headers: ["Figure element", "Check", "Final-file risk"],
          rows: [
            ["Image quality", "Meets the institution's stated resolution and format requirements", "Pixelation, compression artefacts, or blurred labels after PDF export"],
            ["Colour and symbols", "Groups remain distinguishable with the required display or print conditions", "Meaning depends on colour alone or low-contrast lines disappear"],
            ["Caption", "Matches the number, item, terminology, and source note", "Caption separates from the figure or moves to another page"],
            ["Panels", "Panel labels and descriptions correspond exactly", "A, B, C order changes or a panel is missing"],
            ["Source file", "Editable or high-quality original is retained", "Only a low-resolution pasted copy remains"],
          ],
        },
      },
      {
        id: "cross-references",
        heading: "Trace every table and figure cross-reference in both directions",
        paragraphs: [
          ["Search the thesis for Table, Figure, Fig., Appendix, Chapter, and Section according to the required style. Every callout should point to an existing item, use the correct number, and appear in a sensible reading order. Then begin with each table and figure and confirm that the main text actually introduces or discusses it."],
          ["Update automated captions and cross-references after moving, adding, or deleting an item. Refresh the table of contents, list of tables, and list of figures only after pagination is stable, then compare each generated entry against the visible caption and page number."],
        ],
        numberedSteps: [
          ["List all numbered tables, figures, appendices, and supplementary items."],
          ["Check each item's caption, number, placement, and first in-text callout."],
          ["Search for broken fields, placeholder text, missing items, and duplicate numbers."],
          ["Update automatic fields and inspect the refreshed lists rather than assuming they are correct."],
          ["Repeat the checks in the final exported PDF."],
        ],
      },
      {
        id: "citations",
        heading: "Audit in-text citations for names, years, order, and placement",
        paragraphs: [
          ["Check every citation against the required style and the reference list. Pay special attention to author spelling, publication year, letter suffixes such as 2024a and 2024b, group authors, multiple works inside one citation, page numbers for quotations, and punctuation around the citation."],
          ["Citation placement should make the supported statement clear. A citation at the end of a long paragraph can leave the reader unsure which sentences it covers. Do not move or remove a citation based only on appearance; ask the author when the evidence relationship is uncertain."],
        ],
        bullets: [
          ["Every in-text citation has one matching reference-list entry."],
          ["Every reference-list entry is cited in the thesis unless the institution permits a separate bibliography."],
          ["Narrative and parenthetical forms use the correct author names and year."],
          ["Direct quotations and reproduced material include locators or attribution where the required style calls for them."],
          ["Temporary citation-manager keys and unresolved placeholders have been removed."],
        ],
      },
      {
        id: "reference-list",
        heading: "Check the reference list as structured data, not just as prose",
        paragraphs: [
          ["Sort and group entries according to the required style, then check each field in a consistent order: author or organization, year, title, container, publication details, volume, issue, page range or article number, DOI, URL, and access date where applicable."],
          ["Verify identifiers through the cited source or an authoritative record. Crossref's ", { text: "DOI resolver", href: "https://www.doi.org/", external: true }, " can help test a DOI link, but the author must still confirm that it resolves to the intended work and supports the associated claim. Never guess a missing DOI or publication field."],
        ],
        table: {
          headers: ["Reference problem", "How to detect it", "Safe action"],
          rows: [
            ["Orphan entry", "Reference appears in the list but not in the text", "Confirm whether to cite it or remove it; do not decide from title alone"],
            ["Missing entry", "Citation appears in the text but not in the list", "Ask the author for the complete source details"],
            ["Duplicate work", "Same work appears with small spelling or year variations", "Merge only after confirming both entries are the same source"],
            ["Broken DOI or URL", "Link fails or resolves to a different work", "Verify from the publisher or authoritative record"],
            ["Inconsistent author", "Initials, particles, hyphens, or group name vary", "Follow the source and required style consistently"],
          ],
        },
      },
      {
        id: "permissions-accessibility",
        heading: "Confirm permissions, source notes, and accessible presentation",
        paragraphs: [
          ["Record whether each table or figure is original, adapted, or reproduced. Where third-party permission or a specific attribution line is required, keep the approval and apply the wording exactly. An editor can flag missing source notes but cannot grant rights or decide that an exception applies."],
          ["Make visual information understandable beyond colour alone. Use labels, patterns, symbols, or line styles where suitable; maintain useful contrast; and provide alternative text or a long description when the institution or distribution format requires it. W3C's ", { text: "guidance for complex images", href: "https://www.w3.org/WAI/tutorials/images/complex/", external: true }, " offers practical accessibility patterns, but university requirements still govern the submitted thesis."],
        ],
      },
      {
        id: "final-pdf",
        heading: "Inspect the final PDF page by page before submission",
        paragraphs: [
          ["Export using the university's required settings and inspect the PDF independently of the working file. Confirm that fonts, mathematical symbols, captions, hyperlinks, bookmarks, page numbers, landscape pages, margins, and image quality survived conversion."],
          ["View at ordinary reading size and zoom in on detailed figures. Check that tables are not clipped, figure labels remain legible, blank pages are intentional, and captions have not become separated from their items. Compare the final contents, list of tables, and list of figures with actual page locations."],
          ["Some institutions require an editable file, a PDF, or both; follow the stated rule rather than assuming one format is universal. Keep the approved source file, submitted PDF, submission receipt, and permission records together."],
          ["For help with long-document language and presentation, review ", { text: "thesis editing", href: "/thesis-editing" }, ", ", { text: "dissertation proofreading", href: "/dissertation-proofreading" }, ", or ", { text: "document formatting", href: "/document-formatting" }, "."],
        ],
        callout: { title: "Final five-minute check", text: ["Open the exact file you will upload, verify its filename and version, search once more for broken-reference warnings and placeholders, inspect the first and last pages, and confirm the submission portal shows the intended file."] },
      },
    ],
    faq: [
      { question: "Should tables and figures be checked before or after thesis proofreading?", answer: "Check them during content revision, then repeat the cross-reference, caption, numbering, and export checks after proofreading changes are accepted. Moving text or updating fields can change numbering and page locations." },
      { question: "Can a proofreader verify all thesis references?", answer: "A proofreader can compare citations and entries, identify visible inconsistencies, and flag missing details. Source-by-source verification is a separate scope, and the author remains responsible for source accuracy and how each source supports the thesis." },
      { question: "Should a thesis be submitted as a Word file or PDF?", answer: "Use the format required by your institution or submission system. Some require PDF, some request an editable file, and some require both. Always inspect the exact exported or uploaded file before final submission." },
    ],
    internalLinks: [
      { href: "/thesis-editing", label: "Thesis editing", description: "Improve chapter flow, scholarly language, and sentence clarity before final proofreading." },
      { href: "/dissertation-proofreading", label: "Dissertation proofreading", description: "Arrange a whole-document language and presentation review." },
      { href: "/document-formatting", label: "Document formatting", description: "Get help applying supplied institutional presentation requirements." },
      { href: "/submit", label: "Upload securely", description: "Include your guidelines, word count, and deadline for an accurate scope." },
    ],
  },
];
