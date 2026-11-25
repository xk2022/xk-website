# XK-ESTIMATOR V1 實作與驗證報告

日期：2026-11-25。分支：`feature/quotation-estimator`。本機開發、驗收與證據已完成；交付 Draft PR，等待人工驗收與價格審閱，**不合併、不部署**。遠端實際 head／PR／CI 結果後續更新於同一 PR Description，未發生的階段不寫成完成。

## 版本、來源與差異

Website 基準：`main@eaadead716f9a277b93aedc10e6fe234f1cc813a`，建立分支前乾淨。執行 [功能規格](../task/quotation-estimator-v1.md)、Repository AGENTS 與 [協作流程](../subagent-workflow.md)。公司 Repository 僅讀最新 main 固定版本 `5be640ab11811b24706101ea13db73185e9ce4d8`，不修改、Commit 或 Push 公司文件。

公司根 `AGENTS.md` 回應 404，完整 recursive tree 無同名檔案。正式路徑已移至 `doc/01_company`、`02_services`、`03_brand`、`04_engineering`、`05_projects`；舊 Week 02 只在 archive。依實際 tree 讀取公司／服務／收費／品牌／工程／網站及部署文件；來源自身部分英譯相對連結失效，不假定檔案存在。十二份核心公司、服務及產品文件的固定 Blob／章節清冊見 [來源清冊](quotation-estimator-artifacts/company-source-inventory.json)；採用來源與逐項價格記於 [集中設定](../../src/config/quotation.ts) 的 `quotationSources`／`quotationSourceDifferences`，未提交完整公司文件、內部時薪或營收模型。

| 本輪指示／暫定內容 | 依正式來源採用 |
| --- | --- |
| CORP 可為管理平台，AI 分類 | CORP 是企業形象網站，管理平台為 APP；五種正式產品碼 LP／BRAND／CORP／SHOP／APP，AI 為服務方向 |
| LP 8,000–25,000、企業 30,000–80,000 | 公司建議參考 LP 15,000–30,000、CORP 30,000–60,000；不是已核准公開價格 |
| 通用 AI 範圍 | Chatbot、RAG、客製 AI 各依其來源範圍，APP 與系統優化保留起價／未知上限 |
| 多語、SEO、Analytics、任意後台暫定表 | 對應公司建議參考；CMS 限內容管理，不替代任何業務後台 |
| 年度網站維護暫定金額 | 公司文件為月費／不同支援範圍，不自行乘 12；網域、主機、年度維護均待評估 |
| 既有八色 token 表 | 新頁範圍採正式 Midnight #101828、Blue #2563EB、Cyan #06B6D4、Surface #F8FAFC、Foreground #334155、Muted #64748B、Border #E2E8F0 與白背景；保留舊頁 token |
| 全部項目可視為確認價目 | 區分公司建議／本輪暫定／面議，公開前仍待 Owner 審閱；BRAND／SHOP 無相符正式區間時僅採本輪暫定 |

正式 Logo 03 horizontal Blob `e1a52e7e30c943df03a5805d06754204fa4ce484` 與既有原檔一致，直接重用；新頁標示 XK SYSTEM，不推論法定公司改名、不替換全站識別。APP 免費 DEMO 部署規範不授權切換本官網平台；保留 GitHub Pages。

## 實作結果

`/quotation` 有八個區塊、四服務類型、九建置方向、17 個附加項目與三種需求程度。原生 radio／checkbox 配合 label、fieldset、已選文字、勾號、青色標記、淺藍背景與藍框；選項切換清除不相容內容。需求程度只作討論標記，不套價格倍率。

型別與純計算分離：`range` 加總上下界、`from` 保留未知上限、`quote` 不轉為零。一次性、年度及第三方支出分開；已知下界不偽裝完整總價。內含項目支援不重計，但正式內含矩陣未定稿，正式資料保持空清單，以獨立合成案例測演算法。

`xk:quotation:v1` 只保存版本與服務／建置／附加／需求程度 ID。客戶稱呼最多 40 字、專案名稱最多 60 字，僅在頁內記憶體；不進 LocalStorage、URL、QR、HTTP 或 log。重新整理復原選項，個人欄位清空；格式錯誤、未知 ID／版本、封鎖儲存皆安全降級，重設只刪除自己的 key。

