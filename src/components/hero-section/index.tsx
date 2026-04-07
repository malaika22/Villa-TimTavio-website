"use client";

import { ArrowDown } from "lucide-react";
import { IntroStripSection } from "../intro-strip-section";
import { motion } from "framer-motion";
import { curtain, fade } from "./constants";
import Link from "next/link";

const words = "Where the Pacific begins to whisper.".split(" ");

export const HeroSection = () => {
  return (
    <div className="overflow-hidden">
      <section className="relative min-h-svh flex flex-col justify-end lg:min-h-0 lg:h-[945px]">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/hero-section/hero-image.jpeg')]"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 9, ease: "easeOut" }}
        />

        <div
          className="absolute inset-y-0 left-0 w-[55%] 
  bg-gradient-to-r from-black/60 via-black/30 to-transparent"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" /> */}

        <div className="absolute bottom-10 left-4 right-4 z-10 space-y-8 sm:bottom-14 sm:left-8 sm:right-8 sm:space-y-10 md:left-12 md:right-12 lg:bottom-[150px] lg:left-[100px] lg:right-auto lg:w-[600px] lg:space-y-[55px]">
          <motion.p
            className="text-[#E8E0D461] text-[10px] tracking-[0.2em]"
            variants={fade(0.3)}
            initial="hidden"
            animate="show"
            style={{
              textShadow: "2px 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)",
            }}
          >
            Puerto Escondido · Oaxaca · Mexico
          </motion.p>

          <h1
            className="text-white font-light leading-[1.05] tracking-[-0.02em] sm:leading-[0.98]"
            style={{ fontSize: "clamp(36px, 8vw, 88px)" }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden mr-[0.18em] sm:mr-[0.22em]"
                style={{
                  textShadow: "2px 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)",
                }}
              >
                <motion.span
                  className="inline-block"
                  custom={i}
                  variants={curtain}
                  initial="hidden"
                  animate="show"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="text-[#F5F3F0CC] text-[13px] tracking-[0.04em] sm:text-[14px]"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.8)" }}
            variants={fade(1.4)}
            initial="hidden"
            animate="show"
          >
            1 Estate. 6 Suites. Entirely yours.
          </motion.p>

          <motion.div
            className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-[40px]"
            variants={fade(1.65)}
            initial="hidden"
            animate="show"
          >
            <Link
              href="#exclusive-member"
              className="group relative inline-flex items-center justify-center gap-[10px] overflow-hidden border border-[#F5F3F060] px-6 py-3 cursor-pointer sm:justify-start"
            >
              <span className="absolute inset-0 translate-y-full bg-[#8C7261]/70 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />

              <span
                className="relative text-[10px] tracking-[0.15em] text-[#F5F3F0CC] transition-colors duration-300 group-hover:text-[#F5F3F0]"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
              >
                ENTER THE INFINITY
              </span>

              <motion.span
                className="relative flex items-center text-[#F5F3F0CC] transition-colors duration-300 group-hover:text-[#F5F3F0]"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown size={14} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
      <IntroStripSection />
    </div>
  );
};
