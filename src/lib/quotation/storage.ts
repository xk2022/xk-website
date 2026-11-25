"use client";

import { useSyncExternalStore } from "react";

import { quotationCatalog } from "../../config/quotation.ts";
import { defaultQuotationSelection, sanitizeQuotationSelection } from "./calculation.ts";
import type { QuotationSelection } from "./types.ts";

export const quotationStorageKey = "xk:quotation:v1";
const invalidNotice = "先前儲存的方案格式已過期或無法讀取，已使用預設選項。";
const blockedNotice = "目前無法使用本機儲存，方案僅保留在本頁；您仍可繼續試算與複製摘要。";

export function serializeQuotationSelection(selection: QuotationSelection): string {
  const safe = sanitizeQuotationSelection(selection, quotationCatalog);
  return JSON.stringify({ version: 1, serviceId: safe.serviceId, buildId: safe.buildId, addonIds: safe.addonIds, complexity: safe.complexity });
}

export function restoreQuotationSelection(raw: string | null) {
  if (raw === null) return { selection: defaultQuotationSelection, storageMessage: "" };
  try {
    if (raw.length > 4096) throw new Error("Oversized selection");
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || !("version" in value) || value.version !== 1) throw new Error("Unknown selection version");
    const selection = sanitizeQuotationSelection(value, quotationCatalog);
    const fields = value as Record<string, unknown>;
    const changed = fields.serviceId !== selection.serviceId || fields.buildId !== selection.buildId || fields.complexity !== selection.complexity || !Array.isArray(fields.addonIds) || fields.addonIds.some((id) => !selection.addonIds.includes(id));
    return { selection, storageMessage: changed ? invalidNotice : "" };
  } catch {
    return { selection: defaultQuotationSelection, storageMessage: invalidNotice };
  }
}

type Snapshot = {
  selection: QuotationSelection;
  hydrated: boolean;
  persistence: "saved" | "unavailable" | "idle";
  storageMessage: string;
};

const serverSnapshot: Snapshot = { selection: defaultQuotationSelection, hydrated: false, persistence: "idle", storageMessage: "" };
let cachedRaw: string | null | undefined;
let cached: Snapshot | undefined;
let volatileSelection = defaultQuotationSelection;
let unavailable = false;
const listeners = new Set<() => void>();

function getSnapshot(): Snapshot {
  if (typeof window === "undefined") return serverSnapshot;
  if (unavailable) {
    if (!cached || cached.selection !== volatileSelection || cached.persistence !== "unavailable") cached = { selection: volatileSelection, hydrated: true, persistence: "unavailable", storageMessage: blockedNotice };
    return cached;
  }
  let raw: string | null;
  try { raw = window.localStorage.getItem(quotationStorageKey); }
  catch { unavailable = true; return getSnapshot(); }
  if (cached && cachedRaw === raw) return cached;
  cachedRaw = raw;
  const restored = restoreQuotationSelection(raw);
  volatileSelection = restored.selection;
  cached = { ...restored, hydrated: true, persistence: raw === null || restored.storageMessage ? "idle" : "saved" };
  return cached;
}

function notify() { for (const listener of listeners) listener(); }

function subscribe(listener: () => void) {
  listeners.add(listener);
  const changed = (event: StorageEvent) => {
    if (event.key === quotationStorageKey || event.key === null) { cached = undefined; cachedRaw = undefined; unavailable = false; listener(); }
  };
  window.addEventListener("storage", changed);
  return () => { listeners.delete(listener); window.removeEventListener("storage", changed); };
}

function setSelection(selection: QuotationSelection) {
  volatileSelection = sanitizeQuotationSelection(selection, quotationCatalog);
  cached = undefined;
  cachedRaw = undefined;
  try { window.localStorage.setItem(quotationStorageKey, serializeQuotationSelection(volatileSelection)); unavailable = false; }
  catch { unavailable = true; }
  notify();
}

function reset() {
  volatileSelection = defaultQuotationSelection;
  cached = undefined;
  cachedRaw = undefined;
  try { window.localStorage.removeItem(quotationStorageKey); unavailable = false; }
  catch { unavailable = true; }
  notify();
}

/** External-store hydration restores options without writing over them on mount. */
export function useQuotationSelection() {
  return { ...useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot), setSelection, reset };
}
