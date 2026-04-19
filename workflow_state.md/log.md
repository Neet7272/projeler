## Strict AI Directives
- **ALWAYS** update this log after modifying code/config/dependencies.
- Keep this file concise and current.
- When the **Done** list grows, summarize major milestones into `workflow_state.md/archive_log.md` and prune Done here.

## Current Phase & Objective
**Phase 22: Global sayfa süpürme (template tek kaynak)**

Objective: SVG `d` morph iptal edildi (CPU lag). `PageWipe` artık **Ultra-Fast GPU Crescent**: tek `motion.svg` (150vh), statik matematiksel path (üstte convex kubbe + altta concave scoop), renk `text-cyan-500` (`#06b6d4`), yalnızca `y` transform animasyonu (0.5s, `times: [0,0.4,0.5,1]`, `ease: [0.76,0,0.24,1]`) + yalnızca `app/template.tsx`; `pointer-events-none`, `z-[99999]`; `log` güncel.

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
- [x] Phase 13: `LandingMatchmakingFlow` tek grid; `HeroBackdrop`; `globals.css` palet; Credentials kaldırıldı; `authRole` + `ADMIN_EMAILS`; `AuthPageClient` yalnız Google + onay kutusu; `SiteFooter` + `/kvkk` + `/sozlesme`; moderasyon 24 saat metni; `TeamAdsMarketplace` / `PostTeamAdForm`; `HowItWorks` silindi
- [x] Phase 14: `SiteFooter` yeniden tasarım (3 kolon, WhatsApp + Instagram, yüksek kalite SVG ikonlar); yasal linkler footer’dan çıkarıldı; hover cyan + translate; `layout.tsx` zaten `SiteFooter` içeriyor
- [x] Phase 15: `layout.tsx` Inter + Plus Jakarta Sans; `globals.css` token + h1–h6; `Hero` + `HeroTechGraphic`; `Button` / `Input` / `EmptyState`; `CategoryBannerStrip` / `AnnouncementsHub` / kategori sayfası; `LandingMatchmakingFlow` / `LandingSections`; `TeamAdsMarketplace`; `SiteHeader` border; mat gölge değişkenleri
- [x] Phase 15b: `uiClasses.ts` (`cardMatte`); dashboard (`DashboardShell`, `StatCard`, `DashboardNav`, `dashboard/page`, `ProfileSettingsClient`); admin (`AdminShell`, `AdminNav`, `admin/page`, `ModerationQueueClient`, `AdminAnnouncementsClient`) — vitrin ile aynı mat kart / slate tipografi
- [x] Phase 15c: `AdDetailClient`, `ApplicationModal`, `PostTeamAdForm` + `ilan-ver/page` sarmalayıcı; takım detayı / başvuru / takım kur formu mat yüzey + slate
- [x] Phase 16: `CategoryBannerStrip` sonsuz marquee + hover pause; `globals.css` `@keyframes announcement-marquee`; `template.tsx` cyan wipe + sayfa `AnimatePresence` (`useLayoutEffect` ile wipe tetikleme)
- [x] Phase 17: `src/lib/seo.ts`; `app/robots.ts`, `sitemap.ts`, `manifest.ts`; kök `layout` metadata + viewport + JSON-LD; korumalı `noindex` layout’lar; sayfa canonical/OG; `SiteHeader`/`SiteFooter` safe-area; `globals` text-size-adjust + `touch-action`; `next.config` sıkıştırma + `X-Powered-By` kapatma
- [x] Phase 18: `opengraph-image.tsx` / `twitter-image.tsx`; `seo.ts` (`breadcrumbListNode`, `schemaDocument`, SearchAction, `NEXT_PUBLIC_SAME_AS_LINKS`); duyuru/kategori/takım detay JSON-LD; `createdAtIso` + mapper; `motion.ts` spring preset’leri; `LandingSections` / `LandingMatchmakingFlow` / `TeamAdsMarketplace` + `Button` + `Hero` + `globals` animasyonlar
- [x] Phase 19: `TeamAd` genişletilmiş alanlar + `projectMappers`; `projectCreateSchema.ts`; `projectActions` + `applicationActions` rate limit; `next.config` güvenlik header’ları; `PostTeamAdForm` (roller, detay, linkler); `AdDetailClient` / `TeamAdsMarketplace` / takım `opengraph-image`; `rateLimit.ts`; seed `externalUrls`
- [x] Phase 20: `ExternalLinks` + `projectCreateSchema` / `buildProjectExternalUrls` / `parseExternalUrls` / `mapProjectRowToTeamAd` — `portfolioUrl`, `projectUrl`; `PostTeamAdForm` isteğe bağlı iki URL; `AdDetailClient` “Proje Hakkında” kartı, sağ “Bağlantılar” kartı (lucide), etiket kartından dış link kaldırma, grid `gap-8`
- [x] Phase 21: `AdminAnnouncementsClient` modal `max-h-[85vh]` / `85dvh` + gövde `overflow-y-auto`; `TeamAdsMarketplace` kart `onClick` + klavye, iç `stopPropagation`; `LandingSections` “Yönetim Paneli”; `SiteHeader` fixed + scroll yönü ile gizle/göster + yer tutucu; header gizlenince mobil menü kapanır
- [x] Phase 22: `src/components/transitions/PageWipe.tsx` (portal + slate tam ekran, alttan → duraklama → yukarı çıkış); `app/template.tsx` yalnızca `PageWipe` + çocuklar; eski cyan wipe + içerik `AnimatePresence`/`usePathname` wipeKey kaldırıldı

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
- `src/app/layout.tsx` (Phase 17: metadata + viewport + JSON-LD)
- `src/lib/seo.ts` / `src/app/robots.ts` / `src/app/sitemap.ts` / `src/app/manifest.ts` / `opengraph-image.tsx` / `twitter-image.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/components/home/Hero.tsx`
- `src/components/home/HeroTechGraphic.tsx`
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
- `src/components/site/SiteFooter.tsx`
- `src/app/kvkk/page.tsx` / `src/app/sozlesme/page.tsx`
- `src/lib/authRole.ts`
- `src/components/home/HeroBackdrop.tsx`
- `src/lib/uiClasses.ts` (`cardMatte`, `cardMatteInteractive`)
- `src/lib/projectMappers.ts` (Prisma ↔ UI `TeamAd`)
- `src/lib/projectQueries.ts` (server-side okuma)
- `src/actions/projectActions.ts` (`createProject` + `revalidatePath`) / `src/lib/projectCreateSchema.ts` / `src/lib/rateLimit.ts`
- `prisma/seed.ts` (admin + bcrypt; projeler + duyurular)
- `prisma.config.ts` (Prisma 7: `migrations.seed`)
- `src/lib/authHelpers.ts` (`requireAdmin`)
- `src/lib/profile.ts` (`computeProfileComplete`)
- `src/lib/announcementMappers.ts` / `src/lib/announcementQueries.ts`
- `src/actions/adminActions.ts` / `src/actions/announcementActions.ts`
- `src/components/admin/ModerationQueueClient.tsx` / `AdminAnnouncementsClient.tsx`
- `src/components/announcements/CategoryBannerStrip.tsx` (Phase 16 marquee) / `AnnouncementsHub.tsx` / `AnnouncementCoverParallax.tsx`
- `src/app/template.tsx` (Phase 16 wipe + geçiş)
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

