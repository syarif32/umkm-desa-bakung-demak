import { getVillageInfo } from '@/lib/queries/village';
import { 
  InfoIcon, HeartIcon, MapPinIcon, FlowerIcon, 
  TractorIcon, CompassIcon, MapIcon 
} from 'lucide-react';

export const metadata = { title: 'Profil Desa — Portal Desa Bakung' };

export default async function AboutVillagePage() {
  const villageInfo = await getVillageInfo();

  return (
    <section className="py-16 container mx-auto px-4 max-w-5xl space-y-12">
      {/* HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-2">
          <InfoIcon className="w-4 h-4" />
          <span>Mengenal Lebih Dekat</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-display tracking-tight">
          Profil Desa Bakung
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Menggabungkan warisan sejarah agraris dengan inovasi digital untuk kemandirian ekonomi masyarakat.
        </p>
      </div>

      {/* BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* KOLOM KIRI (SEJARAH & EKONOMI) */}
        <div className="md:col-span-8 space-y-6 flex flex-col">
          
          {/* Card Sejarah */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-300 group flex-1">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FlowerIcon className="w-6 h-6 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">Asal Usul Bunga Bakung</h2>
            <p className="text-gray-600 leading-relaxed">
              Nama "Bakung" lahir dari sejarah panjang saat wilayah ini masih berupa lahan yang dipenuhi hamparan bunga Bakung (sejenis bunga Lili). Menurut riwayat, meskipun lahan tersebut telah dipangkas dan dibuka oleh para pendahulu (Danyang) untuk dijadikan pemukiman, bunga tersebut terus tumbuh subur dengan gigih. Kegigihan alam inilah yang menginspirasi penamaan wilayah yang kini berkembang pesat menjadi Desa Bakung.
            </p>
          </div>

          {/* Card Ekonomi */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:green-200 transition-all duration-300 group flex-1">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TractorIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">Tulang Punggung Agraris</h2>
            <p className="text-gray-600 leading-relaxed">
              Mendominasi <strong>80% total wilayah</strong> dengan hamparan persawahan, sektor agraris merupakan urat nadi perekonomian Desa Bakung. Roda ekonomi digerakkan secara kolektif oleh warga yang berprofesi sebagai petani, buruh tani, serta peternak sapi dan kambing. Melalui portal ini, kami bertekad memperluas ekosistem ekonomi lokal ke tingkat yang lebih modern.
            </p>
          </div>

        </div>

        {/* KOLOM KANAN (INFO GEOGRAFIS & ADMIN) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          
          {/* Card Batas Wilayah */}
          <div className="bg-gray-900 text-white p-8 rounded-3xl border border-gray-800 shadow-lg relative overflow-hidden group flex-1">
            {/* Dekorasi Background */}
            <MapIcon className="absolute -right-6 -bottom-6 w-32 h-32 text-gray-800/50 group-hover:rotate-12 transition-transform duration-700" />
            
            <div className="relative z-10">
              <h3 className="font-bold text-amber-400 text-sm uppercase tracking-widest flex items-center gap-2 mb-6">
                <CompassIcon className="w-4 h-4" /> Geografis Wilayah
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700/50 backdrop-blur-sm">
                  <span className="block text-gray-400 text-xs mb-1">Utara</span>
                  <span className="font-semibold text-gray-100">Desa Mijen</span>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700/50 backdrop-blur-sm">
                  <span className="block text-gray-400 text-xs mb-1">Timur</span>
                  <span className="font-semibold text-gray-100">Desa Jatirejo</span>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700/50 backdrop-blur-sm">
                  <span className="block text-gray-400 text-xs mb-1">Selatan & Barat</span>
                  <span className="font-semibold text-gray-100">Ds. Ngelowetan & Mlaten</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Administrasi */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                <MapPinIcon className="w-5 h-5 text-rose-500" /> Letak Administrasi
              </h3>
              <div className="space-y-3 text-sm divide-y divide-gray-100">
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Kecamatan</span>
                  <span className="font-bold text-gray-900">{villageInfo?.district || 'Mijen'}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Kabupaten</span>
                  <span className="font-bold text-gray-900">{villageInfo?.regency || 'Demak'}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Provinsi</span>
                  <span className="font-bold text-gray-900">{villageInfo?.province || 'Jawa Tengah'}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-start gap-2 text-xs text-gray-400 leading-relaxed bg-gray-50 p-3 rounded-xl">
              <HeartIcon className="w-4 h-4 text-amber-500 shrink-0 fill-amber-100 mt-0.5" />
              <span>Sistem integrasi program pendampingan KKN Universitas Islam Negeri Walisongo Semarang.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}