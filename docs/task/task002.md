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

本規格由既有英文 Task002 及保留原樣的[繁體中文原稿](task002.zh-TW.md)整理。英文原稿內容納入統一骨架，原版本仍可由 Git 歷史查閱。這次是文件重構，**不重新執行Task002、不改網站／素材、不重寫歷史驗收**；下列計畫與Checklist均為Pending，不代表本輪新實作。

原稿要求創建幾何SVG／CSS暫定Logo；後續使用者已提供完整SVG，已合併實作選用原稿幾何與文字輪廓。本規格保留原需求及後續素材決策界線，不能用「建立Logo元件」為理由重新設計已供資產。

## 2. Repository & Prerequisites

| 項目 | 規格／時間界線 |
| --- | --- |
| Website Repository | `https://github.com/xk2022/xk-website.git`，唯一可修改的網站Repository |
| Documentation Repository | `https://github.com/xk2022/xplore-kaleidoscope.git`，僅供讀取 |
| Base Branch | `main`；正式執行先核對最新已合併版本、status／branch／remote |
| Feature Branch | `feature/website-brand-design-system` |
| 初次網站Base SHA | `699a0cd3918203e502fe3bf1f970f2cdd819123b`，見當時實作紀錄 |
| 初次文件版本 | `3996730176e4ad7237c66f541d61405f2667934e`，當時新增已提供Logo assets，Week02仍為該次原規劃 |
| 前置依賴 | Task001已有可執行Next.js、Strict TS、Tailwind／shadcn、Lucide、字體及基本Layout |
| 初期部署方向 | 沿用Task001的Vercel就緒基礎，Task002當時尚未建立Pages pipeline |
| 後續部署架構 | Task003才引入GitHub Actions → GitHub Pages，現在維護須保留雙模式設定 |

先讀AGENTS／README，檢查 `src/app/globals.css`、`src/app/layout.tsx`、現有Components、`package.json`、lockfile、`components.json`及實際API。不得重新初始化專案、覆蓋未提交工作；衝突以已確認品牌決策及已合併架構為準並回報。

本輪 `docs/task-specifications-standardization` 只整理規格，使用者已另授權文件push／merge，由主代理交付；與未來Task002功能分支／PR不同，不因此宣稱重新完成設計系統。

## 3. Reference Documents

- [AGENTS.md](../../AGENTS.md)、[README.md](../../README.md)。
- [Task001標準規格](task001.md)、[Task001英文原稿](task001-implementation-notes.md)與[繁體中文原稿](task001-implementation-notes.zh-TW.md)。
- [Task002繁體中文原稿](task002.zh-TW.md)；本檔重構前英文原稿保留於Git歷史。
- [歷史實作紀錄](../implementation-notes.md)與[品牌設計系統／API／Task002實作報告](../brand-design-system.md)。
- [網站內保留素材的來源紀錄](../../public/brand/source/README.md)。
- 文件Repository `doc/01_business-plan/week-02/` 的 `01_brand-identity_品牌視覺識別規範.md`、`02_logo-guidelines_XK Logo 設計與使用規範.md`、`03_color-palette_品牌色彩系統規範.md`、`04_typography_品牌字體與排版規範.md`及相關架構／MVP。正式執行須核對Tree、Commit／Blob，不假設短檔名存在。

優先順序為使用者當次明確指示、已確認品牌決策與已合併網站架構、本規格、經核對的業務文件、舊規劃。舊monorepo／Backend／UI色票不得覆蓋獨立網站、既有技術及八色票。原稿Logo創建要求與已提供SVG按第6節處理，不修改文件Repository或原始素材。

## 4. Scope & Requirements

必須建立或完善：

