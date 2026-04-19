"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";
import { HeroBackdrop } from "@/components/home/HeroBackdrop";
import { NetworkParticles } from "@/components/home/NetworkParticles";
import { HeroTechGraphic } from "@/components/home/HeroTechGraphic";

export function Hero() {
  const boundsRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const preset = reduceMotion
    ? {
        initial: "initial",
        animate: "enter",
        variants: { initial: { opacity: 0 }, enter: { opacity: 1 } },
      }
    : fadeUp(14);

  return (
    <section
      ref={boundsRef}
      className="relative overflow-hidden border-y border-slate-200/60 bg-[color:color-mix(in_oklab,white,transparent_6%)] px-6 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_520px_at_20%_-20%,rgba(6,182,212,0.12),transparent_55%),radial-gradient(900px_480px_at_95%_10%,rgba(14,165,233,0.1),transparent_50%),radial-gradient(700px_400px_at_50%_100%,rgba(99,102,241,0.06),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <HeroBackdrop boundsRef={boundsRef} />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 opacity-45">
        <NetworkParticles />
      </div>

      <div className="relative z-[2] mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(260px,400px)] lg:gap-16">
        <motion.div
          className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left"
          initial={preset.initial}
          animate={preset.animate}
          variants={preset.variants}
        >
          <p className="text-sm font-medium tracking-wide text-slate-500">
            Ar-Ge • İnovasyon • Girişimcilik
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.08]">
            Bağlantı kur. Takım oluştur. Projeni birlikte hayata geçir.
          </h1>
          <p className="mt-5 text-pretty text-base leading-7 text-slate-600 sm:text-lg">
            Kulüp etkinlikleri ve yarışmalar tek yerde. Proje vitrini üzerinden
            ekiplere katıl veya kendi projeni oluştur.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button href="/proje-vitrini" variant="primary">
              Proje vitrini
            </Button>
            <Button href="/takim-kur" variant="secondary">
              Takım kur
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-[min(100%,400px)] lg:mx-0 lg:max-w-none"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: reduceMotion ? 0 : 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <HeroTechGraphic className="w-full drop-shadow-[0_20px_48px_rgb(15,23,42,0.08)]" />
        </motion.div>
      </div>
    </section>
  );
}
