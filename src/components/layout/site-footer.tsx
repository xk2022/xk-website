import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background py-8">
      <Container className="type-body-sm flex flex-col gap-3 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p lang="en">{siteConfig.name}</p>
        <p>網站建置中 · 探索可能，創造數位價值。</p>
      </Container>
    </footer>
  );
}
