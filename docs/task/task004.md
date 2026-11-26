# Task 004 — XK About Us 品牌介紹頁實作

## 1. Task Overview

正式開發 XK 官方網站 About Us 品牌介紹頁，建立品牌定位、企業理念、技術能力、服務價值與創辦人介紹，提升潛在客戶對 XK 的理解及信任。以既有網站架構及 Design System 完成獨立前端頁面，不重新初始化專案或重新設計已確認的品牌系統。

| 項目 | 規格 |
| --- | --- |
| Project Name | Xplore Kaleidoscope |
| Brand Abbreviation | XK |
| Domain | `https://xplorekaleidoscope.com` |
| Brand Slogan | Explore Possibilities. Create Digital Value. |
| Technical Tagline | Building Digital Solutions with Web, Java & AI. |
| Primary Language | Traditional Chinese（`zh-TW`） |
| 目標路由 | `/about` |
| 執行角色 | Senior Next.js Engineer、UI/UX Designer and Software Architect |

預期成果是具有專業企業形象、現代科技視覺、國際化品牌風格、清楚資訊架構、Responsive Design、SEO-friendly、Accessible UI 與 Maintainable Components 的品牌介紹頁。

本文件是 Task 004 的需求與驗收規格，不是新的執行結果。既有實作與歷史測試另見 [About Us 實作紀錄](../reports/about-implementation.md)；不能把歷史通過結果、合併或部署紀錄填入本文件的待執行驗收欄位。本次文件骨架整理不重新執行 Task 004 開發或測試。

## 2. Repository & Prerequisites

| 項目 | 要求 |
| --- | --- |
| Website Repository | `xk2022/xk-website` |
| Documentation Repository | `xk2022/xplore-kaleidoscope`，僅供讀取 |
| Base Branch | `main` |
| Base Commit | 開始執行時確認最新 `main` 的實際 Commit，不預填新結果 |
| Feature Branch | `feature/website-about-page` |
| 前置任務 | Task 001、002、003 的已合併網站架構及 Design System |
| 既有部署 | 核對 Task 003 的 GitHub Actions → GitHub Pages 設定及實際部署狀態；不得由舊報告推定當下狀態 |
| 前置驗證狀態 | PENDING，執行時以實際 Git、GitHub 與 HTTP 紀錄填寫獨立報告 |

開始實作前必須確認目前 Repository、README、AGENTS、Git Branch、Git Status、工作目錄是否乾淨、最新 `main` Commit、目前首頁是否正常，以及既有 GitHub Pages 設定。不得覆蓋尚未提交的修改。

**不得假設 Task 003 已合併。** 如果 Task 003 尚未合併，停止實作並回報依賴問題，不可自行將未核准的分支內容合併進來。

原 Task 004 實作報告記載的基準為 `833db52344b16a270ef0e9531f33ab1f09b58200`，文件 Repository 讀取版本為 `3996730176e4ad7237c66f541d61405f2667934e`。這些是該次實作的歷史快照，出處為 [About Us 實作紀錄](../reports/about-implementation.md)，不是新執行工作的指定最新版本或新驗收結果。

只修改 `xk-website`；文件 Repository 不得修改。保留既有程式碼、Design System 與首頁行為，不直接 Push 至 `main`，不自動合併 Pull Request。

## 3. Reference Documents

### Website Repository

完整閱讀並確認檔案實際存在：

