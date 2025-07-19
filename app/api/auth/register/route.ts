import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { UserSchema } from '@/app/schemas/userFormValidation';

// const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = UserSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: 'validation failed',
          errors: result.error.format(),
        },
        { status: 400 }
      );
    }

    const { name, email, password, role, address } = result.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'user already exist' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role,
        address,
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
