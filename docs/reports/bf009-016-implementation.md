# BF-009～BF-016 官網改善實作與驗證

日期：2026-11-22（Asia/Taipei）。功能分支：`bugfix/009-016-website-refinements`。基準為 main `f2c8091c75980f240427066e368c41fc3d932efc`；原清單文件 Commit `1fa035f` 已以 `83ebb15` 納入本分支。使用者本次明確授權直接修正、Push、PR、CI 通過後合併及確認部署，不代表批准法律政策、索引或未知商務資料。

## 項目處理與限制

| ID | 本輪處理 | 最終驗收狀態 |
| --- | --- | --- |
| BF-009 | About／Solutions 改中性技術與合作描述；About 個人導向區改為工程理念，保留歷史營運來源；Homepage 移除「網站仍建置中」的籠統表述 | PASS |
| BF-010 | Contact 清單仍空；已請使用者提供確認可公開且可接收詢問的資料；CTA 統一指向聯絡資訊頁，沒有新增假管道或收件表單 | BLOCKED：缺真實管道資料 |
| BF-011 | 千剛改為可瀏覽的品牌提案展示，補真實 WebP、客觀介紹與來源連結；保持核定第六順位 | PASS |
| BF-012 | Demo002／003 重驗仍缺素材，官網改 reference-only，移除示範外連及缺素材預覽、保留出版社署名與原始來源紀錄 | PASS（官網側）；原站素材仍為 Known Issues |
| BF-013 | 性質分為自製品牌展示、品牌提案、自家服務推廣、第三方模板；模板與 Planned 原生收合，數量由資料導出、錨點及順序保留 | PASS |
| BF-014 | 六個品牌新增 `/portfolio/showcases/[slug]` 站內介紹，包含背景、對象、設計取捨、已實作範圍、限制、實圖、來源及相關服務 | PASS |
| BF-015 | 新增 [正式發布前置清單](../04_deployment/publication-readiness.md)，核對 Contact／正式網址／索引與 Privacy 所需資料；保留 noindex、Sitemap 404 與草案隔離 | BLOCKED：正式發布資料及核准尚缺；前置文件已完成 |
| BF-016 | 集中展示設定與 labels、獨立核准 fixture、15 路由 Pages 守門及 `npm run test:smoke`；含反向案例與真實非零退出驗證 | PASS（本機／Pages）；公開網址於部署後另驗 |

Blocked 項目未假裝修復；本次可交付的網站程式與營運／正式發布前置分開判定。外部來源 Repository、DNS、Domain、Pages Source、部署 workflow 與套件版本未修改，沒有 Backend、表單、Analytics 或額外 npm Dependencies。`allowImportingTsExtensions` 用於 noEmit／bundler 模式，讓相同型別資料同時支援 Next.js 與 Node.js 24 原生 `.ts` 匯入。

## 來源與版本

- [原問題清單](../task/bugfix-backlog-2026-11-22.md)；保留初次建立紀錄並在驗收完成後追加本輪狀態。
- 文件 Repository 只讀 main：Portfolio Strategy Blob `98e69f79e65f3a599e32859cd574b437f6b86193`；2026-11-20 決議 Blob `f021c6269a7925d77c42d42d7025e571991ba80f`；Website MVP Blob `9ed0d84bec4687901e227a7de208c5d44b03ba98`。後兩份仍明載 Contact 尚無收件管道；表單、通知、成效數字屬規劃或示例，不採作已完成資訊。
- 六品牌本輪重新公開瀏覽，均 HTTP 200，依實際頁面說明範圍與模擬限制；沒有新增無據技術、客戶或成果宣稱。詳見 artifacts 的 source manifest。
- 千剛實際首屏 1280×800、51,612 bytes，SHA256 `b4dc1b5a6d8e29298a918c7b298facd46cc80b5ec2c16deb020a63c4f4279b58`。
- 受測程式碼／工具範圍、每檔 SHA 與變更邊界記於 artifacts/source.json。來源與資料、UI／路由、smoke 分開 ownership；Root 統一 build／server、正式驗收、Git 與交付，另做一次限定範圍的獨立覆核。

