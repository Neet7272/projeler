"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { TeamAd } from "@/lib/mockAds";
import { Button } from "@/components/ui/Button";
import { Toast, type ToastState } from "@/components/ui/Toast";
import { ApplicationModal } from "@/components/teamAds/ApplicationModal";
import { useAuthGate } from "@/lib/authGate";

export function AdDetailClient(props: { ad: TeamAd }) {
  const pathname = usePathname();
  const gate = useAuthGate(pathname || `/takim-ilanlari/${props.ad.id}`);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({ open: false });

  useEffect(() => {
    if (!toast.open) return;
    const t = setTimeout(() => setToast({ open: false }), 2400);
    return () => clearTimeout(t);
  }, [toast.open]);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:py-20">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-[var(--muted)]">
            Proje • {props.ad.status} • {props.ad.moderationState}
          </p>
          <h1 className="mt-2 max-w-3xl text-balance text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
            {props.ad.title}
          </h1>
          <p className="mt-3 max-w-3xl whitespace-pre-wrap text-base leading-7 text-[var(--muted)]">
            {props.ad.description}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            variant="primary"
            onClick={() => {
              if (!gate.requireMemberAndProfile()) return;
              setOpen(true);
            }}
          >
            Ekibe Katıl
          </Button>
          <Button href="/proje-vitrini" variant="secondary">
            Geri
          </Button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 lg:mt-12 lg:grid-cols-[1fr_340px] lg:gap-8">
        <section className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
          <p className="text-sm font-semibold text-[var(--foreground)]">
            Etiketler
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {props.ad.tags.map((t) => (
              <Link
                key={t}
                href={`/takim-ilanlari?tag=${encodeURIComponent(t)}`}
                className="rounded-full border border-[var(--hairline)] bg-black/0 px-3 py-1 text-xs text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
              >
                {t}
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Aranan Roller
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {props.ad.lookingFor.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--hairline)] bg-black/0 px-3 py-1 text-xs text-[var(--muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {props.ad.links ? (
            <div className="mt-8">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Dış Bağlantılar
              </p>
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {props.ad.links.figma ? (
                  <a
                    href={props.ad.links.figma}
                    className="block rounded-xl border border-[var(--hairline)] bg-black/0 px-4 py-3 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Figma
                  </a>
                ) : null}
                {props.ad.links.notion ? (
                  <a
                    href={props.ad.links.notion}
                    className="block rounded-xl border border-[var(--hairline)] bg-black/0 px-4 py-3 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Notion
                  </a>
                ) : null}
                {props.ad.links.competition ? (
                  <a
                    href={props.ad.links.competition}
                    className="block rounded-xl border border-[var(--hairline)] bg-black/0 px-4 py-3 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Resmî link
                  </a>
                ) : null}
                {props.ad.links.repository ? (
                  <a
                    href={props.ad.links.repository}
                    className="block rounded-xl border border-[var(--hairline)] bg-black/0 px-4 py-3 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Repo
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </section>

        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
            <p className="text-xs font-medium text-[var(--muted)]">Proje sahibi</p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-[var(--foreground)]">
              {props.ad.owner.name}
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {props.ad.owner.headline}
            </p>

            <div className="mt-5 space-y-2 text-sm text-[var(--muted)]">
              {props.ad.owner.department ? (
                <p>{props.ad.owner.department}</p>
              ) : null}
              {props.ad.owner.year ? <p>{props.ad.owner.year}</p> : null}
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium text-[var(--muted)]">
                Öne çıkan yetenekler
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {props.ad.owner.skills.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--hairline)] bg-black/0 px-3 py-1 text-xs text-[var(--muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              {props.ad.owner.portfolio?.github ? (
                <a
                  href={props.ad.owner.portfolio.github}
                  className="block rounded-xl border border-[var(--hairline)] bg-black/0 px-4 py-3 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              ) : null}
              {props.ad.owner.portfolio?.linkedin ? (
                <a
                  href={props.ad.owner.portfolio.linkedin}
                  className="block rounded-xl border border-[var(--hairline)] bg-black/0 px-4 py-3 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              ) : null}
              {props.ad.owner.portfolio?.website ? (
                <a
                  href={props.ad.owner.portfolio.website}
                  className="block rounded-xl border border-[var(--hairline)] bg-black/0 px-4 py-3 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  Website
                </a>
              ) : null}
            </div>
          </div>
        </aside>
      </div>

      <ApplicationModal
        key={open ? "open" : "closed"}
        open={open}
        onClose={() => setOpen(false)}
        adTitle={props.ad.title}
        projectId={props.ad.id}
        onSuccess={() =>
          setToast({
            open: true,
            title: "Başvuru Gönderildi",
            description: "Başvurun projeye kaydedildi.",
          })
        }
      />

      <Toast state={toast} onClose={() => setToast({ open: false })} />
    </div>
  );
}

