"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const FoundersQuoteSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="min-h-[400px] bg-[#E3E0DA] flex flex-col items-center justify-center gap-10 px-4 py-16 sm:min-h-[500px] sm:gap-14 sm:px-8 lg:h-[705px] lg:min-h-0 lg:gap-[72px] lg:px-12 lg:py-0"
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
        className="text-[24px] font-light italic max-w-[1200px] mx-auto text-center leading-snug sm:text-[30px] lg:text-[38px]"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
      >
        &quot;Villa TimTavio was born from a singular vision: to curate the ultimate Oaxacan
        sanctuary. We brought together the brutalist genius of Ludwig Godefroy, the design edge of
        Bibiana Huber, and the Michelin-tier culinary direction of Chef Billy Maldonado to create an
        experience entirely without compromise.&quot;
      </motion.h5>

      {/* Attribution */}
      <motion.p
        className="text-[#797168] text-sm tracking-[0.15em] uppercase"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.85 }}
      >
        The Founders · Villa TimTavio
      </motion.p>
    </div>
  );
};
