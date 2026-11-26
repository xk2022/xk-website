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

Task 003 以 `main` 的 `6feb400996e45e0e9bc285425a99e014f5381057` 為基準建立 `feature/website-homepage`；已實際確認 Task 002 合併成果是該版本祖先。網站目前的 [task003.md](../task/task003.md) 明確要求完整企業首頁，優先於 README 舊里程碑表把 Task 003 僅列為 Header／Footer 的描述。原 Task 001 文件已更名為 [task001-implementation-notes.md](task/task001-implementation-notes.md)，`task002.md` 是空檔，完整 Task 002 規格為 [task002.zh-TW.md](task/task002.zh-TW.md)；本次僅修正引用，不改寫任務原稿或先前驗收紀錄。

本次完成七個首頁區塊、正式 Header／Footer、桌面及可操作的手機導覽，延用 Task 002 元件 API、原始 Logo 路徑及暫定狀態。首頁內容與已確認的聯絡管道分開集中管理；目前沒有確認可公開的管道，聯絡區塊保持待確認，服務、品牌介紹與解決方案以真實首頁錨點導覽。未建立完整內頁、Backend、假表單、假案例或統計。

文件 Repository 仍僅讀取 `3996730176e4ad7237c66f541d61405f2667934e`。已檢查要求的八份 Week 02 文件，並搜尋全部 31 份 Markdown：規劃中的 `contact@xplorekaleidoscope.com` 等信箱與泛用 LinkedIn 連結不構成可用聯絡管道的確認。原始素材與文件 Repository 均未修改。

使用者另明確選擇 GitHub Pages 靜態部署，取代本次原先的 Vercel 部署方向。一般 `npm run build` 仍保留 Vercel 相容設定；新增 `build:pages` 輸出已驗證路徑的 `out/`、`.nojekyll`，排除開發驗收路由，並保留 `noindex, nofollow`。Actions 在 PR 執行品質與 Pages 建置，部署僅限 `main`。目前公開 Pages 曾使用舊 Jekyll 工作流程；新工作流程與來源設定是否已啟用，必須以本次最終部署紀錄為準，不能僅因已存在公開網址而宣稱 Next.js 已部署成功。

完整實作紀錄：[首頁實作指南](homepage-implementation.md)；操作方式：[GitHub Pages 部署指南](github-pages-deployment.md)。**Task 003 最終品質、瀏覽器、無障礙、Actions 與部署結果待補**，不得沿用前兩個任務的通過紀錄。


## Task 004 歷史更新 — About Us 品牌介紹頁

本次以最新 `main` 的 `833db52344b16a270ef0e9531f33ab1f09b58200` 建立 `feature/website-about-page`。Task 003 已由 PR #3 合併（`0ca0760`）；其 main Actions run `44257982809` 已成功發布，並實際確認公開首頁 HTTP 200 與企業首頁內容。此為前置狀態，不代表 Task 004 的 About 頁已合併或發布。本次依 [Task 004](../task/task004.md) 實作，保留目前 GitHub Pages 架構，交付 PR 待審核，不自動合併。

新增 `/about` 與集中內容設定，呈現九個語意區塊：Hero、Who We Are、Mission、Vision、五類技術能力、五階段工作方式、匿名創辦人介紹、四項服務理念及 CTA。Task 004 明確允許描述創辦人一人全職經營；姓名與照片設定仍為 null，不新增未確認的身分、年資、證照、法人、辦公室或團隊。願景與 AI SaaS 仍以未來方向表達，CTA 回到真實首頁服務與聯絡錨點。

Header／Footer／手機導覽的 About 更新為 `/about`，原首頁 `#about` 與 `#brand` 保留。新增頁面皆為 Server Components，沿用既有 Design System、字體與原始暫定 Logo；沒有新增依賴、Backend 或平行樣式系統。Pages 檢查工具增加 About 靜態輸出、Base Path、Canonical、Open Graph URL 及 noindex／nofollow 驗證，既有 workflow 不變。

