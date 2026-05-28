export const AI_WORD_LIMIT = 1000;
export const AI_FILE_SIZE_LIMIT = 256 * 1024;
export const AI_ALLOWED_EXTENSIONS = [".txt", ".doc", ".docx"] as const;

export const editingModes = [
  {
    id: "ai-editing",
    label: "AI Editing",
    shortLabel: "AI Editing",
    description: "Correct grammar, spelling, punctuation, spacing, clarity, and flow while preserving the original meaning.",
    instruction: "Edit the passage for grammar, spelling, punctuation, spacing, clarity, sentence structure, and flow while preserving the original meaning and voice."
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
