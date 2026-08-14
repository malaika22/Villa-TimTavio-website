"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { AvailabilityCalendar } from "./AvailabilityCalendar";
import type { Availability, AvailabilityNight, PlacedHold } from "./types";

const HORIZON_DAYS = 300;
const MONTHS_SHOWN = 3;
const NAME_KEY = "vtt-broker-name";

const pad = (n: number) => String(n).padStart(2, "0");
const toKey = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromKey = (s: string) => new Date(`${s}T00:00:00`);

const nightsBetween = (a: string, b: string) =>
  Math.round((+fromKey(b) - +fromKey(a)) / 86_400_000);

const prettyDate = (s: string) =>
  fromKey(s).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * The broker calendar.
 *
 * Everything a broker needs to answer their client in one screen: what's open
 * across a season, what it costs, and a way to hold it for 48 hours while the
 * client decides. Everything the estate needs is elsewhere — this page can only
 * ask.
 */
export const BrokerAvailabilityView = () => {
  const [data, setData] = useState<Availability | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [nameConfirmed, setNameConfirmed] = useState(false);

  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const [offset, setOffset] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState<PlacedHold | null>(null);
  const [holdError, setHoldError] = useState<string | null>(null);

  // Remembered so a broker who checks dates twice a week isn't asked twice a
  // week. Not authentication — it only means a hold arrives with a name on it.
  useEffect(() => {
    const saved = window.localStorage.getItem(NAME_KEY);
    if (saved) {
      setName(saved);
      setNameConfirmed(true);
    }
  }, []);

  const load = useCallback(async () => {
    setLoadError(null);
    const today = new Date();
    const from = toKey(today);
    const to = toKey(new Date(today.getTime() + HORIZON_DAYS * 86_400_000));

    try {
      const res = await fetch(`/api/broker/availability?from=${from}&to=${to}`);
      const body = await res.json();
      if (!res.ok) throw new Error(body?.message ?? "Couldn't load availability");
      setData(body as Availability);
    } catch (error) {
      setData(null);
      setLoadError(
        error instanceof Error ? error.message : "Couldn't load availability",
      );
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const byDate = useMemo(() => {
    const map = new Map<string, AvailabilityNight>();
    for (const night of data?.nights ?? []) map.set(night.date, night);
    return map;
  }, [data]);

  const months = useMemo(() => {
    const base = new Date();
    base.setDate(1);
    return Array.from({ length: MONTHS_SHOWN }, (_, i) => {
      const d = new Date(base.getFullYear(), base.getMonth() + offset + i, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }, [offset]);

  const pick = (date: string) => {
    setHoldError(null);
    setPlaced(null);

    if (!start || end || date <= start) {
      setStart(date);
      setEnd(null);
      return;
    }

    // A range is only offerable if every night inside it is free. Rather than
    // letting the broker build an impossible request and refusing it after,
    // the selection quietly restarts from the date they just clicked.
    for (let c = fromKey(start); c < fromKey(date); c.setDate(c.getDate() + 1)) {
      if (byDate.get(toKey(c))?.status !== "OPEN") {
        setStart(date);
        setEnd(null);
        return;
      }
    }
    setEnd(date);
  };

  const selection = useMemo(() => {
    if (!start || !end) return null;

    const nights = nightsBetween(start, end);
    const minNights = byDate.get(start)?.minNights ?? 0;

    let total = 0;
    let priced = true;
    for (let c = fromKey(start); c < fromKey(end); c.setDate(c.getDate() + 1)) {
      const rate = byDate.get(toKey(c))?.rate;
      if (rate == null) priced = false;
      else total += rate;
    }

    return {
      nights,
      minNights,
      tooShort: nights < minNights,
      // Deliberately withheld when any night is unpriced. A partial total looks
      // exactly like a full one, and a broker would quote it to a real client.
      total: priced ? total : null,
    };
  }, [start, end, byDate]);

  const placeHold = async () => {
    if (!start || !end || !name.trim()) return;
    setPlacing(true);
    setHoldError(null);

    try {
      const res = await fetch("/api/broker/hold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brokerName: name.trim(),
          checkIn: start,
          checkOut: end,
          note: note.trim() || undefined,
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.message ?? "We couldn't place that hold");

      setPlaced(body as PlacedHold);
      setStart(null);
      setEnd(null);
      setNote("");
      // The nights we just took must stop looking free to us too.
      void load();
    } catch (error) {
      setHoldError(
        error instanceof Error ? error.message : "We couldn't place that hold",
      );
      void load();
    } finally {
      setPlacing(false);
    }
  };

  // ─── Identity gate ────────────────────────────────────────────────────────

  if (!nameConfirmed) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6">
        <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#8c7261]">
          Villa TimTavio
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-[32px] leading-tight text-[#3a3530]">
          Availability
        </h1>
        <p className="mt-3 text-[13px] leading-relaxed text-[#7a7065]">
          Before we begin — who are we speaking with? This appears alongside any
          dates you hold, so the estate knows who to come back to.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim().length < 2) return;
            window.localStorage.setItem(NAME_KEY, name.trim());
            setNameConfirmed(true);
          }}
          className="mt-7"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name and agency"
            autoFocus
            className="w-full border-0 border-b border-[#c8bfb0] bg-transparent px-0 py-2 text-[15px] text-[#3a3530] placeholder:text-[#b0a898] focus:border-[#3a3530] focus:outline-none"
          />
          <button
            type="submit"
            disabled={name.trim().length < 2}
            className="mt-6 w-full rounded-[3px] bg-[#3a3530] px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-[#f7f5f1] transition-opacity disabled:opacity-30"
          >
            Continue
          </button>
        </form>
      </main>
    );
  }

  // ─── Calendar ─────────────────────────────────────────────────────────────

  return (
    <main className="mx-auto max-w-5xl px-5 pb-40 pt-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#e3ddd3] pb-5">
        <span className="font-[family-name:var(--font-cormorant)] text-[14px] uppercase tracking-[0.26em] text-[#3a3530]">
          Villa TimTavio
        </span>
        <span className="text-[11px] uppercase tracking-[0.12em] text-[#a89e90]">
          {name}
        </span>
      </header>

      <div className="py-9">
        <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#8c7261]">
          Availability
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(28px,5vw,42px)] leading-[1.08] text-[#3a3530]">
          Puerto Escondido, Oaxaca
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[#e3ddd3] py-4">
        <div className="flex flex-wrap gap-4 text-[11.5px] text-[#7a7065]">
          <span className="flex items-center gap-2">
            <i className="size-3 rounded-[3px] border border-[#d8d1c5]" />
            Open
          </span>
          <span className="flex items-center gap-2">
            <i className="size-3 rounded-[3px] bg-[#ebe6dd]" />
            Taken
          </span>
          <span className="flex items-center gap-2">
            <i className="size-3 rounded-[3px] border border-dashed border-[#b99b6d]" />
            Held
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setOffset((o) => Math.max(0, o - 1))}
            disabled={offset === 0}
            aria-label="Earlier months"
            className="flex size-8 items-center justify-center rounded-full text-[#8a7f72] transition-colors hover:bg-[#efe9e0] hover:text-[#3a3530] disabled:opacity-25 disabled:hover:bg-transparent"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => setOffset((o) => Math.min(6, o + 1))}
            disabled={offset >= 6}
            aria-label="Later months"
            className="flex size-8 items-center justify-center rounded-full text-[#8a7f72] transition-colors hover:bg-[#efe9e0] hover:text-[#3a3530] disabled:opacity-25 disabled:hover:bg-transparent"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {loadError ? (
        <div className="mt-10 rounded-lg border border-[#e3ddd3] bg-white px-6 py-12 text-center">
          <p className="font-[family-name:var(--font-cormorant)] text-[19px] text-[#3a3530]">
            We couldn&rsquo;t load availability
          </p>
          <p className="mx-auto mt-2 max-w-[40ch] text-[12.5px] leading-relaxed text-[#7a7065]">
            Rather than show you a calendar that might be wrong, we&rsquo;d
            rather show you nothing. Try again, or message the estate directly.
          </p>
          <button
            type="button"
            onClick={() => void load()}
            className="mt-5 rounded-[3px] border border-[#3a3530] px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-[#3a3530]"
          >
            Try again
          </button>
        </div>
      ) : !data ? (
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-lg bg-[#ece8e0]" />
          ))}
        </div>
      ) : (
        <div className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {months.map(({ year, month }) => (
            <AvailabilityCalendar
              key={`${year}-${month}`}
              year={year}
              month={month}
              nights={byDate}
              start={start}
              end={end}
              hovered={hovered}
              onPick={pick}
              onHover={setHovered}
            />
          ))}
        </div>
      )}

      <p className="mt-12 max-w-[62ch] border-t border-[#e3ddd3] pt-6 text-[11.5px] leading-[1.75] text-[#a89e90]">
        Estimates exclude tax and the estate service charge, and are indicative
        until confirmed. A hold reserves your dates for {data?.holdHours ?? 48}{" "}
        hours while your client decides — the estate is told at once and will
        come back to you. This page is private; please don&rsquo;t forward the
        link.
      </p>

      {/* ── Selection bar ── */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-20 border-t border-[#e3ddd3] bg-[#fbf9f6] shadow-[0_-8px_30px_rgba(60,53,48,0.08)] transition-transform duration-300",
          start || placed ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="mx-auto max-w-5xl px-5 py-4">
          {placed ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-[family-name:var(--font-cormorant)] text-[19px] text-[#3a3530]">
                  Held until{" "}
                  {new Date(placed.expiresAt).toLocaleString("en-GB", {
                    weekday: "long",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
                <p className="mt-1 text-[12px] text-[#7a7065]">
                  {prettyDate(placed.checkIn)} — {prettyDate(placed.checkOut)} ·{" "}
                  {placed.nights} nights. The estate has been told and will
                  confirm by email.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPlaced(null)}
                className="rounded-[3px] border border-[#c8bfb0] px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-[#3a3530]"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="font-[family-name:var(--font-cormorant)] text-[19px] text-[#3a3530]">
                  {start && end
                    ? `${prettyDate(start)} — ${prettyDate(end)}`
                    : start
                      ? `Arriving ${prettyDate(start)}`
                      : ""}
                </p>

                {holdError ? (
                  <p className="mt-1 text-[12px] text-[#a8503a]">{holdError}</p>
                ) : !end ? (
                  <p className="mt-1 text-[12px] text-[#7a7065]">
                    Now choose a departure date.
                  </p>
                ) : selection?.tooShort ? (
                  <p className="mt-1 text-[12px] text-[#a8503a]">
                    {selection.nights} night
                    {selection.nights === 1 ? "" : "s"} — this season has a{" "}
                    {selection.minNights}-night minimum.
                  </p>
                ) : (
                  <p className="mt-1 text-[12px] text-[#7a7065]">
                    {selection?.nights} nights · up to 14 guests
                    {selection?.total != null && (
                      <>
                        {" · "}
                        <span className="text-[#3a3530]">
                          {money(selection.total)}
                        </span>{" "}
                        estimated
                        {data?.rateSource !== "lodgify" && " (indicative)"}
                      </>
                    )}
                  </p>
                )}

                {end && !selection?.tooShort && (
                  <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Anything the estate should know (optional)"
                    className="mt-2 w-full max-w-sm border-0 border-b border-[#e3ddd3] bg-transparent px-0 py-1 text-[12.5px] text-[#3a3530] placeholder:text-[#b0a898] focus:border-[#8c7261] focus:outline-none"
                  />
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setStart(null);
                    setEnd(null);
                    setHoldError(null);
                  }}
                  className="rounded-[3px] border border-[#c8bfb0] px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-[#3a3530]"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => void placeHold()}
                  disabled={!end || !!selection?.tooShort || placing}
                  className="flex items-center gap-2 rounded-[3px] bg-[#3a3530] px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-[#f7f5f1] transition-opacity disabled:opacity-30"
                >
                  {placing && <Loader2 size={13} className="animate-spin" />}
                  Hold for {data?.holdHours ?? 48} hours
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
