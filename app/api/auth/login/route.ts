import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user.models';
import { signJWT } from '@/lib/auth';

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({
        message: 'email and password is required',
        status: 401,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: 'Invalid user check the credentials',
        status: 404,
      });
    }

    const isMatch = await user.isValidPassword(password);
    // const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({
        message: 'Password not matched',
        status: 401,
      });
    }

    const token = signJWT({ id: user._id, email: user.email });
    const isDev = process.env.NODE_ENV !== 'production';
    console.log(token);
    const res = NextResponse.json({
      message: 'Login successful ',
      status: 200,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token: token,
    });
    // res.cookies.set('token', token, { httpOnly: true, secure: true, path: '/', maxAge: 3600 });
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: !isDev,
      sameSite: 'strict',
      path: '/',
      maxAge: 3600,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error('server error', error);
    return NextResponse.json({
      message: 'server error',
      status: 500,
    });
  }
}
