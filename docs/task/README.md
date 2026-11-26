# XK Website Development Tasks

本文件定義 Xplore Kaleidoscope（XK）官方網站的開發任務順序、範圍與交付原則。

所有任務以獨立、可驗收、可追蹤的開發單位執行。每個 Task 原則上只處理一種類型的功能，不將不同頁面、不同技術領域或不同部署工作合併在同一任務。

歷史規格整理階段補齊 Task 006–014 的九份獨立工程規格，當時只編寫文件，未執行這九項功能。[temp.md](temp.md) 是早期 Task 007 技術分析指示快照，不是目前九項任務的執行指令。保留原索引的任務分類、四階段、共通工程原則、獨立報告、完成門檻與歷史進度；目前已交付狀態以 [Roadmap](ROADMAP.md) 為準。

## 目前功能任務

最新功能任務、Bugfix、Design Collection 與文件整理進度以 [Roadmap](ROADMAP.md) 為集中入口。原始規格、工作包及下方歷史進度快照保留，避免重複維護最新狀態。

## 問題追蹤與後續 Bugfix

- [2026-11-22 官網問題清單與 Bugfix 待辦](bugfix-backlog-2026-11-22.md)：BF-009～BF-016，共八項，記錄證據、影響、建議分支、前置條件與驗收標準。本輪官網側六項 PASS，BF-010／BF-015 因資料或核准尚缺而 BLOCKED；範圍及目前狀態以清單更新紀錄與 [本輪實作報告](../reports/bf009-016-implementation.md) 為準，不以本機驗收或文件存在推論已部署。
- 既有 `bugfix001.md` 至 `bugfix008.md` 與 [歷史實作紀錄](../reports/bugfix001-008-implementation.md) 保留，不覆寫原始規格或舊驗收。

## 1. Repository

| 項目 | 設定 |
| --- | --- |
| Website Repository | `xk2022/xk-website`，唯一允許修改的 Repository |
| Base Branch | `main`；每次執行重新核對最新已合併版本及實際 Base SHA |
| 本輪規格撰寫基準 | `e2a8f5a33f24d1ea65a3afc3780014a33c204528` |
| 本輪文件分支 | `docs/task-specifications-006-014`，不是功能分支 |
| Feature Branch | 每個功能 Task 使用獨立分支，詳各 Task 第 13 節 |
| 技術架構 | Next.js App Router、React、Strict TypeScript、Tailwind CSS 4、shadcn/ui、Lucide React |
| 已核對版本快照 | Next.js 16.4.6、React 19.3.1、TypeScript 5.9.3、Tailwind CSS 4.3.3；實作時依 manifest／lockfile 重新確認 |
| Package Manager／環境 | npm、Node.js 24.x；不任意變更 Dependencies 或 lockfile |
| 現有部署 | GitHub Actions → GitHub Pages；保留一般 Next.js production build |
| 未來部署任務 | Task 013 Vercel 與 Task 014 Domain 分別執行；規格存在不授權切換 Pages、部署或修改 DNS |
| Documentation Repository | `xk2022/xplore-kaleidoscope`，僅讀取，不修改文件、建立開發分支、Commit、Push 或 Merge |
| 文件版本 | `main@95ef1275a46ace76e11f668178ca881087483398`；本輪唯讀取得 51 檔並核對 Git Blob |

