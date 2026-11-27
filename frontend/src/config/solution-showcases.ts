import type { PortfolioSlug } from "@/config/portfolio";
import type { SolutionId } from "@/config/solutions";

/** Related demonstration plans; completion status stays in the Portfolio registry. */
export const solutionShowcases = {
  "digital-presence": {
    slug: "corporate-website",
    note: "以企業網站為情境，了解品牌資訊、響應式介面與前端架構的展示規劃。",
  },
  "enterprise-management": {
    slug: "enterprise-management",
    note: "以企業管理流程為情境，了解 Java 應用、資料與權限的展示規劃。",
  },
  "system-integration": {
    slug: "integration-hub",
    note: "以模擬系統的資料交換為情境，了解 API 與整合流程的展示規劃。",
  },
  "ai-workflow": {
    slug: "integration-hub",
    note: "此展示以系統整合為規劃主軸；AI 與 n8n 屬後續方向，尚未實作。",
  },
} as const satisfies Record<SolutionId, Readonly<{
  slug: PortfolioSlug;
  note: string;
}>>;
