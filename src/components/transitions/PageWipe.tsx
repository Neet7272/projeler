"use client";

import { createPortal } from "react-dom";
import { useLayoutEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Phase 27: Premium hilal wipe — **statik** SVG path (CPU dostu), yalnızca GPU `y`.
 * `d` morph kullanılmıyor (önceki lag deneyimi); organik şekil sabit path ile korunur.
 */
const WIPE_DURATION = 0.5;
const TIMES = [0, 0.4, 0.5, 1] as const;
const EASE = [0.76, 0, 0.24, 1] as const;
const CRESCENT_PATH =
  "M 0 300 L 0 50 Q 50 0 100 50 L 100 300 Q 50 250 0 300 Z";

export function PageWipe() {
  const reduceMotion = useReducedMotion();
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [finished, setFinished] = useState(false);

  useLayoutEffect(() => {
    setTarget(document.body);
  }, []);

  if (reduceMotion || finished || !target) return null;

  return createPortal(
    <motion.svg
      aria-hidden
      viewBox="0 0 100 300"
      preserveAspectRatio="none"
      className="pointer-events-none fixed inset-0 z-[99999] h-[150vh] w-screen overflow-hidden"
      initial={{ y: "100vh" }}
      animate={{ y: ["100vh", "-25vh", "-25vh", "-150vh"] }}
      transition={{
        duration: WIPE_DURATION,
        times: [...TIMES],
        ease: [...EASE],
      }}
      style={{ willChange: "transform" }}
      onAnimationComplete={() => setFinished(true)}
    >
      <path d={CRESCENT_PATH} fill="#06b6d4" />
    </motion.svg>,
    target,
  );
}
