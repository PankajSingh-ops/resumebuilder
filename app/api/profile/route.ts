// app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import { headers } from 'next/headers';
import { verifyToken } from '@/lib/jtw';
import User from '@/models/Users';

export async function GET() {
  try {
    await dbConnect();
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

    // Find user and exclude sensitive fields
    const user = await User.findById(decoded.userId).select('-password -__v');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);

  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

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

    // Parse the request body
    const body = await request.json();
    console.log(body,"data");
     console.log(decoded.userId,"suerid");
     
    

    // Extract updatable fields
    const { 
      firstName, 
      lastName, 
      gender, 
      dateOfBirth, 
      currentStatus,
      profilePicture 
    } = body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { 
        firstName, 
        lastName, 
        gender, 
        dateOfBirth, 
        currentStatus,
        profilePicture 
      },
      { 
        new: true,
        runValidators: true,
        select: '-password -__v'
      }
    );
    console.log(updatedUser,"updated");
    

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser);

  } catch (error) {
    console.error('Profile PUT error:', error);
    return NextResponse.json(
      { error: 'Update failed' },
      { status: 400 }
    );
  }
}