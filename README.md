# xk-website

官方網站，獨立交給 Codex 開發。

第四步：接下來的開發里程碑
任務 | 開發內容
Task 001 | Repository Bootstrap
Task 002 | XK Brand Design System
Task 003 | Header / Footer / Navigation
Task 004 | Homepage
Task 005 | About / Services
Task 006 | Solutions / Portfolio
Task 007 | Contact / Privacy
Task 008 | SEO / Performance / Accessibility
Task 009 | Vercel Deployment
Task 010 | Domain Configuration

完成 Task 001 後，再讓 Codex 依序執行，不要把所有工作塞進同一個任務。

第五步：Vercel 部署
等 Task 004 或 Task 006 完成初步驗收，就可以連接 Vercel。

Vercel — Import Git Repository
設定原則：

- Repository：xk-website
- Framework：Next.js
- Root Directory：./
- Production Branch：main

因為網站已經是獨立 Repository，所以不需要再設定 frontend/website。

Vercel 可以為每次 Pull Request 建立 Preview Deployment，合併到 main 後再部署正式版本。


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

規格：[Task 001](docs/task/task001.md)、[Task 002](docs/task/task002.md)。使用方式與設計決策：[品牌設計系統](docs/brand-design-system.md)；歷史紀錄：[implementation notes](docs/implementation-notes.md)。
