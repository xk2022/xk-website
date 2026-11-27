import type { NextConfig } from "next";

import { assertPagesBasePath, pagesDeployment } from "./src/config/deployment.ts";

const isPagesExport = process.env.XK_PAGES_EXPORT === "1";
if (isPagesExport) assertPagesBasePath(process.env.XK_PAGES_BASE_PATH);

const nextConfig: NextConfig = {
  ...(isPagesExport
    ? {
        output: "export" as const,
        basePath: pagesDeployment.basePath,
        assetPrefix: "",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
