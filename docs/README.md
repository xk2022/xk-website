# XK Website 文件總索引

本目錄管理官方網站規格、設計、工作包、驗收及發布文件。公司層級規範仍由 `xk2022/xplore-kaleidoscope` 管理。

| 目錄 | 用途與入口 |
| --- | --- |
| `01_design/` | [設計索引](01_design/README.md)：[架構](01_design/design-collection/architecture.md)、[Design System](01_design/design-collection/design-systems.md)、[工作包](01_design/design-collection/work-packages.md) |
| `02_operations/` | 商務營運：[聯絡與回覆流程](02_operations/contact-response-workflow.md) |
| `03_engineering/` | [技術架構與工程索引](03_engineering/README.md)：[協作流程](03_engineering/subagent-workflow.md)、[Smoke](03_engineering/website-smoke.md)、[效能量測](03_engineering/performance-measurement.md)、[Design Collection 核心](03_engineering/design-collection-core.md) |
| `04_deployment/` | 發布與部署：[網域](04_deployment/custom-domain-deployment.md)、[發布前置](04_deployment/publication-readiness.md)、[SEO](04_deployment/seo-operations.md) |
| `task/` | [Roadmap](task/ROADMAP.md)、[任務索引](task/README.md)、正式規格、DC 工作包與 Bugfix backlog |
| `reports/` | [實作與驗收索引](reports/README.md)、原始證據封存 |
| `screenshots/` | 各任務實際畫面證據 |
| `98_decisions/` | [歷史與重複文件索引](98_decisions/README.md)、[歷史實作與決策](98_decisions/implementation-notes.md) |

## 維護規則

- 歷史報告及重複原稿集中於上述索引；保留真實快照，不再維護重複的現行入口。
- 根 [README](../README.md) 作為現行專案入口；歷史完整內容留在既有規格、報告及 Git 固定版本，不重複追加。

- 新規格放 `task/`，設計決策放 `01_design/`，實作完成另於 `reports/` 記錄真實結果。
- `task/`、`reports/`、`screenshots/` 保持原路徑，保護既有任務契約、證據 manifest、歷史網址及 Tailwind 排除設定；不為編號一致性重寫證據。
- 保留原始驗收、失敗與重驗，不將規劃視為已實作或已發布。歷史報告的原時點路徑可留作歷史描述；導覽連結指向目前實際文件。
- 檔名使用 kebab-case；保留既有 Task ID 命名。新增或搬移文件需同步更新根 README、AGENTS 及相關連結。
- 本次僅整理文件，不變更網站內容、路由、價格、SEO 發布狀態、DNS 或部署。

## 搬移對照

| 原位置（相對於 docs） | 新位置 |
| --- | --- |
| `design-collection/` | `01_design/design-collection/` |
| `contact-response-workflow.md` | `02_operations/contact-response-workflow.md` |
| `performance-measurement.md`、`subagent-workflow.md`、`website-smoke.md` | `03_engineering/` 同名文件 |
| `custom-domain-deployment.md`、`publication-readiness.md`、`seo-operations.md` | `04_deployment/` 同名文件 |
| `implementation-notes.md` | `98_decisions/implementation-notes.md` |
