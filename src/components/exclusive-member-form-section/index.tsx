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
      <div ref={headingRef} className="overflow-hidden">
        <motion.h2
          className="text-[#2C2C2C] text-[52px] leading-[56.16px] font-light text-center tracking-[0%]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          initial={{ y: "100%", opacity: 0 }}
          animate={isHeadingInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Apply to become an Exclusive Member
        </motion.h2>
      </div>

      {/* Form */}
      <ExclusiveMemberForm />
    </SectionContainer>
  );
};
