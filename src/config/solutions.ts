import type { ServiceId } from "@/config/services";
import { siteConfig } from "@/config/site";

export type SolutionId =
  | "digital-presence"
  | "enterprise-management"
  | "system-integration"
  | "ai-workflow";

export type SolutionSourceId =
  | "S01" | "S02" | "S03" | "S04" | "S05" | "S06"
  | "S07" | "S08" | "S09" | "S10" | "S11" | "S12"
  | "S13" | "S14" | "S15" | "S16" | "S17";

export type SolutionSource = {
  readonly id: SolutionSourceId;
  readonly repository: "xk2022/xplore-kaleidoscope";
  readonly path: `doc/01_business-plan/${string}`;
  readonly commit: string;
  readonly blobSha: string;
  readonly sections: readonly string[];
  readonly supports: string;
};

export type SolutionSourceReference = {
  readonly sourceId: SolutionSourceId;
  readonly sections: readonly string[];
  readonly supports: string;
};

export type SolutionTechnology = {
  readonly name: string;
  readonly fromServiceId: ServiceId;
  readonly sourceRefs: readonly SolutionSourceReference[];
};

export type SolutionImplementationStep = {
  readonly title: string;
  readonly description: string;
};

type TwoOrThree<T> = readonly [T, T] | readonly [T, T, T];
type SolutionLink = {
  readonly label: string;
  readonly href: "/services" | "/#contact" | "/about" | `#${string}`;
};

export type SolutionDefinition = {
  readonly id: SolutionId;
  readonly anchor: `solution-${SolutionId}`;
  readonly title: string;
  readonly englishTitle: string;
  readonly summary: string;
  readonly audience: string;
  readonly challengeTitle: string;
  readonly challenges: TwoOrThree<string>;
  readonly positioning: string;
  readonly technologies: readonly SolutionTechnology[];
  readonly implementationSteps: readonly [
    SolutionImplementationStep,
    SolutionImplementationStep,
    SolutionImplementationStep,
  ];
  readonly improvementGoals: TwoOrThree<string>;
  readonly deliverables: TwoOrThree<string>;
  readonly serviceIds: readonly ServiceId[];
  readonly sourceRefs: readonly SolutionSourceReference[];
  readonly status: "proposed-direction";
  readonly cta: SolutionLink;
};

export type SolutionCombination = {
  readonly title: string;
  readonly description: string;
  readonly solutionIds: readonly SolutionId[];
  readonly serviceIds: readonly ServiceId[];
  readonly sourceRefs: readonly SolutionSourceReference[];
  readonly label: "需求組合示例";
};

const documentationRepository = "xk2022/xplore-kaleidoscope";
const documentationCommit = "95ef1275a46ace76e11f668178ca881087483398";

/**
 * Task 006 §3.2 source inventory, verified against the read-only Git blob snapshot.
 * These are planning references, not approval of products, outcomes or customer work.
 * Source metadata stays with configuration; visitor-facing content uses the supported
 * needs and capabilities, without publishing private documentation links.
 */
