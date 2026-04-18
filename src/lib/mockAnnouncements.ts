import type { AnnouncementCategory } from "@prisma/client";

export type AnnouncementPriority = "High" | "Normal" | "Low";

export type Announcement = {
  id: string;
  title: string;
  content: string;
  coverImageUrl?: string;
  priority: AnnouncementPriority;
  category: AnnouncementCategory;
  externalApplyUrl?: string;
  externalApplyLabel?: string;
  createdAt: string;
};

/** Eski seed referansı — gerçek veri veritabanından gelir. */
export const mockAnnouncements: Announcement[] = [];
