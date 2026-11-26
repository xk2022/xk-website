import { ModernFrame } from "@/components/design-collection/modern/modern-frame";
import { DesignCollectionGallery } from "@/components/design-collection/shared/design-collection-gallery";
import { createDesignPageMetadata } from "@/lib/design-collection/metadata";

export const metadata = createDesignPageMetadata({ pageKey: "collection" });

export default function DesignCollectionPage() {
  return (
    <ModernFrame>
      <DesignCollectionGallery />
    </ModernFrame>
  );
}
