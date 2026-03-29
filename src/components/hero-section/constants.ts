import { Variants } from "motion/react";

export const curtain: Variants = {
  hidden: { y: "105%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.5 + i * 0.09,
      ease: [0.76, 0, 0.24, 1], // sharp ease-in-out — editorial snap
    },
  }),
};

export const fade = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  },
});
