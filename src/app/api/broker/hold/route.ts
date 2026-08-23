import { NextRequest, NextResponse } from "next/server";

import { BrokerApiError, brokerApi } from "@/lib/broker-api";

/**
 * Placing a 48-hour hold.
 *
 * Only the fields the API accepts are forwarded — never the whole body. The
 * estimate the page showed is deliberately not among them: the API prices the
 * range itself, because a client-supplied total is a total anyone can choose.
 *
 * The cost of that whitelist is that it silently drops anything added upstream
 * without being added here too, which is exactly what happened when the hold
 * form grew an email and a guest count: the page collected them, the API
 * demanded them, and this route quietly threw them away in between. A broker
 * saw four validation errors about fields that were plainly filled in.
 *
 * So when the shape changes, it changes in three places — the form, this
 * route, and the DTO.
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Malformed request" }, { status: 400 });
  }

  const brokerName = String(body.brokerName ?? "").trim();
  const brokerEmail = String(body.brokerEmail ?? "").trim();
  const brokerAgency = String(body.brokerAgency ?? "").trim();
  const checkIn = String(body.checkIn ?? "");
  const checkOut = String(body.checkOut ?? "");
  const note = String(body.note ?? "").trim();
  const guestCount = Number(body.guestCount);

  if (!brokerName || !brokerEmail || !checkIn || !checkOut) {
    return NextResponse.json(
      { message: "Tell us who you are and which dates you'd like" },
      { status: 400 },
    );
  }

  if (!Number.isInteger(guestCount) || guestCount < 1) {
    return NextResponse.json(
      { message: "How many guests are staying?" },
      { status: 400 },
    );
  }

  try {
    const data = await brokerApi("/api/v1/broker/public/holds", {
      method: "POST",
      body: {
        brokerName,
        brokerEmail,
        guestCount,
        checkIn,
        checkOut,
        ...(brokerAgency ? { brokerAgency } : {}),
        ...(note ? { note } : {}),
      },
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
