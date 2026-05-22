import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { parseDocxDocument } from "@/lib/docx-parser";
import { type WorkExampleKey, workExamples } from "@/lib/work-example-data";

export const dynamic = "force-dynamic";

const categoryMap = new Map(workExamples.map((example) => [example.key, example]));

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
  const raw = row.category_key || row.category || "";
  if (categoryMap.has(raw)) return raw;
  if (String(raw).toLowerCase() === "geological engineering") return "geological-engineering";
  return String(raw).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function normalizeRow(row: any) {
  const key = rowKey(row);
  return {
    id: row.id,
    category_key: key,
    category_label: row.category_label || categoryMap.get(key)?.title || row.category || key,
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
  const latestByKey = new Map<string, any>();

  for (const row of rows.map(normalizeRow)) {
    const existing = latestByKey.get(row.category_key);
    if (!existing || new Date(row.updated_at || 0).getTime() > new Date(existing.updated_at || 0).getTime()) {
      latestByKey.set(row.category_key, row);
    }
  }

  return workExamples.map((example) => ({
    category_key: example.key,
    category_label: example.title,
    document_title: example.documentTitle,
    accent: example.accent,
    record: latestByKey.get(example.key) || null,
  }));
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
      return NextResponse.json({
        categories: categoriesWithRows([]),
        setupRequired: true,
        message: "Work examples table is not ready. Run supabase/migration_work_examples.sql.",
      });
    }

    return NextResponse.json({ categories: categoriesWithRows(data || []) });
  } catch (error) {
    console.error("Admin work examples fetch crashed:", error);
    return NextResponse.json({
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
    const categoryKey = String(formData.get("category_key") || "");
    const category = categoryMap.get(categoryKey as WorkExampleKey);

    if (!file || !category) {
      return NextResponse.json({ error: "Missing file or unknown category." }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith(".docx")) {
      return NextResponse.json({ error: "Please upload a DOCX file." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const parsed = await parseDocxDocument(buffer);

    if (!parsed.pages.length || parsed.blockCount === 0) {
      return NextResponse.json({ error: "Uploaded, but parsing failed. Please check the document and try again." }, { status: 400 });
    }

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
      return NextResponse.json({ error: "Upload failed while saving the source document." }, { status: 500 });
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

    let { data: example, error: dbError } = await auth.adminClient
      .from("work_examples")
      .upsert(payload, { onConflict: "category_key" })
      .select()
      .single();

    if (dbError) {
      console.warn("Work example save with current schema failed, retrying legacy schema:", dbError);
      await auth.adminClient
        .from("work_examples")
        .delete()
        .eq("category", categoryKey);

      const legacyResult = await auth.adminClient
        .from("work_examples")
        .insert({
          category: categoryKey,
          title: category.documentTitle,
          description: category.authorLine,
          parsed_content: parsed.pages,
          source_file_path: fileName,
          is_active: true,
        })
        .select()
        .single();

      example = legacyResult.data;
      dbError = legacyResult.error;

      if (dbError) {
        console.error("Work example save failed:", dbError);
        await auth.adminClient.storage.from("uploads").remove([fileName]);
        return NextResponse.json({ error: "Upload failed while saving the parsed document." }, { status: 500 });
      }
    }

    revalidatePath("/");
    revalidatePath("/admin/examples");

    return NextResponse.json({
      success: true,
      example: normalizeRow(example),
      message: `${category.title} uploaded and parsed successfully. ${parsed.blockCount} document blocks saved.`,
      warning: parsed.warning || null,
    });
  } catch (error) {
    console.error("Work example upload handler failed:", error);
    if (fileName) await auth.adminClient.storage.from("uploads").remove([fileName]);
    return NextResponse.json({ error: "Upload failed while processing the document." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdminJson();
  if (auth.error) return auth.error;

  const { searchParams } = new URL(req.url);
  const categoryKey = searchParams.get("category_key") || "";

  if (!categoryMap.has(categoryKey as WorkExampleKey)) {
    return NextResponse.json({ error: "Unknown category." }, { status: 400 });
  }

  let { error } = await auth.adminClient
    .from("work_examples")
    .update({
      status: "deleted",
      is_active: false,
      parsed_content_json: [],
      parsed_content: [],
      source_file_name: null,
      source_file_path: null,
      source_doc_url: null,
      parse_status: "none",
      parse_warning: null,
      parsed_block_count: 0,
      updated_at: new Date().toISOString(),
    })
    .eq("category_key", categoryKey);

  if (error) {
    console.warn("Work example delete with current schema failed, retrying legacy schema:", error);
    const legacyResult = await auth.adminClient
      .from("work_examples")
      .update({
        is_active: false,
        parsed_content: [],
        source_file_path: null,
      })
      .eq("category", categoryKey);

    error = legacyResult.error;

    if (error) {
      console.error("Work example delete failed:", error);
      return NextResponse.json({ error: "Failed to delete work example." }, { status: 500 });
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/examples");

  return NextResponse.json({ success: true });
}
