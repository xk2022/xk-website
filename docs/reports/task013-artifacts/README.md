# Task 013 證據說明

此目錄保存 Task 013 本機驗收及設定研究；不是 Vercel Deployment artifact。所有本機 screenshot 均明列 LOCAL，不能替代實際 Vercel Preview／Production。尚無指定 Team／Project，平台必要驗收保持 PENDING。

- [原始證據封存](local-evidence.tar.xz)：checks 內各 command／真實 exit／log；normal/initial 保留工具失敗、normal/retest 的 116 個完整子檢查；pages/initial 的 62 個完整子檢查；HTTP response／axe／Network／Storage、來源 audit、實際 foreground／遮擋／保守對比與人工裁定。
- [Manifest](manifest.json)：封存及各成員 SHA-256、來源指紋與實際本機截圖 SHA。原始絕對路徑保留當時執行位置，可依封存成員相對路徑查找；不是部署網址。公開官方 HTML 及其他 repo 全文不重複封存，來源 commit／blob／讀取範圍及 HTTP hash 另有 audit。
- 四張完整頁 PNG 只存於 [本機截圖目錄](../../screenshots/task013-local/)，不在 archive 重複保存。initial／retest 同圖 bytes 的 bridge 保留原人工檢視範圍，沒有用舊測試冒充新結果。三張真實 focus 圖位於封存的 focus-visual。

所有長檢查使用 repository 的 [evidence runner](../../../scripts/run-with-evidence.py)，自測 0／7／timeout124 與實際失敗分開，回執原始 FAIL 不改寫。server 在驗收後主動 TERM 的 143 是生命週期紀錄，Ready／HTTP 與 browser 結果另證；EPERM 初次失敗及重試也完整保存。browser collector 的 manual／overall PENDING 保留原樣，由 manual-adjudication 的獨立 Root 判斷補完基本可及回歸，不宣稱完整認證。

重現使用同版本來源及外部暫存 Playwright／axe，無網站依賴增減。先 npm ci／tsc／lint／一般 build，啟 loopback 3030，執行封存 local-check.cjs 的 normal 模式；停止後 build:pages，把 out 掛在 /xk-website，以封存受控 transport server 的 3031 執行 pages 模式。工具的原始暫存 require 路徑須映射到當次工具安裝位置；不要修改產品依賴或同時覆寫 .next。

正式平台須先指定正確 Vercel Team／Project，依 [主報告](../task013-implementation.md) 的設定、Env、Preview／Production gate 與回復程序操作。Git／PR／main CI／Pages 公開 smoke 的後續真實識別碼更新同一 PR 說明，不從本機 PASS 推定已部署。
