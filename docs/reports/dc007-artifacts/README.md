# DC-007｜驗收證據

固定網站基準與受測版本見 [source](source.json.gz)；範圍、結果、原始失敗及限制以[完整報告](../dc007-implementation.md)為準。這個目錄不是公開網站，不能由工具 Exit 0 推定全站或完整發布驗收成功。

- [manifest](manifest.json)：每個證據的包裝 path／encoding／SHA256／bytes、解碼原始 SHA256／長度及當時暫存來源。
- [公司來源核對](source-review.md)／[真人讀屏交接](human-at-handoff.md)。真人 Required 仍 BLOCKED。
- [Normal 原完整結果](normal-final/result.json.gz)／[Pages 原完整結果](pages-final/result.json.gz)：兩套原 Exit 1 保留；限定修正與重驗另存，不覆寫原檔。
- [Normal 七項補驗](normal-affected-v2/result.json.gz)／[合併判讀](normal-targeted-composite-review.json.gz)。
- [Pages 網路逐項判讀](pages-network-composite-review.json.gz)：7個原status-null HEAD仍未解，沒有一律豁免。
- [Normal384對比摘要](a11y/normal-contrast-summary.md)／[Pages384橋接摘要](a11y/pages-contrast-summary.md)，原axe incomplete保留。
- [原生200% zoom紀錄](desktop/summary.json.gz)；Normal16頁限定觀察，不是真人讀屏。
- PDF：Normal v1／Pages v2各四份採用PDF、physical batch／verification、150dpi渲染及人工紀錄分目錄保存。原Pages v1取消失敗也保留。
- [跨頁列印 v2](pdf/cross-page-print-v2/result.json.gz)／[三張實圖觀察](pdf/cross-page-print-v2-manual.json.gz)；v1原FAIL與兩張圖保留。
- [18 cold＋6 warm實際效能分析](performance/analysis.md)，冷樣本完整但六組TBT目標FAIL；[40筆warm HEAD原status清單](performance/warm-head-inventory.json.gz)，不是全網路gate PASS。
- [本輪輸出嚴格比對](artifact-local-check.json.gz)，原checker及既有固定輸出基準放於`artifact-checker/`；不是沿用歷史browser PASS。
- [47張網站原圖及逐檔檢視](../../screenshots/design-collection/dc007/README.md)獨立保存一次，不重複打包預覽裁切。

所有`.gz`是gzip容器，原檔名去掉最後`.gz`即其語意格式。可用Python標準庫或`gzip -dc`讀取，例如：

```sh
gzip -dc docs/reports/dc007-artifacts/browser-pages-command.json.gz
gzip -dc docs/reports/dc007-artifacts/pages-final/result.json.gz > /tmp/dc007-pages-result.json
```

manifest的`sha256`驗包裝，`decodedSha256`驗解碼原件，`originalBytes`驗原件長度。檔名／報告／真OS receipt共同辨識版本，不能只讀JSON裡的PASS。手動判讀的Exit是N/A；原工具的MANUAL_PENDING、FAIL、PENDING文字保持當時快照，以後續有日期與scope的證據補充。

工具以原始bytes封存，當時工作樹及external工具路徑留在檔案中；重現前須在隔離暫存目錄還原，核對所列版本、來源與明示調整的本機path／port，選新輸出目錄並使用runner保存新receipt。不要直接覆蓋本輪證據、把tmp硬編碼當網站依賴，或把原測量改稱新執行。沒有node_modules／build產物／新npm依賴，也沒有認證憑證或實際客戶資料。

之後發生的commit、PR、exact-headCI、artifact下載與驗證結果記於同一PR Description；本目錄的pre-PR快照不預填尚未發生的遠端結果，也不為記錄自己的SHA再建循環commit。
