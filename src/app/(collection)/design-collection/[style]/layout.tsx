import type { ReactNode } from "react";

// Each page owns its frame; root 404 must not inherit another main/header/footer.
export const dynamicParams = false;
export function generateStaticParams() { return [{ style: "luxury" }]; }
export default function DesignStyleLayout({ children }: { children: ReactNode }) { return children; }
