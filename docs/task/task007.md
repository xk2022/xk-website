# Task 007 — Portfolio 技術作品集

## 1. Task Overview

正式建立 XK 的 Portfolio 技術作品集，以作品背景、問題、規劃方案、實際技術與可查證的開發狀態呈現技術探索。Portfolio 與 Services（能提供的服務）、Solutions（需求組合方向）分開；自製 Demo 不等於真實客戶委託。

本輪僅撰寫規格，**不實作頁面、不建立展示系統、不建立報告或假截圖**。本 Task 的功能、測試、Commit／PR／CI 及部署初始均為 `PENDING`；只有後續明確授權執行 Task 007 才開始功能工作。

| 項目 | 規格 |
| --- | --- |
| 品牌 | Xplore Kaleidoscope（XK） |
| 標語 | Explore Possibilities. Create Digital Value. |
| 技術標語 | Building Digital Solutions with Web, Java & AI. |
| 主要語言 | 繁體中文 `zh-TW`，保留技術英文 |
| 目標 | `/portfolio` 與三個靜態展示介紹詳頁；不執行案例中的 Backend |
| 獨立未來報告 | `docs/reports/task007-implementation.md`，目前不存在，不建立假連結或預填結果 |

## 2. Repository & Prerequisites

| 項目 | 規格／前置條件 |
| --- | --- |
| Website Repository | `xk2022/xk-website`，唯一可修改的 Repository |
| Base Branch | 正式開發時最新已合併 `main`；不得直接修改或 Push main |
| 研究快照 | Website `e2a8f5a33f24d1ea65a3afc3780014a33c204528`，不是未來固定 Base |
| Feature Branch | `feature/website-portfolio-page` |
| Documentation Repository | `xk2022/xplore-kaleidoscope`，`main@95ef1275a46ace76e11f668178ca881087483398`，只讀 |
| 必要依賴 | Task 001–005 已合併的 Design System、首頁、About、Services 與 Pages 架構 |
| 可平行任務 | Task 006 與 Task 007 可平行；沒有 Solutions 也能交付 Portfolio，不合併未核准功能 |
| 條件依賴 | Task 008 未完成時 CTA 沿用 `contactNavigation.href` 的有效首頁錨點；Task 009 的法律工作不由 Portfolio 代辦 |

執行前重新檢查 remote、branch、Working Tree、最新 main、前置成果祖先關係、路由與套件版本；保留使用者修改。確認來源可讀及每項發表狀態，不將來源段落的現在式、Week 03 清單或先前發布當成作品完成證據。前置成果未合併時停止依賴工作並回報，不自行整合分支。

## 3. Reference Documents

先完整閱讀 [AGENTS.md](../../AGENTS.md)、[README.md](../../README.md)、[Task 001](task001.md)、[Task 002](task002.md)、[Task 003](task003.md)、[Task 004](task004.md)、[Task 005](task005.md)，以及 [歷史紀錄](../implementation-notes.md)、[Design System](../reports/brand-design-system.md)、[首頁](../reports/homepage-implementation.md)、[About](../reports/about-implementation.md)、[Services](../reports/services-implementation.md) 與 [Pages 指南](../reports/github-pages-deployment.md)。歷史替代原稿已刪除時，只使用原有固定歷史快照，不復原刪檔。

檢查 `src/config/navigation.ts`、`contact.ts`、`services.ts`、`site.ts`，Header／Footer／Mobile Navigation、現有路由、素材、`scripts/build-github-pages.mjs`、Next 設定與 workflow。研究快照的 `verifiedContactChannels` 為空，Footer 的作品案例仍為規劃文字，不能當作已實作連結。

下表 Repository 均為 `xk2022/xplore-kaleidoscope`、branch `main`、固定 Commit `95ef1275a46ace76e11f668178ca881087483398`；本輪已完整讀取 Week 03 六份原文。正式實作重新查最新版本、核對差異與 Blob；來源存在不表示已核准發表、已完成或有客戶授權。

