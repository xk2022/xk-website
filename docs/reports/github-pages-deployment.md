# GitHub Pages 靜態部署

Task 003 期間，使用者明確選擇 GitHub Actions 與 GitHub Pages。這項指示取代該任務原先的 Vercel 部署目標，但保留一般 Next.js production build 與 Vercel 相容性。沒有新增 Backend、套件依賴、DNS 或 Custom Domain 設定。

## 建置模式

| 指令 | 輸出／用途 |
| --- | --- |
| `npm run dev` | 本機 Next.js 開發；包含開發驗收頁 |
| `npm run build` | 一般 Next.js production build；保留原部署模式 |
| `npm run start` | 執行已完成的一般 Next.js production build |
| `npm run build:pages` | 靜態匯出與檢查，輸出 `out/`，供 Pages 使用 |

建置工具為 [build-github-pages.mjs](../../scripts/build-github-pages.mjs)，Next.js 對應設定在 [next.config.ts](../../next.config.ts)。`build:pages` 在子程序設定 `XK_PAGES_EXPORT=1`，並使用 `output: "export"`、`trailingSlash: true`、不依賴伺服器的圖片模式。一般建置不啟用這些條件。

`XK_PAGES_BASE_PATH` 預設為 `/xk-website`，對應專案網站 `https://xk2022.github.io/xk-website/`。若旗標明確設為空字串，代表根路徑；只有實際部署位置變更時才調整，不會因此自動更改 GitHub Pages Custom Domain 或 DNS。CI 從 GitHub Pages 設定取得實際 `base_path`。

Script 會在 Next.js 成功後：

1. 移除 `out/` 的開發路由與對應頁面資料。
2. 建立 `.nojekyll`，保留 `_next` 靜態資源路徑。
3. 確認存在 `index.html` 與 `404.html`。
4. 確認首頁仍含建置階段 `noindex`，資源 URL 含正確 Base Path。
5. 掃描輸出的 HTML、文字與 JSON，不得洩漏 `/dev/design-system` 路由。

設計系統頁在 Pages 匯出時會先執行 `notFound()`，不進入 request-only 的 `connection()`。一般 Next.js 模式仍維持開發可用、production 預設 404、明確設定 `XK_DESIGN_SYSTEM_PREVIEW=1` 才開啟的驗收行為。開發路由不列入 Pages 公開內容；不以手動刪除雜湊 JavaScript chunk 的方式破壞 bundler 產物。

## Actions 工作流程

[ci.yml](../../.github/workflows/ci.yml) 在 Pull Request、`main` 推送及手動執行時啟動：

| Job | 工作內容 | 權限與限制 |
| --- | --- | --- |
| `quality` | `npm ci`、TypeScript、ESLint、一般 production build，保留 Next.js 診斷 artifact | 唯讀原始碼；Node.js 依 `.nvmrc` 的 24.x |
| `pages-build` | 讀取 Pages 設定、`npm ci`、`npm run build:pages`、上傳 `out/` | 等待 quality 通過；唯讀原始碼與 Pages 設定 |
| `deploy` | 發布已建置的 Pages artifact | 僅非 PR 且分支為 `main`；`pages: write`、OIDC `id-token: write` |

PR 只檢查與建置，不發布 Pages，也不自動合併。合併至 `main` 後的 push 才進入部署；亦可在 Actions 手動選擇 `main` 重新執行。手動執行其他分支仍不部署。

Actions 以官方版本的完整 commit SHA 固定，包含 checkout、setup-node、upload-artifact、configure-pages、upload-pages-artifact、deploy-pages。安裝使用 lockfile 的 `npm ci`，沒有自動升降級套件。Next.js 診斷 artifact 不是 Vercel 的 `--prebuilt` 部署檔；Pages 部署使用獨立的 Pages artifact。

Pages 發布使用 GitHub 自動提供的 `GITHUB_TOKEN` 與 OIDC，不需要 Vercel Token、資料庫密碼或自訂部署金鑰。權限限於需要的 job，checkout 不保留寫入憑證。

## Repository 設定

