"use server";

/**
 * Kayıt akışı — bkz. `src/lib/serverActionSecurity.ts` (rate limit önerisi).
 */
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  email: z.string().trim().email("Geçerli bir e-posta gir."),
  password: z
    .string()
    .min(8, "Şifre en az 8 karakter olmalı.")
    .max(128, "Şifre çok uzun."),
  name: z.string().trim().min(2, "Ad en az 2 karakter olmalı.").max(80),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export async function registerWithCredentials(
  input: RegisterInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Geçersiz veri.",
    };
  }

  const email = parsed.data.email.toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return {
      ok: false,
      error: "Bu e-posta zaten kayıtlı. Giriş yap sekmesini kullan.",
    };
  }

  try {
    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    await prisma.user.create({
      data: {
        email,
        name: parsed.data.name,
        passwordHash,
        role: "MEMBER",
      },
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "Kayıt tamamlanamadı. Daha sonra tekrar dene." };
  }
}
