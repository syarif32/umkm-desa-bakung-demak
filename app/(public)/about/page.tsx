import { getVillageInfo } from '@/lib/queries/village';
import {
  InfoIcon,
  HeartIcon,
  MapPinIcon,
  FlowerIcon,
  TractorIcon,
  CompassIcon,
  MapIcon,
  SparklesIcon,
  TreesIcon,
} from 'lucide-react';

export const metadata = {
  title: 'Profil Desa — Portal Desa Bakung',
};

export default async function AboutVillagePage() {
  const villageInfo = await getVillageInfo();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-gray-50 min-h-screen">

      {/* BACKGROUND BLUR */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-300/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-300/20 blur-[120px] rounded-full -z-10" />

      <section className="pt-36 pb-20 container mx-auto px-4 max-w-6xl space-y-14">

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-amber-200 text-amber-700 text-sm font-bold shadow-sm mb-6">
            <SparklesIcon className="w-4 h-4" />
            Mengenal Desa Lebih Dekat
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900 font-display leading-tight tracking-tight">
            Profil{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              Desa Bakung
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Desa dengan kekuatan agraris, semangat gotong royong,
            dan transformasi digital untuk membangun ekonomi kreatif masyarakat.
          </p>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* LEFT */}
          <div className="lg:col-span-8 space-y-8">

            {/* CARD 1 */}
            <div className="group relative bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-8 shadow-xl shadow-amber-100/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">

              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-100 rounded-full blur-3xl opacity-40" />

              <div className="relative z-10">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-300/40 mb-6 group-hover:scale-110 transition-transform">
                  <FlowerIcon className="w-7 h-7" />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 font-display mb-5">
                  Asal Usul Desa Bakung
                </h2>

                <p className="text-gray-600 leading-relaxed text-[15px]">
                  Nama “Bakung” berasal dari hamparan bunga Bakung yang dahulu tumbuh subur di wilayah ini.
                  Meskipun lahan telah dibuka oleh para pendahulu untuk pemukiman,
                  bunga tersebut tetap tumbuh dengan kuat dan indah.
                  Filosofi ketahanan dan kesuburan itulah yang menjadi identitas Desa Bakung hingga saat ini.
                </p>

              </div>
            </div>

            {/* CARD 2 */}
            <div className="group relative bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-8 shadow-xl shadow-green-100/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">

              <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-40" />

              <div className="relative z-10">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-green-300/40 mb-6 group-hover:scale-110 transition-transform">
                  <TractorIcon className="w-7 h-7" />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 font-display mb-5">
                  Kekuatan Ekonomi Agraris
                </h2>

                <p className="text-gray-600 leading-relaxed text-[15px]">
                  Sebagian besar wilayah Desa Bakung merupakan area persawahan produktif.
                  Pertanian, peternakan, dan UMKM lokal menjadi penggerak utama ekonomi warga.
                  Melalui portal digital ini, desa berupaya memperluas pemasaran produk lokal
                  agar mampu bersaing di era modern.
                </p>

                <div className="mt-8 flex items-center gap-3 flex-wrap">
                  <div className="px-4 py-2 rounded-xl bg-green-50 text-green-700 font-semibold text-sm">
                    80% Area Persawahan
                  </div>

                  <div className="px-4 py-2 rounded-xl bg-amber-50 text-amber-700 font-semibold text-sm">
                    UMKM Lokal Aktif
                  </div>

                  <div className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 font-semibold text-sm">
                    Transformasi Digital
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4 space-y-8">

            {/* GEOGRAFIS */}
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white shadow-2xl">

              <MapIcon className="absolute -bottom-10 -right-10 w-44 h-44 text-white/5" />

              <div className="relative z-10">

                <div className="inline-flex items-center gap-2 text-amber-400 text-sm font-bold uppercase tracking-wider mb-6">
                  <CompassIcon className="w-4 h-4" />
                  Geografis Desa
                </div>

                <div className="space-y-4">

                  <GeoItem
                    title="Sebelah Utara"
                    value="Desa Mijen"
                  />

                  <GeoItem
                    title="Sebelah Timur"
                    value="Desa Jatirejo"
                  />

                  <GeoItem
                    title="Selatan & Barat"
                    value="Ngelowetan & Mlaten"
                  />

                </div>
              </div>
            </div>

            {/* ADMIN */}
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-8 shadow-xl">

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center">
                  <MapPinIcon className="w-6 h-6 text-rose-500" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Informasi Wilayah
                  </h3>

                  <p className="text-sm text-gray-500">
                    Administrasi Desa
                  </p>
                </div>
              </div>

              <div className="space-y-4">

                <AdminItem
                  label="Kecamatan"
                  value={villageInfo?.district || 'Mijen'}
                />

                <AdminItem
                  label="Kabupaten"
                  value={villageInfo?.regency || 'Demak'}
                />

                <AdminItem
                  label="Provinsi"
                  value={villageInfo?.province || 'Jawa Tengah'}
                />

              </div>

              <div className="mt-8 p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                <HeartIcon className="w-5 h-5 text-amber-500 fill-amber-200 shrink-0 mt-0.5" />

                <p className="text-sm text-gray-600 leading-relaxed">
                  Sistem informasi desa hasil kolaborasi program pendampingan
                  KKN Kelompook 03 Universitas Islam Negeri Walisongo Semarang.
                </p>
              </div>

            </div>

            {/* EXTRA CARD */}
            <div className="rounded-[32px] bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white shadow-xl overflow-hidden relative">

              <TreesIcon className="absolute right-0 bottom-0 w-32 h-32 text-white/10" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">
                  Desa Digital & Hijau
                </h3>

                <p className="text-green-50 text-sm leading-relaxed">
                  Menghubungkan potensi lokal dengan teknologi modern
                  untuk menciptakan ekosistem ekonomi desa yang mandiri,
                  berkelanjutan, dan inovatif.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

/* GEO ITEM */
function GeoItem({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
      <p className="text-xs text-gray-400 mb-1">
        {title}
      </p>

      <p className="font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

/* ADMIN ITEM */
function AdminItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <span className="text-gray-500 text-sm">
        {label}
      </span>

      <span className="font-bold text-gray-900">
        {value}
      </span>
    </div>
  );
}