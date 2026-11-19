import type { MetadataRoute } from "next";

import { seoPages } from "@/config/seo";
import { createRobotsMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const basePath = process.env.XK_PAGES_EXPORT === "1" ? (process.env.XK_PAGES_BASE_PATH ?? "/xk-website") : "";
  return createRobotsMetadata(basePath, seoPages);
}
