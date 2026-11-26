import type { ReactNode } from "react";

// The page owns its complete frame. Unknown routes use the existing root 404
// without inheriting a second Header, main or Footer.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ style: "heritage" }];
}

export default function DesignStyleLayout({ children }: { children: ReactNode }) {
  return children;
}
