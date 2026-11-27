import { verifiedContactChannels } from "../../config/contact.ts";
import { designCollectionRegistry } from "../../config/design-collection.ts";
import { quotationCatalog } from "../../config/quotation.ts";
import type { ContactInquiryValues } from "../../config/contact-inquiry.ts";
import { createContactInquiryDraft, validateContactInquiry } from "../contact-inquiry.ts";
import { calculateQuotation, defaultQuotationSelection, sanitizeQuotationSelection } from "../quotation/calculation.ts";
import { createQuotationInquiry } from "../quotation/inquiry.ts";
import type { useQuotationSelection } from "../quotation/storage.ts";
import type { DesignStyleId } from "./types.ts";

export type DesignInteractionPage = "contact" | "quotation";

export type DesignInteractionScope = Readonly<{
  styleId: DesignStyleId;
  pageKey: DesignInteractionPage;
  remountKey: `design-collection:${DesignStyleId}:${DesignInteractionPage}`;
}>;

/** Type-only: future Clients still call the existing hook directly. */
export type DesignQuotationController = ReturnType<typeof useQuotationSelection>;

/** A remount key is not a route, an availability decision or a persistence key. */
export function createDesignInteractionScope(styleId: DesignStyleId, pageKey: DesignInteractionPage): DesignInteractionScope {
  if (!designCollectionRegistry.styles.some(({ id }) => id === styleId)) {
    throw new RangeError("Unsupported design interaction style");
  }
  if (pageKey !== "contact" && pageKey !== "quotation") {
    throw new RangeError("Unsupported design interaction page");
  }
  return Object.freeze({ styleId, pageKey, remountKey: `design-collection:${styleId}:${pageKey}` });
}

/** Required integration behavior, not a controller mounted by this module. */
export const designInteractionResetPolicy = Object.freeze({
  implementation: "integration-required",
  onScopeChange: "remount-client-controller-and-clear-personal-memory",
  contactDraft: "current-scope-memory-only",
  quotationPersonalFields: "current-scope-memory-only",
  quotationSelection: "restore-ids-through-existing-useQuotationSelection",
  automaticCopyOrSend: false,
  personalDataInUrlOrPersistence: false,
} as const);

function detachedReadonly<T>(value: T): Readonly<T> {
  const detached = structuredClone(value);
  function freeze(item: unknown): void {
    if (item && typeof item === "object") {
      Object.values(item).forEach(freeze);
      Object.freeze(item);
    }
  }
  freeze(detached);
  return detached;
}

/** Same validation/draft behavior for every shell; the recipient is not injectable. */
export const designContactInteractions = Object.freeze({
  validate: validateContactInquiry,
  createDraft(values: ContactInquiryValues) {
    return detachedReadonly(createContactInquiryDraft(values, verifiedContactChannels));
  },
});

/** No alternate prices, compatibility, storage or style-dependent calculations. */
export const designQuotationInteractions = Object.freeze({
  defaultSelection() {
    return detachedReadonly(sanitizeQuotationSelection(defaultQuotationSelection, quotationCatalog));
  },
  sanitize(input: unknown) {
    return detachedReadonly(sanitizeQuotationSelection(input, quotationCatalog));
  },
  calculate(input: unknown) {
    const selection = sanitizeQuotationSelection(input, quotationCatalog);
    return detachedReadonly(calculateQuotation(selection, quotationCatalog));
  },
  createInquiry(input: unknown, customerName = "", projectName = "") {
    const selection = sanitizeQuotationSelection(input, quotationCatalog);
    const estimate = calculateQuotation(selection, quotationCatalog);
    return detachedReadonly(createQuotationInquiry(selection, estimate, customerName, projectName));
  },
});

export type DesignPortalContract = Readonly<{
  implementation: "integration-required";
  container: "provided-inside-current-style-frame";
  inheritSemanticTokensFrom: "current-style-frame";
  defaultDocumentBodyTargetAllowed: false;
}>;

export type DesignPrintContract = Readonly<{
  implementation: "integration-required";
  summary: "existing-standard-quotation-A4";
  isolation: "named-page-or-equivalent-reviewed-isolation";
  globalPageRuleChanges: "not-applied-by-core";
  crossStyleAndCrossPagePrintRegression: "required-before-claiming-isolation";
}>;

/**
 * DC-003+ frames must supply their own scoped portal container. DC-006 must
 * apply and test named-page/equivalent print isolation. This descriptor neither
 * mounts a portal nor changes the current @page rule or standard A4 renderer.
 */
export const designPresentationIsolationContract: Readonly<{
  portal: DesignPortalContract;
  print: DesignPrintContract;
}> = Object.freeze({
  portal: Object.freeze({
    implementation: "integration-required",
    container: "provided-inside-current-style-frame",
    inheritSemanticTokensFrom: "current-style-frame",
    defaultDocumentBodyTargetAllowed: false,
  }),
  print: Object.freeze({
    implementation: "integration-required",
    summary: "existing-standard-quotation-A4",
    isolation: "named-page-or-equivalent-reviewed-isolation",
    globalPageRuleChanges: "not-applied-by-core",
    crossStyleAndCrossPagePrintRegression: "required-before-claiming-isolation",
  }),
});
