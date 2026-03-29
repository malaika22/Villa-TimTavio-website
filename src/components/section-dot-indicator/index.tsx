"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS } from "../layout/app-layout/header/constants";

// Define whether each section has a light or dark background
const SECTION_THEMES: Record<string, "light" | "dark"> = {
  "#estate": "light",
  "#experiences": "light",
  "#the-circle": "light",
  "#contact": "dark",
};

export const SectionDotsIndicator = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredDot, setHoveredDot] = useState<string>("");

  const isDarkBg = SECTION_THEMES[activeSection] === "dark";

  // Dot colors based on section bg
  const inactiveDotColor = isDarkBg ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)";

  const inactiveHoverColor = isDarkBg ? "rgba(201,169,110,0.6)" : "rgba(140,114,97,0.6)";

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_LINKS.forEach(({ href }) => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(href);
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden flex-col items-center gap-[14px] lg:flex">
      {NAV_LINKS.map(({ href, label }) => {
        const isActive = activeSection === href;
        const isHovered = hoveredDot === href;

        return (
          <button
            key={href}
            onClick={() => handleClick(href)}
            onMouseEnter={() => setHoveredDot(href)}
            onMouseLeave={() => setHoveredDot("")}
            className="relative flex items-center justify-center cursor-pointer"
            aria-label={`Scroll to ${label}`}
          >
            {/* Tooltip */}
            <motion.span
              className="absolute right-5 text-[9px] tracking-[0.18em] uppercase whitespace-nowrap pointer-events-none"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: isDarkBg ? "#C9A96E" : "#8C7261",
              }}
              initial={{ opacity: 0, x: 6 }}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {label}
            </motion.span>

            {/* Dot */}
            <motion.span
              className="block rounded-full"
              animate={{
                width: isActive ? 10 : isHovered ? 7 : 5,
                height: isActive ? 10 : isHovered ? 7 : 5,
                backgroundColor: isActive
                  ? "#C9A96E"
                  : isHovered
                    ? inactiveHoverColor
                    : inactiveDotColor,
                boxShadow: isActive ? "0 0 8px rgba(201,169,110,0.6)" : "none",
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </button>
        );
      })}
    </div>
  );
};
