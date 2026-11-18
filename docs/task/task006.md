# Task 006 — Solutions 解決方案介紹頁實作

## 0. 文件用途與執行時點

本文件是可直接交給 Codex 執行的 Solutions 工程任務規格。**只有使用者另行明確要求「執行 Task 006」時，以下網站開發、測試與功能 PR 流程才開始。**

本次規格製作僅更新既有 `docs/task/task006.md`，不實作頁面、不修改其他檔案或 Repository，不建立功能分支或 PR，也不合併或發布。使用文件專用分支保留提交；這項編寫階段限制不取代日後正式實作時的 Feature Branch／PR 要求。

本檔在 Website `main@5d04f0fcd0089dd64614156faff86a4d5ce48c1d` 已有製作指示草稿，這次將其正式化，而非假設空檔或新增第二份規格。以下所有瀏覽器、建置、截圖與部署條件都是**未來實作必須完成的驗收**，不代表已執行或通過。

## 1. 專案識別與任務目標

| 項目 | 規格 |
| --- | --- |
| Project / Brand | Xplore Kaleidoscope / XK |
| Website Repository | `xk2022/xk-website` |
| Documentation Repository | `xk2022/xplore-kaleidoscope`，僅供讀取 |
| 正式路由 | `/solutions` |
| 主要語言 | 繁體中文 `zh-TW`，保留必要英文技術名稱 |
| 品牌網域 | `https://xplorekaleidoscope.com` |
| 品牌標語 | Explore Possibilities. Create Digital Value. |
| 技術標語 | Building Digital Solutions with Web, Java & AI. |
| 正式實作分支 | `feature/website-solutions-page` |
| 部署架構 | GitHub Actions → GitHub Pages；保留一般 Next.js production build |

任務是讓訪客從企業需求理解 XK 如何組合既有技術服務，找到適合討論的方案方向，並前往已存在的 Services、About 或首頁聯絡區塊。

- Services 回答「XK 提供哪些技術服務」，以五類能力與技術範圍組織內容。
- Solutions 回答「面對什麼需求，可以如何組合服務」，以問題、適用對象、規劃步驟與改善目標組織內容。
- Portfolio 回答「有什麼實際作品及其狀態」，不屬於 Task 006。不得把 Services 五類卡片重新命名後當作 Solutions，也不得將規劃中的作品當成已交付案例。

目標訪客以文件支持的台灣中小企業、傳統企業及專業服務業的經營者、業務流程負責人及技術評估者為主；海外中小企業、新創與數位合作夥伴為可理解的次要讀者。這是內容對象，不表示 XK 已有這些客戶、合作關係或海外據點。

## 2. 開發前檢查與前置依賴

正式實作開始前必須重新檢查 Git 狀態、分支、remote、最新 `main`、套件版本、現有路由與共用元件 API，不覆蓋未提交的使用者工作。

先閱讀以下網站文件與原稿：

- [AGENTS.md](../../AGENTS.md)、[README.md](../../README.md)。
- [Task 001 原稿](task001-implementation-notes.md)及[繁體中文版本](task001-implementation-notes.zh-TW.md)。原 `docs/task/task001.md` 不存在，不得建立虛構引用。
- [Task 002 原稿](task002.md)及[繁體中文版本](task002.zh-TW.md)。英文原稿已恢復，早期空檔描述屬歷史紀錄。
- [Task 003](task003.md)、[Task 004](task004.md)、[Task 005](task005.md)。
- [歷史實作紀錄](../implementation-notes.md)、[Design System](../brand-design-system.md)、[首頁實作](../homepage-implementation.md)、[About 實作](../about-implementation.md)、[Services 實作](../services-implementation.md)、[Pages 操作指南](../github-pages-deployment.md)。

