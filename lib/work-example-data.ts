export type WorkExampleKey =
  | "apa"
  | "astrophysics"
  | "biology"
  | "chemistry"
  | "chicago"
  | "computing"
  | "cv"
  | "economics"
  | "electrical"
  | "law"
  | "life-sciences"
  | "marketing"
  | "mla"
  | "nursing"
  | "oscola"
  | "pharmaceuticals"
  | "philosophy"
  | "political-science"
  | "psychology"
  | "theology";

export type WorkExampleKind = "academic" | "technical" | "reference" | "resume" | "clinical" | "business";

export type WorkExample = {
  key: WorkExampleKey;
  title: string;
  shortTitle: string;
  kind: WorkExampleKind;
  field: string;
  accent: string;
  documentTitle: string;
  authorLine: string;
  terms: string[];
  pages: WorkExamplePage[];
};

export type WorkExamplePage = {
  eyebrow: string;
  heading: string;
  body: string[];
  variant?: "document" | "references";
  table?: { headers: string[]; rows: string[][] };
  figure?: "cell" | "molecule" | "circuit" | "code" | "resume" | "reference" | "chart" | "clinical";
  comments: WorkExampleComment[];
};

export type WorkExampleComment = {
  label: string;
  note: string;
};

type ExampleSeed = Omit<WorkExample, "pages"> & {
  thesis: string;
  method: string;
  result: string;
  reference: string;
};

