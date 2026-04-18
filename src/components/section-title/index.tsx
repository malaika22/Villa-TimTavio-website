"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "./animations";
import Link from "next/link";

export const SectionTitle = ({
  description,
  buttonText,
}: {
  description: string;
  buttonText: string;
}) => {
  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:gap-0 md:items-center">
      {/* Description */}
      <motion.div
        className="flex-2"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={0}
      >
        <p className="text-[18px] text-center lg:text-start leading-[28.8px] font-light max-w-[650px] font-light italic font-heading lg:text-[24px] leading-relaxed">
          {description}
        </p>
      </motion.div>

      {/* Button */}
      <motion.div
        className="sm:flex-1 flex justify-center lg:justify-start"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={0.12}
      >
        <Link
          href="#contact"
          className="group relative inline-flex items-center gap-2 border border-[#2C2C2C] px-5 py-2.5 overflow-hidden font-medium"
        >
          <span className="absolute inset-0 bg-[#2C2C2C] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
          <span className="relative text-[11px] tracking-[0.15em] uppercase text-[#2C2C2C] group-hover:text-[#F5F3F0] transition-colors duration-300">
            {buttonText}
          </span>
          <ArrowRight
            size={13}
            className="relative text-[#2C2C2C] group-hover:text-[#F5F3F0] transition-all duration-300 group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    </div>
  );
};
