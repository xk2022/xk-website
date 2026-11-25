import assert from "node:assert/strict";
import { createContactInquiryDraft, validateContactInquiry } from "../src/lib/contact-inquiry.ts";
import { contactInquiry } from "../src/config/contact-inquiry.ts";
import { verifiedContactChannels } from "../src/config/contact.ts";

const valid = { name: "測試訪客", email: "visitor@example.com", service: "", message: "希望規劃企業網站的服務內容與聯絡動線。" };
let count = 0;
function test(id, run) { run(); count++; console.log(`PASS ${id}`); }
function errors(patch) { return validateContactInquiry({ ...valid, ...patch }); }

test("CI01-valid-minimal", () => assert.deepEqual(errors({ name: "", service: "" }), {}));
test("CI02-required-email", () => assert.ok(errors({ email: "   " }).email));
for (const email of ["not-an-email", "a@b", "a@@example.com", "a@example.com\r\nBcc: other@example.com", "a b@example.com", "<a@example.com>"]) {
  test(`CI03-invalid-email-${count}`, () => assert.ok(errors({ email }).email));
}
test("CI04-trim-email", () => assert.deepEqual(errors({ email: "  visitor@example.com  " }), {}));
test("CI05-email-raw-max", () => assert.ok(errors({ email: "a".repeat(243) + "@example.com" }).email));
test("CI06-name-max", () => { assert.deepEqual(errors({ name: "訪".repeat(80) }), {}); assert.ok(errors({ name: "訪".repeat(81) }).name); });
test("CI07-name-single-line", () => assert.ok(errors({ name: "一行\n另一行" }).name));
test("CI08-message-trim-min", () => { assert.ok(errors({ message: "    短需求     " }).message); assert.deepEqual(errors({ message: "十".repeat(10) }), {}); });
test("CI09-message-max", () => { assert.deepEqual(errors({ message: "需".repeat(2000) }), {}); assert.ok(errors({ message: "需".repeat(2001) }).message); });
test("CI10-message-control", () => assert.ok(errors({ message: "合法的需求內容後面含有控制字\u0000" }).message));
test("CI11-service-whitelist", () => assert.ok(errors({ service: "unapproved-service" }).service));
test("CI12-services-contract", () => assert.deepEqual(contactInquiry.services.map(({ id }) => id), ["website-development", "java-enterprise", "system-integration", "ai-automation", "cloud-infrastructure"]));
test("CI13-every-service", () => { for (const { id, title } of contactInquiry.services) { assert.deepEqual(errors({ service: id }), {}); assert.ok(createContactInquiryDraft({ ...valid, service: id }, verifiedContactChannels).body.includes(title)); } });
test("CI14-sole-recipient", () => { const d = createContactInquiryDraft(valid, verifiedContactChannels); assert.equal(d.recipient, "system.xk2022@gmail.com"); assert.equal(new URL(d.href).pathname, d.recipient); });
test("CI15-exact-query-contract", () => { const u = new URL(createContactInquiryDraft(valid, verifiedContactChannels).href); assert.deepEqual([...u.searchParams.keys()], ["subject", "body"]); assert.equal(u.searchParams.get("subject"), "XK 專案詢問"); });
test("CI16-encoding-and-no-header-injection", () => { const message = "文字與符號 &bcc=intruder@example.com # ? <tag> + 中文需求"; const d = createContactInquiryDraft({ ...valid, message }, verifiedContactChannels); const u = new URL(d.href); assert.deepEqual([...u.searchParams.keys()], ["subject", "body"]); assert.equal(u.hash, ""); assert.ok(u.searchParams.get("body").includes(message)); });
test("CI17-normalize-line-endings", () => { const d = createContactInquiryDraft({ ...valid, message: "第一行需求摘要\n第二行需求摘要\r第三行內容" }, verifiedContactChannels); assert.ok(d.body.includes("第一行需求摘要\r\n第二行需求摘要\r\n第三行內容")); assert.equal(d.body.replaceAll("\r\n", "").includes("\n"), false); });
test("CI18-invalid-does-not-create-draft", () => assert.equal(createContactInquiryDraft({ ...valid, email: "" }, verifiedContactChannels), null));
test("CI19-no-recipient-does-not-invent-one", () => assert.equal(createContactInquiryDraft(valid, []), null));
test("CI20-copy-preserves-long-message", () => { const message = "需".repeat(2000); const d = createContactInquiryDraft({ ...valid, message }, verifiedContactChannels); assert.equal(d.href, null); assert.ok(d.copyText.includes(message)); assert.ok(d.copyText.startsWith("收件人：system.xk2022@gmail.com\r\n主旨：XK 專案詢問\r\n")); });
test("CI21-draft-input-not-mutated", () => { const source = Object.freeze({ ...valid }); createContactInquiryDraft(source, verifiedContactChannels); assert.deepEqual(source, valid); });
console.log(`CONTACT_INQUIRY_CONTRACT_COMPLETE ${count} PASS`);
