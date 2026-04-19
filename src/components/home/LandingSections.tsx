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

const tileClass =
  "overflow-hidden rounded-2xl border border-slate-200/65 bg-white/85 p-6 shadow-[var(--shadow-matte)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/28 hover:shadow-[var(--shadow-matte-hover)]";

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
            <motion.div key={c.title} variants={item} className={tileClass}>
              <p className="text-sm font-semibold tracking-tight text-slate-900">
                {c.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{c.desc}</p>
              <div className="mt-5">
                <Link
                  href={c.href}
                  className="text-sm font-semibold text-cyan-700 transition-colors duration-200 hover:text-cyan-600"
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
