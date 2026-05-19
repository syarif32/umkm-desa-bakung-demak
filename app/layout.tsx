import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets:  ['latin'],
  display:  'swap',
  variable: '--font-plus-jakarta',
  weight:   ['400', '500', '600', '700', '800'],
});

const fraunces = Fraunces({
  subsets:  ['latin'],
  display:  'swap',
  variable: '--font-fraunces',
  weight:   ['400', '600', '700'],
  style:    ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default:  'Portal UMKM Desa Bakung',
    template: '%s — Portal UMKM Desa Bakung',
  },
  description: 'Direktori UMKM lokal Desa Bakung — temukan produk dan layanan unggulan dari pelaku usaha desa kami.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}