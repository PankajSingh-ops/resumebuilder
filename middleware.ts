import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    console.log(token,"tok");
    
    if (token) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: [
    '/pages/resume/:path*',
  ]
};