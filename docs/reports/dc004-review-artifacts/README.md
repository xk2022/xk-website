# DC-004 品牌前置證據

日期：2026-11-26。適用範圍與 Test ID 見 [報告](../dc004-brand-review.md)，設計見 [審閱稿](../../01_design/design-collection/reviews/heritage-v1.md)。原型 SHA `5d5f784ccdd75cc6c721879a1b09a833f28f694d9b2b72067e8550cb75a00509`；來源／截圖與工具另有 manifest。

- `static-v1/v2/v3`：相對素材失敗、修復及 favicon 後重驗的 receipts／logs。工具 `check-prototype.mjs` 為已修路徑的 v2，`check-prototype-v3.mjs` 包含新增 favicon 引用數。
- `prototype-browser*`：第一輪 favicon Console 404（Exit 1）及修復後 28 assertions 通過、3 個待判 axe non-text-arrow（真 Exit 2），原始 axe／computed contrast 保留。
- `prototype-adjudication*`：只界定那三筆的實測色彩／父連結文字／aria-hidden 及 focus／邊界對比；額外 Exit 0 不改 raw Exit 2，也不是讀屏測試。
- `build-pages`／`output-bridge*`：實際建置、來源僅掃描排除、154 runtime raw hash 等價、286 輸出 Build ID 限定比較與無原型 export。
- `main-ci`／`live-dc003*`：前置 DC-003 的真實 main run 與正式網址 1,110 項 HTTP PASS，非本審閱分支部署。
- `live-browser*`：保留兩次環境代理憑證失敗，以及明示 `ignoreHTTPSErrors` 的功能診斷；不當作 TLS 驗收。
- `final-check*`：文件、Diff、秘密、清冊與證據完整性。新增報告的遠端 CI／PR 事件記在同一 PR Description。

JSON／log／工具以 `.gz` 保存；解壓後 SHA 與 receipts 對應。`SHA256SUMS` 驗原始交付檔；`source-review.json` 固定本稿／網站 runtime 來源指紋。工具原路徑為 `/tmp/xk-dc004-review/`，重現時先解壓到新暫存目錄，按 repo 與 loopback port 調整路徑；結果檔／receipt 每次使用新名稱，勿覆寫舊證據。

沒有第三方帳號、收件測試、TLS 認證、正式價格或品牌核准證據；不把 PENDING／BLOCKED 當作 PASS。完整 DC-004 另依原工作包，不因本次精簡的前置審閱矩陣減少驗收。
