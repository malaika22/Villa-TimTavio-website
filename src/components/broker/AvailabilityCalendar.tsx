"use client";

import { cn } from "@/lib/utils";

import type { AvailabilityNight } from "./types";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

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
}) => {
  const first = new Date(year, month, 1);
  const total = new Date(year, month + 1, 0).getDate();
  const lead = first.getDay();

  // Previewing the range under the cursor before it's committed, so the broker
  // can see how many nights they're about to ask for without clicking first.
  const previewEnd = start && !end && hovered && hovered > start ? hovered : null;
  const rangeEnd = end ?? previewEnd;

  // Taken from the month's own nights rather than the selection, so a broker
  // scanning the page knows the terms before they click anything — which is
  // the question their client asks straight after "is it free?".
  const summary = (() => {
    let cheapest: number | null = null;
    let minNights = 0;
    for (let d = 1; d <= total; d++) {
      const night = nights.get(
        `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      );
      if (!night) continue;
      if (night.rate != null && (cheapest == null || night.rate < cheapest)) {
        cheapest = night.rate;
      }
      minNights = Math.max(minNights, night.minNights);
    }
    return { cheapest, minNights };
  })();

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <h3 className="font-[family-name:var(--font-cormorant)] text-[19px] text-[#3a3530]">
          {MONTH_NAMES[month]}
        </h3>
        {summary.minNights > 0 && (
          <span className="text-[10px] uppercase tracking-[0.1em] text-[#a89e90]">
            {summary.minNights}-night min
          </span>
        )}
      </div>

      <p className="mb-3 h-4 text-[11px] tabular-nums text-[#a89e90]">
        {summary.cheapest != null
          ? `from $${summary.cheapest.toLocaleString("en-US")} / night`
          : ""}
      </p>

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
                className="flex aspect-square items-center justify-center rounded-[4px] text-[12px] text-[#d5cec2]"
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
                night.status === "TAKEN"
                  ? "Taken"
                  : night.status === "HELD"
                    ? "Held by another broker"
                    : undefined
              }
              className={cn(
                "flex aspect-square items-center justify-center rounded-[4px] text-[12px] tabular-nums transition-all duration-150",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c7261]",
                open && !inRange && "text-[#3a3530] hover:bg-[#efe9e0]",
                inRange && !isEndpoint && "bg-[#ece3dd] text-[#6f5a4c]",
                isEndpoint &&
                  "bg-[#8c7261] font-medium text-white shadow-[0_2px_8px_rgba(140,114,97,0.35)]",
                night.status === "TAKEN" &&
                  "cursor-not-allowed bg-[#ebe6dd] text-[#b9b1a4] line-through",
                night.status === "HELD" &&
                  "cursor-not-allowed border border-dashed border-[#b99b6d] text-[#a8894f]",
              )}
            >
              {dayNum}
            </button>
          );
        })}
      </div>
    </div>
  );
};
