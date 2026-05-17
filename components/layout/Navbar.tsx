import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getVillageInfo } from '@/lib/queries/village';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { MapPinIcon } from 'lucide-react';

export async function PublicNavbar() {
  const supabase    = await createSupabaseServerClient();
  const villageInfo = await getVillageInfo();

  const { data: { session } } = await supabase.auth.getSession();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm
                        border-b border-amber-100 shadow-sm">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          {villageInfo?.logo_url ? (
            <Image
              src={villageInfo.logo_url}
              alt={villageInfo.name}
              width={36}
              height={36}
              className="rounded-lg"
            />
          ) : (
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center
                            justify-center text-white">
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

        {/* Links */}
        
<div className="hidden md:flex items-center gap-6">
    <NavLink href="/">Beranda</NavLink>
  <NavLink href="/about">Profil Desa</NavLink>
  <NavLink href="/umkm">Direktori UMKM</NavLink>
  <NavLink href="/contact">Kontak </NavLink>
</div>

        {/* Auth CTA */}
        <div className="flex items-center gap-2">
          {session ? (
            <Button asChild size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild size="sm" variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50 rounded-lg">
              <Link href="/login">Masuk</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-gray-600 hover:text-amber-700
                 transition-colors relative after:absolute after:left-0 after:-bottom-1
                 after:h-0.5 after:w-0 after:bg-amber-500 after:transition-all
                 hover:after:w-full"
    >
      {children}
    </Link>
  );
}