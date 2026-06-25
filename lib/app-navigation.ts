import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  Camera,
  ClipboardList,
  CloudUpload,
  GraduationCap,
  Handshake,
  Images,
  LayoutDashboard,
  PackageCheck,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

export type AppNavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const appNavigationItems: AppNavigationItem[] = [
  { label: "Dashboard", href: "/app", icon: LayoutDashboard },
  { label: "Events", href: "/app/events", icon: CalendarDays },
  { label: "Media Library", href: "/app/media-library", icon: Images },
  { label: "Upload Center", href: "/app/upload-center", icon: CloudUpload },
  { label: "Creators", href: "/app/creators", icon: Camera },
  { label: "Assignments", href: "/app/assignments", icon: ClipboardList },
  { label: "Athletes", href: "/app/athletes", icon: Users },
  { label: "Schools", href: "/app/schools", icon: GraduationCap },
  { label: "Sponsors", href: "/app/sponsors", icon: Handshake },
  { label: "Deliverables", href: "/app/deliverables", icon: PackageCheck },
  { label: "Requests", href: "/app/requests", icon: Bell },
  { label: "Analytics", href: "/app/analytics", icon: BarChart3 },
  { label: "Settings", href: "/app/settings", icon: Settings },
];

export const tenantSwitcher = {
  name: "RecruitLook Hoops",
  label: "Primary tenant",
  status: "Live workspace",
  icon: Building2,
  trustIcon: ShieldCheck,
} as const;
