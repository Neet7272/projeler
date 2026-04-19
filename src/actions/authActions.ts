"use server";

/**
 * Kayıt — Phase 13: üretim güvenliği için e-posta/şifre kaydı kapatıldı.
 * Geçmiş import uyumluluğu için action korunur; her zaman reddeder.
 */
import { z } from "zod";

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
  _input: RegisterInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  void _input;
  return {
    ok: false,
    error:
      "E-posta ile kayıt devre dışı. Güvenlik için yalnızca Google ile giriş kullanılabilir.",
  };
}
