'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { UmkmProduct } from '@/types/database';
import { Badge } from '@/components/ui/badge';
import { PackageIcon, XIcon } from 'lucide-react';
import { formatIDR } from '@/lib/utils';

export function ProductCard({ product }: { product: UmkmProduct }) {
  const [isOpen, setIsOpen] = useState(false);
  const isAvailable = product.status === 'AVAILABLE';

  return (
    <>
      {/* KARTU PRODUK ASLI (Tidak ada layout yang diubah, hanya tambah onClick dan cursor-pointer) */}
      <div 
        onClick={() => setIsOpen(true)}
        className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-amber-100/50 hover:border-amber-200 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer"
      >
        
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

      {/* MODAL POP-UP (Membesar saat produk diklik) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 opacity-100 animate-in fade-in duration-200">
          
          {/* Latar Belakang Gelap (Klik untuk menutup) */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Kotak Konten Modal */}
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 animate-in zoom-in-95 duration-300">
            
            {/* Tombol Silang Tutup */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 md:left-4 md:right-auto z-20 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all shadow-sm border border-gray-200"
            >
              <XIcon className="w-5 h-5" />
            </button>

            {/* Area Foto Besar di Kiri (atau Atas di Mobile) */}
            <div className="w-full md:w-1/2 bg-gray-50 relative aspect-square md:aspect-auto md:min-h-[500px]">
              {product.thumbnail_url ? (
                <Image
                  src={product.thumbnail_url}
                  alt={product.name}
                  fill
                  className={`object-cover ${!isAvailable && 'grayscale opacity-70'}`}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <PackageIcon className="w-20 h-20 mb-4 opacity-50" />
                  <span className="text-lg font-medium">Tanpa Foto</span>
                </div>
              )}
              
              {!isAvailable && (
                <div className="absolute top-4 right-4 md:left-auto md:right-4 z-10">
                  <Badge className="bg-red-500/90 text-white border-none font-bold shadow-md px-3 py-1.5 text-sm">
                    Stok Habis
                  </Badge>
                </div>
              )}
            </div>

            {/* Area Detail Lengkap di Kanan */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto custom-scrollbar">
              <h2 className={`font-black text-2xl md:text-3xl leading-tight font-display mb-4 ${!isAvailable ? 'text-gray-500' : 'text-gray-900'}`}>
                {product.name}
              </h2>

              {/* Harga */}
              <div className="mb-6">
                {product.price ? (
                  <span className={`font-extrabold text-3xl ${isAvailable ? 'text-amber-600' : 'text-gray-400'}`}>
                    {formatIDR(Number(product.price))}
                    {product.price_unit && <span className="text-lg font-medium text-gray-500 ml-2">/ {product.price_unit}</span>}
                  </span>
                ) : (
                  <Badge variant="outline" className="text-gray-600 border-gray-300 bg-gray-50 text-base py-1.5 px-4">
                    Harga Bervariasi
                  </Badge>
                )}
              </div>

              <div className="h-px w-full bg-gray-100 mb-6" />

              {/* Deskripsi Penuh (Tanpa Line Clamp) */}
              <div className="flex-1 mb-8">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Deskripsi Produk</h4>
                <p className="text-[15px] text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {product.description || 'Tidak ada deskripsi rinci untuk produk ini.'}
                </p>
              </div>

              {/* Menampilkan SEMUA Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Kategori & Tag</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <span key={tag} className="text-xs font-semibold uppercase tracking-wider bg-amber-50 border border-amber-100 text-amber-700 px-3 py-1.5 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}