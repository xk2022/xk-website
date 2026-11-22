# XK Website 問題清單與 Bugfix 待辦 — 2026-11-22

## 1. 記錄資訊

- 建立日期：2026-11-22。
- 最後更新：2026-11-22；日期均以 Asia/Taipei（UTC+08:00）為準。
- 盤點基準：`xk2022/xk-website`，`main@f2c8091c75980f240427066e368c41fc3d932efc`。
- 公開網站：<https://xk2022.github.io/xk-website/>。
- 初次盤點來源：同日官網問題盤點、當時九個公開頁面的 HTTP／文字內容、程式碼與相關展示來源檢查；初次建檔未執行新的建置、視覺、效能或完整無障礙驗收。後續實作的實際驗收範圍與結果見 [本輪實作報告](../reports/bf009-016-implementation.md)。
- 初次建檔交付（歷史紀錄）：整理問題、證據與索引，當時未修復網站。使用者後續已明確授權執行本清單並 Push／Merge；實際進度以末節更新紀錄及本輪報告為準。
- 沿用 [AGENTS.md](../../AGENTS.md) 與 [Subagent 工作流程](../subagent-workflow.md)。既有 `bugfix001.md` 至 `bugfix008.md` 與歷史實作報告保留，本清單接續使用 BF-009～BF-016。

以下狀態代表「後續修復／改善進度」，不是問題是否已被記錄。第 2 節的問題描述與第 3 節逐項證據保留初次盤點快照；現行狀態以第 5 節更新紀錄及實作報告為準。檔案建立不等於修復或驗收通過。HTTP 狀態為 2026-11-22 的觀測快照，後續執行前必須重新確認。

## 2. 問題總覽

| ID | 優先度 | 類型 | 初次盤點問題／改善項目 | 目前狀態 | 初次建議分支 |
| --- | --- | --- | --- | --- | --- |
| BF-009 | 高 | 品牌文案修正 | About／Solutions 仍有「一人全職」對外描述 | PASS | `bugfix/009-brand-copy` |
| BF-010 | 高 | 營運資料待確認 | 聯絡頁尚無可公開且可接收詢問的管道 | BLOCKED | `bugfix/010-contact-entry` |
| BF-011 | 高 | 展示狀態同步 | 千剛來源已可瀏覽，官網仍維持準備中 | PASS | `bugfix/011-qiangang-showcase` |
| BF-012 | 中 | 外部展示品質 | Demo 002 背景與 Demo 003 Logo 素材仍回應 404 | PASS（官網側） | `bugfix/012-demo-asset-quality` |
| BF-013 | 中 | 資訊架構改善 | 作品類型辨識與長頁瀏覽層級可改善 | PASS | `bugfix/013-portfolio-classification` |
| BF-014 | 中 | 內容功能完善 | 可瀏覽品牌展示缺少完整站內案例介紹 | PASS | `bugfix/014-case-detail-pages` |
| BF-015 | 正式推廣前 | 發布前置待辦 | 索引、正式網址與 Privacy 發布條件尚未完成 | BLOCKED | `bugfix/015-publication-readiness` |
| BF-016 | 後續維護 | 工程維護改善 | 展示設定分散與瀏覽器 smoke 缺少共用入口 | PASS | `bugfix/016-showcase-maintenance` |

本輪依使用者後續指示合併於 `bugfix/009-016-website-refinements` 執行；官網側六項 PASS，BF-010／BF-015 因真實資料或核准尚缺而 BLOCKED。外部來源素材未修補，遠端 CI、合併與部署結果依實作報告及同一 PR 的實際事件分開記錄。

## 3. 逐項紀錄

### BF-009：品牌文案仍強調一人全職

