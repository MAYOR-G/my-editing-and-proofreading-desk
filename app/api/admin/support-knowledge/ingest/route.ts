import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { cleanKnowledgeText, extractTextFromPdfBuffer, ingestSupportKnowledge, sanitizeSupportText } from "@/lib/support-rag";

export const runtime = "nodejs";

async function isAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const admin = createSupabaseAdminClient();
  const { data } = await admin.from("profiles").select("role").eq("id", user.id).single();
  return data?.role === "admin";
}

async function getTextFromFile(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
    return extractTextFromPdfBuffer(buffer);
  }
  return buffer.toString("utf8");
}

export async function POST(request: Request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const formData = await request.formData();
    const title = sanitizeSupportText(formData.get("title"), 180) || "Support knowledge";
    const source = sanitizeSupportText(formData.get("source"), 240) || "manual-upload";
    const pastedText = sanitizeSupportText(formData.get("text"), 200000);
    const file = formData.get("file");

    let text = pastedText;
    if (!text && file instanceof File) text = await getTextFromFile(file);
    text = cleanKnowledgeText(text);

    if (!text || text.length < 40) {
      return NextResponse.json({ error: "Add a PDF or text file with enough readable support content." }, { status: 400 });
    }

    const result = await ingestSupportKnowledge({ title, source, text });
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("Support knowledge ingestion failed:", error);
    return NextResponse.json({ error: "Support knowledge could not be ingested." }, { status: 500 });
  }
}
