XK Website — Task 003
Corporate Homepage Development
官方企業網站首頁開發

Project: Xplore Kaleidoscope
Repository: xk-website
Brand: XK
Domain: https://xplorekaleidoscope.com

Brand Slogan:

Explore Possibilities. Create Digital Value.

Technical Tagline:

Building Digital Solutions with Web, Java & AI.

1. Task Objective（任務目標）

本次任務正式進入 XK 官方企業網站首頁開發階段。

Task 001 已完成 Next.js 專案基礎架構。

Task 002 已完成 XK Brand Design System，包括：

Brand Design Tokens
Typography
XK Logo Component
Button Component
Card Component
Container Component
Section Component
Brand Pattern
Responsive Design 基礎
Accessibility 基礎

Task 003 的目標是使用現有技術架構與 Design System，完成一個具有專業企業形象、清楚服務定位及商業轉換能力的官方首頁。

首頁必須：

清楚呈現 Xplore Kaleidoscope 品牌定位。
展示 Website、Java、System Architecture 與 AI 技術能力。
介紹 XK 的核心商業服務。
建立專業、國際化的企業形象。
提供清楚的服務導覽。
提供可使用的聯絡資訊入口。
支援 Desktop、Tablet、Mobile。
具備基本 SEO 與 Accessibility。
可直接部署至 Vercel。

本次只開發 Homepage，不開發完整內頁及 Backend。

2. Repository Rules（Repository 管理規範）

本專案使用兩個獨立 Repository。

2.1 Documentation Repository

Repository:

xplore-kaleidoscope

用途：

Business Plan
Brand Guidelines
Technical Specifications
Product Planning
Project Documentation

只允許讀取，不得修改。

2.2 Website Repository

Repository:

xk-website

用途：

Next.js Website
Frontend Components
Website Configuration
Website Assets
Deployment Configuration

本次所有程式碼修改只能發生在 xk-website。

2.3 Git Rules

本次使用：

feature/website-homepage

執行規範：

不得直接修改 main。
不得直接推送至 main。
不得自動 Merge。
必須先檢查目前 Git 狀態。
不得覆蓋尚未提交的使用者修改。
不得假設 Task 002 已經合併，必須實際檢查。
如果 Task 002 尚未合併，停止正式開發並回報原因。
完成後建立 Conventional Commit。
準備 Pull Request 供審核。3. Documentation Inspection（文件檢查）

開始開發前，先閱讀：

3.1 Website Repository

檢查以下文件：

README.md
AGENTS.md
docs/implementation-notes.md
docs/brand-design-system.md
docs/task/task001.md
docs/task/task002.md

如果 task001.md、task002.md 或其他任務文件尚未存在於 Repository，不得假設其存在。

3.2 Documentation Repository

如果可以讀取 xplore-kaleidoscope，請檢查：

Canonical Directory:

doc/01_business-plan/week-02/

優先閱讀：

01*brand-identity*品牌視覺識別規範.md
02*logo-guidelines_XK Logo 設計與使用規範.md
03_color-palette*品牌色彩系統規範.md
04*typography*品牌字體與排版規範.md
05*website-sitemap* 官方網站資訊架構與網站地圖.md
06*homepage-copywriting*官方網站首頁文案規劃.md
08*website-architecture*官方網站 Next.js 技術架構設計.md
09*website-mvp*官方網站 MVP 開發規格.md

文件 Repository 僅供讀取。

3.3 規格優先順序

發生規格衝突時，依以下順序處理：

已合併至 main 的 Task 001、Task 002 實際程式碼及元件 API。
本次 Task 003 明確規定。
已確認的品牌與商業決策。
舊版規劃文件。

不得為了配合舊文件而破壞已完成的 Design System。

如果發現重要衝突，先記錄並回報。

4. Confirmed Technology Stack（已確認技術架構）

必須沿用：

Technology Purpose
Next.js Frontend Framework
React UI Library
TypeScript Type Safety
Tailwind CSS 4 Styling
shadcn/ui UI Components
Lucide React Icons
Vercel Deployment

其他既有技術設定：

