# Task 011 — Performance 網站效能最佳化

## 1. Task Overview

以實際網站、實際建置及可重現量測，辨識載入、互動與版面穩定性的瓶頸，再進行有證據的必要最佳化。維持 XK 品牌、功能、Accessibility 與 GitHub Pages／一般 Next.js 的相容性。

本 Task 獨立於 SEO（Task 010）、Accessibility（Task 012）、Vercel Deployment（Task 013）及 Domain（Task 014）；不能為改善分數刪除內容、破壞互動、開放索引或改換部署平台。本文件只定義未來執行規格，本輪不實作功能、不量測網站、不建立假效能報告；所有未執行結果為 `PENDING`。

## 2. Repository & Prerequisites

| 項目 | 規格 |
| --- | --- |
| Website Repository | `xk2022/xk-website`，唯一允許修改的 Repository |
| Base Branch | 未來執行時重新確認最新已合併 `main`、Remote、Branch、Status 與使用者未提交工作 |
| 本次規格盤點基準 | `e2a8f5a33f24d1ea65a3afc3780014a33c204528`；僅為撰寫時的程式碼快照，不是未來測試結果 |
| 建議 Feature Branch | `feature/website-performance` |
| 前置條件 | Task 001–005 已合併的架構、Design System、首頁、About、Services；當次已實作的後續頁面一併納入實際路由清單 |
| 受測環境 | 保留現有 GitHub Actions → GitHub Pages 靜態產物及一般 Next.js production Build；公開受測 URL 與實際部署版本須查證 |
| Task 013／014 依賴 | 只有評估新 Vercel／正式域名環境才依賴其已授權部署；不阻塞既有模式的本機基準量測 |
| 未來獨立報告 | `docs/reports/task011-implementation.md`，本輪不建立或假連結 |

盤點時公開頁面為 `/`、`/about`、`/services`，存在受保護的開發設計系統頁。字體在 `src/app/layout.tsx` 使用 Inter 與 Noto Sans TC、`display: swap`，Noto `preload: false`；Next Font 於建置時取得、網站自行託管。已明確標記的 Client Components 是 `MobileNavigation` 與開發用 `ButtonDemo`，不能因為它們存在就判定有瓶頸。Pages export 使用 `images.unoptimized: true`；不可假設 Pages 提供 Next Image 動態處理服務。以上是原碼盤點，不是效能驗收。

## 3. Reference Documents

- [AGENTS.md](../../AGENTS.md)、[README.md](../../README.md)、[Task 清單](README.md)。
- [Task 001](task001.md)、[Task 002](task002.md)、[Task 003](task003.md)、[Task 004](task004.md)、[Task 005](task005.md)。
- [歷史 implementation notes](../98_decisions/implementation-notes.md)、[品牌設計系統](../reports/brand-design-system.md)、[首頁實作紀錄](../reports/homepage-implementation.md)、[About 實作紀錄](../reports/about-implementation.md)、[Services 實作紀錄](../reports/services-implementation.md)。
- [GitHub Pages 部署指南](../reports/github-pages-deployment.md)、實際 `src/app/`、`src/components/`、`src/config/`、`public/`、`scripts/build-github-pages.mjs`、`.github/workflows/ci.yml`、`package.json`、lockfile 及 `next.config.ts`。

規格優先順序為當次使用者明確指示、已合併且確認的網站架構／Design System、當次任務要求、已確認品牌決策，再參照舊規劃。歷史測試只證明當時版本與範圍，不作為本 Task 新結果。

下列文件來源均為 `xk2022/xplore-kaleidoscope`、`main` 的固定 Commit `95ef1275a46ace76e11f668178ca881087483398`；檔案與 Blob 已依唯讀快照核對。文件狀態及採用範圍不能由檔名「正式」或範例程式碼推定為已核准／已實作。

