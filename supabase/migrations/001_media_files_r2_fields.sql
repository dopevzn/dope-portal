-- Adds Cloudflare R2 storage metadata to media_files.
-- Apply after supabase/schema.sql and before relying on production uploads.

alter table public.media_files
  add column if not exists r2_bucket text,
  add column if not exists r2_key text,
  add column if not exists original_filename text,
  add column if not exists public_url text,
  add column if not exists file_size_bytes bigint,
  add column if not exists uploaded_by_user_id text,
  add column if not exists download_count integer not null default 0;

update public.media_files
set
  r2_key = coalesce(r2_key, storage_key),
  original_filename = coalesce(original_filename, file_name),
  file_size_bytes = coalesce(file_size_bytes, size_bytes)
where storage_provider like 'r2%'
  and (r2_key is null or original_filename is null or file_size_bytes is null);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'media_files_download_count_nonnegative'
      and conrelid = 'public.media_files'::regclass
  ) then
    alter table public.media_files
      add constraint media_files_download_count_nonnegative
      check (download_count >= 0);
  end if;
end $$;

create unique index if not exists media_files_org_r2_key_idx
  on public.media_files (organization_id, r2_key)
  where r2_key is not null;

create index if not exists media_files_uploaded_by_user_idx
  on public.media_files (organization_id, uploaded_by_user_id, uploaded_at desc);

comment on column public.media_files.r2_bucket is
  'Cloudflare R2 bucket containing the private binary object.';
comment on column public.media_files.r2_key is
  'Cloudflare R2 object key for private media storage.';
comment on column public.media_files.original_filename is
  'Original browser-provided filename captured at upload time.';
comment on column public.media_files.public_url is
  'Optional public/custom-domain URL when an asset is intentionally public.';
comment on column public.media_files.file_size_bytes is
  'Original file size in bytes captured from the browser upload.';
comment on column public.media_files.uploaded_by_user_id is
  'Clerk user id that completed the upload record.';
comment on column public.media_files.download_count is
  'Application-level count of generated download URLs.';
