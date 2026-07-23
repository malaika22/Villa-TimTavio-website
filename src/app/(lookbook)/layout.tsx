import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "@/components/lookbook/styles/index.css";

export const metadata: Metadata = {
  title: "Villa TimTavio — The Experience",
};

// Standalone root layout for the lookbook. It deliberately does NOT share the
// marketing site's layout (header/footer/Tailwind globals) — the walkthrough
// owns the full viewport and ships its own design tokens + deck styles, so it
// lives in its own route group with its own <html>/<body>.
export default function LookbookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body>
        {/* Enable scroll-reveal styling before first paint (avoids a flash of
            visible content before the IntersectionObserver kicks in). Scoped so
            no-JS = visible. Mirrors the original main.jsx bootstrap. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('reveal-ready');`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
