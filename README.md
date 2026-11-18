# xk-website
官方網站，獨立交給 Codex 開發。


XK Website — Task 001
Repository Inspection & Next.js Project Bootstrap
1. Project Identity

Project Name: Xplore Kaleidoscope

Website Repository: https://github.com/xk2022/xk-website.git

Documentation Repository: https://github.com/xk2022/xplore-kaleidoscope.git

Brand Abbreviation: XK

Domain: https://xplorekaleidoscope.com

Tagline: Building Digital Solutions with Web, Java & AI.

Brand Slogan: Explore Possibilities. Create Digital Value.

2. Your Role

Act as a senior Next.js engineer and software architect.

Your responsibility is to establish a clean, maintainable and production-ready foundation for the XK corporate website.

3. Repository Rules

There are two independent repositories:

xplore-kaleidoscope
Business documentation
Brand guidelines
Technical specifications
Product planning
xk-website
Actual website source code
Frontend development
Website configuration
Deployment configuration

Important:

Read documentation from xplore-kaleidoscope if available.
Only modify xk-website.
Never modify the documentation repository.
Do not assume that planned files already exist.
Preserve existing work.
Do not push directly to main.
4. Confirmed Technology Stack

Use the following technologies without substitution:

Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
Lucide React

Deployment target:

Vercel

Do not introduce:

Spring Boot
PostgreSQL
Docker Backend
Separate API Server

The first website MVP must work independently without a backend.

5. Brand Design System

Use these initial brand tokens:

Primary: #101A33

Secondary: #3157D5

Accent: #19B8D5

Background: #FFFFFF

Surface: #F5F7FB

Foreground: #172033

Muted: #667085

Border: #E4E8F0

Design direction:

Geometric Kaleidoscope
XK letter combination
Modern technology aesthetics
Geometric symmetry
Professional and international
Clean corporate design
Responsive desktop and mobile layouts

The logo is provisional. Do not claim that the final brand logo has been approved.

6. Initial Repository Inspection

Before implementing anything:

Inspect both repositories.
Read the available Week 02 documentation.
Check existing files and Git status.
Identify missing specifications.
Report conflicts before making destructive changes.

Canonical documentation path:

doc/01_business-plan/week-02/

Pay particular attention to:

website-mvp.md
website-architecture.md
website-sitemap.md
brand-identity.md
color-palette.md
typography.md
frontend-development-guide.md

If files are missing, use the project decisions in this task and clearly report the missing documentation.

7. Website Repository Structure

Establish the following structure in xk-website:

xk-website/ ├── README.md ├── AGENTS.md ├── .gitignore ├── .editorconfig ├── docs/ │ └── implementation-notes.md ├── public/ │ ├── images/ │ └── icons/ └── src/ ├── app/ │ ├── globals.css │ ├── layout.tsx │ └── page.tsx ├── components/ │ ├── layout/ │ ├── sections/ │ └── ui/ ├── config/ └── lib/

Adapt this structure to Next.js conventions where necessary.

8. Project Initialization

Initialize Next.js using:

App Router
TypeScript
Tailwind CSS
src directory
ESLint
Import alias @/*

Use stable compatible package versions.

Install:

lucide-react

Initialize shadcn/ui using its current recommended CLI.

Avoid unnecessary dependencies.

9. Development Standards

Implement:

Strict TypeScript
Reusable components
Semantic HTML
Accessible navigation
Responsive design
Consistent naming conventions
Maintainable component structure

Do not create fake functionality.

Do not include:

Fake customer testimonials
Invented portfolio projects
Unsupported company statistics
Nonfunctional contact forms
Placeholder buttons pretending to work
10. Initial Website Scope

The first milestone only requires the technical foundation.

Prepare for these future pages:

/ /about /services /services/website-development /services/java-enterprise /services/system-integration /services/ai-solutions /services/maintenance /solutions /portfolio /contact /privacy

Do not implement all pages in this task.

11. Git Workflow

Create:

feature/website-bootstrap

Do not push directly to main.

Do not merge automatically.

If supported, prepare a Pull Request for review.

12. Quality Checks

Execute:

npm install npx tsc --noEmit npm run lint npm run build

Adjust commands if the generated project uses a different package manager.

Do not claim successful checks unless they have actually completed.

13. Final Report

Provide:

Repository inspection results.
Documentation files found.
Documentation files missing.
Project structure created.
Next.js version.
React version.
TypeScript configuration.
Tailwind CSS configuration.
shadcn/ui configuration.
Dependencies installed.
TypeScript results.
ESLint results.
Production build results.
Git branch and commit status.
Remaining issues.
14. Definition of Done

The xk-website repository contains a clean Next.js foundation that:

Runs locally.
Uses the confirmed technology stack.
Is ready for XK Design System implementation.
Passes available quality checks.
Can be deployed to Vercel.

Do not begin backend development.

Do not change any confirmed business or technology decisions.


---

## Local development

Task 001 establishes the website foundation. The original project brief above is preserved. Use Node.js 24.x and npm from the repository root:

```sh
npm install
npm run dev
```

Open http://localhost:3000. No environment variables or backend services are required. The foundation intentionally sets `noindex, nofollow` until launch review. `next/font/google` downloads Inter and Noto Sans TC at build time, so builds require Google Fonts access.

```sh
npx tsc --noEmit
npm run lint
npm run build
npm run start
```

`npm run start` serves the production build after `npm run build`. `npm run typecheck` is also available as an alias for the TypeScript check.

## Vercel deployment

Import `xk2022/xk-website` into Vercel, select the Next.js framework preset, and use repository root `.` as the Root Directory. Use Node.js 24.x, `npm install` for installation, `npm run build` for the build, and the default Next.js output settings. No environment variables are required.

Keep `main` as the production branch and review `feature/website-bootstrap` through a pull request and Preview Deployment before merging. This bootstrap does not provision a Vercel project, change DNS, or deploy the domain. Configure `xplorekaleidoscope.com` and its HTTPS settings in Vercel when release work is authorized.

See [implementation notes](docs/implementation-notes.md) for repository inspection, documentation mappings, decisions, structure, validation status, and remaining work. Contributor instructions are in [AGENTS.md](AGENTS.md).