文件 Repository 的最新 main 仍為 `3996730176e4ad7237c66f541d61405f2667934e`；Week 02 與 Logo Tree SHA 均未改變，且只讀不寫。網站 `docs/task/task002.md` 已恢復英文規格（4534 bytes），先前紀錄的空檔狀態僅描述當時版本；繁體中文規格仍保留，AGENTS 已更新目前狀態。Task 001 歷史檔名仍使用 `task001-implementation-notes.md`。

完整內容、來源、檔案清單、截圖與本次品質檢查見 [About Us 實作紀錄](about-implementation.md)。本次 npm ci、TypeScript、ESLint、一般 Build 與 Pages Build 皆 exit 0；加入原稿 `src/app/icon.svg` 後已重跑最終品質與瀏覽器 Suite，About／首頁均 HTTP 200、圖示 200、一般 production 開發頁 404。五種寬度、全部站內連結與錨點、Base Path、Metadata、九個區塊、五類能力、五階段流程及 axe A／AA（含展開的手機選單）全部通過，無水平溢出、JavaScript／Console／Runtime 錯誤或資源失敗；Skip Link、CTA 焦點與 Reduced Motion 0s 亦通過。圖示與提供的 symbol SVG 完全相同，未改畫 Logo 或修改全域 Layout。五份指定截圖已重拍，手機、核心能力、流程與頁尾已人工檢視。axe 結果只涵蓋本次頁面、狀態與自動化規則，不宣稱完成所有輔助科技或完整人工無障礙驗證。Commit 與 PR 以提交紀錄及最終交付報告為準，不預填識別碼，也不自動合併。


## Task 005 歷史更新 — Services 服務介紹頁

本次以最新 `main` 的 `7a8ea793608c7bec8fa212bfee4b2f24b5cf192e`（加入 Task 005 原稿）建立 `feature/website-services-page`。Task 004 已由 PR #4 合併（`57ad0f2`），其 main Actions run `44264779442` 的 quality、Pages build 與 deploy 均成功，並確認公開 About HTTP 200。這些是本次前置狀態，不代替 Task 005 驗收。[Task 005](../task/task005.md) 多處明確要求 `feature/website-services-page`，結尾 `feature/website-task005` 僅為建議，因此採前者。

本次 Services 內容以五類服務與十個區塊組成：Hero、Overview、Website、Java、Integration & Database、AI & Automation、Cloud & Infrastructure、服務組合、五階段合作流程與 CTA。文案及明確 TypeScript 型別集中於 `src/config/services.ts`，各區塊重用既有 Design System，預設為 Server Components。共用導覽更新為 `/services`；首頁既有 `/#services`、`/#service-{anchor}` 與 Maintenance 分類保留，服務明細內頁仍未公開。

文件 Repository 最新讀取版本為 `95ef1275a46ace76e11f668178ca881087483398`，僅讀不寫。相較 `3996730…` 有 27 個 Markdown Blob 更新、6 份 Week 03 文件新增；Week 02 全部文件正文的文字內容相同，主要整理 Markdown 格式，Logo assets Tree 仍為 `534d37ee3dd83888342839b260a41913feb84951`。原始聊天技術決策檔新增的大段 ASK／ANS、建議中文品牌名、Email、價格與規劃中的展示專案，均不構成已確認商業成果或聯絡管道。保留本次 Task 005 與已合併網站架構的優先順序，不重新初始化、不引入 Backend／i18n 套件、不變更品牌色票或原稿 Logo。

GitHub Actions workflow 與發布條件沿用；必要時只擴充 Pages validator 以驗證 `out/services/index.html`、Base Path、Metadata、noindex／nofollow，同時保留首頁／About 及開發路由保護。正式聯絡方式仍待確認，不建立假表單、無效 mailto、服務價格或未確認的維運保證。

