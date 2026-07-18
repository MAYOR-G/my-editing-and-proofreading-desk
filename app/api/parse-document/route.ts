import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { createClient } from "@/utils/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { validateDocumentFile } from "@/lib/document-file-validation";

const MAX_PARSE_BYTES = 50 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Please sign in before uploading a document." }, { status: 401 });
    }

    const rate = await checkRateLimit(`parse-document:${user.id}`, 8, 60);
    if (!rate.success) {
      return NextResponse.json({ error: "Too many document checks. Please wait and try again." }, { status: 429 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Please upload a .docx or .txt file so we can calculate the word count." }, { status: 400 });
    }

    if (file.size <= 0 || file.size > MAX_PARSE_BYTES) {
      return NextResponse.json({ error: "The document is empty or exceeds the 50 MB upload limit." }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = "";
    const filename = file.name.toLowerCase();
    const extension = filename.endsWith(".docx") ? ".docx" : filename.endsWith(".txt") ? ".txt" : "";

    if (!extension) {
      return NextResponse.json({ error: "Unsupported file type. Please upload a .docx or .txt file." }, { status: 400 });
    }

    const validation = validateDocumentFile(extension, buffer, {
      maxEntries: 1_000,
      maxExpandedBytes: 25 * 1024 * 1024,
      maxCompressionRatio: 150,
    });
    if (!validation.valid) {
      return NextResponse.json({ error: validation.reason }, { status: 415 });
    }

    if (filename.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (filename.endsWith(".txt")) {
      text = buffer.toString("utf-8");
    }

    // Basic word count logic: split by whitespace
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (!wordCount) {
      return NextResponse.json({ error: "We could not detect readable text in this file. Please re-upload the document or contact support." }, { status: 422 });
    }

    return NextResponse.json({ wordCount });
  } catch (error: unknown) {
    console.error("Error parsing document:", error);
    return NextResponse.json({ error: "We could not calculate a reliable word count. Please re-upload the file or contact support." }, { status: 500 });
  }
}
