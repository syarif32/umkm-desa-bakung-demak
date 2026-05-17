'use client';

import { useActionState } from 'react';
import { signInWithEmail, signInWithGoogle } from '@/lib/actions/auth';
import { Button } from '@/components/ui/button';
import { StoreIcon } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  // Menangkap error jika email/password salah
  const [state, formAction, isPending] = useActionState(signInWithEmail as any, { error: '' });

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* BAGIAN HEADER ATAS */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
          <StoreIcon className="w-7 h-7" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 font-display">
          Masuk ke Portal
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Belum punya akun? <Link href="/register" className="font-medium text-amber-600 hover:text-amber-500">Daftar di sini</Link>
        </p>
      </div>

      {/* BAGIAN KOTAK FORM */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-amber-900/5 sm:rounded-3xl sm:px-10 border border-amber-100">
          <form action={formAction} className="space-y-6">
            
            {/* Munculkan pesan error di sini jika login gagal */}
            {state?.error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                {state.error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Alamat Email</label>
              <div className="mt-1">
                <input id="email" name="email" type="email" required placeholder="admin@desabakung.com" 
                       className="block w-full appearance-none rounded-xl border border-gray-300 px-3 py-2.5 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input id="password" name="password" type="password" required placeholder="••••••••" 
                       className="block w-full appearance-none rounded-xl border border-gray-300 px-3 py-2.5 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm" />
              </div>
            </div>

            {/* INI DIA TOMBOL LOGIN YANG HILANG! wkwk */}
            <div>
              <Button type="submit" disabled={isPending} className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-5 text-md font-semibold shadow-md">
                {isPending ? 'Memeriksa...' : 'Masuk ke Dashboard'}
              </Button>
            </div>
          </form>

          {/* BAGIAN LOGIN GOOGLE */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              {/* <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Atau masuk dengan</span>
              </div> */}
            </div>

            {/* <div className="mt-6">
              <form action={signInWithGoogle}>
                <Button type="submit" variant="outline" className="w-full rounded-xl flex items-center justify-center gap-2 py-5 border-gray-300 text-gray-700 hover:bg-gray-50">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Lanjutkan dengan Google
                </Button>
              </form>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}