import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { workExamples } from "@/lib/work-example-data";

export const dynamic = "force-dynamic";

const validKeys = new Set(workExamples.map((example) => example.key));

function normalizePublicRow(row: any) {
  const rawKey = row.category_key || row.category;
  const key = validKeys.has(rawKey)
    ? rawKey
    : String(rawKey || "").toLowerCase() === "geological engineering"
      ? "geological-engineering"
      : String(rawKey || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const pages = row.parsed_content_json || row.parsed_content || [];

  if (!validKeys.has(key) || !Array.isArray(pages) || pages.length === 0) return null;
  if (row.status === "deleted" || row.is_active === false || row.parse_status === "failed") return null;

  return {
    category_key: key,
    category_label: row.category_label || workExamples.find((example) => example.key === key)?.title || key,
    source_file_name: row.source_file_name || null,
    parsed_content_json: pages,
    parse_status: row.parse_status || "parsed",
    updated_at: row.updated_at || row.created_at || null,
  };
}

export async function GET() {
  try {
    const supabaseAdmin = createSupabaseAdminClient();
    let { data, error } = await supabaseAdmin
      .from("work_examples")
      .select("*")
      .eq("is_active", true)
      .neq("status", "deleted")
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
        return NextResponse.json({ examples: [] }, { headers: { "Cache-Control": "no-store" } });
      }
    }

    const latestByKey = new Map<string, ReturnType<typeof normalizePublicRow>>();
    for (const row of data || []) {
      const normalized = normalizePublicRow(row);
      if (normalized && !latestByKey.has(normalized.category_key)) {
        latestByKey.set(normalized.category_key, normalized);
      }
    }

    return NextResponse.json(
      { examples: Array.from(latestByKey.values()).filter(Boolean) },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Public work examples route failed:", error);
    return NextResponse.json({ examples: [] }, { headers: { "Cache-Control": "no-store" } });
  }
}
