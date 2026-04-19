"use server";

/**
 * Proje oluşturma — oturum: `requireAuthedMemberUser`.
 * Güvenlik: `src/lib/serverActionSecurity.ts`, hız sınırı: `src/lib/rateLimit.ts`
 */
import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAuthedMemberUser } from "@/lib/authHelpers";
import { uiStatusToPrisma } from "@/lib/projectMappers";
import { allowRateLimit } from "@/lib/rateLimit";
import {
  createProjectSchema,
  buildProjectExternalUrls,
  type CreateProjectInput,
} from "@/lib/projectCreateSchema";

export type { CreateProjectInput } from "@/lib/projectCreateSchema";

export async function createProject(
  input: CreateProjectInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = createProjectSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Geçersiz veri.",
    };
  }

  const user = await requireAuthedMemberUser();
  if (!user) {
    return { ok: false, error: "Proje oluşturmak için giriş yapmalısın." };
  }

  if (!allowRateLimit(`createProject:${user.id}`, 10, 60 * 60 * 1000)) {
    return {
      ok: false,
      error:
        "Çok sık proje oluşturma isteği gönderildi. Lütfen bir süre sonra tekrar dene.",
    };
  }

  try {
    await prisma.project.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        requiredSkills: parsed.data.requiredSkills,
        status: uiStatusToPrisma(parsed.data.status),
        moderationStatus: "PENDING",
        externalUrls: buildProjectExternalUrls(
          parsed.data,
        ) as Prisma.InputJsonValue,
        ownerId: user.id,
      },
    });

    revalidatePath("/admin/moderasyon");
    revalidatePath("/proje-vitrini");
    revalidatePath("/takim-ilanlari");
    revalidatePath("/takim-kur");

    return { ok: true };
  } catch {
    return { ok: false, error: "Proje kaydedilemedi. Daha sonra tekrar dene." };
  }
}
