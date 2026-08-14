/**
 * Mirrored by hand from `packages/api-types/src/broker.ts` in the monorepo.
 *
 * This is a separate repository, so there is no shared package to import. If
 * the API's shape changes, this file changes with it — the two are only kept in
 * step by whoever edits them.
 */

export type BrokerNightStatus = "OPEN" | "TAKEN" | "HELD";

export interface AvailabilityNight {
  /** YYYY-MM-DD — the night begun by this date. */
  date: string;
  status: BrokerNightStatus;
  /** Null where neither Lodgify nor the estate's season table has a rate. */
  rate: number | null;
  minNights: number;
}

export interface Availability {
  from: string;
  to: string;
  nights: AvailabilityNight[];
  /** Anything other than `lodgify` must be shown as indicative. */
  rateSource: "lodgify" | "season" | "mixed" | "none";
  currency: "USD";
  holdHours: number;
}

export interface PlacedHold {
  id: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  expiresAt: string;
  estimatedTotal: string | null;
}
