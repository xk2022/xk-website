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
