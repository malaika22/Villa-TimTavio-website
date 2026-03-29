export const menuPanelVariants = {
  closed: { x: "100%", transition: { type: "spring" as const, damping: 32, stiffness: 320 } },
  open: { x: 0, transition: { type: "spring" as const, damping: 28, stiffness: 280 } },
};

export const backdropVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

export const linkContainerVariants = {
  open: {
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
  closed: {},
};

export const linkItemVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: 16 },
};
