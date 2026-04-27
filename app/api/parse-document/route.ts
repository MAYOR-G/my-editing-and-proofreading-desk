import { NextResponse } from "next/server";
import mammoth from "mammoth";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = "";

    if (file.name.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (file.name.endsWith(".txt")) {
      text = buffer.toString("utf-8");
    } else {
      return NextResponse.json({ error: "Unsupported file type. Please upload .docx or .txt" }, { status: 400 });
    }

    // Basic word count logic: split by whitespace
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;

    return NextResponse.json({ wordCount });
  } catch (error: any) {
    console.error("Error parsing document:", error);
    return NextResponse.json({ error: "Failed to parse document" }, { status: 500 });
  }
}
