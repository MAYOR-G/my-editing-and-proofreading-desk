import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import {
  ADMIN_ATTACHMENT_MAX_BYTES,
  ALLOWED_ADMIN_ATTACHMENT_EXTENSIONS,
  getExtension,
  sanitizeFilename,
} from "@/lib/attachment-utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const payload = await request.json();
    const originalName = typeof payload.name === "string" ? payload.name : "";
    const size = Number(payload.size);
    const scope = payload.scope === "delivery" ? "delivery" : "reply";
    const targetId = typeof payload.targetId === "string" ? payload.targetId.replace(/[^\w-]/g, "") : "";
    const clientId = typeof payload.clientId === "string" ? payload.clientId.replace(/[^\w-]/g, "") : "client";

    const extension = getExtension(originalName);

    if (!originalName || !Number.isFinite(size) || size <= 0 || size > ADMIN_ATTACHMENT_MAX_BYTES) {
      return NextResponse.json({ error: "Attached files must be 50MB or smaller." }, { status: 413 });
    }

    if (!ALLOWED_ADMIN_ATTACHMENT_EXTENSIONS.has(extension)) {
      return NextResponse.json(
        { error: "Unsupported attachment type. Use DOC, DOCX, PDF, TXT, RTF, ZIP, or standard office/image files." },
        { status: 415 }
      );
    }

    if (!targetId) {
      return NextResponse.json({ error: "Missing target record ID for attachment upload." }, { status: 400 });
    }

    const name = sanitizeFilename(originalName);
    const bucket = scope === "delivery" ? "deliveries" : "uploads";
    const path =
      scope === "delivery"
        ? `${clientId || "client"}/${targetId}/deliveries/${Date.now()}_${randomUUID().slice(0, 8)}_${name}`
        : `admin/message-replies/${targetId}/${Date.now()}_${randomUUID().slice(0, 8)}_${name}`;

    const supabaseAdmin = createSupabaseAdminClient();
    const { data, error } = await supabaseAdmin.storage.from(bucket).createSignedUploadUrl(path);

    if (error || !data?.token) {
      console.error("Admin attachment signed upload URL failed:", error);
      return NextResponse.json({ error: "Could not prepare secure storage upload." }, { status: 503 });
    }

    return NextResponse.json({
      bucket,
      path,
      token: data.token,
      name,
    });
  } catch (error) {
    console.error("Admin upload-url route failed:", error);
    return NextResponse.json({ error: "Could not prepare secure storage upload." }, { status: 500 });
  }
}

