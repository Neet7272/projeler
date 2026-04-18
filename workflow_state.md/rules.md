Act as a strict Lead Security Engineer and Design Director. Your task is to initialize the `rules.md` file for the "Ar-Ge İnovasyon ve Girişimcilik Kulübü" web platform project.

Do not write code. Output ONLY the complete markdown content for the `rules.md` file.

# PURPOSE OF THIS FILE:
In our autonomous AI coding workflow, `rules.md` serves as the absolute "Constitution" for the AI Agent. These rules are non-negotiable constraints regarding coding standards, UI/UX aesthetics, and system security. The AI must reference these rules constantly.

# REQUIRED STRUCTURE FOR THE FILE:

1.  **Workflow & Memory Rules:**
    - ALWAYS read `project_config.md`, `log.md`, and `plan.md` before starting a new session or executing a complex command.
    - NEVER jump to a future phase in the plan before the current one is verified and working.
    - Ask for human approval before installing any major new npm packages not listed in the config.

2.  **UI/UX & Frontend Standards (CRITICAL):**
    - **Aesthetic:** Adhere strictly to a premium, minimalist, modern design language. 
    - **Animations:** Use Framer Motion for smooth, high-end interactions (fade-ups, subtle scaling, seamless page transitions). NEVER use overly bouncy, fast, or cheap-looking animations. Less is more.
    - **Tailwind:** Use utility classes efficiently. Maintain generous white space (negative space) and clean typography.
    - **Responsiveness:** All components MUST be mobile-first and fully responsive without breaking animations.

3.  **Backend & Security Rules:**
    - **Zero Trust:** Always validate user inputs on the backend using Zod or a similar schema validator. Never trust client-side data.
    - **Auth:** Implement strict Role-Based Access Control (RBAC). Admin routes must be fully protected both on the client (middleware) and server (API routes).
    - **Database:** Optimize Prisma/Supabase queries. Avoid N+1 query problems.

4.  **Code Quality & Git:**
    - Keep components small, modular, and reusable. Use proper Next.js App Router conventions (e.g., separating Server Components from Client Components correctly).
    - Avoid leaving `console.log` in production-ready code.

Format the markdown to be punchy and highly directive. Use bold text to emphasize strict prohibitions (e.g., **NEVER**, **ALWAYS**).