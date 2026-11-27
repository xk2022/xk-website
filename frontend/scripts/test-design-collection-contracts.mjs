import assert from "node:assert/strict";
import { registerHooks } from "node:module";

// A type-only controller reference must not pull a Client hook into server core.
const serverBoundary = registerHooks({
  load(url, context, nextLoad) {
    assert(!url.endsWith("/src/lib/quotation/storage.ts"), "Interaction core runtime-imported Client storage");
    return nextLoad(url, context);
  },
});
const {
  createDesignInteractionScope,
  designContactInteractions,
  designInteractionResetPolicy,
  designPresentationIsolationContract,
  designQuotationInteractions,
} = await import("../src/lib/design-collection/interactions.ts");
serverBoundary.deregister();

const {
  assertDesignSemanticTokens, requiredDesignTokenSchema, validateDesignSemanticTokens,
} = await import("../src/lib/design-collection/tokens.ts");
const { quotationCatalog } = await import("../src/config/quotation.ts");
const { defaultQuotationSelection } = await import("../src/lib/quotation/calculation.ts");
// Test the existing serialization API; it is never imported at runtime by core.
const { serializeQuotationSelection, quotationStorageKey } = await import("../src/lib/quotation/storage.ts");

let checks = 0;
function test(id, run) {
  run();
  checks++;
  console.log(`PASS ${id}`);
}

const styles = ["modern", "heritage", "luxury"];
const contact = { name: "測試訪客", email: "visitor@example.invalid", service: "", message: "希望規劃企業網站的服務內容與聯絡動線。" };
const selected = { serviceId: "website", buildId: "lp", addonIds: ["multilingual", "analytics"], complexity: "basic" };

test("DCI01-server-core-import-completed-with-client-storage-blocked", () => assert.equal(typeof designQuotationInteractions.calculate, "function"));
for (const style of styles) {
  for (const page of ["contact", "quotation"]) {
    test(`DCI02-scope-${style}-${page}`, () => {
      const scope = createDesignInteractionScope(style, page, { customerName: "PRIVATE_CUSTOMER", projectName: "PRIVATE_PROJECT" });
      assert.deepEqual(scope, { styleId: style, pageKey: page, remountKey: `design-collection:${style}:${page}` });
      assert.deepEqual(Object.keys(scope), ["styleId", "pageKey", "remountKey"]);
      assert(!JSON.stringify(scope).includes("PRIVATE_"));
      assert(Object.isFrozen(scope));
    });
  }
}
for (const style of ["unknown", "modern?email=private@example.invalid", "../luxury", null, { styleId: "modern", name: "PRIVATE_CUSTOMER" }]) {
  test(`DCI03-reject-invalid-style-${checks}`, () => assert.throws(() => createDesignInteractionScope(style, "contact"), RangeError));
}
for (const page of ["home", "collection", "privacy", "contact#PRIVATE_CUSTOMER", null, { pageKey: "contact" }]) {
  test(`DCI04-reject-noninteractive-page-${checks}`, () => assert.throws(() => createDesignInteractionScope("modern", page), RangeError));
}
test("DCI05-distinct-remount-scopes", () => {
  const keys = styles.flatMap((style) => ["contact", "quotation"].map((page) => createDesignInteractionScope(style, page).remountKey));
  assert.equal(new Set(keys).size, 6);
  assert.equal(createDesignInteractionScope("heritage", "contact").remountKey, "design-collection:heritage:contact");
});
test("DCI06-reset-policy-is-explicit-future-integration", () => {
  assert.equal(designInteractionResetPolicy.implementation, "integration-required");
  assert.equal(designInteractionResetPolicy.onScopeChange, "remount-client-controller-and-clear-personal-memory");
  assert.equal(designInteractionResetPolicy.quotationSelection, "restore-ids-through-existing-useQuotationSelection");
  assert.equal(designInteractionResetPolicy.personalDataInUrlOrPersistence, false);
  assert.equal(designInteractionResetPolicy.automaticCopyOrSend, false);
});
test("DCI07-portal-print-descriptors-do-not-claim-runtime-isolation", () => {
  assert.deepEqual(designPresentationIsolationContract.portal, {
    implementation: "integration-required", container: "provided-inside-current-style-frame",
    inheritSemanticTokensFrom: "current-style-frame", defaultDocumentBodyTargetAllowed: false,
  });
  assert.equal(designPresentationIsolationContract.print.implementation, "integration-required");
  assert.equal(designPresentationIsolationContract.print.globalPageRuleChanges, "not-applied-by-core");
  assert.equal(designPresentationIsolationContract.print.summary, "existing-standard-quotation-A4");
});

