-- RecruitLook Hoops seed data
-- Apply after schema.sql. This file uses fixed IDs so the seed can be re-run
-- safely while preserving relationships for local and staging environments.

insert into public.organizations (
  id,
  name,
  slug,
  tenant_type,
  brand_color,
  status,
  timezone,
  storage_limit_gb,
  metadata
) values (
  '11111111-1111-4111-8111-111111111111',
  'RecruitLook Hoops',
  'recruitlook-hoops',
  'sports_organization',
  '#d8ff42',
  'active',
  'America/Chicago',
  3072,
  '{"primary_market":"Midwest","portal":"DOPE Portal","tenant_stage":"production_foundation"}'
) on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  tenant_type = excluded.tenant_type,
  brand_color = excluded.brand_color,
  status = excluded.status,
  timezone = excluded.timezone,
  storage_limit_gb = excluded.storage_limit_gb,
  metadata = excluded.metadata;

insert into public.user_profiles (
  id,
  clerk_user_id,
  email,
  full_name,
  title
) values (
  '22222222-2222-4222-8222-222222222222',
  'seed_recruitlook_owner',
  'owner@recruitlook.example',
  'RecruitLook Media Director',
  'Media Director'
) on conflict (id) do update set
  clerk_user_id = excluded.clerk_user_id,
  email = excluded.email,
  full_name = excluded.full_name,
  title = excluded.title;

insert into public.organization_members (
  id,
  organization_id,
  user_profile_id,
  clerk_user_id,
  role,
  status,
  joined_at
) values (
  '33333333-3333-4333-8333-333333333333',
  '11111111-1111-4111-8111-111111111111',
  '22222222-2222-4222-8222-222222222222',
  'seed_recruitlook_owner',
  'owner',
  'active',
  now()
) on conflict (id) do update set
  role = excluded.role,
  status = excluded.status,
  joined_at = excluded.joined_at;

insert into public.venues (
  id,
  organization_id,
  name,
  city,
  state,
  address,
  timezone,
  court_count,
  contact_name,
  notes
) values
  ('00000000-0000-4000-8000-000000000001', '11111111-1111-4111-8111-111111111111', 'Fieldhouse USA Frisco', 'Frisco', 'TX', '6155 Sports Village Rd', 'America/Chicago', 12, 'Court Operations', 'Large-court complex for national showcase coverage.'),
  ('00000000-0000-4000-8000-000000000002', '11111111-1111-4111-8111-111111111111', 'Wintrust Sports Complex', 'Bedford Park', 'IL', '5499 W 65th St', 'America/Chicago', 8, 'Venue Desk', 'Primary Chicago-area RecruitLook coverage venue.'),
  ('00000000-0000-4000-8000-000000000003', '11111111-1111-4111-8111-111111111111', 'Legacy Center', 'Brighton', 'MI', '9299 Goble Dr', 'America/Detroit', 6, 'Facility Ops', 'Elite camp venue with interview area.'),
  ('00000000-0000-4000-8000-000000000004', '11111111-1111-4111-8111-111111111111', 'Louisville Expo Center', 'Louisville', 'KY', '937 Phillips Ln', 'America/Kentucky/Louisville', 10, 'Expo Sports Desk', 'Bracket finals and sponsor recap venue.'),
  ('00000000-0000-4000-8000-000000000005', '11111111-1111-4111-8111-111111111111', 'PACE Athletic Center', 'Kansas City', 'MO', '123 Courtline Ave', 'America/Chicago', 7, 'PACE Ops', 'Heartland circuit coverage hub.')
on conflict (id) do update set
  name = excluded.name,
  city = excluded.city,
  state = excluded.state,
  address = excluded.address,
  timezone = excluded.timezone,
  court_count = excluded.court_count,
  contact_name = excluded.contact_name,
  notes = excluded.notes;

