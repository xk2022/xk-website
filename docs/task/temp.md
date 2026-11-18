Task 001–006 文件統一骨架重構指令

請統一整理 xk2022/xk-website Repository 中的 Task 001～006 文件。

一、執行目標

將以下文件統一為一致、正式、可供 Codex 執行的 Task Specification 格式：

docs/task/task001.md
docs/task/task002.md
docs/task/task003.md
docs/task/task004.md
docs/task/task005.md
docs/task/task006.md

本次工作是文件結構標準化，不是重新執行六個開發任務，也不是重寫既有功能規格。

二、執行前檢查
確認目前 Repository、Branch、Working Tree 狀態。
閱讀 README.md、AGENTS.md。
閱讀 Task 001～006 全部原稿。
閱讀各 Task 對應的 Implementation Notes。
閱讀 docs/implementation-notes.md。
確認實際檔案名稱、相互連結及歷史紀錄。
不得假設文件存在；特別檢查 Task 001 是否有英文原稿、繁體中文原稿或歷史替代文件。
三、統一文件骨架

六份 Task 文件統一使用以下章節順序。

1. Task Overview
   Task 編號與名稱
   任務目的
   開發背景
   預期成果
   任務範圍
2. Repository & Prerequisites
   Website Repository
   Base Branch
   Base Commit（如已確認）
   Feature Branch
   前置 Task 與合併狀態
   既有部署狀態
   相關 Repository 與文件版本
   前置條件
3. Reference Documents
   品牌規範
   Design System
   技術架構
   相關 Task 原稿
   既有實作紀錄
   其他必要文件

標示文件來源及規格優先順序，不得將未核准的規劃文件當成已實施功能。

4. Scope & Requirements
   本次實作範圍
   必須完成項目
   不在本次範圍的項目
   既有功能保護原則
   不得擅自擴充的功能
5. Information Architecture & UX
   頁面或功能架構
   區塊順序
   元件職責
   使用者操作流程
   Responsive 行為
   導覽與跨頁連結

非頁面型 Task 可依任務性質調整內容，但保留章節標題。

6. Content & Data Specification
   文案來源
   資料結構
   TypeScript 型別
   設定檔位置
   真實資料與示例資料的界線
   未確認資訊的處理原則
7. Design System & Technical Constraints
   使用既有技術架構
   共用元件
   Server／Client Components 原則
   CSS 與 Design Tokens
   Dependencies 限制
   SEO、Accessibility 與效能要求
   GitHub Pages 相容性
   Backend 與外部服務限制
8. Navigation, SEO & Deployment
   路由規格
   Metadata
   Canonical
   Open Graph
   Indexing
   Base Path
   靜態輸出
   GitHub Actions
   GitHub Pages 部署規則

依任務適用性列出，不適用項目應明確標示。

9. File Structure & Change Scope
   預計新增檔案
   預計修改檔案
   不可修改檔案
   允許的必要擴充
   不得提交的產物

實際異動仍以最終 Git Diff 為準，不得將預計檔案清單寫成已完成紀錄。

10. Implementation Procedure

明確列出 Codex 執行順序：

Repository 狀態確認。
閱讀相關文件。
建立或切換 Feature Branch。
實作功能。
執行品質檢查。
執行 Build。
執行功能與瀏覽器驗收。
修正問題。
重新執行完整驗收。
檢查 Git Diff。
Commit。
建立 Pull Request。
回報 CI 與交付狀態。11. Testing & Acceptance Criteria

這是六份文件必須統一且不可省略的核心章節。

至少包含：

Code Quality

npm ci
npx tsc --noEmit
npm run lint

Build

npm run build
npm run build:pages

Functional Testing

主要功能
路由
內部連結
跨頁操作
錯誤及例外狀況

Responsive Testing

320px
375px
768px
1440px
1920px

Accessibility

axe WCAG 2／2.1 A／AA
鍵盤操作
Focus
Reduced Motion
必要的人工檢查

