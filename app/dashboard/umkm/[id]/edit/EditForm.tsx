'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { updateTenant } from '@/lib/actions/tenant';
import type { UmkmTenant } from '@/types/database';
import { Button } from '@/components/ui/button';
import LocationPicker from '@/components/dashboard/MapPicker';
import { ImageUploader } from '@/components/dashboard/ImageUploader';
import { ArrowLeftIcon, SaveIcon, MapPinIcon, ClockIcon, StoreIcon } from 'lucide-react';
import { toast } from 'sonner';

export function EditForm({ tenant }: { tenant: UmkmTenant }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  
  const [logoUrl, setLogoUrl] = useState<string | null>(tenant.logo_url);
  const [coverUrl, setCoverUrl] = useState<string | null>(tenant.cover_image_url);

  // Parsing data lama
  const coords = tenant.coordinates as any;
  const hours = tenant.operating_hours as any || {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    
    // Rakit Jam Operasional
    const operating_hours = {
      Senin: formData.get('hours_senin') as string || 'Tutup',
      Selasa: formData.get('hours_selasa') as string || 'Tutup',
      Rabu: formData.get('hours_rabu') as string || 'Tutup',
      Kamis: formData.get('hours_kamis') as string || 'Tutup',
      Jumat: formData.get('hours_jumat') as string || 'Tutup',
      Sabtu: formData.get('hours_sabtu') as string || 'Tutup',
      Minggu: formData.get('hours_minggu') as string || 'Tutup',
    };

    // Rakit Koordinat Peta
    const lat = formData.get('lat') as string;
    const lng = formData.get('lng') as string;
    const coordinates = (lat && lng) ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null;

    const updates = {
      business_name: formData.get('business_name') as string,
      tagline: formData.get('tagline') as string,
      description: formData.get('description') as string,
      whatsapp_number: formData.get('whatsapp_number') as string,
      phone_number: formData.get('phone_number') as string,
      address: formData.get('address') as string,
      rt_rw: formData.get('rt_rw') as string,
      logo_url: logoUrl,
      cover_image_url: coverUrl,
      operating_hours,
      coordinates,
    };

    const { error } = await updateTenant(tenant.id, updates);

    setIsSaving(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Profil UMKM berhasil diperbarui!');
      router.push(`/dashboard/umkm/${tenant.id}`);
      router.refresh();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <Link href={`/dashboard/umkm/${tenant.id}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800">
        <ArrowLeftIcon className="w-4 h-4" /> Batal & Kembali
      </Link>

      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h1 className="text-xl font-bold text-gray-900 font-display">Edit Profil Toko</h1>
          <p className="text-sm text-gray-500">Perbarui informasi, peta, dan tampilan visual UMKM Anda.</p>
        </div>

        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pb-8 border-b border-gray-100">
            <ImageUploader label="Logo Usaha / Merek" tenantId={tenant.id} currentImage={logoUrl} onUpload={setLogoUrl} />
            <ImageUploader label="Foto Sampul Belakang" tenantId={tenant.id} currentImage={coverUrl} onUpload={setCoverUrl} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* BAGIAN 1: INFO DASAR */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2"><StoreIcon className="w-4 h-4 text-amber-500"/> Informasi Dasar</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Usaha</label>
                  <input type="text" name="business_name" defaultValue={tenant.business_name} required className="block w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slogan / Tagline</label>
                  <input type="text" name="tagline" defaultValue={tenant.tagline || ''} className="block w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nomor WhatsApp</label>
                  <input type="text" name="whatsapp_number" defaultValue={tenant.whatsapp_number || ''} className="block w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi Usaha</label>
                  <textarea name="description" rows={4} defaultValue={tenant.description || ''} className="block w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none" />
                </div>
              </div>
            </div>

            {/* BAGIAN 2: PETA LOKASI */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2"><MapPinIcon className="w-4 h-4 text-amber-500"/> Alamat & Peta</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Alamat Jalan</label>
                  <input type="text" name="address" defaultValue={tenant.address || ''} required className="block w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">RT / RW</label>
                  <input type="text" name="rt_rw" defaultValue={tenant.rt_rw || ''} required className="block w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                </div>

                <div className="sm:col-span-2 bg-blue-50 p-4 rounded-xl border border-blue-100">
                 <div className="mt-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tandai Lokasi di Peta</label>
                <LocationPicker />
              </div>
                </div>
              </div>
            </div>

            {/* BAGIAN 3: JAM OPERASIONAL */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2"><ClockIcon className="w-4 h-4 text-amber-500"/> Jam Buka</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((hari) => (
                  <div key={hari} className="flex items-center gap-3">
                    <label className="w-20 text-sm font-semibold text-gray-700">{hari}</label>
                    <input type="text" name={`hours_${hari.toLowerCase()}`} defaultValue={hours[hari] || '08:00 - 17:00'} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <Button type="submit" disabled={isSaving} className="bg-amber-500 hover:bg-amber-600 text-white rounded-2xl px-8 py-6 font-bold shadow-md hover:-translate-y-1 transition-all">
                {isSaving ? 'Menyimpan...' : <><SaveIcon className="w-5 h-5 mr-2" /> Simpan Perubahan</>}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}