Act as a Technical Lead and Senior Project Manager. Your task is to initialize the `plan.md` file for the "Ar-Ge İnovasyon ve Girişimcilik Kulübü" web platform project.

Do not write code. Output ONLY the complete markdown content for the `plan.md` file.

# PURPOSE OF THIS FILE:
In our autonomous AI coding workflow, `plan.md` is the Master Roadmap. The AI Agent MUST strictly follow the phases outlined here in chronological order. The AI is forbidden from jumping to a later phase if the current phase's core requirements are not fully tested and functioning.

# REQUIRED STRUCTURE FOR THE FILE:

1.  **Strict AI Directives:**
    Write a brief instruction block stating:
    - Never deviate from this plan without explicit user permission.
    - Check off `[ ]` to `[x]` as sub-tasks are completed.
    - Move completed Phases to `archive_log.md` when fully finished, but keep the Phase title here marked as `[COMPLETED]`.

2.  **Phase 1: Foundation & Infrastructure (Next.js + DB):**
    - Initialize Next.js App Router, Tailwind, and Framer Motion.
    - Setup Database ORM (Prisma or Supabase).
    - Create the core Database Schema (User/Member, Announcement, Team_Ad, Application).
    - Setup Authentication (NextAuth or Supabase Auth).

3.  **Phase 2: Unified Member Profile & Dashboard:**
    - Build the Member Dashboard UI (Dark-mode first, minimalist).
    - Implement the "Single Role" logic (All users are Members).
    - Create Profile Edit pages (Support for adding skills/tags like [Unity], [React], and external Portfolio links).

4.  **Phase 3: The Matchmaking Engine (Team Ads):**
    - Create the "Post a Team Ad" form (Requires title, description, required skills tags, project status).
    - Create the "Explore Ads" marketplace (Filtering by tags/skills).
    - Implement the Application flow (Members applying to open ads).

5.  **Phase 4: Admin Panel & Moderation Strictness:**
    - Create the secure Admin Route.
    - Build the Moderation Queue (Team Ads must be set to 'Pending' by default and require Admin 'Approval' to be visible in the marketplace).
    - Build CRUD operations for Club Announcements/Events (with priority/urgency levels).

6.  **Phase 5: High-End UI/UX Polish & Animations:**
    - Implement smooth page transitions (Framer Motion).
    - Add scroll-triggered fade-ups and premium minimalist interactions.
    - Final Mobile-first responsiveness pass.
    - SEO metadata generation and performance optimization.

Format this file using standard markdown checkboxes (`- [ ]`). Keep it highly structured so the AI can easily parse what needs to be done next.