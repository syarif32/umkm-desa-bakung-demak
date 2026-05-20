import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getTenantBySlug } from '@/lib/queries/tenants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TenantContactBlock } from '@/components/public/umkm-page/TenantContactBlock';

import type {
  SocialLinks,
  OperatingHours,
  GeoCoordinates,
} from '@/types/database';

import { CATEGORY_LABELS } from '@/lib/constants/categories';

import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  ArrowLeftIcon,
  ShoppingBagIcon,
  InfoIcon,
  ShieldCheckIcon,
  LayoutGridIcon,
  StoreIcon,
  SparklesIcon,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const tenant = await getTenantBySlug(slug).catch(() => null);

  if (!tenant) {
    return {
      title: 'UMKM Tidak Ditemukan',
    };
  }

  return {
    title: `${tenant.business_name} — UMKM Desa Bakung`,
    description:
      tenant.tagline ||
      `Katalog produk resmi ${tenant.business_name}.`,
  };
}

export default async function UmkmTenantPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const tenant = await getTenantBySlug(slug);

  const coordinates =
    (tenant.coordinates ?? null) as GeoCoordinates | null;

  const socialLinks =
    (tenant.social_links ?? {}) as SocialLinks;

  const hours =
    (tenant.operating_hours ?? {}) as OperatingHours;

  const hasProducts =
    (tenant.umkm_products || []).length > 0;

  return (
    <div className="min-h-screen bg-[#f8f7f4] pb-24 overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-120px] left-[-120px] w-[380px] h-[380px] bg-amber-200/40 blur-3xl rounded-full" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[380px] h-[380px] bg-orange-200/40 blur-3xl rounded-full" />
      </div>

      {/* TOP NAV */}
      <div className="sticky top-0 z-50 border-b border-[#ece8df] bg-white/80 backdrop-blur-xl">
        <div className="container max-w-6xl mx-auto px-4 h-[74px] flex items-center">
          
          <Link
            href="/umkm"
            className="inline-flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-amber-700 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#f5f3ee] flex items-center justify-center border border-[#ece8df] group-hover:bg-amber-100 transition-all">
              <ArrowLeftIcon className="w-4 h-4" />
            </div>

            <span>Kembali ke Direktori UMKM</span>
          </Link>
        </div>
      </div>

      {/* HERO */}
      <section className="relative h-[240px] md:h-[300px] overflow-hidden">
        
        {tenant.cover_image_url ? (
          <Image
            src={tenant.cover_image_url}
            alt={tenant.business_name}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#ffd6a5] via-[#ff8c42] to-[#d65a00]" />
        )}

        {/* glow tambahan */}
        <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-orange-200/30 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-amber-200/20 blur-3xl rounded-full" />

        {/* BADGE */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-[0.18em] shadow-lg">
            <SparklesIcon className="w-4 h-4" />
            UMKM Lokal Terverifikasi
          </div>
        </div>
      </section>

      {/* PROFILE CARD */}
      <section className="container max-w-6xl mx-auto px-4">
        
        <div className="relative -mt-16 md:-mt-20 z-20">
          
          <div className="bg-white border border-[#ebe7df] rounded-[34px] shadow-[0_15px_50px_rgba(0,0,0,0.06)] p-6 md:p-8 flex flex-col lg:flex-row gap-7 lg:items-center">

            {/* LOGO */}
            <div className="shrink-0">
              
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-[30px] overflow-hidden bg-white border-[5px] border-white shadow-xl relative">

                {tenant.logo_url ? (
                  <Image
                    src={tenant.logo_url}
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-amber-50 flex items-center justify-center text-amber-600">
                    <StoreIcon className="w-14 h-14" />
                  </div>
                )}
              </div>
            </div>

            {/* INFO */}
            <div className="flex-1 space-y-4">

              <div className="flex flex-wrap gap-3">

                <Badge className="bg-amber-100 text-amber-700 border-none px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold">
                  {CATEGORY_LABELS[
                    tenant.category as keyof typeof CATEGORY_LABELS
                  ] ?? tenant.category}
                </Badge>

                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] uppercase tracking-wider font-bold">
                  <ShieldCheckIcon className="w-4 h-4" />
                  Terverifikasi
                </div>
              </div>

              <div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#2b2b2b] leading-tight">
                  {tenant.business_name}
                </h1>

                {tenant.tagline && (
                  <p className="mt-3 text-[15px] md:text-lg text-gray-600 leading-relaxed max-w-2xl">
                    {tenant.tagline}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-5 pt-1 text-sm text-gray-500 font-medium">
                
                <span className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-amber-600" />
                  {tenant.address || 'Desa Bakung'}
                </span>

                <span className="flex items-center gap-2">
                  <LayoutGridIcon className="w-4 h-4 text-amber-600" />
                  {tenant.product_count} Produk
                </span>
              </div>
            </div>

            {/* BUTTON */}
            {tenant.whatsapp_number && (
              <div className="w-full lg:w-auto">
                
                <Button
                  asChild
                  size="lg"
                  className="w-full lg:w-auto rounded-2xl px-8 py-6 bg-[#2f8f5b] hover:bg-[#26744a] text-white font-bold shadow-lg shadow-green-900/10 transition-all hover:-translate-y-1"
                >
                  <a
                    href={`https://wa.me/${tenant.whatsapp_number.replace(
                      /\D/g,
                      ''
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PhoneIcon className="w-5 h-5 mr-2 fill-current" />
                    Hubungi Penjual
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container max-w-6xl mx-auto px-4 mt-8 md:mt-10 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* LEFT */}
        <div className="w-full lg:w-[65%] space-y-8">

          {/* ABOUT */}
          {tenant.description && (
            <div className="bg-white border border-[#ebe7df] rounded-[30px] shadow-sm p-7 md:p-8">

              <h2 className="text-2xl font-black text-[#2b2b2b] flex items-center gap-3 mb-6">
                
                <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <InfoIcon className="w-5 h-5" />
                </div>

                Tentang Usaha
              </h2>

              <p className="text-gray-600 leading-[1.9] whitespace-pre-wrap text-[15px]">
                {tenant.description}
              </p>
            </div>
          )}

          {/* PRODUCTS */}
          <div className="bg-white border border-[#ebe7df] rounded-[30px] shadow-sm p-7 md:p-8">

            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              
              <h2 className="text-2xl font-black text-[#2b2b2b] flex items-center gap-3">

                <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <ShoppingBagIcon className="w-5 h-5" />
                </div>

                Etalase Produk
              </h2>

              <div className="px-4 py-2 rounded-2xl bg-[#f4f2ee] text-gray-700 text-xs font-bold uppercase tracking-wider">
                {(tenant.umkm_products || []).length} Produk
              </div>
            </div>

            {hasProducts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                {(tenant.umkm_products || []).map((product: any) => (
                  <div
                    key={product.id}
                    className="group rounded-[26px] overflow-hidden bg-white border border-[#ebe7df] hover:border-amber-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full"
                  >
                    
                    <div className="relative aspect-square bg-[#f6f4ef] overflow-hidden shrink-0">

                      {product.thumbnail_url ? (
                        <img
                          src={product.thumbnail_url}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                          <ShoppingBagIcon className="w-14 h-14" />
                        </div>
                      )}
                    </div>

                   <div className="p-5 flex flex-col flex-grow overflow-hidden w-full">
  
  {/* Menggunakan truncate agar jika nama produk panjang, otomatis jadi "..." */}
  <h3 className="font-bold text-[#2b2b2b] text-lg truncate group-hover:text-amber-700 transition-colors">
    {product.name}
  </h3>

  {/* KUNCI PERBAIKAN: flex-wrap dan pembatasan lebar (max-w-full) */}
  <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 w-full">
    <span className="text-xl font-black text-amber-700 truncate max-w-full">
      {new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(product.price || 0)}
    </span>
    
    {product.price_unit && (
      <span className="text-xs text-gray-400 truncate max-w-full">
        / {product.price_unit}
      </span>
    )}
  </div>

  <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-2">
    {product.description || 'Produk unggulan lokal Desa Bakung.'}
  </p>

  <div className="pt-4 mt-auto border-t border-[#f1eee8]">
    <span className="inline-block px-3 py-1 rounded-xl bg-[#f6f4ef] text-gray-600 text-[10px] font-bold uppercase tracking-wider truncate max-w-full">
      {product.category || 'Lokal'}
    </span>
  </div>
  
</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-[#f8f7f4] rounded-[28px] border-2 border-dashed border-[#e6e1d8]">

                <ShoppingBagIcon className="w-14 h-14 text-gray-300 mx-auto mb-4" />

                <h3 className="text-xl font-bold text-[#2b2b2b] mb-2">
                  Belum Ada Produk
                </h3>

                <p className="text-gray-500 text-sm">
                  Penjual belum menambahkan produk ke etalase.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-[35%]">
          
          <div className="sticky top-24 space-y-6">

            <TenantContactBlock
              ownerName={tenant.owner_name}
              phone={tenant.phone_number}
              whatsapp={tenant.whatsapp_number}
              email={tenant.email}
              socialLinks={socialLinks}
            />

            {/* HOURS */}
            <div className="bg-white border border-[#ebe7df] rounded-[30px] shadow-sm p-6">

              <h3 className="text-xl font-black text-[#2b2b2b] flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <ClockIcon className="w-5 h-5" />
                </div>

                Jam Operasional
              </h3>

              {hours && Object.keys(hours).length > 0 ? (
                <div className="space-y-3">

                  {[
                    'Senin',
                    'Selasa',
                    'Rabu',
                    'Kamis',
                    'Jumat',
                    'Sabtu',
                    'Minggu',
                  ].map((hari) => {
                    const dbHours =
                      hours as Record<string, string>;

                    const waktu =
                      dbHours[hari] ||
                      dbHours[hari.toLowerCase()] ||
                      'Tutup';

                    const isTutup =
                      waktu.toLowerCase() === 'tutup' ||
                      waktu === '-';

                    return (
                      <div
                        key={hari}
                        className="flex items-center justify-between px-4 py-3 rounded-2xl bg-[#f8f7f4] border border-[#efebe4]"
                      >
                        <span className="font-semibold text-gray-600">
                          {hari}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-xl text-xs font-bold ${
                            isTutup
                              ? 'bg-rose-100 text-rose-600'
                              : 'bg-white border border-[#ebe7df] text-gray-700'
                          }`}
                        >
                          {waktu}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center rounded-2xl border border-dashed border-[#e6e1d8] bg-[#f8f7f4] text-gray-400 text-sm font-medium">
                  Jadwal belum diatur
                </div>
              )}
            </div>

            {/* MAP */}
            {coordinates?.lat && coordinates?.lng && (
              <div className="bg-white border border-[#ebe7df] rounded-[30px] shadow-sm p-6">

                <h3 className="text-xl font-black text-[#2b2b2b] flex items-center gap-3 mb-5">

                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <MapPinIcon className="w-5 h-5" />
                  </div>

                  Lokasi Usaha
                </h3>

                <div className="overflow-hidden rounded-2xl border border-[#ebe7df] h-[220px]">

                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&hl=id&z=15&output=embed`}
                  />
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="w-full mt-5 rounded-2xl border-[#e3d7c6] text-amber-700 hover:bg-amber-50 font-bold h-12"
                >
                  <a
                    href={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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