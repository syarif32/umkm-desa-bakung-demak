import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTenantById } from '@/lib/queries/tenants';
import { getProductsByTenantId } from '@/lib/queries/products';
import { Button } from '@/components/ui/button';
import { formatIDR } from '@/lib/utils';
import { ArrowLeftIcon, PlusIcon, PackageIcon, EditIcon, ExternalLinkIcon } from 'lucide-react';

export default async function TenantDashboardDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tenant = await getTenantById(id);
  
  if (!tenant) notFound();

  const products = await getProductsByTenantId(id);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Navigasi Atas */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard/umkm" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeftIcon className="w-4 h-4" /> Kembali ke Daftar
        </Link>
        {tenant.status === 'ACTIVE' && (
          <a href={`/umkm/${tenant.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-amber-600 hover:text-amber-700 font-medium">
            Lihat Halaman Publik <ExternalLinkIcon className="w-3.5 h-3.5" />
          </a>
        )}

      </div>
      

      {/* Header Profil Singkat */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">{tenant.business_name}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
            <span>Pemilik: <strong className="text-gray-700">{tenant.owner_name}</strong></span>
            <span className="hidden md:inline">•</span>
            <span>Total: <strong className="text-gray-700">{tenant.product_count} Produk</strong></span>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button asChild variant="outline" className="rounded-xl w-full md:w-auto">
            <Link href={`/dashboard/umkm/${id}/edit`}>
              <EditIcon className="w-4 h-4 mr-2" /> Edit Profil Usaha
            </Link>
          </Button>
        </div>
      </div>

      {/* Panel Daftar Produk */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
          <div>
            <h2 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
              <PackageIcon className="w-5 h-5 text-amber-500" /> Katalog Produk & Layanan
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Kelola apa saja yang ditawarkan oleh usaha ini.</p>
          </div>
          <Button asChild size="sm" className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-sm shrink-0">
            <Link href={`/dashboard/umkm/${id}/products/new`}>
              <PlusIcon className="w-4 h-4 mr-1" /> Tambah Produk
            </Link>
          </Button>
        </div>
        
        <div className="divide-y divide-gray-100">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="p-5 flex items-center justify-between hover:bg-amber-50/20 transition-colors">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                    <PackageIcon className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-amber-600 font-medium mt-0.5">
                      {product.price ? formatIDR(Number(product.price)) : 'Harga custom'}
                      {product.price_unit && <span className="text-gray-400 font-normal ml-1">/ {product.price_unit}</span>}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                    product.status === 'AVAILABLE' ? 'bg-green-50 text-green-700 border-green-200' : 
                    product.status === 'OUT_OF_STOCK' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {product.status === 'AVAILABLE' ? 'Tersedia' : product.status === 'OUT_OF_STOCK' ? 'Stok Habis' : 'Discontinue'}
                  </span>
                  <Button asChild variant="link" size="sm" className="h-auto p-0 text-amber-600 text-xs hover:text-amber-700">
  <Link href={`/dashboard/umkm/${id}/products/${product.id}/edit`}>Edit Produk</Link>
</Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-gray-500">
              <PackageIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="font-medium text-gray-600">Katalog masih kosong.</p>
              <p className="text-sm mt-1">Tambahkan produk pertama untuk ditambahkan ke halaman profil.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}