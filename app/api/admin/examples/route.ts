import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { parseDocxDocument } from "@/lib/docx-parser";
import { type WorkExampleKey, workExamples } from "@/lib/work-example-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

const categoryMap = new Map(workExamples.map((example) => [example.key, example]));
const validCategoryKeys = new Set(workExamples.map((example) => example.key));

function normalizeCategoryKey(value: unknown) {
  const raw = String(value || "").trim();
  if (validCategoryKeys.has(raw as WorkExampleKey)) return raw as WorkExampleKey;
  if (raw.toLowerCase() === "geological engineering") return "geological-engineering";
  const normalized = raw.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return validCategoryKeys.has(normalized as WorkExampleKey) ? normalized as WorkExampleKey : null;
}

async function requireAdminJson() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const adminClient = createSupabaseAdminClient();
  const { data: profile, error } = await adminClient
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || profile?.role !== "admin") {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { user, adminClient };
}

function rowKey(row: any) {
  return normalizeCategoryKey(row.category_key || row.category) || "";
}

function normalizeRow(row: any) {
  const key = rowKey(row) || String(row.category_key || row.category || "");
  return {
    id: row.id,
    category_key: key,
    category_label: row.category_label || categoryMap.get(key as WorkExampleKey)?.title || row.category || key,
    source_file_name: row.source_file_name || row.source_file_path?.split("/").pop() || null,
    source_file_path: row.source_file_path || null,
    source_doc_url: row.source_doc_url || null,
    parsed_content_json: row.parsed_content_json || row.parsed_content || [],
    parse_status: row.parse_status || (row.parsed_content || row.parsed_content_json ? "parsed" : "none"),
    status: row.status || (row.is_active === false ? "inactive" : "active"),
    is_active: row.is_active !== false && row.status !== "deleted",
    parse_warning: row.parse_warning || null,
    parsed_block_count: row.parsed_block_count ?? null,
    uploaded_by: row.uploaded_by || null,
    created_at: row.created_at || null,
    updated_at: row.updated_at || row.created_at || null,
  };
}

function categoriesWithRows(rows: any[]) {
  const latestActiveByKey = new Map<string, any>();

  for (const row of rows.map(normalizeRow)) {
    const hasParsedContent = Array.isArray(row.parsed_content_json) && row.parsed_content_json.length > 0;
    const isCurrentDocument = row.is_active && row.status !== "deleted" && row.parse_status !== "none" && hasParsedContent;
    if (!isCurrentDocument) continue;

    const existing = latestActiveByKey.get(row.category_key);
    if (!existing || new Date(row.updated_at || 0).getTime() > new Date(existing.updated_at || 0).getTime()) {
      latestActiveByKey.set(row.category_key, row);
    }
  }

  return workExamples.map((example) => ({
    category_key: example.key,
    category_label: example.title,
    document_title: example.documentTitle,
    accent: example.accent,
    record: latestActiveByKey.get(example.key) || null,
  }));
}

async function getRowsForCategory(adminClient: ReturnType<typeof createSupabaseAdminClient>, categoryKey: WorkExampleKey) {
  const { data, error } = await adminClient
    .from("work_examples")
    .select("*");

  if (error) {
    return { rows: [], error };
  }

  return {
    rows: (data || []).filter((row) => rowKey(row) === categoryKey),
    error: null,
  };
}

function legacyPayloadFor(categoryKey: WorkExampleKey, category: NonNullable<ReturnType<typeof categoryMap.get>>, parsedPages: unknown[], filePath: string | null, now: string) {
  return {
    category: categoryKey,
    title: category.documentTitle,
    description: category.authorLine,
    parsed_content: parsedPages,
    source_file_path: filePath,
    is_active: true,
    updated_at: now,
  };
}

