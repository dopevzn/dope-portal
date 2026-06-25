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

export type ModuleDefinition = {
  id: ModuleId;
  title: string;
  description: string;
  eyebrow: string;
  stats: StatSnapshot[];
  filters: FilterDefinition[];
  columns: ModuleColumn[];
  rows: ModuleRow[];
  cards: ModuleCardData[];
  emptyState: {
    title: string;
    description: string;
  };
};

export type SearchParamsRecord = Record<string, string | string[] | undefined>;

export const recruitLookOrganization = {
  id: "11111111-1111-4111-8111-111111111111",
  name: "RecruitLook Hoops",
  slug: "recruitlook-hoops",
  timezone: "America/Chicago",
  storageLimitTb: 3,
} as const;

export const venues = [
  {
    id: "venue-fieldhouse",
    name: "Fieldhouse USA Frisco",
    city: "Frisco",
    state: "TX",
    courts: 12,
  },
  {
    id: "venue-wintrust",
    name: "Wintrust Sports Complex",
    city: "Bedford Park",
    state: "IL",
    courts: 8,
  },
  {
    id: "venue-legacy",
    name: "Legacy Center",
    city: "Brighton",
    state: "MI",
    courts: 6,
  },
  {
    id: "venue-louisville",
    name: "Louisville Expo Center",
    city: "Louisville",
    state: "KY",
    courts: 10,
  },
  {
    id: "venue-pace",
    name: "PACE Athletic Center",
    city: "Kansas City",
    state: "MO",
    courts: 7,
  },
] as const;

export const events = [
  {
    id: "event-summer-showcase",
    name: "RecruitLook Summer Showcase",
    type: "Showcase",
    venueId: "venue-wintrust",
    startsAt: "2026-06-25T09:00:00-05:00",
    endsAt: "2026-06-25T20:00:00-05:00",
    status: "Live",
    priority: "High",
    courts: "Courts 1-8",
    ageGroups: "15U, 16U, 17U",
  },
  {
    id: "event-elite-150",
    name: "Elite 150 Midwest",
    type: "Camp",
    venueId: "venue-legacy",
    startsAt: "2026-06-27T08:30:00-04:00",
    endsAt: "2026-06-28T17:00:00-04:00",
    status: "Locked",
    priority: "High",
    courts: "Courts 1-6",
    ageGroups: "2027, 2028, 2029",
  },
  {
    id: "event-chicago-jam",
    name: "Chicago Summer Jam",
    type: "Tournament",
    venueId: "venue-wintrust",
    startsAt: "2026-07-10T09:00:00-05:00",
    endsAt: "2026-07-12T19:00:00-05:00",
    status: "Planning",
    priority: "High",
    courts: "Courts 1-8",
    ageGroups: "14U-17U",
  },
  {
    id: "event-bluegrass",
    name: "Bluegrass Tip-Off",
    type: "Tournament",
    venueId: "venue-louisville",
    startsAt: "2026-07-18T08:00:00-04:00",
    endsAt: "2026-07-19T18:00:00-04:00",
    status: "Creator booking",
    priority: "Medium",
    courts: "Courts A-J",
    ageGroups: "16U, 17U",
  },
  {
    id: "event-heartland",
    name: "Heartland Prospect Circuit",
    type: "Circuit",
    venueId: "venue-pace",
    startsAt: "2026-08-01T08:00:00-05:00",
    endsAt: "2026-08-02T18:00:00-05:00",
    status: "Intake",
    priority: "Medium",
    courts: "Courts 1-7",
    ageGroups: "15U-17U",
  },
] as const;

export const schools = [
  ["school-lane-tech", "Lane Tech", "Chicago", "IL", "Public League Red"],
  ["school-simeon", "Simeon Career Academy", "Chicago", "IL", "Chicago Public"],
  ["school-curie", "Curie Metro", "Chicago", "IL", "Chicago Public"],
  ["school-belleville", "Belleville East", "Belleville", "IL", "Southwestern"],
  ["school-bloom", "Bloom Township", "Chicago Heights", "IL", "Southland"],
  ["school-oak-park", "Oak Park River Forest", "Oak Park", "IL", "West Suburban"],
  ["school-depaul-prep", "DePaul College Prep", "Chicago", "IL", "Catholic League"],
  ["school-glenbard", "Glenbard West", "Glen Ellyn", "IL", "West Suburban"],
  ["school-evanston", "Evanston Township", "Evanston", "IL", "Central Suburban"],
  ["school-brother-rice", "Brother Rice", "Chicago", "IL", "Catholic League"],
].map(([id, name, city, state, conference]) => ({
  id,
  name,
  city,
  state,
  conference,
  classification: "IHSA 4A",
  status: "Verified",
}));