- 中央管理Color、Typography、Spacing、Radius、Shadow、Container、Section、必要斷點、Motion Duration／Easing Tokens。
- 九種排版角色及繁體中文／英文混排，沿用Inter、Noto Sans TC。
- 重用現有shadcn Button，完善Default／Interactive Card、Container、Section。
- 可重用暫定XkLogo：尺寸、淺／深背景、字標選項與可及名稱。
- 受節制的Grid、Kaleidoscope、Gradient Accent、Geometric Shapes與品牌背景。
- 有助驗收時建立開發Showcase，但不把未完成驗收頁當公開內容。
- Strict TS、Semantic HTML、Responsive、可及操作、品質檢查及真實驗收報告。

不重建Next.js，不提前開發完整Homepage或其他商業內頁；首頁只調整共用元件／排版以驗證基礎，不新增完整首頁區塊。保留所有後續已合併功能、Dependencies／Lockfile、原始Logo、Metadata及部署限制，不倒退網站。

不新增無用套件、Backend、PostgreSQL、Contact API、AI Chatbot、Analytics、假案例／評價／統計，不實作Dark Mode。

## 5. Information Architecture & UX

本任務是視覺基礎，不是新行銷頁。驗收流程：開發Showcase → 查看Logo／色票／字體／元件／版面／圖樣 → 操作真實本機範例與頁內連結 → 檢查Responsive與Accessibility。

| 區塊／元件 | 職責與操作 |
| --- | --- |
| Logo | Primary／White／Monochrome、完整字標／Symbol、尺寸與背景 |
| Color／Typography | 八品牌值與語意用途、九排版角色、中英混排 |
| Button | 四核心樣式、三核心尺寸、Hover／Focus／Disabled；若有本機計數／重設須真實有效 |
| Card | Default內容、Interactive真實連結、選用Icon／Title／Description |
| Container／Section | 最大寬、Responsive gutter、垂直留白及背景變體 |
| BrandPattern | Grid／Kaleidoscope／Gradient／Shapes，不攔截點擊或遮文字 |

Showcase不加入公開Header／Footer導覽。手機依序直排，桌面可適度多欄；320px不裁切Logo／文字／按鈕／標籤。卡片Padding、標題層級、觸控面積與閱讀順序保持一致，裝飾不影響閱讀。

## 6. Content & Data Specification

### 6.1 品牌與素材狀態

品牌及標語以第1節為準，Logo一律Provisional，不宣稱最終核准。未確認公司資訊／案例／聯絡不補造，Showcase是技術範例，沒有假提交或已商用產品。

原稿要求Inline SVG或CSS Geometry的幾何XK Logo：辨識XK字母、Kaleidoscope、對稱結構、不依賴未授權外圖。已合併決策以使用者提供的SVG建立元件，保留Path、Transform、字標輪廓、比例與留白，不重畫或改成網頁字體。

| 文件Repository來源 | 初次 `3996730…` 版本Git Blob SHA |
| --- | --- |
| `assets/brand/logo/svg/xk-logo-primary.svg` | `bac5a304361d732222d0cee59e8e9d0a0ddf599d` |
| `assets/brand/logo/svg/xk-logo-horizontal.svg` | `e1a52e7e30c943df03a5805d06754204fa4ce484` |
| `assets/brand/logo/svg/xk-logo-symbol.svg` | `277fafce8fd03edcfc1bb9c34458318ddcd4ed22` |
| `assets/brand/logo/svg/xk-logo-white.svg` | `5c633abff13f5c99e21d9d5b936b5205b36c7f24` |

網站原稿保留在 `public/brand/source/`；來源／暫定說明見attribution。來源dark與primary／master相同，不能由檔名推定深背景版本；深背景選White。原稿 `#101828`、`#2563EB` 以 `--logo-primary`／`--logo-secondary` 獨立保留，**不替換UI八個品牌Tokens**。

### 6.2 型別與元件契約

| 元件 | 必備API／限制 |
| --- | --- |
| `XkLogo` | `size?: number`（現有預設96、SVG高度px）、`variant?: primary \| white \| monochrome`、`showWordmark?: boolean`（預設true）、`className?`；現有 `decorative?` 保留 |
| `Button` | Primary／Secondary／Outline／Ghost、Small／Medium／Large、Hover／Focus／Disabled；保留既有shadcn相容別名 |
| `Card` | Default內容容器、Interactive真實Link、選用Icon／Title／Description、一致Padding／Radius |
| `Container` | Responsive水平留白與max width、原生div props／className |
| `Section` | Default／Surface背景、統一垂直間距／className；不破壞現有Primary背景與default／compact spacing |
| `BrandPattern` | Grid／Kaleidoscope／Gradient／Shapes及className，純裝飾 |

