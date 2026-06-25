import "server-only";

import { auth } from "@clerk/nextjs/server";

import {
  applyModuleFilters,
  bytesToDisplay,
  formatShortDate,
  formatShortDateTime,
  getModuleChrome,
  recruitLookTenantName,
  recruitLookTenantSlug,
  row,
  tbToDisplay,
  titleCase,
  type ModuleCardData,
  type ModuleId,
  type ModulePageData,
  type ModuleRow,
  type SearchParamsRecord,
  type StatSnapshot,
} from "@/lib/app-modules";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";

type Tables = Database["public"]["Tables"];
type OrganizationRow = Tables["organizations"]["Row"];
type VenueRow = Tables["venues"]["Row"];
type EventRow = Tables["events"]["Row"];
type SchoolRow = Tables["schools"]["Row"];
type AthleteRow = Tables["athletes"]["Row"];
type CreatorRow = Tables["creators"]["Row"];
type AssignmentRow = Tables["assignments"]["Row"];
type MediaFileRow = Tables["media_files"]["Row"];
type DeliverableRow = Tables["deliverables"]["Row"];
type MediaRequestRow = Tables["media_requests"]["Row"];
type SponsorRow = Tables["sponsors"]["Row"];
type NotificationRow = Tables["notifications"]["Row"];
type StorageUsageRow = Tables["storage_usage"]["Row"];

type SupabaseAdminClient = ReturnType<typeof createAdminClient>;

type PortalContext = {
  organization: OrganizationRow;
  supabase: SupabaseAdminClient;
  userId: string;
};

type RecruitLookRecords = {
  assignments: AssignmentRow[];
  athletes: AthleteRow[];
  creators: CreatorRow[];
  deliverables: DeliverableRow[];
  events: EventRow[];
  mediaFiles: MediaFileRow[];
  mediaRequests: MediaRequestRow[];
  notifications: NotificationRow[];
  organizations: OrganizationRow[];
  schools: SchoolRow[];
  sponsors: SponsorRow[];
  storageUsage: StorageUsageRow[];
  venues: VenueRow[];
};

const notificationColumns = [
  { key: "title", header: "Notification" },
  { key: "type", header: "Type", type: "badge" as const },
  { key: "severity", header: "Severity", type: "status" as const },
];

async function requireClerkUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("A signed-in Clerk user is required to read RecruitLook data.");
  }

  return userId;
}

function raiseQueryError(label: string, message: string) {
  throw new Error(`${label} query failed: ${message}`);
}

async function getPortalContext(): Promise<PortalContext> {
  const userId = await requireClerkUser();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("slug", recruitLookTenantSlug)
    .single();

  if (error) {
    raiseQueryError("organizations", error.message);
  }

  if (!data) {
    throw new Error(`Organization ${recruitLookTenantSlug} was not found.`);
  }

  return {
    organization: data,
    supabase,
    userId,
  };
}

async function contextOrDefault(context?: PortalContext) {
  return context ?? getPortalContext();
}

export async function getOrganizations(context?: PortalContext) {
  const ctx = await contextOrDefault(context);

  return [ctx.organization];
}

export async function getVenues(context?: PortalContext) {
  const ctx = await contextOrDefault(context);
  const { data, error } = await ctx.supabase
    .from("venues")
    .select("*")
    .eq("organization_id", ctx.organization.id)
    .order("name", { ascending: true });

  if (error) {
    raiseQueryError("venues", error.message);
  }

  return data ?? [];
}

export async function getEvents(context?: PortalContext) {
  const ctx = await contextOrDefault(context);
  const { data, error } = await ctx.supabase
    .from("events")
    .select("*")
    .eq("organization_id", ctx.organization.id)
    .order("starts_at", { ascending: true });

  if (error) {
    raiseQueryError("events", error.message);
  }

  return data ?? [];
}

export async function getCreators(context?: PortalContext) {
  const ctx = await contextOrDefault(context);
  const { data, error } = await ctx.supabase
    .from("creators")
    .select("*")
    .eq("organization_id", ctx.organization.id)
    .order("display_name", { ascending: true });

  if (error) {
    raiseQueryError("creators", error.message);
  }

  return data ?? [];
}

export async function getAssignments(context?: PortalContext) {
  const ctx = await contextOrDefault(context);
  const { data, error } = await ctx.supabase
    .from("assignments")
    .select("*")
    .eq("organization_id", ctx.organization.id)
    .order("starts_at", { ascending: true });

  if (error) {
    raiseQueryError("assignments", error.message);
  }

  return data ?? [];
}

