import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardTopbar } from '@/components/layout/DashboardTopbar';
import type { UserRole } from '@/types/database';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url, role')
    .eq('id', user.id)
    .single();

  if (!profile) redirect('/login');

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Komponen Sidebar */}
      <DashboardSidebar
        userRole={profile.role as UserRole}
        userName={profile.full_name}
        userAvatar={profile.avatar_url}
      />

      {/* Area Konten Utama */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardTopbar
          userName={profile.full_name}
          userRole={profile.role as UserRole}
        />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gray-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}