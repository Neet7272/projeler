import { CategoryBannerStrip } from "@/components/announcements/CategoryBannerStrip";
import { Button } from "@/components/ui/Button";
import type { Announcement } from "@/lib/mockAnnouncements";

type Strips = {
  YARISMA: Announcement[];
  ETKINLIK: Announcement[];
  KULUP: Announcement[];
};

export function AnnouncementsHub({ strips }: { strips: Strips }) {
  return (
    <div className="pb-8">
      <div className="mx-auto w-full max-w-6xl px-6 pt-14 sm:pt-20">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Duyurular
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Yarışma, etkinlik ve kulüp akışı
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
              Üç ana şerit: resmi yarışmalar, kampüs dışı etkinlikler ve Kent Ar-Ge
              kulüp programı. Her şeritte en güncel çağrılar.
            </p>
          </div>
          <Button href="/" variant="secondary">
            Ana sayfa
          </Button>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-0 sm:mt-14">
        <CategoryBannerStrip category="YARISMA" items={strips.YARISMA} />
        <CategoryBannerStrip category="ETKINLIK" items={strips.ETKINLIK} />
        <CategoryBannerStrip category="KULUP" items={strips.KULUP} />
      </div>
    </div>
  );
}
