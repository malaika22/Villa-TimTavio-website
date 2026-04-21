import { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://www.villatimtavio.com"),

  title: {
    default: "Villa TimTavio — Private Estate · Puerto Escondido, Oaxaca",
    template: "%s · Villa TimTavio",
  },

  description:
    "1 Estate. 6 Suites. Entirely yours. Villa TimTavio is an invitation-only private estate in Puerto Escondido, Oaxaca — designed by local architects, served by Michelin-trained chefs, and oriented toward the Pacific.",

  keywords: [
    "Villa TimTavio",
    "Villa TimTavio",
    "private villa Puerto Escondido",
    "luxury estate Oaxaca",
    "invitation only villa Mexico",
    "private rental Puerto Escondido",
    "Oaxaca luxury accommodation",
    "whole estate rental Mexico",
    "Pacific coast villa Mexico",
    "Punta Zicatela luxury",
    "private chef villa Oaxaca",
    "exclusive villa rental Mexico",
  ],

  authors: [{ name: "Villa TimTavio", url: "https://www.villatimtavio.com" }],

  creator: "Villa TimTavio",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.villatimtavio.com",
    siteName: "Villa TimTavio",
    title: "Villa TimTavio — Where the Pacific Begins to Whisper",
    description:
      "1 Estate. 6 Suites. Entirely yours. An invitation-only private estate in Puerto Escondido, Oaxaca — Michelin-trained chefs, Pacific experiences, and a world that asks nothing of you.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Villa TimTavio — Private Estate, Puerto Escondido, Oaxaca",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Villa TimTavio — Where the Pacific Begins to Whisper",
    description:
      "1 Estate. 6 Suites. Entirely yours. An invitation-only private estate in Puerto Escondido, Oaxaca.",
    images: ["/images/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  alternates: {
    canonical: "https://www.villatimtavio.com",
  },

  category: "travel",
};
