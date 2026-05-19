import { formattingExampleBody, formattingExampleFootnotes } from "@/lib/formatting-example-generated";

export type WorkExampleKey =
  | "education"
  | "astrophysics"
  | "biology"
  | "chemistry"
  | "formatting"
  | "computing"
  | "cv"
  | "economics"
  | "geological"
  | "law"
  | "life-sciences"
  | "marketing"
  | "mla"
  | "nursing"
  | "oscola"
  | "geochemistry"
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
  blocks?: WorkExampleBlock[];
  variant?: "document" | "references" | "resume" | "engineering" | "science" | "legal" | "humanities";
  table?: { headers: string[]; rows: string[][] };
  figure?: "cell" | "molecule" | "circuit" | "code" | "resume" | "reference" | "chart" | "clinical" | "gel" | "reaction" | "legal";
  comments: WorkExampleComment[];
};

export type WorkExampleBlock =
  | {
      type: "paragraph";
      text: string;
      role?: "title" | "heading" | "caption" | "equation" | "list" | "sublist" | "footnote" | "reference" | "body";
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    };

export type WorkExampleComment = {
  label: string;
  note: string;
  anchor?: number;
};

type ExampleSeed = Omit<WorkExample, "pages"> & {
  thesis: string;
  method: string;
  result: string;
  reference: string;
};

const examples: ExampleSeed[] = [
  {
    key: "education",
    title: "Education",
    shortTitle: "Education",
    kind: "academic",
    field: "Adult basic education",
    accent: "#174a7c",
    documentTitle: "Encompassing Transformation: A Holistic Approach to Assessing Learning in Adult Basic Education",
    authorLine: "Education manuscript sample",
    terms: ["adult basic education", "transformative learning", "critical pedagogy", "social justice"],
    thesis: "The paper presents an integrated model for assessing and validating learning in adult basic education.",
    method: "The sample shows tracked revisions to clarify the role of transformative, formative, and summative dimensions.",
    result: "The edit refines argument flow, improves terminology, and preserves the author's social-justice focus.",
    reference: "Community-based participatory research is used as the visible project context."
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
    documentTitle: "Linking Wood Anatomy with Growth Vigour and Susceptibility to Alternate Bearing in Composite Apple and Pear Trees",
    authorLine: "Biology manuscript sample",
    terms: ["xylem", "rootstock", "scion", "alternate bearing"],
    thesis: "The visible excerpt links wood anatomy, hydraulic transport, growth vigour, and alternate bearing in apple and pear trees.",
    method: "The sample preserves tracked edits to the abstract and introduction, including species names, citations, and botanical terminology.",
    result: "The edit clarifies biological mechanisms while preserving terms such as xylem, parenchyma, rootstock, scion, and vessel lumen.",
    reference: "The visible sample stops after the study aim paragraph on anatomical differences and alternate bearing."
  },
  {
    key: "chemistry",
    title: "Chemistry",
    shortTitle: "Chemistry",
    kind: "academic",
    field: "Chemistry manuscript",
    accent: "#0f766e",
    documentTitle: "A Heteroleptic Bimetallic Pt-doped Cu-rich Hydrides Nanocluster",
    authorLine: "Chemistry manuscript sample",
    terms: ["PtH2Cu14-dtc", "nanocluster", "hydrides", "ESI-MS"],
    thesis: "The visible excerpt reports a heteroleptic Pt-doped Cu-rich hydride nanocluster and its structural characterisation.",
    method: "The sample preserves tracked edits to chemical formulas, ligand names, synthesis conditions, and spectroscopy discussion.",
    result: "The edit clarifies nanocluster terminology, formula formatting, synthetic procedure, and analytical assignments.",
    reference: "The visible sample stops during the Result and Discussion section after elemental analysis begins."
  },
  {
    key: "formatting",
    title: "Formatting Example",
    shortTitle: "Formatting",
    kind: "reference",
    field: "Academic formatting",
    accent: "#5d4b2f",
    documentTitle: "From Fetish to Totality: The Work of Art in the Age of Total Abstraction",
    authorLine: "Formatted academic paper sample",
    terms: ["academic formatting", "footnotes", "citations", "art history"],
    thesis: "The paper examines Claire Fontaine, real abstraction, totality, and the work of art under capital.",
    method: "The uploaded formatted document was converted into a page-style preview while preserving its paragraph order, footnote references, and edited footnotes.",
    result: "The preview represents the full formatted academic document with clean page flow and visible citation formatting.",
    reference: "Footnotes are preserved in the document order and retain tracked insertions and deletions where stored in the DOCX."
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
    documentTitle: "Bitcoin’s Crossroads: Challenges and Opportunities in Future Societal Adoption",
    authorLine: "Economics manuscript sample",
    terms: ["Bitcoin adoption", "price volatility", "security", "regulatory framework"],
    thesis: "The paper examines challenges and opportunities shaping Bitcoin's role as a potential mainstream currency.",
    method: "The visible sample uses tracked editorial revisions to refine claims about adoption, regulation, volatility, and societal uptake.",
    result: "The edit improves academic flow, clarifies terminology, and separates Bitcoin's future adoption from current market uncertainty.",
    reference: "The visible introduction frames Bitcoin adoption through technology, regulation, security, volatility, and deflationary concerns."
  },
  {
    key: "geological",
    title: "Geological Engineering",
    shortTitle: "Engineering",
    kind: "technical",
    field: "Geotechnical engineering",
    accent: "#1d4ed8",
    documentTitle: "Application of Particle Image Velocimetry for the Visualization of Soil Deformation Processes Due to Cyclic Lateral Loading of Rigid Piles",
    authorLine: "Geotechnical engineering manuscript sample",
    terms: ["particle image velocimetry", "cyclic lateral loading", "rigid piles", "monopiles"],
    thesis: "The manuscript investigates accumulated deformation of laterally loaded rigid piles under cyclic loading using Particle Image Velocimetry.",
    method: "Physical 1g small-scale model tests were planned, executed, and evaluated to visualize soil deformation fields and rearrangement processes.",
    result: "We refined geotechnical terminology, tightened long technical sentences, standardized figure references, and clarified the relationship between cyclic load ratio and deformation accumulation.",
    reference: "Frick and Achmus (2022) report model tests on cyclic lateral response of monopile foundations in non-cohesive soils."
  },
  {
    key: "law",
    title: "Law",
    shortTitle: "Law",
    kind: "academic",
    field: "Legal writing",
    accent: "#4338ca",
    documentTitle: "Information and Communication Technology Law in the European Union",
    authorLine: "Law manuscript sample",
    terms: ["IT law", "digital single market", "legal informatics", "data regulation"],
    thesis: "The visible excerpt defines IT law and frames the theoretical prerequisites for evaluating information technology law.",
    method: "The sample preserves tracked legal edits, footnotes, nested bullet points, and highlighted theoretical discussion.",
    result: "The edit clarifies scope, terminology, and theoretical foundations while preserving the legal-academic structure.",
    reference: "The visible footnotes cite the Monti Report, Regulation (EU) 2021/694, and Kilian on legal informatics."
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
    title: "Business and Marketing",
    shortTitle: "Business",
    kind: "business",
    field: "Business writing",
    accent: "#b45309",
    documentTitle: "What makes the best better?",
    authorLine: "Business and marketing manuscript sample",
    terms: ["customer experience", "customer satisfaction", "loyalty", "retention"],
    thesis: "The visible excerpt introduces the central question of why some companies deliver better customer experiences than others.",
    method: "The sample preserves tracked editorial revisions to improve flow, reduce repetition, and clarify the business argument.",
    result: "The edit sharpens the customer-experience narrative while keeping the original case example and economic framing.",
    reference: "The visible sample stops in the economic-effects section after explaining recommendations and customer loyalty."
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
    key: "geochemistry",
    title: "Geochemistry",
    shortTitle: "Geochemistry",
    kind: "academic",
    field: "Geochemistry manuscript",
    accent: "#2f7d32",
    documentTitle: "Soil CO2 Diffuse Degassing and Geothermal Reservoir Prospecting",
    authorLine: "Geochemistry manuscript sample",
    terms: ["CO2 flux", "diffuse degassing", "geothermal reservoir", "Latera caldera"],
    thesis: "The visible excerpt evaluates soil CO2 diffuse degassing as a geochemical indicator for geothermal reservoirs.",
    method: "The sample preserves tracked edits to the abstract and introduction, including scientific notation and gas-ratio terminology.",
    result: "The edit clarifies the relationship between CO2 flux, geothermal liquid flux, reservoir origin, and deep gas composition.",
    reference: "The visible sample stops after describing the Latera caldera case-study objective and survey approach."
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
    documentTitle: "Experiences with teachers in childhood and their association with wellbeing in adulthood",
    authorLine: "Psychology manuscript sample",
    terms: ["teacher-student relationship", "well-being", "self-esteem", "meaningful experiences"],
    thesis: "The visible excerpt investigates the association between childhood experiences with teachers and adult well-being.",
    method: "The sample preserves tracked edits to the abstract and literature review while excluding the screenshot overlay.",
    result: "The edit clarifies the study aim, participant method, emotional contagion theory, and mental-health framing.",
    reference: "The visible sample stops in the teacher-student relationship and mental health section."
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
  if (seed.key === "education") return createEducationPages(seed);
  if (seed.key === "astrophysics") return createAstrophysicsPages();
  if (seed.kind === "resume") return createResumePages(seed);
  if (seed.kind === "reference") return createReferencePages(seed);
  if (seed.key === "geological") return createGeologicalManuscriptPages(seed);
  if (seed.key === "biology") return createBiologyPages(seed);
  if (seed.key === "chemistry") return createChemistryPages(seed);
  if (seed.key === "law") return createLawPages(seed);
  if (seed.key === "philosophy") return createPhilosophyPages(seed);
  if (seed.key === "economics") return createEconomicsPages(seed);
  if (seed.key === "marketing") return createMarketingPages(seed);
  if (seed.key === "nursing") return createNursingPages(seed);
  if (seed.key === "geochemistry") return createGeochemistryPages(seed);
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

function createGeologicalManuscriptPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 3 - Abstract",
      heading: seed.documentTitle,
      variant: "engineering",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "title",
          text: "Application of particle image velocimetry for the visualization of soil deformation processes due to cyclic lateral loading of rigid piles"
        },
        { type: "paragraph", role: "heading", text: "Abstract" },
        {
          type: "paragraph",
          role: "body",
          text: `It is well <del>known</del><ins>established</ins> that piles embedded in sand accumulate lateral deformation (displacement and rotation) when subjected to horizontal cyclic loading. The <del>rate of resulting</del><ins>accumulation rate</ins> depends on a variety of parameters, <del>such as</del><ins>including</ins> loading conditions and properties of the pile-soil system. For nearly rigid piles, such as monopile foundations for offshore wind turbines, <del>an essential aspect is</del> the type of loading <ins>is particularly critical</ins><del>, which is</del>. The load type is determined by the ratio of the cyclic minimum load to the cyclic maximum load. <del>Several</del><ins>Previous</ins> investigations <del>concluded</del><ins>have shown</ins>, that <del>an</del> asymmetric two-way loading generally <del>results in larger</del><ins>produces greater</ins> accumulated pile deformation compared to other types of loading, especially one-way loading with complete unloading in each cycle. <del>This paper at hand presents</del><ins>This study reports on</ins> the planning, execution, and evaluation of physical 1g small-scale model tests to <del>on</del> investigate <ins>the accumulated</ins> deformation <del>accumulation</del> of laterally loaded rigid piles <del>due to</del><ins>under</ins> cyclic loading with a special focus on the soil deformations resulting from various cyclic load ratios. To visualize soil deformation fields and rearrangement processes within the soil profiles, <del>the technique of</del> Particle Image Velocimetry (PIV) was <del>applied</del><ins>employed in the tests</ins>. The evaluation of the model test results provides insights into the <del>reasons for</del><ins>mechanism underlying</ins> different accumulation rates and highlights the capabilities <del>as well as</del><ins>and</ins> limitations of PIV. Furthermore, the experiences gained during the realization and evaluation of the tests are summarized <del>in terms of</del><ins>as</ins> “lessons learned”, which may assist in the planning of future PIV<ins>-based</ins> experiments.`
        },
        {
          type: "paragraph",
          role: "body",
          text: "Keywords: monopiles; cyclic lateral loading; displacement accumulation; particle image velocimetry"
        },
        { type: "paragraph", role: "heading", text: "Introduction" },
        {
          type: "paragraph",
          role: "body",
          text: `During their operating life of 25 to 30 years, monopiles are <del>exposed to a variety of</del><ins>subjected to</ins> up to 10<sup>9</sup> stochastically distributed cyclic loads (Cuéllar 2011). The resulting horizontal forces and bending moments <del>lead to the</del><ins>induce</ins> deformations, <del>of the monopile that is</del> <ins>which are typically</ins> <del>usually classified</del><ins>characterized</ins> as rigid body rotations with <del>one</del><ins>a single</ins> rotation point (Randolph and Gourvenec 2011). These deformations accumulate <del>over time</del><ins>progressively</ins> <del>(respectively over the number of load cycles)</del>, with an incrementally decreasing rate.`
        },
        {
          type: "paragraph",
          role: "body",
          text: `Since the acceptable inclination of an Offshore Wind Turbine (OWT) is limited, <del>an</del> accurate prediction of the accumulated deformations <del>becomes relevant</del><ins>is essential</ins> for Serviceability Limit State (SLS) design. <del>Moreover</del><ins>Furthermore</ins>, the deformation is accompanied by <del>a</del> change<ins>s</ins> in the foundation stiffness, <ins>which</ins> <del>that is</del> particularly <del>important</del><ins>critical</ins>, as the target`
        }
      ],
      comments: [
        { label: "GE1", note: "Revised the opening claim for stronger academic precision and a more confident abstract tone.", anchor: 2 },
        { label: "GE2", note: "Standardised the description of loading type and corrected the sentence flow around previous investigations.", anchor: 2 },
        { label: "GE3", note: "Condensed the study aim while preserving the PIV method and geotechnical focus.", anchor: 2 }
      ]
    },
    {
      eyebrow: "Page 2 of 3 - Introduction",
      heading: "Introduction",
      variant: "engineering",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "body",
          text: `frequency band of current soft-stiff <del>monopile</del> designs has become so narrow, that a change <ins>in</ins> <del> of the</del> stiffness <del>can lead to</del><ins>could cause </ins> <del>a</del> problematic shift<ins>s</ins> in the natural frequencies (Bhattacharya et al. 2017).`
        },
        {
          type: "paragraph",
          role: "body",
          text: `The trend of displacement (or rotation) accumulation at ground level is often <del>classified</del><ins>represented</ins> by a power function of the type`
        },
        { type: "paragraph", role: "equation", text: "y<sub>N</sub> = y<sub>1</sub> · N<sup>α</sup>        (1)" },
        {
          type: "paragraph",
          role: "body",
          text: `or sometimes <del>with</del><ins>by</ins> a logarithmic <del>approach</del><ins>formulation</ins> (Little and Briaud 1988; LeBlanc et al. 2010; Lin and Liao 1999). Here <del>the deformation y<sub>N</sub>, which denotes</del> the lateral pile head displacement after N load cycles, <del>is calculated based on the pile head displacement</del><ins>while</ins> y<sub>1</sub> <ins>represents the pile head displacement after</ins> <del>one</del><ins>the first cycle</ins>. <del>(as</del><ins>The latter serves as</ins> a valid indicator for the cyclically induced deformation <del>dueto</del><ins>associated with</ins> a given <ins>certain</ins> load type and <del>size</del><ins>magnitude</ins>. <del>and an accumulation</del><ins>The parameter α is the accumulation factor.</ins> The load characteristic <del>of the load</del> ζ<sub>c</sub> is defined by the ratio of the <del>smallest</del><ins>minimum</ins> load H<sub>min</sub> to the <del>largest</del><ins>maximum</ins> load H<sub>max</sub> in the cycle (therefore: ζ<sub>c</sub>∈[-1;1]) (Equation 2). The relative load magnitude ζ<sub>b</sub> is the ratio of the <del>largest</del><ins>maximum</ins> load in the cycle to a <del>defined</del><ins>reference</ins> capacity H<sub>ref</sub> (Equation 3) (LeBlanc et al. 2010).`
        },
        { type: "paragraph", role: "equation", text: "ζ<sub>c</sub> = H<sub>min</sub> / H<sub>max</sub>        ζ<sub>b</sub> = H<sub>max</sub> / H<sub>ref</sub>" },
        {
          type: "paragraph",
          role: "body",
          text: `Although it is well <del>known</del><ins>established</ins> that the total accumulated deformation can vary <ins>by</ins> up to a factor of 4 depending on ζ<sub>c</sub>, <del>there is still</del> no specific mechanical explanation has yet been identified for why a certain load types accumulates <del>more</del><ins>greater</ins> or less<ins>er</ins> deformation than <del>an</del><ins>other</ins>. <del>The largest deformations, f</del><ins>For</ins> a constant relative load magnitude ζ<sub>b</sub>, <ins>the largest deformations are</ins> typically <del>expected</del><ins>observed</ins> for slightly negative ζ<sub>c</sub> <del>(0>ζ<sub>c</sub>>-0.6) corresponds</del><ins>(0>ζ<sub>c</sub>>-0.6), which corresponds</ins> to asymmetric two-way loads (LeBlanc et al. 2010; Klinkvort and Hededal 2013; Truong et al., 2019; Li et al. 2020; Frick and Achmus, 2020, 2022). <del>As an</del><ins>For example, F</ins>igure 1 illustrates the results of a series of 1g small-scale model tests on the influence of the cyclic load ratio ζ<sub>c</sub> reported by Frick and Achmus (2022).`
        },
        {
          type: "paragraph",
          role: "caption",
          text: "Figure 1: Influence of the cyclic load ratio ζ<sub>c</sub> on the pile head displacement accumulation determined by 1g small-scale model tests reported by Frick and Achmus (2022)."
        },
        {
          type: "paragraph",
          role: "body",
          text: `During cyclic load application with <del>equal</del><ins>constant</ins> ζ<sub>b</sub> indicating similar positive maximum loads – different <ins>values of cyclic load ratio ζ<sub>c</sub></ins> <del>entail</del><ins>produced distinct deformation</ins> <del>the following</del><ins>characteristics</ins>: For a pure swell load (i.e., ζ<sub>c</sub>>0) is no significant resetting force acts against the <del>main</del><ins>primary</ins> load direction. <ins>Consequently, the accumulated displacements within a given cycle are not effectively reduced, as the resetting displacement amplitude is smaller than that observed under alternating loads when</ins> [Equation] <ins>is held constant across tests.</ins> <del>which might reduce the already accumulated displacements for a certain cycle (the resetting displacement amplitude is smaller than for an alternating load if</del> [Equation] <del>is equal amongst all tests).</del> Hence, it <del>could be presumed</del><ins>can be inferred</ins> that <ins>pure swell</ins> <del>this</del> load type accumulates the largest deformations. <del>Nonetheless</del><ins>However, experimental evidence shows</ins> <del>the accumulation for a</del><ins>that</ins> load type with a partial of resetting force (i.e., ζ<sub>c</sub><0) <del>producegoes beyond greater deformation accumulation than that of</del><ins>produces greater deformation accumulation than</ins> pure one-way loads.`
        }
      ],
      comments: [
        { label: "GE4", note: "Improved transition from foundation stiffness to the displacement-accumulation model.", anchor: 0 },
        { label: "GE5", note: "Clarified variable definitions and kept the equations visible for technical readers.", anchor: 3 },
        { label: "GE6", note: "Refined the explanation of cyclic load ratio so the comparison with Figure 1 is easier to follow.", anchor: 5 }
      ]
    },
    {
      eyebrow: "Page 3 of 3 - Introduction continued",
      heading: "Introduction continued",
      variant: "engineering",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "body",
          text: `<del>Therefore, the conducted</del><ins>Particle Image Velocimetry (PIV) was employed to investigate phenomenon in small-scale physical model tests</ins>, <del>are an attempt to improve</del><ins>These experiments aim</ins> to enhance the understanding of the physical correlation between the load characteristics and the <ins>resulting</ins> accumulated deformation, <ins>thereby providing mechanistic insights into soil-pile interaction under varying cyclic load ratios.</ins>`
        }
      ],
      comments: [
        { label: "GE7", note: "Kept the final visible sentence from the reference image and tightened the purpose statement for clarity.", anchor: 0 }
      ]
    }
  ];
}

function createEducationPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 2 - Abstract and introduction",
      heading: seed.documentTitle,
      variant: "humanities",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "title",
          text: "Encompassing Transformation: A Holistic Approach to Assessing Learning in Adult Basic Education"
        },
        {
          type: "paragraph",
          role: "body",
          text: `<strong>Abstract:</strong> This paper presents an integrated model for assessing and validating learning in adult basic education (ABE), emphasizing transformative, formative, and summative dimensions. <del>Grounded</del><ins>Rooted</ins> in critical pedagogy and a commitment to social justice, the model <del>advocates for</del><ins>promotes</ins> pedagogical approaches that assess and validate learning experiences <del>that</del> leading to profound personal and social changes <ins>among</ins><del>in</del> disadvantaged and vulnerable adult learners. <del>The d</del>Development of this model stems from a deep commitment to ABE as a practice that empowers and emancipates individuals, <ins>the model addressing</ins> <del>the</del> limitations of current assessment methods by holistically incorporating the transformative, formative, and summative dimensions of learning. Serving as the foundation for a community-based participatory research (CBPR) project, the model engages ABE practitioners and learners in collaboratively developing a comprehensive framework and exploring transformative learning experiences. An exploratory inquiry with ABE practitioners into a typology of transformative learning processes and outcomes elucidates the <ins>model's</ins> practical implications <del>of the model and guides</del><ins>informs</ins> the CBPR project. The <ins>Discussions</ins> highlights <ins>the relevance of the model</ins><del>implications</del> for policy<del>ies</del><ins>development</ins>, program designs, and the validation of non-formal and informal learning, which aim to promote long-term effectiveness and societal impact in adult education.`
        },
        {
          type: "paragraph",
          role: "body",
          text: "<strong>Key Words:</strong> Adult basic education; Critical pedagogy; Critical reflection; Emancipatory learning; Community-based participatory research"
        },
        {
          type: "paragraph",
          role: "heading",
          text: "Introduction: Adult Basic Education and Social Justice"
        },
        {
          type: "paragraph",
          role: "body",
          text: `In this paper, I present an integrated model for assessing and validating various learning dimensions in ABE. The<del>is</del> model <del>was developed based on the interconnection of</del><ins>emerges from the intersection of</ins> my theoretical stance and practical experience. I <del>value</del><ins>regard</ins> adult education as an empowering, emancipatory, and ultimately transformative, practice grounded in critical pedagogy <del>that seeks</del><ins>and committed to advancing</ins> social justice and a vibrant democratic participation (Brookfield, 2016; Darder et al., 2016; Gouthro & Holloway, 2023). This <del>value perspective leads to</del><ins>fosters</ins> solidarity and university-practice collaboration with providers <del>working for the benefit of</del><ins>who serve</ins> the disadvantaged and vulnerable adult learners in ABE and work-based training initiatives. <del>This</del><ins>Such</ins> collaboration has <del>helped me</del><ins>deepened my</ins> understanding of pedagogical efforts and <ins>underscored</ins> the need to critically reflect on summative <del>dimensions</del><ins>assessment practices</ins> that <del>do not</del><ins>fail to</ins> adequately capture learning`
        }
      ],
      comments: [
        { label: "ED1", note: "Recast the opening framework language so the abstract states the model's pedagogical position more precisely.", anchor: 1 },
        { label: "ED2", note: "Kept the author's social-justice focus while tightening the transition into the CBPR project.", anchor: 1 },
        { label: "ED3", note: "Clarified how the model emerges from the author's theoretical stance and practical experience.", anchor: 4 }
      ]
    },
    {
      eyebrow: "Page 2 of 2 - Introduction continued",
      heading: "Introduction continued",
      variant: "humanities",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "body",
          text: `efforts. This <del>value also propels me to</del><ins>commitment also motivates my resistance</ins> <del>resist</del> to neoliberal tendencies in ABE (Yasukawa & Black, 2016; Reder, 2020a; Cennamo et al., 2020) by <ins>cultivating and</ins> sharing <del>and nurturing</del> “resources of hope” (Tett & Hamilton, 2019). <ins>These resources challenge the</ins><del>against</del> standardization<ins>ing</ins> and homogenization<ins>ing</ins> <del>conceptions</del> of human learning and counter the (increasingly) dominant “autonomous model of literacy” (Street, 2003).`
        },
        {
          type: "paragraph",
          role: "body",
          text: `This paper <del>draws on</del><ins>weaves together</ins> these interconnected strands and is organized as follows: Section 1 <del>presents</del><ins>examines</ins> the need to <del>include</del><ins>incorporate</ins> transformative dimensions to justify the liberating, relational, and dialogical conception of ABE that engenders profound personal and social changes in adult learners. Section 2 presents an argument for alternative pedagogical approaches <del>for</del><ins>to</ins> assessing and validating learning, <ins>particularly</ins> for the benefit of disadvantaged and vulnerable adults. Section 3 proposes a holistic <del>model of</del> assessment <ins>model</ins> that integrates <del>various</del><ins>multiple</ins> learning dimensions and <del>that</del> serves as the foundation for a CBPR project. Section 4 presents the results <del>of</del><ins>from</ins> an exploratory inquiry <ins>into transformative dimensions</ins> with ABE practitioners<ins>, into transformative dimensions,</ins> <del>based</del><ins>drawing</ins> on critical reflection and discusses their professional appraisals. Section 5 <del>presents my</del><ins>offers</ins> conclusions regarding the CBPR project and <del>avenues</del><ins>outlines directions</ins> for future research.`
        },
        {
          type: "paragraph",
          role: "heading",
          text: "The (Overlooked) Power of Transformative Learning in ABE"
        },
        {
          type: "paragraph",
          role: "body",
          text: `<ins>Participation</ins><del>Participating</del> in learner-centered, empowering and emancipatory ABE programs, <del>based</del><ins>grounded on</ins> in Freire's (1970) liberating, relational and dialogical conception of alphabetization, where reading the word also means reading the world (Freire & Macedo, 1987), can <del>lead to</del><ins>foster</ins> “deep” learning and generate profound personal and social <del>changes</del><ins>transformation</ins> (King & Heuer, 2009, p. 172; Kastner & Motschilnig, 2022, pp. 227–229). These deeply personal and social dimensions of human learning are often inaccessible for ABE learners and may <del>not be clearly identified</del><ins>or remain unnamed or unrecognized</ins>. <del>They are often</del><ins>Frequently, they are expressed through</ins> <del>hidden behind expressions</del><ins>simple yet powerful statements like such as</ins> ‘I feel better now’ or ‘I am not stupid’, and <del>which</del> are not adequately reflected in categories such as ‘increasing self-confidence’ in <del>program evaluations</del><ins>programs</ins>.`
        },
        {
          type: "paragraph",
          role: "body",
          text: "These personal and social dimensions are frequently overlooked by observers, especially those who are privileged. However, these transformative dimensions of human learning, both the processes and outcomes, are crucial for disadvantaged and vulnerable adults."
        }
      ],
      comments: [
        { label: "ED4", note: "Revised the resistance/resources sentence so the author's position reads as commitment rather than personal impulse.", anchor: 0 },
        { label: "ED5", note: "Improved section roadmap verbs while preserving the visible order of the paper.", anchor: 1 },
        { label: "ED6", note: "Changed the opening of the transformative learning section from a gerund phrase to a clearer noun phrase.", anchor: 3 }
      ]
    }
  ];
}

function createBiologyPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 4 - Abstract",
      heading: "Linking Wood Anatomy with Growth Vigour and Susceptibility to Alternate Bearing in Composite Apple and Pear Trees",
      variant: "science",
      body: [
        `<del>Head title:</del>`,
        `<ins>Linking Wood Anatomy with</ins> Growth Vigour <ins>and</ins> Susceptibility <ins>to</ins> Alternate Bearing <ins>in</ins> Composite Apple <ins>and</ins> Pear Trees`,
        `<b>Abstract:</b>`,
        `Excessive vegetative growth and irregular fruit bearing are often undesirable in horticultural practice. However, <ins>the</ins> biological mechanisms underlying these traits in fruit trees are not fully understood. In this study, we <del>tested</del> <ins>investigated</ins> <del>if</del> <ins>whether</ins> differences in growth vigor and susceptibility to alternate <ins>fruit</ins> bearing are associated with differences in vascular anatomy across fifteen different rootstock and scion cultivars of apple and pear trees. Anatomical traits related to water transport and nutrient storage were examined in young woody shoots and roots. We found a positive correlation between mean vessel diameter of roots and annual shoot length, suggesting greater hydraulic efficiency in vigorously growing trees compared to dwarfing ones. <del>The v</del><ins>Vigorous growing</ins> trees also maintained less negative midday leaf water potentials and were less susceptible to drought-associated growth decline. Furthermore, we observed a <del>close</del> <ins>strong</ins> negative correlation between proportions of total parenchyma in shoots and the alternate bearing index, suggesting that lower carbohydrate storage capacity might be associated with increased susceptibility to alternate bearing. <del>We also found that roots of</del> <ins>Notably,</ins> pear <del>trees</del> <ins>tree roots</ins> <del>had</del> <ins>exhibited</ins> greater hydraulic conductivity compared to apple <del>trees</del><ins>tree roots</ins>, with the difference driven by greater proportions of xylem and <del>greater</del> vessel lumen fractions. <ins>The </ins><del>G</del>greater transport capacity in pear roots seemed to be at the expense of carbohydrate storage, <del>because pear roots</del> <ins>as they</ins> contained lower proportions of total parenchyma and less starch <del>than</del> <ins>compared to</ins> apple tree roots. Overall, our findings shed more light on the controls of growth vigour and alternate bearing in commercially important fruit trees and can be useful for <ins>the</ins> breeding of new cultivars.`,
        `<b>Keywords:</b> alternate bearing index, carbohydrates, composite fruit tree, dwarf tree, parenchyma, rootstock, scion, shoot, starch, vessel, xylem, xylem transport.`
      ],
      comments: [
        { label: "Precision", note: "Replaced conversational phrasing such as 'tested if' with 'investigated whether' to meet academic standards." },
        { label: "Flow", note: "Tightened the comparison between apple and pear roots to make the sentence more direct and readable." }
      ]
    },
    {
      eyebrow: "Page 2 of 4 - Introduction",
      heading: "Introduction",
      variant: "science",
      body: [
        `<b>Introduction</b>`,
        `Apple (<em>Malus domestica</em> Borkh.) and pear trees (<em>Pyrus communis</em> L.) are two <del>highly</del> <ins>of the most</ins> important temperate fruit trees, producing 85<del>,</del> <ins>and</ins> 25 million tons of fruit worldwide and 15<del>,</del> <ins>and</ins> 3 million tons of fruit in Europe, respectively (data for fruit production in 2017; FAO 2019). <del>The A</del><ins>Both species belong to the</ins><del>pple and pear trees are both members of</del> Rosaceae family and have similar growth demands (Jackson 2003). In commercial orchards, apple and pear trees are typically <del>grown</del> <ins>cultivated</ins> as composite trees <del>in which</del><ins>created by grafting</ins> two different genotypes <del>are combined</del> into <del>an</del> <ins>a single</ins> individual <del>tree by means of grafting</del>. In composite trees, the aboveground scion is usually selected for its <ins>desirable</ins> production <del>properties</del> <ins>traits, while</ins> <del>and is grafted onto a</del><ins>the</ins> rootstock <del>that is chosen to influence</del><ins>regulates</ins> growth vigour and resistance to <ins>both</ins> biotic and abiotic stresses (Jackson 2003). <del>Due to the grafting process</del><ins>Through grafting, growers can combine</ins> desired properties of various scions and rootstocks <del>can be combined</del> to optimize fruit tree performance <del>according to</del> <ins>for</ins> grower’s <ins>specific production</ins> demands (Webster 1997; Mészáros et al. 2019).`,
        `<ins>In pomiculture,</ins> <del>T</del>trees with suppressed vegetative growth are often favoured <del>in pomiculture</del> to reduce costs associated with pruning and <del>allow higher planting densities, thereby</del><ins>to maximizing</ins> <del>maximize</del> fruit production per <del>orchard</del> <ins>unit</ins> area <del>unit through an increased density of trees per hectare</del>. Furthermore, <del>trees with suppressed vegetative growth</del><ins>Such trees</ins> also <ins>exhibit precocity,</ins> <del>frequently produce</del> <ins>producing</ins> fruits earlier during their lifespan (i.e., precocity) (Reighard and Loreti 2008; Muleo et al. 2011; Fazio et al. 2014; Mészáros et al. 2015). Together with tree training and pruning, the use of dwarfing rootstocks is a primary <del>means to</del><ins>strategy for</ins> <ins>controlling</ins> <del>control</del> vegetative growth of commercial fruit trees<del>,</del><ins>.</ins> <del>although</del> <ins>However,</ins> the final vigour of the trees is a combined effect of the scion’s and rootstock’s vigour. <del>While</del> <ins>Although</ins> there <del>is currently</del> a wide <del>selection</del> <ins>range</ins> of rootstocks with a known potential to control scion’s vigour <ins>is available</ins>, the <ins>underlying</ins> mechanisms of how this is achieved are not fully understood.`
      ],
      comments: [
        { label: "Clarity", note: "Restructured the opening paragraph to eliminate repetitive phrasing while preserving botanical names and citations." },
        { label: "Terminology", note: "Refined horticultural terms (e.g., 'grown' to 'cultivated', 'precocity') for a more specialized audience." }
      ]
    },
    {
      eyebrow: "Page 3 of 4 - Vegetative growth and hydraulic performance",
      heading: "Vegetative growth and hydraulic performance",
      variant: "science",
      body: [
        `Differences in hydraulic performance have been <del>suggested as one of the prominent</del><ins>proposed as a key</ins> mechanism <del>mechanisms of how</del><ins>by which</ins> rootstocks <del>may control</del><ins>influence</ins> tree growth vigour (Atkinson et al. 2003; Basile et al. 2003). <ins>The maintenance</ins> <del>Maintenance</del> of high water potential in aboveground organs is one of the key physiological factors sustaining vegetative growth (Berman and DeJong 1997; Basile et al. 2003; Weibel et al. 2003; Solari et al. 2006a). High water potential is essential <del>to</del> <ins>for</ins> sustaining meristematic activity (Sacks et al. 1997), cell expansion (Guerriero et al. 2014), and <del>unimpeded</del> <ins>efficient</ins> carbon <del>uptake</del> <ins>assimilation</ins> <del>via</del><ins>through</ins> open stomata (Comstock and Mencuccini 1998). High hydraulic conductivity of rootstocks is necessary for <del>water</del> <ins>delivering water</ins> <del>delivery</del> to aboveground organs and <del>for</del> maintenance of high water potential during <ins>periods of</ins> high transpiration demands (Goncalves et al. 2005; Solari et al. 2006a). Low hydraulic conductivity <del>of</del> <ins>in</ins> rootstocks has been <del>associated with</del><ins>linked to</ins> <del>slower</del> <ins>reduced</ins> shoot growth and limited secondary thickening (Tyree and Sperry, 1988; Tyree et al., 1998; Comas et al., 2002). Dwarf trees often exhibit poorer hydraulic performance and are also less resistant to abiotic stress, pests, and diseases compared to vigorously growing trees (Atkinson et al. 1999; Trifilo et al. 2007; Bauerle et al. 2011; Hajagos and Végvári 2013; Albacete et al. 2015). Therefore, vigorous tree growth <del>can be a</del><ins>may</ins> result <del>of</del> <ins>from</ins> <ins>both</ins> faster growth rate<ins>s</ins> and<del>/or</del> prolonged growth period during the growing season, including <del>the</del> periods of drought.`,
        `Regular fruit-bearing in successive <del>growing</del> <ins>fruiting</ins> seasons is another desirable trait of fruit trees. However, many fruit trees, including <ins>the</ins> apple and pear trees, are prone to an irregular bearing. In an extreme case, fruit trees <del>can</del> give very high fruit yields in one year (i.e., “on” year) and very low fruit yields (or no fruits at all) in the next year (i.e., “off” year). Such alternate bearing often results in considerable economic loss to <ins>the</ins> growers. Irregular <ins>fruit</ins> bearing is triggered and controlled by a combination of exogenous (e.g., late frost, dry summer) and endogenous (hormones, nutrients) factors (Goldschmidt 2005). It is well-known that some fruit tree species and some cultivars are more prone to irregular bearing than others due to their different susceptibility to environmental factors (Monselise and Goldschmidt 1982) or <ins>the</ins> different branching and bearing patterns associated with their growth habits (Lauri et al. 1995, 2014). Although the physiological basis of these differences remains insufficiently understood, cycling of stored non-structural carbohydrates (e.g., starch, glucose, fructose, sucrose) and other reserve nutrients appears to be one of the factors which can drive susceptibility of fruit trees to alternate bearing (Goldschmidt 2013). Specifically, <ins>the</ins> depletion of carbohydrate reserves due to high production of fruits and/or long-lasting exposure to stress conditions during one year can lead to low production of fruits in the following season during which the carbohydrate levels are replenished (Baninasab and Rahemi, 2006). Because developing fruits <del>represent</del> <ins>indicate</ins> strong carbohydrate sink (Monselise and Goldschmidt 1982; Martínez-Alcántara et al. 2015; Capelli et al. 2016), the alternation of cropping presumably allows trees to maintain a balance between vegetative growth and reproduction under limited nutrients (Goldschmidt 2013).`
      ],
      comments: [
        { label: "Clarity", note: "Restructured the opening paragraph to eliminate repetitive phrasing while preserving botanical names and citations." },
        { label: "Terminology", note: "Refined horticultural terms (e.g., 'grown' to 'cultivated', 'precocity') for a more specialized audience." }
      ]
    },
    {
      eyebrow: "Page 4 of 4 - Alternate bearing and xylem properties",
      heading: "Alternate bearing and xylem properties",
      variant: "science",
      body: [
        `<ins>Also, the</ins> <del>P</del>properties of secondary xylem (i.e., wood) affect long-distance water transport as well as storage of carbohydrates. Therefore, differences in <ins>the</ins> xylem structure and related functional properties may significantly affect both <ins>the</ins> vegetative growth of fruit trees and their susceptibility to alternate bearing. The xylem of apple and pear trees consists of three morphologically and functionally distinct cell types: i) vessel elements, ii) parenchyma cells (axial and ray parenchyma), and iii) libriform fibres. Vessel elements are longitudinally-elongated<del>,</del> dead cells conducting water and dissolved compounds <del>on</del> <ins>to</ins> long-distances in the direction <del>from</del> <ins>of</ins> roots to leaves. <ins>The</ins> <del>D</del>dimensions and density of <ins>the</ins> vessels drive the maximum transport capacity of <ins>the</ins> xylem. According to the Hagen-Poiseuille law describing laminar flow in a capillary, hydraulic conductivity of a vessel increases with the fourth power of its diameter (Tyree and Zimmermann 2002). Positive correlations between vessel dimensions, hydraulic efficiency, and tree growth were reported in natural stands (Gleason et al. 2012) and managed plantation trees (Fichot et al. 2011). Wider and more numerous vessels were also observed in <del>invigorating</del> <ins>vigorous growing</ins> <ins>trees</ins> compared to dwarfing rootstocks in a wide range of fruit tree species (Olmstead et al. 2006; Goncalves et al. 2007; Tombesi et al. 2010a, b; Tombesi et al. 2011; Martínez-Alcántara et al. 2013; Bruckner and DeJong 2014; Chen et al. 2015).`,
        `Compared to vessel characteristics, the anatomy of ray and axial parenchyma is less frequently studied, in spite of their importance <del>for</del> <ins>in</ins> nutrient storage and transport (Sauter and van Cleve 1992, Pfautsch et al. 2015, Plavcová et al. 2016). Living parenchyma cells mediate short-distance<del>,</del> symplastic transport (Pfautsch et al. 2015) and serve as storage sites for water (Tyree and Zimmermann 2002; Jupa et al. 2016), carbohydrates (Plavcová et al. 2016), and other nutrients (Sauter and van Cleve 1992). Ray parenchyma provides a direct<del>,</del> radial connection between the <ins>tree</ins> bark, wood, and pith (Sokolowska et al. 2012), while <ins>the</ins> axial parenchyma facilitates greater contact fraction with <ins>the</ins> vessels (Morris et al. 2018, Słupianek et al. 2019). Compared to vessels, the links between tree growth and <ins>the</ins> parenchyma anatomy are less <del>well</del> understood, although several studies <ins>had</ins> reported greater proportions of rays and bark in dwarfing rootstocks of fruit trees (Beakbane and Thompson 1940, Chen et al. 2015). Given the important roles of <ins>the</ins> parenchyma cells in storage and translocation of carbohydrates and other reserve<ins>d</ins> compounds, differences in <ins>the</ins> parenchyma proportions may be related to <ins>its</ins> susceptibility to alternate bearing.`,
        `In this study, we analyse<ins>d</ins> <ins>the</ins> anatomical differences in fifteen scion/rootstock combinations of apple and pear trees and test<ins>ed</ins> <del>if</del> <ins>whether</ins> <ins>the</ins> structural properties of xylem in <ins>the</ins> shoots and roots are linked to <ins>the</ins> growth vigour and susceptibility to alternate bearing. We expect that trees with high grow<ins>th</ins> vigour will have greater xylem cross-sectional area and wider vessels (translating into higher hydraulic capacity) and lower proportions of bark and ray parenchyma. We also hypothesized that low parenchyma fractions might be associated with high susceptibility of trees to <del>the</del> irregular bearing. To <del>get insights into</del><ins>better understand the</ins> actual tree growth performanc<ins>e</ins>, the anatomical differences between <ins>the</ins> dwarfing and vigorously growing trees are complemented with measurements of leaf water potential and trunk radial increments during summer drought.`
      ],
      comments: [
        { label: "Transition", note: "Added transitional phrasing to better connect the discussion of alternate bearing to xylem properties." },
        { label: "Grammar", note: "Corrected verb tenses and article usage (e.g., 'analyse' to 'analysed') to consistently report past methodology." }
      ]
    }
  ];
}

function createChemistryPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 4 - Abstract and introduction",
      heading: seed.documentTitle,
      variant: "science",
      body: [],
      blocks: [
        { type: "paragraph", role: "title", text: "A Heteroleptic Bimetallic Pt-doped Cu-rich Hydrides Nanocluster" },
        { type: "paragraph", role: "heading", text: "Abstract" },
        {
          type: "paragraph",
          role: "body",
          text: `An atomically precise heteroleptic Pt-doped Cu-rich <ins>hydride</ins> <del>hydrides</del> nanocluster [PtH<sub>2</sub>@Cu<sub>14</sub>{dtc}<sub>6</sub>(C<sub>2</sub>Ph)<sub>6</sub>] (<strong>PtH<sub>2</sub>Cu<sub>14</sub>-dtc</strong>) has been <ins>successfully</ins> synthesized. <ins>This was achieved by</ins> <del>the addition of</del><ins>introducing</ins> a discrete Pt(II) precursor <del>into</del><ins>to</ins> the copper hydrides nanocluster [Cu<sub>28</sub>H<sub>15</sub>{dtc}<sub>12</sub>](PF<sub>6</sub>) in the presence of terminal alkynes. <del>The X-ray diffraction studies determine the</del> structure of PtH<sub>2</sub>Cu<sub>14</sub> <ins>determined by X-ray diffraction reveals</ins><del> as</del> a bicapped icosahedral copper(I) cage encapsulating a linear platinum dihydride [PtH<sub>2</sub>]<sup>2-</sup> unit. The interstitial hydrides <del>exhibit a five-coordinated hydride</del><ins>are arranged in</ins> a trigonal bipyramidal (<em>tbp</em>) <del>cavity</del><ins>geometry with a five-coordinated hydride</ins> <del>and have been</del><ins>as</ins> confirmed by <sup>2</sup>H NMR and ESI-MS measurements.`
        },
        { type: "paragraph", role: "heading", text: "Introduction" },
        {
          type: "paragraph",
          role: "body",
          text: `Atomically precise alloy nanoclusters (NCs) are gaining <del>more</del><ins>increasing</ins> interest and experiencing explosive growth.<sup>1-3</sup> <ins>This is</ins> due to their <del>correlation of structure-property correlation,</del><ins>optical and electronic properties,</ins><sup>7-12</sup> as well as their structure-property <ins>correlation</ins><sup>4-6</sup> and promising applications in catalysis.<sup>13-17</sup> Among these alloy <ins>NCs</ins>, copper-rich alloy <ins>NCs</ins> are <ins>particularly noteworthy. They</ins> <del>composed</del><ins>consist</ins> of low-cost and earth-abundant elements and show fascinating potential applications, including chirality<sup>18-21</sup>, catalysis<sup>22-28</sup>, and luminescent materials<sup>29-36</sup>. <del>Nevertheless</del><ins>However</ins>, in contrast to the <del>swift</del><ins>rapid</ins> advancement of gold and silver alloy clusters, <del>the susceptibility of copper to oxidation presents difficulty</del><ins>NCs face significant challenges</ins> in achieving <del>stable stability copper NCs</del> during synthesis due to their <ins>susceptibility to oxidation</ins>, <del>low stability toward air</del>, which hinders their application.`
        },
        {
          type: "paragraph",
          role: "body",
          text: `To address these <del>issues</del><ins>challenges</ins>, one of the effective synthetic approaches <del>by</del><ins>involves</ins> doping the <del>homometallic</del> copper hydride <ins>NCs</ins> with <del>heterometallic</del><ins>heterometal</ins> salts such as gold (Au)<sup>32,33,38,39</sup>, silver (Ag)<sup>32,33,35,38</sup>, palladium (Pd)<sup>26,40,41</sup>, and platinum (Pt)<sup>27</sup> to explore their structure-property <ins>correlation</ins><del>correlation</del>. For instance, doping <del>of</del> Au and Ag atoms into the polyhydrido copper hydride <del>nanoclusters</del> [Cu<sub>28</sub>H<sub>15</sub>{dtc}<sub>12</sub>](PF<sub>6</sub>)<sup>42</sup>, [Cu<sub>20</sub>H<sub>11</sub>{dtp}<sub>9</sub>]<sup>43-44</sup>, and [Cu<sub>30</sub>H<sub>18</sub>{dtp}<sub>12</sub>]<sup>40</sup> in the presence of <ins>phenylacetylene</ins><del>phenylacetylene</del> generated yields [M@Cu<sub>12</sub>{dtc/dtp}<sub>6</sub>(C<sub>2</sub>Ph)<sub>4</sub>]<sup>+</sup>. Where <ins>dtc</ins> = {S<sub>2</sub>CN<sup>n</sup>Bu<sub>2</sub>} and <ins>dtp</ins> = {S<sub>2</sub>P(R)<sub>2</sub>} (R = O<sup>i</sup>Pr, O<sup>n</sup>Pr, and CH<sub>2</sub>CH<sub>2</sub>Ph) cluster<sup>32-33</sup>. The core structure of these clusters <del>presents</del><ins>features the</ins> an Au- or Ag-centered`
        }
      ],
      comments: [
        { label: "CH1", note: "Preserved chemical formula formatting and clarified the abstract's synthesis route.", anchor: 2 },
        { label: "CH2", note: "Updated the introduction to retain nanocluster terminology and visible citation markers.", anchor: 4 }
      ]
    },
    {
      eyebrow: "Page 2 of 4 - Introduction continued",
      heading: "Introduction",
      variant: "science",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "body",
          text: `<del>or (Ag)-centered</del> Cu<sub>12</sub> cuboctahedron. The <ins>resulting Au- and Ag-doped species</ins><del>doped species Au-doped and Ag-doped Cu-based</del> exhibit disparities in their optical and electrical characteristics and stability compared to their template precursor.<sup>32-33</sup> <del>By a similar synthetic procedure</del><ins>Similarly</ins>, Cu-rich hydride alloy <del>nanoclusters</del> [PdCu<sub>14</sub>H<sub>2</sub>{dtc/dtp}<sub>6</sub>(C<sub>2</sub>Ph)<sub>6</sub>]<sup>40</sup> were <del>generated</del><ins>synthesized</ins> from the reaction of copper hydride clusters [Cu<sub>28</sub>H<sub>15</sub>{dtc}<sub>12</sub>](PF<sub>6</sub>) or [Cu<sub>20</sub>H<sub>11</sub>{dtp}<sub>9</sub>] in the presence of <ins>a</ins> Pd precursor and phenylacetylene. The copper cage displays a <del>D3d</del><ins>D<sub>3d</sub></ins> bicapped icosahedron, with Pd <ins>occupying</ins> the center <del>occupied by Pd position</del>. Two hydrides were <del>within</del><ins>embedded in the PdCu<sub>14</sub> core</ins><del> were embedded, which and strongly</del> linearly bonded to Pd.<sup>40</sup> Furthermore, the stable copper dihydride [Cu<sub>11</sub>H<sub>2</sub>{dtp}<sub>6</sub>C<sub>2</sub>Ph)<sub>3</sub>]<sup>45</sup> <del>was used</del><ins>serves</ins> as a template precursor <del>and that</del> reacts with a foreign metal ion (Au<sup>+</sup>, Ag<sup>+</sup>, and Pd<sup>2+</sup>) to <del>generate</del><ins>yield</ins> new compounds, namely: [AgH<sub>2</sub>Cu<sub>14</sub>{dtp}<sub>6</sub>(C<sub>2</sub>Ph)<sub>6</sub>]<sup>+</sup> with Ag centered Cu<sub>12</sub> icosahedron <ins>capped</ins><del>capping</del> by two supplementary Cu atoms in the opposite faces along with two interstitial hydrides, [AuCu<sub>11</sub>{dtp}<sub>6</sub>(C<sub>2</sub>Ph)<sub>3</sub>Cl] and [PdCu<sub>11</sub>H{dtp}<sub>6</sub>C<sub>2</sub>Ph)<sub>3</sub>] with the vacancy defect Au@Cu<sub>11</sub> and PdH@Cu<sub>11</sub> cuboctahedral core.<sup>38,46</sup> In recent studies, a hydride-containing Pt-doped Cu-rich <ins>nanocluster</ins> [PtH<sub>2</sub>Cu<sub>14</sub>{dtp}<sub>6</sub>(C<sub>2</sub>Ph)<sub>6</sub>] (<strong>PtH<sub>2</sub>Cu<sub>14</sub>-dtp</strong>) <del>has been generated</del><ins>was synthesized</ins> from the reaction of by [Cu<sub>20</sub>H<sub>11</sub>{dtp}<sub>9</sub>] <del>with</del><ins>and</ins> [Pt{dtp}<sub>2</sub>] in the presence of <del>the an alkynyl ligand</del>. This cluster <del>which established</del><ins>demonstrates</ins> <del>the an</del> exceptional <del>catalysts</del><ins>catalytic</ins> activity toward <ins>the</ins> hydrogen evolution reaction (HER).<sup>27</sup>`
        },
        {
          type: "paragraph",
          role: "body",
          text: `The arrangement of 14 metal atoms in a bicapped icosahedral form <del>could be considered</del><ins>can be regarded as</ins> a prototype of copper (I) surrounded by heteroleptic ligands such as <ins>alkynyl</ins> and dtp/dtc. <del>For example</del><ins>Examples include</ins>; [CuH<sub>2</sub>@Cu<sub>14</sub>{dtc}<sub>6</sub>(C<sub>2</sub>Ph)<sub>6</sub>]<sup>+</sup>,<sup>39</sup> [AgH<sub>2</sub>@Cu<sub>14</sub>{dtp}<sub>6</sub>(C<sub>2</sub>Ph)<sub>6</sub>]<sup>+</sup>,<sup>38</sup> [PdH<sub>2</sub>@Cu<sub>14</sub>{dtp/dtc}<sub>6</sub>(C<sub>2</sub>Ph)<sub>6</sub>],<sup>41</sup> and [PtH<sub>2</sub>@Cu<sub>14</sub>{dtp}<sub>6</sub>(C<sub>2</sub>Ph)<sub>6</sub>],<sup>27</sup> <del>which</del><ins>Each of these clusters</ins> <del>all house</del><ins>contains</ins> an encapsulated H-M-H unit at the center of the icosahedron. The heteroleptic ligands are required for <del>directly directly capping on</del> the cluster surface <del>in order to stabilize</del><ins>ensure the stability of the NCs</ins> and prevent aggregation. The utilization of <ins>dtp</ins> and <ins>dtc</ins> ligands <ins>plays</ins><del> has important</del><ins>a crucial</ins> role <del>to</del><ins>in</ins> determining the coordination mode of the interstitial hydride <del>inside</del><ins>within</ins> the 14 metal atoms of the bicapped icosahedral structure, <del>where as confirmed by</del> neutron diffraction analyses <del>have proven the coordination mode</del>. For <del>instance</del><ins>example</ins>, the coordination mode of <ins>the</ins> interstitial hydride, <ins>stabilized</ins><del>which stabilizes</del> by <ins>the</ins> dtc ligand in [CuH<sub>2</sub>@Cu<sub>14</sub>{dtc}<sub>6</sub>(C<sub>2</sub>Ph)<sub>6</sub>]<sup>+</sup> and [PdH<sub>2</sub>@Cu<sub>14</sub>{dtc}<sub>6</sub>(C<sub>2</sub>Ph)<sub>6</sub>], presents <del>the trigonal-bipyramidal</del> cavities in MCu<sub>14</sub>, while <del>utilizing</del> in the dtp ligand in [AgH<sub>2</sub>@Cu<sub>14</sub>{dtp}<sub>6</sub>(C<sub>2</sub>Ph)<sub>6</sub>]<sup>+</sup>, [PdH<sub>2</sub>@Cu<sub>14</sub>{dtp}<sub>6</sub>(C<sub>2</sub>Ph)<sub>6</sub>], and [PtH<sub>2</sub>@Cu<sub>14</sub>{dtp}<sub>6</sub>(C<sub>2</sub>Ph)<sub>6</sub>], the hydride <del>bonded into MCu<sub>14</sub></del><ins>forms trigonal pyramidal cavities that are bonded into MCu<sub>13</sub>.</ins>`
        }
      ],
      comments: [
        { label: "CH3", note: "Preserved the visible ligand and cluster formulas while clarifying the comparative copper-rich cluster discussion.", anchor: 0 },
        { label: "CH4", note: "Retained the heteroleptic ligand discussion and handled the green correction as inserted text.", anchor: 1 }
      ]
    },
    {
      eyebrow: "Page 3 of 4 - Synthesis and results",
      heading: "Synthesis PtH2Cu14-dtc",
      variant: "science",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "body",
          text: `<del>Herein</del><ins>In this study</ins>, we report the synthesis of a <ins>dtc</ins> ligand and <ins>alkynyl</ins> protected Pt-doped Cu-rich <ins>nanocluster</ins> [PtH<sub>2</sub>Cu<sub>14</sub>{dtc}<sub>6</sub>(C<sub>2</sub>Ph)<sub>6</sub>] (dtc={S<sub>2</sub>CN<sup>n</sup>Bu<sub>2</sub>}) (<strong>PtH<sub>2</sub>Cu<sub>14</sub>-dtc</strong>), by treating <del>the phenylacetylene</del> with <del>dithio carbamate-stabilized</del> copper hydrides [Cu<sub>28</sub>H<sub>15</sub>{dtc}<sub>12</sub>](PF<sub>6</sub>) cluster in the presence of [Pt{dtp}<sub>2</sub>] salts. The crystal structure of the <strong>PtH<sub>2</sub>Cu<sub>14</sub>-dtc</strong> NC was <del>resolved</del><ins>determined</ins> using X-ray crystallography. The results showed that <del>the</del> <strong>PtH<sub>2</sub>Cu<sub>14</sub>-dtc</strong> NC has a <del>bicapped</del> icosahedral Cu<sub>14</sub> cage surrounded by six <del>dithiocarbamates</del> (dtc) and six phenylacetylenes. Moreover, the two hydrides of <strong>PtH<sub>2</sub>Cu<sub>14</sub>-dtc</strong> are in a μ<sub>5</sub>-H trigonal bipyramidal geometry within the PtCu<sub>14</sub> cavity. In addition, only a few examples of atomically precise metal <ins>NCs</ins> stabilized by <ins>heteroleptic</ins> mixed ligand <ins>dtc</ins> and <ins>alkynyl</ins>/phosphine have been reported.<sup>32-33,39,41,47-50</sup> Based on <del>this</del><ins>these</ins> findings, <ins>understanding</ins> the structural details of <del>the alloy</del> Pt-doped Cu-based hydride <ins>NCs</ins> protected by heteroleptic of <ins>dtc</ins> and <ins>alkynyl</ins> ligands can <del>improve</del><ins>enhance</ins> our fundamental comprehension of their structure-dependent characteristics.`
        },
        { type: "paragraph", role: "heading", text: "Synthesis PtH<sub>2</sub>Cu<sub>14</sub>-dtc" },
        {
          type: "paragraph",
          role: "body",
          text: `In a flame-dried <del>Schlenk</del> tube, [Cu<sub>28</sub>H<sub>15</sub>{dtc}<sub>12</sub>](PF<sub>6</sub>), (0.1 g, 0.022 mmol) was suspended in THF (5 mL) along with <ins>phenylacetylene</ins> (25 μL, 0.22 <ins>mmol</ins>) and [Pt{dtp}<sub>2</sub>] (0.015 g, 0.022 <ins>mmol</ins>); The resulting mixture was stirred at ambient temperature for 48 hours. The solvent was <ins>then</ins> evaporated under a vacuum. The <del>obtained</del><ins>resulting</ins> powder was washed with water, extracted <ins>with</ins> diethyl dichloromethane and <del>then again</del> evaporated under <del>a</del> vacuum. The precipitates was washed with methanol (3x5 mL) to remove the impurities <del>of</del><ins>from</ins> the ligand. The residue was extracted <del>within</del> dichloromethane and filtered <del>through the</del><ins>using</ins> aluminium oxide. Finally, the solvent was evaporated to dryness under vacuum, <del>to get</del><ins>resulting in</ins> a dark purple precipitate of [PtH<sub>2</sub>@Cu<sub>14</sub>{dtc}<sub>6</sub>(C<sub>2</sub>Ph)<sub>6</sub>].`
        },
        { type: "paragraph", role: "heading", text: "Result and Discussion" },
        {
          type: "paragraph",
          role: "body",
          text: `<ins>The</ins> <strong>PtH<sub>2</sub>Cu<sub>14</sub>-dtc</strong> cluster was isolated from the reaction of [Cu<sub>28</sub>H<sub>15</sub>{dtc}<sub>12</sub>](PF<sub>6</sub>), [Pt{dtp}<sub>2</sub>] and phenylacetylene; in a <del>1:1:12</del> mole ratio <ins>of 1:1:12</ins> <del>respectively</del>, as shown in Scheme 1. The reaction was carried out in THF at ambient conditions and a yield of 23.43 % was <ins>obtained</ins> after 48 hrs. The byproducts of the reaction have been identified as [Cu<sub>8</sub>H{dtc}<sub>6</sub>] and styrene.<sup>33</sup> No additional reducing agents <del>are</del><ins>were</ins> added and the reduction of Pt(II) in the complex to Pt(0) in the bimetallic cluster is attributed to the hydrides in the parent cluster. <del>The</del> Gas evolution <del>of gas was noted and is ascribed</del><ins>was observed, which is a</ins> <del>to the reaction</del><ins>result</ins> of the terminal alkyne's relatively acidic proton of the terminal alkyne reacting with the hydrides of the copper precursor. The hydrides were assumed to be the partial <del>reductant</del><ins>responsible</ins> for`
        }
      ],
      comments: [
        { label: "CH5", note: "Kept the synthesis heading and procedure while preserving formula and reagent notation.", anchor: 1 },
        { label: "CH6", note: "Retained the visible result discussion and stopped the sentence where the screenshot continues.", anchor: 4 }
      ]
    },
    {
      eyebrow: "Page 4 of 4 - Spectroscopy discussion",
      heading: "Result and Discussion continued",
      variant: "science",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "body",
          text: `converting Pt(II) to Pt(0) and alkynes into alkenes. The deuteride analogue PtD<sub>2</sub>@Cu<sub>14</sub>{dtc}<sub>6</sub>(C<sub>2</sub>Ph)<sub>6</sub> (<strong>PtD<sub>2</sub>Cu<sub>14</sub>-dtc</strong>, yield: 20.93%) was achieved using similar protocols, with the substitution of hydride for <ins>deuterides</ins> in the initial copper cluster.`
        },
        {
          type: "paragraph",
          role: "body",
          text: `The <del>electrospray</del> ionization mass spectrum (ESI-MS) of the cluster <strong>PtH<sub>2</sub>Cu<sub>14</sub>-dtc</strong> is shown in Figure 1, <del>suggesting the</del><ins>It displays a</ins> characteristic peak <del>corresponding to PtH<sub>2</sub>Cu<sub>14</sub>-dtc+H<sup>+</sup>} at</del> m/z 2918.2 Da (calc. m/z 2918.76 Da), <ins>which corresponds to [PtH<sub>2</sub>Cu<sub>14</sub>-dtc+H]<sup>+</sup>.</ins> <del>and</del>The isotopic pattern <del>is in excellent agreement with</del><ins>closely matches the simulation as shown in the inset of</ins> Figure 1. <del>Moreover</del><ins>Furthermore</ins>, the ESI-MS analysis of the deuteride analogue <strong>PtD<sub>2</sub>Cu<sub>14</sub>-dtc</strong> confirmed the presence of two deuterides, <del>by showing a</del><ins>This is indicated by</ins> a peak at m/z 2920.68 Da (calc. m/z 2920.77 Da) (Figure S1), which can be <del>assign represented</del><ins>assigned</ins> to [PtD<sub>2</sub>Cu<sub>14</sub>-dtc+H]<sup>+</sup>. The simulation and experiment isotopic <del>patterns show a good</del> exhibit a strong <del>resemblance</del> in Figure S1: (Inset).`
        },
        {
          type: "paragraph",
          role: "body",
          text: `The <sup>1</sup>H NMR spectrum of the <strong>PtH<sub>2</sub>Cu<sub>14</sub>-dtc</strong> cluster shows one set of alkynyls and two sets of alkyl groups corresponding to the <ins>dtc</ins> ligand (Figure 2a). The NMR spectrum indicates <del>that there is no</del> presence of two-fold axis in the <ins>dtp</ins> ligand environment surrounding the cluster core. The <del>two hydrides</del> of the PtH<sub>2</sub> unit inside the Cu<sub>14</sub> cage are associated with a resonance peak at 2.73 ppm in CDCl<sub>3</sub> with <ins>the</ins> a coupling constant of platinum <del>dihydride</del> (J<sub>Pt-H</sub>) at 463.44 Hz. Meanwhile, the presence of the two hydrides is supported by <sup>1</sup>H{<sup>195</sup>Pt} HMQC without decoupling, echoed at 2.95 ppm and the <sup>1</sup>H{<sup>195</sup>Pt} HMQC decoupling shows a doublet peak with a J<sub>Pt-H</sub> coupling constant of 686.2 Hz (Figure Sx-Sx). <del>In</del> Additionally, the <sup>195</sup>Pt NMR spectrum depicts a peak at -4931.3 ppm, which is slightly higher compared to the <sup>195</sup>Pt NMR of Pt(0) that was reported in the <ins>dtp</ins> derivatives <strong>PtH<sub>2</sub>Cu<sub>14</sub>-dtp</strong> (δ<sub>Pt</sub> = -4875.3 ppm), [Pt(PMe<sub>2</sub>Ph)<sub>4</sub>] (δ<sub>Pt</sub> = -4728 ppm), and [Pt(1.5-cyclooctadiene)2] (δ<sub>Pt</sub> = -4636 ppm) (Figure Sx).<sup>57</sup> The presence of two hydrides in <strong>PtH<sub>2</sub>Cu<sub>14</sub>-dtc</strong> is <del>additionally</del><ins>further</ins> verified by the <sup>2</sup>H NMR spectrum of its deuteride analogue (<strong>PtD<sub>2</sub>Cu<sub>14</sub>-dtc</strong>), <del>which It shows</del><ins>displays</ins> a signal at 2.91 ppm in CHCl<sub>3</sub> with a coupling constant of platinum deuteride (J<sub>Pt-D</sub>) is 106.19 Hz (Figure 2b). The <sup>13</sup>C NMR of <strong>PtD<sub>2</sub>Cu<sub>14</sub>-dtc</strong> is shown in Figure 2a. The <sup>13</sup>C NMR spectrum revealed that the peaks at 201.75, 56.52, 29.18, 20.16, and 13.74 ppm agree with the <em>n</em>-butyl group <ins>dtc</ins> ligand. Meanwhile, the peaks at 132.69, 127.29, 126.29, 125.54, <del>and</del> 89.31 and 77.29 ppm equate to <sup>13</sup>C NMR of the phenyl ring and triple bond in phenylacetylene ligands (Figure S3). The FT-IR investigation <del>confirmed</del><ins>revealed</ins> that the C<sub>2</sub>Ph ligands were coordinated, as <del>evidenced</del><ins>confirmed</ins> by the stretching frequency (ν<sub>C≡C</sub>) for the coordinated C<sub>2</sub>Ph ligands of <strong>PtH<sub>2</sub>Cu<sub>14</sub>-dtc</strong> at 1955.9 cm<sup>-1</sup>, which is significantly <del>shift</del><ins>different</ins> from free phenylacetylene (ν = 2110 cm<sup>-1</sup>) (Figures S4). Elemental analysis further confirms the chemical purity of`
        }
      ],
      comments: [
        { label: "CH7", note: "Preserved ESI-MS, isotope, NMR, and FT-IR notation while excluding the screenshot popup overlay.", anchor: 1 },
        { label: "CH8", note: "Kept the sample endpoint at the visible unfinished elemental-analysis sentence.", anchor: 2 }
      ]
    }
  ];
}

function createLawPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 3 - IT law and footnotes",
      heading: seed.documentTitle,
      variant: "document",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "body",
          text: `<em>Information and communication technology law</em> (<ins>hereinafter,</ins> IT law <del>for short</del>) of the European Union <del>is a special field that includes</del><ins>constitutes a distinct and evolving field</ins> <del>the</del> of legal regulations. <ins>It encompasses the framework of</ins><del>n</del> the "digital single market"<sup>2</sup> in "digital Europe",<sup>3</sup> including global`
        },
        {
          type: "paragraph",
          role: "footnote",
          text: `<sup>2</sup> The term "digital single market" was first used in the "Monti Report" (Commission Communication COM (2010) 608, 27.10.2010, p. 11).`
        },
        {
          type: "paragraph",
          role: "footnote",
          text: `<sup>3</sup> Regulation (EU) 2021/694 of 29.4.2021 establishing the Digital Europe Programme, OJ L 166, 11.5.2021, p. 1.`
        }
      ],
      comments: [
        { label: "LAW1", note: "Clarified the definition of IT law while retaining the visible references to the digital single market and Digital Europe.", anchor: 0 },
        { label: "LAW2", note: "Preserved the visible legal footnotes and their source details.", anchor: 1 }
      ]
    },
    {
      eyebrow: "Page 2 of 3 - Scope and theoretical prerequisites",
      heading: "Information technology law",
      variant: "document",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "body",
          text: `references. In terms of content, <ins>IT law</ins> <del>it is about the recording of</del> addresses <ins>new</ins> the emergence <ins>and regulations of</ins>`
        },
        {
          type: "paragraph",
          role: "list",
          text: `<mark>Market structures, <del>new services, and new market behaviours</del> due to digital transformation;</mark>`
        },
        {
          type: "paragraph",
          role: "list",
          text: `<mark><del>In order to enable f</del>Fair competition, protection, through framework regulations <ins>that guide the data economy, including:</ins></mark>`
        },
        { type: "paragraph", role: "sublist", text: "Rights of disposal over data," },
        { type: "paragraph", role: "sublist", text: "Rights of access to data," },
        { type: "paragraph", role: "sublist", text: "Control of dangerous algorithms," },
        { type: "paragraph", role: "sublist", text: "Protection of personal data that aligns with the Union law;" },
        {
          type: "paragraph",
          role: "list",
          text: "Technical prerequisites of digital communication, such as:"
        },
        { type: "paragraph", role: "sublist", text: "Standardisation," },
        { type: "paragraph", role: "sublist", text: "Frequency regulation," },
        { type: "paragraph", role: "sublist", text: "Data security," },
        { type: "paragraph", role: "sublist", text: "Electronic identification systems;" },
        {
          type: "paragraph",
          role: "list",
          text: "Means of communication, including devices, networks, and platforms;"
        },
        {
          type: "paragraph",
          role: "list",
          text: "Forms of communications, such as electronic contracts, electronic auctions, and social networks;"
        },
        {
          type: "paragraph",
          role: "list",
          text: "<mark>Regulation of communication contents, particularly fake news and hate speech.</mark>"
        },
        {
          type: "paragraph",
          role: "body",
          text: `<del>are required on the data economy (power of disposal over data; power of access to data; control of dangerous algorithms; data protection (protection of personal data); the technical prerequisites of digital communication (standardisation; frequency regulation; data security; electronic identifications; the means of communication (devices; networks; platforms); the forms of communication (electronic contracts; electronic auctions; social networks) as well as on how to deal with certain communication contents ("fake news", hate speech).</del>`
        },
        {
          type: "paragraph",
          role: "body",
          text: `<mark>The norms <del>for</del><ins>that govern</ins> IT law in the EU <del>would have to be provided by</del><ins>must be based on</ins> a theory that <del>not goes beyond only transferring</del> economic market theories <del>concepts into IT law</del><ins>in the digital sphere</ins>, <del>but also includes the</del><ins>Such a theory should also integrate</ins> immaterial values <del>for to</del> establish a just information order. Presently, no <del>s</del>Such a theory is not yet in sight<ins>exists</ins>, but However, <del>it can best be expected to emerge from a comprehensive broadly understood discipline of legal informatics, insofar as one defines the latter</del><ins>which could be described as a science of the prerequisites, applications, and consequences of information technology for law.</ins><sup>4</sup></mark>`
        }
      ],
      comments: [
        { label: "LAW3", note: "Converted the dense scope sentence into a clearer list while preserving the visible nested legal categories.", anchor: 1 },
        { label: "LAW4", note: "Kept the highlighted theoretical discussion and clarified the relationship between EU IT law and legal informatics.", anchor: 15 }
      ]
    },
    {
      eyebrow: "Page 3 of 3 - Theoretical discussion continued",
      heading: "Information technology law",
      variant: "document",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "body",
          text: `<mark>With regard to the theoretical prerequisites for the evaluation of information technology for law, it is necessary to clarify which values are to be <del>realised</del>, which properties, objects, and functions information <del>has</del><ins>possesses</ins>, and which elementary legal categories can be <del>considered</del><ins>serve</ins> as connecting factors for legal provisions. From a sociological perspective, information can be described as the power to choose alternatives ("selection power"). This <del>power to choose alternatives is</del> based on the fact that information as models for <del>segmenting</del> of the world (institutions; <del>organisations</del>; persons; areas of life; procedures; subsystems) can be <del>utilized</del><ins>utilised</ins> for certain purposes. Lack of access to information prevents participation; imperfect information <del>leads to</del><ins>creates</ins> uncertainties and risks; and asymmetric information distribution <del>causes</del><ins>results in</ins> unequal bargaining power. A just information order <del>would have to</del><ins>must therefore</ins> contribute to structuring and evaluating the knowledge about the interrelationships between electronic communication networks, services, products, processes and the rights of disposal to and use of information.</mark>`
        },
        {
          type: "paragraph",
          role: "footnote",
          text: `<sup>4</sup> Kilian, Why legal informatics? CR 2001, P. 132.`
        },
        {
          type: "paragraph",
          role: "body",
          text: `<mark>The digital recording of language, music, images, <del>behaviour</del>, conditions or production processes creates hierarchies of data that can basically be used for many purposes under the conditions of electronic data processing. If these data are stored, selected, combined, processed and evaluated for specific purposes by programmes, economically usable information and new business models can arise from them. Since the potential uses for data are not predictable, but can be used <del>innovatively</del> by artificial intelligence <del>programmes</del>, the question arises as to whether data should in principle be freely accessible or what property-like ("proprietary") rights should be <del>recognised</del>.</mark>`
        }
      ],
      comments: [
        { label: "LAW5", note: "Preserved the highlighted theoretical passage and retained the visible edits to terminology and legal-concept wording.", anchor: 0 },
        { label: "LAW6", note: "Kept the final highlighted paragraph exactly within the visible stopping point of the screenshots.", anchor: 2 }
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
  if (seed.key === "formatting") return createFormattingExamplePages(seed);
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

function createFormattingExamplePages(seed: ExampleSeed): WorkExamplePage[] {
  const allBlocks: WorkExampleBlock[] = [
    { type: "paragraph", role: "title", text: seed.documentTitle },
    ...formattingExampleBody.map((text): WorkExampleBlock => ({ type: "paragraph", role: "body", text })),
    { type: "paragraph", role: "heading", text: "Footnotes" },
    ...formattingExampleFootnotes.map((footnote): WorkExampleBlock => ({
      type: "paragraph",
      role: "footnote",
      text: `<sup>${footnote.n}</sup> ${footnote.text}`
    }))
  ];

  const pageBlocks: WorkExampleBlock[][] = [];
  let current: WorkExampleBlock[] = [];
  let currentSize = 0;

  allBlocks.forEach((block, index) => {
    const textSize = block.type === "paragraph" ? block.text.replace(/<[^>]+>/g, "").length : 500;
    const limit = pageBlocks.length === 0 ? 4300 : 5000;

    if (current.length > 0 && currentSize + textSize > limit && index > 1) {
      pageBlocks.push(current);
      current = [];
      currentSize = 0;
    }

    current.push(block);
    currentSize += textSize;
  });

  if (current.length > 0) pageBlocks.push(current);

  return pageBlocks.map((blocks, index) => ({
    eyebrow: `Page ${index + 1} of ${pageBlocks.length} - Formatting example`,
    heading: index === 0 ? seed.documentTitle : "From Fetish to Totality",
    variant: "humanities",
    body: [],
    blocks,
    comments: index === 0
      ? [
          { label: "FMT1", note: "Full document preview generated from the uploaded formatted DOCX, preserving paragraph order and footnote references.", anchor: 0 },
          { label: "FMT2", note: "Edited footnotes retain Word insertions and deletions as visible tracked changes.", anchor: Math.max(1, blocks.length - 1) }
        ]
      : []
  }));
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
      eyebrow: "Page 1 of 3 - Abstract and introduction",
      heading: seed.documentTitle,
      variant: "document",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "title",
          text: "Bitcoin’s Crossroads: Challenges and Opportunities in Future Societal Adoption"
        },
        {
          type: "paragraph",
          role: "heading",
          text: "ABSTRACT"
        },
        {
          type: "paragraph",
          role: "body",
          text: `This study explores the dynamic challenges and opportunities shaping <ins>the role of</ins> Bitcoin<del>'s role</del> as a potential mainstream currency in the evolving digital economy. <del>Amidst technological advancements and the increasing prominence of virtual currencies, t</del><ins>T</ins>his research delves <del>into</del><ins>examines how</ins> <ins>Bitcoin's acceptance and future adoption are affected by</ins> price volatility, security protocols, deflationary nature, and <del>unstandardised</del> regulations <del>impact</del><ins>amidst the increasing prominence of virtual currencies and technological advancements</ins>. <del>Bitcoin's acceptance and future adoption.</del> <del>Employing</del><ins>Using</ins> robust regression analysis and the Autoregressive Distributed Lag (ARDL) approach, <del>the</del><ins>this</ins> paper critically analyses data from 2011 to 2023 across three periods: the pre-pandemic, pandemic, and post-pandemic <del>timeframes</del>. The findings reveal a strong and positive <del>association between</del><ins>impact of</ins> Bitcoin's deflationary nature <del>and on</del> its future adoption, while price volatility and security incidents <del>exhibit have a weak</del> and negative and <del>negligible impacts, respectively</del>. The <del>unstandardised</del> regulation <del>establishes</del><ins>exhibits</ins> a mixed impact on <del>the future</del> adoption, contingent on the global events. The study underscores the need for clear, consistent, <del>harmonised</del> regulatory frameworks to support cryptocurrency growth, enhance market stability, and promote acceptance. <del>This Moreover, study it</del> navigates through <del>Bitcoin's</del> the challenges of Bitcoin, <del>toward</del> envisioning a stable and accepted digital currency landscape; <ins>and</ins> offering valuable insights for policymakers, investors, and the cryptocurrency community.`
        },
        {
          type: "paragraph",
          role: "body",
          text: "<strong>Keywords:</strong> Bitcoin Adoption; Price Volatility; Security; Deflation; Regulatory Framework."
        },
        {
          type: "paragraph",
          role: "heading",
          text: "1. INTRODUCTION"
        },
        {
          type: "paragraph",
          role: "body",
          text: `In the wake of unprecedented technological advancement, the Internet of Things (IoT) has become instrumental in reshaping connections and transactions (B. Lee & Lee, 2017), serving as the backbone for a new era where virtual currencies are challenging the long-established dominance of traditional fiat money (Fernandes, 2022). This paradigm shift is driven by a global consensus <del>on the need</del> for more efficient, transparent, and unrestricted financial mechanisms. As <ins>noted by</ins> D'Alfonso et al. (2016) <del>noted</del>, virtual currencies <del>promise offer</del> enhanced portability and accessibility, enabling users to <ins>seamlessly</ins> manage daily transactions <del>seamlessly</del> through E-wallets, moving away from conventional <del>perceptions</del><ins>forms</ins> of money such as paper cash and cards.`
        },
        {
          type: "paragraph",
          role: "body",
          text: `The transformation <ins>redefines the concept</ins> <del>extends to the very essence</del> of what is considered valuable currency. Traditional fiat currencies, including like the US dollar, British pound sterling (GBP), and Euro (EUR), now face significant risks of <del>obsolescence</del><ins>becoming obsolete</ins> in the face of the virtual currency revolution (Seetharaman et al., 2017). These currencies are <del>intrinsically tied</del><ins>closely linked</ins> to the economic health and policies of their respective issuing countries' <del>economic health and policies</del>, making them susceptible to financial crises resulting from poor fiscal decisions, inappropriate monetary policies, or unstable economies (Mirzayi et al., 2017). The global financial crisis of 2008, triggered by the collapse of the housing market`
        }
      ],
      comments: [
        { label: "EC1", note: "Reframed the abstract opening so Bitcoin's role and future adoption are stated more clearly.", anchor: 2 },
        { label: "EC2", note: "Moved the technology/adoption context into a clearer sequence and tightened repeated phrasing.", anchor: 2 },
        { label: "EC3", note: "Clarified the shift from fiat currency to virtual currency without extending beyond the visible source.", anchor: 6 }
      ]
    },
    {
      eyebrow: "Page 2 of 3 - Introduction continued",
      heading: "1. INTRODUCTION",
      variant: "document",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "body",
          text: `<del>Despite</del><ins>The rise of Bitcoin's</ins><del>rise</del> to prominence has been <del>as</del> a disruptive force against traditional financial institutions; <ins>However,</ins> its journey has been <del>marred</del><ins>characterised by several</ins> challenges, including security breaches and its use in illicit activities. Literature highlights the security vulnerabilities inherent in Bitcoin's infrastructure, making it a prime target for cybercriminals (Sharma, 2017). Furthermore, the encrypted nature of Bitcoin transactions poses significant challenges in tracking illicit activities, contributing to <del>its</del> the volatility and <ins>the</ins> skepticism surrounding its long-term viability as a currency. <del>Given that the</del><ins>The vulnerability of</ins> Bitcoin's price <del>was vulnerable</del> to excessive boom-and-bust events, <del>that</del> signifying <del>the</del> a repetitive bubble-crash effect, <del>submerging the Bitcoin price, this has given rise</del><ins>raises</ins> to <ins>the</ins> concerns <ins>about its future</ins><del>of Bitcoin's future</del>, as the exorbitant return and risk levels might lead <del>the Bitcoin</del> to participants <del>to be</del> withdrawing from the market. <del>On top of that</del><ins>Additionally</ins>, the fixed supply of <del>several</del> bitcoins capped at 21 million has <del>trigger</del><ins>triggered</ins> concerns <del>on</del><ins>about</ins> whether <del>the</del> Bitcoin can <del>keep</del><ins>maintain</ins> its value in the long term and whether <del>the</del> holders <del>of it</del> will hold onto it or sell it <del>out at some point in time</del>, causing <ins>its</ins> demand to decline (Baur et al., 2018; Douma, 2016; Fry & Cheah, 2016). Issues related to security (Moore & Christin, 2013), legality (Nour & Hamuda, 2023), regulation (Seetharaman, et al., 2017), deflationary potential (Cawrey, 2013; Xie et al., 2019), and volatility (Costantini et al., 2023; Urquhart, 2016) have also been critically assessed. Despite these concerns, <del>scholars'</del> research <ins>has suggested</ins> that`
        }
      ],
      comments: [
        { label: "EC4", note: "Separated the contrast between Bitcoin's rise and the security/volatility challenges that follow.", anchor: 0 },
        { label: "EC5", note: "Refined market-risk wording while preserving the visible citations and argument flow.", anchor: 0 }
      ]
    },
    {
      eyebrow: "Page 3 of 3 - Introduction continued",
      heading: "1. INTRODUCTION",
      variant: "document",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "body",
          text: `<del>the challenges facing</del> Bitcoin's <ins>challenges</ins> might <del>also be attributed</del><ins>have positive attributes</ins> (Fauzi et al., 2020; Hays, 2016; Sharma, 2017; Ying et al., 2018).`
        },
        {
          type: "paragraph",
          role: "body",
          text: `This study <del>aims to</del> investigates the inefficiencies and challenges of Bitcoin; <del>aiming to understand how these factors may influence its future</del> acceptance and <ins>future</ins> adoption within society. Specifically, it critically evaluates the multifaceted challenges associated with Bitcoin, such as its price volatility, security protocols, deflationary nature, and <del>unstandardised</del> regulation. By exploring these dimensions, the research intends to illuminate the potential impacts of these challenges <del>on Bitcoin's broader societal adoption</del><ins>of adopting Bitcoin</ins> as a cryptocurrency, thereby offering insights into the factors that could determine Bitcoin's future role and acceptance in the financial ecosystem. <del>The motivation behind t</del>This study <ins>emerges from</ins><del>the is motivated by</del> the significant discrepancies observed between the findings of existing empirical research <del>concerning both</del><ins>regarding</ins> the theoretical and practical dimensions of cryptocurrencies. <del>Furthermore Additionally, while various studies have endeavored to identify the key factors influencing Bitcoin's adoption and utility</del><ins>this study is motivated by</ins>, <del>there is a</del> the lack of research specifically addressing the specific challenges associated with Bitcoin that are of critical concern to users and investors alike. <ins>Previous studies have explored the factors influencing Bitcoin's adoption and utility</ins> <del>while</del><ins>with</ins> some <del>scholars deem it primary</del> favouring adoption <del>positively, others classify it as unfavorable, as mentioned above</del><ins>while others do not</ins>.`
        }
      ],
      comments: [
        { label: "EC6", note: "Kept the visible bridge sentence and converted the correction into an inserted phrase rather than a deletion.", anchor: 0 },
        { label: "EC7", note: "Tightened the study-purpose paragraph and stopped at the same point shown in the screenshot.", anchor: 1 }
      ]
    }
  ];
}

function createMarketingPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 2 - Customer experience",
      heading: seed.documentTitle,
      variant: "document",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "title",
          text: "What makes the best better?"
        },
        {
          type: "paragraph",
          role: "body",
          text: `This book <del>started</del><ins>began</ins> with a wonder and curiosity: <ins>why are some companies consistently able to deliver great customer experiences, while others struggle? about the difference in the ability to create consistently good customer experiences.</ins> Over the years, <del>w</del><ins>W</ins>e have all worked <del>with</del><ins>on</ins> developing new business strategies and <ins>strengthening</ins> customer focus <del>for several years. By the same token</del><ins>With equal interest</ins>, we have <del>with interest followed observed how almost</del> nearly all major companies <del>say that they want to be really</del><ins>declare on their websites, vision statements, and banners</ins> <del>good at dealing with</del><ins>that</ins> customers are their top priority. <del>On websites, in visions, on banners, etc., it can be read how the customers are the most important thing for the companies.</del> These are all meaningful and relevant objectives, <del>as</del><ins>After all, for the vast majority of companies, the retention of existing customers is</ins> the <ins>single</ins> most important source of future revenue <del>for the vast majority of companies is the retention of existing customers.</del>`
        },
        {
          type: "paragraph",
          role: "body",
          text: `<del>The surprise arose when, a</del>At one point, we <ins>decided to investigated</ins> the state of play in terms of the success rate in achieving these objectives. Across a wide range of industries, <del>we found that typically only a few</del><ins>only a handful of</ins> companies <del>within the sectors</del> actually <ins>succeed in</ins><del>truly managed to</del> getting customers to say that they <del>were really</del><ins>are genuinely</ins> happy to be their customers. For the vast majority of companies, customer satisfaction was average, which <del>and in</del> sharply contrasts with <del>to</del> the visions and <del>objectives</del><ins>promises stated by the companies displayed on websites, in mission statements, and on banners. This gap between aspiration and reality raises the central question in this book</ins><del>So, we asked ourselves the question</del>: What explains this difference? Or, in other words: What makes the best better?`
        },
        {
          type: "paragraph",
          role: "body",
          text: `<del>An</del><ins>This story</ins> explicitly explains <del>story unfolds</del> the question. A few years ago, Christian <del>was driving</del><ins>drove</ins> a car <del>produced by</del><ins>from</ins> a well-known American brand. When he <del>came by</del><ins>arrived at</ins> the dealership for his <del>yearly</del><ins>annual</ins> service, <ins>he was greeted by</ins> large banners <del>with the text</del><ins>proclaiming</ins> "We want completely`
        }
      ],
      comments: [
        { label: "BM1", note: "Recast the opening question so the customer-experience problem is clear from the first paragraph.", anchor: 1 },
        { label: "BM2", note: "Condensed repeated website/banner wording while preserving the business argument.", anchor: 1 },
        { label: "BM3", note: "Clarified the transition from company aspirations to measured customer satisfaction.", anchor: 2 }
      ]
    },
    {
      eyebrow: "Page 2 of 2 - Economic effects",
      heading: "The economic effects of happy customers",
      variant: "document",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "body",
          text: `satisfied customers"; <del>, and</del><ins>The same ambitious message was proclaimed at</ins><del>on</del> the counter <del>this ambitious message was repeated along with a picture of a big smiley face. The interesting part about this message is, that if you look at the annual survey of customer satisfaction in the car industry, you will see that</del><ins>But the reality is that</ins> year after year, this brand <ins>scores only</ins> average on the annual customer satisfaction <ins>survey</ins><del>score</del>. <del>Conversely</del><ins>In contrast, the survey</ins> shows that for more than 20 consecutive years, Toyota has <ins>been</ins> ranked number one (<del>and typically well</del><ins>far</ins> ahead <del>number two</del><ins>of the runner-up</ins>) <ins>in</ins> customer satisfaction <ins>in</ins> <del>at the</del> dealership and repair shops. <del>Again - and now more specifically</del><ins>So, we asked the question</ins>: What does Toyota do differently? What do the best do better in the car industry? The answer to this - and for other industries - is the focus of the book.`
        },
        {
          type: "paragraph",
          role: "heading",
          text: "The economic effects of happy customers"
        },
        {
          type: "paragraph",
          role: "body",
          text: `This book<del>s</del> primarily highlights why some <del>customers'</del><ins>customer</ins> experiences are so successful, <del>that they speak therefore, positively about a specific</del><ins>portraying a</ins> company <ins>within a particular industry.</ins> <del>The reason. w</del><ins>W</ins>e dedicated <del>an entire</del> this book to <ins>customer experience</ins><del>this is that</del><ins>because</ins> for most business models, a successful customer experience is the most important <del>source of foundation for running a</del> successful businesses.`
        },
        {
          type: "paragraph",
          role: "body",
          text: `Our interest in customer experience is closely linked to the fact that, for most companies, good customer experiences <del>is</del> are the <del>strongest</del><ins>best</ins> indicator of future sales and profitability. <del>If When customers are successful succeed in working together with your business, then you know that they will be</del> remain loyal (re-sales), <del>that they will meet return to future you when</del> new needs <del>with you</del> arise (up-selling/cross-selling), and <del>that they will</del> often recommend you and your business to their network (new sales)<del>.</del><ins>In essence, this book is about how to create better customer experiences that not only drive loyalty but also inspire recommendations of your company and products to others.</ins><del>Hence, the book is about how you succeed in creating better customer and recommendations of the company/products to others.</del>`
        }
      ],
      comments: [
        { label: "BM4", note: "Connected the car-service example to the measurable customer-satisfaction comparison.", anchor: 0 },
        { label: "BM5", note: "Preserved the section heading and refined the opening economic claim.", anchor: 2 },
        { label: "BM6", note: "Clarified the link between customer experience, loyalty, repeat sales, and recommendations.", anchor: 3 }
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

function createGeochemistryPages(seed: ExampleSeed): WorkExamplePage[] {
  return [
    {
      eyebrow: "Page 1 of 2 - Abstract",
      heading: seed.documentTitle,
      variant: "science",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "body",
          text: `<strong>Abstract:</strong><sup>[1]</sup> <del>In order t</del>To <del>test</del><ins>evaluate</ins> the potentiality of soil <del>CO2</del><ins>CO<sub>2</sub></ins> diffuse degassing measurements <del>for in the studying</del><ins>for the study</ins> of underground mass and heat transfer in geothermal systems, detailed surveys were <del>performed</del><ins>conducted</ins> at Latera caldera. <del>This site which</del><ins>This site provides</ins> an excellent test site, <del>because of</del><ins>due to</ins> the abundant available subsurface data. Over 2500 measurements of soil <ins>CO<sub>2</sub></ins><del>CO2</del> flux revealed that endogenous <ins>CO<sub>2</sub></ins><del>CO2</del> at Latera caldera concentrates on a NE-SW band coinciding with a structural high of fractured Mesozoic limestones hosting a water-dominated, high-enthalpy geothermal reservoir. The total hydrothermal <ins>CO<sub>2</sub></ins><del>CO2</del> degassing from the structural high <del>has been evaluated</del><ins>was estimated</ins> at 350 t d<sup>-1</sup> <del>d1 from</del><ins>across</ins> an area of 3.1 km<sup>2</sup>. <del>It has been estimated that such a CO2</del><ins>This</ins> release <del>would imply</del><ins>corresponds to</ins> a geothermal liquid flux of 263 kg s<sup>-1</sup>, <del>with</del><ins>and</ins> a heat <del>release</del><ins>output</ins> of 239 MW. The chemical and isotopic composition of the gas indicates a <del>provenance from the</del> geothermal reservoir <ins>origin, with</ins> <del>and that CO2</del><ins>CO<sub>2</sub></ins> is partly <del>originated</del><ins>derived from</ins> <del>by</del> thermal metamorphic decarbonation in the <del>hottest</del> deepest, hottest parts of the system and partly <del>has</del><ins>from</ins> a likely mantle origin. The ratios of <ins>CO<sub>2</sub></ins><del>CO2</del>, H<sub>2</sub>, CH<sub>4</sub>, and CO to Ar were used to estimate the reservoir <del>T-P conditions of the reservoir. Results</del> clustering at Temperature of 200-300C and Partial pressure of <ins>CO<sub>2</sub></ins><del>PCO2</del> 100-200 bars, <del>close to</del><ins>consistent with</ins> the actual well measurements. <ins>These findings demonstrate that soil CO<sub>2</sub> degassing surveys are an effective tool for detecting active geothermal reservoirs at depth, and that the H<sub>2</sub>-CO<sub>2</sub>-CH<sub>4</sub>-CO-Ar gas composition serves as a reliable geochemical indicator of temperature and pressure in CO<sub>2</sub>-rich geothermal systems.</ins> <del>Finally, the approach proved to be an excellent tool to investigate the presence of an active geothermal reservoir at depth and that the H2-CO2CH4-CO-Ar gas composition is a useful T-P geochemical indicator for such CO2 rich geothermal systems.</del>`
        }
      ],
      comments: [
        { label: "GC1", note: "Standardised chemical notation and clarified the purpose of the diffuse-degassing survey.", anchor: 0 },
        { label: "GC2", note: "Condensed the final abstract sentence into a clearer statement of geochemical significance.", anchor: 0 }
      ]
    },
    {
      eyebrow: "Page 2 of 2 - Introduction",
      heading: "Introduction",
      variant: "science",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "heading",
          text: "<green>Introduction</green>"
        },
        {
          type: "paragraph",
          role: "body",
          text: `<del>1. Introduction [2]</del> In the last decades, <del>a great interest</del><ins>significant attention</ins> has been addressed to the CO<sub>2</sub> <del>CO2</del> Earth degassing, <del>mainly for studies related to the</del><ins>not for its role</ins> global carbon <del>global</del> cycle [Allard et al., 1991; Brantley and Koepenick, 1995; Kerrick et al., 1995; Seward and Kerrick, 1996; Marty and Tolstikhin, 1998; Chiodini et al., 2000, 2004a; Kerrick, 2001] and for the monitoring of active volcanoes [Chiodini et al., 1996, 1998, 2001a, 2005; Hernandez et al., 1998; Brombach et al., 2001; Gerlach et al., 2001; Salazar et al., 2001; Frondini et al., 2004; Granieri et al., 2006]. These <del>latter studies highlighted</del><ins>showed</ins> that CO<sub>2</sub> <del>CO2</del> is <del>mostly primarily</del> released from well-defined <del>areas</del><ins>zones</ins>, recently <del>named</del><ins>termed</ins> diffuse degassing structures (DDS [Chiodini et al., 2000]), <ins>which are closely</ins> related to recent tectonic and volcanic structures. <del>Investigations of</del><ins>Research on soil</ins> CO<sub>2</sub> <del>CO2</del> degassing from geothermal areas <del>have</del><ins>has</ins> shown that <del>frequently</del> DDS are <ins>often</ins> related to the underlying geothermal systems [Chiodini et al., 1998; Bergfeld et al., 2001; Gambardella et al., 2004; Werner and Cardellini, 2006]. Chiodini et al. [2000, 2004a] <del>showed</del><ins>revealed</ins> that the Tyrrhenian side of the Italian peninsula <del>is characterized by the presence of</del><ins>hosts</ins> two large anomalies of deeply derived CO<sub>2</sub> <del>CO2</del> degassing: the Tuscan Roman Degassing Structure (<ins>TRDS</ins>) and Campanian Degassing Structure (CDS). These releasing approximately 1.4 x 10<sup>11</sup> mol/year <del>1011 mol a1</del> and 0.7 x 10<sup>11</sup> mol/year <del>1011 mol a1</del> of CO<sub>2</sub>, respectively. <ins>At the surface, this deep flux is expressed through discrete gas emissions, zones of intense soil degassing, and elevated CO<sub>2</sub> partial pressures in groundwater.</ins><del>In these areas, the CO2 flux from depth is revealed at the surface by numerous discrete gas emissions, by zones of high soil diffuse degassing and by high CO2 partial pressure (PCO2) in the groundwaters.</del> In particular, <ins>t</ins>The <ins>TRDS</ins> region is <ins>particularly also</ins> characterized by the occurrence of several occurring, exploited or exploitable, geothermal systems of high (e.g., LarderelloTravale, Monte Amiata, Latera, and Cesano), medium (e.g., Torre Alfina), and low (e.g., Viterbo) enthalpy <del>are present</del>. Chiodini et al. [1995] highlighted <del>the a strict correspondence</del><ins>strong correlation</ins> within <ins>TRDS</ins> between <del>,of</del> surface CO<sub>2</sub> <del>CO2</del> anomalies <del>at the surface with</del><ins>and</ins> buried carbonate horsts that act as gas traps and represent possible geothermal reservoirs. [3] The main objective of this work is to <del>test</del><ins>evaluate the potentiality</ins> of soil CO<sub>2</sub> <del>CO2</del> diffuse degassing measurements <del>for the study of</del><ins>as a tool for investigating</ins> underground mass and heat transfer <del>and, in</del><ins>with</ins> particular <ins>focus on their application,</ins> for geothermal reservoir prospecting`
        },
        {
          type: "paragraph",
          role: "body",
          text: `To achieve this objective, soil CO2 flux surveys and gas sampling have been performed at Latera caldera, which is an outstanding case study area for investigating the CO2 diffuse degassing process and its relation to the tectonics and the geothermal system at depth.`
        }
      ],
      comments: [
        { label: "GC3", note: "Preserved the green Introduction heading and corrected the carbon-cycle framing.", anchor: 0 },
        { label: "GC4", note: "Clarified the objective paragraph while stopping at the visible screenshot endpoint.", anchor: 1 }
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
      eyebrow: "Page 1 of 3 - Abstract",
      heading: seed.documentTitle,
      variant: "document",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "title",
          text: "Experiences with teachers in childhood and their association with wellbeing in adulthood"
        },
        {
          type: "paragraph",
          role: "heading",
          text: "Abstract"
        },
        {
          type: "paragraph",
          role: "body",
          text: `This <del>work examines</del><ins>study investigates</ins> <del>the impact of</del><ins>how</ins> meaningful experiences with teachers during childhood and adolescence <del>on</del><ins>influence the</ins> adult well-being <del>of adults</del>. <del>The d</del>Data <del>was</del><ins>were</ins> collected <del>using</del><ins>through</ins> an online survey<ins>, in which participants’</ins> <del>c</del>urrent well-being <del>of the participants</del> was assessed with measures of life satisfaction, resilience, anxiety, stress, depressiveness, and self-esteem. Participants were asked to <del>briefly write about</del><ins>describe</ins> their most meaningful experiences with teachers and to rate <del>these afterwards with regard to</del><ins>them in terms of</ins> their valence. <ins>Using qualitative methods, the experiences were categorized into several groups</ins><del>Then, these experiences were categorized into several groups using a qualitative method.</del> The results <del>showed</del><ins>revealed</ins> <del>that there was a highly significant</del><ins>a strong</ins> correlation between <del>the</del> participants’ self-esteem and the valence ratings of their <ins>teacher-related</ins> experiences. <del>Furthermore</del><ins>Moreover, the type of</ins> experience <del>category had a substantial</del><ins>significantly</ins> <del>e</del>affected <del>on individual</del> self-esteem. For <del>instance</del><ins>example, participants in</ins> the “individual promotion and support” group <del>exhibited</del><ins>reported</ins> notably higher self-esteem compared to <del>groups those that</del><ins>who recalled experiences of</ins> injustice <del>from</del><ins>with</ins> <del>their</del> teachers. Overall, <del>this study</del><ins>the findings</ins> <del>demonstrated</del><ins>highlight</ins> <del>that a relationship</del><ins>clear association</ins> <del>exists</del> between <del>the</del> adult well-being <del>of adults</del> and their experiences with teachers during childhood and adolescence.`
        },
        {
          type: "paragraph",
          role: "body",
          text: "<strong>Keywords:</strong> Experiences with teachers, well-being, teacher-student relationship, meaningful experiences, well-being in adulthood"
        }
      ],
      comments: [
        { label: "PSY1", note: "Clarified the study aim and corrected agreement in the data-collection sentence.", anchor: 2 },
        { label: "PSY2", note: "Condensed the results into a cleaner summary while preserving the visible self-esteem findings.", anchor: 2 }
      ]
    },
    {
      eyebrow: "Page 2 of 3 - Literature review",
      heading: seed.documentTitle,
      variant: "document",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "title",
          text: "Experiences with teachers in childhood and their association with wellbeing in adulthood"
        },
        {
          type: "paragraph",
          role: "body",
          text: `Prior studies on teacher-student <ins>relationships</ins> <del>relationship</del> and the emotions involved <del>were mainly</del><ins>have primarily</ins> focused on the <ins>teachers’ emotional</ins> <del>emotions of the teachers</del><ins>experiences</ins> (Hargreaves, 2000; Newberry & Davis, 2008; Newberry, 2010; Cowie, 2011; Yan, Evans & Harvey, 2011). These studies <del>showed</del><ins>demonstrate</ins> that <ins>students’</ins><del>student’s</del> emotions <del>have an impact on the</del><ins>can significantly influence</ins> teachers’ emotions <del>of the teachers</del> (Becker, Götz, Morger & Ranellucci, 2014). <del>Furthermore, they showed students’ emotions to be</del><ins>and are closely</ins> associated with their learning outcomes (Morcom, 2014). <ins>Building on this body of work, T</ins>he present study <del>builds on prior research and sheds light on the side of</del><ins>focuses on</ins> students’ emotional experiences <del>students’ emotions within</del><ins>in</ins> the context of their interaction with teachers, which has received little <ins>scholarly</ins> attention <del>to date</del>.`
        },
        {
          type: "paragraph",
          role: "body",
          text: `There are <del>various</del><ins>several</ins> theories <del>about</del><ins>that explain how</ins> the emotions are transferred <del>of emotions</del> between teachers and students. Hatfield et al. (1994) <del>called</del><ins>described</ins> this phenomenon as “primitive emotional contagion” (Hatfield et al., 1994), <del>p. 2)</del><ins>proposing that</ins> <del>They assume</del> this mechanism is a <del>basic</del><ins>fundamental human</ins> skill <del>belonging to every human being that helps for</del><ins>to</ins> communication <ins>and mutual</ins> understanding <del>each other</del>. Hatfield et al. (1994) proposed that two <del>persons</del><ins>individuals</ins> can synchronise their voices, <del>their way of talking</del><ins>speech patterns</ins>, <del>their</del> mimic and gestures, <del>and their</del><ins>as well as</ins> body postures. <del>This helps both interacting beings to feel</del><ins>leading to mutual empathy for each other. In this process, one person reflects the</ins> individual <del>will be reflected without actually</del>`
        }
      ],
      comments: [
        { label: "PSY3", note: "Reframed the literature gap around students' emotional experiences rather than teacher emotions alone.", anchor: 1 },
        { label: "PSY4", note: "Preserved the emotional-contagion theory paragraph and excluded the screenshot overlay.", anchor: 2 }
      ]
    },
    {
      eyebrow: "Page 3 of 3 - Mental health",
      heading: "Teacher-student relationship and mental health",
      variant: "document",
      body: [],
      blocks: [
        {
          type: "paragraph",
          role: "body",
          text: `<del>feeling them</del><ins>without necessarily directly experiencing them, ultimately transferring emotions between the interacting individuals.</ins> <del>In the last step of this theory, emotions are transferred to the other person.</del> Becker et al. (2014) <del>showed</del><ins>demonstrated</ins> that this mechanism <del>is also at</del> works <ins>within classroom settings</ins>. Their<del>y</del> study investigated <del>how similar</del> the emotional<del>s</del> <ins>alignment</ins> of teachers and <del>their</del> students <del>are after</del><ins>during</ins> one hour of teaching. <del>It turned out that</del><ins>and found a</ins> <del>emotions were</del> significantly association<del>ed with each other</del><ins>between their emotional states. Specifically, emotions of</ins> Anger, anxiety, and happiness <ins>were found to</ins> harmonised <del>within one lesson</del><ins>during classroom interactions.</ins>`
        },
        {
          type: "paragraph",
          role: "heading",
          text: "Teacher-student relationship and mental health"
        },
        {
          type: "paragraph",
          role: "body",
          text: "Resnick et al. (1997) investigated the connection between teacher-student relationships and mental health of the students. They could show that there was a significant association between a positive and supporting teacher-student relationship and students’ mental health. Those students with a supportive bonding to a teacher committed less suicide, had less suicidal thoughts and had a lower level of stress. Furthermore, these students committed less crime and were less frequently addicted to drugs than students with a negative relationship to teachers."
        },
        {
          type: "paragraph",
          role: "body",
          text: "In a Norwegian study conducted by the World Health Organization in 2003, a correlation between the general life satisfaction of students and the teacher-student relationship was shown. A total of 887 students were interviewed in the Norwegian study, which revealed that students who received special support from a teacher were significantly happier. It was also found that the stress level of these students was significantly lower (Natvig, 2003)."
        },
        {
          type: "paragraph",
          role: "body",
          text: "The previous studies clearly show that the relationship with the teacher has a measurable influence on life satisfaction, stress perception and emotions in general."
        }
      ],
      comments: [
        { label: "PSY5", note: "Completed the visible emotional-contagion sentence without including the screenshot popup.", anchor: 0 },
        { label: "PSY6", note: "Kept the mental-health section plain where the screenshot shows no tracked edits.", anchor: 2 }
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
  if (key === "chemistry" || key === "geochemistry") return "molecule";
  if (key === "geological") return "chart";
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