| ID | 固定版本來源 | Git Blob SHA | 採用內容／核准狀態 |
| --- | --- | --- | --- |
| P01 | [doc/01_business-plan/week-03/01_portfolio-strategy_XK 技術作品展示策略.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-03/01_portfolio-strategy_XK%20%E6%8A%80%E8%A1%93%E4%BD%9C%E5%93%81%E5%B1%95%E7%A4%BA%E7%AD%96%E7%95%A5.md) | `88103f938cfb421878de414194db4b981ec5c024` | §2／3／5–7：三個自製展示計畫、列表／詳頁與圖片原則；規劃，不是完成核准。 |
| P02 | [doc/01_business-plan/week-03/02_case-01-corporate-website.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-03/02_case-01-corporate-website.md) | `c9b151d01a7616abb939dd9747d704428d0bdd8c` | §1–3／9／19：企業網站情境與技術範圍；Contact API 與完整 MVP 仍是目標。 |
| P03 | [doc/01_business-plan/week-03/03_case-02-java-enterprise-system.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-03/03_case-02-java-enterprise-system.md) | `4b338c79ac83db44307832754404a28496303189` | §2／5／20–23：Java 管理系統與後續能力；無可查的完成／客戶證據。 |
| P04 | [doc/01_business-plan/week-03/04_case-03-api-integration-platform.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-03/04_case-03-api-integration-platform.md) | `be1dbacf99ac76d5032ca6cecf221a9a000ff89b` | §2／5.5／6／21–22：模擬 API 整合；AI／n8n 為後續，無 SLA。 |
| P05 | [doc/01_business-plan/week-03/05_portfolio-content.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-03/05_portfolio-content.md) | `e9aae178cdcef6afca313fde3cd501bd533ee028` | §3／5–6／11：三案 Planned／In Development、資料欄位、圖片權利、Live 門檻；未核准產品目錄。 |
| P06 | [doc/01_business-plan/week-03/README.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-03/README.md) | `aaf4dae6b3e80f485fd9a98dd76637a10dc9e561` | §3／7–10：三個 Demo 與一人維護原則；KPI 及清單均為目標。 |
| P07 | [doc/01_business-plan/week-01/02_service-catalog.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-01/02_service-catalog.md) | `cc1c2bacbc1f5367667005a9d4a3b288fc8cfd0c` | 服務對應與適用情境；不用建議價格或 SaaS 規劃充當成果。 |
| P08 | [doc/01_business-plan/week-02/05_website-sitemap_ 官方網站資訊架構與網站地圖.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-02/05_website-sitemap_%20%E5%AE%98%E6%96%B9%E7%B6%B2%E7%AB%99%E8%B3%87%E8%A8%8A%E6%9E%B6%E6%A7%8B%E8%88%87%E7%B6%B2%E7%AB%99%E5%9C%B0%E5%9C%96.md) | `1f1b4584bbe06f0079542eedffa52215024da0f7` | Portfolio 目的與導覽；舊長服務 URL 不取代實際路由。 |
| P09 | [doc/01_business-plan/week-02/08_website-architecture_官方網站 Next.js 技術架構設計.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-02/08_website-architecture_%E5%AE%98%E6%96%B9%E7%B6%B2%E7%AB%99%20Next.js%20%E6%8A%80%E8%A1%93%E6%9E%B6%E6%A7%8B%E8%A8%AD%E8%A8%88.md) | `15c1483bf47be33bc29b755a220fb465b5dd8a1a` | 集中資料、RSC、Metadata 原則；不採舊 monorepo／Backend。 |
| P10 | [doc/01_business-plan/week-02/09_website-mvp_官方網站 MVP 開發規格.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-02/09_website-mvp_%E5%AE%98%E6%96%B9%E7%B6%B2%E7%AB%99%20MVP%20%E9%96%8B%E7%99%BC%E8%A6%8F%E6%A0%BC.md) | `5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d` | 分期與真實展示邊界；不是開發展示系統的授權。 |

採用優先順序：當次使用者明確指示、已合併網站架構及品牌決策、本規格、經核對的來源、舊規劃。P01／P06 的 Customer／Product／Order 摘要與 P03 的 Users／Departments／Employees／Customers／Projects／Tasks 不一致，不相加成完整 ERP。P05 的 n8n 摘要不證明 P04 已整合後續 AI／n8n。

## 4. Scope & Requirements

必須完成：四條路由、三個展示規劃記錄、分類與技術標籤、真實狀態、背景／問題／方案／技術說明、素材來源處理、相關 Services、有效 CTA、共用導覽、Metadata、Pages、響應式及實際驗收。

初始三案可在明確標示 Planned 的前提下介紹其規劃；不要求為了填滿作品集而建立 Java 系統、資料庫、API 或假 Dashboard。無實作證據時，功能與技術使用「規劃」語氣，實作成果區顯示尚未提供證據，不製造「已打造」「已提升效率」的聲明。

保留所有已合併頁面及錨點。Task 006 是否已完成依實際 main 決定，不強制串行。不得新增服務內頁、CMS、Authentication、Analytics、Backend、展示 API、iframe 執行環境、依賴或新的商業承諾。

