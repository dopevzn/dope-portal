export type StatusTone =
  | "cyan"
  | "destructive"
  | "neutral"
  | "primary"
  | "success"
  | "warning";

export type ModuleId =
  | "events"
  | "media-library"
  | "upload"
  | "creators"
  | "assignments"
  | "athletes"
  | "schools"
  | "sponsors"
  | "deliverables"
  | "requests"
  | "analytics"
  | "settings";

export type TableValue = number | string;

export type ModuleColumn = {
  key: string;
  header: string;
  type?: "badge" | "date" | "mono" | "number" | "status" | "text";
  align?: "left" | "right";
};

export type ModuleRow = {
  id: string;
  values: Record<string, TableValue>;
  filters: Record<string, string>;
  searchText: string;
};

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterDefinition = {
  key: string;
  label: string;
  options: FilterOption[];
};

export type StatSnapshot = {
  label: string;
  value: string;
  detail: string;
  tone: StatusTone;
};

export type ModuleCardData = {
  label: string;
  value: string;
  detail: string;
  tone: StatusTone;
};

export type ModuleChrome = {
  id: ModuleId;
  title: string;
  description: string;
  eyebrow: string;
  filters: FilterDefinition[];
  columns: ModuleColumn[];
  emptyState: {
    title: string;
    description: string;
  };
};

export type ModulePageData = ModuleChrome & {
  stats: StatSnapshot[];
  rows: ModuleRow[];
  cards: ModuleCardData[];
};

export type SearchParamsRecord = Record<string, string | string[] | undefined>;

export const recruitLookTenantSlug = "recruitlook-hoops";

export const recruitLookTenantName = "RecruitLook Hoops";

export function getFirstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function row(
  id: string,
  values: Record<string, TableValue>,
  filters: Record<string, string>,
): ModuleRow {
  return {
    id,
    values,
    filters,
    searchText: Object.values(values).join(" ").toLowerCase(),
  };
}

