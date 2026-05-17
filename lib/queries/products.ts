import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { UmkmProduct } from '@/types/database';

export async function getProductsByTenantId(
  tenantId: string
): Promise<UmkmProduct[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('umkm_products')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getProductsByTenantId] Supabase error:', error.message);
    throw new Error('Failed to load products.');
  }

  return (data ?? []) as UmkmProduct[];
}