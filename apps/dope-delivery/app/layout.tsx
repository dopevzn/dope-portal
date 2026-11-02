import type { Metadata } from 'next';
import './styles.css';
export const metadata: Metadata = { title: { default:'DOPE Delivery | DOPE VZN', template:'%s | DOPE Delivery' }, description:'Private galleries and beautifully delivered work by DOPE VZN.', robots:{index:false,follow:false} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
