# Bugfix 001–008 驗證證據

[原始封存](local-evidence.tar.xz) 保存當次 Command／Environment／Expected／Actual／Exit／Status／Evidence，以及 [manifest](manifest.json) 的完整性資料。這是本機驗收，不等於 PR CI 或正式部署；後續遠端事件更新同一 PR 說明。

- source.json 是初次指紋，source-final.json 是加 article role 的最後版本；contract 亦分兩版，沒有將舊結果改標成新結果。
- normal/initial 18版面／66子項、pages/initial 45版面／27axe／126子項是完整基線；人工審查發現15個ARIA未決項，最終判不通過後修正。原raw與manual helper失敗保留。
- normal/role-retest 2版面／15子項、pages/role-retest-ready 5版面／3axe／24子項是語意修正的最終針對性補驗，含五個具名稱article實際斷言。未改頁與links由精確角色差異及142產物bridge保留適用性，沒有冒稱重跑全部路由。
- pages/role-retest 是錯誤空目錄預覽的真實FAIL；後綴-ready才是準備正確204檔後的完成版本。checks保留兩個server、HTTP與程序exit，tool-failure-observations說明原因與修正。
- manual-adjudication-final.json 是Root獨立人工裁定，包含342項對比未決、版本界線與檢視範圍。原collector的manual/overall PENDING保持不變；axe零violations不等於全項可及通過。
- 七張完整頁PNG只存於 [截圖目錄](../../screenshots/bugfix001-008/)；五張最後Home圖與原檢視相同bytes，bridge保留一次原檢視。Solutions兩圖依未改markup/CSS保留。三張實際focus圖位於封存focus-visual，不重複提交整套PNG。

執行工具重用既有Playwright／axe與network/a11y helpers，沒有產品dependencies增加。重現先依source map還原版本，使用repository evidence runner順序跑品質、normal3110後停止、Pages3111/xk-website。原暫存require路徑需映射到當次工具安裝處；封存保留CLI與工具快照，不能直接把舊路徑當現成環境。父報告說明適用性、限制與剩餘工作。
