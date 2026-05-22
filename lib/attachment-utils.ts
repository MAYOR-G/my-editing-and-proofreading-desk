export type StoredAttachment = {
  path: string;
  name: string;
  contentType: string;
  size: number;
  content: Buffer;
};

export const ADMIN_ATTACHMENT_MAX_BYTES = 25 * 1024 * 1024;

const ALLOWED_ADMIN_ATTACHMENT_EXTENSIONS = new Set([
  ".doc",
  ".docx",
  ".pdf",
  ".txt",
  ".rtf",
  ".zip",
]);

export function getExtension(filename: string) {
  const dotIndex = filename.lastIndexOf(".");
  return dotIndex >= 0 ? filename.slice(dotIndex).toLowerCase() : "";
}

export function sanitizeFilename(filename: string) {
  const cleaned = filename
    .replace(/[^\w.\- ]+/g, "")
    .replace(/\s+/g, "_")
    .slice(0, 140);

  return cleaned || "attachment";
}

export function validateAdminAttachment(file: File | null | undefined) {
  if (!file || file.size <= 0) return null;

  if (file.size > ADMIN_ATTACHMENT_MAX_BYTES) {
    return "Attached files must be 25MB or smaller.";
  }

  const extension = getExtension(file.name);
  if (!ALLOWED_ADMIN_ATTACHMENT_EXTENSIONS.has(extension)) {
    return "Unsupported attachment type. Use DOC, DOCX, PDF, TXT, RTF, or ZIP.";
  }

  return null;
}

export async function fileToStoredAttachment(file: File, pathPrefix: string): Promise<StoredAttachment> {
  const safeName = sanitizeFilename(file.name);
  const content = Buffer.from(await file.arrayBuffer());

  return {
    path: `${pathPrefix}/${Date.now()}_${safeName}`,
    name: safeName,
    contentType: file.type || "application/octet-stream",
    size: file.size,
    content,
  };
}
