export type SeoPage = Readonly<{
  path: `/${string}`;
  title: string;
  description: string;
  availability: "public" | "draft";
  contentLastModified?: string;
}>;

export type SeoProtectionPolicy = Readonly<{
  mode: "protected";
  publishSitemap: false;
}>;

/** Public availability is not permission to index; a reviewed release is still required. */
export const seoProtectionPolicy: SeoProtectionPolicy = {
  mode: "protected",
  publishSitemap: false,
};

/** Current approved page copy. Planned, development and error routes are deliberately absent. */
export const seoPages = [
  {
    path: "/",
    title: "Xplore Kaleidoscope | Web, Java & AI Digital Solutions",
    description: "Xplore Kaleidoscope 提供網站開發、Java 企業系統、系統架構整合及 AI 商業應用解決方案，協助企業打造數位價值。",
    availability: "public",
  },
  {
    path: "/about",
    title: "關於 XK | Xplore Kaleidoscope",
    description: "認識 Xplore Kaleidoscope（XK），了解我們的品牌理念、網站開發、Java 企業系統、系統整合與 AI 應用技術能力。",
    availability: "public",
  },
  {
    path: "/services",
    title: "服務項目 | Xplore Kaleidoscope",
    description: "探索 Xplore Kaleidoscope 的網站開發、Java 企業系統、系統整合、AI 應用與雲端技術服務，打造符合企業需求的數位解決方案。",
    availability: "public",
  },
  {
    path: "/solutions",
    title: "解決方案 | Xplore Kaleidoscope",
    description: "探索 XK 如何依企業需求組合網站開發、Java 企業系統、API 與資料整合、AI 應用及部署技術，規劃合適的數位解決方案。",
    availability: "public",
  },
  {
    path: "/portfolio",
    title: "作品展示 | Xplore Kaleidoscope",
    description: "瀏覽 XK 的品牌網站展示、一頁式網站範例與技術展示規劃，探索餐飲、禮贈及工業情境的網站內容與介面風格。",
    availability: "public",
  },
  {
    path: "/portfolio/corporate-website",
    title: "XK Corporate Website Showcase | XK 技術作品集",
    description: "XK Corporate Website Showcase 自製展示規劃，目前為 Planned；探索企業網站的品牌資訊、響應式版面與可維護前端方向，尚未提供完整案例系統的實作與部署證據。",
    availability: "public",
  },
  {
    path: "/portfolio/enterprise-management",
    title: "XK Enterprise Management System | XK 技術作品集",
    description: "XK Enterprise Management System 自製展示規劃，目前為 Planned；了解 Java 管理系統的流程、資料與權限規劃，模組範圍仍待確認，尚未提供實作完成證據。",
    availability: "public",
  },
  {
    path: "/portfolio/integration-hub",
    title: "XK Enterprise Integration Hub | XK 技術作品集",
    description: "XK Enterprise Integration Hub 自製展示規劃，目前為 Planned；探索模擬系統之間的 API 與資料交換方向，AI 與 n8n 屬後續規劃，尚未提供實作完成證據。",
    availability: "public",
  },
  {
    path: "/contact",
    title: "聯絡我們 | Xplore Kaleidoscope",
    description: "了解如何與 Xplore Kaleidoscope（XK）討論網站、Java 企業系統、系統整合與 AI 應用需求，查看已確認的聯絡資訊與合作準備事項。",
    availability: "public",
  },
  {
    path: "/privacy",
    title: "隱私權政策 | Xplore Kaleidoscope",
    description: "了解 Xplore Kaleidoscope 網站的個人資料處理、第三方服務與隱私權相關資訊。",
    availability: "draft",
  },
] as const satisfies readonly SeoPage[];

export function getSeoPage(path: string): SeoPage {
  const page = seoPages.find((entry) => entry.path === path);
  if (!page) throw new Error(`No SEO entry for implemented page: ${path}`);
  return page;
}
