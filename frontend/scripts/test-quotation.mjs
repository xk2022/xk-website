import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateQuotation,
  defaultQuotationSelection,
  formatQuotationTotal,
  formatReferencePrice,
  sanitizeQuotationSelection,
} from "../src/lib/quotation/calculation.ts";

// Deliberately small arithmetic fixtures, independent of public reference prices.
const reference = { kind: "task-provisional", label: "Arithmetic fixture", sourceId: "fixture" };
const range = (min, max) => ({ kind: "range", min, max });
const from = (min) => ({ kind: "from", min });
const quote = { kind: "quote", reason: "Scope needs review" };
function build(id, serviceId, price, includedAddonIds = [], thirdPartyNotes = []) {
  return {
    id, serviceId, price, includedAddonIds, thirdPartyNotes, reference,
    code: "LP", name: id, positioning: "Fixture", audience: "Fixture",
    serviceLink: { href: "/services#website-development", label: "Services" }, showcase: null,
  };
}
const buildIds = ["range", "from", "quote", "included", "app"];
function addon(id, billing, price, applicableBuildIds = buildIds, thirdPartyNotes = []) {
  return { id, billing, price, applicableBuildIds, thirdPartyNotes, reference, group: "integration", name: id, description: "Fixture" };
}
function freeze(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}
const catalog = freeze({
  version: 1,
  publication: "reference-awaiting-owner-review",
  services: ["website", "system-development", "system-optimization", "ai-integration"].map((id) => ({ id, name: id, description: "Fixture" })),
  complexities: ["basic", "standard", "advanced"].map((id) => ({ id, name: id, description: "Fixture" })),
  builds: [
    build("range", "website", range(100, 200), [], ["平台費另計", "模型費另計"]),
    build("from", "website", from(300)),
    build("quote", "website", quote),
    build("included", "website", range(1000, 2000), ["included-range", "included-quote", "included-annual", "unknown-included"]),
    build("app", "system-development", range(2000, 3000)),
  ],
  addons: [
    addon("one-range", "one-time", range(10, 20), buildIds, ["平台費另計", "付款手續費另計"]),
    addon("second-range", "one-time", range(3, 4)),
    addon("one-from", "one-time", from(50)),
    addon("one-quote", "one-time", quote),
    addon("year-range", "annual", range(120, 240), buildIds, ["主機費另計"]),
    addon("year-from", "annual", from(100)),
    addon("year-quote", "annual", quote),
    addon("included-range", "one-time", range(900, 900), ["included"]),
    addon("included-quote", "one-time", quote, ["included"]),
    addon("included-annual", "annual", quote, ["included"]),
    addon("app-only", "one-time", range(7, 9), ["app"]),
  ],
});
const selection = (buildId = "range", addonIds = [], complexity = "basic", serviceId = "website") => ({ serviceId, buildId, addonIds, complexity });
const estimate = (buildId = "range", addonIds = [], complexity = "basic", serviceId = "website") => calculateQuotation(selection(buildId, addonIds, complexity, serviceId), catalog);
const emptyTotal = { status: "empty", min: null, max: null, knownMin: 0, knownMax: 0, pendingIds: [], count: 0 };
const boundedTotal = (min, max, count) => ({ status: "range", min, max, knownMin: min, knownMax: max, pendingIds: [], count });

test("Q-CALC-01: default selection does not imply a free or selected build", () => {
  assert.deepEqual(defaultQuotationSelection, { serviceId: "website", buildId: null, addonIds: [], complexity: "basic" });
});

test("Q-CALC-02: non-record restored input safely resets", () => {
  for (const value of [undefined, null, true, 42, "website", [], ["range"]]) {
    assert.deepEqual(sanitizeQuotationSelection(value, catalog), defaultQuotationSelection);
  }
});

test("Q-CALC-03: unknown service resets all dependent state", () => {
  assert.deepEqual(sanitizeQuotationSelection(selection("range", ["one-range"], "advanced", "unknown"), catalog), defaultQuotationSelection);
});

test("Q-CALC-04: mismatched build clears the build and its additions", () => {
  assert.deepEqual(sanitizeQuotationSelection(selection("range", ["one-range"], "advanced", "system-development"), catalog), selection(null, [], "advanced", "system-development"));
});

test("Q-CALC-05: unknown build preserves the valid service/complexity only", () => {
  assert.deepEqual(sanitizeQuotationSelection(selection("obsolete", ["one-range"], "standard"), catalog), selection(null, [], "standard"));
});

test("Q-CALC-06: no build cannot retain chargeable additions", () => {
  assert.deepEqual(sanitizeQuotationSelection(selection(null, ["year-range"]), catalog), selection(null));
});

