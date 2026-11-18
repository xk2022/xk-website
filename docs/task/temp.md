XK Website — Task 006～014 Specification Authoring

1. 任務目標

請擔任資深 Next.js 工程師、軟體架構師及技術文件負責人。

完整閱讀以下兩個 GitHub Repository：

Website Repository（唯一允許修改的 Repository）

https://github.com/xk2022/xk-website.git

Documentation Repository（僅供讀取）

https://github.com/xk2022/xplore-kaleidoscope.git

根據兩個 Repository 的實際內容、既有 Task 001～005 文件、品牌規範、技術架構、業務規劃及歷史實作紀錄，產出完整、可執行、可驗收的 Task 006～014 規格文件。

本次工作是任務規格文件撰寫，不是網站功能開發。

嚴禁在本次任務中實作 Task 006～014 的網站功能。

2. 最終任務編號

以下編號為本次文件撰寫的指定基準，不得任意合併、重新編號或改變分類。

Task 任務名稱 範圍
006 Solutions 解決方案介紹頁
007 Portfolio 技術作品集
008 Contact 聯絡我們
009 Privacy 隱私權政策
010 SEO 搜尋引擎最佳化
011 Performance 網站效能最佳化
012 Accessibility 網站無障礙改善
013 Vercel Deployment Vercel 正式環境部署
014 Domain Configuration 網域、DNS、SSL 與正式網址設定

特別注意：

Solutions 與 Portfolio 是兩個獨立任務。
Contact 與 Privacy 是兩個獨立任務。
SEO、Performance、Accessibility 是三個獨立任務。
Vercel Deployment 與 Domain Configuration 是兩個獨立任務。
不可因為某些工作彼此相關，就合併其開發與驗收範圍。3. Repository 操作規範
3.1 Website Repository

唯一允許寫入的 Repository：

xk2022/xk-website

所有新增文件均放在這個 Repository。

3.2 Documentation Repository

xk2022/xplore-kaleidoscope

僅允許讀取。

禁止：

修改文件。
建立 Branch。
Push。
Commit。
Merge。
修改任何遠端內容。
3.3 開始前檢查

在任何寫入前，必須先：

確認目前所在 Repository。
確認 Git remote。
確認目前 Branch。
執行 git status。
確認是否有未提交變更。
確認 Website Repository 最新 main。
檢查 AGENTS.md 與 README.md。
列出 docs/task/ 現有文件。
閱讀 Task 001～005。
閱讀歷史 implementation notes。
檢查現有網站路由、元件、設定及部署架構。

不得覆蓋使用者尚未提交的工作。

若目前工作目錄不是 Website Repository，先確認正確位置，不得在錯誤 Repository 建立文件。

4. 必須閱讀的來源
   4.1 Website Repository

優先閱讀：

AGENTS.md
README.md
docs/task/README.md
docs/task/task001.md ～ docs/task/task005.md
docs/implementation-notes.md
docs/brand-design-system.md
docs/homepage-implementation.md
docs/about-implementation.md
docs/services-implementation.md
docs/github-pages-deployment.md

上述路徑必須先確認是否存在。

另須檢查：

src/app/
src/components/
src/config/
src/lib/
public/
scripts/
.github/workflows/
package.json
lockfile
Next.js 設定
Metadata 設定
Navigation 設定
現有部署設定
4.2 Documentation Repository

完整檢查與本次任務相關的業務文件。

優先閱讀：

doc/01_business-plan/week-01/
doc/01_business-plan/week-02/
doc/01_business-plan/week-03/
doc/00_initGPT/
Logo 與品牌素材相關目錄
技術架構規劃
網站資訊架構
MVP 規格
Solutions 規劃
Portfolio 規劃
聯絡資訊
隱私權及法律相關規劃
Domain／DNS／Hosting 規劃

不能只讀 README 就開始撰寫。

對重要來源記錄：

Repository。
Branch。
Commit SHA。
檔案路徑。
Git Blob SHA（可取得時）。
文件是否有核准狀態。
本次實際採用的內容。

不得將未核准的規劃文件當成正式決策。

5. Task 006～014 文件內容要求

每個 Task 必須獨立撰寫，不能只更換標題後複製相同內容。

每份文件至少包含以下章節：

Task Overview
Repository & Prerequisites
Reference Documents
Scope & Requirements
Information Architecture & UX（不適用時說明）
Content & Data Specification
Design System & Technical Constraints
Navigation, SEO & Deployment（依任務適用性調整）
File Structure & Change Scope
Implementation Procedure
Testing & Acceptance Criteria
Test Report & Evidence
Git & Pull Request
Deliverables
Out of Scope & Future Work
Final Delivery Checklist

各任務可依工作性質調整章節，但不得省略核心驗收、測試報告、交付及 Git 管理規範。

Task 006 — Solutions

規格必須涵蓋：

解決方案頁面資訊架構。
企業需求與技術方案的對應。
服務組合及應用情境。
Solutions 與 Services 的區別。
Solutions 與 Portfolio 的區別。
真實技術能力與尚未完成項目的界線。
頁面導覽與 CTA。
Metadata 與 Responsive。
不得將規劃中的方案描述成已完成的商用產品。
Task 007 — Portfolio

