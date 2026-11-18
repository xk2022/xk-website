# Task 001 implementation notes

## Repository inspection

Inspection date: 2026-11-18.

- Website: `https://github.com/xk2022/xk-website.git`, default branch `main`, initial commit `f2b0f6682c517ad83a24b33d158100442c1f657a`.
- The website contained only `README.md`, which records the Task 001 brief. Its initial checkout was clean. All original README bytes are preserved as a prefix; setup guidance is appended.
- Work is isolated on `feature/website-bootstrap`. No direct push to `main` or automatic merge is permitted.
- Documentation: `https://github.com/xk2022/xplore-kaleidoscope.git`, read remotely at `8a0e2a2c4586f4896ab01605504f881f6d54a202`. No local documentation checkout was created. The documentation repository was not modified.
- Repository trees were inspected rather than assuming the planning documents' proposed directories already existed. No approved logo, favicon, or Open Graph image assets were present in the inspected documentation tree.

## Week 02 documentation

Canonical directory: `doc/01_business-plan/week-02/`.

All ten files present in that directory were read. The requested subjects exist under numbered bilingual filenames rather than the exact short filenames in the brief.

| Requested subject | File found |
| --- | --- |
| `brand-identity.md` | `01_brand-identity_品牌視覺識別規範.md` |
| Logo guidelines | `02_logo-guidelines_XK Logo 設計與使用規範.md` |
| `color-palette.md` | `03_color-palette_品牌色彩系統規範.md` |
| `typography.md` | `04_typography_品牌字體與排版規範.md` |
| `website-sitemap.md` | `05_website-sitemap_ 官方網站資訊架構與網站地圖.md` |
| Homepage copywriting | `06_homepage-copywriting_官方網站首頁文案規劃.md` |
| Domain and hosting | `07_domain-hosting_網域、DNS、主機與部署架構規劃.md` |
| `website-architecture.md` | `08_website-architecture_官方網站 Next.js 技術架構設計.md` |
| `website-mvp.md` | `09_website-mvp_官方網站 MVP 開發規格.md` |
| Week overview | `README.md` |

Missing specifications:

- `frontend-development-guide.md` is absent and is proposed as a future document in the architecture and MVP specifications.
- `deployment-guide.md` and `website-launch-checklist.md` are also proposed follow-ups and are absent.
- Approved logo assets and brand approval evidence are absent. Any initial text identity or geometric treatment is provisional.
- `contact@xplorekaleidoscope.com` appears as a suggested/example address. Mailbox provisioning and delivery were not verified; it is not treated as a working contact channel.
- Final legal content, approved portfolio material, and any future contact delivery mechanism remain future work.

## Conflicts and controlling decisions

The current Task 001 instructions and the website's original README take precedence over older planning documents. These discrepancies were identified before implementation; no destructive changes were needed.

| Older planning guidance | Task 001 decision |
| --- | --- |
| Website inside `xplore-kaleidoscope/frontend/website/` | Independent `xk-website` repository with the Next.js project at its root |
| Vercel Root Directory `frontend/website` | Vercel Root Directory `.` |
| Spring Boot API, databases, Docker, VPS, and API environment variables | Website operates independently without a backend or required environment variables |
| Midnight/navy/electric-blue/violet/cyan palette, including `#101828`, `#172554`, and `#2563EB` | Use the eight initial task tokens below |
| Sitemap/copywriting's longer service URLs and `/privacy-policy` | Use the task's shorter canonical routes recorded below |
| Complete commercial MVP, forms, projects, analytics, and final logo | Technical foundation only; no fake functionality or unsupported claims |

Initial brand tokens:

| Token | Value |
| --- | --- |
| Primary | `#101A33` |
| Secondary | `#3157D5` |
| Accent | `#19B8D5` |
| Background | `#FFFFFF` |
| Surface | `#F5F7FB` |
| Foreground | `#172033` |
| Muted text | `#667085` |
| Border | `#E4E8F0` |

