## Strict AI Directives
- **NEVER** deviate from this plan without explicit permission.
- Update checkboxes from `- [ ]` to `- [x]` as items complete.
- When an entire Phase is finished and verified, mark it as **[COMPLETED]** here and move the milestone details to `workflow_state.md/archive_log.md`.

## Phase 1: Foundation & Infrastructure (Next.js + Base UI) — **[COMPLETED]**
- [x] Initialize Next.js (App Router) in repo root
  - [x] TypeScript enabled
  - [x] ESLint enabled
  - [x] `src/` directory enabled (preferred)
  - [x] App Router enabled
- [x] Setup Tailwind CSS
  - [x] `globals.css` wired
  - [x] Dark-mode strategy decided (system via `prefers-color-scheme`) and documented
- [x] Setup Framer Motion
  - [x] Base animation primitives (page fade, fade-up)
  - [x] `prefers-reduced-motion` respected
- [x] Create minimal premium shell UI
  - [x] `app/layout.tsx` baseline layout (typography, background, spacing)
  - [x] Home page placeholder with premium hero + simple CTA
- [x] Create base folder structure
  - [x] `components/` (UI building blocks)
  - [x] `lib/` (helpers: classnames, motion presets, constants)
  - [x] `types/` (shared types)
- [x] Phase 1 bookkeeping
  - [x] Update `workflow_state.md/log.md`
  - [x] Update `workflow_state.md/state.md`

## Phase 2: Unified Member Profile & Dashboard — **[COMPLETED]**
- [x] Member dashboard UI (minimalist, dark-mode first if chosen)
- [x] “Single role” logic (all users are Members; Admin is an elevated flag)
- [x] Profile edit pages (skills/tags, portfolio links)

## Phase 3: Matchmaking Engine (Team Ads) — **[COMPLETED]**
- [x] “Post a Team Ad” form (title, description, required skills tags, project status)
- [x] “Explore Ads” marketplace (filters by tags/skills)
- [x] Application flow (apply to ads)

## Phase 4: Admin Panel & Moderation
## Phase 4: Admin Panel & Moderation — **[COMPLETED]**
- [x] Secure admin routes (RBAC enforced)
- [x] Moderation queue (Team Ads default Pending; require Approval)
- [x] Announcements/Events CRUD (priority/urgency)

## Phase 5: UI/UX Polish & Performance
## Phase 5: UI/UX Polish & Performance — **[COMPLETED]**
- [x] Smooth page transitions (Framer Motion)
- [x] Scroll-triggered fade-ups (subtle)
- [x] Final mobile-first responsiveness pass
- [x] SEO metadata + performance optimization

## Phase 6: The Great Pivot (Refinement & Expansion) — **[COMPLETED]**
- [x] Clean light theme (Blue/White) + akademik terminoloji pivotu
- [x] Gerçekçi proje mock verisi + detay sayfası dış linkler
- [x] Duyurularda cover image URL (admin + public)
- [x] Mock auth redirect + profil gate
- [x] Landing: particles hero + “Nasıl Çalışır?” bölümü

## Phase 7: Real Backend Foundation & Prisma Schema
- [x] Install & initialize Prisma (`prisma`, `@prisma/client`, `prisma init`)
- [x] Design relational `schema.prisma` (User/Project/Application/Announcement + relations)
- [x] Add `src/lib/prisma.ts` (global Prisma client instantiation for Next.js)
- [ ] (Next) Create first API route handlers (read-only) without wiring UI
- [ ] (Next) Migrations + seed strategy (safe, incremental)