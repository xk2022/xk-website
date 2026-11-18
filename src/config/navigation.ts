// Only implemented destinations belong in public navigation.
export const primaryNavigation = [
  { href: "/", label: "首頁" },
  { href: "/#brand", label: "品牌理念" },
] as const;

// Planning inventory only. Publish each route after its content is implemented.
export const plannedRoutes = [
  { path: "/", label: "首頁", status: "implemented" },
  { path: "/about", label: "關於我們", status: "planned" },
  { path: "/services", label: "服務總覽", status: "planned" },
  { path: "/services/website-development", label: "網站建置", status: "planned" },
  { path: "/services/java-enterprise", label: "Java 企業系統", status: "planned" },
  { path: "/services/system-integration", label: "系統架構整合", status: "planned" },
  { path: "/services/ai-solutions", label: "AI 商業應用", status: "planned" },
  { path: "/services/maintenance", label: "系統維護", status: "planned" },
  { path: "/solutions", label: "解決方案", status: "planned" },
  { path: "/portfolio", label: "作品案例", status: "planned" },
  { path: "/contact", label: "聯絡我們", status: "planned" },
  { path: "/privacy", label: "隱私權政策", status: "planned" },
] as const;