export const solutionSources = [
  {
    id: "S01", repository: documentationRepository,
    path: "doc/01_business-plan/week-01/00_company-profile.md",
    commit: documentationCommit, blobSha: "249dda3bc464c7fae497e037d8a9916ed93893e7",
    sections: ["§1 Company Overview", "§2 Brand Identity", "§6 Core Values", "§8 Target Markets", "§10 Technology Stack"],
    supports: "一人全職品牌、企業客群與 Web／Java／AI 整合方向；產品願景與營收目標不作已實現成果。",
  },
  {
    id: "S02", repository: documentationRepository,
    path: "doc/01_business-plan/week-01/01_brand-positioning.md",
    commit: documentationCommit, blobSha: "f30594dbf9545a4f19c265845632667b776bdeba",
    sections: ["§4 Ideal Customer Profiles", "§5 Customer Problems"],
    supports: "舊網站、Java 舊系統、分散應用、重複工作與知識搜尋需求；是一般需求情境，不表示已有這些客戶。",
  },
  {
    id: "S03", repository: documentationRepository,
    path: "doc/01_business-plan/week-01/02_service-catalog.md",
    commit: documentationCommit, blobSha: "cc1c2bacbc1f5367667005a9d4a3b288fc8cfd0c",
    sections: ["§3 Website Development", "§4 Java Enterprise Solutions", "§5 System Architecture & Integration", "§6 AI Business Solutions"],
    supports: "網站、Java、API／資料架構、RAG 與工作流程能力；建議價格、交付清單及 SaaS 訂閱不是本頁承諾。",
  },
  {
    id: "S04", repository: documentationRepository,
    path: "doc/01_business-plan/week-01/02_服務項目.md",
    commit: documentationCommit, blobSha: "ff5ea5a95a88388be1a4f4963f442b716775c225",
    sections: ["§2 網站建置", "§3 Java 企業系統", "§4 系統架構與整合", "§5 AI 商業解決方案", "§6 維護服務"],
    supports: "各服務適用需求、部署規劃與維護支援；支援條件須個別確認，不採未核准產品或固定服務條件。",
  },
  {
    id: "S05", repository: documentationRepository,
    path: "doc/01_business-plan/week-01/04_revenue-modelg.md",
    commit: documentationCommit, blobSha: "2c538f06602a382770843abc85bbfd1322204552",
    sections: ["§1 Business Revenue Strategy", "§11 Founder Capacity Management", "§16 Strategic Principles"],
    supports: "服務先行、保護一人交付範圍及可重用元件；營收、工時、產品與客戶數均是規劃，不作成果或時程保證。",
  },
  {
    id: "S06", repository: documentationRepository,
    path: "doc/01_business-plan/week-02/01_brand-identity_品牌視覺識別規範.md",
    commit: documentationCommit, blobSha: "19378775e986d5c8e002035685668d381532cae4",
    sections: ["§1.1 品牌基本資訊", "§1.5 品牌核心價值", "§2 品牌視覺設計理念", "§8 Next.js 前端實作規範"],
    supports: "英文品牌與標語、幾何視覺及可維護架構；沿用已合併 Tokens／原始暫定 Logo，不採另一組色票或未定中文名。",
  },
  {
    id: "S07", repository: documentationRepository,
    path: "doc/01_business-plan/week-02/05_website-sitemap_ 官方網站資訊架構與網站地圖.md",
    commit: documentationCommit, blobSha: "1f1b4584bbe06f0079542eedffa52215024da0f7",
    sections: ["§4 第一階段網站頁面", "§6.3 Core Services", "§6.5 Selected Projects"],
    supports: "服務與產品分開、網站資訊目的與 Demo 邊界；未實作路由與來源中的未來頁面不發布為有效連結。",
  },
  {
    id: "S08", repository: documentationRepository,
    path: "doc/01_business-plan/week-02/06_homepage-copywriting_官方網站首頁文案規劃.md",
    commit: documentationCommit, blobSha: "4f7173ae5ace721b9487df5500ff008e537c183d",
    sections: ["§7 Business Challenges", "§10.3 AI 應用場景", "§10.4 XK AI Business Assistant", "§13 Working Process"],
    supports: "企業需求、知識檢索／RAG／工作流程與合作討論；Assistant 是待驗證產品方向，舊流程不取代 Task 005 五階段。",
  },
  {
    id: "S09", repository: documentationRepository,
    path: "doc/01_business-plan/week-02/08_website-architecture_官方網站 Next.js 技術架構設計.md",
    commit: documentationCommit, blobSha: "15c1483bf47be33bc29b755a220fb465b5dd8a1a",
    sections: ["§6 網站 UI 與元件架構", "§9 Server Components 與 Client Components", "§10 設定檔與內容管理"],
    supports: "區塊分工、Server Components 與集中設定；不採舊 monorepo、Backend、範例信箱或尚未存在的服務路由。",
  },
  {
    id: "S10", repository: documentationRepository,
    path: "doc/01_business-plan/week-02/09_website-mvp_官方網站 MVP 開發規格.md",
    commit: documentationCommit, blobSha: "5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d",
    sections: ["§6.5 Solutions Section"],
    supports: "企業數位、整合、知識與自動化方向；AI Assistant 只作產品概念，不表示已正式提供功能。",
  },
  {
    id: "S11", repository: documentationRepository,
    path: "doc/01_business-plan/week-03/01_portfolio-strategy_XK 技術作品展示策略.md",
    commit: documentationCommit, blobSha: "88103f938cfb421878de414194db4b981ec5c024",
    sections: ["§2.1 初期展示策略", "§2.2 Portfolio Development Principles", "§3 Portfolio Project Overview"],
    supports: "以商業問題組織技術方向、保持可維護性與自製展示標示；展示計畫不等於客戶成果或已完成系統。",
  },
  {
    id: "S12", repository: documentationRepository,
    path: "doc/01_business-plan/week-03/02_case-01-corporate-website.md",
    commit: documentationCommit, blobSha: "c9b151d01a7616abb939dd9747d704428d0bdd8c",
    sections: ["§2.1 目標客戶", "§2.2 Business Challenges", "§2.3 Proposed Solution", "§2.4 Expected Business Value"],
    supports: "手機瀏覽、品牌資訊、SEO 與維護需求；只借用一般情境，不宣稱完整 Case 01 或其 Contact API 已交付。",
  },
  {
    id: "S13", repository: documentationRepository,
    path: "doc/01_business-plan/week-03/03_case-02-java-enterprise-system.md",
    commit: documentationCommit, blobSha: "4b338c79ac83db44307832754404a28496303189",
    sections: ["§2 Business Scenario", "§21 Commercial Service Mapping"],
    supports: "人工作業、分散資料、權限與 Java 現代化需求；不把相異模組摘要合併成已完成 ERP 或管理產品。",
  },
  {
    id: "S14", repository: documentationRepository,
    path: "doc/01_business-plan/week-03/04_case-03-api-integration-platform.md",
    commit: documentationCommit, blobSha: "be1dbacf99ac76d5032ca6cecf221a9a000ff89b",
    sections: ["§2 Business Scenario", "§5.5 Integration Monitoring", "§5.7 Future AI Integration", "§6 Integration Scenarios", "§21 Future Enhancements"],
    supports: "資料孤島、介面差異與模擬資料交換情境；不宣稱 Integration Hub 已運行、企業級監控／SLA 或後續 AI／n8n 已整合。",
  },
  {
    id: "S15", repository: documentationRepository,
    path: "doc/01_business-plan/week-03/05_portfolio-content.md",
    commit: documentationCommit, blobSha: "e9aae178cdcef6afca313fde3cd501bd533ee028",
    sections: ["§3 Week 03 Portfolio Projects", "§6.8 Project Status", "§9 Portfolio Content Guidelines"],
    supports: "三例為 Planned／In Development，Live 需真實部署；技術摘要不能用來證明任何示例功能已整合或完成。",
  },
  {
    id: "S16", repository: documentationRepository,
    path: "doc/01_business-plan/week-03/README.md",
    commit: documentationCommit, blobSha: "aaf4dae6b3e80f485fd9a98dd76637a10dc9e561",
    sections: ["§3 三個展示案例", "§7.1 Solo Founder Development", "§7.4 Demo Data"],
    supports: "一般網站技術、模組化維護與 Demo 資料界線；KPI 是目標，展示技術清單不是完成測試證據。",
  },
  {
    id: "S17", repository: documentationRepository,
    path: "doc/01_business-plan/week-01/05_customer-development.md",
    commit: documentationCommit, blobSha: "8cf9ca6d6111c6031202944ff4b8f345b75f3c22",
    sections: ["§3 Target Customer Segments", "§5 Customer Pain Points", "§15 Customer Development for XK AI Business Assistant"],
    supports: "中小企業、傳統企業、專業服務業需求與知識搜尋；訪談、Pilot 與付費意願仍需驗證，不宣稱已有客戶。",
  },
] as const satisfies readonly SolutionSource[];

