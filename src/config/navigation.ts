// Public navigation includes implemented pages and existing homepage anchors.
export const primaryNavigation = [
  { href: "/", label: "首頁" },
  { href: "/about", label: "關於 XK" },
  { href: "/services", label: "服務項目" },
  { href: "/solutions", label: "解決方案" },
  { href: "/portfolio", label: "技術作品集" },
] as const;

export const contactNavigation = {
  href: "/contact",
  label: "聯絡我們",
} as const;

// Planning inventory only. Publish each route after its content is implemented.
export const plannedRoutes = [
  { path: "/", label: "首頁", status: "implemented" },
  { path: "/about", label: "關於我們", status: "implemented" },
  { path: "/services", label: "服務總覽", status: "implemented" },
  { path: "/services/website-development", label: "網站建置", status: "planned" },
  { path: "/services/java-enterprise", label: "Java 企業系統", status: "planned" },
  { path: "/services/system-integration", label: "系統架構整合", status: "planned" },
  { path: "/services/ai-solutions", label: "AI 商業應用", status: "planned" },
  { path: "/services/maintenance", label: "系統維護", status: "planned" },
  { path: "/solutions", label: "解決方案", status: "implemented" },
  { path: "/portfolio", label: "技術作品集", status: "implemented" },
  { path: "/contact", label: "聯絡我們", status: "implemented" },
  { path: "/privacy", label: "隱私權政策", status: "planned" },
] as const;
