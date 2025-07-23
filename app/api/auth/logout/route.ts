import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ message: 'Not logged in' }, { status: 401 });
    }

    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    console.log('server error', error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
