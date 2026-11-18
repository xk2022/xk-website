# Task 006 — Solutions 實作與驗證報告

本報告記錄本次正式功能實作的**實際本機驗收**及第 10 節指定時點的 PR 證據。一般模式 15 項、最終 Pages 70 項及 S06-N01 補充盤點通過；五個品質指令均 Exit Code 0。首兩次 Pages 工具失敗保留為 FAIL，不回寫成 PASS。後續最終 head／合併／部署依 PR 最新交付紀錄確認，不能由本機結果推定。

## 1. Repository、版本與受測範圍

- Website：`xk2022/xk-website`；Base `35639d881f2805765f6ceee0bb159d5225984975`，Task 005 Merge `e341f12d4d3a93127402ed0b4889d2526b253244` 為祖先。功能分支 `feature/website-solutions-page`。
- 原工作目錄乾淨，未覆蓋使用者變更。最新使用者明確要求執行 Task 006、驗證、修錯、Push and merge；此授權不擴及 Vercel／DNS 或其他 Task 功能。
- Documentation：`xk2022/xplore-kaleidoscope`、`main@95ef1275a46ace76e11f668178ca881087483398`，本輪 API 再確認版本未變。唯讀快照 51 檔核對 Git Blob；本實作使用的 17 筆來源再次逐 bytes 驗證 17/17。未建立或修改該 Repo 的分支／檔案／Commit／遠端內容。
- 規格：[Task 006](../task/task006.md)；原規格的初始 PENDING／歷史研究快照保留，不回填成本輪成果。來源、章節與採用界線在 `src/config/solutions.ts`，不把私有路徑堆進訪客流程。
- Next.js 16.4.6、React／React DOM 19.3.1、TypeScript 5.9.3、Tailwind CSS 4.3.3、shadcn 4.23.0、Lucide React 1.74.0；套件、lockfile、Next 設定、Actions、原始 Logo 與 Tokens 未改。

受測程式碼內容指紋（對應第 10 節實作 Commit，不涵蓋純文件補正）：

```text
b33cf399e2fd8109ed6069d93d0fd7abd7272eb84c6ca388324beb8aad11081c
```

演算法為 SHA256：依 `localeCompare` 遞迴排序 `src/` 的 ts／tsx／css／svg，逐筆加入相對路徑及原始 bytes，再加入 package.json、package-lock.json、next.config.ts 與 scripts/build-github-pages.mjs 的路徑及 bytes。四次正式 browser run 前後相同；之後若改程式碼須重驗，僅補報告／遠端結果也會確認此指紋不變。

## 2. 實作與規格對照

完成 `/solutions`，依序為 `solutions-hero`、`business-challenges`、`solutions-overview`、`solution-details`、`solution-technology`、`solution-combinations`、`implementation-approach`、`why-xk-solutions`、`solutions-next-step` 九個主 Section。Details 下四個 Article 不重算成 Section。

四方向是 digital-presence、enterprise-management、system-integration、ai-workflow；完整呈現適用情境、2–3 個問題、定位、技術、三個實施步驟、2–3 個改善目標、相關服務及真實 CTA。所有狀態固定 `proposed-direction`，清楚標示依需求規劃；沒有客戶、產品完成、效益數字、價格或 SLA 宣稱。

Challenges／Overview／Details／Technology 由同一份 typed data 衍生；ServiceId／服務名稱與錨點解析既有 `serviceCategories`，Cloud 是共同支援層。三個固定組合明示需求示例，五流程直接重用 `serviceProcessSteps`。新內容均為 Server Components，重用既有 Container／Section／Card／Button／SectionHeading／XkLogo／BrandPattern，不新增 runtime 依賴或互動。

共用 Header／Footer／Mobile Navigation 的 Solutions 指向 `/solutions`；首頁保留原三方向與 `#solutions`，追加單一「了解解決方案」。舊首頁服務／聯絡錨點及 About／Services 全部回歸；未實作的 Portfolio／Contact／Privacy／服務明細不變成失效連結。

Metadata 精確依規格：Title「解決方案 | Xplore Kaleidoscope」、指定 Description、品牌 Origin 的 `/solutions` Canonical／OG URL、zh_TW／website、zh-TW、noindex／nofollow；沒有假 OG Image／Schema。一般 build 與獨立 Pages export、Base Path、404、.nojekyll、開發路由／payload 保護均保留。

## 3. 實際新增及修改檔案

