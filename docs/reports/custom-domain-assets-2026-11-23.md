# 自訂網域資源路徑修正與驗證

日期：2026-11-23（Asia/Taipei）。分支：`fix/custom-domain-assets`。基準 main：`c124954582edc2af3a24c187c1c937a73035a851`。

## 問題與修正範圍

使用者指定正式網址 <https://www.xplorekaleidoscope.com/>，授權修正、驗證、Commit／Push 及確認 Pages 部署；透過 PR CI 與 main 部署交付，不直接推 main。線上修正前 HTML 仍引用 `/xk-website/_next/…` 與舊圖片路徑，資源回應 404；移除 Repo 前綴後實際回應 200。此時 Pages 已設定 www 自訂網域、核准 HTTPS 憑證及強制 HTTPS，問題是舊建置路徑。

本輪固定空 Base Path／Asset Prefix，集中正式 Origin，清除圖片與 robots 的 Repo fallback，並阻止 workflow 將 provider Repo path 再注入 build。Canonical、OG、metadataBase、WebSite JSON-LD 與 Privacy 草案網址統一為 www。既有設計、內容、靜態匯出與功能保留，未新增依賴或修改 lockfile、DNS、Pages 設定或其他 Repository。

分享圖片目前未發布、Sitemap 為受保護的 404，維持現況而非建立未經核准內容；Contact 沒有表單與真實收件管道，提交互動為 N/A，原有 CTA／導覽仍列 Required。網站沒有 Backend、Analytics 或新資料收集。

## 驗收矩陣

全部指令透過 `scripts/run-with-evidence.py` 保存真實退出碼與 log；失敗、修正、重試各用新檔。根路徑是本輪新契約，舊任務的 Repo Base Path 是歷史快照，不作本次預期。

| ID | 項目與預期 | 結果 | 證據 |
| --- | --- | --- | --- |
| DOM-01 | 修正前實際 CSS／JS／圖片：舊前綴 404、根路徑 200 | PASS（診斷完成，原故障重現），collector Exit 0 | preflight-live.json、preflight-live.receipt.json |
| DOM-02 | npm ci，鎖定套件安裝成功 | PASS，Exit 0，lockfile 未變 | npm-ci.json |
| DOM-03 | TypeScript、ESLint 無錯誤 | PASS，兩者 Exit 0 | tsc.json、lint.json |
| DOM-04 | 一般 build 與 15 公開頁根路徑 smoke／瀏覽器正常 | PASS，三程序 Exit 0；smoke 560、browser 75 項 | build.json、smoke-normal.json、browser-normal.json |
| DOM-05 | Pages build／15 頁靜態守門、HTML／CSS 資源完整 | PASS，Exit 0，251 檔靜態產物 | build-pages.json、local-artifact.json |
| DOM-06 | 空 env 成功；Repo path、網址等非空 env 在 build 前失敗 | PASS，9 實際程序正反案例、outer Exit 0；另 115 工具 fixtures 通過 | deployment-contract.json、deployment-contract-result.json、tool-checks.json |
| DOM-07 | Pages 15 頁、375／1440px、資源／圖片／導覽與互動、www Metadata 正確 | PASS，兩程序 Exit 0；smoke 560、browser 75 項、32 版面、136 個資源 | smoke-pages.json、browser-pages.json |
| DOM-08 | 實際桌面／手機截圖與人工樣式檢視 | PASS，實際檢視 2 圖，0 blocking | visual-review.json、screenshots |
| DOM-09 | PR head CI 與受測 artifact 一致 | PENDING | 實際完成後更新同一 PR |
| DOM-10 | main CI、Pages deployment SHA 與公開 CSS／JS／圖片／互動實測 | PENDING | 實際完成後更新同一 PR |
| DOM-11 | Contact 表單提交 | N/A | 現有網站無收件表單；沒有新增假表單 |
| DOM-12 | 分享圖與 Sitemap 網址 | N/A（未發布） | 維持無 image Metadata、sitemap.xml 404；現有品牌 URL 須為 www |

本輪部署變更不重做完整 axe／55 準則／真實 AT 或效能量測；必要的鍵盤、Focus、Reduced Motion 與互動仍實測。一般 build／server 完成後再執行 Pages build，不混用 `.next` 模式。實際完成後補入以下結果；遠端識別碼依既有工作流程記於同一 PR Description，避免循環提交。