const examples: ExampleSeed[] = [
  {
    key: "apa",
    title: "APA reference check",
    shortTitle: "APA",
    kind: "reference",
    field: "Reference editing",
    accent: "#174a7c",
    documentTitle: "References and In-Text Citations: APA 7",
    authorLine: "Edited bibliography sample",
    terms: ["DOI", "sentence case", "hanging indent", "journal title"],
    thesis: "The manuscript used useful sources, but several entries lacked APA 7 punctuation, title casing, and DOI formatting.",
    method: "We checked every in-text citation against the reference list, normalized author initials, and corrected italicization.",
    result: "The final reference section is consistent, searchable, and ready for journal submission.",
    reference: "Miller, A. R., & Chen, P. (2023). Cognitive load and revision quality. Journal of Writing Research, 15(2), 114-132. https://doi.org/10.0000/jwr.2023.15.2.114"
  },
  {
    key: "astrophysics",
    title: "Astrophysics",
    shortTitle: "Astrophysics",
    kind: "academic",
    field: "Physical sciences",
    accent: "#256aa8",
    documentTitle: "Dust Attenuation in High-Redshift Galaxies",
    authorLine: "Research article sample",
    terms: ["redshift", "spectral energy distribution", "stellar mass", "attenuation curve"],
    thesis: "This study compares rest-frame ultraviolet slopes with infrared luminosities to estimate dust attenuation in star-forming galaxies.",
    method: "Photometric catalogues were filtered for signal-to-noise thresholds before spectral energy distributions were fitted with a delayed tau model.",
    result: "The revised discussion distinguishes observational uncertainty from model assumptions and strengthens the claim about stellar mass dependence.",
    reference: "The corrected caption now defines z, LIR, and beta before interpreting the attenuation trend."
  },
  {
    key: "biology",
    title: "Biology",
    shortTitle: "Biology",
    kind: "academic",
    field: "Life sciences",
    accent: "#1f8f5a",
    documentTitle: "Mitochondrial Stress Responses in Arabidopsis Seedlings",
    authorLine: "Biology manuscript sample",
    terms: ["mitochondrial membrane potential", "reactive oxygen species", "qPCR", "chloroplast"],
    thesis: "The experiment investigates whether transient oxidative stress changes mitochondrial membrane potential during early seedling development.",
    method: "Seedlings were exposed to controlled light cycles, stained with JC-1 dye, and compared with untreated controls using confocal microscopy.",
    result: "The edited results section separates observed fluorescence changes from interpretation and clarifies the figure references.",
    reference: "Figure 2 shows a representative root tip with corrected labels for cortex, epidermis, and meristematic tissue."
  },
  {
    key: "chemistry",
    title: "Chemistry",
    shortTitle: "Chemistry",
    kind: "academic",
    field: "Laboratory report",
    accent: "#0f766e",
    documentTitle: "Kinetic Analysis of Ester Hydrolysis",
    authorLine: "Chemistry lab report sample",
    terms: ["hydrolysis", "activation energy", "titration", "molar concentration"],
    thesis: "The report estimates the rate constant for alkaline ester hydrolysis under three temperature conditions.",
    method: "Aliquots were quenched at fixed intervals, titrated against standardized hydrochloric acid, and plotted as pseudo-first-order reactions.",
    result: "We tightened the causal language, corrected units, and made the reaction scheme easier to follow.",
    reference: "CH3COOCH2CH3 + OH- -> CH3COO- + CH3CH2OH"
  },
  {
    key: "chicago",
    title: "Chicago reference check",
    shortTitle: "Chicago",
    kind: "reference",
    field: "Notes and bibliography",
    accent: "#5d4b2f",
    documentTitle: "Chicago Notes, Bibliography, and Citation Consistency",
    authorLine: "History references sample",
    terms: ["footnotes", "bibliography", "shortened notes", "publisher location"],
    thesis: "The draft mixed shortened notes with full notes and used inconsistent capitalization in book titles.",
    method: "We aligned footnote order, corrected bibliography punctuation, and checked repeated citations for shortened-note format.",
    result: "The final citations follow Chicago style and read as a single, professionally prepared apparatus.",
    reference: "Armitage, David. Foundations of Modern International Thought. Cambridge: Cambridge University Press, 2013."
  },
  {
    key: "computing",
    title: "Computing",
    shortTitle: "Computing",
    kind: "technical",
    field: "Computer science",
    accent: "#334155",
    documentTitle: "Cache-Aware Scheduling for Distributed Inference",
    authorLine: "Technical paper sample",
    terms: ["latency", "cache locality", "scheduler", "container orchestration"],
    thesis: "The paper proposes a scheduler that routes inference requests by model residency and expected queue depth.",
    method: "Request traces were replayed across three cluster sizes while measuring p95 latency, cache hit rate, and cold-start frequency.",
    result: "The edit improves technical precision, reduces passive constructions, and makes the algorithm explanation easier to scan.",
    reference: "Algorithm 1 now defines the score function before the tie-break condition."
  },
  {
    key: "cv",
    title: "CV / Résumé",
    shortTitle: "CV",
    kind: "resume",
    field: "Professional documents",
    accent: "#111827",
    documentTitle: "Senior Research Analyst CV",
    authorLine: "Professional résumé sample",
    terms: ["impact", "leadership", "metrics", "formatting consistency"],
    thesis: "The original CV contained strong experience but hid achievements in long, task-based bullets.",
    method: "We rewrote bullets for measurable impact, aligned date styles, and tightened the professional summary.",
    result: "The revised CV presents a confident, concise career narrative with high-end editorial polish.",
    reference: "Led a six-person analytics team and reduced monthly reporting time by 38% through automated dashboards."
  },
  {
    key: "economics",
    title: "Economics",
    shortTitle: "Economics",
    kind: "academic",
    field: "Social sciences",
    accent: "#7c5c18",
    documentTitle: "Exchange Rate Volatility and Export Performance",
    authorLine: "Economics dissertation sample",
    terms: ["panel regression", "fixed effects", "heteroskedasticity", "export elasticity"],
    thesis: "The chapter tests whether exchange-rate volatility suppresses manufacturing exports across emerging markets.",
    method: "A fixed-effects panel model was estimated with country-year controls and clustered standard errors.",
    result: "The revised section clarifies model specification and avoids overstating causality from observational data.",
    reference: "Table 3 now distinguishes coefficient estimates from marginal effects."
  },
  {
    key: "electrical",
    title: "Electrical engineering",
    shortTitle: "Engineering",
    kind: "technical",
    field: "Engineering",
    accent: "#1d4ed8",
    documentTitle: "Low-Noise Amplifier Design for Sensor Interfaces",
    authorLine: "Electrical engineering report sample",
    terms: ["op-amp", "signal-to-noise ratio", "bandwidth", "feedback network"],
    thesis: "The report evaluates a low-noise amplifier for a capacitive sensor interface operating below 10 kHz.",
    method: "The circuit was simulated in LTspice and validated on a breadboard using a calibrated function generator.",
    result: "We clarified component roles, corrected ambiguous units, and made the figure captions technically precise.",
    reference: "R1 and R2 set the closed-loop gain, while C2 limits high-frequency noise."
  },
  {
    key: "law",
    title: "Law",
    shortTitle: "Law",
    kind: "academic",
    field: "Legal writing",
    accent: "#4338ca",
    documentTitle: "Proportionality Review in Administrative Decision-Making",
    authorLine: "Law essay sample",
    terms: ["proportionality", "judicial review", "statutory discretion", "case authority"],
    thesis: "The essay argues that proportionality review can discipline administrative discretion without replacing legislative judgment.",
    method: "We refined topic sentences, corrected citation style, and strengthened transitions between authorities.",
    result: "The final draft presents a clearer line of reasoning and a more precise treatment of precedent.",
    reference: "R v Secretary of State for the Home Department, ex parte Daly [2001] UKHL 26."
  },
  {
    key: "life-sciences",
    title: "Life Sciences",
    shortTitle: "Life Sciences",
    kind: "clinical",
    field: "Biomedical science",
    accent: "#15803d",
    documentTitle: "Transcriptomic Markers of Early Inflammatory Response",
    authorLine: "Life sciences article sample",
    terms: ["RNA-seq", "biomarker", "inflammatory pathway", "fold change"],
    thesis: "The manuscript identifies candidate markers associated with early inflammatory signalling in cultured epithelial cells.",
    method: "Differential expression analysis was performed after quality filtering and pathway enrichment analysis.",
    result: "The edit makes statistical thresholds explicit and improves the distinction between association and mechanism.",
    reference: "The revised table labels adjusted p values and log2 fold change consistently."
  },
  {
    key: "marketing",
    title: "Marketing (two-editor service)",
    shortTitle: "Marketing",
    kind: "business",
    field: "Business writing",
    accent: "#b45309",
    documentTitle: "Market Entry Strategy for a Subscription Wellness Brand",
    authorLine: "Marketing strategy sample",
    terms: ["positioning", "customer segment", "conversion", "brand voice"],
    thesis: "The proposal outlines a launch plan for a premium wellness subscription entering a crowded urban market.",
    method: "We refined the executive summary, sharpened value propositions, and made the tone more commercially confident.",
    result: "The revised copy is concise, persuasive, and better aligned with investor-facing expectations.",
    reference: "The customer promise now foregrounds measurable convenience rather than vague lifestyle language."
  },
  {
    key: "mla",
    title: "MLA reference check",
    shortTitle: "MLA",
    kind: "reference",
    field: "Works cited editing",
    accent: "#6d28d9",
    documentTitle: "MLA Works Cited and Parenthetical Citations",
    authorLine: "Literary studies references sample",
    terms: ["container", "publisher", "access date", "parenthetical citation"],
    thesis: "The essay used strong literary sources but mixed MLA 8 and MLA 9 conventions.",
    method: "We standardized containers, corrected author order, and matched parenthetical citations to the Works Cited list.",
    result: "The final list is consistent, alphabetized, and formatted for submission.",
    reference: "Morrison, Toni. Beloved. Vintage International, 2004."
  },
  {
    key: "nursing",
    title: "Nursing",
    shortTitle: "Nursing",
    kind: "clinical",
    field: "Healthcare",
    accent: "#0e7490",
    documentTitle: "Improving Discharge Education for Heart Failure Patients",
    authorLine: "Nursing assignment sample",
    terms: ["patient education", "readmission", "care plan", "clinical handover"],
    thesis: "The paper evaluates whether structured discharge education can reduce avoidable readmissions among heart failure patients.",
    method: "Evidence from clinical guidelines and peer-reviewed studies was synthesized into a practical nursing intervention.",
    result: "The edit improves professional tone, removes repetition, and clarifies the link between intervention and outcome.",
    reference: "The care-plan table now separates patient goals, nursing actions, and evaluation measures."
  },
  {
    key: "oscola",
    title: "OSCOLA reference check",
    shortTitle: "OSCOLA",
    kind: "reference",
    field: "Legal citation editing",
    accent: "#4c1d95",
    documentTitle: "OSCOLA Footnotes and Table of Authorities",
    authorLine: "Law references sample",
    terms: ["neutral citation", "law report", "pinpoint", "ibid"],
    thesis: "The draft contained useful legal authorities but inconsistent case names, pinpoint references, and footnote punctuation.",
    method: "We checked each case against OSCOLA conventions and aligned statutes, cases, and secondary sources.",
    result: "The final legal apparatus is precise, readable, and easier for assessors to verify.",
    reference: "Donoghue v Stevenson [1932] AC 562 (HL)."
  },
  {
    key: "pharmaceuticals",
    title: "Pharmaceuticals",
    shortTitle: "Pharma",
    kind: "clinical",
    field: "Pharmaceutical science",
    accent: "#be123c",
    documentTitle: "Stability Testing of an Oral Suspension Formulation",
    authorLine: "Pharmaceutical report sample",
    terms: ["bioavailability", "excipient", "dissolution profile", "ICH guidelines"],
    thesis: "The report assesses the physical and chemical stability of an oral suspension under accelerated storage conditions.",
    method: "Samples were evaluated for pH, assay value, viscosity, and microbial limits at scheduled intervals.",
    result: "The revised version uses more precise regulatory language and presents stability findings in a cleaner sequence.",
    reference: "The edited method now specifies storage at 40 C/75% RH in accordance with ICH guidance."
  },
  {
    key: "philosophy",
    title: "Philosophy",
    shortTitle: "Philosophy",
    kind: "academic",
    field: "Humanities",
    accent: "#52525b",
    documentTitle: "Moral Responsibility and the Problem of Manipulation",
    authorLine: "Philosophy essay sample",
    terms: ["compatibilism", "agency", "moral responsibility", "counterargument"],
    thesis: "The essay argues that manipulation cases expose a weakness in purely reasons-responsive accounts of responsibility.",
    method: "We improved paragraph logic, reduced abstraction where it obscured the claim, and clarified the objection.",
    result: "The edited essay has a more controlled argumentative structure and a more readable academic voice.",
    reference: "The revised conclusion restates the argument without introducing new premises."
  },
  {
    key: "political-science",
    title: "Political science",
    shortTitle: "Politics",
    kind: "academic",
    field: "Social sciences",
    accent: "#991b1b",
    documentTitle: "Coalition Formation in Fragmented Party Systems",
    authorLine: "Political science paper sample",
    terms: ["coalition", "electoral threshold", "minority government", "party system"],
    thesis: "The paper examines how electoral thresholds influence coalition bargaining in proportional representation systems.",
    method: "Comparative case evidence was reorganized around institutional variables and party-system fragmentation.",
    result: "The edit strengthens signposting and makes the causal claim more appropriately qualified.",
    reference: "The revised section distinguishes coalition incentives from observed coalition outcomes."
  },
  {
    key: "psychology",
    title: "Psychology",
    shortTitle: "Psychology",
    kind: "academic",
    field: "Behavioral sciences",
    accent: "#7e22ce",
    documentTitle: "Working Memory Load and Online Learning Outcomes",
    authorLine: "Psychology manuscript sample",
    terms: ["working memory", "cognitive load", "ANOVA", "participant recruitment"],
    thesis: "The study tests whether interface complexity increases cognitive load and reduces retention in online learning.",
    method: "Participants completed two learning modules followed by a recall task and a subjective workload questionnaire.",
    result: "The revised results section presents statistical findings cleanly and avoids implying practical significance without support.",
    reference: "The edited discussion now separates limitations from recommendations for instructional design."
  },
  {
    key: "theology",
    title: "Theology",
    shortTitle: "Theology",
    kind: "academic",
    field: "Humanities",
    accent: "#854d0e",
    documentTitle: "Hospitality and Covenant Language in Pauline Ethics",
    authorLine: "Theology essay sample",
    terms: ["exegesis", "covenant", "Pauline ethics", "hermeneutics"],
    thesis: "The essay explores how covenant language shapes the ethic of hospitality in selected Pauline texts.",
    method: "We clarified scriptural references, improved transitions, and made interpretive claims more precise.",
    result: "The final essay reads with stronger scholarly control while preserving the author's voice.",
    reference: "The revised paragraph links textual analysis to the larger theological claim."
  }
];

