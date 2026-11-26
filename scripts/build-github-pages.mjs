import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { pagesDeployment, assertPagesBasePath } = await import(new URL("../src/config/deployment.ts", import.meta.url));
// Independently approved deployment fixture: a source-config change must not
// silently move this artifact back to a GitHub project path or the apex origin.
assert.deepEqual(pagesDeployment, { origin: "https://www.xplorekaleidoscope.com", basePath: "" }, "Pages must retain the approved www custom-domain root deployment.");
assertPagesBasePath(process.env.XK_PAGES_BASE_PATH);
const basePath = pagesDeployment.basePath;
const { privacyPolicy, privacyDraftMarker, privacyPageMetadata } = await import(new URL("../src/config/privacy.ts", import.meta.url));
const { websiteShowcases, showcaseSettings, showcaseDetailPath, showcaseSeoPages, presentationLabels, showcaseStateLabels } = await import(new URL("../src/config/website-showcases.ts", import.meta.url));
const showcaseContract = JSON.parse(readFileSync(new URL("./fixtures/showcase-contract.json", import.meta.url), "utf8"));
const contactContract = JSON.parse(readFileSync(new URL("./fixtures/contact-contract.json", import.meta.url), "utf8"));
const quotationContract = JSON.parse(readFileSync(new URL("./fixtures/quotation-contract.json", import.meta.url), "utf8"));
const designContract = JSON.parse(readFileSync(new URL("./fixtures/design-collection-contract.json", import.meta.url), "utf8"));
function contentPathFor(path) {
  return designContract.heritageRoutes.find((route) => route.path === path)?.canonicalPath ?? (path || "/");
}
function presentationHref(path, currentPath) {
  return designContract.heritageRoutes.some((route) => route.path === currentPath)
    ? designContract.heritageRoutes.find((route) => route.canonicalPath === path)?.path ?? path : path;
}
for (const logo of Object.values(designContract.heritageLogos)) {
  const source = readFileSync(join(root, "public", logo.src));
  assert.equal(createHash("sha256").update(source).digest("hex"), logo.sha256, "Preserve the independently approved original Logo asset bytes.");
  assert.ok(source.toString().includes(`viewBox="${logo.viewBox}"`), "Preserve the original Logo geometry.");
}
const { quotationCatalog, quotationSources } = await import(new URL("../src/config/quotation.ts", import.meta.url));
const [{ verifiedContactChannels }, { inquiryAction, inquiryEmailTemplate }] = await Promise.all([
  import(new URL("../src/config/contact.ts", import.meta.url)),
  import(new URL("../src/config/inquiry.ts", import.meta.url)),
]);
const { contactInquiry } = await import(new URL("../src/config/contact-inquiry.ts", import.meta.url));
const [{ seoPages, getSeoPage, seoProtectionPolicy }, { siteConfig }, seo, navigation] = await Promise.all([
  import(new URL("../src/config/seo.ts", import.meta.url)),
  import(new URL("../src/config/site.ts", import.meta.url)),
  import(new URL("../src/lib/seo.ts", import.meta.url)),
  import(new URL("../src/config/navigation.ts", import.meta.url)),
]);
assert.deepEqual(seoProtectionPolicy, { mode: "protected", publishSitemap: false }, "SEO protection must remain enabled.");
assert.equal(siteConfig.url, pagesDeployment.origin, "Brand metadata and the Pages deployment origin must agree.");
assert.deepEqual(verifiedContactChannels.map(({ href }) => href), [`mailto:${contactContract.ownerEmail}`], "Publish only the owner-approved enquiry Email.");
assert.equal(inquiryAction.state, contactContract.inquiryState, "The approved Email must enable the direct enquiry action.");
assert.equal(inquiryAction.label, contactContract.inquiryLabel, "Keep the approved enquiry action label.");
assert.deepEqual(inquiryEmailTemplate, { subject: contactContract.mailtoSubject, fields: contactContract.mailtoFields }, "Keep the independently approved static Email prompts.");
assert.equal(verifyMailtoHref(inquiryAction.href, "Configured enquiry action"), "", "The default enquiry must use the general template.");
assert.equal(contactInquiry.mode, contactContract.draftForm.mode, "Contact must remain a local Email-draft form.");
assert.deepEqual(Object.fromEntries(Object.keys(contactContract.draftForm.limits).map((key) => [key, contactInquiry.limits[key]])), contactContract.draftForm.limits, "Keep the independently approved draft-field limits.");
assert.deepEqual(contactInquiry.services.map(({ id }) => id), contactContract.draftForm.serviceIds, "Draft service choices must retain the five approved registry IDs.");
for (const path of contactContract.draftForm.sourceFiles) {
  const source = readFileSync(join(root, path), "utf8");
  for (const pattern of contactContract.draftForm.forbiddenSourcePatterns) assert.doesNotMatch(source, new RegExp(pattern), `${path} must not introduce a network or persistent-storage API.`);
}
function collectApiHandlers(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory()
    ? collectApiHandlers(join(directory, entry.name))
    : /^route\.[cm]?[jt]sx?$/.test(entry.name) ? [join(directory, entry.name)] : []);
}
assert.deepEqual(collectApiHandlers(join(root, "src/app")), [], "The local draft form must not add a receiving API route.");
assert.equal(quotationCatalog.publication, quotationContract.publication, "Estimator prices must remain references awaiting owner review.");
for (const [key, expected] of [["services", quotationContract.serviceIds], ["builds", quotationContract.buildIds], ["addons", quotationContract.addonIds], ["complexities", quotationContract.complexityIds]]) {
  assert.deepEqual(quotationCatalog[key].map(({ id }) => id), expected, `Estimator ${key} must match the independent inventory.`);
}
assert.deepEqual([...new Set(quotationCatalog.builds.map(({ code }) => code))].sort(), [...quotationContract.productCodes].sort(), "Use only LP/BRAND/CORP/SHOP/APP product codes.");
for (const [id, price] of Object.entries(quotationContract.criticalPrices)) assert.deepEqual(quotationCatalog.builds.find((build) => build.id === id)?.price, price, `Keep the approved ${id} source-price decision.`);
assert.deepEqual(quotationCatalog.addons.filter(({ billing }) => billing === "annual").map(({ id }) => id), quotationContract.annualQuoteIds, "Retain the three separately assessed annual services.");
assert.ok(quotationCatalog.addons.filter(({ billing }) => billing === "annual").every(({ price }) => price.kind === "quote"), "Annual costs must not be invented from monthly reference prices.");
assert.ok(quotationCatalog.complexities.every((value) => !Object.keys(value).some((key) => /multiplier|factor|price/i.test(key))), "Complexity is a discussion label, without a price multiplier.");
for (const item of [...quotationCatalog.builds, ...quotationCatalog.addons]) {
  assert.ok(item.reference.label.trim() && quotationSources.some(({ id }) => id === item.reference.sourceId), `${item.id} must retain an attributable reference label.`);
}
function quotationSourceFiles(path) {
  if (statSync(path).isFile()) return /\.[jt]sx?$/.test(path) ? [path] : [];
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => quotationSourceFiles(join(path, entry.name)));
}
for (const path of quotationContract.sourceRoots.flatMap((path) => quotationSourceFiles(join(root, path)))) {
  const source = readFileSync(path, "utf8");
  for (const pattern of [...quotationContract.networkPatterns, ...quotationContract.forbiddenStoragePatterns]) assert.doesNotMatch(source, new RegExp(pattern), `${path} must not add a network, logging or unsupported persistence API.`);
  if (path !== join(root, quotationContract.storageFile)) assert.doesNotMatch(source, /\blocalStorage\b/, `${path} must leave persistence in the dedicated selection-only storage module.`);
  else {
    assert.ok(source.includes(`"${quotationContract.storageKey}"`), "Keep the sole estimator storage key.");
    assert.doesNotMatch(source, /\b(?:customerName|projectName)\b|\.clear\s*\(/, "Estimator storage must not contain personal fields or clear unrelated data.");
  }
}
assert.ok(["draft", "approved"].includes(privacyPolicy.status), "Unknown Privacy policy status.");
const privacyApproved = privacyPolicy.status === "approved";
const privacySectionIds = ["policy-scope", "data-collection", "data-use", "retention", "third-parties", "cookies-tracking", "your-rights", "privacy-contact", "policy-updates"];
assert.deepEqual(privacyPolicy.sections.map(({ id }) => id), privacySectionIds, "Privacy must retain its nine required sections.");

if (privacyApproved) {
  // Structural consistency only; this cannot establish owner/legal approval.
  assert.ok(privacyPolicy.version?.trim() && !/^draft/i.test(privacyPolicy.version), "Approved Privacy requires a non-draft version.");
  assert.ok(privacyPolicy.controllerName?.trim(), "Approved Privacy requires a confirmed controller.");
  assert.match(privacyPolicy.effectiveDate ?? "", /^\d{4}-\d{2}-\d{2}$/, "Approved Privacy requires an effective date.");
  const date = new Date(`${privacyPolicy.effectiveDate}T00:00:00Z`);
  assert.ok(!Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === privacyPolicy.effectiveDate, "Privacy effective date is invalid.");
  assert.ok(privacyPolicy.rightsContact?.label.trim(), "Approved Privacy requires a rights-contact label.");
  const contact = new URL(privacyPolicy.rightsContact.href);
  assert.ok(
    (contact.protocol === "https:" && !!contact.hostname && !contact.username && !contact.password) ||
    (contact.protocol === "mailto:" && /^[^\s@?]+@[^\s@?]+\.[^\s@?]+$/.test(contact.pathname) && !contact.search && !contact.hash),
    "Approved Privacy requires a valid HTTPS or mailto rights contact.",
  );
}

const result = spawnSync(process.execPath, [join(root, "node_modules/next/dist/bin/next"), "build"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, XK_PAGES_EXPORT: "1", XK_PAGES_BASE_PATH: basePath, XK_PRIVACY_PREVIEW: "0" },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

const output = join(root, "out");
// The development tool is never part of a public static deployment. A notFound()
// build normally omits it already; remove any generated route payloads as well.
rmSync(join(output, "dev"), { recursive: true, force: true });
rmSync(join(output, "dev.html"), { force: true });
rmSync(join(output, "dev.txt"), { force: true });
if (!privacyApproved) {
  rmSync(join(output, "privacy"), { recursive: true, force: true });
  rmSync(join(output, "privacy.html"), { force: true });
  rmSync(join(output, "privacy.txt"), { force: true });
  assert.ok(!readdirSync(output).some((name) => name === "privacy" || name.startsWith("privacy.")), "Draft Privacy route or payload remains in the public export.");
}
writeFileSync(join(output, ".nojekyll"), "");

assert.ok(existsSync(join(output, "404.html")), "Missing GitHub Pages 404 document.");

function verifyExportedPage(relativePath, label) {
  const path = join(output, relativePath);
  assert.ok(existsSync(path), `Missing exported ${label}.`);
  const html = readFileSync(path, "utf8");
  assert.match(html, /noindex/, `${label} must retain construction-stage noindex metadata.`);
  assert.ok(html.includes(`${basePath}/_next/static/`), `${label} asset URLs do not match the Pages base path.`);
  return html;
}

function tagAttribute(tag, name) {
  return tag?.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
}

function metadataAttribute(html, selectorAttribute, selectorValue, targetAttribute) {
  const tags = html.match(/<(?:meta|link)\b[^>]*>/g) ?? [];
  const tag = tags.find((value) => tagAttribute(value, selectorAttribute) === selectorValue);
  return tagAttribute(tag, targetAttribute);
}

function verifyStyleHomeLink(links, expectedPath) {
  assert.equal(links.length, 1, "Implemented Gallery styles must have exactly one homepage link.");
  assert.ok(links[0] === expectedPath || (expectedPath !== "/" && links[0] === `${expectedPath}/`), "Implemented Gallery styles must link only to the approved homepage, with at most its single Pages trailing slash.");
}

function verifyModernFrame(html, label) {
  const markup = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
  for (const tag of ["header", "main", "footer", "h1"]) {
    assert.equal([...markup.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "g"))].length, 1, `${label} must render exactly one ${tag}, without duplicate frames.`);
  }
  const main = markup.match(/<main\b[^>]*>/)?.[0];
  assert.equal(tagAttribute(main, "id"), "main-content", `${label} main must remain the skip-link destination.`);
  const skipLinks = [...markup.matchAll(/<a\b[^>]*>/g)].filter(([tag]) => tagAttribute(tag, "href") === "#main-content");
  assert.equal(skipLinks.length, 1, `${label} must render exactly one skip link.`);
  const destinations = [...markup.matchAll(/<[a-z][\w-]*\b[^>]*>/g)].filter(([tag]) => tagAttribute(tag, "id") === "main-content");
  assert.equal(destinations.length, 1, `${label} must render exactly one #main-content ID.`);
}

