# XK 品牌設計系統 — Task 002

本文件說明 Xplore Kaleidoscope 的共用視覺基礎與元件 API。品牌標語為 **Explore Possibilities. Create Digital Value.**，技術標語為 **Building Digital Solutions with Web, Java & AI.**。

## 範圍與規格來源

依據 [Task 002](task/task002.zh-TW.md) 建置，保留 [Task 001](task/task001-implementation-notes.md) 已完成的 Next.js、React、TypeScript、Tailwind CSS 4、shadcn/ui 與 Lucide React 架構，不重新初始化。網站基準為 `main` 的 `699a0cd3918203e502fe3bf1f970f2cdd819123b`，本次分支為 `feature/website-brand-design-system`。

這一階段提供可重複使用的 Tokens、UI 元件與開發驗收頁。既有首頁只改用共用排版與元件，沒有新增完整首頁區塊、內頁、Backend、Contact API、AI Chatbot 或 Analytics。套件依賴沒有新增。

`xk2022/xplore-kaleidoscope` 文件 Repository 僅供讀取，本次檢查版本為 `3996730176e4ad7237c66f541d61405f2667934e`。Week 02 的品牌、Logo、色彩與排版文件仍為原規劃版本，並維持原有 Blob SHA；新增的是 `assets/brand/logo/` 的實際素材。舊規劃的 monorepo 目錄、Backend 與舊 UI 色票不取代已確認的獨立網站架構與 Task 002 色票。

## 檔案分工

| 檔案 | 職責 |
| --- | --- |
| `src/app/globals.css` | 品牌與語意色彩、排版角色、圓角、陰影、版面、Motion、幾何視覺樣式 |
| `src/app/layout.tsx` | 沿用 Inter、Noto Sans TC、全域語言與網站 Layout |
| `src/components/ui/button.tsx` | 沿用現有 shadcn/ui Button，統一互動樣式與尺寸 |
| `src/components/ui/card.tsx` | 一般與連結卡片，以及可組合的內容部件 |
| `src/components/layout/container.tsx` | 最大寬度與響應式水平留白 |
| `src/components/layout/section.tsx` | 語意化區塊、背景與垂直留白 |
| `src/components/brand/xk-logo.tsx` | 暫定 Logo 的大小、配色、文字與可及名稱 |
| `src/components/brand/xk-logo-data.ts` | 從提供 SVG 擷取的原始路徑與 Transform |
| `src/components/brand/brand-pattern.tsx` | 可重複使用的裝飾圖樣 |
| `src/app/dev/design-system/page.tsx` | 開發驗收頁與伺服器端存取開關 |
| `src/components/dev/button-demo.tsx` | 本機按鈕計數、重設與停用狀態示範 |
| `public/brand/source/` | 未改寫的提供素材與來源紀錄 |

網站內容與靜態元件維持 Server Components；按鈕驗收範例因使用本機互動狀態而是 Client Component。

## 色彩 Tokens

CSS 採三層管理：`:root` 的 `--brand-*` 原始品牌值、`--primary` 等語意別名，以及 Tailwind 4 `@theme inline` 的工具類別映射。一般元件使用語意類別，不重複硬編碼 HEX。

| 品牌 Token | HEX | 一般用途 |
| --- | --- | --- |
| `--brand-primary` | `#101A33` | 品牌主色、主要按鈕、標題 |
| `--brand-secondary` | `#3157D5` | 輔助色、焦點、連結 |
| `--brand-accent` | `#19B8D5` | 低調強調與裝飾 |
| `--brand-background` | `#FFFFFF` | 主要背景 |
| `--brand-surface` | `#F5F7FB` | 區塊與安靜背景 |
| `--brand-foreground` | `#172033` | 主要文字 |
| `--brand-muted` | `#667085` | 次要文字 |
| `--brand-border` | `#E4E8F0` | 邊框 |

`--muted` 保持次要文字的灰色，`text-muted-foreground` 對應該值；shadcn 的 `bg-muted` 則映射至 `--surface`。不要以 `bg-muted` 作為灰色文字樣本，也不要把 `--muted` 改成背景色。

Primary 與 Secondary 配白色文字，Accent 配深色 Primary 文字。Card、Popover、Input、Ring 均由語意別名取得色彩。`--destructive: #B42318` 是獨立錯誤狀態，不新增或取代核心品牌色。

本次只有淺色主題；色彩變數為未來擴充保留分層，沒有加入 Dark Mode 切換。Logo 原稿色彩以 `--logo-primary: #101828`、`--logo-secondary: #2563EB` 獨立保留，理由見下方素材說明。

