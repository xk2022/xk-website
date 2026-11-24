export type WebsiteShowcasePresentation =
  | "brand-demo"
  | "brand-proposal"
  | "service-preview"
  | "template";

export type WebsiteShowcaseDetail = Readonly<{
  context: string;
  audience: string;
  designDecisions: readonly string[];
  implementedFeatures: readonly string[];
  limitations: readonly string[];
}>;

type WebsiteShowcaseImage = Readonly<{
  src: string;
  alt: string;
  width: number;
  height: number;
}>;

export type WebsiteShowcase = Readonly<{
  id: string;
  title: string;
  kind: "brand-demo" | "template";
  presentation: WebsiteShowcasePresentation;
  category: string;
  summary: string;
  highlights: readonly string[];
  note: string;
  detail?: WebsiteShowcaseDetail;
  sourceHref?: `https://${string}`;
  attribution?: Readonly<{
    label: string;
    href: `https://${string}`;
  }>;
} & (
  | {
      availability?: "available";
      href: `https://${string}`;
      image: WebsiteShowcaseImage;
    }
  | { availability: "preparing"; kind: "brand-demo"; href: null; image: null }
  | {
      availability: "reference-only";
      kind: "template";
      href: null;
      image: null;
      sourceHref: `https://${string}`;
    }
)>;

export type AvailableBrandShowcase = WebsiteShowcase & Readonly<{
  kind: "brand-demo";
  availability?: "available";
  href: `https://${string}`;
  image: WebsiteShowcaseImage;
  detail: WebsiteShowcaseDetail;
}>;

export const presentationLabels = {
  "brand-demo": "自製品牌展示",
  "brand-proposal": "品牌提案展示",
  "service-preview": "自家服務推廣預覽",
  template: "第三方模板參考",
} as const satisfies Readonly<Record<WebsiteShowcasePresentation, string>>;

export const showcaseStateLabels = {
  available: "可瀏覽",
  preparing: "準備中",
  "reference-only": "素材待整理，暫停外連",
} as const;

export const showcaseSettings = {
  featuredIds: ["march-tangbao", "hongjia-birdnest", "honest-diecut"],
  brandOrder: [
    "march-tangbao",
    "hongjia-birdnest",
    "yupinyuan-bento",
    "campaign-website-design",
    "honest-diecut",
    "qiangang-windows",
  ],
  groups: {
    brand: {
      id: "website-cases",
      title: "品牌展示與服務預覽",
      description: "瀏覽自製品牌展示、品牌提案與自家服務推廣預覽，了解各頁的使用情境與實作範圍。",
    },
    templates: {
      id: "website-samples",
      title: "第三方模板參考",
      description: "保留模板來源與署名，供版型參考；素材未齊的來源暫停外連。",
    },
  },
} as const;

