# Task 005 — Services 服務介紹頁實作紀錄

本文件記錄 [Task 005](../task/task005.md) 的服務頁面結構、文案來源、共用元件與驗收範圍。本次品質、一般 Next.js 與 Pages 靜態瀏覽器驗收皆已實際完成，七份指定截圖已產出；以下記錄本次結果，不沿用 Task 001–004。遠端 CI、Commit 與 PR 識別碼以本次 PR Checks、提交紀錄及最終交付報告為準。

## Repository 與前置條件

| 項目 | 本次基準 |
| --- | --- |
| Website Repository | `xk2022/xk-website` |
| Base Branch | `main` |
| Base Commit | `7a8ea793608c7bec8fa212bfee4b2f24b5cf192e`，加入 Task 005 原稿的版本 |
| Feature Branch | `feature/website-services-page` |
| Task 004 前置狀態 | PR #4 已合併，merge commit `57ad0f2` 為基準版本祖先 |
| 既有發布證據 | [main Actions run 44264779442](https://github.com/xk2022/xk-website/actions/runs/44264779442) 的 quality、Pages build、deploy 成功；公開 About HTTP 200 |
| 文件 Repository | `xk2022/xplore-kaleidoscope`，僅供讀取 |
| 最新文件版本 | `95ef1275a46ace76e11f668178ca881087483398` |
| 本次 Commit / PR / CI | 遠端實際 run 見本次 PR Checks 與最終交付報告；Commit／PR 以實際提交紀錄為準；[功能分支比較](https://github.com/xk2022/xk-website/compare/main...feature/website-services-page) |

已閱讀 README、AGENTS、Task 005、[歷史紀錄](implementation-notes.md)、[品牌設計系統](brand-design-system.md)、[首頁實作紀錄](homepage-implementation.md)、[About 實作紀錄](about-implementation.md) 及 [Pages 部署指南](github-pages-deployment.md)。Task 004 的發布只證明本次前置條件成立，不代表新 Services 頁已驗收、合併或發布。

Task 005 原稿多處明確指定 `feature/website-services-page`；結尾另列 `feature/website-task005` 作為「建議分支」。本次採明確要求的前者，不另建立第二條功能分支。

## 文件 Repository 檢查

最新 main 已確認為 `95ef1275a46ace76e11f668178ca881087483398`。相較前次 `3996730176e4ad7237c66f541d61405f2667934e`：

- 27 個 Markdown Blob 更新，新增 6 份 Week 03 文件。
- Week 02 Tree 改為 `aede79d35715e8a3a5b42a6267336e0d159489f0`。各文件主要整理 Markdown 標題、清單、表格及程式碼格式；排除格式、空白與標點後，Week 02 全部正文文字與前版相同，沒有新的品牌、服務或聯絡管道核准。
- Logo 素材 Tree 仍為 `534d37ee3dd83888342839b260a41913feb84951`，原始 assets 未更新。
- 重新讀取全部 37 份 Markdown，沒有發現已確認可公開的正式 Email 或特定 LinkedIn 公司／品牌頁。

文件只透過連接工具讀取，沒有 clone 或寫入文件 Repository。

### 服務與品牌主要來源

下列相對路徑均位於文件 Repository 的 `doc/01_business-plan/`：

| 文件 | Git Blob SHA | 本次用途 |
| --- | --- | --- |
| `week-01/02_service-catalog.md` | `cc1c2bacbc1f5367667005a9d4a3b288fc8cfd0c` | Web、Java、整合、AI 服務與交付範圍；此檔未變 |
| `week-01/02_服務項目.md` | `ff5ea5a95a88388be1a4f4963f442b716775c225` | 繁體中文服務描述、適合客戶與維護範圍 |
| `week-02/01_brand-identity_品牌視覺識別規範.md` | `19378775e986d5c8e002035685668d381532cae4` | 品牌定位、專業與幾何視覺原則 |
| `week-02/03_color-palette_品牌色彩系統規範.md` | `98baa236493f25351c6b991cb9dd1cecf672dc39` | 語意色彩與對比原則；實際色值沿用已合併 Design System |
| `week-02/05_website-sitemap_ 官方網站資訊架構與網站地圖.md` | `1f1b4584bbe06f0079542eedffa52215024da0f7` | 服務資訊與有效導覽原則 |
| `week-02/06_homepage-copywriting_官方網站首頁文案規劃.md` | `4f7173ae5ace721b9487df5500ff008e537c183d` | 服務價值與能力描述，避免成果誇大 |
| `week-02/08_website-architecture_官方網站 Next.js 技術架構設計.md` | `15c1483bf47be33bc29b755a220fb465b5dd8a1a` | 內容集中、Server Components、Metadata 與共用元件分工 |
| `week-02/09_website-mvp_官方網站 MVP 開發規格.md` | `5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d` | 服務範圍與未完成產品不可宣稱商用的原則 |

### 新增或擴充的原始資料

`doc/00_initGPT/05_Xplore Kaleidoscope 正式建置技術決策如下.md` 從 314 bytes 擴充為 41,795 bytes，SHA 為 `59f6c1151015bdec746229e78596e2311cdc2f6f`。新段落是 ASK／ANS 形式的舊平台建置建議，包含 monorepo、Next-intl、Java Backend、另一組 Logo／色票、建議中文品牌名「探索萬象科技」與範例 `hello@…` 連結。這些範例不取代已確認網站決策，也不構成品牌名稱、信箱已啟用或程式碼已部署的證據。

新增 Week 03 文件位於 `doc/01_business-plan/week-03/`：

| 文件 | Git Blob SHA |
| --- | --- |
| `01_portfolio-strategy_XK 技術作品展示策略.md` | `88103f938cfb421878de414194db4b981ec5c024` |
| `02_case-01-corporate-website.md` | `c9b151d01a7616abb939dd9747d704428d0bdd8c` |
| `03_case-02-java-enterprise-system.md` | `4b338c79ac83db44307832754404a28496303189` |
| `04_case-03-api-integration-platform.md` | `be1dbacf99ac76d5032ca6cecf221a9a000ff89b` |
| `05_portfolio-content.md` | `e9aae178cdcef6afca313fde3cd501bd533ee028` |
| `README.md` | `aaf4dae6b3e80f485fd9a98dd76637a10dc9e561` |

這些內容提供模擬企業網站、Java 管理系統、API 整合平台的規劃方向，明確要求區分 Demonstration Project、Planned／In Development 與真實客戶成果。服務組合可借用一般使用情境，但本任務不建立 Portfolio，不宣稱這些系統已完成、商用或由客戶委託。

## 規格差異與內容界線

本次優先採 Task 005 明確要求與已合併的網站架構。舊文件的五／六類服務、價格、長版服務路由、完整 MVP、Backend、monorepo 或 Vercel 設定不推翻目前規格。

Services 本次採五類：Website、Java、System Integration & Database、AI & Automation、Cloud & Infrastructure。既有首頁第五項為 Maintenance，仍保留其原文、服務 Card 與錨點；不為了新頁分類而覆蓋已完成首頁。Java 的系統維護、Cloud 的部署維護仍可描述為本次服務範圍，但不新增未確認的 24/7、SLA 或企業級保證。

價格表與訂閱方案在來源中屬 indicative、suggested 或待驗證資料，本次不公開報價、時程或通用付款承諾。各專案的範圍、工期、報價與交付條件應獨立確認。

AI 內容只描述應用與整合方向，不宣稱已有正式商用 AI SaaS、平台或已驗證企業導入成果。服務組合明確標示為示例，不描述成已完成客戶案例。Java、Python、資料庫與 Docker 等是服務技術範圍，不表示網站本身新增這些 Runtime 或 Backend。

`verifiedContactChannels` 維持既有未確認狀態。`contact@…`、`hello@…` 及通用 LinkedIn 首頁都是規劃或範例，不能直接變成對外聯絡連結；CTA 使用實際存在的 `/#contact`、`/about` 或首頁。

## 頁面結構與元件分工

路由為 `src/app/services/page.tsx`。Page 負責 Metadata 與區塊組合，內容集中於 `src/config/services.ts`。本次實作依十個區塊分工：

| 順序 | 區塊／元件 | 內容 |
| --- | --- | --- |
| 1 | `ServicesHero` | 中文 H1「我們提供的數位技術服務」、Our Services、品牌定位、技術標語與真實 CTA |
| 2 | `ServicesOverview` | 五類服務概覽，連至各項實際內容區塊 |
| 3 | `ServiceWebsite` | 企業網站、RWD、React／Next.js、TypeScript、SEO、效能及可及性 |
| 4 | `ServiceJava` | Java、Spring Boot、REST API、商業邏輯、維護與擴充 |
| 5 | `ServiceIntegration` | 系統串接、資料庫整合、資料交換、現代化與跨系統流程 |
| 6 | `ServiceAI` | AI、LLM、Python／Spring AI、資訊處理與自動化方向 |
| 7 | `ServiceCloud` | 容器、部署、GitHub Actions／CI/CD、雲端與維護範圍 |
| 8 | `ServicesIntegration` | 五種常見需求的服務組合，標示「服務組合示例」 |
| 9 | `ServicesProcess` | Discovery、Planning、Development、Testing & Delivery、Continuous Improvement |
| 10 | `ServicesCta` | 討論需求、聯絡資訊、About 與首頁的實際導覽 |

五項服務明細使用共享呈現元件，從同一個 Category 資料取得服務名稱、簡介、項目、技術、適用情境與圖示；薄包裝元件負責指定資料與區塊位置。避免五份樣式或文案逐一複製。`ServiceDetailProps` 接受 `ServiceCategory` 與 `default`／`surface` 背景；五個包裝元件對應五類資料。服務 Section ID 直接使用各 Category ID，組合區塊使用 `service-combinations`。實際檔案分工列於下方，提交範圍以本次 PR diff 為準。

### 型別與內容設定

`src/config/services.ts` 使用明確的 `ServiceId`、`ServiceCategory`、`ServiceTechnology`、`ServiceProcessStep` 與 `ServiceSolutionExample` 型別。服務資料以 `satisfies readonly …[]` 檢查，保留編輯時的型別約束。

設定包括 Hero、概覽、各類服務、技術清單、適合情境、五項服務組合、五階段流程與 CTA。區塊元件只負責視覺與語意，不在各檔案重寫技術清單。既有首頁內容與服務頁設定分開，保留兩個任務不同的分類目的。

## Design System、導覽與 SEO

沿用 Next.js、React、Strict TypeScript、Tailwind CSS 4、shadcn/ui 與 Lucide。重用既有 Section、Container、Card、Button、SectionHeading、BrandPattern、XkLogo、語意色彩與 Typography Utilities。新內容以 Server Components 呈現，不新增 npm Dependencies 或 Client Components。

八個品牌色彩、字體、間距、圓角、陰影、Focus 與 Reduced Motion 保留原設定；`--muted` 是文字灰色，`bg-muted` 對應 Surface。Logo 保留原始 Path、Transform、原稿色彩與 Provisional 狀態，不重新繪製。

共用導覽的「服務項目」改為 `/services`，`plannedRoutes` 改為 implemented，Header／Footer／MobileNavigation 共用同一設定。首頁已新增「了解完整服務」連結至 `/services`，原 `/#services`、`/#service-{anchor}` 與 R05 Maintenance 保持可用；未實作的 `/services/*` 明細頁不公開為假連結。

| Metadata | 本次設定 |
| --- | --- |
| Title | `服務項目 \| Xplore Kaleidoscope` |
| Description | `探索 Xplore Kaleidoscope 的網站開發、Java 企業系統、系統整合、AI 應用與雲端技術服務，打造符合企業需求的數位解決方案。` |
| Canonical / Open Graph URL | `https://xplorekaleidoscope.com/services` |
| Language | 既有 HTML `zh-TW`，Open Graph `zh_TW` |
| Indexing | 保留 `noindex, nofollow` |
| Image / Structured Data | 不建立未核准 OG 圖片、評分、客戶評價或成果資料 |

頁面需具單一 H1、清楚 H2／H3 階層、語意化 Section 與有序流程。裝飾圖示使用 `aria-hidden`；真實導覽使用 Next.js Link，沿用既有鍵盤與焦點行為。

## GitHub Pages 與操作指令

保留一般 `npm run build`，另以 `npm run build:pages` 匯出 `out/services/index.html`。Pages 預設 Base Path 為 `/xk-website`，需實測 `/xk-website/services/`、首頁與 About 的往返連結、CSS／JS／字體／圖示，以及真實首頁錨點。

Validator 僅擴充 `scripts/build-github-pages.mjs`，已加入 Services 的輸出、Canonical、Open Graph URL 與 noindex／nofollow，並保留首頁、About、404、`.nojekyll` 與開發頁排除檢查。現有 Actions workflow、Pages Source、DNS、Custom Domain 與部署條件不變。

本機開發：

```sh
npm ci
npm run dev
```

開啟 `http://localhost:3000/services`；同時回歸 `/` 與 `/about`。最終品質指令：

```sh
npx tsc --noEmit
npm run lint
npm run build
npm run build:pages
```

Pages 產物須以靜態伺服器掛載 `/xk-website` 路徑，不以 `npm run start` 當作靜態預覽。一般 production server 需使用一般 Build；具體預覽方式沿用 [Pages 部署指南](github-pages-deployment.md)。

## 檔案範圍

本次程式碼與七份截圖皆已完成；以下列示實際檔案分工，最終提交清單以本次 PR diff 為準：

| 狀態 | 檔案／範圍 | 用途 |
| --- | --- | --- |
| 新增 | `src/app/services/page.tsx` | Services 路由、Metadata 與十個區塊組合 |
| 新增 | `src/config/services.ts` | 明確型別與集中內容 |
| 新增 | `src/components/sections/services/services-hero.tsx` | Hero |
| 新增 | `src/components/sections/services/services-overview.tsx` | 五類服務概覽 |
| 新增 | `src/components/sections/services/service-website.tsx` | Website 資料包裝 |
| 新增 | `src/components/sections/services/service-java.tsx` | Java 資料包裝 |
| 新增 | `src/components/sections/services/service-integration.tsx` | 系統整合資料包裝 |
| 新增 | `src/components/sections/services/service-ai.tsx` | AI 資料包裝 |
| 新增 | `src/components/sections/services/service-cloud.tsx` | Cloud 資料包裝 |
| 新增 | `src/components/sections/services/service-detail.tsx` | ServiceDetail 共用呈現元件，統一服務、項目與技術版面 |
| 新增 | `src/components/sections/services/services-integration.tsx` | 服務組合示例 |
| 新增 | `src/components/sections/services/services-process.tsx` | 五階段合作方式 |
| 新增 | `src/components/sections/services/services-cta.tsx` | 有效 CTA |
| 新增 | `docs/services-implementation.md` | 本次紀錄 |
| 新增 | `docs/screenshots/task005-services-*.png` | 七份實際網站截圖，尺寸與連結如下 |
| 修改 | `src/config/navigation.ts` | Services 正式路由與 plannedRoutes 狀態 |
| 修改 | `src/components/sections/home-services.tsx` | 保留首頁錨點並提供總覽入口 |
| 修改 | `scripts/build-github-pages.mjs` | Services 靜態輸出與 Metadata 驗證 |
| 修改 | `README.md`、`AGENTS.md` | 任務、分支、操作與驗收指引 |
| 追加 | `docs/98_decisions/implementation-notes.md` | 保留既有前綴，追加 Task 005 歷史 |

任務原稿、文件 Repository、Dependencies、lockfile、全域 Design System、字體、Logo 來源與 workflow 不在本次變更範圍。`.next/`、`out/` 與暫存驗收工具不得提交。

## 驗收紀錄

以下皆為本次 Fresh 驗收，不沿用 Task 001–004。320px 人工檢查發現 Hero 固定 `aspect-square` 配合 `overflow-hidden` 裁切標語，改成 `sm:aspect-square` 後，手機依內容決定高度、較大螢幕保留方形比例。修正後已重新完成五個品質指令與整套靜態瀏覽器 QA。

| 項目 | Task 005 實際結果 |
| --- | --- |
| `npm ci` | 修正後重新執行通過，exit 0；既有套件版本不變 |
| `npx tsc --noEmit` | 修正後通過，exit 0 |
| `npm run lint` | 修正後通過，exit 0，零警告 |
| `npm run build` | 修正後通過，exit 0 |
| `npm run build:pages` | 修正後通過，exit 0 |
| 一般 Next.js Services／About／首頁 | 本次實測均 HTTP 200；Title 正確，分別有 10／9／7 個內容 Section，共用導覽指向 `/services` |
| 一般 Next.js 開發頁／未知路由 | 本次實測預設開發頁 HTTP 404、未知路由 HTTP 404；明確預覽旗標下開發頁 HTTP 200 |
| 開發按鈕 Disabled／鍵盤／Focus | 本次實測原生 disabled、opacity 0.5、DOM click 不增計數；Tab 略過停用按鈕，Primary Enter 計數為 1、Reset 為 0，Focus 可見 |
| 一般 Next.js Console／Runtime | 本次實測零 Console 或 JavaScript Runtime Error |
| Pages 自動產物 Validator | 通過；Services／About 品牌 Canonical 與 Open Graph URL、正常結尾斜線、noindex／nofollow、Base Path、index／404、`.nojekyll` 與開發頁排除均正常 |
| 靜態 HTTP／首頁與 About 回歸 | Services／首頁／About 均 HTTP 200，三頁回歸通過 |
| 十個區塊／五類服務／五組合／五階段流程 | 全部通過，完整技術清單符合集中設定 |
| 五種寬度 | 320／375／768／1440／1920px × 三頁，共 15 個 Responsive Case 全通過，無水平溢出 |
| axe WCAG 2／2.1 A／AA | 共 18 次掃描，包含三個手機選單展開狀態，零檢出違規 |
| 站內連結與錨點 | 21 個不重複目標的 HTTP、錨點、Base Path 均通過，並實際點擊跨頁導覽 |
| 鍵盤、Focus、Reduced Motion | Skip Link Enter、CTA 可見 Focus、減少動態偏好下過渡 0s 均通過 |
| MobileNavigation | Escape 關閉並還原焦點、連結點擊關閉、外部點擊關閉與桌面斷點重設均通過 |
| 額外觸控裝置檢查 | 375px、isMobile、hasTouch、2x 裝置模式通過 Services↔About 選單點擊、概覽錨點、無溢出，Console／Runtime 無錯誤 |
| 靜態資源與錯誤檢查 | 23 個 CSS／JS／字體／圖示資源全 HTTP 200，無非預期 Console、Runtime 或 Network Error |
| Metadata | Title、Description、Canonical、Open Graph、zh_TW、noindex／nofollow 正確；未虛構 OG Image 或 Schema |
| 獨立原始碼 Review | 未發現阻礙交付的問題 |
| 截圖與人工視覺 | 通過；七份指定 PNG 已產出。320／375px Hero 標語完整、Logo 192 × 192、CTA 不重疊；375px 概覽五卡與垂直流程正常；Integration＋AI 內容清楚、間距一致、標籤無溢出；1440px Hero、Website、組合、流程及 Integration＋AI 均經實際檢視正常 |
| 遠端 CI | 本次 PR Checks 與最終交付報告記錄遠端實際 run，不預填未執行結果或識別碼 |
| Commit / PR | 以實際提交紀錄與最終交付報告為準；[功能分支比較](https://github.com/xk2022/xk-website/compare/main...feature/website-services-page) |
| 發布範圍 | 不自動合併或發布 main，不以既有 About 部署當作 Services 上線證據 |

靜態驗收使用 Pages 產物掛載於 `/xk-website/`，完整 Suite 結果為 PASS。暫存驗收工具與結果保留在應用套件以外，沒有為測試新增 npm Dependencies 或把 build 輸出提交。

axe 結果僅涵蓋上述三個頁面、五種 Viewport、三個展開的手機選單狀態及工具可判定的 WCAG 2／2.1 A／AA 規則。另有鍵盤、Focus、Reduced Motion、觸控與人工視覺檢查；這些結果不等同完整螢幕閱讀器或所有輔助科技相容性認證。

## 實際截圖

七份影像皆由本次實際執行的靜態網站產出，非示意圖。AI 圖檔同時包含 Integration 與 AI 區塊：

| 內容 | 實際圖檔 | PNG 尺寸 |
| --- | --- | --- |
| 桌面完整頁面 | [task005-services-desktop.png](../screenshots/task005-services-desktop.png) | 1440 × 7250 |
| 手機完整頁面 | [task005-services-mobile.png](../screenshots/task005-services-mobile.png) | 375 × 13585 |
| Website Development | [task005-services-website.png](../screenshots/task005-services-website.png) | 1440 × 658 |
| Java Development | [task005-services-java.png](../screenshots/task005-services-java.png) | 1440 × 614 |
| Integration 與 AI | [task005-services-ai.png](../screenshots/task005-services-ai.png) | 1440 × 1177 |
| 合作流程 | [task005-services-process.png](../screenshots/task005-services-process.png) | 1440 × 595 |
| 頁尾 | [task005-services-footer.png](../screenshots/task005-services-footer.png) | 1440 × 541 |

上述尺寸已讀取實際 PNG header 核對，並由主代理獨立核對。已實際檢視修正後 320／375px Hero、375px 概覽與流程、指定 Integration＋AI 圖，以及 1440px Hero、Website、組合與流程，檢查內容完整、Logo 比例、CTA、間距與標籤溢出皆通過；不以產出截圖本身代替人工檢視。

## 後續與交付

正式聯絡管道、最終 Logo 核准、OG Image、服務明細頁、Solutions、Portfolio、Contact、Privacy、正式網域與開放搜尋索引仍依後續任務執行。本次不提供未確認的報價、固定時程或 SLA，也不引入 Backend。

以 `main` 為 Base、`feature/website-services-page` 為 Compare 交付 PR；本次品質、響應式、Accessibility 與截圖已記錄，遠端 Actions 結果與真實 Commit／PR 識別碼見本次 PR Checks、提交紀錄與最終交付報告。建議 Commit 為 `feat(services): implement XK services page`。不直接修改 main、不自動合併、不發布未審核功能分支。
