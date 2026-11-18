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

本規格由可確認的[英文原稿](task001-implementation-notes.md)與[繁體中文原稿](task001-implementation-notes.zh-TW.md)整理。兩份替代原文保持原樣；`task001-implementation-notes.md` 是任務需求，不能因檔名誤認為實際驗收報告。

本輪只統一文件骨架，**不重新執行 Task 001、不重新初始化網站、不改程式碼或歷史結果**。以下程序、驗收與 Checklist 供正式執行使用，初始狀態均為 Pending。原 Task 001 實際結果仍以[歷史實作紀錄](../implementation-notes.md)為準，不能當作本輪新驗收。

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

本輪文件分支 `docs/task-specifications-standardization` 與正式開發分支不同；使用者已另授權本輪文件 push／merge，由主代理處理。這不是重做 Task 001 功能或建立新的 Bootstrap 功能 PR。

## 3. Reference Documents

先讀 [AGENTS.md](../../AGENTS.md)、[README.md](../../README.md)、上述兩份 Task 001 原稿及[歷史實作紀錄](../implementation-notes.md)。已安裝 Next.js 的版本敏感行為查該版本 `node_modules/next/dist/docs/`，不照舊版慣例改設定。

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
8. 驗一般 production server，再視現有腳本驗 Pages；完成連結、HTTP／資源、五寬、axe、鍵盤與人工檢查。
9. 修正問題，最終變更後重跑指定及受影響驗收，不沿用舊結果。
10. 寫獨立報告，檢查完整 diff、實際檔案、Markdown、版本、產物與Secrets。
11. 正式開發完成後 Commit／Push Feature Branch，準備審核 PR，查真實 CI 並回報，不自動合併／發布。本輪只做文件重構。

## 11. Testing & Acceptance Criteria

本節是正式執行的計畫，不是本輪測試結果，全部 **Pending**。適用性分 Required／Optional／Not Applicable；條件項需在報告選定並說明，不以未執行冒充 N/A。

