"use client";

import { createPortal } from "react-dom";
import { useLayoutEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Phase 24: Ultra-fast GPU crescent wipe
 * Tek statik SVG shape + sadece `transform` (`y`) animasyonu.
 */
const WIPE_DURATION = 0.5;
const TIMES = [0, 0.4, 0.5, 1] as const;
const EASE = [0.76, 0, 0.24, 1] as const;
const CRESCENT_PATH =
  "M 0 300 L 0 50 Q 50 0 100 50 L 100 300 Q 50 250 0 300 Z";

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
    <motion.svg
      aria-hidden
      viewBox="0 0 100 300"
      preserveAspectRatio="none"
      className="fixed inset-0 z-[99999] pointer-events-none w-screen h-[150vh] text-cyan-500 fill-current"
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
      <path d={CRESCENT_PATH} />
    </motion.svg>,
    target,
  );
}
