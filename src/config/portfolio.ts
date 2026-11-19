import { contactNavigation } from "@/config/navigation";
import type { ServiceId } from "@/config/services";

export type PortfolioSlug =
  | "corporate-website"
  | "enterprise-management"
  | "integration-hub";

export type PortfolioCategory =
  | "Website Development"
  | "Java Enterprise Solutions"
  | "System Integration";

export type PortfolioProjectStatus = "PLANNED" | "IN_DEVELOPMENT" | "COMPLETED";
export type PortfolioSourceId = "P01" | "P02" | "P03" | "P04" | "P05" | "P06" | "P07" | "P08" | "P09" | "P10";

export type PortfolioSource = {
  readonly id: PortfolioSourceId;
  readonly repository: "xk2022/xplore-kaleidoscope";
  readonly path: `doc/01_business-plan/${string}`;
  readonly commit: string;
  readonly blobSha: string;
  readonly sections: readonly string[];
  readonly supports: string;
};

export type PortfolioSourceReference = {
  readonly sourceId: PortfolioSourceId;
  readonly path: PortfolioSource["path"];
  readonly commit: string;
  readonly blobSha: string;
  readonly sections: readonly string[];
  readonly supports: string;
};

export type ProjectEvidence = {
  readonly kind: "planning-reference" | "owner-confirmation" | "implementation" | "deployment";
  readonly description: string;
  readonly sourceRefs: readonly PortfolioSourceReference[];
  readonly reference: string | null;
  readonly verifiedAt: string | null;
};

export type ProjectMedia = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly type: "screenshot" | "diagram";
  readonly source: string;
  readonly creator: string;
  readonly rights: string;
  readonly sourceCommit: string;
  readonly capturedAt: string;
  readonly review: string;
};

export type PortfolioExternalLink = {
  readonly label: string;
  readonly href: `https://${string}`;
  readonly sourceCommit: string;
  readonly approvedAt: string;
};

export type PortfolioProject = {
  readonly slug: PortfolioSlug;
  readonly title: string;
  readonly category: PortfolioCategory;
  readonly type: "demonstration";
  readonly summary: string;
  readonly businessContext: string;
  readonly challenges: readonly string[];
  readonly proposedSolution: string;
  readonly proposedArchitecture: readonly string[];
  readonly plannedFeatures: readonly string[];
  readonly futureFeatures: readonly string[];
  readonly implementedFeatures: readonly string[];
  readonly plannedTechnologies: readonly string[];
  readonly futureTechnologies: readonly string[];
  readonly implementedTechnologies: readonly string[];
  readonly businessValue: readonly string[];
  readonly status: PortfolioProjectStatus;
  readonly statusEvidence: readonly ProjectEvidence[];
  readonly sourceRefs: readonly PortfolioSourceReference[];
  readonly serviceIds: readonly ServiceId[];
  readonly media: readonly ProjectMedia[];
  readonly sourceLink: PortfolioExternalLink | null;
  readonly liveDemo: PortfolioExternalLink | null;
  readonly metadataDescription: string;
};

const documentationRepository = "xk2022/xplore-kaleidoscope";
const documentationCommit = "95ef1275a46ace76e11f668178ca881087483398";

