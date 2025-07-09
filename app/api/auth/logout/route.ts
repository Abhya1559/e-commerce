import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { NextApiRequest } from 'next';

export async function GET() {
  (await cookies()).delete('token');
  return NextResponse.redirect(new URL('/', 'http://localhost:3000'));
}
