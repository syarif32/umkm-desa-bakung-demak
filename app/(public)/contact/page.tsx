import { getVillageInfo } from '@/lib/queries/village';
import { PhoneIcon, MapPinIcon, ClockIcon, MessagesSquareIcon, ArrowRightIcon } from 'lucide-react';

export const metadata = { title: 'Hubungi Kami — Portal Desa Bakung' };

export default async function ContactPage() {
  const villageInfo = await getVillageInfo();

  return (
    <section className="py-16 container mx-auto px-4 max-w-6xl space-y-12">
      {/* HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-2 border border-blue-100">
          <MessagesSquareIcon className="w-4 h-4" />
          <span>Layanan Cepat Tanggap</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-display tracking-tight">
          Pusat Bantuan & Kontak
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Tim pengelola dan Posko Pendampingan siap membantu kelancaran pendaftaran dan operasional UMKM Anda.
        </p>
      </div>

      {/* DUAL COLUMN LAYOUT (KONTAK & MAPS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* KOLOM KIRI: KARTU KONTAK */}
        <div className="lg:col-span-5 space-y-6">
          {/* Kartu Lokasi */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300">
                <MapPinIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 font-display">Sekretariat Utama</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Balai Desa Bakung, Kecamatan {villageInfo?.district || 'Mijen'}, Kabupaten {villageInfo?.regency || 'Demak'}, Jawa Tengah.
                </p>
              </div>
            </div>
          </div>

          {/* Kartu Jam Operasional */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                <ClockIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 font-display">Jam Pelayanan Posko</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="flex justify-between gap-4"><span className="text-gray-500">Senin - Jumat:</span> <span className="font-medium text-gray-900">08:00 - 15:00 WIB</span></p>
                  <p className="flex justify-between gap-4"><span className="text-gray-500">Sabtu - Minggu:</span> <span className="font-medium text-gray-900">Tutup</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Kartu WhatsApp (CTA Dinamis) */}
          {villageInfo?.contact_phone ? (
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-1 rounded-3xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="bg-white rounded-[22px] p-6 h-full">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <PhoneIcon className="w-6 h-6 fill-current" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 font-display">Layanan WhatsApp</h3>
                    <p className="text-sm text-gray-500 mb-4">{villageInfo.contact_phone}</p>
                    <a 
                      href={`https://wa.me/${villageInfo.contact_phone.replace(/\D/g, '')}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
                    >
                      Kirim Pesan Sekarang <ArrowRightIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-200 text-center">
              <p className="text-sm text-gray-500"><link rel="stylesheet" href="https://umkm-desa-bakung.vercel.app "/>umkm-desa-bakung</p>
            </div>
          )}
        </div>

        {/* KOLOM KANAN: GOOGLE MAPS EMBED */}
        <div className="lg:col-span-7 h-[400px] lg:h-full min-h-[400px] w-full bg-gray-100 rounded-3xl overflow-hidden border-4 border-white shadow-xl relative group">
          {/* Label Overlay di atas Peta */}
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-white/50 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <span className="text-xs font-bold text-gray-900 tracking-wide">Titik Lokasi Balai Desa</span>
          </div>

          {/* Iframe Peta Bebas API Key */}
          <iframe 
            src="https://maps.google.com/maps?q=Kantor%20Kepala%20Desa%20Bakung,%20Mijen,%20Demak&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="absolute inset-0 w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </section>
  );
}