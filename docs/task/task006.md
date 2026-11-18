請在 Website Repository xk2022/xk-website 正式製作：

docs/task/task006.md

任務名稱：

Task 006 — Solutions 解決方案介紹頁實作
一、前置檢查

先確認目前 Repository 與分支狀態，閱讀：

AGENTS.md
README.md
docs/implementation-notes.md
docs/brand-design-system.md
docs/homepage-implementation.md
docs/about-implementation.md
docs/services-implementation.md
docs/github-pages-deployment.md
docs/task/task004.md
docs/task/task005.md

另外，透過既有文件 Repository 讀取工具，唯讀檢查 xk2022/xplore-kaleidoscope 最新 main 分支。

優先閱讀：

Week 01：服務目錄及服務規劃
Week 02：品牌定位、網站資訊架構、網站技術架構及 MVP 規格
Week 03：作品展示策略、Portfolio 內容、三個案例規劃
最新新增的 Solutions、商業模式或客戶需求相關文件（若存在）

記錄文件 Repository 的最新 Commit SHA、重要文件路徑與 Git Blob SHA。

文件 Repository 僅供讀取，不得修改。

二、任務目標

建立 XK 官方網站的 /solutions 解決方案介紹頁。

讓訪客理解 Xplore Kaleidoscope 如何根據企業需求，組合網站開發、Java 企業系統、API／系統整合、AI 應用及雲端技術，提供適合的技術解決方案。

Solutions 頁必須與既有 Services 頁明確區隔：

Services：介紹 XK 提供哪些技術服務。
Solutions：介紹這些技術如何組合，以解決不同的企業需求。

不得只是複製 Services 頁面的五類服務卡片。

三、解決方案規劃

依照最新商業文件確認內容，評估以下方向：

Corporate Digital Presence：企業數位形象與網站建置。
Enterprise Management Systems：企業管理系統與 Java 應用。
System Integration：API、資料庫及跨系統整合。
AI-powered Applications：AI、LLM 與工作流程自動化。
Cloud & Digital Infrastructure：部署、容器化及雲端基礎設施。

每項解決方案應說明：

適合的企業或使用情境。
客戶可能面臨的問題。
解決方案定位。
涉及的技術能力。
建議的實施方向。
預期改善的工作流程或技術面向。
可搭配的 XK Services。
下一步聯絡或了解服務的有效連結。

以上為候選分類，應依最新文件調整，不可為了湊足五項而創造沒有依據的服務。

四、內容與商業聲明限制

必須嚴格區分：

已確認的技術服務能力。
建議中的解決方案。
Demonstration Project。
Planned／In Development。
尚未實現的產品或 SaaS。

不得虛構：

客戶名稱或客戶案例。
專案交付紀錄。
實際營運數據或效能改善百分比。
成功導入成果。
客戶評價及推薦。
未確認的 AI 產品。
SLA、固定工期或價格保證。

Solutions 頁應呈現 XK 能協助企業規劃與實作的技術方向，而非宣稱所有方案均已有正式商用產品。

創辦人一人全職經營的品牌定位應與 Task 004 一致，不得描述成大型公司或虛構團隊。

五、資訊架構

請依據文件研究結果，設計完整頁面結構。

建議評估以下區塊：

Solutions Hero：中文 H1、品牌標語與解決方案定位。
Business Challenges：企業常見數位技術需求。
Solutions Overview：解決方案分類。
Solution Details：各解決方案詳細介紹。
Technology Stack：各方案可搭配的技術。
Solution Combinations：跨服務整合情境。
Implementation Approach：從需求探索到交付的合作方式。
Why XK：品牌合作與技術價值。
CTA：前往 Services、About 或首頁聯絡區塊。

可依內容品質調整區塊數量，但應避免與首頁、About、Services 重複。

六、技術實作規範

沿用目前已合併的網站架構：

Next.js App Router。
React Server Components。
Strict TypeScript。
Tailwind CSS 4。
shadcn/ui。
Lucide React。
已合併的 XK Design System。
GitHub Actions → GitHub Pages。

預定路徑：

src/app/solutions/page.tsx

內容集中：

src/config/solutions.ts

元件集中：

src/components/sections/solutions/

Page 負責 Metadata 與區塊組合；文案、分類、技術及方案資料集中設定；視覺由獨立 Server Components 負責。

不得：

新增 Backend。
新增 API。
新增 CMS。
新增 Analytics。
新增 npm Dependencies。
修改 GitHub Actions workflow。
建立未實作的服務內頁連結。
建立假聯絡 Email 或無效表單。
七、Design System 與導覽

完整沿用：

現有八個品牌色彩 Token。
Inter／Noto Sans TC。
Typography Utilities。
Section、Container、Card、Button。
XkLogo、BrandPattern。
既有 Focus、Reduced Motion 與 Responsive 規範。

不得建立另一套色彩系統或重畫 Logo。

共用導覽的 Solutions 項目改為 /solutions，並同步更新 plannedRoutes 狀態。

確認 Header、Footer、Mobile Navigation 都使用相同導航設定。

保留 /、/about、/services 及首頁原有錨點。

八、SEO 與 Metadata

規劃：

Title：解決方案 | Xplore Kaleidoscope
Description：依實際方案內容撰寫。
Canonical：https://xplorekaleidoscope.com/solutions
Open Graph URL：同 Canonical。
Open Graph Locale：zh_TW。
HTML Language：沿用 zh-TW。
Indexing：保留 noindex, nofollow。

不得虛構 OG Image、評價、獎項或 Structured Data。

確認 Next.js Metadata 與 GitHub Pages 靜態匯出相容。

九、GitHub Pages

沿用既有設定：

