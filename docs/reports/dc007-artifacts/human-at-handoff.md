# DC-007 真人讀屏交接

**目前 BLOCKED：缺真人讀屏紀錄及可用 Orca 環境。** 本文件只是待驗程序，不是 PASS，也不代表完整 release 驗收通過；不得用 AX tree、DOM、axe 或鍵盤自動化代替真人聆聽與操作。

開始前記錄：日期／時區、執行者、OS、讀屏工具及版本、browser 及版本、驗收 base URL、實際網站 commit／source SHA 與 build mode。若換環境或版本，另開紀錄。

| 系列 | 起點 | 以真實頁內連結與鍵盤完成的旅程 |
| --- | --- | --- |
| Modern | `/` | Home → Services → Portfolio → Contact → Quotation |
| Heritage | `/design-collection/heritage` | 同前綴下的 Home → services → portfolio → contact → quotation |
| Luxury | `/design-collection/luxury` | 同前綴下的 Home → services → portfolio → contact → quotation |

1. 真人啟動實際讀屏，用 Tab／Shift+Tab／Enter／Space／Escape 及讀屏的標題、地標導覽操作；記錄實際聽到的內容，不只寫「正常」。核對 skip link、Header／nav／main／Footer、標題層級、目前頁／目前系列、連結目的、手機選單與 disclosure 的展開及焦點。
2. Contact 每系列重新用合成資料：先空白／錯誤輸入，再合法內容、預覽與修改。聆聽 label、必填／格式／錯誤摘要、欄位關聯、焦點移動、disabled／狀態提示、草稿及隱私警語是否清楚。確認朗讀不誤稱「已送出／已收件」。
3. Quotation 每系列重新操作服務／建置／附加／複雜度及原本相容性、內含、disabled 狀態。按既定 worst-case 檢查 17 附加選項目錄及摘要朗讀，涵蓋面議、起價、一次性／年度費用、限制與未完成選擇；不為湊數繞過相容性。記錄選取狀態、金額更新及 summary 的實際發音、順序、重複或遺漏。
4. 在頁面／系列切換及 back／forward 後聆聽個資清除提示，確認個人欄位與草稿沒有帶到下一頁；只有原有選項 IDs 可依既定機制還原。每系列用不同合成標記，不輸入真姓名、Email、專案或訊息。
5. **不寄信、不開啟會造成對外傳送的流程、不自動送出、不保存 PII。** 停在本機預覽／摘要；草稿入口僅核對朗讀名稱及用途，不啟動外部郵件程式。證據去識別，測完清除合成草稿。

每系列、每個問題留一列；未完成保持 BLOCKED／PENDING，不預填 PASS。問題修正後保留原紀錄，再記新版本重驗。

| 證據欄位 | 實際填寫內容 |
| --- | --- |
| Test ID／系列／路徑／狀態 | 例如 `DC007-SR-Modern-01`；實際操作所在頁及步驟 |
| 環境／版本 | 日期時區、執行者、OS／AT／browser 版本、base URL、commit／source SHA、mode |
| 預期／鍵盤程序 | 要辨識的名稱／角色／狀態、逐步按鍵與合成資料情境 |
| 實際朗讀／焦點 | 原文聽寫或可回聽錄音位置、焦點與行為；不能以 AX dump 代替 |
| 問題／證據／重驗 | 差異、影響、去識別錄音／截圖／紀錄路徑、修正版本及重驗結果 |

完成真人紀錄後交 Root 逐項裁決；本交接單本身不解除 BLOCKED，亦不授權合併或發布。