export const websiteShowcases = [
  {
    id: "march-tangbao",
    title: "三月手工湯包",
    kind: "brand-demo",
    presentation: "brand-demo",
    category: "餐飲品牌",
    summary: "以湯包、冷滷味與門市資訊串起餐飲內容，展示餐點瀏覽與預留訊息整理。",
    highlights: ["餐點與冷滷味介紹", "預留訊息整理示範", "門市資訊導覽"],
    href: "https://march.xplorekaleidoscope.com/",
    image: {
      src: "/images/showcases/march-tangbao.webp",
      alt: "三月手工湯包展示網站的桌面版首頁畫面",
      width: 1280,
      height: 800,
    },
    note: "自製品牌展示案例；餐點素材為示意，非客戶交付紀錄。",
    detail: {
      context: "以早餐餐點與冷滷味預留為情境，把菜單、預留訊息與門市資訊放在同一頁，呈現在地餐飲網站的內容安排。",
      audience: "想先看餐點、了解門市位置，或整理冷滷味預留內容的訪客。",
      designDecisions: [
        "首頁以餐點與到店動作開場，接續菜單、預留滷味與門市資訊。",
        "把品項、份數與希望取餐時間整理為訊息，讓訪客帶著明確內容再向店家確認。",
        "餐點圖片標示為示意，營業時間另列待店家核對的說明。",
      ],
      implementedFeatures: [
        "餐點清單、門市資訊與導航連結。",
        "滷味品項與份數選擇、取餐日期及時間欄位。",
        "帶入示範資料，以及產生預留訊息的頁面操作。",
      ],
      limitations: [
        "自主展示專案，不能視為客戶委託或已完成訂單的紀錄。",
        "餐點圖片為示意；品項與供應情況仍以門市公告及店家回覆為準。",
        "表單草稿只留在當前頁面，重新整理後清空；產生訊息不代表預留成功。",
        "來源頁營業時間明示正式使用前仍待店家核對。",
      ],
    },
  },
  {
    id: "hongjia-birdnest",
    title: "宏家燕窩",
    kind: "brand-demo",
    presentation: "brand-demo",
    category: "禮品品牌",
    summary: "從親友送禮與企業贈禮情境出發，展示送禮資訊引導與模擬洽詢摘要。",
    highlights: ["親友送禮情境", "企業贈禮情境", "模擬洽詢摘要"],
    href: "https://honbird.xplorekaleidoscope.com/",
    image: {
      src: "/images/showcases/hongjia-birdnest.webp",
      alt: "宏家燕窩展示網站的桌面版首頁畫面",
      width: 1280,
      height: 800,
    },
    note: "自製品牌展示案例；洽詢摘要僅供模擬，實際品項、價格與配送待品牌確認。",
    detail: {
      context: "以燕窩送禮為主題，從送給親友或企業贈禮兩種入口，引導訪客整理份數、日期與包裝配送問題。",
      audience: "正在整理親友送禮或企業贈禮需求，希望先列出已知條件的訪客。",
      designDecisions: [
        "先問送禮對象，再銜接對應的洽詢欄位。",
        "以份數與希望到貨日協助整理需求，容許尚未確定的資訊保留空白。",
        "在表單前清楚標示送禮情境展示與品項、售價、配送待確認的界線。",
      ],
      implementedFeatures: [
        "親友送禮與企業贈禮的情境導覽。",
        "送禮類型、示範信箱、份數、到貨日期與其他需求欄位。",
        "送禮類型選擇與產生模擬洽詢摘要的頁面操作。",
      ],
      limitations: [
        "自製展示案例，未宣稱品牌委託或實際成交成果。",
        "實際品項、售價與配送方式仍待品牌確認。",
        "資料僅留在本頁，重新整理後清除；摘要不代表已送出洽詢。",
      ],
    },
  },
  {
    id: "yupinyuan-bento",
    title: "御品園港式燒臘",
    kind: "brand-demo",
    presentation: "brand-demo",
    category: "餐飲與團體訂餐",
    summary: "以燒臘餐點與團體訂餐情境，展示餐飲品牌的菜單瀏覽與訂餐資訊安排。",
    highlights: ["燒臘餐點展示", "菜單內容分類", "團體訂餐情境"],
    href: "https://yupinyuan.xplorekaleidoscope.com/",
    image: {
      src: "/images/showcases/yupinyuan-bento.webp",
      alt: "御品園港式燒臘展示網站的桌面版首頁畫面",
      width: 1280,
      height: 800,
    },
    note: "自製品牌展示案例；餐點為示意，模擬流程不收件、不代聯絡店家。",
    detail: {
      context: "以港式燒臘餐點與公司、會議、活動便當為情境，將餐點一覽、團訂詢問整理及門市入口整合在一頁。",
      audience: "想先看餐點，或需要整理團體訂餐日期、時間、份數與取餐需求的訪客。",
      designDecisions: [
        "以看菜單與整理團訂詢問作為兩個主要瀏覽入口。",
        "將日期、時間、份數與自取或配送問題整理成可複製的詢問內容。",
        "在門市區分開呈現導航與外送平台，並標示即將離開本站。",
      ],
      implementedFeatures: [
        "燒臘餐點清單與餐點示意圖。",
        "團訂欄位、示範資料、詢問內容預覽與複製入口。",
        "門市導航，以及 Uber Eats、foodpanda 外部連結。",
      ],
      limitations: [
        "自主展示專案，餐點圖片為示意，非客戶交付紀錄。",
        "品項、價格、接單與配送仍以店家公告或回覆為準。",
        "展示版只整理詢問內容，不會代為聯絡店家；草稿重新整理後清空。",
      ],
    },
  },
  {
    id: "campaign-website-design",
    title: "XK 一頁式網站建置",
    kind: "brand-demo",
    presentation: "service-preview",
    category: "網站服務推廣",
    summary: "以在地店家、企業服務與活動推廣為情境，呈現一頁式網站的服務介紹、合作流程與需求整理。",
    highlights: ["適用情境導覽", "合作方式與驗收流程", "需求摘要整理示範"],
    href: "https://web.xplorekaleidoscope.com/",
    image: {
      src: "/images/showcases/campaign-website-design.webp",
      alt: "XK 一頁式網站建置推廣頁的桌面版首頁畫面",
      width: 1280,
      height: 800,
    },
    note: "一頁式服務推廣預覽；介面含虛構品牌，需求摘要僅留在當前頁面。",
    detail: {
      context: "XK 自家的一頁式網站服務推廣預覽，從在地店家、製造與企業服務、品牌與活動三類情境，說明內容安排與合作步驟。",
      audience: "正在整理網站用途、訪客對象、主要動作與現有素材的店家或服務提供者。",
      designDecisions: [
        "從訪客常問的問題帶出網站用途，讓服務內容對應到實際瀏覽動作。",
        "以手機介面示意呈現一頁式內容，旁邊明示虛構品牌的展示性質。",
        "將整理需求、確認頁面、預覽與驗收三步，接到建站需求摘要。",
      ],
      implementedFeatures: [
        "三類適用情境導覽與合作方式說明。",
        "品牌名稱、訪客對象、主要動作及素材選擇欄位。",
        "示範資料、產生需求摘要與複製入口。",
      ],
      limitations: [
        "這是自家服務推廣預覽，介面中的虛構品牌不代表實際客戶網站。",
        "需求草稿只留在此頁，重新整理即清空；不建立正式收件或報名流程。",
        "不需留下聯絡資料；產生摘要不代表需求已送達 XK。",
      ],
    },
  },
  {
    id: "honest-diecut",
    title: "宏能興業",
    kind: "brand-demo",
    presentation: "brand-demo",
    category: "工業製造",
    summary: "整理模切沖型、保護膜與工業標籤等服務，展示製造業網站的資訊與需求引導。",
    highlights: ["加工服務分類", "材料與應用介紹", "詢價需求摘要示範"],
    href: "https://honest.xplorekaleidoscope.com/",
    image: {
      src: "/images/showcases/honest-diecut.webp",
      alt: "宏能興業展示網站的桌面版首頁畫面",
      width: 1280,
      height: 800,
    },
    note: "自製品牌展示案例；詢價摘要僅供模擬，不會寄送或收件。",
    detail: {
      context: "以模切沖型、保護膜與工業標籤為主題，從零件用途引導訪客瀏覽加工樣本，再整理尺寸、材料類別與預估用量。",
      audience: "需要先說明加工用途、使用位置與規格，再進一步詢問材料或打樣的訪客。",
      designDecisions: [
        "以黏貼緩衝、面板保護與條碼識別分類樣本，讓用途先於材料名稱。",
        "每個樣本連到詢價表單，銜接加工用途與規格的描述。",
        "將提供規格、討論材料打樣與評估報價分成三步，保留實際洽談的必要性。",
      ],
      implementedFeatures: [
        "加工樣本分類篩選與各樣本的詢價入口。",
        "公司或單位、用途與規格、加工類別、預估件數及示範信箱欄位。",
        "帶入示範資料與產生模擬詢價摘要的頁面操作。",
      ],
      limitations: [
        "自製展示案例，樣本為示意，不代表客戶交付或加工成果。",
        "資料只在本頁產生摘要，不會寄送給宏能興業。",
        "材料、打樣、可製作性、價格與交期，仍須依實際需求另行洽談。",
      ],
    },
  },
  {
    id: "qiangang-windows",
    title: "千剛實業",
    kind: "brand-demo",
    presentation: "brand-proposal",
    category: "門窗網站",
    availability: "available",
    summary: "以桃園住宅換窗與大園看樣為情境，展示窗型介紹、拍攝指南與門窗需求整理。",
    highlights: ["三種窗型開法示意", "住宅現況拍攝指南", "換窗與看樣需求模擬"],
    href: "https://qiangang.xplorekaleidoscope.com/",
    image: {
      src: "/images/showcases/qiangang-windows.webp",
      alt: "千剛實業門窗提案展示網站的桌面版首頁畫面",
      width: 1280,
      height: 800,
    },
    note: "XK 品牌提案展示；照片僅供本機預覽，詢問與看樣預約皆為模擬操作，不會傳送給千剛實業。",
    detail: {
      context: "以桃園住宅換窗、大園看樣與工程詢價為情境的品牌提案，先說明窗型與拍照方式，再引導訪客整理門窗需求。",
      audience: "想認識開窗方式、描述住宅現況、整理看樣偏好或工程需求的訪客。",
      designDecisions: [
        "從臨路臥室、客廳陽台與整戶翻修的問題，銜接門窗需求欄位。",
        "以橫拉窗、外開窗與外開推射窗示意，說明開法與看樣時可比較的操作空間。",
        "在照片與看樣入口旁清楚標示提案體驗，區分訪客偏好與正式預約。",
      ],
      implementedFeatures: [
        "三種窗型開法示意、住宅現況拍攝指南與常見問題。",
        "住宅換窗、大園看樣、工程詢價三類需求表單，以及示範資料與需求摘要。",
        "現況照片的本機預覽入口，標示支援格式、每張 5 MB 與最多 3 張的限制。",
      ],
      limitations: [
        "品牌提案展示，不能視為品牌委託、正式上線服務或客戶成果。",
        "表單與照片只在本頁處理，不會傳送給千剛實業；詢問與預約皆為模擬。",
        "看樣日期與時段只是訪客偏好，實際預約仍須由業務確認。",
        "窗景與窗型為示意，不據此承諾隔音、施工或產品性能。",
      ],
    },
  },
  {
    id: "demo-001",
    title: "Agency 形象工作室",
    kind: "template",
    presentation: "template",
    category: "工作室形象",
    summary: "以工作室與服務介紹為主題，參考單頁網站如何安排服務、作品與團隊內容。",
    highlights: ["單頁式內容導覽", "服務與作品區塊", "團隊介紹版型"],
    href: "https://xk2022.github.io/single-demo001/",
    image: {
      src: "/images/showcases/demo-001.webp",
      alt: "Agency 形象工作室模板範例的桌面版首頁畫面",
      width: 1280,
      height: 800,
    },
    note: "採用 Start Bootstrap 的 Agency 模板，非 XK 原創設計；素材與互動供版型參考。來源頁聯絡區背景地圖素材仍有缺漏。",
    attribution: {
      label: "Start Bootstrap · Agency",
      href: "https://startbootstrap.com/theme/agency",
    },
  },
  {
    id: "demo-002",
    title: "Creative 簡潔形象",
    kind: "template",
    presentation: "template",
    category: "簡潔形象網站",
    summary: "以醒目的開場與精簡內容區塊，參考品牌形象與服務資訊的單頁呈現。",
    highlights: ["主視覺與行動引導", "精簡服務介紹", "作品圖片編排"],
    availability: "reference-only",
    href: null,
    image: null,
    sourceHref: "https://xk2022.github.io/single-demo002/",
    note: "採用 Start Bootstrap 的 Creative 模板，非 XK 原創設計；來源素材尚待補齊，目前僅供版型參考。",
    attribution: {
      label: "Start Bootstrap · Creative",
      href: "https://startbootstrap.com/theme/creative",
    },
  },
  {
    id: "demo-003",
    title: "GadgetLanding 產品／App",
    kind: "template",
    presentation: "template",
    category: "產品與 App 展示",
    summary: "以產品與 App 為主題，參考功能介紹、畫面展示與下載引導的頁面配置。",
    highlights: ["產品功能介紹", "App 畫面展示", "下載引導版型"],
    availability: "reference-only",
    href: null,
    image: null,
    sourceHref: "https://xk2022.github.io/single-demo003/",
    note: "採用 TemplateMag 的 GadgetLanding 模板，非 XK 原創設計；來源素材尚待補齊，目前僅供版型參考。",
    attribution: {
      label: "TemplateMag · GadgetLanding",
      href: "https://templatemag.com/",
    },
  },
  {
    id: "demo-004",
    title: "FoodLanding 餐廳",
    kind: "template",
    presentation: "template",
    category: "餐廳形象網站",
    summary: "以餐廳與餐點展示為主題，參考菜色圖片、店家介紹與資訊區塊的安排。",
    highlights: ["餐點主視覺", "餐廳介紹版型", "菜色與資訊編排"],
    href: "https://xk2022.github.io/single-demo004/",
    image: {
      src: "/images/showcases/demo-004.webp",
      alt: "FoodLanding 餐廳模板範例的桌面版首頁畫面",
      width: 1280,
      height: 800,
    },
    note: "採用 TemplateMag 的 FoodLanding 模板，供版型參考，非 XK 原創設計。",
    attribution: {
      label: "TemplateMag · FoodLanding",
      href: "https://templatemag.com/",
    },
  },
] as const satisfies readonly WebsiteShowcase[];

