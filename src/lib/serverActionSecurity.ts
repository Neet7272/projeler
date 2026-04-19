/**
 * Sunucu aksiyonları güvenlik notları (Phase 11)
 *
 * - Oturum: Kritik tüm aksiyonlarda `auth()` veya `getSessionUser()` / `requireAdmin()`.
 * - Rol: Admin işlemleri yalnızca `requireAdmin()` ile (DB’de `User.role === ADMIN`).
 * - Girdi: Tüm dış veri `zod` ile doğrulanır; string uzunluk ve URL formatı kısıtlanır.
 *
 * Oran sınırlama (rate limiting):
 * - Üretimde öneri: Vercel KV, Upstash Redis, Cloudflare Workers + sliding window.
 * - Uygulama: `createProject` (10/saat/kullanıcı), `submitApplication` (40/saat/kullanıcı) — `src/lib/rateLimit.ts` (process başına bellek; serverless’te yumuşak sınır).
 */

export {};
