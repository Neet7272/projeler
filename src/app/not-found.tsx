"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--surface)] p-10 sm:p-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_300px_at_30%_0%,rgba(99,102,241,0.14),transparent_60%)]" />

        <div className="relative">
          <motion.p
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-medium text-[var(--muted)]"
          >
            404
          </motion.p>

          <motion.h1
            initial={
              reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10, filter: "blur(6px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl"
          >
            Sayfa bulunamadı.
          </motion.h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
            Aradığın sayfa taşınmış olabilir veya hiç var olmamış olabilir.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/dashboard" variant="primary">
              Dashboard
            </Button>
            <Button href="/" variant="secondary">
              Ana sayfa
            </Button>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-10 select-none text-[140px] font-semibold tracking-tight text-white/5"
          animate={reduceMotion ? { y: 0 } : { y: [0, -6, 0] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 6, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }
          }
        >
          404
        </motion.div>
      </div>
    </div>
  );
}