export const athletes = [
  ["athlete-jalen-brooks", "Jalen", "Brooks", "school-lane-tech", "2027", "PG", "Offered"],
  ["athlete-marcus-ellis", "Marcus", "Ellis", "school-simeon", "2026", "SG", "Watchlist"],
  ["athlete-darius-king", "Darius", "King", "school-curie", "2028", "SF", "Evaluation"],
  ["athlete-cam-porter", "Cam", "Porter", "school-belleville", "2027", "PF", "Offered"],
  ["athlete-tyrese-hill", "Tyrese", "Hill", "school-bloom", "2026", "C", "Committed"],
  ["athlete-noah-williams", "Noah", "Williams", "school-oak-park", "2028", "PG", "Watchlist"],
  ["athlete-elijah-gray", "Elijah", "Gray", "school-depaul-prep", "2027", "SG", "Offered"],
  ["athlete-miles-avery", "Miles", "Avery", "school-glenbard", "2026", "SF", "Evaluation"],
  ["athlete-kai-thompson", "Kai", "Thompson", "school-evanston", "2029", "PG", "Watchlist"],
  ["athlete-jordan-reed", "Jordan", "Reed", "school-brother-rice", "2027", "PF", "Offered"],
  ["athlete-malachi-price", "Malachi", "Price", "school-lane-tech", "2028", "SG", "Evaluation"],
  ["athlete-jaylen-stone", "Jaylen", "Stone", "school-simeon", "2026", "PG", "Committed"],
  ["athlete-isaiah-cross", "Isaiah", "Cross", "school-curie", "2027", "C", "Watchlist"],
  ["athlete-zion-mason", "Zion", "Mason", "school-belleville", "2028", "SF", "Evaluation"],
  ["athlete-carter-finn", "Carter", "Finn", "school-bloom", "2027", "SG", "Offered"],
  ["athlete-lamar-hayes", "Lamar", "Hayes", "school-oak-park", "2026", "PF", "Watchlist"],
  ["athlete-kenji-ross", "Kenji", "Ross", "school-depaul-prep", "2028", "PG", "Evaluation"],
  ["athlete-omar-davis", "Omar", "Davis", "school-glenbard", "2027", "C", "Offered"],
  ["athlete-terrell-wade", "Terrell", "Wade", "school-evanston", "2026", "SF", "Committed"],
  ["athlete-micah-bell", "Micah", "Bell", "school-brother-rice", "2029", "SG", "Watchlist"],
].map(([id, firstName, lastName, schoolId, graduationYear, position, recruitingStatus], index) => ({
  id,
  firstName,
  lastName,
  schoolId,
  graduationYear,
  position,
  recruitingStatus,
  profileStatus: index % 4 === 0 ? "Needs media" : "Active",
  jerseyNumber: `${index + 1}`,
}));

export const creators = [
  ["creator-maya-carter", "Maya Carter", "Photographer", "Chicago", "Confirmed", "Court action, portraits", "4.9"],
  ["creator-deandre-miles", "DeAndre Miles", "Videographer", "Chicago", "Confirmed", "Game film, reels", "4.8"],
  ["creator-sam-nguyen", "Sam Nguyen", "Editor", "Remote", "Active", "Highlight edits, captions", "4.7"],
  ["creator-taylor-reed", "Taylor Reed", "Photographer", "Detroit", "Pending", "Bench reactions, sponsor boards", "4.6"],
  ["creator-avery-johnson", "Avery Johnson", "Videographer", "St. Louis", "Confirmed", "Mic'd up, recaps", "4.8"],
  ["creator-lena-martin", "Lena Martin", "Editor", "Kansas City", "Active", "Social packages, thumbnails", "4.9"],
  ["creator-chris-barnes", "Chris Barnes", "Photographer", "Louisville", "Hold", "Team photos, awards", "4.5"],
  ["creator-riley-foster", "Riley Foster", "Videographer", "Chicago", "Confirmed", "Vertical clips, interviews", "4.7"],
].map(([id, name, role, market, status, specialties, rating]) => ({
  id,
  name,
  role,
  market,
  status,
  specialties,
  rating,
}));

export const assignments = [
  ["assign-court-1-live", "Court 1 live action", "event-summer-showcase", "creator-maya-carter", "Photo", "Court 1", "Live", "High"],
  ["assign-court-2-live", "Court 2 vertical clips", "event-summer-showcase", "creator-deandre-miles", "Video", "Court 2", "Live", "High"],
  ["assign-sponsor-boards", "Sponsor board capture", "event-summer-showcase", "creator-riley-foster", "Video", "Courts 3-4", "Queued", "High"],
  ["assign-athlete-portraits", "Athlete portrait station", "event-summer-showcase", "creator-maya-carter", "Photo", "Lobby", "Needs review", "Medium"],
  ["assign-elite-recap", "Elite 150 recap film", "event-elite-150", "creator-avery-johnson", "Video", "All courts", "Confirmed", "High"],
  ["assign-elite-edits", "Elite 150 same-day edits", "event-elite-150", "creator-sam-nguyen", "Edit", "Remote", "Confirmed", "High"],
  ["assign-chicago-photos", "Chicago Jam photo pool", "event-chicago-jam", "creator-taylor-reed", "Photo", "Courts 1-8", "Pending", "High"],
  ["assign-chicago-reels", "Chicago Jam vertical reels", "event-chicago-jam", "creator-riley-foster", "Video", "Feature games", "Pending", "High"],
  ["assign-bluegrass-photo", "Bluegrass bracket finals", "event-bluegrass", "creator-chris-barnes", "Photo", "Courts A-B", "Pending", "Medium"],
  ["assign-bluegrass-video", "Bluegrass sponsor recap", "event-bluegrass", "creator-avery-johnson", "Video", "Main court", "Pending", "Medium"],
  ["assign-heartland-photo", "Heartland court coverage", "event-heartland", "creator-maya-carter", "Photo", "Courts 1-7", "Draft", "Medium"],
  ["assign-heartland-edit", "Heartland weekly package", "event-heartland", "creator-lena-martin", "Edit", "Remote", "Draft", "Medium"],
].map(([id, title, eventId, creatorId, type, court, status, priority], index) => ({
  id,
  title,
  eventId,
  creatorId,
  type,
  court,
  status,
  priority,
  startsAt: index < 4 ? "2026-06-25T09:00:00-05:00" : "2026-06-27T09:00:00-05:00",
}));

