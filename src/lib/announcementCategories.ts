import type { AnnouncementCategory } from "@prisma/client";

export const CATEGORY_SLUG_TO_ENUM: Record<string, AnnouncementCategory> = {
  yarismalar: "YARISMA",
  etkinlikler: "ETKINLIK",
  "kulup-etkinlikleri": "KULUP",
};

export const CATEGORY_ENUM_TO_SLUG: Record<AnnouncementCategory, string> = {
  YARISMA: "yarismalar",
  ETKINLIK: "etkinlikler",
  KULUP: "kulup-etkinlikleri",
};

export const CATEGORY_STRIP_META: Record<
  AnnouncementCategory,
  { title: string; subtitle: string; slug: string }
> = {
  YARISMA: {
    title: "Yarışmalar",
    subtitle: "Teknoloji ve inovasyon yarışmaları, resmi çağrılar ve başvuru tarihleri.",
    slug: "yarismalar",
  },
  ETKINLIK: {
    title: "Etkinlikler",
    subtitle: "Hackathon, workshop ve kampüs dışı buluşmalar.",
    slug: "etkinlikler",
  },
  KULUP: {
    title: "Kulüp Etkinlikleri",
    subtitle: "Kent Ar-Ge topluluğunun iç etkinlikleri ve duyuruları.",
    slug: "kulup-etkinlikleri",
  },
};

export function parseCategorySlug(
  slug: string
): AnnouncementCategory | null {
  return CATEGORY_SLUG_TO_ENUM[slug] ?? null;
}
