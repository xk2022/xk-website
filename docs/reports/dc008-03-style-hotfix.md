# DC-008-03 — 萬花筒樣式發布修正

日期：2026-11-28。使用者手機截圖顯示根頁白底、圖案與文字分離、SVG 點擊遮罩顯示為黑圓環。基準 `1f93bbe39c8d02cd1dbe2a9c9162a252c4880392`。

建置產物根頁實際 `class="undefined undefined"`、缺少相應 CSS Module class；目前 Turbopack 自訂 Tailwind loader 將模組 CSS 輸出成普通 CSS，React 匯入的 class 對應未生成。PR #49 先前 HTTP 通過不足以發現此視覺問題。

- 根入口及 Gallery 改用獨立前綴的普通 CSS（`xkg2-`、`xkg1-`），保留 V2 原圖、Logo、構圖、互動和路由。SVG 點擊遮罩補上透明屬性，防止 CSS 未載入時變成黑色。
- Pages validator 新增實際 HTML class 與已連結 CSS 檔對應檢查，拒絕 undefined class、遺失核心樣式與非透明點擊目標。根頁與 Gallery 均檢查。
- 本機 TypeScript、lint、446 unit tests、Normal／Pages build 均 Exit 0；Pages HTTP 3,300 PASS、0 FAIL。實際匯出 HTML `xkg2-screen`、`xkg2-wheel` 等正確存在且連結 CSS 含 `display:grid`／`position:absolute` 等規則。真人手機畫面仍須核對；未聲稱讀屏／效能或真機驗收完成。
