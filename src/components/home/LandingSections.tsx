"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

function useRevealPreset(distance = 14) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return {
      initial: { opacity: 1, y: 0, filter: "blur(0px)" },
      whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0, y: distance, filter: "blur(6px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  };
}

export function LandingSections() {
  const preset = useRevealPreset(14);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: preset.initial,
    show: preset.whileInView,
  };

  return (
    <div className="mt-14 sm:mt-20">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {[
          {
            title: "Duyurular",
            desc: "Etkinlikler, yarışmalar, çağrılar. Net ve düzenli.",
            href: "/duyurular",
          },
          {
            title: "Takım İlanları",
            desc: "Fikirleri keşfet, filtrele, başvur. Premium minimal akış.",
            href: "/takim-ilanlari",
          },
          {
            title: "Dashboard",
            desc: "İlanların, başvuruların ve profilin tek yerde.",
            href: "/dashboard",
          },
        ].map((c) => (
          <motion.div
            key={c.title}
            variants={item}
            className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6"
          >
            <p className="text-sm font-semibold text-[var(--foreground)]">
              {c.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{c.desc}</p>
            <div className="mt-5">
              <Link
                href={c.href}
                className="text-sm font-medium text-[var(--foreground)]/85 transition-colors hover:text-[var(--foreground)]"
              >
                Aç →
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