## 實際驗收矩陣

指令透過 `scripts/run-with-evidence.py`，保存真實 OS return code、UTC 起訖與 log SHA256。來源擷取／工具負向測試與正式網站驗收分開；JSON PASS 或仍在執行中的程序不代替完成回執。下表證據名稱為封裝前的邏輯路徑，實際附件及 `.gz` 對應以 [附件 manifest](bf009-016-artifacts/manifest.json) 為準。

| Test ID | 指令／程序 | 實際結果 | 證據（artifacts 內） |
| --- | --- | --- | --- |
| BFQ-01 | npm ci --cache /tmp/xk-npm-cache | PASS，Exit 0，準備 locked 環境 | commands/npm-ci.json |
| BFQ-02 | npx tsc --noEmit | PASS，Exit 0 | commands/tsc.json |
| BFQ-03 | npm run lint | PASS，Exit 0 | commands/lint.json |
| BFQ-04 | npm run build | PASS，Exit 0，15 公開路由 | commands/build.json |
| BFQ-05 | 正常模式 test:smoke，3160 | PASS，557 checks，Exit 0 | smoke-normal-root-equivalence-result.json |
| BFQ-06 | 正常模式 browser，3160 | PASS，15 路由／30 基本寬度及 2 額外展開檢查、73 個測項，Exit 0 | browser-normal-result.json |
| BFQ-07 | npm run build:pages | PASS，Exit 0；一般模式先完成再停止 | commands/build-pages.json |
| BFQ-08 | Pages test:smoke，3161/xk-website | PASS，557 checks，Exit 0 | smoke-pages-trailing-slash-result.json |
| BFQ-09 | Pages 五寬、全頁 axe、展開、手機選單、鍵盤／Focus／Reduced Motion | 自動必要測項 0 FAIL；37 次 axe 無違規。Collector Exit 2 依設計保留人工候選，須合併 BFQ-10 判定 | browser-pages-result.json、commands/browser-pages.json |
| BFQ-10 | 七張真實截圖與人工候選覆核 | PASS，最終判定程序 Exit 0；389 個候選全部有判定，無阻擋視覺問題 | final-adjudication.json、commands/final-adjudication-retest.json、visual-review.json |
| BFQ-11 | 最終 PR CI／artifact | PENDING | 實際完成後更新同一 PR |
| BFQ-12 | 合併、main CI、部署、公開網址 | PENDING | 實際完成後更新同一 PR |

一般模式 375／1440 px；Pages 基本寬度 320／375／768／1440／1920 px。新增六頁使用相同 protected Metadata，Footer 列出所有十五頁；原三技術專案仍為 Planned 且沒有新增實作證據或系統畫面。完整 WCAG 55 準則、真實 AT／手機、200% 真實瀏覽器縮放、效能與 field CWV 不在本批重驗宣稱內。

## 失敗、修正與重驗

- 來源工具首輪使用 API HTTP 直連受環境網路限制，後用實際 Chromium 傳輸補驗；TLS 信任 probe 的憑證錯誤與忽略環境信任後的擷取限制均保留，不宣稱通過 TLS 驗證。
- 獨立覆核發現公開 Pages 的展示網站與官網同 origin、不同 project path，原 smoke 會誤算站內漏 Base Path。改為只有來源清單中精確正規化的絕對外連可放行；root 相對漏前綴、未知路徑、未核准 query 或失效 sourceHref CTA 仍失敗，32 個正反案例通過。
- 新 smoke 首輪對正常 root Canonical／OG URL 的尾斜線預期產生 2 個 FAIL；Pages 首輪對非根路徑的 trailingSlash 序列化產生 28 個 FAIL。修正為同一個精確 scheme／host／path 的單一可選尾斜線等價，保留原始實際值在 notes；其他網域、路徑、query／fragment 不放寬。正常與 Pages 已分別重驗通過，舊失敗不覆寫。
- 額外修正工具只影響 Python smoke 與對應證據，不改受測 app；依實際變更重跑 smoke，未為此重跑一般網站 build。最終 CI artifact 仍需與本機受測輸出獨立比對。
- 刻意對未啟動的 localhost:1 執行 smoke，真實 Exit 1、HTTP 相關檢查確實 FAIL；這是工具失敗機制驗證，不是官網故障。

