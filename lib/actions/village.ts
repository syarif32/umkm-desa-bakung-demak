'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function updateVillageInfo(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  // Validasi keamanan ekstra: pastikan yang mengubah ini benar-benar Admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Tidak ada sesi aktif.' };

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'VILLAGE_ADMIN') return { error: 'Akses ditolak. Anda bukan Admin.' };

  const updates = {
    name: formData.get('name') as string,
    tagline: formData.get('tagline') as string,
    description: formData.get('description') as string,
    district: formData.get('district') as string,
    regency: formData.get('regency') as string,
    province: formData.get('province') as string,
    contact_phone: formData.get('contact_phone') as string,
    logo_url: formData.get('logo_url') as string,
    hero_image_url: formData.get('hero_image_url') as string,
  };

  // Karena data desa cuma ada 1 baris, kita ambil ID-nya dulu lalu update
  const { data: existing } = await supabase.from('village_info').select('id').limit(1).single();

  let actionError;
  if (existing) {
    const { error } = await supabase.from('village_info').update(updates).eq('id', existing.id);
    actionError = error;
  } else {
    const { error } = await supabase.from('village_info').insert(updates);
    actionError = error;
  }

  if (actionError) return { error: `Gagal menyimpan data: ${actionError.message}` };

  // Refresh tampilan halaman publik
  revalidatePath('/', 'layout');
  return { success: true };
}