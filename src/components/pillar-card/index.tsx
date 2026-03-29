"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const PillarCard = ({
  Image,
  title,
  subtitle,
  className,
}: {
  Image: React.ReactNode;
  title: string;
  subtitle: string;
  className?: string;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={cn("relative overflow-hidden cursor-pointer w-full", className)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {Image}
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={{
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.08) 40%, transparent 100%)",
        }}
        transition={{ duration: 0.5 }}
      />

      <div className="absolute bottom-0 left-0 p-4 z-10 sm:p-6 lg:p-8">
        <div className="overflow-hidden">
          <motion.h2
            className="text-white font-serif text-xl font-light tracking-wide sm:text-2xl lg:text-4xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            initial={{ y: 60, opacity: 0 }}
            animate={hovered ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0 }}
          >
            {title}
          </motion.h2>
        </div>
        <div className="overflow-hidden mt-1">
          <motion.p
            className="text-white/80 text-[10px] uppercase font-light sm:text-xs"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "0.15em" }}
            initial={{ y: 30, opacity: 0 }}
            animate={hovered ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.08 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