/** One registry drives challenges, overview, full details and technology mapping. */
export const solutionDefinitions = [
  {
    id: "digital-presence", anchor: "solution-digital-presence",
    title: "數位品牌與企業網站", englishTitle: "Corporate Digital Presence",
    summary: "整理品牌與服務資訊，規劃清楚、適合不同裝置的企業網站入口。",
    audience: "適合需要建立或改版官方網站、整理服務資訊的中小企業與專業服務品牌。",
    challengeTitle: "重要資訊不易找到，手機瀏覽與內容維護不便。",
    challenges: ["品牌與服務資訊分散，訪客不易理解重點。", "既有網站在手機上難以閱讀或操作。", "頁面結構不易維護，內容與 SEO 基礎需要重新整理。"],
    positioning: "可從訪客需要找到的資訊出發，評估內容架構、響應式介面與可維護前端，依企業當前階段規劃合適的網站範圍。",
    technologies: [
      { name: "Next.js／React", fromServiceId: "website-development", sourceRefs: [{ sourceId: "S16", sections: ["§3.1 Case 01"], supports: "企業網站展示規劃列出的前端技術；此處僅作網站服務能力方向。" }] },
      { name: "TypeScript", fromServiceId: "website-development", sourceRefs: [{ sourceId: "S01", sections: ["§10 Technology Stack"], supports: "可維護網站前端的型別工具方向。" }] },
      { name: "RWD／SEO 基礎", fromServiceId: "website-development", sourceRefs: [{ sourceId: "S12", sections: ["§2.2–2.4"], supports: "手機體驗、SEO 結構與元件化維護的問題及規劃方向。" }] },
    ],
    implementationSteps: [
      { title: "了解資訊與使用情境", description: "整理目標訪客、品牌內容、現有頁面與需要保留的使用動線。" },
      { title: "規劃內容與前端架構", description: "討論資訊層級、響應式版面、元件與必要的 SEO 基礎。" },
      { title: "分階段實作與驗證", description: "依確認範圍建置頁面，檢查不同裝置的閱讀、導覽與後續維護方式。" },
    ],
    improvementGoals: ["讓訪客更容易理解品牌與服務資訊。", "改善不同裝置的閱讀與導覽體驗。", "建立較清楚的內容維護與擴充基礎。"],
    deliverables: ["資訊架構與頁面範圍規劃", "約定範圍內的響應式網站與前端元件", "建置、驗收與內容維護說明"],
    serviceIds: ["website-development"],
    sourceRefs: [
      { sourceId: "S02", sections: ["§4–5"], supports: "舊企業網站與企業對外資訊需求。" },
      { sourceId: "S03", sections: ["§3 Website Development"], supports: "企業網站、RWD、Next.js 與維護能力。" },
      { sourceId: "S12", sections: ["§2 Business Scenario"], supports: "資訊、手機、SEO 與維護問題，以及一般規劃方向；不是已交付案例。" },
    ],
    status: "proposed-direction", cta: { label: "討論網站需求", href: "/#contact" },
  },
  {
    id: "enterprise-management", anchor: "solution-enterprise-management",
    title: "企業內部管理與系統現代化", englishTitle: "Enterprise Systems Modernization",
    summary: "從商業流程、資料與權限出發，評估 Java 應用及既有系統的調整方向。",
    audience: "適合仍依賴人工或分散資料，或需要維護、擴充既有 Java 系統的企業。",
    challengeTitle: "人工作業與舊系統，讓資料及管理流程難以銜接。",
    challenges: ["資料散落於試算表或不同應用，查詢與核對不便。", "既有系統的商業邏輯不易維護或擴充。", "使用者角色、權限與資料邊界需要釐清。"],
    positioning: "可先梳理實際業務流程與系統限制，再評估 Java 應用、資料結構及介面調整；以分階段現代化為方向，不預設必須重建全部系統。",
    technologies: [
      { name: "Java／Spring Boot", fromServiceId: "java-enterprise", sourceRefs: [{ sourceId: "S03", sections: ["§4 Java Enterprise Solutions"], supports: "Java 應用與 Spring Boot 開發、既有系統現代化能力。" }] },
      { name: "REST API", fromServiceId: "java-enterprise", sourceRefs: [{ sourceId: "S13", sections: ["§21 Commercial Service Mapping"], supports: "管理流程與其他系統之間的 API 設計方向。" }] },
      { name: "資料模型與整合", fromServiceId: "system-integration", sourceRefs: [{ sourceId: "S03", sections: ["§4–5"], supports: "資料庫設計、資料整合及系統架構能力。" }] },
    ],
    implementationSteps: [
      { title: "了解流程與既有系統", description: "確認日常作業、資料來源、使用角色及必須保留的系統限制。" },
      { title: "規劃資料與介面邊界", description: "評估商業邏輯、權限、資料模型與必要 API，討論可逐步調整的範圍。" },
      { title: "逐步實作與流程驗證", description: "按約定範圍開發或調整，驗證資料、權限與業務流程，再討論後續擴充。" },
    ],
    improvementGoals: ["讓業務流程與資料責任更清楚。", "減少需要反覆人工核對的環節。", "為既有系統維護與後續擴充建立基礎。"],
    deliverables: ["業務流程、資料與介面範圍規劃", "約定範圍內的 Java 應用、功能調整或 API", "測試紀錄與技術維護文件"],
    serviceIds: ["java-enterprise", "system-integration"],
    sourceRefs: [
      { sourceId: "S02", sections: ["§4–5"], supports: "傳統企業 Java 舊系統與人工、分散應用需求。" },
      { sourceId: "S03", sections: ["§4–5"], supports: "Java、API、資料與系統架構能力。" },
      { sourceId: "S13", sections: ["§2", "§21"], supports: "分散資料、人工作業與權限問題；不將示例模組當現成管理產品。" },
    ],
    status: "proposed-direction", cta: { label: "討論系統需求", href: "/#contact" },
  },
  {
    id: "system-integration", anchor: "solution-system-integration",
    title: "跨系統資料整合與流程自動化", englishTitle: "System Integration & Workflow",
    summary: "釐清系統介面與資料流向，評估 API、資料交換及重複作業的銜接方式。",
    audience: "適合已有多套資訊系統，需要交換資料或整理跨系統流程的企業。",
    challengeTitle: "系統各自運作，資料交換仍仰賴重複輸入。",
    challenges: ["不同系統的介面、資料格式與欄位定義不一致。", "資料需要人工轉移或重複輸入，核對成本不易掌握。", "交換流程與失敗處理缺少清楚的責任邊界。"],
    positioning: "可從來源、目的與資料責任出發，規劃 API 串接、格式轉換及流程銜接；依現有介面與限制評估自動化，不預設每個流程都需要 AI。",
    technologies: [
      { name: "API Integration", fromServiceId: "system-integration", sourceRefs: [{ sourceId: "S03", sections: ["§5 System Architecture & Integration"], supports: "既有系統與 API 介面的整合能力。" }] },
      { name: "資料轉換與驗證", fromServiceId: "system-integration", sourceRefs: [{ sourceId: "S14", sections: ["§6.1–6.3"], supports: "模擬資料交換的欄位映射、格式轉換與驗證方向。" }] },
      { name: "Java／REST API", fromServiceId: "java-enterprise", sourceRefs: [{ sourceId: "S14", sections: ["§2.4 Expected Business Value"], supports: "以 Java、REST API 支援企業介面與整合規劃；不是現成 Hub。" }] },
    ],
    implementationSteps: [
      { title: "盤點系統與資料責任", description: "了解資料從何而來、流向何處，以及介面權限、格式與現有作業限制。" },
      { title: "規劃交換與處理流程", description: "討論 API 契約、欄位轉換、驗證與失敗處理，確認整合範圍。" },
      { title: "分段串接與情境驗證", description: "以約定情境逐步驗證資料交換、錯誤回應與人工處理方式。" },
    ],
    improvementGoals: ["減少跨系統重複輸入的需求。", "讓資料交換規則與處理狀態更容易理解。", "建立可維護的介面與流程邊界。"],
    deliverables: ["系統介接、資料欄位與交換流程規劃", "約定範圍內的 API 串接、資料轉換與驗證", "整合測試紀錄與操作文件"],
    serviceIds: ["system-integration", "java-enterprise"],
    sourceRefs: [
      { sourceId: "S03", sections: ["§5–6"], supports: "系統架構、API、資料整合與工作流程能力。" },
      { sourceId: "S14", sections: ["§2", "§6"], supports: "資料孤島、介面差異與模擬交換情境；不宣稱 Hub 或其後續 AI／n8n 已完成。" },
    ],
    status: "proposed-direction", cta: { label: "討論整合需求", href: "/#contact" },
  },
  {
    id: "ai-workflow", anchor: "solution-ai-workflow",
    title: "企業知識與 AI 輔助應用", englishTitle: "AI-assisted Knowledge & Workflows",
    summary: "依資料來源與工作情境，評估知識檢索、LLM 與既有流程的結合方式。",
    audience: "適合文件與知識分散、需要反覆搜尋資訊，並希望評估 AI 應用的企業或專業服務組織。",
    challengeTitle: "文件分散，反覆搜尋與知識查詢占用工作時間。",
    challenges: ["企業文件分散於不同來源，查詢時需要來回比對。", "重複資訊處理與現有工作流程尚未銜接。", "資料可用性、回答依據與人工確認方式需要先釐清。"],
    positioning: "可先確認可使用的知識來源、資料權限與查詢目的，再評估 RAG、LLM 及既有系統整合；保留人工確認與分階段驗證，不將 AI 回答視為必然正確的結果。",
    technologies: [
      { name: "RAG／知識檢索", fromServiceId: "ai-automation", sourceRefs: [{ sourceId: "S03", sections: ["§6 AI Business Solutions"], supports: "企業知識庫與 Retrieval-Augmented Generation 能力方向。" }] },
      { name: "LLM／AI API Integration", fromServiceId: "ai-automation", sourceRefs: [{ sourceId: "S01", sections: ["§10 Technology Stack"], supports: "相容 LLM 模型 API 的技術方向。" }, { sourceId: "S03", sections: ["§6"], supports: "AI API 整合能力，不代表已上線的 AI 產品。" }] },
      { name: "既有系統與流程整合", fromServiceId: "system-integration", sourceRefs: [{ sourceId: "S08", sections: ["§10.3 AI 應用場景"], supports: "知識查詢、自動化及 AI 與既有系統的結合方向。" }] },
    ],
    implementationSteps: [
      { title: "了解資料與查詢情境", description: "確認知識來源、使用權限、重複作業與需要人工判斷的界線。" },
      { title: "規劃檢索與應用流程", description: "評估資料整理、檢索、模型 API 與既有系統的銜接方式，確認驗證範圍。" },
      { title: "小範圍實作與人工驗證", description: "依確認的情境驗證檢索與回答依據，保留人工確認並評估是否擴充。" },
    ],
    improvementGoals: ["讓分散知識更容易查詢與追溯來源。", "減少重複搜尋及資訊整理的步驟。", "評估 AI 能力如何融入既有流程並保留人工確認。"],
    deliverables: ["使用情境、資料來源與人工確認邊界規劃", "約定範圍內的 AI 輔助流程或概念驗證", "情境評估紀錄與使用說明"],
    serviceIds: ["ai-automation", "system-integration"],
    sourceRefs: [
      { sourceId: "S03", sections: ["§6 AI Business Solutions"], supports: "RAG、知識庫、AI API 與流程能力。" },
      { sourceId: "S08", sections: ["§7", "§10.3–10.4"], supports: "知識搜尋與既有流程整合方向，產品仍須驗證。" },
      { sourceId: "S17", sections: ["§3", "§5", "§15"], supports: "專業服務與企業知識需求，先驗證情境再考慮產品範圍。" },
    ],
    status: "proposed-direction", cta: { label: "討論 AI 應用需求", href: "/#contact" },
  },
] as const satisfies readonly SolutionDefinition[];