Logo非裝飾時提供 `role="img"`、title／可及名稱「Xplore Kaleidoscope Logo（暫定版本）」；裝飾時aria-hidden，保留 `data-provisional="true"`，不產生重複SVG ID。現有橫式 `850 × 204`、Symbol `472 × 472` 比例保留。Header可用56px Symbol配可讀HTML品牌名，避免手機完整輪廓字標太小，有空間處再展示全字標。

Interactive Card整卡為Link，不嵌套Button／Link。Button的 `asChild` 用於真實連結，不接受原生button的disabled／type；停用操作採原生disabled Button，預設 `type="button"`。Props／資料保持Strict TS，不為展示新增CMS、API或通用內容引擎。

## 7. Design System & Technical Constraints

沿用App Router、React、Strict TS、Tailwind CSS4 CSS-first、shadcn/ui、Lucide及既有字體，不重新初始化或任意升級。Server Components預設，只有本機按鈕示範等互動狀態才用Client。現有manifest／lockfile保持一致，無需要不新增Dependencies。

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

CSS Custom Properties集中於 `src/app/globals.css`，品牌值、語意alias、Tailwind `@theme inline`分開；元件用語意類別，不重複硬編碼HEX。`--muted`／text-muted-foreground為文字灰，shadcn的bg-muted對應Surface，不混淆兩者。保持可及對比，不將未測Accent小字隨意用在淺背景。可保留獨立錯誤狀態，不冒作新品牌色；只預留Dark Mode擴充可能，不實作切換。

### 7.2 Typography與其餘Tokens

沿用Inter／Noto Sans TC及現有Next字體載入。九角色須Responsive字級、合理行高／字重、中英可讀，中文避免過度字距，視覺Utility不取代語意Heading。

| Role | 現有Utility | 已合併基準（px以根字級16px換算） |
| --- | --- | --- |
| Display | `type-display` | 40–64px／700／1.15 |
| H1 | `type-h1` | 36–56px／700／1.25 |
| H2 | `type-h2` | 30–40px／700／1.25 |
| H3 | `type-h3` | 24–28px／600／1.25 |
| Body Large | `type-body-lg` | 17–18px／400／1.7 |
| Body | `type-body` | 16px／400／1.7 |
| Body Small | `type-body-sm` | 14px／400／1.7 |
| Caption | `type-caption` | 12px／500／1.5 |
| Button | `type-button` | 14px／600／1.5 |

| 類別 | 要求及已合併基準 |
| --- | --- |
| Spacing | 統一尺度，沿用Tailwind `0.25rem`，避免平行任意數列 |
| Radius | Small／Medium／Large／Extra Large／Full；現有6／8／10／14／18px／full保留 |
| Shadow | Subtle／Default／Elevated，節制層次 |
| Container | 現有max80rem，gutter24px／640px起32px／1024px起48px |
| Section | 現有一般64–96px、compact40–64px，Responsive留白 |
| Motion | 現有160ms、cubic-bezier(0.2, 0, 0, 1)，只過渡必要顏色／邊框／陰影 |
| Reduced Motion | reduce時停用過渡、減少動畫，恢復適合閱讀操作的行為 |

幾何Grid、Kaleidoscope、Gradient、Shapes及品牌背景保持簡潔、專業，不過量漸層／動畫／Glassmorphism；裝飾aria-hidden、無pointer events、不遮內容，手機效能與Focus對比不得退步。

## 8. Navigation, SEO & Deployment

