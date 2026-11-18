# Task 006 — Solutions 解決方案介紹頁實作

## 1. Task Overview

Task 006 的工程規格目前已完成制定，但 `/solutions` 頁面尚未實作。**只有使用者另行明確授權正式執行 Task 006，以下功能開發、測試與功能 PR 流程才開始。** 本輪統一文件骨架不觸發 Solutions 網站開發。

歷史：本檔在 Website `main@5d04f0fcd0089dd64614156faff86a4d5ce48c1d` 已有製作指示草稿，後續正式化為工程規格；當時只製作本檔，沒有實作頁面。以下建置、瀏覽器、截圖、CI 與部署條件都是未來必須完成的驗收，不代表已執行或通過。

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

## 2. Repository & Prerequisites

正式實作開始前必須重新檢查 Git 狀態、分支、remote、最新 `main`、套件版本、現有路由與共用元件 API，不覆蓋未提交的使用者工作。

| 項目 | 前置規則／歷史快照 |
| --- | --- |
| Website Repository / Base Branch | `xk2022/xk-website` / `main` |
| 正式 Feature Branch | `feature/website-solutions-page`，由正式開發時的最新已合併 main 建立 |
| 本檔原研究的 Website Base | `5d04f0fcd0089dd64614156faff86a4d5ce48c1d`，只作歷史快照，不鎖定未來開發 Base |
| Documentation Repository / 研究版本 | `xk2022/xplore-kaleidoscope` / `95ef1275a46ace76e11f668178ca881087483398`，僅供讀取，實作時重新核對 |
| 前置 Task | Task 001–005 已合併成果及既有 Design System、首頁、About、Services、Pages 架構 |

