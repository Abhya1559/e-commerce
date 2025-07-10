import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export const signJWT = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1hr' });
};

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error(error);
    return null;
  }
};

// export function verifyJWT(token: string) {
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     return decoded; // This can be user info
//   } catch (err) {
//     return null;
//   }
// }
