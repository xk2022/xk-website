# Website smoke 與展示維護

`npm run test:smoke` 是 BF-016 的 HTTP／HTML 共用入口。它使用 Python 3 標準函式庫與 Node.js 24 的原生 TypeScript import，不安裝 npm 或 Python 套件，也不會 build、啟動 server、修改來源或變更部署。

目前正式網址與空 Base Path 契約見 [自訂網域部署指南](custom-domain-deployment.md)。舊 `/xk-website` 預覽路徑已不適用。

## 執行條件與指令

先依 [協作流程](subagent-workflow.md) 完成必要品質檢查，並由同一位 owner 管理 build 與 server。一般 production build 與 Pages build 共用 `.next/`，須先驗完一般模式，再執行 Pages build。smoke 應指向已啟動、與目前工作樹相符的 production／靜態 preview；不要以 development server 取代發布保護驗收。

```sh
# 一般 production server，使用 Root 實際啟用的 port
npm run test:smoke -- --base-url http://127.0.0.1:3100/ --output /tmp/xk-bugfix-smoke/normal.json

# GitHub Pages preview，自訂網域以根目錄提供網站
npm run test:smoke -- --base-url http://127.0.0.1:3101/ --output /tmp/xk-bugfix-smoke/pages.json

# 部署後的公開 HTTP，urllib 會使用環境的 proxy 設定
npm run test:smoke -- --base-url https://www.xplorekaleidoscope.com/ --output /tmp/xk-bugfix-smoke/public.json
```

省略 `--output` 時，報告使用 `/tmp/xk-website-smoke-<UTC timestamp>.json`，避免覆寫先前結果。明確指定路徑時，每次重驗請使用新檔名。每個 request 的 timeout 預設 20 秒，可用 `--timeout 10` 調整；連線失敗會記為 FAIL。

需保留外層真正程序退出證據時，使用既有 runner：

```sh
python3 scripts/run-with-evidence.py \
  --receipt /tmp/xk-bugfix-smoke/pages-receipt.json \
  --log /tmp/xk-bugfix-smoke/pages.log \
  --timeout 600 -- npm run test:smoke -- \
  --base-url http://127.0.0.1:3101/ \
  --output /tmp/xk-bugfix-smoke/pages.json
```

全部檢查通過且所有階段抵達完成標記才會 Exit 0；斷線、soft 404、缺少 route／圖片、錯誤 metadata 或未完成執行都會非零退出。JSON 保留 UTC 起訖、環境、指令、來源 SHA-256、逐筆 Test ID／預期／實際／備註、完成標記及預定 exit code；真實程序退出另看 runner receipt。JSON 或 log 中出現 PASS 不能取代已完成的程序與 Required 驗收。

## 檢查範圍

- 從原生 `seo.ts`／`website-showcases.ts` 取得現行內容，與獨立的 [核准契約](../scripts/fixtures/showcase-contract.json) 比對：六品牌順序、四模板、首頁精選、分類、原九路由及六個新增品牌詳頁。
- 每個公開頁 HTTP 200／HTML、解碼後的唯一 `<head><title>`、description、Canonical、OG、Twitter、noindex／nofollow、語言、僅含真實 WebSite 欄位的 JSON-LD。
- 所有站內 `<a>` 的公開 route、Pages base path 及 fragment 目標；未知目的地會失敗，不能因未列入 registry 就忽略。
- 本機 script／stylesheet／preload／圖片等 HTML 資源的 HTTP 200 與 base path；圖片的 Content-Type、實際 bytes 與 PNG／JPEG／GIF／WebP／SVG header 尺寸。這不是完整瀏覽器圖片解碼，也不解析 CSS 內的背景圖。
- 首頁精選與 Portfolio 的每張展示卡：`data-showcase-id`／state／presentation、可見分類、可用外連與真實預覽、品牌詳頁入口、第三方模板署名。`preparing`／`reference-only` 必須是 null href／image，沒有假圖或失效外站按鈕。
- 原三個技術詳頁的 Planned 與缺乏實作／系統畫面的誠實說明；About／Solutions 的對外人數強調回歸；Contact 保留無表單與管道待確認狀態。
- `/privacy`、`/dev/design-system`、`/sitemap.xml`、未知一般 route、未知技術與品牌 slug 的真實 HTTP 404；robots 的精確保護規則，以及公開 HTML 不包含 Privacy 草案正文。

外部展示首頁與已知來源素材是獨立選項，不是官網本地資源通過的推論：

```sh
# 可用外站首頁須回應 HTTP 200；不代表外站全部功能或素材正常
npm run test:smoke -- --base-url http://127.0.0.1:3101/ --check-external

# 重現契約列出的 Demo 002／003 來源素材 404
npm run test:smoke -- --base-url http://127.0.0.1:3101/ --check-source-assets
```

`--check-source-assets` 中的預期 404 是已知缺漏的證據，不能寫成「素材修復 PASS」。來源若改為 200，先核對內容／渲染與發布決策，再更新來源限制、展示 availability 及獨立契約；不能只修改期望來消除失敗。官網沒有獲授權修改這些外部 repository。

smoke 不包含瀏覽器排版、響應式、互動選單、鍵盤／Focus、Reduced Motion、真實螢幕閱讀器或 axe；不能當成完整 WCAG 合規驗收。這些檢查及相符版本的 screenshot 由當次任務矩陣另外安排。它也不授權公開 Privacy、索引、Sitemap、聯絡收件或 DNS／部署變更。

## 新增或維護展示

1. 先確認來源、真實功能／素材、展示性質及公開範圍。只有可瀏覽、可核對的來源才用 `available`；未就緒時使用既有 unavailable union，保持 null href／image 與誠實說明。第三方模板保留 publisher attribution；來源有缺漏時保留 `sourceHref` 作為維護紀錄，不提供失效展示按鈕。
2. 修改 [website-showcases.ts](../src/config/website-showcases.ts)：資料、presentation、availability、詳頁內容及 `showcaseSettings`。UI 數量、首頁精選和衍生 `showcaseSeoPages` 使用這份來源，不另寫固定總數。品牌詳頁路徑由 `showcaseDetailPath(id)` 統一產生。
3. 可用圖片放在 `public/images/showcases/`，記錄真實來源／擷取與權利證據；不要補畫假截圖。沒有新圖片就保留 unavailable 狀態。
4. 有明確批准的 inventory、排序、精選、分類、來源狀態或公開路由變更時，同步審閱獨立契約。它刻意不從 config 產生，防止刪案、換序或擴張發布範圍時驗證跟著一起失效。技術規劃的升級仍需其獨立證據，不因新增品牌詳頁改變原三個 PLANNED。
5. 執行適用的 typecheck／lint、一般 build、`build:pages` 及兩個 server 的 smoke；依實際 UI／路由影響補瀏覽器驗收。`build:pages` 自動執行靜態輸出守門，包含精確 HTML 清冊、registry Metadata、未知 export、Privacy／dev payload 與資源檢查；CI workflow 不需新增或改動。
6. 保留失敗與重驗的 JSON／receipt，將當次結果連到實作報告；未執行的外站或瀏覽器範圍維持 PENDING，不由 smoke 成功推定。

Canonical／OG URL 比對僅允許 Next.js 在根目錄與 trailingSlash 模式的單一尾斜線序列化等價；原始值保留於 notes。scheme、host、路徑、query、fragment 或重複斜線不同仍屬錯誤，不因比對修正放寬發布網域。