A4 以三欄附加項目、兩組費用欄位顯示全部適用項目及勾選狀態，非正式報價。重用 Logo、固定官網及作品集 QR，圖片 eager 載入以保障直接列印。支援原生列印／瀏覽器另存 PDF；最壞情境兩模式皆為一頁 A4，未裁切、隱藏項目或降低字級取得單頁。

CTA 沿用已確認商務 Email／Contact／Portfolio；完整摘要可真實複製，Clipboard 被拒時 focus 並選取完整文字供手動複製。郵件 URI 不包含選填個人欄位；長摘要使用 Contact 管道與完整複製，測試攔截郵件預設動作，沒有真正寄信或宣稱送達。沒有收件 API、訂單、付款、後端、資料庫、登入、Analytics 或新 npm dependencies。

Services 新增「立即試算方案」；Footer 目錄加入新頁。Metadata 使用既有工具、www Canonical／OG、noindex/nofollow。一般 Next.js build 與空 Base Path 靜態 export 保留，Sitemap／Privacy 草案／dev 仍公開 404。既有正式服務價格、Showcase 狀態、設計及 Contact 草稿流程保留。

## 環境與版本邊界

- Linux x86_64／glibc 2.41、Node.js 24.22.1、npm 11.9.0；Next.js 16.4.6、React 19.3.1、TypeScript 5.9.3、Tailwind CSS 4.3.3。
- Headless Chromium 156.0.8078.79，Playwright／axe 僅使用既有暫存驗收工具，不加入 app 依賴。瀏覽器 viewport 高 1000px，寬 320／375／768／1440／1920，Reduced Motion；一般 3210、Pages 3211，先停止一般 server 再建置 Pages。
- 最終程式／腳本／資產／workflow 154 檔指紋：`49b659d192418b919a8af0521d0ec04ff5718a14294643db0e396c96cde7556b`。JSON manifest 的檔案 SHA 是 `dac684654ccc9f9c09bf6d268859366c9a4bcdb6e47a475c468ab7b34580d979`，兩者用途不同。
- 一般完整瀏覽器版本 `1f7e1b75c3d28b46ad11f437ec0c41a113fb36ea302e454eb6631867c1379e0d` 到最終版只改 A4 上下 padding，由 4.76cqw 改 3cqw，左右、字級、24mm QR 與全部內容不變。依影響重跑一般 build＋最壞情境 PDF；Pages 全套在最終版本新跑。計算／儲存／詢價邏輯、TypeScript 檔與依賴未隨此 CSS 改動，沿用其已完成檢查，不重跑無關案例。
- `source-bridge.json` 保存各次 manifest 與 suite 起始 SHA 的一致性。文件／報告完成不影響 runtime 的負向 Tailwind source 已設定，後續以精確 PR head artifact 再核對。

## 實際驗收與證據

每個 runner receipt 保存 UTC 起訖、OS 實際 returnCode／exitCode、命令、log SHA；瀏覽器／smoke 另有 Test ID、預期／實際、環境與完成標記。以下證據路徑均相對於 [原始證據封存](quotation-estimator-artifacts/evidence.json.gz) 的 `files`；不能只靠子程序 Exit 0 推定未完成 assertions 通過。

