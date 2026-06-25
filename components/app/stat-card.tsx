import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { StatusTone } from "@/lib/app-modules";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  detail: string;
  tone?: StatusTone;
  icon?: LucideIcon;
};

const toneClassNames: Record<StatusTone, string> = {
  cyan: "border-[rgba(77,219,255,0.32)] bg-[rgba(77,219,255,0.08)] text-[rgb(116,232,255)]",
  destructive:
    "border-destructive/35 bg-destructive/10 text-destructive",
  neutral: "border-border bg-secondary text-muted-foreground",
  primary: "border-primary/35 bg-primary/10 text-primary",
  success:
    "border-[rgba(62,221,132,0.34)] bg-[rgba(62,221,132,0.08)] text-[rgb(115,240,169)]",
  warning:
    "border-[rgba(255,198,80,0.35)] bg-[rgba(255,198,80,0.08)] text-[rgb(255,211,117)]",
};

export function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "neutral",
}: StatCardProps) {
  return (
    <Card className="min-h-[150px]">
      <CardContent className="flex h-full flex-col justify-between gap-5 p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold text-muted-foreground">{label}</p>
          {Icon ? (
            <span
              className={cn(
                "grid size-9 place-items-center rounded-[8px] border",
                toneClassNames[tone],
              )}
            >
              <Icon className="size-4" />
            </span>
          ) : null}
        </div>
        <div>
          <p className="text-3xl font-black leading-none text-foreground">
            {value}
          </p>
          <p className="mt-2 text-sm leading-5 text-muted-foreground">{detail}</p>
        </div>
      </CardContent>
    </Card>
  );
}
