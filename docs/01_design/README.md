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
| 7 | [DC-005 完整實作報告](../reports/dc005-implementation.md) | 已合併 Luxury 16 頁的實作、驗收與限制 |
| 8 | [Heritage v1 品牌核准](design-collection/reviews/heritage-v1-approval.md)／[DC-004 完整實作報告](../reports/dc004-implementation.md) | 已合併系列的版本核准、功能驗收與限制 |
| 9 | [合併整合報告](../reports/design-collection-integration.md) | 33→49 頁版本界線及實際 merge／部署／公開事件 |
| 10 | [DC-006 規格](../task/dc006.md)／[本輪報告](../reports/dc006-implementation.md) | 三系列切換、導航與 SEO 整合；本機功能與版面驗收完成，最終 CI／artifact 待新 PR |

目前正式 main `9322810f27e74e5ed4faa35a3b3931b3719f0c9a` 已合併並發布 Modern／Heritage／Luxury 各 16 頁及 Gallery，共 49 頁。PR #40／#42 的實際 merge、main CI／Pages 及公開驗證見 [整合報告](../reports/design-collection-integration.md)，原系列規格、審閱核准與報告保留版本邊界。

本分支 `feature/design-collection-navigation-seo` 正執行 [DC-006](../task/dc006.md)／[工作包 §8](design-collection/work-packages.md#dc006)：三套 Frame 的共用風格切換、Header／Footer／CTA href 映射與 Gallery 七個主頁的三系列比較。沿用已核准品牌與同源資料，不引入新的 palette、字體、Logo 或價格差異。共用導航與三套呈現已接入，本機功能與版面驗收已完成；原始 incomplete／網路診斷及限定重驗詳見本輪報告，不概稱所有測試 PASS。

[DC-006 報告](../reports/dc006-implementation.md) 保留實際退出碼與診斷；[本輪截圖](../screenshots/design-collection/dc006/) 為 18 張實際 Pages 畫面，已逐張檢視。最終 CI／artifact 待新 PR；交付審閱，不自動合併或發布；DC-007 尚未開始。最新狀態以 [根 README](../../README.md)／[Roadmap](../task/ROADMAP.md) 為準。

技術資料夾、建置及測試入口見 [工程索引](../03_engineering/README.md)。公司正式品牌規範仍由 [公司文件](https://github.com/xk2022/xplore-kaleidoscope) 管理；不將風格提案視為已核准公司識別。
