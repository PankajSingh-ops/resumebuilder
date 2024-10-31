// app/api/auth/credits/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import User from '@/models/Users';
import { verifyToken } from '@/lib/jtw';

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

// app/api/user/credits/route.ts
export async function POST(request: Request) {
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

    const { action } = await request.json();
    
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Handle credit updates
    switch (action) {
      case 'decrement':
        if (user.credits <= 0) {
          return NextResponse.json(
            { message: 'Insufficient credits' },
            { status: 400 }
          );
        }
        user.credits -= 1;
        break;
        
      case 'increment':
        user.credits += 1;
        break;
        
      default:
        return NextResponse.json(
          { message: 'Invalid action' },
          { status: 400 }
        );
    }

    await user.save();

    return NextResponse.json({
      message: 'Credits updated successfully',
      credits: user.credits
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating credits', error: (error as Error).message },
      { status: 500 }
    );
  }
}