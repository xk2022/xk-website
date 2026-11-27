import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { brotliDecompressSync } from "node:zlib";
import test from "node:test";

// Defaults match the intended repository destinations. Overrides allow the owner
// to run against the prepared metadata without copying it into App source first.
const repo = resolve(process.env.XK_FONT_TEST_ROOT ?? fileURLToPath(new URL("../", import.meta.url)));
const fixtureRoot = process.env.XK_FONT_FIXTURE_ROOT ?? join(repo, "scripts/fixtures");
const fontRoot = join(repo, "src/app/fonts");
const metadataRoot = process.env.XK_FONT_METADATA_ROOT ?? fontRoot;
const read = (path) => readFileSync(path);
const sha = (data) => createHash("sha256").update(data).digest("hex");
const fixture = JSON.parse(read(join(fixtureRoot, "font-contract.json")));
const metadataBytes = read(join(metadataRoot, "font-assets.json"));
const codepointBytes = read(join(metadataRoot, "codepoints.json"));
const metadata = JSON.parse(metadataBytes);
const codepoints = JSON.parse(codepointBytes);
const css = read(join(fontRoot, "noto-sans-tc.css")).toString();
const coreSource = read(join(fontRoot, "core-font.ts")).toString();
const layoutSource = read(join(repo, "src/app/layout.tsx")).toString();
const coreBytes = read(join(fontRoot, "fonts", fixture.pinnedCore.file));

function unicodeSet(range) {
  const points = new Set();
  for (const part of range.split(",")) {
    const match = /^U\+([0-9A-F?]+)(?:-([0-9A-F]+))?$/i.exec(part.trim());
    assert(match, `Invalid unicode-range: ${part}`);
    assert(!match[2] || !match[1].includes("?"), "A wildcard cannot have an end range");
    const start = parseInt(match[1].replaceAll("?", "0"), 16);
    const end = parseInt(match[2] ?? match[1].replaceAll("?", "F"), 16);
    assert(start <= end && end <= 0x10ffff, `Invalid Unicode interval: ${part}`);
    for (let cp = start; cp <= end; cp++) points.add(cp);
  }
  return points;
}

const sorted = (set) => [...set].sort((a, b) => a - b);
const union = (sets) => new Set(sets.flatMap((set) => [...set]));
const subtract = (set, excluded) => new Set([...set].filter((cp) => !excluded.has(cp)));
const originalFaces = fixture.originalSource.faces;
const originalSets = originalFaces.map((face) => unicodeSet(face.unicodeRange));
const originalCoverage = union(originalSets);
const coreCoverage = new Set(codepoints.core);
const faces = [...css.matchAll(/@font-face\s*\{([^{}]*)\}/g)].map((match) => ({
  raw: match[0],
  props: Object.fromEntries([...match[1].matchAll(/([\w-]+)\s*:\s*([^;]+)/g)].map((part) => [part[1], part[2].trim()])),
}));
const legacy = faces.filter((face) => face.props["font-family"] === "Noto Sans TC");
const legacySets = legacy.map((face) => unicodeSet(face.props["unicode-range"]));
const legacyCoverage = union(legacySets);

function sourceLiteral(key) {
  const found = coreSource.match(new RegExp(`\\b${key}:\\s*["']([^"']+)["']`));
  assert(found, `Missing literal localFont ${key}`);
  return found[1];
}

