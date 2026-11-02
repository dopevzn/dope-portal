import type { Metadata } from 'next';
import GalleryClient from './viewer';
export const metadata: Metadata = { title:'Private gallery', robots:{index:false,follow:false} };
export default async function GalleryPage({params}:{params:Promise<{token:string}>}) {
  const {token} = await params;
  return <GalleryClient token={token}/>;
}