| ID | 實際命令／操作 | 預期 | 實際結果與真 exit | 證據 |
| --- | --- | --- | --- | --- |
| Q-01 | `npm ci --cache /tmp/xk-npm-cache` | 鎖檔安裝 | PASS，616 packages，Exit 0，lockfile 不變 | checks/npm-ci.json／log |
| Q-02 | `npx tsc --noEmit` | strict TS 無錯 | PASS，Exit 0 | checks/tsc-final.json／log |
| Q-03 | `npm run lint` | 無錯／警告 | PASS，Exit 0 | checks/lint-final.json／log |
| Q-04 | `npm test` | 獨立計算／保存與既有 Contact 回歸 | PASS，32 計算＋14 保存／摘要＋26 Contact＝72 項，Exit 0 | checks/test.json／log |
| Q-05 | `npm run build` | 正常 production | PASS，最終建置 Exit 0，包含 /quotation | checks/build-print-final.json／log |
| Q-06 | 一般 `npm run test:smoke -- --base-url http://127.0.0.1:3210/ …` | 全公開頁與 guard | PASS，910／910，16 路由，Exit 0 | checks/normal-smoke-v3.json、normal-smoke-v3.json |
| Q-07 | 一般 browser focused suite | 五寬、互動、計算、儲存、鍵盤、axe | PASS，29／29，6 axe 零違規／零 incomplete，Exit 0；PDF 實體判定另列 | checks/normal-browser-v3.json、qa/normal-v3/result.json |
| Q-08 | 一般跨頁 SPA regression | 舊頁不受新 CSS 污染 | PASS，12／12、8 layouts、22 圖片 decoded，Exit 0 | qa/cross-page-normal.receipt.json、qa/cross-page-normal.json |
| Q-09 | 最終一般實際 PDF＋fitz／ZXing | 最長輸入／全部加購仍為 A4 單頁 | PASS，1 頁、203 text spans 全在頁內，40／60 字與18項完整，13 checks，Exit 0 | checks/normal-print-final.json、qr/normal-print-final-receipt.json、qr/normal-print-final/verification.json |
| Q-10 | `npm run build:pages` | 完整靜態與保護守門 | PASS，Exit 0，精確 16 HTML 清冊、無草案／dev／API，空 Base Path | checks/build-pages.json／log |
| Q-11 | Pages `npm run test:smoke -- --base-url http://127.0.0.1:3211/ …` | 路由／資源／SEO／404 | PASS，910／910，Exit 0 | checks/pages-smoke.json、pages-smoke.json |
| Q-12 | Pages browser focused suite | 最終版本五寬與全部互動 | PASS，30／30、6 axe 零違規／零 incomplete，四張真截圖、真 PDF，Exit 0 | checks/pages-browser.json、qa/pages-v2/result.json |
| Q-13 | Pages 跨頁 SPA regression | 原頁、Contact、手機選單 | PASS，12／12、8 layouts、22 圖 decoded，Exit 0 | qa/cross-page-pages.receipt.json、qa/cross-page-pages.json |
| Q-14 | Pages PDF＋fitz／ZXing | A4 單頁／全內容／兩 QR | PASS，1 頁、203 spans、13 checks，Exit 0；兩模式150／300dpi圖 byte-identical，各自實看 | qr/pages-final-receipt.json、qr/pages-final/verification.json |
| Q-15 | 全九 build 的 serviceLink／showcase HTTP／fragment | 有效連結，無虛構 showcase | PASS，18 欄位、12 個非 null 目標 200、服務錨點存在，Exit 0 | ui/links-retry1-receipt.json、ui/links.json |
| Q-16 | 原生 HTML parser 正負 fixtures／guard 回歸 | 新頁例外不放寬其他頁 | PASS，71 quotation cases、82 source checks、43 舊 guards | quotation-validator-fixtures-v1.json、quotation-prior-guards-v1.json |
| Q-17 | 人工視覺檢查／Markdown／Diff | 真截圖、可讀／無裁切、連結與乾淨提交 | PASS，10 張實看、0 阻擋；文件連結／格式、lockfile、提交範圍檢查通過 | ui/visual-review.json、delivery-check.json |
| Q-18 | 精確 PR head CI／artifact | 品質與靜態 artifact 一致 | PENDING，於同 PR 更新實際 run／結果；部署必須 skipped | PR Checks／Description |

實測計算包含 LP＋多語＋Analytics＝26,000–58,000；增加年度網域不改一次性合計，年費保持待估；APP＋金流＝88,000 起且上限未知；LP＋生圖＋品牌視覺為面議合計，已知至少16,500，不顯示虛構有限總價。九建置／四服務切換、複選、相容重設、三複雜度不改價、reload／壞資料／封鎖儲存、自己 key 重設、真 Clipboard readback／刻意拒絕 fallback 及原生 keyboard／focus 皆有逐項證據。

兩模式 Console／Runtime／PII／非預取資源錯誤為零。Pages focused 保留146筆、跨頁保留84筆已確認的 Next static export 預取／配對 HEAD 取消，詳列方法、headers、URL 與原因；不忽略一般資源 GET 或真正 4xx。HTTP smoke 另獨立確認 CSS／JS／圖片有效。讀取無 JS 初始 HTML、精確 Canonical／OG／robots/noindex、API 與未知路徑 404、draft payload 排除由 smoke 與 build guard 驗收。

