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
