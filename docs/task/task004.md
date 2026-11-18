Task 004 — XK About Us 品牌介紹頁實作

1. Project Identity
   Project Name: Xplore Kaleidoscope
   Brand Abbreviation: XK
   Website Repository: xk-website
   Documentation Repository: xplore-kaleidoscope
   Domain: https://xplorekaleidoscope.com
   Brand Slogan: Explore Possibilities. Create Digital Value.
   Technical Tagline: Building Digital Solutions with Web, Java & AI.
   Primary Language: Traditional Chinese (zh-TW)

本次目標：

正式開發 XK 官方網站 About Us 品牌介紹頁，建立品牌定位、企業理念、技術能力、服務價值與創辦人介紹，提升潛在客戶對 XK 的理解及信任。

2. Your Role

Act as a Senior Next.js Engineer, UI/UX Designer and Software Architect.

負責在既有網站架構及 Design System 上完成 About Us 頁面。

要求：

專業企業形象。
現代科技視覺。
國際化品牌風格。
清楚的資訊架構。
Responsive Design。
SEO-friendly。
Accessible UI。
Maintainable Components。

不要重新初始化專案或重新設計已確認的品牌系統。

3. Repository Rules

Website Repository:

xk2022/xk-website

Documentation Repository:

xk2022/xplore-kaleidoscope

遵循：

先檢查目前 Repository、README、AGENTS.md、Git Status。
閱讀 Task 001、002、003 的實際實作及紀錄。
閱讀文件 Repository 的 Week 02 品牌、網站架構及首頁文案文件。
只修改 xk-website。
不修改文件 Repository。
保留既有程式碼及 Design System。
不直接 Push 至 main。
不自動合併 Pull Request。

文件 Repository 僅供讀取。

如果文件或既有實作有衝突，優先保留已合併的網站架構及品牌 Design System，並在報告中說明。

4. Confirmed Technology Stack

不得替換既有技術：

Next.js
React
TypeScript
Tailwind CSS 4
shadcn/ui
Lucide React
Next.js App Router
GitHub Actions
GitHub Pages

保留現有 Node.js 24.x、npm 及專案相依套件版本。

本次不需要：

Spring Boot
PostgreSQL
Docker Backend
Separate API Server
Contact API
CMS
Authentication
Analytics

About Us 必須以獨立前端頁面完成。

5. Existing Design System

必須重用 Task 002 已建立的元件與 Tokens。

Brand Colors
Token Value
Primary #101A33
Secondary #3157D5
Accent #19B8D5
Background #FFFFFF
Surface #F5F7FB
Foreground #172033
Muted #667085
Border #E4E8F0
Existing Components

優先使用：

XkLogo
BrandPattern
Container
Section
Button
Card
CardHeader
CardTitle
CardDescription
CardContent

沿用：

Typography Utilities
Responsive Spacing
Brand Radius
Brand Shadow
Focus States
Reduced Motion
Existing Font Configuration

不得另外建立一套平行 Design System。

Logo 使用已提供的 SVG 原始素材，維持 Provisional（暫定版本）狀態，不得自行宣稱最終品牌核准。

6. Git Workflow

建立 Feature Branch：

feature/website-about-page

以目前最新 main 為基礎，不得假設 Task 003 已經合併。

開始前確認：

Task 003 是否已合併。
最新 main commit。
工作目錄是否乾淨。
目前首頁是否正常。
既有 GitHub Pages 設定。

如果 Task 003 尚未合併，停止實作並回報依賴問題，不可自行將未核准的分支內容合併進來。

7. About Us Page Information Architecture

正式路由：

/about

頁面必須包含以下區塊。

Section 1 — About Hero

目的：

建立品牌第一印象。

內容：

主標題：

「探索可能性，創造數位價值。」

英文品牌標語：

Explore Possibilities. Create Digital Value.

技術標語：

Building Digital Solutions with Web, Java & AI.

