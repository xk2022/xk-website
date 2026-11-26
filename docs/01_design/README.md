# 官網品牌與 Design Collection 文件入口

本索引沿用已合併 DC-001 架構與 DC-002 核心契約，不新增風格、色票或設計規則。

| 閱讀順序 | 文件 | 用途 |
| --- | --- | --- |
| 1 | [架構規格](design-collection/architecture.md) | 三風格定位、共用來源、路由及 SEO 決策 |
| 2 | [三套 Design System](design-collection/design-systems.md) | Modern 基準、Heritage／Luxury 設計提案與核准邊界 |
| 3 | [DC-001～007 工作包](design-collection/work-packages.md) | 開發順序、範圍、驗收 |
| 4 | [DC-002 核心 API](../03_engineering/design-collection-core.md) | 已實作的共用內容、路由、Metadata、互動及 Token 契約 |
| 5 | [實作報告索引](../reports/README.md#design-collection) | 規格與實際驗證證據 |

目前正式 `main@4500ccf` 為 Modern 16 頁與 Gallery，共 17 頁。本次 Heritage 交付保留 [v1 品牌核准](design-collection/reviews/heritage-v1-approval.md)、[完整 DC-004](../task/dc004.md) 與 [實作驗證](../reports/dc004-implementation.md)，清冊為 33 頁。

Luxury 的 [v1 審閱稿](design-collection/reviews/luxury-v1.md) 已經使用者「批准合併」核准，並由 [PR #41](https://github.com/xk2022/xk-website/pull/41) 合併；原型及前置報告保持歷史快照，不作正式功能頁輸出。[DC-005](../task/dc005.md) 的完整功能在 [PR #42](https://github.com/xk2022/xk-website/pull/42)，尚未合併、未引入本次 Heritage 程式。

使用者已授權依序合併 PR #40／#42，再執行 DC-006；實際合併、CI、部署與公開驗證尚須分階段記錄。最新進度以 [根 README](../../README.md)／[任務索引](../task/README.md) 為準。

技術資料夾、建置及測試入口見 [工程索引](../03_engineering/README.md)。公司正式品牌規範仍由 [公司文件](https://github.com/xk2022/xplore-kaleidoscope) 管理；不將風格提案視為已核准公司識別。
