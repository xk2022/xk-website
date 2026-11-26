import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";

type LuxuryHeroProps = Omit<ComponentProps<"section">, "title"> & {
  title: string;
  titleLang?: string;
  eyebrow?: string;
  description?: string;
};

export function LuxuryHero({ id = "luxury-hero", title, titleLang, eyebrow, description, children, className, ...props }: LuxuryHeroProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={["lx-hero", className].filter(Boolean).join(" ")} {...props}>
      <div className="lx-container">
        <span className="lx-accent-rule" aria-hidden="true" />
        {eyebrow && <p className="lx-eyebrow" lang="en">{eyebrow}</p>}
        <h1 id={`${id}-title`} lang={titleLang}>{title}</h1>
        {description && <p className="lx-hero-description">{description}</p>}
        {children && <div className="lx-hero-content">{children}</div>}
      </div>
    </section>
  );
}

type LuxurySectionProps = Omit<ComponentProps<"section">, "title"> & {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
};

export function LuxurySection({ id, title, eyebrow, description, children, className, ...props }: LuxurySectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={["lx-section", className].filter(Boolean).join(" ")} {...props}>
      <div className="lx-container">
        <div className="lx-section-heading">
          {eyebrow && <p className="lx-eyebrow" lang="en">{eyebrow}</p>}
          <h2 id={`${id}-title`}>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

type LuxuryLinkProps = ComponentProps<typeof Link> & { variant?: "button" | "text" };

export function LuxuryLink({ children, variant = "text", className, ...props }: LuxuryLinkProps) {
  return <Link className={[variant === "button" ? "lx-button" : "lx-link", className].filter(Boolean).join(" ")} {...props}>{children}</Link>;
}

export function LuxuryBadge({ children }: { children: ReactNode }) {
  return <span className="lx-badge">{children}</span>;
}

type LuxuryDisclosureProps = Omit<ComponentProps<"details">, "title"> & { title: ReactNode };

export function LuxuryDisclosure({ title, children, className, ...props }: LuxuryDisclosureProps) {
  return <details className={["lx-disclosure", className].filter(Boolean).join(" ")} {...props}><summary>{title}</summary><div className="lx-disclosure-body">{children}</div></details>;
}

export type { LuxuryHeroProps, LuxurySectionProps, LuxuryLinkProps, LuxuryDisclosureProps };
