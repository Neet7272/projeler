## AI Directives
- Update this file immediately after compiling, testing, dependency changes, or breaking changes.
- Be brutally honest: what is **Mocked UI** vs **Fully Integrated**.
- Use statuses: Not Started | UI Mocked/In Progress | Fully Working | Buggy

## Infrastructure & Environment Status
- **Next.js App Router**: Fully Working
- **Database Connection**: Fully Working (Prisma + PostgreSQL)
- **Authentication**: Fully Working (NextAuth.js v5 + Credentials + Prisma Adapter; JWT oturum)
- **Environment Variables**: Fully Working (`DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`)

## Core Features Status Tracker
- **Routing & Layout baseline**: Fully Working
- **Tailwind setup + theme**: Fully Working
- **Framer Motion base primitives**: Fully Working
- **Public pages (Home, Announcements, Team Ads)**: Fully Working
- **Member dashboard UI**: Fully Working (oturum zorunlu)
- **Team Ad create/explore (Core Project)**: Fully Working (sahip oturumdaki kullanıcı; vitrin `APPROVED`)
- **Admin moderation queue**: Fully Working (sunucu aksiyonlarında `ADMIN` kontrolü; layout’ta DB RBAC)

## Phase 4 (Admin) Status
- **Admin area routing & layout**: Fully Working (`prisma.user.role === ADMIN`)
- **Moderation queue**: Fully Working
- **Announcements CRUD**: Fully Working (yalnızca admin)

## Phase 5 (Polish) Status
- **Global page transitions**: Fully Working
- **Scroll-reveal motion**: Fully Working
- **SEO metadata (static + dynamic)**: Fully Working
- **Mobile overflow & tap targets**: Fully Working
- **Error handling & empty states**: Fully Working

## Mock Data Persistence
- **Mock store**: Kaldırıldı (`store.ts` / `storeCore.ts` yok). Oturum NextAuth; profil `User` tablosu.

## Phase 6 (Pivot) Status
- **Light theme + terminology pivot**: Fully Working
- **Realistic project mock data + external links**: Fully Working (seed kaynağı `mockAds`)
- **Announcements cover image URL (admin + public)**: Fully Working
- **Auth redirect + profile gate**: Fully Working (NextAuth + `profileComplete` JWT)
- **Particles hero background**: Fully Working
- **Landing “Nasıl Çalışır?” section**: Fully Working

## Phase 8 (Integration) Status
- **Server Actions + Prisma okuma**: Fully Working
- **Seed**: Fully Working (admin + şifre hash; duyuru yazarı admin)
- **Proje vitrin + oluşturma formu**: Fully Working

## Phase 9 (Admin & tam DB) Status
- **Strict moderasyon**: Fully Working
- **Admin + duyuru**: Fully Working

## Phase 10 (Auth, profil, başvuru) Status
- **NextAuth + Credentials**: Fully Working
- **Kayıt**: Fully Working (`registerWithCredentials` server action; `authorize` yalnızca mevcut kullanıcı)
- **Korumalı rotalar + middleware (JWT)**: Fully Working
- **Profil (`userActions` + DB)**: Fully Working
- **Başvuru (`applicationActions` + `Application` tablosu)**: Fully Working
- **Mock store / mockAuth kaldırıldı**: Fully Working

## Phase 11 (Refinement) Status
- **Duyuru kategorileri + hub şeritleri + kategori rotaları**: Fully Working
- **Duyuru detay (kapak, tipografi, dış başvuru, Article JSON-LD)**: Fully Working
- **Auth UI (Giriş/Kayıt toggle)**: Fully Working
- **`/hakkimizda` + matchmaking “Nasıl çalışır?”**: Fully Working
- **Seed (gerçekçi TR içerik; admin çıktısı)**: Fully Working
- **Server actions**: Oturum + DB kullanıcı doğrulaması (`requireAuthedMemberUser` / `requireAdmin`); ek Zod sınırları; başvuruda proje sahibi engeli
- **Proje detay SEO**: `CreativeWork` JSON-LD + genişletilmiş `generateMetadata`

## Known Bugs & Technical Debt
- Credentials prototipi: üretimde OAuth/sağlayıcı ve e-posta doğrulama düşünülmeli.
- JWT’de rol güncellemesi oturum yenilenene kadar eski kalabilir; admin layout her istekte DB’den doğrular.

## Key Active Dependencies (locked-in)
- **next**: 16.2.4
- **react**: 19.2.4
- **next-auth**: 5.x (beta)
- **@auth/prisma-adapter**: (installed)
- **bcryptjs**: (installed)
- **tailwindcss**: 4.2.2
- **framer-motion**: 12.38.0
- **lucide-react**: (installed)
- **react-tsparticles**: (installed)
- **tsparticles**: (installed)
- **tsparticles-slim**: (installed)
- **prisma**: 7.7.0
- **@prisma/client**: 7.7.0
- **@prisma/adapter-pg**: (installed)
- **pg**: (installed)