品牌簡介：

Xplore Kaleidoscope（XK）整合網站開發、Java 企業系統、系統架構與 AI 應用技術，協助企業將商業需求轉化為可靠、可擴充且具實際價值的數位解決方案。

視覺：

XK Logo。
Geometric Kaleidoscope。
幾何對稱視覺。
品牌主色及輔助色。
專業企業形象。
Section 2 — Who We Are

標題：

「我們是誰」

內容：

XK 是以軟體工程、系統整合與人工智慧應用為核心的數位技術品牌。

我們關注企業在數位轉型過程中面臨的實際問題，從網站建置、企業後端系統、API 整合到 AI 應用，提供符合業務需求的技術服務。

我們重視：

技術品質。
商業需求理解。
系統可維護性。
架構擴充能力。
長期合作價值。

不得宣稱尚未成立的法人、辦公室、員工人數或企業規模。

XK 目前為創辦人一人全職經營的技術服務品牌，內容應呈現專業且可信賴的品牌形象，不得虛構團隊。

Section 3 — Our Mission

標題：

「我們的使命」

核心理念：

讓技術成為企業創造價值的工具。

說明：

我們希望透過可靠的軟體工程、現代化系統架構與 AI 技術，協助企業改善營運流程、提升工作效率，並建立能持續成長的數位能力。

設計：

三欄或卡片式呈現。
技術與商業價值並重。
使用 Lucide React 圖示。
不使用虛構統計數據。
Section 4 — Our Vision

標題：

「我們的願景」

內容：

逐步發展成整合網站開發、企業系統、AI 應用與自動化服務的整合型 AI 網路公司。

發展方向：

建立可靠的數位技術服務。
將成熟的 AI 解決方案標準化。
發展自主 AI SaaS 產品。
協助更多台灣及海外企業創造數位價值。

注意：

以上為品牌發展方向，不得描述成已完成的商業成果。

Section 5 — Core Capabilities

標題：

「核心技術能力」

以五個分類呈現。

01 Website Development

Next.js
React
TypeScript
Responsive Web Design
Website Architecture

02 Java Enterprise Development

Java
Spring Boot
Backend API
Enterprise Application
Database Integration

03 System Architecture & Integration

System Architecture
API Integration
Database Design
Enterprise System Integration
Technical Planning

04 AI & Automation

OpenAI API
Spring AI
RAG
AI Agents
n8n Workflow Automation

05 Cloud & Infrastructure

Vercel
Cloud VPS
Docker
GitHub
Deployment Architecture

以上為 XK 可提供的技術服務能力，不代表每項技術都已部署於目前官網。

Section 6 — Our Approach

標題：

「我們的工作方式」

呈現五個工作階段：

Understand — 理解需求
了解客戶的商業目標與實際問題。
Analyze — 需求分析
評估技術需求、系統限制與實作範圍。
Architect — 架構規劃
設計適合需求且可擴充的技術方案。
Develop — 開發實作
以可靠的工程流程完成開發與測試。
Deliver & Improve — 交付與持續改善
完成交付，並依需求提供維護與優化服務。

設計：

Desktop 使用流程式呈現。
Mobile 改為垂直流程。
不製造不存在的認證或品質保證承諾。
Section 7 — Founder Introduction

標題：

「創辦人」

定位：

Founder & Software Engineer

內容：

XK 由具備網站開發、Java 企業系統、系統架構及 AI 應用整合經驗的軟體工程師創立。

專注領域：

Website Development
Java Enterprise Development
Spring Boot
System Architecture
API Integration
AI Application Integration

介紹文案：

從網站應用到企業後端系統，從系統架構到人工智慧整合，致力於以軟體工程解決實際商業問題。

注意：

不虛構創辦人姓名。
不虛構學歷、年資、證照或工作經歷。
不虛構個人照片。
沒有經過確認的資訊不得公開。
沒有提供照片時，使用品牌幾何視覺作為圖像，不建立假人像。

