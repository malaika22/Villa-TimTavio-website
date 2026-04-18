"use client";

import Image from "next/image";
import { NAV_LINKS } from "./constants";
import Link from "next/link";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useId, useState } from "react";
import { AnimatedButton } from "@/components/animated-button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { backdropVariants, linkItemVariants } from "./animations";
import { menuPanelVariants } from "./animations";
import { linkContainerVariants } from "./animations";

export const Header = () => {
  const menuId = useId();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const closeMenu = useCallback(() => setMenuOpen(false), []);

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

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between px-4 transition-colors duration-500 sm:h-[72px] sm:px-8 md:px-12 lg:h-[80px] lg:px-[100px]"
        style={{
          backgroundColor: scrolled ? "rgba(245, 243, 240, 0.96)" : "rgba(245, 243, 240, 0.85)",
          backdropFilter: "blur(20px)",
          boxShadow: scrolled ? "0 1px 0 rgba(24,24,24,0.08)" : "none",
        }}
      >
        <motion.div
          className="absolute top-0 right-0 left-0 z-50 h-[2px] origin-left bg-[#8C7261]"
          style={{ scaleX }}
        />

        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-start gap-1"
        >
          <div className="relative h-7 w-[120px] shrink-0 sm:h-8 sm:w-[148px] lg:h-10 lg:w-[175px]">
            <Image
              src="/images/logo-dark.png"
              alt="Casa Tim Tavio Logo"
              fill
              className="object-contain object-left"
              sizes="175px"
              priority
            />
          </div>

          <span className="text-[6px] tracking-[0.2em]  text-[#8C7261] uppercase sm:text-[9px] lg:text-[7px] w-full text-end">
            Puerto Escondido · Oaxaca · Mexico
          </span>
        </motion.div>
        <div className="space-x-[52px] hidden lg:flex">
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
                  className="group relative inline-block py-1 text-xs tracking-[0.12em] text-[#18181873] transition-colors duration-200 hover:text-[#181818]"
                >
                  {link.label}

                  {isActive && (
                    <motion.span
                      className="absolute bottom-0 left-0 h-[1px] w-full origin-left bg-[#8C7261]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  )}

                  {!isActive && (
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#8C7261] transition-all duration-300 ease-out group-hover:w-full" />
                  )}
                </Link>
              </motion.span>
            );
          })}
        </div>
        <div className="hidden items-center lg:flex lg:gap-[52px]">
          <AnimatedButton href="#exclusive-member">Enter The Infinity</AnimatedButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="relative flex h-11 w-11 items-center justify-center rounded-md text-[#181818] transition-colors hover:bg-[#181818]/5 focus-visible:ring-2 focus-visible:ring-[#8C7261] focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center justify-center"
            >
              {menuOpen ? (
                <X className="size-5" strokeWidth={1.5} />
              ) : (
                <Menu className="size-5" strokeWidth={1.5} />
              )}
            </motion.span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence mode="sync">
        {menuOpen && (
          <>
            <motion.div
              key="nav-backdrop"
              role="presentation"
              className="fixed inset-0 z-[60] bg-[#181818]/45 backdrop-blur-[2px] lg:hidden"
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={closeMenu}
            />

            <motion.div
              key="nav-panel"
              id={menuId}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className={cn(
                "fixed top-0 right-0 z-[70] flex h-svh max-w-[min(100vw,420px)] flex-col shadow-2xl lg:hidden",
                "w-[min(100vw,420px)]",
                "border-l border-[#181818]/10 bg-[#F5F3F0]/98 backdrop-blur-xl"
              )}
              variants={menuPanelVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex items-center justify-between border-b border-[#181818]/8 px-5 py-4 pt-[max(1rem,env(safe-area-inset-top))]">
                <span className="text-[10px] tracking-[0.2em] text-[#181818]/55">MENU</span>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex h-10 w-10 items-center justify-center rounded-md text-[#181818] transition-colors hover:bg-[#181818]/5"
                  aria-label="Close menu"
                >
                  <X className="size-5" strokeWidth={1.5} />
                </button>
              </div>

              <motion.nav
                className="flex flex-1 flex-col gap-1 px-5 py-8"
                variants={linkContainerVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      variants={linkItemVariants}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className={cn(
                          "block border-b border-[#181818]/8 py-4 text-sm tracking-[0.14em] transition-colors",
                          isActive ? "text-[#8C7261]" : "text-[#181818]/80 hover:text-[#181818]"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              <motion.div
                className="border-t border-[#181818]/8 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <AnimatedButton
                  href="#exclusive-member"
                  hrefClassName="!flex !w-full !justify-center"
                >
                  Request an Invitation
                </AnimatedButton>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
