# XK Logo 素材來源與使用紀錄

本目錄保留使用者提供的原始 SVG，來源為 `xk2022/xplore-kaleidoscope` 文件 Repository，讀取版本：

`3996730176e4ad7237c66f541d61405f2667934e`

原始素材位於 `assets/brand/logo/`，本次僅複製至網站 Repository；未修改文件 Repository，也未重新設計 Logo。

| 本地檔案 | 原始路徑 | 原始 Git Blob SHA |
| --- | --- | --- |
| `xk-logo-primary.svg` | `assets/brand/logo/svg/xk-logo-primary.svg` | `bac5a304361d732222d0cee59e8e9d0a0ddf599d` |
| `xk-logo-symbol.svg` | `assets/brand/logo/svg/xk-logo-symbol.svg` | `277fafce8fd03edcfc1bb9c34458318ddcd4ed22` |
| `xk-logo-horizontal.svg` | `assets/brand/logo/svg/xk-logo-horizontal.svg` | `e1a52e7e30c943df03a5805d06754204fa4ce484` |
| `xk-logo-white.svg` | `assets/brand/logo/svg/xk-logo-white.svg` | `5c633abff13f5c99e21d9d5b936b5205b36c7f24` |

原始設計檔 `assets/brand/logo/source/original-design-files/xk-logo-03-master.svg` 與 `xk-logo-primary.svg` 內容完全相同，Git Blob SHA 同為 `bac5a304361d732222d0cee59e8e9d0a0ddf599d`。

依 Task 002，這組素材仍標示為「暫定版本（Provisional Logo）」。使用者提供完成的設計素材，不等於本次實作宣稱其已獲最終品牌核准。

## 元件整合

`src/components/brand/xk-logo-data.ts` 由本目錄原始 XML 擷取兩個 XK 路徑、18 個品牌文字輪廓路徑與原始 transform。`XkLogo` 使用 inline SVG；保留原始幾何形狀、比例及文字輪廓，不以網頁字體重畫品牌文字。

- 顯示品牌文字時，使用橫式原稿的 `850 × 204` viewBox、symbol transform 與 wordmark transform。
- 僅顯示圖形時，使用圖形原稿的 `472 × 472` viewBox 與原始留白。
- `primary` 保留原稿的深色與藍色；`white` 使用原稿已提供的全白處理；`monochrome` 使用原稿已提供的深色單色處理。白色及單色在橫式／圖形式元件中沿用相同路徑，不改畫字形。
- 原稿內重複的 `symbol`、`wordmark` ID 未帶入元件，避免同頁多次使用時產生重複 DOM ID。
- 非裝飾用途提供「Xplore Kaleidoscope Logo（暫定版本）」的可及名稱與 title；已有可見文字標籤的連結可使用 `decorative` 避免重複朗讀。

## 色彩與檔名注意事項

原始 Logo 使用 `#101828`、`#2563EB` 及白色。這是保留使用者提供素材的例外，不代表更改 Task 002 已確認的 UI 品牌色票。元件透過集中管理的 `--logo-primary`、`--logo-secondary` 與白色 `--background` 使用這些色彩，其他介面仍遵循正式指定的八個初期色彩 Token。

來源 Repository 的 `xk-logo-dark.svg` 與 primary、master 完全相同；它表示深色圖稿，不能視為適用深色背景的反白版本。深色背景請使用 `white` 版本並維持足夠對比。

橫式原稿的文字輪廓相對圖形較小，請以實際尺寸檢查可讀性；手機 Header 使用圖形搭配可讀的 HTML 品牌名稱，完整橫式圖稿保留於有足夠空間的展示情境。保留原始比例及安全留白，不任意壓縮、旋轉、改畫或加入未核准的效果。
