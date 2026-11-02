-- Server-side rate limits for gallery passcodes and client review endpoints.
create table if not exists public.delivery_portal_rate_limits (
  identity text primary key,
  window_started_at timestamptz not null default now(),
  attempts integer not null default 0,
  updated_at timestamptz not null default now()
);
alter table public.delivery_portal_rate_limits enable row level security;
revoke all on public.delivery_portal_rate_limits from public, anon, authenticated;
grant select, insert, update on public.delivery_portal_rate_limits to service_role;
create index if not exists delivery_portal_rate_limits_updated_at_idx on public.delivery_portal_rate_limits(updated_at);
create or replace function public.delivery_portal_rate_limit(
  p_identity text, p_max_attempts integer, p_window_seconds integer
) returns boolean language plpgsql security invoker set search_path = '' as $$
declare v_count integer;
begin
  if p_identity is null or length(p_identity) > 200 or length(p_identity) < 20
     or p_max_attempts not between 1 and 1000
     or p_window_seconds not between 30 and 86400 then
    return false;
  end if;
  insert into public.delivery_portal_rate_limits as existing (identity, window_started_at, attempts, updated_at)
  values (p_identity, clock_timestamp(), 1, clock_timestamp())
  on conflict (identity) do update set
    window_started_at = case when existing.window_started_at + make_interval(secs => p_window_seconds) < clock_timestamp()
      then clock_timestamp() else existing.window_started_at end,
    attempts = case when existing.window_started_at + make_interval(secs => p_window_seconds) < clock_timestamp()
      then 1 else existing.attempts + 1 end,
    updated_at = clock_timestamp()
  returning attempts into v_count;
  return v_count <= p_max_attempts;
end;
$$;
revoke all on function public.delivery_portal_rate_limit(text,integer,integer) from public, anon, authenticated;
grant execute on function public.delivery_portal_rate_limit(text,integer,integer) to service_role;
