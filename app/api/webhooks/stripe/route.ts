import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      received: true,
      active: false,
      message: "Stripe payments are coming soon.",
    },
    { status: 202 }
  );
}