## 5. Information Architecture & UX

### 5.1 路由與資訊架構

| 路由 | 固定用途 |
| --- | --- |
| `/portfolio` | 六個主 Section：`portfolio-hero`、`portfolio-introduction`、`portfolio-projects`、`portfolio-technology`、`portfolio-transparency`、`portfolio-next-step` |
| `/portfolio/corporate-website` | Case 01 的靜態介紹，不等同其整套規劃已完成 |
| `/portfolio/enterprise-management` | Case 02 的靜態介紹，不執行管理系統 |
| `/portfolio/integration-hub` | Case 03 的靜態介紹，不執行外部整合 |

P05 另寫 `/portfolio/enterprise-integration-hub`，本任務選擇 P01 與 P02 使用的 `integration-hub` 作 canonical slug。研究時無這些詳頁，不為未發布的另一寫法建立假導向；若執行時已有公開 URL，先盤點並記錄遷移方案，不任意改已公開 slug。

Overview H1：**技術作品與展示規劃**；英文標題 `Technical Portfolio`。介紹必須說明「以下為 XK 自製技術展示與規劃，非客戶委託案例；各項以標示狀態與實際證據為準。」Hero CTA 指向 `#portfolio-projects` 與 `/services`。品牌標語沿用 `siteConfig`。

Projects 依序呈現三卡，分類為 Website Development、Java Enterprise Solutions、System Integration；手機一欄、平板兩欄、桌面三欄。卡片含名稱、分類、簡介、Self-Initiated Demonstration Project、狀態、已實作／規劃中技術區分、實際封面或誠實的無素材呈現及詳頁連結。分類使用標籤或清單，不製造沒有篩選行為的按鈕。

### 5.2 詳頁共用結構

每個詳頁一個 H1，依序八個主 Section：`project-overview`、`project-challenge`、`project-solution`、`project-technology`、`project-evidence`、`project-status`、`project-services`、`project-next-step`。H2 為區塊標題，列表／子項 H3。背景、二至三項一般問題、建議方案與架構說明、規劃／已實作功能、技術、素材、狀態證據及相關服務缺一不可。

Planned 的 Proposed Solution 與架構圖必須標示為規劃；`project-evidence` 可顯示「尚無可驗證的系統畫面」，不以假截圖填滿。所有詳頁有返回 Portfolio、相關 Services 與依現有 `contactNavigation.href` 決定的有效聯絡入口。不得因尚無 Live Demo 而放可點的假按鈕。

## 6. Content & Data Specification

### 6.1 三案資料與初始狀態

| slug | 名稱 | 來源／分類 | Related ServiceId | 初始資料界線 |
| --- | --- | --- | --- | --- |
| `corporate-website` | XK Corporate Website Showcase | P01／P02／P05／P06；Website Development | `website-development` | `PLANNED`；官網實際成果不自動等於整套 Case 01 完成 |
| `enterprise-management` | XK Enterprise Management System | P01／P03／P05／P06；Java Enterprise Solutions | `java-enterprise`、`system-integration` | `PLANNED`；模組分歧待確認，不承諾完整 ERP |
| `integration-hub` | XK Enterprise Integration Hub | P01／P04／P05／P06；System Integration | `system-integration`、`java-enterprise` | `PLANNED`；ERP／CRM 等為模擬情境，AI／n8n 為後續 |

### 6.2 狀態與證據 Gate

Project Status 與測試 Status 分開，不能把測試 PASS 當作品 Completed。所有三案保留 `Self-Initiated Demonstration Project`；此範圍不新增真實客戶案例。

| Project Status／可用性 | 必備證據與核准 | 不符合時 |
| --- | --- | --- |
| Planned（`PLANNED`） | 有規劃來源、可追溯內容；無程式碼或功能測試也不暗示已開始 | 保留規劃語氣與無系統畫面狀態 |
| In Development（`IN_DEVELOPMENT`） | 擁有人確認目前在開發；有相符 Repository／Commit、已實作範圍與未完成清單 | 保留 Planned，不依時間推升 |
| Completed（`COMPLETED`） | 擁有人確認明確的完成範圍；相符 source Commit、可重現功能／建置測試、交付邊界與實際素材 | 保留有證據的較低狀態；不能只憑 Markdown 結論或網站 HTTP 200 |
| Live Demo Available | 獨立於開發狀態；有擁有人授權的公開 URL、部署版本、HTTP／核心操作證據與安全的展示資料 | 不渲染 Live 連結，不能以 `#`、空 URL 或單純 disabled Link 代替 |

