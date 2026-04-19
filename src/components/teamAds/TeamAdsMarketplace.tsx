"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
    <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:py-20">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-[var(--muted)]">Vitrin</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Proje Vitrini
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
            Filtrele, keşfet, başvur. Premium minimal kartlar; hızlı karar.
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
          <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5">
            <p className="text-sm font-semibold text-[var(--foreground)]">Filtre</p>

            <div className="mt-4">
              <label className="text-xs font-medium text-[var(--muted)]">
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
              <p className="text-xs font-medium text-[var(--muted)]">Etiket</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTag(null)}
                  className={
                    "inline-flex min-h-11 items-center rounded-full border border-[var(--hairline)] px-4 text-xs transition-colors " +
                    (selectedTag === null
                      ? "bg-[var(--surface)] text-[var(--foreground)]"
                      : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]")
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
                      "inline-flex min-h-11 max-w-full items-center rounded-full border border-[var(--hairline)] px-4 text-left text-xs transition-colors " +
                      (selectedTag === t
                        ? "bg-[var(--surface)] text-[var(--foreground)]"
                        : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]")
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
              className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6"
              variants={itemVariants}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <Link
                    href={`/takim-ilanlari/${ad.id}`}
                    className="text-lg font-semibold tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--foreground)]/90"
                  >
                    {ad.title}
                  </Link>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {ad.owner.name} • Member
                  </p>
                </div>
                <span className="rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
                  {ad.status}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {ad.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {ad.tags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTag(t)}
                    className="inline-flex min-h-11 max-w-full items-center rounded-full border border-[var(--hairline)] bg-black/0 px-4 text-xs text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
                <span className="rounded-full border border-[var(--hairline)] bg-black/0 px-3 py-1">
                  Aranan: {ad.lookingFor.join(", ")}
                </span>
              </div>

              <div className="mt-6 flex gap-3">
                <Button href={`/takim-ilanlari/${ad.id}`} variant="primary">
                  Detay
                </Button>
                <Button variant="secondary" onClick={comingSoon}>
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

