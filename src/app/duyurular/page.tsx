import type { Metadata } from "next";
import { AnnouncementsHub } from "@/components/announcements/AnnouncementsHub";
import { getAnnouncementsByCategory } from "@/lib/announcementQueries";

export const metadata: Metadata = {
  title: "Duyurular | Yarışmalar, Etkinlikler, Kulüp",
  description:
    "TEKNOFEST, TÜBİTAK ve kampüs etkinlikleri. Kent Ar-Ge İstanbul Kent Üniversitesi duyuru şeritleri.",
  openGraph: {
    title: "Duyurular | Kent Ar-Ge Kulübü",
    description:
      "Yarışmalar, etkinlikler ve kulüp duyuruları — üç şeritli premium akış.",
    type: "website",
  },
};

export default async function AnnouncementsPage() {
  const [YARISMA, ETKINLIK, KULUP] = await Promise.all([
    getAnnouncementsByCategory("YARISMA", 12),
    getAnnouncementsByCategory("ETKINLIK", 12),
    getAnnouncementsByCategory("KULUP", 12),
  ]);

  return (
    <AnnouncementsHub
      strips={{
        YARISMA,
        ETKINLIK,
        KULUP,
      }}
    />
  );
}