App Router
src/ directory
Strict TypeScript
ESLint
@/\* Import Alias
Server Components by default
Client Components only when interaction is needed

不得：

重新初始化 Next.js。
更換 Tailwind CSS。
更換 shadcn/ui。
更換現有套件架構。
任意升級或降級 Dependencies。
引入不必要的第三方套件。
開發 Spring Boot Backend。
建立 PostgreSQL Database。
建立 Docker Backend。
建立獨立 API Server。

本次 Homepage 必須可以獨立運作，不依賴 Backend。

5. Brand Design System（品牌設計系統）

必須直接使用 Task 002 已完成的 Design System。

5.1 Brand Colors
Token HEX
Primary #101A33
Secondary #3157D5
Accent #19B8D5
Background #FFFFFF
Surface #F5F7FB
Foreground #172033
Muted #667085
Border #E4E8F0

使用 CSS Semantic Tokens。

不得在各個元件重複硬編碼品牌 HEX。

注意：

--muted 是次要文字顏色。

bg-muted 是對應 Surface 的背景工具類別。

不得混用。

5.2 Typography

沿用：

Inter
Noto Sans TC
Microsoft JhengHei
PingFang TC
Arial
sans-serif

使用 Task 002 定義的 Typography Utilities：

type-display
type-h1
type-h2
type-h3
type-body-lg
type-body
type-body-sm
type-caption
type-button
5.3 Logo

使用：

src/components/brand/xk-logo.tsx

沿用：

XK Logo 原始幾何結構。
原始 SVG Path。
原始 Transform。
已提供的 Logo 配色。

禁止重新繪製 Logo。

禁止任意修改 Logo 比例。

禁止將 Logo 當成一般文字重新排版。

Logo 仍屬 Provisional 狀態，不得自行宣稱已經正式核准。

5.4 Shared Components

優先使用：

Button
Card
CardHeader
CardTitle
CardDescription
CardContent
Container
Section
XkLogo
BrandPattern

如果現有元件可以滿足需求，不得重複建立類似元件。

6. Homepage Information Architecture（首頁資訊架構）

首頁採用以下區塊順序：

text
Homepage
│
├── Header
│
├── Hero Section
│
├── Introduction Section
│
├── Services Section
│
├── Technology Capabilities Section
│
├── Why XK Section
│
├── Solutions Section
│
├── Contact CTA Section
│
└── Footer

所有區塊必須具備一致的視覺風格、排版層次及響應式行為。

7. Header & Navigation
   7.1 Header Requirements

建立正式網站 Header。

包含：

XK Logo
品牌名稱 Xplore Kaleidoscope
Desktop Navigation
Contact CTA
Mobile Navigation

建議 Navigation：

Label Destination
Home /
About /about
Services /services
Solutions /solutions
Portfolio /portfolio
Contact /contact
7.2 Header Design

設計方向：

Clean Corporate Design
White Background
Subtle Border
Appropriate Horizontal Spacing
Clear Typography
Consistent Brand Colors

Header 高度應保持合理，不要佔據過多首屏空間。

7.3 Mobile Navigation

手機版必須提供可操作的 Navigation。

要求：

使用 Button 控制開啟及關閉。
使用適當的 aria-expanded。
提供可辨識的 Accessible Label。
支援鍵盤操作。
避免導覽開啟後頁面無法正常操作。
點擊導覽連結後正確導向。
適當處理 Escape 關閉操作。

如果使用 Client Component，僅將必要的 Navigation 部分設為 Client Component。

不得讓整個網站 Layout 因此變成 Client Component。

8. Hero Section

Hero 是首頁最重要的品牌展示區塊。

必須在第一個畫面清楚傳達 XK 的品牌定位。

8.1 Main Content

品牌標語：

Explore Possibilities. Create Digital Value.

技術標語：

Building Digital Solutions with Web, Java & AI.

建議主要標題：

「整合 Web、Java 與 AI 技術，打造企業數位價值。」

建議副標題：

「Xplore Kaleidoscope 協助企業整合網站開發、企業系統、系統架構與 AI 應用，將技術轉化為實際商業價值。」

8.2 CTA

主要 CTA：