export async function getAthletes(context?: PortalContext) {
  const ctx = await contextOrDefault(context);
  const { data, error } = await ctx.supabase
    .from("athletes")
    .select("*")
    .eq("organization_id", ctx.organization.id)
    .order("last_name", { ascending: true })
    .order("first_name", { ascending: true });

  if (error) {
    raiseQueryError("athletes", error.message);
  }

  return data ?? [];
}

export async function getSchools(context?: PortalContext) {
  const ctx = await contextOrDefault(context);
  const { data, error } = await ctx.supabase
    .from("schools")
    .select("*")
    .eq("organization_id", ctx.organization.id)
    .order("name", { ascending: true });

  if (error) {
    raiseQueryError("schools", error.message);
  }

  return data ?? [];
}

export async function getSponsors(context?: PortalContext) {
  const ctx = await contextOrDefault(context);
  const { data, error } = await ctx.supabase
    .from("sponsors")
    .select("*")
    .eq("organization_id", ctx.organization.id)
    .order("name", { ascending: true });

  if (error) {
    raiseQueryError("sponsors", error.message);
  }

  return data ?? [];
}

export async function getDeliverables(context?: PortalContext) {
  const ctx = await contextOrDefault(context);
  const { data, error } = await ctx.supabase
    .from("deliverables")
    .select("*")
    .eq("organization_id", ctx.organization.id)
    .order("due_at", { ascending: true });

  if (error) {
    raiseQueryError("deliverables", error.message);
  }

  return data ?? [];
}

export async function getMediaRequests(context?: PortalContext) {
  const ctx = await contextOrDefault(context);
  const { data, error } = await ctx.supabase
    .from("media_requests")
    .select("*")
    .eq("organization_id", ctx.organization.id)
    .order("due_at", { ascending: true, nullsFirst: false });

  if (error) {
    raiseQueryError("media_requests", error.message);
  }

  return data ?? [];
}

export async function getNotifications(context?: PortalContext) {
  const ctx = await contextOrDefault(context);
  const { data, error } = await ctx.supabase
    .from("notifications")
    .select("*")
    .eq("organization_id", ctx.organization.id)
    .order("created_at", { ascending: false });

  if (error) {
    raiseQueryError("notifications", error.message);
  }

  return data ?? [];
}

export async function getMediaFiles(context?: PortalContext) {
  const ctx = await contextOrDefault(context);
  const { data, error } = await ctx.supabase
    .from("media_files")
    .select("*")
    .eq("organization_id", ctx.organization.id)
    .order("uploaded_at", { ascending: false });

  if (error) {
    raiseQueryError("media_files", error.message);
  }

  return data ?? [];
}

export async function getStorageUsage(context?: PortalContext) {
  const ctx = await contextOrDefault(context);
  const { data, error } = await ctx.supabase
    .from("storage_usage")
    .select("*")
    .eq("organization_id", ctx.organization.id)
    .order("calculated_at", { ascending: false });

  if (error) {
    raiseQueryError("storage_usage", error.message);
  }

  return data ?? [];
}

async function getRecruitLookRecords(): Promise<RecruitLookRecords> {
  const context = await getPortalContext();
  const [
    organizations,
    venues,
    events,
    creators,
    assignments,
    athletes,
    schools,
    sponsors,
    deliverables,
    mediaRequests,
    notifications,
    mediaFiles,
    storageUsage,
  ] = await Promise.all([
    getOrganizations(context),
    getVenues(context),
    getEvents(context),
    getCreators(context),
    getAssignments(context),
    getAthletes(context),
    getSchools(context),
    getSponsors(context),
    getDeliverables(context),
    getMediaRequests(context),
    getNotifications(context),
    getMediaFiles(context),
    getStorageUsage(context),
  ]);

  return {
    assignments,
    athletes,
    creators,
    deliverables,
    events,
    mediaFiles,
    mediaRequests,
    notifications,
    organizations,
    schools,
    sponsors,
    storageUsage,
    venues,
  };
}

function mapsFor(records: RecruitLookRecords) {
  return {
    assignmentById: new Map(records.assignments.map((item) => [item.id, item])),
    athleteById: new Map(records.athletes.map((item) => [item.id, item])),
    creatorById: new Map(records.creators.map((item) => [item.id, item])),
    eventById: new Map(records.events.map((item) => [item.id, item])),
    schoolById: new Map(records.schools.map((item) => [item.id, item])),
    sponsorById: new Map(records.sponsors.map((item) => [item.id, item])),
    venueById: new Map(records.venues.map((item) => [item.id, item])),
  };
}

