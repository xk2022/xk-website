# Task 010 — SEO 搜尋引擎最佳化

## 1. Task Overview

統一 XK 官網已實作頁面的 Metadata、Canonical、社群分享資訊、URL 與語言設定，建立 Sitemap／robots／Structured Data 的明確規則及正式索引的發布門檻。此任務先完成可驗收的 **保護模式**，保留 `noindex, nofollow`；正式開放搜尋索引、提交 Search Console 與正式網址切換是需另有證據與授權的發布階段。

| 項目 | 規格 |
| --- | --- |
| Project／Brand | Xplore Kaleidoscope／XK |
| 類型 | Technical Optimization；與 Task 011 Performance、Task 012 Accessibility 分開 |
| 品牌 Canonical Origin | `https://xplorekaleidoscope.com`，目前已有品牌設定，不等於 DNS／正式網域已驗證 |
| 已實作基準路由 | `/`、`/about`、`/services`；執行時加入當時已合併且實際可用的頁面，不收錄規劃路由 |
| 語言 | HTML `zh-TW`、Open Graph `zh_TW`，保留繁體中文及必要英文品牌文案 |
| 功能分支 | `feature/website-seo` |
| 未來獨立報告 | `docs/reports/task010-implementation.md`；目前不建立假報告或不存在連結 |
| 本次狀態 | 所有未來驗收 PENDING；只撰寫規格，不執行網站最佳化或索引操作 |

目標是可追溯、可測試且不誇大事實的 SEO 基礎，不保證搜尋排名、收錄時間、Rich Result 或點擊成長。技術保護模式可以在 Task 006–009 尚未全部合併時完成，不因未來頁面規劃而硬性串行等待。

## 2. Repository & Prerequisites

| 項目 | 要求／依賴 |
| --- | --- |
| 唯一可寫 Repository | `xk2022/xk-website`；`xk2022/xplore-kaleidoscope` 僅讀取 |
| 本規格研究網站 Base | `e2a8f5a33f24d1ea65a3afc3780014a33c204528`，未來開發重新確認最新已合併 `main` |
| 開始前檢查 | remote、branch、status、diff、Base SHA、路由、Metadata、manifest／lockfile、Next 設定及既有 Pages Validator；保留使用者工作 |
| 可立即執行 | Task 001–005 基礎與實際已合併頁面可用即可進行保護模式，未來新增頁面由其任務加入相同規則 |
| Contact／Privacy | 依 Task 008／009 的實際已合併與核准狀態；未知聯絡、法定資訊與草案政策不得進 Schema 或 Sitemap |
| Task 013／014 | Vercel 可與保護模式並行；正式索引與 GSC 提交前需實際 production target、Canonical Domain、HTTPS、redirect、權限及 release 授權證據 |
| 版本 | 使用現有 Node.js 24.x／npm 與鎖定依賴；研究時 Next.js `16.4.6`、React `19.3.1`，不把歷史版本寫成升級指令 |

開始時完整列舉實際可用路由與保護／草案／404／dev 範圍，不能直接將 `plannedRoutes` 全數複製成公開索引。README 的舊里程碑與 AGENTS 的歷史替代檔名不能覆蓋最新 Task 分類或現存 canonical 規格。

## 3. Reference Documents

### 3.1 網站規格與實際來源

讀取 [任務索引](README.md)、[Task 001](task001.md)、[Task 002](task002.md)、[Task 003](task003.md)、[Task 004](task004.md)、[Task 005](task005.md)，以及 [AGENTS](../../AGENTS.md)、[README](../../README.md)、[歷史紀錄](../implementation-notes.md)、[Design System](../reports/brand-design-system.md)、[首頁](../reports/homepage-implementation.md)、[About](../reports/about-implementation.md)、[Services](../reports/services-implementation.md) 與 [Pages 部署指南](../reports/github-pages-deployment.md)。原 Task 006 與後續頁面規格是需求來源，不能據此假設對應 route 已實作。

網站 Branch `main`、Commit `e2a8f5a33f24d1ea65a3afc3780014a33c204528` 的重要來源如下；固定版本 URL 與 Blob 用於重現本規格研究，不是未來遠端／公開驗收證據：

