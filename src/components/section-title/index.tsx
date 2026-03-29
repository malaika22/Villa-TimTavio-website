"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { fadeUp } from "./animations";

export const SectionTitle = ({
  description,
  buttonText,
}: {
  description: string;
  buttonText: string;
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-0">
      {/* Description */}
      <motion.div
        className="flex-1"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={0}
      >
        <p className="text-[#797168] text-[12px] leading-[28.8px] font-light max-w-[440px]">
          {description}
        </p>
      </motion.div>

      {/* Button */}
      <motion.div
        className="sm:flex-1 sm:flex sm:justify-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={0.12}
      >
        <Button
          variant="ghost"
          className="group gap-2 hover:bg-transparent text-[#797168] font-regular text-[9px]"
        >
          {buttonText}
          <motion.span
            className="flex items-center"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.span>
        </Button>
      </motion.div>
    </div>
  );
};
