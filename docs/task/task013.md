# Task 013 — Vercel Deployment（Vercel 正式環境部署）

本文件是未來執行 Task 013 的獨立規格。本輪只撰寫規格，**不建立或連結 Vercel Project、不新增 Secrets、不執行 Preview／Production Deployment、不修改現有 Pages 發布流程**。所有驗收初始狀態為 **PENDING**；文件建立、既有 Pages 發布或過往 Build 成功，均不是本任務的 Vercel 上線證據。

## 1. Task Overview

| 項目 | 規格 |
| --- | --- |
| Project / Brand | Xplore Kaleidoscope / XK |
| Task | 013 — Vercel Deployment |
| 類型 | Deployment Infrastructure；與 Task 014 Domain Configuration 分開 |
| 目的 | 在保留現有網站與 GitHub Pages 的前提下，建立可追溯、可審核及可回復的 Vercel Next.js 部署 |
| Website Repository | `xk2022/xk-website` |
| 品牌網址 | `https://xplorekaleidoscope.com`；品牌設定不證明 DNS 或 Vercel Domain 已完成 |
| 正式實作分支 | `feature/website-vercel-deployment` |
| 獨立報告 | 未來 `docs/reports/task013-implementation.md`，本輪不建立假報告或假連結 |
| 完成界線 | 分別驗收本機相容性、Vercel Preview、經授權的 Production 及公開 URL；正式網域另由 Task 014 驗收 |

網站維持 Next.js App Router、React、Strict TypeScript、Tailwind CSS、shadcn/ui、Lucide React，無 Backend 亦可獨立運作。不以部署任務補開發頁面、API 或商業功能。

## 2. Repository & Prerequisites

| 前置條件 | 必須確認的內容 |
| --- | --- |
| Repository 與工作目錄 | 重新檢查 remote、branch、status、未提交變更、最新已合併 `main` 與實際 Base SHA；不得覆蓋使用者工作 |
| 本次規格研究基準 | Website `main@e2a8f5a33f24d1ea65a3afc3780014a33c204528`；文件分支 `docs/task-specifications-006-014`，不是未來實作 Base |
| 前置成果 | Task 001–005 已合併架構；重新盤點執行時所有真實頁面。Task 006–012 可依內容與品質條件平行推進，不假設已實作 |
| Production 內容門檻 | 品牌負責人確認本次允許發布的頁面、聯絡／Privacy 狀態、已知問題與索引政策；未完成任務不可因此宣稱完整 MVP 上線 |
| Vercel 控制權 | 確認 Team／Account、Project 是否存在、Owner／操作者權限、GitHub App 安裝範圍、方案限制及費用；均為 Pending Confirmation |
| 發布與回復權限 | Owner 確認誰可設定 integration、建立 Preview、啟用 main 自動部署、發布／promote Production、rollback；記錄對象、範圍、時間與授權來源 |
| 既有發布 | 讀取實際 Pages Source、Environment、URL、workflow 與最近對應 SHA；不得憑歷史指南的 legacy Jekyll／403 敘述推定當下狀態 |

缺少帳戶、Project 或權限資料時，繼續完成本機檢查、設定提案及報告；外部階段維持 PENDING，實際遭權限阻擋才記 BLOCKED。不得探測外部管理員登入狀態、借用未知帳戶或在錯誤 Team 建同名 Project。

## 3. Reference Documents

### 3.1 Website 來源與現況

完整閱讀 [AGENTS](../../AGENTS.md)、[README](../../README.md)、[任務索引](README.md)、[Task 001](task001.md)、[Task 002](task002.md)、[Task 003](task003.md)、[Task 004](task004.md)、[Task 005](task005.md)、[Task 006](task006.md)、[歷史紀錄](../98_decisions/implementation-notes.md)、[Design System](../reports/brand-design-system.md)、[首頁](../reports/homepage-implementation.md)、[About](../reports/about-implementation.md)、[Services](../reports/services-implementation.md) 與 [Pages 指南](../reports/github-pages-deployment.md)。舊報告的缺檔、待審／待部署與測試結果是當時快照，不複製為本次結論。

下表 Website 來源固定於上述研究基準；Branch 為 `main`。Blob 由實際檔案核對，未來執行重新核對版本與差異。

