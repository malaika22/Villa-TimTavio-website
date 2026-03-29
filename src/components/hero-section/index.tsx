"use client";

import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { IntroStripSection } from "../intro-strip-section";
import { motion } from "framer-motion";
import { curtain, fade } from "./constants";

const words = "Where the Pacific begins to whisper.".split(" ");

export const HeroSection = () => {
  return (
    <div className="overflow-hidden">
      <section className="relative h-[945px] flex flex-col justify-end">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/hero-section/hero-image.png')]"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 9, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        <div className="absolute bottom-[150px] left-[100px] z-10 w-[600px] space-y-[55px]">
          <motion.p
            className="text-[#E8E0D461] text-[10px] tracking-[0.2em]"
            variants={fade(0.3)}
            initial="hidden"
            animate="show"
          >
            Puerto Escondido · Oaxaca · Mexico
          </motion.p>

          <h1
            className="text-[#F5F3F0] font-light leading-[0.98] tracking-[-0.02em]"
            style={{ fontSize: "clamp(52px, 6.5vw, 88px)" }}
          >
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.22em]">
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
            className="text-[#F5F3F06B] text-[14px] tracking-[0.04em]"
            variants={fade(1.4)}
            initial="hidden"
            animate="show"
          >
            Six private villas. One estate. Entirely yours.
          </motion.p>

          <motion.div
            className="flex items-center gap-[40px]"
            variants={fade(1.65)}
            initial="hidden"
            animate="show"
          >
            <Button className="px-[48px] h-[48px] text-[10px] tracking-[0.15em] hover:scale-[1.02] transition-transform duration-200">
              REQUEST AN INVITATION
            </Button>

            <button className="group flex items-center gap-[10px] text-[#F5F3F042] text-[10px] tracking-[0.15em] hover:text-[#F5F3F0] transition-colors duration-300 bg-transparent border-none cursor-pointer">
              ENTER THE ESTATE
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
