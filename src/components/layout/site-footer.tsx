import Link from "next/link";

import { XkLogo } from "@/components/brand/xk-logo";
import { Container } from "@/components/layout/container";
import { collectionNavigation } from "@/config/design-collection-navigation";
import { services } from "@/config/homepage";
import { contactNavigation, primaryNavigation, quotationNavigation } from "@/config/navigation";
import { portfolioProjects } from "@/config/portfolio";
import { siteConfig } from "@/config/site";
import { brandWebsiteShowcases, showcaseDetailPath } from "@/config/website-showcases";
import { isPrivacyPolicyPublished } from "@/lib/privacy-publication";

const footerLinkStyles =
  "inline-flex min-h-11 items-center rounded-sm text-primary-foreground/80 transition-colors duration-brand ease-brand hover:text-primary-foreground motion-reduce:transition-none";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground [&_a:focus-visible]:outline-primary-foreground">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.4fr] lg:gap-12">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex min-h-11 max-w-full items-center gap-3 rounded-sm"
            >
              <XkLogo size={48} variant="white" showWordmark={false} decorative />
              <span lang="en" className="type-body font-semibold">
                {siteConfig.name}
              </span>
              <span className="sr-only">首頁，Logo 為暫定版本</span>
            </Link>
            <p lang="en" className="type-body-lg mt-5 max-w-xs text-primary-foreground/90">
              {siteConfig.slogan}
            </p>
            <p className="type-body-sm mt-5 max-w-xs text-primary-foreground/75">
              整合 Web、Java 與 AI 技術，探索企業的數位可能。
            </p>
          </div>

          <nav aria-label="頁尾導覽">
            <h2 className="type-body mb-4 font-semibold">網站目錄</h2>
            <ul className="type-body-sm space-y-1">
              {primaryNavigation.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={footerLinkStyles}>{label}</Link>
                </li>
              ))}
              <li>
                <Link href={contactNavigation.href} className={footerLinkStyles}>
                  {contactNavigation.label}
                </Link>
              </li>
              <li><Link href={quotationNavigation.href} className={footerLinkStyles}>{quotationNavigation.label}</Link></li>
              <li><Link href={collectionNavigation.href} className={footerLinkStyles}>{collectionNavigation.label}</Link></li>
              {portfolioProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    lang="en"
                    className={`${footerLinkStyles} max-w-full break-words`}
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
              {brandWebsiteShowcases.filter((showcase) => showcase.detail && showcase.href).map((showcase) => (
                <li key={showcase.id}>
                  <Link href={showcaseDetailPath(showcase.id)} className={`${footerLinkStyles} max-w-full break-words`}>
                    {showcase.title}｜作品介紹
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="服務分類">
            <h2 className="type-body mb-4 font-semibold">服務分類</h2>
            <ul className="type-body-sm space-y-1">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href={`/#service-${service.anchor}`} className={footerLinkStyles}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="type-body-sm mt-12 flex flex-col gap-4 border-t border-primary-foreground/20 pt-6 text-primary-foreground/65 sm:flex-row sm:items-center sm:justify-between">
          <p lang="en">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          {isPrivacyPolicyPublished() ? (
            <Link href="/privacy" className={footerLinkStyles}>隱私權政策</Link>
          ) : (
            <p>隱私權政策（待確認）</p>
          )}
        </div>
      </Container>
    </footer>
  );
}