創辦人姓名及照片預留未來設定位置。

Section 8 — Our Commitment

標題：

「我們重視的不只是交付，更是長期價值。」

呈現四項承諾：

Engineering Quality：重視程式碼品質及系統穩定性。
Business Value：以客戶實際需求為出發點。
Scalable Architecture：考慮未來擴充與維護。
Long-term Partnership：重視持續改善與長期合作。

以上為品牌服務理念，不得擴大成未經驗證的保證。

Section 9 — CTA

標題：

「讓我們一起探索下一個數位可能。」

說明：

無論是企業網站、Java 系統、系統整合或 AI 應用，都可以從理解需求開始。

按鈕：

了解服務 → /#services
聯絡 XK → /#contact

使用目前已存在的真實首頁錨點。

不得建立無法使用的聯絡表單或虛構聯絡方式。

8. Page Layout & Components

正式路由：

src/app/about/page.tsx

建議元件：

text
src/
├── app/
│ └── about/
│ └── page.tsx
├── components/
│ └── sections/
│ └── about/
│ ├── about-hero.tsx
│ ├── about-who-we-are.tsx
│ ├── about-mission-vision.tsx
│ ├── about-capabilities.tsx
│ ├── about-approach.tsx
│ ├── about-founder.tsx
│ ├── about-commitment.tsx
│ └── about-cta.tsx
└── config/
└── about.ts

可以依照實際元件複雜度調整，但必須遵循：

Page 負責組合區塊。
Config 集中管理重複內容。
Components 負責視覺與語意。
避免把所有內容寫在單一 page.tsx。
Server Components 優先。
只有必要的互動才使用 Client Components。

不新增不必要的 Dependencies。

9. Navigation Integration

更新既有 Navigation：

首頁
關於 XK
服務項目
解決方案
聯絡我們

About Us 導覽指向：

/about

Header 與 Footer 必須正確支援 GitHub Pages Base Path。

注意：

GitHub Pages 專案網址可能包含 /xk-website/。

禁止直接硬編碼會破壞 Base Path 的絕對站內路徑。

優先沿用 Task 003 已實作的 URL Helper 或既有路由設定。

未完成的內頁不可變成假連結。

10. SEO Requirements

使用 Next.js Metadata API。

About Us 必須具備：

Title：

關於 XK | Xplore Kaleidoscope

Description：

認識 Xplore Kaleidoscope（XK），了解我們的品牌理念、網站開發、Java 企業系統、系統整合與 AI 應用技術能力。

設定：

Canonical URL：https://xplorekaleidoscope.com/about
Open Graph Title
Open Graph Description
Open Graph URL
Language：zh-TW

其他要求：

一個清楚的 H1。
正確的 H2/H3 階層。
圖片提供適當的 alt。
裝飾性 SVG 使用 aria-hidden。
不新增虛構的 Organization Rating、Review 或 Awards Schema。

保留目前 construction-stage 的 noindex, nofollow 保護，除非使用者另行確認開放搜尋索引。

沒有核准的 Open Graph Image 時，不得建立虛構圖片路徑。

11. Responsive Design

至少測試：

Viewport Width
Small Mobile 320px
Mobile 375px
Tablet 768px
Desktop 1440px
Large Desktop 1920px

要求：

無水平溢出。
標題不重疊。
卡片保持一致間距。
手機流程改為垂直排列。
Logo 不失真。
文字具良好閱讀性。
Header Mobile Navigation 正常。
不依賴 Hover 才能操作。12. Accessibility

遵循 WCAG 2.1 AA 基本要求：

Semantic HTML。
Keyboard Navigation。
Visible Focus。
Appropriate Contrast。
Correct Heading Hierarchy。
Accessible Links。
Decorative Elements 使用 aria-hidden。
Reduced Motion Support。

執行 axe Accessibility Scan，記錄實際結果。

