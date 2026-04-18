"use server";

/**
 * Yönetim — tüm mutasyonlar `requireAdmin`.
 * Güvenlik: `src/lib/serverActionSecurity.ts`
 */
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ModerationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { mapProjectRowToTeamAd } from "@/lib/projectMappers";
import type { TeamAd } from "@/lib/mockAds";
import { requireAdmin } from "@/lib/authHelpers";

export async function getModerationProjects(
  status: ModerationStatus
): Promise<TeamAd[]> {
  const admin = await requireAdmin();
  if (!admin) {
    return [];
  }

  const rows = await prisma.project.findMany({
    where: { moderationStatus: status },
    include: { owner: true },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(mapProjectRowToTeamAd);
}

export async function getPendingProjects(): Promise<TeamAd[]> {
  return getModerationProjects("PENDING");
}

const updateProjectStatusSchema = z.object({
  projectId: z.string().min(1),
  status: z.enum(["APPROVED", "REJECTED"]),
});

export async function updateProjectStatus(
  projectId: string,
  status: "APPROVED" | "REJECTED"
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = updateProjectStatusSchema.safeParse({ projectId, status });
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Geçersiz veri.",
    };
  }

  const admin = await requireAdmin();
  if (!admin) {
    return { ok: false, error: "Yetkisiz." };
  }

  try {
    await prisma.project.update({
      where: { id: parsed.data.projectId },
      data: { moderationStatus: parsed.data.status },
    });

    revalidatePath("/admin/moderasyon");
    revalidatePath("/proje-vitrini");
    revalidatePath("/takim-ilanlari");

    return { ok: true };
  } catch {
    return { ok: false, error: "Durum güncellenemedi." };
  }
}
