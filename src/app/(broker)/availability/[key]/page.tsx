import { notFound } from "next/navigation";

import { BrokerAvailabilityView } from "@/components/broker/BrokerAvailabilityView";

/**
 * The broker calendar, behind an unguessable path segment.
 *
 * One link for every broker, as the estate asked. That means the key in the URL
 * is the whole of the access control: there is nobody to authenticate, and
 * revoking one broker means changing the link for all of them. It is enough
 * because the page reveals occupancy and indicative rates, not guest data —
 * but it is worth being clear-eyed that this is obscurity, not security. The
 * upgrade path is a key per broker, which this shape allows without a rewrite.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const expected = process.env.BROKER_PAGE_KEY;

  // An unset key must 404, never open the page. Getting this backwards would
  // publish the estate's calendar to anyone who guessed the path.
  if (!expected || key !== expected) notFound();

  return <BrokerAvailabilityView />;
}
