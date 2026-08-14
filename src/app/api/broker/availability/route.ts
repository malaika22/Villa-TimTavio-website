import { NextRequest, NextResponse } from "next/server";

import { brokerApi } from "@/lib/broker-api";

/**
 * Availability for the broker calendar.
 *
 * A proxy rather than a direct call from the browser, for one reason: the
 * shared secret. The estate issues a single link to every broker instead of an
 * account each, so the only thing guarding the API is that secret — and a
 * secret shipped to a browser is not a secret. It stays on this server, exactly
 * as the inquiry route already does with the monorepo API.
 *
 * Route Handlers aren't cached by default in this version of Next, which is
 * what we want: the API does its own short-lived caching, and a stale calendar
 * is the one thing a broker can't forgive.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  try {
    const data = await brokerApi(
      `/api/v1/broker/public/availability?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
    );
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Availability is unavailable";
    // 502 rather than 500: the failure is upstream, and the page says so
    // instead of pretending the villa is wide open.
    return NextResponse.json({ message }, { status: 502 });
  }
}
