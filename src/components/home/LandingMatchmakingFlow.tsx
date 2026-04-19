"use client";

import { motion, useReducedMotion } from "framer-motion";
import { springReveal, springTap } from "@/lib/motion";
import { UserPlus, Search, Megaphone, Users } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Profilini tamamla",
    body: "Yetenekler ve portfolyo linkleri; ekip liderlerinin seni hızlıca değerlendirmesini sağlar.",
  },
  {
    icon: Search,
    title: "Vitrini keşfet",
    body: "Onaylı projeleri filtrele; Teknofest, TÜBİTAK ve kulüp çağrılarını tek vitrinde gör.",
  },
  {
    icon: Megaphone,
    title: "İlan ver veya başvur",
    body: "Kendi projen için çağrı aç veya mevcut ekiplere güçlü bir başvuru metniyle katıl.",
  },
  {
    icon: Users,
    title: "Eşleş ve üret",
    body: "Moderasyon ve kulüp süreçleriyle güvenli eşleşme; sprint’lerle üretime geç.",
  },
] as const;

const stepCardClass =
  "relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/65 bg-white/85 p-6 shadow-[var(--shadow-matte)] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-sky-500/28 hover:shadow-[var(--shadow-matte-hover)]";

/**
 * Tek responsive grid — aynı adımların iki kez (masaüstü + mobil) map edilmesi yok.
 */
export function LandingMatchmakingFlow() {
  const reduce = useReducedMotion();

  return (
    <section className="relative border-y border-slate-200/50 bg-[color:color-mix(in_oklab,#f8fafc,white_40%)] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_0%,rgba(6,182,212,0.08),transparent_58%)]" />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Nasıl çalışır?
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Ekip arama & ilan verme
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Profil → vitrin → başvuru veya ilan → moderasyon sonrası görünürlük. Aşağıdaki
            adımlar akışı özetler.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                initial={reduce ? undefined : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 360,
                        damping: 26,
                        mass: 0.9,
                        delay: i * 0.055,
                      }
                }
                whileHover={
                  reduce
                    ? undefined
                    : { y: -5, scale: 1.01, transition: springReveal }
                }
                whileTap={
                  reduce ? undefined : { scale: 0.992, transition: springTap }
                }
                className={stepCardClass}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent" />
                <div className="flex min-h-11 min-w-11 items-center justify-center self-start rounded-xl border border-cyan-500/20 bg-cyan-500/[0.08] text-cyan-700">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </div>
                <p className="mt-4 text-xs font-semibold text-cyan-700/90">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{s.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
