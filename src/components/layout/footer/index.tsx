import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "THE ESTATE", href: "/estate" },
  { label: "EXPERIENCES", href: "/experiences" },
  { label: "THE CIRCLE", href: "/circle" },
  { label: "CONTACT", href: "/contact" },
  { label: "PRIVACY", href: "/privacy" },
];

const socialLinks = [
  { label: "INSTAGRAM", href: "https://instagram.com" },
  { label: "WHATSAPP", href: "https://wa.me" },
];

export const Footer = () => {
  return (
    <footer className="bg-[#1C1C1C] max-w-[1920px] mx-auto py-[60px] space-y-10">
      {/* Top row: Logo + Nav */}
      <div className="flex items-center justify-between px-12">
        <Link href="/" className="relative w-[160px] h-[40px]">
          <Image
            src="/images/logo-light.png"
            alt="Villa TimTavio"
            layout="fill"
            objectFit="contain"
            objectPosition="left center"
          />
        </Link>

        <nav className="flex items-center gap-10">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[#FFFFFF4D] hover:text-white text-[10px] tracking-[1.8px] uppercase"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mx-12" />

      {/* Bottom row */}
      <div className="flex items-center justify-between px-12">
        <p className="text-[#FFFFFF33] text-[11px] tracking-[0.4px]">
          © 2025 Casa TimTavio · Puerto Escondido, Oaxaca · Mexico
        </p>

        <p className="text-[#FFFFFF33] text-[14px] italic font-heading">For those who know.</p>

        <div className="flex items-center gap-8">
          {socialLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFFFFF40] hover:text-white text-[10px] tracking-[0.2em] uppercase transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
