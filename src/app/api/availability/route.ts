import { NextRequest, NextResponse } from "next/server";

import { brokerApi } from "@/lib/broker-api";

type Night = { date: string; status: "OPEN" | "TAKEN" | "HELD" };

/**
 * Which nights the villa is already sold, for the inquiry form's date picker.
 *
 * Reads the same estate endpoint the broker calendar uses, but answers with a
 * far narrower shape. Two things are deliberately stripped here rather than
 * filtered on the page:
 *
 * Nightly rates. The estate publishes no prices on the public site, and
 * anything this route returns is readable by anyone who opens the page. Doing
 * this in the browser would ship the rates and then hide them.
 *
 * Which nights are *held* versus booked. A hold is a soft 48-hour claim by a
 * broker; the estate would rather take a direct enquiry than refuse one for a
 * week that may well reopen on Thursday, and Rodrigo sees the collision when he
 * reviews it. So a held night is offered as available, and the distinction never
 * leaves this server.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  try {
    const data = await brokerApi<{ nights?: Night[] }>(
      `/api/v1/broker/public/availability?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
    );

    const booked = (data?.nights ?? [])
      .filter((n) => n.status === "TAKEN")
      .map((n) => n.date);

    return NextResponse.json({ booked });
  } catch {
    // Deliberately not an error status. The picker treats a failure as "every
    // date is open", and an inquiry form that turns people away because an
    // upstream call was slow costs the estate far more than a calendar showing
    // a week it can't actually sell — which Rodrigo catches by hand anyway.
    return NextResponse.json({ booked: [], degraded: true });
  }
}
