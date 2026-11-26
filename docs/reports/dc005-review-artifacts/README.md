# DC-005 品牌審閱原始證據

日期：2026-11-26。範圍與結論見 [報告](../dc005-brand-review.md)，[五寬截圖](../../screenshots/design-collection/dc005-review/README.md)。不是完整 Luxury 系列、品牌核准或部署證據。

- `archive-manifest.json` 對照原檔路徑／SHA 與封存檔；`SHA256SUMS` 核對提交 bytes。gzip 解壓內容保留原 SHA、命令、時間、預期／實際與 OS exit，工具／log 全部壓縮，沒有改 App Lint 規則。
- `core/`：品質 receipts、原型 browser／axe／深色對比／storage／資源、source sync 與實際人工視檢。Browser 原結果保留其待人工欄，完成的視檢另見 `visual-review.json.gz`，不回寫 raw JSON。
- `validation/`：原型 static 202 checks 與最後文件檢查工具／證據。`source/`：最新公司 Commit／Blob／完整比較及重讀／沿用清冊，未複製公司完整內部文件。
- `actions/`：真 main artifact metadata／digest／download、凍結 checker 與本輪 output bridge。基準 ZIP 留暫存，可依 artifact ID 重新下載；未重複提交整份 out／ZIP。
- 原型與正式功能驗收分開。品牌前置與後續完整 16 頁保持 BLOCKED；未執行／不適用理由依矩陣記錄。後續 PR 精確 head CI／artifact 在 PR Description 更新，不借用舊成功或宣稱發布。