test("DCI08-contact-valid-minimal", () => assert.deepEqual(designContactInteractions.validate({ ...contact, name: "", service: "" }), {}));
test("DCI09-contact-independent-required-errors", () => {
  assert.deepEqual(designContactInteractions.validate({ ...contact, email: "", message: "短" }), {
    email: "請填寫可回覆的 Email。", message: "請用至少 10 字描述需求。",
  });
  assert.equal(designContactInteractions.createDraft({ ...contact, email: "" }), null);
});
test("DCI10-contact-rejects-header-injection-and-unknown-service", () => {
  assert(designContactInteractions.validate({ ...contact, email: "a@example.invalid\r\nBcc: other@example.invalid" }).email);
  assert(designContactInteractions.validate({ ...contact, service: "unapproved-service" }).service);
});
test("DCI11-contact-known-recipient-and-exact-draft", () => {
  const draft = designContactInteractions.createDraft(contact, [{ label: "Unapproved", href: "mailto:intruder@example.invalid" }]);
  assert.equal(draft.recipient, "system.xk2022@gmail.com");
  assert.equal(draft.subject, "XK 專案詢問");
  const expectedBody = [
    "您好，我想討論以下專案需求：", "", "稱呼：測試訪客", "回覆 Email：visitor@example.invalid",
    "服務方向：尚未確定，想先討論需求", "", "需求摘要：", contact.message, "",
    "請依需求協助確認適合的方案與報價，謝謝。",
  ].join("\r\n");
  assert.equal(draft.body, expectedBody);
  assert.equal(draft.copyText, `收件人：system.xk2022@gmail.com\r\n主旨：XK 專案詢問\r\n\r\n${expectedBody}`);
  assert.deepEqual([...new URL(draft.href).searchParams.keys()], ["subject", "body"]);
});
test("DCI12-contact-long-message-uses-complete-copy", () => {
  const message = "需".repeat(2000);
  const draft = designContactInteractions.createDraft({ ...contact, message });
  assert.equal(draft.href, null);
  assert(draft.copyText.includes(message));
  assert(designContactInteractions.validate({ ...contact, message: "需".repeat(2001) }).message);
});
test("DCI13-contact-raw-input-is-not-mutated", () => {
  const input = Object.freeze({ ...contact });
  const draft = designContactInteractions.createDraft(input);
  assert.deepEqual(input, contact);
  assert(Object.isFrozen(draft));
});