| 固定版本網站來源 | Git Blob SHA |
| --- | --- |
| [src/config/site.ts](https://github.com/xk2022/xk-website/blob/e2a8f5a33f24d1ea65a3afc3780014a33c204528/src/config/site.ts) | `6653507e18de1d78f8e4c1aca058d666d654f704` |
| [src/config/navigation.ts](https://github.com/xk2022/xk-website/blob/e2a8f5a33f24d1ea65a3afc3780014a33c204528/src/config/navigation.ts) | `020f8db2b29585e6e9313acd1551f99888d29291` |
| [src/app/layout.tsx](https://github.com/xk2022/xk-website/blob/e2a8f5a33f24d1ea65a3afc3780014a33c204528/src/app/layout.tsx) | `c97305e70015983ca3e41801b6bcb24ad222ec65` |
| [src/app/page.tsx](https://github.com/xk2022/xk-website/blob/e2a8f5a33f24d1ea65a3afc3780014a33c204528/src/app/page.tsx) | `37899949b823defe51390c4fa4d4a81e8d80fa32` |
| [src/app/about/page.tsx](https://github.com/xk2022/xk-website/blob/e2a8f5a33f24d1ea65a3afc3780014a33c204528/src/app/about/page.tsx) | `5a2d789ba8fd678a971197dcca174e12502b6ed7` |
| [src/app/services/page.tsx](https://github.com/xk2022/xk-website/blob/e2a8f5a33f24d1ea65a3afc3780014a33c204528/src/app/services/page.tsx) | `c1662b55ba8d37ce6196535578cbc24866cfe92b` |
| [next.config.ts](https://github.com/xk2022/xk-website/blob/e2a8f5a33f24d1ea65a3afc3780014a33c204528/next.config.ts) | `07606ad3f492dfb5b747e96ddb22144e54a45612` |
| [scripts/build-github-pages.mjs](https://github.com/xk2022/xk-website/blob/e2a8f5a33f24d1ea65a3afc3780014a33c204528/scripts/build-github-pages.mjs) | `f1aa1df74b6abf867e12739a6c3bce49566ebf31` |
| [.github/workflows/ci.yml](https://github.com/xk2022/xk-website/blob/e2a8f5a33f24d1ea65a3afc3780014a33c204528/.github/workflows/ci.yml) | `8cb71f8208e3ca55085230bd996fbf95aac8296c` |

版本敏感的 Metadata Route、靜態匯出、title template、Twitter／OG 繼承與 Metadata 檔案優先序，正式實作前讀實際安裝 Next.js 的 `node_modules/next/dist/docs/`。不得照舊文件範例替換現行設定。

### 3.2 商業來源與採用界線

來源 Repository `xk2022/xplore-kaleidoscope`、Branch `main`、Commit `95ef1275a46ace76e11f668178ca881087483398`。下表均為固定版本；文件有技術方向或初版規劃，不代表 SEO 已驗收、資料已核准或正式網域已發布。

| ID／固定版本來源 | Git Blob SHA | 核准界線與本任務採用 |
| --- | --- | --- |
| BUSINESS_EN — [doc/01_business-plan/week-01/00_company-profile.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-01/00_company-profile.md) | `249dda3bc464c7fae497e037d8a9916ed93893e7` | 業務定位與服務內容；不把營收目標、SaaS 願景、中文名稱寫成已驗證 Schema 事實。 |
| BUSINESS_ZH — [doc/01_business-plan/week-01/00_公司介紹.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-01/00_%E5%85%AC%E5%8F%B8%E4%BB%8B%E7%B4%B9.md) | `d089b3baf8a7466716cfa13ff62bd959f812b108` | 中文名稱尚待正式定案；採品牌英文名與一人經營背景，不推導法定公司或營業地址。 |
| INIT — [doc/00_initGPT/05_Xplore Kaleidoscope 正式建置技術決策如下.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/00_initGPT/05_Xplore%20Kaleidoscope%20%E6%AD%A3%E5%BC%8F%E5%BB%BA%E7%BD%AE%E6%8A%80%E8%A1%93%E6%B1%BA%E7%AD%96%E5%A6%82%E4%B8%8B.md) | `59f6c1151015bdec746229e78596e2311cdc2f6f` | ASK 技術方向可追溯；ANS 的 next-intl、語系前綴、Backend 與中文品牌建議不取代現站架構。 |
| SITEMAP — [doc/01_business-plan/week-02/05_website-sitemap_ 官方網站資訊架構與網站地圖.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-02/05_website-sitemap_%20%E5%AE%98%E6%96%B9%E7%B6%B2%E7%AB%99%E8%B3%87%E8%A8%8A%E6%9E%B6%E6%A7%8B%E8%88%87%E7%B6%B2%E7%AB%99%E5%9C%B0%E5%9C%96.md) | `1f1b4584bbe06f0079542eedffa52215024da0f7` | 初版規劃 §14 URL、§16 SEO／Structured Data、§17 語言；採穩定短路由與 zh-TW，排除尚未發布頁。 |
| ARCH — [doc/01_business-plan/week-02/08_website-architecture_官方網站 Next.js 技術架構設計.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-02/08_website-architecture_%E5%AE%98%E6%96%B9%E7%B6%B2%E7%AB%99%20Next.js%20%E6%8A%80%E8%A1%93%E6%9E%B6%E6%A7%8B%E8%A8%AD%E8%A8%88.md) | `15c1483bf47be33bc29b755a220fb465b5dd8a1a` | 初版規劃 §13 Metadata／Twitter／Sitemap／robots；採 Next Metadata API，範例 allow 與清單不是開索引授權。 |
| MVP — [doc/01_business-plan/week-02/09_website-mvp_官方網站 MVP 開發規格.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-02/09_website-mvp_%E5%AE%98%E6%96%B9%E7%B6%B2%E7%AB%99%20MVP%20%E9%96%8B%E7%99%BC%E8%A6%8F%E6%A0%BC.md) | `5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d` | 初版規劃 §11 自然且真實 SEO、§12 Analytics 可選；採專屬資訊與無關鍵字堆砌，不導入 GA4／Contact API。 |
| HOSTING — [doc/01_business-plan/week-02/07_domain-hosting_網域、DNS、主機與部署架構規劃.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-02/07_domain-hosting_%E7%B6%B2%E5%9F%9F%E3%80%81DNS%E3%80%81%E4%B8%BB%E6%A9%9F%E8%88%87%E9%83%A8%E7%BD%B2%E6%9E%B6%E6%A7%8B%E8%A6%8F%E5%8A%83.md) | `9c1c5c8177c423bacaa97b5199a22430ddf6bc2c` | 初版規劃 apex／www／HTTPS／SEO 檢查；品牌 Canonical 保留，但實際 Domain／DNS 與上線證據由 Task 014 核對，不猜供應商值。 |

尚無核准分享圖、正式社群 handle、完整法定 Organization／ProfessionalService 資料、GSC property／權限、正式 Canonical 域名運作與索引開放紀錄。舊 sitemap 範例中的未實作服務、`/privacy-policy`、`/en`、產品／文章不能直接收錄；舊 robots `allow: "/"` 範例也不是開索引的授權。

## 4. Scope & Requirements

### 4.1 保護模式的必要成果

- 逐頁核對並集中必要的 Metadata／URL 規則，保留各頁專屬且已確認的 Title、Description 與品牌文字。
- 正確設定 Canonical、Open Graph、Twitter Card、HTML 語言與 locale，處理 root title template 及欄位繼承，不出現重複品牌或跨頁描述。
- 建立實際路由與 Sitemap 候選清冊、收錄／排除判定、robots 規則與可執行的保護驗收；保護階段不發布正式可提交的 Sitemap。
- 使用可由真實頁面支持的最小 Structured Data，或依證據明確排除不適用類型，不填假公司／評價／地址／產品／搜尋功能。
- 記錄 Search Console 的待確認權限、驗證方案與正式 release checklist；本次不註冊帳號、修改 DNS、提交 Sitemap 或請求索引。
- 完成一般／Pages 最終 HTML、HTTP、Base Path、URL、Metadata 與既有 UI 回歸；產出獨立實作報告。

### 4.2 任務邊界

不新增行銷頁、英文版、服務明細、Blog、CMS、Analytics、追蹤、Backend 或搜尋功能。不以 SEO 為由改寫既有服務範圍、法律政策或未經核准的商業宣稱。不任意更改品牌網域、套件、Next 建置模式或 workflow。

## 5. Information Architecture & UX

本任務沒有新的頁面 IA 或視覺 Section；工作集中於文件 `<head>`、機器可讀資訊、路由清冊及 URL 一致性。使用者閱讀及導航流程應保持既有行為。若確實需要更動可見標題、alt、Breadcrumb 或內部連結，必須有內容理由、列出影響頁面並驗收可見差異，不為 Schema 增加假的 Breadcrumb／搜尋介面。

| 資訊層 | 責任 |
| --- | --- |
| Root Layout | metadataBase、品牌 title template、共同語言與保護 robots；不讓子頁無意覆蓋全站保護 |
| Page Metadata | 真實逐頁 title／description／canonical／OG／Twitter，沿用該頁核准文案 |
| SEO 設定／工具 | URL 正規化、明確 route 清冊、共用欄位與安全輸出；避免一個包辦所有內容的通用框架 |
| Sitemap／robots | 保護與正式發布規則分離；只對實際 origin／路由作可驗證聲明 |
| Structured Data | 與可見內容和已確認事實一致，不代替使用者可讀內容 |
| Search Console | Owner 的站點驗證與正式提交階段，不能由程式 build 成功推定完成 |

可保留各頁 Metadata 寫在 route，僅抽出真正重複的規則。不要為三頁或少量靜態內容導入 SEO 套件或把所有頁面強制改成動態 Client Components。

## 6. Content & Data Specification

### 6.1 路由清冊與型別

可在 `src/config/seo.ts` 明確描述已實作頁面；不是從檔名或 planned route 推定所有內容可公開。保留現有 `siteConfig` 與導覽 API，不建立另一套互相矛盾的品牌設定。

```ts
type SeoPage = Readonly<{
  path: `/${string}`;
  title: string;
  description: string;
  availability: "public" | "draft";
  contentLastModified?: string;
}>;

type SeoProtectionPolicy = Readonly<{
  mode: "protected";
  publishSitemap: false;
}>;
```

目前保護模式不提供任意 query、Browser Storage 或 `NEXT_PUBLIC_*` 開索引捷徑。正式索引需第 8.4 節 release 變更與審查，不能只靠單一環境字串跳過前置條件。`availability: "public"` 只表示頁面真實可讀，不代表可索引；草案、dev、404、未實作路由不得變成正式候選。

`contentLastModified` 可省略；有值時需真實內容變更日期與證據，不能每次 build 用 `new Date()` 假裝內容更新。固定 registry 與實際 Page／導覽的一致性須由驗收檢查，避免日後漏加頁面。

### 6.2 Title、Description、Canonical 與社群資訊

| 頁面／欄位 | 基準與驗收要求 |
| --- | --- |
| `/` Title | `Xplore Kaleidoscope \| Web, Java & AI Digital Solutions` |
| `/` Description | `Xplore Kaleidoscope 提供網站開發、Java 企業系統、系統架構整合及 AI 商業應用解決方案，協助企業打造數位價值。` |
| `/about` Title | `關於 XK \| Xplore Kaleidoscope` |
| `/about` Description | `認識 Xplore Kaleidoscope（XK），了解我們的品牌理念、網站開發、Java 企業系統、系統整合與 AI 應用技術能力。` |
| `/services` Title | `服務項目 \| Xplore Kaleidoscope` |
| `/services` Description | `探索 Xplore Kaleidoscope 的網站開發、Java 企業系統、系統整合、AI 應用與雲端技術服務，打造符合企業需求的數位解決方案。` |
| 其他實際已合併頁面 | 以各頁規格／核准內容為準，逐頁列出 exact 預期值；不先替未完成頁面發布 Metadata |
| Title 合成 | 沿用 absolute title 或等效處理，最終只出現一份品牌名，不能重複套 template |
| Canonical | `siteConfig.url` 的品牌 Origin＋真實頁面 path；只有一個絕對 HTTPS URL，無 Query／Fragment／Pages Base Path；首頁根路徑與框架正常單一尾斜線可接受 |
| Open Graph | title、description、url、siteName、locale `zh_TW`、type `website` 與頁面一致；檢查 root／child 合併後最終 HTML，不只比 Source |
| Twitter Card | 沒有核准圖時採 `summary`、頁面專屬 title／description；不填假的 `site`／`creator` handle 或圖像。核准真實分享圖後才另驗 image、alt、尺寸、MIME／HTTP 與合適 Card type |
| Image／Icon | 保留現有 App icon；無核准 OG／Twitter Image 就省略，不用不存在檔名、未核准生成圖或拉伸 provisional Logo 冒充最終素材 |

描述採自然、準確且頁面專屬內容，不為固定字數刪失品牌語意，不保證搜尋引擎一定採用提供的 snippet。關鍵字只來自真實服務，不增加 meta keywords 堆砌、隱藏文字或誇大服務地區。

### 6.3 Structured Data

保護模式可提供與真實可讀網站一致的最小 `WebSite`：`@context: "https://schema.org"`、`@type: "WebSite"`、品牌 `name`、品牌 Canonical `url` 及 `inLanguage: "zh-TW"`；不宣稱正式網域已驗證或已索引。若使用穩定 `@id`，由相同品牌 Origin 產生，避免同一頁多份矛盾實體。

其他類型按實際內容決定：

| 類型 | 採用界線 |
| --- | --- |
| `Organization`／`ProfessionalService`／`LocalBusiness` | Pending Confirmation；Owner／必要法律審閱確認實際主體與可公開資料前不輸出。品牌名不能推導法定公司、地址、電話、營業時間或服務範圍 |
| `BreadcrumbList` | 只有實際頁面有相符的可見階層與有效 URL 時採用；目前不為 SEO 虛構新 Breadcrumb 或未實作服務詳頁 |
| `Article`／`Product`／`Review`／`AggregateRating` | 無對應真實且經授權內容時不輸出；AI SaaS 規劃不是已上架商品，Demo 不是客戶評價 |
| `SearchAction` | 現站無搜尋功能，不輸出虛構搜尋 endpoint |

JSON-LD 以可驗證 JSON 及安全序列化輸出，對 `<` 等字元採安全處理，不把任意 HTML 注入 script。驗證其語法、URL、重複實體、可見內容與事實一致性；工具沒檢出問題不等於 Google 保證 Rich Result。

### 6.4 Pending Confirmation

| 待確認事項 | 誰確認 | 何時確認 | 未確認 fallback |
| --- | --- | --- | --- |
| 正式分享圖、素材授權與社群 handle | 品牌 Owner | 新增該欄位前 | 省略 image／handle，保留真實文字 `summary` Card |
| Organization、地址、電話、法律資訊與政策狀態 | Owner；必要時法律審閱者 | 該 Schema／索引候選加入前 | 只用最小 WebSite，草案政策與未確認資料不收錄 |
| GSC property、帳號權限與驗證方法 | 網域／站點 Owner | 驗證或提交前 | 本機規則與報告可完成；不造 verification token、TXT 或假 GSC 截圖 |
| 正式 production origin、apex／www、HTTPS、redirect | Task 013／014 負責人與 Owner | 索引 release gate 前 | 保留品牌 Canonical 設定與全站 noindex／nofollow，不提交未驗證正式 URL |
| 索引開放範圍、Sitemap 候選與發布授權 | Owner 明確授權，對應任務負責人提供證據 | 實際 release 變更及公開發布前 | 保護模式維持，不將待辦轉為 PASS；必要條件未齊記 BLOCKED |

執行時在報告填實際確認人與期限，不虛構姓名或日期。這些條件不阻擋保護模式交付，但阻擋對應正式索引／GSC／額外 Schema 的宣稱。

## 7. Design System & Technical Constraints

保留 Next.js App Router、React、Strict TypeScript、Tailwind CSS 4、shadcn/ui、Lucide React、`src`／`@/*` 與 Server Components 優先。Metadata 不應使 Layout 變成 Client Component；無需 `next-seo`、schema 套件、Analytics SDK 或 Backend。

不改八個品牌 Tokens、Inter／Noto Sans TC、Container、Section、Button／Card API、原始 Logo Path／Transform／比例／配色與 Provisional 狀態。若補可及 alt／Heading／Link 名稱，以事實與語意為準，不為關鍵字破壞可讀性或 Accessibility。Heading 仍由可見內容決定，JSON-LD 不是替代 H1 的捷徑。

一般 Next.js build 與條件式 Pages export 各自相容；靜態 SEO 內容不依賴執行時 request、外部 API 或伺服器 Secret。新增 Metadata 檔案前檢查實際版本的檔案優先序，避免 file-based metadata 悄悄覆蓋 Page 設定。共用工具應小而明確，避免為少數 URL 建立通用路由系統。

## 8. Navigation, SEO & Deployment

### 8.1 URL、內部連結與語言

- 真實站內導覽沿用 Next.js Link，讓 framework 處理 `/xk-website` Base Path；頁內 `#id` 可用原生錨點。不在元件逐一硬編碼專案前綴，不用普通 `href="/about"` 繞過 Pages 路徑。
- Canonical／OG／Schema 使用品牌 Origin，不使用 localhost、Vercel Preview 或 GitHub Pages 專案子路徑；與實際傳遞給使用者的導航 URL 分開。
- 保留既有首頁 `#about`／`#brand`／`#services`／`#contact`／`#solutions` 與五個服務錨點；未實作的 route 不設有效 Link，不為 SEO 大量新增 redirect。
- HTML `zh-TW`、OG `zh_TW`、JSON-LD `zh-TW` 各依其格式；保留必要英文 `lang`。目前沒有英文對應頁，不輸出假的 `/en`、`hreflang="en"` 或語言切換，未來多語系需完整 reciprocal 與各自 Canonical 驗收。

### 8.2 Sitemap 與 robots 的保護模式

**保護模式是本任務可完整驗收的預設交付。** Sitemap 區分「候選路由規則」與「正式可提交產物」，不為滿足檔案數而發布無效空 Sitemap 或未核准的全部路由。

| 機制 | 保護模式要求 | 正式索引 release 後要求 |
| --- | --- | --- |
| HTML robots | 所有 public／預覽頁維持 `noindex, nofollow`，不得被子頁繼承錯誤覆蓋 | 只對獲准正式頁解除；Preview、草案、dev 與錯誤頁維持限制 |
| `robots.txt` | 產生可驗證的規則，允許 crawler 讀取 public HTML 的 noindex，不輸出 Sitemap 宣告；`/dev/` 等非公開路徑可排除，不能把 robots 當存取控制 | 依真實正式 origin 檢查 allow／disallow 與 Sitemap 絕對 URL，不意外攔住要索引的公開內容或必要 CSS／JS |
| `sitemap.xml` | 維持未發布，HTTP 404；完成明確候選／排除清冊與生成規則，報告此為保護策略，不能宣稱正式 Sitemap 已發布 | 由 Next.js Metadata Route 或等效靜態機制生成有效 XML，僅收錄核准可索引、實際 200 且 Canonical 正確的 URL |
| Sitemap 排除 | planned routes、服務明細空殼、草案 Privacy、dev、404、fragment、query、Preview／Pages 副本全部排除 | 同樣排除，後續新頁只有實際合併／內容核准／可用並納入 release 範圍後才加入 |
| 日期／URL | 候選清冊使用品牌正規 URL；未知內容修改日省略，不填建置時間 | XML 正確編碼、絕對 HTTPS、無重複／錯誤 Origin，lastmod 僅提供可追溯內容日期 |

允許爬取是為讓搜尋引擎讀到 `noindex`，不是開放索引；禁止用 robots 的非標準 `Noindex:` 指令代替 HTML Metadata。若改成 `Disallow: /`，crawler 可能無法讀到 noindex、既有 URL 仍可能被發現，此差異必須另經決策及實測，不與「保證不會被收錄」混為一談。`noindex` 與 robots 都不是保護機密內容的方法。

GitHub Pages 專案網站的 `/xk-website/robots.txt` 不是 origin 根的 `/robots.txt`，多數 crawler 不會把專案檔當作全站 robots。保留專案檔的正確輸出與可讀性，但以頁面 `noindex` 作目前可控制的索引保護；不得修改或宣稱擁有 `xk2022.github.io/robots.txt`。正式品牌網域於 Task 014 確認根路徑後，重新查真正 `/robots.txt`。Sitemap 亦不能因 Pages artifact 存在就當成品牌網域已可提交。

### 8.3 Search Console

保護模式僅建立操作計畫與權限待辦，不登入／建立 property、不修改 DNS、不加入假 verification token、不提交 Sitemap 或 request indexing。由 Owner 確認所屬 property 與管理權限、Domain property 或 URL-prefix 方法；驗證用 TXT 若需要，移交 Task 014 的明確 DNS 授權，GSC 不是啟用 Analytics 的理由。

未來獲授權後，驗證正式 Origin、GSC property、權限與實際生效方式；紀錄日期、方法與去敏證據。提交後分開記錄接受、抓取、索引等狀態，不把「已提交」說成「已收錄」，不承諾搜尋結果或曝光數。

### 8.4 正式索引與發布 gate

以下不是本次保護模式需擅自執行的行動。正式開放前，由 Owner 指定實際 release 範圍並明確授權，同一發布變更須有：

1. Task 013／014 或等效已核准流程的真實 production origin、正式 apex／www 決策、DNS／HTTPS／redirect 與公開內容證據；不猜測供應商值。
2. 可索引路由清冊、內容與真實 Link 檢查；需公開的 Contact／Privacy 有核准內容與資料處理，無需為未上線未收件功能假造政策或等待所有未來頁面。
3. 明確對照 production 與 Preview／Pages 的索引策略、Canonical、robots、Sitemap、Schema；保留 Preview／草案／dev 的保護，避免把 Pages 複本誤當正式可索引站。
4. 在 release PR 中實作／驗證正式 Sitemap 生成與 URL 清單、精確修改允許索引的頁面 Metadata 及必要 Validator；不得只刪除現有 noindex 斷言取得 build 成功。此維護屬 SEO release 工作，不隱含在 DNS 任務中自動發生。
5. PR CI／Review、明確 merge／部署授權、實際 main CI／deploy 與正式公開 HTML／robots／Sitemap／資源驗收；公開驗證完成後才進行另獲授權的 GSC 提交。

任一必要條件不足，正式索引 gate 記 BLOCKED 或尚未執行的 PENDING，保護模式仍保留；不得把完成 SEO 程式碼或 Vercel Preview 200 當成正式上線核准。

### 8.5 GitHub Pages 與建置保護

保留一般 `npm run build`／`npm run start` 與 `npm run build:pages` 的獨立模式，不能將 export／Base Path 永久套到一般 Next.js。Pages 預設 `/xk-website`、`trailingSlash: true`、`out/` 及既有 Script 保留；robots 路徑與資源依實際 Base Path 驗證，不將 Canonical 改成專案 Origin。

只擴充必要 SEO 產物驗證，保留首頁、About、Services 與已合併頁面的 noindex、Canonical、OG、404、`.nojekyll`、資源與 dev payload 排除；本次保護模式不移除現有 noindex 斷言。不修改 workflow、Pages Source、Vercel、DNS、Environment 部署條件或 Secrets。

## 9. File Structure & Change Scope

以下是未來正式 SEO 任務可處理的邊界；本次只建立規格，不建立功能產物。

| 動作 | 路徑／位置 | 限制 |
| --- | --- | --- |
| 必要修改 | `src/app/layout.tsx`、實際已合併 route 的 `page.tsx` | Metadata／最小真實 JSON-LD，不重寫頁面 UI 或業務文案，不破壞 Server Components |
| 視需要新增 | `src/config/seo.ts`、`src/lib/seo.ts` | 小型 typed 路由清冊／URL／Metadata 工具，與既有 siteConfig 單一來源一致 |
| 新增 | `src/app/robots.ts` | 依安裝版本的 Metadata Route，輸出保護規則；兼顧靜態匯出與 project robots 限制 |
| 保護模式不新增；release 時新增 | `src/app/sitemap.ts` 或等效靜態 Metadata Route | 保護階段 endpoint 保持 404；release gate 核准後才實作並驗有效公開 Sitemap，不提交假空 XML |
| 視需要新增 | 小型 SEO 驗證 script／meaningful 測試 | 驗最終 HTML、實際 URL、JSON-LD／robots／清冊一致性；不為測試改 app Dependencies |
| 必要擴充 | `scripts/build-github-pages.mjs` | 保護模式 Metadata／robots／Sitemap 不發布驗證，現有斷言不降低 |
| 最小修正 | 錯誤 Link／可及 alt／heading 的實際使用處 | 僅有明確 bug 或語意需求時修改並列證據；不擴充新的 UI |
| 未來獨立報告 | `docs/reports/task010-implementation.md` | 逐頁 Metadata 與 URL 清冊、機器可讀證據、release／GSC 狀態與限制 |
| 必要文件 | 任務索引與操作說明 | 保護／正式模式與例外寫清楚，保留歷史結果 |

禁止修改文件 Repository、原始 Logo、全域 Tokens／字體、package／lockfile、workflow、Pages Source、Vercel／DNS 設定、Secrets 或未授權業務頁面。新檔只在有實際需要時新增，不強迫抽象化；實際變更依最終 diff 說明，不提交 `.next/`、`out/`、`node_modules/` 或暫存 QA 工具。

## 10. Implementation Procedure

1. 記錄最新 Git Base、status、版本、實際 route、Metadata、Next 設定與雙 build；保護未提交工作。
2. 讀來源與各實際頁面規格，列 exact Title／Description／Canonical／OG，識別草案／dev／未實作與正式可讀範圍。
3. 定義保護模式、路由候選清冊及排除原因；先確認 noindex／nofollow 全站繼承，不建立任意開索引開關。
4. 最小整合共用 Metadata／URL 規則、逐頁 Twitter summary 與真實 WebSite；檢查安全序列化、欄位繼承及 fake Schema 排除。
5. 新增靜態相容 robots，記錄 Pages project scope 限制；Sitemap 維持 404，完成正式生成規則、候選與 release check，不發假 XML。
6. 檢查所有已合併頁面的內部連結、語言、Heading、Canonical 與資源，修真實問題；沒有 UI 需求不新增視覺 Section。
7. 最終程式碼執行五個品質指令、一般 production 與 Pages 產物的第 11 節驗收，保存最終 HTML／HTTP／機器資料；發現失敗先修再重驗。
8. 完成獨立本機報告、版本與實際 diff，列 Pending Confirmation；再 Commit／PR，記真實遠端 CI，不把 PR artifact 當發布。
9. 正式索引／GSC 保持待授權階段；未來滿足第 8.4 節後，另以受審查 release 變更完成 Sitemap、索引與公開驗收，不在保護模式暗中執行。

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

### 11.1 指令與機器可讀資料

| ID／項目 | 適用性 | 預期結果／原因 | 狀態 |
| --- | --- | --- | --- |
| S10-C01 `npm ci` | Required | exit 0，重現既有 lockfile，無未授權依賴變動 | PENDING |
| S10-C02 `npx tsc --noEmit` | Required | exit 0，Strict TS、Metadata 與 typed 清冊／工具符合真實 API | PENDING |
| S10-C03 `npm run lint` | Required | exit 0，符合既有零警告 ESLint | PENDING |
| S10-C04 `npm run build` | Required | exit 0，一般 Next.js 與 robots 可用，保留動靜態邊界 | PENDING |
| S10-C05 `npm run build:pages` | Required | exit 0，Metadata／robots 靜態輸出可用、noindex 等既有斷言不降低 | PENDING |
| S10-M01 逐頁 exact Metadata | Required | 一般 production 與 Pages 最終 HTML 中各頁 Title／Description／Canonical／OG／Twitter 值符合第 6 節，無重複品牌或多個矛盾 canonical | PENDING |
| S10-M02 URL 正規化 | Required | 品牌 HTTPS Origin、正確 path、單一正常尾斜線；無 localhost／Preview／Pages 前綴／Query／Fragment 汙染；真實站內 Link 保留 Base Path | PENDING |
| S10-M03 保護索引 | Required | Layout 與每個可讀頁最終 HTML robots 都含 noindex／nofollow，子頁、Twitter 或 Schema 不解除保護；頁面 200 不冒作可索引 | PENDING |
| S10-M04 OG／Twitter 圖與 handle | Required | 沒核准資產時省略 image／handle，summary 文字真實；如已有核准素材，測 MIME／HTTP／尺寸／alt／URL，無假路徑 | PENDING |
| S10-M05 語言 | Required | HTML zh-TW、OG zh_TW、JSON-LD zh-TW 正確，無不存在英文頁的 hreflang 或 language alternate | PENDING |
| S10-M06 JSON-LD | Required | 可解析安全 JSON、最小 WebSite 與真實品牌一致，無重複／假 SearchAction／公司／評價／產品；不存在的可選類型不強行輸出 | PENDING |
| S10-M07 robots HTTP／內容 | Required | 一般 `/robots.txt` 與 Pages Base Path 對應檔成功載入、格式正確；允許讀取 public noindex、無 Sitemap 宣告，不攔必要資源；清楚說明 project scope | PENDING |
| S10-M08 Sitemap 保護策略 | Required | 保護模式 `/sitemap.xml` 與 Pages 對應路徑 404、無 Sitemap 宣告；候選／排除清冊有依據，沒有假空 XML 或收錄 planned／draft／dev／404 | PENDING |
| S10-M09 真實內容變更日期 | Required | 有 lastModified 才驗來源與格式，未知省略；不使用每次 build 時間假更新 | PENDING |
| S10-M10 受影響設定與 Diff | Required | 保護現有 Tokens、Logo、版本、workflow、雙建置與索引斷言；沒有順帶開索引或新增 Tracking | PENDING |

### 11.2 Browser、Responsive 與現有 UI 回歸

| ID／項目 | 適用性 | 預期結果／原因 | 狀態 |
| --- | --- | --- | --- |
| S10-F01 HTTP／Fresh Regression | Required | 首頁、About、Services 與當時已合併 public 頁面一般／Pages 200、主要內容與 Section 未改壞；draft 依該任務保護規則，不硬等未來頁面 | PENDING |
| S10-F02 全部內部 Link／錨點 | Required | 真實列舉、HTTP 與 ID 檢查及主要跨頁操作，含首頁服務／聯絡舊錨點與 Pages Base Path；不把 planned 路由當可用 | PENDING |
| S10-F03 Console／Runtime／Network | Required | 無非預期錯誤；CSS、JS、字體、icon／圖片按本次實際清單成功，預期 Sitemap／dev／unknown 404 分開記錄不遮蔽資源錯誤 | PENDING |
| S10-F04 靜態產物／404／`.nojekyll` | Required | 所有已合併頁及 robots 檔、404、`.nojekyll` 存在且路徑正確，Pages 無 dev 路由／payload；一般 dev 預設 404 | PENDING |
| S10-R01 320 px | Required | 所有受影響 public 頁面無水平溢出、標題／Logo／CTA 裁切；確認 SEO 整合未改壞 DOM／排版 | PENDING |
| S10-R02 375 px | Required | 手機 Header／Footer、卡片、主要連結與觸控行為正常，主要內容不隱藏 | PENDING |
| S10-R03 768 px | Required | 平板排列與手機選單狀態正確，無隱藏但可 Focus 的項目 | PENDING |
| S10-R04 1440 px | Required | 桌面可見標題／內容與原頁規格一致，不為關鍵字扭曲閱讀 | PENDING |
| S10-R05 1920 px | Required | 最大容器、留白與可讀性保留；五種寬度逐頁記錄，不複製歷史案例數 | PENDING |
| S10-A01 axe | Required | 受影響頁面五種寬度與適用手機選單展開狀態，WCAG 2／2.1 A／AA 自動規則通過或如實記問題，不能當完整認證 | PENDING |
| S10-A02 Keyboard／Focus | Required | Skip Link、Tab／Shift+Tab／Enter、主要連結與 CTA 可操作，Focus 可見；無 SEO 新增隱藏 Link 或焦點陷阱 | PENDING |
| S10-A03 MobileNavigation | Required | 開關名稱／expanded／controls、Escape 還原、連結／外部點擊／桌面斷點收合正常 | PENDING |
| S10-A04 Reduced Motion／人工確認 | Required | 既有減少動態設定與閱讀順序保留，人工檢查任務實際影響；不只看 head 正確就推論 UI 正常 | PENDING |
| S10-A05 Disabled | Not Applicable | 本任務不新增控制；若改到原生停用 Button 則改 Required，驗不可觸發與 Tab 略過，不對 Link 使用假 disabled | PENDING |
| S10-A06 螢幕閱讀器補測 | Optional | 若變更可及名稱／Heading，可補測真實閱讀與語言；沒做記錄原因與範圍 | PENDING |
| S10-E01 新視覺 Section／新圖 | Not Applicable | SEO 不建立新 UI，機器資料以 HTML／HTTP／JSON 證據為主；若實際改可見 UI，截圖依第 12 節轉 Required | PENDING |

### 11.3 發布階段的條件驗收

| ID／項目 | 適用性 | 預期結果／原因 | 狀態 |
| --- | --- | --- | --- |
| S10-P01 Release gate 判定 | Required | 明確判定第 8.4 節條件／Owner 授權是否齊備；保護模式交付與正式索引待辦分開，未知寫 Pending Confirmation | PENDING |
| S10-P02 正式 Sitemap XML／索引開放 | Optional | 只有 release gate 齊備且本次明確含 release 才執行，屆時改 Required；驗 XML、實際 200 URL、排除範圍、Metadata／robots 及公開資源，不在未授權時開放 | PENDING |
| S10-P03 GSC 驗證／提交 | Optional | 僅 Owner 權限、真實正式 URL 與授權齊備才進行；記實際 property／方法／時間／回應，不把提交當索引成功 | PENDING |
| S10-P04 公開站 Smoke | Optional | 僅獲 merge／deploy 授權且實際部署後驗正式公開 HTML、robots、Sitemap 策略、URL、資源；未發生保留 PENDING 說明階段 | PENDING |
| S10-P05 排名／收錄時間／流量保證 | Not Applicable | 無可保證搜尋成果；不編造排名、Lighthouse 或轉換改善數據 | PENDING |
| S10-P06 DNS／Vercel／Analytics 實作 | Not Applicable | 不屬 SEO 保護模式範圍，分別由 Task 013／014 或獨立授權處理 | PENDING |

保護模式完成不需擅自執行尚未授權的正式索引與 GSC。若使用者明確把 release 納入同次範圍，對應必要條件缺少記 BLOCKED，不能用 Optional 隱藏已授權但未完成的必要工作。

### Test Failure Policy

- `FAIL` 不得標記為 `PASS`，原始失敗與重驗紀錄均須保留。
- 發現問題必須記錄原因、影響範圍及修正方式；可修正的問題應先修正，再重新執行相關測試及必要回歸。
- 無法修正的問題必須列入報告的 Known Issues，註明嚴重程度、交付影響、目前狀態及後續處理方式。
- 存在阻礙交付的 `FAIL` 或必要驗收的 `BLOCKED`，不得宣稱任務完整通過。交付須符合原規格；不適用項目只有在附上理由與依據後才能記為 `N/A`。
- 不得透過跳過測試、降低驗收標準、隱藏錯誤或展示舊成功結果取得 `PASS`。
- 外部服務、權限或環境造成的阻礙，必須記錄實際原因、發生時間、影響測試及解除條件；不得虛構執行結果。

## 12. Test Report & Evidence

未來建立 `docs/reports/task010-implementation.md`；目前僅規範路徑，不建立空報告、不將不存在證據做成 Link。報告記錄 Repository／Git 狀態、Base SHA、Feature Branch、實際變更、來源／Blob、環境版本、兩種 Build、受測路由清冊與每頁 exact Metadata 值。

證據以實際 HTTP Response、最終渲染 `<head>`／JSON-LD、robots 內容、Sitemap 404 或獲准 XML、Base Path 操作與 Browser 錯誤清單為主。保存來源與取樣方式，說明 header／HTML robots 的繼承與限制；不可用 Source 文字搜尋代替最終產物或公開結果。

每項執行狀態為 PENDING／PASS／FAIL／BLOCKED／N/A，適用性另列；完整記錄命令、Exit Code、原失敗、修復與重驗。報告分開說明保護模式、正式 Sitemap、索引 release、GSC 驗證、提交與實際收錄；沒有後者證據不得冒稱完成。

| 證據項目 | 適用性／未來位置 | 狀態 |
| --- | --- | --- |
| Metadata／robots／JSON-LD／HTTP | Required；報告中的 Test ID 對應實際輸出或去敏 artifact 位置，不建立假檔名連結 | PENDING |
| 五種寬度與 axe／鍵盤／網路 | Required；報告記每頁、viewport、模式、時間及實際結果，不固定套用歷史測試次數 | PENDING |
| Desktop 截圖 | Optional；無可見 UI 變更可明確說明不新增視覺證據。若改 UI 轉 Required，檔名 `docs/screenshots/task010-seo-desktop.png`，1440 px 實際頁面 | PENDING |
| Mobile 截圖 | Optional；同上，變更可見 UI 時轉 Required，檔名 `docs/screenshots/task010-seo-mobile.png`，375 px 實際頁面 | PENDING |
| GSC／公開 release | Optional；僅真實發生才附去敏畫面／回應，無權限不填假驗證 token 或提交成功 | PENDING |

視覺未變不需為機器 Metadata 新建行銷 Section，也不以重新截圖本身取代 Browser 回歸。若新增截圖須來自本次實際受測網站並人工檢視，不能沿用 Task 003–005 舊圖冒作現版。

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

| 項目 | 規範 |
| --- | --- |
| Base／Branch | 最新已合併 `main` → `feature/website-seo` |
| 建議 Commit | `feat(seo): standardize protected metadata and crawl policies` |
| PR Title | `Task 010: XK SEO Foundation`，Description 明確標示 protected／是否另含已授權 release |
| PR 內容 | 逐頁 Metadata／URL 變更、robots 與 Sitemap 策略、Schema 事實依據、Pages 差異、索引／GSC gate、實際測試與 Known Issues |
| CI | 本次實際 head 的 quality／pages-build、artifact 及 deploy skipped；本機成功不能替代遠端 |
| 限制 | 不直接 Push main、不自動 merge、不提前移除 noindex／nofollow、不因建立 PR 而執行 DNS／GSC／正式發布 |

PR 前本機報告完整、受測版本與實際提交一致；release 若另行進行，另有明確 diff、核准及證據，不以一個模糊「SEO 已完成」狀態涵蓋所有發布階段。本次文件規格交付不是 Task 010 功能已執行。

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

- 實際已合併路由與逐頁 Metadata 清冊、保護模式／Sitemap 候選及排除判定，重要來源的固定 Commit／Blob 與採用界線。
- 正確 Title／Description／Canonical／OG／Twitter／語言與最小真實 WebSite，保持 noindex／nofollow；無假圖、社群 handle、評價或法定資料。
- 靜態相容 robots、GitHub Pages 專案 robots 限制說明，以及保護階段 Sitemap 404 與正式生成／驗收規則。
- Pending Confirmation 與正式 release／GSC 權限及授權門檻；保護模式不冒稱已開放索引或已提交。
- `docs/reports/task010-implementation.md` 的指令、Exit Code、HTML／HTTP／JSON 證據、Fresh 回歸、限制及最終版本對照。
- 真實 Feature Commit、PR、遠端 CI／artifact 及各階段狀態；必要可見 UI 變更時才另附指定截圖。

## 15. Out of Scope & Future Work

不進行排名／流量保證、關鍵字廣告、Analytics、Tracking、Blog、英文翻譯、CMS、Backend、搜尋功能、客戶評價或商業資料創作。Core Web Vitals 與完整效能改善交由 Task 011，完整 WCAG 2.2 AA 改善交由 Task 012；本次仍需保留既有 Accessibility 回歸。

Task 013／014 負責 Vercel 與正式網域前置證據，不能自動代表 SEO 已獲索引授權。正式 Sitemap 產生、production index release 與 GSC 在條件齊備的後續 SEO release 變更完成；不必等所有未來產品／內頁，但只收錄當時已合併、核准、真實可用及被授權的範圍。

最終分享圖、法定 Schema、GSC property／權限與正式索引範圍保持 Pending Confirmation。未核准項目省略或保持保護，不編造資料，不擅改 DNS／Secrets／發布條件。

## 16. Final Delivery Checklist

以下為未來 SEO 任務驗收清單，目前全部 PENDING；本次只完成規格文字，不填功能、GSC 或發布結果。

執行狀態依第 11 節統一使用 `PENDING`、`PASS`、`FAIL`、`BLOCKED`、`N/A`。僅有證據的 `PASS` 可勾選；其餘保持未勾選，`N/A` 附判定理由且不視為缺少適用驗收。必要項目仍為 `PENDING`、`FAIL` 或 `BLOCKED` 時，不得宣稱完整通過。以下是規格初始清單，本輪文件修訂不代填功能結果。

- [ ] PENDING — 最新 main、remote、status、Base SHA、版本與實際路由清冊已確認，未覆蓋使用者工作。
- [ ] PENDING — 已讀規格與重要來源，記固定 Commit／Blob、核准界線及實際採用內容。
- [ ] PENDING — 每個已合併受影響頁面的 exact Title／Description、Canonical、OG 與 Twitter 正確且無重複品牌。
- [ ] PENDING — root／child Metadata 繼承與最終 HTML 已驗證，不只檢查 Source。
- [ ] PENDING — 保護模式仍為 noindex／nofollow，沒有未授權開索引環境開關或子頁覆蓋。
- [ ] PENDING — robots 正確輸出，無正式 Sitemap 宣告，且已說明 Pages project path 不是 origin 根 robots。
- [ ] PENDING — Sitemap endpoint 保護模式維持 404，候選／排除與正式生成規則完整，無空 XML／未實作 URL。
- [ ] PENDING — 最小 WebSite JSON-LD 安全可解析且事實正確，未輸出假公司／地址／產品／評價／搜尋 Schema。
- [ ] PENDING — HTML／OG／JSON-LD 語言一致，未建立不存在的 hreflang 或英文頁。
- [ ] PENDING — Canonical 與導航 URL 分工正確，Pages Base Path／舊錨點／有效跨頁連結均實測。
- [ ] PENDING — npm ci、TypeScript、ESLint、一般 Build 與 Pages Build 實際執行並記錄 Exit Code。
- [ ] PENDING — 首頁、About、Services 與當時已合併頁面的 Fresh Regression、HTTP／資源與全部有效連結完成。
- [ ] PENDING — 五種指定寬度 320／375／768／1440／1920 px、axe、Keyboard／Focus、MobileNavigation、Reduced Motion 與人工檢查完成。
- [ ] PENDING — Console／Runtime／Network、404、`.nojekyll`、dev 路由／payload 排除與原 Validator 保護正常。
- [ ] PENDING — 可見 UI 有修改時已附真實 Desktop／Mobile 截圖並人工檢視；無修改時已清楚說明適用性。
- [ ] PENDING — Pending Confirmation 的 Owner、時點、fallback 及正式索引／GSC 權限與授權界線明確。
- [ ] PENDING — 保護模式交付、正式 Sitemap、GSC、merge／main CI／部署／公開驗證狀態分開，未冒稱已索引。
- [ ] PENDING — 獨立本機報告與最終版本一致，diff／修改範圍／Secrets 排除、Feature Commit、PR 與實際 CI 有證據。
- [ ] PENDING — Test Failure Policy 已遵守，失敗、阻礙與 Known Issues 有完整記錄，沒有阻礙交付的未解決必要驗收。
- [ ] PENDING — 每項測試的 Test ID、預期／實際結果、狀態與可追溯證據已記錄，沒有以預期或舊結果代填。
- [ ] PENDING — 獨立報告已在 PR 建立前完成並納入同一 PR，最後測試、後續重驗與實際提交的程式碼一致。
- [ ] PENDING — 本機、Feature Commit、PR CI、PR Review、合併授權、main CI、部署與公開 URL 驗證分別記錄；未發生階段維持 PENDING 並說明，沒有冒稱已發布。
