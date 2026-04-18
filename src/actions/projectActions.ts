"use server";

/**
 * Proje oluşturma — oturum: `requireAuthedMemberUser`.
 * Güvenlik: `src/lib/serverActionSecurity.ts`
 */
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuthedMemberUser } from "@/lib/authHelpers";
import { uiStatusToPrisma } from "@/lib/projectMappers";

const createProjectSchema = z.object({
  title: z.string().min(6).max(160),
  description: z.string().min(40).max(12000),
  requiredSkills: z
    .array(z.string().min(1).max(48))
    .min(1)
    .max(24),
  status: z.enum(["Idea", "Prototype", "Active Development"]),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export async function createProject(
  input: CreateProjectInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = createProjectSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Geçersiz veri." };
  }

  const user = await requireAuthedMemberUser();
  if (!user) {
    return { ok: false, error: "Proje oluşturmak için giriş yapmalısın." };
  }

  try {
    await prisma.project.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        requiredSkills: parsed.data.requiredSkills,
        status: uiStatusToPrisma(parsed.data.status),
        moderationStatus: "PENDING",
        externalUrls: { lookingFor: [] as string[] },
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