function isOpenAssignment(status: string) {
  return ["Draft", "Needs Review", "Pending", "Queued"].includes(status);
}

function isPendingDeliverable(status: string) {
  return ["Queued", "Needs Approval", "Editing", "Planned", "In Review"].includes(status);
}

function moduleStats(records: RecruitLookRecords, moduleId: ModuleId): StatSnapshot[] {
  const totalUsed = records.storageUsage[0]?.used_bytes ?? 0;
  const totalStorage = records.storageUsage[0]?.total_bytes ?? 0;

  const stats: Record<ModuleId, StatSnapshot[]> = {
    events: [
      { label: "Total events", value: `${records.events.length}`, detail: "RecruitLook event pipeline", tone: "primary" },
      { label: "Live today", value: `${records.events.filter((event) => titleCase(event.status) === "Live").length}`, detail: "Active coverage windows", tone: "success" },
      { label: "High priority", value: `${records.events.filter((event) => titleCase(event.media_priority) === "High").length}`, detail: "Director attention required", tone: "warning" },
    ],
    "media-library": [
      { label: "Files", value: `${records.mediaFiles.length}`, detail: "Structured media records", tone: "primary" },
      { label: "Ready", value: `${records.mediaFiles.filter((file) => titleCase(file.processing_status) === "Ready").length}`, detail: "Available for delivery", tone: "success" },
      { label: "Needs attention", value: `${records.mediaFiles.filter((file) => titleCase(file.processing_status) !== "Ready").length}`, detail: "Processing or tagging required", tone: "warning" },
    ],
    upload: [
      { label: "Upload batches", value: `${new Set(records.mediaFiles.map((file) => file.assignment_id ?? file.event_id)).size}`, detail: "Grouped by event, creator, and capture window", tone: "primary" },
      { label: "Processing", value: `${records.mediaFiles.filter((file) => titleCase(file.processing_status) === "Processing").length}`, detail: "Awaiting metadata completion", tone: "warning" },
      { label: "Needs tags", value: `${records.mediaFiles.filter((file) => titleCase(file.processing_status) === "Needs Tags").length}`, detail: "Manual review required", tone: "destructive" },
    ],
    creators: [
      { label: "Creators", value: `${records.creators.length}`, detail: "Active production bench", tone: "primary" },
      { label: "Confirmed", value: `${records.creators.filter((creator) => titleCase(creator.status) === "Confirmed").length}`, detail: "Ready for assigned work", tone: "success" },
      { label: "Editors", value: `${records.creators.filter((creator) => titleCase(creator.role) === "Editor").length}`, detail: "Post-production capacity", tone: "cyan" },
    ],
    assignments: [
      { label: "Assignments", value: `${records.assignments.length}`, detail: "Coverage and edit work orders", tone: "primary" },
      { label: "Open", value: `${records.assignments.filter((assignment) => isOpenAssignment(titleCase(assignment.status))).length}`, detail: "Needs scheduling action", tone: "warning" },
      { label: "High priority", value: `${records.assignments.filter((assignment) => titleCase(assignment.priority) === "High").length}`, detail: "Director review queue", tone: "destructive" },
    ],
    athletes: [
      { label: "Athletes", value: `${records.athletes.length}`, detail: "RecruitLook profile records", tone: "primary" },
      { label: "Needs media", value: `${records.athletes.filter((athlete) => titleCase(athlete.profile_status) === "Needs Media").length}`, detail: "Profiles missing current assets", tone: "warning" },
      { label: "Offered", value: `${records.athletes.filter((athlete) => titleCase(athlete.recruiting_status) === "Offered").length}`, detail: "Tracked recruiting momentum", tone: "success" },
    ],
    schools: [
      { label: "Schools", value: `${records.schools.length}`, detail: "Verified program records", tone: "primary" },
      { label: "Illinois programs", value: `${records.schools.filter((school) => school.state === "IL").length}`, detail: "Primary RecruitLook market", tone: "success" },
      { label: "Linked athletes", value: `${records.athletes.length}`, detail: "Athletes attached to schools", tone: "cyan" },
    ],
    sponsors: [
      { label: "Sponsors", value: `${records.sponsors.length}`, detail: "Active partner records", tone: "primary" },
      { label: "Deliverables due", value: `${records.sponsors.reduce((sum, sponsor) => sum + sponsor.deliverables_due, 0)}`, detail: "Contracted content obligations", tone: "warning" },
      { label: "Premier and Gold", value: `${records.sponsors.filter((sponsor) => ["Premier", "Gold"].includes(titleCase(sponsor.tier))).length}`, detail: "High-touch partners", tone: "success" },
    ],
    deliverables: [
      { label: "Deliverables", value: `${records.deliverables.length}`, detail: "Active package records", tone: "primary" },
      { label: "Due soon", value: `${records.deliverables.filter((deliverable) => isPendingDeliverable(titleCase(deliverable.status))).length}`, detail: "Packages requiring work", tone: "warning" },
      { label: "Sponsor packages", value: `${records.deliverables.filter((deliverable) => deliverable.sponsor_id).length}`, detail: "Partner obligations", tone: "cyan" },
    ],
    requests: [
      { label: "Requests", value: `${records.mediaRequests.length}`, detail: "Active intake records", tone: "primary" },
      { label: "High priority", value: `${records.mediaRequests.filter((request) => titleCase(request.priority) === "High").length}`, detail: "Needs immediate routing", tone: "destructive" },
      { label: "In progress", value: `${records.mediaRequests.filter((request) => titleCase(request.status) === "In Progress").length}`, detail: "Currently assigned", tone: "warning" },
    ],
    analytics: [
      { label: "Delivery SLA", value: "86%", detail: "Packages delivered within target window", tone: "success" },
      { label: "Avg ingest time", value: records.mediaFiles.length ? "47 min" : "0 min", detail: "Upload to processed metadata", tone: "cyan" },
      { label: "At-risk items", value: `${records.mediaRequests.filter((request) => titleCase(request.priority) === "High").length + records.deliverables.filter((deliverable) => titleCase(deliverable.priority) === "High").length}`, detail: "Requests or deliverables nearing due date", tone: "warning" },
    ],
    settings: [
      { label: "Organization", value: titleCase(records.organizations[0]?.status), detail: `${recruitLookTenantName} tenant record`, tone: "success" },
      { label: "Role model", value: "10 roles", detail: "Owner through viewer access structure", tone: "primary" },
      { label: "Storage limit", value: totalStorage ? tbToDisplay(totalStorage) : "0 TB", detail: "Allocation before R2 connection", tone: "cyan" },
    ],
  };

  if (moduleId === "settings" && totalUsed) {
    stats.settings[2] = {
      label: "Storage used",
      value: tbToDisplay(totalUsed),
      detail: `${totalStorage ? Math.round((totalUsed / totalStorage) * 100) : 0}% of tenant allocation`,
      tone: "cyan",
    };
  }

  return stats[moduleId];
}

