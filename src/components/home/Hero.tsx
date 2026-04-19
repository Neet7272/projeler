"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";
import { HeroBackdrop } from "@/components/home/HeroBackdrop";
import { NetworkParticles } from "@/components/home/NetworkParticles";

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
      className="relative overflow-hidden rounded-none border-y border-[var(--hairline)] bg-[var(--background)] px-6 py-16 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_480px_at_45%_-10%,rgba(6,182,212,0.1),transparent_55%),radial-gradient(700px_360px_at_80%_20%,rgba(37,99,235,0.06),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <HeroBackdrop boundsRef={boundsRef} />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 opacity-55">
        <NetworkParticles />
      </div>
      <div className="relative z-[2]">
        <motion.div
          initial={preset.initial}
          animate={preset.animate}
          variants={preset.variants}
        >
          <p className="text-sm font-medium text-[var(--muted)]">
            Ar-Ge • İnovasyon • Girişimcilik
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
            Bağlantı kur. Takım oluştur. Projeni birlikte hayata geçir.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg">
            Kulüp etkinlikleri ve yarışmalar tek yerde. Proje vitrini üzerinden
            ekiplere katıl veya kendi projeni oluştur.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/proje-vitrini" variant="primary">
            Proje vitrini
          </Button>
          <Button href="/takim-kur" variant="secondary">
            Takım kur
          </Button>
        </div>
      </div>
    </section>
  );
}

