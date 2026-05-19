import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getVillageInfo } from '@/lib/queries/village';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { MapPinIcon, SparklesIcon } from 'lucide-react';
import { NavLinks, MobileMenu } from './NavLinks';

export async function PublicNavbar() {
  const supabase = await createSupabaseServerClient();
  const villageInfo = await getVillageInfo();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav className="mx-auto max-w-7xl h-16 rounded-2xl border border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        <div className="h-full px-5 flex items-center justify-between">

          {/* BRAND */}
          <Link href="/" className="flex items-center gap-3 group">
            {villageInfo?.logo_url ? (
              <Image
                src={villageInfo.logo_url}
                alt={villageInfo.name || 'Logo Desa'}
                width={42}
                height={42}
                className="rounded-xl ring-2 ring-amber-100 group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
                <MapPinIcon className="w-5 h-5" />
              </div>
            )}

            <div className="hidden sm:block">
              <h1 className="text-sm font-extrabold text-gray-900 leading-tight">
                {villageInfo?.name ?? 'Portal Desa'}
              </h1>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-600">
                <SparklesIcon className="w-3 h-3" />
                Direktori UMKM
              </div>
            </div>
          </Link>

          {/* DESKTOP MENU — Client Component */}
          <div className="hidden md:flex items-center gap-2">
            <NavLinks />
          </div>

          {/* ACTION + MOBILE MENU */}
          <div className="flex items-center gap-3">
            {session ? (
              <Button
                asChild
                className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/30 px-5"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className="hidden sm:flex rounded-xl border-amber-200 bg-white/70 hover:bg-amber-50 text-amber-700"
              >
                <Link href="/login">Masuk</Link>
              </Button>
            )}

            {/* MOBILE — Client Component */}
            <div className="md:hidden">
              <MobileMenu session={!!session} />
            </div>
          </div>

        </div>
      </nav>
    </header>
  );
}