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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative w-full max-w-[1920px] mx-auto overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-[950px]" style={{ aspectRatio: "16/10" }}>
        {Image}

        {/* Dark gradient overlay from bottom */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.15) 60%, transparent 100%)",
          }}
        />

        {/* Text overlay */}
        <div className="absolute max-w-fit mx-auto right-0 left-0 bottom-[90px] left-0 p-10 z-10 text-center">
          {/* Eyebrow label */}
          <div className="overflow-hidden mb-3">
            <motion.p
              className="text-[#C9A96E] text-[10px] tracking-[0.3em] uppercase flex items-center gap-2 justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            >
              <div className="w-[10px] h-[1px] bg-[#C9A96E]" />
              {tag}
              <div className="w-[10px] h-[1px] bg-[#C9A96E]" />
            </motion.p>
          </div>

          {/* Main heading — mixed roman + italic */}
          <div className="overflow-hidden">
            <motion.h2
              className="text-white text-5xl font-light leading-tight italic font-heading"
              initial={{ y: 60, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.35 }}
            >
              {`"${title}"`}
            </motion.h2>
            <motion.h5
              className="font-light leading-tight font-sans text-[#fdfcf961] text-sm spacing-[0.26em] uppercase text-[0.58rem] mt-4"
              initial={{ y: 60, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.35 }}
            >
              {subtitle}
            </motion.h5>
          </div>
        </div>
      </div>
    </section>
  );
};
