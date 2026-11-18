import { Code2, Handshake, Layers3, Target, Workflow, Wrench } from "lucide-react";

/** About-page copy is based on the confirmed Task 004 brief, not biographies. */
export const aboutPage = {
  titleLines: ["探索可能性，", "創造數位價值。"],
  description: "Xplore Kaleidoscope（XK）整合網站開發、Java 企業系統、系統架構與 AI 應用技術，協助企業將商業需求轉化為可靠、可擴充且具實際價值的數位解決方案。",
  whoWeAre: {
    introduction: "XK 是以軟體工程、系統整合與人工智慧應用為核心的數位技術品牌。",
    description: "我們關注企業在數位轉型過程中面臨的實際問題，從網站建置、企業後端系統、API 整合到 AI 應用，提供符合業務需求的技術服務。",
    operatingModel: "XK 目前由創辦人一人全職經營，以直接的技術溝通，理解需求並推進實作。",
    priorities: ["技術品質", "商業需求理解", "系統可維護性", "架構擴充能力", "長期合作價值"],
  },
  mission: {
    statement: "讓技術成為企業創造價值的工具。",
    description: "我們希望透過可靠的軟體工程、現代化系統架構與 AI 技術，協助企業改善營運流程、提升工作效率，並建立能持續成長的數位能力。",
    pillars: [
      { title: "可靠的軟體工程", description: "重視技術品質與可維護性，建立適合實際需求的軟體基礎。", Icon: Wrench },
      { title: "連結營運與技術", description: "從商業問題出發，讓系統整合與 AI 應用服務日常工作。", Icon: Workflow },
      { title: "持續成長的能力", description: "考量架構與後續改善，讓數位能力隨企業需求逐步發展。", Icon: Layers3 },
    ],
  },
  vision: {
    statement: "逐步發展成整合網站開發、企業系統、AI 應用與自動化服務的整合型 AI 網路公司。",
    directions: ["建立可靠的數位技術服務。", "將成熟的 AI 解決方案標準化。", "發展自主 AI SaaS 產品。", "協助更多台灣及海外企業創造數位價值。"],
  },
} as const;

export const aboutCapabilities = [
  { id: "01", name: "Website Development", title: "網站開發", items: ["Next.js", "React", "TypeScript", "Responsive Web Design", "Website Architecture"] },
  { id: "02", name: "Java Enterprise Development", title: "Java 企業系統", items: ["Java", "Spring Boot", "Backend API", "Enterprise Application", "Database Integration"] },
  { id: "03", name: "System Architecture & Integration", title: "系統架構與整合", items: ["System Architecture", "API Integration", "Database Design", "Enterprise System Integration", "Technical Planning"] },
  { id: "04", name: "AI & Automation", title: "AI 與自動化", items: ["OpenAI API", "Spring AI", "RAG", "AI Agents", "n8n Workflow Automation"] },
  { id: "05", name: "Cloud & Infrastructure", title: "雲端與基礎架構", items: ["Vercel", "Cloud VPS", "Docker", "GitHub", "Deployment Architecture"] },
] as const;

export const aboutApproach = [
  { name: "Understand", title: "理解需求", description: "了解客戶的商業目標與實際問題。" },
  { name: "Analyze", title: "需求分析", description: "評估技術需求、系統限制與實作範圍。" },
  { name: "Architect", title: "架構規劃", description: "設計適合需求且可擴充的技術方案。" },
  { name: "Develop", title: "開發實作", description: "以可靠的工程流程完成開發與測試。" },
  { name: "Deliver & Improve", title: "交付與持續改善", description: "完成交付，並依需求提供維護與優化服務。" },
] as const;

export type FounderProfile = {
  /** Populate only after the founder explicitly confirms public disclosure. */
  name: string | null;
  /** Reserved for a supplied, authorized portrait; no invented image is used. */
  photo: { src: string; alt: string } | null;
  role: string;
  introduction: string;
  description: string;
  focusAreas: readonly string[];
};

export const founderProfile: FounderProfile = {
  name: null,
  photo: null,
  role: "Founder & Software Engineer",
  introduction: "XK 由具備網站開發、Java 企業系統、系統架構及 AI 應用整合經驗的軟體工程師創立。",
  description: "從網站應用到企業後端系統，從系統架構到人工智慧整合，致力於以軟體工程解決實際商業問題。",
  focusAreas: ["Website Development", "Java Enterprise Development", "Spring Boot", "System Architecture", "API Integration", "AI Application Integration"],
};

export const aboutCommitments = [
  { name: "Engineering Quality", title: "工程品質", description: "重視程式碼品質及系統穩定性。", Icon: Code2 },
  { name: "Business Value", title: "商業價值", description: "以客戶實際需求為出發點。", Icon: Target },
  { name: "Scalable Architecture", title: "可擴充架構", description: "考慮未來擴充與維護。", Icon: Layers3 },
  { name: "Long-term Partnership", title: "長期合作", description: "重視持續改善與長期合作。", Icon: Handshake },
] as const;
