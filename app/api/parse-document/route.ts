import { NextResponse } from "next/server";
import mammoth from "mammoth";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Please upload a .docx or .txt file so we can calculate the word count." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = "";

    if (file.name.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (file.name.endsWith(".txt")) {
      text = buffer.toString("utf-8");
    } else {
      return NextResponse.json({ error: "Unsupported file type. Please upload a .docx or .txt file." }, { status: 400 });
    }

    // Basic word count logic: split by whitespace
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (!wordCount) {
      return NextResponse.json({ error: "We could not detect readable text in this file. Please re-upload the document or contact support." }, { status: 422 });
    }

    return NextResponse.json({ wordCount });
  } catch (error: any) {
    console.error("Error parsing document:", error);
    return NextResponse.json({ error: "We could not calculate a reliable word count. Please re-upload the file or contact support." }, { status: 500 });
  }
}
