import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const supabaseAdmin = createSupabaseAdminClient();
    const searchParams = new URL(request.url).searchParams;
    const action = searchParams.get("action");
    const file = searchParams.get("file");

    const { data: project, error } = await supabaseAdmin
      .from("projects")
      .select("uploaded_file_path, upload_file_path, delivery_file_path")
      .eq("id", params.id)
      .single();

    if (error || !project) {
      return NextResponse.json({ error: "Project file could not be found." }, { status: 404 });
    }

    const path = file === "delivery"
      ? project.delivery_file_path
      : project.uploaded_file_path || project.upload_file_path;
    if (!path) {
      return NextResponse.json({ error: "No uploaded document is attached to this project." }, { status: 404 });
    }

    const { data, error: signedUrlError } = await supabaseAdmin.storage
      .from(file === "delivery" ? "deliveries" : "uploads")
      .createSignedUrl(path, 60, { download: action !== "view" });

    if (signedUrlError || !data?.signedUrl) {
      console.error("Admin signed URL failed:", signedUrlError);
      return NextResponse.json({ error: "Document download is temporarily unavailable." }, { status: 500 });
    }

    return NextResponse.redirect(data.signedUrl);
  } catch (error) {
    console.error("Admin download route failed:", error);
    return NextResponse.json({ error: "Document download is temporarily unavailable." }, { status: 500 });
  }
}
