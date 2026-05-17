import { getActiveTenants } from '@/lib/queries/tenants';
import { UmkmCard } from '@/components/public/UmkmCard';
import { StoreIcon, ShoppingBagIcon } from 'lucide-react';
import Link from 'next/link';

export const metadata = { title: 'Direktori UMKM — Portal Desa Bakung' };

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
  // Di Next.js 15, searchParams harus di-await (ditunggu) terlebih dahulu
  const resolvedParams = await searchParams;
  const activeCategory = (resolvedParams.category as string) || 'ALL';

  const allTenants = await getActiveTenants();

  // Proses Filter: Jika yang dipilih "ALL", tampilkan semua. Jika tidak, saring sesuai kategori.
  const filteredTenants = activeCategory === 'ALL'
    ? allTenants
    : allTenants.filter((tenant) => tenant.category === activeCategory);

  return (
    <section className="py-12 container mx-auto px-4 max-w-6xl space-y-8 min-h-screen">
      
      {/* HEADER HALAMAN */}
      <div className="border-b border-gray-200 pb-6 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-950 font-display flex items-center justify-center sm:justify-start gap-3">
          <StoreIcon className="w-8 h-8 text-amber-500" /> Direktori UMKM
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Temukan dan dukung produk lokal karya warga asli Desa Bakung. Klik kartu usaha untuk melihat katalog menu lengkap.
        </p>
      </div>

      {/* FILTER KATEGORI (Pill Menu) */}
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={cat.id === 'ALL' ? '/umkm' : `/umkm?category=${cat.id}`}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 scale-105'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700'
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* GRID DAFTAR UMKM */}
      {filteredTenants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTenants.map((tenant) => (
            <UmkmCard key={tenant.id} tenant={tenant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 max-w-md mx-auto p-6 shadow-sm">
          <ShoppingBagIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-md font-bold text-gray-800">Toko Tidak Ditemukan</h3>
          <p className="text-xs text-gray-400 mt-1.5 mb-4">
            {activeCategory === 'ALL' 
              ? 'Data usaha warga masih dalam proses peninjauan dokumen.' 
              : 'Belum ada UMKM yang terdaftar di kategori ini.'}
          </p>
          {activeCategory !== 'ALL' && (
            <Link href="/umkm" className="inline-block text-sm font-semibold text-amber-600 hover:text-amber-700 hover:underline">
              &larr; Lihat Semua Kategori
            </Link>
          )}
        </div>
      )}
    </section>
  );
}