export const sponsors = [
  ["sponsor-nike-eybl", "Nike EYBL", "Apparel", "Premier", "Active", "Jordan Lee", "4"],
  ["sponsor-gatorade", "Gatorade", "Hydration", "Gold", "Active", "Renee Brooks", "2"],
  ["sponsor-hudl", "Hudl", "Video platform", "Gold", "Active", "Chris Patel", "3"],
  ["sponsor-ballertv", "BallerTV", "Streaming", "Silver", "Renewal", "Mia Santos", "1"],
  ["sponsor-spalding", "Spalding", "Equipment", "Silver", "Active", "Andre Knox", "2"],
  ["sponsor-local-health", "Midwest Sports Medicine", "Healthcare", "Community", "Active", "Dr. Nina Page", "1"],
].map(([id, name, category, tier, status, contact, deliverablesDue]) => ({
  id,
  name,
  category,
  tier,
  status,
  contact,
  deliverablesDue,
}));

const mediaFileNames = [
  "RLH_0625_C1_JalenBrooks_drive_001.jpg",
  "RLH_0625_C1_JalenBrooks_finish_002.jpg",
  "RLH_0625_C2_Simeon_transition_003.mp4",
  "RLH_0625_C4_Gatorade_board_004.jpg",
  "RLH_0625_Lobby_portrait_CamPorter_005.jpg",
  "RLH_0625_C3_MarcusEllis_three_006.jpg",
  "RLH_0625_C2_DeAndreMiles_reel_007.mp4",
  "RLH_0625_C5_team_huddle_008.jpg",
  "RLH_0625_C6_sponsor_walkthrough_009.mp4",
  "RLH_0625_C1_defensive_stop_010.jpg",
  "RLH_0627_Elite150_checkin_011.jpg",
  "RLH_0627_Elite150_warmups_012.mp4",
  "RLH_0627_Elite150_interview_013.mp4",
  "RLH_0627_Elite150_awards_014.jpg",
  "RLH_0627_Elite150_court6_015.jpg",
  "RLH_0710_ChicagoJam_intake_016.jpg",
  "RLH_0710_ChicagoJam_bracket_017.jpg",
  "RLH_0710_ChicagoJam_feature_018.mp4",
  "RLH_0710_ChicagoJam_sponsor_019.jpg",
  "RLH_0710_ChicagoJam_recruitlook_020.mp4",
  "RLH_0718_Bluegrass_maincourt_021.jpg",
  "RLH_0718_Bluegrass_recap_022.mp4",
  "RLH_0801_Heartland_media_day_023.jpg",
  "RLH_0801_Heartland_interview_024.mp4",
  "RLH_0801_Heartland_sponsor_rollup_025.jpg",
];

export const mediaFiles = mediaFileNames.map((fileName, index) => {
  const isVideo = fileName.endsWith(".mp4");
  const event = events[index < 10 ? 0 : index < 15 ? 1 : index < 20 ? 2 : index < 22 ? 3 : 4];
  const assignment = assignments[index % assignments.length];
  const creator = creators[index % creators.length];

  return {
    id: `media-${String(index + 1).padStart(2, "0")}`,
    fileName,
    type: isVideo ? "Video" : "Photo",
    eventId: event.id,
    assignmentId: assignment.id,
    creatorId: creator.id,
    athleteId: index % 3 === 0 ? athletes[index % athletes.length].id : "",
    sponsorId: index % 5 === 3 ? sponsors[index % sponsors.length].id : "",
    status: index % 7 === 0 ? "Needs tags" : index % 5 === 0 ? "Processing" : "Ready",
    visibility: index % 4 === 0 ? "Internal" : "Client library",
    sizeMb: isVideo ? 680 + index * 21 : 18 + index,
    uploadedAt: index < 10 ? "2026-06-25T18:00:00-05:00" : "2026-06-27T18:00:00-05:00",
  };
});

export const deliverables = [
  ["deliverable-summer-recap", "Summer Showcase recap reel", "event-summer-showcase", "sponsor-nike-eybl", "Sponsor recap", "2026-06-26", "In review", "High", "12"],
  ["deliverable-athlete-jalen", "Jalen Brooks player package", "event-summer-showcase", "", "Athlete package", "2026-06-26", "Queued", "High", "8"],
  ["deliverable-gatorade", "Gatorade sideline set", "event-summer-showcase", "sponsor-gatorade", "Sponsor gallery", "2026-06-27", "Needs approval", "High", "6"],
  ["deliverable-elite-highlights", "Elite 150 highlight bank", "event-elite-150", "sponsor-hudl", "Highlight bank", "2026-06-29", "Editing", "High", "20"],
  ["deliverable-elite-social", "Elite 150 social cutdowns", "event-elite-150", "", "Social set", "2026-06-29", "Queued", "Medium", "10"],
  ["deliverable-chicago-preview", "Chicago Jam sponsor preview", "event-chicago-jam", "sponsor-ballertv", "Sponsor preview", "2026-07-08", "Planned", "Medium", "5"],
  ["deliverable-chicago-brackets", "Chicago Jam bracket photo pack", "event-chicago-jam", "", "Event gallery", "2026-07-13", "Planned", "Medium", "24"],
  ["deliverable-bluegrass-recap", "Bluegrass Tip-Off recap", "event-bluegrass", "sponsor-spalding", "Sponsor recap", "2026-07-20", "Planned", "Medium", "8"],
  ["deliverable-heartland-scout", "Heartland scout clip library", "event-heartland", "sponsor-hudl", "Scout package", "2026-08-03", "Planned", "High", "18"],
  ["deliverable-medical", "Sports medicine activation set", "event-heartland", "sponsor-local-health", "Sponsor gallery", "2026-08-04", "Planned", "Medium", "6"],
].map(([id, title, eventId, sponsorId, type, dueAt, status, priority, assetCount]) => ({
  id,
  title,
  eventId,
  sponsorId,
  type,
  dueAt,
  status,
  priority,
  assetCount,
}));

