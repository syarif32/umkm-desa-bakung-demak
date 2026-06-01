import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseMiddlewareClient } from '@/lib/supabase/middleware';
import type { UserRole } from '@/types/database';

const PROTECTED_ROUTE_PREFIXES = ['/dashboard'];
const ADMIN_ONLY_ROUTE_PREFIXES = ['/dashboard/village', '/dashboard/umkm/new'];
const OWNER_OR_ADMIN_ROUTE_PREFIXES = ['/dashboard/umkm', '/dashboard/settings'];
const AUTH_ROUTES = ['/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createSupabaseMiddlewareClient(request, response);

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (session && AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  const isProtectedRoute = PROTECTED_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isProtectedRoute) {
    if (!session || sessionError) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, is_active')
      .eq('id', session.user.id)
      .single();

    if (!profile) {
      await supabase.auth.signOut();
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('error', 'account_suspended');
      return NextResponse.redirect(loginUrl);
    }

    const userRole = profile.role as UserRole;
    const isAdminOnlyRoute = ADMIN_ONLY_ROUTE_PREFIXES.some((prefix) =>
      pathname.startsWith(prefix)
    );

    if (isAdminOnlyRoute && userRole !== 'VILLAGE_ADMIN') {
      const dashboardUrl = new URL('/dashboard', request.url);
      dashboardUrl.searchParams.set('error', 'forbidden');
      return NextResponse.redirect(dashboardUrl);
    }

    response.headers.set('x-user-role', userRole);
    response.headers.set('x-user-id', session.user.id);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};