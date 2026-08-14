import { NextRequest, NextResponse } from "next/server";

import { BrokerApiError, brokerApi } from "@/lib/broker-api";

/**
 * Placing a 48-hour hold.
 *
 * Only the four fields the API accepts are forwarded — never the whole body.
 * The estimate the page showed is deliberately not among them: the API prices
 * the range itself, because a client-supplied total is a total anyone can
 * choose.
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Malformed request" }, { status: 400 });
  }

  const brokerName = String(body.brokerName ?? "").trim();
  const checkIn = String(body.checkIn ?? "");
  const checkOut = String(body.checkOut ?? "");
  const note = String(body.note ?? "").trim();

  if (!brokerName || !checkIn || !checkOut) {
    return NextResponse.json(
      { message: "Tell us who you are and which dates you'd like" },
      { status: 400 },
    );
  }

  try {
    const data = await brokerApi("/api/v1/broker/public/holds", {
      method: "POST",
      body: { brokerName, checkIn, checkOut, ...(note ? { note } : {}) },
    });
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof BrokerApiError) {
      // A 400 here is nearly always "those dates just went" — a real answer the
      // broker needs to see, not an error to swallow behind a generic message.
      return NextResponse.json(
        { message: error.message },
        { status: error.status === 400 ? 409 : 502 },
      );
    }
    return NextResponse.json(
      { message: "We couldn't place that hold" },
      { status: 502 },
    );
  }
}
