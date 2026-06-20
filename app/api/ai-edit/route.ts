import { NextResponse } from "next/server";
import { AI_WORD_LIMIT, countWords, isEditingModeId } from "@/lib/ai-editing";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const WINDOW_MS = 24 * 60 * 60 * 1000;
const COOLDOWN_MS = 12 * 1000;
const ANONYMOUS_DAILY_CAP = 3;
const SIGNED_IN_DAILY_CAP = 12;
const MAX_INPUT_CHARS = 9000;
const MAX_OUTPUT_TOKENS = 1500;
const AI_UNAVAILABLE_MESSAGE = "AI editing is temporarily unavailable. Please try again shortly or submit your document for human review.";

type RateEntry = {
  count: number;
  windowStart: number;
  lastRequest: number;
};

// Fallback in-memory store if Redis is not configured
const memoryRateStore = new Map<string, RateEntry>();

let redis: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

async function getUser() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {},
        },
      }
    );
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) return null;
    return user;
  } catch (e) {
    return null;
  }
}

function getClientIp(request: Request) {
  const headers = request.headers;
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = headers.get("x-real-ip");
  return forwarded || realIp || "anonymous";
}

async function checkRateLimit(ip: string, user: any) {
  const now = Date.now();
  const cap = user ? SIGNED_IN_DAILY_CAP : ANONYMOUS_DAILY_CAP;
  const key = user ? `user:${user.id}` : `ip:${ip}`;

  if (redis) {
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(cap, "1 d"),
      analytics: false,
    });
    
    const cooldownLimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(1, "12 s"),
      analytics: false,
    });

    const [cooldownRes, dailyRes] = await Promise.all([
      cooldownLimit.limit(`cooldown:${key}`),
      ratelimit.limit(`daily:${key}`)
    ]);

    if (!cooldownRes.success) {
      return { allowed: false, remaining: dailyRes.remaining, retryAfter: Math.ceil((cooldownRes.reset - now) / 1000), reason: "cooldown" };
    }
    if (!dailyRes.success) {
      return { allowed: false, remaining: 0, retryAfter: Math.ceil((dailyRes.reset - now) / 1000), reason: "daily-cap" };
    }
    return { allowed: true, remaining: dailyRes.remaining, retryAfter: 0 };
  } else {
    // Memory fallback (Vulnerable to cold starts, but required if env vars are missing)
    const current = memoryRateStore.get(key);

    if (!current || now - current.windowStart > WINDOW_MS) {
      memoryRateStore.set(key, { count: 1, windowStart: now, lastRequest: now });
      return { allowed: true, remaining: cap - 1, retryAfter: 0 };
    }

    const cooldownRemaining = COOLDOWN_MS - (now - current.lastRequest);
    if (cooldownRemaining > 0) {
      return { allowed: false, remaining: Math.max(0, cap - current.count), retryAfter: Math.ceil(cooldownRemaining / 1000), reason: "cooldown" };
    }

    if (current.count >= cap) {
      const retryAfter = Math.ceil((WINDOW_MS - (now - current.windowStart)) / 1000);
      return { allowed: false, remaining: 0, retryAfter, reason: "daily-cap" };
    }

    current.count += 1;
    current.lastRequest = now;
    return { allowed: true, remaining: cap - current.count, retryAfter: 0 };
  }
}

function buildFallbackEdit(text: string, modeLabel = "AI Editing") {
  const normalized = text
    .replace(/[ \t]+/g, " ")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const sentences = normalized
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const commonFixes: Array<[RegExp, string]> = [
    [/\bi am\b/g, "I am"],
    [/\bi\b/g, "I"],
    [/\bdont\b/gi, "do not"],
    [/\bdoesnt\b/gi, "does not"],
    [/\bcant\b/gi, "cannot"],
    [/\bwont\b/gi, "will not"],
    [/\brecieve\b/gi, "receive"],
    [/\bseperate\b/gi, "separate"],
    [/\bdefinately\b/gi, "definitely"],
    [/\bvery very\b/gi, "highly"],
    [/\ba lot of\b/gi, "many"],
    [/\bin order to\b/gi, "to"],
    [/\bdue to the fact that\b/gi, "because"],
    [/\bkind of\b/gi, "somewhat"],
  ];

  const polished = sentences
    .map((sentence) => {
      const withEnding = /[.!?]$/.test(sentence) ? sentence : `${sentence}.`;
      const fixedStart = withEnding.charAt(0).toUpperCase() + withEnding.slice(1);
      return commonFixes.reduce((current, [pattern, replacement]) => current.replace(pattern, replacement), fixedStart);
    })
    .join(" ");

  return {
    editedText: polished || normalized,
    highlights: [
      "Corrected grammar, capitalization, punctuation, and repeated spacing.",
      `Applied a ${modeLabel.toLowerCase()} pass while preserving the original meaning.`,
      "Improved obvious phrasing friction and readability."
    ],
    suggestions: [
      "For high-stakes academic, business, legal, or publication documents, use this as a first pass before human editing."
    ],
  };
}