「探索我們的服務」

導向：

/services

次要 CTA：

「聯絡我們」

導向：

/contact

注意：

如果 /contact 尚未實作，不得建立看似可以使用但實際無法運作的連結。

可以在本次同時建立簡潔的 Contact 頁面入口，或先將次要 CTA 設計為有效的頁內聯絡資訊區塊。

最終選擇必須符合實際已完成頁面。

8.3 Hero Visual

使用 XK 品牌幾何視覺。

可使用：

BrandPattern
Geometric Shapes
CSS-based Kaleidoscope Elements
Brand Color Gradients
Abstract Technology Visuals

視覺應呈現：

幾何對稱。
層次感。
現代科技感。
專業企業形象。

禁止：

隨意使用不相關的 Stock Photos。
使用虛構產品畫面。
使用未提供的客戶 Logo。
重新繪製 XK Logo。
使用過度複雜的動畫。

Hero Visual 不應影響文字可讀性。

9. Introduction Section

區塊標題：

「讓技術成為企業成長的力量」

建議內容：

「Xplore Kaleidoscope 整合網站開發、Java 企業系統、系統架構與 AI 應用技術，協助企業建立穩定、可擴充且符合實際營運需求的數位解決方案。」

「從網站建置、系統整合到 AI 應用，我們重視技術品質、實際效益與長期維護，讓數位技術真正創造商業價值。」

設計要求：

簡潔。
專業。
清楚。
不過度堆疊文字。
具備足夠留白。10. Services Section

區塊標題：

「Our Services」

中文副標題：

「整合技術能力，提供企業所需的數位解決方案。」

展示以下五項核心服務。

R01 — Website Development

服務名稱：

網站設計與開發

說明：

「打造現代化、響應式且符合企業品牌形象的網站與 Web Application。」

服務項目：

Corporate Website
Landing Page
Business Website
Next.js Web Application
CMS Integration
Multilingual Website

Icon 建議：

Globe

R02 — Java Enterprise Solutions

服務名稱：

Java 企業系統開發

說明：

「使用 Java 與 Spring Boot 建立穩定、可維護且具備擴充能力的企業後端系統。」

服務項目：

Java / Spring Boot
Backend API
Enterprise System
Legacy System Refactoring
Database Integration

Icon 建議：

Code2

R03 — System Architecture & Integration

服務名稱：

系統架構與整合

說明：

「協助企業規劃系統架構、API 整合及後端系統，建立可靠的技術基礎。」

服務項目：

System Architecture
API Integration
Requirements Analysis
Backend System Planning
Enterprise System Integration

Icon 建議：

Network

R04 — AI Business Solutions

服務名稱：

AI 商業應用解決方案

說明：

「將 AI、RAG 與 Workflow Automation 整合至企業流程，提升資訊應用及營運效率。」

服務項目：

AI Chatbot
Enterprise RAG
AI Workflow Automation
AI Business Assistant
Custom AI Integration

Icon 建議：

BrainCircuit

R05 — Maintenance Services

服務名稱：

系統維護與技術支援

說明：

「提供網站、後端系統、API 與 AI 應用的持續維護及技術支援。」

服務項目：

Website Maintenance
Backend Maintenance
API Monitoring
AI Application Maintenance
Cloud Deployment Support

Icon 建議：

Settings

Services Layout

Desktop：

建議採用 3 欄 Grid。
第二排自然排列剩餘服務。
Card 高度及視覺保持一致。

Tablet：

建議 2 欄 Grid。

Mobile：

1 欄排列。

每張 Card 包含：

Icon。
Service ID。
英文服務名稱。
中文服務名稱。
簡短說明。
服務項目摘要。

如果尚未實作服務詳細頁，不得建立指向不存在頁面的連結。

可使用非互動式 Card 展示服務內容。

11. Technology Capabilities Section

區塊標題：

「Technology Capabilities」

中文副標題：

「整合多元技術，打造完整數位解決方案。」

展示 XK 的技術能力。

