import { NextResponse } from "next/server";

/**
 * POST /api/webhooks/flutterwave
 *
 * Placeholder route for the future Flutterwave integration. It intentionally
 * does not process events while Flutterwave is marked "Coming soon".
 */
export async function POST() {
  return NextResponse.json(
    {
      received: true,
      active: false,
      message: "Flutterwave payments are coming soon.",
    },
    { status: 202 }
  );
}
