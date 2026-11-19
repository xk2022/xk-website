# Task 008 — Contact 聯絡我們

## 1. Task Overview

建立 `/contact` 聯絡我們頁，讓訪客了解應準備的需求資訊與**實際可用且經確認**的聯絡管道。不得因任務名稱是 Contact，就假設已有信箱、電話、表單服務或收件 Backend。

研究快照的 `src/config/contact.ts` 中 `verifiedContactChannels` 是空陣列，網站沒有 form／submit API。本規格預設交付誠實的靜態聯絡資訊頁，支援「尚無公開管道」與「已確認管道」兩種資料狀態；不新增假表單／假送出。表單只在第 6 節條件與額外授權全部滿足後才能納入，不能用規格裡的條件段落作為啟用授權。

本輪只製作規格，不實作、不建立報告或測試結果；以下全部初始 `PENDING`，正式功能工作須另行明確授權。

| 項目 | 規格 |
| --- | --- |
| 品牌／語言 | Xplore Kaleidoscope（XK）／`zh-TW` |
| 品牌標語 | Explore Possibilities. Create Digital Value. |
| 技術標語 | Building Digital Solutions with Web, Java & AI. |
| 正式路由 | `/contact` |
| 預設功能 | 靜態資訊、已確認管道清單或誠實的空狀態、需求準備、真實站內 CTA |
| 獨立未來報告 | `docs/reports/task008-implementation.md`；目前不存在，不建立假連結 |

## 2. Repository & Prerequisites

| 項目 | 要求 |
| --- | --- |
| Website Repository | `xk2022/xk-website`，唯一可修改的 Repository |
| Base Branch／研究快照 | 正式開發時最新已合併 `main`；本輪研究 Website `e2a8f5a33f24d1ea65a3afc3780014a33c204528` 不是固定未來 Base |
| Feature Branch | `feature/website-contact-page` |
| 文件來源 | `xk2022/xplore-kaleidoscope`，`main@95ef1275a46ace76e11f668178ca881087483398`，僅供讀取 |
| 必要前置 | 已合併 Task 001–005、現有 Header／Footer／Mobile Navigation、Design System、一般／Pages 雙模式 |
| 平行關係 | 006／007／008 可在共同前提成立後平行；不把其他未審分支整合進來 |
| Task 009 協作 | 無表單的資訊頁可與 Privacy 並行；有資料收集時，資料契約與法律告知必須先完成核對與核准 |

重新檢查 remote、branch、Working Tree、最新 main／前置合併、實際已存在路由、聯絡設定、外部服務與部署狀態，保留使用者修改。不以先前首頁的 pending 文字或文件建議信箱推定管道已可用。

無確認信箱不阻擋預設靜態 fallback 的開發；但「客戶需求已可收件」是另一項能力，未具備時必須記為未就緒／依必要性 `BLOCKED`，不能用資訊頁 HTTP 200 冒稱端到端聯絡完成。

## 3. Reference Documents

閱讀 [AGENTS.md](../../AGENTS.md)、[README.md](../../README.md)、[Task 001](task001.md)、[Task 002](task002.md)、[Task 003](task003.md)、[Task 004](task004.md)、[Task 005](task005.md)、[歷史紀錄](../implementation-notes.md)、[品牌系統](../reports/brand-design-system.md)、[首頁](../reports/homepage-implementation.md)、[About](../reports/about-implementation.md)、[Services](../reports/services-implementation.md) 與 [Pages 指南](../reports/github-pages-deployment.md)。已刪的替代原稿只依既有歷史快照追溯，不復原或產生失效相對連結。

必看 `src/config/contact.ts`（目前空）、`navigation.ts`（contact 入口目前 `/#contact`）、`services.ts`、`site.ts`、Header／Footer／Mobile Navigation、`HomeContactCta`、各頁 CTA、scripts 與 workflow。應用未寫 Analytics／表單，不表示託管供應商不保留存取紀錄，不能寫「完全不蒐集資料」之類法律承諾。

下表均來自文件 Repository `xk2022/xplore-kaleidoscope`、branch `main`、固定 Commit `95ef1275a46ace76e11f668178ca881087483398`；來源核准狀態為業務或技術規劃，**沒有正式管道、收件服務或法律核准證據**。正式執行再查最新 Commit／Blob 與差異，不直接沿用規劃 schema。

