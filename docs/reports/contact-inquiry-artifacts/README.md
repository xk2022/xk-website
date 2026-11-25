# Contact 需求整理表單驗證證據

來源與驗收結論見 [實作報告](../contact-inquiry-form.md)。本資料不代表直接線上提交、郵件送達或正式部署。

- `manifest.json`：原始檔 SHA／尺寸、兩個來源版本、命令狀態與截圖對應。
- `evidence.json.gz`：UTF-8 JSON，`files` 以原始工作區路徑記錄完整文字與 SHA。保留 FAIL／重試、程序退出碼、smoke、focused browser、source snapshots、工具版本及獨立網路補驗，沒有刪除不利結果。
- 圖片存於 `docs/screenshots/contact-inquiry/`，第一次 Pages 實際檢視與 v2 byte-identical bridge 一起保存。

重現基本驗收：`npm ci`、`npx tsc --noEmit`、`npm run lint`、`node scripts/test-contact-inquiry.mjs`、`npm run build`，啟動一般 server 後執行 `npm run test:smoke -- --base-url http://127.0.0.1:3200/ --output /tmp/contact-smoke.json`。停止 server，再執行 `npm run build:pages`，使用獨立靜態 server 驗收 `out/`，不能以 Next start 代替。

瀏覽器工具保存在壓縮資料，使用臨時環境的 Playwright Core／axe，而非新 app dependencies。重跑時先調整工具的套件絕對路徑與輸出目錄，使用新的 run 名稱及 runner receipt，不能覆寫既有失敗；正式參數為 `normal|pages`、loopback root URL、run 名稱，`XK_QA_SOURCE_FILE` 指向受測 source manifest。所有 mailto 必須攔截，不能用重跑工具實寄訊息。

Pages 組合驗收保留原 suite 的 Exit 1；32 項 UI／axe／截圖斷言與 8 個 HEAD 取消探查的獨立補驗分開閱讀。補驗不回填原 HEAD 的未知回應。未實測真機／完整輔助科技，也未啟用任何第三方收件服務。
