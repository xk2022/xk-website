Task 005 — Services 服務介紹頁實作
任務目標

依據 XK Website 既有架構與品牌設計系統，正式開發 Xplore Kaleidoscope（XK）官方網站的 Services 服務介紹頁，建立清楚、完整且具商業價值的服務資訊，讓潛在客戶了解 XK 能提供的數位技術服務、適用情境、技術範圍與合作方式。

品牌標語：

Explore Possibilities. Create Digital Value.

技術標語：

Building Digital Solutions with Web, Java & AI.

本次建立 /services，延續已完成的企業首頁與 About Us 品牌介紹頁，形成完整的品牌認識至服務了解流程。

一、Repository 與前置檢查
項目 規格
Website Repository xk2022/xk-website
Base Branch main
Feature Branch feature/website-services-page
前置任務 Task 001、002、003、004
前置架構 Next.js、React、TypeScript、Tailwind CSS 4、shadcn/ui
UI Icons Lucide React
文件 Repository xk2022/xplore-kaleidoscope，僅供讀取
部署方式 GitHub Actions → GitHub Pages
本次目標路由 /services

開始開發前，必須：

閱讀 Website Repository 的 README.md、AGENTS.md。
閱讀 docs/implementation-notes.md。
閱讀 docs/brand-design-system.md。
閱讀 docs/homepage-implementation.md。
閱讀 docs/about-implementation.md。
閱讀 docs/github-pages-deployment.md。
檢查 Task 004 是否已合併至 main。
檢查現有 Header、Footer、Navigation、Design Tokens 與共用元件 API。
讀取文件 Repository 中與服務規劃相關的原始資料。

不得重新初始化專案、重新建立 Next.js 架構或任意升降級既有套件。

若實際 Base Commit 與預期不同，以經確認的最新 main 為準，並在實作紀錄中說明。

二、範圍與實作原則

本次只實作 Services 服務介紹頁與必要的共用導覽更新。

必須遵守：

延用既有 Design System。
延用現有 SiteHeader、SiteFooter 與 MobileNavigation。
延用既有 Container、Section、Card、Button、XkLogo。
延用 GitHub Pages 靜態部署。
內容集中管理，避免將大量文案直接寫在 Page Component。
優先使用 Server Components。
不新增不必要的 Client Components。
不新增 npm Dependencies。
不建立 Backend、Contact API、CMS、Authentication 或 Analytics。
不實作尚未規劃的完整服務明細內頁。
不宣稱尚未完成的產品、客戶案例或商業成果。

如舊規劃文件與已合併的網站架構存在衝突，以現有網站架構、Design System 及本次明確要求為優先。

三、Services 頁面資訊架構

路由：/services

頁面至少包含以下區塊：

1. Services Hero

元件：ServicesHero

內容：

中文 H1：我們提供的數位技術服務
英文標題：Our Services
品牌定位簡介。
技術標語。
簡短說明 XK 如何運用 Web、Java 與 AI 技術協助企業建立數位解決方案。
前往服務內容及聯絡區塊的 CTA。

視覺使用既有 BrandPattern，不重新繪製 Logo。

2. Service Overview

元件：ServicesOverview

說明 XK 的整體服務定位：

網站與數位產品開發。
Java 企業系統開發。
系統整合與資料管理。
AI 應用與流程自動化。
雲端與基礎架構。

說明各服務如何配合企業需求，形成完整的數位解決方案。

3. Website Development

元件：ServiceWebsite

服務內容：

官方網站與企業網站開發。
Responsive Web Design。
前端介面與互動設計。
Next.js 與 React 網站開發。
TypeScript 應用。
SEO 基礎建置。
網站效能與可及性改善。

技術範圍：

HTML
CSS
JavaScript
TypeScript
React
Next.js
Tailwind CSS 4. Java Enterprise Development

元件：ServiceJava

服務內容：

