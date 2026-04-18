"use server";

/**
 * Profil — oturum: `requireAuthedMemberUser`.
 * Güvenlik: `src/lib/serverActionSecurity.ts`
 */
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuthedMemberUser } from "@/lib/authHelpers";

const optionalHttpUrl = z
  .string()
  .trim()
  .max(2048)
  .optional()
  .refine((v) => !v || v.length === 0 || /^https?:\/\//i.test(v), {
    message: "Link `http(s)://` ile başlamalı.",
  });

const updateProfileSchema = z.object({
  skills: z.array(z.string().min(1).max(64)).min(0).max(40),
  portfolio: z.object({
    github: optionalHttpUrl,
    linkedin: optionalHttpUrl,
    website: optionalHttpUrl,
    behance: optionalHttpUrl,
  }),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export async function updateUserProfile(
  input: UpdateProfileInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = updateProfileSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Geçersiz veri.",
    };
  }

  const user = await requireAuthedMemberUser();
  if (!user) {
    return { ok: false, error: "Oturum gerekli." };
  }

  const trim = (v: string | undefined) => v?.trim() || undefined;

  try {
    const current = await prisma.user.findUnique({
      where: { id: user.id },
    });
    const base =
      current?.portfolioUrls &&
      typeof current.portfolioUrls === "object" &&
      !Array.isArray(current.portfolioUrls)
        ? { ...(current.portfolioUrls as Record<string, unknown>) }
        : {};

    await prisma.user.update({
      where: { id: user.id },
      data: {
        skills: parsed.data.skills,
        portfolioUrls: {
          ...base,
          github: trim(parsed.data.portfolio.github),
          linkedin: trim(parsed.data.portfolio.linkedin),
          website: trim(parsed.data.portfolio.website),
          behance: trim(parsed.data.portfolio.behance),
        },
      },
    });

    revalidatePath("/ayarlar/profil");
    revalidatePath("/dashboard");

    return { ok: true };
  } catch {
    return { ok: false, error: "Profil kaydedilemedi." };
  }
}
