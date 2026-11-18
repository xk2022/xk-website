# xk-website

官方網站，獨立交給 Codex 開發。

第四步：接下來的開發里程碑
任務 | 開發內容
Task 001 | Repository Bootstrap
Task 002 | XK Brand Design System
Task 003 | Corporate Homepage（包含 Header / Footer / Navigation）
Task 004 | Homepage
Task 005 | About / Services
Task 006 | Solutions / Portfolio
Task 007 | Contact / Privacy
Task 008 | SEO / Performance / Accessibility
Task 009 | Vercel Deployment
Task 010 | Domain Configuration

Task 003 依目前規格執行企業首頁，包含 Header／Footer／Navigation；表內其餘項目保留原里程碑規劃，後續範圍以新的任務規格為準。

## 部署方向

使用者於 Task 003 選擇 **GitHub Actions → GitHub Pages 靜態網站**。正式模式仍保留一般 Next.js 建置，日後可使用 Vercel 的 Next.js preset、Repository 根目錄 `.`、production branch `main`；本次不需要 Vercel Secrets。

Pages 建置使用 `npm run build:pages`，輸出 `out/`，預設路徑為 `/xk-website`。Pull Request 執行品質檢查與靜態建置，只有 `main` 推送或手動選擇 `main` 時才進入部署工作，不會自動合併 PR。Pages 設定與部署狀態詳見 [GitHub Pages 部署指南](docs/github-pages-deployment.md)。不變更 DNS 或品牌正式網域設定。

## 本機開發與 Task 002 驗收

使用 Node.js 24.x 與 npm，從 Repository 根目錄執行：

```sh
npm install
npm run dev
```

首頁：http://localhost:3000。設計系統驗收頁：http://localhost:3000/dev/design-system。一般本機開發不需要環境變數或 Backend。

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

規格：[Task 001](docs/task/task001-implementation-notes.md)、[Task 002](docs/task/task002.zh-TW.md)。使用方式與設計決策：[品牌設計系統](docs/brand-design-system.md)；歷史紀錄：[implementation notes](docs/implementation-notes.md)。


## Task 003 企業首頁

首頁現在由 Hero、品牌介紹、五項服務、技術能力、Why XK、解決方案與聯絡區塊組成，搭配桌面／手機導覽及 Footer。現階段導覽使用實際首頁錨點，尚未建立的內頁不提供失效連結。沒有已確認可公開的 Email 或 LinkedIn 時，聯絡區塊會顯示待確認資訊，不建立假表單或無效信箱連結。

一般開發仍使用上方 `npm run dev`；一般 production build 使用 `npm run build` 與 `npm run start`。Pages 額外建置：

```sh
npm run build:pages
```

`out/` 是靜態 artifact，不能以 `npm run start` 當作 Pages 伺服器。靜態匯出排除 `/dev/design-system`，並保留建置階段的 `noindex, nofollow`；正式開放索引是後續獨立決策。

本次規格：[Task 003](docs/task/task003.md)。實作、檔案異動與驗收紀錄：[首頁實作指南](docs/homepage-implementation.md)。Actions、Pages 來源設定與本機靜態預覽：[部署指南](docs/github-pages-deployment.md)。
