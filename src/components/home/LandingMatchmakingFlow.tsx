"use client";

import { motion, useReducedMotion } from "framer-motion";
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

/**
 * Tek responsive grid — aynı adımların iki kez (masaüstü + mobil) map edilmesi yok.
 */
export function LandingMatchmakingFlow() {
  const reduce = useReducedMotion();

  return (
    <section className="relative border-y border-[var(--hairline)] bg-[color:color-mix(in_oklab,var(--foreground),transparent_97%)] py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_0%,rgba(6,182,212,0.08),transparent_55%)]" />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            Nasıl çalışır?
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Ekip arama & ilan verme
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--muted)] sm:text-lg">
            Profil → vitrin → başvuru veya ilan → moderasyon sonrası görünürlük. Aşağıdaki
            adımlar akışı özetler.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                initial={reduce ? undefined : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.06 }}
                className="relative flex flex-col rounded-2xl border border-cyan-500/15 bg-[var(--background)] p-6 shadow-[0_0_0_1px_rgba(34,211,238,0.06)]"
              >
                <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                <div className="flex min-h-11 min-w-11 items-center justify-center self-start rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-600">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </div>
                <p className="mt-4 text-xs font-semibold text-cyan-700/90">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-[var(--foreground)]">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-[var(--muted)]">{s.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
