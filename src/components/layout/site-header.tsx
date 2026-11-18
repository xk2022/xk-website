import Link from "next/link";

import { Container } from "@/components/layout/container";
import { primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="border-b bg-background">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-5">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-3 rounded-sm text-primary"
        >
          {/* Provisional text treatment; this is not an approved brand logo. */}
          <span
            className="flex size-11 items-center justify-center border-2 border-primary text-lg font-bold tracking-tight"
          >
            {siteConfig.abbreviation}
          </span>
          <span lang="en" className="text-sm font-semibold sm:text-base">
            {siteConfig.name}
          </span>
          <span className="sr-only">首頁</span>
        </Link>
        <nav aria-label="主要導覽">
          <ul className="flex flex-wrap gap-1 sm:gap-4">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-sm px-3 text-sm font-medium text-foreground hover:bg-surface hover:text-secondary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
