import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user.models';
import { signJWT } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

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

    console.log(token);
    const response = NextResponse.json({
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
    response.cookies.set('token', token, {
      httpOnly: true, // Set secure flag in production
      sameSite: 'strict',
      path: '/',
      maxAge: 3600,
    });
    // console.log(user);
    revalidatePath('/');
    return response;
  } catch (error) {
    console.error('server error', error);
    return NextResponse.json({
      message: 'server error',
      status: 500,
    });
  }
}