function createPages(seed: ExampleSeed): WorkExamplePage[] {
  if (seed.key === "apa") return createApaReferencePages();
  if (seed.kind === "resume") return createResumePages(seed);
  if (seed.kind === "reference") return createReferencePages(seed);

  const figure = figureFor(seed.key);

  return [
    {
      eyebrow: "Page 1 of 5 - Opening and thesis",
      heading: seed.documentTitle,
      body: [
        `This sample shows a polished ${seed.field.toLowerCase()} document after editorial review. The original draft stated that the project was <del>very clearly proving</del> <ins>designed to investigate</ins> ${seed.thesis.charAt(0).toLowerCase() + seed.thesis.slice(1)}`,
        `Our editor adjusted the claim so the sentence is accurate, professional, and appropriate for academic assessment. Key terms in this section include ${seed.terms.slice(0, 3).join(", ")}.`
      ],
      comments: [
        { label: "Precision", note: "Softened an overclaim and replaced it with discipline-appropriate wording." },
        { label: "Flow", note: "Moved the purpose statement earlier so the reader understands the project immediately." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Method and structure",
      heading: "Methods and analytical approach",
      body: [
        `${seed.method} The draft originally placed the procedure after the findings, which made the logic difficult to follow. We moved the sequence into a clearer order: context, method, evidence, then interpretation.`,
        `Several sentences were tightened: <del>It can be seen from this that the process was done in a careful way</del> <ins>The procedure was controlled and reproducible</ins>.`
      ],
      table: {
        headers: ["Section", "Before review", "After review"],
        rows: [
          ["Terminology", "Mixed or undefined", "Defined on first use"],
          ["Evidence", "Scattered across paragraphs", "Grouped by claim"],
          ["Tone", "Informal emphasis", "Measured academic voice"]
        ]
      },
      comments: [
        { label: "Clarity", note: "Converted vague process wording into a concise methodological statement." },
        { label: "Consistency", note: `Checked repeated use of ${seed.terms[0]} and ${seed.terms[1]}.` }
      ]
    },
    {
      eyebrow: "Page 3 of 5 - Figure and caption review",
      heading: "Figure review",
      body: [
        `The visual material was edited so the caption interprets the figure without repeating the surrounding paragraph. ${seed.reference}`,
        `The original caption read <del>the image below shows the result</del> <ins>Figure 1 summarizes the observed relationship between the measured variables</ins>.`
      ],
      figure,
      comments: [
        { label: "Caption", note: "Replaced a vague caption with a self-contained figure description." },
        { label: "Reader support", note: "Added labels so the figure can be understood independently of the body text." }
      ]
    },
    {
      eyebrow: "Page 4 of 5 - Results and discussion",
      heading: "Results, interpretation, and style",
      body: [
        `${seed.result} We also removed repetition and ensured that interpretation followed the reported evidence.`,
        `A sentence such as <del>this totally confirms the expected theory</del> became <ins>these findings are consistent with the expected pattern, although further validation is required</ins>.`
      ],
      comments: [
        { label: "Academic tone", note: "Replaced absolute language with appropriately qualified interpretation." },
        { label: "Sentence flow", note: "Combined short, repetitive statements into a more fluent paragraph." }
      ]
    },
    {
      eyebrow: "Page 5 of 5 - Final polish",
      heading: "Conclusion and final editorial pass",
      body: [
        `The final page demonstrates the last pass: heading capitalization, tense consistency, reference callouts, and sentence-level polish. Terms such as ${seed.terms.join(", ")} are now used consistently.`,
        `The closing sentence was revised from <del>In conclusion, this is very important and more research should happen</del> to <ins>Overall, the analysis provides a focused basis for future work while acknowledging the limits of the present design</ins>.`
      ],
      comments: [
        { label: "Conclusion", note: "Made the final claim specific and proportionate to the evidence." },
        { label: "Proofread", note: "Checked punctuation, tense, heading style, and cross-references." }
      ]
    }
  ];
}

function createApaReferencePages(): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - References heading and first entries",
      heading: "References",
      variant: "references",
      body: [
        `<ins>References</ins>`,
        `Allen <del>MC,, M. C.,</del> <ins>M. C.</ins>, Cristofalo <del>EA,, E. A.,</del> <ins>E. A.</ins>, & Kim, C. (2011). Outcomes of preterm infants: <del>morbidity</del><ins>Morbidity</ins> replaces mortality. <del>Clinics in perinatology. 2011;</del><ins>Clinics in Perinatology</ins>, 38(3), 441-454. https://doi.org/10.1016/j.clp.2011.06.011`,
        `Amjad, <del>S,., MacDonald, I,., Chambers T,., Osornio-Vargas A,., Chandra S,., Voaklander D, et al. .,</del> <ins>S., MacDonald, I., Chambers, T., Osornio-Vargas, A., Chandra, S., Voaklander, D., & Ospina, M. B.</ins> (2018). Social determinants of health and adverse maternal and birth outcomes in adolescent pregnancies: <del>a</del><ins>A</ins> systematic review and meta-analysis. <del>Paediatr Perinat Epidemiol. 2018;</del><ins>Paediatric and Perinatal Epidemiology</ins>, 33(1), 88-99. https://doi.org/10.1111/ppe.12529`,
        `Atwal <del>GS,, G. S.</del><ins>G. S.</ins>, Manku <del>LK,, L. K.</del><ins>L. K.</ins>, Griffiths <del>CE,, C. E.</del><ins>C. E.</ins>, & Polson <del>DW., D. W.</del><ins>D. W.</ins> (2006). Striae gravidarum in primiparae. <del>Br J Dermatol. 2006;</del><ins>British Journal of Dermatology</ins>, 155(5), 965-969. https://doi.org/10.1111/j.1365-2133.2006.07427.x`
      ],
      comments: [
        { label: "A1", note: "Hello, I am looking forward to proofreading your references. I will correct mistakes and flag missing information in my comments." },
        { label: "A2", note: "APA centers and bolds the title for the references. These should be double-spaced with a half-inch hanging indent." },
        { label: "A3", note: "Journal and publication names should be in title case and italicized." },
        { label: "A4", note: "Provide the DOI or URL whenever available. DOI links are not followed by a period." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Author order and source details",
      heading: "References",
      variant: "references",
      body: [
        `Blumenshine, <del>P,., Egerter, S,., Barclay CJ,, C. J., Cubbin, C,., & Braveman PA., P. A.</del> <ins>P., Egerter, S., Barclay, C. J., Cubbin, C., & Braveman, P. A.</ins> (2010). Socioeconomic disparities in adverse birth outcomes: <del>a</del><ins>A</ins> systematic review. <del>Am J Prev Med. 2010;</del><ins>American Journal of Preventive Medicine</ins>, 39(3), 263-272. https://doi.org/10.1016/j.amepre.2010.05.012`,
        `Cockcroft, S. (2011). How can family-centred care be improved to meet the needs of parents with a premature baby in neonatal intensive care? <ins>Journal of Neonatal Nursing</ins>, 18(3), 105-110. https://doi.org/10.1016/j.jnn.2011.07.008`,
        `Cuevas <del>KD,, K. D., Silver DR,, D. R., Brooten, D,., Youngblut JAM,, J. A. M., & Bobo CM., C. M.</del> <ins>K. D., Silver, D. R., Brooten, D., Youngblut, J. A. M., & Bobo, C. M.</ins> (2005). The cost of prematurity: <del>hospital</del><ins>Hospital</ins> charges at birth and frequency of rehospitalizations and acute care visits over the first year of life: <del>a</del><ins>A</ins> comparison by gestational age and birth weight. <ins>AJN The American Journal of Nursing</ins>, 105(7), 56-64. https://doi.org/10.1097/00000446-200507000-00031`,
        `Davey, C. M. H. (1972). Factors associated with the occurrence of striae gravidarum. Journal of Obstetrics and Gynaecology of the British Commonwealth, 79(12), 1113-1114. https://doi.org/10.1111/j.1471-0528.1972.tb11896.x`
      ],
      comments: [
        { label: "A5", note: "APA 7 writes out up to 20 authors. Use an ellipsis after the 19th author, but no ampersand. Please confirm added authors." },
        { label: "A6", note: "APA does not abbreviate journal titles. These should be written in full and italicized." },
        { label: "A7", note: "This source was missing volume, issue, pages, and DOI. Please review and confirm the additions." }
      ]
    },
    {
      eyebrow: "Page 3 of 5 - Missing DOI and source verification",
      heading: "References",
      variant: "references",
      body: [
        `De Groot, <del>A,., Van de Munt, L,., Boateng, D,., Savitri AI,, A. I., Antwi, E,., Bolten, N, et al..,</del> <ins>A., Van de Munt, L., Boateng, D., Savitri, A. I., Antwi, E., Bolten, N., Klipstein-Grobusch, K., Uiterwaal, C. S. P. M., & Browne, J. L.</ins> (2019). Equity in maternal health outcomes in a middle-income urban setting: <del>a</del><ins>A</ins> cohort study. <del>Reprod Health. 2019;</del><ins>Reproductive Health</ins>, 16(1), 84. https://doi.org/10.1186/s12978-019-0736-3`,
        `Ersoy, <del>E,., Ersoy AO,, A. O., Yasar Celik, E,., Tokmak, A,., Ozler, S,., & Tasci, Y.</del> <ins>E., Ersoy, A. O., Yasar Celik, E., Tokmak, A., Ozler, S., & Tasci, Y.</ins> (2016). Is it possible to prevent striae gravidarum? <del>J Chin Med Assoc. 2016;</del><ins>Journal of the Chinese Medical Association</ins>, 79(5), 272-275. https://doi.org/10.1016/j.jcma.2015.12.007`,
        `Finer <del>N, Carlo W, Walsh M, Rich W, Gantz M, Laptook A, et al.</del> <ins>N. N., Carlo, W. A., Walsh, M. C., Rich, W., Gantz, M. G., Laptook, A. R., et al.</ins> (2010). Early CPAP versus surfactant in extremely preterm infants. <ins>The New England Journal of Medicine</ins>, 362(21), 1970-1979. https://doi.org/10.1056/NEJMoa0911783`,
        `Gooding <del>JS,, J. S., Cooper LG,, L. G., Blaine AI,, A. I., Franck LS,, L. S., Howse JL,, J. L., & Berns SD., S. D.</del> <ins>J. S., Cooper, L. G., Blaine, A. I., Franck, L. S., Howse, J. L., & Berns, S. D.</ins> (2011). Family support and family-centered care in the neonatal intensive care unit: Origins, advances, impact. Seminars in Perinatology, 35(1), 20-28. https://doi.org/10.1053/j.semperi.2010.10.004`
      ],
      comments: [
        { label: "A8", note: "Please confirm the page range and DOI for this source." },
        { label: "A9", note: "Please confirm the DOI." },
        { label: "A10", note: "Please confirm the added missing journal name and DOI." },
        { label: "A11", note: "Please confirm the additional authors." }
      ]
    },
    {
      eyebrow: "Page 4 of 5 - Alphabetization and archived sources",
      heading: "References",
      variant: "references",
      body: [
        `Hamilton <del>BE, et al. Births: preliminary data for 2003. Natl Vital Stat Rep. 2004;53(9):1-17.</del> <ins>B. E., Martin, J. A., Sutton, P. D., & Centers for Disease Control and Prevention, National Center for Health Statistics.</ins> (2004). Births: Preliminary data for 2003. National Vital Statistics Reports, 53(9), 1-17. PMID: 15622995.`,
        `Heuchan <del>AM,, A. M., Hunter, L,., & Young, D.</del> <ins>A. M., Hunter, L., & Young, D.</ins> (2012). Outcomes following the surgical ligation of the patent ductus arteriosus in premature infants in Scotland. Archives of Disease in Childhood: Fetal and Neonatal Edition, 97(1), F39-F44. https://doi.org/10.1136/adc.2010.206052`,
        `Joseph, <del>K,., Liston RM,, R. M., Dodds, L,., Dahlgren, L,., & Allen AC., A. C.</del> <ins>K., Liston, R. M., Dodds, L., Dahlgren, L., & Allen, A. C.</ins> (2007). Socioeconomic status and perinatal outcomes in a setting with universal access to essential health care services. <ins>CMAJ: Canadian Medical Association Journal</ins>, 177(6), 583-590. https://doi.org/10.1503/cmaj.061198`,
        `March of Dimes. (2005). Prematurity: The answers can't come soon enough. <ins>http://www.marchofdimes.com/prematurity/15341_10734.asp</ins>`
      ],
      comments: [
        { label: "A12", note: "Please confirm the additions." },
        { label: "A13", note: "Please verify all added or changed authors." },
        { label: "A16", note: "This link appears to produce a page-not-found error. Please review and provide a current URL if available." }
      ]
    },
    {
      eyebrow: "Page 5 of 5 - Final APA consistency pass",
      heading: "References",
      variant: "references",
      body: [
        `Marlow, <del>N, et al.., Wolke, D., Bracewell, M. A., & Samara, M.</del> <ins>N., Wolke, D., Bracewell, M. A., & Samara, M.</ins> (2005). Neurologic and developmental disability at six years of age after extremely preterm birth. <del>N Engl J Med. 2005;</del><ins>New England Journal of Medicine</ins>, 352(1), 9-19. https://doi.org/10.1056/NEJMoa041367`,
        `Maypole, <del>J,., Trozzi, M,., & Augustyn, M.</del> <ins>J., Trozzi, M., & Augustyn, M.</ins> (2011). Prematurity and <del>Parental Expectationsparental expectations: Too Earlyearly and Now Too Muchnow too much</del><ins>parental expectations: Too early and now too much</ins>. Journal of Developmental & Behavioral Pediatrics, 32(4), 341-343. https://doi.org/10.1097/dbp.0b013e31821896dd`,
        `Phelan, <del>J,. C., Link, B,. G., & Tehranifar, P.</del> <ins>J. C., Link, B. G., & Tehranifar, P.</ins> (2010). Social conditions as fundamental causes of health inequalities: <del>theory</del><ins>Theory</ins>, evidence, and policy implications. <del>J Health Soc Behav.</del><ins>Journal of Health and Social Behavior</ins>, 51(1_suppl), S28-S40. https://doi.org/10.1177/0022146510383498`,
        `Williams, <del>S,., Whelan, A,., Weindling, A,. M., & Cooke, R. W.</del> <ins>S., Whelan, A., Weindling, A. M., & Cooke, R. W.</ins> (1993). Nursing staff requirements for neonatal intensive care. Archives of Disease in Childhood, 68(5 Spec No), 534-538. https://doi.org/10.1136/adc.68.5_spec_no.534`
      ],
      comments: [
        { label: "A17", note: "Please confirm the additional authors." },
        { label: "A18", note: "Please confirm these title and capitalization changes." },
        { label: "A26", note: "This URL was not found. Please review and provide another route for readers to locate the source." },
        { label: "A27", note: "Please confirm the DOI and other changes." }
      ]
    }
  ];
}

function createReferencePages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - Citation audit",
      heading: seed.documentTitle,
      body: [
        `${seed.thesis} The sample below shows a typical correction: <del>(Miller & Chen, 2023, p. 114.)</del> <ins>(Miller & Chen, 2023, p. 114)</ins>.`,
        `We matched every in-text citation, footnote, or parenthetical reference against the final list so no source is missing or duplicated.`
      ],
      comments: [
        { label: "Citation match", note: "Checked the source appears in both the text and final reference list." },
        { label: "Punctuation", note: "Removed punctuation that does not belong inside the citation." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Formatting rules",
      heading: "Style-specific corrections",
      body: [
        `${seed.method} The entry was revised from <del>${seed.reference.replace(/\./g, ",")}</del> <ins>${seed.reference}</ins>.`,
        `The final formatting applies the requested style consistently across capitalization, italics, punctuation, and ordering.`
      ],
      figure: "reference",
      comments: [
        { label: "Formatting", note: `Corrected ${seed.terms[0]}, ${seed.terms[1]}, and ${seed.terms[2]}.` },
        { label: "Consistency", note: "Applied the same rule across all repeated source types." }
      ]
    },
    {
      eyebrow: "Page 3 of 5 - Source list review",
      heading: "Reference list sample",
      body: [
        `The reference list was checked for completeness, alphabetization, and source-type consistency. <ins>${seed.reference}</ins>`,
        `Where source details were incomplete, the comment margin identifies what the author should verify before submission.`
      ],
      table: {
        headers: ["Issue", "Editorial action", "Status"],
        rows: [
          ["Missing DOI", "Added DOI where available", "Resolved"],
          ["Title case", "Converted to style rule", "Resolved"],
          ["Unmatched citation", "Flagged for author check", "Review"]
        ]
      },
      comments: [
        { label: "Author query", note: "Flagged one source for verification rather than guessing missing publication details." }
      ]
    },
    {
      eyebrow: "Page 4 of 5 - In-text consistency",
      heading: "Cross-checking citation callouts",
      body: [
        `In-text callouts were edited for consistency and readability. For example, <del>as it was said by the author in 2023</del> became <ins>Miller and Chen (2023) argue that revision quality depends on cognitive load</ins>.`,
        `This improves grammar while preserving the author's intended source support.`
      ],
      comments: [
        { label: "Signal phrase", note: "Integrated the citation into the sentence to improve flow." },
        { label: "Reference check", note: "Confirmed the cited author and year match the final entry." }
      ]
    },
    {
      eyebrow: "Page 5 of 5 - Final bibliography pass",
      heading: "Clean final references",
      body: [
        `${seed.result} The final page shows a clean, submission-ready style pass with consistent spacing and hanging-indent alignment.`,
        `Final check: ${seed.terms.join(", ")}.`
      ],
      comments: [
        { label: "Final pass", note: "Checked punctuation, italicization, ordering, spacing, and source completeness." }
      ]
    }
  ];
}