## 尚待確認與後續

- BF-010：實際聯絡管道與可用／收件確認仍待使用者資料；不能由本文或 generic 修正授權推論信箱存在。
- BF-015：正式網址／索引決策、Privacy 同版本核准與真實權利管道仍待資料；保護性 404 與 noindex 依既有決策維持。
- BF-012：Demo002 背景、Demo003 Logo 的原站素材尚未修補；Demo001 聯絡區地圖背景亦有既有來源缺圖。官網側不隱藏這些限制，也沒有修改來源 repo。

本輪程式碼／工具最終指紋：`2b93759b2149c8adced0f4e9cc069480571946fdec1698910b279a93181ed86e`。Node.js 24.22.1、npm 11.9.0、Linux x86_64、Chromium 156.0.8078.79。

人工候選分為 370 個裝飾漸層節點與 19 個手機選單重疊節點。前者依當前 computed styles／實際關聯裝飾的最大 alpha 做保守 WCAG 對比計算，最低 5.13:1；後者重新定位唯一 CSS 目標，核對文字不變、白底不透明選單、矩形及 3×3 hit tests（15 完全、4 部分覆蓋），未覆蓋文字對照同節點預設狀態的已驗對比；兩個白底 badge 另驗實際不透明背景。未把 incomplete 或 runner 的 Exit 2 改寫為原程序通過。最終人工判定為獨立 Exit 0 階段，原結果與非零回執保留。

七張代表全頁、原 Focus 緊裁及補拍上下文共九張原圖，另有 19 張原尺寸裁切實際檢視。完整藍色 2px Focus 外框／4px offset 已補圖確認。代表詳頁為千剛與三月；其他四詳頁有自動回歸，但未冒稱逐張人工視覺檢查。原生收合後的隱藏內容有展開狀態自動驗收，人工圖像範圍依 visual-review.json 記錄。

新增 24 個合成 Metadata 正反案例，確認裸根網址／單一尾斜線可等價，錯誤 scheme／domain／path／query／fragment／重複斜線仍失敗。合成檢查及人工判定腳本的初次資料模型欄位／分類假設錯誤亦保留原退出回執，修正工具後才完成最終判定，沒有改網站繞過驗收。

文件中的遠端階段為 PR 前快照；之後真正發生的 CI、合併、部署與公開驗證更新同一 PR Description，避免為紀錄自身 SHA 產生循環提交。

## 證據與截圖入口

- [來源與驗收附件](bf009-016-artifacts/manifest.json)：命令、OS 退出回執、原始結果與 SHA256；大型 JSON／工具／log 無損壓縮，完整失敗仍保留。
- [首頁桌面](../screenshots/bf009-016/home-1440.png)、[About 手機](../screenshots/bf009-016/about-375.png)。
- [作品頁桌面](../screenshots/bf009-016/portfolio-1440.png)、[作品頁手機](../screenshots/bf009-016/portfolio-375.png)。
- [千剛桌面](../screenshots/bf009-016/qi-detail-1440.png)、[千剛手機](../screenshots/bf009-016/qi-detail-375.png)、[三月手機](../screenshots/bf009-016/march-detail-375.png)。
- [實際 Focus 上下文](../screenshots/bf009-016/focus-with-context.png)。

完整新增／修改路徑列於附件 manifest 的 changedFiles。正式 PR、main 與公開站結果更新同一 PR Description，無須為遠端事件再修改受測程式。
