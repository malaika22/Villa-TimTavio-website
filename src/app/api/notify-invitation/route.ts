import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAILS = [
  "Tim@villatimtavio.com",
  "Rodrigo@villatimtavio.com",
  "Tina@villatimtavio.com",
];

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
        <tr><td style="padding: 8px 0; color: #8a7f72;">Preferred Dates</td>
            <td style="padding: 8px 0;">${data.preferredDates}</td></tr>
        <tr><td style="padding: 8px 0; color: #8a7f72;">Number of Guests</td>
            <td style="padding: 8px 0;">${data.numberOfGuests}</td></tr>
      </table>

      <p style="margin-top: 32px; font-size: 12px; color: #b0a898; font-style: italic;">
        Submitted via villatimtavio.com
      </p>
    </div>
  `;

  try {
    const res = await resend.emails.send({
      from: "Villa TimTavio <reservations@villatimtavio.com>",
      to: NOTIFY_EMAILS,
      subject: `Villa TimTavio — New Guest Application from ${data.firstName} ${data.lastName}`,
      html,
    });

    return NextResponse.json({ success: true, res });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