export const solutionCombinations = [
  {
    title: "企業網站＋部署規劃",
    description: "網站資訊入口配合合適的運行與交付環境，依內容、使用需求與維護範圍共同評估。",
    solutionIds: ["digital-presence"], serviceIds: ["website-development", "cloud-infrastructure"],
    sourceRefs: [{ sourceId: "S03", sections: ["§3 Website Development"], supports: "企業網站與部署協助方向。" }, { sourceId: "S04", sections: ["§4", "§6"], supports: "部署規劃與維護支援；不承諾託管產品或 SLA。" }],
    label: "需求組合示例",
  },
  {
    title: "Java 應用＋API／資料整合",
    description: "將管理流程與跨系統資料交換一起規劃，先釐清商業邏輯、介面及資料責任。",
    solutionIds: ["enterprise-management", "system-integration"], serviceIds: ["java-enterprise", "system-integration"],
    sourceRefs: [{ sourceId: "S03", sections: ["§4–5"], supports: "Java、API 與資料整合服務的組合。" }, { sourceId: "S13", sections: ["§21"], supports: "管理應用與整合的技術方向，不是現成 ERP。" }],
    label: "需求組合示例",
  },
  {
    title: "AI 輔助查詢＋既有系統整合",
    description: "依資料來源與使用流程評估知識檢索及自動化，確認回答依據、權限與人工處理方式。",
    solutionIds: ["ai-workflow", "system-integration"], serviceIds: ["ai-automation", "system-integration"],
    sourceRefs: [{ sourceId: "S03", sections: ["§5–6"], supports: "既有系統整合、AI API 與知識檢索能力。" }, { sourceId: "S08", sections: ["§10.3"], supports: "AI 與文件、企業系統及工作流程的組合方向。" }],
    label: "需求組合示例",
  },
] as const satisfies readonly SolutionCombination[];

