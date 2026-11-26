# DC-001 架構與文件驗證紀錄

日期：2026-11-26。分支：`docs/design-collection-dc001`。本輪僅架構及設計規範，建立 PR 等待審閱；**沒有實作新系列、改正式首頁、合併、部署或變更 DNS**。

## 基準與交付

網站 main `8d7d97d33e4b6ee45f32cc75953c0e008c9951d7`，初始工作樹乾淨；公司最新 main `5be640ab11811b24706101ea13db73185e9ce4d8`。根 AGENTS／README／協作流程、現有資料／Layout／SEO／Next／workflow 及已安裝 Next.js 16.4.6 相關文件已核對。公司五份品牌文件補讀、四份工程／官網文件核對；同版本其餘已讀來源沿用固定紀錄，沒有聲稱重新下載全部公司文件。

公司根 AGENTS 缺檔、三系列未有既定正式定義、既有 Modern 與公司正式色票不同等限制，記於 [架構來源及差異](../design-collection/architecture.md#1-基準與來源)。沒有修改公司 Repository，沒有複製公司全文或內部價格資料。

新增 [DC-001 任務](../task/dc001.md)、[架構規格](../design-collection/architecture.md)、[三套 Design System 提案](../design-collection/design-systems.md)、[七個工作包](../design-collection/work-packages.md)；更新 README／AGENTS／任務索引／implementation notes 的必要入口。Modern 原 16 頁保留、完整目標 49 頁、單一技術 root／獨立 frame、共用資料及 Contact／Quotation 核心、Canonical／OG 分離、風格切換／PII／CSS／print 風險與驗收均明定。

## 實際檢查

本機文件檢查已完成，沒有阻擋項目；逐項結果、受驗文件雜湊、環境與真實退出回執見 [驗證 JSON](dc001-verification.json)。本輪沒有以網站歷史測試填 PASS。

| 範圍 | 方法／預期 |
| --- | --- |
| Markdown | 所有異動文件 fence 閉合、表格欄數、EOF／行尾空白、相對連結與 anchor 存在 |
| 來源／一致性 | 固定版本、公司缺 AGENTS、提案與批准界線、9 個內容 key＋Gallery、16／17／33／49、七包相依、245 cases 及 47 張網站圖算式一致 |
| Diff 範圍 | 僅核定 Markdown 與一份驗證 JSON 文件，沒有 src／public／package／lockfile／Next 設定／workflow／DNS 變更 |
| 既有清冊 | 現有 SEO registry 仍為 16 個公開頁，沒有把規劃 URL 放入正式清冊 |
| 獨立覆核 | 技術／品牌各一次只讀審查；修正 Luxury 先完成時的相依文字、現行服務並無詳頁、內鏈語意相同而 URL 隨風格轉換三點 |
| 程序證據 | 既有 runner 實際等待 doc checker，真實 Exit 0；原始命令及 log SHA 見驗證 JSON |

本輪沒有新增網站 UI，因此沒有本次畫面截圖、PDF、瀏覽器／axe／效能或全站功能的實測 PASS。它們屬未來功能包驗收，對本輪文件交付為 N/A。沒有在本機重跑無關的 npm install／TypeScript／Lint／Test／Build；原 CI 仍會在精確 PR head 執行品質與兩建置，結果另於同一 PR 記錄，不能借用 PR #28 作為本 PR 成功。

正式檢查命令：

```sh
python3 scripts/run-with-evidence.py \
  --receipt /tmp/xk-dc001/doc-check-v2-receipt.json \
  --log /tmp/xk-dc001/doc-check-v2.log \
  --timeout 120 -- python3 /tmp/xk-dc001/check-docs.py /tmp/xk-dc001/doc-check-v2.json
```

`git diff --check` 及最終 staged check 另行確認。`/tmp` 工具只做文件格式、連結、規格算式、原路由及 scope 檢查，沒有測新網站功能。Mermaid 僅做基本結構與人工語法覆核，沒有完整 renderer 渲染證據。

## 審閱及版本界線

- 來源覆核：同版品牌／服務／價格界線一致，未把新 palette、候選字體或三風格視為公司已批准識別；未發現阻擋。
- 技術覆核：完整頁數與截圖數算式一致；404 frame、CSS Module pipeline、全域 print 及 canonical 差異已列未來待驗，不聲稱本輪已實作或重現。
- 三處文件修正均已納入：Luxury 可先完成、Modern 是現行分類／卡片／頁內細項、外鏈不變而站內 href 由 resolver 轉換。
- 此次不新增 utility 範例；仍須核對 PR CI 實際 artifact，確認文件沒有被 Tailwind 誤掃成新 CSS。若有差異先追查、修正與重驗，不只以 CI 綠燈聲稱無 runtime 影響。
- 未發生的 Commit／PR 識別碼、PR CI、人工審閱、merge／main CI／部署不預填；後續遠端紀錄更新同一 PR Description，不為記錄自身 SHA 另作循環提交。

## 尚待審閱與後續

完整同資訊架構的 49 頁範圍、Heritage／Luxury 構圖及新 palette 在公司外框的適用界線、可選額外字體／素材，均供本次 PR 具體審閱。文件完成不等於品牌批准或新系列已上線。DC-002～DC-007 保持 PENDING，依當次任務與發布授權執行。
