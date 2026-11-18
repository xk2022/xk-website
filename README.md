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
