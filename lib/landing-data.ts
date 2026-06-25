export const marketingNavItems = [
  { label: "Product", href: "#product" },
  { label: "RecruitLook", href: "#recruitlook" },
  { label: "Security", href: "#security" },
] as const;

export const portalNavItems = [
  "Dashboard",
  "Events",
  "Media Library",
  "Upload Center",
  "Creators",
  "Assignments",
  "Athletes",
  "Schools",
  "Sponsors",
  "Deliverables",
  "Requests",
  "Analytics",
  "Settings",
] as const;

export const dashboardWidgets = [
  {
    title: "Today's Events",
    value: "4",
    meta: "2 live courts active",
    icon: "calendar",
    tone: "volt",
  },
  {
    title: "Upcoming Events",
    value: "5",
    meta: "Next: Chicago Summer Jam",
    icon: "calendarClock",
    tone: "cyan",
  },
  {
    title: "Open Assignments",
    value: "12",
    meta: "7 creator accepts pending",
    icon: "clipboard",
    tone: "red",
  },
  {
    title: "Recent Uploads",
    value: "25",
    meta: "8 files added today",
    icon: "image",
    tone: "cyan",
  },
  {
    title: "Pending Deliverables",
    value: "10",
    meta: "3 sponsor cuts due",
    icon: "package",
    tone: "volt",
  },
  {
    title: "Storage Used",
    value: "1.8 TB",
    meta: "62% of tenant allocation",
    icon: "database",
    tone: "neutral",
  },
  {
    title: "Creator Activity",
    value: "8",
    meta: "5 currently on site",
    icon: "users",
    tone: "cyan",
  },
  {
    title: "Recent Downloads",
    value: "38",
    meta: "Schools pulled 14 packages",
    icon: "download",
    tone: "neutral",
  },
  {
    title: "Sponsor Deliverables",
    value: "6",
    meta: "2 awaiting approval",
    icon: "badge",
    tone: "red",
  },
  {
    title: "Notifications",
    value: "18",
    meta: "5 require director review",
    icon: "bell",
    tone: "volt",
  },
] as const;

export const liveEventRows = [
  {
    event: "RecruitLook Summer Finale",
    location: "Fieldhouse USA",
    status: "Live capture",
    coverage: "8 courts",
  },
  {
    event: "Elite 150 Showcase",
    location: "Wintrust Sports Complex",
    status: "Assignments open",
    coverage: "12 creators",
  },
  {
    event: "Midwest Circuit Session",
    location: "Legacy Center",
    status: "Delivery queue",
    coverage: "214 assets",
  },
] as const;

export const workflowSteps = [
  {
    label: "Events",
    description: "Build the event workspace and schedule coverage.",
  },
  {
    label: "Assignments",
    description: "Match creators to courts, games, and deliverables.",
  },
  {
    label: "Uploads",
    description: "Route footage and photos into tenant-owned storage.",
  },
  {
    label: "Deliverables",
    description: "Package media for teams, athletes, schools, and sponsors.",
  },
  {
    label: "Analytics",
    description: "Track fulfillment, downloads, storage, and activity.",
  },
] as const;