function moduleCards(records: RecruitLookRecords, moduleId: ModuleId): ModuleCardData[] {
  const storage = records.storageUsage[0];

  const cards: Record<ModuleId, ModuleCardData[]> = {
    events: [
      { label: "Coverage density", value: `${records.venues.reduce((sum, venue) => sum + venue.court_count, 0)} courts`, detail: "Total courts across active pipeline", tone: "cyan" },
      { label: "Venue markets", value: `${new Set(records.venues.map((venue) => venue.state)).size}`, detail: "States covered in the RecruitLook pipeline", tone: "neutral" },
    ],
    "media-library": [
      { label: "Video records", value: `${records.mediaFiles.filter((file) => titleCase(file.file_type) === "Video").length}`, detail: "Long-form and vertical files", tone: "cyan" },
      { label: "Tagged for sponsors", value: `${records.mediaFiles.filter((file) => file.sponsor_id).length}`, detail: "Linked to sponsor obligations", tone: "primary" },
    ],
    upload: [
      { label: "Media volume", value: storage ? tbToDisplay(storage.used_bytes) : bytesToDisplay(records.mediaFiles.reduce((sum, file) => sum + file.size_bytes, 0)), detail: "Total tracked upload footprint", tone: "neutral" },
      { label: "Routing SLA", value: "92%", detail: "Files routed within 12 hours", tone: "success" },
    ],
    creators: [
      { label: "Coverage markets", value: `${new Set(records.creators.map((creator) => creator.home_market)).size}`, detail: "Markets represented in the production bench", tone: "cyan" },
      { label: "Avg rating", value: average(records.creators.map((creator) => creator.rating ?? 0)).toFixed(1), detail: "Internal RecruitLook production score", tone: "success" },
    ],
    assignments: [
      { label: "Same-day edit capacity", value: `${records.creators.filter((creator) => titleCase(creator.role) === "Editor").length} editors`, detail: "Remote queue assigned", tone: "cyan" },
      { label: "Court locks needed", value: `${records.assignments.filter((assignment) => titleCase(assignment.status) === "Draft" || titleCase(assignment.status) === "Pending").length}`, detail: "Assignments still need final court mapping", tone: "warning" },
    ],
    athletes: [
      { label: "Profile completeness", value: `${completionRate(records.athletes.filter((athlete) => titleCase(athlete.profile_status) === "Active").length, records.athletes.length)}%`, detail: "Athletes with current media and school data", tone: "cyan" },
      { label: "Class mix", value: classRange(records.athletes), detail: "Recruiting classes represented", tone: "neutral" },
    ],
    schools: [
      { label: "Coach request coverage", value: `${records.mediaRequests.filter((request) => titleCase(request.requester_type) === "Coach").length} active`, detail: "Requests tied to school/team records", tone: "warning" },
      { label: "Program media sets", value: `${records.schools.length}`, detail: "School galleries ready for delivery mapping", tone: "cyan" },
    ],
    sponsors: [
      { label: "Sponsor media records", value: `${records.mediaFiles.filter((file) => file.sponsor_id).length}`, detail: "Assets already linked to sponsors", tone: "cyan" },
      { label: "Renewals", value: `${records.sponsors.filter((sponsor) => titleCase(sponsor.contract_status) === "Renewal").length}`, detail: "Renewal partners requiring recap proof", tone: "warning" },
    ],
    deliverables: [
      { label: "Approval queue", value: `${records.deliverables.filter((deliverable) => titleCase(deliverable.status) === "Needs Approval").length}`, detail: "Packages waiting on director or sponsor signoff", tone: "destructive" },
      { label: "Assets committed", value: `${records.deliverables.reduce((sum, deliverable) => sum + deliverable.asset_count, 0)}`, detail: "Photos, clips, reels, and galleries across queue", tone: "success" },
    ],
    requests: [
      { label: "Parent and coach requests", value: `${records.mediaRequests.filter((request) => ["Parent", "Coach"].includes(titleCase(request.requester_type))).length}`, detail: "Family and team delivery workflows", tone: "cyan" },
      { label: "Sponsor requests", value: `${records.mediaRequests.filter((request) => titleCase(request.requester_type) === "Sponsor").length}`, detail: "Partner proof and recap workflows", tone: "warning" },
    ],
    analytics: [
      { label: "Storage trajectory", value: "+14%", detail: "Projected growth over next 30 days", tone: "warning" },
      { label: "Download velocity", value: "38", detail: "Recent stakeholder downloads", tone: "cyan" },
    ],
    settings: [
      { label: "Tenant ID", value: records.organizations[0]?.slug ?? recruitLookTenantSlug, detail: "Primary workspace for production buildout", tone: "primary" },
      { label: "Next connection", value: "Clerk JWT", detail: "Replace server-side service reads with RLS-backed user tokens", tone: "warning" },
    ],
  };

  return cards[moduleId];
}

