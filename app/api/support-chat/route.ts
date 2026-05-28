import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { SUPPORT_CHAT_FALLBACK, answerWithOpenRouter, matchSupportKnowledge, sanitizeSupportText } from "@/lib/support-rag";

export const runtime = "nodejs";

function getClientIdentifier(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const userAgent = request.headers.get("user-agent")?.slice(0, 80) || "unknown-agent";
  return `${forwarded || realIp || "anonymous"}:${userAgent}`;
}

export async function POST(request: Request) {
  try {
    const identifier = getClientIdentifier(request);
    const rate = await checkRateLimit(`support-chat:${identifier}`, 8, 60);
    if (!rate.success) {
      console.warn("Support chat rate limit hit:", identifier);
      return NextResponse.json({ answer: SUPPORT_CHAT_FALLBACK, fallback: true }, { status: 429 });
    }

    const payload = await request.json();
    const message = sanitizeSupportText(payload?.message, 1200);
    if (!message || message.length < 3) {
      return NextResponse.json({ answer: "Please enter a support question.", fallback: true }, { status: 400 });
    }

    const chunks = await matchSupportKnowledge(message, 5);
    const bestSimilarity = Math.max(...chunks.map((chunk) => Number(chunk.similarity || 0)), 0);
    if (!chunks.length || bestSimilarity < 0.72) {
      console.info("Support chat low confidence fallback:", { bestSimilarity, chunks: chunks.length });
      return NextResponse.json({ answer: SUPPORT_CHAT_FALLBACK, fallback: true });
    }

    const answer = await answerWithOpenRouter(message, chunks);
    const safeAnswer = answer.includes("support representative will reply shortly") ? SUPPORT_CHAT_FALLBACK : answer;
    return NextResponse.json({
      answer: safeAnswer,
      fallback: safeAnswer === SUPPORT_CHAT_FALLBACK,
      sources: chunks.map((chunk) => ({ title: chunk.title, source: chunk.source, similarity: chunk.similarity })).slice(0, 5),
    });
  } catch (error) {
    console.error("Support chat failed:", error);
    return NextResponse.json({ answer: SUPPORT_CHAT_FALLBACK, fallback: true });
  }
}
