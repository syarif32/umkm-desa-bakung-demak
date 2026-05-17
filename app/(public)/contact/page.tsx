import { getVillageInfo } from '@/lib/queries/village';
import { PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';

export const metadata = { title: 'Hubungi Kami — Portal Desa Bakung' };

export default async function ContactPage() {
  const villageInfo = await getVillageInfo();

  return (
    <section className="py-12 container mx-auto px-4 max-w-2xl space-y-8">
      <div className="border-b border-gray-200 pb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-950 font-display">Pusat Layanan Kontak & Aduan</h1>
        <p className="text-sm text-gray-500 mt-1">Hubungi tim pengelola atau posko KKN jika mengalami kendala pendaftaran mandiri.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0"><MapPinIcon className="w-5 h-5"/></div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Sekretariat Balai Desa</h4>
            <p className="text-xs text-gray-500 mt-1">Kantor Kepala Desa Bakung, Kec. {villageInfo?.district || 'Gajah'}, Kabupaten {villageInfo?.regency || 'Demak'}.</p>
          </div>
        </div>

        {villageInfo?.contact_phone && (
          <div className="flex items-start gap-4 border-t border-gray-100 pt-4">
            <div className="w-9 h-9 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0"><PhoneIcon className="w-4 h-4 fill-current"/></div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Layanan WhatsApp Posko</h4>
              <p className="text-xs text-gray-500 mt-1">{villageInfo.contact_phone}</p>
              <a 
                href={`https://wa.me/${villageInfo.contact_phone.replace(/\D/g, '')}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block text-xs font-semibold text-green-600 hover:text-green-700 mt-2 hover:underline"
              >
                Kirim Pesan WhatsApp Instan &rarr;
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}