function average(values: number[]) {
  const filtered = values.filter((value) => value > 0);
  if (!filtered.length) return 0;
  return filtered.reduce((sum, value) => sum + value, 0) / filtered.length;
}

function completionRate(complete: number, total: number) {
  if (!total) return 0;
  return Math.round((complete / total) * 100);
}

function classRange(athletes: AthleteRow[]) {
  const years = athletes.map((athlete) => athlete.graduation_year).sort();
  if (!years.length) return "None";
  return years[0] === years[years.length - 1] ? `${years[0]}` : `${years[0]}-${years[years.length - 1]}`;
}

function buildEventRows(records: RecruitLookRecords) {
  const { venueById } = mapsFor(records);

  return records.events.map((event) => {
    const venue = event.venue_id ? venueById.get(event.venue_id) : null;
    const status = titleCase(event.status);
    const priority = titleCase(event.media_priority);

    return row(
      event.id,
      {
        name: event.name,
        date: formatShortDate(event.starts_at),
        venue: venue ? `${venue.name}, ${venue.state}` : "Unassigned",
        courts: event.courts.join(", "),
        ageGroups: event.age_groups.join(", "),
        status,
        priority,
      },
      { status, priority },
    );
  });
}

function buildMediaRows(records: RecruitLookRecords) {
  const { creatorById, eventById } = mapsFor(records);

  return records.mediaFiles.map((file) => {
    const event = file.event_id ? eventById.get(file.event_id) : null;
    const creator = file.creator_id ? creatorById.get(file.creator_id) : null;
    const status = titleCase(file.processing_status);
    const type = titleCase(file.file_type);
    const visibility = titleCase(file.visibility);

    return row(
      file.id,
      {
        fileName: file.file_name,
        type,
        event: event?.name ?? "Unassigned",
        creator: creator?.display_name ?? "Unassigned",
        status,
        visibility,
        uploadedAt: formatShortDateTime(file.uploaded_at),
        size: bytesToDisplay(file.size_bytes),
      },
      { status, type, visibility },
    );
  });
}

