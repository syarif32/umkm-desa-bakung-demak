

export type UserRole = 'VILLAGE_ADMIN' | 'UMKM_OWNER' | 'VILLAGE_USER';

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

export interface UmkmProduct {
  id: string;
  tenant_id: string;
  name: string;
  description?: string | null;
  price?: number | null;
  price_unit?: string | null;
  category?: string;
  status?: string;
  thumbnail_url?: string | null;
  tags?: string[] | null;
  [key: string]: any; // Mengizinkan field tambahan tanpa error
}

export interface UmkmTenant {
  id: string;
  slug: string;
  business_name: string;
  owner_name: string;
  category: string;
  status: string;
  tagline?: string | null;
  description?: string | null;
  whatsapp_number?: string | null;
  phone_number?: string | null;
  email?: string | null;
  address?: string | null;
  rt_rw?: string | null;
  logo_url?: string | null;
  cover_image_url?: string | null;
  coordinates?: any;
  social_links?: any;
  operating_hours?: any;
  product_count?: number;
  umkm_products?: UmkmProduct[] | any[];
  [key: string]: any; 
}

export interface VillageInfo {
  id?: string;
  name?: string;
  description?: string | null;
  logo_url?: string | null;
  [key: string]: any; 
}
// Mencegah error di file product.ts
export type ProductInsert = Partial<UmkmProduct> & { [key: string]: any };
export type ProductUpdate = Partial<UmkmProduct> & { [key: string]: any };
// Mencegah error di file tenant.ts
export type TenantInsert = Partial<UmkmTenant> & { [key: string]: any };
export type TenantUpdate = Partial<UmkmTenant> & { [key: string]: any };
export type TenantWithProducts = UmkmTenant;
export type TenantWithOwner = UmkmTenant;