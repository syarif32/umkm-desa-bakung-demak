'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


function LocationMarker({ position, setPosition }: { position: [number, number] | null, setPosition: any }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : <Marker position={position} icon={icon} />;
}

export default function MapPicker({ defaultLat, defaultLng }: { defaultLat?: number, defaultLng?: number }) {
 
  const defaultCenter = [-6.83562094304224, 110.72247914806216] as [number, number];
  

  const [position, setPosition] = useState<[number, number] | null>(
    defaultLat && defaultLng ? [defaultLat, defaultLng] : null
  );

  return (
    <div className="space-y-3 w-full">
      <div className="h-72 w-full rounded-2xl overflow-hidden border-2 border-amber-200 relative z-0 shadow-inner">
        <MapContainer 
          center={position || defaultCenter} 
          zoom={14} 
          scrollWheelZoom={true} 
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </div>

      <p className="text-xs text-gray-500 font-medium">
        Geser peta dan <strong className="text-amber-600">Klik</strong> untuk menjatuhkan pin lokasi usaha Anda.
      </p>

 
      <input type="hidden" name="lat" value={position ? position[0] : ''} />
      <input type="hidden" name="lng" value={position ? position[1] : ''} />

      {position && (
        <div className="inline-block text-xs font-semibold text-green-700 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
          Titik kordinat berhasil diamankan!
        </div>
      )}
    </div>
  );
}