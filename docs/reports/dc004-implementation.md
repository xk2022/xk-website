# DC-004｜Heritage 實作與驗證

日期：2026-11-26（UTC）。分支：`feature/design-collection-heritage`；base `main@8ba299a5a48da41ca7f4d88d9b2149d7c83f6584`。執行 [DC-004 完整工作包](../task/dc004.md)，延續 [PR #40](https://github.com/xk2022/xk-website/pull/40)；同版本 v1 [品牌核准](../01_design/design-collection/reviews/heritage-v1-approval.md) 已取得。

## 實作與範圍

- 新增獨立 HeritageFrame／Header／Mobile Navigation／Footer、完整 typed semantic tokens 與 scope recipes；編輯式 Hero、編號服務目錄、圖說作品清冊與合作／CTA，手機單欄。原 Logo 及正式自託管字體不變。
- 七主頁及九詳頁共 16 Heritage 頁，由共用 DTO 提供公司、服務、作品、聯絡及報價資料。Home Maintenance 與詳細 Services Cloud 的原映射保留；技術三案 Planned、品牌展示性質／順序、模板署名／reference-only、未知價格／起價／年度與來源界線保持。
- `[style]` 只生成 Heritage；詳頁 static params 僅原 3／6 slugs。style layout 不包 Frame，各頁提供一份完整 Frame，root 404 不重複。Main registry／SEO／獨立 fixture 精確 33 頁；Heritage canonical 指向 Modern、OG 為其自身 URL，單一 WebSite JSON-LD，noindex/nofollow。
- Gallery 僅 Modern／Heritage 可瀏覽，Luxury 無假入口；各 Footer 目錄涵蓋全部 33 個已完成 URL。www 根 basePath／assetPrefix、兩種 build、Privacy／dev／Sitemap 保護及既有工作流程保留。
- Contact／Quotation 重用原 Client controllers；Heritage 由 server 傳 DTO／小型 href map，不複製計算、驗證、儲存或新增 client registry。離頁個人欄位清空、方案 IDs 原 key 還原；沒有自動寄信、Backend、API、追蹤、依賴、價格變更或公司 Repository 修改。
- 標準 A4 保留原內容／Logo／兩固定 QR，具名 page 與啟用中標記隔離，防止路由保留 DOM 影響其他頁列印。實際結果依下方本輪證據，不從程式存在推認成功。

## 來源與版本

最新公司 main `e0229b97acb2bf6c2d83f8155665f68b11c27d71`（tree `f293ead9692f0e93531bdef73d6b477019ec205f`），相對前輪 `d03cd673` 多 2 個知識庫 M5／RAG commits；35 份相關治理／品牌／工程／服務／定價／決議 Blob 未變，沿用已讀同版紀錄，沒有把檢索測試問句當新規範。Logo／色票／字體／分類／定價／發布 Blob 沿用核准紀錄及 [前置報告](dc004-brand-review.md)。

原型、前置 FAIL／修正、PR 前 CI／main 部署均保留原時點；本輪不把那些結果當作完整功能驗收。品牌核准只適用 v1 展示角色／外框／構圖／52／36 字階，沒有批准新 Logo、字體、服務／價格、法律、索引或部署。

## 環境與版本界線

Linux 6.18.57、Node.js 24.22.1、npm 11.9.0、Python 3.12.14、Chromium 156.0.8078.79；外部 Playwright／axe 4.14.0 與 PDF 工具只作驗收，沒有加入 npm dependencies。伺服器僅 loopback：普通 3242，驗完停止後才建 Pages，靜態預覽 3243。npm cache 使用可寫的 `/tmp/xk-npm-cache`，lockfile 未改。

197 個 runtime／設定／素材檔案逐檔 SHA 保存於 source manifests；文件／證據另由最後 Diff 與 manifest 檢查。

| 版本 | 範圍及 fingerprint |
| --- | --- |
| v1 | 首輪完整普通模式，`5a2f3ff969af1cb6b5b530174fdd5d1da6c6b5ccac6f4d11601e0a7d3f99a3f0` |
| v2 | 修正 Services 共用 guide、六品牌連結 aria-label，`c95e118c905a6fd69a2d4e274642a08efc464cf98230c4c1a6675f67380abbd1` |
| v3 | 唯一 screen disabled 按鈕規則修正，`fd868bec7bae4efe96e018e444cf725ced37ee4edaf87253f6a129719f4014e8` |
| v4 | builder 單尾斜線驗證修正的歷史快照，未供 suite 使用 |
| v5 | 最終 builder／smoke 單尾斜線比較，`daafeceb4aec69b766f70f5430687d82a11455a9ebc7579ea4f032da85db6a0f`；相對 v3，195 檔相同、僅 2 個驗證 script 不同 |

`fixture-final.json` SHA `9b32d4877e9d0e8b9e698b6e4002bf9a6349ec07ffe2234c26bceab560b90eca`；catalog SHA `1c4ad0dc46e4d8efbce773fc630a4fc8c5bc57d0c29b0744a0608888c894dd63`。v3 以後 App、資料、素材與依賴不變；沒有因報告或工具修正重跑無關完整普通 suite。

## 品質指令

下列為實際程序退出碼；每次使用 `scripts/run-with-evidence.py` 的 OS wait 回執。receipt／log 位於 [證據目錄](dc004-artifacts/README.md)，壓縮檔解壓後的 SHA 對應原 receipt。

| 指令 | 實際結果 | 證據名稱 |
| --- | --- | --- |
| `npm ci --cache /tmp/xk-npm-cache` | Exit 0，v2 完成 | `npm-ci-final.json` |
| `npx next typegen` | Exit 0，重新產生忽略的 route types | `typegen.json` |
| `npx tsc --noEmit` | Exit 0，v2；後續無 TS 修改 | `typecheck-final.json` |
| `npm run lint` | Exit 0，v2；後續 builder 定向 ESLint Exit 0 | `lint-final.json`、`gallery-slash-eslint-v1.json` |
| `npm test` | Exit 0，v2；包含 inquiry、quotation／storage、DC routes／metadata／content／contracts | `tests-final.json` |
| `npm run build` | Exit 0，v3 最後普通 production build | `build-normal-v3.json` |
| `npm run build:pages` | 首輪 Exit 1，修正驗證器後 Exit 0，33 頁靜態輸出 | `build-pages.json`、`build-pages-v2.json` |

Node 原有 typeless TypeScript module 提示與 npm 版本通知保留於 log，沒有為消除提示改 package type 或升級套件。Runner 自測 zero／nonzero／timeout 的實際退出碼為 0／7／124，這是預期工具測試，與 App 驗收分開。

## 驗收結果

每個原始測項記錄 Test ID、預期／實際、程序、環境、版本、時間與 evidence；原 FAIL 不回寫。下表是分段證據形成的交付判斷，不宣稱普通模式曾有一份最終 262 項全套 Exit 0。

| 規格 Test ID | 實際結果與證據 |
| --- | --- |
| DC4-01 | PASS：main／DC-003、公司版本與同版本品牌核准；交付前 fetch main 仍為 `8ba299a5` |
| DC4-02 | PASS：來源／內容獨立覆核；20 個 parity 候選中 19 為編輯順序等價、1 個 Services 真遺漏已補並重驗。Home Maintenance／Services Cloud、價格／狀態／來源 gate 保留 |
| DC4-03 | PASS：上述六項品質指令完成，所有首輪失敗及重試有真實 exit |
| DC4-04 | 普通 PASS：`http-normal-v3` 2329 PASS、2 N/A；Pages PASS：`http-pages-v2` 2329 PASS、0 FAIL／N/A（Exit 0） |
| DC4-05 | 普通 PASS：首輪 33 × 五寬＝165 layouts，Services 五寬後續重驗；Pages PASS：全 262 項 suite Exit 0，其中 165 layouts、58 axe scans（0 violations／incomplete）、14 business 案例與跨 style 測項全部完成 |
| DC4-06 | 普通分段 PASS：首輪 58 axe 中 18 個 URL label 違規已修，受影響重驗 21 scans、0 violations／incomplete；原鍵盤／focus／menu／Reduced Motion 與跨頁案例保留。Pages PASS：全 262 項 suite Exit 0，其中 165 layouts、58 axe scans（0 violations／incomplete）、14 business 案例與跨 style 測項全部完成 |
| DC4-07／08 | 普通 PASS：共用 Contact／Quotation 14 business 案例、選項／面議／年度、blocked storage／fallback、跨 style／返回／個資清除／原 key IDs；首輪與局部重驗及版本橋接。Pages PASS：全 262 項 suite Exit 0，其中 165 layouts、58 axe scans（0 violations／incomplete）、14 business 案例與跨 style 測項全部完成 |
| DC4-09 | 普通 PASS：實際 Modern／Heritage 最壞 17 加購、40／60 字 A4，兩份各 14 斷言、單頁界內，兩 QR 在 150／300 DPI 解碼；Pages PDF 亦各 14 斷言、單頁／QR PASS（各 Exit 0） |
| DC4-10 | 普通 PASS：19 個來源色彩對比及 v3 實際 12 狀態、144 role 觀測、34 samples；disabled 可讀性門檻為自願要求。Pages theme 12／144／34 全 PASS（Exit 0） |
| DC4-11 | PASS：實際 Pages 17 PNG 逐張檢視；四份真 PDF 各 14 個斷言通過，150／300 DPI 兩 QR 可解碼。四份 150 DPI render bytes 相同，另有實際畫面 bridge 與本輪 Pages 原圖檢視；前輪品牌原型不替代網站截圖 |
| DC4-12 | PASS：最後 source／固定工程檔／格式／Markdown／兩 manifest／receipt-log SHA／secret 檢查；初版僅一個報告連結漏加 `.gz`，修正後重驗，回執另存 |
| DC4-13 | Commit／Push／PR 精確 head CI 與 artifact 待遠端實際結果；合併／部署不適用本次授權 |
| DC4-14 | N/A：沒有新 dialog／portal 互動，僅提供 scope 容器；不捏造互動驗收 |
| DC4-15 | Optional PENDING：真機、Safari、完整真人讀屏及 field CWV 未執行 |

普通 production 的兩項 HTTP N/A 僅限 Next 私有 error shell 的原始 SSR frame 判定，已另驗真 404、無私有 payload 與實際 client frame；不是將錯誤頁整體排除。

## 原始失敗、修正與重驗

1. **內容與 a11y**：原 parity review 的 Services guide 遺漏為 FAIL；提取既有文案／兩分類連結至 `servicesPage.websiteGuide`，Modern HTML 保持相同，Heritage 改讀同源。六品牌來源連結的可見 URL 未包含在 aria-label，造成 18 個 axe label-content-name-mismatch；現在完整 URL 為名稱開頭。受影響掃描及真實導覽重驗完成。
2. **disabled 樣式**：v2 實際 theme suite 12 案中 2 案 FAIL，因 variant specificity 高於 disabled 規則；只修 screen 對應 recipe。v3 theme 全 12 案 PASS；不變更 A4 或 Modern。
3. **Pages 驗證工具**：builder 首輪 Exit 1、HTTP 首輪 2328 PASS／1 FAIL，皆是 Gallery Heritage 單尾斜線比較。builder helper 3 正例／14 負例、smoke helper 4 正例／15 負例通過；僅容許精確核定非根頁的單尾斜線，query／hash／外站／雙斜線／未核准 style 仍拒絕。新回執另存，未覆寫原失敗。
4. **版本橋接**：第一份較寬的 RSC bytes bridge 為 FAIL。縮小且明訂界線的 v2 bridge 才通過：142 runtime raw 相同、26 頁完整 HTML 僅實際 Build ID 不同；六品牌僅證明指定 aria-label 外的 SSR markup 相同，RSC 分段／bytes 不相同，另有新 hydration／axe。Services 獨立重驗。v2→v3 五 CSS 中四份 raw 相同；移除精確 old／new disabled screen rule 後第五份其餘 bytes 相同，因此保留未受影響 print／geometry 結果，不把 fingerprint 當功能判斷。
5. **普通網路觀測**：原 262 項完整 suite Exit 1，19 個測項失敗（18 URL label 與最終網路 gate），當時 27 個資源取消保留未解釋。後續 affected suite 雖 34 個功能測項 PASS，仍因最終網路 gate 為 Exit 1；不可稱整套通過。移除工具主動全域 route／cache 干預後的 passive probe 15 案有 4 案／9 個 script 取消，各自同案、同 URL、current loader 200、body SHA／bytes、connected script、native load 與 ResourceTiming 證據足以確認可用；原 probe FAIL 保留，沒有通用取消白名單。Services→Portfolio 的兩張 lazy 圖另經實際 Enter／捲動／解碼與原圖 body SHA 驗證，Exit 0；該新程序未重現取消，不能證實先前取消原因。
6. **交付格式**：最後 Markdown 初版漏加壓縮覆核文件的 `.gz`，修正後通過；staged Diff 發現原 build log 的 CR 進度列／lint 空白 EOF，改以 gzip 保留原 bytes 及 receipt SHA，沒有修剪原始紀錄。定向檢查及封存驗證重跑。離線 checker import 產生的 Python cache 已移除；封存工具負向 ZIP fixture 明確留在暫存測試目錄，原結果及位置／SHA 保留。初版封存的 self-test PENDING 另存歷史，完成回執放 `artifact-selftest-final/`，未覆寫成 PASS。
7. **server／工具**：曾以外層 wrapper 終止推定 server 停止，後續 EADDRINUSE 證實實際 npm 仍在；已核對專屬 process group 終止後重新啟動正確 production server。沒有 browser 驗收與 build 同時覆寫工作區。工具 helper 初版缺少注入 deployment fixture 的 FAIL 及修正版 PASS 保留，沒有靠改 App 迎合工具。

[獨立覆核](dc004-artifacts/independent-review.md.gz) 只確認來源與指定 bridge／資源證據範圍，不冒充重跑整站。其 Pages 尚待修正敘述為當時快照，後續依新版回執更新本表。正常模式採分段判讀；舊取消記錄的精確原因仍屬觀測限制，沒有宣稱全部舊 27 筆均證明無害。

## 檔案與預覽

- 新增 `src/app/(collection)/design-collection/[style]/` 的 layout、七主頁入口及兩種 detail route family，共輸出 16 頁。
- 新增 `src/design-systems/heritage/` 及 `src/components/design-collection/heritage/`：tokens、scoped CSS、Frame、原生 disclosure navigation、內容頁／詳頁、Contact／Quotation adapters 與 href／metadata helpers。
- 修改 registry／SEO、Gallery、Modern Footer、共用 Contact／Quotation／print、原服務 guide 的共用資料、Pages／smoke／獨立 fixture 及 route／metadata tests。
- 更新 README／AGENTS／設計／任務／Roadmap／報告索引及決策；新增核准紀錄、本次規格、本報告、實際證據與截圖。沒有修改公司 Repository、dependencies、lockfile、Next.js 設定或 Actions workflow。

預覽：`npm ci` → `npm run build` → `npm run start`，瀏覽 `/design-collection/heritage/`。Pages 另以 `npm run build:pages` 產出 `out/`，用靜態 server 預覽。原型 HTML 僅為歷史審閱稿，不輸出到網站。

## Git、PR 與發布

同一分支、同一 [PR #40](https://github.com/xk2022/xk-website/pull/40) 交付完整功能，精確 head CI／實際 artifact 後續更新 PR Description，避免為記錄自身 SHA 製造循環提交。PR CI、人工 review、合併、main CI、Pages 部署及公開網址驗證各自分開。

本輪沒有自動合併／部署授權；main 仍為 DC-003 的正式 17 頁。未宣稱正式網站已提供 Heritage 33 頁，不變更 DNS／Pages Source／Custom Domain。

## 未完成與限制

本機功能、畫面與文件驗收已完成；遠端階段依 PR 實際進度。Luxury／完整三向 Switcher／最終 DC-007 審核屬後續工作包；真機／Safari／完整真人讀屏及 field CWV 未宣稱通過。法律政策、價格、索引及站內直接收件仍依既有獨立核准門檻。本次品牌核准不擴張這些權限。
