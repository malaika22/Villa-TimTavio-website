import type { AvailabilityNight } from "./types";

export type NightTip = {
  title: string;
  /** The countdown, when there is one to show. */
  count?: string;
  sub?: string;
};

/**
 * How long a hold has left, in words.
 *
 * Null once it has run out, which is not the same as "no clock": a hold that
 * lapsed a minute ago is one the calendar simply hasn't refetched yet, and
 * counting up from zero would be worse than saying nothing.
 */
export function timeLeft(iso: string, now: number): string | null {
  const ms = new Date(iso).getTime() - now;
  if (ms <= 0) return null;

  const mins = Math.floor(ms / 60_000);
  const hours = Math.floor(mins / 60);

  // A hold runs 48 hours, so days are reachable and "37h left" is harder to
  // read than "1d 13h".
  if (hours >= 24) return `${Math.floor(hours / 24)}d ${hours % 24}h left`;
  if (hours > 0) return `${hours}h ${mins % 60}m left`;
  return `${mins}m left`;
}

/**
 * What a cell says when a broker points at it.
 *
 * Open nights say nothing — the number and the rate are already on the cell,
 * and a tooltip repeating them is one nobody reads twice.
 *
 * The changeover cases take the title because they are the surprising ones: a
 * broker looking at a half-shaded cell wants to know which half is theirs
 * before anything else. A held night keeps its countdown underneath either
 * way.
 */
export function nightTip(
  night: AvailabilityNight,
  opts: { canEndHere: boolean; now: number }
): NightTip | null {
  const { canEndHere, now } = opts;

  /**
   * Three states, not two.
   *
   * `undefined` is the transitional one: the teaser and the API deploy
   * separately, so for a window this page may read a response from before the
   * field existed. Folding it in with `null` would announce "held for a
   * confirmed booking" over every pending hold on the calendar, and a
   * confident lie is worse than the silence this had before.
   */
  const held: NightTip | null = (() => {
    if (night.status !== "HELD") return null;
    if (night.heldUntil === undefined) {
      return { title: "Held by another broker" };
    }
    if (night.heldUntil === null) {
      return {
        title: "Held for a confirmed booking",
        sub: "Not expected to open",
      };
    }

    const count = timeLeft(night.heldUntil, now);
    // No clock left means the hold lapsed since this page loaded and the
    // calendar hasn't caught up. Saying "opens again" with nothing to count
    // down would be a promise with no evidence behind it.
    if (!count) return { title: "Held by another broker" };

    return {
      title: "Held by another broker",
      count,
      // Deliberately not a promise. A pending hold can be confirmed rather
      // than lapse, and a bare countdown reads as a guarantee the estate has
      // not made.
      sub: "Opens again if it isn't confirmed",
    };
  })();

  if (canEndHere && night.arrivalDay) {
    return {
      title: "You can still leave this morning",
      count: held?.count,
      sub: "A party arrives this afternoon",
    };
  }
  if (night.arrivalDay) {
    return {
      title: "A party arrives this afternoon",
      count: held?.count,
      sub: held?.sub,
    };
  }
  if (night.departureDay) {
    return {
      title: "A party leaves this morning",
      count: held?.count,
      sub: held?.sub ?? "The night is free",
    };
  }
  if (held) return held;
  if (night.status === "TAKEN") return { title: "Booked" };
  return null;
}