| ID | 固定版本來源 | Git Blob SHA | 本次採用／核准狀態 |
| --- | --- | --- | --- |
| C01 | [doc/01_business-plan/week-01/05_customer-development.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-01/05_customer-development.md) | `8cf9ca6d6111c6031202944ff4b8f345b75f3c22` | §3／5／10：需求與 Discovery 準備；沒有正式收件 URL，客戶／營收 KPI 不採用。 |
| C02 | [doc/01_business-plan/week-02/07_domain-hosting_網域、DNS、主機與部署架構規劃.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-02/07_domain-hosting_%E7%B6%B2%E5%9F%9F%E3%80%81DNS%E3%80%81%E4%B8%BB%E6%A9%9F%E8%88%87%E9%83%A8%E7%BD%B2%E6%9E%B6%E6%A7%8B%E8%A6%8F%E5%8A%83.md) | `9c1c5c8177c423bacaa97b5199a22430ddf6bc2c` | §12「建議電子郵件」；contact@／hello@ 皆未證實啟用，不作正式聯絡管道。 |
| C03 | [doc/01_business-plan/week-02/08_website-architecture_官方網站 Next.js 技術架構設計.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-02/08_website-architecture_%E5%AE%98%E6%96%B9%E7%B6%B2%E7%AB%99%20Next.js%20%E6%8A%80%E8%A1%93%E6%9E%B6%E6%A7%8B%E8%A8%AD%E8%A8%88.md) | `15c1483bf47be33bc29b755a220fb465b5dd8a1a` | §11–12：輸入驗證、錯誤、反 spam／隱私原則；Spring Boot／API／表單是舊規劃，非本次已授權架構。 |
| C04 | [doc/01_business-plan/week-02/09_website-mvp_官方網站 MVP 開發規格.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-02/09_website-mvp_%E5%AE%98%E6%96%B9%E7%B6%B2%E7%AB%99%20MVP%20%E9%96%8B%E7%99%BC%E8%A6%8F%E6%A0%BC.md) | `5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d` | §8：候選欄位與收件流程；預算選項／API 範例／同意欄位未經本任務資料與法律核准。 |
| C05 | [doc/01_business-plan/week-03/02_case-01-corporate-website.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-03/02_case-01-corporate-website.md) | `c9b151d01a7616abb939dd9747d704428d0bdd8c` | §9／17：另一份表單欄位、前後端驗證、送出／成功失敗與資料安全；是示範計畫，未有正式端點。 |
| C06 | [doc/01_business-plan/week-01/02_service-catalog.md](https://github.com/xk2022/xplore-kaleidoscope/blob/95ef1275a46ace76e11f668178ca881087483398/doc/01_business-plan/week-01/02_service-catalog.md) | `cc1c2bacbc1f5367667005a9d4a3b288fc8cfd0c` | 可詢問的服務背景；不發布價格、固定工期、回應時限或虛構服務成果。 |

C04 含預算／專案描述，C05 另有 Subject 與 Message；不可把兩份加起來當成已核准資料收集清單。既有網站與最新明確指示優先於舊 monorepo／Vercel＋Spring Boot／PostgreSQL 方案、範例 API 與 Email。本任務不為舊方案重建 Backend。

## 4. Scope & Requirements

### 4.1 預設正式範圍

完成獨立 Contact 頁、需求準備與合作說明、共用導覽、已驗證管道或無管道 fallback、Metadata、Responsive、Accessibility、Pages 匯出、回歸與真實報告。公開入口不得假裝有表單或已能收到訊息。

- 管道仍空：顯示「正式聯絡管道確認中」，提供 Services／About／首頁等真實連結，無輸入欄位、提交按鈕、mailto、電話、地圖或社群假連結。
- 已確認管道：只從 `verifiedContactChannels` 顯示擁有人准許公開且經核對的目標。只確認地址字串不等於確認收件或帳號控制權。
- 額外核准表單：必須先完成第 6.3 節決策、Task 009 協作與新範圍確認，才可實作對應真實前端整合；未滿足時不放 Loading／Success 示意控制，不新增 API。

### 4.2 交付與阻塞判斷

預設資訊頁可完成技術 PR 並明列收件能力未就緒；不能因沒有信箱自行選第三方或補 Email。若當次使用者將「可送出並實際收到需求」列為必要交付，缺少確認管道／接收服務時該必要項目為 `BLOCKED`，列出解除條件，不宣稱 Task 已完整通過。

不擴大為 CRM、郵件平台、客服聊天、預約、附件上傳、會員、付款、Newsletter、Analytics 或 Backend；不承諾免費諮詢、回覆時限、價格、SLA 或服務成果。

## 5. Information Architecture & UX

預設頁面有六個主 Section；只有正式採用且核准的表單模式才另外加入 `contact-form`，不能在無表單模式渲染假控制。

| 順序／ID | 元件與內容 |
| --- | --- |
| 1 `contact-hero` | ContactHero；唯一 H1「從理解需求，開始探索合作可能。」、英文 Contact XK、品牌與技術標語；CTA 至 `#contact-channels` 與 `/services` |
| 2 `contact-channels` | ContactChannels；已確認可用管道，或明確且可讀的空狀態與替代導覽 |
| 3 `contact-preparation` | ContactPreparation；商業目標、現有系統／限制、需要討論範圍三項準備，提醒不分享帳密或敏感資料 |
| 4 `contact-process` | ContactProcess；整理需求→確認可用管道→依個別情況討論下一步，不虛構已收到或固定回覆時間 |
| 5 `contact-data-note` | ContactDataNote；依實際模式說明未提供線上收集或已核准管道的必要注意事項；Privacy 未實作時不做死連結 |
| 6 `contact-next-step` | ContactCta；「先了解適合的技術服務。」；`/services`、`/about`、`/` 真實連結 |

英文標題顯示 `Contact XK`，不在資料未確認時使用「立即寄出」「預約會議」「24 小時回覆」。空狀態說明「目前尚未提供可公開的正式聯絡管道；可先了解服務與品牌，後續依確認資訊更新。」不得把空狀態的 CTA 包成可提交外觀。

整頁使用既有 Header／Footer，區塊 H2、內部項目 H3；手機按閱讀順序直排、管道文字可換行、Email 不壓縮或超出容器。連結有明確名稱，外部開新視窗時適當告知並使用安全 rel。沒有管道時不顯示 disabled 的假聯絡按鈕。

## 6. Content & Data Specification

### 6.1 集中設定與確認來源

`src/config/contact.ts` 的 `verifiedContactChannels` 仍是唯一公開管道來源，保留既有 ContactChannel API 及首頁消費相容性。地址、電話、URL 不從散落文案猜測；本範圍優先沿用既有 mailto／https 類型，未另確認不擴大為電話／地址／地圖。

新增 `src/config/contact-page.ts`，明確定義 `ContactPageContent`、`ContactAvailability`（`unavailable` 或 `channels-only`）、需求準備、流程、資料注意及 CTA。Availability 由實際可公開管道派生，不以手動 true 掩蓋空陣列。所有字串／服務名稱集中管理，服務對應重用現有 `ServiceId` 與 `serviceCategories`。

每個擬公開管道須在實作報告有 PublicationRecord：目標與用途、擁有人／品牌確認證據、收件或控制權驗證日期與結果、允許公開範圍、資料處理對應、何時重驗。不把內部核准人資料或機密放到公開 UI；設定沒有證據時維持空。

### 6.2 管道啟用 Gate

| Gate | 必須確認 | 未完成時 |
| --- | --- | --- |
| 內容與控制權 | 品牌 owner 核准公開 Email／品牌頁 URL；實際帳號控制、用途、收件者與管理責任明確 | 空清單／不渲染該管道，Pending Confirmation |
| Email 可用性 | owner 提供已完成的受控寄收驗證，或另明確授權對指定自有測試收件匣驗證；不能由 mailto 格式或 MX 存在推定可收件 | 不寫已可收件；不得擅自寄外部信件 |
| 外部品牌頁 | 精確品牌頁可訪問且 owner 確認歸屬，不用通用 LinkedIn 首頁／平台首頁 | 不提供外部社群連結 |
| 資料與告知 | owner 及 Task 009 審查者確認該管道會接收哪些資料、用途、服務商與告知責任 | 不自行發表保存天數、法律主體或不蒐集承諾；新收集行為暫緩 |

`mailto` 點擊只可證明開啟使用者郵件軟體，不能當作已送出或已送達測試。網站不代填訪客敏感資料進 URL、query、localStorage 或 Console。

### 6.3 條件式表單：未授權時不實作

來源的表單是候選需求，不是現在的產品能力。下列決策須全部可查、由 owner／服務管理者／Task 009 法律審查者核准，且使用者另外明確授權此整合後才開始；預設模式不等待它、也不啟用它。

| 決策 | 所需內容／責任者／時點 | 未確認 fallback |
| --- | --- | --- |
| 表單交付方式 | owner 於開發前確認是否真的需要表單、收件責任者、成功定義、允許測試接收者及部署位置 | no-form；若被列為必要交付，送出驗收 BLOCKED |
| 端點／第三方 | owner 與服務管理者提供實際 HTTPS endpoint、帳號授權、請求／回應與錯誤契約、CORS／來源限制、費用、provider 範圍 | 不選 vendor、不建 Backend／Route Handler／Server Action／proxy，不新增假 URL |
| 欄位與前端驗證 | owner 與 Task 009 確認必要欄位、必填性、逐欄 min／max 長度、Email 格式、服務選項、同意／告知文案及錯誤 schema | 不把 C04／C05 兩份聯集當正式欄位，不預設預算／電話／敏感附件 |
| 反垃圾訊息 | 接收服務管理者確認服務端驗證、rate-limit、濫用偵測、錯誤與恢復方式；額外 challenge／CAPTCHA 須先核准可及性、第三方與隱私影響 | 不安裝 tracking／CAPTCHA 或承諾零 spam；只有前端驗證不算防濫用完成 |
| 個資處理 | Task 009 共同確認處理主體、目的／合法基礎、收集項目、服務商／地區、保存／刪除、權利入口與必要告知 | 收集啟用 BLOCKED；不編法條保證／保存天數；不假連尚未存在的 Privacy 頁 |

條件成立後的前端行為契約：

1. 依核准 schema 提供 label、適當 input type／autocomplete、必填提示、Email 格式與長度驗證；使用 trim 處理空白，錯誤與欄位關聯，錯誤摘要可由鍵盤到達，不只以顏色表示。
2. 狀態為 `idle`→`validating`→`submitting`→`success` 或 `error`；只在真實請求期間停用原生 submit 並呈現 `aria-busy`／狀態文字，防止重複送出。只用已核准的外部接收服務，不在 Pages 建立伺服器 API。
3. 依實際 HTTP 與 response contract 判斷接受／拒絕；測試 4xx／429／5xx／timeout／offline，不因 response 存在就判成功，不重複自動寄信或無界重試。
4. Success 只表示已確認服務實際接受的結果，不能擴大為收件者已閱讀或承諾回覆時限；若交付要求實際收件，須有授權的受控端到端收件證據。不得 mock 成功冒充真實送達。
5. Failure 保留可安全重試的必要輸入、顯示可理解錯誤與下一步；未成功不清空輸入假裝完成。成功與失敗分別使用適當 live region／focus，修正後可重新提交。
6. 個資不寫 query、公開 log、analytics 或持久瀏覽器儲存；沒有核准需求不收附件／敏感資料。任何 Secret 留在接收服務，不使用公開 `NEXT_PUBLIC_` 裝私鑰；可公開 site key 也需核准。
7. 本機可用可控 fixture 測驗證與各錯誤狀態，報告明標 mock；正式收件另以 owner 核准的測試資料／收件者驗收，未授權不得向外部發信。關閉測試模式後重驗實際提交版本。

### 6.4 Pending Confirmation

| 項目 | 誰／何時 | 不確認時 |
| --- | --- | --- |
| 正式 Email 或品牌 URL | 品牌 owner；公開設定及 CTA 啟用前 | verifiedContactChannels 維持空，fallback 資訊頁，不假 mailto |
| 是否要求實際收件／表單 | owner；正式實作範圍定案前 | 沿用本規格預設 no-form；另要求的送出能力列 BLOCKED 而非 PASS |
| 表單 schema／端點／反 spam／帳號／測試收件 | owner 與服務管理者；表單開發或網路提交前 | 不選服務或實作，待明確授權與完整契約 |
| 個資主體／用途／保存／刪除／第三方／權利 | owner 與法律審查者；Task 009 定稿及任何新資料收集前 | Privacy 可與 Contact 設計平行；未核准先不收集 |
| 回覆與營業時間／電話／地址 | owner；對外文字前 | 不公布，不擅自寫 24/7／一天內回覆 |

## 7. Design System & Technical Constraints

保留已合併 Next.js App Router、React、Strict TypeScript、Tailwind CSS 4、shadcn/ui、Lucide、Node.js／npm 與現有依賴；不升降級、不重建、不改 lockfile。使用 Server Components 呈現資訊，沿用既有 Mobile Navigation；只有另授權的真實表單互動才考慮 Client Component，不為空狀態加互動框架。

重用 Section、Container、Button、Card、SectionHeading、XkLogo 與 BrandPattern、Inter／Noto Sans TC、Typography Utilities、Focus 及 Reduced Motion。中文 SectionHeading 明確 `titleLang="zh-TW"`，單一 H1、合理 H2／H3、語意 Landmarks、裝飾 aria-hidden。八個 UI 色值仍為 `#101A33`／`#3157D5`／`#19B8D5`／`#FFFFFF`／`#F5F7FB`／`#172033`／`#667085`／`#E4E8F0`，不重畫暫定 Logo 或建立平行樣式。

維持 GitHub Pages 獨立靜態網站；不新增 Backend、API、Server Actions、Authentication、Analytics、第三方 Script 或新 npm Dependencies。表單服務未核准前不得修改此限制；即使未來核准外部收件，網站本身仍不建立 API 伺服器，架構例外須另行授權與修訂規格。

## 8. Navigation, SEO & Deployment

將共用 `contactNavigation.href` 改為 `/contact`，`plannedRoutes` 中 `/contact` 設 implemented，Header CTA／Footer／Mobile Navigation 共用同一來源。保留 `/#contact` 及 `HomeContactCta` 既有 pending／已確認顯示；可加單一「查看聯絡資訊」Next Link 至 `/contact`，不刪除舊錨點或強制改寫所有 About／Services CTA。

不得假設 Task 006／007／009 已完成；只連到當次 main 實際存在頁面。Privacy 未發布時不做 `/privacy` 假連結；資料告知不完整時不啟用收集，不能用連到空 Privacy 頁滿足同意要求。

| Metadata | 固定內容 |
| --- | --- |
| Title／OG Title | `聯絡我們 \| Xplore Kaleidoscope`，absolute 防止 root 模板重複 |
| Description／OG Description | `了解如何與 Xplore Kaleidoscope（XK）討論網站、Java 企業系統、系統整合與 AI 應用需求，查看已確認的聯絡資訊與合作準備事項。` |
| Canonical／OG URL | `https://xplorekaleidoscope.com/contact`；品牌 Origin，不含 Pages 子目錄、query 或 fragment |
| Locale／Language | OG `zh_TW`，HTML `zh-TW` |
| Indexing／Image | 保留 `noindex, nofollow`；無核准 OG Image 不建路徑，不造 Review／Rating／Organization 聯絡資料 Schema |

保留一般 build 與 `npm run build:pages`、條件 export、trailingSlash 及 `/xk-website`。必有 `out/contact/index.html`；Metadata 可依 trailingSlash 正常化單一斜線。Next Link 處理站內 Base Path，所有 CSS／JS／字體／icon／已用圖片路徑正常。

僅擴充既有 Pages validator 驗證 Contact 及所有已合併頁，不降低 404／.nojekyll／dev route payload 排除。不得修改 workflow、Pages Source、Environment 條件、DNS 或 Custom Domain，不切換 Vercel、不開索引。PR deploy 須 skipped，不發布未審分支。

## 9. File Structure & Change Scope

本表只描述未來正式開發可評估的異動；本輪不建立 src、public、報告或截圖。

| 動作 | 檔案／範圍 | 責任與限制 |
| --- | --- | --- |
| 新增 | `src/app/contact/page.tsx` | Metadata 與預設六區塊組合 |
| 新增 | `src/config/contact-page.ts` | 有型別的文案／準備事項／流程與 derived availability |
| 必要修改 | `src/config/contact.ts` | 只在 Gate 通過時加入真實核准管道，保留既有 API；不硬填建議 Email |
| 新增 | `src/components/sections/contact/` | hero、channels、preparation、process、data-note、cta，Server Components 優先 |
| 必要修改 | `src/config/navigation.ts`、`src/components/sections/home-contact-cta.tsx` | 正式 Contact 入口及可用的首頁動線，保留原錨點與空狀態 |
| 必要擴充 | `scripts/build-github-pages.mjs` | Contact 產物／Metadata／Base Path 與既有保護 |
| 正式開發文件 | `README.md`、`AGENTS.md`、`docs/implementation-notes.md` | 實作時才更新／追加，不改寫歷史 |
| 未來新增 | `docs/reports/task008-implementation.md`、`docs/screenshots/task008-*.png` | 真實報告及所選模式的證據 |
| 額外授權後才評估 | Contact form 元件／schema／外部接收整合 | 先修訂範圍與契約，不自動生成、不建立 Route Handler 或 API |

不可修改 Dependencies／lockfile／Next 或 Tailwind 設定／workflow／其他 Repository／DNS／Vercel／法定公司資料。不能提交 `.next/`、`out/`、環境 Secret、訪客輸入、測試收件資料或暫存套件。完整 Diff 才是最後實際檔案清單。

## 10. Implementation Procedure

1. 確認功能授權、最新 main 與前置成果，保留工作目錄；完整讀來源、現有 Contact 設定、所有已存在路由及 Task 009 相關資料決策。
2. 記錄 activeMode 及管道證據；空設定走本規格既定 fallback，不因缺信箱就改業務或強加表單。若使用者要求必須可收件但資料缺漏，記 BLOCKED 及 owner／解除條件。
3. 從最新已合併 main 建立 `feature/website-contact-page`，實作預設六區塊、typed config、導航、既有首頁相容與 Pages 驗證。條件式表單只有另外明確授權後才開始。
4. 最終程式碼完成後執行：

   ```sh
   npm ci
   npx tsc --noEmit
   npm run lint
   npm run build
   npm run start -- --hostname 127.0.0.1 --port 3050
   ```

   驗證 `/contact` 與所有已存在頁 HTTP 200／Metadata／有效導覽；未知路由與預設 dev 頁 404，查無表單模式不發出收件請求。停止一般 server 後：

   ```sh
   npm run build:pages
   contact_preview_dir=$(mktemp -d /tmp/xk-contact-preview.XXXXXX)
   mkdir -p "$contact_preview_dir/xk-website"
   cp -R out/. "$contact_preview_dir/xk-website/"
   python3 -m http.server 3051 --bind 127.0.0.1 --directory "$contact_preview_dir"
   ```

   使用未佔用埠，檢查 `/xk-website/contact/`、所有既有頁、錨點、Metadata、資源與 404 產物；兩種 build 共用 `.next/`，重測一般 server 須重做一般 build。

5. 執行下列適用檢查、人工視覺及截圖，修正問題／重驗最終版本；表單 mock 只作狀態測試，真實送達證據不可替代。
6. PR 前完成獨立報告與本機證據，核對 Diff／秘密／來源、Commit 及 Push 功能分支、建立待審 PR，確認本次 head CI／artifact；不合併或發布。

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

### Contact Acceptance Matrix

判斷 activeMode 後記錄適用性。所有初始狀態 PENDING；表單未授權是範圍不適用，不是已完成或假成功。若表單／收件另被列為必要交付卻因服務未具備而無法驗收，該必要驗收記 BLOCKED，不能改成 N/A。

| Test ID | 適用性 | 標準／原因 | 狀態 |
| --- | --- | --- | --- |
| C08-Q01 | Required | `npm ci` exit 0，既有版本／lockfile 未意外修改；確保可重現。 | PENDING |
| C08-Q02 | Required | `npx tsc --noEmit` exit 0；derived mode、資料型別與既有消費者相容。 | PENDING |
| C08-Q03 | Required | `npm run lint` exit 0，依既有零警告規則。 | PENDING |
| C08-Q04 | Required | `npm run build` exit 0，一般 production server Contact 與既有頁正常。 | PENDING |
| C08-Q05 | Required | `npm run build:pages` exit 0，Contact 與全部已合併頁匯出／validators 通過。 | PENDING |
| C08-F01 | Required | 預設六 Section、指定 H1、三個準備項目與合作說明、真實 CTA；沒有假表單／Email／電話／地圖。 | PENDING |
| C08-F02 | Required | 空 channels 時 unavailable 文字及 Services／About／首頁連結可用，無 input／submit／mailto／POST。不能以本項 PASS 冒稱可收件。 | PENDING |
| C08-F03 | Required（有核准渠道時）／Not Applicable（未採用時） | 每個公開 Email／URL 有 owner 與可用性證據、無 generic LinkedIn；mailto 只驗開啟 draft，送達另按授權證據。 | PENDING |
| C08-F04 | Required | Header／Footer／Mobile 同源指向 `/contact`，首頁 `#contact` 仍可用，全部既存頁的鏈結與錨點 HTTP／target ID／Base Path 實際可用。 | PENDING |
| C08-F05 | Required | 接收能力與頁面能力分欄：未有確認管道／必要接收服務時如實未就緒；必要收件驗收 BLOCKED 不可宣稱端到端通過。 | PENDING |
| C08-P01 | Required | 實際資料盤點及 Task 009 協作確認：無表單模式不新增個資提交／儲存，不聲稱 hosting 無 log；Privacy 路由未實作時無死連結。 | PENDING |
| C08-T01 | Required（另授權 form 時）／Not Applicable（預設） | contract 欄位／必填／長度／Email／service／同意驗證，空白與邊界失敗、label／欄位錯誤／摘要／focus 可操作；未核准 contract 則不啟 form。 | PENDING |
| C08-T02 | Required（另授權 form 時）／Not Applicable（預設） | idle／submitting／success／error、aria-busy、真實 disabled 與重複送出防護；沒有假 success。 | PENDING |
| C08-T03 | Required（另授權 form 時）／Not Applicable（預設） | provider 接受／拒絕、4xx／429／5xx／timeout／offline、人工重試與輸入保留；mock 與真實收件結果分開。 | PENDING |
| C08-T04 | Required（另授權 form 時）／Not Applicable（預設） | approved provider 服務端驗證／rate-limit／反 spam／secret／HTTPS／合法 origin 與資料處理契約有證據；沒有前端私鑰或未核准第三方請求。 | PENDING |
| C08-T05 | Required（使用者另要求收件時） | 只對明確授權自有測試收件者完成受控端到端收件；沒有服務／權限則 BLOCKED，不擅自發外部信、不以 mock 當送達。 | PENDING |
| C08-R01 | Required | Contact 及所有實際已合併路由×320／375／768／1440／1920 px。基準 3 舊頁+Contact 至少 20 案例；若 Solutions／Portfolio 等已存在一併加入，記錄實際 N × 5。 | PENDING |
| C08-R02 | Required | 五種指定寬度的長 Email／字串可換行、CTA／卡片／Logo 無裁切溢出；375 px 觸控操作選單與真實連結，不依賴 Hover。 | PENDING |
| C08-A01 | Required | 上述頁面與五種指定寬度、Contact 手機展開選單 axe WCAG 2／2.1 A／AA，並人工檢查 heading／alt／對比／可及名稱。 | PENDING |
| C08-A02 | Required | Tab／Shift+Tab／Enter、Skip Link、visible Focus、Escape 還焦、連結／外部點擊／桌面斷點關閉選單；表單條件成立時含 label／error／live region。 | PENDING |
| C08-A03 | Required | Reduced Motion 過渡依原規則 0s、無動畫依賴；disabled 無實際操作時 N/A，不造假控制。 | PENDING |
| C08-B01 | Required | 無未處理 Console／Runtime／Network 錯誤；CSS／JS／字體／icon／已用圖片 200；預期 404 獨立記錄，無 form 時無提交網路請求。 | PENDING |
| C08-S01 | Required | Title／Description／Canonical／OG／語言／noindex 正確，無 fake OG／Schema 或未確認聯絡資訊。 | PENDING |
| C08-G01 | Required | `out/contact/index.html`、所有既有頁、Base Path／引用資源、`404.html`、`.nojekyll`、dev route 及 payload 排除／validators 通過。 | PENDING |
| C08-CI01 | Required | 本次 PR head quality／pages-build 成功、deploy skipped；artifact 含 Contact 與全部既有頁，不引用文件 CI 當功能驗收。 | PENDING |
| C08-O01 | Optional | 有實際設備／工具時補其他瀏覽器或螢幕閱讀器；記錄範圍限制，不替代指定 QA 或宣稱完整認證。 | PENDING |
| C08-X01 | Not Applicable | 不驗 Backend／DB／CRM／會員／Analytics 等被排除功能，不能為測試而開發。 | PENDING |

### Test Failure Policy

- `FAIL` 不得標記為 `PASS`，原始失敗與重驗紀錄均須保留。
- 發現問題必須記錄原因、影響範圍及修正方式；可修正的問題應先修正，再重新執行相關測試及必要回歸。
- 無法修正的問題必須列入報告的 Known Issues，註明嚴重程度、交付影響、目前狀態及後續處理方式。
- 存在阻礙交付的 `FAIL` 或必要驗收的 `BLOCKED`，不得宣稱任務完整通過。交付須符合原規格；不適用項目只有在附上理由與依據後才能記為 `N/A`。
- 不得透過跳過測試、降低驗收標準、隱藏錯誤或展示舊成功結果取得 `PASS`。
- 外部服務、權限或環境造成的阻礙，必須記錄實際原因、發生時間、影響測試及解除條件；不得虛構執行結果。

## 12. Test Report & Evidence

正式執行後的獨立報告為 `docs/reports/task008-implementation.md`，目前不建檔。記錄 Base／branch／實際修改、activeMode、verified channels 及核准證據、必要收件能力是否受阻、Task 009 協作、資料流／第三方盤點、每項指令／Exit Code／環境與預期／實際結果、錯誤修復與版本重驗、CI／artifact／部署狀態。

### Contact Screenshot Evidence

| 檔名（置於 docs/screenshots/） | 寬度／內容 |
| --- | --- |
| `task008-contact-desktop.png` | 1440 px，完整頁面與實際 activeMode |
| `task008-contact-mobile.png` | 375 px，完整頁面與真實空狀態或核准管道 |
| `task008-contact-channels.png` | 1440 px，channels／fallback 區塊，不能用假 Email 補圖 |
| `task008-contact-preparation.png` | 1440 px，準備事項與合作說明 |
| `task008-contact-data-note.png` | 1440 px，依實際模式的資料注意與有效導覽 |
| `task008-contact-mobile-navigation.png` | 375 px，展開選單與 Contact 入口 |
| `task008-contact-footer.png` | 1440 px，頁尾有效導覽 |

若另核准表單，額外提供驗證錯誤、真實 submitting、經確認 success 與 failure 圖；使用明確標示的合成測試資料，不暴露個資或把 mock 當收件證據。無表單時這些條件圖為 N/A 並記錄原因，原七張頁面 QA 截圖仍 Required。

所有截圖記錄 PNG 實際尺寸、Viewport、取景與人工結果；檢查 320／375 px 長字串、Logo、Focus 與空狀態完整。報告中的個資／收件證據採最小化與遮罩，不提交原始訪客資料或信箱 Secret。

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

| 項目 | 未來正式交付 |
| --- | --- |
| Branch | `feature/website-contact-page`，從當次最新已合併 main 建立 |
| Commit 建議 | `feat(contact): implement XK contact information page` |
| PR | main ← feature/website-contact-page，附 activeMode、未確認事項、測試、真實圖、來源與資料／服務邊界 |

PR 前獨立報告與本機驗收需完成，後續 CI／Review／merge／公開結果未發生就保持 PENDING。完整 Diff 不得含訪客資料、Secret、未授權表單／服務或 build 產物；不得直接 Push main、不自動合併或發布，不把舊 Task 的合併許可推定成本 Task 的發布許可。

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

預設正式交付為真實可瀏覽的 Contact 資訊頁、六 Section 及誠實 activeMode、集中 typed content 與已確認管道 Gate、共用導覽／首頁錨點相容、Metadata 與 Pages 匯出、全部實測報告與七張真實截圖、完整檔案清單、Feature Commit／PR／該 head CI／artifact、繁體中文交付與限制。

如另獲表單授權，交付另包含核准資料契約／接收端／反 spam／隱私依據、真實前端行為、受控端到端或阻塞證據；沒有這些不得聲稱表單完成。沒有確認管道時，資訊頁可供審核，但報告必須明言尚不能透過網站收取需求。規格製作不等於任一功能或測試已完成，所有初始為 PENDING。

## 15. Out of Scope & Future Work

未授權時不做任何表單、API／Backend、CMS、Authentication、Analytics、CRM、第三方收件服務、CAPTCHA、寄信、附件、預約、電話／地圖或法律政策。即使規劃文提到 Spring Boot、PostgreSQL 或 contact@，都不是建立這些功能的授權。

Task 009 負責 Privacy 政策內容與法律核對，Task 010 處理正式索引策略，Task 013／014 分別處理 Vercel 及 Domain；本 Task 不改 DNS／Source／網域、收費帳號或部署條件。Contact 與 Privacy 可平行設計，但資料收集啟用須等契約及法律／服務準備完成。

Pending Confirmation 的正式管道、收件目標、端點與 schema、隱私／第三方／保存／權利、回應條件依第 6 節 owner／時點／fallback 處理。不補虛構信箱、範例送出或法律承諾，不把應用沒有表單推論成託管無任何 logs。

## 16. Final Delivery Checklist

以下皆為未來 Contact 實作初始清單，本輪規格工作不代填結果。

執行狀態依第 11 節統一使用 `PENDING`、`PASS`、`FAIL`、`BLOCKED`、`N/A`。僅有證據的 `PASS` 可勾選；其餘保持未勾選，`N/A` 附判定理由且不視為缺少適用驗收。必要項目仍為 `PENDING`、`FAIL` 或 `BLOCKED` 時，不得宣稱完整通過。以下是規格初始清單，本輪文件修訂不代填功能結果。

- [ ] PENDING — 最新 main、前置成果與所有已存在路由已盤點，來源版本／差異與 confirmed channel 證據已記錄。
- [ ] PENDING — 已確認 activeMode；無管道時誠實 fallback、無假 form／mailto／送出，必要收件阻礙如實列出。
- [ ] PENDING — 六個主區塊、指定文案、typed config、Header／Footer／Mobile／首頁舊錨點完整。
- [ ] PENDING — 公開管道僅來自核准設定，Email／品牌頁／資料告知與各 Gate 可追溯，未確認不公開。
- [ ] PENDING — 如有另授權表單，schema／接收端／反 spam／隱私／前端驗證／真實成功失敗與測試授權完整；否則明確 N/A 而非假 PASS。
- [ ] PENDING — npm ci、TypeScript、Lint、一般 Build、Pages Build 及新啟 production／靜態網站驗收完成。
- [ ] PENDING — Contact 與全部既存頁五種指定寬度、全部 links／錨點／Base Path、手機觸控與視覺完成。
- [ ] PENDING — axe、Keyboard／Focus／Skip Link／Reduced Motion／Disabled 適用性與必要人工檢查完成。
- [ ] PENDING — Console／Runtime／Network、HTTP／Metadata／資源／404／.nojekyll／dev 排除與 validators 完成。
- [ ] PENDING — 七張實際截圖、獨立報告、個資最小化、Known Issues 與修正後重驗完成。
- [ ] PENDING — 完整 Diff／Commit／PR／本次 CI 與 artifact 已確認；部署未授權不執行，不把資訊頁當已可收件。
- [ ] PENDING — 未確認的 owner／時點／解除條件、資料與法律協作及繁體中文最終報告完成。

- [ ] PENDING — Test Failure Policy 已遵守，失敗、阻礙與 Known Issues 有完整記錄，沒有阻礙交付的未解決必要驗收。
- [ ] PENDING — 每項測試的 Test ID、預期／實際結果、狀態與可追溯證據已記錄，沒有以預期或舊結果代填。
- [ ] PENDING — 獨立報告已在 PR 建立前完成並納入同一 PR，最後測試、後續重驗與實際提交的程式碼一致。
- [ ] PENDING — 本機、Feature Commit、PR CI、PR Review、合併授權、main CI、部署與公開 URL 驗證分別記錄；未發生階段維持 PENDING 並說明，沒有冒稱已發布。