insert into public.events (
  id,
  organization_id,
  venue_id,
  name,
  event_type,
  starts_at,
  ends_at,
  status,
  visibility,
  courts,
  age_groups,
  media_priority,
  notes
) values
  ('00000000-0000-4000-8000-000000002001', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000000002', 'RecruitLook Summer Showcase', 'Showcase', '2026-06-25 09:00:00-05', '2026-06-25 20:00:00-05', 'live', 'client', array['Court 1','Court 2','Court 3','Court 4','Court 5','Court 6','Court 7','Court 8'], array['15U','16U','17U'], 'high', 'Active coverage day with sponsor boards and player portrait station.'),
  ('00000000-0000-4000-8000-000000002002', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000000003', 'Elite 150 Midwest', 'Camp', '2026-06-27 08:30:00-04', '2026-06-28 17:00:00-04', 'locked', 'client', array['Court 1','Court 2','Court 3','Court 4','Court 5','Court 6'], array['2027','2028','2029'], 'high', 'Camp format with check-in, interviews, and same-day edits.'),
  ('00000000-0000-4000-8000-000000002003', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000000002', 'Chicago Summer Jam', 'Tournament', '2026-07-10 09:00:00-05', '2026-07-12 19:00:00-05', 'planning', 'client', array['Court 1','Court 2','Court 3','Court 4','Court 5','Court 6','Court 7','Court 8'], array['14U','15U','16U','17U'], 'high', 'High-volume weekend tournament with sponsor preview requirements.'),
  ('00000000-0000-4000-8000-000000002004', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000000004', 'Bluegrass Tip-Off', 'Tournament', '2026-07-18 08:00:00-04', '2026-07-19 18:00:00-04', 'creator booking', 'internal', array['Court A','Court B','Court C','Court D','Court E','Court F','Court G','Court H','Court I','Court J'], array['16U','17U'], 'medium', 'Regional event with sponsor recap and bracket finals.'),
  ('00000000-0000-4000-8000-000000002005', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000000005', 'Heartland Prospect Circuit', 'Circuit', '2026-08-01 08:00:00-05', '2026-08-02 18:00:00-05', 'intake', 'internal', array['Court 1','Court 2','Court 3','Court 4','Court 5','Court 6','Court 7'], array['15U','16U','17U'], 'medium', 'Circuit stop with scout clip package and sports medicine activation.')
on conflict (id) do update set
  venue_id = excluded.venue_id,
  name = excluded.name,
  event_type = excluded.event_type,
  starts_at = excluded.starts_at,
  ends_at = excluded.ends_at,
  status = excluded.status,
  visibility = excluded.visibility,
  courts = excluded.courts,
  age_groups = excluded.age_groups,
  media_priority = excluded.media_priority,
  notes = excluded.notes;

insert into public.schools (
  id,
  organization_id,
  name,
  city,
  state,
  classification,
  conference,
  website,
  primary_contact
) values
  ('00000000-0000-4000-8000-000000001001', '11111111-1111-4111-8111-111111111111', 'Lane Tech', 'Chicago', 'IL', 'IHSA 4A', 'Public League Red', 'https://lanetech.org', 'Coach Alvarez'),
  ('00000000-0000-4000-8000-000000001002', '11111111-1111-4111-8111-111111111111', 'Simeon Career Academy', 'Chicago', 'IL', 'IHSA 4A', 'Chicago Public', 'https://simeonca.org', 'Coach Reynolds'),
  ('00000000-0000-4000-8000-000000001003', '11111111-1111-4111-8111-111111111111', 'Curie Metro', 'Chicago', 'IL', 'IHSA 4A', 'Chicago Public', 'https://curiemetro.org', 'Coach Watkins'),
  ('00000000-0000-4000-8000-000000001004', '11111111-1111-4111-8111-111111111111', 'Belleville East', 'Belleville', 'IL', 'IHSA 4A', 'Southwestern', 'https://bths201.org/east', 'Coach Miller'),
  ('00000000-0000-4000-8000-000000001005', '11111111-1111-4111-8111-111111111111', 'Bloom Township', 'Chicago Heights', 'IL', 'IHSA 4A', 'Southland', 'https://bloomhs.org', 'Coach Turner'),
  ('00000000-0000-4000-8000-000000001006', '11111111-1111-4111-8111-111111111111', 'Oak Park River Forest', 'Oak Park', 'IL', 'IHSA 4A', 'West Suburban', 'https://oprfhs.org', 'Coach Daniels'),
  ('00000000-0000-4000-8000-000000001007', '11111111-1111-4111-8111-111111111111', 'DePaul College Prep', 'Chicago', 'IL', 'IHSA 3A', 'Catholic League', 'https://depaulprep.org', 'Coach O''Brien'),
  ('00000000-0000-4000-8000-000000001008', '11111111-1111-4111-8111-111111111111', 'Glenbard West', 'Glen Ellyn', 'IL', 'IHSA 4A', 'West Suburban', 'https://gbw87.org', 'Coach Parker'),
  ('00000000-0000-4000-8000-000000001009', '11111111-1111-4111-8111-111111111111', 'Evanston Township', 'Evanston', 'IL', 'IHSA 4A', 'Central Suburban', 'https://eths.k12.il.us', 'Coach Hampton'),
  ('00000000-0000-4000-8000-000000001010', '11111111-1111-4111-8111-111111111111', 'Brother Rice', 'Chicago', 'IL', 'IHSA 4A', 'Catholic League', 'https://brotherrice.org', 'Coach Carey')
on conflict (id) do update set
  name = excluded.name,
  city = excluded.city,
  state = excluded.state,
  classification = excluded.classification,
  conference = excluded.conference,
  website = excluded.website,
  primary_contact = excluded.primary_contact;

insert into public.teams (
  id,
  organization_id,
  school_id,
  name,
  level,
  season,
  coach_name
) values
  ('00000000-0000-4000-8000-000000001101', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001001', 'Lane Tech Varsity', 'Varsity', '2026', 'Coach Alvarez'),
  ('00000000-0000-4000-8000-000000001102', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001002', 'Simeon Varsity', 'Varsity', '2026', 'Coach Reynolds'),
  ('00000000-0000-4000-8000-000000001103', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001003', 'Curie Varsity', 'Varsity', '2026', 'Coach Watkins')
on conflict (id) do update set
  school_id = excluded.school_id,
  name = excluded.name,
  level = excluded.level,
  season = excluded.season,
  coach_name = excluded.coach_name;

insert into public.athletes (
  id,
  organization_id,
  school_id,
  first_name,
  last_name,
  graduation_year,
  position,
  height,
  jersey_number,
  recruiting_status,
  hometown,
  instagram_handle,
  profile_status
) values
  ('00000000-0000-4000-8000-000000005001', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001001', 'Jalen', 'Brooks', 2027, 'PG', '6-1', '1', 'offered', 'Chicago, IL', '@jalenbrooks', 'needs media'),
  ('00000000-0000-4000-8000-000000005002', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001002', 'Marcus', 'Ellis', 2026, 'SG', '6-4', '2', 'watchlist', 'Chicago, IL', '@marcusellis', 'active'),
  ('00000000-0000-4000-8000-000000005003', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001003', 'Darius', 'King', 2028, 'SF', '6-6', '3', 'evaluation', 'Chicago, IL', '@dariusking', 'active'),
  ('00000000-0000-4000-8000-000000005004', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001004', 'Cam', 'Porter', 2027, 'PF', '6-8', '4', 'offered', 'Belleville, IL', '@camporter', 'active'),
  ('00000000-0000-4000-8000-000000005005', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001005', 'Tyrese', 'Hill', 2026, 'C', '6-10', '5', 'committed', 'Chicago Heights, IL', '@tyresehill', 'needs media'),
  ('00000000-0000-4000-8000-000000005006', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001006', 'Noah', 'Williams', 2028, 'PG', '6-0', '6', 'watchlist', 'Oak Park, IL', '@noahwilliams', 'active'),
  ('00000000-0000-4000-8000-000000005007', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001007', 'Elijah', 'Gray', 2027, 'SG', '6-3', '7', 'offered', 'Chicago, IL', '@elijahgray', 'active'),
  ('00000000-0000-4000-8000-000000005008', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001008', 'Miles', 'Avery', 2026, 'SF', '6-6', '8', 'evaluation', 'Glen Ellyn, IL', '@milesavery', 'active'),
  ('00000000-0000-4000-8000-000000005009', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001009', 'Kai', 'Thompson', 2029, 'PG', '5-11', '9', 'watchlist', 'Evanston, IL', '@kaithompson', 'needs media'),
  ('00000000-0000-4000-8000-000000005010', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001010', 'Jordan', 'Reed', 2027, 'PF', '6-7', '10', 'offered', 'Chicago, IL', '@jordanreed', 'active'),
  ('00000000-0000-4000-8000-000000005011', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001001', 'Malachi', 'Price', 2028, 'SG', '6-2', '11', 'evaluation', 'Chicago, IL', '@malachiprice', 'active'),
  ('00000000-0000-4000-8000-000000005012', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001002', 'Jaylen', 'Stone', 2026, 'PG', '6-1', '12', 'committed', 'Chicago, IL', '@jaylenstone', 'active'),
  ('00000000-0000-4000-8000-000000005013', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001003', 'Isaiah', 'Cross', 2027, 'C', '6-9', '13', 'watchlist', 'Chicago, IL', '@isaiahcross', 'needs media'),
  ('00000000-0000-4000-8000-000000005014', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001004', 'Zion', 'Mason', 2028, 'SF', '6-5', '14', 'evaluation', 'Belleville, IL', '@zionmason', 'active'),
  ('00000000-0000-4000-8000-000000005015', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001005', 'Carter', 'Finn', 2027, 'SG', '6-3', '15', 'offered', 'Chicago Heights, IL', '@carterfinn', 'active'),
  ('00000000-0000-4000-8000-000000005016', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001006', 'Lamar', 'Hayes', 2026, 'PF', '6-8', '16', 'watchlist', 'Oak Park, IL', '@lamarhayes', 'active'),
  ('00000000-0000-4000-8000-000000005017', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001007', 'Kenji', 'Ross', 2028, 'PG', '5-10', '17', 'evaluation', 'Chicago, IL', '@kenjiross', 'needs media'),
  ('00000000-0000-4000-8000-000000005018', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001008', 'Omar', 'Davis', 2027, 'C', '6-11', '18', 'offered', 'Glen Ellyn, IL', '@omardavis', 'active'),
  ('00000000-0000-4000-8000-000000005019', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001009', 'Terrell', 'Wade', 2026, 'SF', '6-6', '19', 'committed', 'Evanston, IL', '@terrellwade', 'active'),
  ('00000000-0000-4000-8000-000000005020', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000001010', 'Micah', 'Bell', 2029, 'SG', '6-2', '20', 'watchlist', 'Chicago, IL', '@micahbell', 'active')
on conflict (id) do update set
  school_id = excluded.school_id,
  first_name = excluded.first_name,
  last_name = excluded.last_name,
  graduation_year = excluded.graduation_year,
  position = excluded.position,
  height = excluded.height,
  jersey_number = excluded.jersey_number,
  recruiting_status = excluded.recruiting_status,
  hometown = excluded.hometown,
  instagram_handle = excluded.instagram_handle,
  profile_status = excluded.profile_status;

insert into public.creators (
  id,
  organization_id,
  display_name,
  role,
  email,
  phone,
  home_market,
  rate_type,
  day_rate,
  status,
  specialties,
  equipment,
  rating
) values
  ('00000000-0000-4000-8000-000000003001', '11111111-1111-4111-8111-111111111111', 'Maya Carter', 'photographer', 'maya.carter@example.com', '312-555-0101', 'Chicago', 'day', 850, 'confirmed', array['Court action','Portraits'], '{"camera":"Sony A1","lenses":["70-200","24-70"],"lighting":"two strobes"}', 4.90),
  ('00000000-0000-4000-8000-000000003002', '11111111-1111-4111-8111-111111111111', 'DeAndre Miles', 'videographer', 'deandre.miles@example.com', '312-555-0102', 'Chicago', 'day', 950, 'confirmed', array['Game film','Vertical reels'], '{"camera":"Canon R5C","audio":"wireless lav","gimbal":"RS3 Pro"}', 4.80),
  ('00000000-0000-4000-8000-000000003003', '11111111-1111-4111-8111-111111111111', 'Sam Nguyen', 'editor', 'sam.nguyen@example.com', null, 'Remote', 'event', 700, 'active', array['Highlight edits','Captions'], '{"software":"Premiere Pro","turnaround":"same-day"}', 4.70),
  ('00000000-0000-4000-8000-000000003004', '11111111-1111-4111-8111-111111111111', 'Taylor Reed', 'photographer', 'taylor.reed@example.com', '313-555-0104', 'Detroit', 'day', 775, 'pending', array['Bench reactions','Sponsor boards'], '{"camera":"Nikon Z9","lenses":["70-200","35"]}', 4.60),
  ('00000000-0000-4000-8000-000000003005', '11111111-1111-4111-8111-111111111111', 'Avery Johnson', 'videographer', 'avery.johnson@example.com', '314-555-0105', 'St. Louis', 'day', 900, 'confirmed', array['Mic''d up','Recaps'], '{"camera":"Sony FX3","audio":"shotgun plus lav","gimbal":"RS4"}', 4.80),
  ('00000000-0000-4000-8000-000000003006', '11111111-1111-4111-8111-111111111111', 'Lena Martin', 'editor', 'lena.martin@example.com', null, 'Kansas City', 'event', 650, 'active', array['Social packages','Thumbnails'], '{"software":"DaVinci Resolve","delivery":"portal"}', 4.90),
  ('00000000-0000-4000-8000-000000003007', '11111111-1111-4111-8111-111111111111', 'Chris Barnes', 'photographer', 'chris.barnes@example.com', '502-555-0107', 'Louisville', 'day', 700, 'hold', array['Team photos','Awards'], '{"camera":"Canon R3","lighting":"portable kit"}', 4.50),
  ('00000000-0000-4000-8000-000000003008', '11111111-1111-4111-8111-111111111111', 'Riley Foster', 'videographer', 'riley.foster@example.com', '312-555-0108', 'Chicago', 'day', 875, 'confirmed', array['Vertical clips','Interviews'], '{"camera":"Blackmagic 6K","audio":"handheld mic","gimbal":"RS3"}', 4.70)
on conflict (id) do update set
  display_name = excluded.display_name,
  role = excluded.role,
  email = excluded.email,
  phone = excluded.phone,
  home_market = excluded.home_market,
  rate_type = excluded.rate_type,
  day_rate = excluded.day_rate,
  status = excluded.status,
  specialties = excluded.specialties,
  equipment = excluded.equipment,
  rating = excluded.rating;

insert into public.assignments (
  id,
  organization_id,
  event_id,
  creator_id,
  title,
  assignment_type,
  court,
  starts_at,
  ends_at,
  status,
  priority,
  shot_list,
  notes
) values
  ('00000000-0000-4000-8000-000000004001', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000003001', 'Court 1 live action', 'photo', 'Court 1', '2026-06-25 09:00:00-05', '2026-06-25 18:00:00-05', 'live', 'high', '["drives","bench","coach reactions"]', 'Prioritize top-25 matchup windows.'),
  ('00000000-0000-4000-8000-000000004002', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000003002', 'Court 2 vertical clips', 'video', 'Court 2', '2026-06-25 09:00:00-05', '2026-06-25 18:00:00-05', 'live', 'high', '["fast breaks","timeouts","interviews"]', 'Capture sponsor signage in first reel set.'),
  ('00000000-0000-4000-8000-000000004003', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000003008', 'Sponsor board capture', 'video', 'Courts 3-4', '2026-06-25 11:00:00-05', '2026-06-25 15:00:00-05', 'queued', 'high', '["Gatorade boards","Nike backdrop","BallerTV signage"]', 'Deliver selects to partnerships.'),
  ('00000000-0000-4000-8000-000000004004', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000003001', 'Athlete portrait station', 'photo', 'Lobby', '2026-06-25 12:00:00-05', '2026-06-25 16:00:00-05', 'needs review', 'medium', '["headshots","uniform details"]', 'Match athletes to profile queue before upload.'),
  ('00000000-0000-4000-8000-000000004005', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002002', '00000000-0000-4000-8000-000000003005', 'Elite 150 recap film', 'video', 'All courts', '2026-06-27 08:30:00-04', '2026-06-28 17:00:00-04', 'confirmed', 'high', '["check-in","skills","awards"]', 'Build two-minute recap plus vertical cutdowns.'),
  ('00000000-0000-4000-8000-000000004006', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002002', '00000000-0000-4000-8000-000000003003', 'Elite 150 same-day edits', 'edit', 'Remote', '2026-06-27 15:00:00-04', '2026-06-28 21:00:00-04', 'confirmed', 'high', '["daily recap","top plays"]', 'Use shared folder until R2 media storage is live.'),
  ('00000000-0000-4000-8000-000000004007', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002003', '00000000-0000-4000-8000-000000003004', 'Chicago Jam photo pool', 'photo', 'Courts 1-8', '2026-07-10 09:00:00-05', '2026-07-12 18:00:00-05', 'pending', 'high', '["bracket finals","team huddles"]', 'Awaiting creator acceptance.'),
  ('00000000-0000-4000-8000-000000004008', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002003', '00000000-0000-4000-8000-000000003008', 'Chicago Jam vertical reels', 'video', 'Feature games', '2026-07-10 12:00:00-05', '2026-07-12 19:00:00-05', 'pending', 'high', '["top plays","sponsor mentions"]', 'Coordinate with sponsor preview deliverable.'),
  ('00000000-0000-4000-8000-000000004009', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002004', '00000000-0000-4000-8000-000000003007', 'Bluegrass bracket finals', 'photo', 'Courts A-B', '2026-07-18 08:00:00-04', '2026-07-19 18:00:00-04', 'pending', 'medium', '["semifinals","championship","awards"]', 'Creator on hold pending travel confirmation.'),
  ('00000000-0000-4000-8000-000000004010', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002004', '00000000-0000-4000-8000-000000003005', 'Bluegrass sponsor recap', 'video', 'Main court', '2026-07-18 11:00:00-04', '2026-07-19 18:00:00-04', 'pending', 'medium', '["Spalding signage","crowd","championship"]', 'Sponsor recap due July 20.'),
  ('00000000-0000-4000-8000-000000004011', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002005', '00000000-0000-4000-8000-000000003001', 'Heartland court coverage', 'photo', 'Courts 1-7', '2026-08-01 08:00:00-05', '2026-08-02 18:00:00-05', 'draft', 'medium', '["prospects","coach interactions"]', 'Confirm travel after court schedule lands.'),
  ('00000000-0000-4000-8000-000000004012', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002005', '00000000-0000-4000-8000-000000003006', 'Heartland weekly package', 'edit', 'Remote', '2026-08-01 15:00:00-05', '2026-08-03 18:00:00-05', 'draft', 'medium', '["scout clips","sponsor rollup"]', 'Package for scout and sponsor distribution.')
on conflict (id) do update set
  event_id = excluded.event_id,
  creator_id = excluded.creator_id,
  title = excluded.title,
  assignment_type = excluded.assignment_type,
  court = excluded.court,
  starts_at = excluded.starts_at,
  ends_at = excluded.ends_at,
  status = excluded.status,
  priority = excluded.priority,
  shot_list = excluded.shot_list,
  notes = excluded.notes;

insert into public.sponsors (
  id,
  organization_id,
  name,
  category,
  contact_name,
  contact_email,
  tier,
  contract_status,
  start_date,
  end_date,
  deliverables_due,
  notes
) values
  ('00000000-0000-4000-8000-000000006001', '11111111-1111-4111-8111-111111111111', 'Nike EYBL', 'Apparel', 'Jordan Lee', 'jordan.lee@example.com', 'premier', 'active', '2026-01-01', '2026-12-31', 4, 'Premier event branding and recap proof.'),
  ('00000000-0000-4000-8000-000000006002', '11111111-1111-4111-8111-111111111111', 'Gatorade', 'Hydration', 'Renee Brooks', 'renee.brooks@example.com', 'gold', 'active', '2026-01-01', '2026-12-31', 2, 'Sideline and hydration activation content.'),
  ('00000000-0000-4000-8000-000000006003', '11111111-1111-4111-8111-111111111111', 'Hudl', 'Video platform', 'Chris Patel', 'chris.patel@example.com', 'gold', 'active', '2026-01-01', '2026-12-31', 3, 'Scout film and highlight proof packages.'),
  ('00000000-0000-4000-8000-000000006004', '11111111-1111-4111-8111-111111111111', 'BallerTV', 'Streaming', 'Mia Santos', 'mia.santos@example.com', 'silver', 'renewal', '2026-02-01', '2026-09-30', 1, 'Renewal proof needed from Chicago Summer Jam.'),
  ('00000000-0000-4000-8000-000000006005', '11111111-1111-4111-8111-111111111111', 'Spalding', 'Equipment', 'Andre Knox', 'andre.knox@example.com', 'silver', 'active', '2026-03-01', '2026-12-31', 2, 'Ball and award ceremony visuals.'),
  ('00000000-0000-4000-8000-000000006006', '11111111-1111-4111-8111-111111111111', 'Midwest Sports Medicine', 'Healthcare', 'Dr. Nina Page', 'nina.page@example.com', 'community', 'active', '2026-04-01', '2026-10-31', 1, 'Sports medicine activation and education content.')
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  contact_name = excluded.contact_name,
  contact_email = excluded.contact_email,
  tier = excluded.tier,
  contract_status = excluded.contract_status,
  start_date = excluded.start_date,
  end_date = excluded.end_date,
  deliverables_due = excluded.deliverables_due,
  notes = excluded.notes;

insert into public.media_files (
  id,
  organization_id,
  event_id,
  assignment_id,
  creator_id,
  athlete_id,
  sponsor_id,
  file_name,
  file_type,
  mime_type,
  storage_key,
  storage_provider,
  size_bytes,
  duration_seconds,
  captured_at,
  uploaded_at,
  processing_status,
  visibility,
  tags,
  metadata
) values
  ('00000000-0000-4000-8000-000000007001', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000004001', '00000000-0000-4000-8000-000000003001', '00000000-0000-4000-8000-000000005001', null, 'RLH_0625_C1_JalenBrooks_drive_001.jpg', 'photo', 'image/jpeg', 'recruitlook/2026/summer-showcase/photos/001.jpg', 'r2_pending', 19922944, null, '2026-06-25 10:12:00-05', '2026-06-25 18:00:00-05', 'needs tags', 'internal', array['court-1','drive'], '{"court":"1","camera":"Sony A1"}'),
  ('00000000-0000-4000-8000-000000007002', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000004001', '00000000-0000-4000-8000-000000003001', '00000000-0000-4000-8000-000000005001', null, 'RLH_0625_C1_JalenBrooks_finish_002.jpg', 'photo', 'image/jpeg', 'recruitlook/2026/summer-showcase/photos/002.jpg', 'r2_pending', 20971520, null, '2026-06-25 10:14:00-05', '2026-06-25 18:00:00-05', 'ready', 'client library', array['court-1','finish'], '{"court":"1"}'),
  ('00000000-0000-4000-8000-000000007003', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000004002', '00000000-0000-4000-8000-000000003002', null, null, 'RLH_0625_C2_Simeon_transition_003.mp4', 'video', 'video/mp4', 'recruitlook/2026/summer-showcase/video/003.mp4', 'r2_pending', 734003200, 42, '2026-06-25 11:04:00-05', '2026-06-25 18:05:00-05', 'ready', 'client library', array['court-2','transition'], '{"format":"vertical","fps":60}'),
  ('00000000-0000-4000-8000-000000007004', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000004003', '00000000-0000-4000-8000-000000003008', null, '00000000-0000-4000-8000-000000006002', 'RLH_0625_C4_Gatorade_board_004.jpg', 'photo', 'image/jpeg', 'recruitlook/2026/summer-showcase/sponsors/004.jpg', 'r2_pending', 22020096, null, '2026-06-25 11:20:00-05', '2026-06-25 18:12:00-05', 'ready', 'client library', array['gatorade','sponsor'], '{"activation":"sideline board"}'),
  ('00000000-0000-4000-8000-000000007005', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000004004', '00000000-0000-4000-8000-000000003001', '00000000-0000-4000-8000-000000005004', null, 'RLH_0625_Lobby_portrait_CamPorter_005.jpg', 'photo', 'image/jpeg', 'recruitlook/2026/summer-showcase/portraits/005.jpg', 'r2_pending', 24117248, null, '2026-06-25 12:10:00-05', '2026-06-25 18:18:00-05', 'processing', 'internal', array['portrait','cam-porter'], '{"station":"lobby"}'),
  ('00000000-0000-4000-8000-000000007006', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000004001', '00000000-0000-4000-8000-000000003001', '00000000-0000-4000-8000-000000005002', null, 'RLH_0625_C3_MarcusEllis_three_006.jpg', 'photo', 'image/jpeg', 'recruitlook/2026/summer-showcase/photos/006.jpg', 'r2_pending', 23068672, null, '2026-06-25 12:22:00-05', '2026-06-25 18:20:00-05', 'ready', 'client library', array['court-3','three'], '{"shot":"corner three"}'),
  ('00000000-0000-4000-8000-000000007007', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000004002', '00000000-0000-4000-8000-000000003002', null, null, 'RLH_0625_C2_DeAndreMiles_reel_007.mp4', 'video', 'video/mp4', 'recruitlook/2026/summer-showcase/video/007.mp4', 'r2_pending', 771751936, 48, '2026-06-25 12:30:00-05', '2026-06-25 18:28:00-05', 'ready', 'client library', array['reel','court-2'], '{"aspect":"9:16"}'),
  ('00000000-0000-4000-8000-000000007008', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000004001', '00000000-0000-4000-8000-000000003001', null, null, 'RLH_0625_C5_team_huddle_008.jpg', 'photo', 'image/jpeg', 'recruitlook/2026/summer-showcase/photos/008.jpg', 'r2_pending', 26214400, null, '2026-06-25 13:01:00-05', '2026-06-25 18:31:00-05', 'needs tags', 'internal', array['team','huddle'], '{"court":"5"}'),
  ('00000000-0000-4000-8000-000000007009', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000004003', '00000000-0000-4000-8000-000000003008', null, '00000000-0000-4000-8000-000000006001', 'RLH_0625_C6_sponsor_walkthrough_009.mp4', 'video', 'video/mp4', 'recruitlook/2026/summer-showcase/sponsors/009.mp4', 'r2_pending', 812646400, 55, '2026-06-25 13:20:00-05', '2026-06-25 18:40:00-05', 'ready', 'client library', array['nike','sponsor'], '{"activation":"walkthrough"}'),
  ('00000000-0000-4000-8000-000000007010', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000004001', '00000000-0000-4000-8000-000000003001', null, null, 'RLH_0625_C1_defensive_stop_010.jpg', 'photo', 'image/jpeg', 'recruitlook/2026/summer-showcase/photos/010.jpg', 'r2_pending', 28311552, null, '2026-06-25 14:00:00-05', '2026-06-25 18:48:00-05', 'processing', 'client library', array['defense','court-1'], '{}'),
  ('00000000-0000-4000-8000-000000007011', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002002', '00000000-0000-4000-8000-000000004005', '00000000-0000-4000-8000-000000003005', null, null, 'RLH_0627_Elite150_checkin_011.jpg', 'photo', 'image/jpeg', 'recruitlook/2026/elite-150/photos/011.jpg', 'r2_pending', 30408704, null, '2026-06-27 08:45:00-04', '2026-06-27 18:00:00-04', 'ready', 'client library', array['checkin','elite-150'], '{}'),
  ('00000000-0000-4000-8000-000000007012', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002002', '00000000-0000-4000-8000-000000004005', '00000000-0000-4000-8000-000000003005', null, null, 'RLH_0627_Elite150_warmups_012.mp4', 'video', 'video/mp4', 'recruitlook/2026/elite-150/video/012.mp4', 'r2_pending', 953155584, 63, '2026-06-27 09:20:00-04', '2026-06-27 18:10:00-04', 'ready', 'client library', array['warmups','elite-150'], '{}'),
  ('00000000-0000-4000-8000-000000007013', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002002', '00000000-0000-4000-8000-000000004005', '00000000-0000-4000-8000-000000003005', '00000000-0000-4000-8000-000000005007', null, 'RLH_0627_Elite150_interview_013.mp4', 'video', 'video/mp4', 'recruitlook/2026/elite-150/interviews/013.mp4', 'r2_pending', 975175680, 71, '2026-06-27 12:00:00-04', '2026-06-27 18:22:00-04', 'needs tags', 'internal', array['interview','elite-150'], '{"subject":"Elijah Gray"}'),
  ('00000000-0000-4000-8000-000000007014', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002002', '00000000-0000-4000-8000-000000004005', '00000000-0000-4000-8000-000000003005', null, null, 'RLH_0627_Elite150_awards_014.jpg', 'photo', 'image/jpeg', 'recruitlook/2026/elite-150/photos/014.jpg', 'r2_pending', 32505856, null, '2026-06-27 16:40:00-04', '2026-06-27 18:30:00-04', 'ready', 'client library', array['awards'], '{}'),
  ('00000000-0000-4000-8000-000000007015', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002002', '00000000-0000-4000-8000-000000004005', '00000000-0000-4000-8000-000000003005', null, null, 'RLH_0627_Elite150_court6_015.jpg', 'photo', 'image/jpeg', 'recruitlook/2026/elite-150/photos/015.jpg', 'r2_pending', 33554432, null, '2026-06-27 15:20:00-04', '2026-06-27 18:36:00-04', 'processing', 'client library', array['court-6'], '{}'),
  ('00000000-0000-4000-8000-000000007016', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002003', '00000000-0000-4000-8000-000000004007', '00000000-0000-4000-8000-000000003004', null, null, 'RLH_0710_ChicagoJam_intake_016.jpg', 'photo', 'image/jpeg', 'recruitlook/2026/chicago-jam/photos/016.jpg', 'r2_pending', 34603008, null, '2026-07-10 09:10:00-05', '2026-07-10 19:00:00-05', 'ready', 'internal', array['intake'], '{}'),
  ('00000000-0000-4000-8000-000000007017', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002003', '00000000-0000-4000-8000-000000004007', '00000000-0000-4000-8000-000000003004', null, null, 'RLH_0710_ChicagoJam_bracket_017.jpg', 'photo', 'image/jpeg', 'recruitlook/2026/chicago-jam/photos/017.jpg', 'r2_pending', 35651584, null, '2026-07-10 10:20:00-05', '2026-07-10 19:05:00-05', 'ready', 'client library', array['bracket'], '{}'),
  ('00000000-0000-4000-8000-000000007018', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002003', '00000000-0000-4000-8000-000000004008', '00000000-0000-4000-8000-000000003008', null, null, 'RLH_0710_ChicagoJam_feature_018.mp4', 'video', 'video/mp4', 'recruitlook/2026/chicago-jam/video/018.mp4', 'r2_pending', 1038090240, 76, '2026-07-10 13:00:00-05', '2026-07-10 19:15:00-05', 'ready', 'client library', array['feature','reel'], '{}'),
  ('00000000-0000-4000-8000-000000007019', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002003', '00000000-0000-4000-8000-000000004008', '00000000-0000-4000-8000-000000003008', null, '00000000-0000-4000-8000-000000006004', 'RLH_0710_ChicagoJam_sponsor_019.jpg', 'photo', 'image/jpeg', 'recruitlook/2026/chicago-jam/sponsors/019.jpg', 'r2_pending', 36700160, null, '2026-07-10 14:00:00-05', '2026-07-10 19:30:00-05', 'ready', 'client library', array['ballertv','sponsor'], '{}'),
  ('00000000-0000-4000-8000-000000007020', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002003', '00000000-0000-4000-8000-000000004008', '00000000-0000-4000-8000-000000003008', null, '00000000-0000-4000-8000-000000006001', 'RLH_0710_ChicagoJam_recruitlook_020.mp4', 'video', 'video/mp4', 'recruitlook/2026/chicago-jam/video/020.mp4', 'r2_pending', 1083179008, 83, '2026-07-10 15:00:00-05', '2026-07-10 19:40:00-05', 'processing', 'client library', array['nike','recruitlook'], '{}'),
  ('00000000-0000-4000-8000-000000007021', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002004', '00000000-0000-4000-8000-000000004009', '00000000-0000-4000-8000-000000003007', null, null, 'RLH_0718_Bluegrass_maincourt_021.jpg', 'photo', 'image/jpeg', 'recruitlook/2026/bluegrass/photos/021.jpg', 'r2_pending', 37748736, null, '2026-07-18 12:00:00-04', '2026-07-18 19:00:00-04', 'ready', 'client library', array['maincourt'], '{}'),
  ('00000000-0000-4000-8000-000000007022', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002004', '00000000-0000-4000-8000-000000004010', '00000000-0000-4000-8000-000000003005', null, '00000000-0000-4000-8000-000000006005', 'RLH_0718_Bluegrass_recap_022.mp4', 'video', 'video/mp4', 'recruitlook/2026/bluegrass/video/022.mp4', 'r2_pending', 1127219200, 90, '2026-07-18 17:00:00-04', '2026-07-18 19:10:00-04', 'ready', 'client library', array['spalding','recap'], '{}'),
  ('00000000-0000-4000-8000-000000007023', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002005', '00000000-0000-4000-8000-000000004011', '00000000-0000-4000-8000-000000003001', null, null, 'RLH_0801_Heartland_media_day_023.jpg', 'photo', 'image/jpeg', 'recruitlook/2026/heartland/photos/023.jpg', 'r2_pending', 39845888, null, '2026-08-01 09:30:00-05', '2026-08-01 19:00:00-05', 'ready', 'internal', array['media-day'], '{}'),
  ('00000000-0000-4000-8000-000000007024', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002005', '00000000-0000-4000-8000-000000004012', '00000000-0000-4000-8000-000000003006', null, null, 'RLH_0801_Heartland_interview_024.mp4', 'video', 'video/mp4', 'recruitlook/2026/heartland/video/024.mp4', 'r2_pending', 1171259392, 88, '2026-08-01 11:00:00-05', '2026-08-01 19:10:00-05', 'ready', 'client library', array['interview','scout'], '{}'),
  ('00000000-0000-4000-8000-000000007025', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002005', '00000000-0000-4000-8000-000000004012', '00000000-0000-4000-8000-000000003006', null, '00000000-0000-4000-8000-000000006006', 'RLH_0801_Heartland_sponsor_rollup_025.jpg', 'photo', 'image/jpeg', 'recruitlook/2026/heartland/sponsors/025.jpg', 'r2_pending', 40894464, null, '2026-08-01 15:00:00-05', '2026-08-01 19:20:00-05', 'needs tags', 'internal', array['sports-medicine','sponsor'], '{}')
on conflict (id) do update set
  event_id = excluded.event_id,
  assignment_id = excluded.assignment_id,
  creator_id = excluded.creator_id,
  athlete_id = excluded.athlete_id,
  sponsor_id = excluded.sponsor_id,
  file_name = excluded.file_name,
  file_type = excluded.file_type,
  mime_type = excluded.mime_type,
  storage_key = excluded.storage_key,
  storage_provider = excluded.storage_provider,
  size_bytes = excluded.size_bytes,
  duration_seconds = excluded.duration_seconds,
  captured_at = excluded.captured_at,
  uploaded_at = excluded.uploaded_at,
  processing_status = excluded.processing_status,
  visibility = excluded.visibility,
  tags = excluded.tags,
  metadata = excluded.metadata;

insert into public.deliverables (
  id,
  organization_id,
  event_id,
  sponsor_id,
  athlete_id,
  school_id,
  title,
  deliverable_type,
  due_at,
  status,
  priority,
  asset_count,
  owner_name,
  delivery_channel,
  notes
) values
  ('00000000-0000-4000-8000-000000008001', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000006001', null, null, 'Summer Showcase recap reel', 'Sponsor recap', '2026-06-26 17:00:00-05', 'in review', 'high', 12, 'Partnerships', 'portal', 'Nike recap proof package.'),
  ('00000000-0000-4000-8000-000000008002', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', null, '00000000-0000-4000-8000-000000005001', null, 'Jalen Brooks player package', 'Athlete package', '2026-06-26 18:00:00-05', 'queued', 'high', 8, 'Media Ops', 'portal', 'Parent clip and photo pull.'),
  ('00000000-0000-4000-8000-000000008003', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000006002', null, null, 'Gatorade sideline set', 'Sponsor gallery', '2026-06-27 12:00:00-05', 'needs approval', 'high', 6, 'Partnerships', 'portal', 'Waiting on final sponsor selects.'),
  ('00000000-0000-4000-8000-000000008004', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002002', '00000000-0000-4000-8000-000000006003', null, null, 'Elite 150 highlight bank', 'Highlight bank', '2026-06-29 17:00:00-04', 'editing', 'high', 20, 'Sam Nguyen', 'download', 'Hudl export and organized clips.'),
  ('00000000-0000-4000-8000-000000008005', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002002', null, null, null, 'Elite 150 social cutdowns', 'Social set', '2026-06-29 19:00:00-04', 'queued', 'medium', 10, 'Lena Martin', 'social', 'Top plays and award moments.'),
  ('00000000-0000-4000-8000-000000008006', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002003', '00000000-0000-4000-8000-000000006004', null, null, 'Chicago Jam sponsor preview', 'Sponsor preview', '2026-07-08 17:00:00-05', 'planned', 'medium', 5, 'Partnerships', 'portal', 'BallerTV renewal proof starter set.'),
  ('00000000-0000-4000-8000-000000008007', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002003', null, null, null, 'Chicago Jam bracket photo pack', 'Event gallery', '2026-07-13 12:00:00-05', 'planned', 'medium', 24, 'Media Ops', 'portal', 'Team and bracket galleries.'),
  ('00000000-0000-4000-8000-000000008008', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002004', '00000000-0000-4000-8000-000000006005', null, null, 'Bluegrass Tip-Off recap', 'Sponsor recap', '2026-07-20 12:00:00-04', 'planned', 'medium', 8, 'Avery Johnson', 'portal', 'Spalding sponsor proof and finals recap.'),
  ('00000000-0000-4000-8000-000000008009', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002005', '00000000-0000-4000-8000-000000006003', null, null, 'Heartland scout clip library', 'Scout package', '2026-08-03 18:00:00-05', 'planned', 'high', 18, 'Lena Martin', 'download', 'Scout-ready clips grouped by athlete.'),
  ('00000000-0000-4000-8000-000000008010', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000002005', '00000000-0000-4000-8000-000000006006', null, null, 'Sports medicine activation set', 'Sponsor gallery', '2026-08-04 12:00:00-05', 'planned', 'medium', 6, 'Partnerships', 'portal', 'Midwest Sports Medicine activation selects.')
on conflict (id) do update set
  event_id = excluded.event_id,
  sponsor_id = excluded.sponsor_id,
  athlete_id = excluded.athlete_id,
  school_id = excluded.school_id,
  title = excluded.title,
  deliverable_type = excluded.deliverable_type,
  due_at = excluded.due_at,
  status = excluded.status,
  priority = excluded.priority,
  asset_count = excluded.asset_count,
  owner_name = excluded.owner_name,
  delivery_channel = excluded.delivery_channel,
  notes = excluded.notes;

insert into public.media_requests (
  id,
  organization_id,
  requester_name,
  requester_email,
  requester_type,
  event_id,
  athlete_id,
  school_id,
  sponsor_id,
  title,
  description,
  request_type,
  status,
  priority,
  due_at
) values
  ('00000000-0000-4000-8000-000000009001', '11111111-1111-4111-8111-111111111111', 'Dana Brooks', 'dana.brooks@example.com', 'parent', '00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000005001', null, null, 'Brooks family clip pull', 'Pull Court 1 drives, finishes, and any interview clips for Jalen Brooks.', 'Athlete clips', 'open', 'high', '2026-06-26 15:00:00-05'),
  ('00000000-0000-4000-8000-000000009002', '11111111-1111-4111-8111-111111111111', 'Jordan Lee', 'jordan.lee@example.com', 'sponsor', '00000000-0000-4000-8000-000000002001', null, null, '00000000-0000-4000-8000-000000006001', 'Nike sponsor board selects', 'Find best sponsor board moments and include crowd context.', 'Sponsor assets', 'in progress', 'high', '2026-06-26 16:00:00-05'),
  ('00000000-0000-4000-8000-000000009003', '11111111-1111-4111-8111-111111111111', 'Chris Patel', 'chris.patel@example.com', 'sponsor', '00000000-0000-4000-8000-000000002002', null, null, '00000000-0000-4000-8000-000000006003', 'Hudl full-game exports', 'Export full-game files for Elite 150 evaluation package.', 'Game film', 'open', 'medium', '2026-06-29 12:00:00-04'),
  ('00000000-0000-4000-8000-000000009004', '11111111-1111-4111-8111-111111111111', 'Coach Reynolds', 'coach.reynolds@example.com', 'coach', '00000000-0000-4000-8000-000000002001', null, '00000000-0000-4000-8000-000000001002', null, 'Simeon team gallery', 'Team photo gallery for parent distribution after Summer Showcase.', 'Team gallery', 'waiting on tags', 'medium', '2026-06-27 14:00:00-05'),
  ('00000000-0000-4000-8000-000000009005', '11111111-1111-4111-8111-111111111111', 'Alicia Grant', 'alicia.grant@example.com', 'media director', '00000000-0000-4000-8000-000000002002', null, null, null, 'Elite 150 interview pulls', 'Pull the best interview answers for the camp recap.', 'Interview clips', 'in progress', 'high', '2026-06-28 18:00:00-04'),
  ('00000000-0000-4000-8000-000000009006', '11111111-1111-4111-8111-111111111111', 'Mel Price', 'mel.price@example.com', 'staff', '00000000-0000-4000-8000-000000002003', null, null, null, 'Chicago Jam credential assets', 'Prep staff credential graphics and media-day records.', 'Operations', 'open', 'low', '2026-07-08 12:00:00-05'),
  ('00000000-0000-4000-8000-000000009007', '11111111-1111-4111-8111-111111111111', 'Andre Knox', 'andre.knox@example.com', 'sponsor', '00000000-0000-4000-8000-000000002004', null, null, '00000000-0000-4000-8000-000000006005', 'Bluegrass sponsor recap outline', 'Outline sponsor proof points before the Bluegrass recap is edited.', 'Sponsor recap', 'open', 'medium', '2026-07-19 12:00:00-04'),
  ('00000000-0000-4000-8000-000000009008', '11111111-1111-4111-8111-111111111111', 'Victor Hayes', 'victor.hayes@example.com', 'scout', '00000000-0000-4000-8000-000000002005', null, null, null, 'Heartland scout cut list', 'Create scout cut list by athlete and school for Heartland.', 'Scout clips', 'open', 'high', '2026-08-02 18:00:00-05')
on conflict (id) do update set
  requester_name = excluded.requester_name,
  requester_email = excluded.requester_email,
  requester_type = excluded.requester_type,
  event_id = excluded.event_id,
  athlete_id = excluded.athlete_id,
  school_id = excluded.school_id,
  sponsor_id = excluded.sponsor_id,
  title = excluded.title,
  description = excluded.description,
  request_type = excluded.request_type,
  status = excluded.status,
  priority = excluded.priority,
  due_at = excluded.due_at;

insert into public.sponsor_assets (
  id,
  organization_id,
  sponsor_id,
  name,
  asset_type,
  usage_rights,
  status,
  metadata
) values
  ('00000000-0000-4000-8000-00000000a001', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000006001', 'Nike EYBL logo package', 'logo', 'RecruitLook event and recap usage', 'active', '{"formats":["svg","png"],"placement":"backdrop"}'),
  ('00000000-0000-4000-8000-00000000a002', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000006002', 'Gatorade sideline board', 'signage', 'Summer Showcase activation only', 'active', '{"placement":"sideline"}'),
  ('00000000-0000-4000-8000-00000000a003', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000006003', 'Hudl export naming guide', 'brand guide', 'Scout package exports', 'active', '{"naming":"event-school-athlete"}'),
  ('00000000-0000-4000-8000-00000000a004', '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000006004', 'BallerTV renewal graphic', 'offer', 'Chicago Summer Jam renewal proof', 'needs review', '{"campaign":"renewal"}')
on conflict (id) do update set
  sponsor_id = excluded.sponsor_id,
  name = excluded.name,
  asset_type = excluded.asset_type,
  usage_rights = excluded.usage_rights,
  status = excluded.status,
  metadata = excluded.metadata;

insert into public.notifications (
  id,
  organization_id,
  title,
  body,
  notification_type,
  severity,
  action_url,
  metadata
) values
  ('00000000-0000-4000-8000-00000000b001', '11111111-1111-4111-8111-111111111111', 'Court 2 upload batch is ready', '8 new clips cleared processing.', 'media', 'info', '/app/media-library', '{"source":"upload"}'),
  ('00000000-0000-4000-8000-00000000b002', '11111111-1111-4111-8111-111111111111', 'Sponsor deliverable needs approval', 'Gatorade sideline set is waiting on final selects.', 'deliverable', 'warning', '/app/deliverables', '{"sponsor":"Gatorade"}'),
  ('00000000-0000-4000-8000-00000000b003', '11111111-1111-4111-8111-111111111111', 'Creator confirmation pending', 'Taylor Reed has not accepted Chicago Jam coverage.', 'assignment', 'warning', '/app/assignments', '{"creator":"Taylor Reed"}'),
  ('00000000-0000-4000-8000-00000000b004', '11111111-1111-4111-8111-111111111111', 'Storage usage crossed 60%', 'RecruitLook media allocation is at 62%.', 'storage', 'info', '/app/settings', '{"used_percent":62}'),
  ('00000000-0000-4000-8000-00000000b005', '11111111-1111-4111-8111-111111111111', 'New parent request', 'Brooks family requested clip pulls from Court 1.', 'request', 'high', '/app/requests', '{"requester":"Dana Brooks"}'),
  ('00000000-0000-4000-8000-00000000b006', '11111111-1111-4111-8111-111111111111', 'Elite 150 editor queue updated', 'Same-day edits moved to confirmed.', 'assignment', 'info', '/app/assignments', '{"event":"Elite 150 Midwest"}')
on conflict (id) do update set
  title = excluded.title,
  body = excluded.body,
  notification_type = excluded.notification_type,
  severity = excluded.severity,
  action_url = excluded.action_url,
  metadata = excluded.metadata;

insert into public.storage_usage (
  id,
  organization_id,
  storage_provider,
  total_bytes,
  used_bytes,
  media_count,
  calculated_at
) values (
  '00000000-0000-4000-8000-00000000c001',
  '11111111-1111-4111-8111-111111111111',
  'r2_pending',
  3298534883328,
  2045098782710,
  25,
  '2026-06-25 20:30:00-05'
) on conflict (id) do update set
  storage_provider = excluded.storage_provider,
  total_bytes = excluded.total_bytes,
  used_bytes = excluded.used_bytes,
  media_count = excluded.media_count,
  calculated_at = excluded.calculated_at;

insert into public.audit_logs (
  id,
  organization_id,
  actor_user_profile_id,
  actor_clerk_user_id,
  action,
  entity_type,
  entity_id,
  metadata
) values
  ('00000000-0000-4000-8000-00000000d001', '11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', 'seed_recruitlook_owner', 'seed.loaded', 'organization', '11111111-1111-4111-8111-111111111111', '{"source":"supabase/seed.sql"}'),
  ('00000000-0000-4000-8000-00000000d002', '11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', 'seed_recruitlook_owner', 'schema.foundation_ready', 'system', null, '{"tables":18,"tenant":"RecruitLook Hoops"}')
on conflict (id) do update set
  action = excluded.action,
  entity_type = excluded.entity_type,
  entity_id = excluded.entity_id,
  metadata = excluded.metadata;
