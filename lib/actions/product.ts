'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { ProductInsert, ProductUpdate } from '@/types/database';
import { z } from 'zod';

const ProductSchema = z.object({
  tenant_id:     z.string().uuid(),
  name:          z.string().min(2).max(120),
  description:   z.string().max(1000).optional(),
  price:         z.coerce.number().min(0).nullable().optional(),
  price_unit:    z.string().max(30).optional(),
  category:      z.enum(['MAKANAN','MINUMAN','KERAJINAN','FASHION','PERTANIAN','JASA','LAINNYA']),
  tags:          z.array(z.string()).optional(),
  thumbnail_url: z.string().optional().nullable(), 
});

export async function createProduct(prevState: any, formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const tags = formData.get('tags') ? (formData.get('tags') as string).split(',').map(t => t.trim()).filter(Boolean) : [];
  
  const raw = Object.fromEntries(formData.entries());
  raw.tags = tags as any;

  const parsed = ProductSchema.safeParse(raw);
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors, message: 'Validasi gagal.' };

  const insert: ProductInsert = { ...parsed.data, status: 'AVAILABLE' };
  const { error } = await supabase.from('umkm_products').insert(insert);

  if (error) return { message: `Gagal menambahkan produk: ${error.message}` };

  revalidatePath(`/dashboard/umkm/${parsed.data.tenant_id}`);
  revalidatePath(`/umkm`);
  return { message: 'Produk berhasil ditambahkan.' };
}

export async function updateProduct(productId: string, tenantId: string, updates: ProductUpdate): Promise<{ error?: string }> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('umkm_products').update(updates).eq('id', productId).eq('tenant_id', tenantId);
  if (error) return { error: `Gagal memperbarui produk: ${error.message}` };
  revalidatePath(`/dashboard/umkm/${tenantId}`);
  return {};
}

export async function deleteProduct(productId: string, tenantId: string): Promise<{ error?: string }> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('umkm_products').delete().eq('id', productId).eq('tenant_id', tenantId);
  if (error) return { error: `Gagal menghapus produk: ${error.message}` };
  revalidatePath(`/dashboard/umkm/${tenantId}`);
  return {};
}