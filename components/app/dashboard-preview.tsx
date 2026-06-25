import {
  Activity,
  Bell,
  CalendarClock,
  CalendarDays,
  CloudUpload,
  Database,
  Download,
  Handshake,
  PackageCheck,
  Users,
} from "lucide-react";

import { DataTable } from "@/components/app/data-table";
import { ModuleCard } from "@/components/app/module-card";
import { PageShell } from "@/components/app/page-shell";
import { StatCard } from "@/components/app/stat-card";
import { StatusBadge } from "@/components/app/status-badge";
import {
  getDashboardMetrics,
  getDashboardTables,
  getModuleDefinition,
  storageUsage,
} from "@/lib/recruitlook-seed";

const metricIcons = {
  "Today's Events": CalendarDays,
  "Upcoming Events": CalendarClock,
  "Open Assignments": Activity,
  "Recent Uploads": CloudUpload,
  "Pending Deliverables": PackageCheck,
  "Storage Used": Database,
  "Creator Activity": Users,
  "Recent Downloads": Download,
  "Sponsor Deliverables": Handshake,
  "Recent Requests": Bell,
} as const;

const eventColumns = getModuleDefinition("events").columns.slice(0, 6);
const assignmentColumns = getModuleDefinition("assignments").columns.filter((column) =>
  ["title", "event", "creator", "status", "priority"].includes(column.key),
);
const uploadColumns = getModuleDefinition("upload").columns.filter((column) =>
  ["fileName", "creator", "status", "size"].includes(column.key),
);
const deliverableColumns = getModuleDefinition("deliverables").columns.filter((column) =>
  ["title", "dueAt", "status", "priority", "assetCount"].includes(column.key),
);
const requestColumns = getModuleDefinition("requests").columns.filter((column) =>
  ["title", "requester", "dueAt", "status", "priority"].includes(column.key),
);
const notificationColumns = [
  { key: "title", header: "Notification" },
  { key: "type", header: "Type", type: "badge" as const },
  { key: "severity", header: "Severity", type: "status" as const },
];

type DashboardWidgetProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function DashboardWidget({ title, description, children }: DashboardWidgetProps) {
  return (
    <section className="overflow-hidden rounded-[8px] border border-border bg-card">
      <div className="border-b border-border p-5">
        <h2 className="text-base font-bold text-foreground">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

export function DashboardPreview() {
  const metrics = getDashboardMetrics();
  const dashboardTables = getDashboardTables();

  return (
    <PageShell
      eyebrow="RecruitLook Hoops"
      title="RecruitLook Command Center"
      description="A protected operations cockpit for event coverage, creator work orders, media intake, sponsor obligations, request routing, storage health, and delivery risk."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {metrics.map((metric) => (
          <StatCard
            key={metric.label}
            {...metric}
            icon={metricIcons[metric.label as keyof typeof metricIcons]}
          />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <DashboardWidget
          title="Today's Events"
          description="Events actively moving through coverage today."
        >
          <DataTable
            columns={eventColumns}
            rows={dashboardTables.todayEvents}
            minWidth={680}
            surface="embedded"
          />
        </DashboardWidget>
        <DashboardWidget
          title="Upcoming Events"
          description="Locked and planned events that drive upcoming staffing."
        >
          <DataTable
            columns={eventColumns}
            rows={dashboardTables.upcomingEvents}
            minWidth={680}
            surface="embedded"
          />
        </DashboardWidget>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <DashboardWidget
          title="Open Assignments"
          description="Work orders still requiring creator, court, or director action."
        >
          <DataTable
            columns={assignmentColumns}
            rows={dashboardTables.openAssignments}
            minWidth={720}
            surface="embedded"
          />
        </DashboardWidget>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <ModuleCard
            label="Storage Used"
            value={`${storageUsage.usedTb.toFixed(2)} TB`}
            detail={`${storageUsage.mediaCount} media records, ${Math.round(
              (storageUsage.usedTb / storageUsage.totalTb) * 100,
            )}% of tenant allocation`}
            tone="neutral"
          />
          <ModuleCard
            label="Creator Activity"
            value="7 active"
            detail="Confirmed and active creators across capture and edit queues"
            tone="success"
          />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <DashboardWidget
          title="Recent Uploads"
          description="Latest media records staged for processing and routing."
        >
          <DataTable
            columns={uploadColumns}
            rows={dashboardTables.recentUploads}
            minWidth={640}
            surface="embedded"
          />
        </DashboardWidget>
        <DashboardWidget
          title="Pending Deliverables"
          description="Packages in the delivery queue that still need work."
        >
          <DataTable
            columns={deliverableColumns}
            rows={dashboardTables.pendingDeliverables}
            minWidth={680}
            surface="embedded"
          />
        </DashboardWidget>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <DashboardWidget
          title="Sponsor Deliverables"
          description="Partner obligations attached to event media records."
        >
          <DataTable
            columns={deliverableColumns}
            rows={dashboardTables.sponsorDeliverables}
            minWidth={680}
            surface="embedded"
          />
        </DashboardWidget>
        <DashboardWidget
          title="Recent Requests"
          description="Stakeholder requests from parents, coaches, sponsors, scouts, and staff."
        >
          <DataTable
            columns={requestColumns}
            rows={dashboardTables.recentRequests}
            minWidth={680}
            surface="embedded"
          />
        </DashboardWidget>
      </section>

      <DashboardWidget
        title="Notifications"
        description="Operational signals that need awareness or routing."
      >
        <div className="divide-y divide-border">
          {dashboardTables.notifications.map((notification) => (
            <div
              key={notification.id}
              className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_auto_auto] md:items-center"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {notification.values.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {notification.values.body}
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                {notification.values.type}
              </span>
              <StatusBadge status={String(notification.values.severity)} />
            </div>
          ))}
        </div>
        <div className="sr-only">
          <DataTable
            columns={notificationColumns}
            rows={dashboardTables.notifications}
            surface="embedded"
          />
        </div>
      </DashboardWidget>
    </PageShell>
  );
}