## Typography

沿用 `next/font/google` 的 Inter 與 Noto Sans TC，搭配 Microsoft JhengHei、PingFang TC、Arial、sans-serif 備援。Google 字體於建置時取得，由 Next.js 自行託管；建置環境需要可讀取 Google Fonts。沒有更換字體或新增字體套件。

| Role / Utility | 字級範圍 | 字重 | 行高 |
| --- | --- | --- | --- |
| Display / `type-display` | 40–64px | 700 | 1.15 |
| H1 / `type-h1` | 36–56px | 700 | 1.25 |
| H2 / `type-h2` | 30–40px | 700 | 1.25 |
| H3 / `type-h3` | 24–28px | 600 | 1.25 |
| Body Large / `type-body-lg` | 17–18px | 400 | 1.7 |
| Body / `type-body` | 16px | 400 | 1.7 |
| Body Small / `type-body-sm` | 14px | 400 | 1.7 |
| Caption / `type-caption` | 12px | 500 | 1.5 |
| Button / `type-button` | 14px | 600 | 1.5 |

表內 px 以預設 16px 根字級換算；實際設定使用 rem 與 `clamp()`。Display、H1、H2、H3 採平衡換行。只有明確標示 `lang="en"` 的 Display、H1 使用 `-0.025em` 字距，中文保持自然字距。

排版 Utility 只決定外觀，不決定 HTML 語意。每頁仍應有清楚的 H1；區塊使用 H2，卡片依內容階層使用 H3 或適合的標題。Caption 僅用於標籤與註解，不取代一般閱讀內文。

## 間距、版面與視覺層次

間距沿用 Tailwind 的 `0.25rem` 基準，避免另建平行數列。

| 類別 | Token / Utility | 值 |
| --- | --- | --- |
| 最大寬度 | `--container-max` / `xk-container` | 80rem |
| 水平留白 | `--container-gutter` | 24px；640px 起 32px；1024px 起 48px |
| 一般區塊 | `--section-space` / `xk-section` | 64–96px，`clamp()` |
| 緊湊區塊 | `--section-space-compact` / `xk-section-compact` | 40–64px，`clamp()` |
| Small Radius | `rounded-sm` | 6px |
| Medium Radius | `rounded-md` | 8px |
| Large Radius | `rounded-lg` | 10px |
| Extra Large Radius | `rounded-xl` | 14px |
| Larger Radius | `rounded-2xl` | 18px |
| Full Radius | `rounded-full` | 9999px |
| Subtle Shadow | `shadow-subtle` | `0 1px 3px`，Primary 6% |
| Default Shadow | `shadow-default` | `0 4px 16px`，Primary 8% |
| Elevated Shadow | `shadow-elevated` | `0 12px 32px`，Primary 12% |

Container 的最大寬度包含水平 Padding。Section 只管理區塊背景與垂直留白，內容需要一致寬度時再放入 Container。

一般互動使用 `duration-brand`（160ms）與 `ease-brand`（`cubic-bezier(0.2, 0, 0, 1)`），只過渡必要的顏色、邊框與陰影。`prefers-reduced-motion: reduce` 下停用過渡、恢復自動捲動，並限制動畫時間與次數。幾何裝飾本身保持靜態。

## 共用元件 API

### XkLogo

```tsx
<XkLogo size={112} variant="primary" showWordmark />
<XkLogo size={56} showWordmark={false} decorative />
<XkLogo size={112} variant="white" />
```

| Prop | 預設值 | 用途 |
| --- | --- | --- |
| `size?: number` | `96` | SVG 高度，單位為 CSS px；容器不足時等比例縮小 |
| `variant` | `primary` | `primary`、`white`、`monochrome` |
| `showWordmark?: boolean` | `true` | 顯示提供原稿的文字輪廓；關閉時為方形圖形版本 |
| `className?: string` | 無 | 版面微調 |
| `decorative?: boolean` | `false` | 圖形旁已有可見標籤時，避免重複朗讀 |

非裝飾用途以 `role="img"`、title 與「Xplore Kaleidoscope Logo（暫定版本）」提供可及名稱；所有版本具 `data-provisional="true"`。裝飾用途以 `aria-hidden` 隱藏，不建立重複的 SVG ID。

橫式使用原稿 `850 × 204` viewBox 與 Transform；圖形使用原稿 `472 × 472` viewBox 與留白。Header 使用 56px 圖形搭配既有可讀 HTML 品牌名稱，避免手機尺寸的輪廓字標過小；完整字標保留在有足夠空間的展示處。

### Button

