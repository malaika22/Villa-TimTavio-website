import { useInView } from "motion/react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { rowVariants } from "./animations";
import { cn } from "@/lib/utils";

export const AnimatedRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <motion.div
      ref={ref}
      className={cn("grid grid-cols-1 gap-3 w-full sm:gap-3", className)}
      variants={rowVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};