Design direction remains geometric kaleidoscope and XK letter forms, symmetry, modern technology aesthetics, professional corporate presentation, and responsive layouts. The logo has not received final approval.

## Foundation and configuration

- Initialized using `create-next-app@16.4.6`: Next.js `16.4.6`, App Router, `src` directory, TypeScript, ESLint, Tailwind CSS, and the `@/*` alias.
- React and React DOM: `19.3.1`.
- Node.js engine: `24.x`, matching the intended Vercel runtime.
- TypeScript: `5.9.3` (generator-supported `^5`), `strict: true`, `noEmit: true`, `allowJs: false`, `noUncheckedIndexedAccess: true`, consistent filename casing, bundler module resolution, Next.js plugin, React JSX transform, and `@/*` mapped to `./src/*`. TypeScript 7 is not used because the installed TypeScript ESLint parser supports versions below 6.1.
- Tailwind CSS: `4.3.3`, using CSS-first tokens in `src/app/globals.css`. The generator supplies matching `@tailwindcss/turbopack` integration through `next.config.ts`; there is no legacy Tailwind config or separate PostCSS pipeline. Optional cache-components/partial-prefetch flags were removed to keep the foundation simple. Brand `--muted` remains the approved text gray; shadcn `bg-muted` maps to the surface token for accessible text/background pairing. A separate functional error token supports the generated destructive button variant.
- shadcn/ui initialization: `npx shadcn@4.23.0 init --base radix --preset nova --yes --no-monorepo`, using the current Nova/Radix style, CSS variables, Lucide icon library, `src/components/ui`, and `src/lib/utils.ts`. The current CLI no longer uses the older `new-york` initialization choice. `components.json` records `style: "radix-nova"`, `rsc: true`, `tsx: true`, `cssVariables: true`, `baseColor: "neutral"`, CSS at `src/app/globals.css`, `iconLibrary: "lucide"`, and `@/` component/utility aliases. `shadcn add button --yes` generated `src/components/ui/button.tsx`; its real anchor CTA exercises the component. Only this currently needed UI component was added.
- ESLint: `9.39.5`, with flat configuration and matching Next.js Core Web Vitals and TypeScript presets. `npm run lint` rejects warnings. The registry marks ESLint 9 as deprecated/end-of-support. ESLint 10 was checked, but the latest React, JSX accessibility, and import plugins installed by `eslint-config-next@16.4.6` declare peers only through ESLint 9. The generator-compatible version is retained without forcing incompatible peers; upgrade when those upstream plugins support ESLint 10.
- Primary language: Traditional Chinese (`zh-TW`), preserving the approved English slogan and technical tagline.
- Only the homepage is implemented in this milestone. Shared layout and section components, responsive header/footer, semantic landmarks, a keyboard skip link, and centralized site/route configuration provide the expansion points.
- Inter and Noto Sans TC use `next/font/google` with `display: swap` and local system fallbacks. Google font assets are fetched at build time and self-hosted by Next.js; browsers do not contact Google. Noto Sans TC is not preloaded to avoid preloading unneeded CJK subsets. Builds need access to Google Fonts.
- Root metadata includes the canonical domain, title template and description; homepage metadata supplies its own canonical URL and Open Graph fields. `noindex, nofollow` intentionally protects this construction-stage content. Review indexing and add the real published-page sitemap/robots policy at launch. No placeholder favicon or Open Graph image is shipped.
- No dark-mode feature, contact form, API server, database, analytics, or invented commercial content is included.

The initial structure follows Next.js conventions:

