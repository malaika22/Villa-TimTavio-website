"use client";

import { SectionContainer } from "../section-container";
import { contactItems } from "./constants";
import { RequestStayForm } from "./request-stay-form";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const RequestStaySection = () => {
  const leftRef = useRef(null);
  const isLeftInView = useInView(leftRef, { once: true, margin: "0px 0px -100px 0px" });

  const contactRef = useRef(null);
  const isContactInView = useInView(contactRef, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <SectionContainer className="bg-[#2C2C2C] px-12 py-16 max-w-[1920px] mx-auto" id="contact">
      <div className="grid grid-cols-[3fr_3fr] gap-x-24">
        {/* LEFT: Info */}
        <div className="flex flex-col">
          <div ref={leftRef}>
            {/* Eyebrow */}
            <motion.p
              className="text-[10px] tracking-[2.8px] uppercase text-[#B59B8A] mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={isLeftInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
            >
              Request a Stay
            </motion.p>

            {/* Heading — each line clips up */}
            {["Tell us", "what you", "need."].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.span
                  className={`block text-white text-[52px] font-light leading-[56.16px] tracking-[0%] ${i === 2 ? "italic" : ""}`}
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={isLeftInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.15 + i * 0.1,
                  }}
                >
                  {line}
                </motion.span>
              </div>
            ))}

            {/* Body copy */}
            <motion.p
              className="text-[#F9F7F466] text-[14px] leading-[26.6px] tracking-[0%] font-light mt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={isLeftInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
            >
              Every stay at Casa TimTavio is arranged personally. There are no booking engines, no
              availability calendars. Tell us who you are and what you&apos;re looking for —
              we&apos;ll take care of the rest.
            </motion.p>
          </div>

          {/* Contact items — own ref so they fire when scrolled to */}
          <div ref={contactRef} className="space-y-6 mt-14">
            {contactItems.map(({ label, value }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
              >
                <p className="text-[10px] tracking-[1.98px] uppercase text-[#F9F7F447] mb-2">
                  {label}
                </p>
                <p className="text-[15px] font-light text-[#F9F7F4BF]">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: Form */}
        <RequestStayForm />
      </div>
    </SectionContainer>
  );
};
