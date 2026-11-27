import { pagesDeployment } from "./deployment.ts";

export type PrivacySection = Readonly<{
  id: string;
  title: string;
  paragraphs: readonly string[];
}>;

export type PrivacyPolicyConfig = Readonly<{
  status: "draft" | "approved";
  version: string | null;
  effectiveDate: string | null;
  controllerName: string | null;
  rightsContact: Readonly<{ label: string; href: string }> | null;
  sections: readonly PrivacySection[];
}>;

export const privacyDraftMarker = "草案，尚未核准生效";

export const privacyPageMetadata = {
  title: "隱私權政策 | Xplore Kaleidoscope",
  description: "了解 Xplore Kaleidoscope 網站的個人資料處理、第三方服務與隱私權相關資訊。",
  canonical: `${pagesDeployment.origin}/privacy`,
  path: "/privacy",
} as const;

/** Internal review draft only; publication requires verified, same-version approval. */
export const privacyPolicy: PrivacyPolicyConfig = {
  status: "draft",
  version: "draft-1",
  effectiveDate: null,
  controllerName: null,
  rightsContact: null,
  sections: [
    {
      id: "policy-scope",
      title: "政策適用範圍與資料處理主體",
      paragraphs: [
        "本草案用於盤點 Xplore Kaleidoscope（XK）品牌網站的資料行為，供品牌負責人與其指定的法律審閱者核對，尚未核准或生效。品牌名稱本身不代表已確認的法定資料處理主體。",
        "實際資料處理主體、適用法域與政策適用範圍仍待確認；本草案不擅自指定法人、登記資訊、地址或適用法律。",
      ],
    },
    {
      id: "data-collection",
      title: "資料蒐集範圍與來源",
      paragraphs: [
        "目前官網的聯絡頁是靜態資訊頁，未提供線上表單或需求提交功能，已確認可公開的正式聯絡管道清單仍為空。本次不新增應用層收件、帳號註冊或檔案上傳功能。",
        "瀏覽網站時，託管或網路服務可能依其實際設定處理存取相關資料。涉及的欄位、觸發時機、接收者與處理方式仍須核對實際服務及瀏覽器觀察，不能由沒有表單推論完全沒有資料處理。",
      ],
    },
    {
      id: "data-use",
      title: "資料用途與使用方式",
      paragraphs: [
        "目前網站提供品牌、服務、解決方案方向、展示計畫與合作準備資訊，未建立線上需求收件流程；本草案不將商業文件中的候選表單欄位視為已蒐集資料。",
        "託管服務實際處理的資料、目的、使用方式與安全措施須由品牌負責人及部署服務負責人核對，再交由法律審閱者確認。尚未確認的用途、合法依據與安全承諾不在此補寫。",
      ],
    },
    {
      id: "retention",
      title: "保存與刪除",
      paragraphs: [
        "目前尚無經確認的資料保存期限、刪除程序或相關供應商設定可作為正式政策依據。本草案不設定保存年限、自動刪除時點或刪除保證。",
        "正式內容須逐項對應實際資料流，確認保存目的、判定方式、供應商紀錄與刪除條件。這些資訊在確認前保留為內部待辦，不能因官網沒有資料庫而省略託管紀錄的盤點。",
      ],
    },
    {
      id: "third-parties",
      title: "第三方服務與外部連結",
      paragraphs: [
        "網站現有部署流程使用 GitHub Pages 靜態輸出，並保留一般 Next.js 建置模式；服務文案中的 Java、AI 或資料庫技術不代表官網已啟用相應的訪客資料服務。實際託管服務的資料接收者、處理地區、條款與紀錄設定仍待確認。",
        "字體由 next/font 設定，須區分建置時的下載與訪客瀏覽時的實際請求；不能單憑字體名稱宣稱訪客會連線至 Google。本次沒有新增表單、郵件、反垃圾或其他資料接收供應商。",
        "外站連結與直接載入第三方資源應分開盤點。目前沒有可公開的正式聯絡目的地；未來新增外部管道或嵌入服務時，必須先核對其資料行為與告知需求。",
      ],
    },
    {
      id: "cookies-tracking",
      title: "Cookie、儲存與追蹤技術",
      paragraphs: [
        "本次原始碼盤點未發現 Analytics SDK、Cookie、localStorage 或 sessionStorage 寫入，也不為了政策新增追蹤或同意控制。此結果僅描述檢視的應用程式碼，不代表所有託管或網路服務均沒有紀錄。",
        "正式揭露仍須以新的瀏覽器環境檢查實際請求、Cookie 與儲存前後狀態，並確認第三方服務設定及必要與非必要技術的分類。未完成核對前，不宣稱網站永久零追蹤或完全不處理個人資料。",
      ],
    },
    {
      id: "your-rights",
      title: "隱私權相關權利與程序",
      paragraphs: [
        "適用的權利類型、申請範圍、身分核對方式、處理程序與限制，仍須依實際資料處理及適用法域由法律審閱者確認。開發者不在草案中自行確立法定期限或保證處理結果。",
        "在真實權利聯絡管道與可履行的程序確認前，不提供權利申請表單、無效按鈕或虛構的處理承諾；正式政策發布仍受核准門檻限制。",
      ],
    },
    {
      id: "privacy-contact",
      title: "隱私權聯絡方式",
      paragraphs: [
        "目前尚未確認可公開且可用於隱私權事項的正式聯絡管道，因此不提供範例信箱、電話、社群目的地或可點擊的申請入口。商業規劃中的建議地址不代表已建立或可收件的管道。",
        "品牌負責人須先確認管道控制權、公開許可、實際可用性與處理責任，再由法律審閱者核對權利處理方式；確認前請勿透過未驗證目的地傳送帳密、金鑰或敏感資料。",
      ],
    },
    {
      id: "policy-updates",
      title: "政策版本與更新",
      paragraphs: [
        "目前版本為內部草案 draft-1，尚無核准生效日期；版本識別不等於法律核准或正式發布。正式內容、生效日與更新告知方式，須取得品牌負責人及法律審閱者對同一版本的確認。",
        "網站的收件方式、追蹤技術、託管服務或其他資料行為改變時，應重新盤點並審查相關內容。不以建置日期代替政策生效或更新日期，也不以程式碼合併或部署成功代替法律核准。",
      ],
    },
  ],
};
