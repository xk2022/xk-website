二、建議修正的六個地方

1. 文件標準化仍有格式問題
   部分文字與 Markdown 標題黏在一起，例如：

Task001既有結果

Required／Optional／Not Applicable與原因

五寬

Base Path

建議統一中英文、數字與 Markdown 標題的空格。

這不影響功能，但有助於後續文件一致性。

2. 缺少測試失敗的處理規則
   目前有 PASS／FAIL／N/A，但沒有明確定義失敗後的交付條件。

建議增加：

markdown

### Test Failure Policy

- FAIL 不得標記為 PASS。
- 發現問題必須記錄原因、影響範圍及修正方式。
- 可修正問題應先修正，再重新執行相關測試。
- 無法修正的問題必須列入 Known Issues。
- 存在阻礙交付的 FAIL，不得宣稱任務完整通過。
- 不得透過跳過測試、降低驗收標準或隱藏錯誤取得 PASS。
- 外部服務、權限或環境造成的阻礙，必須記錄實際原因。
  這是我認為最重要的補強。

3. 測試報告應該明確區分證據
   建議在第 12 節增加：

markdown

### Evidence Requirements

每項測試應盡可能提供：

| 欄位                | 說明                                      |
| ------------------- | ----------------------------------------- |
| Test ID             | 唯一測試識別碼                            |
| Test Item           | 測試項目                                  |
| Command / Procedure | 實際執行指令或操作                        |
| Environment         | OS、Node.js、npm、Browser                 |
| Expected Result     | 預期結果                                  |
| Actual Result       | 實際結果                                  |
| Exit Code           | 真實退出代碼                              |
| Status              | PASS / FAIL / N/A                         |
| Evidence            | Log、Screenshot、HTTP Response 或其他證據 |
| Notes               | 問題與限制                                |

不得只寫「測試通過」而沒有可追溯的驗收依據。4. 缺少正式測試報告的完成門檻
目前已經要求獨立報告，但建議再明確規定：

報告必須在 PR 建立前完成。

報告必須納入本次功能 PR。

報告與實際程式碼版本必須一致。

最後一次測試必須對應實際提交的程式碼。

後續修改程式碼時，受影響測試必須重新執行。

避免出現程式碼已提交，測試報告卻沒有更新的情況。

5. 缺少 PR Review 與合併後驗證的界線
   建議明確區分：

本機開發與驗收。

Feature Branch Commit。

PR CI 驗收。

PR Review。

使用者授權合併。

合併後 main CI。

正式部署與公開網址驗證。

尤其不能把 PR CI 通過直接視為正式網站部署成功。

6. Checklist 的狀態定義不夠清楚
   目前所有項目都是 Pending，這是正確的初始狀態。

但建議正式執行時統一使用：

狀態

意義

PENDING

尚未執行

PASS

已執行且通過

FAIL

已執行但未通過

BLOCKED

因外部條件無法執行

N/A

經判定不適用，並記錄理由

不要把 BLOCKED 與 N/A 混在一起。
