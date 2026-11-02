import { createPin, createShareToken, configured, db, err, requireAdmin, tokenHash } from '@/lib/server';
export const runtime='nodejs';
export const dynamic='force-dynamic';
async function authorize(req:Request) { if(!configured())return null;return requireAdmin(req); }
export async function GET(req:Request){
 try{const admin=await authorize(req);if(!admin)return err('Authorized studio account required',401);const c=db();const org=admin.organizationId;
  const [a,p,g]=await Promise.all([
    c.from('media_assets').select('id,project_id,asset_type,display_filename,original_filename,processing_state,created_at').eq('organization_id',org).order('created_at',{ascending:false}).limit(250),
    c.from('projects').select('id,title,client_id').eq('organization_id',org).order('created_at',{ascending:false}).limit(100),
    c.from('delivery_portal_galleries').select('id,title,client_name,published,expires_at,created_at,approval_status').eq('organization_id',org).order('created_at',{ascending:false}).limit(100),
  ]);
  if(a.error||p.error||g.error)throw(a.error||p.error||g.error);
  return Response.json({assets:a.data,projects:p.data,galleries:g.data},{headers:{'Cache-Control':'no-store'}});
 }catch(e){console.error('Admin load failed',e);return err('Unable to load studio data',500);}
}
export async function POST(req:Request){
 try{const admin=await authorize(req);if(!admin)return err('Authorized studio account required',401);
  const b=await req.json() as {title?:unknown,clientName?:unknown,description?:unknown,assetIds?:unknown,projectId?:unknown,pin?:unknown,expiresDays?:unknown,allowDownloads?:unknown,allowFeedback?:unknown};
  const title=typeof b.title==='string'?b.title.trim().slice(0,150):'';const clientName=typeof b.clientName==='string'?b.clientName.trim().slice(0,120):'';
  const description=typeof b.description==='string'?b.description.trim().slice(0,600):'';
  const assetIds=Array.isArray(b.assetIds)?Array.from(new Set(b.assetIds.filter((x):x is string=>typeof x==='string'&&/^[a-f0-9-]{36}$/i.test(x)))):[];
  const projectId=typeof b.projectId==='string'&&/^[a-f0-9-]{36}$/i.test(b.projectId)?b.projectId:null;
  if(!title||!clientName||assetIds.length>150)return err('A title and client name are required (max 150 assets).');
  const pin=typeof b.pin==='string'&&b.pin.length>0?b.pin:null;
  if(pin&&(pin.length<4||pin.length>64))return err('Passcode must be 4 to 64 characters.');
  const days=Number(b.expiresDays??30);if(!Number.isInteger(days)||days<1||days>365)return err('Expiry must be between 1 and 365 days.');
  const c=db();const org=admin.organizationId;
  if(projectId){const {data:p}=await c.from('projects').select('id').eq('organization_id',org).eq('id',projectId).maybeSingle();if(!p)return err('Project not found',404);}
  if(assetIds.length){const {data:assets,error}=await c.from('media_assets').select('id').eq('organization_id',org).in('id',assetIds);if(error)throw error;if(assets?.length!==assetIds.length)return err('Some assets do not belong to this studio.',403);}
  const token=createShareToken();const pinValues=pin?createPin(pin):{pin_hash:null,pin_salt:null};
  const {data:g,error:ge}=await c.from('delivery_portal_galleries').insert({organization_id:org,title,client_name:clientName,description,project_id:projectId,token_hash:tokenHash(token),...pinValues,allow_downloads:b.allowDownloads!==false,allow_feedback:b.allowFeedback!==false,published:true,expires_at:new Date(Date.now()+days*86400000).toISOString(),created_by:admin.user.id}).select('id').single();
  if(ge)throw ge;
  if(assetIds.length){const {error:ie}=await c.from('delivery_portal_items').insert(assetIds.map((asset_id,sort_order)=>({gallery_id:g.id,asset_id,sort_order})));if(ie){await c.from('delivery_portal_galleries').delete().eq('id',g.id);throw ie;}}
  const base=process.env.NEXT_PUBLIC_DELIVERY_BASE_URL?.replace(/\/$/,'')||new URL(req.url).origin;
  return Response.json({id:g.id,shareUrl:`${base}/g/${token}`},{status:201,headers:{'Cache-Control':'no-store'}});
 }catch(e){console.error('Gallery creation failed',e);return err('Unable to create gallery',500);}
}
export async function PATCH(req:Request){
 try{const admin=await authorize(req);if(!admin)return err('Authorized studio account required',401);
  const b=await req.json() as {id?:unknown,published?:unknown,regenerate?:unknown};
  if(typeof b.id!=='string')return err('Gallery id required');
  const c=db();const {data:existing}=await c.from('delivery_portal_galleries').select('id').eq('id',b.id).eq('organization_id',admin.organizationId).maybeSingle();if(!existing)return err('Gallery not found',404);
  const updates:Record<string,unknown>={};let token:string|undefined;
  if(typeof b.published==='boolean')updates.published=b.published;
  if(b.regenerate===true){token=createShareToken();updates.token_hash=tokenHash(token);}
  if(!Object.keys(updates).length)return err('No changes supplied');
  const {error}=await c.from('delivery_portal_galleries').update(updates).eq('id',b.id).eq('organization_id',admin.organizationId);if(error)throw error;
  const base=process.env.NEXT_PUBLIC_DELIVERY_BASE_URL?.replace(/\/$/,'')||new URL(req.url).origin;
  return Response.json({ok:true,shareUrl:token?`${base}/g/${token}`:null});
 }catch(e){console.error('Gallery update failed',e);return err('Unable to update gallery',500);}
}
