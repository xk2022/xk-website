# Luxury v1｜品牌與版型審閱稿

日期：2026-11-26（UTC）。狀態：**未核准、未公開；等待同版本 Owner 品牌審閱**。這是 [DC-005](../../../task/dc005.md) 的前置設計稿，不是已完成的 16 頁系列或新的公司識別。

[本機原型 HTML](luxury-v1.html) · [實際截圖](../../../screenshots/design-collection/dc005-review/README.md) · [本輪驗證報告](../../../reports/dc005-brand-review.md)

## 版本與來源

網站基準 `main@8ba299a5a48da41ca7f4d88d9b2149d7c83f6584`，含 DC-003／PR #39，17 頁。DC-004／PR #40 尚未合併；本稿沒有取用該實作或繼承 Heritage 的品牌核准。

公司唯讀最新 main `9213a3d8dacb8774d87c26cb736c4a4315779e95`，tree `195c5c8100b74513985e040f3ee6fc642571285e`。公司根 AGENTS 及最新英文品牌文件已讀；14 組新舊完整檔案比較顯示實質條款未變，變更限英文檔名與連結／來源標籤。完整來源／Blob／重讀與沿用界線見報告，不修改公司 Repository。

HTML SHA-256：`c7809ec2e8ec31713828aa2913175b73e41af56ad2d97f8e3bd95e6d354b9f4b`。五寬原圖及受測時間由報告記錄；Owner 核准時須綁定同一 HTML／圖像版本。尚無核准紀錄，不能把一般「執行 DC-005」或先前 Heritage 核准當作本提案已獲批准。

## 本次待審決定

| 項目 | v1 提案 | 適用邊界／目前決定 |
| --- | --- | --- |
| 展示底色與內容表面 | `#0C1017`／`#151B24` | 僅 Luxury 展示主體；PENDING |
| 主／次文字 | `#F5F1E8`／`#B8B1A5` | 實際深色表面的可讀性須有證據；PENDING |
| 互動與必要邊界 | Cyan `#06B6D4`／`#8B95A5`，CTA 配墨黑字 | Cyan 作 Luxury 互動角色屬本提案，不把它直接視為公司全站按鈕規則；PENDING |
| 有限金色 | `#C8A96B` 僅短裝飾線；裝飾分隔 `#3A404A` | 不染 Logo、不取代 input／focus 邊界，不是新服務等級；PENDING |
| 錯誤／正向候選 | `#FDA4AF`／`#86EFAC` | 明示為樣本，非寄送／驗證成功；PENDING |
| 官方身份外框 | 白色 Header＋原橫式 SVG，Footer `#101828`＋既有反白 SVG；白底 focus `#2563EB` | 保留原比例／色值；公司外框與 Luxury 主體分界待審；PENDING |
| 字體與階層 | 正式交付仍 Inter／Noto Sans TC；Hero 桌面 64px／手機 36px，正文至少 16px／1.7 | 沒有引入新字體；64px 是相對公司桌面 56px 基準的展示提案，需審閱；PENDING |
| 素材 | 原三筆 featured 預覽及原 Logo 檔案 | 不下載新圖、不重畫、不加金色 filter／新字體；使用現有可公開範圍；PENDING |

正文、功能邊界、focus、選取／錯誤／disabled 的實際測試結果見報告；技術對比通過仍不構成品牌 Owner 核准。Autofill／正式字體、Contact／Estimator／A4 及跨風格行為須在核准後的完整實作驗證。

## 四項獨立構圖

| 區塊 | v1 讀取方式 |
| --- | --- |
| Hero | 置中大標與單一主焦點；獨立詢問行動，沒有 Heritage 不等欄側欄 |
| 服務 | 全寬分段敘事、各自原生詳情面板；完整名稱／摘要／範圍／情境仍可閱讀 |
| 作品 | 原圖大型完整展示，圖後短資訊列、狀態／原 note 與來源導向，保留 featured 順序 |
| 合作／CTA | 五步可展開內容加獨立高對比段落；保留條件與原 CTA 文案 |

Header／Footer 有自己的 recipe；手機自然單欄、縮減留白並保留明確導覽。沒有自動影片、輪播、游標特效、hover-only 內容或假客戶成果。系列名稱只描述版面，不表示高級服務加價、保證成果或不同公司。

## 原型操作與限制

從 Repository 根目錄執行：

```sh
python3 -m http.server 3254 --bind 127.0.0.1
```

開啟 <http://127.0.0.1:3254/docs/01_design/design-collection/reviews/luxury-v1.html>。只供本機審閱，沒有部署路由或公開入口；不要把 Review HTML 複製到 public 或 out。

原生目錄、服務／合作 details 可鍵盤展開。正式網站連結導向已存在的 Modern 官網；審閱附錄的唯讀輸入、radio、disabled／error 是明示的視覺樣本，不進行 Contact 驗證、試算、儲存或傳送。原型採本機可用字體 fallback，不等同正式 next/font 字形與載入驗收。

## 核准記錄

- Owner：PENDING。
- 核准時間／對應 HTML SHA 與截圖版本：PENDING。
- palette／官方外框適用範圍／桌面與手機構圖／64-36 字階／既有字體與素材：PENDING。

[原工作包](../work-packages.md#dc005) 要求完成品牌審閱後才進入完整 Luxury 系列；本稿沒有申請變更 Logo、字體、服務事實、價格、法律政策、索引、DNS 或部署。核准後按原 16 頁完整規格繼續，不減少功能與驗收。合併與發布仍依當次明確授權。


## 後續同版本決定

使用者已回覆「批准合併」，PR #41 已合併；[同版本核准紀錄](luxury-v1-approval.md) 滿足品牌前置。以上保留原始審閱稿時點，原型／測試不冒稱完整16頁；完整實作與新功能 PR 另見 [DC-005 報告](../../../reports/dc005-implementation.md)。
