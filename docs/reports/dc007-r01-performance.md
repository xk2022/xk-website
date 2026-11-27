# DC-007-R01｜效能優化與回歸報告

日期：2026-11-27 UTC。依[本輪規格](../task/dc007-r01.md)，沿用 `test/design-collection-release` 與 [Draft PR #45](https://github.com/xk2022/xk-website/pull/45)。本輪不合併、部署或修改 DNS；DC-007 完整發布驗收仍未完成。最終來源的正式 after 完成，三首頁達標、三試算頁 TBT 未達標，**R01 效能驗收 FAIL**；六組 warm 已完成診斷，不以 warm、pilot 或先前版本結果代替 cold 門檻。

## 1. 來源與受測版本

起點 head 為 `3b2eb5093f23ba6cc49e3be1da7af5138c5edfa4`，base 為已合併 PR #44 的 `ee4b4709a9f8daa755e2595a46c158b3c92d8229`。起點 PR run `45871766244`（#104）Quality／Pages 成功、Deploy 跳過；artifact `15142713761` ZIP SHA256 為 `8eeb6f760fbcfb57ad4dde30d244637c51fc28a1262f6f812f52c3025921e280`。這些是 R01 前的真實事件，不是最終候選的新 CI 或部署通過。

公司來源於 2026-11-27T00:55:52Z 唯讀核對：main `f1be01c0c5d8bc5b1238f250838e336bef47b149`、tree `84f9388877b9f73dc81276200d0164625d228c90`，與 DC-007 固定來源零 commit／零 file 差異。來源 owner fresh 核讀 14 份相關文件，記錄在 `company-source-review.json/md`；根 AGENTS blob `a7ca443ddd1d1b847dc58152bbb56c1425c1b522`。字體規範 blob `7ade30e8703d18a79953804a6bbf3908e25f78f7` 保留 Inter／Noto Sans TC／device fallback；Logo 規範 blob `ff44b6107b388202f06bda344c5be68002bbc225` 允許既有 Logo03 過渡使用。沒有新品牌、業務、法律、索引或部署核准；swap 是網站既有載入契約，不冒充公司新增要求。

| 版本 | 固定來源與用途 |
| --- | --- |
| Fresh before | fingerprint `661f6cd2ac68add9e0887849819b8568f647b867ee72b8fa85ecf27beb39f16c`；重新量測原版本，與歷史 DC-007 樣本分開 |
| 第一輪正式 after／Normal 全矩陣 | `source-after.json`，337 檔，fingerprint `be6c1315bc27306a247d206e510f0733fd075c6f148324c0f83eb13ebafa9e57`；原始失敗保留 |
| 最終 retained v2 | `source-after-v2.json`，337 檔，fingerprint `9d18fdf7aaac71987afaae10aeb969784b0929bdd5d4f8bfd366fc1599f84936`；manifest raw SHA256 `10ec82dc553ee1f0dcc508dc7830613c3496bbf4d469730085620dabc2ac67bc` |

最終 v2 相對第一輪來源僅三檔變動：`globals.css` 增加 screen A4 預覽的離屏 selector；`quotation-estimator.tsx` 與 `quotation-summary.tsx` 調整摘要 memo 邊界及由摘要呼叫原共用 calculator。其餘 334 檔相同。`a11y/source-v2-nonquotation-bridge.json`、各受影響 fresh 重驗及 PDF bridge 限定沿用範圍；不宣稱兩個版本整站畫面或所有結果逐 byte 相同。

本報告證據路徑均以 `/tmp/xk-dc007-r01/` 為根，已由 [r01/manifest.json](dc007-artifacts/r01/manifest.json) 映射原 SHA 至封存／引用路徑。封存完整性 PASS，`archive-r01-process-v2.json` 真 Exit 0；3383 records，原資料 1,367,775,151B、stored payload 274,414,202B，連 manifest 共 276,493,547B（約 276.5MB），是明顯的 repository 增量，不能稱輕量。2135 份 payload、365 archive references、883 repo references，1491 份 gzip 驗證通過、490 native tiles 全保留、secret guard 0、inventoryStable=true；manifest SHA256 `d07cf26dcec7b7294fbd4ac6a72433927eff7f937a48d637d4fad695b4c82a58`。首次 gzip／already.gz 編碼檔名碰撞真 Exit 1 及原 script 保留於 `archive-attempts/initial.*`；僅以 raw SHA suffix 消除碰撞後重跑。完整性 PASS 不推導 QA／效能或 release PASS，exact-head CI 仍待後續實際事件。

## 2. 固定條件與 fresh before

Pages loopback 3281，`serve-pages.py` 文字 gzip 6／hashed assets max-age 600／HTML no-cache＋ETag。Lighthouse 13.6.0、Chromium 156.0.8078.79、Node 24.22.1、Python 3.12.14；mobile 375×812、DPR 1、CPU 4×、DevTools 實際 latency 150ms／download 200000／upload 93750 B/s。每次 cold 使用新 Chrome process/profile 並清 storage；Browser／PDF／axe／build 不與效能取樣重疊。雲端 host 背景負載與實體頻率無法完全固定，保留所有樣本及範圍。

門檻以六組各三次的中位數判定：LCP≤2500ms、CLS≤0.1、TBT≤200ms，同時記錄每次超標。Fresh before 於 00:56:46–01:03:42Z 完成 18／18，LH 子程序全部 Exit 0，外層依門檻真 Exit 1。六組 LCP／CLS 達標，18 次 TBT 全部超標。以下為 median［min–max］，時間單位 ms。

| 頁面 | LCP | CLS | TBT | 結果 |
| --- | ---: | ---: | ---: | --- |
| Modern Home | 1762.650［1644.633–1764.392］ | 0 | 1306.136［991.173–1392.539］ | FAIL：TBT |
| Modern Quotation | 1614.841［1565.926–1616.265］ | 0 | 1125.176［809.845–1135.686］ | FAIL：TBT |
| Heritage Home | 1667.109［1577.556–1672.843］ | 0 | 1249.817［1008.403–1270.489］ | FAIL：TBT |
| Heritage Quotation | 1691.499［1644.150–1745.693］ | 0 | 912.835［847.766–1069.803］ | FAIL：TBT |
| Luxury Home | 1614.508［1575.841–1622.754］ | 0 | 1023.287［873.795–1213.802］ | FAIL：TBT |
| Luxury Quotation | 1663.725［1638.029–1866.440］ | 0 | 871.978［778.041–1403.431］ | FAIL：TBT |

證據：`before/summary.json`、`before-process.json` 及每次 report／trace／receipt。不是將原 DC-007 的 18 次併入本輪統計。

## 3. 診斷與採用變更

原 Modern Home 真實載入 16 份 font（Inter 1、Noto 15），font transfer 1,091,912B／總 transfer 1,380,352B，約 79%；不是把所有產物字型的磁碟容量當下載量。原 trace 12–13 次 >50ms Layout 緊隨 RemoteFontLoaded≤20ms，dirty objects 約 1147，支持多個中文字型 subset 分時完成引發重排的假設。沒有證明某個 subset 或函式是唯一根因。

共享 ReactDOM-containing chunk 也有 FCP 後 blocking：原三筆精確 clip 的 JS task 為 229.206／155.716／143.673ms；native pilot4 仍為 163.827／157.325／153.956ms。未取得 source-mapped 函式歸因，不能據此宣稱某個自製 hook 是原因。TBT 使用 Lighthouse 實際算法：RunTask 裁切至 [FCP,TTI] 後減 50ms；復算與 audit 相符，不用全頁 Script Evaluation、Layout 總和或長任務總和冒充 TBT。

Layout root 指向 `#document`，不是每個 section 的 CPU 分攤。Services 157 elements、Footer 140 elements／55 anchors 僅為靜態複雜度盤點。沒有發現可移除的持續 App rAF 或第三方追蹤；switcher 的 rAF 為一次事件通知。舊 18 份 network 的 732 requests 同源，只支持該範圍，不能擴張為所有操作的完整網路證明。

最終僅保留：

- 原生 `next/font/local` full-axis Noto Core＋108 份原 legacy；唯一 Core preload，保留 Inter、swap、Arial fallback、完整普通 coverage 與已驗字形／UVS。
- screen-only `content-visibility:auto` 用於合適的離屏 Home sections、Quotation 操作／螢幕 A4 預覽與 Footer；保留 DOM、Hero／Header／style switching，print media eager。Intrinsic size 是暫存估計，不是固定內容高度。
- Quotation Summary memo，仍由原共用 calculator 計算。原 store／初始化／即時選擇與價格、NextLink、靜態輸出及 build／部署流程保留。

Font API Controller、額外 Header／Hero／Switcher containment、Footer 委派導航、Suspense、Node FS runtime loader、priority hints／HTML rewrite／postbuild、store-controller／deferred enablement 均已回退。不能從歷史 snapshot 恢復已刪除的正式維護契約。

## 4. 所有候選與失敗保留

Pilot 版本號與 `candidate-pages-vN` 建置編號不是一對一。以下 TBT 為 median［min–max］；每組三次，pair 為兩組共六次，完整 LCP／CLS、原值、超標次數與來源在各 `pilot-vN/summary.json`／`pilot-vN-process.json`。有效 pilot 的 LCP 中位數均低於 2500ms、CLS 均為 0。單頁或 pair 不能代替正式六組 after。

| Pilot | 候選／實際頁面 | TBT ms | 外層 Exit／結果及處置 |
| --- | --- | ---: | --- |
| v1 | FontFaceSet.load 批次；Modern Home | 729.956［719.277–1034.895］ | 1／FAIL；3 次超標，移除 Controller |
| v2 | Detached alias faces；Modern Home | 1507.061［1399.386–1578.914］ | 1／FAIL；3 次超標，移除 |
| v3 | Native Core＋legacy；Modern Home | 436.395［345.740–558.090］ | 1／FAIL；3 次超標，Core 改補 UVS 後續驗證 |
| v4 | 唯一 Core preload；Modern Home | 377.809［332.359–439.672］ | 1／FAIL；3 次超標，保留研究 |
| v5 | 舊 server 未停止，版本不符 | 不計中位數 | returnCode −15／Exit 143；中止，不合資格 |
| v6 | build7 正確 server；Modern Home | 152.877［135.866–206.603］ | 0／單頁 PASS；1 次超標保留 |
| v7 | Paper CV＋Summary memo＋額外 containment；Luxury Home／Modern Quotation | 221.405［196.620–391.661］／246.572［213.971–273.197］ | 1／FAIL；分別 2／3 次超標 |
| v8 | Footer 委派邊界＋Summary memo；Luxury Home／Modern Quotation | 209.223［194.784–304.547］／235.208［215.747–322.253］ | 1／FAIL；2／3 次超標；Footer prototype 全撤 |
| v9–v11 | Suspense／靜態內容候選 | 無合資格效能樣本 | 不杜撰效能；見下方建置與 No-JS 拒絕證據 |
| v12 | runtime hint-only；Luxury Home／Modern Quotation | 235.906［133.069–252.130］／200.813［199.876–294.888］ | 1／FAIL；2／2 次超標，實際 priority 仍 Low |
| v13 | 既有 async scripts High＋hint 前移；Luxury Home／Modern Quotation | 240.979［240.691–311.927］／211.790［168.530–290.059］ | 1／FAIL；3／2 次超標；全部 priority 策略撤回 |
| v14 | 小 controller＋memo view／初始 enablement deferred；Modern Quotation | 251.456［191.959–280.695］ | 1／FAIL；2 次超標，全部 controller 變更撤回 |

v1 多載一份 Noto Latin 25,257B，font 總量 1,117,169B，最後完成約 7.9–8.1 秒，沒有「只剩一次 Layout」。v2 新增大段同步 Script Evaluation，108 次 find／normalize 長 unicodeRange 是候選疑點，沒有唯一函式因果證明。v3 只有 Inter／Core 兩個字型完成，但仍有初始 Layout、共享 JS、Core 到達後 Layout。

v4 的 Core 確實在 213–230ms 發出、High／isLinkPreload=true，282,090 transferB 約 3.35–3.38 秒完成，晚於 FCP 1.67–1.79 秒；不是 preload 失效或重複下載。v12 是後來的 JS hint-order 問題，不能與字型 preload 混為同一問題。v13 真正提高 JS priority 後仍 FAIL，故未保留新 loader／postbuild 或 HTML 處理。

v5 保留 1 筆 MEASURED（LCP 1939.662、CLS 0、TBT 371.182）與 1 筆 PENDING；`pilot-v5-server-mismatch-stop.json` 記錄停止舊 server／pilot／LH PID。單筆僅診斷，不納入 after 或改善率。

v7 額外 containment 無足夠效益而撤回，組合試驗不證明獨立因果；原 manual useMemo estimate 引發 lint FAIL，最終改由 memo Summary 呼叫 calculator。v9–v11 檔案中，`candidate-pages-v11.json`、`v12.json` 真 Exit 1（global Suspense 靜態 Contact H1 guard）；`v13.json` 真 Exit 0 但 Footer／Summary Suspense 導致隱藏靜態 HTML／No-JS 退化而拒絕。snapshot、SSR／No-JS 診斷與 lint FAIL 全保留；建置成功不代表靜態功能通過。

### 第一輪完整 after：仍 FAIL，與最終 v2 分開

`after/summary.json`、`after-process.json` 在 `source-after.json` 完成 18 次，外層 Exit 1。六組 LCP／CLS 中位數達標；TBT 如下。Heritage Home 的一筆 CLS 0.009712874 亦保留，不宣稱所有 CLS 都是零。

| 頁面 | TBT median［min–max］ms | 單筆超標 | 組結果 |
| --- | ---: | ---: | --- |
| Modern Home | 177.620［158.855–236.473］ | 1／3 | PASS |
| Modern Quotation | 333.235［248.395–338.763］ | 3／3 | FAIL |
| Heritage Home | 197.584［162.671–276.276］ | 1／3 | PASS |
| Heritage Quotation | 326.417［271.890–373.104］ | 3／3 | FAIL |
| Luxury Home | 204.144［194.333–213.496］ | 2／3 | FAIL |
| Luxury Quotation | 340.107［239.501–352.084］ | 3／3 | FAIL |

## 5. 字型來源、精確性與維護契約

固定 Google Fonts commit `b950a7257470b900078f2bf3223823a8602de7e1`，母檔 `NotoSansTC[wght].ttf` 11,941,968B，SHA256 `864727d210d54f2537bbe23b3a839436c3992af72de9322af5270897246bd44f`，Version 2.004-H2，wght 100–900。最終 Core 281,768B，SHA256 `8c1e22167a472d67e2e51c5c811b3b2c2815742d054a0994e7f49ef071b99018`。

Core corpus 來自 49 公開 HTML（排除 script/style，包含 aria／placeholder／alt／title）、catalog 及 31 個公共 Contact／Quotation／inquiry 檔案的 2746 個 AST literals／JSX text，再與原 CSS／cmap／固定 master 交集。Core 882 普通 codepoints（774 CJK）與 legacy 剩餘 15,779 點互斥，聯集恰等原 CSS 16,661 點；108 legacy 原 bytes／SHA 全保留。不是把 master 全 coverage 匯入，也不保證未來新增文案自動在 Core。

| 精確契約 | 實際結果／證據 |
| --- | --- |
| Ordinary glyph／advance | 882×400/500/600/700＝3528 組 exact；1259 retained glyph×4＝5036 組 exact |
| Shaping／variants | GSUB／GPOS／GDEF／BASE 對確定 subset 重編結果相同；locl closure 保留；12 必要 FE00／FE01 UVS×4＝48 組 exact，selectors 不冒充普通 coverage |
| 非 Core fallback | 龘 U+9F98 仍使用原 legacy `d2603e585543d43b-s.3jgbw7fjdxemy.woff2`，SHA `16ea48778a406f69c486a7f6285dd4df9b20f1a3eed2fd4a003fbf2b19f0cb14` |
| 原 Arial metrics | ascent 110.73%、descent 27.49%、line-gap 0%、size-adjust 104.76% 保留 |
| 授權 | 完整 OFL／copyright 保留；RFN 為 **Source**，不是 Noto；OFL SHA `1c05c68c34f9708415aada51f17e1b0092d2cea709bf4a94cd38114f9e73d7d9` |
| 重生 | 固定 head.modified 3878588441 後 Core／CSS 逐 byte 相同，reproduction Exit 0；FontTools 4.61.1／Brotli 1.1.0 僅外部工具，無 npm 新依賴 |

早期 v3 UVS 缺項失敗保留，採用的是補齊後 v4。當前 Gstatic v40 的 108 檔 raw SHA 全不符，舊 version 首檔 probe 也不符，真 Exit 1 保留；沒有補造失落的原 URL。Legacy 精確來源為已驗 Next/font/google artifact，master／OFL／glyph proof 分別證實底層來源與精確性。

400–700 縮軸試驗雖由 281,768B 降至 264,116B，仍有 **3524／3528 ordinary failures、48／48 UVS failures、356 advance failures**，不採用。此字型為 glyf／gvar，CFF 策略不適用；未把實驗候選當正式字型。維護入口為 [font README](../../frontend/src/app/fonts/README.md)、compact metadata、固定 codepoints、`scripts/regenerate-font-core.py` 與 10 項 unit；固定清單重生不等於重新掃描未來 corpus。完整 proof 在 `font-assets/verified-facts.json`、`glyph-proof-v4.json`、`uvs-audit.json`、reproduction 與縮軸／table-experiment 原始結果。

## 6. 最終品質、HTTP 與本機產物

所有下列結果綁定最終 v2；每份 process receipt 保存完整 command、時間、log SHA 及實際 OS returnCode／exitCode。沒有未執行先填 PASS。

| Test ID | 實際 command／procedure | 實際結果 | 證據 |
| --- | --- | --- | --- |
| R01-Q-CI | `npm ci --cache /tmp/xk-npm-cache` | PASS／Exit 0 | `quality-v2/npm-ci.json` |
| R01-Q-TYPE | `npx next typegen`；`npx tsc --noEmit` | 兩程序 PASS／Exit 0 | `quality-v2/typegen.json`、`typescript.json` |
| R01-Q-LINT | `npm run lint` | PASS／Exit 0 | `quality-v2/lint.json` |
| R01-LINT-ATTACHMENTS | 封存／附件落盤後 `npm run lint` | PASS／真 Exit 0 | `final-lint.json`／log；delivery receipt appendix 另封存 |
| R01-Q-UNIT | `npm test` | 446 tests／Exit 0；新增字型契約 10 項 | `quality-v2/unit.json`／log |
| R01-Q-NORMAL | `npm run build` | PASS／Exit 0 | `quality-v2/normal-build.json` |
| R01-Q-PAGES | `npm run build:pages` | PASS／Exit 0 | `quality-v2/pages-build.json` |
| R01-HTTP-NORMAL | `python3 scripts/smoke-website.py --base-url http://127.0.0.1:3280/ --output …/http-normal-v2.json` | 3274 PASS＋2 有理由 N/A／Exit 0 | `http-normal-v2.json`、process |
| R01-HTTP-PAGES | 同工具，base `http://127.0.0.1:3281/`，output `http-pages-v2.json` | 3274 PASS／Exit 0 | `http-pages-v2.json`、process |
| R01-ARTIFACT-LOCAL | v2 checker `--prepare` 及 `--directory out --report …/artifact-local-check.json` | 2944／2944 PASS；兩程序 Exit 0 | `remote-final/prepare-process.json`、`local-check-process.json`、`artifact-local-check.json` |

沒有依賴／lockfile 變動；lock SHA256 `1e87be771a0f19262494fbe8cad8eaa4735f67100289f02b38b3a79c6da42187`。兩個 N/A 僅 Normal 私有 Next SSR error-shell 分類，不免除公開路由／資源／保護檢查；本輪 HTTP 未新增 `--check-external` 外站驗收宣稱。

最終本機 Pages 產物：BuildID `4ntCZRLYgNHw2DAf0sFKO`，49 HTML、517 files、164 runtime files（5 CSS／21 JS／116 WOFF2）。僅允許指定 manifest 路徑及 HTML／RSC 的真 Next BuildID 正規化，runtime bytes 不正規化。這是本機 exact source/output 檢查，`githubArtifact:null`，不是 remote CI artifact 已通過。

原 checker 將 `fonts/OFL-Noto-Sans-TC.txt` 誤歸為 RSC，2943／2944、真 Exit 1 原件保留。v2 僅對該確切路徑、4388B、固定 SHA、baseline inventory 與 source OFL 一致的授權檔做單一例外；其他 inventory／byte 比對／RSC guard 不變。`remote/checker-v2-license-bridge.json` 保留可還原原 checker bytes 的證明；該 bridge 當時為 PREPARED_NOT_RUN，實際執行成功另由 `remote-final` 收據證實，不回改舊狀態。

本輪有一項實際編排偏差，記於 `orchestration-notes.json`：最初 stop guard 用 whitespace 拆 `/proc` comm，誤讀 startTicks=0，shell Exit 1 且未送 signal；Root 未先檢視結果便開始 Pages build，idle Normal server 曾短暫同存，但 Normal Browser／PDF 已全部結束。隨即改以最後 `)` 後欄位核對確切 PID／startTicks，SIGTERM 後證實 3280 connect_ex=111、server 真 Exit 143；Pages build 真 0。不能稱完全遵循 stop-before-build。未觀察到輸出／測試影響，337 source 與 2944 strict local checks 另證實最終產物；正式 final cold／warm 其後只使用 Pages，沒有藉此回寫最初 guard 成功。

## 7. Normal 功能、可及性與重驗界線

原 `source-after.json` 的全矩陣完成 531 assertions／245 layouts／119 axe scans，523 PASS、8 FAIL、真 Exit 1；axe 0 violations、384 incomplete，39 business、96 identity-switch directions、3 print，strict network／runtime／console／PII 均零。8 項失敗涉及三系列價格、原生複雜度鍵盤、storage-blocked、跨系列 PII/history；工具在 native CV 離屏內容尚未 paint 時讀取值。`browser-v6.cjs --quotation-impact-retest` 原生捲動＋兩次 rAF 後重驗 42／42 PASS、Exit 0；同來源無 App 修改。原 531 **仍為 FAIL**，不改稱 fresh 全矩陣 Exit 0。

最終 v2 受影響重驗及獨立補證如下。完整命令參數在各 command receipt，工具／fixture／catalog／來源均有 SHA。

| Test ID／procedure | 原結果與 fresh 證據 | 有效結論與限制 |
| --- | --- | --- |
| R01-NORMAL-FINAL168：`browser-v7.cjs … --footer-impact-retest` | 168 complete，165 PASS／3 FAIL，Exit 1；15 Quotation layouts、96 Footer directions、39 business、3 print；9 native Footer actions 只完成 6 | 三個 modifier popup 的 context response 為 null，原始失敗及最終 count guard 保留 |
| R01-NORMAL-MODIFIER：`footer-modifier-v8.cjs … --footer-modifier-only` | fresh 4／4 PASS、Exit 0；三次真 ctrl/middle popup 的 PerformanceNavigationTiming.responseStatus=200、URL 精確、原頁 timeOrigin／URL 不變、四 PII fields 清空 | context response 仍 null 原樣保留；不是用 fetch／reload 或舊 200 替換失敗值，精確補足三項 native intent |
| R01-NORMAL-QUOTATION-AXE：`quotation-axe-v8.cjs … --quotation-axe-only` | 19 tests PASS／Exit 0；18 次 fresh full-document Quotation axe，0 violations／0 incomplete | 只覆蓋受影響 Quotation 狀態，非整站 119 scans 重跑 |
| R01-NORMAL-CV：`cv-supplement-v4.cjs` | 6 tests PASS／Exit 0 | fresh 捲動／錨點／焦點／可見性等指定 CV 功能，依 raw records 限定範圍 |
| R01-NORMAL-FONT：`font-native-supplement-v6.cjs` | 10 cases 完成，9 PASS／1 early-print FAIL，Exit 1；9 normal＋1 controlled fault | 原 early print 讀離屏 paper innerText 為空，原錯誤保留 |
| R01-NORMAL-EARLY：`font-native-supplement-v7.cjs … --early-print-only` | fresh 1／1 PASS、Exit 0；只原生捲動 paper＋2 rAF／真 checkVisibility 與 bounds 後讀原 innerText，Core 仍 held/loading | 原 9＋精確 fresh 1 補足 10 功能；不是宣稱 full10 clean Exit 0，沒有改 CSS／改讀 textContent／強制 font.done |

上述最終 168、fresh modifier、Quotation axe 的 strict network／runtime／console／PII 都為零，monitor bytes 不變、沒有新增通用豁免；No-JS 的合成 script CSP 及受控 Core 404 只在各自負向記錄中辨識。受控 404 的 375×1000 實際圖已由 owner 檢視，該 viewport 繁中可讀／未見缺字框；不擴張為所有 Unicode 或正常 network 成功。

`normal-retained-v2-composite-review.json` 與 `font-normal-retained-v2-composite-review.json` 將原 FAIL、精確重驗和 source bridge 分開。未重新執行 Normal 全 245 layouts／119 axe；未受影響 non-Quotation 的沿用需 exact 334-file source／CSS delta、DOM／paint 與明確範圍支持，不能僅憑 fingerprint 推論。

### 384 個 contrast incomplete 的限定判讀

`a11y/normal-contrast-final-v2.json` 為 `SCOPED_384_CORRESPONDENCES_RESOLVED`：375 項使用先前 fresh R01 computed／paint 證據與最終 non-Quotation source bridge；另 9 項 Home CTA 以最終來源原生捲動啟動 CV 後取得 fresh paint bridge，pending 0。原 full-suite Exit 1／384 incomplete 不變。

9 項啟動前為離屏而缺 paint 的失敗嘗試保留；補證沒有強制 hidden CSS。實際捲動後的 CTA 畫在 radial surface，沒有 overlay；當時 menu aria-expanded=true 但 panel 已離屏，不能拿它宣稱可見 menu overlap 證明。此為逐 target 對應的 contrast 補證，不是 fresh 全 119 axe、整體 WCAG 認證、真人讀屏或 Pages acceptance；18 次 fresh Quotation axe 是另一份獨立證據。

### Pages 字型十項的精確 No-JS 補證

`font-pages-retained-v2-composite-review.json` 綁定最終來源：原 `font-native-supplement-v7.cjs` 十項完成、9 PASS／1 `NOJS-modern` FAIL、真 Exit 1 不變。Footer 在真原生捲動後仍暫時 CV-skipped，原 innerText 為空；fresh `font-native-supplement-v8.cjs` 只對這一項有界等待實際 `checkVisibility(contentVisibilityAuto)`／原 innerText，先觀測 skipped／text0，再觀測 rendered／text915，fresh 1／1 PASS／真 Exit 0。沒有改 CSS、改讀 textContent、放寬幾何或新增 network exemption；結論為原 9＋精確 fresh 1 補足十項功能，不宣稱 full10 clean Exit 0。

Pages 受控 Core 404 的本次 375×1000 PNG 已實際開圖，Header／系列帶／Hero／CTA 繁中可讀、該 viewport 未見 tofu；只支持這個 viewport，受控失敗資源仍保留為負向證據。這不代替 Pages 主矩陣／對比／視覺驗收。

### Pages 最終完整矩陣：原 strict network FAIL 保留

`qa/pages-retained-v2-release/result.json` 已完成 531 assertions：530 PASS／1 `FINAL-STRICT-PASSIVE-NETWORK-PRIVACY` FAIL，原結果不回改。完整 counters 為 245 layouts／119 axe scans／96 identity-switch directions／39 business／3 print／47 raw screenshots；axe 0 violations、384 incomplete，manualEvidenceErrors 0。`browser-pages-retained-v2-release-command.json` wrapper 真 Exit 1，不能由其他 PASS assertions 或後續分類改成 Exit 0。

strict gate 原始共有 **74 network error records：60 GET fetch abort、13 HEAD fetch abort、1 GET IMAGE abort**。最後一項是 required asset，維持嚴格 UNKNOWN，沒有套 prefetch exemption。Console／runtime／PII 為零，不能因此稱全網路零錯誤或 App 通過。

`pages-transport-readonly-review.json`／process 真 Exit 0，74 unique URLs 逐筆 exact inventory／fresh readonly HTTP：60 筆確為同源 exported static RSC speculative prefetch，舊 filename regex 不含 `!`／`$`；13 筆為 approved document HEAD cancellation（11 筆原 headers 200、2 筆原 status null），原完成／取消原因仍未知；1 筆 image 為 `UNKNOWN_STRICT_FAILURE_RETAINED`。沒有修改 monitor／source／原結果，也沒有全矩陣重跑或新增 required-resource whitelist。

Unknown image 為 `/images/showcases/honest-diecut.webp`，發生於 `SWITCH-IDENTITY-portfolio-main-modern-TO-luxury`，原 `net::ERR_ABORTED`、completion null。Fresh GET 為 200、57,514B，raw SHA 與 out inventory 相同，只證實後來的可取性；不證明原請求完成、誰取消或應否忽略。全部 74 fresh HTTP 為 2xx，`freshOriginalCauseClaims:0`，不能回填原 abort／status-null。Pages 384 contrast incomplete 的限定補證已完成，原 incomplete 數字維持，範圍如下。

### Pages 384 target 的限定 contrast 對照

`a11y/pages-contrast-closure.json` 銜接 final／summary／visual review： 345 項 formal computed＋source bridge、30 項 fresh opaque-menu／closed-paint、9 項 fresh Home CTA CV activation，共 384、unresolved 0。獨立 fixture 核對 27 個合法尾斜線 URL 與 20 個 selector suffix 映射後，formal computed 與 Normal 對應輸入相同，沿用已證保守公式；不是重新計算 384 次或拿舊 screenshot 當本次 paint。30 項實際 opaque coverage=1／九點皆 panel topmost；9 項 CTA 以真捲動啟動，visible／viewport intersection／target topmost 皆成立，捲動後 menu 已離屏，不宣稱同時可見。

Owner 實際開啟九張本次 PNG，`pages-contrast-visual-review.json` 為限定 paint observation PASS；screen pixels 不作 luminance samples。Collector／bridge 真 Exit 0，最初誤讀 catalog 為 route fixture 的 KeyError／Exit 1 仍保留。只封存並引用本次 Pages CSS，沒有宣稱未保存的 Normal bundle 逐 byte 相同。

最終原完整 suite raw SHA `bc9e801d8ae4061f44ca8a89805f9a55f25fe3a55376e6e02e37a3efac53fa7d` 經 `project-r01-contrast.py --input …/qa/pages-retained-v2-release/result.json --compare …/pages-contrast-projection.json` 真 Exit 0，與已審 119 scans／384 targets 的 projection SHA `897c397221e0ee80185c6fae2586534737fc1d9c7aa4f04b72b0c281ba01c6de` 完全相同。此 PASS 僅銜接證據；原 119 scans／0 violations／384 incomplete、530／531／Exit 1 維持，不是整套 axe／WCAG／真人 AT／network 或 release PASS。

## 8. 兩模式八份實體 PDF 與視覺界線

最終 Normal／Pages 各 4 份 PDF 均實際 capture 與 physical verify，四個外層 receipt 真 Exit 0；每模式均為三系列 SHOP＋17 addons／40字客戶／60字專案，以及 Modern APP from-price 補充，不虛構 SHOP from price。`pdf/final-eight-pdfs.json` 固定 8 actual PDFs／120 checks／8 fresh 150dpi views／0 blocking。

| 檢查 | 實際結果／限制 |
| --- | --- |
| 實體輸出 | 兩模式共 8 份各 1 頁標準 A4、每份 15 項共 120 PASS；content box 0.1pt tolerance，三個明確白色 canvas fills 特別辨識，不廣泛放寬頁界 |
| 內容／QR | Logo、完整內容、兩個真 QR；150／300 dpi whole-page decode 指向正式 website／portfolio；font 400／700 loaded 觀測保留 |
| 人工檢視 | `normal-final-v2-manual.json`、`pages-final-v2-manual.json` PASS，各 4 張 fresh 150dpi 實際開圖，共 8 張、blocking 0；不冒稱每張 300dpi 人看、實體紙本或 tagged-PDF／AT 驗收 |
| 最終 v2 與前一 R01 PDF | `normal-final-v2-source-bridge.json`：Paper DOM／assets／totals／font observations／text-span JSON 與 150／300 raster bytes 相同；raw PDF 可能因 metadata 不同，且仍另做 fresh views |
| 與原 DC-007 基準 | `normal-final-v2-comparison.json`、`pages-final-v2-comparison.json`：兩模式八份同一資格文字右緣縮短 4.0162963867pt，文字／x0／y0／y1／font size 不變，其餘座標差 <0.001pt；無越頁／截字／碰撞，記為 nonblocking delta。150／300 PNG 並非與原 DC-007 逐 byte 相同 |

最終 Normal／Pages 四組配對的 150／300dpi PNG 均逐 byte 相同，`pages-final-v2-source-bridge.json` 亦核對 337 source hashes 仍吻合 final9d；owner 仍另行實際開啟 Pages 4 張，沒有以跨模式相同 bytes 代替 fresh review。這與「相對原 DC-007 基準存在文字右緣差異」是兩個不同的比較。

早期 PDF collector schema／空 CV paper 等原始 FAIL 與 source-schema bridge 保留；只修證據工具的欄位映射／原生可見性準備，不用後來成功回寫舊結果。PDF generic font label 不是 glyph source 精確性的證明，仍需第 5 節 binary／outline proof。

原 47 張新 full-page capture 有 Home CV 離屏空白，屬工具未啟動 paint 的限制，原圖保留、不能視覺 PASS。嚴格零幾何 feasibility 真 Exit 1：Modern 375 的 main height／footer Y 有 +0.0625px，其餘 section 幾何吻合、CV 原生 rendered，沒有把 fractional delta 改成零。

後續 `qa/native-complete-pages-retained-v2/result.json` 真 Exit 2：47 tall＋47 正常 viewport top＋490 native viewport tiles 全保留；47 個 semantic delta 均零、最大幾何差 0.5px，但原始 34 筆 `TALL_REJECTED` 不回改。Tall 圖保持原寬、改 capture height，故只屬 diagnostic／manual 圖像，不能冒稱原 fixed 1000px viewport、零差異或 pixel-identical；沒有 CSS force 或拼接，正常五寬的 245 layouts 與功能門檻另外驗證。

`native-visible-bounds-facts.json`／command 真 Exit 2，34 筆均為 `FACTS_COMPLETE_REVIEW_REQUIRED`：逐個實際 glyph／control rect 在畫布內，沒有 glyph／control outliers 或 unexplained skipped；隱藏項僅明確認出的 closed native details 非 summary 後代及 exact 1px／clip 的 sr-only。這是必要界線事實，不是廣泛忽略 overflow、把拒絕改 PASS 或自動完成視覺審查。對 >1px、換行、截字或 section 異常的圖仍須拒絕並回到 native viewport tiles。

47 個指定圖例已完成 fresh 人工檢視：Modern 15＋Gallery 2、Heritage 15、Luxury 15，各 owner 紀錄合於 `visual/47-case-visual-aggregate.json`，source／47 source PNG bytes／SHA 皆吻合，observed blockers 0。Heritage 另實際對看 15 top、15 原 DC-007 baseline 與 5 body tiles；Luxury 明示不覆寫 ordinary full-page 有效性。長圖可能由工具縮至 6000px，沒有逐字校對／像素或對比認證。

[視覺索引](../screenshots/design-collection/dc007-r01/visual-index.json) 與 [逐圖人工紀錄](../screenshots/design-collection/dc007-r01/visual-review.json) 為 **LIMITED MANUAL PASS**：實際圖片／尺度中未觀察到阻擋，不是自動幾何 gate、完整 fixed-height 截圖驗收、pixel equality、WCAG、效能或整體 release PASS。原 `MANUAL_PENDING`／34 `TALL_REJECTED`／raw Exit 2 均保留。Pages contrast 的限定補證另見第 7 節；網站人工圖與八份 PDF 不關閉原 strict network UNKNOWN。

## 9. 最終 after-v2／warm 與交付待辦

正式 after-v2 於 04:29:33–04:35:14Z 完成 18／18，18 個 Lighthouse 子程序真 Exit 0，外層門檻真 Exit 1。三首頁達標，三試算頁 TBT 中位數仍超過 200ms；18 筆中有 9 筆 TBT 超標，包含 Modern Home 的一筆，未刪除。所有 LCP／CLS 中位數達標。Heritage Home 有一筆 CLS 0.009712874，其餘 CLS 為零。以下 median［min–max］及 TBT 三筆原值保留，改善率只比較同條件 fresh before 的中位數，不表示獨立因果或門檻豁免。

| 頁面 | LCP ms | CLS median［range］ | TBT ms／三筆原值 | 超標／改善 | 結果 |
| --- | ---: | ---: | --- | ---: | --- |
| Modern Home | 1555.908［1555.617–1605.498］ | 0.000［0.000–0.000000000］ | 171.396［157.261–245.383］；245.383／157.261／171.396 | 1／3；↓86.88% | PASS |
| Modern Quotation | 1517.227［1448.028–1579.400］ | 0.000［0.000–0.000000000］ | 235.073［221.580–242.520］；242.520／221.580／235.073 | 3／3；↓79.11% | FAIL |
| Heritage Home | 1528.121［1488.557–1528.425］ | 0.000［0.000–0.009712874］ | 171.249［144.506–193.605］；171.249／193.605／144.506 | 0／3；↓86.30% | PASS |
| Heritage Quotation | 1490.449［1394.039–1636.516］ | 0.000［0.000–0.000000000］ | 246.120［172.548–276.211］；246.120／276.211／172.548 | 2／3；↓73.04% | FAIL |
| Luxury Home | 1465.189［1461.136–1469.072］ | 0.000［0.000–0.000000000］ | 189.397［181.057–194.735］；181.057／194.735／189.397 | 0／3；↓81.49% | PASS |
| Luxury Quotation | 1492.847［1464.887–1515.826］ | 0.000［0.000–0.000000000］ | 210.042［201.122–290.532］；210.042／201.122／290.532 | 3／3；↓75.91% | FAIL |

最終 18 次 cold 各實際載入 Inter＋Core 兩個 font；Core 全部 High／isLinkPreload=true／HTTP 200，request 198.156–359.377ms、network end 3292.444–3582.373ms、font completion 3307.399–3608.542ms，281,768 resourceB／282,090 transferB。18 次 Core 均晚於 FCP，差 1777.558–2040.496ms；初期 fallback／其後 swap 仍存在，不把 FCP 畫面說成已完成最終繁中字型，也未將字型載入延到測量外。這是六頁 cold 範圍，不代表罕用字之後不會載入 legacy。

最終 18 份 trace 另由 `analyze-final-traces.py` 離線依真 FCP→TTI 重算，`final-trace-reconciliation.json`／process 真 Exit 0，全部與原 LH TBT 差 ≤0.002ms。此 PASS 僅為算術對帳，不變更三個試算頁 FAIL。Quotation r1 的 092r framework-attributed task blocking 分別約 Modern 163.485、Heritage 174.837＋另一 task 5.749、Luxury 136.174＋另一 task 8.320ms；另一個 0c98-attributed task 近似 style/Layout category 約 104.9／95.5／93.4ms，該 task 實際 clipped blocking 為 79.035／65.534／65.548ms。Category 不是額外可加的 TBT，URL attribution 也不保證呼叫原因；只能確認剩餘 framework／Layout 成本，不能全部歸因字型或某個 App 函式。

| Test ID | procedure／預期 | 目前狀態 |
| --- | --- | --- |
| R01-PERF-AFTER-V2 | `run-lighthouse.py --base http://127.0.0.1:3281/ --code-map …/source-after-v2.json --output …/after-v2 --label r01-final-retained-source`；六組各三次 cold／原門檻 | FAIL；18 次完整、LH 子程序全 0、外層真 Exit 1，三試算頁未達 TBT 門檻；`after-v2/summary.json`、`after-v2-process.json` |
| R01-PERF-WARM-V2 | `node …/measure-warm-v2.cjs --base=http://127.0.0.1:3281/ --code-map=…/source-after-v2.json --output=…/warm-final-v2` | COMPLETE／真 Exit 0；6 cases、27 actual actions；網路 HEAD review flags 保留，非 cold TBT／field INP PASS |
| R01-ARCHIVE | 保留全 FAIL／工具／source／receipt，manifest 原 SHA→封存路徑 | INTEGRITY PASS／真 Exit 0；3383 records／含 manifest 276,493,547B；不代表 QA／效能通過 |
| R01-DELIVERY-INTEGRITY | `python3 …/check-delivery.py`；來源、依賴／部署設定、封存解碼 SHA、文件／連結、實際 exits 與原效能 FAIL | PASS；44 項、真 Exit 0。附件後 lint 及封存完成回執另存[交付附錄](dc007-artifacts/r01-delivery/manifest.json)，不改動原 3,383 筆 manifest。附錄僅新增已完成回執與本連結，不改受測程式 |
| R01-DELIVERY | 同 Draft PR45 新 exact-head CI、真 remote artifact 與本機測試輸出比對 | PENDING；local 2944 PASS 不等於 remote，沒有新 main CI／部署宣稱 |

正式 after 已完整記錄逐組原值／範圍／每次超標與真退出碼；warm 的 cache／操作事實另列如下。三試算頁必要 TBT 中位數仍 >200ms，因此 R01 維持 FAIL／未通過，不以 73.04–86.88% 的各組中位數改善、單次最快或三首頁 PASS 改寫門檻。

### 六組 warm／真操作診斷

`warm-final-v2/summary.json`、`warm-final-v2-process.json` 於 04:35:31–04:36:25Z 完成，真 Exit 0。每組同 context 先 prime、再 warm reload，Home 各 3 次真 menu open／Escape／站內 CTA，Quotation 各 6 次真 menu 與 service／build／addon 選擇，共 27 次操作；操作前後 timeOrigin、Event Timing／long tasks／layout shifts 原件保留。不是單純 page.evaluate 代替使用者操作。

| 頁面 | Warm LCP ms／CLS | cache 命中／304 | 真操作 | raw HEAD failure records |
| --- | ---: | ---: | ---: | ---: |
| Modern Home | 464／0 | 14／0 | 3 | 7 |
| Modern Quotation | 428／0 | 17／3 | 6 | 7 |
| Heritage Home | 472／0 | 16／1 | 3 | 6 |
| Heritage Quotation | 496／0 | 19／3 | 6 | 7 |
| Luxury Home | 468／0 | 16／1 | 3 | 6 |
| Luxury Quotation | 416／0 | 19／3 | 6 | 7 |

cache 證據包含真 CDP cache flag 或 304，不以「第二次」推認快取。六組 required GET asset failures／console／runtime 均零，但共 40 筆 raw HEAD failure records 與每組 `headTransportReviewRequired:true` 原樣保留；不能稱全網路零錯誤或用 COMPLETE／Exit 0 消除傳輸判讀。此工具的 `tbtMs`／`inpMs`／fieldWindow 為 null，CDP blocking／Event Timing 只是限定診斷，非 Lighthouse TBT、field INP／p75 或原未知取消已解決。

## 10. Known Issues 與發布界線

最終 staged `git diff --cached --check` 真 Exit 2：只有兩份逐 byte 固定的上游 OFL 授權文字第 21 行各含一個原始行末空白。為保留完整原件與 SHA 契約而不改寫；另僅排除 `src/app/fonts/OFL.txt`、`public/fonts/OFL-Noto-Sans-TC.txt` 的 remainder 檢查真 Exit 0。原全域 FAIL 與補充指令均存入[交付附錄](dc007-artifacts/r01-delivery/manifest.json)，屬非功能性的上游文字格式例外，沒有把原 FAIL 改為 PASS。

原 [DC-007 報告](dc007-implementation.md) 的真人讀屏 Required BLOCKED 仍未解決；缺真人／Orca 環境不能以 AX tree、axe 或本輪效能代替。原 HEAD 取消、7 筆 status-null 未知及兩次 script abort 的未知保留，Next prefetch initiator 不是 canceller；不能把 canceled=true／舊 200 headers 當請求成功完成。Normal 本輪新 modifier 的精確證明只處理其三個 popup，沒有取消舊問題。

最終 Pages 另有 honest-diecut required image 的原 GET abort／completion null 未解；fresh 200 及檔案 SHA 吻合不能關閉該 strict UNKNOWN。原 suite 530／531、Exit 1 保留，因此除了效能與真人 AT，網路嚴格門檻亦未通過。

本輪為固定 lab／雲端 Chromium，沒有 field INP、CWV p75 或真實裝置結論。原 DC-007 FAIL／incomplete／blocked、所有候選失敗、工具與環境失敗都保持版本邊界。即使未來 exact-head PR CI 成功，仍不是完整 DC-007 release acceptance，也不是 merge、main CI、正式部署、法律／索引或 DNS 核准。
