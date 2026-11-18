# xk-website

官方網站，獨立交給 Codex 開發。

開發里程碑與完整規格請見 [Task 001–014 任務索引](docs/task/README.md)。Task 001–005 的技術基礎、Design System、首頁、About 與 Services 已合併；Task 006 為 Solutions 解決方案介紹頁。Portfolio、Contact、Privacy、SEO、Performance、Accessibility、Vercel 與 Domain 各自依後續獨立任務處理，不因相關區塊存在而視為完成。

## 部署方向

使用者於 Task 003 選擇 **GitHub Actions → GitHub Pages 靜態網站**。正式模式仍保留一般 Next.js 建置，日後可使用 Vercel 的 Next.js preset、Repository 根目錄 `.`、production branch `main`；本次不需要 Vercel Secrets。

Pages 建置使用 `npm run build:pages`，輸出 `out/`，預設路徑為 `/xk-website`。Pull Request 執行品質檢查與靜態建置，只有 `main` 推送或手動選擇 `main` 時才進入部署工作，不會自動合併 PR。Pages 設定與部署狀態詳見 [GitHub Pages 部署指南](docs/github-pages-deployment.md)。不變更 DNS 或品牌正式網域設定。

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

規格：[Task 001](docs/task/task001.md)、[Task 002](docs/task/task002.md)。使用方式與設計決策：[品牌設計系統](docs/brand-design-system.md)；歷史紀錄：[implementation notes](docs/implementation-notes.md)。

## Task 003 企業首頁

首頁現在由 Hero、品牌介紹、五項服務、技術能力、Why XK、解決方案與聯絡區塊組成，搭配桌面／手機導覽及 Footer。現階段導覽使用實際首頁錨點，尚未建立的內頁不提供失效連結。沒有已確認可公開的 Email 或 LinkedIn 時，聯絡區塊會顯示待確認資訊，不建立假表單或無效信箱連結。

一般開發仍使用上方 `npm run dev`；一般 production build 使用 `npm run build` 與 `npm run start`。Pages 額外建置：

```sh
npm run build:pages
```

`out/` 是靜態 artifact，不能以 `npm run start` 當作 Pages 伺服器。靜態匯出排除 `/dev/design-system`，並保留建置階段的 `noindex, nofollow`；正式開放索引是後續獨立決策。

本次規格：[Task 003](docs/task/task003.md)。實作、檔案異動與驗收紀錄：[首頁實作指南](docs/homepage-implementation.md)。Actions、Pages 來源設定與本機靜態預覽：[部署指南](docs/github-pages-deployment.md)。

## Task 004 品牌介紹頁

新增 `/about`，提供品牌介紹、使命、願景、核心能力、工作方式、創辦人介紹與服務理念。Header、手機選單與 Footer 的「關於 XK」現在指向此頁；既有首頁 `#about`／`#brand` 錨點仍保留。

本機執行 `npm run dev` 後開啟 <http://localhost:3000/about>。GitHub Pages 匯出使用 `/xk-website/about/` 路徑，CTA 返回實際首頁服務與聯絡區塊。頁面保留 `noindex, nofollow`，沒有公開未確認的創辦人姓名、照片或聯絡方式。

Task 004 指定的品質指令為 `npm ci`、`npx tsc --noEmit`、`npm run lint`、`npm run build`、`npm run build:pages`。Pages 部署流程延用 Task 003；本次 About 功能先以獨立 PR 供審核，不自動合併或宣稱已發布。

規格：[Task 004](docs/task/task004.md)。實作、截圖與本次驗收結果：[About Us 實作紀錄](docs/about-implementation.md)。Task 002 正式規格見 [task002.md](docs/task/task002.md)；已刪除替代原稿的固定歷史連結保留於各 Task 規格。

## Task 005 服務介紹頁

新增 `/services`，以網站開發、Java 企業系統、系統整合與資料管理、AI 與自動化、雲端基礎架構五類服務說明技術範圍、適用情境、服務組合與五階段合作方式。首頁已新增「了解完整服務」連結；既有首頁 R05 Maintenance 服務分類及首頁服務錨點仍保留，沒有新增服務明細內頁。

本機執行 `npm run dev` 後開啟 <http://localhost:3000/services>。Pages 靜態匯出路徑為 `/xk-website/services/`；共用「服務項目」導覽改為 `/services`。目前聯絡入口仍使用真實的首頁 `/#contact`，不公開未確認的信箱、表單、價格或服務保證。

本次驗收指令：

```sh
npm ci
npx tsc --noEmit
npm run lint
npm run build
npm run build:pages
```

規格：[Task 005](docs/task/task005.md)。內容來源、實作分工、截圖與本次實際驗收結果：[Services 實作紀錄](docs/services-implementation.md)。Task 005 已完成本次五個品質指令、一般／靜態三頁回歸、五寬與觸控驗收、axe、鍵盤與資源檢查，七份指定截圖已產出；本次遠端 CI 結果見 PR Checks 與最終交付報告；本次使用 `feature/website-services-page` 建立 PR，等待審核，不自動合併或發布 main。

## Task 006 解決方案介紹頁

`/solutions` 依企業需求介紹數位品牌與企業網站、企業內部管理與系統現代化、跨系統資料整合與流程自動化、企業知識與 AI 輔助應用四個方向。頁面提供需求、適用對象、規劃步驟、改善目標、相關 Services、三個組合示例與五階段合作方式；內容是依需求規劃的方向，不是已交付案例或現成商用產品。

Header、Footer 與手機導覽的「解決方案」指向 `/solutions`，首頁保留原 `#solutions` 及三項摘要，並提供「了解解決方案」入口。所有 Services 連結對應實際錨點，聯絡入口仍為 `/#contact`；不提供未確認信箱或假表單。

本機網址為 `http://localhost:3000/solutions`；Pages 靜態網址使用 `/xk-website/solutions/`。保留一般 `npm run build` 與獨立 `npm run build:pages`、品牌 Canonical、Open Graph 及 `noindex, nofollow`。以 `npm ci`、TypeScript、Lint、兩種 Build 及實際瀏覽器驗收確認成果；Pages 產物不能用 `npm run start` 取代靜態服務。

規格：[Task 006](docs/task/task006.md)。來源對照、實作內容、驗收結果、修正與七份真實截圖見 [Task 006 實作及驗證報告](docs/reports/task006-implementation.md)。遠端 PR／CI／部署狀態依報告及實際 GitHub 紀錄確認，不以本機建置或舊任務結果代替。
