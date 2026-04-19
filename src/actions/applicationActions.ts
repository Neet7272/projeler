"use server";

/**
 * Başvuru — oturum: `requireAuthedMemberUser`.
 * Güvenlik: `src/lib/serverActionSecurity.ts`
 */
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAuthedMemberUser } from "@/lib/authHelpers";
import { allowRateLimit } from "@/lib/rateLimit";

const submitSchema = z.object({
  projectId: z.string().min(1).max(128),
  coverLetter: z.string().min(30).max(8000),
  portfolioLink: z
    .string()
    .trim()
    .max(2048)
    .optional()
    .refine((v) => !v || v.length === 0 || /^https?:\/\//i.test(v), {
      message: "Link `http(s)://` ile başlamalı.",
    }),
});

export async function submitApplication(
  input: z.infer<typeof submitSchema>
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = submitSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Geçersiz veri.",
    };
  }

  const user = await requireAuthedMemberUser();
  if (!user) {
    return { ok: false, error: "Başvuru için giriş yapmalısın." };
  }

  if (!allowRateLimit(`submitApplication:${user.id}`, 40, 60 * 60 * 1000)) {
    return {
      ok: false,
      error:
        "Çok sık başvuru gönderildi. Lütfen bir süre sonra tekrar dene.",
    };
  }

  const link = parsed.data.portfolioLink?.trim();
  const portfolioLink = link && link.length > 0 ? link : null;

  try {
    const project = await prisma.project.findUnique({
      where: { id: parsed.data.projectId },
      select: { ownerId: true },
    });
    if (!project) {
      return { ok: false, error: "Proje bulunamadı." };
    }
    if (project.ownerId === user.id) {
      return { ok: false, error: "Kendi projenize başvuru gönderemezsiniz." };
    }

    await prisma.application.create({
      data: {
        projectId: parsed.data.projectId,
        applicantId: user.id,
        coverLetter: parsed.data.coverLetter,
        portfolioLink,
      },
    });

    revalidatePath(`/takim-ilanlari/${parsed.data.projectId}`);

    return { ok: true };
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return {
        ok: false,
        error: "Bu projeye zaten başvurdun.",
      };
    }
    return { ok: false, error: "Başvuru kaydedilemedi." };
  }
}