output: export
trailingSlash
basePath: /xk-website

應輸出：

out/solutions/index.html

擴充 scripts/build-github-pages.mjs：

驗證 Solutions 靜態輸出。
驗證 Canonical 與 Open Graph URL。
驗證 noindex／nofollow。
驗證 CSS／JS 資源 Base Path。
保留首頁、About、Services、404 與 .nojekyll 驗證。
確認開發驗收頁沒有被公開匯出。

不得修改現有 GitHub Actions workflow。

十、Responsive 與 Accessibility

至少驗收：

320px
375px
768px
1440px
1920px

確認：

無水平溢出。
Hero 文案完整。
卡片與技術標籤不溢出。
行動裝置閱讀順序合理。
所有互動元素可使用鍵盤操作。
Focus 清楚可見。
Skip Link 正常。
Reduced Motion 正常。
語意化 HTML 與正確標題階層。
裝飾圖示不干擾輔助科技閱讀。

使用 axe 執行 WCAG 2／2.1 A／AA 自動檢查，並搭配人工檢查。

不得把自動掃描結果描述成完整無障礙認證。

十一、驗收指令

實際實作時必須執行：

bash
npm ci
npx tsc --noEmit
npm run lint
npm run build
npm run build:pages

必須重新啟動並驗證一般 Next.js production server，以及掛載 /xk-website 的靜態 Pages 產物。

測試：

/
/about
/services
/solutions
/xk-website/solutions/

檢查所有有效導覽、跨頁錨點、Metadata、資源載入、Console、Runtime 與 Network Errors。

不得只依賴 Build 成功宣稱驗收通過。

十二、截圖規格

至少產出以下七份真實瀏覽器截圖：

task006-solutions-desktop.png
task006-solutions-mobile.png
task006-solutions-overview.png
task006-solutions-details.png
task006-solutions-technology.png
task006-solutions-process.png
task006-solutions-footer.png

存放於：

docs/screenshots/

截圖必須由實際執行的網站產生，並人工檢查版面、內容、Logo 比例、卡片間距與手機顯示。

十三、預定異動檔案

至少評估：

新增：

docs/task/task006.md
src/app/solutions/page.tsx
src/config/solutions.ts
src/components/sections/solutions/
docs/solutions-implementation.md
docs/screenshots/task006-solutions-\*.png

修改：

src/config/navigation.ts
scripts/build-github-pages.mjs
README.md
AGENTS.md
docs/implementation-notes.md

實際檔案以實作需要為準，不可為了符合清單而製造無意義異動。

十四、Git 與 PR 流程

正式實作時：

Base Branch：main
Feature Branch：feature/website-solutions-page
Commit 建議：feat(solutions): implement XK solutions page

建立 PR：

main ← feature/website-solutions-page

PR 必須包含：

實作內容。
文案與文件來源。
Design System 使用方式。
SEO 與 Pages 相容性。
測試與驗收結果。
實際截圖。
未完成事項。

不得直接修改 main。 不得自動合併。 不得未經授權發布。

十五、本次文件製作範圍

目前只建立：

docs/task/task006.md

不要實作 /solutions。 不要修改任何網站程式碼。 不要修改其他文件 Repository。 不要建立功能分支或 PR。

十六、完成後回報

請回報：

文件新增路徑。
文件 Repository 最新 Commit SHA。
參考文件與版本。
Solutions 頁面規劃摘要。
與 Services 頁面的差異。
尚未確認的商業內容。
Git Commit 與 PR 狀態。

請確保 docs/task/task006.md 是完整、正式、可以直接交給 Codex 執行的工程任務規格，而非簡短的工作摘要。

以下忽略不計，call by text:

請先閱讀 AGENTS.md、README.md、docs/implementation-notes.md，以及 Task 001–005 的原始規格與實作紀錄。

接著檢查文件 Repository xk2022/xplore-kaleidoscope 最新 main 分支，閱讀最新品牌、網站架構、服務目錄、作品展示策略與相關商業規劃文件。

請依照既有 Task 001–005 的規格與實作模式，正式製作：

docs/task/task006.md

任務方向：Task 006 — Solutions 解決方案介紹頁實作

要求：

先確認文件 Repository 是否已有最新的 Solutions 規劃，不可自行假設或虛構業務內容。
延續已合併的 XK Design System、Next.js App Router、TypeScript、Tailwind CSS 4 與 GitHub Pages 靜態部署架構。
明確定義 Solutions 頁面的定位、目標訪客、資訊架構、內容、文案來源及元件分工。
規劃企業網站、Java 企業系統、API／系統整合、AI 應用等適合的解決方案，但必須依文件確認實際範圍。
清楚區分現有服務能力、規劃中的解決方案、示範專案及尚未實現的產品，不得虛構客戶案例、營運成果或商業承諾。
沿用既有 Header、Footer、Navigation、Metadata、SEO、Base Path 與 noindex/nofollow 政策。
不新增 Backend、API、CMS、Analytics 或 npm Dependencies。
規劃 Responsive、Accessibility、Keyboard、Focus、Reduced Motion 與瀏覽器驗收。
明確列出新增／修改檔案、測試指令、GitHub Pages 驗收方式、截圖要求及 PR 交付流程。
不修改其他 Repository，不直接修改 main，不自動合併或發布。

文件必須是一份可以直接交給 Codex 執行的完整工程任務規格，包含明確驗收標準及尚未完成事項。

完成後請檢查 Markdown 格式、路徑、內部連結與規格一致性。

本階段只建立 docs/task/task006.md，不要開始實作 Solutions 頁面。

最後回報：

新增文件路徑
參考的文件及版本
Task 006 的主要規格
Git Commit 與 PR 狀態
尚待確認事項