規格必須涵蓋：

作品集頁面資訊架構。
作品分類。
作品展示卡片。
技術標籤。
專案背景、問題、方案與技術說明。
真實客戶案例與 Demonstration Project 的區別。
Planned／In Development／Completed 狀態。
作品圖片及素材來源。
未經證實的客戶、成效及數據不得公開。

Portfolio 不得與 Solutions 合併。

Task 008 — Contact

規格必須涵蓋：

聯絡頁面。
已確認聯絡管道。
聯絡表單（若有正式需求）。
前端驗證。
表單送出處理。
防止垃圾訊息的方案。
成功與失敗狀態。
API／第三方服務依賴。
隱私資料處理。

若尚無正式 Email 或後端服務，必須明確標示待確認，不得建立假聯絡管道或假送出功能。

Task 009 — Privacy

規格必須涵蓋：

隱私權政策頁面。
個人資料蒐集範圍。
蒐集目的。
使用及保存方式。
第三方服務。
Cookie 與追蹤機制。
使用者權利。
聯絡方式。
法律內容審核。
正式發布前必要確認。

不得自行虛構公司法定資訊、資料處理行為或法律承諾。

Task 010 — SEO

規格必須涵蓋：

Metadata。
Title 與 Description。
Canonical。
Open Graph。
Twitter Card。
Sitemap。
robots.txt。
Structured Data。
Search Console。
Indexing 策略。
URL 與內部連結。
語言及地區設定。

必須考慮現有 noindex／nofollow 設定及正式發布條件。

不得在未確認正式上線前任意開放搜尋索引。

Task 011 — Performance

規格必須涵蓋：

Core Web Vitals。
LCP。
INP。
CLS。
圖片最佳化。
字體載入。
JavaScript Bundle。
Client Components。
Server Components。
Code Splitting。
Caching。
Network。
Lighthouse。
實際裝置及網路條件。

必須定義測試環境、測試方式及可驗收指標。

不得虛構 Lighthouse 分數或效能改善比例。

Task 012 — Accessibility

規格必須涵蓋：

WCAG 2.2 AA 為目標標準（如需與既有標準相容，說明差異）。
Semantic HTML。
Heading Hierarchy。
Landmarks。
Keyboard Navigation。
Focus Management。
Screen Reader。
Accessible Names。
Color Contrast。
Form Labels。
Error Messages。
Alt Text。
Reduced Motion。
Responsive Zoom。
axe 自動化掃描。
人工輔助科技檢查。

自動化掃描通過不得宣稱已取得完整無障礙認證。

Task 013 — Vercel Deployment

規格必須涵蓋：

Vercel Project。
GitHub Repository 連結。
Production Branch。
Preview Deployment。
Environment Variables。
Build Command。
Output Configuration。
Next.js 相容性。
Build Logs。
Deployment Logs。
Production 驗收。
Rollback。
部署權限與 Secrets。

保留現有 GitHub Pages 架構及一般 Next.js Build。

不得未經授權修改現有發布流程或直接發布。

Task 014 — Domain Configuration

規格必須涵蓋：

xplorekaleidoscope.com。
DNS Provider。
Nameservers。
A／AAAA／CNAME 記錄（依實際供應商需求）。
Vercel Domain Configuration。
SSL／TLS。
HTTPS。
www 與 apex 網域。
Redirect。
DNS Propagation。
DNS 驗證。
Canonical Domain。
網域續約與管理。
正式網站 HTTP／HTTPS 驗收。

不得猜測 DNS IP、Nameserver 或實際供應商設定。

不得在未經授權的情況下修改 DNS 或正式網域。

6. 測試報告強制規範

每份 Task 文件必須定義自己的獨立實作報告路徑。

建議採一致命名：

docs/reports/task006-implementation.md

依序建立：

docs/reports/task006-implementation.md
docs/reports/task007-implementation.md
docs/reports/task008-implementation.md
docs/reports/task009-implementation.md
docs/reports/task010-implementation.md
docs/reports/task011-implementation.md
docs/reports/task012-implementation.md
docs/reports/task013-implementation.md
docs/reports/task014-implementation.md

這些是未來執行任務時的報告路徑。

本次只撰寫報告規格，不建立假測試結果，也不將未執行的報告標記為完成。

每份未來報告至少必須記錄：

Repository 與 Git 狀態。
Base SHA。
Feature Branch。
實際修改檔案。
實際執行指令。
執行環境及版本。
測試結果。
Exit Code。
PASS／FAIL／Pending／N/A。
Browser QA。
Responsive。
Accessibility。
Console／Runtime。
Network／HTTP。
Screenshot Evidence（依任務需要）。
發現問題。
修正方式。
修正後重新驗收結果。
Commit SHA。
PR。
CI Checks。
Deployment Status（適用時）。

不允許用計畫中的測試取代實際測試。

7. 共通工程規範

所有 Task 必須沿用實際 Repository 已確認的技術架構。

