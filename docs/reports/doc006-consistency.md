# DOC-006｜文件一致性與交叉引用檢查

核對日期：2026-11-26（Asia/Taipei）。基準 main `aa100adfad24b74ccb39d2df811b613c4d6a15ef`，對應 [成功的 main CI／Pages 部署](https://github.com/xk2022/xk-website/actions/runs/45744458033)。本輪僅整理文件，不新增產品、架構、發布或驗收規範。

## 發現與處理

| 項目 | 初始結果 | 處理 |
| --- | --- | --- |
| Markdown 清冊 | 80 份已追蹤 Markdown（含根 README、AGENTS、docs 及 public） | 全部納入相對 link／fragment 與 fence 掃描 |
| 相對引用 | 830 個，10 個不存在 | 四份歷史報告對兩份已刪除的 Task 001／002 原稿引用改用已存在的固定歷史快照 |
| Markdown heading／明示 anchor | 6 個站內 fragment 均存在 | 保留 |
| Code fence | 無未閉合 fence | 保留 |
| 歷史 temp 入口 | 任務索引誤標為 Task 006–014 規格撰寫指示 | 標明是 Task 007 歷史分析指示，現行進度由 Roadmap 管理 |
| Roadmap | DOC-005 已合併但仍顯示本文件交付 | 更新 PR #37 與實際 main CI，DOC-006 連本報告 |

歷史連結修復採用 Task 001／002 正式規格已引用的 Commit `895b9878b6c6244cf225772f6c4f8d3e5d97affe`。已讀回確認 [Task 001 原稿](https://github.com/xk2022/xk-website/blob/895b9878b6c6244cf225772f6c4f8d3e5d97affe/docs/task/task001-implementation-notes.md) 與 [Task 002 繁體原稿](https://github.com/xk2022/xk-website/blob/895b9878b6c6244cf225772f6c4f8d3e5d97affe/docs/task/task002.zh-TW.md) 存在。四份報告只修正連結目的地，既有描述、測試數字與證據保持原樣；不重新建立已刪除的原規格。

## 一致性邊界

- [根 README](../../README.md)、[文件總索引](../README.md)、[任務索引](../task/README.md)、[Roadmap](../task/ROADMAP.md)、[工程索引](../03_engineering/README.md)、[設計索引](../01_design/README.md) 與 [報告索引](README.md) 保持同一導覽層級。
- DC-001／002 已合併；Modern 現有 16 頁，Gallery 與兩款新風格仍未發布。49 頁是後續目標；DC-003 是文件收斂後下一個功能工作包。
- PR #18、#29 仍為 open，不被本次文件任務關閉或合併。正式政策、價格、索引及直接收件等發布界線不變。
- 外部任意網址及歷史時點的環境不在全量 HTTP 驗證範圍；只對發現失效的兩個固定歷史來源重新確認。相對路徑與 Markdown fragment 的檢查不是所有外部連結的即時可用性保證。

## 交付驗證

最終掃描 81 份 Markdown、830 個相對引用、6 個 Markdown fragment：失效引用 0、未閉合 fence 0；Git staged Diff 格式檢查通過。另檢出 209 個外部 Markdown 連結，未宣稱逐一 HTTP 驗證。只異動 Markdown，不修改網站程式、依賴、素材、歷史證據、部署或業務設定。PR CI、合併與 main 部署以本次實際遠端事件為準。
