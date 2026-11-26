# DC-002 共用核心實作與驗證

日期：2026-11-26。分支：`feature/design-collection-core`。狀態：核心與本機驗收完成，準備 PR 審閱，未合併或部署。範圍依 [DC-002 任務](../task/dc002.md) 與 [核心使用契約](../03_engineering/design-collection-core.md)。PR 建立前完成本報告；精確提交 SHA／遠端 CI 與 artifact 結果於同一 PR Description 後補，不以本機通過宣稱已部署。

## 基準與範圍

起始 main `9a7ca8ebef026b6be49e8fe51f3afa1057a3768b` 已含 DC-001／PR #30 與 PR #31 文件目錄整理。交付前又 fetch 到已核准 PR #32（僅 README 與兩份索引），安全 stash／rebase 到最新 main `eeb04b3ae89e2740ae104b92399be2a450511f37`，逐項保留新版 README 與本輪說明；兩處文件衝突已人工解決，未引入未合併功能。公司 main 重核仍是 `5be640ab11811b24706101ea13db73185e9ce4d8`／tree `10895f056504089267a9661c3685b7ff2d8ff1d8`，沿用同版已讀規範及公司 AGENTS 缺檔紀錄，沒有改公司 Repository。

實作新共用核心及測試，未整合現有頁面。原 16 頁、UI／layout／呈現 CSS、價格／業務 config、Contact／Quotation 原函式與 storage、SEO registry、資產、依賴／lockfile、Next／Pages／workflow 與 DNS 保持原樣。Gallery／Heritage／Luxury 仍 planned，不輸出新 URL。

## 模組與契約

- 單一深層凍結 plain 內容 DTO，排除 Icon／React 物件／function／symbol；不修改或凍結原來源。by-ID 查詢未知回 undefined。
- Registry／descriptor 可描述 49 個目的地；公開 href 與 metadata 入口只允原 16 個 Modern，沒有 allowPlanned 或索引環境旗標。
- Metadata 保留 Modern 逐頁輸出，展示契約分 Modern canonical／系列 OG URL，仍 noindex/nofollow、無未核准圖片或 hreflang。
- Contact／Quotation facade 重用原行為與 catalog；scope key 只含 style／page ID，storage controller 只有 type-only 引用，未新增持久化。
- Token schema 為完整語意角色及有限語法／安全 alias 檢查，沒有新 palette 或 CSS；portal／print／reset 仍是 integration-required，未實際掛載或套用。
- Native Node.js 24 測試與 test-only alias loader，不改 production imports 或 package type；npm test 整合新契約測試。

## 環境、版本與證據

Linux 6.18.57 x86_64、Python 3.12.14、Node.js 24.22.1、npm 11.9.0、TypeScript 5.9.3；Next.js 16.4.6、React 19.3.1、Tailwind CSS 4.3.3 保持原版。瀏覽器為 Chromium 156.0.8078.79／外部驗收工具 Playwright Core 1.65.1，未加入 Repository dependencies。

最終 167 個 source／config／scripts／public／workflow 檔案 fingerprint 為 `b55a5e78f1b22022713838c59f76c454c5b4e363d047001528a7e3163ad353ec`。六指令最後一輪執行後，PR #32 同步只改 README／索引；逐檔核對程式 byte 未變，再重新執行兩模式 build／HTTP／anchors／browser。文件與證據在限定 Tailwind 排除範圍內。最終文件加入後再查 source／artifact fingerprint，CI 將重新驗證實際提交。

原始回執、log、JSON、QA 工具與來源清單存於 [dc002-artifacts/](dc002-artifacts/)。log／大型 JSON 為 gzip，解壓後 SHA 對應原 receipt；[SHA256SUMS](dc002-artifacts/SHA256SUMS) 核對提交檔。回執保留當時 `/tmp/` 命令與實際 OS exit，不改寫歷史。`source-delivery.json` 記錄交付基準及逐檔 hash；`environment.json` 與工具封存補足操作版本。

## 驗收矩陣

命令預期 Exit 0 並到達完整標記；HTTP 預期原 16 頁、資源與連結有效，Metadata 仍受保護，planned 不公開。Browser 預期原行為／圖片／鍵盤正常、無溢出、console／runtime／實際資源錯誤或個資外洩。每項詳細 expected／actual、URL、測試 ID 與時間在下列證據；PENDING／BLOCKED／N/A 不算 PASS。

