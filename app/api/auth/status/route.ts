import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ loggedIn: false });
  }

  const tokenExists = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });

  return NextResponse.json({ loggedIn: !!tokenExists });
}
