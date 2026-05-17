'use client';

import { useActionState, use, useState } from 'react';
import Link from 'next/link';
import { createProduct } from '@/lib/actions/product';
import { Button } from '@/components/ui/button';
import { ImageUploader } from '@/components/dashboard/ImageUploader';
import { ArrowLeftIcon, PackagePlusIcon } from 'lucide-react';

export default function NewProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: tenantId } = use(params);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  
  const [state, formAction, isPending] = useActionState(createProduct, {
    message: '',
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href={`/dashboard/umkm/${tenantId}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" /> Batal & Kembali
        </Link>
      </div>

      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
          <PackagePlusIcon className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-display">Tambah Produk / Menu Baru</h1>
          <p className="text-xs text-gray-500 mt-0.5">Masukkan detail menu atau komoditas produk yang ditawarkan.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 lg:p-8">
        {/* Area Upload Foto Terpisah Sebelum Input Teks */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <ImageUploader 
            label="Foto Produk / Menu (Opsional)" 
            tenantId={tenantId} 
            currentImage={thumbnailUrl} 
            onUpload={setThumbnailUrl} 
          />
        </div>

        <form action={formAction} className="space-y-6">
          <input type="hidden" name="tenant_id" value={tenantId} />
          {/* Kirim URL hasil upload Supabase lewat hidden input */}
          <input type="hidden" name="thumbnail_url" value={thumbnailUrl} />

          {state?.message && !state.errors && (
            <div className={`p-4 border rounded-xl text-sm font-medium ${
              state.message.includes('berhasil') 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : 'bg-red-50 border-red-200 text-red-600'
            }`}>
              {state.message}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Produk / Layanan <span className="text-red-500">*</span></label>
              <input type="text" name="name" required placeholder="Contoh: Nasi Goreng Bakung Spesial" className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" />
              {state?.errors?.name && <p className="text-xs text-red-500 mt-1">{state.errors.name[0]}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kategori <span className="text-red-500">*</span></label>
              <select name="category" required className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm bg-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500">
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
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Harga (Rp)</label>
              <input type="number" name="price" placeholder="Kosongkan jika harga variatif" className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Satuan Jual</label>
              <input type="text" name="price_unit" placeholder="Contoh: per porsi, per bungkus, per botol" className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kata Kunci / Tag (Opsional)</label>
              <input type="text" name="tags" placeholder="Pisahkan dengan koma (Pedas, Manis, Gurih)" className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi Produk</label>
              <textarea name="description" rows={3} placeholder="Jelaskan detail racikan, rasa, porsi atau keunggulan menu ini..." className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none" />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
            <Button type="submit" disabled={isPending} className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold px-6">
              {isPending ? 'Menyimpan...' : 'Simpan Produk'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}