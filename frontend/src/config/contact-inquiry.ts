import { serviceCategories } from "./services.ts";

/** This is a local email-draft builder, not an online receiving service. */
export const contactInquiry = {
  mode: "email-draft",
  title: "填寫需求，準備一封清楚的詢問信。",
  description: "先在此整理需求，再複製內容或開啟郵件草稿。內容不會由本頁直接送出，請在您的郵件程式中確認並寄出。",
  subject: "XK 專案詢問",
  limits: { name: 80, email: 254, messageMin: 10, messageMax: 2000, mailtoMax: 1800 },
  services: serviceCategories.map(({ id, title }) => ({ id, title })),
} as const;

export type ContactInquiryValues = {
  name: string;
  email: string;
  service: string;
  message: string;
};

export type ContactInquiryErrors = Partial<Record<keyof ContactInquiryValues, string>>;

export const emptyContactInquiry: ContactInquiryValues = {
  name: "", email: "", service: "", message: "",
};
