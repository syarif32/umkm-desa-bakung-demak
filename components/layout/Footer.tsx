import Link from 'next/link';
import { MapPinIcon, HeartIcon, StoreIcon, ChevronRightIcon } from 'lucide-react';

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-gray-900 pt-16 pb-8 mt-auto text-gray-400">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* grid konten footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* informasi brand */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="flex items-center gap-3 text-white group w-fit">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                <StoreIcon className="w-5 h-5 text-amber-500 group-hover:text-white transition-colors" />
              </div>
              <span className="text-2xl font-bold font-display tracking-tight">Desa Bakung</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Katalog digital dan pusat informasi UMKM resmi Desa Bakung. Mengintegrasikan potensi lokal dengan teknologi cerdas untuk kemandirian ekonomi berkelanjutan.
            </p>
          </div>

          {/* tautan cepat */}
          <div className="md:col-span-3 space-y-5">
            <h3 className="text-white font-bold tracking-wider text-xs uppercase">Tautan Cepat</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="flex items-center gap-2 hover:text-amber-500 transition-colors w-fit">
                  <ChevronRightIcon className="w-3 h-3" /> Beranda
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center gap-2 hover:text-amber-500 transition-colors w-fit">
                  <ChevronRightIcon className="w-3 h-3" /> Profil Desa
                </Link>
              </li>
              <li>
                <Link href="/umkm" className="flex items-center gap-2 hover:text-amber-500 transition-colors w-fit">
                  <ChevronRightIcon className="w-3 h-3" /> Direktori UMKM
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-2 hover:text-amber-500 transition-colors w-fit">
                  <ChevronRightIcon className="w-3 h-3" /> Pusat Bantuan
                </Link>
              </li>
            </ul>
          </div>

          {/* informasi kontak */}
          <div className="md:col-span-4 space-y-5">
            <h3 className="text-white font-bold tracking-wider text-xs uppercase">Sekretariat</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 bg-gray-900/50 p-3 rounded-xl border border-gray-800/50">
                <MapPinIcon className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
                <span className="leading-relaxed">
                  Balai Desa Bakung, Kec. Mijen,<br />Kabupaten Demak, Jawa Tengah.
                </span>
              </li>
            </ul>
          </div>
          
        </div>

        {/* garis bawah & hak cipta */}
        <div className="border-t border-gray-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>© {currentYear} Pemerintah Desa Bakung. Hak cipta dilindungi.</p>
          <p className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 rounded-full border border-gray-800">
            Dikembangkan dengan <HeartIcon className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" /> oleh Tim KKN UIN Walisongo
          </p>
        </div>

      </div>
    </footer>
  );
}