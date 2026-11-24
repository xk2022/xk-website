# Email 詢價、服務方案與展示子網域調整

延續草稿 PR #26，功能分支 `feature/homepage-inquiry-cta`；本輪前版本為 `4b67bdea84773d0034e835a0a572f47dd19abfc4`，main 基準 `a08c5d86ada6a5ae2600d56df42e7291a4d90abd`。前輪未提供管道的歷史驗收保留於 [首頁詢價入口報告](homepage-inquiry-cta.md)，不回寫舊時點為已可收件。

## 本輪依據與範圍

使用者提供 `system.xk2022@gmail.com`，並要求設計聯絡／回覆流程、配合 usecase 子網域修正連結、增加服務方案與價格引導。Email 以本輪提供之公開商務用途採用；沒有實寄、送達或閱讀驗證，也沒有建立 Gmail 自動回覆。

文件 Repository 只讀 main `cd9be948fe843c437d69ed635263a9527e931367`。網站方案 Blob `02a2685b81f23988fe49d6d0ea03f71fd8c40c43` 支持一頁式與企業形象方向並明示逐案報價；定價策略 Blob `59fea2a9d9805bbbfa7407a01ce5ce275a737a77` 為建議價格，未作本輪對外金額核准。網站功能／流程整合為既有能力的需求組合，並非固定套餐或現成產品。

已詢問是否有正式價格及 usecase 路徑；未提供數字時採「依需求報價」，不填建議金額、幣別、免費或回覆時限。實際成本以頁面內容、互動串接、部署維護範圍說明。

## 實作內容

- 首頁／Header／手機選單／Contact 與方案 CTA 使用同一個公開 Email，單一管道時顯示「立即詢價」。郵件程式帶入靜態需求提示，訪客自行確認寄出；本站沒有表單、代寄 API 或送達提示。
- Contact 保持六個主區塊，改為 Email → 需求釐清 → 方案報價三步；可見信箱供未設定郵件程式的訪客手動使用。
- 新增共用三方案區塊於 Home／Services；Services 另有 `#pricing-guide`。方案 CTA 主旨與內容帶入所選方向，未帶入訪客資料。
- 六品牌新網址由其來源 Repository 的 Pages 設定及實際 HTTPS GET 200／標題核對，保留原順序、圖片、展示性質、限制與 Planned 技術專案。
- 目前沒有 `usecase.xplorekaleidoscope.com` 的解析／可用路徑證據；先修正已確認的六個各案子網域，這個候選保留待確認。四模板的來源／署名及兩個 reference-only 狀態保留，沒有因首頁 200 就啟用缺素材項目。
- 公司 Canonical／OG／JSON-LD 仍為 www 自訂網域，Pages 根路徑、noindex／Privacy 草案保護、依賴及靜態架構保留。

| 作品 | 已驗證的新網址 |
| --- | --- |
| 三月手工湯包 | https://march.xplorekaleidoscope.com/ |
| 宏家燕窩 | https://honbird.xplorekaleidoscope.com/ |
| 御品園港式燒臘 | https://yupinyuan.xplorekaleidoscope.com/ |
| XK 一頁式網站建置 | https://web.xplorekaleidoscope.com/ |
| 宏能興業 | https://honest.xplorekaleidoscope.com/ |
| 千剛實業 | https://qiangang.xplorekaleidoscope.com/ |

## 驗收矩陣

| ID | Required 項目與預期 | 實際結果 | 證據 |
| --- | --- | --- | --- |
| CP-01 | npm ci，鎖定版本不變 | PASS，Exit 0、lockfile 未變 | commands/npm-ci.json |
| CP-02 | TypeScript／ESLint | PASS，兩程序 Exit 0 | commands/tsc.json、commands/lint.json |
| CP-03 | 無／單／多管道與 plan mailto 契約；唯一收件人、兩個 query keys、靜態空白提示 | PASS，9 cases、runner Exit 0 | contact-contract.json |
| CP-04 | 一般 build、15 公開路由 smoke、正常模式聚焦瀏覽器 | PASS，三程序 Exit 0；smoke 814／browser 48 | commands/build.json、commands/smoke-normal.json、commands/browser-normal.json |
| CP-05 | Pages build／守門、15 公開路由 smoke | PASS，兩程序 Exit 0；smoke 814 | commands/build-pages.json、commands/smoke-pages.json |
| CP-06 | Home／Services／Contact／Portfolio 五寬、mailto／方案／手機選單／Keyboard／Focus／Reduced Motion | PASS，20 layouts、14 journeys；Pages 49 tests／Exit 0 | browser-pages-result.json |
| CP-07 | 新增區塊的 targeted axe、Console／Runtime／資源 | PASS，每模式 7 scans，0 violations／0 incomplete；Console／Runtime／官網資源與提交錯誤 0 | browser-pages-result.json |
| CP-08 | 實際截圖與人工視覺檢查 | PASS，實際檢視 4 圖，0 blocking | visual-review.json |
| CP-09 | 六新域名 HTTP 與原始 Pages 來源核對 | PASS（只讀核對），原收集程序 Exit 0；不宣稱專案交付或素材全部重驗 | usecase-audit.json |
| CP-10 | PR head CI／artifact | PENDING | 實際完成後更新同一 PR Description |
| CP-11 | 真實寄信／收件、Gmail 規則與自動回覆 | N/A（未執行） | 本輪設計人工流程，未獲實寄或帳號設定指示，沒有送達／自動回覆宣稱 |
| CP-12 | 未核准金額與統一 usecase 入口 | PENDING | 等待使用者補充；目前僅使用個別報價與已驗證各案網址 |

