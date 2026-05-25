import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardTopbar } from '@/components/layout/DashboardTopbar';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/actions/auth';
import { ClockIcon, LogOutIcon, ShieldAlertIcon } from 'lucide-react';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name, is_active')
    .eq('id', user.id)
    .single();

  // PROTEKSI UTAMA: Jika user adalah Pemilik UMKM dan belum diaktivasi oleh Admin
  if (profile?.role === 'UMKM_OWNER' && !profile.is_active) {
    return (
      <div className="min-h-screen bg-amber-50/60 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] border border-amber-100 p-8 text-center shadow-xl shadow-amber-900/5 relative overflow-hidden">
          
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mx-auto mb-6 border border-amber-200/50 animate-pulse">
            <ClockIcon className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-black text-gray-900 font-display tracking-tight">
            Akun Menunggu Verifikasi
          </h1>
          
          <p className="text-gray-500 text-sm mt-3 leading-relaxed font-medium">
            Halo, <span className="text-gray-800 font-bold">{profile.full_name}</span>. Pendaftaran Anda sebagai <span className="text-amber-600 font-bold">Pemilik UMKM</span> telah kami terima dan saat ini sedang dalam antrean peninjauan oleh Admin Desa Bakung.
          </p>

          <div className="mt-6 p-4 rounded-2xl bg-amber-50/50 border border-amber-100/70 text-left flex gap-3 items-start">
            <ShieldAlertIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] font-semibold text-amber-800 leading-relaxed">
              Setelah Admin memverifikasi berkas dan status warga Anda, halaman kontrol toko dan manajemen katalog produk ini akan otomatis terbuka secara penuh.
            </p>
          </div>

          <form action={signOut} className="mt-8 border-t pt-6 border-gray-50">
            <Button type="submit" variant="outline" className="w-full rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-xs h-11">
              <LogOutIcon className="w-4 h-4 mr-2" /> Keluar dari Sistem
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Jika lolos verifikasi (Atau jika dia Admin), render dashboard normal
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <DashboardSidebar userRole={profile?.role} userName={profile?.full_name || ''} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardTopbar userName={profile?.full_name || ''} userRole={profile?.role || 'USER'} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}