| 項目 | 規格及適用界線 |
| --- | --- |
| 公開路由 | 完善既有基礎首頁，不新增完整行銷頁或未實作內頁連結 |
| Showcase | 原稿Optional；已合併 `/dev/design-system` 須保留開發驗收性質 |
| Development | `npm run dev` 可開Showcase，不需要Backend或環境變數 |
| 一般production | `/dev/design-system` 預設404；明確server flag `XK_DESIGN_SYSTEM_PREVIEW=1` 才回200 |
| 旗標限制 | 不用NEXT_PUBLIC；不是登入／權限系統，不加入正式導覽 |
| Metadata／索引 | 保留首頁Title／description／canonical／OG／zh-TW與construction noindex／nofollow；Showcase亦noindex，無假OG／Schema |
| Vercel | 保留一般Next build、root `.`，初次Task002未宣稱部署完成 |
| Pages／Base Path | 初次未建立為Not Applicable；現有script存在則Required回歸，沿用條件export／Base Path／trailingSlash |
| 靜態保護 | 不公開Showcase HTML／payload，保留公開頁／404／`.nojekyll`／資源驗證 |
| Actions | 初次不要求新增；既有PR quality／pages-build及main-only deploy條件保留 |

不讓Showcase的動態檢查破壞Pages export，保留既有早期notFound及靜態排除機制。一般與Pages分開驗證，不永久將export／Base Path套進普通build，不改workflow／DNS／Custom Domain或自行發布。

## 9. File Structure & Change Scope

以下是預計正式執行範圍，不是本輪完成清單；先檢查現況再新增／完善。

| 預計動作 | 檔案／目錄 | 職責與限制 |
| --- | --- | --- |
| 完善 | `src/app/globals.css` | Tokens、Typography、版面及裝飾utilities |
| 檢查／必要調整 | `src/app/layout.tsx` | 保留Inter／Noto、語言、Metadata，不任意更換 |
| 完善 | `src/components/ui/button.tsx`、`src/components/ui/card.tsx` | 樣式／可及互動，不重複Button |
| 完善 | `src/components/layout/container.tsx`、`src/components/layout/section.tsx` | 寬度／gutter／背景／留白 |
| 完善 | `src/components/brand/xk-logo.tsx`、現有 `xk-logo-data.ts` | 原稿SVG API，不改畫 |
| 建立／完善 | `src/components/brand/brand-pattern.tsx` | 四種受節制裝飾 |
| 適用時建立／完善 | `src/app/dev/design-system/page.tsx`、`src/components/dev/button-demo.tsx` | 開發Showcase與真實本機互動，無公開export |
| 保留 | `public/brand/source/` | 原始SVG與attribution，不改原稿 |
| 最小必要調整 | 既有首頁／Header／Footer使用處 | 改用共用元件，不擴充完整首頁 |
| 更新獨立報告 | `docs/brand-design-system.md` | 本任務API／實作／測試紀錄，保留歷史 |
| 必要文件整合 | README／AGENTS／implementation notes | 使用說明與追加歷史，不改舊結果 |
| Optional證據 | 真實元件／Showcase截圖 | 原稿if available，未指定強制名稱／圖數 |

不可改文件Repo、原始SVG、Dependencies／Lockfile、workflow或無關任務。不得提交.next／out／node_modules／機密／暫存工具。必要範圍差異須列理由／影響，不為湊清單加無用修改，最後依Git diff核對。

## 10. Implementation Procedure

1. 核對status／branch／remote／最新main與Task001，保留使用者工作。
2. 讀第3節與原稿，檢查CSS／Layout／Components／packages／components.json／素材／實際API，記版本與衝突。
3. 正式開發使用 `feature/website-brand-design-system`，不重建Next.js，不混用本輪文件分支。
4. 集中八色票與語意映射，再建九Typography與Spacing／Radius／Shadow／Container／Section／Motion。
5. 完善shadcn Button、Card、Container、Section，保留原生語意與既有API。
6. 使用已提供Path／Transform／字標完善XkLogo，驗原稿與可及名稱，加入節制BrandPattern。
7. 使用Showcase時保持dev可用、production預設404／明確server flag開放，保護現有Pages排除。
8. `npm ci`後執行第11節品質指令；先驗一般server／Showcase／旗標，再驗適用Pages。
9. 五寬、axe、Keyboard／Focus／Disabled／Reduced Motion、真實連結／資源及人工視覺實測；修復後重跑最終指定驗收。
10. 更新獨立報告，檢查真實檔案清單、SVG未改、依賴未增與完整diff。
11. 正式開發Commit／Push Feature Branch／建審核PR，讀實際CI並回報，不自動merge／發布；本輪只做文件。

