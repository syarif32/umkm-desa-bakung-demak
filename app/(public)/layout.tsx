import type { ReactNode } from 'react';
import { PublicNavbar } from '@/components/layout/Navbar';
import { PublicFooter } from '@/components/layout/Footer';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}