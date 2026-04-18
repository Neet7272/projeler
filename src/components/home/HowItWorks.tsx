"use client";

import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    k: "01",
    title: "Profilini Oluştur",
    desc: "Yeteneklerini ve bağlantılarını ekle. Ekibin seni hızlıca anlayabilsin.",
  },
  {
    k: "02",
    title: "Takımını Bul veya Kur",
    desc: "Proje vitrini üzerinden ekiplere katıl ya da kendi projen için çağrı aç.",
  },
  {
    k: "03",
    title: "Projeni Hayata Geçir",
    desc: "Net hedefler, kısa sprint’ler ve düzenli iletişimle fikirleri ürüne dönüştür.",
  },
] as const;

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
      <div>
        <p className="text-sm font-medium text-[var(--muted)]">Akış</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Nasıl Çalışır?
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
          Minimum sürtünmeyle doğru insanları bir araya getirip projeyi hızla ilerletmek.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3">
        {steps.map((s, i) => (
          <motion.article
            key={s.k}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
            className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-[var(--muted)]">Adım</p>
              <p className="text-xs font-semibold text-[var(--foreground)]/70">{s.k}</p>
            </div>
            <p className="mt-4 text-base font-semibold text-[var(--foreground)]">{s.title}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{s.desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

