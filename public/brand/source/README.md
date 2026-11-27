# XK Logo 素材來源與使用紀錄

現行識別為 2026-11-26 核准、2026-11-27 完成衍生素材驗收的 Logo V2.0。公司來源以 [原始資產交付提交](https://github.com/xk2022/xplore-kaleidoscope/tree/d7d0ffd95f199ddf7f9ef820f7562e3e70571f3e/assets/brand/logo/v2) 固定追溯，現行規範見 [公司 Logo 規範](https://github.com/xk2022/xplore-kaleidoscope/blob/main/05_brand/logo-guidelines.md)。

- [v2/](v2/)：現行 SVG 素材，逐檔保留公司來源 bytes。唯一設計母稿為 `xk-logo-premium-horizontal-master-v2.svg`，Git Blob SHA `47ee4f275431cf48660fd46d4d5b8b7090dfc83f`。
- [v1/](v1/)：Logo 03 原始 SVG、原網站 icon 與當時的來源紀錄，僅供歷史追溯。

## 元件與背景

完整字標保留 Manrope SemiBold 600 向量輪廓，不重排文字。Modern 共用 `XkLogo` 擷取母稿兩個 XK 路徑、18 個字標輪廓及原始 transforms；橫式 viewBox 為 2198 × 480，小型符號為 504 × 504。

淺色背景使用黑 X／藍 K 的 Light Combination 或 Light Monogram（#0C1017、#3977A8）；深色背景使用全白版本。Premium 黑金藍版位於 v2，適用曜石黑背景（#0C1017、#C5A46D、#3977A8）。既有三套網站配色與一般介面字體 Inter／Noto Sans TC 維持各自設計。

Heritage、Luxury 的現有白底 Header 使用 `xk-logo-dark.svg`，深色 Footer 使用 `xk-logo-white.svg`；Quotation 亦使用 Light Combination。保留原始比例與透明底，不加 filter 或重畫圖形。完整橫式建議寬 240 px，Modern 窄版使用符號搭配可讀品牌名稱；列印版實體打樣另行驗證。

網站的 `src/app/icon.svg`、`src/app/favicon.ico` 和 `src/app/apple-icon.png` 複製公司 V2 favicon，分別保留 Blob SHA `759c0370142e6ae4f145a5120a42c93047bffa4d`、`b9da95d601e24907d6731aa18b20682808a204fd`、`8211b5332225dbb604559a50059fc9c796bb657b`。
