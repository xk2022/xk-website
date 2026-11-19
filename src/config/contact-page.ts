import { verifiedContactChannels, type ContactChannel } from "@/config/contact";
import { serviceCategories, type ServiceId } from "@/config/services";
import { siteConfig } from "@/config/site";

export type ContactAvailability = "unavailable" | "channels-only";

/**
 * Presentation state for an already verified channel list. This does not verify
 * ownership, permission to publish, delivery or response availability.
 */
export function getContactAvailability(
  channels: readonly ContactChannel[],
): ContactAvailability {
  return channels.length > 0 ? "channels-only" : "unavailable";
}

export const contactAvailability = getContactAvailability(verifiedContactChannels);

export type ContactPageLink = {
  readonly label: string;
  readonly href: "/" | "/about" | "/services" | "#contact-channels" | `/services#${ServiceId}`;
};

export type ContactServiceLink = ContactPageLink & {
  readonly id: ServiceId;
  readonly href: `/services#${ServiceId}`;
};

export type ContactPreparationItem = {
  readonly title: string;
  readonly description: string;
};

export type ContactProcessStep = {
  readonly title: string;
  readonly description: string;
};

export type ContactPageSource = {
  readonly id: "C01" | "C02" | "C03" | "C04" | "C05" | "C06";
  readonly repository: "xk2022/xplore-kaleidoscope";
  readonly path: `doc/01_business-plan/${string}`;
  readonly commit: string;
  readonly blobSha: string;
  readonly sections: readonly string[];
  readonly supports: string;
};

type ContactSectionContent = {
  readonly title: string;
  readonly description: string;
};

export type ContactPageContent = {
  readonly availability: ContactAvailability;
  readonly metadata: {
    readonly title: string;
    readonly description: string;
    readonly path: "/contact";
  };
  readonly hero: ContactSectionContent & {
    readonly englishTitle: string;
    readonly primaryCta: ContactPageLink;
    readonly secondaryCta: ContactPageLink;
  };
  readonly channels: ContactSectionContent & {
    readonly emptyTitle: string;
    readonly emptyDescription: string;
    readonly fallbackLinks: readonly ContactPageLink[];
  };
  readonly preparation: ContactSectionContent & {
    readonly items: readonly [ContactPreparationItem, ContactPreparationItem, ContactPreparationItem];
    readonly servicesLabel: string;
  };
  readonly process: ContactSectionContent & {
    readonly steps: readonly [ContactProcessStep, ContactProcessStep, ContactProcessStep];
  };
  readonly dataNote: ContactSectionContent & {
    readonly notes: readonly string[];
  };
  readonly cta: ContactSectionContent & {
    readonly links: readonly ContactPageLink[];
  };
  readonly sourceRefs: readonly ContactPageSource[];
};

const documentationRepository = "xk2022/xplore-kaleidoscope";
const documentationCommit = "95ef1275a46ace76e11f668178ca881087483398";

/** Planning references, not approval of a contact channel, form or legal notice. */
export const contactPageSources = [
  {
    id: "C01", repository: documentationRepository,
    path: "doc/01_business-plan/week-01/05_customer-development.md",
    commit: documentationCommit, blobSha: "8cf9ca6d6111c6031202944ff4b8f345b75f3c22",
    sections: ["§3 Target Customer Segments", "§5 Customer Pain Points", "§10 Discovery Meeting Framework"],
    supports: "從商業目標、目前流程、系統限制與討論範圍準備需求；渠道、KPI、客戶與營收都是規劃，不是已確認收件資訊或成果。",
  },
  {
    id: "C02", repository: documentationRepository,
    path: "doc/01_business-plan/week-02/07_domain-hosting_網域、DNS、主機與部署架構規劃.md",
    commit: documentationCommit, blobSha: "9c1c5c8177c423bacaa97b5199a22430ddf6bc2c",
    sections: ["§12.1 建議電子郵件", "§12.2 Email DNS 設定", "§12.3 郵件用途"],
    supports: "原文只提供建議品牌信箱與郵件規劃，未證明帳號控制、公開許可或收件可用性；不把建議地址放進公開渠道。",
  },
  {
    id: "C03", repository: documentationRepository,
    path: "doc/01_business-plan/week-02/08_website-architecture_官方網站 Next.js 技術架構設計.md",
    commit: documentationCommit, blobSha: "15c1483bf47be33bc29b755a220fb465b5dd8a1a",
    sections: ["§9 Server Components 與 Client Components", "§10 設定檔與內容管理", "§11 API Integration", "§12 Contact Form"],
    supports: "靜態內容與集中設定、提交及資料保護的原則；舊 API、Backend 與範例信箱不構成此次整合授權。",
  },
  {
    id: "C04", repository: documentationRepository,
    path: "doc/01_business-plan/week-02/09_website-mvp_官方網站 MVP 開發規格.md",
    commit: documentationCommit, blobSha: "5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d",
    sections: ["§8 Contact Form 規格"],
    supports: "欄位、送出流程與個資告知是待確認的規劃，不直接採用預算欄位、資料 schema、API 或成功回應。",
  },
  {
    id: "C05", repository: documentationRepository,
    path: "doc/01_business-plan/week-03/02_case-01-corporate-website.md",
    commit: documentationCommit, blobSha: "c9b151d01a7616abb939dd9747d704428d0bdd8c",
    sections: ["§9 Contact Form Specification", "§17 Security & Privacy"],
    supports: "另一組候選欄位及表單／隱私安全要求；不將其與 MVP 欄位合併為核准清單，不建立假表單或假收件結果。",
  },
  {
    id: "C06", repository: documentationRepository,
    path: "doc/01_business-plan/week-01/02_service-catalog.md",
    commit: documentationCommit, blobSha: "cc1c2bacbc1f5367667005a9d4a3b288fc8cfd0c",
    sections: ["§3 S01 — Website Development", "§4 S02 — Java Enterprise Solutions", "§5 S03 — System Architecture & Integration", "§6 S04 — AI Business Solutions", "§11 Maintenance Services"],
    supports: "可討論的服務背景；對外服務名稱及錨點沿用已合併 Services，不採建議價格、固定工期、回應時限或 SLA。",
  },
] as const satisfies readonly ContactPageSource[];

