"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const PillarHeroSection = ({
  Image,
  tag,
  title,
  subtitle,
}: {
  Image: React.ReactNode;
  tag: string;
  title: string;
  subtitle: string;
}) => {
  // Ref on the TEXT BLOCK only — not the whole section
  const textRef = useRef(null);
  const isInView = useInView(textRef, {
    once: true,
    // Negative margin means the element must be THIS far inside the viewport
    // before triggering — ensures text is actually visible before animating
    margin: "0px 0px -200px 0px",
  });

  return (
    <section className="relative w-full max-w-[1920px] mx-auto overflow-hidden">
      <div className="relative w-full h-[950px]">
        {Image}

        {/* Gradient overlay — always visible, no animation needed */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.15) 60%, transparent 100%)",
          }}
        />

        {/* Text block — ref lives HERE so inView fires when THIS is visible */}
        <div
          ref={textRef}
          className="absolute max-w-fit mx-auto right-0 left-0 bottom-[90px] p-10 z-10 text-center"
        >
          {/* Eyebrow tag */}
          <div className="overflow-hidden mb-3">
            <motion.p
              className="text-[#C9A96E] text-[10px] tracking-[0.3em] uppercase flex items-center gap-2 justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0 }}
            >
              <div className="w-[10px] h-[1px] bg-[#C9A96E]" />
              {tag}
              <div className="w-[10px] h-[1px] bg-[#C9A96E]" />
            </motion.p>
          </div>

          {/* Main title */}
          <div className="overflow-hidden">
            <motion.h2
              className="text-white text-5xl font-light leading-tight italic font-heading"
              initial={{ y: 60, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            >
              {`"${title}"`}
            </motion.h2>
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden mt-4">
            <motion.h5
              className="font-light font-sans text-[#fdfcf961] uppercase text-[0.58rem] tracking-[0.26em]"
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
            >
              {subtitle}
            </motion.h5>
          </div>
        </div>
      </div>
    </section>
  );
};
