"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { springReveal, springTap } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast, type ToastState } from "@/components/ui/Toast";
import { EmptyState } from "@/components/ui/EmptyState";
import type { TeamAd } from "@/lib/mockAds";

function uniqTags(teamAds: TeamAd[]) {
  const s = new Set<string>();
  for (const a of teamAds) for (const t of a.tags) s.add(t);
  return Array.from(s).sort((a, b) => a.localeCompare(b));
}

export function TeamAdsMarketplace(props: { projects: TeamAd[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const teamAds = props.projects;
  const [query, setQuery] = useState("");
  const initialTag = searchParams.get("tag");
  const [tag, setTag] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>({ open: false });
  const reduceMotion = useReducedMotion();

  const allTags = useMemo(() => uniqTags(teamAds), [teamAds]);

  const selectedTag =
    tag ?? (initialTag && allTags.includes(initialTag) ? initialTag : null);

  const approvedAds = useMemo(
    () => teamAds.filter((a) => a.moderationState === "Approved"),
    [teamAds]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return teamAds.filter((a) => {
      if (a.moderationState !== "Approved") return false;
      const tagOk = selectedTag ? a.tags.includes(selectedTag) : true;
      const qOk = q
        ? a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
        : true;
      return tagOk && qOk;
    });
  }, [teamAds, query, selectedTag]);

  useEffect(() => {
    if (!toast.open) return;
    const t = setTimeout(() => setToast({ open: false }), 2200);
    return () => clearTimeout(t);
  }, [toast.open]);

  function comingSoon() {
    setToast({
      open: true,
      title: "Yakında",
      description: "Bu aksiyon yakında aktif olacak.",
    });
  }

  const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  };

  const itemVariants = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0, filter: "blur(0px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      }
    : {
        hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-28">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-slate-500">Vitrin</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Proje Vitrini
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Filtrele, keşfet, başvur. Yapısal kartlar ve net hiyerarşi ile hızlı karar.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/takim-kur" variant="primary">
            Takım kur
          </Button>
          <Button href="/" variant="secondary">
            Ana sayfa
          </Button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-[240px_1fr] lg:gap-8">
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <div className="rounded-2xl border border-slate-200/65 bg-white/85 p-5 shadow-[var(--shadow-matte)] backdrop-blur-sm">
            <p className="text-sm font-semibold tracking-tight text-slate-900">Filtre</p>

            <div className="mt-4">
              <label className="text-xs font-medium text-slate-500">
                Arama
              </label>
              <div className="mt-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Başlık, etiket..."
                />
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-medium text-slate-500">Etiket</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTag(null)}
                  className={
                    "inline-flex min-h-11 items-center rounded-full px-4 text-xs font-medium transition-all duration-200 " +
                    (selectedTag === null
                      ? "bg-slate-900 text-white shadow-[0_2px_8px_rgb(15,23,42,0.12)]"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200/90")
                  }
                >
                  Hepsi
                </button>
                {allTags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTag(t)}
                    className={
                      "inline-flex min-h-11 max-w-full items-center rounded-full px-4 text-left text-xs font-medium transition-all duration-200 " +
                      (selectedTag === t
                        ? "bg-slate-900 text-white shadow-[0_2px_8px_rgb(15,23,42,0.12)]"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200/90")
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {filtered.map((ad) => (
            <motion.article
              key={ad.id}
              role="link"
              tabIndex={0}
              aria-label={`${ad.title} — detay sayfasına git`}
              className="group relative cursor-pointer rounded-2xl border border-slate-200/65 bg-white/90 p-6 shadow-[var(--shadow-matte)] backdrop-blur-sm transition-shadow duration-300 before:pointer-events-none before:absolute before:inset-x-4 before:top-0 before:h-px before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-cyan-400/25 before:to-transparent hover:border-sky-500/28 hover:shadow-[var(--shadow-matte-hover)]"
              variants={itemVariants}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 380, damping: 28, mass: 0.9 }
              }
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -5, scale: 1.008, transition: springReveal }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : { scale: 0.994, transition: springTap }
              }
              onClick={() => router.push(`/takim-ilanlari/${ad.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/takim-ilanlari/${ad.id}`);
                }
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-lg font-semibold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-cyan-800">
                    {ad.title}
                  </p>
                  {ad.tagline ? (
                    <p className="mt-1.5 line-clamp-2 text-sm font-medium leading-snug text-cyan-900/85">
                      {ad.tagline}
                    </p>
                  ) : null}
                  <p className="mt-1 text-xs text-slate-500">
                    {ad.owner.name} • Member
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {ad.status}
                </span>
              </div>

              <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">
                {ad.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {ad.tags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTag(t);
                    }}
                    className="inline-flex min-h-11 max-w-full items-center rounded-full bg-slate-100 px-4 text-xs font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200/90 hover:text-slate-900"
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700">
                  Aranan: {ad.lookingFor.join(", ")}
                </span>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  variant="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/takim-ilanlari/${ad.id}`);
                  }}
                >
                  Detay
                </Button>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    comingSoon();
                  }}
                >
                  Kaydet
                </Button>
              </div>
            </motion.article>
          ))}

          {filtered.length === 0 ? (
            <div className="sm:col-span-2">
              {approvedAds.length === 0 ? (
                <EmptyState
                  title="Henüz onaylı ilan yok"
                  description="Projeleriniz 24 saat içinde incelenip onaylanacaktır. Onaylanan ilanlar burada listelenir."
                />
              ) : (
                <EmptyState
                  title="Sonuç bulunamadı"
                  description="Bu kriterlerle eşleşen proje ilanı yok. Filtreleri temizleyip tekrar deneyebilirsin."
                  actionLabel="Filtreleri temizle"
                  onAction={() => {
                    setQuery("");
                    setTag(null);
                  }}
                />
              )}
            </div>
          ) : null}
        </motion.div>
      </div>

      <Toast state={toast} onClose={() => setToast({ open: false })} />
    </div>
  );
}

