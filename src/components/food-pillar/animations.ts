import { Variants } from "motion/react";

export const rowVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const cardLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const cardRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const cardUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};
