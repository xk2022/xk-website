# 官網技術架構與工程入口

更新：2026-11-27。目前三系列各 16 頁與 Gallery，共 49 個公開網址；工程目錄依公司最新版共用首層規範整理。詳細搬移、操作及歷史證據相容方式見 [Repository 結構](repository-layout.md)。舊 DC-003 的 17 頁架構描述保留於 [整理前固定版本](https://github.com/xk2022/xk-website/blob/075aaa0e4a382fbab442b85931269915c626ac37/docs/03_engineering/README.md)，不再當作現況。

## 現行架構

| 層級 | 實際來源與職責 |
| --- | --- |
| 網頁與 Layout | [frontend/src/app](../../frontend/src/app)：單一技術 root、Modern 群組、Gallery、Heritage／Luxury 路由 |
| 呈現與共用元件 | [frontend/src/components](../../frontend/src/components)：品牌、Layout、Sections、UI 與三系列呈現 |
| 內容設定 | [frontend/src/config](../../frontend/src/config)：品牌、服務、作品、聯絡、試算及 SEO 的單一來源 |
| 共用邏輯 | [frontend/src/lib](../../frontend/src/lib)：SEO、聯絡草稿、試算及 Design Collection 核心 |
| Design System | [frontend/src/design-systems](../../frontend/src/design-systems)：各系列 scoped tokens／recipes |
| 靜態素材 | [frontend/public](../../frontend/public)：品牌、圖示、案例、QR 與授權文字 |
| 前端品質工具 | [frontend/scripts](../../frontend/scripts)：建置、單元測試、fixtures、HTTP smoke |
| 跨元件工具 | [scripts](../../scripts)：OS 退出回執、不可變證據引用核對 |
| 發布 | [CI workflow](../../.github/workflows/ci.yml)：PR 品質／Pages artifact，main 發布 |
| 文件 | [文件索引](../README.md)：設計、營運、工程、部署、任務、報告及證據 |

版本以 [package.json](../../frontend/package.json) 與 [lockfile](../../frontend/package-lock.json) 為準；Next.js App Router、React、TypeScript、Tailwind CSS 4、shadcn/ui、Lucide、Node.js 24 與獨立靜態官網架構沿用。保留目錄沒有啟用 Backend 或資料庫。

## 三風格現況

| 項目 | 現況與來源 |
| --- | --- |
| Modern | 16 頁，保留根網址與 ModernFrame |
| Heritage | 16 頁，獨立編輯式版面與 scoped tokens；[核准紀錄](../01_design/design-collection/reviews/heritage-v1-approval.md) |
| Luxury | 16 頁，獨立深色／金色版面與 scoped tokens；[核准紀錄](../01_design/design-collection/reviews/luxury-v1-approval.md) |
| Gallery／切換 | 三系列入口與同頁識別；registry／路由／導航集中於共用核心 |
| 內容與 SEO | 共用資料；Modern canonical、展示系列 canonical／OG 分工、全站 noindex/nofollow |
| 聯絡／試算 | 共用本機草稿、參考計算、選項 ID storage 與 A4；沒有站內收件 |

已提供的三套版面與 DC-007 的完整發布驗收是不同狀態；效能、網路未知與真人讀屏缺口見 [R01 報告](../reports/dc007-r01-performance.md)，不因整理或合併改為 PASS。

## 工程文件索引

| 需求 | 入口 |
| --- | --- |
| 快速啟動、版本、建置 | [根 README](../../README.md)、[Repository 結構](repository-layout.md) |
| 協作、分支、驗收 | [AGENTS](../../AGENTS.md)、[協作流程](subagent-workflow.md) |
| 共用核心 API、狀態與隔離 | [核心契約](design-collection-core.md) |
| 本機／Pages HTTP 驗收 | [Smoke](website-smoke.md) |
| 字體與效能 | [字體來源／重生](../../frontend/src/app/fonts/README.md)、[效能量測](performance-measurement.md) |
| 三系列維護與 rollback | [維護指南](design-collection-maintenance.md) |
| 正式網址及發布門檻 | [網域](../04_deployment/custom-domain-deployment.md)、[SEO](../04_deployment/seo-operations.md)、[發布清單](../04_deployment/publication-readiness.md) |
| 進度與驗證 | [任務索引](../task/README.md)、[報告索引](../reports/README.md) |
