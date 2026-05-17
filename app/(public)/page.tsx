import { getVillageInfo } from '@/lib/queries/village';
import { getActiveTenants } from '@/lib/queries/tenants';
import { UmkmCard } from '@/components/public/UmkmCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  MapPinIcon, StoreIcon, ArrowRightIcon, ShieldCheckIcon, 
  LeafIcon, SearchIcon, MessageCircleIcon, ShoppingBagIcon,
  UtensilsIcon, CoffeeIcon, SparklesIcon, ShirtIcon, SproutIcon, WrenchIcon
} from 'lucide-react';

export default async function HomePage() {
  const villageInfo = await getVillageInfo();
  const tenants = await getActiveTenants();
  const totalProducts = tenants.reduce((acc, t) => acc + (t.product_count || 0), 0);
  
  // Ambil 4 UMKM terbaru untuk dipajang di Beranda
  const featuredTenants = tenants.slice(0, 4);

  const CATEGORIES = [
    { id: 'MAKANAN', label: 'Kuliner & Makanan', icon: UtensilsIcon, color: 'text-red-600 bg-red-100 border-red-200', hover: 'hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-red-500/30' },
    { id: 'MINUMAN', label: 'Minuman Segar', icon: CoffeeIcon, color: 'text-blue-600 bg-blue-100 border-blue-200', hover: 'hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-blue-500/30' },
    { id: 'KERAJINAN', label: 'Kerajinan Tangan', icon: SparklesIcon, color: 'text-purple-600 bg-purple-100 border-purple-200', hover: 'hover:bg-purple-500 hover:text-white hover:border-purple-500 hover:shadow-purple-500/30' },
    { id: 'FASHION', label: 'Pakaian & Mode', icon: ShirtIcon, color: 'text-pink-600 bg-pink-100 border-pink-200', hover: 'hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:shadow-pink-500/30' },
    { id: 'PERTANIAN', label: 'Hasil Tani', icon: SproutIcon, color: 'text-green-600 bg-green-100 border-green-200', hover: 'hover:bg-green-500 hover:text-white hover:border-green-500 hover:shadow-green-500/30' },
    { id: 'JASA', label: 'Jasa & Layanan', icon: WrenchIcon, color: 'text-gray-700 bg-gray-200 border-gray-300', hover: 'hover:bg-gray-700 hover:text-white hover:border-gray-700 hover:shadow-gray-700/30' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-52 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-amber-50 via-green-50/20 to-gray-50/50 -z-20" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-amber-400/10 rounded-full blur-[100px] -z-10 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[40%] bg-green-500/10 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 text-center max-w-5xl relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md text-amber-700 text-xs font-bold uppercase tracking-wider mb-8 border border-amber-200 shadow-sm hover:scale-105 transition-transform cursor-default">
            <LeafIcon className="w-4 h-4 text-green-600" />
            Desa Mandiri, {villageInfo?.district || 'Gajah'}, {villageInfo?.regency || 'Demak'}
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 font-display leading-[1.1] mb-6 tracking-tight">
            Pusat <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Ekonomi Kreatif</span> & Komoditas Desa
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            {villageInfo?.tagline || 'Selamat datang di portal resmi direktori UMKM Desa Bakung.'} Temukan berbagai produk olahan pangan, kerajinan tangan, dan jasa langsung dari warga lokal kami.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-bold shadow-lg shadow-amber-500/30 px-10 py-7 text-lg hover:-translate-y-1 transition-all">
              <Link href="/umkm">
                Mulai Belanja <ShoppingBagIcon className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-amber-300 hover:text-amber-700 rounded-2xl font-bold px-10 py-7 text-lg hover:-translate-y-1 transition-all shadow-sm">
              <Link href="/about">Profil Desa Kami</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. STATISTIK MELAYANG */}
      <section className="relative z-20 -mt-24 mb-20 container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row justify-around items-center gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="text-center px-4 w-full group cursor-default">
            <h3 className="text-5xl font-extrabold text-gray-900 group-hover:text-amber-500 transition-colors">{tenants.length}</h3>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-2">UMKM Terdaftar</p>
          </div>
          <div className="text-center px-4 w-full pt-8 md:pt-0 group cursor-default">
            <h3 className="text-5xl font-extrabold text-gray-900 group-hover:text-amber-500 transition-colors">{totalProducts}</h3>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-2">Produk Tersedia</p>
          </div>
          <div className="text-center px-4 w-full pt-8 md:pt-0 group cursor-default">
            <h3 className="text-5xl font-extrabold text-green-600 flex items-center justify-center gap-1 group-hover:scale-110 transition-transform">
              100<span className="text-3xl">%</span>
            </h3>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-2">Asli Warga Desa</p>
          </div>
        </div>
      </section>

      {/* 3. KATEGORI INTERAKTIF (BARU) */}
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2">Pilih Kategori</h2>
          <h3 className="text-3xl font-extrabold text-gray-900 font-display mb-10">Jelajahi Sesuai Kebutuhan</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/umkm?category=${cat.id}`}
                className={`group flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all duration-300 shadow-sm ${cat.color} ${cat.hover} hover:-translate-y-2`}
              >
                <cat.icon className="w-10 h-10 mb-3 transition-transform group-hover:scale-110" />
                <span className="font-bold text-sm text-center leading-tight">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ETALASE UMKM TERBARU (BARU) */}
      <section className="py-20 bg-white border-t border-gray-100 mt-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2">Terbaru dari Desa</h2>
              <h3 className="text-3xl font-extrabold text-gray-900 font-display">UMKM Unggulan Warga</h3>
            </div>
            <Button asChild variant="ghost" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 font-bold rounded-xl">
              <Link href="/umkm">Lihat Semua UMKM <ArrowRightIcon className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>

          {featuredTenants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredTenants.map((tenant) => (
                <UmkmCard key={tenant.id} tenant={tenant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <StoreIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">Belum ada UMKM yang diterbitkan.</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. CARA KERJA */}
      <section className="py-20 bg-gray-50/50 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2">Panduan Cepat</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-display">Cara Belanja Langsung</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 -translate-y-12 -z-10" />

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-100/50 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 mx-auto bg-amber-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-amber-100">
                <SearchIcon className="w-10 h-10 text-amber-500" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">1. Cari Kebutuhan</h4>
              <p className="text-gray-600 leading-relaxed text-sm">Masuk ke halaman Direktori atau klik tombol Kategori di atas untuk mencari produk.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-100/50 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 mx-auto bg-green-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-green-100">
                <StoreIcon className="w-10 h-10 text-green-500" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">2. Lihat Toko</h4>
              <p className="text-gray-600 leading-relaxed text-sm">Klik kartu toko untuk melihat detail menu, harga, dan deskripsi lengkap dari penjual.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-100/50 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-blue-100">
                <MessageCircleIcon className="w-10 h-10 text-blue-500" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">3. Hubungi via WA</h4>
              <p className="text-gray-600 leading-relaxed text-sm">Jika tertarik, klik nomor WhatsApp toko untuk memesan langsung secara aman ke warga.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BANNER AJAKAN DAFTAR */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 text-center md:text-left space-y-4 md:w-2/3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheckIcon className="w-4 h-4" /> Khusus Warga Desa
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">Punya Usaha Sendiri?</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Tingkatkan penjualan Anda dengan membuat katalog online di portal ini. Pendaftaran 100% gratis dan akan dibantu verifikasinya oleh tim admin desa.
              </p>
            </div>

            <div className="relative z-10 w-full md:w-auto shrink-0">
              <Button asChild size="lg" className="w-full bg-amber-500 hover:bg-amber-400 text-gray-950 rounded-2xl font-bold px-8 py-7 shadow-lg hover:scale-105 transition-transform text-lg">
                <Link href="/register">
                  Daftar Jadi Penjual <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}