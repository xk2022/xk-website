# Task 005 — Services 服務介紹頁實作

## 1. Task Overview

| 項目 | 規格 |
| --- | --- |
| Project | Xplore Kaleidoscope（XK） |
| 任務 | Task 005 — Services 服務介紹頁實作 |
| 目標路由 | `/services` |
| 主要語言 | 繁體中文（`zh-TW`），保留必要英文技術名稱 |
| Brand Slogan | Explore Possibilities. Create Digital Value. |
| Technical Tagline | Building Digital Solutions with Web, Java & AI. |

依據既有網站架構與品牌設計系統，建立清楚、完整且具商業價值的 Services 服務介紹頁，讓潛在客戶了解 XK 的數位技術服務、適用情境、技術範圍與合作方式。延續企業首頁與 About Us，形成品牌認識至服務了解的流程。

本規格要求功能執行時直接操作既有 Repository，完成實作、實際驗收與交付，不能只提供程式碼範例、開發計畫或文件草稿。**本輪文件骨架標準化不重新執行 Task 005 功能開發，也不產生新的功能測試結果。**

本文的驗收狀態與 Checklist 一律初始化為 **PENDING**，不是對過往 Task 005 成果的否定，也不表示本輪已重新驗收。歷史實作與實際結果維持在獨立的 [Services 實作紀錄](../reports/services-implementation.md)；不得把歷史 PASS 複製為新的驗收結果。

## 2. Repository & Prerequisites

| 項目 | 規格／前置條件 |
| --- | --- |
| Website Repository | `xk2022/xk-website` |
| Base Branch | `main`；執行前確認最新遠端版本與實際 Base Commit |
| Feature Branch | `feature/website-services-page` |
| 前置任務 | Task 001、002、003、004；必須實際確認 Task 004 已合併至 `main` |
| 文件 Repository | `xk2022/xplore-kaleidoscope`；僅供讀取，不得修改 |
| 既有架構 | Next.js、React、Strict TypeScript、Tailwind CSS 4、shadcn/ui、Lucide React |
| 開發環境 | 保留既有 Node.js 24.x、npm 與套件版本 |
| 部署方式 | GitHub Actions → GitHub Pages；保留一般 Next.js production build 相容性 |
| 既有部署狀態 | 執行前檢查實際狀態與證據；不得由舊文件推斷目前功能已發布 |

開始前必須檢查 Repository、分支、Working Tree、最新 `main`、Task 004 合併狀態，以及 Header、Footer、MobileNavigation、Design Tokens 與共用元件 API。保留未提交的使用者修改；不得覆蓋既有成果或自行整合未核准功能。

若實際 Base Commit 與歷史紀錄不同，以經確認的最新 `main` 為準，並在本次實作報告說明。若前置任務尚未合併，先回報依賴問題，不以假設取代檢查。

### 歷史基準與原稿來源

