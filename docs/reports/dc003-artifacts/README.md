# DC-003 本機驗收證據

日期：2026-11-26。結論／限制見 [報告](../dc003-implementation.md)，真實畫面與 PDF 見 [screenshots](../../screenshots/design-collection/dc003/README.md)。

- receipts 原命令／OS退出碼／時間／log SHA保持原樣；`.gz` 解壓內容對應原SHA，`SHA256SUMS`核對實際提交檔。失敗與MANUAL_PENDING未改標。
- baseline來源794b076，交付base在source-final與報告；source-v1/v2/v3/final各自保存。Source-current pointer供當時工具使用，不替代每份結果內嵌的SHA。
- normal-v2/result是132斷言全部PASS但axe待判讀的原始JSON；final normal runtime bridge與normal-gates-final/normal-smoke-final證明最後恢復gate原序後的適用界線，詳報告。
- pages-final/result是最後Pages原始JSON。兩模式Browser真Exit2代表等待人工判讀；各自191節點後續離線判定與Root實際圖檢另記，不偽造Browser Exit0。
- normal-v2/axe-adjudication-with-menu-v3與pages-final/axe-adjudication-with-menu-v2是各模式最終contrast判定。Menu原始完整資料壓縮保存；Normal原json對應.json.gz，Pages本來即gzip。每組7原PNG在screenshots/menu/，其SHA仍對應原index。
- 原Pages menu-overlap是HEAD政策誤判FAIL；menu-overlap-v2才是新收有效資料。精確同源公開路徑/null-body/無query與認證或測試canary條件保留，POST等仍不准。
- normal-v2/pdf-verification是原graphics FAIL；pdf-verification-v2與pages-final/pdf-verification為修正後嚴格判讀，原PDF未改。只識別三個已證實的白底canvas簽名；文字、Logo、QR與非背景paint仍嚴格界內。
- visual-comparison-final是未排除React ID的原FAIL；visual-adjudication-v2只對唯一menu trigger/panel的兩個對應ID作相同語意驗證，其他tokens/pixels/DOM都不正規化。原/衍生PNG可由screenshots與工具重現，保留全部差異JSON/diff。
- tools是實際QA工具與修正前版本，沒有加入app/npm依賴；使用外部Playwright/axe與PDF工具的版本、路徑與CLI在原receipts。重現可解壓至/tmp/xk-dc003，不部署這些工具。
- ssr只有指定五頁的必要壓縮HTML證據，沒有提交完整out/.next/node_modules、私有來源正文或簽名下載URL。
- 精確Commit/PR CI與實際artifact後續更新同一PRDescription；本目錄是PR前快照，不是部署證據。
