"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowUpRight, Check, Clipboard, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { verifiedContactChannels } from "@/config/contact";
import { contactInquiry, emptyContactInquiry, type ContactInquiryErrors, type ContactInquiryValues } from "@/config/contact-inquiry";
import { createContactInquiryDraft, validateContactInquiry, type ContactInquiryDraft } from "@/lib/contact-inquiry";

const subscribe = () => () => {};
const hydratedSnapshot = () => true;
const serverSnapshot = () => false;
const labels: Record<keyof ContactInquiryValues, string> = { name: "稱呼", email: "回覆 Email", service: "服務方向", message: "需求摘要" };
const fieldClass = "type-body w-full min-w-0 rounded-md border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:border-destructive";

export function ContactInquiryForm() {
  const hydrated = useSyncExternalStore(subscribe, hydratedSnapshot, serverSnapshot);
  const [values, setValues] = useState<ContactInquiryValues>(emptyContactInquiry);
  const [errors, setErrors] = useState<ContactInquiryErrors>({});
  const [draft, setDraft] = useState<ContactInquiryDraft | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const [copying, setCopying] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLTextAreaElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const draftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Object.keys(errors).length) summaryRef.current?.focus();
  }, [errors]);

  useEffect(() => {
    if (draft) draftRef.current?.focus();
  }, [draft]);

  function update(field: keyof ContactInquiryValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setDraft(null);
    setCopyStatus("");
  }

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContactInquiry(values);
    setErrors(nextErrors);
    setCopyStatus("");
    setDraft(Object.keys(nextErrors).length ? null : createContactInquiryDraft(values, verifiedContactChannels));
  }

  async function copyDraft() {
    if (!draft || copying) return;
    setCopying(true);
    try {
      await navigator.clipboard.writeText(draft.copyText);
      setCopyStatus("已複製詢問內容，請貼到您的郵件中並自行寄出；目前尚未寄信。");
    } catch {
      previewRef.current?.focus();
      previewRef.current?.select();
      setCopyStatus("無法自動複製，已選取預覽文字；請手動複製並貼到您的郵件中。");
    } finally {
      setCopying(false);
    }
  }

  function reset() {
    setValues(emptyContactInquiry);
    setErrors({});
    setDraft(null);
    setCopyStatus("已清除本頁填寫的內容。");
    firstFieldRef.current?.focus();
  }

  function fieldHint(field: keyof ContactInquiryValues) {
    return [`contact-inquiry-${field}-hint`, errors[field] ? `contact-inquiry-${field}-error` : ""].filter(Boolean).join(" ");
  }

  function error(field: keyof ContactInquiryValues) {
    return errors[field] ? <p id={`contact-inquiry-${field}-error`} className="type-body-sm mt-2 font-medium text-destructive">{errors[field]}</p> : null;
  }

  return (
    <Card className="mx-auto max-w-3xl gap-8 sm:p-8">
      <div className="type-body-sm rounded-md border bg-surface p-4 text-foreground">
        <p className="font-semibold">填寫 → 預覽 → 自行寄信</p>
        <p className="mt-2">這是詢問內容整理工具，尚未提供站內直接送出。請勿填入帳號密碼、金鑰或敏感資料。</p>
        <p className="mt-2">輸入僅保留在目前頁面，不會自動儲存或傳送；重新整理或離開後需重新填寫。</p>
      </div>
      <noscript><p className="type-body">需求整理工具需要 JavaScript；您仍可使用下方商務 Email 直接聯絡。</p></noscript>
      <form data-contact-form-mode="email-draft" noValidate onSubmit={prepare} className="min-w-0 space-y-6">
        <p className="type-body-sm text-muted-foreground">標示「必填」的欄位需完成後才能預覽；稱呼與服務方向可略過。</p>
        {Object.keys(errors).length > 0 && (
          <div ref={summaryRef} id="contact-inquiry-errors" role="group" tabIndex={-1} aria-labelledby="contact-inquiry-errors-title" className="rounded-md border border-destructive p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            <h3 id="contact-inquiry-errors-title" className="type-body font-semibold text-destructive">請先確認以下欄位</h3>
            <ul className="type-body-sm mt-2 list-disc space-y-1 pl-5">
              {(Object.keys(errors) as (keyof ContactInquiryValues)[]).map((field) => <li key={field}><a href={`#contact-inquiry-${field}`} className="inline-flex min-h-11 items-center rounded-sm text-secondary underline underline-offset-4">{labels[field]}：{errors[field]}</a></li>)}
            </ul>
          </div>
        )}
        <div className="grid min-w-0 gap-6 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="contact-inquiry-name" className="type-body mb-2 block font-medium">稱呼 <span className="type-body-sm font-normal text-muted-foreground">（選填）</span></label>
            <input ref={firstFieldRef} id="contact-inquiry-name" type="text" autoComplete="name" maxLength={contactInquiry.limits.name} value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={!!errors.name} aria-describedby={fieldHint("name")} className={fieldClass} />
            <p id="contact-inquiry-name-hint" className="type-body-sm mt-2 text-muted-foreground">如何稱呼您，最多 {contactInquiry.limits.name} 字。</p>
            {error("name")}
          </div>
          <div className="min-w-0">
            <label htmlFor="contact-inquiry-email" className="type-body mb-2 block font-medium">回覆 Email <span className="type-body-sm font-normal text-muted-foreground">（必填）</span></label>
            <input id="contact-inquiry-email" type="email" inputMode="email" autoComplete="email" required maxLength={contactInquiry.limits.email} value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={!!errors.email} aria-describedby={fieldHint("email")} className={fieldClass} />
            <p id="contact-inquiry-email-hint" className="type-body-sm mt-2 text-muted-foreground">填入您希望使用的回覆地址。</p>
            {error("email")}
          </div>
        </div>
        <div>
          <label htmlFor="contact-inquiry-service" className="type-body mb-2 block font-medium">服務方向 <span className="type-body-sm font-normal text-muted-foreground">（選填）</span></label>
          <select id="contact-inquiry-service" value={values.service} onChange={(event) => update("service", event.target.value)} aria-invalid={!!errors.service} aria-describedby={fieldHint("service")} className={fieldClass}>
            <option value="">尚未確定，想先討論需求</option>
            {contactInquiry.services.map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
          </select>
          <p id="contact-inquiry-service-hint" className="type-body-sm mt-2 text-muted-foreground">不確定適合哪種服務也可以先說明目標。</p>
          {error("service")}
        </div>
        <div>
          <label htmlFor="contact-inquiry-message" className="type-body mb-2 block font-medium">需求摘要 <span className="type-body-sm font-normal text-muted-foreground">（必填）</span></label>
          <textarea id="contact-inquiry-message" rows={7} required minLength={contactInquiry.limits.messageMin} maxLength={contactInquiry.limits.messageMax} value={values.message} onChange={(event) => update("message", event.target.value)} aria-invalid={!!errors.message} aria-describedby={fieldHint("message")} className={`${fieldClass} resize-y`} />
          <p id="contact-inquiry-message-hint" className="type-body-sm mt-2 text-muted-foreground">請描述專案目標、目前狀況與希望協助的範圍。如有時程或預算方向，可自由補充。至少 {contactInquiry.limits.messageMin} 字，最多 {contactInquiry.limits.messageMax} 字；目前 {values.message.length} 字。</p>
          {error("message")}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button type="submit" size="lg" disabled={!hydrated}><FileText aria-hidden="true" />預覽詢問內容</Button>
          <Button type="button" size="lg" variant="outline" onClick={reset}>清除內容</Button>
        </div>
      </form>
      {draft && (
        <div ref={draftRef} id="contact-inquiry-preview" role="group" tabIndex={-1} aria-labelledby="contact-inquiry-preview-title" className="min-w-0 rounded-md border bg-surface p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-6">
          <h3 id="contact-inquiry-preview-title" className="type-h3 text-primary">確認內容，再自行寄出。</h3>
          <p className="type-body-sm mt-3 text-foreground">詢問內容已準備好，尚未寄出。可開啟郵件草稿，或複製以下文字到您慣用的信箱。</p>
          <label htmlFor="contact-inquiry-draft" className="type-body mt-5 mb-2 block font-medium">詢問內容預覽</label>
          <textarea ref={previewRef} id="contact-inquiry-draft" readOnly rows={10} value={draft.copyText} className={`${fieldClass} resize-y`} />
          {!draft.href && <p className="type-body-sm mt-3 text-foreground">內容較長，為避免郵件程式截斷，請複製完整內容到您的信箱寄出。</p>}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {draft.href && <Button asChild size="lg"><a href={draft.href} data-contact-draft-link="true">開啟郵件草稿<ArrowUpRight aria-hidden="true" /></a></Button>}
            <Button size="lg" variant="outline" onClick={copyDraft} disabled={copying} aria-busy={copying}>{copyStatus.startsWith("已複製") ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}{copying ? "複製中…" : "複製詢問內容"}</Button>
          </div>
        </div>
      )}
      <p role="status" aria-live="polite" aria-atomic="true" className="type-body-sm min-h-6 text-foreground">{copyStatus}</p>
    </Card>
  );
}