```text
xk-website/
├── README.md
├── AGENTS.md
├── .gitignore
├── .editorconfig
├── .nvmrc
├── docs/
│   └── implementation-notes.md
├── public/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   ├── config/
│   └── lib/
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

`next-env.d.ts` is generated by Next.js and ignored by Git. Empty public asset directories use tracked marker files until assets are supplied. Installed Next.js guidance remains in the generated block in `AGENTS.md`.

## Installed direct dependencies

Runtime dependencies (versions resolved in `package-lock.json`):

| Package | Version | Purpose |
| --- | --- | --- |
| `next` | `16.4.6` | App Router framework |
| `react`, `react-dom` | `19.3.1` | UI rendering |
| `lucide-react` | `1.74.0` | Interface icons |
| `radix-ui` | `1.8.1` | Generated shadcn button composition |
| `class-variance-authority` | `0.7.1` | Button variants |
| `cn` | `0.5.2` | Current shadcn class-name utility |

Development dependencies: `typescript@5.9.3`, `@types/node@24.19.2`, `@types/react@19.3.0`, `@types/react-dom@19.3.0`, `eslint@9.39.5`, `eslint-config-next@16.4.6`, `tailwindcss@4.3.3`, `@tailwindcss/turbopack@4.3.3`, `shadcn@4.23.0`, and `tw-animate-css@1.4.0`. The CLI and its CSS imports are build tooling. No additional state, form, API, or test framework dependencies were added to the website.

## Future routes

These paths are prepared in configuration, with unpublished destinations inactive until real pages exist. Only implemented routes should appear in active navigation or a future sitemap.

```text
/
/about
/services
/services/website-development
/services/java-enterprise
/services/system-integration
/services/ai-solutions
/services/maintenance
/solutions
/portfolio
/contact
/privacy
```

The older sitemap's `/services/java-enterprise-solutions`, `/services/system-architecture-integration`, `/services/ai-business-solutions`, and `/privacy-policy` do not control this implementation.

## Local use and Vercel readiness

Run `npm install` and `npm run dev` from the repository root, then visit `http://localhost:3000`. Run `npm run build` followed by `npm run start` to serve the production build locally.

Import the website repository into Vercel using the Next.js preset, root directory `.`, Node.js `24.x`, install command `npm install`, build command `npm run build`, and default output settings. No environment variables are required. Keep production associated with `main`; review the feature branch and its preview before merging.

No Vercel project, live deployment, DNS changes, or domain verification is claimed by this bootstrap.

## Validation results

| Check | Result |
| --- | --- |
| `npm install` | Passed; final manifest and lockfile installed |
| `npx tsc --noEmit` | Passed, exit 0 |
| `npm run lint` | Passed, exit 0, no warnings |
| `npm run build` | Passed, exit 0; homepage and framework not-found route statically prerendered |
| Local development smoke check | Passed; `npm run dev`, GET `/` returned HTTP 200 |
| Production smoke check | Passed; `npm run start`, HTTP 200, metadata/canonical/noindex verified, no browser runtime errors |
| Responsive/accessibility review | Passed at 320, 375, 768, 1440, and 1920px: no horizontal overflow, header targets at least 44px, no detected axe WCAG 2/2.1 A/AA violations; keyboard skip link, real CTA, and all active links passed |

Browser validation uses temporary Playwright/axe tooling outside the repository and the installed Chromium. No browser test packages are added to the application. Desktop (1440px) and mobile (375px) full-page screenshots were visually inspected. The accessibility scan found a visible-label/accessible-name mismatch in the provisional home link; it was corrected and the complete scan passed on the final build. Automated checks are not a substitute for future assistive-technology review of the completed website.

The original README prefix was verified byte-for-byte and `git diff --check` passed. The documentation repository received no writes. All quality checks above were completed after the final code changes.

## Git delivery and remaining work

Branch: `feature/website-bootstrap`. Delivery uses a Conventional Commit and a review pull request targeting `main`. No changes are made to `main`, and no automatic merge is performed. Commit and pull request identifiers are reported in the task handoff.

Task 001 prepares the foundation for design-system work and the later content pages. Remaining work includes approved logo and sharing assets, final content and legal review, a verified contact channel before any contact UI is published, implementation of the future routes, reviewing construction-stage noindex metadata, the ESLint upstream compatibility update, and actual Vercel/domain setup. None of these require backend development in this milestone.
