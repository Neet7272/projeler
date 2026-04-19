"use client";

import { createPortal } from "react-dom";
import { useLayoutEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Rise-at-Seven tarzı: alttan kapanır, kısa duraklama, yukarı süzülerek açılır */
const WIPE_DURATION = 0.92;
const TIMES = [0, 0.4, 0.48, 1] as const;
const EASE_SEGMENTS: [
  [number, number, number, number],
  "linear",
  [number, number, number, number],
] = [
  [0.76, 0, 0.24, 1],
  "linear",
  [0.19, 1, 0.22, 1],
];

/**
 * Her `app/template` remount’unda çalışır; `document.body` portalı ile
 * header/footer üstünde tam ekran süpürme (layout shift yok).
 */
export function PageWipe() {
  const reduceMotion = useReducedMotion();
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [finished, setFinished] = useState(false);

  useLayoutEffect(() => {
    setTarget(document.body);
  }, []);

  if (reduceMotion || finished || !target) return null;

  return createPortal(
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[99999] bg-slate-900"
      initial={{ y: "100%" }}
      animate={{ y: ["100%", "0%", "0%", "-100%"] }}
      transition={{
        duration: WIPE_DURATION,
        times: [...TIMES],
        ease: EASE_SEGMENTS,
      }}
      style={{ willChange: "transform" }}
      onAnimationComplete={() => setFinished(true)}
    />,
    target,
  );
}
