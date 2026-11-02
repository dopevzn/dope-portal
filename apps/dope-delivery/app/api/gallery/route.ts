import { checkPin, configured, db, err, resolveGallery, setGallerySession } from '@/lib/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
function validToken(token: unknown): token is string { return typeof token==='string' && /^[\w-]{40,80}$/.test(token); }
export async function GET(req:Request) {
  if (!configured()) return err('Delivery service is awaiting configuration.',503);
  const url = new URL(req.url); const token=url.searchParams.get('token');
  if (!validToken(token)) return err('Gallery not found',404);
  try {
    const {gallery,status,error} = await resolveGallery(token);
    if (!gallery) return err(error || 'Unavailable',status);
    const client=db();
    const {data: links,error:le} = await client.from('delivery_portal_items').select('id,asset_id,sort_order').eq('gallery_id',gallery.id).order('sort_order',{ascending:true});
    if(le) throw le;
    const ids=(links??[]).map(x=>x.asset_id);
    const {data: assets,error:ae} = ids.length ? await client.from('media_assets').select('id,asset_type,display_filename,original_filename,mime_type,duration,width,height,file_size,playback_key,poster_key').eq('organization_id',gallery.organization_id).in('id',ids) : {data:[],error:null};
    if(ae) throw ae;
    const assetMap=new Map((assets??[]).map(x=>[x.id,x]));
    const items=(links??[]).map(x=>{const a=assetMap.get(x.asset_id);if(!a)return null;return { id:x.id, title:a.display_filename||a.original_filename||'Untitled asset', kind:a.asset_type||'file', duration:a.duration, width:a.width,height:a.height, size:a.file_size, mimeType:a.mime_type, canPreview:Boolean(a.playback_key||a.poster_key||String(a.mime_type).startsWith('image/')||String(a.mime_type).startsWith('video/')) };}).filter(Boolean);
    return Response.json({gallery:{title:gallery.title,clientName:gallery.client_name,description:gallery.description,createdAt:gallery.created_at,allowDownloads:gallery.allow_downloads,allowFeedback:gallery.allow_feedback,approvalStatus:gallery.approval_status},items},{headers:{'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer'}});
  } catch(error){console.error('Gallery fetch failed',error);return err('Unable to load gallery',500);}
}
export async function POST(req:Request){
  if(!configured())return err('Delivery service is awaiting configuration.',503);
  try {
    const body=await req.json() as {token?:unknown,pin?:unknown};
    if(!validToken(body.token)) return err('Gallery not found',404);
    const {gallery,status,error}=await resolveGallery(body.token,false);
    if(!gallery)return err(error||'Unavailable',status);
    if(!gallery.pin_hash){await setGallerySession(body.token);return Response.json({ok:true});}
    if(typeof body.pin!=='string'||body.pin.length>100||!gallery.pin_salt||!checkPin(body.pin, gallery.pin_salt, gallery.pin_hash))return err('Incorrect passcode',403);
    await setGallerySession(body.token);
    return Response.json({ok:true},{headers:{'Cache-Control':'no-store'}});
  }catch(error){console.error('Gallery unlock failed',error);return err('Unable to unlock gallery',500);}
}