Java 應用程式開發。
Spring Boot 系統開發。
REST API 設計與整合。
企業應用系統。
後端商業邏輯。
系統維護與功能擴充。

技術範圍：

Java
Spring Boot
Spring Framework
REST API
Maven
Gradle

不得暗示網站前端已具備本次未建立的 Java Backend。

5. System Integration & Database

元件：ServiceIntegration

服務內容：

系統整合。
API 串接。
資料庫規劃與整合。
資料交換與處理。
既有系統現代化。
跨系統工作流程整合。

技術範圍依實際可提供的技術能力描述，不宣稱已有特定客戶系統整合案例。

6. AI & Automation

元件：ServiceAI

服務內容：

AI 應用開發。
LLM 應用整合。
AI 輔助工作流程。
智慧資料處理。
企業流程自動化。
AI 與既有系統整合。

技術方向：

Python
AI API Integration
LLM
Spring AI
Workflow Automation

不得宣稱已有正式商用 AI SaaS、已部署 AI 平台或已驗證的企業導入成果。

7. Cloud & Infrastructure

元件：ServiceCloud

服務內容：

Docker 容器化。
應用程式部署規劃。
雲端架構整合。
CI/CD 工作流程。
基礎架構與部署維護。
系統可擴充性規劃。

技術方向：

Docker
Git
GitHub Actions
CI/CD
Cloud Infrastructure

不得宣稱 XK 已提供未經確認的 24/7 監控、SLA 或企業級維運保證。

8. Service Integration

元件：ServicesIntegration

說明五類服務並非完全獨立，而是可以依企業需求進行組合。

展示範例：

企業數位形象：Website Development。
企業內部管理系統：Java Enterprise Development + Database Integration。
跨系統流程：System Integration + Automation。
智慧化應用：AI Integration + Existing Systems。
系統部署：Application Development + Cloud Infrastructure。

以上為服務組合示例，不得呈現成已完成的客戶案例。

9. Our Process

元件：ServicesProcess

以五階段呈現合作流程：

Discovery — 需求了解。
Planning — 方案規劃。
Development — 技術開發。
Testing & Delivery — 測試與交付。
Continuous Improvement — 後續改善。

桌面使用橫向流程，手機使用垂直流程。

不得宣稱所有專案均採用完全相同的工期、報價或交付條件。

10. Services CTA

元件：ServicesCta

內容：

邀請訪客討論數位需求。
提供返回首頁及聯絡區塊的導覽。
使用真實存在的 URL。

目前聯絡管道尚未確認時，不得自行建立 Email、mailto、假聯絡表單或虛構聯絡資訊。

聯絡入口使用：

/#contact
/#services
/about

依實際使用情境選擇。

四、內容與設定管理

新增：

src/config/services.ts

集中管理：

Hero 文案。
服務分類。
各服務說明。
技術清單。
服務組合。
五階段流程。
CTA 文案。

所有服務資料應使用明確 TypeScript 型別。

建議資料結構：

ServiceCategory
ServiceTechnology
ServiceProcessStep
ServiceSolutionExample

避免將技術清單、服務說明及流程重複寫入不同 Component。

內容應使用繁體中文為主要語言，保留必要英文技術名稱。

文案應專業、清楚且具商業價值，避免過度行銷、誇大能力或使用未經驗證的數據。

五、元件與檔案架構

建議新增：

text
src/
├── app/
│ └── services/
│ └── page.tsx
├── config/
│ └── services.ts
└── components/
└── sections/
└── services/
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

可依既有程式碼風格調整檔案命名與元件拆分，但必須維持清楚的責任分工。

src/app/services/page.tsx 負責：

Metadata。
頁面區塊組合。
頁面語意與整體結構。

各區塊負責自己的呈現與語意。

預設使用 Server Components，只有實際需要互動時才建立 Client Components。

六、Design System 與視覺規範

完整沿用 Task 002 的 XK Design System。