沿用既有 shadcn/ui Button。核心樣式為 `primary`、`secondary`、`outline`、`ghost`，另保留 `default`（Primary 別名）、`destructive`、`link`。核心尺寸為 `sm`、`md`、`lg`；既有 `default`、`xs` 與 icon 尺寸名稱仍可使用。

```tsx
<Button variant="primary" size="md" onClick={handleAction}>執行操作</Button>
<Button variant="outline" size="sm" disabled>暫不可用</Button>
<Button asChild variant="secondary">
  <a href="#details">前往說明</a>
</Button>
```

原生按鈕預設 `type="button"`，保留 Hover、Focus 與 Disabled 狀態。Small 至少 44px 高、Medium 48px、Large 56px；文字可換行。

`asChild` 適用真實連結，維持 `<a>` 的語意；此模式在 TypeScript 禁止 `disabled` 與 `type`，因為連結沒有原生停用狀態。需要停用操作時使用原生 Button，不建立外觀像停用但仍可點擊的連結。

### Card

```tsx
<Card>
  <CardHeader>
    <CardIcon><Layers3 /></CardIcon>
    <CardTitle>內容標題</CardTitle>
    <CardDescription>輔助說明</CardDescription>
  </CardHeader>
  <CardContent>一般內容。</CardContent>
</Card>

<Card variant="interactive" href="#details">
  <CardHeader><CardTitle>前往說明</CardTitle></CardHeader>
  <CardContent>整張卡片為真實連結。</CardContent>
</Card>
```

Default Card 是內容 `div`。Interactive Card 透過 Next.js Link 建立真實導覽，必須提供有效 `href`，**內部不得再放連結或按鈕**。只有互動版本套用 Hover 與 Focus 回饋。

元件包括 `CardHeader`、`CardTitle`、`CardDescription`、`CardContent`、`CardFooter` 與選用的 `CardIcon`，支援各自的 `className` 與原生屬性。`CardTitle` 預設 H3，可用 `as="h2" | "h3" | "h4"` 配合頁面標題階層。CardIcon 是裝飾性圖示容器，不提供獨立操作語意。

### Container 與 Section

```tsx
<Section id="details" background="surface" spacing="default" aria-labelledby="details-title">
  <Container>
    <h2 id="details-title" className="type-h2">區塊標題</h2>
  </Container>
</Section>
```

Container 接受 `div` 原生屬性及 `className`。Section 接受 `section` 原生屬性與 `className`，`background` 可為 `default`、`surface`、`primary`；`spacing` 可為 `default`、`compact`。Primary 背景搭配對應淺色文字；子元件仍需選用符合所在背景的文字色彩。

### BrandPattern

```tsx
<div className="relative overflow-hidden bg-surface">
  <BrandPattern variant="grid" />
  <div className="relative z-10">主要內容</div>
</div>
```

`variant` 支援 `grid`（預設）、`kaleidoscope`、`gradient`、`shapes`，另接受 `className`。圖樣是絕對定位、`aria-hidden` 且不接收指標事件的裝飾層；父容器需定位並裁切溢出，前景內容需有清楚層級。它不會改畫 Logo，也不作為可操作控制項。

## 提供素材與暫定狀態

來源為文件 Repository 的 `assets/brand/logo/svg/`，讀取版本為 `3996730176e4ad7237c66f541d61405f2667934e`。本地保留 primary、symbol、horizontal、white 四份原始 SVG；各檔案原始路徑與 Git Blob SHA 詳列於 [素材來源紀錄](../../public/brand/source/README.md)。

元件以原始 XML 擷取的兩個 XK 幾何路徑與 18 個品牌文字輪廓呈現，沒有重新設計、改畫或以網頁字體替換字標。原稿配色與 UI Token 分開，保留使用者提供的 `#101828`、`#2563EB`；白色及單色處理沿用已提供版本的色彩方式。

來源 `xk-logo-dark.svg` 與 primary、master 完全相同，表示深色圖稿而非深色背景專用版本。深色背景應選 `white`。完整橫式字標在小尺寸下可讀性不足，因此 Header 選圖形加 HTML 品牌名稱。不要任意壓縮、旋轉、裁掉安全留白或加入未核准效果。

使用者提供完成的設計素材，但 Task 002 仍明確規定 **Provisional Logo（暫定版本）**，本次不宣稱最終品牌核准。原始素材只複製到網站 Repository；文件 Repository 未寫入。

## 本機開發與驗收頁開關

使用 Node.js 24.x 與 npm，從 Repository 根目錄執行：

```sh
npm install
npm run dev
```

