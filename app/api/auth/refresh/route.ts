import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  verifyRefreshToken,
  signAccessToken,
  verifyAccessToken,
} from '@/lib/jwt';

export async function POST() {
  const token = (await cookies()).get('refreshToken')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Invalid User token not found' },
      { status: 404 }
    );
  }

  try {
    const payload = verifyRefreshToken(token);

    if (!payload || !payload.userId) {
      return NextResponse.json(
        { message: 'Invalid refresh token' },
        { status: 403 }
      );
    }

    const newAccessToken = signAccessToken({ userId: payload.userId });
    return NextResponse.json(
      { message: 'Token refreshed', accessToken: newAccessToken },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Token verification failed', error: error.message },
      { status: 500 }
    );
  }
}
