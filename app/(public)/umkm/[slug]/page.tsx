import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getTenantBySlug } from '@/lib/queries/tenants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TenantContactBlock } from '@/components/public/umkm-page/TenantContactBlock';
import type { SocialLinks, OperatingHours, GeoCoordinates } from '@/types/database';
import { CATEGORY_LABELS } from '@/lib/constants/categories';
import { 
  MapPinIcon, PhoneIcon, ClockIcon, ArrowLeftIcon, 
  ShoppingBagIcon, InfoIcon, ShieldCheckIcon, LayoutGridIcon, StoreIcon 
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tenant = await getTenantBySlug(slug).catch(() => null);
  if (!tenant) return { title: 'UMKM Tidak Ditemukan' };
  return {
    title: `${tenant.business_name} — UMKM Desa Bakung`,
    description: tenant.tagline || `Katalog produk resmi ${tenant.business_name}.`,
  };
}

export default async function UmkmTenantPage({ params }: PageProps) {
  const { slug } = await params;
  const tenant = await getTenantBySlug(slug);
  
  const coordinates  = (tenant.coordinates ?? null) as GeoCoordinates | null;
  const socialLinks  = (tenant.social_links ?? {}) as SocialLinks;
  const hours        = (tenant.operating_hours ?? {}) as OperatingHours;
  const hasProducts  = (tenant.umkm_products || []).length > 0;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* navigasi transparan sticky */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <Link href="/umkm" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-amber-600 transition-colors group">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-amber-50 group-hover:text-amber-600 transition-all">
              <ArrowLeftIcon className="w-4 h-4" />
            </div>
            Kembali ke Direktori UMKM
          </Link>
        </div>
      </div>

      {/* hero area */}
      <section className="relative h-64 md:h-80 w-full bg-gray-100 overflow-hidden">
        {tenant.cover_image_url ? (
          <Image src={tenant.cover_image_url} alt={tenant.business_name} fill className="object-cover" priority />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-300 to-orange-200" />
        )}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent" />
      </section>

      {/* profil brand */}
      <section className="container max-w-6xl mx-auto px-4">
        <div className="relative -mt-20 md:-mt-24 z-20 bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
          
          {/* logo usaha */}
          <div className="shrink-0 -mt-16 md:mt-0">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white relative ring-1 ring-gray-100">
              {tenant.logo_url ? (
                <Image src={tenant.logo_url} alt="Logo" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-amber-50 text-amber-500">
                  <StoreIcon className="w-12 h-12" />
                </div>
              )}
            </div>
          </div>

          {/* info identitas */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                {CATEGORY_LABELS[tenant.category as keyof typeof CATEGORY_LABELS] ?? tenant.category}
              </Badge>
              <div className="flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-[10px] font-bold border border-green-100">
                <ShieldCheckIcon className="w-3.5 h-3.5" /> Terverifikasi
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-display tracking-tight leading-tight">
              {tenant.business_name}
            </h1>
            {tenant.tagline && <p className="text-lg text-gray-600 font-medium">{tenant.tagline}</p>}
            
            <div className="flex flex-wrap items-center gap-4 pt-1 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1.5"><MapPinIcon className="w-4 h-4 text-amber-500" /> {tenant.address || 'Desa Bakung'}</span>
              <span className="flex items-center gap-1.5"><LayoutGridIcon className="w-4 h-4 text-amber-500" /> {tenant.product_count} Produk</span>
            </div>
          </div>

          {/* tombol aksi */}
          <div className="w-full md:w-auto">
            {tenant.whatsapp_number && (
              <Button asChild size="lg" className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold px-8 py-6 shadow-lg shadow-green-500/20 transition-all hover:-translate-y-1">
                <a href={`https://wa.me/${tenant.whatsapp_number.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                  <PhoneIcon className="w-5 h-5 mr-2 fill-current" /> Hubungi Penjual
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* grid konten utama */}
      <section className="container max-w-6xl mx-auto px-4 mt-8 md:mt-12 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* kolom kiri */}
        <div className="w-full lg:w-[65%] space-y-8">
          
          {/* deskripsi */}
          {tenant.description && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-display">
                <InfoIcon className="w-5 h-5 text-amber-500" /> Tentang Usaha Kami
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-[15px]">{tenant.description}</p>
            </div>
          )}

          {/* etalase produk */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 font-display flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-600">
                  <ShoppingBagIcon className="w-5 h-5" />
                </div>
                Etalase Produk
              </h2>
              <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-full">
                {(tenant.umkm_products || []).length} Item
              </span>
            </div>
            
            {hasProducts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {(tenant.umkm_products || []).map((product: any) => (
                  <div key={product.id} className="group bg-white border border-gray-200/80 rounded-2xl overflow-hidden hover:shadow-xl hover:border-amber-200 transition-all duration-300 hover:-translate-y-1.5 flex flex-col">
                    <div className="relative aspect-square w-full bg-gray-50 overflow-hidden border-b border-gray-100">
                      {product.thumbnail_url ? (
                        <img src={product.thumbnail_url} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-100"><ShoppingBagIcon className="w-12 h-12" /></div>
                      )}
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-amber-600 transition-colors text-base font-display">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-end gap-1.5 mb-3">
                        <span className="text-lg font-bold text-amber-600">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price || 0)}
                        </span>
                        {product.price_unit && <span className="text-xs text-gray-500 font-medium mb-1">/ {product.price_unit}</span>}
                      </div>

                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{product.description || 'Katalog produk unggulan lokal Desa Bakung.'}</p>

                      {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.tags.slice(0, 2).map((tag: string) => (
                            <span key={tag} className="text-[9px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded border border-gray-100 font-bold uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="pt-4 border-t border-gray-100/80 mt-auto">
                        <span className="inline-block px-3 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                          {product.category || 'Lokal Bakung'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                <ShoppingBagIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium text-sm text-center px-4">Belum ada produk yang ditambahkan ke etalase ini.</p>
              </div>
            )}
          </div>
        </div>

        {/* kolom kanan */}
        <div className="w-full lg:w-[35%]">
          <div className="sticky top-24 space-y-6">
            <TenantContactBlock ownerName={tenant.owner_name} phone={tenant.phone_number} whatsapp={tenant.whatsapp_number} email={tenant.email} socialLinks={socialLinks} />
            
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg font-display">
                <ClockIcon className="w-5 h-5 text-amber-500" /> Jam Operasional
              </h3>
              {hours && Object.keys(hours).length > 0 ? (
                <div className="space-y-2.5 bg-gray-50/80 rounded-2xl p-4 border border-gray-100 text-sm">
                  {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((hari) => {
                    const dbHours = hours as Record<string, string>;
                    const waktu = dbHours[hari] || dbHours[hari.toLowerCase()] || 'Tutup';
                    const isTutup = waktu.toLowerCase() === 'tutup' || waktu === '-';
                    return (
                      <div key={hari} className="flex justify-between items-center py-1 border-b border-gray-200/40 last:border-0 last:pb-0">
                        <span className="font-semibold text-gray-600">{hari}</span>
                        <span className={`px-3 py-1 rounded-xl text-[11px] font-bold shadow-sm ${isTutup ? 'bg-rose-50 text-rose-500 border border-rose-100' : 'bg-white text-gray-700 border border-gray-200'}`}>
                          {waktu}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-xs font-semibold text-gray-400 uppercase">Jadwal belum diatur</p>
                </div>
              )}
            </div>

            {coordinates?.lat && coordinates?.lng && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg font-display">
                  <MapPinIcon className="w-5 h-5 text-amber-500" /> Peta Lokasi
                </h3>
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-gray-200">
                  <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy" src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&hl=id&z=15&output=embed`} />
                </div>
                <Button asChild variant="outline" className="w-full mt-4 rounded-xl border-amber-200 text-amber-700 hover:bg-amber-50 font-semibold shadow-sm">
                  <a href={`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`} target="_blank" rel="noopener noreferrer">Buka Rute Navigasi</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}