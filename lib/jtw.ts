import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface JWTPayload {
  userId: string;
}

export const signToken = (userId: string): string => {
  return jwt.sign(
    { userId } as JWTPayload,
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    console.log(error,"this is error in jwt");
    
    return null;
  }
};
