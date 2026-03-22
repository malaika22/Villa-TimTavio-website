"use client";

import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { IntroStripSection } from "../intro-strip-section";
import { motion } from "framer-motion";

const headline = "Where the Pacific begins to whisper.";
const words = headline.split(" ");

export const HeroSection = () => {
  return (
    <div className="overflow-hidden">
      <section className="relative h-[945px] bg-cover bg-center bg-no-repeat bg-[url('/images/hero-section/hero-image.png')] flex flex-col justify-end">
        {/* Ken Burns zoom on bg */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/hero-section/hero-image.png')]"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        />

        {/* Dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute bottom-[150px] left-[100px] space-y-[55px] z-10">
          <div className="w-[600px] space-y-[55px]">
            {/* Location tag */}
            <motion.div
              className="text-[#E8E0D461] text-[10px] tracking-[0.2em]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              Puerto Escondido · Oaxaca · Mexico
            </motion.div>

            {/* Word-by-word headline */}
            <h1 className="text-[#F5F3F0] text-[88px] font-[300] leading-[89.76px]">
              {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.22em]">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.5 + i * 0.08,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subtext */}
            <motion.p
              className="text-[#F5F3F06B] text-[14px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
            >
              Six private villas. One estate. Entirely yours.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="space-x-[40px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.55, ease: "easeOut" }}
          >
            <Button className="px-[48px] h-[48px] text-[10px] tracking-[0.15em] hover:scale-[1.02] transition-transform duration-200">
              REQUEST AN INVITATION
            </Button>
            <Button className="bg-transparent text-[#F5F3F061] text-[10px] tracking-[0.15em] hover:text-[#F5F3F0] transition-colors duration-200">
              ENTER THE ESTATE
              <motion.span
                className="text-[#F5F3F061] group-hover:text-[#F5F3F0] transition-colors duration-200 flex items-center"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown size={16} />
              </motion.span>
            </Button>
          </motion.div>
        </div>
      </section>
      <IntroStripSection />
    </div>
  );
};