正式資料的 included-feature UI 案例為 **N/A：尚無已核准內含矩陣**，未假造一個方案取得 UI PASS；內含免費／未知價不重計由 native 合成案例通過。真實手機、Safari／Firefox、實體印表機及完整 WCAG／真人讀屏審查不在本輪已完成環境，保持未測限制，不由 Chromium／axe 推定全面合規。

## 截圖與實際 PDF

| 內容 | 實際檔案 |
| --- | --- |
| 桌面初始 1440 | [desktop](../screenshots/quotation-estimator/quotation-desktop-1440.png) |
| 手機初始 375 | [mobile](../screenshots/quotation-estimator/quotation-mobile-375.png) |
| 桌面方案已選 | [selection](../screenshots/quotation-estimator/quotation-selection-1440.png) |
| 手機服務原尺寸 | [service radio](../screenshots/quotation-estimator/service-radio-375.png) |
| 手機建置原尺寸 | [selected build](../screenshots/quotation-estimator/selected-build-375.png) |
| 手機附加原尺寸 | [selected addons](../screenshots/quotation-estimator/selected-addon-375.png) |
| 手機結果原尺寸 | [selected results](../screenshots/quotation-estimator/selected-results-375.png) |
| 桌面附加原尺寸 | [desktop addons](../screenshots/quotation-estimator/selected-addon-1440.png) |
| 真實 print media 預覽 | [print preview](../screenshots/quotation-estimator/quotation-print-preview.png) |
| 實際 PDF 150dpi | [A4 render](../screenshots/quotation-estimator/quotation-a4-150dpi.png) |
| 一般最壞情境 A4 | [normal PDF](quotation-estimator-artifacts/normal-worstcase-a4.pdf) |
| Pages 最壞情境 A4 | [Pages PDF](quotation-estimator-artifacts/pages-worstcase-a4.pdf) |

PDF MediaBox 為209.889×297.011mm（Chromium A4 四捨五入），保持直式，未設定 scale、裁切或刪除內容。QR 實際解碼網址為 `https://www.xplorekaleidoscope.com/` 與 `https://www.xplorekaleidoscope.com/portfolio/`。圖、PDF 的 bytes／SHA 見 [media manifest](quotation-estimator-artifacts/media-manifest.json)。

## 原始失敗、修正及重驗

| 發現 | 原始結果 | 處理與重新驗收 |
| --- | --- | --- |
| readonly tuple 聯集的 includes 參數推斷過窄 | TypeScript Exit 2，checks/preflight-tsc | 改 some 比對 ID；後續 strict TS／lint／兩 build 通過 |
| 既有 Turbopack `*.css` loader 沒有 CSS Module 類別 exports | 首輪6個 axe 對比 FAIL；試算 scoped tokens／A4 class 未生效 | 改路由引入、quotation-前綴 CSS，保留原 pipeline；選中卡片說明使用 foreground。後續兩模式6 axe各零違規 |
| 初輪 lazy QR decode 無界等待 | 原 suite PDF 階段未完成，主動終止 runner Exit143 | A4 三圖 eager；工具加前景／字型／圖片／真 PDF 30秒界限；保留原中止，不冒稱完成 |
| 最壞情境 A4 超出單頁 | v2／v3 真 PDF 各2頁；focused 的 PDF 已寫出 PASS 不代表實體頁數 PASS | 三欄 addons＋兩組費用欄保留全內容，再調上下 padding。最終一般／Pages各1頁，原失敗 PDF保留於同 evidence 目錄 |
| Link checker 的 loopback 被 sandbox 擋 | ui/links-receipt Exit1，非實際網站404 | 僅追加工具 network 權限後同檢查 Exit0，原 FAIL 保留 |
| QR text reader sort=True 將兩欄文字混讀 | 最初工具誤判長名字未全 | 保留診斷；用 content-order spans 確認40／60字完整，不改 PDF 偽造 PASS |
| Root 重複啟動已完成跨頁檔案 | checks/cross-page-normal Exit1，Do not overwrite guard | 未動頁面、未覆寫證據，採原 owner 已完成真 runner Exit0；後續不重複啟動 |

失敗與重試均未改成 PASS。原 [v2 兩頁 PDF](quotation-estimator-artifacts/failed-normal-v2-two-pages.pdf) 與 [v3 兩頁 PDF](quotation-estimator-artifacts/failed-normal-v3-two-pages.pdf) 保留。依實際影響重驗；純報告／遠端識別碼只檢查文件，不觸發無關網站重跑。

