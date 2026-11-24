import { verifiedContactChannels, type ContactChannel } from "./contact.ts";

type InquiryAction = Readonly<{
  state: "preparation" | "direct" | "choose-channel";
  label: "詢價前準備" | "立即詢價";
  href: ContactChannel["href"] | "/contact#contact-preparation" | "/contact#contact-channels";
  description: string;
}>;

export const inquiryEmailTemplate = {
  subject: "XK 專案詢價",
  fields: ["專案目標", "需求範圍", "目前網站或系統（選填）", "期望時程（選填）", "可討論預算（選填）", "參考網址（選填）"],
} as const;

/** Static prompts only: no visitor data is collected or sent by this website. */
export function createInquiryHref(href: ContactChannel["href"], context?: string): ContactChannel["href"] {
  if (!href.startsWith("mailto:")) return href;
  const recipient = new URL(href).pathname;
  const subject = context ? `${inquiryEmailTemplate.subject}｜${context}` : inquiryEmailTemplate.subject;
  const body = [
    "您好，我想了解 XK 的服務，以下是需求概況：",
    ...(context ? [`參考方案：${context}`] : []),
    "",
    ...inquiryEmailTemplate.fields.map((field) => `${field}：`),
    "",
    "請勿提供帳號密碼、金鑰或敏感資料。",
    "請依需求協助確認適合的方案與報價，謝謝。",
  ].join("\r\n");
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** An enquiry action is available only through the existing verified registry. */
export function getInquiryAction(channels: readonly ContactChannel[], context?: string): InquiryAction {
  const channel = channels[0];
  if (!channel) {
    return {
      state: "preparation",
      label: "詢價前準備",
      href: "/contact#contact-preparation",
      description: "目前尚未開放詢價收件，可先依指南整理專案目標與需求。",
    };
  }

  if (channels.length > 1) {
    return {
      state: "choose-channel",
      label: "立即詢價",
      href: "/contact#contact-channels",
      description: "選擇已確認的聯絡管道，說明您的專案目標與需求範圍。",
    };
  }

  return {
    state: "direct",
    label: "立即詢價",
    href: createInquiryHref(channel.href, context),
    description: channel.href.startsWith("mailto:")
      ? "開啟郵件程式並帶入需求範本，請確認內容後自行寄出；本站不會代為寄信。"
      : "前往已確認的聯絡管道，說明您的專案目標與需求範圍。",
  };
}

export const inquiryAction = getInquiryAction(verifiedContactChannels);
