# Task 002 — XK Brand Design System Implementation

## 1. Task Overview

| 項目 | 規格 |
| --- | --- |
| Task | 002 — 品牌設計系統建置 |
| Project / Brand | Xplore Kaleidoscope / XK |
| 前置任務 | Task 001 — Repository Bootstrap |
| 目的 | 在完整企業首頁之前，建立一致、可重用、可維護及具正式使用條件的視覺基礎 |
| 預期成果 | 集中 Tokens、Typography、Button／Card／Container／Section／Logo 與幾何視覺，支援後續全站頁面 |
| Feature Branch | `feature/website-brand-design-system` |
| Brand Slogan | Explore Possibilities. Create Digital Value. |
| Technical Tagline | Building Digital Solutions with Web, Java & AI. |

本規格由既有英文 Task 002 及可由固定歷史快照追溯的 [繁體中文原稿](https://github.com/xk2022/xk-website/blob/895b9878b6c6244cf225772f6c4f8d3e5d97affe/docs/task/task002.zh-TW.md) 整理。英文原稿內容納入統一骨架，原版本仍可由 Git 歷史查閱。這次是文件重構，**不重新執行 Task 002、不改網站／素材、不重寫歷史驗收**；下列計畫與 Checklist 均為 PENDING，不代表本輪新實作。

原稿要求創建幾何 SVG／CSS 暫定 Logo；後續使用者已提供完整 SVG，已合併實作選用原稿幾何與文字輪廓。本規格保留原需求及後續素材決策界線，不能用「建立 Logo 元件」為理由重新設計已供資產。

## 2. Repository & Prerequisites

| 項目 | 規格／時間界線 |
| --- | --- |
| Website Repository | `https://github.com/xk2022/xk-website.git`，唯一可修改的網站 Repository |
| Documentation Repository | `https://github.com/xk2022/xplore-kaleidoscope.git`，僅供讀取 |
| Base Branch | `main`；正式執行先核對最新已合併版本、status／branch／remote |
| Feature Branch | `feature/website-brand-design-system` |
| 初次網站 Base SHA | `699a0cd3918203e502fe3bf1f970f2cdd819123b`，見當時實作紀錄 |
| 初次文件版本 | `3996730176e4ad7237c66f541d61405f2667934e`，當時新增已提供 Logo assets，Week 02 仍為該次原規劃 |
| 前置依賴 | Task 001 已有可執行 Next.js、Strict TS、Tailwind／shadcn、Lucide、字體及基本 Layout |
| 初期部署方向 | 沿用 Task 001 的 Vercel 就緒基礎，Task 002 當時尚未建立 Pages pipeline |
| 後續部署架構 | Task 003 才引入 GitHub Actions → GitHub Pages，現在維護須保留雙模式設定 |

先讀 AGENTS／README，檢查 `src/app/globals.css`、`src/app/layout.tsx`、現有 Components、`package.json`、lockfile、`components.json` 及實際 API。不得重新初始化專案、覆蓋未提交工作；衝突以已確認品牌決策及已合併架構為準並回報。

前次 16 章骨架重構使用 `docs/task-specifications-standardization` 分支，已合併為歷史成果。本輪在 `docs/task-validation-policy` 進行驗收政策與格式補強，文件交付由主代理依當次使用者明確授權處理；與未來 Task 002 功能分支／PR 不同，不因此宣稱重新完成設計系統。

## 3. Reference Documents

- [AGENTS.md](../../AGENTS.md)、[README.md](../../README.md)。
- [Task 001 標準規格](task001.md)、[Task 001 英文原稿](https://github.com/xk2022/xk-website/blob/895b9878b6c6244cf225772f6c4f8d3e5d97affe/docs/task/task001-implementation-notes.md) 與 [繁體中文原稿](https://github.com/xk2022/xk-website/blob/895b9878b6c6244cf225772f6c4f8d3e5d97affe/docs/task/task001-implementation-notes.zh-TW.md)。
- [Task 002 繁體中文原稿](https://github.com/xk2022/xk-website/blob/895b9878b6c6244cf225772f6c4f8d3e5d97affe/docs/task/task002.zh-TW.md)；本檔重構前英文原稿保留於 Git 歷史。
- [歷史實作紀錄](../98_decisions/implementation-notes.md) 與 [品牌設計系統／API／Task 002 實作報告](../reports/brand-design-system.md)。
- [網站內保留素材的來源紀錄](../../public/brand/source/README.md)。
- 文件 Repository `doc/01_business-plan/week-02/` 的 `01_brand-identity_品牌視覺識別規範.md`、`02_logo-guidelines_XK Logo 設計與使用規範.md`、`03_color-palette_品牌色彩系統規範.md`、`04_typography_品牌字體與排版規範.md` 及相關架構／MVP。正式執行須核對 Tree、Commit／Blob，不假設短檔名存在。

優先順序為使用者當次明確指示、已確認品牌決策與已合併網站架構、本規格、經核對的業務文件、舊規劃。舊 monorepo／Backend／UI 色票不得覆蓋獨立網站、既有技術及八色票。原稿 Logo 創建要求與已提供 SVG 按第 6 節處理，不修改文件 Repository 或原始素材。

## 4. Scope & Requirements

必須建立或完善：

- 中央管理 Color、Typography、Spacing、Radius、Shadow、Container、Section、必要斷點、Motion Duration／Easing Tokens。
- 九種排版角色及繁體中文／英文混排，沿用 Inter、Noto Sans TC。
- 重用現有 shadcn Button，完善 Default／Interactive Card、Container、Section。
- 可重用暫定 XkLogo：尺寸、淺／深背景、字標選項與可及名稱。
- 受節制的 Grid、Kaleidoscope、Gradient Accent、Geometric Shapes 與品牌背景。
- 有助驗收時建立開發 Showcase，但不把未完成驗收頁當公開內容。
- Strict TS、Semantic HTML、Responsive、可及操作、品質檢查及真實驗收報告。

不重建 Next.js，不提前開發完整 Homepage 或其他商業內頁；首頁只調整共用元件／排版以驗證基礎，不新增完整首頁區塊。保留所有後續已合併功能、Dependencies／Lockfile、原始 Logo、Metadata 及部署限制，不倒退網站。

不新增無用套件、Backend、PostgreSQL、Contact API、AI Chatbot、Analytics、假案例／評價／統計，不實作 Dark Mode。

## 5. Information Architecture & UX

本任務是視覺基礎，不是新行銷頁。驗收流程：開發 Showcase → 查看 Logo／色票／字體／元件／版面／圖樣 → 操作真實本機範例與頁內連結 → 檢查 Responsive 與 Accessibility。

| 區塊／元件 | 職責與操作 |
| --- | --- |
| Logo | Primary／White／Monochrome、完整字標／Symbol、尺寸與背景 |
| Color／Typography | 八品牌值與語意用途、九排版角色、中英混排 |
| Button | 四核心樣式、三核心尺寸、Hover／Focus／Disabled；若有本機計數／重設須真實有效 |
| Card | Default 內容、Interactive 真實連結、選用 Icon／Title／Description |
| Container／Section | 最大寬、Responsive gutter、垂直留白及背景變體 |
| BrandPattern | Grid／Kaleidoscope／Gradient／Shapes，不攔截點擊或遮文字 |

Showcase 不加入公開 Header／Footer 導覽。手機依序直排，桌面可適度多欄；320 px 不裁切 Logo／文字／按鈕／標籤。卡片 Padding、標題層級、觸控面積與閱讀順序保持一致，裝飾不影響閱讀。

## 6. Content & Data Specification

### 6.1 品牌與素材狀態

品牌及標語以第 1 節為準，Logo 一律 Provisional，不宣稱最終核准。未確認公司資訊／案例／聯絡不補造，Showcase 是技術範例，沒有假提交或已商用產品。

原稿要求 Inline SVG 或 CSS Geometry 的幾何 XK Logo：辨識 XK 字母、Kaleidoscope、對稱結構、不依賴未授權外圖。已合併決策以使用者提供的 SVG 建立元件，保留 Path、Transform、字標輪廓、比例與留白，不重畫或改成網頁字體。

| 文件 Repository 來源 | 初次 `3996730…` 版本 Git Blob SHA |
| --- | --- |
| `assets/brand/logo/svg/xk-logo-primary.svg` | `bac5a304361d732222d0cee59e8e9d0a0ddf599d` |
| `assets/brand/logo/svg/xk-logo-horizontal.svg` | `e1a52e7e30c943df03a5805d06754204fa4ce484` |
| `assets/brand/logo/svg/xk-logo-symbol.svg` | `277fafce8fd03edcfc1bb9c34458318ddcd4ed22` |
| `assets/brand/logo/svg/xk-logo-white.svg` | `5c633abff13f5c99e21d9d5b936b5205b36c7f24` |

網站原稿保留在 `public/brand/source/`；來源／暫定說明見 attribution。來源 dark 與 primary／master 相同，不能由檔名推定深背景版本；深背景選 White。原稿 `#101828`、`#2563EB` 以 `--logo-primary`／`--logo-secondary` 獨立保留，**不替換 UI 八個品牌 Tokens**。

### 6.2 型別與元件契約

| 元件 | 必備 API／限制 |
| --- | --- |
| `XkLogo` | `size?: number`（現有預設 96、SVG 高度 px）、`variant?: primary \| white \| monochrome`、`showWordmark?: boolean`（預設 true）、`className?`；現有 `decorative?` 保留 |
| `Button` | Primary／Secondary／Outline／Ghost、Small／Medium／Large、Hover／Focus／Disabled；保留既有 shadcn 相容別名 |
| `Card` | Default 內容容器、Interactive 真實 Link、選用 Icon／Title／Description、一致 Padding／Radius |
| `Container` | Responsive 水平留白與 max width、原生 div props／className |
| `Section` | Default／Surface 背景、統一垂直間距／className；不破壞現有 Primary 背景與 default／compact spacing |
| `BrandPattern` | Grid／Kaleidoscope／Gradient／Shapes 及 className，純裝飾 |

Logo 非裝飾時提供 `role="img"`、title／可及名稱「Xplore Kaleidoscope Logo（暫定版本）」；裝飾時 aria-hidden，保留 `data-provisional="true"`，不產生重複 SVG ID。現有橫式 `850 × 204`、Symbol `472 × 472` 比例保留。Header 可用 56 px Symbol 配可讀 HTML 品牌名，避免手機完整輪廓字標太小，有空間處再展示全字標。

Interactive Card 整卡為 Link，不嵌套 Button／Link。Button 的 `asChild` 用於真實連結，不接受原生 button 的 disabled／type；停用操作採原生 disabled Button，預設 `type="button"`。Props／資料保持 Strict TS，不為展示新增 CMS、API 或通用內容引擎。

## 7. Design System & Technical Constraints

沿用 App Router、React、Strict TS、Tailwind CSS 4 CSS-first、shadcn/ui、Lucide 及既有字體，不重新初始化或任意升級。Server Components 預設，只有本機按鈕示範等互動狀態才用 Client。現有 manifest／lockfile 保持一致，無需要不新增 Dependencies。

### 7.1 色彩與語意

| Token | HEX | 用途 |
| --- | --- | --- |
| Primary | `#101A33` | 品牌主色 |
| Secondary | `#3157D5` | 品牌輔助色 |
| Accent | `#19B8D5` | 節制強調／裝飾 |
| Background | `#FFFFFF` | 主要背景 |
| Surface | `#F5F7FB` | 區塊背景 |
| Foreground | `#172033` | 主要文字 |
| Muted | `#667085` | 次要文字 |
| Border | `#E4E8F0` | 邊框 |

CSS Custom Properties 集中於 `src/app/globals.css`，品牌值、語意 alias、Tailwind `@theme inline` 分開；元件用語意類別，不重複硬編碼 HEX。`--muted`／text-muted-foreground 為文字灰，shadcn 的 bg-muted 對應 Surface，不混淆兩者。保持可及對比，不將未測 Accent 小字隨意用在淺背景。可保留獨立錯誤狀態，不冒作新品牌色；只預留 Dark Mode 擴充可能，不實作切換。

### 7.2 Typography 與其餘 Tokens

沿用 Inter／Noto Sans TC 及現有 Next 字體載入。九角色須 Responsive 字級、合理行高／字重、中英可讀，中文避免過度字距，視覺 Utility 不取代語意 Heading。

| Role | 現有 Utility | 已合併基準（px 以根字級 16 px 換算） |
| --- | --- | --- |
| Display | `type-display` | 40–64 px／700／1.15 |
| H1 | `type-h1` | 36–56 px／700／1.25 |
| H2 | `type-h2` | 30–40 px／700／1.25 |
| H3 | `type-h3` | 24–28 px／600／1.25 |
| Body Large | `type-body-lg` | 17–18 px／400／1.7 |
| Body | `type-body` | 16 px／400／1.7 |
| Body Small | `type-body-sm` | 14 px／400／1.7 |
| Caption | `type-caption` | 12 px／500／1.5 |
| Button | `type-button` | 14 px／600／1.5 |

| 類別 | 要求及已合併基準 |
| --- | --- |
| Spacing | 統一尺度，沿用 Tailwind `0.25rem`，避免平行任意數列 |
| Radius | Small／Medium／Large／Extra Large／Full；現有 6／8／10／14／18 px／full 保留 |
| Shadow | Subtle／Default／Elevated，節制層次 |
| Container | 現有 max 80 rem，gutter 24 px／640 px 起 32 px／1024 px 起 48 px |
| Section | 現有一般 64–96 px、compact 40–64 px，Responsive 留白 |
| Motion | 現有 160 ms、cubic-bezier(0.2, 0, 0, 1)，只過渡必要顏色／邊框／陰影 |
| Reduced Motion | reduce 時停用過渡、減少動畫，恢復適合閱讀操作的行為 |

幾何 Grid、Kaleidoscope、Gradient、Shapes 及品牌背景保持簡潔、專業，不過量漸層／動畫／Glassmorphism；裝飾 aria-hidden、無 pointer events、不遮內容，手機效能與 Focus 對比不得退步。

## 8. Navigation, SEO & Deployment

| 項目 | 規格及適用界線 |
| --- | --- |
| 公開路由 | 完善既有基礎首頁，不新增完整行銷頁或未實作內頁連結 |
| Showcase | 原稿 Optional；已合併 `/dev/design-system` 須保留開發驗收性質 |
| Development | `npm run dev` 可開 Showcase，不需要 Backend 或環境變數 |
| 一般 production | `/dev/design-system` 預設 404；明確 server flag `XK_DESIGN_SYSTEM_PREVIEW=1` 才回 200 |
| 旗標限制 | 不用 NEXT_PUBLIC；不是登入／權限系統，不加入正式導覽 |
| Metadata／索引 | 保留首頁 Title／description／canonical／OG／zh-TW 與 construction noindex／nofollow；Showcase 亦 noindex，無假 OG／Schema |
| Vercel | 保留一般 Next build、root `.`，初次 Task 002 未宣稱部署完成 |
| Pages／Base Path | 初次未建立為 Not Applicable；現有 script 存在則 Required 回歸，沿用條件 export／Base Path／trailingSlash |
| 靜態保護 | 不公開 Showcase HTML／payload，保留公開頁／404／`.nojekyll`／資源驗證 |
| Actions | 初次不要求新增；既有 PR quality／pages-build 及 main-only deploy 條件保留 |

不讓 Showcase 的動態檢查破壞 Pages export，保留既有早期 notFound 及靜態排除機制。一般與 Pages 分開驗證，不永久將 export／Base Path 套進普通 build，不改 workflow／DNS／Custom Domain 或自行發布。

## 9. File Structure & Change Scope

以下是預計正式執行範圍，不是本輪完成清單；先檢查現況再新增／完善。

| 預計動作 | 檔案／目錄 | 職責與限制 |
| --- | --- | --- |
| 完善 | `src/app/globals.css` | Tokens、Typography、版面及裝飾 utilities |
| 檢查／必要調整 | `src/app/layout.tsx` | 保留 Inter／Noto、語言、Metadata，不任意更換 |
| 完善 | `src/components/ui/button.tsx`、`src/components/ui/card.tsx` | 樣式／可及互動，不重複 Button |
| 完善 | `src/components/layout/container.tsx`、`src/components/layout/section.tsx` | 寬度／gutter／背景／留白 |
| 完善 | `src/components/brand/xk-logo.tsx`、現有 `xk-logo-data.ts` | 原稿 SVG API，不改畫 |
| 建立／完善 | `src/components/brand/brand-pattern.tsx` | 四種受節制裝飾 |
| 適用時建立／完善 | `src/app/dev/design-system/page.tsx`、`src/components/dev/button-demo.tsx` | 開發 Showcase 與真實本機互動，無公開 export |
| 保留 | `public/brand/source/` | 原始 SVG 與 attribution，不改原稿 |
| 最小必要調整 | 既有首頁／Header／Footer 使用處 | 改用共用元件，不擴充完整首頁 |
| 更新獨立報告 | `docs/brand-design-system.md` | 本任務 API／實作／測試紀錄，保留歷史 |
| 必要文件整合 | README／AGENTS／implementation notes | 使用說明與追加歷史，不改舊結果 |
| Optional 證據 | 真實元件／Showcase 截圖 | 原稿 if available，未指定強制名稱／圖數 |

不可改文件 Repo、原始 SVG、Dependencies／Lockfile、workflow 或無關任務。不得提交.next／out／node_modules／機密／暫存工具。必要範圍差異須列理由／影響，不為湊清單加無用修改，最後依 Git diff 核對。

## 10. Implementation Procedure

1. 核對 status／branch／remote／最新 main 與 Task 001，保留使用者工作。
2. 讀第 3 節與原稿，檢查 CSS／Layout／Components／packages／components.json／素材／實際 API，記版本與衝突。
3. 正式開發使用 `feature/website-brand-design-system`，不重建 Next.js，不混用本輪文件分支。
4. 集中八色票與語意映射，再建九 Typography 與 Spacing／Radius／Shadow／Container／Section／Motion。
5. 完善 shadcn Button、Card、Container、Section，保留原生語意與既有 API。
6. 使用已提供 Path／Transform／字標完善 XkLogo，驗原稿與可及名稱，加入節制 BrandPattern。
7. 使用 Showcase 時保持 dev 可用、production 預設 404／明確 server flag 開放，保護現有 Pages 排除。
8. `npm ci` 後執行第 11 節品質指令；先驗一般 server／Showcase／旗標，再驗適用 Pages。
9. 五種指定寬度、axe、Keyboard／Focus／Disabled／Reduced Motion、真實連結／資源及人工視覺實測；修復後重跑最終指定驗收。
10. 更新獨立報告，檢查真實檔案清單、SVG 未改、依賴未增與完整 diff。
11. 正式開發 Commit／Push Feature Branch／建審核 PR，讀實際 CI 並回報，不自動 merge／發布；本輪只做文件。

## 11. Testing & Acceptance Criteria

### Test Status Definitions

適用性與執行狀態分開記錄：`Required`、`Optional`、`Not Applicable` 表示測試是否適用；以下五個值才是執行狀態。所有待執行項目的初始狀態為 `PENDING`。

| 狀態 | 意義與記錄規則 |
| --- | --- |
| PENDING | 尚未執行；記錄待辦事項。Optional 選擇不執行時，保留此狀態並說明原因，不因此改為 N/A。 |
| PASS | 已實際執行且符合預期，附上可追溯證據。 |
| FAIL | 已實際執行但未符合預期，記錄原因、影響、修正與重驗結果。 |
| BLOCKED | 因外部服務、權限、素材或環境條件，無法開始或完成驗收；記錄實際阻礙及解除條件，不冒作 N/A。 |
| N/A | 經本次適用性判定確認不適用，記錄理由與判定依據；不能用來掩蓋未執行、失敗或外部阻礙。 |

歷史報告中的 `NOT RUN` 僅保留原始寫法；本次正式執行統一使用 `PENDING`。若測試已產生不符合預期的結果，保留 `FAIL` 與外部原因，不因外部原因改寫成 PASS。

以下是正式執行計畫，全部 **PENDING**；指南既有通過是歷史，不能代填本輪。每項用 Required／Optional／Not Applicable 與原因；條件項在實際報告選定，不用未執行冒作 N/A。

| 項目 | 適用性與原因 | 接受條件 | 結果 |
| --- | --- | --- | --- |
| 可重現安裝 | Required：已有 Task 001 lockfile | `npm ci` exit 0，無不必要套件／lock 變更 | PENDING |
| TypeScript | Required：Strict 與元件 API | `npx tsc --noEmit` exit 0 | PENDING |
| ESLint | Required：原稿品質要求 | `npm run lint` exit 0，處理錯誤／警告 | PENDING |
| 一般 Build | Required：原稿品質及 Vercel 相容 | `npm run build` exit 0，不強制 export | PENDING |
| Pages Build | Required：已有 script；Not Applicable：初次未建立，任務不新增 Pages | 適用時 `npm run build:pages` exit 0 | PENDING |
| 首頁／主要路由 | Required：共用元件不能破壞功能 | fresh 一般 production，首頁／既存公開頁 200、未知 404 | PENDING |
| Showcase dev | Optional：原稿允許按需要建立；Required：現有已合併 Showcase 須回歸 | dev 下 `/dev/design-system` 200、內容完整 | PENDING |
| Showcase production | Required：有 Showcase；Not Applicable：完全未建立，說明原因 | 一般 build 預設 404、明確 flag 200、關閉重啟恢復 404 | PENDING |
| Logo 原稿／暫定狀態 | Required：資產與品牌保護 | SVG bytes／Blob 一致、Path／Transform／字標／比例正確，可及／decorative、無重複 ID | PENDING |
| Color | Required：八色票及語意 | 值正確、Muted 文字／Surface 背景分開、Logo 專屬色獨立、對比可讀 | PENDING |
| Typography | Required：原稿九角色 | 九角色完整、Responsive 中英可讀、不過量中文字距 | PENDING |
| Button | Required：原稿互動元件 | 四樣式／三尺寸／Hover／Focus／Disabled，原生停用不觸發且 Tab 略過；計數／重設若有實測 | PENDING |
| Card | Required：Default／Interactive | Padding／Radius 一致、可選 Icon／Title／Description、真實 Link、無巢狀互動 | PENDING |
| Container／Section／Pattern | Required：共用版面與裝飾 | gutter／maxwidth／留白／背景一致，不遮內容／攔截操作 | PENDING |
| 連結／跨頁 | Required：共用 Layout 保護 | Header／Footer／Card／CTA／錨點有效，既有跨頁／Base Path 正常，無未實作 URL | PENDING |
| Responsive | Required：原稿五種指定寬度 | 首頁及適用 Showcase 在 320／375／768／1440／1920 px 無 overflow／裁切，Logo／字體／Card／Button 合理 | PENDING |
| axe | Required：可及性證據 | 適用頁／狀態 WCAG 2／2.1 A／AA，記規則／範圍／違規數 | PENDING |
| Keyboard／Focus | Required：可操作 | Tab／Shift+Tab／Enter／Skip Link、Button／Card、明顯 Focus 與合理順序 | PENDING |
| Reduced Motion | Required：原稿明確要求 | reduce 下過渡 0 s 或符合既有減少動態規則，內容不靠動畫才能讀 | PENDING |
| 人工可及／視覺 | Required：掃描不足 | Heading／名稱／Alt／對比／中文／裝飾／閱讀順序人工檢查 | PENDING |
| Metadata／indexing | Required：Showcase 不誤發布 | 首頁 canonical／OG／lang 保留，Showcase 無公開導覽／noindex／nofollow，無假 OG／Schema | PENDING |
| Console／Runtime | Required：不是只看 Build | 首頁／Showcase／旗標模式無非預期 Console／JS／Runtime error | PENDING |
| Network／HTTP／資源 | Required：資源真實載入 | CSS／JS／字體／SVG／圖片正常，無失敗資源，預期 404 獨立記錄 | PENDING |
| Pages Base Path／Metadata | Required：已有 Pages；Not Applicable：初次未建立 | 實際 Base Path 下連結／資源／canonical／OG／noindex 正確 | PENDING |
| Pages 輸出／404／.nojekyll | Required：已有 Pages；Not Applicable：初次未建立 | 公開頁／404／`.nojekyll` 存在，dev HTML／payload 排除 | PENDING |
| CI Checks | Required：有 PR workflow；Not Applicable：初次未設定，不新增 workflow | 查本次 head 的 quality／pages-build 及 deploy 條件 | PENDING |
| 截圖 | Optional：原稿 if available，未指定強制名稱／圖數 | 有提供則核對 Logo／色票／Typography／Button／Card／Showcase 真實性、尺寸／位置／人工視覺 | PENDING |
| Backend／聯絡送出 | Not Applicable：明確排除 | 不建 API／假送出／AI Chatbot | PENDING |
| 發布／網域 | Not Applicable：非設計系統範圍 | 不改 DNS／Domain、不宣稱未執行上線 | PENDING |

先驗一般 build 的新 production server 並停止，再跑 Pages；共用.next 時不得用 npm start 提供 export，要重測一般模式先重建。適用 Pages 依 [既有操作指南](../reports/github-pages-deployment.md) 掛載 `/xk-website` 或實際 Base Path，檢查 HTTP 與實體檔，不只看 href。

原稿未要求導入測試框架，可使用應用依賴外的暫存瀏覽器／axe 工具，不增加網站 npm 套件。axe 不等於完整無障礙認證，需列實測狀態及未覆蓋人工輔助科技檢查。

### Test Failure Policy

- `FAIL` 不得標記為 `PASS`，原始失敗與重驗紀錄均須保留。
- 發現問題必須記錄原因、影響範圍及修正方式；可修正的問題應先修正，再重新執行相關測試及必要回歸。
- 無法修正的問題必須列入報告的 Known Issues，註明嚴重程度、交付影響、目前狀態及後續處理方式。
- 存在阻礙交付的 `FAIL` 或必要驗收的 `BLOCKED`，不得宣稱任務完整通過。交付須符合原規格；不適用項目只有在附上理由與依據後才能記為 `N/A`。
- 不得透過跳過測試、降低驗收標準、隱藏錯誤或展示舊成功結果取得 `PASS`。
- 外部服務、權限或環境造成的阻礙，必須記錄實際原因、發生時間、影響測試及解除條件；不得虛構執行結果。

## 12. Test Report & Evidence

獨立報告採既有 [docs/brand-design-system.md](../reports/brand-design-system.md)，含 API、設計決策與原 Task 002 結果。再次正式執行時新增可辨識的新一輪紀錄，保留歷史快照，不將文件重構寫成新功能驗收。

至少記錄新增／修改檔案、來源 Commit／Blob、色彩／語意、九 Typography 及其餘 Tokens、XkLogo 原稿／暫定說明、共用元件 API、幾何視覺、Server／Client 及依賴影響。

逐項列實際命令、Required／Optional／Not Applicable 與原因、PENDING／PASS／FAIL／BLOCKED／N/A、Exit Code（非命令填「不適用」並說明原因）、Node／npm／瀏覽器／工具／port／Commit／build 模式、範圍、五種指定寬度、axe 規則／違規數、Keyboard／Focus／Disabled／Reduced Motion、Console／Runtime／Network／HTTP、Pages／Showcase 保護、問題修復及最終重驗，不用預期／推測／歷史代替。

截圖保留原稿 if available：Logo Variations、Color Palette、Typography、Button、Card、完整 Showcase，可含桌面／手機；不新設強制圖數／名稱。有產出須真實網站，記 Viewport／PNG 尺寸／人工檢查／實際位置，檔案存在再加相對連結；未提供如實說明，不補造歷史圖。

列限制與剩餘工作、Git／PR／真實 CI。未跑新驗收時維持 PENDING，不把指南歷史結果改成這次執行。

### Evidence Requirements

每項測試使用唯一 Test ID，盡可能完整提供下列欄位；無法取得的證據須在 Notes 說明實際原因。預期結果與實際結果分欄記錄，不得只寫「測試通過」而沒有可追溯的驗收依據。

| 欄位 | 說明 |
| --- | --- |
| Test ID | 本次報告內唯一且穩定的測試識別碼，可供問題、截圖與重驗紀錄引用。 |
| Test Item | 測試項目、對應第 11 節要求、適用性及範圍。 |
| Command / Procedure | 實際執行的完整指令、參數或人工操作步驟。 |
| Environment | OS、Node.js、npm、Browser 與工具版本；附執行時間、URL、建置模式、Base Path、Viewport 及受測程式碼版本。 |
| Expected Result | 執行前依規格確認的預期結果，不因失敗而降低標準。 |
| Actual Result | 本次實際觀察到的結果、錯誤、數值及測試範圍。 |
| Exit Code | 真實退出代碼；人工操作或未啟動的命令填「不適用」並附原因，不捏造 0，且不因此把整項 Status 改為 N/A。 |
| Status | 僅使用 PENDING / PASS / FAIL / BLOCKED / N/A，依第 11 節定義判定。 |
| Evidence | 對應的 Log、Screenshot、HTTP Response、Actions run／job 或其他可追溯證據位置；無實際檔案不建立假連結。 |
| Notes | 問題、限制、適用性理由、Known Issues、修正及重驗 Test ID／證據。 |

### Report Completion Gate

- 獨立實作／測試報告的本機驗收內容必須在建立 PR 前完成，並與功能程式碼一併納入該 PR；不得在缺少本機報告時宣稱可完整交付。
- 報告須記錄受測程式碼的 Commit 或 tree／diff、測試時間及範圍，並在 PR 對照實際提交版本。最後一次本機測試必須對應實際提交的程式碼；不能引用舊版本結果冒充現版驗收。
- 後續修改程式碼時，必須重跑受影響測試與必要回歸，同步更新報告、截圖及證據，再確認最終程式碼版本一致。僅新增報告或遠端結果時，也須確認受測程式碼未改變並檢查文件連結。
- PR CI、PR Review、合併後 main CI、部署與公開網址驗證尚未發生時，如實保留 `PENDING` 並說明階段；實際發生後補上真實證據，不為了 PR 前完成報告而預填成功。

## 13. Git & Pull Request

| 項目 | 正式開發流程 |
| --- | --- |
| Base Branch | 最新已合併 main，記實際 Base SHA；初次 699a0cd 僅歷史 |
| Feature Branch | `feature/website-brand-design-system`，不重設他人分支 |
| Commit | Conventional Commit，例如 `feat: implement XK brand design system` |
| Pull Request | `main ← feature/website-brand-design-system`，待審核，不直接 push main |
| Diff | 完整異動、無新增依賴、原始 SVG 未改、無完整首頁／Backend 越界 |
| CI | 查本次實際 head／run；未設定記 N/A，不虛構成功或 ID |
| 發布 | 不自動 merge、不未授權發布、不改 main-only 部署條件 |

本輪文件整理的 Commit／Push／Merge 由主代理依使用者最新授權處理，不等同重做 Task 002。未建立的正式功能 Commit／PR／CI 識別碼維持 PENDING，不用過去 run 冒充。

### Review, Merge & Deployment Boundaries

下列階段各自記錄狀態與證據，不能互相替代；本機／PR 交付不要求執行尚未授權的合併或發布。

| 階段 | 必須確認的依據與界線 |
| --- | --- |
| 本機開發與驗收 | 第 11–12 節適用檢查、受測程式碼版本、實際結果與獨立報告。 |
| Feature Branch Commit | 已提交並推送的實際 SHA 與完整 Diff，對照報告中的受測程式碼；Commit 本身不代表 PR CI 通過。 |
| PR CI 驗收 | 本次 PR head 的實際 run／job、建置與 artifact；Deploy SKIPPED 不代表正式部署成功。 |
| PR Review | 記錄實際審查狀態、意見及處理結果；CI 成功不等於審查通過。 |
| 使用者授權合併 | 取得明確授權後才可合併，並記錄真實 PR／Merge SHA／時間；未授權時保持待審，不自行合併。 |
| 合併後 main CI | 若已獲授權合併，核對 Merge SHA 對應的 main run／jobs，不沿用 PR CI 結果。 |
| 正式部署與公開網址驗證 | 分別確認部署工作成功，以及實際公開 URL 的 HTTP、頁面內容、靜態資源、Base Path 與必要 Smoke；僅部署成功而未檢查公開 URL 時，公開驗證仍為 PENDING。 |

不能把 PR CI 通過、artifact 產生或 PR 合併直接視為正式網站部署成功。未獲合併／發布授權，或未取得部署及公開 URL 證據時，最終報告須分別說明實際狀態，不更改既有部署條件來取得成功結果。

## 14. Deliverables

| 交付項目 | 預期內容 | 狀態 |
| --- | --- | --- |
| Design Tokens | 八色票、九 Typography 與全部視覺／版面／Motion 尺度 | PENDING |
| Shared Components | XkLogo、Button、Card、Container、Section、BrandPattern | PENDING |
| Showcase（適用時） | 開發展示／真實互動、production flag／靜態保護 | PENDING |
| 異動清單 | 真正新增／修改／保留檔案、素材與依賴影響 | PENDING |
| 獨立實作／測試報告 | 品牌設計系統指南，分隔歷史與本次結果 | PENDING |
| Responsive／Accessibility／Browser | 五種指定寬度／操作／錯誤／HTTP／適用 Pages 證據 | PENDING |
| 截圖（Optional） | 原稿元件／Showcase 真實畫面、位置與人工檢查；缺少如實說明 | PENDING |
| Commit／PR／CI | 真實正式功能交付，不填假 ID | PENDING |
| 最終繁中回報 | 設計／API／Logo／驗收／交付／剩餘工作 | PENDING |

## 15. Out of Scope & Future Work

完整 Homepage、Header／Footer／Navigation 商業擴充、About／Services／Solutions／Portfolio／Contact 頁、Dark Mode、最終 Logo 核准、OG 素材、正式 Vercel／Domain 發布與未確認商業內容屬後續。現有後續成果應保留，不能因原 Task 002 視為未來而刪除。

不做 Backend、Spring Boot、PostgreSQL、Contact API、AI Chatbot、Analytics、會員／SaaS，不加未授權 Logo 或更改品牌。初次 Pages 未建立不是缺陷，也不要求新增；已有 Pages 則回歸。本輪只重構規格，不執行實作／Build／依賴安裝或補造歷史結果。

## 16. Final Delivery Checklist

以下供正式執行 Task 002 使用，本輪不勾選。

執行狀態依第 11 節統一使用 `PENDING`、`PASS`、`FAIL`、`BLOCKED`、`N/A`。僅有證據的 `PASS` 可勾選；其餘保持未勾選，`N/A` 附判定理由且不視為缺少適用驗收。必要項目仍為 `PENDING`、`FAIL` 或 `BLOCKED` 時，不得宣稱完整通過。以下是規格初始清單，本輪文件修訂不代填功能結果。

- [ ] PENDING — Task 001、最新 main／工作目錄、原稿／指南／素材版本已核對。
- [ ] PENDING — 八色票／九 Typography／Tokens 集中管理、Muted／Surface 正確。
- [ ] PENDING — XkLogo 原稿／字標／比例保留，可及且 Provisional，無修改原資產。
- [ ] PENDING — Button／Card／Container／Section／BrandPattern 完成，無重複元件／巢狀互動。
- [ ] PENDING — 適用 Showcase 完成，production 預設 404／flag 200 及公開導覽排除已驗。
- [ ] PENDING — `npm ci` 通過，無不必要 Dependencies／lock 變更。
- [ ] PENDING — TypeScript 通過。
- [ ] PENDING — ESLint 通過。
- [ ] PENDING — 一般 Build 通過、Vercel 相容保留。
- [ ] PENDING — Pages Build 通過；初次無 script 時記 Not Applicable 及理由。
- [ ] PENDING — 真實 Button／Disabled／Card／連結與跨頁功能驗收完成。
- [ ] PENDING — 五種指定寬度 Responsive、中文／Logo／裝飾檢查完成。
- [ ] PENDING — axe／Keyboard／Focus／Reduced Motion 與人工可及檢查完成並記限制。
- [ ] PENDING — Browser Console／Runtime／Network／HTTP／Metadata 及資源驗收完成。
- [ ] PENDING — 適用 Pages Base Path／404／`.nojekyll`／dev payload 排除完成或 N/A 原因已記。
- [ ] PENDING — 獨立實作／測試報告、修正／最終重驗完成，歷史未覆寫。
- [ ] PENDING — Optional 截圖已提供並人工檢視，或未提供原因已記，無假連結。
- [ ] PENDING — 完整 Git diff／範圍／Secrets／產物已檢查。
- [ ] PENDING — 正式功能 Commit 完成，真實 SHA 可查。
- [ ] PENDING — 正式功能審核 PR 建立，未直接 push main／自動 merge。
- [ ] PENDING — 本次真實 CI 確認或未設定 N/A 已說明，未虛構 Run ID。
- [ ] PENDING — 最終繁中回報完成，未改文件 Repo／原素材、未越界開發／擅自發布。

- [ ] PENDING — Test Failure Policy 已遵守，失敗、阻礙與 Known Issues 有完整記錄，沒有阻礙交付的未解決必要驗收。
- [ ] PENDING — 每項測試的 Test ID、預期／實際結果、狀態與可追溯證據已記錄，沒有以預期或舊結果代填。
- [ ] PENDING — 獨立報告已在 PR 建立前完成並納入同一 PR，最後測試、後續重驗與實際提交的程式碼一致。
- [ ] PENDING — 本機、Feature Commit、PR CI、PR Review、合併授權、main CI、部署與公開 URL 驗證分別記錄；未發生階段維持 PENDING 並說明，沒有冒稱已發布。
