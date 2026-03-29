import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { rowVariants } from "./animations";

export const AnimatedRow = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      className="flex gap-3 w-full items-stretch"
      variants={rowVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};
