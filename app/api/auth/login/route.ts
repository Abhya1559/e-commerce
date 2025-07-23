import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { signAccessToken, signRefreshToken } from '@/lib/jwt';
import { serialize } from 'cookie';
import { loginSchema } from '@/app/schemas/LoginFormValidation';
import { addDays } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: 'login validation failed',
          errors: result.error.format(),
        },
        { status: 400 }
      );
    }
    const { email, password } = result.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'User not exist please register' });
    }
    const existingRefreshToken = await prisma.refreshToken.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (existingRefreshToken) {
      return NextResponse.json(
        { message: 'You are already logged in' },
        { status: 200 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ message: 'password is incorrect' });
    }

    const accessToken = signAccessToken({ userId: user.id });
    const refreshToken = signRefreshToken({ userId: user.id });

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: addDays(new Date(), 7),
      },
    });

    const response = NextResponse.json(
      { message: 'User logged in successfully', access_token: accessToken },
      { status: 200 }
    );

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  } catch (error) {
    console.log('server error', error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