export const solutionsValuePrinciples = [
  {
    title: "先理解商業需求",
    description: "先討論目前問題、使用情境與限制，再決定需要組合哪些技術能力。",
    sourceRefs: [{ sourceId: "S17", sections: ["§3", "§5"], supports: "由企業需求與問題出發的規劃方向。" }],
  },
  {
    title: "跨能力整合思考",
    description: "把介面、系統、資料與 AI 放在同一個工作流程中評估，依需求選擇範圍。",
    sourceRefs: [{ sourceId: "S01", sections: ["§6 Core Values"], supports: "整合網站、系統、資料與 AI 的品牌原則。" }],
  },
  {
    title: "重視可維護性",
    description: "以清楚的元件、資料與介面邊界，為後續調整與階段性擴充保留空間。",
    sourceRefs: [{ sourceId: "S06", sections: ["§1.5", "§8.2"], supports: "可維護架構及元件重用原則。" }, { sourceId: "S16", sections: ["§7.1–7.2"], supports: "模組化、責任分工及避免過度設計。" }],
  },
  {
    title: "直接技術溝通",
    description: "由一人全職技術品牌直接討論需求、選擇與限制，依個別專案確認範圍與合作方式。",
    sourceRefs: [{ sourceId: "S01", sections: ["§1 Company Overview", "§2 Brand Identity"], supports: "一人全職品牌定位。" }, { sourceId: "S05", sections: ["§11", "§16"], supports: "依可承擔範圍確認合作，不做固定產能與交付保證。" }],
  },
] as const satisfies readonly {
  title: string;
  description: string;
  sourceRefs: readonly SolutionSourceReference[];
}[];

