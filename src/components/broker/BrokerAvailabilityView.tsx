"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { AvailabilityCalendar } from "./AvailabilityCalendar";
import { MAX_PARTY_SIZE } from "./types";
import type { Availability, AvailabilityNight, PlacedHold } from "./types";

const HORIZON_DAYS = 300;
const MONTHS_SHOWN = 3;

const pad = (n: number) => String(n).padStart(2, "0");
const toKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromKey = (s: string) => new Date(`${s}T00:00:00`);

const nightsBetween = (a: string, b: string) =>
  Math.round((+fromKey(b) - +fromKey(a)) / 86_400_000);

const prettyDate = (s: string) =>
  fromKey(s).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

/**
 * Formatted in whatever the estate prices in. Hardcoding a dollar sign was
 * safe only while nothing was priced — Lodgify can be set to pesos, and the
 * two differ by roughly eighteen times, which is the sort of mistake a broker
 * passes on to their client before anyone notices.
 */
const makeMoney = (currency: string | null) => {
  if (!currency) return () => null;
  const full = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  return (n: number | null) => (n == null ? null : full.format(n));
};

/**
 * The same amount at grid scale. Ninety full figures would crowd the calendar,
 * so cells round to the nearest hundred — enough to compare two weeks at a
 * glance, with the exact total in the bar once a range is chosen.
 */
