export const AI_WORD_LIMIT = 1000;
export const AI_FILE_SIZE_LIMIT = 256 * 1024;
export const AI_ALLOWED_EXTENSIONS = [".txt", ".doc", ".docx"] as const;

export const editingModes = [
  {
    id: "grammar-clarity",
    label: "Grammar & Clarity",
    shortLabel: "Clarity",
    description: "Correct grammar, smooth rough phrasing, and make the passage easier to read.",
    instruction: "Improve grammar, punctuation, clarity, and readability while preserving the original meaning."
  },
  {
    id: "professional-proofread",
    label: "Professional Proofread",
    shortLabel: "Proofread",
    description: "A careful first-pass proofread for polished, professional writing.",
    instruction: "Proofread carefully for errors, consistency, sentence polish, and professional presentation."
  },
  {
    id: "academic-polish",
    label: "Academic Polish",
    shortLabel: "Academic",
    description: "Refine scholarly tone, precision, flow, and formal academic readability.",
    instruction: "Refine academic tone, precision, logical flow, and scholarly clarity without changing the argument."
  },
  {
    id: "business-tone",
    label: "Business Tone Refinement",
    shortLabel: "Business",
    description: "Make the text sound clearer, credible, concise, and client-ready.",
    instruction: "Improve business tone, executive clarity, confidence, concision, and reader trust."
  },
  {
    id: "deep-ai-editing",
    label: "Deep AI Editing",
    shortLabel: "Deep edit",
    description: "A stronger AI-assisted edit for structure, flow, tone, and expression.",
    instruction: "Provide a deeper edit for structure, flow, tone, concision, and sentence quality while preserving intent."
  }
] as const;

export type EditingModeId = (typeof editingModes)[number]["id"];

export function countWords(text: string) {
  const matches = text.trim().match(/\b[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)?\b/gu);
  return matches?.length ?? 0;
}

export function isEditingModeId(value: string): value is EditingModeId {
  return editingModes.some((mode) => mode.id === value);
}

export function getFileExtension(filename: string) {
  const index = filename.lastIndexOf(".");
  return index >= 0 ? filename.slice(index).toLowerCase() : "";
}

export function isAllowedAiFile(filename: string) {
  return AI_ALLOWED_EXTENSIONS.includes(getFileExtension(filename) as (typeof AI_ALLOWED_EXTENSIONS)[number]);
}
