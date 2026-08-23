/**
 * The estate-manager API (NestJS) that owns availability and holds.
 *
 * Same target the inquiry route already posts to. Kept in one place because
 * both broker route handlers need it.
 *
 * The guard below is the point of the file. `BROKER_API_SECRET` is the only
 * thing standing between the estate's calendar and the open internet, so a
 * refactor that pulls this into a client component must fail loudly rather
 * than ship the secret to a browser. (`server-only` would be the idiomatic
 * guard, but it isn't a declared dependency here — Next merely aliases it —
 * and a leak this bad shouldn't rest on a transitive resolution.)
 */
if (typeof window !== "undefined") {
  throw new Error(
    "broker-api is server-only — importing it from a client component would " +
      "bundle BROKER_API_SECRET into the browser.",
  );
}

const MONOREPO_API_URL =
  process.env.MONOREPO_API_URL ?? "https://casa-timtavio-api.onrender.com";

export class BrokerApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

export async function brokerApi<T = unknown>(
  path: string,
  init?: { method?: "GET" | "POST"; body?: unknown },
): Promise<T> {
  const secret = process.env.BROKER_API_SECRET;
  if (!secret) {
    throw new BrokerApiError("Broker access is not configured", 500);
  }

  const response = await fetch(`${MONOREPO_API_URL}${path}`, {
    method: init?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      "x-broker-secret": secret,
    },
    ...(init?.body ? { body: JSON.stringify(init.body) } : {}),
    cache: "no-store",
  });

  const text = await response.text();
  const payload = text ? safeJson(text) : null;

  if (!response.ok) {
    // The API's own message is the useful one — "Someone has just held part of
    // those dates" tells the broker what to do, where a status code doesn't.
    //
    // Validation failures arrive as an array, and joining them produced a
    // paragraph naming internal fields: "brokerEmail must be shorter than or
    // equal to 160 characters, That doesn't look like an email address,
    // guestCount must not be greater than 14…". Five complaints about two
    // fields, in the API's vocabulary rather than the broker's. One is enough
    // to act on, and the proxy checks the obvious cases before it gets here.
    const raw = (payload as { message?: string | string[] } | null)?.message;
    const message = Array.isArray(raw)
      ? (raw[0] ?? "Something went wrong")
      : (raw ?? "Something went wrong");

    throw new BrokerApiError(message, response.status);
  }

  return payload as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
