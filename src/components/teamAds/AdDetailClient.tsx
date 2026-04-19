"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { TeamAd } from "@/lib/mockAds";
import { Button } from "@/components/ui/Button";
import { Toast, type ToastState } from "@/components/ui/Toast";
import { ApplicationModal } from "@/components/teamAds/ApplicationModal";
import { useAuthGate } from "@/lib/authGate";
import { cn } from "@/lib/cn";
import { cardMatte } from "@/lib/uiClasses";
import { springReveal } from "@/lib/motion";

const linkTileClass =
  "block rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-[0_2px_12px_rgb(15,23,42,0.03)] transition-all duration-200 hover:border-sky-500/25 hover:text-slate-900";

const tagPillClass =
  "inline-flex min-h-9 items-center rounded-full bg-slate-100 px-3 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-200/90";

const extRel = "noopener noreferrer" as const;

export function AdDetailClient(props: { ad: TeamAd }) {
  const pathname = usePathname();
  const gate = useAuthGate(pathname || `/takim-ilanlari/${props.ad.id}`);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({ open: false });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!toast.open) return;
    const t = setTimeout(() => setToast({ open: false }), 2400);
    return () => clearTimeout(t);
  }, [toast.open]);

  const hasExtended =
    Boolean(props.ad.tagline) ||
    Boolean(props.ad.deliverables) ||
    Boolean(props.ad.timeCommitment) ||
    Boolean(props.ad.collaborationNotes);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : springReveal}
        className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
      >
        <div>
          <p className="text-sm font-medium text-slate-500">
            Proje • {props.ad.status} • {props.ad.moderationState}
          </p>
          <h1 className="mt-2 max-w-3xl text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {props.ad.title}
          </h1>
          {props.ad.tagline ? (
            <p className="mt-3 max-w-3xl text-pretty text-lg font-medium leading-relaxed text-cyan-900/90">
              {props.ad.tagline}
            </p>
          ) : null}
          <p className="mt-3 max-w-3xl whitespace-pre-wrap text-base leading-7 text-slate-600">
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
            Vitrine dön
          </Button>
        </div>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-16 lg:grid-cols-[1fr_340px] lg:gap-8">
        <div className="space-y-5">
          {hasExtended ? (
            <motion.section
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={reduce ? { duration: 0 } : { ...springReveal, delay: 0.04 }}
              className={cn("p-6 sm:p-7", cardMatte)}
            >
              <p className="text-sm font-semibold tracking-tight text-slate-900">
                Plan ve çalışma
              </p>
              <dl className="mt-5 space-y-5 text-sm">
                {props.ad.timeCommitment ? (
                  <div>
                    <dt className="font-medium text-slate-500">Zaman</dt>
                    <dd className="mt-1 leading-7 text-slate-700">
                      {props.ad.timeCommitment}
                    </dd>
                  </div>
                ) : null}
                {props.ad.deliverables ? (
                  <div>
                    <dt className="font-medium text-slate-500">Teslimatlar / kapsam</dt>
                    <dd className="mt-1 whitespace-pre-wrap leading-7 text-slate-700">
                      {props.ad.deliverables}
                    </dd>
                  </div>
                ) : null}
                {props.ad.collaborationNotes ? (
                  <div>
                    <dt className="font-medium text-slate-500">Çalışma biçimi</dt>
                    <dd className="mt-1 whitespace-pre-wrap leading-7 text-slate-700">
                      {props.ad.collaborationNotes}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </motion.section>
          ) : null}

          <motion.section
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={reduce ? { duration: 0 } : { ...springReveal, delay: 0.08 }}
            className={cn("p-6 sm:p-7", cardMatte)}
          >
            <p className="text-sm font-semibold tracking-tight text-slate-900">
              Etiketler
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {props.ad.tags.map((t) => (
                <Link
                  key={t}
                  href={`/proje-vitrini?tag=${encodeURIComponent(t)}`}
                  className={tagPillClass}
                >
                  {t}
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold tracking-tight text-slate-900">
                Aranan roller
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {props.ad.lookingFor.length ? (
                  props.ad.lookingFor.map((t) => (
                    <span key={t} className={tagPillClass}>
                      {t}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    İlan sahibi rol listesi eklemedi; vitrin açıklamasına bak.
                  </p>
                )}
              </div>
            </div>

            {props.ad.links ? (
              <div className="mt-8">
                <p className="text-sm font-semibold tracking-tight text-slate-900">
                  Dış bağlantılar
                </p>
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {props.ad.links.figma ? (
                    <a
                      href={props.ad.links.figma}
                      className={linkTileClass}
                      target="_blank"
                      rel={extRel}
                    >
                      Figma
                    </a>
                  ) : null}
                  {props.ad.links.notion ? (
                    <a
                      href={props.ad.links.notion}
                      className={linkTileClass}
                      target="_blank"
                      rel={extRel}
                    >
                      Notion
                    </a>
                  ) : null}
                  {props.ad.links.competition ? (
                    <a
                      href={props.ad.links.competition}
                      className={linkTileClass}
                      target="_blank"
                      rel={extRel}
                    >
                      Resmî link
                    </a>
                  ) : null}
                  {props.ad.links.repository ? (
                    <a
                      href={props.ad.links.repository}
                      className={linkTileClass}
                      target="_blank"
                      rel={extRel}
                    >
                      Repo
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </motion.section>
        </div>

        <motion.aside
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={reduce ? { duration: 0 } : { ...springReveal, delay: 0.1 }}
          className="lg:sticky lg:top-20 lg:h-fit"
        >
          <div className={cn("p-6 sm:p-7", cardMatte)}>
            <p className="text-xs font-medium text-slate-500">Proje sahibi</p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
              {props.ad.owner.name}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {props.ad.owner.headline}
            </p>

            <div className="mt-5 space-y-2 text-sm text-slate-600">
              {props.ad.owner.department ? (
                <p>{props.ad.owner.department}</p>
              ) : null}
              {props.ad.owner.year ? <p>{props.ad.owner.year}</p> : null}
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium text-slate-500">
                Öne çıkan yetenekler
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {props.ad.owner.skills.map((t) => (
                  <span key={t} className={tagPillClass}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              {props.ad.owner.portfolio?.github ? (
                <a
                  href={props.ad.owner.portfolio.github}
                  className={linkTileClass}
                  target="_blank"
                  rel={extRel}
                >
                  GitHub
                </a>
              ) : null}
              {props.ad.owner.portfolio?.linkedin ? (
                <a
                  href={props.ad.owner.portfolio.linkedin}
                  className={linkTileClass}
                  target="_blank"
                  rel={extRel}
                >
                  LinkedIn
                </a>
              ) : null}
              {props.ad.owner.portfolio?.website ? (
                <a
                  href={props.ad.owner.portfolio.website}
                  className={linkTileClass}
                  target="_blank"
                  rel={extRel}
                >
                  Website
                </a>
              ) : null}
            </div>
          </div>
        </motion.aside>
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
