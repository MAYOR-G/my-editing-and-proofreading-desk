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
  variant?: "document" | "references" | "resume" | "engineering" | "science" | "legal" | "humanities";
  table?: { headers: string[]; rows: string[][] };
  figure?: "cell" | "molecule" | "circuit" | "code" | "resume" | "reference" | "chart" | "clinical" | "gel" | "reaction" | "legal";
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
    documentTitle: "A Space Mission to Test MOND and the Pioneer Anomaly",
    authorLine: "Research article sample",
    terms: ["MOND", "Pioneer Anomaly", "modified inertia", "radial trajectories"],
    thesis: "This article proposes a space-mission test of modified Newtonian dynamics as an explanation for the Pioneer Anomaly.",
    method: "The manuscript compares radial and azimuthal trajectories and proposes a twin-probe modification to a deep-space mission.",
    result: "The revised text clarifies the physical claim, corrects grammar and terminology, and flags scientific points requiring author confirmation.",
    reference: "Figure 1 describes suitable mission trajectories for the radial probe and the azimuthal twin."
  },
  {
    key: "biology",
    title: "Biology",
    shortTitle: "Biology",
    kind: "academic",
    field: "Life sciences",
    accent: "#1f8f5a",
    documentTitle: "Unravelling the Mysteries of Microbial Dark Matter",
    authorLine: "Biology manuscript sample",
    terms: ["microbial dark matter", "single-cell genomics", "metagenomics", "culture-independent methods"],
    thesis: "The manuscript reviews microbial dark matter, the difficulty of studying uncultivated microorganisms, and future research prospects.",
    method: "The edit standardizes scientific terminology, CSE author-year citations, headings, paragraph spacing, and reference formatting.",
    result: "The revised sample clarifies meaning, removes duplication, and flags statements and references requiring author confirmation.",
    reference: "The reference list was edited toward Taylor & Francis CSE author-year style."
  },
  {
    key: "chemistry",
    title: "Chemistry",
    shortTitle: "Chemistry",
    kind: "academic",
    field: "Chemistry manuscript",
    accent: "#0f766e",
    documentTitle: "Earth-Abundant Metal Catalysts",
    authorLine: "Chemistry lab report sample",
    terms: ["iron catalysts", "cobalt catalysts", "nickel catalysts", "IEEE references"],
    thesis: "The manuscript reviews earth-abundant metal catalysts for sustainable chemical reactions and energy applications.",
    method: "We standardized terminology, corrected catalyst names, improved section headings, and flagged IEEE citation requirements.",
    result: "The revised sample reads like a chemistry review article with field-specific terminology and source-aware comments.",
    reference: "IEEE references should be numbered in order of appearance."
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
    documentTitle: "John A. Doe CV",
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
    documentTitle: "False Claims Act Enforcement",
    authorLine: "Law essay sample",
    terms: ["False Claims Act", "qui tam", "APA legal style", "block quotations"],
    thesis: "The essay examines False Claims Act enforcement and implied false certification theory.",
    method: "We corrected legal terminology, introduced acronyms, adjusted quotations, and flagged citation details requiring author review.",
    result: "The final draft reads as a formal legal essay with clearer statutory and policy analysis.",
    reference: "False Claims Act citations were checked for APA and Bluebook-style legal formatting."
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
    documentTitle: "On Republic X, 595a-608b",
    authorLine: "Philosophy essay sample",
    terms: ["Plato", "Republic X", "imitation", "tragic poets"],
    thesis: "The essay analyzes Plato's argument about imitation in Republic X and its implications for poetry and truth.",
    method: "We clarified argument structure, corrected quotations and dashes, and flagged missing or unclear citations.",
    result: "The edited essay has a more controlled humanities argument and clearer engagement with the primary text.",
    reference: "Republic X references and missing footnotes were flagged for author review."
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
  if (seed.key === "astrophysics") return createAstrophysicsPages();
  if (seed.kind === "resume") return createResumePages(seed);
  if (seed.kind === "reference") return createReferencePages(seed);
  if (seed.key === "electrical") return createElectricalPages(seed);
  if (seed.key === "biology") return createBiologyPages(seed);
  if (seed.key === "chemistry") return createChemistryPages(seed);
  if (seed.key === "law") return createLawPages(seed);
  if (seed.key === "philosophy") return createPhilosophyPages(seed);
  if (seed.key === "economics") return createEconomicsPages(seed);
  if (seed.key === "marketing") return createMarketingPages(seed);
  if (seed.key === "nursing") return createNursingPages(seed);
  if (seed.key === "pharmaceuticals") return createPharmaceuticalsPages(seed);
  if (seed.key === "life-sciences") return createLifeSciencesPages(seed);
  if (seed.key === "computing") return createComputingPages(seed);
  if (seed.key === "political-science") return createPoliticalSciencePages(seed);
  if (seed.key === "psychology") return createPsychologyPages(seed);
  if (seed.key === "theology") return createTheologyPages(seed);

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

function createAstrophysicsPages(): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 7 - Abstract",
      heading: "A Space Mission to Test MOND and the Pioneer Anomaly",
      variant: "science",
      body: [
        `<ins>Abstract.</ins> In light of current efforts to understand the Pioneer Anomaly, <del>(Anderson et al., 1998, 2002a, 2002b, 2002c)</del> we offer a testable explanation involving <del>mModified Newtonian dDynamics</del><ins>modified Newtonian dynamics</ins> (MOND)<del>(Milgrom 1994)</del>.`,
        `We <del>are suggest</del><ins>suggest</ins> that radial trajectories, in otherwise unmodified gravitational potentials, introduce <del>as modified inertia responsible for dynamic anomalies dynamical</del><ins>modified inertia responsible for dynamical anomalies</ins>. As <del>eExamples</del><ins>examples</ins> of radially evolving systems, we examine the Pioneer Anomaly and the cosmological acceleration observed using Type Ia supernovae <del>(Riess et al., 1998; Perlmutter et al. 1999a, 1999b)</del>.`,
        `We find that MOND predicts observable effects, which current laboratory <del>searches forstudies of</del><ins>studies of</ins> modified inertia (i.e., the <del>sStrong eEquivalence pPrinciple) has not been sensitive todo not detect</del><ins>strong equivalence principle) do not detect</ins>.`,
        `We describe how the addition of a second <del>space -probe to the proposed Anderson et al. Pioneer Anomaly mission proposed by Anderson et al.</del><ins>space probe to the proposed Pioneer Anomaly mission</ins> would constrain the prevailing MOND models.`
      ],
      comments: [
        { label: "CP1", note: "The style guide of your target journal, JCP, does not allow citations in the abstract, so I have removed them." },
        { label: "CP2", note: "Please consider determining whether the mission has a name, rather than referring to it by the PI's name." }
      ]
    },
    {
      eyebrow: "Page 2 of 7 - Introduction",
      heading: "Introduction",
      variant: "science",
      body: [
        `<ins>Introduction</ins> Anderson et al. (1998, 2002a) <del>finds</del><ins>have found</ins> that the Pioneer 10, Pioneer 11, Galileo, and Ulysses deep-space probes shared an anomalous, constant acceleration of magnitude |a| = (8.74 +/- 1.33) x 10^-8 cm/s/s, directed radially <del>towards</del><ins>toward</ins> the Sun.`,
        `This <del>Pioneer Anomaly</del><ins>"Pioneer Anomaly"</ins> is apparently not <del>because of</del><ins>due to</ins> mission systematics (Anderson et al., 2002b; Murphy et al., 1999; Katz et al., 1999; Anderson et al., 1999a, 1999b) and may require new physics in order to be accurately <ins>modeled</ins>.`,
        `We consider an intriguing explanation involving new physics: <del>the - mModified Newtonian dDynamics</del><ins>modified Newtonian dynamics</ins> (MOND), <del>due to</del><ins>developed by</ins> Milgrom (1983, 1986, 1989; Bekenstein & Milgrom, 1984).`,
        `We will employ the MOND formalisms of modified inertia <del>so thatthat</del><ins>so that</ins> the dynamical bodies move in trajectory-dependent effective potentials. MOND is parameterized by a characteristic acceleration, a0 ~ 10^-8 cm/s/s, which is usually small compared to the expected Newtonian acceleration, aN.`,
        `The <del>mMagnitude</del><ins>magnitude</ins> of the MOND contributions <del>too observable dynamics are</del><ins>to observable dynamics is</ins> given by the heuristic function mu(a/a0), <del>for whichwhere</del><ins>where</ins> mu ~= 1 when a/a0 >> 1 and mu ~= a/a0 when a/a0 <= 1.`
      ],
      comments: [
        { label: "CP2", note: "Please consider whether the named mission should be identified by its formal title." }
      ]
    },
    {
      eyebrow: "Page 3 of 7 - Radial trajectories",
      heading: "Introduction continued",
      variant: "science",
      body: [
        `In this paper, we seek <del>, to discover a dynamical dependence in: the vector direction of a trajectory;:</del><ins>to identify a dynamical dependence on the vector direction of a trajectory:</ins> we suggest an explanation for the Pioneer Anomaly involving MOND effects on radial trajectories (i.e., v dot a ~= 1).`,
        `<del>Already Anderson et al. (2002c) have previouslys described</del><ins>Anderson et al. (2002c) have already described</ins> a deep-space probe mission capable <del>for sensitively figuring out,of detecting</del><ins>of detecting</ins> the magnitude of the Pioneer Anomaly with high sensitivity.`,
        `However, since the cause <del>, of the aAnomaly</del><ins>of the anomaly</ins> is unknown, this mission <del>has ais purely empirical in nature</del><ins>is purely empirical</ins>.`,
        `Here, we describe (1) an explanation for the Pioneer Anomaly <del>involving using</del><ins>using</ins> MOND and (2) an easy addition <del>of to</del><ins>to</ins> the Anderson et al. mission to test our MOND hypothesis.`
      ],
      comments: [
        { label: "CP2", note: "If this mission has a formal title, use it consistently rather than repeating the investigators' names." }
      ]
    },
    {
      eyebrow: "Page 4 of 7 - Equivalence principle",
      heading: "The Equivalence Principle",
      variant: "science",
      body: [
        `<ins>The Equivalence Principle</ins> The <del>sStrong eEquivalence pPrinciple</del><ins>strong equivalence principle</ins> (SEP) says that the gravitational mass, mg, and the inertial mass, mi, of a body are <del>-</del> identical.`,
        `Experiments to verify the SEP typically quantify the <del>eta = Delta a/a Eootvoos parameter, eta = Delta a/a,</del><ins>Eotvos parameter, eta = Delta a/a,</ins> between the attractive and dynamical accelerations.`,
        `<del>Su et al. (1994) and Smith et al. (2000) have observed Laboratorylaboratory-scale masses have been observed</del><ins>Laboratory-scale masses have been observed</ins> (Su et al., 1994; Smith et al., 2000) to <del>havofe</del><ins>have</ins> eta < 10^-13.`,
        `<del>the iInteractions about of</del><ins>Interactions of</ins> self-gravitating bodies <del>determine are</del><ins>present</ins> a special problem (Anderson et al., 1996), and <del>having a it'sthe current observational limit is of</del><ins>the current observational limit is</ins> eta < 10^-4 (Milani et al., 2002), although the Earth-Moon system has eta < 10^-13 (Anderson & Williams, 2001).`,
        `Current experimental designs <del>to that aretesttest</del><ins>that test</ins> the SEP do not consider trajectory dependence. <del>By performing aA literature review revealed, we found that experiments and, iI factedthe and foundexamineinvolve predominantly involved</del><ins>A literature review revealed that experiments predominantly involve</ins> azimuthal trajectories.`
      ],
      comments: [
        { label: "CP3", note: "When a theory, model, or procedure is named after two or more individuals, their names are conventionally joined using an en dash." },
        { label: "CP4", note: "Edits to this sentence may have changed your intended meaning; please review before accepting changes." }
      ]
    },
    {
      eyebrow: "Page 5 of 7 - Laboratory limits",
      heading: "The Equivalence Principle continued",
      variant: "science",
      body: [
        `For example, the experiments of Su et al. (1994) <del>SEP experiments test ed</del><ins>tested</ins> horizontal accelerations in a terrestrial laboratory. The <del>sensitivitye limit ofn eta wais measured</del><ins>sensitivity limit of eta was measured</ins> for accelerations toward the Sun using masses orbiting with the Earth on azimuthal trajectories.`,
        `Measurements of the SEP <del>in of the a</del><ins>in</ins> self-gravitating objects, <del>like such as a</del><ins>such as</ins> planets (Anderson et al., 1998, 1996; Milani et al., 2002; Anderson & Williams, 2001) and <del>the</del> neutron stars (Darmour & Schaefer, 1991), <del>is</del><ins>are</ins> also limited to <del>azimuthal orbital trajectories azimuthal orbital</del><ins>azimuthal orbital trajectories</ins>.`,
        `Radial <del>-trajectory</del><ins>trajectory</ins> experiments (Kuroda & Mio, 1989; Dittus & Mehls, 2001; Reasenberg & Phillips, 2001) present <del>the a</del><ins>a</ins> greater experimental challenge (Blaser, 2001).`,
        `<del>that has These measurements have yielded</del><ins>These measurements have yielded</ins> a less sensitive upper limit, eta <= 10^-7. <del>They cBased on these results, we would not expectsexpect</del><ins>Based on these results, we would not expect</ins> the Pioneer Anomaly <del>would to be detectable in this these</del><ins>to be detectable in these</ins> laboratory experiments.`
      ],
      comments: [
        { label: "CP3", note: "Use en dashes for equivalent compound relationships, such as Earth-Moon and radial-trajectory when styled as a compound modifier." },
        { label: "CP4", note: "Please review the revised sentence about radial-trajectory experiments and laboratory sensitivity." }
      ]
    },
    {
      eyebrow: "Page 6 of 7 - MOND",
      heading: "MOND",
      variant: "science",
      body: [
        `<ins>MOND</ins> <del>In To trying</del><ins>In trying</ins> to modify the inertia, we <del>don't</del><ins>do not</ins> want to alter the Newtonian kinetic <del>action energy:</del><ins>action</ins> such that radial trajectory dependence is introduced while Newtonian dynamics are still recovered in the limit a0 -> 0.`,
        `This is accomplished <del>most simply</del><ins>most simply</ins> with an action equation of the form: The additional factor, M, vanishes for any near-circular orbit <del>of azimuthal trajectory</del><ins>or azimuthal trajectory</ins> v dot a ~= 0, such as those of the planets.`,
        `Indeed, Anderson et al. (1998) <del>are have calculated</del><ins>have calculated</ins> that any universally <del>eaffective</del><ins>effective</ins> property of the gravitational force capable of producing the Pioneer deceleration would already <del>be have been sobservedobserved</del><ins>have been observed</ins> in the orbital motions of the planets.`,
        `<del>(AlsoIn addition,</del><ins>In addition,</ins> this form of M <del>doesn't does not produces effects for on</del><ins>does not produce effects on</ins> the orbits of stars in galaxies or of galaxies in clusters, as was the original intention of MOND. <del>These effects This could</del><ins>These effects could</ins> be included in a more complicated form of M, but we consider these "dark matter" issues (Castillo-Morales & Schindler, 2003) to be a separate problem <del>not of interest hereoutside the scope of this work</del><ins>outside the scope of this work</ins>.`,
        `Our modified action equation predicts MOND effects for <del>all{\\em all}</del><ins>all</ins> radial trajectories. For large accelerations, a/a0 >> 1, mu ~= 1, and M is proportional to a0/a. For the Pioneer Anomaly, we expect M ~ 10^-6, as has been observed.`
      ],
      comments: [
        { label: "CP5", note: "Edits to this sentence may have changed your intended meaning; please review before accepting changes." },
        { label: "CP6", note: "Please consider whether 'sophisticated' might be a better word choice here." }
      ]
    },
    {
      eyebrow: "Page 7 of 7 - Experiment and conclusion",
      heading: "The Experiment and Conclusion",
      variant: "science",
      body: [
        `Furthermore, the anomalous Pioneer acceleration, ap, is constant, meaning eta_p is proportional to r^2, as expected <del>from for thean</del><ins>for an</ins> M with a constant a0 and a = GM/r^2. For small accelerations, a/a0 <= 1, mu ~= a/a0, and M ~= 1.`,
        `<del>You This effect can also use this to explain</del><ins>This effect can also explain</ins> the anomalously faint, high-redshift Type Ia supernovae (SNIa) observed by Riess et al. (1998) and Perlmutter et al. (1999a, 1999b) <del>is due toas</del><ins>as</ins> small-acceleration MOND effects on the radial trajectories of the cosmological expansion.`,
        `<del>the Table 1 summarizes</del><ins>Table 1 summarizes</ins> the MOND regime of various known experimentally determined accelerations. <del>Of the interest here are- the The final three entries rows</del><ins>Of interest here are the final three rows</ins>, which comprise our knowledge of the radial trajectories. The rightmost column lists the value of a0/a, which is the detection threshold of M in the strong acceleration limit.`,
        `Anderson et al. <del>say have suggested</del><ins>have suggested</ins> that detecting the Pioneer Anomaly <del>requiresd</del><ins>requires</ins> acceleration measurements accurate to at least one part in 10^6, consistent with our predicted MOND contribution. Furthermore, we may predict that radial-trajectory SEP experiments in terrestrial laboratories will detect MOND effects when the <del>accuracyies reaches</del><ins>accuracy reaches</ins> one part in 10^12.`,
        `<ins>The Experiment.</ins> Anderson et al. (2002c) <del>haves proposed the an</del><ins>have proposed an</ins> experiment to further characterize the Pioneer Anomaly. Since the proposed mission uses a radial trajectory, we <del>offer suggest</del><ins>suggest</ins> a modification to test our MOND hypothesis: <del>uUse a twin spacecraftspacecrafts in the a</del><ins>use twin spacecraft in a</ins> near-circular orbit.`,
        `Placing <del>a twinone space probe</del><ins>one space probe</ins> on an azimuthal trajectory should demonstrate the radial dependence of the MOND interpretation of the Pioneer and SNIa anomalies. As originally planned, <del>tThe</del><ins>the</ins> radial mission would probe the known anomaly with high sensitivity, while our azimuthal mission should return a null result.`,
        `Since the Pioneer Anomaly is best observed beyond ~20 AU, we suggest that the two missions share radial trajectories out to the orbit of Neptune (30 AU), at which point the azimuthal mission can be gravitationally deflected by Neptune into a bound, low-eccentricity orbit. Figure 1. Suitable mission trajectories for (a) the Anderson et al. probe and (b) the azimuthal twin. The planetary positions are correct for June 2003.`,
        `After <del>a deflectionsng</del><ins>deflection</ins> from Neptune, the predicted disappearance of the anomaly in the azimuthal probe would <del>providesprovide significant evidences</del><ins>provide significant evidence</ins> against the interpretation of the anomaly as an onboard systematic effect.`,
        `<ins>Conclusion.</ins> We find that <del>the radial -trajectory phenomenasphenomena are</del><ins>radial-trajectory phenomena are</ins> subject to deviations from Newtonian dynamics due to MOND-modified inertia. Currently, this anomaly is best suited <del>for to observation in the a space-borne experiments</del><ins>to observation in space-borne experiments</ins>. We propose <del>testing s to test,</del><ins>testing</ins> MOND effects in the vicinity of our Sun using the space flight described by Anderson et al. with the addition of a twin probe deflected into a closed orbit at Neptune.`
      ],
      comments: [
        { label: "CP5", note: "Please review the revisions to the MOND explanation and confirm that the equations still express your intended model." },
        { label: "CP7", note: "Please confirm that this number is consistent with Table 1." }
      ]
    }
  ];
}

function createElectricalPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - Design brief and specifications",
      heading: "Low-Noise Amplifier Design for Sensor Interfaces",
      variant: "engineering",
      body: [
        `1. Design objective. The circuit conditions a 12 mVpp capacitive-sensor signal before digitisation by a 12-bit ADC. The draft stated that the amplifier <del>will remove all noise from the system</del> <ins>is designed to improve the signal-to-noise ratio within the 0.5-10 kHz measurement band</ins>.`,
        `Target specification: closed-loop gain A_v = 21 V/V, input-referred noise below 18 nV/sqrt(Hz), and output swing within 0.2-3.1 V from a 3.3 V supply. The report now defines V_in, V_out, f_c, and SNR before using them in the analysis.`
      ],
      table: {
        headers: ["Parameter", "Original label", "Edited specification"],
        rows: [
          ["Supply voltage", "3.3", "3.3 V"],
          ["Bandwidth", "10", "0.5-10 kHz passband"],
          ["Feedback resistor", "R feedback", "R_f = 20 kOhm"],
          ["Noise density", "low", "< 18 nV/sqrt(Hz) input referred"]
        ]
      },
      comments: [
        { label: "EE1", note: "Qualified the claim: an amplifier improves SNR but does not remove all noise." },
        { label: "EE2", note: "Added units and symbols so the design targets are technically checkable." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Circuit analysis",
      heading: "2. Feedback Network and Transfer Function",
      variant: "engineering",
      body: [
        `The non-inverting topology was retained, but the explanation was tightened: <del>the resistors make the output bigger because they feedback the signal</del> <ins>R_f and R_g set the closed-loop gain according to A_v = 1 + R_f/R_g</ins>. With R_f = 20 kOhm and R_g = 1 kOhm, the expected gain is 21 V/V.`,
        `The corrected derivation now separates DC biasing from AC coupling. C_in and R_bias form a high-pass pole, while C_f limits high-frequency gain to reduce wideband noise. Figure 1 shows the edited schematic labels.`
      ],
      figure: "circuit",
      comments: [
        { label: "EE3", note: "Replaced informal causal wording with the correct closed-loop gain relationship." },
        { label: "EE4", note: "Separated coupling, biasing, and feedback functions to avoid conflating component roles." }
      ]
    },
    {
      eyebrow: "Page 3 of 5 - Results and captions",
      heading: "3. Simulation Results",
      variant: "engineering",
      body: [
        `The AC sweep indicates a mid-band gain of 26.4 dB and a -3 dB corner at 10.8 kHz. The original caption read <del>Graph of frequency shows that it works</del> <ins>Figure 2. Simulated frequency response of the non-inverting amplifier, showing 26.4 dB mid-band gain and a 10.8 kHz upper cutoff</ins>.`,
        `The results paragraph now reports measured values before interpretation. This avoids implying validation before the breadboard measurements are introduced.`
      ],
      table: {
        headers: ["Test", "Simulated", "Measured", "Editorial note"],
        rows: [
          ["Mid-band gain", "26.4 dB", "26.1 dB", "Consistent within tolerance"],
          ["Upper cutoff", "10.8 kHz", "10.2 kHz", "Use kHz, not KHz"],
          ["Output noise", "1.7 mVrms", "1.9 mVrms", "Define bandwidth"],
          ["Phase margin", "61 deg", "Not measured", "Do not overclaim"]
        ]
      },
      comments: [
        { label: "EE5", note: "Turned a vague caption into a self-contained engineering figure caption." },
        { label: "EE6", note: "Corrected capitalization and unit style: kHz, mVrms, dB." }
      ]
    }
  ];
}

function createBiologyPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 8 - Abstract and introduction",
      heading: "Unravelling the Mysteries of Microbial Dark Matter: Challenges and Prospects for Future Research",
      variant: "science",
      body: [
        `<ins>Abstract</ins> Microbial dark matter represents<del>, the vast majority of microorganisms that remainare still today uncultivated and uncharacterizeduncharacterised.</del><ins> the multitude of microorganisms that remain uncultivated and uncharacterised.</ins>`,
        `It represents a <del>very significant</del><ins>significant</ins> portion of the Earth's biodiversity, and its <ins>members</ins> play crucial roles in biogeochemical processes, nutrient cycling, and ecosystem functioning.`,
        `Despite <del>their importanceit's being really important</del><ins>their importance</ins>, studying <del>the dark microbial dark matter members facesgives</del><ins>members of microbial dark matter faces</ins> numerous challenges, including <del>difficultieshardships</del><ins>difficulties</ins> in cultivation and the limitations of traditional culture-dependent methods.`,
        `This <del>articlepaper providesshows</del><ins>article provides</ins> an overview of the current <del>state- of- knowledge</del><ins>state of knowledge</ins> on microbial dark matter and highlights the challenges and <del>prospectives for the future research</del><ins>prospects for future research</ins>.`,
        `It emphasises the potential applications of new <del>approachestechniques, such aslike single- cell genomics, meta genomics, and other culture-independent methodsapproaches</del><ins>techniques, such as single-cell genomics, metagenomics, and other culture-independent approaches</ins>, in unravelling the mysteries of microbial dark matter and <del>itsthere</del><ins>their</ins> implications for biotechnology, medicine, and environmental <del>remeditation</del><ins>remediation</ins>.`,
        `<ins>Introduction</ins> Microorganisms <del>compriseform</del><ins>comprise</ins> a significant proportion of the Earth's biodiversity and are involved in <del>various and diverse</del><ins>diverse</ins> biological processes, including nutrient <del>cyclings</del><ins>cycling</ins>, biogeochemical transformations, and symbiotic interactions with <del>manya lot of</del><ins>many</ins> other organisms (Falkowski et al. 2008).`,
        `Despite their <del>importancevalue</del><ins>importance</ins>, most microorganisms have not been cultivated or <del>characterized characterised</del><ins>characterised</ins> in the laboratory. This <del>un-cultivated and un-characterized characterised potion</del><ins>uncultivated and uncharacterised portion</ins> of microbial life, often <del>termednamed</del><ins>termed</ins> microbial dark matter, poses significant challenges for researchers seeking to understand the full extent of microbial diversity and <del>itsthere</del><ins>their</ins> ecological roles (Rappe and Giovannoni 2003).`
      ],
      comments: [
        { label: "CP1", note: "I have made the title boldface and 16 pt Times New Roman font to distinguish it from the text below. Please ensure its formatting aligns with your target journal's guidelines before submission." },
        { label: "CP2", note: "I have standardised the headings to boldface and 14 pt Times New Roman font with a 6 pt space above to distinguish them from the main text." },
        { label: "CP3", note: "I have standardised the main text to 12 pt Times New Roman font, single line spaced, left-aligned, with 6 pt spacing between paragraphs." },
        { label: "CP4", note: "I do not believe that this statement reflects your intended meaning. Please check whether microbial dark matter represents the multitude of microorganisms that remain uncultivated and uncharacterised." },
        { label: "CP5", note: "Since microbial dark matter refers to a large collection of microorganisms rather than a single entity, I changed references to its functions and roles to refer to those of its members." },
        { label: "CP7", note: "As requested in the order notes, the in-text citations have been edited to align with the CSE author-year format used by Taylor & Francis." }
      ]
    },
    {
      eyebrow: "Page 2 of 8 - Study challenges",
      heading: "The challenges of studying microbial dark matter",
      variant: "science",
      body: [
        `The study of microbial dark matter is hindered by several challenges, <del>primarily due to chiefly stemming from the difficultiesy</del><ins>primarily stemming from the difficulty</ins> in cultivating these microorganisms under laboratory conditions.`,
        `Traditional culture-dependent methods <del>relys</del><ins>rely</ins> on the isolation and growth of microorganisms in pure culture, <del>whichthat</del><ins>which</ins> often fails to replicate the complex environmental conditions and interspecies interactions found in their natural habitats (Staley and Konopka 1985).`,
        `As a <del>cConsequentlyce</del><ins>consequence</ins>, many microorganisms <del>can not</del><ins>cannot</ins> grow under these conditions, <del>leading to a significant underestimation of microbial diversity and their ecological roles</del><ins>making it challenging to explore their diversity and ecological roles</ins>.`,
        `Additionally, <del>thean uncultured</del><ins>the uncultured</ins> nature of microbial dark matter complicates <del>studiying its members'their</del><ins>studying its members'</ins> physiology, metabolism, and genetic potential.`,
        `Traditional approaches <del>such as- e.g. genome sequencing and gene expression analysis, oftentimes rely</del><ins>, such as genome sequencing and gene expression analysis, often rely</ins> on the availability of cultured organisms or their DNA.`,
        `The lack of cultured representatives of microbial dark matter <del>isgives</del><ins>is</ins> a significant barrier to understanding their functional capabilities and potential contributions to biogeochemical processes and nutrient cycling (Rinke et al. 2013).`
      ],
      comments: [
        { label: "CP6", note: "I don't believe these are separate issues. Do you mean difficulties in cultivation due to the limitations of traditional culture-dependent methods?" },
        { label: "CP8", note: "It would be helpful to clarify why they have not been cultivated or characterised in the laboratory." },
        { label: "CP9", note: "This statement may not reflect your intended meaning. Please check whether you mean that unculturability makes diversity and ecological roles difficult to explore." }
      ]
    },
    {
      eyebrow: "Page 3 of 8 - Emerging techniques",
      heading: "Emerging techniques for studying microbial dark matter",
      variant: "science",
      body: [
        `<del>Emerging Ttechniques for Sstudying Mmicrobial Ddark Mmatter</del><ins>Emerging techniques for studying microbial dark matter</ins>`,
        `<del>In recent years, sSeveral novel approachestechniques haves been developed in recent years</del><ins>Several novel techniques have been developed in recent years</ins> to <del>overcomecircumvent the challenges inassociated with cultivating, and characterising,</del><ins>circumvent the challenges associated with cultivating and characterising</ins> microbial dark matter members.`,
        `These culture-independent approaches have provided valuable insights into <del>uncultivated microorganisms'ˈs</del><ins>uncultivated microorganisms'</ins> genetic and functional diversity and their roles in various ecosystems.`,
        `One such approach is <del>Ssingle-Ccell</del><ins>single-cell</ins> genomics, which involves isolating, amplifying, and sequencing the DNA <del>offrom the individual cells</del><ins>from individual cells</ins>.`,
        `This <del>approachtechnique</del><ins>technique</ins> has allowed researchers to obtain genomic information from uncultivated microorganisms, providing insights into their metabolic capabilities and evolutionary relationships (Lasken and McLean 2014).`,
        `For example, single-cell genomics has been used to <del>characterize characterise previously un-known lineages of archaea and bacteria lineages, reveailing</del><ins>characterise previously unknown lineages of archaea and bacteria, revealing</ins> novel metabolic pathways and <del>increasingexpanding</del><ins>expanding</ins> our understanding of microbial diversity (Rinke et al. 2013).`,
        `<del>For example, single-cell genomics has been used to characterize previously un-known lineages of archaea and bacteria, reviling novel metabolic pathway and expanding our understanding of microbial diversity (Rinke, Schwientek, Sczyrba, Ivanova, Anderson, Cheng,... & Woyke T., 2013).</del>`
      ],
      comments: [
        { label: "CP10", note: "I have made this heading sentence case to align with the other headings. Please check your target journal's heading style." },
        { label: "CP11", note: "This text duplicated the previous sentence, so I have removed it." }
      ]
    },
    {
      eyebrow: "Page 4 of 8 - Metagenomics",
      heading: "Culture-independent methods",
      variant: "science",
      body: [
        `Another promising approach is <del>Mmetagenomics</del><ins>metagenomics</ins>, which involves the <del>directly extractingon and sequencing of</del><ins>direct extraction and sequencing of</ins> DNA from environmental samples.`,
        `Metagenomics allows researchers to study the collective genomes of microbial communities, providing insights into the functional capabilities and interactions of uncultivated microorganisms within <del>theiry're</del><ins>their</ins> native habitats (Handelsman 2004).`,
        `Through metagenomic studies, researchers have discovered new enzymes, antibiotic-resistance genes, and biogeochemical processes <del>performedcarried out</del><ins>carried out</ins> by previously unknown members of microbial communities (Tyson et al. 2004; Tringe et al. 2005).`,
        `<del>Meta-transcriptomics and meta-proteomics are othermore culture-independent approaches</del><ins>Metatranscriptomics and metaproteomics are additional culture-independent approaches</ins> that can provide insights into uncultivated microorganisms' functional activities and gene expression profiles <del>ian</del><ins>in</ins> their natural environments (Wilmes and Bond 2004; Urich et al. 2008).`,
        `These <del>approachestechniques</del><ins>techniques</ins> enable researchers to study microbial communities' transcriptional and translational responses to various environmental stimuli, providing valuable information on <del>their ecological roles and adaptive strategies of microbial d</del><ins>their ecological roles and adaptive strategies</ins>.`
      ],
      comments: [
        { label: "CP7", note: "In-text citations have been edited to CSE author-year style." },
        { label: "CP5", note: "References to microbial dark matter have been revised to refer to its members where needed." }
      ]
    },
    {
      eyebrow: "Page 5 of 8 - Future research",
      heading: "Prospects for future research",
      variant: "science",
      body: [
        `Future research on <del>dark microbial dark matter mustneeds</del><ins>microbial dark matter needs</ins> to address the challenges posed by the cultivation and <del>characterization characterisation</del><ins>characterisation</ins> of these elusive microorganisms.`,
        `Advances in single-cell genomics, <del>meta-genomics</del><ins>metagenomics</ins>, and other culture-independent approaches will continue to <del>provideshow</del><ins>provide</ins> valuable insights into <del>microbial dark matter members' the genetic and functional diversity, of microbial dark matter</del><ins>the genetic and functional diversity of microbial dark matter members</ins> and their ecological roles and interactions with other organisms.`,
        `<del>HoweverBut,</del><ins>However,</ins> it is important to <del>recognizerecognise,</del><ins>recognise</ins> that these approaches only provide a snapshot of the microbial world and do not fully capture the <del>full spectrum</del><ins>spectrum</ins> of microbial diversity and functionality.`,
        `Efforts should be made to develop innovative cultivation <del>approachestechniques</del><ins>techniques</ins> that more closely mimic the environmental conditions and interspecies interactions found in natural habitats, enabling the growth and <del>characterization characterisation</del><ins>characterisation</ins> of previously <del>uncultivatableed</del><ins>uncultivatable</ins> microorganisms (Kaeberlein et al. 2002; Zengler et al. 2002).`,
        `Such <del>approachestechniques mightmay</del><ins>techniques may</ins> include using microfluidic devices, diffusion chambers, and high-throughput cultivation platforms that facilitate the isolation and growth of novel and possibly unique microorganisms under controlled conditions.`
      ],
      comments: [
        { label: "CP12", note: "This publication year was incomplete. I believe it should be 2002 based on the reference list. Please check that this change is correct." },
        { label: "CP13", note: "This publication year did not match the reference list. I changed it to 2002 to match the provided reference." }
      ]
    },
    {
      eyebrow: "Page 6 of 8 - Applications and conclusion",
      heading: "Conclusions",
      variant: "science",
      body: [
        `Furthermore, interdisciplinary <del>researches involving</del><ins>research involving</ins> microbial ecology, physiology, genomics, and bioinformatics will be crucial in unravelling the mysteries of microbial dark matter and <del>itstheir</del><ins>their</ins> implications for biotechnology, medicine, and environmental remediation.`,
        `For example, the discovery of novel metabolic pathways, enzymes, and bioactive compounds from uncultivated microorganisms <del>mightmay</del><ins>may</ins> lead to new biotechnological applications, such as biofuel production, pollutant <del>bioremediatation of pollutants</del><ins>bioremediation</ins>, and <del>the discovery of novel antibiotic discoverys</del><ins>novel antibiotic discovery</ins> (Daniel 2004; Fenical and Jensen 2006).`,
        `<del>In conclusions</del><ins>In conclusion</ins>, microbial dark matter represents a significant portion of the <del>Earths' Earth’s</del><ins>Earth's</ins> biodiversity, and its members <del>plays</del><ins>play</ins> crucial roles in biogeochemical processes, nutrient cycling, and ecosystem functioning.`,
        `Despite the challenges <del>inassociated with</del><ins>associated with</ins> cultivating and <del>characterizing characterising</del><ins>characterising</ins> these microorganisms, recent advances in single-cell genomics, metagenomics, and other culture-independent approaches have provided valuable insights into <del>microbial dark matter's matter members' genetical</del><ins>microbial dark matter members' genetic</ins> and functional diversity.`,
        `Future research should address these challenges <del>in posed by these studying of</del><ins>posed by studying</ins> microbial dark matter <del>andplus itstheir</del><ins>and their</ins> potential implications for biotechnology, medicine, and environmental remediation.`
      ],
      comments: [
        { label: "CP14", note: "This author name did not match the reference list. I changed it to match the reference below. Please check that the author's name is correct." }
      ]
    },
    {
      eyebrow: "Page 7 of 8 - References",
      heading: "References",
      variant: "science",
      body: [
        `<ins>References</ins> Daniel R. 2004. The metagenomics of soil. <del>Nature Reviews Microbiol.ogy, 2(6):, (2004), 470-478.</del><ins>Nature Reviews Microbiology. 2(6):470-478.</ins>`,
        `Falkowski PG, Fenchel T, Delong EF. 2008. The microbial engines that drive <del>Earth's Earth’s</del><ins>Earth's</ins> biogeochemical cycles. <del>Science,. 320(5879):, 1034-1039.</del><ins>Science. 320(5879):1034-1039.</ins>`,
        `Fenical W, Jensen PR. 2006. Developing a new resource for drug discovery: marine actinomycete bacteria. <del>, Nature Chemical Biology,. 2(12):, 666-673.</del><ins>Nature Chemical Biology. 2(12):666-673.</ins>`,
        `Handelsman J. 2004. Metagenomics: application of genomics to uncultured microorganisms. <del>Microbiology and Molecular Biology Rev.iews, 68(4):, 669-685.</del><ins>Microbiology and Molecular Biology Reviews. 68(4):669-685.</ins>`,
        `Kaeberlein T, Lewis K, Epstein SS. 2002. Isolating <del>"uncultivable"</del><ins>"uncultivable"</ins> microorganisms in pure culture in a simulated natural environment. <ins>Science. 296(5570):1127-1129.</ins>`,
        `Lasken RS, McLean JS. 2014. Recent advances in genomic DNA sequencing of microbial species from single cells. <ins>Nat Rev Genet. 15(9):577-584.</ins>`,
        `Rappe MS, Giovannoni SJ. 2003. The uncultured microbial majority. <del>Annual Review of Microbiology,. 57:, 369-394.</del><ins>Annual Review of Microbiology. 57:369-394.</ins>`,
        `Rinke C, Schwientek P, Sczyrba A, Ivanova NN, Anderson IJ, Cheng JF, <del>... & Woyke T.</del><ins>et al.</ins> 2013. <del>Insights Iinto Tthe Pphylogeny Aand Ccoding Ppotential Oof Mmicrobial Ddark Mmatter.</del><ins>Insights into the phylogeny and coding potential of microbial dark matter.</ins> Nature. 499(7459):431-437.`
      ],
      comments: [
        { label: "CP15", note: "As requested in the order notes, the reference list has been edited to align with the CSE author-year format used by Taylor & Francis." },
        { label: "CP16", note: "This reference is missing a parenthetical issue number. Should it have one?" },
        { label: "CP17", note: "This author list is incomplete. CSE style provides the first ten authors followed by et al.; please make this change before submission." }
      ]
    },
    {
      eyebrow: "Page 8 of 8 - References continued",
      heading: "References continued",
      variant: "science",
      body: [
        `Staley JT, Konopka A. 1985. Measurement of in situ activities of nonphotosynthetic microorganisms in aquatic and terrestrial habitats. <del>Ann Rev Microbiol.ANNUAL REVIEW OF MICROBIOLOGY, 39:, 321-346.</del><ins>Annual Review of Microbiology. 39:321-346.</ins>`,
        `Tringe SG, Von Mering C, Kobayashi A, Salamov AA, Chen K, Chang HW, <del>... & Rubin, E. M.</del><ins>et al.</ins> 2005. Comparative metagenomics of microbial communities. <ins>Science. 308(5721):554-557.</ins>`,
        `Turkheimer E. 2000. Three laws of behavior genetics and what they mean. <del>Current Dir Psychol Sci.directions in psychological science, 9 (5):, 160-164.</del><ins>Current Directions in Psychological Science. 9(5):160-164.</ins>`,
        `Tyson GW, Chapman J, Hugenholtz P, Allen EE, Ram RJ, Richardson PM, <del>... & Banfield, J. F.</del><ins>et al.</ins> 2004. Community structure and metabolism through reconstruction of microbial genomes from the environment. <ins>Nature. 428(6978):37-43.</ins>`,
        `Urich T, Lanzen A, Qi J, Huson DH, Schleper C, Schuster SC. 2008. <del>Simultaneous Aassessment of Ssoil microbial Ccommunity structure and Ffunction through analysis of the meta-transcriptome.</del><ins>Simultaneous assessment of soil microbial community structure and function through analysis of the metatranscriptome.</ins> PLoS One. 3(6):e2527.`,
        `Wilmes P, Bond PL. 2004. The application of two-dimensional polyacrylamide gel electrophoresis and downstream analyses to a mixed community of prokaryotic microorganisms. <ins>Environmental Microbiology. 6(9):911-920.</ins>`,
        `Zengler K, Toledo G, Rappe M, Elkins J, Mathur EJ, Short JM, Keller M. 2002. Cultivating the uncultured. <del>Proceedings of the Natlional Academy of Sci U S A.ences, 99(24):, 15681-15686.</del><ins>Proceedings of the National Academy of Sciences USA. 99(24):15681-15686.</ins>`
      ],
      comments: [
        { label: "CP18", note: "This reference is missing a parenthetical issue number. Should it have one?" },
        { label: "CP19", note: "This author list is incomplete. Please provide the first ten authors followed by et al. before submission." },
        { label: "CP20", note: "This reference was not cited in the text. Should it have been? If not, please remove it from the reference list." },
        { label: "CP21", note: "This author list is incomplete. Please provide the first ten authors followed by et al. before submission." },
        { label: "CP22", note: "The listed authors are missing their initials. Please include them before submission." }
      ]
    }
  ];
}

function createChemistryPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - Abstract and introduction",
      heading: "Earth-Abundant Metal Catalysts",
      variant: "science",
      body: [
        `<del>Title: Earth-Abundant Metal Catalysts: Exploring the PotentialsPotential of Iron, Cobalt, and NickilNickel for Sustainable Chemical Reactions and Energy Applications</del> <ins>Earth-Abundant Metal Catalysts: Exploring the Potential of Iron, Cobalt, and Nickel for Sustainable Chemical Reactions and Energy Applications</ins>`,
        `<ins>Abstract</ins> <del>The development of affectiveDeveloping effective and affordable catalysts based on earth-abundant metals abundant in the Earth</del><ins>Developing effective and affordable catalysts based on earth-abundant metals</ins>, such as iron, cobalt, and <del>nickilnickel</del><ins>nickel</ins>, is essential for realizing sustainable chemical production and energy conversion processes.`,
        `These metals <del>showare a much more attractive alternative to the rare and expensive metals</del><ins>are attractive alternatives to rare and expensive metals</ins>, which are currently used in many catalysts.`,
        `This paper reviews recent advances in the <del>developingdevelopment</del><ins>development</ins> of earth-abundant metal catalysts, focusing on their <del>applicationapplications</del><ins>applications</ins> in chemical reactions relevant to energy conversion and storage.`,
        `<ins>Introduction</ins> Catalysts play a <del>serious role in drivingdrive</del><ins>serious role in driving</ins> various chemical reactions by improving efficiency and selectivity and reducing energy requirements (Crabtree, 2010).`,
        `<del>A lot of). Many</del><ins>Many</ins> currently used catalysts are based on rare and expensive metals, such as platinum, <del>Pdpalladium</del><ins>palladium</ins>, and rhodium, which have limited availability and can be economically and environmentally <del>insustainableunsustainable</del><ins>unsustainable</ins> (Chirik, 2011).`
      ],
      comments: [
        { label: "CP1", note: "Standardized the manuscript to 12 pt Times New Roman at 1.5 line spacing, with headings and subheadings italicized and bold." },
        { label: "CP2", note: "Please add Index terms as required by the IEEE style guide." },
        { label: "CP3", note: "IEEE uses a numbered reference system; I provided a correctly formatted example in the references section." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Iron-based catalysts",
      heading: "Iron-Based Catalysts",
      variant: "science",
      body: [
        `Iron is the most abundant transition metal in the <del>Earth'sEarth’s</del><ins>Earth's</ins> crust and has been extensively studied as a catalyst for <del>various and diverse</del><ins>diverse</ins> chemical reactions (Bauer, 2015).`,
        `One notable example is the Haber-Bosch process, <del>which uses of iron-based catalyst, which involves the synthesis of ammonium from nitrogen and hydrogen using an iron-based catalyst</del><ins>which synthesizes ammonia from nitrogen and hydrogen using an iron-based catalyst</ins> (Schrock, 2006).`,
        `Iron-based catalysts have also been investigated for their application in the Fischer-Tropsch <del>processes, which translatesconverts synthesis gas</del><ins>process, which converts syngas</ins> into hydrocarbons and <del>oxygenatesoxygenated hydrocarbons</del><ins>oxygenated hydrocarbons</ins> (Davis, 2011).`,
        `<del>New, up-to-date Recent research has focussedfocused on the development ofdeveloping</del><ins>Recent research has focused on developing</ins> iron-based molecular catalysts that mimic the active sites of natural enzymes, such as hydrogenases and nitrogenases, involved in the activation and conversion of small molecules (Rauchfuss, 2009).`,
        `These biomimetic catalysts <del>have been shown to be especialyare especially promising</del><ins>are especially promising</ins> for proton reduction, nitrogen fixation, and carbon dioxide activation (Artero & Fontecave, 2013).`
      ],
      comments: [
        { label: "CP4", note: "Please use consistent formatting for section and subsection headings in line with your target IEEE journal." },
        { label: "CP5", note: "Names in compounds such as Haber-Bosch and Fischer-Tropsch are conventionally joined with an en dash." },
        { label: "CP6", note: "Synthesis gas is more commonly referred to as syngas; this may be more familiar to your audience." }
      ]
    },
    {
      eyebrow: "Page 3 of 5 - Cobalt catalysts",
      heading: "Cobalt-Based Catalysts",
      variant: "science",
      body: [
        `Cobalt is <del>also a another earth-abundant-earth metal</del><ins>another earth-abundant metal</ins> that has been studied for use <del>foras a catalyst agent</del><ins>as a catalyst</ins> in various chemical reactions (Anjana & Sreekanth, 2015).`,
        `Cobalt-based catalysts have been widely used in the Fischer-Tropsch <del>processes, whereprocess; they exhibit large activity and high selectivity for production of longchainproducing long-chain hydrocarbons</del><ins>process, where they exhibit high activity and selectivity for producing long-chain hydrocarbons</ins> (Khodakov et al., 2007).`,
        `<del>In recent yearsRecently</del><ins>Recently</ins>, cobalt-based molecular catalysts <del>hashave</del><ins>have</ins> been investigated for <del>theretheir</del><ins>their</ins> application in the electrochemical and photochemical reduction of protons to <del>Hydrogenhydrogen</del><ins>hydrogen</ins> (Sun et al., 2015).`,
        `Cobalt-based catalysts have also been explored for their <del>potentpotential</del><ins>potential</ins> use in the electrocatalytic reduction of carbon dioxide to <del>fomateformate</del><ins>formate</ins>, a valuable chemical feedstock (Kumar et al., 2016).`
      ],
      comments: [
        { label: "CP7", note: "Please consider adding a second example so this paragraph parallels the iron-based catalysts section." },
        { label: "CP8", note: "Edits to this sentence may have changed your intended meaning; please review before accepting changes." }
      ]
    },
    {
      eyebrow: "Page 4 of 5 - Nickel catalysts and prospects",
      heading: "Nickel-Based Catalysts",
      variant: "science",
      body: [
        `<del>Nickil-Biased Nickel-Based Catalysts</del><ins>Nickel-Based Catalysts</ins>`,
        `<del>NickilNickel is anotherthe third earth-abundant metal that has attracted considerable attention for it's potential use as a catalyzt of various chemical reactionscatalyst</del><ins>Nickel is a third earth-abundant metal that has attracted considerable attention for its potential use as a catalyst</ins> (Kumar and Jain, 2012).`,
        `<del>Nickil basesNickel-based catalysts</del><ins>Nickel-based catalysts</ins> have been widely used in <del>the hydrogenaton ofhydrogenating</del><ins>hydrogenating</ins> unsaturated hydrocarbons and <del>the production ofproducing</del><ins>producing</ins> chemicals from biomass-derived feedstocks (Chen et al., 2014).`,
        `Nickel-based catalysts have also been investigated for carbon dioxide reduction to carbon <del>monooxidemonoxide</del><ins>monoxide</ins>, a key <del>indermetiateintermediate</del><ins>intermediate</ins> in producing liquid fuels and chemicals (Jouny et al., 2018).`,
        `<del>Challenges and Future ProspectivesProspects</del><ins>Challenges and Future Prospects</ins> The development of earth-abundant metal catalysts <del>facefaces</del><ins>faces</ins> several challenges, including the need <del>offor</del><ins>for</ins> a better understanding of catalysis mechanisms and catalyst scale-up (Chirik, 2011).`
      ],
      comments: [
        { label: "CP9", note: "Please consider adding a second example so this section parallels the iron-based catalysts section." },
        { label: "CP10", note: "Please complete the phrase: do you mean sustainable energy or sustainable products?" },
        { label: "CP11", note: "Edits to this sentence may have changed your intended meaning; please review before accepting changes." }
      ]
    },
    {
      eyebrow: "Page 5 of 5 - Conclusion and references",
      heading: "Conclusion and References",
      variant: "science",
      body: [
        `<del>The development ofDeveloping</del><ins>Developing</ins> effective and affordable catalysts based on earth-abundant metals, such as iron, cobalt, and <del>nickilnickel</del><ins>nickel</ins>, is <del>principal for realisingcritical to realizing</del><ins>critical to realizing</ins> sustainable chemical production and energy conversion processes.`,
        `Further research is needed to address the challenges associated with catalyst design, optimization, and scale-up. Interdisciplinary collaboration will be crucial for advancing sustainable catalysis and unlocking the <del>fullestfull</del><ins>full</ins> potential of earth-abundant metal catalysts.`,
        `<ins>References</ins> [1] G. W. Crabtree, "The environment and the need for new catalysts," <ins>Catal. Today</ins>, vol. 154, no. 3-4, pp. 207-212, 2010.`,
        `[2] P. J. Chirik, "Earth-abundant metal catalysts for alkene hydrosilylation," <ins>Nature Chem.</ins>, vol. 3, no. 10, pp. 773-774, 2011.`,
        `<del>Anjana, S. R., & Sreekanth, A. R.. Cobalt catalysts: a review. Catalysis Reviews, 57(4), 306-344.</del> <ins>Please convert remaining references to IEEE numbered style in order of appearance.</ins>`
      ],
      comments: [
        { label: "CP14", note: "This citation is over a decade old; please consider citing more recent work in this area." },
        { label: "CP15", note: "IEEE uses numbered citations; references should be numbered in the order in which they appear." },
        { label: "CP16", note: "Please include the month of publication if applicable." }
      ]
    }
  ];
}

function createLawPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 4 - FCA enforcement",
      heading: "False Claims Act Enforcement: A Self-Fulfilling Prophecy?",
      variant: "legal",
      body: [
        `<ins>A. False Claims Act Enforcement: A Self-Fulfilling Prophecy?</ins> Since the amendments to the Fraud Enforcement and Recovery Act (FERA), the <del>government Department of Justice (DOJ)</del><ins>Department of Justice (DOJ)</ins> has ramped up enforcement through an increased number of qui tam suits and <del>great money gainssignificant monetary gains</del><ins>significant monetary gains</ins> (DOJ, 2011).`,
        `In 2011, <del>realtors relators</del><ins>relators</ins> filed 638 qui tam suits, <del>which representedrepresenting</del><ins>representing</ins> a 10% increase over the <del>73</del><ins>580</ins> qui tam suits filed in 2010 and roughly a 50% increase over the 433 qui tam suits filed in 2009.`,
        `The DOJ has recovered more than $8.7 billion in settlements and judgments since <del>FERA arrivedthe FERA amendments</del><ins>the FERA amendments</ins>, including $3 billion in fiscal year 2011 alone (DOJ, 2011).`,
        `In the <del>past fewrecent</del><ins>recent</ins> years, the legislative and executive branches <del>haves</del><ins>have</ins> passed legislation and introduced task force objectives that make it easier for governments to pursue False Claims Act (FCA) cases at state and federal levels.`
      ],
      figure: "legal",
      comments: [
        { label: "CP1", note: "Second-level headings in APA 7 are flush left, bold, and in title case." },
        { label: "CP2", note: "Please check the value here. If 638 is a 10% increase, the original value should be 580, not 73." },
        { label: "CP4", note: "Acronyms should be introduced with the expanded form at their first use." }
      ]
    },
    {
      eyebrow: "Page 2 of 4 - Statutory background",
      heading: "False Claims Act context",
      variant: "legal",
      body: [
        `In 2007, Congress added section 1909 to the Social Security Act <del>'to create[] a financial incentive for States to enact legislation...'</del><ins>"to create[] a financial incentive for States to enact legislation..."</ins> (Publication of OIG's Guidelines for Evaluating State False Claims Acts, 2006).`,
        `For states with a qualifying FCA, section 1909 provides that the state's share in any recovery <del>would will grow by 10ten percentage points</del><ins>will grow by ten percentage points</ins>.`,
        `In 2009, Attorney General Eric Holder and Health and Human Services Secretary Kathleen Sebelius announced the creation of the <del>Health Care Fraud Prevention Enforcement Action Team (HEAT) HEAT</del><ins>Health Care Fraud Prevention Enforcement Action Team (HEAT)</ins> to prevent fraud in federal health care programmes and strengthen local, state, and federal partnering.`,
        `In 2011, the Senate passed the <del>Ssmall Bbusiness Ccontracting Ffraud Pprevention Aact</del><ins>Small Business Contracting Fraud Prevention Act</ins>, which increased penalties for misrepresenting small business status.`
      ],
      comments: [
        { label: "CP5", note: "APA uses double quotation marks; single quotation marks are reserved for quotes within quotes." },
        { label: "CP6", note: "Acronyms and abbreviations should be defined in full at first use." },
        { label: "CP7", note: "In line with UK English conventions, I removed the serial comma where needed." }
      ]
    },
    {
      eyebrow: "Page 3 of 4 - Industry concerns",
      heading: "Policy concerns",
      variant: "legal",
      body: [
        `As things <del>presently standAt present</del><ins>currently stand</ins>, contractors, businesses, and individuals reimbursed by third parties with government money are all <del>on the hook</del><ins>liable</ins> for costs, regardless of whether they intended the government to rely on the statement in making payment.`,
        `The American Hospital Association (AHA) <del>appropriate described</del><ins>appropriately described</ins> the tense situation when it expressed concerns "that aggressive FCA investigations are being initiated upon the discovery of evidence of a mistake or overutilization..." (AHA, 2011).`,
        `The health care industry is not the only target, as federal prosecutors have expanded FCA investigations and prosecutions to include <del>defence</del><ins>defense</ins>, financial services, and other industries (DOJ, 2013).`,
        `Congress should further revise the FCA to define "false" and "fraudulent" and thereby clarify the boundaries of implied false certification theory.`
      ],
      comments: [
        { label: "CP8", note: "In APA, quotes of 40 words or more are formatted as block quotations." },
        { label: "CP9", note: "Search for defined terms to ensure acronyms are consistently applied throughout the paper." },
        { label: "CP10", note: "Cases in APA style use Bluebook format: case name, year, and page number." }
      ]
    },
    {
      eyebrow: "Page 4 of 4 - Implied certification",
      heading: "Scaling Back Implied False Certification Theory",
      variant: "legal",
      body: [
        `<ins>B. Scaling Back Implied False Certification Theory</ins> On <del>2 May 2012, six6</del><ins>2 May 2012, six</ins> members of the Senate Finance Committee published an open letter to the health care community asking for fresh perspectives and overlooked solutions.`,
        `The AHA responded with several recommendations but cautioned that <del>mistakes are made by hospital staff...</del><ins>mistakes by hospital staff, CMS, and program contractors are not fraud</ins> (American Hospital Association, 2011).`,
        `Rather than face an adverse jury verdict, defendants may be forced to settle FCA claims because of treble damages, civil penalties, attorney fees, and potential debarment or suspension.`,
        `The First Circuit's construction of the FCA in Hutcheson permits a relator to claim FCA violations for alleged failure to comply with a contract provision even when that provision is not an express condition of payment.`
      ],
      comments: [
        { label: "CP11", note: "In APA, numbers under ten are written as words unless an exception applies." },
        { label: "CP12", note: "The page number of this quotation is needed." },
        { label: "CP14", note: "Please include the full case name here; there were not enough details for me to supply it confidently." }
      ]
    }
  ];
}

function createPhilosophyPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 4 - Argument structure",
      heading: "On Republic X, 595a-608b",
      variant: "humanities",
      body: [
        `<del>A. ArgumentationIts Structure of Argumentation</del><ins>A. Structure of Argumentation</ins>`,
        `The passage in Republic, Book X, starting from 595a and ending at 608b10, can be divided into two distinct discussions.`,
        `The first, at 595a-602b, provides <del>the a characterizsation</del><ins>a characterisation</ins> of the imitator figure, as well as an argument about who in the city <del>is toshould</del><ins>should</ins> be considered an imitator.`,
        `The second, at 602c-608b, addresses the psychology of imitation; it provides arguments explaining why <del>the avoidance of imitation is tomust be avoided is necessary</del><ins>imitation must be avoided</ins>.`,
        `<del>Definition of Imitation; A and are aAll tTragic pPoets iImitators?</del><ins>Definition of Imitation: Are All Tragic Poets Imitators?</ins>`
      ],
      comments: [
        { label: "CP1", note: "Changed this to US English, including double quotation marks and US dash spacing conventions." },
        { label: "CP4", note: "This note and all subsequent footnotes appear to be missing. Perhaps they appear in the full-length document?" }
      ]
    },
    {
      eyebrow: "Page 2 of 4 - Imitation and ontology",
      heading: "Definition of Imitation",
      variant: "humanities",
      body: [
        `Book X begins with Socrates boasting that the banishment of imitative art from the city, established in Book III, was a wise decision.`,
        `However, the distinctly different uses of <del>'imitation'</del><ins>"imitation"</ins> in Book III create confusion about what has been banned.`,
        `The craftsman <del>(ho demiourgos)</del> makes an imitation of <del>the idea</del><ins>an idea or template</ins> of a product (596b6-11), producing items that resemble actual being but do not possess it.`,
        `In contrast, Socrates defines the imitator as one who imitates merely the appearances that a craftsman's product produces.`,
        `The idea itself is the product of the god, and the craftsman is twice removed from the idea; therefore, the imitator is thrice removed from Truth.`
      ],
      comments: [
        { label: "CP2", note: "You may wish to consider replacing 'craftsman' with 'artisan' to remove gender bias, although readers may expect the familiar translation." },
        { label: "CP3", note: "I suggested 'an idea or template' to clarify how 'idea' is being used here." },
        { label: "CP5", note: "Please check whether HC is a citation, as it does not appear to match the bibliography." }
      ]
    },
    {
      eyebrow: "Page 3 of 4 - Testing tragic poets",
      heading: "Tragic poets and knowledge",
      variant: "humanities",
      body: [
        `Socrates creates a test to determine whether tragic poets deserve to be placed among banished imitators.`,
        `At 599b2-7, Socrates says that if a poet had knowledge concerning the things he imitates, he would prefer to pursue those things zealously rather than pursue counterfeits and copies.`,
        `<del>Correctly If you want to uUunderstanding this correctly, requires reading it must be read withconsidering</del><ins>Understanding this correctly requires considering</ins> the ontology developed in Books V-VII.`,
        `Because real things capable of being known are not spatiotemporal, it would be incoherent for Plato to maintain that the ultimate test of one's ontological beliefs must be the tangible properties of one's work.`,
        `The discussion of philosophers in Book VI is again relevant: Socrates asserts that popular opinion almost inevitably holds lovers of wisdom in little esteem.`
      ],
      comments: [
        { label: "CP6", note: "I would suggest including 'in Book __' here for clarity." },
        { label: "CP7", note: "I rephrased slightly to avoid gender bias. Additional similar changes follow below." },
        { label: "CP8", note: "Since Socrates is known for irony, it may be worth explaining why this inconsistency is not a ruse." }
      ]
    },
    {
      eyebrow: "Page 4 of 4 - Critical conclusion",
      heading: "Assessment of the argument",
      variant: "humanities",
      body: [
        `Socrates concludes that all poets are merely imitators of images of the subjects they write about and that they have no grasp of Truth.`,
        `This argument for labeling all poets as imitators <del>is a failurefails</del><ins>fails</ins> because Plato does not clearly endorse the premise that a wise person will necessarily be prosperous and honored.`,
        `Depending on the translation accepted, Plato's intention can be consistent with ideas presented elsewhere in the Republic.`,
        `On this interpretation, deeds or works need not be physical actions. If one has knowledge of the objects of reality, that person will imitate these things rather than their appearances.`,
        `The first half of the passage remains valuable for its definition of imitation, which is used in the later argument about the damaging effects of imitation on the soul.`
      ],
      comments: [
        { label: "CP9", note: "This was changed to match the tone of the surrounding sentence." },
        { label: "Argument", note: "The revised conclusion separates the critique of Socrates' argument from the useful conceptual definition retained from the passage." }
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
  if (seed.key === "mla") return createMlaReferencePages(seed);
  if (seed.key === "chicago") return createChicagoReferencePages(seed);
  if (seed.key === "oscola") return createOscolaReferencePages(seed);

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

function createMlaReferencePages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - MLA Works Cited",
      heading: "Works Cited",
      variant: "references",
      body: [
        `<ins>Works Cited</ins>`,
        `Adahl, Karin, and Berit Sahlstrom. "Islamic Art and Culture in Sub-Saharan Africa." <ins>Acta Universitatis Upsaliensis. Figura Nova Ser. 27</ins>, edited by [First Name] [Last Name], [Publisher], 1995, pp. xx-xx.`,
        `Ali, Nadia. "The Royal Veil: Early Islamic Figural Art and Imperial Power: <del>Racethe Bilderverbot Reconsidered</del><ins>The Bilderverbot Reconsidered</ins>." Religion, vol. 47, no. 3, 2017, p. 425.`,
        `Anderson, Benedict. <ins>Imagined Communities: Reflections on the Origin and Spread of Nationalism</ins>. [Publisher], 1991.`,
        `Bagchi, Amiya. "Markets, Market Failures, and the <del>IntimateTransformation</del><ins>Transformation</ins> of Authority, Property and Bondage in Colonial India." <ins>Institutions and Economic Change in South Asia</ins>, edited by Burton Stein and Sanjay Subrahmany, [Publisher], 1996, pp. 49-70.`,
        `Balibar, Etienne. "Fichte and the Internal Border: On Addresses to the German Nation." <ins>Masses, Classes, Ideas</ins>, edited by ____, translated by James Swenson, [Publisher], 1994, pp. 61-84.`
      ],
      comments: [
        { label: "A1", note: "This list has been alphabetized by last name per MLA style." },
        { label: "A2", note: "I have left placeholders for missing information throughout." },
        { label: "A4", note: "Please replace [Publisher] with the publisher name. MLA requires the publisher for books but not publisher location." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Parenthetical citation check",
      heading: "MLA source details",
      variant: "references",
      body: [
        `Calcutta Mechanics Institute and School of Arts. <del>India Review, vol. 3, 1839, pp. 646-48.</del> <ins>"[Article Title]." India Review, vol. 3, no. [#], 1839, pp. 646-648.</ins>`,
        `Eaton, Natasha. "Excess in the City? The Consumption of Imported Prints in Colonial Calcutta, c.1780-c.1795." <ins>Journal of Material Culture</ins>, vol. 8, no. 1, 2003, pp. 45-74.`,
        `---. "Virtual Witnessing? Balthazar Solvyns and the Navigation of Precision, c.1790-1840." <ins>Journal of Historical Geography</ins>, vol. 43, 2014, pp. 49-59.`,
        `Gowrley, Freya. "Reflective and Reflexive Forms: Intimacy and Medium Specificity in British and American Sentimental Albums, 1800-1860." <ins>Journal18</ins>, vol. 6, 2018, https://www.journal18.org/issue6/reflective-and-reflexive-forms-intimacy-and-medium-specificity-in-british-and-american-sentimental-albums-1800-1860. Accessed x Mon. Year.`
      ],
      comments: [
        { label: "A6", note: "Please clarify whether Calcutta Mechanics Institute and School of Arts is the author or the article title." },
        { label: "A9", note: "When an author appears more than once, MLA replaces the name with three hyphens in subsequent entries." },
        { label: "A14", note: "Provide the access date for this online journal article." }
      ]
    }
  ];
}

function createChicagoReferencePages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - Chicago bibliography",
      heading: "Bibliography",
      variant: "references",
      body: [
        `<ins>Bibliography</ins>`,
        `Bonefeld, Werner. <del>(. 2014). Critical Theory and the Critique of Political Economy,. London: Bloomsbury.</del><ins>2014. Critical Theory and the Critique of Political Economy. London: Bloomsbury.</ins>`,
        `Clarke, Simon. <del>(1991). The State Debate. Basingstoke: Palgrave Macmillan.</del><ins>1991. The State Debate. Basingstoke: Palgrave Macmillan.</ins>`,
        `Fuchs, Christian. 2010. "Grounding Critical Communication Studies: An Inquiry into the Communication Theory of Karl Marx." <del>Journal Title [volume number] ([issue number]): [page range].</del>`,
        `Fuchs, Christian. 2011. <ins>Foundations of Critical Media and Information Studies</ins>. New York: Routledge.`,
        `Fuchs, Christian. 2012. "New Marxian Times. Reflections on the 4th ICTs and Society Conference 'Critique, Democracy and [finish title].'" <del>Journal Title [volume number] ([issue number]): [page range].</del>`
      ],
      comments: [
        { label: "A1", note: "Your references have been alphabetized by last name." },
        { label: "A2", note: "Author names should be written out in full." },
        { label: "A3", note: "This reference is incomplete. Wherever information is missing, I provided placeholders; please replace accordingly." },
        { label: "A4", note: "For journal article references, please add the DOI at the end of the reference if possible." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Footnote consistency",
      heading: "Chicago reference cleanup",
      variant: "references",
      body: [
        `Marx, Karl. <del>(1996). Capital Volume. Vol. 1. Marx and Engels Collected Works, Vol. 35.. London: Lawrence and</del><ins>1996. Capital. Vol. 35 of Marx and Engels Collected Works. London: [publisher].</ins>`,
        `Neary, Mike, and Joss Winn. 2016. "<del>Against academic identity.Academic Identity.</del><ins>Against Academic Identity.</ins>" Higher Education Research and [finish journal title] [volume number] ([issue number]): [page range].`,
        `<del>of Capitalist Work, Ashgate Publishing Company..</del>`,
        `Sterne, Jonathan. 2006. "Thinking the Internet: Cultural Studies Versus the Millennium." In <ins>Cybercultures: Critical Concepts in Media and Cultural Studies</ins>, vol. 2, edited by David Bell, 80-106. New York: Routledge.`
      ],
      comments: [
        { label: "A6", note: "If you used volume 35 of a multivolume work, the format should follow the edited example." },
        { label: "A7", note: "This reference is incomplete and the journal title is not complete." },
        { label: "A8", note: "This is a fragment of a reference. Please complete it as a book reference or delete it." },
        { label: "A15", note: "Arabic numerals are always used for volume numbers in Chicago-style reference lists." }
      ]
    }
  ];
}

function createOscolaReferencePages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - OSCOLA footnotes",
      heading: "Legal Footnotes",
      variant: "references",
      body: [
        `10 Catriona MacKenzie, "The Importance of Relational Autonomy and Capabilities for an Ethics of Vulnerability" in Catriona MacKenzie, Wendy Rogers and Susan Dodds (eds), <ins>Vulnerability: New Essays in Ethics and Feminist Philosophy</ins> (OUP 2014) 33-59.`,
        `11 Catriona MacKenzie, Wendy Rogers and Susan Dodds, "Introduction: <del>What isIs Vulnerability</del><ins>What Is Vulnerability</ins>, and Why Does It Matter for Moral Theory" in MacKenzie, Rogers and Dodds (eds), <ins>Vulnerability</ins> (OUP 2014) 1-32.`,
        `13 UN Committee on the Elimination of Discrimination Against Women, "Concluding Observations: Cambodia" (25 January 2006) UN Doc CEDAW/C/KHM/CO/3, para 19.`,
        `15 <del>Energy securitySecurity as new determinant of renewable energy...</del><ins>[Authors missing], "Energy Security as New Determinant of Renewable Energy: The Role of Economic Complexity in Top Energy Users"</ins> (2023) 263(C) Energy 125799 <https://doi.org/10.1016/j.energy.2022.125799> accessed [date].`
      ],
      comments: [
        { label: "A1", note: "Please insert missing authors." },
        { label: "A2", note: "Please insert the date of access." },
        { label: "A3", note: "OSCOLA uses 'and others' for works with more than three authors." },
        { label: "A5", note: "Insert missing publisher and publication year where placeholders remain." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Table of authorities",
      heading: "OSCOLA repeated references",
      variant: "references",
      body: [
        `23 <del>Ibid.,ibid para. 36.</del><ins>ibid para 36.</ins>`,
        `25 Ilhan Ozturk, "Sustainability in the Food-Energy-Water Nexus: Evidence from BRICS Countries" (2023) 93(1) Energy; Erik Hille and Thomas J Oelker, "International Expansion of Renewable Energy Capacities: The Role of Innovation and Choice of Policy Instruments" (2023) 204(A) Ecological Economics 107658 <https://doi.org/10.1016/j.ecolecon.2022.107658> accessed [date].`,
        `26 Kate Brown, ""Vulnerability": Handle with Care" (2011) 5(3) Ethics and Social Welfare 313, 316; Fineman, "Equality, Autonomy and the Vulnerable Subject in Law and Politics" (n 16) 21.`,
        `35 Turner, <ins>Vulnerability and Human Rights</ins> (n 16) 6. <del>35 ibid 6.</del>`
      ],
      comments: [
        { label: "A7", note: "Insert the first page of the article." },
        { label: "A8", note: "Insert accessed date." },
        { label: "A9", note: "No need to include the title because there is only one Brown reference." },
        { label: "A11", note: "Inserted missing citation to the previous footnote." }
      ]
    }
  ];
}

