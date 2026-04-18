/**
 * Sunucu aksiyonları güvenlik notları (Phase 11)
 *
 * - Oturum: Kritik tüm aksiyonlarda `auth()` veya `getSessionUser()` / `requireAdmin()`.
 * - Rol: Admin işlemleri yalnızca `requireAdmin()` ile (DB’de `User.role === ADMIN`).
 * - Girdi: Tüm dış veri `zod` ile doğrulanır; string uzunluk ve URL formatı kısıtlanır.
 *
 * Oran sınırlama (rate limiting):
 * - Üretimde öneri: Vercel KV, Upstash Redis, Cloudflare Workers + sliding window.
 * - Hassas uçlar: `registerWithCredentials`, `signIn` (NextAuth), başvuru ve proje oluşturma.
 * - Şu an uygulama katmanında sabit pencere yok; edge/API route veya middleware ile eklenebilir.
 */

export {};
