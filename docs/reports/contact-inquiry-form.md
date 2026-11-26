# Contact 頁面與需求整理表單

日期：2026-11-25（Asia/Taipei）。網站 Repository 唯一修改；文件 Repository 未變更。

## 範圍與版本

- Base：`main@1e16144c21a848399e2986948d4239481672f12c`，fresh fetch 且初始工作樹乾淨。
- Branch：`feature/contact-inquiry-form`。本輪沒有自動合併／部署授權，不沿用其他任務的 Merge 指示。
- 本輪輸入：優化 Contact，提供商務 Email `system.xk2022@gmail.com`，建立線上詢問表單。
- 目前沒有可用收件端點；已向 owner 詢問。先交付本地需求整理表單，**直接線上送出、真實收件與第三方服務啟用為 BLOCKED**，不宣稱整項線上收件需求已完成。

## 已實作契約

1. Hero 新增「填寫詢問內容」到 `#contact-form`；保留直接 Email、方案導覽及既有錨點。
2. 四欄：稱呼選填最多 80 字；回覆 Email 必填最多 254 字；服務方向選填、沿用五類 Services；需求摘要 trim 後至少 10 字、原始輸入最多 2000 字。不收電話、附件或新增行銷同意。
3. 前端驗證、可聚焦錯誤摘要、欄位錯誤及文字提示；失敗保留輸入，修改後取消舊預覽。
4. 預覽後可複製完整內容，或開啟郵件草稿。唯一收件人來自現有 verified registry；subject/body 編碼，不新增 cc/bcc。mailto 超過 1800 字元時只提供完整複製，不截斷內容。
5. Clipboard 成功才顯示已複製；拒絕／不支援則選取文字並提示手動複製。Email 卡另有複製信箱。
6. 輸入僅在目前頁面記憶體；無 fetch、HTTP 表單 action、表單欄位 name、持久儲存或自動寄信。SSR 提交按鈕先 disabled，沒有 JavaScript 時使用可見 Email，不把個資帶到頁面 Query。
7. 頁面明示尚未提供站內直接送出；沒有已送達、已閱讀、自動回覆或 SLA 宣稱。Privacy 保持草案與公開 404，noindex/nofollow、www 根路徑與雙模式 build 不變。

## 驗收矩陣

實際命令透過 `scripts/run-with-evidence.py` 保存真實 Exit Code；原始資料放 `/tmp/xk-contact-form-20261125/`。以下初始結果在執行後更新，不借用歷史 PASS。

| Test ID | 項目／預期 | 實際結果 | Exit Code | 證據 |
| --- | --- | --- | --- | --- |
| CF-01 | npm ci、鎖定套件與 lockfile 不變 | PASS，npm ci 使用可寫入的 /tmp cache，無套件／lockfile 修改 | 0 | npm-ci.json |
| CF-02 | TypeScript、ESLint | PASS，ARIA 修正後兩項重新執行 | 0／0 | tsc-v2.json、lint-v2.json |
| CF-03 | 原生欄位、編碼、唯一收件人、長文字契約 | PASS，26 cases；另 62 個 SSR 正負案例 | 0／0 | native-contract.json、validator-fixtures.json |
| CF-04 | 一般 build 與 15 路由 HTTP／靜態契約 | PASS，最新一般 build、824 smoke checks | 0／0 | build-v2.json、smoke-normal-v2.json |
| CF-05 | Pages build 與 15 路由 HTTP／根路徑契約 | PASS，靜態守門及 824 smoke checks | 0／0 | build-pages.json、smoke-pages.json |
| CF-06 | Contact 五寬、Home／Services 導覽回歸、鍵盤與 Reduced Motion | PASS，兩模式各 9 個版面；本列不將 Pages 整套工具的網路分類 FAIL 改寫為 PASS | normal 0；Pages 原 suite 1，相關個別案例 PASS | browser-normal-v2.json、browser-pages-v2.json |
| CF-07 | 錯誤／預覽／修改／長內容／複製成功與拒絕／無 JS | PASS，兩模式對應互動 assertions 完成，無真實寄送 | 同上 | 同上 |
| CF-08 | 局部 axe、Console／Runtime／資源；輸入不進網站 HTTP／持久儲存 | PASS，以完整 UI 個別斷言＋精確網路補驗組合驗收；不宣稱原 Pages suite 通過 | normal 0；Pages 原 suite 1，補驗 0 | browser-normal-v2.json、browser-pages-v2.json、pages-network-reconcile.receipt.json |
| CF-09 | 實際桌面、手機、錯誤狀態截圖與人工檢視 | PASS，四張實圖已檢視，0 blocking；v2 截圖逐 byte 相同 | screenshot assertions PASS；人工檢視無程序退出碼 | docs/screenshots/contact-inquiry/、visual-review.json、screenshot-source-bridge.json |
| CF-10 | 真實站內提交及收件 | BLOCKED：缺收件服務、資料契約與受控驗收 | — | owner 問題待覆 |

