import type { AnnouncementCategory } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  mapAnnouncementRowToUi,
  type AnnouncementRow,
} from "@/lib/announcementMappers";
import type { Announcement } from "@/lib/mockAnnouncements";

export async function getAnnouncements(): Promise<Announcement[]> {
  const rows = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });
  return rows.map(mapAnnouncementRowToUi);
}

export async function getAnnouncementsByCategory(
  category: AnnouncementCategory,
  take = 16
): Promise<Announcement[]> {
  const rows = await prisma.announcement.findMany({
    where: { category },
    orderBy: { createdAt: "desc" },
    take,
  });
  return rows.map(mapAnnouncementRowToUi);
}

export async function getAnnouncementById(
  id: string
): Promise<Announcement | null> {
  const row = await prisma.announcement.findUnique({ where: { id } });
  return row ? mapAnnouncementRowToUi(row as AnnouncementRow) : null;
}
