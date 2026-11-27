export type ServiceTypeId = "website" | "system-development" | "system-optimization" | "ai-integration";
export type ComplexityId = "basic" | "standard" | "advanced";
export type ProductCode = "LP" | "BRAND" | "CORP" | "SHOP" | "APP";
export type BillingPeriod = "one-time" | "annual";

export type ReferencePrice =
  | { readonly kind: "range"; readonly min: number; readonly max: number }
  | { readonly kind: "from"; readonly min: number }
  | { readonly kind: "quote"; readonly reason: string };

export type PriceReference = {
  readonly kind: "company-reference" | "task-provisional" | "unpriced";
  readonly label: string;
  readonly sourceId: string;
};

export type QuotationLink = { readonly href: `/${string}`; readonly label: string };

export type QuotationBuild = {
  readonly id: string;
  readonly serviceId: ServiceTypeId;
  readonly code: ProductCode;
  readonly name: string;
  readonly positioning: string;
  readonly audience: string;
  readonly price: ReferencePrice;
  readonly reference: PriceReference;
  readonly includedAddonIds: readonly string[];
  readonly serviceLink: QuotationLink;
  readonly showcase: (QuotationLink & { readonly status: "demonstration" | "planned" }) | null;
  readonly thirdPartyNotes: readonly string[];
};

export type QuotationAddon = {
  readonly id: string;
  readonly group: "visual" | "content" | "marketing" | "integration" | "maintenance";
  readonly name: string;
  readonly description: string;
  readonly billing: BillingPeriod;
  readonly price: ReferencePrice;
  readonly reference: PriceReference;
  readonly applicableBuildIds: readonly string[];
  readonly thirdPartyNotes: readonly string[];
};

export type QuotationCatalog = {
  readonly version: 1;
  readonly publication: "reference-awaiting-owner-review";
  readonly services: readonly { readonly id: ServiceTypeId; readonly name: string; readonly description: string }[];
  readonly builds: readonly QuotationBuild[];
  readonly addons: readonly QuotationAddon[];
  readonly complexities: readonly { readonly id: ComplexityId; readonly name: string; readonly description: string }[];
};

export type QuotationSelection = {
  readonly serviceId: ServiceTypeId;
  readonly buildId: string | null;
  readonly addonIds: readonly string[];
  readonly complexity: ComplexityId;
};

export type QuotationLine = {
  readonly id: string;
  readonly name: string;
  readonly price: ReferencePrice;
  readonly billing: BillingPeriod;
  readonly included: boolean;
};

export type QuotationTotal = {
  readonly status: "empty" | "range" | "from" | "pending";
  readonly min: number | null;
  readonly max: number | null;
  readonly knownMin: number;
  readonly knownMax: number;
  readonly pendingIds: readonly string[];
  readonly count: number;
};

export type QuotationEstimate = {
  readonly base: ReferencePrice | null;
  readonly oneTimeExtras: QuotationTotal;
  readonly oneTime: QuotationTotal;
  readonly annual: QuotationTotal;
  readonly lines: readonly QuotationLine[];
  readonly selectedCount: number;
  readonly includedAddonIds: readonly string[];
  readonly thirdPartyNotes: readonly string[];
};
