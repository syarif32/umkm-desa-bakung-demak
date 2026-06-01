'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/lib/actions/auth';
import type { UserRole } from '@/types/database';
import { 
  LayoutDashboardIcon, 
  StoreIcon, 
  MapIcon, 
  SettingsIcon, 
  LogOutIcon,
  UserIcon,
  ShieldCheckIcon
} from 'lucide-react';

interface SidebarProps {
  userRole: UserRole;
  userName: string;
  userAvatar?: string | null;
}

export function DashboardSidebar({ userRole, userName, userAvatar }: SidebarProps) {
  const pathname = usePathname();
  const isAdmin = userRole === 'VILLAGE_ADMIN';

  const menuItems = [
    {
      label: 'Ringkasan',
      href: '/dashboard',
      icon: <LayoutDashboardIcon className="w-5 h-5" />,
      show: true,
    },
    {
      label: 'Kelola UMKM',
      href: '/dashboard/umkm',
      icon: <StoreIcon className="w-5 h-5" />,
      show: true,
    },
    {
      label: 'Verifikasi Warga',
      href: '/dashboard/users',
      icon: <ShieldCheckIcon className="w-5 h-5" />,
      show: isAdmin, 
    },
    {
      label: 'Informasi Desa',
      href: '/dashboard/village',
      icon: <MapIcon className="w-5 h-5" />,
      show: isAdmin, // Hanya muncul untuk Admin Desa
    },
    
    {
  label: 'Pengaturan (Maintenance)',
  href: '#',
  icon: <SettingsIcon className="w-5 h-5" />,
  show: true,
  disabled: true,
},
  ];

  return (
    <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col h-full border-r border-gray-800 hidden md:flex">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800 bg-gray-950">
        <span className="text-md font-bold text-white tracking-wide uppercase">
          Panel Kontrol Desa
        </span>
      </div>

      {/* Profil Ringkas User */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-3 bg-gray-900/50">
        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold shrink-0">
          {userName ? userName.charAt(0).toUpperCase() : <UserIcon className="w-5 h-5" />}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{userName}</p>
          <p className="text-xs text-amber-400 font-medium truncate">
            {isAdmin ? 'Admin Desa' : 'Pemilik UMKM'}
          </p>
        </div>
      </div>

      {/* Navigasi Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          if (!item.show) return null;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/10 font-semibold'
                  : 'hover:bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Tombol Keluar */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-left"
        >
          <LogOutIcon className="w-5 h-5" />
          Keluar Sistem
        </button>
      </div>
    </aside>
  );
}