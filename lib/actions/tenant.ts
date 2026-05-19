'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { slugify } from '@/lib/utils';
import type { TenantInsert, TenantUpdate } from '@/types/database';
import { z } from 'zod';

const TenantCreateSchema = z.object({
  business_name:   z.string().min(3).max(120),
  owner_name:      z.string().min(2).max(100),
  owner_id:        z.string().uuid(),
  category:        z.enum(['MAKANAN','MINUMAN','KERAJINAN','FASHION','PERTANIAN','JASA','LAINNYA']),
  phone_number:    z.string().optional(),
  whatsapp_number: z.string().optional(),
  address:         z.string().optional(),
  rt_rw:           z.string().optional(),
  tagline:         z.string().max(160).optional(),
  description:     z.string().max(2000).optional(),
});

export type TenantCreateState = {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
};
// Di dalam file lib/actions/tenant.ts

export async function createTenant(prevState: any, formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { message: 'Sesi tidak valid.' };
  const operating_hours = {
    Senin: formData.get('hours_senin') as string || 'Tutup',
    Selasa: formData.get('hours_selasa') as string || 'Tutup',
    Rabu: formData.get('hours_rabu') as string || 'Tutup',
    Kamis: formData.get('hours_kamis') as string || 'Tutup',
    Jumat: formData.get('hours_jumat') as string || 'Tutup',
    Sabtu: formData.get('hours_sabtu') as string || 'Tutup',
    Minggu: formData.get('hours_minggu') as string || 'Tutup',
  };

  const lat = formData.get('lat') as string;
  const lng = formData.get('lng') as string;
  const coordinates = (lat && lng) ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null;

  const businessName = formData.get('business_name') as string;
  const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.random().toString(36).substring(2, 6);

  const insertData = {
    owner_id: user.id,
    registered_by: user.id, 
    slug: slug,
    business_name: businessName,
    owner_name: formData.get('owner_name') as string,
    category: formData.get('category') as any,
    whatsapp_number: formData.get('whatsapp_number') as string,
    phone_number: formData.get('phone_number') as string,
    address: formData.get('address') as string,
    rt_rw: formData.get('rt_rw') as string,
    tagline: formData.get('tagline') as string,
    description: formData.get('description') as string,
    status: 'PENDING_REVIEW' as any, 
    operating_hours: operating_hours,
    coordinates: coordinates,
  };

  const { error } = await supabase.from('umkm_tenants').insert(insertData);

  if (error) return { message: `Gagal mendaftar: ${error.message}`, success: false };

  revalidatePath('/dashboard/umkm');
  redirect('/dashboard/umkm');
}

export async function updateTenant(tenantId: string, updates: TenantUpdate): Promise<{ error?: string }> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('umkm_tenants').update(updates).eq('id', tenantId);

  if (error) return { error: `Gagal memperbarui data: ${error.message}` };

  revalidatePath(`/dashboard/umkm/${tenantId}`);
  revalidatePath(`/umkm/${updates.slug ?? ''}`);
  return {};
}
// APPROVAL ADMIN 
export async function approveTenant(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const tenantId = formData.get('tenantId') as string;
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single();
  
  if (profile?.role !== 'VILLAGE_ADMIN') return { error: 'Bukan admin' };

  await supabase.from('umkm_tenants').update({ status: 'ACTIVE' }).eq('id', tenantId);
  revalidatePath('/dashboard/umkm');
  revalidatePath('/');
}
export async function deleteTenant(tenantId: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from('umkm_tenants')
    .delete()
    .eq('id', tenantId);

  if (error) {
    console.error('Error deleting tenant:', error);
    return { error: 'Gagal menghapus data UMKM dari sistem.' };
  }

  revalidatePath('/dashboard/umkm');
  return { success: true };
}

export async function rejectTenant(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const tenantId = formData.get('tenantId') as string;

  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single();
  
  if (profile?.role !== 'VILLAGE_ADMIN') return { error: 'Bukan admin' };
  await supabase.from('umkm_tenants').update({ status: 'INACTIVE' }).eq('id', tenantId);
  revalidatePath('/dashboard/umkm');
}
export async function getStatsOverview() {
  const supabase = await createSupabaseServerClient();

  const [tenants, products, profiles] = await Promise.all([
    supabase.from('umkm_tenants').select('status', { count: 'exact' }),
    supabase.from('umkm_products').select('id', { count: 'exact' }),
    supabase.from('profiles').select('is_active', { count: 'exact' }).eq('is_active', true)
  ]);

  return {
    totalTenants: tenants.count || 0,
    pendingTenants: tenants.data?.filter(t => t.status === 'PENDING_REVIEW').length || 0,
    totalProducts: products.count || 0,
    activeUsers: profiles.count || 0
  };
}