"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type ToastState =
  | { open: false }
  | { open: true; title: string; description?: string };

export function Toast(props: { state: ToastState; onClose: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {props.state.open ? (
          <motion.div
            initial={
              reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10, filter: "blur(6px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 6, filter: "blur(6px)" }
            }
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto w-[min(92vw,360px)] rounded-2xl border border-[var(--hairline)] bg-[var(--background)] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {props.state.title}
                </p>
                {props.state.description ? (
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {props.state.description}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={props.onClose}
                className="rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
                aria-label="Bildirimi kapat"
              >
                Kapat
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