本次規格研究時，Task 005 已由 [PR #5](https://github.com/xk2022/xk-website/pull/5) 合併，Merge Commit 為 `e341f12d4d3a93127402ed0b4889d2526b253244`；[main run 44269605915](https://github.com/xk2022/xk-website/actions/runs/44269605915) 的品質、Pages 建置與部署已成功。這是前置快照，不能當作 Task 006 的測試或發布證據。

未來實作必須重新確認 Task 005 已合併且其成果是最新 `main` 的祖先；若尚未合併，停止並回報依賴，不自行整合未核准分支。以當次最新已合併 `main` 建立功能分支，記錄實際 Base SHA，不要求停留在本文件研究快照。

衝突處理順序為使用者當次明確指示、已合併網站架構與 Design System、這份任務明確範圍、經核對的業務文件、舊版規劃。記錄重要差異，不藉舊文件重建架構。

## 3. 文件 Repository 研究結果與版本

研究日期：2026-11-18。唯讀確認最新文件 `main` 為 **`95ef1275a46ace76e11f668178ca881087483398`**，已檢查完整 Tree 及相關內容，**沒有獨立且已定稿的 Solutions 規劃文件**。以下四個方案是依既有服務能力與需求情境整理的頁面資訊架構，不是已核准上架的產品目錄。

正式實作時再次查最新文件 main；若版本改變，讀取差異並記錄新的 Commit／Blob SHA。不得只更新版本號而混用舊內容，也不得把任何新增建議當成商業核准。

以下路徑均相對於文件 Repository 的 `doc/01_business-plan/`，版本固定為上述 Commit。表內來源代碼供內容與實作紀錄追溯。

| 代碼 | 原始文件 | Git Blob SHA | 可採用內容 |
| --- | --- | --- | --- |
| S01 | `week-01/00_company-profile.md` | `249dda3bc464c7fae497e037d8a9916ed93893e7` | 一人全職定位、目標客群；產品是規劃能力 |
| S02 | `week-01/01_brand-positioning.md` | `f30594dbf9545a4f19c265845632667b776bdeba` | 舊網站、Java 現代化、分散系統、知識查詢需求與跨領域服務 |
| S03 | `week-01/02_service-catalog.md` | `cc1c2bacbc1f5367667005a9d4a3b288fc8cfd0c` | Web、Java、API／資料整合、AI 與 Workflow 的服務能力 |
| S04 | `week-01/02_服務項目.md` | `ff5ea5a95a88388be1a4f4963f442b716775c225` | 適用客戶、部署規劃與維護支援；SaaS 為預計功能 |
| S05 | `week-01/04_revenue-modelg.md` | `2c538f06602a382770843abc85bbfd1322204552` | 自有產品路線與一人交付邊界；數字是目標或假設 |
| S06 | `week-02/01_brand-identity_品牌視覺識別規範.md` | `19378775e986d5c8e002035685668d381532cae4` | 品牌與標語、幾何視覺、產品呈現須符合進度 |
| S07 | `week-02/05_website-sitemap_ 官方網站資訊架構與網站地圖.md` | `1f1b4584bbe06f0079542eedffa52215024da0f7` | 目標客群、服務與產品分開、Demo 不等同客戶成果 |
| S08 | `week-02/06_homepage-copywriting_官方網站首頁文案規劃.md` | `4f7173ae5ace721b9487df5500ff008e537c183d` | §7 需求情境、§10 AI 方向、§13 合作方式 |
| S09 | `week-02/08_website-architecture_官方網站 Next.js 技術架構設計.md` | `15c1483bf47be33bc29b755a220fb465b5dd8a1a` | Server Components、分層元件、集中設定及 Metadata 原則 |
| S10 | `week-02/09_website-mvp_官方網站 MVP 開發規格.md` | `5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d` | §6.5 數位／整合／知識／Workflow 方向，AI Assistant 僅產品方向 |
| S11 | `week-03/01_portfolio-strategy_XK 技術作品展示策略.md` | `88103f938cfb421878de414194db4b981ec5c024` | 自製示範策略、三種情境及服務對應；驗收標準是目標 |
| S12 | `week-03/02_case-01-corporate-website.md` | `c9b151d01a7616abb939dd9747d704428d0bdd8c` | §2 企業網站的手機、內容、維護問題；屬自製 Demo 規劃 |
| S13 | `week-03/03_case-02-java-enterprise-system.md` | `4b338c79ac83db44307832754404a28496303189` | §2 人工、資料分散與舊系統情境，§21 Java＋整合方向 |
| S14 | `week-03/04_case-03-api-integration-platform.md` | `be1dbacf99ac76d5032ca6cecf221a9a000ff89b` | §2 資料孤島、§6 模擬流程；AI／n8n 屬後續擴充 |
| S15 | `week-03/05_portfolio-content.md` | `e9aae178cdcef6afca313fde3cd501bd533ee028` | 三例皆為 Planned／In Development，Live 需部署證據 |
| S16 | `week-03/README.md` | `aaf4dae6b3e80f485fd9a98dd76637a10dc9e561` | 一人品牌與 Demo 資料界線；KPI 只是目標 |
| S17 | `week-01/05_customer-development.md` | `8cf9ca6d6111c6031202944ff4b8f345b75f3c22` | §3／5 需求與客群，§15 AI 產品仍需驗證與 Pilot |

### 3.1 已發現的衝突與缺漏

- S01 的中文品牌寫法與 S06「尚未定案」有差異；沿用已合併的 `Xplore Kaleidoscope`／`XK`，不新增中文正式品牌或法人聲明。
- S13 的管理模組與策略／README 的摘要不完全相同，不把各種模組相加成已具備的完整 ERP、CRM 或 HR 產品。
- S14 將 AI／n8n 列為後續方向，S15 的技術摘要不構成該示範系統已整合這些功能的證據。
- 舊 monorepo、Vercel／Backend、較長服務路由、語系前綴及正式索引規劃，不取代現有獨立 Repository、Pages、短路由與 noindex 政策。
- 原始 ASK／ANS 中的方案 A／B／C、電商、中文品牌、另一套 Logo／色票或範例信箱，不納入新的業務承諾。
- 缺少專屬 Solutions 核准文案、經授權客戶案例、可操作 Demo 的驗證、量化成效、正式產品狀態、報價、固定工期、SLA 及已確認的公開聯絡管道。
- 規劃中的 frontend-development-guide、deployment-guide、launch-checklist 與 Week 03 technical-architecture／development-roadmap 尚未提供，不建立指向不存在文件的連結。

這些缺漏不阻擋「能力＋建議情境」的靜態介紹頁；有爭議或無來源的商業內容應省略並列入未完成事項。

## 4. 內容狀態與範圍界線

| 類型 | 定義 | 本頁呈現方式 |
| --- | --- | --- |
| 已確認服務能力 | Task 005 及 S03／S04 支持的技術服務範圍 | 說明可提供的技術協助，連到既有 Services |
| 建議解決方案 | 根據需求組合能力的規劃方向 | 使用「可評估」「依需求規劃」「改善目標」語氣，標示為方案方向 |
| Demonstration Project | 自製、概念或展示專案 | 本次不展示作品卡片、Demo 畫面或 Live 按鈕；原始規劃只作情境參考 |
| Planned／In Development | 規劃中或尚在開發的項目 | 不改標為 Completed／Delivered，不推定已符合來源驗收條件 |
| 未實現產品／SaaS | XK AI Business Assistant 等未有正式上線證據的產品方向 | 不建立產品販售、試用、登入、訂閱、價格或產品功能頁 |

不得虛構客戶／合作夥伴、推薦、交付歷史、使用者數、效益百分比、AI 準確率、監控能力、合規認證、固定工期、價格、SLA 或 24/7 承諾。預期改善是設計目標，不是實證成果或保證。

保留 Task 004 的創辦人一人全職品牌定位，不新增團隊、人名、照片、年資、證照、地址或法人資訊。聯絡管道仍按 `src/config/contact.ts` 的確認資料處理，不將建議的 Email／LinkedIn 當成可用管道。

本次正式實作只包含 `/solutions` 與必要整合，不包含 Portfolio、解決方案明細路由、Contact／Privacy 頁、AI Chatbot、Backend、API、CMS、Authentication、Analytics、國際化框架或新 npm Dependencies。

## 5. 固定的四個解決情境

Cloud／部署是共同支援能力，不另湊第五項解決方案。以下是本任務的初始範圍；未來來源更新若要求改分類，先記錄差異與理由，不自行新增產業產品或套餐。

| Solution ID／Article ID | 中文／英文名稱 | 需求與目標語氣 | 必備 Services 對應 | 主要來源 |
| --- | --- | --- | --- | --- |
| `digital-presence`／`solution-digital-presence` | 數位品牌與企業網站 / Corporate Digital Presence | 資訊不易找到、手機體驗與維護不便；可規劃品牌內容及網站入口，讓資訊更清楚 | `website-development` | S02 §4–5、S03 §3、S12 §2 |
| `enterprise-management`／`solution-enterprise-management` | 企業內部管理與系統現代化 / Enterprise Systems Modernization | 人工或分散資料、既有 Java 系統維護需求；可評估管理流程、資料與權限邊界 | `java-enterprise`、`system-integration` | S02 §4–5、S03 §4–5、S13 §2／21 |
| `system-integration`／`solution-system-integration` | 跨系統資料整合與流程自動化 / System Integration & Workflow | 系統介面／資料格式不一致與重複輸入；可規劃 API、資料交換及流程銜接 | `system-integration`、`java-enterprise` | S03 §5–6、S14 §2／6 |
| `ai-workflow`／`solution-ai-workflow` | 企業知識與 AI 輔助應用 / AI-assisted Knowledge & Workflows | 文件分散、反覆搜尋與知識查詢；可評估 RAG、LLM 及既有流程整合 | `ai-automation`、`system-integration` | S03 §6、S08 §7／10、S17 §3／5 |

### 5.1 每個方案的內容契約

每個方案必須包含下列八項，文案不可僅是技術名單：

1. 適用的企業需求／使用情境，描述一般情境，不宣稱實際客戶。
2. 二至三項需要理解的問題，與來源對應。
3. 一段方案定位，明確是依需求評估的方向。
4. 涉及能力與精簡技術範圍，每項有來源支持。
5. 三個實施方向：先了解範圍／資料／限制，再規劃架構與介面，最後分階段實作與驗證；不得變成固定工期或必交模組承諾。
6. 二至三項「希望改善的流程或技術面向」，不用已改善、已提升或保證達成語氣。
7. 表中必備服務與有效錨點；可視情境補充共同的 Cloud 部署規劃。
8. 前往相關 Services 或 `/#contact` 的真實 Next Link。

企業網站可聚焦資訊架構、RWD、可維護前端與 SEO 基礎；Java 聚焦商業邏輯、資料／權限與現代化評估；整合聚焦介面、資料流向、格式與交換流程；AI 聚焦資料來源、檢索與回答流程、既有系統整合及人工確認。這些是技術規劃方向，不新增網站本身的實際 API、資料庫或 AI 執行功能。

不得將 AI 視為每一項自動化的必要部分。RAG、n8n 等詞彙可在來源支持的能力方向中使用，但不得宣稱規劃中的 Integration Hub 或 AI Assistant 已具備、已部署或已驗證這些功能。

## 6. 頁面資訊架構與定稿文案

`src/app/solutions/page.tsx` 組合 **九個主 Section**。Details 的四個方案使用 Article，避免把四個 Article 又計為四個主 Section；共用 Header／Footer 不計入九個內容區塊。

| 順序 | Section ID | 元件／Heading | 必備內容 |
| --- | --- | --- | --- |
| 1 | `solutions-hero` | `SolutionsHero`／單一 H1 | 中文主標、英文標題、品牌定位、兩個真實 CTA、既有 BrandPattern |
| 2 | `business-challenges` | `SolutionsChallenges`／H2 | 四項需求：網站資訊／人工與舊系統／資料孤島／知識搜尋；對應四方案 |
| 3 | `solutions-overview` | `SolutionsOverview`／H2，Card H3 | 四張方案方向卡片，連至對應 Article |
| 4 | `solution-details` | `SolutionsDetails`／H2；Article H3 | 四個 `SolutionDetail`，完整呈現第 5.1 節八項內容；子標題可用 H4 |
| 5 | `solution-technology` | `SolutionsTechnology`／H2 | 依方案呈現「需求 → 技術能力 → Services」對照及共同部署層 |
| 6 | `solution-combinations` | `SolutionsCombinations`／H2 | 三個跨能力組合示例，標為需求示例，不是客戶案例 |
| 7 | `implementation-approach` | `SolutionsApproach`／H2 | 五階段規劃與交付方式，桌面橫向、手機垂直 |
| 8 | `why-xk-solutions` | `SolutionsValue`／H2 | 理解商業需求、跨能力整合、可維護與直接技術溝通等原則 |
| 9 | `solutions-next-step` | `SolutionsCta`／H2 | 前往 Services、About、首頁聯絡區塊的有效導覽 |

### 6.1 Hero 與 CTA

H1 必須為：**從企業需求出發，規劃合適的數位解決方案。**

英文標題：`Digital Solutions for Business`。

品牌定位文案：

> XK 從企業的資訊、系統與工作流程需求出發，結合網站、Java、API 整合與 AI 應用能力，協助評估適合的數位解決方案方向。

沿用 `siteConfig` 的英文品牌與技術標語，不重複寫入多套設定。Hero 主要 CTA「探索解決方案」連至 `#solutions-overview`；次要 CTA「了解技術服務」連至 `/services`。

最終 CTA 標題：**從理解需求，開始規劃下一步。** 說明依需求確認範圍與合作方式，按鈕「前往聯絡資訊」至 `/#contact`、「了解服務」至 `/services`，另提供「認識 XK」至 `/about`。首頁聯絡區塊可能仍顯示正式管道待確認，不製造假表單、信箱或「立即試用」功能。

### 6.2 對照、組合與合作方式

Technology 區塊重用同一份 Solution 資料，選出每個情境的技術與服務對照，不複製 Services 的五大技術清單。Cloud 可作跨方案部署與維護支援層，連至 `/services#cloud-infrastructure`，不宣稱新的託管產品或 SLA。

Combinations 固定三個示例：

- 企業網站＋部署規劃：網站資訊入口配合合適的運行與交付環境。
- Java 應用＋API／資料整合：管理流程與跨系統資料交換一起規劃。
- AI 輔助查詢＋既有系統整合：依資料來源與使用流程評估知識檢索／自動化。

Approach 沿用 Task 005 的五階段：Discovery、Planning、Development、Testing & Delivery、Continuous Improvement。可以重用 `serviceProcessSteps`，或在集中設定補充方案評估說明；不得改造成固定報價、時程、交付條件或保證。

Value 區塊只陳述品牌合作原則，連結 About 即可；不另複製完整創辦人介紹、憑空增加團隊規模或製作認證標章。

## 7. 型別、集中內容與元件責任

使用既有 App Router、React Server Components、Strict TypeScript、`src/` 與 `@/*`。Page 只處理 Metadata 與區塊組合；內容置於 `src/config/solutions.ts`，元件位於 `src/components/sections/solutions/`。

內容設定至少定義以下明確型別，不使用 `any` 或鬆散的重複字串物件：

| 型別 | 必備欄位／限制 |
| --- | --- |
| `SolutionId` | 第 5 節四個 ID 的 literal union |
| `SolutionSource` | 來源代碼、Repository、路徑、Commit、Blob SHA、章節與支持內容 |
| `SolutionDefinition` | id、anchor、中文／英文名稱、summary、audience、challenges、positioning、technologies、implementationSteps、improvementGoals、serviceIds、sourceRefs、status |
| `SolutionCombination` | 標題、說明、solutionIds、serviceIds、sourceRefs、示例標籤 |
| `SolutionProcessStep` | 若未重用現有流程資料，定義名稱、中文標題與說明 |

`SolutionDefinition.status` 本次固定為 `proposed-direction`，畫面以「依需求規劃的方案方向」或等義文字清楚標示。它不是服務能力是否存在的判斷，也不是產品上線狀態。

`serviceIds` 重用 `src/config/services.ts` 的 `ServiceId`；名稱與 Services 錨點由既有 `serviceCategories` 解析，不另維護一份容易不一致的服務 URL 字串表。`sourceRefs` 必須能追溯第 3 節的來源、章節及所支持的說法；沒有可驗證來源的商業敘述不可加入。

同一份 Solution 資料驅動 Challenges 對應、Overview、Details 及 Technology 對照。Hero、組合、流程及 CTA 文案同樣集中；使用 `satisfies`／readonly 型別保持約束，不建立 CMS 或通用內容引擎。來源追溯主要供程式維護與實作紀錄使用，不將內部文件路徑堆到訪客操作流程。

新內容預設全部為 Server Components。沿用既有手機選單即可，不新增篩選器、搜尋、Tabs、輪播、Modal 或用假互動製造複雜度。

## 8. Design System 與 Responsive

重用 Section、Container、Card／CardHeader／CardTitle／CardContent、Button、SectionHeading、XkLogo、BrandPattern 與 Lucide。沿用 Inter／Noto Sans TC、九個 Typography Utilities、Spacing、Radius、Shadow、Focus 與 Reduced Motion。

`SectionHeading` 的 `titleLang` 預設為 `en`，中文標題必須明確傳入 `zh-TW`。`CardTitle` 預設為 H3；Details 的 Article 標題為 H3，其內子標題使用 H4 或段落標籤，避免錯誤層級及語言標註。

| Token | 值 |
| --- | --- |
| Primary | `#101A33` |
| Secondary | `#3157D5` |
| Accent | `#19B8D5` |
| Background | `#FFFFFF` |
| Surface | `#F5F7FB` |
| Foreground | `#172033` |
| Muted | `#667085` |
| Border | `#E4E8F0` |

使用現有語意類別，不在元件重複硬編碼品牌 HEX。`--muted` 是文字灰色，`bg-muted` 對應 Surface。Logo 保留來源 Path、Transform、比例、配色與 Provisional 狀態，不重畫或宣稱最終核准。

Overview 手機一欄、平板與桌面兩欄即可；以內容可讀性為準。Details 手機依需求→方向→能力→下一步直排，桌面可分欄；Technology 對照若採表格，手機改為完整標籤卡片或可理解清單，不讓重要內容只能靠水平捲動閱讀。

320／375px 不使用會裁切標語、段落或 CTA 的固定高度或強制方形卡片。Hero 圖形可在手機依內容增高、較大寬度再設比例；實際檢查最下方文字完整。沿用共用斷點與 Section 留白，不另建平行排版系統。

## 9. 導覽、連結與首頁整合

在 `src/config/navigation.ts` 將「解決方案」由 `/#solutions` 改為 `/solutions`，並把 `plannedRoutes` 的 `/solutions` 設為 `implemented`。Header、Footer、MobileNavigation 共用此設定，不各自建立另一份導覽。

保留既有 `/`、`/about`、`/services`、`/#solutions`、`/#services`、`/#contact` 及五個 `/#service-{anchor}` 目的地。首頁原三個 Solutions 方向與既有服務錨點不必重寫；在 `HomeSolutions` 清單之後新增單一「了解解決方案」Next Link 至 `/solutions`，建立完整頁入口。

以下是邏輯路徑；應交給 Next.js Link 加入實際 Base Path／trailingSlash，禁止在各元件硬編碼 `/xk-website`：

| 目的 | 有效路徑 |
| --- | --- |
| 四方案 Overview／Challenges | `#solution-digital-presence`、`#solution-enterprise-management`、`#solution-system-integration`、`#solution-ai-workflow` |
| 網站服務 | `/services#website-development` |
| Java 服務 | `/services#java-enterprise` |
| 系統整合服務 | `/services#system-integration` |
| AI 服務 | `/services#ai-automation` |
| 共同部署能力 | `/services#cloud-infrastructure` |
| 品牌與聯絡入口 | `/about`、`/#contact` |

不得連到尚未實作的 `/solutions/*`、`/services/*`、`/portfolio`、`/contact` 或 `/privacy` 頁面。Interactive Card 整卡是連結，內部不得再嵌套 Button／Link；Details 的多個服務連結則使用一般內容容器。

## 10. SEO 與 Metadata

使用 Next.js Metadata API，參考既有 About／Services 的頁面專屬設定。Title 使用 absolute 或等效方式避免 root template 重複品牌名。

| 欄位 | 固定內容 |
| --- | --- |
| Title / Open Graph Title | `解決方案 \| Xplore Kaleidoscope` |
| Description / Open Graph Description | `探索 XK 如何依企業需求組合網站開發、Java 企業系統、API 與資料整合、AI 應用及部署技術，規劃合適的數位解決方案。` |
| Canonical / Open Graph URL | `https://xplorekaleidoscope.com/solutions` |
| Open Graph Locale / Type | `zh_TW` / `website` |
| HTML Language | 沿用 Layout 的 `zh-TW` |
| Robots | 保留 `noindex, nofollow` |

Pages 模式可依既有 `trailingSlash: true` 將 URL 正常化為 `/solutions/`；驗收接受單一正常結尾斜線，但必須是品牌 Origin 與 `/solutions`，不得包含 `/xk-website`、Query 或 Fragment。Canonical 不是目前 GitHub Pages 專案網址。

保留單一 H1 與正確 Heading 層級；裝飾 SVG／圖示使用 aria-hidden，有資訊意義的圖形提供可及名稱。沒有核准的 OG Image 不新增假路徑，也不新增虛構 Review、Rating、Awards 或 Organization Schema。不因完成頁面或發布而自行開放搜尋索引。

## 11. GitHub Pages 與設定保護

保留目前的雙模式建置：

- `npm run build`：一般 Next.js production build，保留原有 Next／Vercel 相容模式。
- `npm run build:pages`：由既有腳本啟用 `XK_PAGES_EXPORT=1`，條件式 `output: "export"`、Base Path、`trailingSlash: true` 與靜態圖片設定。

不得把 Pages 的 export／Base Path 永久套到一般 build，也不得更改 Next 設定、package scripts、套件版本或 lockfile。本次不需要新 npm Dependencies。

僅擴充 `scripts/build-github-pages.mjs` 的必要頁面驗證：

1. 存在 `out/solutions/index.html`，HTML 具正確 Title、Canonical、Open Graph URL 及 noindex／nofollow。
2. CSS／JS／字體／icon／圖片引用使用建置設定的 Base Path，對應實際存在的檔案。
3. 保留首頁、About、Services、404、`.nojekyll` 與開發路由／payload 排除驗證，不降低既有斷言。
4. Solutions 不依賴 Server Runtime、Contact API、外部 AI 呼叫或其他 Backend。

不得修改 `.github/workflows/ci.yml`、Pages Source、Environment 部署條件、DNS 或 Custom Domain。PR 僅執行 quality／pages-build 並產出 artifact；Deploy 必須跳過，不自動合併。只有日後另經審核與授權合併的 main 工作流程才可能發布，且發布結果需另行查證。

## 12. 預定新增與修改檔案

此清單只在**正式執行 Task 006**時生效；規格製作階段僅更新本檔。建議元件名稱如下，可調整合理拆分，但九主區塊、四 Article、資料責任與語意不可遺漏。

| 動作 | 檔案 | 用途 |
| --- | --- | --- |
| 新增 | `src/app/solutions/page.tsx` | Metadata 與九個區塊組合 |
| 新增 | `src/config/solutions.ts` | 明確型別、四方案、來源、對照、組合與 CTA |
| 新增 | `src/components/sections/solutions/solutions-hero.tsx` | Hero |
| 新增 | `src/components/sections/solutions/solutions-challenges.tsx` | 四個需求情境 |
| 新增 | `src/components/sections/solutions/solutions-overview.tsx` | 四卡與 Article 導覽 |
| 新增 | `src/components/sections/solutions/solutions-details.tsx` | Details Section 與四 Article 組合 |
| 新增 | `src/components/sections/solutions/solution-detail.tsx` | 共享方案 Article 呈現 |
| 新增 | `src/components/sections/solutions/solutions-technology.tsx` | 同資料衍生的技術／服務對照 |
| 新增 | `src/components/sections/solutions/solutions-combinations.tsx` | 三個組合示例 |
| 新增 | `src/components/sections/solutions/solutions-approach.tsx` | 五階段方式 |
| 新增 | `src/components/sections/solutions/solutions-value.tsx` | 合作與技術原則 |
| 新增 | `src/components/sections/solutions/solutions-cta.tsx` | 有效站內 CTA |
| 新增 | `docs/solutions-implementation.md` | 來源、檔案、實際驗收、截圖、未完成事項 |
| 新增 | `docs/screenshots/task006-solutions-*.png` | 第 15 節七張真實截圖 |
| 修改 | `src/config/navigation.ts` | Solutions 正式路由及 implemented 狀態 |
| 修改 | `src/components/sections/home-solutions.tsx` | 保留舊動線，新增完整 Solutions 入口 |
| 修改 | `scripts/build-github-pages.mjs` | Solutions 產物與 Metadata 驗證 |
| 修改 | `README.md`、`AGENTS.md` | Task 006 操作、分支與驗收要求 |
| 追加 | `docs/implementation-notes.md` | 保留歷史前綴，追加 Task 006 實際紀錄 |

本任務不重新建立或刪除其他任務成果。現有 `docs/task/task006.md` 是規格輸入，不應為了滿足清單再次新增／覆寫；若正式開發發現必須修正規格，先記錄差異，不以改規格取代完成驗收。部署指南僅在操作確實改變時補充，保留其歷史紀錄。

## 13. 正式實作的品質指令與執行順序

必須在最終程式碼完成後新執行，不能沿用 Task 001–005 的通過結果：

```sh
npm ci
npx tsc --noEmit
npm run lint
npm run build
```

一般 build 後啟動新的 production server：

```sh
npm run start -- --hostname 127.0.0.1 --port 3030
```

驗證 `/`、`/about`、`/services`、`/solutions` HTTP 200、Title／Metadata／導覽正確，未知路由與預設 `/dev/design-system` 為 HTTP 404；確認後停止此伺服器。

再執行：

```sh
npm run build:pages
```

兩種 build 共用 `.next/`，不得將 Pages 模式產物交給一般 `npm run start`。若要再測一般 server，先重新執行 `npm run build`。本機開發可另以 `npm run dev` 檢查，但不能取代 production 與靜態驗收。

使用未佔用的連接埠與臨時目錄掛載 Pages 產物，例如：

```sh
solutions_preview_dir=$(mktemp -d /tmp/xk-solutions-preview.XXXXXX)
mkdir -p "$solutions_preview_dir/xk-website"
cp -R out/. "$solutions_preview_dir/xk-website/"
python3 -m http.server 3031 --bind 127.0.0.1 --directory "$solutions_preview_dir"
```

瀏覽 `http://127.0.0.1:3031/xk-website/solutions/`，並回歸靜態首頁、About、Services。所有命令從 Repository 根目錄執行；本機靜態伺服器不會完整模擬 GitHub Pages 的自訂 404，必須另檢查輸出的 `404.html`、真實未知路由狀態與開發頁排除。

## 14. 瀏覽器、Responsive 與 Accessibility 驗收

| 項目 | 必須得到的實際結果 |
| --- | --- |
| 路由與結構 | 一般／Pages 四頁 HTTP 200；Solutions 九個主 Section、四個 Article、四個 Overview、三組合及五流程 |
| 內容來源 | 四方案完整符合第 5.1 節，serviceIds／sourceRefs 有效；沒有無來源產品、客戶成果或承諾 |
| Metadata | 第 10 節所有欄位與語言正確，單一 H1，沒有假 OG Image／Schema，四頁原有 noindex 政策保留 |
| 全部有效連結 | 收集四頁 Header／Footer／手機／內容的全部有效站內連結，逐一檢查 HTTP、目標 ID 與 Base Path，不只檢查 href 字串 |
| 實際動線 | 首頁→Solutions→四個 Article；Solutions→Services 對應五個錨點→About／首頁聯絡；刷新深層路徑仍正常 |
| Responsive | 四頁 × 320／375／768／1440／1920px，至少 20 個案例；無水平溢出、重疊、裁切或無法閱讀的標籤 |
| 手機視覺 | 320／375px Hero 最後一行及 CTA 完整，Logo 等比例，Details／技術對照／流程順序清楚，卡片間距一致 |
| 手機操作 | 至少 375px 觸控模擬實際點擊選單、方案卡與跨頁連結，不依賴 Hover；展開狀態與可及名稱正確 |
| 選單關閉 | Escape 關閉並還原焦點，選連結、外部點擊與切換桌面斷點後關閉，重新回手機不殘留展開狀態 |
| Keyboard／Focus | Tab／Shift+Tab／Enter、Skip Link、方案卡與 CTA 均可操作，焦點可見；不把整頁鎖成 Modal |
| Disabled | 若有原生停用操作，實測不觸發且 Tab 略過；若本頁沒有，記錄不適用，不新增假停用按鈕，也不對 Link 使用 disabled |
| Reduced Motion | 啟用 prefers-reduced-motion，確認過渡為 0s／符合既有規則，無依賴動畫才能閱讀的內容 |
| axe | 四頁五種寬度及 Solutions 在 320／375／768px 展開手機選單，執行 WCAG 2／2.1 A／AA 自動掃描；記錄實際案例與違規數 |
| Console／Runtime／Network | 無非預期錯誤、資源 404、字體／CSS／JS／SVG 載入失敗；預期未知路由／開發頁 404 以獨立 HTTP 檢查記錄，不掩蓋真正資源錯誤 |
| 靜態檔案 | index／about／services／solutions HTML、404、.nojekyll、引用資源皆存在且路徑正確；無公開 dev 路由或 payload |
| 遠端 CI | 讀取本次 PR 的實際 head／run；quality、pages-build 成功，deploy skipped，Pages artifact 含 Solutions 並保留其他頁 |

工具可放在應用套件之外，不為驗收新增專案 npm Dependencies。檢查 Heading、可及名稱、色彩對比、裝飾元素、Focus 與人工閱讀；自動 axe 結果不等同完整無障礙認證。任何失敗必須修正並重跑受影響及指定驗收，記錄真實限制，不能把預期結果寫為 Pass。

## 15. 實際截圖與人工檢視

正式開發後至少新增下列七份，全部存入 `docs/screenshots/`，不可用示意圖、舊任務截圖或設計生成圖代替。

| 檔名 | 寬度與涵蓋範圍 |
| --- | --- |
| `task006-solutions-desktop.png` | 1440px，完整 Solutions 頁 |
| `task006-solutions-mobile.png` | 375px，完整 Solutions 頁 |
| `task006-solutions-overview.png` | 1440px，四張方案卡與方案方向標示 |
| `task006-solutions-details.png` | 1440px，Details 四個 Article；長圖可用實際瀏覽器區域擷取，至少完整看見需求、規劃、改善目標與服務連結 |
| `task006-solutions-technology.png` | 1440px，四情境的技術／Services 對照與共同部署層 |
| `task006-solutions-process.png` | 1440px，五階段合作方式及範圍說明 |
| `task006-solutions-footer.png` | 1440px，Footer 與 Solutions 有效導覽 |

另實際檢視 320px 與 375px Hero、Details／Technology／手機流程及桌面版，不只宣稱已存檔。若長圖需額外分段以方便審查，可增加截圖，原七個檔名仍須保留。實作報告記錄實際 PNG 尺寸、Viewport、對應內容與檢查結果，再加入存在圖檔的相對連結。

## 16. Git、文件與 PR 交付

以下僅適用**未來已授權正式執行 Task 006**的開發階段：

1. 從最新已合併 main 建立 `feature/website-solutions-page`。
2. 實作、文件與驗收完成後檢查完整 diff，確保沒有 `.next/`、`out/`、node_modules、暫存工具或機密資訊。
3. Conventional Commit 建議：`feat(solutions): implement XK solutions page`。
4. Push 功能分支，建立 `main ← feature/website-solutions-page` 的待審核 PR。
5. PR 說明問題與新行為、四方案及來源、Design System、檔案異動、導覽、SEO／Pages、每項實際測試、七張截圖與未完成事項。
6. 確認該 head 的 PR Checks 與靜態 artifact，不以別的 Commit 或舊 run 代替。
7. 不直接推送 main、不自動合併、不更改部署條件、不發布未經審核的功能分支。

新增 `docs/solutions-implementation.md`，記錄實際 Base／Branch、文件版本與 Blob、四方案來源對照、提案與產品界線、元件分工、完整新增／修改清單、五個命令的 exit code、全部瀏覽器結果、截圖、CI 連結、Commit／PR 及未完成事項。README／AGENTS 更新當前 Task 006 操作，歷史紀錄只追加，不覆寫 Task 001–005 的當時結論。

最終以繁體中文回報上述項目及是否已部署。預設此階段僅有待審核 PR；只有另有明確授權與實際 main deploy 成功證據、對應 Commit 及公開站驗證，才能宣稱上線。不得虛構 PR、SHA、Actions Run ID 或發布狀態。

## 17. Definition of Done 與尚待確認

正式實作的完成條件：

- [ ] 前置任務與最新 main 已實際確認，文件來源與衝突已記錄。
- [ ] `/solutions` 九主區塊、四 Article、全部必備文案與狀態界線完成。
- [ ] Services 能力與建議方案有清楚區分；沒有假案例、Demo 完成宣稱或已商用 SaaS。
- [ ] 共用導航、首頁入口、所有舊錨點、四頁與五個 Services 錨點正常。
- [ ] 沿用 Design System、原稿 Logo、現有依賴與雙模式建置，未新增 Backend／API／CMS／Analytics。
- [ ] Metadata／Canonical／Open Graph／語言／noindex 政策正確。
- [ ] 五個品質命令、一般 server、Pages 靜態輸出與 artifact 驗證完成。
- [ ] 四頁五寬、鍵盤、Focus、手機操作、Reduced Motion、axe 與錯誤檢查完成。
- [ ] 七份真實截圖與人工視覺完成，失敗項目修正後重新驗收。
- [ ] 文件與完整 diff 已核對，Feature Commit 已推送、待審核 PR 與實際 CI 結果可查。
- [ ] 文件 Repository 未修改，未直接推送 main、未自動合併或發布。

正式聯絡管道、最終 Logo／OG 素材核准、產品與 Demo 真實進度、可公開客戶授權、價格／工期／SLA、正式中文品牌、正式網域與搜尋索引仍待後續確認。缺少這些資料時採本規格的保守呈現，不阻擋有來源的靜態頁，但不可自行補造。

Solutions 明細頁、Portfolio、Contact、Privacy、正式 AI 產品、CMS 與 Backend 均屬後續任務，不能以本任務名義提前實作。
