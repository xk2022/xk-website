# xk-website

網站：[https://www.xplorekaleidoscope.com/](https://www.xplorekaleidoscope.com/)

官方網站，獨立交給 Codex 開發。

開發里程碑與完整規格請見 [Task 001–014 任務索引](docs/task/README.md)。Task 001–008 的技術基礎、Design System、首頁、About、Services、Solutions、Portfolio 與 Contact 已合併。Task 009 提供 Privacy 草案與發布保護；Task 010 提供 SEO 保護模式；Task 011 提供受控效能量測與字體 CSS 最佳化。正式法律政策、索引 release、GSC、field CWV、Accessibility、Vercel 與 Domain 仍依各自前置及獨立驗收，不因技術區塊存在而視為完成。

開發協作與驗收請先讀 [Subagent 作業紀錄與執行流程](docs/subagent-workflow.md)，並依 [AGENTS.md](AGENTS.md) 與當次 Task 規格執行。流程包含分工責任、提早檢查完整 Diff、持久化退出碼及依變更影響決定重驗範圍。

## XK Design Collection（架構審閱中）

DC-001 規劃 Modern／Heritage／Luxury 三套獨立呈現，共用品牌、服務、作品與試算核心。Modern 的原 16 個公開頁面保留；新系列的路由、版型與 tokens 尚未實作。本輪只交付架構及設計文件，不改正式首頁、不部署、不變更 DNS。

請從 [DC-001 任務](docs/task/dc001.md) 閱讀 [架構](docs/design-collection/architecture.md)、[三套 Design System 提案](docs/design-collection/design-systems.md)、[DC-001～DC-007 工作包](docs/design-collection/work-packages.md) 與 [文件驗證紀錄](docs/reports/dc001-architecture.md)。新系列的完整頁面範圍、色彩／版型及品牌適用界線等待 PR 審閱，不能把規格視為已上線功能。

## 作品展示

[作品展示頁](https://www.xplorekaleidoscope.com/portfolio/) 收錄品牌網站展示、第三方模板範例及獨立的技術規劃。資料集中於 `src/config/website-showcases.ts`，預覽圖為來源網站的實際首屏；新增作品時應同步確認來源、展示性質、素材與外部連結。實作與驗收見 [網站展示整合報告](docs/reports/website-showcases-implementation.md)。

品牌展示維持三月手工湯包、宏家燕窩、御品園港式燒臘、XK 一頁式網站建置、宏能興業及千剛實業順序，六案皆有站內介紹。模板與技術規劃可展開瀏覽；素材待整理的模板僅供參考，保留來源署名。本輪狀態見 [BF-009～BF-016 報告](docs/reports/bf009-016-implementation.md)，原排序紀錄保留於 [歷史報告](docs/reports/brand-showcase-order-implementation.md)。

## 持續驗證與正式發布

日常網站 smoke 使用方式見 [驗證指南](docs/website-smoke.md)；正式聯絡、索引、政策與網址的資料缺口見 [正式發布前置清單](docs/publication-readiness.md)。BF-009～BF-016 的實作與限制見 [本輪報告](docs/reports/bf009-016-implementation.md)。

首頁與方案詢價入口使用品牌負責人提供的 `system.xk2022@gmail.com`，開啟郵件程式並帶入需求範本，由訪客自行確認寄出。Home／Services 提供三個方案方向與個別報價評估；展示案例連到已驗證的各案子網域。現況見 [Email、方案與展示連結報告](docs/reports/contact-plans-usecase.md)，人工回覆安排見 [聯絡與回覆流程](docs/contact-response-workflow.md)；未提供管道時的歷史驗收保留於 [前輪報告](docs/reports/homepage-inquiry-cta.md)。

## Contact 需求整理表單

本輪新增 `/contact#contact-form`：稱呼（選填）、回覆 Email（必填）、服務方向（選填）與需求摘要（必填）。填寫後先預覽，再複製完整內容或開啟寄給 `system.xk2022@gmail.com` 的郵件草稿，由訪客自行寄出。信箱另提供複製按鈕；未設定郵件程式或內容較長時仍可手動寄信。

目前沒有外部收件端點，**表單不是站內直接送出服務**。輸入只保留在本頁記憶體，不自動寄送或寫入持久儲存；沒有 JavaScript 時提供 Email 替代入口。第三方服務、資料告知與真實受控收件驗收尚待確認，不新增 Backend、API、依賴或公開草案 Privacy。實際結果與待辦見 [Contact 表單實作報告](docs/reports/contact-inquiry-form.md)；下方原始 Task 段落保留各里程碑的歷史狀態。

## 方案試算（分支審閱中）

`feature/quotation-estimator` 新增 `/quotation`，以 XK SYSTEM 方案試算整理服務方向、建置種類、附加項目與需求複雜度，分開呈現一次性費用、年度項目及第三方另計。可複製摘要、開啟郵件草稿，並使用 A4 預覽列印或另存 PDF；這些操作不代表已寄出需求、成立訂單或取得正式報價。

本機執行 `npm run dev` 後開啟 <http://localhost:3000/quotation>。方案計算與保存的定向測試入口為 `npm run test:quotation`；完整品質指令、一般 production 與 Pages 預覽順序依 [本輪規格](docs/task/quotation-estimator-v1.md) 執行。測試入口存在不代表已完成驗收，實際命令、結果與限制由 [試算實作報告](docs/reports/quotation-estimator-v1.md) 記錄。

價格集中於 `src/config/quotation.ts`，公司建議、本輪暫定及待評估項目分開標示，均待 Owner 審閱。未知價格不當作免費，起價不補上限，年度維護不由月費換算，複雜度不套倍率。保存方案時只將選項 ID 寫入 `xk:quotation:v1`；客戶稱呼與專案名稱只留在本頁記憶體。此功能以 Draft PR 等待人工驗收，尚未發布；既有正式服務價格及全站色票不因試算頁改動。

## 部署方向

使用者於 Task 003 選擇 **GitHub Actions → GitHub Pages 靜態網站**。正式模式仍保留一般 Next.js 建置，Vercel 相容設定使用 Next.js preset、Repository 根目錄 `.`、production branch `main`；實際連結及發布狀態以 Task 013 報告與當次部署證據為準，不需要在 Repository 新增 Vercel Secrets。

Pages 建置使用 `npm run build:pages`，輸出 `out/`，使用自訂網域根路徑（`basePath: ""`、`assetPrefix: ""`）。Pull Request 執行品質檢查與靜態建置，只有 `main` 推送或手動選擇 `main` 時才進入部署工作，不會自動合併 PR。目前設定與操作見 [自訂網域部署指南](docs/custom-domain-deployment.md)，原 project-path 結果保留於 [歷史部署報告](docs/reports/github-pages-deployment.md)。不變更 DNS 或品牌正式網域設定。

## 本機開發與 Task 002 驗收

使用 Node.js 24.x 與 npm，從 Repository 根目錄執行：

```sh
npm install
npm run dev
```

首頁：<http://localhost:3000>。設計系統驗收頁：<http://localhost:3000/dev/design-system>。一般本機開發不需要環境變數或 Backend。

```sh
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

正式模式的設計系統驗收頁預設回傳 404；只有明確檢查 production build 時，才以伺服器端旗標啟用：

```sh
XK_DESIGN_SYSTEM_PREVIEW=1 npm run start
```

此頁僅供開發驗收，未列入正式導覽，並設為 `noindex, nofollow`。Task 002 僅建立品牌設計系統，沿用已提供的暫定 Logo，沒有提前開發完整首頁或 Backend。

規格：[Task 001](docs/task/task001.md)、[Task 002](docs/task/task002.md)。使用方式與設計決策：[品牌設計系統](docs/reports/brand-design-system.md)；歷史紀錄：[implementation notes](docs/implementation-notes.md)。

## Task 003 企業首頁

首頁現在由 Hero、品牌介紹、五項服務、技術能力、Why XK、解決方案與聯絡區塊組成，搭配桌面／手機導覽及 Footer。現階段導覽使用實際首頁錨點，尚未建立的內頁不提供失效連結。沒有已確認可公開的 Email 或 LinkedIn 時，聯絡區塊會顯示待確認資訊，不建立假表單或無效信箱連結。

一般開發仍使用上方 `npm run dev`；一般 production build 使用 `npm run build` 與 `npm run start`。Pages 額外建置：

```sh
npm run build:pages
```

`out/` 是靜態 artifact，不能以 `npm run start` 當作 Pages 伺服器。靜態匯出排除 `/dev/design-system`，並保留建置階段的 `noindex, nofollow`；正式開放索引是後續獨立決策。

本次規格：[Task 003](docs/task/task003.md)。實作、檔案異動與驗收紀錄：[首頁實作指南](docs/reports/homepage-implementation.md)。Actions、Pages 來源設定與本機靜態預覽：[部署指南](docs/reports/github-pages-deployment.md)。

## Task 004 品牌介紹頁

新增 `/about`，提供品牌介紹、使命、願景、核心能力、工作方式、創辦人介紹與服務理念。Header、手機選單與 Footer 的「關於 XK」現在指向此頁；既有首頁 `#about`／`#brand` 錨點仍保留。

本機執行 `npm run dev` 後開啟 <http://localhost:3000/about>。GitHub Pages 匯出使用 `/about/` 路徑，CTA 返回實際首頁服務與聯絡區塊。頁面保留 `noindex, nofollow`，沒有公開未確認的創辦人姓名、照片或聯絡方式。

Task 004 指定的品質指令為 `npm ci`、`npx tsc --noEmit`、`npm run lint`、`npm run build`、`npm run build:pages`。Pages 部署流程延用 Task 003；本次 About 功能先以獨立 PR 供審核，不自動合併或宣稱已發布。

規格：[Task 004](docs/task/task004.md)。實作、截圖與本次驗收結果：[About Us 實作紀錄](docs/reports/about-implementation.md)。Task 002 正式規格見 [task002.md](docs/task/task002.md)；已刪除替代原稿的固定歷史連結保留於各 Task 規格。

## Task 005 服務介紹頁

新增 `/services`，以網站開發、Java 企業系統、系統整合與資料管理、AI 與自動化、雲端基礎架構五類服務說明技術範圍、適用情境、服務組合與五階段合作方式。首頁已新增「了解完整服務」連結；既有首頁 R05 Maintenance 服務分類及首頁服務錨點仍保留，沒有新增服務明細內頁。

本機執行 `npm run dev` 後開啟 <http://localhost:3000/services>。Pages 靜態匯出路徑為 `/services/`；共用「服務項目」導覽改為 `/services`。目前聯絡入口仍使用真實的首頁 `/#contact`，不公開未確認的信箱、表單、價格或服務保證。

本次驗收指令：

```sh
npm ci
npx tsc --noEmit
npm run lint
npm run build
npm run build:pages
```

規格：[Task 005](docs/task/task005.md)。內容來源、實作分工、截圖與本次實際驗收結果：[Services 實作紀錄](docs/reports/services-implementation.md)。Task 005 已完成本次五個品質指令、一般／靜態三頁回歸、五寬與觸控驗收、axe、鍵盤與資源檢查，七份指定截圖已產出；本次遠端 CI 結果見 PR Checks 與最終交付報告；本次使用 `feature/website-services-page` 建立 PR，等待審核，不自動合併或發布 main。

## Task 006 解決方案介紹頁

`/solutions` 依企業需求介紹數位品牌與企業網站、企業內部管理與系統現代化、跨系統資料整合與流程自動化、企業知識與 AI 輔助應用四個方向。頁面提供需求、適用對象、規劃步驟、改善目標、相關 Services、三個組合示例與五階段合作方式；內容是依需求規劃的方向，不是已交付案例或現成商用產品。

Header、Footer 與手機導覽的「解決方案」指向 `/solutions`，首頁保留原 `#solutions` 及三項摘要，並提供「了解解決方案」入口。所有 Services 連結對應實際錨點，聯絡入口仍為 `/#contact`；不提供未確認信箱或假表單。

本機網址為 `http://localhost:3000/solutions`；Pages 靜態網址使用 `/solutions/`。保留一般 `npm run build` 與獨立 `npm run build:pages`、品牌 Canonical、Open Graph 及 `noindex, nofollow`。以 `npm ci`、TypeScript、Lint、兩種 Build 及實際瀏覽器驗收確認成果；Pages 產物不能用 `npm run start` 取代靜態服務。

規格：[Task 006](docs/task/task006.md)。來源對照、實作內容、驗收結果、修正與七份真實截圖見 [Task 006 實作及驗證報告](docs/reports/task006-implementation.md)。遠端 PR／CI／部署狀態依報告及實際 GitHub 紀錄確認，不以本機建置或舊任務結果代替。

## Task 007 技術作品集

`/portfolio` 提供三個自製展示規劃的背景、分類、技術方向與狀態；共用詳頁為 `/portfolio/corporate-website`、`/portfolio/enterprise-management`、`/portfolio/integration-hub`。目前三案均為 `PLANNED`，已實作功能／技術與媒體陣列為空，未確認的公開原始碼及 Live Demo 目標為 null。Portfolio 網頁完成不代表三個案例系統已完成，現有官網也不自動等於完整 Case 01 的完成證據。

Header、Footer 與手機導覽共用「技術作品集」入口；相關服務連至現有 `/services#...`，聯絡沿用 `contactNavigation.href` 的首頁錨點。無合法且可驗證的案例素材時顯示文字空狀態，不建立假畫面或無效按鈕。未新增展示系統、Backend、API、依賴或全域樣式。

本機使用 `http://localhost:3000/portfolio`；Pages 使用 `/portfolio/` 及三個同前綴詳頁。三個 slug 由明確 static params 產生，未知 slug 回傳 404；四頁保留各自 Metadata、品牌 Canonical 及 `noindex, nofollow`。一般 production server 與 Pages 靜態產物分別驗收，不混用 `.next/` 模式。

Task 007 品質指令為 `npm ci`、`npx tsc --noEmit`、`npm run lint`、`npm run build`、`npm run build:pages`。本輪須回歸包含 Solutions 的八個公開路由、五種寬度與全部既有導覽／錨點；分支為 `feature/website-portfolio-page`。規格見 [Task 007](docs/task/task007.md)，作品狀態、素材權利及可公開連結依該規格的證據 Gate 處理，不以測試 PASS 推升作品狀態。

來源、完整檔案清單與本機驗收見 [Task 007 實作與驗證報告](docs/reports/task007-implementation.md)、[逐項證據摘要](docs/reports/task007-verification.json) 及 [原始 JSON 證據](docs/reports/task007-evidence.json.gz)。五個品質指令均 Exit 0，一般模式最終 23/23 PASS、Pages 最終 123 項＝121 PASS＋2 有據 N/A；七張實際截圖已完成。報告保留各階段時點，遠端 head／CI／合併／部署與公開網址須以同 PR 的最新實際紀錄確認。

## Task 008 聯絡資訊頁

`/contact` 提供六個區塊：合作起點、聯絡管道、三項需求準備、合作流程、資料注意與下一步導覽。`verifiedContactChannels` 仍為空，`ContactAvailability` 由實際清單派生為 `unavailable`，頁面誠實顯示「正式聯絡管道確認中」。目前不能透過網站收取需求；沒有表單、提交 API、未確認信箱、電話或社群入口。正式管道須先取得品牌擁有人核准與控制權／收件證據，任何收集服務另需授權及 Task 009 資料／法律核對。

Header、Footer 與手機選單共用的聯絡入口指向 `/contact`；首頁原 `#contact` 與待確認內容保留，新增「查看聯絡資訊」。既有頁面的有效首頁聯絡錨點仍可使用，Privacy 尚未發布時維持無連結文字。

本機網址為 `http://localhost:3000/contact`，目前 Pages 路徑為 `/contact/`。保留一般 Next.js build、獨立 Pages export、品牌 Canonical／Open Graph 與 `noindex, nofollow`。品質指令仍為 `npm ci`、`npx tsc --noEmit`、`npm run lint`、`npm run build`、`npm run build:pages`；本次一般 production 驗收使用 3050、Pages 靜態預覽使用 3051，兩種模式分開驗收。

規格見 [Task 008](docs/task/task008.md)。本次來源、修改檔、資料流、逐項實測、七張真實截圖與限制見 [Task 008 實作與驗證](docs/reports/task008-implementation.md)。最後五個品質指令 Exit 0，一般模式 27/27 PASS、Pages 148 項＝141 PASS＋7 有據 N/A，45 個響應式案例與 48 次 axe 零違規。原始失敗與未完成試次均保留；遠端 CI、合併、部署與公開頁面只依實際發生後的證據回報。

Task 008 的逐項證據與原始紀錄：[驗證摘要](docs/reports/task008-verification.json)、[壓縮證據](docs/reports/task008-evidence.json.gz)。

## Task 009 隱私權政策草案與發布保護

本次建立九個區塊的 `draft-1` 內部草案、頁內目錄及發布保護。品牌負責人目前尚無核准資料；資料處理主體、生效日、權利聯絡管道與同版本法律審閱仍待確認。技術成果、政策核准與公開發布分開記錄，合併程式碼不代表政策已核准或生效。

一般開發可在 `/privacy` 預覽；一般公開 production 預設回傳 404，GitHub Pages 不輸出草案 HTML 或 payload。Footer 保持「隱私權政策（待確認）」純文字，既有 Contact 維持無表單、無收件管道模式。

如需在本機審閱 production 草案，先執行 `npm run build`，再啟動只綁定 loopback 的隔離服務：

```sh
XK_PRIVACY_PREVIEW=1 npm run start -- --hostname 127.0.0.1 --port 3062
```

開啟 `http://127.0.0.1:3062/privacy`。此旗標不是身分驗證，不能設定於公開 Preview 或正式服務；Pages 建置不接受它解鎖草案。所有模式仍保留 `noindex, nofollow`，不新增資料蒐集、Cookie 同意工具或追蹤。

規格見 [Task 009](docs/task/task009.md)；資料流、待確認責任與期限、實測結果及三張草案截圖見 [Task 009 實作與驗證](docs/reports/task009-implementation.md)。正式政策與核准頁面的驗收在缺件期間維持 BLOCKED，不宣稱 Task 009 全部通過。

## Task 010 SEO 保護模式

九個公開路由與受控 Privacy 草案的既有 Title／Description 集中於 `src/config/seo.ts`；共用 Metadata 工具保留品牌 Canonical／Open Graph、加入無圖與無社群 handle 的 Twitter `summary`，全站維持 `noindex, nofollow`。Root Layout 只加入安全序列化的品牌 WebSite JSON-LD，不新增可見 UI、法定公司、產品或評價資料。

一般模式提供 `/robots.txt`；Pages 提供 `/robots.txt`。規則允許讀取公開 HTML 的 noindex，排除開發／草案路徑，沒有 Sitemap 宣告。Pages 專案檔不代表控制 `xk2022.github.io/robots.txt`；保護模式的 `/sitemap.xml` 維持 404，九個候選路由不等於已發布 Sitemap 或已獲准索引。

品質指令沿用 `npm ci`、`npx tsc --noEmit`、`npm run lint`、`npm run build`、`npm run build:pages`。普通與 Pages 建置／驗收分開；沒有新的依賴、Backend、Analytics、GSC token 或索引環境開關。Privacy 的公開 404／Pages 排除及 Contact 無收件狀態保留。

規格：[Task 010](docs/task/task010.md)。候選／排除清冊、robots 範圍、正式 Sitemap 生成規則、Owner 權責及後續 release／Search Console 待辦：[SEO 操作指南](docs/seo-operations.md)。合併技術保護模式不代表正式索引、GSC 提交或品牌網域設定已完成。

本次來源、逐頁 exact Metadata、實測結果與階段界線見 [Task 010 實作與驗證](docs/reports/task010-implementation.md)。

## Task 011 效能量測與最佳化

以實際 production baseline 驗證載入成本，保留 Inter／Noto Sans TC、四個既有文字字重與 `display: swap`；Noto 使用可變字重宣告，避免同一組字體子集的重複 CSS。沒有換字體、改 Logo／Tokens／內容、關閉必要互動、增加 Dependencies 或加入追蹤。

Pages 是主要受控量測模式；九個公開頁分別進行手機／桌面冷載入，Home 與最大內容風險頁補暖快取及實際互動，一般 Next.js production 另測代表頁。固定節流、至少三次 runs、中位數／範圍、Lighthouse JSON／HTML 與原始 trace 分開保存；本機模型不等於 CDN 或真機，沒有 field 資料時不能宣稱 CWV p75 通過。

重現條件、Cache 與驗收界線見 [效能量測指南](docs/performance-measurement.md)，實際基準／after、測試結果與限制見 [Task 011 實作與驗證](docs/reports/task011-implementation.md)。沿用五個品質指令及 GitHub Pages 工作流程；Metadata／noindex／nofollow、Privacy 草案保護與 Contact 無收件狀態不變。

Task 011 另以明確的 Tailwind 掃描排除規則保護本次驗收資料／報告；CI artifact 曾揭露文件文字增加無用 utilities，已修正並以完整產物 bridge 與最終來源補驗確認受測 runtime 保持一致，詳細版本界線見實作報告。

## Task 012 無障礙稽核與修正

以當次九個公開頁及實際 disclosure 狀態稽核 WCAG 2.2 A／AA，保留 2／2.1 回歸。手機選單在焦點離開時關閉並保留原生焦點順序；Footer「網站目錄」涵蓋全部九個公開網址；Hero／CTA 的漸層小字使用既有較深文字 Token。About 品牌卡片改由內容決定高度，避免使用者覆寫文字間距時裁切連結。

規格見 [Task 012](docs/task/task012.md)，完整來源、四類問題、55 項準則適用性、實際 axe／Orca／鍵盤／200% browser zoom／320 CSS px／文字間距驗收、五張截圖及版本界線見 [實作與驗證報告](docs/reports/task012-implementation.md)。[證據說明](docs/reports/task012-artifacts/README.md) 提供原始結果與重現方式；工具掃描不等於完整無障礙認證，未測的行動 AT／其他平台保持待辦。

依賴、Logo 原檔、品牌色值、字體、Metadata／noindex／nofollow、Privacy 草案保護、Contact 未開放收件及 GitHub Pages 工作流程保持原有架構。文件 Repository 的最新品牌／經營模式決議與網站既有內容有差異，列於報告另行處理，本次不以無障礙修正代替品牌或法律核准。遠端 CI、授權合併、main 部署及公開網址驗證在同一 PR 記錄實際事件。

## Task 013 Vercel 部署準備

一般 Next.js 模式與 GitHub Pages 分開驗收，沿用鎖定套件、Node.js 24.x、`npm ci`、`npm run build` 及 Next.js preset 預設 output，不使用 Pages 靜態產物作為 Vercel prebuilt。設定契約、環境保護、首次 import 影響、回復程序、本機驗收及外部待確認事項見 [Task 013 實作與驗證報告](docs/reports/task013-implementation.md)。

Vercel Team／Account／Project 尚未指定，本次不猜測帳戶或建立同名專案。Preview／Production 實際部署及截圖在取得正確對象後驗收；本機或 Pages 成功不能替代 Vercel 上線證據。保留 noindex／nofollow、Privacy 草案與開發路由保護；兩個 Vercel 環境均不得啟用 `XK_PRIVACY_PREVIEW` 或 `XK_DESIGN_SYSTEM_PREVIEW`。不修改 DNS、Custom Domain、Pages Source 或現有 Actions 工作流程。

## Bugfix 001–008 首頁與方案內容優化

首頁以企業需求介紹網站、Java 系統與 AI 整合，提供服務及技術作品入口。五項服務補上常見需求、方案與可規劃交付，並連至真實服務錨點；五個技術分類改為卡片，讓服務用途與技術選擇更容易區分。首頁三個方案入口連至 Solutions 既有詳解，四個方案補上交付方向及規劃中的相關展示作品，沒有將計畫寫成完成案例。

原始 [Bugfix 001–008 文件](docs/task/README.md#bugfix-001008-優化文件) 有重複建議，本次採用與後續項目、來源衝突、實際驗收及七張截圖見 [實作與驗證報告](docs/reports/bugfix001-008-implementation.md)。沿用既有暫定 Logo 共用元件、九個公開路由、noindex／nofollow 及普通／Pages 建置；獨立方案路由、社群分享圖片與正式索引仍依個別內容／素材核准處理。不改依賴、Backend、DNS 或 Vercel 設定。
