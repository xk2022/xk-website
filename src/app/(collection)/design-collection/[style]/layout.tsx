import type { ReactNode } from "react";

// Pages own their frames. Root 404 must never inherit a second header/main/footer.
export const dynamicParams = false;
export function generateStaticParams() { return [{ style: "heritage" }, { style: "luxury" }]; }
export default function DesignStyleLayout({ children }: { children: ReactNode }) { return children; }