Frontend Development
Next.js
React
TypeScript
Tailwind CSS
Backend Development
Java
Spring Boot
REST API
Enterprise Backend
Database & Integration
PostgreSQL
MySQL
API Integration
Database Design
AI & Automation
OpenAI API
Claude Integration
RAG
AI Agents
Workflow Automation
n8n
Infrastructure
Docker
GitHub
Vercel
Cloud VPS
Design Requirements

使用分類式排版展示技術能力。

可採：

Technology Groups
Text-based Technology Tags
Icon Grid
Subtle Card Layout

不得使用未經證實的技術認證標章。

不得宣稱與特定科技公司存在官方合作夥伴關係。

注意：

本區塊呈現創辦人及 XK 的技術服務能力，不代表所有技術都已部署於目前官方網站。

12. Why XK Section

區塊標題：

「Why Xplore Kaleidoscope」

中文副標題：

「從技術實作到商業價值，提供完整的數位解決方案。」

展示以下四項價值。

12.1 Integrated Technical Capabilities

整合網站、企業系統、系統架構及 AI 技術，減少企業跨系統整合的複雜度。

12.2 Business-oriented Solutions

以實際商業需求為出發點，提供符合企業營運目標的技術方案。

12.3 Scalable Architecture

重視系統架構、程式碼品質及未來擴充能力，降低長期維護成本。

12.4 Long-term Technical Support

從系統建置到後續維護，提供持續性的技術協助。

不得使用：

虛構客戶數量。
虛構成功案例。
虛構專案成長率。
虛構企業合作紀錄。
未經證實的業界排名。13. Solutions Section

區塊標題：

「Digital Solutions for Business」

中文副標題：

「依照企業需求，選擇適合的數位轉型方向。」

展示三種應用方向。

Website & Digital Presence

協助企業建立專業網站及數位服務入口。

Enterprise System Modernization

協助企業改善既有系統架構，整合後端服務與資料流程。

AI-powered Business Automation

將 AI 與自動化技術導入企業知識管理及日常營運流程。

此區塊著重解決方案方向，不需要建立完整產品功能。

不得把尚未完成的 XK AI Business Assistant 描述成已正式商用的產品。

14. Contact CTA Section

區塊標題：

「Let's Build Something Valuable」

中文標題：

「讓我們一起探索更多可能。」

建議內容：

「無論是企業網站、Java 系統開發、系統整合或 AI 應用，歡迎與我們討論您的需求。」

CTA：

「開始討論您的專案」

Contact Destination

優先使用已確認可以實際運作的聯絡管道。

開始開發前，先檢查：

是否已有正式聯絡 Email。
是否已確認 LinkedIn 公司或品牌頁面。
是否已有可使用的聯絡表單。

重要：

contact@xplorekaleidoscope.com 在先前規劃中僅屬建議地址，不代表信箱已正式建立。

不得將未驗證的信箱描述成正式聯絡管道。

如果目前沒有已確認的聯絡方式：

保留 Contact CTA 視覺區塊。
不建立虛假表單。
不建立無效 Email Link。
將實際聯絡方式標記為待確認。
在最終報告中列出。15. Footer

建立正式網站 Footer。

包含：

Brand
XK Logo
Xplore Kaleidoscope
Brand Slogan
Navigation
Home
About
Services
Solutions
Portfolio
Contact

只有已實作的頁面才可成為有效連結。

Service Categories
Website Development
Java Enterprise Solutions
System Architecture & Integration
AI Business Solutions
Maintenance Services
Legal
Privacy Policy

如果 Privacy Policy 尚未建立，不得連結至不存在的頁面。

Copyright

建議格式：

© {currentYear} Xplore Kaleidoscope. All rights reserved.

使用動態年份，不要寫死年份。

16. Responsive Design（響應式設計）

必須支援：

Device Viewport
Small Mobile 320px
Mobile 375px
Tablet 768px
Desktop 1440px
Large Desktop 1920px

要求：

不得出現水平溢出。
Header 必須適應手機尺寸。
Typography 必須合理縮放。
Hero 不得因畫面縮小而產生文字重疊。
Services Grid 必須自動調整。
Card 不得超出容器。
CTA 必須容易點擊。
Section Spacing 必須保持一致。
Footer 必須適合手機閱讀。

