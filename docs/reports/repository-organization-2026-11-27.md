---
id: XK-DOC-0902
kind: document
title: 官網目錄整理與授權部署紀錄
status: reference
version: "1.0"
source: https://github.com/xk2022/xplore-kaleidoscope/blob/76252e621ecb5c508494b49d4cd1eabd340b7e81/06_engineering/website-project-readme-template.md
---

# 官網目錄整理與授權部署紀錄

日期：2026-11-27 UTC。分支 `test/design-collection-release`，沿用 [PR #45](https://github.com/xk2022/xk-website/pull/45)，起點 `075aaa0e4a382fbab442b85931269915c626ac37`／main base `ee4b4709a9f8daa755e2595a46c158b3c92d8229`。本次使用者明確要求「Merge and deploy」及依公司文件整理 folder／README；原 R01 階段禁止合併的限制由本次授權取代，既有失敗仍保留。

## 公司來源與適用範圍

公司最新 main 為 `76252e621ecb5c508494b49d4cd1eabd340b7e81`，本次完整核讀根 AGENTS、README、治理入口／文件政策／命名與 metadata／資料保護，以及工程、開發流程、測試發布、網站 README 範本、Repo 命名、官網與相關決議。公司庫唯讀，沒有修改或推送。

| 文件 | Blob／實際適用 |
| --- | --- |
| `AGENTS.md` | `a7ca443ddd1d1b847dc58152bbb56c1425c1b522`；保留歷史、查來源、限定個案庫 |
| `06_engineering/website-project-readme-template.md` | `1533e5eee24e9dd29aec8eccf2a79ee5436d98bb`；共用首層與專案資訊 |
| `06_engineering/website-repository-naming.md` | `071229140c529294546583de040fb573f67c6964`；Corporate Website、既有 Repo 不自動改名 |
| `06_engineering/testing-and-release.md` | `7b525804e46753e9b45432c4ba05f387a9b46f6f`；實測、發布版本與操作驗證 |
| `08_projects/official-website/overview.md` | `b48d240230283e062b37fabb1422b9fac2bc41a8`；官網的獨立專案邊界 |
| `10_decisions/2026-11-20.md` | `8cec402c3bf88592edcb2a8b20df7d6fcc58eb92`；舊 `frontend/website/` 是待確認規劃，本次採現行標準 `frontend/` |

不套用 APP 專用後端、Vite、資料庫、Docker 或 Showcase Hub 遷移。本庫為自有正式企業官網，既有 www／GitHub Pages 根路徑維持；既有名稱 `xk-website` 保留，沒有改 DNS、Pages Source、Custom Domain、業務內容、價格、索引或法律政策。

## 變更與保存

實際目錄／操作見 [Repository 結構](../03_engineering/repository-layout.md)，完整舊新對照見 [path map](../98_decisions/repository-path-map.json)。

- 前端 `src/`、`public/`、套件／鎖檔、Next／TypeScript／ESLint／shadcn 設定與前端 scripts／fixtures 移至 `frontend/`；335 檔中 334 檔逐 byte 相同，只有 `globals.css` 調整掃描及排除路徑。
- `.github/`、`.nvmrc`、跨元件 `scripts/` 與文件留在根；CI 同步更新 shell working-directory、cache lockfile、upload `.next/`／`out/` 路徑，部署條件、權限與固定 Action 版本不變。
- 保留 `backend/.gitkeep`、`infrastructure/.gitkeep`、`tests/e2e/.gitkeep`；沒有新增後端、基礎設施或 E2E npm 框架。
- README 依公司範本重寫，明列 CORP／production、用途、功能限制、工作區操作及維護資訊；工程索引修正為實際 49 頁，不再顯示舊 17 頁或未實作 Heritage／Luxury。
- 原始 Task、驗收 JSON／gzip、圖片與 manifest 不搬不改；只修可點擊的 Markdown 原始碼連結，歷史文字與原 PASS／FAIL 不改。335 檔前後 hash及連結修正清單另存證據。
- `scripts/validate-evidence-references.py` 優先核對原路徑，只有不存在才使用明確映射；逐筆驗 encoded／raw SHA及大小。實際883筆全 PASS（123直接、760映射，109個搬移字體目標），181個獨立檔案，0 missing／SHA mismatch。

來源指紋：340 檔 `a06cb04deb2dcd0e46afb8fbaae4d0d8312e4460b02d8047797e6d6e7e3d64f4`。文件／遠端事件後補不等於重新執行程式測試。

## main 同步與版本界線

合併前再次 `git fetch origin` 發現 main 已新增 [#48](https://github.com/xk2022/xk-website/pull/48)，最新 `76b76d4991f92011e42cc1eeb813f55c0d0df7e7`。此已核准變更將門窗作品改為虛構品牌「萬花筒塑鋼門窗」，更新圖片、文案與既有內容測試。必須保留並移入 `frontend/`，不可用本輪整理恢復舊資料。下列 `a06cb0…` 矩陣是純目錄搬移邊界；main 整合後另附來源及針對內容、建置、HTTP／瀏覽器的實際重驗，兩個時點不混用。

## 建置失敗與修正

初次 normal build 真 Exit1：為保留舊掃描範圍而設定 Repository-wide Tailwind base，超出新 Turbopack frontend root，出現 `docs/reports/README.md is outside configured roots`。第二次修正指令使用了錯誤相對 cwd，未修改來源便重建，原失敗／Exit1保留。改用絕對來源路徑，將掃描 base 明確限制於 `frontend/` 後，第三次 normal build 真 Exit0。未換套件或 loader，沒有關閉功能或驗收規則。

安裝、型別、ESLint、446 unit tests 已先在移動後的正確 workspace 完成，均真 Exit0；後續只改 CSS 掃描 base，不涉及這些 TypeScript／單元測試輸入。完整最終 head 另由 CI 重驗。原 R01 全部 cold FAIL／網路未知／AT缺口不由本次整理消除。

## 驗證矩陣

正式執行均由根 `scripts/run-with-evidence.py` 保存真 OS退出碼、命令、cwd、時間及 log SHA。前端命令 cwd 為 `frontend/`，工具版本沿用 Node24／原 lockfile／現有 Chromium；無新 npm dependency。表中 PENDING 不是 PASS。

| Test ID | 實際命令／範圍 | 結果與證據 |
| --- | --- | --- |
| ORG-INSTALL | `npm ci --cache /tmp/xk-npm-cache` | PASS，Exit0；quality/npm-ci.json |
| ORG-TYPE | `npx next typegen`、`npx tsc --noEmit` | PASS，兩者Exit0；quality/typegen.json、typescript.json |
| ORG-LINT | `npm run lint` | PASS，Exit0；quality/lint.json |
| ORG-UNIT | `npm test` | PASS，446；Exit0；quality/unit.json |
| ORG-NORMAL | `npm run build` | 首兩次FAIL／Exit1，v3 PASS／Exit0；quality/normal-build*.json/log |
| ORG-EVIDENCE | `python3 scripts/validate-evidence-references.py --repo . --output <fresh file>` | PASS，883/883；真Exit0；evidence-references.json／command |
| ORG-NORMAL-HTTP | frontend smoke，49 路由、內容、資產、links／anchors、SEO／404 | PASS，3274 PASS＋2 有理由 N/A，Exit 0；http-normal.json／command |
| ORG-NORMAL-UI | 三系列 Home／Contact／Quotation，375／1440、真錯誤／合法／編輯／重設、鍵盤、焦點及局部 axe | PASS，52 assertions、18 layouts、24 business、6 axe（0 violations／0 incomplete），Exit 0；qa/normal-final/result.json |
| ORG-PAGES | `npm run build:pages`，`frontend/out/` | PASS，Exit 0；quality/pages-build.json／log |
| ORG-PAGES-HTTP/UI | 與 normal 分模式重驗，實際匯出路徑與素材 | HTTP 3274 PASS／Exit 0；UI 51 PASS＋1 strict network FAIL／Exit 1；18 layouts、24 business、6 axe（0 violations／0 incomplete）完成；http-pages.json、qa/pages-final/result.json |
| ORG-OUTPUT | 與整理前 075aaa0 固定 Pages 輸出比對 | 原 strict 2941 PASS／3 FAIL、Exit 1；獨立有界 migration 比對 34／34 PASS、Exit 0，517 檔全比較；output-compatibility.json。原 FAIL 保留 |
| ORG-DOCS | Markdown／相對連結、335 搬移 byte 對照、raw 證據不變、產物隔離 | PASS，文件覆核 10 份／141 相對連結、無未解問題；repository-integrity 全部 24 項 PASS／Exit 0；document-review.json、repository-integrity.json |
| ORG-REMOTE | 精確PR head CI、合併、main CI／Pages與公開操作 | PENDING；實際事件更新同PR，避免自記SHA循環提交 |

本輪沒有新 UI、計算／print／QR 或性能策略；原版 PDF／QR 與效能證據只作同源對照，不能改稱本輪新 PDF 或新 Lighthouse。Pages 的 6 張 Home viewport（3 系列 × 375／1440）已實際開圖檢視，與本輪 Normal 對應 PNG 全部逐 byte 相同；此結果只涵蓋這些 viewport，並非舊版 CSS 或全頁像素相同。

證據索引與真命令回執見 [本輪封存](repository-organization-artifacts/manifest.json)。環境：Linux、Node.js 24.22.1、npm 11.9.0，Chromium 156.0.8078.79；瀏覽器高度 1000、DPR 1、Reduced Motion reduce、Asia/Taipei。未執行的外部連結／真人 AT 不由相對路徑檢查代替。

## 最新 main 整合驗收

整合基底為 `76b76d4991f92011e42cc1eeb813f55c0d0df7e7`（#48）。Git 的新增圖片目錄位置與舊圖片 rename/delete 衝突，只依 main 已核准內容處理：保留新圖片於 `frontend/public/`、刪除被取代舊圖片；新圖片、內容設定及單元測試三檔逐 byte 等同 main。沒有恢復先前真實公司名稱或改動已核准展示網址。

最終程式來源 340 檔：`d2c1c7b84c9c4a5e3c553458a6406af7300d7c09341d9cc9e26214b0e65d9569`，與純搬移矩陣分開保存。提交前額外發現 Python import 產生的快取曾被納入搬移快照，已在最終 tree 移除並補 `__pycache__/`／`*.py[cod]` ignore；首次來源清單斷言 Exit 1／隨後未生成工具 Exit 2 記於 integration/preflight-corrections.json，均不當作品質測試 PASS。未推送的本機整理提交在交付前整合為單一提交，保留既有 R01 head 與最新 main 為 parents，避免快取出現在此次 Push 的新增歷史；來源指紋及原始測試退出碼不改寫。

| 最終 Test ID | 實際結果 |
| --- | --- |
| ORG-FINAL-QUALITY | 重新 locked install／typegen／TypeScript／lint／446 unit／normal build 全部 PASS，真 Exit 0；integration/quality/ 各回執 |
| ORG-FINAL-NORMAL | HTTP 3274 PASS＋2 N/A／Exit 0。原 52 項操作為 48 PASS／4 FAIL／Exit 1；4 筆皆 CV 捲動後字體再次 loading，原件保留。24 business、6 axe（0 violations／0 incomplete）、鍵盤／風格切換與 strict network 均通過；以有界 fonts-ready 修正版只補驗 4 個失敗 layout＋原 strict gate，5 PASS／Exit 0，補回 2 張 Home1440 圖；原失敗不改寫 |
| ORG-FINAL-PAGES | build／HTTP 真 Exit 0，HTTP 3274 PASS；原 52 項為 51 PASS＋1 strict network FAIL／真 Exit 1，18 layouts、24 business、6 axe（0 violations／0 incomplete）完成。失敗為 1 筆 Luxury 試算頁 RSC prefetch `ERR_ABORTED`，原完成狀態 UNKNOWN；Console／Runtime／PII 皆 0 |
| ORG-FINAL-INTEGRITY | 18 項來源、main 內容、設定／lockfile、產物隔離、歷史 raw、diff 格式全 PASS／Exit 0；歷史引用 fresh 883／883 PASS／Exit 0；最新文件覆核 10 份／142 相對連結、0 未解問題／Exit 0；integration/integrity.json、evidence-references.json、document-review.json |

字體等待修正版只修工具的 race：同一 evaluate 內等待真 `document.fonts.ready` 與自然 layout／連續 frame 的 loaded 穩定，仍保留 45 秒 timeout；不下載未使用字體、不改 CSS、不放寬狀態或網路取消規則。原版與新版 SHA／差異皆封存。

最終本機靜態輸出對新來源固定基準的原 strict checker 為 2944／2944 PASS／真 Exit 0（49 公開 HTML、517 files、5 CSS／21 JS／116 fonts）；此新基準明確包含 main #48，與前面 075→純搬移的 34 項比較是不同工作。CI 產物之後要實際下載、核對 digest／head 與逐檔內容。

最終 6 個 Pages Home viewport 已逐張實際檢視，與整合後 Normal 原 4 圖＋補驗 2 圖逐 byte 相同；只代表所擷取 viewport 沒有可見退化。驗證／封存後再做文件與 staged tree 檢查，才 Push；精確 PR CI、合併、main 部署與公開實測仍於同 PR 記錄。

## 本輪差異與限制

- 舊版嚴格輸出 checker 實際 2941 PASS／3 FAIL、Exit 1，失敗全部涉及一個 CSS 檔名／內容及其全樹引用；原結果不改寫。調整 Tailwind 掃描根目錄後，不再由根文件意外產生 8 個未使用 utility，CSS 減少 682 bytes（49,929 → 49,247）。21 個 JavaScript、116 個字體及其他 runtime 檔案 bytes 保持相同。另做逐檔有界比對，明列 8 條規則及真正 Build ID／CSS 檔名映射，不把原 strict FAIL 改成 PASS。
- 本輪 Pages strict network FAIL 為 5 筆 `GET fetch` 的靜態 RSC prefetch 取消，均有精確匯出檔案及 prefetch headers；檔名含 `!`，未符合 frozen monitor 的原允許正規式。唯讀診斷只確認請求用途與檔案存在，取消原因／原完成狀態仍 UNKNOWN，不擴大允許規則重標 PASS。沒有觀察到 CSS／JS／圖片的 4xx、Console／Runtime 錯誤或個資外傳；這不代表全部 raw 請求零取消。
- 所有本輪原始 FAIL、真退出碼與限定重驗一併封存。

## 保留的 Known Issues 與交付界線

[R01 報告](dc007-r01-performance.md) 的三試算頁 TBT中位數235.073／246.120／210.042ms仍高於200，嚴格網路取消（含一筆圖片）原因未解，真人讀屏仍BLOCKED。網站已上線與完整DC-007驗收完成是不同事實。合併授權只允許本次程式與目錄發布，不核准新品牌、價格、法律政策、索引或其他產品。

[PR #45](https://github.com/xk2022/xk-website/pull/45) 留存實際最終head CI、artifact、merge SHA、main run／部署與公開網址驗證；PR綠色不能替代部署成功。此文件為提交前驗證快照，後續遠端事件以同PR紀錄為準。
