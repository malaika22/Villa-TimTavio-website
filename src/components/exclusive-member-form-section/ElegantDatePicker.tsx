"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ElegantDatePickerProps = {
  value: string;
  onChange: (v: string) => void;
  min?: string;
  placeholder?: string;
  invalid?: boolean;
  id?: string;
};

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
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

/** Format a Date back to a local "YYYY-MM-DD" string. */
const toLocalString = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

/** Human-friendly display, e.g. "Jul 21, 2026". */
const formatDisplay = (date: Date) =>
  `${MONTH_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

/** Midnight-normalized local Date for comparisons. */
const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const ElegantDatePicker = ({
  value,
  onChange,
  min,
  placeholder = "Select a date",
  invalid = false,
  id,
}: ElegantDatePickerProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedDate = useMemo(() => parseLocal(value), [value]);
  const minDate = useMemo(() => {
    const parsed = parseLocal(min);
    return parsed ? startOfDay(parsed) : startOfDay(new Date());
  }, [min]);

  const today = useMemo(() => startOfDay(new Date()), []);

  // The month currently displayed in the calendar (year + 0-based month).
  const seedDate = selectedDate ?? parseLocal(min) ?? new Date();
  const [viewMonth, setViewMonth] = useState({
    year: seedDate.getFullYear(),
    month: seedDate.getMonth(),
  });

  // Re-seed the view whenever the popover opens so it lands on the right month.
  useEffect(() => {
    if (open) {
      const seed = parseLocal(value) ?? parseLocal(min) ?? new Date();
      setViewMonth({ year: seed.getFullYear(), month: seed.getMonth() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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

  const goPrevMonth = () =>
    setViewMonth(({ year, month }) =>
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }
    );
  const goNextMonth = () =>
    setViewMonth(({ year, month }) =>
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }
    );

  const handleSelect = (day: number) => {
    const picked = new Date(viewMonth.year, viewMonth.month, day);
    onChange(toLocalString(picked));
    setOpen(false);
  };

  // Build the grid: leading blanks for the first weekday, then the days.
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
          "flex w-full items-center justify-between border-0 border-b border-[#c8bfb0] rounded-none bg-transparent px-0 py-2 text-left text-[15px] transition-colors duration-200 focus:outline-none",
          open && "border-[#3a3530]",
          selectedDate ? "text-[#3a3530]" : "text-[#b0a898]",
          invalid && "border-b-rose-400"
        )}
      >
        <span>{selectedDate ? formatDisplay(selectedDate) : placeholder}</span>
        <Calendar size={16} className="shrink-0 text-[#8a7f72]" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            className="absolute z-50 mt-2 w-[300px] rounded-lg border border-[#e3ddd3] bg-[#fbf9f6] p-4 shadow-[0_16px_40px_rgba(60,53,48,0.14)]"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Header: month + year with prev/next controls */}
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrevMonth}
                aria-label="Previous month"
                className="flex size-7 items-center justify-center rounded-full text-[#8a7f72] transition-colors hover:text-[#3a3530]"
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
                className="flex size-7 items-center justify-center rounded-full text-[#8a7f72] transition-colors hover:text-[#3a3530]"
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

            {/* Day grid */}
            <div className="grid grid-cols-7">
              {cells.map((day, i) => {
                if (day === null) return <div key={`b-${i}`} className="size-9" />;

                const cellDate = new Date(viewMonth.year, viewMonth.month, day);
                const disabled = startOfDay(cellDate) < minDate;
                const isSelected =
                  selectedDate != null &&
                  selectedDate.getFullYear() === viewMonth.year &&
                  selectedDate.getMonth() === viewMonth.month &&
                  selectedDate.getDate() === day;
                const isToday =
                  today.getFullYear() === viewMonth.year &&
                  today.getMonth() === viewMonth.month &&
                  today.getDate() === day;

                return (
                  <div key={day} className="flex items-center justify-center">
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => handleSelect(day)}
                      aria-label={`${MONTH_NAMES[viewMonth.month]} ${day}, ${viewMonth.year}`}
                      aria-pressed={isSelected}
                      className={cn(
                        "relative size-9 rounded-full text-[13px] transition-colors",
                        isSelected && "bg-[#8c7261] font-medium text-white",
                        !isSelected && !disabled && "text-[#3a3530] hover:bg-[#efe9e0]",
                        !isSelected &&
                          isToday &&
                          !disabled &&
                          "ring-1 ring-[#8c7261]/40",
                        disabled && "cursor-not-allowed text-[#c9c1b5]"
                      )}
                    >
                      {day}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Footer: Clear + Today */}
            <div className="mt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="text-[12px] text-[#8c7261] transition-colors hover:text-[#3a3530]"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => {
                  const now = new Date();
                  setViewMonth({ year: now.getFullYear(), month: now.getMonth() });
                }}
                className="text-[12px] text-[#8c7261] transition-colors hover:text-[#3a3530]"
              >
                Today
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
