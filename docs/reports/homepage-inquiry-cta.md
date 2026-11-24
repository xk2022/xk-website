# 首頁詢價動線改善與驗證

基準：main `a08c5d86ada6a5ae2600d56df42e7291a4d90abd`。分支：`feature/homepage-inquiry-cta`。

## 範圍與內容依據

使用者提出「首頁缺少明確的立即詢價入口」，第 2 項尚未提供內容。本輪先改善第 1 項的入口層級，不自行擴張其他功能。已詢問第 2 項與真實可公開、可接收詢價的管道；未回覆的資料不猜填。

現行 `verifiedContactChannels` 為空。只讀核對文件 Repository main `cd9be948fe843c437d69ed635263a9527e931367`，`doc/98_decisions/2026-11-20.md` Blob `05ad95868a54c463699beb7f24d6ea784a5da609` 第 152 行仍明載「聯絡資訊（尚無收件管道）」。品牌與其他現行資料未提供正式收件核准，因此本輪保留空清單，不建立表單、假信箱或假收件結果。

## 實作

- Hero 第一個深色主動作為詢價入口，第二個保留探索服務，作品改為獨立文字連結。英文 Tagline／Slogan 與服務標籤保留，調整至主要行動後，讓手機較早看到主按鈕。
- Header 桌面、手機選單及首頁底部沿用同一個 `InquiryButton` 與 `getInquiryAction`；保留手機 disclosure 的關閉／Escape／焦點行為，不新增浮動遮蓋列。
- 無管道時顯示「詢價前準備」，連到現有 `/contact#contact-preparation`，並於 Hero／底部可見說明目前尚未開放收件。
- 單一正式管道確認後才顯示「立即詢價」並直連核准的 Email／HTTPS；多管道時導向現有聯絡管道選擇區。不承諾免費、報價／回覆時限或未確認價格。
- 既有三項需求準備、服務／作品／聯絡頁、品牌 Tokens／Logo、www 根路徑靜態部署、Metadata／noindex、Privacy 狀態及依賴保留。

這是可用的需求準備動線改善，**真正可收件的立即詢價仍為 BLOCKED**。不要因畫面已有按鈕就宣稱已可提交需求。

## 驗收矩陣

Required 檢查由 `scripts/run-with-evidence.py` 保存實際退出碼，原始 JSON／log／失敗／重試分開保留。此次只改詢價動線與共用 Header 的文字／連結，不重跑歷史效能、完整 WCAG／AT 稽核或部署修正任務。

| ID | 項目／預期 | 實際結果 | 證據 |
| --- | --- | --- | --- |
| INQ-01 | npm ci；鎖定套件及 lockfile 保留 | PASS，Exit 0、lockfile 未變 | commands/npm-ci.json |
| INQ-02 | TypeScript、ESLint | PASS，兩者 Exit 0 | commands/tsc.json、commands/lint.json |
| INQ-03 | 無／單一／多管道 CTA 契約；合成管道不寫入正式設定 | PASS，5 cases、runner Exit 0 | inquiry-contract.json |
| INQ-04 | 一般 Next.js build、production smoke、focused browser | PASS，三程序 Exit 0；smoke 560、browser 28 | commands/build.json、commands/smoke-normal.json、commands/browser-normal.json |
| INQ-05 | Pages build、靜態守門、15 公開頁 smoke | PASS，兩程序 Exit 0；smoke 560 | commands/build-pages.json、commands/smoke-pages.json |
| INQ-06 | Home／About／Contact 五寬、CTA 目的地、手機選單、Keyboard／Focus／Reduced Motion | PASS，15 layouts、6 journeys，最終 29 tests／Exit 0 | browser-pages-corrected-result.json |
| INQ-07 | 新增 CTA 控制項的 targeted axe、Console／Runtime／資源及代表截圖 | PASS，每模式 3 scans／0 violations／0 incomplete，0 runtime／console／資源錯誤；2 圖人工覆核 | browser-pages-corrected-result.json、visual-review.json |
| INQ-08 | 正式詢價收件 | BLOCKED | 缺少已確認公開且可收件管道；沒有寄送測試或表單成功宣稱 |
| INQ-09 | 使用者第 2 項 | PENDING | 原訊息未提供內容，已詢問 |
| INQ-10 | PR CI／合併／部署 | PENDING | 本輪未沿用上次部署修正的發布授權；實際遠端結果更新同一 PR |