## Recent fix (Phase 19)
- Vitrin: isteğe bağlı özet satırı, teslimat/zaman/çalışma metni ve http(s) doğrulanmış Figma/Notion/repo/yarışma linkleri JSON’da; kartta `tagline` + `line-clamp` açıklama.
- Güvenlik: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`; üretimde `Strict-Transport-Security`; proje ve başvuru için bellek içi hız sınırı.
- Motion: ilan detayında spring reveal + `whileInView` bölümler.

## Recent fix (Phase 18)
- Dinamik OG (1200×630) + Twitter görseli; Article/CreativeWork + hiyerarşik breadcrumb `@graph`; vitrin `SearchAction` şablonu `?tag={search_term_string}`.
- Motion: `springReveal` / `springTap`; kartlarda spring enter + hover/tap; birincil butonda `btn-shine`; hero’da `hero-chrome` ambient (reduced-motion’da kapalı).
- Sayfa bazlı OG/Twitter: `duyurular/[id]/opengraph-image` (Prisma; kapak varsa metadata görseli öncelikli), `takim-ilanlari/[id]`, `duyurular/kategori/[slug]` (Edge); `src/lib/og/truncateText.ts`.

## Recent fix (Phase 17)
- SEO: dinamik sitemap (duyuru + onaylı proje + kategori URL’leri); robots’ta üye alanı / API / auth engeli; `NEXT_PUBLIC_OG_IMAGE` + `NEXT_PUBLIC_TWITTER_SITE` desteği.
- Mobil: `viewportFit: cover`, üst/alt `env(safe-area-inset-*)`, drawer `overscroll-y-contain` + `touch-pan-y`, `min-h-0` ile kaydırılabilir panel.

## Recent fix (Phase 16)
- Duyuru şeritleri: yatay `overflow-x-hidden` sarmalayıcı; track’te `[...items, ...items]` + `-50%` keyframes ile kesintisiz döngü; `.marquee-strip:hover` ile `animation-play-state: paused`.
- Global geçiş: `bg-cyan-600` `fixed` panel `y: 100% → -100%`; ilk rota wipe yok (`prevPath` ref); `useReducedMotion` iken wipe + içerik fade zinciri kapatıldı.

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