export function titleCase(value: string | null | undefined) {
  if (!value) {
    return "Unassigned";
  }

  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatShortDate(value: string | null | undefined) {
  if (!value) {
    return "Unscheduled";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function formatShortDateTime(value: string | null | undefined) {
  if (!value) {
    return "Unscheduled";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function bytesToDisplay(bytes: number | null | undefined) {
  const safeBytes = bytes ?? 0;
  const mb = safeBytes / 1024 / 1024;

  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(1)} GB`;
  }

  return `${Math.max(1, Math.round(mb))} MB`;
}

export function tbToDisplay(bytes: number | null | undefined) {
  return `${((bytes ?? 0) / 1024 / 1024 / 1024 / 1024).toFixed(2)} TB`;
}

export function getStatusTone(status: string): StatusTone {
  const normalized = status.toLowerCase();

  if (
    [
      "active",
      "ready",
      "confirmed",
      "verified",
      "live",
      "locked",
      "configured",
      "delivered",
      "completed",
    ].includes(normalized)
  ) {
    return "success";
  }

  if (
    [
      "open",
      "queued",
      "planning",
      "pending",
      "processing",
      "editing",
      "in progress",
      "in review",
      "planned",
    ].includes(normalized)
  ) {
    return "warning";
  }

  if (
    [
      "needs approval",
      "needs review",
      "needs tags",
      "waiting on tags",
      "hold",
      "high",
      "failed",
    ].includes(normalized)
  ) {
    return "destructive";
  }

  if (["draft", "intake", "creator booking", "renewal", "needs key"].includes(normalized)) {
    return "cyan";
  }

  return "neutral";
}

const all = { label: "All", value: "all" };

export const moduleChromeDefinitions: Record<ModuleId, ModuleChrome> = {
  events: {
    id: "events",
    title: "Events",
    eyebrow: "Schedule Operations",
    description:
      "Tournament, showcase, camp, and circuit coverage plans with venue, court, priority, and staffing context.",
    filters: [
      {
        key: "status",
        label: "Status",
        options: [
          all,
          { label: "Live", value: "Live" },
          { label: "Locked", value: "Locked" },
          { label: "Planning", value: "Planning" },
          { label: "Creator Booking", value: "Creator Booking" },
          { label: "Intake", value: "Intake" },
        ],
      },
      {
        key: "priority",
        label: "Priority",
        options: [all, { label: "High", value: "High" }, { label: "Medium", value: "Medium" }],
      },
    ],
    columns: [
      { key: "name", header: "Event" },
      { key: "date", header: "Date", type: "date" },
      { key: "venue", header: "Venue" },
      { key: "courts", header: "Courts" },
      { key: "ageGroups", header: "Ages" },
      { key: "status", header: "Status", type: "status" },
      { key: "priority", header: "Priority", type: "badge" },
    ],
    emptyState: {
      title: "No events match these filters",
      description: "Adjust status, priority, or search terms to find event coverage records.",
    },
  },
  "media-library": {
    id: "media-library",
    title: "Media Library",
    eyebrow: "Asset Operations",
    description:
      "Searchable photo and video metadata staged for tagging, athlete routing, sponsor delivery, and storage migration.",
    filters: [
      {
        key: "status",
        label: "Status",
        options: [
          all,
          { label: "Ready", value: "Ready" },
          { label: "Processing", value: "Processing" },
          { label: "Needs Tags", value: "Needs Tags" },
        ],
      },
      {
        key: "type",
        label: "Type",
        options: [all, { label: "Photo", value: "Photo" }, { label: "Video", value: "Video" }],
      },
    ],
    columns: [
      { key: "fileName", header: "File" },
      { key: "type", header: "Type", type: "badge" },
      { key: "event", header: "Event" },
      { key: "creator", header: "Creator" },
      { key: "status", header: "Status", type: "status" },
      { key: "size", header: "Size", align: "right" },
    ],
    emptyState: {
      title: "No media records match these filters",
      description: "Try another status, file type, or search phrase.",
    },
  },
  upload: {
    id: "upload",
    title: "Upload Center",
    eyebrow: "Ingest Pipeline",
    description:
      "Operational intake queue for creator uploads, file processing, routing checks, and storage readiness.",
    filters: [
      {
        key: "status",
        label: "Status",
        options: [
          all,
          { label: "Ready", value: "Ready" },
          { label: "Processing", value: "Processing" },
          { label: "Needs Tags", value: "Needs Tags" },
        ],
      },
      {
        key: "visibility",
        label: "Routing",
        options: [
          all,
          { label: "Internal", value: "Internal" },
          { label: "Client Library", value: "Client Library" },
        ],
      },
    ],
    columns: [
      { key: "fileName", header: "Batch item" },
      { key: "creator", header: "Source" },
      { key: "uploadedAt", header: "Uploaded", type: "date" },
      { key: "status", header: "Status", type: "status" },
      { key: "visibility", header: "Routing", type: "badge" },
      { key: "size", header: "Size", align: "right" },
    ],
    emptyState: {
      title: "No upload items match these filters",
      description: "Upload records will appear here as creators submit media batches.",
    },
  },
  creators: {
    id: "creators",
    title: "Creators",
    eyebrow: "Contributor Bench",
    description:
      "Photographers, videographers, and editors available for RecruitLook event assignments and delivery work.",
    filters: [
      {
        key: "status",
        label: "Status",
        options: [
          all,
          { label: "Active", value: "Active" },
          { label: "Confirmed", value: "Confirmed" },
          { label: "Pending", value: "Pending" },
          { label: "Hold", value: "Hold" },
        ],
      },
      {
        key: "role",
        label: "Role",
        options: [
          all,
          { label: "Photographer", value: "Photographer" },
          { label: "Videographer", value: "Videographer" },
          { label: "Editor", value: "Editor" },
        ],
      },
    ],
    columns: [
      { key: "name", header: "Creator" },
      { key: "role", header: "Role", type: "badge" },
      { key: "market", header: "Market" },
      { key: "specialties", header: "Specialties" },
      { key: "status", header: "Status", type: "status" },
      { key: "rating", header: "Rating", align: "right" },
    ],
    emptyState: {
      title: "No creators match these filters",
      description: "Change the role, status, or search term to inspect the contributor bench.",
    },
  },
  assignments: {
    id: "assignments",
    title: "Assignments",
    eyebrow: "Coverage Work Orders",
    description:
      "Creator work orders tied to events, courts, capture windows, priorities, and post-production queues.",
    filters: [
      {
        key: "status",
        label: "Status",
        options: [
          all,
          { label: "Live", value: "Live" },
          { label: "Confirmed", value: "Confirmed" },
          { label: "Queued", value: "Queued" },
          { label: "Pending", value: "Pending" },
          { label: "Needs Review", value: "Needs Review" },
          { label: "Draft", value: "Draft" },
        ],
      },
      {
        key: "type",
        label: "Type",
        options: [all, { label: "Photo", value: "Photo" }, { label: "Video", value: "Video" }, { label: "Edit", value: "Edit" }],
      },
    ],
    columns: [
      { key: "title", header: "Assignment" },
      { key: "event", header: "Event" },
      { key: "creator", header: "Creator" },
      { key: "type", header: "Type", type: "badge" },
      { key: "court", header: "Court" },
      { key: "status", header: "Status", type: "status" },
      { key: "priority", header: "Priority", type: "badge" },
    ],
    emptyState: {
      title: "No assignments match these filters",
      description: "Use the status, type, or search controls to locate coverage work orders.",
    },
  },
  athletes: {
    id: "athletes",
    title: "Athletes",
    eyebrow: "Recruiting Profiles",
    description:
      "Athlete records connected to schools, event media, recruiting status, and delivery requests.",
    filters: [
      {
        key: "graduationYear",
        label: "Class",
        options: [all, { label: "2026", value: "2026" }, { label: "2027", value: "2027" }, { label: "2028", value: "2028" }, { label: "2029", value: "2029" }],
      },
      {
        key: "status",
        label: "Status",
        options: [all, { label: "Active", value: "Active" }, { label: "Needs Media", value: "Needs Media" }],
      },
    ],
    columns: [
      { key: "name", header: "Athlete" },
      { key: "school", header: "School" },
      { key: "graduationYear", header: "Class", type: "badge" },
      { key: "position", header: "Position", type: "badge" },
      { key: "recruitingStatus", header: "Recruiting" },
      { key: "profileStatus", header: "Profile", type: "status" },
    ],
    emptyState: {
      title: "No athletes match these filters",
      description: "Adjust class, profile status, or search by name or school.",
    },
  },
  schools: {
    id: "schools",
    title: "Schools",
    eyebrow: "Program Directory",
    description:
      "School and program records that connect athlete profiles, team galleries, coach requests, and media delivery.",
    filters: [
      {
        key: "conference",
        label: "Conference",
        options: [
          all,
          { label: "Public League Red", value: "Public League Red" },
          { label: "Chicago Public", value: "Chicago Public" },
          { label: "Catholic League", value: "Catholic League" },
          { label: "West Suburban", value: "West Suburban" },
        ],
      },
      {
        key: "status",
        label: "Status",
        options: [all, { label: "Verified", value: "Verified" }],
      },
    ],
    columns: [
      { key: "name", header: "School" },
      { key: "city", header: "City" },
      { key: "state", header: "State", type: "badge" },
      { key: "classification", header: "Class" },
      { key: "conference", header: "Conference" },
      { key: "athletes", header: "Athletes", align: "right" },
      { key: "status", header: "Status", type: "status" },
    ],
    emptyState: {
      title: "No schools match these filters",
      description: "Search by school, city, or conference to locate program records.",
    },
  },
  sponsors: {
    id: "sponsors",
    title: "Sponsors",
    eyebrow: "Partner Operations",
    description:
      "Sponsor records connected to contract status, media obligations, branded assets, and deliverable queues.",
    filters: [
      {
        key: "status",
        label: "Status",
        options: [all, { label: "Active", value: "Active" }, { label: "Renewal", value: "Renewal" }],
      },
      {
        key: "tier",
        label: "Tier",
        options: [all, { label: "Premier", value: "Premier" }, { label: "Gold", value: "Gold" }, { label: "Silver", value: "Silver" }, { label: "Community", value: "Community" }],
      },
    ],
    columns: [
      { key: "name", header: "Sponsor" },
      { key: "category", header: "Category" },
      { key: "tier", header: "Tier", type: "badge" },
      { key: "status", header: "Contract", type: "status" },
      { key: "contact", header: "Contact" },
      { key: "deliverablesDue", header: "Due", align: "right" },
    ],
    emptyState: {
      title: "No sponsors match these filters",
      description: "Adjust tier, contract status, or search by sponsor name.",
    },
  },
  deliverables: {
    id: "deliverables",
    title: "Deliverables",
    eyebrow: "Delivery Queue",
    description:
      "Client, athlete, school, event, and sponsor packages tracked by due date, asset count, owner, and approval status.",
    filters: [
      {
        key: "status",
        label: "Status",
        options: [
          all,
          { label: "Planned", value: "Planned" },
          { label: "Queued", value: "Queued" },
          { label: "Editing", value: "Editing" },
          { label: "In Review", value: "In Review" },
          { label: "Needs Approval", value: "Needs Approval" },
        ],
      },
      {
        key: "priority",
        label: "Priority",
        options: [all, { label: "High", value: "High" }, { label: "Medium", value: "Medium" }],
      },
    ],
    columns: [
      { key: "title", header: "Deliverable" },
      { key: "type", header: "Type" },
      { key: "event", header: "Event" },
      { key: "dueAt", header: "Due", type: "date" },
      { key: "status", header: "Status", type: "status" },
      { key: "priority", header: "Priority", type: "badge" },
      { key: "assetCount", header: "Assets", align: "right" },
    ],
    emptyState: {
      title: "No deliverables match these filters",
      description: "Adjust status, priority, or search by package, event, or sponsor.",
    },
  },
  requests: {
    id: "requests",
    title: "Requests",
    eyebrow: "Intake Desk",
    description:
      "Media requests from parents, coaches, sponsors, scouts, and internal staff with routing status and due dates.",
    filters: [
      {
        key: "status",
        label: "Status",
        options: [
          all,
          { label: "Open", value: "Open" },
          { label: "In Progress", value: "In Progress" },
          { label: "Waiting On Tags", value: "Waiting On Tags" },
        ],
      },
      {
        key: "requesterType",
        label: "Requester",
        options: [all, { label: "Parent", value: "Parent" }, { label: "Coach", value: "Coach" }, { label: "Sponsor", value: "Sponsor" }, { label: "Scout", value: "Scout" }, { label: "Staff", value: "Staff" }],
      },
    ],
    columns: [
      { key: "title", header: "Request" },
      { key: "requester", header: "Requester" },
      { key: "requesterType", header: "Type", type: "badge" },
      { key: "event", header: "Event" },
      { key: "dueAt", header: "Due", type: "date" },
      { key: "status", header: "Status", type: "status" },
      { key: "priority", header: "Priority", type: "badge" },
    ],
    emptyState: {
      title: "No requests match these filters",
      description: "Adjust requester, status, or search by title, event, or contact.",
    },
  },
  analytics: {
    id: "analytics",
    title: "Analytics",
    eyebrow: "Operational Intelligence",
    description:
      "RecruitLook media operations health across coverage, creator throughput, sponsor delivery, storage, and request SLA.",
    filters: [
      {
        key: "area",
        label: "Area",
        options: [all, { label: "Events", value: "Events" }, { label: "Creators", value: "Creators" }, { label: "Sponsors", value: "Sponsors" }, { label: "Storage", value: "Storage" }],
      },
    ],
    columns: [
      { key: "metric", header: "Metric" },
      { key: "area", header: "Area", type: "badge" },
      { key: "current", header: "Current" },
      { key: "target", header: "Target" },
      { key: "status", header: "Status", type: "status" },
      { key: "owner", header: "Owner" },
    ],
    emptyState: {
      title: "No analytics rows match these filters",
      description: "Adjust the operational area or search by metric owner.",
    },
  },
  settings: {
    id: "settings",
    title: "Settings",
    eyebrow: "Tenant Controls",
    description:
      "RecruitLook workspace configuration for organization metadata, roles, storage posture, audit readiness, and integrations.",
    filters: [
      {
        key: "status",
        label: "Status",
        options: [all, { label: "Configured", value: "Configured" }, { label: "Ready", value: "Ready" }, { label: "Needs Key", value: "Needs Key" }],
      },
      {
        key: "domain",
        label: "Domain",
        options: [all, { label: "Organization", value: "Organization" }, { label: "Access", value: "Access" }, { label: "Storage", value: "Storage" }, { label: "Audit", value: "Audit" }],
      },
    ],
    columns: [
      { key: "setting", header: "Setting" },
      { key: "domain", header: "Domain", type: "badge" },
      { key: "value", header: "Value" },
      { key: "owner", header: "Owner" },
      { key: "status", header: "Status", type: "status" },
    ],
    emptyState: {
      title: "No settings match these filters",
      description: "Adjust domain, status, or search by configuration owner.",
    },
  },
};

export function getModuleChrome(moduleId: ModuleId) {
  return moduleChromeDefinitions[moduleId];
}

export function applyModuleFilters(rows: ModuleRow[], searchParams: SearchParamsRecord = {}) {
  const searchQuery = getFirstParam(searchParams.q)?.toLowerCase().trim() ?? "";

  return rows.filter((moduleRow) => {
    const matchesSearch = searchQuery
      ? moduleRow.searchText.includes(searchQuery)
      : true;

    const matchesFilters = Object.entries(searchParams).every(([key, value]) => {
      if (key === "q") {
        return true;
      }

      const firstValue = getFirstParam(value) ?? "all";
      return firstValue === "all" || moduleRow.filters[key] === firstValue;
    });

    return matchesSearch && matchesFilters;
  });
}