async function removeStoredFiles(adminClient: ReturnType<typeof createSupabaseAdminClient>, paths: Array<string | null | undefined>) {
  const uniquePaths = Array.from(new Set(paths.filter(Boolean))) as string[];
  if (!uniquePaths.length) return;

  const { error } = await adminClient.storage.from("uploads").remove(uniquePaths);
  if (error) {
    console.warn("Work example old storage cleanup failed:", error);
  }
}

function noStoreJson(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store, no-cache, max-age=0, must-revalidate");
  headers.set("CDN-Cache-Control", "no-store");
  headers.set("Vercel-CDN-Cache-Control", "no-store");
  headers.set("Surrogate-Control", "no-store");
  headers.set("Pragma", "no-cache");
  headers.set("Expires", "0");
  return NextResponse.json(body, { ...init, headers });
}

export async function GET() {
  const auth = await requireAdminJson();
  if (auth.error) return auth.error;

  try {
    const { data, error } = await auth.adminClient
      .from("work_examples")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Admin work examples fetch failed:", error);
      return noStoreJson({
        categories: categoriesWithRows([]),
        setupRequired: true,
        message: "Work examples table is not ready. Run supabase/migration_work_examples.sql.",
      });
    }

    return noStoreJson({ categories: categoriesWithRows(data || []) });
  } catch (error) {
    console.error("Admin work examples fetch crashed:", error);
    return noStoreJson({
      categories: categoriesWithRows([]),
      setupRequired: true,
      message: "Work examples could not be loaded. Check server logs and Supabase setup.",
    });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdminJson();
  if (auth.error) return auth.error;

  let fileName: string | null = null;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const categoryKey = normalizeCategoryKey(formData.get("category_key"));
    const category = categoryKey ? categoryMap.get(categoryKey) : null;

    if (!file || !categoryKey || !category) {
      return noStoreJson({ error: "Missing file or unknown category." }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith(".docx")) {
      return noStoreJson({ error: "Please upload a DOCX file." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const parsed = await parseDocxDocument(buffer);

    if (!parsed.pages.length || parsed.blockCount === 0) {
      return noStoreJson({ error: "Uploaded, but parsing failed. Please check the document and try again." }, { status: 400 });
    }

    const existingResult = await getRowsForCategory(auth.adminClient, categoryKey);
    if (existingResult.error) {
      console.error("Work example preflight fetch failed:", existingResult.error);
      return noStoreJson({ error: "Upload failed while checking the current work example." }, { status: 500 });
    }
    const existingRows = existingResult.rows;
    const previousPaths = existingRows.map((row) => row.source_file_path);
    const rowToReplace = existingRows
      .slice()
      .sort((a, b) => new Date(b.updated_at || b.created_at || 0).getTime() - new Date(a.updated_at || a.created_at || 0).getTime())[0];

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    fileName = `examples/${categoryKey}/${crypto.randomUUID()}-${safeName}`;
    const { error: uploadError } = await auth.adminClient.storage
      .from("uploads")
      .upload(fileName, buffer, {
        contentType: file.type || "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        upsert: false,
      });

    if (uploadError) {
      console.error("Work example storage upload failed:", uploadError);
      return noStoreJson({ error: "Upload failed while saving the source document." }, { status: 500 });
    }

    const now = new Date().toISOString();
    const payload = {
      category_key: categoryKey,
      category_label: category.title,
      category: categoryKey,
      title: category.documentTitle,
      description: category.authorLine,
      source_file_name: file.name,
      source_file_path: fileName,
      source_doc_url: fileName,
      parsed_content_json: parsed.pages,
      parsed_content: parsed.pages,
      parse_status: "parsed",
      status: "active",
      is_active: true,
      parse_warning: parsed.warning || null,
      parsed_block_count: parsed.blockCount,
      uploaded_by: auth.user.id,
      updated_at: now,
    };

    let saveResult = rowToReplace?.id
      ? await auth.adminClient
          .from("work_examples")
          .update(payload)
          .eq("id", rowToReplace.id)
          .select()
          .single()
      : await auth.adminClient
          .from("work_examples")
          .insert(payload)
          .select()
          .single();

    if (saveResult.error) {
      console.warn("Work example save with current schema failed, retrying legacy schema:", saveResult.error);
      const legacyPayload = legacyPayloadFor(categoryKey, category, parsed.pages, fileName, now);
      saveResult = rowToReplace?.id
        ? await auth.adminClient
            .from("work_examples")
            .update(legacyPayload)
            .eq("id", rowToReplace.id)
            .select()
            .single()
        : await auth.adminClient
            .from("work_examples")
            .insert(legacyPayload)
            .select()
            .single();
    }

    const example = saveResult.data;
    const dbError = saveResult.error;

    if (dbError || !example?.id) {
      console.error("Work example save failed:", dbError);
      await auth.adminClient.storage.from("uploads").remove([fileName]);
      return noStoreJson({ error: "Upload failed while saving the parsed document." }, { status: 500 });
    }

    const duplicateIds = existingRows.map((row) => row.id).filter((id) => id && id !== example.id);
    if (duplicateIds.length) {
      let { error: duplicateError } = await auth.adminClient
        .from("work_examples")
        .delete()
        .in("id", duplicateIds);

      if (duplicateError) {
        console.warn("Work example duplicate delete failed, retrying legacy cleanup:", duplicateError);
        const legacyCleanup = await auth.adminClient
          .from("work_examples")
          .update({
            is_active: false,
            parsed_content: [],
            source_file_path: null,
          })
          .in("id", duplicateIds);
        duplicateError = legacyCleanup.error;
      }

      if (duplicateError) {
        console.warn("Work example duplicate cleanup failed:", duplicateError);
      }
    }

    await removeStoredFiles(auth.adminClient, previousPaths.filter((path) => path !== fileName));

    revalidatePath("/");
    revalidatePath("/admin/examples");

    return noStoreJson({
      success: true,
      example: normalizeRow(example),
      message: `${category.title} uploaded and parsed successfully. ${parsed.blockCount} document blocks saved.`,
      warning: parsed.warning || null,
    });
  } catch (error) {
    console.error("Work example upload handler failed:", error);
    if (fileName) await auth.adminClient.storage.from("uploads").remove([fileName]);
    return noStoreJson({ error: "Upload failed while processing the document." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdminJson();
  if (auth.error) return auth.error;

  const { searchParams } = new URL(req.url);
  const categoryKey = normalizeCategoryKey(searchParams.get("category_key"));

  if (!categoryKey) {
    return noStoreJson({ error: "Unknown category." }, { status: 400 });
  }

  const existingResult = await getRowsForCategory(auth.adminClient, categoryKey);
  if (existingResult.error) {
    console.error("Work example delete preflight failed:", existingResult.error);
    return noStoreJson({ error: "Failed to find the current work example." }, { status: 500 });
  }

  const ids = existingResult.rows.map((row) => row.id).filter(Boolean);
  const oldPaths = existingResult.rows.map((row) => row.source_file_path);

  if (!ids.length) {
    revalidatePath("/");
    revalidatePath("/admin/examples");
    return noStoreJson({ success: true });
  }

  let { error } = await auth.adminClient
    .from("work_examples")
    .delete()
    .in("id", ids);

  if (error) {
    console.warn("Work example row delete failed, retrying legacy deactivation:", error);
    const legacyResult = await auth.adminClient
      .from("work_examples")
      .update({
        is_active: false,
        parsed_content: [],
        source_file_path: null,
      })
      .in("id", ids);
    error = legacyResult.error;
  }

  if (error) {
    console.error("Work example delete failed:", error);
    return noStoreJson({ error: "Failed to delete work example." }, { status: 500 });
  }

  await removeStoredFiles(auth.adminClient, oldPaths);

  revalidatePath("/");
  revalidatePath("/admin/examples");

  return noStoreJson({ success: true });
}
