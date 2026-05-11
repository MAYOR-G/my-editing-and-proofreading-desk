import { NextResponse } from "next/server";
import { getPaymentSettings } from "@/lib/payment-settings";
import { getPaymentProviderReadiness } from "@/lib/payment";

export async function GET() {
  try {
    const settings = await getPaymentSettings();
    return NextResponse.json({ success: true, settings, readiness: getPaymentProviderReadiness() });
  } catch (error) {
    console.error("Payment settings fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Payment settings could not be loaded." },
      { status: 500 }
    );
  }
}
