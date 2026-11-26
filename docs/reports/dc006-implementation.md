# DC-006｜三系列切換與導覽整合驗證

日期：2026-11-26。分支：`feature/design-collection-navigation-seo`。本機實作、功能／版面與限定補驗已完成；下述原始非零退出碼保持不變。新 PR 的 exact-head CI／真實 artifact 待建立後在 PR Description 補實際結果，不預填 PASS；新功能尚未合併或部署。

## 來源與授權

基於已合併 main `9322810f27e74e5ed4faa35a3b3931b3719f0c9a`。前置 PR #40／#42 已依使用者「合併」授權實際合併。PR #42 main run [45802200429](https://github.com/xk2022/xk-website/actions/runs/45802200429) 於 10:33:48 UTC 完成 Pages deploy；其後 HTTPS 3,273 PASS（49 頁、36 引用資源、29 個保護／未知 404）。這是前置版本證據，不能改稱 DC-006 部署；詳 [整合報告](design-collection-integration.md)。

依據 [當次規格](../task/dc006.md)、[工作包 §8](../01_design/design-collection/work-packages.md#dc006)、[架構](../01_design/design-collection/architecture.md)、[AGENTS](../../AGENTS.md) 及 [協作流程](../03_engineering/subagent-workflow.md)。公司 main `9213a3d8dacb8774d87c26cb736c4a4315779e95`／tree `195c5c8100b74513985e040f3ee6fc642571285e` 同前置版本；已重核根規範、品牌、工程及網站文件，其餘同 blob 來源的沿用範圍見 [source review](dc006-artifacts/company/source-review.json.gz)。文件 Repository 維持唯讀。

目前授權包含實作、驗證、Push、新 PR；舊 PR #40／#42 合併授權不自動延伸至新 PR。沒有新增公司事實／價格／業務承諾或變更品牌核准。

## 實作與檔案

- `src/lib/design-collection/navigation.ts`：client-safe 輕量 route identities／anchors／style 名稱與純切換決策。`navigation-model.ts` 僅 server；由公開 registry 與 resolver 產生 Header、Footer49 與 Client props，不把完整內容／報價 DTO 匯入 Client。
- `routes.ts` 新增共用內容 href 映射；Heritage／Luxury links adapters 委派此入口。只映射已知 route，保留外部 Showcase／mailto／未知網址，不任意加前綴。
- `shared/style-switcher.tsx`、`style-switcher-client.tsx`、scoped CSS 與三 Frame：Header 後／main 前正常文流 band。三風格真 anchor；目前項目為非互動 `aria-current`，Gallery／未知頁明示首頁 fallback。「比較三套版面」回 Gallery。保持 page key／detail slug，只保留兩端共同 semantic hash；query、私有 hash 及個人欄位不轉移。
- SiteHeader／MobileNavigation 接輕量 server 資料；SiteFooter 及兩套 Frame Footer 共同分組涵蓋全部 49 頁。原 Modern 五主導覽／詢價警語保留。兩套 native disclosure 延後 band 點擊造成的收合，避免 pointerdown 改變文流使原連結落空。
- Gallery 保留三張風格首頁卡片，新增七主要頁面×三風格比較表；`src/config/design-collection.ts` 與獨立 fixture 僅新增 `compare-pages` anchor。
- `scripts/test-design-collection-navigation.mjs` 新增 221 個原生測試；`package.json` 只註冊測試指令。`globals.css` 只排除本輪規格／報告／證據／測試工具的 Tailwind discovery，既有 CSS declarations 不變。
- 更新根 AGENTS／README、設計與任務索引、Roadmap、工程核心與 implementation notes；新增規格、本報告、[證據 manifest](dc006-artifacts/manifest.json)、[18 張實圖與人工紀錄](../screenshots/design-collection/dc006/README.md)。完整檔案清單以本 PR Diff 為準。

URL 是唯一風格來源，沒有 style preference 或新 storage key。Contact／Quotation 共用 controllers、計算、原 `xk:quotation:v1` IDs、A4、Logo／QR 及所有 public assets 保留。可見提示說明不帶入聯絡草稿、稱呼與專案；React `useId` 防 retained Frames 重複描述 ID。新 band 列印隱藏，不改紙本 renderer 或 `@page`。

## 受測版本、環境與方法

最終 runtime v2：218 個檔案 fingerprint `fa0e21576322d94fa7565c61a0b8ef36a1eba6bc3a3dd058f082e4ebe02decac`，見 [source freeze](dc006-artifacts/core/source-bridge-v2.json.gz)。34 個敏感邊界與 base bytes 相同，涵蓋計算／控制項／摘要／print CSS／QR／素材／SEO／Next／workflow／lockfile；package dependency、devDependency、engine 未變。v1→v2 僅一個 Client 檔案修正，見 [version bridge](dc006-artifacts/ui/version-bridge.json.gz)；v1 檔是明示的逆向重建且與原 freeze SHA 相同，沒有冒充原始存檔。

Linux 6.18.57 x86_64、Node 24.22.1、npm 11.9.0、Python 3.12.14、Next 16.4.6、React 19.3.1、TypeScript 5.9.3、Tailwind 4.3.3；外置 Playwright-core 1.65.1／axe-core Playwright 4.14.0、Chromium 156.0.8078.79，沒有新增專案依賴。瀏覽器 viewport height 1000、deviceScaleFactor 1、Asia/Taipei；各模式分開執行，普通 production 3276 停止後才建 Pages／3277。一般 Next 與 GitHub Pages 自訂網域空 basePath／assetPrefix、trailingSlash 與靜態輸出均保留。

所有長指令由 `scripts/run-with-evidence.py` 真正等待 OS 程序並保存 command／cwd／start／finish／exit／log SHA；receipts 不是僅從 JSON 的狀態推算。所有個資測試只用 synthetic canaries，mailto 預設行為阻止，未送信。各 Test ID 的 expected／actual／viewport／真 HTTP response、錯誤與 storage snapshots 在原 JSON，不只寫「通過」。

## 品質指令

| Test ID | 實際指令 | 完成時間 | Exit／狀態 | 證據 |
| --- | --- | --- | --- | --- |
| DC6-Q-npm-ci-v2 | `npm ci --cache /tmp/xk-npm-cache` | 11:11:11 UTC | 0／PASS | [receipt](dc006-artifacts/core/npm-ci-v2.json)／[log](dc006-artifacts/logs/npm-ci-v2.log.gz) |
| DC6-Q-typegen-v2 | `npx next typegen` | 11:11:12 UTC | 0／PASS | [receipt](dc006-artifacts/core/typegen-v2.json)／[log](dc006-artifacts/logs/typegen-v2.log.gz) |
| DC6-Q-typescript-v2 | `npx tsc --noEmit` | 11:11:15 UTC | 0／PASS | [receipt](dc006-artifacts/core/typescript-v2.json)／[log](dc006-artifacts/logs/typescript-v2.log.gz) |
| DC6-Q-lint-v2 | `npm run lint` | 11:11:22 UTC | 0／PASS | [receipt](dc006-artifacts/core/lint-v2.json)／[log](dc006-artifacts/logs/lint-v2.log.gz) |
| DC6-Q-test-v2 | `npm test` | 11:11:24 UTC | 0／PASS | [receipt](dc006-artifacts/core/test-v2.json)／[log](dc006-artifacts/logs/test-v2.log.gz) |
| DC6-Q-build-normal-v2 | `npm run build` | 11:11:31 UTC | 0／PASS | [receipt](dc006-artifacts/core/build-normal-v2.json)／[log](dc006-artifacts/logs/build-normal-v2.log.gz) |
| DC6-Q-build-pages-v2 | `npm run build:pages` | 11:24:23 UTC | 0／PASS | [receipt](dc006-artifacts/core/build-pages-v2.json)／[log](dc006-artifacts/logs/build-pages-v2.log.gz) |

`npm test` 包含既有測試及新增 221 項導航測試，全部完成。完整 log 保留數量與原測試名稱，不以單獨 navigation preflight 代替最終基準。

## 功能與驗收矩陣

| Test ID | 預期／操作 | 實際結果 | Exit／證據 |
| --- | --- | --- | --- |
| DC6-HTTP | 兩模式精確49頁、所有本機 href／anchor／資產／metadata、404、控制項白名單 | normal 3,274 PASS／2 N/A；Pages 3,274 PASS，均 complete。N/A 只限普通 Next 兩個私有錯誤殼 raw-frame 細節，非整個私有路由免驗 | 各0；[normal](dc006-artifacts/core/http-normal-v2.json)／[Pages](dc006-artifacts/core/http-pages-v2.json)，對應 `-result.json.gz` 與 logs |
| DC6-RWD | 49頁×320/375/768/1440/1920，每模式245 layouts | 兩模式245/245；band／Gallery比較表／Footer49／圖片／單一Frame及overflow守門完整 | 原 browser normal exit2／Pages exit1，原因見下，不改寫；[normal raw](dc006-artifacts/browser/normal-v2/result.json.gz)／[Pages raw](dc006-artifacts/browser/pages-v2/result.json.gz) |
| DC6-SWITCH | 16內容 identities×六方向，深層slug、共同hash、private/query排除、fallback、新分頁、歷史及展開menu直接點band | 各96/96方向；跨風格真正document response200。僅 source 同頁同hash的 goto null 以 exact URL／timeOrigin／先前真200證明，保留null，不偽填200 | 同上；新增120 assertions 含96方向；原生連結最終200／query空／hash契約 |
| DC6-STATE | Contact／Quotation、PII清除、IDs還原、Clipboard readback／拒絕、own-key storage拒絕、Footer SPA／history／print | 每模式24 selected business assertions、兩組Footer／history、三風格print media完整；新band隱藏、唯一白色A4、原Logo及兩QR資源、普通頁無print殘留 | 同raw；8 selected/style非整個歷史數學矩陣。原數學與物理PDF限定byte橋接，不宣稱本輪生成新PDF |
| DC6-A11Y | 受影響Header+Footer+band、Contact、Quotation、Gallery比較表 axe WCAG2/2.1 A/AA；鍵盤／focus／reduced motion | 各20 scans、0 violations；各10 overlap incomplete逐筆人工判讀通過。Tab／Enter／Escape、native menu、current、Focus、reduced motion均有實際紀錄 | 原normal exit2保留；[normal判讀](dc006-artifacts/core/band-overlap-normal-adjudication.json)／[Pages判讀v3](dc006-artifacts/core/band-overlap-pages-adjudication-v3.json)；不是全頁WCAG或真人AT認證 |
| DC6-NETWORK | Console／runtime／network／PII監測、不得任意忽略取消 | normal無未處理錯誤。Pages原最終network有3query HEAD取消，限定診斷＋3情境重驗4/4 assertions完成，0其他錯誤 | 原Pages exit1；[限定重驗receipt](dc006-artifacts/core/neutral-query-retest-v5-command.json)真0，詳下 |
| DC6-CONTENT | 商業內容／狀態／價格／案例來源不因風格切換改變 | 兩模式新HTTP各32個diagnostic rows、90candidates與先前獨立判讀完全相同；只沿用那90個semantic決定，其餘為新驗 | [v2 bridge](dc006-artifacts/core/parity-bridge-v2.json)；原90案證據保留於前置整合報告 |
| DC6-EVIDENCE | 真實PNG、SHA、人工視覺檢查 | 18張Pages v2；三風格375／1440首頁和band、Gallery全頁和比較表、兩套深頁menu/focus/current。已逐張實看 | [圖片與範圍](../screenshots/design-collection/dc006/README.md)／[visual review](../screenshots/design-collection/dc006/visual-review.json) |
| DC6-ARTIFACT-LOCAL | 嚴格輸出清冊／HTML-RSC／metadata／frame／49band／21比較連結／runtime bytes／保護路由 | 2,942/2,942 PASS；49 public、516 files、164 runtime（6CSS、21JS、115fonts），只允許實際BuildID正規化；12正負工具fixtures通過 | prepare/checker皆0；[本機檢查](dc006-artifacts/artifact/remote/local-v2-artifact-check.json.gz)；尚非CI artifact |
| DC6-FINAL | 路徑／Markdown／附件manifest／source bytes／依賴／Diff／最後lint | 35 項文件／路徑／manifest／source／Diff 檢查全 PASS，附件落盤後 ESLint 真 exit0；遠端仍待PR | [文件receipt](dc006-artifacts/core/final-doc-check.json)／[最後lint](dc006-artifacts/core/lint-final.json)；實際PR head CI／artifact之後只更新PR說明 |

Modern16 metadata 不變，Gallery self-canonical；32展示頁 canonical→Modern、OG URL→自身，全站 noindex/nofollow、唯一WebSite JSON-LD。未知style／slug、Privacy草案／dev／API／Sitemap保持404；沒有新增分享圖、hreflang、Analytics、DNS、Pages設定或workflow修改。

## 原始失敗、修正與重驗

1. **產品 v1 問題**：Footer 以 Next Link 從 Quotation 到 Services 時，band 曾殘留舊pathname。v2 改由 `usePathname` 直接驅動pathname，hash單獨store；feature-detect `navigation.currententrychange` 並保留hashchange／popstate／activation的即時href更新。沒有全域history patch或polling。最終v2重跑完整必要基準與兩模式矩陣，Footer SPA／IDs／PII及切換均通過。
2. **初版工具問題**：首次 tiny 把同頁hash非同步更新前的href當失敗；原exit1保留，之後驗實際focus／activation。正式v1 normal417項有34 FAIL，其中1為上述產品問題、33為工具對合法同文件goto null呼叫status。v4只在精確同URL／timeOrigin／來源真200證明成立時接受null；不同風格實際click仍必須nonnull200。修正後先真tiny0（確實遇到null），再完整v2。原v1／tiny／v2／v3／v4工具、diff與失敗圖片均保留，不以分類當重驗。
3. **axe overlap**：最終normal與Pages各10 incomplete均為Modern首頁375展開白色menu完全遮住band。兩模式分別補採圖／CSS／逐target幾何與9點hit-test；10個target均100%覆蓋，關閉後同glyph實際背景最低contrast 4.97475。這是被遮字不參與繪製的逐筆判讀，非把隱藏文字當contrast PASS或把axe改成0 incomplete。初版offline判讀工具語法exit1、修正exit0保留；Pages v3只補正模式／原exit1與實看Pages圖片的metadata，沒有重採或借用normal圖。
4. **Pages query HEAD**：原417項416 PASS／唯一finalnetwork FAIL，三筆為三套Contact的 `?source=qa` HEAD `net::ERR_ABORTED`。獨立核對原test/referrer與RSC headers、原server log對應三tree／PAGE／document GET均200；Next16.4.6 export流程合法帶query。工具原guard只接受無query，漏判這三筆。原HEAD實際status未捕捉，維持UNKNOWN，不能補200或斷言Next主動取消。

對第4項只修工具分類，不改App；必須精確Pages、三個核准Contact path、唯一字面query、原test/referrer、same-query tree GET、三prefetch headers／next-url及**實際2xx response**一對一成立才分類；其他CSS／JS／image／GET／query／404／缺companion仍FAIL。43個工具fixtures（4正／39負）真exit0。接著同source v2、同out實際重驗三情境＋strictnetwork，**4/4 PASS／真exit0**，觀察三個真RSC response200；fresh三個HEAD亦各先捕捉到200HTML response再中止（只限fresh，不回填舊狀態），原生跨風格document200、query/privatehash丟棄與所有DOM個資清除；0console/runtime/其他network/PII。原417 suite exit1及3筆UNKNOWN不重寫為PASS。

採用未受影響416 assertions＋精確補驗及逐筆overlap判讀的組合驗收，沒有重跑或宣稱重新通過整個417；原因是App／受測out未變，修改僅限定網路分類工具。原碼218檔仍須符合v2 freeze；若受影響App另改，應重新建置並按實際影響重驗。限定工具、43fixtures、原診斷、fresh4結果及版本SHA均封存。

## 證據保存與重現

[manifest](dc006-artifacts/manifest.json) 每檔保存encoded／decoded SHA、bytes與明示 `archiveEncoding`。gzip是封存包裝，不從副檔名猜解碼；PNG保持原bytes。工具／log／原始JSON及失敗圖片去重保存，所有failure Test ID映射保留。必要來源excerpt只保留本次診斷範圍，無秘密、簽名下載URL、`.next`、`out`、node_modules或公司Repo修改。

解壓工具可在另行準備的外置Playwright／axe環境重現；entry `browser-v4.cjs` 以 `normal|pages baseURL v2 source-bridge-v2.json fixture.json catalog.json` 執行完整417，focused v5另需 `--neutral-query-retest`（只3情境＋network），不得把focused當全矩陣。獨立fixture不呼叫實作resolver產生預期。詳每次receipt的實際command與工具SHA。

## 交付階段與尚未完成

| 階段 | 本報告快照 |
| --- | --- |
| 本機開發／品質／兩模式功能與限定驗收 | 已完成；原退出碼／incomplete／FAIL及補驗如上分開保留 |
| Feature commit／push／PR | 由本次交付產生，實際SHA與URL在PR及最終回報，不製造記錄自身SHA的循環commit |
| Exact-head PR CI／實際Pages artifact | PENDING；新PR建立後查真實Checks並下載artifact嚴格對照上述freeze，結果更新同PR說明 |
| Review／新PR合併／main CI／DC-006部署／公開網址 | PENDING；不能借用前置PR #40/#42的成功，不自動合併或公開feature |

DC-007 尚未開始；正式索引、Privacy法律核准、其他平台／真實裝置／真人AT未因此完成。未新增實體PDF，僅沿用明確未變邊界的歷史物理PDF／QR證據並執行本輪print media；沒有新增後端、收件服務、依賴或價格核准。沒有已知未修正的DC-006產品阻礙；原HEAD完成機制仍未知，保留為診斷限制。