環境：Linux x86_64、Node.js v24.22.1、npm 11.9.0、Python 3.12.14、Chromium 156.0.8078.79。Contact 使用 320／375／768／1440／1920px，Home／Services 使用 375／1440px，viewport height 812，Reduced Motion 為 reduce。一般服務 3200、Pages 靜態預覽 3201，依序運行；沒有同時覆寫 .next。

一般 focused suite 最後 32 項完整 PASS／真實 Exit 0；Pages 各項互動／截圖／axe 完成，整套工具的剩餘網路分類依下節補驗，不混稱同一結果。每模式 6 次局部 axe（valid/error/draft × 375/1440），最新皆 0 violations、0 incomplete；沒有重跑全站 AT／完整 WCAG 認證。各原始 Test ID 包含 expected／actual、程序、環境及錯誤，外層回執提供真實 Exit Code。

## 失敗、修正與重驗界線

- 初次啟動 loopback server 在預設 sandbox 得到 `listen EPERM`、實際 Exit 1；使用必要 network 權限後正常 Ready。這是測試環境權限，不當成網站測試 PASS。
- 初次 normal suite 完整結束但 Exit 1：30 項 PASS、1 項 FAIL，6 次 axe 的 violations 為 0、incomplete 為 4。錯誤摘要及預覽的 generic div 不宜直接帶 aria-labelledby，已補明確 `role="group"`，讓焦點與名稱具有適當語意；原 incomplete 沒有改寫為 PASS。
- 同次唯一 FAIL 是工具把 `javaScriptEnabled:false` 導致的 `no-js + script + csp` 當成產品資源錯誤。只將這個精確情況分類為預期停用腳本，其餘 CSP／資源仍判 FAIL。
- ARIA 兩處修正後重新執行 TypeScript、lint、一般 build／824 smoke 與完整 focused browser。正常模式最後為 32 PASS、6 次 axe、0 violations、0 incomplete，真實 Exit 0。新增 Email 地址的真實 Clipboard／明示拒絕案例；原失敗及工具版本快照保留。
- 第一次 Pages focused suite 的互動、6 次 axe 與四張截圖完成；總結果仍為 FAIL，因靜態 Next Link 預載的取消請求被工具誤判。後續核對實際 request headers 並更新工具分類，未改網站來消除工具誤判。
- 唯讀最小診斷確認 Next 安裝版本 `cache.js` 的靜態 export 先以 HEAD 探查 HTML，再以帶 rsc、next-router-prefetch、next-router-segment-prefetch headers 的 GET 載入同路由 RSC tree。第一次分類修正後 Pages v2 仍真實 Exit 1：153 個具原始 2xx HTML 與成功 companion 的探查已辨識，另 8 個取消探查的原 response 為 null。保留兩次 FAIL，不假稱這 8 個原探查曾回應 200；只針對尚未解釋的紀錄另做驗證。
- 獨立 `reconcile-pages-network.py` 補驗真實 Exit 0：先驗原 suite 33 項完整、只有最後網路分類一項 FAIL、其餘 32 項 PASS、6 次 axe 為 0／0，以及 0 Console／Runtime／PII／其他資源錯誤；再對 8 個 null-response HEAD 逐筆檢查方法／來源／路由／取消型態、原有同路由成功 RSC 三 headers 證據，並實際重新 HEAD。八次均為 `200 text/html`，UTC 02:01:44.624–02:01:44.641。補驗保存原 error、原 response UNKNOWN 與每次新回應，不混稱原探查成功，也確認原結果／receipt／log bytes 未改。
- 最終 Pages 採「32 項原 UI／axe／截圖斷言 PASS ＋ 8 次具體網路補驗 PASS」的組合驗收；原整套 Pages v2 仍為 FAIL／Exit 1。產品原始資源標準沒有降低，沒有略過未知錯誤；不因單一工具分類修正重跑無關 UI 或 build。
- 最初 source 為 142 檔、指紋 `facc082e67711d5f13c90f1b9a19158de784a8b684754f2ddfac84cec4373253`；ARIA 修正版為 `13ca5681dc4e05dbac055a04b13b25636f8d6ba564d9fd763ff45a2df62827e5`。只有表單兩處角色改變；npm ci、原生 helper 契約及 SSR 正負 fixtures 的適用輸入未變，保留既有本輪結果，不假稱重跑。
- 證據封裝第一次完整性檢查在 stage 前發現文字模式正規化 CR 換行，造成封裝內容與原 log SHA 不同；已改從原始 bytes 解碼，74 筆文字重新逐筆核對 SHA。原始 log／程序結果未改，封裝修正紀錄及舊 manifest 保留；屬證據工具修正，不重跑網站。