優先使用既有：

Container
Section
Typography Tokens
Responsive Tailwind Utilities

避免建立另一套互相衝突的 Responsive 規則。

17. Accessibility（無障礙設計）

必須符合基本 WCAG 2.1 AA 要求。

至少確認：

Semantic HTML。
正確的 Heading Hierarchy。
Navigation 使用適當語意。
Button 具有 Accessible Name。
Icon-only Button 具有 Accessible Label。
Logo 具有適當的替代名稱。
Keyboard Navigation 正常。
Focus State 清楚。
色彩對比符合要求。
Mobile Navigation 支援鍵盤操作。
裝飾性圖案使用 aria-hidden。
支援 prefers-reduced-motion。

不得為了視覺效果犧牲可讀性及可操作性。

18. SEO & Metadata

首頁必須具備基本 SEO。

Title

建議：

Xplore Kaleidoscope | Web, Java & AI Digital Solutions

Description

建議：

Xplore Kaleidoscope 提供網站開發、Java 企業系統、系統架構整合及 AI 商業應用解決方案，協助企業打造數位價值。

Metadata Requirements
Page Title
Meta Description
Canonical URL
Open Graph Title
Open Graph Description
Open Graph URL
Appropriate Language
Semantic HTML

網站主要語言：

zh-TW

保留品牌英文名稱及英文標語。

Indexing

Task 001 曾設定建置階段的：

noindex, nofollow

本次必須保留此保護設定，不得因完成首頁而自動開放搜尋引擎索引。

是否開放索引屬於正式上線前的獨立決策。

沒有經核准的 Open Graph Image 時，不得使用虛構圖片路徑。

19. Performance（效能要求）

注意：

優先使用 Server Components。
減少不必要的 Client Components。
避免不必要的 JavaScript。
避免大型圖片。
不安裝不必要的 Animation Libraries。
避免不必要的第三方 Tracking Scripts。
使用 Next.js 合適的圖片處理方式。
保持 CSS 結構簡潔。
避免重複渲染及不必要的 State。

首頁應具備良好的初始載入體驗。

不應為了裝飾效果增加不必要的效能成本。

20. Suggested Project Structure（建議專案結構）

請依照現有 Task 001、Task 002 結構擴充，不得重新建立整個專案。

text
src/
├── app/
│ ├── globals.css
│ ├── layout.tsx
│ ├── page.tsx
│ └── dev/
│ └── design-system/
│ └── page.tsx
│
├── components/
│ ├── brand/
│ │ ├── xk-logo.tsx
│ │ └── brand-pattern.tsx
│ │
│ ├── layout/
│ │ ├── container.tsx
│ │ ├── section.tsx
│ │ ├── site-header.tsx
│ │ ├── site-footer.tsx
│ │ └── mobile-navigation.tsx
│ │
│ ├── sections/
│ │ ├── home-hero.tsx
│ │ ├── home-introduction.tsx
│ │ ├── home-services.tsx
│ │ ├── home-technologies.tsx
│ │ ├── home-why-xk.tsx
│ │ ├── home-solutions.tsx
│ │ └── home-contact-cta.tsx
│ │
│ └── ui/
│ ├── button.tsx
│ └── card.tsx
│
├── config/
│ └── site.ts
│
└── lib/
└── utils.ts

如果現有檔案已存在，應優先修改及重用。

不得因為建議結構而重複建立相同功能的元件。

21. Website Configuration

建立或延續集中管理的網站設定。

例如：

src/config/site.ts

建議集中管理：

Brand Name
Brand Slogan
Technical Tagline
Website URL
Navigation Items
Service Categories
Contact Information（僅限已驗證資訊）

避免在多個元件重複定義相同內容。

未來新增英文網站時，應保留內容管理與國際化擴充空間，但本次不導入完整 i18n Framework。

22. Development Workflow

請按照以下順序執行：

Step 1 — Repository Inspection
檢查 Git Branch。
檢查 Git Status。
確認 Task 002 已合併。
確認目前專案版本。
閱讀相關文件。
Step 2 — Homepage Planning
確認首頁區塊。
確認 Header Navigation。
確認服務內容。
確認可用聯絡方式。
確認有效頁面連結。
Step 3 — Shared Layout

