# Task 001 — Repository Inspection & Next.js Project Bootstrap

## 1. Task Overview

| 項目              | 規格                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| Task              | 001 — Repository 檢查與 Next.js 專案初始化                                                                          |
| Project / Brand   | Xplore Kaleidoscope / XK                                                                                            |
| Domain            | `https://xplorekaleidoscope.com`                                                                                    |
| Brand Slogan      | Explore Possibilities. Create Digital Value.                                                                        |
| Technical Tagline | Building Digital Solutions with Web, Java & AI.                                                                     |
| 角色              | 資深 Next.js 工程師與軟體架構師                                                                                     |
| 目的              | 建立乾淨、可維護、具正式環境部署條件且沒有 Backend 也能獨立運作的企業網站技術基礎                                   |
| 預期成果          | App Router、Strict TypeScript、Tailwind CSS、shadcn/ui、Lucide、基本首頁及清楚的擴充結構，支援後續 XK Design System |

本規格由可確認的 [英文原稿](https://github.com/xk2022/xk-website/blob/895b9878b6c6244cf225772f6c4f8d3e5d97affe/docs/task/task001-implementation-notes.md) 與 [繁體中文原稿](https://github.com/xk2022/xk-website/blob/895b9878b6c6244cf225772f6c4f8d3e5d97affe/docs/task/task001-implementation-notes.zh-TW.md) 整理。兩份原稿已自最新 main 刪除，可由上述固定版本的歷史快照追溯；`task001-implementation-notes.md` 是任務需求，不能因檔名誤認為實際驗收報告。

本輪只統一文件骨架，**不重新執行 Task 001、不重新初始化網站、不改程式碼或歷史結果**。以下程序、驗收與 Checklist 供正式執行使用，初始狀態均為 PENDING。原 Task 001 實際結果仍以 [歷史實作紀錄](../implementation-notes.md) 為準，不能當作本輪新驗收。

## 2. Repository & Prerequisites

| 項目                     | 規格／時間界線                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------ |
| Website Repository       | `https://github.com/xk2022/xk-website.git`，唯一可修改的網站 Repository              |
| Documentation Repository | `https://github.com/xk2022/xplore-kaleidoscope.git`，僅供讀取                        |
| Base Branch              | `main`；正式執行時重新核對最新已合併版本及實際 Base SHA                              |
| Feature Branch           | `feature/website-bootstrap`                                                          |
| 初次網站 Base SHA        | 歷史紀錄為 `f2b0f6682c517ad83a24b33d158100442c1f657a`；當時只有 README、工作目錄乾淨 |
| 初次文件版本             | `8a0e2a2c4586f4896ab01605504f881f6d54a202`；是歷史讀取版本，不代表往後 latest main   |
| 前置任務                 | 無；必須先完成兩 Repo 與 Week 02 文件檢查                                            |
| 初期部署                 | Vercel 就緒；當時未宣稱 Vercel Project、實際部署、DNS 或正式網域驗證完成             |
| 後續已合併架構           | Task 003 才引入 GitHub Actions → GitHub Pages，保留一般 Next.js／Vercel 相容 build   |

先檢查 Repository、Git status、branch、remote、既有檔案、manifest／lockfile 與使用者工作，不假設規劃目錄已存在。對現有網站執行維護時，保留後續已合併頁面、素材、設定與部署，不倒退成初次空白專案。

前次 16 章骨架重構使用 `docs/task-specifications-standardization` 分支，已合併為歷史成果。本輪在 `docs/task-validation-policy` 進行驗收政策與格式補強，文件交付由主代理依當次使用者明確授權處理；與正式開發分支不同，不代表重做 Task 001 功能或建立新的 Bootstrap 功能 PR。

## 3. Reference Documents

先讀 [AGENTS.md](../../AGENTS.md)、[README.md](../../README.md)、上述兩份 Task 001 原稿及 [歷史實作紀錄](../implementation-notes.md)。已安裝 Next.js 的版本敏感行為查該版本 `node_modules/next/dist/docs/`，不照舊版慣例改設定。

文件標準路徑為 `doc/01_business-plan/week-02/`。初次已找到全部十份文件，短檔名需求對應如下；正式執行須重新核對 Tree、Commit、Blob SHA 與內容。

| 原要求／主題              | 實際檔名（相對 Week 02）                                   |
| ------------------------- | ---------------------------------------------------------- |
| `brand-identity.md`       | `01_brand-identity_品牌視覺識別規範.md`                    |
| Logo guidelines           | `02_logo-guidelines_XK Logo 設計與使用規範.md`             |
| `color-palette.md`        | `03_color-palette_品牌色彩系統規範.md`                     |
| `typography.md`           | `04_typography_品牌字體與排版規範.md`                      |
| `website-sitemap.md`      | `05_website-sitemap_ 官方網站資訊架構與網站地圖.md`        |
| Homepage copywriting      | `06_homepage-copywriting_官方網站首頁文案規劃.md`          |
| Domain / hosting          | `07_domain-hosting_網域、DNS、主機與部署架構規劃.md`       |
| `website-architecture.md` | `08_website-architecture_官方網站 Next.js 技術架構設計.md` |
| `website-mvp.md`          | `09_website-mvp_官方網站 MVP 開發規格.md`                  |
| Week overview             | `README.md`                                                |

初次缺少 `frontend-development-guide.md`，另有規劃但未提供的 `deployment-guide.md`、`website-launch-checklist.md`，以及核准 Logo／分享素材、已驗證聯絡管道與法律／作品內容。不得假裝文件存在、建立假連結或寫入文件 Repo 補資料；以本任務已確認決策執行並回報實際缺漏。

優先順序為使用者當次明確指示、已確認任務決策與已合併網站架構、本規格、經核對的業務文件、舊規劃。舊 monorepo `frontend/website/`、Backend／資料庫／Docker、舊色票、較長服務 URL、完整商業 MVP 不取代本任務的獨立 Repository、八色票、短路由及基礎範圍。重要衝突應在破壞性修改前回報，不覆蓋既有成果。

## 4. Scope & Requirements

- 檢查兩個 Repo 與 Week 02 文件，記錄找到／缺少規格、版本、Git 狀態與衝突。
- 僅在尚無專案的初次情境初始化 Next.js；已有網站時先檢查，不重跑生成器覆蓋。
- 啟用 App Router、TypeScript、Tailwind CSS、`src/`、ESLint、`@/*`；安裝 `lucide-react`，以當時官方建議 CLI 初始化 shadcn/ui。
- 建立基本首頁、共用 Layout／Sections／UI 目錄、品牌色彩基礎、Config／Lib 分層與未來擴充結構。
- Strict TypeScript、明確 Props、可重用元件、語意化 HTML、Accessible Navigation、Responsive、一致命名及可維護性。
- 執行品質與實際瀏覽器驗收，保留真實紀錄並準備審核交付。

保留既有 README，初次已有內容時以附加說明保留原始前綴，不用生成器覆蓋。保留 AGENTS 的 Next.js generated rules block，不刪除使用者變更，不為湊目錄建立無用功能。

不提前開發所有內頁、Backend、資料庫、Docker、獨立 API Server、假表單、假按鈕、假客戶推薦、虛構作品或未經證實統計，不改確認的商業及技術決策。

## 5. Information Architecture & UX

本任務是技術基礎，並非完整行銷頁。基本流程：進入首頁 → 理解 XK 名稱及標語 → 使用真實連結／錨點 → 可用鍵盤到主要內容。清楚的 Header、Main、Footer、Skip Link 是擴充基礎；不以空殼內頁當功能完成。

| 層級         | 職責                                               |
| ------------ | -------------------------------------------------- |
| Root Layout  | HTML 語言、字體、全域 CSS、Metadata 與共用版面     |
| Homepage     | 精簡品牌介紹、真實可用導覽及未來區塊擴充點         |
| Layout       | 可及 Header／Footer、Container 等必要元件          |
| Sections     | 分離頁面區塊，避免全部集中在 Page                  |
| UI           | shadcn/ui 與真正需要的共用元件，不一次生成全部元件 |
| Config / lib | 品牌／路由等靜態設定與工具                         |

支援 Mobile、Tablet、Desktop、Large Desktop。手機內容依序堆疊，文字可換行、按鈕有足夠觸控範圍，不以固定高度裁切標語或 CTA。初期不要求複雜抽屜；有選單時須具真實開關、可及名稱與鍵盤操作。

## 6. Content & Data Specification

品牌資訊以第 1 節為準，主要語言為繁體中文，保留英文品牌標語及技術標語。資料集中於 `src/config/`，型別及 Props 清楚，避免不必要 `any`，不為靜態內容建立 API。

完整保留原稿未來路由庫存，不代表本次全部實作：

```text
/
/about
/services
/services/website-development
/services/java-enterprise
/services/system-integration
/services/ai-solutions
/services/maintenance
/solutions
/portfolio
/contact
/privacy
```

Config 應區分 implemented／planned 或等效狀態，僅將實際存在目的地放入有效導覽或 Sitemap。舊 `/privacy-policy` 與較長服務 URL 不控制本任務。

未確認 Email／LinkedIn、法律文案、公司數據及作品應省略或清楚待確認；規劃範例信箱不等於可用地址。不得以示例冒充客戶、成效、規模或上市產品。Logo 為 Provisional，不宣稱最終核准。

## 7. Design System & Technical Constraints

| 技術            | 約束                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| Next.js / React | App Router，Server Components 優先，互動需要才用 Client                   |
| TypeScript      | Strict、noEmit、清楚型別／Props，`@/*` 對應 `src/*`                       |
| Tailwind CSS    | 按實際安裝主版本慣例，不混用舊設定                                        |
| shadcn/ui       | 官方建議 CLI、CSS Variables、components／utils alias 與正確 Tailwind 整合 |
| Lucide React    | 安裝 `lucide-react`，不替換圖示庫                                         |
| Dependencies    | 穩定相容版本、無不必要依賴、manifest／lockfile 一致                       |
| Components      | kebab-case 檔名、PascalCase 元件、單一職責、語意 HTML、可見 Focus         |

| 品牌 Token        | HEX       |
| ----------------- | --------- |
| Primary           | `#101A33` |
| Secondary         | `#3157D5` |
| Accent            | `#19B8D5` |
| Background        | `#FFFFFF` |
| Surface           | `#F5F7FB` |
| Foreground        | `#172033` |
| Muted（次要文字） | `#667085` |
| Border            | `#E4E8F0` |

集中管理色彩，區分文字 Muted／背景 Surface，整合 shadcn 語意類別，不改回舊文件色票。設計方向為 Geometric Kaleidoscope、XK 字母組合、幾何對稱、現代科技、專業國際與簡潔企業風格。確保文字對比與 Responsive，不提前建完整設計系統或 Dark Mode。

歷史實作選用 Next.js `16.4.6`、React／React DOM `19.3.1`、TypeScript `5.9.3`、Tailwind `4.3.3`、Node `24.x`、Inter／Noto Sans TC，shadcn `4.23.0` Nova／Radix。這是歷史設定，不是重新安裝要求；正式執行須核對實際穩定相容版本。歷史 ESLint 9 與上游 plugins 限制見報告，不強制不相容升級。

不引入 Spring Boot、PostgreSQL、Docker Backend、獨立 API Server 或不必要環境變數，網站必須無 Backend 獨立運作。效能重視簡潔架構、合理字體／資源與少量 Client JS，不預填 Lighthouse 分數。

## 8. Navigation, SEO & Deployment

| 項目              | 規格及適用界線                                                                      |
| ----------------- | ----------------------------------------------------------------------------------- |
| 路由              | 初次只實作 `/`；後續合併路由保留，不刪除或重建                                      |
| Navigation        | 只連存在頁面／錨點，文字與可及名稱一致，planned 目的地不假裝可用                    |
| Metadata          | 品牌名稱、說明、Title template、正確語言；沿用現況 `zh-TW`                          |
| Canonical / OG    | 使用品牌網域、符合實際頁面；無核准分享圖不放假路徑                                  |
| Indexing          | 初始任務未要求公開索引；保留已合併 construction `noindex, nofollow`，正式開放另議   |
| Sitemap / robots  | 初次不要求新增；既存時不收錄未發布 URL，不自行開放索引                              |
| Vercel            | Next.js preset、Root `.`、一般 `npm run build`；就緒不等於已發布                    |
| Pages / Base Path | 初次尚無 script 為 Not Applicable；現有 script 存在則 Required 回歸，不移除後續成果 |
| GitHub Actions    | 初次不要求新增；現有 workflow 及 main-only deploy 條件保留                          |

維護現況時，普通 Next build 保持 Vercel 相容；Pages 才條件式 export、Base Path（現行預設 `/xk-website`）、trailingSlash、靜態圖片設定。不得為重做 Task 001 新增 Pages 或將 export 永久套到一般模式。Pages 的 404、`.nojekyll`、Metadata、資源路徑及 dev 排除在適用時驗證。

沒有授權不得建立外部部署、改 DNS／Custom Domain 或自動合併；不能把「可部署至 Vercel」寫成「已部署成功」。

## 9. File Structure & Change Scope

以下為預計初次結構，不表示本輪完成；先比對現況再新增／修改：

```text
xk-website/
├── README.md
├── AGENTS.md
├── .gitignore
├── .editorconfig
├── docs/
│   └── implementation-notes.md
├── public/
│   ├── images/
│   └── icons/
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── layout/
    │   ├── sections/
    │   └── ui/
    ├── config/
    └── lib/
```

| 預計動作   | 範圍                                                                  | 用途／限制                                                         |
| ---------- | --------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 新增或補齊 | package／lock、TS／Next／ESLint／Tailwind 整合設定、`components.json` | 依版本慣例，不建立不需要的舊設定                                   |
| 新增或補齊 | 上述 app／components／config／lib／public 目錄                        | 清楚分層；空資產目錄可用 marker，不放假素材                        |
| 保留並補充 | README／AGENTS／gitignore／editorconfig／implementation notes         | 保留原文、生成規則及歷史驗收                                       |
| 未來新增   | `docs/bootstrap-implementation.md`                                    | 正式執行後的獨立報告；目前不存在，本輪不建檔或提供假 Markdown 連結 |
| 適用時新增 | 本次真實瀏覽器截圖                                                    | 原稿未指定圖數／檔名，不強制補造歷史圖檔                           |

不可改文件 Repo、覆蓋已合併程式或刪除其他任務頁面。不得提交 `node_modules/`、`.next/`、`out/`、環境檔、Secrets 或暫存測試工具。實際異動以最終 Git diff 為準。

## 10. Implementation Procedure

1. 確認 Repository、status、branch、remote、最新 main 與初始內容，保留未提交工作。
2. 讀第 3 節來源，檢查兩 Repo Tree／版本／缺漏／衝突；先回報破壞性衝突。
3. 正式開發使用 `feature/website-bootstrap`，與本輪文件分支分開。
4. 僅在初次尚無專案時，以穩定相容生成器啟用 App Router／TS／Tailwind／src／ESLint／alias；已存在網站只處理必要缺漏。
5. 安裝必要依賴與 Lucide，以官方建議 CLI 初始化 shadcn；驗 CSS Variables／alias／目錄，不加入無用元件。
6. 建立／完善結構、品牌設定、基本首頁及可及 Layout，保護 README 前綴、AGENTS 生成區塊與既有路由。
7. 原稿要求初次 `npm install` 建立一致 manifest／lockfile；已有有效 lock 後以 `npm ci` 驗可重現安裝，再執行第 11 節品質指令。
8. 驗一般 production server，再視現有腳本驗 Pages；完成連結、HTTP／資源、五種指定寬度、axe、鍵盤與人工檢查。
9. 修正問題，最終變更後重跑指定及受影響驗收，不沿用舊結果。
10. 寫獨立報告，檢查完整 diff、實際檔案、Markdown、版本、產物與 Secrets。
11. 正式開發完成後 Commit／Push Feature Branch，準備審核 PR，查真實 CI 並回報，不自動合併／發布。本輪只做文件重構。

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

本節是正式執行的計畫，不是本輪測試結果，全部 **PENDING**。適用性分 Required／Optional／Not Applicable；條件項需在報告選定並說明，不以未執行冒充 N/A。

| 項目                | 適用性與原因                                                                      | 指令／接受條件                                                       | 結果    |
| ------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------- |
| 初次安裝            | Required：原稿初次要求；已有專案則 Optional，避免無故改 lock                      | `npm install`，記錄真實版本／警告／結果                              | PENDING |
| 可重現安裝          | Required：先建立有效 lock，再驗安裝                                               | `npm ci` exit 0，manifest／lock 一致                                 | PENDING |
| TypeScript          | Required：基礎型別正確                                                            | `npx tsc --noEmit` exit 0，Strict／alias 正確                        | PENDING |
| ESLint              | Required：原稿品質要求                                                            | `npm run lint` exit 0，處理實際錯誤／警告                            | PENDING |
| 一般 Build          | Required：Vercel 相容基礎                                                         | `npm run build` exit 0，不強制 export                                | PENDING |
| Pages Build         | Required：現有 `build:pages` 存在；Not Applicable：初次未建立，本任務不新增 Pages | 適用時 `npm run build:pages` exit 0                                  | PENDING |
| 本機啟動            | Required：Definition of Done                                                      | `npm run dev`，首頁 HTTP 200，記錄環境／port                         | PENDING |
| Production server   | Required：不能只看 build                                                          | fresh `npm run start`，首頁 200、未知路由 404                        | PENDING |
| 功能／內部連結      | Required：無假功能                                                                | Header／Footer／CTA 全部有效連結及錨點可達，planned 不冒作完成       | PENDING |
| 跨頁回歸            | Required：已有後續合併頁；Not Applicable：初次僅首頁，無內頁                      | 保留既存路由、跨頁及舊錨點                                           | PENDING |
| Responsive          | Required：裝置支援                                                                | 320／375／768／1440／1920 px 無 overflow／重疊／裁切，內容可讀       | PENDING |
| axe                 | Required：可及基礎證據                                                            | 主要頁面／互動狀態執行 WCAG 2／2.1 A／AA，記工具／範圍／違規數       | PENDING |
| Keyboard／Focus     | Required：導覽可操作                                                              | Tab／Shift+Tab／Enter、Skip Link、可見 Focus、名稱與標籤一致         | PENDING |
| Reduced Motion      | Required：動態可及                                                                | reduce 下遵守既有減少過渡／動畫規則                                  | PENDING |
| 人工可及檢查        | Required：掃描不足以涵蓋全部                                                      | Heading／Landmarks／Alt／對比／閱讀順序合理                          | PENDING |
| Console／Runtime    | Required：真實網站檢查                                                            | 無非預期 Console、JavaScript、Runtime error                          | PENDING |
| Network／HTTP／資源 | Required：資源可載入                                                              | CSS／JS／字體／圖片／SVG 無失敗請求；預期 404 獨立記錄               | PENDING |
| Metadata            | Required：品牌與建置狀態                                                          | Title／description／canonical／OG／lang／noindex 正確，無假 OG 圖    | PENDING |
| Pages Base Path     | Required：現有 Pages script 存在；Not Applicable：初次未建立                      | 掛載實際 Base Path，連結／資源及實體路徑正確                         | PENDING |
| Pages 靜態輸出      | Required：現有 Pages script 存在；Not Applicable：初次未建立                      | HTML／404／`.nojekyll`／Metadata／資源存在，dev 路由／payload 不公開 | PENDING |
| CI Checks           | Required：有對應 PR workflow；Not Applicable：初次未設定，不新增假 CI             | 查當次 head／run，保留部署條件，不以本機結果代替                     | PENDING |
| 截圖                | Optional：原稿未指定必交圖數／檔名                                                | 可提供真實桌面／手機圖、尺寸／Viewport 及人工檢視；未提供如實說明    | PENDING |
| Lighthouse          | Optional：輔助效能診斷，無固定分數要求                                            | 有執行才報實際環境／分數                                             | PENDING |
| Backend／表單       | Not Applicable：原稿排除 Backend 及假表單                                         | 不新增 API／資料庫／送出功能                                         | PENDING |
| 發布／DNS           | Not Applicable：部署就緒不等於授權發布                                            | 不改網域，不將未部署寫 PASS                                          | PENDING |

一般／Pages build 共用 `.next/` 時，先驗一般 server 並停止，再產生 Pages artifact；不能以 `npm run start` 服務 export。再驗一般模式須先重建。靜態驗收按現有指南掛載 Base Path，檢查 HTTP 與檔案，不只看 href。

### Test Failure Policy

- `FAIL` 不得標記為 `PASS`，原始失敗與重驗紀錄均須保留。
- 發現問題必須記錄原因、影響範圍及修正方式；可修正的問題應先修正，再重新執行相關測試及必要回歸。
- 無法修正的問題必須列入報告的 Known Issues，註明嚴重程度、交付影響、目前狀態及後續處理方式。
- 存在阻礙交付的 `FAIL` 或必要驗收的 `BLOCKED`，不得宣稱任務完整通過。交付須符合原規格；不適用項目只有在附上理由與依據後才能記為 `N/A`。
- 不得透過跳過測試、降低驗收標準、隱藏錯誤或展示舊成功結果取得 `PASS`。
- 外部服務、權限或環境造成的阻礙，必須記錄實際原因、發生時間、影響測試及解除條件；不得虛構執行結果。

## 12. Test Report & Evidence

正式執行後必須產出獨立 `docs/bootstrap-implementation.md`。這是未來報告路徑，目前不存在，本輪不新增也不建立假連結。Task 001 既有結果仍保留在 [歷史實作紀錄](../implementation-notes.md)，不回寫成新驗收。

報告至少包含 Repository／Git 狀態、找到與缺少文件、來源版本／Blob、衝突、真正建立結構、Next.js／React 版本、TS／Tailwind／shadcn 設定、依賴／警告、Base SHA／Branch 與未提交變更。

逐項記錄 Required／Optional／Not Applicable 與原因、實際指令、PENDING／PASS／FAIL／BLOCKED／N/A、Exit Code（非命令填「不適用」並說明原因）、環境／工具／port／Commit、範圍、五種指定寬度、axe 規則／狀態／違規數、Keyboard／Focus／Reduced Motion、Console／Runtime／Network／HTTP、Pages 判定／產物、問題修復與最終重驗。不用預期、推測或前 Task 通過代替。

截圖是 Optional；有提供時須為本次真實頁面，記尺寸／Viewport、人工視覺與實際檔案位置，存在後才加相對連結；不強迫補造歷史暫存畫面。axe 不是完整無障礙認證，需列真正範圍與限制。Commit／PR／CI 及是否部署只填實際紀錄。

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

| 項目   | 正式開發流程                                                                              |
| ------ | ----------------------------------------------------------------------------------------- |
| Base   | 最新已合併 main，記實際 Base SHA；初次 SHA 僅歷史                                         |
| Branch | `feature/website-bootstrap`；已存在先檢查，不重設他人工作                                 |
| Commit | Conventional Commit，例如 `feat: initialize XK website foundation`                        |
| PR     | `main ← feature/website-bootstrap`；工具支援時準備審核 PR，無法建立須記限制及 compare URL |
| CI     | 查當次實際 head／Checks；未設定明記，不虛構成功 run                                       |
| 保護   | 完整 diff、禁止直接 push main、自動 merge 或未授權發布                                    |

本輪文件交付另依最新明確授權由主代理處理，不偽造新 Task 001 結果。未產生的正式功能 Commit／PR／CI 識別碼一律 PENDING。

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

| 交付項目         | 預期內容                                                          | 狀態    |
| ---------------- | ----------------------------------------------------------------- | ------- |
| 技術基礎         | 本機可用、確認堆疊、基本首頁、清楚分層與 Vercel 就緒              | PENDING |
| 真實異動清單     | 新增／修改／保留檔案與完整 diff 範圍                              | PENDING |
| 版本／設定       | Next／React／TS／Tailwind／shadcn／依賴實際資訊                   | PENDING |
| 獨立報告         | 未來 `docs/bootstrap-implementation.md`，含來源／驗收／問題／限制 | PENDING |
| 測試證據         | 適用性、指令、Exit Code、瀏覽器／Pages 結果                       | PENDING |
| 截圖（Optional） | 有提供則含真實圖／尺寸／人工檢視，未提供如實說明                  | PENDING |
| Commit／PR／CI   | 正式開發實際紀錄或限制，不填假 ID                                 | PENDING |
| 最終回報         | 檢查／設定／驗收／交付／剩餘問題及就緒與發布差異                  | PENDING |

## 15. Out of Scope & Future Work

完整 Design System、企業首頁及所有內頁、最終 Logo／OG 核准、法律／作品內容、真實聯絡管道、正式索引與 Vercel／Domain 發布屬後續。初次 Pages 不屬 Task 001，已有成果則保護並回歸。

不做 Spring Boot、PostgreSQL、Docker Backend、API Server、CMS、Analytics、會員、AI Chatbot 或 SaaS；不補造公司／客戶／聯絡／成效。本輪僅文件重構，不安裝依賴、不 Build、不實作或補造歷史結果。

## 16. Final Delivery Checklist

以下供正式執行 Task 001 使用，本輪不勾選。

執行狀態依第 11 節統一使用 `PENDING`、`PASS`、`FAIL`、`BLOCKED`、`N/A`。僅有證據的 `PASS` 可勾選；其餘保持未勾選，`N/A` 附判定理由且不視為缺少適用驗收。必要項目仍為 `PENDING`、`FAIL` 或 `BLOCKED` 時，不得宣稱完整通過。以下是規格初始清單，本輪文件修訂不代填功能結果。

- [ ] PENDING — Repository／工作目錄、原稿及業務文件版本核對，缺漏／衝突已記錄。
- [ ] PENDING — 基礎功能完成，既有成果、README 與 AGENTS 已保護。
- [ ] PENDING — 必要依賴／設定完成，manifest／lock 一致，`npm ci` 通過。
- [ ] PENDING — TypeScript 通過。
- [ ] PENDING — ESLint 通過。
- [ ] PENDING — 一般 Build 通過且 Vercel 相容。
- [ ] PENDING — Pages Build 通過；初次無 script 時記 Not Applicable 及理由。
- [ ] PENDING — 功能、HTTP、所有連結／錨點與適用跨頁回歸完成。
- [ ] PENDING — 五種指定寬度 Responsive 完成。
- [ ] PENDING — axe、Keyboard、Focus、Reduced Motion 與人工可及檢查完成並記限制。
- [ ] PENDING — Browser Console／Runtime／Network／Metadata 與資源驗收完成。
- [ ] PENDING — 適用 Pages Base Path／404／`.nojekyll`／dev 排除完成或 N/A 原因已記。
- [ ] PENDING — 獨立實作／測試報告、修正及最終重驗紀錄完成。
- [ ] PENDING — Optional 截圖已提供並檢視，或未提供原因已說明，無假連結。
- [ ] PENDING — 完整 Git diff／允許範圍／Secrets 與產物檢查完成。
- [ ] PENDING — 正式開發 Commit 完成、實際 SHA 可查。
- [ ] PENDING — 審核 PR 已建立；工具不支援時如實記限制，未直接 push main。
- [ ] PENDING — 真實 CI 確認或未設定 N/A 已說明，未虛構 Run ID。
- [ ] PENDING — 最終交付報告完成，未改文件 Repo／已確認決策、未自動合併或發布。

- [ ] PENDING — Test Failure Policy 已遵守，失敗、阻礙與 Known Issues 有完整記錄，沒有阻礙交付的未解決必要驗收。
- [ ] PENDING — 每項測試的 Test ID、預期／實際結果、狀態與可追溯證據已記錄，沒有以預期或舊結果代填。
- [ ] PENDING — 獨立報告已在 PR 建立前完成並納入同一 PR，最後測試、後續重驗與實際提交的程式碼一致。
- [ ] PENDING — 本機、Feature Commit、PR CI、PR Review、合併授權、main CI、部署與公開 URL 驗證分別記錄；未發生階段維持 PENDING 並說明，沒有冒稱已發布。
