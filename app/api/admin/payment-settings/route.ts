import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { normalizePaymentSettings, updatePaymentSettings } from "@/lib/payment-settings";
import { createClient } from "@/utils/supabase/server";

export async function PATCH(request: Request) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: "Admin sign-in required." }, { status: 401 });
    }

    const supabaseAdmin = createSupabaseAdminClient();
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ success: false, error: "Admin access required." }, { status: 403 });
    }

    const body = await request.json();
    const settings = normalizePaymentSettings(body?.settings);
    const saved = await updatePaymentSettings(settings);
    return NextResponse.json({ success: true, settings: saved });
  } catch (error) {
    console.error("Payment settings update error:", error);
    return NextResponse.json(
      { success: false, error: "Payment settings could not be saved." },
      { status: 500 }
    );
  }
}
