'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { updateVillageInfo } from '@/lib/actions/village';
import { Button } from '@/components/ui/button';
import { ImageUploader } from '@/components/dashboard/ImageUploader';
import { MapIcon, SaveIcon, Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';

export default function VillageInfoPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState<any>(null);
  
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [heroUrl, setHeroUrl] = useState<string>('');

  useEffect(() => {
    async function fetchVillageInfo() {
      const { data: villageData } = await supabase.from('village_info').select('*').limit(1).single();
      if (villageData) {
        setData(villageData);
        setLogoUrl(villageData.logo_url || '');
        setHeroUrl(villageData.hero_image_url || '');
      }
      setIsLoading(false);
    }
    fetchVillageInfo();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    formData.append('logo_url', logoUrl);
    formData.append('hero_image_url', heroUrl);

    const result = await updateVillageInfo(formData);

    setIsSaving(false);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Informasi desa berhasil diperbarui!');
      router.refresh();
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2Icon className="w-8 h-8 animate-spin text-amber-500" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
          <MapIcon className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-display">Informasi Desa & Portal</h1>
          <p className="text-xs text-gray-500 mt-0.5">Atur tampilan beranda utama dan data umum Desa Bakung.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-100">
          <ImageUploader 
            label="Logo Desa / KKN" 
            tenantId="village-assets" 
            currentImage={logoUrl} 
            onUpload={setLogoUrl} 
          />
          {/* Anda bisa mengubah desain ImageUploader khusus untuk cover jika perlu, tapi sementara kita pakai yang sama */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Desa / Portal</label>
              <input type="text" name="name" defaultValue={data?.name} required className="block w-full rounded-xl border-gray-300 px-3 py-2 border focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slogan Beranda (Tagline)</label>
              <input type="text" name="tagline" defaultValue={data?.tagline} className="block w-full rounded-xl border-gray-300 px-3 py-2 border focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi Sambutan Beranda</label>
              <textarea name="description" rows={3} defaultValue={data?.description} className="block w-full rounded-xl border-gray-300 px-3 py-2 border focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kecamatan</label>
              <input type="text" name="district" defaultValue={data?.district} className="block w-full rounded-xl border-gray-300 px-3 py-2 border focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kabupaten / Kota</label>
              <input type="text" name="regency" defaultValue={data?.regency} className="block w-full rounded-xl border-gray-300 px-3 py-2 border focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Provinsi</label>
              <input type="text" name="province" defaultValue={data?.province} className="block w-full rounded-xl border-gray-300 px-3 py-2 border focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kontak Pengelola / Admin</label>
              <input type="text" name="contact_phone" defaultValue={data?.contact_phone} className="block w-full rounded-xl border-gray-300 px-3 py-2 border focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
            </div>
          </div>

          <div className="sm:col-span-2 pt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sejarah / Asal Usul Desa</label>
              <textarea name="history" rows={5} defaultValue={data?.history} placeholder="Ceritakan sejarah singkat atau asal mula desa..." className="block w-full rounded-xl border-gray-300 px-3 py-2 border focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none" />
            </div>

            <div className="sm:col-span-2 mt-2">
              <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Batas Wilayah Geografis</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Batas Utara</label>
                  <input type="text" name="geo_north" defaultValue={data?.geo_north} placeholder="Contoh: Desa Mijen" className="block w-full rounded-xl border-gray-300 px-3 py-2 border focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Batas Timur</label>
                  <input type="text" name="geo_east" defaultValue={data?.geo_east} placeholder="Contoh: Desa Jatirejo" className="block w-full rounded-xl border-gray-300 px-3 py-2 border focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Batas Selatan</label>
                  <input type="text" name="geo_south" defaultValue={data?.geo_south} placeholder="Contoh: Ngelowetan" className="block w-full rounded-xl border-gray-300 px-3 py-2 border focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Batas Barat</label>
                  <input type="text" name="geo_west" defaultValue={data?.geo_west} placeholder="Contoh: Mlaten" className="block w-full rounded-xl border-gray-300 px-3 py-2 border focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                </div>
              </div>
            </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={isSaving} className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-6">
              {isSaving ? 'Menyimpan...' : <><SaveIcon className="w-4 h-4 mr-2" /> Simpan Pengaturan</>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}