| ID | 實際命令／操作與結果 | Exit | 狀態 | 證據（相對 dc002-artifacts） |
| --- | --- | --- | --- | --- |
| DC2-Q01 | `npm ci --cache /tmp/xk-npm-cache`：locked install 616 packages | 0 | PASS | `npm-ci-final.json`、`.log.gz` |
| DC2-Q02 | `npx tsc --noEmit`：沒有型別錯誤 | 0 | PASS | `tsc-final.json`、`.log.gz` |
| DC2-Q03 | `npm run lint`：零錯誤／警告 | 0 | PASS | `lint-final.json`、`.log.gz` |
| DC2-Q04 | `npm test`：原 72＋新 293＝365 PASS，零失敗 | 0 | PASS | `test-final.json`、`.log.gz` |
| DC2-Q05 | `npm run build`：最新 main 同步後 production build 成功 | 0 | PASS | `build-normal-latest.json`、`.log.gz` |
| DC2-Q06 | `smoke-website.py`／anchor checker，3220：910 smoke PASS；16 頁宣告 anchors＋清冊 17 PASS、兩 planned N/A | 0／0 | PASS | `smoke-normal-latest*.json*`、`anchors-normal-latest*.json*` |
| DC2-Q07 | focused browser，3220：16 PASS／10 layouts／30 decoded images，包含原 Contact／Quotation | 0 | PASS | `browser-normal-latest.json`、`normal-latest/result.json.gz` |
| DC2-Q08 | `npm run build:pages`：最新 main 同步後靜態輸出成功，root basePath 空字串 | 0 | PASS | `build-pages-latest.json`、`.log.gz` |
| DC2-Q09 | Pages 3221：910 smoke、17 anchors／清冊（兩 planned N/A）、16 browser PASS／10 layouts／30 decoded images，四 planned URL 404 | 0／0／0 | PASS | `smoke-pages-latest*.json*`、`anchors-pages-latest*.json*`、`browser-pages-latest.json`、`pages-latest/result.json.gz` |
| DC2-Q10 | 原資料、純核心、runtime byte、文件與完整 Diff | PENDING | PENDING | 待最終檔案及 artifact 檢查 |
| DC2-Q11 | 精確 PR head 的 quality／Pages build／實際 artifact | — | PENDING | PR 建立後記錄於同 PR Description；deploy 預期 skipped |

新 293 項由 routes 37、metadata 59、content 24、interaction／tokens 173 組成；原測試為 Contact 26、Quotation 32、storage／inquiry 14。獨立 fixture／hard-coded 需求預期不是由受測 adapter 反產生。

Browser 逐測首頁、Services、Portfolio、Contact、Quotation 的 375／1440px。Contact 從空白錯誤與 focus、有效本機預覽到真實 Clipboard readback，沒有開寄信程式或寄信。Quotation 驗證 LP＋多語系＋analytics＝26,000–58,000，未知網域年度費不當零、不加進一次費；reload 僅恢復 IDs，個人欄位清空。另測 mobile Tab／Escape／focus、Reduced Motion、四個 planned URL 真實 404，以及 console／runtime／network／PII。沒有把 requestfailed 一律忽略；只記錄精確匹配的 Next RSC／伴隨 HEAD prefetch 取消。

沒有新 UI、呈現 CSS 宣告或 print renderer 變更，本次新增畫面截圖、axe、PDF 與跨風格列印驗收為 N/A，原因是尚無可操作新風格；不借用舊結果填 PASS。普通／Pages 仍實測原有功能及宣告 anchor。後續任何實際影響 UI／print 的修正須依 Diff 重新判定並驗收。

外部展示站／來源資產的狀態、正式 Email 收件、跨瀏覽器全矩陣、全五寬與印表機／PDF 未於本輪重新驗收；其程式與來源均未變，本輪不將舊證據充作新測試。原 smoke 的兩個 external optional checks 在原 JSON 依實際未請求記錄。

## Runtime 保留證據

