import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { AuthResponse, LoginCredentials } from '../../types/BackendTypes';
import { signToken } from '@/lib/jtw';
import User from '@/models/Users';
import { Document, Types } from 'mongoose';

// Define the user interface with comparePassword method
interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  credits: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    // Parse and validate request body
    let body: LoginCredentials;
    try {
      body = await request.json();
    } catch (error) {
      console.log(error);
      
      return NextResponse.json(
        { message: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user and type-cast to our interface
    const user = await User.findOne({ email }) as (Document<unknown, object, IUser> & IUser) | null;
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = signToken(user._id.toString());

    const response: AuthResponse = {
      message: 'Login successful',
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        credits: user.credits,
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Login error:', error);

    // Handle different types of errors
    if (error instanceof Error) {
      // Handle validation errors
      if (error.name === 'ValidationError') {
        return NextResponse.json(
          { message: 'Invalid login data', error: error.message },
          { status: 400 }
        );
      }

      // Handle other specific errors if needed
      return NextResponse.json(
        { message: 'Error logging in', error: error.message },
        { status: 500 }
      );
    }

    // Handle unknown errors
    return NextResponse.json(
      { message: 'Error logging in', error: 'Unknown error occurred' },
      { status: 500 }
    );
  }
}