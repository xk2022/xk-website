# XK 正式發布前置清單

建立／更新日期：2026-11-22（Asia/Taipei）。對應 BF-010、BF-015；本文件記錄決策與資料缺口，不是索引、法律政策或網域變更授權。

## 目前可確認的狀態

- 官網採 GitHub Actions → GitHub Pages；一般 Next.js production build 保留。
- 所有公開頁面仍為 noindex/nofollow；Sitemap 不發布，Privacy 草案不公開。
- 品牌網址與 Canonical 基準為 `https://xplorekaleidoscope.com`；Pages 可用網址為 `https://xk2022.github.io/xk-website/`。正式推廣網址與切換方式需要獨立決策，不把環境的 Tunnel 403 判為 DNS 故障。
- Contact 是否可用，僅由 [已確認管道](../src/config/contact.ts) 決定。本次已請使用者提供可公開且可收件的實際資料；沒有資料就不填入建議或猜測地址。
- [Privacy 設定](../src/config/privacy.ts) 仍為 draft-1，資料處理主體、生效日與權利聯絡管道未確認。先前未提供的法律核准，不會因合併網站修正而視為取得。

## 前置條件與證據

| ID | 項目 | 目前狀態 | 完成所需資料／證據 |
| --- | --- | --- | --- |
| PUB-01 | 商務聯絡管道 | BLOCKED | 使用者確認可公開的 Email／HTTPS 管道、接收對象與實際可用／收件紀錄；不以程式或 CI 成功替代 |
| PUB-02 | 正式對外網址 | BLOCKED | 使用者指定發布網址、需要變更的範圍與對應管理權限；確認 Pages、Canonical、重新導向及實際 HTTP |
| PUB-03 | 索引開放範圍 | PENDING | 明確的索引發布指示、可索引路由清單與實際內容核對；提案／模板不自動改為客戶成果 |
| PUB-04 | Privacy 同版本核准 | BLOCKED | 同一版本正文的 Owner／法律審閱紀錄、真實資料處理主體、有效權利管道、生效日 |
| PUB-05 | Sitemap／robots／搜尋驗證 | PENDING | PUB-02／03 決策完成後另行定義；GSC、驗證 token、DNS 或 Domain 需在當次授權範圍內 |
| PUB-06 | 發布驗證與回復方案 | PENDING | 發布版本與 CI、部署、公開 HTML／HTTP、連結／資源／404／Metadata 證據；問題時保留保護並記錄回復方式 |

BLOCKED 表示已確認目前缺少必要的外部資料；PENDING 表示尚未執行該發布工作。網站程式修正與此表分開驗收，可以交付已完成的功能，但不能宣稱正式索引或法律政策已發布。

## 當資料取得時

1. 記下使用者確認內容、版本、日期及公開範圍。只有真正可用的聯絡管道才寫入設定；對 Email 不寄送未經指示的測試訊息給其他人，優先採用使用者提供的收件證據。
2. 依當次指示分別處理 Contact、正式網址、索引與 Privacy，不把其中一項核准延伸至其他項。
3. 保留既有獨立本機與 Pages build、Base Path、未知路由及未發布內容保護；正式索引工作需另有更新後的驗收契約，不直接刪除守門檢查。
4. 分開記錄本機、PR CI、合併、main CI、部署與公開網址。合併或部署成功不能替代資料主體／法律／權利管道核准。

本輪不新增 Backend、表單、個資收集、Analytics、發布開關、GSC 設定或平台 Secrets，也不變更 DNS／Custom Domain／Pages Source。