function createResumePages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - Executive profile",
      heading: seed.documentTitle,
      body: [
        `The profile was revised from <del>hardworking professional with many responsibilities</del> to <ins>Research analyst with eight years of experience translating complex data into board-level recommendations</ins>.`,
        seed.method
      ],
      figure: "resume",
      comments: [
        { label: "Positioning", note: "Replaced generic self-description with a focused professional value proposition." },
        { label: "Tone", note: "Made the summary confident without exaggeration." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Experience bullets",
      heading: "Selected professional experience",
      body: [
        `<ins>${seed.reference}</ins>`,
        `The original bullet, <del>was responsible for reports and helping team members</del>, became a stronger achievement with scope, action, and result.`
      ],
      comments: [
        { label: "Impact", note: "Added measurable outcome and leadership scope." },
        { label: "Grammar", note: "Changed passive responsibility wording into an active achievement." }
      ]
    },
    {
      eyebrow: "Page 3 of 5 - Skills and formatting",
      heading: "Skills, tools, and layout consistency",
      body: [
        `The skills section now uses consistent grouping: analytics, stakeholder communication, project leadership, and technical tools.`,
        `<del>Microsoft excel, Power bi, SQL database, communication skills</del> <ins>Excel, Power BI, SQL, stakeholder communication, dashboard automation</ins>`
      ],
      table: {
        headers: ["Section", "Editorial focus", "Result"],
        rows: [
          ["Dates", "Aligned style", "Consistent"],
          ["Bullets", "Verb-led phrasing", "Sharper"],
          ["Skills", "Grouped by relevance", "Scannable"]
        ]
      },
      comments: [
        { label: "Formatting", note: "Standardized capitalization and spacing across all entries." }
      ]
    },
    {
      eyebrow: "Page 4 of 5 - Academic and project details",
      heading: "Education and selected projects",
      body: [
        `Project descriptions were shortened to preserve white space and highlight relevance. <del>Completed a project about customer reports that was useful for leaders</del> <ins>Built customer-retention dashboards used in quarterly leadership reviews</ins>.`,
        `The edited CV keeps detail where it proves value and removes filler where it slows the reader.`
      ],
      comments: [
        { label: "Recruiter scan", note: "Kept the wording concise enough for fast review." },
        { label: "Professional polish", note: "Removed vague adjectives and strengthened the outcome." }
      ]
    },
    {
      eyebrow: "Page 5 of 5 - Final CV proofread",
      heading: "Final résumé presentation",
      body: [
        `${seed.result} The final pass checked punctuation, alignment, tense, role titles, and consistent date formatting.`,
        `The result is a clean, premium document that lets achievement and credibility carry the page.`
      ],
      comments: [
        { label: "Final pass", note: "Checked tense consistency, punctuation, bullet rhythm, and visual hierarchy." }
      ]
    }
  ];
}

