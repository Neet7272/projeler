"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Search, Megaphone, Users } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Profilini tamamla",
    body: "Yeteneklerini ve portfolyo linklerini ekle. Ekip liderleri seni hızlıca değerlendirebilsin.",
  },
  {
    icon: Search,
    title: "Vitrini keşfet",
    body: "Onaylı projeleri filtrele; Teknofest, TÜBİTAK ve kulüp içi çağrıları tek yerde gör.",
  },
  {
    icon: Megaphone,
    title: "İlan ver veya başvur",
    body: "Kendi projen için çağrı aç veya mevcut ekiplere güçlü bir başvuru metniyle katıl.",
  },
  {
    icon: Users,
    title: "Eşleş ve üret",
    body: "Moderasyon ve kulüp süreçleriyle güvenli eşleşme; odak sprint’lerle üretime geç.",
  },
] as const;

export function MatchmakingHowItWorks() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });
  const pathLengthVis = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [0.12, 1]
  );

  return (
    <section
      ref={ref}
      className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-28"
    >
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          Ekip arama & ilan verme
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Nasıl Çalışır?
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--muted)] sm:text-lg">
          Matchmaking akışı: profil → vitrin → başvuru veya ilan → moderasyon sonrası görünürlük.
          Aşağıdaki yol, süreci tek bakışta özetler.
        </p>
      </div>

      <div className="relative mt-14 lg:mt-20">
        <svg
          className="pointer-events-none absolute left-[22px] top-0 hidden h-full w-32 lg:block"
          aria-hidden
        >
          <motion.path
            d="M 40 24 C 40 120, 120 180, 40 280 S 40 420, 40 520"
            fill="none"
            stroke="url(#matchGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength: pathLengthVis }}
          />
          <defs>
            <linearGradient id="matchGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(37,99,235,0.9)" />
              <stop offset="100%" stopColor="rgba(37,99,235,0.15)" />
            </linearGradient>
          </defs>
        </svg>

        <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:pl-28">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                initial={reduce ? undefined : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: reduce ? 0 : i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex gap-5 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 sm:p-8"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--hairline)] bg-[var(--background)] text-[var(--primary)]">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--muted)]">
                    Adım {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-[var(--foreground)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)] sm:text-base">
                    {s.body}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