| 項目                | 適用性與原因                                                                      | 指令／接受條件                                                     | 結果    |
| ------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------- |
| 初次安裝            | Required：原稿初次要求；已有專案則 Optional，避免無故改 lock                      | `npm install`，記錄真實版本／警告／結果                            | Pending |
| 可重現安裝          | Required：先建立有效 lock，再驗安裝                                               | `npm ci` exit 0，manifest／lock 一致                               | Pending |
| TypeScript          | Required：基礎型別正確                                                            | `npx tsc --noEmit` exit 0，Strict／alias 正確                      | Pending |
| ESLint              | Required：原稿品質要求                                                            | `npm run lint` exit 0，處理實際錯誤／警告                          | Pending |
| 一般 Build          | Required：Vercel 相容基礎                                                         | `npm run build` exit 0，不強制 export                              | Pending |
| Pages Build         | Required：現有 `build:pages` 存在；Not Applicable：初次未建立，本任務不新增 Pages | 適用時 `npm run build:pages` exit 0                                | Pending |
| 本機啟動            | Required：Definition of Done                                                      | `npm run dev`，首頁 HTTP 200，記錄環境／port                       | Pending |
| Production server   | Required：不能只看 build                                                          | fresh `npm run start`，首頁 200、未知路由 404                      | Pending |
| 功能／內部連結      | Required：無假功能                                                                | Header／Footer／CTA 全部有效連結及錨點可達，planned 不冒作完成     | Pending |
| 跨頁回歸            | Required：已有後續合併頁；Not Applicable：初次僅首頁，無內頁                      | 保留既存路由、跨頁及舊錨點                                         | Pending |
| Responsive          | Required：裝置支援                                                                | 320／375／768／1440／1920px 無 overflow／重疊／裁切，內容可讀      | Pending |
| axe                 | Required：可及基礎證據                                                            | 主要頁面／互動狀態執行 WCAG 2／2.1 A／AA，記工具／範圍／違規數     | Pending |
| Keyboard／Focus     | Required：導覽可操作                                                              | Tab／Shift+Tab／Enter、Skip Link、可見 Focus、名稱與標籤一致       | Pending |
| Reduced Motion      | Required：動態可及                                                                | reduce 下遵守既有減少過渡／動畫規則                                | Pending |
| 人工可及檢查        | Required：掃描不足以涵蓋全部                                                      | Heading／Landmarks／Alt／對比／閱讀順序合理                        | Pending |
| Console／Runtime    | Required：真實網站檢查                                                            | 無非預期 Console、JavaScript、Runtime error                        | Pending |
| Network／HTTP／資源 | Required：資源可載入                                                              | CSS／JS／字體／圖片／SVG 無失敗請求；預期404獨立記錄               | Pending |
| Metadata            | Required：品牌與建置狀態                                                          | Title／description／canonical／OG／lang／noindex 正確，無假OG圖    | Pending |
| Pages Base Path     | Required：現有Pages script存在；Not Applicable：初次未建立                        | 掛載實際Base Path，連結／資源及實體路徑正確                        | Pending |
| Pages 靜態輸出      | Required：現有Pages script存在；Not Applicable：初次未建立                        | HTML／404／`.nojekyll`／Metadata／資源存在，dev路由／payload不公開 | Pending |
| CI Checks           | Required：有對應PR workflow；Not Applicable：初次未設定，不新增假CI               | 查當次head／run，保留部署條件，不以本機結果代替                    | Pending |
| 截圖                | Optional：原稿未指定必交圖數／檔名                                                | 可提供真實桌面／手機圖、尺寸／Viewport及人工檢視；未提供如實說明   | Pending |
| Lighthouse          | Optional：輔助效能診斷，無固定分數要求                                            | 有執行才報實際環境／分數                                           | Pending |
| Backend／表單       | Not Applicable：原稿排除Backend及假表單                                           | 不新增API／資料庫／送出功能                                        | Pending |
| 發布／DNS           | Not Applicable：部署就緒不等於授權發布                                            | 不改網域，不將未部署寫Pass                                         | Pending |

一般／Pages build 共用 `.next/` 時，先驗一般 server 並停止，再產生 Pages artifact；不能以 `npm run start` 服務 export。再驗一般模式須先重建。靜態驗收按現有指南掛載Base Path，檢查HTTP與檔案，不只看href。

## 12. Test Report & Evidence

正式執行後必須產出獨立 `docs/bootstrap-implementation.md`。這是未來報告路徑，目前不存在，本輪不新增也不建立假連結。Task001 既有結果仍保留在[歷史實作紀錄](../implementation-notes.md)，不回寫成新驗收。

報告至少包含 Repository／Git狀態、找到與缺少文件、來源版本／Blob、衝突、真正建立結構、Next.js／React版本、TS／Tailwind／shadcn設定、依賴／警告、Base SHA／Branch與未提交變更。

逐項記錄 Required／Optional／Not Applicable 與原因、實際指令、PASS／FAIL／N/A、Exit Code（非命令填N/A原因）、環境／工具／port／Commit、範圍、五寬、axe規則／狀態／違規數、Keyboard／Focus／Reduced Motion、Console／Runtime／Network／HTTP、Pages判定／產物、問題修復與最終重驗。不用預期、推測或前Task通過代替。

截圖是 Optional；有提供時須為本次真實頁面，記尺寸／Viewport、人工視覺與實際檔案位置，存在後才加相對連結；不強迫補造歷史暫存畫面。axe不是完整無障礙認證，需列真正範圍與限制。Commit／PR／CI及是否部署只填實際紀錄。

## 13. Git & Pull Request