完整來源、元件分工、檔案清單及驗收結果見 [Services 實作紀錄](services-implementation.md)。320px 人工檢查發現 Hero 固定方形裁切標語，改為 sm:aspect-square 後已完整重驗；npm ci、TypeScript、ESLint（零警告）、一般 Build 與 Pages Build 均 exit 0。本次一般 Next.js 的三頁、開發頁保護、Disabled 與鍵盤計數／重設均實測正常。Fresh 靜態 Suite 結果 PASS：五寬三頁共 15 個 Responsive Case、18 次 axe（含三個展開選單）零 A／AA 違規，21 個站內目標與實際跨頁點擊正常，23 個 CSS／JS／字體／圖示全 200。十區塊、五類完整技術清單、五組合、五流程、Metadata、noindex／nofollow、Base Path、404、`.nojekyll` 與開發頁排除均通過；Skip Link、可見 Focus、Reduced Motion 0s、選單 Escape／焦點／外部點擊／斷點關閉亦通過，無非預期 Console／Runtime／Network Error。375px 觸控與 2x 裝置模式也已檢查，七張指定 PNG 已產出。人工視覺通過：320／375px Hero 全標語未裁切、Logo 192 × 192、CTA 不重疊，375px 概覽五卡／垂直流程與 Integration＋AI 圖均清楚、間距一致且標籤無溢出，1440px Hero／Website／組合／流程與 Integration＋AI 亦正常；axe 範圍與人工視覺範圍詳列於報告，不宣稱完整無障礙認證。以上為 Task 005 本次驗收，不沿用先前任務結果；遠端 run、Commit 與 PR 以本次 PR Checks、提交紀錄及最終交付報告為準，不預填識別碼、不自動合併或發布 main。


## Task 006 歷史更新 — Solutions 解決方案介紹頁

本次以 `main@35639d881f2805765f6ceee0bb159d5225984975` 建立 `feature/website-solutions-page`；Task 005 Merge `e341f12d4d3a93127402ed0b4889d2526b253244` 已是祖先。使用者此次明確要求執行 Task 006、核對規格／程式、修錯、產出驗證文件並 Push and merge；不把此授權擴及 Portfolio、Contact／Privacy、Vercel 或 DNS。

唯讀再次確認文件 Repository main 為 `95ef1275a46ace76e11f668178ca881087483398`，51 檔 Blob 與實際使用 17 筆來源均核對。沒有獨立商用 Solutions 目錄，四案保持 `proposed-direction`，只是有來源的企業需求／服務組合；無客戶成果、產品販售、報價或 SLA。頁面完成九個 Section／四個 Article、八項方案內容、技術與既有 ServiceId 對照、三示例及直接重用的五階段流程。新區塊維持 Server Components，Design System／Logo／Tokens／相依版本與一般 Next／Pages 雙模式保留。

共用 Solutions 導覽改到 `/solutions`，首頁原三方向與 `#solutions` 保留，只新增「了解解決方案」入口。Pages validator 加入 Solutions 精確 Metadata／四頁 canonical／robots／Base Path／HTML／CSS 資源實體檢查，保留 404／.nojekyll／dev payload 保護；不改 workflow、Next 設定或部署條件。根 README／AGENTS 的已刪替代原稿入口已同步至 canonical 規格，舊實作報告不回寫。

五個 fresh 品質指令 npm ci、TypeScript、ESLint（零錯誤／警告）、一般 build、build:pages 皆 Exit 0。一般模式 15 項與最終Pages 70 項完整通過，涵蓋四頁、20 個響應式案例、23 次 axe（0 違規）、27 個站內目的地／錨點、27 個資源、鍵盤／手機／375px touch／Reduced Motion、Metadata／noindex與靜態保護。S06-N01 確認 Solutions 實際 DOM 無 disabled／form／mailto，不創造假功能。七份真實 PNG及320／375px補充畫面已人工閱讀，正式圖與已檢視圖 SHA256 全相同。