function buildCreatorRows(records: RecruitLookRecords) {
  return records.creators.map((creator) => {
    const role = titleCase(creator.role);
    const status = titleCase(creator.status);

    return row(
      creator.id,
      {
        name: creator.display_name,
        role,
        market: creator.home_market,
        specialties: creator.specialties.join(", "),
        status,
        rating: creator.rating?.toFixed(1) ?? "Unrated",
      },
      { status, role },
    );
  });
}

function buildAssignmentRows(records: RecruitLookRecords) {
  const { creatorById, eventById } = mapsFor(records);

  return records.assignments.map((assignment) => {
    const event = assignment.event_id ? eventById.get(assignment.event_id) : null;
    const creator = assignment.creator_id ? creatorById.get(assignment.creator_id) : null;
    const type = titleCase(assignment.assignment_type);
    const status = titleCase(assignment.status);
    const priority = titleCase(assignment.priority);

    return row(
      assignment.id,
      {
        title: assignment.title,
        event: event?.name ?? "Unassigned",
        creator: creator?.display_name ?? "Unassigned",
        type,
        court: assignment.court ?? "Unassigned",
        status,
        priority,
      },
      { status, type, priority },
    );
  });
}

function buildAthleteRows(records: RecruitLookRecords) {
  const { schoolById } = mapsFor(records);

  return records.athletes.map((athlete) => {
    const school = athlete.school_id ? schoolById.get(athlete.school_id) : null;
    const recruitingStatus = titleCase(athlete.recruiting_status);
    const profileStatus = titleCase(athlete.profile_status);

    return row(
      athlete.id,
      {
        name: `${athlete.first_name} ${athlete.last_name}`,
        school: school?.name ?? "Unassigned",
        graduationYear: athlete.graduation_year,
        position: athlete.position,
        recruitingStatus,
        profileStatus,
      },
      {
        graduationYear: `${athlete.graduation_year}`,
        position: athlete.position,
        status: profileStatus,
      },
    );
  });
}

function buildSchoolRows(records: RecruitLookRecords) {
  return records.schools.map((school) =>
    row(
      school.id,
      {
        name: school.name,
        city: school.city,
        state: school.state,
        classification: school.classification ?? "Unassigned",
        conference: school.conference ?? "Unassigned",
        athletes: records.athletes.filter((athlete) => athlete.school_id === school.id).length,
        status: "Verified",
      },
      { conference: school.conference ?? "Unassigned", status: "Verified" },
    ),
  );
}

function buildSponsorRows(records: RecruitLookRecords) {
  return records.sponsors.map((sponsor) => {
    const status = titleCase(sponsor.contract_status);
    const tier = titleCase(sponsor.tier);

    return row(
      sponsor.id,
      {
        name: sponsor.name,
        category: sponsor.category,
        tier,
        status,
        contact: sponsor.contact_name ?? "Unassigned",
        deliverablesDue: sponsor.deliverables_due,
      },
      { status, tier },
    );
  });
}

function buildDeliverableRows(records: RecruitLookRecords) {
  const { eventById } = mapsFor(records);

  return records.deliverables.map((deliverable) => {
    const event = deliverable.event_id ? eventById.get(deliverable.event_id) : null;
    const status = titleCase(deliverable.status);
    const priority = titleCase(deliverable.priority);

    return row(
      deliverable.id,
      {
        title: deliverable.title,
        type: deliverable.deliverable_type,
        event: event?.name ?? "Unassigned",
        dueAt: formatShortDate(deliverable.due_at),
        status,
        priority,
        assetCount: deliverable.asset_count,
      },
      { status, priority },
    );
  });
}