test("DCI14-fresh-default-does-not-share-source-arrays", () => {
  const first = designQuotationInteractions.defaultSelection();
  const second = designQuotationInteractions.defaultSelection();
  assert.deepEqual(first, { serviceId: "website", buildId: null, addonIds: [], complexity: "basic" });
  assert.notStrictEqual(first, second);
  assert.notStrictEqual(first.addonIds, defaultQuotationSelection.addonIds);
  assert.throws(() => first.addonIds.push("membership"), TypeError);
});
test("DCI15-sanitize-whitelists-and-orders-ids-without-personal-fields", () => {
  const input = Object.freeze({ ...selected, addonIds: Object.freeze(["analytics", "multilingual", "analytics", "unknown"]),
    customerName: "PRIVATE_CUSTOMER", projectName: "PRIVATE_PROJECT", email: "private@example.invalid", styleId: "luxury" });
  const safe = designQuotationInteractions.sanitize(input);
  assert.deepEqual(safe, selected);
  assert.equal(input.addonIds.length, 4);
  assert(!JSON.stringify(safe).includes("PRIVATE_") && !JSON.stringify(safe).includes("private@example.invalid"));
});
test("DCI16-original-persistence-key-and-payload-stay-authoritative", () => {
  assert.equal(quotationStorageKey, "xk:quotation:v1");
  const raw = serializeQuotationSelection({ ...selected, customerName: "PRIVATE_CUSTOMER", projectName: "PRIVATE_PROJECT", styleId: "luxury" });
  assert.deepEqual(JSON.parse(raw), { version: 1, ...selected });
  assert(!raw.includes("PRIVATE_") && !raw.includes("luxury"));
});
for (const style of styles) {
  test(`DCI17-identical-contact-and-quotation-${style}`, () => {
    createDesignInteractionScope(style, "contact");
    assert.equal(designContactInteractions.createDraft(contact).recipient, "system.xk2022@gmail.com");
    const estimate = designQuotationInteractions.calculate({ ...selected, styleId: style, customerName: "PRIVATE_CUSTOMER" });
    assert.equal(estimate.oneTime.status, "range");
    assert.equal(estimate.oneTime.min, 26000);
    assert.equal(estimate.oneTime.max, 58000);
    assert.equal(estimate.selectedCount, 3);
  });
}
for (const complexity of ["basic", "standard", "advanced"]) {
  test(`DCI18-complexity-does-not-multiply-${complexity}`, () => {
    const estimate = designQuotationInteractions.calculate({ ...selected, complexity });
    assert.equal(estimate.oneTime.min, 26000);
    assert.equal(estimate.oneTime.max, 58000);
  });
}
const buildExpectations = [
  ["website", "lp", 15000, 30000], ["website", "brand", 25000, 60000],
  ["website", "corp", 30000, 60000], ["website", "shop", 50000, 150000],
  ["system-development", "app", 80000, null], ["system-optimization", "app-optimization", 60000, null],
  ["ai-integration", "ai-chatbot", 30000, 60000], ["ai-integration", "ai-rag", 60000, 120000],
  ["ai-integration", "ai-custom", 100000, null],
];
for (const [serviceId, buildId, minimum, maximum] of buildExpectations) {
  test(`DCI19-independent-base-reference-${buildId}`, () => {
    const estimate = designQuotationInteractions.calculate({ serviceId, buildId, addonIds: [], complexity: "basic" });
    assert.equal(estimate.oneTime.min, minimum);
    assert.equal(estimate.oneTime.max, maximum);
    assert.equal(estimate.oneTime.status, maximum === null ? "from" : "range");
    assert.equal(estimate.selectedCount, 1);
  });
}
test("DCI20-unknown-price-is-not-zero", () => {
  const estimate = designQuotationInteractions.calculate({ ...selected, buildId: "shop", addonIds: ["membership", "domain"] });
  assert.equal(estimate.oneTime.status, "pending");
  assert.equal(estimate.oneTime.min, null);
  assert.equal(estimate.oneTime.max, null);
  assert.equal(estimate.oneTime.knownMin, 50000);
  assert.deepEqual(estimate.oneTime.pendingIds, ["membership"]);
  assert.equal(estimate.annual.status, "pending");
  assert.equal(estimate.annual.min, null);
  assert.equal(estimate.annual.max, null);
  assert.deepEqual(estimate.annual.pendingIds, ["domain"]);
});
test("DCI21-incompatible-and-empty-input-do-not-invent-costs", () => {
  const safe = designQuotationInteractions.sanitize({ ...selected, serviceId: "ai-integration" });
  assert.equal(safe.buildId, null);
  assert.deepEqual(safe.addonIds, []);
  const estimate = designQuotationInteractions.calculate(null);
  assert.equal(estimate.oneTime.status, "empty");
  assert.equal(estimate.oneTime.min, null);
  assert.equal(estimate.oneTime.max, null);
  assert.equal(estimate.selectedCount, 0);
});
test("DCI22-detached-results-cannot-mutate-catalog", () => {
  const before = JSON.stringify(quotationCatalog);
  const estimate = designQuotationInteractions.calculate(selected);
  assert.notStrictEqual(estimate.base, quotationCatalog.builds.find(({ id }) => id === "lp").price);
  assert.throws(() => { estimate.base.min = 1; }, TypeError);
  const rawCopy = structuredClone(estimate);
  rawCopy.base.min = 1;
  rawCopy.lines[0].price.min = 2;
  assert.equal(JSON.stringify(quotationCatalog), before);
  assert.equal(designQuotationInteractions.calculate(selected).oneTime.min, 26000);
});
test("DCI23-inquiry-has-copyable-personal-labels-not-uri-personal-labels", () => {
  const inquiry = designQuotationInteractions.createInquiry(selected, "PRIVATE_CUSTOMER", "PRIVATE_PROJECT");
  assert(inquiry.text.includes("PRIVATE_CUSTOMER") && inquiry.text.includes("PRIVATE_PROJECT"));
  assert(inquiry.text.includes("26,000") && inquiry.text.includes("58,000"));
  assert(inquiry.text.includes("非正式報價"));
  if (inquiry.href) {
    const url = new URL(inquiry.href);
    assert.equal(url.protocol, "mailto:");
    assert.equal(url.pathname, "system.xk2022@gmail.com");
    assert(!decodeURIComponent(inquiry.href).includes("PRIVATE_"));
  }
});

