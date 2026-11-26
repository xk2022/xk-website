# 自訂網域部署與資源路徑

更新日期：2026-11-23（Asia/Taipei）。目前對外網址為 <https://www.xplorekaleidoscope.com/>，GitHub Pages 在網域根目錄提供靜態網站。

## 單一設定與建置

- `src/config/deployment.ts` 定義正式 HTTPS Origin 與空字串 `basePath`；`siteConfig`、Metadata、WebSite JSON-LD 及 Privacy 草案的品牌網址沿用同一來源。
- Pages 模式保留 `output: "export"`、`trailingSlash: true` 與未最佳化的本機圖片；`basePath`、`assetPrefix` 都是空字串。CSS／JS／字型為 `/_next/static/…`，預覽圖為 `/images/showcases/…`，App icon 為 `/icon.svg`。
- `XK_PAGES_BASE_PATH` 只能省略或為空字串。舊 `/xk-website`、完整網址或其他非空值會在建置前失敗，不會自動清理為看似有效的輸出。
- GitHub Actions 讀取 Pages 設定後先核對正式網域與空路徑，再以明確的空 `XK_PAGES_BASE_PATH` 建置；provider 的 Repo 路徑不再直接注入 Next.js。

```sh
npm ci
npx tsc --noEmit
npm run lint
npm run build
# 一般 production 驗收完成、停止 server 後，才執行下一個 build
npm run build:pages
python3 -m http.server 3171 --bind 127.0.0.1 --directory out
```

另開終端執行：

```sh
npm run test:smoke -- --base-url http://127.0.0.1:3171/ --output /tmp/xk-domain-smoke.json
npm run test:smoke -- --base-url https://www.xplorekaleidoscope.com/ --output /tmp/xk-domain-public-smoke.json
```

## 部署與驗收

1. 使用修正分支與 PR；品質檢查、Pages build／守門及受測資源比對通過後，依當次使用者授權合併。只有 main 觸發公開部署。
2. 驗證實際部署 SHA、main CI、Pages deployment status 與公開網址，不以 PR artifact 取代部署證據。
3. 實際取得首頁、所有公開頁、CSS、JS、CSS 內字型、圖片與 icon，確認 HTTP 200、正確 Content-Type、沒有 Repo 或網址字串混入路徑。
4. 瀏覽器驗證桌面／手機樣式、圖片解碼、導覽／錨點、手機選單、原生收合、鍵盤／Focus／Reduced Motion，以及 Console／Runtime／Network。Contact 沒有收件表單，表單提交為 N/A；導覽與聯絡 CTA 仍須實測。
5. 保留 noindex／nofollow、Privacy／dev／未知路由的 404 及原三個 Planned 專案。現況沒有核准分享圖片，Sitemap 仍未發布；網址統一不會自動批准這些內容或開放索引。

## 設定變更與回復

Base Path 會編入 HTML、CSS 與 JavaScript，修改 Pages 網域設定後須重新建置。不要將舊含 Repo 路徑的 artifact 直接部署到自訂網域根目錄，也不要只補外觀上的重新導向。

若未來改回 GitHub project URL，需另以 PR 同步部署設定、圖片／robots／Metadata、workflow 契約與驗收，再重新 build；不能靠環境變數覆寫本輪批准的根路徑。DNS、憑證與 Pages Source 由平台設定管理，本次程式修正不修改它們。

原里程碑與舊 project-path 部署結果保留在歷史報告；本輪實測及限制見 [資源路徑修正報告](../reports/custom-domain-assets-2026-11-23.md)。
