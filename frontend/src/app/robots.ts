import type { MetadataRoute } from "next";

import { pagesDeployment } from "@/config/deployment";
import { seoPages } from "@/config/seo";
import { createRobotsMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return createRobotsMetadata(pagesDeployment.basePath, seoPages);
}
