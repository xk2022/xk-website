import { contactInquiry, type ContactInquiryErrors, type ContactInquiryValues } from "../config/contact-inquiry.ts";
import type { ContactChannel } from "../config/contact.ts";

const singleLineControls = /[\u0000-\u001f\u007f]/;
const messageControls = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

export function validateContactInquiry(values: ContactInquiryValues): ContactInquiryErrors {
  const errors: ContactInquiryErrors = {};
  const { name, email, service, message } = values;
  const limits = contactInquiry.limits;

  if (name.length > limits.name || singleLineControls.test(name)) errors.name = `稱呼請使用 ${limits.name} 字以內的單行文字。`;
  if (!email.trim()) errors.email = "請填寫可回覆的 Email。";
  else if (email.length > limits.email || singleLineControls.test(email) || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email.trim())) errors.email = "請填寫完整、有效的 Email，例如 name@example.com。";
  if (service && !contactInquiry.services.some(({ id }) => id === service)) errors.service = "請從清單選擇服務方向，或選擇尚未確定。";
  if (message.trim().length < limits.messageMin) errors.message = `請用至少 ${limits.messageMin} 字描述需求。`;
  else if (message.length > limits.messageMax || messageControls.test(message)) errors.message = `需求摘要請使用 ${limits.messageMax} 字以內的文字，避免特殊控制字元。`;
  return errors;
}

/** No fetch, storage, URL navigation or logging: all preparation stays in memory. */
export function createContactInquiryDraft(values: ContactInquiryValues, channels: readonly ContactChannel[]) {
  if (Object.keys(validateContactInquiry(values)).length) return null;
  const email = channels.find(({ href }) => href.startsWith("mailto:"));
  if (!email) return null;
  const recipient = new URL(email.href).pathname;
  const service = contactInquiry.services.find(({ id }) => id === values.service)?.title ?? "尚未確定，想先討論需求";
  const subject = contactInquiry.subject;
  const body = [
    "您好，我想討論以下專案需求：", "",
    `稱呼：${values.name.trim() || "未提供"}`,
    `回覆 Email：${values.email.trim()}`,
    `服務方向：${service}`, "", "需求摘要：",
    values.message.trim().replace(/\r\n?|\n/g, "\r\n"), "",
    "請依需求協助確認適合的方案與報價，謝謝。",
  ].join("\r\n");
  const href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return {
    recipient, subject, body,
    copyText: `收件人：${recipient}\r\n主旨：${subject}\r\n\r\n${body}`,
    // Mail clients have different URI limits. Never truncate a visitor's message.
    href: href.length <= contactInquiry.limits.mailtoMax ? href : null,
  };
}

export type ContactInquiryDraft = NonNullable<ReturnType<typeof createContactInquiryDraft>>;