現有 XK 官網可作自製案例候選，但須由作品擁有人確認是否採用，並將範圍限定為實際合併的頁面、Design System 與部署模式；有可查 source／測試／部署時才可改 Completed Demo。不得將原規劃中的 Contact API、Portfolio、Vercel 或完整多語網站一併宣稱完成。實作新增 Portfolio 的驗收也不自動證明另外兩個展示系統已完成。

### 6.3 集中資料與素材

`src/config/portfolio.ts` 至少定義 `PortfolioSlug`、`PortfolioCategory`、`PortfolioProjectStatus`、`PortfolioProject`、`ProjectEvidence`、`ProjectMedia`。Project 具 slug、title、category、type 固定 demonstration、summary、businessContext、challenges、proposedSolution、plannedFeatures、implementedFeatures、plannedTechnologies、implementedTechnologies、status、statusEvidence、sourceRefs、serviceIds、media、sourceLink、liveDemo。`serviceIds` 重用既有 `ServiceId`；由 `serviceCategories` 解析名稱與 `/services#...`，不連 `/services/*`。

資料使用明確 readonly／`satisfies` 約束，不用 `any`。`sourceRefs` 含來源路徑／Commit／Blob 與支持章節；`sourceLink`／`liveDemo` 無核准目標時為 null，不發布私有 Repository 連結或 Secret。Page 僅組合與 Metadata；共用 ProjectCard／ProjectDetail 呈現資料，不複製三套頁面。

`ProjectMedia` 必含 src、alt、width／height、媒體類型（實際 screenshot／規劃 diagram）、來源、創作者或授權方、使用權依據、相符 source Commit、擷取日期與審核記錄。實際 screenshot 只能來自真實運行系統，遮除客戶／個資／Secret；Demo Data 必明標。規劃 diagram 不可冒稱系統已運行。沒有合法且可驗證的素材時 media 為空，使用既有品牌幾何或文字空狀態，非假人像／假產品圖，也不請求不存在檔案。

Completed／Live 展示優先依 P01 準備每案至少三張真實系統畫面；沒有足夠證據就不能以此品質等級宣稱完整展示。Planned 不要求製造三張假畫面；其素材測試記為 N/A 並說明，而 Portfolio 網頁自身的驗收截圖仍必須完成。

### 6.4 Pending Confirmation

| 項目 | 誰／何時確認 | 未確認時處理 |
| --- | --- | --- |
| 三案實作進度、完成範圍與 Live | 作品擁有人；發表或任何狀態升級前 | Planned；明示規劃，不顯示 Live |
| 以 XK 官網作 Completed Demo | 品牌／作品擁有人；選定該案例及撰寫成果前 | 不自動以官網取代完整 Case 01，不宣稱其餘 MVP 完成 |
| Case 02 管理模組分歧 | 作品擁有人與技術維護者；詳細描述實作範圍前 | 只寫來源共通情境與有依據的規劃，未證實功能不列已完成 |
| 圖片／架構圖、公開源碼及客戶授權 | 素材／作品權利人；加入 public 或外部連結前 | 空媒體／無連結；不建立客戶案例 |
| 聯絡或 Privacy 目的地 | 對應任務維護者；新增連結前 | 使用現有 contactNavigation／已存在頁面，不發布規劃路由 |

## 7. Design System & Technical Constraints

沿用既有 Next.js App Router、React、Strict TypeScript、Tailwind CSS 4、shadcn/ui、Lucide React、Node.js／npm 與 lockfile；實際版本以正式執行的 main 為準，不重建或升降級。預設 Server Components，不為三張卡加篩選器、輪播、Modal、iframe、追蹤或新 Dependencies。

重用 Section、Container、Card、Button、SectionHeading、XkLogo、BrandPattern、Inter／Noto Sans TC 與 Typography Utilities。八色固定為 Primary `#101A33`、Secondary `#3157D5`、Accent `#19B8D5`、Background `#FFFFFF`、Surface `#F5F7FB`、Foreground `#172033`、Muted `#667085`、Border `#E4E8F0`；用既有語意 Token，不重畫暫定 Logo 或改全域系統。

中文 SectionHeading 指定 `titleLang="zh-TW"`；Interactive Card 內不嵌套 Link／Button。圖片保留比例及實際尺寸，資訊圖提供 alt／必要文字說明，裝飾 `aria-hidden`。320／375 px 圖文依內容增高，不以固定方形裁切；表格在手機轉成可理解列表。沿用 Focus、Reduced Motion 與 Semantic HTML。

