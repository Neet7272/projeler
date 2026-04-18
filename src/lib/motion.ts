import type { Variants } from "framer-motion";

export type MotionPreset = {
  initial?: string;
  animate?: string;
  exit?: string;
  variants: Variants;
};

export const pageFade: MotionPreset = {
  initial: "initial",
  animate: "enter",
  exit: "exit",
  variants: {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

export function fadeUp(distance = 12): MotionPreset {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants: {
      initial: { opacity: 0, y: distance, filter: "blur(6px)" },
      enter: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      },
      exit: {
        opacity: 0,
        y: distance / 2,
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
      },
    },
  };
}

