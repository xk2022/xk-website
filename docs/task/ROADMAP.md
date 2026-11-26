# XK Website Roadmap｜開發進度總表

核對日期：2026-11-26（Asia/Taipei），基準 main `aa100adfad24b74ccb39d2df811b613c4d6a15ef`；[該版本 CI／Pages 部署](https://github.com/xk2022/xk-website/actions/runs/45744458033) 成功。

本表彙整既有任務與實際合併事件，不新增工作範圍、規範或承諾。Task 規格、工作包與歷史報告仍保留原始內容；最新 GitHub／部署狀態應以對應 PR、實際 run 與公開驗證為準。合併不代表未核准的法律、索引、價格或業務項目已完成。

## 1. 官網基礎任務（001～014）

| 任務 | 現況 | 證據與剩餘範圍 |
| --- | --- | --- |
| [Task 001](task001.md) 基礎環境 | 已合併 | [PR #1](https://github.com/xk2022/xk-website/pull/1)、[歷史紀錄](../98_decisions/implementation-notes.md) |
| [Task 002](task002.md) Design System | 已合併 | [PR #2](https://github.com/xk2022/xk-website/pull/2)、[報告](../reports/brand-design-system.md) |
| [Task 003](task003.md) 首頁 | 已合併 | [PR #3](https://github.com/xk2022/xk-website/pull/3)、[報告](../reports/homepage-implementation.md) |
| [Task 004](task004.md) About | 已合併 | [PR #4](https://github.com/xk2022/xk-website/pull/4)、[報告](../reports/about-implementation.md) |
| [Task 005](task005.md) Services | 已合併 | [PR #5](https://github.com/xk2022/xk-website/pull/5)、[報告](../reports/services-implementation.md) |
| [Task 006](task006.md) Solutions | 已合併 | [PR #10](https://github.com/xk2022/xk-website/pull/10)、[報告](../reports/task006-implementation.md) |
| [Task 007](task007.md) Portfolio | 已合併 | [PR #11](https://github.com/xk2022/xk-website/pull/11)、[報告](../reports/task007-implementation.md)；規劃案例不當作交付成果 |
| [Task 008](task008.md) Contact | 已合併 | [PR #12](https://github.com/xk2022/xk-website/pull/12)、[PR #27](https://github.com/xk2022/xk-website/pull/27)；[資訊頁](../reports/task008-implementation.md)、[需求整理表單](../reports/contact-inquiry-form.md)；不直接收件 |
| [Task 009](task009.md) Privacy | 技術保護已合併；正式政策待核准 | [PR #14](https://github.com/xk2022/xk-website/pull/14)、[報告](../reports/task009-implementation.md) |
| [Task 010](task010.md) SEO | 保護模式已合併；正式索引待核准 | [PR #15](https://github.com/xk2022/xk-website/pull/15)、[報告](../reports/task010-implementation.md) |
| [Task 011](task011.md) 效能 | 技術成果已合併 | [PR #16](https://github.com/xk2022/xk-website/pull/16)、[報告](../reports/task011-implementation.md)；field CWV 未驗證 |
| [Task 012](task012.md) 可及性 | 技術成果已合併 | [PR #17](https://github.com/xk2022/xk-website/pull/17)、[報告](../reports/task012-implementation.md)；未測平台保留限制 |
| [Task 013](task013.md) Vercel | 準備已合併；正式部署待確認 | [PR #19](https://github.com/xk2022/xk-website/pull/19)、[報告](../reports/task013-implementation.md) |
| [Task 014](task014.md) 網域 | www 根路徑修正已合併；不宣稱完整 Task 014 結案 | [PR #25](https://github.com/xk2022/xk-website/pull/25)、[報告](../reports/custom-domain-assets-2026-11-23.md)、[發布前置](../04_deployment/publication-readiness.md) |

## 2. 官網改善（BF-001～016）

BF-001～008 依 [PR #20](https://github.com/xk2022/xk-website/pull/20) 合併範圍及 [採用矩陣](../reports/bugfix001-008-implementation.md) 整理；005～007 原稿相同，不重複計為三項實作。

| ID | 已採用／待辦 |
| --- | --- |
| BF-001 | 首頁價值、標籤與真實作品入口 |
| BF-002 | 五服務卡與實際連結 |
| BF-003 | 技術能力分類 |
| BF-004 | Why XK 整合價值 |
| BF-005 | Solutions 詳解與條件式交付 |
| BF-006 | 同 BF-005，共用實作 |
| BF-007 | 同 BF-005；獨立方案路由、索引仍待後續 |
| BF-008 | 共用 Logo 路徑及原 Symbol；未核准 OG 圖仍待確認 |

BF-009～016 以 [PR #24](https://github.com/xk2022/xk-website/pull/24)、[待辦清單](bugfix-backlog-2026-11-22.md) 及 [實作報告](../reports/bf009-016-implementation.md) 為證據；後續進展另外標示，不回寫舊驗收。

| ID | 官網側結果／後續 |
| --- | --- |
| BF-009 | 已合併，品牌文案修正 |
| BF-010 | 原時點 BLOCKED；後續 [PR #26](https://github.com/xk2022/xk-website/pull/26)、[PR #27](https://github.com/xk2022/xk-website/pull/27) 已提供 Email 草稿與需求整理，仍無站內收件及實寄證據 |
| BF-011 | 已合併，千剛展示同步 |
| BF-012 | 官網側 PASS；外部模板來源修補不在範圍 |
| BF-013 | 已合併，作品分類 |
| BF-014 | 已合併，品牌詳頁 |
| BF-015 | 原時點 BLOCKED；www 根路徑已修正，法律、索引與發布前置仍分別待確認 |
| BF-016 | 已合併，維護與 smoke 入口 |

其他已合併交付：[PR #22](https://github.com/xk2022/xk-website/pull/22)／[PR #23](https://github.com/xk2022/xk-website/pull/23) [作品展示與排序](../reports/README.md#官網改善作品與詢價)；[PR #28](https://github.com/xk2022/xk-website/pull/28) [客戶試算 V1](../reports/quotation-estimator-v1.md)，參考價格仍待 Owner 核准。

## 3. Design Collection（DC-001～007）

依 [工作包](../01_design/design-collection/work-packages.md) 既有相依關係；Modern 目前 16 頁，49 頁為規劃目標。

| 工作包 | 狀態／證據 | 前置 |
| --- | --- | --- |
| DC-001 架構規格 | 已合併 [PR #30](https://github.com/xk2022/xk-website/pull/30)；[報告](../reports/dc001-architecture.md) | — |
| DC-002 共用核心 | 已合併 [PR #33](https://github.com/xk2022/xk-website/pull/33)；[報告](../reports/dc002-implementation.md) | DC-001 |
| DC-003 Modern／Gallery | 待執行 | DC-002 |
| DC-004 Heritage | 待執行、品牌審閱 | DC-003 |
| DC-005 Luxury | 待執行、品牌審閱 | DC-003 |
| DC-006 三系列整合 | 待執行 | DC-004、DC-005 |
| DC-007 完整驗收與發布準備 | 待執行 | DC-006；發布依當次授權 |

DC-004／005 可依現有工作包平行；未完成風格與 Gallery 不提供公開入口。

## 4. 文件整理（DOC-001～006）

| 工作 | 狀態／證據 |
| --- | --- |
| DOC-001 README 重構 | 已合併 [PR #32](https://github.com/xk2022/xk-website/pull/32) |
| DOC-002 狀態核對 | 已合併 [PR #34](https://github.com/xk2022/xk-website/pull/34) |
| DOC-003 歷史與重複文件 | 已合併 [PR #35](https://github.com/xk2022/xk-website/pull/35)；[歷史索引](../98_decisions/README.md) |
| DOC-004 架構與結構 | 已合併 [PR #36](https://github.com/xk2022/xk-website/pull/36)；[工程索引](../03_engineering/README.md)、[設計索引](../01_design/README.md) |
| DOC-005 Roadmap | 已合併 [PR #37](https://github.com/xk2022/xk-website/pull/37) |
| DOC-006 文件一致性檢查 | [檢查報告](../reports/doc006-consistency.md)；合併及 CI 以本次 PR 實際事件為準 |

本輪文件整理以 DOC-006 收斂；合併完成後，下一個功能工作包為 DC-003。不因此增加新的功能規格。

## 5. 未結項與其他 PR

- 正式政策、索引、收件、價格、Vercel 等外部／營運條件依 [發布前置清單](../04_deployment/publication-readiness.md) 與各原始規格確認。
- 核對時 [PR #18](https://github.com/xk2022/xk-website/pull/18)（人員文案）及 [PR #29](https://github.com/xk2022/xk-website/pull/29)（早期三風格討論紀錄）仍為 open，未視為已合併；相關後續成果各見 [PR #24](https://github.com/xk2022/xk-website/pull/24)／[PR #30](https://github.com/xk2022/xk-website/pull/30)。本文件不關閉或重複合併這些 PR。

完整驗收與歷史資料見 [報告索引](../reports/README.md)、[歷史索引](../98_decisions/README.md)。每次狀態更新核對精確 PR、main SHA、CI 與實際發布結果，不在其他文件另維護一份完整進度表。
