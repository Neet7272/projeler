import { prisma } from "@/lib/prisma";
import { mapProjectRowToTeamAd, type ProjectWithOwner } from "@/lib/projectMappers";
import type { TeamAd } from "@/lib/mockAds";

export async function getProjects(): Promise<TeamAd[]> {
  const rows: ProjectWithOwner[] = await prisma.project.findMany({
    where: { moderationStatus: "APPROVED" },
    include: { owner: true },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(mapProjectRowToTeamAd);
}

export async function getProjectById(id: string): Promise<TeamAd | null> {
  const row = await prisma.project.findUnique({
    where: { id },
    include: { owner: true },
  });
  return row ? mapProjectRowToTeamAd(row) : null;
}

/** Detay sayfası: SEO / JSON-LD için oluşturulma tarihi. */
export async function getProjectDetailForPage(id: string): Promise<{
  ad: TeamAd;
  createdAtIso: string;
} | null> {
  const row = await prisma.project.findUnique({
    where: { id },
    include: { owner: true },
  });
  if (!row) return null;
  return {
    ad: mapProjectRowToTeamAd(row),
    createdAtIso: row.createdAt.toISOString(),
  };
}