品牌色彩：

Token HEX
Primary #101A33
Secondary #3157D5
Accent #19B8D5
Background #FFFFFF
Surface #F5F7FB
Foreground #172033
Muted #667085
Border #E4E8F0

必須使用既有語意 Token，不在元件內重複硬編碼品牌 HEX。

沿用：

Inter。
Noto Sans TC。
Display、H1、H2、H3。
Body 與 Caption Typography Utilities。
Container 與 Section。
Card。
Button。
BrandPattern。
Lucide React。

視覺原則：

保持企業級數位技術品牌形象。
清楚區分五類服務。
服務內容具有一致的視覺層級。
技術名稱與一般說明清楚區隔。
避免大量裝飾影響閱讀。
保持手機閱讀體驗。
不任意修改原始 Logo。
保留 Provisional Logo 狀態。

不得建立第二套顏色、排版或間距系統。

七、Navigation 與 Footer

修改：

src/config/navigation.ts

將 Services 導覽正式連結至：

/services

更新 plannedRoutes 中 Services 的狀態為 implemented。

Header、MobileNavigation 與 Footer 必須使用相同設定。

首頁原有 /#services 與 /#service-{anchor} 錨點仍須正常運作，不得因 Services 內頁建立而破壞首頁既有導覽。

首頁服務卡片是否改為連結至 Services 頁面，應視既有首頁內容結構調整，保留原本有效的服務錨點。

未實作的服務明細頁不得變成失效連結。

八、SEO 與 Metadata

Services 頁面建立獨立 Metadata。

建議：

Title：

服務項目 | Xplore Kaleidoscope

Description：

探索 Xplore Kaleidoscope 的網站開發、Java 企業系統、系統整合、AI 應用與雲端技術服務，打造符合企業需求的數位解決方案。

Canonical：

https://xplorekaleidoscope.com/services

Open Graph：

專屬 Title。
專屬 Description。
正確 Canonical URL。
zh_TW 語言設定。

其他要求：

保留現有 noindex, nofollow。
不虛構 Open Graph Image。
不新增未經驗證的 Organization Rating。
不建立虛構客戶評價或結構化資料。
保持 HTML 語言與既有 Layout 一致。
九、GitHub Pages 相容性

延用：

GitHub Actions → GitHub Pages。

一般 Next.js Build 必須保持相容。

Pages Build：

bash
npm run build:pages

確認：

/services 成功輸出。
靜態檔案產生至 out/services/index.html。
Base Path 正確。
CSS、JS、字體資源路徑正確。
Header、Footer、MobileNavigation 導覽正常。
Canonical 與 Open Graph URL 正確。
noindex, nofollow 保留。
404 頁正常。
開發驗收路由不會匯出至公開產物。
.nojekyll 正常。

必要時只擴充：

scripts/build-github-pages.mjs

不得破壞首頁與 About 頁既有驗證。

GitHub Actions workflow 沿用現有設定，不任意修改部署條件。

本次建立 PR，不自動合併或發布 main。

十、Responsive 與 Accessibility

必須驗收以下 Viewport：

裝置 寬度
Small Mobile 320px
Mobile 375px
Tablet 768px
Desktop 1440px
Large Desktop 1920px

檢查：

沒有水平溢出。
服務卡片排列正確。
技術標籤不會超出容器。
中文文字換行自然。
流程圖在手機正確轉為垂直排列。
Header 與 MobileNavigation 正常。
Footer 導覽正常。
Logo 不失真。
CTA 不會重疊。
Focus 清楚可見。
所有有效連結可以操作。

Accessibility：

單一 H1。
正確 H2／H3 階層。
語意化 Section。
裝飾圖示使用適當 aria-hidden。
真實連結使用 Next.js Link。
鍵盤可正常操作。
支援 Reduced Motion。
色彩對比符合預期。