| 項目   | 正式開發流程                                                                            |
| ------ | --------------------------------------------------------------------------------------- |
| Base   | 最新已合併main，記實際Base SHA；初次SHA僅歷史                                           |
| Branch | `feature/website-bootstrap`；已存在先檢查，不重設他人工作                               |
| Commit | Conventional Commit，例如 `feat: initialize XK website foundation`                      |
| PR     | `main ← feature/website-bootstrap`；工具支援時準備審核PR，無法建立須記限制及compare URL |
| CI     | 查當次實際head／Checks；未設定明記，不虛構成功run                                       |
| 保護   | 完整diff、禁止直接push main、自動merge或未授權發布                                      |

本輪文件交付另依最新明確授權由主代理處理，不偽造新Task001結果。未產生的正式功能Commit／PR／CI識別碼一律Pending。

## 14. Deliverables

| 交付項目         | 預期內容                                                          | 狀態    |
| ---------------- | ----------------------------------------------------------------- | ------- |
| 技術基礎         | 本機可用、確認堆疊、基本首頁、清楚分層與Vercel就緒                | Pending |
| 真實異動清單     | 新增／修改／保留檔案與完整diff範圍                                | Pending |
| 版本／設定       | Next／React／TS／Tailwind／shadcn／依賴實際資訊                   | Pending |
| 獨立報告         | 未來 `docs/bootstrap-implementation.md`，含來源／驗收／問題／限制 | Pending |
| 測試證據         | 適用性、指令、Exit Code、瀏覽器／Pages結果                        | Pending |
| 截圖（Optional） | 有提供則含真實圖／尺寸／人工檢視，未提供如實說明                  | Pending |
| Commit／PR／CI   | 正式開發實際紀錄或限制，不填假ID                                  | Pending |
| 最終回報         | 檢查／設定／驗收／交付／剩餘問題及就緒與發布差異                  | Pending |

## 15. Out of Scope & Future Work

完整Design System、企業首頁及所有內頁、最終Logo／OG核准、法律／作品內容、真實聯絡管道、正式索引與Vercel／Domain發布屬後續。初次Pages不屬Task001，已有成果則保護並回歸。

不做Spring Boot、PostgreSQL、Docker Backend、API Server、CMS、Analytics、會員、AI Chatbot或SaaS；不補造公司／客戶／聯絡／成效。本輪僅文件重構，不安裝依賴、不Build、不實作或補造歷史結果。

## 16. Final Delivery Checklist

以下供正式執行Task001使用，本輪不勾選。

- [ ] Pending — Repository／工作目錄、原稿及業務文件版本核對，缺漏／衝突已記錄。
- [ ] Pending — 基礎功能完成，既有成果、README與AGENTS已保護。
- [ ] Pending — 必要依賴／設定完成，manifest／lock一致，`npm ci`通過。
- [ ] Pending — TypeScript通過。
- [ ] Pending — ESLint通過。
- [ ] Pending — 一般Build通過且Vercel相容。
- [ ] Pending — Pages Build通過；初次無script時記Not Applicable及理由。
- [ ] Pending — 功能、HTTP、所有連結／錨點與適用跨頁回歸完成。
- [ ] Pending — 五寬Responsive完成。
- [ ] Pending — axe、Keyboard、Focus、Reduced Motion與人工可及檢查完成並記限制。
- [ ] Pending — Browser Console／Runtime／Network／Metadata與資源驗收完成。
- [ ] Pending — 適用Pages Base Path／404／`.nojekyll`／dev排除完成或N/A原因已記。
- [ ] Pending — 獨立實作／測試報告、修正及最終重驗紀錄完成。
- [ ] Pending — Optional截圖已提供並檢視，或未提供原因已說明，無假連結。
- [ ] Pending — 完整Git diff／允許範圍／Secrets與產物檢查完成。
- [ ] Pending — 正式開發Commit完成、實際SHA可查。
- [ ] Pending — 審核PR已建立；工具不支援時如實記限制，未直接push main。
- [ ] Pending — 真實CI確認或未設定N/A已說明，未虛構Run ID。
- [ ] Pending — 最終交付報告完成，未改文件Repo／已確認決策、未自動合併或發布。
