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
    const replyId = searchParams.get("reply");

    const result = replyId
      ? await supabaseAdmin
          .from("contact_message_replies")
          .select("attachment_file_path")
          .eq("id", replyId)
          .eq("message_id", params.id)
          .single()
      : await supabaseAdmin
          .from("contact_messages")
          .select("attachment_file_path")
          .eq("id", params.id)
          .single();

    if (result.error || !result.data?.attachment_file_path) {
      return NextResponse.json({ error: "Message attachment could not be found." }, { status: 404 });
    }

    const { data, error: signedUrlError } = await supabaseAdmin.storage
      .from("uploads")
      .createSignedUrl(result.data.attachment_file_path, 60, { download: action !== "view" });

    if (signedUrlError || !data?.signedUrl) {
      console.error("Admin message attachment signed URL failed:", signedUrlError);
      return NextResponse.json({ error: "Attachment is temporarily unavailable." }, { status: 500 });
    }

    return NextResponse.redirect(data.signedUrl);
  } catch (error) {
    console.error("Admin message attachment route failed:", error);
    return NextResponse.json({ error: "Attachment is temporarily unavailable." }, { status: 500 });
  }
}