詳頁可採 `[slug]` Server Page 搭配明確的 `generateStaticParams`，只產生三個 registry slug；未知 slug 使用 notFound，不能 fallback 成另一案。依已安裝 Next.js 文件處理參數及 Metadata，不新增 API／Server Actions。

## 8. Navigation, SEO & Deployment

共用導覽新增 `/portfolio`，位置置於實際 Services／Solutions 之後、聯絡 CTA 之前；更新 `plannedRoutes` implemented。Footer 不再同時保留「作品案例（規劃中）」與新的重複入口；Header／Footer／Mobile Navigation 共用設定。既有首頁三個方案／五個服務、`/#contact` 及其他舊錨點保留，不強制新增首頁作品區或改寫未實作的 Solutions。

Overview Title／OG Title：`技術作品集 | Xplore Kaleidoscope`；Description／OG Description：`探索 XK 的網站、Java 企業系統與 API 整合展示規劃，了解各專案的背景、技術方向與實際開發狀態。`；Canonical／OG URL：`https://xplorekaleidoscope.com/portfolio`。

三詳頁 Title 使用 `{實際專案名稱} | XK 技術作品集` 的 absolute Metadata；Description 依該案規劃內容明確提到「自製展示規劃」與實際狀態，不複製成已完成成果。Canonical／OG URL 為品牌 Origin 加該 registry 路徑。HTML `zh-TW`、OG `zh_TW`、robots `noindex, nofollow`；不新增假 OG Image、Review／Rating／Awards Schema 或擅自開放索引。

保留一般 build 與 `build:pages` 雙模式。Pages 使用原有條件 `output: export`、`trailingSlash: true`、Base Path `/xk-website`，輸出 `out/portfolio/index.html` 與三個 `out/portfolio/{slug}/index.html`；Canonical 接受正常單一結尾斜線，不包含 Base Path、Query 或 Fragment。

站內導航使用 Next Link。public 圖片在 Server Component 透過可重用且與現有 Pages 設定一致的資產路徑處理，不能假設 Link 的前綴規則會自動修復圖片 src；優先重用實際存在的 helper，必要時新增小型 Server-side asset helper，禁止在元件散落硬編碼 `/xk-website`。確認靜態圖片不依賴 Next 圖片伺服器。

僅必要擴充 `scripts/build-github-pages.mjs`，驗證四頁存在、Metadata／robots／Base Path／引用資源、未知 slug 保護，保留所有既有頁、404、`.nojekyll` 與 dev payload 排除。不得更改 workflow、部署條件、Pages Source、DNS、Custom Domain 或現在啟用 Vercel；PR 只做 quality／pages-build，deploy skipped。

## 9. File Structure & Change Scope

以下為未來正式實作的建議範圍，不是本輪新增／修改成果；只有本輪規格文件可寫入。

| 動作 | 檔案／範圍 | 責任與限制 |
| --- | --- | --- |
| 新增 | `src/app/portfolio/page.tsx` | Overview Metadata、六區塊組合 |
| 新增 | `src/app/portfolio/[slug]/page.tsx` | 三案共用詳頁、static params、Metadata、未知 slug 404 |
| 新增 | `src/config/portfolio.ts` | 三案、狀態／來源／素材證據與型別 |
| 新增 | `src/components/sections/portfolio/` | hero、introduction、projects、technology、transparency、cta 與共用 project-card／project-detail |
| 條件新增 | `src/lib/asset-path.ts`、`public/images/portfolio/` | 只在需要且沒有等效 helper 時處理合法素材／Base Path；無圖片不造空路徑 |
| 必要修改 | `src/config/navigation.ts`、`src/components/layout/site-footer.tsx` | 正式 Portfolio 入口，移除重複規劃文字 |
| 必要擴充 | `scripts/build-github-pages.mjs` | 四 Portfolio 輸出與既有規則保護 |
| 正式實作文件 | `README.md`、`AGENTS.md`、`docs/implementation-notes.md` | 待授權開發時才更新／追加，不覆寫歷史 |
| 未來新增 | `docs/reports/task007-implementation.md`、`docs/screenshots/task007-*.png` | 真實報告與驗收圖；本輪不建立 |

不修改文件 Repository、案例系統／Backend Repository、依賴、lockfile、Next／Tailwind 設定、workflow、品牌原稿或帳號設定。不提交 `.next/`、`out/`、node_modules、臨時 QA 工具、秘密或未授權素材。檔案清單以未來完整 Diff 為準。