原兩次Pages 工具 FAIL 保留：logical href Base Path 預期錯判，以及 HEAD 事件分類器的空URL解析。以原始Promise／CDP／Next source／後續 tree GET 交叉證明 165 個 HEAD 實際成功 200；僅符合精確條件才分類，其他錯誤仍 FAIL。修工具後全套重驗 Exit 0；app 程式碼指紋全程相同，沒有以改產品 prefetch、跳過測試或刪除錯誤換取通過。安裝時既有 ESLint deprecated 提示保留，未升降級套件。

正式實作／驗證與失敗重驗證據見 [Task 006 報告](../reports/task006-implementation.md) 及 [結構化驗證紀錄](../reports/task006-verification.json)。此紀錄截止於建立 PR 前；真實 Commit／PR／CI 與後續 main 部署／公開站結果須在實際發生後補入報告與同PR交付紀錄，不能由本機結果或過去任務推定。


## Task 007 歷史更新 — Portfolio 技術作品集

本次以最新 `main@43ddd7ed0e339d35ece949a656188defcaa5ac72` 建立 `feature/website-portfolio-page`；Task 001–006 的實際 Merge Commit 均是祖先，逐項 Git 檢查 Exit 0。初始工作目錄乾淨，使用者已明確授權正式開發、核對規格、產出驗證文件及 Push and merge。前述內容保留為歷史，不沿用過去測試或以 Task 006 公開上線代表 Task 007 已發布。

重新唯讀核對文件 Repository `main@95ef1275a46ace76e11f668178ca881087483398`，P01–P10 全文與 10 個 Blob 均相符，完整快照 51 檔亦再次核對。三個展示計畫依規格保持 demonstration／PLANNED，implementedFeatures／implementedTechnologies／media 全空，sourceLink／liveDemo 為 null。官網實作不自動等於 Case 01 完成；Case 02 模組摘要與詳規分歧不相加成 ERP；Case 03 AI／n8n 是後續，沒有客戶、成效或 Live 宣稱。

新增 `/portfolio` 六區塊與三個共用靜態詳頁，每詳頁八區塊，資料與來源集中於 `src/config/portfolio.ts`。Promise params／generateStaticParams／dynamicParams=false／notFound 依已安裝 Next.js 文件處理，只產生 corporate-website、enterprise-management、integration-hub，未知／wrong-case／舊 alias 均 404。新 TSX 全為 Server Components，沿用 Design System、Logo、Tokens 與既有 ServiceId／contactNavigation。共用導覽加入「技術作品集」，Footer 重複規劃中文字移除；保留 Home／About／Services／Solutions 及既有錨點。

沒有合法且可驗證的案例系統素材，採文字空狀態，不新增 public 圖片或多餘 helper。七張文件 QA 圖是 Portfolio 介紹頁自身驗收，不加入案例 media。精確 Metadata／品牌 Canonical／OG／zh-TW／noindex／nofollow 及一般／Pages 雙 build 保留；Validator 追加四 Portfolio HTML、恰三 slug、語言與資源檢查，原四頁／404／.nojekyll／dev payload 保護不降低。套件、lockfile、Next／Tailwind 設定、workflow、品牌原稿與文件 Repository 均未修改，未引入 Backend、API、CMS 或 Analytics。

最終五個 fresh 品質指令均 Exit 0。一般瀏覽器完整重驗 23/23 PASS，Pages 完整重驗 123 項＝121 PASS＋2 有據 N/A、Exit 0，涵蓋八頁、40 個響應式案例、43 次 axe 零違規、36 unique 站內目的地／304 link occurrences、鍵盤／Focus／375px 觸控／Reduced Motion／Metadata／靜態保護。最終 123 observed 資源獨立 GET 全 200，GET abort 與非預期錯誤為 0；451 個 HEAD 完成事件依真 document／Next-URL 來源及一對一成功 tree 嚴格佐證，raw 全保留。四輪 app 指紋始終為 `3e166b2e7502e4ac3b38b651960f4d11b2f310ffd37583c9bd1e920c2b0cfd13`。