## 檔案與重現

主要程式檔：`src/config/inquiry.ts`、`src/components/layout/inquiry-button.tsx`、`site-header.tsx`、`mobile-navigation.tsx`、`src/components/sections/home-hero.tsx`、`home-contact-cta.tsx`、`src/components/sections/contact/contact-preparation.tsx`。完整修改清單、來源指紋、命令／環境／起訖時間見附件 manifest。

```sh
npm ci --cache /tmp/xk-npm-cache
npx tsc --noEmit
npm run lint
npm run build
npm run start -- --hostname 127.0.0.1 --port 3180
npm run test:smoke -- --base-url http://127.0.0.1:3180/ --output /tmp/xk-inquiry-cta/smoke-normal-result.json
# 一般模式驗收完成並停止 server 後
npm run build:pages
python3 -m http.server 3181 --bind 127.0.0.1 --directory out
npm run test:smoke -- --base-url http://127.0.0.1:3181/ --output /tmp/xk-inquiry-cta/smoke-pages-result.json
```

## 實際結果與限制

一般模式 28／28、Pages 最終 29／29 測項通過，具有完整結束標記與真實 Exit 0。兩模式各包含 Home／About／Contact × 320／375／768／1440／1920px 共 15 個版面；320／375px 在 812px 高的第一屏完整看得到主 CTA。六條實際 click／Enter 路徑抵達需求準備區，包含手機選單點擊及 Enter 後關閉；不是僅檢查 href 字串。

Targeted axe 僅掃描新增的 `[data-inquiry-state]` 控制項，包含 375／1440px 關閉狀態與 375px 展開選單，各模式 3 次，無違規／人工候選；不能當成全頁／全站 WCAG 或真實 AT 認證。原 15 公開路由、連結／錨點、Metadata／noindex 與資源另由 smoke 各 560 PASS 回歸。

Pages 首輪有 28 PASS／1 FAIL、真實 Exit 1：驗收工具把作品文字連結的 href 固定預期為 `/portfolio`，但 Pages `trailingSlash` 正常輸出 `/portfolio/`。修正為精確的模式預期後，重跑短 Pages focused suite，29／29 PASS、Exit 0；網站原始碼與 build 未改，所以沒有重跑 npm ci／typecheck／build。原結果／log、前後工具快照、修正原因均保留，沒有覆寫或降低 URL 守門。

實際檢視首頁 1440px 全頁及 375px 首屏，CTA 與未開放收件說明清楚，未見重大裁切／重疊，0 blocking。重試兩張圖與受檢原圖逐 byte 相同，採一次 SHA bridge 連結既有人工判定，未冒稱重新看過其他頁面。375px 圖不代替 320px 或完整無障礙人工驗收。

最終程式／設定範圍 129 檔指紋：`e2afb21b7d8eac5bd797aa180d66ab0bbe656f4b3fc894cc1ce8feb752b3a371`。Node.js 24.22.1、npm 11.9.0、Linux x86_64、Chromium 156.0.8078.79。品質／瀏覽器檢查後逐檔確認來源未變；來源核對及純文件／證據封裝不觸發無關網站重測。

真正收件仍為 BLOCKED，第 2 項仍為 PENDING。本輪沒有沿用上次部署修正的合併／發布授權；技術變更先供 review，不能把未發布分支說成已更新正式網站。


## 證據與截圖

[Manifest](homepage-inquiry-artifacts/manifest.json) 提供命令、真實退出碼、UTC 起訖、原始結果與 raw／archive SHA；大型 JSON／log／工具無損壓縮。`source.json` 記錄逐檔 bytes，來源文件 Commit／Blob 另有只讀證據。合成 Email／HTTPS 均使用 `.invalid`，沒有寫入正式設定或發送請求。

[首頁桌面](../screenshots/homepage-inquiry/home-1440.png) · [手機首屏](../screenshots/homepage-inquiry/home-375.png)。PR 前報告快照與之後真正發生的 PR CI／合併／部署分開，後續識別碼更新同一 PR Description。
