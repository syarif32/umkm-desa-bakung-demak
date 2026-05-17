'use client';

import dynamic from 'next/dynamic';
import { MapPinIcon } from 'lucide-react';

// Memuat komponen peta secara dinamis (tanpa SSR)
const Map = dynamic(() => import('./MapPicker'), {
  ssr: false,
  loading: () => (
    <div className="h-72 w-full bg-gray-50 animate-pulse rounded-2xl flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200">
      <MapPinIcon className="w-8 h-8 mb-2 opacity-50" />
      <span className="text-sm font-medium">Memuat Peta Interaktif...</span>
    </div>
  ),
});

export function LocationPicker({ defaultLat, defaultLng }: { defaultLat?: number, defaultLng?: number }) {
  return <Map defaultLat={defaultLat} defaultLng={defaultLng} />;
}