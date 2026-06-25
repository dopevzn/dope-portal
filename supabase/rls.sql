-- DOPE Portal row-level security
-- Apply after supabase/schema.sql. Policies are tenant-scoped and do not grant
-- unsafe public access. Service-role/admin jobs should use the Supabase service
-- role key on the server only.

create or replace function public.current_clerk_user_id()
returns text
language sql
stable
set search_path = public, auth
as $$
  select nullif(coalesce(auth.jwt()->>'sub', auth.uid()::text), '');
$$;

comment on function public.current_clerk_user_id() is
  'Returns the authenticated Clerk user id from the Supabase JWT subject.';

create or replace function public.is_org_member(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from public.organization_members member
    where member.organization_id = target_organization_id
      and member.clerk_user_id = public.current_clerk_user_id()
      and member.status = 'active'
  );
$$;

comment on function public.is_org_member(uuid) is
  'Checks active tenant membership for the current Clerk-authenticated user.';

create or replace function public.is_org_admin(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from public.organization_members member
    where member.organization_id = target_organization_id
      and member.clerk_user_id = public.current_clerk_user_id()
      and member.status = 'active'
      and member.role in ('owner', 'media_director', 'admin')
  );
$$;

comment on function public.is_org_admin(uuid) is
  'Checks owner, media director, or admin access for privileged tenant operations.';

create or replace function public.can_read_user_profile(target_clerk_user_id text)
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select target_clerk_user_id = public.current_clerk_user_id()
    or exists (
      select 1
      from public.organization_members viewer
      join public.organization_members target
        on target.organization_id = viewer.organization_id
      where viewer.clerk_user_id = public.current_clerk_user_id()
        and viewer.status = 'active'
        and target.clerk_user_id = target_clerk_user_id
        and target.status = 'active'
    );
$$;

comment on function public.can_read_user_profile(text) is
  'Allows users to read their own profile or profiles belonging to shared organizations.';

revoke all on all tables in schema public from anon;
revoke all on all sequences in schema public from anon;
grant usage on schema public to authenticated, service_role;

grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'organizations',
    'user_profiles',
    'organization_members',
    'venues',
    'events',
    'schools',
    'teams',
    'athletes',
    'creators',
    'assignments',
    'media_files',
    'deliverables',
    'media_requests',
    'sponsors',
    'sponsor_assets',
    'notifications',
    'storage_usage',
    'audit_logs'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('alter table public.%I force row level security', table_name);
  end loop;
end $$;

drop policy if exists organizations_select_members on public.organizations;
create policy organizations_select_members
  on public.organizations
  for select
  to authenticated
  using (public.is_org_member(id));

drop policy if exists organizations_update_admins on public.organizations;
create policy organizations_update_admins
  on public.organizations
  for update
  to authenticated
  using (public.is_org_admin(id))
  with check (public.is_org_admin(id));

drop policy if exists user_profiles_select_shared on public.user_profiles;
create policy user_profiles_select_shared
  on public.user_profiles
  for select
  to authenticated
  using (public.can_read_user_profile(clerk_user_id));

drop policy if exists user_profiles_insert_self on public.user_profiles;
create policy user_profiles_insert_self
  on public.user_profiles
  for insert
  to authenticated
  with check (clerk_user_id = public.current_clerk_user_id());

drop policy if exists user_profiles_update_self on public.user_profiles;
create policy user_profiles_update_self
  on public.user_profiles
  for update
  to authenticated
  using (clerk_user_id = public.current_clerk_user_id())
  with check (clerk_user_id = public.current_clerk_user_id());

drop policy if exists organization_members_select_members on public.organization_members;
create policy organization_members_select_members
  on public.organization_members
  for select
  to authenticated
  using (public.is_org_member(organization_id));

drop policy if exists organization_members_insert_admins on public.organization_members;
create policy organization_members_insert_admins
  on public.organization_members
  for insert
  to authenticated
  with check (public.is_org_admin(organization_id));

drop policy if exists organization_members_update_admins on public.organization_members;
create policy organization_members_update_admins
  on public.organization_members
  for update
  to authenticated
  using (public.is_org_admin(organization_id))
  with check (public.is_org_admin(organization_id));

drop policy if exists organization_members_delete_admins on public.organization_members;
create policy organization_members_delete_admins
  on public.organization_members
  for delete
  to authenticated
  using (public.is_org_admin(organization_id));

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'venues',
    'events',
    'schools',
    'teams',
    'athletes',
    'creators',
    'assignments',
    'media_files',
    'deliverables',
    'media_requests',
    'sponsors',
    'sponsor_assets',
    'notifications',
    'storage_usage'
  ]
  loop
    execute format('drop policy if exists %I on public.%I', table_name || '_tenant_select', table_name);
    execute format(
      'create policy %I on public.%I for select to authenticated using (public.is_org_member(organization_id))',
      table_name || '_tenant_select',
      table_name
    );

    execute format('drop policy if exists %I on public.%I', table_name || '_tenant_insert', table_name);
    execute format(
      'create policy %I on public.%I for insert to authenticated with check (public.is_org_member(organization_id))',
      table_name || '_tenant_insert',
      table_name
    );

    execute format('drop policy if exists %I on public.%I', table_name || '_tenant_update', table_name);
    execute format(
      'create policy %I on public.%I for update to authenticated using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id))',
      table_name || '_tenant_update',
      table_name
    );

    execute format('drop policy if exists %I on public.%I', table_name || '_tenant_delete_admin', table_name);
    execute format(
      'create policy %I on public.%I for delete to authenticated using (public.is_org_admin(organization_id))',
      table_name || '_tenant_delete_admin',
      table_name
    );
  end loop;
end $$;

drop policy if exists audit_logs_select_admins on public.audit_logs;
create policy audit_logs_select_admins
  on public.audit_logs
  for select
  to authenticated
  using (public.is_org_admin(organization_id));

drop policy if exists audit_logs_insert_members on public.audit_logs;
create policy audit_logs_insert_members
  on public.audit_logs
  for insert
  to authenticated
  with check (public.is_org_member(organization_id));

drop policy if exists audit_logs_update_admins on public.audit_logs;
create policy audit_logs_update_admins
  on public.audit_logs
  for update
  to authenticated
  using (public.is_org_admin(organization_id))
  with check (public.is_org_admin(organization_id));

drop policy if exists audit_logs_delete_admins on public.audit_logs;
create policy audit_logs_delete_admins
  on public.audit_logs
  for delete
  to authenticated
  using (public.is_org_admin(organization_id));
