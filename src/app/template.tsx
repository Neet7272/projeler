"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

const WIPE_MS = 520;
const CONTENT_DELAY = 0.26;
const EXIT_MS = 0.18;

/**
 * App Router: `template` her navigasyonda yeniden mount olur — `AnimatePresence` + `key={pathname}` ile
 * çıkış/giriş senkronu. Cyan vurgulu tam ekran panel alttan üste süpürülür; içerik wipe sonrası hafif gecikmeyle belirir.
 */
export default function Template(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const prevPath = useRef<string | null>(null);
  const [wipeKey, setWipeKey] = useState(0);

  useLayoutEffect(() => {
    if (
      prevPath.current !== null &&
      prevPath.current !== pathname &&
      !reduceMotion
    ) {
      setWipeKey((k) => k + 1);
    }
    prevPath.current = pathname;
  }, [pathname, reduceMotion]);

  if (reduceMotion) {
    return (
      <div className="relative min-h-0 flex-1 overflow-x-hidden">
        {props.children}
      </div>
    );
  }

  return (
    <div className="relative min-h-0 flex-1 overflow-x-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={pathname}
          className="relative isolate z-0 min-h-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.34, delay: CONTENT_DELAY, ease: [0.22, 1, 0.36, 1] },
          }}
          exit={{
            opacity: 0,
            transition: { duration: EXIT_MS, ease: [0.4, 0, 1, 1] },
          }}
        >
          {props.children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {wipeKey > 0 ? (
          <motion.div
            key={wipeKey}
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[100] bg-cyan-600"
            initial={{ y: "100%" }}
            animate={{ y: "-100%" }}
            exit={{ opacity: 0 }}
            transition={{
              duration: WIPE_MS / 1000,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ willChange: "transform" }}
            onAnimationComplete={() => setWipeKey(0)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
