# 網站展示與範例整合實作報告

## 範圍與來源

本次以 main `614fb6dac0b170efd28f7441a6cf097a560d8f24` 建立 `feature/website-showcase-gallery`。使用者確認前輪網站盤點建議，授權修改內容、Push、PR、CI 通過後合併及確認部署。只修改網站 Repository，不修改文件或八個來源網站的 Repository。

- [Portfolio 策略](https://github.com/xk2022/xplore-kaleidoscope/blob/main/doc/01_business-plan/week-04/01_portfolio-strategy_XK%20%E6%8A%80%E8%A1%93%E4%BD%9C%E5%93%81%E5%B1%95%E7%A4%BA%E7%AD%96%E7%95%A5.md)：本次唯讀 latest main，Blob `98e69f79e65f3a599e32859cd574b437f6b86193`；依 W01 一頁式網站、Demo 與 Client 分別標示、實際畫面及可追溯來源原則實作。長期四大技術分類與六種網站類型仍屬來源規劃，本次三個瀏覽區塊是展示性質分組，不取代其長期分類。
- 使用者指定八個公開網站；精確 URL、擷取時間、實際標題、頁尾聲明與每張圖片 SHA256 見 [素材紀錄](website-showcases-artifacts/asset-manifest.json)。四品牌來源均有自製展示／作品集標示，部分詢問操作明示模擬，沒有據此宣稱客戶委託、實際收件或商業成效。
- 沿用 [AGENTS](../../AGENTS.md)、[Subagent 流程](../subagent-workflow.md)、既有 Portfolio／SEO／Pages 契約。閱讀 installed Next.js 16.4.6 Image 與 Static Exports 指南，使用 Server Components、明確圖片尺寸與靜態預覽。

## 實作內容

1. `/portfolio` 改為「作品展示」：依序提供品牌網站展示案例、網站模板範例與技術展示規劃，並新增三分類錨點導覽。四品牌、四模板各有真實預覽、用途、展示性質及可操作的外部連結。
2. 首頁 Services 之後加入餐飲／禮品／工業三個精選展示；Hero、Header／Mobile Navigation／Footer 共用入口名稱同步更新。
3. Services 網站分類後補充一頁式網站適用情境；Solutions 數位品牌方案加入兩個作品分類入口，原技術規劃仍保留。
4. 三個既有技術專案維持 Planned，沒有套用八個外站的圖片或進度；既有九個公開路由與三個詳頁維持原路徑。
5. 八張 1280×800 WebP 來自實際瀏覽器首屏，個別小於 150 KB、延遲載入並明定尺寸；一般 build 與 Pages 使用各自正確本地路徑，不嵌入外部網站或依賴遠端圖片服務。
6. 保留 Start Bootstrap Agency／Creative、TemplateMag GadgetLanding／FoodLanding 來源。外部連結具站名、另開分頁提示及安全 rel；內部連結使用既有 Next Link。
7. Portfolio Metadata／Canonical／Open Graph 配合內容更新；保留 noindex/nofollow、Privacy 草案隔離、Contact 未核准狀態與原 Actions→Pages 工作流程。不新增套件、Backend、表單、追蹤、DNS 或 Domain 變更。

## 版本與驗收方式

最終受測程式碼指紋為 `29a15d6d81fb6adc56891083cd2cb5ad24d8e0d0750012826a55c660874558d1`；Node.js 24.22.1、npm 11.9.0、Linux x86_64、Chromium 156.0.8078.79（Linux headless，自動化手機 viewport，未宣稱真實手機）。程式碼、環境與完整檔案雜湊見 [source.json](website-showcases-artifacts/source.json)。Root 統一正式指令、build、server、Git；UI／資料、來源截圖與跨頁整合分別 ownership，另進行一次具體獨立覆核。

測試狀態使用 PENDING／PASS／FAIL／BLOCKED／N/A；失敗保留原因與重試，不把工具結束或原站可連線直接當成官網驗收通過。原始指令經 runner 記錄真實 OS exit code，資料不代表 TLS、完整 WCAG 2.2、效能或真實裝置驗收。

| Test ID | 項目 | 結果 | 證據 |
| --- | --- | --- | --- |
| SC-01 | npm ci --cache /tmp/xk-npm-cache | PASS，Exit 0；開發準備時執行 | [回執](website-showcases-artifacts/commands/npm-ci.json) |
| SC-02 | npx tsc --noEmit | PASS，Exit 0；修正後重驗 | [回執](website-showcases-artifacts/commands/tsc-label-fix.json) |
| SC-03 | npm run lint | PASS，Exit 0；修正後重驗 | [回執](website-showcases-artifacts/commands/lint-final-package.json) |
| SC-04 | npm run build | PASS，Exit 0；修正後重驗 | [回執](website-showcases-artifacts/commands/build-label-fix.json) |
| SC-05 | 一般 production 瀏覽器回歸 | PASS，Exit 0；9 頁、18 組寬度、4 次 axe、389 筆站內連結／錨點 | [結果](website-showcases-artifacts/normal-label-fix-result.json)、[回執](website-showcases-artifacts/commands/normal-label-fix.json) |
| SC-06 | npm run build:pages | PASS，Exit 0；含新增展示連結／圖片／來源守門檢查 | [回執](website-showcases-artifacts/commands/build-pages.json) |
| SC-07 | Pages 五寬、連結、圖片、Metadata、axe | PASS，Exit 0；9 頁 × 5 寬、25 次 axe，0 violations，389 筆站內連結／錨點 | [結果](website-showcases-artifacts/pages-initial-result.json)、[回執](website-showcases-artifacts/commands/pages-initial.json) |
| SC-08 | 七張實際截圖與人工視覺覆核 | PASS；7 張長圖及 17 張細部／裁切，0 阻擋問題 | [覆核紀錄](website-showcases-artifacts/visual-review.json) |
| SC-09 | PR CI／最終 artifact | 首輪 FAIL；附件包裝已修正，最終 head CI／artifact PENDING | [首輪紀錄](website-showcases-artifacts/remote-first-ci.json)，後續更新同一 PR |
| SC-10 | 授權合併／main CI／Pages／公開網址 | PENDING | 完成後更新同一 PR |

一般模式於 `127.0.0.1:3120` 驗收後停止，再執行 Pages build；靜態預覽於 `127.0.0.1:3121/xk-website/`。五寬為 320／375／768／1440／1920 px。各頁均驗證真實 HTTP 200、唯一 H1、標題／Description／Canonical／Open Graph、noindex/nofollow、唯一 ID、Mobile Navigation 開關／Escape／返回焦點及鍵盤 Skip Link。展示按鈕另驗外連名稱、rel、目標分頁、八張圖片實際尺寸與 HTTP 200；Privacy／Dev／未知專案／未知路由／Sitemap 共五項預期 404。Console、Runtime 與官網資源錯誤均為 0。新展示無 Disabled 控制項，Disabled 驗收為 N/A；未另增加控制項。

axe 的 25 組 incomplete 共 302 個節點均為既有背景裝飾的文字對比候選，沒有直接視為通過。依當前 computed styles 與各節點實際關聯裝飾，補作 alpha 合成與保守 WCAG 對比計算，最低 5.13:1；詳見 [人工候選判定](website-showcases-artifacts/manual-contrast.json) 與 [真實退出回執](website-showcases-artifacts/commands/contrast.json)。Reduced Motion、展示外連 Focus、Tab、三筆 Planned、四筆模板來源、首頁精選順序與跨頁入口均有實際 assertions。

### 失敗與修正

- PR 首輪 CI `44923244433` 在 ESLint 發現封存的暫存 CommonJS 驗證工具快照（5 errors／3 warnings）。這是本機檢查後才納入的附件包裝問題。改以可還原且 byte-identical 的 `acceptance.cjs.gz` 保留原工具，沒有新增 ESLint 忽略或降低規則；對最終交付包重跑完整 lint 並重跑 PR CI。網站程式碼、八張預覽與受測指紋未變，既有瀏覽器結果仍對應同一 runtime；最終 CI artifact 另與本機產物比對。
- 首次無本機網路權限的瀏覽器程序 Exit 1；保留 [失敗回執](website-showcases-artifacts/commands/normal-initial.json)。環境允許本機網路後才正式啟動預覽。
- 首輪可執行掃描發現新外連按鈕的 aria-label 插入站名，導致可見文字不完整包含在名稱中（WCAG 2.5.3）。改為「開啟展示網站：站名（另開分頁）」後，重跑 TypeScript／lint／production build、一般與 Pages 驗收；原 [失敗結果](website-showcases-artifacts/normal-network-enabled-result.json) 保留。
- 同輪工具預期首頁 Canonical 必須帶尾斜線，與 Next 輸出等價網址不符；改為只正規化根目錄尾斜線，未放寬網域、其他路徑或 OG 一致性。因首頁當時未納入連結 inventory 而衍生的工具錯誤，一併重跑整套驗證。
- 首次對比診斷把不同區塊的所有裝飾疊在同一節點，產生過度保守候選；[原診斷](website-showcases-artifacts/manual-contrast-overbroad-diagnostic.json) 保留，最終依 axe relatedNodes 的真實 gradient／kaleidoscope 分別計算，沒有更改色票來通過。
- 額外直接以 Node 匯入舊 Portfolio config 的唯讀 probe 因既有 `@/` alias 無法解析；改用 Git 基準與目前原始碼逐位元比較，確認三個既有 project records 全部未變。此 probe 不替代通過的 Next build 與瀏覽器狀態檢查。

## 已知來源問題與邊界

- Demo001 原站聯絡區地圖背景、Demo002 原站主視覺背景與 Demo003 原站 Logo 回應 404。保留真實擷取，沒有補畫、修改其他 Repository 或把外站錯誤寫成通過。Demo002／003 卡片提示素材待補齊；Demo001 首屏不受地圖背景影響，完整問題保留於素材紀錄。官網自有預覽應另行驗證全部成功。
- 擷取環境首次遇到憑證信任錯誤；後以瀏覽器忽略環境信任錯誤讀取公開畫面，並明載限制，不宣稱 TLS 檢查成功。首次失敗與重試回執皆保留。
- 本機伺服器首次因 sandbox EPERM 無法監聽，瀏覽器首輪失敗；取得本機網路執行權限後重試。此為環境失敗，不是網站測試通過。
- 品牌授權、正式委託關係、商業成果、來源模板更完整整理與八個外站各自的功能／無障礙驗收不在本次交付證據內。公開入口採展示性質呈現。

## 新增與修改檔案

新增四個展示資料／元件檔、八張來源實際 WebP、七張驗收 PNG、本報告與可追溯驗收資料；修改 Portfolio 頁與文案、首頁整合、Services／Solutions、共用 Navigation、SEO 與 Pages validator，以及 README、AGENTS、implementation notes。完整路徑見本節下方清單。報告與證據排除於 Tailwind 掃描之外；後續只補文件與遠端事件，不因文件雜湊改變重跑無關頁面。


## 實際截圖

| 頁面 | 桌面 | 手機 |
| --- | --- | --- |
| 首頁 | [1440 px](../screenshots/website-showcases/home-1440.png) | [375 px](../screenshots/website-showcases/home-375.png) |
| 作品展示 | [1440 px](../screenshots/website-showcases/portfolio-1440.png) | [375 px](../screenshots/website-showcases/portfolio-375.png)、[320 px](../screenshots/website-showcases/portfolio-320.png) |
| 服務項目 | 本次不另截桌面全頁，包含瀏覽器回歸 | [375 px](../screenshots/website-showcases/services-375.png) |
| 解決方案 | [1440 px](../screenshots/website-showcases/solutions-1440.png) | 本次不另截手機全頁，包含五寬回歸 |

視覺檢查未見新展示的裁切、重疊、來源連結溢位或資訊不一致。Solutions 首個詳細方案的雙欄內容長度不同，左欄尾端有留白，記為非阻擋外觀觀察；保留既有結構，未為本次作品整合擴大改版。文件檢查另修復 implementation notes 四個既有失效歷史連結，沿用 Task 002 規格已核對的固定 Git 版本，不改歷史驗收文字。

完整新增／修改檔案清單見 [changed-files.json](website-showcases-artifacts/changed-files.json)。原始指令與失敗結果在 artifacts/commands；大型 JSON 保留精簡索引與完整無損 .json.gz，索引列原始／壓縮 SHA256，沒有刪去失敗或人工候選。原始 log 以 .log.gz 無損封存，解壓 SHA256 對應回執，避免改寫 Next 進度輸出的 CR／空白。每份回執含指令、環境路徑、開始／結束、真實 exit 與 log SHA256。上表測試項目的預期為各 assertion 成立且程序 Exit 0；實際數量與失敗原因見對應 JSON，未執行的遠端階段仍保持 PENDING。
