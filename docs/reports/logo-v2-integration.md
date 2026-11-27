# Logo V2.0 官網整合驗收

日期：2026-11-27；基準 SHA：`ee4b4709a9f8daa755e2595a46c158b3c92d8229`；分支：`feature/website-logo-v2`。

公司核准母稿與衍生素材來源見 [Logo 素材紀錄](../../public/brand/source/README.md)。V1 四份 SVG 與既有瀏覽器圖示 byte-preserving 移入 v1；V2 八款 SVG、母稿及 favicon 三種檔以公司原始 bytes 納入。Modern SVG 元件及舊暫定標註同步更新，Heritage／Luxury 和 Quotation 直接使用原檔，品牌圖形與 UI 色彩規則分開。三套原本的版面、內容、導航、法律資訊與部署設定保持。歷史審閱 HTML 指向封存版本；歷史驗收證據不改寫。

## 實際本機驗收

Node 24.22.3、npm 11.19.1、Next.js 16.4.6；各長指令由既有 run-with-evidence 保存程序退出結果。

| 檢查 | 結果 | Exit |
| --- | --- | --- |
| npm ci | PASS | 0 |
| npx tsc --noEmit | PASS | 0 |
| npm run lint | PASS | 0 |
| npm test | PASS，436 項 | 0 |
| npm run build | PASS | 0 |
| npm run build:pages | PASS，正式靜態驗證完成 | 0 |
| Normal HTTP/HTML smoke | PASS，3,402 項、2 N/A | 0 |
| Pages HTTP/HTML smoke | PASS，3,402 項 | 0 |
| Pages Chromium 158 品牌版位 | PASS，30 組 | 0 |

Browser 品牌驗收範圍涵蓋三系列首頁及報價頁、320／375／768／1440／1920 px。每組核對 Header/Footer V2 圖示、渲染位置、圖片載入、無 V1 active reference、無水平溢出、頁面無 JavaScript 例外。保存 [30 組結果](logo-v2-artifacts/browser-results.json)。這是品牌變更專項檢查，並未重跑所有網站的完整 axe 或輔助科技人工矩陣。

初次 HTTP 測試因跨執行程序的 localhost 不可用而失敗，改採同一程序啟動與驗證後通過。第一次 Pages HTTP 測試使用 Python 預設 404 內容，27 個 404 frame 驗證失敗；以實際建置的 404.html 模擬 Pages 404 回應後全過。預裝 Chromium 路徑失效，Playwright CDN 回傳 403，故使用隔離的 npm Chromium runtime，未改動專案 dependencies。Browser 首次測試 10 組 lazy footer 圖片尚未 decode；等候瀏覽器 image.decode() 後重驗 30 組全部通過，未藉此修改應用或隱藏失敗。

合併、遠端 CI 與部署屬後續獨立階段；本輪僅交付 PR 審閱。印刷打樣仍未驗證。
