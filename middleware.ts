import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Marked as async
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  // Ensure all public paths, including the actual login path, are listed
  const publicPaths = ['/', '/login', '/register', '/auth/login'];
  const isPublic = publicPaths.includes(pathname);

  let user = null;
  console.log('Token:', token);

  if (token) {
    try {
      user = await verifyJWT(token);
    } catch (error) {
      console.error('JWT verification failed:', error);
      // Token is invalid or expired, treat as unauthenticated
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.delete('token'); // Clear the invalid token
      return response;
    }
  }

  // If no valid user (i.e., not authenticated) AND the path is not public, redirect to login
  if (!user && !isPublic) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If authenticated or a public path, proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|favicon.ico).*)'],
};
