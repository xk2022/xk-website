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
  readonly href: "/" | "/about" | "/services" | "/services#service-plans" | "/services#pricing-guide" | "#contact-channels" | `/services#${ServiceId}`;
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
    title: "從需求摘要開始，討論合適的方案。",
    englishTitle: "Contact XK",
    description: `透過 Email 與 ${siteConfig.name}（${siteConfig.abbreviation}）說明專案目標、現況與希望討論的範圍，後續再釐清需求並確認方案與報價。`,
    secondaryCta: { label: "比較服務方案", href: "/services#service-plans" },
  },
  channels: {
    title: "透過 Email，開始討論您的專案。",
    description: "使用以下商務信箱提供需求摘要；信件由您的郵件程式寄出，本站不會代為提交或顯示寄送成功。",
    emptyTitle: "正式聯絡管道確認中",
    emptyDescription: "目前尚未提供可公開的正式聯絡管道；可先了解服務與品牌，後續依確認資訊更新。",
    fallbackLinks: [
      { label: "了解服務", href: "/services" },
      { label: "認識 XK", href: "/about" },
      { label: "返回首頁", href: "/" },
    ],
  },
  preparation: {
    title: "先整理這三件事，讓詢價更清楚。",
    description: "可從以下三個方向準備，不需要先選好全部技術，也請勿分享帳密或敏感資料。",
    servicesLabel: "依需求了解相關技術服務",
    items: [
      { title: "商業目標", description: "目前想解決什麼問題？希望改善哪個流程，或讓哪些資訊更容易理解？" },
      { title: "現有系統與限制", description: "整理目前網站、系統與作業方式，以及需要保留的功能、資料或使用限制。" },
      { title: "需要討論的範圍", description: "區分目前必要項目與後續方向；如有期望時程與可討論預算，可一併提供，細節仍會逐案確認。" },
    ],
  },
  process: {
    title: "寄出需求後，如何確認下一步？",
    description: "以 Email 往返確認需求與方案，實際回覆安排、討論方式與交付條件依個別情況確認。",
    steps: [
      { title: "寄出需求摘要", description: "以 Email 說明目標、目前狀況與需求範圍，必要時附上可公開的參考網址。" },
      { title: "釐清需求與範圍", description: "透過回信確認對需求的理解、需要補充的資訊與優先順序，再視情況安排進一步討論。" },
      { title: "確認方案與報價", description: "依確認範圍討論交付內容、費用項目、時程與維護方式；合作條件以雙方書面確認為準。" },
    ],
  },
  dataNote: {
    title: "分享需求前，先留意資訊範圍。",
    description: "本頁提供商務 Email 與需求整理表單；寄信與後續回覆在您選擇的郵件服務中進行。",
    notes: [
      "本頁表單只整理與預覽內容，不會直接提交、寄信或確認送達；請在郵件程式中自行寄出。",
      "表單內容只保留於目前頁面；重新整理或離開後需重新填寫，本站不會將輸入寫入瀏覽器持久儲存。",
      "寄出前請確認收件地址、內容與附件；若沒有設定郵件程式，可自行複製信箱地址撰寫郵件。",
      "使用已確認的聯絡管道時，請先確認接收對象，只提供討論所需資訊；請勿傳送帳號密碼、金鑰或敏感資料。",
      "網站託管服務可能依其服務設定保留存取紀錄；本頁不直接收件，不代表託管服務完全不處理資料。",
    ],
  },
  cta: {
    title: "從方案範圍，準備更清楚的詢價。",
    description: "先比較服務方向與影響費用的因素，再以 Email 說明您的目標；實際報價與交付條件會依確認需求討論。",
    links: [
      { label: "比較服務方案", href: "/services#service-plans" },
      { label: "了解報價評估方式", href: "/services#pricing-guide" },
      { label: "返回首頁", href: "/" },
    ],
  },
  sourceRefs: contactPageSources,
} as const satisfies ContactPageContent;
