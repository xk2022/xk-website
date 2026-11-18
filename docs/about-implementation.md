# Task 004 — About Us 品牌介紹頁實作

依 [Task 004](task/task004.md) 建立 `/about`，讓訪客了解 Xplore Kaleidoscope（XK）的品牌定位、使命、願景、技術能力與工作方式。延用已合併的 XK Design System 與 GitHub Actions → GitHub Pages 靜態部署，不新增 Backend 或相依套件。

## Repository 與前置狀態

| 項目 | 本次基準 |
| --- | --- |
| Website Repository | `xk2022/xk-website` |
| Base Branch | `main` |
| Base Commit | `833db52344b16a270ef0e9531f33ab1f09b58200` |
| Feature Branch | `feature/website-about-page` |
| Task 003 合併狀態 | PR #3 已合併；merge commit `0ca076078c1d10e6e08a64b0b49d736e1c5f61fd` 是基準版本祖先 |
| 既有部署 | [main Actions run 44257982809](https://github.com/xk2022/xk-website/actions/runs/44257982809) 成功，已確認公開企業首頁 HTTP 200 與對應內容 |
| 文件 Repository | `xk2022/xplore-kaleidoscope`，僅讀取 |
| 文件版本 | `3996730176e4ad7237c66f541d61405f2667934e` |
| 本次 Commit / PR | 以 PR 提交紀錄及最終交付報告為準；[功能分支比較](https://github.com/xk2022/xk-website/compare/main...feature/website-about-page) |

已閱讀根目錄 README、AGENTS、Task 001／002／003 原稿與實作紀錄、[首頁實作紀錄](homepage-implementation.md)、[品牌設計系統](brand-design-system.md) 及 [歷史紀錄](implementation-notes.md)。Task 003 的既有合併與發布只證明 About 開發的前置條件成立，不代表本次 About 功能已通過驗收或已公開發布。

`docs/task/task001.md` 仍不存在，Task 001 原稿位於 [task001-implementation-notes.md](task/task001-implementation-notes.md)，另有繁體中文版本。Task 002 英文原稿 [task002.md](task/task002.md) 已恢復為 4534 bytes 的完整規格，[繁體中文版本](task/task002.zh-TW.md) 仍保留；本次修正 AGENTS 目前狀態，先前實作文件的空檔描述維持歷史快照。

## 文件檢查與規格優先順序

文件 Repository 的最新 main 仍是 `3996730176e4ad7237c66f541d61405f2667934e`。本次透過連接工具重新讀取品牌、架構與首頁文案，並參照 Logo／Typography 規範：

| Week 02 文件 | Git Blob SHA |
| --- | --- |
| `01_brand-identity_品牌視覺識別規範.md` | `b64daf57d5fa520044cc56364cc18f950b9ab50a` |
| `08_website-architecture_官方網站 Next.js 技術架構設計.md` | `ab180ca03cb6a56d6f6ec8cb85891ac3e03b8ed5` |
| `06_homepage-copywriting_官方網站首頁文案規劃.md` | `94a660ffa3fb5381072eeb10dddc0c853de7fc0a` |
| `02_logo-guidelines_XK Logo 設計與使用規範.md` | `f7cb4ab9658104cec32488d7849e4f00f9d1dfd5` |
| `04_typography_品牌字體與排版規範.md` | `917fc823d16003e1823e85a6482698601c049e74` |

以上皆位於 `doc/01_business-plan/week-02/`，內容未更新。Week 02 Tree 為 `3d336054bfc339a9892f997440decba3e7abbd43`，Logo Tree 為 `534d37ee3dd83888342839b260a41913feb84951`，與前次檢查相同。本次沒有寫入文件 Repository 或修改提供素材。

發生差異時保留已合併的網站架構、Design System 與 Task 004 明確要求。舊規劃中的 monorepo、Backend、舊 UI 色票與完整 MVP 不控制本次實作；既有 GitHub Pages 設定取代舊文件的 Vercel 部署方向，一般 Next.js build 仍保持相容。README 舊里程碑把 Task 004 列為 Homepage，本次依實際 Task 004 原稿更新為 About Us。

## 頁面資訊架構

`src/app/about/page.tsx` 僅負責 Metadata 與區塊組合。重複文案、能力分類、流程與創辦人設定集中在 `src/config/about.ts`；視覺與語意由 `src/components/sections/about/` 負責。

| 順序 | 區塊 | 元件／內容 |
| --- | --- | --- |
| 1 | About Hero | `AboutHero`；中文 H1、品牌與技術標語、品牌簡介及幾何視覺 |
| 2 | Who We Are | `AboutWhoWeAre`；技術品牌定位、創辦人一人全職經營、五項重視事項 |
| 3 | Mission | `AboutMissionVision` 的獨立使命 Section；核心理念與三項技術／商業價值支柱 |
| 4 | Vision | 同一元件的獨立願景 Section；四個未來發展方向 |
| 5 | Core Capabilities | `AboutCapabilities`；網站、Java、系統整合、AI、雲端五類能力 |
| 6 | Our Approach | `AboutApproach`；五階段有序流程，桌面橫向、手機垂直 |
| 7 | Founder | `AboutFounder`；未公開姓名的 Founder & Software Engineer 介紹及專注領域 |
| 8 | Our Commitment | `AboutCommitment`；工程品質、商業價值、可擴充架構與長期合作四項理念 |
| 9 | CTA | `AboutCta`；返回實際首頁服務／聯絡區塊 |

使命與願景共用一個檔案，但保有各自的語意 Section 與 H2。頁面共九個內容區塊，使用共用網站 Header、Footer 與手機導覽。

## 文案與創辦人資訊界線

Task 004 明確確認 XK 是「創辦人一人全職經營的技術服務品牌」，因此頁面可呈現此經營方式與直接技術溝通的定位。沒有把品牌描述成已成立法人、大型公司或具有辦公室與員工團隊。

創辦人角色、介紹與專注領域均採 Task 004 提供內容。設定保留 `founderProfile.name: null` 與 `founderProfile.photo: null`；不虛構姓名、學歷、年資、證照、雇主、個人照片或個人故事。畫面以既有 Logo 與 BrandPattern 呈現品牌幾何視覺，不使用假人像。

姓名欄位僅在確認且有值時可呈現；照片欄位目前只預留設定位置，沒有接入人像顯示。未來取得本人授權素材時，再另行實作、確認替代文字與驗收，不以現有空設定假裝提供照片功能。

Mission 使用「希望協助」等理念表達；Vision 的公司發展、AI 解決方案標準化及自主 AI SaaS 都標示為逐步發展方向，不宣稱產品或規模已達成。四項 Commitment 是服務原則，不擴大為未經驗證的品質、成效或交付保證。

五類技術清單描述 XK 可提供的技術服務能力，包括 Spring Boot、Spring AI、資料庫整合與 Docker；不表示這些技術已安裝或運行在官網。網站仍是獨立前端，沒有新增 Backend、API、CMS、Authentication 或 Analytics。

## Design System 與元件相容性

所有新增 About 元件皆為 Server Components，沒有增加 Client Component。沿用既有 `Section`、`Container`、`Card` 系列、`Button`、`XkLogo`、`BrandPattern`、Typography Utilities 與 Lucide React。

UI 的八個色彩 Token、間距、圓角、陰影、Focus、Reduced Motion 與 Inter／Noto Sans TC 保持原設定；沒有修改全域 CSS 或建立平行樣式系統。原始 Logo SVG、資料路徑、Transform、原稿配色與 **Provisional（暫定版本）** 狀態未變，不宣稱最終品牌核准。

Hero 主標題依兩句完整文案分行，避免在「創造」兩字之間換行。

共用 `SectionHeading` 新增選用的 `titleLang`，預設仍是 `en`，所以首頁既有呼叫維持原行為；About 中文標題明確傳入 `zh-TW`，避免錯誤的語言標註。這是向後相容的 API 擴充。

本次瀏覽器驗收發現唯一 Console 資源錯誤為自動請求 `/favicon.ico` 回應 404。為補齊網站圖示，將既有 `public/brand/source/xk-logo-symbol.svg` 原封不動複製至 `src/app/icon.svg`，使用 Next.js Metadata 檔案慣例產生圖示連結。兩份內容已比對完全相同；未改畫 Logo、修改全域 Layout 或增加相依套件。完成修正後已重新執行品質檢查與整套瀏覽器驗收，圖示 HTTP 200，沒有 Console、Runtime 或資源載入錯誤。

## 導覽與 GitHub Pages

共用 `primaryNavigation` 的「關於 XK」改為 `/about`，`plannedRoutes` 對應狀態改為 `implemented`，讓 Header、手機導覽與 Footer 共用相同目的地。首頁既有 `#about` 與 `#brand` 保留，原有頁內連結仍可使用。

About 的服務 CTA 使用 `/#services`，聯絡 CTA 使用 `/#contact`。這些是已存在的首頁區塊，不建立尚未完成的 `/services` 或 `/contact` 內頁，也不把未確認信箱或假表單當成聯絡管道。

目前沒有獨立的 URL Helper；沿用既有 Next.js Link，讓 Next.js 依 `basePath` 正確產生站內 URL。沒有手動硬編碼 `/xk-website` 到每個元件，也不以會繞過 Base Path 的普通根路徑連結替代它。

Pages 模式保持 `trailingSlash`，`/about` 應輸出為 `out/about/index.html`，專案網址對應 `/xk-website/about/`。必要的 Validator 擴充只在 `scripts/build-github-pages.mjs`：

- 確認首頁、About 與 404 輸出存在。
- 檢查 About CSS／JS 靜態資源 URL 含正確 Base Path。
- 檢查 About Canonical 與 Open Graph URL 為品牌網域的 `/about`，接受正常結尾斜線，禁止 Query 或 Fragment。
- 檢查 About 保留 `noindex` 與 `nofollow`。
- 維持 `.nojekyll` 與開發驗收路由排除檢查。

現有 workflow 沒有修改。PR 執行品質與 Pages 建置，只有 `main` 合併後的 push 或手動選擇 `main` 才部署。本次只建立功能 PR 待審核，不自動合併，也不宣稱 About 已公開上線。

## SEO 與可及性

| 項目 | 設定 |
| --- | --- |
| Title | `關於 XK | Xplore Kaleidoscope` |
| Description | `認識 Xplore Kaleidoscope（XK），了解我們的品牌理念、網站開發、Java 企業系統、系統整合與 AI 應用技術能力。` |
| Canonical / Open Graph URL | `https://xplorekaleidoscope.com/about` |
| Open Graph Title / Description | 使用 About 專屬內容 |
| Language | HTML 沿用 `zh-TW`；英文標語與術語適當標示語言 |
| Indexing | 保留 `noindex, nofollow` |
| Open Graph Image / Schema | 沒有虛構圖片路徑、評價、獎項或 Organization Rating |

頁面有單一 H1，區塊與卡片使用對應 H2／H3；工作方式以有序清單呈現。裝飾 SVG、品牌圖樣與無獨立語意的圖示不加入輔助科技閱讀順序。沿用網站 Skip Link、可見 Focus、鍵盤操作與減少動態設定。

本次指定以 axe 掃描並搭配鍵盤、Focus、色彩對比及人工視覺檢查。自動掃描結果只描述檢查範圍，不宣稱完整符合所有輔助科技或無障礙標準。

## 檔案異動

以下清單列示本次實作、必要的網站圖示修正與已產出的截圖；最終提交範圍以 PR 提交紀錄為準：

| 狀態 | 檔案 | 用途 |
| --- | --- | --- |
| 新增 | `src/app/about/page.tsx` | About 路由、Metadata 與區塊組合 |
| 新增 | `src/app/icon.svg` | 原封不動複製提供的 symbol，補上 Next.js 網站圖示 Metadata |
| 新增 | `src/config/about.ts` | 集中文案、能力、流程、創辦人預留設定與服務理念 |
| 新增 | `src/components/sections/about/about-hero.tsx` | About 首屏 |
| 新增 | `src/components/sections/about/about-who-we-are.tsx` | 品牌定位與經營方式 |
| 新增 | `src/components/sections/about/about-mission-vision.tsx` | 使命與願景兩個語意區塊 |
| 新增 | `src/components/sections/about/about-capabilities.tsx` | 五類技術能力 |
| 新增 | `src/components/sections/about/about-approach.tsx` | 五階段工作方式 |
| 新增 | `src/components/sections/about/about-founder.tsx` | 未公開姓名的創辦人介紹 |
| 新增 | `src/components/sections/about/about-commitment.tsx` | 四項服務理念 |
| 新增 | `src/components/sections/about/about-cta.tsx` | 真實首頁錨點 CTA |
| 新增 | `docs/about-implementation.md` | 本次實作與驗收紀錄 |
| 新增 | `docs/screenshots/task004-about-desktop.png` | 桌面頁面 |
| 新增 | `docs/screenshots/task004-about-mobile.png` | 手機頁面 |
| 新增 | `docs/screenshots/task004-about-capabilities.png` | 核心能力 |
| 新增 | `docs/screenshots/task004-about-approach.png` | 工作方式 |
| 新增 | `docs/screenshots/task004-about-footer.png` | 頁尾 |
| 修改 | `src/config/navigation.ts` | 公開 About 路由，保留其他有效錨點與規劃路由 |
| 修改 | `src/components/sections/section-heading.tsx` | 選用 titleLang，預設行為不變 |
| 修改 | `scripts/build-github-pages.mjs` | 增加 About 靜態產物與 Metadata 驗證 |
| 修改 | `README.md` | 目前 About 里程碑、路徑與操作指引 |
| 修改 | `AGENTS.md` | Task 004 規範、分支與 npm ci 驗收指令，修正已恢復的 Task 002 原稿狀態 |
| 修改 | `docs/implementation-notes.md` | 保留既有歷史並追加 Task 004 |

未變更 Dependencies、lockfile、字體、全域 Design Tokens、Logo 來源或 GitHub Actions workflow。沒有提交 `.next/` 或 `out/`。

## 本機操作

```sh
npm ci
npm run dev
```

開啟 `http://localhost:3000/about`，同時檢查首頁 `http://localhost:3000`。既有開發用設計系統頁仍依原設定運作，不加入正式導覽。

Task 004 指定品質指令：

```sh
npx tsc --noEmit
npm run lint
npm run build
npm run build:pages
```

一般 production 可在 `npm run build` 後使用 `npm run start`。Pages 靜態產物必須掛載於 `/xk-website` 路徑檢查 `/xk-website/about/` 與跨頁錨點，方式見 [GitHub Pages 部署指南](github-pages-deployment.md)。在 Pages 匯出後若改測一般 Next.js server，先重新執行一般 Build。

## 本次驗收結果

以下為本次 Task 004 實際執行的結果；TypeScript、Lint、兩種 Build 與完整瀏覽器驗收已在程式碼調整後重跑，沒有沿用前任務紀錄。

| 項目 | 實際結果 |
| --- | --- |
| `npm ci` | 通過，exit 0；既有 ESLint 9 deprecation 提示仍存在，沒有調整套件版本 |
| `npx tsc --noEmit` | 通過，exit 0 |
| `npm run lint` | 通過，exit 0 |
| `npm run build` | 通過，exit 0 |
| `npm run build:pages` | 通過，exit 0；完整靜態瀏覽器 Suite 亦 exit 0 |
| 一般 Next.js HTTP Smoke Test | 新啟動的 production server 上，About 與首頁均 HTTP 200、圖示 HTTP 200、開發驗收頁 HTTP 404，無 Console／Runtime Error |
| Homepage Regression Test | 五種寬度的首頁回歸檢查全部通過 |
| Header／Footer／Mobile Navigation 與全部有效連結 | 通過；所有站內連結、跨頁錨點、Pages Base Path 及手機選單操作正常 |
| 320／375／768／1440／1920px | 全部通過；About HTTP 200、九個 Section、五類能力與五階段流程正常，About／首頁無水平溢出 |
| 手機垂直流程、卡片間距與 Logo 比例 | 通過；工作方式桌面五欄、手機一欄，版面無重疊或內容超出容器 |
| axe A／AA | 五種寬度的 About 與首頁全部通過，含展開的手機選單；未檢出本次掃描範圍內的 axe WCAG 2／2.1 A／AA 違規 |
| 鍵盤、Focus、Reduced Motion | 通過；Skip Link 可進入 main、CTA 焦點可見，減少動態偏好下過渡時間為 0s |
| Browser Console / Runtime / Resource Errors | 零 JavaScript、Console、Runtime Error，零資源載入失敗 |
| About 靜態資源、Base Path、Metadata 與開發頁排除 | 通過；Canonical／Open Graph URL、noindex／nofollow 正確，CSS／JS／字體與圖示路徑正常，開發路由未公開匯出 |
| 網站圖示 | HTTP 200；內容與提供的 symbol SVG 完全相同，無改畫或拉伸原稿 |
| 五份實際網站截圖與人工視覺檢查 | 最終驗收已重新擷取五份指定截圖；另檢視桌面／手機 Hero 與創辦人，無重疊、失真或裁切 |
| Commit / PR | 以 PR 提交紀錄及最終交付報告為準；[功能分支比較](https://github.com/xk2022/xk-website/compare/main...feature/website-about-page)，不自動合併 |

axe 結果限於本次實際開啟的 About、首頁、五種 Viewport 與手機選單狀態，以及工具可自動判定的 WCAG 2／2.1 A／AA 規則。另實際檢查鍵盤、Focus、Reduced Motion 與視覺版面；這些結果不等同完整的螢幕閱讀器、人工作業或所有輔助科技相容性認證。

## 截圖與交付

五份截圖已在最終重驗時由本次實際執行的網站重新擷取，不是示意圖：

| 內容 | 實際圖檔 | 尺寸 |
| --- | --- | --- |
| 桌面完整頁面 | [task004-about-desktop.png](screenshots/task004-about-desktop.png) | 1440 × 6211 |
| 手機完整頁面 | [task004-about-mobile.png](screenshots/task004-about-mobile.png) | 375 × 10049 |
| 核心能力 | [task004-about-capabilities.png](screenshots/task004-about-capabilities.png) | 1440 × 1154 |
| 工作方式 | [task004-about-approach.png](screenshots/task004-about-approach.png) | 1440 × 560 |
| 頁尾 | [task004-about-footer.png](screenshots/task004-about-footer.png) | 1440 × 541 |

已人工檢視手機整頁、核心能力、工作方式、頁尾，以及 1440px／375px 的 Hero 與創辦人區塊，未發現內容重疊、Logo 失真或裁切。圖示載入及 Console 狀態已納入上述最終重驗。

PR 以 `main` 為 Base、`feature/website-about-page` 為 Compare，描述包含實作內容、Design System 使用、SEO、Pages 相容性、實際測試、截圖與未完成事項。建議 Commit 為 `feat(about): implement XK about page`。實際 Commit 與 PR 以提交紀錄及最終交付報告為準，可由[功能分支比較](https://github.com/xk2022/xk-website/compare/main...feature/website-about-page)檢查異動；本文件不預填虛構識別碼，也不宣稱 About 已合併或發布。

## 尚未完成事項

創辦人姓名、照片與公開聯絡管道仍未確認；照片僅預留設定，未接入人像呈現。最終 Logo 核准、Open Graph Image、未來 AI SaaS、其他內頁、正式網域與搜尋索引開放仍按後續任務執行。既有 ESLint 9 的上游相容性限制維持原紀錄。

本次沒有需要使用者補充姓名或照片才可完成的阻礙；About 可使用已確認的品牌與通用創辦人內容完成交付。實際發布需在 PR 審核、使用者授權合併及 main 工作流程執行後另行確認。
