# 官網品牌與 Design Collection 文件入口

本索引彙整已合併架構、共用核心及各系列的版本核准與實作入口；實際設計適用範圍以對應規格及核准紀錄為準。

| 閱讀順序 | 文件 | 用途 |
| --- | --- | --- |
| 1 | [架構規格](design-collection/architecture.md) | 三風格定位、共用來源、路由及 SEO 決策 |
| 2 | [三套 Design System](design-collection/design-systems.md) | Modern 基準、三系列設計方向與版本核准邊界 |
| 3 | [DC-001～007 工作包](design-collection/work-packages.md) | 開發順序、範圍、驗收 |
| 4 | [DC-002 核心 API](../03_engineering/design-collection-core.md) | 已實作的共用內容、路由、Metadata、互動及 Token 契約 |
| 5 | [實作報告索引](../reports/README.md#design-collection) | 規格與實際驗證證據 |
| 6 | [Luxury v1 品牌核准](design-collection/reviews/luxury-v1-approval.md) | PR #41 的同版本 palette、外框、字階與版型核准範圍 |
| 7 | [DC-005 完整實作報告](../reports/dc005-implementation.md) | 本功能分支 16 個 Luxury 頁面的實作、正式驗收與限制 |
| 8 | [Heritage v1 品牌核准](design-collection/reviews/heritage-v1-approval.md)／[DC-004 完整實作報告](../reports/dc004-implementation.md) | 已合併系列的版本核准、功能驗收與限制 |
| 9 | [合併整合報告](../reports/design-collection-integration.md) | 33→49 頁版本界線、此次新驗收與實際遠端事件 |

目前正式 `main@0d41ecf495e55b792f966c9fe27bd07c27bc5647` 已合併 Heritage PR #40，清冊為 Modern 16＋Gallery＋Heritage 16，共 33 頁；main CI、Pages 部署及正式 33 頁 HTTP 驗證已完成（run 45796333591）。[Heritage v1 品牌核准](design-collection/reviews/heritage-v1-approval.md)、[完整 DC-004](../task/dc004.md) 與 [實作驗證](../reports/dc004-implementation.md) 均保留。

Luxury 的 [v1 品牌核准](design-collection/reviews/luxury-v1-approval.md) 與 [PR #41](https://github.com/xk2022/xk-website/pull/41) 已成立；原 [審閱稿](design-collection/reviews/luxury-v1.md) 與品牌前置證據保留歷史快照，原型 HTML 不作網站頁面輸出。本分支保留 [DC-005 完整規格](../task/dc005.md) 與 [實作報告](../reports/dc005-implementation.md)，正將 [PR #42](https://github.com/xk2022/xk-website/pull/42) 與已核准 main 整合，三系列清冊 49 頁，待新驗收。

使用者已授權 PR #40／#42 依序合併，再執行 DC-006；PR #42 尚未合併，DC-006 尚未開始，其新 PR 不自動合併。各版本測試、合併、CI、部署與公開驗證分階段記錄於 [整合報告](../reports/design-collection-integration.md)。最新進度以 [根 README](../../README.md)／[任務索引](../task/README.md) 為準。

技術資料夾、建置及測試入口見 [工程索引](../03_engineering/README.md)。公司正式品牌規範仍由 [公司文件](https://github.com/xk2022/xplore-kaleidoscope) 管理；不將風格提案視為已核准公司識別。