使用 axe 執行 WCAG 2／2.1 A／AA 自動掃描，並進行鍵盤及人工視覺檢查。

自動掃描結果不得宣稱等同完整無障礙認證。

十一、品質與驗收指令

使用既有 Node.js 24.x 與 npm 環境。

bash
npm ci
npx tsc --noEmit
npm run lint
npm run build
npm run build:pages

以上指令必須在最終程式碼完成後實際執行。

不得沿用 Task 001–004 的驗收結果代替本次測試。

必須額外驗收：

/services HTTP 200。
首頁回歸測試。
About 頁回歸測試。
Header／Footer。
MobileNavigation。
所有有效導覽。
五類服務內容。
五階段合作流程。
GitHub Pages Base Path。
Metadata。
404 與開發路由保護。
Browser Console。
JavaScript Runtime。
CSS、JS、字體載入。
axe A／AA。
五種 Viewport。
手機與桌面截圖。
十二、截圖與交付成果

新增：

docs/screenshots/

至少提供：

截圖 檔案
Services Desktop task005-services-desktop.png
Services Mobile task005-services-mobile.png
Website Development task005-services-website.png
Java Development task005-services-java.png
AI & Integration task005-services-ai.png
Services Process task005-services-process.png
Services Footer task005-services-footer.png

截圖必須由本次實際執行的網站產生，不得使用示意圖代替。

新增：

docs/services-implementation.md

記錄：

實作內容。
頁面資訊架構。
元件設計。
文案來源。
SEO 設定。
GitHub Pages 相容性。
測試指令及結果。
響應式驗收。
Accessibility 驗收。
截圖清單。
尚未完成事項。

更新：

README.md
AGENTS.md
docs/implementation-notes.md

保留既有歷史紀錄，不覆寫前面任務的實作成果。

十三、Git 與 Pull Request

Feature Branch：

feature/website-services-page

建議 Commit：

feat(services): implement XK services page

Pull Request：

Base：main
Compare：feature/website-services-page

PR 描述必須包含：

任務目標。
服務頁面內容。
共用元件使用方式。
導覽修改。
SEO 設定。
GitHub Pages 相容性。
品質檢查結果。
Responsive 驗收結果。
Accessibility 驗收結果。
實際截圖。
尚未完成事項。

不得虛構 Commit SHA、PR 編號、Actions Run ID 或發布狀態。

不得直接修改 main，不自動合併 PR。

十四、完成標準

以下條件全部滿足才可標記 Task 005 完成：

/services 正常運作。
十個服務頁面區塊完成。
五類服務內容完整。
服務組合與合作流程完成。
共用 Header／Footer 導覽更新。
Design System 一致。
首頁與 About 頁回歸測試通過。
SEO Metadata 正確。
GitHub Pages 靜態輸出正常。
Base Path 正確。
五種 Viewport 通過。
Accessibility 自動與人工檢查完成。
TypeScript 通過。
ESLint 通過。
一般 Build 通過。
Pages Build 通過。
截圖完成。
實作紀錄完成。
README、AGENTS 與歷史紀錄更新。
Feature Branch 與 PR 建立。
不自動合併、不虛構部署成果。
十五、後續任務

Task 005 完成後，後續可依網站整體規劃逐步開發：

Task 006：Solutions 解決方案介紹頁。
Task 007：Portfolio 專案作品集。
Task 008：Contact 聯絡頁。
Task 009：Privacy Policy 隱私權政策。
後續再評估服務明細頁、正式聯絡 API、CMS、AI Chatbot 與其他功能。

以上功能不納入本次 Task 005。

Task 005 核心交付目標：

建立正式、專業且具商業說服力的 XK Services 服務介紹頁，讓潛在客戶能清楚理解 XK 在 Web、Java、System Integration、AI 與 Cloud Infrastructure 的技術服務能力，並透過一致的品牌體驗引導訪客進一步了解 XK 或聯絡洽談。