實作：

Header
Navigation
Mobile Navigation
Footer
Step 4 — Homepage Sections

依序實作：

Hero
Introduction
Services
Technology Capabilities
Why XK
Solutions
Contact CTA
Step 5 — Responsive Design

完成：

Mobile
Tablet
Desktop
Large Desktop
Step 6 — SEO & Accessibility

確認：

Metadata
Heading Hierarchy
Accessible Navigation
Keyboard Interaction
Color Contrast
Reduced Motion
Step 7 — Quality Checks

執行所有品質檢查。

Step 8 — Git Delivery
Commit
Push Feature Branch
Create Pull Request
Report Results 23. Quality Checks（品質檢查）

必須執行：

bash
npm install
npx tsc --noEmit
npm run lint
npm run build

如果沒有修改 Dependencies，原則上不需要更新 Package Lock。

如果修改 Dependencies，必須說明原因。

Browser Testing

必須實際啟動網站並測試：

Homepage
Header
Desktop Navigation
Mobile Navigation
Footer
CTA
所有有效連結
Responsive Testing

至少測試：

320px
375px
768px
1440px
1920px

確認：

無水平溢出。
無文字重疊。
無元件超出容器。
無失效導覽。
無 JavaScript Runtime Errors。
Accessibility Testing

使用可取得的工具檢查：

WCAG 2.1 AA。
Keyboard Navigation。
Focus Visibility。
Accessible Names。
Color Contrast。

不得只根據程式碼推測測試結果。

24. Git Commit & Pull Request

Branch：

feature/website-homepage

Commit Message 建議：

feat(website): implement XK corporate homepage

Pull Request Title：

Task 003: XK Corporate Homepage Development

Pull Request Description 必須包含：

Task Objective
Homepage Sections
Components Created
Responsive Implementation
SEO Changes
Accessibility Results
Quality Check Results
Screenshots
Remaining Issues

不得自動合併至 main。

25. Final Report（最終執行報告）

完成後，請提供完整報告。

Repository
Repository 狀態。
Base Branch。
Feature Branch。
Git Commit Hash。
Pull Request URL。
Implementation
新增檔案。
修改檔案。
Header 實作結果。
Footer 實作結果。
Homepage Sections。
Responsive Design。
SEO Metadata。
Accessibility。
Quality Checks
Check Result
TypeScript Pass / Fail
ESLint Pass / Fail
Production Build Pass / Fail
Desktop Browser Pass / Fail
Mobile Browser Pass / Fail
Accessibility Pass / Fail

必須填寫實際執行結果。

Remaining Issues

列出：

尚未完成的功能。
尚未確認的聯絡方式。
尚未建立的頁面。
尚未完成的品牌素材。
需要使用者決策的事項。
後續建議工作。26. Definition of Done（完成定義）

Task 003 必須符合以下條件：

保留 Task 001、Task 002 技術架構。
使用現有 XK Design System。
完成正式 Header。
完成 Desktop Navigation。
完成 Mobile Navigation。
完成 Hero Section。
完成 Introduction Section。
完成 Services Section。
完成 Technology Capabilities Section。
完成 Why XK Section。
完成 Solutions Section。
完成 Contact CTA。
完成 Footer。
完成 Responsive Design。
完成基本 SEO。
保留 Construction-stage noindex 設定。
通過 TypeScript。
通過 ESLint。
通過 Production Build。
通過基本 Browser Testing。
通過基本 Accessibility Testing。
建立 Feature Branch。
建立 Git Commit。
準備 Pull Request。
未修改 Documentation Repository。
未開發 Backend。
未建立虛假功能或未經證實的商業資訊。
Final Goal

完成 Xplore Kaleidoscope 第一版正式企業首頁。

讓網站從單純的技術基礎架構，進一步成為可以展示品牌、技術能力、服務項目及商業價值的官方網站。

所有設計及開發都必須符合：

Explore Possibilities. Create Digital Value.

Building Digital Solutions with Web, Java & AI.