export const mediaRequests = [
  ["request-brooks-clips", "Brooks family clip pull", "Parent", "event-summer-showcase", "Athlete clips", "Open", "High", "2026-06-26"],
  ["request-nike-board", "Nike sponsor board selects", "Sponsor", "event-summer-showcase", "Sponsor assets", "In progress", "High", "2026-06-26"],
  ["request-hudl-export", "Hudl full-game exports", "Sponsor", "event-elite-150", "Game film", "Open", "Medium", "2026-06-29"],
  ["request-simeon-gallery", "Simeon team gallery", "Coach", "event-summer-showcase", "Team gallery", "Waiting on tags", "Medium", "2026-06-27"],
  ["request-elite-interviews", "Elite 150 interview pulls", "Media director", "event-elite-150", "Interview clips", "In progress", "High", "2026-06-28"],
  ["request-chicago-credentials", "Chicago Jam credential assets", "Staff", "event-chicago-jam", "Operations", "Open", "Low", "2026-07-08"],
  ["request-bluegrass-recap", "Bluegrass sponsor recap outline", "Sponsor", "event-bluegrass", "Sponsor recap", "Open", "Medium", "2026-07-19"],
  ["request-heartland-scout", "Heartland scout cut list", "Scout", "event-heartland", "Scout clips", "Open", "High", "2026-08-02"],
].map(([id, title, requesterType, eventId, type, status, priority, dueAt], index) => ({
  id,
  title,
  requesterName: [
    "Dana Brooks",
    "Jordan Lee",
    "Chris Patel",
    "Coach Reynolds",
    "Alicia Grant",
    "Mel Price",
    "Andre Knox",
    "Victor Hayes",
  ][index],
  requesterType,
  eventId,
  type,
  status,
  priority,
  dueAt,
}));

export const notifications = [
  ["notif-1", "Court 2 upload batch is ready", "8 new clips cleared processing.", "Media", "Info"],
  ["notif-2", "Sponsor deliverable needs approval", "Gatorade sideline set is waiting on final selects.", "Deliverable", "Warning"],
  ["notif-3", "Creator confirmation pending", "Taylor Reed has not accepted Chicago Jam coverage.", "Assignment", "Warning"],
  ["notif-4", "Storage usage crossed 60%", "RecruitLook media allocation is at 62%.", "Storage", "Info"],
  ["notif-5", "New parent request", "Brooks family requested clip pulls from Court 1.", "Request", "High"],
  ["notif-6", "Elite 150 editor queue updated", "Same-day edits moved to confirmed.", "Assignment", "Info"],
] as const;

export const storageUsage = {
  provider: "Cloudflare R2 pending",
  usedTb: 1.86,
  totalTb: 3,
  mediaCount: mediaFiles.length,
  calculatedAt: "2026-06-25T20:30:00-05:00",
};

const eventById = new Map<string, (typeof events)[number]>(
  events.map((event) => [event.id, event]),
);
const venueById = new Map<string, (typeof venues)[number]>(
  venues.map((venue) => [venue.id, venue]),
);
const schoolById = new Map<string, (typeof schools)[number]>(
  schools.map((school) => [school.id, school]),
);
const creatorById = new Map<string, (typeof creators)[number]>(
  creators.map((creator) => [creator.id, creator]),
);

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function formatShortDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function toneForStatus(status: string): StatusTone {
  const normalized = status.toLowerCase();

  if (["active", "ready", "confirmed", "verified", "live", "locked"].includes(normalized)) {
    return "success";
  }

  if (["open", "queued", "planning", "pending", "processing", "editing", "in progress"].includes(normalized)) {
    return "warning";
  }

  if (["needs approval", "needs review", "needs tags", "waiting on tags", "hold"].includes(normalized)) {
    return "destructive";
  }

  if (["planned", "draft", "intake", "creator booking", "renewal"].includes(normalized)) {
    return "cyan";
  }

  return "neutral";
}

