import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";

type HeritageSectionProps = Omit<ComponentProps<"section">, "title"> & {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  variant?: "paper" | "surface" | "plain";
};

export function HeritageSection({ id, title, eyebrow, description, children, variant = "paper", className, ...props }: HeritageSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={["htg-section", `htg-section-${variant}`, className].filter(Boolean).join(" ")} {...props}>
      <div className="htg-container">
        <div className="htg-section-heading">
          <div>{eyebrow && <p className="htg-eyebrow" lang="en">{eyebrow}</p>}<h2 id={`${id}-title`}>{title}</h2></div>
          {description && <p className="htg-section-description">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

type HeritageHeroProps = Omit<ComponentProps<"section">, "title"> & {
  title: string;
  description?: string;
  eyebrow?: string;
};

export function HeritageHero({ id = "heritage-hero", title, description, eyebrow, children, className, ...props }: HeritageHeroProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={["htg-hero", className].filter(Boolean).join(" ")} {...props}>
      <div className="htg-container">
        {eyebrow && <p className="htg-eyebrow" lang="en">{eyebrow}</p>}
        <div className={children ? "htg-hero-grid" : "htg-hero-main"}>
          <div className="htg-hero-copy"><h1 id={`${id}-title`}>{title}</h1>{description && <p className="htg-hero-description">{description}</p>}</div>
          {children && <div className="htg-hero-aside">{children}</div>}
        </div>
      </div>
    </section>
  );
}

type HeritageLinkProps = ComponentProps<typeof Link> & { primary?: boolean };

export function HeritageLink({ primary = false, className, children, ...props }: HeritageLinkProps) {
  return <Link className={[primary ? "htg-button" : "htg-link", className].filter(Boolean).join(" ")} {...props}>{children}</Link>;
}

export function HeritageList({ items }: { items: readonly string[] }) {
  return <ul className="htg-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export function HeritageBadge({ children }: { children: ReactNode }) {
  return <span className="htg-badge">{children}</span>;
}

export type { HeritageSectionProps, HeritageHeroProps, HeritageLinkProps };
