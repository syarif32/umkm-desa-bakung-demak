import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getTenantsForDashboard } from '@/lib/queries/tenants';
import { redirect } from 'next/navigation';
import { StoreIcon, UsersIcon, ShoppingBagIcon, TrendingUpIcon } from 'lucide-react';

export const metadata = { title: 'Dashboard — UMKM Desa Bakung' };

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  const isAdmin = profile?.role === 'VILLAGE_ADMIN';
  const tenants = await getTenantsForDashboard();

  // Kalkulasi data statistik ringkas
  const totalTenants   = tenants.length;
  const activeTenants  = tenants.filter((t) => t.status === 'ACTIVE').length;
  const pendingTenants = tenants.filter((t) => t.status === 'PENDING_REVIEW').length;
  const totalProducts  = tenants.reduce((sum, t) => sum + (t.product_count ?? 0), 0);

  return (
    <div className="space-y-8">
      {/* Header Selamat Datang */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-display">
          Selamat datang, {profile?.full_name?.split(' ')[0]} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {isAdmin
            ? 'Kelola seluruh direktori data pelaku UMKM dan informasi umum profil Desa Bakung dari sini.'
            : 'Kelola pembaruan informasi profil toko digital dan katalog produk UMKM Anda.'}
        </p>
      </div>

      {/* Grid Kartu Statistik — Hanya dirender penuh jika perannya adalah Admin Desa */}
      {isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Mitra UMKM" value={totalTenants} icon={<StoreIcon className="w-5 h-5" />} color="amber" />
          <StatCard label="Mitra Aktif Publik" value={activeTenants} icon={<TrendingUpIcon className="w-5 h-5" />} color="green" />
          <StatCard label="Menunggu Peninjauan" value={pendingTenants} icon={<UsersIcon className="w-5 h-5" />} color="orange" />
          <StatCard label="Total Seluruh Produk" value={totalProducts} icon={<ShoppingBagIcon className="w-5 h-5" />} color="blue" />
        </div>
      )}

      {/* Area Daftar Log Entitas UMKM Terkait */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-bold text-gray-800 text-md">
            {isAdmin ? 'Daftar Pendaftaran UMKM Terbaru' : 'Status Kepemilikan Toko Anda'}
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {tenants.length > 0 ? (
            tenants.slice(0, 6).map((tenant) => (
              <div key={tenant.id} className="flex items-center gap-4 p-4 hover:bg-amber-50/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm shrink-0">
                  {tenant.business_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate text-sm">{tenant.business_name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{tenant.category} · {tenant.product_count} pilihan produk</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  tenant.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                  tenant.status === 'PENDING_REVIEW' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tenant.status === 'ACTIVE' ? 'Aktif' : tenant.status === 'PENDING_REVIEW' ? 'Menunggu' : 'Nonaktif'}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-400 text-sm italic">
              Belum ada data toko UMKM terdaftar yang terhubung dengan akun Anda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-komponen visual Kartu Informasi Angka Statistik
function StatCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: 'amber' | 'green' | 'orange' | 'blue' }) {
  const colors = {
    amber:  'bg-amber-50 text-amber-600',
    green:  'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    blue:   'bg-blue-50 text-blue-600',
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-5">
      <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center mb-4`}>{icon}</div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5 font-medium">{label}</p>
    </div>
  );
}