- **現況與影響**：使用者先前要求刪除或優化使人感覺只有一人負責的文案，但公開版仍存在，品牌呈現尚未符合該方向。
- **證據**：[About](https://xk2022.github.io/xk-website/about/) 顯示「XK 目前由創辦人一人全職經營」；[Solutions](https://xk2022.github.io/xk-website/solutions/) 顯示「由一人全職技術品牌直接討論需求」。程式來源為 [about.ts](../../src/config/about.ts) 的 `whoWeAre.operatingModel`、[solutions.ts](../../src/config/solutions.ts) 的「直接技術溝通」。
- **建議處理**：改為中性、專業的服務及合作描述，例如「透過直接的技術溝通，釐清需求並推進實作」。全站盤點相似對外文字，區分公開文案與內部來源註記。
- **界線／依賴**：不以虛構多人團隊、職稱、規模或交付能力取代原文；不改寫歷史報告或來源文件的營運事實。
- **驗收條件**：受影響頁面的實際可見 HTML 不再出現相關人數強調；繁體中文語意與服務內容一致，無不實團隊宣稱；完成文案變更所需的版面與可及性回歸。

### BF-010：聯絡入口尚無可用接洽管道

- **現況與影響**：[聯絡頁](https://xk2022.github.io/xk-website/contact/) 顯示「正式聯絡管道確認中」；訪客瀏覽服務或作品後仍無已確認的詢問出口。
- **證據**：[contact.ts](../../src/config/contact.ts) 的 `verifiedContactChannels` 為空陣列；[contact-page.ts](../../src/config/contact-page.ts) 依此呈現 unavailable 狀態。
- **建議處理**：取得使用者確認、可公開且實際可接收詢問的 Email 或 HTTPS 聯絡管道，實測可用性，再接入既有 Contact 設定並盤點全站 CTA。
- **界線／依賴**：缺少真實管道資料時記錄阻礙、保留目前狀態，不猜測信箱、電話或 LINE 帳號；不因本項新增 Backend、表單、追蹤或個資蒐集服務。不能由 CI 通過推論收件正常。
- **驗收條件**：記錄管道公開確認與實際可用證據；聯絡頁及相關 CTA 連到正確目的地，鍵盤名稱清楚；沒有未確認地址、假提交或無據回覆時效承諾。

### BF-011：千剛展示狀態可安排更新

- **現況與影響**：[門窗來源](https://xk2022.github.io/xk-showcase-qiangang-windows/) 在本次盤點已回應 HTTP 200，標題為「千剛實業｜桃園住宅換窗與大園看樣｜XK 提案展示」；官網仍顯示「門窗網站展示／準備中」。
- **證據**：[website-showcases.ts](../../src/config/website-showcases.ts) 中 `qiangang-windows` 仍為 `availability: "preparing"`，`href`／`image` 為 null。原處理原因及使用者選擇見 [品牌展示排序與新增紀錄](../reports/brand-showcase-order-implementation.md)。
- **建議處理**：後續明確執行本項時，重新確認來源 HTTP、內容、功能及展示性質；擷取真實預覽並驗收後，更新名稱、介紹、圖片及可操作的展示連結。
- **界線／依賴**：現行準備中是使用者先前明確確認的處理，不是原實作錯誤；本次記錄不自行解除。必須保留「提案展示」性質，不能改稱客戶委託成果。來源或素材仍有阻礙時繼續維持準備中並記錄原因。
- **驗收條件**：保持六筆核定順序；以目前來源核對名稱／功能，預覽真實且支援一般 build 與 Pages Base Path；可用時提供有效外連，未就緒時沒有失效按鈕或假圖；同步確認型別、Pages validator 與相關文件。

### BF-012：外部模板來源存在素材缺漏

- **現況與影響**：官網本地預覽可正常顯示，但部分外部範例的實際頁面仍有素材缺漏，訪客點開後可能影響專業印象。
- **證據**：本次檢查 [Demo 002 背景](https://xk2022.github.io/single-demo002/assets/assets/img/bg-masthead.jpg) 與 [Demo 003 Logo](https://xk2022.github.io/single-demo003/img/logo.png) 皆為 HTTP 404；[展示設定](../../src/config/website-showcases.ts) 已註明部分素材待補齊。既有完整來源限制見 [網站展示整合報告](../reports/website-showcases-implementation.md)。
- **建議處理**：先重現來源問題與正確資產路徑。網站 Repository 可更新可用性說明與展示優先度；修補原始素材則需另行明確指定來源 Repository 的任務。
- **界線／依賴**：本清單與一般官網 bugfix 預設僅修改 `xk-website`，不授權修改 `single-demo002`、`single-demo003` 或其他 Repository。不得補畫假畫面、隱藏錯誤或因縮圖正常就宣稱原站完整；保留第三方模板來源。
- **驗收條件**：清楚區分官網預覽、來源頁面與來源資產結果；宣稱素材已修復須有實際 HTTP／渲染證據，否則列 Known Issues 並如實呈現限制。

### BF-013：作品類型與瀏覽層級可改善

- **現況與影響**：[作品頁](https://xk2022.github.io/xk-website/portfolio/) 同頁包含六筆品牌展示（含準備中）、四個模板及三個技術規劃；自家服務推廣與品牌提案使用相同 `brand-demo` 類型，訪客需要較多閱讀才能辨識。
- **證據**：[展示設定](../../src/config/website-showcases.ts) 的 `kind`、[Gallery](../../src/components/sections/portfolio/website-showcase-gallery.tsx) 與 [Portfolio 頁](../../src/app/portfolio/page.tsx)。這是資訊架構改善，不是已確認的版面錯誤。
- **建議處理**：補足自製品牌提案／自家服務推廣／第三方模板／技術規劃的可見識別，評估分類入口、收合或次層導覽，優先讓訪客找到可瀏覽內容。
- **界線／依賴**：保留使用者核定的六品牌順序與既有有效錨點，不把第三方模板說成原創或把規劃改成完成；分類方式與改版範圍須在當次任務收斂，不提前新增大量路由或依賴。
- **驗收條件**：類型與狀態可辨識；六案順序、所有連結／錨點與手機導覽正常；新增互動可用鍵盤操作並有可見 Focus，Reduced Motion 行為合理。

### BF-014：重點品牌展示缺少站內完整介紹

- **現況與影響**：可瀏覽品牌展示主要由卡片連往外部網站；目前三個站內 Portfolio 詳頁對應的是 Planned 技術專案，未完整說明新品牌展示的需求情境、設計取捨與實作範圍。
- **證據**：[作品卡片](../../src/components/sections/portfolio/website-showcase-card.tsx)、[Portfolio 詳頁路由](../../src/app/portfolio/[slug]/page.tsx) 與 [技術專案資料](../../src/config/portfolio.ts)。
- **建議處理**：選定有足夠來源的重點作品，補上站內介紹：展示背景、使用情境、設計決策、已實作功能、實際技術、限制、相關服務及外部預覽。先收斂個案範圍與路由方案。
- **界線／依賴**：不可推升原三個 Planned 狀態，不能虛構客戶關係、訪談、成效數字或功能；沒有資料的欄位如實省略或標記。新路由須沿用靜態輸出及 protected SEO。
- **驗收條件**：內容可追溯、Demo／提案／Client 性質清楚；已實作與規劃分開；新增路由、靜態參數、Metadata、404、Base Path、相關導覽及響應式通過當次驗收。

### BF-015：正式發布前置條件待整理與確認

- **現況與影響**：公開頁面採 `noindex, nofollow`、`sitemap.xml` 為 404，Privacy 為未公開草案；正式推廣前需要獨立整理索引與政策發布條件。
- **證據**：[SEO 設定](../../src/config/seo.ts)、[SEO 產生規則](../../src/lib/seo.ts)、[Privacy 設定](../../src/config/privacy.ts)、[SEO 操作文件](../seo-operations.md)。Privacy 的資料處理主體、生效日與權利管道目前尚未確認。
- **建議處理**：分別列明正式網址／Canonical、索引開放與 Sitemap、Privacy 同版本核准及真實權利管道所需資訊，依實際具備的資料安排獨立發布工作。
- **界線／依賴**：目前保護符合既有決策，不是程式 bug。品牌網域在盤點環境遇到 Tunnel 403，無法據此認定網域或 DNS 故障。本清單不授權開放索引、發布草案、建立 GSC、加入 Analytics、切換 Pages Source、DNS 或 Custom Domain。
- **驗收條件**：前置資料與待確認事項可追蹤；資料未齊維持保護並記錄原因；真正發布需有當次明確指示與相符核准資料，分開驗證 HTML／HTTP、索引設定及實際公開網址。技術 CI 或 Merge 不代表政策核准。

### BF-016：展示設定與驗證入口可降低維護成本

- **現況與影響**：新增作品需要同步修改固定總數、核定順序、首頁精選與部分文案；瀏覽器工具主要封存在各輪報告附件，缺少可直接重跑的共用入口。
- **證據**：[Pages validator](../../scripts/build-github-pages.mjs)、[展示設定](../../src/config/website-showcases.ts)、[Gallery](../../src/components/sections/portfolio/website-showcase-gallery.tsx)、[package.json](../../package.json)、[驗收工具快照](../reports/brand-showcase-order-artifacts/acceptance.cjs.gz)。
- **建議處理**：集中展示資料與可用性設定，減少分散字串；整理一個範圍明確的 smoke 入口，涵蓋公開路由、保護狀態、作品連結、圖片及準備中狀態。保留獨立的核准順序／必要作品契約，避免驗證只重述實作而失去守門作用。
- **界線／依賴**：不為抽象化新增不必要套件或更改部署政策；不覆寫歷史測試。沿用一次必要基準與依影響重驗流程，不讓每次小改動都重跑所有歷史任務。
- **驗收條件**：新增一筆展示所需修改點與指令有清楚文件；smoke 可重現、真實失敗會回傳非零 exit；不降低既有型別、數量／順序、來源、路由及發布保護檢查，未執行的範圍不能標為 PASS。

## 4. 後續 Bugfix 分支作業方式

1. 先選定 ID 與範圍，讀本檔、`AGENTS.md`、`docs/subagent-workflow.md` 及該項引用的現行設定。依最新程式與來源重驗現況；已變動的證據要補記日期與版本。
2. 確認本清單版本已納入當次分支的文件基準。若文件分支尚未合併，先依當次指示處理文件交付，不遺漏或任意覆蓋本檔。功能分支以最新已合併 main 為基礎建立；建議名稱見總覽。
3. 本檔是問題追蹤入口。涉及新路由、互動或正式發布時，先完成該次可執行的範圍、資料契約、前置條件與驗收矩陣；不把本清單當成尚未確認功能的完整授權。
4. 各項可獨立執行；若當次明確要求合併處理多項，使用可審查的分支與變更集，記錄各 ID 的覆蓋、依賴與未完成事項。已授權的技術與 Git 動作不重複要求確認，缺少的真實聯絡／法律／網域資料則如實提出。
5. 依當次規格與實際影響選擇品質指令及回歸範圍，保留必要 production／Pages 驗證；跨 build 時先完成一般模式再做 Pages。不因單純文件變更重跑無關網站測試。
6. 提交前完成驗證文件，建議 `docs/reports/bf-009-implementation.md`（依 ID 替換），記命令、環境、預期／實際、退出碼、截圖或 HTTP 證據、失敗與重試；將本檔對應項目連到實際 Commit／PR。
7. Push、PR、Merge 與部署依使用者當次指示；不直接推 main。分開記錄本機、PR head CI、Review、授權合併、main CI、正式部署與公開驗證，不以 PR CI 取代部署證據。

後續指令示例：

> 請依 `docs/task/bugfix-backlog-2026-11-22.md` 執行 BF-009，建立 `bugfix/009-brand-copy`，遵循 AGENTS.md 與 Subagent 工作流程，完成修正及驗證文件；Git 交付依本次指示執行。

上述流程與指令示例於初次建檔時建立；該次交付僅含清單與索引。後續已依使用者指示執行八項，實際結果見下方更新紀錄及實作報告。

## 5. 狀態與更新紀錄

- `PENDING`：尚未執行修復／改善。
- `PASS`：當次約定的必要修復與驗收已實際完成；不自動代表已合併或部署。
- `FAIL`：已執行但未達驗收，保留原因、影響、修正及重試紀錄。
- `BLOCKED`：開始處理後因真實外部條件受阻，列明所需資料或權限。
- `N/A`：經當次判定不適用，必須附理由。

| 日期（Asia/Taipei） | 項目 | 紀錄 | 修復狀態 |
| --- | --- | --- | --- |
| 2026-11-22 | BF-009～BF-016 | 首次彙整官網盤點，共八項；建立證據、建議分支、界線與驗收條件；尚未開始功能修復 | 全部 PENDING |
| 2026-11-22 | BF-009、011～014、016 | 已依後續指示執行；官網側六項完成並通過本機／Pages 與人工覆核，外部來源素材修補未納入 | PASS（Git 與部署見報告／PR） |
| 2026-11-22 | BF-010 | 已查本輪文件 main 仍無收件管道，並詢問真實資料；沒有猜填或新增表單 | BLOCKED |
| 2026-11-22 | BF-015 | 已交付前置清單，缺少正式發布與法律資料，保護維持 | BLOCKED |

後續每次更新附日期、ID、實際變更、驗收／Commit／PR 連結與剩餘事項。不得因更新文字而覆蓋舊的失敗、核准或部署紀錄。

本輪完整範圍、退出回執、來源限制及部署證據入口見 [BF-009～BF-016 實作報告](../reports/bf009-016-implementation.md)。
