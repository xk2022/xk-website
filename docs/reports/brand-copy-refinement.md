# 品牌文案調整 — 2026-11-20

本次依品牌負責人指示，移除網站強調一人經營、創辦人個人角色及全職狀態的文案，以技術能力、溝通與交付方式呈現品牌。沒有新增團隊人數或多人組織的暗示。

## 範圍與依據

- Website 基準：`97886abba03d358fef7853eb85360f4a84c5d751`，原工作目錄乾淨。
- 分支：`feature/brand-copy-refinement`。
- 本次使用者指示優先於 Task 004 歷史人數／任職狀態表述。
- 文件 Repository 最新 main：`9d0ed1282a6cf07bbaccdbf47f0220c37038080e`；Week 02 能力／品牌來源未變，新 Week 03 架構與本次文案範圍分開處理，未修改該 Repository。

## 文案調整

| 位置 | 原表述 | 調整後 |
| --- | --- | --- |
| About「我們是誰」 | 一人全職經營、由創辦人負責 | 清楚的技術溝通、需求釐清、方案規劃與實作交付 |
| About 原創辦人區塊 | 創辦人、THE PERSON BEHIND XK、Founder & Software Engineer、由軟體工程師創立 | 技術專業、TECHNICAL EXPERTISE、Web · Java · AI Engineering、以品牌技術能力規劃方案 |
| Solutions 合作原則 | 一人全職技術品牌直接討論需求 | 清楚的技術溝通，依專案目標確認範圍與交付方式 |
| Solutions 來源摘要 | 一人全職品牌／一人交付範圍 | 技術服務品牌／依專案範圍規劃交付 |

保留既有元件與資料契約、`#founder` 及相關標題 ID，避免破壞既有連結。內部命名與固定來源章節名稱不是公開的人數文案；歷史規格／報告不回寫。姓名／照片仍為 null，沒有新增人物或規模宣稱。

## 修改檔案

- `src/config/about.ts`
- `src/components/sections/about/about-founder.tsx`
- `src/config/solutions.ts`
- `AGENTS.md`：記錄本次公開文案政策，避免後續恢復舊敘述。
- `docs/implementation-notes.md`：追加本次決策與來源。
- 本報告。

## 驗證

本機驗證已完成；[逐項結果與真實退出碼](brand-copy-verification.json) 記錄當次版本、時間及環境。所有結果均為本輪執行，未沿用 Task 012 的 PASS。

| 驗證 | 實際結果 |
| --- | --- |
| `npm ci` | Exit 0；package／lockfile 未修改 |
| `npx tsc --noEmit` | Exit 0 |
| `npm run lint` | Exit 0 |
| `npm run build` | Exit 0 |
| `npm run build:pages` | Exit 0；原 Pages validator 通過 |
| 一般 production | About／Solutions × 375／1440，共 4 個案例通過 |
| Pages 響應式 | About／Solutions × 320／375／768／1440／1920，共 10 個案例通過；零水平溢出／裁切候選 |
| 文案與既有錨點 | 新表述存在、舊個人定位不再顯示；`#founder`／`#who-we-are` 保留，手機選單焦點離開正常關閉 |
| axe | 四次掃描零 violations；保留原始 incomplete，不宣稱本輪完整 WCAG 認證 |
| 瀏覽器資源與 Runtime | GET 資源、HTTP、未處理 Runtime／Console error 均無錯；40 筆 HEAD 取消另記錄，未冒作整體原始網路錯誤零 |
| 匯出資料掃描 | 76 份 HTML／payload／JS／JSON 均未包含舊人數／任職／創辦人公開文案 |
| 樣式回歸 | 三份 CSS 與原 main 產物逐 byte 相同；沒有改動 Design System、樣式、依賴或部署設定 |

原始命令回執、Logs、四份 axe JSON 與六張檢查圖保留於 `/tmp/xk-copy-20261120/`。Root 實看以下三張隨 PR 提交的代表圖，確認斷行、文字與排版正確：

- [About 手機文案](../screenshots/brand-copy-about-375.png)
- [技術專業桌面區塊](../screenshots/brand-copy-technical-expertise-1440.png)
- [Solutions 手機合作說明](../screenshots/brand-copy-solutions-375.png)

此為文案影響範圍的回歸；未重跑 Task 012 全套 AT／效能量測。沒有變更互動、語意結構、色票、依賴或架構。
PR、CI 與部署分開記錄；尚未發生時不宣稱已發布。本次沒有沿用 Task 012 的合併授權。
