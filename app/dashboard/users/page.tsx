import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toggleUserActive } from '@/lib/actions/auth';
import Link from 'next/link';
import { 
  UserCheckIcon, UserXIcon, ShieldCheckIcon, 
  MailIcon, FingerprintIcon, ClockIcon, UsersIcon
} from 'lucide-react';

export const metadata = { title: 'Verifikasi Warga — Admin' };

export default async function VillageManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = tab || 'pending'; // Default tab adalah 'pending'

  const supabase = await createSupabaseServerClient();
  
  // Mengambil daftar profil dan mengurutkan dari yang terbaru
  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  // Memisahkan data untuk masing-class antrean (mengecualikan Admin Desa agar tidak bisa memblokir dirinya sendiri)
  const pendingUsers = users?.filter((u) => !u.is_active && u.role !== 'VILLAGE_ADMIN') || [];
  const activeUsers = users?.filter((u) => u.is_active && u.role !== 'VILLAGE_ADMIN') || [];

  const displayedUsers = activeTab === 'pending' ? pendingUsers : activeUsers;

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header Area */}
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 font-display flex items-center gap-4 tracking-tight">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/50">
              <ShieldCheckIcon className="w-7 h-7" />
            </div>
            Otorisasi Warga
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl leading-relaxed text-sm md:text-base font-medium">
            Validasi akun pendaftar yang ingin membuka akses toko digital. Pastikan hanya warga asli Desa Bakung yang memiliki hak akses penuh ke dalam sistem ekosistem UMKM.
          </p>
        </div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      {/* Sistem Tab Navigasi */}
      <div className="flex items-center gap-3 border-b border-gray-200/60 pb-px px-2 overflow-x-auto custom-scrollbar">
        <Link 
          href="?tab=pending" 
          className={`flex items-center gap-2 px-6 py-3.5 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'pending' 
            ? 'border-amber-500 text-amber-600 bg-amber-50/50 rounded-t-2xl' 
            : 'border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-t-2xl'
          }`}
        >
          <ClockIcon className="w-4 h-4" /> 
          Antrean Verifikasi 
          <span className={`ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-black ${activeTab === 'pending' ? 'bg-amber-100' : 'bg-gray-100'}`}>
            {pendingUsers.length}
          </span>
        </Link>
        <Link 
          href="?tab=active" 
          className={`flex items-center gap-2 px-6 py-3.5 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'active' 
            ? 'border-emerald-500 text-emerald-600 bg-emerald-50/50 rounded-t-2xl' 
            : 'border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-t-2xl'
          }`}
        >
          <UsersIcon className="w-4 h-4" /> 
          Akun Aktif 
          <span className={`ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-black ${activeTab === 'active' ? 'bg-emerald-100' : 'bg-gray-100'}`}>
            {activeUsers.length}
          </span>
        </Link>
      </div>

      {/* Tabel Data User */}
      <div className="bg-white rounded-[2rem] border border-gray-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400">Identitas Pendaftar</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400">Status & Peran</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400 text-right">Otorisasi Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {displayedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/30 transition-colors group">
                  
                  {/* Kolom Info User */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-400 group-hover:bg-amber-50 group-hover:border-amber-100 group-hover:text-amber-500 transition-colors">
                        <FingerprintIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{user.full_name || 'Tanpa Nama'}</p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                          <MailIcon className="w-3.5 h-3.5" /> {user.email || 'Email tidak tersedia'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Kolom Peran */}
                  <td className="px-8 py-6">
                    <div className="space-y-2">
                      <Badge className={`
                        px-3 py-1 rounded-full text-[10px] font-bold border-none shadow-sm uppercase tracking-wider
                        ${user.role === 'UMKM_OWNER' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'}
                      `}>
                        {user.role === 'UMKM_OWNER' ? 'Pemilik Usaha' : 'Warga Pembeli'}
                      </Badge>
                      <div className="block">
                        <span className={`text-[11px] font-semibold flex items-center gap-1.5 ${user.is_active ? 'text-emerald-600' : 'text-amber-600'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.is_active ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></span>
                          {user.is_active ? 'Terverifikasi Akses Penuh' : 'Menunggu Validasi'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Kolom Aksi */}
                  <td className="px-8 py-6 text-right">
                    <form action={async () => {
                      'use server';
                      await toggleUserActive(user.id, user.is_active);
                    }}>
                      <Button 
                        size="default" 
                        variant={user.is_active ? "outline" : "default"}
                        className={`rounded-xl h-11 px-5 text-xs font-bold transition-all ${
                          user.is_active 
                          ? 'border-rose-100 text-rose-600 hover:bg-rose-50' 
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 active:scale-95'
                        }`}
                      >
                        {user.is_active ? (
                          <><UserXIcon className="w-4 h-4 mr-2" /> Tangguhkan Akses</>
                        ) : (
                          <><UserCheckIcon className="w-4 h-4 mr-2" /> Verifikasi Warga</>
                        )}
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}

              {/* Tampilan Jika Kosong */}
              {displayedUsers.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-8 py-16 text-center">
                    <ShieldCheckIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-900 font-bold text-lg mb-1">
                      {activeTab === 'pending' ? 'Antrean Kosong' : 'Belum Ada Warga Aktif'}
                    </p>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto">
                      {activeTab === 'pending' 
                        ? 'Wah, hebat! Semua pendaftar saat ini sudah divalidasi dan tidak ada antrean yang menunggu.' 
                        : 'Belum ada warga yang divalidasi ke dalam sistem.'}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
      `}</style>
    </div>
  );
}