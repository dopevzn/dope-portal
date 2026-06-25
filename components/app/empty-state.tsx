import type { LucideIcon } from "lucide-react";
import { SearchX } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

export function EmptyState({
  title,
  description,
  icon: Icon = SearchX,
}: EmptyStateProps) {
  return (
    <div className="grid min-h-[260px] place-items-center rounded-[8px] border border-dashed border-border bg-card/70 p-8 text-center">
      <div className="mx-auto max-w-md">
        <div className="mx-auto grid size-12 place-items-center rounded-[8px] border border-border bg-background text-primary">
          <Icon className="size-5" />
        </div>
        <h2 className="mt-5 text-lg font-bold text-foreground">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
