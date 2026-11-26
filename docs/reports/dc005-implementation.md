# DC-005｜Luxury 完整設計系列實作與驗證

日期：2026-11-26（UTC）。分支：`feature/design-collection-luxury`。規格：[DC-005](../task/dc005.md)、[工作包](../01_design/design-collection/work-packages.md#dc005)。

## 版本、範圍與授權

使用者「批准合併」已核准 [Luxury v1](../01_design/design-collection/reviews/luxury-v1-approval.md)。品牌審閱 PR #41 已合併為 main `74369376a0dbeeb0a17b5ee34557059c8e2a9491` 並部署原有 17 頁。本報告接續原 DC-005 完整工作包；這是另一個功能 PR，不自動合併或部署。Heritage PR #40 仍未合併，沒有整合其 app 程式。

公司來源最新 main `9213a3d8dacb8774d87c26cb736c4a4315779e95`；重新唯讀比對根 AGENTS、05_brand、分類／服務／收費及網站／工程規範。新版檔名／連結調整未改變已核准的公開事實；完整 Commit／Blob 對照保留於品牌審閱來源紀錄，不複製內部全文或修改公司 Repository。

完整功能新增 Luxury 七主頁及九詳頁，與 Modern16／Gallery 合計 33 頁。Heritage 保持 planned。共用原 DTO、服務／作品／價格、控制器、LocalStorage ID、原 Logo／QR；保留 noindex/nofollow、Modern canonical／自身 OG、www 根路徑及靜態輸出。

## 實作與檔案分工

- `src/app/(collection)/design-collection/[style]/`：唯一 luxury 靜態參數、七主頁／九詳頁、Metadata adapter。每頁一個 frame，style layout 不重複地標。
- `src/design-systems/luxury/`：72 個 typed semantic roles、recipes、限定 scope CSS，獨立置中 Hero、全寬服務敘事、圖後作品資訊、流程展開與 CTA。白 Header／原深 Footer，金色只裝飾。
- `src/components/design-collection/luxury/`：獨立 frame／手機導覽／內容 composition，沿用共用 DTO 與既有真實狀態；無 Heritage runtime 引入。
- 共用 Contact／Quotation：預設 Modern 相容、Luxury style props、只轉換核准站內連結、跨頁個資清除與 active print scope；原計價／選項 IDs／A4 不變。
- registry／SEO／Gallery／Modern Footer／Services 導讀設定：Luxury16 可瀏覽、目錄共33；原 Services 文案抽至單一設定，Modern 文字不變。
- builder／smoke／獨立 fixture／native tests：精確33清冊、內容／狀態／表單／價格／404窄保護。
- README／AGENTS／設計及任務索引／Roadmap／決策、核准紀錄、本報告與實測證據。

## 驗收環境與方法

Linux、Node.js 24.22.1、npm 11.9.0、Next.js 16.4.6、React 19.3.1、TypeScript 5.9.3、Tailwind CSS 4.3.3；Chromium 156.0.8078.79、Playwright Core、axe 4.14.0。沒有新增 npm dependencies 或改 lockfile。

Root 把同 bytes 程式碼同步至 `/tmp/xk-dc005-build`，以 source manifest 對照；避免改寫舊 preview 的 `.next/`。六品質命令使用 `scripts/run-with-evidence.py` 記錄真實退出碼，普通3262停止後再建 Pages3263。預期與實際、工具／來源 SHA、Console／Network、失敗與重驗各有原始紀錄。

## 測試結果與版本邊界

程式 freeze：v1 `9df2a8a212ffdce0625334972b888537032599cbcf24dd886ef41092d410dc36`；修正 Contact 標題後 v2 `41c6ff4de2ebc88b1940aba4b53d6758931499dcafc66a566355352aa6b21ea5`；最終 v3 `c45eda25642ef1a236c5cbcaa2acbca6a6c01d6b92870fd63e50e3aeda7db1e2`（202 runtime／測試／工程設定檔）。v1 原清冊含兩個根 Markdown；v2 起把文件與 runtime 分開，沒有刪除根文件。

普通完整矩陣在 v1、Pages 完整矩陣在 v2 各執行一次。v1→v2 只移除 Luxury Contact 兩組重複裝飾編號；普通 Contact 定向重驗 13/13、5 layouts、6 axe、30 筆逐字標題驗證通過。v2→v3 只更動 Luxury Home 的三個技術標籤排列，以及 Luxury Quotation 螢幕版原 Logo 白底襯板；同一規則不選取 A4、Modern 或其他頁面。兩次 source bridge 逐檔列出真實變更；v3 重新建置兩模式及全33頁 HTTP，另做 Home／Quotation 定向驗收，不把舊版本廣泛矩陣改標為新版重跑。

| Test ID | 項目／預期 | 實際結果 | Exit | 狀態 |
| --- | --- | --- | --- | --- |
| DC5-01 | main／品牌核准／公司來源 | 上列固定版本、PR #41 核准與合併證據；未引入 Heritage app | N/A（文件／Git 實查） | PASS |
| DC5-02 | Luxury16 全內容／價格／狀態同源、四項 composition | DTO 與獨立 HTML fixture 對照；七主頁＋九詳頁、3 技術 Planned、6 品牌／4 模板及來源／null gates 保留 | 0 | PASS |
| DC5-03 | 六品質命令 | 六命令均完成；封存後根目錄Lint亦Exit0 | 0 | PASS |
| DC5-04 | 兩模式33HTTP／站內links／SEO／assets／404及外部來源 | v3站內各2189項PASS；普通2項N/A為受控private404 shell。另實測8個可瀏覽展示來源，3個200、5個404 | 站內0／外部延伸1 | FAIL（外部5筆） |
| DC5-05 | 每模式165個五寬layout | 普通165/165、Pages165/165，零橫溢；v3受影響10布局／模式通過 | 0 | PASS |
| DC5-06 | axe／keyboard／focus／menu／Reduced Motion | 兩模式各58掃描，違規0、incomplete0；16頁keyboard及展開導覽／Portfolio／表單狀態通過 | 0 | PASS |
| DC5-07 | Contact／Quote／blocked storage | 每模式14業務案例；原四欄驗證、錯誤焦點、copy／手動fallback、9build／17addon、range/from/quote/annual、重載／壞值／封鎖儲存均通過；沒有寄信 | 0 | PASS |
| DC5-08 | 跨風格／deep／history／PII／CSS | Modern↔Luxury、兩類deep同slug、back/forward、PII清空後重建草稿、只還原ID、跨頁print隔離通過 | 0 | PASS |
| DC5-09 | 四份最壞A4／QR | 兩模式各Modern／Luxury真PDF，共4份；各14項physical checks通過，單頁A4、17加購／40-60CJK、所有文字與繪圖界內、兩個QR各150/300DPI可解碼 | 0 | PASS |
| DC5-10 | 72roles／狀態／原生autofill | 各模式12case／144 role observations、34實際樣本通過；另Pages375/1440原生Autofill事件／值／pseudo皆成功，4筆對比16.90；逐張視檢通過 | 0 | PASS |
| DC5-11 | 17正式PNG／4PDF逐張視檢 | 最終17張逐張視檢通過（10原圖＋v3新7圖）；另2張真原生autofill圖通過；四PDF的有界視檢見下文 | N/A（視覺檢查） | PASS |
| DC5-12 | 文件／Diff／manifest／禁止產物 | 主147檔／remote18檔及媒體封存；完整staged驗證六類均Exit0，明列253檔初次交付清冊與後續純文件／證據補記 | 0 | PASS |
| DC5-13 | 新PR／精確head CI／actual artifact | 待Push／PR／CI；未合併或發布完整Luxury | — | PENDING |

所有命令透過 [runner](../../scripts/run-with-evidence.py) 記錄真退出碼；每筆原始測試包含 Test ID、項目、實際 Command／Procedure、環境、Expected／Actual、Exit／Status、Evidence 與 Notes。共同環境見上文，不只以「測試通過」代替證據。

| 品質命令 | 實際結果 | 原始回執（封存於附件） |
| --- | --- | --- |
| `npm ci --cache /tmp/xk-npm-cache` | Exit0，616 packages；lockfile 不變 | `npm-ci.json` |
| `npx next typegen`（準備） | Exit0；在隔離工作樹產生路由型別 | `typegen.json` |
| `npx tsc --noEmit` | Exit0，v2及v3已重驗 | `typescript.json`、`typescript-v2.json`、`typescript-v3.json` |
| `npm run lint` | Exit0；全部封存後根目錄Lint再次Exit0 | `lint.json`、`lint-final.json` |
| `npm test` | Exit0；Contact26、Quotation32、Storage14、Routes61、Metadata59、Content24、Tokens173；沒有新增框架 | `test.json` |
| `npm run build` | v1／v2／v3均Exit0，一般production保留 | `build-normal*.json` |
| `npm run build:pages` | v2及v3均Exit0 | `build-pages.json`、`build-pages-v3.json` |

## 失敗、修正與重驗

1. **內容 FAIL 保留**：首次普通 HTTP `SMOKE-1758` Exit1，流程 h3 多了裝飾編號。移除與原生有序清單重複的編號，保留原 step 標題／正文；普通 Contact13項及完整HTTP重驗通過，Pages完整矩陣通過。
2. **視覺問題**：實際 Home375／1440 圖片看到清單圓點與置中標籤分離；只改為既有 `lx-index` wrapping flex 清單，保留3個DTO字串。Quotation375／1440原深色字Logo在深底難辨；只為螢幕intro原SVG加白底及12px內距，沒有換Logo、染色或修改A4。兩個舊375PNG作問題證據，原完整suite保持原版本，v3普通／Pages各17/17通過（各10layouts、4axe、2鍵盤、1network），替換7圖逐張視檢通過；print media亦確認白A4、原Logo／2QR仍可見。
3. **工具 FAIL 保留**：初次v3定向17中16PASS／1FAIL，工具錯誤要求Home的數值 `animation-duration` 必為0；獨立實查為既有全域0.01ms、`animation-name:none`、`getAnimations()=[]`、transition none/0s，沒有動畫物件。新v4工具要求無動畫名稱或真正零時長，且禁止實際running／pending物件，沒有把0.01ms視為零、沒有改App或降低有效動畫要求。原工具／FAIL／診斷與新重驗分別保存；v4工具在同一App v3兩模式各17/17通過。
4. **原生 autofill 補充**：原theme工具的CDP觸發因Field not found未成功，原N/A結果未改寫。獨立補充以實際frameId／DOM backendNodeId再觸發，375／1440共4次成功；收到真 `Autofill.addressFormFilled`、姓名及Email實值正確、`:-webkit-autofill=true`。文字與inset深色背景符合實際顯示，對比16.9036，實際截圖已視檢。這才解除原生渲染驗證限制，不以模擬class宣稱通過。

5. **封存工具限制**：首次封存Exit1，因remote checker的原receipt指向另一個明確暫存根；封存器拒絕跨根讀取，沒有部分寫入。主147檔證據以原allowlist完整封存；remote18檔以獨立allowlist／SHA manifest封存，原receipt／log未改寫，沒有擴大讀取權限。

普通／Pages v3的HTTP各2189項均PASS；修正版兩模式各17項均PASS。最終來源／Markdown／連結與錨點／格式／Diff／禁止產物及敏感內容初檢六類均PASS。remote-v3的本地產物比較1194/1194 PASS，精確33頁、403檔、163靜態檔；遠端CI未發生時不借用此結果。

獨立事實覆核逐一核對raw JSON，確認262/165/58、14業務案例、72角色、34實際樣本、4PDF各14項及兩模式v3定向17/10/4，未見數量或版本敘述錯誤。

## 視覺與列印證據

[實際異動清冊](dc005-artifacts/changed-files.json) 列出新增／修改檔案；[附件 manifest](dc005-artifacts/manifest.json) 列出來源／封存SHA、原始結果與實際退出碼；工具與log一律gzip（mtime0），大型JSON gzip，保留原始FAIL及各版本。17張交付圖為Home五寬、Services／Portfolio／Contact／Quotation各375/1440、技術／品牌詳頁各375/1440。最終圖以v3 Home5＋Quotation2替換原7張，其他10張保持原圖與來源；manifest明列before/after SHA，不改寫原suite。

4份獨立產出的原PDF保留各自raw SHA；每份實際physical／QR verifier單獨執行。它們的150dpi渲染逐byte相同，SHA `2f7a97d8c248b89241fbaf01e5e4d6d6b5439f052982a724ebc429cad664ea84`。Root已透過view_image檢視該實際渲染；相同bytes的有界視覺bridge適用其餘3份，沒有假稱4份PDF原檔相同或重新逐張開啟。完整Logo、17項、40/60字、面議／已知小計／條款、QR均在紙內；150／300dpi解碼另有各自證據。內容邊界維持0.1pt；3個既有Chrome白色canvas背景僅依精確signature另判，不豁免文字、Logo、QR或其他繪圖。

視覺檢查由Codex透過實際圖片完成，不等同Owner最終人工驗收。長圖閱讀縮放不取代CSS px幾何、原始高解析截圖或內容fixture。

## 已知問題：五個既有外部展示子網域404

最終 `--check-external` 實測Exit1：2192項PASS、5項FAIL，原工具將它們列為Required，不能改稱N/A或完整通過。三月手工湯包 `https://march.xplorekaleidoscope.com/`、宏家燕窩 `https://honbird.xplorekaleidoscope.com/`、御品園 `https://yupinyuan.xplorekaleidoscope.com/`、宏能 `https://honest.xplorekaleidoscope.com/`、千剛 `https://qiangang.xplorekaleidoscope.com/` 均回404；原main同一份來源設定亦使用這五個URL，並非本輪新增或改寫。站內詳頁、截圖、CTA及資料gate均照原規範保留，失效的是對外展示入口。

獨立單輪10GET／5DNS補驗：5個子網域及5個原github.io網址均回GitHub Pages「Site not found」404；子網域DNS正常指向GitHub Pages。不是tunnel錯誤或單純測試假失敗，但單一受管代理環境不能判定全球或帳戶根因；沒有已驗證200的舊網址可作fallback。證據見 [外部檢查](dc005-artifacts/external/manifest.json) 及 [獨立診斷](dc005-artifacts/external/diagnostic-manifest.json)。

修復需確認各展示站GitHub Pages／子網域設定或核准可用替代URL；本輪禁止改其他Repository／DNS，亦不能為取得PASS而擅自改寫已確認的作品來源／狀態或降低fixture。實際HTTP測試狀態為FAIL，跨Repository修復處理目前BLOCKED；完整Luxury新PR以Draft交付，等待這項外部問題處理與審閱，不宣稱完整驗收或發布成功。

## 限制、預覽與交付

本輪沒有新增業務／定價、Backend、API、CMS、Analytics、dependencies、外部字體或Logo，也沒有改Next設定、Actions、DNS或Custom Domain。聯絡／詢價均為本機草稿，未測信件實際寄達或承諾回覆時間。

自動axe與Chromium控制環境驗收不等於完整WCAG認證、Safari／Firefox、實體手機、真實輔助科技或field CWV。Heritage未合併，因此三向switcher仍屬DC-006，不將不存在的路徑當成功。Privacy正式政策、索引／Sitemap、法律／新價格發布仍有原獨立gate。

本輪可重現證據操作見 [附件說明](dc005-artifacts/README.md)。[手機首頁](../screenshots/design-collection/dc005/home-375.png)、[桌面首頁](../screenshots/design-collection/dc005/home-1440.png) 與 [試算頁](../screenshots/design-collection/dc005/quotation-375.png) 均為最終交付圖。

本機 `npm ci`、`npm run dev` 後由Gallery選Luxury，或瀏覽 `/design-collection/luxury/`；一般production使用 `npm run build`／`npm run start`，Pages預覽使用 `npm run build:pages`的 `out/` 靜態server。外部未發布功能分支，正式main仍17頁。

本報告隨同功能PR提交，最終Commit／新PR／head CI／actual artifact的實際遠端事件更新同PR說明，避免只為記錄自身SHA製造循環提交。完整Luxury合併與部署待新PR審閱，不沿用品牌PR #41授權自動發布。
