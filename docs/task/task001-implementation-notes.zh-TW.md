XK Website — Task 001
Repository 檢查與 Next.js 專案初始化

（Repository Inspection & Next.js Project Bootstrap）

1. 專案基本資訊（Project Identity）

專案名稱：Xplore Kaleidoscope

網站 Repository：xk-website

文件 Repository：xplore-kaleidoscope

品牌縮寫：XK

官方網域：https://xplorekaleidoscope.com

技術標語（Tagline）：

Building Digital Solutions with Web, Java & AI.

品牌標語（Brand Slogan）：

Explore Possibilities. Create Digital Value.

2. 你的角色（Your Role）

請扮演資深 Next.js 工程師及軟體架構師。

你的責任是為 XK 官方企業網站建立一套乾淨、易於維護且符合正式環境需求的技術基礎架構。

開發時必須考慮：

專案架構的清晰度。
程式碼的可維護性。
元件的重複使用能力。
網站效能。
響應式設計。
無障礙設計。
未來功能擴充能力。
正式環境部署需求。3. Repository 管理規範（Repository Rules）

本專案有兩個獨立的 Repository：

xplore-kaleidoscope

用途：

商業規劃文件。
品牌識別規範。
技術架構規格。
AI 產品規劃。
專案管理文件。
xk-website

用途：

官方網站原始程式碼。
Frontend 開發。
網站技術設定。
網站部署設定。
重要規範
如果可以取得 xplore-kaleidoscope 的文件，必須先閱讀相關規格。
本次任務只能修改 xk-website。
絕對不可修改文件 Repository。
不得假設規劃中的檔案或目錄已經實際存在。
必須保留既有程式碼及文件。
不得直接推送程式碼至 main。
修改前必須檢查 Git 工作目錄狀態。
不得任意覆蓋或刪除既有成果。4. 已確認的技術架構（Confirmed Technology Stack）

必須使用以下已確認技術，不得擅自替換：

Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
Lucide React

部署平台：

Vercel
本階段不引入的技術
Spring Boot
PostgreSQL
Docker Backend
獨立 API Server

第一階段官方網站 MVP 必須能夠在沒有 Backend 的情況下獨立運作。

不得因為未來可能需要後端服務，就提前增加不必要的後端架構。

5. 品牌設計系統（Brand Design System）

使用以下初期品牌色彩 Tokens：

Token HEX 用途
Primary #101A33 品牌主色
Secondary #3157D5 品牌輔助色
Accent #19B8D5 品牌強調色
Background #FFFFFF 主要背景
Surface #F5F7FB 區塊背景
Foreground #172033 主要文字
Muted #667085 次要文字
Border #E4E8F0 邊框
品牌視覺方向
Geometric Kaleidoscope（幾何萬花筒）
XK Letter Combination（XK 字母組合）
Modern Technology Aesthetics（現代科技美學）
Geometric Symmetry（幾何對稱）
Professional and International（專業及國際化）
Clean Corporate Design（簡潔企業設計）
Responsive Desktop and Mobile Layouts（桌面及手機響應式版面）
Logo 規範

本階段的 Logo 為暫定版本（Provisional Logo）。

不得宣稱最終品牌 Logo 已經正式核准。

6. 初始 Repository 檢查（Initial Repository Inspection）

在開始任何實作之前，必須先完成以下工作：

檢查兩個 Repository。
閱讀目前已存在的 Week 02 相關文件。
檢查現有檔案及 Git 工作目錄狀態。
確認缺少哪些技術規格文件。
找出既有文件與本次任務之間的規格衝突。
在進行可能造成破壞的修改之前，先回報相關問題。
文件標準路徑

doc/01_business-plan/week-02/

請特別檢查以下文件：

文件 檢查目的
website-mvp.md 官方網站 MVP 功能規格
website-architecture.md Next.js 技術架構
website-sitemap.md 網站資訊架構及 Sitemap
brand-identity.md 品牌視覺識別
color-palette.md 品牌色彩系統
typography.md 品牌字體及排版
frontend-development-guide.md 前端開發指南
文件缺失處理原則

如果上述文件不存在：

不得自行假設文件已經存在。
以本次 Task 001 已確認的專案決策作為執行依據。
在最終執行報告中列出缺少的文件。
不得為了補齊文件而擅自修改文件 Repository。7. Website Repository 目錄結構

請在 xk-website 建立以下基本目錄結構：

text
xk-website/
├── README.md
├── AGENTS.md
├── .gitignore
├── .editorconfig
├── docs/
│ └── implementation-notes.md
├── public/
│ ├── images/
│ └── icons/
└── src/
├── app/
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── layout/
│ ├── sections/
│ └── ui/
├── config/
└── lib/

如果 Next.js 有更符合慣例的目錄配置，可以適度調整，但必須保留清晰的專案分層及維護性。

