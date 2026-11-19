# Task 003 — Corporate Homepage Development（官方企業網站首頁開發）

本文件為 **Task Specification**，說明執行 Task 003 時的需求與驗收標準。章節統一不代表重新執行首頁開發；本文的驗收狀態預設為 **PENDING**。已完成工作的實際結果、當時環境與歷史限制，請查閱 [首頁實作紀錄](../reports/homepage-implementation.md) 與對應 GitHub 紀錄，不以本規格取代實作報告。

## 1. Task Overview

| 項目 | 規格 |
| --- | --- |
| Task | Task 003 — Corporate Homepage Development |
| 專案／品牌 | Xplore Kaleidoscope／XK |
| Website Repository | `xk2022/xk-website` |
| 品牌網域 | `https://xplorekaleidoscope.com` |
| 主要語言 | 繁體中文，`zh-TW` |
| Brand Slogan | Explore Possibilities. Create Digital Value. |
| Technical Tagline | Building Digital Solutions with Web, Java & AI. |
| 任務範圍 | 企業首頁、正式 Header／Footer／Navigation、必要設定與部署相容性 |

Task 001 建立 Next.js 基礎架構；Task 002 建立 Brand Tokens、Typography、XkLogo、Button、Card、Container、Section、BrandPattern，以及響應式與 Accessibility 基礎。Task 003 必須在這些成果上完成具有專業企業形象、清楚服務定位及商業轉換入口的官方首頁。

預期首頁能呈現品牌定位、Website／Java／System Architecture／AI 技術能力與核心服務，提供清楚的服務導覽及真實聯絡資訊入口，支援 Desktop、Tablet、Mobile，並具備基本 SEO、Accessibility 與良好初始載入體驗。只開發 Homepage，不建立完整內頁或 Backend。

原稿要求可直接部署至 Vercel；使用者於 Task 003 執行期間另確認 GitHub Actions → GitHub Pages 靜態部署。兩者的歷史關係及目前需保留的雙建置模式見第 8 節，不能把舊目標誤寫成尚待選擇的新決策。

## 2. Repository & Prerequisites

| 項目 | 要求／來源性質 |
| --- | --- |
| Website Repository | `https://github.com/xk2022/xk-website.git`，所有網站原始碼、設定、素材及本次修改僅在此 Repository |
| Documentation Repository | `https://github.com/xk2022/xplore-kaleidoscope`，Business Plan、品牌、技術與產品規劃；僅允許讀取 |
| Base Branch | 執行時實際確認的最新 `main`；不得覆蓋未提交修改 |
| Feature Branch | `feature/website-homepage`；若已存在，先檢查分支與工作狀態，不重設或覆蓋既有成果 |
| 原 Task 003 Base Commit | `6feb400996e45e0e9bc285425a99e014f5381057`，僅為 [原實作報告](../reports/homepage-implementation.md) 記載的歷史基準，不預設為重跑時最新版本 |
| 前置任務 | Task 001、Task 002；必須實際確認 Task 002 已合併至 `main`，不可僅憑檔案存在或口頭預期 |
| 原文件讀取版本 | `3996730176e4ad7237c66f541d61405f2667934e`，為 Task 003 報告記錄的文件 Repository 歷史版本；重新執行時記錄實際讀取版本 |
| 部署前置狀態 | 檢查既有 Pages Source、公開網址、Environment 與實際 workflow；網址回應 200 不足以證明目前程式碼已發布 |

開始前必須檢查 Repository 身分、目前 Branch、Git Status、最新 `main`、套件版本及現有共用元件。若 Task 002 尚未合併，停止正式開發並回報，不自行合併未核准分支。

**歷史與現況須分開記錄：** Task 003 原報告中的 `task001.md` 缺失、`task002.md` 空檔、legacy Jekyll、API 403、待審核或待發布，均屬當時檢查快照。不得將這些敘述無條件套用到目前 Repository，也不得在文件重構時回填虛構的新狀態。當時規格替代來源與後續狀態以實際文件、Git、PR、Actions 與交付報告為準。

## 3. Reference Documents

### 3.1 Website Repository

開始實作前完整閱讀並確認實際檔名：

