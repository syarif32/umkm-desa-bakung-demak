import { getActiveTenants } from '@/lib/queries/tenants';
import { UmkmCard } from '@/components/public/UmkmCard';
import { ShoppingBagIcon, SparklesIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

export const metadata = { title: 'Katalog Produk & UMKM — Portal Desa Bakung' };

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
  const activeCategory = (resolvedParams.category as string) || 'ALL';

  const allTenants = await getActiveTenants();


  const filteredTenants = activeCategory === 'ALL'
    ? allTenants
    : allTenants.filter((tenant) => tenant.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      
      <section className="bg-white border-b border-gray-200/80 pt-16 pb-20 relative overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl opacity-30 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-amber-400/20 blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[50%] rounded-full bg-emerald-400/10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-xs font-bold tracking-widest uppercase border border-amber-200/50 mb-2">
            <SparklesIcon className="w-4 h-4" />
            Bangga Buatan Desa Bakung
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-display tracking-tight leading-tight">
            Katalog Digital <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
              UMKM Potensial
            </span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Jelajahi karya otentik, hasil bumi segar, dan layanan profesional langsung dari tangan masyarakat asli Desa Bakung. Dukung ekonomi lokal sekarang!
          </p>
        </div>
      </section>

    
      <section className="container mx-auto px-4 max-w-7xl -mt-8 relative z-20">
     
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200/80 p-2 rounded-3xl shadow-sm mb-12 mx-auto max-w-fit flex overflow-x-auto hide-scrollbar snap-x relative z-30">
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={cat.id === 'ALL' ? '/umkm' : `/umkm?category=${cat.id}`}
                className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 snap-center ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
                    : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* GRID DAFTAR UMKM */}
        {filteredTenants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {filteredTenants.map((tenant) => (
              <UmkmCard key={tenant.id} tenant={tenant} />
            ))}
          </div>
        ) : (
          /* EMPTY STATE MODERN */
          <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-[2.5rem] border-2 border-dashed border-gray-200 max-w-2xl mx-auto p-8 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <ShoppingBagIcon className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 font-display mb-2">Belum Ada Usaha</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              {activeCategory === 'ALL' 
                ? 'Data pelaku UMKM saat ini sedang dalam proses pendataan dan peninjauan dokumen administrasi.' 
                : `Sayang sekali, belum ada UMKM yang terdaftar secara resmi untuk kategori ini.`}
            </p>
            {activeCategory !== 'ALL' && (
              <Link 
                href="/umkm" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Lihat Semua Kategori <ArrowRightIcon className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}
      </section>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}