## 10. Implementation Procedure

1. 確認正式功能授權、最新 main、Task 001–005 合併與當下可用路由，保留 Working Tree；建立 `feature/website-portfolio-page`。
2. 完整讀來源與三案例差異，建立狀態／素材／公開連結 Gate；未確認先用有來源的 Planned 記錄，不替使用者升級狀態。
3. 實作三案 registry、型別、四路由與靜態參數、共用元件、相關服務、有效 CTA、必要導覽與 Validator。
4. 在最終程式碼完成後執行：

   ```sh
   npm ci
   npx tsc --noEmit
   npm run lint
   npm run build
   npm run start -- --hostname 127.0.0.1 --port 3040
   ```

   檢查 Portfolio 四路由及所有已存在頁面 HTTP／Metadata／導航；未知 slug、未知路由與預設 dev 頁 HTTP 404。停止一般 server 後執行：

   ```sh
   npm run build:pages
   portfolio_preview_dir=$(mktemp -d /tmp/xk-portfolio-preview.XXXXXX)
   mkdir -p "$portfolio_preview_dir/xk-website"
   cp -R out/. "$portfolio_preview_dir/xk-website/"
   python3 -m http.server 3041 --bind 127.0.0.1 --directory "$portfolio_preview_dir"
   ```

   使用未佔用埠，檢查 `/xk-website/portfolio/` 與三詳頁。兩個 build 共用 `.next/`，靜態產物不能交給 `npm run start`；重測一般 server 前重新一般 build。

5. 執行第 11 節全部適用驗收、修復與重驗、真實截圖及報告；先完成本機報告再建立 PR。
6. 核對完整 Diff、素材權利、來源狀態與測試版本，Commit／Push 功能分支、建立 PR 並核對本次 head 的 CI／artifact，不合併或發布。

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

### Portfolio-specific Acceptance Matrix

下列是未來實作要求；全部初始 `PENDING`，不得用本輪文件檢查或舊 Task 成果代填。

| Test ID | 適用性 | 標準／原因 | 狀態 |
| --- | --- | --- | --- |
| P07-Q01 | Required | `npm ci` exit 0，保留版本／lockfile；確保可重現依賴。 | PENDING |
| P07-Q02 | Required | `npx tsc --noEmit` exit 0；驗證三案 registry／狀態／資料型別。 | PENDING |
| P07-Q03 | Required | `npm run lint` exit 0；沿用零警告規則。 | PENDING |
| P07-Q04 | Required | `npm run build` exit 0，四新路由預先產生且一般 server 可用。 | PENDING |
| P07-Q05 | Required | `npm run build:pages` exit 0，四個 HTML 與 validator 通過。 | PENDING |
| P07-F01 | Required | Overview 六 Section、三卡／三分類、三詳頁各八 Section 與指定內容；未知 slug 404，不顯示錯誤案例。 | PENDING |
| P07-F02 | Required | 三案 type 明標 Demo，狀態與證據一致；刻意缺少證據不得成 Completed／Live，無假成果、數字或客戶。 | PENDING |
| P07-F03 | Required | Planned／In Development 的規劃與已實作技術分開；Case 02 模組差異、Case 03 AI／n8n 後續如實表達。 | PENDING |
| P07-F04 | Required | 逐一驗證所有已存在頁面的 Header／Footer／Mobile／卡片／詳頁／CTA、Services 錨點及深層刷新；外部 source／Live 只測核准目標。 | PENDING |
| P07-R01 | Required | 所有已合併公開路由＋四新路由 × 320／375／768／1440／1920 px。基準三舊頁加四新頁至少 35 個案例；若 Solutions 等已存在，一併加入並記錄實際 N × 5，不能沿用舊結果。 | PENDING |
| P07-R02 | Required | 手機一欄卡片、無水平溢出／裁切、技術與狀態可讀、圖片等比例、詳頁順序合理；375 px 觸控點卡片與選單。 | PENDING |
| P07-A01 | Required | 對上述頁面／五種指定寬度及 Portfolio 的手機展開選單執行 axe WCAG 2／2.1 A／AA；記錄案例與違規數並人工檢查。 | PENDING |
| P07-A02 | Required | Tab／Shift+Tab／Enter、Skip Link、Focus、卡片與 CTA、Escape／連結／外部點擊／桌面斷點選單關閉及焦點還原正常；無 nested interactive。 | PENDING |
| P07-A03 | Required | Reduced Motion 下過渡 0s／依原規則，所有資訊不依賴動畫。 | PENDING |
| P07-A04 | Not Applicable（預設） | 本頁不規劃停用操作；不能為測試增加假按鈕或 disabled Link。若實際出現原生停用操作，轉 Required 測試不能觸發及 Tab 略過。 | PENDING |
| P07-M01 | Required | 所有已使用圖檔存在、權利／source／Commit／alt／尺寸可查；無素材時真實空狀態、不發出失敗請求。 | PENDING |
| P07-M02 | Required（採 Completed／Live 時）／Not Applicable（未採用時） | 狀態／授權 Gate 通過後，必須驗證 Completed／Live 的實際核心流程及三張真實系統圖；未採該級時附不適用理由，不能假造畫面或略過已宣稱能力的驗收。 | PENDING |
| P07-B01 | Required | Console／Runtime／Network 無未處理錯誤，CSS／JS／字體／icon／已用圖片 HTTP 200；預期 404 另用獨立 HTTP 檢查。 | PENDING |
| P07-S01 | Required | 四頁 Title／Description／canonical／OG／語言／noindex 正確，未核准 OG 不出現；相關已存在頁仍受保護。 | PENDING |
| P07-G01 | Required | Pages Base Path／四 HTML／引用資源、404.html、.nojekyll、未知 slug／dev route 與 payload 排除及全部既有 validators 通過。 | PENDING |
| P07-CI01 | Required | 本次 PR head 的 quality／pages-build 成功、deploy skipped；下載 artifact 含四 Portfolio HTML／合法素材與其他已實作頁。 | PENDING |
| P07-X01 | Not Applicable | 不開發三個案例系統的 Backend／資料庫／API，也不驗不存在的真實客戶成果。 | PENDING |

