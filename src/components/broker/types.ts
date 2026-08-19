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
  /** `lodgify` when at least one night is priced, `none` otherwise. */
  rateSource: "lodgify" | "none";
  /**
   * ISO code from the estate's Lodgify settings. Null means no currency could
   * be established, and then no night carries a rate either — the calendar
   * shows availability without money rather than a number in unknown units.
   */
  currency: string | null;
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