export const brandWebsiteShowcases: readonly WebsiteShowcase[] = websiteShowcases.filter(
  (showcase) => showcase.kind === "brand-demo",
);

export const websiteSamples: readonly WebsiteShowcase[] = websiteShowcases.filter(
  (showcase) => showcase.kind === "template",
);

export const featuredWebsiteShowcases: readonly WebsiteShowcase[] = brandWebsiteShowcases.filter(
  (showcase) => showcaseSettings.featuredIds.some((id) => id === showcase.id),
);

export function isAvailableBrandShowcase(
  showcase: WebsiteShowcase,
): showcase is AvailableBrandShowcase {
  return showcase.kind === "brand-demo"
    && showcase.availability !== "preparing"
    && showcase.href !== null
    && showcase.image !== null
    && showcase.detail !== undefined;
}

export function getBrandShowcase(id: string): AvailableBrandShowcase | undefined {
  return brandWebsiteShowcases.find(
    (showcase): showcase is AvailableBrandShowcase => showcase.id === id
      && isAvailableBrandShowcase(showcase),
  );
}

export function showcaseDetailPath(id: string): `/portfolio/showcases/${string}` {
  return `/portfolio/showcases/${id}`;
}

export const showcaseSeoPages = brandWebsiteShowcases.filter(isAvailableBrandShowcase).map(
  (showcase) => ({
    path: showcaseDetailPath(showcase.id),
    title: `${showcase.title}｜XK 作品展示`,
    description: showcase.summary,
    availability: "public" as const,
  }),
);