Browser Testing

Console
Runtime
Network
靜態資源
HTTP Status

GitHub Pages

Base Path
靜態輸出
Metadata
資源路徑
404
.nojekyll

依各 Task 的實際功能增加專屬驗收項目。

每項驗收必須區分：

Required：必要驗收。
Optional：視任務適用性執行。
Not Applicable：不適用，並說明原因。12. Test Report & Evidence

明確要求每個 Task 完成後產出獨立實作報告。

報告至少包含：

實際執行的測試指令。
每項測試的 PASS／FAIL。
Exit Code。
測試環境。
測試範圍。
Responsive 結果。
Accessibility 結果。
Browser Console／Runtime 結果。
GitHub Pages 驗收結果。
發現的問題及修正紀錄。
最終重新驗收結果。
實際截圖與檔案位置。
未完成項目及限制。

報告必須記錄實際執行結果，不得以預期結果、前一個 Task 的測試結果或推測內容代替。

13. Git & Pull Request
    Feature Branch
    Commit Message
    Base Branch
    Pull Request
    CI Checks
    Git Diff
    不直接修改 main
    不自動合併
    未經授權不得發布

Commit SHA、PR 編號與 CI Run ID 必須以實際 GitHub 紀錄為準，不得預填或虛構。

14. Deliverables

列出：

實際完成的功能。
實際新增及修改的檔案。
實作報告。
測試報告。
截圖。
Commit。
Pull Request。
CI 結果。15. Out of Scope & Future Work
尚未完成項目
後續 Task
未核准的規劃
尚未提供的素材
不屬於本次任務的功能 16. Final Delivery Checklist

提供可逐項確認的 Markdown Checklist。

至少包含：

功能實作完成
TypeScript 通過
Lint 通過
一般 Build 通過
Pages Build 通過
功能測試完成
Responsive 驗收完成
Accessibility 驗收完成
Browser 驗收完成
測試報告完成
截圖完成（適用時）
Git Diff 檢查完成
Commit 完成
PR 建立完成
CI 結果確認
最終交付報告完成
四、文件整理原則
保留各 Task 原有的功能需求、技術決策、文案、路由與驗收細節。
只統一章節結構、命名、表格格式與描述方式。
不得因為統一骨架而刪除有價值的專屬規格。
不得虛構測試結果、Commit、PR、CI 或部署狀態。
已完成 Task 的規格與實際執行結果必須清楚區隔。
尚未執行的項目標示為 Pending。
歷史資訊保留其原始時間點，不得將歷史快照改寫成目前狀態。
不得修改網站程式碼、Dependencies、lockfile 或 GitHub Actions。
不得修改文件 Repository。
不得自動合併或發布。
五、Task 001 特別處理

Task 001 原稿可能不在 docs/task/task001.md。

請先搜尋現有文件與歷史紀錄，確認是否存在：

task001-implementation-notes.md
繁體中文 Task 001 原稿
其他正式規格來源

若可確認原始需求，整理成 docs/task/task001.md。

若無法確認完整原稿，不得自行補造需求；應以已知資料整理，並在文件中明確標示缺漏。

六、Task 006 特別處理

Task 006 必須具備與 Task 001～005 相同的 Testing & Acceptance Criteria、Test Report & Evidence 及 Final Delivery Checklist。

不得只列出開發要求，卻沒有實際測試及交付報告要求。

七、執行與交付

本次只修改：

docs/task/task001.md ～ docs/task/task006.md

若發現其他文件需要同步，先在最終報告提出，不要自行擴大修改範圍。

完成後：

檢查六份文件的章節順序一致。
檢查六份文件的必要章節完整。
檢查 Markdown Link。
檢查 Checklist。
檢查是否遺失任何原始需求。
使用 Git Diff 確認只有允許的文件異動。
提供六份文件的整理結果與差異摘要。

本次只進行文件重構，不執行六個 Task 的功能開發，不建立 PR，不 Commit，不合併。
