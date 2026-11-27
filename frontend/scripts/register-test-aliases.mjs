import { existsSync, statSync } from "node:fs";
import { registerHooks } from "node:module";
import { extname } from "node:path";

// Node-only test support for the existing Next.js @/* imports. Never imported by the app.
const sourceRoot = new URL("../src/", import.meta.url);

function findSourceFile(candidate) {
  if (candidate.protocol !== "file:" || !candidate.href.startsWith(sourceRoot.href)) return null;
  const candidates = extname(candidate.pathname)
    ? [candidate]
    : [new URL(`${candidate.href}.ts`), new URL(`${candidate.href}/index.ts`)];
  return candidates.find((url) => existsSync(url) && statSync(url).isFile()) ?? null;
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const candidate = findSourceFile(new URL(specifier.slice(2), sourceRoot));
      if (!candidate) throw new Error(`Unknown test source alias: ${specifier}`);
      return nextResolve(candidate.href, context);
    }
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (context.parentURL?.startsWith(sourceRoot.href)
        && specifier.startsWith(".")
        && ["ERR_MODULE_NOT_FOUND", "ERR_UNSUPPORTED_DIR_IMPORT"].includes(error.code)) {
        const candidate = findSourceFile(new URL(specifier, context.parentURL));
        if (candidate) return nextResolve(candidate.href, context);
      }
      throw error;
    }
  },
});
