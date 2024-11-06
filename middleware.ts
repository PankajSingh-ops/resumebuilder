import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');  
    if (token) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/pages/auth', request.url));
}

export const config = {
  matcher: [
    '/pages/resume/:path*',
    '/pages/profile',
    '/pages/analyzer',
    '/pages/cover-letter/edit',
    '/pages/cover-letter/edit/:path*'

    
  ]
};