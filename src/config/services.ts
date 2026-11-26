import { BrainCircuit, Cloud, Code2, Globe, Network, type LucideIcon } from "lucide-react";

export type ServiceId = "website-development" | "java-enterprise" | "system-integration" | "ai-automation" | "cloud-infrastructure";

export type ServiceTechnology = { name: string };

export type ServiceCategory = {
  id: ServiceId;
  number: string;
  title: string;
  englishTitle: string;
  summary: string;
  description: string;
  items: readonly string[];
  technologies: readonly ServiceTechnology[];
  scenario: string;
  Icon: LucideIcon;
};

export type ServiceProcessStep = { name: string; title: string; description: string };
export type ServiceSolutionExample = { title: string; services: readonly string[]; description: string };

/** Service scope from Task 005; these are capabilities, not completed-project claims. */
export const serviceCategories = [
  {
    id: "website-development", number: "01", title: "網站與數位產品開發", englishTitle: "Website Development", Icon: Globe,
    summary: "建立品牌入口，讓資訊與服務清楚呈現。",
    description: "從企業形象到網站應用，整合品牌內容、介面與前端技術，讓訪客在不同裝置上都能理解服務、找到所需資訊。",
    items: ["官方網站與企業網站開發", "Responsive Web Design", "前端介面與互動設計", "Next.js 與 React 網站開發", "TypeScript 應用", "SEO 基礎建置", "網站效能與可及性改善"],
    technologies: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"].map((name) => ({ name })),
    scenario: "適合需要建立品牌形象、改善網站體驗，或開發網站應用的企業。",
  },
  {
    id: "java-enterprise", number: "02", title: "Java 企業系統開發", englishTitle: "Java Enterprise Development", Icon: Code2,
    summary: "以可維護的商業邏輯，支援企業日常營運。",
    description: "依業務流程與系統需求，規劃 Java 應用、後端邏輯及 API，兼顧既有系統維護與後續功能擴充。",
    items: ["Java 應用程式開發", "Spring Boot 系統開發", "REST API 設計與整合", "企業應用系統", "後端商業邏輯", "系統維護與功能擴充"],
    technologies: ["Java", "Spring Boot", "Spring Framework", "REST API", "Maven", "Gradle"].map((name) => ({ name })),
    scenario: "適合需要企業後端開發、Java 系統維護，或既有系統升級的企業。",
  },
  {
    id: "system-integration", number: "03", title: "系統整合與資料管理", englishTitle: "System Integration & Database", Icon: Network,
    summary: "連結系統與資料，讓跨系統流程更清楚。",
    description: "從資料流向與系統邊界出發，規劃 API 串接、資料交換及資料庫整合，協助既有系統逐步演進。",
    items: ["系統整合", "API 串接", "資料庫規劃與整合", "資料交換與處理", "既有系統現代化", "跨系統工作流程整合"],
    technologies: ["API Integration", "Database Design", "PostgreSQL", "MySQL", "Data Integration"].map((name) => ({ name })),
    scenario: "適合有多套系統需要串接、資料分散，或需要重新規劃資訊架構的企業。",
  },
  {
    id: "ai-automation", number: "04", title: "AI 應用與流程自動化", englishTitle: "AI & Automation", Icon: BrainCircuit,
    summary: "將 AI 連結實際需求，探索流程改善的可能。",
    description: "評估 AI 與既有工作流程的結合方式，從資訊處理、LLM 應用到自動化整合，依使用情境規劃合適方案。",
    items: ["AI 應用開發", "LLM 應用整合", "AI 輔助工作流程", "智慧資料處理", "企業流程自動化", "AI 與既有系統整合"],
    technologies: ["Python", "AI API Integration", "LLM", "Spring AI", "Workflow Automation"].map((name) => ({ name })),
    scenario: "適合希望運用 AI 改善資訊搜尋、文件處理及內部工作流程的企業。",
  },
  {
    id: "cloud-infrastructure", number: "05", title: "雲端與基礎架構", englishTitle: "Cloud & Infrastructure", Icon: Cloud,
    summary: "從開發延伸至部署，規劃適合專案的運行環境。",
    description: "依應用需求規劃容器化、部署與交付流程，並確認維護範圍及支援條件，為後續擴充建立基礎。",
    items: ["Docker 容器化", "應用程式部署規劃", "雲端架構整合", "CI/CD 工作流程", "基礎架構與部署維護", "系統可擴充性規劃"],
    technologies: ["Docker", "Git", "GitHub Actions", "CI/CD", "Cloud Infrastructure"].map((name) => ({ name })),
    scenario: "適合需要部署應用、整理交付流程，或規劃雲端運行環境的企業。",
  },
] as const satisfies readonly ServiceCategory[];