const contactServiceIds = [
  "website-development", "java-enterprise", "system-integration", "ai-automation", "cloud-infrastructure",
] as const satisfies readonly ServiceId[];

/** Reuse the existing service registry instead of maintaining a second name/URL table. */
export const contactServiceLinks: readonly ContactServiceLink[] = contactServiceIds.map((id) => {
  const service = serviceCategories.find((entry) => entry.id === id);
  if (!service) throw new Error(`Unknown contact service: ${id}`);
  return { id, label: service.title, href: `/services#${service.id}` } satisfies ContactServiceLink;
});

export const contactPage = {
  availability: contactAvailability,
  metadata: {
    title: "聯絡我們 | Xplore Kaleidoscope",
    description: "了解如何與 Xplore Kaleidoscope（XK）討論網站、Java 企業系統、系統整合與 AI 應用需求，查看已確認的聯絡資訊與合作準備事項。",
    path: "/contact",
  },
  hero: {
    title: "從理解需求，開始探索合作可能。",
    englishTitle: "Contact XK",
    description: `與 ${siteConfig.name}（${siteConfig.abbreviation}）討論技術需求前，可以先整理目前的問題、使用情境與希望討論的範圍。正式聯絡資訊以本頁確認的管道為準。`,
    primaryCta: { label: "查看聯絡資訊", href: "#contact-channels" },
    secondaryCta: { label: "了解技術服務", href: "/services" },
  },
  channels: {
    title: "確認管道，再開始交流。",
    description: "這裡只提供已確認可公開的正式聯絡管道；尚未提供時，可先瀏覽服務與品牌資訊。",
    emptyTitle: "正式聯絡管道確認中",
    emptyDescription: "目前尚未提供可公開的正式聯絡管道；可先了解服務與品牌，後續依確認資訊更新。",
    fallbackLinks: [
      { label: "了解服務", href: "/services" },
      { label: "認識 XK", href: "/about" },
      { label: "返回首頁", href: "/" },
    ],
  },
  preparation: {
    title: "先整理需求，讓討論更清楚。",
    description: "可從以下三個方向準備，不需要先選好全部技術，也請勿分享帳密或敏感資料。",
    servicesLabel: "依需求了解相關技術服務",
    items: [
      { title: "商業目標", description: "目前想解決什麼問題？希望改善哪個流程，或讓哪些資訊更容易理解？" },
      { title: "現有系統與限制", description: "整理目前網站、系統與作業方式，以及需要保留的功能、資料或使用限制。" },
      { title: "需要討論的範圍", description: "說明預計討論的服務與使用情境，區分目前必要項目與後續方向。" },
    ],
  },
  process: {
    title: "從需求整理，走向合適的下一步。",
    description: "以下是討論前的準備方向，實際範圍、合作方式與回應條件依個別情況確認。",
    steps: [
      { title: "整理需求", description: "先整理商業目標、目前流程、系統限制與希望討論的項目。" },
      { title: "確認可用管道", description: "以本頁列出的已確認管道為準；若尚未提供，可先了解服務與品牌資訊。" },
      { title: "依情況討論下一步", description: "有可用管道後，再依需求確認討論範圍與合作方式，不預設報價、工期或回覆時限。" },
    ],
  },
  dataNote: {
    title: "分享需求前，先留意資訊範圍。",
    description: "本頁提供聯絡與合作準備資訊，目前沒有線上表單或需求提交功能。",
    notes: [
      "本頁未提供線上表單，也不在此頁提交需求資料。",
      "使用已確認的聯絡管道時，請先確認接收對象，只提供討論所需資訊；請勿傳送帳號密碼、金鑰或敏感資料。",
      "網站託管服務可能依其服務設定保留存取紀錄；本頁沒有表單，不代表託管服務完全不處理資料。",
    ],
  },
  cta: {
    title: "先了解適合的技術服務。",
    description: "從服務範圍與品牌介紹了解 XK，整理需求後，再依已確認資訊選擇合適的交流方式。",
    links: [
      { label: "了解服務", href: "/services" },
      { label: "認識 XK", href: "/about" },
      { label: "返回首頁", href: "/" },
    ],
  },
  sourceRefs: contactPageSources,
} as const satisfies ContactPageContent;
