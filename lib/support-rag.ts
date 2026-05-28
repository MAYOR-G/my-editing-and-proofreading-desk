import crypto from "crypto";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export const SUPPORT_CHAT_FALLBACK = "Thanks for your message. A support representative will reply shortly.";
const EMBEDDING_MODEL = "text-embedding-004";
const EMBEDDING_DIMENSIONS = 768;
const MATCH_THRESHOLD = 0.72;

export type SupportChunk = {
  id?: string;
  content: string;
  title?: string;
  source?: string;
  chunk_index?: number;
  similarity?: number;
};

export function sanitizeSupportText(value: unknown, maxLength = 4000) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function contentHash(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function cleanKnowledgeText(value: string) {
  return value
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function chunkKnowledgeText(text: string, minWords = 450, maxWords = 800, overlapWords = 90) {
  const words = cleanKnowledgeText(text).split(/\s+/).filter(Boolean);
  const chunks: string[] = [];
  let index = 0;

  while (index < words.length) {
    const end = Math.min(words.length, index + maxWords);
    const chunk = words.slice(index, end).join(" ").trim();
    if (chunk.split(/\s+/).length >= Math.min(minWords, words.length)) chunks.push(chunk);
    if (end >= words.length) break;
    index = Math.max(0, end - overlapWords);
  }

  return chunks.length ? chunks : text.trim() ? [text.trim()] : [];
}

export async function generateGeminiEmbedding(text: string) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) throw new Error("Missing GOOGLE_GENERATIVE_AI_API_KEY.");

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:embedContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: `models/${EMBEDDING_MODEL}`,
      content: { parts: [{ text }] },
      outputDimensionality: EMBEDDING_DIMENSIONS,
    }),
  });

  if (!response.ok) throw new Error(`Gemini embedding failed with ${response.status}.`);
  const data = await response.json();
  const values = data?.embedding?.values;
  if (!Array.isArray(values)) throw new Error("Gemini embedding response was invalid.");
  return values.map((value: unknown) => Number(value));
}

export async function matchSupportKnowledge(query: string, limit = 5) {
  const embedding = await generateGeminiEmbedding(query);
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.rpc("match_support_knowledge", {
    query_embedding: embedding,
    match_count: limit,
    match_threshold: MATCH_THRESHOLD,
  });

  if (error) throw error;
  return (data || []) as SupportChunk[];
}

export async function answerWithOpenRouter(question: string, chunks: SupportChunk[]) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("Missing OPENROUTER_API_KEY.");

  const context = chunks
    .map((chunk, index) => `Context ${index + 1}${chunk.title ? ` (${chunk.title})` : ""}:\n${chunk.content}`)
    .join("\n\n");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://editandproofread.com",
      "X-Title": "My Editing and Proofreading Desk Support",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_SUPPORT_MODEL || "google/gemini-2.0-flash-lite-001",
      temperature: 0.1,
      max_tokens: 450,
      messages: [
        {
          role: "system",
          content: "You are a concise support assistant for My Editing and Proofreading Desk. Answer only from the provided context. If the answer is not clearly in the context, respond exactly: Thanks for your message. A support representative will reply shortly. Do not invent pricing, timelines, policies, guarantees, or company details.",
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion:\n${question}`,
        },
      ],
    }),
  });

  if (!response.ok) throw new Error(`OpenRouter support response failed with ${response.status}.`);
  const data = await response.json();
  const answer = data?.choices?.[0]?.message?.content;
  if (typeof answer !== "string" || !answer.trim()) throw new Error("OpenRouter support response was invalid.");
  return answer.trim();
}

export async function ingestSupportKnowledge({ title, source, text }: { title: string; source: string; text: string }) {
  const supabase = createSupabaseAdminClient();
  const chunks = chunkKnowledgeText(text);
  const rows = [];

  for (let index = 0; index < chunks.length; index++) {
    const content = chunks[index];
    const hash = contentHash(`${title}:${source}:${content}`);
    const { data: existing, error: existingError } = await supabase
      .from("support_knowledge_chunks")
      .select("id")
      .eq("content_hash", hash)
      .maybeSingle();

    if (existingError) throw existingError;
    if (existing?.id) continue;

    const embedding = await generateGeminiEmbedding(content);
    rows.push({
      title,
      source,
      content,
      content_hash: hash,
      chunk_index: index,
      metadata: { title, source, chunk_index: index },
      embedding,
    });
  }

  if (!rows.length) return { inserted: 0, totalChunks: chunks.length };

  const { error } = await supabase.from("support_knowledge_chunks").insert(rows);
  if (error) throw error;
  return { inserted: rows.length, totalChunks: chunks.length };
}

export function extractTextFromPdfBuffer(buffer: Buffer) {
  const raw = buffer.toString("latin1");
  const matches = [...raw.matchAll(/\(([^()]{2,})\)\s*Tj|\[([^\]]{2,})\]\s*TJ/g)];
  return matches
    .map((match) => (match[1] || match[2] || "").replace(/\\([()\\])/g, "$1").replace(/\\n/g, "\n"))
    .join(" ");
}
