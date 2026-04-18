"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { cn } from "@/lib/cn";

export function DashboardShell(props: {
  memberName: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 py-8 sm:py-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-20 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-4">
            <div className="px-2 py-3">
              <p className="text-xs font-medium text-[var(--muted)]">
                Member Area
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
                {props.memberName}
              </p>
            </div>

            <div className="mt-2">
              <DashboardNav variant="sidebar" />
            </div>

            <div className="mt-4 px-2">
              <Link
                href="/"
                className="inline-flex w-full items-center justify-between rounded-xl border border-[var(--hairline)] bg-black/0 px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                <span>Site</span>
                <span className="text-xs">↩</span>
              </Link>
            </div>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between gap-4 lg:hidden">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
              aria-label="Menüyü aç"
            >
              Menü
            </button>
            <p className="text-sm font-medium text-[var(--muted)]">
              {props.memberName}
            </p>
          </div>

          <div className="mt-6 lg:mt-0">{props.children}</div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
              aria-label="Menüyü kapat"
              onClick={() => setOpen(false)}
            />

            <motion.aside
              className={cn(
                "absolute inset-y-0 left-0 w-[min(88vw,320px)]",
                "border-r border-[var(--hairline)] bg-[var(--background)]"
              )}
              initial={reduceMotion ? { x: 0 } : { x: "-100%" }}
              animate={{ x: 0 }}
              exit={reduceMotion ? { x: 0 } : { x: "-100%" }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex h-16 items-center justify-between border-b border-[var(--hairline)] px-5">
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  Menü
                </p>
                <button
                  type="button"
                  className="rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
                  onClick={() => setOpen(false)}
                >
                  Kapat
                </button>
              </div>

              <div className="p-5">
                <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-4">
                  <p className="text-xs font-medium text-[var(--muted)]">
                    Member Area
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
                    {props.memberName}
                  </p>
                  <div className="mt-3">
                    <DashboardNav variant="sidebar" />
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    href="/"
                    className="inline-flex w-full items-center justify-between rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    onClick={() => setOpen(false)}
                  >
                    <span>Siteye dön</span>
                    <span className="text-xs">↩</span>
                  </Link>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

