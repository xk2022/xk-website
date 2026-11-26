# 品牌展示排序與新增紀錄

## 範圍與決策

本輪以 main `95d8153192ac69b10821baa2a2f4b115a5693c03` 建立 `feature/brand-showcase-order`，依使用者明確指示修改並 Push／PR，CI 通過後合併及確認部署。僅修改網站 Repository。

品牌展示依序為：

1. 三月手工湯包。
2. 宏家燕窩。
3. 御品園港式燒臘。
4. XK 一頁式網站建置。
5. 宏能興業。
6. 門窗網站展示：準備中。

新增 campaign URL 實際 HTTP 200，標題為「一頁式網站建置｜Xplore Kaleidoscope（XK）」。文案依實際服務推廣預覽、適用情境、合作方式及需求摘要整理撰寫；保留介面含虛構品牌、當頁摘要不代表正式收件的界線。新增一張真實 1280×800 WebP，不複製價格、聯絡方式、成果或未證實公司資訊。

門窗 URL 經 Chromium 與公開 HTTP 皆回應 404，對應 Repository main tree `db5cc8429e6339916a4ece196bb0fe86eb8489eb` 僅有 README。使用者明確選擇「第 6 筆先顯示準備中，不放失效連結」。因此以文字面板呈現，不虛構品牌中文名、公司資料或網站畫面，亦不擷取 404 當作品圖；`preparing` 型別強制 `href`／`image` 為 null，沒有連結、圖片或假按鈕。

保留四個模板範例、首頁原三筆精選（三月／宏家／宏能）、三個 Planned 技術專案、九條公開路由、既有 Metadata／noindex／Privacy／Contact 保護與 Actions→Pages。未新增依賴、修改 lockfile、其他 Repository 或部署設定。

## 改動檔案

- `src/config/website-showcases.ts`：順序、新增 campaign 與 preparing 型別及資料。
- `src/components/sections/portfolio/website-showcase-card.tsx`：準備中文字面板與非互動狀態，卡片底部對齊。
- `src/components/sections/portfolio/website-showcase-gallery.tsx`：涵蓋服務推廣與準備中狀態的介紹。
- `scripts/build-github-pages.mjs`：六品牌順序、十筆總資料、準備中空連結／空圖片與實際輸出守門檢查。
- `public/images/showcases/campaign-website-design.webp`：實際首屏，59,484 bytes。
- `AGENTS.md`、`README.md`、`docs/98_decisions/implementation-notes.md`：目前規則及紀錄。
- `src/app/globals.css`：只新增本報告及證據的掃描排除，避免文件污染 Tailwind。
- 本報告、`brand-showcase-order-artifacts/` 與三張實際驗收截圖。

來源與來源錯誤留在 [sources.json](brand-showcase-order-artifacts/sources.json)；程式碼範圍及完整指紋見 [source.json](brand-showcase-order-artifacts/source.json)。Root 負責程式、build／server、Git 與驗收；來源／截圖由單一 agent 負責，再進行一次限定範圍的唯讀覆核，無阻擋問題。

## 驗證

最終受測指紋：`746f89666d9524e79ed5660bd9f4cc8f13c87feec4205fb605476b0d79756b2a`。環境為 Linux-6.18.57-x86_64-with-glibc2.41、Node.js v24.22.1、npm 11.9.0、Chromium 156.0.8078.79；手機項目為模擬 viewport，未宣稱真實裝置驗收。

狀態依 PENDING／PASS／FAIL／BLOCKED／N/A 記錄。所有正式指令由 runner 保留真實 OS Exit Code；命令預期 Exit 0，實際結果、環境、開始／結束與 log SHA256 見 commands 回執。報告與附件先完成，再建立 PR；遠端後續事件更新同一 PR。

| Test ID | 指令／程序及預期 | 實際結果 | 證據 |
| --- | --- | --- | --- |
| BO-01 | npm ci --cache /tmp/xk-npm-cache | PASS，Exit 0 | [回執](brand-showcase-order-artifacts/commands/npm-ci.json) |
| BO-02 | npx tsc --noEmit | PASS，Exit 0 | [回執](brand-showcase-order-artifacts/commands/tsc.json) |
| BO-03 | npm run lint | PASS，Exit 0 | [回執](brand-showcase-order-artifacts/commands/lint-final-package.json) |
| BO-04 | npm run build | PASS，Exit 0 | [回執](brand-showcase-order-artifacts/commands/build.json) |
| BO-05 | 一般 production 回歸 | PASS，Exit 0；9 頁、18 組寬度、4 次改動區域 axe | [結果](brand-showcase-order-artifacts/normal-result.json) |
| BO-06 | npm run build:pages | PASS，Exit 0；順序、狀態、圖片及保護驗證 | [回執](brand-showcase-order-artifacts/commands/build-pages.json) |
| BO-07 | Pages 五寬、順序、連結／圖片與準備中狀態 | PASS，Exit 0；9 頁 × 320／375／768／1440／1920 px、389 筆站內連結／錨點、9 張可用預覽 | [結果](brand-showcase-order-artifacts/pages-result.json) |
| BO-08 | axe、Keyboard／Focus、Reduced Motion、Console／Runtime／Network | PASS；Pages 10 次改動區域 axe，0 violations／incomplete；錯誤 0；五項預期 404 | [結果](brand-showcase-order-artifacts/pages-result.json) |
| BO-09 | 三張截圖與人工視覺檢查 | PASS；指定六筆順序、新圖、準備中、手機換行皆正常 | [視覺覆核](brand-showcase-order-artifacts/visual-review.json) |
| BO-10 | 最終 PR CI／合併／main CI／正式部署及公開網址 | PENDING | 實際完成後更新同一 PR |

本輪為資料、卡片狀態與輸出驗證調整，不重做歷史 Task 012 的完整 55 準則、真實 AT 或效能量測；不沿用歷史測試當本次通過。一般模式先完成後停止，再做 Pages build。響應式與 Metadata／錨點等回歸覆蓋九頁；axe 聚焦實際改動的作品卡片、範例與首頁精選，不把未重驗的 Hero 漸層或完整頁面視為新掃描通過。準備中使用非互動文字，無 Disabled 按鈕；對它驗證沒有可點擊或聚焦的假操作。

發現 FAIL 必須保留原因、影響及修正／重試，不能跳過測試取得 PASS；外部門窗來源 404 以使用者核准的 preparing 狀態處理，不宣稱該網站已發布或可收件。

## 限制與後續

- 來源擷取環境的 TLS 信任 probe 失敗，後以忽略該環境信任錯誤實際渲染；記錄在來源證據，不宣稱 TLS 驗證通過。
- 門窗網站尚待來源完成發布、核對品牌資訊並取得真實預覽，再另行開放連結；本輪依使用者選擇已完成準備中呈現。
- 既有模板原站素材問題與客戶交付／商業成果界線保持上輪紀錄，不因排序變更推升任何狀態。


## 截圖與證據

[桌面 1440 px](../screenshots/brand-showcase-order/portfolio-1440.png)、[手機 375 px](../screenshots/brand-showcase-order/portfolio-375.png)、[準備中卡片 375 px](../screenshots/brand-showcase-order/preparing-375.png)。

完整原始 JSON 與暫存驗證工具以 gzip 無損保存，摘要列對應 SHA256。工具快照使用 .cjs.gz，未當成網站程式碼或變更 ESLint 規則；最終附件包另重跑完整 lint。來源 404 與 TLS 信任限制均保留在 source 證據，沒有當作可用網站通過。
