"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import type { Announcement } from "@/lib/mockAnnouncements";
import { CATEGORY_STRIP_META } from "@/lib/announcementCategories";
import type { AnnouncementCategory } from "@prisma/client";

type Props = {
  category: AnnouncementCategory;
  items: Announcement[];
};

export function CategoryBannerStrip({ category, items }: Props) {
  const reduce = useReducedMotion();
  const meta = CATEGORY_STRIP_META[category];
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -24]);

  return (
    <motion.section
      ref={sectionRef}
      initial={reduce ? undefined : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden border-y border-[var(--hairline)] bg-[color:color-mix(in_oklab,var(--surface),#000_12%)] py-12 sm:py-16"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[120%] w-[70%] rotate-[-8deg] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.5),transparent_65%)]" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              {meta.title}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
              {meta.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)] sm:text-base">
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

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-10 sm:gap-5 [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
          {items.length === 0 ? (
            <p className="snap-start text-sm text-[var(--muted)]">
              Bu kategoride henüz duyuru yok.
            </p>
          ) : (
            items.map((a, i) => (
              <motion.article
                key={a.id}
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: reduce ? 0 : i * 0.06,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="snap-start shrink-0 w-[min(88vw,340px)] overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--background)] shadow-lg"
              >
                <Link href={`/duyurular/${a.id}`} className="block">
                  {a.coverImageUrl ? (
                    <div className="relative h-44 w-full">
                      <Image
                        src={a.coverImageUrl}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                        sizes="340px"
                      />
                    </div>
                  ) : (
                    <div className="h-24 bg-[color:color-mix(in_oklab,var(--surface),transparent_40%)]" />
                  )}
                  <div className="p-5">
                    <p className="text-xs text-[var(--muted)]">{a.createdAt}</p>
                    <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug text-[var(--foreground)]">
                      {a.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">
                      {a.content}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </motion.section>
  );
}