function fontFile(face) {
  const found = /^url\(["']?(\.\/fonts\/[^"')]+\.woff2)["']?\)format\(["']woff2["']\)$/.exec(face.props.src);
  assert(found, `Only relative same-origin WOFF2 src is allowed: ${face.props.src}`);
  return basename(found[1]);
}

// WOFF2 directory lengths locate untransformed fvar/cmap tables in the decoded
// stream. This does not reconstruct transformed outlines or replace glyph proof.
function woff2Tables(bytes) {
  assert.equal(bytes.toString("ascii", 0, 4), "wOF2");
  const known = "cmap|head|hhea|hmtx|maxp|name|OS/2|post|cvt |fpgm|glyf|loca|prep|CFF |VORG|EBDT|EBLC|gasp|hdmx|kern|LTSH|PCLT|VDMX|vhea|vmtx|BASE|GDEF|GPOS|GSUB|EBSC|JSTF|MATH|CBDT|CBLC|COLR|CPAL|SVG |sbix|acnt|avar|bdat|bloc|bsln|cvar|fdsc|feat|fmtx|fvar|gvar|hsty|just|lcar|mort|morx|opbd|prop|trak|Zapf|Silf|Glat|Gloc|Feat|Sill".split("|");
  let position = 48;
  function base128() {
    let value = 0;
    for (let count = 0; count < 5; count++) {
      const byte = bytes[position++];
      assert(byte !== undefined, "Truncated WOFF2 directory");
      assert(count > 0 || byte !== 0x80, "Noncanonical UIntBase128");
      value = value * 128 + (byte & 0x7f);
      assert(value <= 0xffffffff, "UIntBase128 overflow");
      if (!(byte & 0x80)) return value;
    }
    assert.fail("UIntBase128 exceeds five bytes");
  }
  const directory = [];
  for (let index = 0; index < bytes.readUInt16BE(12); index++) {
    const flags = bytes[position++];
    const tagIndex = flags & 0x3f;
    const tag = tagIndex === 63 ? bytes.toString("ascii", position, position += 4) : known[tagIndex];
    assert(tag, "Unknown WOFF2 tag");
    const originalLength = base128();
    const version = flags >> 6;
    const transformed = tag === "glyf" || tag === "loca" ? version !== 3 : version !== 0;
    directory.push({ tag, transformed, length: transformed ? base128() : originalLength });
  }
  const compressedLength = bytes.readUInt32BE(20);
  const decoded = brotliDecompressSync(bytes.subarray(position, position + compressedLength));
  let offset = 0;
  const tables = new Map();
  for (const entry of directory) {
    assert(offset + entry.length <= decoded.length, "Invalid decoded table length");
    if (!entry.transformed) tables.set(entry.tag, decoded.subarray(offset, offset + entry.length));
    offset += entry.length;
  }
  assert.equal(offset, decoded.length, "Unexpected bytes in WOFF2 table stream");
  return tables;
}

let decodedTables;
const tables = () => (decodedTables ??= woff2Tables(coreBytes));

function cmapFacts(cmap) {
  const ordinary = new Set();
  const pairs = [];
  const seen = new Set();
  for (let i = 0; i < cmap.readUInt16BE(2); i++) {
    const offset = cmap.readUInt32BE(4 + i * 8 + 4);
    if (seen.has(offset)) continue;
    seen.add(offset);
    const table = cmap.subarray(offset);
    const format = table.readUInt16BE(0);
    if (format === 12) {
      for (let group = 0; group < table.readUInt32BE(12); group++) {
        const at = 16 + group * 12;
        const start = table.readUInt32BE(at), end = table.readUInt32BE(at + 4), glyph = table.readUInt32BE(at + 8);
        for (let cp = start; cp <= end; cp++) if (glyph + cp - start !== 0) ordinary.add(cp);
      }
    } else if (format === 4) {
      const count = table.readUInt16BE(6) / 2;
      const starts = 16 + count * 2, deltas = starts + count * 2, ranges = deltas + count * 2;
      for (let segment = 0; segment < count; segment++) {
        const start = table.readUInt16BE(starts + segment * 2), end = table.readUInt16BE(14 + segment * 2);
        const delta = table.readInt16BE(deltas + segment * 2), range = table.readUInt16BE(ranges + segment * 2);
        for (let cp = start; cp <= end && cp < 0xffff; cp++) {
          let glyph = range ? table.readUInt16BE(ranges + segment * 2 + range + (cp - start) * 2) : cp;
          if (!range || glyph) glyph = (glyph + delta) & 0xffff;
          if (glyph) ordinary.add(cp);
        }
      }
    } else if (format === 14) {
      for (let record = 0; record < table.readUInt32BE(6); record++) {
        const at = 10 + record * 11;
        const selector = table.readUIntBE(at, 3), defaults = table.readUInt32BE(at + 3), nondefaults = table.readUInt32BE(at + 7);
        if (defaults) for (let entry = 0; entry < table.readUInt32BE(defaults); entry++) {
          const p = defaults + 4 + entry * 4, start = table.readUIntBE(p, 3);
          for (let cp = start; cp <= start + table[p + 3]; cp++) pairs.push([selector, cp, true]);
        }
        if (nondefaults) for (let entry = 0; entry < table.readUInt32BE(nondefaults); entry++) {
          const p = nondefaults + 4 + entry * 5;
          assert(table.readUInt16BE(p + 3) > 0, "UVS glyph must exist");
          pairs.push([selector, table.readUIntBE(p, 3), false]);
        }
      }
    }
  }
  return { ordinary, pairs: pairs.sort((a, b) => a[0] - b[0] || a[1] - b[1]) };
}

test("FONT-01 reviewed metadata and 882 codepoints retain their independent pinned identities", () => {
  assert.equal(fixture.originalSource.cssSha256, "ce25680942558ee80c80ecb657ce6bff3934b922f36c52941b7a0598334f3b30");
  assert.equal(sha(metadataBytes), fixture.pinnedMetadataSha256);
  assert.equal(sha(codepointBytes), fixture.pinnedCodepointsSha256);
  assert.deepEqual(codepoints.core, sorted(coreCoverage));
  assert.equal(coreCoverage.size, 882);
  assert.deepEqual(codepoints.uvsSelectors, [65024, 65025]);
  assert(codepoints.uvsSelectors.every((cp) => !coreCoverage.has(cp)));
});

test("FONT-02 exactly 109 font assets exist and all 108 immutable legacy bytes are retained", () => {
  const names = readdirSync(join(fontRoot, "fonts")).sort();
  assert.deepEqual(names, [...originalFaces.map((face) => face.file), fixture.pinnedCore.file].sort());
  assert.equal(metadata.legacyFonts.length, 108);
  assert.deepEqual(metadata.legacyFonts.map((font) => font.file), originalFaces.map((face) => face.file));
  for (const font of metadata.legacyFonts) {
    const bytes = read(join(fontRoot, "fonts", font.file));
    assert.equal(bytes.length, font.bytes, font.file);
    assert.equal(sha(bytes), font.sha256, font.file);
  }
});

test("FONT-03 pinned core binary is variable wght 100–900 with exact ordinary cmap and retained UVS", () => {
  assert.equal(coreBytes.length, 281768);
  assert.equal(sha(coreBytes), "8c1e22167a472d67e2e51c5c811b3b2c2815742d054a0994e7f49ef071b99018");
  const fvar = tables().get("fvar");
  assert(fvar, "Variable axis table is required");
  assert.equal(fvar.readUInt16BE(8), 1);
  const at = fvar.readUInt16BE(4);
  assert.equal(fvar.toString("ascii", at, at + 4), "wght");
  assert.deepEqual([4, 8, 12].map((offset) => fvar.readInt32BE(at + offset) / 65536), [100, 100, 900]);
  const cmap = cmapFacts(tables().get("cmap"));
  assert.deepEqual(sorted(cmap.ordinary), codepoints.core);
  assert.deepEqual(cmap.pairs, fixture.uvsPairs);
});

test("FONT-04 native core declaration keeps swap, variable weight, explicit core range and sole CJK preload", () => {
  assert.match(coreSource, /import localFont from ["']next\/font\/local["']/);
  assert.equal((coreSource.match(/\blocalFont\(/g) ?? []).length, 1);
  assert.equal(sourceLiteral("src"), "./fonts/noto-sans-tc-core.woff2");
  assert.equal(sourceLiteral("weight"), "100 900");
  assert.equal(sourceLiteral("style"), "normal");
  assert.equal(sourceLiteral("display"), "swap");
  assert.equal(sourceLiteral("variable"), "--font-noto-sans-tc");
  assert.match(coreSource, /\bpreload:\s*true\b/);
  assert.match(coreSource, /\badjustFontFallback:\s*false\b/);
  assert.match(coreSource, /fallback:\s*\["Noto Sans TC",\s*"Noto Sans TC Fallback"\]/);
  const range = coreSource.match(/prop:\s*["']unicode-range["']\s*,\s*value:\s*["']([^"']+)["']/);
  assert(range, "The range must be a literal declaration, not a runtime-computed value");
  assert.deepEqual(sorted(unicodeSet(range[1])), codepoints.core);
});

test("FONT-05 legacy stylesheet contains only 108 retained family faces and the original Arial fallback", () => {
  assert.equal(faces.length, 109);
  assert.equal(legacy.length, 108);
  assert(!css.includes("noto-sans-tc-core.woff2"), "Core must not have a duplicate CSS face");
  for (const face of legacy) {
    assert.equal(face.props["font-style"], "normal");
    assert.equal(face.props["font-weight"], "100 900");
    assert.equal(face.props["font-display"], "swap");
  }
});

test("FONT-06 core and remaining legacy ranges are disjoint and exactly preserve all 16,661 original points", () => {
  assert.equal(originalCoverage.size, 16661);
  assert.equal(legacyCoverage.size, 15779);
  assert([...coreCoverage].every((cp) => originalCoverage.has(cp) && !legacyCoverage.has(cp)));
  assert.deepEqual(sorted(union([coreCoverage, legacyCoverage])), sorted(originalCoverage));
});

test("FONT-07 every legacy rule retains original file order and precisely original range minus core", () => {
  assert.deepEqual(legacy.map(fontFile), originalFaces.map((face) => face.file));
  legacySets.forEach((points, index) => {
    assert.deepEqual(sorted(points), sorted(subtract(originalSets[index], coreCoverage)), originalFaces[index].file);
  });
});

test("FONT-08 original Arial metrics and the complete OFL text remain unchanged", () => {
  const fallback = faces.filter((face) => face.props["font-family"] === "Noto Sans TC Fallback");
  assert.equal(fallback.length, 1);
  assert.equal(fallback[0].raw, fixture.originalSource.fallbackFaceExact);
  const license = read(join(fontRoot, "OFL.txt"));
  assert.equal(sha(license), "1c05c68c34f9708415aada51f17e1b0092d2cea709bf4a94cd38114f9e73d7d9");
  assert.equal(license.toString().split(/\r?\n/)[0], "Copyright 2014-2021 Adobe (http://www.adobe.com/), with Reserved Font Name 'Source'");
  assert.match(license.toString(), /SIL OPEN FONT LICENSE Version 1\.1/);
});

test("FONT-09 font source URLs stay relative and the technical root imports one native core and legacy CSS", () => {
  legacy.forEach(fontFile);
  assert(!/@import|https?:|\/\/|data:/i.test(css));
  assert.match(layoutSource, /import\s*\{\s*notoSansTC\s*\}\s*from\s*["']\.\/fonts\/core-font["']/);
  assert.match(layoutSource, /import\s*["']\.\/fonts\/noto-sans-tc\.css["']/);
  assert(!/Noto_Sans_TC/.test(layoutSource), "A second Google CJK loader must not preload legacy shards");
  assert.equal((layoutSource.match(/notoSansTC\.variable/g) ?? []).length, 1);
});

test("FONT-10 non-core U+9F98 remains covered by its exact original legacy asset", () => {
  const probe = fixture.fallbackProbe;
  assert.equal(probe.codepoint, 0x9f98);
  assert(!coreCoverage.has(probe.codepoint));
  const index = originalFaces.findIndex((face) => face.file === probe.originalFile);
  assert(index >= 0 && originalSets[index].has(probe.codepoint));
  assert(legacySets[index].has(probe.codepoint));
  const asset = metadata.legacyFonts.find((font) => font.file === probe.originalFile);
  assert.equal(asset.sha256, probe.originalSha256);
});
