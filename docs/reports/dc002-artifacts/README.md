# DC-002 驗收證據

日期：2026-11-26。結果／限制見 [實作報告](../dc002-implementation.md)。

- `*-final` 為限定 Tailwind 排除後的六品質指令；`*-latest` 為同步已合併 PR #32 後兩模式 build／HTTP／anchor／browser，程式 byte hash 未變。
- `normal-latest/result.json.gz`、`pages-latest/result.json.gz` 是最後瀏覽器原始記錄；未產生新截圖／axe／PDF，原因見報告。
- `history/` 保留原失敗／慢案例與修正後定向回執；初次非等價 runtime 比對及 CSS diff 也保留。比較條件不符記為驗收 FAIL，即使命令當時以 Exit 0 輸出差異，不虛構退出碼。
- `source-delivery.json`、`environment.json`、`latest-base-artifact.json` 固定來源及環境；runtime 比對僅將三個 Next build ID manifest 目錄正規化，內容 hash 仍完全比對。
- `.gz` 以 `gzip -dc <file.gz>` 讀取；解壓 log SHA 對應 receipt。`SHA256SUMS` 是提交檔 hash（不包含清單本身），可在此目錄執行 `sha256sum -c SHA256SUMS`。
- `tools/` 是驗收時實際工具的 gzip 封存，不加入應用或 npm dependencies。重現時解壓至 `/tmp/xk-dc002/`；browser 使用外部 `/tmp/xk-browser-check/node_modules/playwright-core` 1.65.1 及 `/usr/bin/chromium`。repo 內 `npm test` 不依賴這些外部工具。
- receipts 中 `/tmp/`、PID、真實時間及命令保留原值；沒有重新包裝成預期結果。Signed artifact download URL、完整 build ZIP／tar、`.next/`、`out/` 與 secrets 沒有提交。
- 精確 Git Commit／PR CI 與下載後的 PR artifact 結論在同一 PR Description 後補；本機報告不是部署成功證據。
