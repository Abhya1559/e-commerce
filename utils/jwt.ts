import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';

export async function GET(req: NextRequest) {
  //  const cookie = cookies.parse(req.headers.cookies || '');
  const token = req.cookies.get('token')?.value;
  console.log(token);
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const payLoad = verifyJWT(token);
  if (!payLoad) {
    return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
  }
  return NextResponse.json({ user: payLoad });
}
