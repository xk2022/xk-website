import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const basePath = (process.env.XK_PAGES_BASE_PATH ?? "/xk-website").replace(/\/+$/, "");
assert.match(basePath, /^(\/[A-Za-z0-9._~-]+)*$/, "XK_PAGES_BASE_PATH must be empty or a URL path such as /xk-website.");

const result = spawnSync(process.execPath, [join(root, "node_modules/next/dist/bin/next"), "build"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, XK_PAGES_EXPORT: "1", XK_PAGES_BASE_PATH: basePath },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

const output = join(root, "out");
// The development tool is never part of a public static deployment. A notFound()
// build normally omits it already; remove any generated route payloads as well.
rmSync(join(output, "dev"), { recursive: true, force: true });
rmSync(join(output, "dev.html"), { force: true });
rmSync(join(output, "dev.txt"), { force: true });
writeFileSync(join(output, ".nojekyll"), "");

assert.ok(existsSync(join(output, "index.html")), "Missing exported homepage.");
assert.ok(existsSync(join(output, "404.html")), "Missing GitHub Pages 404 document.");
const html = readFileSync(join(output, "index.html"), "utf8");
assert.match(html, /noindex/, "Construction-stage noindex metadata must be retained.");
assert.ok(html.includes(`${basePath}/_next/static/`), "Exported asset URLs do not match the Pages base path.");

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
console.log(`GitHub Pages static artifact verified: out/ (base path: ${basePath || "/"}).`);
