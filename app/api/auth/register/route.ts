import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { AuthResponse, RegisterCredentials } from '../../types/BackendTypes';
import User from '@/models/Users';
import { signToken } from '@/lib/jtw';
import { Document, Types } from 'mongoose';

// Define the user interface
interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  credits: number;
}

// Define custom error type for request parsing
interface ParseError extends Error {
  code?: number;
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    // Parse and validate request body
    let body: RegisterCredentials;
    try {
      body = await request.json();
    } catch (error) {
      // Use underscore to indicate intentionally unused parameter
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check password length
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = new User({
      email,
      password,
      credits: 10
    }) as Document<unknown, object, IUser> & IUser;

    await user.save();

    // Generate token and return response
    const token = signToken(user._id.toString());

    const response: AuthResponse = {
      message: 'User registered successfully',
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        credits: user.credits
      }
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);

    // Handle specific MongoDB errors
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return NextResponse.json(
          { message: 'Invalid user data', error: error.message },
          { status: 400 }
        );
      }

      const mongoError = error as ParseError;
      if (mongoError.code === 11000) {
        return NextResponse.json(
          { message: 'Email already exists' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { message: 'Error registering user', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}