const makeCompactMoney = (currency: string | null) => {
  if (!currency) return () => null;
  const compact = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  });
  return (n: number | null) => (n == null ? null : compact.format(n));
};

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

  // Asked when the hold is placed, never remembered. A broker may be acting for
  // a different client, or a colleague may be at the same desk — a name kept in
  // localStorage would quietly attach the wrong person to a booking.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agency, setAgency] = useState("");
  const [guests, setGuests] = useState(2);
  /**
   * What's in the box while it's being typed in, which is not always a number.
   * Clamping on every keystroke means a broker who wants 9 has to delete the 2
   * first and can't, because an empty box immediately becomes 1 again — and
   * typing 12 over a 1 briefly reads as 112 and gets clamped to 14. So the text
   * is held loose and only reconciled on blur.
   */
  const [guestsText, setGuestsText] = useState("2");
  const [confirming, setConfirming] = useState(false);

  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const [offset, setOffset] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState<PlacedHold | null>(null);
  const [holdError, setHoldError] = useState<string | null>(null);

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
      setLoadError(error instanceof Error ? error.message : "Couldn't load availability");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const money = useMemo(() => makeMoney(data?.currency ?? null), [data?.currency]);
  const compactMoney = useMemo(() => makeCompactMoney(data?.currency ?? null), [data?.currency]);

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

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const canPlace = !!start && !!end && name.trim().length >= 2 && emailLooksValid && guests >= 1;

  const placeHold = async () => {
    if (!canPlace) return;
    setPlacing(true);
    setHoldError(null);

    try {
      const res = await fetch("/api/broker/hold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brokerName: name.trim(),
          brokerEmail: email.trim(),
          brokerAgency: agency.trim() || undefined,
          guestCount: guests,
          checkIn: start,
          checkOut: end,
          note: note.trim() || undefined,
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.message ?? "We couldn't place that hold");

      setPlaced(body as PlacedHold);
      setConfirming(false);
      setStart(null);
      setEnd(null);
      setNote("");
      // Cleared with the rest. Nothing about one hold should carry into the
      // next — the person at this screen may not be the person who was here
      // five minutes ago.
      setName("");
      setEmail("");
      setAgency("");
      setGuests(2);
      setGuestsText("2");
      // The nights we just took must stop looking free to us too.
      void load();
    } catch (error) {
      setHoldError(error instanceof Error ? error.message : "We couldn't place that hold");
      void load();
    } finally {
      setPlacing(false);
    }
  };

  // ─── Calendar ─────────────────────────────────────────────────────────────

  return (
    // Bottom padding clears the fixed selection bar, which grows a row taller
    // once a range is picked and the note field appears. Too little and the
    // last week of the final month can't be scrolled out from under it.
    <main className="mx-auto max-w-5xl px-5 pb-52 pt-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#e3ddd3] pb-5">
        <span className="font-[family-name:var(--font-cormorant)] text-[14px] uppercase tracking-[0.26em] text-[#3a3530]">
          Villa TimTavio
        </span>
        <span className="text-[11px] uppercase tracking-[0.12em] text-[#a89e90]">
          Broker availability
        </span>
      </header>

      <div className="py-9">
        <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#8c7261]">Availability</p>
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
            Rather than show you a calendar that might be wrong, we&rsquo;d rather show you nothing.
            Try again, or message the estate directly.
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
              money={compactMoney}
              priced={data?.rateSource === "lodgify"}
            />
          ))}
        </div>
      )}

      <p className="mt-12 max-w-[62ch] border-t border-[#e3ddd3] pt-6 text-[11.5px] leading-[1.75] text-[#a89e90]">
        Nightly rates come from the estate's own calendar and exclude tax and the service charge. A
        hold reserves your dates for {data?.holdHours ?? 48} hours while your client decides — the
        estate is told at once and will come back to you. This page is private; please don&rsquo;t
        forward the link.
      </p>

      {/* ── Selection bar ── */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-20 border-t border-[#e3ddd3] bg-[#fbf9f6] shadow-[0_-8px_30px_rgba(60,53,48,0.08)] transition-transform duration-300",
          start || placed ? "translate-y-0" : "translate-y-full"
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
                  {prettyDate(placed.checkIn)} — {prettyDate(placed.checkOut)} · {placed.nights}{" "}
                  nights. The estate has been told and will confirm by email.
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
              <div className="min-w-0 flex-1">
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
                  <p className="mt-1 text-[12px] text-[#7a7065]">Now choose a departure date.</p>
                ) : selection?.tooShort ? (
                  <p className="mt-1 text-[12px] text-[#a8503a]">
                    {selection.nights} night
                    {selection.nights === 1 ? "" : "s"} — this season has a {selection.minNights}
                    -night minimum.
                  </p>
                ) : (
                  <p className="mt-1 text-[12px] text-[#7a7065]">
                    {selection?.nights} nights · up to 14 guests
                    {selection?.total != null && selection.nights > 0 && (
                      <>
                        {" · "}
                        <span className="text-[#3a3530]">{money(selection.total)}</span> total
                        {" · "}
                        {money(Math.round(selection.total / selection.nights))} avg / night
                      </>
                    )}
                    {selection != null &&
                      selection.total == null &&
                      " · the estate will confirm the rate for these nights"}
                  </p>
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
                  onClick={() => setConfirming(true)}
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

      {/* Everything about this hold, asked at the moment of holding.
          Nothing is remembered between holds: the person at the keyboard may
          be a colleague, or the same broker acting for a different client, and
          a name quietly carried over from last time attaches the wrong person
          to a booking the estate then acts on. */}
      <AnimatePresence>
        {confirming && start && end && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={() => setConfirming(false)}
            className="fixed inset-0 z-30 flex items-end justify-center bg-black/30 sm:items-center"
          >
            {/* Rising from the bottom on a phone, settling in place on a
                desktop — the sheet arrives from where the button was pressed.
                The click-through on the backdrop is stopped here so a stray
                click inside the form doesn't dismiss a half-filled hold. */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.99 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Confirm your hold"
              className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-[16px] bg-[#fbf9f6] p-6 sm:max-w-md sm:rounded-[16px]"
            >
              {/* Back at the foot is the deliberate exit; this is the one people
                  reach for when they opened it to look and changed their mind. */}
              <button
                type="button"
                onClick={() => setConfirming(false)}
                aria-label="Close"
                className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-[#a89e90] transition-colors hover:bg-[#efe9e0] hover:text-[#3a3530]"
              >
                <X size={16} aria-hidden />
              </button>

              <p className="text-[10px] uppercase tracking-[0.26em] text-[#8c7261]">
                Confirm your hold
              </p>

              <div className="mt-4 rounded-[10px] border border-[#e3ddd3] bg-[#efe9e0] px-4 py-3">
                <p className="font-[family-name:var(--font-cormorant)] text-[19px] text-[#3a3530]">
                  {prettyDate(start)} — {prettyDate(end)}
                </p>
                <p className="mt-1 text-[12px] tabular-nums text-[#7a7065]">
                  {selection?.nights} nights
                  {selection?.total != null && ` · ${money(selection.total)} total`}
                </p>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <label
                    htmlFor="hold-name"
                    className="block text-[9.5px] uppercase tracking-[0.14em] text-[#a89e90]"
                  >
                    Full name <span className="text-[#a8503a]">*</span>
                  </label>
                  <input
                    id="hold-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    className="mt-1.5 w-full border-0 border-b border-[#c8bfb0] bg-transparent px-0 py-2 text-[14.5px] text-[#3a3530] placeholder:text-[#b0a898] focus:border-[#3a3530] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hold-email"
                    className="block text-[9.5px] uppercase tracking-[0.14em] text-[#a89e90]"
                  >
                    Email <span className="text-[#a8503a]">*</span>
                  </label>
                  <input
                    id="hold-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full border-0 border-b border-[#c8bfb0] bg-transparent px-0 py-2 text-[14.5px] text-[#3a3530] placeholder:text-[#b0a898] focus:border-[#3a3530] focus:outline-none"
                  />
                  {email.trim().length > 0 && !emailLooksValid && (
                    <p className="mt-1.5 text-[10.5px] text-[#a8503a]">
                      That doesn&rsquo;t look like an email address.
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="hold-agency"
                    className="block text-[9.5px] uppercase tracking-[0.14em] text-[#a89e90]"
                  >
                    Agency
                  </label>
                  <input
                    id="hold-agency"
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    className="mt-1.5 w-full border-0 border-b border-[#c8bfb0] bg-transparent px-0 py-2 text-[14.5px] text-[#3a3530] focus:border-[#3a3530] focus:outline-none"
                  />
                </div>

                <div>
                  <span className="block text-[9.5px] uppercase tracking-[0.14em] text-[#a89e90]">
                    Guests <span className="text-[#a8503a]">*</span>
                  </span>
                  {/* A plain field. The steppers helped only for two or three
                      guests, and this villa sleeps fourteen — a party of nine
                      meant seven taps, so they cost more than they saved.
                      inputMode brings up a numeric keypad, since brokers work
                      from a phone. */}
                  <input
                    id="hold-guests"
                    type="text"
                    inputMode="numeric"
                    value={guestsText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, "");
                      setGuestsText(raw);
                      const n = Number(raw);
                      if (raw !== "" && n >= 1 && n <= MAX_PARTY_SIZE) setGuests(n);
                    }}
                    onBlur={() => {
                      // Reconciled once, on the way out. Clamping per keystroke
                      // is what made the estate dashboard's NumberField
                      // unusable: an empty box became 1 immediately, so nobody
                      // could clear it to type something else.
                      const n = Number(guestsText);
                      const settled =
                        !Number.isFinite(n) || n < 1 ? 1 : Math.min(MAX_PARTY_SIZE, Math.floor(n));
                      setGuests(settled);
                      setGuestsText(String(settled));
                    }}
                    aria-label="Number of guests"
                    aria-describedby="hold-guests-max"
                    className="mt-1.5 w-full border-0 border-b border-[#c8bfb0] bg-transparent px-0 py-2 text-[14.5px] tabular-nums text-[#3a3530] focus:border-[#3a3530] focus:outline-none"
                  />
                  <p id="hold-guests-max" className="mt-1.5 text-[10.5px] text-[#a89e90]">
                    Up to {MAX_PARTY_SIZE} guests.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="hold-note"
                    className="block text-[9.5px] uppercase tracking-[0.14em] text-[#a89e90]"
                  >
                    Anything the estate should know
                  </label>
                  <input
                    id="hold-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Client name, occasion (optional)"
                    className="mt-1.5 w-full border-0 border-b border-[#c8bfb0] bg-transparent px-0 py-2 text-[14.5px] text-[#3a3530] placeholder:text-[#b0a898] focus:border-[#3a3530] focus:outline-none"
                  />
                </div>
              </div>

              {holdError && <p className="mt-4 text-[12px] text-[#a8503a]">{holdError}</p>}

              <button
                type="button"
                onClick={() => void placeHold()}
                disabled={!canPlace || placing}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-[3px] bg-[#3a3530] px-5 py-3.5 text-[10px] uppercase tracking-[0.18em] text-[#f7f5f1] disabled:opacity-30"
              >
                {placing && <Loader2 size={13} className="animate-spin" />}
                Hold for {data?.holdHours ?? 48} hours
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="mt-2 w-full rounded-[3px] border border-[#c8bfb0] px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-[#3a3530]"
              >
                Back
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