首頁為 `http://localhost:3000`；開發驗收頁為 `http://localhost:3000/dev/design-system`。一般開發不需要任何環境變數或 Backend。

驗收頁展示 Logo、八個色彩、九個 Typography Roles、Button、Card、Container、Section 與四種幾何視覺。按鈕示範會更新本機計數並可重設，沒有假提交或假服務。卡片與導覽以真實頁內錨點示範。

production 模式預設回傳 404；需要刻意檢查 production build 的驗收頁時，才設定伺服器端開關：

```sh
npm run build
XK_DESIGN_SYSTEM_PREVIEW=1 npm run start
```

關閉旗標並重新啟動後恢復預設 404。`XK_DESIGN_SYSTEM_PREVIEW` 只在伺服器端讀取，不使用 `NEXT_PUBLIC_`。此開關控制路由是否可用，不是帳號登入或權限系統。驗收頁保持動態伺服器檢查、`noindex, nofollow`，且不列入正式網站導覽。

## 驗收紀錄

以下為本次最終程式碼實際執行的驗收結果，沒有沿用 Task 001 的通過紀錄：

| 項目 | 結果 |
| --- | --- |
| `npm run lint` | 通過，exit 0，零警告 |
| `npx tsc --noEmit` | 通過，exit 0 |
| `npm run build` | 通過，exit 0；首頁靜態預先產生，驗收路由依請求執行伺服器檢查 |
| 本機首頁與開發驗收頁 | 通過，首頁與開發驗收頁皆回應 HTTP 200 |
| production 預設 404／明確旗標開啟 | 通過，同一 build 的預設伺服器回應 404，明確啟用旗標的伺服器回應 200 |
| 320 / 375 / 768 / 1440 / 1920px | 全部通過；首頁與展示頁皆無水平溢出，Logo 可讀、中文無不當字距、卡片 Padding 一致 |
| 鍵盤焦點、按鈕停用、卡片導覽 | 通過；skip link、可見焦點、Enter 操作、按鈕計數／重設、原生 disabled、真實連結皆正常；按鈕至少 44px，首頁 Large 為 56px |
| 無障礙掃描與減少動態偏好 | 五種寬度的首頁與展示頁均未檢出 axe WCAG 2/2.1 A/AA 違規；reduced-motion 下過渡時間為 0s；無重複 SVG ID、JS 錯誤或失敗的 CSS／字體／JS 請求 |
| Logo／色票／排版／元件截圖 | 已輸出 Logo、色票、排版、按鈕、卡片、幾何視覺、桌面與手機完整展示頁及首頁；截圖隨交付回報提供 |

驗收使用暫存於網站套件以外的 Chromium、Playwright 與 axe 工具，沒有新增應用程式相依套件。實際檢視桌面／手機與各元件截圖，裝飾未遮蔽內容。額外比對兩個圖形路徑、18 個字標路徑與原始 Transform 皆相同，四份 SVG 的 Git Blob SHA 也與來源一致。原 README 前綴及套件、框架、字體設定保持不變。自動化掃描通過不代表已完成所有螢幕閱讀器與輔助科技的人工作業驗證。

Git 分支為 `feature/website-brand-design-system`；以 Conventional Commit 與 Pull Request 交付審核，實際識別碼見交付回報。不直接修改 `main`，也不自動合併。

## 後續工作

最終 Logo 核准、正式 Header／Footer／Navigation 擴充、完整 Homepage、各內頁與 Vercel／Domain 部署仍依使用者里程碑分別執行。Task 001 已記錄的 ESLint 9 與上游 Next.js plugins 相容性限制仍保留，這次沒有變更套件版本。

## 本次檔案異動

新增檔案：

- `docs/brand-design-system.md`
- `public/brand/source/README.md`
- `public/brand/source/xk-logo-horizontal.svg`
- `public/brand/source/xk-logo-primary.svg`
- `public/brand/source/xk-logo-symbol.svg`
- `public/brand/source/xk-logo-white.svg`
- `src/app/dev/design-system/page.tsx`
- `src/components/brand/brand-pattern.tsx`
- `src/components/brand/xk-logo-data.ts`
- `src/components/brand/xk-logo.tsx`
- `src/components/dev/button-demo.tsx`
- `src/components/layout/section.tsx`
- `src/components/ui/card.tsx`

修改檔案：

- `AGENTS.md`
- `README.md`
- `docs/implementation-notes.md`
- `src/app/globals.css`
- `src/components/layout/container.tsx`
- `src/components/layout/site-footer.tsx`
- `src/components/layout/site-header.tsx`
- `src/components/sections/home-intro.tsx`
- `src/components/ui/button.tsx`
