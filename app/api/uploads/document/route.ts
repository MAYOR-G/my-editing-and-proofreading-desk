import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { createClient } from "@/utils/supabase/server";
import { validateDocumentFile } from "@/lib/document-file-validation";

export const dynamic = "force-dynamic";

const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([".docx", ".txt", ".doc"]);
const CONTENT_TYPES: Record<string, string> = {
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".doc": "application/msword",
  ".txt": "text/plain",
};
const STORAGE_RETRY_DELAYS_MS = [350, 1000];

function createTraceId() {
  return `upl_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function getExtension(filename: string) {
  const dotIndex = filename.lastIndexOf(".");
  return dotIndex >= 0 ? filename.slice(dotIndex).toLowerCase() : "";
}

function sanitizeFilename(filename: string) {
  const cleaned = filename
    .replace(/[^\w.\- ]+/g, "")
    .replace(/\s+/g, "_")
    .slice(0, 120);

  return cleaned || "document";
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTransientStorageError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error || "");
  return /fetch failed|timeout|socket|network|econnreset|etimedout/i.test(message);
}

export async function POST(request: Request) {
  const traceId = createTraceId();

  try {
    const supabase = createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Please sign in again before uploading.", code: "auth_required", trace_id: traceId },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please choose a valid document before checkout.", code: "invalid_file", trace_id: traceId },
        { status: 400 }
      );
    }

    if (file.size <= 0) {
      return NextResponse.json(
        { error: "The selected document appears to be empty. Please upload another file.", code: "empty_file", trace_id: traceId },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: "This file is too large for automatic checkout. Please contact our editors.", code: "file_too_large", trace_id: traceId },
        { status: 413 }
      );
    }

    const extension = getExtension(file.name);
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      return NextResponse.json(
        { error: "Please upload a .docx, .doc, or .txt document.", code: "unsupported_file_type", trace_id: traceId },
        { status: 415 }
      );
    }

    const safeName = sanitizeFilename(file.name);
    const filePath = `${user.id}/${Date.now()}_${safeName}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const validation = validateDocumentFile(extension, fileBuffer);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.reason, code: "file_signature_mismatch", trace_id: traceId },
        { status: 415 }
      );
    }
    const contentType = CONTENT_TYPES[extension] || "application/octet-stream";
    const supabaseAdmin = createSupabaseAdminClient();
    let uploadError: unknown = null;

    for (let attempt = 0; attempt <= STORAGE_RETRY_DELAYS_MS.length; attempt += 1) {
      const result = await supabaseAdmin.storage
        .from("uploads")
        .upload(filePath, fileBuffer, {
          contentType,
          upsert: false,
        });

      uploadError = result.error;
      if (!uploadError) break;
      if (!isTransientStorageError(uploadError) || attempt === STORAGE_RETRY_DELAYS_MS.length) break;

      console.warn(`[${traceId}] Supabase storage upload retrying`, {
        attempt: attempt + 1,
        message: uploadError instanceof Error ? uploadError.message : String(uploadError),
      });
      await sleep(STORAGE_RETRY_DELAYS_MS[attempt]);
    }

    if (uploadError) {
      console.error(`[${traceId}] Supabase storage upload failed`, {
        message: uploadError instanceof Error ? uploadError.message : String(uploadError),
        name: uploadError instanceof Error ? uploadError.name : undefined,
        status: typeof uploadError === "object" && uploadError && "status" in uploadError ? uploadError.status : undefined,
      });

      const transient = isTransientStorageError(uploadError);

      return NextResponse.json(
        {
          error: transient
            ? "Supabase Storage is not reachable right now. Please try again in a moment."
            : "We could not upload your document. Please try again or contact support.",
          code: transient ? "storage_unreachable" : "upload_failed",
          trace_id: traceId,
        },
        { status: transient ? 503 : 500 }
      );
    }

    return NextResponse.json({ success: true, file_path: filePath, trace_id: traceId });
  } catch (error) {
    console.error(`[${traceId}] Unexpected document upload error`, error);

    return NextResponse.json(
      { error: "We could not upload your document. Please try again or contact support.", code: "upload_unexpected", trace_id: traceId },
      { status: 500 }
    );
  }
}
