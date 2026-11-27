import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

/** Content only: the owning route boundary supplies exactly one frame. */
export function ModernNotFound() {
  return (
    <Section aria-labelledby="not-found-title">
      <Container>
        <p className="type-body-sm font-semibold text-secondary" lang="en">404 — Page not found</p>
        <h1 id="not-found-title" className="type-h1 mt-4">找不到此頁面</h1>
        <p className="type-body mt-6 max-w-2xl text-muted-foreground">
          此網址目前沒有可瀏覽的頁面。您可以返回首頁，或從網站目錄找到已提供的內容。
        </p>
        <div className="mt-8">
          <Button asChild><Link href="/modern">返回首頁</Link></Button>
        </div>
      </Container>
    </Section>
  );
}
