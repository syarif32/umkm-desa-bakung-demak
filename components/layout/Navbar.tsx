import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getVillageInfo } from '@/lib/queries/village';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { MapPinIcon, MenuIcon } from 'lucide-react';

export async function PublicNavbar() {
  const supabase    = await createSupabaseServerClient();
  const villageInfo = await getVillageInfo();

  const { data: { session } } = await supabase.auth.getSession();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-100 shadow-sm relative">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* area brand */}
        <Link href="/" className="flex items-center gap-3">
          {villageInfo?.logo_url ? (
            <Image
              src={villageInfo.logo_url}
              alt={villageInfo.name || 'Logo Desa Bakung'}
              width={36}
              height={36}
              className="rounded-lg"
              style={{ width: 'auto', height: 'auto' }}
            />
          ) : (
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-white">
              <MapPinIcon className="w-5 h-5" />
            </div>
          )}
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-tight">
              {villageInfo?.name ?? 'Portal Desa Bakung'}
            </p>
            <p className="text-xs text-amber-600 leading-tight">
              Direktori UMKM
            </p>
          </div>
        </Link>

        {/* navigasi desktop */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/">Beranda</NavLink>
          <NavLink href="/about">Profil Desa</NavLink>
          <NavLink href="/umkm">Direktori UMKM</NavLink>
          <NavLink href="/contact">Kontak</NavLink>
        </div>

        {/* area aksi & hamburger menu */}
        <div className="flex items-center gap-3">
          {session ? (
            <Button asChild size="sm" className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 rounded-lg hidden sm:flex">
              <Link href="/login">Masuk</Link>
            </Button>
          )}

          {/* toggle menu mobile */}
          <div className="md:hidden flex items-center">
            <input type="checkbox" id="mobile-menu" className="peer hidden" />
            <label htmlFor="mobile-menu" className="p-2 text-gray-600 cursor-pointer rounded-lg hover:bg-gray-100 transition-colors">
              <MenuIcon className="w-6 h-6" />
            </label>

            {/* panel menu mobile */}
            <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg hidden peer-checked:flex flex-col z-50">
              <div className="flex flex-col p-4 space-y-4">
                <MobileNavLink href="/">Beranda</MobileNavLink>
                <MobileNavLink href="/about">Profil Desa</MobileNavLink>
                <MobileNavLink href="/umkm">Direktori UMKM</MobileNavLink>
                <MobileNavLink href="/contact">Kontak</MobileNavLink>
                {!session && (
                  <Link href="/login" className="text-sm font-bold text-amber-600 py-2 border-t border-gray-100">
                    Masuk ke Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        
      </nav>
    </header>
  );
}

// komponen tautan desktop
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-gray-600 hover:text-amber-700 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-amber-500 after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  );
}

// komponen tautan mobile
function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-base font-medium text-gray-700 hover:text-amber-600">
      {children}
    </Link>
  );
}