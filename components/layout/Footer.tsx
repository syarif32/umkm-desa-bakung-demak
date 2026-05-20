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

       <div className="border-t border-gray-800/80 pt-8 mt-8">
  
  <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">

    <p className="text-center md:text-left">
      © {currentYear} Hak cipta dilindungi.
    </p>

    <div className="text-center">
      <Link
        href="https://zaeeon-site.vercel.app/"
        target="_blank"
        className="hover:text-amber-500 transition-colors duration-300 font-medium"
      >
          Dikembangkan oleh Zaeoon
      </Link>
      <span className="mx-2 text-gray-600">bersama</span>
      <span>
        KKN Kelompok 03 UIN Walisongo
      </span>
    </div>
  </div>
</div>

      </div>
    </footer>
  );
}