| 路徑 | Git Blob SHA | 本次採用內容／核准界線 |
| --- | --- | --- |
| `next.config.ts` | `07606ad3f492dfb5b747e96ddb22144e54a45612` | 已合併雙模式；預設無 export／Base Path，保留 Tailwind Turbopack integration |
| `package.json` | `f72927013eabcd10c4a52fe99b8f77458b2f1568` | 一般 build/start、Node 24.x 及既有 scripts；不是 Vercel Project 存在證據 |
| `package-lock.json` | `984d16efadbf1eab160e324bca182b13ef17a9c4` | lockfile v3 與實際版本，不另選一組部署依賴 |
| `.github/workflows/ci.yml` | `8cb71f8208e3ca55085230bd996fbf95aac8296c` | 既有 quality → pages-build → deploy，保留 PR／main 邊界 |
| `scripts/build-github-pages.mjs` | `f1aa1df74b6abf867e12739a6c3bce49566ebf31` | Pages export、Base Path、Metadata、404／dev 排除等既有回歸約束 |
| `src/config/site.ts` | `6653507e18de1d78f8e4c1aca058d666d654f704` | 品牌網址目前為常數，不讀取規劃中的 NEXT_PUBLIC_SITE_URL |
| `src/app/layout.tsx` | `c97305e70015983ca3e41801b6bcb24ad222ec65` | `zh-TW`、next/font、construction noindex／nofollow |
| `src/app/dev/design-system/page.tsx` | `476b8535744077be67f41ad0df8ef0401b87c915` | production 預設 404、伺服器預覽旗標與 Pages 早期 notFound 保護 |

### 3.2 Documentation Repository 與採用規則

Repository：`xk2022/xplore-kaleidoscope`，Branch：`main`，固定 Commit：`95ef1275a46ace76e11f668178ca881087483398`，僅供讀取。下列均是原始來源，不代表外部服務已開通。

| 路徑 | Git Blob SHA | 狀態與採用／不採用內容 |
| --- | --- | --- |
| `doc/00_initGPT/05_Xplore Kaleidoscope 正式建置技術決策如下.md` | `59f6c1151015bdec746229e78596e2311cdc2f6f` | ASK 支持 Vercel／Next.js 技術方向；ANS 是範本，沒有實際部署或帳戶核准；不採 monorepo／Backend／i18n 擴張 |
| `doc/01_business-plan/week-02/07_domain-hosting_網域、DNS、主機與部署架構規劃.md` | `9c1c5c8177c423bacaa97b5199a22430ddf6bc2c` | 初版規劃；採 Git integration、Preview／Production、Secrets 與 rollback 原則；Project 名稱／root／DNS 只是建議 |
| `doc/01_business-plan/week-02/08_website-architecture_官方網站 Next.js 技術架構設計.md` | `15c1483bf47be33bc29b755a220fb465b5dd8a1a` | 初版規劃；採 Server Components、Metadata、版本相容與 Preview 不索引；保留現有獨立 root `.` |
| `doc/01_business-plan/week-02/09_website-mvp_官方網站 MVP 開發規格.md` | `5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d` | 初版規劃；採實際部署／HTTPS／網站驗收要求，不把完整商業 MVP 或表單視為已完成 |
| `doc/01_business-plan/week-02/01_brand-identity_品牌視覺識別規範.md` | `19378775e986d5c8e002035685668d381532cae4` | 初版規劃；採品牌名稱／網域／標語；不推定最終 Logo、法人或中文名已核准 |

