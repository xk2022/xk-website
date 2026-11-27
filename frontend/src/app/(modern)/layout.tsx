import type { ReactNode } from "react";

import { ModernFrame } from "@/components/design-collection/modern/modern-frame";

export default function ModernLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <ModernFrame>{children}</ModernFrame>;
}
