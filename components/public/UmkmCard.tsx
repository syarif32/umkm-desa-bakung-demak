import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { UmkmTenant } from '@/types/database';
import { CATEGORY_LABELS } from '@/lib/constants/categories';
import { ShoppingBagIcon, MapPinIcon } from 'lucide-react';

export function UmkmCard({ tenant }: { tenant: UmkmTenant }) {
  return (
    <Link 
      href={`/umkm/${tenant.slug}`} 
   
      className="group flex flex-col h-full bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
    >
      <div className="relative shrink-0">
        <div className="relative h-32 bg-amber-200 overflow-hidden z-10">
          {tenant.cover_image_url ? (
            <Image 
              src={tenant.cover_image_url} 
              alt={tenant.business_name} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-200" />
          )}

          {/* Badge Kategori */}
          <div className="absolute top-2 right-2">
            <Badge className="bg-amber-500/90 text-white border-none backdrop-blur-sm">
              {CATEGORY_LABELS[tenant.category as keyof typeof CATEGORY_LABELS] ?? tenant.category}
            </Badge> 
          </div>
        </div>
        
        <div className="absolute -bottom-6 left-4 z-20">
          <div className="w-16 h-16 rounded-2xl border-4 border-white bg-white overflow-hidden shadow-inner flex items-center justify-center">
            {tenant.logo_url ? (
              <Image 
                src={tenant.logo_url} 
                alt="Logo" 
                width={64} 
                height={64} 
                className="object-cover w-full h-full" 
              />
            ) : (
              <ShoppingBagIcon className="w-8 h-8 text-amber-300" />
            )}
          </div>
        </div>
      </div>
      
      <div className="pt-8 p-5 z-10 relative flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1 mt-2">
          {tenant.business_name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {tenant.tagline || 'Produk unggulan lokal asli Desa Bakung'}
        </p>
        
        <div className="flex items-center gap-4 mt-auto pt-5 text-xs text-gray-500 font-medium">
          {tenant.address && (
            <span className="flex items-center gap-1.5 truncate">
              <MapPinIcon className="w-3.5 h-3.5 text-amber-500 shrink-0" /> 
              <span className="truncate">{tenant.address}</span>
            </span>
          )}
          <span className="flex items-center gap-1.5 shrink-0 ml-auto">
            <ShoppingBagIcon className="w-3.5 h-3.5 text-amber-500" /> 
            {tenant.product_count} Produk
          </span>
        </div>
      </div>
    </Link>
  );
}