function verifyMailtoHref(href, label) {
  const url = new URL(href);
  assert.equal(url.protocol, "mailto:", `${label} must use mailto.`);
  assert.equal(url.host, "", `${label} must not contain a mailto authority.`);
  assert.equal(decodeURIComponent(url.pathname), contactContract.ownerEmail, `${label} must target only the owner-approved Email.`);
  assert.equal(url.hash, "", `${label} must not contain a fragment.`);
  assert.deepEqual([...url.searchParams.keys()].sort(), ["body", "subject"], `${label} must contain only one static subject and body, without cc/bcc or extra recipients.`);
  const subject = url.searchParams.get("subject");
  let context = "";
  if (subject !== contactContract.mailtoSubject) {
    const prefix = `${contactContract.mailtoSubject}｜`;
    assert.ok(subject?.startsWith(prefix), `${label} must keep the approved static subject.`);
    context = subject.slice(prefix.length);
    assert.ok(Object.values(contactContract.servicePlanContexts).includes(context), `${label} must use an approved static plan context.`);
  }
  const body = [...contactContract.mailtoBody];
  if (context) body.splice(1, 0, `參考方案：${context}`);
  assert.equal(url.searchParams.get("body"), body.join(contactContract.lineEnding), `${label} must keep the approved static body.`);
  return context;
}

