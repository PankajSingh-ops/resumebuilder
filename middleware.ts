import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jtw';

export function middleware(request: NextRequest) {
  const protectedPaths = ['/api/protected'];
  
  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}