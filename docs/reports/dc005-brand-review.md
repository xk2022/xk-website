# DC-005｜Luxury 品牌審閱前置與驗證

日期：2026-11-26（UTC）。分支：`feature/design-collection-luxury`；基準 `main@8ba299a5a48da41ca7f4d88d9b2149d7c83f6584`。本輪交付可審閱設計稿，完整 Luxury 實作因品牌前置未滿足而 BLOCKED，不以原型當功能完成。

規範：[DC-005](../task/dc005.md)／[工作包](../01_design/design-collection/work-packages.md#dc005)。[v1 審閱稿](../01_design/design-collection/reviews/luxury-v1.md)、[實際截圖](../screenshots/design-collection/dc005-review/README.md)、[證據](dc005-review-artifacts/README.md)。本報告於 PR 前完成；精確 head CI／artifact 後續記在同一 PR Description，不產生記錄自身 SHA 的循環提交。

## 前置與來源

DC-003／PR #39 已合併，正式 main 仍 17 頁；DC-004／PR #40 OPEN、未合併，但 DC-005 規格明定可從 DC-003 獨立執行。本分支直接從 main 建立，不取用未核准 Heritage 程式、品牌例外或先前合併／部署授權。

公司 main `9213a3d8dacb8774d87c26cb736c4a4315779e95`／tree `195c5c8100b74513985e040f3ee6fc642571285e`。根 AGENTS 已存在並全文重讀。全部最新 05_brand、開發工作流程、官網入口、方案與服務正文已讀；14 組新舊全文比較確認實質規範未變，只有英文檔名、連結／來源路徑與歷史標籤。其餘同 Blob 的架構、分類、靜態發布與 APP 決議沿用既有同版紀錄，不冒稱全部本輪重讀。細節與精確 Blob 見 source-review 證據。

公司來源沒有 Luxury 專用 palette／字體／Logo／外框例外核准。正式 Logo 03、Inter／Noto Sans TC、公司外框與品牌事實保持；深色主體、有限金色、Cyan 互動及 64／36 字階屬待審提案，不向公司全站回灌。

## 範圍與環境

僅 docs 原型／設計說明、任務／入口／報告與必要證據；globals.css 只加四條精確文件掃描排除及註解，沒有呈現宣告變更。路由、Metadata／registry、Gallery／導覽、價格／案例／服務資料、Contact／Quotation／A4、素材、package／lock、Next／Actions／DNS 均保持。

原型由 loopback 3254 靜態提供。既有先前 preview 仍在運作，正式建置使用 main 的隔離 worktree `/tmp/xk-dc005-build`，同步本輪檔案並逐檔核對來源，避免覆寫既有 `.next`；不是新的網站部署或 Backend。Linux 6.18.57、Node.js 24.22.1、npm 11.9.0、Python 3.12.14、Chromium 156.0.8078.79、外部 axe Playwright 4.14.0。原型採本機字體 fallback；正式 Inter／Noto Sans TC 未因原型下載或替換。型別準備先在主工作樹執行一次 `next typegen`（僅忽略的生成型別），隔離 worktree 也有獨立 typegen 回執；production build／Pages 均在隔離 worktree 執行。實際命令、時間與 OS exit 依 receipts，不推認成功。

## 實際驗收

以下均依本輪實際結果；原型版本 SHA-256 `c7809ec2e8ec31713828aa2913175b73e41af56ad2d97f8e3bd95e6d354b9f4b`。人工視檢沒有程序退出碼。

| ID | 預期與適用範圍 | 實際結果／Exit／證據 |
| --- | --- | --- |
| LR-01 | main／DC-003／未合併 PR #40／公司來源與品牌 gate | 來源確認；Owner brand approval BLOCKED |
| LR-02 | 原型結構／copy／錨點／既有資產與原 Logo | PASS；static 202 checks、Exit 0，6 sections／單一地標，source copy、5 img＋favicon／hash、錨點與 native 樣本白名單 |
| LR-03 | 五寬／真圖解碼／截圖／人工視檢 | PASS；320／375／768／1440／1920，5 PNG 逐張實際檢視，無橫溢／重疊／截斷。Browser 真 Exit 0，視檢 Exit N/A |
| LR-04 | axe／keyboard／focus／details／Reduced Motion | PASS；5 次 axe（375／1440 default＋展開內容、375 menu）0 violations／incomplete。5 寬原生鍵盤／focus／Reduced Motion，20 rows＝19 PASS＋1 N/A，真 Exit 0 |
| LR-05 | 真實深色表面與各狀態對比 | PASS 於本原型範圍；375／1440 共 464 個文字觀測通過，最低 7.12410:1；4 個必要邊界與 2 個焦點觀測通過。Disabled 依 inactive 豁免另列，原生 radio glyph 保留人工可辨識界線，0 未決 |
| LR-06 | network／console／runtime／無收集或持久化 | PASS；40 次本機回應正常、無外部載入／提交／追蹤，Console／Runtime／資源錯誤 0，cookie／localStorage／sessionStorage 未寫入 |
| LR-07 | 品質指令／Pages／實際 main 產物 bridge／未 export 原型 | PASS；npm ci、typecheck、完整封存後 Lint、npm test、一般 build、Pages build 與 output bridge 皆真 Exit 0。93 項產物檢查通過：17 public／20 HTML（含 3 個 404）、286 全檔僅真 Build ID 差異、154 runtime 資產（4 CSS／17 JS／115 fonts／8 SVG／10 WebP）raw hash 相同，原型未輸出 |
| LR-08 | 文件／Diff／secrets／manifest／真退出碼 | PASS；本輪最終工具檢查工作樹／staged Diff、Markdown links／fence／EOF、source／stack／manifest／receipt-log SHA／無 secrets 或 build cache，真 Exit 0 |
| LR-09 | Push／Draft PR／精確 head CI／真正 artifact | PR 前 PENDING；後續更新同一 PR |
| DC5-BRAND／FULL | Owner 同版本核准及後續完整 16 頁 | BLOCKED，尚無品牌核准；不是本輪技術 PASS |
| LR-PRINT | 本稿未改試算／A4，產物相同後可確認無影響 | N/A，正式 Luxury PDF 仍屬完整工作包 |
| LR-AUTOFILL | 本機唯讀控制樣本不能代表真實 autofill | N/A 於本原型；正式深色表單驗收仍 BLOCKED |

## 品質、來源與產物證據

- `npm ci --cache /tmp/xk-npm-cache`：主工作樹與隔離 worktree 各有實際 Exit 0；未變更 package／lockfile。
- `npx next typegen`／`npx tsc --noEmit`：隔離工作樹生成／檢查 Exit 0，strict 不變；`npm test` 在主分支 Exit 0，沒有新應用測試框架或依賴。
- `npm run build`、`npm run build:pages`：隔離工作樹皆真 Exit 0，先後執行；來源同步逐檔 bytes 證據在 `build-source-sync.json`。之後只有已排除的文件／證據補記，不改 App。
- `npm run lint`：完整 gzip 封存後在本分支執行，`lint-final.json` 真 Exit 0，不從先前空目錄推認。
- 真正 main Pages artifact `15085955305`／run `45750880906`，ZIP SHA `cc43318ca9b284e26dfa8d98da349e9f30f0579886307f4a62b29dd043a61cbe` 已重新下載核對。候選 out 的檔名／所有內容只正規化各自真 Build ID；CSS／JS／font／images 另逐 raw SHA。不是從相同 source 指紋推認無 UI 影響。
- 公司來源最新英文路徑：`05_brand/overview.md`、`logo-guidelines.md`、`brand-identity.md`、`color-palette.md`、`typography.md`，以及 `03_services/pricing.md`／`website-packages.md`；精確 Blob 與實讀／比較／沿用清冊存 `source-review.json.gz`，沒有匯入完整私人公司文件或內部收費模型。

## 失敗、限制與交付

本輪原型 static／browser／output bridge 首輪皆通過，沒有 axe incomplete 或網站功能 FAIL。環境檢查嘗試讀舊 preview 的 `/proc/.../cwd` 權限不足，不將未知 process 歸屬推定為可終止；改用隔離 worktree，保留既有 preview。這是環境操作限制，不是 App 驗收結果。原型的系統 fallback 字體、readonly controls 與 native details 不取代正式 Next.js／fonts／Contact／Quotation／A4／跨系列或真人讀屏驗收。沒有執行的真機／Safari／完整 WCAG 認證不宣稱通過。

本輪待 Owner 審閱同版本 palette／外框／素材、桌面與手機構圖；沒有合併／部署授權。正式網站仍為原 17 頁。核准後依完整 DC-005 工作包繼續，不減少測試或自行整合未批准 Heritage。
