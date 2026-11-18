# Task 009 — Privacy 隱私權政策

## 1. Task Overview

建立與 XK 官網實際資料行為相符、可供品牌負責人與法律審閱者審核的隱私權政策，以及核准後可發布的 `/privacy` 頁面。技術準備、草案審查、正式政策核准與公開發布必須分開記錄；開發者不能替品牌決定法律主體、適用法域、保存期限或權利處理承諾。

| 項目 | 規格 |
| --- | --- |
| Project／Brand | Xplore Kaleidoscope／XK |
| Task Type | Website Page／Legal Content；與 Task 008 Contact 分開 |
| 品牌網域 | `https://xplorekaleidoscope.com`；不代表已完成正式網域連接 |
| 語言／路由 | 繁體中文 `zh-TW`；正式路由 `/privacy`，不改成舊規劃 `/privacy-policy` |
| 功能分支 | `feature/website-privacy-policy` |
| 未來獨立報告 | `docs/reports/task009-implementation.md`；目前不建立假報告或連結 |
| 初始驗收 | 全部 PENDING；本次只撰寫規格，未完成法律審核或功能開發 |

本任務不提供法律意見結論，也不將通用網路範本直接變成已生效政策。資料流盤點、草案與呈現可先進行；正式政策發布必須通過第 6 節核准門檻。必要核准受阻時，技術成果可個別報告，但不得宣稱 Task 009 已完整通過。

## 2. Repository & Prerequisites

| 前置項目 | 要求與依賴 |
| --- | --- |
| 唯一可寫 Repository | `xk2022/xk-website`；來源 `xk2022/xplore-kaleidoscope` 僅讀取 |
| 本規格研究的網站 Base | `e2a8f5a33f24d1ea65a3afc3780014a33c204528`，不是未來開發時固定最新版本 |
| 正式開發基準 | 確認最新已合併 `main`、remote、branch、status、diff、現有路由與套件版本；保留未提交修改 |
| 技術基礎 | 已合併 Task 001–005 的 Design System、共用導覽與雙建置模式；不可自行整合未核准功能分支 |
| Task 008 依賴 | 核對實際 Contact 版本、是否收件及第三方服務；若未實作，針對目前無表單版本盤點即可，不必等待整個後續任務鏈 |
| 核准依賴 | 品牌負責人確認資料處理者、真實管道及實際營運；其指定的合格法律審閱者確認政策與適用法域。未指定審閱者本身也是待確認事項 |
| 部署基礎 | 保留一般 Next.js 與 GitHub Actions → GitHub Pages；Task 013／014 改變供應商或網域時必須重新審查相關揭露 |

先檢查 README、AGENTS、Task 規格及實際程式，不把歷史報告的「尚未合併／發布」當成當下狀態。AGENTS／README 仍含舊任務別名與舊里程碑；現行 Task 001、002 canonical 文件存在，Task 006–014 分類依最新任務索引及使用者指示，不復原已刪除替代原稿。

## 3. Reference Documents

### 3.1 網站規格與實際程式

讀取 [任務索引](README.md)、[Task 001](task001.md)、[Task 002](task002.md)、[Task 003](task003.md)、[Task 004](task004.md)、[Task 005](task005.md)，以及 [AGENTS](../../AGENTS.md)、[README](../../README.md)、[歷史紀錄](../implementation-notes.md)、[Design System／元件 API](../brand-design-system.md)、[首頁](../homepage-implementation.md)、[About](../about-implementation.md)、[Services](../services-implementation.md) 與 [Pages 指南](../github-pages-deployment.md)。後續 Contact 以 `docs/task/task008.md` 及實際已合併程式為準，不能只依規格假設表單已存在。

以下為網站 `main` 研究快照的實際來源；執行時重新記錄 Base 與 Blob，不重用舊測試結果：