function normalizeForCompare(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function cleanupEditedText(value: string) {
  return value
    .replace(/[ \t]+/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function parseJsonObject(content: string) {
  const trimmed = content.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("OpenRouter did not return JSON.");
    return JSON.parse(match[0]);
  }
}

async function callOpenRouter(text: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_AI_EDIT_MODEL || process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-lite-001";

  if (!apiKey) {
    return null;
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://www.editandproofread.com",
      "X-Title": "My Editing and Proofreading Desk"
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: MAX_OUTPUT_TOKENS,
      messages: [
        {
          role: "system",
          content:
            "You are a professional proofreading and editing assistant for My Editing and Proofreading Desk. Your job is to edit the user's text, not comment on it. Correct grammar, spelling, punctuation, awkward spacing, sentence structure, clarity, and flow while preserving the original meaning and voice. Do not add unsupported facts. Do not over-edit. Do not simply repeat flawed input. Return valid JSON only."
        },
        {
          role: "user",
          content:
            "Edit the text below. Return JSON with these exact keys: original_text, edited_text, change_summary. original_text must equal the submitted text. edited_text must be the clean corrected version only. change_summary must be an array of 3-5 short strings describing the main improvements. Do not wrap the edited text in markdown.\n\n" +
            `Text:\n${text}`
        }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    throw new Error(`OpenRouter request failed with ${response.status}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new Error("OpenRouter returned an unexpected response.");
  }

  const parsed = parseJsonObject(content) as {
    original_text?: unknown;
    edited_text?: unknown;
    change_summary?: unknown;
    editedText?: unknown;
    highlights?: unknown;
    suggestions?: unknown;
  };
  const modelEditedText = typeof parsed.edited_text === "string" ? parsed.edited_text : typeof parsed.editedText === "string" ? parsed.editedText : "";
  if (!modelEditedText || !Array.isArray(parsed.change_summary ?? parsed.highlights)) {
    throw new Error("OpenRouter response did not match the expected schema.");
  }
  const cleanedModelText = cleanupEditedText(modelEditedText);
  const fallback = buildFallbackEdit(text);
  const editedText = normalizeForCompare(cleanedModelText) === normalizeForCompare(text) && normalizeForCompare(fallback.editedText) !== normalizeForCompare(text)
    ? fallback.editedText
    : cleanedModelText;
  const summary = (parsed.change_summary ?? parsed.highlights) as unknown[];

  return {
    originalText: text,
    editedText,
    highlights: summary.filter((item): item is string => typeof item === "string").slice(0, 5),
    suggestions: Array.isArray(parsed.suggestions)
      ? parsed.suggestions.filter((item): item is string => typeof item === "string").slice(0, 2)
      : ["Use this as a first pass before human review for high-stakes documents."]
  };
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const text = typeof payload.text === "string" ? payload.text.trim() : "";
    const mode = typeof payload.mode === "string" && isEditingModeId(payload.mode) ? payload.mode : "ai-editing";
    
    // Secure Session Validation (Ignore client payload.signedIn)
    const user = await getUser();

    if (!text) {
      return NextResponse.json({ error: "Add text before requesting an AI edit." }, { status: 400 });
    }

    if (text.length > MAX_INPUT_CHARS) {
      return NextResponse.json({ error: "The input is too large for the AI trial. Please shorten it to 1,000 words or less." }, { status: 413 });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: AI_UNAVAILABLE_MESSAGE },
        { status: 503 }
      );
    }

    const wordCount = countWords(text);
    if (wordCount > AI_WORD_LIMIT) {
      return NextResponse.json({ error: `This AI trial supports up to ${AI_WORD_LIMIT.toLocaleString()} words. Your text has ${wordCount.toLocaleString()} words.` }, { status: 422 });
    }

    const ip = getClientIp(request);
    const rate = await checkRateLimit(ip, user);
    if (!rate.allowed) {
      const message = rate.reason === "daily-cap"
        ? "You have reached today's AI trial limit. Submit for full professional review or try again tomorrow."
        : "Please wait a few seconds before sending another AI request.";
      return NextResponse.json({ error: message, retryAfter: rate.retryAfter, remaining: rate.remaining }, { status: 429 });
    }

    const openRouterResult = await callOpenRouter(text).catch((error) => {
      console.error("AI provider request failed:", error);
      return null;
    });
    if (!openRouterResult) {
      return NextResponse.json({ error: AI_UNAVAILABLE_MESSAGE }, { status: 503 });
    }

    return NextResponse.json({
      ...openRouterResult,
      meta: {
        mode,
        wordCount,
        limit: AI_WORD_LIMIT,
        remainingToday: rate.remaining
      }
    });
  } catch (error) {
    console.error("AI editing route failed:", error);
    return NextResponse.json({ error: AI_UNAVAILABLE_MESSAGE }, { status: 500 });
  }
}
