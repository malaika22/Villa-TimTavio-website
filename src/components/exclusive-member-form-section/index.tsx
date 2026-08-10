"use client";

import { SectionContainer } from "../section-container";
import { ExclusiveMemberForm } from "./ExclusiveMemberForm";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const ExclusiveMemberFormSection = () => {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <SectionContainer wrapperClassName="bg-[#F3F1EE]">
      {/* Heading */}
      <div ref={headingRef} className="overflow-hidden text-center">
        <motion.h2
          className="text-[#2C2C2C] text-[28px] leading-[1.12] font-light tracking-[0%] sm:text-[36px] lg:text-[52px] lg:leading-[56.16px]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          initial={{ y: "100%", opacity: 0 }}
          animate={isHeadingInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Apply here for reservations
        </motion.h2>
      </div>

      {/* Form */}
      <ExclusiveMemberForm />
    </SectionContainer>
  );
};