| 固定版本網站來源 | Git Blob SHA |
| --- | --- |
| [docs/task/temp.md](https://github.com/xk2022/xk-website/blob/e2a8f5a33f24d1ea65a3afc3780014a33c204528/docs/task/temp.md) | `46adeba2b7f39a16f1ac2ec964b2ed9cc434d1a2` |
| [src/config/contact.ts](https://github.com/xk2022/xk-website/blob/e2a8f5a33f24d1ea65a3afc3780014a33c204528/src/config/contact.ts) | `121ba6506ba5420c6d699e6ef8e67725f7188f92` |
| [src/app/layout.tsx](https://github.com/xk2022/xk-website/blob/e2a8f5a33f24d1ea65a3afc3780014a33c204528/src/app/layout.tsx) | `c97305e70015983ca3e41801b6bcb24ad222ec65` |
| [src/components/layout/site-footer.tsx](https://github.com/xk2022/xk-website/blob/e2a8f5a33f24d1ea65a3afc3780014a33c204528/src/components/layout/site-footer.tsx) | `a53331186e69d20f8d962b79fc02fd6db2d6f315` |
| [src/config/navigation.ts](https://github.com/xk2022/xk-website/blob/e2a8f5a33f24d1ea65a3afc3780014a33c204528/src/config/navigation.ts) | `020f8db2b29585e6e9313acd1551f99888d29291` |
| [next.config.ts](https://github.com/xk2022/xk-website/blob/e2a8f5a33f24d1ea65a3afc3780014a33c204528/next.config.ts) | `07606ad3f492dfb5b747e96ddb22144e54a45612` |
| [scripts/build-github-pages.mjs](https://github.com/xk2022/xk-website/blob/e2a8f5a33f24d1ea65a3afc3780014a33c204528/scripts/build-github-pages.mjs) | `f1aa1df74b6abf867e12739a6c3bce49566ebf31` |

### 3.2 商業文件來源與採用範圍

來源 Repository 為 `xk2022/xplore-kaleidoscope`、Branch `main`、Commit `95ef1275a46ace76e11f668178ca881087483398`。下列連結固定該版本；Blob 可核對內容身分，不代表文件或法律文案已獲核准。

| ID／固定版本來源 | Git Blob SHA | 核准界線與本任務採用 |
| --- | --- | --- |
| BUSINESS_EN — [doc/01_business-plan/week-01/00_company-profile.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-01/00_company-profile.md) | `249dda3bc464c7fae497e037d8a9916ed93893e7` | 業務介紹，未見法定登記核准；採品牌／服務定位，不推導法人或已商用 SaaS。 |
| BUSINESS_ZH — [doc/01_business-plan/week-01/00_公司介紹.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-01/00_%E5%85%AC%E5%8F%B8%E4%BB%8B%E7%B4%B9.md) | `d089b3baf8a7466716cfa13ff62bd959f812b108` | 中文名稱尚待定案；採一人全職品牌定位，不補造法定名稱／地址。 |
| INIT — [doc/00_initGPT/05_Xplore Kaleidoscope 正式建置技術決策如下.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/00_initGPT/05_Xplore%20Kaleidoscope%20%E6%AD%A3%E5%BC%8F%E5%BB%BA%E7%BD%AE%E6%8A%80%E8%A1%93%E6%B1%BA%E7%AD%96%E5%A6%82%E4%B8%8B.md) | `59f6c1151015bdec746229e78596e2311cdc2f6f` | ASK 的技術方向與 ANS 的舊 monorepo／Backend 範例分開；僅保留官網獨立前端，範例信箱不是有效管道。 |
| MVP — [doc/01_business-plan/week-02/09_website-mvp_官方網站 MVP 開發規格.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-02/09_website-mvp_%E5%AE%98%E6%96%B9%E7%B6%B2%E7%AB%99%20MVP%20%E9%96%8B%E7%99%BC%E8%A6%8F%E6%A0%BC.md) | `5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d` | 初版規劃 §8 表單／API、§12 可選 Analytics；採盤點與告知需求，不視為已蒐集資料或已啟用 GA4。 |
| ARCH — [doc/01_business-plan/week-02/08_website-architecture_官方網站 Next.js 技術架構設計.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-02/08_website-architecture_%E5%AE%98%E6%96%B9%E7%B6%B2%E7%AB%99%20Next.js%20%E6%8A%80%E8%A1%93%E6%9E%B6%E6%A7%8B%E8%A8%AD%E8%A8%88.md) | `15c1483bf47be33bc29b755a220fb465b5dd8a1a` | 初版規劃 §10／12 的 Email／表單是範例；採內容集中與語意呈現，不建立 Spring Boot 收件。 |
| SITEMAP — [doc/01_business-plan/week-02/05_website-sitemap_ 官方網站資訊架構與網站地圖.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-02/05_website-sitemap_%20%E5%AE%98%E6%96%B9%E7%B6%B2%E7%AB%99%E8%B3%87%E8%A8%8A%E6%9E%B6%E6%A7%8B%E8%88%87%E7%B6%B2%E7%AB%99%E5%9C%B0%E5%9C%96.md) | `1f1b4584bbe06f0079542eedffa52215024da0f7` | 初版規劃 Legal／Footer；現行 canonical 路由採已確認 `/privacy`，不新增舊 `/privacy-policy`。 |
| HOSTING — [doc/01_business-plan/week-02/07_domain-hosting_網域、DNS、主機與部署架構規劃.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-02/07_domain-hosting_%E7%B6%B2%E5%9F%9F%E3%80%81DNS%E3%80%81%E4%B8%BB%E6%A9%9F%E8%88%87%E9%83%A8%E7%BD%B2%E6%9E%B6%E6%A7%8B%E8%A6%8F%E5%8A%83.md) | `9c1c5c8177c423bacaa97b5199a22430ddf6bc2c` | 初版規劃 §12 建議信箱與 Hosting；採供應商盤點需求，不推定實際信箱、DNS、日誌保存或跨境地點。 |
| CASE — [doc/01_business-plan/week-03/02_case-01-corporate-website.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-03/02_case-01-corporate-website.md) | `c9b151d01a7616abb939dd9747d704428d0bdd8c` | Demo 規劃的正式發布前法律審核提醒；不是可發布法律正文或真實企業案例。 |

來源尚無獨立核准的隱私政策、法定名稱／統編／地址、有效權利聯絡管道、保存期限、實際資料處理契約或完整法律審核證據。這些缺漏不得靠創辦人一人品牌定位、建議 `contact@…`／`hello@…`、文件建立日期或一般供應商能力補造。技術服務文案中的 Java、AI、Database、Cloud VPS 不代表官網處理訪客資料的實際服務。

## 4. Scope & Requirements

### 4.1 必須完成

- 以最終受測程式碼、瀏覽器及已確認部署設定建立資料流清冊，涵蓋資料來源、欄位、目的、接收者、保存／刪除、第三方、Cookie／Storage 與權利管道。
- 核對 Task 008 的實際行為；如無表單，明確記錄沒有應用層表單收件證據，仍檢查 Hosting／CDN 日誌與外部請求，不能宣稱「完全不處理個資」。
- 產出可追溯內容草案、待確認清單與核准版本；核准後以共用 Design System 呈現正式政策，整合頁尾與真實聯絡入口。
- 建立草案與正式版的發布界線、版本與生效日期管理；未核准內容不得進入公開 Pages HTML、payload、Sitemap 或對外有效政策連結。
- 完成內容一致性、長文閱讀、Accessibility、一般／Pages 保護與回歸測試，產出獨立報告及真實證據。

### 4.2 不能自行決定的事項

不發明法定公司、登記編號、營業地址、負責人姓名、適用法域、跨境傳輸地點、資料出售與否、保存年限、安全認證、回覆時限、刪除保證或生效日期。不以「使用本站即同意所有處理」取代經審核的告知／合法依據；不加入假的同意 Checkbox、Cookie Banner、權利申請表單或成功提示。

## 5. Information Architecture & UX

正式頁面沿用 Header、Main、Footer。以單一 H1「隱私權政策」、簡短適用範圍、已確認版本／生效資訊、頁內目錄及九個語意內容區塊呈現。草案預覽必須清楚標示「草案，尚未核准生效」，不可顯示假的正式生效日。

| 順序／穩定 ID | 內容與 UX 要求 |
| --- | --- |
| `policy-scope` | 適用範圍、實際資料處理主體；不把品牌名當成已成立法人的證明 |
| `data-collection` | 蒐集範圍與來源；區分訪客提供、裝置／網路與供應商資料 |
| `data-use` | 各類資料對應目的與使用方式；安全措施只寫經確認的實際做法 |
| `retention` | 保存、刪除與判定原則；無核准資料時保留在內部待確認清單 |
| `third-parties` | 實際 Hosting／CDN、表單／郵件／反垃圾服務、跨境與外站連結界線 |
| `cookies-tracking` | 實測 Cookie、Storage、追蹤技術及必要／非必要分類；不為政策新增追蹤 |
| `your-rights` | 經審核的使用者權利、申請方式、驗證與限制；不捏造法定處理期限 |
| `privacy-contact` | 已確認權利聯絡方式；沒有真實管道不得顯示可點擊假信箱 |
| `policy-updates` | 核准版本、生效與更新告知方式，不以每次 build 的日期冒充政策變更 |

可用一般內容段落及清單，不必使用 Card 包裹每一段。手機目錄自然換行，桌面可採簡單側欄但不可遮住 Focus 或標題；頁內錨點是可鍵盤操作的真實 Link，不要求 Accordion 或新增 Client Component。長網址、服務名稱與法律文字不得撐破 320 px 版面；不靠固定高度裁切長文。

## 6. Content & Data Specification

### 6.1 實際資料行為盤點

研究 Base 僅證明以下原始碼狀態，**不是本次新的 production／Browser 驗收結果**。正式執行需以當時程式與實測更新：

| 資料面向 | 研究發現 | 未來必須確認的證據 |
| --- | --- | --- |
| 聯絡管道／表單 | `verifiedContactChannels` 為空，未發現 `<form>`、應用層收件 API 或可公開信箱 | 最終 Source、DOM、實際操作與 Task 008 已合併版本；若新增外部收件服務，檢查真實送達與其條款，不沿用「無表單」結論 |
| 追蹤／儲存 | `src` 未發現 Analytics SDK、Cookie、localStorage 或 sessionStorage 寫入 | 一般／Pages 新 Browser Context 的請求、Cookie、Storage 前後比對；Source 搜尋不等同網站／供應商完全沒有日誌 |
| 字體 | Layout 使用 `next/font/google` 的 Inter／Noto Sans TC | 分清 build 時下載與訪客 Runtime 請求；驗收實際字體是否由站內 `_next` 提供，不一律聲稱訪客連 Google |
| Hosting／CDN／Logs | 已設定 GitHub Pages 靜態模式，一般 Next.js 保留 Vercel 相容性 | Owner 確認實際供應商、處理地區、存取／安全日誌與其條款版本；不能因本 Repo 無資料庫而宣稱 Hosting 不處理 IP |
| 外站連結 | 現有公開聯絡清單為空，Logo 等素材保存在站內 | 列舉最終外部 Link、嵌入、字體與第三方 JS；單純外站 Link 與頁面直接載入第三方資源分開記錄 |

每筆資料流至少記錄 ID、觸發時機、資料欄位／來源、目的、接收者／供應商、傳輸、保存／刪除、證據與確認狀態。未知值使用 `Pending Confirmation`，不能從供應商首頁推導租戶實際設定。報告／截圖遮蔽個資、token 與收件內容；測試採合成資料，不提交真實訪客訊息。

### 6.2 集中資料與型別

可新增 `src/config/privacy.ts`，採明確且可審查的資料，不建立 CMS 或法律規則引擎。至少包含：

```ts
type PrivacySection = Readonly<{
  id: string;
  title: string;
  paragraphs: readonly string[];
}>;

type PrivacyPolicyConfig = Readonly<{
  status: "draft" | "approved";
  version: string | null;
  effectiveDate: string | null;
  controllerName: string | null;
  rightsContact: Readonly<{ label: string; href: string }> | null;
  sections: readonly PrivacySection[];
}>;
```

`null` 代表尚未確認，不能自動轉為假值；`href` 必須經真實管道驗證與允許協定檢查。Owner／法律審核證據保存在報告或可授權讀取的紀錄，不把敏感簽核資料、個人地址或收件設定放入 Browser Bundle。`status: "approved"` 必須有同版本核准證據，不能以一個可由瀏覽器變更的旗標冒充核准。

### 6.3 Pending Confirmation 與核准門檻

| 待確認項目 | 由誰確認 | 最晚時點 | 未確認時的處理 |
| --- | --- | --- | --- |
| 法定／實際資料處理主體、適用法域、法律審閱者 | 品牌負責人提供；其指定法律審閱者審查 | 正式政策核准前 | 留內部草案，正式政策發布驗收記 BLOCKED；不推定法人或套用國別法律承諾 |
| 蒐集欄位、目的、接收者、保存／刪除與跨境 | Owner 與 Task 008／部署服務負責人，法律審閱者核對 | 政策文字核准前；表單或供應商變更後重審 | 禁用尚未核准的新收件／追蹤，不刊登猜測的資料行為 |
| 權利聯絡管道、處理程序與可承諾時限 | Owner 實際驗證，法律審閱者確認 | 公開政策前 | 不新增假 mailto、泛用社群首頁或無效申請按鈕；保留非公開待辦 |
| 核准正文、版本、生效日與更新機制 | Owner 明確接受；法律審閱者對同版本提供審核紀錄 | 解除草案限制前 | 草案不得對外成為有效法律政策；生效日保持 null |
| Task 008 個資功能或 Task 013／014 供應商改變 | 對應任務負責人及 Owner | 該變更發布前 | 重新核對清冊與政策；未核准前維持既有不收件模式，不因聯絡任務已完成而跳過 |

開發啟動時在報告指派實際確認人與日期／期限；本規格不虛構人名或日曆截止日。缺資料可先完成盤點、內部草案、版面及保護測試；法律必要項目不得改成 N/A。

### 6.4 草案與正式版本行為

- 預設 `draft`。開發環境可預覽；若確實需要一般 production 預覽，採 server-only 明確旗標與獨立受控測試環境，不用 `NEXT_PUBLIC_*`。這不是驗證身分或存取控制，不可放未核准正文到可公開的 Preview URL。
- 在核准前，一般公開 production `/privacy` 預設 404；Pages 不輸出草案頁 HTML／payload，Footer 維持「隱私權政策（待確認）」文字。報告明確列法律核准 BLOCKED，不以 404 當作已完成有效政策。
- 同版本正文、主體、資料流、聯絡、版本及真實生效日全部確認後，才可把狀態改為 `approved`、輸出正式 `/privacy`、建立 Footer Link。仍保留全站 `noindex, nofollow`，是否開索引是 Task 010／014 的獨立決策。
- 若 Task 008 需要個資告知連結，必須指向已核准且實際可讀的政策；政策未核准時不得啟用新收件功能。無表單／僅品牌資訊版本可獨立維持運作。

## 7. Design System & Technical Constraints

沿用實際 manifest／lockfile 的 Next.js App Router、React、Strict TypeScript、Tailwind CSS 4、shadcn/ui、Lucide React、Node.js 24.x 與 npm。研究時 Next.js 為 `16.4.6`、React 為 `19.3.1`；執行時核對實際安裝版本與該版 Next.js 文件，不為政策升級套件。

重用 `Container`、`Section`、既有排版與必要的 `Button`／`XkLogo`，Server Components 優先。八個品牌 Tokens、Inter／Noto Sans TC、Radius、Spacing、Focus、Reduced Motion 保留；不另建 legal theme。中文 `SectionHeading` 設 `titleLang="zh-TW"`，不改其英文預設契約。正文建議可讀寬度約 65–75 字元，以實際中文閱讀驗收，不縮小為難讀附註。

Logo 原始 Path／Transform／比例／配色與 Provisional 狀態不變。裝飾 `aria-hidden`；單一 H1、連續 H2／H3、目錄有可及名稱。所有有效操作可用鍵盤，Focus 不被 Header 蓋住；Link 用 Next.js Link，原生 disabled 只用於真正按鈕，不對連結假設可用 disabled。

不引入 Backend、資料庫、Cookie 管理平台、Analytics、追蹤或收件服務。法律文字是內容與審核任務，不是新增蒐集行為的授權。

## 8. Navigation, SEO & Deployment

| 項目 | 明確行為 |
| --- | --- |
| 路由／Footer | 僅核准正式版才將 `/privacy` 設為可公開 implemented，Footer 使用「隱私權政策」真實 Next.js Link；不要求塞入主導覽 |
| 舊錨點／導覽 | 保留首頁、About、Services、既有服務與聯絡錨點，以及執行時已合併的後續頁面 |
| 正式 Title | `隱私權政策 \| Xplore Kaleidoscope`，避免 root template 重複品牌 |
| 正式 Description | `了解 Xplore Kaleidoscope 網站的個人資料處理、第三方服務與隱私權相關資訊。`；核准前只用於非公開草案預覽，不聲稱政策已生效 |
| Canonical／OG URL | 正式版為 `https://xplorekaleidoscope.com/privacy`；OG Title／Description 與頁面一致，locale `zh_TW`；不帶 Pages Base Path、Query 或 Fragment |
| 語言／索引 | HTML `zh-TW`；全部版本保持 `noindex, nofollow`，不新增假 OG Image 或 Organization 法律資訊 |
| 草案產物 | Pages 不公開草案或其 payload；不得只移除 Footer Link 卻留下可公開正文 |
| 核准後 Pages | `out/privacy/index.html`、CSS／JS／字體／icon 與 `/xk-website/privacy/` 可用；正常尾斜線依既有模式驗證 |
| 雙建置 | 保留一般 `npm run build`／`npm run start`；Pages 使用 `npm run build:pages`，靜態產物獨立服務 |
| CI／部署 | 保留 PR quality／pages-build、main-only deploy 與審核條件；本任務不改 Pages Source、DNS 或 Custom Domain |

必要時僅擴充既有 Pages Validator：核准版驗 HTML／Metadata／Base Path，草案版驗頁面與 payload 不外洩；現有頁面、404、`.nojekyll`、noindex 與 `/dev/design-system` 排除不能降低。公開發布前的政策核准與 Git merge／deploy 授權分開；法律核准不等於已授權部署。

## 9. File Structure & Change Scope

下列只授權未來正式執行 Task 009 時的必要實作；本次規格撰寫不建立這些功能檔。

| 動作 | 檔案／位置 | 責任與限制 |
| --- | --- | --- |
| 新增 | `src/app/privacy/page.tsx` | Metadata、狀態保護與語意內容組合，不塞入整個法律流程 |
| 新增 | `src/config/privacy.ts` | 已核准內容、nullable 待確認資料、版本及草案／正式狀態 |
| 視需要新增 | `src/components/sections/privacy/` | 如 `privacy-policy.tsx`／`privacy-toc.tsx`；單純長文不強制拆九個檔或增加 Client |
| 必要修改 | `src/components/layout/site-footer.tsx`、`src/config/navigation.ts` | 只在核准與真實可讀後啟用法律連結，保留其他導覽 |
| 必要擴充 | `scripts/build-github-pages.mjs` | 草案排除／核准版驗證，不放鬆既有斷言 |
| 未來報告 | `docs/reports/task009-implementation.md` | 資料流清冊、來源、核准／阻礙、實際測試、版本與證據；敏感紀錄僅放授權可讀位置 |
| 真實證據 | `docs/screenshots/task009-privacy-*.png` | 本次草案／核准模式清楚標註，不冒充已生效公開政策 |
| 最小文件整合 | 任務索引與必要操作說明 | 保留歷史與原始來源；不改寫前任務結果 |

不得修改文件 Repository、原始 Logo、全域 Tokens、字體、套件／lockfile、workflow、Pages Source、Vercel／DNS 設定。實際必要差異先記錄範圍及理由，不以任意擴充換取通過。不得提交 `.next/`、`out/`、`node_modules/`、暫存工具、Secrets、真實聯絡訊息或個資。

## 10. Implementation Procedure

1. 記錄最新 Base、Git 狀態、路由、套件、Task 008 與部署現況；保留既有工作。
2. 讀第 3 節來源，核對最新版與核准性質，建立資料流清冊與 Pending Confirmation 責任／期限／fallback。
3. 檢查程式、一般 production、Pages、Cookie／Storage／Network 與 Hosting 設定；Owner 補充程式碼看不到的資料處理與供應商資訊。
4. 與 Task 008 負責人確認表單、收件／郵件／反垃圾服務和依賴；無表單時採當前狀態，不開發新的收件系統。
5. 擬定九個區塊的內部草案與清楚型別；未知資料不補值，送同版本內容給 Owner 及法律審閱者核對。
6. 實作語意長文、目錄與草案保護；核准未到位時保持公開 404／Pages 不輸出，先驗可完成的技術範圍。
7. 核准到位後才設定真實生效資訊、正式 route 與 Footer；若未核准，報告法律 gate BLOCKED，不聲稱完整完成。
8. 在最終程式碼執行五個品質指令與第 11 節適用 Browser／Responsive／資料行為／保護回歸；修復後重驗，截圖標明模式。
9. 完成獨立本機報告與版本對照，檢查 diff、敏感資料、內容核准及連結；再依第 13 節 Commit／PR。
10. 遠端 CI、Review、授權 merge、正式部署及公開 Smoke 各別補實際證據，不預填後續階段。

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

### 11.1 品質指令與資料／法律驗收

| ID／項目 | 適用性 | 預期結果與原因 | 狀態 |
| --- | --- | --- | --- |
| P09-C01 `npm ci` | Required | 既有 Node.js 24.x／lockfile 安裝 exit 0，無未授權套件變更；保證重現性 | PENDING |
| P09-C02 `npx tsc --noEmit` | Required | exit 0；nullable 資料、狀態保護及元件 Props 符合 Strict TS | PENDING |
| P09-C03 `npm run lint` | Required | exit 0，符合既有零警告規則 | PENDING |
| P09-C04 `npm run build` | Required | exit 0，保留一般模式；草案不誤成正式公開法律政策 | PENDING |
| P09-C05 `npm run build:pages` | Required | exit 0；草案排除或核准版輸出符合實際狀態，既有斷言未降低 | PENDING |
| P09-D01 資料流清冊 | Required | Source／Runtime／Hosting 與 Task 008 範圍逐項對應；未知有負責人、期限、fallback，不用「無資料庫」推論沒有資料處理 | PENDING |
| P09-D02 蒐集與用途／保存 | Required | 正文與欄位、目的、使用、接收者、保存／刪除、跨境證據一致，無虛構年限或法律承諾 | PENDING |
| P09-D03 第三方／Cookie | Required | 新 Context 實際觀察請求、Cookie、Storage，區分 build 與訪客請求；供應商未確認項不能寫為不存在 | PENDING |
| P09-D04 權利與聯絡 | Required | 聯絡真實可用、程序與可承諾條件經核對；不發布範例信箱、未確認主體／假表單 | PENDING |
| P09-D05 核准 gate | Required | 同版本 Owner／法律審查、實際生效日及內容證據齊備才能正式發布；缺少時記 BLOCKED，不轉為 N/A | PENDING |
| P09-D06 Task 008 收件依賴 | Required | 實際版本與政策一致；無核准政策不新增 PII 收件；未實作表單時仍完成依賴判定 | PENDING |
| P09-D07 新表單／Cookie 同意功能實作 | Not Applicable | 本任務只審查與揭露實際行為，不新增 Contact API、CMP 或假同意控制 | PENDING |

### 11.2 頁面、保護與真實操作

| ID／項目 | 適用性 | 預期結果與原因 | 狀態 |
| --- | --- | --- | --- |
| P09-F01 草案保護 | Required | draft 一般公開 production 404，Pages 無草案 HTML／payload，Footer 未連有效政策；受控預覽有清楚草案標示與 noindex | PENDING |
| P09-F02 核准正式頁 | Required | 核准後一般 `/privacy` 與 Pages `/xk-website/privacy/` HTTP 200，單一 H1、九區塊、版本與真實生效資訊；未核准則此驗收 BLOCKED | PENDING |
| P09-F03 目錄／全部連結 | Required | 九個 ID、鍵盤目錄、Footer、權利管道、站內／跨頁連結與 Base Path 真正可用，不只檢查 href | PENDING |
| P09-F04 既有頁面 Fresh Regression | Required | 首頁、About、Services 與當時已合併頁面 HTTP／主要內容／服務及聯絡錨點正常；未來未合併頁面不強制串行 | PENDING |
| P09-F05 MobileNavigation | Required | aria-expanded／controls、觸控、Escape 還原 Focus、點連結／外部點擊／桌面斷點關閉契約保留 | PENDING |
| P09-F06 Metadata／語言 | Required | Title／Description／Canonical／OG／zh-TW 正確，無假圖／Schema，全部模式 noindex／nofollow | PENDING |
| P09-F07 Console／Runtime／Network | Required | 無非預期錯誤；CSS／JS／字體／icon 與實際資源均成功，數量按本次清冊，不套用舊固定數量 | PENDING |
| P09-F08 Pages／404／`.nojekyll` | Required | 以真正 Base Path 靜態服務驗證；核准頁輸出或草案排除正確、404 文件及 `.nojekyll` 存在，dev 頁／payload 不洩漏 | PENDING |
| P09-F09 一般開發頁保護 | Required | `/dev/design-system` production 預設 404，明確既有預覽旗標才開啟，不改原保護 | PENDING |
| P09-F10 授權後公開 Smoke | Optional | 只在明確核准及部署後實測公開內容／資源／URL，否則保留 PENDING 說明階段，不預填已生效／已部署 | PENDING |

### 11.3 Responsive 與 Accessibility

| ID／項目 | 適用性 | 預期結果與原因 | 狀態 |
| --- | --- | --- | --- |
| P09-R01 320 px | Required | 草案受控預覽／核准頁長文、URL、目錄與 Footer 無水平溢出、裁切或重疊；既有頁面同步回歸 | PENDING |
| P09-R02 375 px | Required | 文字自然換行，目錄／權利聯絡可觸控，手機閱讀順序清楚 | PENDING |
| P09-R03 768 px | Required | 平板目錄、正文與導航間距正常，不出現隱藏但可 Focus 的選單元素 | PENDING |
| P09-R04 1440 px | Required | 桌面長文行寬、層級與頁尾正常，無過度拉伸 | PENDING |
| P09-R05 1920 px | Required | 最大容器寬度與留白正常；所有指定寬度均記錄實際受測頁面與模式 | PENDING |
| P09-A01 axe | Required | 政策預覽／核准頁及受影響既有頁面五種寬度、手機展開選單執行 WCAG 2／2.1 A／AA；記錄工具、範圍、違規，不宣稱完整認證 | PENDING |
| P09-A02 Keyboard／Focus | Required | Skip Link、Tab／Shift+Tab／Enter、目錄、Footer 與權利連結可操作，Focus 可見不被遮；標題及 landmark 正確 | PENDING |
| P09-A03 Reduced Motion／人工視覺 | Required | 偏好 reduce 時過渡符合既有規則；長文、對比、Logo 比例、底部內容及五種寬度實際目視 | PENDING |
| P09-A04 Disabled | Not Applicable | 預設沒有停用控制；如實際引入原生 disabled Button 則改列 Required，驗不可觸發及 Tab 略過，不為測試新增假操作 | PENDING |
| P09-A05 輔助科技補測 | Optional | 可取得螢幕閱讀器時檢查長文／目錄閱讀順序，記錄限制；不以 axe 代替人工結果 | PENDING |

所有矩陣均為未執行的驗收契約。核准前可驗技術與受控草案，不可把草案測試替代核准正式頁、有效政策或真實公開發布。後續程式、Task 008、Hosting 或正文變更後，重跑受影響資料流與必要回歸。

### Test Failure Policy

- `FAIL` 不得標記為 `PASS`，原始失敗與重驗紀錄均須保留。
- 發現問題必須記錄原因、影響範圍及修正方式；可修正的問題應先修正，再重新執行相關測試及必要回歸。
- 無法修正的問題必須列入報告的 Known Issues，註明嚴重程度、交付影響、目前狀態及後續處理方式。
- 存在阻礙交付的 `FAIL` 或必要驗收的 `BLOCKED`，不得宣稱任務完整通過。交付須符合原規格；不適用項目只有在附上理由與依據後才能記為 `N/A`。
- 不得透過跳過測試、降低驗收標準、隱藏錯誤或展示舊成功結果取得 `PASS`。
- 外部服務、權限或環境造成的阻礙，必須記錄實際原因、發生時間、影響測試及解除條件；不得虛構執行結果。

## 12. Test Report & Evidence

未來正式執行時建立 `docs/reports/task009-implementation.md`，目前不建立空報告、不提供不存在檔案的 Markdown Link。至少包含 Repository／status、實際 Base SHA、Feature Branch、讀取來源與 Blob、變更檔、資料流清冊、Pending Confirmation 的確認人／期限／fallback、核准版本及可授權讀取的審閱證據。

每項記錄 PENDING／PASS／FAIL／BLOCKED／N/A 狀態，Required／Optional／Not Applicable 的適用性另列；保留原失敗、修復、影響範圍及最終重驗。報告必須說明草案技術、法律核准、PR／CI、merge、deploy 與生效是否各自完成，法律缺件不得隱藏。

| 真實截圖目標 | 未來證據檔名 | 適用性／說明 | 狀態 |
| --- | --- | --- | --- |
| 1440 px 完整長文 | `docs/screenshots/task009-privacy-desktop.png` | Required；標註 draft／approved 與受測版本 | PENDING |
| 375 px 完整長文 | `docs/screenshots/task009-privacy-mobile.png` | Required；核對目錄、段落、長網址與頁尾 | PENDING |
| 聯絡／版本／頁尾 | `docs/screenshots/task009-privacy-contact-footer.png` | Required；真實模式，不填假管道或生效日 | PENDING |
| 草案保護／法律 gate | 報告內 HTTP／產物掃描／核准證據位置 | Required；不使用截圖冒充授權；必要敏感內容遮蔽 | PENDING |

截圖來自本次實際網站並人工檢視；草案截圖永遠不代表已生效正式政策。已核准頁面尚未能驗證時，正式頁項目維持 BLOCKED，不用草案圖片填 PASS。

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
| Base／Branch | 從最新已合併 `main` 建立 `feature/website-privacy-policy` |
| 建議 Commit | `feat(privacy): add reviewed privacy policy and publication safeguards`；只有確實核准才使用 reviewed，否則以實際 draft 範圍命名 |
| PR Title | `Task 009: XK Privacy Policy`，清楚標明 draft／核准狀態 |
| PR 內容 | 資料流與法律核准界線、版本、未確認清單、修改檔、兩種 build、Browser／Accessibility、真實截圖、Known Issues、實際 CI head |
| 審核 | 本機報告先完成；草案技術 PR 可供審查，但不得用合併草案解鎖正式法律發布或新個資收件 |
| 禁止 | 不直接 Push main、不自動 merge、不自行聯絡第三方法律人員、不發布未核准正文、不變更既有發布流程 |

法律審閱者與 Owner 核准具體正文是內容前置，GitHub Review／CI 只驗程式與提交；兩種審核不能互相替代。本次規格撰寫另依使用者文件交付授權，不代表已執行 Task 009。

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

- 實際來源、資料流清冊、Task 008 依賴檢查、已確認與待確認內容及負責人／期限／fallback。
- 有版本的內部政策草案、同版本 Owner 與法律審查證據；正式版缺件時明確列 BLOCKED，不宣稱完整完成。
- 語意、可讀、Responsive 的 Privacy 頁面與目錄，核准前保護／核准後真實 Footer Link，以及保留既有網站的必要整合。
- 一般／Pages 保護與輸出驗證、全部適用測試及三張真實截圖；敏感核准紀錄僅在授權位置。
- `docs/reports/task009-implementation.md` 的實際結果與版本對照，真實 Commit／PR／CI，法律生效與公開部署分開說明。

## 15. Out of Scope & Future Work

不建立 Contact 表單／API、Backend、資料庫、CMP、Analytics、Authentication、權利申請系統或供應商合約流程；不代替法律審查、不自行確立法域或保證合規認證。Task 008 改動收件、Task 013／014 改 Hosting／網域時，相關資料行為與政策需另行更新並重審。

正式聯絡與法定資訊、保存期限、最終法律正文、生效日與審閱者均為 Pending Confirmation，依第 6.3 節取得確認。未取得不刪除待辦、不編造內容、不把必要核准轉為 N/A。正式開索引與 Search Console 屬 Task 010／014；本任務不修改 DNS 或發布授權。

## 16. Final Delivery Checklist

以下為未來功能任務的初始清單；目前全部 PENDING，文件撰寫不代填任何功能或法律結果。

執行狀態依第 11 節統一使用 `PENDING`、`PASS`、`FAIL`、`BLOCKED`、`N/A`。僅有證據的 `PASS` 可勾選；其餘保持未勾選，`N/A` 附判定理由且不視為缺少適用驗收。必要項目仍為 `PENDING`、`FAIL` 或 `BLOCKED` 時，不得宣稱完整通過。以下是規格初始清單，本輪文件修訂不代填功能結果。

- [ ] PENDING — 已核對最新 main、remote、status、Base SHA 與 Task 008 實際版本，保留使用者工作。
- [ ] PENDING — 已讀重要來源並記錄 Commit／Blob、來源核准界線與實際採用。
- [ ] PENDING — 資料流清冊涵蓋欄位、來源、目的、使用、供應商、保存／刪除、Cookie／Storage 與證據。
- [ ] PENDING — Pending Confirmation 已指定確認人、期限及未確認 fallback，沒有虛構主體、期限或法定承諾。
- [ ] PENDING — 正式版本已取得同版本 Owner／法律審查、真實權利管道及生效資訊；未核准時正確報告 BLOCKED。
- [ ] PENDING — 草案非公開、一般 production 預設 404、Pages 不含草案正文或 payload，未以草案代替有效政策。
- [ ] PENDING — 核准版 `/privacy` 九個區塊、目錄、版本、Footer 及真實權利聯絡完整可用。
- [ ] PENDING — Task 008 告知／收件依賴一致，未核准時沒有新增個資收件或假同意控制。
- [ ] PENDING — TypeScript、ESLint、npm ci、一般 Build 與 Pages Build 實際執行並記錄 Exit Code。
- [ ] PENDING — 首頁、About、Services 與當時已合併頁面 Fresh Regression、全部有效連結及錨點完成。
- [ ] PENDING — 五種指定寬度 320／375／768／1440／1920 px、長文閱讀與目錄均經實際驗收。
- [ ] PENDING — axe、Keyboard／Focus、Reduced Motion、人工視覺及適用 Disabled 檢查完成且限制如實記錄。
- [ ] PENDING — Console／Runtime／Network、HTTP、真實靜態資源、Base Path、404、`.nojekyll` 與 dev 排除正常。
- [ ] PENDING — Metadata、HTML 語言、品牌 Canonical／OG 與 noindex／nofollow 正確，無假圖或法律 Schema。
- [ ] PENDING — 三張真實截圖已人工檢視並標記草案／核准模式，沒有冒充正式發布。
- [ ] PENDING — 獨立報告已完成，敏感內容未提交，版本、核准、法律生效及發布階段明確分開。
- [ ] PENDING — Git diff、修改範圍、Feature Commit、PR 與實際 CI 證據完整，未直接 Push main 或擅自發布。
- [ ] PENDING — Test Failure Policy 已遵守，失敗、阻礙與 Known Issues 有完整記錄，沒有阻礙交付的未解決必要驗收。
- [ ] PENDING — 每項測試的 Test ID、預期／實際結果、狀態與可追溯證據已記錄，沒有以預期或舊結果代填。
- [ ] PENDING — 獨立報告已在 PR 建立前完成並納入同一 PR，最後測試、後續重驗與實際提交的程式碼一致。
- [ ] PENDING — 本機、Feature Commit、PR CI、PR Review、合併授權、main CI、部署與公開 URL 驗證分別記錄；未發生階段維持 PENDING 並說明，沒有冒稱已發布。
