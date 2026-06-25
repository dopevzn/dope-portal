import type { LucideIcon } from "lucide-react";
import {
  CalendarClock,
  CalendarDays,
  CloudUpload,
  Database,
  PackageCheck,
  ClipboardList,
} from "lucide-react";

export type RecruitLookMetric = {
  title: string;
  value: string;
  detail: string;
  trend: string;
  icon: LucideIcon;
  tone: "primary" | "cyan" | "red" | "neutral";
};

export const recruitLookMetrics: RecruitLookMetric[] = [
  {
    title: "Today's Events",
    value: "4",
    detail: "Fieldhouse USA and Wintrust courts active",
    trend: "2 live now",
    icon: CalendarDays,
    tone: "primary",
  },
  {
    title: "Upcoming Events",
    value: "5",
    detail: "Next: Chicago Summer Jam",
    trend: "14 days out",
    icon: CalendarClock,
    tone: "cyan",
  },
  {
    title: "Open Assignments",
    value: "12",
    detail: "Creator accepts and court locks pending",
    trend: "7 need action",
    icon: ClipboardList,
    tone: "red",
  },
  {
    title: "Recent Uploads",
    value: "25",
    detail: "Photos and video clips routed today",
    trend: "8 new files",
    icon: CloudUpload,
    tone: "cyan",
  },
  {
    title: "Pending Deliverables",
    value: "10",
    detail: "Team, athlete, and sponsor packages queued",
    trend: "3 due soon",
    icon: PackageCheck,
    tone: "primary",
  },
  {
    title: "Storage Used",
    value: "1.8 TB",
    detail: "Current RecruitLook media allocation",
    trend: "62% used",
    icon: Database,
    tone: "neutral",
  },
];

export const recruitLookActivity = [
  {
    label: "Summer Finale coverage plan",
    status: "Ready for director review",
    time: "8 min ago",
  },
  {
    label: "Elite 150 creator assignments",
    status: "7 creators pending confirmation",
    time: "24 min ago",
  },
  {
    label: "Sponsor highlight package",
    status: "Awaiting final media selection",
    time: "1 hr ago",
  },
] as const;