歷史規格研究時，Task 005 已由 [PR #5](https://github.com/xk2022/xk-website/pull/5) 合併，Merge Commit 為 `e341f12d4d3a93127402ed0b4889d2526b253244`；[main run 44269605915](https://github.com/xk2022/xk-website/actions/runs/44269605915) 的品質、Pages 建置與部署已成功。這是前置快照，不能當作 Task 006 的測試或發布證據。

未來實作必須重新確認 Task 005 已合併且其成果是最新 `main` 的祖先；若尚未合併，停止並回報依賴，不自行整合未核准分支。以當次最新已合併 `main` 建立功能分支，記錄實際 Base SHA，不要求停留在本文件研究快照。

## 3. Reference Documents

### 3.1 網站規格與紀錄

先閱讀以下網站文件與原稿：

- [AGENTS.md](../../AGENTS.md)、[README.md](../../README.md)。
- [Task 001 正式規格](task001.md)、[原始歷史來源](task001-implementation-notes.md)及[繁體中文版本](task001-implementation-notes.zh-TW.md)。Task 006 最初研究時 `docs/task/task001.md` 尚不存在；本輪統一骨架後以 `task001.md` 為正式入口，保留原稿作歷史來源。
- [Task 002 原稿](task002.md)及[繁體中文版本](task002.zh-TW.md)。英文原稿已恢復，早期空檔描述屬歷史紀錄。
- [Task 003](task003.md)、[Task 004](task004.md)、[Task 005](task005.md)。
- [歷史實作紀錄](../implementation-notes.md)、[Design System](../brand-design-system.md)、[首頁實作](../homepage-implementation.md)、[About 實作](../about-implementation.md)、[Services 實作](../services-implementation.md)、[Pages 操作指南](../github-pages-deployment.md)。

規格優先順序：使用者當次明確指示、已合併網站架構與 Design System、這份任務明確範圍、經核對的業務文件、舊版規劃。記錄重要差異，不藉舊文件重建架構。

### 3.2 文件 Repository 來源與版本

原規格研究日期：2026-11-18；當時唯讀確認文件最新 `main` 為 **`95ef1275a46ace76e11f668178ca881087483398`**，當時已檢查完整 Tree 及相關內容，**沒有獨立且已定稿的 Solutions 規劃文件**。以下四個方案是依既有服務能力與需求情境整理的頁面資訊架構，不是已核准上架的產品目錄。

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

### 3.3 已發現的衝突與缺漏

- S01 的中文品牌寫法與 S06「尚未定案」有差異；沿用已合併的 `Xplore Kaleidoscope`／`XK`，不新增中文正式品牌或法人聲明。
- S13 的管理模組與策略／README 的摘要不完全相同，不把各種模組相加成已具備的完整 ERP、CRM 或 HR 產品。
- S14 將 AI／n8n 列為後續方向，S15 的技術摘要不構成該示範系統已整合這些功能的證據。
- 舊 monorepo、Vercel／Backend、較長服務路由、語系前綴及正式索引規劃，不取代現有獨立 Repository、Pages、短路由與 noindex 政策。
- 原始 ASK／ANS 中的方案 A／B／C、電商、中文品牌、另一套 Logo／色票或範例信箱，不納入新的業務承諾。
- 缺少專屬 Solutions 核准文案、經授權客戶案例、可操作 Demo 的驗證、量化成效、正式產品狀態、報價、固定工期、SLA 及已確認的公開聯絡管道。
- 規劃中的 frontend-development-guide、deployment-guide、launch-checklist 與 Week 03 technical-architecture／development-roadmap 尚未提供，不建立指向不存在文件的連結。

這些缺漏不阻擋「能力＋建議情境」的靜態介紹頁；有爭議或無來源的商業內容應省略並列入未完成事項。

## 4. Scope & Requirements

本次正式實作只包含 `/solutions` 與必要整合，不包含 Portfolio、解決方案明細路由、Contact／Privacy 頁、AI Chatbot、Backend、API、CMS、Authentication、Analytics、國際化框架或新 npm Dependencies。

必須完成有來源的四個解決情境、九個主 Section／四個 Article、服務對照、三個整合示例、五階段合作方式及有效 CTA；保護首頁、About、Services、既有導覽與錨點，完成本文件規定的 SEO、靜態輸出、Responsive、Accessibility、測試與交付。

服務介紹可以討論 Java、資料庫、AI 與部署能力；這不授權在官網新增相應的 Backend、API、資料庫、AI 執行功能或外部服務。不得覆寫其他 Task 的實作成果，亦不得用降低規格、假連結或假控制項代替驗收。內容狀態與未確認資料依第 6、15 節處理。

## 5. Information Architecture & UX

### 5.1 九個主區塊與元件職責

`src/app/solutions/page.tsx` 組合 **九個主 Section**。Details 的四個方案使用 Article，避免把四個 Article 又計為四個主 Section；共用 Header／Footer 不計入九個內容區塊。

| 順序 | Section ID | 元件／Heading | 必備內容 |
| --- | --- | --- | --- |
| 1 | `solutions-hero` | `SolutionsHero`／單一 H1 | 中文主標、英文標題、品牌定位、兩個真實 CTA、既有 BrandPattern |
| 2 | `business-challenges` | `SolutionsChallenges`／H2 | 四項需求：網站資訊／人工與舊系統／資料孤島／知識搜尋；對應四方案 |
| 3 | `solutions-overview` | `SolutionsOverview`／H2，Card H3 | 四張方案方向卡片，連至對應 Article |
| 4 | `solution-details` | `SolutionsDetails`／H2；Article H3 | 四個 `SolutionDetail`，完整呈現第 6.3 節八項內容；子標題可用 H4 |
| 5 | `solution-technology` | `SolutionsTechnology`／H2 | 依方案呈現「需求 → 技術能力 → Services」對照及共同部署層 |
| 6 | `solution-combinations` | `SolutionsCombinations`／H2 | 三個跨能力組合示例，標為需求示例，不是客戶案例 |
| 7 | `implementation-approach` | `SolutionsApproach`／H2 | 五階段規劃與交付方式，桌面橫向、手機垂直 |
| 8 | `why-xk-solutions` | `SolutionsValue`／H2 | 理解商業需求、跨能力整合、可維護與直接技術溝通等原則 |
| 9 | `solutions-next-step` | `SolutionsCta`／H2 | 前往 Services、About、首頁聯絡區塊的有效導覽 |

### 5.2 Hero 與 CTA

H1 必須為：**從企業需求出發，規劃合適的數位解決方案。**

英文標題：`Digital Solutions for Business`。

品牌定位文案：

> XK 從企業的資訊、系統與工作流程需求出發，結合網站、Java、API 整合與 AI 應用能力，協助評估適合的數位解決方案方向。

沿用 `siteConfig` 的英文品牌與技術標語，不重複寫入多套設定。Hero 主要 CTA「探索解決方案」連至 `#solutions-overview`；次要 CTA「了解技術服務」連至 `/services`。

最終 CTA 標題：**從理解需求，開始規劃下一步。** 說明依需求確認範圍與合作方式，按鈕「前往聯絡資訊」至 `/#contact`、「了解服務」至 `/services`，另提供「認識 XK」至 `/about`。首頁聯絡區塊可能仍顯示正式管道待確認，不製造假表單、信箱或「立即試用」功能。

### 5.3 對照、組合與合作方式

Technology 區塊重用同一份 Solution 資料，選出每個情境的技術與服務對照，不複製 Services 的五大技術清單。Cloud 可作跨方案部署與維護支援層，連至 `/services#cloud-infrastructure`，不宣稱新的託管產品或 SLA。

Combinations 固定三個示例：

- 企業網站＋部署規劃：網站資訊入口配合合適的運行與交付環境。
- Java 應用＋API／資料整合：管理流程與跨系統資料交換一起規劃。
- AI 輔助查詢＋既有系統整合：依資料來源與使用流程評估知識檢索／自動化。

Approach 沿用 Task 005 的五階段：Discovery、Planning、Development、Testing & Delivery、Continuous Improvement。可以重用 `serviceProcessSteps`，或在集中設定補充方案評估說明；不得改造成固定報價、時程、交付條件或保證。

Value 區塊只陳述品牌合作原則，連結 About 即可；不另複製完整創辦人介紹、憑空增加團隊規模或製作認證標章。

## 6. Content & Data Specification

### 6.1 文案來源、真實資料與狀態界線

| 類型 | 定義 | 本頁呈現方式 |
| --- | --- | --- |
| 已確認服務能力 | Task 005 及 S03／S04 支持的技術服務範圍 | 說明可提供的技術協助，連到既有 Services |
| 建議解決方案 | 根據需求組合能力的規劃方向 | 使用「可評估」「依需求規劃」「改善目標」語氣，標示為方案方向 |
| Demonstration Project | 自製、概念或展示專案 | 本次不展示作品卡片、Demo 畫面或 Live 按鈕；原始規劃只作情境參考 |
| Planned／In Development | 規劃中或尚在開發的項目 | 不改標為 Completed／Delivered，不推定已符合來源驗收條件 |
| 未實現產品／SaaS | XK AI Business Assistant 等未有正式上線證據的產品方向 | 不建立產品販售、試用、登入、訂閱、價格或產品功能頁 |

不得虛構客戶／合作夥伴、推薦、交付歷史、使用者數、效益百分比、AI 準確率、監控能力、合規認證、固定工期、價格、SLA 或 24/7 承諾。預期改善是設計目標，不是實證成果或保證。

保留 Task 004 的創辦人一人全職品牌定位，不新增團隊、人名、照片、年資、證照、地址或法人資訊。聯絡管道仍按 `src/config/contact.ts` 的確認資料處理，不將建議的 Email／LinkedIn 當成可用管道。

### 6.2 固定的四個解決情境

Cloud／部署是共同支援能力，不另湊第五項解決方案。以下是本任務的初始範圍；未來來源更新若要求改分類，先記錄差異與理由，不自行新增產業產品或套餐。

| Solution ID／Article ID | 中文／英文名稱 | 需求與目標語氣 | 必備 Services 對應 | 主要來源 |
| --- | --- | --- | --- | --- |
| `digital-presence`／`solution-digital-presence` | 數位品牌與企業網站 / Corporate Digital Presence | 資訊不易找到、手機體驗與維護不便；可規劃品牌內容及網站入口，讓資訊更清楚 | `website-development` | S02 §4–5、S03 §3、S12 §2 |
| `enterprise-management`／`solution-enterprise-management` | 企業內部管理與系統現代化 / Enterprise Systems Modernization | 人工或分散資料、既有 Java 系統維護需求；可評估管理流程、資料與權限邊界 | `java-enterprise`、`system-integration` | S02 §4–5、S03 §4–5、S13 §2／21 |
| `system-integration`／`solution-system-integration` | 跨系統資料整合與流程自動化 / System Integration & Workflow | 系統介面／資料格式不一致與重複輸入；可規劃 API、資料交換及流程銜接 | `system-integration`、`java-enterprise` | S03 §5–6、S14 §2／6 |
| `ai-workflow`／`solution-ai-workflow` | 企業知識與 AI 輔助應用 / AI-assisted Knowledge & Workflows | 文件分散、反覆搜尋與知識查詢；可評估 RAG、LLM 及既有流程整合 | `ai-automation`、`system-integration` | S03 §6、S08 §7／10、S17 §3／5 |

### 6.3 每個方案的內容契約

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

### 6.4 型別、集中設定與責任分工

使用既有 App Router、React Server Components、Strict TypeScript、`src/` 與 `@/*`。Page 只處理 Metadata 與區塊組合；內容置於 `src/config/solutions.ts`，元件位於 `src/components/sections/solutions/`。

內容設定至少定義以下明確型別，不使用 `any` 或鬆散的重複字串物件：

| 型別 | 必備欄位／限制 |
| --- | --- |
| `SolutionId` | 第 6.2 節四個 ID 的 literal union |
| `SolutionSource` | 來源代碼、Repository、路徑、Commit、Blob SHA、章節與支持內容 |
| `SolutionDefinition` | id、anchor、中文／英文名稱、summary、audience、challenges、positioning、technologies、implementationSteps、improvementGoals、serviceIds、sourceRefs、status |
| `SolutionCombination` | 標題、說明、solutionIds、serviceIds、sourceRefs、示例標籤 |
| `SolutionProcessStep` | 若未重用現有流程資料，定義名稱、中文標題與說明 |

`SolutionDefinition.status` 本次固定為 `proposed-direction`，畫面以「依需求規劃的方案方向」或等義文字清楚標示。它不是服務能力是否存在的判斷，也不是產品上線狀態。

`serviceIds` 重用 `src/config/services.ts` 的 `ServiceId`；名稱與 Services 錨點由既有 `serviceCategories` 解析，不另維護一份容易不一致的服務 URL 字串表。`sourceRefs` 必須能追溯第 3 節的來源、章節及所支持的說法；沒有可驗證來源的商業敘述不可加入。

同一份 Solution 資料驅動 Challenges 對應、Overview、Details 及 Technology 對照。Hero、組合、流程及 CTA 文案同樣集中；使用 `satisfies`／readonly 型別保持約束，不建立 CMS 或通用內容引擎。來源追溯主要供程式維護與實作紀錄使用，不將內部文件路徑堆到訪客操作流程。

新內容預設全部為 Server Components。沿用既有手機選單即可，不新增篩選器、搜尋、Tabs、輪播、Modal 或用假互動製造複雜度。

## 7. Design System & Technical Constraints

保留 Next.js App Router、React、Strict TypeScript、Tailwind CSS 4、shadcn/ui、Lucide React 與現有 Node.js／npm 架構，不重新初始化、升降級套件或任意修改 lockfile。遵循已安裝 Next.js 版本的文件與 AGENTS 指示。

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

新區塊預設為 Server Components；既有手機選單維持原必要互動，不為靜態內容建立不必要的 Client Components，也不建立平行 Design System、Backend 或外部執行服務。Semantic HTML、適當可及名稱、Focus、Reduced Motion 及靜態資源相容性必須依第 11 節實際驗收；建置成功不等同使用體驗或效能已被證實。

## 8. Navigation, SEO & Deployment

### 8.1 路由、有效連結與首頁整合

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

### 8.2 SEO 與 Metadata

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

### 8.3 GitHub Pages 與設定保護

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

## 9. File Structure & Change Scope

此清單只在**正式執行 Task 006**時生效；目前文件整理不建立以下功能產物。建議元件名稱如下，可調整合理拆分，但九主區塊、四 Article、資料責任與語意不可遺漏。

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
| 新增 | `docs/screenshots/task006-solutions-*.png` | 第 12.2 節七張真實截圖 |
| 修改 | `src/config/navigation.ts` | Solutions 正式路由及 implemented 狀態 |
| 修改 | `src/components/sections/home-solutions.tsx` | 保留舊動線，新增完整 Solutions 入口 |
| 修改 | `scripts/build-github-pages.mjs` | Solutions 產物與 Metadata 驗證 |
| 修改 | `README.md`、`AGENTS.md` | Task 006 操作、分支與驗收要求 |
| 追加 | `docs/implementation-notes.md` | 保留歷史前綴，追加 Task 006 實際紀錄 |

本任務不重新建立或刪除其他任務成果。現有 `docs/task/task006.md` 是規格輸入，不應為了滿足清單再次新增／覆寫；若正式開發發現必須修正規格，先記錄差異，不以改規格取代完成驗收。部署指南僅在操作確實改變時補充，保留其歷史紀錄。

不得修改網站 Dependencies、lockfile、Next 設定、package scripts、GitHub Actions workflow、其他 Repository、Pages Source、DNS 或 Custom Domain；必要擴充限本規格的元件、導覽、報告及靜態 Validator。不得提交 `.next/`、`out/`、node_modules、暫存工具、環境檔或機密。預計檔案不代表已新增，最終清單以正式實作的 Git Diff 為準。

## 10. Implementation Procedure

### 10.1 正式執行順序

1. 確認使用者已授權正式功能開發；重新檢查 Repository、Git 狀態、remote、最新 main 與 Task 005 合併祖先，不覆蓋既有工作。
2. 完整閱讀第 3 節文件與最新差異，記錄實際 Base、文件版本／Blob、可採用內容、衝突與未確認事項。
3. 從最新 main 建立或安全切換 `feature/website-solutions-page`，保留既有套件與架構。
4. 依第 5–9 節實作 typed config、頁面、共用整合及 Validator，不擴大功能範圍。
5. 完成程式碼後按下列順序執行五個品質命令、一般 production server、Pages 靜態產物及第 11 節全部 Required 驗收。
6. 修正問題並重新執行受影響與指定完整驗收，產生第 12 節真實截圖與獨立報告，不以第一次或舊結果代替最終結果。
7. 更新正式實作所需文件，核對完整 Git Diff、路徑、機密與產物；依第 13 節 Commit、Push 及建立待審核 PR。
8. 確認本次 head 的 CI 與 artifact，提供第 14 節交付與第 16 節最終狀態，不自動合併或發布。

### 10.2 一般品質與 Production Server

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

### 10.3 Pages Build 與靜態驗收

確認一般伺服器驗收完成並停止後，再執行：

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

## 11. Testing & Acceptance Criteria

以下適用於未來正式實作，**目前所有驗收均為 Pending**。Required 必須實際執行；Optional 執行與否及原因須記錄；Not Applicable 必須說明不適用原因，不可當作 PASS。原生停用控制若實際存在，對應測試轉為 Required。

### 11.1 Code Quality 與 Build

| 項目 | 等級 | 驗收標準與原因 | 目前狀態 |
| --- | --- | --- | --- |
| `npm ci` | Required | Exit Code 0，依既有 lockfile 安裝成功，沒有套件或 lockfile 非預期異動。原因：可重現的既有依賴是本任務前置約束。 | Pending |
| `npx tsc --noEmit` | Required | Exit Code 0。原因：驗證 Strict TypeScript 與資料／元件型別。 | Pending |
| `npm run lint` | Required | Exit Code 0，符合既有零警告策略。原因：保留專案靜態品質規則。 | Pending |
| `npm run build` | Required | Exit Code 0，Solutions 靜態預先產生且一般模式相容。原因：不得把 Pages 設定永久套入預設建置。 | Pending |
| `npm run build:pages` | Required | Exit Code 0，輸出及 Validators 通過。原因：正式目標是 GitHub Pages 靜態網站。 | Pending |

### 11.2 功能、瀏覽器與部署產物

| 項目 | 等級 | 驗收標準與原因 | 目前狀態 |
| --- | --- | --- | --- |
| 路由與結構 | Required | 一般／Pages 四頁 HTTP 200；Solutions 九個主 Section、四個 Article、四個 Overview、三組合及五流程。原因：確認固定資訊架構與既有頁面回歸。 | Pending |
| 內容來源 | Required | 四方案完整符合第 6.3 節，serviceIds／sourceRefs 有效；沒有無來源產品、客戶成果或承諾。原因：讓建議方案可追溯，避免誤作商業成果聲明。 | Pending |
| Metadata | Required | 第 8.2 節所有欄位與語言正確，單一 H1，沒有假 OG Image／Schema，四頁原有 noindex 政策保留。原因：保留 construction-stage 索引保護與頁面專屬 SEO。 | Pending |
| 全部有效連結 | Required | 收集四頁 Header／Footer／手機／內容的全部有效站內連結，逐一檢查 HTTP、目標 ID 與 Base Path，不只檢查 href 字串。原因：避免新路由破壞 Base Path 或既有錨點。 | Pending |
| 實際動線 | Required | 首頁→Solutions→四個 Article；Solutions→Services 對應五個錨點→About／首頁聯絡；刷新深層路徑仍正常。原因：確認訪客可從需求導向有效的服務與聯絡入口。 | Pending |
| Responsive | Required | 四頁 × 320／375／768／1440／1920px，至少 20 個案例；無水平溢出、重疊、裁切或無法閱讀的標籤。原因：四頁與指定五種寬度都是本次必要回歸範圍。 | Pending |
| 手機視覺 | Required | 320／375px Hero 最後一行及 CTA 完整，Logo 等比例，Details／技術對照／流程順序清楚，卡片間距一致。原因：防止標語、圖形與 CTA 被容器裁切。 | Pending |
| 手機操作 | Required | 至少 375px 觸控模擬實際點擊選單、方案卡與跨頁連結，不依賴 Hover；展開狀態與可及名稱正確。原因：觸控導覽不能依賴 Hover。 | Pending |
| 選單關閉 | Required | Escape 關閉並還原焦點，選連結、外部點擊與切換桌面斷點後關閉，重新回手機不殘留展開狀態。原因：保留既有 MobileNavigation 的互動與焦點契約。 | Pending |
| Keyboard／Focus | Required | Tab／Shift+Tab／Enter、Skip Link、方案卡與 CTA 均可操作，焦點可見；不把整頁鎖成 Modal。原因：確認不使用滑鼠也能完成導覽。 | Pending |
| Disabled | Not Applicable（預設；若有原生停用操作則 Required） | 若有原生停用操作，實測不觸發且 Tab 略過；若本頁沒有，記錄不適用，不新增假停用按鈕，也不對 Link 使用 disabled。原因：本頁沒有規劃停用操作；正式實作時確認適用性，不為驗收製造假控制項。 | Pending |
| Reduced Motion | Required | 啟用 prefers-reduced-motion，確認過渡為 0s／符合既有規則，無依賴動畫才能閱讀的內容。原因：維持既有減少動態偏好行為。 | Pending |
| axe | Required | 四頁五種寬度及 Solutions 在 320／375／768px 展開手機選單，執行 WCAG 2／2.1 A／AA 自動掃描；記錄實際案例與違規數。原因：驗證可自動判定的規則，並保留人工檢查要求。 | Pending |
| Console／Runtime／Network | Required | 無非預期錯誤、資源 404、字體／CSS／JS／SVG 載入失敗；預期未知路由／開發頁 404 以獨立 HTTP 檢查記錄，不掩蓋真正資源錯誤。原因：排除執行與資源載入失敗，不忽略真正錯誤。 | Pending |
| 靜態檔案 | Required | index／about／services／solutions HTML、404、.nojekyll、引用資源皆存在且路徑正確；無公開 dev 路由或 payload。原因：確認產物可在不依賴 Server Runtime 的環境託管。 | Pending |
| 遠端 CI | Required | 讀取本次 PR 的實際 head／run；quality、pages-build 成功，deploy skipped，Pages artifact 含 Solutions 並保留其他頁。原因：區分本機結果與該實作 head 的實際遠端證據。 | Pending |
| 404 與開發保護 | Required | 一般未知路由與預設 `/dev/design-system` HTTP 404；靜態 unknown route 狀態及輸出 `404.html` 可用，dev route／payload 不公開。原因：保留既有公開路由邊界，簡易靜態伺服器不完全模擬 Pages 自訂 404。 | Pending |
| `.nojekyll` | Required | `out/.nojekyll` 存在，保留 `_next` 資源。原因：沿用 Pages 的靜態發布保護。 | Pending |
| Pages Validators | Required | Solutions 的 HTML、Title、Canonical、OG、robots、Base Path 與引用資源通過，既有首頁／About／Services／404 驗證不降低。原因：新頁不得破壞已合併的靜態產物規則。 | Pending |
| 本機開發 Smoke | Optional | 可額外執行 `npm run dev` 檢查編輯體驗。原因：方便開發，但不取代一般 production server 與 Pages 靜態驗收。 | Pending（選擇不執行時記錄原因） |
| 額外瀏覽器／實體裝置 | Optional | 可補充其他瀏覽器或實體手機。原因：擴大相容性證據，不取代指定 Viewport 與觸控模擬。 | Pending（選擇不執行時記錄原因） |
| Backend／API／真實表單提交 | Not Applicable | 不建立 Backend、API 或聯絡表單，不以假的回應當作成功。原因：明確不在 Task 006 範圍。 | Pending（正式實作時記錄不適用確認） |

工具可放在應用套件之外，不為驗收新增專案 npm Dependencies。檢查 Heading、可及名稱、色彩對比、裝飾元素、Focus 與人工閱讀；自動 axe 結果不等同完整無障礙認證。任何失敗必須修正並重跑受影響及指定驗收，記錄真實限制，不能把預期結果寫為 Pass。

## 12. Test Report & Evidence

正式執行 Task 006 時，必須新增獨立實作與測試報告 `docs/solutions-implementation.md`。此路徑是未來交付要求，目前報告尚未建立；本輪文件整理不建檔，也不把它寫成已存在的 Markdown Link。

### 12.1 必備報告與真實證據

報告至少包含：

- 實際 Base Commit／Branch、文件 Repository Commit 與 Blob、四方案的來源對照、提案與產品界線、元件分工及完整新增／修改清單。
- 每個實際執行的完整命令與參數、Exit Code、執行日期／時間、作業系統、Node.js／npm／瀏覽器版本、一般或 Pages 模式、URL、Base Path、Viewport 及工具版本。
- 第 11 節每項 Required／Optional／Not Applicable 的適用性與原因，實際 PASS／FAIL／Pending；未執行不能寫成 PASS，不適用必須記錄確認原因。
- 五個品質命令的真實結果，一般 production server 與 Pages 靜態四頁結果，至少 20 個 Responsive 案例、觸控、全部有效連結與跨頁錨點的結果。
- axe 規則／案例／違規數、鍵盤、Focus、Disabled 適用性、Reduced Motion、人工閱讀、Browser Console／Runtime／Network 及資源載入結果。
- Pages HTML、Metadata、資源路徑、404、`.nojekyll`、開發頁排除、Validators 與 PR artifact 的實際證據。
- 每個發現的問題、錯誤訊息與影響範圍、修正內容、修正後重跑的命令／測試，以及最終重新驗收結果；有未解決項目時不得標記功能已完成。
- 真實截圖位置、PNG 實際尺寸、Viewport、對應內容與人工檢視結果；圖檔存在後才加入相對連結。
- 該實作 Commit／PR／CI Run 的實際識別碼與連結、各 Job 狀態、artifact 核對、未完成事項、環境或工具限制，以及是否部署的明確證據。

不得以預期結果、舊任務結果、文件標準化的 CI、不同 Commit 的 run 或推測內容代替 Task 006 的實際測試。限制應說明哪些測試未完成及原因，不得將限制自動轉為通過。

### 12.2 真實截圖與人工檢視

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

## 13. Git & Pull Request

以下僅適用**未來已授權正式執行 Task 006**的開發階段：

1. 從最新已合併 main 建立 `feature/website-solutions-page`。
2. 實作、文件與驗收完成後檢查完整 diff，確保沒有 `.next/`、`out/`、node_modules、暫存工具或機密資訊。
3. Conventional Commit 建議：`feat(solutions): implement XK solutions page`。
4. Push 功能分支，建立 `main ← feature/website-solutions-page` 的待審核 PR。
5. PR 說明問題與新行為、四方案及來源、Design System、檔案異動、導覽、SEO／Pages、每項實際測試、七張截圖與未完成事項。
6. 確認該 head 的 PR Checks 與靜態 artifact，不以別的 Commit 或舊 run 代替。
7. 不直接推送 main、不自動合併、不更改部署條件、不發布未經審核的功能分支。

Commit SHA、PR 編號、CI Run ID 與合併／發布狀態只能來自實際紀錄，不預填或虛構。以上是 Solutions 功能實作規則；文件骨架整理本身不觸發此 Feature PR 流程，其 Git 交付遵循當次使用者對文件工作的明確授權。

## 14. Deliverables

正式實作交付時提供以下實際成果；目前 Solutions 頁未實作，以下全部為 Pending，不因本輪文件整理或文件 CI 通過而視為完成。

| 交付項目 | 必備內容 | 目前狀態 |
| --- | --- | --- |
| Solutions 功能 | `/solutions` 九主 Section、四 Article、四 Overview、三組合、五流程及全部指定文案／狀態界線 | Pending |
| 共用整合 | Header／Footer／Mobile Navigation、首頁新入口、四頁回歸及保留舊錨點 | Pending |
| 檔案與 Design System | 第 9 節實際新增／修改清單、typed config 與來源、原 Tokens／Logo／依賴保護 | Pending |
| 獨立實作／測試報告 | `docs/solutions-implementation.md`，涵蓋第 11–12 節全部結果與限制 | Pending |
| 截圖 | 七份指定真實 PNG 與人工檢視證據，必要時增加分段圖 | Pending |
| Git Commit／PR | 已推送 `feature/website-solutions-page`、真實 Commit SHA 與待審核 PR URL | Pending |
| CI 與 artifact | 該 head 的 quality／pages-build 成功、deploy skipped、含 Solutions 的 Pages artifact 已核對 | Pending |
| 最終交付回報 | 繁體中文說明功能、來源、全部檔案、測試、截圖、Git／PR／CI、未完成與部署狀態 | Pending |

最終以繁體中文回報上述項目及是否已部署。預設此階段僅有待審核 PR；只有另有明確授權與實際 main deploy 成功證據、對應 Commit 及公開站驗證，才能宣稱上線。不得虛構 PR、SHA、Actions Run ID 或發布狀態。

## 15. Out of Scope & Future Work

正式聯絡管道、最終 Logo／OG 素材核准、產品與 Demo 真實進度、可公開客戶授權、價格／工期／SLA、正式中文品牌、正式網域與搜尋索引仍待後續確認。缺少這些資料時採本規格的保守呈現，不阻擋有來源的靜態頁，但不可自行補造。

Solutions 明細頁、Portfolio、Contact、Privacy、正式 AI 產品、CMS 與 Backend 均屬後續任務，不能以本任務名義提前實作。

第 3 節列出的缺漏、建議套餐、中文品牌或生成範例，不因本規格正式化而轉為核准事實。頁面尚未實作，實作報告、七張截圖、功能 Commit／PR／CI 與上線證據也仍為 Pending。不得以文件或既有網站的發布結果冒充 Solutions 發布。

## 16. Final Delivery Checklist

以下每項都屬未來 Solutions 功能交付，保持未勾選且為 **Pending**。規格完成、本輪文件重構、文件 Commit／PR／合併或文件 CI，均不是 Solutions 功能、測試或部署完成的證據。

- [ ] Pending — 前置 Task 005 合併、最新 main、實際 Base SHA、工作目錄與文件來源／衝突已確認。
- [ ] Pending — `/solutions` 九主 Section、四 Article、四 Overview、三組合、五流程與指定文案實作完成。
- [ ] Pending — Services 能力與建議方案有清楚區分；沒有假案例、Demo 完成宣稱或商用 SaaS 假聲明。
- [ ] Pending — typed config、來源追溯、ServiceId、Design System、原稿 Logo 與現有依賴均保留。
- [ ] Pending — 共用導覽、首頁入口、所有舊錨點、四頁及五個 Services 錨點正常。
- [ ] Pending — `npm ci` 已實際完成，套件與 lockfile 未擅自改動。
- [ ] Pending — `npx tsc --noEmit` 通過。
- [ ] Pending — `npm run lint` 通過。
- [ ] Pending — `npm run build` 與新啟的一般 production server 驗收通過。
- [ ] Pending — `npm run build:pages`、靜態四頁、Metadata／Canonical／Open Graph／語言／noindex、Base Path、資源、404、`.nojekyll`、開發排除及 Validators 通過。
- [ ] Pending — 功能、所有有效連結、跨頁操作、例外狀態與首頁／About／Services 回歸完成。
- [ ] Pending — 四頁 × 五寬至少 20 個 Responsive 案例、375px 觸控與手機選單關閉行為驗收完成。
- [ ] Pending — axe、Keyboard、Skip Link、Focus、Reduced Motion、Disabled 適用性及人工無障礙檢查完成。
- [ ] Pending — Browser Console／Runtime／Network／靜態資源與 HTTP Status 驗收完成，沒有未處理錯誤。
- [ ] Pending — 七份真實截圖、PNG 尺寸、對應內容與人工視覺檢視完成。
- [ ] Pending — 獨立實作與測試報告完成，問題修正、修正後重驗、未完成事項與限制均有實際紀錄。
- [ ] Pending — 完整 Git Diff 已核對，無 `.next/`、`out/`、node_modules、暫存工具或機密；未修改其他 Repository、未擅自更改 workflow／部署條件或新增 Backend／API／CMS／Analytics。
- [ ] Pending — Feature Commit 已完成並推送，真實 SHA 可查。
- [ ] Pending — 以 main 為 Base 的待審核 PR 已建立，未自動合併或發布。
- [ ] Pending — 該 head 的實際 CI 與 Pages artifact 已確認，不沿用舊 run 或文件 CI。
- [ ] Pending — 最終繁體中文交付報告完成，部署狀態以實際授權及發布／公開站證據說明。