以下忽略不計，call by text:

Codex 執行指令 — Task 005

請在目前已開啟的 xk2022/xk-website Repository 中，正式執行 docs/task/task005.md 的全部開發工作。

一、執行原則
先完整閱讀 AGENTS.md、README.md、docs/task/task005.md、docs/implementation-notes.md、docs/brand-design-system.md、docs/homepage-implementation.md、docs/about-implementation.md。
檢查目前 Git 狀態、分支、main 最新版本及 Task 004 合併狀態。
以 main 最新合併版本為基礎建立 Task 005 Feature Branch。
保留既有 Next.js、React、TypeScript、Tailwind CSS 4、shadcn/ui、Lucide React 架構。
不重新初始化、不升降級套件、不任意修改 lockfile。
嚴格遵循 docs/task/task005.md 的功能及驗收規格。
不修改或直接推送 main，不自動合併 Pull Request。
二、正式開發

完整實作 Task 005 規定的所有功能，包括：

頁面路由與資訊架構。
共用 Header、Footer、Mobile Navigation 的必要整合。
XK Design System 元件與品牌 Tokens。
響應式版面。
SEO Metadata、Canonical、Open Graph。
GitHub Pages 靜態輸出與 Base Path 相容性。
無障礙、鍵盤操作、Focus 與 Reduced Motion。
必要的設定、元件、文件及導覽更新。

所有內容必須以實際規格及已確認的品牌資料為依據，不虛構公司資訊、聯絡方式、客戶案例、產品或服務成果。

不建立未經 Task 005 授權的 Backend、API、Analytics 或其他額外功能。

三、GitHub Pages

延用現有 GitHub Actions → GitHub Pages 工作流程。

保留一般 Next.js production build。
保留 npm run build:pages。
驗證靜態 HTML、CSS、JavaScript、圖片與 Base Path。
驗證 Canonical、Open Graph 及 noindex 設定。
不擅自修改 GitHub Pages Source、DNS 或 Custom Domain。
不發布尚未審核的功能分支。
四、實際驗收

在所有修改完成後，重新執行：

bash
npm ci
npx tsc --noEmit
npm run lint
npm run build
npm run build:pages

依 Task 005 要求執行：

桌面與手機瀏覽器測試。
320、375、768、1440、1920px 響應式測試。
所有站內連結及錨點測試。
GitHub Pages Base Path 測試。
Keyboard Navigation、Focus、Disabled 狀態測試。
axe WCAG 2.1 A/AA 掃描。
Console、Runtime、Network 錯誤檢查。
Reduced Motion 測試。
實際頁面截圖及人工視覺檢查。

任何測試失敗都應先修正並重新驗收，不得把預期結果寫成實際通過結果。

五、文件更新

依照既有文件風格更新：

README.md
AGENTS.md
docs/implementation-notes.md
新增 Task 005 實作紀錄文件。
必要的部署或操作文件。
docs/screenshots/ 實際驗收截圖。

完整記錄新增、修改檔案與所有驗收結果。

六、Git 與 Pull Request

建議分支：

feature/website-task005

建議 Commit：

feat(website): implement task 005

完成後：

檢查完整 Git Diff。
確認沒有提交 .next/、out/、暫存檔或機密資訊。
Commit 並 Push Feature Branch。
建立以 main 為 Base 的 Pull Request。
PR 說明實作內容、測試結果、截圖、部署注意事項及未完成事項。

不得自行合併 Pull Request。

七、最終回報

完成後提供：

實作功能摘要。
Git Branch 與 Commit SHA。
Pull Request URL。
新增及修改檔案清單。
每項測試的實際結果。
桌面與手機截圖。
GitHub Actions 執行結果。
尚未完成及需要使用者確認的事項。
是否已部署（必須有實際證據）。

重要：請直接操作現有 Repository，完成 Task 005，而不是只提供程式碼範例、開發計畫或文件草稿。