### Test Failure Policy

- `FAIL` 不得標記為 `PASS`，原始失敗與重驗紀錄均須保留。
- 發現問題必須記錄原因、影響範圍及修正方式；可修正的問題應先修正，再重新執行相關測試及必要回歸。
- 無法修正的問題必須列入報告的 Known Issues，註明嚴重程度、交付影響、目前狀態及後續處理方式。
- 存在阻礙交付的 `FAIL` 或必要驗收的 `BLOCKED`，不得宣稱任務完整通過。交付須符合原規格；不適用項目只有在附上理由與依據後才能記為 `N/A`。
- 不得透過跳過測試、降低驗收標準、隱藏錯誤或展示舊成功結果取得 `PASS`。
- 外部服務、權限或環境造成的阻礙，必須記錄實際原因、發生時間、影響測試及解除條件；不得虛構執行結果。

## 12. Test Report & Evidence

未來獨立報告固定為 `docs/reports/task007-implementation.md`；本輪不建立。報告記錄 actual Base／branch／code tree 或 diff、來源 Commit／Blob、三案狀態 Gate、誰核對哪些公開內容、哪些仍 Pending Confirmation；已實作與規劃技術、圖片權利與來源、未知 slug 處理、全部測試結果／Exit Code／環境、修復及重驗、CI／artifact 與 Known Issues。

### Portfolio Screenshot Evidence

以下均是 Portfolio 網頁本身的驗收圖，不能冒充案例系統已完成的畫面；後者須另符合第 6 節素材 Gate。圖檔在正式驗收後才建立連結。

| 檔名（置於 docs/screenshots/） | 寬度與內容 |
| --- | --- |
| `task007-portfolio-desktop.png` | 1440 px，Overview 完整頁 |
| `task007-portfolio-mobile.png` | 375 px，Overview 完整頁 |
| `task007-portfolio-projects.png` | 1440 px，三張卡、Demo／狀態／技術標籤及無素材狀態 |
| `task007-corporate-website-detail.png` | 1440 px，Case 01 詳頁含真實狀態及範圍 |
| `task007-enterprise-management-detail.png` | 1440 px，Case 02 詳頁的規劃／證據界線 |
| `task007-integration-hub-detail.png` | 1440 px，Case 03 詳頁的模擬情境與服務連結 |
| `task007-portfolio-footer.png` | 1440 px，Footer 有效導覽 |

人工另外檢視 320／375 px 詳頁、卡片、狀態、長標籤、Logo 與圖片比例；記錄 PNG 實際尺寸、Viewport、取景、對應 source／status 及檢查結果，不只檢查檔案存在。

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

| 項目 | 正式實作交付規則 |
| --- | --- |
| Base / Feature Branch | 最新已合併 `main` / `feature/website-portfolio-page` |
| 建議 Commit | `feat(portfolio): implement XK technical portfolio` |
| PR | main ← feature/website-portfolio-page，待審核，不自動合併 |

