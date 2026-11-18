import Link from "next/link";

import { XkLogo } from "@/components/brand/xk-logo";
import { Container } from "@/components/layout/container";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Button } from "@/components/ui/button";
import { contactNavigation, primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="relative z-40 border-b bg-background">
      <Container className="flex min-h-20 items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="flex min-h-11 min-w-0 items-center gap-2 rounded-sm text-primary sm:gap-3"
        >
          <XkLogo
            size={48}
            showWordmark={false}
            decorative
            className="sm:w-14"
          />
          <span
            lang="en"
            className="max-w-36 text-sm leading-tight font-semibold sm:max-w-none sm:text-base"
          >
            {siteConfig.name}
          </span>
          <span className="sr-only">首頁，Logo 為暫定版本</span>
        </Link>

        <nav aria-label="主要導覽" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-3">
            {primaryNavigation.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="type-body-sm inline-flex min-h-11 items-center rounded-sm px-3 font-medium text-foreground transition-colors duration-brand ease-brand hover:bg-surface hover:text-secondary motion-reduce:transition-none"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button asChild size="sm" className="hidden lg:inline-flex">
          <Link href={contactNavigation.href}>{contactNavigation.label}</Link>
        </Button>
        <MobileNavigation />
      </Container>
    </header>
  );
}