| 來源路徑 | Git Blob SHA | 狀態與採用範圍 |
| --- | --- | --- |
| `doc/00_initGPT/05_Xplore Kaleidoscope 正式建置技術決策如下.md` | `59f6c1151015bdec746229e78596e2311cdc2f6f` | 開頭 ASK 提供技術決策；採 Next.js／Tailwind／shadcn 及官網可獨立顯示。後續 ANS 的 monorepo、Backend、next-intl、產品原型不視為本網站已核准實作。 |
| `doc/01_business-plan/week-02/01_brand-identity_品牌視覺識別規範.md` | `19378775e986d5c8e002035685668d381532cae4` | 初版規劃；採專業、可讀、Responsive、必要才使用 Client Components 的原則，不採舊色票或未完成產品宣稱。 |
| `doc/01_business-plan/week-02/03_color-palette_品牌色彩系統規範.md` | `98baa236493f25351c6b991cb9dd1cecf672dc39` | 初版規劃；採實際對比與非純色彩傳達的要求；舊色值不能覆蓋已合併的八個 UI Tokens。 |
| `doc/01_business-plan/week-02/04_typography_品牌字體與排版規範.md` | `596ce5b3d09642c33289abb672199e0998bcf08e` | 初版規劃；採 Inter／Noto Sans TC、可讀階層、Next Font 自託管與 fallback；合法本機字體只是備選，不擅換字體。 |
| `doc/01_business-plan/week-02/08_website-architecture_官方網站 Next.js 技術架構設計.md` | `15c1483bf47be33bc29b755a220fb465b5dd8a1a` | 初版規劃；§13.5 是 CWV 建議目標，§15 指向 WCAG 2.2 AA，§16 提及 Lighthouse／axe。採適用的工程原則，不當成既有量測、完整認證或部署證據。 |
| `doc/01_business-plan/week-02/09_website-mvp_官方網站 MVP 開發規格.md` | `5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d` | 初版規劃；採 Responsive、Accessibility、Lighthouse 與實際驗收方向；表單、API、Analytics、Vercel／正式域名均須另依現況及授權。 |

