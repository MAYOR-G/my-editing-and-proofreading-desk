import { NextResponse } from "next/server";
import { AI_WORD_LIMIT, countWords, editingModes, isEditingModeId } from "@/lib/ai-editing";
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
const MAX_OUTPUT_TOKENS = 650;

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

function buildFallbackEdit(text: string, modeLabel: string) {
  const normalized = text
    .replace(/[ \t]+/g, " ")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const sentences = normalized
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const polished = sentences
    .map((sentence) => {
      const fixedStart = sentence.charAt(0).toUpperCase() + sentence.slice(1);
      return fixedStart
        .replace(/\bvery very\b/gi, "highly")
        .replace(/\ba lot of\b/gi, "many")
        .replace(/\bin order to\b/gi, "to")
        .replace(/\bdue to the fact that\b/gi, "because")
        .replace(/\bkind of\b/gi, "somewhat");
    })
    .join(" ");

  return {
    editedText: polished || normalized,
    highlights: [
      `Applied a ${modeLabel.toLowerCase()} pass with conservative edits.`,
      "Tightened repeated spacing and obvious phrasing friction.",
      "Preserved the original meaning for human review continuity."
    ]
  };
}

async function callOpenRouter(text: string, modeId: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";
  const mode = editingModes.find((item) => item.id === modeId) ?? editingModes[0];

  if (!apiKey) {
    return null;
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://editandproofread.com",
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
            "You are an editorial assistant for a premium proofreading brand. Preserve meaning and voice. Return concise JSON only."
        },
        {
          role: "user",
          content:
            `Task: ${mode.instruction}\n` +
            "Return JSON with editedText and highlights, where highlights is 3 short strings. Do not add facts.\n\n" +
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

  const parsed = JSON.parse(content) as { editedText?: unknown; highlights?: unknown };
  if (typeof parsed.editedText !== "string" || !Array.isArray(parsed.highlights)) {
    throw new Error("OpenRouter response did not match the expected schema.");
  }

  return {
    editedText: parsed.editedText,
    highlights: parsed.highlights.filter((item): item is string => typeof item === "string").slice(0, 4)
  };
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const text = typeof payload.text === "string" ? payload.text.trim() : "";
    const mode = typeof payload.mode === "string" ? payload.mode : "";
    
    // Secure Session Validation (Ignore client payload.signedIn)
    const user = await getUser();

    if (!text) {
      return NextResponse.json({ error: "Add text before requesting an AI edit." }, { status: 400 });
    }

    if (text.length > MAX_INPUT_CHARS) {
      return NextResponse.json({ error: "The input is too large for the AI trial. Please shorten it to 1,000 words or less." }, { status: 413 });
    }

    if (!isEditingModeId(mode)) {
      return NextResponse.json({ error: "Choose a valid editing mode." }, { status: 400 });
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

    const selectedMode = editingModes.find((item) => item.id === mode) ?? editingModes[0];
    const openRouterResult = await callOpenRouter(text, mode).catch(() => null);
    const result = openRouterResult ?? buildFallbackEdit(text, selectedMode.label);

    return NextResponse.json({
      ...result,
      meta: {
        mode,
        wordCount,
        limit: AI_WORD_LIMIT,
        remainingToday: rate.remaining
      }
    });
  } catch {
    return NextResponse.json({ error: "The AI editing service is temporarily unavailable. Your text has not been lost." }, { status: 500 });
  }
}
