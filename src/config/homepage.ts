import { BrainCircuit, Code2, Globe, Network, Settings, type LucideIcon } from "lucide-react";

import type { ServiceId } from "@/config/services";
import { solutionDefinitions, type SolutionId } from "@/config/solutions";

export const homepageHero = {
  eyebrow: "XPLORE KALEIDOSCOPE",
  title: "整合網站、企業系統與 AI，打造真正有價值的數位解決方案。",
  description: "從企業網站、Java 系統開發到 AI 應用整合，協助企業建立穩定、可擴充且符合實際營運需求的數位服務。",
  serviceLabels: ["Website Development", "Java Enterprise", "AI Solutions"],
  portfolioNote: "技術作品頁呈現自製展示方向與目前狀態，非客戶交付案例。",
} as const;

type HomepageService = {
  id: `R0${1 | 2 | 3 | 4 | 5}`;
  anchor: string;
  name: string;
  englishName: string;
  description: string;
  need: string;
  plannedDeliverables: string;
  serviceId: ServiceId;
  learnMoreLabel: string;
  items: readonly string[];
  Icon: LucideIcon;
};

/** Editorial content for the Traditional Chinese homepage; routes are separate. */
export const services = [
  {
    id: "R01",
    anchor: "website-development",
    name: "網站設計與開發",
    englishName: "Website Development",
    description: "整合品牌內容與響應式介面，建立清楚、易於使用的企業數位入口。",
    need: "網站資訊不易找到、手機瀏覽不便，或需要建立品牌網站。",
    plannedDeliverables: "網站頁面、響應式介面與內容維護說明。",
    serviceId: "website-development",
    learnMoreLabel: "了解網站開發",
    items: ["Corporate Website", "Landing Page", "Business Website", "Next.js Web Application", "CMS Integration", "Multilingual Website"],
    Icon: Globe,
  },
  {
    id: "R02",
    anchor: "java-enterprise",
    name: "Java 企業系統開發",
    englishName: "Java Enterprise Solutions",
    description: "以 Java 與 Spring Boot 梳理商業邏輯，規劃可維護、可擴充的企業系統。",
    need: "內部作業依賴人工，或既有 Java 系統需要維護與擴充。",
    plannedDeliverables: "後端服務、API 文件、資料庫整合與技術文件。",
    serviceId: "java-enterprise",
    learnMoreLabel: "了解 Java 服務",
    items: ["Java / Spring Boot", "Backend API", "Enterprise System", "Legacy System Refactoring", "Database Integration"],
    Icon: Code2,
  },
  {
    id: "R03",
    anchor: "system-integration",
    name: "系統架構與整合",
    englishName: "System Architecture & Integration",
    description: "釐清系統邊界與資料流向，規劃 API 串接及資料交換方式。",
    need: "多套系統各自運作，資料需要重複輸入或人工核對。",
    plannedDeliverables: "整合介面、資料交換流程與架構說明。",
    serviceId: "system-integration",
    learnMoreLabel: "了解系統整合",
    items: ["System Architecture", "API Integration", "Requirements Analysis", "Backend System Planning", "Enterprise System Integration"],
    Icon: Network,
  },
  {
    id: "R04",
    anchor: "ai-solutions",
    name: "AI 商業應用解決方案",
    englishName: "AI Business Solutions",
    description: "依知識來源與工作流程，評估 AI、RAG 及自動化的應用與整合方式。",
    need: "文件分散、知識查詢費時，或有反覆進行的資訊處理工作。",
    plannedDeliverables: "AI 應用原型、流程整合與情境驗證說明。",
    serviceId: "ai-automation",
    learnMoreLabel: "了解 AI 應用",
    items: ["AI Chatbot", "Enterprise RAG", "AI Workflow Automation", "AI Business Assistant", "Custom AI Integration"],
    Icon: BrainCircuit,
  },
  {
    id: "R05",
    anchor: "maintenance",
    name: "系統維護與技術支援",
    englishName: "Maintenance Services",
    description: "依應用現況規劃部署、維護與技術支援，確認可持續改善的範圍。",
    need: "網站或系統上線後，需要部署協助、問題排查或功能調整。",
    plannedDeliverables: "部署流程、維護項目與操作交接說明。",
    serviceId: "cloud-infrastructure",
    learnMoreLabel: "了解部署維護",
    items: ["Website Maintenance", "Backend Maintenance", "API Monitoring", "AI Application Maintenance", "Cloud Deployment Support"],
    Icon: Settings,
  },
] as const satisfies readonly HomepageService[];

export const technologyGroups = [
  { name: "Frontend Development", description: "從品牌網站到 Web 應用，建立清楚、流暢的數位體驗。", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { name: "Backend Development", description: "以可維護的系統設計，支援企業營運與服務擴充。", items: ["Java", "Spring Boot", "REST API", "Enterprise Backend"] },
  { name: "Database & Integration", description: "串聯系統與資料，讓資訊在不同工作流程間順暢運作。", items: ["PostgreSQL", "MySQL", "API Integration", "Database Design"] },
  { name: "AI & Automation", description: "依實際需求導入 AI 與自動化，連結知識與日常工作。", items: ["OpenAI API", "Claude Integration", "RAG", "AI Agents", "Workflow Automation", "n8n"] },
  { name: "Infrastructure", description: "依專案情境規劃部署方式，兼顧交付與後續維護。", items: ["Docker", "GitHub", "Vercel", "Cloud VPS"] },
] as const;

export const valuePropositions = [
  { title: "整合技術能力", englishName: "Integrated Technical Capabilities", description: "從網站入口、Java 企業後端到 AI 應用，以跨領域整合開發串連營運流程，協助企業釐清系統分散與多方技術協作的問題。" },
  { title: "從商業需求出發", englishName: "Business-oriented Solutions", description: "以實際商業需求為出發點，提供符合企業營運目標的技術方案。" },
  { title: "為長期擴充而設計", englishName: "Scalable Architecture", description: "重視系統架構、程式碼品質及未來擴充能力，降低長期維護成本。" },
  { title: "持續性的技術支援", englishName: "Long-term Technical Support", description: "從系統建置到後續維護，提供持續性的技術協助。" },
] as const;

const homepageSolutionDirections = [
  { title: "建立專業數位形象", englishName: "Website & Digital Presence", solutionId: "digital-presence" },
  { title: "讓既有系統持續進化", englishName: "Enterprise System Modernization", solutionId: "enterprise-management" },
  { title: "讓知識與流程更有效率", englishName: "AI-powered Business Automation", solutionId: "ai-workflow" },
] as const satisfies readonly { title: string; englishName: string; solutionId: SolutionId }[];

/** Homepage directions inherit details, service IDs and source references from the registry. */
export const solutionDirections = homepageSolutionDirections.map((direction) => {
  const definition = solutionDefinitions.find((solution) => solution.id === direction.solutionId);

  if (!definition) {
    throw new Error(`Unknown homepage solution: ${direction.solutionId}`);
  }

  return {
    ...direction,
    description: definition.summary,
    href: `/solutions#${definition.anchor}` as const,
    serviceIds: definition.serviceIds,
    sourceRefs: definition.sourceRefs,
    status: definition.status,
  };
});
