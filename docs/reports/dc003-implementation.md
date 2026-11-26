# DC-003 — Modern 相容整合與集合入口

日期：2026-11-26。分支：`feature/design-collection-modern`。本機驗收完成，PR 前快照；未合併或部署。依 [任務](../task/dc003.md)、[工作包](../01_design/design-collection/work-packages.md#dc003) 與 [核心契約](../03_engineering/design-collection-core.md)。實際 Commit／PR／CI 在同一 PR Description 後補，不為記錄自己的 SHA 另提交。

## 來源、版本與實作

起始 main `794b076e2a0b11b05aaf86379d8387c02f6913b3` 已含 DC-002／PR #33 與 DOC-003／PR #35。交付前同步已合併 PR #36／#37，PR 建立後 main 又合併 DOC-006／PR #38；將已核准的文件變更合入 feature 並解決 Roadmap 衝突，最終 base 為 `0991072feebb142f52393946d0f1fa93c6f22a77`。這些變更只含索引／歷史交叉連結／Roadmap，保留新版文件與原工作包前置 DC-002，未合併本功能 PR 或改動 main。

公司 main `cdb1ec70f1fa641f3022f53994ab6da83c4333de`／tree `0a8ff0b2239e55c9f11dc556d3de31f1c9013dde`。與前輪 `5be640a` 比較僅三 commits／四檔文件變更，已補讀；品牌／正式命名與部署／服務／定價 Blob 未變，沿用同版審閱。新知識庫規劃不作 Gallery 業務內容。最新完整 tree 仍無 AGENTS.md；未修改該 Repository。細節見證據 `company-review.json`。

唯一 root layout 保留 html／body、font／metadata／WebSite JSON-LD。11 個原 page 來源檔 byte-identical 搬入 `(modern)`，原 16 URL／文字／Metadata／錨點與功能保留。ModernFrame 使用 fragment；group not-found 只有內容，root not-found 才帶完整 Frame，沒有 experimental flags。Gallery 自包 Frame，不讓未來新系列繼承 Modern 外框。

新增 `/design-collection/` 與 Footer「網站目錄 → 設計系列」入口；Modern 真連結有效，Heritage／Luxury 明示規劃中，沒有假 href／按鈕／預覽。Modern facade 引用原 DS，沒有更換 palette、Logo、字體、價格、Contact／Quotation、storage／A4、dependencies／lockfile、Next／workflow 或 DNS。Gallery registry、SEO、fixture 與 export／HTTP 清冊精確增為 17；noindex/nofollow、無分享圖／Sitemap、Privacy／dev 保護保持。

## 環境與證據

Linux 6.18.57 x86_64、Node.js 24.22.1、npm 11.9.0、Python 3.12.14；Next.js 16.4.6、React 19.3.1、TypeScript 5.9.3、Tailwind CSS 4.3.3。實際瀏覽器 Chromium 156.0.8078.79，外部 Playwright Core 1.65.1／axe；未加入 npm dependencies。普通 3230、隔離 preview 3234、Pages static 3231、固定 baseline 3232 都只綁 loopback。Pages preview 使用真正 HTTP 404＋exported 404.html，模擬 Pages 自訂錯誤頁，不是新增網站 Backend。

必要 [原始證據](dc003-artifacts/README.md) 包含真實 OS receipt、不可變 log／JSON、工具、來源、修正與重驗；大型資料 gzip 保留原內容／hash。[實際截圖與 PDF](../screenshots/design-collection/dc003/README.md) 與證據 SHA 清冊可交叉核對。JSON 中測試時間／預期／實際／Test ID／環境／命令與未完成狀態保留原值；不只依 JSON PASS 推認程序成功。

最終 176 個 source／scripts／public／設定檔 fingerprint：`93117cfc014af7672cdeedc8f2128e67913d04ae0486eba569e0f602cb92d263`。source-v1／v2／v3／source-final 及 source-delivery-final 分別保存，不用最終版本回寫初次失敗。

## 實際驗收

命令預期 Exit 0；人工判讀則 Exit N/A。原始 browser Exit 2 表示等待人工判讀，不是已執行的 Exit 0；最後 acceptance 由原斷言、覆核與版本 bridge 一起成立。

| ID | 命令／操作與實際結果 | 真 Exit | 狀態／證據 |
| --- | --- | --- | --- |
| DC3-01 | 最新 main／DC-002 合併／公司規範差異 | N/A（來源讀取） | PASS；company-review／base 記錄 |
| DC3-02 | `npm run build:pages` baseline；五頁 × 375／1440，10 PNG／metadata／layout | 0／0 | PASS；baseline-build／baseline-capture |
| DC3-03a | `npm ci --cache /tmp/xk-npm-cache`，locked install | 0 | PASS；npm-ci-v3 |
| DC3-03b | `npx tsc --noEmit`，Strict TS 保持 | 0 | PASS；tsc-v3，保留初次 stale-dev-type FAIL |
| DC3-03c | `npm run lint`，零錯誤／警告 | 0 | PASS；lint-v3 |
| DC3-03d | `npm test`，365 項全部通過 | 0 | PASS；test-v3 |
| DC3-03e | `npm run build`，同步文件後一般 build | 0 | PASS；build-normal-latest |
| DC3-03f | `npm run build:pages`，精確 17 HTML／資源與排除 guard | 0 | PASS；build-pages-final |
| DC3-04a | 普通 HTTP smoke 1108 PASS／2 N/A；17 頁所有宣告 147 anchors | 0 | PASS；normal-smoke-final／normal-anchors-v2 |
| DC3-04b | Pages HTTP smoke 1110 PASS；17 頁 147 anchors | 0 | PASS；pages-smoke-v2／pages-anchors |
| DC3-04c | 普通 gated 404 恢復後單一 frame、一般未知 404；相同正常 build 開隔離 preview 的兩頁 200／受保護 metadata | 0 | PASS；normal-gates-final，五個實際 browser cases |
| DC3-05 | 兩模式各 17 × 五寬＝85 layouts，無橫溢，圖片解碼／頁面地標／meta | 2（見人工階段） | 斷言全 PASS；normal-v2／pages-final 原 JSON |
| DC3-06 | 每模式 23 axe：零 violation；各 191 incomplete 逐項覆核＝165 PASS＋26 N/A | browser 2；補充收集／離線判讀 0；人工 N/A | PASS；各 axe-adjudication、menu 證據與 review |
| DC3-07 | 每模式 132 assertions：keyboard／focus／mobile／Reduced Motion、Gallery／404、Contact／Quotation／storage／PII／network | 2（人工階段） | 132 全 PASS／無功能 assertion FAIL；原結果保留 MANUAL_PENDING |
| DC3-08 | 17 加購、40／60 字最壞 A4；每模式 14 physical checks，單頁、內容／Logo／兩 QR／150與300dpi解碼 | verifier 0；實際視覺 N/A | PASS；normal-pdf-v2／pages-pdf，兩份原 PDF |
| DC3-09 | Modern 10 前後對照：Header／main layout、main DOM、metadata 相同，Footer 前逐像素差異＝0；僅一個 Footer li 及成對 React useId 改名 | 補判 0；人工 N/A | PASS；visual-adjudication-v2、原 compare FAIL 與實際圖均保留 |
| DC3-10 | 14 份 Markdown／244 內部連結、完整 Diff、176 source、11 原樣搬移、65 份 log hash、證據 manifest／無 secrets／build dirs | 0 | PASS；final-check |
| DC3-11 | 精確 PR head CI／實際 Pages artifact | 尚未發生 | PENDING，建立後更新同 PR Description；不自動 merge／deploy |

普通的完整 132 assertions／PDF 來自 source-v2 診斷版本，與最終只差兩個 private gate 的先後順序及 smoke 驗證器；最終已恢復兩頁原 bytes。公開頁面／component／CSS／資料無變，最終普通 build 與受測版本的 136 個 CSS／JS／font 資源逐檔等價（僅三個 build ID manifest 目錄正規化，內容仍比 hash），再以最終 17 頁 HTTP／metadata 及五個 gate／preview browser cases 重驗。這是按實際 Diff、執行產物與受影響頁面決定的版本 bridge，不將舊結果冒稱重跑。

最後 smoke 的修正僅 hosting-aware 測試邏輯；normal 的實際 error-shell 分支未變，合成／saved-response 正負例兩模式通過，Pages 已真 HTTP 重跑。已用安裝版 Oxide 與 Tailwind design system 證實新增／刪除可編譯 utility 均為 0。沒有為 validator 的改動重跑無關 UI。文件同步不改程式 bytes；精確 PR CI artifact 仍須另外下載比對。

Axe incomplete 的 159 個 gradient 節點（包含 33 個 menu gradient），加上 shadow／部分可見的六個 overlap 節點，共 165 PASS以本輪 computed styles、alpha 保守界及同版 17 份來源判讀，最低比 4.78035:1（要求 4.5）。另 26 節點每個 glyph 完整落在本輪實際 opaque panel、九點 hit-stack 證明遮蔽才記 N/A；不把 offscreen／部分遮蔽冒稱不可見。兩模式分別新收七頁資料；Pages 的 41 HEAD 另逐筆確認唯讀、同源公開頁、無 query／body／測試個資 canary 與認證 Header。原收集 FAIL／MANUAL_PENDING 不覆寫。

Root 實際查看了 10 組指定畫面的對照裁切／縮圖、兩寬共用 Footer 差異、Gallery 375／1440 原圖、兩份 PDF 渲染及 menu 證據。Footer 增加一列約 48px 可解釋，沒有裁掉內容；Header 的兩個相互引用 React ID 只作精確配對改名，其餘 SSR tokens 必須相同。沒有用整份 DOM 正規化掩蓋變化。

## 失敗與修正


- TypeScript 首輪真 Exit 2：前輪 ignored `.next/dev/types` 指向已搬路徑。production typegen 已正確，確認 Git ignored 後僅清理舊 dev type cache，重跑 Exit 0；未改 tsconfig／strict 檢查或來源行為。
- 普通 HTTP 首輪 1106 PASS／2 FAIL：驗證器對已知 Privacy／dev 的 raw 404 也要求完整 SSR 外框。曾假設 connection 時機造成，v2 將相同 gate 前移後仍得到同樣兩個 FAIL，該推論被否定；原 132 項 browser 的對應 404 frame 測試已證明 Client Boundary 恢復後僅一份外框。檢查安裝版 app-render 的固定 errorShell 路徑後，恢復兩個 page 原 bytes／原預覽生命週期。驗證器僅對 exact 兩個 gated route 分別要求真 404、無私有內容、raw errorShell 不重複地標，並明記 raw 完整 frame N/A；瀏覽器必須另驗恢復後單一 Frame。公開 17 頁與其餘 unknown／planned 的嚴格 SSR／Pages guard 不變。v2 診斷 patch 與 FAIL 保留，不把框架限制寫成已修復應用缺陷。
- 普通 browser 首輪 132 項完成、26 FAIL：25 項是工具把 Pages baseline 尾斜線套到普通 Metadata，依原 helper／分模式契約修正工具；另一項 CSS ERR_ABORTED 首輪缺事件時序，不能僅由 referer 判定原因；工具補足展開／捲動後與測試交界的等待及事件時間／Test ID，保留資源錯誤 strict，再實測驗證。原網站公開 Metadata 不變。
- 首輪 axe 零 violations 但有 incomplete，必須逐項判讀本次 computed evidence，尚未完成前不算全部 a11y PASS。
- 原始 source v1 與結果／工具版本保留；各結果內嵌當時 source／SHA，v1／v2／v3 分別保留，目前 source.json 對應 v3，最終 script-only 差異另記 source-final，不能用 v2 描述首輪。所有後續 FAIL 仍保留。Runner preflight 的指定 Exit 7／timeout 是確認工具可辨識失敗，不是應用驗收失敗。


- PDF 原 verifier 將 Chrome 最早三個純白 canvas 四捨五入邊界當成內容溢出，真 Exit 1；檢查實際 paint／clip／MediaBox 後，只對完整白底簽名分類，其餘全部文字／非背景圖元／actual paint 仍用原 0.1pt 嚴格界線。新 verifier 兩模式各 14 PASS，不裁切、縮放或修改 PDF／app CSS。
- 原視覺比較刻意未忽略生成 ID，真 Exit 1，十組唯一差異是 Header menu 的 aria-controls／id 配對。補判檢查唯一 trigger／panel、同一對 ID 原位改名，其餘 Header tokens、main DOM／layout／像素與去新增 li 後 Footer 必須完全相同。補判首輪工具 tuple assignment 錯誤 Exit 1 保留，修正工具後 Exit 0；不改產品。
- Pages menu collector 初次將唯讀 HEAD 誤判成 non-GET 副作用而 Exit 1。原摘要缺 body／headers，未直接洗成 PASS；新版本保留 GET policy，只有逐筆滿足同源公開頁、fetch、null body／0 bytes、無 query／hash／認證 Header／測試個資 canary 的 HEAD 可接受，再新收七頁資料 Exit 0，原 FAIL 保留。

## 檔案與交付

- 11 個 pages 移到 `src/app/(modern)/`；新增該 group layout／not-found 與 root not-found，技術 root layout 分離。
- 新增 `src/components/design-collection/modern/modern-frame.tsx`／`modern-not-found.tsx`、`src/design-systems/modern/index.ts`、Gallery component 及 `(collection)/design-collection/page.tsx`。
- Footer／navigation planning／新 server-only 目錄 config、registry／metadata／SEO、獨立 fixture、routes／metadata native tests、Pages builder／smoke 同步。
- `globals.css` 只新增本輪 task／report／evidence 的 Tailwind 掃描排除，沒有改舊呈現宣告；新 Gallery 用原 UI recipes。
- README／AGENTS／工程與報告索引、集中 Roadmap、核心契約、實作紀錄及本輪規格／報告／證據／實際截圖。

Known Issues：沒有未修復的本輪功能 blocker。實機、Safari／Firefox、完整真人讀屏／WCAG 認證及場域效能不屬本包已執行項目，不宣稱通過。Heritage／Luxury、StyleSwitcher、跨系列 reset／portal／print 隔離與新品牌角色審閱仍待後續包；正式 Privacy、價格／收件／索引核准保留原門檻。沒有收到本輪 merge／deploy 授權；只有 PR CI 不代表已部署。

最後 staged 檢查發現新 directory config 多一個 EOF LF；首次命令未單獨保存 exit，明記未知，沒有以外層後續命令的 0 推認通過。僅移除一個多餘 LF，前面所有 bytes 完全相同，附 eof-format-bridge；不因格式改動重跑無關網站 suite。交付 source 以 source-delivery-final 為準，原檢查與 source-final 保留。

PR #39 建立後的 DOC-006 同步只有文件，所有 176 source bytes 仍等於交付 fingerprint。原六指令／兩模式驗收依已記錄 source 與 runtime bridge 適用，最新提交的 CI／artifact 另於 PR 核對，不因文件衝突重跑無關 UI。