test("Q-CALC-07: invalid complexity falls back without discarding valid choices", () => {
  assert.deepEqual(sanitizeQuotationSelection(selection("range", ["one-range"], "expert"), catalog), selection("range", ["one-range"]));
});

test("Q-CALC-08: malformed addon list is not treated as a selection", () => {
  assert.deepEqual(sanitizeQuotationSelection(selection("range", "one-range"), catalog), selection("range"));
});

test("Q-CALC-09: duplicate, unknown and nonstring addon IDs are removed in catalog order", () => {
  assert.deepEqual(sanitizeQuotationSelection(selection("range", ["year-range", "one-range", "unknown", "one-range", null, 4]), catalog), selection("range", ["one-range", "year-range"]));
});

test("Q-CALC-10: incompatible addons are discarded", () => {
  assert.deepEqual(sanitizeQuotationSelection(selection("range", ["app-only", "one-range"]), catalog), selection("range", ["one-range"]));
});

test("Q-CALC-11: confirmed included addons are selected automatically, unknown included IDs are ignored", () => {
  assert.deepEqual(sanitizeQuotationSelection(selection("included"), catalog).addonIds, ["included-range", "included-quote", "included-annual"]);
});

test("Q-CALC-12: empty buckets are null, count zero and distinct from free", () => {
  const result = calculateQuotation(defaultQuotationSelection, catalog);
  assert.equal(result.base, null);
  assert.deepEqual(result.oneTime, emptyTotal);
  assert.deepEqual(result.oneTimeExtras, emptyTotal);
  assert.deepEqual(result.annual, emptyTotal);
  assert.equal(result.selectedCount, 0);
  assert.deepEqual(result.lines, []);
  assert.equal(formatQuotationTotal(result.annual), "尚未選擇項目");
});

test("Q-CALC-13: base range always belongs to one-time billing", () => {
  const result = estimate();
  assert.deepEqual(result.oneTime, boundedTotal(100, 200, 1));
  assert.deepEqual(result.oneTimeExtras, emptyTotal);
  assert.deepEqual(result.annual, emptyTotal);
  assert.equal(result.lines[0].billing, "one-time");
});

test("Q-CALC-14: independent range bounds add correctly", () => {
  const result = estimate("range", ["second-range", "one-range"]);
  assert.deepEqual(result.oneTimeExtras, boundedTotal(13, 24, 2));
  assert.deepEqual(result.oneTime, boundedTotal(113, 224, 3));
  assert.equal(result.selectedCount, 3);
});

test("Q-CALC-15: a from base has no fabricated upper bound", () => {
  assert.deepEqual(estimate("from").oneTime, { status: "from", min: 300, max: null, knownMin: 300, knownMax: 0, pendingIds: [], count: 1 });
});

test("Q-CALC-16: finite known upper subtotal does not become a from upper bound", () => {
  const total = estimate("from", ["one-range"]).oneTime;
  assert.deepEqual(total, { status: "from", min: 310, max: null, knownMin: 310, knownMax: 20, pendingIds: [], count: 2 });
  assert.equal(formatQuotationTotal(total), "NT$310 起（上限待評估）");
});

test("Q-CALC-17: a quote base is pending, not zero", () => {
  const total = estimate("quote").oneTime;
  assert.deepEqual(total, { status: "pending", min: null, max: null, knownMin: 0, knownMax: 0, pendingIds: ["quote"], count: 1 });
  assert.equal(formatQuotationTotal(total), "待評估／面議");
});

test("Q-CALC-18: quote additions make the total pending while retaining known partial bounds", () => {
  const result = estimate("range", ["one-quote"]);
  assert.deepEqual(result.oneTime, { status: "pending", min: null, max: null, knownMin: 100, knownMax: 200, pendingIds: ["one-quote"], count: 2 });
  assert.deepEqual(result.oneTimeExtras, { status: "pending", min: null, max: null, knownMin: 0, knownMax: 0, pendingIds: ["one-quote"], count: 1 });
});

test("Q-CALC-19: mixed range/from/quote never exposes a complete numeric interval", () => {
  assert.deepEqual(estimate("range", ["one-from", "one-quote"]).oneTime, { status: "pending", min: null, max: null, knownMin: 150, knownMax: 200, pendingIds: ["one-quote"], count: 3 });
});

test("Q-CALC-20: annual selections stay separate from the base and one-time extras", () => {
  const result = estimate("range", ["year-range"]);
  assert.deepEqual(result.oneTime, boundedTotal(100, 200, 1));
  assert.deepEqual(result.oneTimeExtras, emptyTotal);
  assert.deepEqual(result.annual, boundedTotal(120, 240, 1));
  assert.equal(result.selectedCount, 2);
});

