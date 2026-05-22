import { NextResponse } from "next/server";
import { getDashboardProjectOwnerIds } from "@/lib/dashboard-projects";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Please sign in to access this document." }, { status: 401 });
    }

    const supabaseAdmin = createSupabaseAdminClient();
    const ownerIds = await getDashboardProjectOwnerIds(user);
    const searchParams = new URL(request.url).searchParams;
    const action = searchParams.get("action");
    const file = searchParams.get("file");

    const { data: project, error } = await supabaseAdmin
      .from("projects")
      .select("client_id, uploaded_file_path, upload_file_path, delivery_file_path")
      .eq("id", params.id)
      .single();

    if (error || !project || !ownerIds.includes(project.client_id)) {
      return NextResponse.json({ error: "Project document could not be found." }, { status: 404 });
    }

    const isDelivery = file === "delivery";
    const path = isDelivery
      ? project.delivery_file_path
      : project.uploaded_file_path || project.upload_file_path;

    if (!path) {
      return NextResponse.json({ error: "No document is attached to this project yet." }, { status: 404 });
    }

    const { data, error: signedUrlError } = await supabaseAdmin.storage
      .from(isDelivery ? "deliveries" : "uploads")
      .createSignedUrl(path, 60, { download: action !== "view" });

    if (signedUrlError || !data?.signedUrl) {
      console.error("Project signed URL failed:", signedUrlError);
      return NextResponse.json({ error: "Document access is temporarily unavailable." }, { status: 500 });
    }

    return NextResponse.redirect(data.signedUrl);
  } catch (error) {
    console.error("Project file route failed:", error);
    return NextResponse.json({ error: "Document access is temporarily unavailable." }, { status: 500 });
  }
}