檢查時，`https://xk2022.github.io/xk-website/` 已存在，但使用舊版 Jekyll 發布工作流程。網址回應 200 不代表本次 Next.js 程式碼已上線。新 workflow 不會自動把既有 legacy Pages 來源轉為 GitHub Actions。此次嘗試經 API 僅更新 build_type 時收到 HTTP 403（Resource not accessible by integration），所以設定未變更。官方更新設定 API 需要 Administration write 與 Pages write；一般 Actions 的 Pages 部署權限不代表具備更新 Repository 設定的權限，因此沒有加入會失敗的自動切換設定步驟。建議管理者切換來源，避免舊 Jekyll 與新工作流程競爭發布；此項與本機 artifact／PR 建置驗證分開。

若尚未切換來源，Repository 管理者可依序操作：

1. 開啟 `xk2022/xk-website` → **Settings** → **Pages**。
2. 在 **Build and deployment** 的 **Source** 選擇 **GitHub Actions**。
3. 保留目前的網域設定，不填入新 Custom Domain，也不變更 DNS。
4. 檢查 `github-pages` Environment 的 branch policy 允許 `main`，並依既有審核要求完成環境審核。
5. 在 PR 確認 `quality`、`pages-build` 通過，審核後才合併。
6. 開啟 **Actions** → **Website CI and GitHub Pages**，檢查 `main` 的 quality、pages-build、deploy 結果。需要重跑時，**Run workflow** 選擇 `main`。
7. 使用 deploy job 提供的 URL 檢查首頁、CSS、字體、JavaScript、導覽錨點及 404。

若 Settings 來源、Environment 保護或 GitHub Actions 權限阻擋工作流程，先依實際錯誤處理。不得用未通過檢查的檔案覆蓋現有站點，亦不得只憑本機 Build 成功宣稱已部署。

## 本機驗收靜態產物

```sh
npm install
npx tsc --noEmit
npm run lint
npm run build
npm run build:pages
```

`out/` 必須由靜態伺服器提供；`npm run start` 是一般 Next.js 伺服器，不是 Pages 預覽器。預設 `/xk-website` 路徑可用以下方式模擬：

```sh
preview_dir=$(mktemp -d /tmp/xk-pages-preview.XXXXXX)
mkdir -p "$preview_dir/xk-website"
cp -R out/. "$preview_dir/xk-website/"
python3 -m http.server 4173 --directory "$preview_dir"
```

開啟 `http://localhost:4173/xk-website/`。在有 Python 3 的環境可直接使用上述方式，不需要為網站新增靜態伺服器套件。驗收結束後以 Ctrl+C 關閉伺服器。

檢查五種寬度（320、375、768、1440、1920px），確認資源沒有遺失、桌面／手機導覽與頁內連結保留 `/xk-website` 路徑，`/dev/design-system` 不可作為公開頁面瀏覽。產物的 `404.html` 由 GitHub Pages 在未知路徑使用；簡易本機伺服器不會完整模擬 Pages 的 404 行為。

兩種 build 都使用 `.next/` 中間產物。若在 Pages 匯出後改測一般 `npm run start`，先重新執行 `npm run build`，確保伺服器使用正確模式的產物。

首頁 Canonical 保留已確認的品牌網域 `https://xplorekaleidoscope.com`；Pages 是目前選擇的發布位置。正式網域連接、搜尋索引開放及 Open Graph 圖片仍是後續獨立決策。

## 本次執行結果

| 項目 | 實際結果 |
| --- | --- |
| 一般品質檢查與 Next.js build | 通過；npm install、TypeScript、ESLint（零警告）、一般 production build 已實際完成 |
| Pages build、Base Path、`.nojekyll`、開發路由排除 | 通過；npm run build:pages 及 out/ 產物檢查 exit0 |
| 本機靜態網站與五種寬度 | 通過；320／375／768／1440／1920px，無水平溢出、失效資源或失效連結，手機互動及 axe A/AA 掃描通過 |
| Actions YAML／Script 檢查 | actionlint 1.7.12、Node 語法檢查與 ESLint 通過；官方 Actions SHA 均已核對 |
| Settings → Pages → Source | 檢查時為 legacy Jekyll；瀏覽器未登入，API 更新回覆403，設定未變更；建議管理者切換 GitHub Actions，避免舊發布流程競爭 |
| PR Actions 執行結果與 run URL | 以 PR Checks 及交付報告的實際 run 為準；不以本機成功替代遠端執行結果 |
| `main` 部署與公開 URL | 尚未宣稱已執行；待實際 main 部署紀錄 |

本文件提供工作流程與操作方式，不能作為 Actions 已執行或 Next.js 已公開上線的證明。具體執行結果需由實際 run、部署紀錄與公開頁面檢查填入。
