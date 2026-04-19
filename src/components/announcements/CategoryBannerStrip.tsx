"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useMemo, useRef, type CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import type { Announcement } from "@/lib/mockAnnouncements";
import { CATEGORY_STRIP_META } from "@/lib/announcementCategories";
import type { AnnouncementCategory } from "@prisma/client";

type Props = {
  category: AnnouncementCategory;
  items: Announcement[];
};

const cardClass =
  "shrink-0 w-[min(88vw,340px)] overflow-hidden rounded-2xl border border-slate-200/65 bg-white/90 shadow-[var(--shadow-matte)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/30 hover:shadow-[var(--shadow-matte-hover)]";

function AnnouncementStripCard({ a }: { a: Announcement }) {
  return (
    <article className={cardClass}>
      <Link href={`/duyurular/${a.id}`} className="block">
        {a.coverImageUrl ? (
          <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
            <Image
              src={a.coverImageUrl}
              alt=""
              fill
              className="object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
              sizes="340px"
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-gradient-to-br from-slate-100 to-slate-200/80" />
        )}
        <div className="p-5">
          <p className="text-xs text-slate-500">{a.createdAt}</p>
          <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug tracking-tight text-slate-900">
            {a.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {a.content}
          </p>
        </div>
      </Link>
    </article>
  );
}

export function CategoryBannerStrip({ category, items }: Props) {
  const reduce = useReducedMotion();
  const meta = CATEGORY_STRIP_META[category];
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -24]);

  const loopItems = useMemo(
    () => (items.length ? [...items, ...items] : []),
    [items],
  );

  const marqueeDurationSec = useMemo(
    () => Math.min(88, Math.max(22, items.length * 12)),
    [items.length],
  );

  return (
    <motion.section
      ref={sectionRef}
      initial={reduce ? undefined : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden border-y border-slate-200/50 bg-[color:color-mix(in_oklab,white,#f1f5f9_18%)] py-24 sm:py-28"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[120%] w-[70%] rotate-[-8deg] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.45),transparent_65%)]" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {meta.title}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {meta.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              {meta.subtitle}
            </p>
          </div>
          <Button
            href={`/duyurular/kategori/${meta.slug}`}
            variant="secondary"
            className="shrink-0"
          >
            Daha Fazlasını Gör
          </Button>
        </div>

        <div className="mt-10 overflow-x-hidden sm:mt-12">
          {items.length === 0 ? (
            <p className="text-sm text-slate-600">
              Bu kategoride henüz duyuru yok.
            </p>
          ) : reduce ? (
            <div className="flex flex-wrap gap-4 sm:gap-5">
              {items.map((a) => (
                <AnnouncementStripCard key={a.id} a={a} />
              ))}
            </div>
          ) : (
            <div className="marquee-strip cursor-default">
              <div
                className="announcement-marquee-track gap-4 sm:gap-5"
                style={
                  {
                    "--marquee-duration": `${marqueeDurationSec}s`,
                  } as CSSProperties
                }
              >
                {loopItems.map((a, i) => (
                  <AnnouncementStripCard key={`${a.id}-${i}`} a={a} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
