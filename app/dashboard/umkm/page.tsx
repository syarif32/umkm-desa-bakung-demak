import Link from 'next/link';
import { getTenantsForDashboard } from '@/lib/queries/tenants';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { approveTenant, rejectTenant } from '@/lib/actions/tenant';
import { Button } from '@/components/ui/button';
import { StoreIcon, PlusIcon, ExternalLinkIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { CATEGORY_LABELS } from '@/lib/constants/categories';

export const metadata = { title: 'Kelola UMKM — Dashboard' };

export default async function UmkmListPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single();

  const tenants = await getTenantsForDashboard();
  const isAdmin = profile?.role === 'VILLAGE_ADMIN';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">
            {isAdmin ? 'Manajemen Semua UMKM' : 'Toko UMKM Saya'}
          </h1>
          <p className="text-sm text-gray-500">
            {isAdmin ? 'Tinjau dan kelola seluruh UMKM di Desa Bakung.' : 'Kelola profil dan produk toko Anda.'}
          </p>
        </div>
        {/* Tombol ini sekarang muncul untuk SEMUA orang (Admin maupun Warga) */}
        <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-sm">
          <Link href="/dashboard/umkm/new">
            <PlusIcon className="w-4 h-4 mr-2" /> Daftarkan UMKM Baru
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tenants.map((tenant) => (
          <div key={tenant.id} className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col hover:border-amber-200 transition-colors">
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl shadow-inner">
                  {tenant.business_name.charAt(0).toUpperCase()}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1.5 rounded-full ${
                  tenant.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                  tenant.status === 'PENDING_REVIEW' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                }`}>
                  {tenant.status === 'ACTIVE' ? 'Aktif' : tenant.status === 'PENDING_REVIEW' ? 'Menunggu Peninjauan' : 'Ditolak/Nonaktif'}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{tenant.business_name}</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">{CATEGORY_LABELS[tenant.category as keyof typeof CATEGORY_LABELS] ?? tenant.category} • Pemilik: {tenant.owner_name}</p>
            </div>
            
            {/* AREA TOMBOL AKSI */}
            <div className="border-t border-gray-100 p-3 bg-gray-50 flex gap-2 flex-wrap">
              {/* Jika status Pending dan yang melihat adalah Admin, munculkan tombol Approve/Reject */}
              {isAdmin && tenant.status === 'PENDING_REVIEW' ? (
                <>
                  <form action={approveTenant} className="flex-1">
                    <input type="hidden" name="tenantId" value={tenant.id} />
                    <Button type="submit" size="sm" className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg">
                      <CheckCircleIcon className="w-4 h-4 mr-1" /> Setujui
                    </Button>
                  </form>
                  <form action={rejectTenant} className="flex-1">
                    <input type="hidden" name="tenantId" value={tenant.id} />
                    <Button type="submit" size="sm" variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 rounded-lg">
                      <XCircleIcon className="w-4 h-4 mr-1" /> Tolak
                    </Button>
                  </form>
                </>
              ) : (
                // Jika sudah aktif atau yang melihat adalah pemilik UMKM biasa
                <>
                  <Button asChild variant="outline" size="sm" className="flex-1 rounded-lg border-gray-300 text-gray-700 hover:bg-white">
                    <Link href={`/dashboard/umkm/${tenant.id}`}>Kelola Toko</Link>
                  </Button>
                  {tenant.status === 'ACTIVE' && (
                    <Button asChild variant="ghost" size="sm" className="rounded-lg px-3 hover:bg-amber-100 hover:text-amber-700" title="Lihat di Halaman Publik">
                      <a href={`/umkm/${tenant.slug}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLinkIcon className="w-4 h-4 text-gray-500" />
                      </a>
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}

        {tenants.length === 0 && (
          <div className="col-span-full text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <StoreIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-gray-900 font-semibold mb-1">Belum ada UMKM</h3>
            <p className="text-gray-500 text-sm mb-4">Anda belum mendaftarkan toko atau usaha apapun.</p>
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-sm">
              <Link href="/dashboard/umkm/new">
                <PlusIcon className="w-4 h-4 mr-2" /> Daftarkan Sekarang
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}