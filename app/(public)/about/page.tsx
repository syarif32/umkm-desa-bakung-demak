import { getVillageInfo } from '@/lib/queries/village';
import { InfoIcon, HeartIcon, MapPinIcon } from 'lucide-react';

export const metadata = { title: 'Profil Desa — Portal Desa Bakung' };

export default async function AboutVillagePage() {
  const villageInfo = await getVillageInfo();

  return (
    <section className="py-12 container mx-auto px-4 max-w-4xl space-y-10">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-950 font-display flex items-center gap-3">
          <InfoIcon className="w-7 h-7 text-amber-500" /> Profil & Potensi Kewilayahan
        </h1>
        <p className="text-sm text-gray-500 mt-1">Informasi umum struktur pemerintahan dan komoditas utama desa.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Tentang Desa Bakung</h2>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
            {villageInfo?.description || 'Desa Bakung merupakan wilayah subur yang terletak di Kabupaten Demak. Sebagian besar warga memiliki keterampilan turun-temurun dalam menghasilkan olahan pangan bercita rasa otentik, kerajinan tangan yang presisi, serta sektor agraria yang melimpah. Melalui integrasi digital ini, kami bertekad memperluas jangkauan pasar lokal agar mampu berkembang mandiri.'}
          </p>
        </div>

        <div className="md:col-span-4 bg-gray-900 text-white p-6 rounded-2xl border border-gray-800 space-y-4 shadow-md">
          <h3 className="font-bold text-amber-400 text-sm uppercase tracking-wider flex items-center gap-1.5">
            <MapPinIcon className="w-4 h-4" /> Letak Administrasi
          </h3>
          <div className="space-y-3 text-xs divide-y divide-gray-800">
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Kecamatan</span>
              <span className="font-medium text-gray-100">{villageInfo?.district || 'Gajah'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Kabupaten</span>
              <span className="font-medium text-gray-100">{villageInfo?.regency || 'Demak'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Provinsi</span>
              <span className="font-medium text-gray-100">{villageInfo?.province || 'Jawa Tengah'}</span>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-800 flex items-center gap-2 text-[11px] text-gray-400 leading-normal">
            <HeartIcon className="w-5 h-5 text-amber-500 shrink-0 fill-current" />
            <span>Sistem integrasi program pendampingan KKN UIN Walisongo Semarang </span>
          </div>
        </div>
      </div>
    </section>
  );
}