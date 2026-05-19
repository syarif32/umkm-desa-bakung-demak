'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';


export async function signInWithEmail(prevState: any, formData: FormData) {
  const email    = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) return { error: 'Email dan password tidak boleh kosong.' };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: 'Email atau password salah. Silakan coba lagi.' };

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}


export async function signUpWithEmail(prevState: any, formData: FormData) {
  const email    = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('full_name') as string;
  const role     = formData.get('role') as string; 
  if (!email || !password || !fullName || !role) {
    return { error: 'Semua kolom wajib diisi.' };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        full_name: fullName,
        role: role, // 
      }
    }
  });

  if (error) {
    if (error.message.includes('already registered') || error.message.includes('User already exists')) {
      return { error: 'Email ini sudah terdaftar. Silakan masuk (login).' };
    }
    return { error: `Gagal mendaftar: ${error.message}` };
  }

  // 
  if (data?.user) {
    await supabase.from('profiles').update({ role: role }).eq('id', data.user.id);
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

// Fungsi Google OAuth
export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/callback`,
    },
  });

  if (error || !data.url) return { error: 'Gagal memulai login dengan Google.' };
  redirect(data.url);
}

// Fungsi Logout
export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/login');
}

export async function toggleUserActive(userId: string, currentState: boolean) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from('profiles')
    .update({ is_active: !currentState })
    .eq('id', userId);

  if (error) {
    console.error('Error toggling user status:', error);
    return { error: 'Gagal memperbarui status verifikasi warga.' };
  }
  
  revalidatePath('/dashboard/village');
  return { success: true };
}