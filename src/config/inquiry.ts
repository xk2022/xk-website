import { verifiedContactChannels, type ContactChannel } from "./contact.ts";

type InquiryAction = Readonly<{
  state: "preparation" | "direct" | "choose-channel";
  label: "詢價前準備" | "立即詢價";
  href: ContactChannel["href"] | "/contact#contact-preparation" | "/contact#contact-channels";
  description: string;
}>;

/** An enquiry action is available only through the existing verified registry. */
export function getInquiryAction(channels: readonly ContactChannel[]): InquiryAction {
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
    href: channel.href,
    description: channel.href.startsWith("mailto:")
      ? "開啟電子郵件程式，說明您的專案目標與需求範圍。"
      : "前往已確認的聯絡管道，說明您的專案目標與需求範圍。",
  };
}

export const inquiryAction = getInquiryAction(verifiedContactChannels);
