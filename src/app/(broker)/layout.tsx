import "../globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Its own route group, deliberately outside the marketing site.
 *
 * No AppLayout: no header, no navigation, nothing that invites a visitor
 * further into the estate's world. This page exists for people who were given
 * the link, and the surrounding site is not what they came for.
 *
 * `noindex` matters more than usual here. A single shared link is the estate's
 * chosen trade-off, and the one thing that would turn it from private into
 * public is a search engine finding it.
 */
export const metadata: Metadata = {
  title: "Availability · Villa TimTavio",
  robots: { index: false, follow: false, nocache: true },
};

export default function BrokerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f7f5f1]">{children}</body>
    </html>
  );
}