| 動作 | 實際檔案／責任 |
| --- | --- |
| 新增 | src/app/solutions/page.tsx：Metadata 與九區塊組合 |
| 新增 | src/config/solutions.ts：四案、17 來源、精確型別及集中 copy |
| 新增 | src/components/sections/solutions/：九個 Sections＋SolutionDetail／SolutionServiceLinks，共 11 個 TSX |
| 修改 | src/config/navigation.ts：共用導覽／plannedRoutes；src/components/sections/home-solutions.tsx：保留原三列、追加單一入口 |
| 修改 | scripts/build-github-pages.mjs：Solutions、四頁 Metadata 與 HTML／CSS 資源驗證；原斷言保留 |
| 修改 | README.md、AGENTS.md：Task 006 操作／標準及修正既有失效 canonical 入口 |
| 追加 | docs/implementation-notes.md：保留歷史前綴，追加此次實際紀錄 |
| 新增 | docs/reports/task006-implementation.md、task006-verification.json、docs/screenshots/task006-solutions-*.png 七份 |

以上為實際變更；未修改 package.json／lockfile／Next 設定／workflow／public 原素材或其他 Repository，未提交 .next／out／node_modules／測試暫存工具或機密。

## 4. 測試環境與執行方式

環境：Linux、Node.js v24.22.1、npm 11.9.0、Chromium 156.0.8078.79（headless）、Playwright 1.65.1、axe-core 4.14.1。未使用真實手機或完整螢幕閱讀器認證；375px touch 為 2× Device Scale／hasTouch 的實際瀏覽器模擬。

一般模式：完成一般 build 後新啟 `npm run start -- --hostname 127.0.0.1 --port 3030`，確認四頁、Metadata、連結與跨頁／錨點動線；鍵盤、手機、觸控及 Reduced Motion 由下述 Pages 驗收，完成後以 Ctrl+C 關閉，npm wrapper 實際回報退出碼 1（受控中斷）；HTTP／互動驗收已完成。這是長時間服務程序，受控停止不是品質命令成功退出的宣稱。之後才驗 Pages 靜態產物；Pages 不用 npm start 提供。

Pages：新 build:pages 產物複製至臨時目錄 `/tmp/xk-task006-pages.SqrpM0/xk-website/`，以 `python3 -m http.server 3031 --bind 127.0.0.1 --directory /tmp/xk-task006-pages.SqrpM0` 提供，完成驗收後以 Ctrl+C 受控停止（程序退出碼 1）。Base URL 為 `http://127.0.0.1:3031/xk-website/`。簡易 server 不完全模擬 Pages 自訂 404，因此另查 404.html、未知路徑實際 404 與 dev 排除。

瀏覽器工具位於應用套件之外；四次實際命令與時間／退出碼全部保存在 [結構化驗證證據](task006-verification.json) 的 formalExecutions。最終工具已凍結，沒有修改 app 來換取 PASS。

## 5. 品質指令實際結果

| Test ID | 實際命令 | 結果／Exit Code | 證據／備註 |
| --- | --- | --- | --- |
| S06-Q-install | `npm ci` | PASS / 0 | verification JSON quality；npm 保留既有 ESLint deprecation 警告，未升降級套件 |
| S06-Q-typecheck | `npx tsc --noEmit` | PASS / 0 | verification JSON quality；最終程式碼執行 |
| S06-Q-lint | `npm run lint` | PASS / 0 | verification JSON quality；最終程式碼執行 |
| S06-Q-build | `npm run build` | PASS / 0 | verification JSON quality；最終程式碼執行 |
| S06-Q-pages-build | `npm run build:pages` | PASS / 0 | verification JSON quality；最終程式碼執行 |

安裝出現既有 ESLint 9.39.5 deprecated／停止支援提醒；安裝仍 Exit 0。依本任務禁止任意升降級套件的約束保留版本並記錄，不以更改 lockfile 隱藏提醒。ESLint 專案檢查本身零錯誤／警告。

## 6. Browser、Responsive、Accessibility 與靜態結果

