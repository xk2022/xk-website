# Subagent 協作與驗證流程

2026-11-27 工作區：前端 npm／npx 及應用路徑相對 `frontend/`；下方根 runner 範例使用 `npm --prefix frontend`。詳 [現行結構](repository-layout.md)，歷史 Task 經驗與退出碼不改寫。

本指南將 Task 008 的實際經驗轉成後續任務的預設流程。先讀當次規格與使用者指示；明確要求優先於本指南，不降低驗收標準、不回寫歷史結果，也不沿用其他任務的 merge 或發布授權。

## 可追溯回顧

依據：[Task 008 實作報告](../reports/task008-implementation.md) 與 [PR #12](https://github.com/xk2022/xk-website/pull/12)。以下記錄已發生的問題，不推算個別 agent 工時或保證後續完成時限。

| 實際經驗 | 下次調整 |
| --- | --- |
| 初次 `npm ci` 因 cache 目錄不可寫而 Exit 254；改暫存 cache 後 Exit 0 | 長任務前確認環境與 cache 可寫性；不修改 HOME 或套件來掩蓋環境問題 |
| 部分檢查僅留輸出，或結果 JSON 已完成但沒有真實程序退出碼 | 從第一個長指令使用外層 runner，先驗證零值、非零值與 timeout 回執 |
| unstaged-only 檢查漏掉 untracked 新檔，最後 staged Diff 才發現多一個 EOF LF | freeze 前一次檢查 staged、unstaged 與全部擬交付新檔，先完成格式收斂 |
| 一個 LF 改變指紋後，依 Task 008 契約重跑完整品質與瀏覽器驗收 | 保留當次合規重驗；未來先約定影響判定與必要重驗，減少 freeze 後修改 |
| 多輪交接、重複覆核與大型證據封存增加整理成本 | 同一問題指定一位責任人；一次有目的的獨立覆核，原始證據只保存一次 |

Task 008 曾以結果 JSON 的 PASS 卻缺程序完成證據而判驗收 FAIL；最後以外層 `subprocess.wait()` 取得真實 Exit 0。這項區分必須保留。當時使用的暫存工具與本次新增的通用 runner 分開記錄，不改稱為同一工具。

### Task 008 角色紀錄

| 責任 | 當時分工 |
| --- | --- |
| Root | 範圍與整合、共用導航、文件、品質指令、server、Git 與遠端交付 |
| 內容與 UI | `services_review` 核對來源／config；`ui_components` 製作頁面／Section |
| 驗證與覆核 | `showcase` 執行瀏覽器矩陣；`actions_deployment` 處理 Pages validator／網路證據；`docs_review` 核對規格／來源／報告 |

這是歷史紀錄，不是每次必須召集同樣人數的模板。來源唯讀、檔案 ownership、失敗保留與實際驗證值得保留；重複閱讀及覆核應對應具體風險。

## 開始前收斂

Root 先完成下列事項，再分派可平行工作：

1. 確認最新網站 base、工作樹、當次規格、來源版本、修改範圍與使用者授權。
2. 列出必要交付、資料／權利／正式管道核准門檻；區分技術可完成與待 owner 確認。
3. 建立 Required／Optional／Not Applicable 驗收矩陣，保留規格 Test ID、理由與預計證據；初始結果用 PENDING。
4. 決定一般 build、Pages build、server 順序、瀏覽器矩陣與重驗規則；不要到最後才補需求。
5. 確認工具、cache、連線與退出回執可用；來源相同可共享核對紀錄，但當次明確要求完整閱讀時仍須完成。

## 按需分工與交接

通常可將獨立工作整理為二至三條平行 ownership：來源／資料契約、頁面／必要整合、驗證／有風險的獨立覆核。小任務可合併；更複雜任務可按實際需要擴充，不設硬性人數上限。

- Root 統一決策、整合、Git、正式 build、server 生命週期與交付；避免每位 agent 各跑一套正式驗收。
- 每個檔案一位 owner，先約定 export、型別、路由、Section ID 與 metadata；有依賴時先分享契約，不互相覆寫。
- 獨立覆核回答具體問題，例如來源是否支持公開文案、資料 gate 是否正確、報告是否吻合原始結果；不要多層重做同一份完整審查。
- 來源 repository 保持唯讀；暫存工具與原始執行資料放 `/tmp`，不引入 app dependencies。

交接至少包含：指定檔案、基準與來源 Commit／Blob、實際變更、未解問題、是否 freeze、必要檢查與證據路徑。回覆「可審核」不等於驗收 PASS；未執行、未完成或缺退出碼都必須明說。

## 一次編排的執行順序

### 1. 先驗證執行工具

使用 [run-with-evidence.py](../../scripts/run-with-evidence.py) 保存 log 與真實程序結果，例如：

```sh
python3 scripts/run-with-evidence.py \
  --receipt /tmp/xk-task009/build.json \
  --log /tmp/xk-task009/build.log \
  --timeout 600 -- npm --prefix frontend run build
```

`task009` 只是路徑示例，不表示開始該任務。先以無副作用的短指令確認成功、失敗與 timeout 能正確落盤；正式執行依當次矩陣。每次重試使用新路徑，不覆寫先前 receipt／log。runner 須真正等待子程序，原子寫入回執；缺回執或 exit 未知不得由 JSON PASS、PID 狀態或聊天輸出推認成功。

Runner 成功只證實子程序以 0 退出；驗收 PASS 還須全部 Required assertions 完成、預期項目數與完整結束標記吻合，並對應受測版本。子程序 0 但 suite 提早結束，仍不能通過驗收。

Log 不得包含 secrets、登入憑證或具存取權的簽名 URL；避免執行會輸出敏感環境的命令。不要將完整私人來源或暫存資料無差別提交。

### 2. 實作完成後再 freeze

各 owner 先自查指定檔案、契約與內容。Root 收斂問題後，盤點 `git status --short` 與 `git ls-files --others --exclude-standard`，逐檔閱讀擬交付新檔。只 stage 本次已 review 且允許的檔案，不使用 `git add .`；再檢查 `git diff --check`、`git diff --cached --check`、實際 Diff、Markdown／連結及必要語法檢查。

確認沒有漏掉 untracked 檔、使用者變更、產物或秘密後，記錄 freeze 的程式碼範圍與 byte fingerprint。格式與文件入口應在此時收斂，不留到全部瀏覽器驗收後。

### 3. 執行一套正式矩陣

由 Root 依序執行完成版本的必要品質指令，管理一般 production 與 Pages preview；避免同時覆寫 `.next`。QA 使用同一套有 Test ID 的矩陣，覆蓋當次要求的路由、寬度、互動、axe、資源與負向案例；一般與 Pages 模式各自記錄。

保存預期／實際、版本、命令、開始／完成時間與真實 exit。失敗先分類為 app、工具、環境或未知；保留原始結果，再修復並重驗。工具問題不等於 app 通過，診斷通過也不能取代未完成的正式 suite。

### 4. 依實際影響選擇重驗

當次規格明確要求修改後完整重驗時，照規格執行。否則檢查實際 Diff、輸出與風險，由 Root 記錄下列判斷，必要時擴大驗收：

| 變更 | 預設重驗範圍 |
| --- | --- |
| 純文件、遠端事件識別碼或報告補記 | Markdown、連結、事實／scope；不因此重跑無關網站 suite |
| 只有已確認的空白／格式差異 | 格式與差異證明；若涉及程式語意、產物或明確規格要求，追加對應檢查 |
| 文案、排版、內容資料或互動 | 受影響頁面／寬度／a11y／互動；共用元件另含使用頁回歸 |
| 路由、metadata、導航或 export 設定 | 對應 build、Pages 路徑／404／資源／metadata 與跨頁回歸 |
| runtime、依賴或廣泛架構變更 | 完整必要品質與相關瀏覽器矩陣 |

Fingerprint 只識別 bytes，不判定功能是否改變；相同指紋可證明指定範圍未變，不同指紋須讀 Diff 才能判定影響。不能單憑雜湊決定全重跑或免測。

新舊截圖逐張 byte-identical 時，可保存一次 bridge：原人工檢視紀錄、新舊路徑／SHA、版本與適用範圍。不得把舊檢視改稱本次重看；畫面或內容有變便重新檢視。

## 證據與交付

- 一份摘要映射 Test ID 到實際結果；原始失敗、重試、退出回執與必要診斷保留不可變版本。以 manifest／SHA 連結，避免不同 reviewer 各封一套同樣資料。
- 只封存能支持結論與重現問題的資料；大型原始資料依規格與 repository 政策處理。不可為縮檔刪去失敗或只保留有利結果。
- 一次獨立覆核聚焦尚未消除的風險與報告一致性；有新變更時只覆核受影響範圍，不重新傳遞全部相同證據。
- 報告區分本機、PR head CI、merge、main CI、部署與公開驗證；未發生的階段維持 PENDING，不借用先前 head 或任務的成功。
- 可在同一 PR Description 更新之後實際發生的遠端證據。報告快照本身不要求額外 docs-only B commit 或重複 CI；只有實際需要的修正／明確交付要求才新增 commit，並核對最終 head 的 Checks。
- merge／發布僅依當次明確授權；保護既有 Pages／Vercel 相容流程，不因優化協作而更改部署政策。

## 交付前確認

- [ ] 當次規格、資料核准、檔案 owner 與必要檢查已收斂。
- [ ] 格式與所有擬交付新檔已於 freeze 前檢查；正式指令具有真實退出回執。
- [ ] 必要驗收完成；失敗、重驗、N/A 理由與版本邊界可追溯。
- [ ] 重驗依規格與實際影響決定；沒有將 byte identity 當成語意判定。
- [ ] 報告／PR 的實際階段、最終 head 與授權一致；沒有為記錄自身 SHA 製造循環提交。
