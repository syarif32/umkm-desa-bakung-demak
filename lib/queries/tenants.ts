import { createSupabaseServerClient } from '@/lib/supabase/server';
import type {
  UmkmTenant,
  TenantWithProducts,
  TenantWithOwner,
  ProductCategory,
} from '@/types/database';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const getActiveTenants = cache(
  async (filters?: {
    category?: ProductCategory;
    search?: string;
  }): Promise<UmkmTenant[]> => {
    const supabase = await createSupabaseServerClient();

    let query = supabase
      .from('umkm_tenants')
      .select('*')
      .eq('status', 'ACTIVE')
      .order('business_name', { ascending: true });

    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.search && filters.search.trim().length > 0) {
      query = query.or(
        `business_name.ilike.%${filters.search}%,tagline.ilike.%${filters.search}%,owner_name.ilike.%${filters.search}%`
      );
    }

    const { data, error } = await query;
    if (error) throw new Error('Failed to load UMKM directory.');
    return (data ?? []) as UmkmTenant[];
  }
);

export const getTenantBySlug = cache(
  async (slug: string): Promise<TenantWithProducts> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from('umkm_tenants')
      .select(`*, umkm_products (*)`)
      .eq('slug', slug)
      .eq('status', 'ACTIVE')
      .eq('umkm_products.status', 'AVAILABLE')
      .order('sort_order', { referencedTable: 'umkm_products', ascending: true })
      .single();

    if (error || !data) notFound();

    supabase.from('umkm_tenants').update({ view_count: (data.view_count ?? 0) + 1 }).eq('id', data.id).then(() => {});
    return data as TenantWithProducts;
  }
);

export async function getTenantsForDashboard(): Promise<TenantWithOwner[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('umkm_tenants')
    .select(`*, profiles!owner_id (id, full_name, avatar_url, phone_number)`)
    .order('created_at', { ascending: false });

  if (error) throw new Error('Failed to load tenant list.');
  return (data ?? []) as unknown as TenantWithOwner[];
}

export async function getTenantById(id: string): Promise<UmkmTenant | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from('umkm_tenants').select('*').eq('id', id).single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error('Failed to load tenant.');
  }
  return data;
}