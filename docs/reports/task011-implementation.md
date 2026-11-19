# Task 011 — 網站效能最佳化與驗證

日期：2026-11-19 UTC。本報告保留初次 PR 前的字體量測快照，並在末節記錄 CI 發現的原碼掃描修正及補驗；之後實際發生的 PR CI、Review、merge、main CI、部署與公開驗證更新於同一 PR 說明，避免為記錄自身 SHA 製造循環 Commit。實驗室結果不代表 field CWV、真機結果或對外 SLA。

## 基準、授權與來源

- 唯一修改 `xk2022/xk-website`，fresh fetch 後 main／origin main 同為 `633d135b50fe292368ab4479b9ae69af91b31928`，工作目錄乾淨；Task 010 PR #15 已合併。分支為 `feature/website-performance`。
- 使用者明確授權本次開發、驗證、Push、PR、CI 通過後合併與確認部署；沒有變更索引、法律核准、資料蒐集、DNS／Vercel 或 Pages Source 的授權。本次不操作這些項目。
- 完整閱讀 [Task 011](../task/task011.md)、AGENTS、README、[協作流程](../subagent-workflow.md)，核對架構、品牌、歷史紀錄及當前程式。17 份本機文件的閱讀／相同 Blob 全文共享紀錄見封存的 `source-audit.json`；歷史測試結果沒有充當本次 PASS。
- 文件 Repository 僅讀。`2026-11-19T07:27:02.372Z` fresh API 確認 main 仍為 `95ef1275a46ace76e11f668178ca881087483398`、Tree `8bba493a05911a11a7e29d7d01650e9d0e00f3e7`；51 個 Blob 全相符。Task 011 §3 的技術決策 ASK、品牌、色彩、字體、架構與 MVP 六份來源皆固定同版並記錄 Blob／章節／採用界線。
- 已讀安裝版 Next Font／Images／Lazy Loading 文件；官方 [CWV](https://web.dev/articles/vitals) 與 [Lighthouse Performance](https://developer.chrome.com/docs/lighthouse/performance) 在本日實際 HTTP 200，正文與查閱紀錄封存於 `technical/`。不將舊 Lighthouse 評分權重當成本版工具實測。
- baseline 公開 Pages deployment `7906539025` 為上述 main SHA，狀態 success；公開 HTML／CSS HTTP 200、實際 gzip／Cache-Control `max-age=600`。這是部署／Header 觀察，不是公開站三次效能比較。

## 受測環境與版本

Linux 6.18.57 x86_64／glibc 2.41，AMD EPYC 9V74、5 個可見 logical CPU、cgroup 配額 4 cores／16 GiB。雲端 host 工作負載、實體電源與真機不可觀測／控制；記錄於 `environment.json`。效能採樣期間不並行 Build、其他 Browser、axe 或證據壓縮；輕量原碼／文件讀取與記錄另外進行。

Node.js 24.22.1、npm 11.9.0、Next.js 16.4.6、React 19.3.1、TypeScript 5.9.3、Tailwind CSS 4.3.3。外部工具固定 Playwright 1.65.1、Chromium 156.0.8078.79、Lighthouse 13.6.0、axe-core 4.14.1；工具及其 lockfile 在暫存位置，網站 package／lockfile 沒有修改。

| 條件 | Mobile | Desktop |
| --- | --- | --- |
| Viewport／DPR | 375 × 812／1，touch mobile emulation | 1440 × 1000／1，desktop emulation |
| CPU | DevTools slowdown 4× | 1× |
| Network | request minimum latency 150 ms、200000 B/s down、93750 B/s up | 明確無網路節流 |
| Lighthouse | DevTools throttling；1562.5／732.421875 KiB-based Kbps 對應上述 byte rate | 同工具、desktop、無網路節流 |

CDP 實際 applied rule IDs 與 Network ExtraInfo 一致。Lighthouse 實際設定、UA、版本、完整 flags 都隨每次 JSON／receipt 保存；兩種方法各自前後比較，不混成同一組。每組皆三個有效 runs，不挑最好值、不排除不利樣本。

一般 Next.js production 使用 loopback 3080；Pages 使用 3081 與 `/xk-website/`。after 先完成一般模式，再停止服務與建置 Pages；baseline 的 idle server 清理例外另記於下方失敗／限制。Pages 靜態伺服器同一原碼、預先 gzip level 6、hashed 資源 `max-age=600`、HTML `no-cache`／ETag，woff2 不再 gzip；這是固定本機模型，不是 CDN Header 修改或公開網路模擬。

基準 `0c51f6fcc2cc912e625bd16e0e638dbeeb073629daba82b71dd42786a4e7a8a9`；after freeze `cc60b45174efe19f57f9b812c9eac2e97c26205773777f54454047a087be9df4`。兩者皆以 107 個 runtime／素材／scripts／manifest／lockfile／Next／TS／workflow 檔案逐檔 SHA map 的排序 JSON 計算。此 after 是 font-only Commit `180e4f8` 的受測 map；CI 後的建置來源修正有不同原碼指紋與 runtime 等價 bridge，見末節，不冒稱已重跑效能量測。

## 清單、瓶頸與最小修正

實際公開路由共九個：`/`、`/about`、`/services`、`/solutions`、`/portfolio`、三個 Portfolio registry 詳頁、`/contact`。Privacy draft、dev、Sitemap 與未知 slug 不作公開效能頁。Solutions 為最大內容風險頁：baseline HTML 225054 bytes、3500 個可見 CJK 字元；因此與 Home 補代表測量、暖快取及真實互動。

修改前完整 baseline 已完成一般 12 個 CDP、Pages 54 個冷載入＋12 個暖快取／互動案例，以及 Pages Home mobile／desktop 各三次 Lighthouse。額外單次 normal Home Lighthouse 只作初始診斷，不拿來計算比較改善率。所有原始結果與真實退出均保留。

首屏 LCP 是實際 H1，例如 `h1#home-title`、`h1#solutions-page-title`。Network／Resource Timing 證明 Noto stylesheet 為 VeryHigh／`renderBlockingStatus: blocking`，不是單憑檔案大小推測瓶頸。normal 首輪診斷中 CSS 到約 2235 ms 才完成，LCP 2675.974 ms；完整系列另外列出。

原 Noto 宣告包含 108 個 Unicode 子集 × 四個 400／500／600／700 字重；每組引用相同 WOFF2 URL 與 SHA。重複的是 CSS，不能說字體下載量增加四倍。三個代表字檔實際解碼有 wght 100..900，安裝版 Next metadata／validator 亦確認支援 `variable`。

Root 工程 review 與定向獨立字體 review 後，僅將 `src/app/layout.tsx` 改為 `weight: "variable"`，加一行維護註解。保留 Inter／Noto、四個既有實際文字字重、fallback、swap、Noto preload false；沒有增加 CJK preload、dynamic wrapper、圖片、Dependencies、RUM 或追蹤。沒有新硬性 JS／font／圖片 budget 或 Lighthouse 90 分門檻；既有 LCP ≤ 2.5 秒、CLS ≤ 0.1 目標不變。

| 字體／保護檢查 | Before | After | 實際證據 |
| --- | --- | --- | --- |
| Noto decoded CSS | 411784 bytes | 103613 bytes | `font-after-audit.json`，實際建置 CSS／Network |
| Noto font-face（含 fallback） | 433 | 109 | 108 組 variable download faces＋原 fallback |
| 108 個 Unicode 子集／字檔 SHA | baseline | 全部相同 | 逐子集 hash 比對，非僅三個軸樣本 |
| 所有輸出 font binary | 115 | 同一 SHA 集合 | 沒有刪改或換字體 |
| Inter／global compiled CSS | baseline | byte-identical | 定向 after audit |
| 其他 runtime／素材／設定 | 106 檔 | byte-identical | 完整 source map；Logo／Tokens／內容／導航／Privacy／SEO／workflow 保留 |

靜態內容繼續由 Server Components 提供；Mobile Navigation 保留必要 Client 互動。沒有可證明收益支持改 Radix／Link 預取或 Client 邊界，因此保持 API 與 code splitting。SVG 仍使用原稿路徑與尺寸，沒有新 raster／圖片 LCP；字體皆自託管，runtime 第三方請求另由 Browser inventory 驗收。

## 一般 production 比較

下表是同條件 CDP 三次的 LCP 中位數；完整範圍與全部 runs 見機器可讀證據。沒有將 Lighthouse TBT 填成 CDP TBT；CDP 的未測 TBT／field INP 為 null，實際 Long Tasks 與 Event Timing 另列。

| Profile／頁面 | Before ms | After ms | 判讀 |
| --- | --- | --- | --- |
| Mobile Home | 2684 | 1720 | −35.9%，after 達既有 lab target |
| Mobile Solutions | 3024 | 2000 | −33.9%，after 達既有 lab target |
| Desktop Home | 260 | 228 | 低數值波動，保守解讀 |
| Desktop Solutions | 264 | 260 | 低數值波動，保守解讀 |

上述樣本 CLS 均為 0。Home mobile／desktop 最後一輪 before／after viewport PNG 逐 byte 相同；它只支持這兩個受控畫面，不能當成全站／所有裝置的視覺保證。

## Pages 同條件比較

以下單位為 ms，格式為「三次中位數 [最小–最大]」。所有原始 runs 保留，沒有排除樣本。九頁 after mobile 冷載入的 27 次實際值全部 ≤ 1884 ms，CLS 均為 0；before 的九個 mobile 中位數全部超過 2500 ms，原目標 FAIL 沒有抹除。Desktop 低值存在正常上下波動，不宣稱每頁都加速。

| 路由 | Mobile before | Mobile after | Desktop before | Desktop after |
| --- | --- | --- | --- | --- |
| `/` | 2632 [2616–2748] | 1672 [1632–1884] | 236 [220–244] | 212 [208–236] |
| `about` | 2588 [2572–2676] | 1644 [1604–1644] | 212 [208–260] | 196 [192–196] |
| `services` | 2624 [2612–2692] | 1636 [1620–1732] | 236 [212–268] | 256 [216–280] |
| `solutions` | 2796 [2740–2976] | 1796 [1772–1824] | 308 [228–312] | 256 [244–260] |
| `portfolio` | 2600 [2544–2612] | 1612 [1584–1652] | 208 [196–268] | 232 [216–252] |
| `portfolio/corporate-website` | 2564 [2532–2616] | 1560 [1536–1628] | 188 [184–212] | 200 [168–220] |
| `portfolio/enterprise-management` | 2552 [2536–2576] | 1620 [1576–1640] | 204 [200–228] | 188 [180–212] |
| `portfolio/integration-hub` | 2532 [2528–2612] | 1568 [1568–1584] | 240 [236–268] | 196 [196–200] |
| `contact` | 2544 [2532–2564] | 1564 [1556–1576] | 228 [184–248] | 188 [184–228] |

暖快取使用同 context prime 後的重新瀏覽，實際命中記錄支援快取判斷。它與 Lighthouse storage reset 的冷載入分開，不能混算。

| Profile／路由 | Warm before ms | Warm after ms | After cache hits（三次，整個案例） |
| --- | --- | --- | --- |
| mobile `/` | 576 [520–624] | 484 [432–556] | [21, 21, 21] |
| mobile `solutions` | 792 [772–820] | 704 [664–1272] | [26, 26, 26] |
| desktop `/` | 180 [172–200] | 160 [148–188] | [21, 21, 21] |
| desktop `solutions` | 212 [196–220] | 248 [196–268] | [26, 26, 26] |

暖案例的 network phase 在機器可讀結果中另拆 load／interaction；上表 raw cache hit map 數涵蓋案例，不拿它當原頁 initial payload。Priming 保留原始事件。冷案例未執行的 interaction 為 null，沒有填成實測 0。

## Lighthouse、互動、Bundle 與限制

Pages Home 同一 profile 三次 cold Lighthouse（13.6.0／DevTools throttling），保留全部 JSON／HTML／trace／devtoolslog。格式同樣是中位數 [最小–最大]；Score 只是實測值，不是新增的 90 分 Gate。

| Profile／指標 | Before | After |
| --- | --- | --- |
| mobile LCP ms | 2616.339 [2567.782–2727.975] | 1636.630 [1609.677–1755.877] |
| mobile CLS | 0.000 [0.000–0.000] | 0.000 [0.000–0.000] |
| mobile TBT ms | 447.548 [345.990–495.740] | 439.827 [312.780–577.031] |
| mobile Performance Score | 0.810 [0.810–0.850] | 0.880 [0.840–0.920] |
| desktop LCP ms | 212.375 [200.575–213.450] | 205.935 [199.583–241.857] |
| desktop CLS | 0.000 [0.000–0.000] | 0.000 [0.000–0.000] |
| desktop TBT ms | 0.000 [0.000–0.000] | 0.000 [0.000–0.000] |
| desktop Performance Score | 1.000 [1.000–1.000] | 1.000 [1.000–1.000] |

Mobile LCP 明顯下降，但 TBT 範圍仍大，after 最大值甚至高於 before；沒有穩定證據支持宣稱 CPU／長任務或 INP 已解決。Desktop Score 原已滿分，微小 LCP 上落不代表全面改善。

實際互動包含頁內 CTA／錨點、手機選單開啟、Escape、選取 About、Header／Footer 跨頁；沒有建立假表單、登入或 API。Event Timing 門檻 16 ms，少於門檻而沒有 entry 時填 null 並記原因，不能說延遲為 0。原始 observer buffer 從 load 累積；衍生資料另以第一個 action.startedAt 過濾時間，不把所有累積 Long Tasks 誤稱為互動成本，也不作因果或 field INP 推論。

LCP／CLS 的 after lab target 已按原門檻評估；INP ≤ 200 ms 仍是需要足夠 field p75 樣本的工程目標。沒有既有 RUM／CrUX／GSC dataset、28 日時間窗或真機，field CWV 與真機項目維持 Optional PENDING。未開放索引、加入 Analytics 或蒐集資料來取得數字。

以 Pages Home mobile cold r1 為可追溯例：Noto CSS observed encoded bytes（含回報 Header）149295 → 37612，gzip body 148951 → 37269，decoded 411784 → 103613。Font 仍為 11 requests／742267 observed encoded bytes，JS 7 requests／156009 bytes；原 JS chunks 與功能保留，沒有把 CSS 節省冒稱 JS 或四倍字體節省。所有路由 initial／async 實際載入請求、priority／initiator／redirect、未完成傳輸、Coverage ranges／CSS rule 使用均封存。Coverage 不直接換算壓縮 unused bytes，未測值維持 null；不因零個未使用 rule 回報就斷言零 unused CSS。

暖快取與 public Header 分開：本機命中有 Network 證據；公開站實際 gzip／max-age=600 僅觀察，不修改 CDN／DNS。public before Header 與 normal／Pages 本機的壓縮大小不同，不跨主機或 build mode 計算改善率。

## 品質命令

完成最小修改、盤點 staged／unstaged／untracked 及格式後，重新執行下列五個命令；全部實際 Exit 0，沒有任意修改 package／lockfile。完整 args、UTC 時間、OS wait、Log SHA 與環境在 receipts。

| Test ID | Command／預期 | 實際結果 | Exit | Evidence member |
| --- | --- | --- | --- | --- |
| PERF-C01 | `npm ci`；成功且保留規則 | 616 locked packages 安裝完成 | 0 | `checks/npm-ci-after.json`／`.log` |
| PERF-C02 | `npx tsc --noEmit`；成功且保留規則 | Strict TS 零診斷 | 0 | `checks/tsc-after.json`／`.log` |
| PERF-C03 | `npm run lint`；成功且保留規則 | 既有零 warning 規則通過 | 0 | `checks/lint-after.json`／`.log` |
| PERF-C04 | `npm run build`；成功且保留規則 | 普通 production 成功；代表頁已測 | 0 | `checks/build-after.json`／`.log` |
| PERF-C05 | `npm run build:pages`；成功且保留規則 | 九公開頁 artifact verified，原保護全部保留 | 0 | `checks/pages-build-after.json`／`.log` |

既有 ESLint 9 deprecated、npm 更新提示保留；它們不是本次 lint warning，也沒有為消除提示升降級套件。普通／Pages 服務結束的 143 是預期清理，不當作品質命令 Exit 0。

代表頁 Home／Solutions 共 48 個 cold 觀察，初始七個 Script 皆有 HTML/parser 證據；Pages 七個 chunk bytes 前後一致，normal JS encoded 156386／decoded 502039，Pages 156009／502693。HTML 另有未被 Chromium 載入的 nomodule fallback，不把它算成實際 initial payload。以下是 Pages Home 的實際 chunk bytes（before／after 相同，encoded 含回報 Header）：

| Chunk | Encoded bytes | Decoded bytes |
| --- | --- | --- |
| `0jk4htvmmu57l.js` | 17362 | 42472 |
| `1wnov70f88xjy.js` | 7985 | 29127 |
| `2olhm2sgwzw-8.js` | 4970 | 16377 |
| `30sekecjjqkej.js` | 47006 | 170080 |
| `310vm2bl3xxpt.js` | 2307 | 5364 |
| `39_j1bdzreq0m.js` | 72112 | 229288 |
| `turbopack-1mfkoo_4jufv0.js` | 4267 | 9985 |

24 個 warm 操作窗口在原始 Network 中新增 Script＝0、Document＝0，支持本次同文件 SPA clock 的時間過濾；這只涵蓋實際操作與觀察窗口，沒有宣稱所有未來行為永不載入額外 chunk。Client manifest 只含一個 app 來源 MobileNavigation 及必要 Next 內部模組，沒有整頁改 Client。

受控互動的 after-first-action 觀察如下；數值是三次樣本，null 表示沒有達 16 ms 門檻的 Event Timing entry，並非零延遲或 field INP。

| Profile／頁面 | After max Event Timing ms | After temporal Long Task count |
| --- | --- | --- |
| mobile `/` | [80, 88, 88] | [2, 2, 2] |
| mobile `solutions/` | [80, 96, 80] | [2, 3, 3] |
| desktop `/` | [32, 40, 32] | [0, 0, 0] |
| desktop `solutions/` | [40, 40, 48] | [0, 0, 0] |

## 功能、無障礙與發布保護回歸

| 模式 | 實際時間 UTC | 結果／Exit | 覆蓋與證據 |
| --- | --- | --- | --- |
| Ordinary production | 07:59:49–08:00:13 | 18／18 PASS；0 | 九頁 HTTP／final head、所有有效 Link／錨點、跨頁、robots／Sitemap／草案／dev／未知 slug 保護；`general-process.json` |
| Pages static | 08:11:51–08:14:13 | 33 PASS＋1 N/A；0 | 45 responsive／48 axe 零違規、keyboard／Focus／skip／Escape／touch／Reduced Motion、選單、Metadata／資源／Base Path／export；`pages-process.json` |

Disabled 的 N/A 是正式公開 DOM 沒有對應 disabled 控制項，不是假裝執行或因外部阻礙跳過。普通 10 contexts／10 次實際 after、Pages 25／25；每個 document 的 reload before 亦有記錄。沒有 Cookie／Web Storage 寫入、POST 或第三方 runtime 請求；這不證明 hosting/CDN 沒有 access logs。

普通 28 個資源、Pages 159 個資源實際成功。Pages 功能 QA 的 387 個 HEAD 原始事件只按既有嚴格同 document／initiator／成功 HTTP 與 tree 證據分類，unexpected 0；GET／asset／Console／Runtime 沒有忽略清單。效能原始 trace 的 HEAD 事件另原樣保存，不拿功能 QA 的計數去覆寫另一套樣本。

所有頁面維持 exact Title／Description／Canonical／OG／Twitter／WebSite、zh-TW、noindex／nofollow。Privacy draft 與 dev 公開 404、Pages HTML／payload 排除，Sitemap 404；robots 沒有 Sitemap 宣告，三個 Portfolio slug、PLANNED、Contact 空管道與所有真實 CTA 保留。沒有部署旗標解鎖草案、索引或資料收件。

Test ID 對應：PERF-M01–M07 為上述效能、Bundle／Fonts／Cache；PERF-F01／F02、R01、A01、G01–G03 為本節回歸。每項的適用性、預期／實際、完整 procedure／commands、環境、實際 parent process exit 與證據在 [verification.json](task011-artifacts/verification.json)。本次 25 項共 21 PASS（19 Required＋2 Optional）、2 Optional PENDING、2 有據 N/A；所有必要本機驗收通過，沒有宣稱 field CWV 通過。

## 實際截圖與人工檢視

- [手機 375 × 812](../screenshots/task011-performance-mobile.png)。
- [桌面 1440 × 1000](../screenshots/task011-performance-desktop.png)。

兩 PNG 由本次 Chromium 在 fonts.ready 後實際擷取，再 exact-byte copy；Root 已實際以 view_image 檢視這兩張及 320／768／1920 三張補圖，CJK／Latin、暫定 Logo、換行、CTA 堆疊與 Header 正常，所見視口無橫向裁切或遮擋。補圖與 SHA／尺寸封存於 `screenshot-manifest.json`、`visual-review.json`。

四對 performance Home baseline／after 視口 PNG（normal／Pages × mobile／desktop）皆逐 byte 相同；不擴大為全站像素保證。規格 §12 的 trace／font 圖檔名是建議；本次提交兩張真實網站圖，原始 trace／font waterfall／Network 以可還原 artifact 交付，沒有假造 DevTools UI 截圖或把網站畫面當成 LCP 證明。

## 失敗、修正與 Known Issues

- 修改前 mobile LCP target 的 FAIL 原值與 verdict 全保留；修正後另三次系列 PASS，沒有覆寫舊結果、降低目標或挑最快 run。
- 公開 Header 工具第一輪將 case-sensitive dictionary 誤當固定 Header 大小寫，未解 gzip 而發生 UnicodeDecodeError，runner 真 Exit 1；統一 lowercase Header 後定向重驗真 Exit 0。`checks/public-baseline-headers*.json`／log 保留；沒有改網站或重跑無關 suite。
- Bundle checker 初版誤要求 HTML 所有 Script 都會載入，漏掉現代 Chromium 不載 nomodule fallback，真 Exit 1；改以「所有實際 Script 都有 HTML 對應，未載引用明列且僅 nomodule」後離線重驗真 Exit 0。原 helper／FAIL／log 保留，沒有改 raw、app 或另跑瀏覽器。
- baseline 停服務時 fuser 未取得 PID、Exit 1；Pages build 開始時舊 normal server 仍 idle。所有 normal baseline 已先完成，build 期間沒有再請求／採樣 normal；隨即以已知 PID TERM、實際 143／埠關閉。此排程例外照實保留，沒有將 overwritten build 資料拿來補樣本。after 確實先停 normal 再 build Pages。
- after 的 ad-hoc 關埠探測先因預設 network-disabled sandbox 無法建立 socket；當次顯示未保存 OS exit，不捏造 0，記 FAIL／exit null。以既有 network 權限重試實際 Exit 0、3080 已關閉；必要品質與 Browser／效能程序均有獨立真實回執。服務正常 TERM 的 143 與 runner 合成 0／7／124 契約自查不當作網站成功測試。

尚存限制：mobile TBT／初始 CPU 長任務仍有波動，沒有穩定改善結論；沒有新硬門檻或不受支持的功能刪減。field INP／CWV p75、真機與主要受眾 profile 待 Owner 提供既有資料／裝置後再評估；不因此蒐集新資料。雲端硬體／電源、更多網路、CDN Cache 政策與外部環境亦不由本次控制。這些已區分 Optional／後續事項，沒有未解的阻礙交付 Required FAIL／BLOCKED。

## 交付檔案與證據

修改 `src/app/layout.tsx`、README、AGENTS、`docs/task/README.md`、`docs/implementation-notes.md`；新增本報告、[量測指南](../performance-measurement.md)、[artifact 操作說明](task011-artifacts/README.md)、[完整比較資料](task011-artifacts/measurements.json)、[逐項驗證](task011-artifacts/verification.json)、[SHA manifest](task011-artifacts/manifest.json)、[壓縮證據](task011-artifacts/evidence.json.xz) 與兩張 PNG。完整 Git Diff 檢查包含 staged／unstaged／untracked；沒有 `.next/`、`out/`、依賴目錄、暫存工具或機密提交。

證據包含全 156 個 CDP runs、12 份可比較 Lighthouse 加單次 normal 診斷、失敗／重驗、工具／profile、trace、Network、Coverage 與 storage。壓縮前可去重相同內容，不能刪除不利結果；gzip 容器無損展開，原壓縮 SHA 與 payload SHA 均保留，還原驗證見 manifest。不把 raw 的 COMPLETE 狀態當成 target PASS。

## 初次 PR 前的 Git／CI／部署階段

| 階段 | 初次 PR 建立前快照 |
| --- | --- |
| 本機開發與驗收 | PASS，final frozen runtime map 對應上述全部實際結果 |
| Feature Commit／Push | PENDING，提交後的實際 SHA／Diff 對照放同 PR 說明 |
| PR CI | PENDING，必須是最終 head 的 run／job／artifact；Deploy skipped 不是發布 |
| PR Review | PENDING；本機定向 source／統計 review 不冒稱 GitHub approved |
| 使用者授權合併 | PASS，當次指示明確要求 CI 通過後直接合併 |
| main CI | PENDING，合併後另查 merge SHA 的 push run |
| 部署／公開網址 | PENDING，另查 deployment SHA／success 與公開 HTML／資源／Base Path／新版 CSS |

這些遠端事件只在實際發生後更新同一 PR 說明，不為補自身 SHA 另做 docs-only Commit。正式網站索引、法律政策、Vercel／Domain 及 field CWV 依各自條件，不能從 PR CI 或本次技術合併推定。

最終證據使用標準函式庫 XZ 無損壓縮，大小 18755608 bytes，SHA-256 `fbf1b4415bab2dcf96ccf66de35c3d7d0bd4a4d067c9dc59ae4490c9adbd500c`；共 1944 個 member／1444 個唯一 payload，展開 459308269 bytes，逐檔還原 SHA 驗證 1944／1944。初次 gzip 封存亦保留完成回執；更換外層壓縮沒有刪減原始 runs 或改變 payload。

## CI 後修正：驗收文件的 Tailwind 掃描邊界

PR #16 的首個 head `180e4f8`、CI `44488123241` 兩個 build job 成功，但實際下載 artifact 並核對 API digest 後，發現 global CSS 39469 bytes，比受測的 38228 多 1241。差異精確為驗證 JSON／報告中的 `filter`、`lowercase` utility 及其 properties；Noto／Inter CSS 與字體修正本身正常。第一輪 artifact byte checker 真 Exit 1 保留，沒有因 CI 綠燈就合併。

修正只在 `src/app/globals.css` 增加兩條 `@source not`，排除本 Task 的 `docs/reports/task011-artifacts` 與 `docs/reports/task011-implementation.md`。Tokens／樣式定義／互動 API 不改，其他掃描來源保留；未新增套件或修改部署流程。驗收資料應保留為證據，不能意外增加網站 utilities。

最終原碼指紋為 `3d00df42565635715b36078fb9a244bdac5fb001388dc26b0d40cef3989061eb`，107 檔中只有 Layout 與 CSS source directives 相對基準變更，其餘 105 檔相同。原 `cc60…` font-only 量測、指紋與 459 MB 原始 payload 全部保留，不改舊測試版本。

定向獨立 [artifact bridge](task011-artifacts/source-artifact-bridge.json) 核對 204 個 logical files：142 檔 raw byte-identical，含三個 CSS、JS、115 個字檔、icon／SVG／原稿；另 12 HTML 與 50 RSC 只差嚴格驗證的 Build ID。ID 由 root RSC 0-record 的 b 欄位取得，與唯一 manifest 目錄互證，只替換該完整 JSON token／目錄 component，不任意刪除差異。三個 CSS 回到原受測的 filename／SHA，沒有新的瀏覽器 runtime 行為。

影響判斷：保留原 font-only 的同條件 before／after 數據，透過實際編譯產物等價性連到最終原碼；不把它改稱新來源的重新量測。重跑最終來源的五個品質命令、普通 18 項及 Pages 23 項針對性驗收，並驗證最終 CI artifact。原 45 responsive／48 axe／五寬人工圖與效能樣本對應已確認相同的 runtime，不因 source fingerprint 不同重跑無改變的畫面與採樣；不降低原門檻。

新增補驗、命令／退出碼、版本與 bridge 入口為 [source-fix-verification.json](task011-artifacts/source-fix-verification.json)，原始資料為 [source-fix-evidence.json.xz](task011-artifacts/source-fix-evidence.json.xz)。此增補屬實際程式修正，使用同一 PR 的新 Commit／新 head CI；先前 head 成功不代替修正版 CI。後續 merge／main CI／部署／公開新版證據仍更新同一 PR 說明。

最終來源的 npm ci／TypeScript／ESLint／normal Build／Pages Build 全部真 Exit 0；普通 18／18（10 contexts／10 after）與 Pages 23／23（14／14）補驗真 Exit 0。Pages 152 資源成功、183 個 HEAD 嚴格分類、unexpected 0。補驗工具的 module import、CLI artifact signed-host 與初次 artifact 差異的原 FAIL／修正記錄均在補充證據；臨時下載 URL 有明確 redaction，不公開 capability。補充封存 383940 bytes，96 members 全還原校驗，SHA-256 `43c3f52f9538deef5be7f699bea7cb7a88c13e19e3b456a656cb1ed8bedbab6a`。
