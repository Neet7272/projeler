## Strict AI Directives
- **ALWAYS** update this log after modifying code/config/dependencies.
- Keep this file concise and current.
- When the **Done** list grows, summarize major milestones into `workflow_state.md/archive_log.md` and prune Done here.

## Current Phase & Objective
**Phase 12: Advanced Cloud Integration & UX Overhaul**

Objective: Google OAuth + PrismaAdapter; Cloudinary yükleme (duyuru kapak + profil); Ar-Ge hero partikülleri; `/hakkimizda` yalnızca kurumsal içerik / “Nasıl çalışır?” ayrı landing bileşeni; mobil menü ve dokunma hedefleri; `.env.example`.

## Active Task Board
### To Do
- [x] Phase 7 / Step 1: `prisma` + `@prisma/client` kurulum
- [x] Phase 7 / Step 1: `npx prisma init` (schema + env)
- [x] Phase 7 / Step 2: `schema.prisma` (User/Project/Application/Announcement)
- [x] Phase 7 / Step 3: `src/lib/prisma.ts` (global Prisma client)
- [x] Phase 7 / Step 4: dokümantasyon güncellemesi (constitution/plan/log/state)
- [x] Phase 8 / Step 1: `src/actions/projectActions.ts` (`createProject`; Phase 10’da oturumlu `ownerId`)
- [x] Phase 8 / Step 1: `src/lib/projectQueries.ts` (`getProjects`, `getProjectById` — Server Component’lerde kullanım; `"use server"` dosyasında yalnızca action export)
- [x] Phase 8 / Step 2: `prisma/seed.ts` + `prisma.config.ts` seed komutu + `mockAds` → DB
- [x] Phase 8 / Step 3: `/proje-vitrini`, `/takim-ilanlari`, detay sayfası Prisma + `POST /takim-kur` formu (`createProject`, toast, redirect)
- [x] Phase 8 / Step 4: `log.md` + `state.md` güncellemesi
- [x] Phase 9 / Step 1: `createProject` → `moderationStatus: PENDING` (geçici sistem kullanıcısı; Phase 10’da kaldırıldı)
- [x] Phase 9 / Step 2: `src/actions/adminActions.ts` + `src/actions/announcementActions.ts`; okuma: `announcementQueries`, moderasyon listesi: `getModerationProjects` / `getPendingProjects`
- [x] Phase 9 / Step 3: `/admin/moderasyon`, `/admin/duyurular`, `/duyurular` + admin dashboard sayıları Prisma
- [x] Phase 9 / Step 4: `store` / `storeCore` yalnızca mock oturum + profil (proje/duyuru kaldırıldı)
- [x] Phase 9 / Step 5: `log.md` + `state.md`
- [x] Phase 10 / Step 1: `next-auth` (v5 beta) + `@auth/prisma-adapter` + Credentials + `Account` / `Session` / `VerificationToken` + `User.passwordHash`
- [x] Phase 10 / Step 2: `src/auth.ts`, `app/api/auth/[...nextauth]/route.ts`, `SessionProvider`, `middleware.ts` (JWT `getToken`), mock auth kaldırıldı
- [x] Phase 10 / Step 3: `src/actions/userActions.ts`, profil sayfası DB + `updateUserProfile`
- [x] Phase 10 / Step 4: `src/actions/applicationActions.ts`, `ApplicationModal` → `submitApplication`
- [x] Phase 10 / Step 5: `store.ts` / `storeCore.ts` silindi; `log.md` / `state.md` güncellendi; `.env` içinde `AUTH_SECRET`
- [x] Phase 11: Auth sayfası (Framer Motion Giriş/Kayıt); kayıt `registerWithCredentials`; duyuru kategorileri + hub + `/duyurular/kategori/[slug]`; admin CRUD kategori + dış başvuru alanları; parallax kapak + blog tipografisi; seed (TEKNOFEST/TÜBİTAK/Ideathon vb.) + admin çıktısı; `requireAuthedMemberUser` + başvuruda sahip kontrolü; proje detay JSON-LD; `lucide-react`; `AnnouncementsPublicClient` kaldırıldı
- [x] Phase 12: `Google` provider + `PrismaAdapter`; giriş sayfası “Google ile devam et”; `next-cloudinary` + `CloudinaryImageField` (admin duyuru kapak, profil foto); `NetworkParticles` Ar-Ge estetiği; `LandingMatchmakingFlow` + `/hakkimizda` ayrımı; `SiteHeader` mobil drawer; `.env.example`; `res.cloudinary.com` remote image

