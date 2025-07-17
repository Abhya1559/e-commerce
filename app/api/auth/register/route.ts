import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
// const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role, address } = body;

    if (!name || !email || !password || !role || !address) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 401 }
      );
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'user already exist' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashPassword,
        role: body.role,
        address: body.address,
      },
    });
    return NextResponse.json(
      { message: 'User registered successfully', newUser },
      { status: 200 }
    );
  } catch (error) {
    console.log('server error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 501 });
  }
}
