import type { Variants } from "framer-motion";

export type MotionPreset = {
  initial?: string;
  animate?: string;
  exit?: string;
  variants: Variants;
};

/** Premium ease — yumuşak duruş, “ajans” hissi */
export const easeOutExpo: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

export const springReveal = {
  type: "spring" as const,
  stiffness: 380,
  damping: 26,
  mass: 0.85,
};

export const springTap = {
  type: "spring" as const,
  stiffness: 520,
  damping: 32,
  mass: 0.55,
};

export const pageFade: MotionPreset = {
  initial: "initial",
  animate: "enter",
  exit: "exit",
  variants: {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: { duration: 0.35, ease: easeOutExpo },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.25, ease: easeOutExpo },
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
        transition: { duration: 0.45, ease: easeOutExpo },
      },
      exit: {
        opacity: 0,
        y: distance / 2,
        transition: { duration: 0.25, ease: easeOutExpo },
      },
    },
  };
}
