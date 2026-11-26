# Heritage v1 品牌審閱核准紀錄

日期：2026-11-26（UTC）。核准來源：本次使用者對前一則明確審閱問題回覆「核准」。

## 同版本依據

前一則問題為：「是否核准 PR #40 的配色、品牌外框與桌面／手機版型，供後續完整實作？」使用者已明確核准，無須再次要求相同確認。

- [PR #40](https://github.com/xk2022/xk-website/pull/40) 審閱版本：`cfaab65fbfb04a5d9be6deb3253865532abaad75`。
- [審閱說明固定版本](https://github.com/xk2022/xk-website/blob/cfaab65fbfb04a5d9be6deb3253865532abaad75/docs/01_design/design-collection/reviews/heritage-v1.md)。
- [原型 HTML 固定版本](https://github.com/xk2022/xk-website/blob/cfaab65fbfb04a5d9be6deb3253865532abaad75/docs/01_design/design-collection/reviews/heritage-v1.html)，SHA-256 `5d5f784ccdd75cc6c721879a1b09a833f28f694d9b2b72067e8550cb75a00509`。
- 桌面／手機畫面：[1440px](../../../screenshots/design-collection/dc004-review/heritage-1440.png)、[375px](../../../screenshots/design-collection/dc004-review/heritage-375.png)。

## 已核准範圍

| 範圍 | 決定 |
| --- | --- |
| Heritage 展示主體 | v1 紙色 `#F4E9D8`、表面 `#FFF9F0`、主文字 `#2D241E`、次文字 `#705D4A`、分隔線／功能邊界 `#D5C7B1`／`#806B55`，互動沿用 `#2563EB` |
| 品牌外框 | v1 白色 Header、正式深色 Footer 與原 Logo 的適用分界；不改 Modern 全站 |
| 版型 | 編輯式章節、不等寬 Hero、編號服務清冊、圖說作品與獨立合作／CTA；手機單欄 |
| 字階／素材 | v1 桌面 52px／手機 36px Hero；沿用正式 Inter／Noto Sans TC 自託管字體及既有未改色 Logo／真實網站預覽；沒有新字體或新下載素材 |

未使用的棕紅／黃銅候選不為湊色加入介面；任何實際表面的文字、focus、邊界與錯誤／選取／disabled 狀態仍須驗收。原型系統 fallback 的測試不取代正式 next/font 驗收。

## 開發及發布界線

本核准滿足 [DC-004 品牌前置](../work-packages.md#dc004)，可繼續原 16 頁完整工作包，不減少測試或資料一致性要求。前置 DC-003／PR #39 已合併為 `main@8ba299a5a48da41ca7f4d88d9b2149d7c83f6584`。

本核准不是公司全域換色、新 Logo／字體、新服務／價格、法律政策、索引、DNS 或正式部署核准。原型及前輪驗證保留歷史快照；不把其 PENDING／FAIL 或技術結果改寫成已完整實作。繼續同一 `feature/design-collection-heritage` 分支與 PR #40，完成開發／測試後交付功能審閱；沒有自動合併或部署授權。

公司最新 main 核對為 `e0229b97acb2bf6c2d83f8155665f68b11c27d71`，tree `f293ead9692f0e93531bdef73d6b477019ec205f`。較審閱稿版本 `d03cd673` 多 2 個知識庫 M5／RAG commits，35 份相關治理／品牌／工程／服務／定價／決議 Blob 未變；同版已讀來源沿用，不修改公司 Repository。