初輪一般模式的工具 lang 誤判及 favicon GET 失敗、初輪 Pages 的 3 GET＋1 HEAD 分類失敗均保留原 FAIL。favicon 首輪缺少足夠資料追認原因；新增實際圖示 body／SHA 與等待後，完整一般重驗零資源失敗。Pages 工具的 resize 後立即導航造成 prefetch 競態，另有跨 document 借用 tree 的配對缺陷；修正等待與嚴格來源邊界後完整重驗，沒有新增 GET 忽略清單、停用產品 prefetch 或改產品碼換取 PASS。啟動與停止伺服器的環境限制及真實退出碼亦單獨記錄。

七張指定 PNG 與 320／375px 補充圖已實際人工檢視，最終 35 候選圖與首輪完全同 SHA，正式七圖依原 bytes 複製。完整報告：[Task 007 實作與驗證](../reports/task007-implementation.md)；逐項結果：[驗證摘要](../reports/task007-verification.json)；100 份原始 JSON：[壓縮證據](../reports/task007-evidence.json.gz)，還原 SHA 100/100。此紀錄截止於 PR 前本機交付；真實 Commit／PR／CI、授權合併、main 部署及公開網址結果分階段於報告與同 PR 最新交付紀錄確認，不預填識別碼或推定已部署。


## Task 008 歷史更新 — Contact 聯絡資訊頁

本次以最新 `main@99e375e6f9621862b0ab1a0db9351f4963f199fb` 建立 `feature/website-contact-page`；Task 001–007 的七個 Merge Commit 均經實際祖先檢查 Exit 0，Task 007 PR #11 已合併。初始工作目錄乾淨，使用者本次明確授權正式開發、規格／程式驗證、產出文件並 Push and merge；不將其擴大為新收件服務、法律政策或 DNS 授權。

重新唯讀查詢文件 Repository main 仍為 `95ef1275a46ace76e11f668178ca881087483398`，完整 Tree 與 51 個 Blob bytes 均相符；六份 C01–C06 與品牌來源已讀取，沒有新的正式管道、帳號控制權或受控寄收證據。`verifiedContactChannels` 及既有 API 原封不動，Availability 由空陣列派生 `unavailable`；沒有虛構 Email、電話、社群、回覆時限、假表單或 Backend。資訊頁可以交付，但目前不能透過網站收取需求；管道公開、資料收集及 Task 009 法律 gate 仍待各自確認。

新增 `/contact` 六個 Server Sections、typed `contact-page.ts`、指定 H1／Metadata／Canonical／OG／語言／noindex。頁面提供誠實空狀態、三項準備、三步合作說明、資料注意與真實 CTA，五個服務名稱及錨點由既有 ServiceId／serviceCategories 取得。Header／Footer／手機選單共用聯絡來源改為 `/contact`；首頁原 `#contact`、pending 內容與所有有效舊 CTA 保留，只加查看聯絡資訊。沿用 Design System、原稿暫定 Logo、八色 Tokens、Focus／Reduced Motion、既有套件與一般／Pages 雙模式；workflow、lockfile、Next／Tailwind 設定及文件 Repository 未修改。

最終程式碼指紋為 `42c8e5bf5b069f643981fdef2741cd530cd55809123c744c24ded3d2c2a4c62b`。初次 npm ci 因預設 cache 路徑無法建立而 FAIL／Exit 254，原始紀錄保留；改用 `/tmp` npm cache 後重驗 Exit 0，後續 TypeScript、零警告 ESLint、一般 Build、Pages Build 均 Exit 0。一般 production 九頁 fresh 驗收 27/27 PASS，39 unique 站內目的地／345 link occurrences、28 資源 GET 200，沒有提交、外部收件、Cookie／Storage 寫入或 raw browser failures；未知路由與 dev 頁 404。Pages validator 只追加 Contact，原八頁／資源／404／.nojekyll／dev payload 保護完整保留。

