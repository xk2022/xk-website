import type { ServiceId } from "@/config/services";

export type ServicePlan = Readonly<{
  id: "one-page" | "corporate" | "integration";
  title: string;
  nature: "網站建置方向" | "依需求組合";
  audience: string;
  scope: readonly [string, string, string];
  scopeNote: string;
  serviceIds: readonly ServiceId[];
  sourceIds: readonly ("website-plans" | "service-catalog")[];
}>;

/** Planning references support scope discussions, not a published price list. */
export const servicePlanSources = [
  {
    id: "website-plans",
    repository: "xk2022/xplore-kaleidoscope",
    commit: "cd9be948fe843c437d69ed635263a9527e931367",
    path: "doc/02_services/網站建置方案.md",
    blobSha: "02a2685b81f23988fe49d6d0ea03f71fd8c40c43",
    supports: "一頁式與企業形象網站方向；實際內容、互動與交付環境逐案確認。",
  },
  {
    id: "service-catalog",
    repository: "xk2022/xplore-kaleidoscope",
    commit: "cd9be948fe843c437d69ed635263a9527e931367",
    path: "doc/02_services/README.md",
    blobSha: "f15c71d7901946a9ba28048c3ef0260e337a0e2f",
    supports: "網站與系統整合的需求組合，不是現成產品或固定套餐；官網沿用既有服務分類。",
  },
  {
    id: "pricing-strategy",
    repository: "xk2022/xplore-kaleidoscope",
    commit: "cd9be948fe843c437d69ed635263a9527e931367",
    path: "doc/02_services/定價策略.md",
    blobSha: "59fea2a9d9805bbbfa7407a01ce5ce275a737a77",
    supports: "作為需求與成本因素的規劃參考；建議價格未獲本次對外公開核准，不採用數字。",
  },
] as const;

export const servicePlans = [
  {
    id: "one-page",
    title: "一頁式服務推廣",
    nature: "網站建置方向",
    audience: "適合集中介紹一項服務、活動或商品，讓訪客快速理解重點與下一步。",
    scope: [
      "單一主頁與品牌、服務內容區塊規劃。",
      "手機版面與頁面內導覽安排。",
      "連到已確認的詢問或外部購買入口。",
    ],
    scopeNote: "內容素材、互動、部署與第三方費用，依個案確認。外部購買連結與站內結帳分開評估。",
    serviceIds: ["website-development"],
    sourceIds: ["website-plans"],
  },
  {
    id: "corporate",
    title: "企業與品牌官網",
    nature: "網站建置方向",
    audience: "適合持續介紹品牌、服務與可公開案例，讓訪客跨頁了解合作方向。",
    scope: [
      "網站地圖與共用導覽規劃。",
      "首頁、品牌、服務與案例內容安排。",
      "聯絡入口與不同裝置的閱讀體驗。",
    ],
    scopeNote: "頁數、文案與圖片素材分工、互動與修改範圍，於需求確認時逐項約定。",
    serviceIds: ["website-development"],
    sourceIds: ["website-plans"],
  },
  {
    id: "integration",
    title: "網站功能與流程整合",
    nature: "依需求組合",
    audience: "適合需要連結既有資料、API 或內部流程，並逐步擴充網站功能的情境。",
    scope: [
      "串接需求與資料流盤點。",
      "網站互動與 API 介面規劃。",
      "整合邊界與可驗收範圍確認。",
    ],
    scopeNote: "依需求組合網站與系統整合服務；第三方服務、真實收件、後台及權限需求皆另行確認。",
    serviceIds: ["website-development", "system-integration"],
    sourceIds: ["website-plans", "service-catalog"],
  },
] as const satisfies readonly ServicePlan[];

export const servicePlanContent = {
  title: "先比較適合的網站方案方向。",
  description: "從單頁推廣、品牌官網到功能整合，依使用情境與可討論範圍選擇方向；實際內容確認後個別報價。",
  priceLabel: "依需求報價",
  pricingGuideLink: { label: "了解報價評估方式", href: "/services#pricing-guide" },
  pricingGuide: {
    title: "報價前，先確認實際範圍。",
    description: "先釐清目標、內容與功能，再依個別專案整理報價。以下因素會影響製作範圍與後續費用。",
    disclaimer: "本頁提供方案比較與報價評估資訊；實際範圍、費用與合作條件須另行確認，不構成報價單或合約。",
    factors: [
      {
        id: "content",
        title: "頁面與內容",
        description: "網站頁數、內容整理、文案與圖片素材分工，影響規劃及製作範圍。",
      },
      {
        id: "integration",
        title: "互動與串接",
        description: "互動流程、API 或外部服務串接與資料處理方式，逐項確認開發及驗收範圍。",
      },
      {
        id: "maintenance",
        title: "部署與維護",
        description: "部署環境、網域、第三方服務與維護需求，分開確認責任及費用。",
      },
    ],
  },
} as const;
