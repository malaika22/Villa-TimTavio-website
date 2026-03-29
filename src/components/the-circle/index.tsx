"use client";

import Image from "next/image";
import { SectionContainer } from "../section-container";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const circleData = [
  "Priority access to all six villas",
  "Dedicated estate concierge",
  "Exclusive member events & gatherings",
  "Invitation to new property releases",
  "Annual estate retreat for members",
];

export const TheCircle = () => {
  const topRef = useRef(null);
  const isTopInView = useInView(topRef, { once: true, margin: "0px 0px -100px 0px" });

  // Separate ref just for the benefits list
  const listRef = useRef(null);
  const isListInView = useInView(listRef, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <SectionContainer
      wrapperClassName="bg-[#E3E0DA]"
      className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:items-center lg:gap-0"
      id="the-circle"
    >
      <div className="w-full space-y-8 sm:space-y-10 lg:flex-1 lg:space-y-[60px]">
        {/* Badge */}
        <motion.div
          ref={topRef}
          className="border border-[#6E3D3538] text-[#8C7261] text-[8px] py-[9px] px-[18px] w-fit uppercase tracking-[2.88px]"
          initial={{ opacity: 0, y: 12 }}
          animate={isTopInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          The Circle — Members Only
        </motion.div>

        {/* Heading + Body */}
        <div>
          <div className="overflow-hidden pb-[40px]">
            <motion.h4
              className="text-[32px] text-[#181818] leading-[1.08] italic max-w-[242px] font-light sm:text-[40px] lg:text-[56px] lg:leading-[58.8px]"
              initial={{ y: "100%", opacity: 0 }}
              animate={isTopInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            >
              A different kind of belonging.
            </motion.h4>
          </div>

          <motion.p
            className="max-w-[350px] text-[#797168] text-[12px] leading-[30px] font-light"
            initial={{ opacity: 0, y: 16 }}
            animate={isTopInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
          >
            The Circle is our private membership for guests who return. Not a loyalty programme. Not
            a points system. A quiet acknowledgment that you are part of something rare.
          </motion.p>
        </div>

        {/* Benefits list — own ref so it fires when THIS is visible */}
        <div ref={listRef}>
          {circleData.map((item, index) => (
            <motion.div
              key={index}
              className="py-[18px] border-b border-[#8F88801F] flex gap-[20px] items-center"
              initial={{ opacity: 0, x: -24 }}
              animate={isListInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
              transition={{
                duration: 0.55,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: index * 0.1,
              }}
            >
              <motion.div
                className="w-[16px] h-[1px] bg-[#8C7261] shrink-0"
                initial={{ scaleX: 0 }}
                animate={isListInView ? { scaleX: 1 } : { scaleX: 0 }}
                style={{ transformOrigin: "left" }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: 0.05 + index * 0.1,
                }}
              />
              <p className="text-[#797168] text-[10px] leading-none">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image */}
      <motion.div
        className="relative w-full h-[400px] sm:h-[500px] md:h-[650px] lg:flex-1 lg:w-[960px] lg:h-[1108px]"
        initial={{ opacity: 0, x: 60 }}
        animate={isTopInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
      >
        <Image
          src="/images/the-circle-section.png"
          alt="the-circle-section"
          fill
          objectFit="cover"
        />
      </motion.div>
    </SectionContainer>
  );
};
