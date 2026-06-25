import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BadgeCheck,
  Bell,
  CalendarClock,
  CalendarDays,
  ClipboardList,
  Database,
  Download,
  ImageIcon,
  PackageCheck,
  Search,
  UploadCloud,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  dashboardWidgets,
  liveEventRows,
  portalNavItems,
} from "@/lib/landing-data";
import { cn } from "@/lib/utils";

type WidgetIcon = (typeof dashboardWidgets)[number]["icon"];
type WidgetTone = (typeof dashboardWidgets)[number]["tone"];

const iconMap: Record<WidgetIcon, LucideIcon> = {
  badge: BadgeCheck,
  bell: Bell,
  calendar: CalendarDays,
  calendarClock: CalendarClock,
  clipboard: ClipboardList,
  database: Database,
  download: Download,
  image: ImageIcon,
  package: PackageCheck,
  users: Users,
};

const toneClassNames: Record<WidgetTone, string> = {
  cyan: "border-[rgba(77,219,255,0.26)] bg-[rgba(77,219,255,0.08)] text-[rgb(116,232,255)]",
  neutral: "border-border bg-secondary text-muted-foreground",
  red: "border-destructive/30 bg-destructive/10 text-destructive",
  volt: "border-primary/30 bg-primary/10 text-primary",
};

export function PortalPreview() {
  return (
    <div
      id="product"
      className="relative overflow-hidden rounded-[8px] border border-border bg-card shadow-[0_32px_110px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-destructive" />
          <span className="size-2 rounded-full bg-primary" />
          <span className="size-2 rounded-full bg-[rgb(77,219,255)]" />
        </div>
        <div className="hidden items-center gap-2 rounded-[8px] border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground sm:flex">
          <Search className="size-3.5" />
          Search events, athletes, media
        </div>
        <Badge variant="cyan">RecruitLook Hoops</Badge>
      </div>
      <div className="grid min-h-[570px] lg:grid-cols-[190px_1fr]">
        <aside className="hidden border-r border-border bg-background/62 p-3 lg:block">
          <div className="mb-4 flex items-center gap-2 px-2 py-2">
            <div className="grid size-8 place-items-center rounded-[7px] bg-primary text-xs font-black text-primary-foreground">
              RL
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                RecruitLook
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Media Director
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-1" aria-label="Portal preview">
            {portalNavItems.map((item) => (
              <div
                key={item}
                className={cn(
                  "rounded-[7px] px-2.5 py-2 text-xs font-semibold text-muted-foreground",
                  item === "Dashboard" &&
                    "bg-primary text-primary-foreground shadow-[0_0_22px_rgba(216,255,66,0.12)]",
                )}
              >
                {item}
              </div>
            ))}
          </nav>
        </aside>
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-4 py-4 md:px-5">
            <div>
              <p className="text-xs font-bold uppercase text-primary">
                Tenant command center
              </p>
              <h2 className="mt-1 text-xl font-semibold leading-7 text-foreground">
                RecruitLook Hoops dashboard
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Badge>Live ops</Badge>
              <Badge variant="outline">June 2026</Badge>
            </div>
          </div>
          <div className="grid gap-3 p-4 md:grid-cols-2 md:p-5 xl:grid-cols-5">
            {dashboardWidgets.map((widget) => {
              const Icon = iconMap[widget.icon];

              return (
                <div
                  key={widget.title}
                  className="rounded-[8px] border border-border bg-background/76 p-3"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div
                      className={cn(
                        "grid size-9 place-items-center rounded-[7px] border",
                        toneClassNames[widget.tone],
                      )}
                    >
                      <Icon className="size-4" />
                    </div>
                    <Activity className="size-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {widget.title}
                  </p>
                  <p className="mt-1 text-2xl font-semibold leading-none text-foreground">
                    {widget.value}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {widget.meta}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="grid gap-4 border-t border-border p-4 md:grid-cols-[1.4fr_0.8fr] md:p-5">
            <div className="overflow-hidden rounded-[8px] border border-border bg-background/76">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Event coverage queue
                </h3>
                <Badge variant="secondary">3 priority lanes</Badge>
              </div>
              <div className="divide-y divide-border">
                {liveEventRows.map((row) => (
                  <div
                    key={row.event}
                    className="grid gap-2 px-4 py-3 text-sm sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">{row.event}</p>
                      <p className="text-muted-foreground">{row.location}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-[rgb(116,232,255)]">{row.status}</p>
                      <p className="text-muted-foreground">{row.coverage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[8px] border border-border bg-background/76 p-4">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Upload center
                </h3>
                <UploadCloud className="size-4 text-primary" />
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[62%] rounded-full bg-primary" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Metric label="Processed" value="1,284" />
                <Metric label="Queued" value="146" />
                <Metric label="Sponsors" value="6" />
                <Metric label="Schools" value="10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[7px] border border-border bg-secondary/55 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold leading-none text-foreground">
        {value}
      </p>
    </div>
  );
}