function createResumePages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 4 - CV header and profile",
      heading: "John A. Doe",
      variant: "resume",
      body: [
        `<ins>JOHN A. DOE</ins>`,
        `555 Pleasant Street | Pleasant Town, PA 12345 | (555) 438-2562 | johndoe@email.com`,
        `PROFESSIONAL SUMMARY`,
        `<del>Computer Systems systems Engineer engineer with extensive experience in applying data analytics within in a consultancy environment.</del> <ins>Computer systems engineer with extensive experience applying data analytics in a consultancy environment.</ins>`,
        `<del>I combine Sstrong SQL, Excel, R Programming, and, Ddata warehousinge and development skills combined with modellinging, predictive analytics and visualiszation techniques in order to help clients make informed decisions or and automate or / improve processes.</del> <ins>I combine strong SQL, Excel, R programming, data warehousing, modelling, predictive analytics, and visualisation skills to help clients make informed decisions and automate or improve processes.</ins>`,
        `<del>Fluent in Spanish, Russian and English and, able to write and communicate complex concepts in all three languages.</del> <ins>Fluent in Spanish, Russian, and English, with the ability to communicate complex technical concepts clearly in all three languages.</ins>`,
        `EDUCATION`,
        `<ins>University of London</ins>, London, UK - M.A. in Computer Science, September 2013`,
        `<ins>University of Virginia, College of Arts and Sciences</ins>, Charlottesville, VA - B.A. in Physics, May 2010`
      ],
      figure: "resume",
      comments: [
        { label: "CP1", note: "I recast the summary to make the top-line description direct, clear, and impact focused." },
        { label: "Profile", note: "Condensed repeated skill wording and grouped technical strengths into a cleaner professional value proposition." }
      ]
    },
    {
      eyebrow: "Page 2 of 4 - Data analytics experience",
      heading: "Professional Experience",
      variant: "resume",
      body: [
        `DATA ANALYTICS ASSOCIATE - Big Data Co., Pleasant Town, PA | <del>Jan.nuary 2016 - Ppresent</del> <ins>January 2016 - Present</ins>`,
        `<del>Top - 5 data management consultant, delivering performance improvement, turnaround management and data advisory services</del> <ins>Top 5 data management consultancy delivering performance improvement, turnaround management, and data advisory services.</ins>`,
        `- <del>Developed a tool for a Tier -1 European bank to automate and streamline a highly manual process;,, which the toolwhich decreased user input errors and and was then implemented globally by the Bbank.</del> <ins>Developed a tool for a Tier 1 European bank that automated a highly manual process, reduced user-input errors, and was implemented globally.</ins>`,
        `- <del>Managed and trained a team of eight8 contractors to design and implement the enterprise API for subsequent use and extension by the developers. to consume and extend</del> <ins>Managed and trained eight contractors to design and implement an enterprise API for subsequent use and extension by developers.</ins>`,
        `- <del>Developed dynamic, and user friendlyuser-friendly dashboards for national workforce planners to use as to be used as decision tools by national workforce planners.</del> <ins>Developed dynamic, user-friendly dashboards used by national workforce planners as decision tools.</ins>`
      ],
      comments: [
        { label: "CP2", note: "Removed the hyphen to align with the style used for Top 5 elsewhere in the CV." },
        { label: "CP3", note: "Replaced 'consume' with 'use' because it is clearer and more natural for CV readers." },
        { label: "Impact", note: "Revised bullets to start with strong action verbs and foreground measurable business outcomes." }
      ]
    },
    {
      eyebrow: "Page 3 of 4 - IT leadership experience",
      heading: "Professional Experience continued",
      variant: "resume",
      body: [
        `MANAGER, IT APPLICATIONS - IT Service Centre, Inc., London, UK | <del>Sept. 2013 - Dec. 12/2015</del> <ins>September 2013 - December 2015</ins>`,
        `- <del>Lead a team of 7 seven developers in writing web applications and a multi-Tterabyte data warehouse for a banking application.</del> <ins>Led seven developers in building web applications and a multi-terabyte data warehouse for a banking application.</ins>`,
        `- <del>Participated Assisted in the conversion of existing websites to be a mobile- friendly interface with a scalable design using Angular 2, Bootstrap, and .net Web API.</del> <ins>Assisted in converting existing websites to mobile-friendly, scalable interfaces using Angular 2, Bootstrap, and .NET Web API.</ins>`,
        `- <del>Standardiszed and streamlined the development process with by including formal business and data analysis, identification of requirements gathering, data warehouse design and coding, unit testing, code review and, integration testing, etc.</del> <ins>Standardised and streamlined the development process by including formal business analysis, requirements gathering, data warehouse design, coding, unit testing, code review, and integration testing.</ins>`,
        `The edited bullets now use consistent tense, concise technical phrasing, and a clear achievement-led structure.`
      ],
      comments: [
        { label: "CP4", note: "Please confirm whether 'banking application' means a software application or work performed for a bank." },
        { label: "CP6", note: "I changed 'with' to 'by including' to clarify how the development process was standardised." },
        { label: "CP5", note: "I recommend omitting 'etc.' because it gives an impression of imprecision and informality." }
      ]
    },
    {
      eyebrow: "Page 4 of 4 - Skills and personal details",
      heading: "Skills",
      variant: "resume",
      body: [
        `SKILLS`,
        `- <del>Fluent in Spanish, Russian and English;, conversational in French.</del> <ins>Fluent in Spanish, Russian, and English; conversational in French.</ins>`,
        `- <del>Highly proficient in SQL, Excel, R Programming, Ddata warehousinge and development skills.</del> <ins>Highly proficient in SQL, Excel, R programming, data warehousing, and development.</ins>`,
        `TECHNICAL TOOLS`,
        `- <ins>SQL | Excel | R programming | Data warehousing | Predictive analytics | Visualisation | Angular 2 | Bootstrap | .NET Web API</ins>`,
        `PERSONAL INFORMATION & SPORTS`,
        `- <del>Born on 25 December 25st, 1990 in Hometown, VA; married, two children (8 and 9 years)..</del> <ins>Born 25 December 1990 in Hometown, VA; married, two children aged 8 and 9.</ins>`,
        `- <del>Karate (1. Dan), Bbodyweight training, CrossFit, Ddancing, Yyoga, Ssnowboarding, Bbiking..</del> <ins>Karate (1st dan), bodyweight training, CrossFit, dancing, yoga, snowboarding, and biking.</ins>`
      ],
      comments: [
        { label: "Skills", note: "Grouped technical tools into a scannable section so the CV reads like a professional resume rather than prose." },
        { label: "CP7", note: "I have typically seen this as '1st dan', but I will defer to your judgment." },
        { label: "CP8", note: "Do you mean 'weightlifting'? If so, I suggest using that term because it is more straightforward." }
      ]
    }
  ];
}

function createEconomicsPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - Literature review clarity",
      heading: "Review of the existing literature",
      body: [
        `This chapter <del>aims at reviewing the existing previous</del> <ins>reviews the previous</ins> literature that has <del>already focused on uncovering</del> <ins>focused on</ins> the link between a firm’s dividend policy and its share prices.`,
        `Since this topic <del>is a long-time debate</del> <ins>has long been debated</ins>, a large body of literature has been produced.`
      ],
      figure: "chart",
      comments: [
        { label: "E1", note: "Avoided combining two verbs where one suffices; 'reviews' is easier to parse than 'aims at reviewing'." },
        { label: "E2", note: "Simplified the phrasing to provide a more formal academic tone." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Sentence restructuring",
      heading: "Academic precision",
      body: [
        `Therefore, the goal of this section is <del>obviously</del> not to carry out an exhaustive inventory of the existing documentation, but rather to select a sample of the most relevant <del>and best publications</del> <ins>publications</ins>.`,
        `This helps provide the reader an insight <del>on what has been unearthed on the</del> <ins>into the</ins> influence that dividend announcements have on share prices.`
      ],
      comments: [
        { label: "E3", note: "Removed colloquial terms like 'obviously' to maintain objective analysis." },
        { label: "E4", note: "Corrected preposition usage ('into' instead of 'on') for standard English flow." }
      ]
    }
  ];
}

function createMarketingPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - Brand positioning",
      heading: "Music and price-quality positioning",
      body: [
        `Oakes (2000) argued that music <del>picks</del> <ins>choices</ins> <del>can be utilised</del> <ins>could be used</ins> to position a service <del>in the mind of consumers as being of a best</del> <ins>as having the highest possible quality</ins>.`,
        `According to Oakes (2000, p. 545), "Customers' monetary valuation of a service may subsequently be influenced by the style of music played."`
      ],
      figure: "chart",
      comments: [
        { label: "M1", note: "Changed 'picks' to 'choices' and 'utilised' to 'used' for academic precision." },
        { label: "M2", note: "Restructured the sentence to improve clarity and remove redundancy." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Literature integration",
      heading: "Synthesis of previous findings",
      body: [
        `This <del>thought</del> <ins>notion</ins> is strongly supported in the <del>writings</del> <ins>literature</ins>. For example, Areni and Kim (1993) measured the <del>affect</del> <ins>effect</ins> of playing pop music versus classical music in stores selling alcoholic beverages.`,
        `They <del>see</del> <ins>noted</ins> that <del>moneys</del> <ins>income</ins> increased and customers <del>buy</del> <ins>bought</ins> more expensive wines when classical music was played.`
      ],
      comments: [
        { label: "M3", note: "Replaced informal words ('thought', 'writings', 'see') with academic terminology." },
        { label: "M4", note: "Corrected the commonly confused words 'affect' and 'effect'." }
      ]
    }
  ];
}

function createNursingPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - Policy proposal",
      heading: "Nurses as Therapists: A Policy Answer",
      body: [
        `This essay <del>advocate for an evolution role change in the professional role of for</del> <ins>advocates for a change in the professional role of</ins> <del>psychiatric</del> <ins>mental health</ins> nurses in Australia.`,
        `Australia <del>is having</del> <ins>currently faces</ins> an epidemic of <del>mental problems right now</del> <ins>mental health conditions</ins> that respond better to psychological interventions than to <del>pharmacological solutions</del> <ins>pharmacological treatments</ins>.`
      ],
      figure: "clinical",
      comments: [
        { label: "N1", note: "In keeping with holistic models, 'mental health nurse' is now preferred over 'psychiatric nurse'." },
        { label: "N2", note: "Removed colloquial phrasing to maintain a professional, academic tone." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Background context",
      heading: "Contextualizing the healthcare crisis",
      body: [
        `According to the Australian Institute of Health and Welfare (AIHW) (2007), <del>mental problems</del> <ins>mental health conditions</ins> are the leading cause of disability in Australia.`,
        `The 2007 National Survey of Mental Health and Wellbeing (Slade et al., 2009) <del>show</del> <ins>revealed</ins> that 45.5% of the population currently have or will experience a mental health problem at some point in their <del>lifetime</del> <ins>lives</ins>.`
      ],
      comments: [
        { label: "N3", note: "Ensured correct subject-verb agreement and formal terminology." },
        { label: "N4", note: "Clarified statistics and improved sentence flow." }
      ]
    }
  ];
}

function createPharmaceuticalsPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - Mechanism of injury",
      heading: "Acetaminophen Overdose-induced Liver Injury",
      body: [
        `Acetaminophen (APAP) is a widely used analgesic and antipyretic drug. <del>that While is safe at in therapeutic doses. , However, when administered overdose,</del> <ins>While safe in therapeutic doses, however,</ins> overdoses of APAP can cause liver damage in humans and mice.`,
        `Despite extensive research <del>for over several decades</del>, the underlying molecular mechanisms of hepatocyte injury are still not fully understood.`
      ],
      figure: "molecule",
      comments: [
        { label: "P1", note: "Resolved fragmented sentence structure and improved readability." },
        { label: "P2", note: "Removed redundant phrasing ('for over several decades')." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Cellular processes",
      heading: "Mitochondrial permeabilization",
      body: [
        `What has become clear is that <del>mMitochondria</del> <ins>mitochondria</ins> play a key role in both the early stages of cell injury and the subsequent propagation phase.`,
        `Evidence <del>has been shown,shows</del> <ins>suggests</ins> that after exposure of hepatocytes to APAP in vitro or in vivo, <del>facilitates</del> mitochondria easily undergo permeabilization of the outer membrane.`
      ],
      comments: [
        { label: "P3", note: "Corrected capitalization and punctuation errors." },
        { label: "P4", note: "Clarified the description of cellular mechanisms to ensure precise scientific communication." }
      ]
    }
  ];
}

function createLifeSciencesPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - Electrical stimulation",
      heading: "Functional Electrical Stimulation (FES)",
      body: [
        `The development of <del>Functional Electrical Stimulation</del> <ins>functional electrical stimulation (FES)</ins> systems that can <del>bring back</del> <ins>restore</ins> essential upper-extremity movements demands controllers that can achieve accurate and consistent performance.`,
        `These conditions include fatigue, which alters the relationship between the <del>stimulation inputs and the muscle outputs</del> <ins>stimulation input and muscle force output</ins>.`
      ],
      figure: "clinical",
      comments: [
        { label: "L1", note: "Acronyms should be introduced into the text when the expanded form is first used." },
        { label: "L2", note: "Replaced informal phrasing ('bring back') with precise scientific verbs." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Methodology",
      heading: "Controller design",
      body: [
        `Therefore, <del>we need to make sure</del> <ins>it is critical</ins> that the control system can adapt to these varying conditions.`,
        `The study proposes a novel adaptive control strategy based on an <del>artificial neural network (ANN)</del> <ins>ANN</ins> to automatically adjust the stimulation parameters.`
      ],
      comments: [
        { label: "L3", note: "Adjusted tone from conversational to objective academic style." },
        { label: "L4", note: "Since ANN was already defined, only the acronym is needed here." }
      ]
    }
  ];
}

function createComputingPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - Computing",
      heading: "Introduction",
      body: [
        `Project Loon is a Google development venture designed to bring the internet to remote areas that <del>currently lacking</del> <ins>currently lack</ins> network infrastructure. The project launches <del>by launching balloons that float in the stratosphere, and link up</del> <ins>stratospheric balloons that communicate</ins> with each other, and <del>make use of windsuse the wind to go up or down and change elevation and location</del> <ins>use the wind to change elevation and location</ins>.`,
        `Their <del>tightly-sealedtightly sealed plastic composition</del> <ins>tightly sealed plastic</ins> construction ensures that the balloons stay aloft despite extreme temperature fluctuations. <del>Each balloonThe</del> <ins>The</ins> balloons can be launched at a rate of four <del>an</del> <ins>per</ins> hour using two <del>or to</del> <ins>to</ins> three people and an automated crane, with a lifespan of <del>roughly approximately</del> <ins>approximately</ins> 190 days (L. Kelion, 2015).`,
        `<del>Initially</del> First launched in New Zealand in 2013, Project Loon is expected to create a <del>$10 000 000 000</del> <ins>$10 billion</ins> market (D’Onfro, 2015), bringing internet services through existing <del>telcos</del> <ins>telecoms</ins> to the world’s poorest and most disadvantaged (Deloitte, 2014).`
      ],
      comments: [
        { label: "CP2", note: "In general, uncommon abbreviations and acronyms should be defined when you first use them." },
        { label: "CP3", note: "Both 'telco' and 'telecom' are abbreviations for a telecommunication company. I used 'telecom' in this paper for consistency." },
        { label: "CP4", note: "Setting the number this way helps the reader make sense of the figure; 9 zeros is a little difficult to decipher." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - The Digital Divide",
      heading: "Global internet access and challenges",
      body: [
        `<del>NowadaysCurrently, in tThe developed world considers,</del> <ins>Currently, the developed world considers</ins> internet access <del>is considered</del> to be a fundamental right<del>, , ;</del> <ins>;</ins> yet in 2014, <del>there were</del> 4.2 billion people<del> – , 57% of the world’s poplation</del> <ins>, or 57% of the world's population,</ins> remained <del>,</del> without internet access (UN Broadband Commission, 2015).`,
        `<del>By MoreHowever,</del> <ins>However,</ins> recent figures from June 2016<del>, this number had risen to</del> indicate that <del>are smallerlower,</del> with just over 50% now having <del>have</del> access to online services<del> in June 2016</del>.`,
        `Much of this increase comes from Africa, with a 7,448.8% increase in online usage between 2000 and 2016<del>., and Also, the</del> <ins>. Also, the</ins> Middle East<del>, which</del> shows a 4,207.4% increase over the same period.`
      ],
      comments: [
        { label: "CP5", note: "The abbreviation 'ME' is somewhat non-standard, so I replaced it with 'Middle East' for clarity." },
        { label: "CP6", note: "I divided this long, complex sentence into shorter sentences for readability." }
      ]
    }
  ];
}

function createPoliticalSciencePages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - Political Science",
      heading: "Together and apart: The EU from Maastricht to the 2010s",
      body: [
        `In 1946, following the wartime destruction <del>from destroying</del> of post-war Western Europe, Sir Winston Churchill said that Europeans <del>had tomust get</del> <ins>must</ins> develop a 'United States of Europe' to <del>rebuilding and</del> prevent future conflict.`,
        `Starting in 1951, six nations, <del>though but not Englandincluding the</del> <ins>not including the</ins> United Kingdom, began <del>creating to create</del> <ins>to create</ins> a state’s union to go <del>aroundpartially</del> <ins>partially</ins> aligned with Churchill’s idea<del>, although the United Kingdom was not involved in part</del>. The founding states <del>would joined together, but not as a federation, that in which the states wouldmade all states submit fall</del> <ins>joined together, not as a federation in which states would submit</ins> under a supranational <del>organizsation</del> <ins>organisation</ins>.`
      ],
      comments: [
        { label: "CP1", note: "Note that UK style prefers single, rather than double, quotation marks." },
        { label: "CP2", note: "It is better here to use the official name of the country, the United Kingdom, rather than England." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Integration and sovereignty",
      heading: "Moving together: The Maastricht Treaty, 1993",
      body: [
        `The formation of the European Coal and Steel Committee in 1951 preserved each of the six- member states’ <del>ability abilities</del> <ins>abilities</ins> to have control over its own laws and people, <del>or to keepand</del> thereby maintain sovereignty.`,
        `Integrationists, politicians <del>that who wantedfavouring</del> <ins>favouring</ins> a federal form of government, lost out to nationalists, <del>that who</del> <ins>who</ins> wanted to protect their own states from a federal union. <del>So, iIntegration</del> <ins>Integration</ins> was limited to economic issues through which the states could 'achieve limited and specific results' (George, Frantz, & Birmele, 1997, pp. 116).`
      ],
      comments: [
        { label: "CP5", note: "It is usually better to begin with the formal name of the treaty and then follow with the informal or commonly used name." },
        { label: "CP6", note: "Use the present tense to point out the focus, central argument, or structure of the current paper." }
      ]
    }
  ];
}

function createPsychologyPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - Psychology",
      heading: "Genetics and Environment in Human Behavior",
      body: [
        `The interplay of genetic and environmental factors in shaping human <del>behaviourbehavior</del> <ins>behavior</ins> and mental health <del>staysremains</del> <ins>remains</ins> a <del>centralpivotal</del> <ins>pivotal</ins> question in psychological research.`,
        `This paper <del>givesprovides</del> <ins>provides</ins> a comprehensive overview of the <del>existentexisting</del> <ins>existing</ins> literature on <del>the relative contributions of the genes and the environment focusingthis</del> <ins>this</ins> topic, with a particular focus on twin and adoption studies, epigenetics, and gene-environment interactions. The paper <del>emphasisesIt emphasizes</del> <ins>emphasizes</ins> the importance of considering both genetic <del>anand</del> <ins>and</ins> environmental factors when investigating human <del>behaviourbehavioral</del> <ins>behavioral</ins> development.`
      ],
      comments: [
        { label: "CP3", note: "The overarching themes of the study are evident from this sentence." },
        { label: "CP4", note: "The core message of this paper is clear; however, the abstract could be strengthened by incorporating a few additional details." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Methodology",
      heading: "Twin and Adoption Studies",
      body: [
        `Twin and adoption studies have been instrumental in disentangling <del>geneticthe</del> <ins>the</ins> influences of genetics and environmental <del>influenceenvironment</del> <ins>environment</ins> on human <del>behaviourbehavior</del> <ins>behavior</ins> and mental health.`,
        `Twin studies compare the concordance rates of a specific <del>traittraits</del> <ins>trait</ins> or <del>disorderdisorders</del> <ins>disorders</ins> in monozygotic (identical) and dizygotic (fraternal) twins<del>, while. In contrast,</del> <ins>. In contrast,</ins> adoption studies <del>compare theexamine</del> <ins>examine</ins> similarities between adopted children and their biological and adoptive parents (Plomin <del>etalet al.</del> <ins>et al.</ins>, 2013).`
      ],
      comments: [
        { label: "CP9", note: "These statements must be supported by proper citations." },
        { label: "CP10", note: "Consider stating a few main findings, briefly, if possible." }
      ]
    }
  ];
}

function createTheologyPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 5 - Theology",
      heading: "Theodicy in Monotheistic Religions",
      body: [
        `Theodicy, or <del>tThe</del> <ins>the</ins> problem <del>about of</del> <ins>of</ins> evil<del>, or theodicy,</del> concerns if and how the presence of evil and suffering in the world can be reconciled with the existence of an omnipotent, omniscient and omnibenevolent God.`,
        `This issue poses a fundamental <del>confrontationsis</del> <ins>crisis</ins> of fundamental importance in theology, and even <del>moresoespecially</del> <ins>especially</ins> in the <del>monothesticmonotheistic</del> <ins>monotheistic</ins> religions e.g., Christianity, Islam, and Judaism. Accordingly, <del>tThis</del> <ins>this</ins> article reviews the literature <del>texts aboutscholarship which has analysed theodicey</del> <ins>scholarship that has analysed theodicy</ins> and examines various theological responses that are seeking to reconcile the existence of an omnipotent, <del>omnisceint</del> <ins>omniscient</ins>, and benevolent God with the <del>presents of</del> <ins>presence of</ins> evil and suffering.`
      ],
      comments: [
        { label: "CP1", note: "I have formatted your paper and its headings according to Chicago style (16th edition) as requested." },
        { label: "CP2", note: "I believe that omnibenevolent is more appropriate in this context than benevolent, so have changed the use here accordingly." }
      ]
    },
    {
      eyebrow: "Page 2 of 5 - Contextual analysis",
      heading: "Introduction",
      body: [
        `The problem of evil is a <del>cardinal concerndeeply</del> <ins>deeply</ins> significant issue in <del>the theologyical discussions, especially in for</del> <ins>theological discussions, especially for</ins> monotheistic religious traditions such as Christianity, Islam and Judaism <del>that which</del> <ins>which</ins> posit an omnipotent, <del>omnisceintomniscient</del> <ins>omniscient</ins>, and omnibenevolent God (Plantinga, 1974).`,
        `<del>That God possesses such traits The existence ofwhile evil and suffering exist in the world elevates raises</del> <ins>The existence of evil and suffering in the world raises</ins> questions about <del>Gods' his</del> <ins>God's</ins> nature and intentions, leading to an apparent <del>contradindication tension</del> <ins>tension</ins> between <del>the his</del> <ins>his</ins> divine attributes and the reality of <del>Human human</del> <ins>human</ins> experience.`
      ],
      comments: [
        { label: "CP3", note: "In structuring paragraphs, it is generally preferable to introduce and clarify new information at the top of a paragraph." }
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
  pages: createPages(example)
}));

export const workExamplesByKey = new Map(workExamples.map((example) => [example.key, example]));
