import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getTenantsForDashboard } from '@/lib/queries/tenants';
import { redirect } from 'next/navigation';
import { StoreIcon, UsersIcon, ShoppingBagIcon, TrendingUpIcon, ArrowRightIcon, SparklesIcon } from 'lucide-react';
import Link from 'next/link';

export const metadata = { title: 'Dashboard — Portal Desa Bakung' };

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

  // kalkulasi statistik
  const totalTenants   = tenants.length;
  const activeTenants  = tenants.filter((t) => t.status === 'ACTIVE').length;
  const pendingTenants = tenants.filter((t) => t.status === 'PENDING_REVIEW').length;
  const totalProducts  = tenants.reduce((sum, t) => sum + (t.product_count ?? 0), 0);

  return (
    <div className="space-y-10 pb-10">
      
      {/* hero welcome section */}
      <div className="relative overflow-hidden bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-widest mb-4">
            <SparklesIcon className="w-3 h-3" />
            Sistem Informasi Desa
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 font-display tracking-tight">
            Selamat datang, {profile?.full_name?.split(' ')[0] || 'Admin'}! 👋
          </h1>
          <p className="text-gray-500 mt-2 max-w-xl leading-relaxed font-medium text-sm md:text-base">
            {isAdmin
              ? 'Panel kendali utama untuk memantau pertumbuhan ekonomi dan validasi mitra UMKM Desa Bakung.'
              : 'Pusat kendali unit usaha Anda. Pastikan informasi produk dan profil toko selalu diperbarui.'}
          </p>
        </div>
        {/* ornamen dekoratif bg */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-60"></div>
      </div>

      {/* grid statistik premium */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Mitra" value={totalTenants} icon={<StoreIcon className="w-5 h-5" />} color="amber" />
        <StatCard label="Mitra Aktif" value={activeTenants} icon={<TrendingUpIcon className="w-5 h-5" />} color="green" />
        <StatCard label="Menunggu Review" value={pendingTenants} icon={<UsersIcon className="w-5 h-5" />} color="orange" />
        <StatCard label="Katalog Produk" value={totalProducts} icon={<ShoppingBagIcon className="w-5 h-5" />} color="blue" />
      </div>

      {/* daftar aktivitas / unit usaha */}
      <div className="bg-white rounded-[2rem] border border-gray-200/60 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 text-lg font-display">
            {isAdmin ? 'Pendaftaran UMKM Terbaru' : 'Status Unit Usaha Anda'}
          </h2>
          {isAdmin && (
            <Link href="/dashboard/umkm" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 group">
              Lihat Semua <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
        
        <div className="divide-y divide-gray-50 px-2">
          {tenants.length > 0 ? (
            tenants.slice(0, 6).map((tenant) => (
              <div key={tenant.id} className="flex items-center gap-4 p-5 hover:bg-gray-50/80 rounded-2xl transition-all group mx-2 my-1">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 text-gray-400 group-hover:bg-amber-50 group-hover:border-amber-100 group-hover:text-amber-600 flex items-center justify-center font-bold text-lg shrink-0 transition-colors">
                  {tenant.business_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate text-sm">{tenant.business_name}</p>
                  <p className="text-[11px] font-medium text-gray-400 mt-0.5 uppercase tracking-tighter">
                    {tenant.category} • {tenant.product_count || 0} Koleksi
                  </p>
                </div>
                <div className={`px-4 py-1.5 rounded-xl text-[10px] font-bold shadow-sm border ${
                  tenant.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                  tenant.status === 'PENDING_REVIEW' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                  'bg-gray-50 text-gray-500 border-gray-200'
                }`}>
                  {tenant.status === 'ACTIVE' ? 'Terpublikasi' : tenant.status === 'PENDING_REVIEW' ? 'Review' : 'Draft'}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <StoreIcon className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-400">Belum ada aktivitas data unit usaha.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: 'amber' | 'green' | 'orange' | 'blue' }) {
  const colors = {
    amber:  'bg-amber-50 text-amber-600 border-amber-100/50',
    green:  'bg-emerald-50 text-emerald-600 border-emerald-100/50',
    orange: 'bg-orange-50 text-orange-600 border-orange-100/50',
    blue:   'bg-blue-50 text-blue-600 border-blue-100/50',
  };
  
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all hover:-translate-y-1">
      <div className={`w-12 h-12 rounded-2xl ${colors[color]} border flex items-center justify-center mb-5 shadow-inner`}>
        {icon}
      </div>
      <p className="text-3xl font-black text-gray-900 leading-none">{value}</p>
      <p className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-widest">{label}</p>
    </div>
  );
}