- [README.md](../../README.md)、[AGENTS.md](../../AGENTS.md)。
- [Task 001 統一規格](task001.md) 與原始需求／歷史替代文件 [task001-implementation-notes.md](https://github.com/xk2022/xk-website/blob/895b9878b6c6244cf225772f6c4f8d3e5d97affe/docs/task/task001-implementation-notes.md)。
- [Task 002](task002.md)、[Task 002 繁體中文版](https://github.com/xk2022/xk-website/blob/895b9878b6c6244cf225772f6c4f8d3e5d97affe/docs/task/task002.zh-TW.md)、[Task 003](task003.md) 的實際規格、實作及紀錄。
- [歷史實作紀錄](../98_decisions/implementation-notes.md)、[品牌設計系統](../reports/brand-design-system.md)。
- [首頁實作紀錄](../reports/homepage-implementation.md)、[About Us 獨立實作與驗收報告](../reports/about-implementation.md)。
- [GitHub Pages 部署指南](../reports/github-pages-deployment.md)。

Task 001 原稿曾使用替代檔名、Task 002 英文原稿曾是空檔的敘述，只保留為對應實作時點的歷史資訊；執行時應核對實際檔名及內容，不得把缺少或空白的文件當成完整規格。

Task 001 與 Task 002 的正式入口分別為 [task001.md](task001.md) 與 [task002.md](task002.md)。上述已刪除替代原稿的連結固定指向 `895b9878b6c6244cf225772f6c4f8d3e5d97affe` 的歷史快照，僅供追溯；不得將歷史快照誤作現行入口或復原已刪除檔案。

### Documentation Repository

讀取 [xk2022/xplore-kaleidoscope](https://github.com/xk2022/xplore-kaleidoscope) 的 `doc/01_business-plan/week-02/`，至少確認品牌、網站架構與首頁文案，並參照 Logo 與 Typography：

| 主題 | 原始文件 |
| --- | --- |
| 品牌 | `01_brand-identity_品牌視覺識別規範.md` |
| Logo | `02_logo-guidelines_XK Logo 設計與使用規範.md` |
| 色彩 | `03_color-palette_品牌色彩系統規範.md` |
| 字體 | `04_typography_品牌字體與排版規範.md` |
| 首頁文案 | `06_homepage-copywriting_官方網站首頁文案規劃.md` |
| 網站架構 | `08_website-architecture_官方網站 Next.js 技術架構設計.md` |

記錄讀取版本、找到及缺少的文件；只能讀取，不得修改。發生衝突時，依當次使用者明確指示、已合併的網站架構及品牌 Design System、本次 Task 004 明確要求，再參照已確認的品牌決策與舊版規劃，並在報告說明差異。不得為舊文件的 monorepo、Backend 或不同色票破壞既有網站，也不得把規劃當成已實施功能。

## 4. Scope & Requirements

本次實作 `/about`，包含九個內容區塊、必要的共用導覽整合、獨立 Metadata、Responsive、Accessibility、GitHub Pages 靜態輸出與首頁回歸驗證。

必須完成：

- 品牌介紹、Mission、Vision、五類 Core Capabilities、五階段 Our Approach。
- 創辦人介紹及四項 Commitment，僅使用確認過的內容。
- 以真實首頁錨點提供 CTA，Header／Footer／Mobile Navigation 正常。
- 沿用 Task 002 Tokens、元件、字體與現有部署架構；保持首頁及其他靜態資源正常。
- 完成本文件要求的新一輪品質檢查、瀏覽器驗收、實際截圖及獨立報告。

不得重新初始化專案、替換技術、建立平行 Design System、開始 Backend 或增加未授權功能。不虛構創辦人資料、照片、聯絡方式、團隊、法人、辦公室、員工規模、商業成果或保證。

## 5. Information Architecture & UX

正式路由為 `/about`，共用現有網站 Header、Footer 與手機導覽。頁面順序如下；Mission 與 Vision 可以共用檔案，但必須是兩個獨立的語意 Section 與 H2。

| 順序 | 區塊 | 元件與責任 |
| --- | --- | --- |
| 1 | About Hero | `AboutHero`；單一中文 H1、品牌／技術標語、品牌簡介、XK Logo 與幾何視覺 |
| 2 | Who We Are | `AboutWhoWeAre`；技術品牌定位、五項重視事項與一人全職經營方式 |
| 3 | Our Mission | `AboutMissionVision` 的使命 Section；核心理念、三欄或卡片及 Lucide React 圖示 |
| 4 | Our Vision | 同一元件的獨立願景 Section；明確表達四項未來發展方向 |
| 5 | Core Capabilities | `AboutCapabilities`；五類技術能力 |
| 6 | Our Approach | `AboutApproach`；五階段流程，Desktop 橫向流程、Mobile 垂直排列 |
| 7 | Founder Introduction | `AboutFounder`；已確認的角色、介紹及專注領域；無照片時使用品牌幾何視覺 |
| 8 | Our Commitment | `AboutCommitment`；四項服務理念 |
| 9 | CTA | `AboutCta`；返回真實首頁服務與聯絡錨點 |

訪客應能從共用「關於 XK」導覽進入 `/about`，閱讀品牌與服務理念，再透過 CTA 返回 `/#services` 或 `/#contact`。不得建立假的聯絡表單、信箱或未完成內頁連結。

Hero 使用 XK Logo、Geometric Kaleidoscope、幾何對稱視覺、品牌主色及輔助色，保持專業企業形象，不改畫 Logo 或加入假人像。Desktop／Tablet／Mobile 保持一致視覺層級、留白與元件間距，不依賴 Hover 才能操作。

## 6. Content & Data Specification

### 內容來源與集中設定

以下為原 Task 004 定稿內容，保留繁體中文為主要語言及必要英文名稱。大量文案、能力、流程、創辦人與服務理念集中在 `src/config/about.ts`；Page 只組合區塊及設定 Metadata，Components 負責呈現與語意。

沿用既有 `aboutPage`、`aboutCapabilities`、`aboutApproach`、`founderProfile`、`aboutCommitments` 與明確 TypeScript 型別。`FounderProfile` 應保留未確認欄位的可空設定：`name: string | null`、`photo: { src: string; alt: string } | null`，以及 `role`、`introduction`、`description`、`focusAreas`。目前未確認的姓名及照片維持 `founderProfile.name: null`、`founderProfile.photo: null`，不得以示例值公開。

### 1 — About Hero

中文 H1：**探索可能性，創造數位價值。**

英文品牌標語：Explore Possibilities. Create Digital Value.

技術標語：Building Digital Solutions with Web, Java & AI.

品牌簡介：

> Xplore Kaleidoscope（XK）整合網站開發、Java 企業系統、系統架構與 AI 應用技術，協助企業將商業需求轉化為可靠、可擴充且具實際價值的數位解決方案。

主標題可依兩句完整文案分行，保持字義完整與手機閱讀性。

### 2 — Who We Are

標題：**我們是誰**

> XK 是以軟體工程、系統整合與人工智慧應用為核心的數位技術品牌。
>
> 我們關注企業在數位轉型過程中面臨的實際問題，從網站建置、企業後端系統、API 整合到 AI 應用，提供符合業務需求的技術服務。

我們重視：

- 技術品質。
- 商業需求理解。
- 系統可維護性。
- 架構擴充能力。
- 長期合作價值。

XK 目前為創辦人一人全職經營的技術服務品牌，內容應呈現專業且可信賴的品牌形象，不得虛構團隊。不得宣稱尚未成立的法人、辦公室、員工人數或企業規模。

### 3 — Our Mission

標題：**我們的使命**

核心理念：**讓技術成為企業創造價值的工具。**

> 我們希望透過可靠的軟體工程、現代化系統架構與 AI 技術，協助企業改善營運流程、提升工作效率，並建立能持續成長的數位能力。

採三欄或卡片式呈現，兼顧技術與商業價值，使用 Lucide React 圖示，不使用虛構統計數據。

### 4 — Our Vision

標題：**我們的願景**

> 逐步發展成整合網站開發、企業系統、AI 應用與自動化服務的整合型 AI 網路公司。

發展方向：

1. 建立可靠的數位技術服務。
2. 將成熟的 AI 解決方案標準化。
3. 發展自主 AI SaaS 產品。
4. 協助更多台灣及海外企業創造數位價值。

以上為品牌發展方向，不得描述成已完成的商業成果。

### 5 — Core Capabilities

標題：**核心技術能力**

以以下五個分類完整呈現：

| 編號與分類 | 技術清單 |
| --- | --- |
| 01 Website Development | Next.js；React；TypeScript；Responsive Web Design；Website Architecture |
| 02 Java Enterprise Development | Java；Spring Boot；Backend API；Enterprise Application；Database Integration |
| 03 System Architecture & Integration | System Architecture；API Integration；Database Design；Enterprise System Integration；Technical Planning |
| 04 AI & Automation | OpenAI API；Spring AI；RAG；AI Agents；n8n Workflow Automation |
| 05 Cloud & Infrastructure | Vercel；Cloud VPS；Docker；GitHub；Deployment Architecture |

以上為 XK 可提供的技術服務能力，不代表每項技術都已部署於目前官網。

### 6 — Our Approach

標題：**我們的工作方式**

| 階段 | 原文說明 |
| --- | --- |
| Understand — 理解需求 | 了解客戶的商業目標與實際問題。 |
| Analyze — 需求分析 | 評估技術需求、系統限制與實作範圍。 |
| Architect — 架構規劃 | 設計適合需求且可擴充的技術方案。 |
| Develop — 開發實作 | 以可靠的工程流程完成開發與測試。 |
| Deliver & Improve — 交付與持續改善 | 完成交付，並依需求提供維護與優化服務。 |

Desktop 使用流程式呈現，Mobile 改為垂直流程。不製造不存在的認證或品質保證承諾。

### 7 — Founder Introduction

標題：**創辦人**

定位：**Founder & Software Engineer**

> XK 由具備網站開發、Java 企業系統、系統架構及 AI 應用整合經驗的軟體工程師創立。

專注領域必須保留：

- Website Development
- Java Enterprise Development
- Spring Boot
- System Architecture
- API Integration
- AI Application Integration

介紹文案：

> 從網站應用到企業後端系統，從系統架構到人工智慧整合，致力於以軟體工程解決實際商業問題。

不得虛構創辦人姓名、學歷、年資、證照、工作經歷或個人照片；沒有經過確認的資訊不得公開。沒有提供照片時，使用品牌幾何視覺，不建立假人像。姓名及照片只預留未來設定位置，取得確認與授權素材後再依實際需求接入及驗收，不以空設定宣稱照片功能已完成。

### 8 — Our Commitment

標題：**我們重視的不只是交付，更是長期價值。**

| 品牌理念 | 原文說明 |
| --- | --- |
| Engineering Quality | 重視程式碼品質及系統穩定性。 |
| Business Value | 以客戶實際需求為出發點。 |
| Scalable Architecture | 考慮未來擴充與維護。 |
| Long-term Partnership | 重視持續改善與長期合作。 |

以上為品牌服務理念，不得擴大成未經驗證的保證。

### 9 — CTA

標題：**讓我們一起探索下一個數位可能。**

> 無論是企業網站、Java 系統、系統整合或 AI 應用，都可以從理解需求開始。

| 按鈕 | 目的地 |
| --- | --- |
| 了解服務 | `/#services` |
| 聯絡 XK | `/#contact` |

使用目前已存在的真實首頁錨點，不建立無法使用的聯絡表單或虛構聯絡方式。

## 7. Design System & Technical Constraints

### 既有架構與共用元件

不得替換 Next.js、React、TypeScript、Tailwind CSS 4、shadcn/ui、Lucide React、Next.js App Router、GitHub Actions 或 GitHub Pages。保留現有 Node.js `24.x`、npm 及相依套件版本，不重新初始化、任意升降級或新增不必要的 Dependencies。

優先重用 `XkLogo`、`BrandPattern`、`Container`、`Section`、`Button`、`Card`、`CardHeader`、`CardTitle`、`CardDescription`、`CardContent` 及既有 `SectionHeading`。保留 Typography Utilities、Responsive Spacing、Brand Radius、Brand Shadow、Focus States、Reduced Motion 與現有字體設定，不另建平行 Design System。

沿用 Inter、Noto Sans TC 及現有備援字體。既有九種角色為 `type-display`、`type-h1`、`type-h2`、`type-h3`、`type-body-lg`、`type-body`、`type-body-sm`、`type-caption`、`type-button`。中文標題適當標示 `zh-TW`；如使用 `SectionHeading.titleLang`，保留其選填且預設 `en` 的相容行為，不影響既有首頁。

| Token | Value |
| --- | --- |
| Primary | `#101A33` |
| Secondary | `#3157D5` |
| Accent | `#19B8D5` |
| Background | `#FFFFFF` |
| Surface | `#F5F7FB` |
| Foreground | `#172033` |
| Muted | `#667085` |
| Border | `#E4E8F0` |

使用既有語意 Tokens，不在各元件硬編碼品牌 HEX。Muted 是次要文字，Surface 是區塊背景；保持 shadcn `bg-muted` 與 `text-muted-foreground` 的既有映射。

Logo 使用已提供的 SVG 原始素材，保留 Path、Transform、比例、原稿配色及 **Provisional（暫定版本）** 狀態，不自行宣稱最終品牌核准。不因裝飾需求改畫或拉伸 Logo。

### 語意、效能與服務限制

Server Components 優先，只有真正需要互動的部件才使用 Client Components；About 不依賴 Server Runtime 或 Backend，維持可靜態輸出。不要將大量內容塞入單一 `page.tsx`。

沿用語意 HTML、可見 Focus、鍵盤導覽、適當對比與 `prefers-reduced-motion`。圖片有適當 `alt`，裝飾 SVG／圖樣／圖示使用 `aria-hidden`。不新增不必要 JavaScript、動畫套件或追蹤服務。

不需要 Spring Boot、PostgreSQL、Docker Backend、Separate API Server、Contact API、CMS、Authentication 或 Analytics。技術能力文案列出相關技術，不代表官網需安裝這些服務。

## 8. Navigation, SEO & Deployment

### 導覽與真實路由

正式路由為 `src/app/about/page.tsx` 對應 `/about`。共用導覽應包含首頁、關於 XK、服務項目、解決方案、聯絡我們；其中「關於 XK」指向 `/about`，Header、MobileNavigation 與 Footer 使用相同設定。將 `plannedRoutes` 的 About 狀態與實際可用路由保持一致。

保留既有首頁 `#about`、`#brand`、`#services`、`#contact` 及所有有效導覽。尚未建立的內頁不得成為假連結；About CTA 仍依原規格使用 `/#services`、`/#contact`。

### Metadata

使用 Next.js Metadata API，設定以下 About 專屬內容：

| 欄位 | 指定值／要求 |
| --- | --- |
| Title | `關於 XK \| Xplore Kaleidoscope` |
| Description | `認識 Xplore Kaleidoscope（XK），了解我們的品牌理念、網站開發、Java 企業系統、系統整合與 AI 應用技術能力。` |
| Canonical | `https://xplorekaleidoscope.com/about` |
| Open Graph Title | About 專屬 Title |
| Open Graph Description | About 專屬 Description |
| Open Graph URL | `https://xplorekaleidoscope.com/about` |
| Language | `zh-TW`；保留必要英文標語與名稱 |
| Indexing | 保留 construction-stage `noindex, nofollow`，除非使用者另行確認開放索引 |

頁面只有一個清楚的 H1，保留正確 H2／H3 階層。不新增虛構的 Organization Rating、Review、Awards Schema；沒有核准的 Open Graph Image 時，不建立虛構圖片路徑。

### GitHub Pages 與一般 Build

維持 Task 003 的 GitHub Actions → GitHub Pages 靜態部署架構，以及一般 Next.js Build 相容性。`npm run build:pages` 必須成功輸出 About；既有 Pages 設定的 `trailingSlash` 下目標為 `out/about/index.html`。

GitHub Pages 專案網址可能含 `/xk-website/`，About 應能在 `/xk-website/about/` 運作。優先沿用 Task 003 的 URL Helper（若存在）、Next.js Link 與既有路由設定，不假設 Helper 已存在，不硬編碼破壞 Base Path 的絕對站內路徑或逐元件加上專案前綴。

Logo、CSS、JS、字體、圖片及圖示路徑必須正常；Canonical／Open Graph 保持品牌網域的 `/about`，不能誤帶 Pages 專案 Base Path、Query 或 Fragment，正常結尾斜線依既有 Validator 處理。保留首頁、404、`.nojekyll`、開發驗收路由排除與 noindex 保護。

如有必要，只擴充既有 Pages Validator／Workflow 的必要設定並說明原因，不任意修改部署條件。PR 執行品質檢查與產物建置；只有審查合併後的 `main` push 或既有規則允許的 `main` 手動執行才能部署。不得擅自發布功能分支、變更 Pages Source、DNS 或 Custom Domain，或把本機成功宣稱為公開部署。

## 9. File Structure & Change Scope

### 目標檔案與責任

以下是 Task 004 的目標結構，並非本次文件整理新增檔案的紀錄。執行時已存在的檔案應重用及必要修改，不因建議結構重複建立元件；實際新增／修改清單以最終 Git Diff 為準。

```text
src/
├── app/
│   └── about/
│       └── page.tsx
├── components/
│   └── sections/
│       └── about/
│           ├── about-hero.tsx
│           ├── about-who-we-are.tsx
│           ├── about-mission-vision.tsx
│           ├── about-capabilities.tsx
│           ├── about-approach.tsx
│           ├── about-founder.tsx
│           ├── about-commitment.tsx
│           └── about-cta.tsx
└── config/
    └── about.ts
```

| 檔案／位置 | Task 004 責任與允許範圍 |
| --- | --- |
| `src/app/about/page.tsx` | 路由、Metadata 與頁面區塊組合 |
| `src/config/about.ts` | 集中文案、重複內容、能力、流程及創辦人姓名／照片預留型別 |
| `src/components/sections/about/` | 區塊視覺與語意；使命、願景保有兩個 Section |
| `src/config/navigation.ts` | 必要的 About 導覽及規劃路由狀態更新 |
| `src/components/sections/section-heading.tsx` | 僅必要、向後相容的 `titleLang` 擴充，不破壞首頁呼叫 |
| `scripts/build-github-pages.mjs` | 必要的 About 靜態產物、Metadata、資源與 Base Path 驗證 |
| `src/app/icon.svg`／既有 Logo 資產 | 沿用提供素材；若修正實際圖示載入問題，只作必要整合並保留原稿 |
| `README.md`、`AGENTS.md`、`docs/98_decisions/implementation-notes.md` | 追加實際任務與操作紀錄，保留前置任務歷史 |
| `docs/about-implementation.md` | 本 Task 獨立實作與測試報告 |
| `docs/screenshots/task004-about-*.png` | 本次實際網站截圖 |

可以依複雜度合理調整檔案分拆，但 Page／Config／Components 職責必須清楚。不修改文件 Repository，不任意變更既有網站、Design Tokens、Logo 來源、Dependencies、lockfile 或 GitHub Actions。

不得提交 `.next/`、`out/`、`node_modules/`、暫存測試檔、機密或本機環境檔。此次 Task 001–006 文件骨架重構只允許修改六份指定 Task 規格；此章列出的開發檔案與報告不因此獲得修改授權。

## 10. Implementation Procedure

以下是執行 Task 004 功能開發時的順序，不是要求本次文件整理重跑開發：

1. 檢查 Repository、Branch、工作目錄與最新 `main`，確認 Task 003 已合併、首頁正常及 Pages 設定。缺少前置條件即停止回報，不整合未核准分支。
2. 完整閱讀本文件、README、AGENTS、相關 Task 原稿、Design System、歷史紀錄、About 報告與 Week 02 文件，記錄實際版本及衝突。
3. 以經確認的最新 `main` 建立或切換 `feature/website-about-page`，保留既有未提交工作。
4. 核對九區塊文案及 `src/config/about.ts` 的型別，保留未確認姓名／照片為空設定。
5. 以共用 Design System 實作或調整 About 區塊、Metadata、真實 CTA 及必要導覽；不新增後端或假資料。
6. 先完成 Responsive、語意、鍵盤、Focus、Reduced Motion 與 Pages Base Path 整合。
7. 實際執行 `npm ci`、`npx tsc --noEmit`、`npm run lint`、`npm run build`、`npm run build:pages`。若設定要求調整命令，先檢查 `package.json` 並記錄原因。
8. 啟動一般 production 網站及獨立 Pages 靜態產物，執行第 11 節全部適用驗收，擷取本次截圖。Pages 產物不能以一般 `npm run start` 取代靜態服務；由 Pages 切回一般伺服器前重新建置一般 Build。
9. 發現失敗時先修正，記錄原因，再以最終程式碼重新執行完整適用驗收，不沿用 Task 001–003 或先前中間版本的結果。
10. 更新獨立實作報告與本次交付資料，檢查 Git Diff、影響範圍與產物／機密排除。
11. 建立 Conventional Commit、Push 功能分支並建立對 `main` 的 Pull Request；確認實際 CI Checks 與交付狀態，不自動合併。
12. 以繁體中文提供功能、實際驗收、截圖、Commit、PR、CI 與未完成事項的最終報告；發布狀態另依實際授權與證據確認。

## 11. Testing & Acceptance Criteria

### Test Status Definitions

適用性與執行狀態分開記錄：`Required`、`Optional`、`Not Applicable` 表示測試是否適用；以下五個值才是執行狀態。所有待執行項目的初始狀態為 `PENDING`。

| 狀態 | 意義與記錄規則 |
| --- | --- |
| PENDING | 尚未執行；記錄待辦事項。Optional 選擇不執行時，保留此狀態並說明原因，不因此改為 N/A。 |
| PASS | 已實際執行且符合預期，附上可追溯證據。 |
| FAIL | 已實際執行但未符合預期，記錄原因、影響、修正與重驗結果。 |
| BLOCKED | 因外部服務、權限、素材或環境條件，無法開始或完成驗收；記錄實際阻礙及解除條件，不冒作 N/A。 |
| N/A | 經本次適用性判定確認不適用，記錄理由與判定依據；不能用來掩蓋未執行、失敗或外部阻礙。 |

歷史報告中的 `NOT RUN` 僅保留原始寫法；本次正式執行統一使用 `PENDING`。若測試已產生不符合預期的結果，保留 `FAIL` 與外部原因，不因外部原因改寫成 PASS。

### 適用性與狀態

`Required` 為必要驗收；`Optional` 依實際範圍補充；`Not Applicable` 必須記錄原因，不得以不適用冒充通過。下表是本規格的待執行門檻，**所有狀態皆為 PENDING**；即使有歷史報告，也只能依新一輪實際驗收，在獨立報告記錄上述五種執行狀態及證據；不適用的 N/A 必須附理由。本次文件整理不執行下列程式與瀏覽器測試。

### Code Quality 與 Build

| 驗收項目 | 適用性 | 理由／精確斷言 | 狀態 |
| --- | --- | --- | --- |
| `npm ci` | Required | Node.js 24.x／既有 npm 與 lockfile 可安裝；不得為通過而任意改套件版本 | PENDING |
| `npx tsc --noEmit` | Required | Strict TypeScript、區塊 Props 及創辦人 nullable 設定通過，記錄 Exit Code | PENDING |
| `npm run lint` | Required | 使用既有規則，記錄錯誤／警告與 Exit Code | PENDING |
| `npm run build` | Required | 一般 Next.js production Build 成功，保留現有頁面及開發路由保護 | PENDING |
| `npm run build:pages` | Required | Pages 靜態匯出成功，About 不依賴 Server Runtime；不可用一般 Build 代替 | PENDING |

### Functional 與 Content

| 驗收項目 | 適用性 | 理由／精確斷言 | 狀態 |
| --- | --- | --- | --- |
| About HTTP Smoke Test | Required | 實際啟動的一般 production `/about` 及 Pages `/xk-website/about/` 回應 HTTP 200，內容為 About | PENDING |
| 九個區塊與標題 | Required | Hero、Who We Are、Mission、Vision、Capabilities、Approach、Founder、Commitment、CTA 順序正確；Mission／Vision 各有 Section／H2 | PENDING |
| 五類能力與技術 | Required | 第 6 節五類及各項技術完整，含 Spring AI；不描述成官網實際安裝清單 | PENDING |
| 五階段流程 | Required | Understand、Analyze、Architect、Develop、Deliver & Improve 及原文說明完整，順序正確 | PENDING |
| 創辦人與品牌事實 | Required | 一人全職經營定位正確；姓名／照片未確認時不顯示假資料，Founder Role、六項 focusAreas 與介紹依第 6 節 | PENDING |
| Vision／Commitment | Required | 四項方向是未來規劃，四項 Commitment 是服務理念；無產品、規模或成果已達成之虛構敘述 | PENDING |
| Homepage Regression Test | Required | 首頁、既有有效錨點與靜態資源正常；不因共用元件或導覽更新出現 Regression | PENDING |
| All Navigation Links Test | Required | Header、Footer、MobileNavigation 的 About 導向正確；所有有效站內、跨頁及頁內錨點可操作，不連未實作頁 | PENDING |
| About CTA | Required | 「了解服務」到 `/#services`，「聯絡 XK」到 `/#contact`，一般／Pages 模式均能定位真實首頁區塊 | PENDING |
| 手機導覽 | Required | 開關、Accessible Name、`aria-expanded`、Escape、選取連結後導向與焦點操作延用正常 | PENDING |
| 停用控制項 | Not Applicable | About 不新增需停用的表單或提交功能；不為測試創造假控制項。如實際範圍加入原生 disabled 控制，須改列 Required 並驗證不可啟動 | PENDING |
| 表單／API／Authentication 功能 | Not Applicable | 本 Task 不建立聯絡表單、Contact API 或登入，不捏造提交成功／失敗流程 | PENDING |

### Responsive

| Viewport／項目 | 適用性 | 理由／精確斷言 | 狀態 |
| --- | --- | --- | --- |
| Small Mobile — 320px | Required | About／首頁無水平溢出、文字重疊、卡片超出；Mobile Navigation、CTA 可操作 | PENDING |
| Mobile — 375px | Required | 中文換行自然、卡片間距一致、Logo 不失真，流程垂直，CTA 不重疊 | PENDING |
| Tablet — 768px | Required | 區塊分欄、留白及 Header／Footer 不超出容器，閱讀順序正確 | PENDING |
| Desktop — 1440px | Required | 五階段橫向流程、標題與能力分類正常；實際檢視桌面版 | PENDING |
| Large Desktop — 1920px | Required | Container 最大寬度、Section 節奏、文字及圖案比例正常，無過度拉伸 | PENDING |
| 五種指定寬度共通 | Required | 無水平溢出／標題重疊、卡片間距一致、Logo 比例正確、文字可讀；不依賴 Hover | PENDING |

### Accessibility 與 Browser

| 驗收項目 | 適用性 | 理由／精確斷言 | 狀態 |
| --- | --- | --- | --- |
| axe WCAG 2／2.1 A／AA | Required | 實際掃描 About、首頁回歸及適用的展開手機選單；記錄規則、Viewport、範圍及 violations | PENDING |
| 語意及名稱 | Required | 單一 H1、正確 H2／H3、真實連結、可及名稱、圖片 alt、裝飾 `aria-hidden` | PENDING |
| 鍵盤與 Focus | Required | Skip Link、所有有效連結及手機導覽可用鍵盤操作，Focus 可見且不失去操作能力 | PENDING |
| Reduced Motion | Required | `prefers-reduced-motion` 下既有動畫／過渡／捲動設定受尊重，不能只靠檢視原始碼推定成功 | PENDING |
| 對比與人工視覺檢查 | Required | 文字背景對比、中文排版、Hero、流程、Logo、創辦人幾何圖像無遮蔽、失真或裁切 | PENDING |
| 輔助科技補充驗證 | Optional | 可取得螢幕閱讀器或其他輔助科技時補測，明確記錄環境與未覆蓋範圍，不宣稱完整認證 | PENDING |
| Console／JavaScript Runtime | Required | About 及首頁實際瀏覽無未解決 Console Error／Runtime Error，記錄發現與修正 | PENDING |
| Network／靜態資源 | Required | CSS、JS、字體、Logo、圖片與網站圖示成功載入；檢查 HTTP Status 與失敗請求 | PENDING |
| 一般 production 開發頁保護 | Required | 未明確啟用原有預覽旗標時，`/dev/design-system` 回應 HTTP 404，不出現在正式導覽 | PENDING |

### GitHub Pages 與證據

| 驗收項目 | 適用性 | 理由／精確斷言 | 狀態 |
| --- | --- | --- | --- |
| About 靜態 HTML | Required | `out/about/index.html` 存在，實際靜態服務 `/xk-website/about/` HTTP 200 | PENDING |
| Base Path 與跨頁 | Required | Header／Footer／手機導覽、About CTA、Logo、CSS／JS／字體資源均支援 `/xk-website/`，無重複或遺失前綴 | PENDING |
| About Metadata | Required | 指定 Title／Description、Canonical／Open Graph URL 正確指向品牌網域 `/about`，無 Pages Base Path／Query／Fragment；保留 `noindex, nofollow` | PENDING |
| 404／`.nojekyll`／開發路由 | Required | 匯出 404 正常、`.nojekyll` 存在、開發驗收頁未被公開匯出；維持首頁資源及路由 | PENDING |
| 五份網站截圖 | Required | 第 12 節指定檔案來自本次實際網站，包含桌面、手機、能力、流程與頁尾 | PENDING |
| PR／CI 紀錄 | Required | 核對本次功能 PR 的實際 Checks、Run／Commit 對應及狀態，不把舊 Run 當成本次成功 | PENDING |
| 公開發布驗證 | Optional | 只在另獲發布授權且實際部署後查驗公開 URL、Commit 與 Run；未發布不得填已部署 | PENDING |

### Test Failure Policy

- `FAIL` 不得標記為 `PASS`，原始失敗與重驗紀錄均須保留。
- 發現問題必須記錄原因、影響範圍及修正方式；可修正的問題應先修正，再重新執行相關測試及必要回歸。
- 無法修正的問題必須列入報告的 Known Issues，註明嚴重程度、交付影響、目前狀態及後續處理方式。
- 存在阻礙交付的 `FAIL` 或必要驗收的 `BLOCKED`，不得宣稱任務完整通過。交付須符合原規格；不適用項目只有在附上理由與依據後才能記為 `N/A`。
- 不得透過跳過測試、降低驗收標準、隱藏錯誤或展示舊成功結果取得 `PASS`。
- 外部服務、權限或環境造成的阻礙，必須記錄實際原因、發生時間、影響測試及解除條件；不得虛構執行結果。

## 12. Test Report & Evidence

每次 Task 004 功能實作／重新驗收都必須在獨立報告 [docs/about-implementation.md](../reports/about-implementation.md) 記錄實際結果。保留原有時間點與歷史快照，新增執行紀錄時註明基準與範圍，不把本規格表格或前置任務結果當成新一輪 PASS。

報告至少包含：

- Repository、Base／Feature Branch、實際 Commit、Task 003 合併前置檢查、文件來源與版本。
- 測試日期、Node.js／npm／OS、瀏覽器、axe 等實際環境；一般 Next.js 或 Pages 靜態模式、URL 與 Base Path。
- 每項完整測試指令、實際 Exit Code、PENDING／PASS／FAIL／BLOCKED／N/A 狀態、測試範圍與必要輸出；Required／Optional／Not Applicable 的適用性另列。未執行、不適用或受阻項目依第 11 節各記錄理由及證據。
- TypeScript、ESLint、兩種 Build、About HTTP、首頁回歸、所有導覽與跨頁錨點、靜態輸出及資源驗證。
- 320／375／768／1440／1920px 五種指定 Responsive 寬度、手機／桌面流程與 Logo 比例、人工視覺、鍵盤、Focus、Reduced Motion 的實際觀察。
- axe WCAG 2／2.1 A／AA 的頁面、狀態、規則、結果及限制；Browser Console／Runtime／Network 與 HTTP 錯誤紀錄。
- 發現問題、修正原因、影響檔案、最終程式碼上的完整重新驗收結果；不能只記修正前或中間版本的通過紀錄。
- 真實網站截圖、檔案路徑、截圖尺寸／Viewport、未完成事項、已知限制與待確認資訊。
- 實際 Commit、PR URL、CI Checks／Run ID 及發布狀態；沒有證據就不得宣稱已合併或已發布。

不得沿用 Task 001、002、003 的驗收結果代替本次測試；自動 axe 通過不等同完整無障礙、螢幕閱讀器或所有輔助科技認證。

至少提供以下五份截圖，必須來自本次實際執行網站，不使用示意圖：

| 內容 | 指定檔案 | 狀態 |
| --- | --- | --- |
| About Desktop | `docs/screenshots/task004-about-desktop.png` | PENDING |
| About Mobile | `docs/screenshots/task004-about-mobile.png` | PENDING |
| Core Capabilities | `docs/screenshots/task004-about-capabilities.png` | PENDING |
| Our Approach | `docs/screenshots/task004-about-approach.png` | PENDING |
| Footer | `docs/screenshots/task004-about-footer.png` | PENDING |

### Evidence Requirements

每項測試使用唯一 Test ID，盡可能完整提供下列欄位；無法取得的證據須在 Notes 說明實際原因。預期結果與實際結果分欄記錄，不得只寫「測試通過」而沒有可追溯的驗收依據。

| 欄位 | 說明 |
| --- | --- |
| Test ID | 本次報告內唯一且穩定的測試識別碼，可供問題、截圖與重驗紀錄引用。 |
| Test Item | 測試項目、對應第 11 節要求、適用性及範圍。 |
| Command / Procedure | 實際執行的完整指令、參數或人工操作步驟。 |
| Environment | OS、Node.js、npm、Browser 與工具版本；附執行時間、URL、建置模式、Base Path、Viewport 及受測程式碼版本。 |
| Expected Result | 執行前依規格確認的預期結果，不因失敗而降低標準。 |
| Actual Result | 本次實際觀察到的結果、錯誤、數值及測試範圍。 |
| Exit Code | 真實退出代碼；人工操作或未啟動的命令填「不適用」並附原因，不捏造 0，且不因此把整項 Status 改為 N/A。 |
| Status | 僅使用 PENDING / PASS / FAIL / BLOCKED / N/A，依第 11 節定義判定。 |
| Evidence | 對應的 Log、Screenshot、HTTP Response、Actions run／job 或其他可追溯證據位置；無實際檔案不建立假連結。 |
| Notes | 問題、限制、適用性理由、Known Issues、修正及重驗 Test ID／證據。 |

### Report Completion Gate

- 獨立實作／測試報告的本機驗收內容必須在建立 PR 前完成，並與功能程式碼一併納入該 PR；不得在缺少本機報告時宣稱可完整交付。
- 報告須記錄受測程式碼的 Commit 或 tree／diff、測試時間及範圍，並在 PR 對照實際提交版本。最後一次本機測試必須對應實際提交的程式碼；不能引用舊版本結果冒充現版驗收。
- 後續修改程式碼時，必須重跑受影響測試與必要回歸，同步更新報告、截圖及證據，再確認最終程式碼版本一致。僅新增報告或遠端結果時，也須確認受測程式碼未改變並檢查文件連結。
- PR CI、PR Review、合併後 main CI、部署與公開網址驗證尚未發生時，如實保留 `PENDING` 並說明階段；實際發生後補上真實證據，不為了 PR 前完成報告而預填成功。

## 13. Git & Pull Request

Task 004 功能開發保留以下工作流程：

| 項目 | 規格 |
| --- | --- |
| Feature Branch | `feature/website-about-page` |
| Base | 經確認的最新 `main` |
| 建議 Commit | `feat(about): implement XK about page` |
| PR Compare | `feature/website-about-page` |
| PR Base | `main` |
| Commit SHA／PR URL／CI Run ID | 以實際 Git／GitHub 紀錄填入獨立報告，不預填或虛構 |

Commit 前檢查完整 Git Diff、非預期修改、產物及機密；不直接修改或 Push `main`。完成 Conventional Commit、Push 功能分支、建立 PR 待審核並確認 CI Checks；不得自行合併或未經授權發布。

PR Description 必須包含實作內容、新增及修改檔案、Design System 使用方式、SEO 設定、GitHub Pages 相容性、實際測試結果、截圖及尚未完成事項。CI 未執行／未結束／失敗應如實回報，不用本機結果代替遠端狀態。

本章規範 Task 004 功能任務。此次六份規格的文件整理交付另依當次使用者明確授權處理，不把文件整理的 Commit／Merge 當成重新執行 Task 004 的成果。

### Review, Merge & Deployment Boundaries

下列階段各自記錄狀態與證據，不能互相替代；本機／PR 交付不要求執行尚未授權的合併或發布。

| 階段 | 必須確認的依據與界線 |
| --- | --- |
| 本機開發與驗收 | 第 11–12 節適用檢查、受測程式碼版本、實際結果與獨立報告。 |
| Feature Branch Commit | 已提交並推送的實際 SHA 與完整 Diff，對照報告中的受測程式碼；Commit 本身不代表 PR CI 通過。 |
| PR CI 驗收 | 本次 PR head 的實際 run／job、建置與 artifact；Deploy SKIPPED 不代表正式部署成功。 |
| PR Review | 記錄實際審查狀態、意見及處理結果；CI 成功不等於審查通過。 |
| 使用者授權合併 | 取得明確授權後才可合併，並記錄真實 PR／Merge SHA／時間；未授權時保持待審，不自行合併。 |
| 合併後 main CI | 若已獲授權合併，核對 Merge SHA 對應的 main run／jobs，不沿用 PR CI 結果。 |
| 正式部署與公開網址驗證 | 分別確認部署工作成功，以及實際公開 URL 的 HTTP、頁面內容、靜態資源、Base Path 與必要 Smoke；僅部署成功而未檢查公開 URL 時，公開驗證仍為 PENDING。 |

不能把 PR CI 通過、artifact 產生或 PR 合併直接視為正式網站部署成功。未獲合併／發布授權，或未取得部署及公開 URL 證據時，最終報告須分別說明實際狀態，不更改既有部署條件來取得成功結果。

## 14. Deliverables

以繁體中文提交完整 Task 004 執行報告，至少交付：

- Repository Inspection、Task 003 合併狀態、Base Branch／Commit、Feature Branch 及 Documentation Inspection。
- 實際完成的 `/about` 九區塊、品牌內容、Mission／Vision、能力、流程、無未確認個資的創辦人介紹、Commitment 與真實 CTA。
- 實際新增／修改檔案、共用 Design System 使用方式、Header／Footer／MobileNavigation 更新與首頁保護結果。
- About 專屬 SEO Metadata、Responsive、Accessibility、一般 Build 與 GitHub Pages 相容性。
- [docs/about-implementation.md](../reports/about-implementation.md) 的獨立實作及測試報告，涵蓋第 11、12 節所有適用項目的實際結果、Exit Code、修正與重驗。
- 五份指定截圖清單與實際檔案位置。
- 真實 Commit SHA、Pull Request URL、CI 結果，以及是否發布的證據或未發布說明。
- 尚未完成、未確認的資訊、限制、需使用者決策事項與後續工作。

以上是待交付要求，不是已完成宣告；新一輪交付狀態依實際紀錄確認。

## 15. Out of Scope & Future Work

不開始 Backend、Spring Boot、PostgreSQL、Docker Backend、Separate API Server、Contact API、CMS、Authentication 或 Analytics 開發，不變更已確認的品牌、商業或技術決策。

不在此任務虛構或補造創辦人姓名、照片、學歷、年資、證照、工作經歷、法人、辦公室、員工團隊、客戶案例、數據或成效保證。姓名與照片只預留設定；取得確認與本人授權後，照片呈現需另行實作及驗收。

未確認聯絡管道、假表單、AI SaaS 產品、其他尚未建立內頁、最終 Logo 核准、Open Graph Image、正式網域／DNS 與搜尋索引開放，均按後續授權與任務處理。Vision 的發展方向不等於已完成商業成果；未核准規劃不得當成公開事實。

既有實作的歷史限制、未完成事項及套件相容性紀錄保留於對應報告，不為此次文件整理修改程式、Dependencies、lockfile、Workflow 或文件 Repository。

## 16. Final Delivery Checklist

以下為 Task 004 功能任務的待驗收清單。所有項目目前標示 PENDING；不得因歷史任務已完成，或此次只整理文件，就勾選新驗收已通過。

執行狀態依第 11 節統一使用 `PENDING`、`PASS`、`FAIL`、`BLOCKED`、`N/A`。僅有證據的 `PASS` 可勾選；其餘保持未勾選，`N/A` 附判定理由且不視為缺少適用驗收。必要項目仍為 `PENDING`、`FAIL` 或 `BLOCKED` 時，不得宣稱完整通過。以下是規格初始清單，本輪文件修訂不代填功能結果。

- [ ] PENDING — 已核對 Repository、最新 `main`、乾淨工作目錄及 Task 003 合併前置條件。
- [ ] PENDING — 已以 `feature/website-about-page` 進行工作，未修改或直接 Push `main`。
- [ ] PENDING — 已閱讀必要文件、記錄來源版本並說明規格衝突。
- [ ] PENDING — `/about` 九個區塊完整，Mission 與 Vision 保有獨立語意 Section。
- [ ] PENDING — 五類能力／技術、五階段流程、四項 Commitment 與原定文案完整。
- [ ] PENDING — 創辦人介紹只包含確認內容，姓名／照片預留無虛構資料，Vision 清楚表達未來方向。
- [ ] PENDING — CTA、Header、Footer、MobileNavigation 及首頁既有錨點全部有效。
- [ ] PENDING — 沿用 XK Design System、字體、Logo 原稿與暫定狀態，沒有平行系統或 Backend。
- [ ] PENDING — `npm ci`、TypeScript、ESLint 以本次最終程式碼實際通過並記錄 Exit Code。
- [ ] PENDING — 一般 `npm run build` 與 `npm run build:pages` 實際通過。
- [ ] PENDING — About HTTP、首頁回歸、所有導覽與跨頁功能測試完成。
- [ ] PENDING — 320／375／768／1440／1920px Responsive 與流程方向驗收完成。
- [ ] PENDING — axe、語意、鍵盤、Focus、對比、Reduced Motion 及必要人工檢查完成，限制如實記錄。
- [ ] PENDING — Browser Console／Runtime／Network／靜態資源／HTTP 驗收完成。
- [ ] PENDING — About 靜態輸出、Base Path、Metadata、404、`.nojekyll` 與開發路由保護正常。
- [ ] PENDING — 保留 `noindex, nofollow`，沒有虛構 OG 圖片、Rating、Review 或 Awards。
- [ ] PENDING — 五份指定截圖來自本次實際網站，已檢視並列出檔案位置。
- [ ] PENDING — 獨立實作／測試報告包含適用性、實際 PENDING／PASS／FAIL／BLOCKED／N/A 狀態、環境、修正與完整重驗，未沿用舊結果。
- [ ] PENDING — Git Diff 已檢查，沒有提交 `.next/`、`out/`、相依套件、暫存檔或機密。
- [ ] PENDING — Conventional Commit、功能分支 Push、對 `main` 的 PR 與 CI 結果確認完成，識別碼皆有證據。
- [ ] PENDING — 繁體中文最終交付報告完整，未完成事項與發布狀態如實說明；未自動合併或未經授權發布。
- [ ] PENDING — Test Failure Policy 已遵守，失敗、阻礙與 Known Issues 有完整記錄，沒有阻礙交付的未解決必要驗收。
- [ ] PENDING — 每項測試的 Test ID、預期／實際結果、狀態與可追溯證據已記錄，沒有以預期或舊結果代填。
- [ ] PENDING — 獨立報告已在 PR 建立前完成並納入同一 PR，最後測試、後續重驗與實際提交的程式碼一致。
- [ ] PENDING — 本機、Feature Commit、PR CI、PR Review、合併授權、main CI、部署與公開 URL 驗證分別記錄；未發生階段維持 PENDING 並說明，沒有冒稱已發布。
