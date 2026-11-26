# XK Website Roadmap｜開發進度總表

核對日期：2026-11-26（UTC）。正式 main `ee4b4709a9f8daa755e2595a46c158b3c92d8229` 已合併 DC-006 PR #44；49 頁與跨風格切換已部署。本輪 `test/design-collection-release` 執行 DC-007 完整驗收與維護文件，實際結果及 Required 外部缺口依本輪報告；不自動合併或部署。

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

依 [工作包](../01_design/design-collection/work-packages.md) 既有相依關係；正式 main 的完整 49 頁已發布，DC-006 的切換／導航／比較新增功能已完成本機功能與版面驗收；原始診斷、限定重驗與遠端驗收階段分開記錄，不能用前置部署結果充作本輪驗收。

| 工作包 | 狀態／證據 | 前置 |
| --- | --- | --- |
| DC-001 架構規格 | 已合併 [PR #30](https://github.com/xk2022/xk-website/pull/30)；[報告](../reports/dc001-architecture.md) | — |
| DC-002 共用核心 | 已合併 [PR #33](https://github.com/xk2022/xk-website/pull/33)；[報告](../reports/dc002-implementation.md) | DC-001 |
| DC-003 Modern／Gallery | 已合併 [PR #39](https://github.com/xk2022/xk-website/pull/39)；[規格](dc003.md)、[報告](../reports/dc003-implementation.md)，其 17 頁驗收保留歷史版本 | DC-002 |
| DC-004 Heritage | [v1 核准](../01_design/design-collection/reviews/heritage-v1-approval.md)、[完整規格](dc004.md)／[報告](../reports/dc004-implementation.md)；[PR #40](https://github.com/xk2022/xk-website/pull/40) 已合併 `0d41ecf495e55b792f966c9fe27bd07c27bc5647`；[main CI／Pages](https://github.com/xk2022/xk-website/actions/runs/45796333591) 及公開 33 頁 HTTP 2,329 PASS | DC-003 |
| DC-005 Luxury | [v1 核准](../01_design/design-collection/reviews/luxury-v1-approval.md)、[完整規格](dc005.md)／[報告](../reports/dc005-implementation.md)；[PR #42](https://github.com/xk2022/xk-website/pull/42) 已合併 `9322810f27e74e5ed4faa35a3b3931b3719f0c9a`，49 頁已部署與公開驗證 | DC-003＋同版本 Luxury 品牌核准 |
| DC-006 三系列切換／導航／SEO | [規格](dc006.md)、[本輪報告](../reports/dc006-implementation.md)、[18 張已檢視 Pages 截圖](../screenshots/design-collection/dc006/)；本機功能與版面驗收完成，原始 incomplete／網路診斷及限定重驗詳報告；PR #44 已合併並完成精確 CI／artifact／main 部署；原始測試界線保留 | DC-004、DC-005 已合併 |
| DC-007 完整驗收與發布準備 | 發布FAIL／BLOCKED；[規格](dc007.md)／[本輪報告](../reports/dc007-implementation.md)；Required 外部證據缺少不算完成 | DC-006 PR #44 已合併 |

DC-006 最終 v2 六品質指令及 typegen 均 Exit 0；normal／Pages HTTP 各 3,274 項，兩模式各完成 49 頁×五寬 245 layouts、20 axe 與 96 個切換方向，0 violations。normal 原 suite Exit 2（10 overlap incomplete）；Pages 原 Exit 1（同 10 項及三筆帶 `source=qa` 的 HEAD canceled，僅 final network gate FAIL）。10 項逐筆人工判讀皆 PASS，三筆 query 的限定重驗與原始紀錄詳見本輪報告，不能概稱原完整 suite Exit 0。

PR #42 的 [main CI／Pages run 45802200429](https://github.com/xk2022/xk-website/actions/runs/45802200429) 已成功，Pages deploy 完成時間為 2026-11-26 10:33:48Z；獨立公開 HTTP 3,273 PASS，包含 49 pages／36 assets／29 negatives。兩次系列合併的來源／bridge、原始失敗與 CI／artifact／公開事件見 [整合報告](../reports/design-collection-integration.md)。這些完成項是 DC-006 基準，後續新功能測試、CI 與新 PR 識別碼皆按本輪實際事件補記，舊 PR 合併授權不延伸。

## 4. 文件整理（DOC-001～006）

| 工作 | 狀態／證據 |
| --- | --- |
| DOC-001 README 重構 | 已合併 [PR #32](https://github.com/xk2022/xk-website/pull/32) |
| DOC-002 狀態核對 | 已合併 [PR #34](https://github.com/xk2022/xk-website/pull/34) |
| DOC-003 歷史與重複文件 | 已合併 [PR #35](https://github.com/xk2022/xk-website/pull/35)；[歷史索引](../98_decisions/README.md) |
| DOC-004 架構與結構 | 已合併 [PR #36](https://github.com/xk2022/xk-website/pull/36)；[工程索引](../03_engineering/README.md)、[設計索引](../01_design/README.md) |
| DOC-005 Roadmap | 已合併 [PR #37](https://github.com/xk2022/xk-website/pull/37) |
| DOC-006 文件一致性檢查 | 已合併 [PR #38](https://github.com/xk2022/xk-website/pull/38)；[檢查報告](../reports/doc006-consistency.md)；合併及 CI 以本次 PR 實際事件為準 |

DOC-005／DOC-006 已分別由 PR #37／#38 合併；DC-003 已由 [PR #39](https://github.com/xk2022/xk-website/pull/39) 合併，merge SHA `8ba299a5a48da41ca7f4d88d9b2149d7c83f6584`；[main CI／Pages #88](https://github.com/xk2022/xk-website/actions/runs/45750880906) 成功，正式站 17 頁 HTTP smoke 1,110 項 PASS。此為當時實際事件，不回寫原報告的 PR 前快照；[當時紀錄](../reports/dc004-brand-review.md) 保留驗證範圍，後續雙風格整合事件另依上方狀態與整合報告記錄。

## 5. 未結項與其他 PR

- 正式政策、索引、收件、價格、Vercel 等外部／營運條件依 [發布前置清單](../04_deployment/publication-readiness.md) 與各原始規格確認。
- 核對時 [PR #18](https://github.com/xk2022/xk-website/pull/18)（人員文案）及 [PR #29](https://github.com/xk2022/xk-website/pull/29)（早期三風格討論紀錄）仍為 open，未視為已合併；相關後續成果各見 [PR #24](https://github.com/xk2022/xk-website/pull/24)／[PR #30](https://github.com/xk2022/xk-website/pull/30)。本文件不關閉或重複合併這些 PR。

完整驗收與歷史資料見 [報告索引](../reports/README.md)、[歷史索引](../98_decisions/README.md)。每次狀態更新核對精確 PR、main SHA、CI 與實際發布結果，不在其他文件另維護一份完整進度表。

## DC-007 執行紀錄｜2026-11-26

DC-006 [PR #44](https://github.com/xk2022/xk-website/pull/44) 已合併並部署，滿足前置。本輪 `test/design-collection-release` 保存49頁雙模式驗收、47張實圖、8份實體PDF、18個cold樣本、維護與rollback文件。完整發布門檻仍有TBT目標FAIL、原始網路取消未解及真人讀屏BLOCKED；詳本輪報告，不改寫原FAIL，不自動合併或部署。

本輪入口：[規格](../task/dc007.md)／[實作與驗收](../reports/dc007-implementation.md)／[維護與 rollback](../03_engineering/design-collection-maintenance.md)。