// Synthetic test values, not an exported or approved palette for any style.
function tokenFixture() {
  return {
    color: {
      background: "#fff", surface: "#eee", surfaceForeground: "#123456", foreground: "#123456",
      card: "#fff", cardForeground: "#123456", popover: "#fff", popoverForeground: "#123456",
      muted: "#eee", mutedForeground: "#123456", primary: "#123456", primaryForeground: "#fff",
      secondary: "#123456", secondaryForeground: "#fff", accent: "#123456", accentForeground: "#fff",
      border: "#123456", input: "#123456", ring: "#123456", destructive: "#123456", destructiveForeground: "#fff",
      errorText: "#123456", success: "#123456", successForeground: "#fff", disabled: "#eee", disabledForeground: "#123456",
      disabledBorder: "#123456", selection: "#eee", selectionForeground: "#123456", selectionBorder: "#123456",
      interactiveHover: "#123456", interactiveActive: "#123456", loading: "#eee", loadingForeground: "#123456", empty: "#eee", emptyForeground: "#123456",
    },
    typography: {
      bodyFont: "Inter, 'Noto Sans TC', sans-serif", headingFont: "var(--font-inter), sans-serif",
      caption: "0.875rem", bodySmall: "0.875rem", body: "1rem", bodyLarge: "1.125rem",
      h3: "1.5rem", h2: "2rem", h1: "clamp(2rem, 5vw, 4rem)", bodyLineHeight: 1.7, headingLineHeight: 1.2,
      regularWeight: 400, mediumWeight: 500, semiboldWeight: 600, boldWeight: 700,
    },
    layout: { containerMax: "75rem", gutterMobile: "1rem", gutterDesktop: "2rem" },
    spacing: { tiny: "0.25rem", small: "0.5rem", medium: "1rem", large: "2rem", sectionMobile: "3rem", sectionDesktop: "5rem" },
    radius: { small: "0px", medium: "0.25rem", large: "0.5rem", full: "50%" },
    shadow: { subtle: "0 1px 2px #123456", default: "0 2px 6px rgb(10 20 30 / 0.2)", elevated: "0 4px 12px #123456, 0 1px 2px rgba(10, 20, 30, 0.2)" },
    motion: { fastDuration: "100ms", normalDuration: "200ms", slowDuration: "0.3s", easing: "cubic-bezier(0.2, 0, 0.8, 1)", reducedDuration: "0ms" },
  };
}