最終 Pages 全套重驗 148 項＝141 PASS＋7 有據 N/A、實際 Exit 0；九頁五寬45case、48次axe零違規、39個站內目的地／345個連結、147 個資源 GET 200、506 個原始 HEAD 事件依同document與來源嚴格分類，非預期錯誤0。首輪Pages在touch尚PENDING即提早結束，缺completion code，原snapshot、kernel觀察0與實際工具exit未知分開保存，不追認PASS；獨立touch診斷及加入keepalive／有界trace後全套重驗均Exit0，未改產品碼。七指定PNG與窄版／fixture補圖已產生，Root 實看前一 epoch 22 張，最終七張重新拍攝並以實際 bytes／SHA 橋接相同畫面，另有獨立視覺覆核；沒有把合成管道當公開或收件證據。完整本次來源、資料流、檔案清單、失敗修正及驗收紀錄見 [Task 008 實作與驗證報告](../reports/task008-implementation.md)。本機、PR CI、Review、授權 merge、main CI、部署與公開網址分階段記錄，不以資訊頁 HTTP 200 或本機建置成功當作已能收件或已正式部署。

最後完整 staged Diff 發現一個新元件 EOF 多餘空行，僅移除一個 LF；保留原 5dfa8be441c40d2c447a25fd05bce494e4d8ba0290bd21fb3e22630960c8c964 與新 42c8e5bf5b069f643981fdef2741cd530cd55809123c744c24ded3d2c2a4c62b 兩 epoch，不將舊結果改標新版本。最終五品質與普通／Pages 重新完整驗收均實際 Exit 0；文件檢查同步覆蓋 staged／unstaged 及完整 main 比較。

## Subagent 執行流程優化

使用者於 2026-11-19 要求檢視前次作業習慣、留下可沿用的 subagent 紀錄並優化後續任務，指定 `feature/subagent` 及完成後合併 main。本次從乾淨的 `main@e77cd8110e110b6405e6bf3ce354ffb041b34c41` 建立分支；授權只適用本次流程改善，不延伸為後續任務的發布許可。

新增 [Subagent 協作與驗證流程](../03_engineering/subagent-workflow.md)，記錄 Task 008 的真實 cache／退出紀錄／格式檢查／重驗與交接問題。後續以當次規格為準、按需要分工、Root 一次編排 build／server／交付、freeze 前收斂完整 Diff，再依變更影響選擇重驗；不靠 fingerprint 變動自動決定整套重跑。AGENTS 加入必讀入口與執行規則，README 增加導覽，不改舊 Task 規格或歷史報告。

新增 [run-with-evidence.py](../../scripts/run-with-evidence.py)，僅用 Python 標準函式庫，將真實 OS wait 結果、命令、時間及 stdout／stderr SHA 寫入原子回執與獨立 log；保留 child returnCode 與 wrapper exitCode 的差異。拒絕覆寫現有證據，逾時／信號只清理本次建立的 process group。receipt 的 PASS 僅表示程序成功退出，驗收仍須核對 Required 項目、結束標記、數量與版本。

已實際執行 14 項工具檢查，整體 Exit 0：成功 0、真失敗 7、timeout 124／無存活子程序、覆寫拒絕 2、缺少 executable 127、wrapper 受信號 143（即使 child 自行 Exit 0 仍 FAIL）、child signal 原 returnCode -15，以及非法 timeout 拒絕。預期的非零退出是測試輸入，未將其原始 FAIL 回執改為 PASS；工具契約符合預期的測試才判 PASS。完整原始結果暫存於 `/tmp/xk-subagent-workflow/`，PR 記錄最終檢查與遠端實際結果。

本次只有文件與開發工具，沒有變動 src、public、依賴／lockfile、Next／TypeScript 設定、Pages builder 或 workflow。本機驗證針對工具、Markdown／連結、完整 staged／unstaged Diff 與受保護檔案；既有 PR／main CI 仍照常執行，不重跑不受影響的九頁瀏覽器矩陣。CI、合併及部署以實際發生後的 PR 紀錄為準。
