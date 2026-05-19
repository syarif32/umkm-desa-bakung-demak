import { getActiveTenants } from '@/lib/queries/tenants';
import { UmkmCard } from '@/components/public/UmkmCard';
import {
  ShoppingBagIcon,
  SparklesIcon,
  ArrowRightIcon,
  StoreIcon,
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Katalog Produk & UMKM — Portal Desa Bakung',
};

const CATEGORIES = [
  { id: 'ALL', label: 'Semua Kategori' },
  { id: 'MAKANAN', label: '🍱 Makanan' },
  { id: 'MINUMAN', label: '🍵 Minuman' },
  { id: 'KERAJINAN', label: '🪡 Kerajinan' },
  { id: 'FASHION', label: '👗 Fashion' },
  { id: 'PERTANIAN', label: '🌾 Pertanian' },
  { id: 'JASA', label: '🔧 Jasa' },
  { id: 'LAINNYA', label: '📦 Lainnya' },
];

export default async function PublicUmkmDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;

  const activeCategory =
    (resolvedParams.category as string) || 'ALL';

  const allTenants = await getActiveTenants();

  const filteredTenants =
    activeCategory === 'ALL'
      ? allTenants
      : allTenants.filter(
          (tenant) => tenant.category === activeCategory
        );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-50/50 via-white to-gray-50 pb-24">

      {/* BACKGROUND BLUR */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-300/20 blur-[120px] rounded-full -z-10" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-300/20 blur-[120px] rounded-full -z-10" />

      {/* HERO */}
      <section className="relative pt-40 pb-24 overflow-hidden">

        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest shadow-sm mb-8">
            <SparklesIcon className="w-4 h-4" />
            Bangga Produk Lokal Desa
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 font-display tracking-tight leading-[1.05]">

            Katalog Digital{' '}

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              UMKM Desa
            </span>

          </h1>

          <p className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Temukan berbagai produk unggulan,
            hasil karya kreatif warga,
            hingga layanan profesional langsung dari masyarakat Desa Bakung.
          </p>

          {/* STATS */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">

            <div className="px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-sm">
              <span className="text-sm text-gray-500">
                Total UMKM
              </span>

              <p className="text-2xl font-black text-gray-900">
                {allTenants.length}
              </p>
            </div>

            <div className="px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-sm">
              <span className="text-sm text-gray-500">
                Kategori
              </span>

              <p className="text-2xl font-black text-gray-900">
                {CATEGORIES.length - 1}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container mx-auto px-4 max-w-7xl relative z-20">

        {/* FILTER */}
        <div className="sticky top-24 z-30 mb-14">

          <div className="bg-white/70 backdrop-blur-2xl border border-white shadow-xl rounded-[28px] p-3 max-w-fit mx-auto overflow-x-auto hide-scrollbar">

            <div className="flex gap-3">

              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={
                    cat.id === 'ALL'
                      ? '/umkm'
                      : `/umkm?category=${cat.id}`
                  }
                  className={`
                    whitespace-nowrap
                    px-5 py-3
                    rounded-2xl
                    text-sm font-bold
                    transition-all duration-300
                    ${
                      activeCategory === cat.id
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-300/40 scale-105'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* GRID */}
        {filteredTenants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {filteredTenants.map((tenant) => (
              <UmkmCard
                key={tenant.id}
                tenant={tenant}
              />
            ))}

          </div>
        ) : (
          <div className="max-w-2xl mx-auto">

            <div className="bg-white/70 backdrop-blur-2xl border border-dashed border-gray-200 rounded-[40px] p-12 text-center shadow-xl">

              <div className="w-24 h-24 rounded-[28px] bg-gray-50 shadow-inner flex items-center justify-center mx-auto mb-8">

                <ShoppingBagIcon className="w-12 h-12 text-gray-300" />

              </div>

              <h3 className="text-3xl font-black text-gray-900 font-display mb-3">
                Belum Ada UMKM
              </h3>

              <p className="text-gray-500 leading-relaxed max-w-md mx-auto mb-8">
                {activeCategory === 'ALL'
                  ? 'Data UMKM sedang dalam proses verifikasi dan pendataan oleh tim pengelola desa.'
                  : 'Kategori ini belum memiliki UMKM yang terdaftar secara resmi.'}
              </p>

              {activeCategory !== 'ALL' && (
                <Link
                  href="/umkm"
                  className="
                    inline-flex items-center gap-2
                    px-6 py-3
                    rounded-2xl
                    bg-gradient-to-r from-gray-900 to-gray-800
                    hover:from-black hover:to-gray-900
                    text-white font-bold text-sm
                    shadow-xl
                    transition-all duration-300
                    hover:-translate-y-1
                  "
                >
                  <StoreIcon className="w-4 h-4" />

                  Lihat Semua Kategori

                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        )}
      </section>

      {/* HIDE SCROLLBAR */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }

            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `,
        }}
      />
    </div>
  );
}