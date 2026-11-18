import type { NextConfig } from "next";

const isPagesExport = process.env.XK_PAGES_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isPagesExport
    ? {
        output: "export" as const,
        basePath: process.env.XK_PAGES_BASE_PATH ?? "/xk-website",
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
