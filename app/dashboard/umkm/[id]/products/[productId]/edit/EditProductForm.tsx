'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { updateProduct, deleteProduct } from '@/lib/actions/product';
import type { UmkmProduct } from '@/types/database';
import { Button } from '@/components/ui/button';
import { ImageUploader } from '@/components/dashboard/ImageUploader';
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

interface EditProductFormProps {
  tenantId: string;
  product: UmkmProduct;
}

export function EditProductForm({ tenantId, product }: EditProductFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(product.thumbnail_url || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    const updates = {
      name: formData.get('name') as string,
      category: formData.get('category') as any,
      price: formData.get('price') ? Number(formData.get('price')) : null,
      price_unit: formData.get('price_unit') as string,
      tags: formData.get('tags') ? (formData.get('tags') as string).split(',').map(t => t.trim()) : [],
      description: formData.get('description') as string,
      status: formData.get('status') as any,
      thumbnail_url: thumbnailUrl,
    };

    const { error } = await updateProduct(product.id, tenantId, updates);

    setIsSaving(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Produk berhasil diperbarui!');
      router.push(`/dashboard/umkm/${tenantId}`);
      router.refresh();
    }
  };

  const handleDelete = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini secara permanen?')) return;
    
    setIsDeleting(true);
    const { error } = await deleteProduct(product.id, tenantId);
    if (error) {
      toast.error(error);
      setIsDeleting(false);
    } else {
      toast.success('Produk dihapus!');
      router.push(`/dashboard/umkm/${tenantId}`);
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href={`/dashboard/umkm/${tenantId}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeftIcon className="w-4 h-4" /> Batal & Kembali
        </Link>
        <Button type="button" variant="ghost" onClick={handleDelete} disabled={isDeleting} className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3">
          <Trash2Icon className="w-4 h-4 mr-2" /> Hapus Produk
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h1 className="text-xl font-bold text-gray-900 font-display">Edit Produk: {product.name}</h1>
          <p className="text-sm text-gray-500">Perbarui detail produk, harga, atau ubah status ketersediaan (stok).</p>
        </div>

        <div className="p-6 lg:p-8">
          <div className="mb-6 pb-6 border-b border-gray-100">
            <ImageUploader 
              label="Foto Produk / Menu" 
              tenantId={tenantId} 
              currentImage={thumbnailUrl} 
              onUpload={setThumbnailUrl} 
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Produk <span className="text-red-500">*</span></label>
                <input type="text" name="name" defaultValue={product.name} required className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kategori <span className="text-red-500">*</span></label>
                <select name="category" defaultValue={product.category} required className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm bg-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500">
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
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status Ketersediaan</label>
                <select name="status" defaultValue={product.status} className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm bg-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500">
                  <option value="AVAILABLE">✅ Tersedia</option>
                  <option value="OUT_OF_STOCK">⚠️ Stok Habis</option>
                  <option value="DISCONTINUED">❌ Berhenti Dijual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Harga (Rp)</label>
                <input type="number" name="price" defaultValue={product.price || ''} className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Satuan Jual</label>
                <input type="text" name="price_unit" defaultValue={product.price_unit || ''} placeholder="Contoh: per porsi" className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kata Kunci / Tag</label>
                <input type="text" name="tags" defaultValue={product.tags?.join(', ') || ''} placeholder="Pisahkan dengan koma" className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi Produk</label>
                <textarea name="description" rows={3} defaultValue={product.description || ''} className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none" />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={isSaving} className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-6">
                {isSaving ? 'Menyimpan...' : <><SaveIcon className="w-4 h-4 mr-2" /> Simpan Perubahan</>}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}