| Test ID／範圍 | 預期與實際結果 | 狀態 | 證據 |
| --- | --- | --- | --- |
| S06-F01／F06（兩模式四頁） | HTTP 200、H1／heading／ID、7/9/10/9 Section；精確 Title／Description／Canonical／OG／zh-TW／noindex／nofollow 通過 | PASS | runs.tests／pages／metadata |
| S06-F02（兩模式） | 四方案八項內容、固定文案、四 Overview、三示例、五流程、CTA 全部實際呈現 | PASS | runs.tests actualResult |
| S06-F03（兩模式） | 17/17 文件 Blob、37 個 sourceRefs、有效 ServiceId／技術對應及 proposed-direction 通過 | PASS | runs.tests actualResult＋sourceReview |
| S06-F04／F05（兩模式） | 每模式 27 個 unique targets；HTTP／全部錨點／首頁到四 Article／五個 Services 錨點／About／contact／深層刷新均通過 | PASS | runs.links＋實際導航測試 |
| S06-R01（20 案例） | 四頁 × 320／375／768／1440／1920px，無水平溢出、裁切或 Logo 失真；Overview／流程斷點正確 | PASS | runs.responsive |
| S06-A01（23 案例） | WCAG 2／2.1 A／AA；四頁五寬＋Solutions 三個展開選單狀態，違規 0 | PASS | runs.axe；原始 axe JSON 在 runDir |
| S06-A02／A03 | 真實 Tab／Shift+Tab／Enter、Skip Link、可見 Focus；Escape 還焦、選連結／外點／桌面斷點關閉 | PASS | runs.tests actualResult |
| S06-A04 | 375px、2× Device Scale、hasTouch 的 menu／方案卡／跨頁 CTA 實際操作通過 | PASS | runs.tests actualResult |
| S06-A05 | reduce 偏好下實際 transition 0s、animation 最小值及 scroll auto，內容仍可操作 | PASS | runs.tests actualResult |
| S06-B01 | 每模式 27 observed assets 全 GET 200；Console／Runtime／非預期 Network 0；165 HEAD 回報事件逐筆分類並保留 | PASS | runs.resources／rawRequestFailures／networkClassification |
| S06-B02 | 四輪 app source fingerprint 完全一致；工具修正沒有改 app／out | PASS | runs.sourceFingerprint |
| S06-G01／G02 | 四份公開 HTML、404、.nojekyll、Base Path 與實體資源正確；unknown／dev HTTP 404、dev payload 排除 | PASS | runs.tests／expectedHttp；Pages build log |
| S06-N01（適用性判定） | Solutions 實際 DOM：native disabled／a[disabled]／form／mailto／main aria-disabled 全 0；此盤點程序已完成 | PASS；對應 Disabled／送出測試 N/A | disabledApplicability；沒有為測試新增假控制 |
| S06-E01–E07／V01 | 七張真實 PNG 與 320／375px 補充畫面人工閱讀；正式圖 SHA256 與已檢視版本 7/7 相同 | PASS | manualVisual＋下方七圖 |

每個實際 Test ID 的 Test Item、Command / Procedure、Environment、Expected Result、Actual Result、Exit Code、Status、Evidence、Notes 在 verification JSON 的各 run.tests；環境共用此節，跨程序退出碼以 formalExecutions 為準。async 子斷言本身沒有獨立 shell Exit Code，原值 null／不適用並非虛構 0，也不因此把整項 Status 改成 N/A。原始 axe JSON、診斷與失敗 PNG 保留於記錄的本機 runDir；提交的 JSON 保留各輪結果、原始 failed requests 與逐筆分類摘要，沒有刪除首輪失敗。

## 7. 發現問題、修正與最終重驗

### Source audit 修正

程式完成前的獨立覆核發現並已修正：混合中文技術標籤誤繼承 lang=en、Details 手機 DOM 閱讀序、S11／S14／S15 的實際章節標題及 AI／n8n 後續方向引用。修正後才執行五個品質命令及全部 browser runs。

### 實際失敗與工具修正

1. 首次 Pages 的 S06-F02：工具把 config 的邏輯 `/services` 當成 origin 根 URL，錯判 Next Link 已正確加 Base Path 的 href。改為依明確 Base Path／trailingSlash 正規化預期值，未改 app。
2. 首次 S06-B01：165 個 HEAD 事件回報 ERR_ABORTED，先保留 FAIL。以 CDP／原始 Promise observer／Next source 交叉診斷：HEAD 均 fulfilled 200、CDP response 200，後續 tree／PAGE payload GET 成功；不是 fetch rejection，也不能誤稱 Next 主動 Abort。
3. 分類器僅對 exact public-route HEAD＋Fetch＋ERR_ABORTED＋canceled、已核實 Next prefetch callsite／bundle SHA、同筆 fulfilled200／CDP200、對應 tree GET200及獨立 HEAD／GET200 同時成立才分類。全部 raw failures 保留；真正 rejected、非該探測、asset／Console／Runtime 等仍使驗收失敗。
4. 第二次 S06-B01：分類器對空白 instrumentation stack URL 解析時拋 Invalid URL。加 HTTP(S) frame guard，先用保留 raw events 離線驗證 165/165／unexpected 0，再以新 context 完整重跑全部 70 項。

