import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { verifyToken } from '@/lib/jtw';
import User from '@/models/Users';


export async function GET() {
  try {
    const headersList = headers();
    const token = headersList.get('authorization')?.split(' ')[1];
    
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

    const user = await User.findById(decoded.userId).select('credits email');
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      credits: user.credits,
      email: user.email
    });

  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching credits', error: (error as Error).message },
      { status: 500 }
    );
  }
}