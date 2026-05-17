import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPinOffIcon } from 'lucide-react';

export default function TenantNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mb-6">
        <MapPinOffIcon className="w-8 h-8 text-amber-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">UMKM Tidak Ditemukan</h1>
      <p className="text-gray-500 max-w-md mb-8">
        Pelaku UMKM yang Anda cari tidak terdaftar atau saat ini sedang dinonaktifkan.
      </p>
      <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl">
        <Link href="/">Kembali ke Utama</Link>
      </Button>
    </div>
  );
}