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


## Task 002 歷史更新 — 品牌設計系統

以上 Task 001 內容保留為當時的檢查與驗收紀錄。Task 002 從網站 `main` 的 `699a0cd3918203e502fe3bf1f970f2cdd819123b` 建立 `feature/website-brand-design-system`，以 [docs/task/task002.zh-TW.md](task/task002.zh-TW.md) 為本次規格，不重新初始化專案。README 已由使用者更新為里程碑規劃，因此 Task 001 原始規格現在以 [docs/task/task001-implementation-notes.md](task/task001-implementation-notes.md) 為準。

本次新增集中管理的 Typography、Spacing、Radius、Shadow、Container、Section 與 Motion Tokens，完善共用 Button、Card、Container、Section、XkLogo 與裝飾性 BrandPattern，並建立 `/dev/design-system` 開發驗收頁。既有首頁僅改用共用元件與排版角色，沒有擴充完整首頁內容；套件依賴維持不變。

文件 Repository 讀取版本更新為 `3996730176e4ad7237c66f541d61405f2667934e`。Week 02 規劃文件未變，但現在已提供 `assets/brand/logo/` 素材；本次保留其 XK 路徑及文字輪廓。Task 002 仍規定 Logo 為暫定版本，不宣稱最終核准。來源素材使用 `#101828`、`#2563EB`，以獨立 Logo Tokens 保留原稿色彩；UI 繼續使用已確認的八個色彩。文件 Repository 未修改。

設計系統頁在 `npm run dev` 可用；production 預設 404，僅在明確設定伺服器端 `XK_DESIGN_SYSTEM_PREVIEW=1` 時開放驗收，且保持 `noindex, nofollow`，不加入網站導覽。

完整 API、來源說明與驗收紀錄見 [品牌設計系統](brand-design-system.md)。Task 002 最終 TypeScript、ESLint（零警告）與 Build 皆通過；五種寬度的首頁及展示頁皆無水平溢出或檢出的 axe WCAG A/AA 違規，鍵盤操作、真實連結、按鈕停用及 reduced-motion 皆通過。production 預設 404 與旗標啟用 200 均已實測；詳細結果與素材比對紀錄列於設計系統指南。


## Task 003 歷史更新 — 企業首頁與 Pages 部署準備

Task 003 以 `main` 的 `6feb400996e45e0e9bc285425a99e014f5381057` 為基準建立 `feature/website-homepage`；已實際確認 Task 002 合併成果是該版本祖先。網站目前的 [task003.md](task/task003.md) 明確要求完整企業首頁，優先於 README 舊里程碑表把 Task 003 僅列為 Header／Footer 的描述。原 Task 001 文件已更名為 [task001-implementation-notes.md](task/task001-implementation-notes.md)，`task002.md` 是空檔，完整 Task 002 規格為 [task002.zh-TW.md](task/task002.zh-TW.md)；本次僅修正引用，不改寫任務原稿或先前驗收紀錄。

本次完成七個首頁區塊、正式 Header／Footer、桌面及可操作的手機導覽，延用 Task 002 元件 API、原始 Logo 路徑及暫定狀態。首頁內容與已確認的聯絡管道分開集中管理；目前沒有確認可公開的管道，聯絡區塊保持待確認，服務、品牌介紹與解決方案以真實首頁錨點導覽。未建立完整內頁、Backend、假表單、假案例或統計。

文件 Repository 仍僅讀取 `3996730176e4ad7237c66f541d61405f2667934e`。已檢查要求的八份 Week 02 文件，並搜尋全部 31 份 Markdown：規劃中的 `contact@xplorekaleidoscope.com` 等信箱與泛用 LinkedIn 連結不構成可用聯絡管道的確認。原始素材與文件 Repository 均未修改。