瀏覽器測試只認證站內準備流程：mailto 的實際 click／Enter 會被攔截，並未開啟外部郵件程式；郵件程式的資料處理、寄送與收件不在已驗收範圍。Clipboard 成功有實際 API write/read-back，拒絕情況是明示的 NotAllowedError fixture，不冒充作業系統拒絕測試。

原始命令、失敗、工具版本、結果、補驗與 SHA 見 [證據說明](contact-inquiry-artifacts/README.md) 及 [manifest](contact-inquiry-artifacts/manifest.json)。純報告／遠端紀錄不觸發網站重驗；新的真實功能變更仍需依影響重驗。

## 真實截圖

- [桌面 Contact](../screenshots/contact-inquiry/contact-1440.png)
- [手機 Contact](../screenshots/contact-inquiry/contact-375.png)
- [手機欄位錯誤](../screenshots/contact-inquiry/contact-error-375.png)
- [手機郵件預覽](../screenshots/contact-inquiry/contact-draft-375.png)

人工檢視是第一次 Pages 圖片的實際檢視；v2 四圖已逐 byte 比對相同，以同一份紀錄橋接，不冒充另一次人工檢視。長圖縮放僅確認全頁版面，未逐字／逐像素認證；完整輸入與複製由功能測試證實。

## 修改檔案

新增 `src/config/contact-inquiry.ts`、`src/lib/contact-inquiry.ts`、Contact 表單 Server wrapper／Client 元件、複製信箱元件及 `scripts/test-contact-inquiry.mjs`。修改 Contact route／Hero／渠道／data-note 設定、共用 InquiryButton 的可選 variant、Pages guard／smoke／獨立 fixture、Tailwind 報告排除，以及 README／AGENTS／實作與回覆文件。最終 reviewed Git Diff 共 27 檔：

```text
AGENTS.md
README.md
docs/02_operations/contact-response-workflow.md
docs/98_decisions/implementation-notes.md
docs/reports/contact-inquiry-artifacts/README.md
docs/reports/contact-inquiry-artifacts/evidence.json.gz
docs/reports/contact-inquiry-artifacts/manifest.json
docs/reports/contact-inquiry-form.md
docs/screenshots/contact-inquiry/contact-1440.png
docs/screenshots/contact-inquiry/contact-375.png
docs/screenshots/contact-inquiry/contact-draft-375.png
docs/screenshots/contact-inquiry/contact-error-375.png
scripts/build-github-pages.mjs
scripts/fixtures/contact-contract.json
scripts/smoke-website.py
scripts/test-contact-inquiry.mjs
src/app/contact/page.tsx
src/app/globals.css
src/components/layout/inquiry-button.tsx
src/components/sections/contact/contact-channels.tsx
src/components/sections/contact/contact-copy-email.tsx
src/components/sections/contact/contact-hero.tsx
src/components/sections/contact/contact-inquiry-form.tsx
src/components/sections/contact/contact-inquiry.tsx
src/config/contact-inquiry.ts
src/config/contact-page.ts
src/lib/contact-inquiry.ts
```

## 待確認與交付界線

- Owner 提供已建立的 Formspree／其他實際收件端點及服務帳號對象；不以示例 URL 或公開 Gmail 地址猜測第三方服務。
- 確認 schema、請求／回應與來源限制、服務端防濫用、費用與資料處理告知；不自行編造保存期限、法律核准或對外發布草案政策。
- 明確授權受控測試資料與收件對象後，實測接受、失敗／離線／逾時／429 及真實收件，再啟用「直接送出」。目前草稿／複製的成功不替代這些證據。
- Commit／Push／PR／CI／Merge／部署尚未發生時為 PENDING；不得把本機結果稱作線上發布。