function row(
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

const commonStatusFilter = (statuses: string[]): FilterDefinition => ({
  key: "status",
  label: "Status",
  options: [
    { label: "All", value: "all" },
    ...Array.from(new Set(statuses)).map((status) => ({
      label: status,
      value: status,
    })),
  ],
});

export function getDashboardMetrics(): StatSnapshot[] {
  const liveEvents = events.filter((event) => event.status === "Live").length;
  const upcomingEvents = events.filter((event) => event.status !== "Live").length;
  const openAssignments = assignments.filter((assignment) =>
    ["Draft", "Needs review", "Pending", "Queued"].includes(assignment.status),
  ).length;
  const pendingDeliverables = deliverables.filter((deliverable) =>
    ["Queued", "Needs approval", "Editing", "Planned"].includes(deliverable.status),
  ).length;
  const recentRequests = mediaRequests.filter((request) => request.status !== "Closed").length;
  const sponsorDeliverables = deliverables.filter((deliverable) => deliverable.sponsorId).length;

  return [
    {
      label: "Today's Events",
      value: `${liveEvents}`,
      detail: "Wintrust coverage is active across eight courts",
      tone: "success",
    },
    {
      label: "Upcoming Events",
      value: `${upcomingEvents}`,
      detail: "Next locked event is Elite 150 Midwest",
      tone: "cyan",
    },
    {
      label: "Open Assignments",
      value: `${openAssignments}`,
      detail: "Creator accepts, court locks, and edit queues",
      tone: "warning",
    },
    {
      label: "Recent Uploads",
      value: `${mediaFiles.length}`,
      detail: "Photos and video metadata staged for library routing",
      tone: "primary",
    },
    {
      label: "Pending Deliverables",
      value: `${pendingDeliverables}`,
      detail: "Athlete, team, event, and sponsor packages",
      tone: "warning",
    },
    {
      label: "Storage Used",
      value: `${storageUsage.usedTb.toFixed(1)} TB`,
      detail: `${Math.round((storageUsage.usedTb / storageUsage.totalTb) * 100)}% of RecruitLook allocation`,
      tone: "neutral",
    },
    {
      label: "Creator Activity",
      value: `${creators.filter((creator) => creator.status !== "Hold").length}`,
      detail: "Active or confirmed contributors in the bench",
      tone: "success",
    },
    {
      label: "Recent Downloads",
      value: "38",
      detail: "Coach, sponsor, and family file pulls this week",
      tone: "cyan",
    },
    {
      label: "Sponsor Deliverables",
      value: `${sponsorDeliverables}`,
      detail: "Contracted sponsor media packages in motion",
      tone: "primary",
    },
    {
      label: "Recent Requests",
      value: `${recentRequests}`,
      detail: "Media requests requiring routing or approvals",
      tone: "warning",
    },
  ];
}

export const moduleDefinitions: Record<ModuleId, ModuleDefinition> = {
  events: {
    id: "events",
    title: "Events",
    eyebrow: "Schedule Operations",
    description:
      "Tournament, showcase, camp, and circuit coverage plans with venue, court, priority, and staffing context.",
    stats: [
      { label: "Total events", value: `${events.length}`, detail: "RecruitLook event pipeline", tone: "primary" },
      { label: "Live today", value: "1", detail: "Summer Showcase in coverage", tone: "success" },
      { label: "High priority", value: `${events.filter((event) => event.priority === "High").length}`, detail: "Director attention required", tone: "warning" },
    ],
    filters: [
      commonStatusFilter(events.map((event) => event.status)),
      {
        key: "priority",
        label: "Priority",
        options: [
          { label: "All", value: "all" },
          { label: "High", value: "High" },
          { label: "Medium", value: "Medium" },
        ],
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
    rows: events.map((event) => {
      const venue = venueById.get(event.venueId);

      return row(
        event.id,
        {
          name: event.name,
          date: formatShortDate(event.startsAt),
          venue: venue ? `${venue.name}, ${venue.state}` : "Unassigned",
          courts: event.courts,
          ageGroups: event.ageGroups,
          status: event.status,
          priority: event.priority,
        },
        { status: event.status, priority: event.priority },
      );
    }),
    cards: [
      { label: "Coverage density", value: "33 courts", detail: "Total courts across active pipeline", tone: "cyan" },
      { label: "Venue markets", value: "5", detail: "Illinois, Texas, Michigan, Kentucky, Missouri", tone: "neutral" },
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
    stats: [
      { label: "Files", value: `${mediaFiles.length}`, detail: "Structured media records", tone: "primary" },
      { label: "Ready", value: `${mediaFiles.filter((file) => file.status === "Ready").length}`, detail: "Available for delivery", tone: "success" },
      { label: "Needs attention", value: `${mediaFiles.filter((file) => file.status !== "Ready").length}`, detail: "Processing or tagging required", tone: "warning" },
    ],
    filters: [
      commonStatusFilter(mediaFiles.map((file) => file.status)),
      {
        key: "type",
        label: "Type",
        options: [
          { label: "All", value: "all" },
          { label: "Photo", value: "Photo" },
          { label: "Video", value: "Video" },
        ],
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
    rows: mediaFiles.map((file) => {
      const event = eventById.get(file.eventId);
      const creator = creatorById.get(file.creatorId);

      return row(
        file.id,
        {
          fileName: file.fileName,
          type: file.type,
          event: event?.name ?? "Unassigned",
          creator: creator?.name ?? "Unassigned",
          status: file.status,
          size: `${file.sizeMb} MB`,
        },
        { status: file.status, type: file.type },
      );
    }),
    cards: [
      { label: "Video records", value: `${mediaFiles.filter((file) => file.type === "Video").length}`, detail: "Long-form and vertical files", tone: "cyan" },
      { label: "Tagged for sponsors", value: `${mediaFiles.filter((file) => file.sponsorId).length}`, detail: "Linked to sponsor obligations", tone: "primary" },
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
    stats: [
      { label: "Upload batches", value: "7", detail: "Grouped by event, creator, and capture window", tone: "primary" },
      { label: "Processing", value: `${mediaFiles.filter((file) => file.status === "Processing").length}`, detail: "Awaiting metadata completion", tone: "warning" },
      { label: "Needs tags", value: `${mediaFiles.filter((file) => file.status === "Needs tags").length}`, detail: "Manual review required", tone: "destructive" },
    ],
    filters: [
      commonStatusFilter(mediaFiles.map((file) => file.status)),
      {
        key: "visibility",
        label: "Routing",
        options: [
          { label: "All", value: "all" },
          { label: "Internal", value: "Internal" },
          { label: "Client library", value: "Client library" },
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
    rows: mediaFiles.slice(0, 14).map((file) => {
      const creator = creatorById.get(file.creatorId);

      return row(
        file.id,
        {
          fileName: file.fileName,
          creator: creator?.name ?? "Unknown creator",
          uploadedAt: formatShortDateTime(file.uploadedAt),
          status: file.status,
          visibility: file.visibility,
          size: `${file.sizeMb} MB`,
        },
        { status: file.status, visibility: file.visibility },
      );
    }),
    cards: [
      { label: "Average batch size", value: "3.6 GB", detail: "Across active upload sessions", tone: "neutral" },
      { label: "Routing SLA", value: "92%", detail: "Files routed within 12 hours", tone: "success" },
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
    stats: [
      { label: "Creators", value: `${creators.length}`, detail: "Active production bench", tone: "primary" },
      { label: "Confirmed", value: `${creators.filter((creator) => creator.status === "Confirmed").length}`, detail: "Ready for assigned work", tone: "success" },
      { label: "Editors", value: `${creators.filter((creator) => creator.role === "Editor").length}`, detail: "Post-production capacity", tone: "cyan" },
    ],
    filters: [
      commonStatusFilter(creators.map((creator) => creator.status)),
      {
        key: "role",
        label: "Role",
        options: [
          { label: "All", value: "all" },
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
    rows: creators.map((creator) =>
      row(
        creator.id,
        {
          name: creator.name,
          role: creator.role,
          market: creator.market,
          specialties: creator.specialties,
          status: creator.status,
          rating: creator.rating,
        },
        { status: creator.status, role: creator.role },
      ),
    ),
    cards: [
      { label: "Coverage markets", value: "5", detail: "Chicago, Detroit, St. Louis, Kansas City, Louisville", tone: "cyan" },
      { label: "Avg rating", value: "4.7", detail: "Internal RecruitLook production score", tone: "success" },
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
    stats: [
      { label: "Assignments", value: `${assignments.length}`, detail: "Coverage and edit work orders", tone: "primary" },
      { label: "Open", value: `${assignments.filter((assignment) => !["Confirmed", "Live"].includes(assignment.status)).length}`, detail: "Needs scheduling action", tone: "warning" },
      { label: "High priority", value: `${assignments.filter((assignment) => assignment.priority === "High").length}`, detail: "Director review queue", tone: "destructive" },
    ],
    filters: [
      commonStatusFilter(assignments.map((assignment) => assignment.status)),
      {
        key: "type",
        label: "Type",
        options: [
          { label: "All", value: "all" },
          { label: "Photo", value: "Photo" },
          { label: "Video", value: "Video" },
          { label: "Edit", value: "Edit" },
        ],
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
    rows: assignments.map((assignment) => {
      const event = eventById.get(assignment.eventId);
      const creator = creatorById.get(assignment.creatorId);

      return row(
        assignment.id,
        {
          title: assignment.title,
          event: event?.name ?? "Unassigned",
          creator: creator?.name ?? "Unassigned",
          type: assignment.type,
          court: assignment.court,
          status: assignment.status,
          priority: assignment.priority,
        },
        { status: assignment.status, type: assignment.type, priority: assignment.priority },
      );
    }),
    cards: [
      { label: "Same-day edit capacity", value: "2 editors", detail: "Remote queue assigned", tone: "cyan" },
      { label: "Court locks needed", value: "4", detail: "Assignments still need final court mapping", tone: "warning" },
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
    stats: [
      { label: "Athletes", value: `${athletes.length}`, detail: "RecruitLook profile records", tone: "primary" },
      { label: "Needs media", value: `${athletes.filter((athlete) => athlete.profileStatus === "Needs media").length}`, detail: "Profiles missing current assets", tone: "warning" },
      { label: "Offered", value: `${athletes.filter((athlete) => athlete.recruitingStatus === "Offered").length}`, detail: "Tracked recruiting momentum", tone: "success" },
    ],
    filters: [
      {
        key: "graduationYear",
        label: "Class",
        options: [
          { label: "All", value: "all" },
          { label: "2026", value: "2026" },
          { label: "2027", value: "2027" },
          { label: "2028", value: "2028" },
          { label: "2029", value: "2029" },
        ],
      },
      commonStatusFilter(athletes.map((athlete) => athlete.profileStatus)),
    ],
    columns: [
      { key: "name", header: "Athlete" },
      { key: "school", header: "School" },
      { key: "graduationYear", header: "Class", type: "badge" },
      { key: "position", header: "Position", type: "badge" },
      { key: "recruitingStatus", header: "Recruiting" },
      { key: "profileStatus", header: "Profile", type: "status" },
    ],
    rows: athletes.map((athlete) => {
      const school = schoolById.get(athlete.schoolId);

      return row(
        athlete.id,
        {
          name: `${athlete.firstName} ${athlete.lastName}`,
          school: school?.name ?? "Unassigned",
          graduationYear: athlete.graduationYear,
          position: athlete.position,
          recruitingStatus: athlete.recruitingStatus,
          profileStatus: athlete.profileStatus,
        },
        {
          graduationYear: athlete.graduationYear,
          status: athlete.profileStatus,
          position: athlete.position,
        },
      );
    }),
    cards: [
      { label: "Profile completeness", value: "78%", detail: "Athletes with current media and school data", tone: "cyan" },
      { label: "Class mix", value: "2026-2029", detail: "Four recruiting classes represented", tone: "neutral" },
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
    stats: [
      { label: "Schools", value: `${schools.length}`, detail: "Verified program records", tone: "primary" },
      { label: "Illinois programs", value: `${schools.filter((school) => school.state === "IL").length}`, detail: "Primary RecruitLook market", tone: "success" },
      { label: "Linked athletes", value: `${athletes.length}`, detail: "Athletes attached to schools", tone: "cyan" },
    ],
    filters: [
      {
        key: "conference",
        label: "Conference",
        options: [
          { label: "All", value: "all" },
          ...Array.from(new Set(schools.map((school) => school.conference))).map((conference) => ({
            label: conference,
            value: conference,
          })),
        ],
      },
      commonStatusFilter(schools.map((school) => school.status)),
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
    rows: schools.map((school) =>
      row(
        school.id,
        {
          name: school.name,
          city: school.city,
          state: school.state,
          classification: school.classification,
          conference: school.conference,
          athletes: athletes.filter((athlete) => athlete.schoolId === school.id).length,
          status: school.status,
        },
        { conference: school.conference, status: school.status },
      ),
    ),
    cards: [
      { label: "Coach request coverage", value: "4 active", detail: "Requests tied to school/team records", tone: "warning" },
      { label: "Program media sets", value: "10", detail: "School galleries ready for delivery mapping", tone: "cyan" },
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
    stats: [
      { label: "Sponsors", value: `${sponsors.length}`, detail: "Active partner records", tone: "primary" },
      { label: "Deliverables due", value: `${sponsors.reduce((sum, sponsor) => sum + Number(sponsor.deliverablesDue), 0)}`, detail: "Contracted content obligations", tone: "warning" },
      { label: "Premier and Gold", value: `${sponsors.filter((sponsor) => ["Premier", "Gold"].includes(sponsor.tier)).length}`, detail: "High-touch partners", tone: "success" },
    ],
    filters: [
      commonStatusFilter(sponsors.map((sponsor) => sponsor.status)),
      {
        key: "tier",
        label: "Tier",
        options: [
          { label: "All", value: "all" },
          { label: "Premier", value: "Premier" },
          { label: "Gold", value: "Gold" },
          { label: "Silver", value: "Silver" },
          { label: "Community", value: "Community" },
        ],
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
    rows: sponsors.map((sponsor) =>
      row(
        sponsor.id,
        {
          name: sponsor.name,
          category: sponsor.category,
          tier: sponsor.tier,
          status: sponsor.status,
          contact: sponsor.contact,
          deliverablesDue: sponsor.deliverablesDue,
        },
        { status: sponsor.status, tier: sponsor.tier },
      ),
    ),
    cards: [
      { label: "Sponsor media records", value: `${mediaFiles.filter((file) => file.sponsorId).length}`, detail: "Assets already linked to sponsors", tone: "cyan" },
      { label: "Renewals", value: "1", detail: "BallerTV renewal requires recap proof", tone: "warning" },
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
    stats: [
      { label: "Deliverables", value: `${deliverables.length}`, detail: "Active package records", tone: "primary" },
      { label: "Due soon", value: "5", detail: "Due by June 29", tone: "warning" },
      { label: "Sponsor packages", value: `${deliverables.filter((deliverable) => deliverable.sponsorId).length}`, detail: "Partner obligations", tone: "cyan" },
    ],
    filters: [
      commonStatusFilter(deliverables.map((deliverable) => deliverable.status)),
      {
        key: "priority",
        label: "Priority",
        options: [
          { label: "All", value: "all" },
          { label: "High", value: "High" },
          { label: "Medium", value: "Medium" },
        ],
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
    rows: deliverables.map((deliverable) => {
      const event = eventById.get(deliverable.eventId);

      return row(
        deliverable.id,
        {
          title: deliverable.title,
          type: deliverable.type,
          event: event?.name ?? "Unassigned",
          dueAt: formatShortDate(deliverable.dueAt),
          status: deliverable.status,
          priority: deliverable.priority,
          assetCount: deliverable.assetCount,
        },
        { status: deliverable.status, priority: deliverable.priority },
      );
    }),
    cards: [
      { label: "Approval queue", value: "2", detail: "Packages waiting on director or sponsor signoff", tone: "destructive" },
      { label: "Assets committed", value: "117", detail: "Photos, clips, reels, and galleries across queue", tone: "success" },
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
    stats: [
      { label: "Requests", value: `${mediaRequests.length}`, detail: "Active intake records", tone: "primary" },
      { label: "High priority", value: `${mediaRequests.filter((request) => request.priority === "High").length}`, detail: "Needs immediate routing", tone: "destructive" },
      { label: "In progress", value: `${mediaRequests.filter((request) => request.status === "In progress").length}`, detail: "Currently assigned", tone: "warning" },
    ],
    filters: [
      commonStatusFilter(mediaRequests.map((request) => request.status)),
      {
        key: "requesterType",
        label: "Requester",
        options: [
          { label: "All", value: "all" },
          ...Array.from(new Set(mediaRequests.map((request) => request.requesterType))).map((requesterType) => ({
            label: requesterType,
            value: requesterType,
          })),
        ],
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
    rows: mediaRequests.map((request) => {
      const event = eventById.get(request.eventId);

      return row(
        request.id,
        {
          title: request.title,
          requester: request.requesterName,
          requesterType: request.requesterType,
          event: event?.name ?? "Unassigned",
          dueAt: formatShortDate(request.dueAt),
          status: request.status,
          priority: request.priority,
        },
        { status: request.status, requesterType: request.requesterType, priority: request.priority },
      );
    }),
    cards: [
      { label: "Parent and coach requests", value: "3", detail: "Family and team delivery workflows", tone: "cyan" },
      { label: "Sponsor requests", value: "3", detail: "Partner proof and recap workflows", tone: "warning" },
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
    stats: [
      { label: "Delivery SLA", value: "86%", detail: "Packages delivered within target window", tone: "success" },
      { label: "Avg ingest time", value: "47 min", detail: "Upload to processed metadata", tone: "cyan" },
      { label: "At-risk items", value: "7", detail: "Requests or deliverables nearing due date", tone: "warning" },
    ],
    filters: [
      {
        key: "area",
        label: "Area",
        options: [
          { label: "All", value: "all" },
          { label: "Events", value: "Events" },
          { label: "Creators", value: "Creators" },
          { label: "Sponsors", value: "Sponsors" },
          { label: "Storage", value: "Storage" },
        ],
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
    rows: [
      row("analytics-delivery-sla", { metric: "Delivery SLA", area: "Deliverables", current: "86%", target: "90%", status: "In progress", owner: "Media Director" }, { area: "Deliverables", status: "In progress" }),
      row("analytics-creator-fill", { metric: "Creator fill rate", area: "Creators", current: "74%", target: "95%", status: "Needs review", owner: "Operations" }, { area: "Creators", status: "Needs review" }),
      row("analytics-ingest", { metric: "Median ingest time", area: "Storage", current: "47 min", target: "60 min", status: "Ready", owner: "Media Ops" }, { area: "Storage", status: "Ready" }),
      row("analytics-sponsor", { metric: "Sponsor package completion", area: "Sponsors", current: "68%", target: "85%", status: "In progress", owner: "Partnerships" }, { area: "Sponsors", status: "In progress" }),
      row("analytics-coverage", { metric: "High-priority court coverage", area: "Events", current: "100%", target: "100%", status: "Ready", owner: "Event Lead" }, { area: "Events", status: "Ready" }),
    ],
    cards: [
      { label: "Storage trajectory", value: "+14%", detail: "Projected growth over next 30 days", tone: "warning" },
      { label: "Download velocity", value: "38", detail: "Recent stakeholder downloads", tone: "cyan" },
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
    stats: [
      { label: "Organization", value: "Active", detail: "RecruitLook Hoops tenant record", tone: "success" },
      { label: "Role model", value: "10 roles", detail: "Owner through viewer access structure", tone: "primary" },
      { label: "Storage limit", value: `${storageUsage.totalTb} TB`, detail: "Allocation before R2 connection", tone: "cyan" },
    ],
    filters: [
      commonStatusFilter(["Configured", "Needs key", "Ready"]),
      {
        key: "domain",
        label: "Domain",
        options: [
          { label: "All", value: "all" },
          { label: "Organization", value: "Organization" },
          { label: "Access", value: "Access" },
          { label: "Storage", value: "Storage" },
          { label: "Audit", value: "Audit" },
        ],
      },
    ],
    columns: [
      { key: "setting", header: "Setting" },
      { key: "domain", header: "Domain", type: "badge" },
      { key: "value", header: "Value" },
      { key: "owner", header: "Owner" },
      { key: "status", header: "Status", type: "status" },
    ],
    rows: [
      row("settings-org", { setting: "Tenant slug", domain: "Organization", value: recruitLookOrganization.slug, owner: "Owner", status: "Configured" }, { domain: "Organization", status: "Configured" }),
      row("settings-timezone", { setting: "Workspace timezone", domain: "Organization", value: recruitLookOrganization.timezone, owner: "Admin", status: "Configured" }, { domain: "Organization", status: "Configured" }),
      row("settings-roles", { setting: "Role structure", domain: "Access", value: "owner, media_director, admin, creators, coach, sponsor, viewer", owner: "Owner", status: "Configured" }, { domain: "Access", status: "Configured" }),
      row("settings-supabase", { setting: "Supabase database", domain: "Storage", value: "Environment variables present", owner: "Engineering", status: "Ready" }, { domain: "Storage", status: "Ready" }),
      row("settings-r2", { setting: "Cloudflare R2", domain: "Storage", value: "Planned integration", owner: "Engineering", status: "Needs key" }, { domain: "Storage", status: "Needs key" }),
      row("settings-audit", { setting: "Audit logging", domain: "Audit", value: "Schema ready", owner: "Engineering", status: "Ready" }, { domain: "Audit", status: "Ready" }),
    ],
    cards: [
      { label: "Tenant ID", value: "recruitlook", detail: "Primary workspace for production buildout", tone: "primary" },
      { label: "Next connection", value: "Supabase", detail: "Replace local data utilities with tenant-scoped queries", tone: "warning" },
    ],
    emptyState: {
      title: "No settings match these filters",
      description: "Adjust domain, status, or search by configuration owner.",
    },
  },
};

export function getModuleDefinition(moduleId: ModuleId) {
  return moduleDefinitions[moduleId];
}

export function getModuleRows(moduleId: ModuleId, searchParams: SearchParamsRecord = {}) {
  const moduleDefinition = getModuleDefinition(moduleId);
  const searchQuery = getFirstParam(searchParams.q)?.toLowerCase().trim() ?? "";

  return moduleDefinition.rows.filter((moduleRow) => {
    const matchesSearch = searchQuery
      ? moduleRow.searchText.includes(searchQuery)
      : true;

    const matchesFilters = moduleDefinition.filters.every((filter) => {
      const value = getFirstParam(searchParams[filter.key]) ?? "all";

      return value === "all" || moduleRow.filters[filter.key] === value;
    });

    return matchesSearch && matchesFilters;
  });
}

export function getFirstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function getStatusTone(status: string): StatusTone {
  return toneForStatus(status);
}

export function getDashboardTables() {
  return {
    todayEvents: moduleDefinitions.events.rows.filter((rowItem) => rowItem.values.status === "Live"),
    upcomingEvents: moduleDefinitions.events.rows.filter((rowItem) => rowItem.values.status !== "Live").slice(0, 4),
    openAssignments: moduleDefinitions.assignments.rows.filter((rowItem) =>
      ["Draft", "Needs review", "Pending", "Queued"].includes(String(rowItem.values.status)),
    ),
    recentUploads: moduleDefinitions.upload.rows.slice(0, 6),
    pendingDeliverables: moduleDefinitions.deliverables.rows.filter((rowItem) =>
      ["Queued", "Needs approval", "Editing", "Planned"].includes(String(rowItem.values.status)),
    ),
    sponsorDeliverables: moduleDefinitions.deliverables.rows.filter((rowItem) =>
      String(rowItem.values.type).toLowerCase().includes("sponsor"),
    ),
    recentRequests: moduleDefinitions.requests.rows.slice(0, 6),
    notifications: notifications.map(([id, title, body, type, severity]) =>
      row(
        id,
        {
          title,
          body,
          type,
          severity,
        },
        { severity },
      ),
    ),
  };
}