Next.js App Router。
React。
Strict TypeScript。
Tailwind CSS。
shadcn/ui。
Lucide React。
Server Components 優先。
必要時才使用 Client Components。
Responsive Design。
Semantic HTML。
Accessible UI。
共用元件及設定集中管理。
不任意新增 Dependencies。
不破壞既有頁面。
不重複建立相同功能。
不虛構業務內容。

所有技術版本以實際 Repository 為準，不可照抄過期文件版本。

8. 任務依賴關係

請分析實際專案並建立合理的依賴關係。

原則：

Task 006、007 以既有 Design System、Homepage、About、Services 為基礎。
Task 008 必須考慮聯絡管道與表單服務是否已具備。
Task 009 必須考慮 Task 008 的個人資料處理。
Task 010 必須考慮實際頁面及正式發布狀態。
Task 011 必須考慮實際網站及部署環境。
Task 012 必須考慮所有已實作頁面及互動元件。
Task 013 必須考慮現有 GitHub Pages 與 Vercel 的部署架構。
Task 014 必須考慮 Task 013 的正式部署設定。

依賴關係必須反映在 docs/task/README.md。

不要將上述原則誤認為所有任務都必須嚴格串行；可獨立的任務可以平行，但必須有明確的前置條件。

9. 文件輸出位置

請在 Website Repository 新增：

text
docs/
└── task/
├── README.md
├── task006.md
├── task007.md
├── task008.md
├── task009.md
├── task010.md
├── task011.md
├── task012.md
├── task013.md
└── task014.md

如果 docs/task/README.md 已存在：

先檢查原內容。
保留有效的 Task 001～005 資訊。
更新為 Task 001～014 完整任務清單。
保留既有正確的任務狀態及歷史資訊。
不可直接整份覆蓋而遺失原始內容。

README 必須包含：

Task 001～014 完整清單。
任務分類。
任務依賴關係。
建議執行順序。
文件連結。
獨立測試報告規範。
狀態管理。
Git／PR 規則。
已完成、待執行、阻塞狀態。10. 撰寫品質要求

每份文件必須：

使用繁體中文。
保留必要英文技術名稱。
內容具體、完整、可執行。
明確列出 Scope 與 Out of Scope。
明確列出 Prerequisites。
明確列出 Deliverables。
明確列出 Acceptance Criteria。
明確列出 Testing。
明確列出 Test Report。
明確列出 Final Delivery Checklist。

避免：

空泛描述。
重複貼上同一份模板。
不必要的過度規範。
虛構業務資料。
虛構技術能力。
虛構測試結果。
虛構 Commit／PR／CI。
提前執行後續任務。
將尚未確認的規劃寫成正式決策。

對尚未確定的資訊，使用：

Pending Confirmation

並清楚說明需要誰確認、何時確認及不確認時的處理方式。

11. 本次禁止事項

本次只允許修改任務規格文件。

禁止：

修改 src/。
修改 public/。
修改網站功能。
修改 Next.js 設定。
修改 Tailwind 設定。
修改 package.json。
修改 lockfile。
安裝或更新 Dependencies。
執行網站功能開發。
修改 GitHub Actions。
修改 Vercel 設定。
修改 DNS。
執行正式部署。
修改 Documentation Repository。

不需要為了文件工作執行 npm build 或網站測試。

12. 最終驗收

完成後執行：

確認 task006.md～task014.md 九份文件均存在。
確認 README 包含 Task 001～014。
確認任務編號連續且無重複。
確認 Solutions／Portfolio 分離。
確認 Contact／Privacy 分離。
確認 SEO／Performance／Accessibility 分離。
確認 Vercel／Domain 分離。
確認每份文件都有獨立 Test Report 規格。
確認各文件與實際 Repository 架構一致。
確認所有來源連結有效或標示缺漏。
確認沒有虛構業務資訊或測試結果。
確認沒有修改任何程式碼或設定。
執行 Markdown 格式與相對連結檢查。
檢查完整 Git Diff。
確認 Documentation Repository 完全沒有被修改。13. Git 交付

完成後：

整理新增與修改文件清單。
提供各 Task 文件內容摘要。
提供來源 Repository 與 Commit SHA。
提供尚未確認的規格。
提供文件檢查結果。
提供 Git Diff 摘要。
保留使用者原有未提交變更。

若沒有明確授權，不得：

Push main。
Merge。
自動建立或合併 PR。
發布正式網站。

可在完成後提供建議 Commit Message：

docs(task): add XK website task specifications 006-014

14. 最終交付格式

請提供完整交付報告：

A. Repository 檢查結果
B. 實際閱讀的業務及技術文件
C. Task 006～014 文件清單
D. 各任務規格摘要
E. 任務依賴關係
F. 測試與文件驗收結果
G. 尚待確認的決策
H. Git Diff 與變更範圍
I. Commit／PR 狀態
J. 最終交付結論

只有實際完成並驗證的項目才能標記 PASS。

如果遇到來源不足、任務定義衝突或缺少核准資料，請記錄問題，不得自行編造。

現在開始先執行 Repository 與文件盤點，確認現況後，再撰寫 Task 006～014。不要執行網站功能開發。
