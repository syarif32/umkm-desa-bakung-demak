import { getTenantById } from '@/lib/queries/tenants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { approveTenant, rejectTenant } from '@/lib/actions/tenant';
import { 
  StoreIcon, UserIcon, MapPinIcon, PhoneIcon, 
  CheckCircleIcon, XCircleIcon, ArrowLeftIcon, 
  InfoIcon, ShieldCheckIcon
} from 'lucide-react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata = { title: 'Review Pendaftaran UMKM — Admin' };

export default async function ReviewTenantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // proteksi sisi server: pastikan hanya admin yang bisa buka
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single();
  
  if (profile?.role !== 'VILLAGE_ADMIN') redirect('/dashboard');

  const tenant = await getTenantById(id);
  if (!tenant) notFound();

  const isPending = tenant.status === 'PENDING_REVIEW';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* navigasi */}
      <Link href={`/dashboard/umkm/${id}`} className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-amber-600 transition-colors">
        <ArrowLeftIcon className="w-4 h-4" /> Kembali ke Manajemen Unit
      </Link>

      {/* header status */}
      <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
            <StoreIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">{tenant.business_name}</h1>
            <Badge className={`mt-1 border-none ${isPending ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
              Status: {tenant.status}
            </Badge>
          </div>
        </div>

        {isPending && (
          <div className="flex gap-3 w-full md:w-auto">
             <form action={async (fd) => { 'use server'; await approveTenant(fd); }}>
                <input type="hidden" name="tenantId" value={tenant.id} />
                <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold px-6">
                  <CheckCircleIcon className="w-4 h-4 mr-2" /> Setujui
                </Button>
              </form>
              <form action={async (fd) => { 'use server'; await rejectTenant(fd); }}>
                <input type="hidden" name="tenantId" value={tenant.id} />
                <Button variant="outline" className="w-full md:w-auto border-red-100 text-red-600 hover:bg-red-50 rounded-xl font-bold px-6">
                  <XCircleIcon className="w-4 h-4 mr-2" /> Tolak
                </Button>
              </form>
          </div>
        )}
      </div>

      {/* detail data pendaftar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <UserIcon className="w-3.5 h-3.5" /> Identitas Pemilik
          </h3>
          <div className="space-y-1">
            <p className="text-sm font-bold text-gray-900">{tenant.owner_name}</p>
            <p className="text-xs text-gray-500">{tenant.email || 'Email tidak tersedia'}</p>
            <p className="text-xs text-gray-500">{tenant.phone_number || tenant.whatsapp_number || '-'}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <MapPinIcon className="w-3.5 h-3.5" /> Alamat Unit
          </h3>
          <div className="space-y-1">
            <p className="text-sm font-bold text-gray-900">{tenant.address || 'Desa Bakung'}</p>
            <p className="text-xs text-gray-500">RT/RW: {tenant.rt_rw || '-'}</p>
          </div>
        </div>
      </div>

      {/* narasi profil */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
          <InfoIcon className="w-3.5 h-3.5" /> Deskripsi Usaha
        </h3>
        <p className="text-gray-600 leading-relaxed text-[15px] italic">
          {tenant.description || 'Tidak ada deskripsi yang dilampirkan.'}
        </p>
      </div>

      {/* peringatan keamanan */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
        <ShieldCheckIcon className="w-6 h-6 text-blue-600 shrink-0" />
        <div>
          <p className="text-sm font-bold text-blue-900">Catatan untuk Admin</p>
          <p className="text-xs text-blue-700 mt-1">
            Pastikan unit usaha ini benar-benar milik warga Desa Bakung. Dengan mengeklik "Setujui", toko ini akan langsung dapat diakses oleh publik melalui halaman utama portal desa.
          </p>
        </div>
      </div>
    </div>
  );
}