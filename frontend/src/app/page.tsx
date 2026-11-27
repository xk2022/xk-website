import type { Metadata } from "next";

import { ImmersiveGateway } from "@/components/design-collection/shared/immersive-gateway";
import { designCollectionRegistry } from "@/config/design-collection";
import { getSeoPage } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { resolveDesignHref } from "@/lib/design-collection/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(getSeoPage("/"), siteConfig);

export default function GatewayPage() {
  const destinations = Object.fromEntries(designCollectionRegistry.styles.map(({ id }) => [id, resolveDesignHref({ styleId: id, pageKey: "home" })]));
  if (!destinations.modern || !destinations.heritage || !destinations.luxury) throw new Error("Gateway requires three published homepages");
  return <ImmersiveGateway destinations={{ modern: destinations.modern, heritage: destinations.heritage, luxury: destinations.luxury }} legacyAnchors={[...designCollectionRegistry.anchors.modern.home ?? [], "home-title"]} />;
}
