import { Badge } from "@/components/ui/badge";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div className="max-w-3xl">
        {eyebrow ? <Badge variant="cyan">{eyebrow}</Badge> : null}
        <h1 className="mt-3 text-3xl font-black leading-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2">{action}</div> : null}
    </div>
  );
}
