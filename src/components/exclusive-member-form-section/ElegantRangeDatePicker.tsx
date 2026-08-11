"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ElegantRangeDatePickerProps = {
  /** ISO "YYYY-MM-DD" check-in date, or "" */
  from: string;
  /** ISO "YYYY-MM-DD" check-out date, or "" */
  to: string;
  onChange: (from: string, to: string) => void;
  /** Earliest selectable date, ISO "YYYY-MM-DD" (defaults to today) */
  min?: string;
  placeholder?: string;
  invalid?: boolean;
  id?: string;
};

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const pad = (n: number) => String(n).padStart(2, "0");

/** Parse a "YYYY-MM-DD" string into a LOCAL Date (avoids UTC drift). */
const parseLocal = (str: string | undefined): Date | null => {
  if (!str) return null;
  const parts = str.split("-");
  if (parts.length !== 3) return null;
  const [y, m, d] = parts.map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

const toLocalString = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

/** Short display, e.g. "Aug 12". */
const formatShort = (date: Date) => `${MONTH_SHORT[date.getMonth()]} ${date.getDate()}`;

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

/** Whole nights between two local Dates. */
const nightsBetween = (a: Date, b: Date) =>
  Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / 86_400_000);

export const ElegantRangeDatePicker = ({
  from,
  to,
  onChange,
  min,
  placeholder = "Select your stay",
  invalid = false,
  id,
}: ElegantRangeDatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [dir, setDir] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fromDate = useMemo(() => parseLocal(from), [from]);
  const toDate = useMemo(() => parseLocal(to), [to]);
  const minDate = useMemo(() => {
    const parsed = parseLocal(min);
    return parsed ? startOfDay(parsed) : startOfDay(new Date());
  }, [min]);
  const today = useMemo(() => startOfDay(new Date()), []);

  const seed = fromDate ?? parseLocal(min) ?? new Date();
  const [viewMonth, setViewMonth] = useState({
    year: seed.getFullYear(),
    month: seed.getMonth(),
  });

  // Re-seed the visible month whenever the popover opens.
  useEffect(() => {
    if (open) {
      const s = parseLocal(from) ?? parseLocal(min) ?? new Date();
      setViewMonth({ year: s.getFullYear(), month: s.getMonth() });
      setHovered(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // Outside-click + Escape to close.
  useEffect(() => {
    if (!open) return;
    const handlePointer = (e: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const goPrevMonth = () => {
    setDir(-1);
    setViewMonth(({ year, month }) =>
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }
    );
  };
  const goNextMonth = () => {
    setDir(1);
    setViewMonth(({ year, month }) =>
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }
    );
  };

  const handleSelect = (day: number) => {
    const pickedDate = startOfDay(new Date(viewMonth.year, viewMonth.month, day));
    const pickedStr = toLocalString(pickedDate);

    // Start a fresh range when: no check-in yet, a range is already complete, or
    // the click is on/before the current check-in.
    if (!fromDate || (fromDate && toDate) || pickedDate.getTime() <= fromDate.getTime()) {
      onChange(pickedStr, "");
      return;
    }

    // Otherwise this completes the range (check-out). Close shortly after so the
    // finished highlight is briefly visible.
    onChange(from, pickedStr);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 280);
  };

  // While picking the check-out, the hovered day previews the range end.
  const previewTo = useMemo(() => {
    if (!fromDate || toDate || hovered == null) return null;
    const h = startOfDay(new Date(viewMonth.year, viewMonth.month, hovered));
    return h.getTime() > fromDate.getTime() ? h : null;
  }, [fromDate, toDate, hovered, viewMonth]);

  const rangeEnd = toDate ?? previewTo;
  const nights = fromDate && rangeEnd ? nightsBetween(fromDate, rangeEnd) : 0;

  const triggerText = (() => {
    if (fromDate && toDate) return `${formatShort(fromDate)} — ${formatShort(toDate)}`;
    if (fromDate) return `${formatShort(fromDate)} — select departure`;
    return placeholder;
  })();

  const firstOfMonth = new Date(viewMonth.year, viewMonth.month, 1);
  const leadingBlanks = firstOfMonth.getDay();
  const daysInMonth = new Date(viewMonth.year, viewMonth.month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        id={id}
        aria-invalid={invalid || undefined}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center justify-between gap-3 border-0 border-b border-[#c8bfb0] rounded-none bg-transparent px-0 py-2 text-left text-[15px] transition-colors duration-200 focus:outline-none",
          open && "border-[#3a3530]",
          fromDate ? "text-[#3a3530]" : "text-[#b0a898]",
          invalid && "border-b-rose-400"
        )}
      >
        <span className="flex items-baseline gap-2 truncate">
          <span className="truncate">{triggerText}</span>
          {fromDate && toDate && (
            <span className="shrink-0 rounded-full bg-[#f1e9e1] px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-[#8c7261]">
              {nights} {nights === 1 ? "night" : "nights"}
            </span>
          )}
        </span>
        <Calendar size={16} className="shrink-0 text-[#8a7f72]" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Choose your stay dates"
            className="absolute z-50 mt-2 w-[320px] overflow-hidden rounded-lg border border-[#e3ddd3] bg-[#fbf9f6] p-4 shadow-[0_16px_40px_rgba(60,53,48,0.14)]"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Header: month + year with prev/next controls */}
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrevMonth}
                aria-label="Previous month"
                className="flex size-7 items-center justify-center rounded-full text-[#8a7f72] transition-colors hover:text-[#3a3530] hover:bg-[#efe9e0]"
              >
                <ChevronLeft size={18} />
              </button>
              <span
                className="text-[17px] text-[#3a3530]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {MONTH_NAMES[viewMonth.month]} {viewMonth.year}
              </span>
              <button
                type="button"
                onClick={goNextMonth}
                aria-label="Next month"
                className="flex size-7 items-center justify-center rounded-full text-[#8a7f72] transition-colors hover:text-[#3a3530] hover:bg-[#efe9e0]"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Weekday header */}
            <div className="grid grid-cols-7">
              {WEEKDAYS.map((wd, i) => (
                <div
                  key={i}
                  className="flex h-7 items-center justify-center text-[10px] uppercase tracking-wide text-[#a89e90]"
                >
                  {wd}
                </div>
              ))}
            </div>

            {/* Day grid (slides between months) */}
            <div className="relative">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={`${viewMonth.year}-${viewMonth.month}`}
                  custom={dir}
                  initial={{ opacity: 0, x: dir === 0 ? 0 : dir * 22 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -22 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="grid grid-cols-7"
                  onMouseLeave={() => setHovered(null)}
                >
                  {cells.map((day, i) => {
                    if (day === null) return <div key={`b-${i}`} className="h-10" />;

                    const cellDate = startOfDay(new Date(viewMonth.year, viewMonth.month, day));
                    const disabled = cellDate < minDate;
                    const t = cellDate.getTime();

                    const isFrom = fromDate != null && t === fromDate.getTime();
                    const isEnd = rangeEnd != null && t === rangeEnd.getTime();
                    const isBetween =
                      fromDate != null &&
                      rangeEnd != null &&
                      t > fromDate.getTime() &&
                      t < rangeEnd.getTime();
                    const inRange = isFrom || isEnd || isBetween;
                    const isEndpoint = isFrom || isEnd;
                    const singleDay =
                      fromDate != null &&
                      rangeEnd != null &&
                      fromDate.getTime() === rangeEnd.getTime();

                    const isToday =
                      today.getFullYear() === viewMonth.year &&
                      today.getMonth() === viewMonth.month &&
                      today.getDate() === day;

                    // Connecting band: right half on check-in, left half on
                    // check-out, full width in between. Only drawn once a real
                    // second endpoint (or hover preview) exists.
                    let band: React.CSSProperties | null = null;
                    if (inRange && !singleDay && !(isFrom && !isEnd && !isBetween && rangeEnd == null)) {
                      if (isFrom)
                        band = { left: "50%", right: 0, borderTopLeftRadius: 999, borderBottomLeftRadius: 999 };
                      else if (isEnd)
                        band = { left: 0, right: "50%", borderTopRightRadius: 999, borderBottomRightRadius: 999 };
                      else band = { left: 0, right: 0 };
                    }

                    return (
                      <div
                        key={day}
                        className="relative flex h-10 items-center justify-center"
                        onMouseEnter={() => !disabled && setHovered(day)}
                      >
                        {band && (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute top-1 bottom-1 bg-[#ece3dd] transition-[background-color,opacity] duration-200"
                            style={band}
                          />
                        )}
                        <button
                          type="button"
                          disabled={disabled}
                          onClick={() => handleSelect(day)}
                          aria-label={`${MONTH_NAMES[viewMonth.month]} ${day}, ${viewMonth.year}`}
                          aria-pressed={isEndpoint}
                          className={cn(
                            "relative z-[1] flex size-9 items-center justify-center rounded-full text-[13px] transition-[background-color,color,transform] duration-150 ease-out will-change-transform",
                            isEndpoint && "bg-[#8c7261] font-medium text-white shadow-[0_2px_8px_rgba(140,114,97,0.35)]",
                            !isEndpoint && isBetween && "text-[#6f5a4c] hover:bg-[#e3d8cd]",
                            !inRange && !disabled && "text-[#3a3530] hover:scale-105 hover:bg-[#efe9e0]",
                            !isEndpoint && isToday && !disabled && "ring-1 ring-[#8c7261]/40",
                            disabled && "cursor-not-allowed text-[#c9c1b5]"
                          )}
                        >
                          {day}
                        </button>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer: live night count + Clear */}
            <div className="mt-2 flex items-center justify-between border-t border-[#efe7dc] pt-2">
              <span className="text-[12px] text-[#8a7f72]">
                {fromDate && rangeEnd && nights > 0 ? (
                  <>
                    <span className="text-[#3a3530]">{nights}</span>{" "}
                    {nights === 1 ? "night" : "nights"}
                  </>
                ) : fromDate ? (
                  "Select your departure"
                ) : (
                  "Select your arrival"
                )}
              </span>
              <button
                type="button"
                onClick={() => {
                  onChange("", "");
                  setHovered(null);
                }}
                className="text-[12px] text-[#8c7261] transition-colors hover:text-[#3a3530]"
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
