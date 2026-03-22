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
    <section ref={ref} className="bg-[#181818] px-[100px] py-[72px] flex items-center gap-[70px]">
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
            "border-r border-[#FFFFFF0D] flex-1 space-y-[10px]",
            index === INTRO_STRIP_SECTION_CONTENT.length - 1 && "border-r-0"
          )}
        >
          <p className="text-[#FFFFFF26] text-[10px] tracking-[0.18em] uppercase">{item.label}</p>
          <p className="text-[#F3F1EE99] font-heading text-[21px]">{item.value}</p>
        </motion.div>
      ))}
    </section>
  );
};
