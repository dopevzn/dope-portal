import { Card, CardContent } from "@/components/ui/card";
import type { ModuleCardData } from "@/lib/recruitlook-seed";
import { cn } from "@/lib/utils";

type ModuleCardProps = ModuleCardData;

const toneClassNames: Record<ModuleCardData["tone"], string> = {
  cyan: "text-[rgb(116,232,255)]",
  destructive: "text-destructive",
  neutral: "text-muted-foreground",
  primary: "text-primary",
  success: "text-[rgb(115,240,169)]",
  warning: "text-[rgb(255,211,117)]",
};

export function ModuleCard({ label, value, detail, tone }: ModuleCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>
        <p className={cn("mt-4 text-3xl font-black leading-none", toneClassNames[tone])}>
          {value}
        </p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}