export const solutionsPage = {
  directionLabel: "依需求規劃的方案方向",
  hero: {
    title: "從企業需求出發，規劃合適的數位解決方案。",
    englishTitle: "Digital Solutions for Business",
    description: `${siteConfig.abbreviation} 從企業的資訊、系統與工作流程需求出發，結合網站、Java、API 整合與 AI 應用能力，協助評估適合的數位解決方案方向。`,
    primaryCta: { label: "探索解決方案", href: "#solutions-overview" },
    secondaryCta: { label: "了解技術服務", href: "/services" },
  },
  challenges: {
    title: "先理解問題，再選擇合適的技術。",
    description: "從網站資訊、內部管理、資料交換到知識查詢，整理企業可能需要討論的需求與限制。",
  },
  overview: {
    title: "以企業需求，找到方案的起點。",
    description: "四個方向可依實際需求組合。以下是能力與規劃的介紹，實作範圍及合作方式需個別確認。",
  },
  details: {
    title: "從情境到實施，逐步確認方向。",
    description: "先理解需要改善的流程，再評估技術與執行範圍。改善目標是討論方向，需依實際條件驗證。",
  },
  technology: {
    title: "讓每一項技術，都回到實際需求。",
    description: "依同一份方案資料對照需求、相關能力與 Services；技術選擇以使用情境及既有系統限制為依據。",
    support: {
      title: "共同支援：部署與維護規劃",
      description: "各方向可依應用需求評估運行環境、交付流程及後續維護範圍，支援條件需個別確認。",
      serviceId: "cloud-infrastructure",
      sourceRefs: [{ sourceId: "S04", sections: ["§4", "§6"], supports: "雲端部署規劃與維護支援；不是第五個產品或託管保證。" }],
    },
  },
  combinations: {
    title: "依需求組合能力，銜接不同環節。",
    description: "以下為需求組合示例，用於說明規劃方式，不代表已交付的客戶案例或固定套餐。",
  },
  approach: {
    title: "讓需求、範圍與下一步持續清楚。",
    description: "沿用需求了解、規劃、開發、測試交付與後續改善五階段；報價、工期、交付與支援條件依個別專案確認。",
  },
  value: {
    title: "以清楚溝通，連結需求與技術。",
    description: "理解問題、整合能力與重視維護，是 XK 規劃合作的原則。",
  },
  cta: {
    title: "從理解需求，開始規劃下一步。",
    description: "可以先整理目前問題與希望改善的流程，再依需求確認範圍與合作方式。正式聯絡管道以首頁已確認的資訊為準。",
    primaryCta: { label: "前往聯絡資訊", href: "/#contact" },
    secondaryCta: { label: "了解服務", href: "/services" },
    aboutLink: { label: "認識 XK", href: "/about" },
  },
} as const;
