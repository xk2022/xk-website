# 實作報告與驗收索引

本索引集中查找已交付工作及原始證據，不重述測試結果。每份報告是特定版本的快照，最新合併、部署與未完成事項以 [任務索引](../task/README.md)、[GitHub PR](https://github.com/xk2022/xk-website/pulls) 及實際 CI 為準。

## 基礎與主要頁面

| 任務 | 原始規格 | 實作／驗收 |
| --- | --- | --- |
| 001 基礎 | [Task 001](../task/task001.md) | [歷史實作](../98_decisions/implementation-notes.md#task-001-implementation-notes) |
| 002 設計系統 | [Task 002](../task/task002.md) | [品牌設計](brand-design-system.md) |
| 003 首頁 | [Task 003](../task/task003.md) | [首頁](homepage-implementation.md)、[Pages 歷史部署](github-pages-deployment.md) |
| 004 About | [Task 004](../task/task004.md) | [About](about-implementation.md) |
| 005 Services | [Task 005](../task/task005.md) | [Services](services-implementation.md) |
| 006 Solutions | [Task 006](../task/task006.md) | [報告](task006-implementation.md) |
| 007 Portfolio | [Task 007](../task/task007.md) | [報告](task007-implementation.md) |
| 008 Contact | [Task 008](../task/task008.md) | [報告](task008-implementation.md) |
| 009 Privacy | [Task 009](../task/task009.md) | [報告](task009-implementation.md) |
| 010 SEO | [Task 010](../task/task010.md) | [報告](task010-implementation.md) |
| 011 效能 | [Task 011](../task/task011.md) | [報告](task011-implementation.md)、[證據](task011-artifacts/README.md) |
| 012 可及性 | [Task 012](../task/task012.md) | [報告](task012-implementation.md)、[證據](task012-artifacts/README.md) |
| 013 Vercel | [Task 013](../task/task013.md) | [準備報告](task013-implementation.md)、[證據](task013-artifacts/README.md) |
| 014 網域 | [Task 014](../task/task014.md) | [網域操作](../04_deployment/custom-domain-deployment.md)、[根路徑修正](custom-domain-assets-2026-11-23.md)（非完整 Task 014 結案） |

## 官網改善、作品與詢價

| 主題 | 原始報告 |
| --- | --- |
| BF-001～008 | [改善與採用矩陣](bugfix001-008-implementation.md)、[證據](bugfix001-008-artifacts/README.md) |
| 作品展示 | [整合](website-showcases-implementation.md)、[排序](brand-showcase-order-implementation.md) |
| BF-009～016 | [待辦](../task/bugfix-backlog-2026-11-22.md)、[改善報告](bf009-016-implementation.md) |
| 詢價入口 | [首頁 CTA](homepage-inquiry-cta.md)、[方案及案例網域](contact-plans-usecase.md) |
| Contact 需求整理 | [本機表單](contact-inquiry-form.md)、[證據](contact-inquiry-artifacts/README.md) |
| 客戶試算 | [規格](../task/quotation-estimator-v1.md)、[報告](quotation-estimator-v1.md) |

## Design Collection

| 任務 | 文件 |
| --- | --- |
| DC-001 | [規格](../task/dc001.md)、[架構報告](dc001-architecture.md) |
| DC-002 | [規格](../task/dc002.md)、[共用核心](../03_engineering/design-collection-core.md)、[報告](dc002-implementation.md)、[證據](dc002-artifacts/README.md) |
| DC-003 | [規格](../task/dc003.md)、[報告](dc003-implementation.md) |
| DC-005 品牌前置 | [規格](../task/dc005.md)、[v1 審閱稿](../01_design/design-collection/reviews/luxury-v1.md)、[驗證報告](dc005-brand-review.md)；完整實作等待品牌核准 |
| DC-004／006～007 | [工作包](../01_design/design-collection/work-packages.md)，未完成工作不以計畫充當報告 |

## 證據保存

文件整理收斂：[DOC-006 一致性與交叉引用檢查](doc006-consistency.md)。

各報告旁的 JSON、壓縮檔、manifest 及原始工具依既有路徑保留；畫面見 [screenshots](../screenshots)。不可把不同版本的 PASS 改成當前版本；不得刪除原始失敗、重驗資料或以本索引代替實際記錄。

早期 [implementation-notes.md](implementation-notes.md) 是 Task 001～008 及協作流程的歷史快照，與 [延續紀錄](../98_decisions/implementation-notes.md) 有重疊，原檔保留以支援來源追溯；後續不並行追加。完整閱讀順序見 [歷史與重複文件索引](../98_decisions/README.md)。
