import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const MAX_ATTACHMENT_BYTES = 25 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([
  ".doc", ".docx", ".pdf", ".txt", ".rtf", ".odt", ".csv", ".xls", ".xlsx",
  ".ppt", ".pptx", ".zip", ".png", ".jpg", ".jpeg", ".webp",
]);

function safeName(value: string) {
  return value.replace(/[^\w.\- ]+/g, "").replace(/\s+/g, "_").slice(0, 120) || "attachment";
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("cf-connecting-ip")
      || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || "unknown";
    const limit = await checkRateLimit(`contact-upload-url:${ip}`, 5, 60 * 60);
    if (!limit.success) {
      return NextResponse.json({ error: "Too many upload attempts. Please try again later." }, { status: 429 });
    }

    const payload = await request.json();
    const originalName = typeof payload.name === "string" ? payload.name : "";
    const size = Number(payload.size);
    const extension = originalName.includes(".") ? originalName.slice(originalName.lastIndexOf(".")).toLowerCase() : "";

    if (!originalName || !Number.isFinite(size) || size <= 0 || size > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json({ error: "Choose a file under 25MB." }, { status: 413 });
    }
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      return NextResponse.json({ error: "This file type is not supported." }, { status: 415 });
    }

    const name = safeName(originalName);
    const path = `contact-support/${randomUUID()}_${name}`;
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.storage.from("uploads").createSignedUploadUrl(path);
    if (error || !data?.token) {
      console.error("Contact attachment signing failed:", error);
      return NextResponse.json({ error: "We couldn't prepare a secure upload. Please try again." }, { status: 503 });
    }

    return NextResponse.json({ path, token: data.token, name });
  } catch (error) {
    console.error("Contact attachment signing route failed:", error);
    return NextResponse.json({ error: "We couldn't prepare a secure upload. Please try again." }, { status: 500 });
  }
}
