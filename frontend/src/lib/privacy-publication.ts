import "server-only";

import { privacyPolicy, type PrivacyPolicyConfig } from "@/config/privacy";

/** Structural safeguard only: approving content still requires the recorded owner/legal review. */
export function isPrivacyPolicyPublished(policy: PrivacyPolicyConfig = privacyPolicy): boolean {
  if (
    policy.status !== "approved" ||
    !policy.version?.trim() ||
    /^draft/i.test(policy.version) ||
    !policy.controllerName?.trim() ||
    !policy.effectiveDate ||
    !/^\d{4}-\d{2}-\d{2}$/.test(policy.effectiveDate) ||
    !policy.rightsContact?.label.trim()
  ) return false;

  const date = new Date(`${policy.effectiveDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== policy.effectiveDate) return false;

  try {
    const contact = new URL(policy.rightsContact.href);
    return (
      (contact.protocol === "https:" && !!contact.hostname && !contact.username && !contact.password) ||
      (contact.protocol === "mailto:" && /^[^\s@?]+@[^\s@?]+\.[^\s@?]+$/.test(contact.pathname) && !contact.search && !contact.hash)
    );
  } catch {
    return false;
  }
}

export function canRenderPrivacyPolicy(): boolean {
  if (isPrivacyPolicyPublished()) return true;
  // Server-only preview is for an isolated local review, never a public preview or Pages export.
  if (process.env.XK_PAGES_EXPORT === "1") return false;
  return process.env.NODE_ENV === "development" || process.env.XK_PRIVACY_PREVIEW === "1";
}
