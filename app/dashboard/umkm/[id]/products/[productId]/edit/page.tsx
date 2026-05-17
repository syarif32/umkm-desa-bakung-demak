import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { EditProductForm } from './EditProductForm';

export const metadata = { title: 'Edit Produk — Dashboard' };

export default async function EditProductPage({ params }: { params: Promise<{ id: string, productId: string }> }) {
  const { id: tenantId, productId } = await params;
  
  const supabase = await createSupabaseServerClient();
  const { data: product } = await supabase
    .from('umkm_products')
    .select('*')
    .eq('id', productId)
    .single();

  if (!product) notFound();

  return <EditProductForm tenantId={tenantId} product={product} />;
}