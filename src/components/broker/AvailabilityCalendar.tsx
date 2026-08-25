"use client";

import { cn } from "@/lib/utils";

import type { AvailabilityNight } from "./types";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * The occupied half of a changeover day.
 *
 * A stay runs from an afternoon to a morning, so its first and last dates are
 * half-days. The filled corner is always the occupied one — bottom-right on an
 * arrival, top-left on a departure — which makes a booking read as one shape
 * with angled ends rather than a run of identical squares.
 *
 * Built as an inline gradient rather than a Tailwind arbitrary value: the
 * commas and percentages inside `linear-gradient()` need escaping that makes
 * the class unreadable, and this earns its place as real CSS.
 */
const edgeFill = (kind: "arrival" | "departure"): string =>
  kind === "arrival"
    ? "linear-gradient(135deg, transparent 0 50%, #e4ded3 50% 100%)"
    : "linear-gradient(135deg, #e4ded3 0 50%, transparent 50% 100%)";

export const monthLabel = (year: number, month: number) =>
  `${MONTH_NAMES[month]} ${year}`;

/**
 * One month of nights.
 *
 * Three of these sit side by side, which is the whole reason the page is faster
 * than asking. A broker on the phone asks "what's open in the autumn?", not
 * "what about the 14th" — a single month makes them click and wait for an
 * answer they could have read at a glance.
 */
export const AvailabilityCalendar = ({
  year,
  month,
  nights,
  start,
  end,
  hovered,
  onPick,
  onHover,
  money,
  priced,
}: {
  year: number;
  month: number;
  /** Every night the API returned, keyed lookup done here. */
  nights: Map<string, AvailabilityNight>;
  start: string | null;
  end: string | null;
  hovered: string | null;
  onPick: (date: string) => void;
  onHover: (date: string | null) => void;
  /** Compact per-night rate in the estate's currency, or null if unpriced. */
  money: (value: number | null) => string | null;
  /**
   * Whether the estate has any rates at all. Distinct from a single night
   * having none: with nothing priced the calendar drops the second line
   * entirely and returns to square cells, rather than printing ninety em
   * dashes to say the same thing once.
   */
  priced: boolean;
}) => {
  const first = new Date(year, month, 1);
  const total = new Date(year, month + 1, 0).getDate();
  const lead = first.getDay();

  // Previewing the range under the cursor before it's committed, so the broker
  // can see how many nights they're about to ask for without clicking first.
  const previewEnd = start && !end && hovered && hovered > start ? hovered : null;
  const rangeEnd = end ?? previewEnd;

  // Only the minimum stay is summarised now. A "from $X" header made sense
  // when no date carried a price; with every sellable night showing its own,
  // repeating the cheapest just competes with the grid it sits above.
  const minNights = (() => {
    let min = 0;
    for (let d = 1; d <= total; d++) {
      const night = nights.get(
        `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      );
      if (night) min = Math.max(min, night.minNights);
    }
    return min;
  })();

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="font-[family-name:var(--font-cormorant)] text-[19px] text-[#3a3530]">
          {MONTH_NAMES[month]}
        </h3>
        {minNights > 0 && (
          <span className="text-[10px] uppercase tracking-[0.1em] text-[#a89e90]">
            {minNights}-night min
          </span>
        )}
      </div>

      <div className="mb-1.5 grid grid-cols-7 gap-[3px]">
        {WEEKDAYS.map((d, i) => (
          <span
            key={i}
            className="flex h-6 items-center justify-center text-[9px] uppercase tracking-wide text-[#a89e90]"
          >
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-[3px]">
        {Array.from({ length: lead }).map((_, i) => (
          <span key={`pad-${i}`} aria-hidden="true" />
        ))}

        {Array.from({ length: total }).map((_, i) => {
          const dayNum = i + 1;
          const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
          const night = nights.get(date);

          // Outside the window the API answered for — render it, but inert.
          // A blank cell reads as a bug; a quiet one reads as "not yet".
          if (!night) {
            return (
              <span
                key={date}
                className={cn(
                  "flex items-center justify-center rounded-[4px] text-[12px] text-[#d5cec2]",
                  priced ? "aspect-[1/1.3]" : "aspect-square",
                )}
              >
                {dayNum}
              </span>
            );
          }

          const open = night.status === "OPEN";
          const isStart = date === start;
          const isEnd = date === end;
          const inRange =
            !!start && !!rangeEnd && date >= start && date <= rangeEnd;
          const isEndpoint = isStart || isEnd;

          return (
            <button
              key={date}
              type="button"
              disabled={!open}
              onClick={() => onPick(date)}
              onMouseEnter={() => onHover(date)}
              onMouseLeave={() => onHover(null)}
              title={
                night.arrivalDay
                  ? "A party arrives this afternoon"
                  : night.departureDay
                    ? "A party leaves this morning — the night is free"
                    : night.status === "TAKEN"
                      ? "Taken"
                      : night.status === "HELD"
                        ? "Held by another broker"
                        : undefined
              }
              className={cn(
                "relative flex flex-col items-center justify-center gap-[3px] overflow-hidden rounded-[4px] leading-none tabular-nums transition-all duration-150",
                priced ? "aspect-[1/1.3]" : "aspect-square",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c7261]",
                open && !inRange && "text-[#3a3530] hover:bg-[#efe9e0]",
                inRange && !isEndpoint && "bg-[#ece3dd] text-[#6f5a4c]",
                isEndpoint &&
                  "bg-[#8c7261] font-medium text-white shadow-[0_2px_8px_rgba(140,114,97,0.35)]",
                // An arrival is occupied, but only from the afternoon — so it
                // takes the muted text without the full fill, and lets the
                // wedge behind it show which half is actually sold. Filling
                // the whole cell would bury the diagonal completely.
                night.status === "TAKEN" &&
                  !night.arrivalDay &&
                  "cursor-not-allowed bg-[#ebe6dd] text-[#b9b1a4]",
                night.status === "TAKEN" &&
                  night.arrivalDay &&
                  "cursor-not-allowed text-[#b9b1a4]",
                night.status === "HELD" &&
                  !night.arrivalDay &&
                  "cursor-not-allowed border border-dashed border-[#b99b6d] text-[#a8894f]",
                night.status === "HELD" &&
                  night.arrivalDay &&
                  "cursor-not-allowed text-[#a8894f]",
              )}
            >
              {/* Behind the number, and only when the cell isn't part of a
                  selection — a half-tint under the selected band would read as
                  a rendering fault rather than a changeover. */}
              {(night.arrivalDay || night.departureDay) && !inRange && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: edgeFill(
                      night.arrivalDay ? "arrival" : "departure",
                    ),
                  }}
                />
              )}

              <span
                className={cn(
                  "relative text-[12px]",
                  night.status === "TAKEN" && "line-through",
                )}
              >
                {dayNum}
              </span>
              {/* Priced only where it can be sold. A rate on a night nobody
                  can buy is a number competing for attention with the ninety
                  others on screen, and it answers no question the broker has. */}
              {priced && (
                <span
                  className={cn(
                    "h-[9px] text-[8.5px]",
                    isEndpoint || inRange ? "opacity-90" : "text-[#a89e90]",
                  )}
                >
                  {open && !night.arrivalDay ? (money(night.rate) ?? "—") : ""}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
