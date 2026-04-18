"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export function FadeUp(props: {
  children: React.ReactNode;
  distance?: number;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{props.children}</>;
  }

  const preset = fadeUp(props.distance ?? 12);

  return (
    <motion.div
      initial={preset.initial}
      animate={preset.animate}
      exit={preset.exit}
      variants={preset.variants}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
        delay: props.delay ?? 0,
      }}
    >
      {props.children}
    </motion.div>
  );
}

