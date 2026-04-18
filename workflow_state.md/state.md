Act as a Lead QA Engineer and Technical Architect. Your task is to initialize the `state.md` file for the "Ar-Ge İnovasyon ve Girişimcilik Kulübü" web platform project.

Do not write code. Output ONLY the complete markdown content for the `state.md` file.

# PURPOSE OF THIS FILE:
In our autonomous AI coding workflow, `state.md` is the living technical dashboard of the application. It strictly tracks the CURRENT operational status of features, integrations, and known bugs. The AI Agent MUST update this file whenever a feature goes from 'Not Started' to 'Working', or if something breaks.

# REQUIRED STRUCTURE FOR THE FILE:

1.  **AI Directives (Top of file):**
    - Update this file immediately after compiling, testing, or deploying.
    - Be brutally honest about what is broken or incomplete.
    - Differentiate between "Mocked UI" (looks good but no backend) and "Fully Integrated" (connected to DB).

2.  **Infrastructure & Environment Status:**
    Create a quick-glance list for core systems:
    - **Database Connection:** [Pending / Connected / Error]
    - **Authentication:** [Pending / Configured / Working]
    - **Environment Variables:** [Missing / Set locally]

3.  **Core Features Status Tracker:**
    Create a highly readable list or markdown table tracking the exact state of the project's main modules:
    * *Example Modules to track:*
        - Next.js Routing & Layout Setup
        - Tailwind & Dark Mode Theme
        - Framer Motion Base Animations
        - Single Member Dashboard UI
        - Team Ad Matchmaking Form
        - Admin Moderation Queue
    * *Status options to use:* 🔴 Not Started | 🟡 UI Mocked/In Progress | 🟢 Fully Working | 🐛 Buggy

4.  **Known Bugs & Technical Debt:**
    A dedicated section to log things that are currently broken or need refactoring later. (e.g., "The fade-up animation on mobile is causing horizontal scroll - needs fixing in Phase 5").

5.  **Key Active Dependencies:**
    List the primary versions of the stack we are locked into so the AI doesn't accidentally downgrade/upgrade them and break the app (e.g., Next.js v14+, Tailwind v3+, Framer Motion).

Format the file strictly and clearly. Make it easy for an AI to parse the state of the app at a single glance.