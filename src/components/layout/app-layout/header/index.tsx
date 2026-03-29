"use client";

import Image from "next/image";
import { NAV_LINKS } from "./constants";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatedButton } from "@/components/animated-button";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 px-[100px] h-[80px] flex items-center justify-between transition-colors duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(245, 243, 240, 0.96)" : "rgba(245, 243, 240, 0.85)",
        backdropFilter: "blur(20px)",
        boxShadow: scrolled ? "0 1px 0 rgba(24,24,24,0.08)" : "none",
      }}
    >
      {/* Progress bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-[#8C7261] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-[175px] h-[40px] relative"
      >
        <Image src="/images/logo-dark.png" alt="Casa Tim Tavio Logo" layout="fill" />
      </motion.div>

      {/* Nav links */}
      <div className="space-x-[52px]">
        {NAV_LINKS.map((link, i) => {
          const isActive = activeSection === link.href;

          return (
            <motion.span
              key={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.07,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block"
            >
              <Link
                href={link.href}
                className="relative text-[#18181873] text-xs tracking-[0.12em] hover:text-[#181818] transition-colors duration-200 group py-1 inline-block"
              >
                {link.label}

                {/* Active underline — framer motion scaleX */}
                {isActive && (
                  <motion.span
                    className="absolute bottom-0 left-0 h-[1px] w-full bg-[#8C7261] origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                )}

                {/* Hover underline — CSS only, hidden when active */}
                {!isActive && (
                  <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#8C7261] group-hover:w-full transition-all duration-300 ease-out" />
                )}
              </Link>
            </motion.span>
          );
        })}
      </div>

      {/* CTA — animated fill reveal on hover */}
      <AnimatedButton href="#">Request an Invitation</AnimatedButton>
    </motion.nav>
  );
};
