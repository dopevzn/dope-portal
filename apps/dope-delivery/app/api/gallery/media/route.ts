import { configured, db, err, resolveGallery } from '@/lib/server';
import { mediaConfigured, signedMediaUrl } from '@/lib/media';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function GET(req:Request){
  if(!configured()||!mediaConfigured())return err('Media delivery is not configured.',503);
  const u=new URL(req.url);const token=u.searchParams.get('token')||'';const id=u.searchParams.get('item')||'';const mode=u.searchParams.get('mode')||'preview';
  if(!['preview','poster','download'].includes(mode)||!/^[0-9a-f-]{36}$/i.test(id))return err('Invalid media request');
  try{
    const {gallery,status,error}=await resolveGallery(token);
    if(!gallery)return err(error||'Unavailable',status);
    if(mode==='download'&&!gallery.allow_downloads)return err('Downloads are disabled for this gallery.',403);
    const client=db();
    const {data:link,error:le}=await client.from('delivery_portal_items').select('asset_id').eq('gallery_id',gallery.id).eq('id',id).maybeSingle();
    if(le)throw le;
    if(!link)return err('Media item not found',404);
    const {data:asset,error:ae}=await client.from('media_assets').select('storage_key,playback_key,poster_key,original_filename,display_filename,processing_state').eq('organization_id',gallery.organization_id).eq('id',link.asset_id).maybeSingle();
    if(ae)throw ae;
    if(!asset)return err('Asset not found',404);
    const key=mode==='download'?asset.storage_key:mode==='poster'?asset.poster_key:asset.playback_key||asset.storage_key;
    if(!key)return err('Asset version is unavailable',404);
    const url=await signedMediaUrl(key,asset.original_filename||asset.display_filename||'deliverable',mode==='download');
    if(mode==='download')await client.from('delivery_portal_events').insert({gallery_id:gallery.id,item_id:id,kind:'download',details:{}});
    return Response.redirect(url,302);
  }catch(error){console.error('Media delivery failed',error);return err('Unable to prepare media',500);}
}
