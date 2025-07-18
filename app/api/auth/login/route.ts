import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { signAccessToken, signRefreshToken } from '@/lib/jwt';
import { serialize } from 'cookie';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'all fields are required' });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'User not  exist please register' });
    }

    const isvalidPassword = await bcrypt.compare(password, user.password);
    if (!isvalidPassword) {
      return NextResponse.json({ message: 'password is incorrect' });
    }

    const access_token = signAccessToken({ userId: user.id });
    const refresh_token = signRefreshToken({ userId: user.id });

    const response = NextResponse.json(
      { message: 'User logged in successfully', access_token },
      { status: 200 }
    );

    response.headers.set(
      'Set-cookie',
      serialize('refreshToken', refresh_token, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    );
    return response;
  } catch (error) {
    console.log('server error', error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
