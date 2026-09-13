import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});


export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'A simple app for creating, saving, and organizing notes',
  // metadataBase: 'https://notehub.com/',
  openGraph: {  
    title: 'NoteHub',
  description: 'Create, save, and organize your notes',
  url: 'https://08-zustand-ebon-two.vercel.app/',
  images: [
    {
         url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        alt: 'notes image',
        width: 600,
        height: 300,
    }
  ]
}};


export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />

          <main>
            {children}
            {modal}
          </main>

          <div id="modal"></div>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
