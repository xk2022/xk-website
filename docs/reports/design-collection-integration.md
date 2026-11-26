# Design Collection｜功能分支合併與整合紀錄

日期：2026-11-26（Asia/Taipei）。本報告記錄已獲授權的合併階段，不取代 [DC-004 完整驗證](dc004-implementation.md)、[DC-005 工作包](../task/dc005.md) 或後續 DC-006 的獨立驗收。

使用者已明確指示先合併 [Heritage PR #40](https://github.com/xk2022/xk-website/pull/40)、再合併 [Luxury PR #42](https://github.com/xk2022/xk-website/pull/42)，之後執行 DC-006。這項授權已成立，毋須重複請批；DC-006 仍須另立 PR 供審閱，未獲其新 PR 的自動合併授權。

## Heritage：版本與變更界線

本階段將原受驗收 Heritage head `504dca10a4abe2eec9ab7bd607c6b91c8e63e293` 與已核准的 `main@4500ccf7c2b6c1bd4b906458f40e688a0fde5a4e` 整合。正式 main 在此快照仍為 Modern 16＋Gallery，共 17 頁；本次 Heritage 交付為 Modern 16＋Gallery＋Heritage 16，共 33 頁。Luxury 完整功能尚未引入。

主線已包含 [PR #41](https://github.com/xk2022/xk-website/pull/41) 的 Luxury v1 品牌核准與前置文件，以及已核准 [PR #43](https://github.com/xk2022/xk-website/pull/43) 的五個品牌來源 Hub URL 修正。此次另以獨立 HTTP 程序重新查驗五個新 Hub，均為 200 且品牌標題正確（`hub-recheck.json`、實際 Exit 0）；網站 HTTP smoke 本身不對外站發出請求。

`source-bridge.json` 記錄相對原 Heritage head 僅三個 runtime／設定／驗證檔案改變，並保存各檔 before／after SHA-256：

| 檔案 | 實際差異／界線 |
| --- | --- |
| `src/config/website-showcases.ts` | 承接已合併 PR #43 的五個品牌來源 URL |
| `scripts/test-design-collection-content.mjs` | 對應來源 URL 的獨立預期值；未降低內容驗證條件 |
| `src/app/globals.css` | 文件來源掃描排除與註解的衝突整合；未新增產品樣式規則 |

其他 runtime／public 原始 bytes 與原受驗收 head 相同，包括 Contact、Quotation、列印、tokens 與 frames。文件衝突保留兩分支必要內容及歷史快照。原完整功能／五寬／互動／A4 等證據，只在上述 byte 比對及實際 diff 的未受影響範圍內沿用；它們不是此次重新執行的完整 suite，也不單憑 source 相同推論新 build 產物逐位元相同。此次新結果僅限下表與後續實際補記。

## Heritage：此次實際執行

收據以 `subprocess.Popen.wait()` 記錄 OS 程序退出碼；完整 argv、開始／結束時間、環境與 log SHA 位於各 JSON。預定封存於 [Heritage 整合證據](design-collection-integration-artifacts/heritage/)；JSON receipts 保持原檔，log／tools 以 gzip 保存原 bytes。附件以 manifest 的 encoded／decoded SHA-256 對照原始 bytes；原失敗收據保持不變。

| 指令／程序 | 實際 Exit | 本次結果 | receipt／結果檔名 |
| --- | --- | --- | --- |
| `npm ci --cache /tmp/xk-npm-cache` | 0 | 完成；沒有更改 lockfile | `npm-ci.json`／`npm-ci.log.gz` |
| `npx next typegen` | 0 | 重新產生忽略的路由型別 | `typegen.json`／`typegen.log.gz` |
| `npx tsc --noEmit` | 0 | PASS | `typescript.json`／`typescript.log.gz` |
| `npm run lint` | 0 | PASS | `lint.json`／`lint.log.gz` |
| `npm test` | 0 | PASS；內容／路由等原測試保留 | `test.json`／`test.log.gz` |
| `npm run build` | 0 | 普通 production build 完成 | `build-normal.json`／`build-normal.log.gz` |
| `python3 scripts/smoke-website.py --base-url http://127.0.0.1:3272/ --output …` | 0 | 2,329 PASS、2 N/A，`complete: true` | `http-normal.json`／`http-normal-result.json.gz`／`http-normal.log.gz` |
| `node merge1-regression.cjs normal http://127.0.0.1:3272/ final …` | **2** | **MANUAL_PENDING**；38 個 incomplete 保留，另附人工補充判定 | `browser-normal.json`／`browser-normal-result.json.gz`／`browser-normal.log.gz` |

表中省略的輸出與輸入路徑以 receipt 的完整 argv 為準；瀏覽器使用獨立 `fixture-merge1.json`、`contract-merge1.json` 及 `source-bridge.json`。Node 既有 typeless-module 提示保留在 log，未為消除提示修改 package type。

HTTP 的 2 N/A 僅限普通 Next 私有 error shell 的原始 SSR frame 判定，不是排除整個錯誤頁或保護路由。

此次瀏覽器範圍為 Modern／Heritage 的 Home、Portfolio 與六品牌詳頁：320／375／1440px 共 48 個 layout；另外完成 8 次 axe、兩風格品牌詳頁鍵盤與嚴格被動網路觀測，合計 59／59 測項，工具計數 `failures: 0`。axe 的 38 個 incomplete 均為 Modern Portfolio／千剛品牌詳頁在 375／1440px 的 `color-contrast` 待判讀節點。工具以 Exit 2 保留人工門檻，不能寫成整套 PASS、零 incomplete 或完整無障礙驗收完成；後續人工補充須逐節點附判定證據，原結果保持不變。

## Heritage：Pages 與人工補充

| 指令／程序 | 實際 Exit | 結果 | 證據 |
| --- | --- | --- | --- |
| `npm run build:pages` | 0 | PASS；33 公開頁，www 根路徑靜態輸出 | `build-pages.json`／`.log.gz` |
| Pages HTTP smoke（3273） | 0 | 2,329 PASS、complete true | `http-pages.json`／`http-pages-result.json.gz` |
| Pages 定向瀏覽器 | 2 | 59/59 測項、48 layouts、8 axe、0 assertion FAIL；38 incomplete | `browser-pages.json`／`browser-pages-result.json.gz` |
| 本地實際 Pages artifact checker | 0 | 1,258/1,258 PASS；403 files／163 runtime，Footer33、SEO、原 Logo、資源及保護路徑 | `local-artifact-check.receipt.json`／`local-artifact-check.json` |
| normal／Pages incomplete focused collector | 各 0 | 各 4 組、38/38 targets；只是補採，不代表 axe 自動通過 | `manual/incomplete-{mode}-final-command.json`、各 mode `evidence.json.gz` |
| normal／Pages 逐 target 人工判讀 | 各 0 | 各 30 gradient、6 完全遮覆、2 部分遮覆；保守 contrast 下限最小 5.1333，達各節點必要門檻 | `manual/incomplete-{mode}-adjudication.json.gz` 及 command／log |

人工判讀使用每個真實 target 的 foreground、字級、背景色、實際漸層、裝飾層與 menu shadow 合成界限。六個完全遮覆節點另外對照 closed 同 target 正常呈現與 open 9/9 hit；兩個部分遮覆 badge 另計露出區及 8% menu shadow 的最差界限。這不是忽略整條 axe rule，也不把自動 Exit 2 或 38 incomplete 改成 0。兩種模式的實際補採與判讀分別保存；可判定本次合併受影響範圍無待修正對比失敗，不宣稱完整 WCAG 或真人輔助科技驗收。

## 待完成階段與合併順序

| 階段 | 此快照狀態 |
| --- | --- |
| Heritage 普通瀏覽器人工判讀 | **完成**：保留 Exit 2／38 incomplete；兩模式各逐 target 補採及判讀已完成 |
| Heritage Pages build／HTTP／定向瀏覽器 | **完成**：build／HTTP Exit 0；browser Exit 2 的人工門檻已另判讀 |
| 封存／文件與相對連結最終檢查 | **完成**：附件及 manifest 封存；最終格式、連結與 lint 另有收據 |
| PR #40 最終精確 head CI／artifact | **PENDING**：不能沿用舊 head 的 CI 成功 |
| PR #40 實際 merge／main CI／Pages deploy／公開驗證 | **PENDING**：已獲授權，仍須依實際事件記錄 |
| PR #42 整合當時最新 main、必要重驗與合併 | **PENDING**：在 PR #40 實際合併後執行，目標清冊 49 頁 |
| DC-006 新功能 PR | **PENDING**：兩個前置 PR 實際合併後實作與驗收；新 PR 供審閱，不自動合併 |

PR #40 先形成 33 頁交付，再由 PR #42 加入 Luxury，形成 Modern／Heritage／Luxury 各 16 頁與 Gallery 的 49 頁清冊。清冊目標、使用者授權、程序通過、遠端 merge、main CI、部署與公開可用性分開記錄；本報告尚未宣稱 33／49 頁已發布。原完整報告中的未授權／未合併描述屬各自歷史時點，不反向改寫既有測試與失敗紀錄。本次亦不改動法律政策、正式索引、價格核准、DNS 或站內直接收件邊界。

## Luxury：合併整合開始（2026-11-26）

Heritage [PR #40](https://github.com/xk2022/xk-website/pull/40) 已實際合併為 `main@0d41ecf495e55b792f966c9fe27bd07c27bc5647`，main 清冊現在為 Modern 16＋Gallery＋Heritage 16，共 33 頁；main CI [45796333591](https://github.com/xk2022/xk-website/actions/runs/45796333591) 已成功，Pages deploy 於 09:56:20 UTC 完成；隨後正式 HTTPS smoke 2,329/2,329 PASS、實際 Exit 0（33 頁與 36 引用資源為 200，38 保護／未知路由為 404）。最終 PR head `7e13143e` 的 CI [45795727562](https://github.com/xk2022/xk-website/actions/runs/45795727562) 與實際 artifact 1,260/1,260 核對先行完成；遠端原始證據及 SHA 詳見 PR #40 說明。上方 Heritage 表格是先前階段快照，其原始 Exit 2、38 incomplete、逐 target 人工補充及版本邊界保持原樣；本段不追改舊收據或預填尚未取得的遠端結果。

本階段以原 Luxury head `efd098a9a79667b29d5f0a8e71d2752941c30a0d` 為基礎，將該已核准 main 整合進 `feature/design-collection-luxury`／[PR #42](https://github.com/xk2022/xk-website/pull/42)，保留 [DC-004 完整規格](../task/dc004.md)／[實作報告](dc004-implementation.md) 及 [DC-005 完整規格](../task/dc005.md)／[實作報告](dc005-implementation.md)，並保留兩風格的版本審閱與核准。本分支整合清冊為三系列各 16 頁＋Gallery，共 49 頁，等待此次新驗收。原 Luxury-only 33 頁測試不改稱本次 49 頁結果；原先五外站 404 屬歷史版本，主線已含 PR #43 的五來源 Hub 修正，實際新來源驗收依本階段證據另記。

公司來源最新 main `9213a3d8dacb8774d87c26cb736c4a4315779e95` 在本階段重核無新增適用規範變更。`source-bridge.json` 凍結 212 個 runtime／設定／資產／驗證檔，fingerprint `a5d7003b1babc38b9a8525a750f1b957a810f71f5530361b0fb2e3c6becd2303`；32 檔在雙分支及現在完全同 bytes，22 個核准系列 composition／theme 原檔未變，不以這項結論擴張品牌、服務、價格或發布核准。以下是此次 Luxury 階段待填矩陣，尚未把預計執行寫成通過；後續收據與必要原始失敗預定存入 [Luxury 整合證據](design-collection-integration-artifacts/luxury/)。

| 程序／階段 | 本階段狀態 | 待記錄的實際證據 |
| --- | --- | --- |
| 原 Luxury head／核准 main／衝突與 source bridge | **PASS** | `source-bridge.json.gz`；212 檔與實際差異界線，下段詳列 |
| `npm ci --cache /tmp/xk-npm-cache` | **PASS** | `npm-ci-final.json`／`.log.gz`，Exit 0 |
| `npx next typegen`／`npx tsc --noEmit` | **PASS** | `typegen.json`／`typescript.json` 及 log，Exit 均 0 |
| `npm run lint`／`npm test` | **PASS** | `lint.json`／`test.json` 及 log，Exit 均 0；最終附件 lint 另記 |
| `npm run build`／`npm run build:pages` | **PASS** | `build-normal.json`／`build-pages.json` 及 log，Exit 均 0；49 頁 |
| normal／Pages HTTP／metadata／assets／anchors／404 | **PASS** | 每 mode 3,273 PASS；normal 另 2 個私有 SSR N/A；`http-{mode}.json` 及 result.gz，Exit 均 0 |
| normal／Pages 受影響瀏覽器／行為／網路驗收 | **PASS** | 每 mode 297/297、245 layouts、18 局部 axe；`browser-{mode}-v2.json`，Exit 均 0；原 v1 FAIL 保留 |
| axe incomplete／人工補充（若有） | **PASS** | 每 mode 18 次受影響元件掃描，0 violations／0 incomplete；不宣稱全頁 WCAG／真人 AT 驗收 |
| Contact／Quotation／個資／storage／A4 等共用整合界線 | **PASS** | 每 mode 24 業務斷言、三向 Footer／history 清個資及 IDs 還原、3 print media；物理 PDF 限 byte bridge 沿用 |
| 實際 Pages artifact／封存／文件／最後 lint | **PASS（本機產物）** | 1,899/1,899 checker、515 files／163 runtime；manifest 已封存；最終 lint 及 docs-v2 均真 Exit 0，遠端另核 |
| PR #42 最終精確 head CI／artifact | **PENDING** | 對應該 head 的真實 run／artifact，不能沿用舊 head 成功 |
| PR #42 merge／main CI／deploy／公開驗證 | **PENDING** | 已授權合併，逐一記錄真實事件；不預填 49 頁已發布 |
| DC-006 新功能階段 | **未開始** | PR #42 實際合併後接續；另立規格落地／測試／報告與新 PR 審閱，不自動合併該新 PR |

現有使用者授權涵蓋 PR #42 合併及其後執行 DC-006，不需重複請批；PR #42 仍須完成此次必要驗收再合併。此處只開始雙風格合併整合，未提前實作 DC-006 的三向切換器，也未解除既有法律、索引、價格、收件或 DNS 邊界。

### Luxury：受影響範圍與執行紀錄

- 保留兩系列獨立版面，合併時以明列兩 style 的 static params 與 Server dispatcher 共存；每個頁面只有一套 Frame。三套 Footer 分組列出全部 49 頁。
- Contact／Quotation 相對原 Luxury 僅新增 Heritage 的 class／data 分支，保留其直接清除 DOM／defaultValue／mailto／個人摘要、Activity 及 bfcache 生命週期處理。Heritage 舊控制器被這個已驗收的較完整共用處理取代，故三風格生命週期與個資必須重新驗收。
- Summary、print CSS、QR、定價、計算與 IDs storage 原始 bytes 未變；只在此界線沿用原實體 PDF／QR 結果，這次仍驗三風格實際 print media、離頁與還原。不把歷史 PDF 說成本輪新產生。
- 衝突 review 發現 `servicesPage.websiteGuide` 被 Git 自動合併重複插入；保留已合併 main 的唯一原設定，沒有改文案或價格。
- 先安裝新工作樹的鎖定依賴以準備 snapshot，freeze 後另有 `npm-ci-final.json` 作正式基準；初次 snapshot 缺依賴與不適用的 Node CJS `--check` TypeScript 操作均記入 `preparation.json`。實際 Next typegen、TypeScript、Lint 與 native tests 已另成功，不為工具問題改 package type。

正式 `npm ci`、`npx next typegen`、`npx tsc --noEmit`、`npm run lint`、`npm test`、`npm run build` 均已真 Exit 0。native route 86、metadata 59、content 24 項通過；其他原 Contact／Quotation／contract 測試完成，完整計數見原 log。普通 production HTTP 為 **3,273 PASS、2 N/A**，`complete: true`、Exit 0；兩 N/A 仍只限精確私有 Next error shell，沒有放寬保護或其他未知路由。

第一次 browser `normal-final` **Exit 1**，269 個記錄 FAIL、0 個 layout 完成後中止：工具在新 context 的初始 `about:blank` opaque origin 讀取 cookie／storage，還未進入網站即遭 SecurityError。原結果、工具 v1、收據與必要失敗圖保留；它不能作為網站驗收。v2 只修正初始 opaque document 的前置條件，真實 App document 仍維持嚴格儲存／個資檢查；v2 的真單頁預檢先通過，再於 normal／Pages 各重新完成 297/297、Exit 0；未修改網站來迎合工具。

### Luxury：內容、畫面與驗證邊界

獨立比對已對 HTTP parity 的 90 個候選逐筆核對 18 個實際 HTML 與原生公開 DTO：87 個為父節點串接／編號／重排，3 個 Heritage「服務組合」改為「相關技術服務」；相應三組 serviceIds、標題及 href 完整等價，未發現真正事實遺漏。保留第一輪 Exit 2／3 個待判讀與後續 `parity/adjudication-final.json.gz`、真 Exit 0，各候選有原文、DTO path、semantic section 及 actual leaf。272 個 DTO 文字 leaf、9 個保留 UI label、3 個改名與 86 個展示編號有明確依據；此為 90 個候選的內容判讀，不擴張為所有 DTO 欄位或人工作品聲明。

兩模式各 297 項為：245 個 49 頁×320／375／768／1440／1920px layout，18 次受影響 Header／Footer／Contact／Quotation 區域 axe，24 個選定業務斷言，3 組鍵盤／原生選單／focus／reduced motion，2 組三風格真 Footer／back-forward 個資與 IDs 生命週期，3 組 print media 離頁／還原，Gallery 及嚴格被動網路各 1。兩模式均 0 assertion FAIL、0 Console／Runtime／實際資源／個資錯誤；原精確可辨識的 prefetch cancellation 原記錄保留，不把它們改稱 2xx。Clipboard API 真 readback 與宣告拒絕模擬分開，storage SecurityError 限本網站既有 key 的失敗路徑測試，沒有聲稱所有瀏覽器政策皆已測到。

三風格 print media 均只有一個 active Quotation 與白色 A4、原 Logo／兩個 QR 資源；離開後普通頁不帶殘留 A4，返回可恢復列印。這輪沒有新 PDF 或重新解碼實體 QR；未變的實體列印與 QR bytes 限定沿用各原完整報告。

Pages [14 張實際截圖與人工檢視](../screenshots/design-collection/integration-pr42/README.md) 包含 Home／Gallery 的 375／1440px 全頁及三風格頁尾頂端 viewport。圖片全長用於總覽，文字換行與品牌對比另看實際 viewport；局部圖不假稱包含整個 49-link 目錄，完整 href 另由逐頁斷言驗證。沒有將 normal 未拍的圖宣稱為 byte-identical。

原始 receipts、結果、工具 v1／v2、scope、source／fixture／catalog、原始失敗、兩個唯一失敗 PNG 與全部 269 筆失敗圖 mapping 均在 artifact 目錄，log／工具以 gzip 保存並列 encoded／decoded SHA。沒有 secrets、.next、out 或 dependencies。正式品質在 runtime freeze 後執行，後續只是排除於 Tailwind 的報告／證據與遠端事件記錄，不重跑無關網站矩陣；最終 commit 對應的 CI artifact 仍須獨立精確核對。

文件封存初次 SHA checker 將原本已 gzip 的 HTTP 原檔誤當為新增 archive wrapper 解壓，真 Exit 1 保留（`docs-final.json`）；修正 manifest 的明確 `archiveEncoding`／`originalEncoding`，只解開本次 archive wrapper，再以 v2 重新檢查。原始來源 gzip bytes 及來源自己的 body SHA 均保留，不為此重新建置網站。