## 11. Testing & Acceptance Criteria

以下是正式執行計畫，全部 **Pending**；指南既有通過是歷史，不能代填本輪。每項用Required／Optional／Not Applicable與原因；條件項在實際報告選定，不用未執行冒作N/A。

| 項目 | 適用性與原因 | 接受條件 | 結果 |
| --- | --- | --- | --- |
| 可重現安裝 | Required：已有Task001 lockfile | `npm ci` exit0，無不必要套件／lock變更 | Pending |
| TypeScript | Required：Strict與元件API | `npx tsc --noEmit` exit0 | Pending |
| ESLint | Required：原稿品質要求 | `npm run lint` exit0，處理錯誤／警告 | Pending |
| 一般Build | Required：原稿品質及Vercel相容 | `npm run build` exit0，不強制export | Pending |
| Pages Build | Required：已有script；Not Applicable：初次未建立，任務不新增Pages | 適用時 `npm run build:pages` exit0 | Pending |
| 首頁／主要路由 | Required：共用元件不能破壞功能 | fresh一般production，首頁／既存公開頁200、未知404 | Pending |
| Showcase dev | Optional：原稿允許按需要建立；Required：現有已合併Showcase須回歸 | dev下 `/dev/design-system` 200、內容完整 | Pending |
| Showcase production | Required：有Showcase；Not Applicable：完全未建立，說明原因 | 一般build預設404、明確flag200、關閉重啟恢復404 | Pending |
| Logo原稿／暫定狀態 | Required：資產與品牌保護 | SVG bytes／Blob一致、Path／Transform／字標／比例正確，可及／decorative、無重複ID | Pending |
| Color | Required：八色票及語意 | 值正確、Muted文字／Surface背景分開、Logo專屬色獨立、對比可讀 | Pending |
| Typography | Required：原稿九角色 | 九角色完整、Responsive中英可讀、不過量中文字距 | Pending |
| Button | Required：原稿互動元件 | 四樣式／三尺寸／Hover／Focus／Disabled，原生停用不觸發且Tab略過；計數／重設若有實測 | Pending |
| Card | Required：Default／Interactive | Padding／Radius一致、可選Icon／Title／Description、真實Link、無巢狀互動 | Pending |
| Container／Section／Pattern | Required：共用版面與裝飾 | gutter／maxwidth／留白／背景一致，不遮內容／攔截操作 | Pending |
| 連結／跨頁 | Required：共用Layout保護 | Header／Footer／Card／CTA／錨點有效，既有跨頁／Base Path正常，無未實作URL | Pending |
| Responsive | Required：原稿五寬 | 首頁及適用Showcase在320／375／768／1440／1920px無overflow／裁切，Logo／字體／Card／Button合理 | Pending |
| axe | Required：可及性證據 | 適用頁／狀態WCAG2／2.1 A／AA，記規則／範圍／違規數 | Pending |
| Keyboard／Focus | Required：可操作 | Tab／Shift+Tab／Enter／Skip Link、Button／Card、明顯Focus與合理順序 | Pending |
| Reduced Motion | Required：原稿明確要求 | reduce下過渡0s或符合既有減少動態規則，內容不靠動畫才能讀 | Pending |
| 人工可及／視覺 | Required：掃描不足 | Heading／名稱／Alt／對比／中文／裝飾／閱讀順序人工檢查 | Pending |
| Metadata／indexing | Required：Showcase不誤發布 | 首頁canonical／OG／lang保留，Showcase無公開導覽／noindex／nofollow，無假OG／Schema | Pending |
| Console／Runtime | Required：不是只看Build | 首頁／Showcase／旗標模式無非預期Console／JS／Runtime error | Pending |
| Network／HTTP／資源 | Required：資源真實載入 | CSS／JS／字體／SVG／圖片正常，無失敗資源，預期404獨立記錄 | Pending |
| Pages Base Path／Metadata | Required：已有Pages；Not Applicable：初次未建立 | 實際Base Path下連結／資源／canonical／OG／noindex正確 | Pending |
| Pages輸出／404／.nojekyll | Required：已有Pages；Not Applicable：初次未建立 | 公開頁／404／`.nojekyll`存在，dev HTML／payload排除 | Pending |
| CI Checks | Required：有PR workflow；Not Applicable：初次未設定，不新增workflow | 查本次head的quality／pages-build及deploy條件 | Pending |
| 截圖 | Optional：原稿if available，未指定強制名稱／圖數 | 有提供則核對Logo／色票／Typography／Button／Card／Showcase真實性、尺寸／位置／人工視覺 | Pending |
| Backend／聯絡送出 | Not Applicable：明確排除 | 不建API／假送出／AI Chatbot | Pending |
| 發布／網域 | Not Applicable：非設計系統範圍 | 不改DNS／Domain、不宣稱未執行上線 | Pending |

