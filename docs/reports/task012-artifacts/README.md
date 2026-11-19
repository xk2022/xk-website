# Task 012 驗收證據

本目錄保存本輪實際結果，不把工具退出成功、axe 零違規或環境就緒當作整體通過。完整範圍與限制見 [實作報告](../task012-implementation.md)。

- `verification.json`：33 項規格驗收、55 項 WCAG 2.2 A／AA、問題與版本／證據對應。
- `evidence.tar.xz`：原始 baseline、修正後結果、失敗／重驗、axe violations／incomplete／passes、DOM／AX／幾何、指標／鍵盤、對比、真實 AT 朗讀及 browser zoom、工具快照與真實命令回執。
- `manifest.json`：封存的實際路徑、bytes、SHA-256；不含 node_modules、建置目錄、瀏覽器私有 profile、憑證或桌面 session 環境檔。

解開原始資料：

```sh
mkdir -p /tmp/xk-task012-review
tar -xJf docs/reports/task012-artifacts/evidence.tar.xz -C /tmp/xk-task012-review
```

原始 JSON 中的 `/tmp/xk-task012/` 等位置保留測試當時資訊；以封存相對路徑查閱，不視為其他電腦現成目錄。每個 run 保存當時工具及 source map；讀取 `results.json` 的完成時間、expectedTests、實際數量、completionToken 與外層 process receipt 的 observed exit。手動操作沒有 command exit，不能捏造為 0。`PENDING` 的原始 incomplete 與舊 FAIL 不覆寫，另以相應判讀／重驗檔案結案。

先 `npm ci`，按 [AGENTS](../../../AGENTS.md)、[當次規格](../../task/task012.md) 及 [協作流程](../../subagent-workflow.md) 重新建置。測試工具位於獨立暫存目錄：Node 24、Playwright 1.65.1、Chromium 156.0.8078.79、axe 4.14.1；它們不是新增的專案 Dependencies。重現時在暫存工具環境安裝相同版本、調整快照工具的絕對路徑，重新確認工具 API，再產生本輪新證據；不能直接執行舊 PASS 檔案當新結果。

一般 production 與 Pages 分別建置／啟動，避免 `.next/` 被另一模式覆寫。Pages 使用實際 `/xk-website/` 靜態目錄；本輪 loopback server 的 gzip／cache 模型不是 GitHub CDN 保證。AT 使用實際 Debian 13／Orca 48.1／Chromium；其他平台未測。200% 是原生 Chrome zoom，保留 200% UI 與 CSS viewport／CSS zoom=1；原始 JPEG 只以相同解碼像素轉存指定 PNG，沒有修改內容或尺寸。

後續遠端 PR head、CI artifact、合併、main CI／部署及公開 Smoke 更新於同一 PR；本目錄不為了記錄自己的 Commit SHA 或 PR URL 再做循環提交。