固定版本可由 [文件 Repository 快照](https://github.com/xk2022/xplore-kaleidoscope/tree/95ef1275a46ace76e11f668178ca881087483398) 查閱。此 Repository 僅供讀取，不能建立 Branch、Commit、Push 或修改遠端內容。

額外技術依據為 [Core Web Vitals](https://web.dev/articles/vitals)、[Lighthouse Performance](https://developer.chrome.com/docs/lighthouse/performance) 與當次安裝版本的 Next.js 文件。執行前記錄查閱日期及工具版本，不能把工具預設值或過期 API 當成目前量測。Lighthouse 的 TBT 與 Performance Score 不等於真實使用者 INP 或完整 CWV 結果。

## 4. Scope & Requirements

### 必須完成

1. 先建立路由／資源／互動清單、環境規格及 baseline；沒有 baseline 不直接宣稱改善或做無依據的大重構。
2. 量測 LCP、CLS、載入資源、Client Bundle、Main Thread／Long Tasks、關鍵互動；對 INP 區分 field 與受控診斷。
3. 檢查圖片、SVG、字體、Client／Server 邊界、Code Splitting、Caching、Network Waterfall 及第三方請求。
4. 針對可重現瓶頸提出修改、預期作用與風險，再以相同方法做 after 比較；若沒有可證實瓶頸，不製造無效重構或虛構提升。
5. 回歸所有已實作頁面、導覽、內容、樣式、Accessibility、noindex、Metadata、一般 Build 與 Pages export。
6. 產出本次量測資料、優化決策、實際結果、限制及獨立報告，不只交 Lighthouse 截圖。

### Pending Confirmation 與 fallback

| 待確認事項 | 誰／何時確認 | 未確認時的處理 |
| --- | --- | --- |
| 實際公開受測 origin、部署 Commit、主要裝置／網路受眾 | 網站負責人與工程師在 baseline 前核對現有 Pages 設定及實際公開版本 | 先測本機 production／Pages，標明不是 CDN／真實使用者結果；公開環境案例保持 PENDING 或因實際阻礙 BLOCKED |
| 可用的真實裝置、Chrome／Lighthouse 版本及節流 profile | 工程師於量測前確認並固定 | 使用可取得的受控環境，完整記錄 emulation；不可冒稱真機或與不同條件直接比較 |
| CrUX／既有 Search Console field 資料權限及樣本 | 網站負責人於 field 評估前確認；只讀取得已有資料 | 無 field 資料時保留 PENDING，標示「無足夠 field 證據，不能判定 CWV PASS」；不加 Analytics 或擅開索引來取得資料 |
| Baseline 後的 JS／圖片／字體 Budget 與優化優先順序 | 工程師依量測提出，維護者在修改前 review；如需品牌／內容變動由品牌負責人確認 | 未同意的新硬門檻不當成既定商業需求；先作不改品牌／功能的可量測修正，保留待確認的 budget |
| 外部 CDN、Cache Header、Vercel／DNS 變更 | 網站管理者在任何外部寫入前確認範圍 | 僅報告觀察與建議，不修改平台設定；這些不阻塞可獨立完成的程式碼修正 |

## 5. Information Architecture & UX

本 Task 不新增行銷頁或公開效能儀表板，原有資訊架構、中文內容、CTA 與有效路由保持完整。

基準腳本與人工流程至少包含：首次進入首頁、直接進入 About／Services、Header／Footer 跨頁、Mobile Navigation 開啟／Escape／選取連結、真實 CTA 與頁內錨點。將所操作節點、時間、瀏覽器事件及長任務記錄在受控互動案例；不存在的 Contact 表單、篩選、登入或 API 不建立假互動。

檢查 LCP 實際元素、字體替換造成的位移、圖片預留空間、Mobile Navigation 的開啟回應、窄螢幕換行與幾何圖樣的繪製成本。不能只根據檔案大小或 Server Component 標籤推定使用者體驗。

## 6. Content & Data Specification

### CWV 工程目標與判定界線

| 指標 | 工程目標 | 來源與使用方式 |
| --- | --- | --- |
| LCP | ≤ 2.5 秒 | 私有架構文件 §13.5 的建議目標；量測條件與樣本須列出，不代表網站已達標 |
| INP | ≤ 200 ms | 同上；field 應在足夠樣本的第 75 百分位（p75）評估，Lighthouse／TBT 不替代 INP |
| CLS | ≤ 0.1 | 同上；同時記錄載入與實際互動觀察的版面位移，不能只截取最好一次 |

這些是工程 target，不是已完成事實、對外 SLA 或業務保證。不得自創「Lighthouse 必須 90 分」或未經確認的改善百分比。若實測不符目標，如實記錄 FAIL／原因與修正，不事後降低門檻換取成功。

### Lab、field 與 baseline 協議

- Field：若有可授權讀取的 CrUX／既有資料，記錄來源、URL 或 origin 聚合、資料時間窗（如 CrUX 28 天）、裝置類別、p75、樣本可用性與該來源發布門檻。URL／origin、mobile／desktop 不能混用；無足夠資料不能判定真實使用者 CWV PASS。
- Lab：固定同一程式碼 baseline、相同 OS／硬體／電源狀態、瀏覽器／Lighthouse 版本、Viewport、CPU 節流、網路 RTT／上下行、快取狀態、測試 URL、建置模式及 Background Apps。先記錄條件，再開始重複量測。
- 預設規劃 mobile 375×812、desktop 1440×1000 的可比較 profiles；實際 CPU／RTT／吞吐值在開始前寫入報告。可採 mobile CPU 4×、RTT 150ms、下行 1.6Mbps、上行 750kbps 作受控起點，但須確認工具如何模擬並匯出實際設定；不能只寫「慢速網路」。Desktop 亦須記錄實際未節流或指定值。
- 每個比較案例至少三次有效 runs，保留全部原始結果，以中位數及範圍比較 baseline／after；不得挑最好一次。異常 run 僅能以明確原因排除並補測，原始值仍保留。
- 冷 Cache 使用新 context／清除站點儲存；暖 Cache 在相同流程重複瀏覽並由 Network 證明命中。Lighthouse 預設 storage reset 與暖快取測試須明確分開，不能將設定衝突的結果標成 warm。
- 至少所有實際公開路由有 mobile／desktop 冷載入基準；首頁及最大內容／互動風險頁補暖快取與真實導覽。Pages 是現有部署目標，其靜態產物為主要受控量測；一般 Next.js 模式作相同代表頁比較／回歸。公開主機結果另列，不能直接與 localhost 混比。
- INP：在可取得的真實資料之外，以實際 mobile menu、跨頁及 CTA 操作檢查 Event Timing／DevTools responsiveness、事件處理與 Long Tasks。標示這是受控互動診斷，不把少量操作或 lab TBT 宣稱為 field INP。模擬不能取代另有的真機案例。

### 建議量測資料契約

未來可用 JSON／CSV 保存資料，但本輪不新增檔案。每筆至少包含 `testId`、`route`、`codeVersion`、`buildMode`、`origin`、`timestamp`、`toolVersions`、`deviceProfile`、`viewport`、`network`、`cpuThrottle`、`cacheState`、`runNumber`、實際 LCP／CLS／TBT／Long Tasks／資源 Bytes／Request Count、`inpSource`、`fieldWindow`、`sampleAvailability`、`evidencePath`。沒有量到的 metric 使用 `null` 加原因，不能填 0。

報告另提供 baseline／after 的同條件中位數、原始 runs、差值、分析與取捨。JS／圖片／字體 Budget 必須以路由基準量測、風險與功能需求 review，不用沒有依據的固定數字；新增負載須說明理由。沒有 baseline、不可比條件或抽樣不足時，不計算改善率。

## 7. Design System & Technical Constraints

### 優化檢查清單

| 面向 | 要求 |
| --- | --- |
| Images／SVG | 盤點實際素材及 byte／尺寸／傳輸格式；預留寬高或 aspect ratio；非首屏圖片適當 lazy-load，不 lazy-load 真正 LCP；不新增未授權素材。Pages 無動態 Image Server，選可靜態輸出的方案並保留 Base Path。不得改畫／失真原始 SVG Logo。 |
| Fonts | 保留 Inter／Noto Sans TC、fallback、目前 swap；實測 font waterfall、中文字重／子集及 preload 是否合理。不能盲目預載全部 CJK 或為分數換字體。local font 只在有合法素材、確認必要及授權後評估。 |
| JavaScript Bundle | 以 build／瀏覽器 Coverage／Network／可用分析工具確認每路由 initial 與 async payload、壓縮與解壓 Bytes，避免把開發版體積當 production。清除確定未用的程式碼，不移除必要互動。 |
| Client／Server Components | 保持靜態內容為 Server Components；只對實際互動保留 Client 邊界。驗證 mobile navigation hydration／事件功能，不能把整頁改 client。開發路由與頁面 payload 不得公開；bundler 可能保留未載入的 ButtonDemo 雜湊 chunk，不因此判失敗或手動刪除 chunk，只有實際載入／執行成本才依瓶頸評估改善。 |
| Code Splitting | 有足夠大且非關鍵的 Client 功能才延遲載入；記錄 chunk／請求及互動影響。沒有實際功能不新增 dynamic import、Skeleton 或無意義 wrapper；首屏內容不因拆分延後。 |
| Caching／Network | 讀取真實 Response Header／壓縮／Cache-Control／命中、redirect、request priority、阻塞鏈與失敗請求。HTML／雜湊資源分開檢查；不能套 immutable 到會變動的 HTML。GitHub Pages Header 非應用可控時記限制，跨平台建議留 Task 013。 |
| CSS／繪製 | 保留既有語意 Tokens、Typography、幾何樣式、Reduced Motion；有 Paint／Style／Layout 證據才調整重繪，避免大動畫或新增套件。 |

保留 Next.js App Router、Strict TypeScript、Tailwind CSS 4、shadcn/ui、Lucide、Node.js 24.x 與現有相依版本。執行前讀 installed Next.js docs，不照抄過期指令。原則上不新增 Dependencies／lockfile 變更；所需 Lighthouse／瀏覽器工具可用已有或暫存的版本固定工具，缺少工具須確認方案，不把測試工具塞入 runtime。

不加入 RUM、Analytics、第三方 Tracking、Web Vitals 上報 API、CMS 或 Backend。若未來有資料蒐集需求，必須另經網站負責人及 Task 009 隱私處理確認，此 Task 不默認授權。

## 8. Navigation, SEO & Deployment

保留全部已實作路由、真實跨頁與錨點、Metadata、Canonical、Open Graph、`zh-TW` 與 `noindex, nofollow`。不得為取得 field 資料擅自開放 Search Indexing；Task 010 的索引決策獨立處理。

一般 Next.js Build 及 `npm run build:pages` 均需驗收。Pages 保留實際 Base Path（盤點預設 `/xk-website`）、trailingSlash、`.nojekyll`、404 與開發路由排除。不得改 `.github/workflows/ci.yml` 部署條件、Pages Source、DNS、Vercel Project／Secrets 或正式網域。建置本身不等於部署；網路 Cache、CDN、公開主機驗證須附實際 Commit／URL 證據。

## 9. File Structure & Change Scope

| 位置 | 未來執行時允許的必要工作 |
| --- | --- |
| `src/app/layout.tsx`、`globals.css` | 有量測證據的字體／關鍵 CSS／版面穩定調整，不破壞字體與 Tokens |
| `src/components/layout/`、`brand/`、`sections/` | 瓶頸相關的靜態內容、圖片、Client 邊界或重繪修正，保留 API／語意與互動 |
| `public/` | 僅已有授權素材的必要壓縮／靜態衍生檔及來源紀錄；原始 Logo 保留 |
| `scripts/` | 如需要可重現且輕量的效能檢查流程，可新增清楚命名腳本，不另造部署架構 |
| `docs/reports/task011-implementation.md` | 未來獨立實作、baseline／after、測試與限制報告 |
| `docs/reports/task011-artifacts/` | 未來原始 Lighthouse JSON／HTML、waterfall／trace、profile／資源表；提交前去除個資與 token，巨大檔案用實際 artifact 位置 |
| `docs/screenshots/task011-*.png` | 未來實測頁面／Network／Performance 證據 |

不預設上述檔案必須全部修改；以瓶頸與最終 Git Diff 為準。`package.json`、lockfile、Next／Workflow 外部設定不作無依據變更；如真的需要超出既定範圍，先提出具體原因與可 review diff 再依實際授權處理。不得修改文件 Repository 或提交 `.next/`、`out/`、`node_modules/`、環境密鑰及未處理 trace 個資。本輪只建立本規格文件。

## 10. Implementation Procedure

1. 確認最新 main、工作目錄與前置功能；建立 `feature/website-performance`，保留使用者工作。讀來源與既有實作紀錄。
2. 依實際路由建立測試 inventory，確認部署 Commit、一般／Pages 模式、工具、裝置及網路 profile，列出 Pending Confirmation。
3. 安裝既有 lockfile：`npm ci`；建立一般及 Pages production 產物，不能量測 HMR／development server 作正式基準。
4. 在修改前依第 6 節建立 baseline：每比較案例至少三次、冷／暖分開、mobile／desktop 分開，保留所有原始 runs 與實際互動 trace。
5. Review 瓶頸、Budget、預期改善及保護範圍，逐項作最小修改，不為測試改造內容或移除可及性。
6. 在相同版本工具／硬體／profile／cache 協議建立 after；說明所有條件差異，條件不同就不作直接改善率比較。
7. 依第 11 節跑品質、功能、Responsive、Accessibility 與兩模式回歸。記錄失敗、修正、必要重驗及真機限制。
8. 在 PR 前完成 `docs/reports/task011-implementation.md` 與可追溯 baseline／after 證據，對照最終受測 tree／diff。
9. 檢查完整 Diff 與敏感資料，Conventional Commit、Push Feature Branch、建立 PR 並確認實際 CI。合併／部署／公開 URL 另依授權及七階段規則，不自行發布。

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

### 適用性與品質命令

以下每項獨立分配 `PERF-*` Test ID，初始狀態均為 PENDING。

| 項目／指令 | 適用性 | 驗收依據／理由 | 狀態 |
| --- | --- | --- | --- |
| `npm ci` | Required | 鎖定既有套件可安裝，記錄版本、真實 Exit Code，無未授權 lockfile 變更 | PENDING |
| `npx tsc --noEmit` | Required | Strict TS 與既有元件 API 保持相容 | PENDING |
| `npm run lint` | Required | 依既有規則零錯誤／警告，記錄輸出 | PENDING |
| `npm run build` | Required | 一般 production Build 成功，不忽略型別／Lint 錯誤 | PENDING |
| `npm run build:pages` | Required | 所有實際公開路由靜態輸出，Pages Validator 正常 | PENDING |
| Lighthouse HTML／JSON | Required | 以當次可取得且版本固定的 CLI 或 DevTools 跑 production URL；保存 profile 與全部 runs，不預填分數 | PENDING |
| Production baseline／after | Required | 同條件每案例至少三 runs、中位數／範圍可重現；修改前 baseline 缺失不得宣稱提升 | PENDING |
| Lab LCP／CLS target | Required | 在預先記錄 profile 下評估 ≤2.5s／≤0.1；記錄實際值、差異、瓶頸及不達標原因，不能藏掉 FAIL | PENDING |
| Field CWV p75 | Optional | 只有足夠實際資料及讀取權限才能判定三項 CWV；無資料保留 PENDING／限制，非 lab PASS | PENDING |
| INP／互動診斷 | Required | 量測真實選單／導覽／CTA 的 Event Timing、Long Tasks 與反應；TBT 是 lab 診斷而非 field INP | PENDING |
| Bundle／Code Splitting | Required | 比對每代表路由 initial／async JS 的實際 transfer／decoded Bytes、chunks 與 hydrate 邊界，變動可解釋 | PENDING |
| 圖片／SVG／Fonts | Required | 有效格式、預留空間、LCP 載入、fallback／CJK／preload、原稿 Logo 與 Network 記錄正常 | PENDING |
| 冷／暖 Cache、Network | Required | 清楚分開測試，檢查命中／Header／壓縮／waterfall／redirect，記錄不能控制的主機政策 | PENDING |
| 真實行動裝置與網路 | Optional | 可取得真機時執行同一操作及記錄機型／OS／網路；未取得不能冒稱已測真機 | PENDING |
| Lighthouse Performance Score | Optional | 可報告實值作輔助，不設沒有來源的 90 分門檻，不用分數取代 CWV／UX | PENDING |

工具選擇確認後，例如以既有 `lighthouse <實際-production-URL> --output=html --output=json --output-path=<實際-artifact-prefix>` 取得報告；具體 flags、版本及 profile 必須先由該版本 help／設定核對，再完整記錄，不執行未存在的 npm script 或假定某個分析套件已安裝。沒有 CLI 時可用實際 DevTools Lighthouse 匯出相同證據；兩者結果不能混作同一基準。

### 迴歸與發布保護

| 項目 | 適用性 | 驗收依據／理由 | 狀態 |
| --- | --- | --- | --- |
| 所有公開頁及有效連結 | Required | 至少當下首頁／About／Services，另納入新實作路由；HTTP 200、內容／CTA／錨點及選單功能無退化 | PENDING |
| 320／375／768／1440／1920px | Required | 五種指定寬度無水平溢出／重疊，字體及媒體無失真，Layout Shift 與真實操作可視檢查 | PENDING |
| axe WCAG 2／2.1 A／AA 與鍵盤 | Required | 不為效能犧牲 headings／names／focus／skip link／Escape／Contrast／Reduced Motion；Task 012 若已採 2.2 亦保持其成果 | PENDING |
| Console／Runtime／Network | Required | 無未處理錯誤、資源失敗與 hydration 問題；外部問題照實記錄不假 PASS | PENDING |
| Pages Base Path／HTML／資源 | Required | 正確 Base Path、CSS／JS／fonts／Logo、404、`.nojekyll` 與開發頁排除 | PENDING |
| Metadata／noindex | Required | 原 Canonical／OG／語言保持正確，noindex／nofollow 沒有被優化移除 | PENDING |
| 一般 production 開發路由 | Required | 預設 `/dev/design-system` 404；既有預覽旗標只用於明確驗收，不擴公開產物 | PENDING |
| 個資追蹤／RUM 上報 | Not Applicable | 本 Task 不授權新增 Analytics、第三方追蹤或資料蒐集，不做假報表 | PENDING |
| 公開主機／Cache 觀察 | Optional | 有實際公開版本才獨立記錄主機／網路條件；本機結果不能代替公開環境 | PENDING |
| Cache／平台寫入 | Not Applicable | 平台設定、Secrets、DNS／CDN／Vercel 改動屬另外授權，不用改發布條件取得通過 | PENDING |

### Test Failure Policy

- `FAIL` 不得標記為 `PASS`，原始失敗與重驗紀錄均須保留。
- 發現問題必須記錄原因、影響範圍及修正方式；可修正的問題應先修正，再重新執行相關測試及必要回歸。
- 無法修正的問題必須列入報告的 Known Issues，註明嚴重程度、交付影響、目前狀態及後續處理方式。
- 存在阻礙交付的 `FAIL` 或必要驗收的 `BLOCKED`，不得宣稱任務完整通過。交付須符合原規格；不適用項目只有在附上理由與依據後才能記為 `N/A`。
- 不得透過跳過測試、降低驗收標準、隱藏錯誤或展示舊成功結果取得 `PASS`。
- 外部服務、權限或環境造成的阻礙，必須記錄實際原因、發生時間、影響測試及解除條件；不得虛構執行結果。

## 12. Test Report & Evidence

獨立報告位置為 `docs/reports/task011-implementation.md`。本輪不建立此未來報告；執行時須在 PR 前一併納入本次本機驗收、baseline／after、優化決策與限制。

除共通欄位外，每個效能案例記錄全部原始 runs、同條件中位數／範圍、trace／Lighthouse JSON、實際硬體／裝置／節流／冷暖 cache、buildMode、URL／受測版本。Field 不足時明確保留「無法判定 CWV」，不能填 0、虛構 Lighthouse 數字或改善率。資料及截圖中的 token／個資須移除，保留可追溯而安全的 artifact。

未來證據建議命名（只有實際產生後才在報告連結）：

| 內容 | 未來檔名／位置 | 初始狀態 |
| --- | --- | --- |
| Baseline／after runs、profile 與資源表 | `docs/reports/task011-artifacts/`，或實際 CI artifact 的對應路徑 | PENDING |
| Mobile LCP／waterfall | `docs/screenshots/task011-performance-mobile.png` | PENDING |
| Desktop 代表頁 | `docs/screenshots/task011-performance-desktop.png` | PENDING |
| 選單／互動 Performance Trace | `docs/screenshots/task011-interaction-trace.png` 加原始 trace artifact | PENDING |
| 字體／Cache／Network 證據 | `docs/screenshots/task011-fonts-network.png` | PENDING |

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

未來功能分支為 `feature/website-performance`，Base `main`；建議 Commit `perf(website): optimize measured performance bottlenecks`。本機報告完成後再建立 PR，包含量測方法、baseline／after、原始證據、必要程式碼變動、功能／Accessibility 保護、風險、待確認及未完成事項。實際 Commit／PR／CI Run ID 以紀錄為準，不預填。

不直接修改／Push main，不自動合併或部署。此次規格撰寫分支是 `docs/task-specifications-006-014`；這個文件工作不等於執行 Task 011 功能最佳化。

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

- 實際路由／互動／資源 inventory、風險與已確認的測試 profiles。
- 同版本方法的 baseline／after 原始 runs、中位數、瓶頸、實際修改及結果；field 與 lab 分開判讀。
- 可維護的必要程式修正，保留原技術、品牌、功能、可及性、Metadata／noindex 及兩種 Build。
- `docs/reports/task011-implementation.md`、真實截圖與測試 artifacts，包含失敗／重驗、工具／樣本限制。
- 真實 Feature Commit、PR、CI、Review／合併／部署各階段狀態，繁體中文交付報告。不能把 CWV target 寫成已達標業務事實。

## 15. Out of Scope & Future Work

不新增行銷頁、未規劃互動、後端、API、RUM／Analytics、追蹤、CMS 或資料庫；不改品牌八色、Logo、字體或先前已確認內容。不在本 Task 開放索引、配置 Vercel／DNS 或自動發布。

樣本不足的 field CWV、取得真機／權限、主機 Cache 政策、合法本機字體備案及更多裝置測試依實際條件另列後續事項。不聲稱所有網路／裝置保證達標；若更換主機、重要頁面內容或工具版本，須重新建立可比較基準。

## 16. Final Delivery Checklist

以下為未來 Task 011 的初始清單，本輪只完成規格撰寫，不代填網站測試。

執行狀態依第 11 節統一使用 `PENDING`、`PASS`、`FAIL`、`BLOCKED`、`N/A`。僅有證據的 `PASS` 可勾選；其餘保持未勾選，`N/A` 附判定理由且不視為缺少適用驗收。必要項目仍為 `PENDING`、`FAIL` 或 `BLOCKED` 時，不得宣稱完整通過。以下是規格初始清單，本輪文件修訂不代填功能結果。

- [ ] PENDING — 已核對實際 main、前置功能、部署版本、公開路由及受測模式。
- [ ] PENDING — 已記錄 profile／硬體／工具／節流／cache，修改前建立至少三 runs 的 baseline。
- [ ] PENDING — LCP／INP／CLS 目標與 field／lab／TBT 判定界線清楚，無資料未冒稱 CWV PASS。
- [ ] PENDING — Images、Fonts、Bundle、Client／Server、Code Splitting、Cache／Network 依證據檢查與必要修正。
- [ ] PENDING — 同條件 after、中位數及全部原始證據完成；未虛構分數、budget 或改善率。
- [ ] PENDING — npm ci、Strict TS、Lint、一般與 Pages Build 完成，功能／五種指定寬度／Accessibility／Browser 及資源回歸驗收完成。
- [ ] PENDING — Metadata、noindex、Base Path、404、.nojekyll、開發路由保護及原 Logo／字體保持完整。
- [ ] PENDING — 截圖、原始 artifacts、獨立報告與已知限制完成，資料無機密或非必要個資。
- [ ] PENDING — Diff 範圍檢查、Feature Commit、PR、實際 CI 結果及繁體中文交付完成，未自動合併或部署。
- [ ] PENDING — Test Failure Policy 已遵守，失敗、阻礙與 Known Issues 有完整記錄，沒有阻礙交付的未解決必要驗收。
- [ ] PENDING — 每項測試的 Test ID、預期／實際結果、狀態與可追溯證據已記錄，沒有以預期或舊結果代填。
- [ ] PENDING — 獨立報告已在 PR 建立前完成並納入同一 PR，最後測試、後續重驗與實際提交的程式碼一致。
- [ ] PENDING — 本機、Feature Commit、PR CI、PR Review、合併授權、main CI、部署與公開 URL 驗證分別記錄；未發生階段維持 PENDING 並說明，沒有冒稱已發布。
