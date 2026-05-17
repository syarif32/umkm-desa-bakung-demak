'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { UploadCloudIcon, Loader2Icon, XIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  tenantId: string;
  currentImage?: string | null;
  onUpload: (url: string) => void;
  label?: string;
}

export function ImageUploader({ tenantId, currentImage, onUpload, label = "Upload Gambar" }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createSupabaseBrowserClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi ukuran (Maksimal 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Ukuran file terlalu besar! Maksimal 2MB.');
      return;
    }

    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${tenantId}/${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error } = await supabase.storage.from('umkm-assets').upload(fileName, file);

    if (error) {
      toast.error('Gagal mengunggah: ' + error.message);
      setIsUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('umkm-assets').getPublicUrl(fileName);

    setPreview(publicUrl);
    onUpload(publicUrl); // Kirim URL gambar ke form induk
    setIsUploading(false);
    toast.success('Gambar berhasil diunggah!');
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <div className="flex items-center gap-4">
        {preview ? (
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-sm">
            <Image src={preview} alt="Preview" sizes='96px' fill className="object-cover" />
            <button 
              type="button" 
              onClick={() => { setPreview(null); onUpload(''); }} 
              className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
            >
              <XIcon className="w-3 h-3"/>
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400">
            <UploadCloudIcon className="w-6 h-6" />
          </div>
        )}
        <div>
           <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" ref={fileInputRef} onChange={handleUpload} />
           <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="rounded-xl">
             {isUploading ? <Loader2Icon className="w-4 h-4 mr-2 animate-spin" /> : <UploadCloudIcon className="w-4 h-4 mr-2" />}
             {isUploading ? 'Mengunggah...' : 'Pilih Foto'}
           </Button>
           <p className="text-xs text-gray-500 mt-2">Maksimal 2MB. Format: JPG, PNG, WEBP.</p>
        </div>
      </div>
    </div>
  );
}