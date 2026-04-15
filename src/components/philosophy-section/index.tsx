"use client";

import { SectionContainer } from "../section-container";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const PhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <SectionContainer
      wrapperClassName="bg-[#8C7261]"
      className="flex items-center space-y-0 justify-between lg:flex-row"
    >
      <div
        ref={ref}
        className="flex flex-col items-stretch gap-8 w-full sm:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12"
      >
        {/* Quote */}
        <div className="overflow-hidden flex-1">
          <motion.h4
            className="text-[#F9F7F4BF] text-[22px] leading-[1.35] tracking-[0%] sm:text-[26px] lg:text-[32px] lg:leading-[40px] text-center"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0 }}
          >
            &quot;There are places in the world that ask nothing of you. Casa TimTavio is one of
            them.&quot;
          </motion.h4>
        </div>
      </div>
    </SectionContainer>
  );
};