目錄用途
目錄 用途
docs/ 技術文件及實作紀錄
public/images/ 網站圖片及視覺素材
public/icons/ 圖示及相關素材
src/app/ Next.js App Router
src/components/layout/ 共用版面元件
src/components/sections/ 頁面區塊元件
src/components/ui/ 共用 UI 元件
src/config/ 網站及品牌設定
src/lib/ 共用工具及輔助函式 8. Next.js 專案初始化（Project Initialization）

使用 Next.js 建立專案。

必須啟用：

App Router
TypeScript
Tailwind CSS
src 目錄
ESLint
Import Alias @/\*
套件版本

使用穩定且彼此相容的套件版本。

避免使用不必要的實驗性功能。

必須安裝

lucide-react

shadcn/ui 初始化

使用 shadcn/ui 官方目前建議的 CLI 初始化方式。

確認：

UI 元件設定正確。
CSS Variables 設定正確。
元件目錄符合專案架構。
Import Alias 設定正確。
Tailwind CSS 整合正常。

避免安裝不必要的第三方依賴。

9. 開發標準（Development Standards）

必須建立以下開發標準：

TypeScript
啟用 Strict TypeScript。
避免不必要的 any。
保持型別定義清楚。
確保元件 Props 具有適當型別。
Component Architecture
使用可重複使用的 Components。
保持元件職責清楚。
避免過度複雜的元件。
統一命名規範。
保持目錄結構易於維護。
HTML 與 Accessibility
使用 Semantic HTML。
建立符合無障礙需求的 Navigation。
提供適當的 Accessible Labels。
支援鍵盤操作。
注意文字與背景對比。
Responsive Design

必須支援：

Mobile
Tablet
Desktop
Large Desktop
不得建立虛假功能

不得加入以下內容：

虛構客戶推薦（Fake Customer Testimonials）。
虛構作品集案例（Invented Portfolio Projects）。
未經證實的公司統計數據（Unsupported Company Statistics）。
無法實際運作的聯絡表單（Nonfunctional Contact Forms）。
假裝可以執行但實際沒有功能的按鈕（Placeholder Buttons Pretending to Work）。

所有功能都必須符合實際可執行的狀態。

10. 第一階段網站開發範圍（Initial Website Scope）

本次里程碑只需要完成技術基礎架構。

必須為未來以下頁面預留擴充空間：

text
/
├── about
├── services
│ ├── website-development
│ ├── java-enterprise
│ ├── system-integration
│ ├── ai-solutions
│ └── maintenance
├── solutions
├── portfolio
├── contact
└── privacy

本次不需要實作所有頁面

只需建立：

Next.js 基礎架構。
基本首頁。
共用版面結構。
共用元件目錄。
品牌色彩基礎設定。
未來頁面擴充所需的基本架構。

不得提前開發完整商業網站功能。

11. Git 開發流程（Git Workflow）

建立 Feature Branch：

feature/website-bootstrap

Git 規範
不得直接推送至 main。
不得自動 Merge。
完成後應準備 Pull Request 供審核。
保留清楚的 Git Commit 紀錄。
不得覆蓋或遺失既有工作。

所有修改必須在 Feature Branch 中進行。

12. 品質檢查（Quality Checks）

完成開發後，必須實際執行以下指令：

bash
npm install
npx tsc --noEmit
npm run lint
npm run build

如果初始化專案使用不同的 Package Manager，可以依實際設定調整指令。

執行要求
必須實際執行品質檢查。
不得只根據程式碼推測結果。
不得宣稱未實際執行的測試已經通過。
如果發生錯誤，必須說明錯誤原因及處理方式。
修正後應重新執行相關檢查。13. 最終執行報告（Final Report）

完成任務後，請提供完整的執行報告。

報告內容必須包含：

Repository Inspection
Repository 檢查結果。
Git 工作目錄狀態。
已找到的文件。
缺少的文件。
發現的規格衝突。
Project Implementation
建立的專案目錄結構。
Next.js 版本。
React 版本。
TypeScript 設定。
Tailwind CSS 設定。
shadcn/ui 設定。
安裝的 Dependencies。
Quality Checks
TypeScript 檢查結果。
ESLint 檢查結果。
Production Build 結果。
Git Delivery
Git Branch。
Commit 狀態。
Pull Request 狀態。
是否有未提交的變更。
Remaining Issues

列出尚未完成事項、已知問題及後續建議工作。

14. 完成定義（Definition of Done）

當以下條件全部符合時，Task 001 才算完成：

xk-website Repository 已建立乾淨的 Next.js 基礎架構。
可以在本機正常啟動及執行。
使用所有已確認的技術堆疊。
已完成基本品牌設計系統的技術準備。
可以支援後續 XK Design System 開發。
通過可執行的品質檢查。
具備部署至 Vercel 的條件。
Git 開發流程符合 Feature Branch 規範。
沒有修改文件 Repository。
沒有擅自變更已確認的商業及技術決策。
最終目標

建立一套乾淨、可維護且具備正式環境部署能力的 XK 官方網站 Next.js 技術基礎。

本次任務不開發 Backend。

本次任務不得變更任何已確認的商業決策或技術架構。

Explore Possibilities. Create Digital Value.
