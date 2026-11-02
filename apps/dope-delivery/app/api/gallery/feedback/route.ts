import { configured, db, err, resolveGallery } from '@/lib/server';
export const runtime='nodejs';
export async function POST(req:Request){
  if(!configured())return err('Delivery service is awaiting configuration.',503);
  try{
    const body=await req.json() as {token?:unknown,itemId?:unknown,name?:unknown,message?:unknown,seconds?:unknown,decision?:unknown};
    if(typeof body.token!=='string')return err('Gallery not found',404);
    const {gallery,status,error}=await resolveGallery(body.token);
    if(!gallery)return err(error||'Unavailable',status);
    if(!gallery.allow_feedback)return err('Feedback is disabled',403);
    const name=typeof body.name==='string'?body.name.trim().slice(0,80):'';
    const message=typeof body.message==='string'?body.message.trim().slice(0,2000):'';
    const decision=body.decision==='approve'?'approve':body.decision==='revision'?'revision':null;
    const seconds=typeof body.seconds==='number'&&Number.isFinite(body.seconds)&&body.seconds>=0?Math.round(body.seconds):null;
    if(name.length<2||(!decision&&message.length<3))return err('Add your name and feedback.');
    if(body.itemId!=null&&typeof body.itemId!=='string')return err('Invalid item');
    const client=db();let itemId:null|string=null;
    if(typeof body.itemId==='string'){
      const {data:linked}=await client.from('delivery_portal_items').select('id').eq('gallery_id',gallery.id).eq('id',body.itemId).maybeSingle();
      if(!linked)return err('Item not found',404);
      itemId=linked.id;
    }
    const {error:fe}=await client.from('delivery_portal_events').insert({gallery_id:gallery.id,item_id:itemId,kind:decision?'decision':'comment',actor_name:name,message,seconds,details:decision?{decision}:{} });
    if(fe)throw fe;
    if(decision){
      const {error:ue}=await client.from('delivery_portal_galleries').update({approval_status:decision==='approve'?'approved':'revisions_requested'}).eq('id',gallery.id);
      if(ue)throw ue;
    }
    return Response.json({ok:true});
  }catch(error){console.error('Feedback failed',error);return err('Unable to save feedback',500);}
}