const expectedRoles = {
  color: ["background", "surface", "surfaceForeground", "foreground", "card", "cardForeground", "popover", "popoverForeground", "muted", "mutedForeground", "primary", "primaryForeground", "secondary", "secondaryForeground", "accent", "accentForeground", "border", "input", "ring", "destructive", "destructiveForeground", "errorText", "success", "successForeground", "disabled", "disabledForeground", "disabledBorder", "selection", "selectionForeground", "selectionBorder", "interactiveHover", "interactiveActive", "loading", "loadingForeground", "empty", "emptyForeground"],
  typography: ["bodyFont", "headingFont", "caption", "bodySmall", "body", "bodyLarge", "h3", "h2", "h1", "bodyLineHeight", "headingLineHeight", "regularWeight", "mediumWeight", "semiboldWeight", "boldWeight"],
  layout: ["containerMax", "gutterMobile", "gutterDesktop"],
  spacing: ["tiny", "small", "medium", "large", "sectionMobile", "sectionDesktop"],
  radius: ["small", "medium", "large", "full"], shadow: ["subtle", "default", "elevated"],
  motion: ["fastDuration", "normalDuration", "slowDuration", "easing", "reducedDuration"],
};
test("DCT01-complete-independent-role-inventory", () => {
  assert.deepEqual(Object.keys(requiredDesignTokenSchema), Object.keys(expectedRoles));
  for (const [group, roles] of Object.entries(expectedRoles)) assert.deepEqual(Object.keys(requiredDesignTokenSchema[group]), roles);
});
for (const style of styles) {
  test(`DCT02-same-complete-schema-${style}`, () => {
    const tokens = tokenFixture();
    const before = JSON.stringify(tokens);
    assert.deepEqual(validateDesignSemanticTokens(tokens), { valid: true, errors: [] });
    assertDesignSemanticTokens(tokens);
    assert.equal(JSON.stringify(tokens), before);
  });
}
for (const [group, roles] of Object.entries(expectedRoles)) {
  test(`DCT03-missing-group-${group}`, () => {
    const tokens = tokenFixture(); delete tokens[group];
    assert(validateDesignSemanticTokens(tokens).errors.some((error) => error.path === group && error.code === "missing"));
  });
  for (const role of roles) {
    test(`DCT04-missing-role-${group}-${role}`, () => {
      const tokens = tokenFixture(); delete tokens[group][role];
      const result = validateDesignSemanticTokens(tokens);
      assert.equal(result.valid, false);
      assert(result.errors.some((error) => error.path === `${group}.${role}` && error.code === "missing"));
    });
  }
}
const invalidTokens = [
  ["color", "background", "#GGGGGG"], ["color", "primary", ""], ["color", "ring", null],
  ["color", "card", "rgb(300, 0, 0)"], ["color", "surface", "rgb(1,,2,3)"], ["color", "selection", "rgba(0,0,0,2)"],
  ["color", "primary", "#fff; background: red"], ["color", "popover", "url(https://example.invalid/image)"],
  ["typography", "bodyFont", "url(https://example.invalid/font)"], ["typography", "headingFont", "Inter; color:red"],
  ["typography", "body", "0px"], ["typography", "h1", "clamp(1rem, nope, 3rem)"],
  ["typography", "bodyLineHeight", 0], ["typography", "headingLineHeight", Infinity],
  ["typography", "regularWeight", 0], ["typography", "boldWeight", 1001],
  ["layout", "containerMax", "0px"], ["layout", "gutterMobile", "-1rem"],
  ["spacing", "medium", "one unit"], ["radius", "small", -1],
  ["shadow", "default", "not a shadow"], ["shadow", "subtle", "0 2px -1px #123456"],
  ["motion", "fastDuration", "fast"], ["motion", "slowDuration", "-1s"],
  ["motion", "reducedDuration", "100ms"], ["motion", "easing", "cubic-bezier(2, 0, 0, 1)"],
];
for (const [group, role, value] of invalidTokens) {
  test(`DCT05-invalid-value-${group}-${role}-${checks}`, () => {
    const tokens = tokenFixture(); tokens[group][role] = value;
    const result = validateDesignSemanticTokens(tokens);
    assert.equal(result.valid, false);
    assert(result.errors.some((error) => error.path === `${group}.${role}` && error.code === "invalid"));
  });
}
for (const value of [null, [], "tokens", 4, new Date(0)]) {
  test(`DCT06-reject-non-record-${checks}`, () => assert.equal(validateDesignSemanticTokens(value).valid, false));
}
test("DCT07-reject-unknown-group-and-role", () => {
  const tokens = tokenFixture(); tokens.priceTier = "luxury-premium"; tokens.color.unknown = "#fff";
  const result = validateDesignSemanticTokens(tokens);
  assert(result.errors.some((error) => error.path === "priceTier" && error.code === "unknown"));
  assert(result.errors.some((error) => error.path === "color.unknown" && error.code === "unknown"));
});
test("DCT08-reject-inherited-role-and-array-group", () => {
  const tokens = tokenFixture(); tokens.color = Object.create(tokens.color);
  assert.equal(validateDesignSemanticTokens(tokens).valid, false);
  tokens.color = [];
  assert.equal(validateDesignSemanticTokens(tokens).valid, false);
});
test("DCT09-supported-aliases-and-zero-motion", () => {
  const tokens = tokenFixture(); tokens.color.primary = "var(--brand-interactive)"; tokens.color.accent = "#12345678";
  tokens.motion.easing = "ease-in-out"; tokens.motion.reducedDuration = "0s"; tokens.shadow.subtle = "none";
  assert.deepEqual(validateDesignSemanticTokens(tokens), { valid: true, errors: [] });
});
test("DCT10-assertion-reports-path-without-echoing-value", () => {
  const tokens = tokenFixture(); tokens.color.background = "PRIVATE_TOKEN_VALUE";
  assert.throws(() => assertDesignSemanticTokens(tokens), (error) => error instanceof TypeError
    && error.message.includes("color.background") && !error.message.includes("PRIVATE_TOKEN_VALUE"));
});
test("DCT11-existing-modern-aliases-do-not-require-copying-resolved-values", () => {
  const tokens = tokenFixture();
  tokens.layout.containerMax = "var(--container-max)";
  tokens.layout.gutterMobile = "var(--container-gutter)";
  tokens.radius.small = "var(--radius-sm)";
  tokens.typography.h1 = "var(--type-h1-size)";
  tokens.typography.bodyLineHeight = "var(--leading-body)";
  tokens.typography.boldWeight = "var(--weight-bold)";
  tokens.motion.normalDuration = "var(--motion-duration)";
  tokens.motion.easing = "var(--motion-ease)";
  assert.deepEqual(validateDesignSemanticTokens(tokens), { valid: true, errors: [] });
});
test("DCT12-aliases-remain-single-safe-references", () => {
  for (const alias of ["var(--token); color:red", "var(--token, red)", "var(token)", "var(--token name)", "var(--token) url(https://example.invalid)"]) {
    const tokens = tokenFixture();
    tokens.layout.containerMax = alias;
    tokens.typography.bodyLineHeight = alias;
    const result = validateDesignSemanticTokens(tokens);
    assert.equal(result.valid, false);
    assert(result.errors.some(({ path }) => path === "layout.containerMax"));
    assert(result.errors.some(({ path }) => path === "typography.bodyLineHeight"));
  }
});
test("DCT13-reduced-motion-requires-explicit-zero-not-an-alias", () => {
  const tokens = tokenFixture();
  tokens.motion.reducedDuration = "var(--motion-duration)";
  assert(validateDesignSemanticTokens(tokens).errors.some(({ path, code }) => path === "motion.reducedDuration" && code === "invalid"));
});
for (const [group, role, suffix] of [["typography", "h1", "px"], ["layout", "containerMax", "px"], ["motion", "fastDuration", "ms"]]) {
  test(`DCT14-reject-overflowing-literal-${group}-${role}`, () => {
    const tokens = tokenFixture();
    tokens[group][role] = `${"9".repeat(400)}${suffix}`;
    assert(validateDesignSemanticTokens(tokens).errors.some(({ path, code }) => path === `${group}.${role}` && code === "invalid"));
  });
}

console.log(`DESIGN_COLLECTION_CONTRACTS_COMPLETE ${checks} PASS`);
