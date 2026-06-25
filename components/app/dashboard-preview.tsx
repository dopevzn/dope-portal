import { Activity, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { recruitLookActivity, recruitLookMetrics } from "@/lib/recruitlook-seed";
import { cn } from "@/lib/utils";

const metricToneClassNames = {
  cyan: "border-[rgba(77,219,255,0.32)] bg-[rgba(77,219,255,0.09)] text-[rgb(116,232,255)]",
  neutral: "border-border bg-secondary text-muted-foreground",
  primary: "border-primary/35 bg-primary/10 text-primary",
  red: "border-destructive/35 bg-destructive/10 text-destructive",
} as const;

export function DashboardPreview() {
  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-[8px] border border-border bg-card p-5 shadow-[0_24px_90px_rgba(0,0,0,0.3)] lg:p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase text-primary">
              RecruitLook Hoops
            </p>
            <h1 className="mt-2 text-3xl font-black leading-tight text-foreground sm:text-4xl">
              Welcome to RecruitLook Command Center
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Authenticated media operations will start here: event coverage,
              creator assignments, upload tracking, delivery queues, and tenant
              storage health.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>Protected route</Badge>
            <Badge variant="outline">Mock data</Badge>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recruitLookMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <Card key={metric.title}>
              <CardHeader className="flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle>{metric.title}</CardTitle>
                  <CardDescription>{metric.detail}</CardDescription>
                </div>
                <div
                  className={cn(
                    "grid size-10 place-items-center rounded-[8px] border",
                    metricToneClassNames[metric.tone],
                  )}
                >
                  <Icon className="size-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-4">
                  <p className="text-4xl font-black leading-none text-foreground">
                    {metric.value}
                  </p>
                  <Badge variant={metric.tone === "red" ? "destructive" : "secondary"}>
                    {metric.trend}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardHeader className="flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>Operational activity</CardTitle>
              <CardDescription>
                Recent RecruitLook movement from assignments, uploads, and delivery.
              </CardDescription>
            </div>
            <Activity className="size-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border rounded-[8px] border border-border">
              {recruitLookActivity.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.status}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Next milestone surface</CardTitle>
            <CardDescription>
              Events, media library, uploads, and creator assignment modules will
              connect to this shell without replacing the authenticated layout.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-[8px] border border-border bg-background/70 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">App foundation</p>
                <ArrowUpRight className="size-4 text-primary" />
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[18%] rounded-full bg-primary" />
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Auth, protected routing, tenant shell, and dashboard placeholder
                are in place for RecruitLook.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
