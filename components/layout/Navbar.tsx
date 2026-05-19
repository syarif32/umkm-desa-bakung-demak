import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getVillageInfo } from '@/lib/queries/village';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import {
  MapPinIcon,
  MenuIcon,
  SparklesIcon,
} from 'lucide-react';

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
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
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

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink href="/">Beranda</NavLink>
            <NavLink href="/about">Profil Desa</NavLink>
            <NavLink href="/umkm">UMKM</NavLink>
            <NavLink href="/contact">Kontak</NavLink>
          </div>

          {/* ACTION */}
          <div className="flex items-center gap-3">
            {session ? (
              <Button
                asChild
                className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/30 px-5"
              >
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className="hidden sm:flex rounded-xl border-amber-200 bg-white/70 hover:bg-amber-50 text-amber-700"
              >
                <Link href="/login">
                  Masuk
                </Link>
              </Button>
            )}

            {/* MOBILE */}
            <div className="md:hidden relative">
              <input
                type="checkbox"
                id="mobile-menu"
                className="peer hidden"
              />

              <label
                htmlFor="mobile-menu"
                className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition cursor-pointer"
              >
                <MenuIcon className="w-5 h-5 text-gray-700" />
              </label>

              <div className="absolute right-0 top-14 w-72 rounded-2xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-2xl hidden peer-checked:flex flex-col overflow-hidden">
                
                <div className="p-3 flex flex-col">
                  <MobileNavLink href="/">
                    Beranda
                  </MobileNavLink>

                  <MobileNavLink href="/about">
                    Profil Desa
                  </MobileNavLink>

                  <MobileNavLink href="/umkm">
                    Direktori UMKM
                  </MobileNavLink>

                  <MobileNavLink href="/contact">
                    Kontak
                  </MobileNavLink>
                </div>

                {!session && (
                  <div className="p-3 border-t border-gray-100">
                    <Button
                      asChild
                      className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                    >
                      <Link href="/login">
                        Masuk Dashboard
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

/* DESKTOP LINK */
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        relative px-4 py-2 rounded-xl
        text-sm font-semibold text-gray-700
        transition-all duration-300
        hover:text-amber-700
        hover:bg-amber-50
        after:absolute after:bottom-0 after:left-1/2
        after:h-0.5 after:w-0
        after:bg-gradient-to-r after:from-amber-500 after:to-orange-500
        after:transition-all after:duration-300
        after:-translate-x-1/2
        hover:after:w-8
      "
    >
      {children}
    </Link>
  );
}

/* MOBILE LINK */
function MobileNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        px-4 py-3 rounded-xl
        text-sm font-semibold text-gray-700
        hover:bg-amber-50
        hover:text-amber-700
        transition-all
      "
    >
      {children}
    </Link>
  );
}