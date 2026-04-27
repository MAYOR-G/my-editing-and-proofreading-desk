import { inflateRawSync } from "node:zlib";
import { NextResponse } from "next/server";
import { AI_FILE_SIZE_LIMIT, AI_WORD_LIMIT, countWords, getFileExtension, isAllowedAiFile } from "@/lib/ai-editing";

export const runtime = "nodejs";

function readUInt16(buffer: Buffer, offset: number) {
  return buffer.readUInt16LE(offset);
}

function readUInt32(buffer: Buffer, offset: number) {
  return buffer.readUInt32LE(offset);
}

function decodeXmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'");
}

function documentXmlToText(xml: string) {
  return decodeXmlEntities(
    xml
      .replace(/<w:tab\s*\/>/g, " ")
      .replace(/<\/w:p>/g, "\n")
      .replace(/<w:br\s*\/>/g, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

function extractDocxText(buffer: Buffer) {
  let eocdOffset = -1;
  const start = Math.max(0, buffer.length - 0xffff - 22);

  for (let offset = buffer.length - 22; offset >= start; offset -= 1) {
    if (readUInt32(buffer, offset) === 0x06054b50) {
      eocdOffset = offset;
      break;
    }
  }

  if (eocdOffset < 0) {
    throw new Error("Invalid DOCX archive.");
  }

  const entries = readUInt16(buffer, eocdOffset + 10);
  let centralOffset = readUInt32(buffer, eocdOffset + 16);

  for (let index = 0; index < entries; index += 1) {
    if (readUInt32(buffer, centralOffset) !== 0x02014b50) break;

    const method = readUInt16(buffer, centralOffset + 10);
    const compressedSize = readUInt32(buffer, centralOffset + 20);
    const filenameLength = readUInt16(buffer, centralOffset + 28);
    const extraLength = readUInt16(buffer, centralOffset + 30);
    const commentLength = readUInt16(buffer, centralOffset + 32);
    const localOffset = readUInt32(buffer, centralOffset + 42);
    const filename = buffer.toString("utf8", centralOffset + 46, centralOffset + 46 + filenameLength);

    if (filename === "word/document.xml") {
      if (readUInt32(buffer, localOffset) !== 0x04034b50) {
        throw new Error("Invalid DOCX local header.");
      }

      const localFilenameLength = readUInt16(buffer, localOffset + 26);
      const localExtraLength = readUInt16(buffer, localOffset + 28);
      const dataStart = localOffset + 30 + localFilenameLength + localExtraLength;
      const data = buffer.subarray(dataStart, dataStart + compressedSize);
      const xml = method === 8 ? inflateRawSync(data).toString("utf8") : data.toString("utf8");
      return documentXmlToText(xml);
    }

    centralOffset += 46 + filenameLength + extraLength + commentLength;
  }

  throw new Error("No editable document text found.");
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const filename = typeof payload.filename === "string" ? payload.filename : "";
    const base64 = typeof payload.base64 === "string" ? payload.base64 : "";
    const extension = getFileExtension(filename);

    if (!filename || !base64) {
      return NextResponse.json({ error: "Choose a document before extraction." }, { status: 400 });
    }

    if (!isAllowedAiFile(filename)) {
      return NextResponse.json({ error: "Unsupported file type. Use .txt, .docx, or paste text directly." }, { status: 415 });
    }

    const buffer = Buffer.from(base64, "base64");
    if (buffer.length > AI_FILE_SIZE_LIMIT) {
      return NextResponse.json({ error: `The AI trial accepts files up to ${Math.round(AI_FILE_SIZE_LIMIT / 1024)}KB.` }, { status: 413 });
    }

    if (extension === ".doc") {
      return NextResponse.json({ error: "Legacy .doc files need the full professional upload pipeline. For the AI trial, use .txt, .docx, or paste up to 1,000 words." }, { status: 415 });
    }

    const text = extension === ".docx" ? extractDocxText(buffer) : buffer.toString("utf8");
    const wordCount = countWords(text);

    if (!wordCount) {
      return NextResponse.json({ error: "No readable text was found in this file." }, { status: 422 });
    }

    if (wordCount > AI_WORD_LIMIT) {
      return NextResponse.json({ error: `This file has ${wordCount.toLocaleString()} words. Please shorten it to ${AI_WORD_LIMIT.toLocaleString()} words or submit it for full human review.`, text, wordCount }, { status: 422 });
    }

    return NextResponse.json({ text, wordCount, limit: AI_WORD_LIMIT });
  } catch {
    return NextResponse.json({ error: "The document could not be extracted. Paste the passage or submit the full file for professional review." }, { status: 422 });
  }
}