| 階段／開始 UTC | 結束 UTC | 測試數 | 狀態 | 實際程序 Exit Code |
| --- | --- | --- | --- | --- |
| general / 2026-11-18T16:46:17.645Z | 2026-11-18T16:46:39.363Z | 15 | PASS | 0 |
| pages / 2026-11-18T16:48:25.745Z | 2026-11-18T16:49:41.692Z | 70 | FAIL | 1 |
| pages / 2026-11-18T16:55:05.533Z | 2026-11-18T16:56:19.909Z | 70 | FAIL | 1 |
| pages / 2026-11-18T16:57:21.724Z | 2026-11-18T16:58:35.793Z | 70 | PASS | 0 |

最終完整重驗 PASS、實際 Exit 0；前兩輪仍是 FAIL，未覆寫或把舊成功代替。全部輪次 app source fingerprint 相同，修正僅在外部驗收工具，因此不重造或更動產品 prefetch／套件／部署配置。

## 8. 實際截圖與人工視覺檢查

| Test ID | 真實檔案 | PNG 尺寸 | SHA256 前綴 |
| --- | --- | --- | --- |
| S06-E01 | [task006-solutions-desktop.png](../screenshots/task006-solutions-desktop.png) | 1440 × 11721 | 2257480b12e2b357… |
| S06-E02 | [task006-solutions-mobile.png](../screenshots/task006-solutions-mobile.png) | 375 × 20933 | 85a930aadd0e3951… |
| S06-E03 | [task006-solutions-overview.png](../screenshots/task006-solutions-overview.png) | 1440 × 946 | 06cc5786ae2afdb9… |
| S06-E04 | [task006-solutions-details.png](../screenshots/task006-solutions-details.png) | 1440 × 3982 | 1cc1e24c1b554dff… |
| S06-E05 | [task006-solutions-technology.png](../screenshots/task006-solutions-technology.png) | 1440 × 1552 | ccfd8f2a96c7a8e2… |
| S06-E06 | [task006-solutions-process.png](../screenshots/task006-solutions-process.png) | 1440 × 597 | 18c5e514429ce54f… |
| S06-E07 | [task006-solutions-footer.png](../screenshots/task006-solutions-footer.png) | 1440 × 541 | dd76638f400c70ee… |

已實際檢視上述七張，以及 320／375px Hero、Details、Technology、流程補充畫面：標語與 CTA 完整、Logo 比例正確、文字／技術標籤可讀、四案排列與間距一致、桌面流程橫排／手機直排、Footer 導覽清楚，無觀察到遮蔽或裁切。最終七圖與人工檢視版本 SHA256 完全相同（7/7）。這些是實際執行畫面，不是示意圖；axe 與截圖都不代表完整輔助科技認證。

## 9. Known Issues、N/A 與尚待確認

| Test ID／項目 | 適用性／狀態 | 未執行原因與界線 |
| --- | --- | --- |
| S06-O01 — `npm run dev` smoke | Optional／PENDING | 已驗 fresh 一般 production 與 Pages 靜態模式，未額外啟動開發 HMR server；沒有獨立 Exit Code，不記為 N/A 或 PASS |
| S06-O02 — 額外瀏覽器／真實裝置 | Optional／PENDING | 本輪使用 Chromium headless 及 375px hasTouch／2× 模擬，未另行使用其他瀏覽器或真機；不替代或冒充其他環境驗收 |

