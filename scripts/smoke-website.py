#!/usr/bin/env python3
"""HTTP/HTML smoke for a root-served production build; Python 3 standard library only."""

import argparse
from collections import Counter
from datetime import datetime, timezone
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import platform
import re
import struct
import subprocess
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qsl, unquote, urljoin, urlsplit, urlunsplit
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parent.parent
CONTRACT_PATH = ROOT / "scripts/fixtures/showcase-contract.json"
APPROVED_PAGES_DEPLOYMENT = {"origin": "https://www.xplorekaleidoscope.com", "basePath": ""}
VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


def now():
    return datetime.now(timezone.utc).isoformat()


def normalized_absolute_http_url(reference):
    """Match explicit HTTP(S) destinations, never a root/protocol-relative link."""
    url = urlsplit(reference)
    if url.scheme.lower() not in {"http", "https"} or not url.netloc or not url.hostname or url.username or url.password:
        return None
    try:
        port = url.port
    except ValueError:
        return None
    scheme, host = url.scheme.lower(), url.hostname.lower()
    if ":" in host:
        host = "[" + host + "]"
    if port is not None and (scheme, port) not in {("http", 80), ("https", 443)}:
        host += ":" + str(port)
    return urlunsplit((scheme, host, url.path.removesuffix("/") or "/", url.query, url.fragment))


def mailto_errors(href, contract, expected_context=None):
    """Inspect a static draft URL only; never open a mail client or send Email."""
    errors = []
    try:
        url = urlsplit(href)
    except ValueError as error:
        return [str(error)]
    if url.scheme != "mailto" or url.netloc or url.fragment:
        errors.append("must use mailto without an authority or fragment")
    if unquote(url.path) != contract["ownerEmail"]:
        errors.append("recipient must be exactly the owner-approved Email")
    fields = parse_qsl(url.query, keep_blank_values=True)
    if sorted(key for key, _ in fields) != ["body", "subject"]:
        errors.append("only one static subject and body are allowed; no cc/bcc or extra recipients")
    values = dict(fields)
    subject, context = values.get("subject", ""), ""
    if subject != contract["mailtoSubject"]:
        prefix = contract["mailtoSubject"] + "｜"
        context = subject[len(prefix):] if subject.startswith(prefix) else ""
        if not context or context not in contract["servicePlanContexts"].values():
            errors.append("subject must use the general template or an approved static plan context")
    body = list(contract["mailtoBody"])
    if context:
        body.insert(1, "參考方案：" + context)
    if values.get("body") != contract["lineEnding"].join(body):
        errors.append("body must contain only the exact static prompts with CRLF line endings")
    if expected_context is not None and context != expected_context:
        errors.append("mail template and rendered plan context must agree")
    return errors