### In Progress
- (boş)

### Done
- [x] Read and normalize project constitution and workflow templates into real docs
- [x] Scaffoleded Next.js App Router in repo root (via `web/` then moved)
- [x] Installed dependencies and added `framer-motion`
- [x] Added premium minimalist base UI shell (header, hero, footer)
- [x] Added motion presets with reduced-motion fallback
- [x] Fixed build + typecheck
- [x] Added public routes: `/duyurular`, `/takim-ilanlari`
- [x] Polished UI tokens (CSS variables), active nav state, and real hero links
- [x] Phase 2 UI: protected (mock) dashboard layout + `/dashboard` + `/ayarlar/profil`
- [x] Phase 2 polish: left sidebar + mobile drawer + interactive profile UX
- [x] Added Phase 3 base routes: `/ilan-ver`, marketplace filter revamp, and “coming soon” toasts
- [x] Phase 3 final: `/takim-ilanlari/[id]` + premium application modal + success toast
- [x] Phase 4 base: protected admin area + moderation queue + announcements create flow (mock)
- [x] Phase 4 refinement: mock persistence store and full announcements CRUD
- [x] Phase 5: global route transitions via `app/template.tsx`
- [x] Phase 5: scroll-triggered reveal on landing + marketplace list
- [x] Phase 5: SEO metadata (core pages + dynamic team ad metadata)
- [x] Final polish: premium 404 + global error boundary + elegant empty states + a11y pass
- [x] Phase 6: Light theme + terminoloji pivotu + yeni mock projeler + duyuru cover image + mock auth/profile gate + particles hero + “Nasıl Çalışır?”
- [x] Phase 7: Prisma foundation + relational schema + prisma client util (UI’ye bağlamadan)
- [x] Phase 8: Core Project (vitrin + oluşturma + detay) PostgreSQL + Prisma Server Actions ile entegre; seed ile mock projeler DB’de
- [x] Phase 9: Moderasyon + duyurular tam DB; mock store’dan proje/duyuru çıkarıldı; seed’e `mockAnnouncements` eklendi
- [x] Phase 10: NextAuth + profil + başvuru; mock store tamamen kaldırıldı; seed’de `admin@kulup.local` + `dev123` hash