本機報告與七張真實圖須在 PR 前完成；完整 Diff 檢查僅含授權程式、合法素材、文件，無機密／build 產物。PR 附四路由、三案來源與狀態、無證據處理、權利與資產路徑、Design System、SEO／Pages、所有測試與限制、真實 Commit 與 CI 連結。不得直接 Push main、修改文件 Repository 或發布未審核分支。

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

未來實際交付：四條可靜態瀏覽路由、可維護的三案資料與清楚的狀態／素材 Gate、共用導覽與有效 CTA、Metadata 與 Pages 產物；完整實際檔案清單；獨立 `docs/reports/task007-implementation.md`；七張 Portfolio 驗收圖及素材來源清單；Feature Commit、PR、該 head CI 與 artifact；繁體中文交付報告與尚待確認／部署狀態。

本輪只產生規格，以上功能成果目前全部 `PENDING`。Planned 作品的內容呈現可驗收，不得因此宣稱作品本體已完成或公開 Live。

## 15. Out of Scope & Future Work

不建立三套展示系統、Java Backend、PostgreSQL、Docker 環境、CMS、表單 API、Analytics 或商業產品。Portfolio 不代辦 Task 006 Solutions、Task 008 Contact、Task 009 法律政策、Task 010 索引放行、Task 013 Vercel 或 Task 014 DNS。不得以作品集頁完成為由宣稱完成 ERP、多租戶 SaaS、客戶交付、AI 整合、企業級監控或 SLA。

作品實際進度、素材權利、是否採用官網作案例、真實客戶授權與 Live 網址均為 `Pending Confirmation`，依第 6.4 節的 owner／時點／fallback 處理；不設假數值、圖片、按鈕或時程。來源缺少獨立作品程式／完成測試／公開 Demo 與合法案例圖片，這些缺漏不授權官網工程師補造。

## 16. Final Delivery Checklist

下列是未來 Portfolio 交付初始清單；全部未執行，不因規格或文件 CI 而勾選。

執行狀態依第 11 節統一使用 `PENDING`、`PASS`、`FAIL`、`BLOCKED`、`N/A`。僅有證據的 `PASS` 可勾選；其餘保持未勾選，`N/A` 附判定理由且不視為缺少適用驗收。必要項目仍為 `PENDING`、`FAIL` 或 `BLOCKED` 時，不得宣稱完整通過。以下是規格初始清單，本輪文件修訂不代填功能結果。

- [ ] PENDING — 最新 main 與 Task 001–005 前置成果已確認，來源／衝突／未確認事項有版本證據。
- [ ] PENDING — 四條路由、Overview 六區塊、三卡、三詳頁八區塊、來源與對應服務完成。
- [ ] PENDING — Demo 與客戶案例、規劃與已實作、Planned／In Development／Completed／Live 界線正確，無假成果。
- [ ] PENDING — 素材權利／狀態 Gate／source／alt／尺寸及無素材 fallback 均核對。
- [ ] PENDING — 共用導覽、所有已存在路由、舊錨點與未知 slug 保護正常。
- [ ] PENDING — npm ci、TypeScript、Lint、一般 build 及 Pages Build 均真實通過並記錄 Exit Code。
- [ ] PENDING — 所有已實作頁五種指定寬度、觸控、鍵盤、Focus、Reduced Motion、axe 與人工檢查完成。
- [ ] PENDING — Console／Runtime／Network／HTTP、資源、metadata、Base Path、404、.nojekyll 及 dev 排除通過。
- [ ] PENDING — 獨立報告、七張真實截圖、完整 Diff、Feature Commit／PR 與本次 CI／artifact 已確認。
- [ ] PENDING — 未完成事項、已確認與未授權的發布階段有明確區分，繁體中文最終報告完成。

- [ ] PENDING — Test Failure Policy 已遵守，失敗、阻礙與 Known Issues 有完整記錄，沒有阻礙交付的未解決必要驗收。
- [ ] PENDING — 每項測試的 Test ID、預期／實際結果、狀態與可追溯證據已記錄，沒有以預期或舊結果代填。
- [ ] PENDING — 獨立報告已在 PR 建立前完成並納入同一 PR，最後測試、後續重驗與實際提交的程式碼一致。
- [ ] PENDING — 本機、Feature Commit、PR CI、PR Review、合併授權、main CI、部署與公開 URL 驗證分別記錄；未發生階段維持 PENDING 並說明，沒有冒稱已發布。
