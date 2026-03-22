"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const FoundersQuoteSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="h-[705px] bg-[#E3E0DA] flex flex-col items-center justify-center gap-[72px]"
    >
      {/* Vertical line draws down */}
      <motion.div
        className="bg-[#8C7261] w-[1px]"
        initial={{ height: 0, opacity: 0 }}
        animate={isInView ? { height: 48, opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      />

      {/* Quote — word by word */}
      <motion.h5
        className="text-[38px] font-light italic max-w-[680px] mx-auto text-center leading-snug"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
      >
        &quot;We built this place because the world already has enough luxury. What it lacks is
        quiet.&quot;
      </motion.h5>

      {/* Attribution */}
      <motion.p
        className="text-[#797168] text-sm tracking-[0.15em] uppercase"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.85 }}
      >
        The Founders · Casa TimTavio
      </motion.p>
    </div>
  );
};
