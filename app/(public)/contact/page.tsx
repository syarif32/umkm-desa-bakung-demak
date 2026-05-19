import { getVillageInfo } from '@/lib/queries/village';
import {
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  MessagesSquareIcon,
  ArrowRightIcon,
  SparklesIcon,
} from 'lucide-react';

export const metadata = {
  title: 'Hubungi Kami — Portal Desa Bakung',
};

export default async function ContactPage() {
  const villageInfo = await getVillageInfo();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-gray-50 min-h-screen">

      {/* BACKGROUND BLUR */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-300/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-300/20 blur-[120px] rounded-full -z-10" />

      <section className="pt-36 pb-20 container mx-auto px-4 max-w-7xl space-y-14">

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-blue-100 text-blue-700 text-sm font-bold shadow-sm mb-6">
            <SparklesIcon className="w-4 h-4" />
            Layanan Cepat & Responsif
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900 font-display leading-tight tracking-tight">
            Hubungi{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
              Tim Kami
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Tim pengelola dan posko pendampingan UMKM siap membantu
            kebutuhan informasi, pendaftaran, hingga konsultasi layanan desa digital.
          </p>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* LEFT */}
          <div className="lg:col-span-5 space-y-6">

            {/* LOCATION */}
            <div className="group bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-7 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">

              <div className="flex items-start gap-5">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-300/40 group-hover:scale-110 transition-transform">
                  <MapPinIcon className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">
                    Sekretariat Desa
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-sm">
                    Balai Desa Bakung, Kecamatan{' '}
                    {villageInfo?.district || 'Mijen'},
                    Kabupaten {villageInfo?.regency || 'Demak'},
                    Jawa Tengah.
                  </p>
                </div>

              </div>
            </div>

            {/* OPERASIONAL */}
            <div className="group bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-7 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">

              <div className="flex items-start gap-5">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-300/40 group-hover:scale-110 transition-transform">
                  <ClockIcon className="w-7 h-7" />
                </div>

                <div className="w-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-display">
                    Jam Pelayanan
                  </h3>

                  <div className="space-y-3">

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                      <span className="text-sm text-gray-500">
                        Senin - Jumat
                      </span>

                      <span className="text-sm font-bold text-gray-900">
                        08:00 - 15:00 WIB
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                      <span className="text-sm text-gray-500">
                        Sabtu - Minggu
                      </span>

                      <span className="text-sm font-bold text-rose-500">
                        Tutup
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* WHATSAPP */}
            {villageInfo?.contact_phone ? (
              <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-500 to-green-600 p-[1px] shadow-2xl shadow-emerald-300/30 hover:-translate-y-1 transition-all duration-500">

                <div className="bg-white rounded-[30px] p-7 h-full">

                  <div className="flex items-start gap-5">

                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <PhoneIcon className="w-7 h-7 fill-current" />
                    </div>

                    <div className="flex-1">

                      <h3 className="text-xl font-bold text-gray-900 mb-1 font-display">
                        WhatsApp Center
                      </h3>

                      <p className="text-sm text-gray-500 mb-5">
                        {villageInfo.contact_phone}
                      </p>

                      <a
                        href={`https://wa.me/${villageInfo.contact_phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex items-center justify-center gap-2
                          w-full px-5 py-3
                          rounded-2xl
                          bg-gradient-to-r from-emerald-500 to-green-600
                          hover:from-emerald-600 hover:to-green-700
                          text-white font-bold text-sm
                          shadow-lg shadow-emerald-300/30
                          transition-all duration-300
                          hover:scale-[1.02]
                        "
                      >
                        Kirim Pesan Sekarang
                        <ArrowRightIcon className="w-4 h-4" />
                      </a>

                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="bg-white/70 backdrop-blur-xl border border-dashed border-gray-200 rounded-[32px] p-8 text-center shadow-sm">
                <p className="text-sm text-gray-500">
                  Informasi kontak belum tersedia.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT / MAP */}
          <div className="lg:col-span-7">

            <div className="relative h-[450px] lg:h-full min-h-[500px] overflow-hidden rounded-[36px] border border-white bg-white shadow-2xl">

              {/* OVERLAY */}
              <div className="absolute top-5 left-5 z-10 bg-white/90 backdrop-blur-xl border border-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-3">

                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>

                <div>
                  <p className="text-xs text-gray-500">
                    Lokasi Aktif
                  </p>

                  <p className="text-sm font-bold text-gray-900">
                    Balai Desa Bakung
                  </p>
                </div>

              </div>

              {/* MAP */}
              <iframe
                src="https://maps.google.com/maps?q=Kantor%20Kepala%20Desa%20Bakung,%20Mijen,%20Demak&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}