import { UserIcon } from 'lucide-react';
import type { UserRole } from '@/types/database';

interface TopbarProps {
  userName: string;
  userRole: UserRole;
}

export function DashboardTopbar({ userName, userRole }: TopbarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8 shrink-0">
      <div className="flex items-center">
        <h2 className="text-md font-semibold text-gray-800 md:hidden uppercase tracking-wider">
          Panel Desa
        </h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex flex-col text-right hidden sm:block">
          <span className="text-sm font-medium text-gray-900">{userName}</span>
          <span className="text-xs text-gray-500">
            {userRole === 'VILLAGE_ADMIN' ? 'Administrator' : 'Pelaku UMKM'}
          </span>
        </div>
        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-600">
          <UserIcon className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}