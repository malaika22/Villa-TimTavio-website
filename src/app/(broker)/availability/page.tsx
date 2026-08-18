import { BrokerAvailabilityView } from "@/components/broker/BrokerAvailabilityView";

/**
 * The broker calendar.
 *
 * This page is reachable by anyone who types the address. It previously sat
 * behind an unguessable path segment; the estate asked for a plain URL they can
 * hand out and say aloud, and accepted that it is therefore public.
 *
 * What that costs is worth being explicit about: the page reveals which nights
 * are sold and the estate's indicative rates. It reveals nothing about guests —
 * no names, no dates tied to a person, no contact details — and a hold only
 * carries whatever name the person placing it types in. `noindex` and the
 * robots rule keep it out of search results, so it stays unlisted rather than
 * secret.
 *
 * If the estate ever wants it closed again, the shape to reach for is a key per
 * broker rather than one shared segment — that way a single broker can be
 * revoked without reissuing the link to everyone.
 */
export default function Page() {
  return <BrokerAvailabilityView />;
}
