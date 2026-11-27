# DC-008-01 實作及驗證紀錄

## 來源與實作

2026-11-27 對話選定的全球互聯網／復古工藝／璀璨黑金概念圖，轉為 1024×1024 WebP（150,038 bytes，SHA-256 `843c5286c104364505af5b373643b4d0e24327146679c7d9503560c306e96c79`）。原圖為本次 AI 概念設計，不是第三方案例。畫面保留既有核准反白 Logo。三區點擊依現有路由 resolver，沒有新 URL 或改變 SEO；短時 CSS 光影動畫在降低動態模式關閉，最長 4.5 秒。文字連結作為其他操作入口。

## 本機結果

| 檢查 | 結果 |
| --- | --- |
| npm ci（Node 24.22.3） | Exit 0 |
| next typegen、typecheck、lint | 各 Exit 0 |
| npm test | 436 PASS，Exit 0 |
| Normal build | Exit 0 |
| Pages build 與既有靜態清冊 validator | Exit 0 |
| Gateway 靜態 markup | 三區 href、唯一 h1、圖片存在，Exit 0（Node 驗證；首次 Python bs4 缺套件未執行，Exit 1） |
| Pages HTTP smoke 首次 | 3,247 PASS／27 FAIL，Exit 1；Python 預設 server 以自己錯誤頁取代網站 404 |
| Pages HTTP smoke 重驗 | 改用相同 out/ 且回傳 404.html 的預覽 server，3,274 PASS／0 FAIL，Exit 0 |
| Browser（五寬、點擊、Reduced Motion、截圖） | BLOCKED：Chromium launcher Exit 127，實際瀏覽器 binary 不存在，外層 Exit 1；未聲稱執行任何畫面案例 |
| 真人讀屏、效能實測、PR CI、正式部署 | 未完成；DC-007 既有阻擋不因此解除 |

原始回執、首次失敗與重驗記錄位於本輪 `/tmp/xk-dc008-evidence/`。修改範圍只有 Gallery 首屏、隔離樣式、圖片及文件；原三系列比較與正式根路徑未變。待實際瀏覽器驗證前不合併、部署。

## DC-008-02：根網址升級（後續版本）

依 Owner 指示將同一 Gateway 放於 `/` 既有 Modern 內容之前。Modern 的扇區及文字入口連到原主標 `/#home-title`，另外兩個維持原系列路徑。兩個入口頁各有唯一 h1，根頁原主標保留字階及原 id、調整為 h2。未增加 route、未搬動內容或 SEO canonical；仍為 49 頁。此次增量從 PR #47 head `e75feaa6d1c04a40a05ff74ddd16d840f63e6901` 開始。

- 使用未變更的已安裝依賴，重新執行 TypeScript、lint、436 unit tests、Normal build、Pages build，皆 Exit 0。
- 靜態檢查根頁及 Gallery 各三個 SVG href、唯一 h1、根頁 Gateway 在原主標之前，全部通過。
- Pages HTTP smoke：3,274 PASS、0 FAIL、Exit 0（網站 404 預覽 server）。本輪回執 `/tmp/xk-dc008-02-evidence/`。
- 無可用 Chromium binary，未完成手機與桌面瀏覽器、真人讀屏或效能驗收。保留 Draft，不稱正式部署成功。
