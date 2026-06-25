import { cn } from "@/lib/utils";

type BrandMarkProps = {
  compact?: boolean;
  className?: string;
};

export function BrandMark({ compact = false, className }: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="grid size-10 place-items-center rounded-[8px] border border-primary/35 bg-primary text-primary-foreground shadow-[0_0_30px_rgba(216,255,66,0.22)]">
        <span className="text-sm font-black leading-none tracking-normal">DP</span>
      </div>
      {!compact ? (
        <div className="flex flex-col">
          <span className="text-sm font-black uppercase leading-none text-foreground">
            DOPE
          </span>
          <span className="text-xs font-semibold uppercase leading-none text-muted-foreground">
            Portal
          </span>
        </div>
      ) : null}
    </div>
  );
}
