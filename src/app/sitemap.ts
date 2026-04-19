import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { CATEGORY_ENUM_TO_SLUG } from "@/lib/announcementCategories";
import type { AnnouncementCategory } from "@prisma/client";
import { getSiteUrl } from "@/lib/siteUrl";

const STATIC: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/duyurular", changeFrequency: "daily", priority: 0.95 },
  { path: "/proje-vitrini", changeFrequency: "daily", priority: 0.9 },
  { path: "/hakkimizda", changeFrequency: "monthly", priority: 0.75 },
  { path: "/kvkk", changeFrequency: "yearly", priority: 0.35 },
  { path: "/sozlesme", changeFrequency: "yearly", priority: 0.35 },
];

function entry(
  path: string,
  lastModified: Date,
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap[0] {
  return {
    url: `${getSiteUrl()}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const baseStatic: MetadataRoute.Sitemap = STATIC.map((s) =>
    entry(s.path, now, s.changeFrequency, s.priority),
  );

  const categories = (
    Object.keys(CATEGORY_ENUM_TO_SLUG) as AnnouncementCategory[]
  ).map((cat) =>
    entry(
      `/duyurular/kategori/${CATEGORY_ENUM_TO_SLUG[cat]}`,
      now,
      "weekly",
      0.82,
    ),
  );

  try {
    const [announcements, projects] = await Promise.all([
      prisma.announcement.findMany({
        select: { id: true, createdAt: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.project.findMany({
        where: { moderationStatus: "APPROVED" },
        select: { id: true, createdAt: true },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const annUrls: MetadataRoute.Sitemap = announcements.map((a) =>
      entry(`/duyurular/${a.id}`, a.createdAt, "weekly", 0.78),
    );
    const projectUrls: MetadataRoute.Sitemap = projects.map((p) =>
      entry(`/takim-ilanlari/${p.id}`, p.createdAt, "weekly", 0.72),
    );

    return [...baseStatic, ...categories, ...annUrls, ...projectUrls];
  } catch {
    return [...baseStatic, ...categories];
  }
}