test("Q-CALC-21: annual from remains unbounded when mixed with an annual range", () => {
  assert.deepEqual(estimate("range", ["year-from", "year-range"]).annual, { status: "from", min: 220, max: null, knownMin: 220, knownMax: 240, pendingIds: [], count: 2 });
});

test("Q-CALC-22: annual quote does not turn a known one-time total into pending", () => {
  const result = estimate("range", ["year-quote"]);
  assert.deepEqual(result.oneTime, boundedTotal(100, 200, 1));
  assert.deepEqual(result.annual, { status: "pending", min: null, max: null, knownMin: 0, knownMax: 0, pendingIds: ["year-quote"], count: 1 });
});

test("Q-CALC-23: included unknown and annual prices are not charged or marked pending", () => {
  const result = estimate("included");
  assert.deepEqual(result.oneTime, boundedTotal(1000, 2000, 1));
  assert.deepEqual(result.oneTimeExtras, emptyTotal);
  assert.deepEqual(result.annual, emptyTotal);
  assert.equal(result.selectedCount, 4);
  assert.deepEqual(result.includedAddonIds, ["included-range", "included-quote", "included-annual"]);
  assert.equal(result.lines.length, 4);
  assert.ok(result.lines.slice(1).every(({ included }) => included));
});

test("Q-CALC-24: explicitly selecting included addons never charges them twice", () => {
  assert.deepEqual(estimate("included", ["included-quote", "included-range", "included-range"]), estimate("included"));
});

test("Q-CALC-25: Basic/Standard/Advanced are discussion labels without multipliers", () => {
  const baseline = estimate("range", ["one-range", "year-range"]);
  for (const complexity of ["standard", "advanced"]) assert.deepEqual(estimate("range", ["one-range", "year-range"], complexity), baseline);
});

test("Q-CALC-26: third-party notes are separate, stable and deduplicated", () => {
  const result = estimate("range", ["year-range", "one-range"]);
  assert.deepEqual(result.thirdPartyNotes, ["平台費另計", "模型費另計", "付款手續費另計", "主機費另計"]);
  assert.deepEqual(result.oneTime, boundedTotal(110, 220, 2));
});

test("Q-CALC-27: sanitizing and calculating never mutate selection or catalog", () => {
  const input = freeze(selection("included", ["one-range", "included-quote", "one-range"]));
  const before = JSON.stringify({ input, catalog });
  sanitizeQuotationSelection(input, catalog);
  calculateQuotation(input, catalog);
  assert.equal(JSON.stringify({ input, catalog }), before);
});

test("Q-CALC-28: formatting distinguishes range, starting price, quote and annual absence", () => {
  assert.equal(formatReferencePrice(range(1000, 2000)), "NT$1,000–2,000");
  assert.equal(formatReferencePrice(from(1000)), "NT$1,000 起（上限待評估）");
  assert.equal(formatReferencePrice(quote), "待評估／面議");
  assert.equal(formatReferencePrice(range(1200, 2400), true), "NT$1,200–2,400／年");
  assert.equal(formatReferencePrice(from(1200), true), "NT$1,200 起（上限待評估）／年");
  assert.equal(formatReferencePrice(quote, true), "待評估／面議");
  assert.equal(formatReferencePrice(null), "尚未選擇項目");
  assert.equal(formatReferencePrice(null, true), "未選擇年度項目");
});

test("Q-CALC-29: total formatting never substitutes known partial bounds for a pending total", () => {
  assert.equal(formatQuotationTotal(estimate("range", ["one-range", "one-quote"]).oneTime), "待評估／面議");
  assert.equal(formatQuotationTotal(estimate("range", ["one-range"]).oneTime), "NT$110–220");
});

test("Q-CALC-30: calculation also cleans stale runtime selections", () => {
  assert.deepEqual(calculateQuotation(selection("range", ["one-range"], "basic", "unknown"), catalog), calculateQuotation(defaultQuotationSelection, catalog));
});

test("Q-CALC-31: a valid non-website service uses only its compatible build and additions", () => {
  const result = estimate("app", ["app-only"], "basic", "system-development");
  assert.deepEqual(result.oneTime, boundedTotal(2007, 3009, 2));
});

test("Q-CALC-32: safe defaults do not share mutable restored addon arrays", () => {
  const first = sanitizeQuotationSelection(null, catalog);
  const second = sanitizeQuotationSelection(null, catalog);
  assert.notEqual(first.addonIds, second.addonIds);
  assert.notEqual(first.addonIds, defaultQuotationSelection.addonIds);
});
