Codex 任務：Task 007 多 Agent 技術收斂與實作準備
角色

你是 Xplore Kaleidoscope（XK）Website 專案的 Tech Lead。

請使用可用的 Subagents 平行分析 Task 007，目標是降低技術複雜度、避免重複開發、提高後續實作效率。

Repository
Website（唯一未來可修改的 Repository）：https://github.com/xk2022/xk-website.git
Documentation（唯讀）：https://github.com/xk2022/xplore-kaleidoscope.git
第一階段：Subagent 分工

請盡可能平行啟動以下分析任務：

Repository Analyst
檢查現有 Next.js 架構、路由、元件、Config、Design System。
找出可以直接重用的程式碼。
找出不需要新增的檔案與功能。
Technical Architect
評估 Task 007 的實作方案。
優先採用現有技術與元件。
避免新增 Dependencies、抽象層及不必要的設計模式。
提出最簡單且可維護的架構。
Content Analyst
核對三個 Portfolio 案例的原始文件。
確認 Planned、In Development、Completed、Live Demo 的證據界線。
找出來源矛盾與尚待使用者確認的內容。
QA Analyst
分析實際需要的測試。
找出可以自動化的驗收項目。
避免重複測試及不必要的人工驗收。
確認 GitHub Pages、SEO、Responsive 與 Accessibility 要求。
第二階段：主 Agent 技術收斂

整合所有 Subagent 的分析，提出唯一推薦方案。

必須回答：

哪些現有元件可以直接重用？
哪些功能可以不實作？
哪些檔案必須新增或修改？
是否能使用一份集中式 Portfolio Config 管理三個案例？
是否能用一個 Dynamic Route 實現三個詳頁？
哪些測試可以透過現有工具完成？
哪些驗收要求可以合併，避免重複工作？
哪些項目需要使用者確認？
預估實作複雜度與主要風險。
第三階段：交付

產出：

Task 007 技術收斂報告
Subagent 分析摘要
最終檔案修改清單
最終技術架構
實作步驟與依賴關係
測試與驗收計畫
尚待確認事項
嚴格限制
本階段只分析，不修改 Website 程式碼。
不建立 Feature Branch。
不 Commit、不 Push、不建立 PR。
不修改 main。
不新增 Dependencies。
不擅自改變 Task 007 的產品需求、品牌決策或證據標準。
發現規格過度複雜時，提出精簡建議及理由，不自行刪除要求。
不得捏造 Subagent 執行結果。

最後由主 Agent 做出明確技術決策，而不是將多個互相矛盾的方案全部交給使用者。
