# 歷史與重複文件索引

DOC-003 於 2026-11-26 整理，基準 `c9481a09a9b46d4e724ccd34fb9484b02ff64546`。本索引只收斂既有文件入口，不新增產品、架構、品牌、價格、部署或驗收定義。

| 重複／歷史來源 | 閱讀與維護入口 | 處理 |
| --- | --- | --- |
| `reports/implementation-notes.md` | [延續實作紀錄](implementation-notes.md) | 原報告是早期 Task 001～008／協作流程快照；保留，不再並行追加 |
| `task/bugfix005.md`、`bugfix006.md`、`bugfix007.md` | [共同原始建議](../task/bugfix005.md) | 三份 Git Blob 完全相同（`ea4740378a5bc8acd8257286de26459ffefec415`）；合併閱讀，不視為三項獨立工作，原始 ID 與檔案保留 |
| `task/temp.md` | [歷史原稿](../task/temp.md)、[Task 007](../task/task007.md)、[實作報告](../reports/task007-implementation.md) | 早期技術分析指示，非現行工作命令或權威規格 |
| 舊根 README | [重構前固定版本](https://github.com/xk2022/xk-website/blob/9a7ca8ebef026b6be49e8fe51f3afa1057a3768b/README.md) | 歷史逐 Task 內容保留；[根 README](../../README.md) 只呈現專案現況 |
| DC-001 早期提案 | [架構](../01_design/design-collection/architecture.md)、[工作包](../01_design/design-collection/work-packages.md) | 舊審閱與交付時點保留；以任務索引追蹤最新狀態 |

早期實作快照與延續紀錄不是完全相同的檔案，因歷史紀錄、引用及後續追加不同，不直接刪除或覆寫來源。三份重複 Bugfix 的原件亦保持原狀：[005](../task/bugfix005.md)、[006](../task/bugfix006.md)、[007](../task/bugfix007.md)。

## 查找方式

- 現況與快速入門：[根 README](../../README.md)。
- 目前任務及規格：[任務索引](../task/README.md)。
- 既有交付與原始驗收：[報告索引](../reports/README.md)。
- 歷史演進：[延續紀錄](implementation-notes.md)；早期 [原始報告快照](../reports/implementation-notes.md) 保留原時點，不作當前狀態來源。
- 共通協作及發布：[文件總索引](../README.md)。

## 整理驗證

已以 main 的 Git tree 檢查 Markdown 文件清冊、相同 Blob 的重複檔與兩份歷史紀錄的章節，並逐項建立交叉引用。原報告、原始規格、證據資產、來源程式及發布設定沒有移動、刪除或改寫；本次由文件索引集中導覽避免重複維護。
