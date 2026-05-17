import type { ProductCategory } from '@/types/database';

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  MAKANAN:   'Makanan',
  MINUMAN:   'Minuman',
  KERAJINAN: 'Kerajinan Tangan',
  FASHION:   'Pakaian & Aksesoris',
  PERTANIAN: 'Pertanian & Perkebunan',
  JASA:      'Jasa & Layanan',
  LAINNYA:   'Lainnya',
};

export const CATEGORY_ICONS: Record<ProductCategory, string> = {
  MAKANAN:   '🍱',
  MINUMAN:   '🍵',
  KERAJINAN: '🪡',
  FASHION:   '👗',
  PERTANIAN: '🌾',
  JASA:      '🔧',
  LAINNYA:   '📦',
};

export const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(
  ([value, label]) => ({ value: value as ProductCategory, label })
);