參考最新 main `eeb04b3ae89e2740ae104b92399be2a450511f37` 的 [成功 workflow 45737303685](https://github.com/xk2022/xk-website/actions/runs/45737303685)，下載實際 github-pages artifact `15079931298`，ZIP SHA-256 `694b90edd7e5e2aad6cc983e511042f233a73781935f547cb3d24371b3d57ba5` 經驗證，未只比對歷史報告或名稱。

Pages 的 154 個檔案（4 CSS、17 JS、115 woff2、8 SVG、10 webp）SHA 全等；151 個路徑也完全相同，其餘僅三個 Next build ID manifest 目錄有差，manifest 內容仍逐位元相同。比對器只正規化這三個目錄，不改 hash 或其餘路徑。一般 build 的四份 CSS 也與此基準相同。沒有新版核心被意外打包到 Modern client chunks。

原始 main 資料／頁面／client／價格／儲存／SEO 與 deps／lock／Next／workflow 均核對未動；globals.css 只有限定排除。PR artifact 仍須在精確提交 CI 完成後另行下載比對，其結論記錄於 PR，不以本機 artifact 代稱 CI artifact。

## 新增與修改檔案

- 核心：`src/config/design-collection.ts`；`src/lib/design-collection/types.ts`、`content.ts`、`routes.ts`、`metadata.ts`、`interactions.ts`、`tokens.ts`。
- 測試：`scripts/fixtures/design-collection-contract.json`、`scripts/register-test-aliases.mjs`、四個 `scripts/test-design-collection-*.mjs`；`package.json` 只新增／串接 scripts。
- 掃描：`src/app/globals.css` 只加本輪純核心／測試／文件／證據的限定 `@source not`，沒有呈現宣告、palette、utility 或既有來源排除的變更。
- 文件：`README.md`、`AGENTS.md`、`docs/README.md`、`docs/task/README.md`、`docs/98_decisions/implementation-notes.md`；新增 `docs/task/dc002.md`、`docs/03_engineering/design-collection-core.md`、本報告及 `docs/reports/dc002-artifacts/`。README 沿用 PR #32 結構，規劃風格路徑校正為架構核定 namespace。

## 失敗與重驗紀錄

- 路由反查首輪負向測試發現長 invalid path 的正則回溯約 23 秒，改為線性分隔及 2048 字元上限後定向測試通過；原紀錄保留。
- 內容測試首輪 ESLint 禁止使用 module 迴圈變數，改名 configExports 後重跑 native 與 lint，原 FAIL 保留。
- 第一輪兩模式功能通過後，runtime 比對發現純核心／測試文字被 Tailwind 掃出 container／shadow／ring／blur 等額外 utility，未達原樣式保留目標；在 globals.css 僅追加本輪非呈現來源的限定排除，再重建及重驗。保留初次比對與兩模式證據，不以功能 PASS 代替資源等價。
- Token 限定 TypeScript 首輪在 noUncheckedIndexedAccess 下缺 regex captures／索引 guard，依真實錯誤補齊後重驗；不改價格或核心行為。

- 最終 Diff checker 首輪把移除掃描 block 後多留的一個空行當呈現差異，驗收 FAIL／真 Exit 1；確認 diff 只有空行後修正工具的 block 移除邊界，再以完全相等檢查重跑，不改應用或降低 CSS 判定。第二輪再發現 checker 未對應 history 改名後的 log，真 Exit 1；補上以 receipt 同名 archive 對應並保持 log SHA 完整比對。兩輪工具／receipt／log／結果均保留於 history，最終使用 v3。

## 後續與交付邊界

DC-003 才搬 Modern layout／加入 Gallery，DC-004／005 才實作新系列及 token 值；新 palette／素材與品牌外框的適用審閱、portal 容器、個人 state remount 及 print 隔離仍須實際整合驗收。核心描述 planned 不代表批准發布。

本輪目標為 Commit／Push／PR 等待審閱；沒有收到本輪 merge／deploy 指示。最終 Commit／PR／CI／部署只按實際事件記錄，遠端後續更新同一 PR Description，不為記錄自己的 SHA 新增循環提交。

Known Issues：目前沒有已確認但未修復的核心功能 FAIL。保留的環境提示為既有 ESLint 9.39.5 deprecated 與 Node 對無 package type 的 TypeScript 模組提示；依規格不藉此升降級套件或修改 package type。公司 AGENTS 缺檔、未來樣式／品牌審閱及尚未實際掛載的隔離／reset 是明示限制，不宣稱已完成後續工作。
