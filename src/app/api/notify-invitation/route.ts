import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAILS = [
  "Tim@villatimtavio.com",
  "Rodrigo@villatimtavio.com",
  "Tina@villatimtavio.com",
  "malaikaafridi22@gmail.com",
];

// Estate-manager API (NestJS) that owns the dashboard's inquiry table.
const MONOREPO_API_URL = process.env.MONOREPO_API_URL ?? "https://casa-timtavio-api.onrender.com";

// Teaser "Intended Use" options → API PurposeOfStay enum.
const PURPOSE_MAP: Record<string, string> = {
  Personal: "OTHER",
  Family: "FAMILY",
  Business: "CORPORATE_RETREAT",
  Mixed: "OTHER",
};

// Build the strict CreateInquiryDto the API expects (whitelist validation:
// only these keys are allowed). Fields with no DTO home are folded into `message`.
function toInquiryDto(data: Record<string, string>) {
  const messageParts = [
    data.city && `City: ${data.city}`,
    data.country && `Country: ${data.country}`,
    data.intendedUse && `Intended use: ${data.intendedUse}`,
    data.referredByRepresentation && `Referred by: ${data.referredByRepresentation}`,
  ].filter(Boolean);

  const guestCount = parseInt(data.numberOfGuests, 10);

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone || undefined,
    preferredFrom: data.preferredFrom ? new Date(data.preferredFrom).toISOString() : undefined,
    preferredTo: data.preferredTo ? new Date(data.preferredTo).toISOString() : undefined,
    guestCount: Number.isFinite(guestCount) ? guestCount : undefined,
    purposeOfStay: PURPOSE_MAP[data.intendedUse] ?? "OTHER",
    socialHandle: data.socialLink || undefined,
    source: "Teaser Website",
    message: messageParts.join(" · ") || undefined,
  };
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #3a3530;">
      <h2 style="font-size: 22px; font-weight: normal; border-bottom: 1px solid #c8bfb0; padding-bottom: 12px; margin-bottom: 24px;">
        New Invitation Request — Villa TimTavio
      </h2>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #8a7f72; width: 200px;">Name</td>
            <td style="padding: 8px 0;">${data.firstName} ${data.lastName}</td></tr>
        <tr><td style="padding: 8px 0; color: #8a7f72;">Email</td>
            <td style="padding: 8px 0;">${data.email}</td></tr>
        <tr><td style="padding: 8px 0; color: #8a7f72;">Phone / WhatsApp</td>
            <td style="padding: 8px 0;">${data.phone}</td></tr>
        <tr><td style="padding: 8px 0; color: #8a7f72;">City</td>
            <td style="padding: 8px 0;">${data.city}</td></tr>
        <tr><td style="padding: 8px 0; color: #8a7f72;">Country</td>
            <td style="padding: 8px 0;">${data.country}</td></tr>
        <tr><td style="padding: 8px 0; color: #8a7f72;">Intended Use</td>
            <td style="padding: 8px 0;">${data.intendedUse}</td></tr>
        <tr><td style="padding: 8px 0; color: #8a7f72;">Referred By / Representation</td>
            <td style="padding: 8px 0;">${data.referredByRepresentation || "—"}</td></tr>
        <tr><td style="padding: 8px 0; color: #8a7f72;">Arrival Date</td>
            <td style="padding: 8px 0;">${data.preferredFrom || "—"}</td></tr>
        <tr><td style="padding: 8px 0; color: #8a7f72;">Departure Date</td>
            <td style="padding: 8px 0;">${data.preferredTo || "—"}</td></tr>
        <tr><td style="padding: 8px 0; color: #8a7f72;">Number of Guests</td>
            <td style="padding: 8px 0;">${data.numberOfGuests}</td></tr>
        <tr><td style="padding: 8px 0; color: #8a7f72;">Social Link</td>
            <td style="padding: 8px 0;">${
              data.socialLink
                ? `<a href="${data.socialLink}" style="color: #3a3530;">${data.socialLink}</a>`
                : "—"
            }</td></tr>
      </table>

      <p style="margin-top: 32px; font-size: 12px; color: #b0a898; font-style: italic;">
        Submitted via villatimtavio.com
      </p>
    </div>
  `;

  // 1. Forward to the estate-manager API so the inquiry lands in the dashboard
  //    (also triggers the API's guest holding email + real-time push). Non-fatal:
  //    a failure here should not block the notification email below.
  let inquiryForwarded = false;
  try {
    const apiRes = await fetch(`${MONOREPO_API_URL}/api/v1/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toInquiryDto(data)),
    });
    inquiryForwarded = apiRes.ok;
    if (!apiRes.ok) {
      console.error("Inquiry forward failed", apiRes.status, await apiRes.text().catch(() => ""));
    }
  } catch (error) {
    console.error("Inquiry forward error", error);
  }

  // 2. Send the internal notification email
  try {
    const res = await resend.emails.send({
      from: "Villa TimTavio <reservations@villatimtavio.com>",
      to: NOTIFY_EMAILS,
      subject: `Villa TimTavio — New Guest Application from ${data.firstName} ${data.lastName}`,
      html,
    });

    return NextResponse.json({ success: true, inquiryForwarded, res });
  } catch (error) {
    return NextResponse.json({ success: false, inquiryForwarded, error }, { status: 500 });
  }
}
