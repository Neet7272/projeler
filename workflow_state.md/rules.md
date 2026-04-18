## Workflow & Memory Rules (Non‑Negotiable)
- **ALWAYS** read `project_config.md/Project Constitution`, `workflow_state.md/log.md`, `workflow_state.md/plan.md`, and `workflow_state.md/state.md` before starting work in a new session.
- **ALWAYS** keep `workflow_state.md/log.md` and `workflow_state.md/state.md` updated after meaningful changes (code, config, deps, scripts).
- **NEVER** jump ahead to a later Phase. If Phase \(N\) is not working, do not start Phase \(N+1\).
- **ALWAYS** ask for approval before running commands that:
  - install new dependencies
  - create or modify many files (project scaffolding, migrations)
  - alter security/auth/db choices

## UI/UX & Frontend Standards (CRITICAL)
- **Aesthetic**: premium, minimalist, modern. Strong hierarchy, generous whitespace, strict spacing scale.
- **Tailwind discipline**:
  - Prefer composable utility patterns; avoid chaotic class soups.
  - Keep consistent tokens (spacing, colors, radius).
- **Motion (Framer Motion)**:
  - **ONLY** subtle transitions: fade, small translate, slight scale.
  - **NEVER** use bouncy/springy “playful” motion for core UI.
  - Respect `prefers-reduced-motion` for accessibility.
- **Responsiveness**: mobile-first; no broken layouts at common breakpoints.
- **Typography**: clean and readable; avoid novelty fonts.

## Backend & Security Rules
- **Zero Trust**: Validate all inputs server-side with **Zod**.
- **RBAC**: Admin-only routes protected in **middleware** and enforced server-side (never rely on client checks).
- **Secrets**: **NEVER** commit secrets. Use `.env.local`.
- **Error hygiene**: Do not leak stack traces or internals in production responses.

## Code Quality & Git Rules
- **Next.js conventions**: Keep Server vs Client Components correct; minimize `use client`.
- **Small modules**: Prefer small, composable components and utilities.
- **No debug noise**: **NEVER** leave `console.log` in production paths.
- **Dependencies**: Minimize. Add only when justified and approved.