import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export type GalleryRow = {
  id: string; organization_id: string; title: string; client_name: string;
  description: string | null; cover_asset_id: string | null;
  token_hash: string; pin_hash: string | null; pin_salt: string | null;
  expires_at: string | null; published: boolean; allow_downloads: boolean;
  allow_feedback: boolean; created_at: string; approval_status: string;
};

export function configured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
export function db() {
  if (!configured()) throw new Error('Server database environment is not configured.');
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
export function tokenHash(token: string) { return createHash('sha256').update(token).digest('hex'); }
export function createShareToken() { return randomBytes(32).toString('base64url'); }
export function createPin(pin: string) {
  const salt = randomBytes(16).toString('hex');
  return { pin_salt: salt, pin_hash: scryptSync(pin, salt, 32).toString('hex') };
}
export function checkPin(pin: string, salt: string, hash: string) {
  const expected = Buffer.from(hash, 'hex');
  const actual = scryptSync(pin, salt, 32);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
function signature(value: string) {
  const secret = process.env.DELIVERY_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('A 32-character DELIVERY_SESSION_SECRET is required.');
  return createHmac('sha256', secret).update(value).digest('hex');
}
export async function setGallerySession(token: string) {
  const key = tokenHash(token); const expires = Date.now() + 12 * 60 * 60 * 1000;
  const value = `${expires}.${signature(`${key}.${expires}`)}`;
  (await cookies()).set(`dv_${key.slice(0,20)}`, value, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 43200, path: '/' });
}
export async function hasGallerySession(token: string) {
  const key = tokenHash(token); const value = (await cookies()).get(`dv_${key.slice(0,20)}`)?.value;
  if (!value) return false;
  const [expiresText, got] = value.split('.'); const expires = Number(expiresText);
  if (!Number.isFinite(expires) || expires < Date.now() || !got) return false;
  const expected = signature(`${key}.${expires}`);
  const a = Buffer.from(expected); const b = Buffer.from(got);
  return a.length === b.length && timingSafeEqual(a, b);
}
export async function resolveGallery(token: string, enforcePin = true): Promise<{gallery: GalleryRow | null; status: number; error?: string}> {
  if (!/^[\w-]{40,80}$/.test(token)) return {gallery:null,status:404,error:'Gallery not found'};
  const { data, error } = await db().from('delivery_portal_galleries').select('*').eq('token_hash',tokenHash(token)).maybeSingle();
  if (error) throw error;
  const gallery = data as GalleryRow | null;
  if (!gallery || !gallery.published || (gallery.expires_at && new Date(gallery.expires_at).getTime() <= Date.now())) return {gallery:null,status:404,error:'This gallery is unavailable or has expired.'};
  if (gallery.pin_hash && enforcePin && !(await hasGallerySession(token))) return {gallery:null,status:423,error:'Passcode required'};
  return {gallery,status:200};
}
export async function requireAdmin(request: Request) {
  const bearer = request.headers.get('authorization') ?? '';
  const jwt = bearer.startsWith('Bearer ') ? bearer.slice(7) : '';
  if (!jwt) return null;
  const client = db();
  const { data: authData, error } = await client.auth.getUser(jwt);
  if (error || !authData.user) return null;
  const user = authData.user;
  const emails = (process.env.DELIVERY_ADMIN_EMAILS ?? '').split(',').map(x => x.trim().toLowerCase()).filter(Boolean);
  if (emails.length && (!user.email || !emails.includes(user.email.toLowerCase()))) return null;
  const { data: memberships, error: membershipError } = await client.from('organization_members')
    .select('organization_id,role').eq('user_id', user.id).eq('active', true);
  if (membershipError) throw membershipError;
  const permitted = (memberships ?? []).find(x => ['owner','admin'].includes(String(x.role).toLowerCase()));
  if (!permitted) return null;
  return {user,organizationId:permitted.organization_id as string};
}
export function err(message: string,status = 400) { return Response.json({error:message},{status,headers:{'Cache-Control':'no-store'}}); }