function figureFor(key: WorkExampleKey): WorkExamplePage["figure"] {
  if (key === "biology") return "cell";
  if (key === "chemistry" || key === "pharmaceuticals") return "molecule";
  if (key === "electrical") return "circuit";
  if (key === "computing") return "code";
  if (key === "nursing" || key === "life-sciences") return "clinical";
  return "chart";
}

function expandPages(seed: ExampleSeed, pages: WorkExamplePage[]): WorkExamplePage[] {
  const densityParagraphs = [
    `The submitted draft also included a longer supporting paragraph that needed a careful line edit. The sentence <del>there are many things which are showing that this topic has importance</del> was revised to <ins>the evidence indicates that this topic has clear significance for ${seed.field.toLowerCase()}</ins>. This preserves the author's meaning while making the writing more direct.`,
    `During the proofread, we checked paragraph order, heading style, terminology, and punctuation. Repeated references to ${seed.terms[0]} and ${seed.terms[1]} were standardized so the document reads as one coherent piece rather than a set of disconnected notes.`,
    `A second pass focused on reader experience. Where the original text moved too quickly from background to interpretation, we added a clearer bridge and adjusted the sentence rhythm so the argument feels natural on the page.`
  ];

  const expanded = pages.map((page, index) => ({
    ...page,
    body: [
      ...page.body,
      densityParagraphs[index % densityParagraphs.length],
      `Editorial mark-up remains deliberately selective: <del>unnecessary repetition and informal emphasis</del> <ins>precise, discipline-appropriate wording</ins> is shown where the change helps the reader see the value of the edit.`
    ]
  }));

  expanded.push({
    eyebrow: `Page ${expanded.length + 1} of ${expanded.length + 1} - References and submission polish`,
    heading: seed.kind === "resume" ? "Final presentation and recruiter scan" : "References, formatting, and final proofread",
    body: [
      seed.kind === "reference"
        ? `The final page demonstrates a complete citation pass. Entries were checked for ordering, punctuation, missing publication details, and consistency with the requested style. <ins>${seed.reference}</ins>`
        : `The final page shows the closing quality-control pass for the submitted document. The editor checked headings, figure labels, terminology, spacing, and the relationship between the final claim and the evidence presented earlier.`,
      `A typical final correction changed <del>the above results proves that the work is successful</del> to <ins>the results support the central claim while leaving room for further verification</ins>. This is the type of quiet academic polish that makes a document feel credible.`,
      `Before delivery, the sample was reviewed for consistency across ${seed.terms.join(", ")}. The goal was not to overwrite the author's voice, but to make the writing cleaner, more accurate, and easier for an assessor, journal editor, employer, or client to trust.`,
      `The completed file would be returned with tracked changes visible, margin comments for decisions that require author review, and a clean version that can be used for submission.`
    ],
    table: {
      headers: ["Final check", "Editorial decision", "Outcome"],
      rows: [
        ["Terminology", "Standardized across pages", "Consistent"],
        ["Comments", "Kept only where useful", "Readable"],
        ["Submission polish", "Checked layout and tone", "Ready"]
      ]
    },
    comments: [
      { label: "Final proofread", note: "Checked the document as a whole, not only isolated sentences." },
      { label: "Author voice", note: "Kept the writer's argument intact while improving clarity and accuracy." }
    ]
  });

  return expanded.map((page, index) => ({
    ...page,
    eyebrow: page.eyebrow.replace(/Page \d+ of \d+/, `Page ${index + 1} of ${expanded.length}`)
  }));
}

export const workExamples: WorkExample[] = examples.map((example) => ({
  ...example,
  pages: example.key === "apa" ? createPages(example) : expandPages(example, createPages(example))
}));

export const workExamplesByKey = new Map(workExamples.map((example) => [example.key, example]));
