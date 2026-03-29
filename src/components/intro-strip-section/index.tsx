"use client";

import { cn } from "@/lib/utils";
import { INTRO_STRIP_SECTION_CONTENT } from "./constants";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const IntroStripSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-[#181818]">
      <div className="mx-auto w-full max-w-[1400px] border-t border-[#FFFFFF14] px-4 py-12 sm:px-8 md:px-10 lg:px-8 lg:py-[72px]">
        <div
          className={cn(
            "grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-11",
            "justify-items-center text-center sm:justify-items-stretch sm:text-left",
            "lg:flex lg:grid-cols-none lg:items-start lg:justify-center lg:gap-[70px] lg:text-left"
          )}
        >
          {INTRO_STRIP_SECTION_CONTENT.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={cn(
                "w-full max-w-[280px] space-y-2 sm:max-w-none sm:space-y-[10px] lg:flex-1 lg:max-w-none",
                "border-b border-[#FFFFFF14] pb-10 last:border-b-0 last:pb-0 sm:border-b-0 sm:pb-0",
                "lg:border-r lg:border-[#FFFFFF0D] lg:pb-0 lg:pr-[70px] lg:last:border-r-0 lg:last:pr-0"
              )}
            >
              <p className="text-[10px] tracking-[0.18em] text-[#FFFFFF26] uppercase">
                {item.label}
              </p>
              <p className="font-heading text-[17px] leading-snug text-[#F3F1EE99] sm:text-[19px] lg:text-[21px]">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
