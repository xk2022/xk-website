# DC-004 原始驗收證據

本目錄是執行當下實際資料的封存，不新增測試 PASS、發布或部署結論。原始收據的命令、時間、退出碼、失敗及未完成狀態保持原樣。

- `archive-manifest.json` 以原絕對路徑、原 SHA 與 decoded payload SHA 對照 repository 相對路徑；不改寫 raw JSON/log 的引用。
- 大型文字以 mtime0 gzip 保存；原 `.gz` 的 bytes 保持不變。`SHA256SUMS` 核對實際封存檔，解壓內容另有 SHA。
- 所有掃描到的 FAIL、診斷版本、bridges、原 HTMLgz/CSSgz 及工具保留。工具未加入網站依賴。
- PNG/PDF 集中於 [畫面目錄](../../screenshots/design-collection/dc004/README.md)，只有 byte-identical binary 共用實體檔；每個原路徑仍在 manifest。
- 本機、PR CI、merge、部署及公開驗證須由正式報告分別記載；此封存不代表後續階段完成。

## 本輪結果入口

總結見 [實作報告](../dc004-implementation.md)。最終 Pages 為 `browser-pages-final.json`、`pages-final/result.json.gz`、`http-pages-v2-result.json.gz`、`theme-pages-final/result.json.gz`；實際退出碼在各 runner receipt。普通模式為首輪 suite、受影響重驗、嚴格版本 bridge 及精確資源裁定的分段結論，原整套 FAIL 保持不變。

`source-final-v5.json.gz` 綁定最後 197 檔；`visual-review.json.gz` 記錄 17 張實際圖與 PDF 相同 bytes 的檢視界線。`final-delivery/` 保存最後文件檢查首輪連結 FAIL 與修正版 PASS。後續遠端 CI/artifact 證據置於同一 PR Description，這份本機快照不宣稱已部署。
