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
    <footer className="bg-[#1C1C1C] max-w-[1920px] mx-auto py-10 space-y-8 sm:py-12 lg:py-[60px] lg:space-y-10">
      <div className="flex flex-col items-center gap-6 px-4 sm:px-8 md:px-12 lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/"
          className="relative w-[120px] h-[32px] shrink-0 sm:w-[140px] sm:h-[36px] lg:w-[160px] lg:h-[40px]"
        >
          <Image
            src="/images/logo-light.png"
            alt="Villa TimTavio"
            layout="fill"
            objectFit="contain"
            objectPosition="left center"
          />
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8 lg:gap-10">
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

      <div className="border-t border-white/10 mx-4 sm:mx-8 md:mx-12" />

      <div className="flex flex-col items-center gap-4 px-4 text-center sm:px-8 md:px-12 lg:flex-row lg:items-center lg:justify-between lg:text-left">
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