class Element:
    def __init__(self, tag, attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []

    def all(self, tag=None):
        result = []
        for child in self.children:
            if isinstance(child, Element):
                if tag is None or child.tag == tag:
                    result.append(child)
                result.extend(child.all(tag))
        return result

    def text(self):
        if self.tag in {"script", "style"}:
            return ""
        return "".join(child.text() if isinstance(child, Element) else child for child in self.children)

    def raw_text(self):
        return "".join(child.raw_text() if isinstance(child, Element) else child for child in self.children)


class Document(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Element("document")
        self.stack = [self.root]
        self.feed(html)
        self.close()

    def handle_starttag(self, tag, attrs):
        element = Element(tag, attrs)
        self.stack[-1].children.append(element)
        if tag not in VOID_TAGS:
            self.stack.append(element)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID_TAGS:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                self.stack = self.stack[:index]
                return

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def contact_draft_form_errors(doc, contract):
    """Validate only the approved pre-hydration Contact form, never a live draft."""
    errors = []
    forms = doc.all("form")
    sections = [element for element in doc.all("section") if element.attrs.get("id") == contract["sectionId"]]
    if len(forms) != 1:
        return ["Contact must contain exactly one local draft form"]
    form = forms[0]
    if len(sections) != 1 or form not in sections[0].all("form"):
        errors.append("the draft form must be inside its unique contact-form section")
    if form.attrs.get("data-contact-form-mode") != contract["mode"] or "novalidate" not in form.attrs:
        errors.append("the form must use email-draft mode and noValidate")
    for element in [form, *form.all()]:
        for attribute in contract["forbiddenAttributes"]:
            if attribute in element.attrs:
                errors.append("draft form must not contain attribute " + attribute)
    controls = [element for element in form.all() if element.tag in {"input", "select", "textarea"}]
    all_controls = [element for element in doc.all() if element.tag in {"input", "select", "textarea"}]
    if len(controls) != len(contract["controls"]) or all_controls != controls:
        errors.append("only the four approved controls may appear, all inside the draft form")
    labels = {element.attrs.get("for") for element in form.all("label")}
    for actual, expected in zip(controls, contract["controls"]):
        if actual.tag != expected["tag"]:
            errors.append(expected["id"] + " control tag is incorrect")
        for attribute in ["id", "type", "minlength", "maxlength", "autocomplete"]:
            if actual.attrs.get(attribute) != expected.get(attribute):
                errors.append(expected["id"] + " " + attribute + " differs from the approved contract")
        if ("required" in actual.attrs) != expected["required"] or "readonly" in actual.attrs or "disabled" in actual.attrs:
            errors.append(expected["id"] + " must retain its required/editable state")
        if expected["id"] not in labels:
            errors.append(expected["id"] + " must have an associated label")
        if actual.tag == "input" and actual.attrs.get("value", ""):
            errors.append("visitor values must not appear in the server-rendered form")
        if actual.tag == "textarea" and actual.raw_text():
            errors.append("a filled message or preview must not be server-rendered")
    selects = form.all("select")
    options = selects[0].all("option") if len(selects) == 1 else []
    if [element.attrs.get("value") for element in options] != ["", *contract["serviceIds"]]:
        errors.append("the service select must retain the empty choice and five approved service IDs")
    if any("selected" in element.attrs and element.attrs.get("value") for element in options):
        errors.append("a nonempty visitor service selection must not be server-rendered")
    submits = [element for element in form.all("button") if element.attrs.get("type", "submit") == "submit"]
    if len(submits) != 1 or "disabled" not in submits[0].attrs:
        errors.append("the sole preview submit must be inside the form and disabled before hydration")
    if not sections or not any(contract["noscriptText"] in element.text() for element in sections[0].all("noscript")):
        errors.append("the no-JavaScript Email alternative must remain visible in noscript")
    if any(element.attrs.get("id") in {"contact-inquiry-preview", "contact-inquiry-draft"} or "data-contact-draft-link" in element.attrs for element in doc.all()):
        errors.append("filled drafts, readonly previews and dynamic mailto links must not be server-rendered")
    return errors


def quotation_markup_errors(doc, contract, catalog):
    """A narrow SSR whitelist for local estimator controls, never a receiving form."""
    errors = []
    forbidden = {"action", "formaction", "method", "onsubmit", "formmethod", "formtarget", "form"}
    if doc.all("form") or doc.all("select") or any(forbidden.intersection(element.attrs) for element in doc.all()):
        errors.append("Quotation must not contain a form, select or outbound submission attributes")
    expected_ids = [*("quotation-service-" + item for item in contract["serviceIds"]),
                    *("quotation-build-" + item for item in contract["initialBuildIds"]),
                    *("quotation-complexity-" + item for item in contract["complexityIds"]), *contract["personalInputs"]]
    inputs = doc.all("input")
    if [element.attrs.get("id") for element in inputs] != expected_ids:
        errors.append("SSR inputs must be exactly the default four services, four builds, three complexities and two personal fields")
    if [element.attrs.get("id") for element in inputs if "checked" in element.attrs] != contract["initialCheckedIds"]:
        errors.append("SSR must select website/basic without a build or addon")
    disabled = {child for fieldset in doc.all("fieldset") if "disabled" in fieldset.attrs for child in fieldset.all()}
    labels = {element.attrs.get("for") for element in doc.all("label")}
    for element in inputs:
        item_id = element.attrs.get("id", "")
        if element not in disabled and "disabled" not in element.attrs:
            errors.append(item_id + " must remain disabled until hydration")
        if item_id not in labels:
            errors.append(item_id + " must have an associated label")
        if item_id in contract["personalInputs"]:
            if element.attrs.get("type") != "text" or element.attrs.get("maxlength") != contract["personalInputs"][item_id] or "name" in element.attrs or element.attrs.get("value", ""):
                errors.append(item_id + " must be empty, unnamed text with its approved length limit")
        else:
            group = "service" if item_id.startswith("quotation-service-") else "build" if item_id.startswith("quotation-build-") else "complexity"
            if element.attrs.get("type") != "radio" or element.attrs.get("name") != "quotation-" + group or element.attrs.get("value") != item_id.removeprefix("quotation-" + group + "-"):
                errors.append(item_id + " must retain its native radio group and value")
    summaries = doc.all("textarea")
    if len(summaries) != 1 or summaries[0].attrs.get("id") != contract["summaryId"] or "readonly" not in summaries[0].attrs or "name" in summaries[0].attrs:
        errors.append("only the unnamed readonly enquiry summary textarea is allowed")
    if any(element.attrs.get("type") != "button" for element in doc.all("button")):
        errors.append("Quotation may expose only type=button controls, never a submit action")
    estimator = [element for element in doc.all() if element.attrs.get("id") == "quotation-estimator"]
    if len(estimator) != 1 or estimator[0].attrs.get("data-quotation-ready") != "false":
        errors.append("the server-rendered estimator must be unhydrated")
    text = doc.text()
    if any(value not in text for value in contract["requiredText"]):
        errors.append("the estimator must identify its reference/non-quotation boundary")
    for item_id in contract["initialBuildIds"]:
        item = next((item for item in catalog["builds"] if item["id"] == item_id), None)
        if not item or item["reference"]["label"] not in text:
            errors.append(item_id + " must retain its visible price provenance label")
    for qr in contract["qrImages"]:
        images = [element for element in doc.all("img") if element.attrs.get("id") == qr["id"]]
        if [element.attrs.get("src") for element in images] != [qr["src"]]:
            errors.append(qr["id"] + " must use its fixed root image source")
    return errors


def image_dimensions(data):
    """Read real image headers, without a Pillow dependency or a full browser decoder."""
    if data.startswith(b"\x89PNG\r\n\x1a\n") and len(data) >= 24:
        return "PNG", *struct.unpack(">II", data[16:24])
    if data[:6] in {b"GIF87a", b"GIF89a"} and len(data) >= 10:
        return "GIF", *struct.unpack("<HH", data[6:10])
    if data.startswith(b"\xff\xd8"):
        offset = 2
        while offset + 9 < len(data):
            if data[offset] != 255:
                offset += 1
                continue
            while offset < len(data) and data[offset] == 255:
                offset += 1
            if offset >= len(data):
                break
            marker = data[offset]
            offset += 1
            if marker in {0x01, 0xD8, 0xD9} or 0xD0 <= marker <= 0xD7:
                continue
            length = int.from_bytes(data[offset:offset + 2], "big")
            if marker in {0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF}:
                height, width = struct.unpack(">HH", data[offset + 3:offset + 7])
                return "JPEG", width, height
            if length < 2:
                break
            offset += length
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP" and len(data) >= 30:
        kind = data[12:16]
        if kind == b"VP8X":
            return "WEBP", 1 + int.from_bytes(data[24:27], "little"), 1 + int.from_bytes(data[27:30], "little")
        if kind == b"VP8 " and data[23:26] == b"\x9d\x01\x2a":
            return "WEBP", int.from_bytes(data[26:28], "little") & 0x3FFF, int.from_bytes(data[28:30], "little") & 0x3FFF
        if kind == b"VP8L" and data[20] == 0x2F:
            bits = int.from_bytes(data[21:25], "little")
            return "WEBP", (bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1
    if b"<svg" in data[:1024]:
        svg = ET.fromstring(data)
        if svg.tag.split("}")[-1] == "svg":
            view_box = re.split(r"[\s,]+", svg.attrib.get("viewBox", "").strip())
            if len(view_box) == 4:
                return "SVG", float(view_box[2]), float(view_box[3])
            return "SVG", float(svg.attrib["width"].removesuffix("px")), float(svg.attrib["height"].removesuffix("px"))
    return None


class Smoke:
    def __init__(self, args):
        self.args = args
        self.started = now()
        self.completed = False
        self.results, self.cache, self.documents, self.image_observations = [], {}, {}, {}
        self.base = args.base_url.rstrip("/") + "/"
        parsed = urlsplit(self.base)
        if parsed.scheme not in {"http", "https"} or not parsed.netloc or parsed.query or parsed.fragment or parsed.username:
            raise ValueError("--base-url must be a plain HTTP(S) root URL")
        if parsed.path != "/":
            raise ValueError("--base-url must use the origin root; the retired /xk-website/ prefix is unsupported")
        self.origin = (parsed.scheme, parsed.netloc)
        self.base_path = parsed.path.rstrip("/")
        self.environment = {"python": platform.python_version(), "platform": platform.platform(), "baseUrl": self.base,
                            "basePath": self.base_path, "transport": "urllib.request (environment proxies honored)",
                            "externalSitesRequested": args.check_external, "sourceAssetsRequested": args.check_source_assets}
        self.contract = json.loads(CONTRACT_PATH.read_text())
        self.contact_contract = json.loads((ROOT / "scripts/fixtures/contact-contract.json").read_text())
        self.quotation_contract = json.loads((ROOT / "scripts/fixtures/quotation-contract.json").read_text())
        self.data = None
        self.external_destinations, self.unavailable_source_destinations = set(), set()

    def check(self, item, expected, actual, notes="", required=True):
        self.results.append({"testId": f"SMOKE-{len(self.results) + 1:04d}", "item": item, "testedAt": now(),
                             "environment": self.base, "expected": expected, "actual": actual,
                             "status": "PASS" if actual == expected else "FAIL", "required": required, "notes": notes})

    def fetch(self, url):
        if url not in self.cache:
            try:
                with urlopen(Request(url, headers={"User-Agent": "XK-Website-Smoke/1.0"}), timeout=self.args.timeout) as response:
                    self.cache[url] = {"status": response.status, "headers": dict(response.headers), "body": response.read(8 * 1024 * 1024), "finalUrl": response.url}
            except HTTPError as error:
                self.cache[url] = {"status": error.code, "headers": dict(error.headers), "body": error.read(8 * 1024 * 1024), "finalUrl": error.url}
            except (URLError, OSError, ValueError) as error:
                self.cache[url] = {"status": None, "headers": {}, "body": b"", "finalUrl": url, "error": str(error)}
        return self.cache[url]

    def route_url(self, path):
        return self.base + path.lstrip("/") + ("/" if path != "/" and not path.endswith("/") else "")

    def uses_legacy_project_path(self, url):
        website_origins = {self.origin, ("https", "www.xplorekaleidoscope.com"), ("https", "xplorekaleidoscope.com"), ("https", "xk2022.github.io")}
        normalized = urlsplit(normalized_absolute_http_url(url.geturl()) or url.geturl())
        return (normalized.scheme, normalized.netloc) in website_origins and bool(re.match(r"^/xk-website(?:/|$)", unquote(normalized.path)))

    def source_contract(self):
        script = """
import * as showcases from './src/config/website-showcases.ts';
import {seoPages,seoProtectionPolicy} from './src/config/seo.ts';
import {siteConfig} from './src/config/site.ts';
import {pagesDeployment} from './src/config/deployment.ts';
import * as contact from './src/config/contact.ts';
import * as inquiry from './src/config/inquiry.ts';
import {contactInquiry} from './src/config/contact-inquiry.ts';
import * as contactDraft from './src/lib/contact-inquiry.ts';
import {quotationCatalog,quotationSources} from './src/config/quotation.ts';
import {privacyPolicy,privacyDraftMarker} from './src/config/privacy.ts';
console.log(JSON.stringify({showcases,seoPages,seoProtectionPolicy,siteConfig,pagesDeployment,contact,inquiry,contactInquiry,contactDraftExports:Object.keys(contactDraft),quotationCatalog,quotationSources,privacyPolicy,privacyDraftMarker}));
"""
        result = subprocess.run(["node", "--input-type=module", "-e", script], cwd=ROOT, capture_output=True, text=True)
        self.check("Native Node.js source import exits successfully", 0, result.returncode, result.stderr.strip())
        if result.returncode:
            return False
        self.data = json.loads(result.stdout)
        self.environment["node"] = subprocess.run(["node", "--version"], capture_output=True, text=True, check=True).stdout.strip()
        sources = ["scripts/smoke-website.py", "scripts/fixtures/showcase-contract.json", "scripts/fixtures/contact-contract.json", "src/config/website-showcases.ts", "src/config/seo.ts", "src/config/site.ts", "src/config/deployment.ts", "src/config/privacy.ts", "src/config/contact.ts", "src/config/inquiry.ts", "src/config/services.ts", *self.contact_contract["draftForm"]["sourceFiles"]]
        quotation_files = []
        for source in self.quotation_contract["sourceRoots"]:
            path = ROOT / source
            quotation_files.extend([path] if path.is_file() else sorted(item for item in path.rglob("*") if item.suffix in {".ts", ".tsx", ".css"}))
        sources.extend(["scripts/fixtures/quotation-contract.json", *(str(path.relative_to(ROOT)) for path in quotation_files)])
        self.environment["sourceSha256"] = {name: hashlib.sha256((ROOT / name).read_bytes()).hexdigest() for name in sources}
        config = self.data["showcases"]
        entries = config["websiteShowcases"]
        self.check("Independent approved www root deployment", APPROVED_PAGES_DEPLOYMENT, self.data["pagesDeployment"])
        self.check("Independent approved brand metadata origin", APPROVED_PAGES_DEPLOYMENT["origin"], self.data["siteConfig"]["url"])
        self.check("Smoke target uses the deployment root", APPROVED_PAGES_DEPLOYMENT["basePath"], self.base_path)
        quotation = self.quotation_contract
        catalog = self.data["quotationCatalog"]
        self.check("Independent quotation reference-publication boundary", quotation["publication"], catalog["publication"])
        for key, expected in [("services", quotation["serviceIds"]), ("builds", quotation["buildIds"]), ("addons", quotation["addonIds"]), ("complexities", quotation["complexityIds"])]:
            self.check("Independent quotation " + key + " inventory", expected, [item["id"] for item in catalog[key]])
        self.check("Quotation retains only five formal product codes", sorted(quotation["productCodes"]), sorted({item["code"] for item in catalog["builds"]}))
        for item_id, price in quotation["criticalPrices"].items():
            item = next((item for item in catalog["builds"] if item["id"] == item_id), {})
            self.check("Independent source-price decision for " + item_id, price, item.get("price"))
        annual = [item for item in catalog["addons"] if item["billing"] == "annual"]
        self.check("Independent annually assessed service inventory", quotation["annualQuoteIds"], [item["id"] for item in annual])
        self.check("Annual prices remain assessed separately rather than annualized", True, all(item["price"]["kind"] == "quote" for item in annual))
        self.check("Complexity catalog adds no price multiplier", [], [key for item in catalog["complexities"] for key in item if re.search(r"multiplier|factor|price", key, re.I)])
        source_ids = {item["id"] for item in self.data["quotationSources"]}
        self.check("All estimator prices retain an attributable reference label", [], [item["id"] for item in [*catalog["builds"], *catalog["addons"]] if not item["reference"]["label"].strip() or item["reference"]["sourceId"] not in source_ids])
        for path in quotation_files:
            source = str(path.relative_to(ROOT))
            content = path.read_text()
            self.check(source + " has no outbound/logging/unsupported-storage API", [], [match.group() for pattern in [*quotation["networkPatterns"], *quotation["forbiddenStoragePatterns"]] for match in re.finditer(pattern, content)], "Supplemental source inspection; browser persistence and PII tests remain separate.")
            if source == quotation["storageFile"]:
                self.check("Quotation storage retains its sole key", True, '"' + quotation["storageKey"] + '"' in content)
                self.check("Quotation storage excludes personal fields and clearing unrelated data", [], re.findall(r"\b(?:customerName|projectName)\b|\.clear\s*\(", content))
            else:
                self.check(source + " leaves LocalStorage to the selection module", False, bool(re.search(r"\blocalStorage\b", content)))
        approved = self.contact_contract
        draft = approved["draftForm"]
        self.check("Independent Contact local-draft mode", draft["mode"], self.data["contactInquiry"]["mode"])
        self.check("Independent Contact draft field limits", draft["limits"], {key: self.data["contactInquiry"]["limits"].get(key) for key in draft["limits"]})
        self.check("Independent Contact draft service registry IDs", draft["serviceIds"], [item["id"] for item in self.data["contactInquiry"]["services"]])
        self.check("Native local-draft helper exports", ["createContactInquiryDraft", "validateContactInquiry"], sorted(self.data["contactDraftExports"]))
        for source in draft["sourceFiles"]:
            content = (ROOT / source).read_text()
            self.check(f"{source} contains no network/persistent-storage API references", [], [match.group() for pattern in draft["forbiddenSourcePatterns"] for match in re.finditer(pattern, content)], "Supplemental source inspection; browser network/storage and no-JavaScript behavior require separate testing.")
        self.check("Local draft does not add a receiving API route", [], [str(path.relative_to(ROOT)) for path in (ROOT / "src/app").rglob("route.*") if re.fullmatch(r"route\.[cm]?[jt]sx?", path.name)])
        action = self.data["inquiry"]["inquiryAction"]
        self.check("Independent owner-approved Email registry", ["mailto:" + approved["ownerEmail"]], [channel["href"] for channel in self.data["contact"]["verifiedContactChannels"]])
        self.check("Owner-approved direct enquiry state", approved["inquiryState"], action["state"])
        self.check("Owner-approved enquiry label", approved["inquiryLabel"], action["label"])
        self.check("Independent static enquiry template", {"subject": approved["mailtoSubject"], "fields": approved["mailtoFields"]}, self.data["inquiry"]["inquiryEmailTemplate"])
        self.check("Configured enquiry action opens the static general Email draft", [], mailto_errors(action["href"], approved, ""))
        self.check("Enquiry description distinguishes opening from sending", True, "開啟郵件程式" in action["description"] and "自行寄出" in action["description"] and "不會代為寄信" in action["description"])
        # GitHub Pages projects can share the deployment origin. Only explicit,
        # reviewed absolute destinations may bypass this website's base path.
        self.external_destinations = {
            normalized_absolute_http_url(href)
            for entry in entries
            for href in [entry.get("href") if entry.get("availability", "available") == "available" else None,
                         entry.get("attribution", {}).get("href")]
            if href
        } - {None}
        self.unavailable_source_destinations = {
            normalized_absolute_http_url(entry["sourceHref"])
            for entry in entries
            if entry.get("availability", "available") != "available" and entry.get("sourceHref")
        } - {None}
        expected_ids = self.contract["brandOrder"] + self.contract["templateIds"]
        self.check("Independent approved showcase inventory and order", expected_ids, [entry["id"] for entry in entries])
        self.check("Unique showcase IDs", len(entries), len({entry["id"] for entry in entries}))
        self.check("Independent featured selection", self.contract["featuredIds"], config["showcaseSettings"]["featuredIds"])
        self.check("Independent brand order setting", self.contract["brandOrder"], config["showcaseSettings"]["brandOrder"])
        self.check("Independent presentation classification", self.contract["presentationById"], {entry["id"]: entry["presentation"] for entry in entries})
        self.check("Independent unavailable source inventory", self.contract["referenceOnlyIds"], [entry["id"] for entry in entries if entry.get("availability") == "reference-only"])
        self.check("All reviewed brand entries remain available", self.contract["brandOrder"], [entry["id"] for entry in entries if entry["kind"] == "brand-demo" and entry.get("availability", "available") == "available"])
        for entry in entries:
            state = entry.get("availability", "available")
            self.check(f"{entry['id']} state is supported", True, state in {"available", "preparing", "reference-only"})
            self.check(f"{entry['id']} href/image availability gate", state == "available", bool(entry.get("href")) and bool(entry.get("image")))
            if state != "available":
                self.check(f"{entry['id']} unavailable fields remain null", [None, None], [entry.get("href"), entry.get("image")])
            if state == "reference-only":
                self.check(f"{entry['id']} keeps source attribution for review", True, bool(entry.get("sourceHref")) and bool(entry.get("attribution")))
        self.check("Protected SEO policy remains explicit", {"mode": "protected", "publishSitemap": False}, self.data["seoProtectionPolicy"])
        self.check("Privacy remains an unpublished draft", "draft", self.data["privacyPolicy"]["status"])
        self.public_pages = [page for page in self.data["seoPages"] if page["availability"] == "public"]
        expected_paths = self.contract["existingPublicPaths"] + ["/portfolio/showcases/" + item for item in self.contract["brandOrder"]] + [self.quotation_contract["path"]]
        self.check("Independent public route inventory", sorted(expected_paths), sorted(page["path"] for page in self.public_pages))
        self.check("SEO route paths are unique", len(self.data["seoPages"]), len({page["path"] for page in self.data["seoPages"]}))
        return True

    def metadata(self, path, doc):
        page = next(page for page in self.public_pages if page["path"] == path)
        heads = doc.all("head")
        self.check(f"{path} has exactly one head", 1, len(heads))
        if not heads:
            return
        head = heads[0]
        self.check(f"{path} exact decoded head title", [page["title"]], [element.text() for element in head.all("title")])
        def metadata(key, value, target="content"):
            return [element.attrs.get(target) for element in head.all() if element.tag in {"meta", "link"} and element.attrs.get(key) == value]
        canonical = self.data["siteConfig"]["url"].rstrip("/") + ("/" if path == "/" else path)
        expected = [("name", "description", page["description"]), ("property", "og:title", page["title"]),
                    ("property", "og:description", page["description"]), ("property", "og:url", canonical),
                    ("property", "og:site_name", self.data["siteConfig"]["name"]), ("property", "og:locale", "zh_TW"),
                    ("property", "og:type", "website"), ("name", "twitter:card", "summary"),
                    ("name", "twitter:title", page["title"]), ("name", "twitter:description", page["description"])]
        for key, name, value in expected:
            actual = metadata(key, name)
            raw_actual = actual
            if name == "og:url":
                equivalent = {canonical, canonical[:-1] if canonical.endswith("/") else canonical + "/"}
                actual = [canonical if item in equivalent else item for item in actual]
            self.check(f"{path} exact {name}", [value], actual,
                       notes=f"Next.js root/trailingSlash URL serialization; raw values: {raw_actual!r}" if actual != raw_actual else "")
        actual_canonical = metadata("rel", "canonical", "href")
        raw_canonical = actual_canonical
        equivalent = {canonical, canonical[:-1] if canonical.endswith("/") else canonical + "/"}
        actual_canonical = [canonical if item in equivalent else item for item in actual_canonical]
        self.check(f"{path} exact canonical", [canonical], actual_canonical,
                   notes=f"Next.js root/trailingSlash URL serialization; raw values: {raw_canonical!r}" if actual_canonical != raw_canonical else "")
        directives = metadata("name", "robots")
        self.check(f"{path} one robots metadata entry", 1, len(directives))
        self.check(f"{path} protected robots directives", ["nofollow", "noindex"], sorted(re.split(r"[,\s]+", directives[0].lower().strip())) if directives else [])
        forbidden = [element.attrs for element in head.all() if "hreflang" in element.attrs or re.match(r"^(?:og:image|twitter:(?:image|site|creator))(?::|$)", element.attrs.get("name", element.attrs.get("property", "")))]
        self.check(f"{path} no unapproved metadata fields", [], forbidden)
        scripts = [element.raw_text() for element in doc.all("script") if element.attrs.get("type") == "application/ld+json"]
        self.check(f"{path} one minimal JSON-LD script", 1, len(scripts))
        if len(scripts) == 1:
            expected_ld = {"@context": "https://schema.org", "@type": "WebSite", "name": self.data["siteConfig"]["name"], "url": self.data["siteConfig"]["url"].rstrip("/") + "/", "inLanguage": "zh-TW"}
            try:
                actual_ld = json.loads(scripts[0])
            except ValueError:
                actual_ld = scripts[0]
            self.check(f"{path} truthful minimal WebSite JSON-LD", expected_ld, actual_ld)
            self.check(f"{path} JSON-LD HTML escaping", False, "<" in scripts[0])
        self.check(f"{path} HTML language", ["zh-TW"], [element.attrs.get("lang") for element in doc.all("html")])

    def cards(self, path, doc):
        config = self.data["showcases"]
        articles = [element for element in doc.all("article") if "data-showcase-id" in element.attrs]
        expected_ids = self.contract["featuredIds"] if path == "/" else self.contract["brandOrder"] + self.contract["templateIds"]
        # Featured cards retain the approved brand order, independently of the selection-list order.
        if path == "/":
            expected_ids = [item for item in self.contract["brandOrder"] if item in expected_ids]
        self.check(f"{path} rendered card inventory/order", expected_ids, [element.attrs["data-showcase-id"] for element in articles])
        for card in articles:
            item_id = card.attrs["data-showcase-id"]
            entry = next((entry for entry in config["websiteShowcases"] if entry["id"] == item_id), None)
            if entry is None:
                continue
            state = entry.get("availability", "available")
            self.check(f"{path} {item_id} card state", state, card.attrs.get("data-showcase-state"))
            self.check(f"{path} {item_id} presentation data", entry["presentation"], card.attrs.get("data-showcase-presentation"))
            self.check(f"{path} {item_id} visible presentation label", True, config["presentationLabels"][entry["presentation"]] in card.text())
            self.check(f"{path} {item_id} visible availability label", True, config["showcaseStateLabels"][state] in card.text())
            hrefs = [element.attrs.get("href") for element in card.all("a")]
            images = card.all("img")
            if state == "available":
                self.check(f"{path} {item_id} public showcase link", True, entry["href"] in hrefs)
                self.check(f"{path} {item_id} preview URL", [self.base_path + entry["image"]["src"]], [element.attrs.get("src") for element in images])
                self.check(f"{path} {item_id} honest preview alternative", [entry["image"]["alt"]], [element.attrs.get("alt") for element in images])
            else:
                self.check(f"{path} {item_id} no fabricated preview", 0, len(images))
                allowed = {entry.get("attribution", {}).get("href"), self.base_path + "/portfolio/showcases/" + item_id, self.base_path + "/portfolio/showcases/" + item_id + "/"}
                self.check(f"{path} {item_id} no unavailable external button", [], [href for href in hrefs if href not in allowed])
            if entry["kind"] == "template":
                self.check(f"{path} {item_id} publisher attribution link", True, entry["attribution"]["href"] in hrefs)
                self.check(f"{path} {item_id} publisher attribution text", True, entry["attribution"]["label"] in card.text())
            else:
                detail = self.base_path + "/portfolio/showcases/" + item_id
                self.check(f"{path} {item_id} internal detail link", True, detail in hrefs or detail + "/" in hrefs)

    def links_and_resources(self, path, doc):
        page_url = self.route_url(path)
        public_paths = {page["path"] for page in self.public_pages}
        invalid = []
        for anchor in doc.all("a"):
            reference = anchor.attrs.get("href", "")
            if not reference:
                invalid.append({"href": reference, "reason": "empty href"})
                continue
            explicit_destination = normalized_absolute_http_url(reference)
            if explicit_destination in self.unavailable_source_destinations:
                invalid.append({"href": reference, "reason": "unavailable showcase source must not be linked"})
                continue
            if explicit_destination in self.external_destinations:
                continue
            url = urlsplit(urljoin(page_url, reference))
            if self.uses_legacy_project_path(url):
                invalid.append({"href": reference, "reason": "retired /xk-website/ deployment prefix"})
                continue
            if (url.scheme, url.netloc) != self.origin:
                continue
            if self.base_path and not url.path.startswith(self.base_path + "/") and url.path != self.base_path:
                invalid.append({"href": reference, "reason": "missing deployment base path"})
                continue
            route = unquote(url.path[len(self.base_path):]).rstrip("/") or "/"
            if route not in public_paths:
                invalid.append({"href": reference, "reason": "not a registered public route"})
                continue
            target = self.documents.get(route)
            if target is None:
                invalid.append({"href": reference, "reason": "target did not return HTTP 200 HTML"})
            elif url.fragment and unquote(url.fragment) not in {element.attrs["id"] for element in target.all() if "id" in element.attrs}:
                invalid.append({"href": reference, "reason": "missing target anchor"})
        self.check(f"{path} all site links and anchors resolve", [], invalid)
        bad_assets, images = [], []
        for element in doc.all():
            references = []
            if element.tag in {"script", "img", "source", "video", "audio"}:
                references.extend(filter(None, [element.attrs.get("src"), element.attrs.get("poster")]))
                srcset = element.attrs.get("srcset", "")
                if srcset and not srcset.startswith("data:"):
                    references.extend(candidate.strip().split()[0] for candidate in srcset.split(","))
            if element.tag == "link" and set(element.attrs.get("rel", "").split()) & {"stylesheet", "preload", "modulepreload", "icon", "apple-touch-icon", "mask-icon"}:
                references.extend(filter(None, [element.attrs.get("href")]))
            for reference in references:
                url = urlsplit(urljoin(page_url, reference))
                if self.uses_legacy_project_path(url):
                    bad_assets.append({"url": url.geturl(), "reason": "retired /xk-website/ deployment prefix"})
                    continue
                if (url.scheme, url.netloc) != self.origin:
                    continue
                resolved = urlunsplit((url.scheme, url.netloc, url.path, url.query, ""))
                result = self.fetch(resolved)
                if not url.path.startswith(self.base_path + "/") or result["status"] != 200:
                    bad_assets.append({"url": resolved, "status": result["status"], "error": result.get("error")})
                if element.tag == "img" and reference == element.attrs.get("src"):
                    try:
                        dimensions = image_dimensions(result["body"])
                    except (ValueError, KeyError, ET.ParseError, struct.error, IndexError):
                        dimensions = None
                    content_type = next((value for key, value in result["headers"].items() if key.lower() == "content-type"), "")
                    valid = bool(dimensions and dimensions[1] > 0 and dimensions[2] > 0 and content_type.startswith("image/"))
                    observation = {"url": resolved, "valid": valid, "formatAndDimensions": dimensions, "bytes": len(result["body"]), "contentType": content_type}
                    images.append(observation)
                    self.image_observations[resolved] = observation
        self.check(f"{path} referenced local assets use base path and HTTP 200", [], bad_assets)
        self.check(f"{path} real image bytes and natural header dimensions", [], [item for item in images if not item["valid"]], "Header inspection is not a full browser image-decoding check.")

    def enquiry_markup(self, path, doc):
        approved = self.contact_contract
        draft_elements = []
        if path == "/contact":
            self.check("Contact contains only its approved pre-hydration local draft form", [], contact_draft_form_errors(doc, approved["draftForm"]), "Static SSR contract only; post-hydration validation, no-JavaScript behavior, network and storage are tested separately.")
            forms = doc.all("form")
            if len(forms) == 1:
                draft_elements = [forms[0], *forms[0].all()]
        elif path == self.quotation_contract["path"]:
            self.check("Quotation permits only its fixed local SSR controls", [], quotation_markup_errors(doc, self.quotation_contract, self.data["quotationCatalog"]), "Initial HTML only; post-hydration calculation, persistence, PII and printing require separate browser/native tests.")
            draft_elements = [*doc.all("input"), *doc.all("textarea")]
        controls = [element.tag for element in doc.all() if element not in draft_elements and (element.tag in {"form", "input", "textarea", "select"} or element.attrs.get("type") == "submit" or "formaction" in element.attrs or "onsubmit" in element.attrs)]
        self.check(f"{path} has no form or outbound submit outside the approved Contact draft", [], controls)
        anchors = doc.all("a")
        self.check(f"{path} has no unapproved phone channel", [], [anchor.attrs.get("href") for anchor in anchors if anchor.attrs.get("href", "").lower().startswith("tel:")])
        mailtos = [anchor for anchor in anchors if anchor.attrs.get("href", "").lower().startswith("mailto:")]
        for index, anchor in enumerate(mailtos, 1):
            self.check(f"{path} Email link {index} has the sole recipient and static prompts", [], mailto_errors(anchor.attrs["href"], approved), "URL parsing only; no Email is sent and delivery is not tested.")
        actions = [anchor for anchor in anchors if "data-inquiry-state" in anchor.attrs]
        self.check(f"{path} retains a direct enquiry action", True, bool(actions))
        for index, anchor in enumerate(actions, 1):
            context = anchor.attrs.get("data-inquiry-context", "")
            self.check(f"{path} enquiry {index} state", approved["inquiryState"], anchor.attrs["data-inquiry-state"])
            self.check(f"{path} enquiry {index} visible label", approved["planInquiryLabel"] if context else approved["inquiryLabel"], anchor.text().strip())
            self.check(f"{path} enquiry {index} exact static context", [], mailto_errors(anchor.attrs.get("href", ""), approved, context))
            if context:
                self.check(f"{path} enquiry {index} contextual accessible name", approved["planInquiryLabel"] + "：" + context, anchor.attrs.get("aria-label"))
        claims = [match.group() for pattern in approved["forbiddenClaimPatterns"] for match in re.finditer(pattern, doc.text(), re.I)]
        self.check(f"{path} has no delivery, automatic-reply or response-SLA claim", [], claims)

    def contact_page(self, doc):
        approved = self.contact_contract
        main = doc.all("main")
        self.check("Contact retains one main landmark", 1, len(main))
        if not main:
            return
        main = main[0]
        self.check("Contact retains the seven approved sections in order", approved["contactSectionIds"], [element.attrs.get("id") for element in main.all("section")])
        self.check("Contact has the approved heading", [approved["contactHeading"]], [element.text().strip() for element in main.all("h1")])
        channels = [element for element in main.all("section") if element.attrs.get("id") == "contact-channels"]
        self.check("Contact shows the approved channels-only state", [approved["availability"]], [element.attrs.get("data-contact-availability") for element in channels])
        self.check("Contact displays the owner-approved Email", True, bool(channels) and approved["ownerEmail"] in channels[0].text())
        self.check("Contact exposes the Email draft link", True, bool(channels) and any(anchor.attrs.get("href", "").startswith("mailto:") for anchor in channels[0].all("a")))
        self.check("Contact no longer shows the unconfirmed-channel fallback", False, "正式聯絡管道確認中" in main.text())
        process = [element for element in main.all("section") if element.attrs.get("id") == "contact-process"]
        self.check("Contact has the three Email/clarification/quotation steps", approved["processSteps"], [element.text().strip() for element in process[0].all("h3")] if len(process) == 1 else [])
        notes = [element.text() for element in main.all("section") if element.attrs.get("id") == "contact-data-note"]
        self.check("Contact explains draft, manual sending and delivery boundaries", [], [note for note in approved["requiredDataNotes"] if not notes or note not in notes[0]])

    def service_plans(self, path, doc):
        approved = self.contact_contract
        sections = [element for element in doc.all("section") if element.attrs.get("id") == "service-plans"]
        self.check(f"{path} has one service-plans section", 1, len(sections))
        if not sections:
            return
        plans = sections[0]
        cards = [element for element in plans.all() if "data-service-plan-id" in element.attrs]
        self.check(f"{path} retains the three approved service plans in order", approved["servicePlanIds"], [card.attrs["data-service-plan-id"] for card in cards])
        for card in cards:
            item_id = card.attrs["data-service-plan-id"]
            context = approved["servicePlanContexts"].get(item_id)
            self.check(f"{path} {item_id} plan links to its own enquiry draft", [context], [anchor.attrs.get("data-inquiry-context") for anchor in card.all("a") if "data-inquiry-state" in anchor.attrs])
            self.check(f"{path} {item_id} retains scope-based pricing", True, "依需求報價" in card.text())
        pricing = [element for element in doc.all("section") if element.attrs.get("id") == "pricing-guide"]
        if path == "/services":
            self.check("Services has one pricing-guide section", 1, len(pricing))
        text = plans.text() + "".join(element.text() for element in pricing)
        self.check(f"{path} plans/pricing guide contain no unapproved numerical prices", [], re.findall(approved["unapprovedPricePattern"], text, re.I), "Only monetary price patterns in these sections are checked; case numbers and technical versions remain valid.")

    def run(self):
        if not self.source_contract():
            return
        for page in self.public_pages:
            path = page["path"]
            response = self.fetch(self.route_url(path))
            self.check(f"{path} public route HTTP status", 200, response["status"], response.get("error", ""))
            content_type = next((value for key, value in response["headers"].items() if key.lower() == "content-type"), "")
            self.check(f"{path} public route HTML response", True, "text/html" in content_type)
            if response["status"] == 200 and "text/html" in content_type:
                self.documents[path] = Document(response["body"].decode("utf-8")).root
        for path, doc in self.documents.items():
            self.metadata(path, doc)
            self.links_and_resources(path, doc)
            self.enquiry_markup(path, doc)
            footer = doc.all("footer")
            footer_urls = [urlsplit(urljoin(self.route_url(path), anchor.attrs.get("href", ""))) for element in footer for anchor in element.all("a")]
            footer_paths = {url.path.rstrip("/") or "/" for url in footer_urls if (url.scheme, url.netloc) == self.origin}
            self.check(f"{path} Footer lists every published route including Quotation", [], [page["path"] for page in self.public_pages if page["path"] not in footer_paths])
            if path in {"/", "/portfolio"}:
                self.cards(path, doc)
            if path in {"/", "/services"}:
                self.service_plans(path, doc)
            if path == "/portfolio":
                ids = {element.attrs["id"] for element in doc.all() if "id" in element.attrs}
                self.check("Portfolio retains all existing category anchors", [], [item for item in self.contract["portfolioAnchors"] if item not in ids])
            if path in {"/portfolio/" + slug for slug in self.contract["technicalPlanSlugs"]}:
                main = doc.all("main")
                text = main[0].text() if main else ""
                self.check(f"{path} technical plan remains Planned", True, "Planned／規劃中" in text)
                self.check(f"{path} technical plan retains empty implementation/media", True, "尚無可驗證的系統畫面" in text and "尚未提供可核對的實作與測試證據。" in text)
                self.check(f"{path} technical plan has no fabricated screenshot", 0, len(main[0].all("img")) if main else -1)
            if path in {"/about", "/solutions"}:
                self.check(f"{path} revised visible operating-model copy", [], re.findall(r"一人全職|由一人|創辦人一人", doc.text()))
            if path == "/contact":
                self.contact_page(doc)
            draft_markers = [self.data["privacyDraftMarker"]] + [text for section in self.data["privacyPolicy"]["sections"] for text in section["paragraphs"]]
            self.check(f"{path} contains no unpublished Privacy draft text", [], [marker for marker in draft_markers if marker and marker in doc.text()])
        negative = ["/privacy", "/dev/design-system", "/sitemap.xml", "/portfolio/unknown-smoke-route", "/portfolio/showcases/unknown-smoke-route", "/quotation/unknown-smoke-route", "/api/quotation", "/unknown-smoke-route"]
        for path in negative:
            url = self.base + path.lstrip("/")
            self.check(f"{path} unpublished/unknown route returns real HTTP 404", 404, self.fetch(url)["status"], "A soft 404 or redirect to Home is a failure.")
        robots = self.fetch(self.base + "robots.txt")
        self.check("Protected robots HTTP status", 200, robots["status"])
        lines = [re.sub(r"^([^:]+):\s*", lambda match: match[1].lower() + ": ", line.split("#")[0].strip()) for line in robots["body"].decode("utf-8").splitlines() if line.split("#")[0].strip()]
        expected = ["user-agent: *", "allow: " + self.base_path + "/", "disallow: " + self.base_path + "/dev/"]
        expected.extend("disallow: " + self.base_path + page["path"] for page in self.data["seoPages"] if page["availability"] == "draft")
        self.check("Protected robots exact rules without Sitemap", sorted(expected), sorted(lines))
        if self.args.check_external:
            for entry in self.data["showcases"]["websiteShowcases"]:
                if entry.get("availability", "available") == "available":
                    response = self.fetch(entry["href"])
                    self.check(f"External {entry['id']} available source HTTP status", 200, response["status"], response.get("error", ""))
        if self.args.check_source_assets:
            for source in self.contract["sourceAssetChecks"]:
                response = self.fetch(source["url"])
                self.check(f"External {source['id']} known source-asset limitation", source["expectedStatus"], response["status"], "Expected 404 records the current limitation; it never means the source asset was repaired. " + response.get("error", ""))
        self.completed = True

    def report(self):
        counts = Counter(item["status"] for item in self.results)
        report = {"suite": "XK website HTTP smoke", "startedAt": self.started, "finishedAt": now(),
                  "environment": self.environment, "command": [sys.executable, *sys.argv],
                  "result": "FAIL" if counts["FAIL"] else "PASS", "exitCode": 1 if counts["FAIL"] else 0,
                  "counts": dict(counts), "complete": self.completed, "checks": self.results,
                  "httpObservations": [{"url": url, "status": item["status"], "finalUrl": item["finalUrl"], "bytes": len(item["body"]), "error": item.get("error")} for url, item in self.cache.items()],
                  "imageObservations": list(self.image_observations.values()),
                  "scopeNotes": ["No browser rendering, keyboard, screen reader, responsive, axe or complete WCAG audit is performed.",
                                 "External source checks run only when requested; source-asset expected 404 is evidence of a limitation.",
                                 "Email checks parse the public recipient and static draft prompts only; no message, SMTP or delivery test is performed.",
                                 "Contact form checks inspect initial server HTML and source references; browser interactions, persistent-storage behavior and network flows require separate tests.",
                                 "Image headers/bytes are inspected; full browser decoding is a separate check."]}
        output = Path(self.args.output).expanduser()
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
        for item in self.results:
            if item["status"] == "FAIL":
                print(f"{item['testId']} FAIL {item['item']}: expected {item['expected']!r}; actual {item['actual']!r}", file=sys.stderr)
        print(f"{report['result']}: {counts['PASS']} passed, {counts['FAIL']} failed. JSON: {output}")
        return report["exitCode"]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", required=True, help="Existing production/Pages server at its origin root, e.g. http://127.0.0.1:3101/ or https://www.xplorekaleidoscope.com/; /xk-website/ is rejected")
    parser.add_argument("--output", default="/tmp/xk-website-smoke-" + datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ") + ".json", help="JSON evidence path (default: unique timestamped /tmp file)")
    parser.add_argument("--timeout", type=float, default=20, help="Per-request timeout in seconds")
    parser.add_argument("--check-external", action="store_true", help="Also require available external showcase homepages to return HTTP 200")
    parser.add_argument("--check-source-assets", action="store_true", help="Also reproduce the independent fixture's known external source-asset HTTP statuses")
    args = parser.parse_args()
    if args.timeout <= 0:
        parser.error("--timeout must be positive")
    suite = None
    try:
        suite = Smoke(args)
        suite.run()
    except Exception as error:
        if suite is None:
            parser.error(str(error))
        suite.check("Smoke execution completes without a tool/configuration error", "complete", str(error))
    suite.check("All smoke phases reached their completion marker", True, suite.completed)
    return suite.report()


if __name__ == "__main__":
    sys.exit(main())
