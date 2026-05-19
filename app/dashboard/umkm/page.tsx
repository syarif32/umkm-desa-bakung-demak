import Link from 'next/link';
import { getTenantsForDashboard } from '@/lib/queries/tenants';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { approveTenant, rejectTenant } from '@/lib/actions/tenant';
import { Button } from '@/components/ui/button';
import { 
  StoreIcon, PlusIcon, ExternalLinkIcon, CheckCircleIcon, 
  XCircleIcon, UserIcon, LayoutGridIcon 
} from 'lucide-react';
import { CATEGORY_LABELS } from '@/lib/constants/categories';
import { Badge } from '@/components/ui/badge';

export const metadata = { title: 'Manajemen UMKM — Dashboard' };

export default async function UmkmListPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single();

  const tenants = await getTenantsForDashboard();
  const isAdmin = profile?.role === 'VILLAGE_ADMIN';

  return (
    <div className="space-y-8 p-1">
      {/* header dinamis */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">
            {isAdmin ? 'Pusat Manajemen UMKM' : 'Kelola Unit Usaha'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isAdmin 
              ? 'Otorisasi pendaftaran dan pantau seluruh aktivitas ekonomi desa.' 
              : 'Pantau status pendaftaran dan kelola katalog produk toko Anda.'}
          </p>
          
        </div>
        
        <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white rounded-2xl shadow-lg shadow-amber-500/20 px-6 h-12">
          <Link href="/dashboard/umkm/new">
            <PlusIcon className="w-4 h-4 mr-2" /> Daftarkan Unit Baru
          </Link>
        </Button>
      </div>

      {/* tabel manajemen profesional */}
      <div className="bg-white rounded-[2rem] border border-gray-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400">Unit Usaha & Kategori</th>
                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400">Pemilik Sistem</th>
                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400">Status Publikasi</th>
                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 text-right">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/50 group-hover:bg-amber-500 group-hover:text-white transition-all">
                        <StoreIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{tenant.business_name}</p>
                        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-tighter">
                          {CATEGORY_LABELS[tenant.category as keyof typeof CATEGORY_LABELS] ?? tenant.category}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                      <UserIcon className="w-3.5 h-3.5 text-gray-400" />
                      {tenant.owner_name}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <Badge className={`
                      px-3 py-1 rounded-full text-[10px] font-bold border-none shadow-sm
                      ${tenant.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' :
                        tenant.status === 'PENDING_REVIEW' ? 'bg-amber-100 text-amber-700' : 
                        'bg-rose-100 text-rose-700'}
                    `}>
                      {tenant.status === 'ACTIVE' ? 'Terpublikasi' : 
                       tenant.status === 'PENDING_REVIEW' ? 'Menunggu Review' : 'Nonaktif/Ditolak'}
                    </Badge>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      {isAdmin && tenant.status === 'PENDING_REVIEW' ? (
                        <>
                          <form action={async (formData) => { 'use server'; await approveTenant(formData); }}>
                            <input type="hidden" name="tenantId" value={tenant.id} />
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-9 px-4">
                              <CheckCircleIcon className="w-3.5 h-3.5 mr-1.5" /> Setujui
                            </Button>
                          </form>
                          <form action={async (formData) => { 'use server'; await rejectTenant(formData); }}>
                            <input type="hidden" name="tenantId" value={tenant.id} />
                            <Button size="sm" variant="outline" className="border-rose-100 text-rose-600 hover:bg-rose-50 rounded-xl h-9 px-4">
                              <XCircleIcon className="w-3.5 h-3.5 mr-1.5" /> Tolak
                            </Button>
                          </form>
                        </>
                      ) : (
                        <div className="flex gap-2">
                          <Button asChild variant="outline" size="sm" className="rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 h-9 font-bold px-4 text-xs">
                            <Link href={`/dashboard/umkm/${tenant.id}`}>Kelola Sistem</Link>
                          </Button>
                          {tenant.status === 'ACTIVE' && (
                            <Button asChild variant="ghost" size="sm" className="rounded-xl h-9 w-9 p-0 hover:bg-amber-50 hover:text-amber-600 border border-transparent hover:border-amber-100 transition-all">
                              <a href={`/umkm/${tenant.slug}`} target="_blank" rel="noopener noreferrer">
                                <ExternalLinkIcon className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* empty state */}
        {tenants.length === 0 && (
          <div className="text-center py-24 bg-white">
            <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
              <StoreIcon className="w-10 h-10 text-gray-200" />
            </div>
            <h3 className="text-gray-900 font-bold text-lg mb-2">Basis Data Kosong</h3>
            <p className="text-gray-400 text-sm mb-8 max-w-xs mx-auto">
              Sistem belum mencatat adanya unit usaha UMKM yang terdaftar di Desa Bakung.
            </p>
            <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white rounded-2xl px-8 h-12 shadow-xl shadow-gray-900/10 transition-all active:scale-95">
              <Link href="/dashboard/umkm/new">Daftarkan Sekarang</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}