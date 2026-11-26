# DC-007｜完整驗收與發布準備報告

日期：2026-11-26 UTC。分支：`test/design-collection-release`；base main：`ee4b4709a9f8daa755e2595a46c158b3c92d8229`。依[本輪規格](../task/dc007.md)、[原工作包 §9–10](../01_design/design-collection/work-packages.md#dc007)、[AGENTS](../../AGENTS.md) 與[協作流程](../03_engineering/subagent-workflow.md)執行。

**發布驗收尚未通過。** 已完成的網站／品質／PDF／畫面結果與原始 FAIL 分開記錄；Human AT 仍 BLOCKED，部分原始網路取消原因未確認，效能實測另見下節。交付 Draft PR 供審閱與追蹤，不自動合併或部署。沒有以先前 main 成功取代本輪驗收。

## 1. 基準、來源與變更

DC-006 [PR #44](https://github.com/xk2022/xk-website/pull/44) 已合併，main run [45820416409](https://github.com/xk2022/xk-website/actions/runs/45820416409) 在 2026-11-26 12:33:10Z 部署完成。這是前置版本；本輪公開清冊為 Modern 16＋Heritage 16＋Luxury 16＋Gallery 1＝49 頁。

公司 repository 唯讀核對 main `f1be01c0c5d8bc5b1238f250838e336bef47b149`／tree `84f9388877b9f73dc81276200d0164625d228c90`。來源全文範圍、Blob、實際重讀與沿用同 Blob 的界線見 [source review](dc007-artifacts/source-review.md) 及[機器清單](dc007-artifacts/source-review.json.gz)。根 AGENTS 與工程／測試／發布規範 Blob 未變；品牌規範及當日 confirmed 決議重新核對：

| 公司規範 | 固定 Blob／本輪決定 |
| --- | --- |
| 根 `AGENTS.md` | `a7ca443ddd1d1b847dc58152bbb56c1425c1b522` |
| [Logo 規範](https://github.com/xk2022/xplore-kaleidoscope/blob/f1be01c0c5d8bc5b1238f250838e336bef47b149/05_brand/logo-guidelines.md) | `ff44b6107b388202f06bda344c5be68002bbc225`；L31–33 允許既有網站在對應 V2 衍生素材交付前保留部署素材 |
| [色彩](https://github.com/xk2022/xplore-kaleidoscope/blob/f1be01c0c5d8bc5b1238f250838e336bef47b149/05_brand/color-palette.md) | `42fa98d525b91f04e76f1f7cc3fb2efe65f477c6`；保留現有網站／產品介面色票 |
| [字體](https://github.com/xk2022/xplore-kaleidoscope/blob/f1be01c0c5d8bc5b1238f250838e336bef47b149/05_brand/typography.md) | `7ade30e8703d18a79953804a6bbf3908e25f78f7`；Manrope 600 為向量 Logo 字標，UI 仍 Inter／Noto Sans TC |
| [2026-11-26 決議](https://github.com/xk2022/xplore-kaleidoscope/blob/f1be01c0c5d8bc5b1238f250838e336bef47b149/10_decisions/2026-11-26.md) | `92d68e05c95825c1900d2387d4e27257dbeb7fd8`；Logo V2 已 confirmed，但不自動授權本輪整站素材遷移 |

本輪沒有改網站文案、價格、版面、功能、套件、lockfile、Next 設定、workflow、DNS 或公司 repository。唯一程式來源差異為 `globals.css` 四個精確 `@source not`，排除本輪規格／報告／證據／維護文件，避免測試文字產生網站 utility；所有介面 CSS declarations 原樣保留。新增驗收文件與證據、維護／rollback 指南，更新現況索引。

受測 218 檔來源 fingerprint：`661f6cd2ac68add9e0887849819b8568f647b867ee72b8fa85ecf27beb39f16c`，詳 [source.json](dc007-artifacts/source.json.gz)。另外將本輪真實 Pages `out/` 與既有固定清冊／位元組基準作嚴格離線比較：**2,942 assertions PASS，Exit 0**；49 公開 HTML、516 檔、164 runtime/static 檔（6 CSS、21 JS、115 fonts）一致。只允許三個真 Next BuildID manifest 路徑及 HTML／RSC 真 BuildID token 正規化，沒有正規化 CSS／JS／圖片／字體 bytes。這是新的輸出比較，不是挪用舊瀏覽器驗收。[結果](dc007-artifacts/artifact-local-check.json.gz)／[回執](dc007-artifacts/artifact-local-command.json.gz)。

## 2. 環境與實際指令

Linux 6.18.57 x86_64／glibc 2.41，Node 24.22.1、npm 11.9.0、Python 3.12.14；Next 16.4.6、React 19.3.1、TypeScript 5.9.3、Tailwind CSS 4.3.3。外部驗收工具：Chromium 156.0.8078.79、Playwright 1.65.1、axe-core 4.14.1、Lighthouse 13.6.0、PyMuPDF 1.26.6、Pillow 13.0.0、zxing-cpp 2.3.0；沒有加入 app npm Dependencies。

長指令均以 `scripts/run-with-evidence.py` 觀察真 subprocess exit，保存完整 command／cwd／開始及結束時間／log SHA；下表 evidence 相對 [證據目錄](dc007-artifacts/README.md)，每個同名 `.log.gz` 為實際輸出。人工檢視的 Exit 是 N/A，不填造 0。

| Test ID | Command／Procedure | Expected | Actual | Exit | Status／Evidence |
| --- | --- | --- | --- | --- | --- |
| DC7-Q-CI | `npm ci --cache /tmp/xk-npm-cache` | 安裝 lockfile 完成 | 完成，未修改 lockfile | 0 | PASS；[receipt](dc007-artifacts/npm-ci.json.gz) |
| DC7-Q-GEN | `npx next typegen` | 最新 route types | 完成 | 0 | PASS；[receipt](dc007-artifacts/typegen.json.gz) |
| DC7-Q-TS | `npx tsc --noEmit` | 無型別錯誤 | 完成 | 0 | PASS；[receipt](dc007-artifacts/typescript.json.gz) |
| DC7-Q-LINT | `npm run lint` | 無 ESLint 錯誤 | 完成；附件加入後另跑 final lint | 0 | PASS；[receipt](dc007-artifacts/lint.json.gz) |
| DC7-Q-TEST | `npm test` | 所有既有 native tests 完成 | 六組 32＋14＋86＋59＋24＋221＝436 PASS；0 fail／skip／todo | 0 | PASS；[receipt](dc007-artifacts/test.json.gz)／[log](dc007-artifacts/test.log.gz) |
| DC7-Q-NORMAL | `npm run build` | production build | 完成 | 0 | PASS；[receipt](dc007-artifacts/build-normal.json.gz) |
| DC7-Q-PAGES | `npm run build:pages` | 靜態輸出、49 公開頁及保護通過 | 最終 v3 完成 | 0 | PASS；[receipt](dc007-artifacts/build-pages-v3.json.gz) |
| DC7-HTTP-NORMAL | `python3 scripts/smoke-website.py --base-url http://127.0.0.1:3280/ --output /tmp/xk-dc007/http-normal-result.json` | 全49頁、href／anchor／metadata／資產及負向保護 | 3,274 PASS＋2 N/A | 0 | PASS；[result](dc007-artifacts/http-normal-result.json.gz)／[receipt](dc007-artifacts/http-normal-command.json.gz) |
| DC7-HTTP-PAGES | 同入口，`--base-url http://127.0.0.1:3281/ --check-external --output /tmp/xk-dc007/http-pages-result.json` | 根 basePath、靜態資產、SEO／404／外連 | 3,282 PASS | 0 | PASS；[result](dc007-artifacts/http-pages-result.json.gz)／[receipt](dc007-artifacts/http-pages-command.json.gz) |

Normal 的 2 N/A 只限 Next private SSR error-shell 外框，不排除公開頁或整個 namespace；HTTP fixture、實際預期及各筆理由在 raw result。原 Pages v1／v2 build 也 Exit 0，但停止 npm wrapper 後仍發現專屬 Next 子程序；核對 PID／指令、停止並驗 port 3280 已關閉後重建 v3，前兩次不用於 Pages 驗收。原回執與[停止證據](dc007-artifacts/normal-server-stop.json.gz)均保留；維護指南已補停止子程序與確認 port 的操作。

Normal 3280 完成驗收後才切 Pages；Pages 使用 loopback 3281、gzip 6／hashed asset max-age 600／HTML no-cache＋ETag 的本機標準庫 server。RSC／HEAD／真 404 及 query-preserving directory redirect 有 fixture 與真 request readiness；這個受控 preview 不是正式 hosting，也未新增公開 port。效能時停止其餘 browser／PDF／axe／build 工作。

## 3. 內容、行為與完整瀏覽器矩陣

工具接受固定 `source.json`、49 route fixture 及 `--base`／`--mode`／輸出目錄；工具／fixture／真 command 已封存。每模式預期 531 assertions：49×五寬＝245 layouts、119 axe scans、39 business assertions、96 identity 切換方向、3 print-media cases，以及其餘 focus／PII／history 等專項。Pages 另產 47 張圖；不是增加未執行頁數。

| Test ID | Procedure／Expected | Actual | Exit | Status／Evidence |
| --- | --- | --- | --- | --- |
| DC7-BROWSER-NORMAL-V1 | 原完整 browser 工具；每頁五寬進入、reload、有效錨點、圖片解碼／資源、DTO、text spacing；互動完整結束 | 531/531 完成，527 PASS／4 FAIL；245 layouts、119 axe、39 business、96 identity、3 print；console/runtime/PII 0 | **1** | **FAIL**；[raw](dc007-artifacts/normal-final/result.json.gz)／[receipt](dc007-artifacts/browser-normal-command.json.gz) |
| DC7-BROWSER-NORMAL-TARGETED-V2 | exact DTO attribution oracle 修正後，僅重驗受影響 3 Portfolio 375、spacing/reload/content、3 focus skip、About paint bounds 及 2 原 identity 流程 | 7/7 assertions PASS、strict network 0；工具仍回 MANUAL_PENDING／幾何候選待獨立判讀 | **2** | 原 Exit 2 保留；限定項 PASS，非完整531重跑；[raw](dc007-artifacts/normal-affected-v2/result.json.gz)／[整合判讀](dc007-artifacts/normal-targeted-composite-review.json.gz) |
| DC7-BROWSER-PAGES-V2 | 完整 Pages matrix、47 真圖、同內容／導航／控制項及 Base Path | 531/531 完成，530 PASS／1 final network FAIL；245 layouts、119 axe、39 business、96 identity、3 print、47圖；console/runtime/PII 0 | **1** | **FAIL**；[raw](dc007-artifacts/pages-final/result.json.gz)／[receipt](dc007-artifacts/browser-pages-command.json.gz) |

內容逐項核對服務 ID／說明、作品狀態／來源／權利／外鏈、計畫與 reference-only、完整價格及限制。業務互動涵蓋 Contact 原生驗證／手動複製及 Clipboard 拒絕、試算17加購／相容重設／from 與 quote 未知不為零／年度分列／無複雜度倍率；storage 拒絕／舊選項 sanitizer、唯一選項 ID key、跨頁／風格／history／Activity／bfcache 清除個人欄位與草稿、query 不帶 PII、三向切換與共同合法 hash／Footer／Menu 連結。目前正式catalog沒有included加購；included不重計的數學與相容性由436組中的native synthetic fixtures覆蓋，不冒稱瀏覽器曾選到不存在的included方案。沒有實際寄信、提交訂單或收件成功宣稱。

### 原 FAIL 與修正界線

1. **Normal 三個 Portfolio 375 FAIL 是工具 oracle 問題。** regex 錯拒已核准的 Start Bootstrap attribution。v2 只允許固定 DTO 的 exact attribution.href；reference-only 的 image／demo href 仍須 null。10 個正／負 fixture 真 Exit 0，fresh 3 頁補完被阻斷的 content／spacing／reload。App 未變；保留 v1 SHA、raw FAIL、diff 及新工具 SHA，不把原531改成全 PASS。
2. **Normal 兩次 GET script `ERR_ABORTED` 原因 UNKNOWN。** 都在實際跨風格導頁附近，同 chunk；原紀錄沒有完整 loader／response body。fresh exact 兩流程和該 chunk 真 GET 200＋body SHA 通過，只證實重驗結果，不能追溯回填原 request。原 final network gate 仍 FAIL。詳[診斷](dc007-artifacts/normal-script-cancel-readonly-review.json.gz)及[後續限定重驗](dc007-artifacts/normal-targeted-composite-review.json.gz)。
3. **Pages final network FAIL 有55筆取消：16 GET＋39 HEAD。** 16 GET 逐筆有 speculative RSC headers／prefetch／合法路徑與輸出對照；39 HEAD 中32原紀錄有200 HTML headers，另 **7 status-null 仍 UNKNOWN**（23341、23342、23343、23839、23840、23841、29895）。沒有 CSS／JS／圖片／字體 request failure。完整 URL／source／request ID 的限定覆核不等於全部取消豁免，也不把 server304或其他來源成功回填原請求。詳[合併判讀](dc007-artifacts/pages-network-composite-review.json.gz)及[39 HEAD 逐項](dc007-artifacts/pages-head-readonly-audit-v2.json.gz)。其 read-only review Exit 0 僅代表分類工具完成，不能取代產品網路 gate。

## 4. 可及性、原生縮放與人工門檻

每模式119次 axe＝49手機完整公開頁＋28桌面代表頁＋7真展開 menu＋11真 main disclosure＋24 Contact／Quotation狀態。兩模式各 **0 violations、384 incomplete**；沒有將 incomplete 當0或略過 Gallery／原生 details。

- Normal 384逐項＝354漸層 target＋30被實際不透明選單完整遮蔽的 target。fresh31 route／width／state、全部384 target相符；保存DOM／實際五份CSS／source snapshots。24項另包住真8% menu shadow、以1000 alpha封閉區間保守計算；最小 gradient lower bound **4.7932155:1**，closed target 最小 **4.9747527:1**。遮擋各有9/9 topmost panel hits，閉合後另核同 target，而非猜白底。限定判讀沒有確認對比缺陷。[摘要](dc007-artifacts/a11y/normal-contrast-summary.md)／[逐筆map](dc007-artifacts/a11y/adjudication-normal-v2.json.gz)。
- Pages384以相同target／state／paint geometry及真CSS raw bytes橋接，另fresh三組closed/open menu、30target及6圖；27個slash及20個selector差異用5個公開alias的明示映射，不忽略paint差異。正式Pages suite結束後，fresh projection與原119scan投影完全一致，真 Exit0。[摘要](dc007-artifacts/a11y/pages-contrast-summary.md)／[map](dc007-artifacts/a11y/pages-contrast-bridge.json.gz)／[final reconciliation](dc007-artifacts/a11y/pages-final-projection-command.json.gz)。原 axe384及兩套原 Exit1不變。
- 原幾何候選3653 targets：3611至少24px、33具原生關聯label、9inactive；無未解 target hit 候選。83 clipping warnings＝82 visually-hidden候選（66真1px＋16有padding的skip）及1個Modern About375旋轉裝飾。按source／computed style及focused-skip補驗；About可見文字／連結實際paint bounds仍在框內，不是把旋轉裝飾bbox當文字截斷。[source review](dc007-artifacts/normal-sr-only-source-review-v2.json.gz)／[整合判讀](dc007-artifacts/normal-targeted-composite-review.json.gz)。原warnings／MANUAL_PENDING不改寫。
- Keyboard／focus、實際menu／Escape／Tab離開／觸控與焦點遮蔽、320 reflow、文字間距及Reduced Motion依raw Test IDs驗。這些觀察不是WCAG全項認證。

**真正原生瀏覽器200% zoom：PASS（限定Normal16頁範圍）。** Linux Chrome實際鍵盤縮放及原生選單100→200，outerWidth不變、innerWidth1180→590、CSS zoom始終1；三系列Home／Services／Portfolio／Contact／Quotation及Gallery共16頁，0水平overflow，48個Header Tab及6個首表單控制項觀察通過。操作後回100%並關閉本輪tab。沒有宣稱Normal49逐頁、Pages原生zoom重跑或每個focus state均測。原生menu100／200兩張真圖與DOM／原生Terminal紀錄見[desktop summary](dc007-artifacts/desktop/summary.json.gz)及[原始資料](dc007-artifacts/desktop/shared-evidence/native-zoom-16-pages.json.gz)。

**真人螢幕閱讀器：BLOCKED（Required）。** 實際Native Terminal缺Orca、speech-dispatcher、espeak／espeak-ng，且尚無真人三系列旅程紀錄。AI視覺／鍵盤、AX tree、axe及zoom均不替代。已準備[真人驗收交接單](dc007-artifacts/human-at-handoff.md)：各系列Home→Services→Portfolio→Contact／Quotation，固定source SHA、OS／AT／browser版本、實際朗讀／landmarks／labels／error／selected／disabled及問題結果；使用合成資料，不寄出Email。不降為N/A、不宣稱完整驗收通過。

## 5. 實體 A4 與跨頁列印

共8份採用PDF：Normal4＋Pages v2 4。每模式三系列最大SHOP17加購、40中文字客戶／60字專案，另Modern APP補充from價；17加購SHOP本身沒有from，不能假稱同一組合已覆蓋。每份15個實體檢查，共 **120 PASS**，capture／physical真 Exit0；每份1頁A4、完整文字／實際圖元在0.1pt容差頁內、原Logo及兩QR可見，150及300dpi對完整頁面真正zxing decode為www官網／作品網址。僅三個精確白色canvas fills作幾何分類，不放寬文字／內容邊界。

| 模式 | 實際採用證據 | OS Exit | 人工觀察 |
| --- | --- | --- | --- |
| Normal v1 | [capture](dc007-artifacts/pdf/normal-v1/capture.json.gz)／[physical batch](dc007-artifacts/pdf/normal-physical-v1/batch.json.gz) | capture0、physical0 | [4張150dpi逐檔紀錄](dc007-artifacts/pdf/normal-manual.json.gz)，0可見阻擋 |
| Pages v2 | [capture](dc007-artifacts/pdf/pages-v2/capture.json.gz)／[physical batch](dc007-artifacts/pdf/pages-physical-v2/batch.json.gz) | capture0、physical0 | [4張150dpi逐檔紀錄](dc007-artifacts/pdf/pages-manual.json.gz)，0可見阻擋 |

三個worstcase PDF共用標準白A4而非隨風格換色；同模式實圖byte相同有明示SHA橋接，仍逐path開啟。這8組不代表所有組合、tagged-PDF讀屏、所有任意長文或實體紙本印刷。

原Pages PDF v1 **Exit1／FAIL**（31個取消）保留；29 unique URL候選中2個request身分歧義，未倒填狀態。v2採精確共用monitor、移除工具route攔截，保存原diff／[version bridge](dc007-artifacts/pdf/collector-version-bridge.json.gz)及fresh四PDF，不把v1改PASS。新的31 HEAD及31對應RSC皆有真200，未以未知取消通過。

跨頁print-media原fullsuite各模式3項通過；另外補三張Pages1440×1000真viewport截圖（非額外PDF、非47網站圖）。補測v1 **Exit1**：Heritage首個Footer圖片品牌連結不可操作而timeout，原原因未確定、Luxury有未配對取消。fresh首頁probe確認Logo190×125.64正常，不改AppCSS。v2僅先scroll／decode Footer Logo，再點同風格Footer目錄文字Home NextLink並等真SPA完成；三組 **Exit0**，切前白A4 active1、切後Home active0／A4 visible0／switcher visible0，時間原點不變。三原圖均實看，0可見阻擋，見[v2結果](dc007-artifacts/pdf/cross-page-print-v2/result.json.gz)／[人工紀錄](dc007-artifacts/pdf/cross-page-print-v2-manual.json.gz)。保留[v1](dc007-artifacts/pdf/cross-page-print-v1/result.json.gz)、原工具／diff，這是限縮補驗而非重印8PDF或重跑531。

## 6. 效能實測

**Cold採樣完成，TBT目標FAIL。** 6頁×各3個有效樣本＝18個；18個Lighthouse子程序皆Exit0，外層按真門檻回Exit1（不是中斷／timeout）。所有樣本及原始JSON／HTML／trace／DevTools log保留，沒有挑選有利run或放寬profile。[summary](dc007-artifacts/performance/cold/summary.json.gz)／[外層receipt](dc007-artifacts/performance/cold-process.json.gz)／[分析](dc007-artifacts/performance/analysis.md)。

Pages為主測，固定mobile375×812／DPR1／CPU4、DevTools實際150ms latency、200000down／93750up bytes/s，Lighthouse13.6.0／Chromium156；gzip6 preview、hashed cache600／HTML no-cache＋ETag。每次fresh Chrome process/profile及storage reset，三次連續為一頁，ModernHome為預先約定首組。最大風險頁按實際HTML／initialJS及控制項盤點選三系列Quotation，不拿舊九頁或歷史工具成績代替。效能時無其他browser／axe／PDF／build，背景host實體頻率及雲端負載仍不完全可控。

下列為median［min–max］；LCP／TBT單位ms，CLS無單位。逐run原值／個別exceedance在summary，不把warm和cold混算。

| 頁面 | LCP（目標≤2500） | CLS（≤0.1） | TBT（≤200） | Status |
| --- | --- | --- | --- | --- |
| modern home | 1889.860 [1857.614–2037.639] | 0.000 [0.000–0.000] | 1552.949 [965.657–1814.294] | FAIL（TBT） |
| modern quotation | 1705.993 [1681.946–1741.013] | 0.000 [0.000–0.000] | 1294.676 [1064.019–1503.269] | FAIL（TBT） |
| heritage home | 1629.815 [1570.242–1722.188] | 0.000 [0.000–0.000] | 1441.245 [1278.147–1827.308] | FAIL（TBT） |
| heritage quotation | 1652.054 [1649.699–1704.771] | 0.000 [0.000–0.000] | 1225.644 [1107.293–1280.872] | FAIL（TBT） |
| luxury home | 1661.712 [1606.242–1917.021] | 0.000 [0.000–0.000] | 1305.136 [1079.977–1432.559] | FAIL（TBT） |
| luxury quotation | 1765.885 [1592.110–1870.050] | 0.000 [0.000–0.000] | 1201.206 [1181.541–1257.659] | FAIL（TBT） |

六組的LCP及CLS均達標，六組TBT未達，所有18個別TBT也超標。首組真trace顯示：16個字體請求transfer1,091,912bytes（約總量79%），main-frame Layout累計1499–2228ms，12–13次逾50ms的Layout緊接RemoteFontLoaded≤20ms，dirty layout objects約1147；ReactDOM script evaluation亦有247ms長task。GC不是主要成本。支持「多個中文字型subset在swap完成後反覆全頁排版」為主要成本觀察，但沒有反事實實驗，不能聲稱某一font／單一修法的獨立收益或排除host影響。[原report／traceSHA及診斷](dc007-artifacts/performance/cold-home-diagnostic.json.gz)。

本輪沒有App效能改動，因此是**同一release candidate的實測baseline**；沒有捏造before／after改善率。保留Inter／Noto Sans TC／swap、版面／內容／互動／標準A4，將實際未達保留為阻擋發布聲明的Known Issue。後續先在隔離對照驗證字體載入批次／fallback metrics或離屏layout工作量的最小修法；若採content visibility／contain等手段，先證明深頁hash／focus／所有內容／print不退化，再同profile至少各3個after並回歸受影響49頁兩模式。未證明安全收益前不將推測當正式修正或用換品牌字體取得PASS。

**Warm v2六組完成，真Exit0。** 同context先prime再reload，各有29／34／32／36／32／36筆真cache證據；依序Modern Home／Quotation、Heritage Home／Quotation、Luxury Home／Quotation的load LCP為760／800／760／468／720／548ms，CLS均0。實際menu／Escape、Home原生同頁CTA及Quotation選項共27動作，timeOrigin維持同document，interaction Document request0；console／runtime／requiredGET failure及HTTP≥400均0。另保留40筆HEAD原始取消，補充唯讀inventory確認40/40原CDP皆已有200 headers（非補造狀態）、六組review旗標均true，這只證實warm capture／操作完成，**不聲稱全網路PASS**。load longtask sums、EventTiming只是diagnostics，沒有捏造warm TBT或INP。[summary](dc007-artifacts/performance/warm-v2/summary.json.gz)／[真receipt](dc007-artifacts/performance/warm-v2-process.json.gz)。

原warm v1在Modern Home真CTA click後立即讀URL，hash尚未提交而assert FAIL／Exit1，只有首case部分資料；原cache證據與兩menu動作不是6組完整驗收。v2只加入bounded `waitForURL`等待真NextLink hash commit，其餘timeOrigin、profile、cache／metrics及gates不變；fresh六組全跑，App未改、沒有手動注入hash。[diff／版本界線](dc007-artifacts/performance/warm-version-bridge.json.gz)，原v1保留。

以上均為受控lab，不是field INP、CWV p75、真機或實體網路保證。沒有fieldWindow／INP值；EventTiming及longtask diagnostics不改稱TBT或field通過。

## 7. 47 張實際網站畫面

[截圖總索引](../screenshots/design-collection/dc007/README.md)／[SHA清冊](../screenshots/design-collection/dc007/visual-index.json)／[47張逐檔觀察](../screenshots/design-collection/dc007/visual-review.json)。15首頁＝3系列×五寬；24內容頁＝Services／Portfolio／Contact／Quotation×3系列×375/1440；Gallery2；三系列March Tangbao代表詳頁6。全為本輪Pages原始full-page PNG，未用原型或舊圖替代，模式清楚。

47原SHA與raw suite一致，逐張開啟實看。觀察範圍為全頁構圖總覽及top／middle／footer原圖裁切，沒有宣稱所有長圖細字逐字閱讀；互動／HTTP／axe／paint計算各有別的證據。未見可見阻擋；**Heritage Contact375/1440步驟同時有原生序號及01／02／03（例如3.03）**為low cosmetic，文字完整可讀，列Known Issues，未為本輪驗收重新設計版面。PDF渲染與跨頁print圖另外保存，不灌入47數量。

## 8. Known Issues 與剩餘門檻

| ID | Status | 影響／實際原因 | 下一步／交付界線 |
| --- | --- | --- | --- |
| DC7-KI-AT | **BLOCKED** | Required真人三系列讀屏紀錄及工具環境缺少 | 依交接單由真人在可用AT平台完成；不能由AI／CI替代 |
| DC7-KI-NET-N | **FAIL** | 原兩GET script取消原因UNKNOWN；fresh exact兩流程成功不能追溯證明原因 | 保留原網路gate，若需關閉則限定重現並增加request／loader關聯；不廣泛忽略ERR_ABORTED |
| DC7-KI-NET-P | **FAIL** | 原7個status-null HEAD無嚴格觀測證據，分類工具成功不等於產品gate成功 | 保存精確request IDs及合法路徑；原raw缺response不可補造；後續限定調查，不把全部HEAD當N/A |
| DC7-KI-PERF | **FAIL** | 18有效cold／六組TBT median全超200ms；完整採樣Exit1，字型完成後全頁layout為主要成本觀察 | 保存baseline及trace，先隔離確認保留品牌與全行為的最小修法，再同profile重驗；這輪不聲稱release通過 |
| DC7-KI-COSMETIC | PENDING | Heritage Contact兩尺寸的步驟重複編號，low、非阻擋 | 可在後續窄範圍外觀修正；需Contact兩尺寸／list語意回歸，不重製整頁 |
| DC7-FIELD | PENDING | 無真機／field資料 | Optional未測；不宣稱INP、CWV p75或真機通過 |

原FAIL、Exit2／MANUAL_PENDING、axe incomplete、工具前檢與sandbox錯誤均保存；能確認的工具問題已修並限定補驗，未證明的App問題不猜原因或用CSS改動掩蓋。人工／外部Required缺口與仍未通過的gate使本輪**不能宣稱完整發布ready**，但不阻止保存可獨立完成的驗收與建立真實狀態PR。Contact收件、正式價格、LogoV2上線、法律政策、搜尋索引與DNS沒有新增核准。

## 9. 檔案、證據及交付階段

新增：本輪[規格](../task/dc007.md)、本報告、[維護與rollback指南](../03_engineering/design-collection-maintenance.md)、`docs/reports/dc007-artifacts/`與`docs/screenshots/design-collection/dc007/`。更新：`AGENTS.md`、`README.md`、`docs/01_design/README.md`、`docs/03_engineering/design-collection-core.md`、`docs/98_decisions/implementation-notes.md`、`docs/reports/README.md`、`docs/task/README.md`、`docs/task/ROADMAP.md`及上述四條CSS掃描排除。詳細新增證據檔以[manifest](dc007-artifacts/manifest.json)為準，工具／log／大JSON採gzip，記原始與包裝SHA／長度；47PNG只存一次。沒有`.next/`、`out/`、dependencies、暫存cache或機密。

最終附件加入後 `npm run lint` 真Exit0；文件／來源／證據一致性檢查真Exit0、49 checks PASS，包含Markdown格式與內部路徑／anchors、manifest解碼SHA、218來源bytes、47原圖與逐檔檢視coverage、lock／Next／workflow不變、Diff及解碼附件敏感資訊pattern檢查。原Browser／效能FAIL及HumanAT BLOCKED仍保留，這個PASS只限文件／證據一致性。真回執為證據目錄中的 `lint-final.json.gz`、`final-doc-check.json.gz` 及 `final-doc-check-result.json.gz`（最後文案補記另有 `final-doc-check-v2.json.gz`／`final-doc-check-v2-result.json.gz`）；沒有以此覆蓋發布門檻。純文件補記不重跑不相關App矩陣；新exacthead CI仍須生成自己的artifact，與本輪測試輸出嚴格核對。

| 階段 | 本報告快照狀態 |
| --- | --- |
| 本機完整Required驗收 | **FAIL／BLOCKED**，見上列實際結果，不宣稱全PASS |
| Feature commit／push | PENDING；最終實際SHA於Git／PR呈現，避免自記SHA循環commit |
| 新PR／exact-head CI／真Pages artifact | PENDING；後發遠端run／artifact／檢查更新同一PR Description，不借用PR44 |
| 人工review／合併／main CI／部署／公開驗證 | PENDING；本輪未授權merge/deploy，不發布功能分支，沒有本輪部署成功聲明 |