function buildRequestRows(records: RecruitLookRecords) {
  const { eventById } = mapsFor(records);

  return records.mediaRequests.map((request) => {
    const event = request.event_id ? eventById.get(request.event_id) : null;
    const requesterType = titleCase(request.requester_type);
    const status = titleCase(request.status);
    const priority = titleCase(request.priority);

    return row(
      request.id,
      {
        title: request.title,
        requester: request.requester_name,
        requesterType,
        event: event?.name ?? "Unassigned",
        dueAt: formatShortDate(request.due_at),
        status,
        priority,
      },
      { requesterType, status, priority },
    );
  });
}

function buildAnalyticsRows(records: RecruitLookRecords) {
  return [
    row("analytics-delivery-sla", { metric: "Delivery SLA", area: "Deliverables", current: "86%", target: "90%", status: "In Progress", owner: "Media Director" }, { area: "Deliverables", status: "In Progress" }),
    row("analytics-creator-fill", { metric: "Creator fill rate", area: "Creators", current: `${completionRate(records.assignments.filter((assignment) => assignment.creator_id).length, records.assignments.length)}%`, target: "95%", status: "Needs Review", owner: "Operations" }, { area: "Creators", status: "Needs Review" }),
    row("analytics-ingest", { metric: "Median ingest time", area: "Storage", current: "47 min", target: "60 min", status: "Ready", owner: "Media Ops" }, { area: "Storage", status: "Ready" }),
    row("analytics-sponsor", { metric: "Sponsor package completion", area: "Sponsors", current: `${completionRate(records.deliverables.filter((deliverable) => deliverable.sponsor_id).length, records.deliverables.length)}%`, target: "85%", status: "In Progress", owner: "Partnerships" }, { area: "Sponsors", status: "In Progress" }),
    row("analytics-coverage", { metric: "High-priority court coverage", area: "Events", current: `${records.events.filter((event) => titleCase(event.media_priority) === "High").length}`, target: "All high-priority events", status: "Ready", owner: "Event Lead" }, { area: "Events", status: "Ready" }),
  ];
}

function buildSettingsRows(records: RecruitLookRecords) {
  const organization = records.organizations[0];
  const storage = records.storageUsage[0];

  return [
    row("settings-org", { setting: "Tenant slug", domain: "Organization", value: organization?.slug ?? recruitLookTenantSlug, owner: "Owner", status: "Configured" }, { domain: "Organization", status: "Configured" }),
    row("settings-timezone", { setting: "Workspace timezone", domain: "Organization", value: organization?.timezone ?? "America/Chicago", owner: "Admin", status: "Configured" }, { domain: "Organization", status: "Configured" }),
    row("settings-roles", { setting: "Role structure", domain: "Access", value: "owner, media_director, admin, creators, coach, sponsor, viewer", owner: "Owner", status: "Configured" }, { domain: "Access", status: "Configured" }),
    row("settings-supabase", { setting: "Supabase database", domain: "Storage", value: "Live reads connected", owner: "Engineering", status: "Ready" }, { domain: "Storage", status: "Ready" }),
    row("settings-r2", { setting: "Cloudflare R2", domain: "Storage", value: "Planned integration", owner: "Engineering", status: "Needs Key" }, { domain: "Storage", status: "Needs Key" }),
    row("settings-storage", { setting: "Storage snapshot", domain: "Storage", value: storage ? `${tbToDisplay(storage.used_bytes)} used` : "No snapshot", owner: "Engineering", status: "Ready" }, { domain: "Storage", status: "Ready" }),
    row("settings-audit", { setting: "Audit logging", domain: "Audit", value: "Schema ready", owner: "Engineering", status: "Ready" }, { domain: "Audit", status: "Ready" }),
  ];
}

function rowsForModule(records: RecruitLookRecords, moduleId: ModuleId) {
  const rows: Record<ModuleId, ModuleRow[]> = {
    events: buildEventRows(records),
    "media-library": buildMediaRows(records),
    upload: buildMediaRows(records),
    creators: buildCreatorRows(records),
    assignments: buildAssignmentRows(records),
    athletes: buildAthleteRows(records),
    schools: buildSchoolRows(records),
    sponsors: buildSponsorRows(records),
    deliverables: buildDeliverableRows(records),
    requests: buildRequestRows(records),
    analytics: buildAnalyticsRows(records),
    settings: buildSettingsRows(records),
  };

  return rows[moduleId];
}

