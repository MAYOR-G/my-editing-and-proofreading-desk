export type MessageSenderType = "user" | "admin";

export function normalizeThreadEmail(email: string) {
  return email.trim().toLowerCase();
}

export function makeThreadKey(email: string) {
  return normalizeThreadEmail(email);
}

export function sanitizePlainText(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value
        .replace(/\u0000/g, "")
        .replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
        .trim()
        .slice(0, maxLength)
    : "";
}

export function previewText(value: string, maxLength = 130) {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length > maxLength ? `${clean.slice(0, maxLength)}...` : clean;
}

export function parseUtcTimestampMs(value?: string | null): number {
  if (!value) return 0;
  const trimmed = String(value).trim();
  if (!trimmed) return 0;
  const hasOffset = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(trimmed);
  const normalized = hasOffset ? trimmed : `${trimmed.replace(" ", "T")}Z`;
  const parsed = Date.parse(normalized);
  if (!Number.isNaN(parsed)) return parsed;
  const fallback = Date.parse(trimmed);
  return Number.isNaN(fallback) ? 0 : fallback;
}

export function formatUtcDateTime(value?: string | null): string {
  const ms = parseUtcTimestampMs(value);
  if (!ms) return "N/A";
  const date = new Date(ms);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