/** Full-text planning references; none is evidence of completed or approved client work. */
export const portfolioSources = [
  {
    id: "P01", repository: documentationRepository,
    path: "doc/01_business-plan/week-03/01_portfolio-strategy_XK 技術作品展示策略.md",
    commit: documentationCommit, blobSha: "88103f938cfb421878de414194db4b981ec5c024",
    sections: ["§2 Portfolio Strategy", "§3 Portfolio Project Overview", "§5–7 Portfolio Website Structure / Content / Visual Presentation"],
    supports: "三個自製展示方向、列表與詳頁、真實素材原則；驗收清單是目標，不是完成證據。",
  },
  {
    id: "P02", repository: documentationRepository,
    path: "doc/01_business-plan/week-03/02_case-01-corporate-website.md",
    commit: documentationCommit, blobSha: "c9b151d01a7616abb939dd9747d704428d0bdd8c",
    sections: ["§1–3 Project Overview / Business Scenario / Technology Stack", "§9 Contact Form Specification", "§19 Acceptance Criteria", "§20 Future Enhancements"],
    supports: "網站資訊、手機體驗、可維護前端與 SEO 的展示規劃；完整網站、Contact API 與部署仍需獨立實作證據。",
  },
  {
    id: "P03", repository: documentationRepository,
    path: "doc/01_business-plan/week-03/03_case-02-java-enterprise-system.md",
    commit: documentationCommit, blobSha: "4b338c79ac83db44307832754404a28496303189",
    sections: ["§2 Business Scenario", "§3–5 Technology Stack / System Architecture / System Modules", "§20 Future Enhancements", "§21–23 Service Mapping / Presentation / Priorities"],
    supports: "人工、分散資料、權限及 Java 管理系統規劃；詳細模組與摘要有差異，不合併成完整 ERP 或宣稱完成。",
  },
  {
    id: "P04", repository: documentationRepository,
    path: "doc/01_business-plan/week-03/04_case-03-api-integration-platform.md",
    commit: documentationCommit, blobSha: "be1dbacf99ac76d5032ca6cecf221a9a000ff89b",
    sections: ["§2–4 Business Scenario / Technology Stack / System Architecture", "§5.5 Integration Monitoring", "§5.7 Future AI Integration", "§6 Integration Scenarios", "§21–22 Future Enhancements / Portfolio Presentation Strategy"],
    supports: "模擬 ERP／CRM／庫存等資料交換、API 與錯誤處理方向；AI／n8n 是後續，沒有企業級監控或 SLA 證據。",
  },
  {
    id: "P05", repository: documentationRepository,
    path: "doc/01_business-plan/week-03/05_portfolio-content.md",
    commit: documentationCommit, blobSha: "e9aae178cdcef6afca313fde3cd501bd533ee028",
    sections: ["§2–3 Portfolio 定位 / Week 03 Portfolio Projects", "§5–6 Card / Detail Page Specification", "§8–9 Technology Display / Content Guidelines", "§11 Frontend Data Structure"],
    supports: "三案初始 Planned、自製標示、資料欄位、素材權利及 Live 實際部署門檻；範例圖片路徑與技術清單不是完成證據。",
  },
  {
    id: "P06", repository: documentationRepository,
    path: "doc/01_business-plan/week-03/README.md",
    commit: documentationCommit, blobSha: "aaf4dae6b3e80f485fd9a98dd76637a10dc9e561",
    sections: ["§3 三個展示案例", "§7 Development Principles", "§8 Portfolio Website Integration", "§9–10 KPI / Deliverables Checklist"],
    supports: "三個展示情境、維護與 Demo 資料原則；排程、KPI、核心功能與目錄是規劃，不是已存在的系統或商業實績。",
  },
  {
    id: "P07", repository: documentationRepository,
    path: "doc/01_business-plan/week-01/02_service-catalog.md",
    commit: documentationCommit, blobSha: "cc1c2bacbc1f5367667005a9d4a3b288fc8cfd0c",
    sections: ["§3 Website Development", "§4 Java Enterprise Solutions", "§5 System Architecture & Integration", "§7 AI SaaS Products", "§11 Maintenance Services"],
    supports: "三案對應的網站、Java 與整合服務；建議價格、訂閱及維護條件不作作品成果或承諾。",
  },
  {
    id: "P08", repository: documentationRepository,
    path: "doc/01_business-plan/week-02/05_website-sitemap_ 官方網站資訊架構與網站地圖.md",
    commit: documentationCommit, blobSha: "1f1b4584bbe06f0079542eedffa52215024da0f7",
    sections: ["§5 Header 導覽列規劃", "§6.5 Selected Projects", "§9 Portfolio 頁面", "§14 URL 命名規範"],
    supports: "作品列表、詳頁與自製 Demo 的資訊目的；不採尚未發布的長服務 URL、規劃頁或假 CTA。",
  },
  {
    id: "P09", repository: documentationRepository,
    path: "doc/01_business-plan/week-02/08_website-architecture_官方網站 Next.js 技術架構設計.md",
    commit: documentationCommit, blobSha: "15c1483bf47be33bc29b755a220fb465b5dd8a1a",
    sections: ["§8 共用元件設計", "§9 Server Components 與 Client Components", "§10 設定檔與內容管理", "§13 SEO 與網站效能"],
    supports: "共用元件、Server Components、集中資料及 Metadata 原則；不採舊 monorepo、Backend、範例信箱或索引放行。",
  },
  {
    id: "P10", repository: documentationRepository,
    path: "doc/01_business-plan/week-02/09_website-mvp_官方網站 MVP 開發規格.md",
    commit: documentationCommit, blobSha: "5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d",
    sections: ["§3.1 開發原則", "§9 Portfolio 作品案例", "§14 MVP 開發優先順序"],
    supports: "分期、靜態內容與真實展示邊界；不因舊 MVP 範圍而開發展示系統、Contact API、Analytics 或切換部署。",
  },
] as const satisfies readonly PortfolioSource[];