使用者另明確選擇 GitHub Pages 靜態部署，取代本次原先的 Vercel 部署方向。一般 `npm run build` 仍保留 Vercel 相容設定；新增 `build:pages` 輸出已驗證路徑的 `out/`、`.nojekyll`，排除開發驗收路由，並保留 `noindex, nofollow`。Actions 在 PR 執行品質與 Pages 建置，部署僅限 `main`。目前公開 Pages 曾使用舊 Jekyll 工作流程；新工作流程與來源設定是否已啟用，必須以本次最終部署紀錄為準，不能僅因已存在公開網址而宣稱 Next.js 已部署成功。

完整實作紀錄：[首頁實作指南](homepage-implementation.md)；操作方式：[GitHub Pages 部署指南](github-pages-deployment.md)。**Task 003 最終品質、瀏覽器、無障礙、Actions 與部署結果待補**，不得沿用前兩個任務的通過紀錄。


## Task 004 歷史更新 — About Us 品牌介紹頁

本次以最新 `main` 的 `833db52344b16a270ef0e9531f33ab1f09b58200` 建立 `feature/website-about-page`。Task 003 已由 PR #3 合併（`0ca0760`）；其 main Actions run `44257982809` 已成功發布，並實際確認公開首頁 HTTP 200 與企業首頁內容。此為前置狀態，不代表 Task 004 的 About 頁已合併或發布。本次依 [Task 004](task/task004.md) 實作，保留目前 GitHub Pages 架構，交付 PR 待審核，不自動合併。

新增 `/about` 與集中內容設定，呈現九個語意區塊：Hero、Who We Are、Mission、Vision、五類技術能力、五階段工作方式、匿名創辦人介紹、四項服務理念及 CTA。Task 004 明確允許描述創辦人一人全職經營；姓名與照片設定仍為 null，不新增未確認的身分、年資、證照、法人、辦公室或團隊。願景與 AI SaaS 仍以未來方向表達，CTA 回到真實首頁服務與聯絡錨點。

Header／Footer／手機導覽的 About 更新為 `/about`，原首頁 `#about` 與 `#brand` 保留。新增頁面皆為 Server Components，沿用既有 Design System、字體與原始暫定 Logo；沒有新增依賴、Backend 或平行樣式系統。Pages 檢查工具增加 About 靜態輸出、Base Path、Canonical、Open Graph URL 及 noindex／nofollow 驗證，既有 workflow 不變。

文件 Repository 的最新 main 仍為 `3996730176e4ad7237c66f541d61405f2667934e`；Week 02 與 Logo Tree SHA 均未改變，且只讀不寫。網站 `docs/task/task002.md` 已恢復英文規格（4534 bytes），先前紀錄的空檔狀態僅描述當時版本；繁體中文規格仍保留，AGENTS 已更新目前狀態。Task 001 歷史檔名仍使用 `task001-implementation-notes.md`。

完整內容、來源、檔案清單、截圖與本次品質檢查見 [About Us 實作紀錄](about-implementation.md)。本次 npm ci、TypeScript、ESLint、一般 Build 與 Pages Build 皆 exit 0；加入原稿 `src/app/icon.svg` 後已重跑最終品質與瀏覽器 Suite，About／首頁均 HTTP 200、圖示 200、一般 production 開發頁 404。五種寬度、全部站內連結與錨點、Base Path、Metadata、九個區塊、五類能力、五階段流程及 axe A／AA（含展開的手機選單）全部通過，無水平溢出、JavaScript／Console／Runtime 錯誤或資源失敗；Skip Link、CTA 焦點與 Reduced Motion 0s 亦通過。圖示與提供的 symbol SVG 完全相同，未改畫 Logo 或修改全域 Layout。五份指定截圖已重拍，手機、核心能力、流程與頁尾已人工檢視。axe 結果只涵蓋本次頁面、狀態與自動化規則，不宣稱完成所有輔助科技或完整人工無障礙驗證。Commit 與 PR 以提交紀錄及最終交付報告為準，不預填識別碼，也不自動合併。


