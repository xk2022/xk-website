import { BrainCircuit, Code2, Globe, Network, Settings } from "lucide-react";

/** Editorial content for the Traditional Chinese homepage; routes are separate. */
export const services = [
  {
    id: "R01",
    anchor: "website-development",
    name: "網站設計與開發",
    englishName: "Website Development",
    description: "打造現代化、響應式且符合企業品牌形象的網站與 Web Application。",
    items: ["Corporate Website", "Landing Page", "Business Website", "Next.js Web Application", "CMS Integration", "Multilingual Website"],
    Icon: Globe,
  },
  {
    id: "R02",
    anchor: "java-enterprise",
    name: "Java 企業系統開發",
    englishName: "Java Enterprise Solutions",
    description: "使用 Java 與 Spring Boot 建立穩定、可維護且具備擴充能力的企業後端系統。",
    items: ["Java / Spring Boot", "Backend API", "Enterprise System", "Legacy System Refactoring", "Database Integration"],
    Icon: Code2,
  },
  {
    id: "R03",
    anchor: "system-integration",
    name: "系統架構與整合",
    englishName: "System Architecture & Integration",
    description: "協助企業規劃系統架構、API 整合及後端系統，建立可靠的技術基礎。",
    items: ["System Architecture", "API Integration", "Requirements Analysis", "Backend System Planning", "Enterprise System Integration"],
    Icon: Network,
  },
  {
    id: "R04",
    anchor: "ai-solutions",
    name: "AI 商業應用解決方案",
    englishName: "AI Business Solutions",
    description: "將 AI、RAG 與 Workflow Automation 整合至企業流程，提升資訊應用及營運效率。",
    items: ["AI Chatbot", "Enterprise RAG", "AI Workflow Automation", "AI Business Assistant", "Custom AI Integration"],
    Icon: BrainCircuit,
  },
  {
    id: "R05",
    anchor: "maintenance",
    name: "系統維護與技術支援",
    englishName: "Maintenance Services",
    description: "提供網站、後端系統、API 與 AI 應用的持續維護及技術支援。",
    items: ["Website Maintenance", "Backend Maintenance", "API Monitoring", "AI Application Maintenance", "Cloud Deployment Support"],
    Icon: Settings,
  },
] as const;

export const technologyGroups = [
  { name: "Frontend Development", description: "從品牌網站到 Web 應用，建立清楚、流暢的數位體驗。", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { name: "Backend Development", description: "以可維護的系統設計，支援企業營運與服務擴充。", items: ["Java", "Spring Boot", "REST API", "Enterprise Backend"] },
  { name: "Database & Integration", description: "串聯系統與資料，讓資訊在不同工作流程間順暢運作。", items: ["PostgreSQL", "MySQL", "API Integration", "Database Design"] },
  { name: "AI & Automation", description: "依實際需求導入 AI 與自動化，連結知識與日常工作。", items: ["OpenAI API", "Claude Integration", "RAG", "AI Agents", "Workflow Automation", "n8n"] },
  { name: "Infrastructure", description: "依專案情境規劃部署方式，兼顧交付與後續維護。", items: ["Docker", "GitHub", "Vercel", "Cloud VPS"] },
] as const;

export const valuePropositions = [
  { title: "整合技術能力", englishName: "Integrated Technical Capabilities", description: "整合網站、企業系統、系統架構及 AI 技術，減少企業跨系統整合的複雜度。" },
  { title: "從商業需求出發", englishName: "Business-oriented Solutions", description: "以實際商業需求為出發點，提供符合企業營運目標的技術方案。" },
  { title: "為長期擴充而設計", englishName: "Scalable Architecture", description: "重視系統架構、程式碼品質及未來擴充能力，降低長期維護成本。" },
  { title: "持續性的技術支援", englishName: "Long-term Technical Support", description: "從系統建置到後續維護，提供持續性的技術協助。" },
] as const;

export const solutionDirections = [
  { title: "建立專業數位形象", englishName: "Website & Digital Presence", description: "協助企業建立專業網站及數位服務入口。", serviceAnchor: "website-development" },
  { title: "讓既有系統持續進化", englishName: "Enterprise System Modernization", description: "協助企業改善既有系統架構，整合後端服務與資料流程。", serviceAnchor: "system-integration" },
  { title: "讓知識與流程更有效率", englishName: "AI-powered Business Automation", description: "將 AI 與自動化技術導入企業知識管理及日常營運流程。", serviceAnchor: "ai-solutions" },
] as const;