function sourceReference(
  sourceId: PortfolioSourceId,
  sections: readonly string[],
  supports: string,
): PortfolioSourceReference {
  const source = portfolioSources.find((entry) => entry.id === sourceId);
  if (!source) throw new Error(`Unknown portfolio source: ${sourceId}`);
  return {
    sourceId, path: source.path, commit: source.commit, blobSha: source.blobSha,
    sections, supports,
  };
}

/**
 * All three records remain Planned. Website implementation or a passing website
 * build does not authorize promoting a separate demonstration project.
 */
export const portfolioProjects: readonly PortfolioProject[] = [
  {
    slug: "corporate-website", title: "XK Corporate Website Showcase",
    category: "Website Development", type: "demonstration",
    summary: "以企業資訊與品牌入口為情境，規劃響應式網站、可維護元件與 SEO 基礎。",
    businessContext: "模擬中小企業或專業服務品牌需要整理對外資訊、改善手機閱讀與網站維護的情境；這是自製展示規劃，並非客戶委託。",
    challenges: ["品牌與服務資訊不易查找，訪客難以理解重點。", "既有網站在手機上的閱讀與導覽體驗不便。", "頁面結構、內容更新及 SEO 基礎不易維護。"],
    proposedSolution: "規劃以 Next.js 與可重用元件建立企業網站，先梳理內容層級，再設計不同裝置的閱讀與導覽。完整展示範圍仍待作品擁有人確認；現有 XK 官網的已合併頁面不自動等同完整 Case 01 完成。",
    proposedArchitecture: ["規劃以共用 Layout、Design System 與內容區塊組成頁面。", "規劃由集中資料驅動品牌、服務與作品介紹，搭配頁面專屬 Metadata。", "規劃在獨立確認部署與聯絡需求後，再評估對應環境及整合邊界。"],
    plannedFeatures: ["企業首頁、品牌與服務資訊架構。", "響應式導覽與一致的 Layout／UI 元件。", "作品介紹、SEO Metadata 及網站內容維護方式。"],
    futureFeatures: ["原始完整案例另含 Contact Form／API，收件服務與資料契約須獨立確認。", "多語系、CMS 與其他延伸功能須另確認範圍。", "Vercel 為原始部署規劃，不代表本案例已有部署證據。"],
    implementedFeatures: [],
    plannedTechnologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Lucide React"],
    futureTechnologies: ["Vercel（原始部署方向，待確認）", "Contact API（原始整合方向，待另行評估）"],
    implementedTechnologies: [],
    businessValue: ["希望讓品牌與服務資訊更容易理解。", "希望以一致元件及內容結構支援後續維護。", "希望建立適合不同裝置的閱讀與導覽基礎。"],
    status: "PLANNED",
    statusEvidence: [{
      kind: "planning-reference",
      description: "來源提供案例規劃及 Planned／In Development 範例，尚無作品擁有人確認本案例的實作範圍、完成測試或公開部署；目前維持 Planned。",
      sourceRefs: [sourceReference("P02", ["§1.5", "§19"], "自製 Demo 與目標驗收範圍，不是完成紀錄。"), sourceReference("P05", ["§3.1", "§6.8", "§11"], "初始 Planned 範例及 Live 必須有真實部署的條件。")],
      reference: null, verifiedAt: null,
    }],
    sourceRefs: [
      sourceReference("P01", ["§3.1", "§5–7"], "企業網站情境、詳頁與合法素材的規劃。"),
      sourceReference("P02", ["§1–3", "§9", "§19–20"], "網站背景、三項問題、前端與架構方向；聯絡 API 和未來功能不是完成聲明。"),
      sourceReference("P05", ["§3.1", "§5–6"], "名稱、分類、自製類型、Planned 狀態與技術呈現原則。"),
      sourceReference("P06", ["§3.1", "§7–10"], "網站展示目標、可維護性、Demo 與驗收清單的規劃性質。"),
      sourceReference("P07", ["§3"], "對應既有網站開發服務。"),
    ],
    serviceIds: ["website-development"], media: [], sourceLink: null, liveDemo: null,
    metadataDescription: "XK Corporate Website Showcase 自製展示規劃，目前為 Planned；探索企業網站的品牌資訊、響應式版面與可維護前端方向，尚未提供完整案例系統的實作與部署證據。",
  },
  {
    slug: "enterprise-management", title: "XK Enterprise Management System",
    category: "Java Enterprise Solutions", type: "demonstration",
    summary: "以人工與分散資料為情境，規劃 Java 管理應用、資料模型與角色權限。",
    businessContext: "模擬企業內部作業依賴試算表、多套資料及人工核對的情境，探索可維護的管理應用與資料責任；目前沒有實作完成證據。",
    challenges: ["資料分散或重複，查詢與核對需要人工處理。", "商業流程與資料關聯不清楚，既有系統不易擴充。", "使用角色、資料範圍與權限控制需要釐清。"],
    proposedSolution: "規劃以 Java、Spring Boot 與資料模型描述內部管理流程。來源存在模組差異：策略與 README 以客戶／產品／訂單為摘要，詳細規格則列使用者／部門／員工／客戶／專案／任務。實際模組範圍仍待確認，不將兩份清單相加成完整 ERP，也不宣稱任何模組已完成。",
    proposedArchitecture: ["規劃由管理介面透過 REST API 存取業務功能，前端不直接存取資料庫。", "規劃以 Controller、Service 與 Repository 分層，區分介面、商業邏輯及資料責任。", "規劃資料關聯、驗證及角色權限；具體管理模組與部署範圍須另行確認。"],
    plannedFeatures: ["管理資料的查詢、建立與調整流程；具體模組待確認。", "使用者、角色與資料存取邊界的設計方向。", "REST API、輸入驗證與資料關聯規劃。"],
    futureFeatures: ["進階報表、匯出與通知為後續規劃。", "外部系統整合及 AI 輔助需另評估需求與範圍。", "多租戶與訂閱不是初始管理系統已具備的能力。"],
    implementedFeatures: [],
    plannedTechnologies: ["Java", "Spring Boot", "PostgreSQL", "REST API", "Spring Security", "Next.js"],
    futureTechnologies: ["Spring AI／RAG（後續方向）", "外部系統 API／Webhook（後續方向）"],
    implementedTechnologies: [],
    businessValue: ["希望讓管理流程、資料關聯與責任更清楚。", "希望減少反覆人工核對的環節。", "希望建立可維護與可分階段擴充的應用基礎。"],
    status: "PLANNED",
    statusEvidence: [{
      kind: "planning-reference",
      description: "目前只有管理系統規劃與初始 Planned 範例，缺少可核對的作品程式碼、功能測試、畫面與擁有人進度確認；模組差異亦未定案。",
      sourceRefs: [sourceReference("P03", ["§5", "§19", "§23"], "詳細模組、目標驗收與先完成核心範圍的原則。"), sourceReference("P06", ["§3.2", "§5.3", "§10"], "摘要模組與未勾交付清單，不是完成證據。"), sourceReference("P05", ["§3.2", "§11"], "初始 Planned 資料範例。")],
      reference: null, verifiedAt: null,
    }],
    sourceRefs: [
      sourceReference("P01", ["§3.2"], "人工管理情境及客戶／產品／訂單摘要。"),
      sourceReference("P03", ["§2–5", "§20–23"], "背景、問題、Java 分層與模組規劃、未來能力及對應服務。"),
      sourceReference("P05", ["§3.2", "§6.4", "§6.8", "§11"], "展示類型、Planned 與技術須依實作證據標示的原則。"),
      sourceReference("P06", ["§3.2", "§5.3", "§7–10"], "摘要模組、資料與驗收目標；與詳細規格差異保持待確認。"),
      sourceReference("P07", ["§4–5"], "對應既有 Java 與系統整合服務。"),
    ],
    serviceIds: ["java-enterprise", "system-integration"], media: [], sourceLink: null, liveDemo: null,
    metadataDescription: "XK Enterprise Management System 自製展示規劃，目前為 Planned；了解 Java 管理系統的流程、資料與權限規劃，模組範圍仍待確認，尚未提供實作完成證據。",
  },
  {
    slug: "integration-hub", title: "XK Enterprise Integration Hub",
    category: "System Integration", type: "demonstration",
    summary: "以模擬系統的資料交換為情境，規劃 API、格式轉換與整合流程。",
    businessContext: "模擬 ERP、CRM、訂單與庫存等系統使用不同介面、需要交換資料的情境；這些是規劃中的模擬對象，不是真實客戶系統或已完成串接。",
    challenges: ["系統各自保存資料，交換仍仰賴人工重複輸入。", "API 規格、欄位與資料格式不一致。", "失敗、重試與處理狀態需要清楚的追蹤方式。"],
    proposedSolution: "規劃以 Integration Hub 隔離不同系統的介面差異，評估資料驗證、格式轉換、交換結果與錯誤處理。ERP 至 CRM、訂單至庫存及外部 API 都是模擬情境。AI 與 n8n 屬後續方向，來源摘要列出技術不代表已整合或部署。",
    proposedArchitecture: ["規劃來源模擬系統經 Adapter 將資料送至整合服務。", "規劃驗證、欄位轉換與目標介面，區分可重試與不可重試的錯誤。", "規劃保存交換結果與基本執行紀錄，再由管理介面呈現狀態；不表示已有企業級即時監控或 SLA。"],
    plannedFeatures: ["模擬 API 交換、資料映射、驗證與轉換。", "整合設定、執行結果與基本錯誤紀錄。", "有限次重試與重複處理風險的設計方向。"],
    futureFeatures: ["n8n 與視覺化 Workflow 為後續擴充。", "AI 資料映射、錯誤分析與整合助理為後續方向。", "進階監控與多組織管理需另評估，不承諾企業級平台或 SLA。"],
    implementedFeatures: [],
    plannedTechnologies: ["Java", "Spring Boot", "REST API", "PostgreSQL", "Next.js", "JSON／Webhook"],
    futureTechnologies: ["n8n（後續整合方向）", "Spring AI／AI API（後續方向）"],
    implementedTechnologies: [],
    businessValue: ["希望讓跨系統資料交換規則更清楚。", "希望減少重複輸入與人工搬移資料的需求。", "希望建立可追溯、可維護的整合流程邊界。"],
    status: "PLANNED",
    statusEvidence: [{
      kind: "planning-reference",
      description: "來源為模擬整合規劃與初始 Planned 範例，尚無可核對的 Hub 程式碼、整合測試、實際畫面或公開部署；AI／n8n 仍列後續。",
      sourceRefs: [sourceReference("P04", ["§5.5", "§5.7", "§6", "§20–21"], "無 SLA 保證、模擬情境、目標驗收及 AI／n8n 後續範圍。"), sourceReference("P05", ["§3.3", "§6.8", "§11"], "初始 Planned 與 Live 部署證據門檻。")],
      reference: null, verifiedAt: null,
    }],
    sourceRefs: [
      sourceReference("P01", ["§3.3"], "API 與資料交換的自製展示方向。"),
      sourceReference("P04", ["§2–6", "§12", "§21–22"], "模擬需求、分層、資料流向與錯誤處理；AI／n8n 後續及展示邊界。"),
      sourceReference("P05", ["§3.3", "§6.4", "§6.8", "§11"], "分類、初始 Planned 與不可把技術摘要當成已整合的原則。"),
      sourceReference("P06", ["§3.3", "§7–10"], "模擬整合目標、Demo 資料與尚未完成的交付清單。"),
      sourceReference("P07", ["§4–5"], "對應既有系統整合與 Java 服務。"),
    ],
    serviceIds: ["system-integration", "java-enterprise"], media: [], sourceLink: null, liveDemo: null,
    metadataDescription: "XK Enterprise Integration Hub 自製展示規劃，目前為 Planned；探索模擬系統之間的 API 與資料交換方向，AI 與 n8n 屬後續規劃，尚未提供實作完成證據。",
  },
] as const satisfies readonly PortfolioProject[];

