"use server";

/**
 * Admin duyuru CRUD — oturum + rol: `requireAdmin`.
 * Güvenlik notları: `src/lib/serverActionSecurity.ts`
 */
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  uiPriorityToPrisma,
  uiCategoryLabelToPrisma,
  type AnnouncementCategoryUiLabel,
} from "@/lib/announcementMappers";
import { requireAdmin } from "@/lib/authHelpers";
import { CATEGORY_ENUM_TO_SLUG } from "@/lib/announcementCategories";

function revalidateAnnouncementSurfaces(id?: string) {
  revalidatePath("/duyurular");
  for (const slug of Object.values(CATEGORY_ENUM_TO_SLUG)) {
    revalidatePath(`/duyurular/kategori/${slug}`);
  }
  if (id) {
    revalidatePath(`/duyurular/${id}`);
  }
  revalidatePath("/admin/duyurular");
}

const announcementWriteSchema = z.object({
  title: z.string().min(6).max(200),
  content: z.string().min(20).max(20000),
  coverImageUrl: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || v.length === 0 || /^https?:\/\//i.test(v), {
      message: "Cover Image URL `http(s)://` ile başlamalı.",
    }),
  priority: z.enum(["High", "Normal", "Low"]),
  category: z.enum(["Yarışmalar", "Etkinlikler", "Kulüp etkinlikleri"]),
  externalApplyUrl: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || v.length === 0 || /^https?:\/\//i.test(v), {
      message: "Başvuru URL’si `http(s)://` ile başlamalı.",
    }),
  externalApplyLabel: z.string().trim().max(80).optional(),
});

export type AnnouncementWriteInput = z.infer<typeof announcementWriteSchema>;

export async function createAnnouncement(
  input: AnnouncementWriteInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = announcementWriteSchema.safeParse(input);
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
    const cover = parsed.data.coverImageUrl?.trim();
    const extUrl = parsed.data.externalApplyUrl?.trim();
    const extLabel = parsed.data.externalApplyLabel?.trim();

    const created = await prisma.announcement.create({
      data: {
        title: parsed.data.title,
        content: parsed.data.content,
        coverImageUrl: cover && cover.length > 0 ? cover : null,
        priority: uiPriorityToPrisma(parsed.data.priority),
        category: uiCategoryLabelToPrisma(
          parsed.data.category as AnnouncementCategoryUiLabel
        ),
        externalApplyUrl: extUrl && extUrl.length > 0 ? extUrl : null,
        externalApplyLabel: extLabel && extLabel.length > 0 ? extLabel : null,
        authorId: admin.id,
      },
    });

    revalidateAnnouncementSurfaces(created.id);

    return { ok: true };
  } catch {
    return { ok: false, error: "Duyuru oluşturulamadı." };
  }
}

const idSchema = z.string().min(1);

export async function updateAnnouncement(
  id: string,
  input: AnnouncementWriteInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  const idParsed = idSchema.safeParse(id);
  if (!idParsed.success) {
    return { ok: false, error: "Geçersiz kimlik." };
  }

  const parsed = announcementWriteSchema.safeParse(input);
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

  const cover = parsed.data.coverImageUrl?.trim();
  const extUrl = parsed.data.externalApplyUrl?.trim();
  const extLabel = parsed.data.externalApplyLabel?.trim();

  try {
    await prisma.announcement.update({
      where: { id: idParsed.data },
      data: {
        title: parsed.data.title,
        content: parsed.data.content,
        coverImageUrl: cover && cover.length > 0 ? cover : null,
        priority: uiPriorityToPrisma(parsed.data.priority),
        category: uiCategoryLabelToPrisma(
          parsed.data.category as AnnouncementCategoryUiLabel
        ),
        externalApplyUrl: extUrl && extUrl.length > 0 ? extUrl : null,
        externalApplyLabel: extLabel && extLabel.length > 0 ? extLabel : null,
      },
    });

    revalidateAnnouncementSurfaces(idParsed.data);

    return { ok: true };
  } catch {
    return { ok: false, error: "Duyuru güncellenemedi." };
  }
}

const deleteSchema = z.object({ id: z.string().min(1) });

export async function deleteAnnouncement(
  id: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = deleteSchema.safeParse({ id });
  if (!parsed.success) {
    return { ok: false, error: "Geçersiz kimlik." };
  }

  const admin = await requireAdmin();
  if (!admin) {
    return { ok: false, error: "Yetkisiz." };
  }

  try {
    await prisma.announcement.delete({
      where: { id: parsed.data.id },
    });

    revalidateAnnouncementSurfaces();

    return { ok: true };
  } catch {
    return { ok: false, error: "Duyuru silinemedi." };
  }
}