重要來源見各 Task 第 3 節，記錄 Repository、Branch、Commit、路徑、可取得的 Blob SHA、核准狀態及採用內容。可由 [固定版本的文件 Tree](https://github.com/xk2022/xplore-kaleidoscope/tree/95ef1275a46ace76e11f668178ca881087483398) 追溯；未核准規劃不當作既有功能或商業事實。

## 2. 任務總覽

| Task／文件 | 任務名稱 | 開發類型 | 主要交付 |
| --- | --- | --- | --- |
| [001](task001.md) | Repository Bootstrap | Repository Infrastructure | 專案初始化、Next.js、TypeScript、Git、開發環境 |
| [002](task002.md) | XK Brand Design System | Design System | 品牌色彩、Typography、Logo、共用 UI 元件 |
| [003](task003.md) | Corporate Homepage | Website Page | 首頁、Header、Footer、Navigation |
| [004](task004.md) | About Us | Website Page | 品牌介紹、Mission、Vision、Capabilities、Founder |
| [005](task005.md) | Services | Website Page | 服務分類、服務內容、合作流程 |
| [006](task006.md) | Solutions | Website Page | 企業需求、解決方向、服務組合與應用情境 |
| [007](task007.md) | Portfolio | Website Page | 技術作品、分類、狀態、專案說明與真實素材界線 |
| [008](task008.md) | Contact | Website Page | 已確認聯絡管道；無管道時的誠實呈現，表單另有條件 |
| [009](task009.md) | Privacy | Website Page / Legal Content | 真實資料處理盤點、法律審查與隱私權政策 |
| [010](task010.md) | SEO | Technical Optimization | Metadata、Canonical、OG／Twitter、Sitemap、robots、Schema、索引策略 |
| [011](task011.md) | Performance | Technical Optimization | Core Web Vitals、圖片／字體／Bundle、可重現量測及最佳化 |
| [012](task012.md) | Accessibility | Technical Optimization | WCAG 2.2 AA、Keyboard／Focus／Screen Reader 與人工驗收 |
| [013](task013.md) | Vercel Deployment | Deployment Infrastructure | Vercel 專案、Preview／Production、權限、驗收與 Rollback |
| [014](task014.md) | Domain Configuration | Domain Infrastructure | DNS、SSL／TLS、HTTPS、apex／www、正式網址與網域管理 |

Solutions 與 Portfolio、Contact 與 Privacy、SEO／Performance／Accessibility、Vercel 與 Domain 均各自獨立，不因關聯而合併開發、測試報告或完成狀態。

## 3. 任務執行順序

| 建議階段 | 任務 | 目的與執行方式 |
| --- | --- | --- |
| Phase 1 — Foundation | 001、002 | 基礎環境與 Design System；已有合併成果，後續保護並回歸 |
| Phase 2 — Corporate Website | 003–009 | 首頁及獨立內頁；003–005 已合併，006／007／008 可依前置條件平行，009 與 008 資料處理設計協調 |
| Phase 3 — Technical Optimization | 010、011、012 | 各自獨立驗收；可先針對目前已合併路由改善，其他頁面合併後補回歸 |
| Phase 4 — Deployment | 013、014 | Vercel 與 Domain 分開操作；013 可先完成準備／獲授權的 Preview，014 必須取得實際 Vercel target 及 DNS 授權 |

這是建議順序，不是 006→007→…→014 的強制串行。已具備前置條件的任務可以平行；同時修改導覽、Metadata 或共用元件時，從最新 main 重整並回歸，不能自行整合未核准分支。詳細依賴與發布門檻見第 8 節。

## 4. 任務文件規範

每個任務必須有獨立 Markdown 規格。本輪交付後，實際規格入口為 `docs/task/task001.md` 至 `docs/task/task014.md`；本索引與 [temp.md](temp.md) 是任務管理／本輪輸入文件，不是網站功能。

每份 Task 採以下 16 章，非頁面型工作仍保留章節並說明適用性：

1. Task Overview
2. Repository & Prerequisites
3. Reference Documents
4. Scope & Requirements
5. Information Architecture & UX
6. Content & Data Specification
7. Design System & Technical Constraints
8. Navigation, SEO & Deployment
9. File Structure & Change Scope
10. Implementation Procedure
11. Testing & Acceptance Criteria
12. Test Report & Evidence
13. Git & Pull Request
14. Deliverables
15. Out of Scope & Future Work
16. Final Delivery Checklist

規格必須說明目標、範圍、前置條件、功能與技術約束、不在範圍項目、預計檔案異動、驗收／指令、報告、Git／PR 及未完成事項。預計檔案與計畫測試不等於實際完成，實作後另記真實結果。

## 5. 共通開發規範

### 5.1 開發原則

- 先讀根 [README](../../README.md)、[AGENTS](../../AGENTS.md)、最新核准 Task 與既有實作報告；檢查 main、remote、status 及未提交變更，不覆蓋使用者工作。
- 使用已合併功能作為基礎，不假設前一任務尚未合併的內容已完成。保護既有路由、部署、Logo 原稿與 Provisional 狀態。
- 優先重用既有 Design System、共用元件與集中設定；Server Components 優先，必要互動才使用 Client Components，不重複建立相同功能／樣式。
- 保持 Semantic HTML、Responsive、Accessible UI、可見 Focus 與 Reduced Motion，不任意增加 npm Dependencies。
- 不虛構品牌、公司法定資訊、聯絡管道、客戶、作品成果、產品狀態或商業承諾。
- 根 README 舊里程碑／已刪原稿入口與 AGENTS 的舊缺檔敘述仍待另行同步；本輪不修改它們。Task 001 正式入口已存在，Task 001–005 的歷史報告保留原時點，不倒填現況。衝突依當次使用者指示、最新核准 Task 及實際已合併架構處理。

### 5.2 Git 規範

每個功能 Task 由最新 main 建立獨立分支，依各 Task 的實際名稱，例如：

```text
feature/website-{task-name}
```

Commit 使用 Conventional Commits，保留既有格式：

```text
feat(scope): implement feature
fix(scope): resolve issue
docs(scope): update documentation
```

正式功能流程為開發→本機驗收／報告→Feature Commit／Push→PR CI→PR Review→使用者授權合併→main CI→部署／公開 URL 驗證。禁止直接推送 main、未授權自動合併或發布，不能將這些階段互相替代。本輪文件工作的外部 Git 操作依第 10 節限制。

### 5.3 品質檢查

正式功能任務依規格及 Repository 設定實際執行：

```sh
npm ci
npx tsc --noEmit
npm run lint
npm run build
npm run build:pages
```

一般 build 與 Pages build 分開；共用 `.next/` 時先驗一般 server 並停止，再輸出 Pages。`npm run start` 不用來提供 `out/`；切回一般 server 前須重建。各 Task 第 11 節以 Required／Optional／Not Applicable 與原因定義適用性，不能只因命令存在就宣稱通過，也不能為方便而降低門檻。部署或 DNS 任務的品質檢查不能替代真實外部驗證。

**本輪只有規格文件撰寫，不安裝套件、不執行以上網站指令；實際只做 Markdown、來源、路徑、規格一致性與 Git Diff 檢查。**

### 5.4 瀏覽器驗收

未來涉及頁面的 Task 驗收 Desktop／Tablet／Mobile（320、375、768、1440、1920px）、內容／元件、Header／Footer／Navigation、有效連結／錨點、Console／Runtime／Network、HTTP／靜態資源、Keyboard、Focus、Reduced Motion、自動 axe 與必要人工檢查、Metadata、Pages Base Path／404／.nojekyll。Task 012 以 WCAG 2.2 AA 為目標，其他頁面仍保留原規定的 WCAG 2／2.1 A／AA 回歸；自動掃描不代表完整無障礙認證。

### 5.5 截圖

未來視覺頁面任務依各 Task 要求產出真實網站截圖，存放 `docs/screenshots/`，至少含適用的 Desktop／Mobile 與重要區塊，記錄版本、Viewport、尺寸及人工檢視。效能、輔助科技或外部部署任務使用其專屬證據；不以示意圖、舊截圖或檔案存在取代實測。帳戶／DNS 截圖遮蔽機密。Task 001／002 原先 Optional 截圖要求維持原規格，不追補虛構歷史畫面。

## 6. 測試報告與交付要求

### 獨立報告位置

Task 001–005 既有獨立或歷史報告保留，不重新命名或覆寫：

| Task | 現有紀錄 |
| --- | --- |
| 001 | [implementation notes](../98_decisions/implementation-notes.md) 的 Bootstrap 歷史；若重新執行，依 Task 001 的獨立報告要求 |
| 002 | [品牌設計系統](../reports/brand-design-system.md) |
| 003 | [首頁實作](../reports/homepage-implementation.md) |
| 004 | [About 實作](../reports/about-implementation.md) |
| 005 | [Services 實作](../reports/services-implementation.md) |

本輪統一 Task 006–014 未來報告位置如下，**目前皆未建立**，故僅列 code path，不建立假連結或測試結果：

```text
docs/reports/task006-implementation.md
docs/reports/task007-implementation.md
docs/reports/task008-implementation.md
docs/reports/task009-implementation.md
docs/reports/task010-implementation.md
docs/reports/task011-implementation.md
docs/reports/task012-implementation.md
docs/reports/task013-implementation.md
docs/reports/task014-implementation.md
```

### 報告、證據與失敗處理

報告須包含 Repository／Git 狀態、Base SHA、Feature Branch、實際修改檔案、完整指令、環境／工具版本、結果、真實 Exit Code、Browser QA、Responsive、Accessibility、Console／Runtime／Network／HTTP、適用截圖、問題／修正／重驗、Commit／PR／CI、部署狀態與 Known Issues。各 Task 第 12 節定義其專屬範圍與 Evidence Requirements 十欄：Test ID、Test Item、Command / Procedure、Environment、Expected Result、Actual Result、Exit Code、Status、Evidence、Notes。

本機報告在建立 PR 前完成，納入同一功能 PR，與實際提交的程式碼版本一致；後續改程式碼須重跑受影響測試及更新證據。PR CI／Review／Merge／main CI／Deploy 尚未發生時保留 PENDING，發生後補真實紀錄，不預填未來結果。

FAIL 不改寫為 PASS；記錄原因、影響與修正，保留原失敗及重驗證據。無法修正列 Known Issues；阻礙交付的 FAIL 或必要驗收 BLOCKED 不可宣稱完整通過，不得以跳測、降標或隱藏錯誤取得 PASS。外部服務／權限／環境限制記錄實際原因與解除條件。

### 狀態管理

| 執行狀態 | 意義 |
| --- | --- |
| PENDING | 尚未執行；本輪九份規格的初始驗收狀態 |
| PASS | 已實際執行、符合預期且有可追溯證據 |
| FAIL | 已實際執行但未通過，記原因／影響／修正／重驗 |
| BLOCKED | 因外部服務、權限、素材或環境條件無法驗收，記阻礙及解除條件 |
| N/A | 確認不適用，記理由與依據；不是跳測或受阻的代稱 |

Required／Optional／Not Applicable 是適用性，不是執行結果。Optional 未執行保留 PENDING 並說明，不能直接當 N/A。Checklist 僅有證據的 PASS 可勾，其餘未勾；合法 N/A 不算遺漏適用驗收。舊索引的 NOT RUN 於新紀錄統一為 PENDING，歷史報告不改寫。

禁止將計畫／舊任務／不同版本的成功冒作當次結果，虛構 Commit／PR／Run ID，或把 PR 建立、CI 成功、Merge 當成正式發布。規格完成、功能完成、PR 狀態、部署與公開站驗證分別記錄。

## 7. 任務完成定義（Definition of Done）

正式功能 Task 只有在符合原始需求、沒有未授權變更、程式碼符合規範、適用品質／Build／功能／Responsive／Accessibility／Browser 驗收完成、真實截圖與獨立報告齊備、PR 與 CI 有實際紀錄、限制及待確認事項清楚列明後，才能依各 Task 門檻交付。必要項目仍為 PENDING／FAIL／BLOCKED 時不得宣稱完整通過。

部署／DNS／法律內容的必要 gate 按 Task 專屬規則判斷，不能以一般 build 取代；已交付本機或 PR 結果不代表使用者已授權發布。程式碼完成、PR 通過、Review、Merge、部署與公開 URL 驗證是不同狀態。

本輪 Definition of Done 是九份規格與索引完整、來源／路徑／Markdown／相依／範圍檢查通過，不是九項網站功能完成。

## 8. 任務相依性

| Task | 必要基礎／可平行範圍 | 額外發布條件 |
| --- | --- | --- |
| 001–003 | 001 基礎→002 Design System→003 首頁及外框；已有合併成果 | 保護歷史與既有部署，不重新初始化 |
| 004、005 | 以已合併基礎與首頁／外框開發；既有成果保留 | 以實際 main 為準，不私自整合未核准分支 |
| 006、007 | 001–005；Solutions 與 Portfolio 可平行 | 006 是提案方向；007 的案例／狀態／素材需來源與公開授權 |
| 008 | 已合併外框與聯絡設定，可與 006／007 平行 | 已確認管道才公開；真實表單需送出服務、反垃圾與資料決策另行核准 |
| 009 | 與 008 協調資料處理設計；無表單也須盤點實際網站／託管資料行為 | 法律正文、主體、權利聯絡等由品牌負責人／法律審查確認；不以草案冒充有效政策 |
| 010 | 依實際已合併路由先完成保護模式，可與頁面工作平行 | 正式開放索引須內容與 Privacy gate、013／014 實際正式網址及明確授權；不強等未規劃公開的頁面 |
| 011 | 目前實際網站即可先量測／最佳化，可與 010／012 平行 | 新頁面或新部署環境合併後再量測；沒有足夠 field 資料不得宣稱 field CWV 達標 |
| 012 | 目前實際頁面／互動 inventory 即可驗收，可與 010／011 平行 | 新頁面、真實表單或元件改動後補回歸；必要人工輔助科技未驗不可冒稱完整通過 |
| 013 | 已合併可用網站、雙模式 build、Vercel／GitHub owner 與權限 | Project／Git integration／Preview／Production 按授權階段操作，保留 Pages；可先用已核准的 Vercel 網址驗證 |
| 014 | 013 的實際 Vercel Project／Domain target，加上 DNS 控制權與變更授權 | 先審閱 changeset／回滾，再改 DNS；完成 TLS／redirect／公開 URL 驗證，不能猜 record 值 |

008 的無表單模式不因 009 尚未審核而虛構提交功能；若正式啟用表單，必須先協調 009 的資料內容並取得核准。009 的盤點也不要求先公開未核准的 008 表單。013 可以先處理獲授權的 Preview／平台 Production 驗證，014 再接正式網域；未完成 014 不宣稱品牌網域已生效。

## 9. 目前任務進度

> 以下為原規格整理時點的歷史紀錄；最新狀態請見 [Roadmap](ROADMAP.md)。

以下為 `main@e2a8f5a` 的可查證歷史與本輪規格狀態，**不代表本輪重新驗收或發布網站**。Task 001–005 的實作、報告與既有路由已存在；下列 Merge 為本輪基準的祖先：

| Task | 已確認紀錄／功能狀態 | 本輪規格工作 |
| --- | --- | --- |
| 001 | [PR #1](https://github.com/xk2022/xk-website/pull/1)，Merge `a0dfdd063f3780059ce159184451d7df876fa273`；Bootstrap 已合併 | 保留原規格與歷史紀錄 |
| 002 | [PR #2](https://github.com/xk2022/xk-website/pull/2)，Merge `17a81ba32bd2067980088951f10a497bf4fa9c5d`；Design System 已合併 | 保留原規格與歷史紀錄 |
| 003 | [PR #3](https://github.com/xk2022/xk-website/pull/3)，Merge `0ca076078c1d10e6e08a64b0b49d736e1c5f61fd`；首頁與 Pages 外框已合併 | 保留原規格與歷史紀錄 |
| 004 | [PR #4](https://github.com/xk2022/xk-website/pull/4)，Merge `57ad0f26477c670d556c5b8a29a98380b4051be2`；About 已合併 | 保留原規格與歷史紀錄 |
| 005 | [PR #5](https://github.com/xk2022/xk-website/pull/5)，Merge `e341f12d4d3a93127402ed0b4889d2526b253244`；Services 已合併 | 保留原規格與歷史紀錄 |
| 006 | 功能 PENDING，尚無 `/solutions` | 保留已有規格與 17 筆來源，依本輪補齊關聯及報告命名 |
| 007 | 功能 PENDING，三示範作品無完成／Live 證據 | 本輪新增獨立 Portfolio 規格 |
| 008 | 功能 PENDING，`verifiedContactChannels` 仍為空 | 本輪新增 Contact 規格，管道／表單決策 Pending Confirmation |
| 009 | 功能 PENDING，沒有核准 Privacy 正文 | 本輪新增 Privacy 規格，法律與資料決策 Pending Confirmation |
| 010 | 專屬優化 PENDING，既有 Metadata／noindex 保留 | 本輪新增 SEO 規格 |
| 011 | 專屬優化 PENDING，不把先前基本檢查當成 CWV 改善成果 | 本輪新增 Performance 規格 |
| 012 | 專屬改善 PENDING，既有 A／AA 基本回歸不冒作 2.2 AA 完整認證 | 本輪新增 Accessibility 規格 |
| 013 | PENDING，沒有本輪 Vercel Project／Production 驗收 | 本輪新增 Vercel Deployment 規格 |
| 014 | PENDING，實際 DNS Provider／控制權／record 值待確認 | 本輪新增 Domain Configuration 規格 |

歷史報告中的「待審／未部署／legacy Pages」屬原時點快照，保留不回寫。本索引不以舊報告推論目前外部帳戶狀態；正式執行各 Task 時重新查實際 main、權限與發布證據。文件 Repository 的規劃信箱、客戶成效、產品與 Demo 均未因本輪規格撰寫轉為已確認事實。

## 10. 最終原則

一個 Task 對應一類工作，具備獨立規格、報告與驗收；保護已合併功能，不虛構業務、技術、測試或部署成果，不修改文件 Repository。正式發布需要實際授權、部署證據與公開站驗證，不能由文件完成或 CI 成功推定。

本輪只允許修改本索引與 `task006.md`–`task014.md`。不改 src／public／設定／Dependencies／lockfile／Actions，不安裝套件、不執行網站測試、不改 Vercel／DNS、不建假報告或截圖，也不提交 `.next/`／`out/`／暫存工具或機密。保留所有使用者未提交工作。

依本輪指示，沒有這項新任務的明確授權時，不 Push main、不自動建立或合併 PR、不發布正式網站；先完成可檢閱文件與實際文件檢查。文件工作建議 Commit Message：

```text
docs(task): add XK website task specifications 006-014
```

本 README 為官方網站開發任務的總索引。個別規格控制任務範圍；若有衝突，以當次明確指示、最新核准 Task 及已合併 Repository 實際狀態為準。Pending Confirmation 必須在各 Task 指定由誰、何時確認，以及未確認時的處理方式，不能用猜測補齊。

## Task 009 執行紀錄入口

2026-11-19 的 Task 009 以已合併 Task 008 的 `main@4c6646f` 為基準。上方第 9 節保留原規格撰寫時點；目前 Privacy 交付範圍為受控草案與發布保護，Owner 已回覆尚無正式核准資料。法律核准及核准正式頁仍為 BLOCKED，不以技術合併解鎖政策或新個資收件。實際來源、測試與階段結果見 [Task 009 實作與驗證](../reports/task009-implementation.md)。

## Task 010 執行紀錄入口

2026-11-19 的 Task 010 以已合併 Privacy 技術保護的 `main@b423b28` 為基準。工作範圍是 SEO 保護模式：九個公開頁與受控草案的 Metadata／Twitter、最小 WebSite、robots 及 Sitemap 不發布規則；保留全站 noindex／nofollow。上方歷史表格不回寫。正式索引、公開 Sitemap、GSC 與 DNS／Vercel 各依其獨立核准及驗收，不能因本次技術合併視為完成。操作規則見 [SEO 操作指南](../04_deployment/seo-operations.md)。

來源、受測版本、逐頁清冊及實際結果：[Task 010 實作與驗證](../reports/task010-implementation.md)。

## Task 011 執行紀錄入口

2026-11-19 的 Task 011 以已合併 SEO 保護模式的 `main@633d135` 為基準。依可重現 baseline 處理 Noto 可變字重的重複 CSS，保留品牌、內容、功能與一般／Pages 兩種建置。實驗室 LCP／CLS、TBT、受控互動與 field CWV 分開判讀；缺少 field／真機證據不冒作通過。上方原規格撰寫紀錄保留原時點。

來源、完整 runs、實際驗收及限制見 [Task 011 實作與驗證](../reports/task011-implementation.md)；後續重驗方式見 [效能量測指南](../03_engineering/performance-measurement.md)。CI、使用者授權合併、main CI／部署與公開網址結果各以同 PR 的實際事件確認。

## Task 012 執行紀錄入口

2026-11-19 的 Task 012 以 `main@8e42c647646d20873789c54367132901746a58bf` 為基準，在 `feature/website-accessibility` 稽核九個公開頁。工作涵蓋 WCAG 2.2 A／AA 完整適用性、原 2／2.1 回歸，以及實際桌面 Orca、鍵盤、對比、真 200% browser zoom、320 CSS px 與文字間距驗收；未測平台不冒作通過。

來源、問題／修復／版本與實測見 [Task 012 實作與驗證](../reports/task012-implementation.md) 及 [證據操作說明](../reports/task012-artifacts/README.md)。上方原規格撰寫紀錄維持歷史時點；目前使用者已明確授權此次 Push／PR、CI 通過後合併與確認部署，不延伸為品牌更新、法律政策、索引或其他任務發布。

## Bugfix 001–008 優化文件

[bugfix001](bugfix001.md)、[bugfix002](bugfix002.md)、[bugfix003](bugfix003.md)、[bugfix004](bugfix004.md)、[bugfix005](bugfix005.md)、[bugfix006](bugfix006.md)、[bugfix007](bugfix007.md)、[bugfix008](bugfix008.md) 是本次使用者指定的八份改善輸入；原始內容保留，不把重複文字當成八套獨立功能。首頁價值主張／服務卡／技術分類／方案導覽與 Logo 建議的採用及後續界線見 [實作報告](../reports/bugfix001-008-implementation.md)。

## DC-004 執行入口

使用者已對 PR #40 的 v1 配色、品牌外框與桌面／手機版型核准；[同版本紀錄](../01_design/design-collection/reviews/heritage-v1-approval.md) 滿足品牌前置。完整 Heritage 16 頁的 [規格](dc004.md)／[報告](../reports/dc004-implementation.md) 保留原始失敗與版本邊界。PR #40 已合併為 `0d41ecf495e55b792f966c9fe27bd07c27bc5647`，main run 45796333591 的 CI／Pages 及當時公開 33 頁 HTTP 2,329 PASS 已完成。

## DC-005 執行入口

使用者以「批准合併」核准 [Luxury v1](../01_design/design-collection/reviews/luxury-v1-approval.md)，PR #41 已合併；原 [審閱稿](../01_design/design-collection/reviews/luxury-v1.md)、原型／截圖與 [品牌前置報告](../reports/dc005-brand-review.md) 保留原時點。[完整 DC-005](dc005.md)／[實作報告](../reports/dc005-implementation.md) 的分支驗收不改寫為後續新測試。

PR #42 已實際合併為 `main@9322810f27e74e5ed4faa35a3b3931b3719f0c9a`；main run 45802200429 於 2026-11-26 10:33:48Z 完成 Pages 部署，獨立公開 HTTP 驗證 3,273 PASS，包含 49 頁、36 assets 與 29 negatives。兩次合併與公開事件依 [整合報告](../reports/design-collection-integration.md) 追溯，不冒稱 DC-006 驗收。

## DC-006 執行入口

[DC-006 規格](dc006.md) 與 [工作包 §8](../01_design/design-collection/work-packages.md#dc006) 已開始在 `feature/design-collection-navigation-seo` 執行，基準為上述已發布 49 頁 main。公司 main `9213a3d8dacb8774d87c26cb736c4a4315779e95` 與前置整合同版，已核讀、無新增適用規範衝突，維持唯讀。

本輪實作共用導航模型／resolver、Header 後且列印隱藏的風格 band、同內容／slug／共同合法 hash 切換、三套 Header／Footer／CTA 同源導覽與 Gallery 七主頁比較。URL 決定風格，Client 僅接輕量公開 DTO；不帶 query／個資，不增加偏好儲存，Quotation 只還原既有 IDs。本機功能與版面驗收已完成；原始 incomplete／網路診斷及限定重驗詳見本輪報告，未把原 suite 退出碼改寫成全數 PASS。

[本輪報告](../reports/dc006-implementation.md) 記錄實際結果、原失敗與限定重驗；[截圖](../screenshots/design-collection/dc006/) 共 18 張實際 Pages 畫面，已逐張檢視。最終 CI／artifact 待新 PR，commit／push feature 後交付審閱，不自動合併；PR #40／#42 的舊合併授權不延伸至此新 PR。DC-007 尚未開始，既有法律、索引、價格、收件與 DNS 邊界保持。