export const portfolioPage = {
  projectTypeLabel: "Self-Initiated Demonstration Project",
  statusLabels: {
    PLANNED: "Planned／規劃中",
    IN_DEVELOPMENT: "In Development／開發中",
    COMPLETED: "Completed／已完成",
  } satisfies Record<PortfolioProjectStatus, string>,
  hero: {
    title: "技術作品與展示規劃",
    englishTitle: "Technical Portfolio",
    description: "從企業網站、Java 管理應用到跨系統資料交換，了解三個自製展示的背景、技術規劃與實際狀態。",
    primaryCta: { label: "探索展示規劃", href: "#portfolio-projects" },
    secondaryCta: { label: "了解技術服務", href: "/services" },
  },
  introduction: {
    title: "先看情境，再理解技術規劃。",
    description: "以下為 XK 自製技術展示與規劃，非客戶委託案例；各項以標示狀態與實際證據為準。",
  },
  projects: {
    title: "三個方向，探索不同的企業需求。",
    description: "目前三案均為 Planned。每個介紹頁分開呈現規劃與已實作內容，沒有實作證據時不宣稱完成。",
  },
  technology: {
    title: "技術依情境規劃，進度依證據標示。",
    description: "以下技術來自各案例的規劃範圍，不代表已使用或已整合。實際使用的技術與未來方向分開標示。",
  },
  transparency: {
    title: "讓展示的範圍與狀態保持清楚。",
    description: "作品介紹可以說明規劃，完成與上線則需要不同的證據。網站本身通過驗收，不代表這三個案例系統已完成。",
    principles: [
      { title: "自製展示，清楚標示", description: "三案皆為 Self-Initiated Demonstration Project，不是客戶委託或正式商用產品。" },
      { title: "狀態依實際證據", description: "進度升級須有擁有人確認、相符程式碼與測試；Live 另需真實部署與操作證據，目前均未提供。" },
      { title: "素材與連結可追溯", description: "目前尚未提供可核對來源與使用權的系統畫面，亦未確認可公開的原始碼或 Live Demo。" },
    ],
  },
  cta: {
    title: "從理解需求，開始討論技術方向。",
    description: "可先了解現有服務，或前往聯絡資訊確認可用管道，再依實際需求討論範圍與合作方式。",
    primaryCta: { label: "前往聯絡資訊", href: contactNavigation.href },
    secondaryCta: { label: "了解服務", href: "/services" },
  },
  detail: {
    overview: { title: "專案背景與展示範圍", description: "這是自製展示規劃，以標示的進度與證據為準。" },
    challenge: { title: "需要理解的企業問題", description: "以下為一般模擬情境，不代表實際客戶導入紀錄。" },
    solution: { title: "建議方案與架構規劃", description: "以下是規劃方向；功能、模組及實作範圍仍需確認。" },
    technology: { title: "規劃技術與實作界線", description: "依案例範圍區分規劃技術、後續方向及已實作證據。" },
    evidence: { title: "系統畫面與實作證據", description: "只有真實運行、來源與使用權可核對的素材，才會作為系統展示。" },
    status: { title: "目前狀態與待確認事項", description: "Planned、In Development 與 Completed 依進度證據區分，Live 必須另有部署驗證。" },
    services: { title: "相關技術服務", description: "以下連到 XK 已存在的服務介紹，說明可討論的能力範圍。" },
    nextStep: { title: "有相近的技術需求嗎？", description: "可以從理解目前流程與限制開始，再確認適合的服務與合作範圍。" },
    emptyMedia: "尚無可驗證的系統畫面",
    emptyImplementation: "尚未提供可核對的實作與測試證據。",
    planningLabel: "規劃中的功能與架構",
    futureLabel: "後續方向，尚未納入已實作範圍",
    businessValueLabel: "希望探索的改善方向，非已驗證成果",
    backLink: { label: "返回技術作品集", href: "/portfolio" },
  },
} as const;
