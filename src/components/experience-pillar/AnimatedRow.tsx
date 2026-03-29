import { useInView } from "motion/react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { rowVariants } from "./animations";

export const AnimatedRow = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

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
