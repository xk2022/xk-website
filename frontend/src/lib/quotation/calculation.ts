import type {
  QuotationCatalog,
  QuotationEstimate,
  QuotationLine,
  QuotationSelection,
  QuotationTotal,
  ReferencePrice,
} from "./types.ts";

export const defaultQuotationSelection: QuotationSelection = Object.freeze({
  serviceId: "website",
  buildId: null,
  addonIds: Object.freeze([] as string[]),
  complexity: "basic",
});

function freshDefault(): QuotationSelection {
  return { ...defaultQuotationSelection, addonIds: [] };
}

/** Restored or stale IDs never carry incompatible additions into a new build. */
export function sanitizeQuotationSelection(input: unknown, catalog: QuotationCatalog): QuotationSelection {
  if (!input || typeof input !== "object" || Array.isArray(input)) return freshDefault();
  const value = input as Record<string, unknown>;
  const service = catalog.services.find(({ id }) => id === value.serviceId);
  if (!service) return freshDefault();
  const complexity = catalog.complexities.find(({ id }) => id === value.complexity)?.id ?? "basic";
  const build = catalog.builds.find(({ id, serviceId }) => id === value.buildId && serviceId === service.id);
  if (!build) return { serviceId: service.id, buildId: null, addonIds: [], complexity };

  const requested = new Set(Array.isArray(value.addonIds)
    ? value.addonIds.filter((id): id is string => typeof id === "string")
    : []);
  const included = new Set(build.includedAddonIds);
  const addonIds = catalog.addons
    .filter(({ id, applicableBuildIds }) => applicableBuildIds.includes(build.id) && (requested.has(id) || included.has(id)))
    .map(({ id }) => id);
  return { serviceId: service.id, buildId: build.id, addonIds, complexity };
}

function totalFor(lines: readonly QuotationLine[]): QuotationTotal {
  let knownMin = 0;
  let knownMax = 0;
  let hasFrom = false;
  const pendingIds: string[] = [];
  for (const { id, price } of lines) {
    if (price.kind === "quote") {
      pendingIds.push(id);
    } else {
      knownMin += price.min;
      if (price.kind === "range") knownMax += price.max;
      else hasFrom = true;
    }
  }
  const status = !lines.length ? "empty" : pendingIds.length ? "pending" : hasFrom ? "from" : "range";
  return {
    status,
    min: status === "range" || status === "from" ? knownMin : null,
    max: status === "range" ? knownMax : null,
    // These are separate partial bounds, never a complete interval when an
    // item is unbounded or pending. A from price contributes no upper bound.
    knownMin,
    knownMax,
    pendingIds,
    count: lines.length,
  };
}

export function calculateQuotation(selection: QuotationSelection, catalog: QuotationCatalog): QuotationEstimate {
  const safe = sanitizeQuotationSelection(selection, catalog);
  const build = catalog.builds.find(({ id }) => id === safe.buildId);
  if (!build) {
    return {
      base: null,
      oneTimeExtras: totalFor([]),
      oneTime: totalFor([]),
      annual: totalFor([]),
      lines: [],
      selectedCount: 0,
      includedAddonIds: [],
      thirdPartyNotes: [],
    };
  }

  const selectedIds = new Set(safe.addonIds);
  const addons = catalog.addons.filter(({ id }) => selectedIds.has(id));
  const included = new Set(build.includedAddonIds);
  const base: QuotationLine = { id: build.id, name: build.name, price: build.price, billing: "one-time", included: false };
  const addonLines: QuotationLine[] = addons.map(({ id, name, price, billing }) => ({ id, name, price, billing, included: included.has(id) }));
  const chargedExtras = addonLines.filter(({ included }) => !included);
  const oneTimeExtras = chargedExtras.filter(({ billing }) => billing === "one-time");
  return {
    base: build.price,
    oneTimeExtras: totalFor(oneTimeExtras),
    oneTime: totalFor([base, ...oneTimeExtras]),
    annual: totalFor(chargedExtras.filter(({ billing }) => billing === "annual")),
    lines: [base, ...addonLines],
    selectedCount: 1 + addons.length,
    includedAddonIds: addons.filter(({ id }) => included.has(id)).map(({ id }) => id),
    thirdPartyNotes: [...new Set([...build.thirdPartyNotes, ...addons.flatMap(({ thirdPartyNotes }) => thirdPartyNotes)])],
  };
}

const numberFormatter = new Intl.NumberFormat("zh-TW", { maximumFractionDigits: 2 });

export function formatReferencePrice(price: ReferencePrice | null, annual = false): string {
  if (!price) return annual ? "未選擇年度項目" : "尚未選擇項目";
  if (price.kind === "quote") return "待評估／面議";
  const minimum = numberFormatter.format(price.min);
  const amount = price.kind === "range"
    ? `NT$${minimum}–${numberFormatter.format(price.max)}`
    : `NT$${minimum} 起（上限待評估）`;
  return annual ? `${amount}／年` : amount;
}

export function formatQuotationTotal(total: QuotationTotal): string {
  if (total.status === "empty") return "尚未選擇項目";
  if (total.status === "range" && total.min !== null && total.max !== null) {
    return formatReferencePrice({ kind: "range", min: total.min, max: total.max });
  }
  if (total.status === "from" && total.min !== null) return formatReferencePrice({ kind: "from", min: total.min });
  return "待評估／面議";
}