- [README.md](../../README.md)、[AGENTS.md](../../AGENTS.md)。
- [implementation notes](../implementation-notes.md)、[品牌設計系統](../reports/brand-design-system.md)。
- [Task 001 規格](task001.md)、[Task 002 規格](task002.md) 及必要的 [Task 002 繁體中文原稿](https://github.com/xk2022/xk-website/blob/895b9878b6c6244cf225772f6c4f8d3e5d97affe/docs/task/task002.zh-TW.md)。
- Task 001 的歷史替代來源 [task001-implementation-notes.md](https://github.com/xk2022/xk-website/blob/895b9878b6c6244cf225772f6c4f8d3e5d97affe/docs/task/task001-implementation-notes.md)；不得假設所有原稿在當時或目前均存在。
- [首頁實作紀錄](../reports/homepage-implementation.md)、[GitHub Pages 部署指南](../reports/github-pages-deployment.md)。

缺少文件時記錄缺漏與已確認來源，不自行補造規格、測試結果或發布狀態。既有報告是證據來源，不是將過去 PASS 複製為本次驗收結果的依據。

Task 001 與 Task 002 的正式入口分別為 [task001.md](task001.md) 與 [task002.md](task002.md)。上述已刪除替代原稿的連結固定指向 `895b9878b6c6244cf225772f6c4f8d3e5d97affe` 的歷史快照，僅供追溯；不得將歷史快照誤作現行入口或復原已刪除檔案。

### 3.2 Documentation Repository

Canonical Directory：`doc/01_business-plan/week-02/`。可讀取時優先閱讀下列主題，依實際 numbered bilingual 檔名辨識：

| 主題 | 實際規劃文件 |
| --- | --- |
| 品牌識別 | `01_brand-identity_品牌視覺識別規範.md` |
| Logo | `02_logo-guidelines_XK Logo 設計與使用規範.md` |
| 色彩 | `03_color-palette_品牌色彩系統規範.md` |
| 字體 | `04_typography_品牌字體與排版規範.md` |
| 網站地圖 | `05_website-sitemap_ 官方網站資訊架構與網站地圖.md` |
| 首頁文案 | `06_homepage-copywriting_官方網站首頁文案規劃.md` |
| 架構 | `08_website-architecture_官方網站 Next.js 技術架構設計.md` |
| MVP | `09_website-mvp_官方網站 MVP 開發規格.md` |

文件 Repository 僅供讀取。未核准的舊規劃、示例素材、聯絡信箱或完整 MVP 功能，不因出現在文件中就成為已實施功能或可公開商業事實。

### 3.3 規格優先順序

1. 已合併至 `main` 的 Task 001、Task 002 實際程式碼與元件 API。
2. 本次 Task 003 明確規定及使用者後續已確認的指示。
3. 已確認的品牌與商業決策。
4. 舊版規劃文件。

不得為配合舊文件而破壞已完成的 Design System。重要衝突先記錄並回報；README 舊里程碑若只把 Task 003 列為 Header／Footer，不取代本任務明確要求的完整企業首頁範圍。

## 4. Scope & Requirements

### 4.1 必須完成

- 正式 Header、Desktop Navigation、Contact CTA、可操作的 Mobile Navigation 與 Footer。
- 按指定順序組合 Hero、Introduction、Services、Technology Capabilities、Why XK、Solutions、Contact CTA 七個首頁區塊。
- 集中管理品牌、導覽、服務及已驗證聯絡資料，重用 Design System。
- Desktop、Tablet、Mobile 響應式行為、基本 SEO、WCAG 2.1 AA 基礎與實際瀏覽器驗收。
- 保留 construction-stage `noindex, nofollow`、Backend 獨立性及一般 Next.js build。
- 維持已確認的 GitHub Actions → GitHub Pages 靜態建置、Base Path、資源與開發路由保護。
- 完成獨立實作報告、測試證據、實際截圖、Conventional Commit 與 PR 審核交付。

### 4.2 既有成果保護

不得重新初始化專案、覆蓋未提交工作、重建平行 Design System、任意升降級套件或重複建立現有元件。若後續任務已完成 `/about`、`/services` 等內頁，重新檢查首頁時也必須保留其有效導覽，不能因 Task 003 當時只有首頁而退回舊狀態。

### 4.3 不得擅自擴充

不開發完整 About／Services／Solutions／Portfolio／Contact／Privacy 內頁、服務明細、Backend、Contact API、CMS、Authentication、Analytics 或 AI Chatbot。原稿允許在需要時提供簡潔且真實的 Contact 入口；無已確認管道時優先採用第 6 節的有效頁內聯絡區塊，不以此例外擴大成完整聯絡系統。

不得建立假表單、假提交、無效 Email Link、虛構客戶案例／Logo／評價／統計／排名／合作紀錄，或將未完成產品描述為已商用。

## 5. Information Architecture & UX

### 5.1 區塊順序與職責

```text
Homepage
├── Header
├── Hero Section
├── Introduction Section
├── Services Section
├── Technology Capabilities Section
├── Why XK Section
├── Solutions Section
├── Contact CTA Section
└── Footer
```

Page 負責區塊組合與 Metadata；各 Section 管理自己的視覺與語意；Config 集中管理重複內容。所有區塊維持一致的視覺、排版層次、Section Spacing 與響應式行為。

### 5.2 Header 與 Mobile Navigation

Header 必須包含原稿 XkLogo、Xplore Kaleidoscope 品牌名稱、Desktop Navigation、Contact CTA 與 Mobile Navigation。使用白色背景、細緻邊框、適當水平留白、清楚字體與品牌色彩；高度合理，不過度佔用首屏。

Mobile Navigation 必須：

- 由有 Accessible Label 的原生 Button 開啟／關閉，正確反映 `aria-expanded`，並與對應導覽區域建立關聯。
- 支援鍵盤與 Escape 關閉；關閉後焦點處理清楚可預期，不讓開啟選單導致整頁無法操作。
- 點擊連結能正確導向，且選單狀態與頁面操作保持一致。
- 僅必要的導覽互動使用 Client Component，不能使整個 Layout 或所有 Sections 變成 Client Components。

依既有已合併的非模態選單實作，回歸檢查連結後關閉、外部點擊、切換桌面寬度、Escape 與焦點還原；不以無效選單按鈕或單靠 Hover 操作取代手機導覽。

### 5.3 Hero 與裝飾

首屏須清楚傳達品牌定位，包含第 6 節的 H1、品牌／技術標語、簡介、主要服務 CTA 與次要聯絡 CTA。

Hero Visual 沿用 BrandPattern、Geometric Shapes、CSS-based Kaleidoscope Elements、Brand Color Gradients 或 Abstract Technology Visuals，呈現幾何對稱、層次、現代科技與專業企業形象。裝飾不得遮蔽文字、接收不必要操作或增加不必要動畫成本。

不得任意使用不相關 Stock Photos、虛構產品畫面、未提供的客戶 Logo、重新繪製的 XK Logo 或複雜動畫。

### 5.4 服務卡片與其他區塊

- Services：Desktop 建議三欄，第二排自然排列其餘兩張；Tablet 兩欄；Mobile 一欄。Card 高度及視覺一致，含 Icon、Service ID、英文／中文服務名稱、說明與項目摘要。
- 未完成服務明細頁時，使用非互動 Card；不可加入指向不存在頁面的「了解更多」。
- Technology Capabilities：以 Technology Groups、文字 Tags、Icon Grid 或低調 Card 分類呈現，不用未證實認證或合作夥伴標章。
- Introduction：簡潔、專業、清楚，保持足夠留白，不堆疊文字。
- Solutions：描述應用方向，不建立虛構產品功能；可導向真實服務錨點。
- Contact CTA：使用真實已確認管道；缺少管道時保留視覺與待確認說明，不偽裝成功操作。

### 5.5 Footer

Footer 必須包含 Brand／XkLogo／品牌名稱／品牌標語、Navigation、五類 Service Categories、Legal／Privacy Policy 狀態，以及 `© {currentYear} Xplore Kaleidoscope. All rights reserved.`。

只將已實作頁面或有效錨點設為連結。Privacy Policy 未建立時不得連到不存在的頁面。年份以程式取得，不寫死；靜態匯出時年份於 build 決定，重新建置才更新。

## 6. Content & Data Specification

### 6.1 文案與設定管理

以本節明確文案、已確認品牌資料及第 3 節來源為依據；舊規劃僅供比對。內容以繁體中文為主，保留品牌英文與技術名稱，不導入完整 i18n Framework，但保留未來英文版的內容擴充空間。

沿用 `src/config/site.ts` 管理 Brand Name、Slogan、Technical Tagline、Website URL；導覽、服務分類及聯絡資訊集中管理。可依已合併架構使用 `src/config/homepage.ts`、`src/config/navigation.ts`、`src/config/contact.ts`，不要在多個元件重複定義相同內容。

首頁設定、服務項目、技術群組、價值與 Solutions 使用明確 TypeScript 結構；延用既有型別或清楚的 readonly 資料，避免為靜態內容建立不必要抽象或假 API。聯絡資料僅放已驗證資訊，未確認的資料與有效渠道分開。

### 6.2 Hero

| 內容 | 指定／建議文案 |
| --- | --- |
| Brand Slogan | Explore Possibilities. Create Digital Value. |
| Technical Tagline | Building Digital Solutions with Web, Java & AI. |
| 建議主要標題 | 整合 Web、Java 與 AI 技術，打造企業數位價值。 |
| 建議副標題 | Xplore Kaleidoscope 協助企業整合網站開發、企業系統、系統架構與 AI 應用，將技術轉化為實際商業價值。 |
| 主要 CTA | 探索我們的服務 |
| 次要 CTA | 聯絡我們 |

原稿主要 CTA 建議 `/services`、次要 CTA 建議 `/contact`。目的頁尚未存在時不得假連結；可用真實的 `/#services`、`/#contact` 頁內區塊。原稿另容許簡潔的 Contact 頁面入口，但最終選擇必須符合實際完成範圍，不假設表單或聯絡管道已存在。

### 6.3 Introduction

標題：**讓技術成為企業成長的力量**。

建議內容：

> Xplore Kaleidoscope 整合網站開發、Java 企業系統、系統架構與 AI 應用技術，協助企業建立穩定、可擴充且符合實際營運需求的數位解決方案。
>
> 從網站建置、系統整合到 AI 應用，我們重視技術品質、實際效益與長期維護，讓數位技術真正創造商業價值。

### 6.4 Services — 五項核心服務

區塊標題：**Our Services**。中文副標題：**整合技術能力，提供企業所需的數位解決方案。**

#### R01 — Website Development

- 中文名稱：**網站設計與開發**。
- 說明：打造現代化、響應式且符合企業品牌形象的網站與 Web Application。
- 服務項目：Corporate Website、Landing Page、Business Website、Next.js Web Application、CMS Integration、Multilingual Website。
- Icon 建議：`Globe`。

#### R02 — Java Enterprise Solutions

- 中文名稱：**Java 企業系統開發**。
- 說明：使用 Java 與 Spring Boot 建立穩定、可維護且具備擴充能力的企業後端系統。
- 服務項目：Java / Spring Boot、Backend API、Enterprise System、Legacy System Refactoring、Database Integration。
- Icon 建議：`Code2`。

#### R03 — System Architecture & Integration

- 中文名稱：**系統架構與整合**。
- 說明：協助企業規劃系統架構、API 整合及後端系統，建立可靠的技術基礎。
- 服務項目：System Architecture、API Integration、Requirements Analysis、Backend System Planning、Enterprise System Integration。
- Icon 建議：`Network`。

#### R04 — AI Business Solutions

- 中文名稱：**AI 商業應用解決方案**。
- 說明：將 AI、RAG 與 Workflow Automation 整合至企業流程，提升資訊應用及營運效率。
- 服務項目：AI Chatbot、Enterprise RAG、AI Workflow Automation、AI Business Assistant、Custom AI Integration。
- Icon 建議：`BrainCircuit`。

#### R05 — Maintenance Services

- 中文名稱：**系統維護與技術支援**。
- 說明：提供網站、後端系統、API 與 AI 應用的持續維護及技術支援。
- 服務項目：Website Maintenance、Backend Maintenance、API Monitoring、AI Application Maintenance、Cloud Deployment Support。
- Icon 建議：`Settings`。

這五項是 Task 003 首頁規格；不得因後續 Services 內頁採用其他分類而移除首頁 R05 Maintenance、原 Service ID 或有效錨點。

### 6.5 Technology Capabilities

區塊標題：**Technology Capabilities**。中文副標題：**整合多元技術，打造完整數位解決方案。**

| 分類 | 必須保留的能力清單 |
| --- | --- |
| Frontend Development | Next.js、React、TypeScript、Tailwind CSS |
| Backend Development | Java、Spring Boot、REST API、Enterprise Backend |
| Database & Integration | PostgreSQL、MySQL、API Integration、Database Design |
| AI & Automation | OpenAI API、Claude Integration、RAG、AI Agents、Workflow Automation、n8n |
| Infrastructure | Docker、GitHub、Vercel、Cloud VPS |

上述為創辦人及 XK 的技術服務能力，**不代表所有技術已部署於目前官網**。不得因此建立 Backend／Database，也不得宣稱與特定科技公司有官方合作夥伴關係或使用未經證實認證標章。

### 6.6 Why XK — 四項價值

區塊標題：**Why Xplore Kaleidoscope**。中文副標題：**從技術實作到商業價值，提供完整的數位解決方案。**

| 價值 | 指定內容 |
| --- | --- |
| Integrated Technical Capabilities | 整合網站、企業系統、系統架構及 AI 技術，減少企業跨系統整合的複雜度。 |
| Business-oriented Solutions | 以實際商業需求為出發點，提供符合企業營運目標的技術方案。 |
| Scalable Architecture | 重視系統架構、程式碼品質及未來擴充能力，降低長期維護成本。 |
| Long-term Technical Support | 從系統建置到後續維護，提供持續性的技術協助。 |

不得加入虛構客戶數量、成功案例、專案成長率、企業合作紀錄或未證實的業界排名。

### 6.7 Solutions — 三種應用方向

區塊標題：**Digital Solutions for Business**。中文副標題：**依照企業需求，選擇適合的數位轉型方向。**

| 方向 | 指定內容 |
| --- | --- |
| Website & Digital Presence | 協助企業建立專業網站及數位服務入口。 |
| Enterprise System Modernization | 協助企業改善既有系統架構，整合後端服務與資料流程。 |
| AI-powered Business Automation | 將 AI 與自動化技術導入企業知識管理及日常營運流程。 |

本區塊著重解決方案方向，不需要建立完整產品功能。不得將尚未完成的 XK AI Business Assistant 描述成正式商用產品。

### 6.8 Contact CTA 與未確認資料

| 內容 | 指定／建議文案 |
| --- | --- |
| 英文標題 | Let's Build Something Valuable |
| 中文標題 | 讓我們一起探索更多可能。 |
| 說明 | 無論是企業網站、Java 系統開發、系統整合或 AI 應用，歡迎與我們討論您的需求。 |
| CTA | 開始討論您的專案 |

開始開發前確認是否已有正式 Email、已確認的 LinkedIn 公司／品牌頁面或可用聯絡表單。只有已確認可實際使用的管道才可成為聯絡目的地。

`contact@xplorekaleidoscope.com` 在先前規劃中僅為建議地址，不代表信箱正式建立；不得發布無效 `mailto:` 或把範例信箱、泛用 LinkedIn 首頁當成已確認的聯絡渠道。

目前沒有已確認管道時，必須保留 Contact CTA 視覺區塊、將實際聯絡方式標示為待確認，不建立假表單、假提交或無效 Email Link，並在最終報告列出。原稿「開始討論您的專案」不授權建立無法運作的按鈕；可提供有效的服務瀏覽入口並清楚說明聯絡限制，直到使用者確認真實管道。

## 7. Design System & Technical Constraints

### 7.1 確認技術與元件

沿用 Next.js、React、TypeScript、Tailwind CSS 4、shadcn/ui、Lucide React、App Router、`src/`、Strict TypeScript、ESLint、`@/*` alias，以及既有 Node.js 24.x／npm 環境。

Server Components 優先，只在實際需要互動時使用 Client Components。優先重用 `Button`、`Card`、`CardHeader`、`CardTitle`、`CardDescription`、`CardContent`、`Container`、`Section`、`XkLogo`、`BrandPattern`；現有元件足夠時不得複製相同功能。

不得重新初始化、替換 Tailwind／shadcn／套件架構、任意升降級 Dependencies 或新增不必要套件。未改相依時不得意外更新 lockfile；必要變更必須說明理由並驗證。Task 003 歷史上僅為 Pages 增加 `package.json` Script，不能將該事實改寫為任意修改套件版本的授權。

### 7.2 色彩、Typography 與 Logo

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

使用既有 CSS Semantic Tokens，不在元件重複硬編碼品牌 HEX。`--muted` 是次要文字色；`bg-muted` 對應 Surface 背景，不得混用。

沿用 Inter、Noto Sans TC、Microsoft JhengHei、PingFang TC、Arial、sans-serif，以及 `type-display`、`type-h1`、`type-h2`、`type-h3`、`type-body-lg`、`type-body`、`type-body-sm`、`type-caption`、`type-button`。重用現有 Container、Section、Radius、Shadow、Focus、Reduced Motion 與 Responsive Tokens，不建另一套衝突規則。

Logo 使用 `src/components/brand/xk-logo.tsx`，保留原始 XK 幾何、SVG Path、Transform、比例及提供的配色。不得重新繪製、任意變形或把原字標當一般文字重新排版；維持 **Provisional（暫定）**，不宣稱正式核准。既有可讀 HTML 品牌名稱可配合原圖形使用，不取代或改畫原始向量字標。

### 7.3 Accessibility 與效能

使用語意化 HTML、正確 Heading Hierarchy、清楚 Accessible Names、Logo 替代名稱及可見 Focus；Icon-only Button 必須有 Label，裝飾圖案 `aria-hidden`。鍵盤、Mobile Navigation、對比及 `prefers-reduced-motion` 不得為視覺效果犧牲。

減少不必要 JavaScript、Client Components、重複渲染與 State；避免大型圖片、不必要 Animation Libraries、第三方 Tracking Scripts 及繁複 CSS。若使用已提供圖片，採 Next.js 合適處理方式並兼顧靜態匯出；不得以裝飾增加無必要的初始載入成本。

不建立 Spring Boot Backend、PostgreSQL Database、Docker Backend 或獨立 API Server；技術能力清單不構成這些網站依賴。

## 8. Navigation, SEO & Deployment

### 8.1 路由與有效導覽

正式首頁為 `/`。原稿建議導覽及「目的頁未完成時」的替代如下；執行時以當時實際存在且已核准的頁面為準，不回退後續已完成頁面。

| Label | 已實作該頁時的原稿目的地 | 尚未實作時的處理 |
| --- | --- | --- |
| Home | `/` | 必須為真實首頁 |
| About | `/about` | 可用真實 `/#about`；保留既有品牌錨點相容性 |
| Services | `/services` | 可用真實 `/#services` |
| Solutions | `/solutions` | 可用真實 `/#solutions` |
| Portfolio | `/portfolio` | 以規劃文字呈現或不列入可點擊導覽 |
| Contact | `/contact` | 可用真實 `/#contact`，不得暗示已有可用表單 |
| Privacy Policy | `/privacy` | 未建立時不設失效連結 |

Header、Mobile Navigation、Footer 應共用集中設定。Footer 的五項服務分類沿用 R01–R05，連至實際 `/#service-{anchor}`；必須存在相應 ID。所有 CTA、首頁錨點及跨頁操作都需驗證，不將 planned route 當有效路由。

### 8.2 SEO 與發布保護

首頁使用 Next.js Metadata API：

| 項目 | 規格 |
| --- | --- |
| 建議 Title | Xplore Kaleidoscope \| Web, Java & AI Digital Solutions |
| 建議 Description | Xplore Kaleidoscope 提供網站開發、Java 企業系統、系統架構整合及 AI 商業應用解決方案，協助企業打造數位價值。 |
| Canonical | `https://xplorekaleidoscope.com`，保留品牌正式網域；允許框架正常輸出的根路徑斜線 |
| Open Graph | 專屬 Title、Description、URL，與首頁品牌內容一致；不虛構 Image 路徑 |
| 語言／語意 | `zh-TW`；保留英文品牌與標語；一個清楚 H1，後續 H2／H3 層次正確 |
| Indexing | 保留 construction-stage `noindex, nofollow`，不得因首頁完成而自動開放搜尋引擎索引 |

正式開放索引是獨立決策；沒有已核准 Open Graph Image 時不建立假圖檔或虛構圖片 URL。

### 8.3 部署決策與建置模式

| 層次 | 必須區分的內容 |
| --- | --- |
| 原始 Task 003 目標 | Vercel；保留一般 Next.js production build 與 Vercel 相容性 |
| 使用者後續已確認決策 | GitHub Actions → GitHub Pages 靜態網站，取代本次原始部署目的地 |
| 一般模式 | `npm run build` 產生一般 Next.js build，`npm run start` 執行；不得拿 Pages 的 `out/` 當成一般伺服器產物 |
| Pages 模式 | `npm run build:pages` 執行靜態匯出與驗證，輸出 `out/`；保持既有 Script、條件式設定與 Dependency 版本 |
| Base Path | 預設 `/xk-website`；workflow 依 Pages 設定讀取實際 `base_path`，不可硬編碼破壞專案網址的站內連結或資源路徑 |
| 品牌正式網域 | Canonical 保留 `https://xplorekaleidoscope.com`；不得擅改 DNS／Custom Domain 或宣稱已完成正式網域連接 |

保持 `out/index.html`、`404.html`、`.nojekyll`、正確 CSS／JS／字體／Logo 路徑與 noindex。Pages 公開產物不得提供 `/dev/design-system` 路由或頁面 payload；一般開發工具仍按既有規則開放，production 預設 404，只有明確 `XK_DESIGN_SYSTEM_PREVIEW=1` 才可驗收。

既有工作流程為 quality → pages-build → deploy。PR 執行鎖定依賴安裝、TypeScript、Lint、一般 Build、Pages Build 與 artifact 上傳；僅 `main` push 或明確手動選擇 `main` 才進入 deploy。非 `main` 手動執行與 PR 不部署，不自動 Merge。

不得把一般 `.next/` 診斷 artifact 誤稱為 Vercel `--prebuilt`，也不得只因產物存在或公開網址 200 就宣稱此版本已部署。Pages Source／Environment 若阻擋，依實際錯誤回報；是否修改設定或發布須有明確授權，不繞過保護或覆蓋未通過驗收的網站。

## 9. File Structure & Change Scope

以下為 **預計新增、修改或重用的位置**，不是本次文件整理已完成的檔案異動清單。實作時以現有結構與最終 Git Diff 為準，不因建議檔名而重複建立相同功能。

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── dev/design-system/page.tsx
├── components/
│   ├── brand/{xk-logo,brand-pattern}.tsx
│   ├── layout/
│   │   ├── container.tsx
│   │   ├── section.tsx
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   └── mobile-navigation.tsx
│   ├── sections/
│   │   ├── home-hero.tsx
│   │   ├── home-introduction.tsx
│   │   ├── home-services.tsx
│   │   ├── home-technologies.tsx
│   │   ├── home-why-xk.tsx
│   │   ├── home-solutions.tsx
│   │   └── home-contact-cta.tsx
│   └── ui/{button,card}.tsx
├── config/{site,homepage,navigation,contact}.ts
└── lib/utils.ts
```

- 共用 Section Heading 可沿用現有 `src/components/sections/section-heading.tsx`；若已有 `home-intro.tsx`，保留必要匯入相容性，不刪除既有功能。
- Page 管理組合／Metadata；Layout 管理 Header／Footer；Config 管理重複資料；Sections 管理視覺與語意。
- 僅在必要時調整 `next.config.ts`、`scripts/build-github-pages.mjs`、`.github/workflows/ci.yml` 與 `package.json` 的 build Script；記錄原因，不任意變更既有部署條件、依賴版本或 lockfile。
- 執行功能任務時，實作報告使用 `docs/homepage-implementation.md`，部署操作使用 `docs/github-pages-deployment.md`；保留 README、AGENTS、Design System 與 implementation notes 的既有歷史，不覆蓋前面任務成果。
- 不可修改文件 Repository，不提交 `.next/`、`out/`、`node_modules/`、暫存檔、Secrets、環境檔或憑證。
- 本次統一骨架的修改邊界另依使用者文件整理指示；本 Task Specification 本身不授權在文件重構時變更任何網站程式碼、套件或 workflow。

## 10. Implementation Procedure

1. 確認 Repository、Branch、Working Tree、最新 `main`、Task 002 合併關係與目前專案版本；保護未提交工作，缺前置條件即停止回報。
2. 閱讀第 3 節的實際文件，核對品牌、服務、Logo、元件 API、聯絡資訊與部署現況；記錄缺漏與重要衝突。
3. 建立或安全切換 `feature/website-homepage`，不能直接改／推 `main`，不能私自整合未核准分支。
4. 規劃七個區塊、Header／Footer、服務資料、有效導覽與聯絡替代方案；不假設內頁或信箱已可用。
5. 先完成共用 Header、Desktop／Mobile Navigation、Footer，再依順序實作 Hero、Introduction、Services、Technologies、Why XK、Solutions、Contact CTA。
6. 使用既有元件、Tokens 與 Responsive Utilities 完成 Mobile／Tablet／Desktop／Large Desktop，不建立平行設計系統。
7. 完成 Metadata、Heading Hierarchy、Accessible Navigation、Focus、Contrast、Reduced Motion、Pages Base Path 及開發路由保護。
8. 在最終程式碼完成後實際執行第 11 節的 Code Quality、一般 Build、Pages Build、瀏覽器與功能檢查，記錄指令及 Exit Code。
9. 若發現失敗，先修正，再重跑受影響項與必要完整驗收；不能把預期或歷史成功當本次結果。
10. 檢查完整 Git Diff、實際檔案清單、套件／lockfile／原始 Logo 保護與禁止提交產物，產生實際截圖與獨立報告。
11. 依第 13 節 Commit、Push Feature Branch、建立 PR；檢查本次實際 CI／artifact，回報交付狀態與剩餘事項，等待審核，不自動合併或發布。

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

### 11.1 狀態與分類規則

下表是待執行的驗收契約，**所有結果均為 PENDING**。`Required` 必須完成；`Optional` 若不執行需說明限制；`Not Applicable` 必須在本次報告確認不適用原因，不可以省略後假裝已測。未執行 Task 003 時，不因既有頁面或歷史報告存在就勾選通過。

### 11.2 Code Quality 與 Build

| 驗收項目 | 分類 | 必須確認的內容／原因 | 狀態 |
| --- | --- | --- | --- |
| `npm ci` | Required | 依已合併 lockfile 重現 Node.js 24.x 安裝與 CI 環境；記錄 Exit Code，不任意改 lockfile | PENDING |
| `npm install` | Required | 保留原 Task 003 指定指令的驗證；確認相依與 lockfile 未意外變更，必要變更須交代理由 | PENDING |
| `npx tsc --noEmit` | Required | Strict TypeScript 與既有元件 API 通過 | PENDING |
| `npm run lint` | Required | 使用既有 ESLint，記錄錯誤及警告，不以推測代替結果 | PENDING |
| `npm run build` | Required | 保留一般 Next.js／Vercel 相容 build，不把 Pages 模式產物誤用於 `npm run start` | PENDING |
| `npm run build:pages` | Required | 使用已確認 Pages 模式，驗證 `out/` 與現有 Script 斷言；無需任意變更 Dependencies | PENDING |
| 版本、原始 Logo、設定與 Diff 保護 | Required | 未重初始化，未任意升降級；原始 Path／Transform／比例與 Tokens 保留，禁止產物未進 Git | PENDING |
| 後端／資料庫／Contact API 測試 | Not Applicable | 本任務不建立這些功能，技術能力展示不代表官網依賴；報告須確認 N/A 理由 | PENDING（待記錄 N/A） |

### 11.3 Functional Testing

| 驗收項目 | 分類 | Task 003 專屬斷言／原因 | 狀態 |
| --- | --- | --- | --- |
| Homepage 與區塊順序 | Required | `/` 正常；Header → 七個指定 Section → Footer，Page 只組合區塊與 Metadata | PENDING |
| Hero 內容與 CTA | Required | 品牌／技術標語、中文定位、真實服務及聯絡入口正確；未完成內頁不能成假連結 | PENDING |
| Introduction | Required | 標題與兩段品牌價值內容符合第 6 節，閱讀清楚且留白足夠 | PENDING |
| Services 完整性 | Required | 恰有 R01–R05 五類、各中英文名稱／說明／全部項目摘要及 Icon；R05 Maintenance 不遺失 | PENDING |
| Technologies／Why XK／Solutions | Required | 五組能力、四項價值、三個應用方向均完整；沒有認證、合作、統計或已商用產品的虛構宣稱 | PENDING |
| Desktop Header／Footer | Required | Logo、品牌、導覽、Contact CTA、五服務分類、Legal 狀態與程式產生年份正確 | PENDING |
| Mobile Navigation | Required | Button 有名稱及正確 `aria-expanded`；鍵盤、開／關、Escape、焦點還原、連結後狀態與桌面切換正常；不鎖住整頁 | PENDING |
| 所有有效連結與錨點 | Required | Header／Footer／CTA／Solutions／服務錨點均導向實際內容；Base Path 與既有跨頁導覽保留 | PENDING |
| Contact 未確認分支 | Required | 無已確認 Email／LinkedIn／表單時顯示待確認，不出現假表單、無效 mailto 或假成功操作 | PENDING |
| Contact 已確認分支 | Optional | 僅在使用者提供並確認可公開管道時測試該真實渠道；無資料則在報告說明未測原因 | PENDING |
| 未完成頁面／Privacy／例外狀態 | Required | planned route 不變假連結，Privacy 未建立不連錯頁，未知路由呈現 404 | PENDING |
| 保留 Task 001／002 與後續已合併功能 | Required | 原設計系統、開發工具保護及已有內頁／錨點沒有 Regression | PENDING |
| 聯絡表單提交／AI Chatbot／Analytics | Not Applicable | 本任務不提供這些功能，不建立假提交或追蹤 | PENDING（待記錄 N/A） |

### 11.4 Responsive 與 Accessibility

| 驗收項目 | 分類 | 具體標準／原因 | 狀態 |
| --- | --- | --- | --- |
| 320px Small Mobile | Required | 無水平溢出、標題重疊、Card 超出或 CTA 衝突；Header／Footer 可閱讀，服務一欄 | PENDING |
| 375px Mobile | Required | 手機選單與觸控 CTA 可操作，字體合理、裝飾不遮字，服務一欄 | PENDING |
| 768px Tablet | Required | 服務兩欄、內容間距一致，技術／Footer 分組不超出容器 | PENDING |
| 1440px Desktop | Required | 服務三欄且第二排自然排列，Header／Hero／Footer 層次清楚 | PENDING |
| 1920px Large Desktop | Required | Container 限寬及留白正常，無過度拉伸、文字重疊或多餘水平捲動 | PENDING |
| axe WCAG 2／2.1 A／AA | Required | 用可取得工具掃描首頁與展開手機選單，記錄版本、範圍、違規與修正；不宣稱完整認證 | PENDING |
| Keyboard、Focus、Names | Required | Tab／Enter、skip link、Escape、可見 Focus、Icon-only Label、Logo 替代名稱正常 | PENDING |
| 語意、Heading、Contrast 人工檢查 | Required | 單一 H1、H2／H3 階層、真實連結／Button、適當對比；深色 Footer 文字可讀 | PENDING |
| Reduced Motion | Required | `prefers-reduced-motion` 下過渡／動態符合既有 Tokens，不只依程式碼推測 | PENDING |
| 輔助科技深入檢查 | Optional | 視可取得的螢幕閱讀器／裝置進行；未做須記錄，不能用 axe 取代全部人工驗證 | PENDING |

### 11.5 Browser、SEO 與 GitHub Pages

| 驗收項目 | 分類 | 具體標準／原因 | 狀態 |
| --- | --- | --- | --- |
| 實際啟動網站與 HTTP | Required | 一般 production 首頁 200、開發工具預設 404；Pages 靜態首頁 200，未知路徑／404 文件行為合理 | PENDING |
| Console／Runtime／Network | Required | 不得有 JavaScript Runtime Errors；Console、CSS、JS、字體與其他資源載入錯誤逐項記錄 | PENDING |
| 所有靜態資源 | Required | Logo、CSS、JS、字體及提供圖片可取得，路徑適用實際 Base Path | PENDING |
| SEO Metadata | Required | Title／Description／Canonical／OG Title／Description／URL、`zh-TW`、單一 H1 正確；無虛構 OG Image | PENDING |
| Construction-stage Indexing | Required | 一般與 Pages 首頁均保留 `noindex, nofollow`；不得擅自開放索引 | PENDING |
| Pages Base Path | Required | `/xk-website` 或實際設定路徑下，導覽、跨頁及資源 URL 均有效，不硬編碼破壞站內連結 | PENDING |
| Pages 靜態輸出與保護 | Required | `index.html`、`404.html`、`.nojekyll` 存在；公開產物無 `/dev/design-system` 路由／payload | PENDING |
| 一般／Pages 模式回歸 | Required | 分別驗收兩種 build；切換模式後使用正確產物，不改壞一般 Next.js 執行 | PENDING |
| PR CI 與 artifact | Required | 核對本次實際 head 的 quality／pages-build、artifact 與 Deploy SKIPPED，不用本機或舊 run 代替 | PENDING |
| 量化效能工具 | Optional | 視環境使用 Lighthouse 等工具記錄方法與數值；原稿未指定分數，不自行捏造達標結果 | PENDING |
| main 發布／公開網站 Smoke | Optional | 只有另獲明確合併／發布授權後檢查實際 main workflow、URL 與內容；未發布不得宣稱已上線 | PENDING |
| DNS／Custom Domain／後端健康檢查 | Not Applicable | 本任務不擅改網域設定或建立 Backend；需獨立授權與範圍 | PENDING（待記錄 N/A） |

### Test Failure Policy

- `FAIL` 不得標記為 `PASS`，原始失敗與重驗紀錄均須保留。
- 發現問題必須記錄原因、影響範圍及修正方式；可修正的問題應先修正，再重新執行相關測試及必要回歸。
- 無法修正的問題必須列入報告的 Known Issues，註明嚴重程度、交付影響、目前狀態及後續處理方式。
- 存在阻礙交付的 `FAIL` 或必要驗收的 `BLOCKED`，不得宣稱任務完整通過。交付須符合原規格；不適用項目只有在附上理由與依據後才能記為 `N/A`。
- 不得透過跳過測試、降低驗收標準、隱藏錯誤或展示舊成功結果取得 `PASS`。
- 外部服務、權限或環境造成的阻礙，必須記錄實際原因、發生時間、影響測試及解除條件；不得虛構執行結果。

## 12. Test Report & Evidence

Task 003 的獨立實作與測試報告使用 [docs/homepage-implementation.md](../reports/homepage-implementation.md)；部署操作與模式差異參閱 [docs/github-pages-deployment.md](../reports/github-pages-deployment.md)。歷史總覽位於 [implementation notes](../implementation-notes.md)。

報告必須記錄：

- 實際 Repository、Base／Feature Branch、受測 Commit／tree、Task 002 合併確認、套件及文件版本。
- 環境：作業系統、Node.js／npm、瀏覽器與自動化／axe 版本、測試模式、URL、Base Path、日期時間及旗標。
- 每個實際執行指令、完整測試範圍、Exit Code 與 PENDING／PASS／FAIL／BLOCKED／N/A 狀態；Required／Optional／Not Applicable 的適用性另列。未執行、不適用或受阻項目依第 11 節各記錄理由及證據，不把 PENDING 當 PASS。
- 七個首頁區塊、Header／Footer／Desktop／Mobile Navigation、CTA、所有有效連結、Contact 待確認分支及例外狀態結果。
- 320／375／768／1440／1920px 的逐項響應式結果，axe、鍵盤、Focus、Reduced Motion、Heading、Contrast 與人工限制。
- Browser Console／Runtime／Network、資產與 HTTP、一般 build／Pages artifact、404、`.nojekyll`、Base Path、Metadata 及開發路由保護結果。
- 發現的問題、具體修正、修正後重新執行的指令與最終驗收結果；若失敗不得只展示舊成功畫面。
- 真實網站截圖及檔案位置：至少 Desktop／Mobile 首頁；可補手機導覽、服務、技術、Solutions、Contact。既有範例為 `docs/screenshots/task003-1440.png` 與 `docs/screenshots/task003-375.png`，新證據必須來自本次受測版本，不能冒充示意圖或沿用舊圖。
- 實際 Commit、PR、Actions run／head、各 job 結果、artifact；未獲發布授權時明確標示未發布。獲授權後才記錄 main deploy、完成時間、URL 與公開頁面 Smoke。
- 尚未確認的聯絡方式、未完成頁面／品牌素材、工具或權限限制、需使用者決策事項與後續工作。

現有報告中的實際通過結果與 legacy／待審核等敘述，保留其原始時點。文件重構不修改這些歷史報告，也不憑其內容預填本規格的 PASS、Commit、PR、CI 或部署成果。

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

| 項目 | 要求 |
| --- | --- |
| Feature Branch | `feature/website-homepage` |
| Base Branch | `main`，開始前確認最新版本與前置任務已合併 |
| 建議 Commit | `feat(website): implement XK corporate homepage` |
| PR Title | `Task 003: XK Corporate Homepage Development` |
| 審核原則 | 不直接修改／Push `main`，不自動 Merge；功能分支經檢查後交付 PR 等待審核 |
| CI | 以本次實際 head 的 quality、pages-build、artifact 及 Deploy SKIPPED 為準；失敗先修正並重驗 |
| 發布 | 未經明確授權不合併／發布；工作流程存在不等同已部署 |

PR Description 必須包含 Task Objective、Homepage Sections、Components Created、Responsive Implementation、SEO Changes、Accessibility Results、Quality Check Results、真實 Screenshots、Remaining Issues，以及必要的 Pages 相容性與聯絡限制。

提交前檢查完整 Git Diff，確認只有授權範圍、沒有覆蓋使用者工作、沒有 `.next/`／`out/`／Secrets／暫存產物；相依與 lockfile 若變更須解釋。Commit SHA、PR 編號與 CI Run ID 均以實際紀錄為準，不預填或虛構。

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

執行 Task 003 時應交付下列成果；實際完成與否由第 12 節報告及 GitHub 證據記錄，本清單不是文件重構的完成宣稱：

- 正式 Header、Desktop／Mobile Navigation、Footer，以及按順序組合的七個首頁區塊。
- 集中品牌／首頁／服務／導覽／已確認聯絡設定，保留所有指定文案、技術能力與可用連結。
- 既有 XK Design System、原稿暫定 Logo、語意 HTML、基本 SEO、Responsive 與 Accessibility 整合。
- 一般 Next.js build、Pages 靜態產物與其保護／驗證；不將產物提交 Git。
- 實際新增／修改檔案清單、理由與完整 Diff，不用建議結構冒充已完成清單。
- 獨立首頁實作與測試報告、必要部署操作記錄、Desktop／Mobile 與相關區塊的真實截圖。
- 實際 Conventional Commit、Feature Branch、PR、CI／artifact 結果與剩餘事項；發布須另有授權及證據。

最終報告以繁體中文提供 Repository 狀態、Base／Feature Branch、實際 Commit／PR、Header／Footer／七區塊、Responsive、Metadata、Accessibility，以及 TypeScript／ESLint／一般 Build／Pages Build／Desktop Browser／Mobile Browser 的實際結果。

## 15. Out of Scope & Future Work

- 完整 About、Services、服務明細、Solutions、Portfolio、Contact、Privacy 內頁，依後續已核准任務分別開發；不可因首頁有相關區塊就宣稱這些頁面已完成。
- Spring Boot、PostgreSQL、Docker Backend、獨立 API Server、Contact API、CMS、Authentication、AI Chatbot、Analytics、第三方 Tracking 與不必要 Animation Libraries。
- XK AI Business Assistant 的完整產品功能與正式商用宣稱；本次只描述未來方向／應用情境。
- 尚待確認的公開 Email／LinkedIn／表單、最終 Logo 核准、Open Graph Image、正式網域連接與搜尋索引開放。
- 價格、SLA、客戶數量、成果統計、認證、排名或合作紀錄等未經證實的商業內容。
- 未授權的 DNS／Custom Domain／Pages 設定變更、功能分支發布與自動合併。

上述未完成項與決策在交付報告列明。後續已合併成果以實際版本為準，不因本原始首頁任務的歷史範圍而刪除或回退。

## 16. Final Delivery Checklist

以下均為 **PENDING**；執行 Task 003 並取得對應證據後，才可在本次獨立報告確認，不用歷史紀錄或本次文件整理代替：

執行狀態依第 11 節統一使用 `PENDING`、`PASS`、`FAIL`、`BLOCKED`、`N/A`。僅有證據的 `PASS` 可勾選；其餘保持未勾選，`N/A` 附判定理由且不視為缺少適用驗收。必要項目仍為 `PENDING`、`FAIL` 或 `BLOCKED` 時，不得宣稱完整通過。以下是規格初始清單，本輪文件修訂不代填功能結果。

- [ ] PENDING — 確認 Repository／最新 main／工作目錄及 Task 002 已合併；缺前置條件已停止回報。
- [ ] PENDING — 保留 Task 001／002 架構、Dependencies、Design System、原始 Logo 路徑與 Provisional 狀態。
- [ ] PENDING — 正式 Header、Desktop Navigation、Contact CTA 與可操作的 Mobile Navigation 完成。
- [ ] PENDING — Hero、Introduction、Services、Technology Capabilities、Why XK、Solutions、Contact CTA 七區塊順序與內容完整。
- [ ] PENDING — R01–R05 全部服務項目、五個技術群組、四項價值與三個應用方向均保留。
- [ ] PENDING — Footer 品牌／導航／五服務／Legal 狀態／程式產生年份完成。
- [ ] PENDING — 聯絡管道已驗證，或清楚標示待確認；無假表單、無效 mailto 或虛假功能。
- [ ] PENDING — 單一 H1、Title／Description／Canonical／Open Graph／語言與 noindex／nofollow 正確。
- [ ] PENDING — `npm ci`／原稿 `npm install` 已實際執行並記錄，沒有意外 lockfile 變更。
- [ ] PENDING — TypeScript 通過並有本次 Exit Code 與紀錄。
- [ ] PENDING — ESLint 通過並記錄實際錯誤／警告結果。
- [ ] PENDING — 一般 Next.js Build 通過，保留原部署模式。
- [ ] PENDING — Pages Build 通過，Base Path／404／`.nojekyll`／資源路徑與開發路由排除正確。
- [ ] PENDING — 首頁、全部連結／錨點、手機選單、CTA 與既有功能回歸測試完成。
- [ ] PENDING — 320／375／768／1440／1920px Responsive 驗收完成，無溢出／重疊／Card 超框。
- [ ] PENDING — axe WCAG 2／2.1 A／AA、鍵盤、Focus、Accessible Names、Contrast、Reduced Motion 與必要人工檢查完成。
- [ ] PENDING — Browser Console／Runtime／Network／資產／HTTP 與效能基本檢查完成。
- [ ] PENDING — 發現問題已修正並重新驗收，Optional／N/A／工具限制有明確說明。
- [ ] PENDING — 獨立測試與實作報告完成，包含環境、指令、Exit Code、PENDING／PASS／FAIL／BLOCKED／N/A 狀態、適用性、修復及重驗紀錄。
- [ ] PENDING — 本次實際 Desktop／Mobile 與相關區塊截圖完成，位置與受測版本可追溯。
- [ ] PENDING — Git Diff 檢查完成，只有授權範圍，無產物、機密或使用者工作遺失。
- [ ] PENDING — Conventional Commit 與 Feature Branch 推送完成，識別碼為實際紀錄。
- [ ] PENDING — PR 已建立，包含指定內容、截圖與剩餘事項，等待審核，未自動合併。
- [ ] PENDING — 本次 CI quality／pages-build／artifact 已確認；PR Deploy SKIPPED，沒有未授權發布。
- [ ] PENDING — 未修改 Documentation Repository、未開發 Backend，未加入虛假商業資訊。
- [ ] PENDING — 最終繁體中文交付報告完成；若另獲發布授權，已補實際 main 部署證據，否則明確標示未發布。
- [ ] PENDING — Test Failure Policy 已遵守，失敗、阻礙與 Known Issues 有完整記錄，沒有阻礙交付的未解決必要驗收。
- [ ] PENDING — 每項測試的 Test ID、預期／實際結果、狀態與可追溯證據已記錄，沒有以預期或舊結果代填。
- [ ] PENDING — 獨立報告已在 PR 建立前完成並納入同一 PR，最後測試、後續重驗與實際提交的程式碼一致。
- [ ] PENDING — 本機、Feature Commit、PR CI、PR Review、合併授權、main CI、部署與公開 URL 驗證分別記錄；未發生階段維持 PENDING 並說明，沒有冒稱已發布。