- [重構前 Task 005 原稿快照](https://github.com/xk2022/xk-website/blob/a429fdc/docs/task/task005.md) 保留原始需求及後段執行文字的來源；本文整併重複指示，不新增功能範圍。
- 原功能實作紀錄的 Base Commit 為 `7a8ea793608c7bec8fa212bfee4b2f24b5cf192e`，當時 Task 004 的 PR #4／merge commit `57ad0f2` 為其祖先。這是原始時間點的紀錄，**不是未來執行時固定的最新 Base**。
- 原服務資料閱讀版本為文件 Repository 的 `95ef1275a46ace76e11f668178ca881087483398`；來源 SHA 與當時的部署證據見 [Services 實作紀錄](../reports/services-implementation.md)。功能執行時仍須確認可取得的文件版本與當前狀態。

## 3. Reference Documents

### Website Repository

完整閱讀以下文件，確認實際存在的路徑與內容，不得假設檔案存在：

- [README.md](../../README.md)、[AGENTS.md](../../AGENTS.md)。
- [歷史 Implementation Notes](../98_decisions/implementation-notes.md)。
- [品牌設計系統與元件 API](../reports/brand-design-system.md)。
- [首頁實作紀錄](../reports/homepage-implementation.md)、[About 實作紀錄](../reports/about-implementation.md)。
- [GitHub Pages 部署指南](../reports/github-pages-deployment.md)。
- 本文及既有獨立的 [Services 實作紀錄](../reports/services-implementation.md)。
- Task 001–004 規格：[Task 001](task001.md)、[Task 002](task002.md)、[Task 003](task003.md)、[Task 004](task004.md)。Task 001 原始替代文件為 [英文原稿](https://github.com/xk2022/xk-website/blob/895b9878b6c6244cf225772f6c4f8d3e5d97affe/docs/task/task001-implementation-notes.md) 與 [繁體中文原稿](https://github.com/xk2022/xk-website/blob/895b9878b6c6244cf225772f6c4f8d3e5d97affe/docs/task/task001-implementation-notes.zh-TW.md)；Task 002 另有 [繁體中文原稿](https://github.com/xk2022/xk-website/blob/895b9878b6c6244cf225772f6c4f8d3e5d97affe/docs/task/task002.zh-TW.md)。上述三份替代原稿已從目前 main 刪除，連結固定為歷史 Commit `895b9878b6c6244cf225772f6c4f8d3e5d97affe` 的快照，僅供原稿查證，不復原刪檔；正式入口仍是 `task001.md` 與 `task002.md`。不將當時的空檔或缺檔描述改寫成目前狀態。

### Documentation Repository

僅讀取 `xk2022/xplore-kaleidoscope` 中與服務、品牌、網站資訊架構相關的原始資料。優先檢查：

- `doc/01_business-plan/week-01/02_service-catalog.md`、`02_服務項目.md`。
- `doc/01_business-plan/week-02/` 下的品牌、色彩、網站地圖、首頁文案、技術架構與 MVP 文件。
- 已提供的 Logo 素材與相關規範。

以實際檔名及可讀版本為準；缺少或無法存取的來源要如實記錄。舊資料中的建議價格、信箱、平台、品牌名稱及示範專案，不等於已確認的商業事實。

### 規格優先順序

保留已合併的網站架構、Design System 與元件 API，依 Task 005 明確要求及已確認品牌決策實作。舊版規劃不推翻目前的獨立網站 Repository、GitHub Pages、色彩或無 Backend 架構；重要差異須記錄於實作報告，不為配合舊文件而破壞既有功能。

## 4. Scope & Requirements

本次功能範圍只有 Services 服務介紹頁與必要的共用導覽更新：

1. 完成 `/services` 的十個內容區塊及五類服務。
2. 提供服務定位、技術範圍、適用情境、服務組合與五階段合作流程。
3. 集中管理文案與明確的 TypeScript 型別，不將大量內容寫在 Page Component。
4. 重用 SiteHeader、SiteFooter、MobileNavigation、Container、Section、Card、Button、XkLogo 與既有 Design System。
5. 完成響應式、SEO、Accessibility、GitHub Pages 靜態輸出及實際瀏覽器驗收。
6. 更新必要文件，交付實作報告、七份真實截圖、功能分支與 PR。

不得重新初始化 Next.js、重建架構、任意升降級套件、修改 lockfile 或新增 npm Dependencies。優先使用 Server Components；沒有實際互動需求時不新增 Client Component。

保護首頁、About、所有有效導覽與錨點。首頁原第五類服務是 **Maintenance**；Services 頁第五類是 **Cloud & Infrastructure**。兩者用途不同，不得為新頁分類而覆寫首頁 R05、原文或 `/#service-{anchor}`。首頁服務卡片可保留非互動呈現，依實際結構提供真實 `/services` 入口，不強行建立不存在的明細頁映射。

不建立 Backend、Contact API、CMS、Authentication、Analytics 或完整服務明細內頁；不得宣稱未完成產品、客戶案例或商業成果。其餘排除項目見第 15 節。

## 5. Information Architecture & UX

路由為 `/services`，以下十個區塊依序呈現；Page 負責組合，元件負責視覺與語意，文案詳列於第 6 節。

| 順序 | 區塊 | 建議元件 | 使用者目的 |
| --- | --- | --- | --- |
| 1 | Services Hero | `ServicesHero` | 理解服務定位，前往服務內容或真實聯絡資訊區塊 |
| 2 | Service Overview | `ServicesOverview` | 掌握五類服務，前往頁內服務內容 |
| 3 | Website Development | `ServiceWebsite` | 了解網站與數位產品開發 |
| 4 | Java Enterprise Development | `ServiceJava` | 了解企業系統、API 與維護範圍 |
| 5 | System Integration & Database | `ServiceIntegration` | 了解系統串接與資料管理 |
| 6 | AI & Automation | `ServiceAI` | 了解 AI 應用與自動化方向 |
| 7 | Cloud & Infrastructure | `ServiceCloud` | 了解部署、雲端與基礎架構 |
| 8 | Service Integration | `ServicesIntegration` | 依需求理解五種服務組合示例 |
| 9 | Our Process | `ServicesProcess` | 理解合作階段與確認範圍的方式 |
| 10 | Services CTA | `ServicesCta` | 前往聯絡資訊、About 或首頁 |

### 互動與 Responsive 行為

- 概覽須清楚區分五類服務；只有確實導向內容的卡片才使用互動狀態，不建立假按鈕或死連結。
- 沿用目前服務內容錨點：`website-development`、`java-enterprise`、`system-integration`、`ai-automation`、`cloud-infrastructure`；概覽、組合、流程與 CTA 使用實際對應的穩定 Section ID。
- 卡片排列隨寬度調整；技術標籤可自然換行，不超出容器，卡片間距、圓角與文字層級保持一致。
- 合作流程桌面橫向、手機垂直；不得依賴 Hover 才能操作。
- 中文換行自然，Logo 不失真，CTA 不重疊。Hero 幾何裝飾不得遮住內容；手機內容須能自然決定高度，不以固定方形配合裁切隱藏文字。
- 保留 Header、Footer 與手機導覽的有效操作，包含 Escape、可見焦點、點擊後關閉與跨頁連結。

## 6. Content & Data Specification

### 服務 Hero 與 Overview

`ServicesHero` 必須包含：

- 中文 H1：**我們提供的數位技術服務**。
- 英文標題：**Our Services**。
- 品牌定位簡介、技術標語，以及 XK 如何運用 Web、Java 與 AI 協助企業建立數位解決方案的簡短說明。
- 前往服務內容及聯絡區塊的真實 CTA。
- 既有 BrandPattern 等幾何視覺；不重新繪製 Logo。

`ServicesOverview` 說明網站與數位產品開發、Java 企業系統開發、系統整合與資料管理、AI 應用與流程自動化、雲端與基礎架構五類服務如何配合企業需求，形成完整數位方案。

### Website Development — `ServiceWebsite`

服務內容必須涵蓋：

- 官方網站與企業網站開發。
- Responsive Web Design。
- 前端介面與互動設計。
- Next.js 與 React 網站開發。
- TypeScript 應用。
- SEO 基礎建置。
- 網站效能與可及性改善。

技術範圍：**HTML、CSS、JavaScript、TypeScript、React、Next.js、Tailwind CSS**。網站樣式框架仍沿用既有 Tailwind CSS 4，不因原稿的換行排版而把下一節編號併入技術名稱。

### Java Enterprise Development — `ServiceJava`

服務內容必須涵蓋：

- Java 應用程式開發。
- Spring Boot 系統開發。
- REST API 設計與整合。
- 企業應用系統。
- 後端商業邏輯。
- 系統維護與功能擴充。

技術範圍：**Java、Spring Boot、Spring Framework、REST API、Maven、Gradle**。這些是服務能力，不得暗示目前官網已建立 Java Backend。

### System Integration & Database — `ServiceIntegration`

服務內容必須涵蓋：

- 系統整合。
- API 串接。
- 資料庫規劃與整合。
- 資料交換與處理。
- 既有系統現代化。
- 跨系統工作流程整合。

技術範圍依實際可提供的能力描述，不宣稱已有特定客戶系統整合案例。沿用已確認的服務設定與技術內容，不因展示能力而在官網加入 Database 或 API Runtime。

### AI & Automation — `ServiceAI`

服務內容必須涵蓋：

- AI 應用開發。
- LLM 應用整合。
- AI 輔助工作流程。
- 智慧資料處理。
- 企業流程自動化。
- AI 與既有系統整合。

技術方向：**Python、AI API Integration、LLM、Spring AI、Workflow Automation**。不得宣稱已有正式商用 AI SaaS、已部署 AI 平台或已驗證的企業導入成果。

### Cloud & Infrastructure — `ServiceCloud`

服務內容必須涵蓋：

- Docker 容器化。
- 應用程式部署規劃。
- 雲端架構整合。
- CI/CD 工作流程。
- 基礎架構與部署維護。
- 系統可擴充性規劃。

技術方向：**Docker、Git、GitHub Actions、CI/CD、Cloud Infrastructure**。不得宣稱未經確認的 24/7 監控、SLA 或企業級維運保證。

### 五種服務組合 — `ServicesIntegration`

說明五類服務能依需求組合，至少包含以下示例：

| 需求方向 | 組合 |
| --- | --- |
| 企業數位形象 | Website Development |
| 企業內部管理系統 | Java Enterprise Development + Database Integration |
| 跨系統流程 | System Integration + Automation |
| 智慧化應用 | AI Integration + Existing Systems |
| 系統部署 | Application Development + Cloud Infrastructure |

以上明確標示為**服務組合示例**，不得呈現成已完成的客戶案例。

### 五階段合作流程 — `ServicesProcess`

1. **Discovery — 需求了解**。
2. **Planning — 方案規劃**。
3. **Development — 技術開發**。
4. **Testing & Delivery — 測試與交付**。
5. **Continuous Improvement — 後續改善**。

以清楚流程說明合作，不宣稱所有專案具有相同工期、報價或交付條件。價格、訂閱方案及時程須依已確認資料與個別專案處理，不把舊來源的建議值發布為正式承諾。

### Services CTA 與未確認聯絡資訊

邀請訪客討論數位需求，提供返回首頁、服務摘要、About 及聯絡資訊的導覽。依實際情境使用 `/#contact`、`/#services`、`/about` 或 `/` 等已存在的 URL。

目前聯絡管道尚未確認時，不得自行建立 Email、mailto、假聯絡表單或虛構聯絡資訊。`contact@…`、`hello@…` 與通用 LinkedIn 首頁不等於已驗證的正式聯絡管道；入口可導向真實首頁聯絡區塊並說明待確認狀態。

### 內容設定與 TypeScript 型別

集中於 `src/config/services.ts` 管理 Hero、服務分類、各服務說明、技術清單、適用情境、服務組合、五階段流程及 CTA。所有服務資料使用明確型別；建議沿用既有 `ServiceCategory`、`ServiceTechnology`、`ServiceProcessStep`、`ServiceSolutionExample`，保留目前 `ServiceId` 與資料約束。

避免在不同 Component 重複技術清單、說明或流程；可使用一個共用服務呈現元件及薄包裝元件指定分類，不複製五套樣式。文案以繁體中文為主，專業、清楚且具商業價值，不過度行銷、誇大能力或使用未經驗證數據。

## 7. Design System & Technical Constraints

完整沿用 Task 002 的 XK Design System，不建立第二套顏色、排版或間距系統。

| Token | HEX |
| --- | --- |
| Primary | `#101A33` |
| Secondary | `#3157D5` |
| Accent | `#19B8D5` |
| Background | `#FFFFFF` |
| Surface | `#F5F7FB` |
| Foreground | `#172033` |
| Muted | `#667085` |
| Border | `#E4E8F0` |

- 使用 CSS 語意 Tokens，不在各元件重複硬編碼 HEX；`--muted` 是次要文字，`bg-muted` 對應 Surface，不得混用。
- 沿用 Inter、Noto Sans TC 及既有字體設定；使用 `type-display`、`type-h1`、`type-h2`、`type-h3`、`type-body-lg`、`type-body`、`type-body-sm`、`type-caption`、`type-button`。
- 重用 Container、Section、Card 系列、Button、SectionHeading、BrandPattern、XkLogo 與 Lucide React。中文 SectionHeading 明確使用適當的 `titleLang`，不改壞既有英文預設行為。
- 保持原始 Logo Path、Transform、比例、已提供配色與 **Provisional（暫定版本）**，不宣稱最終核准、不重新繪製。
- 保持企業級技術品牌形象、五類內容的一致層級與手機可讀性；技術名稱與一般說明清楚區隔，不用大量裝飾、動畫或 Glassmorphism 影響閱讀。
- 延用 Focus、Reduced Motion、Spacing、Radius、Shadow 與共用斷點。單一 H1、正確 H2／H3、語意化 Section；裝飾圖示使用適當 `aria-hidden`。
- 真實站內連結用 Next.js Link。Button `asChild` 搭配真實連結；停用操作使用原生 disabled Button，不建立看似停用卻可啟動的連結。互動 Card 有實際 href，內部不嵌套其他互動控制。
- App Router、`src`、`@/*`、Strict TypeScript 與 Server Components 優先原則維持不變；只有實際互動才建立 Client Component。
- 不新增 Dependencies，不任意升降級既有套件或 lockfile；沒有必要時不更動 package、全域 Tokens、字體或元件 API。
- 保留一般 Next.js production build 與 GitHub Pages 靜態輸出。頁面不依賴 Backend 或外部執行服務；不新增 Tracking Scripts，不為裝飾增加不必要 JavaScript 或大型資產。

## 8. Navigation, SEO & Deployment

### 共用導覽與有效連結

修改 `src/config/navigation.ts`，將 Services 正式連至 `/services`，並把 `plannedRoutes` 對應狀態設為 `implemented`。Header、MobileNavigation 與 Footer 使用同一設定。

保留首頁 `/#services`、`/#service-{anchor}`、About 與其他有效導覽。首頁服務卡片是否連向新頁依實際結構調整，可提供「了解完整服務」入口；不可破壞原錨點或把未完成的 `/services/*` 明細頁公開為假連結。

### 專屬 Metadata

- **Title：** `服務項目 | Xplore Kaleidoscope`。
- **Description：** `探索 Xplore Kaleidoscope 的網站開發、Java 企業系統、系統整合、AI 應用與雲端技術服務，打造符合企業需求的數位解決方案。`
- **Canonical：** `https://xplorekaleidoscope.com/services`。
- **Open Graph：** 專屬 Title、Description、相同品牌網域的 Services URL，以及 `zh_TW`。
- **語言：** HTML 與既有 Layout 保持 `zh-TW`；英文技術文字適當標示。
- **Indexing：** 保留 `noindex, nofollow`，不擅自開放搜尋索引。
- 不虛構 Open Graph Image、Organization Rating、客戶評價、成果或結構化資料。避免根 Layout 標題模板重複附加品牌名。

Pages 的正常結尾斜線可接受，但 Canonical／Open Graph URL 不能變成錯誤的 GitHub 專案子路徑，也不得包含不應有的 Query 或 Fragment。

### GitHub Actions → GitHub Pages

一般 `npm run build` 保持相容；`npm run build:pages` 輸出 `out/services/index.html`。以 Pages Base Path 實際檢查 `/xk-website/services/`，由既有 Next.js Link 正確處理站內路徑，不在元件硬編碼專案前綴。

必要時僅擴充 `scripts/build-github-pages.mjs`，增加 Services 輸出與 Metadata 驗證，並保留首頁、About、404、`.nojekyll`、資源 Base Path、noindex／nofollow 及開發驗收路由排除檢查。CSS、JavaScript、字體、圖片與 App icon 路徑須正常。

不任意修改 GitHub Actions workflow、部署條件、Pages Source、DNS 或 Custom Domain。PR 執行品質與靜態建置；只有依既有規則、取得所需授權後的 `main` 才能部署。不發布未審核功能分支，不把本機或 PR artifact 當成公開部署證據。

Pages 產物須用靜態伺服器掛載 `/xk-website` 路徑驗收，不能以 `npm run start` 代替；若要在 Pages export 後改測一般 Next.js server，先重新執行一般 Build。

## 9. File Structure & Change Scope

以下是 **Task 005 功能執行時預計新增或完善的範圍**，不表示本輪文件重構已新增或完成這些成果。既有檔案優先重用；實際新增／修改以最終 Git Diff 為準。

```text
src/
├── app/services/page.tsx
├── config/services.ts
└── components/sections/services/
    ├── services-hero.tsx
    ├── services-overview.tsx
    ├── service-website.tsx
    ├── service-java.tsx
    ├── service-integration.tsx
    ├── service-ai.tsx
    ├── service-cloud.tsx
    ├── services-integration.tsx
    ├── services-process.tsx
    └── services-cta.tsx
```

可依既有風格調整檔名與拆分，但職責須清楚：Page 管理 Metadata、組合及整體語意；Config 管理內容；各區塊管理呈現。可沿用必要的 `service-detail.tsx` 共用呈現，不重複實作。

| 預計處理 | 檔案／範圍 | 限制 |
| --- | --- | --- |
| 新增或完善 | 上方 Services 路由、設定與元件 | 保留現有 API 與已確認內容 |
| 必要修改 | `src/config/navigation.ts` | Services 正式路由與狀態；不公開未完成路由 |
| 視現有結構必要修改 | `src/components/sections/home-services.tsx` | 保留原卡片、Maintenance 與所有錨點 |
| 必要擴充 | `scripts/build-github-pages.mjs` | 不破壞首頁、About 或開發頁排除驗證 |
| 實作報告 | `docs/services-implementation.md` | 獨立報告；保留既有歷史，新增實際執行證據 |
| 指引與歷史 | `README.md`、`AGENTS.md`、`docs/98_decisions/implementation-notes.md` | 記錄實際本次範圍與結果，不覆寫前任務成果 |
| 實際截圖 | `docs/screenshots/task005-services-*.png` | 七個指定目標，見第 12 節 |

不得任意修改文件 Repository、依賴／lockfile、全域 Design System、原始 Logo、字體或 workflow；其他部署或操作文件僅在確實必要且屬任務範圍時更新並說明原因。不得提交 `.next/`、`out/`、測試暫存檔、工具套件或機密資訊。

## 10. Implementation Procedure

1. 檢查 Repository、分支、Working Tree、最新 `main`、Task 004 合併及部署前置狀態，保留使用者工作。
2. 完整閱讀第 3 節來源與現有程式，記錄規格差異、缺少資料及可驗證聯絡方式。
3. 從經確認的最新 `main` 建立或切換 `feature/website-services-page`，不重新初始化專案。
4. 確認十個區塊、五類服務、服務組合、流程、資料型別、有效連結與共用元件分工。
5. 實作集中 Config、Page、Server Components、必要導覽及 Pages Validator；沿用品牌 Tokens。
6. 完成手機／桌面版面、SEO、鍵盤、Focus、Reduced Motion 及聯絡待確認狀態。
7. 最終程式碼完成後實際執行 `npm ci`、`npx tsc --noEmit`、`npm run lint`、`npm run build`、`npm run build:pages`。
8. 分別啟動一般 Next.js 與 Pages 靜態網站，完成第 11 節功能、三頁回歸、五種指定寬度、axe、鍵盤、資源與瀏覽器驗收。
9. 發現問題先修復，重新執行受影響檢查及最終完整驗收；依實際網站重新擷取截圖並人工檢視。
10. 完成獨立報告、README、AGENTS 與歷史紀錄；未完成或受限項目如實列出。
11. 檢查完整 Git Diff、檔案範圍、Markdown links、截圖及未提交產物，確認沒有洩露機密。
12. 依實際授權 Commit、Push 功能分支並建立以 `main` 為 Base 的 PR；回報真實 CI、Commit、PR 與交付狀態，不自動合併或發布。

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

本任務的驗收適用性與執行狀態依上述定義分開記錄。Required 是必要驗收；Optional 是視適用條件選擇的補充；Not Applicable 須確認不適用理由，不代表需要開發被排除的功能。正式報告僅使用上述五種狀態，不得預填成功。

### 指令、功能與瀏覽器驗收矩陣

| 驗收項目 | 適用性 | 原因／可驗證標準 | 狀態 |
| --- | --- | --- | --- |
| `npm ci` | Required | 使用既有 Node.js 24.x 與 npm 安裝鎖定依賴，不以舊安裝結果代替 | PENDING |
| `npx tsc --noEmit` | Required | 最終程式碼符合 Strict TypeScript；記錄 Exit Code | PENDING |
| `npm run lint` | Required | 執行既有 ESLint，處理任務引入的錯誤與警告 | PENDING |
| `npm run build` | Required | 保留一般 Next.js production build；不能只驗證 Pages | PENDING |
| `npm run build:pages` | Required | 實際匯出 Services 與既有頁面，執行產物驗證 | PENDING |
| Services HTTP 與結構 | Required | `/services` HTTP 200；單一指定 H1、十個 Section、五類完整服務與所有技術項目 | PENDING |
| 服務組合與流程 | Required | 五種組合均標示示例；五階段完整，沒有統一工期／價格／交付承諾 | PENDING |
| 首頁 Fresh Regression | Required | 首頁七個內容區塊、原五卡、Maintenance、服務與舊錨點可用，不以歷史 PASS 代替 | PENDING |
| About Fresh Regression | Required | About 九個內容區塊、既有內容與 CTA 正常，與 Services 往返可用 | PENDING |
| Header／Footer／MobileNavigation | Required | 三者共用設定，Services 連 `/services`，不引入死連結 | PENDING |
| 所有站內連結及跨頁操作 | Required | 實際列舉有效 URL，檢查 HTTP、錨點、Base Path，操作主要連結、CTA 與導覽 | PENDING |
| Metadata 與語言 | Required | Services 專屬 Title／Description／Canonical／Open Graph／zh_TW；HTML zh-TW，保留 noindex、nofollow | PENDING |
| 真實內容與禁止資料 | Required | 不含假案例、商用 AI 成果、未確認信箱、假表單、價格／SLA 保證、虛構 OG Image 或評價 Schema | PENDING |
| Responsive 320px | Required | Services、首頁、About 均檢查無水平溢出、重疊或容器超出 | PENDING |
| Responsive 375px | Required | Services、首頁、About 均檢查卡片、標籤、CTA、Header 與 Footer 閱讀操作 | PENDING |
| Responsive 768px | Required | Services、首頁、About 均檢查平板排列與內容可讀性 | PENDING |
| Responsive 1440px | Required | Services、首頁、About 均檢查桌面層級、卡片與橫向流程 | PENDING |
| Responsive 1920px | Required | Services、首頁、About 均檢查最大寬度、留白與元件邊界 | PENDING |
| Hero 內容完整與人工版面檢查 | Required | 特別檢查 320／375px figure 內 Logo、caption、標語及 CTA 未被裁切；Logo 比例正常、卡片間距一致、手機流程垂直 | PENDING |
| axe WCAG 2／2.1 A／AA | Required | 對本次 Services、首頁、About 五種指定寬度頁面與手機選單展開狀態執行掃描，記錄實際範圍及結果 | PENDING |
| Keyboard、Skip Link、Enter 與 Focus | Required | 鍵盤可達主要控制、Skip Link 進入 main，焦點可見，連結可用 Enter 啟動 | PENDING |
| Disabled 狀態 | Required | 沿用共用 Button 的原生停用語意；在可用開發示範驗證不能觸發、Tab 不停留，不為測試增加假公開控制 | PENDING |
| Reduced Motion | Required | 減少動態偏好下必要過渡停用或依既有規範降至 0s；不依賴動畫傳達功能 | PENDING |
| MobileNavigation 操作 | Required | 檢查 Accessible Name、aria-expanded／controls、展開／收合、連結點擊關閉、Escape 與焦點還原、外部點擊及桌面斷點重設 | PENDING |
| Browser Console | Required | 零未解釋的 Console Error；預期 404 測試須與資源失敗分開記錄 | PENDING |
| JavaScript Runtime | Required | 零未處理的 Runtime Error，不只檢查 HTTP 或 HTML | PENDING |
| Network 與靜態資源 | Required | CSS、JS、字體、圖片／App icon 正常，路徑與狀態正確；記錄本次實際資源清單與數量，不固定套用舊報告的 23 個資源 | PENDING |
| HTTP 與例外路由 | Required | 首頁、About、Services HTTP 200；未知路由依既有設定為 404，不以失敗載入假裝完成頁面 | PENDING |
| Pages Base Path | Required | 實際掛載 `/xk-website`，三頁及錨點導覽、直接載入、CSS／JS／字體／圖示路徑正確 | PENDING |
| 靜態輸出與既有 Validator | Required | `out/services/index.html`、首頁、About 與 `404.html` 存在；保留各頁 Metadata 與資源路徑驗證 | PENDING |
| `.nojekyll` | Required | 靜態輸出保留檔案，避免 Pages 忽略必要資源 | PENDING |
| 開發驗收路由保護 | Required | Pages 不含公開 `/dev/design-system` 內容／payload；一般 production 預設 404，只有明確預覽旗標才可用 | PENDING |
| 七份真實截圖與人工視覺 | Required | 依第 12 節檔名擷取本次實際網站；人工檢查，不以檔案存在代替目視 | PENDING |
| 觸控裝置補充驗收 | Optional | 可取得環境時補充 375px、isMobile／hasTouch 等模式，不取代五種指定寬度必要測試 | PENDING |
| 輔助科技擴充檢查 | Optional | 可取得時補充螢幕閱讀器或其他輔助科技；axe 不等同完整認證 | PENDING |
| 授權發布後公開站 Smoke | Optional | 只有另有合併／發布授權且部署成功後，才驗公開網址；未發布時保留 PENDING 並記錄階段與原因 | PENDING |
| Backend／Contact API／Database Runtime | Not Applicable | 本次是獨立前端頁面，不建立或驗收被排除的後端功能 | PENDING |
| CMS／Authentication／Analytics 功能 | Not Applicable | 未納入本次範圍，不以文件要求為理由新增 | PENDING |
| Portfolio／服務明細內頁／AI SaaS 功能 | Not Applicable | 只驗 Services 內容與真實連結，不開發未授權產品或內頁 | PENDING |

以上品質指令與驗收必須在最終程式碼完成後實際執行。不得沿用 Task 001–004 的結果，也不得把 Task 005 既有歷史報告當作本次重新執行的結果。修正程式碼後須重新完成相關檢查與最終驗收。

### Test Failure Policy

- `FAIL` 不得標記為 `PASS`，原始失敗與重驗紀錄均須保留。
- 發現問題必須記錄原因、影響範圍及修正方式；可修正的問題應先修正，再重新執行相關測試及必要回歸。
- 無法修正的問題必須列入報告的 Known Issues，註明嚴重程度、交付影響、目前狀態及後續處理方式。
- 存在阻礙交付的 `FAIL` 或必要驗收的 `BLOCKED`，不得宣稱任務完整通過。交付須符合原規格；不適用項目只有在附上理由與依據後才能記為 `N/A`。
- 不得透過跳過測試、降低驗收標準、隱藏錯誤或展示舊成功結果取得 `PASS`。
- 外部服務、權限或環境造成的阻礙，必須記錄實際原因、發生時間、影響測試及解除條件；不得虛構執行結果。

## 12. Test Report & Evidence

### 獨立實作與測試報告

使用 `docs/services-implementation.md` 作為 Task 005 的獨立實作／測試報告。檔案已存在時保留原歷史快照與既有證據，以清楚標示的新執行區段追加內容，不覆寫前面任務成果；本輪文件標準化不修改它。

報告至少記錄：

- 執行日期、Repository、Base Commit、Feature Branch、實際 Commit、測試環境、Node.js／npm、瀏覽器、網址、一般 Next.js 或 Pages 產物模式。
- 本次實作內容、十區塊資訊架構、型別與元件分工、文案來源、Design System、導覽、SEO 與 Pages 相容性。
- 每個實際測試指令、Exit Code、PENDING／PASS／FAIL／BLOCKED／N/A、範圍、必要日誌或證據位置；未執行、不適用或受阻均附理由。
- 五種指定寬度 Responsive、axe 範圍與違規、Keyboard／Focus／Disabled／Reduced Motion、手機選單、觸控（若有）、Console／Runtime／Network、HTTP、資源與靜態輸出結果。
- 發現問題、原因、修正內容、修正後重驗與最終完整驗收結果；不得只把預期值列為成功。
- 真實截圖、人工目視範圍、未完成事項、限制及需使用者確認的資料。
- 真實 Git／PR／Actions 結果與部署狀態；沒有公開發布證據就明確寫未部署或未驗，不拿本機結果取代。

舊報告中的資源數、連結數、axe 次數與截圖尺寸都是當時的實測結果，不是本規格固定的通過常數。自動掃描只涵蓋工具可判定的規則，不得宣稱完整無障礙認證。

### 七份指定截圖

以下為目標檔名及取景，不是本輪已完成紀錄。截圖須來自本次實際執行的網站，不以示意圖或舊執行截圖代替；產出後須人工檢視。

| 內容 | 目標檔案 |
| --- | --- |
| Services Desktop | `docs/screenshots/task005-services-desktop.png` |
| Services Mobile | `docs/screenshots/task005-services-mobile.png` |
| Website Development | `docs/screenshots/task005-services-website.png` |
| Java Development | `docs/screenshots/task005-services-java.png` |
| AI & Integration | `docs/screenshots/task005-services-ai.png`；涵蓋相鄰 Integration 與 AI 內容，可用實際瀏覽器取景 |
| Services Process | `docs/screenshots/task005-services-process.png` |
| Services Footer | `docs/screenshots/task005-services-footer.png` |

完整記錄檔案位置與實際尺寸。手機／桌面 Hero、服務內容、卡片、流程、頁尾與 Logo 的人工閱讀檢查，不能由 axe 或截圖檔案存在取代。

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

| 項目 | 規格 |
| --- | --- |
| Feature Branch | `feature/website-services-page` |
| Base Branch | `main` |
| 建議 Commit | `feat(services): implement XK services page` |
| PR Compare | `feature/website-services-page` |
| CI | 檢查實際 PR Checks、品質與 Pages 建置結果；不得預填未執行結果 |

原稿後段另有「建議分支」`feature/website-task005` 與「建議 Commit」`feat(website): implement task 005`。保留其歷史來源，但明確的主分支要求 `feature/website-services-page` 與前段 Services Commit 建議優先，不建立第二條功能分支。

Commit／Push 前檢查完整 Git Diff、必要檔案、截圖與文件，排除 `.next/`、`out/`、暫存檔及機密資訊；不直接修改或推送 `main`。

PR 描述須包含任務目標、服務頁內容、共用元件、導覽、SEO、Pages 相容性、品質／Responsive／Accessibility 結果、真實截圖、部署注意事項與未完成項目。Commit SHA、PR 編號、Actions Run ID 及發布狀態全部以實際紀錄為準，不預填或虛構。

預設以 PR 待審核交付，不自動合併或發布；只有取得另外明確授權時才可進行相應動作。不得將 Task 005 的歷史合併或發布授權推定為其他任務的授權。

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

功能執行完成時，須交付實際成果，而非只列規劃：

1. `/services` 十個區塊、五類完整服務、五組合示例、五階段流程及真實 CTA。
2. 沿用共用 Header／Footer／MobileNavigation、Design System、有效導覽與保留的首頁／About 行為。
3. 型別明確、集中管理的服務設定與職責清楚的元件。
4. 正確 SEO、GitHub Pages 靜態輸出、Base Path、資源、404 與開發頁保護。
5. 真實新增／修改檔案清單及經檢查的 Git Diff；不是把第 9 節預計清單標成完成。
6. `docs/services-implementation.md` 的本次獨立實作／測試證據、README、AGENTS 與保留歷史的 Implementation Notes 更新。
7. 七份本次網站截圖及人工視覺檢查紀錄。
8. 實際 Feature Branch、Commit SHA、PR URL、CI 結果與本機工作目錄狀態。
9. 繁體中文最終交付報告：功能摘要、檔案、各項實測、截圖、尚未完成與需確認事項，以及是否部署及其實際證據。

## 15. Out of Scope & Future Work

本次不開發 Backend、Contact API、Database Runtime、Docker Backend、CMS、Authentication、Analytics、AI Chatbot 或正式 AI SaaS；服務文字中的 Java、資料庫、Python、Docker 等不表示網站新增這些執行功能。

不實作完整服務明細內頁、Portfolio、獨立 Contact 或 Privacy 頁面，不公開未確認的信箱、客戶案例、報價、固定時程、24/7、SLA 或企業級保證。不變更最終品牌核准、原始 Logo、正式網域或搜尋索引開放決策。

保留原稿的後續方向，不納入本次範圍：

- Task 006：Solutions 解決方案介紹頁。
- Task 007：Portfolio 專案作品集。
- Task 008：Contact 聯絡頁。
- Task 009：Privacy Policy 隱私權政策。
- 後續再評估服務明細頁、正式聯絡 API、CMS、AI Chatbot 與其他功能。

尚未確認的聯絡管道、最終 Logo／OG Image、正式價格與交付條件等須列於報告，不自行填補；依各後續任務及使用者決策處理。

## 16. Final Delivery Checklist

所有項目保持未勾選，狀態為 PENDING；只有實際完成並取得證據後才能在相應執行報告確認，不以歷史結果或本輪文件整理代替。

執行狀態依第 11 節統一使用 `PENDING`、`PASS`、`FAIL`、`BLOCKED`、`N/A`。僅有證據的 `PASS` 可勾選；其餘保持未勾選，`N/A` 附判定理由且不視為缺少適用驗收。必要項目仍為 `PENDING`、`FAIL` 或 `BLOCKED` 時，不得宣稱完整通過。以下是規格初始清單，本輪文件修訂不代填功能結果。

- [ ] PENDING — 已確認 Repository、Working Tree、最新 `main`、Task 004 合併及實際 Base Commit。
- [ ] PENDING — 已閱讀來源文件，記錄差異、缺漏與聯絡資訊狀態。
- [ ] PENDING — Feature Branch 使用 `feature/website-services-page`，保留既有使用者工作。
- [ ] PENDING — Services 十個內容區塊與五類服務完整實作。
- [ ] PENDING — 五種服務組合標示示例，五階段流程及合作條件表達正確。
- [ ] PENDING — 文案與技術清單集中管理，資料型別與元件職責清楚。
- [ ] PENDING — Header、Footer、MobileNavigation 與 `/services` 導覽整合完成。
- [ ] PENDING — 首頁 Maintenance、原卡片、所有服務錨點與 About 行為保留。
- [ ] PENDING — 既有 Design System、字體、Logo Provisional 與套件版本保持一致。
- [ ] PENDING — SEO Title、Description、Canonical、Open Graph、語言與 noindex／nofollow 正確。
- [ ] PENDING — `npm ci` 實際執行並記錄 Exit Code。
- [ ] PENDING — TypeScript 檢查通過並記錄證據。
- [ ] PENDING — ESLint 通過並記錄證據。
- [ ] PENDING — 一般 Next.js production build 通過。
- [ ] PENDING — GitHub Pages build 及 Services／首頁／About 靜態驗證通過。
- [ ] PENDING — 功能、HTTP、全部有效連結、跨頁 CTA 與舊錨點驗收完成。
- [ ] PENDING — Services、首頁、About 五種 Viewport Fresh 回歸完成。
- [ ] PENDING — Logo／標語完整可見、手機流程垂直、標籤／卡片／CTA 無溢出或重疊。
- [ ] PENDING — axe WCAG 2／2.1 A／AA 與必要人工檢查完成，記錄實際範圍及限制。
- [ ] PENDING — Keyboard、Skip Link、Enter、Focus、Disabled、Reduced Motion 與 MobileNavigation 驗收完成。
- [ ] PENDING — Console、Runtime、Network、CSS／JS／字體／icon 與 HTTP 狀態驗收完成。
- [ ] PENDING — Pages Base Path、404、`.nojekyll`、開發驗收路由保護與排除通過。
- [ ] PENDING — 發現問題已修正並重新完成最終驗收；Optional／Not Applicable 有明確處理理由。
- [ ] PENDING — 七份指定真實截圖已重新產出並人工檢視。
- [ ] PENDING — 獨立實作／測試報告、README、AGENTS 與歷史紀錄完成，未覆寫既有證據。
- [ ] PENDING — Git Diff、允許檔案、Markdown links 與無機密／build 產物檢查完成。
- [ ] PENDING — Conventional Commit 與功能分支 Push 完成，記錄真實 SHA。
- [ ] PENDING — PR 已建立，以 `main` 為 Base，完整附上實測、截圖與限制。
- [ ] PENDING — CI Checks 與實際交付／部署狀態已確認，不虛構識別碼或發布結果。
- [ ] PENDING — 繁體中文最終交付報告完成；未另獲授權時 PR 保持待審，不自動合併或發布。

- [ ] PENDING — Test Failure Policy 已遵守，失敗、阻礙與 Known Issues 有完整記錄，沒有阻礙交付的未解決必要驗收。
- [ ] PENDING — 每項測試的 Test ID、預期／實際結果、狀態與可追溯證據已記錄，沒有以預期或舊結果代填。
- [ ] PENDING — 獨立報告已在 PR 建立前完成並納入同一 PR，最後測試、後續重驗與實際提交的程式碼一致。
- [ ] PENDING — 本機、Feature Commit、PR CI、PR Review、合併授權、main CI、部署與公開 URL 驗證分別記錄；未發生階段維持 PENDING 並說明，沒有冒稱已發布。
