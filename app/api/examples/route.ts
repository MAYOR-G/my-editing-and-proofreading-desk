import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { workExamples } from "@/lib/work-example-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

const validKeys = new Set<string>(workExamples.map((example) => example.key));

function normalizeCategoryKey(value: unknown) {
  const raw = String(value || "").trim();
  if (validKeys.has(raw)) return raw;
  if (raw.toLowerCase() === "geological engineering") return "geological-engineering";
  const normalized = raw.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return validKeys.has(normalized) ? normalized : "";
}

function normalizePublicCandidate(row: any) {
  const rawKey = row.category_key || row.category;
  const key = normalizeCategoryKey(rawKey);
  const pages = row.parsed_content_json || row.parsed_content || [];

  if (!key) return null;
  const isAvailable = Array.isArray(pages)
    && pages.length > 0
    && row.status !== "deleted"
    && row.status !== "inactive"
    && row.is_active !== false
    && row.parse_status !== "failed"
    && row.parse_status !== "none";

  return {
    key,
    example: isAvailable
      ? {
          category_key: key,
          category_label: row.category_label || workExamples.find((example) => example.key === key)?.title || key,
          source_file_name: row.source_file_name || null,
          parsed_content_json: pages,
          parse_status: row.parse_status || "parsed",
          updated_at: row.updated_at || row.created_at || null,
        }
      : null,
    updated_at: row.updated_at || row.created_at || null,
  };
}

function noStoreResponse(examples: unknown[]) {
  return NextResponse.json(
    { examples },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
        "Surrogate-Control": "no-store",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}

export async function GET() {
  try {
    const supabaseAdmin = createSupabaseAdminClient();
    let { data, error } = await supabaseAdmin
      .from("work_examples")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.warn("Public work examples current-schema fetch failed, retrying legacy schema:", error);
      const legacyResult = await supabaseAdmin
        .from("work_examples")
        .select("*")
        .eq("is_active", true)
        .order("updated_at", { ascending: false });

      data = legacyResult.data;
      error = legacyResult.error;

      if (error) {
        console.error("Public work examples fetch failed:", error);
        return noStoreResponse([]);
      }
    }

    const latestByKey = new Map<string, ReturnType<typeof normalizePublicCandidate>>();
    for (const row of data || []) {
      const normalized = normalizePublicCandidate(row);
      if (normalized && !latestByKey.has(normalized.key)) {
        latestByKey.set(normalized.key, normalized);
      }
    }

    return noStoreResponse(Array.from(latestByKey.values()).map((entry) => entry?.example).filter(Boolean));
  } catch (error) {
    console.error("Public work examples route failed:", error);
    return noStoreResponse([]);
  }
}
