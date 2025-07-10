import jwt from 'jsonwebtoken';
import { NextResponse, NextRequest } from 'next/server';

// Ideally, move this to your .env file
const JWT_SECRET = process.env.JWT_SECRET || '';

export function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  //   console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return NextResponse.json({ error: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ user: decoded }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid or expired token' });
  }
}
