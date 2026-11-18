import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id: string;
  title: string;
  description: string;
  eyebrow?: string;
  className?: string;
};

export function SectionHeading({
  id,
  title,
  description,
  eyebrow,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 max-w-3xl space-y-4 sm:mb-12", className)}>
      {eyebrow && (
        <p lang="en" className="type-caption font-semibold text-secondary">
          {eyebrow}
        </p>
      )}
      <h2 id={id} lang="en" className="type-h2 break-words text-primary">
        {title}
      </h2>
      <p className="type-body-lg text-muted-foreground">{description}</p>
    </div>
  );
}
