<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


## XK repository rules

- This repository contains only the Xplore Kaleidoscope website. Read business specifications from `xk2022/xplore-kaleidoscope`, especially `doc/01_business-plan/week-02/`, without modifying that repository.
- Use the task specifications in `docs/task/task001.md` and `docs/task/task002.md`, together with current user instructions, to resolve conflicts with older planning documents. Keep the independent website repository root and the confirmed task palette. Record material discrepancies in `docs/implementation-notes.md` and the relevant task implementation document.
- Keep Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, and Lucide React. The deployment target is Vercel. Keep the website independently runnable without a backend. Do not introduce Spring Boot, databases, Docker, or a separate API server.
- Preserve existing work. Work on the feature branch specified by each task, never push directly to `main`, and do not merge automatically. Task 001 uses `feature/website-bootstrap`; Task 002 uses `feature/website-brand-design-system`. Create the task pull request for review.
- Use strict TypeScript and the `@/*` alias for `src/*`. Prefer Server Components; add Client Components only when interaction needs them. Use semantic HTML, accessible navigation, visible focus, and responsive mobile-first layouts.
- Use kebab-case filenames and PascalCase exported React components. Put route entry points and metadata in `src/app`, shared layout in `src/components/layout`, homepage sections in `src/components/sections`, shadcn components in `src/components/ui`, configuration in `src/config`, and utilities in `src/lib`.
- Centralize design tokens in `src/app/globals.css`. Preserve shadcn semantic token integration. The initial website uses a light theme; dark mode is deferred. Use Lucide for interface icons.
- Keep future routes as unpublished configuration until their pages exist. Do not add dead navigation links or unpublished URLs to a sitemap.
- Do not invent testimonials, portfolio projects, statistics, customer claims, product availability, or company details. Do not publish nonfunctional forms or buttons. The logo is provisional until an approved asset is supplied. A suggested contact address does not establish a working inbox.
- Do not add dependencies or elaborate abstractions without a current need. Keep package-lock.json committed and compatible with package.json. Never commit secrets, local environment files, dependencies, or build output.
- Run `npm install`, `npx tsc --noEmit`, `npm run lint`, and `npm run build` for this milestone. Report only completed results. Add tests when they verify meaningful behavior; this foundation does not require an extensive test framework.
- Read the installed Next.js version's documentation before changing version-sensitive behavior. Its generated rules block above is maintained by Next.js and must be preserved.