- 未有阻礙本機交付的程式或驗收 FAIL；兩次工具失敗已有修正與完整最終重驗，原紀錄保留。
- 本機 Chromium／HTTP HEAD 完成事件差異有逐筆佐證，不宣稱原始 Network failure 列表為空；非預期錯誤為 0。
- 既有 ESLint deprecated 提醒未以套件升級處理；此為保留版本的已知上游提醒，非本次 lint 失敗。
- 無公開 native disabled／form／API 提交，對應互動測試 N/A 並附 DOM 盤點；不建立假控制或回應。沒有真機／完整 Screen Reader 測試，不宣稱全平台或完整 WCAG 認證。
- 正式聯絡管道、最終 Logo／OG／中文品牌、產品／Demo／客戶授權、報價／工期／SLA／成效仍 Pending Confirmation；Solutions 使用有來源方向、Provisional Logo 與有效 `/#contact`，不虛構或阻塞既定保守靜態範圍。
- 保留 noindex／nofollow，不修改 DNS／Custom Domain／Vercel／Pages Source。Task 007–014 功能仍屬獨立後續任務。

## 10. Git、PR、CI 與部署階段

本機報告與七張截圖已在 PR 建立前納入實作 Commit。這是 PR 建立後的一次純文件補正；程式碼指紋再次核對不變。此節是第一輪 PR 的實際證據快照，不把它當成後續新 head 或 main 的結果。

| 階段 | 實際證據與狀態 |
| --- | --- |
| 實作 Commit／Push | `654997c49d74442ef261ac8d1c8ffbfb75142b92`，已推送 `feature/website-solutions-page` |
| Pull Request | [PR #10](https://github.com/xk2022/xk-website/pull/10)，Base `main@35639d881f2805765f6ceee0bb159d5225984975` |
| 第一輪 PR CI | [Run 44356017395](https://github.com/xk2022/xk-website/actions/runs/44356017395)，精確 head 為上述實作 Commit，2026-11-18 17:12:22–17:14:03 UTC，SUCCESS |
| Quality | [Job 134984200193](https://github.com/xk2022/xk-website/actions/runs/44356017395/job/134984200193)，SUCCESS；17:12:26–17:13:16 UTC |
| Pages build | [Job 134984807091](https://github.com/xk2022/xk-website/actions/runs/44356017395/job/134984807091)，SUCCESS；17:13:19–17:14:02 UTC |
| PR Deploy | [Job 134985335127](https://github.com/xk2022/xk-website/actions/runs/44356017395/job/134985335127)，SKIPPED；功能分支未部署 |
| Review | 獨立程式／來源／文件覆核 Blocking 0；精確比較兩端 Tree，28 個 Commit Blob 與受測內容一致，沒有受保護檔案或機密變更。此為獨立覆核，不是 GitHub 正式 APPROVED review；當時 GitHub reviews 為空 |
| 使用者合併授權 | 本輪已明確授權 Push and merge；仍須確認最終 head 的實際 Checks 與 artifact |
| 後續階段 | 此快照時，純文件補正的新 head CI／合併／main CI／部署／公開網址驗證均 PENDING；實際事件發生後在下述 PR 最新交付紀錄補齊 |

第一輪實際 Pages artifact `14452321583` 已下載核對：49 項斷言 PASS（含 digest），173 檔、32 個 HTML／TXT／JSON payload 無 dev，四頁、404、`.nojekyll` 及 127 個 HTML／CSS 引用資源均存在且 Base Path 正確。127 是全部靜態引用，與瀏覽器實際載入的 27 個資源分開計算。ZIP SHA256 `51a47c3bc80220dc6b90777941788b6e8f893b2d9e593df57af262d1e8b1ca01` 與 GitHub digest 相符。證據見結構化 JSON 的 `remote.pagesArtifact`；本輪沒有把下載產物提交至 Repository。

下載時 `gh run download` 的 Azure Blob redirect 實際回覆 Forbidden；改由 GitHub connector 取得同一 artifact 並成功下載，未保存暫時 signed URL。產物檢查器初稿誤把舊頁 SVG 的 `<title>` 併入 HTML Title 欄位；已限制為 HTML head/title，新增四頁精確 Title／Description／OG 比對，對同一 ZIP 完整重驗 49 項通過。原結果原封保存在 JSON 的 `remote.pagesArtifactInitialInstrumentationResult`，修正與重驗詳見 `instrumentationIssue`。這是驗收工具修正，沒有修改應用程式或降低標準。

最終文件 Commit 的 CI、artifact、Merge SHA、main CI、部署與公開網址驗證將記錄於 [PR #10 最新交付紀錄](https://github.com/xk2022/xk-website/pull/10)。每階段只採用已完成的精確 SHA／Run，不沿用第一輪 CI，不透過追加自參 SHA 製造無限文件 Commit。合併、CI 與正式部署各自查證。