## Task 005 歷史更新 — Services 服務介紹頁

本次以最新 `main` 的 `7a8ea793608c7bec8fa212bfee4b2f24b5cf192e`（加入 Task 005 原稿）建立 `feature/website-services-page`。Task 004 已由 PR #4 合併（`57ad0f2`），其 main Actions run `44264779442` 的 quality、Pages build 與 deploy 均成功，並確認公開 About HTTP 200。這些是本次前置狀態，不代替 Task 005 驗收。[Task 005](task/task005.md) 多處明確要求 `feature/website-services-page`，結尾 `feature/website-task005` 僅為建議，因此採前者。

本次 Services 內容以五類服務與十個區塊組成：Hero、Overview、Website、Java、Integration & Database、AI & Automation、Cloud & Infrastructure、服務組合、五階段合作流程與 CTA。文案及明確 TypeScript 型別集中於 `src/config/services.ts`，各區塊重用既有 Design System，預設為 Server Components。共用導覽更新為 `/services`；首頁既有 `/#services`、`/#service-{anchor}` 與 Maintenance 分類保留，服務明細內頁仍未公開。

文件 Repository 最新讀取版本為 `95ef1275a46ace76e11f668178ca881087483398`，僅讀不寫。相較 `3996730…` 有 27 個 Markdown Blob 更新、6 份 Week 03 文件新增；Week 02 全部文件正文的文字內容相同，主要整理 Markdown 格式，Logo assets Tree 仍為 `534d37ee3dd83888342839b260a41913feb84951`。原始聊天技術決策檔新增的大段 ASK／ANS、建議中文品牌名、Email、價格與規劃中的展示專案，均不構成已確認商業成果或聯絡管道。保留本次 Task 005 與已合併網站架構的優先順序，不重新初始化、不引入 Backend／i18n 套件、不變更品牌色票或原稿 Logo。

GitHub Actions workflow 與發布條件沿用；必要時只擴充 Pages validator 以驗證 `out/services/index.html`、Base Path、Metadata、noindex／nofollow，同時保留首頁／About 及開發路由保護。正式聯絡方式仍待確認，不建立假表單、無效 mailto、服務價格或未確認的維運保證。

完整來源、元件分工、檔案清單及驗收結果見 [Services 實作紀錄](services-implementation.md)。320px 人工檢查發現 Hero 固定方形裁切標語，改為 sm:aspect-square 後已完整重驗；npm ci、TypeScript、ESLint（零警告）、一般 Build 與 Pages Build 均 exit 0。本次一般 Next.js 的三頁、開發頁保護、Disabled 與鍵盤計數／重設均實測正常。Fresh 靜態 Suite 結果 PASS：五寬三頁共 15 個 Responsive Case、18 次 axe（含三個展開選單）零 A／AA 違規，21 個站內目標與實際跨頁點擊正常，23 個 CSS／JS／字體／圖示全 200。十區塊、五類完整技術清單、五組合、五流程、Metadata、noindex／nofollow、Base Path、404、`.nojekyll` 與開發頁排除均通過；Skip Link、可見 Focus、Reduced Motion 0s、選單 Escape／焦點／外部點擊／斷點關閉亦通過，無非預期 Console／Runtime／Network Error。375px 觸控與 2x 裝置模式也已檢查，七張指定 PNG 已產出。人工視覺通過：320／375px Hero 全標語未裁切、Logo 192 × 192、CTA 不重疊，375px 概覽五卡／垂直流程與 Integration＋AI 圖均清楚、間距一致且標籤無溢出，1440px Hero／Website／組合／流程與 Integration＋AI 亦正常；axe 範圍與人工視覺範圍詳列於報告，不宣稱完整無障礙認證。以上為 Task 005 本次驗收，不沿用先前任務結果；遠端 run、Commit 與 PR 以本次 PR Checks、提交紀錄及最終交付報告為準，不預填識別碼、不自動合併或發布 main。
