import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([".docx", ".txt", ".doc"]);
const CONTENT_TYPES: Record<string, string> = {
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".doc": "application/msword",
  ".txt": "text/plain",
};

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
    const supabaseAdmin = createSupabaseAdminClient();
    const { error: uploadError } = await supabaseAdmin.storage
      .from("uploads")
      .upload(filePath, file, {
        contentType: file.type || CONTENT_TYPES[extension] || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      console.error(`[${traceId}] Supabase storage upload failed`, {
        message: uploadError.message,
        name: uploadError.name,
        status: "status" in uploadError ? uploadError.status : undefined,
      });

      return NextResponse.json(
        { error: "We could not upload your document. Please try again or contact support.", code: "upload_failed", trace_id: traceId },
        { status: 500 }
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
