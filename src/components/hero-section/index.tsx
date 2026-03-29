"use client";

import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
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
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/hero-section/hero-image.png')]"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 9, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        <div className="absolute bottom-10 left-4 right-4 z-10 space-y-8 sm:bottom-14 sm:left-8 sm:right-8 sm:space-y-10 md:left-12 md:right-12 lg:bottom-[150px] lg:left-[100px] lg:right-auto lg:w-[600px] lg:space-y-[55px]">
          <motion.p
            className="text-[#E8E0D461] text-[10px] tracking-[0.2em]"
            variants={fade(0.3)}
            initial="hidden"
            animate="show"
          >
            Puerto Escondido · Oaxaca · Mexico
          </motion.p>

          <h1
            className="text-[#F5F3F0] font-light leading-[1.05] tracking-[-0.02em] sm:leading-[0.98]"
            style={{ fontSize: "clamp(36px, 8vw, 88px)" }}
          >
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.18em] sm:mr-[0.22em]">
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
            className="text-[#F5F3F06B] text-[13px] tracking-[0.04em] sm:text-[14px]"
            variants={fade(1.4)}
            initial="hidden"
            animate="show"
          >
            Six private villas. One estate. Entirely yours.
          </motion.p>

          <motion.div
            className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-[40px]"
            variants={fade(1.65)}
            initial="hidden"
            animate="show"
          >
            <Button className="w-full sm:w-auto px-[48px] h-[48px] text-[10px] tracking-[0.15em] hover:scale-[1.02] transition-transform duration-200">
              REQUEST AN INVITATION
            </Button>

            <button className="group flex items-center justify-center gap-[10px] text-[#F5F3F042] text-[10px] tracking-[0.15em] hover:text-[#F5F3F0] transition-colors duration-300 bg-transparent border-none cursor-pointer sm:justify-start">
              <Link href="#exclusive-member">ENTER THE ESTATE</Link>
              <motion.span
                className="flex items-center"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown size={14} />
              </motion.span>
            </button>
          </motion.div>
        </div>
      </section>
      <IntroStripSection />
    </div>
  );
};