function htmlAttributes(tag) {
  const attributes = new Map();
  const content = tag.replace(/^<[^\s>]+/, "").replace(/\/?>$/, "");
  for (const match of content.matchAll(/([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
    attributes.set(match[1].toLowerCase(), match[2] ?? match[3] ?? match[4] ?? "");
  }
  return attributes;
}

function verifyContactDraftForm(visible, label) {
  const contract = contactContract.draftForm;
  const forms = [...visible.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/gi)];
  assert.equal((visible.match(/<form\b/gi) ?? []).length, 1, `${label} must have exactly one draft form.`);
  assert.equal(forms.length, 1, `${label} must have one complete draft form.`);
  const form = forms[0][0];
  const section = visible.match(/<section\b[^>]*\bid="contact-form"[^>]*>[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.ok(section.includes(form), `${label} draft form must stay inside contact-form.`);
  const attributes = htmlAttributes(form.match(/^<form\b[^>]*>/i)[0]);
  assert.equal(attributes.get("data-contact-form-mode"), contract.mode, `${label} must retain Email-draft mode.`);
  assert.ok(attributes.has("novalidate"), `${label} draft form must use its local validation handler.`);
  for (const tag of form.match(/<[a-z][^>]*>/gi) ?? []) {
    const attrs = htmlAttributes(tag);
    for (const name of contract.forbiddenAttributes) assert.ok(!attrs.has(name), `${label} draft form must not contain ${name}.`);
  }
  const controls = [...form.matchAll(/<(input|select|textarea)\b[^>]*>/gi)];
  assert.equal(controls.length, contract.controls.length, `${label} must render only the four approved editable controls.`);
  for (let index = 0; index < controls.length; index++) {
    const [tag, name] = controls[index];
    const actual = htmlAttributes(tag);
    const expected = contract.controls[index];
    assert.equal(name.toLowerCase(), expected.tag, `${label} control tag differs from the approved contract.`);
    for (const attribute of ["id", "type", "minlength", "maxlength", "autocomplete"]) assert.equal(actual.get(attribute), expected[attribute], `${label} ${expected.id} ${attribute} is incorrect.`);
    assert.equal(actual.has("required"), expected.required, `${label} ${expected.id} required state is incorrect.`);
    assert.ok(!actual.has("readonly") && !actual.has("disabled"), `${label} ${expected.id} must remain editable.`);
    if (name.toLowerCase() === "input") assert.ok(!actual.get("value"), `${label} must not SSR visitor values.`);
    assert.match(form, new RegExp(`<label\\b[^>]*\\bfor="${expected.id}"`), `${label} ${expected.id} must have an associated label.`);
  }
  const select = form.match(/<select\b[^>]*>[\s\S]*?<\/select>/i)?.[0] ?? "";
  assert.deepEqual([...select.matchAll(/<option\b[^>]*>/gi)].map(([tag]) => htmlAttributes(tag).get("value")), ["", ...contract.serviceIds], `${label} must retain the empty choice and five approved services.`);
  assert.ok([...select.matchAll(/<option\b[^>]*>/gi)].every(([tag]) => !htmlAttributes(tag).has("selected") || !htmlAttributes(tag).get("value")), `${label} must not SSR a visitor service selection.`);
  const textarea = form.match(/<textarea\b[^>]*>([\s\S]*?)<\/textarea>/i)?.[1];
  assert.equal(textarea, "", `${label} must not SSR a filled message or preview.`);
  const submits = [...form.matchAll(/<button\b[^>]*>/gi)].map(([tag]) => htmlAttributes(tag)).filter((attrs) => (attrs.get("type") ?? "submit") === "submit");
  assert.equal(submits.length, 1, `${label} must have one preview submit control.`);
  assert.ok(submits[0].has("disabled"), `${label} preview submission must remain disabled before hydration.`);
  const noscript = [...section.matchAll(/<noscript\b[^>]*>([\s\S]*?)<\/noscript>/gi)].map(([, text]) => decodePublicText(text.replace(/<[^>]*>/g, "")));
  assert.ok(noscript.some((text) => text.includes(contract.noscriptText)), `${label} must explain the no-JavaScript Email alternative.`);
  assert.doesNotMatch(visible, /\b(?:id="contact-inquiry-(?:preview|draft)"|data-contact-draft-link=)/i, `${label} must not SSR a filled draft or preview.`);
  return visible.replace(form, "");
}

function verifyQuotationMarkup(visible, label) {
  assert.doesNotMatch(visible, /<form\b|\b(?:action|formaction|method|onsubmit|formmethod|formtarget)\s*=/i, `${label} must remain a local estimator without submission actions.`);
  const expectedInputs = [
    ...quotationContract.serviceIds.map((id) => `quotation-service-${id}`),
    ...quotationContract.initialBuildIds.map((id) => `quotation-build-${id}`),
    ...quotationContract.complexityIds.map((id) => `quotation-complexity-${id}`),
    ...Object.keys(quotationContract.personalInputs),
  ];
  const controls = [];
  const disabledFieldsets = [];
  for (const [tag] of visible.matchAll(/<\/?(?:fieldset|input)\b[^>]*>/gi)) {
    if (/^<\/fieldset/i.test(tag)) disabledFieldsets.pop();
    else if (/^<fieldset/i.test(tag)) disabledFieldsets.push(htmlAttributes(tag).has("disabled"));
    else controls.push({ attrs: htmlAttributes(tag), disabled: disabledFieldsets.some(Boolean) });
  }
  assert.deepEqual(controls.map(({ attrs }) => attrs.get("id")), expectedInputs, `${label} SSR must show only the default service/build/complexity and two personal controls.`);
  assert.deepEqual(controls.filter(({ attrs }) => attrs.has("checked")).map(({ attrs }) => attrs.get("id")), quotationContract.initialCheckedIds, `${label} SSR must select website/basic with no build or addon.`);
  for (const { attrs, disabled } of controls) {
    const id = attrs.get("id");
    assert.ok(disabled || attrs.has("disabled"), `${label} ${id} must be disabled until hydration.`);
    assert.match(visible, new RegExp(`<label\\b[^>]*\\bfor="${id}"`), `${label} ${id} must have a label.`);
    if (id in quotationContract.personalInputs) {
      assert.equal(attrs.get("type"), "text", `${label} personal fields must be plain text.`);
      assert.equal(attrs.get("maxlength"), quotationContract.personalInputs[id], `${label} ${id} length is incorrect.`);
      assert.equal(attrs.has("name"), false, `${label} personal fields must not have submission names.`);
      assert.ok(!attrs.get("value"), `${label} must not SSR personal data.`);
    } else {
      const group = id.startsWith("quotation-service-") ? "service" : id.startsWith("quotation-build-") ? "build" : "complexity";
      assert.equal(attrs.get("type"), "radio", `${label} ${id} must be a native radio.`);
      assert.equal(attrs.get("name"), `quotation-${group}`, `${label} ${id} radio group is incorrect.`);
      assert.equal(attrs.get("value"), id.slice(`quotation-${group}-`.length), `${label} ${id} value is incorrect.`);
    }
  }
  const summaries = [...visible.matchAll(/<textarea\b[^>]*>[\s\S]*?<\/textarea>/gi)];
  assert.equal(summaries.length, 1, `${label} may expose only its readonly enquiry summary.`);
  const summary = htmlAttributes(summaries[0][0].match(/^<textarea\b[^>]*>/i)[0]);
  assert.equal(summary.get("id"), quotationContract.summaryId, `${label} summary ID is incorrect.`);
  assert.ok(summary.has("readonly") && !summary.has("name"), `${label} summary must be readonly and unnamed.`);
  for (const [tag] of visible.matchAll(/<button\b[^>]*>/gi)) assert.equal(htmlAttributes(tag).get("type"), "button", `${label} must not publish a submit button.`);
  const estimator = (visible.match(/<div\b[^>]*>/g) ?? []).find((tag) => tagAttribute(tag, "id") === "quotation-estimator");
  assert.equal(tagAttribute(estimator, "data-quotation-ready"), "false", `${label} SSR must remain unhydrated.`);
  const text = decodePublicText(visible.replace(/<[^>]*>/g, ""));
  for (const value of quotationContract.requiredText) assert.ok(text.includes(value), `${label} must identify its reference/non-quotation boundary.`);
  for (const id of quotationContract.initialBuildIds) {
    const item = quotationCatalog.builds.find((item) => item.id === id);
    assert.ok(text.includes(item.reference.label), `${label} must show ${id} price provenance.`);
  }
  for (const qr of quotationContract.qrImages) {
    const image = (visible.match(/<img\b[^>]*>/g) ?? []).find((tag) => tagAttribute(tag, "id") === qr.id);
    assert.equal(tagAttribute(image, "src"), qr.src, `${label} must retain the fixed root QR image ${qr.id}.`);
  }
  return visible.replace(/<input\b[^>]*>/gi, "").replace(summaries[0][0], "");
}

function verifyEnquiryMarkup(html, label, pagePath = "") {
  const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  const outsideDraft = pagePath === "/contact" ? verifyContactDraftForm(visible, label) : pagePath === quotationContract.path ? verifyQuotationMarkup(visible, label) : visible;
  assert.doesNotMatch(outsideDraft, /<(?:form|input|textarea|select)\b/i, `${label} must not publish another form or input controls.`);
  assert.doesNotMatch(outsideDraft, /\b(?:type="submit"|formaction=|onsubmit=)/i, `${label} must not publish an outbound submit action.`);
  assert.doesNotMatch(visible, /\bhref="tel:/i, `${label} must not publish an unconfirmed phone channel.`);
  const anchors = [...visible.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
  for (const [, attributes] of anchors) {
    const href = decodePublicText(tagAttribute(attributes, "href") ?? "");
    if (/^mailto:/i.test(href)) verifyMailtoHref(href, label);
  }
  const actions = anchors.filter(([, attributes]) => tagAttribute(attributes, "data-inquiry-state") !== undefined);
  assert.ok(actions.length > 0, `${label} must retain a direct enquiry action.`);
  for (const [, attributes, content] of actions) {
    assert.equal(tagAttribute(attributes, "data-inquiry-state"), contactContract.inquiryState, `${label} enquiry state is incorrect.`);
    const context = decodePublicText(tagAttribute(attributes, "data-inquiry-context") ?? "");
    assert.equal(decodePublicText(content.replace(/<[^>]*>/g, "")).trim(), context ? contactContract.planInquiryLabel : contactContract.inquiryLabel, `${label} enquiry label is incorrect.`);
    if (context) assert.equal(decodePublicText(tagAttribute(attributes, "aria-label") ?? ""), `${contactContract.planInquiryLabel}：${context}`, `${label} plan enquiry must have a contextual accessible name.`);
    assert.equal(verifyMailtoHref(decodePublicText(tagAttribute(attributes, "href") ?? ""), label), context, `${label} enquiry context and mail template must agree.`);
  }
  const text = decodePublicText(visible.replace(/<[^>]*>/g, ""));
  for (const pattern of contactContract.forbiddenClaimPatterns) {
    assert.doesNotMatch(text, new RegExp(pattern, "i"), `${label} must not claim delivery, automatic replies or a response SLA.`);
  }
}

function verifyServicePlans(html, pagePath) {
  const plans = html.match(/<section\b[^>]*\bid="service-plans"[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? "";
  assert.ok(plans, `${pagePath} must retain its service-plans section.`);
  assert.deepEqual([...plans.matchAll(/\bdata-service-plan-id="([^"]+)"/g)].map(([, id]) => id), contactContract.servicePlanIds, `${pagePath} must show the three approved service plans in order.`);
  const cards = [...plans.matchAll(/\bdata-service-plan-id="([^"]+)"/g)];
  for (let index = 0; index < cards.length; index++) {
    const id = cards[index][1];
    const card = plans.slice(cards[index].index, cards[index + 1]?.index ?? plans.length);
    assert.ok(card.includes(`data-inquiry-context="${contactContract.servicePlanContexts[id]}"`), `${pagePath} plan ${id} must use its own static enquiry context.`);
    assert.ok(card.includes("依需求報價"), `${pagePath} plan ${id} must show the honest quote-by-scope state.`);
  }
  const pricing = pagePath === "/services"
    ? html.match(/<section\b[^>]*\bid="pricing-guide"[^>]*>([\s\S]*?)<\/section>/)?.[1]
    : "";
  if (pagePath === "/services") assert.ok(pricing, "Services must retain the pricing-guide section.");
  const text = decodePublicText(`${plans}${pricing ?? ""}`.replace(/<[^>]*>/g, ""));
  assert.doesNotMatch(text, new RegExp(contactContract.unapprovedPricePattern, "i"), `${pagePath} must not publish unapproved numerical prices.`);
}

function verifyBrandUrl(value, expectedPath, label) {
  assert.ok(value, `${label} is missing.`);
  const url = new URL(value);
  assert.equal(url.origin, pagesDeployment.origin, `${label} origin is incorrect.`);
  assert.equal(url.pathname.replace(/\/$/, ""), expectedPath, `${label} path is incorrect.`);
  assert.equal(url.search, "", `${label} must not contain a query string.`);
  assert.equal(url.hash, "", `${label} must not contain a fragment.`);
}

const assetOrigin = "https://pages.invalid";
const checkedAssets = new Set();

function verifyNoLegacyProjectPath(reference, fromUrl, label) {
  if (!reference) return;
  const url = new URL(reference.replaceAll("&amp;", "&"), fromUrl);
  const websiteOrigins = new Set([assetOrigin, pagesDeployment.origin, "https://xplorekaleidoscope.com", "https://xk2022.github.io"]);
  assert.ok(!websiteOrigins.has(url.origin) || !/^\/xk-website(?:\/|$)/.test(decodeURIComponent(url.pathname)), `${label} references the retired /xk-website/ deployment prefix: ${reference}`);
}

function verifyAsset(reference, fromUrl, label) {
  if (!reference || reference.startsWith("#")) return;
  verifyNoLegacyProjectPath(reference, fromUrl, label);
  const url = new URL(reference.replaceAll("&amp;", "&"), fromUrl);
  // Remote and embedded resources are covered by browser/network checks.
  if (url.origin !== assetOrigin) return;

  assert.ok(url.pathname.startsWith(`${basePath}/`), `${label} asset is missing the Pages base path: ${reference}`);
  const relativePath = decodeURIComponent(url.pathname.slice(basePath.length)).replace(/^\/+/, "");
  const assetPath = resolve(output, relativePath);
  assert.ok(assetPath.startsWith(`${output}${sep}`), `${label} asset escapes the output directory: ${reference}`);
  assert.ok(existsSync(assetPath) && statSync(assetPath).isFile(), `${label} references a missing asset: ${reference}`);

  if (checkedAssets.has(assetPath)) return;
  checkedAssets.add(assetPath);
  if (assetPath.endsWith(".css")) {
    const css = readFileSync(assetPath, "utf8");
    for (const match of css.matchAll(/url\(\s*(["']?)([^"'()\s]+)\1\s*\)/g)) {
      verifyAsset(match[2], url, label);
    }
  }
}

function verifyReferencedAssets(html, pagePath, label) {
  const fromUrl = new URL(`${basePath}${pagePath}/`, assetOrigin);
  for (const tag of html.match(/<(?:a|script|link|img|source|video|audio)\b[^>]*>/g) ?? []) {
    for (const attribute of ["href", "src", "poster"]) {
      verifyNoLegacyProjectPath(tagAttribute(tag, attribute), fromUrl, label);
    }
    if (tag.startsWith("<link")) {
      const rel = tagAttribute(tag, "rel") ?? "";
      if (/\b(?:stylesheet|preload|modulepreload|icon|apple-touch-icon|mask-icon)\b/.test(rel)) {
        verifyAsset(tagAttribute(tag, "href"), fromUrl, label);
      }
    } else {
      verifyAsset(tagAttribute(tag, "src"), fromUrl, label);
      verifyAsset(tagAttribute(tag, "poster"), fromUrl, label);
      const srcSet = tagAttribute(tag, "srcSet") ?? tagAttribute(tag, "srcset");
      if (srcSet && !srcSet.startsWith("data:")) {
        for (const candidate of srcSet.split(",")) {
          verifyAsset(candidate.trim().split(/\s+/)[0], fromUrl, label);
        }
      }
    }
  }
}

const portfolioPages = [
  {
    pagePath: "/portfolio",
    label: "Portfolio",
    title: "作品展示 | Xplore Kaleidoscope",
    description: "瀏覽 XK 的品牌網站展示、一頁式網站範例與技術展示規劃，探索餐飲、禮贈及工業情境的網站內容與介面風格。",
  },
  {
    pagePath: "/portfolio/corporate-website",
    label: "Corporate Website portfolio detail",
    title: "XK Corporate Website Showcase | XK 技術作品集",
    description: "XK Corporate Website Showcase 自製展示規劃，目前為 Planned；探索企業網站的品牌資訊、響應式版面與可維護前端方向，尚未提供完整案例系統的實作與部署證據。",
  },
  {
    pagePath: "/portfolio/enterprise-management",
    label: "Enterprise Management portfolio detail",
    title: "XK Enterprise Management System | XK 技術作品集",
    description: "XK Enterprise Management System 自製展示規劃，目前為 Planned；了解 Java 管理系統的流程、資料與權限規劃，模組範圍仍待確認，尚未提供實作完成證據。",
  },
  {
    pagePath: "/portfolio/integration-hub",
    label: "Integration Hub portfolio detail",
    title: "XK Enterprise Integration Hub | XK 技術作品集",
    description: "XK Enterprise Integration Hub 自製展示規劃，目前為 Planned；探索模擬系統之間的 API 與資料交換方向，AI 與 n8n 屬後續規劃，尚未提供實作完成證據。",
  },
];

const expectedShowcasePaths = showcaseContract.brandOrder.map((id) => `/portfolio/showcases/${id}`);
assert.deepEqual(websiteShowcases.map(({ id }) => id), [...showcaseContract.brandOrder, ...showcaseContract.templateIds], "Showcase inventory must match the independently reviewed contract.");
assert.equal(new Set(websiteShowcases.map(({ id }) => id)).size, websiteShowcases.length, "Website showcase IDs must be unique.");
assert.deepEqual(websiteShowcases.filter(({ kind }) => kind === "brand-demo").map(({ id }) => id), showcaseContract.brandOrder, "Keep the owner-approved brand order.");
assert.ok(websiteShowcases.filter(({ kind }) => kind === "brand-demo").every(({ availability }) => (availability ?? "available") === "available"), "All six reviewed brand showcases must remain available.");
assert.deepEqual(Object.fromEntries(websiteShowcases.map(({ id, presentation }) => [id, presentation])), showcaseContract.presentationById, "Showcase presentation classifications must match the reviewed fixture.");
assert.deepEqual(showcaseSettings.brandOrder, showcaseContract.brandOrder, "The configured brand order must match the reviewed fixture.");
assert.deepEqual(showcaseSettings.featuredIds, showcaseContract.featuredIds, "Featured showcases must match the independently reviewed selection.");
assert.deepEqual(showcaseSeoPages.map(({ path }) => path), expectedShowcasePaths, "Brand detail SEO pages must match all approved brand IDs.");
assert.deepEqual(portfolioPages.slice(1).map(({ pagePath }) => pagePath.split("/").at(-1)), showcaseContract.technicalPlanSlugs, "Retain the three original technical plan routes.");
const expectedPublicPaths = [...showcaseContract.existingPublicPaths, ...expectedShowcasePaths, quotationContract.path, designContract.collectionRoute.path, ...designContract.heritageRoutes.map(({ path }) => path), ...(privacyApproved ? ["/privacy"] : [])];
const publicSeoPages = seoPages.filter(({ availability }) => availability === "public");
assert.equal(designContract.publishedPaths.length, 33, "DC-004 must approve exactly Modern 16, Gallery and Heritage 16.");
assert.deepEqual([...expectedPublicPaths].sort(), [...designContract.publishedPaths, ...(privacyApproved ? ["/privacy"] : [])].sort(), "Design publication must match the independent route and content contracts.");
assert.deepEqual(publicSeoPages.map(({ path }) => path).sort(), expectedPublicPaths.sort(), "Public SEO routes must match the independently reviewed route contract.");
assert.deepEqual(getSeoPage(designContract.collectionRoute.path), { path: designContract.collectionRoute.path, title: designContract.collectionRoute.title, description: designContract.collectionRoute.description, availability: "public" }, "Gallery must retain its independently approved SEO copy.");
portfolioPages.push(...showcaseSeoPages.map(({ path, title, description }) => ({ pagePath: path, label: `Showcase ${path.split("/").at(-1)}`, title, description })));

const exportedPages = [
  ["index.html", "", "homepage"],
  ["about/index.html", "/about", "About Us"],
  ["services/index.html", "/services", "Services"],
  ["solutions/index.html", "/solutions", "Solutions"],
  ["contact/index.html", "/contact", "Contact"],
  ["quotation/index.html", quotationContract.path, "Quotation"],
  ["design-collection/index.html", designContract.collectionRoute.path, "Design Collection"],
  ...designContract.heritageRoutes.map(({ path }) => [`${path.slice(1)}/index.html`, path, `Heritage ${path}`]),
  ...(privacyApproved ? [["privacy/index.html", "/privacy", "Privacy"]] : []),
  ...portfolioPages.map(({ pagePath, label }) => [`${pagePath.slice(1)}/index.html`, pagePath, label]),
];

for (const [relativePath, pagePath, label] of exportedPages) {
  const contentPath = contentPathFor(pagePath);
  const html = verifyExportedPage(relativePath, `${label} page`);
  verifyBrandUrl(metadataAttribute(html, "rel", "canonical", "href"), contentPath === "/" ? "" : contentPath, `${label} canonical URL`);
  verifyBrandUrl(metadataAttribute(html, "property", "og:url", "content"), pagePath, `${label} Open Graph URL`);
  const robots = metadataAttribute(html, "name", "robots", "content") ?? "";
  assert.match(robots, /noindex/, `${label} must retain noindex metadata.`);
  assert.match(robots, /nofollow/, `${label} must retain nofollow metadata.`);
  assert.equal(tagAttribute(html.match(/<html\b[^>]*>/)?.[0], "lang"), "zh-TW", `${label} HTML language is incorrect.`);
  verifyReferencedAssets(html, pagePath, label);
  verifySeoMetadata(html, getSeoPage(pagePath || "/"), label);
  verifyModernFrame(html, label);
  verifyEnquiryMarkup(html, label, contentPath);
  const identity = [...designContract.modernRoutes, ...designContract.heritageRoutes].find((route) => route.path === (pagePath || "/"));
  if (designContract.heritageRoutes.some((route) => route.path === pagePath)) {
    for (const [landmark, logo] of Object.entries(designContract.heritageLogos)) {
      const section = html.match(new RegExp(`<${landmark}\\b[^>]*>[\\s\\S]*?</${landmark}>`))?.[0] ?? "";
      const images = [...section.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag).filter((tag) => tagAttribute(tag, "src") === logo.src);
      assert.equal(images.length, 1, `${label} must use the original ${landmark} Logo asset.`);
      for (const dimension of ["width", "height"]) assert.equal(tagAttribute(images[0], dimension), logo[dimension], `${label} must preserve the original Logo ratio.`);
      assert.equal(tagAttribute(images[0], "alt"), siteConfig.name, `${label} Logo must retain its brand alternative.`);
      assert.equal(createHash("sha256").update(readFileSync(join(output, logo.src))).digest("hex"), logo.sha256, `${label} exported Logo geometry/colors must remain unchanged.`);
    }
  }
  if (identity) for (const id of designContract.semanticAnchors[identity.pageKey]) {
    assert.equal([...html.matchAll(/<[a-z][\w-]*\b[^>]*>/g)].filter(([tag]) => tagAttribute(tag, "id") === id).length, 1, `${label} must preserve exactly one declared #${id} anchor.`);
  }
  const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1] ?? "";
  const footerUrls = [...footer.matchAll(/<a\b[^>]*>/g)].map(([tag]) => new URL(decodePublicText(tagAttribute(tag, "href") ?? ""), siteConfig.url));
  const footerPaths = new Set(footerUrls.filter(({ origin }) => origin === siteConfig.url).map(({ pathname }) => pathname.replace(/\/$/, "") || "/"));
  assert.ok(publicSeoPages.every(({ path }) => footerPaths.has(path)), `${label} Footer must list all published routes, including Quotation and Design Collection.`);
  if (pagePath === designContract.collectionRoute.path) {
    for (const id of designContract.collectionRoute.anchors) {
      assert.equal([...html.matchAll(/<[a-z][\w-]*\b[^>]*>/g)].filter(([tag]) => tagAttribute(tag, "id") === id).length, 1, `Gallery must render exactly one declared #${id} landmark.`);
    }
    const stylesSection = html.match(/<section\b[^>]*\bid="design-styles"[^>]*>[\s\S]*?<\/section>/)?.[0] ?? "";
    const cards = [...stylesSection.matchAll(/<[a-z][\w-]*\b[^>]*\bdata-design-style-id="[^"]*"[^>]*>/g)];
    assert.deepEqual(cards.map(([tag]) => [tagAttribute(tag, "data-design-style-id"), tagAttribute(tag, "data-design-status")]), Object.entries(designContract.styleStatus), "Gallery must render exactly the three independently approved style states.");
    for (const [index, card] of cards.entries()) {
      const markup = stylesSection.slice(card.index, cards[index + 1]?.index ?? stylesSection.length);
      const links = [...markup.matchAll(/<a\b[^>]*>/g)].map(([tag]) => decodePublicText(tagAttribute(tag, "href") ?? ""));
      if (tagAttribute(card[0], "data-design-status") === "implemented") verifyStyleHomeLink(links, designContract.styleHomePaths[tagAttribute(card[0], "data-design-style-id")]);
      else {
        assert.deepEqual(links, [], "Planned Gallery styles must not expose links.");
        assert.doesNotMatch(markup, /<button\b/i, "Planned Gallery styles must not expose fake actions.");
        assert.ok(decodePublicText(markup).includes("規劃中"), "Planned Gallery cards must state their availability.");
      }
    }
  }
  if (contentPath === "/" || contentPath === "/services") verifyServicePlans(html, contentPath);

  if (pagePath === "/solutions") {
    const title = "解決方案 | Xplore Kaleidoscope";
    const description = "探索 XK 如何依企業需求組合網站開發、Java 企業系統、API 與資料整合、AI 應用及部署技術，規劃合適的數位解決方案。";
    assert.equal(html.match(/<title>([^<]*)<\/title>/)?.[1], title, "Solutions title is incorrect.");
    assert.equal(metadataAttribute(html, "name", "description", "content"), description, "Solutions description is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:title", "content"), title, "Solutions Open Graph title is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:description", "content"), description, "Solutions Open Graph description is incorrect.");
  }

  const portfolioPage = portfolioPages.find((page) => page.pagePath === pagePath);
  if (showcaseContract.technicalPlanSlugs.some((slug) => contentPath === `/portfolio/${slug}`)) {
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
    assert.ok(main.includes("Planned／規劃中") && main.includes("尚未提供可核對的實作與測試證據。") && main.includes("尚無可驗證的系統畫面"), `${label} must preserve the technical plan and evidence boundaries.`);
    assert.doesNotMatch(main, /<img\b/i, `${label} must not invent an implemented-system screenshot.`);
  }
  if (contentPath === "/portfolio") {
    const visibleHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    const brandOrder = showcaseContract.brandOrder;
    let previousPosition = -1;
    for (const id of brandOrder) {
      const position = visibleHtml.indexOf(`data-showcase-id="${id}"`);
      assert.ok(position > previousPosition, `Incorrect rendered brand order: ${id}.`);
      previousPosition = position;
    }
    for (const id of showcaseContract.portfolioAnchors) {
      assert.ok(visibleHtml.includes(`id="${id}"`), `Missing Portfolio category anchor: ${id}.`);
    }
    for (const showcase of websiteShowcases) {
      const cards = [...visibleHtml.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g)].map(([card]) => card)
        .filter((card) => tagAttribute(card.match(/^<article\b[^>]*>/)?.[0], "data-showcase-id") === showcase.id);
      assert.equal(cards.length, 1, `Portfolio must render one card for ${showcase.id}.`);
      const card = cards[0];
      const cardTag = card.match(/^<article\b[^>]*>/)?.[0];
      const state = showcase.availability ?? "available";
      assert.equal(tagAttribute(cardTag, "data-showcase-state"), state, `Incorrect card state: ${showcase.id}.`);
      assert.equal(tagAttribute(cardTag, "data-showcase-presentation"), showcase.presentation, `Incorrect card presentation: ${showcase.id}.`);
      assert.ok(presentationLabels[showcase.presentation] && card.includes(presentationLabels[showcase.presentation]), `Missing visible presentation label: ${showcase.id}.`);
      assert.ok(showcaseStateLabels[state] && card.includes(showcaseStateLabels[state]), `Missing visible availability label: ${showcase.id}.`);
      if (state !== "available") {
        assert.ok(["preparing", "reference-only"].includes(state), `Unknown showcase state: ${showcase.id}.`);
        assert.equal(showcase.href, null, "Unavailable entries must not expose unavailable links.");
        assert.equal(showcase.image, null, "Unavailable entries must not fabricate previews.");
        assert.doesNotMatch(card, /<img\b/i, `Unavailable card must not show a fake preview: ${showcase.id}.`);
        if (showcase.sourceHref) assert.ok(!card.includes(`href="${showcase.sourceHref}"`), `Unavailable source must not be an active showcase link: ${showcase.id}.`);
        const cardLinks = [...card.matchAll(/<a\b[^>]*>/g)].map(([tag]) => tagAttribute(tag, "href"));
        const detailHref = presentationHref(showcaseDetailPath(showcase.id), pagePath);
        assert.ok(cardLinks.every((href) => href === showcase.attribution?.href || href === `${basePath}${detailHref}` || href === `${basePath}${detailHref}/`), `Unavailable card exposes an unexpected link: ${showcase.id}.`);
      } else {
        assert.ok(card.includes(`href="${showcase.href}"`), `Missing public showcase link: ${showcase.id}.`);
        assert.ok(card.includes(`src="${basePath}${showcase.image.src}"`), `Incorrect showcase preview base path: ${showcase.id}.`);
        assert.ok(existsSync(join(output, showcase.image.src)), `Missing local preview: ${showcase.id}.`);
      }
      if (showcase.kind === "template") {
        assert.ok(showcase.attribution?.href && card.includes(`href="${showcase.attribution.href}"`) && card.includes(showcase.attribution.label), `Missing template attribution: ${showcase.id}.`);
      } else {
        const detailHref = presentationHref(showcaseDetailPath(showcase.id), pagePath);
        assert.ok(card.includes(`href="${basePath}${detailHref}"`) || card.includes(`href="${basePath}${detailHref}/"`), `Missing brand detail link: ${showcase.id}.`);
      }
    }
    assert.deepEqual(websiteShowcases.filter(({ availability }) => availability === "reference-only").map(({ id }) => id), showcaseContract.referenceOnlyIds, "Reference-only templates must match the reviewed source limitations.");
  }
  if (portfolioPage) {
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)?.[1] ?? "";
    assert.equal(decodePublicText(head.match(/<title>([^<]*)<\/title>/)?.[1] ?? ""), portfolioPage.title, `${label} title is incorrect.`);
    assert.equal(decodePublicText(metadataAttribute(html, "name", "description", "content") ?? ""), portfolioPage.description, `${label} description is incorrect.`);
    assert.equal(decodePublicText(metadataAttribute(html, "property", "og:title", "content") ?? ""), portfolioPage.title, `${label} Open Graph title is incorrect.`);
    assert.equal(decodePublicText(metadataAttribute(html, "property", "og:description", "content") ?? ""), portfolioPage.description, `${label} Open Graph description is incorrect.`);
    assert.equal(metadataAttribute(html, "property", "og:locale", "content"), "zh_TW", `${label} Open Graph locale is incorrect.`);
    assert.equal(metadataAttribute(html, "property", "og:type", "content"), "website", `${label} Open Graph type is incorrect.`);
  }

  if (contentPath === "/contact") {
    const title = "聯絡我們 | Xplore Kaleidoscope";
    const description = "了解如何與 Xplore Kaleidoscope（XK）討論網站、Java 企業系統、系統整合與 AI 應用需求，查看已確認的聯絡資訊與合作準備事項。";
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)?.[1] ?? "";
    if (pagePath === "/contact") {
      assert.equal(head.match(/<title>([^<]*)<\/title>/)?.[1], title, "Contact title is incorrect.");
      assert.equal(metadataAttribute(html, "name", "description", "content"), description, "Contact description is incorrect.");
      assert.equal(metadataAttribute(html, "property", "og:title", "content"), title, "Contact Open Graph title is incorrect.");
      assert.equal(metadataAttribute(html, "property", "og:description", "content"), description, "Contact Open Graph description is incorrect.");
      assert.equal(metadataAttribute(html, "property", "og:locale", "content"), "zh_TW", "Contact Open Graph locale is incorrect.");
      assert.equal(metadataAttribute(html, "property", "og:type", "content"), "website", "Contact Open Graph type is incorrect.");
    }

    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
    const headings = [...main.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
    assert.equal(headings.length, 1, "Contact must have exactly one H1.");
    assert.equal(decodePublicText(headings[0][1].replace(/<[^>]*>/g, "")).trim(), contactContract.contactHeading, "Contact H1 is incorrect.");
    assert.deepEqual(
      [...main.matchAll(/<section\b[^>]*>/g)].map(([tag]) => tagAttribute(tag, "id")),
      contactContract.contactSectionIds,
      "Contact must retain the seven approved sections in reading order.",
    );

    const channelSection = main.match(/<section\b[^>]*\bid="contact-channels"[^>]*>([\s\S]*?)<\/section>/)?.[0] ?? "";
    assert.equal(tagAttribute(channelSection.match(/^<section\b[^>]*>/)?.[0], "data-contact-availability"), contactContract.availability, "Contact must show the approved channels-only state.");
    assert.ok(channelSection.includes(contactContract.ownerEmail), "Contact must display the owner-approved Email.");
    assert.match(channelSection, /\bhref="mailto:/i, "Contact must provide the registered Email draft link.");
    assert.ok(!main.includes("正式聯絡管道確認中"), "Contact must not retain the unavailable-channel notice after owner approval.");
    const process = main.match(/<section\b[^>]*\bid="contact-process"[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? "";
    assert.deepEqual([...process.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/g)].map(([, content]) => decodePublicText(content.replace(/<[^>]*>/g, "")).trim()), contactContract.processSteps, "Contact must retain Email, requirements clarification and proposal/quotation in order.");
    const dataNote = main.match(/<section\b[^>]*\bid="contact-data-note"[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? "";
    for (const note of contactContract.requiredDataNotes) assert.ok(decodePublicText(dataNote.replace(/<[^>]*>/g, "")).includes(note), "Contact must distinguish opening an Email draft from sending or delivery.");
    assert.ok(dataNote.includes("網站託管服務可能依其服務設定保留存取紀錄"), "Contact data note must distinguish local draft preparation from hosting-provider access records.");
    if (!privacyApproved) {
      assert.doesNotMatch(main, /\bhref="[^"]*\/privacy(?:\/|[?#"])/i, "Contact must not link to the unpublished Privacy route.");
    }
  }

  if (pagePath === "/privacy") {
    const title = "隱私權政策 | Xplore Kaleidoscope";
    const description = "了解 Xplore Kaleidoscope 網站的個人資料處理、第三方服務與隱私權相關資訊。";
    assert.equal(privacyPageMetadata.title, title, "Privacy metadata config title is incorrect.");
    assert.equal(privacyPageMetadata.description, description, "Privacy metadata config description is incorrect.");
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)?.[1] ?? "";
    assert.equal(head.match(/<title>([^<]*)<\/title>/)?.[1], title, "Privacy title is incorrect.");
    assert.equal(metadataAttribute(html, "name", "description", "content"), description, "Privacy description is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:title", "content"), title, "Privacy Open Graph title is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:description", "content"), description, "Privacy Open Graph description is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:locale", "content"), "zh_TW", "Privacy Open Graph locale is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:type", "content"), "website", "Privacy Open Graph type is incorrect.");
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
    const headings = [...main.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
    assert.equal(headings.length, 1, "Privacy must have exactly one H1.");
    assert.equal(headings[0][1].replace(/<[^>]*>/g, "").trim(), "隱私權政策", "Privacy H1 is incorrect.");
    assert.deepEqual([...main.matchAll(/<section\b[^>]*>/g)].map(([tag]) => tagAttribute(tag, "id")), privacySectionIds, "Privacy section order is incorrect.");
    const text = decodePublicText(main);
    assert.ok(text.includes(privacyPolicy.version) && text.includes(privacyPolicy.effectiveDate), "Privacy version or effective date is missing.");
    assert.ok(!text.includes(privacyDraftMarker), "Approved Privacy must not render the draft marker.");
  }
}

function verifySeoMetadata(html, page, label) {
  assert.equal(page.availability, "public", `${label} must be public in the SEO registry.`);
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)?.[1] ?? "";
  const titles = [...head.matchAll(/<title>([^<]*)<\/title>/g)];
  assert.equal(titles.length, 1, `${label} must have one HTML title.`);
  assert.equal(decodePublicText(titles[0][1]), page.title, `${label} exact SEO title is incorrect.`);
  const tags = head.match(/<(?:meta|link)\b[^>]*>/g) ?? [];
  function oneValue(attribute, value, target = "content") {
    const matches = tags.filter((tag) => tagAttribute(tag, attribute) === value);
    assert.equal(matches.length, 1, `${label} must have one ${value} metadata entry.`);
    return decodePublicText(tagAttribute(matches[0], target) ?? "");
  }
  assert.equal(oneValue("name", "description"), page.description, `${label} exact SEO description is incorrect.`);
  const canonical = oneValue("rel", "canonical", "href");
  const openGraphUrl = oneValue("property", "og:url");
  for (const [url, path] of [[canonical, contentPathFor(page.path)], [openGraphUrl, page.path]]) {
    const expectedUrl = seo.getBrandUrl(path, siteConfig.url);
    verifyBrandUrl(url, path === "/" ? "" : path, `${label} SEO URL`);
    assert.equal(url.replace(/\/$/, ""), expectedUrl.replace(/\/$/, ""), `${label} SEO URL differs from the registry.`);
  }
  for (const [name, value] of [
    ["og:title", page.title], ["og:description", page.description],
    ["og:site_name", siteConfig.name], ["og:locale", "zh_TW"], ["og:type", "website"],
  ]) assert.equal(oneValue("property", name), value, `${label} ${name} is incorrect.`);
  for (const [name, value] of [["twitter:card", "summary"], ["twitter:title", page.title], ["twitter:description", page.description]]) {
    assert.equal(oneValue("name", name), value, `${label} ${name} is incorrect.`);
  }
  const robots = new Set(oneValue("name", "robots").toLowerCase().split(/[,\s]+/));
  assert.ok(robots.has("noindex") && robots.has("nofollow"), `${label} must retain both index protections.`);
  assert.ok(!robots.has("index") && !robots.has("follow"), `${label} must not contain contradictory index directives.`);
  for (const tag of tags) {
    const name = tagAttribute(tag, "name") ?? tagAttribute(tag, "property") ?? "";
    assert.ok(!/^og:image(?::|$)|^twitter:(?:image|site|creator)(?::|$)/.test(name), `${label} contains an unapproved share image or social handle.`);
    assert.equal(tagAttribute(tag, "hreflang"), undefined, `${label} must not invent language alternates.`);
  }
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter((match) => tagAttribute(match[1], "type") === "application/ld+json");
  assert.equal(scripts.length, 1, `${label} must contain exactly one WebSite JSON-LD script.`);
  assert.ok(!scripts[0][2].includes("<"), `${label} JSON-LD must escape HTML-sensitive text.`);
  const website = JSON.parse(scripts[0][2]);
  assert.deepEqual(website, {
    "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name,
    url: new URL("/", siteConfig.url).href, inLanguage: "zh-TW",
  }, `${label} JSON-LD must contain only the five true WebSite fields.`);
  assert.deepEqual(website, seo.createWebsiteJsonLd(siteConfig), `${label} JSON-LD differs from the shared source.`);
}

function collectHtmlFiles(directory, prefix) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) files.push(...collectHtmlFiles(join(directory, entry.name), `${prefix}${entry.name}/`));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(`${prefix}${entry.name}`);
  }
  return files;
}

const portfolioRoot = join(output, "portfolio");
const portfolioSlugs = [...new Set(portfolioPages.flatMap(({ pagePath }) => pagePath.split("/").slice(2, 3)))];
const exportedPortfolioSlugs = readdirSync(portfolioRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
assert.deepEqual(exportedPortfolioSlugs.sort(), portfolioSlugs.sort(), "Portfolio must export only registered technical plans and the showcases directory, without unknown or fallback routes.");
assert.deepEqual(
  collectHtmlFiles(portfolioRoot, "portfolio/").sort(),
  portfolioPages.map(({ pagePath }) => `${pagePath.slice(1)}/index.html`).sort(),
  "Portfolio HTML must contain only the overview and its registered technical and showcase details.",
);

const publicPaths = new Set(publicSeoPages.map(({ path }) => path));
assert.equal(new Set(seoPages.map(({ path }) => path)).size, seoPages.length, "SEO registry paths must be unique.");
assert.deepEqual([...publicPaths].sort(), exportedPages.map(([, path]) => path || "/").sort(), "SEO public paths must match every required exported page.");
assert.equal(getSeoPage("/privacy").availability, privacyApproved ? "public" : "draft", "Privacy SEO availability must match its publication state.");
const errorHtml = new Set(["404.html", "404/index.html", "_not-found/index.html"]);
for (const path of errorHtml) if (existsSync(join(output, path))) verifyModernFrame(readFileSync(join(output, path), "utf8"), path);
assert.deepEqual(
  collectHtmlFiles(output, "").filter((path) => !errorHtml.has(path)).sort(),
  exportedPages.map(([path]) => path).sort(),
  "SEO registry must match all actual public HTML; unknown routes must not be silently excluded.",
);
for (const route of navigation.plannedRoutes) {
  assert.equal(publicPaths.has(route.path), route.status === "implemented", `${route.path} navigation and SEO availability disagree.`);
}
for (const link of [...navigation.primaryNavigation, navigation.contactNavigation]) {
  assert.ok(publicPaths.has(new URL(link.href, siteConfig.url).pathname), "Navigation must target a public SEO page.");
}
for (const page of portfolioPages) {
  const seoPage = getSeoPage(page.pagePath);
  assert.equal(seoPage.title, page.title, "Portfolio SEO title must retain its exact content.");
  assert.equal(seoPage.description, page.description, "Portfolio SEO description must retain its exact content.");
}

const robotsPath = join(output, "robots.txt");
assert.ok(existsSync(robotsPath), "Missing protected robots.txt export.");
const expectedRobots = seo.createRobotsMetadata(basePath, seoPages);
const rules = {
  userAgent: "*", allow: `${basePath}/`,
  disallow: [`${basePath}/dev/`, ...seoPages.filter(({ availability }) => availability === "draft").map(({ path }) => `${basePath}${path}`)],
};
assert.deepEqual(expectedRobots, { rules }, "Robots must allow public noindex reading and exclude only development/draft paths.");
const robotLines = readFileSync(robotsPath, "utf8").split(/\r?\n/).map((line) => line.split("#")[0].trim()).filter(Boolean);
assert.deepEqual(
  robotLines.map((line) => line.replace(/^([^:]+):\s*/, (_, name) => `${name.toLowerCase()}: `)).sort(),
  ["user-agent: *", `allow: ${rules.allow}`, ...rules.disallow.map((path) => `disallow: ${path}`)].sort(),
  "Robots output must match its exact protected rules, without Sitemap or nonstandard Noindex directives.",
);
assert.ok(!readdirSync(output).some((name) => /^sitemap(?:\.|$)/i.test(name)), "Protected mode must not publish a sitemap document, route or payload.");

function verifyStaticTree(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) verifyStaticTree(path);
    else if (entry.isFile() && /\.(html|txt|json)$/.test(entry.name)) {
      const content = readFileSync(path, "utf8");
      assert.ok(!content.includes("/dev/design-system"), `Development route leaked into ${path}.`);
    }
  }
}
verifyStaticTree(output);

function decodePublicText(text) {
  const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
  for (let pass = 0; pass < 2; pass++) {
    text = text.replaceAll("\\\\", "\\").replaceAll('\\"', '"')
      .replace(/\\u([\da-f]{4})/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
      .replace(/&#(x[\da-f]+|\d+);/gi, (entity, code) => {
        const point = parseInt(code.replace(/^x/i, ""), /^x/i.test(code) ? 16 : 10);
        return point <= 0x10ffff ? String.fromCodePoint(point) : entity;
      })
      .replace(/&(amp|lt|gt|quot|apos);/g, (_, name) => entities[name]);
  }
  return text;
}

if (!privacyApproved) {
  const draftMarkers = [privacyDraftMarker, ...privacyPolicy.sections.flatMap(({ paragraphs }) => paragraphs)];
  assert.ok(draftMarkers.every((marker) => typeof marker === "string" && marker.trim()), "Privacy draft markers must contain real review text.");
  function verifyNoDraftText(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) verifyNoDraftText(path);
      else if (entry.isFile() && /\.(html|txt|json|js|mjs|map|css|svg|xml|webmanifest)$/.test(entry.name)) {
        const text = decodePublicText(readFileSync(path, "utf8"));
        assert.ok(!draftMarkers.some((marker) => text.includes(marker)), `Unapproved Privacy draft text leaked into ${path}.`);
      }
    }
  }
  verifyNoDraftText(output);
}
console.log(`GitHub Pages static artifact verified: out/ (base path: ${basePath || "/"}).`);
