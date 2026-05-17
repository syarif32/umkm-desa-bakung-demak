// Tambahkan 3 definisi ini di paling bawah file types/database.ts
export type UserRole = 'VILLAGE_ADMIN' | 'UMKM_OWNER';

export type UmkmStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING_REVIEW';

export type ProductStatus = 'AVAILABLE' | 'OUT_OF_STOCK' | 'DISCONTINUED';

export type ProductCategory = 
  | 'MAKANAN' 
  | 'MINUMAN' 
  | 'KERAJINAN' 
  | 'FASHION' 
  | 'PERTANIAN' 
  | 'JASA' 
  | 'LAINNYA';
export type SocialLinks = {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  website?: string;
  [key: string]: string | undefined;
};

export type OperatingHours = {
  Senin?: string;
  Selasa?: string;
  Rabu?: string;
  Kamis?: string;
  Jumat?: string;
  Sabtu?: string;
  Minggu?: string;
  [key: string]: string | undefined;
};

export type GeoCoordinates = {
  lat: number;
  lng: number;
};