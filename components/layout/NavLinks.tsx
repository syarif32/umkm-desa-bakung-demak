'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MenuIcon, XIcon } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/',        label: 'Beranda'      },
  { href: '/about',   label: 'Profil Desa'  },
  { href: '/umkm',    label: 'UMKM'         },
  { href: '/contact', label: 'Kontak'       },
];

/* ─── Desktop Nav ──────────────────────────────────────────── */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {NAV_ITEMS.map(({ href, label }) => {
        // "/" hanya aktif kalau exact match; lainnya startsWith
        const isActive =
          href === '/' ? pathname === '/' : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={`
              relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
              after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2
              after:h-0.5 after:rounded-full
              after:bg-gradient-to-r after:from-amber-500 after:to-orange-500
              after:transition-all after:duration-300
              ${isActive
                ? 'text-amber-700 bg-amber-50 after:w-8'
                : 'text-gray-700 hover:text-amber-700 hover:bg-amber-50 after:w-0 hover:after:w-8'
              }
            `}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}

/* ─── Mobile Menu ──────────────────────────────────────────── */
export function MobileMenu({ session }: { session: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition cursor-pointer"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open
          ? <XIcon    className="w-5 h-5 text-gray-700" />
          : <MenuIcon className="w-5 h-5 text-gray-700" />
        }
      </button>

      {open && (
        <div className="absolute right-0 top-14 w-72 rounded-2xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden">
          <div className="p-3 flex flex-col">
            {NAV_ITEMS.map(({ href, label }) => {
              const isActive =
                href === '/' ? pathname === '/' : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`
                    px-4 py-3 rounded-xl text-sm font-semibold transition-all
                    flex items-center gap-3
                    ${isActive
                      ? 'bg-amber-50 text-amber-700'
                      : 'text-gray-700 hover:bg-amber-50 hover:text-amber-700'
                    }
                  `}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  )}
                  {label}
                </Link>
              );
            })}
          </div>

          {!session && (
            <div className="p-3 border-t border-gray-100">
              <Button
                asChild
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white"
              >
                <Link href="/login" onClick={() => setOpen(false)}>
                  Masuk Dashboard
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}