不得只以自動掃描結果宣稱完全符合所有無障礙標準。

13. GitHub Pages Compatibility

維持 Task 003 的 GitHub Actions → GitHub Pages 靜態部署架構。

要求：

/about 必須能成功靜態輸出。
支援 GitHub Pages Base Path。
Logo、CSS、JS、圖片路徑正常。
頁面不依賴 Server Runtime。
不使用需要 Backend 的功能。
不破壞既有首頁及其他靜態資源。
不將 .next/ 或 out/ 提交到 Git。

如果既有 Pages Workflow 有需要修改的地方，僅修改必要設定並說明原因。

14. Quality Checks

完成後實際執行：

bash
npm ci
npx tsc --noEmit
npm run lint
npm run build
npm run build:pages

如果指令因目前專案設定不同而需要調整，先檢查 package.json 並記錄。

另外執行：

About Us HTTP Smoke Test。
Homepage Regression Test。
All Navigation Links Test。
Responsive Layout Test。
Accessibility Scan。
Browser Console Error Check。
Static Export Asset Check。

不要沿用 Task 001、002、003 的驗收結果代替本次測試。

15. Screenshots

提供至少以下截圖：

text
docs/screenshots/
├── task004-about-desktop.png
├── task004-about-mobile.png
├── task004-about-capabilities.png
├── task004-about-approach.png
└── task004-about-footer.png

截圖必須來自本次實際執行的網站，不可使用示意圖。

16. Git Commit & Pull Request

Branch：

feature/website-about-page

Commit Message 建議：

feat(about): implement XK about page

建立 Pull Request：

Base: main

Compare: feature/website-about-page

PR Description 必須包含：

實作內容。
新增及修改檔案。
Design System 使用方式。
SEO 設定。
GitHub Pages 相容性。
測試結果。
截圖。
尚未完成事項。

不得自動合併。

17. Final Report

請以繁體中文回報：

Repository Inspection。
Task 003 合併狀態。
Documentation Inspection。
新增檔案。
修改檔案。
About Us 頁面實作內容。
Navigation 更新。
SEO Metadata。
Responsive 測試。
Accessibility 測試。
TypeScript 結果。
ESLint 結果。
Next.js Build 結果。
GitHub Pages Build 結果。
Screenshot 清單。
Git Branch。
Commit SHA。
Pull Request URL。
尚未完成事項。

所有結果必須根據實際執行紀錄，不得捏造。

18. Definition of Done

Task 004 完成條件：

/about 正式頁面完成。
品牌介紹內容完整。
Mission & Vision 完成。
Core Capabilities 完成。
Our Approach 完成。
Founder Introduction 完成，且不包含未確認資訊。
Our Commitment 完成。
CTA 指向有效頁面錨點。
Header / Footer 導覽正常。
沿用 XK Design System。
Responsive Design 通過。
TypeScript、ESLint、Build 通過。
GitHub Pages Static Export 通過。
首頁沒有 Regression。
Pull Request 已建立並等待審核。

不得開始 Backend 開發。

不得擅自更改已確認的品牌、商業或技術決策。

Explore Possibilities. Create Digital Value.

以下忽略不計，call by text:

請先完整閱讀 Repository 根目錄的 AGENTS.md、README.md，以及 docs/task/task004.md。

接著檢查目前 main、Task 003 合併狀態及既有程式碼。

依照 Task 004 規格正式實作 XK About Us 品牌介紹頁。

請注意：

不要重新初始化 Next.js。
不要替換既有 Design System。
不要修改文件 Repository。
不要虛構創辦人資料、照片或聯絡方式。
保留 GitHub Pages 靜態部署架構。
使用獨立 Feature Branch。
完成所有指定測試及截圖。
建立 Pull Request，但不要自動合併。

請以繁體中文提供完整實作報告。

如果 Task 003 尚未合併，請停止並回報，不要自行整合未核准的程式碼。