## Active Workspace (File Context)
- `project_config.md/Project Constitution`
- `workflow_state.md/rules.md`
- `workflow_state.md/plan.md`
- `workflow_state.md/log.md`
- `package.json`
- `postcss.config.mjs`
- `next.config.ts`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/components/home/Hero.tsx`
- `src/components/site/SiteHeader.tsx`
- `src/components/ui/Button.tsx`
- `src/lib/motion.ts`
- `src/auth.ts` + `src/app/api/auth/[...nextauth]/route.ts`
- `src/middleware.ts` (JWT koruması)
- `src/components/providers/SessionProvider.tsx`
- `src/app/(dashboard)/layout.tsx`
- `src/app/(dashboard)/dashboard/page.tsx`
- `src/app/(dashboard)/ayarlar/profil/page.tsx` + `src/components/dashboard/ProfileSettingsClient.tsx`
- `src/actions/userActions.ts` / `src/actions/applicationActions.ts`
- `src/components/dashboard/DashboardNav.tsx`
- `src/components/dashboard/StatCard.tsx`
- `src/components/dashboard/FadeUp.tsx`
- `src/components/dashboard/DashboardShell.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Toast.tsx`
- `src/app/(dashboard)/ilan-ver/page.tsx`
- `src/app/takim-ilanlari/page.tsx`
- `src/app/duyurular/page.tsx`
- `src/app/takim-ilanlari/[id]/page.tsx`
- `src/components/teamAds/AdDetailClient.tsx`
- `src/components/teamAds/ApplicationModal.tsx`
- `src/components/teamAds/TeamAdsMarketplace.tsx`
- `src/lib/mockAds.ts`
- `src/lib/useMediaQuery.ts`
- `src/app/(admin)/layout.tsx`
- `src/app/(admin)/admin/page.tsx`
- `src/app/(admin)/admin/moderasyon/page.tsx`
- `src/app/(admin)/admin/duyurular/page.tsx`
- `src/components/admin/AdminShell.tsx`
- `src/components/admin/AdminNav.tsx`
- `src/lib/mockAnnouncements.ts`
- `src/app/auth/login/page.tsx`
- `src/lib/authGate.ts`
- `src/components/home/NetworkParticles.tsx`
- `src/components/home/HowItWorks.tsx`
- `src/lib/projectMappers.ts` (Prisma ↔ UI `TeamAd`)
- `src/lib/projectQueries.ts` (server-side okuma)
- `src/actions/projectActions.ts` (`createProject` + `revalidatePath`)
- `prisma/seed.ts` (admin + bcrypt; projeler + duyurular)
- `prisma.config.ts` (Prisma 7: `migrations.seed`)
- `src/lib/authHelpers.ts` (`requireAdmin`)
- `src/lib/profile.ts` (`computeProfileComplete`)
- `src/lib/announcementMappers.ts` / `src/lib/announcementQueries.ts`
- `src/actions/adminActions.ts` / `src/actions/announcementActions.ts`
- `src/components/admin/ModerationQueueClient.tsx` / `AdminAnnouncementsClient.tsx`
- `src/components/announcements/CategoryBannerStrip.tsx` / `AnnouncementsHub.tsx` / `AnnouncementCoverParallax.tsx`
- `src/app/duyurular/kategori/[slug]/page.tsx`
- `src/app/hakkimizda/page.tsx`
- `src/components/home/LandingMatchmakingFlow.tsx`
- `src/components/media/CloudinaryImageField.tsx`
- `src/lib/cloudinary.ts`
- `.env.example`
- `src/lib/serverActionSecurity.ts`
- `src/lib/siteUrl.ts`
- `src/actions/authActions.ts`

## Current Blockers / Unresolved Issues
- None.

## Recent fix (Prisma v7)
- `schema.prisma` datasource içinde `url` kaldırıldı; bağlantı `prisma.config.ts` (CLI: `DIRECT_URL`) + runtime’da `pg` + `@prisma/adapter-pg` ile `DATABASE_URL` kullanılıyor.
- `npx prisma db push` başarıyla tamamlandı (şema DB ile senkron).
- Şema değişikliğinden sonra seed öncesi `npx prisma generate` gerekir (aksi halde client eski tiplerde kalabilir).

## Recent fix (Phase 11)
- `AnnouncementCoverParallax`: `useTransform` çıkış aralığı tek tipte (`string[]`) tutuldu; `reduce` için `["0%","0%"]` kullanıldı (TS derlemesi).

## Recent fix (Phase 12)
- Google OAuth + `PrismaAdapter`; `next-cloudinary`; `LandingMatchmakingFlow`; mobil header; `.env.example`.

## Recent fix (Auth — kritik)
- **Edge runtime**: `middleware` Edge’te çalışır; `@/auth` içindeki `bcrypt` / `prisma` paketlenince Node `crypto` hatası oluşuyordu. Çözüm: `src/auth.config.ts` (Node modülü yok) + middleware’de `NextAuth(authConfig)`; tam kimlik doğrulama `src/auth.ts` (Node).
- **Giriş UI**: `canLogin` artık `dev123` (6 karakter) gibi kısa şifrelere izin veriyor; önceden `>= 8` admini sessizce engelliyordu.
- **Middleware**: `getToken` kaldırıldı; NextAuth v5 ile aynı JWE oturumunu okumak için `auth()` sarmalayıcısı kullanılıyor (HTTPS’te `secure` çerez uyumsuzluğu riski giderildi).
- **`src/auth.ts`**: Credentials-only için `PrismaAdapter` kaldırıldı; `authorize` dönüşüne `sub`, JWT’de `token.sub`; `pages.signIn`; `session` / `jwt` güncellemesi `token.id ?? token.sub`.
- **Giriş hataları**: `signIn` yanıtında `res.ok === false` + `CredentialsSignin` için Türkçe satır içi + toast.
- **`prisma/seed.ts`**: admin/system şifreleri `await bcrypt.hash(..., 10)` (register ile aynı maliyet).