先驗一般build的新production server並停止，再跑Pages；共用.next時不得用npm start提供export，要重測一般模式先重建。適用Pages依[既有操作指南](../github-pages-deployment.md)掛載 `/xk-website` 或實際Base Path，檢查HTTP與實體檔，不只看href。

原稿未要求導入測試框架，可使用應用依賴外的暫存瀏覽器／axe工具，不增加網站npm套件。axe不等於完整無障礙認證，需列實測狀態及未覆蓋人工輔助科技檢查。

## 12. Test Report & Evidence

獨立報告採既有 [docs/brand-design-system.md](../brand-design-system.md)，含API、設計決策與原Task002結果。再次正式執行時新增可辨識的新一輪紀錄，保留歷史快照，不將文件重構寫成新功能驗收。

至少記錄新增／修改檔案、來源Commit／Blob、色彩／語意、九Typography及其餘Tokens、XkLogo原稿／暫定說明、共用元件API、幾何視覺、Server／Client及依賴影響。

逐項列實際命令、Required／Optional／Not Applicable與原因、PASS／FAIL／N/A、Exit Code（非命令填N/A原因）、Node／npm／瀏覽器／工具／port／Commit／build模式、範圍、五寬、axe規則／違規數、Keyboard／Focus／Disabled／Reduced Motion、Console／Runtime／Network／HTTP、Pages／Showcase保護、問題修復及最終重驗，不用預期／推測／歷史代替。

截圖保留原稿if available：Logo Variations、Color Palette、Typography、Button、Card、完整Showcase，可含桌面／手機；不新設強制圖數／名稱。有產出須真實網站，記Viewport／PNG尺寸／人工檢查／實際位置，檔案存在再加相對連結；未提供如實說明，不補造歷史圖。

列限制與剩餘工作、Git／PR／真實CI。未跑新驗收時維持Pending，不把指南歷史結果改成這次執行。

## 13. Git & Pull Request

| 項目 | 正式開發流程 |
| --- | --- |
| Base Branch | 最新已合併main，記實際Base SHA；初次699a0cd僅歷史 |
| Feature Branch | `feature/website-brand-design-system`，不重設他人分支 |
| Commit | Conventional Commit，例如 `feat: implement XK brand design system` |
| Pull Request | `main ← feature/website-brand-design-system`，待審核，不直接push main |
| Diff | 完整異動、無新增依賴、原始SVG未改、無完整首頁／Backend越界 |
| CI | 查本次實際head／run；未設定記N/A，不虛構成功或ID |
| 發布 | 不自動merge、不未授權發布、不改main-only部署條件 |

