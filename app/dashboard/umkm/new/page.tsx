'use client';

import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { createTenant } from '@/lib/actions/tenant';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { LocationPicker } from '@/components/dashboard/LocationPicker';
import { ArrowLeftIcon, StoreIcon, MapPinIcon, ClockIcon } from 'lucide-react';

export default function NewUmkmPage() {
  const [state, formAction, isPending] = useActionState(createTenant, { message: '' } as any);
  
  // State untuk menyimpan nama otomatis dari database
  const [ownerName, setOwnerName] = useState('');
  const supabase = createSupabaseBrowserClient();

  // Tarik data profil saat halaman dimuat
  useEffect(() => {
    async function fetchUserProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
          
        if (profile?.full_name) {
          setOwnerName(profile.full_name);
        }
      }
    }
    fetchUserProfile();
  }, [supabase]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div>
        <Link href="/dashboard/umkm" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeftIcon className="w-4 h-4" /> Kembali ke Manajemen UMKM
        </Link>
      </div>

      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
          <StoreIcon className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-display">Daftarkan UMKM Baru</h1>
          <p className="text-xs text-gray-500 mt-0.5">Lengkapi profil, jam operasional, dan lokasi peta usaha Anda.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 lg:p-8">
        <form action={formAction} className="space-y-8">
          
          {state?.message && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
              {state.message}
            </div>
          )}

          {/* BAGIAN 1: INFO DASAR */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2"><StoreIcon className="w-4 h-4 text-amber-500"/> Informasi Dasar</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama UMKM / Usaha <span className="text-red-500">*</span></label>
                <input type="text" name="business_name" required placeholder="Contoh: Keripik Tempe Bakung" className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Pemilik <span className="text-red-500">*</span></label>
                {/* Kolom ini sekarang otomatis terisi tapi tetap bisa diedit jika nama pemilik usahanya berbeda */}
                <input 
                  type="text" 
                  name="owner_name" 
                  required 
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Contoh: Ibu Siti" 
                  className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kategori Usaha <span className="text-red-500">*</span></label>
                <select name="category" required className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                  <option value="MAKANAN">🍱 Makanan</option>
                  <option value="MINUMAN">🍵 Minuman</option>
                  <option value="KERAJINAN">🪡 Kerajinan Tangan</option>
                  <option value="FASHION">👗 Pakaian & Aksesoris</option>
                  <option value="PERTANIAN">🌾 Pertanian / Perkebunan</option>
                  <option value="JASA">🔧 Jasa & Layanan</option>
                  <option value="LAINNYA">📦 Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nomor WhatsApp <span className="text-red-500">*</span></label>
                <input type="text" name="whatsapp_number" required placeholder="08123456789" className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Telepon Biasa (Opsional)</label>
                <input type="text" name="phone_number" placeholder="08123456789" className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slogan / Tagline (Opsional)</label>
                <input type="text" name="tagline" placeholder="Renyah, Gurih, Mantap!" className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi Cerita Usaha</label>
                <textarea name="description" rows={3} placeholder="Ceritakan keunggulan produk Anda..." className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none" />
              </div>
            </div>
          </div>

          {/* BAGIAN 2: LOKASI & PETA */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2"><MapPinIcon className="w-4 h-4 text-amber-500"/> Lokasi & Peta</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Alamat Jalan <span className="text-red-500">*</span></label>
                <input type="text" name="address" required placeholder="Jl. Raya Bakung No. 12" className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">RT / RW <span className="text-red-500">*</span></label>
                <input type="text" name="rt_rw" required placeholder="RT 02 / RW 04" className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
              </div>
              
              <div className="sm:col-span-2 bg-blue-50 p-4 rounded-xl border border-blue-100 mb-2">
                <p className="text-xs text-blue-700 mb-2"><strong>Cara isi Peta:</strong> Buka Google Maps, cari lokasi Anda, klik kanan lalu salin angka kordinatnya (Misal: <strong>-6.8912, 110.6381</strong>).</p>
              <div className="mt-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tandai Lokasi di Peta</label>
                <LocationPicker />
              </div>
              </div>
            </div>
          </div>

          {/* BAGIAN 3: JAM BUKA */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2"><ClockIcon className="w-4 h-4 text-amber-500"/> Jam Operasional</h3>
            <p className="text-xs text-gray-500 mb-4">Kosongkan atau tulis "Tutup" jika libur. Tulis format seperti <strong>08:00 - 17:00</strong> atau <strong>Buka 24 Jam</strong>.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((hari) => (
                <div key={hari} className="flex items-center gap-3">
                  <label className="w-20 text-sm font-semibold text-gray-700">{hari}</label>
                  <input type="text" name={`hours_${hari.toLowerCase()}`} defaultValue="08:00 - 17:00" className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-2">
            <Button type="submit" disabled={isPending} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold px-8 py-6 text-md">
              {isPending ? 'Menyimpan Data...' : 'Kirim Pendaftaran Toko'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}