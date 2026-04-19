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
    <div className="pb-16">
      <div className="mx-auto w-full max-w-6xl px-6 pb-6 pt-24 sm:pt-28 sm:pb-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Duyurular
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl sm:leading-tight">
              Yarışma, etkinlik ve kulüp akışı
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Üç ana şerit: resmi yarışmalar, kampüs dışı etkinlikler ve Kent Ar-Ge
              kulüp programı. Her şeritte en güncel çağrılar.
            </p>
          </div>
          <Button href="/" variant="secondary">
            Ana sayfa
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-0">
        <CategoryBannerStrip category="YARISMA" items={strips.YARISMA} />
        <CategoryBannerStrip category="ETKINLIK" items={strips.ETKINLIK} />
        <CategoryBannerStrip category="KULUP" items={strips.KULUP} />
      </div>
    </div>
  );
}
