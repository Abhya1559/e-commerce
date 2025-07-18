import jwt, { JwtPayload } from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export function signAccessToken(payload: object): string {
  return jwt.sign(payload, ACCESS_SECRET!, { expiresIn: '15min' });
}

export function signRefreshToken(payload: object): string {
  return jwt.sign(payload, REFRESH_SECRET!, { expiresIn: '7d' });
}
export function verifyAccessToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, ACCESS_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, REFRESH_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
}