品質指令使用 `scripts/run-with-evidence.py` 保存真實退出碼、環境與起訖時間；原失敗與重試不可覆寫。Mailto 測試攔截外部程式啟動，不寄信，僅驗證目標／範本與 click／Enter／選單關閉行為。這不是 SMTP 或端到端送達驗證。

## 操作文件與限制

人工處理、回覆範本與證據界線見 [商務聯絡與回覆流程](../contact-response-workflow.md)。既有 Privacy 未核准、分享圖／Sitemap 未發布，不因加入 Email 自動解鎖。沒有 Backend、API、Analytics、付款或額外套件，不修改文件 Repository、DNS／Pages 設定。

本輪先更新同一 PR 供 review，沒有自動合併／部署指示；本機、PR CI、main 與公開驗證分開記錄。實測完成後補本節的結果、指紋與附件。


## 實際結果、版本與重現

一般模式 48／48、Pages 49／49 測項完整結束，兩程序真實 Exit 0；各涵蓋四頁 × 320／375／768／1440／1920px 共 20 個版面。Home 320／375px 的主 CTA 完整位於 812px 高首屏。每模式 14 條 mailto 實際 click／Enter 均攔截外部程式啟動，驗證唯一收件人、靜態範本、方案 context 與手機選單關閉；沒有寄信、開啟外部郵件軟體或確認送達。

兩模式 smoke 各 814 PASS／0 FAIL，覆蓋 15 公開頁、Metadata／www／noindex、內鏈／錨點、資源／圖片及 Email／方案契約。每模式 7 次局部 axe 只針對新增詢價、方案、價格引導、聯絡管道與流程；0 violations／0 incomplete，不擴稱完整全站 WCAG／AT 稽核。

四張實際圖已人工檢視：Home1440 全頁、Home375 首屏、Services1440 方案區元素、Contact375 全頁。立即詢價、三張個別報價卡與信箱／流程可見，無重大裁切。長圖 viewer 縮小的細節限制、非全部寬度／展開狀態及未實寄的範圍依 visual-review.json，不由截圖推論收件成功。

Required 本機指令均成功；補充工具有 69 正負 fixtures 與 45 原生來源檢查，初次 inline harness 的字串 escape 錯誤記於其 harnessHistory，未改網站以消除工具錯誤，也未替補不存在的外層回執。Node.js 原生 TypeScript module-format 推斷提示保留在 log，沒有為移除提示更改套件或 module type。

受測程式／設定共 132 檔，指紋 `16ffe273829e269d6f457912767b5b7fae049dd4f4c53e9126f16d76ede115cd`；逐檔 bytes 在測後重驗未變。Node.js 24.22.1、npm 11.9.0、Linux x86_64、Chromium 156.0.8078.79。既有品牌圖、案例縮圖與技術專案狀態保留；本輪只驗證外連目的地，沒有宣稱所有來源站功能或素材重新驗收。

```sh
npm ci --cache /tmp/xk-npm-cache
npx tsc --noEmit
npm run lint
node /tmp/xk-contact-plans/contact-contract.mjs
npm run build
npm run start -- --hostname 127.0.0.1 --port 3190
npm run test:smoke -- --base-url http://127.0.0.1:3190/ --output /tmp/xk-contact-plans/smoke-normal-result.json
node /tmp/xk-contact-plans/browser.cjs normal final
# 一般模式完成、停止 server 後
npm run build:pages
python3 -m http.server 3191 --bind 127.0.0.1 --directory out
npm run test:smoke -- --base-url http://127.0.0.1:3191/ --output /tmp/xk-contact-plans/smoke-pages-result.json
node /tmp/xk-contact-plans/browser.cjs pages final
```

必要命令由既有 runner 包裝，原始命令、UTC 時間、真實退出碼與 log SHA 位於 [證據 manifest](contact-plans-artifacts/manifest.json)。規劃文件的內部試算金額不複製到本報告或附件；只保留最小來源版本與核准界線。完整新增／修改清單亦由 manifest 列出。

截圖：[首頁桌面](../screenshots/contact-plans/home-1440.png) · [首頁手機](../screenshots/contact-plans/home-375.png) · [方案區](../screenshots/contact-plans/services-plans-1440.png) · [聯絡頁手機](../screenshots/contact-plans/contact-375.png)。

PR CI、產物、合併及公開部署為報告提交後階段，實際結果更新同一 PR Description；提交內未完成項目不因 Push 就改寫成部署成功。