## 結果、失敗與限制

- 正常與 Pages 均為 15 路由 × 375／1440px 共 30 個基本版面，另有 2 個展開狀態；每套 75 項必要測試均完整結束、0 FAIL。兩套 smoke 各 560 PASS，完整結束與 runner 真實 Exit 0。
- 每套瀏覽器實際查核 136 個 local CSS／JS／字型／圖片／favicon 資源的 HTTP 200 與 Content-Type；8 張可用作品預覽與本機檔案 SHA 相同，圖片有實際解碼與自然尺寸檢查。CSSOM 背景／字型及 runtime 載入的 JS 也納入資源清冊。
- 兩套 Console、Runtime、官網資源失敗均 0。原生收合、手機導覽、站內路由／錨點、Keyboard／Focus／Reduced Motion、6 個 protected／unknown 404 與無表單聯絡狀態皆實測。
- 正式本機驗收未發現 FAIL；修正前線上四種資源（CSS、JS、圖片、favicon）的 404／200 對照仍保留，不改寫成當時官網已通過。工具 fixtures 中預期非零代表守門機制測試，與網站驗收失敗分開。
- Node.js 24 對原生 TypeScript ES module 有非阻斷格式推斷警告，完整 log 保留；未為移除提示改 package type、套件或 lockfile。此提示不影響 build Exit 0 或靜態資源。
- 人工實際檢視 Pages 首頁 1440px 與作品頁 375px 全頁圖，無重大裁切／溢位或可見資源缺漏；長圖在 viewer 縮小的細節限制及各圖 SHA 記於 visual-review.json，不擴稱其他頁逐張人工檢查。
- 額外 115 fixtures／CLI 負向 JSON 沒有獨立外層 runner receipt，保留此證據限制；本輪 Required 設定驗收以 Root 的 9 個實際子程序案例與 Exit 0 回執為準，沒有補造退出紀錄。
- PR 前文件快照的 CI／main／公開網址結果維持 PENDING；真正完成後更新同一 PR Description，與本機結果分開。

## 操作與重現

見 [自訂網域部署指南](../04_deployment/custom-domain-deployment.md)。本輪來源與原始證據封存在 `custom-domain-assets-artifacts/`，大型 JSON／log／工具無損壓縮；命令與 SHA 由 manifest 對應。


## 版本與實際指令

環境：Linux x86_64、Node.js 24.22.1、npm 11.9.0、Chromium 156.0.8078.79。最終程式／設定／工具 128 檔 byte 指紋：`ad1677760ed618e0bc07533a96cf1c106fd16e06091e5718c8e4b870bf1dee6e`，逐檔 SHA 見 source.json。Next.js 16.4.6、React 19.3.1、TypeScript／Tailwind 與依賴未變。

```sh
npm ci --cache /tmp/xk-npm-cache
npx tsc --noEmit
npm run lint
npm run build
npm run start -- --hostname 127.0.0.1 --port 3170
npm run test:smoke -- --base-url http://127.0.0.1:3170/ --output /tmp/xk-domain-fix/smoke-normal-result.json
node /tmp/xk-domain-fix/browser.cjs normal final
# 停止一般 server 後
npm run build:pages
python3 -m http.server 3171 --bind 127.0.0.1 --directory out
npm run test:smoke -- --base-url http://127.0.0.1:3171/ --output /tmp/xk-domain-fix/smoke-pages-result.json
node /tmp/xk-domain-fix/browser.cjs pages final
python3 /tmp/xk-domain-fix/check-deployment.py
```

需要真實退出證據的檢查均由 run-with-evidence.py 包裝；server 啟動與停止由 Root 單一管理。沒有重跑歷史任務或變更網站設計來通過測試。

證據入口：[manifest](custom-domain-assets-artifacts/manifest.json)；工具與大型結果以 `.gz` 無損保存，邏輯檔名對應由 manifest 查找。新增／修改路徑亦列於 manifest。

代表截圖：[首頁桌面](../screenshots/custom-domain-assets/home-1440.png)、[作品頁手機](../screenshots/custom-domain-assets/portfolio-375.png)。