## 新增及修改檔案

- `.github/workflows/ci.yml`
- `AGENTS.md`
- `README.md`
- `docs/implementation-notes.md`
- `docs/reports/quotation-estimator-artifacts/company-source-inventory.json`
- `docs/reports/quotation-estimator-artifacts/delivery-check.json`
- `docs/reports/quotation-estimator-artifacts/evidence-manifest.json`
- `docs/reports/quotation-estimator-artifacts/evidence.json.gz`
- `docs/reports/quotation-estimator-artifacts/failed-normal-v2-two-pages.pdf`
- `docs/reports/quotation-estimator-artifacts/failed-normal-v3-two-pages.pdf`
- `docs/reports/quotation-estimator-artifacts/local-pages-assets.json`
- `docs/reports/quotation-estimator-artifacts/media-manifest.json`
- `docs/reports/quotation-estimator-artifacts/normal-worstcase-a4.pdf`
- `docs/reports/quotation-estimator-artifacts/pages-worstcase-a4.pdf`
- `docs/reports/quotation-estimator-v1.md`
- `docs/screenshots/quotation-estimator/quotation-a4-150dpi.png`
- `docs/screenshots/quotation-estimator/quotation-desktop-1440.png`
- `docs/screenshots/quotation-estimator/quotation-mobile-375.png`
- `docs/screenshots/quotation-estimator/quotation-print-preview.png`
- `docs/screenshots/quotation-estimator/quotation-selection-1440.png`
- `docs/screenshots/quotation-estimator/selected-addon-1440.png`
- `docs/screenshots/quotation-estimator/selected-addon-375.png`
- `docs/screenshots/quotation-estimator/selected-build-375.png`
- `docs/screenshots/quotation-estimator/selected-results-375.png`
- `docs/screenshots/quotation-estimator/service-radio-375.png`
- `docs/task/README.md`
- `docs/task/quotation-estimator-v1.md`
- `docs/website-smoke.md`
- `package.json`
- `public/images/quotation/portfolio-qr.svg`
- `public/images/quotation/website-qr.svg`
- `scripts/build-github-pages.mjs`
- `scripts/fixtures/quotation-contract.json`
- `scripts/smoke-website.py`
- `scripts/test-quotation-storage.mjs`
- `scripts/test-quotation.mjs`
- `src/app/globals.css`
- `src/app/quotation/page.tsx`
- `src/components/layout/site-footer.tsx`
- `src/components/sections/quotation/quotation-estimator.tsx`
- `src/components/sections/quotation/quotation-summary.tsx`
- `src/components/sections/quotation/quotation.css`
- `src/components/sections/services/services-hero.tsx`
- `src/config/navigation.ts`
- `src/config/quotation.ts`
- `src/config/seo.ts`
- `src/lib/quotation/calculation.ts`
- `src/lib/quotation/inquiry.ts`
- `src/lib/quotation/storage.ts`
- `src/lib/quotation/types.ts`

未修改 package-lock.json、套件版本、公司 Repository、DNS／Custom Domain／Pages Source 或既有正式服務價格；不提交 .next／out／依賴／暫存／機密。完整原始證據以最小 JSON gzip 封存，未納入來源公司全文或重複大型 raster。

## 本機預覽與人工待辦

```sh
npm ci
npm run dev
# http://localhost:3000/quotation
npm run test:quotation
```

production 預覽先 `npm run build`，再 `npm run start -- --hostname 127.0.0.1 --port 3210`。停止後才能 `npm run build:pages`，以 `python3 -m http.server 3211 --bind 127.0.0.1 --directory out` 預覽根路徑；不得把尚未審閱分支部署到公開站點。

Owner 待確認：所有建議／暫定價格能否公開、BRAND／SHOP 與未定加購範圍、年度服務與內含矩陣、缺少的同類 Showcase。沒有正式 multiplier 或年度價格就保持現狀；公司缺 AGENTS.md 及來源相對連結問題只記錄、不修改其他 Repository。

本輪交付為人工審閱版本。Draft PR CI 可完成技術驗收，但不等於人工核准、法律核准、正式價格、信件收件或部署成功。merge、main CI、部署與新公開網址驗證均 **PENDING 人工驗收與後續明確指示**。