本輪文件整理的Commit／Push／Merge由主代理依使用者最新授權處理，不等同重做Task002。未建立的正式功能Commit／PR／CI識別碼維持Pending，不用過去run冒充。

## 14. Deliverables

| 交付項目 | 預期內容 | 狀態 |
| --- | --- | --- |
| Design Tokens | 八色票、九Typography與全部視覺／版面／Motion尺度 | Pending |
| Shared Components | XkLogo、Button、Card、Container、Section、BrandPattern | Pending |
| Showcase（適用時） | 開發展示／真實互動、production flag／靜態保護 | Pending |
| 異動清單 | 真正新增／修改／保留檔案、素材與依賴影響 | Pending |
| 獨立實作／測試報告 | 品牌設計系統指南，分隔歷史與本次結果 | Pending |
| Responsive／Accessibility／Browser | 五寬／操作／錯誤／HTTP／適用Pages證據 | Pending |
| 截圖（Optional） | 原稿元件／Showcase真實畫面、位置與人工檢查；缺少如實說明 | Pending |
| Commit／PR／CI | 真實正式功能交付，不填假ID | Pending |
| 最終繁中回報 | 設計／API／Logo／驗收／交付／剩餘工作 | Pending |

## 15. Out of Scope & Future Work

完整Homepage、Header／Footer／Navigation商業擴充、About／Services／Solutions／Portfolio／Contact頁、Dark Mode、最終Logo核准、OG素材、正式Vercel／Domain發布與未確認商業內容屬後續。現有後續成果應保留，不能因原Task002視為未來而刪除。

不做Backend、Spring Boot、PostgreSQL、Contact API、AI Chatbot、Analytics、會員／SaaS，不加未授權Logo或更改品牌。初次Pages未建立不是缺陷，也不要求新增；已有Pages則回歸。本輪只重構規格，不執行實作／Build／依賴安裝或補造歷史結果。

## 16. Final Delivery Checklist

以下供正式執行Task002使用，本輪不勾選。

- [ ] Pending — Task001、最新main／工作目錄、原稿／指南／素材版本已核對。
- [ ] Pending — 八色票／九Typography／Tokens集中管理、Muted／Surface正確。
- [ ] Pending — XkLogo原稿／字標／比例保留，可及且Provisional，無修改原資產。
- [ ] Pending — Button／Card／Container／Section／BrandPattern完成，無重複元件／巢狀互動。
- [ ] Pending — 適用Showcase完成，production預設404／flag200及公開導覽排除已驗。
- [ ] Pending — `npm ci`通過，無不必要Dependencies／lock變更。
- [ ] Pending — TypeScript通過。
- [ ] Pending — ESLint通過。
- [ ] Pending — 一般Build通過、Vercel相容保留。
- [ ] Pending — Pages Build通過；初次無script時記Not Applicable及理由。
- [ ] Pending — 真實Button／Disabled／Card／連結與跨頁功能驗收完成。
- [ ] Pending — 五寬Responsive、中文／Logo／裝飾檢查完成。
- [ ] Pending — axe／Keyboard／Focus／Reduced Motion與人工可及檢查完成並記限制。
- [ ] Pending — Browser Console／Runtime／Network／HTTP／Metadata及資源驗收完成。
- [ ] Pending — 適用Pages Base Path／404／`.nojekyll`／dev payload排除完成或N/A原因已記。
- [ ] Pending — 獨立實作／測試報告、修正／最終重驗完成，歷史未覆寫。
- [ ] Pending — Optional截圖已提供並人工檢視，或未提供原因已記，無假連結。
- [ ] Pending — 完整Git diff／範圍／Secrets／產物已檢查。
- [ ] Pending — 正式功能Commit完成，真實SHA可查。
- [ ] Pending — 正式功能審核PR建立，未直接push main／自動merge。
- [ ] Pending — 本次真實CI確認或未設定N/A已說明，未虛構Run ID。
- [ ] Pending — 最終繁中回報完成，未改文件Repo／原素材、未越界開發／擅自發布。