官方平台規格在正式執行時再讀 [Vercel Next.js](https://vercel.com/docs/frameworks/full-stack/nextjs)、[Git deployments](https://vercel.com/docs/deployments/git)、[Environment Variables](https://vercel.com/docs/environment-variables) 與 [Instant Rollback](https://vercel.com/docs/instant-rollback)，記錄查閱日期及實際功能／方案限制。Next.js 版本敏感行為依已安裝版本 `node_modules/next/dist/docs/` 的 Deploying、Environment Variables、basePath 文件確認，不任意套用舊版 CLI／Output API。

優先順序為當次明確使用者指示、已合併架構與確認決策、本規格、經核對業務文件、舊規劃。原始 Vercel 方向、Task 003 後選 Pages、Task 013 未來 Vercel 工作分層處理；本規格不撤銷 Pages 決策。

## 4. Scope & Requirements

1. 盤點現有 Vercel Project／Git integration／部署設定，或在確認 Owner 與授權後建立正確 Project；不重複建立平行專案。
2. 連結 `xk2022/xk-website`，production branch 設為 `main`，以 Git integration 建置受審查版本；Preview 與 Production 的 URL、SHA、Env、狀態分開記錄。
3. 以一般 Next.js preset 建置；驗證安裝、Tailwind／Turbopack、字體下載及既有動態開發路由的相容性。
4. 依第 6 節審查 Environment Variables、部署權限與 Secrets；沒有需求不建立 API Keys。
5. 審查 Build／Deployment Logs，完成實際 Preview 與授權 Production 的 HTTP、內容、導覽、資源、Runtime、Metadata 與無障礙基本回歸。
6. 提供可操作 rollback 計畫與可用前版資訊；沒有授權不以生產切回演練當成必要前置破壞現有服務。

保留 `.github/workflows/ci.yml` 的 Pages 流程、`npm run build:pages`、條件 export 與公開網址；兩個平台可平行存在。關閉 Pages、加全站轉址、移轉正式流量或更改 Custom Domain 均需另一個具體決策，不能藏在 Vercel import 中。

## 5. Information Architecture & UX

本 Task 不新增訪客頁面，Information Architecture 沿用實際已合併路由。部署操作流程為：唯讀盤點 → 可審閱設定與風險／回復計畫 → 已授權設定／Preview → Review → 已授權 Production → 公開 URL QA。

訪客從 Vercel 根路徑 `/` 瀏覽既有頁面，站內 Link／首頁錨點不應帶 `/xk-website`。Pages 仍在其實際 Base Path 下運作。不能因跨平台而更改 Header／Footer 文案、聯絡待確認呈現或公開未實作頁面。

使用實際 Desktop／Mobile 網站檢查，不以 Vercel Dashboard 的 Ready 狀態代替使用者流程。Preview 若受 Deployment Protection 保護，使用被授權的檢視方式驗證；未登入的 401／403 與受測內容結果分開，不能洩露 bypass token 或任意關閉保護。

## 6. Content & Data Specification

### 6.1 Project 設定契約

| 欄位 | 預期設定／證據 |
| --- | --- |
| Owner／Team／Project ID／Name | Pending Confirmation；Owner 在建立／修改前確認，沿用既有正確 Project；不把規劃名當真實 ID |
| Git Repository | `xk2022/xk-website`；確認 App 只取得必要 Repository 權限，不連到文件 Repo |
| Framework Preset | Next.js，使用平台正式支援的現有版本路徑 |
| Root Directory | `.`，不是舊 `frontend/website`／`website/xk-website` |
| Production Branch | `main`；設定前確認連結或 enable auto-deploy 是否會立即部署現有 main |
| Install Command | `npm ci`，使用已提交 lockfile；不以移除 devDependencies 破壞 build tools |
| Build Command | `npm run build`；不是 `npm run build:pages` |
| Output | Next.js preset 預設／自動處理；不指定 `out`、`.next` 靜態目錄或新增 standalone／export |
| Node.js | 現況 `.nvmrc` 24、engines 24.x；正式執行核對 Vercel 當時可選 runtime 與 build logs，不無故改降版本 |
| Preview／Production URL | 從實際 Deployment 取得，不猜測 `*.vercel.app` 名稱；記錄環境、SHA、建立時間與部署 ID |

### 6.2 Env 與 Secrets

目前網站沒有必要自訂環境變數。`siteConfig.url` 是已合併品牌常數；來源規劃的 `NEXT_PUBLIC_SITE_URL`／`NEXT_PUBLIC_API_BASE_URL` 目前不被讀取，不要求建立無效變數或 Backend。

| 變數／資訊 | Vercel 要求 |
| --- | --- |
| `XK_PAGES_EXPORT` | Vercel Preview／Production 均不設為 `1`；避免套入 Pages export |
| `XK_PAGES_BASE_PATH` | 不從 Pages workflow 複製至 Vercel；Vercel 一般模式根路徑無專案前綴 |
| `XK_DESIGN_SYSTEM_PREVIEW` | Production 不啟用；Preview 亦預設不啟用，需要開發驗收須限定已授權範圍並重驗 404 恢復 |
| `NODE_ENV`／平台內建變數 | 由平台依標準管理，不以自訂值繞過 production 保護 |
| `NEXT_PUBLIC_*` | 只放確定需公開且程式有讀取的資訊；build-time 內嵌，修改後須重新建置；不能放 secret |
| Token／API Key／私鑰 | Git integration 不要求在 Repository 放 Vercel Token；若另採 CLI／CI 須有必要性、明確授權及受保護儲存，預設不新增 |

未來確有變數時，報告只列名稱、用途、Production／Preview／Development scope、是否公開、Owner 與更新／重建方式，**不列值**。限制 fork／不可信 PR 取得 Secrets，避免在命令列、log、artifact、截圖、URL query 或 `.env`／`.vercel` 中洩漏；不為示範拉取正式 Secrets 到本機。

### 6.3 Pending Confirmation

| 待確認事項 | 誰／何時確認 | 未確認時處理 |
| --- | --- | --- |
| Account／Team、Project、GitHub App 權限與方案 | 使用者／Vercel Owner，任何外部寫入前 | 完成本機與設定提案，外部階段 PENDING；實際權限阻擋記 BLOCKED |
| 首次 import／連結及可能立即觸發的 Production | Owner／發布負責人，在點擊建立／連結／啟用前 | 不執行；若平台不能先做 Preview 而不發布 main，明列副作用後取得涵蓋該動作的授權 |
| Production 允許內容、保護、發布時間與 rollback 操作者 | 品牌／發布負責人，Production 前 | 只交付已授權階段；不宣稱正式 Vercel 部署完成 |
| 索引開放與正式網域 | 使用者與 Task 010／014 負責人，獨立發布門檻前 | 保留 noindex／nofollow、品牌 Canonical；不動 DNS |

## 7. Design System & Technical Constraints

以實際 manifest／lockfile 為準。研究時 Next.js `16.4.6`、React／React DOM `19.3.1`、TypeScript `5.9.3`、Tailwind／Turbopack integration `4.3.3`、ESLint `9.39.5`、shadcn `4.23.0`，Node `24.x`。這是來源快照，不要求部署時照抄過期或不支援版本；有相容性問題先提供 log 與最小修復提案，不任意升降級或新增依賴。

保留 CSS-first Tokens、九種 Typography、Inter／Noto Sans TC、Logo 原稿與 Provisional 狀態、Server Components 優先及必要 Client Components。Vercel build 需要實際取得 next/font 的建置字體資源；網路失敗要保留真實 FAIL，不換假字體或省略錯誤。

不新增 Spring Boot、Database、Docker、獨立 API Server、Analytics、表單服務或監控訂閱。平台預設 caching 可沿用；若調整 header／cache，須有真實問題與回歸證據，不把靜態 HTML 錯誤長快取或對所有回應加不適合的規則。

## 8. Navigation, SEO & Deployment

- 重新枚舉實際路由；研究時公開頁為 `/`、`/about`、`/services`，其餘以執行時合併狀態為準。未實作路由不能為 Vercel 驗收建立空殼。
- Vercel 一般 build 的站內連結、CSS／JS／字體／icon 從根路徑載入；Pages 使用其獨立 Base Path，不能彼此污染。
- Preview 與 Production 均保留目前 `noindex, nofollow`，直到 Task 010 與使用者另行確認；Production environment 名稱不等於可以開索引。Preview 保護不得只依賴 robots，亦不以 noindex 當存取控制。
- `metadataBase`、Canonical、OG URL 保留品牌正式網址與實際頁面路徑，無 `/xk-website`／Preview host／query／fragment；Task 014 決定 canonical host 更動時再協調，不在本任務臆改。
- 一般 production `/dev/design-system` 預設 HTTP 404，未知路由 HTTP 404；不得以 rewrites 全部送回首頁取得假 200。
- Vercel 使用 Git integration 由原始碼建置。現有 `.next/` 是 CI 診斷 artifact，`out/` 是 Pages artifact，兩者均不是 Vercel `--prebuilt`；本任務不引入另一條未核准的 CLI／Actions 發布管線。
- 原 Pages CI／部署保持運作。PR 須看實際 quality／pages-build／Deploy SKIPPED；合併後 Pages main run 與 Vercel Production 分別核對，不能互相替代。

## 9. File Structure & Change Scope

以下僅為未來正式實作允許的最小範圍，不表示本輪新增這些檔案：

| 類型 | 路徑／位置 | 邊界 |
| --- | --- | --- |
| 必須新增 | `docs/reports/task013-implementation.md` | 本任務獨立報告、設定 inventory、授權／部署／回復證據 |
| 必要補充 | `README.md`、`docs/98_decisions/implementation-notes.md` | 追加實際 Vercel 操作與歷史，不改寫舊結果 |
| 必要截圖／日誌 | 報告採用的真實證據位置 | 產生後再建立連結，遮蔽機密；不提交整包 build output |
| 外部設定 | 經確認的 Vercel Project | 第 6 節審核後的最小設定；不隱藏非 Git 變更 |
| 條件式程式修復 | 僅實際阻擋部署的設定／程式 | 先記錄問題與必要差異，遵循已安裝文件，保留雙模式；不預設新增 `vercel.json` |

不需要 npm 新依賴或 Vercel CLI 作為網站 dependency。不提交 `.next/`、`out/`、`node_modules/`、`.vercel/`、環境檔或 Secrets；不修改文件 Repository、DNS、Pages Source 或 domain。`vercel.json` 只有平台設定確需版本管理時才提最小差異，不為有檔案而加入無效配置。

## 10. Implementation Procedure

1. 核對授權範圍、Repository、最新 main／Base／使用者變更；完整讀來源與實際版本、路由、Env flags、workflow。
2. 唯讀確認被指定 Team／Project／integration 的實況，記錄現值與缺漏；未提供外部存取時不探測管理 session。
3. 整理第 6 節可審閱設定差異、GitHub App 權限、Preview／Production 觸發行為、Pages 共存與 rollback 計畫。首次 import 可能立即發布 main，必須事先列出並由授權涵蓋。
4. 在功能分支執行本機 regression：`npm ci`、`npx tsc --noEmit`、`npm run lint`、一般 `npm run build`；新啟 `npm run start` 實測，停止後再 `npm run build:pages` 與靜態回歸。再次啟一般 server 前重新一般 build，避免 `.next/` 模式混用。
5. 在既有授權涵蓋時進行必要設定／Git 連結與 Preview；若無法避免未授權 Production side effect，先停在具體提案。記錄真實 Project／Deployment／Commit，不盲按預設值。
6. 檢查 Preview logs、Env scope、HTTP／資源／互動／noindex；受保護預覽採已授權存取。修復後對最終版本重驗，本機報告先完成再建立 PR。
7. PR 提供完整 diff、Project 設定差異、Preview URL／SHA、實際測試、限制與 Production／rollback 計畫；確認 PR CI 與 Review，未發生階段保持 PENDING。
8. Production 前核對當次授權、main 精確 SHA、實際品質結果、前版 Ready Deployment、回復操作者及是否可能自動發布。不得在 main 連結後才補想像中的 gate；平台／方案若無所需保護，先保留未啟用狀態並記限制。
9. 經授權的 main 部署／promotion 後，核對 Vercel environment、Deployment ID、Commit、Build／Deployment Logs 與公開 URL；部署 Ready 與公開 smoke 分別記錄。
10. 更新獨立報告實際遠端結果、問題、修復、重驗、回復計畫與待辦；無必要不執行生產 rollback，真的回復亦需授權並再次驗證。正式網域交由 Task 014。

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

### 11.1 本機與既有平台回歸

所有列初始為 PENDING；本機測試用來證明回歸與相容性，**不能替代真正 Vercel 部署、公開 HTTP 或 DNS 驗證**。

| Test ID | 適用性與原因 | 命令／程序與預期證據 | 狀態 |
| --- | --- | --- | --- |
| V13-L01 | Required：既有 locked build | `npm ci`，記 Node／npm／lock 版本與 exit 0，無非預期 lock 變更 | PENDING |
| V13-L02 | Required：型別與品質保護 | `npx tsc --noEmit`、`npm run lint` 各自 exit 0；不得以平台忽略錯誤取代 | PENDING |
| V13-L03 | Required：Vercel 一般模式 | 未啟用 Pages flag 的 `npm run build` exit 0，保存實際路由／Next／Tailwind／字體輸出；`npm run start -- --hostname 127.0.0.1 --port 3030` 新啟 server | PENDING |
| V13-L04 | Required：根路徑與 production 保護 | `curl -sS -D /tmp/xk-v13-headers.txt -o /tmp/xk-v13-home.html http://127.0.0.1:3030/`，逐一 GET 實際公開頁 200、未知及 `/dev/design-system` 404；檢查 HTML／Metadata／資源 | PENDING |
| V13-L05 | Required：保留 Pages | 一般 server 停止後 `npm run build:pages` exit 0；依 Pages 指南掛載實際 Base Path，GET 現有頁、404、`.nojekyll`、assets，無 dev HTML／payload | PENDING |
| V13-L06 | Required：網站使用回歸 | 現有頁於 320／375／768／1440／1920px 無溢出／裁切；真實連結、手機選單／Escape／Focus／Skip Link、reduced motion、Console／Runtime／Network／CSS／JS／字體／icon 正常 | PENDING |
| V13-L07 | Required：基本可及性未退步 | 現有頁與展開手機選單 axe WCAG 2／2.1 A／AA，加鍵盤、名稱、Heading、對比人工檢查；Task 012 已合併時保留其 WCAG 2.2 AA 改善，不宣稱認證 | PENDING |

### 11.2 Vercel 與發布驗收

| Test ID | 適用性與原因 | 命令／程序與預期證據 | 狀態 |
| --- | --- | --- | --- |
| V13-A01 | Required：正確資源與權限 | 指定 Team／Project Dashboard／受支援 API 唯讀 inventory；核對 Repo、production main、root `.`、preset、Node、build/install/default output 與實際現值，去識別機密證據 | PENDING |
| V13-A02 | Required：授權與首次副作用 | 確認 import／link／main autodeploy 的即時效果、操作者權限與授權；沒有授權不觸發；不更改 Pages 發布條件 | PENDING |
| V13-A03 | Required：Env scope／Secrets | 僅列變數名稱／scope／用途，核對 Pages flags 未啟用、Showcase production 關閉、無公開 secret；log／artifact／diff 不含機密 | PENDING |
| V13-P01 | Required：實際 Preview | 取得受測 feature SHA 的 Preview Deployment ID／URL／environment／log，Build／Deployment 完成並對應該 SHA；不能用舊 Preview 或 Pages artifact | PENDING |
| V13-P02 | Required：真正遠端可用 | 對實際 Preview URL，以 `curl -sS -L --max-redirs 5 -D <暫存headers> -o <暫存body> "$xk_preview_url"` 記錄狀態及最終 URL；檢查所有公開路由／assets、預期 404、選單、跨頁／錨點、Console／Network；受保護時記錄授權存取程序，不輸出 bypass secret | PENDING |
| V13-P03 | Required：Preview 索引及內容 | 實際 response／HTML 驗 noindex／nofollow、正確 Canonical／OG／語言與內容；沒有強制指向 Preview host、假表單或新增資料蒐集 | PENDING |
| V13-C01 | Required：本次 Git／CI 邊界 | 本次 PR head quality／pages-build SUCCESS、Pages Deploy SKIPPED；Review 狀態與實測版本一致，真實 run／job 及 Preview 分開列 | PENDING |
| V13-R01 | Required：Production 發布門檻 | 發布前核對第 2／6／10 節：明確授權、受審 main SHA、品質、可回復前版與權限；未授權維持 PENDING，實際受阻記 BLOCKED，不能以 N/A 宣稱整項完成 | PENDING |
| V13-R02 | Required：本任務含正式部署 | 經授權才觸發／promote production；取得真正 Vercel Production ID／URL／SHA／時間、成功 Build／Deployment Logs；另記 main Pages run，不能混為同一次部署 | PENDING |
| V13-R03 | Required：公開 URL 驗收 | 對 Vercel 提供的實際 Production URL 重做 HTTP 200／404、所有真實頁面、CSS／JS／字體／icon、站內導覽／手機／Runtime／Metadata／noindex，保存 headers／body／Browser 證據，不能只看 Ready | PENDING |
| V13-R04 | Required：可回復性 | 記錄前版 Ready ID／SHA／URL、rollback 功能與方案／操作者權限、啟動條件、操作步驟與回復後驗證；初次無前版明列限制及停止／修復方案，不能假造前版 | PENDING |
| V13-O01 | Optional：有必要且另授權才演練生產回復 | 實際 rollback 後查 environment／ID／SHA／URL、HTTP、資源與既有 Pages；未做保留 PENDING 與理由，不冒稱已演練 | PENDING |
| V13-O02 | Optional：深入診斷 | 依實際問題比較冷／暖快取與額外瀏覽器／實體裝置，或記錄 Lighthouse；不能虛構 CWV／分數或取代 Task 011 | PENDING |
| V13-N01 | Not Applicable：本任務不接管 DNS／後端 | DNS records、正式網域 SSL／www redirect 屬 Task 014；API／DB／表單 delivery 未建置，不新增或假驗 | PENDING |

表內 `$xk_preview_url`／`$xk_production_url` 等僅為執行時由真實部署紀錄取得的非機密 URL 變數，先確認值，不把範例直接當服務網址。平台拒絕建置、部署或公開請求時保留錯誤與影響，不能以本機通過改寫遠端結果。

### Test Failure Policy

- `FAIL` 不得標記為 `PASS`，原始失敗與重驗紀錄均須保留。
- 發現問題必須記錄原因、影響範圍及修正方式；可修正的問題應先修正，再重新執行相關測試及必要回歸。
- 無法修正的問題必須列入報告的 Known Issues，註明嚴重程度、交付影響、目前狀態及後續處理方式。
- 存在阻礙交付的 `FAIL` 或必要驗收的 `BLOCKED`，不得宣稱任務完整通過。交付須符合原規格；不適用項目只有在附上理由與依據後才能記為 `N/A`。
- 不得透過跳過測試、降低驗收標準、隱藏錯誤或展示舊成功結果取得 `PASS`。
- 外部服務、權限或環境造成的阻礙，必須記錄實際原因、發生時間、影響測試及解除條件；不得虛構執行結果。

## 12. Test Report & Evidence

未來正式執行必須建立獨立 `docs/reports/task013-implementation.md`，本輪不建立、不填假 PASS、Commit、PR、Deployment ID 或 URL。除共通欄位外，報告須含：

- 實際 Repository／status／Base／feature／受測 tree／SHA、來源版本、路由 inventory、Node／npm／Next／Browser／工具／執行時間。
- Vercel Owner／Team／Project 的必要非機密識別、設定前後差異、GitHub integration 權限、當次授權範圍、首次 import 及 auto-deploy 行為。
- Env 名稱／scope／用途，不含值；建置命令／output、字體與平台相容性、Build／Deployment Logs 的證據位置及錯誤。
- 第 11 節每項的真實命令／程序、適用性、expected／actual、exit、狀態與修復後重驗。五種指定寬度／可及／Console／Runtime／Network／HTTP 結果依本次實際範圍記錄。
- Preview、Production、Pages 各自 SHA／environment／ID／URL／時間／run，公開 URL smoke 與 Ready 分開；不使用歷史結果冒充。
- Production gate、前版及 rollback 計畫、實際是否演練、Known Issues／解除條件、Task 014 交接與剩餘事項。

至少提供本次 Preview Desktop／Mobile 的實際網站截圖及不含機密的設定／成功 log 證據；已授權 Production 後補該環境公開頁截圖或等效可追溯 Browser／HTTP 證據。記錄 URL、SHA、Viewport、PNG 尺寸及人工檢視；圖檔存在才建立連結，不能擷取 Token、Env 值、帳戶私人資訊或保護 bypass URL。

本機相容性與設定提案報告必須在 PR 前完成；尚未授權的外部／Production 階段保持 PENDING，不能為報告完整而提前發布。僅完成準備階段時明稱準備階段交付，不能宣稱 Task 013 全部完成。

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

正式執行從當次最新已合併 `main` 建立 `feature/website-vercel-deployment`；保護使用者工作，採 Conventional Commit，例如 `chore(deploy): configure XK Vercel deployment`。本輪文件分支與未來實作分開，文件交付不等於授權操作 Vercel。

PR 需包含問題與預期環境、真實檔案及外部設定差異、Pages 共存、Preview URL／SHA、Env 名稱與保護（無值）、本機／PR CI／Review 結果、Production gate、rollback、已知限制及未發生階段。只提交必要配置與報告，不直接 push main，不自動 merge，不新增可部署未受審任意分支的管線。

**PR 建立／審核／合併授權與外部 Vercel 設定／自動部署／Production promotion／rollback 授權分開確認。** 已有明確涵蓋相應動作的授權可以沿用，不反覆要求；沒有該範圍授權時交付具體設定與可審閱結果，停止相依的外部寫入。不能把過往文件或 Pages 的 Push and merge 指令推定為未來 Vercel／DNS 授權。

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

| 交付項目 | 預期內容 | 狀態 |
| --- | --- | --- |
| Repository／來源／平台盤點 | 實際版本、現有 Project／integration、權限、缺漏及核准界線 | PENDING |
| 設定與 Env | 正確 Next preset／root／main／Node／npm ci／一般 build／default output；保護 Secrets 與 Pages | PENDING |
| Preview | 本次實際 SHA／ID／URL／logs 與 HTTP／Browser／索引保護結果 | PENDING |
| Production | 經授權且對應 main 的部署證據、成功時間與公開 URL 實測；非品牌網域切換 | PENDING |
| Rollback | 具體可回復版本／限制、權限、程序與驗證；如有演練附真實結果 | PENDING |
| 獨立報告與證據 | `docs/reports/task013-implementation.md`，含當次適用測試、修復重驗、截圖及 Known Issues | PENDING |
| Git／PR／CI／交接 | 真實識別碼、分階段狀態、Task 014 所需的非機密 Project／URL／發布資訊 | PENDING |

## 15. Out of Scope & Future Work

Task 014 的 Domain／DNS／SSL／www 與正式流量切換；Task 010 的索引開放／SEO 全面工程；Task 011 效能專案、Task 012 完整無障礙改善；未實作頁面、Contact API、Database、Backend、Docker、CMS、會員、Analytics、AI SaaS、付費監控與其他雲端資源，不在本任務。

不採用舊規劃的 monorepo、Backend／API Env、Project 建議名或完整 MVP 當成已核准資源；不關閉 Pages、不轉移帳戶或付費方案、不清除正常前版、不繞過 deployment protection／審核。沒有 owner／權限／授權時照第 6 節記 Pending Confirmation，不能宣稱 Vercel 正式部署已完成。

## 16. Final Delivery Checklist

以下是未來 Task 013 的初始驗收清單，本輪規格撰寫不勾選。

執行狀態依第 11 節統一使用 `PENDING`、`PASS`、`FAIL`、`BLOCKED`、`N/A`。僅有證據的 `PASS` 可勾選；其餘保持未勾選，`N/A` 附判定理由且不視為缺少適用驗收。必要項目仍為 `PENDING`、`FAIL` 或 `BLOCKED` 時，不得宣稱完整通過。以下是規格初始清單，本輪文件修訂不代填功能結果。

- [ ] PENDING — Repository／最新 main／來源版本、已合併頁面與使用者工作已確認。
- [ ] PENDING — Vercel Owner／Team／Project／GitHub App 權限、方案及費用限制已確認，沒有誤建平行專案。
- [ ] PENDING — 可審閱設定差異、首次 import／自動發布效果與各階段授權已記錄。
- [ ] PENDING — Next.js preset、root `.`、production `main`、Node、npm ci／一般 build／default output 正確。
- [ ] PENDING — Env scope 正確，未啟用 Pages flags 或公開開發驗收頁，機密未進 Git／logs／artifact／截圖。
- [ ] PENDING — 本次 npm ci、TypeScript、Lint、一般 Build／server 與 Pages Build／靜態回歸完成。
- [ ] PENDING — 實際 Preview 的 SHA／ID／URL／Build／Deployment Logs 與內容驗收完成。
- [ ] PENDING — 所有真實頁、連結、手機選單、五種指定寬度、鍵盤／Focus／axe／Reduced Motion、Runtime／Network／assets／HTTP 正常。
- [ ] PENDING — Canonical／OG／語言及 Preview／Production noindex／nofollow 保留，正式索引另行確認。
- [ ] PENDING — PR CI／Review 與受測版本一致，Production gate、main SHA、發布／rollback 權限與前版已確認。
- [ ] PENDING — 經授權的 Vercel Production 實際成功，部署與公開 URL smoke 分別有證據。
- [ ] PENDING — 可操作 rollback 計畫與限制已交付；未演練如實說明，未擅自切回生產。
- [ ] PENDING — Pages 流程、Base Path、404、`.nojekyll` 與開發路由排除保留，未動 DNS／Domain。
- [ ] PENDING — 獨立報告、真實安全截圖／logs、完整 diff、Commit／PR／CI 及 Task 014 交接完成。
- [ ] PENDING — Test Failure Policy 已遵守，失敗、阻礙與 Known Issues 有完整記錄，沒有阻礙交付的未解決必要驗收。
- [ ] PENDING — 每項測試的 Test ID、預期／實際結果、狀態與可追溯證據已記錄，沒有以預期或舊結果代填。
- [ ] PENDING — 獨立報告已在 PR 建立前完成並納入同一 PR，最後測試、後續重驗與實際提交的程式碼一致。
- [ ] PENDING — 本機、Feature Commit、PR CI、PR Review、合併授權、main CI、部署與公開 URL 驗證分別記錄；未發生階段維持 PENDING 並說明，沒有冒稱已發布。
