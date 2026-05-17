import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getTenantBySlug } from '@/lib/queries/tenants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/public/umkm-page/ProductCard';
import { TenantContactBlock } from '@/components/public/umkm-page/TenantContactBlock';
import { OperatingHoursTable } from '@/components/public/umkm-page/OperatingHoursTable';
import type { SocialLinks, OperatingHours, GeoCoordinates } from '@/types/database';
import { CATEGORY_LABELS } from '@/lib/constants/categories';
import { 
  MapPinIcon, PhoneIcon, ClockIcon, ArrowLeftIcon, 
  ShoppingBagIcon, InfoIcon, ShieldCheckIcon, LayoutGridIcon , StoreIcon , NavigationIcon
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
    description: tenant.tagline || `Temukan produk unggulan dari ${tenant.business_name}.`,
  };
}

export default async function UmkmTenantPage({ params }: PageProps) {
  const { slug } = await params;
  const tenant = await getTenantBySlug(slug);
    const coordinates  = (tenant.coordinates    ?? null) as GeoCoordinates | null;
  const socialLinks  = (tenant.social_links   ?? {}) as SocialLinks;
  const hours        = (tenant.operating_hours ?? {}) as OperatingHours;
  const hasProducts  = tenant.umkm_products.length > 0;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* NAVIGASI ATAS */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200">
        <div className="container max-w-6xl mx-auto px-4 py-3">
          <Link href="/umkm" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-amber-600 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><ArrowLeftIcon className="w-4 h-4" /></div>
            Kembali ke Direktori UMKM
          </Link>
        </div>
      </div>

      {/* HERO / FOTO SAMPUL */}
      <section className="relative h-64 md:h-80 w-full bg-gray-900 overflow-hidden">
        {tenant.cover_image_url ? (
          <Image src={tenant.cover_image_url} alt={tenant.business_name} fill className="object-cover opacity-60" priority sizes="100vw" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-amber-500 to-orange-400 opacity-90" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
      </section>

      {/* (Floating Header) */}
      <section className="container max-w-6xl mx-auto px-4">
        <div className="relative -mt-24 md:-mt-32 z-10 bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
          
          {/* Logo Box */}
          <div className="shrink-0 -mt-16 md:mt-0">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white relative">
              {tenant.logo_url ? (
                <Image src={tenant.logo_url} alt="Logo" fill sizes="(max-width: 768px) 112px, 144px" className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-50 text-amber-500">
                  <StoreIcon className="w-12 h-12" />
                </div>
              )}
            </div>
          </div>

          {/* Info Singkat */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none text-xs font-bold uppercase px-3 py-1">
                {CATEGORY_LABELS[tenant.category] ?? tenant.category}
              </Badge>
              <Badge className="bg-green-100 text-green-700 border-none text-xs font-bold px-2 py-1 flex items-center gap-1">
                <ShieldCheckIcon className="w-3 h-3" /> Terverifikasi Desa
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-display leading-tight">{tenant.business_name}</h1>
            {tenant.tagline && <p className="text-lg text-gray-600 font-medium">{tenant.tagline}</p>}
            
            <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-gray-500 font-medium">
              {tenant.address && (
                <span className="flex items-center gap-1.5"><MapPinIcon className="w-4 h-4 text-gray-400" /> {tenant.address}</span>
              )}
              <span className="flex items-center gap-1.5"><LayoutGridIcon className="w-4 h-4 text-gray-400" /> {tenant.product_count} Produk</span>
            </div>
          </div>

          {/* Tombol Aksi Kanan */}
          <div className="w-full md:w-auto shrink-0 flex flex-col gap-3">
            {tenant.whatsapp_number && (
              <Button asChild size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold shadow-md shadow-green-500/20 px-8 py-6 text-md hover:-translate-y-1 transition-all">
                <a href={`https://wa.me/${tenant.whatsapp_number.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                  <PhoneIcon className="w-5 h-5 mr-2 fill-current" /> Chat Penjual
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* KONTEN UTAMA (Kiri: Produk & Info, Kanan: Sidebar Sticky) */}
      <section className="container max-w-6xl mx-auto px-4 mt-8 md:mt-12 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* KOLOM KIRI (70%) */}
        <div className="w-full lg:w-[65%] space-y-8">
          
          {/* Box Deskripsi */}
          {tenant.description && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-display">
                <InfoIcon className="w-5 h-5 text-amber-500" /> Tentang Usaha Kami
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-[15px]">{tenant.description}</p>
            </div>
          )}

          {/* Box Produk */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 font-display">
                <ShoppingBagIcon className="w-6 h-6 text-amber-500" /> Etalase Produk
              </h2>
              <span className="text-sm font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{tenant.product_count} Item</span>
            </div>
            
            {hasProducts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {tenant.umkm_products.map((product : any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                  <ShoppingBagIcon className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Katalog Kosong</h3>
                <p className="text-sm text-gray-500 mt-1">Penjual belum mengunggah produk atau menu ke dalam etalase ini.</p>
              </div>
            )}
          </div>
        </div>

        {/* KOLOM KANAN (35% - Sticky Sidebar) */}
        <div className="w-full lg:w-[35%]">
          <div className="sticky top-24 space-y-6">
            <TenantContactBlock ownerName={tenant.owner_name} phone={tenant.phone_number} whatsapp={tenant.whatsapp_number} email={tenant.email} socialLinks={socialLinks} />
            
           {/* JAM OPERASIONAL - RENDER LANGSUNG BERSURAT AMAN */}
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
                    <div key={hari} className="flex justify-between items-center py-1.5 border-b border-gray-200/40 last:border-0 last:pb-0">
                      <span className="font-bold text-gray-650">{hari}</span>
                      <span className={`px-3 py-1 rounded-xl text-xs font-bold tracking-wide shadow-sm ${
                        isTutup 
                          ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                          : 'bg-amber-100 text-amber-800 border border-amber-200/60'
                      }`}>
                        {waktu}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              
              <div className="text-center py-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-4">
                <ClockIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-500">Jam operasional belum dikonfigurasi oleh pemilik toko.</p>
              </div>
            )}
          </div>

           {/* BLOK PETA LOKASI (BARU) */}
            {coordinates && coordinates.lat && coordinates.lng && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg font-display">
                  <MapPinIcon className="w-5 h-5 text-amber-500" /> Peta Lokasi
                </h3>
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-gray-200">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    allowFullScreen 
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&hl=id&z=15&output=embed`}
                  ></iframe>
                </div>
                <Button asChild variant="outline" className="w-full mt-4 rounded-xl border-amber-200 text-amber-700 hover:bg-amber-50 font-semibold">
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`} target="_blank" rel="noopener noreferrer">
                    Buka Rute Navigasi
                  </a>
                </Button>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}