export const servicesPage = {
  websiteGuide: {
    title: "一頁式網站，聚焦品牌與主題",
    description: "適合品牌介紹、商品或活動焦點；頁面內容與呈現方式依實際需求確認。可先瀏覽網站範例與品牌展示，了解不同情境的網站安排。",
    samplesLink: { label: "瀏覽網站範例", href: "/portfolio#website-samples" },
    showcasesLink: { label: "查看展示案例", href: "/portfolio#website-cases" },
  },
  hero: {
    titleLines: ["我們提供的", "數位技術服務"],
    englishTitle: "Our Services",
    description: "Xplore Kaleidoscope（XK）整合 Web、Java 與 AI 技術，從品牌網站、企業系統到跨系統整合，協助企業建立符合實際需求的數位解決方案。",
    primaryCta: { label: "探索服務內容", href: "#service-overview" },
    secondaryCta: { label: "討論數位需求", href: "/#contact" },
  },
  overview: {
    title: "從需求出發，連結每一項技術。",
    description: "五類服務可獨立規劃，也能依企業需求組合。從使用者看見的介面，到系統、資料與部署流程，選擇適合當前階段的技術範圍。",
  },
  integration: {
    title: "以需求組合服務，形成完整方案。",
    description: "服務之間可以相互配合。以下以常見需求說明組合方式，實際範圍將在了解需求後共同確認。",
    exampleLabel: "服務組合示例",
  },
  process: {
    title: "讓合作的每一步，都有清楚的方向。",
    description: "先理解需求，再確認方案與交付範圍，從開發、測試到後續改善持續溝通。工期、報價與合作條件依個別專案確認。",
  },
  cta: {
    title: "從一個需求，開始探索數位可能。",
    description: "無論是企業網站、Java 系統、系統整合、AI 應用或部署規劃，都可以從理解問題與目標開始。",
    primary: { label: "前往聯絡資訊", href: "/#contact" },
    secondary: { label: "認識 XK", href: "/about" },
    home: { label: "返回首頁", href: "/" },
  },
} as const;

export const serviceSolutionExamples = [
  { title: "企業數位形象", services: ["Website Development"], description: "以網站整理品牌與服務資訊，建立清楚的對外數位入口。" },
  { title: "企業內部管理系統", services: ["Java Enterprise Development", "Database Integration"], description: "將商業邏輯與資料整合，支援內部資訊管理需求。" },
  { title: "跨系統流程", services: ["System Integration", "Automation"], description: "串聯系統介面與資料交換，規劃跨系統的工作流程。" },
  { title: "智慧化應用", services: ["AI Integration", "Existing Systems"], description: "將 AI 能力連結既有系統，探索適合日常工作的應用方式。" },
  { title: "系統部署", services: ["Application Development", "Cloud Infrastructure"], description: "結合應用開發與運行環境，規劃建置、交付與部署流程。" },
] as const satisfies readonly ServiceSolutionExample[];

export const serviceProcessSteps = [
  { name: "Discovery", title: "需求了解", description: "了解商業目標、使用情境與目前需要解決的問題。" },
  { name: "Planning", title: "方案規劃", description: "討論技術選擇、實作範圍與合作方式。" },
  { name: "Development", title: "技術開發", description: "依確認的方向進行開發，持續溝通實作進度。" },
  { name: "Testing & Delivery", title: "測試與交付", description: "驗證約定範圍內的功能，整理交付與使用資訊。" },
  { name: "Continuous Improvement", title: "後續改善", description: "依實際需求，討論後續維護、優化與擴充。" },
] as const satisfies readonly ServiceProcessStep[];
