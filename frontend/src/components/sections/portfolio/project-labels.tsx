import { FileImage } from "lucide-react";

import { portfolioPage, type PortfolioProjectStatus } from "@/config/portfolio";

export function ProjectStatusLabel({ status }: { status: PortfolioProjectStatus }) {
  return (
    <span className="type-body-sm inline-flex max-w-full items-center rounded-full border bg-surface px-3 py-1.5 font-medium text-secondary">
      {portfolioPage.statusLabels[status]}
    </span>
  );
}

export function ProjectTypeLabel() {
  return <p lang="en" className="type-body-sm break-words text-muted-foreground">{portfolioPage.projectTypeLabel}</p>;
}

export function ProjectTechnologyTags({ technologies, label }: { technologies: readonly string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex min-w-0 flex-wrap gap-2">
      {technologies.map((technology) => (
        <li key={technology} className="type-body-sm min-w-0 break-words rounded-full border bg-surface px-3 py-2 text-foreground">
          {technology}
        </li>
      ))}
    </ul>
  );
}

/** The initial registry has no approved system images; this is a text state. */
export function ProjectEmptyMedia() {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-lg border bg-surface p-5">
      <FileImage aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-secondary" />
      <p className="type-body-sm min-w-0 text-muted-foreground">{portfolioPage.detail.emptyMedia}</p>
    </div>
  );
}
