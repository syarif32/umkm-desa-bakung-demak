import Image from 'next/image';
import type { UmkmProduct } from '@/types/database';
import { Badge } from '@/components/ui/badge';
import { PackageIcon } from 'lucide-react';
import { formatIDR } from '@/lib/utils';

export function ProductCard({ product }: { product: UmkmProduct }) {
  const isAvailable = product.status === 'AVAILABLE';

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-amber-100/50 hover:border-amber-200 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-default">
      
      {/* Area Foto Produk dengan Rasio Kotak (1:1) yang Disiplin */}
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden border-b border-gray-100">
        {product.thumbnail_url ? (
          <Image 
            src={product.thumbnail_url} 
            alt={product.name} 
            fill 
            sizes="(max-width: 768px) 100vw, 300px"
            className={`object-cover transition-transform duration-500 group-hover:scale-110 ${!isAvailable && 'grayscale opacity-70'}`} 
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
            <PackageIcon className="w-12 h-12 mb-2 opacity-50" />
            <span className="text-xs font-medium">Tanpa Foto</span>
          </div>
        )}
        
        {/* Status Badge Melayang */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {!isAvailable && (
            <Badge className="bg-red-500/90 hover:bg-red-600 text-white border-none font-bold shadow-md px-2.5 py-1">
              Stok Habis
            </Badge>
          )}
        </div>
      </div>

      {/* Informasi Produk Bawah */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className={`font-bold text-lg leading-snug mb-1 font-display ${!isAvailable ? 'text-gray-500' : 'text-gray-900'}`}>
            {product.name}
          </h3>
          
          {/* Label Harga Cantik */}
          <div className="mt-2 mb-3">
            {product.price ? (
              <span className={`font-extrabold text-xl ${isAvailable ? 'text-amber-600' : 'text-gray-400'}`}>
                {formatIDR(Number(product.price))}
                {product.price_unit && <span className="text-sm font-medium text-gray-500 ml-1">/ {product.price_unit}</span>}
              </span>
            ) : (
              <Badge variant="outline" className="text-gray-600 border-gray-300 bg-gray-50">Harga Variatif</Badge>
            )}
          </div>
          
          {product.description && (
            <p className="text-sm text-gray-500 line-clamp-2 mt-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Area Tags (Jika Ada) */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-gray-100">
            {product.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="text-[10px] font-semibold bg-gray-50 text-gray-400 px-2 py-1 rounded-md">+{product.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}