export async function getOperationsModuleData(
  moduleId: ModuleId,
  searchParams: SearchParamsRecord = {},
): Promise<ModulePageData> {
  const records = await getRecruitLookRecords();
  const chrome = getModuleChrome(moduleId);
  const rows = applyModuleFilters(rowsForModule(records, moduleId), searchParams);

  return {
    ...chrome,
    cards: moduleCards(records, moduleId),
    rows,
    stats: moduleStats(records, moduleId),
  };
}

export async function getRecruitLookDashboardData() {
  const records = await getRecruitLookRecords();
  const eventRows = buildEventRows(records);
  const assignmentRows = buildAssignmentRows(records);
  const uploadRows = buildMediaRows(records);
  const deliverableRows = buildDeliverableRows(records);
  const requestRows = buildRequestRows(records);
  const storage = records.storageUsage[0];
  const metrics = getDashboardMetrics(records);

  return {
    metrics,
    storageCard: {
      detail: storage
        ? `${records.mediaFiles.length} media records, ${Math.round((storage.used_bytes / storage.total_bytes) * 100)}% of tenant allocation`
        : `${records.mediaFiles.length} media records tracked`,
      value: storage ? tbToDisplay(storage.used_bytes) : bytesToDisplay(records.mediaFiles.reduce((sum, file) => sum + file.size_bytes, 0)),
    },
    creatorActivityCard: {
      detail: "Confirmed and active creators across capture and edit queues",
      value: `${records.creators.filter((creator) => titleCase(creator.status) !== "Hold").length} active`,
    },
    tables: {
      notificationColumns,
      todayEvents: eventRows.filter((item) => item.values.status === "Live"),
      upcomingEvents: eventRows.filter((item) => item.values.status !== "Live").slice(0, 4),
      openAssignments: assignmentRows.filter((item) => isOpenAssignment(String(item.values.status))),
      recentUploads: uploadRows.slice(0, 6),
      pendingDeliverables: deliverableRows.filter((item) => isPendingDeliverable(String(item.values.status))),
      sponsorDeliverables: deliverableRows.filter((item) =>
        String(item.values.type).toLowerCase().includes("sponsor"),
      ),
      recentRequests: requestRows.slice(0, 6),
      notifications: records.notifications.map((notification) =>
        row(
          notification.id,
          {
            title: notification.title,
            body: notification.body,
            type: titleCase(notification.notification_type),
            severity: titleCase(notification.severity),
          },
          { severity: titleCase(notification.severity) },
        ),
      ),
    },
  };
}

function getDashboardMetrics(records: RecruitLookRecords): StatSnapshot[] {
  const storage = records.storageUsage[0];
  const usedBytes = storage?.used_bytes ?? 0;
  const totalBytes = storage?.total_bytes ?? 0;

  return [
    {
      label: "Today's Events",
      value: `${records.events.filter((event) => titleCase(event.status) === "Live").length}`,
      detail: "Active event coverage windows",
      tone: "success",
    },
    {
      label: "Upcoming Events",
      value: `${records.events.filter((event) => titleCase(event.status) !== "Live").length}`,
      detail: "Locked and planned RecruitLook events",
      tone: "cyan",
    },
    {
      label: "Open Assignments",
      value: `${records.assignments.filter((assignment) => isOpenAssignment(titleCase(assignment.status))).length}`,
      detail: "Creator accepts, court locks, and edit queues",
      tone: "warning",
    },
    {
      label: "Recent Uploads",
      value: `${records.mediaFiles.length}`,
      detail: "Photos and video metadata from live Supabase",
      tone: "primary",
    },
    {
      label: "Pending Deliverables",
      value: `${records.deliverables.filter((deliverable) => isPendingDeliverable(titleCase(deliverable.status))).length}`,
      detail: "Athlete, team, event, and sponsor packages",
      tone: "warning",
    },
    {
      label: "Storage Used",
      value: usedBytes ? tbToDisplay(usedBytes) : "0 TB",
      detail: `${totalBytes ? Math.round((usedBytes / totalBytes) * 100) : 0}% of RecruitLook allocation`,
      tone: "neutral",
    },
    {
      label: "Creator Activity",
      value: `${records.creators.filter((creator) => titleCase(creator.status) !== "Hold").length}`,
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
      value: `${records.deliverables.filter((deliverable) => deliverable.sponsor_id).length}`,
      detail: "Contracted sponsor media packages in motion",
      tone: "primary",
    },
    {
      label: "Recent Requests",
      value: `${records.mediaRequests.length}`,
      detail: "Media requests requiring routing or approvals",
      tone: "warning",
    },
  ];
}
