import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isPublicRoute = isAuthPage || pathname === '/';

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const user = token
    ? await fetch(new URL('/api/auth/verify', baseUrl), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => res.json())
    : null;

  if (user && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  console.log(user);
  // If token is invalid and route is protected, redirect to login
  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
