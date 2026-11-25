import assert from "node:assert/strict";
import { test } from "node:test";
import { serializeQuotationSelection, restoreQuotationSelection, quotationStorageKey } from "../src/lib/quotation/storage.ts";
import { createQuotationInquiry } from "../src/lib/quotation/inquiry.ts";
import { calculateQuotation, defaultQuotationSelection } from "../src/lib/quotation/calculation.ts";
import { quotationCatalog } from "../src/config/quotation.ts";

const selected = { serviceId: "website", buildId: "lp", addonIds: ["multilingual", "analytics"], complexity: "standard" };
test("storage uses its own versioned key", () => assert.equal(quotationStorageKey, "xk:quotation:v1"));
test("serialized selection has only approved non-personal fields", () => {
  const raw = serializeQuotationSelection({ ...selected, customerName: "PRIVATE_CUSTOMER", projectName: "PRIVATE_PROJECT", email: "private@example.invalid" });
  assert.deepEqual(Object.keys(JSON.parse(raw)), ["version", "serviceId", "buildId", "addonIds", "complexity"]);
  assert(!raw.includes("PRIVATE_") && !raw.includes("private@example.invalid"));
});
test("valid selection roundtrips", () => assert.deepEqual(restoreQuotationSelection(serializeQuotationSelection(selected)).selection, selected));
test("empty storage uses defaults without a false saved message", () => assert.deepEqual(restoreQuotationSelection(null), { selection: defaultQuotationSelection, storageMessage: "" }));
for (const raw of ["invalid-json", "[]", "null", '{"version":2}', '"plain string"', "x".repeat(4097)]) {
  test("malformed or old data safely restores defaults: " + raw.slice(0, 20), () => {
    const value = restoreQuotationSelection(raw);
    assert.deepEqual(value.selection, defaultQuotationSelection);
    assert(value.storageMessage);
  });
}
test("unknown IDs are removed and communicated", () => {
  const value = restoreQuotationSelection(JSON.stringify({ ...selected, version: 1, buildId: "unapproved", addonIds: ["unknown"] }));
  assert.equal(value.selection.buildId, null);
  assert.deepEqual(value.selection.addonIds, []);
  assert(value.storageMessage);
});
test("prototype-looking JSON does not change a prototype", () => {
  const value = restoreQuotationSelection('{"version":1,"__proto__":{"polluted":true}}');
  assert.deepEqual(value.selection, defaultQuotationSelection);
  assert.equal({}.polluted, undefined);
});
test("complete copied inquiry includes chosen scope and safe optional labels", () => {
  const estimate = calculateQuotation(selected, quotationCatalog);
  const result = createQuotationInquiry(selected, estimate, "PRIVATE_CUSTOMER", "PRIVATE_PROJECT");
  assert(result.text.includes("PRIVATE_CUSTOMER") && result.text.includes("PRIVATE_PROJECT"));
  assert(result.text.includes("26,000") && result.text.includes("58,000"));
  assert(result.text.includes("非正式報價"));
});
test("mail draft URI cannot contain personal labels or additional recipients", () => {
  const estimate = calculateQuotation(selected, quotationCatalog);
  const result = createQuotationInquiry(selected, estimate, "PRIVATE_CUSTOMER", "PRIVATE_PROJECT");
  if (result.href) {
    const u = new URL(result.href);
    assert.equal(u.pathname, "system.xk2022@gmail.com");
    assert.deepEqual([...u.searchParams.keys()], ["subject", "body"]);
    assert(!decodeURIComponent(result.href).includes("PRIVATE_"));
  }
  assert.equal(typeof result.text, "string");
});
