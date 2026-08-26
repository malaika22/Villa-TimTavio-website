"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { NightTip } from "./night-tooltip";

/**
 * Ticks while a countdown is on screen.
 *
 * A tooltip left open would otherwise keep claiming the figure it was born
 * with. Half a minute is close enough for a number that only ever moves by
 * whole minutes, and it stops entirely the moment nothing is being shown.
 */
export function useMinuteTick(active: boolean): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!active) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, [active]);

  return now;
}

export type TipAnchor = { rect: DOMRect; tip: NightTip };

/**
 * The answer to "what is this night doing?", pinned above the cell.
 *
 * Fixed rather than absolute so it escapes the grid: the calendar cells are
 * small and three months sit side by side, and a tooltip clipped by its own
 * column would be worse than none. Flipped below when there is no room above,
 * and clamped to the viewport so the last column doesn't push it off-screen.
 */
export function NightTooltip({ anchor }: { anchor: TipAnchor | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{
    top: number;
    left: number;
    below: boolean;
  } | null>(null);

  useLayoutEffect(() => {
    if (!anchor || !ref.current) {
      setPos(null);
      return;
    }
    const { rect } = anchor;
    const box = ref.current.getBoundingClientRect();

    let top = rect.top - box.height - 8;
    const below = top < 8;
    if (below) top = rect.bottom + 8;

    const left = Math.max(
      8,
      Math.min(rect.left + rect.width / 2 - box.width / 2, window.innerWidth - box.width - 8)
    );

    setPos({ top, left, below });
  }, [anchor]);

  if (!anchor) return null;

  const { tip } = anchor;

  return (
    <div
      ref={ref}
      role="tooltip"
      className={cn(
        "pointer-events-none fixed z-50 max-w-[230px] rounded-[7px] bg-[#3a3530] px-3 py-2.5 text-[#f7f5f1] shadow-[0_6px_22px_rgba(0,0,0,0.19)]",
        // Measured on the first pass, placed on the second. Rendering it at
        // 0,0 for a frame would show it flying across the screen.
        pos ? "opacity-100" : "opacity-0"
      )}
      style={pos ? { top: pos.top, left: pos.left } : { top: -9999, left: 0 }}
    >
      <span className="block text-[12.5px] font-semibold leading-snug">{tip.title}</span>
      {tip.count && (
        <span className="mt-[3px] block font-mono text-[12.5px] leading-snug">{tip.count}</span>
      )}
      {tip.sub && (
        <span className="mt-[3px] block text-[11px] leading-[1.45] opacity-[0.62]">{tip.sub}</span>
      )}
    </div>
  );
}
