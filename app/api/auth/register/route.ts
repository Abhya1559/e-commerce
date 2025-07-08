import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user.models';

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const { email, password, name, address, role } = body;
    console.log(body);
    if (!email || !password || !name || !address) {
      return NextResponse.json({
        message: 'please fill the credential all credentials are required',
        status: 401,
      });
    }
    const existingUser: any = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        message: 'User is already register...',
        status: 402,
      });
    }

    const newUser: any = new User({
      name,
      email,
      password,
      address,
      role,
    });

    await newUser.save();

    return NextResponse.json({
      message: 'user register successful',
      user: {
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        role: newUser.role,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
