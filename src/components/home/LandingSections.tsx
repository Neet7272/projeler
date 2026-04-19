"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { easeOutExpo, springReveal, springTap } from "@/lib/motion";

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
    transition: { duration: 0.5, ease: easeOutExpo },
  };
}

const tileClass =
  "relative overflow-hidden rounded-2xl border border-slate-200/65 bg-white/85 p-6 shadow-[var(--shadow-matte)] backdrop-blur-sm transition-shadow duration-300 hover:border-sky-500/28 hover:shadow-[var(--shadow-matte-hover)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-cyan-400/30 before:to-transparent";

export function LandingSections() {
  const preset = useRevealPreset(14);
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.06 },
    },
  };

  const item = {
    hidden: preset.initial,
    show: {
      ...preset.whileInView,
      transition: preset.transition,
    },
  };

  return (
    <section className="border-t border-slate-200/50 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5"
        >
          {[
            {
              title: "Duyurular",
              desc: "Etkinlikler, yarışmalar, çağrılar. Net ve düzenli.",
              href: "/duyurular",
            },
            {
              title: "Takım İlanları",
              desc: "Fikirleri keşfet, filtrele, başvur. Akış odaklı vitrin.",
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
              whileHover={
                reduce
                  ? undefined
                  : { y: -6, scale: 1.015, transition: springReveal }
              }
              whileTap={
                reduce ? undefined : { scale: 0.99, transition: springTap }
              }
              className={tileClass}
            >
              <p className="text-sm font-semibold tracking-tight text-slate-900">
                {c.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{c.desc}</p>
              <div className="mt-5">
                <Link
                  href={c.href}
                  className="inline-flex text-sm font-semibold text-cyan-700 transition-all duration-200 hover:translate-x-0.5 hover:text-cyan-600"
                >
                  Aç →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
